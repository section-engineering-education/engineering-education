---
layout: engineering-education
status: publish
published: true
url: /nmap-network-scanner/
title: Introduction to Nmap  
description: In this tutorial, we will discuss Nmap, this is a tool that is used to scan Networks. We will also discuss how to install Nmap in a Linux distribution and we will perform several scans, including a TCP Scan and a SYN Steal scan.  
author: miller-juma
date: 2021-02-02T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nmap-network-scanner/hero.jpg
    alt: Introduction to Javascript Modules
---
Nmap (network mapper) is the leading security scanning tool used by testers (penetration testers/ethical hackers). In this tutorial, we will discuss the concepts and usage of Nmap along with its most commonly used commands to perform port scans.  
<!--more-->

### What is a Network Mapper?
This is a command-line tool based on a Linux environment used to discover and audit networks, scan, and check vulnerabilities on Internet Protocol (IP) addresses and ports for a given network.  

For instance, if you're a network administrator, an IT manager, or just a security professional in your organization. One of the critical challenges you will face is a battle of getting to know what is running on your network and the kind of security issues/challenges they pose.  

There are several tools (Nmap included) available for Network Administrators to use to monitor their network and get real-time activities on their network from these challenges. 

With this Nmap tool,   

- Network administrator(s) can identify all devices that are running/accessing their systems.
- An administrator can identify all the hosts, computers connected to their network, including the services that they offer.  
- An administrator can scan all the open ports (communication endpoint), giving security a priority, that is, security threat detections.
- An administrator can scan/monitor a single host (a computer connected to the organization network) or thousands of devices connected.

As discussed in the beginning, Nmap is by far the most commonly used network scanning tool. It's a port scanning tool, meaning it gathers information from these ports. This information is commonly known as network packets (consists of control information and user data, i.e., payload), then it's sent to system ports.  

Nmap is a port listener. It can listen for responses in the process. It can determine whether a port is open or closed or filtered in one way or another by the firewall (a system designed to deny unauthorized users access to or from a private network).  

It's a flexible and versatile tool, meaning it can adapt/change to different activities and functions.  

*Note: Port scanning could also be referred to as enumeration or port discovery. We will use these terms interchangeably, while they mean the same thing.*

#### Example 1.1 Simple port scan 'scanme.nmap.org'

```bash

jumamiller@janabi$ nmap scanme.nmap.org
Starting Nmap 7.91 ( https://nmap.org ) at 2021-01-12 08:36 EAT
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.40s latency).
Other addresses for scanme.nmap.org (not scanned): 2600:3c01::f03c:91ff:fe18:bb2f
Not shown: 866 closed ports
PORT      STATE    SERVICE
1/tcp     open     tcpmux
7/tcp     open     echo
22/tcp    open     ssh
42/tcp    open     nameserver
53/tcp    filtered domain
80/tcp    open     http
146/tcp   open     iso-tp0
211/tcp   open     914c-g
306/tcp   open     unknown
366/tcp   open     odmr
407/tcp   open     timbuktu
417/tcp   open     onmux
481/tcp   open     dvs
541/tcp   open     uucp-rlogin
563/tcp   open     snews
593/tcp   open     http-rpc-epmap
668/tcp   open     mecomm

```

### Getting started
Nmap was initially developed to run only on Unix based systems. The Windows version was released in 2000, but with a few limitations including:
- Microsoft dropped the support for raw `TCP/IP socket`, it has proven hard to scan various VPN clients since Nmap supports `ethernet` interfaces only.
- Windows Networking APIs are known to have several deficiencies therefore they are not efficient enough.  
- Scanning your machine from itself has proven hard to execute, hence impossible.

### Nmap installation
In this tutorial, we will be using a Linux based system, 

```bash

jumamiller@janabi$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.1 LTS
Release:    20.04
Codename:   focal

```

You're free to follow along with [MacOs](https://nmap.org/download.html) and [Windows](https://geekflare.com/nmap-on-windows/).

To install Nmap in Ubuntu:  
 
 #### Requirements
- Sudo privileges - you should have the installation rights on the system.
- Access to an Ubuntu terminal (Ctrl + T).  
- An advanced package tool (apt) package manager or snap store.
  
 #### Step 1: Updating package list
 Before installing Nmap in your system, ensure that your software packages are up-to-date by running the following command:

```bash
  sudo apt-get update
```

```bash
jumamiller@OpijaKaeli:~$ sudo apt-get update

[sudo] password for jumamiller: 
Hit:1 http://ke.archive.ubuntu.com/ubuntu focal InRelease                      
Hit:2 http://dl.google.com/linux/chrome/deb stable InRelease                   
Hit:3 http://ke.archive.ubuntu.com/ubuntu focal-updates InRelease              
Hit:4 http://ke.archive.ubuntu.com/ubuntu focal-backports InRelease            
Hit:5 http://ppa.launchpad.net/micahflee/ppa/ubuntu focal InRelease            
Hit:6 https://download.docker.com/linux/ubuntu focal InRelease                 
Hit:7 http://security.ubuntu.com/ubuntu focal-security InRelease
Reading package lists... Done
jumamiller@OpijaKaeli:~$ 

```

