---
title: 'What is a Serverless Backend?'
date: 2018-10-12
author: Alden
layout: post
permalink: /blog/what-is-a-serverless-backend/
categories:
  - Technology
comments: true
readTime: '4 min'
---

#### **This website is completely serverless**
{: style="text-align: center;"}


Serverless backends are becoming the bleeding edge of web backend solutions.
The irony of a serverless backend is that there is actually still a server,
but it is unaccessible at the hardware level to both the public and you as the
web service creator. The awesome part about serverless backends is that they 
still provides the same features and dynamic content available
on a normally hosted server backend.

### How is this possible?

The standard deployment of a web backend involves spinning up a rented bare-metal VPS and deploying
your service onto the server and serving it to the public through a reverse-proxy like nginx or Apache.
In this standard model, you as the server renter are responsible for maintaining the
security from attacks like open ports, ensuring server uptime, and updates of the server's operating system.
This has been the standard since the beginning of web hosting, but has never providede
the solution to the aforementioned set of security risks. Here's where serverless backends come in.

At its core, a "serverless" backend is still one that is hosted on a server,
but the server is maintained by a cloud provider like Amazon, Microsoft, or Google. **This allows
you to forego any concerns other than the pure function of your web service.**
The big players simply run your functions on their servers. This coins the term
Function as a Service (FaaS).

As opposed to standard bare metal hosting model where you would pay for the server and resources
on a monthly basis, serverless backends are charged based on their usage. 
This benefits the majority of websites who dont receive exorbitant amounts of traffic
to a point where the cost of renting a server for an entire month outweighs the slightly more
expensive price-per-second of FaaS running your code. For perspective, the Amazon Lambda
FaaS let's you run 1,000,000 requests per month, or 400,000GB-Seconds of compute time per month 
before you are charged a single cent, and after that, just $0.20 per 1,000,000 requests thereafter.
This means you could get 1,000,000 contact form requests from my [serverless contact form application]()
before you are even charged a penny.

Serverless also means you can deploy a completely static site with dynamic features.
This website includes functional mail
This website was created using the static site generator [Jekyll](https://jekyllrb.com/), and is hosted entirely
for free on [Github Pages](https://pages.github.com/).

Checkout my serverless applications on [my github profile!](https://github.com/aldenjenkins)
