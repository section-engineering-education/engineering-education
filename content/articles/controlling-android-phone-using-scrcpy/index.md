---
layout: engineering-education
status: publish
published: true
url: /controlling-android-phone-using-SCRCPY/
title: Controlling Android Phone Using SCRCPY
description: This tutorial will take the reader through the steps of mirroring android phones using SCRCPY. The reader will also learn how they can manipulate the device in just a few simple steps.
author: nancy-mumbi
date: 2021-07-21T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/controlling-android-phone-using-SCRCPY/hero.png
    alt: Controlling Android phone using SCRCPY image example
---

### Introduction
So-called "screen mirroring" apps claim that they can make a more effective connection between a smartphone and a computer monitor.
<!--more-->

SCRCPY is one of the greatest Android screen mirroring applications available for free. Your Android devices can be seen and controlled through USB or TCP.

It does not need `root privileges`.

#### Prerequisites
1. USB Cable.
2. Android Phone.
3. Enable USB Debugging.
4. A computer which runs Windows, Linux, or macOS.

If you already had all this then we are ready to start.

#### Enabling USB Debugging
You must complete a few tasks before using Scrcpy. The first step is to activate USB debugging in your phone's Developer Options.

Touch the Android build number several times until a message appears that says "Congratulations, you've now become a developer."

Once again, you must return to the developer options and select USB debugging.

#### Installation
In the event that you're using:

1. Windows
  In a zip file you'll find everything you need. In order to obtain it, you will need to download and extract it to your current working directory.

2. Linux
   Enter the following command in your computer's standard package manager to install it on Linux:

```
$ sudo apt-get install scrcpy
```

3. macOS
   The following command will install the software:

```
brew install scrcpy
```

#### Using Scrcpy with a USB Connection
Scrcpy can be downloaded and extracted to any location of your preferred choice.

As soon as you double click Scrcpy, you'll see two windows pop up: one for the connection status, and another for the present state of your phone.

![First Window](/engineering-education/Controlling-Android-Phone-Using-SCRCPY/image1.png)

![Second window](/engineering-education/Controlling-Android-Phone-Using-SCRCPY/image2.png)

The USB cord that comes with your phone can be used to connect it to your computer. Then select OK to continue.

> Your phone may not be identified by the PC because the USB drivers aren't installed. If this is true, then you should download and install the proper USB drivers from the manufacturer's website.

Close one of the two Scrcpy windows to exit the application.

#### With a Wireless connection, how can I utilize Scrcpy?
With the Android debugging tool, Scrcpy connects with Android devices using (adb). Before Adb can establish a TCP/IP connection, the Android device must be linked via USB to the PC.

TCP/IP can be enabled by using the following command:

```
adb tcpip 3333
```
You'll need to remove your Android smartphone from your PC and perform this command to establish a TCP/IP connection with it.

Scrcpy will now begin wirelessly showing your device's screen. It is recommended that you replace the IP ADDR variable with your device's IP address.

```
adb connect IP_ADDR:3333
```

#### Mobile modifications in real-time
Scrcpy can be used in a variety of ways to manipulate a mobile device by typing simple commands, such as:

1. **Reduce size resolution**
 Additionally, you can replicate the device's screen at a reduced resolution, while retaining the aspect ratio, by using the following command.
```
scrcpy --max-size 1020
```

2. **Set a frame rate limit**
   You may also alter the recorded screen frame rate.

```
scrcpy --max-fps 30
```

3. **Crop screen**
To display a specific area of the screen, use this command.

```
scrcpy --crop 1020:1440:0:0
```

4. **Full-screen mode**
You may launch the program in a full-screen mode right away.

```
scrcpy --fullscreen
```

5. **Record screen**
While mirroring, you may also record the screen.

```
scrcpy --record myrecording.mp4
```

6. **Show touches**
As a result, this command will come in handy if you need to demonstrate physical contact from time to time.

```
scrcpy --show-touches
```

7. **Stay Awake**
To keep the device from napping after a specified period has elapsed, use the following command.

```
scrcpy --stay-awake
```

8. **Multiple devices can be connected**
By following a few simple steps, users can connect several devices at the same time with this utility.

All devices that adb discovers will be displayed once you have connected your devices and enabled USB debugging on each.

```
adb devices
```

Now, copy the serial number of each device mentioned in the result and perform the command below.

Replace SERIAL_NUM with the device serial number.

```
scrcpy --serial SERIAL_NUM
```

On the screen, it will show all of the devices.

### Conclusion
It is claimed by many web apps that they are able to better replicate your phone's screen on your computer's monitor.

Online, Scrcpy is one of the top free and open-source Android screen mirroring programs you can find.

You can use this software to view and control an Android device connected via USB or TCP if you have one. As long as you don't need root access, this is the best option.

I hope you find this tutorial helpful!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
