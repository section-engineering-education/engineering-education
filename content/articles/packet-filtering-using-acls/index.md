---
layout: engineering-education
status: publish
published: true
url: /packet-filtering-using-acls/
title: Packet Filtering using Access Control Lists (ACLS)
description: The objective of this tutorial is to help the reader understand the concept of Access Control Lists in traffic flow control and how routers can use it in filtering all the inbound and outbound traffic.
author: atonya-dennis
date: 2021-07-26T00:00:00-12:30
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/packet-filtering-using-acls/hero.jpg
    alt: Access Control List example image
---
Networks tend to be vulnerable (to security risks) due to the incoming and outgoing unwanted and dangerous traffic. A security mechanism is needed to control the flow of traffic and provide a secure remote administrative access. We can do this by restricting, permitting, and denying unnecessary traffic.
<!--more-->
This article will cover how the Access Control Lists (ACLs) can be used to control traffic flow by filtering all the incoming and outgoing packets. We use various types of control lists and we will go over how they can be used to configure the ACLs on the router interface.

### Table of contents
- [Prerequisites](#prerequisites)
- [Terminologies](#terminologies)
- [Access Control List Operations](#access-control-list-operations)
  - Access Control Lists Types
  - Access Control Lists Tasks
- [Configuring Access Control Lists](#access-control-list-configuration)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should:
- Have a good understanding of how to configure networks and their components using any network simulation tool.
- Have a prior understanding of the basic networking concepts.
- Know how to operate the Cisco packet tracer.

Go to this [page](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html) to download and install the Cisco packet tracer on your PC.

### Terminologies
- **Access Control List (ACLs)** refers to a set of rules that allow/permit or deny any traffic flow through the routers. It works at layer 3 to provide security by filtering and controlling the flow of traffic from one router to another.

By default, the ACLs are not configured on the routers, so the network user has to configure each of the router's interfaces.
- **Access Control Entries (ACEs)** refers to a collection of rules used to permit or deny traffic. When creating ACLs the order of these rules must be considered.
- The traffic flowing into the router is referred to as **ingress**.
- **Egress** refers to the traffic flowing out of the router.
- **Packet filtering** refers to the controlled access to networks by analyzing the ingress and egress packets flowing through the networks by either forwarding them or discarding them depending on the given criteria. It occurs both at layers 3 and 4 of the `OSI model`.

### Access Control List operations
Once a particular ACL is configured on an interface, it follows an operational procedure to filter the traffic flowing into the router.

- The router extracts the source IP address from the packet header first.

- Starting at the top of the ACLs, the router compares the address against each Access Control Entries (ACE) in order.

- If a match is found, the router carries out the instructions either permitting or blocking the packet. The other control entries are not analyzed.

- If a match is not found in the control entries, the packet is discarded since there is always an implicit deny control entry applied automatically to all Access Control Lists.

#### Access Control Lists types
There are two types of Access Control Lists: numbered and named ACLs.
- **Numbered** refers to those ACLs specified using a number.

- **Named** are the ACLs configured using names.

Both the named and numbered ACLs are divided into two categories:

- Standard ACLs - this type filters traffic based only on the source IP address.
They range from 1-99 and are implemented closest to the destination to block all the services like FTP, HTTP, Telnet.

- Extended ACLs - packet filtering is done based on the source IP, destination IP, protocol types, and port numbers.

They range from 100-199 and are implemented closest to the source to block a selected number of services specified by the network administrator.

A command **access list** is used to show the available ACLs that can be configured on the router interface.

```bash
R1(config)# access-list ?
 <1-99> IP standard access list
 <100-199> IP extended access list
 <1100-1199> Extended 48-bit MAC address access list
 <1300-1999> IP standard access list (expanded range)
 <200-299> Protocol type-code access list
 <2000-2699> IP extended access list (expanded range)
 <700-799> 48-bit MAC address access list
 rate-limit Simple rate-limit specific access list
 template Enable IP template acls
Router(config)# access-list
```

#### Access Control Lists tasks
Routers use ACLs to perform the following tasks:
- Increase network performance by limiting the network traffic.
- Prioritizing certain network traffic.
- Defining network security access rules.
- Traffic flow control.

### Access Control List configuration
Moving on, we will learn how to create and configure standard `IPv4` ACLs and how they filter the traffic. To create a named standard ACL, we use the following global configuration command:

`Router(config)# ip access-list standard access-list-name`

For instance, we have an access list called PERMIT-ACCESS of a standard type.

```bash
R1(config)# ip access-list standard PERMIT-ACCESS
R1(config-std-nacl)# remark ACE permits host 192.168.10.10
R1(config-std-nacl)# permit host 192.168.10.10
R1(config-std-nacl)#
```

For the numbered ACL, we use;

`Router(config)# access-list access-list-number {deny | permit | remark text} source [source-wildcard] [log]`

For instance, we have created ACL 10 which permits a particular host to the internet.
```bash
R1(config)# access-list 10 remark ACE permits ONLY host 192.168.10.10 to the internet
R1(config)# access-list 10 permit host 192.168.10.10
R1(config)# do show access-lists
Standard IP access list 10
    10 permit 192.168.10.10
R1(config)#
```

Let's consider the Local Area Network below:

![CDP-LLDP Network Configuration](/engineering-education/packet-filtering-using-acls/acl.jpg)

We will create one numbered ACL, ACL 20 that denies host 192.168.10.10 but permits all other hosts on network 192.168.10.0/24.

Start by configuring the ACL 20 ACE that denies the 192.168.10.10 host using the `host` keyword, then create the ACL that permits all other hosts.

```bash
R1(config)#access-list 20 deny host 192.168.10.10
R1(config)#access-list 20 permit 192.168.10.0 0.0.0.255
```

Since ACL 20 only apply to traffic from LAN 1, the ACL can be applied to the incoming traffic to the G0/0/0 R1's interface.
Enter interface G0/0/0 mode, apply ACL 20 inbound and return to global configuration mode.

```bash
R1(config)#interface g0/0/0
R1(config-if)#ip access-group 20 in
R1(config-if)#exit
```

We will then create a named standard ACL that permits host 192.168.10.10 but denies all other hosts on network 192.168.20.0/24.
Start by creating a named standard ACL named LAN2-FILTER.

```bash
R1(config)#ip access-list standard LAN2-FILTER
```

Create an ACE that permits host 192.168.10.10, and deny all other hosts using the `any` keyword.

```bash
R1(config-std-nacl)#permit host 192.168.10.10
R1(config-std-nacl)#deny any
R1(config-std-nacl)#exit
```

The LAN2-FILTER will be applied to the outgoing traffic to LAN 2. Enter interface G0/0/1 mode, apply ACL LAN2-FILTER outbound and return to global configuration mode.

```bash
R1(config)#interface g0/0/1
R1(config-if)#ip access-group LAN2-FILTER out
R1(config-if)#exit
```

>NOTE:  After creating and configuring the ACLs you can use the `show access-lists` or `show run | section ip access-list` commands in the priviledge exec mode to verify your configurations.

>To remove an ACLs use the `no access-list` command followed by the name or number of the access list. For instance `no access-list 10` to remove ACL 10.

### Conclusion
As we have seen, Access Control Lists play a crucial role in traffic flow control and the network's security at large. This makes the network less vulnerable to unwanted and dangerous traffic.

To summarize, we have:
- Learned what Access Control Lists are, their operations, and how to create and configure them.
- Explored different types of ACLs used in packet filtering.
- Configured a network, created, and configured the standard named and numbered ACLs.
- Learned how the configured ACLs can be used to permit or deny traffic.

One can find more information about network management [here](https://www.certificationkits.com/cisco-certification/ccna-articles/cisco-ccna-access-lists/cisco-ccna-packet-filtering-a-acls/).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
