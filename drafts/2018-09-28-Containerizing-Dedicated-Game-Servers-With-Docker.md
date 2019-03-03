

---
title: 'Containerizing Dedicated Game Servers with Docker'
date: 2018-10-06
author: Alden
layout: post
permalink: /blog/dockerize-dedicated-servers/
categories:
  - Technology
tags:
  - Docker, Steamcmd
comments: true
readTime: '8 min'
description: "This is exactly how I deploy my apps on thiccgaming.com"
---

We already know [containerized applications are the future](/blog/why-docker), so
why not try to dockerize every application? 
I have never heard of any other gaming community using containers for their
servers, but when you understand just how versatile containers are and
their ability to scale and be extremely maluable, you start to question why its
not more common of a deployment method. My only idea is that people who create
dedicated servers often get their direction for creation from old, archaic 
articles. This post hopes to de-mystify alot of the confusion or simply
lack of exposure to the benefits of containerizing game servers.

As dedicated game server hosters, we're all familiar with SSHing 
into our server(s) where we're running **at least** one game server,
maybe a Teamspeak server, and our website. For me, It was a Django app,
a L4D2 server, 2 Garry's mod servers, a RSPS, and a WoW server. Sounds
like a cost effective method right? Now consider how cost effective it would be
if your server had a mention on a famous person's twitter page and you were
flooded with more users to your website than you could have ever hoped.
The site trying to serve the static files to that many people alone would
crash the entire server node by consuming all of its resources, making the
Teampseak server, Webiset, and Game servers all unusable. What are you 
even paying for in that case? 

Enter Docker which provisions

In the past, the limitations of docker which prevented such a task were that docker did not support persistant volume storage
on the host machine, and integrated networks between containers. While kubernetes accomplishes
these tasks, Docker now natively supports such tasks for use in other deployment strategies
like [Docker Swarm](https://docs.docker.com/engine/swarm/).

The current limitations to containerizing dedicated game servers are that **each
game runs on a single process**, meaning that only one container can be used per 
server. This means that your [Garry's mod Roleplay](https://thiccgaming.com/gmod) server can
only have one container dedicated to running it. This means that one of the biggest
issues to consider in hosting within a container is resource allocation to the container
so that you do not over or under allocate at creation time. This isnt an important
consideration if you are using a deployment framework like kubernetes which does this
dynamically based on load.

Let's start by containerizing our L4D2 server.

What we're doing in the following docker image is simply running a server setup the
[same way we would with SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD)
on a normal dedicated server that we had spun up.



--------------------------
begin end of alpine linux build file.
This issue arises when you may pre-emtively remove this build-deps dir and then attempt to install
a library (or package for something like npm pip or bundle,) which requires dependencies from those
sources you just deleted.


So whats the deal with .build-deps? build deps is an option you provide `apk add` to tell apk to
store the library source code in the build-deps directory. What's the benefit of this you may add?
Well 
__once apk compiles this source code, the executables are stored safe and sound while the source code in the build-deps
dir is no longer needed.__ This means that you can delete the build-deps dir to save space in your docker images 
(orchestrating when and when not to add new layers to your docker image is another thing you can do to save
plenty of space in your images and you're probably not already doing it.)

And since the point of using alpine in the first place is to have an extremely minimal container with
inherently small running container sizes, this is exactly something you want to do .

In the following docker image, you will see that we are using a specific version of alpine, alpine:3.8
instead of alpine:edge. While edge containes the newest library versions, it is much less stable when
you build your docker images day to day, since the edge contain the latest nightly builds which could
potentially require a newer version of a different library which could then 




----

We define this as its own docker image because right now alpine will not build with error
ERROR: libcrypto1.1-1.1.1a-r1: trying to overwrite etc/ssl/openssl.cnf owned by libressl2.6-libcrypto-2.6.5-r0.

This means that I can only build on my machine because I have the previous docker builds cached. If I 
lose this arch laptop, I will not be able to build alpine linux geodjango from source, so this
pushes a stable build to gcr.

downfalls:
  cannot upgrade system libs
