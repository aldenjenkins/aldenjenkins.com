---
title: "Django's bulk_update() feature is God Mode"
date: 2018-10-06
author: Alden
layout: post
permalink: /blog/django-bulk-update/
categories:
  - Technology
image:
  feature: "django-text.jpeg"
comments: true
readTime: '9 min'
description: "bulk_update() is not a real function, but this is what you are looking for."
---

One of the most common issues I run into with Django performance is extraneous database queries. 
Whether its an [n+1 query issue](http://blog.scoutapp.com/articles/2018/04/30/finding-and-fixing-n-1s-in-django-apps),
a misuse of complex Q objects, or just a misunderstanding of queryset best practices, it can be tough
to get your head around what the issue is in your case.
Django gives tons of functionality as a framework, but for most people just getting started
it's often too much functionality to comprehend.
This post will dive into essential queryset best practices and a 
comparison of the number of queries backing them.

### Imagine the following:
{% highlight python linenos %}
all_notifications = Notification.objects.all()
for notification in all_notifications:
  if notification.type in ['type1','type2','type3']:
    notification.update(seen=True)
{% endhighlight %}

This code runs a query for each object in the `all_notifications` queryset. 
Conversely, the following code runs a single query for the entire `all_notifications` queryset, 
and accomplishes the same goal in:

* half the lines of code (you can even do it in one line)
* literally one database query
* twice the elegance

{% highlight python linenos %}
all_notifications = Notification.objects.all()
all_notifications.objects.filter(type__in=['type1','type2','type3']).update(seen=True)
{% endhighlight %}

What we're doing here is a something you always want to do when given
the opportunity. **We're making the database do most of the work instead of Django.**
By filtering the queryset's type to include all 3 types we are looking for, we
forego the need to iterate through each object in the query set to then check it's
value. Instead, we tell our database to get the objects we want for us.

### See it in action!
<figure>
<script src="https://asciinema.org/a/MgOTYUg7TcFSbVnub39VLNeg2.js" id="asciicast-MgOTYUg7TcFSbVnub39VLNeg2" async></script>
   <figcaption>Me using query_set.update() to save me countless queries</figcaption>
</figure>

## bulk_create()

_this one is actually a function_

bulk_create() it something I use all the time for making notifications in metoo 
on post_save signals for certain models. For example, anytime a Rabble comment is
created, I make Notification objects for each user who the comment was replying to
in addition to the author of the post.

bulk_create() works much like the query_set.update() in that it drastically
reduces the number of queries that Django gives the database in contrast to
the per-object amount you would run in the most pragmatic university-educated
programmer style.

### Bad implementation

{% highlight python linenos %}
for user in replied_to_users:
   Notification.objects.create(to=user, comment=the_comment, type="RepliedToRabble")
{% endhighlight %}

Don't be fooled by the low line count here! This implementation runs a SQL query for each
user in `replied_to_users`. Imagine if the number of Notification objects you were creating here
was 100 or 100000! Considering an average query response from your database to Django takes ~25ms,
you're looking at some serious lag time. Let's see a more elegant and efficient implementation.

### Single query

{% highlight python linenos %}
new_notifications = []
for user in replied_to_users:
   new_notifications.append(Notification(to=user, comment=the_comment, type="RepliedToRabble"))
Notification.objects.bulk_create(new_notifications)
{% endhighlight %}

Taking the time to consider how you may be running unnecessary queries in your
projects and reap the rewards of speed!

