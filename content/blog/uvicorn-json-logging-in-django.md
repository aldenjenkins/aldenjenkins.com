---
title: Uvicorn JSON Logging in Django
date: 2023-04-12
categories:
  - Technology
comments: true
readTime: '3 min'
---

To set your logging config to JSON when you are running uvicorn, which is especially helpful for Datadog log ingestion in kubernetes, you must 
set the following config when starting the uvicorn server. I use a server.py file.
