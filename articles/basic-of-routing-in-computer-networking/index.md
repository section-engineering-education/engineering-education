## Basic of Routing in Computer Networking

![](cover.png)

Connectivity between networks, both on Local Area Network (LAN) and internet at large, are managed and controlled by the idea of computer networking. Networking is a field in Information Technology (IT) that ensures the interconnectivity between and among networks. It ensures that the broadcasting of packet data (message, data) is an easy and achievable process. The connectivity which ensures movement of data is made possible through the concept of this discourse - “ROUTING”. Routing is the selection of path or route to be followed by a particular data packet (data or message or information) that is being shared over a network.

### Keywords

- Router: A device that is capable of transferring data from the source address to the destination address
- Packet data: This is the data or information or message being shared or transferred over a network. In this discussion, we shall be using the three words interchangeably.
- Protocols: Set of rules or guidelines that governs data transmission over a network. It is a standard that must be followed by nodes (computer) on a network to be able to communicate properly.
- Node: Individual devices or PCs on the network.
- Hops:
- IP: Stands for Internet Protocol which delivers packets to the right computers. It is of two versions. The IPv4 and IPv6 (Internet Protocol Version 4 and 6)
- Autonomous System: A network or group of networks being managed and controlled by a single enterprise or operator.

### Why Routing?

Routing heavily relies on the device called router. Router is any device that provides a network to help forward and transfer traffic or help guide a traffic or data packet from the source address to the destination address. It is simply a device that knows and can forward messages or data between two or independent network protocols inasmuch as the protocol are within range and at compatible protocol path. The data obtained from the internet protocol (IP) are used to sort out its own data to execute its own data forwarding.
The main purpose of routing that cannot be over emphasized is the fact that it enable and ensures data forwarding which is one of the chief aims of computer networking.

### Categories of Routing Network Protocols

Routing is mainly grouped into the following categories

1. Interior Gateway Protocols (IGRP) and
2. Exterior Gateway Protocols (EGRP)

- Interior Gateway Protocol: This is the protocol of a routing system or routers to forward or share packet data within an (single) autonomous system. The best examples of an IGRP is the Enhanced Interior Gateway Protocol (IGRP), Internal System-to-Internal System.
  The Interior Gateway Protocol (IGRP) also has two main sub-categories of protocols which are “The Link State Protocol and Vector-Distance Protocol”. The link state protocol is an interior routing protocol that determines its route (path) and forward its packet based on the speed at which the packet or message intended location or destination and the vector-distance protocol got its meaning from the general computer science terminology “LIST” which is a vector. The protocols in this category depends solely on the distance of routing path to carry the data to the appropriate destinations. Its distance is calculated through the number of HOPs data required to be followed before getting to the destination.
- Exterior Gateway Protocol: This is a routing protocol in which the routing system or routers transfer messages among different or groups of an autonomous system. The EGRP examples are Inter Domain Routing (IDRP) and Broadcast Gateway Protocol (BGP).

### Stages in computer routing

1. Router receives the data packets from the source address
2. The data received are been examined to get the destination IP address
3. The IP destination are been looked-up in this stage
4. The data packet will be forwarded to the destination IP
   The above are the four stages of a routing system or a router before the completion of a routing process.

### IP ADDRESS IN SIMPLE ENGLISH

The concept of computer is not complete and may sound ambiguous without the basic understanding of an IP address. An IP address is represented in 4 octet of a decimal number. That is, a number in the form 7.100.200.1 can be seen as an IP address. According to the Address Class System which is a way of defining how the IP address should be split, IP address is divided into three classes.

1. Class A which ranges from 0 – 127 and has a format of 0x at its left most.
2. Class B which ranges from 128 – 191 and has a format of 10x at its left most.
3. Class C which ranges from 192 – 223 and has a format of 110x at its left most.
   Every single IP address can be categorized or sectioned into two, namely;

- Network ID
- Host ID
  In class A for instance, 7.100.200.1 will have its network ID to be 7 and the remaining part of the IP address is referred to as host ID but in Class B for instance, 128.100.121.10 will have its network ID to be 128.100 and the remaining two octet to be the Host ID. In class C as you might have guessed, it has its first three octet to be the network ID and the last one octet to be the host ID.
  Non-routable Networks or IPs
  From the above explained IP addresses, there are three main non-routable networks which are;
- 10.0.0./8
- 172.16.0.0/12
- 192.168.0.0/16

### In conclusion

Data forwarding wouldn’t have been possible if not because of routing; and in computing, routing has been a means by which data were shared on a network with ease and reaches the aimed destination by the sender. Spoiler Alert! The concept of routing is more than what has been covered in this discussion but trust the basics have been demystified. And the understanding from this article can serve a greater purpose in your computer networking learning path. Check out this reading to learn more about routing in computer networking.
