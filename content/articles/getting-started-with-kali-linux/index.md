---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-kali-linux/
title: Getting Started with Kali Linux
description: In this article, we will learn about Kali Linux. It is a penetration-testing platform that provides a variety of security auditing tools used by security specialists and hackers in day-to-day encounters.
author: meshack-kimosop
date: 2021-06-23T00:00:00-13:30
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-kali-linux/hero.jpg
    alt: Kali Linux Image
---
**Kali Linux** is a very popular penetration testing platform that provides a variety of security auditing tools used by security specialists and hackers in day-to-day encounters.
<!--more-->
Tools available on Kali Linux enable the user to gather information, perform exploits, and prevent their devices from being exploited.

### Installing Kali Linux
For beginners, it may seem complex having Kali Linux as your main operating system since you will mostly be running commands on a terminal rather than using the Graphical User Interface (GUI). 

It is therefore advised to have your Kali Linux installed in a **virtual box**. This enables you to do your other operations in the main operating system.

You can have your Kali Linux in your favorite virtual box. 

Available virtual boxes include:
- [Vmware virtual box](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)
- [Hyper V virtual box](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v)
- [Oracle virtual box](https://filehippo.com/download_virtualbox/) 
  
For our tutorial, we will be using VMware virtual box (My favorite).

#### Download Kali Linux iso
Prior to installing the VMware you have to download the Kali Linux iso. 

Use the link below to get to the download page:

- [Kali Linux iso](https://www.kali.org/get-kali/#kali-platforms)

#### Download Vmware virtual box
After successfully downloading the Kali Linux iso, you can now download the VMware virtual box using the link below:

- [Vmware virtual box](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html).

Follow the [installing Vmware](https://forums.tomshardware.com/faq/how-to-install-vmware-workstation-in-windows-10.3273363/) tutorials to successfully install the VMware virtual box.

#### Installing Kali Linux in Vmware virtual box
You now have all the requirements to successfully set up Kali Linux inside the VMware virtual box.

Next, follow the guidelines in the "Installing Kali Linux in VMware" to successfully install Kali Linux.

![Login page](/engineering-education/getting-started-with-kali-linux/login.png)

Cheers! You have successfully installed Kali Linux and now ready to go on.

### Starting Kali Linux
In your virtual box, select the Kali Linux option and click the play button to start your Kali Linux.

Enter your username and password when prompted.

**Note:** The **default** username is **root** and the default password is **toor**.

#### Updating Kali Linux
It is recommended to frequently update your Kali Linux and its tools to the latest versions to keep it up to date. 

Follow the steps below to update and upgrade Kali Linux:

- Start the **terminal** by:
        
   - Holding the **cltr+alt+T** buttons simultaneously or
   - Using the GUI (Graphical User Interface), go to the applications section and double click on the terminal option.

Now run the command below on the terminal to update and upgrade your Kali Linux.

```bash
    $ apt-get update && upgrade -y
```

> **Note:** If it fails to update, precede the command with the **sudo** keyword since the command requires root privileges.

### Major commands
To be able to efficiently operate on Kali Linux, you should be able to run some `major commands`.

You can also navigate through Kali Linux courtesy of the **Graphical User Interface (GUI)** feature. Despite that, it is recommended to `use the terminal` to navigate through Kali Linux since it is super fast and not so hard to learn the commands.

So without much delay, let's dive right in.

1. **Changing password**
   
For security purposes, you are advised to change your password from the default password to a password of your choice. You can do so by running the command below:

```bash
    $ passwd
```

Enter a new password and retype it to confirm it.

![Password](/engineering-education/getting-started-with-kali-linux/passwd.png)

**Note:** Remember your password since you will require it whenever you log in.

2. **Present working directory**
   
You can see your present working directory by simply running the command `pwd`.

```bash
    $ pwd
```

![pwd](/engineering-education/getting-started-with-kali-linux/pwd.png)

3. **Listing directories**

To list all the directories and files in the present working directory, run the `ls` command below:

```bash
    $ ls
```

![ls](/engineering-education/getting-started-with-kali-linux/ls.png)

4. **Listing hidden files**

For you to list all the hidden and non-hidden files in the directory, use the `ls -la` command since the 'la' command will now display the hidden files.

```bash
    $ ls -la 
```

![ls -la](/engineering-education/getting-started-with-kali-linux/ls-la.png)

You will notice that some file names are preceded with a dot, those are the hidden files. 

They cannot be seen in the GUI.

5. **Changing directory**

To navigate into a directory, type in the `cd` keyword followed by the directory name. 

An example is shown below.

```bash
    $ cd Downloads
```

![cd](/engineering-education/getting-started-with-kali-linux/cd.png)

To move a step back from the present directory, just type the `cd ..` command. Don't forget to add the two full stops separated from the cd keyword by a space.

```bash
    $ cd ..
```

![cd](/engineering-education/getting-started-with-kali-linux/cd1.png)

**Trick:** If you are not sure of a command, you can type in half of the command and press the tab key to autocomplete the command. You can also double-tap the tab key to see the available options of the half command typed.

6. **Accessing the internet browser**

To be able to access the internet browser, just type in the name of your favorite browser (eg. `firefox` or `chrome`) and you will get a pop-up of the browser.

```bash
    $ firefox
```

![firefox](/engineering-education/getting-started-with-kali-linux/firefox.png)

Running the command above will pop up a window of the browser stated.

7. **Creating a directory**

To create a new directory (commonly known as a folder in Windows), run the `mkdir` command followed by the preferred name of the directory and run the command as shown in the example below:

```bash
    $ mkdir New
```

![mkdir](/engineering-education/getting-started-with-kali-linux/mkdir.png)

**Note:** The directory will be created on your present working directory.

To relatively remove a directory, simply run the `rmdir` command before the directory name as shown below:

```bash
    $ rmdir New
```

![rmdir](/engineering-education/getting-started-with-kali-linux/rmdir.png)

8. **Adding a text into a file**

Before explaining, run the command below in your terminal.

```bash
    $ echo 'Hello World' > new.txt
```

**Notice:** The `echo` keyword adds the words quoted into the file stated or just displays the words if the file is not stated.

![echo](/engineering-education/getting-started-with-kali-linux/echo.png)

9. **Locate a file**

To locate a file, simply type in the `locate` keyword followed by the file name to locate.

```bash
    $ locate new.txt
```

10. **Display content of a file**

To see the contents of a file, use the `cat` keyword followed by the name of the file to display the content.

```bash
    $ cat renamefile.txt
```

![cat](/engineering-education/getting-started-with-kali-linux/cat.png)

11. **Find your IP**

To find your IP address just type in the `ifconfig` command. This is similar to the `ipconfig` in Windows.

> Remember to precede your command with the `sudo` keyword since it requires root privileges

```bash
    $ sudo ifconfig
```

### Major tools
Kali Linux provides a wide range of security auditing tools but for this tutorial, we will discuss some of the commonly used tools.
 
We will categorize the tools according to their functionality:

1. **Information gathering and vulnerability analysis**
   
Tools available: `Nmap`, `Zenmap` etc.

- **Nmap**

Let's discuss Nmap since it is the commonly used information-gathering tool.

Nmap is a tool that gathers information by scanning the target's IP address or URL. You can learn more about Nmap scanning and interpretation from the "Introduction to Nmap" tutorial linked below.

To access Nmap, type in the `Nmap` command on the terminal followed by the target to scan as shown in the example below:

```bash
    $ nmap scanme.nmap.org
```

To learn more on [nmap](/engineering-education/nmap-network-scanner/), go through the tutorial linked.

2. **Password attacks**

Tools available: `John the Ripper`, `Hydra` etc

- **John the Ripper**

`John the Ripper` is a free password cracking tool originally made for Unix but now available on Kali Linux. It works by use of the dictionary method to perform brute force on the target.

You can access various tools available on John the Ripper by typing in the keywords eg `john`, `maller`, `unshadow`, `unique` etc.

You can learn more about [John the Ripper](https://www.varonis.com/blog/john-the-ripper/) in the article linked.

3. **Reverse Engineering**

Tools available: `NASM tool`, `Clang`

- **NASM tool**

The NASM tool allows users to program an assembler. You can do so by saving the assembly code on the cherry tree with the .asm extension. 

On the terminal run the commands depending on the code you are running.

You can learn more on  [nasm](https://cs.lmu.edu/~ray/notes/nasmtutorial/) here.

4. **Exploitation**

Tools available: `Metasploit Framework`, `Proxychains`

- **Metasploit Framework**

Metasploit Framework is a powerful penetration tool that has numerous modules used to examine a system's vulnerability and possibly exploit it.

To access Metasploit Framework on your terminal, run the `msfconsole` command and the fancy Metasploit framework pops up with `msf 5 > ` shell to run commands.

```bash
    $ msfconsole
```

![msfconsole](/engineering-education/getting-started-with-kali-linux/msfconsole.png)

You can learn more about [metasploit framework](/engineering-education/getting-started-with-metasploit-framework/) in the article linked.

5. **Sniffing and Spoofing**

Tools available: `Wireshark`, `Responder`

- **Wireshark**

This is the world's popular network protocol analyzer. It lets users monitor what's happening on the network from a microscopic perspective.

To learn more, check out this [wireshark](https://www.varonis.com/blog/how-to-use-wireshark/) tutorial.

6. **Post Exploitation**

Tools available: `Powersploit`, `Searchsploit`

- **Powerploit**

This is a series of Powershell scripts that comes in handy during a post-exploitation scenario in an authorized penetration testing. They can be used in code execution, script modification, persistence, and bypass an anti-virus.
 
You can learn more about [Powersploit](https://www.cyberpunk.rs/powersploit-powershell-post-exploitation-framework) in the article linked.
 
### Summary
In this article, we have go over how to:
- Install Kali Linux in a Virtual Box.
- Update Kali Linux to the latest version and running some major commands.
- and some of the major tools used in Kali Linux.
 
### Conclusion
From this article, we have learned that to comfortably use Kali Linux, you don't need to know how to use all the tools. You just need to know how to use some major tools and run major commands from the terminal. 

With continuous practice, you will comfortably use Kali Linux.

Good luck!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
