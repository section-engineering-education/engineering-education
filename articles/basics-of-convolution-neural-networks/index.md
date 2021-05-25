---
layout: engineering-education
status: publish
published: true
url: /engineering-education/basics-of-convolution-neural-networks/
title: Basics of Convolution Neural Networks
description: This article will introduce the three building blocks of convolution neural networks; convolution layers, pooling layers, and fully connected (FC) layers.
author: willies-ogola
date: 2020-11-15T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/basics-of-convolution-neural-networks/hero.jpg
    alt: convolution neural networks learning image
---
This article assumes a basic understanding of Machine Learning (ML) and Deep Learning (DL). For an introduction to ML and DL, feel free to check out my previous [article](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/).
<!--more-->
### Prerequisites
### Introduction
Vision is one of the key senses in humans. We rely on vision a lot, from recognizing physical objects to navigating in the real world. It’s a huge part of our lives.

The way humans see images isn’t the same way computers see them. Computers see images as an array of numbers. As it stores numbers in computers as 8-Bit integers, these allow a range of pixel values from 0 to 255 to be displayed. These values correspond to the pixel brightness in the image.

Let’s take an example of an image with the number 8 shown below:

![Image as an array](/engineering-education/basics-of-convolution-neural-networks/image-as-array.PNG)<br>

