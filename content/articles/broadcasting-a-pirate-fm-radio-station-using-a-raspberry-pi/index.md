---
layout: engineering-education
status: publish
published: true
url: /broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/
title: Broadcasting a private FM radio station using a Raspberry Pi 
description: This article aims to create a simple private FM radio that can be used to broadcast an FM radio station for small regions such as schools or homesteads.
author: ruphus-muita
date: 2021-08-02T00:00:00-10:51
topics: [Edge Computing]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/hero.jpg
    alt: Broadcasting a private FM radio station using a Raspberry Pi example image
---

Raspberry Pi is based on the [ARM Cortex](https://en.wikipedia.org/wiki/ARM_Cortex-M) technology, designed to carry out various functions on energy efficient devices. It is a single-board computer that works with low power. This mini-computer is based on an ARMv7 processor and can therefore run ARM/Linux distributions. This aspect or particular characteristic makes it very valuable in understanding the  Internet of Things (IoT).

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [How the private FM broadcast will work](#how-the-private-fm-broadcast-will-work)
- [Setting up the Raspberry Pi](#setting-up-the-raspberry-pi)
- [Conversion of Raspberry Pi to a private FM transmitter](#conversion-of-raspberry-pi-to-a-private-fm-transmitter)
- [Conclusion](#conclusion)
- [Relevant resources](#relevant-resources)

### Prerequisites
In this guide, it is assumed that the reader has a Raspberry Pi that's running the Raspberry Pi OS. It should also have an active connection to the internet. Additionally, you must have access to your Pi, through whichever means you prefer. It could be through a terminal or by a virtual server such as VNC. This guide will use a Putty program to run commands on our Pi. This guide is also based on [**Raspbian Jessie installed on Raspberry Pi 3**](https://howchoo.com/pi/how-to-install-raspbian-jessie-on-the-raspberry-pi). 

![Raspberry Pi OS](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/os.jpg)

### Introduction

Setting up a private radio station is easy using a Raspberry Pi. This process should take thirty to sixty minutes to complete. By the time you finish this tutorial, you should be able to broadcast your FM radio station within a radius of around fifty meters. However, this is also facilitated by the use of a good antenna. 

Materials required for this tutorial include:

1.	Raspberry Pi 3.
2.	Microphone.
3.	Internet connection.

### How the private FM broadcast will work

To reduce electromagnetic interference, all microprocessors are fitted with a synchronous digital system. Using a spread-spectrum clock signal or what is referred to as SSCS in short form, suppression of electromagnetic interference is achieved.

This signal has a frequency of between 1MHz and 250MHz. Therefore, the FM band which is between 88Mhz and 108Mhz, falls within this range.

With the help of a program that modulates the frequency, the Pi will be tweaked to operate as a radio transmitter. This signal will then be produced via the GPIO pin four of the Pi. A short wire of around twenty centimeters can be attached to act as an antenna.

### Setting up the Raspberry Pi

Since Raspberry Pi already has a running operating system, boot it and connect the output HDMI to a monitor. Also, connect a keyboard and mouse. On accessing the desktop, search for the network option which will enable connection to the router (internet). 

![Raspberry Configuration](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/configuration.jpg)

Next, move on to the pi configuration through the menu and enable SSH communication. 

![SSH](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/SSH_enabled.jpg)

Once this is enabled, we can now access the Raspberry using Putty as long the personal computer and the Pi are connected to the same network. Open Putty on the personal computer and key in the IP address of the Raspberry Pi to connect via SSH. A session will then appear and ask for login credentials. 

The login credentials to be used here are:  
- Username: **pi** 
- Password: **raspberry**

See the images below for a better understanding.

The Putty interface:

![Putty Interface](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/putty.jpg)

Putty interface after successful login to the Raspberry Pi 3:

![Raspberry Login](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/puttylogin.jpg)


### Conversion of Raspberry Pi to a private FM transmitter

#### Step one

In the current directory, create a new folder that we will use to store all the files required to get the radio broadcast working. In this case, we will create a folder called Private_Radio and then navigate inside that folder using the following commands:

```bash
mkdir Private_Radio
cd Private_Radio
```
![Creating directory](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/mkdir.jpg)

#### Step two

This stage involves cloning the code from GitHub. To achieve this, we use the git clone commands as shown below:

```bash
sudo git clone https://github.com/AshrafAkon/fm_transmitter.git
```
![Git clone](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/gitclone.jpg)

#### Step three

The code is written in C. This, therefore, calls for the use of compilers. In this guide, we will use a program known as gcc and g++. Compiling is necessary because it converts the code into an executable code that can run on raspberry pi. The compiler to be used is known as *make*. The following commands will be used to download the compilers:

```bash
sudo apt-get install gcc g++ make
```
![gcc installation](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/gcc_install.jpg)

#### Step four

This is the stage where we will compile the program using the downloaded compilers. To achieve this, navigate to the downloaded directory and then use `sudo make` command to compile the program. Use these commands:

```bash
cd fm_transmitter
sudo make
```

![Code compilation](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/sudomake.jpg)

#### Step five

This is where you launch the program. To do this, we are required to specify the broadcast frequency to be used and an audio file to play.

While cloning the program, there is an audio file known as `star_wars.wav` which is downloaded by default. We will use this audio file and a frequency of 103MHz (you can choose any frequency as long as it is within the FM band) to see if the program works correctly. The command for launching the program is:

```bash
sudo ./fm_transmitter -f 103  -r star_wars.wav
```
![Broadcasting command](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/play_audio.jpg)

It is important to note that the syntax for the above command is: 

```bash
sudo ./fm_transmitter [-f frequency] [-r] filename
```
To test your transmission, tune any FM radio to a 103MHz frequency. This should allow you to hear the sound playing. The Starwars theme song can be replaced using any other desired music or a voice recording. 

To broadcast live from your newly developed private radio station, the raspberry needs to be connected to a microphone and the `arecord` command shown below can be used to transmit the broadcast as shown below: 

```bash
arecord -D hw:1,0 -c1 -d 0 -r 22050 -f S16_LE | sudo ./fm_transmitter -f 103 -
```

### Conclusion
With that setup, it is possible to create a simple private FM radio that can be used for small regions such as schools or homesteads.

It is however important to note that certain frequencies cannot be used without permission in some countries. It is therefore important to conduct adequate research on which frequencies can be used without violating the law.

### Relevant resources
- [PI-RATE RADIO: HOW TO MAKE YOUR OWN FM STATION FOR LESS THAN $35](https://www.theverge.com/2019/11/26/20981630/raspberry-pi-pirate-radio-fm-station-35-dollars-diy)
- [How to turn a Raspberry Pi into an FM radio transmitter](https://www.networkworld.com/article/2999977/how-to-turn-a-raspberry-pi-into-an-fm-radio-transmitter.html)
- [Broadcast Your Own FM Radio Station, with a Raspberry Pi](https://www.makeuseof.com/tag/broadcast-fm-radio-station-raspberry-pi/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)