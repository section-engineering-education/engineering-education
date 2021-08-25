---
layout: engineering-education
status: publish
published: true
url: /federated-learning-using-tensorflow-federated/
title: Federated Learning using TensorFlow Federated
description: This article will show the reader how TensorFlow Federated can be utilized for image classification.
author: willies-ogola
date: 2021-08-17T00:00:00-04:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/federated-learning-using-tensorflow-federated/hero.png
    alt: Federated Learning Example Image
---
Centralized machine learning involves having the model and the dataset on the same device. Companies such as Google upload data to the cloud to train their machine learning models. 
<!--more-->
Federated Learning flips this paradigm. Instead of transfering data to the cloud, we send cloud-based models to our devices. These models are then trained locally on our devices. 

Once we have trained these models locally, the updated models are sent to the server instead of data. The server checks these models and then updates the global model on the cloud. This process is referred to as `Federated Learning`.

TensorFlow Federated is an open-source framework by Google that is used to implement Federated Learning.

### Goal
In this article, we will learn how TensorFlow Federated can be utilized by researchers and machine learning experts to implement federated learning on datasets.

### Prerequisites
To understand the contents of this article, you need to be familiar with:
- The Python programming language.
- The TensorFlow machine learning framework.
- Federated Learning. 
- [NIST dataset](https://www.nist.gov/srd/nist-special-database-19)

### Outline
- [Introducing TensorFlow Federated (TFF)](#introducing-tensorflow-federated-tff)
- [The code behind TensorFlow Federated (TFF)](#the-code-behind-tensorflow-federated-tff)
- [Wrapping up](#wrapping-up)
- [Additional resources](#additional-resources)

### Introduction to TensorFlow Federated (TFF)
TFF is an open-source framework for Federated learning performed on decentralized data. It is spearheaded by Google and has gained popularity in the recent years. 

TFF has three main features:

1. TFF is architecture-agnostic. 

This means that it can compile all code into an abstract representation. As a result, it can be deployed in a diverse environment.

2. TFF saves effort.

It is designed to mitigate the pain points that we developers face when developing federated learning systems.

Some of these challenges include interleaving the different types of logic, the global vs local perspective on communication, and tension between the order of construction vs execution.

3. TFF has many extensions.

Some of the available extensions include differential privacy, compression, and quantization.

#### TensorFlow federated layers
TFF offers two main layers:

1. Federated Learning (FL) API 
The FL API is a high-level API that implements federated training and evaluation. It can be applied to existing TensorFlow models or data.

2. Federated Core (FC) API
FC is a low level framework below the Federated Learning API. This API provides generic expressions to run and simulate custom types of computations, as well as control your own orchestrations. It also has a local runtime that supports simulations.

> In this tutorial, we will focus on the FL API and the code behind it. 

#### Application of Federated learning
There are different ways you can get involved depending on your interest:

1. A machine learning developer can apply Federated Learning APIs to existing TensorFlow models.

2. A federated learning researcher can help to design new federated learning algorithms using the FC API.

3. A systems researcher can assist in optimizing generated computation structures.

4. A system developer can help in integrating TFF with different development environments.

### The code behind TensorFlow Federated (TFF)
First, let's briefly take a look at how the Keras model looks like:

```py
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

The `Keras` model uses a `Sequential()` API as it allows us to create models layer-by-layer. This is ideal for solving simple neural network problems. 

However, its not ideal for complex networks that share layers or have many inputs/outputs such as residual and siamese networks. 

In that case, `functional` APIs are used. The functional API has more flexibility since one can easily define models where layers connect to more than just the previous and next layers. 

Refer to the following video to understand these differences in depth:

<iframe width="478" height="269" src="https://www.youtube.com/embed/EvGS3VAsG4Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

We will import it into our main function `model_fn` using the `create_compiled_keras_model()` method.

```py
    def model_fn():

        keras_model = create_compiled_keras_model()

        return tff.learning.from_compiled_keras_model(keras_model, sample_batch)
```
The above code shows where you will add the Keras model.

```py
     state = train.initialize() 

    for _ in range (5):
        state, metrics = train.next(state, train_data)
        print (metrics.loss) 

```

In the above code, the `initialize()` method retrieves the initial server state. It then calls `train.next` which will run our federated training. This includes sending the initial server state to each of the clients. 

Each client will run its own local rounds of training and then send an update to the server. The server stores the new aggregated global model produced from the decentralized data.  

```py
    eval = tff.learning.build_federated_evaluation(model_fn)
    metrics = eval(state.model, test_data)
```

Finally, we can perform federated evaluation to understand the state of our trained model. The `build_federated_evaluation()` method helps to perform this federated evaluation. 

Here's how the whole code looks like for TFF:

```py

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

Let's use the MNIST training example to introduce the Federated Learning (FL) API layer of TFF. 

#### Step 1: Installing TensorFlow Federated
Please make sure to install TensorFlow Federated before importing it into your notebook. Failure to do this might result in an error.

We install TensorFlow Federated using the following command:

```py
pip install tensorflow-federated --upgrade
```

#### Step 2: Importing dependencies into our notebook
```py
import tensorflow as tf
import tensorflow_federated as tff
```
We've imported both `tensorflow` and `tensorflow federated` into our project.

#### Step 3: Simulation dataset
```py
emnist_train, emnist_test = tff.simulation.datasets.emnist.load_data()
def client_data(n):
  return emnist_train.create_tf_dataset_for_client(source.client_ids[n]).map(
      lambda e: (tf.reshape(e['pixels'], [-1]), e['label'])
  ).repeat(10).batch(20)
  
```
The simulation dataset used is the federated version of the MNIST dataset called NIST and is provided by the [Leaf project](https://github.com/TalwalkarLab/leaf). Leaf provides a benchmarking framework for federated learning. 

Why a federated version of the dataset? 

It's because the dataset in FL is obtained from multiple users. This poses a unique set of challenges that normal versions of the dataset don't exhibit. 

We import the federated data into the project using the `load_data()` function. 

#### Step 4: Training using Federated data
```py
train_data = [client_data(n) for n in range(3)]

trainer = tff.learning.build_federated_averaging_process(
  model_fn,
  client_optimizer_fn=lambda: tf.keras.optimizers.SGD(0.1))
state = trainer.initialize()
for _ in range(50):
  state, metrics = trainer.next(state, train_data)
  print(metrics['train']['loss'])
```

In the training bit, you'll notice that only a subset of client devices are selected to receive the training model. This is because not all devices are eligible. At any given time, only a few devices may have relevant data to solve your problem. 

```bash
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

In TFF, after the model has been trained on the selected devices, results are obtained and the loss calculated. 

In the experiment above, the training loss is decreasing after each round of federated training, indicating that the model is converging. 

We've set our training to go for 50 rounds. The training loss at the end of the training is `0.02700758` down from `12.931682` recorded at the start of the training. 

In realistic situations, users can join and exit the experiment freely. This means that one would randomly select a sample of users for each round. However, to make things simple, and allow the system to converge quickly, we'll reuse the same users.

#### Summary of the implementation
Feel free to modify parameters such as batch sizes, number of users, epochs, and learning rates to simulate training on random users. 

### Conclusion
This was a simple introduction to TensorFlow Federated and the FC API. We used the MNIST training example to introduce the Federated Learning (FL) API layer of TFF. 

The code I've shown above is open-source and available on Github. You can access it using this [link](https://github.com/tensorflow/federated). 

Remember, with Federated Learning, we can learn from everyone, without learning about anyone.

### Additional resources
- [Federated Learning for Mobile Keyboard Prediction](https://arxiv.org/pdf/1811.03604.pdf)
- [TensorFlow Federated](https://github.com/tensorflow/federated)
- [TensorFlow Federated: Machine Learning on Decentralized Data](https://www.tensorflow.org/federated)
- [An online comic book from GoogleAI to learn Federated learning](http://federated.withgoogle.com/)
- [Federated Learning for Image Classification](https://github.com/tensorflow/federated/blob/master/docs/tutorials/federated_learning_for_image_classification.ipynb)

---
Peer Review Contributions by: [Collins Ayuya](/engineering-education/authors/collins-ayuya/)
