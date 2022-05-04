---
layout: engineering-education
status: publish
published: true
url: /bodypix-for-body-segmentation/
title: Leveraging BodyPix Model for Body Segmentation using Python
description: This tutorial will show the reader how to use the BodyPix model to change the background in an image using OpenCV.
author: lilian-tonia
date: 2022-03-30T00:00:00-02:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/bodypix-for-body-segmentation/hero.png 
    alt: Leveraging BodyPix for Body Segmentation using Python Hero Image
---
BodyPix is a body segmentation model built on TensorFlow. The model uses a pre-trained neural network to segment a human body from a frame. 
<!--more-->
There is a wide range of use cases for this model. For instance, it can be utilized to remove human objects from an image. 

In this tutorial, we will use the BodyPix model to change the background from a frame using OpenCV. 

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- Machine Learning modeling.
- Google Colab.

### Table of contents
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Loading the bodypix model](#loading-the-bodypix-model)
- [Uploading static image using opencv](#uploading-static-image-using-opencv)
- [Performing body segmentation](#performing-body-segmentation)
- [Applying a virtual background](#applying-a-virtual-background)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Installing and importing dependencies
To get started, we will install the following libraries:

- `tensorflow==2.8.0`: The Bodypix model relies on Tensorflow 2.0 and above.

- `tensorflow-gpu==2.8.0`: It allows us to leverage the GPU. Though we do not require a GPU to run this code, we will use it to speed up the detection.

- `tf_bodypix`: It gives us the pre-trained body segmentation model from Tensorflow.

- `tfjs_graph_converter`: It allows us to convert the tensorflow.js BodyPix model to something we can use in Python. By default, the BodyPix model is native in the Tensorflow.js package. 

The command below will install the required libraries:

```bash
!pip install tensorflow==2.8.0 tensorflow-gpu==2.8.0 tf_bodypix opencv-python tfjs_graph_converter matplotlib
```

We will go ahead and import the installed dependencies into our notebook:

```python
import cv2
import tensorflow as tf
from tf_bodypix.api import load_model, download_model, BodyPixModelPaths
import numpy as np
from matplotlib import pyplot as plt
```

> The `load_model`, `download_model`, `BodyPixModelPaths` are the classes that will allow us to interact with the BodyPix model.

### Loading the BodyPix model
We define the `bp_model` variable to store the BodyPix model. The `BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16` defines our BodyPix model path. 

```bash
bp_model = load_model(download_model(BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16))
```

You can confirm the path by running it separately. 

```python
BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16
```
Output:

```bash
https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/mobilenet/float/050/model-stride16.json
```
This path directs the program to where the model is stored.

We pass the above path to the `download_model` class to import it into our notebook. We then use the `load_model` class to access its contents. The result is stored in the `bp_model` variable.

### Uploading static image using OpenCV
In this tutorial, will use the following image downloaded from [Unsplash](https://unsplash.com/). 

![Boy](/engineering-education/bodypix-for-body-segmentation/boy.jpg)

*[Image Source: Unsplash](https://unsplash.com/photos/6PITqYKSoGE)*

Once downloaded, you can upload it into the notebook, as shown below:

```python
from google.colab.patches import cv2_imshow

image = cv2.imread("boy.jpg")
cv2_imshow(image)
cv2.waitKey(0)
```

Let's make some detections with BodyPix. We also need to perform the body segmentation.

### Performing body segmentation
We use the code below for the body segmentation:

```python
from google.colab.patches import cv2_imshow

image = cv2.imread("boy.jpg") #Reading the image

prediction = bp_model.predict_single(image) # Passing the image to the model
mask = prediction.get_mask(threshold=0.5).numpy().astype(np.uint8)
new_mask = cv2.bitwise_and(image, image, mask=mask)

cv2_imshow(new_mask)
cv2.waitKey(0)
```

- The `threshold` is set to `0.5`, which is 50%. Changing this value up and down will impact the detection confidence. A higher value will produce a tighter mask, while a lower value will make it more flexible.
- The `bitwise_and` function helps us to mask the image.

When you run the code above, it results in the following output:

![Masked boy](/engineering-education/bodypix-for-body-segmentation/masked-boy.png)

Though it's not perfect, it still masks the boy from the background. The next step is to apply a virtual background.

### Applying a virtual background
We need to apply an inverse mask to our virtual background. We can then combine the two images. We will still retrieve a background image from [Unsplash](https://unsplash.com/).

![Background](/engineering-education/bodypix-for-body-segmentation/nature.jpg)

*[Image Source: Unsplash](https://unsplash.com/photos/OJ02cQHePds)*

> Note that you can use any image as the background.

Let's load the image into the notebook:

```python
from google.colab.patches import cv2_imshow

image = cv2.imread("nature.jpg")
cv2_imshow(image)
cv2.waitKey(0)
```

> Ensure that the input image and virtual background are of the same dimensions when we overlay them on top of each other. You can find out the dimensions of your image using the `image.shape` method.

Once you've established that the dimensions are the same, we can proceed to apply the virtual background. We will build upon the body segmentation code:

```python
from google.colab.patches import cv2_imshow

img = cv2.imread("nature.jpg")

#Performing body segmentation
prediction = bp_model.predict_single(image)
mask = prediction.get_mask(threshold=0.5).numpy().astype(np.uint8)
new_mask = cv2.bitwise_and(image, image, mask=mask)

#Applying virtual mask
negative = np.add(mask, -1)
inverse = np.where(negative==-1, 1, negative).astype(np.uint8)
masked_bg = cv2.bitwise_and(img, img, mask=inverse)
final_image = cv2.add(new_mask, masked_bg)

cv2_imshow(final_image)
```

Output:

![Final image](/engineering-education/bodypix-for-body-segmentation/final.png)

We have now successfully leveraged the BodyPix model to segment a human object from a frame using OpenCV. We also added the segmented body to another background image. 

The resulting image is not perfect because some background is still visible. You can adjust the `threshold` value to get a tighter mask. 

The BodyPix model can also be used to generate fake webcam backgrounds for video calls.

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1j4ZwlZtXpaZUrJXCgG2q4wExc7mJcEkT?usp=sharing).

### Conclusion
In this tutorial, we discussed body segmentation using the BodyPix model. We installed the required dependencies, loaded the model, and uploaded a static image. 

Finally, we performed a body segmentation on the image and overlayed a new virtual background on it using the BodyPix model.

### Further reading
- [BodyPix](https://github.com/tensorflow/tfjs-models/tree/master/body-pix)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)