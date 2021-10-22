---
layout: engineering-education
status: publish
published: true
url: /building-a-deep-learning-app-using-python/
title: Building a Deep Learning Application using Python
description: This tutorial aims to help the reader learn how to build a deep learning selfie segmentation web app using gradio.
author: lilian-cheptoo
date: 2021-10-22T00:00:00-19:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-deep-learning-app-using-python/hero.png
    alt: Deep Learning App Hero image
---

In this tutorial, we will build a selfie segmentation model using Mediapipe, Gradio and Python. Using a pre-built machine learning model, the selfie segmentation model allows us to quickly and easily strip out the background from photos.
<!--more-->
Finally, we are going to take it one step further and integrate it into a Gradio app!

### Outline
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Installing mediapipe, gradio, opencv, and matplotlib](#installing-mediapipe-gradio-opencv-and-matplotlib)
- [Applying selfie segmentation using OpenCV](#applying-selfie-segmentation-using-opencv)
- [Integrating the selfie model into the Gradio app](#integrating-the-selfie-model-into-the-gradio-app)
- [Wrapping up](#wrapping-up)
- [References](#references)

### Prerequisites
To fully understand this tutorial, you need to be familiar with:
- The Python programming language.
- [MediaPipe](https://mediapipe.dev/)
- [Gradio](https://www.gradio.app/)
- [OpenCV](https://opencv.org/)

> You need to use either Jupyter Notebook or Google Colab. To follow along, please use Google Colab.

### Introduction
The [selfie segmentation model](https://google.github.io/mediapipe/solutions/selfie_segmentation) allows us to quickly and easily strip out the background from photos using a pre-built machine learning model. It is based on a modified [MobileNetV3](https://ai.googleblog.com/2019/11/introducing-next-generation-on-device.html). MobileNetV3 is a state-of-the-art model for mobile computer vision networks with speeds twice as fast as the [MobileNetV2](https://ai.googleblog.com/2018/04/mobilenetv2-next-generation-of-on.html) model. 

The model segments your body from an image/video, allowing you to replace backgrounds or apply effects to your video or image. The model can run in real-time on both smartphones and laptops, and its intended use cases include selfie effects and video conferencing.

### Installing mediapipe, gradio, opencv, and matplotlib
`Mediapipe` is a free and open-source machine learning (ML) pipeline that provides pre-built ML solutions in Python and other languages. It provides ML solutions such as face detection, hair segmentation, object detection, and selfie segmentation. These ML solutions provided by media pipe work across Android, iOS, desktop/cloud, web and IoT devices. We will use it to grab the selfie segmentation model.

`Gradio` is a library that allows us to build stand-alone applications inside of a Jupyter Notebook/Google Colab. In this tutorial, we will integrate our selfie model into the gradio app. 

`OpenCV` is a widely used python library that allows you to solve tasks in computer vision. We will use this library to get real-time feed from our webcam.

`Matplotlib` is a python package used for creating static, animated, and interactive visualizations. We will use it to visualize our images. 

```bash
pip install gradio mediapipe opencv-python matplotlib
```
If you're using Jupyter notebook, make sure to include an exclamation `!` before the `pip` command as shown:

```bash
!pip install gradio mediapipe opencv-python matplotlib
```

Now that we've installed them, we need to import them into our Colab.

```python
import mediapipe as mp
import cv2
import numpy as np
```

Since the video feed will be real-time, we use OpenCV to access our computers webcam to relay the feed.

```python
cap = cv2.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()

    cv2.imshow('Webcam feed', frame)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
```

This is a standard way of getting a video feed using OpenCV. The `VideoCapture()` method is used to create a video capture object. The number `0` indicates that we are going to use a web camera. If it's not picking your webcam or getting an error, try changing this number to either a `1` or `2`. 

Once we've captured our video device, we use `while` to loop continuously from our webcam feed. These captured feeds are then unpacked and stored in the `ret` and `frame` variables. OpenCV's `imshow()` method then renders them on the screen with `Webcam feed`. You can give yours a different name if you so wish. 

### Applying selfie segmentation using OpenCV
```python
mp_selfie = mp.solutions.selfie_segmentation
```
The code above instantiates the `selfie_segmentation` model and saves it in a variable called `mp_selfie`.

We now go ahead and apply the `selfie_segmentation` model to the OpenCV feed.

```python
cap = cv2.VideoCapture(0)
# Create with statement for model 
with mp_selfie.SelfieSegmentation(model_selection=0) as model: 
    while cap.isOpened():
        ret, frame = cap.read()
        
        # Apply segmentation
        frame.flags.writeable = False
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = model.process(frame)
        frame.flags.writeable = True

        cv2.imshow('Webcam feed', frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
cap.release()
cv2.destroyAllWindows()
```

This code `mp_selfie.SelfieSegmentation(model_selection=0) as model` allows us to apply `SelfieSegmentation` in OpenCV using the variable called `model`.
By default, OpenCV saves frames in `blue-green-red` (BGR) format. Don't be surprised if your image or video feed appears to show your face in blue. We convert this into the `red-green-blue` (RGB) standard format using the command, `cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)` to pass it to our model. We save this result in a variable called `frame`.
We then pass this `frame` into our model and save the result in the `res` variable.

> Please note that this isn't going to be rendered. At least not yet. We will only be able to see the results from the variable `res`.

To check the results, use the following command:

```python
res.segmentation_mask
```
Output:

```bash
array([[6.5710924e-28, 5.9139829e-28, 3.2855462e-28, ..., 0.0000000e+00,
        0.0000000e+00, 0.0000000e+00],
       [1.5529340e-22, 1.3976405e-22, 7.7646702e-23, ..., 3.4236475e-31,
        6.8472963e-32, 0.0000000e+00],
       [4.3136934e-22, 3.8823240e-22, 2.1568467e-22, ..., 9.5101311e-31,
        1.9020266e-31, 0.0000000e+00],
       ...,
       [5.5132825e-17, 4.9619541e-17, 2.7566413e-17, ..., 4.1491491e-19,
        8.2982972e-20, 3.9673376e-35],
       [2.3155784e-16, 2.0840205e-16, 1.1577892e-16, ..., 1.7426278e-18,
        3.4852552e-19, 1.6662817e-34],
       [3.3079694e-16, 2.9771723e-16, 1.6539847e-16, ..., 2.4894664e-18,
        4.9789340e-19, 2.3804025e-34]], dtype=float32)
```
These results are the probabilities of a person being in a webcam frame. You can try and check the probabilities the feed from your webcam feed will give. We can now go ahead and process these results.

### Processing the results
We begin by installing `pyplot` and `gridspec`. `pyplot` help us in the main plotting while `gridspec` enables us use grids in our layout. `Gridspec` makes it easy to set up subplots.

```python
from matplotlib import pyplot as plt
from matplotlib import gridspec

# Layout
plt.figure(figsize=(15,15))
grid = gridspec.GridSpec(1,2)

# Setup axes
ax0 = plt.subplot(grid[0])
ax1 = plt.subplot(grid[1])

ax0.imshow(frame)
ax1.imshow(res.segmentation_mask)
plt.show()
```
- Setting up the layout is important as it will determine how our end plot will be. In our case, we set it to 15px by 15px. For our grid we set it to have one row and two columns meaning that we'll have one image dislayed inside of those columns.
- We create two variables, `ax0` and `ax1` to store our subplots. It is then passed to OpenCV's `imshow()` method to process the frame and segmentation mask. This should display the results from our baseline image, and that of the segmentation mask side by side.

Let's now apply a mask to exclude all the components which haven't been highlighted by the segmentation.

```python
background = np.zeros(frame.shape, dtype=np.uint8)
mask = np.stack((res.segmentation_mask,)*3, axis=-1) > 0.5

segmented_image = np.where(mask, frame, background)

plt.imshow(segmented_image)
```
We have created a black background image using numpy and stored the results in a variable called `background`. The code creates an empty numpy array full of zeros. The `frame.shape` tells numpy to assign the zeros to our existing image shape. On the contrary, to get a white background, you could type in `np.ones()`.

Rather than having a segmentation mask with a single channel, we'll multiply it by three to have the mask applied on all the three channels. Lastly, we return a result with only a 50% probability. The `numpy.where()` function returns the indices of elements in an input array where the given condition is satisfied. You can read more about it [here](https://www.geeksforgeeks.org/numpy-where-in-python/). 

Let's now go ahead and wrap this up using the gradio app.

### Integrating the selfie model into the Gradio app
To wrap it up, we will integrate the selfie model into the [gradio](https://www.gradio.app/) application. This will enable the model be accessible on a web user interface.

```python
import gradio as gr

def segment(image): 
    with mp_selfie.SelfieSegmentation(model_selection=0) as model: 
        res = model.process(image)
        mask = np.stack((res.segmentation_mask,)*3, axis=-1) > 0.5 
        return np.where(mask, image, cv2.blur(image, (40,40)))

webcam = gr.inputs.Image(shape=(640, 480), source="webcam")

webapp = gr.interface.Interface(fn=segment, inputs=webcam, outputs="image")

webapp.launch()
```

Here, we first imported gradio. We set up the function, `segment` that we want gradio to run on. The function returns three values, the `mask`, input image, `image`, and our background, `background`. Please note that the background need not be a black background. You could use a background image or you could apply a blur on the background. To blur, replace the argument, `background` with `cv2.blur()` method.
We then specify the webcam as our input to our gradio app, and finally, using the `launch()` method, we launch the gradio app. 

The complete code for this tutorial is available [here](https://colab.research.google.com/drive/1kmtLZGFZWboHVTmYwSh4m-5DgHVyRQ9u).

### Wrapping up
In a nutshell, that's the selfie segmentation application integrated into gradio. There's quite a lot of information to grasp, but I hope you get to understand it. The selfie segmentation model is quite fast so there shouldn't be a problem running it.

Happy coding. 

### References
- [MediaPipe](https://mediapipe.dev/)
- [Gradio](https://www.gradio.app/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
