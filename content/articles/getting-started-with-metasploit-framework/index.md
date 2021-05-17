---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-metasploit-framework/
title: Getting Started with the Metasploit Framework
description: In this article, we will learn how to install the Metasploit framework then getting started with the basic commands. When doing penetration-testing, one should first scan the network for vulnerabilities and gather the necessary information to perform an exploit. 
author: kimosop-wakanda
date: 2021-05-04T00:00:00-08:30
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-metasploit-framework/hero.jpg
    alt: Metasploit Image
---
Due to the numerous cases of cyber insecurity, companies have now adopted hiring hackers and security specialists to test their systems for **vulnerabilities**. Hackers, therefore, perform a penetration test on the systems by use of various tools, one of which is commonly used is Metasploit Framework.
<!--more-->
The **Metasploit Framework** is a powerful penetration-testing tool used by ethical hackers and cybercriminals to examine a system's vulnerability to the network.

### Introduction
It is considered the most useful security auditing tool since it contains information-gathering tools, web vulnerability plugins, modules, and an exploit development environment.

In this tutorial, we will learn how to install Metasploit Framework on your machine and also run some major commands. But before running any command on Metasploit, one should first scan the network for vulnerabilities and gather the necessary information to perform an exploit. 

Go through the [Introduction to Nmap](https://www.section.io/engineering-education/nmap-network-scanner) tutorial to learn how to scan your targets.

> **Disclaimer**: This tutorial is meant for educational purposes only and for this case I will be exploiting my own local machine. 
 
In your case, it is recommended that you use [Metasploitable 2](https://docs.rapid7.com/metasploit/metasploitable-2) as a target to exploit, which is an intentionally vulnerable device that provides a secure environment to learn penetration testing.
 
Click [here](https://information.rapid7.com/metasploitable-download.html) to download Metasploitable 2.

### Installing the Metasploit Framework
In most cases, the Metasploit Framework is pre-installed in [Kali Linux](https://www.kali.org/) (the most recommended OS for penetration testing). For cases where it is missing, follow through for a successful installation.

First, start the terminal and run the command below. 

Enter your password when prompted:
```bash
$ sudo apt install metasploit-framework -y
```

After successfully running the command, you should have Metasploit Framework on your machine.

### Starting Metasploit Framework
To run Metasploit faster, you should first start the Postgresql database by running the command below. The command returns nothing.

```bash
$ sudo service postgresql start
```

> **Note**: For the latest version of Kali Linux (2020), you should precede commands that require root privileges with the keyword **sudo**.

If you are launching Metasploit Framework, you have to initialize its database by running the command below:
```bash
$ sudo mfsdb init
```

You are now ready to start your Metasploit Framework.

Start Metasploit by running the command below:
```bash
$ msfconsole
```

Starting Metasploit may take a while since it loads everything in RAM. So be patient.

![Metasploit started](/engineering-education/getting-started-with-metasploit-framework/metasploit1.png)

Hurrah! You have successfully started your Metasploit-Framework.

Don't worry if it doesn't look the same.

### Major keywords
The Metasploit Framework contains a piece of software known as a **module** that performs tasks such as scanning and exploiting targets.

Modules are the main components of the Metasploit Framework and are broken down into 7 types below:
1. Exploits.
2. Payloads.
3. Auxiliaries.
4. Encoders.
5. Evasions.
6. Nops.
7. Post.

**Exploits** in modules take advantage of a system vulnerability by often using simple scripts known as **payloads**.

Any other modules that are not exploited are **auxiliary** modules. They have fascinating features that allow them to do more than just exploiting.

### Major commands
#### 1. help
To start, type in the `help` command to see the various commands you are most likely to interact with.

```bash
msf5 > help
```

#### 2. search
For beginners, the `search` command may be the most useful. With thousands of modules available, finding a specific module could be problematic and therefore the search command comes to the rescue.

To narrow down your search, use a specific keyword as guided below:
- *Type* - State the type of module you are searching for. It could be an exploit, payload, encoder, or post.
- *Platform* - This is the Operating System for which the module was made for. You are allowed to search for a module depending on the platform you are about to exploit.
- *Name* - You can also type in the module name itself to find it.

#### Search syntax
Type in the `search` keyword followed by a colon and then specify the keyword stated as shown below.

```bash
msf5 > search type: module
```

Example:
```bash
msf5 > search type:exploit platform:windows multi/handler
```

As you can see from the example below, Metasploit returns modules fitting the search parameters.

![Search Result](/engineering-education/getting-started-with-metasploit-framework/search.png)

#### 3. use
The `use` command stages an exploit and makes it available when an exploit is run.

Exploits can be staged as shown in the example below:
```bash
msf5 > use exploit/multi/handler
```

If the module is successfully staged, Metasploit will respond by showing the type of exploit and abbreviates it in red as shown below.

![Use Result](/engineering-education/getting-started-with-metasploit-framework/use.png)

#### 4. info
After staging an exploit, you can run the `info` command to retrieve information like the name, author, and platform of the exploit.

Run the command as shown below:
```bash
msf5 > info
```

![Info result](/engineering-education/getting-started-with-metasploit-framework/info.png)

#### 5. show
After successfully staging an exploit, use the `show` command to see the available payloads, targets, or options corresponding with the staged exploit.

The three most used `show` commands are:

#### 1. show payloads
This command will give a list of all the payloads compatible with the staged exploit. If the command is running before staging the exploit, it will give a list of all the payloads - which is usually a long list.

Run the following command:
```bash
msf5 > show payloads
```

![Show payload result](/engineering-education/getting-started-with-metasploit-framework/showPayload.png)

#### 2. show targets
The command `show targets`, lists all the targets vulnerable to the staged exploit. A target's vulnerability can vary depending on the Operating system, update, language among others things.

Run the command as shown below:
```bash
msf5 > show targets
```

![Show target result](/engineering-education/getting-started-with-metasploit-framework/showTarget.png)

As you can see from the example above, we have a target vulnerable to the exploit we used.

#### 3. show options
This command is often useful, as it shows the options yet to be set before running the exploit. Options to be set may include RHOST, LHOST, PATH, LPORT, etc.

The command is run as shown below:
```bash
msf5 > show options
```

![Show options result](/engineering-education/getting-started-with-metasploit-framework/showOptions.png)

### 6. Set
This command sets an option or overwrites an undesired option. The options to be `set` depends on the staged module. Options to be set may include RHOST, LHOST, PATH, etc.

Options can be set as the following:
```bash
msf5 > set LHOST 192.168.234.122
```

![set result](/engineering-education/getting-started-with-metasploit-framework/set.png)

As you can now see from the show options, the LHOST has been successfully set.

### 7. exploit
Once the exploit is staged and all the options have been set, you are now ready to run the attack.

You can run the attack by using the `exploit` or `run` keyword as shown below:
```bash
msf5 > exploit
```

### 8. back
This command takes us one step back. It is applicable in cases when you want to make changes to the options set. 

Run the command as shown below:
```bash
msf5 > back
```

![back result](/engineering-education/getting-started-with-metasploit-framework/back.png)

### 9. exit
This command exits the `msfconsole` and takes us back to the terminal:
```bash
msf5 > exit
```

![Exit Result](/engineering-education/getting-started-with-metasploit-framework/exit.png)

### Conclusion
I suggest you use [Metasploitable 2](https://docs.rapid7.com/metasploit/metasploitable-2) to practice your exploits since it provides a secure environment to perform penetration testing and security research.

In this article, we have learned the following:
- We introduced the Metasploit Framework.
- We installed the Metasploit Framework.
- Covered major keywords in Metasploit.
- Staging and how to run exploits.

### Further reading
 1. Reconnaissance - [Nmap](https://www.section.io/engineering-education/nmap-network-scanner)
 2. Scanning and Enumeration - [Nikto](https://tools.kali.org/information-gathering/nikto)
 3. Gaining access - [John the Ripper](https://www.varonis.com/blog/john-the-ripper/)
 4. [Covering tracks](https://blog.eccouncil.org/4-ways-that-ethical-hackers-cover-their-tracks/) - Using ICMP Tunnels, Clearing event logs, etc.

Happy learning! 

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
