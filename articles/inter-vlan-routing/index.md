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
## Concept of Inter-VLAN routing
As a network administrator, one of the task is to segment a single switched LAN logically without having to run new cables and changing the existing network. The concept of **`VLANS`** and how the configurations done for them to communicate will help one handle the task at hand with ease.
<!--more-->

# Table of contents
1. [Prerequisites.](#prerequisites)
2. [Vlan routing terminology.](#terminology)
3. [Inter VLAN routing.](#intervlanrouting)
    1. [Methods of Inter VLAN  routing.](#methods)
4. [Inter VLAN Network Configurations.](#configurations)
5. [Conclusion. ](#conclusion)

### Prerequisites <a name="prerequisites"></a>
  * [Cisco Packet Tracer,](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html) latest version installed on your computer.
### Vlan routing terminology<a name="terminology"></a>
 - **Vlan** is a networks segment on a switched LAN which groups together hosts on the network logically regardless of their physical locations on the network.
 - A **Local Area Network (LAN)** is a physical interconnection of network devices in a small geographical area.
- **Layer 3 switch/multilayer switch** is a special type of switch  which performs the function of both switches at layer 2  and routers at layer 3 of the OSI model. That is it can forward both the  frames and packets.
 - **Switched Virtual Interface(SVI)** refers to a virtual interface which connects vlans on the network devices to their respective router engines.
 - **Default Gateway** is a device  that forwards IP packets and provides an access point to the other networks. For instance, a router.
 - **Access Point** is a network device that connects to a router or switch , creates a wireless local area network and act as the link between the router and the network users.
 - **Switch port** refers to a physical opening on the switch or router where ethernet cables can be plugged.
 - **Router Interface** refers to a path that enables the router to connect to the network.


### What is Inter VLAN routing? <a name="intervlanrouting"></a>
Virtual LANs (`VLANS`) are networks segments on a switched LAN. **Inter vlan routing** this refers to the movement of packets across the network between  hosts in different network segments.``VLANS`` make it easier for one to segment a single network, they improve the performance of the network and are flexible as they base on logical connections. VLANS act as separate subnets on the network. For that reason to move packets from one VLAN to another and enable communications between hosts we have to configure the network to enable inter-vlan routing.

### Inter-VLAN routing methods. <a name="methods"></a>
1. **Legacy inter-vlan routing** -In this solution multiple router interfaces were used, each connecting to a switch port in different vlans. The interfaces served as default gateways, and this required additional cabling when the network was to be expanded. Hence becoming more costly for the network cables and infrastructure.

2. **Router-on-a-stick** -In this method, unlike the legacy, one physical interface port is used for routing traffic between the network segments. The network administrator does not require creating all the vlan interface like fa0/1 to fa0/10, all the interfaces from 1 to 10 are created in a single interface. This method is simple to implement and use for smaller to medium-sized organisation networks.
3. **Layer 3 switch using switched virtual interface(SVIs)** - This is the current method of inter-vlan routing that uses layer 3/multilayer switch and switched virtual interfaces (SVI). SVIs are created for  VLANs that exists on the switch and they perform the same function for the VLANs as that of a router.

Layer 3 switches are expensive, but suitable for large organisation networks.


### Network Configurations for Inter-VLAN communication using Router-On-Stick-Method <a name="configurations"></a>

Consider a LAN with 4 PCs, 1 switch and a router connected as shown.

![Local Area Network](/engineering-education/inter-vlan-routing/network.jpg)

We want to configure two ``VLANS 10`` and ``20``. ``PC0`` and ``PC1`` on ``VLAN10`` while ``PC2`` and ``PC3`` are on ``VLAN20``.
- IP Address of PC0   -192.168.1.10
- IP Address of PC1   -192.168.1.20
- IP Address of PC2   -192.168.2.10
- IP Address of PC3   -192.168.2.20
- Default gateway for ``VLAN10``- 192.168.1.1
- Default gateway for ``VLAN20``- 192.168.2.1

#### Step 1
For us to subdivide the network into two subnets, we have to create two VLANS on the switch,``VLAN10`` and ``VLAN20``. Give them custom names. That is ``VLAN 10 -student`` and ``VLAN 20 - staff``.

To create two vlans we enter the configuration mode using **`config terminal`** command then we enter the vlan number like ``vlan 10`` then the name and then exit
```
Switch>enable           !moving from user exec mode to priviledge mode
Switch#config terminal    !moving from priviledge mode to global configuration mode
Switch(config)#vlan 10    !assigning vlan number
Switch(config-vlan)#name student   !assigns the vlan 10 the name student
Switch(config-vlan)#exit
Switch(config)#vlan 20
Switch(config-vlan)#name staff   !assigns vlan 20 the name staff
Switch(config-vlan)#exit

```
#### Step 2
Assign switch ports to the VLANS. Ports ``Fa0/1 ``and ``Fa0/2`` acting as Access ports for ``VLAN10`` while ports ``Fa0/3`` and`` Fa0/4``  for ``VLAN20``. The trunk port for carrying the traffic between the two VLANS via the router we shall use ``Fa0/5`` port.
**Fa** refers to fastEthernet ports used for connecting the network hosts to the switch or router.


#### Configurations for access ports fa0/1 and fa0/2
```
Switch>enable       !moving from user exec mode to the priviledge mode
Switch#config terminal      !moving from priviledge mode to the global configuration mode
Switch(config)#int fa 0/1     !entering the interface port
Switch(config-if)#switchport mode access        !making the interface fa0/1 an access port
Switch(config-if)#switchport access vlan 10      !making interface access port for vlan 10
Switch(config-if)#exit  !exiting from the interface

Switch(config)#int fa 0/2    !entering the interface port
Switch(config-if)#switchport mode access    !making the interface fa0/2 an access port
Switch(config-if)#switchport access vlan 10   !making interface access port for vlan 10
Switch(config-if)#exit     !exiting from the interface

```
In the above  configuration ``fa0/1`` and ``fa0/2`` configured as access ports using command **`switchport mode access`**.Since they belong to vlan 10 command **`switchport access vlan 10`** is used to configure them as access ports  within vlan 10.

#### Configurations for access ports fa0/3 and fa0/4
```

Switch(config)#int fa 0/3       !entering the interface port
Switch(config-if)#switchport mode access     !making the interface fa0/3 an access port
Switch(config-if)#switchport access vlan 20    !making interface access port for vlan 10
Switch(config-if)#exit   !exiting from the interface

Switch(config)#int fa 0/4     !entering the interface port
Switch(config-if)#switchport mode access      !making the interface fa0/4 an access port
Switch(config-if)#switchport access vlan 20   !making interface access port for vlan 10
Switch(config-if)#exit

```
In the above  configuration ``fa0/3`` and ``fa0/4`` are configured as access ports using command **`switchport mode access`**.Since they belong to vlan 20 command **`switchport access vlan 20`** is used to configure them as access ports within vlan 20.

#### Configurations for trunk port fa0/5
```
Switch(config)#int fa 0/5    !entering the interface port
Switch(config-if)#switchport mode trunk   !making interface a trunk port.
Switch(config-if)#do write    !saving the running configurations to start-up file
```
From the above code interface, fa0/5 is serving as our trunk port. To configure it to serve as a trunk port and not an access port, we use the command **`switchport mode trunk`** in the global interface mode.
#### Step 3
Using static  IP addressing  set the IP addresses to  each PC on the network.

![IP addressing](/engineering-education/inter-vlan-routing/pc-ip-configuration.jpg)

#### Step 4
Configure the router to enable traffic to move from ``VLAN10`` to ``VLAN20``, and for the PCs to communicate, we subdivide the single interface on the router into sub-interfaces which will act as the default gateways for each of the vlans and this will allow the two sub networks to communicate using the single interface.
```
Router>enable        !moving from user exec mode to the priviledge exec mode
Router#config terminal    !moving from priviledge exec mode to the global configuration mode
Router(config)#int g0/0        !entering on our physical router interface gigabitEthernet 0/0
Router(config-if)#no shutdown     !activating the interface
Router(config-if)#int g0/0.10     !first sub interface for vlan 10 on g0/0
Router(config-subif)#encapsulation dot1q 10       !configuring the sub interface to respond to traffic from vlan 10
Router(config-subif)#ip add 192.168.1.1 255.255.255.0      !configuring the IP address of the sub interface g0/0.10
Router(config-subif)#exit       !exiting from the sub interface

Router(config)#int g0/0     !entering our physical router interface
Router(config-if)#no shutdown    !activating our physical interface
Router(config-if)#int g0/0.20     !second sub interface for vlan 20 on g0/0
Router(config-subif)#encapsulation dot1q 20    !configuring the sub interface to respond to traffic from vlan 20
Router(config-subif)#ip add 192.168.2.1 255.255.255.0      !configuring the IP address of the sub interface g0/0.20
Router(config-subif)#exit
Router(config)#do write       !saving our running configurations into the start-up configuration file
Router(config)#exit
```
From the above configurations, interface ``g0/0`` is  subdivided into two sub interfaces: ``g0/0.10`` for VLAN 10 and ``g0/0.20`` for VLAN 20. The two sub-interfaces then assigned IP address and they serve as the trunk ports for carrying the traffic.
#### Step 5
Test the inter-vlan connectivity by trying to ping the different PCs . For instance, if we ping ``PC2`` in VLAN20 from ``PC0`` in VLAN 10 it should be successful as shown below.

![Ping PC2 from PC1](/engineering-education/inter-vlan-routing/ping.jpg)

### Conclusion <a name="conclusion"></a>
Inter-VLAN routing is an essential concept for anyone who  has the passion for networking. It is the convenient and better way for subdividing a large LAN and for enabling communication between the network hosts.

You can find more information about inter vlan routing [here](https://contenthub.netacad.com/srwe/4.1.1).