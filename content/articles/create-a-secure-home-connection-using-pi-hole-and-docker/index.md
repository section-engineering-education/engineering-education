As human beings and the world they are living in continues to evolve, technology is not an exception as it’s one of the co-factors that mark a revolution. Internet use has become ingrained in our daily lives as a result of modern technologies. The largest population worldwide is now using internet connection either in messaging, sending letters, in the education sector, in the field of medicine, etc.

### Introduction
Threats have also increased with an increase in internet use. Digital safety has become an important issue. Our screens always contain insensible ads, pop-ups, notifications, banner ads, and so on, which you might not know about harmful malware. It also can threaten the digital safety and health of an individual. It also leads to poor browsing. Fortunately, some tweaks can fix the bug and problems and one such foolproof way is to program a low-cost computer for Pi-hole. It will block anything irrelevant that emerges on your display, check all incoming data from your preferred blacklists, and decide whether the packets should be passed on to your device. 

To reduce this risk that's where we create a sure-home connection using pi-hole and Docker. A `docker` is a containerized technology tool. It’s used with a variety of applications such as DNS and a web server. It helps in the packaging of applications and when one needs to affiliate their apps operating system. A `pi-hole is a foolproof adblocker. It protects your network from harmful and undesired ads, pop-ups, advertisements, notifications, and so on. You only need to install pi-hole on your network and it will protect and block all ads from your devices and browsers. It also aids in increasing the network's speed.

### Prerequisites
- Any operating system. `windows or Linux os`.
- Some knowledge on using command interfaces.
- Background in Networking.


