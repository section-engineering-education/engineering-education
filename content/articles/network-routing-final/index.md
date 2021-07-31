---
layout: engineering-education
status: publish
published: true
url: /network-routing-final/
title: Understanding Network Routing
description: This article will be an overview on network routing. Routers use algorithms to make logical data decisions when selecting paths to forward packets. It makes the decisions using the current network states of where the packets would pass through.
author: terrence-aluda
date: 2021-01-14T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/network-routing-final/hero.jpg
    alt: Network Routing Image
---
When using the internet, our devices send requests to servers stored in various data centers in packets. Likewise, the servers return responses to the requests using data packets. These packets' journey to the data center from our devices and vice versa form the internet's backbone.
<!--more-->
### Understanding network routing
Nevertheless, controlling these packets from the data source to the destination through the wide complicated global network is not a walk in the park. This is where routing comes in. It is done by specialized networking hardware called **routers**.
Routers select an appropriate path that will ensure the packets arrive quickly and safely.

Take an example of when one wants to get home situated in an estate from his/her workplace located in a city center. During rush hours, cities are usually characterized by traffic snarl-ups on their roads. The person will then use Google maps to check the route with less traffic and maneuver all the way home.

Similarly, routers use algorithms to make logical data decisions when selecting the appropriate paths to forward the packets. It makes the decisions using the current network states of where the packets would pass through.

There are two types of routing:
- **Static**
- **Dynamic**

In **static routing**, *the routing tables information don't change after being manually set up* by a network administrator. If a network breaks in the link, this information doesn't change unless the change is done manually. This is the exact opposite of **dynamic routing** where *the tables update themselves dynamically in discrete time steps according to the current network states* such as link failures, traffic changes, etc.

Two commonly used algorithms in checking the network link states and helping in making packet forwarding decisions are:
1. **Dijkstra's shortest path algorithm**
2. **Reliable flooding algorithm**

