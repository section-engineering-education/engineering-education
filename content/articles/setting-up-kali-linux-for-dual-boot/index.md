### Introduction
To `Dual boot` a machine is to install two operating systems on the same machine. You can choose which operating system to work with during the booting process. 

### Reasons for installing Kali Linux alongside Windows:
- Kali Linux is primarily developed for Security purposes. This limits Kali Linux's support for some integrated development environments and applications. For instance, as a developer, you might not comfortably use Android Studio on Kali Linux compared to windows.
- Windows on the other hand can not be used for security research since it does not have major security tools used for research purposes. This limits its potential to be used in security researches and management.

To solve these two problems, you need to install both Kali Linux and Windows on the same machine. To do so without losing any of your data, carefully follow the procedure given below.

In this tutorial, we will learn how to set up `Kali Linux` onto a machine already installed with Windows. This process allows you to safely keep your data initially on Windows.
> **Note:** This process is similar to any other Linux-based operating system.
 
### Prerequisites
For a successful setup, you need the following:
1. An 8GB or higher pen drive.
2. Minimum space of 25GB on your Hard drive.
3. Windows OS running on your PC or laptop.

### Getting started
Now, download the files required during the process.

#### Downloading Kali Linux Iso image
Navigate to the [Kali Linux official site](https://kali.org/get-kali/#kali-bare-metal) and download the latest version of Kali Linux.

#### Creating a bootable pen drive
We will first download software used to make a pen drive bootable.
We'll use `Rufus` in this context. But, why **Rufus?**

Rufus is a superfast, lightweight, and error-free software. It also supports multiple platforms such as Kali Linux and Windows operating systems.
You can download [Rufus here](http://rufus.ie/en_US/).

Open Rufus and insert the pen drive onto your machine. 

Select the appropriate options depending on the pen drive and the OS you want to install.

Ensure that the pen drive is empty as the process will format the drive. Carefully select the options appropriately to avoid any errors at any point.

![Pen Drive Options](/engineering-education/setting-up-kali-linux-for-dual-boot/rufus.png)

Patiently wait as the process might take a while depending on your pen drive.

### Creating space for Kali Linux
On your Windows machine, navigate to the disk management options by searching `computer management` on the search bar. Select the primary disk where Windows OS is located.

Right-click and allocate the amount of space suitable for Kali Linux. The partition should appear as shown below:

![Shrinking Primary Disk](/engineering-education/setting-up-kali-linux-for-dual-boot/shrink.png)

### Installing Kali Linux
After successfully shrinking the space, install Kali Linux on the machine as follows:

Reboot your machine and access the boot menu. You can access the boot menu by either clicking the `esc`, `f2`, `f10`, or `f12` keys depending on the architecture of your machine. Follow the directives from the manufacturer for more information.

Select the pen drive listed on the menu to boot your PC from it. 

Choose the `options` as guided below to avoid any errors during the installation process.

- Select **Graphical Installation**.
- Choose **Language**- in my case, `English`.
- Select your **Region** and your preferred **Keyboard lab**.

Wait for the installation set-up to load all components. This should take a short while.

In the following setup, we'll use the recommended choices for an assured successful set-up.

- Load missing firmware from removable media? - `No`.
- Connect to your WiFi card if one is available - This is optional.

If in case you decided to connect to a WiFi network or internet connection. Wait for the set-up to `configure all the Networks`. This process is also quick.

Moving on, create a primary user for Kali Linux.

- Set the `Host name` and `Domain name` as you wish - This is an optional step. The **hostname** is the name allocated to the device when connected to a network, on the other hand, the **domain name** is the physical address of the device. It is the easily recognized part of the IP address.
- Enter your `username` and hit the continue button.
- Enter and confirm the `password` entry.

> **Note:** Remember your `username` and `password` since they are case sensitive and you will require them on every login session.

### Creating disk partitions
Since we have already created space for Kali Linux, we will do this manually. 
- Select the `manual` option - This will display a list of all the drives on the PC.
- Choose the drive with `free space` - This is the space we created. We will further create two partitions from the available free space.

One of the partitions will be the `root partition` for Kali Linux and the other will be the `swap area`.

First, let's create a **root partition** - This is where the operating system will be installed.

Choose the free space option and select the options as shown below.

- Select **create a new partition option**.
- Allocate a space **95% or more** of the free space to the root partition.
- Select the location of the new partition as the **beginning** of the drive.
- Choose the File system as **Ext4 journaling**.
- Mounting Point **/** - the root file system.

**Note:** Click `done setting up the partition` before proceeding. Otherwise, you will have to start the partitioning process over again.

### Creating a swap partition
Swap area access virtual RAM if the system has less amount of physical memory. If your machine has 16GB of RAM or more, there is no need to create a swap partition.

- Select the options same as creating a root partition.
- Select the `swap area` option as the use of the partition.
- Remember to select `done setting up the partition`.

At this point, you have successfully created a partition.
Click `Finish partitioning and write changes to disk` then hit the continue button.

On the **write changes to disk** option, select `Yes` and wait for the installer set-up to `install the base system`.

### Software selection
Here you have to choose a desktop environment. A **desktop environment** is a collection of software that runs on top of the operating system and makes up the `Graphical User Interface`. Take the desktop environment as the general outlook of your Kali Linux. 

### Three major desktop environments
- `Xfce` - This is the default and commonly used desktop environment. It is fast, lightweight, and appealing to users.
- `KDE` - This desktop environment provides basic functions and applications to perform basic daily tasks. It has tools that allow collaborative work hence known as a central development hub.
- `GNOME` - This desktop environment provides simplicity and ease of use for Kali Linux. It was developed with the intent to make Kali Linux user-friendly for non-programmers.

In this case, we'll choose the `Xfce` environment.

Lastly, click continue without altering the other changes. Wait for the installation process to complete. This might take a while.

When the installation process is complete, reboot your machine and remove the pen drive.

### What happens after rebooting?
After rebooting, Kali Linux will load into `GRUB boot loader`. This is where you're given the option to either boot into Kali Linux or Windows. Select Kali Linux in this case.

The login screen will be displayed as shown below:

![Login page](/engineering-education/setting-up-kali-linux-for-dual-boot/login.png)

Enter your login credentials, that is, your `username` and `password` to proceed.

Upon successful login, you will be able to access Kali Linux home screen on your machine. If it is your first time using Kali Linux, you can go through [this article](https://www.section.io/engineering-education/getting-started-with-kali-linux/) for more information.

### Conclusion
In this article, we have learned:

1. The process of creating a bootable pen drive.
2. How to create space to set up your OS.
3. How to install and create a user in Kali Linux.

Enjoy your Kali Linux journey.
