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
### Concept of Inter-VLAN routing
As a network administrator one of the tasks is to segment a single switched LAN logically without having to run new cables and making changes to the existing network.The concept of **`VLANS`** and how they are configured to communicate will help one to be able to handle the task at hand with ease.
<!--more-->
### What is Inter VLAN routing?
Virtual LANS(VLANS) are logical LANS that act as subnetworks which can group together collections of devices on separate physical local area networks(LANS).

VLANS make it easier for one to segment a single network ,they improve the performance of the network and  tend to be flexible as they  are based on logical connections.VLANS are treated as separate subnets on the network.For that reason to move packets from one VLAN to another and enable communications between hosts we have to configure the network to enable  inter vlan routing.

### Methods of Inter-VLAN routing.
1. **Legacy inter-vlan routing** -
 Is a legacy solution and relied on using a router with multiple ethernet interfaces. Each interface was connected to a switch port in different VLANs and  served as the default gateways to the local hosts on the VLAN subnet.This brought about some limitations as it required multiple physical interfaces on both the switch and router  meaning as the network grew  additional hardware were required which led to  additional costs. It is no longer used in switched networks.
2. **Router-on-a-stick** -This method overcomes the limitation of the legacy inter-VLAN routing method as it only requires one physical Ethernet interface to route traffic between multiple VLANs on a network. The router Ethernet interface is configured as a trunk using subinterfaces and connected to a trunk port on a Layer 2 switch.
3. **Layer 3 switch using switched virtual interface(SVIs)** - This is a modern method of inter-vlan routing that uses layer 3 switches/multilayer switch and switched virtual interfaces (SVI). SVIs are created for a VLANs that exists on the switch and they perform the same function for the VLANs as that of a router.

      Some of the advantages  of layer 3 switches are:

    * They are much faster as everything is hardware switched and routed.
    *  Lower latency  as data does not need to leave the switch in order to be routed to other networks.

Layer 3 switches are expensive hence not afforadable. In this article we are going to focus on the router-on-a-stick method for our inter-vlan routing


### Network Configurations for Inter-VLAN communication using Router-On-Stick-Method

Consider a LAN with 4 PCs,1 switch and a router connected as shown.

![Local Area Network](/engineering-education/inter-vlan-routing/network.jpg)

We want to configure two VLANS 10 and 20. PC0 and PC1 are in VLAN10 while PC2 and PC3 are in VLAN20.
* IP Address of PC0   -192.168.1.10
* IP Address of PC1   -192.168.1.20
* IP Address of PC2   -192.168.2.10
* IP Address of PC3   -192.168.2.20
* Default gateway for VLAN10- 192.168.1.1
* Default gateway for VLAN10- 192.168.2.1

### Step 1.
Create two VLANS on the switch ,VLAN10 and VLAN20. Give them custom names. That is VLAN10 -student and VLAN20 - staff.This is done using  the command line of the switch in  the packet tracer.
```
Switch>enable
Switch#config terminal
Switch(config)#vlan 10
Switch(config-vlan)#name student
Switch(config-vlan)#exit
Switch(config)#vlan 20
Switch(config-vlan)#name staff
Switch(config-vlan)#exit

```
### Step 2.
Assign switchports to the VLANS. Ports Fa0/1 and Fa0/2 acting as Access ports for VLAN10 while ports Fa0/3 and Fa0/4 for VLAN20. Port Fa0/5 will be the trunk port carrying the traffic between the two VLANS via the router.
```
Switch>enable
Switch#config terminal
Switch(config)#int fa 0/1
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 10
Switch(config-if)#exit


Switch(config)#int fa 0/2
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 10
Switch(config-if)#exit

Switch(config)#int fa 0/3
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 20
Switch(config-if)#exit

Switch(config)#int fa 0/4
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 20
Switch(config-if)#exit

Switch(config)#int fa 0/5
Switch(config-if)#switchport mode trunk
Switch(config-if)#do write
```
### Step 3.
Assign static IP address to all the four PCs connected on the network.

![Static IP addressing](/engineering-education/inter-vlan-routing/pc-ip-configuration.jpg)

### Step 4.
Configure inter-vlan routing on the router to enable communication between the two vlans.
```
Router>enable
Router#config terminal
Router(config)#int g0/0
Router(config-if)#no shutdown
Router(config-if)#int g0/0.10
Router(config-subif)#encapsulation dot1q 10
Router(config-subif)#ip add 192.168.1.1 255.255.255.0
Router(config-subif)#exit

Router(config)#int g0/0
Router(config-if)#no shutdown
Router(config-if)#int g0/0.20
Router(config-subif)#encapsulation dot1q 20
Router(config-subif)#ip add 192.168.2.1 255.255.255.0
Router(config-subif)#exit
Router(config)#do write
```
### Step 5.
Test the inter-vlan connectivity by trying to ping the different PCs .For instance if we ping PC2 in VLAN20 from PC0 in VLAN 10 it should be successful as shown below.

![Ping PC2 from PC1](/engineering-education/inter-vlan-routing/ping.jpg)

### Conclusion
Inter-VLAN routing is an essential concept for any one who  has the passion for networking. It is the convenient and better way for sub dividing a large LAN and for enabling communication between the network hosts.
