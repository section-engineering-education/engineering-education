# Networking Models - Introductory Guide

Networking is the main reason we can write this blog and send it across to millions of readers with such ease. The overall picture is explored in the subject of computer networks. Computer networks deal with communication between systems. At the same time, it also considers how information sent from the source should reach its destination most efficiently. It's analogous to a congested city with loads of traffic. 

### Objective of Networking

To *establish communication*  between two different processes on two different hosts, we need to ensure the network behaves according to the needs and acts as though no network exists and both processes are on the same host. 


There are various parameters involved when looking at communicating across a network.

1. **Hardware**: The components that enable routing, computation, security. Different types are routers, transmission wires, fiber-optic, server end-points, etc 
2. **Firmware**: Firmware is defined as the software that enables specific functionalities in hardware. They are hardware-specific
3. **Software**: Applications that the end-user uses to interact with the computer and thereby other computers.
4. **Security**: The overall communication needs to be secured end-to-end. Only the receiver should be able to receive the message. The process of ensuring this is called encryption and it comes under the subject of network security.
5. **Routing**: Let us consider an example. You, a resident of India, are on a Skype call with your friend in the United States. What is the optimal route for the information to go? It can go via China, Russia, Underground Sea Cable Network, and the United States. Another possibility is the message going through the gulf areas. How do we choose? Thankfully, routing algorithms simplify the job of routing by taking into consideration distance, traffic, and the probability of successful transmission.
6. **Topology**: The internet is a very large network of small networks. Each of these small networks communicates internally as well. The structure established for the communication is referred to as a topology. Some of the various types are 
   1. Grid Topology
   2. Mesh Topology
   3. Bus Topology
   4. Star Topology
   5. Ring Topology 
7. **Transmission Technology**: There are two mediums of transmission: Wired and Wireless. The internet of the current era is predominantly Wired. Only at user endpoints do wireless routers populate the space of wireless transmission. The future of the internet is headed towards the wireless transmission. Companies like SpaceX are launching their fleet of the satellite to establish the infrastructure required to realize the same. 


It's an exciting subject and today we will be discussing the various models related to networking and how they deal with the above parameters mentioned. 

## What is a networking model? 

The networking model describes the architecture, components, and design used to establish communication between the source and destination systems. Aliases for network models include protocol stacks, protocol suites, network stacks, and network protocols. There are 2 predominant models available. Let us take a look at them

1. Open Systems Interconnection (OSI) Model
2. TCP/IP Model

### OSI Model

OSI stands for Open System Interconnect. It is an open standard for establishing communication between systems. We will understand this model intuitively.  

* **Application Layer**: The entire process begins at the end user's device. This can be a phone, laptop, server, etc. The application layer provides the interface for data exchange between the program and the user. For example, Facebook's web application/mobile application is the interface through which we like, share, comment, and perform various other activities. All these activities generate snippets of data that needs to be transmitted across the network.
  
* **Presentation Layer**: The presentation layer ensures the translation of characters from the original format in the host system to the format of the receiving system. It also adds encryption and decryption features. Data compression is handled at this layer.

* **Session Layer**: The inclusion of this layer enables maintaining sessions during browsing. This helps with implementing authentication, authorization, synchronization, and dialog control. Let us consider examples to appreciate the significance of the session layer.
  * Authentication: Once a user logs in, he should remain logged in until he logs out. Obtaining the status of a user's authentication happens at this layer.
  * Authorization: Access rights to specific parts of a website are given to super-users and admins. 
  * Dialog Control: Allows various systems running applications like WebEx to communicate. The challenge here is to send and receive data simultaneously, which is overcome by half-duplex or full-duplex protocols under the session layer. 
  * Synchronization: The digital experience relies on audio and video being synchronized. The session layer ensures the timestamps of the audio and video received are in the right order.    

  
* **Transport Layer:** The transport layer is the fourth layer in the OSI model and enables the following services
  * Reliability: This layer ensures that a packet sent is received without corruption. If not, the packet is resent. This may add a delay. But, it is suitable for applications where data integrity is a must.
  * Flow-Control: The rate of sending information is limited by the buffer size and the receiver capacity. The delays caused due to propagation, queueing, and transmission are taken into account by the flow-control algorithms.
  * Congestion Control: In routers, the entry of packets can be decided based on the current traffic.
  * Multiplexing and Demultiplexing: Until the transport layer, the ports do not play a major role. The ports can be thought of as multiple inputs to the same network channel. Transport Layer enables multiplexing of various application inputs. On the receiving end, the transport layer sends the packets to corresponding ports. This action is similar to that of a demux.

