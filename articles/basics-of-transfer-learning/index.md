---
layout: engineering-education
status: publish
published: true
url: /engineering-education/basics-of-transfer-learning/
title: Basics of Transfer Learning
description: This article will go over the basics of transfer learning within machine learning and deep learning. Transfer learning allows us to train newer models and satisfy a variety of tasks.
author: collins-ayuya
date: 2020-10-28T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/feature-engineering-in-machine-learning/hero.jpg
    alt: transfer learning image
---
When we as human beings learn new things, we do not always learn from scratch. We often transfer past knowledge and apply them to new tasks. For example, knowing how to ride a bike makes it easier to learn how to ride a motorcycle. Learning to code in C makes it easy to learn to code in Python. This is the gist of transfer learning.
<!--more-->
In the quest to achieve artificial general intelligence (AGI), transfer learning can be applied to machine learning models. We will look at the theoretical concepts of transfer learning.

### Table of Contents
1. Defining transfer learning.

2. Need for transfer learning.

3. A few transfer learning approaches.

4. Applications of transfer learning.

### Prerequisites
Before we jump right in, it is recommended that the reader have a basic understanding of machine learning and deep learning. For an introduction or refresher on some basic machine learning concepts check out this [article](/engineering-education/supervised-learning-algorithms/). Some machine learning and deep learning concepts are also covered [here](/engineering-education/automated-fake-news-detection/).

