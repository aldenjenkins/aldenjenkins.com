---
title: 'Deploying GeoDjango in an Alpine Linux Docker Container'
date: 2019-01-19
author: Alden
layout: post
permalink: /blog/geodjango-alpine-docker/
categories:
  - Technology
tags:
  - docker, alpine, geodjango
comments: true
readTime: '5 min'
image:
  feature: "geodjango-alpine.jpg"
---

In deploying [metoo.io](https://metoo.io) with Kubernetes, I wanted to reduce the time
from launching a new deployment until the deployment was live as short as
possible. In the beginning, metoo was containerized using the typical uncomplicated method
of using an Ubuntu Docker image like most other GeoDjango builds. While the image
worked fine, the image size was ~600MB. But why is this size an issue?

Smaller containers simply download and deploy faster than larger ones. While we
already use Google Compute Engine for our remote servers, we found it easy to decide
that we would store our Docker images in GCR instead of Dockerhub. This was because
GCR allows for free
storage and transfer to nodes within Google's data centers. Additionally, polling GCR
for container downloads on GKE servers hosted inside those same data centers inherently
makes container download much faster.

While Ubuntu is not necessarily the __most__ bloated operating system you could run inside
Docker container, there is 
definitely room for improvement. Under further investigation, Alpine Linux was
the most minimal while being (almost) fully-compatible-with-GeoDjango operating systems
you could choose from. Compared with Ubuntu's size of 600MB, Alpine sported a size of
just ~200MB. We saw improvements of deployment times of just over 1 minute with Ubuntu images
down to just about 10 seconds using Alpine.

### Considerations
There are a few considerations you want to make in deciding whether or not to 
switch to alpine or not. 
* Be prepared to have a test suite to run after deploying.
    - Understand that since you are likely not developing on the same Alpine Linux Environment,
        that you're deploying on, there may be dependency issues that do not arise until you
        run the container and check literally everything that can be checked with your 
        deployment. This is both a good thing and a bad thing because it will keep you
        honest about testing all of your code but will also really slap you in the face
        if you accidentally forget to test something which breaks. For example, we had a very
        outlandish error arise when we were using a specific GeoDjango admin module which
        would crash the server on our Alpine build when viewing an admin page that rendered
        a point on a map which didn't occur on my Arch development environment.

* If you are hosting an open source application that you want to be
    easily accessible to others, recognize that Alpine is much harder for the laymen
    programmer to work with.

* Dependency Issues arise frequently and out of nowhere
    - Anticipate for the worst case that you are going to run into a build issue at least once 
        every 6 months at the cost of the smaller image size.

## Alpine with GeoDjango 

No released version of Alpine came with either the GEOS or GDAL libraries available
for installation, and only the experimental `edge` version of alpine to this day has
the packages downloadable. To solve for this, I build the `python:alpine` docker image
from scratch within my Dockerfile then added the required build dependencies manually in a separate
run layer.

Feel free to use the code for your GeoDjango Deployments and spread the love! :D

{% highlight go %}
FROM alpine:3.8
# This^ sets the remote package index inside /etc/apk/repositories which we will manually override later to use the edge index.
 
# ensure local python is preferred over distribution python
ENV PATH /usr/local/bin:$PATH

# http://bugs.python.org/issue19846
# > At the moment, setting "LANG=C" on a Linux system *fundamentally breaks Python 3*, and that's not OK.
ENV LANG C.UTF-8

# install ca-certificates so that HTTPS works consistently
# the other runtime dependencies for Python are installed later
RUN apk add --no-cache ca-certificates

ENV GPG_KEY C01E1CAD5EA2C4F0B8E3571504C367C218ADD4FF
ENV PYTHON_VERSION 2.7.14

RUN set -ex \
   	&& apk add --no-cache --virtual .fetch-deps \
		gnupg \
		openssl \
		tar \
		xz \
	\
	&& wget -O python.tar.xz "https://www.python.org/ftp/python/${PYTHON_VERSION%%[a-z]*}/Python-$PYTHON_VERSION.tar.xz" \
	&& wget -O python.tar.xz.asc "https://www.python.org/ftp/python/${PYTHON_VERSION%%[a-z]*}/Python-$PYTHON_VERSION.tar.xz.asc" \
	&& export GNUPGHOME="$(mktemp -d)" \
	&& gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$GPG_KEY" \
	&& gpg --batch --verify python.tar.xz.asc python.tar.xz \
	&& rm -rf "$GNUPGHOME" python.tar.xz.asc \
	&& mkdir -p /usr/src/python \
	&& tar -xJC /usr/src/python --strip-components=1 -f python.tar.xz \
	&& rm python.tar.xz \
	\
	&& apk add --no-cache --virtual .build-deps  \
		bzip2-dev \
		coreutils \
		dpkg-dev dpkg \
		gcc \
		gdbm-dev \
		libc-dev \
		linux-headers \
		make \
		ncurses-dev \
		openssl \
		openssl-dev \
		pax-utils \
		readline-dev \
		sqlite-dev \
		tcl-dev \
		tk \
		tk-dev \
		zlib-dev \
# add build deps before removing fetch deps in case there's overlap
	&& apk del .fetch-deps \
	\
	&& cd /usr/src/python \
	&& gnuArch="$(dpkg-architecture --query DEB_BUILD_GNU_TYPE)" \
	&& ./configure \
		--build="$gnuArch" \
		--enable-shared \
		--enable-unicode=ucs4 \
	&& make -j "$(nproc)" \
# set thread stack size to 1MB so we don't segfault before we hit sys.getrecursionlimit()
# https://github.com/alpinelinux/aports/commit/2026e1259422d4e0cf92391ca2d3844356c649d0
		EXTRA_CFLAGS="-DTHREAD_STACK_SIZE=0x100000" \
	&& make install \
	\
	&& runDeps="$( \
		scanelf --needed --nobanner --format '%n#p' --recursive /usr/local \
			| tr ',' '\n' \
			| sort -u \
			| awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }' \
	)" \
	&& apk add --virtual .python-rundeps $runDeps \
	&& apk del .build-deps \
	\
	&& find /usr/local -depth \
		\( \
			\( -type d -a \( -name test -o -name tests \) \) \
			-o \
			\( -type f -a \( -name '*.pyc' -o -name '*.pyo' \) \) \
		\) -exec rm -rf '{}' + \
	&& rm -rf /usr/src/python

# if this is called "PIP_VERSION", pip explodes with "ValueError: invalid truth value '<VERSION>'"
ENV PYTHON_PIP_VERSION 9.0.1

RUN set -ex; \
	\
	apk add --no-cache --virtual .fetch-deps openssl; \
	\
	wget -O get-pip.py 'https://bootstrap.pypa.io/get-pip.py'; \
	\
	apk del .fetch-deps; \
	\
	python get-pip.py \
		--disable-pip-version-check \
		--no-cache-dir \
		"pip==$PYTHON_PIP_VERSION" \
	; \
	pip --version; \
	\
	find /usr/local -depth \
		\( \
			\( -type d -a \( -name test -o -name tests \) \) \
			-o \
			\( -type f -a \( -name '*.pyc' -o -name '*.pyo' \) \) \
		\) -exec rm -rf '{}' +; \
	rm -f get-pip.py && mkdir -p /app

# Add Project-specific Dependencies
COPY ./requirements.txt /app

# GeoDjango Dependencies
ENV PACKAGES="\
    alpine-sdk \
    libffi-dev \
    jpeg-dev \
    python-dev \
    zlib-dev \
    musl-dev \
    libffi \
    postgresql-dev \
"

RUN \
	apk add --virtual .build-deps --no-cache --upgrade $PACKAGES \
   	&& echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" > /etc/apk/repositories \
   	&& echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
   	&& echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories  \
        \
        && apk add \
            gdal-dev \
            geos-dev  \
        \
        && apk add --virtual .build-deps postgresql-libs \
        \
	&& pip install --upgrade pip \
	&& pip install -r requirements.txt --no-cache-dir \
        \
	&& apk --purge del .build-deps

# Add application
COPY . /app

WORKDIR /metoo-backend
CMD gunicorn -b :8080 app.wsgi
{% endhighlight %}