*[Image Source: The MNIST Database](http://yann.lecun.com/exdb/mnist/)*

A pixel value of 0 represents black (dull) while 255, white (bright). As seen in the image, the pixels surrounding the image are much brighter (closer to 255) than pixels away from it. This is how a computer sees an image.

Convolution Neural Networks (CNNs) builds on this idea.

### What are Convolution Neural Networks (CNNs)?
The concept of Convolution Neural Networks (CNNs) results from a combination of deep neural networks and a set of operations known as convolutions.

CNN’s are a class of deep learning techniques popularly used to solve computer vision tasks. As they learn directly from input data, they are beneficial for finding patterns in images, enabling them to perform tasks such as face recognition, object detection, and scene recognition.

They are widely applied in solving computer vision and facial recognition tasks in smart cameras and self-driving cars.

Before we learn how CNNs work, it's important to understand why we need CNNs and why they are better than other algorithms?

1. CNN’s produce innovative recognition results.

2. CNN’s automatically learn a hierarchy of features from inputs. This eliminates the need for hand engineering the extraction of features.

3. CNNs can be built on pre-existing networks. Thus, it can be retrained to perform new recognition tasks.

Let’s look at the architecture of a CNN.

### Architecture Overview
![Architecture of a CNN together with the training process](/engineering-education/basics-of-convolution-neural-networks/cnn-architecture.PNG)<br>

*[Image Source: CrossMark](https://doi.org/10.1007/s13244-018-0639-9)*

The CNN architecture consists of a stacking of three building blocks:

1. Convolution layers

2. Pooling layers, i.e., max pooling

3. Fully connected (FC) layers

#### Convolution layer
A convolution layer is a key component of the CNN architecture. This layer helps us perform feature extractions on input data using the convolution operation. The convolution operation involves performing an element-wise multiplication between the filter's weights and the patch of the input image with the same dimensions. Finally, the resulting output values are added together.

Let's consider a visual example to drive this convolution operation point home even further.

Let's assume we want to compute the convolution of a 5 X 5 input image using a 3 X 3 filter:

![Convolution Operation](/engineering-education/basics-of-convolution-neural-networks/conv-op1.png)<br>

![Convolution Operation](/engineering-education/basics-of-convolution-neural-networks/conv-op2.png)<br>

![Convolution Operation](/engineering-education/basics-of-convolution-neural-networks/conv-op3)

We slide the 3 X 3 filter over the input image, perform element-wise multiplication, and add the outputs.

Besides, on the CNN architecture, we can note that feature extraction is achieved using both convolution layers (linear operation) and an activation function (non-linear operation). We always add the activation function to each layer of convolution. Rectified Linear Unit (ReLU) is the most used activation function in deep learning.

Let’s touch a little bit on it.

##### Rectified Linear Unit (ReLU)
From the image above, we note that it combines a convolution layer with the ReLU layer. The purpose of the ReLU activation function is to introduce non-linearity into the network.

Introducing non-linearity is important in deep learning because, in real life, almost all data is non-linear. ReLU returns a 0 value for all negative inputs, while for positive values, it returns that same value back (x).

Mathematically, this is defined by:

`f(x) = max (0, x)`

![Rectified Linear Unit](/engineering-education/basics-of-convolution-neural-networks/relu-function.PNG)<br>

*[Image Source: Papers with code](https://paperswithcode.com/method/relu)*

Why is ReLU widely used?

ReLU tends to have a much faster training time than other activation functions used in neural networks such as sigmoid and the hyperbolic tangent.
Read more about them [here](https://en.wikipedia.org/wiki/Activation_function/).

#### Pooling layer
A pooling layer is non-linear down-sampling that reduces the dimensionality of the feature maps of an input image, making its representation smaller and more manageable. This process reduces the number of parameters and computation resources in the network.

We will see an example of how the dimensionality reduction occurs from the max pooling and average pooling operations.

It's important to note that a 2 x 2 filter size applied with a stride of 2 is the most used in CNN.

##### Max Pooling
**Max pooling** is the most popular among the pooling operations. It extracts patches from the input feature maps, picks the largest value on each patch, and discards the rest.

Below is an example of a max-pooling operation. It comprises a filter size of 2 x 2 that extracts a 2 x 2 patch from the input tensor. It outputs the largest value in each patch.

![Max Pooling](/engineering-education/basics-of-convolution-neural-networks/max-pooling.png)

Max-pooling results in the input's down-sampling, reducing its dimensions from a 4 x 4 to a 2 x 2.

##### Average Pooling
Besides, **average pooling** is another type of pooling operation that's worth mentioning. It performs down-sampling by performing an average of all values in a feature map. Thus, picking this averaged value as the new value of the feature space.

Here is an example of average pooling on CNN.

![Average Pooling](/engineering-education/basics-of-convolution-neural-networks/average-pooling.png)

Here, the input image with a 4 x 4 dimension is reduced to a 2 x 2 using average pooling.

#### Fully Connected layer
The Fully Connected (FC) layer is the last building block in a Convolution Neural Network.
The output feature maps of the layer before the FC layer are transformed into a one-dimension (1D) array of numbers, i.e., flattened. That layer is connected to one or more fully connected layers.

The FC layer maps the extracted features from the convolution and pooling layers onto the final output, i.e., classification.

![A fully connected layer with a flattened input](/engineering-education/basics-of-convolution-neural-networks/fully-connected.PNG)<br>

*[Image Source: Stanford](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-convolutional-neural-networks)*

Last, once the CNN has derived an output using a probability function such as [softmax](https://en.wikipedia.org/wiki/Softmax_function/), we compare this output with the output we want the network to give. The difference between the two gives us the error in our network.

The CNNs weights are then updated, and it minimizes the objective function through a process known as backpropagation, as we will see in the image below. We can describe backpropagation as the backward propagation of errors.

It’s fine-tuning the weights and bias so it can give us the output we want. It's the core algorithm behind how neural networks learn. Learn more about it in this [video](https://www.youtube.com/watch?v=Ilg3gGewQ5U/).

### Key Terminologies
It’s crucial to understand these terminologies that are commonly used in CNNs.

1. Parameter

These are placeholders that change during training. Weights and Biases are the two main parameters in CNNs.

2. Hyperparameter

A hyper-parameter is also a placeholder, but unlike the parameter, hyper-parameters need to be set before training starts. But, it’s important to note that these hyper-parameters can be modified as the CNN model learns. The learning rate is one of the important hyper-parameters that need to be set before training starts.

3. Kernel

A kernel is an integral component of the structure of a CNN. It’s sometimes referred to as a filter. These are taught to the model during the training process. We perform the kernel operation on the first layer’s input image and the convolved images in the consecutive layers alongside convolution. This operation helps filter the information that's of importance from the input image and discard the rest.  

4. Stride

Stride refers to the number of pixels a convolution filter moves. It can be compared to a sliding window. The image below shows the stride, S moving with a pixel of 2.

![Stride, S](/engineering-education/basics-of-convolution-neural-networks/stride.PNG)<br>

*[Image Source: Stanford](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-convolutional-neural-networks)*

### Applications of Convolution Neural Networks
#### Computer Vision
Image classification is a very common problem in [computer vision](/engineering-education/computer-vision-straight-lines/). The goal in image classification is to learn features directly from image data. We then use these learned features for classification. For instance, feeding an image of a cat as our input, the network should classify the image as a cat.

Recently, CNN have been used for image captioning. Here, the goal is to generate a sentence that describes the semantic content in an image. It’s achieved by combining CNN with a [Recurrent Neural Network](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks/)(RNN). In the last layer in the CNN architecture, instead of a fully connected (FC) layer, it replaces the last layer of the CNN with an RNN.    

I know you might find it difficult to understand how an RNN is getting fixed to a CNN. Let me explain using the structure of a CNN below.

![Structure of a CNN divided into feature learning and classification sections](/engineering-education/basics-of-convolution-neural-networks/cnn-rnn-explanation.PNG)<br>

*[Image Source: MathWork](https://www.mathworks.com/solutions/deep-learning/convolutional-neural-network.html)*

What makes a CNN? It's the feature learning portion in the above image.

The second portion, the classification bit, can be altered to suit the application that we so desire. For our use case, we need to introduce the RNN architecture to perform the tasks of captioning our images.

Why are we choosing an RNN in this case?

It's because they are ideal for solving sequence prediction problems in text and speech data.

We use CNN to learn the hierarchical features in the input image. These learned features are encoded and passed into the RNN to generate sentences that describe the semantic content in the image.

Hope that's clear now.

#### Natural Language Processing (NLP)
Traditionally, CNNs have only been applied in solving Computer Vision problems. This has changed over the years. CNN’s are now being applied to solve NLP problems such as speech recognition and text classification.

The rapid development of speech recognition systems have been increasing over the years. This has been made possible by using word vectors, these are vectors of numbers representing words. They enable the research of the relationships between documents, words, and sentences.

Word vectors enable mathematical operations to be performed on words for machine translation and speech recognition. Apple’s Siri and Amazon’s Alexa are a few examples of speech recognition systems available today.

For text classification, texts are first converted into vectors. It then passes these vectors as inputs to the CNN. In a forward propagating manner, these vectors pass through the convolution and pooling layer to extract features and reduce dimensions.

Finally, the fully connected (FC) layer and activation function on the output classify texts into different text categories.

#### Medical & Healthcare
In radiology, CNN is used to classify whether the computed tomography (CT) scans of lung nodules are benign or malignant (cancerous).  

![Classification of lung nodules](/engineering-education/basics-of-convolution-neural-networks/benign-malignant.PNG)<br>

*[Image Source: CrossMark](https://doi.org/10.1007/s13244-018-0639-9)*

In medical image analysis, CNN is used in the segmentation of organs. For example, it has been used to segment cancerous tumors in the uterus, as shown below.

![Segmentation of a cancerous uterus tumor](/engineering-education/basics-of-convolution-neural-networks/malignant-tumor.PNG)<br>

*[Image Source: CrossMark](https://doi.org/10.1007/s13244-018-0639-9)*

A CNN that uses a pretty standard architecture is used to identify genetic disorders from facial phenotypes' on pictures of children's face. The identification is shown below.

![DeepGestalt's network architecture](/engineering-education/basics-of-convolution-neural-networks/deepgestalt.PNG)<br>

*[Image Source: Nature Medicine](https://www.gwern.net/docs/genetics/heritable/2019-gurovich.pdf)*

#### Self Driving Cars
We use CNN in self-driving cars to map raw pixel values from the camera inputs to various steering commands. Using CNN, these cars detect traffic signs, pedestrians, and other cars, enabling them to predict control signals.

The companies implementing CNNs into their self-driving cars include [Tesla](https://www.tesla.com/) and [Waymo](https://waymo.com/) to name a couple.

### Wrapping Up
We’ve introduced how computers see images as an array of numbers. We’ve also discussed the three building blocks of convolution neural networks; convolution layers, pooling layers, and fully connected (FC) layers. Finally, we’ve gone in-depth on the applications of CNNs.

This article only scratches the surface on CNN’s basics that one needs to know before diving deeper into the field.

You can learn more advanced concepts of CNN [here](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-convolutional-neural-networks/).

### References
1. Yamashita, R., Nishio, M., Do, R. K. G., & Togashi, K. (2018). [Convolutional neural networks: an overview and application in radiology](https://link.springer.com/content/pdf/10.1007/s13244-018-0639-9.pdf/). Insights into Imaging, 9(4), 611-629.
2. [Applications of Convolution Neural Networks](https://ijcsit.com/docs/Volume%207/vol7issue5/ijcsit20160705014.pdf/)
3. [Applications of Convolution Neural Network in Natural Language Processing](https://ieeexplore.ieee.org/document/8666928/)
4. [Identifying facial phenotypes of genetic disorders using deep learning](https://www.gwern.net/docs/genetics/heritable/2019-gurovich.pdf/)
5. [Recurrent Neural Network](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks/)
6. [Convolution Neural Network](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-convolutional-neural-networks/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
