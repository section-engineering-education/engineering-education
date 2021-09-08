### Introduction 
So-called "screen mirroring" apps claim that they can make a more effective connection between a smartphone and a computer monitor. Free and open-source Android screen mirroring application `Scrcpy` is one of the best. It allows you to see and operate Android devices connected through `USB or TCP`. Also as an advantage it does not need `root privileges`.
#### Prerequisites
1. USB Cable.
2. Android Phone.
3. Enable USB Debugging.
4. A computer which might be running Windows, Linux, or macOS.

If you already had all this then we are ready to start.

#### Enabling USB Debugging
You must complete a few tasks before using Scrcpy. Enable USB debugging in the 'Developer Options' section of your android phone. You can find it in your phone's settings. Touch the Android build number several times until a message appears that says "Congratulations, you are now a developer". This means you are almost done. Now it is possible to activate USB debugging by returning to the developer options and selecting it once after navigating from the 'about phone' section still in your phone's settings.
### Installation
In the event that you're using:

1. Windows
 There is a zip file with all the needs for Windows. You may get it by downloading it and extracting it from your current working directory.

2. Linux
 Installing it on Linux is as simple as entering the following command in the normal package manager on your computer.
```
$ sudo apt-get install scrcpy 
```
3. macOS
The following command will install the software
```
brew install scrcpy
```
### How to use Scrcpy with a USB Connection
Scrcpy can be downloaded and extracted to any location of your preferred choice. Two windows will emerge after double-clicking Scrcpy: a command prompt that shows the connection status, and a second window that shows the current state of your phone.

![](/enginering-education/Controlling-Android-Phone-Using-SRCPY/image1.png)
![](/enginering-education/Controlling-Android-Phone-Using-SRCPY/image2.png)

Connect your phone to your computer using the USB cable you have. A pop up notification will appear on your screen asking you to allow USB debugging for that computer on your phone, then select OK to continue.
>It's important to note that if your phone isn't being detected by your computer, it's possible that you don't have the appropriate USB drivers loaded, in which case you should download and install them.

Close one of the two Scrcpy windows to exit the application if you want to.

### With a Wireless connection, how can I utilize Scrcpy?
With the Android debugging tool, Scrcpy connects with Android devices using (adb). The Android device must be connected to the PC via USB before Adb can establish a TCP/IP connection.

To enable TCP/IP on your device, run the following command: 
```
adb tcpip 3333
```
To establish a TCP/IP connection, unplug the Android smartphone from the PC first and run the following command.
```
adb connect IP_ADDR:3333
```
Now launch scrcpy as normal, and it will start wirelessly displaying the screen of your device. IP_ADDR should be replaced with the IP address of your device.

### Mobile modifications in real-time
Scrcpy can be used to manipulate a mobile device in a variety of ways. On a few occasions, all you need to do is type a simple command like:

1. **Reduce size resolution:**
To increase efficiency, you can also use the following command to copy the device's screen at a reduced resolution, while maintaining the aspect ratio.
```
scrcpy --max-size 1020
```
2. **Set a frame rate limit:** 
You may also alter the recorded screen's frame rate.
```
scrcpy --max-fps 30 
```
3. **Crop screen:**

To display a specific area of the screen, use this command.
```
scrcpy --crop 1020:1440:0:0 
```
4. **Full-screen mode:**

 You may launch the program in a full-screen mode right away.
 ```
scrcpy --fullscreen 
 ```
5. **Record screen:**
 
  While mirroring, you may also record the screen.

  ```
scrcpy --record myrecording.mp4  
  ```

6. **Show touches**

  This command will come in useful if you need to show bodily touches on occasion.
  ```
scrcpy --show-touches 
  ```

7. **Stay Awake**

To keep the device from napping after a specified period has elapsed, use the following command.
```
scrcpy --stay-awake 
```

8. **Multiple devices can be connected**

Using this tool, users can connect several devices at the same time by following a few simple steps. Once you've connected your devices and enabled USB debugging on each one, use the following command to display all of the devices that adb discovers.
```
adb devices
```
Now, copy the serial number of each device mentioned in the result and perform the command below. Replace SERIAL_NUM with the device's serial number.
```
scrcpy --serial SERIAL_NUM
```
On the screen, it will show all of the devices.

### Conclusion
Many online apps claim to be able to mirror the screen of your phone on the monitor of your computer in a more effective way. Scrcpy is one of the best free and open-source Android screen mirroring applications found online. If you have an Android device connected through USB or TCP, you can use this app to view and operate it. Since it does not require root access, it is the best.
