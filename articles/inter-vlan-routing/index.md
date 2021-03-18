---
layout: engineering-education
status: publish
published: true
url: /engineering-education/inter-vlan-routing/
title: Inter-VLAN routing
description: This article is viewed at helping one to gain the understanding of inter-vlan routing and how to configure it using a packet tracer, add fields `dateCreated` and `lastModified` in the `Todo` data class.
author: atonya-dennis
date: 2021-03-16T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/inter-vlan-routing/hero.jpg
    alt: Network Connection example image
---
As a network administrator, one of the tasks is to segment a single switched Local Area Network (LAN) logically without having to run new cables and changing the existing network. The concept of "VLAN" and its configurations will help one handle the task at hand with ease.
<!--more-->
In this article, we will learn about what inter-VLAN routing is, various methods for VLAN routing, and also build a network configuration to understand how it works.

# Table of contents
- [Prerequisite](#prerequisite)
- [What is inter-VLAN routing?](#what-is-inter-vlan-routing)
- [Methods of inter-VLAN routing](#inter-vlan-routing-methods)
- [Inter-VLAN network configurations](#network-configurations-for-inter-vlan-communication-using-router-on-stick-method)
- [Conclusion](#conclusion)

### Prerequisite
As a prerequisite, the reader must have a good understanding of basic networking concepts, and how to work with Cisco packet tracer.

To download Cisco packet tracer visit [this link](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html) to install the latest version installed on your computer.

### What is Inter-VLAN routing?
Virtual Local Area Networks (VLANs) are network segments on a switched LAN that groups different hosts together logically, regardless of their physical locations on the network.

VLANs make it easier to segment a workstation into different isolated LANs. They improve the performance of the network and are flexible, since they are logically connected.

VLANs act as separate subnets on the network. To move packets from one VLAN to another and enable communications between hosts, we have to configure the network to enable inter-VLAN routing.

### Inter-VLAN routing methods
#### Legacy inter-VLAN routing
In this method, multiple router interfaces are used, each connecting to a switch port in different VLANs. These interfaces are served as default gateways. Sometimes, it may lead to network issues, since expanding the network requires additional cabling.

#### Router-on-a-stick
In this method, unlike the legacy routing, one physical interface port is used for routing the traffic between the network segments. The network administrator need not create separate VLAN interfaces like `fa0/1` to `fa0/10`. Instead, all the interfaces from 1 to 10 are created with a single interface.

#### Layer 3 switch using Switched Virtual Interface (SVI)
Currently, this method of inter-VLAN routing that uses layer 3/multilayer switch and Switched Virtual Interfaces (SVI) are being used more commonly. SVIs are created for VLANs that exist on the switch and they perform the same function for the VLANs as that of a router.

Layer 3 switches are expensive, hence not affordable.

### Network configurations for Inter-VLAN communication using Router-On-Stick method
In this article, we will learn how to configure inter-VLAN routing using the router-on-a-stick method.

Consider a LAN with 4 PCs, 1 switch, and a router connected as shown in the image:

![Local Area Network](/engineering-education/inter-vlan-routing/network.jpg)

We want to configure two VLANs 10 and 20. PC0 and PC1 on VLAN10 while PC2 and PC3 are on VLAN20.
* IP Address of PC0   -192.168.1.10
* IP Address of PC1   -192.168.1.20
* IP Address of PC2   -192.168.2.10
* IP Address of PC3   -192.168.2.20
* The default gateway for VLAN10- 192.168.1.1
* The default gateway for VLAN10- 192.168.2.1

#### Step 1
For us to subdivide the network into two subnets, we have to create two VLANS on the switch,VLAN10 and VLAN20. Give them custom names. That is VLAN 10 -student and VLAN 20 - staff.

*To create two vlans we enter the configuration mode using **`config terminal`** command then we enter the vlan number like vlan 10 then the name and then exit*
```
Switch>enable           //moving from user exec mode to priviledge mode
Switch#config terminal    //moving from priviledge mode to global configuration mode
Switch(config)#vlan 10    //assigning vlan number
Switch(config-vlan)#name student   //assigns the vlan 10 the name student
Switch(config-vlan)#exit
Switch(config)#vlan 20
Switch(config-vlan)#name staff   //assigns vlan 20 the name staff
Switch(config-vlan)#exit
```

#### Step 2
Assign switch ports to the VLANS. Ports Fa0/1 and Fa0/2 acting as Access ports for VLAN10 while ports Fa0/3 and Fa0/4 for VLAN20. The trunk port for carrying the traffic between the two VLANS via the router we shall use Fa0/5 port

#### Configurations for access ports fa0/1 and fa0/2
```
Switch>enable       //moving from user exec mode to the priviledge mode
Switch#config terminal      //moving from priviledge mode to the global configuration mode
Switch(config)#int fa 0/1     //entering the interface port
Switch(config-if)#switchport mode access        //making the interface fa0/1 an access port
Switch(config-if)#switchport access vlan 10      //making interface access port for vlan 10
Switch(config-if)#exit //exiting from the interface

Switch(config)#int fa 0/2   //entering the interface port
Switch(config-if)#switchport mode access    //making the interface fa0/2 an access port
Switch(config-if)#switchport access vlan 10   //making interface access port for vlan 10
Switch(config-if)#exit    //exiting from the interface

```
*In the above  configuration fa0/1 and fa0/2 configured as access ports using command **`switchport mode access`**.Since they belong to vlan 10 command **`switchport access vlan 10`** is used to configure them as access ports  within vlan 10.*

#### Configurations for access ports fa0/3 and fa0/4
```

Switch(config)#int fa 0/3       //entering the interface port
Switch(config-if)#switchport mode access     //making the interface fa0/3 an access port
Switch(config-if)#switchport access vlan 20    //making interface access port for vlan 10
Switch(config-if)#exit   //exiting from the interface

Switch(config)#int fa 0/4     //entering the interface port
Switch(config-if)#switchport mode access      //making the interface fa0/4 an access port
Switch(config-if)#switchport access vlan 20   //making interface access port for vlan 10
Switch(config-if)#exit

```
*In the above  configuration fa0/3 and fa0/4 are configured as access ports using command **`switchport mode access`**.Since they belong to vlan 20 command **`switchport access vlan 20`** is used to configure them as access ports within vlan 20.*

#### Configurations for trunk port fa0/5
```
Switch(config)#int fa 0/5    //entering the interface port
Switch(config-if)#switchport mode trunk   //making interface a trunk port.
Switch(config-if)#do write    //saving the running configurations to start-up file
```
*From the above code interface, fa0/5 is serving as our trunk port. To configure it to serve as a trunk port and not an access port, we use the command **`switchport mode trunk`** in the global interface mode.*
#### Step 3
Using static  IP addressing  set the IP addresses to  each PC on the network.

![IP addressing](/engineering-education/inter-vlan-routing/pc-ip-configuration.jpg)

#### Step 4
Configure the router to enable traffic to move from VLAN10 TO VLAN20, and for the PCs to communicate, we subdivide the single interface on the router into sub-interfaces which will act as the default gateways for each of the vlans and this will allow the two sub networks to communicate using the single interface.
```
Router>enable        //moving from user exec mode to the priviledge exec mode
Router#config terminal    //moving from priviledge exec mode to the global configuration mode
Router(config)#int g0/0        //entering on our physical router interface gigabitEthernet 0/0
Router(config-if)#no shutdown     //activating the interface
Router(config-if)#int g0/0.10     //first sub interface for vlan 10 on g0/0
Router(config-subif)#encapsulation dot1q 10        //configuring the sub interface to respond to traffic from vlan 10
Router(config-subif)#ip add 192.168.1.1 255.255.255.0      //configuring the IP address of the sub interface g0/0.10
Router(config-subif)#exit       //exiting from the sub interface

Router(config)#int g0/0     //entering our physical router interface
Router(config-if)#no shutdown    //activating our physical interface
Router(config-if)#int g0/0.20     //second sub interface for vlan 20 on g0/0
Router(config-subif)#encapsulation dot1q 20    //configuring the sub interface to respond to traffic from vlan 20
Router(config-subif)#ip add 192.168.2.1 255.255.255.0      //configuring the IP address of the sub interface g0/0.20
Router(config-subif)#exit
Router(config)#do write       //saving our running configurations into the start-up configuration file
Router(config)#exit
```
From the above configurations, interface g0/0 is  subdivided into two sub interfaces: g0/0.10 for VLAN 10 and g0/0.20 for VLAN 20. The two sub-interfaces then assigned IP address and they serve as the trunk ports for carrying the traffic.
#### Step 5
Test the inter-vlan connectivity by trying to ping the different PCs . For instance, if we ping PC2 in VLAN20 from PC0 in VLAN 10 it should be successful as shown below.

![Ping PC2 from PC1](/engineering-education/inter-vlan-routing/ping.jpg)

### Conclusion
Inter-VLAN routing is an essential concept for anyone who  has the passion for networking. It is the convenient and better way for subdividing a large LAN and for enabling communication between the network hosts.

You can find more information about inter vlan routing [here](https://contenthub.netacad.com/srwe/4.1.1).