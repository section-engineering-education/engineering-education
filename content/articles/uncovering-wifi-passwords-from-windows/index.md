# Uncovering WiFi passwords From Windows

## Introduction
Wi-Fi is widely used to connect to multiple networks at various times and locations. Be it a coffee shop, a free Wi-Fi hotspot, an office wireless network, or a home network, Wi-Fi is used everywhere. Over time, it becomes difficult to remember passwords for all Wi-Fi networks you connected to and saved in the past. Instead of trying to retrieve passwords from sysadmins, experts, or using other methods, if you forget your Wi-Fi password, Windows offers more options to see stored Wi-Fi key contents.

In windows, Wi-Fi passwords from saved Wi-Fi networks are hidden from the user, unlike other OS i.e. android, windows has terminals that can be used to acquire the Wi-Fi passwords from the saved Wi-Fi networks in the device. Windows OS has the ability to remember settings for many saved Wi-Fi networks, including network security keys.

With the use of PowerShell and cmd (also known as command prompt), we can be able to find the hidden Wi-Fi passwords by using simple cmd and PowerShell commands. This will enable users to use the passwords to connect other devices to the same Wi-Fi networks.

To uncover the WiFi passwords one should at least have a little knowledge about command prompt and Windows PowerShell.
### Key takeaways

- [What is CMD?](#what-is-cmd?)
- [What's PowerShell?](#what's-powershell?)
  - [Which windows versions have PowerShell installed?](which-windows-versions-have-powershell-installed?)
- [Steps to find the WiFi passwords using CMD](#steps-to-find-the-wifi-passwords-using-cmd)
- [Steps to find the WiFi passwords using PowerShell](#steps-to-find-the-wifi-passwords-using-powershell)

#### __What is CMD?__
Windows OS has a command-line translation tool called CMD. Used to create embedded references. Most of those commands use batch documents and files to automate tasks, perform high-level administrative tasks, and troubleshoot or resolve certain Windows issues.

Windows Command Processor is the official name of Command Prompt, but also known as command shell, cmd Prompt, or its file name, cmd.exe.

#### __What's PowerShell?__
In **computer science**, the shell is a user interface that provides access to a variety of application services. The shell can be based on the command line, or it can include a graphical interface (GUI).

***Windows PowerShell*** is a shell originally developed by Microsoft for user use and suspension management. PowerShell is now an open-source project, and can be installed on Windows, MacOS, and Linux Opererating Systems. This Shell is based on the NET framework, and incorporates a command line shell and writing language.
#### __Which windows versions have PowerShell installed?__
Almost all windows versions from windows 7 to windows 10 have Windows PowerShell installed by default.
If your pc doesn't have PowerShell [click here to install PowerShell core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.1)

#### __Steps to find the WiFi password using CMD__
After we have known and understood alittle bit about cmd and PowerShell we can now get to know the steps to use to uncover WiFi  passwords using cmd and PowerShell.
So lets get started with the cmd first ;

__Procedure 1:__ Go to your windows pc search box and search ***CMD*** and then click ***Run as administrator*** it's on the right side of your screen

![CMD search](/engineering-education/uncovering-WiFi-passwords-from-windows/cmd.jpg)

> *This is how the display of your pc's screen will be like*


**Procedure 2:**  To see a list of network names that we connect to, type `netsh wlan show profile` in the command prompt and then _run then command_. Make a note of the full name of the Wi-Fi network for which you're looking for the password.


![netsh wlan show profile](/engineering-education/uncovering-WiFi-passwords-from-windows/profile.png)
> *screenshot of step 2*


**Procedure 3:** Type `netsh wlan show profile name="Network name" key=clear`, substituting ‘Network name’ for the WiFi network name you just made a note of, i.e if my WiFi network name is ZeleFa I'll type "netsh wlan show profile name "ZeleFa" key=clear then Press Enter. 


![key=clear](/engineering-education/uncovering-WiFi-passwords-from-windows/keyclear.png)

>*As you can see from the above photo the password is visible.*

check on __"Security Settings"__ in the output, the field labeled "***Key content***" displays the WiFi password of the network.

With the above procedures you'll be able to acquire the WiFi passwords thanks to the simple CMD commands.

#### __Steps to find WiFi passwords using PowerShell__
Here it will be very simple to get the WiFi password since we've already known the commands from CMD.
Here are the steps ;

__Step 1__: First you will need to open PowerShell on pc, you can do that by right-clicking the Start Button and then click _Windows PowerShell_.Once it's open, type this command in your Windows PowerShell console.

> `netsh wlan show profile`

![netsh wlan show profile](/engineering-education/uncovering-WiFi-passwords-from-windows/powershellprofile.png)

> _The above photo is how your console should be after typing `netsh wlan show profile`_

__Step 2__: From the list of user-profiles/WiFi networks given in the console check for the name of the one you need its password and then run the command below, replacing "_WiFi name_" with the name of that WiFi network.

> `netsh wlan show profile name="WiFi name" key=clear`

For example if your WiFi network name is ZeleFa you should type _`netsh wlan show profile name="ZeleFa" key=clear`_

![netsh wlan show profile name="WiFi name" key=clear](/engineering-education/uncovering-WiFi-passwords-from-windows/passwordclear.png)

> _After running the command, your output should resemble the above photo_

check on "__Security Settings__" in the output, the field labeled "___Key content___" displays the WiFi password of the network.



