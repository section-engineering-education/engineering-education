---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-nessus-scanner/
title: Getting Started with Nessus Scanner
description: Nessus scanner is the most popular vulnerability scanner common among penetration testers and hackers. It is open-source and allows free scan for up to 16 Private Addresses at a time. 
author: adeshina-peter
date: 2022-02-12T00:00:00-17:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-nessus-scanner/hero.jpg
    alt: Getting Started with Nessus Scanner Hero Image
---
**Nessus Tenable** is a Kali-Linux open-source software common among penetration testers, used to provide a variety of security fixes. You will frequently use this tool while working as a pen-tester by scanning for potential vulnerability on a server/website.
<!--more-->
**Nessus** scanner is a professional tool widely used among hackers and penetration testers. The solution you get assists you to perform high-speed asset discovery, target profiling, malware detection, sensitive data discovery.
**Tenable** delivers updated plugins that provide you with the latest information to customers within 24 hours after a vulnerability has been leaked.

### Goal
At the end of this tutorial, you should be able to:

- Download and install Kali-Linux on your pc.

- Understand the fundamentals and advantages of the Nessus scanner.

- Install and download Nessus Tenable.

- Understand procedures to take in fixing vulnerabilities.

### Advantages of Nessus Scanner
- It helps you identify vulnerabilities before attackers can take advantage of them.

- It helps you find misconfigurations like missing patches and mail-relay.

- Capturing of data and showing results reporting impact on the network.

If you do not have Kali-Linux installed on your pc, do not worry, we will show you how to set this up quickly.

### Step 1:

### Installing Kali Linux

Use the link below to get to the download page:

