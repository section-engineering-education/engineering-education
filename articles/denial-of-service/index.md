---
layout: engineering-education
status: publish
published: true
url: /engineering-education/denial-of-service/
title: What is a Denial of Service Attack?
description: A Denial of Service attack is a cyber-attack in which the perpetrator seeks to make a machine or network and resource unavailable to its intended users by temporarily or indefinitely disrupting services to the host connected to the Internet.
author: richu-thomas
date: 2020-06-15T00:00:00-07:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/denial-of-service/hero.jpg
    alt: stop sign example denial of service
---
A Denial of Service (DoS) attack is a type of cyber attack which achieves their goal by flooding a stream of packets to the victim that swamps his/her network or processing capacity, denying access to the legitimate user. Ultimately, it can cost both time and money because its resources and services are inaccessible.

<!--more-->
Anything that can overload the available resources, or cause an application to crash, and then impacts availability is a Denial of Service. This article will mainly focus on network-based Denial of Service attacks, but it is worth noting that there are other types of DoS attacks, such as [ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS).

### Common types of DoS attacks
- [Smurf Attack](https://usa.kaspersky.com/resource-center/definitions/what-is-a-smurf-attack) - An assault on a network that floods it with excessive messages in order to impede normal traffic. It is accomplished by sending ping requests (ICMP echo requests) to a broadcast address on the target network or an intermediate network. The return address is spoofed to the victim's address. Since a broadcast address is picked up by all nodes on the subnet, it functions like an amplifier, generating hundreds of responses from one request and eventually causing a traffic overload.
- [SYN Flood Attack](https://www.cloudflare.com/learning/ddos/syn-flood-ddos-attack/) - It is a type of TCP State-Exhaustion Attack  that attempts to consume the connection state tables present in many infrastructure components, such as load balancers, firewalls, Intrusion Prevention Systems (IPS), and the application servers themselves. This type of attack can take down even high-capacity devices capable of maintaining millions of connections.
- [UDP Flood Attack](https://www.cloudflare.com/learning/ddos/udp-flood-ddos-attack/) - Large number of User Datagram Protocol (UDP) packets are sent to a targeted server with the aim of overwhelming that device’s ability to process and respond. The firewall protecting the targeted server can also become exhausted as a result of UDP flooding, resulting in a denial-of-service to legitimate traffic.
- Plashing - It is done by causing permanent damage to the system hardware by sending fraudulent updates to the hardware, thereby making them completely unusable. The only solution is to re-install the hardware.
- [IP Fragmentation Attack](https://www.netscout.com/what-is-ddos/ip-icmp-fragmentation) - It fights against the reassembling ability of the target. Numerous fragmented packets are sent to the target, making it difficult for the target to reassemble them; thereby, denying access to valid clients.

### How do you avoid being part of the problem?
While there is no way to completely avoid becoming a target of a DoS attack, proactive steps can be taken to reduce the effects of an attack on the network.

- **Contact your hosting provider, cloud provider, or internet service provider (ISP)** - If you find that your website or network is under attack, you should notify your provider as soon as possible to determine if your traffic can be rerouted. Having a backup ISP is a good idea too. Also, consider services that can disperse the massive DoS traffic among a network of servers. That can help render an attack ineffective.
- **Investigate black hole routing** - Providers can use “black hole routing” to direct excessive traffic into a null route, sometimes referred to as a black hole. This can help prevent the targeted website or network from crashing. The drawback is that both legitimate and illegitimate traffic is rerouted in the same way.
- **Leverage a scrubbing service** - For more granular control than just black-holing, a [scrubbing service](https://security.radware.com/ddos-knowledge-center/ddospedia/scrubbing-center/) is another option.
- **Configure firewalls and routers** - Firewalls and routers should be configured to reject bogus traffic. Remember to keep your routers and firewalls updated with the latest security patches.
- **Consider front-end hardware** - Application front-end hardware that’s integrated into the network before traffic reaches a server can help analyze and screen data packets. The hardware classifies the data as a priority, regular, or dangerous as they enter a system. It can also help block threatening data.

### How do you know if an attack is happening?
- Unusually slow network performance
- Unavailability of a particular website
- An inability to access any website

### Additional Resources
- [Denial of Service Attacks](https://s2.ist.psu.edu/paper/DDoS-Chap-Gu-June-07.pdf) by Qijun Gu and Peng Liu

- [Distributed Denial of Service](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
