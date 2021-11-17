---
layout: engineering-education
status: publish
published: true
url: /naive-bayes-algorithm-in-python/
title: A Step by Step Guide to Implement Naive Bayes Algorithm in R
description: This tutorial will discuss the Naive Bayes algorithm, the real-world application of the Naive Bayes algorithm, implement and evaluate its performance using a confusion matrix in R.
author: lawrence-mbici
date: 2021-11-15T00:00:00-21:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/naive-bayes-algorithm-in-python/hero.png 
    alt: A Step by Step Guide to Implement Naive Bayes Algorithm in R
---
Naive Bayes is a machine learning algorithm based on the Bayes Theorem, and it's used for classification problems. The naive Bayes classifier is very effective and can be used with highly complex problems despite its simplicity. Due to its ability to handle highly complex tasks, the Naive Bayes has gained popularity in machine learning for a long time. Some Naive Bayes applications include; sentiment analysis, spam filtering, text classification, and many more.
<!--more-->
This tutorial will discuss the Naive Bayes algorithm and its principles to deliver a solid and clear understanding of this tool. Later, we will discuss the real-world application of the Naive Bayes algorithm and finally implement and evaluate its performance using a confusion matrix in R.

### Prerequisite
To follow along with this tutorial, you're required to have:
- [R](https://cran.r-project.org/) installed on your computer.
- Programming skills in R.
- A [dataset](https://github.com/mbici/data/blob/main/data.csv) that we shall use in our implementation.
- Require packages installed, i.e., 
  1. install.packages('caTools')
  2. install.packages('e1071')

### Introduction to the Bayes Algorithm
Before diving into *Naive Bayes*, we must first understand the *Bayes Theorem* and its assumptions. To understand this, first, we consider a conditional probability from which the mathematical representation of the *Bayes theorem* is derived. From the probability and statistic world, the conditional probability is defined as:

$p(A|B)=\frac{p(A\cap B)}{p(B)}$

Where:
- A and B are two events.
- $p(A|B)$ is the conditional probability. We read this as the probability of *A* given *B*.
- $p(A\cap B)=p(A, B)$  is called the join probability, i.e.,  probability of A and B happening together.
- $p(B)$ is the probability of event ${B}$ .

From the probability rules:
**sum**: $p(A)=\sum_{all B} {p(A,B)}$ and,
**Product:** ${p(A,B)}=p(B|A)p(A)$

From the symmetry property $p(A, B ) = p(B, A)$, and thus we can define:
$p(B|A)=\frac{p(A,B)}{p(A)}\rightarrow {p(A,B)}=p(B|A)p(A)$
This defines our product rule is above.
Using the above rule, we can rewrite our conditional probability as follows:
$p(A|B)=\frac{p(B|A)p(A)}{p(B)}$
which is the *Bayes theorem*. Note that, introducing the sum rule on the $p{(B)}$, this theorem can be written as:

$p(A|B)=\frac{p(B|A)p(A))}{\sum_{all A} {p(B|A)p(A)}}$.

Now that we know the mathematical representation of the *Bayes theorem* let's understand its components.
- The component $p(A|B)$ is called **posterior**. This quantity is defined as the probability of the hypothesis given data.
- The ${p(B|A)}$ is called *Likelihood*. It's is the probability of the data given the hypothesis.
- The $p(A)$ is called **prior**, representing our belief about the distribution.
- The $p(B)$ is defined as the *normalizing constant* this term can as well be written as:
  $p(B)=\sum_{all A} {p(B|A)p(A)}$
This  $p(B)$ ensures that the sum of the *posterior* over all A values equals one.

The *Bayes theorem* assumes that events A and B are independent of each other. However, with real-world datasets, this assumption is not always valid. It's usual for dataset features to be correlated, and therefore this assumption the *Bayes theorem* based on remains to be 'naive'. This is why in machine learning, this algorithm is called **Naive Bayes Algorithm**.
### Implementing Naive Bayes Algorithm
This session will implement our model on a business dataset that contains information about customers who previously transacted with the business. The dataset consists of 400 customers, and each customer has information on their age, the estimated salary, and whether they bought a particular product or not. Our task is to train a Naive Bayes classifier to understand the correlation between the features, i.e., `Age`,  `EstimatedSalary`, and the `Purchased` target variable. The essence of this is to enable the business to predict which customer is likely to purchase their new product just released to the market and accurately target them with valid ads from their social networks. The link to download this data is provided in the prerequisites section.
```
### Step 1: Data preprocessing
In this step, we will not dive into details of the data preprocessing steps. Instead, we can refer to [this](/engineering-education/data-preprocessing-in-r/) article for information on performing data preprocessing in r.

First, we need to install the required libraries. Let's copy-paste and execute the code below on the console.
```r
install.packages('caTools') # contains tools for data splitting
install.packages('e1071') # cointains the naive Bayes classifier model
```
However, we only need to install these packages if they're not already in our system.

Next, we import our dataset and view the first five rows with the help of the `head()` function. To achieve this, let's again run the code.

```r
# Importing the dataset
data = read.csv('data.csv')
# Looking at the first 10 observations of our dataset
head(data)
```
Output:

![Image](/engineering-education/naive-bayes-algorithm-in-python/output-image.png)

As we can see, the data has two features, i.e., `Age` and `EstimatedSalary` with `Purchased` as the target variable. The target variable takes the value 1 for a customer who bought and 0 for customer who didn't buy the product. The number on the rows corresponds to a particular customer. Hoping we now understand our data better, let's continue with our preprocessing activity. The code snippet below concludes this activity.

```r
# Encoding the target variable
data$Purchased = factor(data$Purchased, levels = c(0, 1))
# Splitting the data into Training-Test sets
library(caTools)
set.seed(123)
split = sample.split(data$Purchased, SplitRatio = 0.80)
Train_set = subset(data, split == TRUE)
Test_set = subset(dataset, split == FALSE)

# Feature Scaling
Train_set[-3] = scale(Train_set[-3])
Test_set[-3] = scale(Test_set[-3])

```
### Step 2: Fitting the Naive Bayes classifier to the training set
To get started, let's make sure that the `e1071 package` is installed on R. As we earlier said, we only install this package if it is not already installed on our systems; otherwise, we proceed and load its library.

```r
library(e1071) # load the library
classifier = naiveBayes(x = Train_set[-3],
                        y = Train_set$Purchased) # Fits Naive Bayes Model to the training set

```

### Step 3: Predicting the test set results

```r
# Predicting the Test set outputs
y_predict = predict(classifier, newdata = Test_set[-3])

# Creating a Confusion Matrix
conf_matrx = table(Test_set[, 3], y_predict)
conf_matrx
```
#### Obtained Confusion Matrix

![confusion matrix](/engineering-education/naive-bayes-algorithm-in-python/confusion-matrix.png)

From the above confusion matrix, we notice that out of 100, the model could predict 86% of the data correctly with only 14% incorrect predictions. From this, it's clear that our model has an accuracy of 84%. The accuracy of 84% is a good score, and thus we can conclude that our classifier was able to classify our data accurately.

### Conclusion
In this tutorial, we have learned the Naive Bayes classifier's theory. First, we showed how to derive a mathematical formula of this classifier from the basic conditional probability. Later, we showed how to implement the  Naive Bayes classifier in R and evaluated its performance using a confusion matrix. From the confusion matrix, we saw its ability to classify the data by giving a relatively incredible score. Since we now understand this classifier better, we can widen our knowledge by challenging ourselves with more implementation tasks to handle problems such as email classification, transaction classification, and health data to classify tumors and other diseases. Here we reach the end of this session's learning.
Happy Learning.

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
