---
layout: engineering-education
status: publish
published: true
url: /understanding-tcp-ip-transport-layer-protocols/
title: Understanding TCP/IP Transport Layer (Layer 3) protocols - TCP and UDP
description: This tutorial will be a brief dive into the understanding the transport layer protocols like TCP and UDP. The transport layer is part of the TCP/IP networking model, sometimes called the networking architecture.
author: rabo-james-bature
date: 2021-02-21T00:00:00-09:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-tcp-ip-transport-layer-protocols/hero.jpg
    alt: Transport layer protocols hero image
--- 
In this article, we will talk about how applications deliver data between two devices using either Transmission Control Protocol (TCP) or User Datagram Protocol (UDP). By reading this article, you will understand the workings of TCP and UDP, how they differ from each other, and will also see various applications using these protocols.
<!--more-->
As a prerequisite, a foundational knowledge of TCP/IP Layer 1 and 2 would help any readers understand the article better.

### Table of contents
- [Introduction to transport layer](#introduction-to-transport-layer)
- [Transmission Control Protocol](#transmission-control-protocol)
- [User Datagram Protocol](#user-datagram-protocol)
- [Differences between UDP and TCP](#differences-between-udp-and-tcp)
- [Application](#application)
- [Port number](#port-number)
- [Socket pair](#socket-pair)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Introduction to transport layer
The transport layer is part of the TCP/IP networking model, sometimes called the **networking architecture**. It contains a comprehensive set of documents that describes everything required for a computer network to function.

The transport layer is responsible for the logical communication between applications running on different hosts, thus providing services to application layer protocols on a higher layer of the TCP/IP network model.

Even though many transport layer protocols exist, the two most commonly used protocols are the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP). 

These protocols provide different functionalities for different application requirements. 

A few of the most important functionalities are:
- Tracking of individual conversation.
- Ordered data transfer and data segmentation.
- Multiplexing conversation using port numbers.

#### Tracking of individual conversation
Data flowing from one application to another is known as a conversation.

A host can have multiple applications communicating with each other, either within a local network or a remote network. The transport layer has a mechanism that makes it possible for each application on a host, to communicate with another application on a different host, either within a local network or a remote network.

According to [Cisco](https://community.cisco.com/t5/switching/which-layer-of-the-model-osi-and-tcp-ip-is-the-port-number/td-p/3356063 ), this mechanism assigns an identifier called a **port number** to each application, such that each software process that needs to access a particular network has an unique identifier.

#### Ordered data transfer
A continuous stream of bytes is broken down into segments for transmission and delivery by the transport layer services. 

According to [this](http://waksudir.blogspot.com/2015/03/transport-layer-protocols) article, most networks have a limitation on the amount of data that a single packet can contain. Because of this, the sending device transport layer prepares the data into **segments**.

Similarly, the receiving device transport layer receives these segments and uses the header to reconstruct them into complete data.

#### Multiplexing conversation using port numbers
When using an application, the data or services provided usually appear as a stream of continuous data.

But sending data (e.g., video) across a network as a complete stream can consume all of the available network bandwidth.
This prevent other services such as an email from using the medium and makes error recovery and retransmission of damage data more difficult.

The multiplexing mechanism segments TCP and UDP data into small chunks to enable communication from different users to interleave on the same network. This mechanism relies on a concept known as a **socket.**

### Transmission Control Protocol
> According to [this](https://searchnetworking.techtarget.com/definition/TCP) article, Transmission Control Protocol (TCP) can be defined as a standard that defines how to establish and maintain a network conversation through which application programs can exchange data.

The type of transport layer protocol an application chooses to use depends on the application requirement.

TCP is analogous to sending a package with a tracker that tracks the package from its source to its destination.

![TCP Header](/engineering-education/understanding-tcp-ip-transport-layer-protocols/tcp.png)

*Source: TCP Header by [Wikiversity](https://en.wikiversity.org/wiki/Internet_Protocol_Analysis/Transport_Layer#/media/File:Internet_Protocol_Analysis_-_Transport_Layer.png)*

As defined in Request For Comment (RFC) 7913, TCP has the following features:
- Connection establishment and termination. 
- Multiplexing using ports.
- Flow control using windowing.  
- Error recovery.
- Ordered data transfer and data segmentation.

#### Connection establishment and termination
Before any TCP feature can occur, TCP connection establishment must take place first, because TCP is a connection-oriented protocol.

A connection-oriented protocol is a protocol that establishes a permanent connection between client and server before the transfer of data can begin.

During this connection establishment, a device negotiates the amount of traffic to be forwarded during the three-way handshake, which must be completed before data transfer can begin.

A three-way handshake is established using two flags:
1. Synchronization (SYN) flag
2. Acknowledge (ACK) flag

The SYN flag is used in the first step of the connection establishment between the two hosts. This flag is found only in the first packet from the server and the host containing a synchronizing sequence number.

The ACK flag is used to acknowledge packets that are successfully received by a device.

For example, to create a three-way handshake between a server and a host, the host sends a SYN flag to a server providing all the necessary information such as its port number (source port) and destination port number (signifying which services it wants access to).

When the server receives the SYN flag from the host, it sends back another SYN and an ACK flag. This contains a source port number (the port number used as the destination port number on the SYN flag sent by the host) and a destination port number (the port number that the host used as source port number). The host acknowledges those flags' reception with an ACK flag, and a connection is established, thus forming a **three-way handshake.**

![Three-way hanshake](/engineering-education/understanding-tcp-ip-transport-layer-protocols/handshake.png)

#### Three-way handshake
Now, let's have a look at how three-way handshake is performed in detail:
- Each flag must contain a source port number and destination port number. 
- When a device is sending an SYN flag, its port number becomes the source port number, while the sending device becomes the destination port number.
- After the device receives the SYN flag and wants to send an acknowledgment, it uses the ACK flag and then reverses these port numbers.
- The session uses a four-way termination sequence. An additional flag, the FINISHED (FIN) flag, is used together along with the SYN and ACK flag.
- The finish (FIN) flag is used to request connection termination when there is no more data from the sender. This is the last packet sent by the sender.
- Using the session created above, after the host device receives the last packet from the server, it sends an acknowledgment (ACK) flag informing the server that it has received the packet.
- If the host intends to terminate the session, it sends a FIN flag and the ACK flag, informing the server that it has received all the information it requires from the server and intends to terminate it.
- The server replies with an ACK flag notifying the client that it has received the FIN flag and is aware of the hosts' readiness to terminate the session.
- The server replies with ACK and FIN flags, informing the host of its willingness to end the session. The session ends immediately after the host sends an ACK flag to the server completing the four way-handshake.

![Session termination](/engineering-education/understanding-tcp-ip-transport-layer-protocols/termination.png)

*Session Termination*

In the example above, the host initiates the session termination. But in practice, any device can terminate a session.
  
#### Error recovery
TCP provides reliable data transfer, that means that all packet sent from a source reaches its destination without any failure. In a situation where an error occurs along the route, TCP uses a mechanism to resend the faulty segment. 

It uses acknowledgment (ACK) and sequence fields in the TCP header, to number the data bytes and track them. By so doing, it achieves reliability.  

For example, if a web server has 400 bytes of data to send to a requesting web client. On establishing the session, the server breaks down the data into smaller segments, let's say, 100 bytes each. 

Then, the server sends the first 100 bytes (0-99) of the data, with a sequence number of 1. The host after receiving this first segment, sends an ACK informing the server that the packet has reached its destination and starts waiting for the arrival of the next segment i.e., 100-199 with a sequence number of 2. 

This mechanism continues up to 400 bytes, with the host sending an acknowledgment for each segment received. The explanation above does not recover any error, it will be the same TCP mechanism used for error recovery.

For error recovery, TCP uses the sequence and ACK flag so that the receiving host can notice missing data and request the sending device to resend the segment and uses the ACK flag to acknowledge the received of the missing piece.  

Assuming in the example above, the host received the first hundred bytes (0-99) with a sequence number of 1, and instead of receiving the next bytes (100-199) with a sequence number of 2, the host receives a segment with (200-299) bytes with a sequence number of 3, it will send a packet requesting for that missing segment, i.e., 100-99 with a sequence number of 2. 

The sending device can also resend a segment if the receiving device does not acknowledge all the data sent. The sending device, in this case, is a server.

The server waits for a few moments using a timer called the retransmission timer, to make sure that no other acknowledgment arrives, after that it then decides to resend that particular segment that it did not receive its acknowledgment flag.  

#### Flow control using windowing
Because network host has limited resources such as limited space and processing power, TCP implements a mechanism called flow control using a window concept. This is applied to the amount of data that can be awaiting acknowledgment at any one point of time.

The receiving device uses the windowing concept to inform the sender how much data it can receive at any given time. This allows the sender to either speed up or slow down the sending of segments through a **window sliding process**.

### User Datagram Protocol
User datagram protocol (UDP) is considered as a best-effort transport protocol because it is a light-weighted transport protocol. UDP is a connectionless protocol, meaning it provides no reliability or reordering of the data segment and flow control like TCP. Because of this, UDP is faster than TCP in transporting data.

However, according to [Cisco](https://www.briefmenow.org/cisco/what-will-happen-17), UDP provides some similar benefits to TCP, such as data segmentation and multiplexing using port numbers. UDP is used by applications that are tolerant to loss of data but not delay.

For example, TCP's requirement will make it difficult to stream live video, as all packets must be sent and acknowledged, which will consume many resources and can cause severe delay.

But with UDP, if a packet is missing, the streaming will continue unnoticed. It only becomes apparent when many segments are missing, which is seen in low video quality and lack of synchronization between video and audio.

The significant difference between TCP and UDP is that TCP offers a wide range of services to applications, while UDP does not, this does not make UDP inferior to TCP, but by providing fewer services, UDP has fewer bytes in its header, and this makes UDP is faster when transporting data.

![UDP header](/engineering-education/understanding-tcp-ip-transport-layer-protocols/udp.png)

*Source: UDP Header by [Wikiversity](https://en.wikiversity.org/wiki/Internet_Protocol_Analysis/Transport_Layer#/media/File:Internet_Protocol_Analysis_-_Transport_Layer.png)*

### Differences between UDP and TCP
|UDP| TCP|
|:----:|:----:|
|Because UDP has a low-overhead, it has faster transmission of data.|Because of TCP high-overhead, it has slow transmission of data|
|UDP does not acknowledge receiving of the data and does not resend lost data. Thus, it is not reliable.|TCP is reliable, because it acknowledges the received data and resends any lost data.|
|UDP delivers data as it arrives without an ordered arrangement of the segment.|It delivers data in a sequenced order.|

### Application
Protocols supported by UDP are:
- Dynamic Host Transfer Protocol (DHCP)
- Domain Name System (DNS)
- Trivial File Transfer Protocol (TFTP)
- Voice over Internet Protocol (VoIP)

Protocols supported by TCP are:
- File Transfer Protocol (FTP)
- Hyper Text Transfer Protocol (HTTP)
- Secure Shell (SSH)

### Multiple separate conversations
The whole purpose of building an enterprise network or connecting a small office home office (SOHO) network to the internet, is for applications such as text messaging, email, video streaming, video, and audio conversations to occur.

To manage these multiple simultaneous conversations, TCP and UDP uses a header field that can uniquely identifies these applications running simultaneously. This unique identifier is called port number.

### Port number
Each service running on a device uses a specific well-known port number. These port numbers identify each application or service running on a client uniquely.

For every connection from clients, the segment header contains two types of port numbers:
1. Source port number
2. Destination port number

#### Source port number
Source port numbers are port numbers dynamically generated by the sending device transport layer, that identifies each conversation between the two end devices.  

#### Destination port number
In a segment sent by a client, a destination port number is placed within it to tell the destination server, the services that the client is requesting.

This mechanism is possible because, unlike on a client machine in which request can originate from any locally unused port, services provided by a server have a well-known dedicated port assigned to them. As such, the destination port number is inserted by the client, informs the server.

For example, Telnet uses TCP transport protocol and has a destination port number of 23. When a server receives a segment with a destination port number of 23, it knows that the client is requesting a Telnet service.

### Socket pair
The source and the destination port numbers placed within a segment, only identifies which application in a client, requests for that service from a server. But the segment does not have any mechanism to specify which device is requesting the service.

To identify which device is requesting a particular service, the internet protocol (IP) encapsulates the segment containing the source and the destination port number.

This IP packet includes the source IP address to identify which device the request originates from and the destination IP address to determine the destination device. Thus, creating a socket.

A socket is a combination of the destination IP address and destination port or source IP address and source port.

A socket is handy to the transport layer because it keeps track of services and devices requesting such services, to properly forward the data to the requesting application as stated by [Cisco](https://community.cisco.com/t5/switching/which-layer-of-the-model-osi-and-tcp-ip-is-the-port-number/td-p/3356063).

### Port number groups
Internet Assigned Numbers Authority (IANA), an organization responsible for assigning various addressing standards, has grouped port numbers into three major groups, these groups are:
- Well-known ports
- Registered ports  
- Dynamic or private ports

#### Well-known ports (0-1023)
Well-known ports are port numbers assigned to services such as web browsers, email clients, HTTPS, and Telnet.

The RFC6335 outlines the registration procedures for these services and port numbers.  

The table below shows us some well-known port numbers, the transport layer protocol that they support, and their applications. These port numbers are assigned as listed in RFC6335.

|Port number | Protocol| Application|
|:----:|:----:|:----|
|20|TCP|FTP data|
|21 |TCP| FTP control
|22|TCP |SSH
|23|TCP|SMTP
|53|UDP|DNS
|67|UDP|DHCP Server

*Source: [IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml "well Known port")*

#### Registered port numbers (102-49151)
Organizations such as Cisco have port numbers assigned to some of their well-known services by IANA.

IANA assigned these port numbers to request entities to use with specific processes or applications.

#### Dynamic (49152-65535)
Dynamic port numbers are usually assigned by a client operating system (OS) dynamically when establishing a server connection.

### Conclusion
The transport layer protocol plays a vital role in how applications exchange data between eachother. One of these two transport layer protocols, Transport layer protocol (TCP) and User data protocol (UDP), can be used by an application to exchange data. Applications that are fault-tolerant but cannot tolerate delay use UDP, while those that can delay but not fault use TCP.

To summarize:
- The reader learned about what TCP and UDP is.
- The reader learned about the working of TCP and UDP, along with their comparisons.
- The reader learned how TCP establishes connections, how it terminates connections, and how it recovers from errors during data transfer.
- The reader learned about applications that use TCP and UDP.
- The reader learned about port numbers.

### Further reading
- [TCP Flags](https://www.geeksforgeeks.org/tcp-flags/)
- [Transmision Control Protocol](https://searchnetworking.techtarget.com/definition/TCP)
- [User Datagram Protocol](https://www.briefmenow.org/cisco/what-will-happen-17)
- [IANA Port numbers ](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- [TCP ordered data transfer](http://waksudir.blogspot.com/2015/03/transport-layer-protocols)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)