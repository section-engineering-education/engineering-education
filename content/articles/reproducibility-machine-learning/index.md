---
layout: engineering-education
status: publish
published: true
url: /reproducibility-machine-learning/
title: Reproducibility to Improve Machine Learning
description: This article will shed light on the challenge of reproducibility in machine learning. Reproducibility refers to the ability to be replicated or recreated. Machine learning refers to recreating a workflow and achieving the same results as the initial work.
author: collins-ayuya
date: 2021-01-12T00:00:00-17:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/reproducibility-machine-learning/hero.jpg
    alt: Reproducibility in Machine Learning image example
---
In machine learning, reproducibility involves getting the same results, using the same algorithm, data, and parameters on every run. It helps to remove variations when rerunning experiments, which helps in refining the models. Reproducing results in machine learning projects can be very difficult.
<!--more-->
It may even be impossible in some cases. We explore the essential concepts of reproducibility in this article.

### Contents
- Defining reproducible ML.

- Significances of reproducibility in ML.

- Challenges to attaining reproducible ML.

- Simple measures to attain reproducibility.

### Prerequisites
One needs to understand the basics of [machine learning](/supervised-learning-algorithms/).

### Reproducible machine learning
Reproducibility refers to the ability to be replicated or recreated. Machine learning refers to recreating a workflow and achieving the same results as the initial work. Consider an algorithm from new research. We may want to dissect it and ultimately implement it. 

Yet, if it proves difficult to reproduce, it makes it challenging to implement the model. Suppose we seek to implement such an algorithm on a real-world problem without fully understanding it or replicating its results. In that case, the outcome may prove to be inconsistent with the original model.

Reproducible machine learning also has implications in terms of budget constraints. When a machine learning workflow is reproducible, it is worth the resources invested in the process. We are guaranteed our goal, which is achieving the same results as some prior model.

If we struggle to understand what kind of training data, hardware, and hyperparameters were used, attempting to reproduce a model may prove to be quite costly. The results may be inconclusive. This does not justify the resources invested in such a process.

To further understand reproducibility, let's explore its importance.

### Importance of reproducible machine learning
Reproducibility is essential for several reasons. Let's highlight a few.

**Correctness**: Correctness needs to be proved. If many models are built using the same data and the same processes but giving different results, it challenges the whole process's correctness.

**Credibility**: We rely very heavily on machine learning in our daily lives. Being dependent on these models in production systems spells out trouble if we cannot rebuild or explain them. End users expect these systems to be unbiased, reliable, and explainable. If we are unable to replicate such models, it is difficult to explain them. This, in turn, challenges the credibility of these models.

**Having a baseline**: A baseline refers to a starting point that can be used for comparisons. To show improvement over an original technique, we first have to reproduce the method. Say we're attempting to improve a model. In an attempt to deploy a better version of such a model, we must first replicate the model. It would be unfair to claim improvement when comparing two models that are inherently different. The ability to reproduce such models provides us with a baseline, making it easy to refine the models.

**Skill versus randomness**: Consider a context where creators of machine learning models may claim to have improved the overall performance by tweaking a parameter. The performance may improve, but it might be impossible to tell whether the improvement is due to scientific skill or randomness. The only way to validate the improvement is to replicate the process.

### Challenges to attaining reproducibility
There exist many factors that hinder the efforts to attain reproducibility. Let's go over a few of them.

#### Data
Data is a key input to machine learning algorithms. These models are highly dependent on the data that is used to train them. Therefore, data that is fed into the model has not only a significant impact on performance but also reproducibility. A model will only produce the same results as another if the same data and flows are used to train it.

Researchers may use a training set that programmers/data scientists attempting to implement the model may not have access to in a research context. Furthermore, some research databases rewrite or regularly make updates to data. This means that the training set for a given algorithm may not be available after a given period.

#### Concept drift
One may struggle to deploy a model more than once. A key reason for this is concept drift. [Concept drift](/correcting-data-shift/) refers to the shift in the relationships between input and output variables in a given problem. 

Data power our models. Yet, if the distribution of this data keeps changing, it proves to be a challenge for reproducibility. For example, consumer habits may be reflected by data that we seek to use to train our model. However, consumer habits always change with time. If someone wanted to reproduce our model and get similar results using up-to-date data, it would be a tall order.

#### Algorithm
Deterministic algorithms produce the same output given the same input, even on different iterations. However, there exist many algorithms that display non-determinism. Reproducibility in such algorithms is a difficult task since we expect randomness. Non-deterministic algorithms may be fed with the same input yet produce different results upon different iterations. The randomness in results may stem from the algorithm using various paths to arrive at contrasting outcomes. 

A huge factor that influences the non-deterministic nature of an algorithm is the complexity of the model. The routes and processes used to achieve output may be non-reproducible, therefore ensuring an element of randomness. It's impossible to reproduce that which is random. To deal with such randomness, we may use a random seed. This shall be discussed in the [Model Building](#model-building) section of potential solutions to attaining reproducibility. 

