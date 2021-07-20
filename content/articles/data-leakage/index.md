---
layout: engineering-education
status: publish
published: true
url: /data-leakage/
title: Minimizing Data Leakage in Machine Learning
description: This article will go over the challenge of data leakage in machine learning and how to address it in an attempt to minimize it.
author: collins-ayuya
date: 2021-01-13T00:00:00-13:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-leakage/hero.jpg
    alt: Underspecification in Machine Learning image example
---
We always want to produce the best performing machine learning models. If a model does well on our test set, we consider it to be a suitable model. Yet, a model may perform well during testing but poorly after deployment. There are several probable causes of such, but one of them is data leakage.
<!--more-->
This refers to an error made by a creator of a model where information between test and training sets is accidentally shared. We explore this phenomenon in this article.

### Contents
1. Introduction to data leakage
2. Causes of data leakage
3. Techniques to minimize data leakage

### Prerequisites
Understanding of general [machine learning](/supervised-learning-algorithms/) concepts as well as a few concepts around [feature engineering](/feature-engineering-in-machine-learning/) is a plus.

### Data leakage
A model may perform exceptionally well during training. Yet when implemented on a real-world problem, it may end up offering sub-par performance. Many reasons could be responsible for this occurrence. However, for the focus of this article, our focus will be the problem of data leakage. 

Data leakage is a problem for predictive models. We say data leakage has occurred when data outside the training set is used to develop the model. Leakage is present if information between training and test sets is shared. If we fail to detect this form of leakage, we may have exaggerated results during training. This is because the model is already exposed to the test data, thus offering very impressive performance. In our quest to dissect data leakage, we start by understanding its causes below.

### Causes of data eakage
#### Pre-processing
There exist various pre-processing steps to clean or explore data. Parameters for normalization or rescaling are identified here. Identifying minimum or maximum values of features may be done in this step. Pre-processing also involves getting rid of outliers. We shall go over data preparation later on.

It is possible to leak data in pre-processing. If the steps mentioned above are applied to an entire dataset, leakage may manifest. This allows the model to learn beyond the training set by also learning from the test set, defeating the purpose of having a test set since it is described as unseen data.

#### Same data for testing and validation
It is standard to split data into separate groups such as testing, training, and validation sets. Not all models require a validation set since we can train a model using the training set and use the test set to test it. As standard as this process is, it becomes a cause of data leakage if not done correctly. 

For example, if we unintentionally expose the model to test data during training, the model will already have access to data, it is not yet allowed to see. For instance, one may split a dataset into test and training sets but may not know that the two sets share some information. If the same data exists in both sets, it means that some information in the test is already exposed to the model. As a result, the model "sees unseen data". 

This then allows a model to perform better in its predictions regarding the test data. A problem associated with this performance is that during deployment, the same model performs underwhelmingly. Data leakage impedes models from generalizing well after in the real-world, facing new data.

#### Duplicates
Duplication is present if a dataset has many data points that have the same or almost identical data. This is a common occurrence when dealing with real-world, often noisy data. If test data and training data contain the same instance, data leakage may be experienced even if representing different observations.

#### Implicit leakage
Consider temporal data. This is data related to time. Time is a crucial factor. An example is time-series data. Imagine having a training set with two data points, 1 and 3. Let's have the test set with a single data point labeled 2. Let's assume that the temporal sequence of these points is 1, 2, then 3. 

There is a likelihood that we have introduced data leakage thanks to how we created our test and training sets. Since point 3 is in the training set, and 2 is in the test set. In this situation, we are unrealistically training our model on future information compared to the position of the test data in time. We inadvertently end up leaking information about the future into the past.

### Techniques to minimize leakage
Since we now know the possible causes of leakage, we should explore the various ways to minimize or prevent data leakage. Let's go through three effective methods.

#### Normalizing correctly before cross-validation
It is easy to leak data when preparing data for machine learning. As a result, overfitting occurs in training data. This also impacts the performance of the model on test data. We would be given a flattering picture of performance, but it performs poorly when the model is deployed in the real world.

For instance, data leakage will occur in a scenario where one carries out normalization of an entire dataset, then evaluates the algorithm's performance using cross-validation. [Normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization#:~:text=%20Normalization%20Techniques%20at%20a%20Glance%20%201,a%20wide%20range%20to%20a%20narrow...%20More%20) is a process that aims to improve the performance of a model by transforming features to be on a similar scale.

