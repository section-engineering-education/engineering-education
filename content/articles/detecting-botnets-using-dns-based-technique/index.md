---
layout: engineering-education
status: publish
published: true
url: /detecting-botnets-using-dns-based-technique/
title: Dectecting Botnets Using DNS-Based Technique
description: In this article we will explore the DNS-based technique for detecting botnets. 
author: paul-muriku
date: 2021-03-15T00:00:00-16:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/detecting-botnets-using-dns-based-technique/hero.png
    alt: dns technique image example
---
Over the past few years, many people and organizations have embraced the use of networking technologies to enhance data sharing and communication. Data sharing has come with its security challenges. Data security challenges have been and ongoing issue largely in part by botnets, which are used by cybercriminals to instigate various attacks. 
<!--more-->
This article will go over the DNS-based approaches for detecting botnets and will explain why these approaches are widely used. We will also provides real-life examples of DNS-based tools.

### What is a botnet?
We can define a botnet as a group of computers or digital devices that are infected with malware to enable hackers to control them. Botnets are used by cybercriminals to instigate attacks such as unauthorized access of information, data theft, credentials leak, and DDoS attacks. To mitigate such security threats, one should be able to identify attacks in a network.

Botnets conceal their malicious activities and avoid detection using some internet protocols. In the recent past, hackers have abused multiple protocols, whilst DNS has become the central target of cyberattacks. 

Such an attack is the advanced persistent threat (APT), which is an attack where an intruder gains long-term presence in a network to access sensitive data. In most cases, experienced botnet developers avoid using domain names. Instead, they have successfully set up P2P botnets.

The DNS system is used by such botnets to support their command and control infrastructure. Using domain generation algorithms (DGAs) in botnet malware has risen in the past few years. This has compounded the difficulty in the detection of botnets partially because of the easiness of developing and administrating botnets based on DNS.

The following diagram shows the structure of a botnet. 

![Botnet Structure](/engineering-education/detecting-botnets-using-dns-based-technique/botnet-structure.png)

[Image Source: EC-Council-BLOG](https://blog.eccouncil.org/wp-content/uploads/2018/12/the-structure-of-a-botnet.png)

### Why DNS-Based techniques are widely used in the detection of botnets
The DNS-based techniques are widely used because of the following reasons:
- **Low cost** - DNS based techniques do not require a lot of resources and the cost of the tools are relatively low.
- **No effect on network** - This detection technique does not affect the network performance or traffic.

### DNS-Based techniques
The DNS-based technique of botnet detection is based on DNS-based network traffic analysis to determine any anomalies. This technique is based on four approaches: failed DNS requests, monitoring malicious domains, domains with low TTLs, and monitoring abnormal traffic of DNS.

#### 1. Failed DNS requests (NXDOMAIN)
One way of detecting the presence of botnets in a network is by analyzing the [failed DNS resolution requests](http://cesg.tamu.edu/wp-content/uploads/2012/04/reddy_papers/securecomm11.pdf) statistically. Botnets use domains that are not registered, and therefore, their DNS request will fail. 

However, some botnets such as Torpig utilize low entropy domains to dodge being detected. Therefore, a large pool of domains is needed to function, and most of these domains fail in their resolution. 

Below is an example of a DNS server request from a non-existing domain.
 
![Failed DNS Request](/engineering-education/detecting-botnets-using-dns-based-technique/failed-dns-request.png)

[Image Source: Super User](https://i.stack.imgur.com/trpaB.png)

#### 2. Monitoring of malicious domains
This technique involves checking all DNS server requests to ensure that none of the domains being resolved is on a blacklist database such as [DNSBL](http://www.dnsbl.info/). Numerous organizations such as [SpamRats](http://www.spamrats.com/) generate a list of domains that are on the blacklist. 

This becomes the sure way of detecting botnets in a network. However, there is a disadvantage of this approach since a previous knowledge of the botnet must be present and its domain registered. This means it is hard to detect new botnets. 

#### 3. Domains with low TTLs
Botnet creators use a fast-flux technique to hinder detection by modifying the IP address associated with a domain. When the destination IP is changed, detecting faults becomes hard. However, such domains have very low TTL, and this means the DNS system refreshes the resolution cache of the IP related to the domain repeatedly. 

This makes domains with low TTL suspicious. However, this technique can be misleading as it can generate false positives tied to the many legitimate systems that are connected to the Internet. These systems use a technique that changes the IP associated with a domain. 

#### 4. Detection of abnormal DNS traffic
Another technique that can be used is the detection of abnormal DNS traffic. This technique aims at searching for domains that have abnormal behavior of DNS requests. 

This technique attempts to detect botnets by analyzing traffic for any anomalies such as a sudden surge in traffic, traffic to unusual ports, and network latency, among others. All these may point out the existence of a botnet.

### Examples of DNS-based technique tools
**Wireshark:** This is a very powerful tool that is mostly used for traffic analysis during botnet detection. Wireshark creates a CSV file using a command called “tshark-r Myfile-t fields”. Thereafter, retrieval of DNS name and respective IP information is done from the created CSV file.

**Capinfos:** This is a software that is used to read single or many files and then return statistics associated with the input file. Once all statistics are ready, they are printed in a folder, and the program creates a report in the form of tables from the statistics. Through the analysis of these statistics, one can tell whether the network is infected with botnets or not.

### Conclusion
Advances in technology, especially within networking have come with a fair share of security challenges. Hackers use various ways, such as botnets to attack networks. 

This is what has led to the importance of detection techniques of a botnet. As we have learned, DNS-based techniques for botnet detection are amoung the most effective approaches to detect whether a network is infiltrated by botnets.  

### Resources
-[DDoS](https://www.csoonline.com/article/3222095/ddos-explained-how-denial-of-service-attacks-are-evolving.html)

-[Computer Engineering & Systems Group](http://cesg.tamu.edu/wp-content/uploads/2012/04/reddy_papers/securecomm11.pdf)

-[CSO](https://www.csoonline.com/article/3222095/ddos-explained-how-denial-of-service-attacks-are-evolving.html)

-[DNSBL](http://www.dnsbl.info/)

-[Spamrats](http://www.spamrats.com/)

-[Computer Weekly](https://www.computerweekly.com/tip/Four-handy-botnet-detection-techniques-and-tools-A-tutorial)

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
