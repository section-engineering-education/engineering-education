---
layout: engineering-education
status: publish
published: true
url: /handpose-detection-using-mediapipe-and-python/
title: MediaPipe HandPose Detection using Python
description: This tutorial will show the reader how to build a Handpose detector using MediaPipe and Python. The MediaPipe Hands model is a lightweight ML pipeline consisting of a palm detector and a hand-skeleton finger tracking model.
author: sharon-kinyan
date: 2021-11-27T00:00:00-19:10
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/handpose-detection-using-mediapipe-and-python/hero.png
    alt: handpose example image 
---
Handpose recognition is a deep learning technique that allows you to detect different points on your hand. These points on your hand are commonly referred to as landmarks. These landmarks consist of joints, tips, and bases of your fingers.
<!--more-->
[MediaPipe](https://google.github.io/mediapipe/solutions/hands) provides many customizable ML pre-trained models. The handpose model is one of their latest releases. With researchers aiming to democratize AI using such amazing pre-trained models, it is important that we can understand ML with only a few lines of code. 

This tutorial aims to show you how to build your very own Handpose detector using MediaPipe and Python. You'll be able to use your computer's webcam to track the joints in your hands. 

### Prerequistes
To follow along with this tutorial, you'll need to be familiar with:
- Machine learning modeling.
- Jupyter Notebook/Google Colab.

> We will be using Google Colab for this tutorial.

### Table of contents
- [The handpose model](#the-handpose-model)
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Detecting handposes using images captured by our webcam](#detecting-handposes-using-images-captured-by-our-webcam)
- [Output images using OpenCV](#output-images-using-opencv)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### The handpose model
The handpose model is provided by tensorflow.js and can detect 21 different distinct points in your hand. The MediaPipe Hands model is a lightweight ML pipeline consisting of a palm detector and a hand-skeleton finger tracking model. 

Initially, the palm detector detects the hand locations, and afterwards, hand-skeleton finger tracking model performs precise keypoint localization predicting 21, 3D hand key-points per detected hand.

Let's see how we can use this handpose model in a project.

### Installing and importing dependencies
We perform a quick pip install for two core dependencies; the MediaPipe and openCV Python libraries. MediaPipe is an open-sourced, cross-platform library that provides many ready-to-use ML solutions for solving computer vision problems. A few examples include ML solutions for [Face Detection](https://google.github.io/mediapipe/solutions/face_detection.html), [Selfie Segmentation](https://google.github.io/mediapipe/solutions/selfie_segmentation.html), [Hair Segmentation](https://google.github.io/mediapipe/solutions/hair_segmentation.html), and [Object Detection](https://google.github.io/mediapipe/solutions/object_detection.html). 
For this tutorial, we leverage the library to import the [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands) model in our project.

We will also be installing the OpenCV library. Like MediaPipe, OpenCV is a library that also helps in solving computer vision problems. In this tutorial, we will use the library to work with images and access our webcam in real-time easily.

```bash
!pip install mediapipe opencv-python
```

Next, we will import the necessary dependencies into our notebook.

```python
import mediapipe as mp
import cv2
import numpy as np
import uuid
import os
from google.colab.patches import cv2_imshow
```

We've imported five dependencies:
- `mediapipe` allows us to leverage the MediaPipe ML solution.
- `cv2` gives us OpenCV.
- `numpy` makes it easier to work with number outputs.
- `uuid` allows you to generate a uniform unique identifier.
- `os` allows us to work with files in our operating system.

We can now set up mediapipe. Let's bring in the mediapipe hands model and drawing utility to help us draw all the landmarks on our hands.

```python
mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands
```

Now that all that's done, let's set up our webcam using the standard OpenCV code. If you've worked with OpenCV before, the following block of code might seem familiar; if you're not familiar with it, please refer to their [documentation](https://opencv.org/). 

```python
img = cv2.imread('logo.png', cv2.IMREAD_UNCHANGED)
cv2_imshow(img)
```

Accessing your webcam using OpenCV in Google Colab isn't very straightforward as you're not using your local runtime, but rather, a Google Colab runtime. 

To utilize your local machine's webcam within the virtual machine, you can copy-paste the following JavaScript code into your colab:

```js
from IPython.display import display, Javascript
from google.colab.output import eval_js
from base64 import b64decode

def take_photo(filename='photo.jpg', quality=0.8):
  js = Javascript('''
    async function takePhoto(quality) {
      const div = document.createElement('div');
      const capture = document.createElement('button');
      capture.textContent = 'Capture';
      div.appendChild(capture);

      const video = document.createElement('video');
      video.style.display = 'block';
      const stream = await navigator.mediaDevices.getUserMedia({video: true});

      document.body.appendChild(div);
      div.appendChild(video);
      video.srcObject = stream;
      await video.play();

      // Resize the output to fit the video element.
      google.colab.output.setIframeHeight(document.documentElement.scrollHeight, true);

      // Wait for Capture to be clicked.
      await new Promise((resolve) => capture.onclick = resolve);

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      stream.getVideoTracks()[0].stop();
      div.remove();
      return canvas.toDataURL('image/jpeg', quality);
    }
    ''')
  display(js)
  data = eval_js('takePhoto({})'.format(quality))
  binary = b64decode(data.split(',')[1])
  with open(filename, 'wb') as f:
    f.write(binary)
  return filename
```

This code is pre-built by Google's team to help make it easier for developers to access their webcam. You can easily access it [here](https://colab.research.google.com/notebooks/snippets/advanced_outputs.ipynb#scrollTo=iU_0F2SVW4Yb).

In addition, also copy-paste the code below. Running this code will open your computer's webcam. Once it has launched, you can capture a image of yourself. Remember to capture your image with one of your hand(s) as this model is aimed at capturing handposes. You won't see any results if you don't capture your hands. This image will be saved as `photo.jpg`.

```bash
from IPython.display import Image
try:
  filename = take_photo()
  print('Saved to {}'.format(filename))
  
  # Show the image which was just taken.
  display(Image(filename))
except Exception as err:
  # Errors will be thrown if the user does not have a webcam or if they do not
  # grant the page permission to access it.
  print(str(err))
```

Let's now overlay the mediapipe hands model on top of the standard OpenCV code. We will take the feed from our webcam, pass it to mediapipe, make detections, and render the results to the image. So, we'll not only get the webcam feedback, but a webcam feed with all those detections applied onto it.

### Detecting handposes using images captured by our webcam
In the captured image where we put our hand up to the webcam, we should see all the joints within our hands detected.

```python
cap = cv2.imread('photo.jpg', cv2.IMREAD_UNCHANGED)

with mp_hands.Hands(min_detection_confidence=0.8, min_tracking_confidence=0.5) as hands: #You can pass `max_num_hands` argument here as well if you want to detect more that one hand
        
        image = cv2.cvtColor(cap, cv2.COLOR_BGR2RGB)
        
        image.flags.writeable = False
        
        results = hands.process(image)
        
        image.flags.writeable = True
        
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
       
        print(results)
        
        # Rendering results
        if results.multi_hand_landmarks:
            for num, hand in enumerate(results.multi_hand_landmarks):
                mp_drawing.draw_landmarks(image, hand, mp_hands.HAND_CONNECTIONS, 
                                         )
            
        cv2.imwrite(os.path.join('Output Images', '{}.jpg'.format(uuid.uuid1())), image)
        cv2_imshow(image)

cv2.destroyAllWindows()
```

We first instantiate our model using the following code `with mp_hands.Hands(min_detection_confidence=0.8, min_tracking_confidence=0.5) as hands`. We pass in two keyword arguments, the `min_detection_confidence`, setting the detection confidence to 80% and `min_tracking_confidence`, setting the tracking confidence to 50%.

We then recolor our frame from `BGR` to `RGB` using OpenCV's `cvtColor` method. By default, OpenCV sets the format of image color to `BGR`. We need to set it to `RGB` as that's the format mediapipe accepts. We store this result in a variable called `image`.

We set our writeable flag, `image.flags.writeable` to be `false` initially to avoid then set it back to `true` after we've performed the detection. The code `hands.process(image)` goes ahead and makes our detection and stores it in a variable known as `results`.

The next step involves using the `cvtColor` method. We set the color of our image back to `BGR` from `RGB` and print our detection results. At this point, nothing has happened to our webcam image. If we type in `results.multi_hand_landmarks` on our terminal, we should see the handpose detection results. We need to render these detections onto our image.

The last bit of the code helps us render these results onto our image. If we have results in `multi_hand_landmarks`, render the image, if not, don't render. We then loop through each set of results and draw the landmarks. `mp_hands.HAND_CONNECTIONS` tells us the sets of relationships; which landmarks are connected to which ones allowing us to draw the connections. 

By default, mediapipe detects a maximum number of two hands. If by any chance you want to detect the hands of more than one person, you'll have to introduce an argument, `max_num_hands`, and indicate the number of hands you want to detect. It's set to two by default to reduce latency as there's no point in invoking another detection if there's no other hand to be detected.

That's it. If you run the webcam feed and show your hand, you should have landmark detections on your fingers.

### Output images using OpenCV
Finally, if you want to save the results from the detection, maybe for a research paper or for your personal use, you can do so by adding the following code:

```python
          cv2.imwrite(os.path.join('Output Images', '{}.jpg'.format(uuid.uuid1())), image)
```

The above line of code is going to save our image. The unique identifier, `format(uuid.uuid1()` generates unique names for our detected images to avoid naming conflicts when saving the images. 

Please find the code for this tutorial [here](https://colab.research.google.com/drive/1IwGAb35fnSuGQwX50mB6rtTapycSIK58?usp=sharing).

### Wrapping up
We began by installing and importing our dependencies, we made detections from our webcam and applied those detections to our webcam feed. The last step involved saving our outputs. You can go ahead and try it out yourself.

Happy coding!

### Further reading
- [MediaPipe HandPose](https://github.com/tensorflow/tfjs-models/tree/master/handpose)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
