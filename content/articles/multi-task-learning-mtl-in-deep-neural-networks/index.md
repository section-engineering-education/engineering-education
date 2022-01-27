---
layout: engineering-education
status: publish
published: true
url: /multi-task-learning-mtl-in-deep-neural-networks/
title: Getting Started with Multi-Task Learning (MTL) in Deep Neural Networks
description: In this article, we will go through the basics of multi-task learning (MTL), its mechanisms, and real-life applications. We will also look at how you can get started with MTL in deep neural networks. 
author: purity-mutunga
date: 2021-12-23T00:00:00-11:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/multi-task-learning-mtl-in-deep-neural-networks/hero.jpg
    alt: Multi Task Learning Example Image
---
It is common practice in machine learning to focus on improving a certain statistic such as a business KPI score or a benchmark score. A model or a group of models are trained to fulfill the intended task. The performance of these models is then tuned and adjusted to the level where it can no longer improve.
<!--more-->
By focusing only on one activity, we miss out on information that could help us improve our performance. This performance is on the parts we are most concerned about. It's the training signals of related tasks that provide this knowledge. To improve our model's ability to generalize, we can share representations between tasks that are similar. This type of learning is called multi-task learning (MTL).

This article will take you through an overview of MTL and how you can get started with MTL in deep neural networks. It will also look at the MTL methods for deep learning and  MTL mechanisms. Lastly, we will take a look at some of the applications of MTL.