I described [cross validation](/evaluating-ml-model-performance/) as the use of two datasets to evaluate an algorithm. Specifically, there is a training set and an independent set that is partitioned from an original dataset. These splits of the dataset are called folds, which are often equal in size. 

A model being evaluated is trained on all folds except one. So, a model will be trained on three and tested on the remaining fold if there are four-folds. The process is repeated until each fold is used for testing.

From the example above, a clear mistake is the normalizing of an entire dataset. We should note that normalization needs to be carried out after splitting data into training, testing, and validation sets. If normalization is carried out before splitting, it will affect the whole dataset instead of the training set. 

That is, the mean and standard deviation used for normalization will reflect the whole dataset. Since the whole set is in consideration, data from the test set ends up influencing the training set. As a result, information on test and validation sets sips into the training set. 

This contrasts with an approach where normalization is done after splitting the dataset. Applying normalization to the training set first restricts the computation of normalization parameters (like mean and standard deviation) to this set. As a result, the test set does not influence the training set. This allows us an acceptable estimate of model quality, compared to normalization on the whole dataset.  

#### Splitting dataset
As mentioned previously, it is normal to split a dataset into training and test sets. Even so, it is advisable to consider splitting a dataset into three groups by adding a validation set in addition to training and test sets. But why add a validation set? 

Although not all models need it, a validation set allows us to fine-tune a model's parameters. This is done before testing the model on unseen data. After splitting the data into these groups, if we want to perform [exploratory data analysis](https://towardsdatascience.com/exploratory-data-analysis-8fc1cb20fd15#:~:text=Exploratory%20Data%20Analysis%20refers%20to%20the%20critical%20process,the%20help%20of%20summary%20statistics%20and%20graphical%20representations.) (EDA), it is advisable to perform it only on the training set. 

EDA is a key process where initial investigations on data is done to identify patterns, anomalies, and hypotheses testing.
Extra features produced by EDA on test and validation sets represent instances of leakage of data. The model will have already seen test and validation data. This is why it should only be performed on the training set.

#### Eliminating duplicates
Predictive models always go through a form of data preparation. Data preparation involves the transforming of raw data into a format that is suitable for modeling. The processes involved in data preparation include data cleaning, feature selection, feature engineering, and dimensionality reduction. 

A process that is key to the elimination of duplicates is data cleaning. Data cleaning is characterized by fixing problems in messy, erroneous, corrupt, or noisy data. First, these problematic instances are identified. They may then be handled by getting rid of a problematic row or a column. They may also be handled by replacing instances with new values.

However, we mentioned that one of the causes of data leakage is duplicates. Our focus here would be to eliminate them. In data cleaning, we identify duplicate rows and get rid of them. We eliminate duplicates to prevent them from ending up in both test and training sets concerning data leakage.

### Wrapping up
Various reasons could explain where a model performs well during training and testing but poorly during deployment. We have covered one of these reasons in the form of data leakage. Data leakage is a widespread problem that needs to be handled to ensure models generalize well after deployment. 

We have explored the causes and methods to minimize leakage. I believe we now know enough to avoid and minimize leakage in our models. 

Until next time, good luck!

### References and further reading
1. [Data Leakage in Machine Learning](https://towardsdatascience.com/data-leakage-in-machine-learning-10bdd3eec742#:~:text=%20Data%20Leakage%20in%20Machine%20Learning%20%201,It%20is%20important%20to%20avoid%20these...%20More%20)
2. [Preventing Data Leakage in Your Machine Learning Model](https://towardsdatascience.com/preventing-data-leakage-in-your-machine-learning-model-9ae54b3cd1fb#:~:text=%20Preventing%20Data%20Leakage%20in%20Your%20Machine%20Learning,Regard%20to%20Target%20Variable%20Correlation%20and...%20More%20)

3. [Data Leakage in Machine Learning](https://machinelearningmastery.com/data-leakage-machine-learning/)

4. [Data Leakage in Machine Learning](https://towardsdatascience.com/data-leakage-in-machine-learning-6161c167e8ba)

5. [What is Data Leakage in ML & Why Should You Be Concerned](https://analyticsindiamag.com/what-is-data-leakage-in-ml-why-should-you-be-concerned/)

6. [How Data Leakage Impacts Machine Learning Models](https://mlinproduction.com/data-leakage/)

7. [Data Leakage in Machine Learning](https://www.datasciencecoffee.com/2020-data-leakage/)

8. [Understanding what is Data Leakage in Machine Learning and how it can be detected](https://insights.ai-jobs.net/understanding-what-is-data-leakage-in-machine-learning-and-how-it-can-be-detected/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
