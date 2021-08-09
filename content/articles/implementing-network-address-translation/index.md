---
layout: engineering-education
status: publish
published: true
url: /implementing-network-address-translation/
title: Implementing Network Address Translation (NAT) on a Cisco Router
description: This tutorial will be a brief dive into understanding the address translations like NAT and PAT. We will learn to implement static NAT, dynamic NAT and PAT.
author: rabo-james-bature
date: 2021-03-05T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-network-address-translation/hero.jpg
    alt: NAT hero image
---
In this article, we will learn how to implement Network Address Translation (NAT) on a Cisco router. By the end of this article, the reader will have learned what NAT is, the different types of NAT, and how to configure different types of NAT on a Cisco router.
<!--more-->
As a prerequisite, foundational knowledge of Cisco command-line interface (CLI) and access control list (ACL) would help the readers understand the article better.

### Requirement
This tutorial uses the Cisco packet tracer. You can download the Cisco packet tracer [here](https://www.netacad.com/portal/resources/packet-tracer).

### Table of contents
- [Requirement](#requirement)
- [Internet Protocol](#internet-protocol)
- [Public and private IP address](#public-and-private-ip-address)
- [Private addressing](#private-addressing)
- [Network Address Translation](#network-address-translation)
- [Types of NAT](#types-of-nat)
- [Configuring static NAT](#configuring-static-nat)
- [Configuring dynamic NAT](#configuring-dynamic-nat)
- [PAT with multiple public addresses](#pat-with-multiple-public-addresses)
- [PAT with single public addresses](#pat-with-single-public-address)
- [Conclusion](#conclusion)
- [Activity files](#activity-files)
- [Further reading](#further-reading)

### Internet Protocol
According to [Wikipedia](https://en.wikipedia.org/wiki/IP_address), an Internet Protocol address (IP address) is a numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.

The IP address can be classifed as:
- Internet Protocol version 4 (IPv4)
- Internet Protocol version 6 (IPv6)

IPv4 defines an IP address as a 32-bit number, while IPv6 defines an IP address as a 128-bit number.

### Public and private IP address
All IPv4 addresses can be divided further into public (global) and private (local) addresses.

Public addresses are routable addresses that are used on the internet, these addresses allow the users to access resources on a computer network located anywhere in the world.

While, private addresses are not routable and no traffic can be sent to them or by them over the internet.

These addresses are within the range of:
- `10.0.0.0` to `10.255.255.255.255`
- `172.16.0.0` to `172.255.255.255`
- `192.168.0.0` to `192.168.255.255`

### Private addressing
The major limitation of Internet Protocol version 4 (IPv4) is its address exhaustion issue.

As a short-term solution, various protocols such as private addressing and Network Address Translation (NAT) were introduced.

These two standards work closely together, allowing organizations to assign private addresses to their internal network, while translating them to public addresses and allowing them to connect to the internet.

Some devices in an organization's network may not need to connect to the internet when building such a network. So, an administrator is expected to use private IP addresses as defined in [RFC 1918](https://tools.ietf.org/html/rfc1918) documentation.

The documentation defines a set of network addresses assigned to an organization's internal network so that devices can communicate locally. If there is a need for such devices to connect to the internet, their private addresses must be translated to public addresses using Network Address Translation (NAT).

### Network Address Translation
For a device configured with a private address to access the internet or a remote network, the address must be translated into a public routable address.

This translation takes place on a `NAT-enabled router` which typically operates on the border of a stub network.

![Network address translation](/engineering-education/implementing-network-address-translation/nat.JPG)

*Network Address Translation - Client-Server connection*

In the figure above, `PCA` with an IP address of `172.31.1.2` wants to reach the webserver, but because `PCA`'s address is not routable, it cannot access the webserver directly.

Instead, the `NAT-enabled router` translates the PC's private address of `172.31.1.2` to a public address of `200.100.100.2`, which is routable over the internet.

From the server's perspective, it sees this address as the source address. Suppose the server wants to send data to the PC, it will use the same source address as its destination address.

When the data reaches the `NAT-enabled router`, the public address is then translated back to its original private address, and the data is forwarded back to the PC.

### Types of NAT
Network address translation can be classified into three types.

They are:
1. Static Network Translation (Static NAT)
2. Dynamic Network Address Translation (Dynamic NAT)
3. Port Address Translation (PAT)

#### Static NAT
Static NAT creates a one-to-one mapping between private and public addresses.

Static NAT is usually configured by a network administrator, and this configuration remains constant.

![Static NAT](/engineering-education/implementing-network-address-translation/static.jpg)

*Static Network Address Translation*

In the figure above, `PCA` and `PCB` wants to reach `PCC`, which is a remote network.

But because both are configured with private addresses, they can not access `PCC` directly.

To access `PCC`, a NAT-enabled router is configured with static NAT, that maps their private addresses to public addresses using one-to-one relationship, thus allowing them to communicate with `PCC`.

Therefore, static NAT is useful for a device that needs a dedicated address, such as a web server. But, it requires an equal number of public addresses for users using them simulataneously.

#### Dynamic NAT
Similar to static NAT, the dynamic NAT gives a one-to-one mapping between private and public addresses. But, the mapping is done dynamically.

Dynamic NAT makes a pool of public addresses and assigns them to private addresses on a first-come-first-served (FCFS) basis to determine which private addresses ought to be translated.

![Dynamic NAT](/engineering-education/implementing-network-address-translation/dynamic.jpg)

*Dynamic Network Address Translation*

In the figure above, an organization is assigned to four different public addresses, but the organization can have more than four internal devices that require access to the internet.

To resolve this problem, the network administrator decides to configure dynamic NAT to allow these devices to access the internet.

If all the internal devices have been assigned to all the available global addresses, then the device requesting for a public address will have to wait until one is made available.

### Port Address Translation (PAT)
Dynamic NAT is more commonly used by organizations, to connect their devices to the internet. If their network is large, it requires a huge set of registered public addresses. Thus, it completely defeats NAT's goal.

Dynamic NAT reduces this problem to some degree. However, if a large percentage of internal hosts need access to the internet then, we must use Port Address Translation, also called NAT overload.

To understand how PAT works, it is important to recall how the host uses the Transmission Control Protocol (TCP), User Datagram Protocol (UDP) and port numbers to transmit data.

To learn more about TCP and UDP, it is highly recommeded to go over [this](/understanding-tcp-ip-transport-layer-protocols/) article before continuing to read.

With these protocols, PAT can map multiple private addresses to one or more public addresses by ensuring that devices use different TCP and UDP port numbers for each session.

![PAT](/engineering-education/implementing-network-address-translation/pat.jpg)

*Port Address Translation*

### NAT configuration
In the first half of this article, we learned briefly about NAT and the different types of NAT.

In the second part, we will cover how to implement static NAT, dynamic NAT, and PAT on a Cisco router.

#### Static NAT
##### Steps to configure static NAT
Static NAT can be configured using the following two steps.

They are:
1. Creating a mapping between the private internal address and public global address using the `ip nat inside source static [private-address] [public-address]` global configuration command.

2. After the mapping is made, the interfaces taking part in the NAT translation are configured as either `inside` or `outside` with respect to NAT.

The router interface associated within the LAN is assigned the `inside` interface using the `ip nat inside` interface mode command.

Similarly, the router interface associated with the internet is assigned the outside interface using the `ip nat inside` interface mode command.

![Static NAT topology](/engineering-education/implementing-network-address-translation/statictopo.JPG)

*Static NAT topology*

In the figure above, the Gigabit 0/0 `(g0/0)` interface is the `inside` interface because it is connected to the LAN. In contrast, the `S0/0/0` interface is configured as the `outside` interface because it is connected to the internet.

#### Configuring static NAT
To configure a static NAT between the private address `172.31.1.2` and public address `200.100.100.2`:

- Map the server's private address `172.31.1.2` to the public routable address `200.100.100.2` using the command `ip nat inside source static 172.31.1.2 200.100.100.2`.
- Enter the "interface serial `s0/0/0/`" command and identify the interface as the outside interface using the command `ip nat outside`.
- Enter the "interface gigabitethernet `g0/0`" command and identify it as the inside interface relative to NAT using the `ip nat inside` command.

![Static NAT configuration on a router](/engineering-education/implementing-network-address-translation/staticcon.JPG)

*Static NAT configuration*

#### Dynamic NAT
##### Steps to configure dynamic NAT
Dynamic NAT still requires that both the inside and the outside interfaces be configured.

For allocation, it uses an access control list (ACL) to specify which private addresses are subject to translation and a NAT pool of registered IP addresses.
1. Create an ACL using the `access-list 1 permit address wildcard mask` command.
2. Create a NAT pool using the `ip nat pool [name] [first-address] [last-address] [netmask] [subnet mask]` global configuration command.

This pool will contain the public addresses for the translation. Because, ISP assigns the public addresses contiguous to the organizations.

The `first address` is the least in the given address range. And, the `last address` is the highest address of that range.

The netmask identifies the network to which of these addresses belong to, using the `ip nat inside source list [access-list] [number] pool [name]` command to bind the ACL and the NAT Pool created.

In this case, the ACL number is `1`, and the NAT POOL is `LAN`.

**NOTE**: Different ACL numbers and pool names can be created and used, but ACL `1` and pool name `LAN` will be used throughout this tutorial for simplicity.

1. Use the `ip nat inside` interface command to enable the `inside` interface for NAT translation
2. Use the `ip nat outside` interface command to enable the `outside` interface for NAT translation.

##### Configuring dynamic NAT
An organization is assigned with two public addresses: `200.100.100.1` and `200.100.100.2`. It wants to allow its internal hosts, in the private network `172.31.1.0` and `255.255.255.0` to reach the internet using dynamic NAT.

![Dynamic NAT topology](/engineering-education/implementing-network-address-translation/dynamictopo.JPG)

*Dynamic NAT topology*

To configure the dynamic NAT for the network topology above:
- Create an access list that will specify the private addresses that are allowed to be translated using the `access-list 1 permit 172.31.1.0 0.0.0.255`.
- Creates a pool that will contain the public addresses to be utilized for translation using the
`ip nat pool LAN 200.100.100.1 200.100.100.1 netmask 255.255.255.0`.
- Bind the access list and the pool together using the `ip inside source list 1 pool LAN`.
This allows for the dynamic translation of the private addresses and the public addresses in a NAT pool named `LAN`.
- Enter the `interface serial 0/0/0/` command and identify it as an outside interface using the `ip nat outside` command.
- Enter the `interface gigabitethernet g0/0` command and identify it as the `inside` interface using the `ip nat inside` command.

![Dynamic NAT configuration on a Cisco router](/engineering-education/implementing-network-address-translation/dynamiccon.JPG)

*Dynamic NAT configuration on a Cisco router*

### PAT with multiple addresses
If an organization is to be assigned more than one public address by an Internet Service Provider (ISP), then configuring PAT looks exactly like a dynamic NAT, except that the `ip nat inside source list--- pool` command in `step 3`, with an `overload` keyword added at the end.

#### Steps to configure PAT with multiple public addresses
1. Create an ACL using the `access-list 1 permit [address][ wildcard mask]`.
2. Create a NAT pool using the `ip nat pool [name] [first-address] [last-address] [netmask] [subnet mask]` global configuration command.
This pool will contain the public addresses to be used for the translation.
3. The `ip nat inside source list [ACL] [number] pool [name] overload`
The full command is `ip nat inside source list 1 pool LAN overload`.
4. Use the `ip nat inside` interface command to enable the `inside` interface for NAT translation
5. Use the `ip nat outside` interface command to enable the `outside` interface for NAT translation.

#### Configuring PAT with multiple public addresses
An organization is assigned to two public addressees: `200.100.100.1` and `00.100.100.2`, and it wants to allow its internal hosts, in the private network `172.31.1.0 - 255.255.255.0` to reach the internet using PAT.

![PAT topology](/engineering-education/implementing-network-address-translation/pattopo.JPG)

*PAT topology*

To configure PAT for the network topology above, the following steps are applied:
1. Create an ace list that will specify which private addresses are allowed to be translated using the `access-list 1 permit 172.31.1.0 0.0.0.255`
2. `ip nat pool LAN 200.100.100.1 200.100.100.1 [netmask] 255.255.255.0` creates a pool that contains the public addresses to be used for translation.
3. Bind the access list and the pool together using the `ip inside source list 1 pool LAN overload`.
This allows for the dynamic mapping of the private addresses and the public address in the NAT pool named LAN.
The **overload** keyword used here is the only configuration difference between PAT and dynamic NAT.
4.  Enter the `interface serial 0/0/0/` to identify the interface as the `outside` interface using the `ip nat outside` command.
5. Enter gigabitethernet g0/0 using the `interface gigabitethernet g0/0` command and identify it as the `inside` interface relative to NAT with the `ip nat inside` command.

![PAT with multiple public address configuration on as Cisco router](/engineering-education/implementing-network-address-translation/patmulcon.JPG)

*PAT with multiple public address configuration*

### PAT with single public address
#### Steps to configure PAT with a single address
If an organization is assigned a single public address by an ISP. Then, PAT can be configured with a little changes when compared to PAT with multiple addresses.

In this situation, a NAT pool is not created, but an outside interface used for the translation is used in place of the NAT pool as mentioned in `step 3` above.
1. Create an ACL using the `access-list 1 permit [address] [wildcard mask]`.
2. PAT is enabled using the `ip nat inside source list [ACL] [number] interface [interface-type/number] overload`.
The interface used for this is an outside interface, and it's configured as the single public address assigned to the organization by an ISP.
3. Use the `ip nat inside` interface command to enable the `inside` interface for Nat translation.
4. Use the `ip nat outside` interface command to enable the `outside` interface for NAT translation.

#### Configuring PAT with one public address
An organization is assigned one public address `200.100.100.1`, and it wants to allow its internal hosts in the private network `172.31.1.0 - 255.255.255.0` to reach the internet using PAT.

![PAT topology](/engineering-education/implementing-network-address-translation/patsingle.JPG)

*PAT topology with one public address*

To configure PAT for the topology above, the following steps will be applied:
1. Create an ace list that will specify which private addresses are allowed to be translated, using the `access-list 1 permit 172.31.1.0 0.0.0.255` command.
2. Bind the access list and the outside interface together using the `ip inside source list 1 interface s0/0/0 overload`.
3. Enter the `interface serial 0/0/0/` command to identify it as an `outside` interface relative to NAT using the: `ip nat outside` command.
4. Enter the `interface gigabitethernet g0/0` command and identify it as an `inside` interface relative to NAT using the `ip nat inside` command.

![PAT with one public address configuration on a Cisco router](/engineering-education/implementing-network-address-translation/patsincon.JPG)

*PAT with one public address configuration*

The figure above shows the configuration of PAT using one public address on a Cisco router.

### Conclusion
The introduction of private addressing, public addressing, and Network Address Translation has helped slow down the exhaustion of Internet Protocol version 4 (IPv4).

But implementing NAT also had unintended consequences, that was providing a layer of security to the internal network by hiding their internal IP address.

To summarize:
- The reader learned what network address translation is.
- The reader understood different types of NAT and how to configure them on a Cisco router.

### Activity files
For a better understanding of Network Address Translation, the following files are provided for practice.
- [Static NAT packet tracer activity files](https://drive.google.com/file/d/1ga7yVUv3oqswbJJW6mnGAZ7A81USSuMf/view?usp=sharing)
- [Dynamic packet tracer activity file](https://drive.google.com/file/d/1_pBXkLEFshdthJuZHNwLgHOvoapybVEL/view?usp=sharing)
- [PAT with multiple addresses activity file](https://drive.google.com/file/d/1Xf2qxUJ-6X74vsJY4HZ8Z9tZW2C3hT7j/view?usp=sharing)
- [PAT with single address activity file](https://drive.google.com/file/d/1_pBXkLEFshdthJuZHNwLgHOvoapybVEL/view?usp=sharing)

### Further reading
- [Access control list](https://searchsoftwarequality.techtarget.com/definition/access-control-list)
- [Network address translation](https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/26704-nat-faq-00.html)
- [Understanding Cisco command-line interface](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/configuration/15mt/fundamentals-15-mt-book/cf-cli-basics.html)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
