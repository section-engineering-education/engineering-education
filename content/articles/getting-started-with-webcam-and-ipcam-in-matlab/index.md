---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-webcam-and-ipcam-in-matlab/
title: Getting Started with Webcam and IPCam in Matlab
description: This tutorial will be a brief dive into understanding Web camera and IP camera in Matlab. We will also build a simple application for capturing snapshots and live video streaming.
author: queenter-bruce
date: 2021-05-27T00:00:00-16:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/hero.jpg
    alt: Webcam and Ipcam hero image
---
In this tutorial, we will look at how to install the WEBCAM and IPCAM hardware package for MATLAB, which is necessary to access the hardware. We will also look at how to access the laptop's in-built WEBCAM and external USB webcam with Matlab code, to take snapshots, preview, and record video clips.
<!--more-->
We will understand more about the android application to convert mobile phone's camera as an IPCAM using Matlab.

A Web Camera (WEBCAM) is connected to a PC and can be used to make videos available to other users. The connection is normally through an USB. IP Cameras (IPCAM) involve the combination of high-end web functionality, PC and network interface to one network-ready product.

### Prerequisites
To follow this tutorial along - the reader will need the following:
- Matlab installed on your PC.
- Webcam and Ipcam support packages installed.
- Webcam Android application installed on your mobile phone.

