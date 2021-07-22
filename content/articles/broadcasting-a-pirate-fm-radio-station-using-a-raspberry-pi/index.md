---
layout: engineering-education
status: 
published: 
url: /broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/
title: Broadcasting a private FM radio using Raspberry Pi
description: This article will explain how one can create a private FM radio with the use of a Raspberry Pi and internet connection. The private FM radio broadcast can reach a radius of around fifty meters.
author: ruphus-muita
date: 2021-07-19T00:00:00-18:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/hero.jpg
    alt: Raspberry Pi Image 
---
Raspberry Pi, is based on an ARM cortex designed to carry out various functions. It is a computer that works with low power and is also a single board. This mini-computer is based on an ARMv7 processor and can therefore run ARM/Linux distributions. This aspect or particular characteristic makes it very valuable in understanding the Internet of Things.
<!--more-->

### Overview
This article will cover:
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [How the private FM broadcast will work](#how-the-private-fm-broadcast-will-work)
- [Setting up the Raspberry](#setting-up-the-raspberry)
- [Conversion of PRi to Private FM transmitter](#conversion-of-pri-to-private-fm-transmitter)
- [Conclusion](#conclusion)
- [Relevant resources](#relevant-resources)

### Introduction
Setting up a private radio station is easy using a Raspberry Pi. This process should take thirty to sixty minutes to complete. By the end of this hour, you should be able to broadcast within a radius of around fifty meters. However, this is also facilitated by the use of a good antenna. 
<div style="text-align: center; padding-bottom: 5%;">
<img style="padding: 0; margin:0;" src="/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/raspberry21.jpg" alt="Raspberry Pi diagram"><br>
<span style="font-size: 11px;">Figure 1: Sample Rapberry Pi <a href="https://unsplash.com/photos/raLeFIxXgDY">Raspberry Pi</a>, 2021.<span>
</div>

Materials required for this tutorial include:
1.	Raspberry Pi.
2.	Microphone.
3.	Internet connection.

### Pre-requisites
In this guide, it is assumed that the reader has a Raspberry Pi that has a running operating system. We will assume that the running Raspberry Pi. It should also have an active connection to the internet. Additionally, you must have access to your Pi, through whichever means you prefer. It could be through a terminal or by a virtual server such as VNC. This guide will use a Putty program to run commands on our Pi. This guide is also based on **Rasbian Jessie installed Raspberry Pi 3**. 

### How the private FM broadcast will work
To reduce electromagnetic interference, all microprocessors are fitted with a synchronous digital system. Using a spread-spectrum clock signal or what is referred to as SSCS in short form, suppression of electromagnetic interference is achieved. This signal has a frequency of between 1MHz and 250MHz which falls between the FM band. Therefore, by using program that modulates frequency, the Pi will be tweaked to operate as a radio transmitter. This signal will then be produced via the GPIO pin four of the Pi. A short wire of around twenty centimeters can be attached to act as an antenna.

### Setting up the Raspberry
Since the Raspberry has a running an operating system, boot it and also connect the output HDMI to a monitor. Also connect a keyboard and mouse. On accessing the Desktop, search for the network option which will enable connection to the router (internet). Next, move on to the pi configuration through the menu and enable SSH communication. 
Once this is enabled, we can now access the Raspberry using Putty as long the personal computer and the Pi are connected to the same network. Open Putty on the personal computer and key in the IP address of the Raspberry Pi to connect via SSH. A session will then apprear and ask for a login credentials. The credentials to be used here are pi for username and raspberry for password. 

### Conversion of PRi to Private FM transmitter
*Step One:*

In the current directory, create a new folder that we will use to store all the files required to get the radio broadcast working. In this case, we will create a folder called Private_Radio and then navigate inside that folder using the following commands:
```JSON
mkdir Private_Radio
cd Private_Radio
```
*Step Two:*

This stage involves cloning the code from GitHub. In order to achieve this, we use the git clone commands as shown below.
```JSON
sudo git clone https://github.com/markondej/fm_transmitter
```
*Step Three:*

This code is written in C. This, therefore, calls for the use of compilers to compile it. In this guide, we will use a program known as gcc and g++. The compiler to be used is known as *make*. The following commands will be used to download the compilers.
```JSON
sudo apt-get install gcc g++ make
```
*Step Four:*

This is the stage where we will compile the program using the downloaded compilers. To achieve this, navigate to the downloaded directory and then use *sudo make* command to compile the program. Use these commands:
```JSON
cd fm_transmitter
sudo make
```
*Step Five:*

This is where you launch the program. To do this, we are required to specify the broadcast frequency to be used and an audio file to play. While cloning the program, there is an audio file known as star_wars.wav which is downloaded by default. We will use this audio file and a frequency of 103MHz(you can choose any frequency with the FM band) to see if the program works correctly. The command for launching to use is:
```JSON
sudo ./fm_transmitter -f 103  -r star_wars.wav
```
It is important to note that the syntax for the above command is: 
```JSON
sudo ./fm_transmitter [-f frequency] [-r] filename
```
To test your transmission, tune any FM radio to 103MHz frequency. This should allow you to hear the sound playing. The Starwars theme song can be replaced using any other desired music or a voice recording. 
In order to broadcast live from your newly developed private radio station, the raspberry needs to be connected to a microphone and the arecord command below can be used to transmit the broadcast. 
```JSON
arecord -D hw:1,0 -c1 -d 0 -r 22050 -f S16_LE | sudo ./fm_transmitter -f 103 -
```

### Conclusion
With that setup, it is possible to create a simple private FM radio that can be used for small regions such as school or homestead. It is however important to note that certain frequencies cannot be used without permision in some countries. It is therefore important to conduct adequate research on which frequencies can be used without violating the law.

### Relevant resources
- [PI-RATE RADIO: HOW TO MAKE YOUR OWN FM STATION FOR LESS THAN $35](https://www.theverge.com/2019/11/26/20981630/raspberry-pi-pirate-radio-fm-station-35-dollars-diy)
- [How to turn a Raspberry Pi into an FM radio transmitter](https://www.networkworld.com/article/2999977/how-to-turn-a-raspberry-pi-into-an-fm-radio-transmitter.html)
- [Broadcast Your Own FM Radio Station, with a Raspberry Pi](https://www.makeuseof.com/tag/broadcast-fm-radio-station-raspberry-pi/)
---



