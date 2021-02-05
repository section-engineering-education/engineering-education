# Understanding Dynamic and Static Routing

![Hero image](/engineering-education/understanding-dynamic-and-static-routing/hero.jpeg)

[Source](https://unsplash.com/photos/IL1qSqEMNBo)

## Introduction

Different devices work together to ensure that data is transferred from one end device to another, but the router is the primary device that learns which paths are available and which path is best to forward traffic. The mechanism through which the router makes such a decision is known as routing. The path or route through which a packet is sent can either be a static or dynamic route.
In this article, we will look at static and dynamic routing in details and it is expected that at the end of this article, the reader should know:

- What static routing is,
- When to use static routing when setting up a network.
- The advantages and limitations of static routing
- What dynamic routing is
- The advantages and limitations of dynamic routing
- When to implement static or dynamic routing
- A brief introduction to some dynamic routing protocols in use today

### Content

-Functions of a router
-Reaching remote networks with a router
-Static routing
-Types of static routing
-Uses of static routing
-When to use static routing
-Advantages static routing
-Limitations of static routing
-Dynamic routing protocol
-Differences between dynamic and static routing
-Introduction to some dynamic routing protocols (RIP, OSPF, and EIGRP)
-Limitations of dynamic routing
-Conclusion

### Functions of a router

Multiple networks are connected using a router. To make a routing decision, the router uses the information in the internet protocol header to make various decisions which include:

- Path determination
- Routing decision
- Load balancing

**Path determination**
When a router receives an IP packet through any of its numerous interfaces, the router examines the destination IP address on the Packet to use in forwarding the packet, this packet is forwarded using the optimal path to that destination address in its routing table through a process called **routing**. Routing uses an algorithm that is responsible for deciding the best path through which a packet can be transmitted.
Both static and dynamic routing protocols use a metric to determine the best path to use for the transmission of the packet. These metrics are standard measurements or vectors which can be either be; hop count, bandwidth, delay, current load on the path, reliability, or the combination of two or more of these standards which gives a quantitative value to measure the distance to a given network. For static routes, these metrics do not change, while for dynamic protocols, these metrics are dynamic and their value can be assigned by an administrator.

#### Common Metric

**Hop count:** This is the number of internetworking devices, such as a router in which a packet must pass through to reach its destination subnet. If a routing protocol uses Hop count as its metric, then the path with the least metric or number of routers is considered the best path. This path is  then added to the routing table only if there is no other routing protocol with less administrative distance. Routing Information Protocol (RIP) uses hop count as its metric.
![Hop count](/engineering-education/understandinding-dynamic-and-static-routing/hop.jpeg)
[Image source](AUthor)

In the image above, a device in sub-network-A want to reach another in sub-network-B, using hop count as its metric, the network will use Route 1 because it has the least Hop count value (2)

**Delay:** delay refers to the time taken to transmit data from source to destination. This includes the time taken by a router to process and transmit a datagram to the receiving interface.

**Bandwidth:** This is the capacity of a link or the number of bits that a link between two devices can transmit per second. The link with a higher transfer rate is preferable to the link with a lower bandwidth capacity. For a protocol that uses bandwidth capacity as its metric, the protocol determines the bandwidth capacity of all possible route to the destination subnet, and the route with higher bandwidth capacity is considered the best path and then added to the routing table which will use any time that a packet is to be sent to that destination subnet.
Because metric can be based on single or multiple characteristics, Enhanced Interior Gateway Routing Protocol (EIGRP) uses a composite of bandwidth and delay to calculate its metric.
![Bandwidth](/engineering-education/understandinding-dynamic-and-static-routing/bandwidth.jpeg)
[Image source](AUthor)
In the figure above, Router 6 will prefer to send its traffic through router 8 rather than send it directly to router 7 because the route through router 8 has a high bandwidth.

**Load:** Network load refers to the extent to which a network resource like router or link between networks is busy or being used at a given period. As traffic within the network increases. For protocols that use load as their metric, the path with less load is considered the best path and it is this path that is added to the routing table for the transmission of the datagram to the destination subnet.

### Routing decision

The primary function of a router is to forward a packet to its destination. The router encapsulates the IP packet using the appropriate data link frame type of the egress port. This is done after the router has determined the exit interface associated with the best path to use in forwarding that packet. This path can either be a directly connected route( the destination address in the IP header belongs to a network connected to one of the router interfaces), a remote network (when the destination IP address of the packet was learned from another router), or no route determined ( when the destination address is not directly connected or was not learned from another router, that is; it is not in the routing table) in this case the router uses the default gateway to forward the packet, but in a situation whereby a default route is not configured, the packet is discarded or dropped.

### Load balancing

A router can have two or more paths that have equal metric and administrative distance to a destination sub-network. When this happens, the router will forward the packet using both paths equally. This method of sending data to a destination sub-network using two or more paths is called *Load balancing*. This is possible because a routing table can contain multiple paths associated with different exit interfaces of a router but equal metric or cost path.

![Load balancing](/engineering-education/understandinding-dynamic-and-static-routing/load.jpeg)
[Image source](Author)

In the figure, the network uses RIP as its routing protocol. To send traffic to Sub-network B, Router 6 will distribute its traffic equally to Route 1 and 4 because they have an equal metric.
For a well-configured network, load balancing increases the effectiveness and performance of the network and can be configured on but static and dynamic routes.

## Administrative distance

 An Organization can configure its router(s) with multiple dynamic routing protocols and a static route. Though this is not common, it is required in some situations. For example, two companies; A and B can connect their networks to exchange data, therefore the need to exchange routing information.  If company A uses Open Shortest First (OSPF), while company B uses Enhanced interior gateway routing protocol (EIGRP), then both OSPF and EIGRP must be configured on at least one router. This router then takes the route learned from OSPF and advertises it to EIGRP and vice versa, this process is called **route redistribution**. If this occurs, then the routing table can contain more than one route source to a destination network.
When a routing protocol learns more than one route to the same destination subnet, the metric is used to decide which route is the best, but in a situation whereby two different routing protocols learn a route to the same subnet, the metric values cannot be used to decide which path to use because each routing protocol calculate its metric using different information. To resolve these issues, the cisco internetworking operating system (OIS) uses a concept known as **administrative distance** to decide which routing protocol's learned route is to be added to the routing table. **Administrative distance is a number that represents the trustworthiness of an entire routing protocol on a router**. The lower the value of this number, the better the routing protocol. For example, RIP has an administrative distance of 120, while OSPF default to 110, for a router that learned a path to the same subnet using both RIP and OSPF, the router will believe OSPF to be the trusted route source and it routing information is added to the routing table which will be used to reach the destination subnetwork.
The table below shows some route type and their Administrative distance.
|route type| administrative distance
|--------|------------|
|directly connected route|0|
|static route|1|
|EIGRP (internal routes)| 90|
|OSPF| 110
|IGRP|100
|RIP|120|
|BGP (internal)|200|
|BGP(external)|20|
Because a directly connected route has an administrative distance of 0, it takes precedence over any other route source if the path to a subnet is learned by any other protocol.

### Remote networks

A router can learn about remote networks manually or dynamically.
For manually learned networks, the route is entered into the routing table when a static route is configured by an administrator. This type of routing is referred to as **static routing**, while for a dynamically learned route, the remote route is automatically learned using a dynamic routing protocol and this process is known as **dynamic routing**.

#### Static routing

Static routing is also known as non-adaptive routing, it is a type of routing in which a network administrator manually configures the routes into the routing table so that it can be used by the router to send packets to the destination subnet using the specified route. This static route specified path between two networking devices explicitly and can only be implemented after a directly connected interface has been configured and added to a routing table.
Two common static routes found in a routing table are:

- Default static route
- A static route to a specific network.

A default static route is also referred to as the gateway of last resort because it specifies an exit interface to use when a more precise destination address is not found in the routing table. It is useful on routers or networks that have only one exit point to another network or router or an Internet Service Provider (ISP).  In a situation where a destination address is not found on the routing table and a default static route is not configured on that router, the packet is discarded.
An IPV4 default static route can be configured on a CISCO router using the global configuration command.
Router(Config)# IP route 0.0.0.0.0  0.0.0.0 {exit|next-hop}  (this command will be covered in a subsequent article).

### Types of Static routes

Static routes can be grouped into:

- Standard static route
- Default static route
- Summary static route
- Floating static route

**Standard static route** This Is a route that consists of a destination host address, its corresponding network mask, and the IP address of the next-hop address.

**Default static route**
 It is a route configured with 0.0.0.0/0 as its destination IPV4 address. By configuring a default static route, a router can match all packets to use this route. A default static route is used to send packets when a more specific route match is not found in the routing table.
![Default Static route](/engineering-education/understandinding-dynamic-and-static-routing/default-route.jpeg)
[Image source](Author)

**Summary route**
A routing table can contain a summary route, this route reduces the number of routing table entries required for multiple static routes. This type of route can only be implemented on routes that are contiguous and uses the same exit interface or next-hop address.
![Summary route](/engineering-education/understandinding-dynamic-and-static-routing/summary-route.jpeg)
[Image source](Author)

**Route summarization**
To configure a summary route, the summarized route must be calculated. This calculation can be done using either the binary or decimal (which is the fastest) method. Both of which will be looked at in the example below.
Assuming an administrator has the following static route which is contiguous and uses the same exit interface or next-hop address, the administrator can summarize them to have the most optimal route.
172.16.0.0/ 16    subnet mask-----> 255.255.0.0
172.17.0.0/ 16    subnet mask-----> 255.255.0.0
172.18.0.0/ 16    subnet mask-----> 255.255.0.0
172.19.0.0/ 16    subnet mask-----> 255.255.0.0
This address can be represented in decimal form as thus:
172.16.0.0 ------ > **10101100.000100**00.00000000.00000000
172.17.0.0 ------ > **10101100.000100**01.00000000.00000000
172.18.0.0 ------ > **10101100.000100**10.00000000.00000000
172.16.0.0 ------ > **10101100.000100**11.00000000.00000000
From the first on the left handside, we can see that all the bits in the  octet of the address matched and for the second octet, the first 6 bit also matched. With this, we now have enough information to create a summary address from these contiguous addresses.
To obtain the prefix length of the summary address, add all the bits that formed a match, that is, the 8 bits from the first octet and the 6 bit from the second octet (8+6 = 14).
This value indicates that the summary-address will have a /14 prefix which a subnet address of 255.252.0.0. For the summary-address with this subnet mask, use the least network address (172.16.0.0) from those contiguous addresses together with the calculated prefix (/14 or 255.252.0.0). With this, the summarized address is 172.16.0.0 /14 or 172.16.0.0 with a subnet mask of 255.252.0.0.
The binary method of route summarization gives us a detailed explanation of how summary routes are created, but it is time-consuming. The fastest method is to use the decimal method which uses the formula:
256-number of subnet = subnet mask for the summary address. In this case, we have four networks which are:  172.16.0.0, 172.17.0.0, 172.18.0.0 and 172.19.0.0. Thus, the subnet of our summary address will be 256 – 4 = 252. With this, the summarized route is given as 172.16.0.0 with a subnet mask of 255.252.0.0.

**Floating static route**
 This route is used as a backup route to a static route or to any route that was learned dynamically.
The route can  only be used  when the primary route is down or unavailable. To create a floating static route, the route is assigned a higher administrative distance than the primary route.
![Floating static route](/engineering-education/understandinding-dynamic-and-static-routing/float.jpeg)
[Source](https://www.ciscopress.com/articles/article.asp?p=2180209&seqNum=4)

### When to use the static route

Static route can be used to:

- reduce the number of routes advertised by a router.
- create a backup route if the primary route goes down.
- To connect a device to a specific network
- To connect a stub router or a stub network.

### Advantages of static routing

Static routing has the following advantages:

- It provides an ease for routing table maintenance in networks that are not expected to grow.
- Static routing consume less bandwidth when compared to dynamic routing as no CPU cycles are -used to calculate and communicate route
- Because static route does not advertise their route over the network, it results in better network security.

### Limitations of static routing

- In large networks, configuring and adding a static route to the routing table is very difficult.
- To configure a static route, the administrator must have a good knowledge of the network topology to be able to add each route manually.
- Static route is  error-prone especially, in large networks.

## Dynamic routing

Routing protocols are used to exchange routing information so that routers can learn network routes. A router uses this information to learn about a network subnet, route to reach those networks, and the trustworthiness of that route. Dynamic routing also known as adaptive routing is a technique in which a router learns about this information automatically without the help of an administrator and adds the best route to its routing table. A router running a dynamic routing protocol does not only adds the best route to its routing table but can also determine another path if the primary route goes down. Unlike static routing in which the route needs to be reconfigured by the administrator in the event of any change.
There are various types of dynamic routing protocol is used, but in this article, we will look at: Routing Information Protocol (RIP), Open Shortest Path First (OSPF), and Enhanced Interior Gateway Routing Protocol (EIGRP).

### Interior and Exterior Routing Protocols

Routing protocols can be categorized into two major groups: Interior gateway protocols (IGP) and Exterior Gateway Routing Protocols (EGP).

**Interior routing protocols** are protocols designed for use within a single autonomous system while **exterior routing protocols** are designed for use between different Autonomous Systems (AS). An Autonomous System is any network that is under the administrative control of a single organization; as such, routing protocols that by design work best within an autonomous system are known as IGP, and protocols that are designed to exchange routing information between Autonomous Systems (AS) are known as EGP, and Border Gateway Protocol (BGP) is the only EGP is used today.

### Routing Information Protocol (RIP)

Routing information protocol is not commonly used today because it does not scale well for large network implementation. However, because it is one of the first routing protocols to come into existence, having a basic understanding of it gives us an advantage in understanding other more advanced routing protocols like OSPF and EIGRP. Routing information protocol is an IGP that based its internal logic on distance-vector, this vector describes the information a router knows about a route.
This information include; the destination subnet, the distance (metric, and the vector (which is the link and the next-hop router).

### Open Shortest Path First (OSPF)

Open Shortest Path First (OSPF) is a link-state routing protocol, this protocols create a complete view of the network by gathering information from all of the other routers. These protocols do not use periodic updates to send new routing updates to their neighbors, rather they collectively advertised every detail about the internetwork to all other routers such that all routers in this internetwork have the same information.OSPF organizes the network topology information using **Link-State Advertisements (LSA)** and **Link-State Database (LSDB)**. As a link-state protocol, OSPF builds its routes using a mathematical algorithm known as the Dijkstra Shortest Path First (SPF) algorithm. This algorithm analyses the link-state database and then builds the local routes with the information the router needs to add to the routing table. This information includes; the subnet number and mask, an outgoing interface, and a next-hop router IP address.

### Three main components of OSPF

Like all other routing protocols, OSPF uses routing protocol information to help build its data structures which are then processed using a routing algorithm. This information contains the following major component.

- Data structures
- Routing protocol messages
- Algorithm.
  
#### Data Structures

In a router configured to run OSPF as a routing protocol, OSPF creates and maintains the following three table:

- Adjacency database:This database create a table known as the neighbor's table, this table list all neighbor routers to which a router has established a bidirectional connection with and it is unique to all routers.
  
- Link-state database (Topology table): One purpose of forming an OSPF adjacency is to allow two neighbors to exchange their database. This table contains information about all other routers in that network and it is identical for all routers within an area that has identical LSDB.

- Forwarding database: This database creates the routing table which contains the route to all known networks either directly connected to the router or learned from adjacent routers.

### Routing protocols messages

According to [CISCO](https://static-course-assets.s3.amazonaws.com/ScaN6/en/index.html#8.1.1.3), all layer 3 device running OSPF exchange messages using five packets type to convey their routing information. These packet types are: Hello packet, Database Description packet, Link-state request packet, Link-state update packet, and Link-state acknowledgment packet.

### Algorithm

OSPF uses Dajistrat Algorithm to create its topology table. This algorithm creates a Shortest Part First (SPF) tree by placing each router at the root of this tree and calculate the shortest path to each node and this path is added to the router's routing table, hence the name **Open Shortest Path**.

### Single-Area and Multi-area OSPF

OSPF is a link-state routing protocol, and unlike distance vector routing protocols, link-state protocols consume routers resources and the CPU takes time to run an SPF algorithm, as such it has slow convergence. To make OSPF more efficient and scalable, OSPF uses hierarchy which can be implemented in one of two ways:

- Single-area OSPF
- Multi-Area OSPF

**Single-area OSPF**
In a single area OSPF, all of the router's interfaces are put in the same area which is usually called Area 0 (backbone). The problem with single-area OSPF is that larger networks suffer from it because a larger topology database requires more memory and it is time-consuming.

**Multi-area OSPF**
OSPF can be implemented using multiple areas. With this, it creates fewer routing table entries because network addresses can be summarized and it also minimized processing and memory requirements. In a multi-area OSPF, all areas must be connected to area 0, and routers that interconnect two or more areas are referred to as Area Border Routers (ABRs).

### Enhanced Interior Routing Protocol (EIGRP)

The advancement of businesses and technical factors pushed the world toward the second generation of better routing protocols. Today EIGRP and OSPF are the two primary routing protocols in use in modern enterprise networks. Due to the less robust hop-count of metric that RIP uses, it has fallen away as a serious competitor as most cooperate networks uses either EIGRP or OSPF as their routing protocol.
EIGRP includes features of both link-state and distance vector routing protocols, because of this, EIGRP does not fit clearly into Distance vector protocols or Link-state protocols, but it based its key principle on the distance vector, as such it is considered as an *advance distance vector routing protocol* as it includes features not found in other distance vector routing protocols.

### EIRGP features

EIGRP has the following features:

**Diffusing Update Algorithm**: EIGRP uses diffusing update algorithm (DUAL) as its computational engine.

**Establishing neighbor Adjacencies**: like other routing protocols], EIGRP establishes a relationship with other directly connected EIGRP connected routers to track the status of its neighbors.

**Reliable Transport Protocol**:  EIGRP uses Reliable Transport Protocol (RTP) to provides reliable delivery of EIGRP packets to its neighbors.

**Equal and Unequal Cost Load balancing**: Unlike other routing protocols, EIGRP is the only protocol that supports load balancing. This capability allows the administrator to better distribute traffic flow in the networks hence reducing delays.

## Advantages of dynamic routing

Dynamic routing protocols have the following advantages.

- It is very easy to configure
- It automatically adapts to network topology changes.
- It is suitable in a network where multiple routers are used
- Configuring dynamic routing does not require detailed knowledge of the network.

## Disadvantages of Dynamic Routing

- Dynamic routing consumes much network resources when compared to static routing.
- Because dynamic routing periodically broadcast network information, it amounts to a huge security risk as an attacker can learn about the whole network, especially during recon attacks.
- It can be complex to implement.

## Conclusion

Both Static and Dynamic routing have their advantages and disadvantages, it is up to the network administrator to study the network to know which of the protocols he or she needs to apply or if both are required.

