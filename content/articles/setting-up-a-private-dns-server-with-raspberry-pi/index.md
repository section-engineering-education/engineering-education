### Introduction

In order for computers to speak with one another over the web, all participants within the network must have an IP address: Through these addresses, computers recognize precisely which servers/devices they are communicating with. However, it can be difficult to remember IP addresses and hence the need for DNS servers. Domain Name Systems (DNS) changes domain names into IP addresses. A DNS is like a phone book of web addresses that makes access to pages faster. 

### Table of Contents
- [How DNS servers work](#how-dns-servers-work)
- [Functions of a DNS](#functions-of-a-dns)
- [Prerequisites](#prerequisites)
- [Turning Raspberry Pi into a DNS Server](#turning-raspberry-pi-into-a-dns-server)
- [Conclusion](#conclusion)

### How DNS servers work

Devices question one or more DNS servers to get access to the correct domain name – IP address translation, a process that can be time-consuming. It would therefore be very helpful to shorten the time spent on this process by having a private and dedicated DNS server. A Raspberry Pi, which is small but can be used for various purposes would be very useful in such a scenario.

### Functions of a DNS

Below are three major benefits that a private Domain Name System would offer:
- *Speed* – a query to the web may sometimes have to pass through various servers and routers before the user can get access to a web page. This time is mostly in milliseconds. However, when a private DNS is set up, this query does not have to pass through the various server and hence the delivery time will be shorter and more efficient.
- *Privacy* – in order to gain access to the correct domain name, information from a device has to be sent to an outside server which in turn creates a trail over the internet as opposed to when a private DNS is used and information does not have to leave the internal network.
- *Security* – hosting a private DNS server offers increased privacy because the owner gets full control over entries. This in turn protects the server from malicious entries that could be facilitated by hackers.

### Prerequisites

1.	Raspberry Pi (2-4) with Raspbian OS
2.	Access to internet
3.	MicroSD card
4.	Terminal access

### Turning Raspberry Pi into a DNS Server 

#### Step 1: Update Packages

It is always important to start by updating the Linux packages available in your raspberry PI
sudo apt update
sudo apt upgrade

![ Updating Packages](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/update.png) 

#### Step 2: Install DNSMasq
The next step is the installation of DNSMasq utility, which is essential to set up this server.
sudo apt install dnsmasq
 
![ Install DNSMasq ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/install_dnsmasq.png)

#### Step 3: DNSMasq Configuration

This step is designed to ensure the best performance of the DNS server.
1.	Use the command below to edit dnsmasq.conf file using nano editor
sudo nano /etc/dnsmasq.conf
2.	Use CTRL+W to search and remove the # sign in front of the following lines:
•	domain-needed – it makes sure that the DNS server does not forward any incorrect domain names. This checks for names that do not have a dot and keeps them in the local network.
•	bogus-priv – prevents the server from forwarding queries within local ranges of IP to upstream servers which serve as a security feature that prevents leaking of local IPs to upstream servers. 
•	no-resolv – tells the DNS server to use the DNSMasq for address resolution instead of /etc/resolv.conf .

3.	Use CTRL+W and delete the line below: 
#server=/localnet/192.168.0.1
 
![ Edit Server ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/editconf_file.png)

Instead, put these below:
server=8.8.8.8
server=8.8.4.4
The step above ensure that google DNS servers are used as the upstream servers.
4. Use CTRL+W to look for the following line:
#cache-size=150
 
![ Edit Cache ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/editcache.png)

Remove the # sign and then change the cache size to 1000:
cache-size =1000
Changing the size of cache to a bigger number helps reduce the response time by saving more DNS request responses hence improving performance.

5. Use CTRL+X to save the file then use Y to accept the changes.
6. Restart the DNSMasq using the command below: 
sudo systemctl restart dnsmasq
7. check the status of the server using the command below:
sudo systemctl standing dnsmasq
 
![ Restart and Checking Status ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/status.png)

#### Step 4: DNS Server testing

1. The server is tested using the dig command.
dig <domain> @localhost
For instance:
dig section.io/kb @localhost
 
![ DNS Testing ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/responsetime1.png)

2. Check the response time taken by the query.

3. Run the command again.
You will notice the time reduces because the address is cached.
 
![ DNS Testing ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/responsetime2.png)

#### Step 5: Configure your laptop to use the setup DNS Server

1.	Find out the IP address of the raspberry PI by using the ifconfig command.
 
![ IFCONFIG ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/ipaddress.png)

2.	Set this IP address as the DNS server on devices.
 
![Setting DNS ](/engineering-education/setting-up-a-private-dns-server-with-raspberry-pi/setdns.png)

### Conclusion

The network speed can be highly utilized by using a raspberry PI by caching the addresses and in turn reduces the DNS query response time. Considering that a DNS server is one of the targets for cybercriminals, it is important to keep it as secure as possible. It is therefore important to ensure that the server receives automatic updates. The command sudo apt install unattended-upgrades –y can be used to configure unattended-upgrades.

### Relevant Resources
- [How to Use a Raspberry Pi as a DNS Server](https://www.deviceplus.com/raspberry-pi/how-to-use-a-raspberry-pi-as-a-dns-server/)
- [How to use your Raspberry Pi as a DNS Server (And Speed Up Internet)](https://raspberrytips.com/raspberry-pi-dns-server/)
- [Using my Raspberry PI as a Tiny DNS Server](https://samraza.medium.com/using-my-raspberry-pi-as-a-tiny-dns-server-83dc66fabc91)