### Setting Up Kali Linux for dual boot
To `Dual boot` a machine is to have two operating systems on the same machine. You can choose which operating system to work on during the booting process. 

In this tutorial, we will be able to are going to learn how to set up `Kali Linux` onto a machine already installed with Windows.
This process allows you to keep your data initially in a Windows machine.
> **Note:** This process is similar to any other Kali Linux-related operating system such as Ubuntu etc.

First, let's see what we will need for the process to be successful.

### Prerequisites
For a successful setup, you will need the following to get started.

   1. 8GB or higher pen drive.
   2. Minimum space of 25GB on your Hard drive.
   3. Windows OS running on your PC or Laptop.

### Required Files
Let's now download the files required during the process.

#### 1. Downloading Kali Linux iso image
On your browser, navigate to the Kali Linux official page and download the latest version of [Kali Linux](https://kali.org/get-kali/#kali-bare-metal).

#### 2. Creating a bootable pen drive
We will first download software that we will use to make our pen drive bootable. My favorite software is `Rufus`.

Download [Rufus](http://rufus.ie/en_US/) from the page linked.

Open Rufus and insert the pen drive onto your PC.
Now select the appropriate options depending on the pen-drive you intend to create or the OS you want to install.

Ensure that your Pen Drive is empty as the process will format the drive. Carefully select the options appropriately to avoid any errors at any point in the installation process.

![Pen Drive Options](/engineering-education/setting-up-kali-linux-for-dual-boot/rufus.png)

Wait patiently as the process might take a while depending on your pen drive.

### Create Space for Kali Linux
On your Windows, navigate to the Disk Manager option by searching `Computer management` from your search bar. Select your primary disk where your Windows OS is located.

Right click and allocate the amount of space suitable for your Kali Linux.
Your Partition will appear as shown below.

![Shrinking Primary Disk](/engineering-education/setting-up-kali-linux-for-dual-boot/shrink.png)

### Installing Kali Linux
After successfully shrinking space for Kali Linux, let's now install Kali Linux onto the OS.

Reboot your PC and access the boot menu. You can access the boot menu by clicking either the `esc`, `f2`, `f10`, or `f12` depending on the manufacturer of your computer.

After accessing the boot menu, you will note that your pen drive will be listed on the boot menu.
Now select your pen drive and choose to boot your PC from it. 

Choose the `options` as guided below to avoid any errors during the installation process.

   * select the **Graphical Installation**
   * choose **Language**- for my case `English`
   * select your **Region** and you preferred **Keyboard lab**

Now, wait for the installation set up to `Load all components`. This will take a few seconds.

For the following set-up, I will give you the preferred choice to select for an assured successful set-up.

   * Load missing firmware from removable media? `No`
   * Connect to your WiFi card if one is available - This is optional.

Wait for the set-up to `Configure all the Networks`. This process is also quick.

Let's now create a user for our Kali Linux.

   * Set the `Host name` and `Domain name` as you wish - This is an optional step.
   * Input your name and hit the continue button.
   * Enter your `password` and confirm your entry.
        > **Note**- Remember your `Username` and `Password` since you will require them on every Login session.
        
Now it is time to `Create partitions for Kali Linux`. Since we have already created space for Kali Linux, we will do this manually. 
   * So select the `Manual` option - This will display a list of all the drives on the PC.
   * Choose the drive with `Free space` - This is now the space we created. We will further create two partitions from the free space we have. 
   One of the partitions will be the `root partition` for Kali Linux and the other will be the `Swap area`.
   
First, let us Create a **Root partition** - This is where the Kali Linux will be installed.

Choose the free space option and select the options as given below.

   * Select the `Create a new partition option` 
   * Allocate a `space of 95% or more of the Free space` to the root partition.
   * Select the location of the new partition as the `beginning`.
   * Choose the `File system` as `Ext4 journaling`
   * `Mounting Point` - `/ - the root file system`
   * **Note** - Don't forget to choose `Done setting up the Partition` before clicking continue otherwise you will have to start the partition process all over again.

Now let's create a `swap partition`.

Swap Area accesses virtual RAM if the system has a less amount of physical memory. If your PC has a RAM of 16GB RAM or more, there is no need to create a swap partition.

   * Select the options same as creating a root partition.
   * Upon asked to select `How to use this partition` - select `Swap area` option.
   * Remember to select done `setting up the partition`.
   
On arriving at this point, you have successfully created a partition.
Click `Finish partitioning and write changes to disk` and then hit the continue button.
   * on the **Write changes to disk** option select `Yes` and wait for the installer set-up to `Install the base system`.
   
**Software selection**

* Here you now have to choose your favorite desktop environment. For my case, I will choose the `Xfce (Kali default desktop environment`).

Lastly, click continue without altering the other changes. Wait for the installation process to complete.
Seatback, relax and take a sip of your coffee. This process might take a while.

When the installation process is complete, you can now reboot your PC. As the PC is rebooting remove your pen drive.

**After Reboot**

After reboot, Kali Linux will load into Kali Linux boot `GRUB loader`. This is where it gives you the option to either load into Kali Linux or Windows. Let's load into Kali Linux for our tutorial.

Now you will be displayed with a login screen as shown below.

![Login page](/engineering-education/setting-up-kali-linux-for-dual-boot/login.png)

Enter your Login credentials, that is your `Username` and `Password` as we set up.

Upon successful entry of credentials, you will be able to access your Kali Linux on your PC. If it is your first time using Kali Linux, you can go through the [Getting started with Kali Linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/) article.

Enjoy your Kali Linux journey. Cheers!

### Summary
In this article, we have learned:

1. The process of creating a bootable pen drive.
2. How to create space to set up your OS.
3. How to install Kali Linux.