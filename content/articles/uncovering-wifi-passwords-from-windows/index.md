In this generation, Wi-Fi has become an important thing to many of us. Whenever you go to different places, whether in town, houses, or shops, you will find people using WiFi on their devices. It could be on a smartphone, a desktop computer, a tablet, or even a personal computer. These devices may be connected to different Wi-Fi networks, which may require a key code or password to connect to them. As time goes by, one may forget the WiFi password of a specific Wi-Fi network he or she is interested in. Well, don’t worry, the Windows operating system has got you covered. Windows has the ability to save/store all Wi-Fi network passwords that have previously been connected to your device.

In windows, Wi-Fi passwords from saved Wi-Fi networks are hidden from the user. Unlike other operating systems like Android, Windows has terminals that can be used to acquire the Wi-Fi passwords from the saved Wi-Fi networks in the device. You will be required to write some simple commands on the terminals in your Windows OS device. In this article, I'll take you through how you will be able to unсоver Wi-Fi раsswоrds from the saved Wi-Fi networks in your device, and I'll also give you the commands to use them.

With the use of PowerShell and cmd (also known as command prompt), we can be able to find the hidden Wi-Fi passwords by using simple cmd and PowerShell commands. This will enable users to view the passwords to connect other devices to the same Wi-Fi networks.

To uncover the WiFi passwords, you should at least have a little knowledge about command prompt and Windows PowerShell.

### Table of Contents

- [What is CMD?](#what-is-cmd?)
- [What's PowerShell?](#what's-powershell?)
  - [Which windows versions have PowerShell installed?](#which-windows-versions-have-powershell-installed?)
- [Steps to find the WiFi passwords using CMD](#steps-to-find-the-wifi-passwords-using-cmd)
- [Steps to find the WiFi passwords using PowerShell](#steps-to-find-the-wifi-passwords-using-powershell)
- [How to Uncover WiFi Passwords in other Operating Systems](#how-to-uncover-wifi-passwords-in-other-operating-systems)
- [Conclusion](#conclusion)

### What is CMD?

Windows OS has a command-line translation tool called CMD which is used to create embedded references. Most of those commands use batch documents and files to automate tasks, perform high-level administrative tasks, and troubleshoot or resolve certain Windows issues.

Windows Command Processor is the official name of Command Prompt, but also known as command shell, cmd prompt, or its file name, cmd.exe.

#### What's PowerShell?

A shell is a user interface that provides access to a variety of application services. The shell can be based on the command line, or it can include a graphical interface (GUI).

***Windows PowerShell*** is a shell originally developed by Microsoft for user use and suspension management. PowerShell is now an open-source project, and can be installed on Windows, MacOS, and Linux Opererating Systems. This Shell is based on the .NET framework, and incorporates a command line shell and writing language.

### Which windows versions have PowerShell installed?

Almost all windows versions from windows 7 to windows 11 have Windows PowerShell installed by default.

If your pc doesn't have PowerShell [click here to install PowerShell core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.1)


After we have known and understood alittle bit about cmd and PowerShell, we can now get to know the steps to use to uncover WiFi passwords using cmd and PowerShell.

#### Steps to find the WiFi password using CMD

**Step 1:** Go to your Windows search box and search ***CMD*** and then click ***Run as administrator*** (it's on the right side of the search box)

![CMD search](/engineering-education/uncovering-WiFi-passwords-from-windows/cmd.jpg)

> *This is how the display of your pc's screen will be like*

**Step 2:** You will need to type `netsh wlan show profile` in the command prompt console and then _run then command_. A list of names of all saved Wi-Fi networks that were ever connected to your Windows device in the past will be displayed in your output.

![netsh wlan show profile](/engineering-education/uncovering-WiFi-passwords-from-windows/profile.png)

> *screenshot of Step 2*

**Step 3:** you'll need to type `netsh wlan show profile name="Network name" key=clear`, substituting ‘Network name’ for the WiFi network that you want to get it's password. For example, if my WiFi network name is "ZeleFa" I'll type "netsh wlan show profile name "ZeleFa" key=clear" then Press Enter. 

![key=clear](/engineering-education/uncovering-WiFi-passwords-from-windows/keyclear.png)

> *As you can see from the above photo the password is visible.*

The Wi-Fi password will be displayed on a field labelled "***Key Content***" on the "___Security Settings___"

With the above procedures you'll be able to acquire the WiFi passwords thanks to the simple CMD commands.

## Steps to find WiFi passwords using PowerShell

Powershell and Command Prompt are almost similar in every aspect. In Powershell, it will be easier for us to get the WiFi password from the saved Wi-Fi networks since we've already known the commands from CMD. You will only need to repeat the procedures in [Steps to find the WiFi passwords using CMD](#steps-to-find-the-wifi-passwords-using-cmd) on your windows powershell console.

### How to Uncover WiFi Passwords in other Operating systems
Other operating systems such like Mac and Linux have various ways of uncovering WiFi passwords from saved WiFi networks.

In Mac OS, we can find WiFi passwords for saved WiFi networks by using the ***terminal***. You'll have to open the terminal then type and run this command; `security find-generic-password -wa "wifiname"` substituting "wifiname" with the name of your WiFi network. You'll then be required to fill in your admin credentials and thereafter your password will be displayed in your terminal console.

In Linux OS, WiFi passwords of saved networks can be acquired by running this command in the command line `$ sudo grep psk= /etc/NetworkManager/system-connections/*` this will show you the list of the WiFi networks and their passwords.


### ***Conclusion***
With those few steps you'll definately be able to uncover your Wi-Fi password in your Windows OS device.





