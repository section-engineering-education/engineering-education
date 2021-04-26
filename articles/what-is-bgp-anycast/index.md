---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-is-bgp-anycast/
title: What Is BGP Anycast and Where Is It Used?
description: The Border Gateway Protocol (BGP) is a protocol which is used to determine the fastest path in which data will travel to reach its destination. BGP Anycast is a networking technique that allows different servers to share the same IP address.
author: jonathan-popova-jones
date: 2019-08-19T00:00:00-07:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-bgp-anycast/hero.jpg
    alt: bgp anycast networking
---
BGP Anycast is a networking technique that allows different servers to share the same IP address. The Border Gateway Protocol (BGP) is a protocol which is used to determine the fastest path in which data will travel to reach its destination. When a user makes a request to a service using Anycast, the BGP determines the best possible path, out of the servers available within the Anycast network, for the request to take. DNS and CDN systems are the most common examples of Anycast networks. These networks use Anycast since they experience high volumes of traffic from all over the world, which Anycast handles well and provides many benefits.
<!--more-->

### Benefits of BGP Anycast
#### Reducing Latency
Anycast systems are able to reduce latency in user requests since the availability of servers in different locations allow the user to receive data from a server closer to their physical location.

#### Improved Stability
Anycast improves stability by having multiple servers constantly available for users. If one server goes down in the Anycast system, the user will simply be routed to another server. In a traditional system with only one server, the server going down would render the entire service offline.

#### DDoS Mitigation / Load Balancing
Since an Anycast system is comprised of multiple servers, network traffic is spread throughout the various servers. This acts as a load balancer, preventing any single server from receiving an overwhelming amount of traffic. Another feature of Anycast, similar to load balancing, is DDoS mitigation. DDoS attacks are less likely to succeed in taking a service offline in an Anycast system since the attack would have to overwhelm all the servers in the network.

#### Improved Scalability
Anycast systems are great for services that experience high volumes of traffic. If a service using Anycast grows and requires new servers to handle the increase in traffic, new servers can be added to the network to accommodate the additional traffic. Servers can be added to either new locations or locations that already have existing servers on the Anycast network, depending on what you are trying to achieve. If a specific location experiences a large growth in traffic, adding another server to that location will help balance the load for that location. Adding a server to a new location helps reduce latency by creating a new shortest path for some users. Both ways help improve the stability of the service by having more servers available on the network.