#### Step 2: Install Network Mapper (Nmap)
Now that our system is up-to-date run the following command to install Nmap:

```bash
 sudo apt-get install nmap
 ``` 
 The expected output:

```bash
jumamiller@OpijaKaeli:~$ sudo apt-get install nmap
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  libblas3 liblinear4 lua-lpeg nmap-common
Suggested packages:
  liblinear-tools liblinear-dev ncat ndiff zenmap
The following NEW packages will be installed:
  libblas3 liblinear4 lua-lpeg nmap nmap-common
0 upgraded, 5 newly installed, 0 to remove and 241 not upgraded.
Need to get 5,553 kB of archives.
After this operation, 26.3 MB of additional disk space will be used.
Do you want to continue? [Y/n]
```

Press `y` to proceed. 

That should present the following screen:

```bash
Do you want to continue? [Y/n] y
Get:1 http://ke.archive.ubuntu.com/ubuntu focal/main amd64 libblas3 amd64 3.9.0-1build1 [142 kB]
Get:2 http://ke.archive.ubuntu.com/ubuntu focal/universe amd64 liblinear4 amd64 2.3.0+dfsg-3build1 [41.7 kB]
Get:3 http://ke.archive.ubuntu.com/ubuntu focal/universe amd64 lua-lpeg amd64 1.0.2-1 [31.4 kB]
Get:4 http://ke.archive.ubuntu.com/ubuntu focal/universe amd64 nmap-common all 7.80+dfsg1-2build1 [3,676 kB]
Get:5 http://ke.archive.ubuntu.com/ubuntu focal/universe amd64 nmap amd64 7.80+dfsg1-2build1 [1,662 kB]
Fetched 5,553 kB in 34s (162 kB/s)                                             
Selecting previously unselected package libblas3:amd64.
(Reading database ... 213214 files and directories currently installed.)
Preparing to unpack .../libblas3_3.9.0-1build1_amd64.deb ...
Unpacking libblas3:amd64 (3.9.0-1build1) ...
Selecting previously unselected package liblinear4:amd64.
Preparing to unpack .../liblinear4_2.3.0+dfsg-3build1_amd64.deb ...
Unpacking liblinear4:amd64 (2.3.0+dfsg-3build1) ...
Selecting previously unselected package lua-lpeg:amd64.
Preparing to unpack .../lua-lpeg_1.0.2-1_amd64.deb ...
Unpacking lua-lpeg:amd64 (1.0.2-1) ...
Selecting previously unselected package nmap-common.
Preparing to unpack .../nmap-common_7.80+dfsg1-2build1_all.deb ...
Unpacking nmap-common (7.80+dfsg1-2build1) ...
Selecting previously unselected package nmap.
Preparing to unpack .../nmap_7.80+dfsg1-2build1_amd64.deb ...
Unpacking nmap (7.80+dfsg1-2build1) ...
Setting up lua-lpeg:amd64 (1.0.2-1) ...
Setting up libblas3:amd64 (3.9.0-1build1) ...
update-alternatives: using /usr/lib/x86_64-linux-gnu/blas/libblas.so.3 to provide /usr/lib/x86_64-linux-gnu/libblas.so.3 (libblas.so.3-x86_64-linux-gnu) in auto mode
Setting up nmap-common (7.80+dfsg1-2build1) ...
Setting up liblinear4:amd64 (2.3.0+dfsg-3build1) ...
Setting up nmap (7.80+dfsg1-2build1) ...
Processing triggers for man-db (2.9.1-1) ...
Processing triggers for libc-bin (2.31-0ubuntu9) ...
jumamiller@OpijaKaeli:~$ 

```

Alternatively, install Nmap using snaps by running the following command:

```bash
$ sudo snap install nmap
```

#### Step 3: Verify installed version:
To confirm the version of the Nmap you have just installed, run the following command:

```bash
nmap --version
```

At the time of this writing, Nmap version command outputs the following:

```bash
jumamiller@OpijaKaeli:~$ nmap --version
Nmap version 7.80 ( https://nmap.org )
Platform: x86_64-pc-linux-gnu
Compiled with: liblua-5.3.3 openssl-1.1.1d nmap-libssh2-1.8.2 libz-1.2.11 libpcre-8.39 libpcap-1.9.1 nmap-libdnet-1.12 ipv6
Compiled without:
Available nsock engines: epoll poll select
jumamiller@OpijaKaeli:~$ 
```

NOTE: Your version might be different.  