- [Kali Linux iso](https://www.kali.org/get-kali/#kali-platforms)

#### Download Vmware (virtual box)

After successfully downloading the Kali-Linux Iso, you can now download the VMware using the link below:

- [Vmware](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)

Follow the [installing Vmware](https://forums.tomshardware.com/faq/how-to-install-vmware-workstation-in-windows-10.3273363/) tutorials to install the VMware.

Start Kali-Linux after the installation and enter your username and password when prompted.

**Note:** The **default** username is **root** and the default password is **toor**.

### Step 2:

### Download Nessus Tenable

- [Nessus Tenable](https://www.tenable.com/downloads/api/v1/public/pages/nessus/downloads/14957/download?i_agree_to_tenable_license_agreement=true)

After downloading Nessus Tenable, follow the steps below to install Nessus on Kali-Linux:

- Start the **terminal** by:

 - Holding the **cltr+alt+T** buttons simultaneously or
   - Using the GUI (Graphical User Interface), go to the application section and double click on the terminal.

Run the command below on the terminal to update and upgrade your Kali Linux.

```bash
    $ sudo apt-get upgrade && update -y
```
Now, let us change our directory to Downloads.

```bash
    $ cd Downloads
```
Use the command below to list all files in `Downloads`, then copy the downloaded file name.

```bash
    $ ls
``` 
Use the command below to grab the package to download and install it.

```bash
    $ dpkg -i Nessus-10.0.2-ubuntu910_amd64.deb
```
![dpkg](/engineering-education/getting-started-with-nessus-scanner/dpkg-nessus.png)

Start Nessus by typing the following into your terminal.

```bash
    $ /bin/systemctl start nessusd.service
```
Navigate to the following URL in your browser to start Nessus.

- [Nessus localhost](https://kali:8843/) to configure your scanner.

- Default port to run Nessus is **`8834`**.

If you see a connection not secured page, click *advance* accept risk and continue.


Congratulations, you now have Nessus installed on Kali-Linux.

Wait for the necessary Nessus plugins to compile; click `Nessus Essentials` and the continue button after the compilation.

### Step 3:
- Provide your name and a valid email to receive an activation code.

- Once your activation code has arrived in your email, go ahead and copy it.

- Paste the activation code into the activation box and click continue.

- Provide your username and password for login

- Nessus will start the initializing process, which will take a couple of minutes; let it install while you get a drink or coffee.

- That took forever! All right, we have loaded Nessus, and it is installed.

![Metersploitable](/engineering-education/getting-started-with-nessus-scanner/metersploitable.png)

### Step 4:
We will use Metersploitable 2 as our vulnerable machine for scanning.
- Metasploitable is an intentionally vulnerable virtual machine designed for training, exploit testing, and general target practice. Unlike other vulnerable virtual machines, metasploitable focuses on vulnerabilities at the operating system and network services layer instead of custom, vulnerable applications.

### Download Metersploitable
Use the link  below to get to the download page:
- [Metersploitable](https://sourceforge.net/projects/metasploitable/files/Metasploitable2/metasploitable-linux-2.0.0.zip/download)
- Follow the [installing Metersploitable](http://techdjdey.blogspot.com/2017/10/how-to-install-metasploitable-2-in.html) tutorials to install metersploitable into a virtual box.

After installing Metersploitable, you can confirm your installation by opening the terminal in Kali-Linux and typing the `IP address` of metersploitable into your browser.

**Note:** Whatever you learn in this tutorial is only for educational purposes.

### Scanning
- Navigate to Nessus in your browser tab.

- The browser will direct you to a blank screen; it is blank because we have not made any scan yet.

- Go ahead and click the new scan at the top right corner.

In the scan template, you will find many options to choose from, but we will show you the significant scans, **Basic Network Scan** and **Advanced Scan**. Let us start with the basic scan as beginners, and then we move to advanced scan in a more advanced tutorial.

  - Let us quickly talk about what we can do in Nessus. In the free edition of Nessus, we can scan against any private address and scan up to 16 of those at a time.

### Basic Network Scan
Click the basic network scan to begin.

Let us quickly talk about some tabs on the side; we have: 
-  **General**: This is where you provide information about the target you want to scan.

- **Schedule**: Once enabled, Nessus will run a scheduled scan on a machine in a given time; you can do this periodically and get updated scan results.

- **Notification**: This is for `SMTP` if you have an SMTP server.

** **Discovery**: This will run a port scanning on the target machine.

 - Go ahead and type in the name of your target machine and description.

 We will provide one `IP address`, which is the IP of metersploitable.

 - Then click the save button.

![New-Scan](/engineering-education/getting-started-with-nessus-scanner/basic-scan.png)

Go ahead and click the **save button** below and click the lunch (play) button on the next page to start the scanning process.

- You will notice a spinning icon, which means your scan has started.

- Once your scan is complete, double click on it, and you will see the scanned results with found vulnerabilities.

![scan](/engineering-education/getting-started-with-nessus-scanner/scan.png)

### Step 5
Looking at the overview, we can see that the host has many vulnerabilities.
 Open a vulnerability you would like to fix. Click the **Bind Shell Backdoor Detection vulnerability**. You will find the description and solution on how to fix this vulnerability.

![Bind Shell Vuln](/engineering-education/getting-started-with-nessus-scanner/vuln.png)

Nessus displays the severity, score, family, and count of all the vulnerabilities.
- Dark Red tab shows that the vulnerability is **critical**.
- Red tab shows that the vulnerability is **High**.
- Orange tab shows that the vulnerability is **Medium**.
- Yellow tab shows that the vulnerability is **Low**.

The severity outputs `Critical` and `Score` to be 9.8, which means we need to take quick measures in preventing attackers from exploiting this vulnerability.

- Bind Shell Exploitaion.
Metasploitable comes with an open bind shell service running on port 1524; an attacker can connect with this open port easily with Netcat.

> If you ever find a bind shell backdoor on any server, use [Nmap](https://www.nmap.org) to scan for an open port with the terminal, find the Bind shell Port and close it, this will block any incoming connection pinging to the open port, and that how you can fix the vulnerability quickly.

### Summary

In this article, we have learned how to:
* Install Kali-Linux in a virtual machine.

* Download and install Nessus tenable with the terminal.

* Scan a targeted host and fix the vulnerability with the solution provided to us.

### Conclusion
We have learned how to find vulnerabilities and fix them with the scan provided in this article's scan. There is no way we touch all of this assessment and fix all the vulnerabilities, so let us focus on the low-hanging fruit.

### References and Further Reading
1. [A complete guide to Nmap tutorial](https://www.edureka.co/blog/nmap-tutorial/).
2. [Netcat Complete Guide](https://www.kalilinux.in/2021/01/netcat-linux-tutorial.html).

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
