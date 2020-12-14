---
layout: engineering-education
status: publish
published: true
url: /engineering-education/iot-deployments-with-sd-wan/
title: IoT Deployments with SD-WAN
description: This article will discuss how SD-WAN ensures successful IoT deployments and how it compares to the traditional wide area network (WAN).
author: eric-kahuha
date: 2020-12-14T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/iot-deployments-with-sd-wan/hero.jpg
    alt: IoT Deployments with SD-WAN example image
---
The introduction of SD-WAN changed how a [wide area network](/engineering-education/network-types-topologies/) is managed and deployed. This technology has evolved together with the internet of things (IoT) to become two widely accepted technologies globally. IoT introduces the power of the internet, data analytics, and data processing to the real world of physical devices.
<!--more-->
However, various challenges hold the IoT back, including inadequate network resources, security, and lack of interoperability in IoT devices. SD-WAN comes to solve some of the primary issues that IoT is facing.

This article will discuss how SD-WAN ensures successful IoT deployments and how it compares to the traditional wide area network (WAN).

### Keywords
- *Overlay network (SDN overlay)* - a telecommunications network layered on another network.
- *Tunneling technology* - a technology that allows a network to send its information through another network's connections.
- *Multiprotocol Label Switching* ([MPLS](https://www.forcepoint.com/cyber-edu/mpls-multiprotocol-label-switching#)) - a data forwarding technology that monitors and boosts network traffic flow.
- *Data packet* - data is broken down into similar data structures, known as data packets, before transmission.
- *End-to-end encryption* (E2EE) – a communication mechanism that only allows the communicating parties to access and read messages.
- *Virtual private network* ([VPN]((https://en.wikipedia.org/wiki/Virtual_private_network))) – a technology that creates a private network from a public internet connection to guarantee the anonymity and privacy of users.
- *Firewalls* - systems designed to block unauthorized access to a private network.
- *Decouple* - systems that transact without being connected.
- *Secure Sockets Layer* (SSL) - a security protocol that creates an encrypted and authenticated link between a server and a client for example, a mail client and a mail server.
- *Zero-touch provisioning* (ZTP) - a switch feature that allows automatic device configuration and provisioning.

### What is SD-WAN?
A Software-Defined Wide Area Network (SD-WAN) is a software-driven technology that relies on a centralized control function to control WAN traffic securely. SD-WAN helps improve overall user experience and application performance. As a result, organizations benefit from increased agility, business productivity, and lower information technology costs.

SD-WAN solutions are deployed as overlay networks to existing networks, that eases adoption and integration eventually. Overlay networks are computer networks that are layered on top of other networks. In this case, [tunneling technology](https://www.webopedia.com/TERM/T/tunneling.html) is used to differentiate the logical network from the physical network. SD-WAN relies on this tunneling technology to move data between networks.

SD-WAN combines traditional WAN technologies, including [broadband connections](https://www.nfon.com/en/service/knowledge-base/knowledge-base-detail/broadband-internet-connection) and Multi-Protocol Label Switching (MPLS), to bring a better experience to wide-area networking. It enables organizations to route traffic to multiple offices and remote locations besides providing enhanced capabilities for managing and monitoring network traffic. 

Organizations use SD-WAN to connect all their departments or offices to a central network in the cloud to increase flexibility and control. SD-WAN reduces networking expenses by measuring the traffic and selecting the most efficient route for every [data packet](https://www.techopedia.com/definition/6751/data-packet#) in real-time.

### Comparing SD-WAN and traditional WAN
SD-WAN's provision of end-to-end encryption (E2EE) over a virtual private network (VPN) guarantees data traffic security. With this technology, organizations can integrate and implement additional security layers like [firewalls](https://kb.iu.edu/d/aoru#) for unified threat management.

Traditional WAN also guarantees security in various ways. For example, it sends private packets over MPLS connections to allow site-to-site secure communication. These private packets are only accessible to the destined MLPS connection.

Changes to traditional WAN are done manually. Manual work is tedious, takes longer, and may decrease growing businesses' efficiency, particularly those adding branch offices. With SD-WAN, IT teams do not need to manage devices manually. 

This is because the network control plane is software-based, unlike in traditional WAN, where it is hardware-based. SD-WAN's functions are programmable, allowing automation of most WAN management tasks.

Traditional WAN is based on conventional routers. These routers are not made for the cloud. Performing tasks such as applying advanced security inspection require you to backhaul all traffic, including traffic destined for the cloud, from branch offices to headquarters or a hub data center. This [backhaul](https://manuals.gfi.com/en/exinda/help/content/exos/common-use-cases/backhaul-traffic.htm#) causes delays and reduces application performance, leading to lost productivity and poor user experience.

The SD-WAN model very different from the traditional router-centric WAN architecture. SD-WAN fully supports applications hosted on private or private clouds, SaaS services, and on-premise data centers. Applications supported by SD-WAN show the highest level of performance.

### SD-WAN as IoT enabler
#### Network resources
IoT devices depend on network resources to run smoothly. Inadequate network resources would strain to run IoT devices and lead to performance issues. Not all networks available today can support advanced internet of things deployments.

SD-WAN is a state-of-the-art methodology that has proven useful in wide-area networking. It [decouples](https://www.webopedia.com/TERM/D/decoupled.html#) networking hardware from its control mechanism.

SD-WAN provides real-time stability and visibility, instrumental in controlling IoT devices over a global network. It centralizes access such that network administrators manage all the connected endpoints from a single location. Thus, simplifying traffic management and reducing network outages in a network.

#### Minimized IoT security risks
Connecting IoT devices to the internet exposes the devices to potential security vulnerabilities. Users have reported incidences where IoT devices are used as the entry point to attack and penetrate a sensitive network.

Despite operating on tight budgets and limited resources, IT teams are expected to extend enterprise-class security to remote areas. They must also protect systems and ensure end-to-end security for IoT systems.

SD-WAN comes in handy to help IT teams manage threats by performing a wide range of security functions. These include security information management, Secure Sockets Layer (SSL) and intrusion detection, and web/app filtering. SD-WAN integrates well with firewalls, anti-virus, anti-spyware, and anti-malware software.

SD-WAN's security zoning capabilities allow organizations to segment the network and ensure IoT assets' isolation from attacks.

#### Interoperability in IoT devices
SD-WAN offers zero-touch provisioning ([ZTP](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/zero-touch-provision.html#)) feature, that simplifies and automates the management of functions and device connections. With this feature, you can configure and control a networking appliance remotely. You can even assign an on-site employee (even those without IT skills) to install and power up a replacement or new device physically.

Since SD-WAN is a cloud-managed service, you can leverage this to simplify IoT deployments even further. IT teams do not need to manage and maintain their own centralized SD-WAN data centers with this feature.

Organizations benefit from fast time-to-execution for initial installations and future upgrades because they can do this at a web-scale and low cost.

### Conclusion
SD-WAN solution enables organizations to exploit the IoT full potential without introducing unnecessary costs, risks, and complexity. It simplifies network architecture and better equips an organization to scale its IoT deployments securely and quickly.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