### Useful Terms
**Pre-trained models** – models trained on a sizeable benchmark dataset to solve a problem similar to an already solved problem. We will discuss the [applications](#applications-of-transfer-learning) of such models in transfer learning later on.

**Neural network** – a series of algorithms that are modeled on the human brain, to identify underlying relationships in data.

**Artificial general intelligence (AGI)** – hypothetical machine intelligence with the capacity to learn or understand any intellectual task a human being can.

**Domain knowledge** – knowledge about the environment in which a target system operates. In this context, the environment can be a specific activity or profession. For example, domain knowledge in the medical field describes the knowledge of medical experts.

**Feature** – an individual measurable property that is being observed. It is an attribute shared by all the independent units on which analysis is to be done.

### Transfer Learning
In traditional machine learning, learning is isolated. To carry out specific tasks, one would need to train isolated models. One would also need very specific datasets. Even if tasks between the two models are related, you would not be able to transfer knowledge from one model to another.

This makes the machine learning process very tedious. Even more so when tasks that exist could benefit from the transfer of previous knowledge to solve a (new) problem. Transfer learning allows us to train newer models and satisfy a variety of tasks. These tasks are accomplished by leveraging knowledge from previously trained models.

We can define transfer learning as a machine learning method where a model built for a specific task is reused as a starting point for a model on another task. Transfer learning involves two key concepts; tasks and domains.

A domain consists of a feature space and a marginal probability distribution over the feature space. A feature space can be defined as a set of features identified from data. Marginal probability distribution is the marginal probability of a random variable in the presence of more random variables. A marginal probability refers to the probability of an event in the presence of all outcomes of another random variable.

Consider two variables, X and Y. If all the outcomes and probabilities of the variables were put in a table, the marginal probability of X would be the sum of the probabilities of variable Y on the table margin. Given that the probability of X=A for all outcomes of Y, we can describe the marginal probability as "P(X=A) = sum P(X=A, Y=yi) for all y".

This is in contrast to a joint probability approach that is concerned with the probability of two simultaneous events. The joint probability of two or more random variables is the joint probability distribution.   

Since we have defined transfer learning, it is important to understand the "why" behind it. Below we will explore the motivation or need for transfer learning.

### Motivation / Need for transfer learning
#### Saving training time
For complex tasks, it may take a long time to train a neural network from scratch. Access to useful training data may also be limited. The process of obtaining training data is time-consuming.

The data has to be collected and prepared. Data preparation involves analyzing the data, rectifying irregularities, and finally cleaning the data. Then it can be decided what portions of the data can be used to train the neural network.

Using a pre-trained model significantly shortens model training time. It means we would only need to tweak the model and we can use the time saved to work on other tasks.

#### Better neural network performance
Deep learning models are often specialized to be used in a specific domain or task. They might offer state-of-the-art performance but only on very particular (limited) datasets. This means that, given a similar task to the one in which a model offered high performance (with a past task), that model may perform poorly (with a new task).

This lack of reusability supports the value and need for transfer learning. The use of transfer learning traverses domains and tasks. When dealing with tasks like those they were trained on, pre-trained models ensure performance is satisfactory.

#### Doesn't need much data
To train a neural network from scratch requires a significant amount of data. This data may not always be readily available. As mentioned above, the processes of data collection and preparation are time consuming and tiresome.

Furthermore, sometimes domain knowledge is required to build large labeled datasets. It may also be expensive to build or acquire said datasets. Especially considering a deep learning approach, some datasets may take years to create.

Sometimes it may involve the collaborative efforts of many domain experts to create high-quality datasets. The use of transfer learning eases the burden on data scientists and makes the machine learning process more efficient.

#### Contribution towards AGI
To achieve artificial general intelligence, machines will need to learn common sense. The very nature of transfer learning works towards achieving some aspect of common sense.

Specifically, the ability to compare different problem scenarios and use previous knowledge to carry out a task is common sense to a human being. Data scientists and researchers believe transfer learning is playing its role in achieving artificial general intelligence.

It's also worth noting that it's possible to carry out transfer learning in the contexts of supervised, unsupervised, and reinforcement learning. We shall explore this in the next section.

### Transfer learning strategies and approaches
#### Transfer learning strategies
In line with this [paper](https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf), the strategies explored below are a representation of the relationship between transfer learning and traditional machine learning. They show the possibilities of transfer learning in different traditional machine learning contexts.

![strategies](/engineering-education/basics-of-transfer-learning/strategies.jpg)

[Image of Transfer Learning Strategies](https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf)

##### Inductive transfer learning
Inductive learning algorithms are traditional machine learning algorithms that are used to produce a set of classification rules. These algorithms produce rules of an "if-then" fashion.

The algorithms are iterative, meaning they generate rules at each iteration. These inductive algorithms come up with a strategy to carry out a task. Their iterative nature means they don't need separate instructions at each step.

With inductive transfer learning, the source domain and the target domain are the same. Yet, the source tasks and target tasks differ. Algorithms try to apply inductive biases from the domain of the source to improve the target task. [Inductive bias](https://en.wikipedia.org/wiki/Inductive_bias) refers to a set of assumptions a learning algorithm uses to predict outputs given inputs it has never before encountered.

##### Unsupervised transfer learning
Unsupervised learning algorithms are algorithms whose output relies on finding patterns within input data. In unsupervised learning, there are no complete or labeled datasets given.

Unsupervised transfer learning is like inductive transfer learning. The target and source domains are similar but the tasks differ. Unsupervised transfer learning focuses on unsupervised tasks in the target domain. As we had mentioned above, unsupervised learning has no labeled datasets. Thus, in unsupervised transfer learning, no labeled data is available in both the source and target domains.

##### Transductive transfer learning
Here we are dealing with a context that has a similar source and target tasks but different domains. The domain of the source boasts of having a lot of labeled data yet the target domain has none.

In traditional machine learning, transductive learning defines a situation where all test data is required to be seen at the time of training. This means that when new test data arrives, it must be categorized together with all existing data. In this traditional context, the model cannot be reused for future data.

Here, we define transductive learning as a transfer learning setting where some unlabelled data has to be available in the target domain and tasks have to do the same. For example, consider a source domain 'Ds' with a learning task 'Ts' and a target domain 'Dt' with a learning task 'Tt'. The goal of transductive transfer learning is to improve the learning of the target predictive function 'Ft' in 'Dt'. This is to be done using knowledge in 'Ds' and 'Ts'. Note that Ds and Dt are not equal. But tasks Ts and Tt are the same.

As per our example, since the source and target tasks are the same, one can adapt the predictive function learned in the source domain to be used in the target domain through unlabeled test-domain data.

#### Transfer learning approaches
The strategies discussed above help us understand where transfer learning can be implemented. The approaches explored below shed some light on what can be transferred in the context of the above strategies.

##### Instance transfer
In an ideal context, reusing all the knowledge from a source domain on a target task would be a common occurrence. Realistically, it's not possible to re-use data from the source domain directly. But, various instances from the source domain can be re-used.

These instances of the source are transferred to the target task. Instance-based approaches compare the similarity between training samples in the source domain and samples in the target domain. They then adjust the weight values for the source domain samples that have similar samples in the target domain. These instances combined with data of the target domain define the instance transfer technique.

Let's look at an example of the training of instance segmentation models. Instance segmentation refers to a computer vision technique that helps identify instances of a number of objects in a frame at the pixel-level. In such a case, an instance refers to an occurrence of a specific object or objects. These segmentation models may be used to distinguish between objects and their backgrounds.

This may be useful in a context where one seeks to visually pinpoint manufacturing defects in an industrial setting. These instance segmentation models may be trained using models that are pre-trained on visual data of numerous objects.

Since these pre-trained models already have knowledge that is beneficial to the image segmentation models, the image segmentation models may re-use instances of objects from the pre-trained models to identify similar instances of objects in a frame. For a deep dive into a similar example, check out this post by [Nvidia](https://developer.nvidia.com/blog/training-instance-segmentation-models-using-maskrcnn-on-the-transfer-learning-toolkit/).          

##### Feature-representation transfer
A feature may be defined as a property shared by independent units of data on which analysis should be done. The goal of feature representation transfer is to find suitable feature representations.

These feature representations reduce the difference between the source and target domains. We are basically "transferring features" from the source domain to the target.

This technique also reduces the error of classification and regression models. Supervised or unsupervised methods may be used for this technique but it's dependent on the availability of labeled data.

##### Parameter transfer
A model parameter refers to a configuration variable that is internal to the model and whose value can be estimated from data. Parameters are required by the model when making predictions. A hyperparameter is a configuration external to the model whose value cannot be estimated from data. Parameters differ from features as features can be described as data points chosen to define the input to a model.

Understanding the difference between features and parameters is key in understanding the difference between parameter transfer and feature-representation transfer. Feature representation transfer is concerned with feature representations while parameter transfer focuses on discovering shared parameters.    

Parameter transfer is based on two assumptions. The first one is that models with related tasks share some parameters. The second is that these models share prior distribution of hyperparameters. This technique, therefore, aims to discover shared parameters between source domain models and target domain models. Shared parameters make it possible to carry out transfer learning.

##### Relational-knowledge transfer
Relational-knowledge transfer maps out relational knowledge between source and target domains. This method involves data that is not independent and identically distributed. For example, networked data and social network data. The technique looks to transfer the relationship within data from a source to a target domain.

For a deeper dive into these transfer learning approaches, take a look at this [paper]( https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf).

### Applications of transfer learning
Several transfer learning algorithms are used in other related fields. Such as medicine, image detection, speech recognition, and recommendation systems to name a few. We will go over these in more detail in the following sections.

#### Medicine
Many algorithms have been proposed and implemented in medical imaging to reduce the workload of doctors. They also serve the purpose of improving the accuracy of medical judgment calls or diagnoses.

Here is a use case of transfer learning with [convolutional neural networks (CNN)](https://en.wikipedia.org/wiki/Convolutional_neural_network) to automatically [detect Covid-19 from x-ray images](https://link.springer.com/content/pdf/10.1007%2Fs13246-020-00865-4.pdf).

We can also mention an approach involving segmentation tasks of chest X-ray images using domain adaptation as an example. Domain adaptation refers to when a model is trained on a different source domain from the target domain. Both domains are related.

We could also draw from our example on image segmentation with the instance transfer section to visualize how transfer learning for chest x-ray segmentation tasks works.

Another method involves the use of adversarial domain adaptation. Adversarial domain adaptation is a method used to transform the features of many target domains to be the same as the source domain features. This method is used to classify whole-slide images to be used when diagnosing prostate cancer. Similar approaches and uses of the CNNs architectures can be used for the detection of various cancers, health supervision, as well as detection of heart disease.

#### Computer Vision
Deep learning has been a driver of [computer vision](/engineering-education/computer-vision-straight-lines/). Different neural network architectures are used to carry out computer vision tasks. A great example of such a task is object recognition.

Transfer learning for computer vision may occur through transferring of features in neural networks to improve the performance of the target network. The layers of a neural network may act as feature extractors.

Some layers may extract image features such as detecting edges. Other layers may focus on task-specific features. For a more technical read on this application, feel free to read this [paper](https://arxiv.org/abs/1411.1792) that discusses the transferability of features in deep neural networks.

#### Speech Recognition
Automatic speech recognition models provide a very straightforward application of transfer learning. The models used for the English language have been applied to improve the performance of speech recognition models of other languages. Here is a basic description of how this would work.

A trained neural network may be used to extract features from vast speech data. It may then be used to inject this information into an algorithm (like a support vector machine), thus achieving transfer learning.

### Wrapping up
We have taken a high-level approach to introduce the concept of transfer learning. Transfer learning is an asset to researchers and data scientists. For one, it can make the machine learning process more efficient. Models not having to be built and trained from scratch saves a lot of time and effort for engineers. Now that we understand the basics, I aim to write an article delving deeper into transfer learning in deep learning soon. See you then!

### References
1. H. Liang, W. Fu, and F. Yi, ["A Survey of Recent Advances in Transfer Learning,"]( https://ezproxy.ku.ac.ke:2546/document/8947072) 2019 IEEE 19th International Conference on Communication Technology (ICCT), Xi'an, China, 2019, pp. 1516-1523, DOI: 10.1109/ICCT46805.2019.8947072.

2. [A Survey on Transfer Learning](https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf)

3. [A Comprehensive Hands-on Guide to Transfer Learning with Real-World Applications in Deep Learning](https://towardsdatascience.com/a-comprehensive-hands-on-guide-to-transfer-learning-with-real-world-applications-in-deep-learning-212bf3b2f27a)

4. [A Gentle Introduction to Transfer Learning for Deep Learning](https://machinelearningmastery.com/transfer-learning-for-deep-learning/)

5. [Transfer Learning: Leverage Insights from Big Data](https://www.datacamp.com/community/tutorials/transfer-learning)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
