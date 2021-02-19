# Understanding TCP/IP Transport Layer (Layer 4) protocols: TCP and UDP  
![Hero image](/engineering-education/understanding-tcp-ip-transport-layer-protocols/unspalsh.jpg)
![Source](https://unsplash.com/photos/3-fuFf4gPNY)

### Introduction
Each TCP/IP application typically choose to establish a temporary communication session to deliver data between two devices using either Transport Control Protocol (TCP) or User Datagram Protocol (UDP) based on the application requirements; this is done irrespective  regard to the destination host type, the type of media over which the data is to be sent, and the pathway taken by the information [Cisco](https://www.flashcardmachine.com/cisco-1-chapter4.html)
TCP provides a wide range of services such as error recovery, windowing, and order segment delivery to applications, whereas UDP does not.
In this article, we intend to look at these two transport layer protocols in detail.  

### Prerequisites
As a prerequisite, a foundational knowledge of TCP/IP Layer 1 to 3 would help the readers understand the article better.

### Table of contents
- Transport Layer responsibilities  
- Multiplexing
- Reliability of the transport layer
- Transport Control Protocol (TCP)
- User Datagram Protocol (UDP)
- Multiple conversations
- Port number
- Socket and Socket pairs
- Conclusion

### Transport Layer
The transport layer is part of the TCP/IP networking model, sometimes also called the **networking architecture**, a comprehensive set of documents that describes everything required for a computer network to function.
This model's transport layer is responsible for the logical communication between applications running on a different host, thus providing services to application layer protocols on a higher layer of the TPC/IP networking model.
Though many transport layer protocols exist, the two most commonly used protocols are the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP). 
These protocols support different functionalities for different application requirements, but at the minimum, the transport layer supports these functionalities.
- Ordered data transfer and data segmentation
- Tracking of individual conversation
- Multiplexing conversation using port numbers


#### Tracking of Individual applications
Data flowing from one application to another is known as conversation.
Because a host can have multiple applications communicating with other applications either within the local network or with a remote network, the transport layer has a mechanism that makes it possible for each application on a host to communicate with another application on a different host either within the local network or in a remote network. According to [Cisco](https://community.cisco.com/t5/switching/which-layer-of-the-model-osi-and-tcp-ip-is-the-port-number/td-p/3356063 ), this mechanism assigns an identifier called a **port number** to each application such that each software process that needs to access the network is has a unique identifier.

#### Ordered data transfer  
A continuous stream of bytes is broken down into segments for transmission and delivery by the transport layer's services. According to [this](http://waksudir.blogspot.com/2015/03/transport-layer-protocols) article, most networks have a limitation on the amount of data that a single packet can contain.
 Because of this, the sending device transport layer prepares the data in manageable pieces or **segments**.
Similarly, the receiving device transport layer receives these segments and uses the header to reconstruct them into complete data useful to the application.

#### Multiplexing Conversation using port numbers
When using an application, the data or services provided usually appear as a stream of continuous data. 
But sending data ( e.g., video) across a network as a complete stream can consume all of the available network bandwidth, thus preventing other communications such as an email from running simultaneously and making error recovery and retransmission of damage data difficult, if not impossible.   
The Multiplexing mechanism segments TCP and UDP data into small chunks to enable communication from different users to interleave on the same network. This mechanism relies on a concept known as a **socket.**

### Transmission Control Protocol
The type of transport layer protocol an application chooses to use depends on the application requirement. 
 TCP is analogous to sending a package with a tracker that tracks the package from its source to its destination.
[TCP Header](/engineering-education/understanding-tcp-ip-transport-layer-protocols/tcp.png)
[Source](https://en.wikiversity.org/wiki/Internet_Protocol_Analysis/Transport_Layer#/media/File:Internet_Protocol_Analysis_-_Transport_Layer.png)

As defined in Request For Comment (RFC) 7913, TCP has the following features.
- Connection establishment
- Multiplexing using ports
- Flow control using windowing  
- Error recovery
- Ordered data transfer and data segmentation.

#### Connection establishment and Termination
Before any TCP feature can occur, TCP connection establishment must first take place. TCP is a connection-oriented protocol; these protocols establish a permanent connection between client and server before the transfer of data can begin. 
 During this connection establishment, a device negotiates the amount of traffic to be forwarded during the  Three-way handshake, which must complete before data transfer can begin.
For example, to create a three-way handshake between a server and a host, the host sends an SYN flag to a server providing all the necessary information such as its port number (source port) and destination port number (signifying which services it wants access to). When the server receives the SYN flag from the host,  it sends back an SYN and ACK flag, which also contains a source port number (the port number used as the destination port number on the SYN flag sent by the host) and a destination port number (the port number which the host used as source port number). The host acknowledges those flags' reception with an ACK flag, and a connection is established, thus forming a **three-way handshake.**

[three-way hanshake](/engineering-education/understanding-tcp-ip-transport-layer-protocols/handshake-image.png)
[Source ](Author)

 **NOTE:** Each flag must contain a source port number and destination port number. 
When a device is sending an SYN flag, its port number becomes the source port number, while that of the device it is sending the flag to becomes the destination port number. After the device receives the SYN flag and wants to send an acknowledgment, it uses the ACK flag and then reverses these port numbers.
The session uses a four-way termination sequence; an additional flag, the FINISHED (FIN) flag, is used together with the SYN and ACK flag.
Using the session created above, after the host device receives the last packet from the server, it sends an acknowledgment (ACK) flag informing the server that it has received the packet. 
If the host intends to terminate the session, it sends a FIN flag and the ACK flag, informing the server that it has received all the information it requires from the server and intends to terminate it.
The server replies with an ACK flag notifying the client that it has received the FIN flag and is aware of the host's readiness to terminate the session.
The server replies with ACK and FIN flags, informing the host of its willingness to end the session. The session ends immediately after the host sends an ACK flag to the server completing the four way-handshake.
[Session termination](/engineering-education/understanding-tcp-ip-transport-layer-protocols/termination-image.png)
[Source ](Author)
In the example above, the host initiates the session termination;but in practice, any device can terminate a session.
  
#### Error recovery
TCP provides reliable data transfer, which means that all packet sent from a source reaches its destination.   In a situation where an error occurs along the route, TCP uses a mechanism to resend the faulty segment.     TCP uses acknowledgment (ACK) and sequence fields in the TCP header to number data bytes and tracks them. By so doing, it achieves reliability.  
For example, if a web server has 400 bytes of data to send to a web client requesting such data, after establishing the session, the server breakdown the data into small size or segment, let's say, 100 bytes. The server will send the first 100 bytes (0-99) of the data, with a sequence number of 1, the host after receiving this first segment, sends an ACK informing the server that the packet has reached its destination and it is reading to receive the next hundred bytes, i.e., 100-199 with a sequence number of 2. This mechanism will continue up to 400 bytes, with the host sending an acknowledgment for each segment received.

Though the explanation above does not recover any error, it is the same TCP mechanism used for error recovery.
 For error recovery, TCP uses the sequence and ACK flag so that the receiving host can notice missing data and request the sending device to resend the segment and uses the ACK flag to acknowledge the received of the missing piece.  
Assuming in the example above, the host received the first hundred bytes (0-99) with a sequence number of 1, and instead of receiving the next bytes (100-199) with a sequence number of 2, the host receives a segment with (200-299) bytes with a sequence number of 3, it will send a packet requesting for that missing segment, i.e., 100-99 with a sequence number of 2. The sending device can also resend a segment if the receiving device does not acknowledge all the data sent. The sending device, in this case, is a server.  
The server waits for a few moments using a timer called the retransmission timer to make sure that no other acknowledgment arrives, after which it then decides to resend that particular segment that it did not receive its acknowledgment flag.  

#### Flow control using Widowing  
Because network host has limited resources such as limited space and processing power, TCP implements a mechanism called flow control using a window concept that applied to the amount of data that can be awaiting acknowledgment at any one point in time.
The receiving device uses the windowing concept to inform the sender how much data it can receive at any given time; this allows the sender to either speed up or slow down the sending of segments through a **window sliding process.**

### User Datagram Protocol
User datagram protocol (UDP) is considered as best-effort transport protocol because it is a light-weighted transport protocol. UDP is a connectionless protocol, meaning it provides no reliability nor reordering of the data segment and flow control like TCP, which provides these services. Because of this, UDP is faster than TCP in transporting data. However, according to [Cisco](https://www.briefmenow.org/cisco/what-will-happen-17), UDP provides some similar benefits to TCP, such as data segmentation and Multiplexing using port numbers. UDP is used by applications that are tolerant to loss of data but not delay. For example, TCP's requirement will make it difficult to stream live video as all packets must be sent and acknowledged, which will consume many resources and causes severe delay. 
 But with UDP, if a packet is missing, the streaming will continue unnoticed. It only becomes apparent when many segments are missing, which is seen in low video quality and lack of synchronization between video and audio. 
The significant difference between TCP and UDP is that TCP offers a wide range of services to applications, while UDP does not, this does not make UDP inferior to TCP, but by providing fewer services, UDP has fewer bytes in its header, and this makes UDP is faster in transporting data.
[UDP header](/engineering-education/understanding-tcp-ip-transport-layer-protocols/udp-image.png)
[Source](https://en.wikiversity.org/wiki/Internet_Protocol_Analysis/Transport_Layer#/media/File:Internet_Protocol_Analysis_-_Transport_Layer.png)

### Differences between UDP and TCP

|UDP| TCP|
|:----:|:----:|
|Because UDP has a low-overhead, it is fast in the transmission of data.|Because of TCP hiigh-over head, it is slow in the transmission of data|
|UDP does not acknowledge receiving of data and those not resend lost data; thus, it is not reliable.|TCP is reliable because it acknowledges the received of data and resends lost data.| 
|UDP delivers data as it arrives without an ordered arrangement of the segment.|It delivers data in a sequenced order.|

### Applications that support UDP.
Becuase of their requirement, the following applictions support UDP
- Dynamic Host Transfer Protocol (DHCP)
- Domain Name System(DNS)
- Trivial File Transfer Protocol (TFTP)
- Voice over Internet Protocol (VoIP)

### Applications that support TCP.
Becuase of  reliable their requirement, the following applictions support TCP
- File Transfer Protocol (FTP)
- Hyper Text Transfer Protocol (HTTP)
- Secure Shell (SSH)


### Multiple separate conversations  
The whole purpose of building an enterprise network or connecting a small office home office (SOHO) network to the internet is for applications such as text messaging, email, video streaming, video, and audio conversations.   To manage these multiple simultaneous conversations, TCP and UDP use a header field that can uniquely identify these applications running simultaneously. This unique identifies are called port numbers.

### Port numbers
Each service running on a device uses a specific well-known port number. These port numbers identify each application or service running on a client uniquely. 
For every connection from clients,  the segment header contains two types of port numbers, they are:
- Source port number
- Destination port number.  

##### Source port numbers
Source port numbers are port numbers dynamically generated by the sending device's transport layer, which identifies each conversation between two end devices.  

##### Destination port number
 In a segment sent by a client, a destination port number is placed within it to tell the destination server the services that the client is requesting. This mechanism is possible because, unlike on a client machine in which request can originate from any locally unused port, services provided by a server have a well-known dedicated port assign to them; as such, the destination port number insert by the client informs the server which serves the client is requesting. 
For example, Telnet uses TCP transport protocol and has a destination port number of 23. When a server receives a segment with a destination port number of 23, it knows that the client is requesting a Telnet service.

### Socket Pairs  
The source and destination port numbers placed within a segment only identify which application in a client requests which service from a server, but the segment does not have any mechanism to specify which device is requesting the service.
To identify which device is requesting a particular service from another device, the internet protocol (IP) encapsulates the segment which contains the source and the destination port number.
This IP packet includes the source IP address (to identify which device the request originates from) and the destination IP address (to determine the destination device) thus, creating a socket. A socket is a combination of the destination IP address and destination port or source IP address and source port.
A socket is handy to the transport layer because it keeps track of services and devices requesting such services to properly forward data to the proper application as stated by [Cisco](https://community.cisco.com/t5/switching/which-layer-of-the-model-osi-and-tcp-ip-is-the-port-number/td-p/3356063).

### Port number groups
Internet Assigned Numbers Authority (IANA), an organization responsible for assigning various addressing standards, has grouped port numbers into three major groups, these groups are:
- Well-known ports
- Registered ports  
- Dynamic or private ports.

#### Well-known ports (number 0-1023)
Well-Known ports are port numbers assigned to services such as web browsers, email clients, HTTPS, and Telnet. 
The RFC6335 Outlines the registration procedures for these services and port numbers.  

The table below shows some well-known ports, the transport layer protocol they support, and their applications. These port numbers are assigned as listed in RFC6335.
| port number| protocol |    application  

|Port number | Protocol| Application|
|:----:|:----:|:----|
|20|TCP|FTP data|
|21 |TCP| FTP control
|22|TCP |SSH
|23|TCP|SMTP
|53|UDP|DNS
|67|UDP|DHCP Server

 [IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml "well Known ports").

#### Registered port numbers (102-49151)  
Organizations such as Cisco have port numbers assigned to some of their well-known services by IANA. 
IANA assigned these port numbers to request entities to use with specific processes or applications.

#### Dynamic (49152-65535)
Dynamic port numbers are usually assigned by a client operating system (OS) dynamically when establishing a server's connection.   

### Conclusion  
The transport layer protocol plays a vital role in how applications exchange data between them. One of these two transport layer protocols, Transport layer protocol (TCP) and User data protocol (UDP), can be used by an application to exchange data. Applications that are fault-tolerant but cannot tolerate delay use UDP, while those that can delay but not fault use TCP.
