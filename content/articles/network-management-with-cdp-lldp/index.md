---
layout: engineering-education
status: publish
published: true
url: /network-management-with-cdp-lldp/
title: Networking Management Using CDP and LLDP Protocols
description: The objective of this article is to help the reader understand what is network management, the protocols involved, and how to configure the protocols using a packet tracer or any other network simulator tool.
author: atonya-dennis
date: 2021-06-22T00:00:00-17:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/network-management-with-cdp-lldp/hero.jpg
    alt: Network Management example image
---
One of the basic steps in network management and troubleshooting is to ensure the network connectivity is up and running. To achieve this, one must understand how devices connect between the network topology and have proper documentation of the network.
<!--more-->
This article will cover how one can use the *Layer 2 discovery protocols **CDP** and **LLDP*** to gather information about neighboring devices on the network and use the information for troubleshooting, managing, and documenting the network.

It will also equip the reader with the knowledge on how to configure the protocols on the network devices and build a network configuration to understand how the protocols work.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [What is Network Management?](#what-is-network-management)
- [Layer 2 Discovery protocols](#layer-2-discovery-protocols)
  - [Cisco Discovery Protocol (CDP)](#cisco-discovery-protocol-cdp)
  - [Link Layer Discovery Protocol (LLDP)](#link-layer-discovery-protocol-lldp)
- [CDP and LLDP Network verification and configurations](#cdp-and-lldp-network-verification-and-configurations)
  - [CDP configuration](#cdp-configuration)
  - [LLDP configuration](#lldp-configuration)
- [Conclusion](#conclusion)

### Prerequisites
The reader must put the following into consideration:
- The reader should be conversant with the basic networking concepts.
- Have a good understanding of how to configure networks and their components using any of the network simulation tools.
- For this article, it is best for the reader to know how to work with the Cisco packet tracer network simulator tool.

To download and install the Cisco packet tracer on a desktop or laptop, visit [this link](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html).

### What is Network Management?
`Network Management` refers to controlling, managing, and maintaining networks by allowing the network devices to communicate with each other with no failures. It allows for troubleshooting and performance enhancements through traffic monitoring, intrusion detection, and interface failure detection.

To manage the networks, we use the ***Cisco Discovery Protocol (CDP)*** , and ***Link Layer Discovery Protocol (LLDP)*** which gather information about the neighboring devices useful for network design decisions, troubleshooting, and network documentation.

### Layer 2 Discovery protocols
They are protocols operating at layer 2 (Data Link Layer) of the OSI model which discover and share information about the neighboring connected devices on the network topology used for network management.

They do not use IP address but used to share layer 3 routing information such as the hostname, and device type.

The neighbor device information displayed may include:
- Device identifier (ID) - which is the name of the neighboring network device.
- Port identifier (ID) - this is the name of the local or the interface port.
- Capability List - shows whether the neighboring device is a router, switch, or server.
- Platform - the hardware platform for the network device.
- Hold time - is the time it takes for a neighbor device to receive the message containing the neighbor device information.

#### Cisco Discovery Protocol (CDP)
Cisco Discovery Protocol (CDP) is a Cisco-based protocol enabled on Cisco devices by default to help network administrators gather and discover information about the local and remote devices attached to the network.

Using this protocol, one can collect information about neighboring devices useful for network management and troubleshooting.

CDP works only on Cisco devices and provides information about the directly linked devices only. The protocol sends the CDP messages containing the neighbor information after every 60 seconds and has a hold time of 180 seconds by default.

#### Link Layer Discovery Protocol (LLDP)
Link Layer Discovery Protocol (LLDP) functions like the CDP protocol, but it is an industry-standard protocol, not only limited to Cisco devices but works in multi-vendor environments.

Usually, it is disabled on Cisco devices so we must manually configure it as we will see. LLDP sends the LLDP messages containing neighbor information after every 30 seconds and has a hold time of 120 seconds.

> NOTE: When devices receive both CDP and LLDP massages, they process and discard the messages. They do not forward the messages to other devices on the network.

### CDP and LLDP Network verification and configurations
We will learn how to configure the two discovery protocols for network management on network devices.

Consider the network below with two routers connected, two switches, each connected to 2 PCs. We have already assigned the devices the IP address as shown:

![CDP-LLDP Network Configuration](/engineering-education/network-management-with-cdp-lldp/network.jpg)

#### CDP configuration
For CDP, it's configured on Cisco devices only by default. To verify this and display its information, the `show cdp` command is used in the privileged exec mode.

```bash
R1>enable
R1#show cdp                     ! shows CDP status and information
Global CDP information:
    Sending CDP packets every 60 seconds
    Sending a holdtime value of 180 seconds
    Sending CDPv2 advertisements is enabled
R1#
```

If CDP is not enabled on the Cisco device, command `cdp run` is used to enable it, and to disable command `no cdp run` is used.

```bash
R2>enable                            ! move from user-exec to privileged exec mode
R2#config terminal                   ! move from privileged exec mode to global configuration mode
R2(config)#no cdp run                ! disabling the CDP protocol
R2(config)#exit
R2#show cdp
% CDP is not enabled                 !message not enable
```

```bash
R2#config terminal
Enter configuration commands, one per line. End with CNTL/Z.
R2(config)#cdp run                         !cdp protocol enabled
R2(config)#exit
R2#show cdp                                  !cdp status
Global CDP information:
    Sending CDP packets every 60 seconds
    Sending a holdtime value of 180 seconds
    Sending CDPv2 advertisements is enabled

```

To display the neighbors' information, for instance, neighbors of R1, we use the  ***show cdp neighbor*** command.

```bash
R1>enable
R1#show cdp neighbors
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone
Device ID  Local Interface  Holdtme   Capability   Platform   Port ID
S1           Gig 0/1          147            S       2960        Fas 0/1
R2           Gig 0/0          172            R       C2900       Gig 0/1
R1#
```

From the information, it's clear that `S1` and `R2` are connected to `R1` as seen from the network setup. The interfaces, hold time, capabilities, port ID, and the platform are displayed.

For more details about the neighboring devices, such as the IP address of the devices, the `show cdp neighbor detail` command is shown.

```bash
R1#show cdp neighbor detail
Device ID: R2                              !information about neighbor R2
Entry address(es):
  IP address : 192.168.3.2
Platform: cisco C2900, Capabilities: Router
Interface: GigabitEthernet0/0, Port ID (outgoing port): GigabitEthernet0/1
Holdtime: 123
```

#### LLDP configuration
For LLDP, the configuration procedure is like that of CDP, although LLDP is usually globally disabled by default on the network devices.

To enable it, we use the `lldp run` command, and to disable we use `no lldp run`.

```bash
R2>enable
R2#show lldp                                   ! checks status of lldp
% LLDP is not enabled                           ! disabled globally by default,
R2#config terminal
R2(config)#lldp run                              !enabling lldp globally,
R2(config)#exit
R2#
R2#show lldp

Global LLDP Information:                              !status of lldp enabled
    Status: ACTIVE
    LLDP advertisements are sent every 30 seconds
    LLDP hold time advertised is 120 seconds
    LLDP interface re-initialization delay is 2 seconds
R2#
```

```bash
R2#config terminal
R2(config)#no lldp run                           ! disabling lldp
R2(config)#exit
R2#show lldp
% LLDP is not enabled                            ! disabled
R2#
```

To display the neighbors' information the same procedure used in CDP is applied but we use the command `show lldp neighbors`.

```bash
R2#show lldp neighbors
Capability codes:
    (R) Router, (B) Bridge, (T) Telephone, (C) DOCSIS Cable Device
    (W) WLAN Access Point, (P) Repeater, (S) Station, (O) Other
Device ID           Local Intf     Hold-time  Capability      Port ID
R1                  Gig0/1         120        R               Gig0/0
S2                  Gig0/0         120        B               Fa0/1

Total entries displayed: 2
```

From the above information, it's clear that `R1` and `S2` are directly connected to `R2` as seen from the network setup. The interfaces, hold time, capabilities, port ID, and the platform are displayed.

For more details about the neighboring devices, such as the IP address of the devices, the `show lldp neighbor detail` command is used.

> NOTE: When configuring LLDP, one has to configure it on every device for it to discover and gather information about the neighboring devices. For CDP it's already configured by default so there is no need of configuring it unless it is disabled.

### Conclusion
As we have seen, Layer 2 discovery protocols can share information with and discover information about neighboring connected devices in extensive networks.

This information is crucial in analyzing the network topology, troubleshooting for failures, and documenting the network.

To summarize:
- We learned what Network Management is.
- We explored different Layer 2 protocols used in network management.
- We configured a network, verified, and configured the CDP and LLDP protocol.
- We learned how the information gathered by the protocols can be used in network management.

One can find more information about network management [here](https://contenthub.netacad.com/ensa/10.0.1).

Happy coding.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)