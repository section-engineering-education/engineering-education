---
layout: engineering-education
status: publish
published: true
url: /etherchannel-technology/
title: Understanding EtherChannel-Technology
description: This article will cover EtherChannel Technology, how to configure and troubleshoot it, and build a network configuration to understand how it works.
author: atonya-dennis
date: 2021-05-10T00:00:00-16:00
topics: [Networking]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/etherchannel-technology/hero.jpg
    alt: Understanding EtherChannel-Technology
---
In most network designs, network administrators connect multiple physical Ethernet links between devices to achieve more bandwidth and redundancy.
<!--more-->
With this, the links get blocked to prevent switching loops by the Spanning Tree Protocol. For this reason, we need a technology that will allow redundant links that the Spanning Tree Protocol will not block. 

This is where the concept of **EtherChannel Technology** and its configurations will help handle this with ease.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [EtherChannel Technology?](#etherchannel-technology)
- [EtherChannel terminologies](#etherchannel-terminologies)
- [EtherChannel technology protocols](#etherchannel-technology-protocols)
  - [Port Aggregation Protocol (PAgp)](#port-aggregation-protocol-pagp)
  - [Link Aggregation Control Protocol (LACP)](#link-aggregation-control-protocol-lacp)
- [EtherChannel network configurations](#etherchannel-network-configurations)
- [Step One - Basic Switch Configurations](#step-one---basic-switch-configurations)
  - [Switch 1 configurations](#switch-1-configurations)
  - [Switch 2 configurations](#switch-2-configurations)
  - [Switch 3 configurations](#switch-3-configurations)
- [Step Two - Trunk ports configurations](#step-two---trunk-ports-configurations)
  - [S1 Trunk ports configuration](#s1-trunk-ports-configuration)
  - [S2 Trunk ports configuration](#s2-trunk-ports-configuration)
  - [S3 Trunk ports configuration](#s3-trunk-ports-configuration)
- [Step Three - Port-channel configurations using LACP and PAgp.](#step-three---port-channel-configurations-using-lacp-and-pagp)
  - [Port-channel 1 configurations using LACP mode active](#port-channel-1-configurations-using-lacp-mode-active)
  - [Port-channel 2 configurations using LACP mode passive and active.](#port-channel-2-configurations-using-lacp-mode-passive-and-active)
  - [Port-channel 3 configurations using PAgp mode desirable.](#port-channel-3-configurations-using-pagp-mode-desirable)
- [Step Four - EtherChannel Verification](#step-four---etherchannel-verification)
- [Troubleshooting EtherChannel](#troubleshooting-etherchannel)
- [Conclusion](#conclusion)

### Prerequisites
The reader must observe the following prerequisites:
- Have a good understanding of basic networking concepts.
- A good understanding on how to configure switches using packet tracer.
- It is best for the reader to know how to work with the Cisco packet tracer.

To download and install the Cisco packet tracer on a desktop or laptop, visit [this link](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html).

### What is EtherChannel technology?
`EtherChannel Technology` is a link aggregation technology that makes it possible to combine several physical links between switches into one logical link to provide high-speed links and redundancy without being blocked by the Spanning Tree Protocol.

There is a provision of fault tolerance, load balancing, increased bandwidth, and redundancy. Formed through negotiation with  two protocols: ***Port Aggregation Protocol (PAgp)*** and  ***Link Aggregation Control Protocol (LACP)*** .

### EtherChannel terminologies
- `EtherChannel`- A port-channel architecture that groups together multiple physical Ethernet links into a single logical link that provides fault-tolerant, high-speed, and redundant links between switches and other network devices.
- `Spanning Tree Protocol` - Is a data link layer protocol that prevents loops in networks with redundant links.
- `Port-Channel`- This refers to communication links between switches that combine multiple ethernet ports bandwidth into a single logical link.
- `Channel Group` - A collection of ethernet interfaces on a single switch.

### EtherChannel technology protocols
#### Port Aggregation Protocol (PAgp)
Port Aggregation Protocol (PAgp) is a cisco-based protocol and runs on vendor-licensed switches that support PAgp. It facilitates the automatic creation of ether channel links by detecting the link configuration on each side and ensuring the links are compatible for forming an ether channel link. 

It works in three-channel modes:
1. On-interfaces - In this mode, there is no exchange of PAgP packets.
2. Desirable interfaces - Desirable mode, interfaces negotiate with each other by sending PAgp packets.
3. Auto-here interfaces - Respond to PAgp packets but cannot start a negotiation with other interfaces.

>**NOTE: For an ether channel to form, the modes must be compatible on either side of the links. The table below shows different mode combinations that can form ether channel links.**

| S1 mode   |      S2 mode      | Etherchannel Formation |
| :-------- | :---------------: | ---------------------: |
| On        |        On         |                    YES |
| On        | Desirable or Auto |                     NO |
| Desirable | Desirable or Auto |                    YES |
| Auto      |     Desirable     |                    YES |
| Auto      |       Auto        |                     NO |


#### Link Aggregation Control Protocol (LACP)
Link Aggregation Control Protocol (LACP) is like the PAgp protocol, but it is an open standard protocol and facilitates ether channels' configuration in multi-vendor environments. Not limited to cisco switches only; it allows both active links and standby links. 

It works in three modes:
1. On-interfaces - In this mode, there is no exchange of LACP packets.
2. Active-interfaces - Active mode, interfaces  negotiate with each other through the sending of LACP packets.
3. Passive-here interfaces - Respond to LACP packets received but cannot start a negotiation with other interfaces.

The table below shows various mode combinations that can form ether channel links with LACP.

| S1 mode |      S2 mode      | Etherchannel Formation |
| :------ | :---------------: | ---------------------: |
| On      |        On         |                    YES |
| On      | Active or Passive |                     NO |
| Active  | Active or Passive |                    YES |
| Passive |      Active       |                    YES |
| Passive |      Passive      |                     NO |

>**NOTE: Active links are the ether channel links currently transmitting the traffic. When one of the currently active links goes down, the Standby links become active and takes over.**

### EtherChannel network configurations
In this article, we will learn how to configure ether channels using the two protocols discussed above.

Consider a network with three switches connected and 3 PCs each connected to a switch as shown:

![EtherChannel Network](/engineering-education/etherchannel-technology/network-setup.jpg)

We have to configure the network to use one logical link instead of the two Fast Ethernet (Fa) links connecting the switches. 

We shall use three-port channels:
1. Port-channel 1-link connecting S1 and S2 (Fa0/1, Fa0/2 ).
2. Port-channel 2-link connecting S2 and S3 (Fa0/3, Fa0/4 )
3. Port-channel 3-link connecting S1 and S3 (Fa0/5, Fa0/6 )

We shall use LACP on port-channels 1 and 2 and PAgp on Channel 3 through the following steps:

### Step One - Basic switch configurations
#### Switch 1 configurations

```bash
Switch>enable
Switch#configure terminal
Switch(config)#hostname S1       !giving switch 1 a name S1
S1(config)#

```

#### Switch 2 configurations

```bash
Switch>enable
Switch#configure terminal
Switch(config)#hostname S2       !giving switch 2 a name S2
S2(config)#

```

#### Switch 3 configurations

```bash
Switch>enable
Switch#configure terminal
Switch(config)#hostname S3       !giving switch 3 a name S3
S3(config)#

```

### Step Two - Trunk ports configurations
Trunk ports transfer traffic in networks between switches. 

In our network above, the trunk ports are:
-  Fa0/1, Fa0/2 - connecting S1 and S2.
-  Fa0/3, Fa0/4 - connecting S2 and S3.
-  Fa0/5, Fa0/6 - connecting S1 and S3.

#### S1 Trunk ports configuration
```bash

S1(config)#interface range fa 0/1-2, fa 0/5-6       ! configuring multiple ports at the same time
S1(config-if-range)#switchport mode trunk       !configuring the ports to be trunk ports
S1(config-if-range)#do write                !saving our configurations
S1(config-if-range)#
```

#### S2 Trunk ports configuration
```bash
S2(config)#interface range fa0/1-4
S2(config-if-range)#switchport mode trunk
S2(config-if-range)#do write
S2(config-if-range)#
```

#### S3 Trunk ports configuration
```bash

S2(config)#interface range fa0/3-6
S2(config-if-range)#switchport mode trunk
S2(config-if-range)#do write
S2(config-if-range)#
```

>**NOTE: `fa` refers to fast ethernet ports used for connecting the network hosts to the switch or router.**

### Step Three - Port-channel configurations using LACP and PAgp
#### Port-channel 1 configurations using LACP mode active
Port-channel 1 is connecting switches S1 and S2 through interfaces fa0/1 and fa0/2.

#### S1 configuration
```bash
S1#config terminal
S1(config)#interface range fa 0/1-2
S1(config-if-range)#shutdown                !disables all functions of the interfaces fa 0/1-2
S1(config-if-range)#channel-group 1 mode ?    !specifying the port-channel number
S1(config-if-range)#channel-group 1 mode active     !specifying the channel mode to use in our case its active  for LACP
S1(config-if-range)#no shutdown              !activating the port-channel interface
S1(config-if-range)#exit            !exiting the interface configuartion mode
S1(config)#interface port-channel 1       !entering the interface port-channel  to make it a trunk
S1(config-if)#switchport mode trunk        !making the port-channel 1 a trunk port interface
S1(config-if)#do write          !saving our configurations
```

#### S2 configuration

```bash
S2#config terminal
S2(config)#interface range fa 0/1-2
S2(config-if-range)#shutdown
S2(config-if-range)#channel-group 1 mode ?
S2(config-if-range)#channel-group 1 mode active
S2(config-if-range)#no shutdown
S2(config-if-range)#exit
S2(config)#interface port-channel 1
S2(config-if)#switchport mode trunk
S2(config-if)#do write

```

#### Port-channel 2 configurations using LACP mode passive and active.
Port-Channel 2 is connecting switches S2 and S3 through interfaces fa0/3 and fa0/4.

#### S2 configuration

```bash
S2#config terminal
S2(config)#interface range fa 0/3-4
S2(config-if-range)#shutdown
S2(config-if-range)#channel-group 2 mode ?
S2(config-if-range)#channel-group 2 mode passive
S2(config-if-range)#no shutdown
S2(config-if-range)#exit
S2(config)#interface port-channel 2
S2(config-if)#switchport mode trunk
S2(config-if)#do write

```

#### S3 configuration

```bash
S3#config terminal
S3(config)#interface range fa 0/3-4
S3(config-if-range)#shutdown
S3(config-if-range)#channel-group 2 mode ?
S3(config-if-range)#channel-group 2 mode active
S3(config-if-range)#no shutdown
S3(config-if-range)#exit
S3(config)#interface port-channel 2
S3(config-if)#switchport mode trunk
S3(config-if)#do write
```

#### Port-channel 3 configurations using PAgp mode desirable
Port-Channel 3 is connecting switches S1 and S3 through interfaces fa0/5 and fa0/6.

#### S1 configuration

```bash
S1#config terminal
S1(config)#interface range fa 0/5-6
S1(config-if-range)#shutdown
S1(config-if-range)#channel-group 3 mode ?
S1(config-if-range)#channel-group 3 mode desirable
S1(config-if-range)#no shutdown
S1(config-if-range)#exit
S1(config)#interface port-channel 3
S1(config-if)#switchport mode trunk
S1(config-if)#do write
```

#### S3 configuration

```bash
S3#config terminal
S3(config)#interface range fa 0/5-6
S3(config-if-range)#shutdown
S3(config-if-range)#channel-group 3 mode ?
S3(config-if-range)#channel-group 3 mode desirable
S3(config-if-range)#no shutdown
S3(config-if-range)#exit
S3(config)#interface port-channel 3
S3(config-if)#switchport mode trunk
S3(config-if)#do write
```

With all the configurations done, we have created our ether channel. We can now verify if the port-channel exists and test if the PCs can communicate through the channels created.

![EtherChannel Configured Network](/engineering-education/etherchannel-technology/etherchannel-configuration.jpg)


### Step Four - EtherChannel verification
To verify our network ether channel configurations, the command `show etherchannel summary` is used as shown below.

```bash
S1#show etherchannel summary
Flags:  D - down        P - in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      f - failed to allocate aggregator
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port


Number of channel-groups in use: 2
Number of aggregators:           2

Group  Port-channel  Protocol    Ports
------+-------------+-----------+----------------------------------------------

1      Po1(SU)           LACP   Fa0/1(P) Fa0/2(P)
3      Po3(SU)           PAgP   Fa0/5(P) Fa0/6(P)
S1#
```

Above, two port-channel links connect to switch S1:  `Po1(SU) LACP` and `Po3(SU) PAgp`, and the interfaces are displayed. If we try the same on the other switches, the output will still shows us that our channels are up and running.

To test our connectivity, we will try to ping the PCs connected to the switches. First, let's statically assign IP addresses to the three PCS. 

That is:
- PC3 - 192.168.1.1
- PC4 - 192.168.1.2
- PC5 - 192.168.1.3

![Static IP addressing](/engineering-education/etherchannel-technology/static-ip-addressing.jpg)

Now let's ping `PC5` from `PC3.` It should send replies as shown.

![Ping Connectivity](/engineering-education/etherchannel-technology/ping-pc.jpg)

### Troubleshooting EtherChannel
In case the ether channel link is not operational, we can troubleshoot to find the errors and try to fix them.
- **Step 1** - Here we view port-channel that is down by using command `show EtherChannel summary`.
- **Step 2** - After identifying which port channel is down. Use the command to `show EtherChannel port-channel,` and a detailed output will be displayed, showing the incompatible PAgP/LACP modes configured on the switches.
- **Step 3** - We can now correct the misconfiguration by deleting that port channel using the command `no interface port-channel.` For instance, if it is port-channel, one will type `no interface port-channel` 1 to delete port-channel 1. Then, repeat the steps that we have discussed above to create another port-channel correcting the incompatible modes.

### Conclusion
As we have seen, ether channel technology is convenient for increasing our bandwidth and redundancy in our networks without the redundant links being blocked by the Spanning Tree Protocol. 

To summarize:
- We learned what EtherChannel Technology is.
- We explored different protocols used in EtherChannel configurations.
- We configured a network using LACP and PAgp protocols.
- We learned how to verify and troubleshoot Ether channels.

One can find more information about ether channel technology [here](https://contenthub.netacad.com/srwe/6.1.1).

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](https://www.section.io/engineering-education/authors/briana-nzivu/)
