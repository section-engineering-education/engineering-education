## Spotting of Passing Objects Using Python
### Introduction
Spotting of moving objects has become crucial in our lives today. Talking of security, cameras help us a great deal in executing this  
function. Other key areas cut across tracking of living organisms,  vehicles in traffic control, and also replaceable where radar is discouraged.  
We will be spotting objects in motion in this tutorial.  
We will be requiring a few tools before carrying on, that is, the laptop's webcam and most of all an external library to be installed and downloaded which is the OpenCV module. With those at hand, we will be able to tackle our project. Let's  dive in.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Creation of the spotting of passing objects](#creation-of-the-spotting-of-passing-objects)
- [Results](#results)
- [Conclusion](#conclusion) 



### Prerequisites
1. You should be an average-level programmer with basic coding skills in python.
2. A brief overview of and prior knowledge to be equipped with before proceeding will be of great benefit. Following is the link directing you. [How to Adjust Image to Higher or Lower Resolution using Python](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/)

## Creation of the spotting of passing objects
### Downloading and installing of external libraries
### Step I:		
First and foremost, we have to get **OpenCV** in place to be able to manipulate and work with our webcam. Also being a component used in the processing of pictures and live videos  giving solutions to computer vision rising issues.
In your working environment, open the terminal and paste the command below to have the OpenCV downloaded and installed simultaneously.
```bash
 pip install OpenCV-Python
```
This library allows for modules such as cv2 to be called and used since cv2 will be playing a key role in our application.

 ### Step II:
 The second library to download and install will be **numpy**. Having interacted already with OpenCV and known its functions,  it takes the place of an image. So the numpy comes in since it is used in the expression of multi-dimensional arrays. For our case, our representation of the arrays will be the pixels. Likewise, as we had performed for the previous command, we will also be carrying it out same for numpy.
 ```bash
 pip install numpy
 ```
 ### Step III:
 Lastly, we are going to install  **imutils** which is useful in  rotating, resizing, and skeletonizing images alongside OpenCV.
 As you have been following, let's repeat the procedure in the above commands.
 ```bash
  pip install imutils
 ```
After successful installations, we will now jump into the code area.
### Case 1:Importing the external libraries.
As we had discussed earlier the functions of these libraries, we will be now importing them for use in our program.
```python
import cv2  
import numpy as np  
import datetime  
import imutils
```
Datetime module is called, as it will be used for returning the live or real-time time and date in our footage.

### Case 2:Variables initialization
This is achieved by setting a variable equal to a given value, thus the variable is created. So in our case, we will be able to use the variables just by calling them.
```python
rec=cv2.VideoCapture(0)  
sto, mapping1=rec.read()  
sto, mapping2=rec.read()
```
In the function VideoCapture, we use `0` since it is the default value for the webcam.
### Case 3:Detection and conversion of the frame to grayscale
Video is a series of continuous images with the difference in time. Likewise, it's a slide show of images. So we will have to initially identify and recognize the frames then have them processed. The frame is converted to grayscale to increase the accuracy of key features detection, eliminating possible misses.
Since python language is feature sensitive, take care of your indentations.  
```python
while rec.isOpened():  
    sub=cv2.absdiff(mapping1, mapping2)  
    convclr=cv2.cvtColor(sub, cv2.COLOR_BGR2GRAY)  
    blur=cv2.GaussianBlur(convclr, (3, 3), 1)  
    _, thresh=cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)  
    enlarged=cv2.dilate(thresh, None, iterations=1)  
    contours, _=cv2.findContours(enlarged, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
```
### Case 4:Blurring the frame
Calling from cv2, we have a module responsible for performing blurring. The Gaussian blur. It smoothens and average pixel intensity across pixel height against its width, thus filtering high-intensity noise. Let's see how to implement it below.
```python
	if mapping1 is None:  
	    break  
    
	mapping1 = imutils.resize(mapping1, width=700)  
	convclr1 = cv2.cvtColor(mapping1, cv2.COLOR_BGR2GRAY)  
	convclr2 = cv2.GaussianBlur(convclr1,(21, 21), 0)
```
Using `imutils` we can resize our frame to the desired size.

### Case 5:Finding the difference of the delta frames
Since we stored the first frame in mapping1, we will be able to compute the difference using the later frames stored in mapping2.
```bash
	if mapping1 is None:  
	    mapping1=convclr2  
	    continue  

	frameDelta = cv2.absdiff(convclr2, convclr1)  
	thresh = cv2.threshold(frameDelta, 25, 255, cv2.THRESH_BINARY)[1]
```
### Case 6: Enlarging the images in the footage.
To enlarge the images, we call a dilate function from cv2. This function fills in the holes and finds contours on the margin image.
```python
	thresh = cv2.dilate(thresh, None, iterations=2)  
	count = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  
	count = imutils.grab_contours(count)
```
### Case 7:Formatting the text and time layout to be displayed.
To be able to write text on our footage, you will have to call a cv2 function `putText`. It defines the font, color, size, depth ,and family of the text. Similarly for time. To use current or real-time time, here is where we call our datetime module to give us access to date and real-time.
```python
	for count in contours:  
	    (x, y, w, h)=cv2.boundingRect(count)  
	    if cv2.contourArea(count)<700:  
	        continue  
		cv2.rectangle(mapping1, (x, y), (x + w, y + h), (0, 0, 255), 2)  
	    cv2.putText(mapping1, "REPORT: {}".format('PASSING OBJECT DETECTED'), (5, 30), cv2.FONT_HERSHEY_DUPLEX, 1, (255, 0, 0), 4)  
	    cv2.putText(mapping1, datetime.datetime.now().strftime("%A %d %B %Y %I:%M:%S%p"), (10, mapping1.shape[0]-10),cv2.FONT_HERSHEY_DUPLEX, 0.9, (0, 255, 0), 3)
```
### Case 8:Displaying the images and footage
The cv2 function `imshow` allows for displaying and returning the called images or video feeds, stored in the earlier instantiated values. 
```python
	cv2.imshow("FOOTAGE", mapping1)  
	cv2.imshow("MARGIN", thresh)  
	cv2.imshow("DIFFERENCE OF DELTA FRAMES", frameDelta)  
  
	mapping1=mapping2  
	sto, mapping2=rec.read()
```
### Case 9:Wrapping it up
After completing the task of the program, we will need to have a key for recording the key being pressed, such that when it's pressed, it terminates our program. And after so, we clean our webcam and release any resources in use. Lastly destruction of all windows constructed by OpenCV itself.
```python
    if cv2.waitKey(50)==50:  
        break  
  
cv2.destroyAllWindows()
```
That is it for our coding session. 
### Results
Below are the expected output and outcome for our program.
Output for MARGIN:
![margin](/engineering-education/spotting-of-passing-objects-using-python/margin.png)

Output for DIFFERENCE OF DELTA FRAMES:
![framedelta](/engineering-education/spotting-of-passing-objects-using-python/framedelta.png)

Output for FOOTAGE:
![footage](/engineering-education/spotting-of-passing-objects-using-python/footage.gif)

### Conclusion
In this tutorial, we have covered necessary content equipping us with spotting passing objects using OpenCV and other important related tools. Key areas covered in our discussion are:

 - Installation of external libraries
 -  Detection of the contours of the object.
 -  The blurring effect.
 - Computing the frame deltas.
 - Formatting the text and time layout to be displayed.
 - Returning the spotted passing object as the main objective.
 
Have it blast enjoying spotting passing objects with your program. 












