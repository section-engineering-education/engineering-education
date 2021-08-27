### Introduction 
Many online apps claim to be able to mirror the screen of your phone on the monitor of your computer in a more effective way. `Scrcpy` is one of the best free and open-source Android screen mirroring applications found online. It allows you to see and operate Android devices connected through `USB or TCP`. It does not need `root privileges`.

A few criteria must be completed before we begin, including:
1. USB Cable.
2. Android Phone.
3. Enable USB Debugging.
4. A computer which might be running Windows, Linux, or macOS.

If you already had all this then we are ready to start.
### Enabling USB Debugging
You must complete a few tasks before using Scrcpy. Enable USB debugging in the 'Developer Options' section of your phone. To enable it, in your phone's settings(about the phone), several times touch on the Android build number until a message pops up saying say "Congratulations, you're now a developer".You can now enable USB debugging by going back to the developer options and selecting it again.


### Installation
If you are using;

1. Windows

 For Windows, a zip file containing all requirements is provided. You may get it by downloading it and extracting it from your current working directory.

2. Linux

 On Linux, you may install it using the standard package manager by typing running the following command.
```
$ sudo apt-get install scrcpy 
```

3. macOS

To install, run the following command
```
brew install scrcpy
```
### How to use Scrcpy with a USB Connection
Scrcpy can be downloaded and extracted to any location of your preferred choice. Scrcpy should be double-clicked to launch and two windows should appear, one of which is a command prompt that indicates the connection status and the other which displays the current condition of your phone.
![](enginering-education-Controlling-Android-Phone-Using-SRCPY-scrcpy1.png)
![](enginering-education-Controlling-Android-Phone-Using-SRCPY-scrcpy2.png)

Using the USB cable that you have, connect your phone to your computer through one of the available ports on your computer. On your phone, enable USB debugging for this computer, then press the OK button to proceed.
>It's important to note that if your phone isn't being detected by your computer, it's possible that you don't have the appropriate USB drivers loaded, in which case you should download and install them.

To exit the application, close one of the two Scrcpy windows.
### With a Wireless connection, how can I utilize Scrcpy?
Scrcpy interacts with Android devices using the Android debugging tool (adb). To connect wirelessly, you must connect the Android device to the PC by USB before using Adb to connect to it through TCP/IP. Afterwards, run the following command to enable TCP/IP on your device: 
```
adb tcpip 3333
```
To establish a TCP/IP connection, unplug the Android smartphone from the PC and run the following command. Now launch scrcpy as normal, and it will start wirelessly displaying the screen of your device. IP ADDR should be replaced with the IP address of your device.
```
adb connect IP_ADDR:3333
```
### Mobile modifications in real-time
Scrcpy may be used to do a variety of manipulations on a mobile device.For some of these, you only need to type the following commands into the command prompt:
1. **Reduce size resolution:**

You may also use the following command to replicate the device's screen at a reduced resolution to improve performance, and it practically retains the aspect ratio of the screen.
```
scrcpy --max-size 1020
```
2. **Set a frame rate limit:** 

You may also alter the recorded screen's frame rate.
```
scrcpy --max-fps 30 
```
3. **Crop screen:**

You might just need to show a section of the screen from time to time, and this command lets you accomplish so.
```
scrcpy --crop 1020:1440:0:0 
```
3. **Full-screen mode:**

 You may launch the program in a full-screen mode right away.
 ```
scrcpy --fullscreen 
 ```
 4. **Record screen:**
 
  While mirroring, you may also record the screen.
  ```
scrcpy --record myrecording.mp4  
  ```
  5. **Show touches**
  
  This command will come in useful if you need to show bodily touches on occasion.
  ```
scrcpy --show-touches 
  ```
  6. **Stay Awake**

To keep the device from napping after a specified period has elapsed, use the following command.
```
scrcpy --stay-awake 
```
7. **Multiple devices can be connected**

Users may use this tool to connect many devices at once, and all they have to do is follow these simple steps. TTo begin, enable USB debugging on all of your devices and connect them to your computer, then use the command below to list all of the devices that adb discovers.
```
adb devices
```
Now, copy the serial number of each device mentioned in the result and perform the command below. Replace SERIAL_NUM with the device's serial number.
```
scrcpy --serial SERIAL_NUM
```
On the screen, it will show all of the devices.
### Conclusion
Many online apps claim to be able to mirror the screen of your phone on the monitor of your computer in a more effective way. Scrcpy is one of the best free and open-source Android screen mirroring applications found online. It allows you to see and operate Android devices connected through USB or TCP. It does not need root access and this makes it the best.