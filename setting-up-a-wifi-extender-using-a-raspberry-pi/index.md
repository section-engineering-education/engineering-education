### Introduction 
The Raspberry Pi Wi-Fi Extender is a low cost and high-power device that can help extend your Wi-Fi network range. It mainly establishes its network connection from a Wi-Fi adapter. A wifi extender is important in cases where the network is not strong enough past certain ranges. This extender can be used in small areas such as an office or home.

### Table of Contents
- [Introduction](#introduction)
- [prerequisites](#prerequisites)
- [Extending the Wi-Fi using Raspberry](#extending-the-wi-fi-using-raspberry)
- [Conclusion](#conclusion)
- [Relevant Sources](#relevant-sources)

### Prerequisites
1. Raspberry Pi 3
2. Power cable 
3. Wi-Fi adapters
4. Raspberry Pi Case (optional)

### Extending the Wi-Fi using Raspberry

Creating the a Wifi Extender using Raspberry Pi, the dnsmasq package in linux is used. This package is important as it takes care of majority of the technical work for you by functioning as both your DNS and DHCP server, that are needed to form a connection. You'll also need to install the hostapd package that allows us to create the extender. It is essential to have a Wi-Fi router that is active for you to make a connection as well as an Ethernet device for bridging the connection.

#### Step One: Updating the Raspberry Pi  

Before installing the packages, an update should be run;

```sudo apt-get update```

```sudo apt-get upgrade```

![Package Upgrade](/setting-up-a-wifi-extender-using-a-raspberry-pi/updating_packages.png)
 
#### Step Two: Installation of the dnsmasq and hostapd packages

Install the dnsmasq and hostapd packages using these commands:

```sudo apt-get install dnsmasq```

![DNS MASQ](/setting-up-a-wifi-extender-using-a-raspberry-pi/dnsmasq.png)
 
```sudo apt-get install hostapd```

![HOSTAPD](/setting-up-a-wifi-extender-using-a-raspberry-pi/hostapd.png)
 
#### Step Three: Open the dhcpcd.conf

This can be achieved using this commands:

```sudo nano /etc/dhcpcd.conf```

#### Step Four: Setting up the wlan1 connection  

1. Add the lines below to set up the wlan1 connection as required.

```interface wlan1```

```static ip_address=192.168.5.1/24```

```static routers=192.168.5.0```

2. Use ```CTRL + X```, press ```Y``` then ```Enter``` to keep configurations.

![SETTING UP WLAN CONNECTION](/setting-up-a-wifi-extender-using-a-raspberry-pi/step4.png)
 
#### Step Five: Restarting dhcpcd service 

1. Restart your dhcpcd service to ensure all configuration changes are loaded. 

```sudo service dhcpcd restart ```

![DHCPCD RESTART](/setting-up-a-wifi-extender-using-a-raspberry-pi/step5.png)
 
#### Step Six: Modification of the hostapd configuration

1. To modify the hostapd configuration;

```sudo nano /etc/hostapd/hostapd.conf```

2.Here we dictate how we can communicate and interact with the wlan device by changing the following lines:

 ssid= “ ” //here you enter the name of the Wi-Fi 

wpa_passphrase=” ” //here you enter the password of the Wi-Fi

#### Step Seven: Adjust the hostapd configuration files

1. Open the following files:

```/etc/default/```
```/etc/init.d/```

using nano editor:

```sudo nano /etc/default/hostapd```

2. Look for ```#DAEMON_CONF=""```

the substitute it using:

``` DAEMON_CONF="/etc/hostapd/hostapd.conf" ```

![MODIFY CONFIG FILE HOSTAPD](/setting-up-a-wifi-extender-using-a-raspberry-pi/step7a.png)
 
3. Open the other configuration file in init.d using;

```sudo nano /etc/init.d/hostapd```

4. Look for ```#DAEMON_CONF=```

Replace using ```DAEMON_CONF=/etc/hostapd/hostapd.conf```

![MODIFY CONFIG FILE HOSTAPD](/setting-up-a-wifi-extender-using-a-raspberry-pi/step7b.png)
 
#### Step Eight: Change directory of the dnsmasq.conf 

First, change the directory of the configuration using;

```sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig```

#### Step Nine: Creation of a new dnsmasq.conf configuration file

1. Create new conf file using: 

```sudo nano /etc/dnsmasq.conf```

2. Type the following into the new file to help communicate with the dnsmasq service and tell it how to deal with all connections being made. 

*interface=wlan1       #  Specification of interface*  

*listen-address = 192.168.5.1   # Specification of listening address*

*bind-interfaces      # Binding interface*

*server=8.8.8.8       # Setting up Google DNS*

*domain-needed        # Lmit forwarding of names that are not domain names*

*bogus-priv           # Drop the non-routed address spaces*

*dhcp-range=192.168.5.50,192.168.5.150,12h # IP range and lease time*

![CREATING CONFIG FILE](/setting-up-a-wifi-extender-using-a-raspberry-pi/step9.png)
 
#### Step Ten: Traffic forwarding configuration 

1. Configure the raspberry to forward the traffic, that is, it works like a router. This can be achieved using;

```sudo nano /etc/sysctl.conf```

Find and eliminate # sign at the beginning (Uncomment): 

```#net.ipv4.ip_forward=1```


![ENABLE PACKET FORWARDING](/setting-up-a-wifi-extender-using-a-raspberry-pi/step10.png)
 
#### Step Eleven: Activation of IP forwarding on the Pi

Activate the raspberry Pi using command below;

```sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"```

Note: You may reboot at this point in order to appy the settings:

#### Step Twelve: NAT configuration

1. Configure the NAT between the wlan0 and wlan1 interface as a way of forwarding traffic using;

```sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE ```

```sudo iptables -A FORWARD -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT```

```sudo iptables -A FORWARD -i wlan1 -o wlan0 -j ACCEPT```

To save;

```sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"```

![SAVING RULES](/setting-up-a-wifi-extender-using-a-raspberry-pi/step12.png)
 
2. Now we have to ensure that our configuration is be loaded locally every time the Raspberry boots up.
First, open ```rc.local``` using: 

```sudo nano /etc/rc.local```

Insert ```iptables-restore < /etc/iptables.ipv4.nat```

above ```exit 0```

![RC.LOCAL](/setting-up-a-wifi-extender-using-a-raspberry-pi/step12b.png)
 
3. Restart the two service:

```sudo service hostapd start```

```sudo service dnsmasq start ```

![RESTART SERVICE](/setting-up-a-wifi-extender-using-a-raspberry-pi/restartservice.png)
 
#### Step Thirteen: Restart the Raspberry
Use the following command:

```sudo reboot ```

### Conclusion 

To ensure that the Raspberry Pi Wi-Fi extender is operating successfully, use any wireless devices to connect to it. Use the Wi-Fi name and password created to connect. You can reboot your Raspberry Pi to ensure that it is running well. Improving the speed of your network helps you have a good connection with strong signals.  

### Relevant Sources
- [DIY Raspberry Pi based WiFi extender and repeater](https://www.iottrends.tech/blog/diy-raspberry-pi-based-wifi-extender-and-repeater/)
- [WiFi extender using raspberry Pi](https://iot4beginners.com/wifi-extender-using-raspberry-pi/)
- [Turn a Raspberry Pi into a Wi-Fi access point or repeate](https://www.balena.io/blog/turn-a-raspberry-pi-into-a-wi-fi-access-point-or-repeater/)


