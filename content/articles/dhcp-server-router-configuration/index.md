---
layout: engineering-education
status: publish
published: true
url: /dhcp-server-router-configuration/
title: Understanding DHCP Server Router Configuration
description: This article will show how we can configure a router to act as a DHCP server.
author: samuel-otieno
date: 2021-08-01T00:00:00-05:19
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dhcp-server-router-configuration/hero.jpg
    alt: Cisco Router DHCP example image
---
Network administrators have automated configuring and assigning IP addresses to the network devices by using the DHCP servers and their protocols. The dedicated servers are scalable and easy to manage but are costly for an organization to have one at every point in a network. In such situations, we can configure routers on the network to provide the DHCP services without the need of having to buy the servers.
<!--more-->
This article will cover how one can use the routers on the network to act as DHCP servers in assigning and managing the IP addresses to various DHCP clients. It will also equip the reader how one can configure the router to able to depict the functionalities of a DHCP server.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Terminologies](#terminologies)
- [Steps in Configuring Cisco IOS DHCPv4 Server](#steps-in-configuring-cisco-ios-dhcpv4-server)
  - [Step 1. Router Configurations](#step-1-router-configurations)
  - [Step 2. Create a DHCP server pool](#step-2-create-a-dhcp-server-pool)
  - [Step 3. Exclude IP addresses](#step-3-exclude-ip-addresses)
- [DHCP Server Verification](#dhcp-server-verification)
- [DHCP Server Router Testing](#dhcp-server-router-testing)
- [Conclusion](#conclusion)

### Prerequisites
The reader must put the following into consideration:

- The reader should know basic networking concepts.
- Good understanding of how to configure networks using any of the network simulation tools.
This article suits a reader who wants to know how to work with the Cisco packet tracer network simulator tool.

To download and install the Cisco packet tracer on a desktop or laptop, visit [this link](https://www.computernetworkingnotes.com/ccna-study-guide/download-packet-tracer-for-windows-and-linux.html).

### Terminologies
- `DHCP Server` is a network server used for leasing IPv4 addresses dynamically to hosts on extensive networks, reducing the burden on the network staff and virtually eliminating entry errors. It relies on the Dynamic Host Configuration Protocol (DHCP) to respond to broadcast queries from the DHCP clients.

- `DHCP Clients` - These are the hosts/devices on the network that get the IP Addresses from the server through the DHCP protocol.

- `Excluded IP Addresses` - These are addressing specifically reserved to the key hosts like the default gateways, DNS-server. Excluding some of the IP addresses prevents the situation where the DHCP clients are assigned an IP address that is already in use by the other key hosts on the network, preventing IP address duplication.

- `DHCP POOL` - DHCP pools act as a built-in server on the network subnets in which they assign the clients the addresses. The pools can support up to 2048 addresses.

### Steps in Configuring Cisco IOS DHCPv4 Server
Consider the local network connection below.

![LAN Configuration](/engineering-education/dhcp-server-router-configuration/dhcp-server-connection.jpg)

#### Step 1. Router Configurations.
We configure the routers to be used as the DHCP server by statically assigning the IPv4 addresses to their various interfaces.

```bash
Router>en
Router#config terminal
Router(config)#hostname R1         !changing our hostname
R1(config)#interface g0/0           !specifying which interface to assign ip address
R1(config-if)#ip address 10.0.0.1 255.0.0.0       !assigning ip address to interface g0/0
R1(config-if)#no shutdown                  !activating the interface
R1(config-if)#exit
R1(config)#interface g0/1
R1(config-if)#ip address 192.168.1.100 255.255.255.0
R1(config-if)#no shutdown
R1(config-if)#
R1(config-if)#exit
R1(config)#do write
```

```bash
Router>en
Router#config terminal
Router(config)#hostname R2
R2(config)#interface g0/0
R2(config-if)#ip address 10.0.0.2 255.0.0.0
R2(config-if)#no shutdown
R2(config-if)#exit
R2(config)#interface g0/1
R2(config-if)#ip address 193.168.2.1 255.255.255.0
R2(config-if)#no shutdown
R2(config-if)#do write
Building configuration...
```

We now configured the interfaces with IP addresses both on R1 and R2.

```bash
R1#show ip interface brief   !shows interface status
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     10.0.0.1        YES manual up                    up 
GigabitEthernet0/1     192.168.1.100   YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down

R2#show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     10.0.0.2        YES manual up                    up 
GigabitEthernet0/1     193.168.2.1     YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down
```

#### Step 2. Create a DHCP server pool
Use of `ip dhcp pool` command followed by the pool name creates two pools POOL-A on router R1 and POOL-2 on router R2. This includes configuring the network addresses, default gateway, and the IP address of the DNS server.

```bash
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#ip dhcp pool POOL-A          !pool creation
R1(dhcp-config)#?                       !get more details about pools
  default-router  Default routers
  dns-server      Set name server
  domain-name     Domain name
  exit            Exit from DHCP pool configuration mode
  network         Network number and mask
  no              Negate a command or set its defaults
  option          Raw DHCP options
R1(dhcp-config)#default-router 192.168.1.100          !ip address of default router
R1(dhcp-config)#dns-server 192.168.1.50                !ip address of dns-server
R1(dhcp-config)#network 192.168.1.0 255.255.255.0        !ip address of the default gateway/network
R1(dhcp-config)#exit
R1(config)#
R1(config)#do write              !saving the configurations
Building configuration...
[OK]
```

```bash
R2(config)#
R2(config)#ip dhcp pool POOL-B
R2(dhcp-config)#?
  default-router  Default routers
  dns-server      Set name server
  domain-name     Domain name
  exit            Exit from DHCP pool configuration mode
  network         Network number and mask
  no              Negate a command or set its defaults
  option          Raw DHCP options
R2(dhcp-config)#default-router 192.168.2.100
R2(dhcp-config)#network 192.168.2.0 255.255.255.0
R2(dhcp-config)#dns-server 192.168.2.50
R2(dhcp-config)#exit
R2(config)#do write
Building configuration...
```

#### Step 3. Exclude IP addresses
In our network, we must exclude the IP addresses on the R1 and R2 interfaces, together with the other 9 addresses to be used for static assignment to other devices like servers and device management interfaces.

```bash
R1(config)#ip dhcp excluded-address 192.168.1.100
R1(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.10
R1(config)#ip dhcp excluded-address 192.168.1.50
R1(config)#do write
```

```bash
R2(config)#
R2(config)#ip dhcp excluded-address 192.168.2.100
R2(config)#ip dhcp excluded-address 192.168.2.1 192.168.2.10
R2(config)#ip dhcp excluded-address 192.168.2.50
R2(config)#exit
```

### DHCP Server Verification
To confirm that our DHCP server is configured on the two routers, `show running-config | section DHCP` command is used. The output is as shown below, which confirms the routers can now perform the functionalities of assigning IP addresses dynamically to the network clients.

```bash
R2#show running-config | section dhcp
ip dhcp excluded-address 192.168.2.100
ip dhcp excluded-address 192.168.2.1 192.168.2.10
ip dhcp excluded-address 192.168.2.50
ip dhcp pool POOL-B
 network 192.168.2.0 255.255.255.0
 default-router 192.168.2.100
 dns-server 192.168.2.50
```

>**NOTE: The dhcp server can be disabled using `no service dhcp` command and re-enabled using `service dhcp` command in the global configuration mode.**

### DHCP Server Router Testing
Once we have confirmed the routers have now configured to act as DHCP servers, we can test their functionalities by trying to assign Ip addresses to the clients. From our network, we have 4 PCs acting as the clients. Before the configurations, the router configured as the DHCP server could not assign the PCs the address dynamically, the DHCP failed as shown.

![Failed DHCP Configuration](/engineering-education/dhcp-server-router-configuration/fail-dhcp.jpg)

After the configuration, we'll try again to assign each client an IP address by selecting the DHCP option on the IP configuration interface window. The DHCP works successfully. This shows our routers are now DHCP enabled.

![Success DHCP Configuration](/engineering-education/dhcp-server-router-configuration/success-dhcp.jpg)

We can also try to test the communication between two clients on the same subnet using the `ping` command. Our network, PC5 can communicate with PC4 using the assigned IP addresses as shown.

![Ping Network Configuration](/engineering-education/dhcp-server-router-configuration/ping-dhcp.jpg)

>**NOTE: From the IP addresses assigned it is evident that the DHCP server assigned addresses from .11 excluding the IP addresses from .1 to .10 and .50 which were among the excluded addresses.**

### Conclusion
As we have seen, network routers can save the organization the cost of buying dedicated servers by providing the DHCP server functionality when configured properly. This information is crucial and will equip the learner with the knowledge of how to configure the routers to eliminate the burden of statically assigning IP addresses.

To summarize:
- We learned what a DHCP server is.

- We explored how to use a router to act as a DHCP server.

- We configured a network, verified and configured the routers to perform the DHCP server functions.

- We learned how to enable and disable the DHCP server on the network.

One can find more information about  DHCP-router configuration [here](https://www.cisco.com/en/US/docs/ios/12_4t/ip_addr/configuration/guide/htdhcpsv.html).

Happy coding.

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
