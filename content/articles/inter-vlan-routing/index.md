---
layout: engineering-education
status: publish
published: true
url: /inter-vlan-routing/
title: Understanding Inter-VLAN Routing
description: The objective of this article is to help one understand inter-VLAN routing and how to configure it using a packet tracer.
author: atonya-dennis
date: 2021-03-21T00:00:00-09:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/inter-vlan-routing/hero.jpg
    alt: Network Connection example image
---
As a network administrator, tasks may include having to segment a single switched Local Area Network (LAN) logically without having to run new cables and changing the existing network. The concept of "VLAN" and its configurations will help one handle the task at hand with ease.
<!--more-->
In this article, we will learn about what inter-VLAN routing is, various methods for VLAN routing, and also build a network configuration to understand how it works.

### Table of contents
- [Prerequisite](#prerequisite)
- [VLAN routing terminologies](#vlan-routing-terminologies)
- [What is Inter-VLAN routing?](#what-is-inter-vlan-routing)
- [Inter-VLAN routing methods](#inter-vlan-routing-methods)
  - [Legacy inter-VLAN routing](#legacy-inter-vlan-routing)
  - [Router-on-a-stick](#router-on-a-stick)
  - [Layer 3 switch using Switched Virtual Interface (SVI)](#layer-3-switch-using-switched-virtual-interface-svi)
- [Network configurations for Inter-VLAN communication using Router-On-Stick method](#network-configurations-for-inter-vlan-communication-using-router-on-stick-method)
  - [Step 1](#step-1)
  - [Step 2](#step-2)
  - [Configurations for access ports fa0/1 and fa0/2](#configurations-for-access-ports-fa01-and-fa02)
  - [Configurations for access ports fa0/3 and fa0/4](#configurations-for-access-ports-fa03-and-fa04)
  - [Configurations for trunk port fa0/5](#configurations-for-trunk-port-fa05)
  - [Step 3](#step-3)
  - [Step 4](#step-4)
  - [Step 5](#step-5)
- [Conclusion](#conclusion)

### Prerequisite
As a prerequisite, the reader must have a good understanding of basic networking concepts, and how to work with Cisco packet tracer.

To download and install Cisco packet tracer on your computer, visit [this link](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html).

### VLAN routing terminologies
- `VLAN` is a network segment on a switched LAN which groups together the hosts on the network, logically, regardless of their physical locations on the network.
- A `Local Area Network (LAN)` is a physical interconnection of network devices in a small geographical area.
- `Layer 3 switch/multilayer switch` is a special type of switch which performs the function of both switches at layer 2  and routers at layer 3 of the OSI model i.e., it can forward both the frames and packets.
- `Switched Virtual Interface (SVI)` refers to a virtual interface which connects VLANs on the network devices to their respective router engines.
- `Default Gateway` is a device that forwards IP packets and provides an access point to the other networks. For instance, a router.
- `Access Point` is a network device that connects to a router or switch, creating a wireless local area network and acting as a link between the router and the network users.
- `Switch port` refers to a physical opening on the switch or router where ethernet cables can be plugged.
- `Router Interface` refers to a path that enables the router to connect to the network.

### What is Inter-VLAN routing?
Virtual LANs (`VLANS`) are networks segments on a switched LAN. Inter-VLAN routing refers to the movement of packets across the network between hosts in different network segments.

`VLANs` make it easier for one to segment a network, which in turn improves the performance of the network and makes it more flexible, since they are logical connections.

VLANs act as separate subnet on the network. To move packets from one VLAN to another and enable communications among hosts, we have to configure the VLAN network.

### Inter-VLAN routing methods
#### Legacy inter-VLAN routing
In this method, multiple router interfaces are used, each connecting to a switch port in different VLANs. These interfaces are served as default gateways, which requires additional cabling when the network has to be expanded.

Hence, adding additional network cables and improving infrastructure is more expensive.

#### Router-on-a-stick
In this method, unlike the legacy routing, one physical interface port is used for routing the traffic between the network segments. The network administrator doesn't need to create separate VLAN interfaces like `fa0/1` to `fa0/10`.

Instead, all the interfaces from 1 to 10 are created with a single interface. This method is simple to implement and used for small to medium-sized networks.

#### Layer 3 switch using Switched Virtual Interface (SVI)
Currently, this method of inter-VLAN routing that uses layer 3/multilayer switch and Switched Virtual Interfaces (SVI) is the most preferred.

SVIs are created for VLANs exists on the switch which performs the same function for the VLANs as that of a router.

Layer 3 switches are expensive, which are primarily suitable for large organization networks.

### Network configurations for Inter-VLAN communication using Router-On-Stick method
In this article, we will learn how to configure inter-VLAN routing using the router-on-a-stick method.

Consider a LAN with 4 PCs, 1 switch, and a router connected as shown in the image:

![Local Area Network](/engineering-education/inter-vlan-routing/network.jpg)

Now, we have to configure two VLANs 10 and 20, with PC0 and PC1 on VLAN10, and PC2 and PC3 are on VLAN20.

- IP Address of PC0 - 192.168.1.10
- IP Address of PC1 - 192.168.1.20
- IP Address of PC2 - 192.168.2.10
- IP Address of PC3 - 192.168.2.20
- The default gateway for VLAN10 - 192.168.1.1
- The default gateway for VLAN20 - 192.168.2.1

#### Step 1
For us to subdivide the network into two subnets, we have to create two VLANS on the switch, `VLAN10` and `VLAN20`. Give them custom names like `VLAN 10 - student` and `VLAN 20 - staff`.

To create two VLANs, we enter the configuration mode using the `config terminal` command, and then we enter the VLAN number like `vlan 10` along with the name.

```bash
Switch>enable                       !moving from user exec mode to priviledge mode
Switch#config terminal              !moving from priviledge mode to global configuration mode
Switch(config)#vlan 10              !assigning vlan number
Switch(config-vlan)#name student    !assigns the vlan 10 the name student
Switch(config-vlan)#exit
Switch(config)#vlan 20
Switch(config-vlan)#name staff      !assigns vlan 20 the name staff
Switch(config-vlan)#exit
```

#### Step 2
Assign switch ports to the VLANS. Ports `fa0/1 `and `fa0/2` acting as access ports for `VLAN10`, while ports `fa0/3` and`fa0/4` for `VLAN20`.

We shall use `fa0/5` port for the trunk port for carrying the traffic between the two VLANS via the router.

**NOTE:** `fa` refers to fast ethernet ports used for connecting the network hosts to the switch or router.

#### Configurations for access ports fa0/1 and fa0/2

```bash
Switch>enable                                   !moving from user exec mode to the priviledge mode
Switch#config terminal                          !moving from priviledge mode to the global configuration mode
Switch(config)#int fa 0/1                       !entering the interface port
Switch(config-if)#switchport mode access        !making the interface fa0/1 an access port
Switch(config-if)#switchport access vlan 10     !making interface access port for vlan 10
Switch(config-if)#exit                          !exiting from the interface

Switch(config)#int fa 0/2                       !entering the interface port
Switch(config-if)#switchport mode access        !making the interface fa0/2 an access port
Switch(config-if)#switchport access vlan 10     !making interface access port for vlan 10
Switch(config-if)#exit                          !exiting from the interface
```

In the configuration above, `fa0/1` and `fa0/2` are configured as access ports using the command `switchport mode access`.

Since they belong to `vlan10`, the `switchport access vlan 10` command is used to configure them as access ports within `vlan10`.

#### Configurations for access ports fa0/3 and fa0/4
```bash
Switch(config)#int fa 0/3                     !entering the interface port
Switch(config-if)#switchport mode access      !making the interface fa0/3 an access port
Switch(config-if)#switchport access vlan 20   !making interface access port for vlan 10
Switch(config-if)#exit                        !exiting from the interface

Switch(config)#int fa 0/4                     !entering the interface port
Switch(config-if)#switchport mode access      !making the interface fa0/4 an access port
Switch(config-if)#switchport access vlan 20   !making interface access port for vlan 10
Switch(config-if)#exit
```

In the configuration above, `fa0/3` and `fa0/4` are configured as access ports using the command `switchport mode access`.

Since they belong to `vlan20`, the `switchport access vlan 20` command is used to configure them as access ports within `vlan20`.

#### Configurations for trunk port fa0/5
```bash
Switch(config)#int fa 0/5                 !entering the interface port
Switch(config-if)#switchport mode trunk   !making interface a trunk port.
Switch(config-if)#do write                !saving the running configurations to start-up file
```

From the above code interface, `fa0/5` is serving as our trunk port. To configure it to serve as a trunk port and not an access port, we use the command `switchport mode trunk` in the global interface mode.

#### Step 3
Using static IP addressing, set the IP addresses to static on each PC on the network.

![IP addressing](/engineering-education/inter-vlan-routing/pc-ip-configuration.jpg)

#### Step 4
Configure the router to enable the traffic to move from `VLAN10` to `VLAN20`. For the PCs to communicate, we subdivide the single interface into many sub-interfaces, where each sub-interface will act as the default gateways for each of the VLANs. This will allow two sub networks to communicate using the single interface.

```bash
Router>enable                       !moving from user exec mode to the priviledge exec mode
Router#config terminal              !moving from priviledge exec mode to the global configuration mode
Router(config)#int g0/0             !entering on our physical router interface gigabitEthernet 0/0
Router(config-if)#no shutdown       !activating the interface
Router(config-if)#int g0/0.10       !first sub interface for vlan 10 on g0/0
Router(config-subif)#encapsulation dot1q 10             !configuring the sub interface to respond to traffic from vlan 10
Router(config-subif)#ip add 192.168.1.1 255.255.255.0   !configuring the IP address of the sub interface g0/0.10
Router(config-subif)#exit           !exiting from the sub interface

Router(config)#int g0/0           !entering our physical router interface
Router(config-if)#no shutdown     !activating our physical interface
Router(config-if)#int g0/0.20     !second sub interface for vlan 20 on g0/0
Router(config-subif)#encapsulation dot1q 20             !configuring the sub interface to respond to traffic from vlan 20
Router(config-subif)#ip add 192.168.2.1 255.255.255.0   !configuring the IP address of the sub interface g0/0.20
Router(config-subif)#exit
Router(config)#do write             !saving our running configurations into the start-up configuration file
Router(config)#exit
```

From the configurations above, the interface `g0/0` is  subdivided into two sub interfaces: `g0/0.10` for `VLAN10` and `g0/0.20` for `VLAN20`.

Then, the two sub-interfaces are assigned IP addresses and serve as the trunk ports for carrying the traffic.

#### Step 5
Test the inter-VLAN connectivity by trying to ping the different PCs.

For instance, if we ping `PC2` in `VLAN20` from `PC0` in `VLAN10`, it should be successful as shown below:

![Ping PC2 from PC1](/engineering-education/inter-vlan-routing/ping.jpg)

### Conclusion
Inter-VLAN routing is an essential concept for anyone who has the passion for networking. It is the convenient and better way to subdivide a large LAN and to enable communication between the network hosts.

You can find more information about inter vlan routing [here](https://contenthub.netacad.com/srwe/4.1.1).

To summarize:
- We learned what VLAN routing is.
- We explored different methods to route.
- We configured the route using route-with-stick method.

Happy coding.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)