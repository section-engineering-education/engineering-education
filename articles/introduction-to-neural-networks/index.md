---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-neural-networks/
title: Introduction to Deep Learning
description: This article serves as an introduction to
author: judy-nduati
date: 2020-10-19T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-neural-networks/hero.jpg
    alt: deep learning image example
---
In this article, we will be talking about neural networks. A functional technique of deep learning whose motivation is by how the brain works.
<!--more-->
### Introduction
This article aims to make you understand what neural networks are. It will also give you a depth interpretation of how neural networks operates. This article will explain distinct kids of neural networks and their applications. By the end of this article, you will have attained an extensive understanding of what neural network is.

### Neural Networks Overview

Neural Network is an operational element of deep learning. Deep learning uses neural networks, which mimics human behavior to solve problems. The neural network takes in data. Neurons recognize the patterns and predict the output.

A neural network is a technology that uses network functions to understand and convert input data into the [desired output](https://deepai.org/machine-learning-glossary-and-terms/neural-network). The neural network's inspiration is by how the human brain works.

The essential building block of a neural network is a perception. Perception accomplishes simple signal processing. Neural networks are pertained to solve data problems in Speech recognition, image recognition, and pattern recognition, to name a few.

### How Neural Networks work

Neural Networks are complex systems with artificial neurons. The neurons receive many inputs and process a [single output](https://www.upgrad.com/blog/neural-network-architecture-components-algorithms/#:~:text=Neural%20Networks%20are%20complex%20structures,input%20into%20a%20meaningful%20output).

Neural networks comprise layers of neurons. The layers consist of the:

- [Input layer](https://stackoverflow.com/questions/32514502/neural-networks-what-does-the-input-layer-consist-of)
- [Multiple hidden layers](https://deepai.org/machine-learning-glossary-and-terms/hidden-layer-machine-learning#:~:text=In%20neural%20networks%2C%20a%20hidden,inputs%20entered%20into%20the%20network.)
- [Output layer](https://www.scan2cad.com/user-manual/the-output-layer/)

The input layer receives data represented by a numeric value. Hidden layers perform most computations required by the network. Finally, the output layer predicts the output.

In a neural network, neurons dominate one another. A neuron is an object that holds a numeral value that is between 0 and 1. Each layer is made of neurons. Once the input layer receives data, it is redirected to the hidden layer. At the hidden layer, computation occurs, and information is sent to the neurons of the output layer. Neurons in different layers are connected through channels. Each channel is assigned a number referred to as weight.

The inputs and the weights are multiplied, and their sum is sent to neurons in the hidden layer. Each neuron adds the inputs it receives to get the sum. This value then transits through the activation function.

The activation function outcome decides if a neuron is activated or not. An activated neuron transfer information in the other layers through the channels. In this approach, the data gets generated on the network. In other words, this is [forward propagation](https://towardsdatascience.com/forward-propagation-in-neural-networks-simplified-math-and-code-version-bbcfef6f9250).

Feed-forward propagation takes place when the hidden layer accepts the input data. Process it as per the activation function and pass it to the output. The neuron in the output layer with a higher probability projects the result.

### Main Types of Neural Networks

Neural network classification depends on their layers, structure, neurons, data flow, and [density](https://www.mygreatlearning.com/blog/types-of-neural-networks/).

For more types of neural networks, [check this article out.](https://medium.com/towards-artificial-intelligence/main-types-of-neural-networks-and-its-applications-tutorial-734480d7ec8e)

#### Perceptron

[Minsky and Papert](https://www.researchgate.net/publication/3081582_Review_of_&#39;Perceptrons_An_Introduction_to_Computational_Geometry&#39;_Minsky_M_and_Papert_S_1969) proposed the Perceptron model (Single-layer neural network). They said it is modeled after the functioning of the human brain. It is one of the simplest models that can learn and solve complex data problems in [neural networks](https://www.mygreatlearning.com/blog/types-of-neural-networks/).

Perceptron network comprises of two layers:

- [Input Layer](https://www.techopedia.com/definition/33262/input-layer-neural-networks)
- [Output Layer](https://www.techopedia.com/definition/33263/output-layer-neural-networks)

The input layer computes the weighted input for every node. The input layer computes the weighted input for every node. The activation function is pertained to acquire the result as output.

![Perceptron](/engineering-education/introduction-to-neural-networks/perceptron.png)

[Image source](https://missinglink.ai/wp-content/uploads/2018/11/Frame-3.png)

#### Feed Forward Neural Network

In a feed-forward network, data moves in a single direction. It enters via input nodes and leaves through [output nodes](https://analyticsindiamag.com/6-types-of-artificial-neural-networks-currently-being-used-in-todays-technology/). This is a front propagation wave. By data moving in one direction, there is no backpropagation.

The input product sum and their weights are computed. The data later is transferred to the output.

Feed-forward neural networks applications are:

- Speech Recognition
- Facial Recognition

![Feed forward Network](/engineering-education/introduction-to-neural-networks/fnn.png)

[Image source](https://deepai.org/machine-learning-glossary-and-terms/feed-forward-neural-network)

#### Radial Basis Function Neural Network

[Radial Basis Function Neural Network (RBF](https://www.sciencedirect.com/topics/engineering/radial-base-function)) comprises of three layers:

- [Input Layer](https://stackoverflow.com/questions/32514502/neural-networks-what-does-the-input-layer-consist-of)
- [Hidden Layer](https://www.sciencedirect.com/topics/engineering/hidden-layer-neuron)
- [Output Layer](https://www.scan2cad.com/user-manual/the-output-layer/)

[RBF networks](https://www.sciencedirect.com/topics/chemical-engineering/radial-basis-function-networks) classify data based on the distance of any centered point and interpolation. Interpolation resizes images. Classification is executed by estimating the inputs data where each neuron reserve the data. RBF network looks for similar data points and groups them.

According to [Dr. Saed Sayad](https://www.saedsayad.com/artificial_neural_network_rbf.htm), the sum and weights of hidden layer output sent to the output layer form a network of outputs. RBF network is mostly used in the power restoration system. RBF neural network reduces the power shortage.

![Radial Basis Function Network](/engineering-education/introduction-to-neural-networks/rbn.png)

[Image source](https://miro.medium.com/max/500/0*Dezf_up8pNrdsl34.png)

#### Recurrent Neural Network

[A Recurrent Neural Network(RNN](https://www.sciencedirect.com/topics/engineering/recurrent-neural-network)) is a network whereby the hidden layer's output is saved from being used as input. Saving the output helps with future predictions.

Its first layer formation is related to one in the feed-forward network. That is with the sum of inputs and weights. Once computed, the [RNN process](https://analyticsindiamag.com/6-types-of-artificial-neural-networks-currently-being-used-in-todays-technology/) begins by each node, remembering some data in the previous step. While carrying out operations, neurons act as memory cells.

RNN goes with front propagation but recalls the data it needs to utilize later. If the projection backfires, Backpropagation is used. Whereby the system grasps and projects towards making the right propagation.

![Recurrent Neural Network](/engineering-education/introduction-to-neural-networks/rnn.jpeg)

[Image source](https://deepai.org/machine-learning-glossary-and-terms/recurrent-neural-network)

RNN solves problems in text data and audio data. In other words, it solves problems in text-to-speech conversion.

#### Convolution Neural Network

Convolutional Neural Network (CNN) is a peculiar kind of feed-forward neural network. CNN contains a three-dimensional neuron arrangement.

According to [great learning](https://www.mygreatlearning.com/blog/types-of-neural-networks/), the first stage is the convolutional layer. Neurons in a convolutional layer only process information from a small part of the visual field(image). Input features in convolution are abstracted in batches.

The second stage is pooling. It reduces the dimensions of the features and, at the same time, sustaining valuable data. CNN launch into the third phase (fully connected neural network) when the features get to the right granularity level. At the final stage, the final probabilities are analyzed and decide which class the image belongs to.

This type of network understands the image in parts. It also computes the operations multiple times to complete processing the image. Image processing involves conversion from RGB to a grey-scale. After the image is processed, modifications in pixel value aid in identifying the edges. The images also get grouped into different classes. CNN is mainly used in signal and image processing.

![Convolutional Neural Network](/engineering-education/introduction-to-neural-networks/cnn.png)

[Image source](https://missinglink.ai/guides/neural-network-concepts/convolutional-neural-network-build-one-keras-pytorch/)

#### Modular Neural Network

A Modular Neural Network is composed of unassociated networks working individually to get the output. The various neural networks do not interact with each other. Each network has a unique set of inputs compared to other networks.

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

Some neurons, not working does not prevent neural networks from generating outputs.

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
