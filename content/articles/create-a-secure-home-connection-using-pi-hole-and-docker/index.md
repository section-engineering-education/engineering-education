---
layout: engineering-education
status: publish
published: true
url: /create-a-secure-home-connection-using-pi-hole-and-docker/
title: Create a Secure Home Connection Using Pi-hole and Docker
description: In this tutorial, we will create a secure home connection using Pi-hole and Docker. We will learn how to block unwanted ads from the internet using Pi-hole and a docker container.
author: lewis-macharia
date: 2021-08-26T00:00:00-09:30
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/create-a-secure-home-connection-using-pi-hole-and-docker/hero.png  
    alt: Pi-hole example image
---
Pi-hole is a foolproof adblocker. It protects your network from harmful and undesired ads, pop-ups, advertisements, notifications, and so on. You only need to install pi-hole on your network and it will protect and block all ads from your devices and browsers.
<!--more-->
Digital safety has become an important issue. Our screens always contain insensible ads, pop-ups, notifications, banner ads, and so on, such as harmful malware. 
### Introduction
All these ads can also lead to a poor browsing exprience. Fortunately, some tweaks can fix the bug and problems and one such foolproof way is to program a low-cost computer for Pi-hole. 

Pi-hole will block anything irrelevant that emerges on your display, check all incoming data from your preferred blacklists, and decide whether the packets should be passed on to your device. 

To reduce the risk (of excessive ads and malware) we cab create a secure home connection using Pi-hole and Docker. `docker` is a containerized technology tool. It’s used with a variety of applications such as DNS and a web server. It helps in the packaging of applications and when one needs to affiliate their apps operating system. 

`pi-hole` is a foolproof adblocker. It protects your network from harmful and undesired ads, pop-ups, advertisements, notifications, and so on. You only need to install pi-hole on your network and it will protect and block all ads from your devices and browsers. It also helps in increasing the network's speed.

### Prerequisites
- Any operating system. `windows or Linux os`.
- Some knowledge on using command interfaces.
- Background in Networking.