#### Software
Just as in the algorithms above, software that may enable one to carry out severe computation may not adhere to reproducible routines. For example, [cuDNN](https://developer.nvidia.com/cudnn), a deep learning library by NVIDIA, does not promise reproducibility across runs. 

In some cases, reproducibility is not affected by just computational factors and attempts to attain precision repeatedly. Something as basic as a software bug has the power to hinder reproducibility. Another factor that affects reproducibility is slight variations in the software used between environments.

### Attaining reproducibility
In this section, we will consider possible solutions at various stages of the machine learning process.

#### Data gathering
A key enabler of reproducibility, is first having the same training data as a previous model that we seeking to replicate. As mentioned in the last section, data available in a research context may not be available in a production environment. However, there are a couple of ways to consider to address this.

The first potential solution is the use of snapshots. Researchers/programmers/data scientists could take a snapshot of training data and save it. You might wonder how this helps since we mentioned that the databases are often updated. It would therefore help to save the data elsewhere. However, this would prove to be a challenge when dealing with a very large dataset. It might be a tiring process to take snapshots of very large data sets and store them elsewhere for future use.

A second possible solution is the use of timestamps. This method would prove to be more effective than the aforementioned one. Here's how. The data sources could be designed with timestamps of great accuracy. For example, a database could capture the timestamps. The timestamps could be used to pinpoint training data. It's worth noting that this only works when using databases with the ability to capture said timestamps. If dealing with databases that lack this ability, it may take a lot of effort to redesign them. Plus, this method does not fix the challenge of updating and replacing data in databases.

#### Creation of features
A parameter extracted from data will remain the same in multiple environments only if the data is the same in those environments. Consider a scenario where data has missing values. A common practice to replace a missing value is to have the mean of the variable in focus. However, if training data is different between the two environments, this impacts the mean's value.

If [feature extraction](https://deepai.org/machine-learning-glossary-and-terms/feature-extraction) requires complex equations, it makes reproducibility that much harder to achieve. Let's have a scenario where a feature is the total of another feature over time. 

It is impossible to recalculate as such in the absence of all the previous data present in each environment. Furthermore, if features are reliant on random samples, the seed values and random samples have to be spawned in the same order. The seed value has to be the same for each of the environments.

To aid in reproducibility, features that are implemented should not change after being created. They need to immutable. A new feature that is dependent on an already existing one should be represented separately. For example, it should have a new column. 

Such measures help in the reduction of dependencies, which in turn assists in achieving uniformity across environments. This, in turn, reduces the potential errors when duplicating a machine learning pipeline in contrasting environments.

#### Model building
Algorithms themselves pose a challenge to reproducibility. As we mentioned before, many models have an element of randomness in their machine learning process. This randomness has models using the same training data giving different outcomes. For example, [cross validation](/evaluating-ml-model-performance/) may be reliant on random partitioning of data for folds.

The potential solution to this is a simple one; keenness to order. Engineers should be keen on the order in which they pass features, hyperparameters, and when to introduce [seed values](https://en.wikipedia.org/wiki/Initial_condition). 

Non-deterministic algorithms fall under this category as well. Unseeded randomness plays a huge part in making machine learning workflows non-reproducible. An underrated aspect during model building is the use of random seeds. 

We use random seeds to ensure that the same output is achieved when we re-run our code. There are two common use cases of this parameter. The first one is ensuring that the splitting of a dataset into train, test, and validation sets is done the same way for every iteration. 

We are more concerned with the second use case. During the training of non-deterministic models, a random seed helps to attain reproducibility. This is done through seeding randomness. As the seed is the beginning of a sequence of values, if we start from the same seed, the sequence shall be repeated. As an example, the code snippet below shows the setting of a random seed for Numpy and Pytorch packages.


```bash
  np.random.seed(seed_value) # Numpy
  torch.manual_seed(seed_value) # PyTorch
```

Here are a few links to help you understand random seeding much better. Check out this article on [setting the random seed](https://towardsdatascience.com/properly-setting-the-random-seed-in-machine-learning-experiments-7da298d1320b). 

For Tensorflow reproducibility, explore this [post](https://suneeta-mall.github.io/2019/12/22/Reproducible-ml-tensorflow.html). 

This one is on [training with controlled randomness](https://towardsdatascience.com/creating-a-plant-pet-toxicity-classifier-13b8ba6289e6).

#### Deployment
We mentioned that differing software versions might end up creating nuances between pipelines in different environments. This might not be the most common challenge. Yet, it is advisable to keep the same type and versions of software throughout the machine learning process.

It is also necessary to use the same programming languages across environments. Switching languages between environments open up the possibility of human as well as deployment errors. [Deployment errors](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/common-deployment-errors#) are as a result of conditions occurring during deployment. In this case, a condition may be the change in languages. Many errors can be avoided by using not only the same language all through but the same code as well,.

### Closing
There are so many challenges to reproducibility. We have only managed to go through a few of them. It is indeed a tall order to eliminate every challenge. Nonetheless, some of these challenges have fundamental solutions, which seem like a reminder to always be meticulous in our approach to the machine learning process.

### References and further reading
1. [Reproducible Machine Learning](https://towardsdatascience.com/reproducible-machine-learning-cf1841606805#:~:text=%20Reproducible%20Machine%20Learning%20%201%20A%20step,authors%20use%20non-parametric%20Mann%E2%80%93Whitney%20U%20test...%20More%20)

2. [Reproducibility in Machine Learning - Research and Industry](https://suneeta-mall.github.io/2019/12/21/Reproducible-ml-research-n-industry.html)

3. [Reproducibility in ML: why it matters and how to achieve it](https://determined.ai/blog/reproducibility-in-ml/)

4. [Reproducible Machine Learning Results By Default](https://machinelearningmastery.com/reproducible-machine-learning-results-by-default/)

5. [The Machine Learning Reproducibility Crisis](https://blog.dominodatalab.com/machine-learning-reproducibility-crisis/)

6. [How To Build And Deploy A Reproducible Machine Learning Pipeline](https://www.trainindatablog.com/building-and-deploying-reproducible-machine-learning-pipelines/)

7. [Reproducibility, Replicability, and Data Science](https://www.kdnuggets.com/2019/11/reproducibility-replicability-data-science.html)

8. [5 – Reproducibility](https://blog.ml.cmu.edu/2020/08/31/5-reproducibility/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
