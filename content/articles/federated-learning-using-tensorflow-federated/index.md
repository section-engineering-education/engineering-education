---
layout: engineering-education
status: publish
published: true
url: /federated-learning-using-tensorflow-federated/
title: Federated Learning using TensorFlow Federated (TFF)
description: In this article, we will learn how TensorFlow Federated can be utilized for image classification.
author: willies-ogola
date: 2021-08-12T00:00:00-02:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /federated-learning-using-tensorflow-federated/hero.png
    alt: federated learning example image
---
To train a machine learning model, you have both the model and the data on the same device. We call this centralized machine learning. This means that companies such as Google upload our private data to the cloud to train their machine learning models. Federated Learning flips this paradigm. 
<!--more-->
To train a machine learning model, you have both the model and the data on the same device. We call this centralized machine learning. This means that companies such as Google upload our private data to the cloud to train their machine learning models. Federated Learning flips this paradigm. Instead of sending our data to the cloud, we send cloud-based models to our devices. These models are then trained locally on our devices. Essentially, data never leaves our devices. Once we have trained these models locally, we send the updated models to the server rather than sending our data. The server aggregates the model updates from each of the devices and updates the global model on the cloud. This is Federated Learning.
TensorFlow Federated is an open-source framework by Google that is used to implement Federated Learning.
In this article, we will learn how TensorFlow Federated can be utilized by researchers and machine learning developers to implement federated learning on our own datasets.

### Prerequisites
To understand the contents of this article, you need to be familiar with:

1. The Python programming language.
2. The TensorFlow machine learning framework.
3. Introduction to Federated Learning. 

