---
layout: engineering-education
status: publish
published: true
url: /a-3d-object-detection-solution-for-everyday-objects/
title: A 3D Object Detection Solution for Everyday Objects
description: This tutorial will cover how to perform 3D object detection using the mediapipe library and python, and draw 3D bounding box around the objects.
author: lilian-tonia
date: 2021-12-20T00:00:00-06:55
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/a-3d-object-detection-solution-for-everyday-objects/hero.png
    alt: A 3D Object Detection Solution for Everyday Objects Hero Image
---
This tutorial will perform 3D object detection using the mediapipe library and python. We will be drawing a 3D bounding box around an object instead of the common 2D bounding boxes that we are used to.
<!--more-->

### Prerequisites
To follow along with this tutorial, you need to:
- Be familiar with machine learning modeling.
- Be familiar with the python programming language.
- Install either Jupyter notebook or Google Colab.
> To follow along with this tutorial, please use Google Colab.

### Table of contents
- [Why 3D detection is important](#why-3d-detection-is-important)
- [What is the Objectron](#what-is-the-objectron)
- [How they obtained real-world 3D training data](#how-they-obtained-real-world-3d-training-data)
- [Detect and track 3D objects using this model](#detect-and-track-3d-objects-using-this-model)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Why 3D detection is important
Over the years, object detection research has focused on performing 2D object detection. We have seen this with RCNN, Fast RCNN, SSD, and Masked RCNN. 

In the real world, we have 3D objects. Because of this, it would be better if we had 3D bounding boxes to bound objects detected in the real world, rather than the commonly used 2D detections. 

3D object detection is vital as it would enable us to capture objects’ sizes, orientation, and position in the world. As a result, we would be able to use these 3D detection in real-world applications such as Augmented Reality (AR), self-driving cars, and robotics which perceive the world the same way we do as humans.

Amazingly, Google has put forward a model that views the world and detects real-world objects in 3-dimension. This model is known as the Objectron.

### What is the Objectron
The Objectron is a real-time 3D object detection solution that can detect objects in the real world. 

The model first detects cropped objects in 2D images. Afterward, it estimates their poses through a machine learning (ML) model that is trained on the [Objectron dataset](https://github.com/google-research-datasets/Objectron). It can create a 3D bounding box around an object with `x`, `y`, and `z` coordinates. Currently, it can detect only four objects, a shoe, camera, cup, and chair.

The model is available on Google's [MediaPipe](https://google.github.io/mediapipe/solutions/objectron). It is an ML pipeline that contains open-source solutions to solve real-world problems. 

### How they obtained real-world 3D training data
To get 3D training data, they had to perform some annotation techniques on 2D data as there is no 3D data available today. 

Initially, they developed a single-stage objectron model to acquire these data using [mobile augmented reality](https://ai.googleblog.com/2020/03/real-time-3d-object-detection-on-mobile.html) session data. This allowed them to create this kind of datasets. But, these datasets never captured 3D objects from different angles. 

They later released a more robust [objectron model](https://ai.googleblog.com/2020/11/announcing-objectron-dataset.html) with a two-stage architecture. 

The first stage deployed the commonly used TensorFlow object detection model to estimate the 2D crop of an input image. Once this cropping had been performed, the second stage involved taking these cropped images and estimating their 3D bounding boxes. 

This was a great upgrade from their initial model that used a single-stage encoder-decoder architecture. It captured a much larger set of common objects from different angles. Additionally, this dataset was collected from a geo-diverse sample consisting of data covering ten countries across continents.

Please find the GitHub link to the Objectron dataset [here](https://github.com/google-research-datasets/Objectron).

### Detect and track 3D objects using this model

#### Installing and importing dependencies

```bash
!pip install opencv-python mediapipe
```
Next, we need to import them into our notebook.

```python
import cv2
import mediapipe as mp
```
Let's now set up mediapipe.

#### Setting up mediapipe

```python
mp_drawing = mp.solutions.drawing_utils
mp_objectron = mp.solutions.objectron
```

From mediapipe, we have imported two key solutions that will help us in this tutorial. We've imported the `drawing_utils` to help us draw the 3D bounding boxes (lines and points), and the `objectron` model itself. 
> Remember, mediapipe is a huge library with many models, we need to import the specific model from mediapipe that we want to use.

#### Uploading a static image
This tutorial will use two static images of a chair for our demonstration. Let's name them chair [one](https://unsplash.com/photos/kvmdsTrGOBM) and [two](https://unsplash.com/photos/NBJ0BBqvdNM). You will need to download either of the two images and upload them onto your Google Colab as uploads on Colab get deleted after runtime.

> We recommend to download the small size of the image (640px by 799px) for easier processing. 

```python
from google.colab.patches import cv2_imshow

image = cv2.imread("name-of-your-image.jpg") 
cv2_imshow(image)
cv2.waitKey(0)
```
After uploading, we need to perform the detection and tracking on the image.

#### Performing the detection and tracking

```python
with mp_objectron.Objectron(static_image_mode=True,
                            max_num_objects=5,
                            min_detection_confidence=0.5,
                            min_tracking_confidence=0.5,
                            model_name='Chair') as objectron:
```

- We set the `static_image_model` to `True` as we want to detect still images. If you want to detect video frames, we set this value to `False`.
- The `max_num_objects` denotes the maximum number of objects inside a frame. The default value is set to `5`. If you need to increase the maximum number, you can change it here.
- The `min_detection_confidence` ranges between `0.0` and `1.0`. We've set our value to `0.5`. This means that if the score for the detection is below `0.5`, the model will not be confident about the detection and will consider the detection unsuccessful. Similarly, with the `min_tracking_confidence`, we've set the value to `0.99`.
- We've set the model name to detect a `Chair`. As at the time of writing this tutorial, the model only supports the 3D bounding boxes of these four objectrons: {'Shoe', 'Chair', 'Cup', 'Camera'}. By default, it's set to detect a shoe. You can change the value to detect any of the four. 

#### Drawing the box landmarks on the image

```python
annotated_image = image.copy()
    for detected_object in results.detected_objects:
      mp_drawing.draw_landmarks(
          annotated_image, detected_object.landmarks_2d, mp_objectron.BOX_CONNECTIONS)
      mp_drawing.draw_axis(annotated_image, detected_object.rotation,
                           detected_object.translation)
      cv2.imwrite('/tmp/annotated_image' + '.png', annotated_image)
```
If `Chair` has been detected in the frame (`results.detected_objects`), draw landmarks on the image in a bounding box (`BOX_CONNECTIONS`) using the `mp_drawing` class. Besides, we know that a 3D dimensional image is in three axes, `x`, `y`, and `z`. We use the `draw_axis` method to draw our axis on the image.

Finally, we need to display these results to the user. We use OpenCV's `imshow()` method to perform this task. 

```python
cv2_imshow(annotated_image)
```
Output:

![Annotated image with 3D Object Detected](/engineering-education/a-3d-object-detection-solution-for-everyday-objects/annotated-image.png)

Please find the full code implementation for this tutorial [here](https://colab.research.google.com/drive/1BClS6Uu5XaU940cfwo-cuCKmlsXyCGx5?usp=sharing).

### Wrapping up
We are living in exciting times. Breakthroughs in artificial intelligence can only make our lives better and safer. It is interesting how we thought 2D object detection was cool. With 3D object detections, it is even way better. Let us wait and see what the future will surprise us with. For now, we are excited to be part of it and to share this amazing knowledge with you.  

### Further reading
- [MediaPipe Objectron](https://google.github.io/mediapipe/solutions/objectron)
- [Objectron: A Large Scale Dataset of Object-Centric Videos in the Wild with Pose Annotations](https://arxiv.org/pdf/2012.09988.pdf)
- [Hero image](https://unsplash.com/@sebastiansvenson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
