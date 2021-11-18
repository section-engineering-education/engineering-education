---
layout: engineering-education
status: publish
published: true
url: /address-resolution-protocol/
title: Introduction to Address Resolution Protocol(ARP) and its Types
description: This article briefly introduces Address Resolution Protocol(ARP) and its types, namely, Gratuitous ARP(GARP), Inverse ARP(InARP), Proxy ARP and Reverse ARP(RARP).
author: shreya-a-n
date: 2020-08-07T00:00:00-12:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/address-resolution-protocol/hero.jpg
    alt: address resolution protocol image example

---
**The [Address Resolution Protocol(ARP)](https://en.wikipedia.org/wiki/Address_Resolution_Protocol) is a communication protocol used to discover the data-link layer address(Layer 2 address like Media Access Control(MAC) address) associated with an Internet layer address(Layer 3 address like IPv4 address). ARP was defined in 1982 by [RFC 826](https://tools.ietf.org/html/rfc826).**
<!--more-->

ARP is a request-response or request-reply protocol in which one device sends a request to another device asking for some information, to which the other device will reply with the required information. It is a message exchange pattern. *ARP packets are encapsulated by link layer and are distributed only in a particular network. As a result, ARP is said to be a link layer protocol.*

### Why do we need ARP?
Devices in a Local Area Network(LAN) are programmed to communicate using link layer addresses. Switches are not configured for a standard that will allow destination decisions to be based on IP within the same broadcast domain. A device that is not connected to the internet will not have an IP address. In that case, the network has to resort to using MAC addresses for communication. If a device wants to communicate with another device in the same LAN, it needs to know the MAC address of the other device’s network interface. This allows for the communication between the two end devices to be unicast.

### How does ARP work?
*Every device that is capable of handling IPv4 packets has an ARP table. An ARP table consists of IPv4 address to MAC address mappings.* Switches do not have an ARP table as they are not equipped to handle IP packets. However, switches maintain another kind of cache mapping the MAC address of the non-switch devices connected to this LAN to the port where packets should go to reach that device. Switches will send out the packet on all the enabled ports if they do not have the destination MAC address in the cache.

![ARP-example](/engineering-education/address-resolution-protocol/arpExample.jpg)

When device 1 with IP 192.168.10.154 wants to send a packet to device 3 with IP 192.168.10.160, it looks into its ARP cache to fetch device 3’s MAC address. If the IP to MAC translation for device 3 does not exist in the ARP cache, device 1 sends a broadcast packet to the network using the ARP protocol to ask "who has 192.168.10.160?".

All the devices in that network receive the ARP broadcast packet. The device with the requested IP address will reply with an ARP response that contains its MAC address. Note that the ARP response is unicast i.e it is sent only to the device that sent the ARP request. On receiving the ARP response, device 1 updates its ARP table with an entry for device 3. The switch too, updates its ARP cache noting which of its ports is connected to device 3.

*On Linux systems, ARP table can be displayed with the command "arp -an".*

### Gratuitous ARP
**A [gratuitous ARP](https://en.wikipedia.org/wiki/Address_Resolution_Protocol#ARP_announcements) is an unprompted ARP response.** *When a new device joins the LAN, it broadcasts its MAC address to the entire network immediately after its network interface boots up.* Gratuitous ARP packet has both, source and destination IP set to the IP address of the device issuing the packet and the destination MAC is the broadcast address ff:ff:ff:ff:ff:ff or 00:00:00:00:00:00 [based on the ARP implementation](https://www.practicalnetworking.net/series/arp/gratuitous-arp/). *There will be no follow up packets sent in response to a gratuitous ARP packet.*

![GARP-example](/engineering-education/address-resolution-protocol/garp.jpg)

### Inverse ARP(InARP)
**[InARP](https://en.wikipedia.org/wiki/Address_Resolution_Protocol#Inverse_ARP_and_Reverse_ARP) is an addition to ARP technology that enables a device to request for an IP address corresponding to a given MAC address.** InARP is defined in [RFC 1293](https://tools.ietf.org/html/rfc1293). InARP specifically applies to **Frame Relay stations with Data Link Connection Identifier(DLCI)** associated with a Permanent Virtual Circuit(PVC) that do not know the IP address of the station on the other side of this connection. *The devices in a Frame Relay network do not have MAC addresses. Instead, they have a unique identifier called DLCI for every virtual circuit they are connected to. DLCI is the Frame Relay equivalent of a hardware/MAC address.* InARP uses MAC addresses to find corresponding IP addresses. It is used mainly for device configuration. InARP is used when a device knows the DLCI of a remote router, but does not know its IP address. This is a common scenario on networks that share data-link addresses across different physical networks, such as Frame Relay and ATM. In that case, the device sends an InARP request asking for its IP address which, on receiving, it maps to its corresponding DLCI in the InARP table.

### Proxy ARP
**[Proxy ARP](https://en.wikipedia.org/wiki/Proxy_ARP) is used to facilitate ARP exchanges in order to resolve IP addresses to MAC addresses in devices that are separated by routers in the same network or sub-network.** Routers cannot forward Layer 2 packets and hence, ARP messages are never propagated outside of their networks. *When a device wants to resolve the MAC address of another device in a different subnet, the router located between the two subnets acts as a proxy for the other device and responds to the ARP broadcast with its own MAC address.* Proxy ARP is defined in [RFC 1027](https://www.ietf.org/rfc/rfc1027.txt).

![ProxyARP-example](/engineering-education/address-resolution-protocol/proxyARP.jpg)

When the ARP request from 192.168.1.2 asking for the MAC address of the device with IP 192.168.2.3 reaches 192.168.1.1(router interface), the router notices that 192.168.2.3 is in a different network. It acts as the proxy and sends an ARP response to 192.168.1.2 with its own MAC address i.e 00:00:AB:00:00:01.
192.168.1.2 sends all packets destined for 192.168.2.3 to the router first. The router takes care of further ARP resolution and routes packets to the intended destination.   

### Reverse ARP(RARP)
**[RARP](https://en.wikipedia.org/wiki/Reverse_Address_Resolution_Protocol) is used by a device that knows its MAC address but not its IP address in a LAN.** It is defined in [RFC 903](https://tools.ietf.org/html/rfc903). RARP is essential for devices that do not have enough memory to store their IP addresses. Consequently, they resort to broadcasting RARP requests to the LAN. A specially configured host called the **RARP-server**, which stores MAC address to IP address mappings, is responsible for responding to RARP requests with the requested IP addresses. *RARP is now obsolete and has been replaced by [Bootstrap Protocol(BOOTP)](https://en.wikipedia.org/wiki/Bootstrap_Protocol) and [Dynamic Host Configuration Protocol(DHCP)](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol).*

### Additional Resources
- [RFC 826 - An Ethernet Address Resolution Protocol: Or Converting Network Protocol Addresses to 48.bit Ethernet Address for Transmission on Ethernet Hardware](https://tools.ietf.org/html/rfc826)
- [Address Resolution Protocol](https://en.wikipedia.org/wiki/Address_Resolution_Protocol)
- [Networking Basics: How ARP Works](https://www.tummy.com/articles/networking-basics-how-arp-works/)
- [Proxy ARP | What is Proxy ARP? | Proxy ARP Process ⋆ IpCisco](https://ipcisco.com/lesson/proxy-arp/)
