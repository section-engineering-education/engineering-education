---
layout: engineering-education
status: publish
published: true
url: /creating-a-hand-gesture-volume-controller-using-python-and-pycharm/
title: Creating a Hand Gesture Volume Controller using Python and Pycharm
description: This tutorial aims to create a hand gesture volume controller using Python and Pycharm.
author: denis-mwangi
date: 2021-12-21T00:00:00-17:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/hero.jpg 
    alt: Hand Gesture Volume Controller Hero Image
---
In the times we are living in, computers are everywhere. Whether it is in your place of work, while listening to a presentation, while listening to your favorite music, or in entertainment places. 
<!--more-->
They help us simplify most of our day-to-day activities. However, water, dust, and other things such as food spills can easily damage them. 

As a result, a hand gesture volume controller would come in handy. You don't have to worry about the state of your hands. You can use your fingers and adjust the computer's volume to your level of satisfaction.

Python has libraries that will help us create our hand gesture volume controller.

This tutorial will discuss the use of these libraries, how to use python to track hand gestures, and finally, how to create a hand gesture volume controller. You can follow along using either Windows, Linux, or MacOS.

### Table of contents
- [Prerequisites](#prerequisites)
- [Referral hand image](#referral-hand-image)
- [Creating a hand gesture volume controller](#creating-a-hand-gesture-volume-controller)
- [Results](#results)
- [Conclusion](#conclusion)

### Prerequisites
For you to follow through this article, you need to:
- Be familiar with the Python programming language.
- Have **Pycharm** installed on your computer. You can download it [here](https://www.jetbrains.com/pycharm/download/)

### Referral hand image
![hand](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/hand.jpg)

*[Image Source: Mediapipe](https://google.github.io/mediapipe/solutions/hands.html)*

The above image shows the numbers of the points that mediapipe uses to refer to different points of the hand. This tutorial will use point `4` and point `8` which are the thumb and the index finger respectively.

### Setting up
First of all, we will prepare our workspace. Launch the Pycharm app. Click on the create a new project.

![Pycharm](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/pycharm.png)

Click on the create button on the window that appears next.

We need to install the libraries we need to use in our project.

`numpy` will help us work with arrays. To install it, open the terminal and run the following command: 

```bash
pip install numpy
```
Repeat the same process for the other libraries.

```bash
pip install opencv-python
```
This library is imported as `cv2`. We will use it to capture an image using the webcam and convert the image to `RGB`.

```bash
pip install mediapipe
```
This is an open-source library developed by Google. It's used for both face and gesture recognition. For this tutorial, we'll use it for hand gesture recognition.

```bash
pip install pycaw
```
We'll need this library to access the device's speaker and its master volume.

```bash
pip install python-math
```
We'll use this library to find the distance between point number `4` (the thumb) and point number `8` (the index finger) using hypotenuse.

```bash
pip install gpib-ctypes, comtypes
```
`pycaw` depends on these two libraries. `Ctypes` providea `C` language compatible data types. `Comtypes` bases on the `ctypes` **FFI**(Foreign Function Interface) library.

Now let us jump into coding. This is where the most fun is as we get hands-on.

```python
import cv2
import mediapipe as mp
from math import hypot
from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
import numpy as np
```
In the above code segment, we are importing each library we did discuss into our project.

```python
cap = cv2.VideoCapture(0) 
```
We are getting the video input from our computer's primary camera. If you are using any other camera, replace the number `0` with that of the camera you are using.

### Detecting, initializing, and configuring the hands
```python
mpHands = mp.solutions.hands
hands = mpHands.Hands()
mpDraw = mp.solutions.drawing_utils
```
- `mp.solutions.hands`: We are calling on the `mediapipe` hand module to detect the hands from the video input we did get.
- `mpHands.Hands()`: This completes the initialization and configuration of the hands we did detect.
- `mp.solutions.drawing_utils`: Draws the *connections* and *landmarks* of the hand image. 

### Accessing the speaker using pycaw
```python
devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(interface, POINTER(IAudioEndpointVolume))
```
These are the initializations we need for `pycaw`. The developer provides this library. So, you will not change anything. You can find it [here](https://github.com/AndreMiras/pycaw).

### Finding the volume range between the minimum and maximum volume
```python
volMin, volMax = volume.GetVolumeRange()[:2]
```
We are calling the `pycaw` `volume.GetVolumeRange()` function to find the volume range between the minimum and maximum volume.

### Capturing an image from our camera and converting it to an RGB image
```python
while True:
    success, img = cap.read()
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(imgRGB)
```
- `success, img = cap.read()`: Checks whether the camera we have specified works. If it works, we will capture an image.
- `imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)`: Converts the image captured by the camera to `RGB` image.
- ` results = hands.process(imgRGB)`: Completes the processing of the converted image.

### Checking whether we have multiple hands in our input
```python
lmList = []
if results.multi_hand_landmarks: 
```
- `lmList = []`:
We are creating an *empty list* which we will use to store the list of elements of the detected hands, i.e., the number of points on the hand.
- `if results.multi_hand_landmarks:` We are checking if the input has multiple hands.

### Creating a for loop to manipulate each hand
```python
        for handlandmark in results.multi_hand_landmarks:
            for id, lm in enumerate(handlandmark.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                lmList.append([id, cx, cy]) 
            mpDraw.draw_landmarks(img, handlandmark, mpHands.HAND_CONNECTIONS)
```
- `for handlandmark in results.multi_hand_landmarks`: Creating a for loop to interact with each hand in the results.
- `for id, lm in enumerate(handlandmark.landmark)`: Creating a for loop to get the `id` (id number) and `lm` (landmark information) for each handlandmark. The landmark information will give us the `x` and `y` coordinates. The id number is the number assigned to the various hand points.
- `h, w, c = img.shape`: Checking the height width and channels of our image. This will give us the width and height of the image.
- `cx, cy = int(lm.x * w), int(lm.y * h)`: Finding the central position of our image. We achieve this by multiplying *lm.x by the width* and assigning the value obtained to `cx`. Then multiply `lm.y` by the height and assign the value obtained to `cy`. **NB** `lm` stands for landmark.
- `lmList.append([id, cx, cy])`: We are adding the values of `id`,`cx` and `cy` to `lmList`.
- ` mpDraw.draw_landmarks(img, handlandmark, mpHands.HAND_CONNECTIONS)`: We pass our image (`img`) then we call *mpDraw.draw_landmarks* to draw all the landmarks of the hand.

### Specifying the points of the thumb and middle finger we will use
```python
    if lmList != []:
        x1, y1 = lmList[4][1], lmList[4][2]
        x2, y2 = lmList[8][1], lmList[8][2]
 ```
 - `if lmlist != []`: We use this statement to specify that the number of elements should not be null.
 - `x1, y1 = lmList[4][1], lmList[4][2]` : We are assigning variables `x1` and `y1` the `x` and `y` coordinates of point `4` respectively. This is the tip of the thumb. 
 - `x2, y2 = lmList[8][1], lmList[8][2]`: We are assigning variables `x2` and `y2` the `x` and `y` coordinates of point `8` respectively. This is the tip of the index finger. 
 
 Refer to the had image diagram we did discuss to identify the [points](#referral-hand-image).

 ### Drawing a line between the tip of the thumb and the tip of the index finger
 ```python                                            
        cv2.circle(img, (x1, y1), 15, (255, 0, 0), cv2.FILLED)  
        cv2.circle(img, (x2, y2), 15, (255, 0, 0), cv2.FILLED)  
```
- `cv2.circle(img, (x1, y1), 4, (255, 0, 0), cv2.FILLED)`: We are calling the `cv2.circle` and passing our image `img`.
- ` (x1, y1)`: It specifies that we will draw the circle at the tip of the thumb.
- `15`: This is the *radius* of the circle.
- `(255, 0, 0)`: This is the *color* of the circle.
- `cv2.FILLED`: This refers to the thickness of `-1` pixels. It will fill the circle with the color we specify.

We will repeat the same for the index finger in the line of code: 

`cv2.circle(img, (x2, y2), 15, (255, 0, 0), cv2.FILLED)`. 

### Drawing a line between points 4 and 8
```python
cv2.line(img, (x1, y1), (x2, y2), (255, 0, 0), 3)
```
In the code above, we use the `cv2.line` function to draw a line between point four of the hand, and point `8`.
- `img`: We are passing our image to the function.
- `(x1, y1), (x2, y2)`: We are specifying that the line we will draw will connect point `4` (`(x1, y1)`) which is the tip of the thumb and point `8` (`(x2, y2)`) which is the tip of the index finger.
- `(255, 0, 0)`: This is the color of the line.
- `3`: This is the thickness of the line.

### Finding the distance between points 4 and 8
```python
length = hypot(x2 - x1, y2 - y1)
```
In the code above, we find the distance between the tip of the thumb and the index finger using hypotenuse. We achieve this by calling the math `hypot` function and passing the difference between `x2` and `x1` and the difference between `y2` and `y1`.

### Converting the hand range to the volume range
```python                                          
vol = np.interp(length, [15, 220], [volMin, volMax])
print(vol, length)
```
We are calling on the numpy function `np.interp` to convert the hand range to the volume range. The arguments used are:
- `length`: This is the value we want to convert.
- `[15 - 220]`: This is the hand range.
- `[volMin, volMax]`: Giving the range to which we want to convert.

### Setting the master volume
```python        
volume.SetMasterVolumeLevel(vol, None)  
```

We are setting the master volume level in accordance with the hand range. We achieve this by passing `vol`, which is the value of the hand range we did convert to volume range.

### Displaying the video output used to interact with the user
```python
cv2.imshow('Image', img) 
```

The above code shows the real-time video showing the user interacting with the program, i.e., the user uses the thumb finger and the index finger to control the volume.

### Terminating the program
```python
if cv2.waitKey(1) & 0xff == ord('q'): 
   break
```
The code above will terminate the program if the user presses the `q` key.

### Results
When the code above has run to completion without any errors, the results will be shown in the screenshot below:

![Results](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/results.gif)

### Conclusion 
You now have all the skills required to create a hand gesture volume controller. Do your work while listening to your favorite music. You don't have to worry about dirtying your hands. By just a gesture of your hand, you can control the volume level of your music.

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
