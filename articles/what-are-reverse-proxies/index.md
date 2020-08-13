---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-are-reverse-proxies/
title: What Are Reverse Proxies?
description: Reverse proxies are servers that sit between the request-response process that ensure website application requests are redirected to the proper backend server.
author: ivan-santos
date: 2019-08-19T00:00:00-07:00
topics:
- Edge Computing
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-are-reverse-proxies/hero.jpg
    alt: reverse proxies
---
Section’s main work focuses on providing an Edge Compute Platform to improve scalability, security, and performance for internet traffic worldwide. But how exactly is Section able to live up to that promise? The answer is through the use of reverse proxies in Section’s platform.

<!--more-->
Reverse proxies are servers that sit between the request-response process that ensure website application requests are redirected to the proper backend server. Each reverse proxy handles the request in a different way. There are a variety of reverse proxies that can be used to handle a request: such as caching, security, and content optimization proxies. When a collection of reverse proxies are stacked together for the request to go through, it is called a proxy stack. As seen in the image below, taken from Section’s website, a proxy stack is a set of back-to-back reverse proxies that can be configured to handle both HTTP and HTTPS requests. When a request is sent by a client, it will hit the proxy stack first before hitting the application’s origin. Because this stack brings the handling of requests closer to the source, it is said to be at the edge of the process, hence the term edge computing.

![proxy stack](/images/section-diagram.jpg)
An example of a common reverse proxy that is widely used in a proxy stack is [Varnish Cache](/modules/varnish-cache). The Varnish Cache module speeds up the delivery time from the response side by answering from cache. This means that the load time for a website decreases dramatically. Varnish Cache is able to load a website faster because it caches HTTP and because the response comes from a source geographically closer to the source. Rather than a request hitting the origin server, and possibly overloading the origin, the request will travel through a proxy stack containing Varnish Cache. Varnish Cache will then make decisions whether the request is to be answered from cache (and not bother the origin) or handled in a different manner.

### Proxy Stacks in Section
In Section’s case, the Section platform revolves around the use of reverse proxies to enhance customer website applications. Unlike other edge compute platforms, Section allows the customer to configure which reverse proxy modules are a part of the proxy stack and in which order. The order is a key feature since most reverse proxies tend to come after a Web Application Firewall (WAF) reverse proxy. However, Section does not restrict customers to having a WAF first in the proxy stack. This not only makes Section unique from other edge compute platforms, but it gives users freedom in how their website operates.
