In networking the terms "Switches", "Hubs", and "Routers" are sometimes used interchangeably and this is wrong. Despite them being similar, there are differences in how they handle data. These three components may be integrated into a single device making it hard for a student to distinguish between them.

In this article, we are going to discuss each device and their functionalities in a network.

### Switch
A switch is a multicast networking device that works under the Datalink layer of the OSI model and connects a bunch of computers or devices in a network.

### Advantages of using a Switch
- It is secure since it delivers data to the specified node.
- Lowers the chances of frame collisions domains.
- It increases the bandwidth in a network.
- It increases the number of ports needed to connect the nodes available in a network.
- It operates under full-duplex.

### Disadvantages of using Switches
- They are more expensive compared to hubs and other devices used in a network.
-  To deal with multicast parcels, proper planning is required.
- It can raise problems in broadcast traffic.

### Hub
Hub is a simple and cheap networking device that works under the physical layer of the OSI model and connects a bunch of computers in a Local Area Network(LAN). (It does lots of wastage of bandwidth). A hub is considered less intelligent because it does not filter data and does not know where the data is to be sent.

All information sent to a hub is automatically sent to all ports of the devices connected to it.
 
### Advantages of using hubs
 - Ability to connect to the network using different physical media.
 - They can be used to increase the network distance.
 - Hubs are relatively cheap compared to switches and other devices in the network.

### Disadvantages of using hubs
- It increases the chances of collision domains between packets when being transferred from one device to another.
- Hubs operate under half-duplex that's only one occasion of data transmission at a time.
- Hubs share data to all the devices in a network thus insecure.
- Hubs does lots of wastage of bandwidth when transmitting data.

### Switch Vs Hub
Hub is a broadcast device that sends data from one node to all but Switch is a multicast device that can send data to a particular node you want.

### Router
A router is a networking device that operates under the network layer of the OSI model and is used to connect two or more different networks. It is a device that establishes a common link between networks to set up data flow between them. 

### Advantages of Routers
- With the aid of dynamic routing algorithms, it has the ability to choose the best path in the internetwork.
- It creates collision domains to reduce network traffic.
- It provides connections between network architectures.

### Disadvantages of Routers 
- They are expensive compared to other devices in a network.
- They need to analyze data making them slower.
- Low bandwidth because of dynamic router communication.

Let's look at the differences of each of them:

### Layer of each component in the OSI model
The [OSI Model](https://www.imperva.com/learn/application-security/osi-model/) (Open Systems Interconnection Model) is a 7 layer model that is used to describe in a pictorial way how computer systems communicate. Switch, Router, and Hub each operate on a different layer.

#### Switch
A switch is located on the OSI model's Data Link layer i.e the second layer. The link layer is specific to the medium over which the packet is traveling such as Ethernet and the Mac Address are part of this layer.

#### Router
A router works in the Network Layer of the OSI model and it is the third layer.

#### Hub
Hub works in the Physical Layer of the OSI model and it is the first layer.

### Function of each Device
#### Switch
It allows various connections of many devices in the same network and the management of port and VLAN security settings.

#### Router
Its major purpose is to connect many types of networks at the same time using adaptive and non-adaptive routing. 

#### hub
Hub is a simple and cheap networking device that allows a bunch of computers to be connected to a single network 

### Application of each Device
#### Switch
It is commonly used in local area networks for connecting many nodes.

#### Souter
It is commonly used in Local Area Network and Metropolitan Area Network(MAN).

#### hub
It is similar to Switch because it is used in the local area network(LAN).

### Mode of data transmission
It defines the direction in which data flow between two communicating devices. There are three types of transmission modes. Read this [documentation](https://afteracademy.com/blog/what-are-the-data-transmission-modes-in-a-network) for more information on the Mode of data transmission

#### Switch
It supports full-duplex transmission thus a bunch of computers can send data at the same time.

#### Router
It supports full-duplex transmission thus a bunch of computers can send data at the same time.

#### Hub
It supports half duplex in transmission thus only one node can send data at a time.

### Adresses used in each devives
#### Switch
Switch stores and uses the MAC address of a device to transfer data.

#### Router
A router uses the IP address to transfer data between networks.

#### Hub
Hub does not store any MAC/IP address to transfer data.

### Transmission of Data
#### Switch
Switch transmit data from one device to another in form of [frames](https://en.wikipedia.org/wiki/Frame_(networking)).

#### Router 
The router transmits data from one network to another in form of [packets](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/).

#### Hub
Hub transmits data from one device to another in form of binary bits.

