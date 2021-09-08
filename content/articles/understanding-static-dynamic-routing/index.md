---
layout: engineering-education
status: publish
published: true
url: /understanding-static-dynamic-routing/
title: Understanding Dynamic and Static Routing
description: In this article, we will look at Routing Information Protocol (RIP), Open Shortest Path First (OSPF), and Enhanced Interior Gateway Routing Protocol (EIGRP).
author: rabo-james-bature
date: 2021-02-25T00:00:00-12:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-static-dynamic-routing/hero.jpg
    alt: Dynamic and Static Routing image example
---
Networking devices share data among themselves with the help of a router, a router is a device that learns which paths are available and which path is best to forward traffic to. The mechanism through which the router makes such a decision is known as **routing**. 
<!--more-->

In this article, we will look at static and dynamic routing with the following objectives:
- To understand what static routing is.
- When to use static routing in setting up a network.
- The advantages and limitations of static routing.
- What dynamic routing is.
- The benefits and limitations of dynamic routing.
- When to install static or dynamic routing.
- A brief introduction to some dynamic routing protocols in use today.

### Table of contents
- [Functions of a router](#Functions-of-a-router)
- [Routing decision](#Routing-decision)
- [Remote networks](#Remote-networks)
- [Static routing](#Static-routing)
- [Types of static routes](#Types-of-static-routes)
- [When to use static routes](#When-to-use-static-routes)
- [Advantages of static routing](#Advantages-of-static-routing)
- [Limitations of static routing](#Limitations-of-static-routing)
- [Dynamic routing](#Dynamic-routing)
- [Interior and Exterior Routing Protocols](#Interior-and-Exterior-Routing-Protocols)
- [Conclusion](#Conclusion)
- [Further reading](#Further-reading)

### Router
A router is a networking hardware device designed to receive, analyze and forwards internet protocol packets between computers in a network.

### Functions of a router
A router uses information contained in the internet protocol header to make various decisions; these decisions include:
- Path determination
- Routing decision
- Load balancing

#### Path determination
When a router receives an IP packet through any of its interfaces, the router examines the packet's destination IP address, the optimal path to reach this destination is added to the routing table. Metrics are used to determine the optimal path to reach a destination IP address through static and dynamic routing protocols. These metrics are standard measurements or vectors that give a quantitative value measure for the distance to a given network.

### Common metric
A common metric can either be: hop count, bandwidth, delay, current load on the path, reliability, or the combination of two or more of these standards.

#### Hop count
Hop count is the number of internetworking devices, such as a router that an IP packet must pass through to reach its destination subnet.
If a routing protocol uses Hop count as its metric, then the path with the least metric or number of routers is considered the best path.
This path is then added to the routing table if there is no other routing protocol with less administrative distance.
RIP uses hop count as its metric.

![Hop count](/engineering-education/understanding-static-dynamic-routing/hop.jpg)

In the image above, a sub-network-A device wants to reach another in sub-network-B; using hop count as its metric; the network will use Route 1 because it has the least Hop count value (2).

#### Delay
Delay refers to the time taken to send data from source to destination; this includes the time taken by a router to process and send a datagram to the receiving interface. For protocols that use delay as their metric, the link with low latency is considered the best path. 

#### Bandwidth
Bandwidth is defined by [this article](https://www.coursehero.com/file/80482127/Lecture-11pptx/) as the number of bits that a link between two devices can send per second.

For a protocol that uses bandwidth capacity as its metric, the protocol determines the bandwidth capacity of all possible routes to the destination subnet, and the route with a higher bandwidth capacity is considered the best path added to the routing table.

Because metric can depend on single or many characteristics, Enhanced Interior Gateway Routing Protocol (EIGRP) uses a composite of bandwidth and delay to calculate its metric.

![Bandwidth](/engineering-education/understanding-static-dynamic-routing/bandwidth.jpg)

In the figure above, Router 6 will prefer to send its traffic through router 8 rather than send it through router 7 because the route through router 8 has a higher bandwidth.

#### Load
Network load refers to the extent to which a network resource like a router or link between networks is used at any given period. For protocols that use load as their metric, the path with the least load is considered the best and added to the routing table to transmit the datagram to the destination subnet.

![Load](/engineering-education/understanding-static-dynamic-routing/load.jpg)

### Routing decision
The primary function of a router is to forward a packet to its destination. The router achieves this by encapsulating the IP packet with the appropriate data link frame type of the egress port. This encapsulation happens after the router has determined the exit interface associated with the best path to forward that packet. 

The path can either be:
- A  directly connected route (the destination address in the IP header belongs to a network connected to one of the router interfaces).
- A remote network (when the destination IP address of the packet belongs to another network).
- No route determined (when the destination address is not in the routing table).

### Load balancing
A router can have two or more paths with equal metric and administrative distance to a destination sub-network. When this happens, the router will forward the packet using both paths.

The method of sending data to a destination sub-network using two or more paths is called **Load balancing**.

Load balancing is possible because a routing table can contain many paths associated with different exit interfaces of a router having an equal metric or cost path.

![Load balancing](/engineering-education/understanding-static-dynamic-routing/load.jpg)

In the figure above, the network uses RIP as its routing protocol. To send traffic to Sub-network B, Router 6 will distribute its traffic to Route 1 and 4 because they have an equal metric. For a well-configured network, load balancing increases the network's effectiveness and performance for both static and dynamic routes.

#### Administrative distance
An organization can configure its router(s) with many dynamic routing protocols and a static route. However, this is not common but required in some situations. 

For example, two companies, A and B, can connect their networks for data transmission. If company A uses Open Shortest First (OSPF), while company B uses the Enhanced Interior Gateway Routing Protocol (EIGRP), one company must configure OSPF and EIGRP.

This router then takes the route learned from OSPF and advertises it to EIGRP and vice versa; this process is called route redistribution; under such a situation, a routing table can contain more than one route source a destination network. 

In this situation, metric values cannot be used to decide which path to forward traffic because each routing protocol calculates its metric using different information.

To resolve these issues, the Cisco Internetworking Operating System uses a concept known as **administrative distance** to choose which routing protocol's learned route is to be added to the routing table.

The administrative distance a number that represents the dependability of an entire routing protocol on a router. The lower the value of this number, the better the routing protocol.

For example, RIP has an administrative distance of 120, while OSPF default to 110, for a router that learned a path to the same subnet using both RIP and OSPF, OSPF will be the trusted route source and it routing information is added to the routing table to reach the destination subnetwork.

The table below shows some route type and their administrative distance.

|route type|administrative distance|
|-----|-----|
|connected route|   0
static route|   1
EIGRP (internal routes)|    90
OSPF|   110
IGRP|100
RIP| 120
BGP (internal)| 200
BGP(external)|  20

Because a connected route has an administrative distance of 0, it takes precedence over any other route source if any other protocol learned the path to a subnet.

#### Remote networks
A router can find remote networks using either static or dynamic routing.

#### Static routing
Static routing is a routing type in which a network administrator configures the routes into the routing table to be used by the router to send packets to a destination network.

Types of Static routes
1. Standard static route
2. Default static route
3. Summary static route
4. Floating static route

#### Standard static route
This route includes a destination host address, its corresponding network mask, and the IP address of the next-hop address.

#### Default static route
A default static route is used to send packets when an explicit route is not present in the routing table. This route is configured with 0.0.0.0/0 as its destination IPV4 address.

By configuring a default static route, a router can match all packets to use this route.
![Default static route](/engineering-education/understanding-static-dynamic-routing/default.jpg)

#### Summary route
This route reduces the number of routing table entries required for many static routes. A summary route can only be implemented on contiguous routes that use the same exit interface or next-hop address.

![Summary route](/engineering-education/understanding-static-dynamic-routing/summary-route.jpg)

#### Route summarization
A summary route can be calculated for contiguous addresses; this calculation can be done using either the binary or decimal (fastest) method.

The two of which we will gander at in the section below.
Assuming an administrator has the following static routes:

1. 172.16.0.0/ 16 subnet mask-----> 255.255.0.0 
2. 172.17.0.0/ 16 subnet mask-----> 255.255.0.0
3. 172.18.0.0/ 16 subnet mask-----> 255.255.0.0
4. 172.19.0.0/ 16 subnet mask-----> 255.255.0.0

That are contiguous and uses the same exit interface or next-hop address; the administrator can summarize them to have the most optimal route.

This address can be represented in decimal form as:

1. 172.16.0.0 ------ > **10101100.000100**00.00000000.00000000 
2. 172.17.0.0 ------ > **10101100.000100**01.00000000.00000000
3. 172.18.0.0 ------ > **10101100.000100**10.00000000.00000000
4. 172.16.0.0 ------ >**10101100.000100**11.00000000.00000000

From the first octet on the left-hand side, we can see that all the bits in that octet of the addresses matched, and for the second octet, the first 6 bits also matched. With this, the summary address of these contiguous networks can be calculated.
- To obtain the summary address's prefix length, add all the bits that formed a match: the 8 bits from the first octet and the 6 bit from the second octet (8+6 = 14).
- This value indicates that the summary-address will have a /14 prefix, a subnet address of 255.252.0.0.
- For the summary-address with this subnet mask, use the least network address (172.16.0.0) from those contiguous addresses together with the calculated prefix (/14 or 255.252.0.0).
- With this, the summarized address is 172.16.0.0 /14 or 172.16.0.0 with a subnet mask of 255.252.0.0. The binary method of route summarization gives us a detailed explanation of how summary routes are created, but it is time-consuming.
- The decimal method is the fastest, and this method uses the formula: 256-number of subnet = subnet mask for the summary address.
- In this case, we have four networks which are: 172.16.0.0, 172.17.0.0, 172.18.0.0 and 172.19.0.0.
- Thus, the subnet of our summary address will be 256 – 4 = 252. With this, the summarized route is given as 172.16.0.0 with a subnet mask of 255.252.0.0.
  
#### Floating static route
A floating static route is a backup route to any static route or a dynamically learned route. This route is used only when the primary route fails or is unavailable.

![Floating static route](/engineering-education/understanding-static-dynamic-routing/float.JPG)

### When to use static routes
Static route can be used to:
- Reduce the number of routes advertised by a router.
- Create a backup route if the primary route fails.
- To connect a device to a specific network
- To connect a stub router or a stub network.
  
### Advantages of static routing
- It provides easy routing table maintenance in networks.
- Static routing consumes less bandwidth when compared to dynamic routing as no CPU cycles are-used in route calculation and communication.
- Because static routes do not advertise their route over the network, it results in better network security.
  
### Limitations of static routing
- In large networks, configuring and adding a static route to the routing table is very difficult.
- Configuring static routes requires background knowledge of the network topology by the network administrator.
- Static route is error-prone.
  
### Dynamic routing
Dynamic routing is a technique in which a router learns about routing information without an administrator's help and adds the best route to its routing table. A router running a dynamic routing protocol adds the best route to its routing table and can also determine another path if the primary route goes down.

Unlike static routing, the route needs to be reconfigured by the administrator in the event of any change. Different types of dynamic routing protocol are used today; however, in this article, we will take a gander at Routing Information Protocol (RIP), Open Shortest Path First (OSPF), and Enhanced Interior Gateway Routing Protocol (EIGRP).

### Interior and exterior routing protocols
Dynamic routing protocols can be categorized into two groups: Interior gateway protocols (IGP) and Exterior Gateway Routing Protocols (EGP).

Interior routing protocols are designed for use within a single autonomous system, while exterior routing protocols are designed for use between different Autonomous Systems (AS). Any network under the administrative control of a single organization is known as **Autonomous System (AS)**.

Routing protocols that by design work best within an autonomous system are known as IGP and protocols that are designed to exchange routing information between Autonomous Systems (AS) are known as EGP. 

Border Gateway Protocol (BGP) is the only EGP.

#### Routing Information Protocol (RIP)
Routing information protocol is an IGP that bases its internal logic on distance-vector; this vector describes the information a router knows about a route.

This information includes; the destination subnet, the distance metric, and the vector (which is the link and the next-hop router). Routing information protocol is not in use today because it does not scale well for large network implementation.

#### Open Shortest Path First (OSPF)
Open Shortest Path First (OSPF) is a protocol that creates a complete view of the network by gathering information from all the other routers. Protocols that make such a comprehensive view of a network are referred to as link-state protocols. 

These protocols do not use periodic updates to send new routing updates to their neighbors; instead, they advertised every detail about the internetwork to all other routers such that all routers in this internetwork have the same information.

As a link-state protocol, OSPF builds its routes using a mathematical algorithm known as the Dijkstra Shortest Path First (SPF) algorithm.
This algorithm analyses the link-state database and then builds the local routes with the router's information to add to the routing table; these pieces of information are a network address and its subnet mask, an outgoing interface a next-hop router IP address.

#### Three main components of OSPF
Like all other routing protocols, OSPF uses routing protocol information to help build its data structures, which are then processed using a routing algorithm.

This information contains the following major component.
1. Data structures
2. Routing protocol messages
3. Algorithm

### Data Structures
A router configured to run OSPF as a routing protocol creates and maintains the following three table:
- Adjacency database: This database create a table known as the neighbor's table; this table list all neighbor routers that a router has established a bidirectional connection, and it is unique to all routers.
- Link-state database (Topology table): One purpose of forming an OSPF adjacency is to allow two neighbors to exchange their database.
This table stores information about all other routers in that network, and it is identical for all routers within an area with identical LSDB.
- Forwarding database: This database creates the routing table that contains all known networks connected to the router or learned from adjacent routers.
  
### Routing protocols messages
All layer three devices running OSPF uses five packet types to convey their routing information. According to [CISCO](https://www.ciscopress.com/articles/article.asp?p=2294214), these packet types are: Hello Packet, Database Description packet, Link-state request packet, Link-state update packet, and Link-state acknowledgment packet.

### Algorithm
OSPF uses the Dijkstra Algorithm to create its topology table. This algorithm makes a Shortest Path First (SPF) tree by placing every router at the base of this tree and computing the shortest path to every router, and this path is then added to the routing table; hence, the name **Open Shortest Path**.

#### Single-area and multi-area OSPF
OSPF is a link-state routing protocol, and unlike distance vector routing protocols, link-state protocols consume routers resources, and the CPU takes time to run an SPF algorithm; as such, it has slow convergence.

A network administrator can implement OSPF in one of two ways:
1. Single-area OSPF
2. Multi-Area OSPF

### Single-area OSPF
In a single area OSPF, all the router's interfaces are put in the same area, usually called Area 0 (backbone). The problem with single-area OSPF is that more extensive networks suffer because a larger topology database requires more memory and is time-consuming.

### Multi-area OSPF
Multi-area OSPF is used to create fewer routing table entries. These entries summarize the network addresses and also minimizes processing and memory requirements.

In a multi-area OSPF, all areas are connected to area 0, and routers that interconnect two or more areas are referred to as Area Border Routers (ABRs).

### Enhanced Interior Routing Protocol (EIGRP)
The advancement of businesses and technical factors pushed the world toward the second generation of better routing protocols. Today EIGRP and OSPF are the two primary routing protocols in use in modern enterprise networks.

Due to the less robust hop-count of metric that RIP uses, it has fallen away as a serious competitor as most cooperate networks uses either EIGRP or OSPF as their routing protocol.

EIGRP incorporates features of both link-state and distance vector routing protocols. Along these lines, EIGRP doesn't fit into Distance vector protocol or Link-state protocol. 

It bases its vital principle on the distance vector; as such, it is considered as an advanced distance-vector routing protocol.

### EIRGP features
EIGRP has the following features:
- Diffusing Update Algorithm: EIGRP uses a diffusing update algorithm (DUAL) as its computational engine.
- Establishing neighbor adjacencies: Like other routing protocols, EIGRP establishes a relationship with other connected EIGRP connected routers to track its neighbors' status.
- Reliable Transport Protocol: EIRGP uses the Reliable Transport Protocol (RTP) to provide reliable delivery of EIGRP packets.
- Equal and Unequal Cost Load balancing: EIGRP is the only protocol that supports unequal load balancing. This capability allows the administrator to better distribute traffic flow in the networks, thereby reducing delays.

### Advantages of dynamic routing
- It is straightforward to configure.
- It adapts to network topology changes.
- It is suitable in a network where many routers are used.
- Configuring dynamic routing does not require detailed knowledge of the network.

### Disadvantages of Dynamic Routing
- Dynamic routing consumes many network resources when compared to static routing.
- This is because dynamic routing broadcast network information, which amounts to a huge security risk as an attacker can learn about the whole network, especially during recon attacks.
- It can be complex to install.

### To summarize: 
- The reader learned about routing.
- The reader learned about static and dynamic routing.
- The reader learned about  advantages and disadvantages static and dynamic routing.
- The reader learned about the functions of a router.
- The reader learned about the common dynamic routing protocols in use.

### Conclusion
Both Static and Dynamic routing have their advantages and disadvantages; it is up to the network administrator to study the network to know which protocols they need to apply or if both will be required.

Happy coding.

### Further reading
- [Routing Protocol messages](https://static-course-assets.s3.amazonaws.com/ScaN6/en/index.html#8.1.1.3)
- [Floating Static route](https://www.ciscopress.com/articles/article.asp?p=2180209&seqNum=4)
- [OPSF](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/configuration/xe-16/iro-xe-16-book/iro-cfg.html)
- [EIGRP](https://en.wikipedia.org/wiki/Enhanced_Interior_Gateway_Routing_Protocol)
- [Route summarization](https://www.ciscopress.com/articles/article.asp?p=2995352)

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

