---
layout: engineering-education
status: publish
published: false
url: /engineering-education/let's-learn-about-osi-layer-model/
title: Let's learn about OSI Layer Model
description: In this article we will look at OSI layer model and know how it works.
author: aju-tamang
date: 2020-11-25T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/linear-discriminant-analysis/hero.jpg
    alt: OSI Networking
---

OSI is a reference model that describes how information from a software app in one computer moves through a physical medium to the software application in another computer. It has served as the most basic element of computer networking since its inception in 1984. The OSI Reference Model is based on a proposal developed by the International Standards Organization (ISO). The OSI reference model's purpose is to guide vendors and developers so the digital communication products and software programs they create will interoperate and facilitate clear comparisons among communications tools.

### Advantages of the OSI Model
The OSI model helps users and operators of computer networks:
- Determine the required hardware and software to build their network.
- Understand and communicate the process followed by components communicating across a network. 
- Perform troubleshooting by identifying which network layer is causing an issue and focusing efforts on that layer.

The OSI model helps network device manufacturers and networking software vendors:
- Create devices and software that can communicate with products from any other vendor, allowing open interoperability.
- Define which parts of the network their products should work with.
- Communicate to users at which network layers their product operates 

### Characteristics of OSI Model:

OSI consists of several layers, and each layer performs a particular network function. It's divided into two layers: upper layers and lower layers.

The OSI model's upper layer mainly deals with application-related issues, and they are implemented only in the software. The application layer is closest to the end-user. Both the end-user and the application layer interact with the software applications. An upper layer refers to the layer just above another layer.

The lower layer of the OSI model deals with data transport issues. The data link layer and the physical layer are implemented in hardware and software. The physical layer is the lowest layer of the OSI model and is closest to the physical medium. The physical layer is mainly responsible for placing the information on the physical medium.

OSI follows a vertical approach. ”If you can understand the OSI model and its layers, you can also then understand which protocols and devices can interoperate with each other when new technologies are developed and explained.

- A layer should only be created where definite levels of abstraction are needed.
- The function of each layer should be selected as per the internationally standardized protocols.
- The number of layers should be large so that separate functions should not be put in the same layer. At the same time, it should be small enough so that architecture doesn't become very complicated.
- In the OSI model, each layer relies on the next lower layer to perform primitive functions. Every level should able to provide services to the next higher layer.
- Changes made in one layer should not need changes in other lavers.
 
The model uses layers to help give a visual description of what is going on with a particular networking system. This can help network managers narrow. 

### Functions of the OSI Layers
There are seven OSI layers. Each layer has different functions. Each layer is assigned a particular task. OSI model divides the whole task into seven smaller and manageable tasks.  Each layer is self-contained so that tasks assigned to each layer can be performed independently. A list of seven layers are given below:
- Physical Layer
- Data-Link Layer
- Network Layer
- Transport Layer
- Session Layer
- Presentation Layer
- Application Layer

#### Physical layer
The physical layer's main function is to transmit the individual bits from one node to another node.
- It is the lowest layer of the OSI model, establishes, maintains, and deactivates the physical connection.
- It specifies the mechanical, electrical, and procedural network interface specifications.

##### Functions of a Physical layer:
- Line Configuration: It defines the way how two or more devices can be connected physically.
- Data Transmission: It defines the transmission mode, whether it is simplex, half-duplex, or full-duplex mode between the two devices on the network.
- Topology: It defines the way how network devices are arranged.
- Signals: It determines the type of signal used for transmitting the information.

#### Data-Link Layer
- It defines the format of the data on the network.
This layer is responsible for the reliable transfer of data frames from one node to another connected by the physical layer.
- It provides reliable and efficient communication between two or more devices and mainly responsible for the unique identification of each device that resides on a local network.

##### Functions of the Data-link layer
- Framing: The data link layer translates the physical's raw bitstream into packets known as Frames. The Data link layer adds the header and trailer to the frame. The header which is added to the frame contains the hardware destination and source address.
- Physical Addressing: The Data link layer adds a header to the frame that contains a destination address. The frame is transmitted to the destination address mentioned in the header.
- Flow Control: Flow control is the main functionality of the - Data-link layer. It is the technique through which the constant data rate is maintained on both sides so that no data get corrupted. It ensures that the transmitting station, such as a server with a higher processing speed, does not exceed the receiving station with a lower processing speed.
- Error Control: Error control is achieved by adding a calculated value CRC (Cyclic Redundancy Check) placed to the Data link layer's trailer, which is added to the message frame before it is sent to the physical layer. If any error seems to occur, then the receiver sends the acknowledgment for the corrupted frames' retransmission.
- Access Control: When two or more devices are connected to the same communication channel, then the data link layer protocols are used to determine which device has control over the link at a given time.

#### Network Layer
- It is a third layer that manages device addressing, tracks the location of devices on the network.
- It manages the delivery of individual data packets from source to destination through appropriate addressing and routing.
It determines the best path to move data from source to destination based on the network conditions, service priority, and other factors.
- The Data link layer is responsible for routing and forwarding the packets.
- Routers are layer 3 devices. They are specified in this layer and used to provide the routing services within an internetwork.
- The protocols used to route the network traffic are known as Network layer protocols. Examples of protocols are IP and Ipv6.

##### Functions of Network Layer:
- Internetworking: An internetworking is the main responsibility of the network layer. It provides a logical connection between different devices.
- Addressing: A Network layer adds the source and destination address to the header of the frame. Addressing is used to identify the device on the internet.
- Routing: Routing is the major component of the network layer, and it determines the best optimal path out of the multiple paths from source to destination.
- Packetizing: A Network Layer receives the packets from the upper layer and converts them into packets. This process is known as Packetizing. It is achieved by internet protocol (IP).

#### Transport Layer
- It transmits data using transmission protocols, including TCP and UDP. 
- The transport layer takes data transferred in the session layer and breaks it into “segments” on the transmitting end. 
- It's also responsible for reassembling the segments on the receiving end, turning them back into data that can be used by the session layer


#### Session Layer
When two devices, computers, or servers need to “speak” with one another, a session needs to be created, and this is done at the Session Layer. 
- It creates communication channels called sessions between nodes. 
- It also set checkpoints during a data transfer—if the session is interrupted, devices can resume data transfer from the last checkpoint.  
- It maintains connections and responsible for controlling ports and sessions.

#### Presentation Layer
The Presentation Layer represents the area that is independent of data representation at the application layer. 
- It represents the preparation or translation of application format to network format or from network formatting to application format. In other words, the layer “presents” data for the application or the network. It ensures that data is in a usable format and is where data encryption occurs.

##### The function of Presentation Layers:
- Character code translation from ASCII to EBCDIC.
- Data compression: This reduces the number of bits that need to be transmitted on the network.
- Data encryption: Helps you to encrypt data for security purposes — for example, password encryption.
- It provides a user interface and support for services like email and file transfer.


### Application Layer

- The application layer interacts with an application program that is closest to the end-user. 
- It allows users to interact with other software applications. 
- The application layer interacts with software applications to implement a communicating component. 

##### The function of the Application Layers are:
- Application-layer helps you to identify communication partners, determining resource availability, and synchronizing communication.
- It allows users to log on to a remote host and provides various e-mail services.
- This application offers distributed database sources and access to global information about various objects and service
 
Quick Way to memorize the OSI Model Layer concept - A Penguin Said That Nobody Drinks Pepsi

 

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
