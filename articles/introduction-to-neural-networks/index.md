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
In this article, we will be talking about neural networks. A functional unit of deep learning, this means a neural network accepts input and give output. Deep Learning uses Artificial Neural Networks(ANN). ANN imitates the human brain's behaviour to solve complex data problems.
These technologies solve problems in image recognition, speech recognition, pattern recognition, and natural language processing (NLP), to name a few. In this article, you will learn the basics of artificial neural networks or ANN. It will also give you an in-depth interpretation of how neural networks operate.
<!--more-->
The contents to be discussed include:
1. [Neural Networks Overview](#Neural-Networks-Overview)
2. [How Neural Networks Work](#How-Neural-Networks-work)
3. [Types of Neural Networks](#Types-of-Neural-Networks)
4. [Applications of Neural Networks](#Applications-of-Neural-Networks)
5. [Advantages of Neural Networks](#Advantages-of-Neural-Networks)
6. [Disadvantages of Neural Networks](#Disadvantages-of-Neural-Networks)
### Prerequisites
Neural Networks is a complex topic; therefore, I recommend the reader to have a basic understanding of [deep learning](/engineering-education/introduction-to-deep-learning/).
### Key Terms
+ **Neuron**: A building block of ANN. It is responsible for accepting input data, performing calculations, and producing output.
+ **Input data**: Information or data provided to the neurons. 
+ **Artificial Neural Network(ANN)**: A computational system inspired by the way biological neural networks in the human brain process information.
+ **Deep Neural Network**: An ANN with many layers placed between the input layer and the output layer. 
+ **Weights**: The strength of the connection between two neurons. Weights determine what impact the input will have on the output.
+ **Bias**: An additional parameter used along with the sum of the product of  weights and inputs to produce an output. 
+ **Activation Function**: Determines the output of a neural network.

### Neural Networks Overview
Have you ever wondered how your brain recognizes images? No matter how the image looks like, the brain can tell that this is an image of a cat and not a dog. The brain relates to the best possible pattern and concludes the result. The example below will help you understand neural networks:
Consider a scenario where you have a set of labeled images, and you have to classify the images based on if it is a dog or a cat.
To create a neural network that recognizes images of cats and dogs. The network starts by processing the input. Each image is made of a bunch of neurons. For example, the image dimensions are 20 * 20 pixels that make 400 neurons or pixels. The 400 neurons make the first layer of our neural network.

![Neural Network](/engineering-education/introduction-to-neural-networks/nn.png)

[Image source](https://medium.com/coinmonks/the-artificial-neural-networks-handbook-part-1-f9ceb0e376b4)

A neural network is made of artificial neurons that receive and process input data. Data is passed through the input layer, the hidden layer, and the output layer.

A neural network process starts when input data is fed to it. Data is then processed via its layers to provide the desired output.
A neural network learns from structured data and exhibits the output. Learning in neural networks can be in three different categories:
+ Supervised Learning - with the help of labeled data, inputs, and outputs are fed to the algorithms. They then predict the desired result after being trained on how to interpret data.
+ Unsupervised Learning - ANN learns with no human intervention. There is no labeled data, and output is determined according to patterns identified within the output data.
+ Reinforcement Learning - the network learns depending on the feedback you give.

The essential building block of a neural network is a perceptron or neuron. It uses the supervised learning method to learn and classify data. We will learn more about the [perceptron](#Perceptron) later in this article. 

### How Neural Networks work
Neural Networks are complex systems with [artificial neurons](https://en.wikipedia.org/wiki/Artificial_neuron). Artificial neurons or perceptron consist of:
+ Input
+ Weight
+ Bias
+ Activation Function
+ Output

![Neuron](/engineering-education/introduction-to-neural-networks/neuron.png)

[Image source](https://www.javatpoint.com/single-layer-perceptron-in-tensorflow)

The neurons receive many inputs and process a single output.

Neural networks are comprised of layers of neurons. These layers consist of the following:

- Input layer
- Multiple hidden layers
- Output layer

The input layer receives data represented by a numeric value. Hidden layers perform the most computations required by the network. Finally, the output layer predicts the output.

In a neural network, neurons dominate one another. Each layer is made of neurons. Once the input layer receives data, it is redirected to the hidden layer. Each input is assigned with [weights](https://deepai.org/machine-learning-glossary-and-terms/weight-artificial-neural-network#:~:text=Weight%20is%20the%20parameter%20within,weight%2C%20and%20a%20bias%20value). Weight is a value in a neural network that converts input data within the network's hidden layers. Weights work by input layer, taking input data, and multiplying it by the weight value. It then initiates a value for the first hidden layer. The hidden layers transform the input data and pass it to the other layer. The output layer produces the desired output.

The inputs and weights are multiplied, and their sum is sent to neurons in the hidden layer. Bias is applied to each neuron. Each neuron adds the inputs it receives to get the sum. This value then transits through the activation function. 
The activation function outcome decides if a neuron is activated or not. An activated neuron transfer information into the other layers. In this approach, the data gets generated on the network until the neuron reaches the output layer.
In other words, this is [forward propagation](https://towardsdatascience.com/forward-propagation-in-neural-networks-simplified-math-and-code-version-bbcfef6f9250). Feed-forward propagation is the process of inputting data into an input node and getting the output through the output node.

Feed-forward propagation takes place when the hidden layer accepts the input data. Process it as per the activation function and pass it to the output. The neuron in the output layer with the highest probability projects the result.
If the output is wrong, backpropagation takes place. While designing a neural network, weights are initialized to each input. Backpropagation means readjusting each input's weights to minimize the error, thus resulting in a more accurate output.

### Types of Neural Networks
Neural networks are identified based on mathematical performance and principles to determine the output.

#### Perceptron
[Minsky and Papert](https://www.researchgate.net/publication/3081582_Review_of_&#39;Perceptrons_An_Introduction_to_Computational_Geometry&#39;_Minsky_M_and_Papert_S_1969) proposed the Perceptron model (Single-layer neural network). They said it was modeled after the functioning of the human brain. It is one of the simplest models that can learn and solve complex data problems using [neural networks](https://www.mygreatlearning.com/blog/types-of-neural-networks/). Perceptron is also called artificial neurons.

Perceptron network is comprised of two layers:
- [Input Layer](https://www.techopedia.com/definition/33262/input-layer-neural-networks)
- [Output Layer](https://www.techopedia.com/definition/33263/output-layer-neural-networks)

The input layer computes the weighted input for every node. The activation function is pertained to get the result as output.

![Perceptron](/engineering-education/introduction-to-neural-networks/perceptron.png)

[Image source](https://missinglink.ai/wp-content/uploads/2018/11/Frame-3.png)

#### Feed Forward Neural Network
In a feed-forward network, data moves in a single direction. It enters via the input nodes and leaves through output. This is a front propagation wave. By data moving in one order, there is no [backpropagation](https://www.guru99.com/backpropogation-neural-network.html). The backpropagation algorithm calculates the gradient of the loss function with consideration to weights in the network.

The input product sum and their weights are computed. The data later is transferred to the output.

A couple of feed-forward neural networks applications are:

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
Neural networks such as a feed-forward network move data in one direction. This type of network has a shortcoming of not remembering the data in past inputs. This is where RNN comes into play. RNN does not work like standard neural networks.

[A Recurrent Neural Network(RNN](https://www.sciencedirect.com/topics/engineering/recurrent-neural-network)) is a network good at modeling sequential data. Sequential data means data that follow a particular order in which a thing follows another.
In RNN, the output of the previous stage goes back in as input of the current step. RNN is a [feedback neural network](https://link.springer.com/chapter/10.1007/978-1-4757-3167-5_7). Saving the output helps to make decisions.
In RNN, data runs through a loop such that each node remembers data in the previous step.
For example: 
Let's say you are taking five units this semester, and this is your schedule:
Monday = Cryptography, Tuesday = Audit of Information Systems, Wednesday = Advanced Database, Thursday = Java, and Friday = Business intelligence. For the NN to tell you the unit you are studying, it has to be based on the unit studied the day before.
From the above example, you learn the output goes back in as input to decide the next output.
RNNs have a memory that helps the network recall what happened earlier in the sequence data.
While carrying out operations, neurons act as memory cells.

![Recurrent Neural Network](/engineering-education/introduction-to-neural-networks/rnn.jpeg)

[Image source](https://deepai.org/machine-learning-glossary-and-terms/recurrent-neural-network)

RNN solves problems in stock predictions, text data, and audio data. More simply, it solves problems in text-to-speech conversion and language translation. Learn more about text generation with RNN [here](/engineering-education/text-generation-nn/).

#### Convolution Neural Network
Convolutional Neural Network (CNN) is popularly used for image recognition. CNN contains a three-dimensional neuron arrangement.

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
- Unexplained behaviour of the network

Neural networks provide a solution to a problem. The problem is it does not give reasons for why and how. However, network trust is reduced.

- Determination of appropriate network structure

There is no specified rule for discovering a neural network procedure. A proper network structure is achieved by trying the best network.

- Hardware dependence

Neural network pieces of equipment are dependent on one another. Neural networks require processors with corresponding processing capacity.

- Difficulty in showing a network problem

Neural networks work with numbers. Problems have to be interpreted into numbers first before rendering output. This influences the network performance.

### Conclusion
The neural network field is growing tremendously. Learning and understanding the concepts in this field is vital. This article has also explained the different kinds of neural networks. By exploring this field, you can apply neural networks in other areas to solve data problems. This article has also explained the different kinds of neural networks.
