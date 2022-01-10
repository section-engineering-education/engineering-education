---
layout: engineering-education
status: publish
published: true
url: /face-geometry-detection-using-python/
title: Face Geometry Detection using Python
description: This tutorial will leverage MediaPipe's Face Mesh model to detect landmarks on faces and style them.
author: esther-awuor
date: 2022-01-10T00:00:00-12:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/face-geometry-detection-using-python/hero.png
    alt: Face Geometry Detection Example Image
---
We will leverage [Face Mesh](https://google.github.io/mediapipe/solutions/face_mesh) model from MediaPipe to detect landmarks on faces and apply some styling to it.
<!--more-->

### Prerequisites
- To follow along with this tutorial, you will need to have either Jupyter Notebook or Google Colab.
> Google Colab has been used for this project.

### Table of contents
- [The Face Mesh model](#the-face-mesh-model)
- [Building the Face Mesh model](#building-the-face-mesh-model)
 - [Installing and importing the required dependencies](#installing-and-importing-the-required-dependencies)
 - [Loading the image](#loading-the-image)
 - [Drawing the face mesh annotations on the image](#drawing-the-face-mesh-annotations-on-the-image)
- [Summary](#summary)

### The Face Mesh model
[MediaPipe](https://google.github.io/mediapipe/) is a powerful open-source framework developed by Google.

It's used in building cross-platform multi-modal applied ML pipelines. One of the models present in this framework is the Face Mesh model.

This model provides face geometry solutions enabling the detection of 468 3D landmarks on human faces.

The Face Mesh model uses machine learning to infer the 3D surface geometry on human faces. Utilizing the facial surface geometry has helped apply facial effects in AR applications.

Ever wondered how you're able to wear fake sunglasses/hats on Snapchat? It's models like this that enable such face-based AR effects.

To understand the face landmark model better, please read this [research paper](https://arxiv.org/pdf/1907.06724.pdf).

### Building the Face Mesh model

#### Installing and importing the required dependencies
```bash
!pip install opencv-python mediapipe
```
We've imported the OpenCV and MediaPipe libraries.

OpenCV helps us access our image, while MediaPipe allows us to import and use the Face Mesh model in our notebook. After installing the two libraries, we need to import them into our notebook.

```python
import cv2 #default OpenCV import code
import mediapipe as mp #default mediapipe import code
```
Let's set up MediaPipe.

Mediapipe is a huge library that has a lot of functionalities. We only need to select the ones that we need.

We need to import the drawing utility to help draw all the 468 landmarks on the face. We also need to import the styling utility to help us add styles onto the face.

Finally, we will import the main face mesh model into our notebook.

```python
mp_drawing = mp.solutions.drawing_utils #helps draw all the 468 landmarks
mp_drawing_styles = mp.solutions.drawing_styles #helps us add styles onto the face
mp_face_mesh = mp.solutions.face_mesh #main model import
```
#### Loading the image
```python
from google.colab.patches import cv2_imshow
image = cv2.imread("image.png")
cv2_imshow(image)
cv2.waitKey(0)
```
Output:

![Output image](/engineering-education/face-geometry-detection-using-python/image.png)

#### Drawing the face mesh annotations on the image
```python
drawing_spec = mp_drawing.DrawingSpec(thickness=2, circle_radius=2)
```
You can adjust the thickness and circle radius to any value you wish.

```python
with mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=3, refine_landmarks=True, min_detection_confidence=0.99) as face_mesh:
    image = cv2.imread("avatar.png")
```
The maximum number of faces to be detected is set to detect only one face by default. To detect more than one face in an image or video, you'll need to change the `max_num_faces` parameter to your required number. We've set ours to three.

For the detection to be considered a success, the `min_detection_confidence` is used to indicate the confidence value needed. The allowed range is between ([0.0, 1.0]).

By default, this value is set to 0.5. Any detection values below 0.99 will not be considered successful. If above 0.99, it will be detected and applied to the image.

Next, we need to convert the image color format from BGR to RGB. This process ought to be done before the image processing begins. This is because OpenCV accepts the image format `BGR` by default. But MediaPipe only works with `RGB` images.

So using the `cv2.cvtColor()` function, we convert the image to RGB format.

```python
    results = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
```

Let's now print and draw the face mesh landmarks on the image.

```python
    annotated_image = image.copy()
 for face_landmarks in results.multi_face_landmarks:
 print('facial_landmarks:', face_landmarks)
      mp_drawing.draw_landmarks(
 image=annotated_image,
 landmark_list=face_landmarks,
 connections=mp_face_mesh.FACEMESH_TESSELATION,
 landmark_drawing_spec=None,
 connection_drawing_spec=mp_drawing_styles
 ```
 The code below applies the face mesh's tesselation style to the image.

 ```python
          .get_default_face_mesh_tesselation_style())
      mp_drawing.draw_landmarks(image=annotated_image, landmark_list=face_landmarks, connections=mp_face_mesh.FACEMESH_CONTOURS,
      landmark_drawing_spec=None,
      connection_drawing_spec=mp_drawing_styles
 ```
 Face mesh contour styles are applied to the image in the code below:

 ```python
          .get_default_face_mesh_contours_style())
      mp_drawing.draw_landmarks(image=annotated_image,
 landmark_list=face_landmarks,
 connections=mp_face_mesh.FACEMESH_IRISES,
 landmark_drawing_spec=None,
 connection_drawing_spec=mp_drawing_styles
          .get_default_face_mesh_iris_connections_style())
      cv2.imwrite('/tmp/annotated_image' + '.png', annotated_image)
```
Output:

```bash
face_landmarks: landmark {
  x: 0.5070745348930359
  y: 0.5069379806518555
  z: -0.03871098905801773
}
landmark {
  x: 0.4806444048881531
  y: 0.46297627687454224
  z: -0.06519311666488647
}
landmark {
  x: 0.4889220893383026
  y: 0.477283775806427
  z: -0.03737092390656471
}
.
.
.
.
.
```
From these results, we can see that each landmark comprises three axes: the `x`, `y`, and `z` coordinates.

Remember, the model detects 468 3D landmarks on the face geometry. These coordinates are normalized to values ranging between 0.0 and 1.0. The depth of the landmark is represented by the coordinate `z`.

The depth's origin is represented by the depth's origin. Besides, the smallest `z` value represents how close the landmark is to the camera.

Finally, we use OpenCV's `imshow()` method to see how these landmarks show on the image.

```python
cv2_imshow(annotated_image)
```

Output:

![Annotated image with landmarks](/engineering-education/face-geometry-detection-using-python/hero.png)

With only a few lines of code, we've successfully drawn the face mesh annotations on the image.

The face geometry detection in this tutorial was performed on a static image, you could take the project a notch higher and try experimenting with it on a webcam video output.

You can find the code for this tutorial [here](https://colab.research.google.com/drive/18QeqDDfDM5k7avw-3LLQ5oj806c63NT3?usp=sharing).

### Summary
The Face Mesh model can be vital in real-time face-based augmented reality (AR) effects. For example, once the model has drawn landmarks on the face, you could overlay sunglasses on an individual's eyes or make the individual wear some nose ring, etc. The use cases are limitless.

Happy coding!

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
