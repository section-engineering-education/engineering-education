---
layout: engineering-education
status: publish
published: true
url: /setting-up-a-private-dns-server-with-raspberry-pi/
title: Setting up a private DNS server with Raspberry Pi
description: This article will guide us on how to setup a private dns server using Raspberry Pi. 
author: ruphus-muita
date: 2021-10-02T00:00:00-11:00
topics: [Networking]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/hero.jpg 
    alt: Setting Up a Private DNS Server example image
---

For computers to speak with one another over the web, all participants within the network must have an IP address. Through these addresses, computers recognize precisely which servers/devices they are communicating with. 
<!--more-->
However, it can be difficult to remember IP addresses, hence the need for Domain Name Systems (DNS) servers. DNS servers change domain names into IP addresses. A DNS is like a phone book of web addresses that makes access to pages faster.

### Table of contents
- [Prerequisites](#prerequisites)
- [How DNS servers work](#how-dns-servers-work)
- [Functions of a DNS](#functions-of-a-dns)
- [Setting up a DNS Server on Raspberry PI](#setting-up-a-dns-server-on-raspberry-pi)
- [Conclusion](#conclusion)

### Prerequisites
To understand this tutorial, you need to have access to:
1.	Raspberry Pi (2-4) with Raspbian OS
2.	The internet
3.	A Raspberry Pi's terminal

### How DNS servers work
Devices question one or more DNS servers to get access to the correct domain name – IP address translation, a process that can be time-consuming. Therefore, it would be beneficial to shorten the time spent on this process by having a private and dedicated DNS server. A [Raspberry Pi](https://www.watelectronics.com/know-all-about-raspberry-pi-board-technology/) is small but can be used for various purposes be beneficial in such a scenario.

The [DNS](https://www.techtarget.com/searchnetworking/definition/domain-name-system) offers a way of mapping domain names to IP’s.  It converts the names requests into IP addresses, which are used by servers and user devices. For instance, when a URL, web address, is keyed into a browser, the DNS servers provide the IP address of the webserver linked to that particular name.
Let's use the domain name such as `www.google.com` as an example. The DNS resolver is queried and responds with an IP address or an error. In this case, the DNS server would respond with `172.217.170.174`, which is the IP address for Google.

### Functions of a DNS
Below are three significant benefits that a private Domain Name System would offer:

- **Speed** – a query to the web may sometimes have to pass through various servers and routers before the user can access a web page. This time is mostly in milliseconds. However, when a private DNS is set up, this query does not have to pass through the various server, and hence the delivery time will be shorter and more efficient.
- **Privacy** – to gain access to the correct domain name, information from a device has to be sent to an external server which in turn creates a trail over the internet as opposed to when a private DNS is used, and information does not have to leave the internal network.
- **Security** – hosting a private DNS server offers increased privacy because the owner gets complete control over entries. This, in turn, protects the server from malicious entries that hackers could facilitate. 

### Setting up a DNS Server on Raspberry PI

#### Step 1:Updating Raspberry Packages 

The first step of the process is updating packages using the following commands:

```bash
sudo apt update
```

```bash
sudo apt upgrade
```

![ Updating Packages](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/update.png) 

#### Step 2: DNSMasq package installation on the Raspberry 
The next step is installing the `DNSMasq` utility, which is essential to set up this server. [DNSMasq](https://wiki.debian.org/dnsmasq) helps in the easy configuration of the DNS forwarder. It resolves DNS queries for various devices available on the network or the devices it is running on. On the Raspberry Pi, it manages the limited resources used while setting up the DNS server. 

```bash
sudo apt install dnsmasq
```
 
![ Installing DNSMasq](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/install-dnsmasq.png)

#### Step 3: DNSMasq Configuration

This step is designed to ensure the best performance of the DNS server.
1.	Edit `dnsmasq.conf` file using:

```bash
sudo nano /etc/dnsmasq.conf
```

2.	Use CTRL+W to search and remove the # sign in front of the following lines:

•	domain-needed – it makes sure that the DNS server does not forward any incorrect domain names. This checks for names that do not have a dot and keeps them in the local network.

•	bogus-priv – prevents the server from forwarding queries within local ranges of IP to upstream servers, serving as a security feature that prevents leaking of local IPs to upstream servers. 

•	no-resolv – tells the DNS server to use the DNSMasq for address resolution instead of /etc/resolv.conf .

3.	Press `CTRL+W` to locate the line shown here and then delete it. 

`#server=/localnet/192.168.0.1`
 
![Edit server](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/edit-conf-file.png)

Instead, put these below:

```bash
server=8.8.8.8
server=8.8.4.4
```

The step above ensure that google DNS servers are used as the upstream servers.
4. Use CTRL+W to look for the following line:

`#cache-size=150`
 
![Edit cache](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/edit-cache.png)

Remove the # sign and then change the cache size to 1000:

`cache-size =1000`

Changing the size of the cache to a more significant number helps reduce the response time by saving more DNS request responses, improving performance.

5. Save the edits using `CTRL + X`.

6. Restart the DNSMasq using the command below: 

```bash
sudo systemctl restart dnsmasq
```

7. Check the status of the DNS using the command below:

```bash
sudo systemctl standing dnsmasq
```
 
![Restart and checking Status](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/status.png)

#### Step 4: DNS Server testing

1. The server is tested using the `dig` command.

```bash
dig <domain> @localhost
```

For instance:

```bash
dig section.io/kb @localhost
```
 
![DNS Testing](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/responsetime1.png)

2. Check the response time taken by the query.

3. Rerun the command.

Because the address is stored in the cache, the time taken to query is shorter.
 
![ DNS Testing ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/responsetime2.png)

#### Step 5: Set the DNS Server on your device

1.	Find out the IP address of the raspberry PI by using the `ifconfig` command.
 
![IFCONFIG](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/ipaddress.png)

2.	Set this IP address as the DNS server on devices.
 
![Setting DNS](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/set-dns.png)

### Conclusion
The network speed can be highly utilized by using a raspberry PI by caching the addresses and reducing the DNS query response time. Considering that a DNS server is one of the targets for cybercriminals, it is crucial to keep it as secure as possible. It is therefore vital to ensure that the server receives automatic updates. The command `sudo apt install unattended-upgrades –y` can be used to configure unattended-upgrades.

### Relevant Resources
- [How to Use a Raspberry Pi as a DNS Server](https://www.deviceplus.com/raspberry-pi/how-to-use-a-raspberry-pi-as-a-dns-server/)
- [How to use your Raspberry Pi as a DNS Server (And Speed Up Internet)](https://raspberrytips.com/raspberry-pi-dns-server/)
- [Using my Raspberry PI as a Tiny DNS Server](https://samraza.medium.com/using-my-raspberry-pi-as-a-tiny-dns-server-83dc66fabc91)
