## Introduction to Network Analysis Using Wireshark
As an IT professional, one of the most powerful networking tools that you will find yourself using is ```Wireshark```, a tool that is mostly used in the analysis of network packets.  
In this tutorial, we will be looking at an overview of ```Wireshark```, how it works, and other several uses. 

### Requirements
* Networking Basics
* TCP/IP stack
* Reading and interpreting packet headers
* Routing and port forwarding
* DHCP

### What is Wireshark?

The history of Wireshark software goes back to 1998, as an open-source project started by volunteer network experts around the world.  
The main aim was to build a standard network protocol analyzing tool.  

Therefore, ```Wireshark``` is simply a network packet analyzer, that is mainly used to capture the data on your network. This data is then presented in a form understandable by human beings.  

In case you find yourself in a position where you need to try and troubleshoot every single network packet, ``` Wireshark``` is the right tool for you!

This is a very powerful tool, as it enables you, the user, to perform various operations such as:
* Troubleshooting your network.
* Performing security operations that is, it can be used to detect security threats such as port scanning.  
* Learning more about your network protocols at the microscopic level.
* Performing analysis of voice over internet(VoIP).

### How Wireshark works
As we have said, ```Wireshark``` is a packet analyzer, sometimes other people refer to it as a packet sniffer so do not get confused.  

How it works is very simple, let's take your machine, for example, it's connected to your ```WIFI``` or the network you're currently using, and you want to determine what is currently going on, on your network.  
What happens is that whenever you use ```Wireshark```, it will capture your network traffic(this refers to the data moving currently on your network), and record every single data offline.  
You can then use this data to analyze the network activities, that is it.  


