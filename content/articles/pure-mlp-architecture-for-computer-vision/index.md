---
layout: engineering-education
status: publish
published: true
url: /pure-mlp-architecture-for-computer-vision/
title: A Pure MLP Architecture for Computer Vision
description: In this article, we will explore how pure MLP architectures are able to compete with state-of-the-art models on image classification benchmarks.
author: willies-ogola
date: 2021-07-11T00:00:00-07:05
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/pure-mlp-architecture-for-computer-vision/hero.png
    alt: MLP example image
---
Convolutional Neural Networks (CNNs) have been used over the years to solve problems in computer vision. But, over the last year, we've seen transformers with self-attention modules replacing CNNs. A good example is the Vision Transformer. 
<!--more-->
Can we do away with both CNNs and attention mechanisms to only using Multi-Layer Perceptrons (MLPs) to solve computer vision problems in machine learning?

No CNNs, no self-attention mechanisms, only MLPs?

Well. This [paper](https://arxiv.org/abs/2105.01601) by Google shows that neither CNNs nor self-attention modules are necessary to solve computer vision tasks. As this article will show, it's impressive to see that this pure MLP architecture attains competitive scores compared to state-of-the-art models on image classification benchmarks.

This article will explain how they achieve this. But before I explain the model, let's first understand the working of an MLP.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Brief overview of MLP](#brief-overview-of-mlp)
3. [The MLP-Mixer architecture](#the-mlp-mixer-architecture)
4. [Experiment and results](#experiment-and-results)
5. [Wrapping Up](#wrapping-up)
6. [References](#references)

### Prerequisites
Before reading this article, I recommend that you read my two previous articles. The [Vision Transformer](https://www.section.io/engineering-education/vision-transformer-using-transformers-for-image-recognition/) and the [Basics of Convolution Neural Networks](https://www.section.io/engineering-education/basics-of-convolution-neural-networks/) articles. This article builds upon concepts introduced in those articles.   

### Brief overview of MLP
MLPs have been around since the 1980s. They have been used as classifier algorithms and to solve simple regression problems. They have found applications in image recognition, machine translation, and speech recognition.

MLPs borrow their main concept from the human brain. The general architecture of an MLP consists of three layers:
1. The input layer 
2. The hidden layer 
3. The output layer. 

These layers contain neurons that are interconnected, with each neuron assigned a value. These neurons transfer information to each other. The neurons are assigned weights and biases. The weights determine how fast the activation function triggers. The bias term delays the activation function from triggering. 

As mentioned in the previous paragraph, its architecture contains a non-linear activation function that is connected to the neurons. These activation functions are not connected to the input layer, only to the hidden and output layers.
 
Like most artificial neural networks, MLPs also use backpropagation to train the network.

Here is an overview of the MLP architecture

![The MLP Architecture](/engineering-education/pure-mlp-architecture-for-computer-vision/mlp-architecture.PNG)

*[Image Source: Analytics Vidhya](https://www.analyticsvidhya.com/blog/2020/12/mlp-multilayer-perceptron-simple-overview/)*

Before this research on the MLP-Mixer, MLPs were deemed insufficient in solving advanced problems. It has been replaced by the likes of Convolution Neural Networks and Recurrent Neural Networks to solve complex problems. 
But, with a few tweaks to the original MLP architecture, the research team at Google was able to use this simple, but powerful architecture to build the MLP-Mixer.

Let's now take a look at the MLP architecture.

### The MLP-Mixer architecture
![MLP-Mixer Architecture](/engineering-education/pure-mlp-architecture-for-computer-vision/mlp-mixer-architecture.PNG)

*[Image Source: GitHub](https://github.com/google-research/vision_transformer#installation)*

The MLP-Mixer architecture consists of three main components:
1. Per-patch linear embedding.
2. Mixer layers.
3. A classification head.

#### Per-patch linear embedding
In this layer, input images with dimensions (H, W) are divided into a sequence of S, non-overlapping image patches. Each patch is of dimension (P, P). So, to get the number of patches required for each image, you divide the dimension of the input image by that of each patch. Thus, S = (HW/P<sup>2</sup>). 

These patches are linearly projected through a projection layer. This projection layer is simply a fully connected layer with an output dimension of C. This results in a 2D input table with image patches (tokens) named X on the paper which is used on the mixer layers.

#### The Mixer layers
The mixer layer contains two types of MLP layers. It is important to note that the idea of these two layers is borrowed from CNN.

##### 1. Channel-mixing MLP

- This MLP allows for communication between different channels. It operates on each location independently and takes individual rows of the table as inputs. It only focuses on a single patch in the image then processes the channels.

##### 2. Token-mixing MLP

- This MLP allows for the communication between different spatial locations (tokens) in an image. Remember the tokens are the image patches. It operates on each channel independently and takes individual columns of the table as inputs.

These two MLP layers are alternated by reshaping and transposing the layers. This enables the interaction of both input dimensions.

The outputs of the channel-mixing and token-mixing MLP are the same dimension as the input. For example, an input of (8X4) will result in an output of (8X4).

As shown in the diagram above, each MLP block contains two fully connected (FC) layers and a non-linearity function known as Gaussian error linear unit (GeLU).

#### The classification head
This is the last layer in the MLP-Mixer architecture.

It consists of a standard classification head, a global average pooling layer, and a linear classifier. 

#### Extra
1. Additionally, other standard components included in this architecture include dropout, skip-connections, and the Layer Norm applied on the channels.

2. They used GeLU instead of the popular ReLU activation function. GELU's use is also evident in GPT-3, BERT, and most other newer Transformers. GeLU combines the best properties from ReLU, [dropout](https://www.kaggle.com/pavansanagapati/what-is-dropout-regularization-find-out), and [zoneout](https://arxiv.org/pdf/1606.01305.pdf) making it ideal for tasks in Computer Vision, Natural Language Processing, and Automatic speech recognition. You can learn more about it in this research [paper](https://arxiv.org/pdf/1606.08415v3.pdf).

3. Unlike in the Vision Transformer model, positional embedding is not used in this architecture. This is because token-mixing MLPs are very sensitive to the order of the input tokens.

All these components combined are what make up the MLP-Mixer architecture.

### Experiment and results
For the experiment, they first perform pre-training on two public datasets. The [ImageNet-21K](https://arxiv.org/abs/2104.10972) and ILSVRC2021. They use the Adam optimizer with a batch size of 4096.

They performed data augmentation techniques on the input images such as RandAugment. They used dropout, stochastic depth, and mixup which have become common practices when training such large networks.

When fine-tuning the model, they used a batch size of 512 together with the SDG optimizer instead of the Adam optimizer.

They experimented with model sizes; small, base, large, and huge. This is achieved by playing around with the number of parameters in the model.

With all these variations in the model architecture, they compared their results with state-of-the-art architectures such as the [Vision transformer (ViT)](https://www.section.io/engineering-education/vision-transformer-using-transformers-for-image-recognition/), [Big Transfer (BiT)](https://arxiv.org/abs/1912.11370).
Results from their experiment show that the accuracy increases with the model size. Additionally, in terms of speed, the model runs 2.5 times faster than ViT and BiT. 

Though these results are not extraordinary compared to current models, it is amazing to see how this simple architecture competes with advanced architecture.

### Wrapping up
It is remarkable to see how a simple MLP-based model can compete with state-of-the-art models. Attention-based and CNNs in our case. Though some of the ideas behind the novel MLP-Mixer model are borrowed from works of literature on CNNs and Transformers, it is still interesting research. It would be amazing to see if this design could work to solve problems in other domains such as Natural Language Processing.

### References
1. [Perceptron Algorithm - A Hands On Introduction](https://www.section.io/engineering-education/perceptron-algorithm/)
2. [MLP-Mixer: An all-MLP Architecture for Vision](https://arxiv.org/abs/2105.01601)
3. [Vision Transformer (ViT) - Using Transformers for Image Recognition](https://www.section.io/engineering-education/vision-transformer-using-transformers-for-image-recognition/)
4. [Basics of Convolution Neural Networks](https://www.section.io/engineering-education/basics-of-convolution-neural-networks/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
