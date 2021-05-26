---
layout: engineering-education
status: publish
published: true
url: /evaluating-ml-model-performance/
title: Evaluating Machine Learning Model Performance
description: This article will be going over machine learning evaluation techniques and metrics used to test overall model performance such as holdout and cross validation.
author: collins-ayuya
date: 2020-11-26T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/evaluating-ml-model-performance/hero.jpg
    alt: machine learning evaluation image
---
We expect machine learning models to provide accurate and trustworthy predictions. To confidently trust their predictions, it is important to assess how machine learning models generalize on test data. Let us look at how to test model performance.
<!--more-->
### Table of contents
1. The need to evaluate performance.

2. Model evaluation techniques.

3. Classification model evaluation metrics.

4. Regression model evaluation metrics.

### Prerequisites
A general understanding of machine learning is required to follow along. For an introduction or a refresher on some basic machine learning concepts check out this [article](/supervised-learning-algorithms/).

### Useful terms
**Training set** – according to this insightful article on [model evaluation](https://heartbeat.fritz.ai/introduction-to-machine-learning-model-evaluation-fa859e1b2d7f), this refers to a subset of a dataset used to build predictive models. It includes a set of input examples that will be used to train a model by adjusting the parameters of the set.

**Validation set** – is a subset of a dataset whose purpose is to assess the performance of the model built, during the training phase. It periodically evaluates a model and allows for fine-tuning of the parameters of the model. This [post](https://docs.sparkflows.io/en/latest/machine-learning/evaluation.html) mentions that not all modeling algorithms need a validation set.

**Test set** – this is also known as unseen data. It is the final evaluation that a model undergoes after the training phase. A test set is best defined in this [article](https://heartbeat.fritz.ai/introduction-to-machine-learning-model-evaluation-fa859e1b2d7f) as a subset of a dataset used to assess the possible future performance of a model. For example, if a model fits the training better than the test set, overfitting is likely present.

**Overfitting**– refers to when a model contains more parameters than can be accounted for by the dataset. Noisy data contributes to overfitting. The generalization of these models is unreliable since the model learns more than it is meant to from the dataset.

### Why evaluate performance?
Machine learning has become integral to our daily lives. We interact with some form of machine learning every single day. Since we truly depend on machine learning models for various reasons, it's important to have models that provide accurate and trustworthy predictions for their respective use cases. We must always test how a model generalizes on unseen data. 

For example, in an enterprise setting, these models need to offer real value to the business by producing the highest levels of performance. But how do we evaluate the performance of a model? For classification problems, a very common and obvious answer is to measure its accuracy. 

However, in this article, we shall discover that model accuracy is not an effective metric to measure model performance. We shall also look at a few metrics for regression problems. By the end of this article, we shall understand that there are a lot of ways to measure the performance of a model.

### Model evaluation techniques
The techniques to evaluate the performance of a model can be divided into two parts: cross-validation and holdout. Both these techniques make use of a test set to assess model performance.

#### Cross validation
Cross-validation involves the use of a training dataset and an independent dataset. These two sets result from partitioning the original dataset. The sets are used to evaluate an algorithm. 

Let’s explore how.

First, we split the dataset into groups of instances equal in size. These groups are called folds. The model to be evaluated is trained on all the folds except one. After training, we test the model on the fold that was excluded. This process is then repeated over and over again, depending on the number of folds. 

If there are six folds, we will repeat the process six times. The reason for the repetition is that each fold gets to be excluded and act as the test set. Last, we measure the average performance across all folds to get an estimation of how effective the algorithm is on a problem.

A popular cross-validation technique is the k-fold cross-validation. It uses the same steps described above. The k, (is a user-specified number), stands for the number of folds. The value of k may vary based on the size of the dataset but as an example, let us use a scenario of 4-fold cross-validation.

The model will be trained and tested four times. Let’s say the first-round trains on folds 1,2 and 3. The testing will be on fold 4. For the second round, it may train on folds 1,2, and 4 and test on fold 3. For the third, it may train on folds 1,3, and 4 and test on fold 2. 

The last round will test on folds 2,3 and 4 and test on fold 1. The interchange between training and test data makes this method very effective. However, compared to the holdout technique, cross-validation takes more time to run and uses more computational resources.

#### Holdout
It's important to get an unbiased estimate of model performance. This is exactly what the holdout technique offers. To get this unbiased estimate, we test a model on data different from the data we trained it on. This technique divides a dataset into three subsets: training, validation, and test sets. 

From the terms we defined at the start of the article, we know that the training set helps the model make predictions and that the test set assesses the performance of the model. The validation set also helps to assess the performance of the model by providing an environment to fine-tune the parameters of the model. From this, we select the best performing model.

The holdout method is ideal when dealing with a very large dataset, it prevents model overfitting, and incurs lower computational costs. 

When a function fits too tightly to a set of data points, an error known as overfitting occurs. As a result, a model performs poorly on unseen data. To detect overfitting, we could first split our dataset into training and test sets. We then monitor the performance of the model on both training data and test data. 

If our model offers superior performance on the training set when compared to the test set, there's a good chance overfitting is present. For instance, a model might offer 90% accuracy on the training set yet give 50% on the test set.  

### Model evaluation metrics
#### Metrics for classification problems
Predictions for classification problems yield four types of outcomes: true positives, true negatives, false positives, and false negatives. We'll define them later on. We look at a few metrics for classification problems.

##### Classification accuracy
The most common evaluation metric for classification problems is accuracy. It's taken as the number of correct predictions against the total number of predictions made (or input samples). However, as much as accuracy is used to evaluate a model, it's not a clear indicator of model performance as we stated earlier.

Classification accuracy works best if the samples belonging to each class are equal in number. Consider a scenario with 97% samples from class X and 3% from class Y in a training set. A model can very easily achieve 97% training accuracy by predicting each training sample in class X.

Testing the same model on a test set with 55% samples of X and 45% samples of Y, the test accuracy is reduced to 55%. This is why classification accuracy is not a clear indicator of performance. It provides a false sense of attaining high levels of accuracy.

##### Confusion matrix
The confusion matrix forms the basis for the other types of classification metrics. It's a matrix that fully describes the performance of the model. A confusion matrix gives an in-depth breakdown of the correct and incorrect classifications of each class.

![confusion](/engineering-education/evaluating-ml-model-performance/confusion.png)

*Confusion Matrix* 

[Source]( https://towardsdatascience.com/various-ways-to-evaluate-a-machine-learning-models-performance-230449055f15)

The four terms represented in the image above are very important. 

Let’s define them:

**True positives** – a scenario where positive predictions are actually positive.

**True negatives** – negative predictions are actually negative.

**False positives** – positive predictions are actually negative.

**False negatives** – a scenario where negative predictions are actually positive.

From the definition of the four terms above, the takeaway is that it's important to amplify true positives and true negatives. False positives and false negatives represent misclassification, that could be costly in real-world applications. Consider instances of misdiagnosis in a medical deployment of a model. 

A model may wrongly predict that a healthy person has cancer. It may also classify someone who actually has cancer as cancer-free. Both these outcomes would have unpleasant consequences in terms of the well being of the patients after being diagnosed (or finding out about the misdiagnosis), treatment plans as well as expenses. Therefore it's important to minimize false negatives and false positives.  

The green shapes in the image represent when the model makes the correct prediction. The blue ones represent scenarios where the model made the wrong predictions. The rows of the matrix represent the actual classes while the columns represent predicted classes. 

We can calculate accuracy from the confusion matrix. The accuracy is given by taking the average of the values in the “true” diagonal. 

That is:
Accuracy = (True Positive + True Negative) / Total Sample

That translates to:
Accuracy = Total Number of Correct Predictions / Total Number of Observations

Since the confusion matrix visualizes the four possible outcomes of classification mentioned above, aside from accuracy, we have insight into precision, recall, and ultimately, F-score. They can easily be calculated from the matrix. Precision, recall, and F-score are defined in the section below.  

##### F-score
F-score is a metric that incorporates both the precision and recall of a test to determine the score. This [post](https://acadgild.com/blog/metrics-to-calculate-performance-of-machine-learning-model) defines it as the harmonic mean of recall and precision. F-score is also known as F-measure or F1 score. 

Let’s define precision and recall.

[Precision](https://heartbeat.fritz.ai/introduction-to-machine-learning-model-evaluation-fa859e1b2d7f) refers to the number of true positives divided by the total positive results predicted by a classifier. Simply put, precision aims to understand what fraction of all positive predictions were actually correct.

Precision = True Positives / (True Positives + False Positives)

On the other hand, recall is the number of true positives divided by all the samples that should have been predicted as positive. Recall has the goal to perceive what fraction of actual positive predictions were identified accurately. 

Recall = True Positives / (True Positives + False Negatives)

![precisionrecall](/engineering-education/evaluating-ml-model-performance/precisionrecall.png)

[Source]( https://en.wikipedia.org/wiki/Precision_and_recall)

In addition to robustness, the F-score shows us how precise a model is by letting us know how many correct classifications are made. The F-score ranges between 0 and 1. The higher the F-score, the greater the performance of the model.

![fscore](/engineering-education/evaluating-ml-model-performance/fscore.jpg)

[Source](https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234)

#### Metrics for regression problems
Classification models deal with discrete data. The already covered metrics are ideal for classification tasks since they are concerned with whether a prediction is correct. There is no in-between.

Regression models, on the other hand, deal with continuous data. Predictions are in a continuous range. This is the distinction between the metrics for classification and regression problems.

We'll look at a couple of regression metrics.

##### Mean absolute error
The [mean absolute error](https://medium.com/analytics-vidhya/understanding-performance-metrics-for-machine-learning-algorithms-996dd7efde1e) represents the average of the absolute difference between the original and predicted values. 

Mean absolute error provides the estimate of how far off the actual output the predictions were. However, since it’s an absolute value, it does not indicate the direction of the error.

Mean absolute error is given by:

![mae](/engineering-education/evaluating-ml-model-performance/mae.jpg)

[Source](https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234)

##### Mean squared error
The mean squared error is quite similar to the mean absolute error. However, as described by this [article](https://medium.com/analytics-vidhya/understanding-performance-metrics-for-machine-learning-algorithms-996dd7efde1e), mean squared error uses the average of the square of the difference between original and predicted values. Since this involves the squaring of the errors, larger errors are very notable.

Mean squared error is given by:

![mse](/engineering-education/evaluating-ml-model-performance/mse.jpg)

[Source](https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234)

##### Root mean squared error
The root mean squared error (RMSE), as defined in this [post](https://acadgild.com/blog/metrics-to-calculate-performance-of-machine-learning-model), computes the idealness of fit by calculating the square root of the average of squared differences between the predicted and actual values. It's a measure of the average error magnitude. 

This very detailed [article](https://towardsdatascience.com/what-does-rmse-really-mean-806b65f2e48e) describes root mean squared error as some form of normalized distance between the vectors of the observed and predicted values. 

I recommend a read to understand not only the math but the theory behind RMSE. Aside from being used to evaluate model accuracy, the root mean squared error can be heuristic when training models. This means that it helps to reduce the error with every training iteration.  

### Wrapping up
Besides looking at model evaluation techniques, we have gone over a few important metrics for classification and regression problems. An important takeaway is that, for classification problems, classification accuracy is not an effective indicator of model performance. However, it must be noted that some of these metrics depend on the context of the problem that needs to be solved. It is therefore important to understand the problem and the most effective metrics used to evaluate the model. Good luck!

### References and Further Reading
1. [Introduction to Machine Learning Model Evaluation](https://heartbeat.fritz.ai/introduction-to-machine-learning-model-evaluation-fa859e1b2d7f#:~:text=The%20above%20issues%20can%20be%20handled%20by%20evaluating,accuracy%20of%20a%20model%20on%20future%20%28unseen%2Fout-of-sample%29%20data.)

2. [Metrics to Evaluate your Machine Learning Algorithm]( https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234)

3. [Various ways to evaluate a machine learning model’s performance](https://towardsdatascience.com/various-ways-to-evaluate-a-machine-learning-models-performance-230449055f15)

4. [Evaluating a machine learning model.](https://www.jeremyjordan.me/evaluating-a-machine-learning-model/)

5. [Machine Learning — How to Evaluate your Model?](https://towardsdatascience.com/machine-learning-how-to-evaluate-your-model-1dabbdc849a4)

6. [How to Evaluate Machine Learning Algorithms](https://machinelearningmastery.com/how-to-evaluate-machine-learning-algorithms/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
