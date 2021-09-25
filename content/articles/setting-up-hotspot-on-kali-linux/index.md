---
layout: engineering-education
status: publish
published: true
url: /setting-up-hotspot-on-kali-linux/
title: Setting Up Hotspot On Kali Linux
description: In this tutorial, we will explain how you are going to use Kali Linux to create your hotspot. Kali is a Debian-based Linux distribution used mainly in advanced penetration testing, also known as pen-testing.
author: jacob-muganda
date: 2021-09-24T00:00:00-04:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/setting-up-hotspot-on-kali-linux/hero.jpg
    alt: Setting Up Hotspot on Kali Linux
---
Unlike other operating systems such as Windows, Kali Linux is an open-source operating system. It is considered the best operating system in cyber security implementation by the white hat and black hat hackers.
<!--more-->
Kali is a Debian-based Linux distribution used mainly in advanced penetration testing, also known as pen-testing. It is freely available and accessible to professionals and learners.

Kali Linux has a wide range of features and tools for penetration testing. Each distro of Linux has an intended purpose for implementation; Kali Linux majoring in security.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Finding wireless drivers](#finding-wireless-drivers)
- [Installing the necessary tools](#installing-the-necessary-tools)
- [Setting up configuration files](#setting-up-configuration-files)
- [Using the graphical user interface](#using-the-graphical-user-interface)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you must:
1. Be familiar with the Linux family of operating systems.
2. Be familiar with Kali Linux basics and the way to use it. Refer to this article to [get started with Kali Linux](/engineering-education/getting-started-with-kali-linux/)

### Introduction
In general, it is a nice idea to disable services that you do not use. Kali makes it easy to do this since network services are disabled by default. As long as services remain disabled, they do not pose any security threat.

However, it would be best to be careful when you enable them because it has no firewall by default. So, if they listen on all network interfaces, they are effectively publicly available, making it vulnerable.

Kali Linux distro has mobile hotspot ability disabled. Creating a mobile hotspot can only be done by customizing the network configuration.

This article will look into the processes used to create a mobile hotspot on Kali Linux and other Linux distros such as Ubuntu.

Throughout this tutorial, we are going to be using Kali Linux to create our hotspot. You can use any other Linux distribution of your choice.

### Finding wireless drivers
To access the available network drivers, type the following command in the terminal:

```bash
lspci
```

The command above works only for wireless drivers.

In the case of using a USB adapter, use the command shown below:

```bash
lsusb
```

The output is as follows:

![Drivers](/engineering-education/setting-up-hotspot-on-kali-linux/drivers.png)

### Installing the necessary tools
To create our hotspot, we need to install the required tools. The first and crucial tool is `hostapd`, which acts as the hotspot server.

To install `hostapd`, type in the following command:

```bash
apt-get install hostapd
```

The second tool we will use is **dnsmasq**. It is a lightweight, easily configurable, DNS forwarder designed to provide DNS services to small networks.

It can serve the names of local machines which are not in the global DNS. The DNS server supports both static and dynamic DHCP leases, multiple networks, and IP address ranges. The **dnsmasq** will act as the server to the **DHCP**.

To install `dnsmasq`, type in the following command:

```bash
apt-get install dnsmaq
```

Once done with the installations, we can move to the next step.

We will proceed to check the just-installed processes. If already started, stop those in progress, and deter them from starting during the system's start-up. This is because it turns off the Wi-Fi and turns it into a Wi-Fi hotspot.

Below are the commands used for stopping and disabling updates of the services:

To stop services in progress, we use these two commands:

```bash
sudo service hostapd stop
```

```bash
sudo service dnsmasq stop
```

To disable services already installed, we use these two commands:

```bash
sudo update-rc.d hostapd disable
```

```bash
sudo update-rc.d dnsmasq disable
```

The output is as follows:

![Installations](/engineering-education/setting-up-hotspot-on-kali-linux/installations.png)

### Setting up configuration files
Configuration is vital since it reduces operation tasks, optimizing IP addressing planning, and easily manages user mobility. After installing the services, we will need to configure the necessary files, i.e. **hotspot.sh**.

We will begin by typing the command below in our terminal:

```bash
sudo gedit /etc/dnsmasq.conf
```

After running the command, write the code below under **hotspot.sh** for configuration:

```bash
# Only bind it to one interface
bind-interfaces
# Select the interface to use for binding
interface=wlan0
# Select a scope of IP addresses to be used in DHCP leasing
dhcp-range=192.168.1.1,192.168.1.9
```

The preceding step in this stage involves performing `hostapd ` configuration. To perform this configuration, type in the following command in the terminal:

```bash
sudo gedit/etc/hostapd.conf
```

To properly configure **hostapd**, add the following code to our configuration file:

```bash
# Set interface
interface=wlan0
# Set driver to
driver=nl80211
# Set your desired ssid(Wi-Fi name)
ssid=Wi-FiConnection
# Set the access point hardware mode to 802.11g
hw_mode=g
# Select WIFI channel
 channel=6
# Ensure to enable only WPA2
wpa_passphrase=Wi-Fi connection
```

In the code above, `wlan0` is your Wi-Fi card. WLAN stands for Wireless Local Area Network. The number 0 is the number allocated to the card. This is because the number of cards starts from zero and goes up (0,1,2,3, etc...).

You can change your `SSID` name and password with your desired choice. The above configuration will create a hotspot called a _Wi-Fi connection_ with a password.

> Note: You can create the configuration file anywhere you want, naming it as `hotspot.sh` using an editor of your choice.

After completing the configuration, we will stop the running services by typing in the commands below:

```bash
sudo service dnsmasq stop
```

```bash
sudo service hostapd stop
```

### Using the graphical user interface
In this part, we will be using the graphical user interface to do the configurations. Go to advanced network settings, click on the gear icon to open it up.

Your screen should look like this:

![Settings](/engineering-education/setting-up-hotspot-on-kali-linux/settings.png)

To proceed with our configuration, follow the steps below:

**Step I**: You click the “+” button in the window, and another window pops up. In this new window, we are going to do the configuration of your hotspot.

![Connection](/engineering-education/setting-up-hotspot-on-kali-linux/connection.png)

**Step II**: Under the network type, select “Wi-Fi”. Ensure your configuration resembles the second screenshot below:

![Security](/engineering-education/setting-up-hotspot-on-kali-linux/security.png)

**Step III**: To set a password, click on **Wi-Fi security** and select **WPA & WPA2 Personal**. Below the input box, key in an eight or more memorable digit password of your choice and click **save**.

Security is an essential feature; this encryption protection is designed for homes and small office networks and does not need an authentication server.

WPA-Personal, also known as WPA-PSK (pre-shared key), is available on all 3 WPA versions, i.e. WPA, WPA2, and WPA3.

You've done it! Close all the opened windows, enjoy your newly created hotspot, and share it amongst computers, mobile phones, etc.

### Conclusion
In this article, you have gained insights for setting up a hotspot on Kali Linux. You are now equipped to set up and manage your personal hotspot on Kali Linux.

Enjoy sharing data via hotspot on Kali Linux!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