If you have made it this far, you have installed Nmap successfully in your system.

#### Step 4: Nmap Scanning Types:
>DISCLAIMER!! - The information given in this module is solely for use to scan your networks or networks for which you have been authorized to scan. 
>DO NOT scan networks that you have not been given access or permission to scan, or in case of lawsuits, I hereby disclaim any responsibility for any action taken based on this information presented in this tutorial.

There are several scan types used in Nmap:
- TCP connect() SCAN.
- SYN Stealth SCAN or half-open, or stealth scanning.
- UDP SCAN.
- RPC SCAN. et cetera...

In this tutorial, we will be looking at the two commonly used scans:

### TCP Scan
Nmap TCP Scan works by establishing a connection between its underlying operating network and the target system via a `connect()` system call. If it succeeds, it creates a 3-way handshake, a TCP process to create/make a connection between the client and the server. Otherwise, the port is closed and/or the remote target system is offline and cannot be accessed.  

When a connection has been established, the ports are listed as `open` while the non-established connection is listed as `closed`.  
From the example above, you can notice that if a port is listed as open, you can connect to it, and that is what we refer to as scanning a port.

TCP scan has an option that is usually used when scanning a port, ` -sT`.

#### Example 1.2: Simple port scan 'scanme.nmap.org' using TCP Scan -sT [target] command
On your terminal, run the following command: 

```bash
sudo nmap -sT scanme.nmap.org
```

This outputs the following: 

```bash
jumamiller@OpijaKaeli:~$ sudo nmap -sT scanme.nmap.org 
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-12 11:18 EAT
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.36s latency).
Other addresses for scanme.nmap.org (not scanned): 2600:3c01::f03c:91ff:fe18:bb2f
Not shown: 993 closed ports
PORT      STATE    SERVICE
22/tcp    open     ssh
53/tcp    filtered domain
80/tcp    open     http
3784/tcp  filtered bfd-control
9929/tcp  open     nping-echo
31337/tcp open     Elite
35500/tcp filtered unknown

Nmap done: 1 IP address (1 host up) scanned in 75.95 seconds

```

We have 4 ports open from the output above from the remote target, [nmap](scanme.nmap.org). From this output, we can perform various operations that are beyond the scope of this tutorial.  

Albeit we can scan for open ports using this TCP SYN scan technique, although it has several drawbacks:

It can be easily detected on the system (remote) being scanned. Now imagine this remote system (in this case, the victim) is running an intrusion detection system or has a firewall. 

Every single attempt you make to scan a port sends or triggers a warning to the administrator together with logs. Once again, do not scan big techs because they will watch you!!!

Due to this drawback, SYN Stealth Scan [-sS] was developed.

### SYN Stealth Scan
In simple terms, SYN scan is used by the penetration tester without establishing a full connection, hence the name half-open scanning.  

For example, you want to scan a remote server. You will establish a TCP/IP connection with a server at every possible open port by sending an SYN packet (synchronization packet) as if to create a 3-way handshake to every single port.    

If the synchronization is acknowledged, the server responds with a SYN/ACK packet from a particular port, then that particular port is open.  

From that point, you can send a reset packet (RST); consequently, the server assumes that an error occurred while establishing a connection, yet the open port remains open and ready/vulnerable to exploitation.  

The client may send several SYN packets to the server, consuming a lot of resources. This way, legitimate requests cannot be handled. This is one-way DOS (Denial of service) is achieved.  

Now that we've got an idea of how SYN Scan works let's look at an example:

#### Example 1.3: Simple port scan 'scanme.nmap.org' using TCP Scan -sS [target] command

On your terminal, run the following command:
```bash
sudo nmap -sS scanme.nmap.org
```

This outputs the following:

```bash
jumamiller@OpijaKaeli:~$ sudo nmap -sS scanme.nmap.org
[sudo] password for jumamiller: 
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-12 11:16 EAT
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.42s latency).
Other addresses for scanme.nmap.org (not scanned): 2600:3c01::f03c:91ff:fe18:bb2f
Not shown: 994 closed ports
PORT      STATE    SERVICE
22/tcp    open     ssh
53/tcp    filtered domain
80/tcp    open     http
3784/tcp  filtered bfd-control
9929/tcp  open     nping-echo
31337/tcp open     Elite

Nmap done: 1 IP address (1 host up) scanned in 46.24 seconds

```

From the output above, you'll notice that the results are relatively the same as the `TCP Scan` output. The only difference between the two methods is that a `TCP Scan` logs any single port scan, therefore it leaves traces to the target system administrator(s). 

### Conclusion
In this tutorial, we discussed Nmap, a tool that is used to scan Networks. We have discussed how to install Nmap in Linux distribution and we performed several scans, including a TCP Scan and a SYN Steal scan.  

There are several other Scan Types that we will explore in our next tutorial.  

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

