### Introduction 
The Raspberry Pi Wi-Fi Extender is a low cost and high-power device that can help extend your Wi-Fi network range. It mainly establishes its network connection from a Wi-Fi adapter. A wifi extender is important in cases where the network is not strong enough past certain ranges. This extender can be used in small areas such as an office or home.

### Table of Contents
- [Introduction](#introduction)
- [prerequisites](#prerequisites)
- [Getting Started with Raspberry Pi as a WiFi extender](#getting-started-with-raspberry-pi-as-a-wifi-extender)
- [Conclusion](#conclusion)
- [Relevant Sources](#relevant-sources)

### Prerequisites
1. Raspberry Pi 3
2. Power cable 
3. Wi-Fi adapters
4. Raspberry Pi Case (optional)

### Getting Started with Raspberry Pi as a WiFi extender

To create the Raspberry Pi Wifi Extender, you are require to make use of the dnsmasq package. This package is important as it takes care of majority of the technical work for you by functioning as both your DNS and DHCP server, that are needed to form a connection. You'll also need to install the hostapd package that allows you to turn one of the Wi-Fi modules into an access point. It is essential to have a Wi-Fi router that is active for you to make a connection as well as an Ethernet device for bridging the connection.

#### Step One: Updating the Raspberry Pi  

Before installing the packages, an update should be run on the Raspberry Pi using the commands below into the terminal;

```sudo apt-get update```

```sudo apt-get upgrade```

![Package Upgrade](/setting-up-a-wifi-extender-using-a-raspberry-pi/updating_packages.png)
 
#### Step Two: Installation of the dnsmasq and hostapd packages

Install the dnsmasq and hostapd packages. This is by running the following commands respectively;

```sudo apt-get install dnsmasq```

![DNS MASQ](/setting-up-a-wifi-extender-using-a-raspberry-pi/dnsmasq.png)
 
```sudo apt-get install hostapd```

![HOSTAPD](/setting-up-a-wifi-extender-using-a-raspberry-pi/hostapd.png)
 
#### Step Three: Setting up dhcpcd

Set up the dhcpcd to assign the Raspberry Pi a static IP address. This can be successfully done by changing the dhcpcd.conf file using the command indicated below;

```sudo nano /etc/dhcpcd.conf```

#### Step Four: Setting up the wlan1 connection  

1. Add the lines below to set up the wlan1 connection as required.

```interface wlan1```

```static ip_address=192.168.220.1/24```

```static routers=192.168.220.0```

2. Use ```CTRL+X```, press ```Y``` then ```Enter``` to save the new configuration.

![SETTING UP WLAN CONNECTION](/setting-up-a-wifi-extender-using-a-raspberry-pi/step4.png)
 
#### Step Five: Restarting dhcpcd service 

1. Restart your dhcpcd service to ensure all configuration changes are loaded. 

```sudo service dhcpcd restart ```

![DHCPCD RESTART](/setting-up-a-wifi-extender-using-a-raspberry-pi/step5.png)
 
#### Step Six: Modification of the hostapd configuration

1. To modify the hostapd configuration, edit the file for config using the command;

```sudo nano /etc/hostapd/hostapd.conf```

2. This is where we set up how to communicate and interact with the wlan device by changing the following lines:

 ssid= “ ”

wpa_passphrase=” ”

#### Step Seven: Adjust the hostapd configuration files

1. Adjust the hostapd files in ```/etc/default/ and /etc/init.d/``` as they are what the hostapd will read to check for the new configuration file that had been previously created. For editing the files, run;

```sudo nano /etc/default/hostapd```

2. Find the line below;

```#DAEMON_CONF=""```

and substitute it with:

``` DAEMON_CONF="/etc/hostapd/hostapd.conf" ```

![MODIFY CONFIG FILE HOSTAPD](/setting-up-a-wifi-extender-using-a-raspberry-pi/step7a.png)
 
3. Edit the other configuration line that is located within the init.d folder by using;

```sudo nano /etc/init.d/hostapd```

4. Find and substitute the line;

```#DAEMON_CONF=```

Replace:

```DAEMON_CONF=/etc/hostapd/hostapd.conf```

![MODIFY CONFIG FILE HOSTAPD](/setting-up-a-wifi-extender-using-a-raspberry-pi/step7b.png)
 
#### Step Eight: Setting up dnsmasq 

Set up the dnsmasq before editing its configuration. Move the default configuration to a new location using;

```sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig```

#### Step Nine: Creation of a configuration file

1. Create and edit your new configuration file using: 

```sudo nano /etc/dnsmasq.conf```

2. Add the lines below into the new file to help communicate with the dnsmasq service and tell it how to deal with all connections being made. 

*interface=wlan1       # Use interface wlan1*  

*listen-address=192.168.220.1   # Specify the address to listen on*

*bind-interfaces      # Bind to the interface*

*server=8.8.8.8       # Use Google DNS*

*domain-needed        # Don't forward short names*

*bogus-priv           # Drop the non-routed address spaces*

*dhcp-range=192.168.220.50,192.168.220.150,12h # IP range and lease time*

![CREATING CONFIG FILE](/setting-up-a-wifi-extender-using-a-raspberry-pi/step9.png)
 
#### Step Ten: Configuration of the Raspberry Pi 

1. Configure the raspberry pi for it to forward the traffic from your wlan1 connection over to wlan0 connection. To successfully do this, it is important to edit Raspberry Pi using the sysctl.conf confugration file using;

```sudo nano /etc/sysctl.conf```

Find the following and eliminate the hashtag at the start;
Find:

```#net.ipv4.ip_forward=1```

Remove the # sign

```net.ipv4.ip_forward=1```

![ENABLE PACKET FORWARDING](/setting-up-a-wifi-extender-using-a-raspberry-pi/step10.png)
 
#### Step Eleven: Activation of the Pi

Activate the raspberry Pi by running the command below;

```sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"```

#### Step Twelve: Forwarding of traffic

1. Configure the NAT between the wlan0 and wlan1 interface as a way of forwarding the traffic from your access point to the Ethernet connection. Add new rules to the iptable and save them using the following commands respectively;

```sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE ```

```sudo iptables -A FORWARD -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT```

```sudo iptables -A FORWARD -i wlan1 -o wlan0 -j ACCEPT```

To save;

```sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"```

![SAVING RULES](/setting-up-a-wifi-extender-using-a-raspberry-pi/step12.png)
 
2. Now we have to set up the Raspberry Pi so that it can load this file every time it loads using the following command:

```sudo nano /etc/rc.local```

Add the line ```iptables-restore < /etc/iptables.ipv4.nat``` above ```exit 0``` which ensures that setting are loaded from ```iptables.ipv4.nat``` file then into iptables.

![RC.LOCAL](/setting-up-a-wifi-extender-using-a-raspberry-pi/step12b.png)
 
3. Restart the two service:

```sudo service hostapd start```

```sudo service dnsmasq start ```

![RESTART SERVICE](/setting-up-a-wifi-extender-using-a-raspberry-pi/restartservice.png)
 
#### Step Thirteen: Restart the Raspberry
Use the following command:

```sudo reboot ```

### Conclusion 

To ensure that the Raspberry Pi Wi-Fi extender is operating successfully, use any wireless devices to connect to it. Use the SSID and created WPA passphrase that you did set. You can reboot the Raspberry Pi to ensure that it is running well. Improving the speed of your network helps you have a good connection with strong signals.  

### Relevant Sources
- [DIY Raspberry Pi based WiFi extender and repeater](https://www.iottrends.tech/blog/diy-raspberry-pi-based-wifi-extender-and-repeater/)
- [Truly WiFi extender](https://www.hackster.io/mrtejaslol/truly-wifi-extender-762b3e)
- [WiFi extender using raspberry Pi](https://iot4beginners.com/wifi-extender-using-raspberry-pi/)