### Outline
1. [Introducing TensorFlow Federated (TFF)](#introducing-tensorflow-federated-tff)
2. [The code behind TensorFlow Federated (TFF)](#the-code-behind-tensorflow-federated-tff)
3. [Wrapping up](#wrapping-up)
4. [Additional resources](#additional-resources)

### Introducing TensorFlow Federated (TFF)
TFF is an open-source framework for Federated learning performed on decentralized data. It is a project by the team at Google and has been rapidly evolving over the recent years. TFF has three main features:

1. TFF is architecture-agnostic. 

This means that it is able to compile all code into an abstract representation. Its abstract representation nature enables it to be deployed in diverse environments.

2. TFF saves effort.

It is designed to mitigate the pain points that we developers face when developing our own federated learning systems. Some of these pain points include interleaving the different types of logic, the global vs local perspective on communication, and tension between the order of construction vs. execution.

3. TFF has many extensions.

Differential privacy, compression, and quantization are some of the few extensions available in TFF.

#### TensorFlow federated layers
TFF offers two main layers:

1. Federated Learning (FL) API 

The FL API is a high-level API that implements federated training and evaluation. It can be applied to your existing TensorFlow models or data.

2. Federated Core (FC) API

The FC API is much more lower-level and sits below the FC API. This API gives you more generic expressions that allow you to run and simulate custom types of computations and control your own orchestrations. It also has a local runtime which allows for simulations.

> In this tutorial, we will only be focusing on the FL API and the code behind it. This is to avoid the tutorial becoming too long. We will tackle the FC API in my next article.

#### Ways to get involved
There are different ways you can get involved depending on your interest:

1. ML developer. As a machine learning developer, you can apply Federated Learning APIs to existing TensorFlow models.

2. FL researcher. As a federated learning researcher, you can help to design new federated learning algorithms using the FC API.

3. Systems researcher. As a systems researcher, you can help in optimizing generated computation structures.

4. System developer. As a system developers, you can help integrate TFF with new types of development environments.

### The code behind TensorFlow Federated (TFF)
First, let's briefly take a look at how the Keras model looks like:

```python
    def create_compiled_keras_model():
        model = tf.keras.models.Sequential([
            tf.keras.layers.Dense(
                10, activation=tf.nn.softmax, kernel_initializer = 'zeros', input_shape = (784, 
                )
            )
        ])

        model.compile(
            loss=tf.keras.losses.SparseCategoricalCrossentropy(),
            optimizer=tf.keras.optimizers.SGD(learning_rate=0.02),
            metrics=[tf.keras.metrics.SparseCategoricalAccuracy()] 

        )
    return model
```

If you're familiar with TensorFlow, the above Keras code already looks familiar to you. For those not familiar with the keras model, the model uses a `Sequential()` API as it allows us to create models layer-by-layer. This is ideal for solving simple neural network problems like is the case in our tutorial. However, it isn't ideal for use in complex networks that share layers or have many inputs/outputs such as the residual and siamese networks. In that case, `functional` API's are used. The functional API has much more flexibility as one can easily define models where layers connect to more than just the previous and next layers. Refer to this [video](https://www.youtube.com/watch?v=EvGS3VAsG4Y) to understand these differences in depth.

We will import it into our main function `model_fn` using the `create_compiled_keras_model()` method.

```python
    def model_fn():

        keras_model = create_compiled_keras_model()

        return tff.learning.from_compiled_keras_model(keras_model, sample_batch)
```
The above code represents where you will plug in your own Keras model.

```python
     state = train.initialize() 

    for _ in range (5):
        state, metrics = train.next(state, train_data)
        print (metrics.loss) 

```

In the above code, the `initialize()` method will get our initial server state. It then calls `train.next` which will run our federated training. So, this includes sending the initial server state to each of the clients. Each of the clients will run their own local rounds of training and send their updates back to the server. Back on the server, we'll get this new aggregated global model that's been produced from the decentralized data of each of the clients.  

```python
    eval = tff.learning.build_federated_evaluation(model_fn)
    metrics = eval(state.model, test_data)
```

Finally, we can perform federated evaluation to understand the state of our trained model. The method `build_federated_evaluation()` method will provide federated evaluation for you. 

Here's how the whole code looks like for TFF:

```python

    train_data, test_data = 
    tff.simulation.datasets.emnist.load_data()

    def model_fn():

        keras_model = create_keras_model()

        return tff.learning.from_keras_model(keras_model, sample_batch)
    
    train = tff.learning.build_federated_averaging_process(model_fn)

    state = train.initialize() 

    for _ in range (5):
        state, metrics = train.next(state, train_data)
        print (metrics.loss) 

    eval = tff.learning.build_federated_evaluation(model_fn)
    metrics = eval(state.model, test_data)
```
In summary, the general components for the FL API include:

1. Models

- `tff.learning.Model`

- `create_keras_model()`

2. Federated computation builders

TFF provides two builder functions:

- `tff.learning.build_federated_averaging_process` generates the federated computations for federated training.

- `tff.learning.build_federated_evaluation` generates the federated computations for federated evaluation.

**Now that we have an idea about the FL API, let's use the MNIST training example to introduce the Federated Learning (FL) API layer of TFF.** 

#### Step 1: Installing TensorFlow Federated

Please make sure to install TensorFlow Federated before importing it into your notebook. Failure to do this might give you an error. We do this by typing the following commands:

```python
pip install tensorflow-federated --upgrade
```
This will install TensorFlow Federated into your project. Let's now import them into our notebook.

#### Step 2: Importing dependencies into our notebook

```python
import tensorflow as tf
import tensorflow_federated as tff
```
We've imported both tensorflow and tensorflow federated into our project.

#### Step 3: Simulation dataset

```python
emnist_train, emnist_test = tff.simulation.datasets.emnist.load_data()
def client_data(n):
  return emnist_train.create_tf_dataset_for_client(source.client_ids[n]).map(
      lambda e: (tf.reshape(e['pixels'], [-1]), e['label'])
  ).repeat(10).batch(20)
  
```
The simulation dataset used is the federated version of the MNIST dataset called NIST and is provided by the [Leaf project](https://github.com/TalwalkarLab/leaf). Leaf provides benchmarking framework for learning in federated settings such as federated learning. 

Why a federated version of the dataset? 

It's because the dataset in FL is obtained from multiple users. This poses a unique set of challenges that normal versions of dataset don't exhibit. We import it into our project by using the `load_data()` function. 

#### Step 4: Training using Federated data

```python

train_data = [client_data(n) for n in range(3)]

trainer = tff.learning.build_federated_averaging_process(
  model_fn,
  client_optimizer_fn=lambda: tf.keras.optimizers.SGD(0.1))
state = trainer.initialize()
for _ in range(50):
  state, metrics = trainer.next(state, train_data)
  print(metrics['train']['loss'])
```
In the training bit, you'll notice that we are only using a subset of client devices are selected to recieve the training model. As much as we have many devices on the network, not all devices are eligible. At any given time, only a few devices may have relevant data to solve your problem. Thus, only a subset of devices are selected.

```python
12.931682
13.094639
12.765134
11.813275
11.521152
10.681865
10.033001
......
......
......
0.038877
0.03537092
0.032601092
0.030380366
0.028545696
0.02700758
```

In TFF, after the model has been trained on the selected devices, results are obtained and loss calculated. In our experiment, we can notice that the training loss is decreasing after each round of federated training, indicating that the model is converging. We've set our training to go for 50 rounds. Our training loss at the end of the training is `0.02700758` down from `12.931682` recorded at the start of the training. In realistic deployments, users can and go depending on the availability of a device at a given time. This means that one would randomly select a sample of users for each round. However, to make things simple, and so that the system can converge quickly, we'll reuse the same users. For real-world deployments, please consider that factor.

#### Summary of the implementation

We encourage you to play around with the parameters (e.g., batch sizes, number of users, epochs, learning rates, etc.), to modify the code on my colab to simulate training on random samples of users. For all the code, we have implemented Federated Learning for Image classification using Tensorflow Federated on my [Google Colab](https://colab.research.google.com/drive/1EuSVn6gVVKy0pI_m1nooCd181v6ym5J-?authuser=1#scrollTo=0QIjHnqpGUy4). You may check it out.

### Wrapping up
That was a simple introduction to TensorFlow Federated and the FC API. We used the MNIST training example to introduce the Federated Learning (FL) API layer of TFF. The code I've shown above is open-source and is available on Github. You can access it using this [link](https://github.com/tensorflow/federated). There are many ways to get involved as mentioned in the tutorial such as being a system developer, ML developer, and an ML researcher. You can check out this cool online [comic book](http://federated.withgoogle.com/) from [GoogleAI](https://ai.google/) that will help you learn Federated Learning easily using illustrated graphic art. 

Remember, with Federated Learning, we can learn from everyone, without learning about anyone.

![Graphic art for Federated learning](/engineering-education/federated-learning-using-tensorflow-federated/federated-learning.png)

*[Image Source: Federated Learning](https://federated.withgoogle.com/)*

Make sure to try out the code yourself as it'll help you grasp TFF concepts faster!

### Additional resources
1. [Federated Learning for Mobile Keyboard Prediction](https://arxiv.org/pdf/1811.03604.pdf)
2. [TensorFlow Federated](https://github.com/tensorflow/federated)
3. [TensorFlow Federated: Machine Learning on Decentralized Data](https://www.tensorflow.org/federated)
4. [An online comic book from GoogleAI to learn Federated learning](http://federated.withgoogle.com/)
5. [Federated Learning for Image Classification](https://github.com/tensorflow/federated/blob/master/docs/tutorials/federated_learning_for_image_classification.ipynb)