### Table of contents
- [Understanding the architecture](#architecture)
- [The installation of pi-hole software](#the-installation-of-pi-hole-software)
- [How to set up Pi-hole as a docker](#how-to-set-up-pi-hole-as-a-docker-container)
- [How to use Pi-hole as the DNS](#how-to-use-pi-hole-as-the-dns)
- [Conclusion](#conclusion)


### Architecture
![The Architecture](/engineering-education/create-a-secure-home-connection-using-pi-hole-and-docker/architecture.png)

From the image above, data packets are received from the internet. The base operating system connected to the internet received the data packets.

> The pi-hole and docker are inside the base operating system. That is why the symbols representing them are connected. 

The pi-hole prevents advertisements from being displayed on the internet. Use our automated installer to install Pi-hole on a supported operating system or run it from a container. When ads are blocked by the pi-hole software the filtered data packets are sent to the router. 

As a computer networking tool, a router is used to transport data packets from one network to the next over the Internet. On the Internet, routers are in charge of traffic direction to different devices such as computers, laptops, and phones. 

### The installation of pi-hole software
Pi-hole may be installed in one of two ways on a Raspberry Pi and other Linux platforms such as Debian and Ubuntu. Use a single-line script from the terminal to install it if you're already running Raspberry Pi OS  or another Linux distribution. 

To run Pi-hole in a separate software container on your Raspberry Pi, install Docker and run it in the container. Both options are acceptable, however, Docker requires more of a setup.

If you want to install Pi-hole, you can do so, as detailed below.

#### Installing Pi-Hole using the automatic installation script
Using the developer's installation script is the quickest approach to set up Pi-hole. You can use curl to run the script directly from the Pi-hole website, or you can manually download and run it.

Start the script automatically by opening a terminal and entering the following command:

```bash
sudo curl -SSL https://install.pi-hole.net | bash
```

This will execute the Pi-hole automated installation script, downloading any required packages and allowing you to configure Pi-hole before the installation is complete.

> While this should be secure, running a script from the internet directly with curl is generally bad practice because you can't see what the script will do before running it. If you're concerned about doing this, you can first download the script and double-check the code before running it manually.

To do so, open a terminal and type the commands below:

```bash
wget -O basic-install.sh https://install.pi-hole.net
sudo bash basic-install.sh
```

Pi-hole and any extra packages will be installed and configured using the same installation script before the configuration procedure is started again.

#### Pi-hole configuration during installation
In the terminal window, you'll be asked to confirm different Pi-hole options, such as your network configuration and chosen logging levels. 

1. To navigate through the first few information panels, press the Enter key. Choose Wi-Fi or Ethernet using the arrow keys on the Choose an interface screen, then press space or enter. Toggle to the OK option with the tab key, then confirm by hitting the Enter key.

2. After that, you'll be asked which external DNS server you want to use. Here, Cloudflare and Google are both good free solutions. Using your arrow keys, select the provider you want to use, then confirm using the enter key.

3. Your choice of adblocking lists will be asked of you in the next round. Pi-hole comes with four default lists, which you should leave chosen, but you can enable or disable any of them by selecting them and pressing space on your keyboard.
To continue, press the tab key to select OK, then enter.

4. Pi-hole will prevent advertisements on IPv4 and IPv6 connections by default. If you don't want to alter anything, leave the default options selected, press the tab to select OK, and then press enter.

5. The following step will require you to confirm that the IP address and IP gateway (most likely your local router) displayed are correct for the Pi-static hole's IP setting. To update your settings, press enters on Yes if this is right, or No if it isn't.

6. Pi-hole will alert you about any possible IP conflicts. Continue by pressing the enter key after you accept the warning.

7. Pi-hole comes with a web browser admin panel that you may use to configure and monitor it by default. This is the recommended option for installation, and it is the default choice for the installation process. To continue, press the tab and then enter OK. This will also be required at a later stage to validate the installation of a web server for the admin interface.

8. If you want to log inquiries, Pi-hole will ask you. This is useful since you'll be able to monitor which domains Pi-hole is blocking and how frequently they're banned. This is already selected, so press tab and enter to confirm.

9. You can choose how detailed your Pi-hole statistics should be. In the documentation for Pi-hole, there are five levels, each of which is discussed in great detail. To ensure that you're happy with the default option of showing everything, press the tab and enter.

10. The Pi-hole installation will begin once you've chosen your preferred logging level. Once the installation is complete, the terminal will show a final confirmation message. This message will include information about logging in to the web portal and a password that will be generated automatically for you. Click the tab to enter the text.

#### Installing Pi-hole as a Docker container 
If you want, instead of installing Pi-hole using the script above, you can use Docker to run it in a separate Docker software container. Your Raspberry Pi must be installed using Docker first.

#### Installation of a docker container
- To install Docker on your Raspberry Pi, open a terminal window and enter the following commands:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

You may also install Docker manually by downloading the script and running the following command in a terminal:

```bash
wget -O install-docker.sh https://get.docker.com
sh install-docker.sh
```

- To allow non-root users to use Docker after the installation is complete, execute `sudo usermod -aG docker pi` (such as the default pi user on Raspberry Pi OS). Start Docker automatically when your Raspberry Pi reboots by running `sudo systemctl enable docker`. Start Docker automatically when your Raspberry Pi reboots by running `sudo systemctl enable docker`.

- Execute `sudo systemctl enable docker` to ensure Docker starts automatically when your Raspberry Pi reboots.

```bash
sudo systemctl enable docker.
```

### How to set up Pi-hole as a Docker container
Download the Docker installation files for Pi-hole from the Pi-hole Github repository and clone the repository to get the Docker installation files.

1. To achieve this, open a terminal window (or use a remote SSH connection) and type the following:

```bash
git clone https://github.com/pi-hole/docker-pi-hole.git
```

As a first step, you'll need to obtain the newest files from Pi-Github hole's repository if you want to run it within Docker. For your container docker run, a startup script is included in the cloned folder of Pi-hole. 

Before running this starting script, you might want to look over and change any of the options.

2. Pi-default hole's outgoing DNS server will be changed to 1.1.1.1 or 8.8.8.8, and other settings, such as the timezone, will be updated automatically by the script. Use a similar TZ database timezone setting if you don't live in the United States, for example, to alter the Time Zone column to suit your time zone.

3. By entering `nano docker run.sh` and making appropriate adjustments, you can modify these parameters.

4. Type `./docker run.sh` in the terminal when you're ready to run the script. A new Docker container should now launch Pi-hole if the script was successful. 

> Assuming the script is successful, the terminal output will reveal a password for the user. Use this password to continue setting up Pi-hole.

### How to use Pi-hole as the DNS
Configuring all of your local network devices to use Pi-hole is time-consuming and inefficient, especially if you want to use Pi-hole on many devices throughout your network.

For those who find themselves in this situation, it is recommended that you change the DNS settings on your router to utilize the Raspberry Pi's IP address instead. 

Ads will be blocked on all devices on your local network. This method is faster than the manual method, which requires you to manually configure DNS settings on each device.

Altering your router's nameserver configuration will be different for different models and brands. This information should be located on or in the box of your router and include the default IP address as well as the administrator username and password.

If not, see your router's manual and use a web browser to access your router using popular IP addresses like `http://192.168.1.1` or `http://192.168.0.1`.

If you have an internet service provider (ISP), your router is usually set up to use their DNS servers. Make sure your DNS server settings (perhaps marked primary/secondary DNS) match your Raspberry Pi's IP address.

We'll instruct every device that's connected in the first instance to redirect all DNS requests through Pi-hole. Any prohibited requests will be ignored. 

While approved requests will be forwarded to the third-party internet DNS provider configured in your Pi-hole (such as Cloudflare's 1.1.1.1 or Google's 8.8.8.8 public DNS servers).

Reboot your network after making any DNS server changes to ensure they take effect across your network.

### Conclusion
In this article, we learned how we can block unwanted ads from the internet using Pi-hole and a docker container. By doing this our data packets will be faster to access, it will help minimize losses of data, and it's cost-effective.

Happy coding!

### References
1. [Understanding Docker Concepts](section.io/engineering-education/docker-concepts/)

2. [Ultimate Network Monitoring Solution with a Raspberry Pi using Docker](https://dipan29.medium.com/ultimate-network-monitoring-solution-with-a-raspberry-pi-using-docker-15773d6dd8b)

3. [Create your own secure Home Network using Pi-hole and Docker](https://www.geeksforgeeks.org/create-your-own-secure-home-network-using-pi-hole-and-docker/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
