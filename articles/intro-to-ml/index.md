---
layout: engineering-education
status: publish
published: true
slug: machine-learning-overview
title: Machine Learning - An Overview
description: Machine learning is the study of computer algorithms that improve automatically through experience and data sets. It is seen as a subset of artificial intelligence that has gotten more traction recently due to improved data collection.
author: Saichethan Reddy
date: 2020-07-01T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/machine-learning-overview/hero.jpg
    alt: machine learning image
---
[Machine Learning (ML)](https://en.wikipedia.org/wiki/Machine_learning) is defined as the use of algorithms and computational statistics to learn from data without being explicitly programmed. It is a subsection of the artificial intelligence (AI) domain within computer science. Despite the term Machine Learning first being coined in 1959, the recent rise in ML is due to the availability of a large number of datasets, and increased computation power.
<!--more-->

### Traditional Programming
Mostly everyone reading this article may be familiar with traditional programming, where you start with a goal, write logical rules, and refine through testing until it works the way you want it to. Examples of traditional programming are adding two given numbers. Traditional programming is also referred to as a rule-based approach.

![Rule Based](/engineering-education/machine-learning-overview/rulebased.png) <br>

### Machine Learning
There are certain problems which cannot be solved by traditional programming. For example, consider creating an application which classifies doodles made by kindergarten kids. Using traditional programming, how would one differentiate between a cat and a human? You might say a cat has a tail, whiskers, four legs, etc.. – seems simple and intuitive, right?

Now, lets try to differentiate between a cat and a dog? Both have four legs and a tail ,which makes it a little difficult to differentiate. Now, imagine having hundreds of such classes. How many rules should you check?

To tackle such a problem we use Machine Learning. ML is all about learning from examples.

![Rule Based](/engineering-education/machine-learning-overview/ml.png)<br>

Machine Learning is a specific field of AI, where a system learns to find patterns in examples in order to make predictions.

### Flow

1. Understand the user requirements.
2. Define an objective (formulate the problem).
3. Collect data for training and evaluating purposes.
4. Implement learning algorithms to generate a hypothesis function.
5. The hypothesis is used to predict on validation data. If results are not satisfactory, we try to enhance our hypothesis.

![Workflow](/engineering-education/machine-learning-overview/wf.png)<br>

### Classification

**Supervised:** In supervised learning, we have access to examples of correct input-output pairs that we can show to the machine during the training phase.
* MNIST image classification
* Stock price prediction
**Unsupervised:** In unsupervised learning, tasks find patterns in data where labels are not present, by forming clusters.
* Clustering based problems
**Semi-supervised:** In semi-supervised learning, large amounts of input data (X) are present and only some of the data is labeled (Y).
* Google News
**Reinforcement Learning:** Reward system and trial-and-error where the goal is to maximize the long-term reward.
* Robots

### Regression vs. Classification
**Regression:** A regression model predicts continuous values. For example, regression models make predictions that answer questions like the following:
* What is the value of a house in California?
* What is the probability that a user will click on this ad?
**Classification:** A classification model predicts discrete values. For example, classification models make predictions that answer questions like the following:
* Is a given email message spam or not spam?
* Is this an image of a dog, a cat, or a hamster?

### Understanding the Problem
Lets say the **Task** is to [Predict price of houses](https://www.kaggle.com/vikrishnan/boston-house-prices)<br>
One of the important tasks in ML is formulating the task. In this example, as the price of houses are real values, it's a **Regression** problem. Every instance had output label in training data, so it's **Supervised**.

#### Examples:
- Stock price prediction
- Breast Cancer detection
- Self Driving Cars
- Speech recognition
- & much more


### Major concerns
**Bias:** Bias is when our model failed to generalize. If data is not diverse, our model might never learn better. Suppose if we create a face recognition model for gender classification using only Caucasian people. Our model might not be able to predict the gender of non-caucasians accurately.

**Privacy:** As machine learning models are data-driven, chances of a data breach are high. Sensitive information such as bank transaction details and medical reports are prone to this problem.

### Conclusion     
Can we use machine learning on all problems? The answer is a definite no. Machine learning should be evaluated on a case-by-case basis, but offers many opportunities across a wide variety of use cases.

### Additional Resources
- [Class Notes](http://cs229.stanford.edu/)

- [A Beginner’s Guide to Machine Learning](https://medium.com/@randylaosat/a-beginners-guide-to-machine-learning-dfadc19f6caf)
