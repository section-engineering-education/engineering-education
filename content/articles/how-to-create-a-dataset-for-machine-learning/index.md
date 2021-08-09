---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-dataset-for-machine-learning/
title: How to Create a Dataset for Machine Learning
description: This article gives an overview of how datasets are created for Machine Learning models. Having good quality data is very important to ML systems. There are three key steps that have to be followed to achieve this. These include data acquisition, data cleaning, and data labeling.
author: willies-ogola
date: 2021-02-10T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-create-a-dataset-for-machine-learning/hero.jpg
    alt: Machine Learning (ML) Datasets example image
---
Machine Learning (ML) has had a profound influence on a diverse range of applications. This has been possible mainly due to the better computing power and large amounts of training data. I cannot emphasize enough the importance of training data in ML systems.
<!--more-->
In fact, most of the machine learning models' problems aren't caused by the models but by issues in the dataset. And yet, the process in which a dataset is created is an underrated topic. This is because creating and improving datasets is a human task and tends to be very time-consuming. In the world of artificial intelligence, tasks that require human labor aren't considered exciting.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Data Acquisition](#data-acquisition)
4. [Data Cleaning](#data-cleaning)
5. [Data Labeling](#data-labeling)
6. [Wrapping Up](#wrapping-up)
7. [References](#references)

### Prerequisites
Before reading this article, the reader needs to have a little knowledge in Artificial Intelligence and Machine Learning. If you're still a beginner, feel free to read my previously published [article](/differences-between-artificial-intelligence-machine-learning-and-deep-learning/) explaining the difference between Artificial Intelligence and Machine Learning.

### Introduction
In any case, before we train a model, we need a dataset. There are many publicly available datasets that one can use in a project.

For example, if one wanted a model that would help classify YouTube videos by genres, one can use the [YouTube-8M Segments dataset](https://research.google.com/youtube8m/) that is publicly available. Likewise, if one is looking to classify patients having breast cancer, the [Wisconsin Breast Cancer dataset](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29) will come in handy.

What if your desired dataset for the problem is not publicly available?

That means that you'll have to create one yourself. 

The process of creating a dataset involves three important steps:
1. Data Acquisition
2. Data Cleaning
3. Data Labeling

### Data acquisition
The process of data acquisition involves finding datasets that can be used for training machine learning models. There are a couple of ways you can go about doing this, and your approach will largely depend on the problem that you are trying to solve and the type of data that you think is best suited for it. There are largely two key approaches. 

They include:
1. Data Generation
2. Data Augmentation

#### Data generation
The Data Generation technique is applied when there is no existing dataset that can be used for training. 
It involves: 

#### 1. Crowdsourcing 
Crowdsourcing is a business model that involves connecting with large groups of people via the internet to accomplish tasks. These tasks range from simple tasks such as data labeling to complex tasks involving collaborative writing. A good example of crowdsourcing's usage is in the popular [ImageNet project](http://www.image-net.org/), which gave rise to the ImageNet image classification dataset. 

In Machine Learning, crowdsourcing is used to aid in data generation tasks. 

There are two main crowdsourcing platforms that one can utilize to generate new data:
1. The [Amazon Mechanical Turk (MTurk)](https://www.mturk.com/) is one of the earliest and most popular examples of a crowdsourcing platform. One can sign up on this platform and leverage the power of large groups of people to complete data generation tasks, and you pay them for their services. This saves you a lot of time and improves efficiency.

2. [Citizen Science](https://en.wikipedia.org/wiki/Citizen_science) is also a crowdsourcing platform whereby you can engage the public in the process of data collection, which not only helps you collect more data but also help the public learn more about the science that you are trying to do.

#### 2. Synthetic data generation
Synthetic data is the data created via a computer to increase the size of our training data or introduce changes in the data that we would like our model to handle in the future. Generative models such as the Generative Adversarial Network is good example of a computer program that generate synthetic data. 

We need these large amounts of data to have enough information to train a machine learning models properly. Thus, synthetic data generation usually offers us a cheaper and more flexible way of expanding our datasets. Generative Adversarial Networks (GANs) is an advanced technique that we can use to generate synthetic data. 

It involves training two contesting networks: a generator and a discriminator. The generator's role is to learn to map a latent space to a data distribution (from a dataset). The discriminator's role is to discriminate (compare) between examples from the true distribution and the generated distribution. 

The goal is to increase the error rate for the discriminator network to make the generator networks so good at generating samples, that it will fool the discriminator into thinking that the samples are from the true data distribution (the dataset). 

Using GANs effectively generates synthetic videos and images that look realistic for use in different applications. It takes in existing data and creates new data that looks like your original dataset. Thus, generating more data.

#### Data augmentation
Data Augmentation is another method for data acquisition. The process involves augmenting existing datasets with newly-acquired external data. Some basic steps in the data augmentation process might include cropping, flipping, rotating, adjusting the brightness, and contrast of the existing input images.

This technique enhances the size and quality of training datasets enabling you to collect more data without actually going out to physically collect more data. Another advantage of data augmentation is that, it makes models generalize better to new unseen data.    

### Data cleaning
If you do have enough data, but the quality of the dataset isn't that great (e.g., data is noisy), or there's an issue with the general formatting in your dataset (e.g., some data intervals are in minutes while some in hours), we move on to the second most important process, which involves cleaning the data.

You can perform data operations manually, but it is labor-intensive and would take a lot of time. Alternatively, you can leverage already built systems and frameworks to help you achieve the same goal easier and faster.

The tools and frameworks include:

1. [HoloClean](http://www.holoclean.io/) 

HoloClean repairs, cleans, and enriches the data. The system leverages value correlations, quality rules, and reference data to help build probabilistic models that capture the process of data generation. It also helps data scientists save on the time needed to clean data.

2. [ActiveClean](https://activeclean.github.io/) 

ActiveClean is an iterative cleaning framework that cleans samples of data based on how much cleaning would improve the models accuracy. This means that you only need to clean a small subset of the data to achieve a model similar to a fully cleaned dataset.

3. [BoostClean](https://arxiv.org/pdf/1711.01299.pdf) 

BoostClean automatically detects and repairs errors in data using statistical boosting. Statistical boosting is an ensembling technique that enables the system to find the best ensemble of pairs that maximize the final model's accuracy.

4. [MLClean](https://arxiv.org/pdf/1904.10761.pdf)

MLClean is the most recent data cleaning framework. 

The framework performs three main tasks: 
- Data sanitization - This is the process of removing poisoned data before it is used for training.
- Traditional data cleaning - This process involve performing traditional data cleaning techniques such as removing duplicated data and adjusting values to correct ranges. 
- Unfairness mitigation in data - This process involves removing unfairness in data e.g., bias against people from certain demographics or discrimination based on gender.  

The framework also cleans data to achieve robust, accurate, and fair models.     

An important point to note is that you shouldn't clean too much. Ideally, cleaning a dataset should not result in a dataset that's no longer representative of the population that you are looking to perform a study on.

### Data labeling 
Data Labeling is an important part of data preprocessing that involves attaching meaning to digital data. Input and output data are labeled for classification purposes, and provides a learning basis for future data processing. For example, the picture of a dog can be attached to the label "a dog".

Now you have acquired enough data to have a representative dataset (a dataset that captures the most important information), clean, and in the right format. 

Time to label that data? Maybe. 

The answer to that question solely depends on whether you are using [supervised learning or unsupervised learning](/supervised-learning-algorithms/). Unsupervised learning doesn't require your data to be labeled, while supervised learning does require data labeling.

The processes of labeling can be subjective and also labor-intensive. One can utilize crowdsourcing platforms such as [Amazon Mechanical Turk (MTurk)](https://www.mturk.com/) and [Citizen Science](https://en.wikipedia.org/wiki/Citizen_science) to achieve this goal.  

### Wrapping up
Is that the end of the process for creating a dataset? Well, probably, probably not.

Training a model can reveal some issues that may negatively impact the outcomes that you may try to predict or classify. Often, these issues can be traced back to the dataset itself. You may have to return to the [Data Acquisition](#data-acquisition), [Data Cleaning](#data-cleaning), and [Data Labeling](#data-labeling) drawing board to figure out how to create a better dataset for your ML system. But if your dataset lacks any of these issues, you're good to go.

To summarize the contents of this article, having good quality data is very important to ML systems. There are three key steps that have to be followed to achieve this. These include data acquisition, data cleaning, and data labeling. Leveraging these three steps will not only enable you create a good dataset, but also have a good quality dataset.

That's it for this article on how to create a dataset for machine learning. 

Hope the article was helpful.

### References
1. [A Survey on Data Collection for Machine Learning](https://arxiv.org/pdf/1811.03402.pdf)  
2. [YouTube-8M Segments Dataset](https://research.google.com/youtube8m/)
3. [Amazon Mechanical Turk (MTurk) ](https://www.mturk.com/)
4. [Citizen Science](https://en.wikipedia.org/wiki/Citizen_science)
5. [ImageNet project](http://www.image-net.org/) 
6. [HoloClean](http://www.holoclean.io/) 
7. [BoostClean](https://arxiv.org/pdf/1711.01299.pdf) 
8. [MLClean](https://arxiv.org/pdf/1904.10761.pdf)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
