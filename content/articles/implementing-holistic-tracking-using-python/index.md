---
layout: engineering-education
status: publish
published: true
url: /implementing-holistic-tracking-using-python/
title: Implementing Holistic Tracking using Python
description: This tutorial will show the reader how to build a full-body pose estimation using MediaPipe holistic.
author: sharon-kinyan
date: 2022-01-12T00:00:00-11:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-holistic-tracking-using-python/hero.png
    alt: full-body pose estimation example image
---
This tutorial will discuss full-body pose estimation using MediaPipe holistic. The model will detect all the facial landmarks within the face, hands, and poses from our body.
<!--more-->
The [MediaPipe](https://google.github.io/mediapipe/) library provides a wide range of ML solution models. We will use [MediaPipe Holistic](https://google.github.io/mediapipe/solutions/holistic) model for this tutorial.

The MediaPipe holistic model comprises of three different models:
- [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose.html).
- [MediaPipe Face Mesh](https://google.github.io/mediapipe/solutions/face_mesh.html).
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html).

`MediaPipe Face Mesh` detects the facial landmarks on the face, `MediaPipe Hands` detects all the joints within our hands, and the `MediaPipe Pose` model detects all the poses within the body.

### Prerequisites
To follow through with this tutorial, you need to:
- Be familiar with machine learning modeling.
- Be familiar with the individual face landmark and hand detection models.
- Use either Google Colab or Jupyter Notebook.
> For this tutorial, we will be using Google Colab.

### Table of contents
- [Goal](#goal)
- [Introduction](#introduction)
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Setting up MediaPipe](#setting-up-mediapipe)
- [Loading up an image using OpenCV](#loading-up-an-image-using-opencv)
- [Detecting landmarks](#detecting-landmarks)
- [Wrapping up](#wrapping-up)

### Goal
- Setting up the MediaPipe library.
- Detect poses, facial landmarks, and dual hand poses.
- Visualize detections on the screen.

### Installing and importing dependencies
There are two key dependencies that we will need for this tutorial:
- [MediaPipe](https://google.github.io/mediapipe/).
- [OpenCV](https://opencv.org/).

MediaPipe is used to access the model, while OpenCV is used to access the webcam or still images for detection.

Let's install them.

```bash
!pip install mediapipe opencv-python
```

Next, we need to import them into our notebook.

```python
import mediapipe as mp
import cv2
```
### Setting up MediaPipe
We begin by importing the MediaPipe drawing utility. It will help us draw the detections from the holistic model.

```python
mp_drawing = mp.solutions.drawing_utils
```
Next, import the holistic model from MediaPipe. Remember, the MediaPipe library consists of many ML solutions. To check these models using code, type in `mp.solutions.` on a new cell, and you'll be able to see the available models within the library.

We need to import the holistic model.

```python
mp_holistic = mp.solutions.holistic
```
### Loading up an image using OpenCV

```python
from google.colab.patches import cv2_imshow

image = cv2.imread("workout.jpg")
cv2_imshow(image)
```
After running the command, you should see the following:

![Loaded image](/engineering-education/implementing-holistic-tracking-using-python/workout.jpg)

*[Image source: Unsplash](https://unsplash.com/photos/n6gnCa77Urc)*

If you want to use the same image for reproducibility, you can find it [here](https://unsplash.com/photos/n6gnCa77Urc).

The next step involves taking the loaded image and performing detections on it.

### Detecting landmarks
We begin by initializing the holistic model by using the `with` segment.

```python
with mp_holistic.Holistic(
    static_image_mode=True, model_complexity=2, enable_segmentation=True, refine_face_landmarks=True) as holistic:
```
The `static_image_mode` is set to `True` to detect still images. When set to `False`, it detects the input image as a video stream.

The `enable_segmentation` feature is set to `True` to allow for the segmentation mask to be generated. The `refine_face_landmarks` is set to `True` to allow the detected areas around the lips and eyes to be refined further.

Using the `imread()` method, we load the `workout.jpg` image.

```python
image = cv2.imread("workout.jpg")
```
The next step involves recoloring our image. We use the `cvtColor` function for this task.

When we use OpenCV, we get the image format in `BGR`, but when we pass the image to the holistic model, we want the image to be in `RGB`. It is the only image format accepted in MediaPipe. Hence, the conversion.

```python
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image_recolored = holistic.process(image)
```
Let's begin by drawing the facial landmarks.

```python
 mp_drawing.draw_landmarks(image, image_recolored.face_landmarks, mp_holistic.FACE_CONNECTIONS)
```
Let's apply the same thing for the hands and pose landmarks.

For the pose landmarks, write the following code:

```python
mp_drawing.draw_landmarks(image, image_recolored.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
```

For the left-hand landmark:

```python
mp_drawing.draw_landmarks(image, image_recolored.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
```

For the right-hand landmark:

```python
mp_drawing.draw_landmarks(image, image_recolored.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
```

### Visualizing the detections
Use OpenCV's `imshow()` method to visualize our connections.

```python
cv2_imshow(image)
```
Output:

![Output image](/engineering-education/implementing-holistic-tracking-using-python/output.png)

We have successfully implemented a holistic model using Python. You can take this experiment a bit further and try using the model on real-time video data using your computer webcam.

Additionally, you can change the color, thickness, and circle radius using the `landmark_drawing_spec` and the `connection_drawing_spec` features.

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1E6mgVlRgYTpPRwgVf85nTznw065gR-H-?usp=sharing).

### Wrapping up
This tutorial has demonstrated how to implement a full-body pose estimation using MediaPipe holistic. This model can be used to detect different forms of body language, such as if one is happy, sad, or angry.

In addition, you could use it to build a touchless gesture control, or a workout counter, i.e., taking count of how many press-ups you do or counting the number of biceps you've done. The use cases are endless.

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
