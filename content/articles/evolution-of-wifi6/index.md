---
layout: engineering-education
status: publish
published: true
url: /engineering-education/evolution-of-wifi6/
title: The Evolution of Wi-Fi 6
description: Wi-Fi 6 has arrived, providing faster speeds, higher volume device support, and advanced security protocols.
author: gregory-manley
date: 2020-01-13T00:00:00-07:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/evolution-of-wifi6/hero.jpg
    alt: evolution of wi-fi 6
---
Almost every smartphone can connect to the Internet via Wi-Fi, and all modern laptops connect through Wi-Fi (since they do not have a RJ45 Ethernet port). The current version of Wi-Fi is called 802.11ac. Wi-Fi 6 is the next generation of Wi-Fi and is also known as AX Wi-Fi or 802.11ax Wi-Fi. But how is this standard different than the previous (802.11ac), and why is it needed?
<!--more-->

### How is Wi-Fi 6 different from 802.11ac?
According to [CISCO](https://www.cisco.com/c/en/us/products/wireless/what-is-wi-fi-6.html) Wi-Fi 6 is "the latest step in a journey of nonstop innovation. The standard builds on the strengths of 802.11ac while adding efficiency, flexibility, and scalability that allows new and existing networks increased speed and capacity with next-generation applications." One of the biggest advantages of Wi-Fi 6 is the ability to support more clients in dense environment. Along with this, it expands the Wi-Fi bands from 80 MHz to 160 MHz, which according to [TP-Link](https://www.tp-link.com/us/wifi6) doubles the channel width and creates "a faster connection from your router to the device".

The standard also utilizes OFDMA, or Orthogonal Frequency Division Multiple Access, which allows data transmission signals to be split into smaller signals, meaning that the router does not have to wait for medium access for every packet. According to [NETGEAR](https://kb.netgear.com/000059685/What-is-Orthogonal-Frequency-Division-Multiple-Access), benefits from using OFDMA include:
<ul>
  <li>Improved data transmission between every device in your network</li>
  <li>Greatly improved network efficiency (less waiting for data transmission)</li>
  <li>Greatly improved latency for small packet transmission</li>
  <li>Improved communication between your router and your devices</li>
  <li>Improved battery life for your devices</li>
</ul>

Wi-Fi 6 includes advanced security protocols and requires Wi-Fi Certified WPA3. The current security protocol is WPA2, which utilizes 128 bit keys according to [The Internet Society](ietf.org/rfc/rfc4017.txt). WPA3 mandates 256-bit encryption and the use of CNSA approved cipher suites, including TLS cipher suites for EAP-TLS. According to the [NSA](https://nsa.gov/Portals/70/documents/what-we-do/cybersecurity/professional-resources/ctr/cybersecurity-technical-report-wpa3.pdf) this mandated encryption would provide 192-bit security for Wi-Fi networks.

WPA3 will also introduce Opportunistic Wireless Encryption (OWE), which will replace current unencrypted open networks. The [NSA](https://nsa.gov/Portals/70/documents/what-we-do/cybersecurity/professional-resources/ctr/cybersecurity-technical-report-wpa3.pdf) says, "OWE will provide individualized data encryption to users connecting to public open networks to protect against eavesdropping. On Open networks, an attacker connected to the network could read or even modify others' traffic. HTTPS websites, to an extent, provide protection against eavesdropping on an Open network. OWE uses unauthenticated Diffie-Hellman key exchange during association, resulting in a Pairwise Master Key (PMK) used to derive the session keys." Even though the security on open networks is extremely increased, users will not have a different experience connecting to the WPA3 open network.

### Why is Wi-Fi 6 needed?
According to the [Wi-Fi Alliance](https://www.wi-fi.org/news-events/newsroom/wi-fi-certified-6-delivers-new-wi-fi-era) Wi-Fi 6 supports "a more diverse set of devices and applications, from those requiring peak performance in demanding enterprise environments to those requiring low power and low latency in smart homes or industrial IoT scenarios... [It] delivers nearly four times the capacity of [802.11ac], and is an evolutionary advancement. [Wi-Fi 6] delivers critical connectivity that supports cellular networks, and leverages high speeds, low latency, power efficiency, greater capacity, and enhanced coverage to deliver many advanced 5G services."

In summary, Wi-Fi 6 allows for more devices that a single wireless router can serve. It also comes with a mandated new security protocol known as WPA3, which includes advanced encryption and improved privacy on open wireless access points. Protecting your data on the Internet is important, and Wi-Fi 6 helps protect it while allowing for a better experience with many devices.
