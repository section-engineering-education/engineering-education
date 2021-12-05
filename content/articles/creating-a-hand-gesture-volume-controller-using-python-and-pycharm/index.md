### **Creating A Hand Gesture Volume Controller Using Python And Pycharm**
In the times we are living in, computers are everywhere. Whether it is in your place of work while listening to a presentation, your home while listening to your favorite music, or in entertainment places where DJs use them. They help us simplify some of our day-to-day activities. The problem is water, dust, and other things such as food spilling over them easily damage them. 

At this point, a hand gesture volume controller would come in handy. You don't have to be concerned about the state of your hands. You just have to use your fingers and adjust the computer's volume to your level of satisfaction.

### Introduction
**Python** has libraries that will help us create our hand gesture volume controller. **Pycharm** is the IDE that we will use to run our python code. We will be using the **Pycharm** community version IDE. It is free to download and use from the internet. 

In this tutorial, we will discuss the use of the python libraries we will need, how to use python to track hand gestures, and finally how to create a hand gesture volume controller using Python and Pycharm. A person using Windows, Linux, or Mac OS can follow through.

### Table of contents
- [Prerequisites](#prerequisites)
- [Python libraries we will need](#python-libraries-we-will-need)
- [Referral hand image](#referral-hand-image)
- [Creating a hand gesture volume controller](#creating-a-hand-gesture-volume-controller)
- [Results](#results)
- [Conclusion](#Conclusion)

### Prerequisites
For you to follow through this article you need to:
- Be familiar with the Python programming language.
- Have **Pycharm** installed on their computer. If this is not the case, download it from here. [Pycharm Community Edition ](https://www.jetbrains.com/pycharm/download/)

### Python libraries we will need
The libraries that we will be interacting with while creating our hand gesture volume controller will be the following:
- *numpy* This library will help us work with arrays.
- *cv2* We will use this library to capture an image using the webcam and convert the image to RGB.
- *mediapipe* This is an open-source library developed by Google. It is used for both face and gesture recognition. For the matter of this tutorial, we will use it for hand gesture recognition.
- *math* We will use this library to find the distance between point number 4 (the thumb) and point number 8 (the index finger) using hypotenuse.
- *ctypes* and *comtypes* These two libraries are depended upon by pycaw. Ctypes to provide C language compatible data types. Comtypes bases on the ctypes FFI(Foreign Function Interface) library.
- *pycaw* We will need this library to access the device's speaker and its master volume.
### Referral hand image
![hand](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/hand.jpg)


*[Image Source: Aniketiq](https://www.bing.com/images/search?view=detailV2&ccid=A16aeeUy&id=2B00C1DE13C6EFD132E8FCABF5CF0A11695E1FCA&thid=OIP.A16aeeUyQVRHqGt_rphzJQHaCl&mediaurl=https%3a%2f%2fcdn.hashnode.com%2fres%2fhashnode%2fimage%2fupload%2fv1629398588657%2fboG68w85n.png%3fauto%3dcompress%2cformat%26format%3dwebp&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.035e9a79e532415447a86b7fae987325%3frik%3dyh9eaREKz%252fWr%252fA%26pid%3dImgRaw%26r%3d0&exph=538&expw=1543&q=mediapipe+hand+tracking+points&simid=607990468186358942&FORM=IRPRST&ck=C941CC346294E5FC99172E9ED31C9E5B&selectedIndex=4)*

The above image shows the numbers of the points that mediapipe uses to refer to different points of the hand.
### Creating a hand gesture volume controller
First of all, we will prepare our workspace. Launch the pycharm app. Click on the create a new project. This is shown in the screenshot provided below.

![Pycharm](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/pycharm.png)

Click on the create button on the window that appears next.

We now need to install the libraries we did discuss above in our project. To do so, follow the following steps. To install numpy, open the terminal and type the following command. 
```bash
pip install numpy
```

![Terminal](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/terminal.png)

The above screenshot shows where to type the command for numpy installation.

Wait for a few seconds till numpy is installed successfully. We are going to repeat the same steps for the other libraries. We will only replace the command part. Use the following commands for the respective libraries.
```bash
 pip install opencv-python

```

 ```bash
pip install mediapipe

 ```
 ```bash
pip install pycaw
 ```
 ```bash
pip install python-math
 ```
 ```bash
 pip install comtypes
 ```
 ```bash
 pip install ctypes
 ```

Now let us jump into coding. This is where the most fun is as we get hands-on.

```python
import cv2
import mediapipe as mp
from math import hypot
from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
import numpy as np

cap = cv2.VideoCapture(0)  # Getting video input from our primary camera.
# Detecting, initializing and configuring the hands.
mpHands = mp.solutions.hands
hands = mpHands.Hands()
mpDraw = mp.solutions.drawing_utils
# Accessing the speaker through pycaw.
devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(interface, POINTER(IAudioEndpointVolume))

volMin, volMax = volume.GetVolumeRange()[:2]

while True:
    success, img = cap.read()  # if the camera we have specified works, we will capture an image.
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # converting the image the camera captures to RGB Image.
    results = hands.process(imgRGB)  # completes the processing of the converted image.

    lmList = []  # creating an empty list.
    if results.multi_hand_landmarks:  # A list of all the detected hands.
        #  Creating a loop so we can the list above so as to get the corresponding flag bit of each hand.
        for handlandmark in results.multi_hand_landmarks:
            for id, lm in enumerate(handlandmark.landmark):  # We are adding a counter and then returning it.
                # Finding the finger joints of the hand
                h, w, _ = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                lmList.append([id, cx, cy])  # Adding to the empty list we created "lmlist".
            mpDraw.draw_landmarks(img, handlandmark, mpHands.HAND_CONNECTIONS)  # We draw all the landmarks in the frame

    if lmList != []:
        x1, y1 = lmList[4][1], lmList[4][2]  # specifying point 4 of the thumb. Refer to the hand image we discussed.
        x2, y2 = lmList[8][1], lmList[8][2]  # specifying point 8 of the index finger. Refer to the hand image we
                                             # discussed.
        # We now create a circle around the thumb and the index finger.
        cv2.circle(img, (x1, y1), 4, (255, 0, 0), cv2.FILLED)  # circle around the thumb.
        cv2.circle(img, (x2, y2), 4, (255, 0, 0), cv2.FILLED)  # circle around the index finger.
        cv2.line(img, (x1, y1), (x2, y2), (255, 0, 0), 3)  # Drawing a line between the index finger and the thumb.

        length = hypot(x2 - x1, y2 - y1)  # Finding distance between the tips of the thumb and index finger using
                                            # hypotenuse.
        vol = np.interp(length, [15, 220], [volMin, volMax])  # Hand range 15 - 220
        print(vol, length)
        volume.SetMasterVolumeLevel(vol, None)  # Setting the master volume in accordance to hand range.
                                                # Volume range -63.5 - 0.0

    cv2.imshow('Image', img)  # Showing the real time video which shows how the user is adjusting the volume using their
                                # hand gesture
    if cv2.waitKey(1) & 0xff == ord('q'):  # Terminate the program if the user does press letter q.
        break
```
### Results
When the code above has run to completion without any errors, the results will be as those shown in the screenshot below.

![Results](/engineering-education/creating-a-hand-gesture-volume-controller-using-python-and-pycharm/results.png)

### Conclusion 
You now have all the skills required to create a hand gesture volume controller. Do your work while listening to your favorite music. You don't have to worry about dirtying your hands. By just a gesture of your hand, you can control the volume level of your music. You

! Happy coding.
