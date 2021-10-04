In this tutorial, we are going to build a selfie segmentation model using Mediapipe, Gradio and Python. The selfie segmentation model allows us to quickly and easily strip out the background from photos using a pre-built machine learning model.

Finally, We’re going to take it one step further and integrate it to a Gradio app!

### Outline
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Installing mediapipe and gradio](#installing-mediapipe-and-gradio)
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
- You need to use either Jupyter Notebook or Google Colab. To follow along, please use Google Colab.

### Introduction
Mediapipe is a free and open-source machine learning (ML) pipeline that provides pre-built ML solutions in Python and other languages. It provide ML solutions such as face detection, hair segmentation, object detection, and selfie segementation. These ML solution provided by mediapipe work across Android, iOS, desktop/cloud, web and IoT devices.

Gradio is a library that allows us to build stand-alone applications inside of a Jupyter Notebook/Google Colab. In this tutorial, we will integrate our selfie model into the gradio app. 

The model that we are going to use is the [selfie segmentation model](https://google.github.io/mediapipe/solutions/selfie_segmentation), which is based on a modified [MobileNetV3](https://ai.googleblog.com/2019/11/introducing-next-generation-on-device.html). MobileNetV3 is a state-of-the-art model for mobile computer vision networks with speeds twice as fast as the [MobileNetV2](https://ai.googleblog.com/2018/04/mobilenetv2-next-generation-of-on.html) model. The model segements out your body from an image/video which allows you to replace backgrounds or apply effects to your video or image.

### Installing mediapipe, gradio and opencv

```bash
pip install gradio mediapipe opencv-python matplotlib
```
If you're using Jupyter notebook, make sure to include an exclamation `!` before the `pip` command as shown:

```bash
!pip install gradio mediapipe opencv-python matplotlib
```

Now that we've installed them, we need to import them into our colab.

```python
import mediapipe as mp
import cv2
import numpy as np
```

Since the video feed will be in real-time, we use opencv to access our computers webcam to relay the feed.

```python
cap = cv2.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()

    cv2.imshow('Selfie seg', frame)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
```
### Applying selfie segmentation using OpenCV

```python
mp_selfie = mp.solutions.selfie_segmentation

cap = cv2.VideoCapture(0)
# Create with statement for model 
with mp_selfie.SelfieSegmentation(model_selection=0) as model: 
    while cap.isOpened():
        ret, frame = cap.read()
        
        # Apply segmentation
        frame.flags.writeable = False
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        res = model.process(frame)
        frame.flags.writeable = True

        cv2.imshow('Selfie Seg', frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
cap.release()
cv2.destroyAllWindows()

res.segmentation_mask
```

### Processing the results

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
### Integrating the selfie model into the Gradio app

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

The complete code for this tutorial is available [here](ttps://colab.research.google.com/drive/1kmtLZGFZWboHVTmYwSh4m-5DgHVyRQ9u).

### References
- [MediaPipe](https://mediapipe.dev/)
- [Gradio](https://www.gradio.app/)
- [Complete code](https://colab.research.google.com/drive/1kmtLZGFZWboHVTmYwSh4m-5DgHVyRQ9u)