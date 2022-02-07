---
layout: engineering-education
status: publish
published: true
url: /creating-a-hand-gesture-volume-controller-using-python-and-pycharm/
title: Creating a Hand Gesture Volume Controller using Python and Pycharm
description: This tutorial aims to create a hand gesture volume controller using Python and Pycharm.
author: denis-mwangi
date: 2022-01-28T00:00:00-02:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/hero.jpg 
    alt: Hand Gesture Volume Controller Hero Image
---
This tutorial will discuss how to use python to track hand gestures, and how to create a hand gesture volume controller.
<!--more-->

By the end of this tutorial, you will be able to use your fingers and adjust the computer's volume to your level of satisfaction.

### Table of contents
- [Prerequisites](#prerequisites)
- [Referral hand image](#referral-hand-image)
- [Creating a hand gesture volume controller](#creating-a-hand-gesture-volume-controller)
- [Results](#results)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need:
- To be familiar with the Python programming language.
- To have **Pycharm** installed on your computer. You can download it from [here](https://www.jetbrains.com/pycharm/download/).

### Referral hand image
![hand](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/hand.jpg)

*[Image Source: Mediapipe](https://google.github.io/mediapipe/solutions/hands.html)*

The above image shows the numbers of the points that MediaPipe uses to refer to different points of the hand. This tutorial will use point `4` and point `8` which are the thumb and the index finger respectively.
### Creating a hand gesture volume controller
#### Setting up
First of all, we will prepare our workspace. Launch the Pycharm app. Click on the create a new project.

![Pycharm](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/pycharm.png)

Click on the create button on the window that appears next.

We need to install the libraries we will use in our project.

`numpy` will help us work with arrays. To install it, open the terminal and run the following command: 

```bash
pip install numpy
```
Repeat the same process for the other libraries.

```bash
pip install opencv-python
```
We will import this library as `cv2`. We will use it to capture an image using the webcam and convert it to `RGB`.

```bash
pip install mediapipe
```
It is an open-source library developed by Google. We use it for both face and gesture recognition. For this tutorial, we'll use it for hand gesture recognition.

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
`pycaw` depends on these two libraries. `Ctypes` provides `C` language compatible data types. `Comtypes` bases on the `ctypes` **FFI**(Foreign Function Interface) library.

Now, let's start coding. In the `main.py` file that *pycharm* automatically creates for you, type in the following code:

#### Step 1: Importing the libraries we will need
```python
import cv2
import mediapipe as mp
from math import hypot
from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
import numpy as np
```
In the code segment above, we import each library we installed in our project.

```python
cap = cv2.VideoCapture(0) 
```
We then get the video input from our computer's primary camera. If you are using any other camera, replace the number `0` with that of the camera you are using.

#### Step 2: Detecting, initializing, and configuring the hands
```python
mpHands = mp.solutions.hands
hands = mpHands.Hands()
mpDraw = mp.solutions.drawing_utils
```
In the code above, we are calling on the `mediapipe` hand module to detect the hands from the video input we got from our primary camera. `MpHands.Hands()` then completes the initialization and configuration of the detected hands. We finally draw the *connections* and *landmarks* on the detected hand using `mp.solutions.drawing_utils`. 
 
#### Step 3: Accessing the speaker using pycaw
```python
devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(interface, POINTER(IAudioEndpointVolume))
```
These are the initializations we need for `pycaw` to run smoothly. The developer provides this library together with the initializations. We are not going to change anything. You can find the documentation [here](https://github.com/AndreMiras/pycaw).

#### Step 4: Finding the volume range between the minimum and maximum volume
```python
volMin, volMax = volume.GetVolumeRange()[:2]
```
The code above finds the volume range between the minimum and maximum volume. We place it outside the while loop because we need to find the volume range once.

#### Step 5: Capturing an image from our camera and converting it to an RGB image
```python
while True:
    success, img = cap.read()
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(imgRGB)
```
The code above checks whether the camera we have specified works. If it works, we will capture an image. We then convert the image to `RGB` and complete the processing of the image.

We now need to check whether we have multiple hands in the image we captured.

#### Step 6: Checking whether we have multiple hands in our input
```python
lmList = []
if results.multi_hand_landmarks: 
```
This code creates an *empty list* that will store the list of elements of the hands detected by the `mediapipe` hand module, i.e., the number of points on the hand. It also checks whether the input has multiple hands.

We will now create a for loop to manipulate each hand present in the input.

#### Step 7: Creating a for loop to manipulate each hand
```python
for handlandmark in results.multi_hand_landmarks:
    for id, lm in enumerate(handlandmark.landmark):
        h, w, c = img.shape
        cx, cy = int(lm.x * w), int(lm.y * h)
        lmList.append([id, cx, cy]) 
    mpDraw.draw_landmarks(img, handlandmark, mpHands.HAND_CONNECTIONS)
```
- In the code above, we use the first for loop to interact with each hand in the results. We use the second for loop to get the `id` (id number) and `lm` (landmark information) for each hand landmark. The landmark information will give us the `x` and `y` coordinates. The id number is the number assigned to the various hand points.

- `h, w, c = img.shape`: this line of code checks the height, width, and channels of our image. This will give us the width and height of the image.

- `cx, cy = int(lm.x * w), int(lm.y * h)`: this line of code will find the central position of our image. We will achieve this by multiplying *lm.x by the width* and assigning the value obtained to `cx`. Then multiply `lm.y` by the height and assign the value obtained to `cy`. `lm` stands for landmark.

- `lmList.append([id, cx, cy])`: we will then use this line to add the values of `id`,`cx` and `cy` to `lmList`.

-  We will finally call *mpDraw.draw_landmarks* to draw all the landmarks of the hand using the last line of code.

#### Step 8: Specifying the points of the thumb and middle finger we will use
```python
if lmList != []:
    x1, y1 = lmList[4][1], lmList[4][2]
    x2, y2 = lmList[8][1], lmList[8][2]
```
In the code above, we specify the number of elements in `lmlist`. It should not be null. We assign variables `x1` and `y1` the `x` and `y` coordinates of point `4` respectively. This is the tip of the thumb. We then repeat the same for the index finger in the last line.

Refer to the hand image diagram we discussed to identify the [points](#referral-hand-image).

#### Step 9: Drawing a circle between the tip of the thumb and the tip of the index finger
```python                                            
cv2.circle(img, (x1, y1), 15, (255, 0, 0), cv2.FILLED)  
cv2.circle(img, (x2, y2), 15, (255, 0, 0), cv2.FILLED)  
```
The code above draws a circle at the tip of the thumb and that of the index finger.
- ` (x1, y1)` specifies that we will draw the circle at the tip of the thumb. `15` is the *radius* of the circle. `(255, 0, 0)` is the *color* of the circle. `cv2.FILLED` refers to the thickness of `-1` pixels which will fill the circle with the color we specify.

- We will repeat the same for the index finger: 

#### Step 10: Drawing a line between points 4 and 8
```python
cv2.line(img, (x1, y1), (x2, y2), (255, 0, 0), 3)
```
In the code above, we use the `cv2.line` function to draw a line between point four of the hand and point `8`. The line will connect point `4` `(x1, y1)`, which is the tip of the thumb, and point `8` `(x2, y2)`, which is the tip of the index finger. `(255, 0, 0)` is the line color and `3` is its thickness.

#### Step 11: Finding the distance between points 4 and 8
```python
length = hypot(x2 - x1, y2 - y1)
```
In the code above, we find the distance between the tip of the thumb and the index finger using a hypotenuse. We achieve this by calling the math `hypot` function then passing the difference between `x2` and `x1` and the difference between `y2` and `y1`.

#### Step 12: Converting the hand range to the volume range
```python                                          
vol = np.interp(length, [15, 220], [volMin, volMax])
print(vol, length)
```
We call the NumPy function `np.interp`, to convert the hand range to the volume range. The arguments used are:

- `length`: This is the value we want to convert.
- `[15 - 220]`: This is the hand range.
- `[volMin, volMax]`: Giving the range to which we want to convert.

#### Step 13: Setting the master volume
```python        
volume.SetMasterVolumeLevel(vol, None)  
```

We are setting the master volume level following the hand range. We achieve this by passing `vol`, which is the value of the hand range we converted to volume range.

#### Step 14: Displaying the video output used to interact with the user
```python
cv2.imshow('Image', img) 
```

The code above shows the real-time video of the user interacting with the program, i.e., the user uses the thumb finger and the index finger to control the volume.

#### Step 15: Terminating the program
```python
if cv2.waitKey(1) & 0xff == ord('q'): 
   break
```
The code above will terminate the program when the user presses the `q` key.

### Results
When we run the code without any errors, the results will be:

![Results](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/results.gif)

### Conclusion 
You now have all the skills required to create a hand gesture volume controller. If you are working while listening to your favorite music, by just a gesture of your hand, you will be able to control the volume level of your music.

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)