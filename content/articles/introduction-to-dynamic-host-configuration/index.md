---
layout: engineering-education
status: publish
published: true
url: /introduction-to-dynamic-host-configuration/
title: Introduction to Dynamic Host Configuration Protocol (DHCP)
description: This tutorial will be a brief dive into understanding Dynamic Host Configuration Protocol. We will also get an in-depth review about the types of DHCP.
author: rabo-james-bature
date: 2021-04-07T00:00:00-11:30
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-dynamic-host-configuration/hero.jpg
    alt: DHCP hero image
---
A vast majority of the hosts on the internet are end-user devices. Each of these devices requires an Internet Protocol (IP) address to identify them on the internet. This address can be configured statically by a network administrator or dynamically using Dynamic Host Configuration Protocol (DHCP).
<!--more-->
In this article, we will look at DHCP version 4 (DHCPv4) and DHCP version 6 (DHCPv6).

### Prerequisites
To better understand this article, foundational knowledge of Internet Protocol (IP) address is required.

### Table of contents
- [Dynamic Host Configuration Protocol](#dynamic-host-configuration-protocol)
  - [DHCPv4 operation](#dhcpv4-operation)
- [DHCPv4 DORA process](#dhcpv4-dora-process)
  - [DHCPv4 Discover](#dhcpv4-discover)
  - [DHCPv4 Offer](#dhcpv4-offer)
  - [DHCPv4 Request](#dhcpv4-request)
  - [DHCPv4 Acknowledgment](#dhcpv4-acknowledgment)
- [DCHPv4 lease renewal](#dchpv4-lease-renewal)
- [DHCPv6](#dhcpv6)
- [Stateless Address Auto Configuration (SLAAC)](#stateless-address-auto-configuration-slaac)
- [SLAAC options](#slaac-options)
  - [SLAAC](#slaac)
  - [Stateless DHCPv6](#stateless-dhcpv6)
  - [Stateful DHCPv6](#stateful-dhcpv6)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Dynamic host configuration protocol
Dynamic host configuration protocol (DHCP) is a process in which networking devices are assigned to Internet Protocol (IP) addresses dynamically.

This protocol is beneficial because it is time-saving and results in fewer configuration errors.

DHCP uses a client-server model for its operation. The server assigns an IP address to a client for a limited period or when the client no longer requires the address.

Because there are two versions of Internet Protocol (IP) addresses in use, i.e., IPv4 and IPv6, DHCP version 4 (DHCPv4) and DHCP version 6 (DHCPv6) were developed to accommodate these versions of IP addresses.

#### DHCPv4 operation
DHCPv4 uses a server-client model for its operation. The server can either be dedicated hardware or a Cisco router configured to assign IPv4 address to DHCPv4 clients.

DHCPv4 uses the Discover, Offer, Request, and Acknowledgement process, also known as DORA, to lease an IPv4 address.

### DHCPv4 DORA process
When a DHCP client wants to connect to a network, a four-step process is initiated.

The client starts this process by sending a broadcast message, also known as *DHCP Discover* message using its own MAC address and an IPv4 broadcast address of `0.0.0.0 0.0.0.0` to discover any available DHCPv4 server.

![DHCPv4 DORA process](/engineering-education/introduction-to-dynamic-host-configuration/dora.jpg)

[Source](https://ipwithease.com/wp-content/uploads/2017/07/dora-process-600x270.jpg)

*DCHPv4 process of assigning IPv4 address*

#### DHCPv4 Discover
Using the image above, `PC-A` boots up and needs an IP address. It sends a **DHCPv4 Discover** broadcast message to the network to locate a DHCPv4 server.

Because `PC-A` has no valid IPv4 information at boot-up, it uses its `MAC` (Media Access Control) address and default IP broadcast of `0.0.0.0 0.0.0.0` to communicate with a DHCPv4 server.

#### DHCPv4 Offer
When the DHCPv4 server receives the **DHCPv4 Discover** message from `PC-A`, it reserves any available IPv4 address for `PC-A`. It then sends a **DHCPv4 Offer** message back to the client, informing the client about its willingness to lease out an IP address.

#### DHCPv4 Request
`PC-A` can receive more than one **DHCPv4 offer** message from various servers. Being a client, `PC-A` uses **DHCPv4 Request** to select which DHCP server's offer is found suitable and is willing to accept.

#### DHCPv4 Acknowledgment
The server sends the **DHCPv4 Acknowledgment** message upon receiving the **DHCPv4 request** message from `PC-A` to verify the lease information and an ICMP ping is issued to that address by `PC-A` to ensure that it is not already in use by another client.

### DCHPv4 lease renewal
DHCP servers do lease out an IP address to a client for an administrative defined period.

Some clients may still need the address even after the defined period. To keep the IP address, the client will issue a **DHCP Request** message to the server that leased out the IPv4 address before the lease ends. 

This server will respond with a **DHCP Acknowledgement** message to renew the lease.

If the client does not receive the **DHCP Acknowledgement** message after a stipulated period, the client issues a fresh **DCHP Discover** message, and the process above is repeated all over again.

### DHCPv6
According to [this](https://tools.ietf.org/html/rfc8415) article, Dynamic Host Configuration Protocol (DHCP) for IPv6 describes an extensive mechanism for configuring nodes with network configuration parameters, IP addresses, and prefixes.

IPv6 uses a unicast address to identify a host on the internet. This IPv6 address can be configured either manually or dynamically.

IPv6 dynamic addresses can be assigned using one of two methods - Stateless Address Auto Configuration (SLAAC) or DHCPv6.

### Stateless Address Auto Configuration (SLAAC)
SLAAC is the preferred method of assigning an IPv6 address to an IPv6 device in a network.

In this method, the client sends a request to an IPv6 server requesting a network prefix, that the device combines with its MAC address to create an Ipv6 global unicast address.

Because it is stateless, it does not need a dedicated DHCPv6 server to maintain its network addressing information.

It uses the Internet Control Message Protocol version 6 (ICMPv6) **Solicitation** and **Advertisement** message to provide addressing information to a DHCPv6 server.

The **Router Solicitation** (RS) message is sent out by a client configured to obtain its addressing information from a DHCPv6 server to locate the DHCPv6 server in the network. This message is sent to an IPv6 multicast address of `FF02::2`, also known as the IPv6 **all-router multicast address**.

The router sends out a **Router Advertisement** (RA) message after receiving a router solicitation message. This message informs the IPv6 client of the availability of an IPv6 router or server to provide a prefix and prefix-length, and it is sent to the IPv6 all-nodes multicast address of `FF02::1`.

![DHCpv6 process](/engineering-education/introduction-to-dynamic-host-configuration/download.jpg)

[Source](https://download.huawei.com/mdl/image/download?uuid=fd210a1e9ae74fbeadd49b6414f51420)

*DHCpv6 process of assigning IPv6 address*

From the figure above, `PC-A` needs a network prefix length to create its unique ID. So it sends a router solicitation message to the all router-node address of `FF0::2` to locate a router on the network.

When a router receives this message, it replies with a router advertisement message to all nodes, with a multicast address of `FF0::2`, providing a prefix length for `PC-A`.

`PC-A` takes this prefix and creates its unicast address using one of the following methods:

1. EUI-64: In this process, `PC-A` creates its Interface ID (IID) using 48-bit of its MAC address and the RA message's prefix length.

2. Randomly generated: In this process, the Interface ID is generated by the client operating system.

### SLAAC options
The process explained above is the typical behavior of SLAAC. But using the **RA** message, various DHCPv6 options can be configured depending on the flag settings found in the RA message.

These flags are *Other configuration flags (O flag)* and the *Managed address configuration flag (M flag)*

Using these two flags, three different IPv6 addressing options can be configured on an IPv6 device. 

These options are:
1. SLAAC
2. Stateless DHCPv6
3. Stateful DHCPv6

#### SLAAC
In an IPv6 network, all nodes need a unique address to communicate. Various options were developed to assign IPv6 addresses to these network nodes, and these options include *SLAAC*.

With SLAAC, the router advertisement message `M` and `O` flags are set to `0`. This setting provides an IPv6 device with a network prefix, DNS server, and default-gateway information. But, the global unicast address for the device is not included in the RA message.

To get the unicast address, the device uses the prefix provided in the RA message combined with an interface ID using either the EUI-64 method or a randomly generated value by the device operating system.

#### Stateless DHCPv6
The stateless DHCPv6 option is known as **router advertisement and DHCPv6** because it uses the RA message to provide an IPv6 client addressing information while extra configuration parameters are to be obtained from a DHCPv6 server.

Like the SLAAC option, a stateless DHCPv6 client uses the prefix and prefix length provided by the RA message and the EUI-64 or generated interface ID to create its IPv6 global unicast address.

The client uses this unicast address to reach a DHCPv6 server requesting extra information such as the DNS server address and default gateway address.

This option is referred to as "stateless" because the DHCPv6 server does not maintain client state information such as addresses that have been assigned and those that are available.

#### Stateful DHCPv6
Stateful DHCpv6, also known as **DHCpv6**, which is similar to DHCPv4.

In this option, the router advertisement message informs the client to get all IPv6 addressing information required from a dedicated DHCPv6 server.

This addressing information includes the device's global unicast address, prefix, prefix length, DNS server address, and default gateway address.

This option is stateful because the DHCPv6 server maintains all addressing information like DHCpv4.

### Conclusion 
Dynamic Host Configuration Protocol (DHCP) makes it easy to assign Internet Protocol (IP) addresses to devices with fewer configuration errors within a shorter time.

To summarize, the reader has learned about:
- Dynamic Host Configuration Protocol.
- Different types of DHCP in use.
- Various DHCPv6 configuration options.

Happy learning!

### Further reading
- [Dynamic Host Configuration Protocol](https://www.efficientip.com/what-is-dhcp-and-why-is-it-important/)
- [DHCPv4](https://docs.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-top)
- [DHCPv6](https://www.iana.org/assignments/dhcpv6-parameters/dhcpv6-parameters.xhtml)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)