### Table of contents
- [Need for camera interface](#need-for-camera-interface)
- [Installation of hardware support package](#hardware-support-package-installation)
- [Matlab code for accessing laptop’s inbuilt webcam and an external USB webcam](#matlab-code-for-accessing-laptops-inbuilt-webcam-and-an-external-usb-webcam)
- [How to access external USB camera](#how-to-access-external-usb-camera)
- [Matlab code for capturing a live video clip](#matlab-code-for-capturing-a-live-video-clip)
- [Making mobile phone as an IP camera](#making-mobile-phone-as-an-ip-camera)
- [How to access the live video stream from your IP to your Matlab](#how-to-access-the-live-video-stream-from-your-ip-to-your-matlab)
- [Conclusion](#conclusion)

### Need for camera interface
There are several projects which require either images or videos as primary input.

Few use cases where we require image or video as input are:
1. Face identification and recognition.
2. Face recognition-based security system and attendance system.
3. Facial expression recognition.
4. Object identification and classification.
5. Fire detection on site.
6. Vehicle license plate recognition and vehicle logging system.
7. and many more...

### Hardware support package installation
- Log in to your MathWork account at the top right corner of the Matlab window.

![sign in tab](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/signin.jpg)

*Signing into MathWork account*

- Click on the `Add-Ons` drop-down arrow and select the `Get hardware support package`.

![add_on menu](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/adds_on.png)

*Add-Ons to download hardware support package*

- The hardware support package opens up and on the search tab, type `MATLAB support package for USB webcam`.

![support package](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/webcam.png)

*Search for MATLAB Support Package for USB webcam*

- Then, click on the `Install` button.

![install tab](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/windows3_1.png)

*Installation of package*

For our case, the push button for `Install` changes to `Manage` since the package is already installed on our PC.

Since we are accessing the IP camera, we need the IP support package.

- Using the same process above, we will locate the `MATLAB support package for IP camera` and then install it.

![support package](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/package.jpg)

*Installing support package for IP Camera*

### Matlab code for accessing laptop's inbuilt webcam and an external USB webcam
To see the list of all attached cameras to your PC, execute the code below on the console:

```Matlab
webcamlist
```

First, create a camera object with a `webcam`. Here, we use `cam1` as the object:

```Matlab
cam1 = webcam    %integrated webcam
```

We then execute using `preview()`. This is to see the live stream of the video your camera object that is being captured.

```Matlab
preview(cam1)
```

You can take a snapshot using `snapshot()` and save the frame.

This is done by executing the snapshot function and view the captured image using the `imshow()` function.

The captured image is then stored in the variable `img1` as shown:

```Matlab
img1 = snapshot(cam1);
imshow(img1) 
```

![captured image](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/paul1.png)

*Captured image using Internal web camera*

Clear the camera object `cam1` after the live stream and the snapshot, to free up the memory.

```Matlab
clear cam1
```

### How to access external USB camera?
The command remains the same as that of accessing the internal webcam.

The difference is that you need to change the hardware name when defining the webcam.

```Matlab
cam2 = webcam('USB2.0 PC camera');
preview(cam2);
img2 = snapshot(cam2);
imshow(img2)
```

![snapshot from the USB webcam](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/paul2.png)

*Captured image using External web camera*

```Matlab
clear cam2
```

### Matlab code for capturing a live video clip
To capture a live video clip, we first need to define the `webcam` object:

```Matlab
cam = webcam('USB2.0 PC camera');
```

Then, we specify the duration `t` to capture our video and define the frames per second `fps`.

```Matlab
t = 20; % the time is in second
fps = 30;
```

The number of frames `nof` will be the product of the time `t` and the frames per second `fps`.

We implement the above as follows:

```Matlab
nof = t* fps
```

We then declare the video writer object `videowriter()` with your file name. This means that your output will be saved in the current directory folder with the file name of `myvideo`.

```Matlab
vidwriter = videowriter('myvideo.mp4')
open(vidwriter)
```

Now, we define a `for` loop to loop through the frames. This defines the number of frames you want to capture.

Here, we loop from `1` to `nof` as shown:

```Matlab
for index = 1: nof
img = snapshot(cam); %this is to acquire the frame
```

We then write (save) the video by executing the `writeVideo()` function:

```Matlab
writeVideo(vidWriter, img);
pause(t/nof)
end
```

By executing the `snapshot(cam)`, each snapshot will be stored in `img`, and at the same-time writing to `vidWriter`.

The `pause(t/nof)` command is a pause given proportionally to create the `fps`.

Once this is done, we close the `vidWrite` and clear the camera object `cam`.

```Matlab
close(vidWriter)
clear cam
```

### Making a mobile phone an IP camera
To make your mobile phone an IP camera, you need a third-party Android application by which you can convert your mobile phone as an IP camera.

To find and use the Android application, follow the steps below:
1. Go to the `Google Play Store` on your mobile phone.
2. Search for IPCAM.

> Note that, you will find many such applications. IP Webcam by Pavel (developer) is the most popular and preferred for converting mobile phones to IPCAMs.

![ipcam](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/playstore.jpg)

*Screenshot of the app to be downloaded*

Once it is installed, follow the steps below to view the live stream video:

1. Scroll down and select the start server option.

![starting the server](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/server.jpg)

*Starting the server*

2. Once the server is selected, the live stream video is visible on your phone.

> Note that, at the lower part of the screen, you can see the IPv4 addresses.

![ip address](/engineering-education/getting-started-with-webcam-and-ipcam-in-matlab/ip_address.jpg)

*IP addresses of live webcamera*

The `IPv4` address will be used to access the camera from our Matlab. So, we should make note of it.

This IP address can also be opened in your PC browser to see the live streaming from the mobile IP camera.

This can be done by simply copying your IP address by long press of your screen and searching it in your browser.

> Note that, the Phone and the PC must connected to the same WiFi network.

### How to access the live video stream from your IP to your Matlab?
We first create a camera object `cam3`. When creating the camera object, we need the IP address of the IP camera.

```Matlab
cam3 = ipcam('http://192.168.1.4:8080/video');
%execute the preview command to get the video on your Matlab
preview(cam3)
```

For more information about the topic, check [here](https://www.mathworks.com/help/supportpkg/usbwebcams/ug/acquire-webcam-images-in-a-loop.html)

### Conclusion
Matlab is a better software to use for live video streaming. This is because it has support packages that make this process easier.

It also easier to use and understand, since the codes are not bulky.

IPCAM and WEBCAM are very important. They can be utilized for every sector to improve and enhance the security. They can also be used to capture images for further analysis and projects related to data science.

Happy coding.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
