---
layout: engineering-education
status: publish
published: true
url: /engineering-education/correcting-data-shift/
title: Correcting Dataset Shift in Machine Learning
description: This article will be going over Dataset Shift and how to correct it in machine learning models to prevent performance degradation.
author: collins-ayuya
date: 2020-11-30T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/correcting-data-shift/hero.jpg
    alt: correcting data shift image example
---
Dataset shift occurs when there is a change in the distribution of data. In the real world, socioeconomic factors may influence data distribution, along with varying consumer habits, and many other factors.
<!--more-->
These factors can alter the underlying relationships between input and output data. As a result, the performance of a model can be (and will be) degraded. It's worth exploring how to handle dataset shift.

### Table of contents
1. Dataset shift definition

2. Causes of dataset shift

3. Types of dataset shift

4. Correcting dataset shift

### Prerequisites
A general understanding of machine learning (ML) is required. This [post](/engineering-education/supervised-learning-algorithms/) can provide an introduction or a refresher on ML.

### Dataset shift
The phenomenon of dataset shift is defined by a change in the distribution of data. This change is between the training sets and test sets.

When creating a machine learning model, we use training data to train a model with the expectation that when the same model is used on test data, it will produce similar results.

However, in the real-world deployment of machine learning models, this may not be the case. For example, consumer habits keep shifting. Therefore, the distribution of data will definitely shift also.

The consequence of such shifts is performance degradation of the model. To better understanding this drift of data, let’s glance at a couple of causes for this phenomenon.

### Causes of dataset shift
Let’s discuss a couple of potential reasons for dataset shift.

**Sample selection bias** – when training data consists of bias, it fails to reflect the environment in which the model is meant to be deployed. This difference between biased training data and the test data defines sample selection bias.

**Change of environments** – also known as non-stationary environments, this refers to when a difference exists between the training environment and test environment. This could be as a result of a change of a spatial or temporal nature.

### Types of dataset shift
There are three major types of dataset shift.

We'll explore each in detail.

#### Covariate shift
![covariate](/engineering-education/correcting-data-shift/covariate.png)

