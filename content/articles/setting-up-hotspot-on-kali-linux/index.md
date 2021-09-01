###  Setting Up Hotspot On Kali Linux

Kali Linux is considered the best operating system in cyber security implementation by both white hat and black hat hackers.
Each distro of Linux has an intended purpose for implementation.

### Introduction

Kali Linux distro comes with no mobile hotspot ability due to security issues (makes it less vulnerable to attackers), creating a mobile hotspot can only be done by customizing the network configuration.
In this article, we will look into the processes that we will use to create a mobile  hotspot on Kali Linux and other Linux distros like Ubuntu. Throughout this tutorial, we are going to be using Kali Linux to create our hotspot. A person using any other distribution can follow through.

### Prerequisites

You have to be familiar with the Linux family of operating systems.
Introduction to Kali Linux basics and the way to use it can be gotten in the link below.
[Getting started with kali linux](/engineering-education/getting-started-with-kali-linux/)

### Finding wireless drivers

To access the available network drivers, type the following command in the terminal: 
```bash
lspci
```
The above command works only for wireless drivers.
In the case of using a USB adapter use the command shown below:
 ```bash
 lsusb
 ```
 The output is as follows:
 ![Configuration](/engineering-education/setting-up-hotspot-on-kali-linux/Screenshot2.png)
### Installation of the necessary tools
In order to create our hotspot, we need to install the required tools. The first and crucial tool is **hostapd** which acts as the hotspot server.
To install **`hostapd`**, type in the following command:

```bash
 apt-get install hostapd
 ```
The second tool will be **dnsmasq** which will act like the server's **dhcp**.
 To install **`dnsmasq`**, type in the following:
 
```bash
 apt-get install dnsmaq
 ```
Once we're done with the installations, we can now move to the next step.
We shall proceed to check for the just installed processes. If already started, stop those in progress, and deter them from starting during start-up of the system.

Below are the commands used for stopping and disabling updates of the services:

```bash
sudo service hostapd stop
```
```bash
sudo service dnsmasq stop
```
```bash
sudo update-rc.d hostapd disable
```
```bash
sudo update-rc.d dnsmasq disable
```
The output is as follows:

![Configuration](/engineering-education/setting-up-hotspot-on-kali-linux/Screenshot4.png)

 ###  Setting up configuration files
After installing the services, we shall then need to configure the necessary files i.e **`hotspot.sh`**.

We will begin by typing the  command below in our terminal.
```bash
sudo gedit /etc/dnsmasq.conf
```
After running the command, write the code below under **`hotspot.sh`** for configuration:
```
# Only bind it to one interface
bind-interfaces
# Select the interface to use for binding
interface=wlan0
# Select a scope of IP addresses to be used in DHCP leasing

dhcp-range=192.168.1.1,192.168.1.9
```
The preceding step in this stage is performing hostapd configuration. 
In order to perform hostapd configuration, type in the following command in the terminal.
```bash
sudo gedit/etc/hostapd.conf
```
To properly configure **hostapd**, add the the following code to our configuration file:
```
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
You can change  your`SSID` name and password with your desired choice. The above configuration will create a hotspot called *Wi-Fi connection* with  a password.
>N/B:  You can create the configuration file anywhere you want  named  **`hotspot.sh`** using an editor of your choice.

After completing the configuration, we shall stop the running services by  typing in the commands below:
```bash
sudo service dnsmasq stop
```
```bash
sudo service hostapd stop
```
For a wired connection, you will be required to change **ppp0** to **eth0** or any other number.

### Using GUI

In this part, we will be using the graphical interface to do the configurations.
- Go to advanced network settings, click on the gear icon to open it up. Your screen should look like this: 

![Configuration](/engineering-education/setting-up-hotspot-on-kali-linux/Screenshot8.png)
To proceed with our configuration, follow the steps below:
**Step I**: In the window, you click the “+”  button and another window pops up.
In the new window here we are going to do the configuration of your hotspot.
![Configuration](/engineering-education/setting-up-hotspot-on-kali-linux/Screenshot11.png)
**Step II**: Under the network type select “Wi-Fi”.
Ensure your configuration resembles the second screenshot  below

![Configuration](/engineering-education/setting-up-hotspot-on-kali-linux/Screenshot10.png) 
**Step III**: To set a password, click on **“Wi-Fi security ”** and select **“ WPA & WPA2 Personal”**
>N/B: Security being an essential  feature, this type of encryption protection is designed for homes and small office networks and does not need authentication server, also  known as WPA-PSK(pre-shared key). WPA Personal is available on all 3 WPA versions that are; WPA, WPA2, and WPA3) 

and below the input box give an 8 or more memorable digit password of your choice “********” and click on save.

### Conclusion

Finally, you've done it! Close all the opened windows and enjoy your newly created hotspot, share it amongst computers, mobile phones, etc.
