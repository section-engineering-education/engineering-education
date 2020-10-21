---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-neural-networks/
title: Introduction to Deep Learning
description: This article serves as an introduction to neural networks, a functional unit of deep learning whose motivation is driven by how the brain works.
author: judy-nduati
date: 2020-10-21T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-neural-networks/hero.jpg
    alt: deep learning image example
---
In this article, we will be talking about neural networks. A functional unit of [deep learning](/engineering-education/introduction-to-deep-learning/) whose motivation is driven by how the brain works. These technologies give the best solutions to object recognition, speech recognition, pattern recognition, and natural language processing (NLP).
<!--more-->
### Introduction
This article will improve your understanding of neural networks. It will also give you an in-depth interpretation of how neural networks operate. This article will explain distinct kids of neural networks and their applications. By the end of this article, you will have attained an extensive understanding of what neural networks are.

### Neural Networks Overview
Neural Network are an operational element of deep learning. Neural networks takes in data; neurons recognize the patterns and predict the output.

A neural network is a technology that uses network functions to understand and convert input data into a desired output.

The essential building block of a neural network is a perceptron. Perceptrons accomplish simple signal processing (we will learn more about perceptrons later in this article). Neural networks are pretrained to solve data problems in speech recognition, image recognition, and pattern recognition, to name a few.

