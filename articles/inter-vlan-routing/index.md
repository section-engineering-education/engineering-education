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
**`VLANS`** are networks segments on a  switched LAN which groups together hosts on the network logically regardless of there physical locations on the network.

VLANS make it easier for one to segment a single network ,they improve the performance of the network and  tend to be flexible as they  are based on logical connections.VLANS are treated as separate subnets on the network.For that reason to move packets from one VLAN to another and enable communications between hosts we have to configure the network to enable  inter vlan routing.

### Inter-VLAN routing methods.
1. **Legacy inter-vlan routing** -In this solution multiple router interfaces were used each connecting to a switch port in different vlans. The interfaces were used as default gateways and this led to some network issues as additional cabling was required when the network was to be expanded.

2. **Router-on-a-stick** -In this method unlike the legacy , one physical interface port is used for routing traffic between the network segments. That is the network administrator does not require to create all the vlan interface like fa0/1 to fa0/10, all the interfaces from 1 to 10 are created in a single interface.
3. **Layer 3 switch using switched virtual interface(SVIs)** - This is the current method of inter-vlan routing that uses layer 3/multilayer switch and switched virtual interfaces (SVI). SVIs are created for a VLANs that exists on the switch and they perform the same function for the VLANs as that of a router.

Layer 3 switches are expensive hence not afforadable. In this article we are going to focus on the router-on-a-stick method for our inter-vlan routing


### Network Configurations for Inter-VLAN communication using Router-On-Stick-Method

Consider a LAN with 4 PCs,1 switch and a router connected as shown.

![Local Area Network](/engineering-education/inter-vlan-routing/network.jpg)

We want to configure two VLANS 10 and 20. PC0 and PC1 on VLAN10 while PC2 and PC3 are on VLAN20.
* IP Address of PC0   -192.168.1.10
* IP Address of PC1   -192.168.1.20
* IP Address of PC2   -192.168.2.10
* IP Address of PC3   -192.168.2.20
* Default gateway for VLAN10- 192.168.1.1
* Default gateway for VLAN10- 192.168.2.1

### Step 1.
Create two VLANS on the switch ,VLAN10 and VLAN20. Give them custom names. That is VLAN 10 -student and VLAN 20 - staff.
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
Assign switchports to the VLANS. Ports Fa0/1 and Fa0/2 acting as Access ports for VLAN10 while ports Fa0/3 and Fa0/4 for VLAN20.The trunk port  for carrying the traffic between the two VLANS via the router we shall use Fa0/5 port.
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
Using static  IP addressing  set the IP addresses to  each PC on the network.

![IP addressing](/engineering-education/inter-vlan-routing/pc-ip-configuration.jpg)

### Step 4.
Configure the  router to enable traffic to move from VLAN10 TO VLAN20 and for the PCs to be able to communicate.This is done by subdiving the single interface on the router  into sub-interfaces which  will act as the default gateways for each of the vlans and this will allow the the two sub networks to communicate using the single interface.
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
Router(config)#exit
```
From the above configurations,interfaces g0/0 has been subdivided into two sub interfaces  g0/0.10 for VLAN 10 and g0/0.20 for VLAN 20. The two sub-interfaces are then given IP address and they serve as the trunk ports for carrying the traffic.
### Step 5.
Test the inter-vlan connectivity by trying to ping the different PCs .For instance if we ping PC2 in VLAN20 from PC0 in VLAN 10 it should be successful as shown below.

![Ping PC2 from PC1](/engineering-education/inter-vlan-routing/ping.jpg)

### Conclusion
Inter-VLAN routing is an essential concept for any one who  has the passion for networking. It is the convenient and better way for sub dividing a large LAN and for enabling communication between the network hosts.
