---
layout: engineering-education
status: publish
published: true
url: /packet-filtering-using-acls/
title: Packet Filtering Using Access Control Lists
description: The objective of this tutorial is to help you understand the concept of Access Control Lists in traffic flow control and how routers can use it in filtering all the inbound and outbound traffic.
author: atonya-dennis
date: 2021-07-20T00:00:00-09:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/packet-filtering-using-acls/hero.jpg
    alt: Access Control List example image
---
Networks tend to be more vulnerable due to the incoming and outgoing unwanted and dangerous traffic. To improve this, a security mechanism is needed to control the flow of traffic and provide secure remote administrative access by restricting,permitting, and denying unnecessary traffic.
<!--more-->
This article will cover how the Access Control Lists (ACLs) can be used to control traffic flow by filtering all the incoming and outgoing packets, various types of control lists and how they can be used to configure the ACLs on the router interface.
### Table of contents
- [Prerequisites](#prerequisites).
- [Terminologies](#terminologies).
- [Access Control List Operations](#access-control-list-operations).
  - Types of Access Control Lists
  - Access Control Lists Tasks
- [Configuring Access Control Lists](#access-control-list-configuration).
- [Conclusion](#conclusion).

### Prerequisites
The reader should consider the following:
- Good understanding of how to configure networks and their components using any of the network simulation tools.
- The reader should have a good understanding of the basic networking concepts.
- This article is best for the reader to know how to work with the Cisco packet tracer network simulator tool.

To download and install the Cisco packet tracer on a desktop or laptop, visit [this link](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html).

### Terms and Terminologies
- **Access Control List (ACLs)** refers to a set of rules which allow/permit or deny any traffic moving through the routers. It works at layer 3 to provide security by filtering and controlling the flow of traffic from one router to another. By default the ACLs are not configured on the routers, so the network user has to configure on each of the router's interfaces.
- **Access Control Entries (ACEs)** refer to the collection of the rules used to permit or deny traffic. When creating ACLs the order of these rules must be considered.
- **Ingress** refers to the traffic that is flowing into the router.
- **Egress** refers to traffic flowing out of the router.
- **Packet filtering** refers to the controlled access to networks by analyzing the ingress and egress packets flowing through the networks by either forwarding them or discarding them depending on the given criteria. It occurs both at layers 3 and 4 of the OSI model.

### Access Control List Operations.
Once a particular Access Control List is configured on an interface it follows an operational procedure to filter the traffic flowing into the router.

- The source IP address is first extracted from the packet header by the router.

- The router starts at the top of the ACLs and compares the address to each Access Control Entries (ACE) sequentially.

- If any match is found the router carries out the instructions either allowing/permitting or denying/blocking the packet. The other control entries are not analyzed.

- If a match is not found in the control entries, the packet is discarded since there is always an implicit deny control entry automatically applied to all Access Control Lists.
#### Types of Access Control Lists.
Access Control Lists can be of two types the numbered and the named ACLs.
- **Numbered** refers to those ACLs specified using a number.

- **Named** these are the ACLs configured using names.

Both the named and numbered ACLs are divided into two categories:

- Standard ACLs- this type filters traffic based on only the source IP address.
They range from 1-99, they are implemented closest to the destination and blocks all the services like FTP, HTTP, Telnet.

- Extended ACLs- packet filtering is done based on source IP, destination IP, protocol types, and port numbers.
They range from 100-199, implemented closest to the source and a selected number of services are blocked as specified by the network administrator.

Command **access-list?** is used to show the available ACLs that can be configured on the router interface.


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

#### Access Control Lists Tasks.
Routers use Access Control Lists to perform various tasks:

- Increase network performance by limiting the network traffic

- Prioritization of certain network traffic

- A level of network security access

- Traffic flow control


### Access Control List Configuration.
We will learn how to create and configure standard IPv4 ACLs and how they filter the traffic.
To create a named standard ACL, we use the following global configuration command;
`Router(config)# ip access-list standard access-list-name`
For instance, we have created an access list called PERMIT-ACCESS of the standard type.
```bash
R1(config)# ip access-list standard PERMIT-ACCESS
R1(config-std-nacl)# remark ACE permits host 192.168.10.10
R1(config-std-nacl)# permit host 192.168.10.10
R1(config-std-nacl)#

```
For the numbered one we use command: `Router(config)# access-list access-list-number {deny | permit | remark text} source [source-wildcard] [log]`

For instance, we have created ACL 10 which permits a particular host to the internet.
```bash
R1(config)# access-list 10 remark ACE permits ONLY host 192.168.10.10 to the internet
R1(config)# access-list 10 permit host 192.168.10.10
R1(config)# do show access-lists
Standard IP access list 10
    10 permit 192.168.10.10
R1(config)#
```
Lets consider the  Local Area Network below:
![CDP-LLDP Network Configuration](/engineering-education/packet-filtering-using-acls/acl.jpg)

We will create one numbered ACL, ACL 20 that denies host 192.168.10.10 but permits all other hosts on network 192.168.10.0/24. Start by configuring the ACL 20 ACE that denies the 192.168.10.10 host using the `host` keyword, then create the ACL that permits all other hosts.
```bash
R1(config)#access-list 20 deny host 192.168.10.10
R1(config)#access-list 20 permit 192.168.10.0 0.0.0.255
```
Since ACL 20 only apply to traffic from LAN 1, the ACL would be applied to the incoming traffic to the G0/0/0 R1 interface.
Enter interface g0/0/0 mode, apply ACL 20 inbound and return to global configuration mode.
```bash
R1(config)#interface g0/0/0
R1(config-if)#ip access-group 20 in
R1(config-if)#exit
```
We will then create a named standard ACL that permits host 192.168.10.10 but denies all other hosts on network 192.168.20.0/24.
Start by creating a named standard ACL named LAN2-FILTER
```bash
R1(config)#ip access-list standard LAN2-FILTER

```
Create an ACE that permits host 192.168.10.10, and deny all other hosts using the `any` keyword.
```bash
R1(config-std-nacl)#permit host 192.168.10.10
R1(config-std-nacl)#deny any
R1(config-std-nacl)#exit
```
The LAN2-FILTER will be applied to the outgoing traffic to LAN 2.
Enter interface g0/0/1 mode, apply ACL LAN2-FILTER outbound and return to global configuration mode.
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
- Configured a network, created and configured the standard named and numbered ACLs.
- Learned how the configured ACLs can be used to permit or deny traffic.

One can find more information about network management [here](https://contenthub.netacad.com/ensa/5.0.1).

Happy coding.

---
