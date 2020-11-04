# How To Use Nmap To Scan Networks

![Hacker](/engineering-education/how-to-use-nmap-to-scan-networks/hero.jpg)

Nmap is a scanning tool used by penetration testers. In this article, we will learn about Nmap and some of its commands.

## What is Nmap?

Nmap is short for Network Mapper. It is an open-source tool that has features to perform port scanning, OS detection, ping sweeps, and version detection.

Gordon “Fyodor” Lyon released Nmap in 1997. Nmap was built initially as a command‐line tool. It also has a graphical user interface (GUI), called Zenmap. There are over 100 command‐line options in Nmap, and some of these were never fully documented by the author, Gordon Lyon.

## Why use Nmap?

There are several reasons we use Nmap. Below are a few:

* Use for vulnerability scanning.
* It is useful for tasks such as network inventory, managing service upgrade schedules, and monitoring host or service uptime.
* Also, it allows a user to write and implement custom scripts and run that script against their target host. 

## Installing Nmap

To install Nmap is easy but varies according to the operating system.

* For Windows, download [here](https://nmap.org/book/inst-windows.html)
* For Mac, download [here](https://nmap.org/book/inst-macosx.html)
* For Linux, run this command to install Nmap `sudo apt-get install nmap`

## Nmap Port States

Nmap uses six different port states to classify the status of a port scan.

* Open: The open port that is active and responds to an incoming connection.
* Closed: A probe packet is received, but no application is running on the port. A probe packet is an active tool use to collect information on a network.
* Filtered: This port is protected by a firewall making it hard for Nmap to determine if the port is open or closed.
* Unfiltered: A port is accessible, but Nmap can't determine if the port is open or closed.
* Opened/filtered: The port is filtered or opened, but it establishes no state.
* Closed/filtered: This port is hard to determine if it's closed or filtered.

## Nmap Scan Types

There are a variety of scans performed by Nmap.

* Transmission Control Protocol (TCP) Scan: This is the most reliable scan. It is used to see if the port is active or listening.
* User Datagram Protocol (UDP) Scan: UDP scans, like TCP scans, send a UDP packet to various ports on the target host and evaluate the response packets to determine the availability of the service on the host.
* SYN Stealth: It is also called a half-open scan because TCP requires a three-way handshake to be complete before a connection is established. 
* FIN Stealth, Xmas, Tree & Null: To perform a deeper scan, Nmap provides an option with different flags, such as FIN, PSH, and URG. If no flags are set, then it is called a Null scan. If FIN flags are set, then it is called a FIN scan, and if all three flags are set, then it is called an Xmas scan.

*NB:Before we move any further, you should take note of these TCP header flags*
- SYN - Synchronize
- ACK - Acknowledgment
- PSH - Push
- URG - Urgent
- RST - Reset
- FIN - Finished

## Nmap Commands
Using the Nmap command, you may collect information about the open ports, services, and vulnerabilities available in the network. Let's go through some Nmap commands.

## Basic Scans

Scanning a network is the first step in network mapping.

* Ping Scan: The -sn flag performs a simple ping of the specific target (without scanning any ports).

`nmap -sn [target]`
```
nmap -sn 192.168.1.0/24
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-02 20:12 GMT
Nmap scan report for 192.168.1.1
Host is up (0.0017s latency).
Nmap scan report for 192.168.1.5
Host is up (0.0011s latency).
Nmap scan report for 192.168.1.100
Host is up (0.0020s latency).
Nmap scan report for 192.168.1.101
Host is up (0.010s latency).
Nmap scan report for 192.168.1.105
Host is up (0.0011s latency).
Nmap scan report for 192.168.1.109
Host is up (0.0011s latency).
Nmap scan report for 192.168.1.111
Host is up (0.000066s latency).

Nmap done: 256 IP addresses (7 hosts up) scanned in 2.32 seconds
```

* Scan a Single Target: A target can identify as an IP address or hostname.

`nmap [target]` 
```
nmap scanme.nmap.org/ 74.207.244.221.
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 11:51 GMT
Nmap scan report for scanme.nmap.org (74.207.244.221)
Host is up, received reset (0.30s latency).
Not shown: 997 closed ports
Reason: 997 resets
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
9929/tcp open  nping-echo

 Nmap done: 1 IP address (1 host up) scanned in 3.08 seconds
```

* Scan Multiple Target: The command to use to scan more than one target. 

`nmap [target 1 target2]`
```
nmap 192.168.1.1 192.168.1.109 192.168.1.155
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 19:30 GMT
Nmap scan report for 192.168.1.1
Host is up (0.0012s latency).
Not shown: 994 closed ports
PORT      STATE SERVICE
53/tcp    open  domain
139/tcp   open  netbios-ssn
445/tcp   open  microsoft-ds
548/tcp   open  afp
5009/tcp  open  airport-admin
10000/tcp open  snet-sensor-mgmt

Nmap scan report for 192.168.1.109
Host is up (0.00026s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

 Nmap done: 3 IP addresses (2 hosts up) scanned in 3.85 seconds
```

* Scan a Range of IP Addresses: The command allows a range of a target IP addresses.
`nmap[range]` 
```
nmap 192.168.1.1-100
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 19:32 GMT
Nmap scan report for 192.168.1.1
Host is up (0.00100s latency).
Not shown: 994 closed ports
PORT      STATE SERVICE
53/tcp    open  domain
139/tcp   open  netbios-ssn
445/tcp   open  microsoft-ds
548/tcp   open  afp
5009/tcp  open  airport-admin
10000/tcp open  snet-sensor-mgmt

Nmap scan report for 192.168.1.100
Host is up (0.0029s latency).
Not shown: 996 closed ports
PORT      STATE SERVICE
88/tcp    open  kerberos-sec
3689/tcp  open  rendezvous
5900/tcp  open  vnc
49152/tcp open  unknown

Nmap done: 100 IP addresses (2 hosts up) scanned in 15.48 seconds
```

* Scanning from a file: If you want to scan a large list of IP addresses, you can do it by importing a file with the list of IP addresses. 

`nmap -iL` 
```
Nmap -iL list.text
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 19:42 GMT
Nmap scan report for 192.168.1.1
Host is up (0.00090s latency).
Not shown: 994 closed ports
PORT      STATE SERVICE
53/tcp    open  domain
139/tcp   open  netbios-ssn
445/tcp   open  microsoft-ds
548/tcp   open  afp
5009/tcp  open  airport-admin
10000/tcp open  snet-sensor-mgmt
[...]

Nmap done: 3 IP addresses (3 hosts up) scanned in 22.15 seconds
```

* Aggressive Scanning: The parameter -A performs an aggressive scan. 

`Nmap -A [target]`
```
nmap -A 10.10.4.31
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 09:10 GMT
Nmap scan report for 10.10.4.31
Host is up (0.0031s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE VERSION
80/tcp open  http    3Com switch http config
| http-title: Web user login
|_Requested resource was index.htm
MAC Address: CC:3E:5F:5B:BE:80 (Hewlett Packard)
Device type: switch
Running: H3C Comware 5.X
OS CPE: cpe:/o:h3c:comware:5.20
OS details: H3C Comware 5.20
Network Distance: 1 hop
Service Info: Device: switch

TRACEROUTE
HOP RTT     ADDRESS
1   3.08 ms 10.10.4.31

OS and Service detection performed. Please report any incorrect results at http://nmap.org/submit/ .

Nmap done: 1 IP address (1 host up) scanned in 27.95 seconds
```

## Advanced Scanning 
* TCP SYN Scan: The -sS flag performs a TCP SYN scan. Stealth scanning is slower and not as aggressive as the other types of scanning, so you might have to wait a while to get a response.

` nmap -sS [target]`
```
nmap -sS 10.10.3.1
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 09:45 GMT
Nmap scan report for 10.10.3.1
Host is up (0.14s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https
 
Nmap done: 1 IP address (1 host up) scanned in 0.58 seconds
```

* TCP Connect Scan: The -sT flag performs a TCP connect scan.

`nmap -sT [target]`
```
nmap -sT 10.10.3.1
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 09:52 GMT
Nmap scan report for 10.10.3.1
Host is up (0.048s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https
 
Nmap done: 1 IP address (1 host up) scanned in 1.98 seconds
```

* UDP Scan: The -sU flag performs a UDP scan.

`nmap -sU [target]`

*Note:*
```
nmap -sU 10.10.3.1
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 09:53 GMT
Nmap scan report for 10.10.3.1
Host is up (0.0023s latency).
Not shown: 998 open|filtered ports
PORT    STATE  SERVICE
161/udp open   snmp
162/udp closed snmptrap

Nmap done: 1 IP address (1 host up) scanned in 1.20 seconds
```

* TCP NULL Scan: The -sN flag performs a TCP NULL scan.

`nmap -sN [target]`
```
nmap -sN 10.10.4.85
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 10:05 GMT
Nmap scan report for 10.10.4.85
Host is up (0.00052s latency).
Not shown: 996 closed ports
PORT      STATE         SERVICE
22/tcp    open|filtered ssh
80/tcp    open|filtered http
443/tcp   open|filtered https
17988/tcp open|filtered unknown

MAC Address: D8:9D:67:60:32:57 (Hewlett Packard)

Nmap done: 1 IP address (1 host up) scanned in 7.52 seconds
```

* TCP FIN Scan: The -sF flag performs a TCP FIN scan.

`nmap -sF [target]`
```
nmap -sF 10.10.4.85

Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 10:43 GMT
Nmap scan report for 10.10.4.85
Host is up (0.00052s latency).
Not shown: 996 closed ports
PORT      STATE         SERVICE
22/tcp    open|filtered ssh
80/tcp    open|filtered http
443/tcp   open|filtered https
17988/tcp open|filtered unknown

MAC Address: D8:9D:67:60:32:57 (Hewlett Packard)

Nmap done: 1 IP address (1 host up) scanned in 6.78 seconds
```

* Xmas Scan: The -sX flag performs a Xmas scan.

`nmap -sX [target]`
```
nmap -sX 10.10.4.85
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 10:46 GMT
Nmap scan report for 10.10.4.85
Host is up (0.00053s latency).
Not shown: 996 closed ports
PORT      STATE         SERVICE
22/tcp    open|filtered ssh
80/tcp    open|filtered http
443/tcp   open|filtered https
17988/tcp open|filtered unknown

MAC Address: D8:9D:67:60:32:57 (Hewlett Packard)

Nmap done: 1 IP address (1 host up) scanned in 2.57 seconds
```

* TCP ACK Scan: The -sA option performs a TCP ACK scan.

`nmap -sA [target]`
```
nmap -sA 10.10.4.1 10.10.4.106
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 13:30 GMT
Nmap scan report for 10.10.4.1
Host is up (0.0014s latency).
All 1000 scanned ports on 10.10.4.1 are unfiltered

MAC Address: 00:13:3B:10:54:0E (Speed Dragon Multimedia Limited)

Nmap scan report for 10.10.4.106
Host is up (0.0020s latency).
All 1000 scanned ports on 10.10.4.106 are filtered

MAC Address: 2C:27:D7:42:E7:25 (Hewlett-Packard Company)

Nmap done: 2 IP addresses (2 hosts up) scanned in 4.91 seconds
```

- Verbose Output: The verbose command provides additional information about the scan being performed.

`nmap -v [target]`
```
nmap -v scanme.nmap.org
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-02 11:49 GMT
Initiating Ping Scan at 11:49
Scanning scanme.nmap.org (74.207.244.221) [4 ports]
Completed Ping Scan at 11:49, 1.00s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 11:49
Completed Parallel DNS resolution of 1 host. at 11:49, 0.00s elapsed
Initiating SYN Stealth Scan at 11:49
Scanning scanme.nmap.org (74.207.244.221) [1000 ports]
Discovered open port 22/tcp on 74.207.244.221
Discovered open port 80/tcp on 74.207.244.221
Discovered open port 9929/tcp on 74.207.244.221

Completed SYN Stealth Scan at 11:49, 2.00s elapsed (1000 total ports)

Nmap scan report for scanme.nmap.org (74.207.244.221)

Host is up (0.31s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE

22/tcp   open  ssh
80/tcp   open  http
9929/tcp open  nping-echo

Read data files from: /usr/bin/../share/nmap

Nmap done: 1 IP address (1 host up) scanned in 3.09 seconds

           Raw packets sent: 1188 (52.248KB) | Rcvd: 1185 (47.445KB)
```

* Operating System Detection: The -O parameter allows operating system to be detected.

`nmap -O [target]`
```
nmap -O 10.10.4.40
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 13:20 GMT

Nmap scan report for 10.10.4.40

[...]

MAC Address: 00:60:E0:55:CD:BC (Axiom Technology CO.)

Device type: general purpose

Running: Microsoft Windows XP|2003

OS CPE: cpe:/o:microsoft:windows_xp::sp2 cpe:/o:microsoft:windows_server_2003::sp1 cpe:/o:microsoft:windows_server_2003::sp2

OS details: Microsoft Windows XP SP2 or Windows Server 2003 SP1 or SP2

Network Distance: 1 hop

OS detection performed. Please report any incorrect results at http://nmap.org/submit/ .

Nmap done: 1 IP address (1 host up) scanned in 6.47 seconds
```

* Service Version Detection: The -sV parameter allows service version to be detected.

`nmap -sV [target]`
```
nmap -sV 10.10.4.70
```
Result:
```
Starting Nmap 6.47 ( http://nmap.org ) at 2020-11-01 13:32 GMT
Nmap scan report for 10.10.4.70
Host is up (0.00019s latency).
Not shown: 993 closed ports
PORT     STATE    SERVICE    VERSION
22/tcp   open     ssh        OpenSSH 6.4 (protocol 2.0)
80/tcp   open     http       Jetty 8.1.10.v20130312
443/tcp  open     ssl/http   Jetty 8.1.10.v20130312
513/tcp  filtered login
514/tcp  filtered shell
3260/tcp open     iscsi?
5432/tcp open     postgresql PostgreSQL DB 9.1.5 - 9.1.9

MAC Address: 0C:C4:7A:0B:AB:40 (Unknown)

Service detection performed. Please report any incorrect results at http://nmap.org/submit/ .

Nmap done: 1 IP address (1 host up) scanned in 133.26 seconds
```

* Nmap Help
Nmap has a built-in command that lists all flags and options.
 
`nmap -h`


## Zenmap
Zenmap is the graphical user interface for Nmap. It is an open source software that helps with the running of Nmap.

![Zenmap](/engineering-education/how-to-use-nmap-to-scan-networks/zenmap.jpg)

Zenmap is good for beginners that don't want to go through the command-line interface.

## Nmap Scripting Engine
Nmap Scripting Engine allows user to write custom scripts(using the Lua programming language) to automate networking tasks. Also it provides additional information about the target scan.


### Conclusion
Nmap is used by people with both ethical and malicious intentions. Use extreme caution and make sure you are not using Nmap against systems where written permission is not explicitly provided.

#### Resources
[Nmap Cheat Sheet](http://nmapcookbook.blogspot.com/2010/02/nmap-cheat-sheet.html)
