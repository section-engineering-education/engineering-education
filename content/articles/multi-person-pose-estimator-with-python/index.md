---
layout: engineering-education
status: publish
published: true
url: /multi-person-pose-estimator-with-python/
title: Multi-Person Pose Estimation with Python
description: This tutorial will help readers understand how to carry out multi-person pose estimation with Python. We will use a technique known as Multi-Person Pose Estimation to predict human joint locations of people in an image frame.
author: willies-ogola
date: 2021-10-26T00:00:00-13:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/multi-person-pose-estimator-with-python/hero.png
    alt: Multiperson Pose Example Image
---
The Multi-Person Pose Estimation is a model designed for sports and exercise-based applications. The model can detect six people in an image or video simultaneously, and 17 key-point joints per person.
<!--more-->
This tutorial will use a technique known as Multi-Person Pose Estimation to predict human joint locations of people in an image frame. 

One of the most popular use cases is in [kinematics](https://en.wikipedia.org/wiki/Kinematics), which analyzes the body and all the different angles and joints within a body.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Loading the model from TF Hub](#loading-the-model-from-tf-hub)
- [Making detection using video or webcam](#making-detection-using-video-or-webcam)
- [Drawing keypoints and edges](#drawing-keypoints-and-edges)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Prerequisites
To understand this tutorial, you'll need to be familiar with:
- [Machine learning](/engineering-education/topic/machine-learning/).
- OpenCV library.
- Python programming language.
- Jupyter Notebook or Google Colab. To follow through, please use Google Colab.
- TensorFlow and [TensorFlow Hub](https://www.tensorflow.org/hub). TensorFlow Hub is a repository consisting of trained machine learning models which you can download and use in any of your projects.

> You'll need to download the `footballers.mp4` video file from this [Google drive](https://drive.google.com/file/d/1AMrHeQ-wmZEg1xe5bG47t-JA4HABTzid/view?usp=sharing) account and upload it into your Google Colab. I uploaded it on my Google Colab for this tutorial but it get's deleted after runtime. So, you'll need to download it and upload it yourself to avoid errors.  

### Introduction
[Multi-Person Pose Estimation](https://tfhub.dev/google/movenet/multipose/lightning/1) is one of Google's latest models built on top of their lightning model. It is an improvement from the [MoveNet.SinglePose](https://blog.tensorflow.org/2021/05/next-generation-pose-detection-with-movenet-and-tensorflowjs.html) model, which could only detect single poses. The model comprises three models. 

The backbone network is built using the [MobileNetV2](https://arxiv.org/pdf/1801.04381.pdf) network, the feature extraction layer is comprised of [Feature Pyramid Networks](https://arxiv.org/pdf/1612.03144.pdf), and the layer that outputs the key points is comprised of the [CenterNet](https://arxiv.org/pdf/1904.07850.pdf) model. 

The Multi-Person Pose Estimation is a model designed for sports and exercise-based applications. It is intended to be used between three to six feet from your camera or webcam. If you are working with distances more than six feet, this model might not be the most appropriate for you.

>The model can only detect six people in an image/video simultaneously, and 17 keypoint joints per person, i.e., nose, left eye, right eye, right ear, left ear, etc.

Some of the use cases for this model are:
- To determine the correctness of poses of yoga class members during a  yoga class.
- To establish which swimmers have the best swimming strokes and those who need improvements during swimming lessons.
- During supervision of a tennis lesson. The model would help analyze the people with correct and incorrect stroke positions.
- In medical contexts to identify abnormal poses in patients.

To use the Multi-Person Pose Estimation model, we will need to perform three processes:
1. Install TensorFlow and TensorFlow Hub.
2. Load the Multi-Person Movenet lightning model.
3. Make detection from videos.

Let's get started!

### Installing and importing dependencies

```bash
!pip install tensorflow==2.4.1 tensorflow-gpu==2.4.1 tensorflow-hub opencv-python matplotlib
```

```python
import tensorflow as tf
import tensorflow_hub as hub
import cv2
from matplotlib import pyplot as plt
import numpy as np
```

- `numpy` will be used to help draw the keypoints and edges
- `cv2` will allow us to leverage the OpenCV library for computer vision. In this tutorial, it will help us when using the webcam and running videos.
- `tensorflow_hub` will allow us to use the pre-trained Multi-Person Movenet model.

If you're using a GPU, consider limiting the memory growth of your GPU to avoid receiving *out-of-memory* errors. This restricts TensorFlow from using all the V-RAM on your machine.

```python
gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)
```

### Loading the model from TF Hub

```python
model = hub.load('https://tfhub.dev/google/movenet/multipose/lightning/1')
movenet = model.signatures['serving_default']
```

If you've read the model's [documentation](https://tfhub.dev/google/movenet/multipose/lightning/1), you'll realize that these two lines of code have been fetched directly from it.

The first variable, `model` is downloading the model, while the second variable, `movement` is setting up a new variable to go ahead and use that model.

### Making detection using video or webcam

```python
cap = cv2.VideoCapture(0)
while cap.isOpened():
        ret, frame = cap.read()

        cv2.imshow('Multi-Person Pose Estimation', frame)

        if cv2.waitKey(10) & 0xFF==ord('q'):
            break
cap.release()
cv2.destroyAllWindows()
```

The code above is a standard OpenCV code that we've used in previous OpenCV tutorials. If you're not familiar with it, you can read this [documentation](https://opencv.org/). 

The code establishes a connection to our webcam, reads the frames in our images/videos, and renders the frames on our screen. The last piece of code shows us how to exit our application when done.

>Note that the value `0` in `VideoCapture(0)` may change depending on the number of video devices you have. If `0` is not working, you can try and change this number.

We will pass our `frame` captured to the model to use the frames with our model. 

This is done as follows:

```python
from google.colab.patches import cv2_imshow

cap = cv2.VideoCapture('footballers.mp4')
while cap.isOpened():
    ret, frame = cap.read()
    
    # Resize image
    img = frame.copy()
    img = tf.image.resize_with_pad(tf.expand_dims(img, axis=0), 384,640)
    input_img = tf.cast(img, dtype=tf.int32)
    
    # Detection section
    results = movenet(input_img)
    keypoints_with_scores = results['output_0'].numpy()[:,:,:51].reshape((6,17,3))
    
    # Render keypoints 
    loop_through_people(frame, keypoints_with_scores, EDGES, 0.1) #0.1 is our confidence_threshold
    
    cv2_imshow(frame)
    
    if cv2.waitKey(10) & 0xFF==ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
```

On the documentation, to run the model inference on an input image, it is recommended to resize and pad your image (adding 0s if the size is odd) so that:
- The height/width are both multiples of 32.
- The height to width ratio should be close enough to cover the original image's aspect ratio.
- The larger side should be made to be 256px. For example, a 720p image (i.e. 720x1280 (HxW)) should be resized and padded to 160x256 image.

This is what that additional code does. We then make our detections using the `movenet` model and finally render the keypoints.

The output is a float32 tensor of shape `[1, 6, 56]`. `1` represents the batch dimension, `6` represents the maximum number of people the model can detect, and `56` represents the predicted bounding box/keypoint locations and scores. 

The first 51 elements (17*3) are the keypoint locations and scores. The last five elements represent the region of the bounding box and the confidence score of the instance.

We've used NumPy `[:,:,:51]` to grab all batch dimensions, all of the maximum number of people, and only the 51 keypoint locations and scores because that's all we need to render our image. `reshape((6,17,3)` tells us that we're reshaping the keypoint to have `6` people, each person with `17` joints, each person having `3` values; the x,y, and confidence score.

>The order of the 17 keypoint joints is: [nose, left eye, right eye, left ear, right ear, left shoulder, right shoulder, left elbow, right elbow, left wrist, right wrist, left hip, right hip, left knee, right knee, left ankle, right ankle].

Below is the function to loop through each person detected and renders.

```python
def loop_through_people(frame, keypoints_with_scores, edges, confidence_threshold):
    for person in keypoints_with_scores:
        draw_connections(frame, person, edges, confidence_threshold)
        draw_keypoints(frame, person, confidence_threshold)
```

The `confidence_threshold` tells the model to draw only keypoints and edges if the threshold is reached. For example, if the confidence score is `0.2` but the confidence_score is set to `0.5`, that joint will not be drawn.  

All that's remaining is to draw the keypoints and edges.

### Drawing keypoints and edges
We'll create the `draw_keypoints` and `draw_connections` which will help us render our videos after detection.

```python
def draw_keypoints(frame, keypoints, confidence_threshold):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
    
    for kp in shaped:
        ky, kx, kp_conf = kp
        if kp_conf > confidence_threshold:
            cv2.circle(frame, (int(kx), int(ky)), 6, (0,255,0), -1)
```
```python
def draw_connections(frame, keypoints, edges, confidence_threshold):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
    
    for edge, color in edges.items():
        p1, p2 = edge
        y1, x1, c1 = shaped[p1]
        y2, x2, c2 = shaped[p2]
        
        if (c1 > confidence_threshold) & (c2 > confidence_threshold):      
            cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0,0,255), 4)
```

```python
EDGES = {
    (0, 1): 'm',
    (0, 2): 'c',
    (1, 3): 'm',
    (2, 4): 'c',
    (0, 5): 'm',
    (0, 6): 'c',
    (5, 7): 'm',
    (7, 9): 'm',
    (6, 8): 'c',
    (8, 10): 'c',
    (5, 6): 'y',
    (5, 11): 'm',
    (6, 12): 'c',
    (11, 12): 'y',
    (11, 13): 'm',
    (13, 15): 'm',
    (12, 14): 'c',
    (14, 16): 'c'
}
```

The values above tell us how to connect the joints. Remember we mentioned the order in which the 17 joints are read. So, for example, the first value, `(0, 1): 'm',` tells us how the nose connects to the left eye, and the last value, `(14, 16): 'c'` tells us how the right knee connects to the right ankle. 

Please find all the code for this tutorial [here](https://colab.research.google.com/drive/1LO9e9jdvIE7bNCXd0fWduZeuDG37z83X?usp=sharing).

### Wrapping up
To recap, we installed and imported our dependencies, loaded the model, made detections using either the webcam or videos and finally drew the keypoints and edges. 

If you're not getting accurately drawn keypoints and edges, or it's drawing on objects that it shouldn't, you can try tuning the and confidence score and scale value to obtain the correct aspect ratio. 

The larger the image that you pass through, the slower the detections are going to be. The opposite is also true.

Happy coding!

### Further reading
- [TensorFlow Hub](https://tfhub.dev/google/movenet/multipose/lightning/1)
- [MobileNetV2: Inverted Residuals and Linear Bottlenecks](https://arxiv.org/pdf/1801.04381.pdf)
- [Feature Pyramid Networks for Object Detection](https://arxiv.org/pdf/1612.03144.pdf)
- [Objects as Points](https://arxiv.org/pdf/1904.07850.pdf)
- [OpenCV](https://opencv.org/)
- [Mixkit](https://mixkit.co/free-stock-video/young-duo-playing-soccer-at-night-2920/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