### Installing Wireshark
In this tutorial, we are going to install Wireshark in Ubuntu 20.04. You are free to use any other system by following installation instructions [here](https://www.wireshark.org/download.html).  
Follow these steps to install Wireshark in ubuntu 20.04.  

#### Step 1: Updating the system apt
```
sudo apt update
```
This outputs the following, your output might be different:-
```console
jumamiller@OpijaKaeli:~$ sudo apt update
[sudo] password for jumamiller: 
Hit:1 http://ke.archive.ubuntu.com/ubuntu focal InRelease                      
Hit:2 http://dl.google.com/linux/chrome/deb stable InRelease                                                
Reading package lists... Done
Building dependency tree       
Reading state information... Done
243 packages can be upgraded. Run 'apt list --upgradable' to see them.
jumamiller@OpijaKaeli:~$ 

```

#### Step 2: Installing Wireshark
Since we have updated our system, Wireshark's latest version will be installed by running the following command:-  

```console
sudo apt install Wireshark
```

```console
jumamiller@OpijaKaeli:~$ sudo apt install Wireshark
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  libc-ares2 libqt5multimedia5-plugins libqt5multimediagsttools5
  libqt5multimediawidgets5 libqt5opengl5 libsmi2ldbl libspandsp2
  libwireshark-data libwireshark13 libwiretap10 libwsutil11 wireshark-common
  wireshark-qt
Suggested packages:
  snmp-mibs-downloader geoipupdate geoip-database geoip-database-extra
  libjs-leaflet libjs-leaflet.markercluster wireshark-doc
The following NEW packages will be installed:
  libc-ares2 libqt5multimedia5-plugins libqt5multimediagsttools5
  libqt5multimediawidgets5 libqt5opengl5 libsmi2ldbl libspandsp2
  libwireshark-data libwireshark13 libwiretap10 libwsutil11 wireshark
  wireshark-common wireshark-qt
0 upgraded, 14 newly installed, 0 to remove and 243 not upgraded.
Need to get 22.0 MB of archives.
After this operation, 116 MB of additional disk space will be used.
Do you want to continue? [Y/n] 

```
Enter ```y``` to continue downloading Wireshark. This will take a few minutes depending on your network speed.  
On completion, it will prompt you with a window to configure Wireshark for root privileges.

![Configure-wireshark](/engineering-education/introduction-to-wireshark/configure-wireshark.jpg)

Using the arrow keys, select the ```yes``` or ```no``` depending on your need, then press enter.  

#### Step 4: Verify Wireshark Installation
Run the following command to get the version of Wireshark you have installed:-  

```console
wireshark --version
```
```console
jumamiller@OpijaKaeli:~$ wireshark --version
Wireshark 3.2.3 (Git v3.2.3 packaged as 3.2.3-1)

Copyright 1998-2020 Gerald Combs <gerald@wireshark.org> and contributors.
License GPLv2+: GNU GPL version 2 or later <https://www.gnu.org/licenses/gpl-2.0.html>
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

Compiled (64-bit) with Qt 5.12.8, with libpcap, with POSIX capabilities (Linux),
with libnl 3, with GLib 2.64.2, with zlib 1.2.11, with SMI 0.4.8, with c-ares
1.15.0, with Lua 5.2.4, with GnuTLS 3.6.13 and PKCS #11 support, with Gcrypt
1.8.5, with MIT Kerberos, with MaxMind DB resolver, with nghttp2 1.40.0, with
brotli, with LZ4, with Zstandard, with Snappy, with libxml2 2.9.10, with
QtMultimedia, without automatic updates, with SpeexDSP (using system library),
with SBC, with SpanDSP, without bcg729.

Running on Linux 5.4.0-58-generic, with          Intel(R) Celeron(R) CPU B830 @
1.80GHz (with SSE4.2), with 3824 MB of physical memory, with locale en_US.UTF-8,
with libpcap version 1.9.1 (with TPACKET_V3), with GnuTLS 3.6.13, with Gcrypt
1.8.5, with brotli 1.0.7, with zlib 1.2.11, binary plugins supported (0 loaded).

Built using gcc 9.3.0.
jumamiller@OpijaKaeli:~$ 

```
#### Step 5: Launch Wireshark
To start Wireshark, run the following command on the terminal:- 
```console
wireshark
```
```console
jumamiller@OpijaKaeli:~$ wireshark
|
```
By running this command will redirect you to the Wireshark software window.

#### Fig 1.2 Wireshark Window
![Wireshark-window](/engineering-education/introduction-to-wireshark/wireshark-window.jpg) .  

Congratulations, you now have ```Wireshark``` installed in your system and running.

### Your first Packet Capture.
We have Wireshark in our system installed, let's dive in and start experimenting with the features that it has.  

#### 1. Wireshark Graphical User Interface
From ```Fig 1.2``` above, Wireshark contains some of the commonly used menus,
``` File, Edit, View, Go, Capture, Analyze, Statistics, Telephony, Wireless, Tools, and Help```.  
Below menus above are the:-  
* ``` Start Capturing Packets icon ```
* ``` Stop Capturing Packets icon ```
* ``` Restart Current Capture Icon ```
and several other icons that you can hover on and get to know what they do.  

#### 2. Wireshark Network Interface Selection
Normally, when you start a Wireshark without opening a capture file or starting a capture process, a welcome screen is displayed.  
This window will always display currently opened capture files and the capture available interfaces.  

Therefore the first step involves selecting the network interface to capture its data.  
Remember the interfaces are different for different operating systems.  

#### Fig 1.3 Network Interfaces
![Network-Interfaces](/engineering-education/introduction-to-wireshark/wireshark-network-interface.jpg)

From the above screenshot, we have 6 interfaces which we can then choose from.  

Hit on the ```Capture``` button just below the ``` Welcome to Wireshark```.  
This will prompt you to another window as seen below.  

#### Fig 1.4 Network Interfaces 2
![Network-Interfaces](/engineering-education/introduction-to-wireshark/wireshark-network-interfaces-2.jpg)

Now select any of the interfaces you're presented with, in this example, we're going to explore the UDP Listener option.  
Then click on the start button in the far left corner.  
At this stage, you should be able to get an output like the one presented below.  

#### Fig 1.5 Network Traffics
![Network-Traffics](/engineering-education/introduction-to-wireshark/wireshark-live-capture.jpg)

In the capture panel above, you're able to notice that network packet capturing is in sequential order with each line representing each packet captured.  

The information is displayed in tabular form, with rows and columns.  
Each row represents the packet collected while columns provide you with additional information such as time, protocols, length and et cetera, you can refer to the screenshot above.  

Let's have a look at these columns and what type of information they provide us with.  
* ```No``` - Represents a unique network packet sequence number. This can be used to identify a given packet.  
* ``` Time ```- This is the time at which a particular packet was captured.  
* ```Source ```- This represents where we are getting the packets from. This is denoted as Internet Protocols(IP Addresses).
* ``` Destination```- This is used to represent the Internet Protocol(IP Address) where the packet is going.  
* ```Protocol```- This refers to the protocol of the data you have captured, this could ```TCP, ARP et cetera```
* ```Length```- This is used to represent the size of the packet captured.
* ``` Info```- This gives you additional information about the packet you have captured.  

NOTE:- Each protocol is represented with its color scheme, in our case, for example, the ```TCP ``` protocol has a ```#cccccc``` background.  This helps the user to easily differentiate between these protocols.  


Congratulations, you have been able to capture network packets, and that's how simple Wireshark is user friendly. 

### Packet Details Panel:-
Now that we're able to capture some data, try to click on a single row, you will notice that some data are being displayed on the immediate window.  

#### Fig 1.5 Packet Details
![Single-Packet-Details](/engineering-education/introduction-to-wireshark/wireshark-single-packet-details.jpg)
On the highlighted protocol, click on it to get more details about this SSDP protocol as shown below:-  

#### Fig 1.6 More on packet Details
![Protocol-details](/engineering-education/introduction-to-wireshark/wireshark-protocol-details.jpg)

The information above tells us more about the packet captured including the device used. This is data is very important especially in cases of system hacks, where they can be collected for forensics.  

### Packet Bytes Panel
From the above packet details, remember when you clicked a given row you were able to get details on the window on fig 1.6 above, consequently, this caused the window below Fig 1.6 to be updated as well.  

Let's have a look how it looks like.  
#### Fig 1.7 Bytes Details
![bytes-panel](/engineering-education/introduction-to-wireshark/wireshark-bytes-panel.jpg)

A closer look at this screenshot, the numbers are in bytes. This is the actual format of the data dump when the packet was captured.  


### Conclusion

In this tutorial, we have been working on Wireshark, giving a quick overview of how to get started with this amazing tool.  
We have seen how we can install Wireshark in a Linux based system and how to perform various tasks such as dumping the packet streams.  
We will explore in our next tutorial as we discuss more advanced features of Wireshark.  
