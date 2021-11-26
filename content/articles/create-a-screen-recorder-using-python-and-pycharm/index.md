---
layout: engineering-education
status: publish
published: true
url: /create-a-screen-recorder-using-python-and-pycharm/
title: Creating a Screen Recorder Using Python and Pycharm
description: In this tutorial we will learn how to use the Python packages to create a screen recorder. Python as a programming language, has packages that wil help us create our own screen recorder.
author: simon-kiruri
date: 2021-11-17T00:00:00-19:16
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/create-a-screen-recorder-using-python-and-pycharm/hero.jpg
   alt: Screen Recorder with Python
---
In this tutorial, we will learn how to use the Python packages to create a screen recorder. We will then go further to integrate a webcam recorder into our software. A person using Windows, macOS, or Linux can follow through.
<!--more-->
### Introduction
A screen recorder is software that captures the contents and activities taking place on a computer screen. This software is vital during activities such as creating video tutorials, recording screen content, for future reference (note-taking), etc.

When recording tutorials, you might want to use the webcam so that your audience can see you, this creates a memorable and interactive session. This leads to screen recorders having webcam recording capability. 

When it comes to price, some of this software is not pocket-friendly. Others miss some specific features we would want to use.

**Python** as a programming language, has packages that wil help us create our own screen recorder. This helps us add the features we intend to use and discard the ones we do not require. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Python packages we will use](#python-packages-we-will-use)
- [Creating a screen recorder and integrating it with a webcam recorder](#creating-a-screen-recorder-and-integrating-it-with-a-webcam-recorder)
- [Results](#results)
- [Conclusion](#Conclusion)

### Prerequisites
For the you to follow along with this article you should:
- Be familiar with the Python programming language.
- Have pycharm installed on your computer. If not, download the [Pycharm Community Edition](https://www.jetbrains.com/pycharm/download/). We are going to use the Pycharm community version since it is free.

### Python packages we will use
To create our screen recorder we will need the following Python packages:
- **Datetime:** We will need this package to know the exact time the screen recording starts and ends. 
- **Python image library:** We will need this package to capture the images on the screen.
- **Numpy:** We will need this package to convert our image to an array to pass it to open cv.
- **win32api:** We will need this package to capture the resolution of the screen.
- **cv2:** We will need this package to be able to save our captured images in video format to our file explorer.

### Creating a screen recorder and integrating it with a webcam recorder
We will have to prepare our working space in Pycharm. Open the Pycharm app. Once it is open, click on the new project as shown in the screenshot below. Then click create on the next window that appears.

![pycharm](/engineering-education/create-a-screen-recorder-using-python-and-pycharm/pycharm.png)

We now have to install the packages we discussed above into Pycharm. Follow the following steps to install them.

To install the DateTime, key in the following command in the terminal:

```bash
pip install DateTime
```

![packages](/engineering-education/create-a-screen-recorder-using-python-and-pycharm/packages.png)

Wait for a few seconds for datetime to be successifully installed.

We will repeat the same procedure for the rest of the packages. Only the commands will change. 

Use the following commands for the respective package:

#### numpy

```bash
pip install numpy
```
 
#### win32api
 
```bash
pip install pywin32
```
 
#### cv2
 
```bash
pip install opencv-python
```
 
#### Python image library
 
```bash
pip install Pillow
```
 
We now have our workspace ready, lets start coding:

```python
 import datetime
from PIL import ImageGrab
import numpy as ny
import cv2
from win32api import GetSystemMetrics

height = GetSystemMetrics(1)  # passing 1 and getting the screen height
width = GetSystemMetrics(0)   # passing 0 and getting the screen width
time_stamp = datetime.datetime.now().strftime('%Y-%m-%d %H-%M-%S')  # Getting the exact time the screen is being recorded
file_name = f'{time_stamp}.mp4'  # Getting a new value based on the time fo screen recording
fourcc = cv2.VideoWriter_fourcc('m', 'p', '4', 'v')  # Declaring our encoding format
final_video = cv2.VideoWriter(file_name, fourcc, 20.0, (width, height))
# Integrating our webcam to the screen recorder
webcam = cv2.VideoCapture(0)  # specifying we will be using the primary camera of our laptop

while True:
    img = ImageGrab.grab(bbox=(0, 0, width, height)) # Declaring a variable called img and call ImageGrab to take a picture of our screen
    img_ny = ny.array(img)  # convert our image to a numpy array in order to pass it to open cv
    img_final = cv2.cvtColor(img_ny, cv2.COLOR_BGR2RGB)  # cv2 will take our image and convert it to RGB color
    _, frame = webcam.read()  # opening the webcam
    fr_height, fr_width, _ = frame . shape  # Finding the width, height and shape of our webcam image
    img_final[0:fr_height, 0: fr_width, :] = frame[0:fr_height, 0: fr_width, :]  # setting the width and height properties
    cv2.imshow('Section screen capture', img_final)  # Calling cv2 to display our converted image

    final_video.write(img_final)  # Writing our converted image
    if cv2.waitKey(10) == ord('t'):  # waiting for any key that the user will press. If t is pressed the program terminates.
        break
``` 

### Results
Here is a screenshot of the output the code will produce.

![Results](/engineering-education/create-a-screen-recorder-using-python-and-pycharm/results.png)

**Note:** The recorded video will be saved in your home folder under a folder named Pycharm project.

### Conclusion
We have built a screen recorder and integrated it with a webcam recorder. Now run your software and enjoy your new screen recorder.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
