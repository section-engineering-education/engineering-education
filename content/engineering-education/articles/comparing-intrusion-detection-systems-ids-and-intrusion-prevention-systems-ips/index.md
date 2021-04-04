---
layout: engineering-education
status: publish
published: true
url: /engineering-education/comparing-intrusion-detection-systems-ids-and-intrusion-prevention-systems-ips/
title: Comparing Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS)
description: This article will discuss Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS), their problems, their significance to cybersecurity, and how they compare.
author: eric-kahuha
date: 2020-12-22T00:00:00-15:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/comparing-intrusion-detection-systems-ids-and-intrusion-prevention-systems-ips/hero.jpg
    alt: Intrusion Detection Systems example image
---
Intruders are always ready and determined to cause data breaches, install malware, and steal sensitive information. [Research](https://www.sitelock.com/blog/security-by-obscurity-q2-2017/) shows that websites are hit with 22 cyber-attacks in a day, on average. Embracing cyber threat prevention and detection technologies is significant to mitigating threats.
<!--more-->
Intrusion Prevention Systems (IPS) and Intrusion Detection Systems (IDS) are two technologies used in threat protection.

This article discusses IDS and IPS, their problems, their significance to cybersecurity, and how they compare.

### An overview of IDS
IDS refers to software applications or hardware devices that monitor incoming and outbound network traffic for a security policy violation or any malicious activity. We can think of it this way: An intruder alarm sounds an alert if it spots suspicious activity resulting in data and network compromise. 

How does this happen? Well, IDS inspect [packets](https://techterms.com/definition/packet#) flowing across a network to detect traffic patterns and any compromise indicators that may suggest malicious activity. 

These packets refer to small amounts of data sent over a network, including the internet or local area network (LAN). They incorporate a destination, source, and data (content) being transferred. An IDS is used to detect potential network compromises in real-time.

![An illustration of IDS](/engineering-education/comparing-intrusion-detection-systems-ids-and-intrusion-prevention-systems-ips/ids-security.png)

[Source](https://www.comodo.com/ids-in-security.php)

IDS are of two types:

1. Network Intrusion Detection System (NIDS) – Are used to monitor inbound and outbound packets on a network or a network subset.
2. Host Intrusion Detection System (HIDS) – Are used to monitor a single host such as a device or a computer. HIDS resides in those devices to monitor traffic and the activities of clients on said devices.

### An overview of IPS
IPS are strategically placed between the outside internet and the internal network. Practically in the same area as firewalls. Anything that the IDS flags as a threat, IPS denies it as malicious traffic. The traffic may represent known threats in the database, but the presence of IPS ensures that it blocks the threats, and that there is no delivery of malicious packets.

![An illustration of IPS](/engineering-education/comparing-intrusion-detection-systems-ids-and-intrusion-prevention-systems-ips/ips-security.png)

[Source](https://www.exabeam.com/ueba/ips-security-how-active-security-saves-time-and-stop-attacks-in-their-tracks/)

IPS comes in four main types:
1. Network-based intrusion prevention system (NIPS) – That is used to protect computer networks.
2. Wireless intrusion prevention system (WIPS) – Is used to protect wireless networks.
3. Network behavior analysis (NBA) – Which is useful in examining network traffic.
4. Host-based intrusion prevention system (HIPS) - Is an installed software package used to monitor a single host for suspicious activity.

### Can you use IDS and IPS together?
Yes, you can use IDS and IPS together. Many modern vendors are merging these two technology systems into one solution. IDS and IPS are combined with firewalls in a technology known as [Unified Threat Management (UTM) or Next-Generation Firewall (NGFW)](https://ostec.blog/en/perimeter/firewall-utm-ngfw-differences/).

### Problems IDS/IPS Address
Business networks have multiple access points to other private and public networks. It is challenging to maintain the security of these networks and, at the same time, keep them open to customers.

Cybercriminals are also launching sophisticated attacks every day that can bypass the best security systems. This is especially true for those systems still depending primarily on firewalls and encryption. Fighting today's attacks requires more than these technologies can offer.

That is why prevention and detection is critical for network management. You must stay ahead of hackers in order to protect your network successfully. One way of doing this is to prevent malicious entry into your network instead of waiting to clean up an already malware-infected system. IDS and IPS will help you in the early prevention and detection of attacks.

### IDS vs. IPS
| **Intrusion Detection Systems (IDS)** | **Intrusion Prevention Systems (IPS)** |
| --- | --- |
| Only issues alert for potential attacks | Can take action against attacks |
| Not inline, thus traffic does not have to flow through IDS | Traffic must flow through IPS |
| False positives for IDS cause alerts | False positives for IPS may lead to loss of functions or data |
| IDS act as monitoring systems | IPS act as control systems |
| Do not manipulate network traffic | IPS restrains packets from delivering depending on the contents of the packet |

### Why IDS and IPS are critical for cybersecurity
Data breach threats are always increasing, and security teams must continuously update their cybersecurity strategies. IDS and IPS are essential aspects of a cybersecurity strategy and can help accomplish many security objectives.

They can help in these area explained below.

**Compliance**: In many jurisdictions, part of the compliance requirement is to invest in systems and technologies that guarantee data protection. These technologies are not limited to IPS and IDS, which are significant in addressing security controls. Security controls act as countermeasures or safeguards to detect, avoid, minimize, and counteract threats to computer systems, data, computer networks, and more.

**Policy enforcement**: Security teams can configure IDS and IPS to implement internal security strategies at the network level. If an organization supports only one virtual private network (VPN), it can rely on IPS to block other VPN traffic.

**Automation**: Since IPS and IDS are mostly hands-off, they are very applicable for the present security stack. IPS only requires limited resources to protect networks from known threats.

### Conclusion
Today's cybersecurity environment calls for the adoption of both malware detection and prevention technologies. Stand-alone IDS is not enough to protect your system from cybercriminals. But by merging IDS and IPS and combining them with firewalls, you are in a better position to detect and prevent threats.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