* **Network Layer**: The network layer is one of the most important layers. It enables many features such as
  * Address Assignment:  IP addresses are assigned to the host. There are two ways of assigning addresses: Static and Dynamic. Static addresses are assigned manually and do not change under any circumstances. Dynamic IP's, on the other hand, are assigned on an as-and-when-required basis. Dynamic setting
  * Routing: Selecting the route can be done manually or automatically. Today, most of it is automatic. There are two predominant algorithms used for routing: Distance Vector Routing and Link State Routing. 
  * Fragmentation: In the transport layer, there is a constraint on the maximum allowable size for data. Therefore, bits are segmented accordingly in the transport layer. Fragmentation is the same process applied to the segmented packets received from the transport layer. The aim is to accommodate datagrams received from the transport layer into frames. 
   
* **Data Link Layer**: The main responsibility of Data Link Layer(DLL) is ensuring Flow Control, Error Control, Access Control, Framing, and reading physical address. We will address each of the processes in detail:
  * Framing: The process of taking a packet from the above layer and adding a frame to the packet is called framing. The frame includes data such as the end of the packet, message length, etc to achieve accurate information at the receiving end. 
  * Flow Control: DLL restricts the size of the traffic and waits for the receiver to acknowledge the first batch of frames before sending the next batch.
  * Error Control: Due to long-distance transmission, sometimes the bits might get corrupted. The corruption of bits leads to poor service. Therefore, there are various approaches to handling data corruption.
    * Discarding the data corruption bits
    * Repairing the corrupted bits
  * There are various error correction algorithms like Cyclic Redundancy Check, Checksum, Parity Bits, etc. 

* **Physical Layer**: This layer deals with electrical, mechanical, functional, and procedural characteristics of physical links. Network topology comes under this layer. One prominent aspect of the physical layer is encoding. Encoding refers to the representation of data. The objective of encoding is to ensure maximum probability that the message is transmitted without any errors. There are different types of encoding available. They differ in the way the 0's and 1's are represented. Basic representation is -5V signal for 0 and +5V signal for 1. The probability of error is high, and therefore various other schemes are required. Let's review some of these visually. 
    * Manchester Encoding: ![Source: https://manikareahome.files.wordpress.com/](https://manikareahome.files.wordpress.com/2019/09/differential-manchester.png?w=1001)
    * NRZ Encoding: ![Source: https://manikareahome.files.wordpress.com/](https://manikareahome.files.wordpress.com/2019/09/nrz-i.png?w=1001)

### TCP/IP Model

The network of networks that we refer to as the internet is based on the TCP/IP model. Therefore, it is also referred to as the TCP/IP Protocol Suite. It is a four-layered architecture specifically built for the internet. Many of the layers that we see in the OSI Model are not available in the TCP/IP Model. The internet requires the following features:
  * Reliability
  * Security
  * Traffic Efficiency 
  
TCP/IP model uses TCP in the transport layer and IP in the network layer. The four layers of the network model are as follows.

* **Application Layer**: In the TCP/IP Model, the Application layer encompasses the first three layers in the OSI model, that is, Application layer, Presentation layer, and the Session Layer. 
* **Transport Layer**: This layer is the same as the one mentioned in the OSI model. Transmission Control Protocol (TCP) is used in this model. TCP ensures reliability and avoids the congestion in networks.
* **Network Layer**: Internet Protocol (IP) is used predominantly in this layer. Until recently, IPv4 was the most common protocol in use. It provided 32 bits for assigning addresses. It supported around 4.29 million unique devices. In the late 1990s, the number of devices overtook the 4 million mark, and therefore IPv6 was introduced. IPv6 is the protocol that allows 4.3 billion devices. It has 128 bits assigned for the network address. 
* **Network Interface**: It enables transmission of data. The layer corresponds to the data link layer and the physical layer in the OSI Model.

### Conclusion

In this article, we have succesfully understood the basic of networking and understood the basics of various networking models. We hope that more aspiring networking engineers are inspired to dive deep into the subject of computer networking.