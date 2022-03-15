---
layout: engineering-education
status: publish
published: true
url: /computer-net-service/
title: Understanding computer network services
description: This article introduces the reader to the concept of computer network services.
author: leroy-gor
date: 2022-02-17T00:00:00-06:31
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/computer-net-service/hero.jpg
    alt: computer network service  image
---
A network is an interconnection of computers that share resources. The network is made up of client and server computers. These networks provide certain services vital to the normal flow of information on the internet.
<!--more-->
The network services are operands in the network provided by a server requested by the client computers. The application runs at the network application layer and above and includes the following:

- IP addressing
- Domain Name System (DNS)
- Internet access
- Security products (firewalls)
- Primary domain service
- Web content filtering
- VPN termination
- Intrusion prevention systems (IPS)

A server component for each service is usually run on one or more computers. These servers are accessed through a group of client computers on the network.

These clients and servers are not only coupled with hardware usage but also user interfaces for human-computer interactions.

### Table of contents
- [Table of contents](#table-of-contents)
- [Basic network design requirements](#basic-network-design-requirements)
  - [1. Security](#1-security)
  - [2. Scalability](#2scalability)
  - [3. Redundancy / Fault tolerance](#3-redundancy--fault-tolerance)
  - [4. Quality of Services (QoS)](#4-quality-of-services-qos)
- [Scaling a Network](#scaling-a-network)
- [Network services and their functions.](#network-services-and-their-functions)
  - [1. Print service (Print Server)](#1-print-service-print-server)
  - [2. DHCP Service (DHCP Server)](#2-dhcp-service-dhcp-server)
  - [3. File  Service (File Server)](#3-file--service-file-server)
  - [4. Web Services (Web Server)](#4-web-services-web-server)
  - [5. Mail Service (Mail Server)](#5-mail-service-mail-server)
  - [6. DNS Server Service (DNS Server)](#6-dns-server-service-dns-server)
  - [7. Authentication Service (Domain Controller)](#7-authentication-service-domain-controller)
  - [8. Routing service](#8-routing-service)
- [Automation of Network Services](#automation-of-network-services)
- [Network service configurations](#network-service-configurations)
- [Conclusion](#conclusion)

### Basic network design requirements
#### 1. Security
Security can be achieved through network authentication and authorization encryption on network communications, i.e. restricting access to only authorized users.

This ensures confidentiality, integrity, and accountability of data vital in a network. A breach in security may lead to consequences such as:

- Loss of valuable data
- Lawsuit
- Soiled reputation
- Loss of clientele
- Financial loss
- Loss of operational permits
- Interruption of services, et cetera

#### 2.Scalability
Scalability is the ability of a network to accommodate increasing streams of data traffic and an additional number of users without degrading performance.

It can be achieved through:

- High capability devices
- Proper configuration
- High bandwidth media
- Choice of topology

#### 3. Redundancy / Fault tolerance
This is the ability to withstand a hostile set of conditions and continue  operation, that is, recover from a catastrophic network failure within the shortest possible time i.e., Mean Time Between Failure (MTBF) and Mean Time To Repair (MTTR).

It can be achieved through:

- Network monitoring
- Services clustering
- RAID (Redundant Array of Independent Disks)

#### 4. Quality of Services (QoS)
Quality of service is a metric measuring the original product's distribution level regarding the quality of the transmitted data despite the distance.

It can be achieved through data prioritization for devices with the capability.

### Scaling a Network
As highlighted above, scaling a network generally involves growing to cope with current demands and meet future needs in a planned, graceful way.

The following are some of the ways tasked with ensuring that a network is scalable:

1. Identify the current and future requirements of the network in question. If guaranteed, with its data-driven quality, cost optimization, and network performance efficiency

   - Evaluate the amount of internet connection required by the devices.
   - Calculate bandwidth requirements using monitoring tools.
   - Factor other hardware considerations, e.g. physical space and electrical power consumption.
   - Troubleshoot network issues and security problems regularly using [MSP](https://searchitchannel.techtarget.com/definition/MSP-platform).

2. Always ensure to have an adequate tool for network management and continuously consult with MSP about implementing better network management techniques.

3. Lease networking infrastructure to spread the cost of using machines over time.

4. Scale out instead of up.

### Network services and their functions
#### 1.Print service (Print Server)
Handles printing jobs sent from different computers that are connected to a network.

It implements the master-slave architecture because only one machine is set up as the server while the rest send printing requests.

Therefore, setting up a shared printer in a network involves installing Network Operating Systems and enabling the Printer server service. This process allows users on the network to print from or send their work to a shared printer.

This service is key in that it:

1. Enable users to share printing services in the organization
2. Enable centralizing of printing services in a network
3. Enables control of printing resources

#### 2.DHCP Service (DHCP Server)
Internet service providers commonly use network administration teams and wireless routers in the automatic assignment of IP Addresses to computers in a network.

This service is key as follows:

1. Automating the configuration of IP addresses on network devices
2. Primarily designed to lower the overhead of configuring IP addresses. A DHCP server service is enabled, and a scope (Range of IP addresses) is defined from which the DHCP server can issue to requesting devices
3. Servers and router interfaces should be configured with static IP addresses
4. Computers configured to be DHCP clients will request the DHCP server at boot time

#### 3. File  Service (File Server)
Files are exchanged between clients and servers using FTP protocol hence ensuring communication.

This ensures the following:

1. Centralizing files and documents needed by users.
2. The primary goal is to centralize and control access to vital documents in addition to enforcing.
3. Security through access or attempted access monitoring.
4. Enable sharing of files among multiple users on a network.

#### 4. Web Services (Web Server)
Web servers are responsible for providing clients with all the resources they need. These resources are accessed using the [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) and is commonly referred to as `HTTP`.

It adds extra security through authentication and encryption using the secure socket layer. Therefore, this service is key because it enables the hosting of websites and controls access to web services.

#### 5.Mail Service (Mail Server)
1. Configured and enabled in a computer already running Network Operating System.
2. The messaging software is installed, and within the message software, a mailbox is configured for each user.
3. The configured mailboxes store a user's emails received from other users.
4. Enables exchanging of emails between users in an organization.
5. Enhances the efficiency and effectiveness of communication in the network.

#### 6.DNS Server Service (DNS Server)
DNS is the method by which computers translate domain names into IP addresses that are much easier for people to remember than the numeric IP addresses for the server.

DNS is key as follows:

1. Maps device names to IP addresses in a network.
2. Allows users to access network resources by specific names.
3. After computers have booted and assigned IP addresses, they usually register with the DNS server by sending their hostnames and their IP address to the DNS server (i.e. if the computer has been assigned the IP of the DNS server).
4. When users on a network fail to access resources on a network when they specify a name, it may point to an underlying DNS server problem.

#### 7. Authentication  Service (Domain Controller)

1. Authenticates users who attempt to gain access to the network.
2. Secures the network from unauthorized users.
3. In a windows network, an active directory is installed on a computer already running a network operating system to make it a server.
4. User and computer accounts are then created in the active directory of the domain controller-users whose accounts are in the active directory and can log onto the network using any computer member of the domain.

#### 8. Routing service

1. This can be used in place of routers.
2. It allows a server with two network interface cards to route data between networks or between a network (private) and the internet.
3. Based on the manner of segmentation, different IP addresses are assigned to the two [network interface cards](https://www.tutorialspoint.com/what-is-network-interface-card-nic) on the network.

### Automation of Network Services
It is an approach to manage network services and resources, that is, automating configuration, testing, maintenance, provision, management, and operation of a network and its' devices, both virtual and physical.

This is beneficial to organizations in the following instances;
The probability of errors is reduced, i.e. errors due to negligence and oversight from complex network processes are reduced.

- Improved operational efficiency. Automation of the network reduces task time compared to manual operation, improving efficiency.
- Operational expenses are reduced. Reduction in operating time, errors, and improved efficiency makes the network fast and agile and, as a result, reduces operational costs.

### Network service configurations
This involves assigning network settings to enhance organizational communication over a network.

This is achieved through the following steps by step approaches:

1. `Click System` then select `Network` followed by `overview` to display the configuration menu.
2. Proceed to the configuration as per the below directives
3. Save your changes.

| The Settings  |  The configuration Guidelines  |
| -----------   | ----------- |
| Status        | Show all the interface statistics for all the required ports   |
| Hostname      | Select a good and descriptive hostname with characters not exceeding 30.|
| Primary DNS   | Indicate primary DNS server IP address.|
| Secondary DNS | Indicate primary DNS server IP address.|
| DNS Domain| Indicate a list of default domains. Use commas to separate the domains|
| Preferred DNS Response| This indicates the preferred requests and responses by the DNS.  Pick ‘V4’ if only IPv4 is needed. Select ‘Both’ if both IPv4 and IPv6 are needed.
| Bandwidth management | This is used for bandwidth management only.|
| Maximum Bandwidth| It Specifies the maximum bandwidth for all traffic in the network.|
| Tunnels Maximum | It Specifies the maximum bandwidth for traffic in the VPN. |
| Bandwidth | The total maximum bandwidth must be higher than the value of VPN  maximum bandwidth. |

### Conclusion
Computer network services are the core of the internet. All the services that a user can achieve from the internet are based on computer network services and data communication.

Therefore, it is incumbent that more research and learning be done in line with the question at hand.

Happy Reading!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
