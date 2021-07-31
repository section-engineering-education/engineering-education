---
layout: engineering-education
status: publish
published: true
url: /why-ipv6-transition-is-important/
title: Why is the Switch to IPv6 Important?
description: Currently, communication through the Internet is primarily conducted using IPv4 addresses, but limited inventory of these addresses is demanding that we transition to IPv6 soon.
author: gregory-manley
date: 2019-12-05T00:00:00-07:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-ipv6-transition-is-important/hero.jpg
    alt: IPv6 transition
---
Computers talk to other computers all the time, but how can they tell who is who? This is where IP addresses come in. Each computer on a network receives an IP address, which can be thought as the unique name of the computer. These addresses are much like a mailing address identifies given people. Currently, we are mainly using IPv4 addresses to tell computers apart, but we need to transition to IPv6 soon.
<!--more-->

### How Is IPv6 Different?
IPv4 uses 32-bit addresses allowing for a total of 4,294,967,296 (2^32) addresses. That is the big problem with continuing to use IPv4. According to the [World Bank](https://data.worldbank.org/indicator/SP.POP.TOTL), the population of Earth is 7.53 billion as of 2017. Assuming half of these people own an Internet connected device, we still have about half a billion addresses left over. However, it is common today for people to have more than one Internet connected device, like having a smartphone and a laptop and this does not include server farms or cryptocurrency mining operations which could include many computers. This amount of devices has overwhelmed the amount of addresses available in IPv4.

IPv6, on the other hand, uses 128-bit addresses, allowing 3.4 x 10^38 or  340,000,000,000,000,000,000,000,000,000,000,000,000 addresses, drastically reducing the risk of running out of addresses.

![IPv6 address breakdown](/engineering-education/why-ipv6-transition-is-important/Ipv6_address_leading_zeros.png)
*(image source: [https://en.wikipedia.org/wiki/IPv6](https://en.wikipedia.org/wiki/IPv6))*

According to Todd Lammle in *CCENT Cisco Certified Entry Networking Technician STUDY GUIDE* (2013), a big advantage of IPv6 is its efficiency. IPv6 has a redesigned header, having half the fields of IPv4. Even though a IPv6 header is 40 bytes, double the 20 bytes of IPv4, the fewer fields result in a faster routed protocol (Lammle, CCENT 2013). IPv6 also does not have to use NAT or Network Address Translation which allows for one public IPv4 address to correspond with multiple private (local network) addresses. By having so many addresses that all computers can have their very own, there is no need for NAT and thus less processing is needed.

![IPv4 header](/engineering-education/why-ipv6-transition-is-important/ipv4-header.png)
![IPv6 header](/engineering-education/why-ipv6-transition-is-important/ipv6-header.png)
*(image source: [https://www.petri.com/ipv6-header-vs-ipv4](https://www.petri.com/ipv6-header-vs-ipv4))*

IPv6 also implements security features to mitigate current attack methods. For example, IPv6 can use the Secure Neighbor Discovery protocol with is capable of enabling cryptographic confirmation that a web host is who it claims to be ([LinkLabs](https://www.link-labs.com/blog/why-ipv6-is-important-for-internet-of-things)). This renders the Address Resolution Protocol poisoning and some other naming-based attacks much more difficult.

Smart devices, like a smart lock, smart speaker, smart TVs, and any other "smart" Internet-connected device, are assigned an IP address. This takes up an available address, creating the need for IPv6. There are not enough addresses in IPv4 to support all of these devices. IPv6 also allows for more secure communications between these already insecure devices.
