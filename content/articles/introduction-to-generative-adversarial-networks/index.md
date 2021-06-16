---
layout: engineering-education
status: publish
published: true
url: /introduction-to-generative-adversarial-networks/
title: Basics of Generative Adversarial Networks
description: This article introduces the readers to the basics of GANs, where and why they are used, how they are built, etc. It also explores the architecture of a simple GAN and the system flow.
author: adith-bharadwaj
date: 2020-08-12T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-generative-adversarial-networks/hero.jpg
    alt: gan image example generative adversarial networks
---
*Generative Adversarial Networks, or GANs for short, are one of the latest ideas in artificial intelligence (AI) and are a class of neural networks used in machine learning, computer vision, and other forms of artificial intelligence, developed and introduced by Ian J. Goodfellow*. In this article, we are going to understand what GANs are, where they are used, and how they work.
<!--more-->

### What are GANs?
Generative Adversarial Networks (GANs) are a popular class of neural networks used for [unsupervised learning](https://en.wikipedia.org/wiki/Unsupervised_learning) (a class of machine learning where there is no pre-existing label in the data). GANs generates new data, and hence, have a wide array of use cases. Every record or information, be it textual, video or audio is data and GAN can be used to generate a new or fake version of them. GAN is considered one of the most potent breakthroughs in Machine learning and it’s application varies from simple needs to very highly complex requirements.

#### How do they work?
Two opposing neural networks form the core architecture of a GAN: One network, called the **generator**, creates new information based on certain parameters, whereas the second network, called the **discriminator**, checks the data to see if it is legitimate. *The generator tries to generate realistic data, and the discriminator network tries to distinguish what it generates*. The generator network uses the discriminator's output to update its parameters as needed, creating data that appears more realistic.

The generator predicts the characteristics/features of data given a label. So this component first takes in a random vector (representation of the initial random image) and generates a set of fake data that are forwarded to the discriminator. In every iteration, the generator is run in a more finely tuned manner.

The discriminator, as the name suggests has to classify incoming data as real or fake. For this, the discriminator is trained on the set of real data so that when encountered with a fake one, the difference with the trained reference allows it to detect it.

In every iteration, the results of classification are sent back to the generator for fine-tuning. The discriminator tries to distinguish between the real and fake data, while the generator only tries to theoretically create a more accurate representation of the real data. *The two models continuously oppose each other and after time, they get better and better until the result is a generator network that produces realistic outputs*.

### GAN architecture
This flowchart will give a brief description of how GANs work.

![GAN architecture](/engineering-education/introduction-to-generative-adversarial-networks/gan-architecture.jpg)

**System flow**:

1. First, A vector, initialized to **random values**, is given as the input to the model.

2. There are two types of images: The **generated image** and the **real image**. The generated image is the output of the generator, and the real image is part of the training data that the model is trained on.

3. The real and the generated images are sent to the discriminator that compares the real image with the generated image.

4. The discriminator then classifies the given images as real or fake using [binary classification](https://en.wikipedia.org/wiki/Binary_classification).

5. Based on the results, the generator and discriminator are updated. Their [weights and biases](https://docs.paperspace.com/machine-learning/wiki/weights-and-biases) are modified accordingly for the next iteration of training. This process continues for all the images in the training dataset and the model slowly learns how to generate images that are similar to the training dataset.

A simple GAN architecture involves random noise given as the input to the generator that transforms this noise into the desired output by performing some operations on the input. Since the input is random data or noise, the GAN can generate a wide variety of outputs by sampling the data from different places in the distribution. This ensures that the GAN does not generate data that already exists.  

Through extensive testing and experimentation, it was found that the initial distribution of the input data does not matter much as the GAN transforms this data into something meaningful. Therefore, something as simple as a [uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)) can be given as the input. The input noise is just something to start with so that the GAN has something to transform.

### Conclusion Further reading
*GANs are very new in the field of machine learning and are in the early stages of development*. There are a variety of GANs with different use cases. For example, A DCGAN, or Deep Convolutional Generative Adversarial Network, is a modification of the GAN described above. The DCGAN uses [convolutional neural networks](https://towardsdatascience.com/a-comprehensive-guide-to-convolutional-neural-networks-the-eli5-way-3bd2b1164a53) and convolutional-transpose layers in the generator and discriminator part of the network, respectively, to generate new images. A DCGAN has a [deep neural network](https://en.wikipedia.org/wiki/Deep_learning) architecture that consists of multiple layers of neural networks for both generator and discriminator.

[Types of GANs](https://heartbeat.fritz.ai/introduction-to-generative-adversarial-networks-gans-35ef44f21193)

[GANs](https://pathmind.com/wiki/generative-adversarial-network-gan)

[Google developers](https://developers.google.com/machine-learning/gan)
