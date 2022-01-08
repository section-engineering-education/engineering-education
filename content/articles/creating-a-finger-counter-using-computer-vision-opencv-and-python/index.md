### Creating a finger counter using computer vision, opencv, and python
When it comes to coding, the best way of learning is by working on fun but challenging projects. The challenging part makes us research the concepts we are dealing with more in-depth. The fun part makes us keep working on the project when the code is throwing errors. Every programmer has had a time during their coding experience when the code is throwing errors but can't identify what is causing this. They nevertheless keep working on the code and research what is causing the errors to occur. Most of the time this is because they would love to see the output of the projects they are working on. 

This is why for this article, we will be working on a fun but relatively challenging project. We will look at how to create a finger counter using computer vision, opencv and python. 

### Introduction
Python has libraries that will help us develop our project. We will be needing opencv and mediapipe. We will later look at why and how we will be using these two libraries. We will also need an IDE to work with python. We will use **pycharm community edition** as it is freely available on the internet.

In this tutorial, we will learn how hand tracking is done using python with the help of mediapipe library. We will also learn to implement computer vision in our project using opencv. We will finally learn how to combine mediapipe, opencv and python to create a program that will count the number of fingers in an input image. A person using windows or Linux can follow through.

### Table of contents
- [Prerequisites](#prerequisites)
- [Understanding the hand landmark model](#understanding-the-hand-landmark-model)
- [ Creating a finger counter program using computer vision, opencv, and python](#creating-a-finger-counter-program-using-computer-vision-opencv-and-python)
- [Results](#results)
- [Conclusion](#conclusion)

### Prerequisites
To understand this article, a person needs to:
- Be familiar with the python programming language.
- Have pycharm installed on their computer. If you don't have it installed, you can download it from here. [Pycharm Community Edition](https://www.jetbrains.com/pycharm/download/).

### Understanding the hand landmark model

![Hand landmark model](/engineering-education/creating-a-finger-counter-using-computer-vision-opencv-and-python/model.png)

*[Image Source: Mediapipe](https://google.github.io/mediapipe/images/mobile/hand_landmarks.png)*

The above diagram shows a hand landmark model that shows how mediapipe can track hands. For us, we are interested in hand-knuckles. The diagram shows numbers from 0 to 20 displayed over the knuckles. We will be using the position of these knuckles to determine whether a finger is open or closed. Let's take a look at the logic we will be using. If knuckle number 8 is above knuckle number 6 then the finger is open. If it is below knuckle number 6 then the finger is closed. This will apply to all fingers except the thumb. For the thumb we will check whether knuckle number `4` is above knuckle number `2`. If this is the case then the thumb is open else the thumb is closed.

### Creating a finger counter program using computer vision, opencv, and python
We first of all need to prepare our working environment in *Pycharm*. Open the pycharm app and click on create a new project on the window that appears. This will be as shown in the screenshot below. 

![Project](/engineering-education/creating-a-finger-counter-using-computer-vision-opencv-and-python/project.png)

After clicking on create a new project, a new window will appear. Click on the create button. Now that we have Pycharm ready, we need to install the python libraries we will need in our project.

### Installing the python libraries we need for our project
Click on the terminal as shown in the screenshot below then follow the steps below it.

![Terminal](/engineering-education/creating-a-finger-counter-using-computer-vision-opencv-and-python/terminal.png)

To install `mediapipe`, use the following command:
```bash
pip install mediapipe
```
This library was developed by Google. We will be using it for hand tracking and finger tracking. In case you want to read more about it you can find its documentation [here](https://google.github.io/mediapipe/solutions/hands.html).

To install `cv2` use the command that follows.
```bash
 pip install opencv-python
```
We will use the library above to take our input through the webcam. It will also help us process the captured image to `RGB` format.

### Coding
After installing the libraries above we are now ready to start coding. We will write our code on the `main.py` file that pycharm automatically creates for us.
### Step 1: Importing the libraries we will need
We will start by importing the libraries we discussed into our project. This will enable to us use their dependencies in our code. To do so, use the code below.
```python
import cv2
import mediapipe as mp
```
### Step 2: Declaring the `mediapipe` objects and the finger and the thumb coordinates 
We will then capture an image using our webcam and declare the `mediapipe` objects that we will need. We will also declare the finger and thumb coordinates that we will need to determine whether a finger is open or closed. Use the code below to achieve this.

```python
cap = cv2.VideoCapture(0)
mp_Hands = mp.solutions.hands
hands = mp_Hands.Hands()
mpDraw = mp.solutions.drawing_utils
finger_Coord = [(8, 6), (12, 10), (16, 14), (20, 18)]
thumb_Coord = (4,2)
```
**note**:
We will use `mp_Hands` to detect the hands in our input image, `hands` to process the detected hands, and `mpDraw` to draw the hand connections and landmarks present in the hands.

### Step 3: Converting the input image to `RGB` image
We will now check whether there is an input image using the code below. If it is successful and the image does exist, we will first of all convert it to `RGB`. We will then process the `RGB` image
using the `hands` module to locate the hands and identify all the landmarks present in it. This is shown below:
```python
while True:
    success, image = cap.read()
    RGB_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(RGB_image)
    multiLandMarks = results.multi_hand_landmarks
```
### Step 4: Drawing the landmarks present in the hand
We have so far identified the landmarks present on the hands but we have not drawn the identified landmarks. The code below will help ensure that the hand landmarks do exist using the `if` statement. We will then create a nested `for` loop to enable us to work on one hand at a time and draw the hand landmarks present on each hand. The empty list that is created will be used later in the code.
```python

    if multiLandMarks:
        handList = []
        for handLms in multiLandMarks:
            mpDraw.draw_landmarks(image, handLms, mp_Hands.HAND_CONNECTIONS)
            for idx, lm in enumerate(handLms.landmark):
  ```
  ### Step 5: Changing the hand points coordinates into image pixels
  Working with the actual coordinates is challenging. We will therefore change them into pixels. We will, first of all, use the `image.shape` function to get the height, width, and color channel of the image. We will then get the `x` and `y` coordinates of each hand point in form of pixels. We will then save these hand points in the list we previously created. The code below will implement this.
  ```python              
                h, w, c = image.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                handList.append((cx, cy))
```
### Step 6: Circling the hand points
We will now circle each hand point we have identified. This is to ensure that we are getting the correct hand points. We use the code below to achieve this.
```python
        for point in handList:
            cv2.circle(image, point, 10, (255, 255, 0), cv2.FILLED)
```
### Step 7: Checking whether a finger is open or closed
We will now use the logic we discussed [here](#understanding-the-hand-landmark-model) to determine whether a finger is open or closed. We will be iterating on each finger using a `for` loop.
```python
        upCount = 0
        for coordinate in finger_Coord:
            if handList[coordinate[0]][1] < handList[coordinate[1]][1]:
                upCount += 1
        if handList[thumb_Coord[0]][0] > handList[thumb_Coord[1]][0]:
            upCount += 1
```
### Step 8: Displaying our output
The final step involves us displaying the output. We will display the number of open fingers using the value of the `upcount`. This is because it is only incremented when a finger is open. We will also output a real-time video that shows the user opening and closing their fingers. Use the code below to achieve this.
```python
        cv2.putText(image, str(upCount), (150,150), cv2.FONT_HERSHEY_PLAIN, 12, (0,255,0), 12)

    cv2.imshow("Counting number of fingers", image)
    cv2.waitKey(1)
```
### Results
When the code we have explained above has run to completion, without any errors, the output will be as shown below.

![Results](/engineering-education/creating-a-finger-counter-using-computer-vision-opencv-and-python/results.gif)

### Conclusion
We have finally come to the end of this tutorial. You are now exposed to the concepts and skills needed to create a finger counting software. Now watch as the program recognizes and displays the number of fingers you show to it through the webcam.

Happy coding !