**Dijkstra's algorithm**
We will briefly discuss this algorithm, for it is too wide to explain in detail here. Later on, we will dive into it in detail in my next article. This algorithm was created by a [Dutch computer scientist](https://en.wikipedia.org/wiki/Dijkstra's_algorithm), **Edsger Wybe Dijkstra**, and with it, routers find the shortest path between nodes in a network.

It starts with the router at the source node and analyses the network using all the parameters, and finds the shortest path between it and other nodes. Once the shortest path between a node and the source node, the node is marked as **visited** and sequentially **added to the path**.

The algorithm stores the currently known shortest path from each node to the source node, and it will update this information if it finds a shorter path. This continues until all nodes are added, and a path is established.

*Example*
The algorithm will generate the shortest path from node 0 to all other nodes 1,2,3,4,5,6 in the graph, assuming the graph's weights represent distances between the nodes.

![Graph1](/engineering-education/network-routing-final/routing1.png)

[Image Source](https://www.freecodecamp.org/news/content/images/2020/06/image-76.png)

We have this list of distances initially.

|NODE|DISTANCE|
---|---|
0|0|
1|inf|
2|inf|
3|inf|
4|inf|
5|inf|
6|inf|

We got zero as the first distance because it is the distance from the source node to itself. Since other distances have not been determined yet, we assume them to be infinite *(inf)*. We also have a list of visited nodes. We mark node 0 because we are starting with it. 

(In the graph, we mark a visited node by adding a red border around it.)

**{0}**

![Graph2](/engineering-education/network-routing-final/routing3.png)

[Image source](https://www.freecodecamp.org/news/content/images/2020/06/image-83.png)

We start checking the distance of adjacent nodes to 0 (nodes 1 & 2). We only add a node if the distance between node 0 and the next node is the shortest. From node 0 to node 1, the distance is 2, while from 0 to 2, the distance is 6. The distance to node 1 is the shortest, so we add node 1 to the path.

*(We will mark added nodes by adding an asterisk beside them)*

![Graph3](/engineering-education/network-routing-final/routing4.png)

[Image Source](https://www.freecodecamp.org/news/content/images/2020/06/image-94.png)

We then mark node 1 as visited and add it to our list. We add node 2 because we know its distance, but we will mark it since it is not yet visited.

|NODE|DISTANCE|
---|---|
0|0 *|
1|2 *|
2|6|
3|inf|
4|inf|
5|inf|
6|inf|

**{0,1}**

The next nodes are node 2 and node 3. 

The distance 0-1-3 is (2+5) = 7.

The distance between 0-2 is 6.</br>

We will choose a node with the shortest distance from node 0, which is node 2.</br>

![Graph4](/engineering-education/network-routing-final/routing6.png)

[Image Source](https://www.freecodecamp.org/news/content/images/2020/06/image-96.png)

|NODE|DISTANCE|
---|---|
0|0 *|
1|2 *|
2|6 *|
3|inf|
4|inf|
5|inf|
6|inf|

This will continue till all the nodes are marked as visited and added.

**{0,1,2}**

The final result will be this:

![Graph5](/engineering-education/network-routing-final/routing8.png)


|NODE|DISTANCE|
---|---|
0|0 *|
1|2 *|
2|6 *|
3|7 *|
4|17 *|
5|22 *|
6|19 *|

**{0,1,2,3,4,5,6}**

**Reliable flooding algorithm**
As the name suggests, *it floods each router in a network with all other neighboring routers network state information* such as the IP addresses, costs of the network, the health of the networks, etc. using **link-state packets** of the routers.</br>

For example, take a LAN with 5 routers A, B, C, D, E.

![LAN-1](/engineering-education/network-routing-final/LAN-1.png)

Each router has its state info, that it passes to its neighbors. A will send to B. B to C & D and so on until all of them have all the states. They can then independently apply Dijkstra's algorithm to forward packets. 

That said, this is not always the case with interconnected routers as shown below where the process of passing the link state packets goes on and on without stopping hence creating a condition called **looping**. For example, A will pass its packet to B, B then forwards it to C and C passes it again to A.

![LAN-2](/engineering-education/network-routing-final/LAN-2.png)

A **unique ID** is given to each link-state packets so that this problem is solved. When C and B receives the packet with the unique ID from A, it (A) does not send it again to B, and B does not send it to C.

#### Reliable flooding in wider networks
Applying reliable flooding in wide networks can be unachievable; therefore, protocols are required to help implement it. We will talk about one, the **OSPF** (Open Shortest Path First) protocol.

***OSPF***
(Again, the OSPF is wide and just like Dijkstra's algorithm we will elaborate it more in a dedicated article). The OSPF falls under the **Interior Gateway Protocols (IGPs)** which are *protocols used to exchange routing information between gateways, much often routers, within networks containing multiple IP connected nodes such as Local Area Networks(LANs)*. 

A **gateway** is a networking hardware that *connects two networks by acting as a gate to the traffic flow between them*.
A router running the OSPF protocol contains a **Link State Database(LSDB)** which lists all nodes and their link states.
This protocol subdivides the wide networks into areas (**OSPF areas**) forming a **backbone** area that shares at least one router from the bordering areas as shown in the image below:

![ospf-areas](/engineering-education/network-routing-final/ospf-areas.png)

[Image Source](https://packetpushers.net/wp-content/uploads/2020/01/8-1.png)

These shared routers form the border routers called **Area Border Routers (ABR)**. The areas are identified by 32-bit (4 bytes) numbers expressed either in decimal or dot-decimal notation for example *the backbone, area 0, is identified with 0.0.0.0 by convention*. The ABRs maintain LSDBs for the OSPF areas they serve.

Flooding occurs in these areas and when a packet needs to go to another area, it will pass through the backbone area. This helps in reducing the size of the routing tables and improves the scalability of the network. As much as OSPF helps in large networks, there have been complaints that it generates much overhead traffic by requiring link-state refreshes after a certain duration.

- Each link state packet header in the OSPF protocol has a link-state age (ranging between 30 minutes to 3600 seconds). When this age expires, the link state packet is refreshed. This has been overcome by the introduction of the **DNA** (DoNotAge) bit that makes a link-state packet ageless, meaning it does not have to be refreshed periodically.

That's all for now. We have seen how routers do packet forwarding by enabling communication to take place.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
