---
layout: engineering-education
status: publish
published: true
url: /approximating-the-speed-of-an-object-and-its-distance/
title: Approximating the speed of an object and its distance using OpenCV in Python
description: In this article, we consider the problem of approximating the speed of an object and its distance using OpenCV in Python. 
author: bonface-ndolo
date: 2022-03-10T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/implementing-gan-from-scratch/hero.jpg
   alt: Implementing GANs example image
---

### Introduction
Computers are essential in today's technological age. They make our lives easier by making other incorporable tasks easier to perform, such as speed and distance approximation.
In this tutorial, we will learn how to use OpenCV to detect the frontal face as our object, find the object's distance with relation to the camera, then calculate the speed. In our case, we will use our laptop webcam as our tool.

### Table of Contents
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Referral face object image](#referral-face-object-image)
- [Distance and speed approximation using the frontal face object](#distance-and-speed-approximation-using-the-frontal-face-object)
- [Getting started](#getting-started)
- [Installations of external libraries.](#installations-of-external-libraries)
- [Detection of the frontal face](#detection-of-the-frontal-face)
- [Determining the distance](#determining-the-distance)
- [case 1:](#case-1)
- [Finding the focal length.](#finding-the-focal-length)
- [case 2:](#case-2)
- [Finding the distance](#finding-the-distance)
- [case 3:](#case-3)
- [Reading reference images from the directory](#reading-reference-images-from-the-directory)
- [Determining the speed.](#determining-the-speed)
- [case 1:](#case-1-1)
- [Finding the speed](#finding-the-speed)
- [case 2:](#case-2-1)
- [Finding average speed](#finding-average-speed)
- [case 3:](#case-3-1)
- [Calling of the pre-defined functions](#calling-of-the-pre-defined-functions)
- [Conclusion](#conclusion)


### Prerequisites
1. You need to be conversant with python as a programming language. To get started with python basics, refer to this tutorial link below  [a beginners guide to python](/engineering-education/a-beginners-guide-to-python/)
2. You need to have `Pycharm` pre-installed since it will be our IDE working environment.

### Referral face object image

![Ref_image](/engineering-education/approximating-the-speed-of-an-object-and-its-distance/Ref_image.png)
This image shows how a frame of the frontal face is detected, and we will use it as our reference image later in the program.
We will also use the `haarcascade_frontalface_default.xml` module to detect our face object. To get this module from Github, use the link below. [haarcascade_frontalface_default.xml (github.com)](https://gist.github.com/Learko/8f51e58ac0813cb695f3733926c77f52).

### Distance and speed approximation using the frontal face object
### Getting started 
Fire up your *Pycharm IDE* to create a new project.
*As shown in the image below.*
![startup](/engineering-education/approximating-the-speed-of-an-object-and-its-distance/startup.png)
As shown above, we will name our project `DistanceVelocity` on the open menu. We then select our base interpreter to be python3.10 latest as to the composing of this tutorial. As well, you can use any version of the python base interpreter.
After making suitable selections, we click on the create button to launch our project.

### Installations of external libraries.
The external library we will use in this section is OpenCV.
In your working environment, there are different bottoms in this window. On the button identified as terminal, click to open the terminal interface. We will download and install our OpenCV here. Copy the below command to the terminal.
````bash
  pip install OpenCV-Python
````
**OpenCV** is a powerful tool in aiding computer vision functions and related problems. It is also used in the processing of images and real-time videos.
Having **OpenCV** installed, we are now fully equipped to proceed to the next part.


### Detection of the frontal face
To detect the frontal face, we will have to save the `haarcascade_frontalface_default.xml`  file in the exact location as the main program. Next, we will work with our laptop's web camera, which by default is  `0` during the calling function. Likewise, `1` can be used when dealing with an external camera, but we will use the default one in our case. Finally, we will create a function for returning the detected face object coordinates of the rectangular frame.
Then converting the RGB image into gray-scale requires an image parameter for scaling up or down the image for better output, but this is also very dependent on the processing power of one's machine. So we opt to use the standard values. Let's dive into the fun coding part.  
```python
import cv2  
  
# This is the distance from camera to face object  
DECLARED_LEN = 30 # cm  
# width of the object face  
DECLARED_WID = 14.3 # cm  
# Definition of the RGB Colors format 
GREEN = (0, 255, 0)  
RED = (255, 0, 0)  
WHITE = (255, 255, 255)
#Defining the fonts family, size, type  
fonts = cv2.FONT_HERSHEY_COMPLEX  
# calling the haarcascade_frontalface_default.xml module for face detection.  
face_detector = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")  
  
  
def face_data(image):  
  
    face_width = 0  
  gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  
    #We use 1.3 for less powerful processors but can increase it according to your processing power of your machine.
    faces = face_detector.detectMultiScale(gray_image, 1.3, 5) 
    #getting the rectangular frame 
    for (x, y, h, w) in faces:  
        cv2.rectangle(image, (x, y), (x + w, y + h), WHITE, 1)  
        face_width = w  
  
    return face_width  
#We use 0 in the VideoCapture function since that calls the default camera, the webcam.  
cap = cv2.VideoCapture(0)  
while True:  
    _, frame = cap.read()  
    face_width_in_frame = face_data(frame)  
    cv2.imshow("frame", frame)  
    #The string 'q' is will be used for stopping and quiting  
  if cv2.waitKey(1)==ord("q"):  
        break  
cap.release()  
cv2.destroyAllWindows()
``` 
Below is the image of the expected output.
![frontalFace](/engineering-education/approximating-the-speed-of-an-object-and-its-distance/frontalFace.png)

### Determining the distance 
To get the distance, we will have to create more functions.
The first function to be created is the focal length finder.
 ### case 1:
 ### Finding the focal length.
  The function defined will calculate the focal length thus by getting the distance between lens to CMOS sensor.
1st parameter to be used is  `Determined_Distance(int)`: It is distance measured from object to the Camera while Capturing Reference image  
2nd parameter to be used is `Actual_Width(int)`: This is the real width of object, in real world, for instance my face width is = 14.3 centimeters)  
3rd parameter to be used is `Width_In_Image(int)`: It is object width in the frame /image in our case in the reference image(found by Face detector)  
Returning as decimal values.  `focal_length(Float)`:
Below is the function code.
```python
def focal_length(determined_distance, actual_width, width_in_rf_image):  
    focal_length_value = (width_in_rf_image * determined_distance) / actual_width  
    return focal_length_value
```

### case 2:
### Finding the distance 
This is the second function to be created, the distance finder function. This function approximates the distance between the face object and camera using defined arguments.
1st parameter to be used is `focal_length(float)`: return by the focal_length_Finder function  
2nd parameter to be used is `Actual_Width(int)`: It is the real width of the object. For example, my face is approximately 14cm in the real world. 
3rd parameter to be used is `object_Width_Frame(int)`: broadness of object in the image(frame in our case, returning Video visual feed)  
Returning Distance as decimal values `Distance(float)` : distance Estimated

```python
def distance_finder(focal_length, real_face_width, face_width_in_frame):  
    distance = (real_face_width * focal_length) / face_width_in_frame  
    return distance
```
### case 3:
### Reading reference images from the directory
We will open our reference image then store it in a variable. Further illustrations are implemented in the code below.
```python  
ref_image = cv2.imread("Ref_image.png")  
  
ref_image_face_width = face_data(ref_image) 
#Processing our called reference image
focal_length_found = focal_length(DECLARED_LEN, DECLARED_WID, ref_image_face_width)  
print(focal_length_found)  
cv2.imshow("ref_image", ref_image)  
  
while True:  
    _, frame = cap.read()  
  
    # calling face_data function  
  face_width_in_frame = face_data(frame)  
    # finding the distance by calling function Distance  
  if face_width_in_frame != 0:  
        Distance = distance_finder(focal_length_found, DECLARED_WID, face_width_in_frame)  
        # Writing Text on the displaying screen  
  cv2.putText(  
            frame, f"Distance = {round(Distance,2)} CM", (50, 50), fonts, 1, (WHITE), 2  
  )  
    cv2.imshow('frame', frame)  
    if cv2.waitKey(1) == ord("q"):  
        break  
cap.release()  
cv2.destroyAllWindows()
```
Your output should be as shown in the image below.
![distance](/engineering-education/approximating-the-speed-of-an-object-and-its-distance/distance.png)

### Determining the speed.
To find the speed, we will first have to import the time module since speed is distance in relation to time taken. Then we will initialise time related variables. Below is the code snippet for illustrations.
```python
import time  
# declaration of variables  
initialTime = 0  
initialDistance = 0  
changeInTime = 0  
changeInDistance = 0  
  
listDistance = []  
listSpeed = []
```
### case 1:
### Finding the speed
This function takes the covered distance and time taken as parameters and returns the speed.
```python 
def speedFinder(covered distance, timeTaken):  
  
    speed = coveredDistance / timeTaken  
  
    return speed
```
### case 2:
### Finding average speed
We will start by finding the length of the list. Followed by calculating the number of items to find its average. Get the list of most recent items of the list to find the average of the selected items in the list. Lastly, we return the average.
```python
def averageFinder(completeList, averageOfItems):  
    lengthOfList = len(completeList)  
    selectedItems = lengthOfList - averageOfItems  
    selectedItemsList = completeList[selectedItems:]  
    average = sum(selectedItemsList) / len(selectedItemsList)  
  
    return average
```
### case 3:
### Calling of the pre-defined functions
Following closely, below is the code illustrating the function calls.
```python
while True:  
    _, frame = cap.read()  
  
    # calling face_data function  
  face_width_in_frame = face_data(frame)  
    # finding the distance by calling function Distance  
  if face_width_in_frame != 0:  
        Distance = Distance_finder(  
            Focal_length_found, DECLARED_WID, face_width_in_frame)  
        listDistance.append(Distance)  
        averageDistance = averageFinder(listDistance, 2)  
  
        # converting centimeters into meters  
  distanceInMeters = averageDistance/100  
  
  if initialDistance != 0:  
            # getting the  difference of the distances  
  changeInDistance = initialDistance - distanceInMeters  
  changeInTime = time.time() - initialTime  
  
            # calculating the speed  
  speed = speedFinder(  
                coveredDistance=changeInDistance, timeTaken=changeInTime)  
            listSpeed.append(speed)  
            averageSpeed = averageFinder(listSpeed, 10)  
            if averageSpeed < 0:  
                averageSpeed = averageSpeed * -1  
  # filling the progressive line dependent on the speed.  
  speedFill = int(45+(averageSpeed) * 130)  
            if speedFill > 235:  
                speedFill = 235  
  cv2.line(frame, (45, 70), (235, 70), (0, 255, 0), 35)  
            # speed dependent line  
  cv2.line(frame, (45, 70), (speedFill, 70), (255, 255, 0), 32)  
            cv2.line(frame, (45, 70), (235, 70), (0, 0, 0), 22)  
            # print()  
  cv2.putText(  
                frame, f"Speed: {round(averageSpeed, 2)} m/s", (50, 75), fonts, 0.6, (0, 255, 220), 2)  
  
            # print(speed)    
        initialTime = time.time()  
  
    # Writing Text on the displaying screen  
  cv2.line(frame, (45, 25), (255, 25), (255, 0, 255), 30)  
        cv2.line(frame, (45, 25), (255, 25), (0, 0, 0), 22)  
        cv2.putText(  
            frame, f"Distance = {round(distanceInMeters,2)} m", (50, 30), fonts, 0.6, WHITE, 2)  
    # recording the video  
  Recorder.write(frame)  
    cv2.imshow("frame", frame)  
    if cv2.waitKey(1) == ord("q"):  
        break
```
Below is the output.
 ![sean](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/sean.jpg)

### Conclusion
In this tutorial, we have covered the three most crucial areas.

- Detection of the frontal face.
- Estimation of a (face) object distance by using a webcam.
- Approximation of a (face) object speed by using a webcam.

You are now equipped to carry on with all that content in place.
Have a blast coding session.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
