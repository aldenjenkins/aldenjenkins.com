---
title: "Alpine Linux is Suckless"
date: 2019-01-19
author: Alden
layout: post
permalink: /blog/alpine-linux/
categories:
  - Technology
tags:
  - docker, alpine, linux, devops, programming
comments: true
readTime: '7 min'
image:
  feature: "alpine.jpg"
---


Alpine Linux can be one of the most useful tools in your DevOps arsenal once you know how to use it.

Depending on the complexity of your use case, it will be a true test of your Docker skills and once you get it down you will have learned so much
along the way... or you may just be able to use a default image and be fine with no hassle! Regardless here you'll learn what the
hype about Alpine Linux containers is all about and how you can go about creating them when you need to.

You've probably seen a lot of Docker image tags ending in `:alpine`, `:alpine-3.8`, `:alpine-edge`, and are wondering
what the heck those mean. At its core, Alpine Linux is a much more __minimal__ Linux distribution that does not
come with as many built-in features. This is intended though, because _with less of what you don't need
you can build the image to have only what you do need_. This helps cuts down the size of your images
which ultimately decreases the time that it takes to start your containers. Additionally your container will be optimized to run
operations only useful for your application. This means no Bloat-ware that takes up your system 
resources in these containers!

This is what makes Alpine [Suckless](https://suckless.org/).

For most of you that can use a standard docker image for your use case like `python:3-alpine`, that is all
you really need to know about Alpine because all of the build work is already done for you. For the rest
of you who need to know how it works, strap in!

Let's take a look at an example Alpine Dockerfile that builds all of the system libraries and dependencies
that you need to run curl

{% highlight go %}
FROM alpine:3.8

RUN apk add --no-cache curl

ENTRYPOINT ["/usr/bin/curl"]
{% endhighlight %}

The `--no-cache` option for the apk package manager is important because it allows all of the source files
used to build the shared objects and executables to be deleted from the system after building. This means that you will
only be left with the executables after the command runs. This can be an issue for specific builds where
the libraries of certain packages are required to build or use other packages.



The solution to this problem is to use the `--virtual` option when installing apk packages which
allows you to specify a virtual directory to temporarily store all of the libraries, source code, and executables inside of
and manually delete that directory after you've built the package that you need by running
`apk del .dir-name` at any point in the image build process that you would like. Or, if you need
those libraries and shared objects during production usage, you can simply run `apk add package-name`
and it will keep everything like a normal package manager would.

Consider installing vim which requires gcc to build:
{% highlight go %}
FROM alpine:3.8

RUN apk add --virtual .build-deps gcc \
    && apk add vim \
    && apk del .build-deps

ENTRYPOINT ["/usr/bin/vim"]
{% endhighlight %}

Here you download and build gcc and then build vim but are only left with the vim executable
because you delete the directory where gcc was installed and now gcc is no longer installed

This is the crux of most peoples strife's with Alpine Linux: build dependency issues. Since Alpine
is able to give you such small images, it sometimes has to compromise with compatibility with
specific packages, and when packages update and you're building using `:alpine-latest`, you're in for
some big trouble if those packages don't. Better hope you have your Docker build layers cached up to 
that point in the Dockerfile!

The art of creating a good, minimal Alpine Linux container comes from being very intimate with
your library versions and build requirements. The only thing that will help you with this is practice,
so go try making an alpine version of your build!
