---
layout: engineering-education
status: publish
published: true
url: /engineering-education/transfer-learning-with-deep-learning/
title: Transfer Learning for Deep Learning
description: This article will be going over transfer learning and how it makes it easier to create and implement deep learning models.
author: collins-ayuya
date: 2020-11-09T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/transfer-learning-with-deep-learning/hero.jpg
    alt: transfer learning with deep Learning image
---
Deep learning models need a lot of data to work properly. They may be trained on millions of data points before making predictions. This makes the training process very expensive. Furthermore, such models often only perform a single task. We will look at how deep transfer learning can deal with these challenges.
<!--more-->
### Table of Contents
1. Relationship between transfer learning and deep learning.

2. Transfer learning vs traditional machine learning.

3. When to use deep transfer learning.

4. Types of deep transfer learning.

### Prerequisites
To best understand this article a basic understanding of machine learning and deep learning will be helpful. For an introduction or refresher on some basic machine learning concepts feel free to check out this [article](/engineering-education/supervised-learning-algorithms/).

A few other machine learning and deep learning concepts are covered [here](/engineering-education/automated-fake-news-detection/). For an introduction to transfer learning, I would advise going through my previous [article](/engineering-education/basics-of-transfer-learning/) as well.

### Useful Terms
**Pre-trained models** – models that have been trained on a sizeable benchmark dataset that will be used to solve a problem similar to an already solved problem.

**Marginal probability** – The probability of an event in the presence of all outcomes of another random variable. Consider two variables, X and Y. If all the outcomes and probabilities of the variables were put in a table, the marginal probability of X would be the sum of the probabilities of variable Y on the table margin. Given that the probability of X=A for all outcomes of Y, we have the marginal probability as “P(X=A) = sum P(X=A, Y=yi) for all y”.

**Feature** – an individual measurable property that is being observed. It's an attribute shared by all the independent units on that analysis is to be done.

**Loss function** – in machine learning, using a single training example, the loss function is the difference between the actual and predicted output from the model. This is often used interchangeably with a cost function. However, the cost function is defined as the average loss function for all training examples.

### Transfer Learning and Deep Learning
In my previous transfer learning [article](/engineering-education/basics-of-transfer-learning/), we defined transfer learning as a machine learning method where a model built for a specific task is reused as a starting point for a model on another task. It's re-using pre-trained models on newer problems.

Deep learning models have been applied to solve many problems that would have seemed impossible to solve a few years ago. Nonetheless, these models carry a few challenges with them. Mainly, these models need large amounts of data to operate. They also need a lot of computing resources. Furthermore, they currently need a lot of time and energy to be trained properly.

Deep neural networks have millions of weights that link many layers of neurons together. The weights are applied to inputs and adjusted during the training phase. The result is fed forward to provide an output. As we mentioned, this process is time-consuming and energy-intensive.

This provides transfer learning a huge opportunity to optimize deep learning processes. Transfer learning allows us to use deep learning models that are pre-trained on a problem to be used on a new but related problem. This saves a lot of time and computational energy.

#### Transfer Learning vs Traditional Machine Learning
To understand transfer learning, it's important to compare it to a traditional machine learning approach. A key difference between the two is isolation. Traditional machine learning can be described as isolated. It focuses on specific tasks. Plus it uses datasets that are meant for a specific task.

Another characteristic of the traditional approach is the training of isolated models that will be used for very specific tasks. This means that no (prior) knowledge will be retained or accumulated. The learning process takes place without any relationship with any past knowledge that may be used in different tasks.

However, transfer learning takes the contrary approach to the isolated nature of traditional machine learning approaches. The basis of this approach is the transferability of prior knowledge to tackle new tasks.

There is no isolation between models involved in transfer learning since it's possible (and beneficial) to leverage knowledge from pre-trained models to train new models. Here, learning new tasks is dependent on tasks that were learned (and trained) previously. The result is a faster and more efficient learning process.

Now that we understand the distinction between the two approaches, it's important to understand when to use deep transfer learning.

#### When to use Deep Transfer Learning
##### Insufficient training data
For proper implementation of a deep learning model on a task, a lot of data is required. Yet, it's common to be in scenarios where there is insufficient labeled training data. It's cumbersome attempting to label data for a deep learning model from scratch.

In tasks where domain expertise may be required to create a quality dataset, it's quite time consuming to attempt to gain (that needed) domain knowledge. This a great example of where Deep transfer learning may come into play.

##### Optimization
Transfer learning optimizes the machine learning process. In addition to saving time, it can also make the learning process more efficient. For instance, a developer can spend less time worrying about training (a model) and more time on how to best improve the performance of the model.

