---
layout: engineering-education
status: publish
published: true
url: /breaking-down-load-balancers/
title: Breaking Down Load Balancers
description: By adding a load balancer to a web application you not only increase the amount of servers that support a single application, but you also increase the reliably of an application with backups and fallback servers.
author: gregory-manley
date: 2019-12-19T00:00:00-07:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/breaking-down-load-balancers/hero.jpg
    alt: load balancer
---
Modern Internet infrastructure requires multiple computers to serve a website or web application reliably around the globe, but each of these computers has a different external IP address. While this would not be a problem if all of the computers hosted a different application, DNS (Domain Name Server) and mobile applications rely on a single IP to connect to.
<!--more-->

### What Does a Load Balancer Do?
According to [NGINX](https://www.ngnix.com/resources/glossary/load-balancing/), "a load balancer acts as the 'traffic cop' sitting in front of your servers and routing client request across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization and ensures that no one server is overworked, which could degrade performance."

Modern web applications can serve hundreds of thousands of concurrent requests, and as such, are responsible for returning the correct and desired information to the client. By adding more than one server to serve this information, a load balancer is placed into function. [NGINX](https://www.ngnix.com/resources/glossary/load-balancing/) says that the main functions of a load balancer are to:

- Distribute client requests or network load efficiently across multiple servers
- Ensure high availability and reliability by sending requests only to servers that are online
- Provide the flexibility to add or subtract servers as demand dictates

### Common Load Balancing Algorithms
A load balancer has to determine how to route incoming traffic to available servers. To do this, they follow algorithms, which can range from simple to very complex.

- **Round Robin:** A simple algorithm where the load balancer forwards traffic to each server in its system in a known and given order.
- **Least Connections:** With this algorithm, whenever a new request comes in, it is forwarded to the server with the fewest current connections.
- **IP Hashing:** This method determines where the request is forwarded to by the hash of the IP address. By using this algorithm, load balancers can automatically forward repeat users (from the same computer) to the same server. These types of systems can help sites like those that have shopping carts and store that information on the server.

Many modern Internet applications require the use of load balancers due to the immense amount of traffic they serve. By adding a load balancer to a web application, you not only increase the amount of servers that support a single application, but you also increase the reliability of an application with backup and fallback servers. This system allows for sites like Google and Amazon to have high uptimes, with almost no downtime, by relying on a multitude of computers networked together with a load balancer.
