---
layout: engineering-education
status: publish
published: true
url: /install-a-gui-on-an-ubuntu-server-1804/
title: How to Install a GUI on an Ubuntu Server 18.04 for Easier Remote Management
description: A tutorial on installing Xfce or LXDE GUIs onto an Ubuntu Server 18.04 Installation for Easier Remote Management - Linux-based Virtual Private Server (VPS) runs off of a command line with no graphical user interface (GUI).
author: gregory-manley
date: 2020-08-05T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/install-a-gui-on-an-ubuntu-server-1804/hero.jpg
    alt: GUI on an Ubuntu Server 18.04
---
Almost every Linux-based Virtual Private Server (VPS) runs off of a command line with no graphical user interface (GUI). This is good for many programs as there is less overhead and thus more resources for the programs to utilize. There are programs that do not need a GUI but benefit from the GUI such as GitHub, IDEs, and mining pool management. GUIs also can help server administrators maintain and operate servers.
<!--more-->

This tutorial assumes that you already know how to SSH into your VPS/server. If you are running a machine on Amazon Web Services (AWS) you can check out our [guide](https://www.section.io/engineering-education/setup-ssh-ubuntu-vm-aws/) on setting up SSH on Ubuntu 18.04 by Adrian. It is also assumed that you are running Ubuntu 18.04 and have some general knowledge about the command line.

### Should you Install a GUI?
Not every application will benefit from a GUI. If you answer yes to any of the following you should consider installing a GUI:

<ul>
    <li>I want to edit file easier</li>
    <li>I want to download programs that do not have an apt-get</li>
    <li>I want a visual IDE</li>
    <li>I need to run multiple programs at once</li>
</ul>

Even if you did answer yes to any one of those questions, consider if it is worth the resources that will be needed to run GUI: would that affect your program's efficiency? If you need as many resources as possible for your program (Ex. simulations and computationally heavy programs) than a GUI may not be for you.

### Preparing to Install the GUI
Before installing anything new, it is recommended to run both the update and upgrade commands on your server.  Run the following:

`sudo apt-get update`

`sudo apt-get upgrade -y `

It is recommend to obtain your external IP address for your server if you do not already have it. Run the following to obtain your IP:

`curl ipinfo.io/ip`

### The Choice of GUI

As stated, almost every Linux server does not have a GUI installed. While the choice of which GUI is ultimately up to the user, it is recommended to install a lightweight desktop environment. For the purposes of this tutorial, we will show how to install both LXDE and Xfce. However, it is recommended that you install Xfce unless you are familiar and comfortable with tinkering around in Linux. Xfce will give a more solid experience starting out, especially on a VPS. This is important since most remote servers do not have dedicated graphics and thus need a lightweight GUI that can be run on a CPU.

### Installing the GUI

#### Xfce

You will also need to install some X-server packages, specifically, we will be installing xorg, dbus-x11, and x11-xserver-utils. At the same time, install the Xfce package. Run the following to install:

`sudo apt-get install xfce4 xfce4-goodies xorg dbus-x11 x11-xserver-utils`

This may take some time depending on both your VPS internet speed and specifications, so be patient.

##### Installing Xrdp to Access your GUI
Installing the GUI is relatively simple, but you cannot access it using SSH. You must install a remote desktop onto your server.

`sudo apt-get install xrdp`

After installing Xrdp you need to add it to the "ssl-cert" group. Run the following:

`sudo adduser xrdp ssl-cert`

Now that Xrdp is setup open up your favorite RDP client and connect to your server at pot 3389 (Ex. 192.168.0.1).

![](https://newsitech.weebly.com/uploads/2/0/5/4/20542424/screen-shot-2020-07-23-at-3-33-52-pm_orig.png)

#### LXDE
LXDE is significantly bigger than Xfce and will take longer to install than Xfce. Simply run:

`sudo apt-get install lubuntu-desktop`

Then reboot by simply running `sudo reboot`.

#### Installing VNC Server to Access your GUI
In order to access your server, you will need a VNC server on your server and a VNC client on the machine that you will use to access your server.

`sudo apt-get install tightvncserver`

Once the server is installed start it by running:

`vncserver`

After installing you can connect to your server by pointing your VNC client to your external IP at port 5901 (Ex. 196.168.0.1:5901).

![](/engineering-educationhttps://newsitech.weebly.com/uploads/2/0/5/4/20542424/screen-shot-2020-07-23-at-3-33-52-pm_orig.png)

### Finishing Up
It is recommended that you install Firefox for web browsing before connecting to your newly installed GUI by running:

`sudo apt-get install firefox`

You can now access your server via RDP (or VNC if you decided to install LXDE). For many use cases such as development and operations installing a GUI is more helpful than the efficiency offset. Many server administrators that do not need the maximum performance for a program (or the program is single-threaded) will likely enjoy the ease of access and easier maintenance.
