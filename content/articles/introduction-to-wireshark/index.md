---
layout: engineering-education
status: publish
published: true
url: /introduction-to-wireshark/
title: Introduction To Network Analysis Using Wireshark
description: Wireshark is an open-source project whose primary purpose is to develop a standard analysis tool for network protocols. In this article, we will consider installing Wireshark on an Ubuntu machine and proceed further with mapping data packets using the same.  
author: miller-juma
date: 2021-02-17T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-wireshark/hero.jpg
    alt: Introduction to wireshark example image
---
As an IT professional, one of the most powerful networking tools you will find yourself using is ***Wireshark***, this tool is mostly used to analyze network packets. This tutorial will be an overview of ***Wireshark***, we will understand how it works, and go over its several uses. 
<!--more-->
### Requirements
- Networking Basics
- TCP/IP stack
- Reading and interpreting packet headers
- Routing and port forwarding
- DHCP

### What is Wireshark?  
***Wireshark*** is an open-source project whose primary purpose is to develop a standard analysis tool for network protocols. It's a network packet analyzer that captures data on a network then presents it in a human-understandable form.  

This tool performs various operations such as:  
- Troubleshooting networks.
- Performing security operations used to detect security threats such as port scanning on a network.  
- Learning more about network protocols at the microscopic level.
- Performing analysis of voice over the internet (VoIP).

### How does Wireshark works?
***Wireshark*** is, like we said, a packet analyzer or a packet sniffer. ***Wireshark*** captures network traffic (the data moving currently on your network) and records the movement of data offline. To analyze the network activities, you can then use this data.  

