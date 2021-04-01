---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-is-linux/
title: What is Linux?
description: Initially released on September 17th, 1991, by Linux Torvalds, Linux is a set of open source Unix-like operating systems.
author: jesus-nunez
date: 2020-04-20T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-linux/hero.jpg
    alt: Linux Penguin
---
<img src="/engineering-education/what-is-linux/Tux_linux_logo.png" style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;">

Initially released on September 17th, 1991, by Linux Torvalds, [Linux](https://en.wikipedia.org/wiki/Linux) is a set of open source Unix-like operating systems. Unlike MacOS and Windows, Linux is open source, meaning that the source code that makes up the Kernel is available for anyone to use, modify, and distribute. Linux also operates similarly to the original [Unix system by Bell labs](https://en.wikipedia.org/wiki/Unix).

<!--more-->

### How does Linux work?
By itself, Linux is just a kernel. For that reason, Linux is often referring to as a collection of distributions such as Ubuntu, Debian, Fedora, and Arch. These distributions are bundles of different software that make up an operating system. These bundles are typically easy to install, often with dedicated installers that take the user step-by-step, while others are more hands-on during the installation process.

![linux distributions](/engineering-education/what-is-linux/linuxlogos.png)
*Image: Starting on the top left Debian, Ubuntu, Gentoo, Fedora, Arch Linux, Linux Mint*

### What makes up the Linux operating system?
The Linux operating system is composed of several different parts, including:

#### 1. Bootloader
The bootloader is a piece of software that loads the operating system once your PC turns on. Notable bootloaders are GRUB, syslinux, and systemd-boot. You can read more on each software in the boot section of the [Arch Linux wiki](https://wiki.archlinux.org/index.php/Arch_boot_process#Boot_loader).

#### 2. Kernel
This is what Linux is without any of the extra software. Barebones Linux is just the kernel that manages devices from keyboards to the actual CPU. It handles memory allocation and this is the lowest level in the OS with the most power over the system.

#### 3. Init system
The Init system is software that manages to boot the OS once the bootloader hands it off. The Init system is the first program to run when booted into Linux and it keeps running until shutdown. The init system is responsible for managing processes to run once in the operating system. Popular Init systems are systemD, anopa, openRC, and runit. SystemD is the most used (and [most controversial](https://www.infoworld.com/article/3159124/linux-why-do-people-hate-systemd.html)).

#### 4. Daemons
These are the background processes/services that run either on boot or after login to the desktop. The Init system manages daemons.

#### 5. Graphical server
The graphical server is in charge of managing the display of all graphics onto the screen. There are two graphical servers – X.org (often called X or X11) and Wayland. X is more commonly used, as it is the older of the two (1984). Wayland is a newer graphical server, with its initial release in 2008, and has been made to be more secure, simpler, and modern than X.

#### 6. Desktop environment
This software runs the actual desktop. The graphical server only displays content to the screen and the Desktop environment is what manages windows and how the overall desktop looks. The desktop environment generally comes with other software to make it easier to use. There is a wide variety of desktop managers, each with their own unique look and functionality. Notable examples are Bungie, GNOME, KDE Plasma, LXDE, and Cinnamon.

It is also possible to just install the window manager and not the whole environment. Window managers generally fall into two categories, tiled or stacking. A stacking window manager is what is used on Windows and MacOS. Each program is in a window that can be stacked on top of another. Meanwhile, a tiled window manager arranges programs in tiles that do not stack. When a program is opened in a tiled window manager, the window manager gives it a 'tile' that can be arranged with the other tiles.

### Where is Linux used?
Linux is used in a variety of places one may not expect. Many embedded devices run Linux, as it can require very little to run.

Creating software to run devices such as smart appliances and other embedded devices can be costly; Linux is used by many manufacturers as an alternative to creating their own systems.

Linux is also largely used in data centers and supercomputers due to the large amount of software available such as Docker/Kubernetes.

### Benefits of the Linux kernel
- **Free to use:** Unlike Windows and MacOS, the Linux operating system is free, meaning that there is no licensing fee associated with with using the product.

- **Open source:** The source code for Linux, along with much of the software used in the Linux operating system, is available online for anyone to view and modify. This allows anyone to contribute or make modifications to adapt to their specific use case. For example, the popular Android operating system on phones is based on Linux, as is Google's Chrome OS.

- **Customizable look:** Linux can take on many appearances. Unlike Windows, it is not locked into one desktop environment. With Linux, there are many different types of environments to choose from, such as Gnome, KDE Plasma, XFCE, and i3. Each has its own design and functionality and can be further customized to suit preferences.

- **Community support:** There is no shortage of forums and documentation that can be helpful to troubleshoot any issue that may arise. One popular wiki is the Arch Linux Wiki, whose dedicated community base has documented a large portion of Linux software.

- **Easy software installation and updates:** At first, using a terminal and package manager seems like a daunting task, but once familiar, installing software becomes much easier than on Windows. Package managers make it so that only one command is needed to install software and an update can be done just as fast as well. It provides one central place for software and updates, rather than each software having its own installer/update system.

### Drawbacks of Linux
Along with the many benefits, Linux does come with its own drawbacks as well.

- **Limited software availability:** Since the Linux market share is smaller compared to the number of Windows or MacOS users, there is software that has remained only on these proprietary platforms since the cost of maintaining a Linux version is simply not profitable. Examples include the Adobe Suite programs, Solidworks, and many games that are ported only to Windows.

- **Limited driver availability:** Some devices have drivers made to work on Windows or MacOS but not on Linux; however, support for Linux-compatible drivers has consistently grown over time.

- **Learning curve:** Linux comes with a learning curve. Installing and updating software through a terminal, along with general usage can take some time to get used to.
