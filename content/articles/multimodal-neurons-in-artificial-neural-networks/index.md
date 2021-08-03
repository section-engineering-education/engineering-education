---
layout: engineering-education
status: publish
published: true
url: /multimodal-neurons-in-artificial-neural-networks/
title: Multimodal Neurons in Artificial Neural Networks
description: In this article, we will explore the different types of neurons in artificial neural networks. 
author: wilkister-mumbi
date: 2021-05-02T00:00:00-11:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/multimodal-neurons-in-artificial-neural-networks/hero.jpg
    alt: Multimodal Neurons example image
---
In Artificial Neural Networks, we have not seen the concept of the multimodal neuron perception being used. We have only seen neurons responding to the same class of images because we train them as image classifiers.
<!--more-->
Before you start reading about the use of multimodal neurons in artificial neural networks, it is crucial to understand what [DeepDream](https://en.wikipedia.org/wiki/DeepDream), a computer vision program created by Google, entails. The idea behind DeepDream is to leverage Convolution Neural Networks (CNNs).

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Categories of Neurons](#categories-of-neurons)
4. [Typographic Attacks](#typographic-attacks)
5. [Wrapping Up](#wrapping-up)
6. [References](#references)

### Prerequisites
These CNNs produce dream-like hallucinogenic appearances by overprocessing images. This concept is demonstrated in the link provide in the example images. The next concept that is important to understand in the multimodal neuron model is using the [CLIP](https://openai.com/blog/clip/) model by OpenAI, a model which connects texts and images. 

The CLIP model learns using a Contrastive Learning approach between image-text pairs. The goal is to make the model efficiently learn visual concepts from natural language supervision. Learn more about the contrastive learning approach on this [article](/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/).

### Introduction
The human brain contains multimodal neurons. This discovery was made fifteen years ago by a team of researchers and was discussed in this [paper](https://www.nature.com/articles/nature03687). These neurons respond to different sensory inputs' versatility, resulting in enhanced detection or identifying a unique stimulus.    

In biology, we expect neurons that respond, not to specific individual words or features but abstract concepts. For example, biological neurons would respond to "Halle Berry" photos, drawings and sketches of Halle Berry, and texts of Halle Berry. In Artificial Neural Networks, we have not seen the concept of the multimodal neuron perception being used. 

We have only seen neurons responding to the same class of images because we train them as image classifiers. Besides, these models do not generalize well to other modalities such as sketches and texts.

In the main paper, they present an overview of the different neurons that they find. They have gone through these neurons and have used their feature visualization technique previously used in their CLIP model, with every single one of them. 

### Categories of Neurons
A few examples of the neurons they found include:

#### 1. Region Neurons
This type of neuron responds to different kinds of images related to a particular geographic region and cities. In the example below, the neuron responds to the USA's architecture, nature of Europe's landscape, faces of Indians, and text related to West Africans.

![Region Neurons](/engineering-education/multimodal-neurons-in-artificial-neural-networks/region-neuron.PNG)

*[Image Source: Distill](https://distill.pub/2021/multimodal-neurons/)*

#### 2. Person Neurons
They found neurons that respond to the faces of specific persons. For example, the images below show content associated with Donald Trump, Lady Gaga, Ariana Grande, and Elvis Presley. Besides faces, these neurons could also respond to texts, architectures, poses, and logos associated with the same persons. 

![Person Neuron](/engineering-education/multimodal-neurons-in-artificial-neural-networks/person-neuron.PNG)

*[Image Source: Distill](https://distill.pub/2021/multimodal-neurons/)*

#### 3. Emotion Neurons
They found neurons that respond to words, facial expressions, and any content associated with an emotional or mental state. These emotional states include sadness, surprise, shock, crying, happiness, and sleepiness. 

This example is shown below:

![Emotion Neuron](/engineering-education/multimodal-neurons-in-artificial-neural-networks/emotion-neuron.PNG)

*[Image Source: Distill](https://distill.pub/2021/multimodal-neurons/)*

So far we have seen that the multimodal neurons in the CLIP model respond well to both the images and texts for a given concept. But, what if we perform a typographic attack (an adversarial attack) on the model? Will it still correctly classify these images and texts correctly? This next section covers two types of typographic attacks and how it affects the model.

### Typographic Attacks
1. The CLIP model responds heavily to rendered text. This can be seen from the adversarial attacks where, i.e., take an apple and attach a sticker labeled iPod on it, it labels the picture as an iPod instead of an apple. This example shows that the text might still be too dominant in this model. They also show that randomly rendering texts on images confuse the model. For example, rendering texts of "pizza" on top of a dog image confuses the classifier by making it classify the picture as "pizza" instead of a "dog."

This has been demonstrated below: 

![Typographic Attacks](/engineering-education/multimodal-neurons-in-artificial-neural-networks/chihuahua-pizza.PNG)

*[Image Source: Distill](https://distill.pub/2021/multimodal-neurons/#emotion-neurons)*

2. Another good example they use to demonstrate the adversarial attacks involves applying the Stroop effect. They discovered that by mislabeling color, the model fails miserably. For example, given the textual information "green" with red font color, the model pays no attention to the color; it pays much more attention to what the word says. It needs to recognize both the color and what the word says. 

This example is demonstrated below:

![Stroop Effect](/engineering-education/multimodal-neurons-in-artificial-neural-networks/green-color.PNG)

*[Image Source: Distill](https://distill.pub/2021/multimodal-neurons/#emotion-neurons)*

### Wrapping Up
Overall, though it is not a perfect model (yet) as it experiences typographic attacks, I think this is exciting new research, and I'm excited to see where this goes. There are still many more categories of neurons they found in this [paper](https://openai.com/blog/multimodal-neurons/). 

I have only scratched the surface. Feel free to read more on not only these categories but multimodal neurons as a whole. You can also experiment with their different feature visualization techniques.

Happy learning!

### References
1. [Multimodal Neurons in Artificial Neural Networks](https://openai.com/blog/multimodal-neurons/)
2. [Multimodal Neurons in Artificial Neural Networks](https://distill.pub/2021/multimodal-neurons/)
3. [CLIP: Connecting Text and Images](https://openai.com/blog/clip/)
4. [WIT: Wikipedia-based Image Text Dataset for Multimodal Multilingual Machine Learning](https://arxiv.org/pdf/2103.01913.pdf)
5. [DeepDream](https://en.wikipedia.org/wiki/DeepDream)
6. [Invariant visual representation by single neurons in the human brain](https://www.nature.com/articles/nature03687)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
