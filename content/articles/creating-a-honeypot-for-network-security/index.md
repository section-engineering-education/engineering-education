---
layout: engineering-education
status: publish
published: true
url: /creating-a-honeypot-for-network-security/
title: Creating a Honeypot for Network Security
description: In this article we will discuss honeypots and how to avoid them when scraping the web for data.
author: ruth-ngonyo
date: 2022-02-21T00:00:00-12:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-honeypot-for-network-security/hero.png
    alt: Creating a honeypot for network security
---
Many companies rely on publicly available data to make critical choices in todays data-driven world. Web scraping is a common technique for obtaining this information from the internet.
<!--more-->
However, web scraping has specific difficulties. The honeypot is an example of a trap. One of the most effective ways to deter hackers is to use honeypots. A honeypot system prevents attackers from their objectives. Unwanted behavior is often detected with the use of honeypots by security teams.

This article will discuss honeypots and avoid them when scraping the web for data.

### Table of contents
- [Types of honeypots](#types-of-honeypots)
- [How honeypots operate](#how-honeypots-operate)
- [Merits and demerits](#merits-and-demerits)
- [Honeypot traps and web scraping](#honeypot-traps-and-web-scraping)
- [Avoiding honeypot traps](#avoiding-honeypot-traps)
- [Creating a honeypot](#creating-a-honeypot)
- [Honeypot software](#honeypot-software)
- [Conclusion](#conclusion)

### Types of honeypots
Honeypots are classified into the following:
1. Research honeypots
2. Production honeypots

They are described below.

- `Research honeypots:` Researchers use research honeypots to learn more about the black hat group's methods and goals. These honeypots are used to analyze corporate threats and learn how to mitigate them. Academic honeypots are used by research, military, and government groups to collect large amounts of data.

- `Production honeypots:` Production honeypots are famous for their low data collection and ease of usage. Adding production honeypots improves network security. Due to their little participation, production honeypots are easy to set up. Research honeypots provide more about the assaults and attackers.

Design-wise, honeypots are classed as follows:
- Low-interaction honeypots
- Pure honeypots
- High-interaction honeypots

`Low-interaction honeypots` replicate attacker-requested services. Multiple virtual machines may be readily hosted on one physical system, and less code is needed, decreasing the virtual system's security complexity.

`Pure honeypots` are full-scale factories. The honeypot's network connection has been bugged to keep track of the attacker's activity. No additional software is required. In both cases, honeypots and honeypot-like systems, there are both advantages and disadvantages to using either method.

`High-interaction honeypots` enable attackers to waste time by mimicking production system activities. By using virtual PCs, a single server may host several honeypots. A quick honeypot penetration may restore it. While high-interaction honeypots are safer, they need more maintenance. It may be too pricey without virtual computers.

### How honeypots operate
Most honeypots are found in a demilitarized zone (DMZ). A DMZ is a logical or physical subnet that houses and exposes an organization's external-facing services to an untrusted, generally bigger network like the internet. 

Web and email servers are accessible from the DMZ. A firewall separates the DMZ from the corporate network. An internal network is shielded from the outside world. It permits traffic to flow in key network areas.

The invaders think these fake servers are legitimate, but they are honeypots. So they follow well-established protocols and base their behaviors on real-world acts. Occasionally, simulated data is employed to improve the reliability of a piece of data. A honeypot may contain fraudulent credit card information or files that seem to have such data. The honeypot duplicates all routine access control procedures and protocols to protect the data.

Attackers see honeypots in the DMZ as a susceptible location. And the more convincing they must be. How long should a hacker stay in a honeypot? An attacker might want to remain in the honeypot and collect as much information about the target firm as possible to avoid detection.

![The working of honeypots](/engineering-education/creating-a-honeypot-for-network-security/image2.png)

### Merits and demerits
Let's look at the merits and demerits of using honeypots.

#### Advantages
Experts say honeypots function when other intrusion detection systems (IDS) fail. An IDS examines network traffic for signals of unauthorized activity and alerts the user. A network snoop monitors a system or network for dangerous activity or policy breaches.

- It's becoming harder for IDS to monitor network traffic as more hackers use encryption. Honeypots track every communication, including encrypted.
- Most IDS warnings are false positives. Administrators may ignore the system if it produces too many false alerts. Companies and organizations may prevent false alarms by restricting honeypots to authorized personnel.
- Honeypots use less power than IDS. More extensive networks need more IDS resources.
- Honeypots can only gather data if they are used. Less data means less expense and easier detection and response to unlawful access. On the other hand, Honeypots generate fewer alerts and utilize fewer resources.

While honeypots offer numerous advantages, they also have drawbacks.

#### Disadvantages
- Cybercriminals might take control of them and use them to destroy network systems.
- They can only keep track if they interact with them. As a consequence, the honeypot misses subsequent attacks.

### Honeypot traps and web scraping
Websites utilize honeypot traps to detect and discourage online scraping activities like copyright theft. Honeypot traps are used to detect and prevent online scraping activity on their websites, such as the theft of intellectual data. Honeypot traps fail to distinguish between benign and malicious bots because successful web scraping bots that grab publicly available data may be discovered.

These traps are also known as spider honeypots. Online crawlers are often the only ones who have access to the links on an online page, and their efficiency is not always optimal. The site classifies data scraping from these URLs as web scraping.

### Avoiding honeypot traps
Online scraping behavior may be easily discovered and monitored using honeypot trap websites. Your access to public data may be restricted in the future. If you value your privacy, avoid collecting data from honeypot websites.

Some honeypot URLs use the CSS rule "display: none" to lure crawlers. Others are disguised by blending with the background. Crawlers can only follow links on the surface, keeping this in mind while creating connections. To prevent backlisting, adhere to web scraping best practices. Scraping data from a website involves following the site's administrators' standards.

### Creating a honeypot
The installation of honeypots is possible using commercial and free software. The four steps to setting up a corporate network security trap are: 

**Step 1:** Start by setting up the honeypot software.

Admins must pick, configure, and install the honeypot software. Securing a physical server involves the following steps.

- Never utilize system admin accounts.
- Use a different email address.
- Rather than keeping sensitive data on the server, use bogus data.
- Only the physical server should be accessed.

In the case of a security compromise, virtual machines may be quickly turned down and re-built. Any virtual server or set of virtual machines requires a hypervisor.

**Step 2:** Set up the firewall and logs.

Now, it's time to pick what the honeypot will monitor: file modifications, login attempts, and other actions. The administration must provide more logging since hackers may modify log files. As a precaution, save the honeypot's log files someplace unlikely to be hacked, such as the `Windows logging tool` or a cloud service.

The honeypot is in the DMZ, outside the firewall. The external firewall should only allow vital ports and block all others. These devices are ideal for diverting traffic from internal networks to public networks.

**Step 3:** Set up the honeypot

Unlike the internal firewall, the honeypot is a security concern. Offensive actors may access many ports. Don't open all ports. Bypassing a crucial server requires leaving or exploiting the honeypot.

**Step 4**: Testing Nmap and other port scanners may be used to examine a honeypot's settings. Assailants often do their port scans to find network weaknesses. An attacker may see what a hacker sees.

![An Nmap scan's output](/engineering-education/creating-a-honeypot-for-network-security/image1.png)

Nmap's port scanning capability can detect open and closed ports. Having a honeypot's ports open and closed increases authenticity.

Before reading the server logs, honeypot administrators should do some honeypot activities. Any attempt to scan a port by an attacker will be promptly rejected by an IDS, which will show the port as unavailable and encourage them to go on.

Before launching a honeypot, these issues must be solved. Anything that can impede the honeypot from attracting attackers and collecting the maximum amount of data should be removed. After initial testing put the honeypot into production, monitor it closely, and fine-tune the arrangement.

### Honeypot software
Let's look at some of the Honeypot software:

- The [Honeynet Project's Ghost USB](https://code.google.com/archive/p/ghost-usb-honeypot/) is a free honeypot that looks like a USB gadget. This device attracts and identifies viruses. Ghost USB offers both a command-line and a GUI.

- Gianluca Brindisi's Wordpot. In this software, the users may detect files used by hackers to obtain data from WordPress sites. WordPress plugins may duplicate a WordPress issue. It's GUI (CLI). [Click here](https://github.com/gbrindisi/wordpot) to clone the software codes. 

- Attivo Inc.'s ThreatDefend. It is a self-learning honeypot/deception device. These artificial visible local area networks are profiled and modified (VLAN). Finding hacker tactics to breach the company's firewall is possible. This business specializes in APTs, which overcome standard security mechanisms. [Click here](https://www.attivonetworks.com/product/ThreatDefend/) to access the software from the official website.

### Conclusion
Honeypot traps have been used to catch cybercriminals for years. However, they may hinder web scraping. Don't utilize honeypot traps to scrape publicly available data like price tracking or market research.

Happy learning!

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
