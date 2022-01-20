---
layout: engineering-education
status: publish
published: true
url: /setting-up-a-private-dns-server-with-raspberry-pi/
title: Setting up a Private DNS Server using Raspberry Pi
description: This article will guide the reader on how to setup a private DNS server using Raspberry Pi. 
author: ruphus-muita
date: 2021-10-08T00:00:00-02:00
topics: [Networking]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/hero.jpg 
    alt: Setting Up a Private DNS Server example image
---

Computers need IP addresses to communicate with one another over the internet. These addresses allow devices to recognize which servers/devices they are communicating with. 
<!--more-->
However, it's difficult to remember IP addresses, hence the need for Domain Name Systems (DNS) servers. 

DNS servers change domain names into IP addresses. In other words, a DNS is like a phone book that contains web addresses which makes access to different pages faster.

### Table of contents
- [Prerequisites](#prerequisites)
- [How DNS servers work](#how-dns-servers-work)
- [Functions of a DNS](#functions-of-a-dns)
- [Setting up a DNS server on Raspberry Pi](#setting-up-a-dns-server-on-raspberry-pi)
- [Conclusion](#conclusion)

### Prerequisites
To understand this tutorial, you need to have access to:
- Raspberry Pi (2-4) with Raspbian Pi OS.
- Internet connection.
- A Raspberry Pi's terminal.

### How DNS servers work
Devices request one or more DNS servers to get access to the correct domain name. This process can be time-consuming. 

Having a private and dedicated DNS server helps save significant time. A [Raspberry Pi](https://www.watelectronics.com/know-all-about-raspberry-pi-board-technology/) is small but can be used in this scenario.

A [DNS](https://www.techtarget.com/searchnetworking/definition/domain-name-system) server offers a way of mapping domain names to IP addresses.  

The DNS converts the domain name requests into IP addresses. For instance, when a web address is entered into a browser, DNS servers provide the IP address of the webserver that is linked to that particular name.

Let's use a domain name such as `www.google.com` as an example. When the DNS resolver is queried, it will respond with an IP address or error. In this case, the DNS server would respond with `172.217.170.174`, which is Google's IP address.

### Functions of a DNS
Below are three significant benefits that a private Domain Name System (DNS) would offer:

**Speed** 

A query to the web may sometimes have to pass through various servers and routers before the user can access a web page. This time is mostly in milliseconds. 

With a private DNS, the query does not have to pass through multiple servers. The delivery time will, therefore, be shorter and more efficient.

**Privacy** 

To gain access to the correct domain name, information from a device has to be sent to an external server which in turn creates a trail over the internet.

When a private DNS is used, and information does not have to leave the internal network.

**Security**

Hosting a private DNS server offers increased privacy because the owner gets complete control over entries. This protects the server from malicious entries.

### Setting up a DNS server on Raspberry Pi

#### Step 1 - Updating Raspberry Pi packages 
We first need to update Rasberry-Pi packages using the following commands:

```bash
sudo apt update
```

```bash
sudo apt upgrade
```

![Updating Packages](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/update.png) 

#### Step 2 - DNSMasq package installation on the Raspberry Pi
The next step is to install the `DNSMasq` utility, which is essential in setting up the DNS server. [DNSMasq](https://wiki.debian.org/dnsmasq) helps in configuring the DNS forwarder. 

It resolves DNS queries for various devices available on the network. On the Raspberry Pi, it manages the limited resources used while setting up the DNS server. 

```bash
sudo apt install dnsmasq
```
 
![Installing DNSMasq](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/install-dnsmasq.png)

#### Step 3 - DNSMasq configuration
This step is designed to boost the performance of the DNS server.

Edit `dnsmasq.conf` file, as shown below:

```bash
sudo nano /etc/dnsmasq.conf
```

Press `CTRL+W` to search and remove the # sign in front of the following lines:

- `domain-needed` – It makes sure that the DNS server does not forward any incorrect domain names. This checks for names that do not have a dot and keeps them in the local network.

- `bogus-priv` – It prevents the server from forwarding queries within local ranges of IP to upstream servers. It acts as a security feature that prevents leaking of local IPs to upstream servers. 

- `no-resolv` – It tells the DNS server to use the DNSMasq for address resolution instead of `/etc/resolv.conf`.

Press `CTRL+W` to locate the line shown below and then delete it. 

`#server=/localnet/192.168.0.1`
 
![Edit server](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/edit-conf-file.png)

Then, add the following lines:

```bash
server=8.8.8.8
server=8.8.4.4
```

The step above ensures that google DNS servers are used as the upstream servers.

Press `CTRL+W` to look for the following line:

`#cache-size=150`
 
![Edit cache](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/edit-cache.png)

Remove the `#` sign and then change the cache size to 1000:

`cache-size =1000`

Changing the size of the cache to a more significant number helps reduce the response time. Saving more DNS request responses also improves performance.

Next, save the edits using `CTRL + X`. Then, restart the `DNSMasq` using the command below: 

```bash
sudo systemctl restart dnsmasq
```

Check the status of the DNS using the command below:

```bash
sudo systemctl status dnsmasq
```
 
![Restart and check Status](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/status.png)

#### Step 4: DNS server testing
The server is tested using the `dig` command. 

`dig` is a Linux command used to query DNS servers to get information about a name server, host address, and others. It is used to gather information about DNS.

```bash
dig <domain> @localhost
```

For instance:

```bash
dig section.io/kb @localhost
```

![DNS Testing](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/responsetime1.png)

In the image above, we are checking to see how long the query took to execute. This can be seen in the last section of the image, where it shows:

```bash 
Query Time: 1091 msec
```

> Note that we are only interested in the time taken to get a response from the server, which is ` 1091 msec`.

The time taken to perform a query is shorter because the address is stored in the cache. This is clear in the picture below. 
 
![DNS Testing](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/responsetime2.png)

Remember, we are only interested in the Query Time.

#### Step 5 - Set the DNS Server on your device

We determine the IP address of the raspberry PI using the `ifconfig` command.
 
![Ifconfig](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/ipaddress.png)

The IP address is the `inet addr`; hence, our server's IP is  `10.0.2.15`.

Next, set this IP address as the DNS server on devices. To achieve this setting on your Windows PC:

Press the `windows key + R` to open Run. Type `control` in the new window and click `enter` to open the Control Panel.

![Run](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/control.png)

In the control panel, select `Network and Internet`.

![Network and internet](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/network-and-internet.png)

Then select `View network status and tasks` in the new window.

![Network status](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/network-status.png)

 On the left of the new pane, select `Change adapter settings`.

![Adapter settings](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/adpater-settings.png)

 Right-click on the network interface in use, e.g., Wi-Fi or ethernet, and then select `Properties`.

![Properties](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/properties-1.png)

 Click on `Internet Protocol Version 4 (TCP/IPv4)` then select `Properties` again.

![Properties](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/properties-2.png)

On the new window, choose, `Use the following DNS server address`.
 
![Setting DNS](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/set-dns.png)

### Conclusion
The network speed can be highly utilized by using Raspberry PI. caching IP addresses helps to reduce the DNS query response time. 

Considering that a DNS server is one of the targets for cybercriminals, it is crucial to keep it as secure as possible. 

It is vital to ensure that the server receives automatic updates. The command `sudo apt install unattended-upgrades –y` can be used for this operation.

### Relevant resources
- [How to Use a Raspberry Pi as a DNS Server](https://www.deviceplus.com/raspberry-pi/how-to-use-a-raspberry-pi-as-a-dns-server/)
- [How to use your Raspberry Pi as a DNS Server (And Speed Up Internet)](https://raspberrytips.com/raspberry-pi-dns-server/)
- [Using my Raspberry PI as a Tiny DNS Server](https://samraza.medium.com/using-my-raspberry-pi-as-a-tiny-dns-server-83dc66fabc91)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

