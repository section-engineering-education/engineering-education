---
layout: engineering-education
status: publish
published: true
url: /building-an-image-classification-model-with-gradio-and-keras/
title: Building an image classification model with Gradio and Keras
description: This tutorial will implement a simple image classification model using Gradio and Keras. The image classification model will classify images of various flowers into labeled classes.
author: elisha-njeche
date: 2022-05-04T00:00:00-11:44
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-an-image-classification-model-with-gradio-and-keras/hero.jpg
    alt: Building an image classification model with Gradio and Keras Hero Image
---
Image classification is a subset of machine learning that categorizes a group of images into labeled classes. We train an image classification model using labeled images to enable the model to gain information and knowledge.
<!--more-->
The final model is then applied to a set of images so that it can classify them into one of the labeled classes. For example, an image classification model that takes in images of animals and classifies them into the labeled classes such as 'zebra', 'elephant', 'buffalo', 'lion', and 'giraffe'

Sophistcated image classification models can further be applied in computer vision for [object detection](/engineering-education/object-detection-with-yolov5-and-pytorch/), [face recogntion](https://en.wikipedia.org/wiki/Facial_recognition_system), [medical imaging](), [trafffic control sytems](https://www.sciencedirect.com/topics/computer-science/traffic-control-system), [driverless cars](https://en.wikipedia.org/wiki/Self-driving_car), and [satellite imaging](https://en.wikipedia.org/wiki/Satellite_imagery)

In this tutorial, we will implement a simple image classification model using [Gradio](https://gradio.app/) and [Keras](https://keras.io/). The image classification model will classify images of various flowers into labeled classes.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Understanding Gradio](#understanding-gradio)
- [Installing and importing the Gradio library](#installing-and-importing-the-gradio-library)
- [Importing the important libraries for this tutorial](#importing-the-important-libraries-for-this-tutorial)
- [Importing Keras and Keras layers](#importing-keras-and-keras-layers)
- [Specifying the dataset path](#specifying-the-dataset-path)
- [Setting the image height and width](#setting-the-image-height-and-width)
- [Setting the training set](#setting-the-training-set)
- [Setting the validation set](#setting-the-validation-set)
- [Getting and printing all the class names](#getting-and-printing-all-the-class-names)
- [Importing the sequential model](#importing-the-sequential-model)
- [Adding image normalization/standardization layer](#adding-image-normalizationstandardization-layer)
- [Adding convolution layer](#adding-convolution-layer)
- [Adding max-pooling layer](#adding-max-pooling-layer)
- [Adding another convolution layer](#adding-another-convolution-layer)
- [Adding another max-pooling layer](#adding-another-max-pooling-layer)
- [Adding another convolution layer](#adding-another-convolution-layer-1)
- [Adding another max-pooling layer](#adding-another-max-pooling-layer-1)
- [Adding the flattening layer](#adding-the-flattening-layer)
- [Adding the final output layer](#adding-the-final-output-layer)
  - [Compiling the CNN](#compiling-the-cnn)
- [Fitting the CNN](#fitting-the-cnn)
- [Using the CNN for image classification](#using-the-cnn-for-image-classification)
- [Implementing Gradio](#implementing-gradio)
  - [Creating and launching the Gradio UI](#creating-and-launching-the-gradio-ui)
- [Uploading an image to be classified](#uploading-an-image-to-be-classified)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, the reader should have knowlegde of the following:
- [TensorFlow basics](https://www.tensorflow.org/).
- [Image preprocessing in Python](/engineering-education/image-preprocessing-in-python/).
- [convolution neural networks architecture](/engineering-education/basics-of-convolution-neural-networks/).
- How to run the model in [Google Colab](https://research.google.com/colaboratory/).

### Understanding Gradio
Gradio is a machine learning library that creates an interactive application for your trained machine learning model. Gradio creates insightful user interfaces(UI) that allow a user to interact with a trained machine learning model.

It generates a web interface that allows the user to test the trained model and see the prediction results. We can easily integrate Gradio's user interface right in the Python notebook(either Jupyter notebook or Google Colab notebook) without having to install any dependencies.

Gradio directly works with popular machine learning libraries such as [Sckit-learn](https://scikit-learn.org/), [Tensorflow](https://www.tensorflow.org/), [Keras](https://keras.io/), [PyTorch](https://pytorch.org/), and [Hugging Face Transformers](https://huggingface.co/docs/transformers/index).

In this tutorial, we will use TensorFlow's Keras to create the convolutional neural network (CNN) for image classification and use Gradio to create the user interface for the model.

### Installing and importing the Gradio library
We install and import the Gradio library as follows:

- Installing Gradio library:

```bash
!pip install gradio
```

- Importing Gradio library:

```python
import gradio as gr
```

### Importing the important libraries for this tutorial
We need to import the following libraries:

```python
import numpy as np
import os
import matplotlib.pyplot as plt
import tensorflow as tf
import PIL
import pathlib
```

These libraries have the following functions:
- `numpy` - We will convert the image dataset into an array.
- `os` - This library will enable us to use the operating system functions right in the Google Colab.
- `Matplotlib` - It is the plotting library. We will use it to visualize some of the images in Google Colab.
- `tensorflow` - We will use this library to build the image classification model. We will import Keras layers from TensorFlow and use them to initialize the convolutional neural network (CNN).
- `pillow (PIL)` - We will use the library to manipulate and preprocess the images in our dataset.
- `pathlib` - We will use the library to specify the path of the dataset so that we can download the images dataset into Google Colab.

### Importing Keras and Keras layers
We import Keras and Keras layers as follows:

- Importing Keras:

```python
from tensorflow import keras
```

- Importing Keras layers:

```python
from tensorflow.keras import layers
```

We will use the Keras layers to build the convolutional neural network (CNN) for image classification.

### Specifying the dataset path
We specify the dataset path as follows:

```python
flowers_dataset_path = "https://drive.google.com/file/d/1N0oodifAWHE8LkfayHHzjO_wyWgdwi7B/view?usp=sharing"
```

We then download the dataset into Google Colab and extract it as follows:

```python
loaded_data = tf.keras.utils.get_file('flower_photos', origin=flowers_dataset_path, untar=True)
loaded_data = pathlib.Path(loaded_data)
```

The images dataset has five labeled flower classes. The labeled flower classes are 'tulips', 'dandelion', 'daisy', 'sunflowers' and 'roses'. We extract all of the flowers of the rose as follows:

```python
flower_roses = list(loaded_data.glob('roses/*'))
```

We can then use Pillow to select the first rose image as follows:

```python
PIL.Image.open(str(flower_roses[0]))
```

We then display the selected image as follows:

```python
print(flower_roses[0])
```

It gives the following rose image:

![Rose image](/engineering-education/building-an-image-classification-model-with-gradio-and-keras/rose-image.png)

### Setting the image height and width
We have to set the image height and width that the CNN will use. We will use the following image sizes:

```python
set_height, set_width = 180, 180
```

The input image will be 180 by 180 pixels. We also set the batch size during training.

```python
batch_size=32
```

The batch size is the number of images the model will use during each epoch or iteration.

### Setting the training set
We select images from the extracted dataset to be for model training. The convolution neural network will learn from these images so that they can perform image classification.

We will use the `keras.preprocessing` to set the training set.

```python
training_images = tf.keras.preprocessing.image_dataset_from_directory(
  loaded_data,
  subset="Images for model training",
  validation_split=0.25,
  seed=123,
  image_size=(set_height, set_width),
  batch_size=batch_size)
```

From the function above, we use the validation split of `0.25`. This will split the original image dataset so that 75% of the dataset will train the CNN. The function also has the following additional parameters:
- `seed` - It will enable us to reproduce the images of the same dimensions during each epoch.
- `image_size` - It specifies the image dimensions(180\*180) we had previously set.
- `batch_size` - It specifies the batch size we had previously set.

When you run the function above, you will get the following output:

![Training set function](/engineering-education/building-an-image-classification-model-with-gradio-and-keras/training-set-function.png)

In the given output above, the dataset has 3670 images and 2753 images will train the CNN.

### Setting the validation set
We select images from the extracted dataset to be for model validation. These images will fine-tune the CNN and enhance its performance.

```python
validation_images = tf.keras.preprocessing.image_dataset_from_directory(
  loaded_data,
  subset="Images for validation",
  validation_split=0.25,
  seed=123,
  image_size=(set_height, set_width),
  batch_size=batch_size)
```

From the function above, we use the validation split of `0.25`. This will split the original image dataset so that 25% of the dataset will validate the CNN. The function also has the additional parameters that we have previously explained.

When you run the function above, you will get the following output:

![Validation set function](/engineering-education/building-an-image-classification-model-with-gradio-and-keras/validation-set-function.png)

In the given output above, the dataset has 3670 images and 917 images will validate the CNN.

### Getting and printing all the class names
We get all the flower classes as follows:

```python
flower_classes = training_images.class_names
```

Then print the classes as follows:

```python
print(flower_classes)
```

It prints the following classes:

![Flower classes](/engineering-education/building-an-image-classification-model-with-gradio-and-keras/flower-classes.png)

From the given output above, the dataset has five classes. Let's initialize these classes.

```python
dataset_classes = 5
```

### Importing the sequential model
A sequential model will enable users to build the multiple layers of a [convolution neural network (CNN)](/engineering-education/basics-of-convolution-neural-networks/) on top of each other. We will initialize the Keras layers layer by layer and produce a final model with all the initialized layers.

```python
from tensorflow.keras.models import Sequential
```

Let's initialize the Sequential model:

```python
model = Sequential([])
```

We then add the following layers to the sequential layers:

### Adding image normalization/standardization layer
[Image normalization/standardization](/engineering-education/image-preprocessing-in-python/) is the process of making images in the dataset have the same pixel intensity. We want the image's pixel intensity to be within the [0, 1] range.

```python
layers.experimental.preprocessing.Rescaling(1./255, input_shape=(set_height, set_width, 3))
```

The function dives the image's pixel by 255 to ensure its range is between 0 and 1. It also takes the `set_width` and `set_height` as a parameter. The image will have 3 channels that represent the primary colors (Red, Blue, and Green (RGB)).

### Adding convolution layer
We add the convolution layer of the CNN as follows:

```python
layers.Conv2D(16, 3, padding='same', activation='relu'),
```

The `Conv2D` will be 2 dimensional and will have 16 neurons. It also has 3 image channels. The layers have a padding `same` to ensure that the neurons that create this layer have the same size. 

We use `relu` as an activation function because the output of this layer will be between 0 and positive infinite values.

You can read this [article](/engineering-education/basics-of-convolution-neural-networks/) for a better understanding of the convolution layer and the CNN in detail. You can also read this [article](/engineering-education/activation-functions/) for a better understanding of the `relu` activation function.

### Adding max-pooling layer
We add the max-pooling layer of the CNN as follows:

```python
layers.MaxPooling2D(),
```

You can read this [article](/engineering-education/basics-of-convolution-neural-networks/) for a better understanding of the max-pooling layer and CNN in detail.

### Adding another convolution layer
We add this layer as follows:

```python
layers.Conv2D(32, 3, padding='same', activation='relu'),
```

This layer will have 32 neurons and 3 image channels. It also uses `relu` as the activation function.

### Adding another max-pooling layer
We add another max-pooling layer as follows:

```python
layers.MaxPooling2D(),
```

### Adding another convolution layer
We add this layer as follows:

```python
layers.Conv2D(64, 3, padding='same', activation='relu'),,
```

This layer will have 64 neurons and 3 image channels. It also uses `relu` as the activation function.

### Adding another max-pooling layer
We add another max-pooling layer as follows:

```python
layers.MaxPooling2D(),
```

### Adding the flattening layer
We add the flattening layer as follows:

```python
layers.Flatten(),
```

We can also add another hidden layer on top of these layers to further fine-tune the CNN and enhance its performance during classification.

```python
layers.Dense(128, activation='relu'),
```

This is a `Dense` layer and it will have 128 neurons. It will also use `relu` as the activation function. We finally add the output layer.

### Adding the final output layer
We add the final output layers as follows:

```python
layers.Dense(dataset_classes,activation='softmax')
```

This layer takes the five initialized classes as input. It uses `softmax` as the activation function because the dataset has more than two classes (five classes).

We have initialized the CNN and added all the layers. To further understand CNN in detail and all its layers read this complete [article](/engineering-education/basics-of-convolution-neural-networks/) on CNN.

The next step is to compile the CNN.

#### Compiling the CNN
We compile the CNN as follows:

```python
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])
```

The compile function has the following important parameters:
- `optimizer` - We set the optimizer as `Adam`. It will enhance and improve the performance of the convolution neural network. It also handles the errors the CNN may have in training.
- `loss` - It is the function that accumulates all the errors that the CNN encounters while still in training. We use `SparseCategoricalCrossentropy` since the image dataset has multiple classes (five classes).
- `metrics` - It is the function that will get the overall CNN accuracy score after the training. We set its value to `accuracy`.

Let's also set the number of epochs or iterations for CNN.

```python
epochs=10
```

The next step is to fit the CNN.

### Fitting the CNN
We fit the CNN on the `training_images` and the `validation_images`. The convolution neural network will learn from training images so that they can perform image classification. We also pass the set epochs the CNN will loop through the images.

```python
CNN_model = model.fit(
  training_images,
  validation_data=validation_images,
  epochs=epochs
)
```

The code above will train the CNN and give the following output:

![CNN ouput](/engineering-education/building-an-image-classification-model-with-gradio-and-keras/cnn-output.png)

The output shows the CNN `loss`, `accuracy`, and `val_accuracy` score during each epoch. The initial `loss` score is `1.3735` and the final one is `0.0554`. It shows that CNN errors have reduced over time.

The initial `accuracy` score is `0.4014` and the final score is `0.9873`. It shows that the CNN performance has improved as the number of epochs increased. The `val_accuracy` score also increases from `0.4286` to `0.5932`.

The final accuracy score is `0.9873` (98.73%), it a very good score after the ten epochs. It shows that CNN was well trained and it can be used for image classification.

### Using the CNN for image classification
To use the CNN for image classification, we will create a function that will take an input image and return/output the classification results. We create the function as follows:

```python
def predict_input_image(img):
  img_4d=img.reshape(-1,180,180,3)
  prediction=model.predict(img_4d)[0]
  return {flower_classes[i]: float(prediction[i]) for i in range(5)}
```

The function is called `predict_input_image`. The input image must be in four dimensions for the function to work. The function will use `img.reshape` method to convert the input image to four dimensions. The `model.predict` will classify the input image.

The function then returns a dictionary with each predicted class and its corresponding probability. The class with the highest probability will be the correct prediction or classification.

We will then use Gradio to produce a user interface that will allow interaction with the trained CNN. The user will use the generated Gradio UI to input an image for the created function above to make classifications.

Let's implement Gradio.

### Implementing Gradio
Before we implement the Gradio user interface we have to specify the size of the image that Gradio's input component will hold. We also specify the number of labeled classes in the image dataset.

- Specifying the size of the image
  We specify the size as follows:

```python
image = gr.inputs.Image(shape=(180,180))
```

- Specifying the labeled classes
  We specify the labeled classes as follows:

```python
label = gr.outputs.Label(num_top_classes=5)
```

The user will upload/drag and drop a flower image in the Gradio UI, the trained CNN then will classify the image and output the classification

We create and launch the Gradio UI in Google Colab as follows:

#### Creating and launching the Gradio UI

```python
gr.Interface(fn=predict_input_image, inputs=image, outputs=label,interpretation='default').launch(debug='True')
```

The `gr.Interface` function will create the UI. It takes in the created `predict_input_image` function which will classify the input image. It takes in the `image` as the input and it will output the labeled class. 

The `launch` method will launch the Gradio UI as shown in the output below:

![Launched Gradio UI](/engineering-education/building-an-image-classification-model-with-gradio-and-keras/launched-gradio-ui.png)

The image above shows the launched Gradio UI. Using the Gradio UI, we can drop the image there or upload the image to be classified. Let us upload an image.

### Uploading an image to be classified
The image below shows the flower image we have uploaded to be classified:

![Uploaded image](/engineering-education/building-an-image-classification-model-with-gradio-and-keras/uploaded-image.png)

The output above shows the uploaded image. We then click the `Submit` button to view the classification output. After clicking the `submit` button, we get the following output:

![Classification output](/engineering-education/building-an-image-classification-model-with-gradio-and-keras/classification-output.png)

The output shows the prediction probability for each of the five classes. The `daisy` class has 100% probability with the rest of the classes having 0% probability. `daisy` class has the highest probability and it is the correct classification.

### Conclusion
In this tutorial, we have learned how to build an image classification model with Gradio and Keras. We discussed how to install and import the Gradio library. 

We then installed and imported the other important libraries for this tutorial. We also prepared the images in our dataset before feeding the convolutional neural network.

We added the image normalization/standardization layer, convolution layers, max-pooling layers, and the final output layer. We then compiled and trained the convolutional neural network. After training, we created the Gradio UI. 

We used the generated Gradio UI to input an image for the trained convolutional neural network to make image classifications. The convolutional neural network was able to accurately classify the input image.

You can get the complete implementation of this tutorial in Google Colab [here](https://colab.research.google.com/drive/1KwFISB9eBuAn3owW0HGMFXOgDwxIEqFV?usp=sharing)

### References
- [Gradio documentation](https://gradio.app/)
- [Keras documentation](https://keras.io/)
- [TensorFlow documentation](https://www.tensorflow.org/)
- [Basics of convolution neural networks](/engineering-education/basics-of-convolution-neural-networks/)
- [Image preprocessing in Python](/engineering-education/image-preprocessing-in-python/)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)