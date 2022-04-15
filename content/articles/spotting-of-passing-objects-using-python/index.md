---
layout: engineering-education
status: publish
published: true
url: /spotting-of-passing-objects-using-python/
title: Spotting Of Passing Objects Using OpenCV In Python
description: This tutorial will discuss how to detect moving objects in real-time video streams using OpenCV.
author: jacob-muganda
date: 2022-03-09T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spotting-of-passing-objects-using-python/hero.png
    alt: Spotting Of Passing Objects Using OpenCV In Python Hero Image
---
Tracking and spotting moving objects has become crucial in our lives today. Talking of security, cameras help us a great deal to detect and track moving objects.
<!--more-->
In this tutorial, we will learn how to spot a passing object and return the spotted object in real-time using computer vision.

### Table of contents
- [Introduction](#introduction)
- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Implementation](#implementation)
- [Results](#results)
- [Conclusion](#conclusion)

### Pre-requisites
- You should have a basic understanding of Python.
- A brief overview and prior knowledge of computer vision would help. You can learn a little about computer vision [here](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/).
- You should have a webcam on your laptop.

With those at hand, we will be able to tackle our project. Let's dive in.

### Installation
#### Install OpenCV
First, we have to install `OpenCV` to manipulate and work with the webcam images or videos. It also helps with computer-vision related solutions to process images and live videos.

To learn more about OpenCV, it is recommended to go through [this documentation](https://docs.opencv.org/4.x/d9/df8/tutorial_root.html).

In your working environment, open the terminal and paste the command below to have the OpenCV downloaded and installed simultaneously.

```bash
pip install OpenCV-Python
```

This library allows for modules such as `cv2` to be installed. Since it is a cross-platform library, it contains a variety of functions to read and manipulate images.

#### Install NumPy
NumPy is used to express data as multi-dimensional arrays. In our case, we represent the image pixel values as arrays.

You can read more about NumPy in [this documentation](https://numpy.org/doc/).

```bash
pip install numpy
```

#### Install imutils
`imutils` library helps to rotate, resize, and skeletonize the images alongside OpenCV.

You can learn more about `imutils` [here](https://openbase.com/python/imutils/documentation).

```bash
pip install imutils
```

After successful installations, we will now jump into the code area.

### Implementation
#### Import external libraries
As we had discussed earlier, we will import all the above-mentioned libraries to our Python code as shown:

```python
import cv2
import numpy as np
import datetime
import imutils
```

`datetime` library returns the current date and time. In our case, it helps keep track of the live or real-time data.

#### Initialize variables
We will have to initialize objects that helps us capture and record video data as shown:

```python
rec = cv2.VideoCapture(0)
sto, mapping1 = rec.read()
sto, mapping2 = rec.read()
```

From the above code:
- The first mapping is to store the initial frame.
- The second mapping is to store the subsequent frames.
- In the function `VideoCapture`, we use `0` since it denotes the access for the webcam.

#### Detect and convert frames to grayscale
A video can be defined as a series of continuous images with the difference in time. So, we will have to initially identify and recognize the frames then have them processed.

Image frames are converted to grayscale to increase the accuracy to detect the key features and eliminate possible misses.

To learn more about what Grayscale is, it is recommended to read [this](/engineering-education/image-preprocessing-in-python/) article.

```python
while rec.isOpened():
    sub = cv2.absdiff(mapping1, mapping2)
    convclr = cv2.cvtColor(sub, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(convclr, (3, 3), 1)
    _, thresh = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)
    enlarged = cv2.dilate(thresh, None, iterations=1)
    contours, _ = cv2.findContours(enlarged, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
```

In the above code:
- We will assign `sub` to the difference between the first and second mapping.
- The `cvtColor` method is called to convert the `sub` to grayscale on specifying `cv2.COLOR_BGR2GRAY`.
- We then call the `GaussianBlur` function to the blur on `sub`.
- After the above operations, we call the `dilate` function to enlarge the `sub`, thereby enhancing its accuracy by removing all the gaps between.
- On iterating over it, we get the resulting contours.

#### Blur the frame
`GaussianBlur` from `cv2` is responsible for the blurring of the image. It smoothens the pixels and averages out the intensity across pixel height against its width, thus filtering high-intensity noise.

Let's implement it as shown below:

```python
if mapping1 is None:
	break

mapping1 = imutils.resize(mapping1, width=700)
convclr1 = cv2.cvtColor(mapping1, cv2.COLOR_BGR2GRAY)
convclr2 = cv2.GaussianBlur(convclr1,(21, 21), 0)
```

In the above code:
- The blur is performed to remove high-frequency components from the image.
- We find that the first and second frames are already converted to grayscale.
- Using `imutils` we resize the frame to the desired size of `700` pixels wide.

#### Find the difference between delta frames
Since we stored the first frame in `mapping1`, we will be able to compute the difference for the later frames using `mapping2` as shown:

```python
if mapping1 is None:
	mapping1 = convclr2
	continue

frameDelta = cv2.absdiff(convclr2, convclr1)
thresh = cv2.threshold(frameDelta, 25, 255, cv2.THRESH_BINARY)[1]
```

In the above code:
- The absolute differences between the pixel matrices in `mapping1` and `mapping2` fetch the absolute value of the pixel intensity `frameDelta`.
- The `THRESH_BINARY` function helps turn the color of the passing object to white while setting the color of the background to black.

#### Find the contours
To enlarge the images, we call a `dilate` function from `cv2` as shown:

```python
thresh = cv2.dilate(thresh, None, iterations=2)
count = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
count = imutils.grab_contours(count)
```

In the above code:
- We use the `findContours` function to get the contours.
- Two arguments are passed to the function to retrieve and approximate, thus saving on memory by removing repeated points and compressing them.
- The `dilate` function accepts two inputs, one of which is our input image, and the other is known as the structuring element or kernel, which determines the nature of the operation.
- Dilation of the image helps increase the size of the object.

#### Format the displayable text and time layout
To be able to write text on the footage, you will have to call a `cv2` function `putText`.

It defines the font, color, size, depth, and the family of the text. To display the current time or real-time data we use `datetime` module as shown:

```python
for count in contours:
    (x, y, w, h)=cv2.boundingRect(count)
    if cv2.contourArea(count)<700:
        continue
		cv2.rectangle(mapping1, (x, y), (x + w, y + h), (0, 0, 255), 2)
    cv2.putText(mapping1, "REPORT: {}".format('PASSING OBJECT DETECTED'), (5, 30), cv2.FONT_HERSHEY_DUPLEX, 1, (255, 0, 0), 4)
    cv2.putText(mapping1, datetime.datetime.now().strftime("%A %d %B %Y %I:%M:%S%p"), (10, mapping1.shape[0]-10),cv2.FONT_HERSHEY_DUPLEX, 0.9, (0, 255, 0), 3)
```

#### Display the image and footage
The `cv2` function `imshow` allows us to display and return the called images or video feeds that was stored in the earlier instantiated values as shown:

```python
cv2.imshow("FOOTAGE", mapping1)
cv2.imshow("MARGIN", thresh)
cv2.imshow("DIFFERENCE OF DELTA FRAMES", frameDelta)

mapping1=mapping2
sto, mapping2=rec.read()
```

#### Wrapping it up
We will need to assign a key to record the keypress and terminate our program. On terminating the program, we clean the webcam and release any resources in use.

Lastly, we destroy all the windows constructed by `OpenCV`.

```python
if cv2.waitKey(50)==50:
	break

cv2.destroyAllWindows()
```

#### Results
Below are the expected output and outcome for our program.

Output for `THRESH`:
![margin](/engineering-education/spotting-of-passing-objects-using-python/margin.png)

Output for `FRAMEDELTA`:
![framedelta](/engineering-education/spotting-of-passing-objects-using-python/framedelta.png)

Output for `FOOTAGE`:
![footage](/engineering-education/spotting-of-passing-objects-using-python/footage.gif)

### Conclusion
In this tutorial, we have learned several concepts that help with spotting passing objects using OpenCV and other important related tools.

We have gone over installation of the required libraries and the usage of the `cv2` module. We have also learned how to compute the frame deltas and format the text layout to be displayed.

You can find the full source [here](https://github.com/lizpart/codes).

For further reading, we suggest you read [this](https://pyimagesearch.com/2015/05/25/basic-motion-detection-and-tracking-with-python-and-opencv/) article.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
