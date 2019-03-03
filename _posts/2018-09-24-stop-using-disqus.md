---
title: 'Stop Using Disqus'
subtitle: "You're fueling the botnet"
date: 2018-10-24
author: Alden
layout: post
permalink: /blog/stop-using-disqus/
categories:
  - Technology
comments: true
readTime: '10 min'
---

Disqus is gaining popularity every day in both the [serverless]({{ site.url }}/blog/this-blog-is-completely-serverless) and dynamic web communities
because it is a mostly-free, all-in-one solution which handles authentication, spam prevention,
allows the site owner's comments and replies to be displayed highlighted in the
among other commenters all without needing to worry about any maintenance. 

These luxuries come at a cost of **page weight**, the guaranteed **privacy**
of both you as the website owner and all of your users, and the **need to login to Disqus**
for anyone to create a comment.
 
### Response times with and without Disqus.

With Disqus enabled to load by default, the page-weight - also known as your 
web page's load time - becomes a nightmare. This has implications on the SEO
of your website, the time before your web page is completely usable, the amount
of data which your users need to receive over a possible cellular connection, 
and thereby the probability that users will return to your website ever again.

Without Disqus, we see an entire 800ms difference in time it takes your website
to fully render to the user. thats almost a second of time every request to your
website that gets lost in the abyss of potential seo ranking.

### Let's take a deeper look at the websites we're requesting here.
Hint: it's whole lot of tracking

* flavio.com - tracking
* google.com - the literal botnet
* derp.com - more tracking
* flavio2.com - virustotal scan of this website says do not trust


## Other solutions
![](/assets/img/comments.png)
### Third Party
* [Facebook comments](https://developers.facebook.com/products/social-plugins/comments/?utm_campaign=social_plugins&utm_medium=offsite_pages&utm_source=comments_plugin)
* Muut
* Remarkbox

### Hosted Solutions
* [Github Comments](http://artsy.github.io/blog/2017/07/15/Comments-are-on/) (This solution is awesome too!)

### Off-site hosting
When you care about your website’s performance but don’t want to miss the convenience of third-party services, you may want to outsource the comments completely. The implementation is as simple as including an external link at the end of your articles. However, data ownership remains an issue you need to evaluate.

Twitter. You probably promote your articles via Twitter already. We can reverse this process. For every blog post, include a link back to your Tweet, where people can leave their comments.
Reddit. Create your own subreddit and post a link to every new blog article. As a bonus, your posts can be voted on, so you get a nice popularity overview.
Hacker News. Similar to Reddit, but aimed towards a more technical audience. However, you don’t get a dedicated space for your links.
Whether this is a viable option also depends on your reader’s demographics.

### No comments
I would stray from this solution personally. This depends on what environment you invision your website flourishing in of course.
In any website, comments are conducive to a community feeling as users have the ability to
interact with each other by bonding, or arguing over ideas expressed in comments.
Comments also allow ideas to be peer reviewed - a concept which inherently brings the best
ideas to fruition. I find that a blog without comments is much less
of a democracy and more of a dictatorship of ideas. The process of peer reviewing any idea brings out
the best qualities of the idea and any flaws it may have which were not covered in the article. 
As long as the reader has enough mental experience to see through ideas which are not
conducive to thoughtful conversation.

## My comment solution
After creating [my serverless contact form](https://github.com/aldenjenkins/serverless-recaptcha-form),
I was inspired to see if there were any other solutions I could implement in
my serverless backend. After doing some research, I found a
[great solution here](), but didn't feel that it had enough out-of-the-box
spam protection or abuse protection, or that It was easily deployable or updatable enough.
I decided to create my own version which now uses Google's reCAPTCHA verification, 
and uses gravatar

You can see more about [how to install a serverless comment system by following my tutorial here](/blog/install-serverless-comment-system)
