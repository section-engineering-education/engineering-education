# How To Build Deep learning Models Using Tensorflow With Python

## Prerequisites
To get along, you should ;
- Have a little knowledge about deep learning models and machine learning
- Be farmiliar with deep learning basics and how to go about it, you refer to this article [Introduction to Deep Learning](https://www.section.io/engineering-education/introduction-to-deep-learning/) to learn more about deep learning
## Introduction
Giving a look at the world today, you’ll realize that many applications that are used on our daily lives have been built comprising deep learning. 
Deep learning is a subset of machine learning that mimics the neuron of the human brain, 
it allows the computer to be able to do human tasks by imitating the human thinking process.
Deep Learning Models create a network that resembles biological nervous system.Frameworks used to build these deep learning models include caffee, Microsoft cognitive tool, MXNET, Keras, DeepLearning4j and Tensorflow. 
Keras and Tensorflow are the mostly used frameworks.

### *Table of content*
- [Importance of deep learning](#importance-of-deep-learning)
- [What is Tensorflow?](#what-is-tensorflow?)
- [Merits and demerits of tensorflow](#merits-and-demerits-of-tensorflow)
  - [*Merits*](#*merits*)
   - [*Demerits*](#*demerits*)
- [Steps of Tensorflow algorithm](#steps-of-tensorflow-algorithm)
- [Conclusion](#conclusion)

#### **Importance of deep learning**
It has the capacity to process several features hence making it best in operating with unstructured data. Deep learning technology is able to lead to a dramatic development in our day-to- day quality of life by helping us predict, plan, make and apply better decision.

With knowledge in modelling deep learning neural networks and a better understanding in probabilistic methods one should be able start his/her career in deep learning with ease.
Some of the modelling deep learning neural networks that will may be of great help in your career include ADAM, CNN, LSTM, Dropout, RNN, etc. 

#### __What is Tensorflow?__
TensorFlow <span style="color:green">is a free, open-source machine learning software that can be used from start to end.
</span> It has a large, flexible set of operators, libraries, and community resources that allow academics to advance the state-of-the-art in machine learning and developers to quickly construct and deploy machine learning applications.
Tensorflow was developed in 2015 by google.

#### **Merits and Demerits of TensorFlow**
The following are some of the advantages of tensorflow ;

#### Merits
- Tensorflow is very compatible with a lot of languages like;  Javascript, Python, C#, Swift, C++, and Ruby hence the user may be choose any language to use tensorflow.
- TensorFlow is used for deep learning development because it allows for the creation of neural networks using graphs that represent operations as nodes.It operates in multiple domains, including motion detection, image recognition, time series, voice detection, and many others, and thus meets the needs of a user. Hence it offers graphical support in deep learning.
- Tensorflow is Keras friendly. It is compatible with Keras, allowing users to program several high-level functionality areas. Keras will provide TensorFlow with system-specific functionality like pipelining, estimators, and eager execution.

- Tensorflow is an open source and free platform that makes it accessible to all nearby users and is ready for any system upgrade.

#### Demerits
- TensorFlow has a low speed in relation to its competitors. It also has less usability compared to other components.
- TensorFlow has only NVIDIA support for GPU and python for GPU system support, it has no other support.
- TensorFlow delays in providing symbolic loops for endless sequences. It has its own straight-forward application, which makes it a useful program. It is therefore referred to as a low-level API.
- It releases new versions every two to three months, increasing the time it takes for the user to install and integrate it with his or her existing system.

#### __Steps of Tensorflow algorithm__
1. Import the data i.e
```python
import TensorFlow as tf

import TensorFlow_datasets as tendata
```

2. Tranformation of data
3. Set the Algorithm's Parameters
4. Set then initialize the variables and Placeholders
5. Develop a model structure
6. Define the Loss Function
7. Train the model and analyze the performance
8. Make a prediction about the outcome

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
Tensorflow has really coding look great, alot of deep learning models have been made using it. With the steps given, one will be able to deploy a deep learning model using tensorflow. I really hope this article was of good help to you, the content in it is useful to beginners and intermidiate individuals practicing machine learning/deep learning. For beginners you'll have to do more coding so that you may farmiliarise with the procedures/steps.
I'll provide details of some articles that will help you learn more about deep learning/machine learning and keras. To learn more about ;
- Deep learning [click here](ibm.com/cloud/learn/deep-learning)  
- Machine learning [click here](https://www.w3schools.com/python/python_ml_getting_started.asp)
- Keras [click here](https://machinelearningmastery.com/tutorial-first-neural-network-python-keras/)
- Tensorflow [click here](https://www.tensorflow.org/learn)
















