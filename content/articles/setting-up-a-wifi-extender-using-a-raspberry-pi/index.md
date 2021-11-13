---
layout: engineering-education
status: publish
published: true
url: /setting-up-a-wifi-extender-using-a-raspberry-pi/
title: Setting Up a Wi-Fi Extender Using a Raspberry Pi
description: This article will show the reader how to extend their Wi-Fi network range using a Raspberry Pi.
author: eunice-wanjiku
date: 2021-10-16T00:00:00-04:00
topics: [Networking]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/hero.jpg
    alt: WiFi Extender Raspberry Pi Hero Image
---
A wifi extender is important in cases where the network is not strong enough past certain ranges. This extender can be used in small areas such as an office or home.
<!--more-->
The Raspberry Pi Wi-Fi Extender is a low-cost and high-power device that can help extend your Wi-Fi network range. It mainly establishes its network connection from a Wi-Fi adapter. A Wi-Fi extender is important in cases where the network is not strong enough past certain ranges. This extender can be used in small areas such as an office or home.

### Table of contents
- [Prerequisites](#prerequisites)
- [Extending the Wi-Fi using Raspberry](#extending-the-wi-fi-using-raspberry)
- [Conclusion](#conclusion)
- [Relevant Sources](#relevant-sources)

### Prerequisites
- Raspberry Pi 3
- Power cable
- Wi-Fi adapters
- Raspberry Pi Case (optional)

### Extending the Wi-Fi using Raspberry
To create a Wi-Fi extender using a Raspberry Pi, the `dnsmasq` package in Linux is used. This package is important as it takes care of the majority of the technical work for you by functioning as both your DNS and DHCP server, that are needed to form a connection.

You'll also need to install the `hostapd` package that allows us to create the extender. It is essential to have a Wi-Fi router that is active for you to make a connection as well as an Ethernet device for bridging the connection.

#### Step One: Updating the Raspberry Pi
Before installing the packages, you should perform an update: `sudo apt-get update` and `sudo apt-get upgrade`.

![Package Upgrade](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/updating_packages.png)

#### Step Two: Installation of the dnsmasq and hostapd packages
Install the `dnsmasq` and `hostapd` packages using these commands:

`sudo apt-get install dnsmasq`

![dnsmasq](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/dnsmasq.png)

`sudo apt-get install hostapd`

![hostapd](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/hostapd.png)

#### Step Three: Open the dhcpcd.conf
This can be achieved using this command: `sudo nano /etc/dhcpcd.conf`

#### Step Four: Setting up the wlan1 connection
1. Add the lines below to set up the wlan1 connection as required.

```bash
interface wlan1
static ip_address=192.168.5.1/24
static routers=192.168.5.0
```

2. Use `CTRL + X`, press `Y` then `Enter` to keep configurations.

![Setting Up WLAN Connection](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/step4.png)

#### Step Five: Restarting dhcpcd service
1. Restart your dhcpcd service to ensure all configuration changes are loaded.

`sudo service dhcpcd restart`

![dhcpcd Restart](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/step5.png)

#### Step Six: Modification of the hostapd configuration
1. To modify the hostapd configuration;

`sudo nano /etc/hostapd/hostapd.conf`

2. Here we dictate how we can communicate and interact with the WLAN device by changing the following lines:

```bash
ssid= " " //here you enter the name of the Wi-Fi

wpa_passphrase=" " //here you enter the password of the Wi-Fi
```

![hostapd.conf](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/hostapd-config.png)

#### Step Seven: Adjust the hostapd configuration files
1. Open the following files:

``` bash
/etc/default/
/etc/init.d/
```

Using nano editor: `sudo nano /etc/default/hostapd`

2. Look for `#DAEMON_CONF=""` and then substitute it using:

`DAEMON_CONF="/etc/hostapd/hostapd.conf"`

![Modify Hostapd Config File Part 1](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/step7a.png)

3. Open the other configuration file in init.d using: `sudo nano /etc/init.d/hostapd`

4. Look for `#DAEMON_CONF=` and replace using `DAEMON_CONF=/etc/hostapd/hostapd.conf`

![Modify Hostapd Config File Part 2](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/step7b.png)

#### Step Eight: Change directory of the dnsmasq.conf

First, change the directory of the configuration using: `sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig`

#### Step Nine: Creation of a new dnsmasq.conf configuration file

1. Create a new conf file using: `sudo nano /etc/dnsmasq.conf`

2. Type the following into the new file to help communicate with the dnsmasq service and tell it how to deal with all connections being made.

```bash
interface=wlan1 # Specification of interface
listen-address = 192.168.5.1 # Specification of listening address
bind-interfaces # Binding interface
server=8.8.8.8 # Setting up Google DNS
domain-needed # Limit forwarding of names that are not domain names
bogus-priv # Drop the non-routed address spaces
dhcp-range=192.168.5.50,192.168.5.150,12h # IP range and lease time
```

![Creating dnsmasq config file](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/step9.png)

#### Step Ten: Traffic forwarding configuration
Next, we configure the Raspberry Pi to forward the traffic so that it works like a router. This can be achieved using: `sudo nano /etc/sysctl.conf`.

Find and eliminate # sign at the beginning (Uncomment): `#net.ipv4.ip_forward=1`

![Enable Packet Forwarding](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/step10.png)

#### Step Eleven: Activation of IP forwarding on the Pi
Activate the Raspberry Pi using the command below: `sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"`

Note: You may reboot at this point in order to apply the settings:

#### Step Twelve: NAT configuration
Configure the NAT between the wlan0 and wlan1 interface as a way of forwarding traffic using:

```bash
sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
sudo iptables -A FORWARD -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan1 -o wlan0 -j ACCEPT
```

To save: `sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"`

![Saving Rules](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/step12.png)

Now we have to ensure that our configuration is be loaded locally every time the Raspberry Pi boots up First, open `rc.local` using: `sudo nano /etc/rc.local`. Then insert `iptables-restore < /etc/iptables.ipv4.nat` above `exit 0`

![rc.local](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/step12b.png)

3. Restart the two services:

```bash
sudo service hostapd start
sudo service dnsmasq start
```

![Restart Services](/engineering-education/setting-up-a-wifi-extender-using-a-raspberry-pi/restartservice.png)

#### Step Thirteen: Restart the Raspberry Pi
Finally, run the following command: `sudo reboot` to restart the Raspberry Pi. To test it works, use any wireless devices to connect to it using the Wi-Fi network name and password you created.

### Conclusion
Congratulations. You've turned your Raspberry Pi into a Wi-Fi extender which will help boost your Wi-Fi signal further.

### Relevant Sources

- [DIY Raspberry Pi based WiFi extender and repeater](https://www.iottrends.tech/blog/diy-raspberry-pi-based-wifi-extender-and-repeater/)
- [WiFi extender using raspberry Pi](https://iot4beginners.com/wifi-extender-using-raspberry-pi/)
- [Turn a Raspberry Pi into a Wi-Fi access point or repeate](https://www.balena.io/blog/turn-a-raspberry-pi-into-a-wi-fi-access-point-or-repeater/)

---

Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
