# Implementing Network Address Translation (NAT) on a CISCO router
![hero Image](/engineering-education/implementing-network-address-translation/hero.jpg)
[source](https://unsplash.com/photos/eVWWr6nmDf8)
### Introduction
In this article, we will learn how to implement Network Address Translation (NAT) on a Cisco router. By the end of this article, the reader will learn what NAT is, different types of NAT and how to configure different types of NAT on a Cisco router.
  
### Table Contents
- [Requirement](#Requirement)
- [Internet Protocol](#Internet-Protocol)
- [Public and private IP address](#public-and-private-ip-address)
- [Private addressing](#Private-addressing)
- [Network Address Translation](#Network-Address-Translation)
- [Types of NAT](#Types-of-NAT)
- [Configuring static NAT](#Configuring-static-NAT)
- [Configuring dynamic NAT](#Configuring-dynamic-NAT)
- [Configuring PAT](#Configuring-PAT)
- [Conclusion](#Conclusion)
- [Activity files](#Activity-files)
- [Further reading](#Further-reading)

### Requirement
This tutorial uses the CISCO packet tracer [Download packet tracer](https://www.netacad.com/portal/resources/packet-tracer).
*NOTE To better understand this tutorial, the reader is expected to have a  foundational knowledge of IPV4 and the CISCO command-line interface (CLI)*

### Internet Protocol
According to [Wikipedia](https://en.wikipedia.org/wiki/IP_address), an Internet Protocol address (IP address) is a numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.
The IP address currently has two versions in use: Internet Protocol version 4 (IPv4) and Internet Protocol Version 6 (IPv6).
IPv4 defines an IP address as a 32-bit number while IPv6 defines an IP address as a 128-bit number.
### Public and private ip address
All IPv4 addresses can be divided into two groups: public (global) and private (local) addresses.
Public addresses are routable addresses that are used on the internet.
These addresses allow users to access resources on a computer network located anywhere in the world.
Private addresses are not routable  and no traffic can be sent to them or by them over the internet.
These addresses are within the range : 
- `10.0.0.0` to `10.255.255.255.255`
- `172.16.0.0` to `172.255.255.255`
- `192.168.0.0` to `192.168.255.255`

### Private addressing.
The major limitation of Internet Protocol Version 4 (IPV4) was its address exhaustion issue.
As a short-term solution, various protocols such as private addressing and Network Address Translation (NAT) were introduced.
These two standards work closely together, allowing organizations to assign private addresses to their internal network while translating them to public addresses to allow them connect to the internet.
Some devices in an organization's network may not need to connect to the internet; when building such a network, an administrator is expected to use private IP addresses as defined in [RFC 1918](https://tools.ietf.org/html/rfc1918).
The documentation defines a set of network addresses assigned to an organization's internal network so that devices can communicate locally.
If there is a need for such devices to connect to the internet, their private addresses must be translated to public addresses using Network Address Translation (NAT).

### Network Address Translation
Because private addresses are not routable addresses, for a device configured with a private address to access the internet or a remote network, the address must be translated into a public routable address.
This translation takes place on a NAT-enabled router which typically operates on the border of a stub network.
![Network address translation](/engineering-education/implementing-network-address-translation/nat.jpg)
In the figure above, PCA with an IP address of 172.31.1.2 want to reach the webserver, but because PCA's address is not routable, because of this it cannot access the server directly.
To do this, the NAT-enabled router translates the PC's private address of 172.31.1.2 to a public address of 200.100.100.2 that is routable over the internet.
From the server's perspective, it sees this address as the source address.
Suppose the server wants to send data to the PC, it will use that source address as its destination address.
When the data reaches the NAT-enabled router, the public address is then translated back to its original private address, and the data is forwarded to the PC

### Types of NAT.
Network address translation can be classified into three:
1. Static Network Translation (Static NAT)
2. Dynamic Network Address Translation (Dynamic NAT)
3. Port Address Translation (PAT)

#### Static NAT
Static NAT creates a one-to-one mapping between private and public addresses.
Static NAT is usually configured by a network administrator, and this configuration remains constant.

![Static NAT](/engineering-education/implementing-network-address-traslation/static.jpg)
In the figure above, PC1 and PC2 want to reach PC3, which is in a remote network.
But because both are configured with private addresses, which are not routable, they can not access PC3 directly.
To access PC3, a NAT-enabled router is configured with static NAT, which mapped their  private addresses to public addresses one-to-one, thus allowing them to communicate with PC3.
Static NAT is useful for a device that needs a dedicated address, such as a web server, but requires an equal number of public addresses for Simultaneous users.

 #### Dynamic NAT
Dynamic NAT, much the same as static, gives a one-to-one mapping among private and public addresses, yet not at all like static NAT dynamic.
Dynamic NAT makes a pool of public addresses and assigned them to private addresses on a first-come, first-served basis using matching criteria to determine which private addresses ought to be translated.
![Dynamic NAT](/engineering-education/implementing-network-address-traslation/dynamic.jpg)
In the figure above, an organization was assigned four public addresses, but the organization has more than four internal devices that require access to the internet.
To resolve this problem, the network administrator decides to configure dynamic NAT to allow these devices to access the internet.
If internal devices have been assigned all the available global addresses, any device requesting a public address to reach the internet will have to wait until one is made available.

#### Port Address Translation (PAT).
Dynamic NAT is use by an organizations to connect their devices, but some organizations need to have most if not all devices reach the internet.
If their network is large, it requires a huge set of registered public addresses; thus, it completely defeats NAT's goal.
Dynamic NAT lessens this problem to some degree. However, if a large percentage of internal hosts need access to the internet, Port Address Translation, also called NAT overload, solves this problem.
To understand how PAT works, it is important to recall how the host uses the Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) and port numbers to transmit data, which can be found here [Understanding TCP/IP Transport Layer Protocols: TCP and UDP](https://www.section.io/engineering-education/understanding-tcp-ip-transport-layer-protocols/).
With these protocols, PAT can map multiple private addresses to one or a few public addresses by ensuring that devices use different TCP and UDP port numbers for each session with a server on the internet.
![PAT](/engineering-education/implementing-network-address-traslation/pat.jpg)

### NAT configuration.
In the first half of this article, a brief introduction  on NAT and different types of NAT were explained.
This second part will cover how to implement Static NAT, Dynamic NAT, and PAT on a CISCO router.

####  Steps to Configuring Static NAT.
Static NAT is configured using two steps, which are:
1. Creating a mapping between the private internal address and public global address using the  **ip nat inside source static *private address public address*** global configuration command.
2. After the mapping is made, the interfaces partaking in NAT translation are configured as either **inside** or **outside** comparative with NAT.
The router interface associated with the LAN is assigned the inside interface using the **ip nat inside** interface mode command.
The router interface associated with the internet is assigned the outside interface using  the **ip nat inside** interface  mode command

![Static NAT topology](/engineering-education/implementing-network-address-traslation/statictopo.jpg)
In the figure above, the Gigabit 0/0 (g0/0) interface is the inside interface because it is connected to the LAN. In contrast, the S0/0/0 interface is configured as the outside interface because it connects to the internet.
### Configuring static NAT
To configure a static NAT between the private address **172.31.1.2** and public address **200.100.100.2**:
- Map the server's private address 172.31.1.2 to the public routable address 200.100.100.2 using the command:**Ip nat inside source static 172.31.1.2 200.100.100.2**
- Enter the **interface serial 0/0/0/**  command and identify the interface as the outside interface using the: **IP nat outside** command.
- Enter the **interface gigabitethernet g0/0**
command and identify it as the inside interface relative to NAT using the **IP nat inside** command.
![Static NAT configuration on a router](/engineering-education/implementing-network-address-traslation/staticcon.jpg)

### Steps Configuring Dynamic NAT
Configuring dynamic NAT has some similarities to configuring static NAT, but it also has differences.
Dynamic NAT still requires that both inside and outside interface be configured.
It uses an access control list (ACL) to specify which private addresses are subject to translation and a NAT pool of registered IP addresses to be allocated to them.
1. Create an ACL using the *access-list **1**  permit  **address wildcard mask** *
2. Create a NAT pool using the *ip nat pool **name first address last address ** netmask **sub-net mask** global configuration command
This pool will contain the public addresses for the translation.
*Because ISP usually assigned contiguous public addresses to organizations, the **first address** is the least address in the given address range.
The **last address** is the highest address of that range.
The netmask identifies the network to which these addresses belong*
3. Use the **ip nat inside source list *ACL number* pool *NAT POOL* command to binds the ACL and the NAT Pool created.
In this case, the ACL number is **1**, and the NAT POOL is **LAN**.
**Note**: different ACL numbers and pool names can be created and used, but ACL **1** and pool name **LAN** will be used throughout this tutorial for simplicity.
4. Use the **ip nat inside** interface command to enable the inside interface for NAT translation
5. Use the **ip nat outside** interface command to enable the outside interface for NAT translation.

### Configuring Dynamic NAT
An organization was assigned two public addressees, 200.100.100.1 and 200.100.100.2, and want to allow its internal hosts, in the private network 172.31.1.0  255.255.255.0 to reach the internet using dynamic NAT.
![Dynamic NAT topology](/engineering-education/implementing-network-address-traslation/dynamictopo.jpg)
To configure dynamic NAT for the network topology above:
- Create an access list that will specify the private addresses that  are allowed to be translated using the  **access-list 1 permit 172.31.1.0 0.0.0.255**
- Creats a pool that will contain the public addresses to be utilized for translation using the
**Ip nat pool LAN 200.100.100.1 200.100.100.1 netmask 255.255.255.0**
- Bind the access list and the pool together using the **ip inside source list 1 pool LAN**.
This allows for the dynamic translation of the private addresses and the public addresses in the NAT pool named **LAN**.
- Enter the **interface serial 0/0/0/**  command and identify it as the outside interface using the: **ip nat outside** command.
- Enter the **interface gigabitethernet g0/0**
command and identify it as the inside interface  using the **ip nat inside** command

![Dynamic NAT configuration on a CISCO router](/engineering-education/implementing-network-address-traslation/dynamiccon.jpg)

### Configuring PAT with multiple public addresses
If an organization is assigned more than one public address by an Internet Service Provider (ISP), then configuring PAT looks exactly like dynamic NAT, except that the **ip nat inside source list--- pool….** command in step 3 above has an **overload** keyword added to it at the end.

#### Steps to configuring PAT with multiple public addresses
1. Create an ACL using the *access-list **1**  permit  **address wildcard mask** *
2. Create a NAT pool using the **ip nat pool name first address last address  netmask sub-net mask** global configuration command.
This pool will contain the public addresses to be used for the translation.
3. The **ip nat inside source list *ACL number* pool *NAT POOL* overload**
The full command is **ip nat inside source list 1 pool LAN overload**.
1. Use the **ip nat inside** interface command to enable the inside interface for Nat translation
2. Use the **ip nat outside** interface command to enable the outside interface for NAT translation.

### Configuring PAT with multiple public addresses
An organization was assigned two public addressees, 200.100.100.1 and 200.100.100.2, and want to allow its internal hosts, in the private network 172.31.1.0  255.255.255.0 to reach the internet using PAT
![PAT topology](/engineering-education/implementing-network-address-traslation/pattopo.jpg)
 To configure PAT for the network topology above, the fowolling steps are applied.
- Create an ace list that will specify which private addresses are allowed to be translated using the  **access-list 1 permit 172.31.1.0 0.0.0.255**
- **Ip nat pool LAN 200.100.100.1 200.100.100.1 netmask 255.255.255.0** creates a pool that contains the public addresses to be used for translation
- Bind the access list and the pool together using the **ip inside source list 1 pool LAN overload**.
This allows for the dynamic mapping  of the private addresses and the public address in the NAT pool named LAN.
The **overload** keyword used here is the only configuration difference between PAT and dynamic NAT.
-  Enter the **interface serial 0/0/0/** to idenfitify the interface as the outside interface  using the: **ip nat outside command**.
- Enter gigabitethernet 0/0 using the **interface gigabitethernet g0/0**
command and identify it as the inside interface relative to NAT with **the ip nat inside** command
![PAT with multiple publicc address configuration on as CISCO router](/engineering-education/implementing-network-address-translation/patmulcon.jpg)

### Configuring PAT with a single address.
If an organization is assigned a single public address by an ISP, PAT can be configured with little changes compared to PAT with multiple addresses.
In this situation, a NAT pool is not created, but an outside interface used for the translation is used in place of the NAT pool in step 3 above.
1. Create an ACL using the *access-list **1** permit **address wildcard mask** 
2. PAT is enabled using the  **ip nat inside source list ACL number interface interface type/number overload**
*The interface used for this is the outside interface, and it is configured as the single public address assigned to the organization by an ISP*.

3. Use the **ip nat inside** interface command to enable the inside interface for Nat translation
4. Use the **ip nat outside** interface command to enable the outside interface for NAT translation.

### Configuring PAT with single single
An organization was assigned one public address, 200.100.100.1, and wants to allow its internal hosts, in the private network 172.31.1.0  255.255.255.0 to reach the internet using PAT
![PAT topology](/engineering-education/implementing-network-address-traslation/pattopo.jpg)
To configure PAT for the topology above, the fowolling steps are applied
-  Create an ace list that will specify which private addresses are allowed to be translated using the **access-list 1 permit 172.31.1.0 0.0.0.255**
- Bind the access list and the outside interface together using **the ip inside source list 1 interface s0/0/0 overload**.
- Enter serial 0/0/0/ interface command mode to identify it as the outside interface relative to NAT using the: ip nat outside command.
- Enter gigabitethernet 0/0 using the interface gigabitethernet g0/0 command and identify it as the inside interface relative to NAT using the ip nat inside command
 ![PAT with single address configuration on a CISCO router](/engineering-education/implementing-network-address-translation/patsincon.jpg)

### Conclusion
The introduction of private and public addressing and Network Address Translation helped slow down the exhaustion of Internet Protocol version 4 (IPV4).
But implementing NAT also had an unintended consequences, which is providing a layer of security to the internal network by hiding their internal IP address.
To summarize:
- The reader learned what network address translation is
- The reader understood different types of NAT and how to configure them on a CISCO router.

### Activity files 
For a better understaing of Network address traslation, the following files are provided for practice.
- [Staic NAT packet tracer activity files](https://drive.google.com/file/d/1GO_LIIUx_qBHQRMWuHQBpzIepQpUM85d/view?usp=sharing)
- [Dynamic packet tracer activity file](https://drive.google.com/file/d/1pwYgVJVSVQStPBy5ftsFtXwIrSq24pEK/view?usp=sharing)
- [PAT with multiple addresses activity file](https://drive.google.com/file/d/1Xf2qxUJ-6X74vsJY4HZ8Z9tZW2C3hT7j/view?usp=sharing)
- [PAT with single address activity file](https://drive.google.com/file/d/1_pBXkLEFshdthJuZHNwLgHOvoapybVEL/view?usp=sharing)

### Further reading
- [Access control list](https://searchsoftwarequality.techtarget.com/definition/access-control-list)
- [Network address translation](https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/26704-nat-faq-00.html)
- [Understanding CISCO command-line interface](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/configuration/15mt/fundamentals-15-mt-book/cf-cli-basics.html)
