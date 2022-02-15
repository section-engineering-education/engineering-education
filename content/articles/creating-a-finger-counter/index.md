---
layout: engineering-education
status: publish
published: true
url: /creating-a-finger-counter/
title: Creating a Finger Counter using Computer Vision, OpenCv and Python
description: This tutorial will discuss how to create a finger counter using computer vision, opencv and python.
author: denis-kuria
date: 2022-02-06T00:00:00-12:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-finger-counter/hero.jpg
    alt: Creating a finger counter using computer vision, OpenCv and Python
---
When it comes to coding, the best way of learning is by working on fun but challenging projects. The challenging part makes us research the concepts we are dealing with more in-depth.
<!--more-->
The fun part makes us keep working on the project even when the code is throwing errors. In this tutorial, we will work on a fun but relatively challenging project. We will look at how to create a finger counter using computer vision, OpenCv, and Python.

### Introduction
Python has libraries that will help us develop our project. We will need `OpenCv` and `MediaPipe`. We will later look at why and how we will use these two libraries.

We will also need a Python IDE. We will use **pycharm community edition** as it is freely available on the internet.

This tutorial will discuss how to hand track using python with the help of a MediaPipe library. We will also learn how to implement computer vision in our project using OpenCv.

Lastly, we will learn how to combine MediaPipe, OpenCv, and Python to create a program that will count the number of fingers in an input image. A person using Windows or Linux can follow through.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Understanding the hand landmark model](#understanding-the-hand-landmark-model)
- [Creating a finger counter program using computer vision, OpenCv, and Python](#creating-a-finger-counter-program-using-computer-vision-opencv-and-python)
- [Results](#results)
- [Conclusion](#conclusion)

### Prerequisites
To understand this article, the reader needs to:
- Be familiar with the Python programming language.
- Have pycharm installed on their computer. If you don't have it installed, you can download it from [here](https://www.jetbrains.com/pycharm/download/).

### Understanding the hand landmark model
![Hand landmark model](/engineering-education/creating-a-finger-counter/model.png)

*[Image Source: Mediapipe](https://google.github.io/mediapipe/images/mobile/hand_landmarks.png)*

The diagram above shows a hand landmark model that shows how MediaPipe tracks hands. This article will focus on the hand-knuckles.

The diagram shows numbers from 0 to 20 displayed over the knuckles. We will be using the position of these knuckles to determine whether a finger is open or closed.

Let us take a look at the logic we will be using:
- If knuckle number 8 is above knuckle number 6 then the finger is open. If it is below knuckle number 6 then the finger is closed.
- This will apply to all fingers except the thumb. For the thumb, we will check whether knuckle number `4` is above knuckle number `2`. If this is the case then the thumb is open else, the thumb is closed.

### Creating a finger counter program using computer vision, OpenCv, and Python
First, we need to prepare our working environment in *Pycharm*. To do so, open the pycharm app and click `create a new project` on the window that appears.

This will look as shown in the screenshot below:

![Project](/engineering-education/creating-a-finger-counter/project.png)

After clicking `create a new project`, a new window will appear. Click the `create` button. Now that we have Pycharm ready, we need to install the Python libraries we need for our project.

### Installing the Python libraries we need for our project
Click on the `terminal` as shown in the screenshot below and follow the steps below it.

![Terminal](/engineering-education/creating-a-finger-counter/terminal.png)

To install `MediaPipe`, use the command below:

```bash
pip install mediapipe
```

This library was developed by Google. We will use it for hand tracking and finger tracking. In case you want to read more about it you can find its documentation [here](https://google.github.io/mediapipe/solutions/hands.html).

To install `cv2`, we will use the command below:

```bash
pip install opencv-python
```

We will use the library above to take our input through the webcam. It will also help us process the captured image to `RGB` format.

### Coding
After installing the libraries above, we are now ready to start coding. We will write our code on the `main.py` file that pycharm automatically creates for us.

#### Step 1 - Importing the libraries we need
We will start by importing the libraries we discussed into our project. This will enable to us use their dependencies in our code.

To do so, use the code below:

```python
import cv2
import mediapipe as mp
```

#### Step 2 - Declaring the 'MediaPipe' objects and the finger and thumb coordinates
We will then capture an image using our webcam and declare the `MediaPipe` objects that we will need. We will also declare the finger and thumb coordinates that we will use to determine whether a finger is open or closed.

The code below is used to achieve this:

```python
cap = cv2.VideoCapture(0)
mp_Hands = mp.solutions.hands
hands = mp_Hands.Hands()
mpDraw = mp.solutions.drawing_utils
finger_Coord = [(8, 6), (12, 10), (16, 14), (20, 18)]
thumb_Coord = (4,2)
```

> We will use `mp_Hands` to detect the hands in our input image, `hands` to process the detected hands, and `mpDraw` to draw the hand connections and landmarks present in the hands.

#### Step 3 - Converting the input image to 'RGB' image
Next, we check whether there is an input image using the code below. If it is successful and the image does exist, we will first convert it to `RGB`.

Afterwards, we process the `RGB` image using the `hands` module to locate the hands and identify all the landmarks present in them. This is shown below:

```python
while True:
    success, image = cap.read()
    RGB_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(RGB_image)
    multiLandMarks = results.multi_hand_landmarks
```

#### Step 4 - Drawing the landmarks present in the hand
So far we have identified the landmarks present on the hands but we have not drawn the identified landmarks. The code below will help ensure that the hand landmarks do exist using the `if` statement.

We will create a nested `for` loop to enable us to work on one hand at a time and draw the hand landmarks present on each hand. The empty list that is created will be used later in the code.

```python

    if multiLandMarks:
        handList = []
        for handLms in multiLandMarks:
            mpDraw.draw_landmarks(image, handLms, mp_Hands.HAND_CONNECTIONS)
            for idx, lm in enumerate(handLms.landmark):
```

#### Step 5 - Changing the hand points coordinates into image pixels
Working with the actual coordinates is challenging. Therefore, we need to change them into pixels.

We use the `image.shape` function to get the height, width, and color channel of the image. We will then get the `x` and `y` coordinates of each hand point in the form of pixels. We will then save these hand points in the list we previously created.

The code below will implement this:

```python
              h, w, c = image.shape
              cx, cy = int(lm.x * w), int(lm.y * h)
              handList.append((cx, cy))
```

#### Step 6 - Circling the hand points
We will now circle each hand point we have identified. This is to ensure that we are getting the correct hand points. 

We use the code below to achieve this:

```python
        for point in handList:
            cv2.circle(image, point, 10, (255, 255, 0), cv2.FILLED)
```

#### Step 7 - Checking whether a finger is open or closed
We will now use the logic we discussed [here](#understanding-the-hand-landmark-model) to determine whether a finger is open or closed. We will be iterating on each finger using a `for` loop.

```python
        upCount = 0
        for coordinate in finger_Coord:
            if handList[coordinate[0]][1] < handList[coordinate[1]][1]:
                upCount += 1
        if handList[thumb_Coord[0]][0] > handList[thumb_Coord[1]][0]:
            upCount += 1
```

#### Step 8 - Displaying our output
The final step involves us displaying the output. We will display the number of open fingers using the value of the `upcount`. This is because it is only incremented when a finger is open.

We will also output a real-time video that shows the user opening and closing their fingers. Use the code below to achieve this:

```python
        cv2.putText(image, str(upCount), (150,150), cv2.FONT_HERSHEY_PLAIN, 12, (0,255,0), 12)

    cv2.imshow("Counting number of fingers", image)
    cv2.waitKey(1)
```

### Results
When we run the code above to completion, without any errors, the output will be as shown below.

![Results](/engineering-education/creating-a-finger-counter/results.gif)

### Conclusion
We have finally come to the end of this tutorial. You now better understand the concepts and skills needed to create finger counting software. Now watch as the program recognizes and displays the number of fingers you show to it through the webcam.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)