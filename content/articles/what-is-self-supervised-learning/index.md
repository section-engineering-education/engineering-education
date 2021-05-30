---
layout: engineering-education
status: publish
published: true
url: /what-is-self-supervised-learning/
title: What is Self-Supervised Learning?
description: Self-supervised learning is a form of supervised learning that doesn't require human input to perform data labeling. The results are obtained by models that analyze data, label and categorize information independently without any human input. 
author: willies-ogola
date: 2021-04-07T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-self-supervised-learning/hero.jpg
    alt: Self-Supervised Learning example image
---
Artificial Intelligence (AI) is a rapidly advancing field with various techniques being billed as the most promising to keep an eye on. One of those techniques is self-supervised learning.
<!--more-->
This article will introduce self-supervised learning. Self-supervised learning can be viewed as a branch of unsupervised learning, which both have recently been a hot topic in Artificial Intelligence.
### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [What is Supervised Learning?](#what-is-supervised-learning)
4. [Challenges with Supervised Learning](#challenges-with-supervised-learning)
5. [Introduction to Self-Supervised Learning](#introduction-to-self-supervised-learning)
6. [Applications of Self-Supervised Learning](#applications-of-self-supervised-learning)
7. [Summary](#summary)
7. [Wrapping Up](#wrapping-up)
8. [References](#references)

### Prerequisites
Before reading this article, a reader should have basic knowledge of Artificial Intelligence and Machine Learning. 

If you're a beginner, feel free to read this [article](/section-engineering-education/supervised-learning-algorithms/) published on [Section](https://www.section.io/engineering-education/) to better understand the differences between supervised learning and unsupervised learning.

### Introduction
As previously stated, Artificial Intelligence is a rapidly advancing field with many techniques being billed as the most promising to keep an eye on. One of those techniques is self-supervised learning. This article will introduce us to self-supervised learning.

### What is supervised learning?
Supervised learning is a useful technique in deep learning. It's the most widely used type of learning when it comes to AI. It is a learning type where machines learn from labeled data to perform tasks such as predicting and classification of data. 

For example, a supervisor or a teacher points out mistakes to a student during the learning process. The student ends up correcting the mistakes until he/she becomes good at them.

In the supervised learning setting, we want an AI system to consider some data, i.e., given an animal's image, it can classify it with a label. For example, an image of a dog can be classified with the label "a dog." Once the AI system has been trained on the correct labeling of different animals with their correct labels, it should classify new unseen animal data with their correct labels.

Supervised learning is how banks know whether you are qualified to be given a loan or not, how Facebook tells your face apart from your friend's face, and how email companies can classify your emails into different categories. Yet, supervised learning does have its drawbacks.

### Challenges with supervised learning
1. For us to perform Supervised Learning, we need large amounts of data. For example, in the ImageNet challenge, about 1.4 million images are used. That's a vast amount of data. 
2. Labeling the data is a very tedious process. In most cases, you have to leverage crowdsourcing platforms to label these enormous amounts of data.
3. It is a very costly process, especially, for instance, segmentation and object detection, requiring detailed annotations. 
4. Intelligence is not about mapping inputs to labels, as is the case with supervised learning. There is a need to make machines learn to reason as humans do.

### Introduction to self-supervised learning
How do humans learn so quickly?

Humans learn by using both supervised learning and unsupervised learning. We are multifaceted. Through supervised learning, humans can learn by being taught by their parents, teachers, by performing experiments in schools, and make conclusoin from them. 

On the contrary, we also learn through unsupervised learning by acquiring very minimal and simplified data. For example, babies and animals can learn things and understand the information in their surrounding environment only through observation and remarkably little interaction in the initial stages (through experimentation).

This multifaced approach to learning has been so easy for humans. But, that has not been the case for deep learning systems. Though we have seen robust deep learning systems that have performed image recognition and natural language processing tasks, performing complex tasks has remained challenging. 

This is the problem self-supervised learning is trying to address. Self-supervised learning is a form of supervised learning that doesn't require human input to perform data labeling. The results are obtained by models that analyze data, label, and categorize information independently without any human input. 

The only difference is that, unlike unsupervised learning, self-supervised learning does not perform the grouping and clustering of data, as is the case with unsupervised learning. 

This learning type allows machines to examine part of a data example to figure out the remaining part. In simple terms, self-supervised learning learns from unlabeled data to fill in the blanks for missing pieces. This data can be in the form of images, text, audio, and videos.

For example, in videos, the machine can predict the missing part of a video given only a video section. Videos can also be used in predicting missing frames in a video.

Self-supervised learning aims to make deep learning models data-efficient. This means that it helps reduce the over-dependence on vast amounts of data to achieve good models.

### Applications of self-supervised learning

#### 1. Natural Language Processing (NLP)
Self-supervised learning helps predict the missing words within a text in. This is achieved by showing segments of texts to a giant neural network with billions of parameters, i.e., the likes of OpenAI's [GPT-3](https://openai.com/blog/openai-api/) and Google's [BERT](https://arxiv.org/pdf/1810.04805.pdf). 

You mask 15% of the text to force the network to predict the pieces of words that are missing. 

#### 2. Computer vision
[SimCLR](https://arxiv.org/pdf/2002.05709.pdf) is a framework used to learn visual representations in images using self-supervised learning. The framework performs two main tasks: a pretext task and the downstream (real) task. Self-supervised learning is used in the pretext task. 

It involves performing simple augmentation tasks such as random cropping, random color distortions, and random [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur) on input images. This process enables the model to learn better representations of the input images. These results are passed into the downstream task module, that performs the main tasks such as detection and classification tasks. 

### Summary
1. Self-supervised learning exploits unlabeled data to yield labels. This eliminates the need for manually labeling data, which is a tedious process.
2. They design supervised tasks such as pretext tasks that learn meaningful representation to perform downstream tasks such as detection and classification.
3. This type of learning helps fill in the blanks. For example, they help predict missing words in NLP.

### Wrapping up
Self-supervised learning has helped develop AI systems that learn with fewer samples or fewer trials. This has been evident in the Natural Language Processing (NLP) field with GPT-3 and BERT, which can learn with very few examples. 

This network aims not to learn using labeled data but good representations from unlabeled data. This reduces the need to depend on vast amounts of data like in the supervised learning setting. 

Currently, self-supervised learning is still in its infancy. Machines cannot yet learn or understand everything humans can, but it seems to be an exciting and promising step in the right direction.

Happy learning!

### References
1. [A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/pdf/2002.05709.pdf)
2. [Unsupervised Representation Learning by Predicting Image Rotations](https://arxiv.org/pdf/1803.07728.pdf)
3. [Generative Pre-trained Transformer 3 (GPT-3)](https://openai.com/blog/openai-api/)
4. [Bidirectional Encoder Representations from Transformers (BERT)](https://arxiv.org/pdf/1810.04805.pdf)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