### Table of contents
- [An overview of multi-task learning (MTL)](#an-overview-of-multi-task-learning-mtl)
- [MTL methods for deep learning](#mtl-methods-for-deep-learning)
- [MTL mechanisms](#mtl-mechanisms )
- [MTL in non-neural models](#mtl-in-non-neural-models)
- [Auxiliary tasks in MTL](#auxiliary-tasks-in-mtl)
- [Applications of MTL](#applications-of-mtl)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### An overview of multi-task learning (MTL)
Multi-task learning (MTL) is a field of machine learning in which models using data from multiple tasks are trained at the same time. This is done using shared representations to uncover the common ideas among a group of tasks that are connected. These shared representations help to overcome the well-known drawbacks of deep learning by increasing data efficiency.

Data efficiency is achieved by generating a higher speed for learning related or downstream tasks. However, obtaining these results hasn't been trivial, and the subject of extensive research is currently being pursued.

Single task learning does not adequately represent the learning process of human beings. Therefore, combining information across domains is an essential component of human intelligence. For example when a child is young, when he or she first learns to walk or use their hands, he or she develops basic motor abilities that are based on principles of balance and intuition.

With a prior understanding of basic motor abilities and abstract concepts, people can build on their previous knowledge of more difficult tasks such as riding a bike or walking a tightrope.

When we attempt to learn something new, we bring a great deal of previously acquired knowledge with us. As a result, it's no surprise that neural networks require a large number of training samples and a significant amount of processing time. It would be difficult to walk a tightrope without first knowing how to walk on solid ground

The goal of multi-task learning, as well as the allied fields of meta-learning, transfer learning, and continuous learning, should be the development of systems to facilitate this process. This process is critical to humans' ability to learn quickly and with a limited number of instances.

### MTL methods for deep learning
The two most common methods for performing MTL with deep neural networks are [hard and soft parameter sharing](https://avivnavon.github.io/blog/parameter-sharing-in-deep-learning/).

#### Hard parameter sharing
MTL in deep neural networks is mostly achieved through sharing hard parameters. This is put into practice by sharing the hidden layers amongst all jobs while at the same time maintaining several task-specific output layers. This is a very beneficial strategy since it reduces the danger of overfitting by having a model for diverse tasks using a common hidden layer. Overfitting is when the model takes in and learns concepts from the noise or random oscillations in the training data.

#### Soft parameter sharing
Soft parameter sharing adds a constraint to achieve similarity among related parameters rather than sharing the same value. Furthermore, we penalize the difference in parameters across the models that we train for each task. By loosely connecting the shared space representations, this method, in contrast to rigid sharing, allows activities greater flexibility.

### MTL mechanisms
Understanding multi-task learning requires knowing the mechanisms that underlie it. The following are the main mechanisms of MTL:

#### 1. Attention focusing
It may be challenging for a model to distinguish between important and irrelevant variables. If the job is noisy or if the data set is small yet high-dimensional. As subsequent tasks provide further evidence for the insignificance of those features. Multi-tasking learning can enable the model to concentrate on those features.

#### 2. Regularization
MTL is a regularizer since it introduces an inductive bias into the equation discouraging earning a more complicated or flexible model. As a result, the threat of [overfitting](https://www.edureka.co/blog/overfitting-in-machine-learning/) and then the ability of the model to fit random noise are reduced.

#### 3. Eavesdropping
A task may find it easy to learn some features while another task may find it difficult to learn these features. The difficulty in learning may be because the task is interacting in a much more complex manner with the features. It may also be because other features are interfering with the ability of the model to learn this feature.

Multi-tasking learning enables us to allow the task with difficulty in learning the new feature to eavesdrop on the task that learns the new feature. By doing this the task with difficulty in learning will be able to learn the new feature.

The most straightforward technique of attaining this goal is to directly teach the model to anticipate the most important traits via hints.

#### 4. Implicit data augmentation
Training our model on more data is made easier thanks to MTL. We want to build a suitable representation for a task that avoids data-dependent noise. It should generalize effectively when you want to train a model on a certain task because all tasks are at least slightly noisy.

A model that can learn two tasks at the same time can learn a broad representation of the noise patterns associated with each task. To avoid overfitting, the model should learn both tasks simultaneously, so that the noise patterns can be averaged into a better representation of the data.

### MTL in non-neural models
As a starting point, we'll look at the research on multi-task learning for linear models, kernel approaches, and Bayesian algorithms to get a better understanding of multi-tasking learning in deep neural networks. When it comes to multi-task learning, we'll focus on one essential idea which is modeling the links between tasks.

#### Modeling the links between tasks
Our model can only investigate a few features, even though these features are employed frequently across all jobs. This is because of the group-sparsity constraint. To put it another way, all of the theories listed above assume that multi-task learning involves tasks that are closely related to one another.

Some jobs may not be directly related to others as a result of this phenomenon. When information is shared with a task that is unrelated to the original work, a negative transfer can occur, resulting in a decline in performance.

To distinguish between tasks that are linked and those that are not, we would like to employ past knowledge rather than relying exclusively on a lack of information. In this situation, a restriction that necessitates task grouping may be more appropriate. Using a constraint to apply a clustering constraint to your task column vectors, it recommends penalizing the norms and variance of your task column vectors.

### Auxiliary tasks in MTL
If we want to anticipate the outcomes of numerous tasks at once, MTL is the ideal tool for the job. In finance and economics forecasting, for example, we might wish to anticipate the value of numerous presumably linked variables, or in bioinformatics, where we would want to predict signs and symptoms of various illnesses right away.

Drug discovery situations, in which a large number of active molecules must be predicted, increase the accuracy of MTL with each additional work.

However, in most cases, we just worry about one thing: our performance on that one activity. In this section, we'll look at how we can still reap the rewards of MTL by finding a good auxiliary task.

#### 1. Focusing attention
The auxiliary job can also be utilized to draw attention to sections of the picture that a network would otherwise overlook. Lane markings, for example, may be overlooked in the context of a single-task paradigm since they take up only a tiny portion of the image which is not always there.

However, auxiliary tasks like predicting lane markings push a model to learn to represent them. This may subsequently be employed for the main goal. Face recognition can be improved by learning to predict the placement of facial landmarks points as an auxiliary job.

#### 2. Quantization smoothing
Even though a continuous scale could be more logical, labels are provided in a discrete set for many jobs. There are various instances where human appraisal of data is required, such as forecasting illness risk. Because they are less quantified, auxiliary tasks that are easier to master can be used in these situations.

#### 3. Predicting the future through looking into the past
Some features are only available after the forecasts have been made in several cases. It is possible to make more accurate assessments of barriers and lane markings for self-driving cars when the vehicle is past them.

As an extra example, Caruana (1998) cites the prediction of pneumonia based on the findings of future medicinal trials. Data that is not available at runtime can't be used to create new features in these instances. When employed as an additional training assignment, it can help the model learn new information.

### Applications of MTL
#### Machine learning in self-driving cars
Self-driving automobiles are conceivable because of machine learning algorithms. Using cameras and other sensors, a car may gather information about its surroundings and use it to make decisions about what to do next. Using machine learning, automobiles can learn to accomplish these activities as well as (or perhaps better than) human beings can.

#### Predictions for the Stock Market
In the world of trading, algorithms and computers are used extensively. Trading using pre-programmed computer systems that obey a set of well-defined rules is known as algorithmic trading. Algorithmic trading is also known as algo trading or automatic trading.

Because they manipulate data and estimate the future market picture with great precision, machine learning algorithms are tremendously helpful in optimizing human decision-making processes.

Traders can take advantage of these forecasts to enhance their profits. Traders realize that human emotions can be a major stumbling barrier to achieving their full potential in the market. Algorithms and computer programs can make choices faster than humans and without the impact of external elements such as emotions.

#### Detection and recognition of objects
Computer vision systems have progressed greatly in the area of accurate and efficient object detection. The solution for object detection has improved dramatically since the arrival of deep learning techniques. Intending to obtain high accuracy and real-time performance, the project attempts to combine the latest object detection techniques.

In many object identification systems, the use of alternative computer vision techniques to assist the deep learning-based approach is a big problem, resulting in slow and inefficient performance. End-to-end, a deep learning approach, is utilized to solve the challenge of object detection. The most difficult publicly accessible dataset is used to train the network, and a yearly object detection challenge is run on it. For those applications that require object detection, the results are rapid and accurate.

### Conclusion
In this article, we have looked at how you can get started with multi-task learning in deep neural networks. To summarize;
1. We have looked at an overview of MTL.
2. We have learned about the two main MTL methods for deep learning.
3. We have gained an overview of the main mechanisms of MTL.
4. We have gained an understanding of the non-neural models and some auxiliary tasks.
5. We have learned the real-life applications of MTL.

I hope this article helps you implement MTL by illuminating how it works.

### Further reading
1. [How to Do Multi-Task Learning Intelligently](https://thegradient.pub/how-to-do-multi-task-learning-intelligently/)
2. [Learning through Auxiliary Tasks](https://vivien000.github.io/blog/journal/learning-though-auxiliary_tasks.html)

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