[Covariate Shift: Source](http://iwann.ugr.es/2011/pdf/InvitedTalk-FHerrera-IWANN11.pdf)

Covariate shift is the most common type of shift which is characterized by the change of the input variables existing in the training and test datasets. It may occur as a result of a change in the environment that only affects the input variables. The target variable remains unchanged.

![covariate2](/engineering-education/correcting-data-shift/covariate2.png)

[Image Source](http://iwann.ugr.es/2011/pdf/InvitedTalk-FHerrera-IWANN11.pdf)

The change in distribution is problematic. Here’s why. From the image above, the learning function attempts to fit the training data. However, the distribution of the training and test data is contrasting. Using the learned function to make predictions, in this case, will lead to the wrong results.

Let’s give another example of how problematic this shift can be. Consider facial recognition algorithms. An algorithm that has been trained on faces that are mostly of younger people, but dealing with a dataset with a majority of older faces will definitely lead to wrong results.

Here, the relationship between input and output is the same, but it misrepresents the relationship since the test and training data reflect different distributions.

#### Prior probability shift
Prior probability shift is characterized by a scenario where the target variable distribution changes but the input feature distribution does not. This is basically the reverse of covariate shift.

![prior2](/engineering-education/correcting-data-shift/prior2.png)

[Prior Probability Shift: Source](http://www.acad.bg/ebook/ml/The.MIT.Press.Dataset.Shift.in.Machine.Learning.Feb.2009.eBook-DDU.pdf)

We can use the context of spam emails to better understand this type of shift. The contents of spam mail may vary over time. Their ratio to the total daily received email number may also vary. As a result, spam filters that were developed on emails received last month may not be quite as effective today as a result of a change in the traffic's composition of the emails.

Still, in using the spam filters, let’s have an example of an unbalanced dataset. Consider a training set with equal prior probabilities on the count of received spam mail. If the prior probabilities are equal, the training set would contain 50% spam and 50% non-spam mail.

However, if in actuality about 75% of our mail is spam, the prior probability of the class variables has been altered. The effect of this does not influence the input distribution, but the output distribution.

For more on this type of shift, check out this [book](http://www.acad.bg/ebook/ml/The.MIT.Press.Dataset.Shift.in.Machine.Learning.Feb.2009.eBook-DDU.pdf).

#### Concept drift
Concept drift is defined by the change in relationships between the input and output variables in the problem. It's neither related to the data distribution nor the class distribution.

The relationship between input and output variables may be unknown or hidden. For example, the strength of the economy may sway consumer purchasing habits over a period of time.

Yet, economic strength is not clearly specified in the data. Another example is in the context of weather data. Seasons may not be clearly defined in temperature data, but ultimately influence the temperature data.

From the examples above, we note that this change in data can take any form. It makes it much easier to consider cases where there is some form of temporal consistency to the shift.

This would mean that data obtained during a given period would show the change in the relationship between input and output variables over time. Concept drift is more likely to manifest in various domains dependent on time, such as time series forecasting.


### Correcting dataset shift
Dataset shift can be corrected in many ways. The three methods listed below are considerate of all three types of shift.

#### Feature dropping
The gist of this method is getting rid of features that are deemed to be drifting. First, an acceptable level of the shift may be determined. Individual features may then be scrutinized to determine which features contribute most to shifting.

We may do this through a very specific scientific examination of the machine learning system in consideration, by training the model on a different set of dataset features to get insights into their impact on the outcomes. This is what we call a feature ablation trial. After determining which features contribute most to shifting, we discard these features from the dataset.

The dropping of features may lead to the loss of useful information. However, a feature that exhibits a lot of shifts between training and test but provides little predictive power should be dropped.

#### Adversarial search
Adversarial search refers to a “game-playing” technique between various agents in a competitive environment. It tasks the agents with conflicting objectives. As a result, these agents compete against each other to win the game.

This is considered a minimax approach. In game theory, a minimax approach refers to a decision-making scheme that is used to maximize chances of victory and minimize the possibility of loss.

In this context, an adversarial model is used, where the learning algorithm tries to build a predictor resilient to the deletion of features during testing. The goal of adversarial search is to find the best minimax approach.

This is done with an adversary that deletes features to find the best strategy. As is the nature of adversarial search, we note that one model attempts to maximize its score while the other one opposes it.

#### Importance of reweighting
When you have training examples that are very similar to test examples, it's necessary to up-weight the training examples.

Weighting up involves increasing the weight associated with an example. To understand up-weighting, let's give a basic example. Let's say we have the following items: A, B, C, and D. As they are, their coefficients are also the same. We can assume they have equal importance.

However, if we wanted to increase the importance of item B over the other three, we would up-weight B. Here's how; we would first represent weights of the four items as decimals that add up to 1. If they are of equal importance, we would have (0.25)A, (0.25)B, (0.25)C, and (0.25)D.

If we up-weight B with the others maintaining equal importance, an outcome would be something like (0.2)A, (0.4)B, (0.2)C, (0.2)D. Where B now has a higher weight than the rest. Note that all the coefficients add up to 1.          

Up-weighting the training examples makes it seem like we took the training data from the test set. Each of the training instances is reweighed by the relative probability of the training set and the test set. We can do this through density ratio estimation.

Density ratio estimation involves the separate estimation of test and training densities first. This is then followed by estimating the importance (by considering the ratio) of the approximated densities of the training and test sets. The densities represent the weights of each instance of the training data.

### It’s a wrap
Dataset shift deteriorates the performance of a model. No engineer wants to build an excellent model that ends up underperforming because of drift. When dealing with data that has a high chance of experiencing drift, it's important to expect it, and correct it if it manifests. We have shed some light on the types of shift and the methods of correction. I hope they are of use to you. Good luck!

### References and further reading
1. [Dataset Shift in Classification: Approaches and Problems](http://iwann.ugr.es/2011/pdf/InvitedTalk-FHerrera-IWANN11.pdf)


2. [Understanding Dataset Shift](https://towardsdatascience.com/understanding-dataset-shift-f2a5a262a766)

3. [Covariate Shift – Unearthing hidden problems in Real World Data Science](https://www.analyticsvidhya.com/blog/2017/07/covariate-shift-the-hidden-problem-of-real-world-data-science/)

4. [Data Shift in Machine Learning: what is it and how to detect it](https://gsarantitis.wordpress.com/2020/04/16/data-shift-in-machine-learning-what-is-it-and-how-to-detect-it/)

5. [A Gentle Introduction to Concept Drift in Machine Learning](https://machinelearningmastery.com/gentle-introduction-concept-drift-machine-learning/)

6. [Dataset Shift in Machine Learning](http://www.acad.bg/ebook/ml/The.MIT.Press.Dataset.Shift.in.Machine.Learning.Feb.2009.eBook-DDU.pdf)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
