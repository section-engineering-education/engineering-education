---
layout: engineering-education
status: publish
published: true
url: /wep-encryption/
title: Why You Shouldn't Use WEP Encryption
description: Wired Equivalent Privacy (WEP) is a security algorithm for wireless networks. WEP encrypts all traffic using a static key, which means all traffic, no matter the device, is encrypted using the single key.
author: gregory-manley
date: 2020-04-16T00:00:00-07:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/wep-encryption/hero.jpg
    alt: Wired Equivalent Privacy (WEP)
---
There are many encryption standards in the digital world today, many of which have been shown to have fatal flaws. Unfortunately, many standards that are considered insecure are still being used in sensitive applications. One such standard is WEP. So what is it and why is it bad to use?
<!--more-->

### What is WEP?
[Wired Equivalent Privacy (WEP)](https://en.wikipedia.org/wiki/Wired_Equivalent_Privacy) is a security algorithm for wireless networks. It was introduced as a part of the original 802.11 standard that was ratified in 1997. As an early-day solution, its goal was to prevent Man-in-the-Middle attacks, which it did for a time.

WEP encrypts all traffic using a 64 or 128 bit key in hexadecimal. This is a static key, which means all traffic, no matter the device, is encrypted using the single key. This protocol stood up for a while until the computing power in everyday computers grew with the improvements in IPC and clock speeds of processors. At this point, the standard was considered insecure and was deprecated.

The standard was superseded by Wi-Fi Protected Access in 2003, with WPA2 the following year. The [IEEE declared](https://web.archive.org/web/20080417005957/http://lirent.net/wifi/what-is-a-wep-key.html) in 2004 that both WEP-40 and WEP-104, "have been deprecated as they fail to meet their security goals". Despite this, WEP is still used, even in high-end wireless routers such as the ASUS ROG Rapture AX11000 Tri-Band Wi-Fi 6 Router.

### Why is it bad to use WEP?
This is reminiscent of my high school days when our STEM Lab teacher would set up a few computers with Kali Linux installed. He also created a WEP Wi-Fi access point for the class. This was so that we could learn how to use Fern Wi-Fi Cracker and similar software to crack the insecure WEP access point and see how much harder WPA/WPA2-PSK access points were to crack. The WEP attack took maybe 5 minutes and was able to penetrate the network, all at the hands of a class of high schoolers. However, the WPA attacks required the use of a dictionary and never found the password to the network.

[Guiding Tech](https://www.guidingtech.com/9304/why-you-should-never-use-wep-to-protect-home-wi-fi/) points out that, "The hole in a wall lies in the way WEP encrypts the packets with a static encryption key. The key does not change with every packet that is transmitted, so a hacker can listen in and, with patience, gather enough packets to decipher the encryption key." Remember, WEP actually uses an encryption key of either 64 or 128 bits, using only hexadecimal characters (0-9, A-F). This length of a key is not very secure with the amount of computing power that people have in their pockets.

WEP is not a good encryption standard; however, it is better than no security. It encrypted all traffic to and from the access point using a static key, which was its downfall. This downfall can now be exploited by common, everyday computers. It is now recommended to use at least WPA, but how much longer until that can be cracked by everyday computers?
