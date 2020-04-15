# What is Linux?

![alt text](https://github.com/jnunez101/engineering-education/blob/master/Tux.png "The Linux mascot, Tux")  
The Linux mascot, Tux

The Linux operating system is a free open source unix like operating system. Linux was initially released on September 17, 1991 by Linux Torvalds. Unlike MacOS and Windows, Linux is open source meaning that the code that makes up the Kernel is avaliable for anyone to see. Linux is also Unix-like meaning that it operates similar to the original Unix system by Bell labs. By itself Linux is just a kernel, for that reason Linux is often refering to the collection of distributions such as Ubuntu, Debian, Fedora, and Arch. These distributions are a bundle of software that make a whole operating system. These bundles are normally easy to install often with dedicated installers that take the user step by step, while others are more hands on during the install process.   

![alt text](https://github.com/jnunez101/engineering-education/blob/master/linuxlogos.png "Linux distribution logos")
Debian, Ubuntu, Gentoo, Fedora, Arch Linux, Linux Mint starting on the top left

### How Linux works?

The Linux operating system is made of several different parts.
1. Bootloader: The bootloader is a piece of software that loads the operating system once your pc turns on. Notable bootloader are GRUB, syslinux, and systemd-boot. You can read more on each software in the boot section of the [Arch Linux wiki](https://wiki.archlinux.org/index.php/Arch_boot_process#Boot_loader) 
2. Kernel: This is what Linux is without any of the extra software. Bare bones Linux is just the kernel which manages devices from keyboards to the actual CPU. It handles memory allocation and this is the lowest level in the OS with the most power over the system.
3. Init system: The Init system is software that manages booting the OS once the bootloader hands it off. The Init system is the first program ran when booted into Linux and it keeps running until shutdown. The init system is responsible for managing processes run once in the operating systems. Popular init systems are systemD, anopa, openRC, and runit. SystemD being the most used and most controversail.
4. Daemons: These are the background processes/services that run either on boot or after login to the desktop. The init system manages daemons.
5. Graphical server: The graphical server is incharge of managing displays. The graphical server displays all graphics onto the screen. There are two graphical servers X.org often called X or X11, and Wayland. The most used being X as it is the oldest of the two having its start in the year 1984. Wayland is a more modern graphical server with an initial release in 2008. Wayland has been made to be more secure, simpler, and modern than X.
6. Desktop enviroment: This software is runs the actual desktop. The graphical server only displays content to the screen and the Desktop enviroment is what manages windows and how the overall desktop looks. The desktop enviroment generally also comes with other software to make use easier. There is a wide variety of desktop managers each with unique looks and functionality. Notable examples are Bungie, GNOME, KDE Plasma, LXDE, and Cinnamon. It is also possible to just install the window manager and not the whole enviroment. Window managers generally fall into two catagories, tiled or stacking. A stacking window manager is what is used on Windows and MacOS. Each program is in a window that can be stacked on top of another. Meanwhile a tiled window manager arranges programs in tiles that do not stack. When a program is opened in a tiled window manager, the window manager gives it a 'tile' that can be arranged with the other tiles.
### Places where Linux is used

Linux is used in a variety of places one would not expect. Many embedded devices run Linux as it can be require very little to run. As it would cost money to create software to run devices such as smart appliances and other embedded devices, Linux is used instead by many manufacturers as an alternative to creating their own system. Linux is also large in data centers and super computers due to the large amount of software avaliable such as Docker/Kubernetes. 

### Benefits of Linux

Benefits of the Linux kernel  
* Linux is free!!
    * Unlike Windows and MacOS, the Linux operating system is free and open sourced. There is no cost to having a license to use the product. This means anyone can install the operating system without any cost. 
* Open source
    * The code to Linux and many of the software used in the Linux operating system is avaliable online for anyone to view and modify. This allows for anyone to contribute or to make modifications for their specific case. For example the popular Android operating system on phones is based on Linux and so is Google's Chrome OS. 
* Customizatizable looks
    * Linux can take on many appearances. Unlike windows it is not locked into one desktop enviroment. In Linux there are many different types of enviroments that can be choosen from such as Gnome, KDE Plasma, XFCE, and i3. Each has their own design and functionality along with looks and customizability. 

* Community support
    * There is no shortage of forums and documentation that can be helpful to troubleshoot any issue that can occur. A popular wiki is the Arch Linux Wiki due to its dedicated community that has documented a large portion of Linux software.
* Easy software installation and updates
    * At first using a terminal and package manager seem like a daunting task but once used to it, installing software becomes much easier than on Windows. Package managers make it so that only one command is needed to install software and an update can be done just as fast to. It is one central place for software and updates rather than each software having its own installer/update system.

### Drawbacks of Linux

Linux does come with its drawbacks due to its nature.
* A limited avaliable software
    * Since the Linux market share is small compared to the number of Windows users, there is software that has remained only on the windows platform since the cost of maintaining a Linux version is just not profitable. Examples are the Adobe Suit programs, Solidworks, and many games that are ported only to windows. 
* Limited driver avaliability
    * Some devices have drivers made to work on windows but not on Linux. There are general drivers for a variety of devices on Linux developed by the community that mostly work but have the odd chance of not working for certain devices. 
* Learning curve
    * Linux comes with a learning curve. Installing software is through a terminal most of the time and using software avaliable on Linux often takes time as they are different to what people would normaly be used to on windows.





