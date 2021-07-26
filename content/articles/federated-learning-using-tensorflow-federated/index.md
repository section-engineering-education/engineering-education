Federated learning is a privacy-preserving technology for training and evaluating machine learning models across a fleet of devices (e.g. Android phones), orchestrated by a central server, without sensitive training data leaving any user's device. On the other hand, TensorFlow Federated is an open-source framework for machine learning used in implementing federated learning.
In this article, we will learn how TensorFlow Federated can enable researchers and pioneers to simulate federated learning on their own datasets.

### Prerequisites

To understand the contents of this article, you need to be familiar with:

1. The Python programming language.
2. The TensorFlow machine learning framework.
3. Introduction to Federated Learning. 

### Outline

1. [Introducing TensorFlow Federated (TFF)](#introducing-federated-learning-tff)
    -[TensorFlow federated layers](#tensorflow-federated-layers)
    -[Ways to get involved](#ways-to-get-involved)
2. [The code behind TensorFlow Federated (TFF)](the-code-behind-tensorflow-federated-TFF)
3. [Wrapping up](#wrapping-up)
4. [Additional resources](#additional-resources)

### Introducing TensorFlow Federated (TFF)

TensorFlow Federated is an open-source framework for Federated learning perfomed on decentralized data. It is a new project by the team at Google and has been rapidly evolving over the recent years. TFF has two main features:

1. TFF is architecture-agnostic. 

This means that it is able to compile all code into an abstract representation. Its abstract representation nature enables it to be deployed in diverse environments.

2. TFF saves effort

It is designed to mitigate pain points that we developers face when developing our own federated learning systems. Some of these pain points include interleaving the different types of logic, the global vs local perspective on communication, and tension between the order of construction vs. execution.

#### TensorFlow federated layers

TFF offers two main layers:

1. Federated Learning (FL) API 

The FL API is a high-level API that implements federated training and evaluation. It can be applied to your existing TensorFlow models or data.

2. Federated Core (FC) API

The FC API is much more lower-level and sits below the FC API. This API gives you a more generic expressions that allows you to run and simulate custom types of computations and control your own orchestrations. It also has a local runtime which allows for simulations.

> In this tutorial, we will only be focusing on the FL API and the code behind it. This is to avoid the tutorial becoming too long. We will tackle the FC API in my next article.

#### Ways to get involved

There are different ways you can get involved depending on your interest:

1. ML Devs

ML devs helps in applying Federated Learning APIs to existing TensorFlow models.

2. FL researchers

This type of researchers help to design new federated learning algorithms using the FC API.

3. Systems researchers

This types of researchers help in optimizing generated computation structures.

4. System Devs

These developers help integrate TFF with new types of development environments.

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

If you're familiar with TensorFlow, the above keras code already looks familiar to you. We will import it into our main function `model_fn` using the `create_compiled_keras_model()` method.

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

In the above code the `initialize()` method will get our initial server state. It then calls `train.next` which will run our federated training. So, this includes sending the initial server state to each of the clients. Each of the clients will run their own local rounds of training and send their updates back to the server. Back on the server, we'll get this new aggregated global model that's been produced from the decentralized data of each of the clients.  

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

        keras_model = create_compiled_keras_model()

        return tff.learning.from_compiled_keras_model(keras_model, sample_batch)
    
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

- `create_compiled_keras_model()`

2. Federated computation builders

TFF provides two builder functions:

- `tff.learning.build_federated_averaging_process` generates the federated computations for federated training.

- `tff.learning.build_federated_evaluation` generates the federated computations for federated evaluation.

### Wrapping up

That was a simple introduction to TensorFlow Federated and the FC API. The code I've shown above is open-source and is available on Github. You can access it using this [link](https://github.com/tensorflow/federated). There are many ways to get involved as mentioned in the tutorial such as being system devs, ML devs, and ML researchers. You can check out this cool online [comic book](http://federated.withgoogle.com/) from [GoogleAI](https://ai.google/) that will help you learn Federated Learning easily using illustrated graphic art. 

Make sure to try out the code yourself as it'll help you grasp TFF concepts faster!

### Additional resources

1. [Federated Learning for Mobile Keyboard Prediction](https://arxiv.org/pdf/1811.03604.pdf)
2. [TensorFlow Federated](https://github.com/tensorflow/federated)
3. [TensorFlow Federated: Machine Learning on Decentralized Data](https://www.tensorflow.org/federated)
4. [An online comic book from GoogleAI to learn Federated learning](http://federated.withgoogle.com/)