### How Neural Networks work
Neural Networks are complex systems with [artificial neurons](https://en.wikipedia.org/wiki/Artificial_neuron). The neurons receive many inputs and process a single output.

Neural networks are comprised of layers of neurons. These layers consist of the following:

- [Input layer](https://stackoverflow.com/questions/32514502/neural-networks-what-does-the-input-layer-consist-of)
- [Multiple hidden layers](https://deepai.org/machine-learning-glossary-and-terms/hidden-layer-machine-learning#:~:text=In%20neural%20networks%2C%20a%20hidden,inputs%20entered%20into%20the%20network.)
- [Output layer](https://www.scan2cad.com/user-manual/the-output-layer/)

The input layer receives data represented by a numeric value. Hidden layers perform the most computations required by the network. Finally, the output layer predicts the output.

In a neural network, neurons dominate one another. A neuron is a fundamental element of a neural network. Each layer is made of neurons. Once the input layer receives data, it is redirected to the hidden layer.

Computation occurs at the hidden layer, and information is sent to the output layer's neurons.
These neurons within the different layers are connected through channels. Each channel is assigned a number referred to as [weight](https://deepai.org/machine-learning-glossary-and-terms/weight-artificial-neural-network#:~:text=Weight%20is%20the%20parameter%20within,weight%2C%20and%20a%20bias%20value.).

Weight is a value in a neural network that converts input data within the network's hidden layers. Weights work by input layer, taking input data, and multiplying it by the weight value. It then initiates a value for the first hidden layer. The hidden layers transform the input data and passes it to the next layer. The output layer produces the desired output.

The inputs and the weights are multiplied, and their sum is sent to neurons in the hidden layer. Each neuron adds the inputs it receives to get the sum. This value then transits through the activation function.

The activation function outcome decides if a neuron is activated or not. An activated neuron transfer information into the other layers through the channels. In this approach, the data gets generated on the network.

In other words, this is [forward propagation](https://towardsdatascience.com/forward-propagation-in-neural-networks-simplified-math-and-code-version-bbcfef6f9250). Feed-forward propagation is the process of inputting data into an input node and getting a predicted output through the output node.

Feed-forward propagation takes place when the hidden layer accepts the input data. Process it as per the activation function and pass it to the output. The neuron in the output layer with the highest probability projects the result.

### Main Types of Neural Networks
Neural networks are identified based on mathematical performance and principles to determine the output.

For more types of neural networks, [check this article out.](https://medium.com/towards-artificial-intelligence/main-types-of-neural-networks-and-its-applications-tutorial-734480d7ec8e)

#### Perceptron
[Minsky and Papert](https://www.researchgate.net/publication/3081582_Review_of_&#39;Perceptrons_An_Introduction_to_Computational_Geometry&#39;_Minsky_M_and_Papert_S_1969) proposed the Perceptron model (Single-layer neural network). They said it was modeled after the functions of the human brain. It is one of the simplest models that can learn and solve complex data problems using [neural networks](https://www.mygreatlearning.com/blog/types-of-neural-networks/).

Perceptron network are comprised of two layers:
- [Input Layer](https://www.techopedia.com/definition/33262/input-layer-neural-networks)
- [Output Layer](https://www.techopedia.com/definition/33263/output-layer-neural-networks)

The input layer computes the weighted input for every node. The input layer computes the weighted input for every node. The activation function is pertained to get the result as output.

![Perceptron](/engineering-education/introduction-to-neural-networks/perceptron.png)

[Image source](https://missinglink.ai/wp-content/uploads/2018/11/Frame-3.png)

#### Feed Forward Neural Network
In a feed-forward network, data moves in a single direction. It enters via the input nodes and leaves through output. This is a front propagation wave. By data moving in one direction, there is no [backpropagation](https://www.guru99.com/backpropogation-neural-network.html). The backpropagation algorithm calculates the gradient of the loss function with consideration to weights in the network.

The input product sum and their weights are computed. The data later is transferred to the output.

A couple feed-forward neural networks applications are:

- Speech Recognition
- Facial Recognition

![Feed forward Network](/engineering-education/introduction-to-neural-networks/fnn.png)

[Image source](https://deepai.org/machine-learning-glossary-and-terms/feed-forward-neural-network)

#### Radial Basis Function Neural Network
[Radial Basis Function Neural Network (RBF](https://www.sciencedirect.com/topics/engineering/radial-base-function)) comprises of three layers:

- [Input Layer](https://stackoverflow.com/questions/32514502/neural-networks-what-does-the-input-layer-consist-of)
- [Hidden Layer](https://www.sciencedirect.com/topics/engineering/hidden-layer-neuron)
- [Output Layer](https://www.scan2cad.com/user-manual/the-output-layer/)

[RBF networks](https://www.sciencedirect.com/topics/chemical-engineering/radial-basis-function-networks) classify data based on the distance of any centered point and interpolation. Interpolation resizes images. Classification is executed by estimating the input data where each neuron reserve the data. RBF network looks for similar data points and groups them.

According to [Dr. Saed Sayad](https://www.saedsayad.com/artificial_neural_network_rbf.htm), the sum and weights of hidden layer output sent to the output layer form a network of outputs. RBF network is mostly used in the power restoration system. RBF neural network reduces the power shortage.

![Radial Basis Function Network](/engineering-education/introduction-to-neural-networks/rbn.png)

[Image source](https://miro.medium.com/max/500/0*Dezf_up8pNrdsl34.png)

#### Recurrent Neural Network
Neural networks such as a feed-forward network, move data in one direction. This type of network has a shortcoming of not remembering the data in past inputs. This is where RNN comes into play.

[A Recurrent Neural Network(RNN](https://www.sciencedirect.com/topics/engineering/recurrent-neural-network)) is a network whereby the hidden layer's output is saved from being used as input. Saving the output helps with future predictions.

RNNs have a memory that helps the network recall what happened earlier in the sequence data.
RNN process begins by each node, remembering some data in the previous step. While carrying out operations, neurons act as memory cells.

RNN goes with front propagation but recalls the data it will need to utilize later. If the projection backfires, backpropagation is used. Whereby the system grasps and projects towards making the right propagation.

![Recurrent Neural Network](/engineering-education/introduction-to-neural-networks/rnn.jpeg)

[Image source](https://deepai.org/machine-learning-glossary-and-terms/recurrent-neural-network)

RNN solves problems in text data and audio data. More simply, it solves problems in text-to-speech conversion. Learn more about text generation with RNN [here](/engineering-education/text-generation-nn/).

#### Convolution Neural Network
Convolutional Neural Network (CNN) is a peculiar kind of feed-forward neural network. CNN contains a three-dimensional neuron arrangement.

The first stage is the convolutional layer. Neurons in a convolutional layer only process information from a small part of the visual field(image). Input features in convolution are abstracted in batches.

The second stage is pooling. It reduces the dimensions of the features and, at the same time, sustaining valuable data. CNN launch into the third phase (fully connected neural network) when the features get to the right granularity level. At the final stage, the final probabilities are analyzed and decide which class the image belongs to.

This type of network understands the image in parts. It also computes the operations multiple times to complete processing the image. Image processing involves conversion from RGB to a grey-scale. After the image is processed, modifications in pixel value aid in identifying the edges. The images also get grouped into different classes. CNN is mainly used in signal and image processing.

![Convolutional Neural Network](/engineering-education/introduction-to-neural-networks/cnn.png)

[Image source](https://missinglink.ai/guides/neural-network-concepts/convolutional-neural-network-build-one-keras-pytorch/)

#### Modular Neural Network
A Modular Neural Network (MNN) is composed of unassociated networks working individually to get the output. The various neural networks do not interact with each other. Each network has a unique set of inputs compared to other networks.

MNN is advantageous because large and complex computational processes are done faster. Processes are broken down into independent components, thus increasing the computational speed.

![Modular Neural Network](/engineering-education/introduction-to-neural-networks/mnn.png)

[Image source](https://www.researchgate.net/publication/341628332/figure/fig4/AS:895309341274112@1590469789167/Modular-neural-network-structure.png)

### Applications of Neural Networks
Neural networks are effectively applied to several fields to resolve data issues.

- Facial Recognition

Neural networks are playing a significant role in facial recognition. Some smartphones can identify the age of a person. This is based on facial features and visual pattern recognition.

- Forecasting

Neural networks are trained to appreciate the patterns and identify the distinct kinds of weather. Forecasting, with the help of neural networks, not only predicts the weather. It also gives prediction to the market trends and mineral exploration sites.

- Music composition

Neural networks master patterns in sound and tune. Also, the network train itself adequately to create new music.

- Image processing and Character recognition

Neural networks can understand and learn patterns in an image. Image processing is a growing field. Image recognition is applied in:

- Facial recognition
- Cancer cells detection
- Satellite imagery processing for use in defense and agriculture.

Character recognition helps to detect fraud and national security assessments.

### Advantages of Neural Networks
- Fault tolerance

Some neurons not working, does not prevent neural networks from generating outputs.

- Real-time Operations

Neural networks can learn synchronously and easily adapt to changing surroundings.

- Adaptive Learning

Neural networks can learn how to work on tasks. This is based on the data given to produce the right output.

- Parallel processing capacity

Neural networks have the strength and ability to perform multiple jobs simultaneously.

### Disadvantages of Neural Networks
- Unexplained behavior of the network

Neural networks provide a solution to a problem. The problem is it does not give reasons for why and how. However, network trust is reduced.

- Determination of appropriate network structure

There is no specified rule for discovering a neural network procedure. A proper network structure is achieved by trying the best network.

- Hardware dependence

Neural network pieces of equipment are dependent on one another. Neural networks require processors with corresponding processing capacity.

- Difficulty in showing a network problem

Neural networks work with numbers. Problems have to be interpreted into numbers first before rendering output. This influences the network performance.

### Conclusion
The neural network is a field that is growing tremendously. Learning and understanding the concepts in this field is vital. This article grants you with an apprehension of what exactly is a Neural network and how it works. By exploring this field, you can apply neural networks in other areas to solve data problems. This article has also explained the different neural network kinds.