### Table of contents:
- [Understanding the Architecture](#understanding-the-architecture)
- [The installation of pi-hole software](#the-installation-of-pi-hole-software)
- [How to set up Pi-hole as a docker](#how-to-set-up-pi-hole-as-a-docker-container)
- [How to use Pi-hole as the DNS](#how-to-use-pi-hole-as-the-dns)
- [Conclusion](#conclusion)


### Architecture
![The Architecture](engineering-education/create-a-secure-home-connection-using-pi-hole-and-docker/architecture.png)

From the image above, data packets are received from the internet. The base operating system connected to the internet received the data packets.

> The pi-hole and docker are inside the base operating system. That is why the symbols representing them are connected. 

The pi-hole prevents advertisements from being displayed on the internet. Use our automated installer to install Pi-hole on a supported operating system or run it from a container. When ads are blocked by the pi-hole software the filtered data packets are sent to the router.As a computer networking tool, a router is used to transport data packets from one network to the next over the Internet. On the Internet, routers are in charge of traffic direction to different devices such as computers, laptops, and phones. 

### The installation of pi-hole software
Pi-hole may be installed in two ways on a Raspberry Pi and other Linux platforms such as Debian and Ubuntu. Use a single-line script from the terminal to install it if you're already running Raspberry Pi OS (Raspbian) or another Linux distribution. 

To run Pi-hole in a separate software container, you can install Docker on your Raspberry Pi and execute it in that container.Both options are acceptable, however Docker requires more setup.
If you want to install Pi-hole, you can do so in one of two ways, as detailed below.

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
Using the same installation script, Pi-hole and any additional packages will be installed and configured before the configuration process is invoked again.

#### Pi-hole configuration during installation
In the terminal window, you'll be asked to confirm different Pi-hole options, such as your network configuration and chosen logging levels. 
1. To navigate through the first few information panels, press the Enter key. Using the arrow keys on the Choose an interface screen, choose Wi-Fi or Ethernet and press space or enter. Toggle to the OK option with the tab key, then confirm with hitting the Enter key.

2. After that, you'll be asked which external DNS server you want to use. Here, Cloudflare and Google are both good free solutions. Using your arrow keys, select the provider you want to use, then confirm using the enter key.

3. Your choice of adblocking lists will be asked of you in the next round. Pi-hole comes with four default lists, which you should leave chosen, but you can enable or disable any of them by selecting them and pressing space on your keyboard.
To proceed, press the tab key to go to the OK option, then enter.

4. Pi-hole will prevent advertisements on IPv4 and IPv6 connections by default. If you don't want to alter anything, leave the default options selected, press the tab to select OK, and then press enter.

5. The following step will require you to confirm that the IP address and IP gateway (most likely your local router) displayed are correct for the Pi-static hole's IP setting. To update your settings, press enters on Yes if this is right, or No if it isn't.

6. Pi-hole will alert you about any possible IP conflicts. Accept the warning and continue by pressing the enter key.

7. Pi-hole comes with a web browser admin panel that you may use to configure and monitor it by default. This is the recommended option for installation, and it is the default choice for the installation process. To continue, press the tab and then enter OK. This will also be required at a later stage to validate the installation of a web server for the admin interface.

8. If you want to log inquiries, Pi-hole will ask you. This is useful since you'll be able to monitor which domains Pi-hole is blocking and how frequently they're banned. This is already selected, so press tab and enter to confirm.

9. You can choose how detailed your Pi-hole statistics should be. In the documentation for Pi-hole, there are five levels, each of which is discussed in great detail. To ensure that you're happy with the default option of showing everything, press the tab and enter.

10. The Pi-hole installation will begin once you've chosen your preferred logging level. Once the installation is complete, a final confirmation message will display in the terminal, with instructions on how to access the online portal as well as your auto-generated password for signing in. To complete the installation, press the tab, then enter.

#### Installing Pi-hole as a Docker container 
If you want, instead of installing Pi-hole using the script above, you can use Docker to run it in a separate Docker software container. Before you can accomplish anything, you'll need to install Docker on your Raspberry Pi.

#### Doker installation
1. If Docker isn't already installed on your Raspberry Pi, you may do it fast by opening a terminal window and typing:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

2. After the Docker installation is complete, run the command `sudo usermod -aG docker pi` to allow non-root users to use Docker (such as the default pi user on Raspberry Pi OS).

3. To make sure that Docker starts automatically when your Raspberry Pi reboots, execute 

```bash
sudo systemctl enable docker.
```

### How to set up Pi-hole as a docker container
To run Pi-hole in a Docker container, clone the Pi-hole Github repository and download a copy of the Pi-hole Docker installation files.

1. To achieve this, open a terminal window (or use a remote SSH connection) and type the following:
```bash
git clone https://github.com/pi-hole/docker-pi-hole.git
```
The newest files to run Pi-hole as a Docker container will be downloaded from the Pi-hole Github repository. The cloned Pi-hole folder contains a startup script for your container `docker run.sh`. Before running this starting script, you might want to look over and change any of the options.

2. The script will automatically generate an administrator password for Pi-hole, change the default outgoing DNS server for Pihole to 1.1.1.1 or 8.8.8.8, and set other parameters for Pi-hole, such as the timezone it uses. If you don't live in the United States, for example, you can use a similar tz database timezone value to modify the TZ field to reflect your time zone.

3. By entering `nano docker run.sh` and making appropriate adjustments, you can modify these parameters.

4. Type `./docker run.sh` in the terminal when you're ready to run the script. Pi-hole should now launch within a new Docker container if the script is successful.

> If you're successful, you'll see a password appear in the terminal output after the script has been successfully run. This is the password that you'll need to continue configuring Pi-hole.

### How to use Pi-hole as the DNS
Configuring all of your local network devices to use Pi-hole is time-consuming and inefficient, especially if you want to use Pi-hole on many devices throughout your network.

If this is the case, you should update the DNS settings on your router to use your Raspberry Pi's IP address instead. This means that all of the devices on your local network will be protected from advertisements. This method is faster than the manual method, which requires you to manually configure DNS settings on each device.

Altering your router's nameserver configuration will be different for different models and brands. This information should be located on or in the box of your router and include the default IP address as well as the administrator username and password.

If not, see your router's manual and use a web browser to access your router using popular IP addresses like `http://192.168.1.1` or `http://192.168.0.1`.

As a rule, your router is set up with the DNS servers of your internet service provider (ISP).
 Make sure your DNS server settings (perhaps marked primary/secondary DNS) match your Raspberry Pi's IP address.

We'll instruct every device that's connected in the first instance to redirect all DNS requests through Pi-hole. Any prohibited requests will be ignored, while approved requests will be forwarded to the third-party internet DNS provider configured in your Pi-hole (such as Cloudflare's 1.1.1.1 or Google's 8.8.8.8 public DNS servers).

Any DNS server changes you make may need to be rebooted for them to take effect across your network.

### Conclusion
In this article, we have learned about how we can block unwanted ads from the internet using Pi-hole and a docker container. By doing this our data packets will be fast to access and minimize losses of data since it's cost-effective.
