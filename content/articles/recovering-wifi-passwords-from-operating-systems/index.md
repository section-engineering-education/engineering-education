---
layout: engineering-education
status: publish
published: true
url: /recovering-wifi-passwords-from-operating-systems/
title: Recovering Wi-Fi Passwords From Windows, macOS and Linux
description: This tutorial will help you recover forgotten Wi-Fi passwords if the device you have has connected to the Network atleast once and has a terminal.
author: lenox-majiwa
date: 2021-11-25T00:00:00-12:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/recovering-wifi-passwords-from-operating-systems/hero.jpg
    alt: Recovering Wi-Fi Passwords from Windows, macOS and Linux Hero Image
---
In this generation, [Wi-Fi](https://www.cisco.com/c/en/us/products/wireless/what-is-wifi.html) has become an important thing to many of us. Whenever you go to different places, whether in town, houses, or shops, you will find people using WiFi on their devices. It could be on a smartphone, a desktop computer, a tablet, etc.
<!--more-->
These devices may be connected to different Wi-Fi networks, which may require a password to connect to them. As time goes by, one may forget the WiFi password of a specific Wi-Fi network that they are interested in.

Operating systems such as Windows, macOS, and Linux can save all the Wi-Fi network passwords that have previously been connected to your device.

In these three Operating systems, Wi-Fi passwords from saved Wi-Fi networks are hidden from the user. Unlike mobile operating systems like Android, desktop operating systems like Windows, macOS and Linux have terminals that can be used to acquire the Wi-Fi passwords that are saved in the device.

You'll be required to write some simple commands on the respective terminals to recover these saved passwords.

In this article, I'll take you through the steps to reсоver Wi-Fi раsswоrds that are saved in your device. This will enable users to view the passwords to connect other devices to the same Wi-Fi networks.

### Table of contents
- [Steps to find WiFi passwords using PowerShell](#steps-to-find-wifi-passwords-using-powershell)
  - [How to uncover WiFi passwords in other Operating systems](#how-to-uncover-wifi-passwords-in-other-operating-systems)
  - [Mac OS](#mac-os)
  - [Linux](#linux)
  - [Conclusion](#conclusion)

### What is CMD?
Windows OS has a command-line translation tool called CMD which is used to create embedded references. Most of those commands use batch documents and files to automate tasks, perform high-level administrative tasks, and troubleshoot or resolve certain Windows issues.

Windows Command Processor is the official name of Command Prompt, but also known as command shell, cmd prompt, or its file name, cmd.exe.

To know more about **CMD**, [click here](https://en.wikipedia.org/wiki/Cmd.exe).

#### What's PowerShell?
A shell is a user interface that provides access to a variety of application services. The shell can be based on the command line, or it can include a graphical interface (GUI).

**_Windows PowerShell_** is a shell originally developed by Microsoft for user use and suspension management. PowerShell is an open-source project and can be installed on macOS, Windows, and Linux Operating Systems. This Shell is based on the .NET framework and incorporates a command-line shell and writing language.

For more about PowerShell [Click here](https://en.wikipedia.org/wiki/PowerShell)

### Which windows versions have PowerShell installed?
Almost all windows versions from windows 7 to windows 11 have Windows PowerShell installed by default.

If your pc doesn't have PowerShell, [click here to install PowerShell core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.1).

Now that we know a little bit about CMD and Powershell, we can get to know the steps to recover the Wi-Fi passwords using cmd and PowerShell.

#### Steps to find the WiFi password using CMD
**Step 1:** Go to your Windows search box and search **_CMD_**, then click **_Run as administrator_** (it's on the right side of the search box)

_This is how the display of your PC's screen will be like:_

![CMD search](/engineering-education/recovering-wifi-passwords-from-operating-systems/cmd.jpg)

**Step 2:** You will need to type `netsh wlan show profile` in the command prompt console and then run the command. A list of names of all saved Wi-Fi networks that were ever connected to your Windows device in the past will be displayed in your output.

_screenshot of Step 2:_

![netsh wlan show profile](/engineering-education/recovering-wifi-passwords-from-operating-systems/profile.png)

**Step 3:** you'll need to type `netsh wlan show profile name="Network name" key=clear`, substituting ‘Network name’ for the WiFi network that you want to get its password. For example, if my WiFi network name is "ZeleFa" I'll type "netsh wlan show profile name "ZeleFa" key=clear" then Press Enter.

![key=clear](/engineering-education/recovering-wifi-passwords-from-operating-systems/keyclear.png)

_As you can see from the photo above the password is visible._

The Wi-Fi password will be displayed on a field labeled "**_Key Content_**" on the "**_Security Settings_**"

## Steps to find WiFi passwords using PowerShell
Powershell and Command Prompt are almost similar in every aspect. In Powershell, it'll be easier for us to get the WiFi password from the saved Wi-Fi networks since we've already known the commands from CMD.

You'll need to repeat the steps in [Steps to find the WiFi passwords using CMD](#steps-to-find-the-wifi-passwords-using-cmd) on your Windows PowerShell console.

### How to uncover WiFi passwords in other Operating systems
Other operating systems such as Mac and Linux have various ways of uncovering WiFi passwords from saved WiFi networks.

### Mac OS
In Mac OS, we can find WiFi passwords for saved WiFi networks by using the **_terminal_**.

Step 1:

You'll have to open the terminal then type and run this command: `security find-generic-password -wa "wifiname"` substituting "wifiname" with the name of your WiFi network.

_searching terminal in your pc:_

![Terminal](/engineering-education/recovering-wifi-passwords-from-operating-systems/terminal.jpg)

_image showing how to write the step 1 command:_

![Step 1](/engineering-education/recovering-wifi-passwords-from-operating-systems/security.jpg)

Step 2:

You'll then be required to fill in your admin credentials and thereafter your password will be displayed in your terminal console.

_Enter your security credentials as shown:_

![Security confirmation](/engineering-education/recovering-wifi-passwords-from-operating-systems/fade.jpg)

_Your password is visible:_

![Password uncovered](/engineering-education/recovering-wifi-passwords-from-operating-systems/lase.jpg)

[Click here](https://en.wikipedia.org/wiki/MacOS) to know more about **MacOS**.

### Linux
In Linux OS, WiFi passwords of saved networks can be acquired by running this command in the command line `sudo grep psk= /etc/NetworkManager/system-connections/*`. This will show you the list of the WiFi networks and their passwords.

[Click here](https://www.linux.com/what-is-linux/) for more information about **Linux**.

### Conclusion
People can be forgetful, but from now on, you don't have to worry about remembering your Wi-Fi passwords. You'll be able to recover your Wi-Fi password from any Windows/Mac/Linux operating system.

These operating systems have other different commands that may be useful to your tech-life

Refer to the articles below to learn more about commands in:
- Windows CMD [click here](https://www.thomas-krenn.com/en/wiki/Cmd_commands_under_Windows)
- Windows powershell [click here](https://devblogs.microsoft.com/scripting/table-of-basic-powershell-commands/)
- MacOS Terminal [click here](https://www.techrepublic.com/article/macos-terminal-commands-every-mac-user-should-know/)
- Ubuntu Linux [click here](https://www.dell.com/support/kbdoc/en-us/000123974/introduction-to-basic-troubleshooting-commands-within-ubuntu-linux)

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