### Installing Wireshark
In this tutorial, we are installing ***Wireshark*** in Ubuntu 20.04. By following the installation instructions [here](https://www.wireshark.org/download.html), you are free to use any other device.  

### Step 1: Updating the system apt

```bash

sudo apt update
```

This outputs the following, remember your output might be different from the one shown below:  

```bash

jumamiller@OpijaKaeli:~$ sudo apt update
[sudo] password for jumamiller: 
Hit:1 http://ke.archive.ubuntu.com/ubuntu focal InRelease                      
Hit:2 http://dl.google.com/linux/chrome/deb stable InRelease                                                
Reading package lists... Done
Building dependency tree       
Reading state information... Done
243 packages can be upgraded. Run 'apt list --upgradable' to see them.
jumamiller@OpijaKaeli:~$ 

```

#### Step 2: Installing Wireshark
Since we have updated our system, we will install ***Wireshark's*** latest version by running the following command:  

```bash
jumamiller@OpijaKaeli:~$ sudo apt install Wireshark
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  libc-ares2 libqt5multimedia5-plugins libqt5multimediagsttools5
  libqt5multimediawidgets5 libqt5opengl5 libsmi2ldbl libspandsp2
  libwireshark-data libwireshark13 libwiretap10 libwsutil11 wireshark-common
  wireshark-qt
Suggested packages:
  snmp-mibs-downloader geoipupdate geoip-database geoip-database-extra
  libjs-leaflet libjs-leaflet.markercluster wireshark-doc
The following NEW packages will be installed:
  libc-ares2 libqt5multimedia5-plugins libqt5multimediagsttools5
  libqt5multimediawidgets5 libqt5opengl5 libsmi2ldbl libspandsp2
  libwireshark-data libwireshark13 libwiretap10 libwsutil11 wireshark
  wireshark-common wireshark-qt
0 upgraded, 14 newly installed, 0 to remove and 243 not upgraded.
Need to get 22.0 MB of archives.
After this operation, 116 MB of additional disk space will be used.
Do you want to continue? [Y/n] 

```

To continue downloading ***Wireshark***, type `y`. Depending on your network level, this may take a few minutes.
Upon completion, it prompts you to configure Wireshark for root privileges using a window.  


![Configure-wireshark](/engineering-education/introduction-to-wireshark/configure-wireshark.jpg)

Use the arrow keys, select the ***yes*** or ***no*** depending on your need, and then press enter.  

#### Step 4: Verify Wireshark installation
Run the following command to get the version of ***Wireshark*** you have installed:  

```bash

jumamiller@OpijaKaeli:~$ wireshark --version
Wireshark 3.2.3 (Git v3.2.3 packaged as 3.2.3-1)

Copyright 1998-2020 Gerald Combs <gerald@wireshark.org> and contributors.
License GPLv2+: GNU GPL version 2 or later <https://www.gnu.org/licenses/gpl-2.0.html>
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

Compiled (64-bit) with Qt 5.12.8, with libpcap, with POSIX capabilities (Linux),
with libnl 3, with GLib 2.64.2, with zlib 1.2.11, with SMI 0.4.8, with c-ares
1.15.0, with Lua 5.2.4, with GnuTLS 3.6.13 and PKCS #11 support, with Gcrypt
1.8.5, with MIT Kerberos, with MaxMind DB resolver, with nghttp2 1.40.0, with
brotli, with LZ4, with Zstandard, with Snappy, with libxml2 2.9.10, with
QtMultimedia, without automatic updates, with SpeexDSP (using system library),
with SBC, with SpanDSP, without bcg729.

Running on Linux 5.4.0-58-generic, with          Intel(R) Celeron(R) CPU B830 @
1.80GHz (with SSE4.2), with 3824 MB of physical memory, with locale en_US.UTF-8,
with libpcap version 1.9.1 (with TPACKET_V3), with GnuTLS 3.6.13, with Gcrypt
1.8.5, with brotli 1.0.7, with zlib 1.2.11, binary plugins supported (0 loaded).

Built using gcc 9.3.0.
jumamiller@OpijaKaeli:~$ 

```

#### Step 5: Launch Wireshark
To start ***Wireshark***, run the following command in the terminal:  

```bash

jumamiller@OpijaKaeli:~$ wireshark
|
```

Running this command will redirect you to the ***Wireshark*** software window.

***Fig 1.2 Wireshark window***

![Wireshark-window](/engineering-education/introduction-to-wireshark/wireshark-window.jpg) .  

Congratulations, you now have ***Wireshark*** installed in your system and running.

### Your first packet capture
We have ***Wireshark*** in our system installed. Let's dive in and start experimenting with its features.  

### 1. Wireshark graphical user interface
From ***Fig 1.2*** above, ***Wireshark*** contains some commonly used menus:
***File, Edit, View, Go, Capture, Analyze, Statistics, Telephony, Wireless, Tools, and Help***.  

We will see the menus below menus:  
- **Start Capturing Packets icon**
- **Stop Capturing Packets icon**
- **Restart Current Capture Icon**

and several other icons that you can hover on and to get to know what they do.  

### 2. Wireshark network interface selection
Usually, when you start a ***Wireshark*** without opening a capture file or starting a capture process, a welcome screen is displayed.  
This window will always display currently opened capture files and the capture available interfaces.  

The first step involves selecting the network interface to capture its data. Remember, that the interfaces are different for different operating systems.  

***Fig 1.3 Network interfaces***

![Network-Interfaces](/engineering-education/introduction-to-wireshark/wireshark-network-interface.jpg)

From the screenshot above, we have 6 interfaces, that we can then choose from.  

Hit on the ***Capture*** button just below the ***Welcome to Wireshark***.  

This prompts you to another window, as seen below.  

***Fig 1.4 Network interfaces 2***

![Network-Interfaces](/engineering-education/introduction-to-wireshark/wireshark-network-interfaces-2.jpg)

Now select any of the interfaces you're presented with. In this example, we're going to explore the UDP Listener option. 

Then, in the far left corner, click on the start button.    

At this stage, you should be able to get an output like the one presented below.  

***Fig 1.5 Network traffic***

![Network-Traffics](/engineering-education/introduction-to-wireshark/wireshark-live-capture.jpg)

In the capture panel above, you should notice that network packet capturing is in sequential order, with each line representing each packet captured.  

The details, with rows and columns, are displayed in tabular form. Each row represents the collected packet, while additional information such as time, protocols, duration, et cetera is given in columns. It would be best if you referred to the above screenshot.   

Let's have a look at these columns and what type of information they provide us with.  

- ***No*** - Represents a specific sequence number of the network packet. To classify a given packet, one can use this.  
- ***Time*** - This is the time that a specific packet has been recorded.  
- ***Source*** - This represents where we are getting the packets from. This is denoted as Internet Protocols (IP Addresses).
- ***Destination*** - This is used to represent the Internet Protocol(IP Address) where the packet is going.  
- ***Protocol*** - This refers to the protocol of the data you have captured. This could be ***TCP, ARP et cetera***
- ***Length***- This is used to represent the size of the packet captured.
- ***Info*** - This gives you additional information about the packet you have captured.  

*NOTE: Each protocol is represented with its color scheme. In our case, for example, the ***TCP*** protocol has a ***#cccccc*** background.  This helps the user to differentiate between these protocols easily.*  


Congratulations, you have just successfully captured network packets, and that's how user-friendly ***Wireshark*** is. 

### Packet details panel
Now that we can capture some data, try to click on a single row, and you will notice that some data is being displayed on the immediate window.  

***Fig 1.5 Packet details***

![Single-Packet-Details](/engineering-education/introduction-to-wireshark/wireshark-single-packet-details.jpg)

On the highlighted protocol, click on it to get more details about this SSDP protocol as shown below:  

***Fig 1.6 More on packet details***

![Protocol-details](/engineering-education/introduction-to-wireshark/wireshark-protocol-details.jpg)

The information above tells us more about the packet captured, including the device used. This data is critical, especially in system hacks, where they can be collected for forensics.  

### Packet bytes panel
Remember when you clicked a given row from the packet details above, you could get details on the window on ***fig 1.6*** above. 

Consequently, this caused the window below ***Fig 1.6*** to be updated as well.  

Let's take a looks.

***Fig 1.7 Bytes details***

![bytes-panel](/engineering-education/introduction-to-wireshark/wireshark-bytes-panel.jpg)

A closer look at this screenshot, the numbers are in bytes. This is the exact format of the data dump when the packet is captured.  

### Conclusion
In this tutorial, we worked on ***Wireshark***, going over a quick overview on how to get started with this amazing tool.

We have also seen how we can install ***Wireshark*** in a Linux-based system and perform various tasks such as dumping the packet streams.

We will explore more in our next tutorial as we discuss more advanced features of ***Wireshark***.

Happy coding.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
