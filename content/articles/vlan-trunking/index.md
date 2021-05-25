---
layout: engineering-education
status: publish
published: true
url: /vlan-trunking/
title: Overview of VLAN Trunking and Encapsulation
description: This article briefly introduces Virtual Local Area Networks(VLANs) and their requirements. It discusses VLAN trunking and VLAN encapsulation using IEEE 802.1Q standard.
author: shreya-a-n
date: 2020-08-06T00:00:00-12:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/vlan-trunking/hero.jpg
    alt: vlan trunking and encapsulation

---
**A [virtual LAN (VLAN)](https://en.wikipedia.org/wiki/Virtual_LAN) is any broadcast domain that is partitioned and isolated in a computer network at the data link layer (OSI Layer 2).** LAN stands for Local Area Network and virtual, in the name, upholds the concept of separating broadcast domains of networks logically. *A broadcast domain is a network that is logically divided such that all nodes in the network can reach each other by broadcast at the data link layer*. *VLANs function by tagging every frame with a VLAN tag and designing the network such that it takes these tags into account while performing routing and forwarding.* By assigning tags to frames one can create the appearance and functionality of a computer network that is physically on a single network but acts as if it is split between separate networks. In simple terms, VLAN segregates traffic within a network.
<!--more-->

### What is VLAN trunking?
There are two ways of categorizing VLAN enabled ports on network devices:
- Untagged or Native ports
- Tagged or Trunk ports

 *A network port is a communication endpoint a device uses to send and receive traffic.*

**Native ports accept traffic from a single VLAN and are used to link end devices like routers, servers, terminals etc.** They do not need to accommodate an additional identification tag as they are involved in exchanging traffic with a single end device. Hence the name, **untagged ports**. They are also referred to as **access ports.**
**Trunk ports are used to pass traffic from multiple VLANs and are used to link switches.** In order to distinguish between frames from different VLANs, trunk ports add identification tags to the frames.
Hence the name, **tagged ports.**
**A trunk is a point-to-point link between two network devices that carry more than one VLAN.**

![native-vs-trunk](/engineering-education/vlan-trunking/native-vs-trunk.jpg)

In the diagram above, devices 1 and 2 have established Native VLANs with Switch 1. Similarly, devices 3 and 4 have Native VLANs established with Switch 2. Note that native VLANs transport untagged frames. However, when these untagged frames reach a trunk end, they need to be tagged to make sure the switch on the other side of the trunk can forward the frames to the right destinations. As a result, the switches with trunk ports add tags to the frames for identification - a process typically known as VLAN Encapsulation. Switch 1 tags all frames it receives from device 1 with VLAN ID 1 because device 1 belongs to VLAN 1, before forwarding the frames on the trunk. Similarly, it tags all frames from device 2 with VLAN ID 2. Switch 2, on receiving the tagged frames, decapsulates them to check which VLAN they are destined for and forwards them accordingly. Traffic on VLAN 1 will not be seen by devices in VLAN2 because Layer 2 unicast, multicast and broadcast traffic will not cross VLAN boundaries.

### What is VLAN encapsulation?
When a switch port is configured to function as a trunk port, it adds unique identification tags – either 802.1Q tags or Inter-Switch Link (ISL) tags to the frames as they move between switches.

**IEEE[802.1Q](https://en.wikipedia.org/wiki/IEEE_802.1Q), often referred to as DOT1Q or 1Q, is the networking standard that supports virtual LANs (VLANs) on an IEEE 802.3 Ethernet network. It is the most widely used encapsulation method for VLAN tagging.**

*Note: [IEEE 802.3](https://en.wikipedia.org/wiki/IEEE_802.3) is a standard that specifies the characteristics of physical layer and Media Access Control(MAC) layer for wired Ethernet connections, generally called LANs. It is also referred to as the Ethernet standard.*

![dot1q-frame-format](/engineering-education/vlan-trunking/dot1q.jpg)

The dot1Q frame standard accommodates a VLAN tag in the original Ethernet frame. This VLAN tag is 4 bytes long and consists of the fields discussed below:
1. **Tag Protocol ID(TPID)**: This field is used to identify the frame as IEEE 802.1q frame.  The value is set to 0x8100.
2. **Priority(PRI)**: This field indicates frame priority level. Also called Priority Code Point(PCP). See [this](https://en.wikipedia.org/wiki/IEEE_P802.1p#Priority_levels) link for priority levels.
3. **Canonical Format Indicator(CFI)**: Now known as Drop Eligibility Indicator(DEI), this field along with PCP is used to indicate frames that can be dropped during congestion.
4. **VLAN ID**: This ID is unique for each VLAN and helps in identifying which VLAN the current frame belongs to. This field is 12 bits long. Hence, 1dotQ supports 2^12 i.e. 4096 unique VLANs on a single Ethernet network.

*As 802.1q encapsulation inserts an additional field into the Ethernet frame, Frame Check Sequence(FCS) is recalculated.*
*All switches support 802.1q encapsulation.*

*VLAN implementations have shown an increase in the performance, scalability and security of the entire network.* There are several reasons for using VLANs in networks, but the most prominent one is **traffic management**. As long as a Local Area Network branches out and proliferates with more and more end devices and network devices, the frequency of broadcast increases accordingly. The chances of the network getting heavily congested with data increases simultaneously.
As stated before, VLANs separate network segments and limit broadcast traffic. In order for two subnets separated by VLANs to communicate, a Layer 3 device is required. Even if two ports of a device belonging to different VLANs wish to communicate, they need to be mediated by a Layer 3 routing device. Their traffic will essentially be segregated too. VLANs must, therefore, be used strategically in networks to avoid looping, overload and redundant usage of Layer 3 network devices.

### Additional Resources:
- [Packet Guide to Routing and Switching by Bruce Hartpence, Released August 2011](https://www.oreilly.com/library/view/packet-guide-to/9781449311315/ch04.html)
- [Inter-Switch Link and IEEE 802.1Q Frame Format](https://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/17056-741-4.html)
- [Fundamentals of 802.1Q VLAN Tagging, Cisco Meraki Documentation](https://documentation.meraki.com/zGeneral_Administration/Tools_and_Troubleshooting/Fundamentals_of_802.1Q_VLAN_Tagging)
- [The Importance of VLANs and Trunk Links in Network Communication Areas - Dlnya Abdulahad Aziz, Computer Technical Engineering, AL-KITAB University, Iraq](https://www.ijser.org/researchpaper/The-Importance-of-VLANs-and-Trunk-Links-in-Network-Communication-Areas.pdf)
