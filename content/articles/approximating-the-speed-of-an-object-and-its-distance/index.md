---
layout: engineering-education
status: publish
published: true
url: /approximating-the-speed-of-an-object-and-its-distance/
title: Approximating the Speed of an Object and its Distance using OpenCV in Python
description: This article will help the reader estimate the speed of an object and its distance using OpenCV in Python. 
author: jacob-oduor
date: 2022-03-29T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/approximating-the-speed-of-an-object-and-its-distance/hero.jpg
   alt: Implementing GANs example image
---
In this tutorial, we will learn how to use OpenCV to detect the frontal face of an object, find the object's distance in relation to the camera, then calculate the speed. 
<!-- more -->
>Note that we will use the laptop webcam as our tool.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Referral face object image](#referral-face-object-image)
- [Distance and speed approximation using the frontal face object](#distance-and-speed-approximation-using-the-frontal-face-object)
- [Getting started](#getting-started)
- [Installations of external libraries](#installations-of-external-libraries)
- [Detection of the frontal face](#detection-of-the-frontal-face)
- [Determining the distance](#determining-the-distance)
  - [Case 1: Finding the focal length](#case-1-finding-the-focal-length)
  - [Case 2: Finding the distance](#case-2-finding-the-distance)
  - [Case 3: Reading reference images from the directory](#case-3-reading-reference-images-from-the-directory)
- [Determining the speed](#determining-the-speed)
  - [Case 1: Finding the speed](#case-1-finding-the-speed)
  - [Case 2: Finding average speed](#case-2-finding-average-speed)
  - [Case 3: Calling of the pre-defined functions](#case-3-calling-of-the-pre-defined-functions)
- [Conclusion](#conclusion)


### Prerequisites
1. You need to be conversant with Python as a programming language. To get started with Python basics, refer to this tutorial [link below on Python](/engineering-education/a-beginners-guide-to-python/).
2. You need to have `Pycharm` pre-installed since it will be our IDE working environment.

### Referral face object image
This image shows how a frame of the frontal face is detected, and we will use it as our reference image later in the program.

![ref-image](/engineering-education/approximating-the-speed-of-an-object-and-its-distance/ref-image.png)

We will also use the `haarcascade_frontalface_default.xml` module to detect our face object. To get this module from Github, use [this link](https://gist.github.com/Learko/8f51e58ac0813cb695f3733926c77f52).

### Distance and speed approximation using the frontal face object
### Getting started 
Start your *Pycharm IDE* to create a new project.
*As shown in the image below.*

![startup](/engineering-education/approximating-the-speed-of-an-object-and-its-distance/startup.png)

We will name our project `DistanceVelocity` on the open menu. We then select our base interpreter to python3.10 latest. You can use any version of the Python base interpreter as well. After making the suitable selections, we click on the create button to launch our project.

### Installations of external libraries
The external library we will use in this section is OpenCV. In your working environment, there are different buttons in this window. Click on the terminal button to open the terminal interface. We will download and install our OpenCV from here. Copy the command below and paste it to the terminal for a successful installation.

````bash
  pip install OpenCV-Python
````

**OpenCV** is a powerful tool for aiding computer vision functions and related problems. It is also used in the processing of images and real-time videos. 

### Detection of the frontal face
We will have to use the `haarcascade_frontalface_default.xml` to detect the frontal face. Then, save it in the exact location of the main program. Next, we will work with our webcam, which by default is `0` during the calling function. Of course, `1` can also be used when dealing with an external camera, but we will use the default value for our case. 

Then we will create a function for returning the detected face object coordinates of the rectangular frame. We then convert the RGB image into a gray-scale. It requires an image parameter for scaling up or down the image for better output. 

High CPU processing power is required for this to be achieved. So we prefer to use the standard values. Let's dive into the coding section for a better understanding.  

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
To get the distance, we will have to create more functions. The first function to be created is the focal length finder.
 
#### Case 1: Finding the focal length
The defined function will calculate the focal length thus getting the distance between the lens and the CMOS sensor.

- 1st parameter to be used is `Determined_Distance(int)`: It is the distance measured from the object to the Camera while Capturing a Reference image.  
- 2nd parameter to be used is `Actual_Width(int)`: This is the real width of the object, in the real world, for instance, my face width is = 14.3 centimeters).  
- 3rd parameter to be used is `Width_In_Image(int)`: This is the object width in the frame/image in our case in the reference image (found by Face detector)  
Returning as decimal values.

Below is the function code.
```python
def focal_length(determined_distance, actual_width, width_in_rf_image):  
    focal_length_value = (width_in_rf_image * determined_distance) / actual_width  
    return focal_length_value
```

#### Case 2: Finding the distance 
This is the second function to be created, the distance finder function. This function approximates the distance between the face object and camera using defined arguments.

- 1st parameter to be used is `focal_length(float)`: Returned by the focal_length_Finder function.  
- 2nd parameter to be used is `Actual_Width(int)`: It is the real width of the object. For example, my face is approximately 14cm in the real world. 
- 3rd parameter to be used is `object_Width_Frame(int)`: The broadness of object in the image (frame in our case, returning Video visual feed). Returning Distance as decimal values `Distance(float)`: distance Estimated.

```python
def distance_finder(focal_length, real_face_width, face_width_in_frame):  
    distance = (real_face_width * focal_length) / face_width_in_frame  
    return distance
```

#### Case 3: Reading reference images from the directory
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

### Determining the speed
To find the speed, we will first have to import the time module since speed is the distance in relation to the time taken. Then we will initialize time-related variables. 

Below is the code snippet as an example.

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

#### Case 1: Finding the speed
This function takes the covered distance and time taken as parameters and returns the speed.

```python 
def speedFinder(covered distance, timeTaken):  
  
    speed = coveredDistance / timeTaken  
  
    return speed
```

#### Case 2: Finding average speed
We will start by finding the length of the list. Followed by calculating the number of items to find its average. Get the list of most recent items of the list to find the average of the selected items in the list. Then we return the average.

```python
def averageFinder(completeList, averageOfItems):  
    lengthOfList = len(completeList)  
    selectedItems = lengthOfList - averageOfItems  
    selectedItemsList = completeList[selectedItems:]  
    average = sum(selectedItemsList) / len(selectedItemsList)  
  
    return average
```

#### Case 3: Calling of the pre-defined functions
Below is the code demonstrating the function calls.

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

![output](/engineering-education/approximating-the-speed-of-an-object-and-its-distance/speed.gif)

### Conclusion
In this tutorial, we have covered the three most crucial areas.
- Detection of the frontal face.
- Estimation of a (face) object distance by using a webcam.
- Approximation of a (face) object speed by using a webcam.

You are now equipped to carry on with all that content in place.
Have a fun coding session.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
