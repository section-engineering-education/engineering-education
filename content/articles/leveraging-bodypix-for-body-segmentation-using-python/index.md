---
layout: engineering-education
status: publish
published: true
url: /leveraging-bodypix-for-body-segmentation-using-python/
title: Leveraging BodyPix for Body Segmentation using Python
description: This tutorial will show the reader how to leverage the BodyPix model to change the background from a frame using OpenCV.
author: lilian-tonia
date: 2022-03-08T00:00:00-21:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/leveraging-bodypix-for-body-segmentation-using-python/hero.png 
    alt: Leveraging BodyPix for Body Segmentation using Python Hero Image
---
BodyPix is a body segmentation model built on TensorFlow. The model uses a pre-trained neural network to segment a human body from a frame. There is a wide range of use cases you can use this model for. One use case is on background body removal. 
<!--more-->
This tutorial will leverage this model to change the background from a frame using OpenCV. 

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- Machine Learning.
- Machine Learning modeling.
- Google Colab.

### Outline
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Loading the bodypix model](#loading-the-bodypix-model)
- [Uploading static image using opencv](#uploading-static-image-using-opencv)
- [Performing body segmentation](#performing-body-segmentation)
- [Applying a virtual background](#applying-a-virtual-background)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Installing and importing dependencies
To get started, we will install these libraries:

- `tensorflow==2.8.0`: The Bodypix model relies on Tensorflow. So, we have to install it. You can install any Tensorflow 2.0 and above.
- `tensorflow-gpu==2.8.0`: It allows us to leverage the GPU. You don't need to use a GPU to run this code. But we are using it as it speeds up our detection.
- `tf_bodypix`: It gives us the pre-trained body segmentation model from Tensorflow.
- `tfjs_graph_converter`: It allows us to convert the tensorflow.js BodyPix model to a model we can use inside Python. By default, the BodyPix model is native inside the Tensorflow.js package. It needs to be converted to work within Python. The Tensorflow JS Graph converter helps convert it.

```bash
!pip install tensorflow==2.8.0 tensorflow-gpu==2.8.0 tf_bodypix opencv-python tfjs_graph_converter matplotlib
```
We will go ahead and import the installed dependencies into our notebook.

```python
import cv2
import tensorflow as tf
from tf_bodypix.api import load_model, download_model, BodyPixModelPaths
import numpy as np
from matplotlib import pyplot as plt
```
> The `load_model`, `download_model`, `BodyPixModelPaths` are the classes that will allow us to work with the BodyPix model in our notebook.

### Loading the BodyPix model

```bash
bp_model = load_model(download_model(BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16))
```
We create a new variable, `bp_model`, to store the BodyPix model. The `BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16` defines our BodyPix model path. You can confirm the path by running it separately. 

```python
BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16
```
Output:

```bash
https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/mobilenet/float/050/model-stride16.json
```
That's the path to where our model is found.

We pass this path to the `download_model` class to download it into our notebook. We then use the `load_model` class to load it into our notebook. This result is stored inside the `bp_model` variable.

### Uploading static image using OpenCV
Let's download an image we can work within this tutorial from [Unsplash](https://unsplash.com/). 

![Boy](/engineering-education/leveraging-bodypix-for-body-segmentation-using-python/boy.jpg)

*[Image Source: Unsplash](https://unsplash.com/photos/6PITqYKSoGE)*

Once downloaded, you can upload it into the notebook. Use the following code to load it:

```python
from google.colab.patches import cv2_imshow

image = cv2.imread("boy.jpg")
cv2_imshow(image)
cv2.waitKey(0)
```
Let's make some detections with BodyPix. We'll build upon the code above by adding a couple of more lines of code. This extra code will allow us to perform the body segmentation.

### Performing body segmentation

```python
from google.colab.patches import cv2_imshow

image = cv2.imread("boy.jpg")

prediction = bp_model.predict_single(image)
mask = prediction.get_mask(threshold=0.5).numpy().astype(np.uint8)
new_mask = cv2.bitwise_and(image, image, mask=mask)

cv2_imshow(new_mask)
cv2.waitKey(0)
```

- The `threshold` is set to `0.5`, which is 50%. Changing this value up and down will impact the detection confidence. A higher value will produce a tighter mask, while a lower value will make it more flexible.
- The `bitwise_and` function helps us mask the image.

When you run the code above, it results in the following output:

![Masked boy](/engineering-education/leveraging-bodypix-for-body-segmentation-using-python/masked-boy.png)

It is not perfect, but it masks the boy from the background. The next thing that we will do is to apply a virtual background.

### Applying a virtual background
We need to apply an inverse mask to our virtual background. We can then add the two images together. Again, we can get an image from [Unsplash](https://unsplash.com/) that we can use for our background.

![Background](/engineering-education/leveraging-bodypix-for-body-segmentation-using-python/nature.jpg)

*[Image Source: Unsplash](https://unsplash.com/photos/OJ02cQHePds)*

> You can apply any picture that you want as your background.

Let's load it into the notebook.

```python
from google.colab.patches import cv2_imshow

image = cv2.imread("nature.jpg")
cv2_imshow(image)
cv2.waitKey(0)
```
> Ensure that the input image and virtual background are of the same dimensions when we overlay them on top of each other. You can find out the dimensions of your image using the `image.shape` method.

Once you've established that the dimensions are the same, we can now go ahead and apply our virtual background. We will build upon the body segmentation code.

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

![Final image](/engineering-education/leveraging-bodypix-for-body-segmentation-using-python/final.jpg)

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1j4ZwlZtXpaZUrJXCgG2q4wExc7mJcEkT?usp=sharing).

### Conclusion
In this tutorial, we discussed body segmentation using the BodyPix model. We installed the required dependencies, loaded the model, uploaded a static image we can work with. Finally, we performed body segmentation on the image and overlayed a new virtual background to it.

### Further reading
- [BodyPix](https://github.com/tensorflow/tfjs-models/tree/master/body-pix)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
