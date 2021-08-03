---
layout: engineering-education
status: publish
published: true
url: /transgan-a-transformer-based-gan-architecture/
title: TransGAN, a Transformer Based GAN Architecture
description: In this article we will discuss a transformer-based generative adversarial network architecture. It attempts to re-design GANs architecture by replacing convolutions with pure transformers.
author: willies-ogola
date: 2021-03-16T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/transgan-a-transformer-based-gan-architecture/hero.png
    alt: TransGAN example image
---
To date, transformers or attentions have been used in Generative Adversarial Networks (GANs), but they always had a convolution component in their architecture.
<!--more-->
This research aims to eliminate these convolutions and replace them with pure transformers in the generator and discriminator portions of a GAN.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Key takeaways](#key-takeaways)
4. [Wrapping up](#wrapping-up)
5. [References](#references)

### Prerequisites
Before reading this article, a reader should have prior knowledge about Generative Adversarial Networks (GANs) and the Transformer architecture popularly used in Natural Language Processing (NLP). 

These [articles](/introduction-to-generative-adversarial-networks/) on Section will help you get familiar with GANs.

Also, feel to read my previous [article](/vision-transformer-using-transformers-for-image-recognition/) on the Vision Transformer (ViT) model as it is essential to understanding this article.

### Introduction
Can we build a strong Generative Adversarial Network (GAN) free of convolutions?

This article aims to discuss this recent [paper](https://arxiv.org/pdf/2102.07074.pdf), a buzz in the AI community over the past couple of weeks. The paper aims to re-design the architecture for GANs by using only pure transformer-based architecture.

As mentioned above, transformers or attentions have been used in GANs, but they always had a convolution component in their architecture. This research aims to drop these convolutions. It replaces them with pure transformers in the generator and discriminator portions of a GAN. 

The research also discusses: 
- What was required to perform the replacements. 
- How they built the architecture.
- Training tricks they used to make this novel architecture competitive. 

Let's get into the details of the paper.

### The TransGAN architecture
![The TransGAN architecture](/engineering-education/transgan-a-transformer-based-gan-architecture/transgan-architecture.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2102.07074.pdf)*

The architecture of a TransGAN is relatively straightforward. A TransGAN consists of a generator G and a discriminator D. The generator and discriminator models in a GAN are usually made up of convolutions. TransGAN replaces these convolutions with transformers. 

#### The generator
The generator model generates a 32 x 32-dimensional image with three color channels (red, green, and blue).

At the first stage of the generator model, random noise inputs are fed into a multi-layer perceptron (MLP). This process generates the initial sequence. These initial sequences are of the dimensions 8 x 8 x C, where C stands for the number of channels. Positional encoders are also employed in the generator. 

They inject information about the relative or absolute sequence position of the image patches. For example, which image came first and which one came last. These positional encoders have the same dimensions as the input sequences so that they can be added together. These outputs are then fed into the M-layers of the Transformer Encoder module.

The next step involves the upscaling of the resolution at different stages. This process is an idea borrowed from this [paper](https://arxiv.org/pdf/1609.05158.pdf). Feel free to read more on it. This process involves increasing the resolution of the image while reducing the number of channels in the image. 

This process helps achieve higher pixel densities (increasing resolution) in images. It also saves memory space by reducing the number of channels and preventing computational explosions. In other words, there is a trade-off between pixel density and the depth of information. The upscaling process yields a (16 x 16) x C/4 dimensions output and finally achieves the target dimension of (32 x 32) x C/16. 

At each stage, the number of channels in the target dimensions is reduced to a quarter of the input while the resolution increases two-fold. These are then fed individually into a linear projection layer. It results in the generator producing (32 x 32) x 3-dimensional images fed into the discriminator model.  

#### The discriminator
The discriminator contains the same model mentioned in my previous [article](/vision-transformer-using-transformers-for-image-recognition/), the Vision Transformer (ViT) model which aims to treat images as sequences of 16 x 16 visual words. 

The discriminator model receives its inputs from the generator model. It divides this 32 x 32 x 3 image into image patches fed into the transformer encoder. The transformer examines each image patch as a token embedding, as is the case in NLP.

As a transformer lacks convolutions, it is vital to add positional encodings to the image patches. It must be added as a transformer and has no idea about the broken down image patches' sequential positioning.

At the last stage of the discriminator model, you have a [cls] token that classifies whether the output is real or fake. The CLS token is used for classification tasks in NLP.

Backpropagation is then performed throughout the whole architecture to train the model.

### Tricks for TransGAN

#### 1. Data augmentation
The type of data augmentation they use is borrowed from this [paper](https://arxiv.org/pdf/2006.10738.pdf). It highlights different augmentation techniques for GANs. Transformers don't have locality bias built into their architecture as CNNs do, they tend to need a lot more data. Data augmentation helps get around this problem by producing more data from the same dataset.

#### 2. Co-training with self-supervised auxiliary task
![Co-training with Self-Supervised Auxiliary Task](/engineering-education/transgan-a-transformer-based-gan-architecture/co-training.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2102.07074.pdf)*

This is a super-resolution task. It's a task performed besides the whole GAN training. The GAN training involves the discriminator model receiving images from both the generator and the real dataset. Through training, we get the primary GAN loss.

This auxiliary task consists of inputs from high and low-resolution images. It receives real images from the dataset, which are considered high-resolution images. These images are deliberately downsampled to produce their low-resolution counterparts. 

The task of the GAN is to predict a high-resolution image given the low-resolution image. It's important to note that this is not the same generated image that goes into the discriminator. It is purely for the auxiliary task.

These two losses produced by the auxiliary task and the generator are added together. It turns out that this auxiliary task helped improve TransGAN training.

#### 3. Localized initialization for self-attention
The success of localization in convolutions has shown to be pretty good for images making CNN's so effective. But this is not the case with transformers which tend to be robust and look at the whole picture. 

It would be ideal first to teach them that local features also matter. Once some quality level has been achieved, we can now let the model look at the whole picture. This was the thought process behind this localized initialization technique.

So, how do they achieve this?

Throughout the training, they gradually increase the receptive field. In early training, the model is only allowed to look at immediate local neighbors that are not masked. These masked pixels are gradually reduced until the self-attention is entirely global. This process is known as local attention and allows GAN to learn how to generate images. 

This is shown in the image below:

![Gradually increasing receptive fiels](/engineering-education/transgan-a-transformer-based-gan-architecture/masked-pixel.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2102.07074.pdf)*

### Key takeaways

#### 1. Model Architecture
The TransGAN architecture is built purely using transformers. This is unlike previous architectures, which used convolutions or convolutions together with transformers.

#### 2. Training Techniques
There are three main techniques employed to train TransGAN better. 

They include:
- Data augmentation.
- Localized initialization for self-attention.
- Multi-task co-training for generator with self-supervised auxiliary loss.

### Wrapping up
In this article, we have discussed the TransGAN paper. It attempts to re-design GANs architecture by replacing convolutions with pure transformers.

Over time, we have seen a shift in the use of CNNs to use powerful transformers for image classification tasks. Transformers are now being tried on image generation tasks. However, most of these proposed models still pose some challenges. 

An instance is the use of transformers for image generation tasks, such as in GANs. But, they still appear to be very promising architectures.

Happy coding.

### References
1. [TransGAN: Two Transformers Can Make One Strong GAN](https://arxiv.org/pdf/2102.07074.pdf)
2. [Basics of Generative Adversarial Networks](https://www.section.io/engineering-education/introduction-to-generative-adversarial-networks/)
3. [Vision Transformer (ViT) - Using Transformers for Image Recognition](https://www.section.io/engineering-education/vision-transformer-using-transformers-for-image-recognition/)
4. [Real-Time Single Image and Video Super-Resolution Using an Efficient Sub-Pixel Convolutional Neural Network](https://arxiv.org/pdf/1609.05158.pdf)
5. [Differentiable Augmentation for Data-Efficient GAN Training](https://arxiv.org/pdf/2006.10738.pdf)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
