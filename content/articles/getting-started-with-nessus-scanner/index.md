---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-nessus-scanner/
title: Getting Started with Nessus Scanner
description: Nessus scanner is the most popular vulnerability scanner among penetration testers and hackers. It is open-source and allows one to scan up to 16 private addresses at a time. 
author: adeshina-peter
date: 2022-02-22T00:00:00-07:10
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-nessus-scanner/hero.jpg
    alt: Getting Started with Nessus Scanner Hero Image
---
Nessus Tenable is a Kali Linux open-source software common among penetration testers. It is used to provide a variety of security fixes. 
<!--more-->
You will frequently use this tool while working as a pen-tester to scan for potential vulnerabilities on a server/website.

*Nessus* scanner is a professional tool widely used by hackers and penetration testers. It assists one to perform high-speed asset discovery, target profiling, malware detection, and sensitive data discovery.

**Tenable** delivers updated plugins that provide the latest information to customers within 24 hours after a vulnerability has leaked.

### Goal
At the end of this tutorial, you should be able to:

- Download and install Kali Linux on your pc.
- Understand the fundamentals and advantages of the Nessus scanner.
- Install and download Nessus Tenable.
- Understand the procedures for identifying and fixing vulnerabilities.

### Advantages of Nessus Scanner
- It helps developers identify vulnerabilities before attackers can exploit them.
- It assists in finding misconfigurations like missing patches and mail-relay.
- It improves the process of capturing data and predicting the impact of certain threats on a network.

If you do not have Kali Linux installed on your pc, do not worry, we will show you how to set it up quickly.

### Step 1 - Installing Kali Linux
You can download Kali Linux from [here](https://www.kali.org/get-kali/#kali-platforms)

#### Downloading Vmware (virtual box)
After successfully downloading the Kali Linux ISO, you can now download the [Vmware](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)

Follow this [tutorial](https://forums.tomshardware.com/faq/how-to-install-vmware-workstation-in-windows-10.3273363/) to install the VMware.

After the installation, start Kali Linux and enter your username and password when prompted.

> The default username is *root* and the password is *toor*.

### Step 2 - Download Nessus Tenable
After downloading [Nessus Tenable](https://www.tenable.com/downloads/api/v1/public/pages/nessus/downloads/14957/download?i_agree_to_tenable_license_agreement=true), use the following steps to install it on Kali-Linux:

Firstly, start the *terminal* by holding the *cltr+alt+T* buttons simultaneously, or by using the Graphical User Interface (GUI). Navigate to the application section and double-click on the terminal.

Next, run the command below on the terminal to update or upgrade your Kali Linux installation.

```bash
$ sudo apt-get upgrade && update -y
```
Now, let us change our directory to `Downloads`.

```bash
$ cd Downloads
```
Use the command below to list all files in `Downloads`, then copy the downloaded file name:

```bash
$ ls
``` 
Use the following command to download and install the package:

```bash
$ dpkg -i Nessus-10.0.2-ubuntu910_amd64.deb
```

![dpkg](/engineering-education/getting-started-with-nessus-scanner/dpkg-nessus.png)

Start Nessus by typing the following into your terminal:

```bash
$ /bin/systemctl start nessusd.service
```
Navigate to *https://kali:8843/* in your browser to start Nessus and configure your scanner.

The default port to run Nessus is `8834`.

If you see a *connection not secure* page, click *advance* and accept *risk* then continue. 

Congratulations! You have now installed Nessus on Kali-Linux. Wait for the necessary Nessus plugins to compile then click `Nessus Essentials` and the *continue* button after the compilation.

### Step 3 - Activation
Provide your name and a valid email to receive an activation code. 

Once your activation code has arrived in your email, go ahead and copy it. Paste the code into the activation box and click *continue*. Enter your username and password to log in.

Nessus will start the initialization process, which will take a couple of minutes.

![Metasploitable](/engineering-education/getting-started-with-nessus-scanner/metasploitable.png)

### Step 4 - Using Metasploitable
We will use `Metasploitable 2` as our vulnerable machine for scanning. 

Metasploitable is an intentionally vulnerable virtual machine designed for training, exploit testing and general target practice. 

Unlike other vulnerable virtual machines, Metasploitable focuses on vulnerabilities at the operating system and network services layers instead of custom, vulnerable applications.

#### Downloading Metasploitable
You can download [Metasploitable](https://sourceforge.net/projects/metasploitable/files/Metasploitable2/metasploitable-linux-2.0.0.zip/download) from the official website.

Follow this [tutorial](http://techdjdey.blogspot.com/2017/10/how-to-install-metasploitable-2-in.html) to install Metasploitable into a virtual box.

After the installation completes, you can confirm it by opening the terminal in Kali Linux and typing the `IP address` of Metasploitable in your browser.

> Note that whatever you learn in this tutorial is only for educational purposes.

### Scanning
Navigate to Nessus in your browser tab. You will be directed to a blank screen since we have not made any scans yet. 

Go ahead and click the *new scan* at the top right corner of the page.

In the scan template, you will find different options. We will focus on the *Basic Network Scan* and *Advanced Scan*. 

In the free Nessus edition, we can scan up to 16 private addresses at a time.

### Basic network scan
To begin, click on the *basic network* option. You will see the following tabs: 

- *General* - This is where you provide information about the target you want to scan.

- *Schedule* - Once enabled, Nessus will run a scheduled scan on a machine at a given time.

- *Notification*: This option is for the `SMTP` server.

- *Discovery*: This will scan a specific port on the target machine.

Go ahead and type in the name of your target machine and description. We will provide Metasploitable's IP then click the *save* button.

![New-Scan](/engineering-education/getting-started-with-nessus-scanner/basic-scan.png)

After clicking the *save button* below, press the *launch* button on the next page to start the scanning process. 

Once your scan is complete, double click on it, and you will see the scanned results with the identified vulnerabilities.

![scan](/engineering-education/getting-started-with-nessus-scanner/scan.png)

### Step 5
From the above results, the host has many vulnerabilities. 

When you click the *Bind Shell Backdoor Detection vulnerability*, you will find the description and solution on how to fix this vulnerability.

![Bind Shell Vuln](/engineering-education/getting-started-with-nessus-scanner/vuln.png)

Nessus displays the *severity, score, family*, and *count* of all the vulnerabilities.

- The dark red tab shows that the vulnerability is *critical*.
- The red tab shows that the vulnerability is *high*.
- The orange tab shows that the vulnerability is *medium*.
- The yellow tab shows that the vulnerability is *low*.

Since our severity is categorized as `critical` and has a `score` of `9.8`, we need to implement quick measures to prevent attackers from exploiting this vulnerability.

#### Bind shell exploitaion.
Metasploitable comes with an open bind shell service running on port 1524; an attacker can connect with this open port easily with Netcat.

If you find a bind shell backdoor on any server, use [Nmap](https://www.nmap.org) to scan for an open port with the terminal. 

Find the `Bind shell Port` and close it. This will block any incoming connection to the open port.

### Summary
In this article, we have learned how to:

- Install Kali Linux in a virtual machine.

- Download and install Nessus Tenable.

- Scan a targeted host and fix the vulnerability.

### Conclusion
In this tutorial, we have learned how to find vulnerabilities and fix them using Metasploitable. 

There are too many vulnerabilities in the world today. Therefore, conducting regular assessments is recommended.


### Further reading
- [A complete guide to Nmap tutorial](https://www.edureka.co/blog/nmap-tutorial/)
- [Netcat Complete Guide](https://www.kalilinux.in/2021/01/netcat-linux-tutorial.html)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)