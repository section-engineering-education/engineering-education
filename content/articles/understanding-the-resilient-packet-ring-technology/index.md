### Table of contents

[Introduction](#introduction)

[Basics of Resilient Packet Ring](#basics-of-resilient-packet-ring)

[Adopted types of Transmission Media](#adopted-types-of-transmission-media)

[Application of Packet Ring Technology](#application-of-packet-ring-technology)

[Limitations related to Resilient Packet Ring](#limitations-related-to-resilient-packet-ring)

[Conclusion](#conclusion)

### Introduction

RPR is standardized by IEEE 802.17 and is a protocol for the transmission of data through fiber-optic ring networks. It works in the MAC layer of the OSI model. It is packet-based and is built on creating efficiency of IP services and ethernet.

With the deployment of resilient packet rings, the network has better utilization of bandwidth, throughput, higher deployment speed, optimization of operational cost and equipment. RPR was developed because the traditional ethernet lacks the capability to handle or offer business-class reliability. Also, it lacks the capacity to deal with latency adequately and quality of services for voice packets.  

### Basics of Resilient Packet Ring

A resilient Packet ring station is established where fiber installation is done in a ringway. It has developed from Ethernet and SONET that were previously installed. It is generally a media access control packet that helps in numerical multiplexing over spatial reuse infrastructure. The spatial reuse infrastructure allows continued utilization of freed space to maximize the traffic being carried across. It meets the packet-based metropolitan area network requirements. 

Nodes are used for effective bandwidth communication through wrapping and steering. During steering, in case of nodes damage, traffic is directed to the last node before the damaged one. If any of the lines breaks the ring is changed so that either of the rings becomes a return node. This way, the architecture has a shorter recovery time and hence less downtime.    

### Adopted types of Transmission Media

Media Access Control panels are the hardware required for interaction with wireless or wired transmission medium. It has a logical link control associated with the data link layer that offers control of the flow and multiplexing of the medium of transmission. During data transfers, MAC captures frames adding synchronization for effective transmission. A code for error detection is then added to the frame. MAC also compensates collisions through re originating transmission after detection of a jam signal. It ensures data integrity is maintained through the verification of the sequence for the sender’s frame check.

#### Traffic queues and Class of Service in Resilience Packet Ring 

The traffic present in this technology is associated with Class of Service, which is categorized into classes A, B, and C. They signify high, medium, and low traffic simultaneously. Class A is a virtual circuit bandwidth that offers support to low latency applications such as video. Class B is a combination of the bandwidth for the virtual circuit as well as the intensity of the burst that is higher than the CIR. Class C is the most effective effort traffic that is highly flexible as it integrates any available bandwidth supporting the access traffic of the internet.  

### Application of Packet Ring Technology

RPR is commonly used in national SONET, metropolitan, and ethernet carrier networks. This architecture is normally incorporated into the SONET networks so that they can gain the ability to transfer packets. This is because, the technology, RPR, offers the network statistical multiplexing that is fault-tolerant. 

#### Fault Tolerance in RPR

To achieve this level of fault tolerance, a resilient packet ring employs the use of two counter-rotating rings. Both of these rings are connected by fiber forming a ring topology. The nodes forming the RPR on the other hand both transmit packets in opposing directions. The two nodes, that is inner and outer rings, function simultaneously and in the event, one fails only the capacity of traffic transferred is decreased but there is no unavailability. 


### Limitations related to Resilient Packet Ring

The major limitation of RPR was the inability to support spatial reuse for frame transmission from or to media access control addresses which is not available in ring topologies. This was however fixed using a spatially-aware sublayer commonly known as SAS. This technology provides a way to reuse frame transmissions from or to media access control addresses not available in ring topologies. 

### Conclusion 

RPR technology aims at providing users with smart metro technology that offers traditional time-division multiplexing. In addition to that, it offers a new packet-data service. Both of these features come at very high efficiencies. It can be summarized as protocol (data-link) for layer two which offers media access control for packets that are delivered using ring topology.

The Resilient Packet Ring technology is complimentary of various Layer 1 technologies such as SONET. It operates at Layer 2 and can function over Ethernet or SONET. It helps service providers to ensure scalability and have efficient metro networks while using physical layers such as Ethernet. It is easy to integrate this technology with the other existing technologies. This powers it into offering a significantly-based approach, building metro networks that are efficient.   

### Relevant Sources

- [RPR](https://www.pcmag.com/encyclopedia/term/rpr)
- [Resilient Packet Ring basics](https://www.networkworld.com/article/2339177/resilient-packet-ring-basics.html)
- [Resilient Packet Ring (RPR) - IEEE 802.17](https://www.tutorialspoint.com/resilient-packet-ring-rpr-ieee-802-17)
