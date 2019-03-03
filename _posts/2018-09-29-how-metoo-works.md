---
title: 'How metoo works'
date: 2018-11-27
author: Alden
layout: post
permalink: /blog/how-metoo-works/
categories:
  - Technology
tags:
  - Programming, Docker, Kubernetes, Django, Redis, Celery, Node 
comments: true
readTime: '9 min'
image:
  feature: "library-small.jpg"
---


[metoo.io](https://metoo.io) is the largest, most complex web service I have ever deployed.
It's a really cool app, and I'm not just saying that because I made it. If you have a chance you
should absolutely check it out.

<figure>
	<img src="https://camo.githubusercontent.com/e45e39c36eebcc4c66e1aecd4e4145112d8e88e3/687474703a2f2f692e696d6775722e636f6d2f6a6a3341354e382e706e67">
	<figcaption>Image courtesy of donnemartin </figcaption>
</figure>

In deploying a stack, you want to be mostly certain of the way that you deploy it from the beginning,
because certain containers begin to rely on the minutae of what its input from another API looks like and
changing that is not as streamlined as one would like. If you are looking for a stack to replicate, you
should be comfortable choosing the following applications for their current bleeding-egde reputations.

* Reverse Proxy: __Nginx__ lets us use [LetsEncrypt](https://letsencrypt.org/), a free and open Certificate Authority which
also allows us to generate free TLS Certificates for each of our subdomains, all while still maintaining a [SSL Labs](https://www.ssllabs.com/) A+ rating.

* Backend Framework: __Django REST__ allows us to use the highly scalable Python Web framework 
    while sending JSON data as response requests. This works perfectly in conjunction with our app's frontend [React Native](https://facebook.github.io/react-native/)
    which injests JSON as input.

* Frontend Framework: __React Native__ allows us to deploy to androids and iPhones seemlessly all
    while using Javascript, a forgiving, highl level, weakly typed language that's _relatively_ 
    easy to debug.

* Relational Database Management System: __PostGreSQL__ with the __PostGIS__ extension allows us to
    use geolocational data.

* Cache: __Redis__ is our highly scalable, master-slave ready, in-memory cache. We chose redis over memcached due to
    more support in Django.

* Asynchronous task completion: __Celery__ allows us to use run non-blocking tasks such as sending texts,
    emails, or creating notification objects outside of the user's request.

* Task Message Broker: __RabbitMQ__ - as opposed to using Redis as a message broker - allows us to
    persist tasks even in the off chance that RabbitMQ needs to be restarted. Redis does not
    allow for this.

* Containerization Strategy: __Docker__ means we deploy each of the above strategies as
    microservices and then orchestrate them in a production environment using [Kubernetes](https://kubernetes.io/).

* Orchestration Strategy: __Kubernetes__ allows for zero downtime of the service through deployment
    updates and potential rollbacks.

* Profiling: [Django Silk](https://github.com/jazzband/django-silk) Is an open source profiler for django
    which creates models in your applications database which can be updated on a variable scale and lets
    us see where bottlenecks in certain views occur, or where [N+1](http://blog.scoutapp.com/articles/2018/04/30/finding-and-fixing-n-1s-in-django-apps) issues
    arise.

* Error Reporting: __Sentry.io__ is an entirely open source service that allows us to setup our own
    sentry service as a container of one of our GKE nodes.

* Replicas: Due to the nature of microservices being extremely portable, it's so easy to scale
    each of the above services to infinity based on the current required need. For example, say we
    need far more Asynchronous task workers deployed because we are currently undergoing a large amount
    of user signups and we need to be able to send a large amount of notifications to friends of the
    user signing up, emails, etc. 

Now that we have our stack up and running, we would want in the most ideal circumstance to be able
to access various data pertaining to each node, and pod container. For this, we deployed a __stat stack__.

First, we need a data aggregating tool. There are plenty of choices from [StatsD](https://github.com/etsy/statsd) to [influxDB](https://www.influxdata.com/) to [Prometheus](https://prometheus.io/), but
we decided to go with Prometheus. 

* Prometheus allows us to aggregate data into a queryable format and also provides an API from which we use
[Grafana](https://grafana.com/) to scrape from.

* Grafana is originally a [graphite](https://graphiteapp.org/) extension that allows graphing a wide variety of data sources
    ranging from Prometheus, to a PostgreSQL or MySQL instance. 

* Additionally we use [Node-exporter](https://github.com/prometheus/node_exporter), [cAdvisor](https://github.com/google/cadvisor), 
    and [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/) for Prometheus to scrape from.

I would absolutely recommend the same or similar stack to anyone who wants to create a reliable,
highly scalable infrastructure for their webservice or similar application, the ease of knowing that
everything _just works_ is just another reason that living in 2018 is something to be appreciative of.
It's the most bleeding edge of technological advancement which we have available to us today, and it's
only going to get more mainstreamed from here.
