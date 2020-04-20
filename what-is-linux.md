---
layout: engineering-education
status: publish
published: true
title: What is Linux?
description: The Linux operating system is a free open source Unix like operating system. Linux is an open-source meaning that the code that makes up the Kernel is available for anyone to see. For that reason Linux is often referring to the collection of distributions such as Ubuntu, Debian, Fedora, and Arch. These distributions are a bundle of software that makes a whole operating system.
author: Jesus Nunez
date: 2020-04-15T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/linux_live_logo.jpg
    alt: Linux Penguin  
---
<img src="/assets/images/education/Tux_linux_logo.png" style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;">

The Linux operating system is a free open-source Unix like operating system. Linux was initially released on September 17th, 1991, by Linux Torvalds. Unlike MacOS and Windows, Linux is open-source meaning that the code that makes up the Kernel is available for anyone to see. Linux is also Unix-like meaning that it operates similarly to the original Unix system by Bell labs.

*Image source: [Leanpub](https://leanpub.com/jelinux/read)*

<!--more-->

### How Linux works?
![](/assets/images/education/linuxlogos.png)
*Image: Starting on the top left Debian, Ubuntu, Gentoo, Fedora, Arch Linux, Linux Mint*

By itself, Linux is just a kernel, for that reason Linux is often referring to the collection of distributions such as Ubuntu, Debian, Fedora, and Arch. These distributions are a bundle of different software that make a whole operating system. These bundles are normally easy to install often with dedicated installers that take the user step by step, while others are more hands-on during the installation process.

The Linux operating system is made of several different parts. Which we have listed below.

1. Bootloader: The bootloader is a piece of software that loads the operating system once your PC turns on. Notable bootloaders are GRUB, syslinux, and systemd-boot. You can read more on each software in the boot section of the [Arch Linux wiki](https://wiki.archlinux.org/index.php/Arch_boot_process#Boot_loader).
2. Kernel: This is what Linux is without any of the extra software. Barebones Linux is just the kernel that manages devices from keyboards to the actual CPU. It handles memory allocation and this is the lowest level in the OS with the most power over the system.
3. Init system: The Init system is software that manages to boot the OS once the bootloader hands it off. The Init system is the first program to run when booted into Linux and it keeps running until shutdown. The init system is responsible for managing processes to run once in the operating system. Popular Init systems are systemD, anopa, openRC, and runit. SystemD being the most used and most controversial.
4. Daemons: These are the background processes/services that run either on boot or after log in to the desktop. The Init system manages daemons.
5. Graphical server: The graphical server is in charge of managing displays. The graphical server displays all graphics onto the screen. There are two graphical servers X.org often called X or X11, and Wayland. The most commonly used being X as it is the oldest of the two having its start in the year 1984. Wayland is a more modern graphical server with an initial release of 2008. Wayland has been made to be more secure, simpler, and modern than X.
6. Desktop environment: This software runs the actual desktop. The graphical server only displays content to the screen and the Desktop environment is what manages windows and how the overall desktop looks. The desktop environment generally comes with other software to make it easier to use. There is a wide variety of desktop managers each with their own unique look and functionalities. Notable examples are Bungie, GNOME, KDE Plasma, LXDE, and Cinnamon. It is also possible to just install the window manager and not the whole environment. Window managers generally fall into two categories, tiled or stacking. A stacking window manager is what is used on Windows and MacOS. Each program is in a window that can be stacked on top of another. Meanwhile, a tiled window manager arranges programs in tiles that do not stack. When a program is opened in a tiled window manager, the window manager gives it a 'tile' that can be arranged with the other tiles.

### Places where Linux is used
Linux is used in a variety of places one would not expect. Many embedded devices run Linux as it can require very little to run. As it would cost money to create software to run devices such as smart appliances and other embedded devices, Linux is used instead by many manufacturers as an alternative to creating their own system. Linux is also largely used in data centers and supercomputers due to the large amount of software available such as Docker/Kubernetes.

### Benefits of the Linux kernel
**Linux is free!!**
- Unlike Windows and MacOS, the Linux operating system is free and open-sourced. There is no cost associated with having a license to use the product. This means anyone can install the operating system without any cost.

**Open source**
- The code to Linux and many of the software used in the Linux operating system is available online for anyone to view and modify. This allows anyone to contribute to or to make modifications to their specific case. For example, the popular Android operating system on phones is based on Linux and so is Google's Chrome OS.

**Customizable looks**
- Linux can take on many appearances. Unlike Windows, it is not locked into one desktop environment. In Linux, there are many different types of environments that can be chosen from such as Gnome, KDE Plasma, XFCE, and i3. Each has its own design and functionality along with looks and customizability.

**Community support**
- There is no shortage of forums and documentation that can be helpful to troubleshoot any issue that may occur. A popular wiki is the Arch Linux Wiki due to its dedicated community base that has documented a large portion of Linux software.

**Easy software installation and updates**
- At first, using a terminal and package manager seems like a daunting task but once used to it, installing software becomes much easier than on Windows. Package managers make it so that only one command is needed to install software and an update can be done just as fast as well. It is one central place for software and updates rather than each software having its own installer/update system.

### Drawbacks of Linux
Linux does come with its own drawbacks due to its nature.

**A limited available software**
- Since the Linux market share is small compared to the number of Windows users, there is software that has remained only on the Windows platform since the cost of maintaining a Linux version is just not profitable. Examples are the Adobe Suite programs, Solidworks, and many games that are ported only to windows.

**Limited driver availability**
- Some devices have drivers made to work on windows but not on Linux. There are general drivers for a variety of devices on Linux developed by the community that mostly work but have the odd chance of not working for certain devices.

**Learning curve**
- Linux comes with a learning curve. Installing software is through a terminal most of the time and using software available on Linux often takes time as they are different from what people would normally be used to on windows.

---

#### About the Author
<img style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;" src="/assets/images/education/authors/jesus-nunez.jpg">Jesus Nunez is a Sophomore at Colorado School of Mines where he is getting his Computer Science degree with a focus in Computer Engineering. He is an avid Linux user and Vice President to the Linux Users Group.
