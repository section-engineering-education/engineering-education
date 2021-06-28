---
layout: engineering-education
status: publish
published: true
url: /edge-tf-lite/
title: Machine Learning on Edge Devices Using TensorFlow Lite
description: This article details machine learning on edge computing devices which use TensorFlow Lite and RaspberryPi. Talking about the advantages of on-device machine learning inference such as Latency, Bandwidth, privacy, and security.
author: rohan-reddy
date: 2020-07-30T00:00:00-10:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/edge-tf-lite/hero.jpg
    alt: edge device example image
---
[Edge Devices](https://en.wikipedia.org/wiki/Edge_device) are computing devices that live at the "edge" of the network and perform work in the exact location that is needed. Edge devices include [IoT devices](https://en.wikipedia.org/wiki/Internet_of_things), [smart home equipment](https://www.pcmag.com/news/the-best-smart-home-devices-for-2020) and computers embedded as household or industrial items. IoT devices are growing rapidly and continue to do so for the next couple of years.
<!--more-->

![img](/engineering-education/edge-tf-lite/logo.png)


![img](/engineering-education/edge-tf-lite/traditional.png)

Image Source: [Udacity](https://www.udacity.com/)

The above diagram shows the traditional flow of data in a machine learning system. A device collects information from the environment, which is sent via a network connection to a back-end server that performs inference. The server sends some data back to the device if necessary.

![img](/engineering-education/edge-tf-lite/edge.png)

Image Source: [Udacity](https://www.udacity.com/)

But we can perform inference on the device itself, we get to skip a bunch of steps. **There are huge advantages to this**.

* **Bandwidth**. Instead of sending a lot of data to the server and back, we can use on-device inference to send tiny amounts of data when needed. This is useful
for remote places with no proper internet.
* **Latency**. Sending data to a server involves a round-trip delay which gets in the way when working with real-time data. This is no longer an issue when our model
is at the edge. When inference is super fast we can solve high-performance actions like real-time object tracking for a robot.
* **Privacy and Security**. When data stays on device users benefit from increased privacy and security since personal information never leaves their devices. This benefits privacy-sensitive applications like security webcams and health-care data.

### RaspberryPi + TensorFlow Lite

The [Raspberry Pi](https://www.raspberrypi.org/) (R Pi) is a low cost, very small computer that runs a Linux-based operating system called [Raspbian or Raspberry Pi OS](https://www.raspberrypi.org/downloads/). It's often used for building prototype devices since it has fairly typical hardware specifications and it's easy to connect to sensors and peripherals like cameras.


[TensorFlow](https://www.tensorflow.org/) is a popular open-source machine learning framework, which is used for a variety of tasks. [TensorFlow Lite](https://www.tensorflow.org/lite/) is a lightweight library
for deploying models on mobile and embedded devices. It is a lighter, less-featured deep learning framework for on-device inference. TensorFlow lite provides APIs in Python (which we will be using on Raspberry Pi), Java (for Android) and Swift (for iOS). We can see Tensorflow lite in action in our day-to-day applications, for example - Gmail uses TensorFlow Lite for Smart Reply and Auto-Complete. Google Assistant uses it for Natural Language Processing and Understanding. TensorFlow Lite can be used where developing, inferring from and deploying TensorFlow models is not efficient in terms of memory or CPU capacity.



### How to use TensorFlow lite

TensorFlow lite has two main components:

* **TensorFlow Lite Converter**. Training a neural network is a time consuming process, especially if it is on a large dataset. So, we [*save*](https://www.tensorflow.org/tutorials/keras/save_and_load) a model in formats like [`.h5`](https://en.wikipedia.org/wiki/Hierarchical_Data_Format) or `SavedModel`. Saving a model makes it easier to share and deploy the model. TensorFlow lite converter is used to convert these models into an efficient form for use by the interpreter.

A `SavedModel` model for a simple image classification model trained on [MNIST](http://yann.lecun.com/exdb/mnist/) data has a size of 1.5 MB, the same model converted to `.tflite` is about 300 KB.

* **TensorFlow Lite Interpreter**. TensorFlow Lite Interpreter runs specially optimized models on many different hardware types, including mobile phones, embedded Linux devices, and microcontrollers.

The development workflow for using TensorFlow lite involves the following steps:

1. Choose a model. A model is a data structure that contains the logic and knowledge of a machine learning network trained to solve a particular problem. We can train our own model for custom business problems or obtain a pre-trained model from [TensorFlow Hub](https://www.tensorflow.org/hub).
2. Convert the model. TensorFlow lite is designed to execute models efficiently on mobile and other embedded devices with limited compute and memory resources. Some of this efficiency comes from the use of a special format for storing models. TensorFlow models must be converted into this format before they can be used by TensorFlow Lite. The [TensorFlow Lite converter](https://www.tensorflow.org/lite/convert) is a tool available as a Python API that converts trained TensorFlow models into the TensorFlow Lite format.
3. Run inference with the model. Inference is the process of running data through a model to obtain predictions. It requires a model, an interpreter, and input data.
4. Optimize the model. TensorFlow Lite provides tools to optimize the size and performance of your models, often with minimal impact on accuracy. [Model Optimization Toolkit](https://www.tensorflow.org/lite/guide/get_started#model_optimization_toolkit).

### Getting Started


The best way to run TensorFlow lite interpreter is running python scripts. You can build Tensorflow from source or install Tensorflow lite interpreter package using `pip`. For the former method visit the
documentation [guide](https://www.tensorflow.org/install/source_rpi). Building from source is useful when you want to [convert a model](https://www.tensorflow.org/lite/devguide#2_convert_the_model_format) or train a model.


The **awesome thing about TensorFlow lite** is that you don't need to be a machine learning expert to start doing cool experiments. The only pre-requisite is a basic knowledge of [Python](https://www.learnpython.org/). The most common applications of deep learning (like Object Detection, Pose Estimation, Smart Reply, ...) have been [implemented by the community](https://www.tensorflow.org/lite/models) and they are available for developers to use off-the-shelf.
In this article we will be performing [Image Classification](https://developers.google.com/machine-learning/practica/image-classification) one of the most common applications of deep learning.

#### Image Classification

An image classification model takes an image file and predicts what the image is or represents. An image classification model is trained to recognize various classes of images. For this tutorial we will use the `mnist` dataset and train a neural network to identify hand written digits (The most commonly used dataset). I use TensorFlow 2 (not TensorFlow lite) to build a model and train it, and then convert the model into TF lite model.

To install Tensorflow: `pip install tensorflow`.

```python
import tensorflow as tf
# prepping the data
fashion_mnist = tf.keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()
train_images = train_images / 255.0
test_images = test_images / 255.0

#building the model
model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10)
])

#train the model
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])
model.fit(train_images, train_labels, epochs=10)

#converting to TF Lite
model.save("my_model)
converter = tf.lite.TFLiteConverter.from_saved_model("my_model")
tflite_model = converter.convert()
interpreter = tf.lite.Interpreter(model_content=tflite_model)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
```

#### Image Classification with Pretrained Model

Run the following commands in the command line to set download the files and software.

`pip3 install https://dl.google.com/coral/python/tflite_runtime-2.1.0.post1-cp37-cp37m-linux_armv7l.whl`

`$ wget https://storage.googleapis.com/download.tensorflow.org/models/tflite/mobilenet_v1_1.0_224_quant_and_labels.zip`

We use the [MobileNet](https://arxiv.org/abs/1704.04861) image classification model. MobileNet is a [pretrained model](https://towardsdatascience.com/transfer-learning-from-pre-trained-models-f2393f124751), which means it has been trained on a very large dataset to classify over 1000 classes of images including people, objects, animals, etc.

`image-classification.py`

![img](/engineering-education/edge-tf-lite/steps.png)

Image Source: [TensorFlow.org](https://www.tensorflow.org)


```python
from tflite_runtime.interpreter import Interpreter
from PIL import Image
import numpy as np
#load the model
interpreter = Interpreter(model_path="mobilenet_v1_1.0.224.tflite")
#allocate memory for the model
interpreter.allocate_tensors()
#get model input tensors details.
input_details = interpreter.get_input_details()
#gets model output details. Returns a list of output details.
output_details = interpreter.get_ouptut_details()
#load image from memory
img = Image.open(filename).convert("RGB")
#preprocess the image
img = img.resize((224, 224))
#converting image to an numpy array
input_data = np.array(img)
#np.expand_dims expands the shape of an array. This is done to take into account the *batch* dimension.
input_data = np.expand_dims(input_data, axis=0)
#Point data to be used for testing the interpreter and run it
interpreter.set_tensor(input_details[0]["index"], input_data)
#invoke the interpreter for inference
interpreter.invoke()
#Obtain Results. The function get_tensor() returns a copy of the tensor data.
predictions = interpreter.get_tensor(output_details[0]["index"])
#The model outputs a probability for every class it has been trained on, we take the top 10 most probable classes.
top_indices = np.argsort(predictions)[::-1][:10]

print(labels[top_indices[0]], predictions[top_indices[0]])
```

We can expect sample input and output to be.

![img](/engineering-education/edge-tf-lite/doginput.png)

#### TensorFlow Lite and TensorFlow compatibility

TensorFlow lite supports a number of TensorFlow operations used for getting predictions. As TensorFlow operations are optimized for TensorFlow lite, they may be omitted or combined. Since the set of TensorFlow Lite operations is smaller than TensorFlow's, not every model is convertible. Even for supported operations, very specific usage patterns are sometimes expected, for performance reasons. Please refer to [this guide](https://www.tensorflow.org/lite/guide/ops_compatibility) for complete list of supported and unsupported operations.

### Conclusion

Machine Learning is a powerful tool which can help automate many tasks which are beyond the scope of classical programming, it is assumed that you need a powerful computing machine with a GPU to train models. But with the evolution of hardware and optimization of software for low-end computing devices, we can perform complex machine learning tasks on devices such as micro-controllers, mobile phones, smart home devices, etc.


### Resources & References
1. [Free Udacity Course](https://www.udacity.com/course/intro-to-tensorflow-lite--ud190)
2. [Full Code](https://github.com/tensorflow/examples/tree/master/lite/examples/image_classification/raspberry_pi)
3. [Image Classification](https://www.tensorflow.org/lite/models/image_classification/overview)
4. [TensorFlow Lite Guide](https://www.tensorflow.org/lite/guide)
5. [McKinsey Co](https://www.mckinsey.com/industries/private-equity-and-principal-investors/our-insights/growing-opportunities-in-the-internet-of-things)