##### Positive environmental impact
It's important to consider social impact. At a time when it's imperative to reduce our collective carbon footprint, we need to consider how large deep learning models harm the environment. Their carbon footprint is massive. The results of a study carried out in this [paper](https://arxiv.org/abs/1906.02243) found that the process of training a large neural network can emit five times more CO2 than the lifetime emissions of an average car.

Taking all this into account, transfer learning has an added bonus as it reduces the computational resources by using them more efficiently.

### Types of Deep Transfer Learning
It’s worth noting that, depending on the literature you may come across, the concepts detailed below are related to, or heavily involved in the concept of transfer learning. Some can also be used independently from transfer learning.

#### Domain Adaptation
Domain adaptation involves a scenario where marginal probabilities of the source domain and target domain differ.

To make it clearer, consider a context where a model is trained on a source domain that is different from the target domain. This is the basis of domain adaptation.

The goal of domain adaptation is teaching a model for a target domain where little to no labeled data is available. It attains its goal by leveraging knowledge from a source domain with adequate labeled data. As we mentioned, this source domain differs from the target domain. However, both domains are related. The tasks are also more or less the same.

Domain adaptation can be categorized as either homogenous or heterogeneous. This is dependent on how homogenous the feature spaces from both source and target domains are. A feature space is a set of features that are identified from data.

Homogenous domain adaptation refers to where two domains have the same feature spaces but different feature distributions. Heterogeneous domain adaptation has heterogeneous feature spaces in different domains. As a result, it is much more difficult to take on.

The feature spaces have no similarity. To link up two different domains, supplementary information, such as labels, is required.

If such information is not available, it's hard to deal with heterogeneous domain adaptation. The unavailability of supplementary information is a common scenario in practice.

For further reading, I mentioned a couple of applications involving domain adaptation in this [article](/engineering-education/basics-of-transfer-learning/).

#### Domain Confusion
Consider feature representation transfer, which is covered in my previous transfer learning [article](/engineering-education/basics-of-transfer-learning/). We defined it as “transferring features” from source to target domains.

In a neural network, different layers identify different sets of features. Such an approach can be used to learn features that don't vary regardless of the domain.

This helps improve their transferability across domains. In such a context, the feature representations between the source and target domains are made to be as similar as possible. This is done at the expense of allowing the model to learn any feature representations.

But why? The goal is to add an objective to the model at the source to encourage similarity with the target by confusing the source domain itself. Specifically, domain confusion loss is used to confuse the high-level classification layers of a neural network by matching the distributions of the target and source domains.

A fitting example of such a network is a Domain-Adversarial Neural Network (DANN). The network and relevant concepts around it are expressed in the paper [Domain-Adversarial Training of Neural Networks](https://arxiv.org/abs/1505.07818).

DANNs consist of two losses; classification loss and domain confusion loss. The aim is to make sure samples come across as mutually indistinguishable to the classifier. To achieve this, one has to minimize the classification loss for the source samples. One has to also minimize the domain confusion loss for all samples.

#### Multitask Learning
As the name suggests, multitask learning involves learning several tasks simultaneously. However, the learning is done without a distinction between the source and targets.

A basic example of multitask learning is the use of smart cameras to detect multiple objects in a frame simultaneously. In the absence of multitask learning, one would have to train a model to detect each object.

[GPT-3](/engineering-education/introducing-gpt3/) is an example of a multitask model. It's also a few-shot learner (one-shot and zero-shot learner). GPT-3 shows that a model can be both a multitask learner and a few shot learner.

The distinction between the two is that few-shot learning involves feeding a model with very little training data to carry out a given task whereas multitask learning may be used in scenarios where there is an abundance of labeled input data that can be shared with a different task with much less labeled data.         

Multitask learning has the goal of optimizing all the parameters of the network and improving all the performance of multiple tasks. Samples from these tasks are key to this process. The learner takes in information about many tasks simultaneously. The learner, through some shared knowledge, optimizes the performance of all the tasks.

This differs from the base principle of transfer learning where the learner initially is unaware of the target task.

#### One-Shot Learning
A drawback of deep neural networks is that they need a lot of data to learn. In real-world contexts, it might not be possible to have labeled data in all classes of a classification problem. One might also deal with a scenario where additional classes, beyond the scope of labeled data, have to be added.

In such scenarios, one-shot learning may be of great benefit. One-shot learning is a form of transfer learning where the required output of an algorithm is inferred based on one training example.

A model is fed with a single example of the task that is required. For example, a language translation task. A model may be required to translate a word from Swahili to English. It's given a single example of the translation task. Then it's expected to learn from that example for future tasks. This is similar to few-shot learning which is a technique that uses a few examples to generate the required output.

#### Zero-Shot Learning
Zero-shot learning can be useful in contexts where we lack labeled data in all classes of a classification problem, or when new classes have to be added. This variant of transfer learning is not dependent on any labeled examples to learn a task.

An example of zero-shot learning would a pre-trained model like [GPT-3](/engineering-education/introducing-gpt3/) being implemented on a language translation task. A natural language description of the task like “translate from Swahili to English” is given to the model. The model carries out the translation task without any examples.

### It’s a Wrap
Transfer learning makes it easier to create and implement deep learning models. Since deep learning is becoming more and more integral to solving a range of problems in domains such as natural language processing (NLP) and video processing, we can expect to find elements of transfer learning to continue increasing.

A lot of time and energy is saved through transfer learning. I mentioned a few example applications of transfer learning [here](/engineering-education/basics-of-transfer-learning/). Feel free to check them out. Happy reading!

### References
1. [A Survey on Transfer Learning](https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf)

2. [Return of Frustratingly Easy Domain Adaptation](https://arxiv.org/abs/1511.05547)

3. [Domain-Adversarial Training of Neural Networks](https://arxiv.org/abs/1505.07818)

4. [What Is Deep Transfer Learning and Why Is It Becoming So Popular?](https://towardsdatascience.com/what-is-deep-transfer-learning-and-why-is-it-becoming-so-popular-91acdcc2717a)

5. [A Comprehensive Hands-on Guide to Transfer Learning with Real-World Applications in Deep Learning](https://towardsdatascience.com/a-comprehensive-hands-on-guide-to-transfer-learning-with-real-world-applications-in-deep-learning-212bf3b2f27a)

6. [https://machinelearningmastery.com/transfer-learning-for-deep-learning/](https://machinelearningmastery.com/transfer-learning-for-deep-learning/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
