---
layout: engineering-education
status: publish
published: true
url: /classless-routing-using-ospf-protocol/
title: Classless Routing using Open Shortest Path First (OSPF) protocol
description: The objective of this tutorial is to help the reader understand the concept of classless routing using the OSPF protocol in handling multiple routing areas and finding the fastest available path for the packets sent.
author: atonya-dennis
date: 2021-08-19T00:00:00-11:45
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/classless-routing-using-ospf-protocol/hero.jpg
    alt: Classless Routing using OSPF image
---

Packets take various routes when sent in large and complex networks. The routes tend to be longer and others shorter. The fastest available routes are always the best hence a mechanism is needed to find the best available fastest route.
<!--more-->
This article will cover how we can apply classless routing protocols on networks in creating fast and available routes using the Open Shortest Path First (OSPF) protocol.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Terminologies](#terminologies)
- [OSPF components and characteristics](#ospf-components-and-characteristics)
  - [OSPF characteristics](#ospf-characteristics)
- [OSPF implementation](#ospf-implementation)
  - [i). Single-Area OSPF](#i-single-area-ospf)
  - [ii). Multi-Area OSPF](#ii-multi-area-ospf)
- [OSPF configuration](#ospf-configuration)
- [OSPF Verification](#ospf-verification)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial, the reader should:
- Have a good understanding of networks and network components configurations using any network simulation tool.
- Have a prior understanding of the basic network routing concepts.
- Have knowledge on how to use the Cisco Packet Tracer.

Use this [page](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html) to download the Cisco packet tracer and install it on your machine.

### Terminologies
- **Classless routing** - Refers to a type of routing where the router is allowed to use the available default route to forward traffic if no other specific routes are found. It includes subnet mask information in the routing updates and is supported by RIPv2, OSPF, and EIGRP protocols.

- **Administrative Distance (AD)** - Is a feature used by routers to select the best path possible, that is, the routers determine the source of routes to take and use if it has two identical routes from different sources. Routers need to be able to determine which routes to trust when receiving information from two different sources. OSPF has a default administrative distance of 110 while that of Routing Information Protocol (RIP) and Enhanced Interior Gateway Routing Protocol (EIGRP) is 120 and 90 respectively.

- **Metric** - Refers to the ways used by each classless routing protocol to determine the best path to a network. OSPF uses the `Sum of Inverse of Bandwidth`, RIP uses `Hop Count` and EIGRP uses `Min Bandwidth + Delay`.

- **Wildcard Mask** - Inverses of subnet masks configured on interfaces used by OSPF to specify the range of IP addresses to examine for a match, usually 32 bit long.

- **OSPF Area** - Refers to a logical collection of OSPF networks, routers, and links that have the same area identification. A router within an area must maintain a topological database for the area to which it belongs.

- **OSPF neighbors** - Refers to the relationship that exists between two OSPF-enabled routers in the same OSPF area that are connected by a common network.

### OSPF components and characteristics
The Open Shortest Path First (OSPF) protocol is a link-state, classless, open standard routing protocol that was created as an inner gateway protocol. It uses the concept of areas and the routing metric "cost" to help control routing update traffic by providing fast convergence and scaling to much larger network implementations. It manages several routing zones and assists in determining the quickest available route for a given situation.

OSPF protocol like other protocols share similar components:

- **Routing Protocol Messages** - OSPF enable routers to exchange messages to convey routing information using packets, i.e. Hello packets, link-state request packets, database description packets, link-state acknowledgment packets, and link-state update packets used to discover OSPF neighbors to exchange routing information.

- **Data Structures** - The messages exchanged by the OSPF neighbors used to build data structures that contain a list of neighboring routers to exchange routing information with. They are kept and maintained in the RAM.

They include:
1. `Adjacency database` - Creates the neighbor table.
2. `Link-state database (LSDB)` - Creates the topology table
3. `Forwarding database` - Creates the routing table.

- **Algorithm** - OSPF uses the Shortest Path First (SPF) algorithm based on the cumulative cost to reach a destination. The SPF creates an SPF tree by placing every router at the root of the tree and calculating the shortest path to each node. The SPF then calculates the best routes and places them in the forwarding database used to create the routing table.

#### OSPF characteristics
- Uses link-state routing algorithm.
- Supports CIDR addressing model.
- Sends only updates and not the entire routing table.
- Uses path cost as its basic routing metric.
- Supports authentication and the updates are sent every 10 seconds.
- Updates are sent with multi-cast address `224.0.0.5`

### OSPF implementation
OSPF can be implemented in one of these two ways:

#### i). Single-Area OSPF
This type of OSPF implementation occurs in small networks where the routers are in one area called the `backbone area` (area 0) resulting in large routing tables.

![Single Area OSPF Network Configuration](/engineering-education/classless-routing-using-ospf-protocol/singlearea.jpg).

#### ii). Multi-Area OSPF
Here OSPF is implemented in a hierarchical version using multiple areas which must connect to the backbone area. With this method, we can divide a large autonomous system into smaller areas to support hierarchical routing. The Shortest Path First (SPF) is confined to an area resulting in smaller routing tables.

![Multi Area OSPF Network Configuration](/engineering-education/classless-routing-using-ospf-protocol/multiarea.jpg).

### OSPF configuration
We move on and look at how we can configure and verify OSPF implementation on a local area network.

Consider the network below:

![OSPF Network Configuration](/engineering-education/classless-routing-using-ospf-protocol/ospf-configuration.jpg)

Assign IP addresses to the interfaces on both routers and the PCs.

```bash
Router>enable
Router#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)  #interface gi0/0    !specifying interface
Router(config-if)   #ip address 192.168.20.1 255.255.255.0  !assigning IP address to interface
Router(config-if)   #no shutdown    !activating the interface
Router(config-if)   #interface gi0/1
Router(config-if)   #ip address 192.168.10.1 255.255.255.0
Router(config-if)   #no shutdown
Router(config-if)   #do write   !saving routers configuration
Building configuration...
[OK]
```

```bash
Router>enable
Router#config terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)  #interface gi0/0
Router(config-if)   #ip address 192.168.20.2 255.255.255.0
Router(config-if)   #no shutdown
Router(config-if)   #interface gi0/1
Router(config-if)   #ip address 192.168.30.1  255.255.255.0
Router(config-if)   #no shutdown
```

Establish a neighbor relationship between the two routers and advertise directly connected subnet into OSPF.

```bash
Router(config)  #router ospf 1  !enabling ospf
Router(config-router)   #network 192.168.10.0  0.0.0.255 area 0  !specifying the network, wildcard mask and the area
Router(config-router)   #network 192.168.20.0 0.0.0.255 area 0
Router(config-router)   #do write
Building configuration...
[OK]
```

```bash
outer(config-if)    #router ospf 1
Router(config-router)   #network 192.168.30.0 0.0.0.255 area 0
Router(config-router)   #network 192.168.20.0 0.0.0.255 area 0
Router(config-router)
```

>NOTE: To disable OSPF configurations on the routers, the command `no router ospf` is used in the global configuration mode.

### OSPF Verification
To verify that we configured OSPF on the network and its implementation is working, the command `show ip ospf`.

```bash
Router#show ip ospf

 Routing Process "ospf 1" with ID 192.168.20.1
 Supports only single TOS(TOS0) routes
 Supports opaque LSA
 SPF schedule delay 5 secs, Hold time between two SPFs 10 secs
 Minimum LSA interval 5 secs. Minimum LSA arrival 1 secs
 Number of external LSA 0. Checksum Sum 0x000000
 Number of opaque AS LSA 0. Checksum Sum 0x000000
 Number of DCbitless external and opaque AS LSA 0
 Number of DoNotAge external and opaque AS LSA 0
 Number of areas in this router is 1. 1 normal 0 stub 0 nssa
 External flood list length 0
    Area BACKBONE(0)
        Number of interfaces in this area is 2
        Area has no authentication
        SPF algorithm executed 3 times
        Area ranges are
        Number of LSA 3. Checksum Sum 0x0200c6
        Number of opaque link LSA 0. Checksum Sum 0x000000
        Number of DCbitless LSA 0
        Number of indication LSA 0
        Number of DoNotAge LSA 0
        Flood list length 0
```

To view the OSPF neighbors we use `show ip ospf neighbor`.

```bash
Router#show ip ospf neighbor
Neighbor ID     Pri   State           Dead Time   Address         Interface
192.168.30.1      1   FULL/BDR        00:00:32    192.168.20.2    GigabitEthernet0/0
```

To view the OSPF information we can use `show ip protocols`.

```bash
Router#show ip protocols

Routing Protocol is "ospf 1"
  Outgoing update filter list for all interfaces is not set
  Incoming update filter list for all interfaces is not set
  Router ID 192.168.30.1
  Number of areas in this router is 1. 1 normal 0 stub 0 nssa
  Maximum path: 4
  Routing for Networks:
    192.168.30.0 0.0.0.255 area 0
    192.168.20.0 0.0.0.255 area 0
  Routing Information Sources:
    Gateway         Distance      Last Update
    192.168.20.1         110      00:28:57
    192.168.30.1         110      00:28:57
  Distance: (default is 110)
```

To verify if directly connected subnets are really advertised into a different area, we can use the `show ip route ospf` command on both R1 and R3:

```bash
Router#show ip route ospf
O    192.168.10.0 [110/2] via 192.168.20.1, 00:34:39, GigabitEthernet0/0
```

The PCs are able to communicate since they are directly connected in the same area.

![OSPF Network PCs Ping](/engineering-education/classless-routing-using-ospf-protocol/ping_ospf.jpg)

### Conclusion

As we have seen that we can use OSPF in classless routing in determining the fastest available routes for the packets from source to destination to help offer fast convergence and scales to much larger network implementations.

To summarize, we have:

- Learned what is Classless Routing and the protocol involved, OSPF protocol.
- Explored OSPF components, characteristics, and their implementation.
- Configured a network using OSPF Protocol.
- Learned how OSPF is used in determining the best fastest available route and how to verify its implementation in a network

You can find more information about classless routing using OSPF [here](https://study-ccna.com/ospf-configuration/).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
