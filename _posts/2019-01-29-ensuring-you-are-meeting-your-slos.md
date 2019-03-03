---
title: 'Omnipotent Service Level Indicators'
date: 2019-02-11
author: Alden
layout: post
permalink: /blog/omnipotent-service-level-indicators/
categories:
  - Technology
tags:
  - DevOps, SLOs, SLIs
comments: true
readTime: '8 min'
image:
  feature: "retrowave.jpg"
---

Your SLOs (Service Level Objectives) are what keep making your company money, and
what keep you honest as a deployer of your application. At it's core, an SLO is simply
an objective of a specific attribute of your service such as availability, throughput,
response time, etc.

Without ensuring that the SLOs you are creating are met as time
progresses, you'll run into angry customers, tarnishing the relationship that you had with 
them up
to that point. At the same time, you will facilitate underconfident employees who will
feel that the loss of your customer due to an error in service
was either their personal fault, or that your mistakes as their leader are now
compromising their job security by creating potential
revenue uncertainty for the company. The solution to ensuring that your SLOs are met is simply an
investment of time in optimizing your SLIs (Service Level Indicators).

Within the deployment of [metoo.io](https://metoo.io), we use creative SLIs to give
us reliable metrics throughout our deployment environments. We capture **ALL**
of the [telemetry](https://en.wikipedia.org/wiki/Telemetry) between our microservices and scrape the metrics with Prometheus
so that we can graph the data using Grafana, and perform other queries
on the data when required. Grafana is awesome because it allows
us to create multiple dashboards for simultaneous viewing which Prometheus does
not support out of the box. 

Beyond Grafana, we run AlertManager with custom rules
for alerting us when our SLOs are not being met. Our SLO for uptime is a 4 nine 
SLO (99.99% uptime,) and use AlertManager to tell us when our past 10 minute
SLO has not been met. We run a Prometheus query for each environment to check 
whether `!(200 <= response status codes < 404)` start to occur for more than 
0.01% of responses, and other queries regarding communication between services.
But how are we able to collect so much telemetry in the first place?

Enter [Istio](https://istio.io/)! This Service Mesh for Kubernetes allows us to:

* Secure communication between pods using mTLS (beneficial for cross-cloud deployments)
* Automatically collect Telemetry between pods, 
* Give every pod an L7 reverse proxy SideCar container (Envoy Proxy,) which reads from the Istio
    Global Virtual Service rules and Routing rules to give us the ability to:
    - Route a dynamically specified amount of trafic to our staging environment,
    - Route arbitrary device types to an environment of our choice as recorded
        by the L7 reverse proxy.

Since these specifications are all specified in deployment yaml files, it becomes
easy to listen to a webhook sent by AlertManager regarding a 500 (or other status
code) response coming from your Canary Environment and then automatically apply a 

{% highlight bash %}
sed 's/weight: 10/weight: 0/' routing-canary.yaml && kubectl apply -f routing-canary.
yaml 
{% endhighlight %}
change, making your SLIs literally a self-healing omnipotent force in your
DevOps arsenal!!!!! >:D






