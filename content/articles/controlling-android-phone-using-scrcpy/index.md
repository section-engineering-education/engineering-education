---
layout: engineering-education
status: publish
published: true
url: /controlling-android-phone-using-scrcpy/
title: Controlling Android Phones using Scrcpy
description: This tutorial will take the reader through the steps of mirroring and controlling Android phones using Scrcpy.
author: nancy-mumbi
date: 2021-09-15T00:00:00-12:10
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/controlling-android-phone-using-scrcpy/hero.png
    alt: Controlling Android Phones using Scrcpy Hero Image
---
Scrcpy is among the most popular and free Android screen-mirroring applications. This software allows you to view and control Android devices through USB or TCP.
<!--more-->
### Prerequisites
To follow along, you need:
1. A USB cable.
2. An Android phone.
4. A computer that runs Windows, Linux, or macOS.

### Enabling USB debugging
We need to complete a few tasks before using Scrcpy. The first step is to activate USB debugging on your phone.

Navigate to your phone settings and press the `build number` several times until a message that says `Congratulations, you've now a developer` appears.

Once again, you must return to the `developer options` and turn on `USB debugging`.

### Installation
For Windows, download Scrcpy as a zip file and extract it in your current working directory.

If you are using Linux, use the following command to install Scrcpy.

```
$ sudo apt-get install scrcpy
```

For macOS users, utilize the below command:

```
brew install scrcpy
```

### Using Scrcpy with a USB connection
Scrcpy can be downloaded and extracted at any location or directory.

As soon as you double click on `Scrcpy`, two windows will pop up. One window shows the connection status while the other displays the phone's present state.

![First Window](/engineering-education/controlling-android-phone-using-scrcpy/image1.png)

![Second window](/engineering-education/controlling-android-phone-using-scrcpy/image2.png)

Use the USB cord to connect it to your computer. Then select `OK` to continue.

> Your phone may not be recognized by the PC because the USB drivers aren't installed. If this happens, then you should download and install the proper USB drivers from the manufacturer's website.

Close one of the two Scrcpy windows to exit the application.

### Using a wireless connection
Scrcpy can connect with Android devices using (ADB). However, before ADB can establish a TCP/IP connection, the Android device must be linked via USB to the PC.

TCP/IP can be enabled by using the following command:

```bash
adb tcpip 3333
```
You should disconnect your Android smartphone from your PC and then run the above command to establish a TCP/IP connection.

It is recommended that you replace the IP ADDR variable with your device's IP address.

```bash
adb connect IP_ADDR:3333
```

### Mobile modifications in real-time
Scrcpy can be used in several ways to manipulate a mobile device.

**Reducing resolution** 

You can replicate the device's screen at a reduced resolution, while retaining the aspect ratio using the following command.

```BASH
scrcpy --max-size 1020
```

**Setting a frame rate limit** 

You may also alter the recorded screen frame rate.

```bash
scrcpy --max-fps 30
```

**Cropping the screen** 

To display a specific area of the screen, use this command.

```bash
scrcpy --crop 1020:1440:0:0
```

**Displaying fullscreen mode** 

You may launch the program in a full-screen mode right away.

```bash
scrcpy --fullscreen
```

**Screen recording** 

While mirroring, you can also record the screen, as demonstrated below.

```bash
scrcpy --record myrecording.mp4
```

**Showing touches** 

The command below is useful, especially when you need to test the device's screen.

```bash
scrcpy --show-touches
```

**Staying awake** 

Use the following command to prevent the device from sleeping:

```bash
scrcpy --stay-awake
```

**Connecting multiple devices** 

Users can connect several devices to Scrcpy.

All devices compatible with `adb` will be displayed once you enable USB debugging.

```bash
adb devices
```

Now, copy the serial number of each device mentioned in the result and execute the command below:

Replace `SERIAL_NUM` with the device serial number.

```
scrcpy --serial SERIAL_NUM
```
### Benefits of Scrcpy
With Scrcpy, you get all the capabilities you need for free, including the ability to share files and change resolutions. 

Scrcpy is one of the safest Android mirroring applications because it doesn't require you to install anything on your device.

Scrcpy allows you to install and debug apps via ADB (Android Debug Bridge). It also gives you access to a Unix shell, which you can use to run numerous commands on your device. 

> ADB is a command-line tool that comes with Google's Android SDK (Software Development Kit).

As long as the device supports TCP/IP, adb can connect to it. 

Note that you need to connect an Android device to your PC using a USB first before accessing it wirelessly. 

### Conclusion
Scrcpy is among the top free and open-source Android screen mirroring programs.

You can use this software to view and control Android devices connected via USB or TCP. As long as you do not need root access, this is the best option.

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
