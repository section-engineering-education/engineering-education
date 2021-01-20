# Understanding TCP/IP Transport Layer (Layer 4) protocols:TCP and UDP  

![Hero image](/engineering-education/understanding-tcp-ip-transport-layer-protocols/hero-image.png)
![Source](https://en.wikiversity.org/wiki/Internet_Protocol_Analysis/Transport_Layer#/media/File:Internet_Protocol_Analysis_-_Transport_Layer.png)

### Introduction

Each TCP/IP application typically choose to establish a temporary communication session to deliver data between two application using either Transport Control Protocol (TCP) or User Datagram Protocol (UDP) based on the application requirements. This is done without regard to the destination host type, the type of media over which the data is to be sent, and the pathway taken by the data [Cisco](https://www.flashcardmachine.com/cisco-1-chapter4.html)
TCP provides a wide range of services such as error recovery, windowing, and order segment delivery to applications whereas UDP does not.
In this article, we intend to look at these two transport layer protocols in detail.  

### Prerequisites

For a better understanding of this article, foundational knowledge of TCP/IP  Layer 1 to 3 is required.  

**Content**
  -Transport Layer responsibilities  
  -Multiplexing
  -Reliability of the transport layer
  -Transport Control Protocol (TCP)
  -User Datagram Protocol (UDP)
  -Multiple conversations
  -Port number
  -Socket and Socket pairs
  -Conclusion

### Transport Layer responsibility

 The Transport layer i.e TCP/IP layer 4 has a set of responsibilities to help applications function properly and efficiently, these responsibilities are:
-The tracking of individual conversation  
-Ordered data transfer and data segmentation.
-Identifying applications.

**Tracking of Individual applications**
Data flowing from one application to another is known as conversation, and because a host can have multiple applications communicating with one or more applications either within the local network or with a remote network, the transport layer has a mechanism that makes it possible for each application on a host to communicate with another application on a different host either within the local network or in a remote network. According to [Cisco](https://community.cisco.com/t5/switching/which-layer-of-the-model-osi-and-tcp-ip-is-the-port-number/td-p/3356063 ), This mechanism assigns an identifier called a **port number** to each application such that each software process that needs to access the network is assigned a port number unique to that host.

**Ordered data transfer**  
A continuous stream of bytes is broken down into segments for transmission and delivery by services provided by the transport layer. This is because according to [waksudir](http://waksudir.blogspot.com/2015/03/transport-layer-protocols)  most networks have a limitation on the amount of data that can be included in a single packet, because of this, the sending device transport layer prepares the data to be sent in manageable pieces or **"segment"**, the receiving device transport layer receives these segment and reassembles them using a header which is used to track the data stream so that receiving device uses this header to reconstruct the segment into a complete data that is useful to the application.

### Multiplexing Conversation using port numbers

When using an application, the data or services being provided usually appear as if it is a stream of continuous data, but sending data ( e.g. video) across a network as a complete stream can consume all of the available network bandwidth, thus preventing other communication such as an email from running at the same time, and also makes error recovery and retransmission of damage data difficult, if not impossible.  
To avoid this problem,  a mechanism known as Multiplexing was used so that TCP and UDP data are segmented into small chunks to enable communication from different users to be interleaved on the same network. This mechanism relies on a concept known as a **socket.**

### Transmission Control Protocol

The type of transport layer protocol an application chooses to use depends on the application requirement. TCP is analogous to sending a package with a tracker that tracks the package from its source to its destination.
![TCP Header](/engineering-education/understanding-tcp-ip-transport-layer-protocols/tcp.png)
![Source](https://en.wikiversity.org/wiki/Internet_Protocol_Analysis/Transport_Layer#/media/File:Internet_Protocol_Analysis_-_Transport_Layer.png)

As defined in Request For Comment (RFC) 7913, TCP has the following features.
-Connection establishment
-Multiplexing using ports
-Flow control using windowing  
-Error recovery
-Ordered data transfer and data segmentation.
*Multiplexing using ports and ordered data transfer and segmentation had to be discussed above, in this section, we will be focusing on Connection establishment, Flow control using windowing, and error recovery.*

**Connection establishment and Termination**
Before any TCP feature can occur, TCP connection establishment must first take place. TCP is a connection-oriented protocol. A connected oriented protocol is a protocol that establishes a permanent connection between client and server before the transfer of data can begin. During this process, the sequence number, Acknowledgement fields, and port numbers to be used are negotiated.
During this connection establishment, the amount of traffic that should be forwarded at a given time is negotiated during the Three-way connection establishment flow, also known as the Three-way handshake which must be completed before data transfer can begin.
For example, to create a three-way handshake between a server and a host, the host sends an SYN flag to a server providing all the necessary information such as its port number (source port) and destination port number (signifying which services it wants access to). The server after receiving the SYN flag from the host sends back an SYN and ACK flag which also contains a source port number (the port number which was initially used as the destination port number on the SYN flag sent by the host) and a destination port number (the port number which was used by the host as source port number). The host acknowledges the reception of those flags with an ACK flag and a connection is established. Because of this three-way exchange, the mechanism is referred to as a three-way handshake.  

![three-way hanshake](/engineering-education/understanding-tcp-ip-transport-layer-protocols/handshake-image.png)
![Source ](Author)

Note that for each flag, be it SYN or ACK, the flag must contain a source port number and destination port number. These numbers remain the same, but their function changes depending on whether the device is sending an SYN flag or accepting an ACK flag. When a device is sending an SYN flag, its port number becomes the source port number, while that of the device it is sending the flag to becomes the destination port number. After the device receives the SYN flag and wants to send an acknowledgment, it uses the ACK flag and then converts the destination port number on the SYN flag to be its source port number and the source port number on the SYN flag to be the ACK flag destination port number.  
  
For TCP termination, the session uses a four-way termination sequence, an additional flag is added to the two flags (SYN and ACK) used in session establishment, this flag is the Finished (FIN) flag.
Using the session created above, after the host device receives the last packet from the server, it sends an acknowledgment (ACK) flag to inform the server that it has received the packet sent and if the host intends to terminate or end the session, it sends a FIN flag along with the ACK flag informing the server that it has received all the information it requires from the server and intends to end the session.
 The server replies with an ACK flag notifying the client that it has received the FIN flag and is aware of the readiness of the host to terminate the session. Along with the ACK flag, the server sends a FIN flag informing the host of its readiness also to end the session. The session is terminated immediately after the host sends an ACK flag to the server completing the four way-handshake.

![Session termination](/engineering-education/understanding-tcp-ip-transport-layer-protocols/termination-image.png)
![Source ](Author)
  Though in the example above, it is the host that initiates the session termination, in practice, any device can terminate a session.
  
**Error recovery**
TCP provides for reliable data transfer, this means that all packet that is sent from a source reaches its destination. In a situation where an error occurs along the route, TCP uses a mechanism to resend the faulty segment. TCP uses acknowledgment (ACK) and sequence fields in the TCP header to number data bytes and tracks them by so doing, it achieves reliability.  
For example, if a web server has 400 bytes of data to send to a web client requesting such data; after establishing the session, the server breakdown the data into small size or segment, let's say, 100 bytes. The server will send the first 100 bytes (0-99) of the data, with a sequence number of 1, the host after receiving this first segment, sends an ACK informing the server that the packet has reached its destination and it is reading to receive the next hundred bytes, i.e 100-199 with a sequence number of 2. This mechanism will continue up to 400 bytes with the host sending an acknowledgment for each segment received.

Though the explanation above does not recover any error, it is the same mechanism used by TCP for error recovery. For error recovery, TCP uses the sequence and ACK flag so that the receiving host can notice missing data and request the sending device to resend the segment and uses the ACK flag to acknowledge the received of the missing segment.  
Assuming in the example above, the host received the first hundred bytes (0-99) with a sequence number of 1 and instead of receiving the next bytes (100-199) with a sequence number of 2, the host receives a segment with (200-299) bytes with a sequence number of 3, it will send a packet requesting for that missing segment, i.e 100-99 with a sequence number of 2. The sending device can also resend a segment if the receiving device does not acknowledge all the data sent. The sending device in this case is a server.  
The server waits for a few moments using a timer called the retransmission timer to make sure that no other acknowledgment arrives, after which it then decides to resend that particular segment that was not acknowledged.  

**Flow control using Widowing**  
Because network host has limited resources such as limited space and processing power, TCP implements a mechanism called flow control using a window concept that applied to the amount of data that can be awaiting acknowledgment at any one point in time.
The receiving device uses the windowing concept to inform the sender how much data it can receive at any giving point in time. This allows the sender to either speed up or slow down the sending of segments. This is called **window sliding.**

### User Datagram Protocol

User datagram protocol (UDP sis considered as best-effort transport protocol because it is a light-weighted transport protocol. UDP is a connectionless protocol; meaning it provides no reliability nor reordering of the data segment and flow control like TCP which provides these services. Because of this, UDP is faster than TCP in transporting data. However, according to [Cisco](https://www.briefmenow.org/cisco/what-will-happen-17) UDP provides some similar services to TCP, such as data segmentation and multiplexing using port numbers. UDP is used by applications that are tolerant to loss of data, but not delay. For example, the requirement of TCP will make it difficult for streaming live video as all packets must be sent and acknowledge and this will consume a large number of resources and causes serious delay. But with UDP, if a packet is missing, the streaming will continue unnoticed. It only becomes obvious when a large number of segments are missing and this can be seen in poor video quality and lack of synchronization between video and audio. The major difference between TCP and UDP is that TCP offers a wide range of services to applications, while UDP does not, this does not make UDP inferior to TCP, but by providing fewer services, UDP has fewer bytes in its header and this makes UDP is faster in transporting data.
![UDP header](/engineering-education/understanding-tcp-ip-transport-layer-protocols/udp-image.png)
![Source](https://en.wikiversity.org/wiki/Internet_Protocol_Analysis/Transport_Layer#/media/File:Internet_Protocol_Analysis_-_Transport_Layer.png)

### Multiple separate conversations  

The whole purpose of building an enterprise network or connecting a small office home office (SOHO) network to the internet is so that applications such as text messaging, email, video streaming, video, and audio conversations can take place.   To manage these multiple simultaneous conversations, TCP and UDP use a header field that can uniquely identify these applications running simultaneously. This unique identifies are called port numbers.

### Port numbers

Each service running on a device uses a specific well-known port number. These port numbers are used to uniquely identify each application or service running on a client. For every connection from clients, two types of port numbers are required to be included in the segment header, they are:
-Source port number
-Destination port number.  

**Source port numbers**
Source port numbers are port numbers that are dynamically generated by the transport layer of the sending device which is used to identify each conversation taking place between two end devices.  

**Destination port number**
 In a segment sent by a client, a destination port number is placed within it, to tell the destination server the service the services the client is requesting.
This is possible because, unlike on a client machine in which request can originate from any locally unused port, services provided by a server have a well-known dedicated port assign to them, as such the destination port number insert by the client informs the server which serves the client is requesting for. For example, telnet uses TCP transport protocol and has a destination port number of 23, as such when a server receives a segment with a destination port number of 23, it knows that the client is requesting a Telnet service.

### Socket Pairs  

The source and destination port numbers placed within a segment are used only to identify which application in a host is requesting for which service from a server, but the segment does not have any mechanism to identify which device is requesting for the service and from which device.  
To identify which device is requesting a particular service from another device, the segment which contains the source and destination port number is encapsulated in an internet protocol (IP) packet. This IP packet contains the source IP address (to identify which device the request is originating from) and the destination IP address (to identify which device the service is being requested from).  
The combination of the destination IP address and the destination source address or the combination of source IP address and the source port is referred to as a Socket. The socket is very useful to the transport layer because it keeps track of services and devices requesting such services with the help of the socket so that when a response is returned, it can be forwarded to the correct application [Cisco](https://community.cisco.com/t5/switching/which-layer-of-the-model-osi-and-tcp-ip-is-the-port-number/td-p/3356063).

### Port number groups

Internet Assigned Numbers Authority (IANA), an organization responsible for assigning various addressing standards has grouped port numbers into three major groups, these groups are:
-Well-known ports
-Registered ports  
-Dynamic or private ports.

**Well-known ports (number 0-1023)**
Services such as web browsers, email client HTTPS, and Telnet have specific port numbers dedicated to them, these port numbers are referred to as Well-Known port,   RFC6335 Outlines the registration procedures for these services and port numbers.  
The table below shows some popular well-known port, the transport layer protocol they use, and the application these port numbers are assigned as listed in RFC6335.
| port number| protocol |    application  

|Port number | Protocol| Application|
|:----:|:----:|:----|
|20|TCP|FTP data|
|21 |TCP| FTP control
|22|TCP |SSH
|23|TCP|SMTP
|53|UDP|DNS
|67|UDP|DHCP Server
Some well-known ports are listed at [IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml "well Known ports").

**Registered port numbers (102-49151)**  
Organizations such as Cisco have port numbers assigned to some of their wells know service by IANA. IANA assigned these port numbers to request entities to use with specific processes or applications.

**Dynamic (49152-65535)**
Port numbers within this range are usually assigned by a client operating system (OS) dynamically when a connection to a server is initiated to identify which of the client application is requesting service during communication.  

### Conclusion  

The transport layer protocol plays a vital role in how applications exchange data between them. One of these two transport layer protocols; Transport layer protocol (TCP) and User data protocol (UDP) can be used by an application to exchange data. Applications that are fault-tolerant but cannot tolerate delay uses UDP, while those that can tolerate delay but not fault uses TCP.

### About the author

![Author Image](/engineering-education/understanding-tcp-ip-transport-layer-protocols/rabo.jpeg)
Rabo James Bature is a postgraduate student (Applied Physics) at the University of Jos with networking skills and a strong passion for Cybersecurity and data science. He spends most of his time studying current cybersecurity threats while teaching organizations and individuals how to better secure devices and networks.  
