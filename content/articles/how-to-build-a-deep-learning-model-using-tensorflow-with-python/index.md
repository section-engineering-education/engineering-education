---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-deep-learning-model-using-tensorflow-with-python/
title: How To Build Deep learning Models Using Tensorflow With Python
description: 
author: 
date: 2021-11-19T00:00:00-18:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/how-to-build-a-deep-learning-model-using-tensorflow-with-python/hero.jpg
   alt: Implementing GANs example image
---


### Introduction
Looking at the world today, you’ll realize that many applications we use in our daily lives have been built using deep learning. Deep learning is a subset of machine learning that mimics the neuron of the human brain. It allows the computer to do human tasks by imitating human thinking.

Deep Learning Models create a network that resembles the biological nervous system. Frameworks used to build these deep learning models include Caffee, Microsoft cognitive tool, MXNET, Keras, DeepLearning4j, and Tensorflow. Keras and Tensorflow are the most used frameworks.

### Prerequisites
To get along, you should ;
- Have a little knowledge about deep learning models and machine learning
- Be familiar with deep learning basics and how to go about it. You refer to this article [Introduction to Deep Learning](https://www.section.io/engineering-education/introduction-to-deep-learning/) to learn more about deep learning

### Table of content
- [Importance of deep learning](#importance-of-deep-learning)
- [What is Tensorflow?](#what-is-tensorflow?)
- [Merits and demerits of Tensorflow](#merits-and-demerits-of-tensorflow)
  - [*Merits*](#*merits*)
   - [*Demerits*](#*demerits*)
- [Steps of Tensorflow algorithm](#steps-of-tensorflow-algorithm)
- [Conclusion](#conclusion)

#### **Importance of deep learning**
It can process several features, making it best to operate with unstructured data. As a result, deep learning technology can dramatically develop our day-to-day quality of life by helping us predict, plan, make, and apply better decisions.

With knowledge in modeling deep learning neural networks and a better understanding of probabilistic methods, one should start their career in deep learning with ease.
Some of the modeling deep learning neural networks that may be of great help in your career include ADAM, CNN, LSTM, Dropout, RNN, etc. 

#### __What is Tensorflow?__
TensorFlow <span style="color:green">is a free, open-source machine learning software that one can use from start to end.
</span> It has a large, flexible set of operators, libraries, and community resources that allow academics to advance state-of-the-art machine learning and developers to quickly construct and deploy machine learning applications.
Tensorflow was developed in 2015 by google.

#### **Merits and Demerits of TensorFlow**
The following are some of the advantages of Tensorflow ;

#### Merits
- Tensorflow is very compatible with many languages like;  Javascript, Python, C#, Swift, C++, and Ruby; hence the user may choose any language to use with Tensorflow.
- TensorFlow is used for deep learning development because it allows the creation of neural networks using graphs that represent operations as nodes. It operates in multiple domains, including motion detection, image recognition, time series, voice detection, and many others, thus meeting users' needs. With that, it offers graphical support in deep learning.
- Tensorflow is Keras friendly. It is compatible with Keras, allowing users to program several high-level functionality areas. In addition, Keras will provide TensorFlow with system-specific functionality like pipelining, estimators, and eager execution.

- Tensorflow is an open-source and free platform accessible to all nearby users and is ready for any system upgrade.

#### Demerits
- TensorFlow has a low speed in relation to its competitors. It also has less usability compared to other components.
- TensorFlow has only NVIDIA support for GPU and python for GPU system support. It has no other support.
- TensorFlow delays in providing symbolic loops for endless sequences. It has a straightforward application, which makes it a worthwhile program. It is therefore referred to as a low-level API.
- It releases new versions every two to three months, increasing the time it takes for the user to install and integrate it with their existing system.

#### __Steps of Tensorflow algorithm__
1. Import the data i.e
```python
import TensorFlow as tf
import TensorFlow_datasets as tendata
```

2. Transformation of data
3. Set the Algorithm's Parameters
4. Set then initialize the variables and Placeholders
5. Develop a model structure
6. Define the Loss Function
7. Train the model and analyze the performance
8. Predict the outcome

let's have an example;

```python
### we first import the data
import tensorflow as tf
              
 from tensorflow import keras
### we then go to transformation of data
fashiondata = tf.keras.datasets.mnist
### here is where we set the parameters
(x_train, y_train), (x_test, y_test)= fashiondata.load_data()
x_test.shape
x_train.shape
###here we set and initialize the variables and placeholders
x_train, x_test = x_train/255, x_test/255
### here is where we develop a model structure
model= tf.keras.model.sequential([tf.keras.layer.Flatten(input_shape=(28,28)),tf.keras.layer.Dense(128, activation =`relu`), tf.keras.layer.Dropout(0.2),tf.keras.layer.Dense(10, activation=`softmax`)])
### we then define the loss function
model.compile(optimizer= `adam`,loss=`sparse_categorical_crossentropy`, metrics[`accuracy`])
### training the model and analyse the performance
model.fit(x_train, y_train, epochs=5)
model.evaluate(x_test, y_test)
### we then make a prediction about the outcome
```

#### Conclusion
Tensorflow has made coding look great; many deep learning models have been made through it. With the steps given, the reader will deploy a deep learning model using Tensorflow. I hope this article was of good help to you. The content is helpful to beginners and intermediate individuals practising machine learning and deep learning. For beginners, you'll have to do more coding to familiarise yourself with the procedures.
I'll provide links for articles that will help you learn more about ***deep learning***, ***machine learning***, and ***Keras***. To learn more about ;
- Deep learning [click here](ibm.com/cloud/learn/deep-learning)  
- Machine learning [click here](https://www.w3schools.com/python/python_ml_getting_started.asp)
- Keras [click here](https://machinelearningmastery.com/tutorial-first-neural-network-python-keras/)
- Tensorflow [click here](https://www.tensorflow.org/learn)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

