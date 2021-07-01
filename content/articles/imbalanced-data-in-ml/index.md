---
layout: engineering-education
status: publish
published: true
url: /imbalanced-data-in-ml/
title: Handling Imbalanced Datasets in Machine Learning
description: This article will be going over techniques used to handle imbalanced dataset in machine learning algorithms.
author: collins-ayuya
date: 2020-12-03T00:00:00-12:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/imbalanced-data-in-ml/hero.jpg
    alt: imbalanced datasets image example
---
Imbalanced datasets mean that the number of observations differs for the classes in a classification dataset. This imbalance can lead to inaccurate results.
<!--more-->
In this article we will explore techniques used to handle imbalanced data.

Data powers machine learning algorithms. It's important to have balanced datasets in a machine learning workflow.

### Table of contents
1. The need for balanced datasets.

2. Balanced vs. imbalanced datasets.

3. Techniques to handle imbalanced data.

### Prerequisites
One only needs to understand general machine learning concepts. They can be found in this [article](/supervised-learning-algorithms/).

### Why is imbalance an issue?
Data fuels machine learning algorithms. In the absence of a good quality dataset, even the best of algorithms struggles to produce good results. An imbalanced dataset is defined by great differences in the distribution of the classes in the dataset.

This means that a dataset is biased towards a class in the dataset. If the dataset is biased towards one class, an algorithm trained on the same data will be biased towards the same class.

The model learns more from biased examples as opposed to the examples in the minority class. One might end up with a scenario where a model assumes that any data you feed it belongs to the majority class.

This, as a result, makes a model seem naïve in its predictions, regardless of achieving high accuracy scores.

### Balanced and imbalanced datasets
A balanced dataset refers to a dataset whose distribution of labels is approximately equal. Labels in this context refer to a class associated with each data point.

For example, consider a dataset with two classes; male and female. If approximately half the distribution represents the male class and the other half represents the female class, we say the dataset is balanced.

The distribution of an imbalanced dataset is characterized by very high differences between the classes involved. Taking the example above of male and female classes, an imbalanced dataset may have a very high difference between the two classes.

### Techniques
Now that we know of the impact of imbalanced datasets, it's a relief to know that there are methods to correct the said imbalance. We will look at a handful of them.

#### Oversampling
Oversampling is a technique to alter unequal classes of data to create balanced datasets. This technique attempts to increment the size of rare samples to create a balance when the data is insufficient.

For example, let’s have a classification problem with two classes and 100K data points. 20K data points are of the positive class, 80K for the negative class. The positive class, which is the minority class, would need to be oversampled.

To do this, we take the 20K data points and replicate them four times to produce 80K. This yields an equal number of examples for both positive and negative classes. The size of the dataset would increase to 160K as a result.

As per our example, although balance is achieved, no new or extra information is added to the model. A technique used to carry out oversampling is [Synthetic Minority Over-sampling Technique(SMOTE)](https://arxiv.org/pdf/1106.1813.pdf).

This technique improves the approach where examples in a minority class are duplicated to create balance. SMOTE synthesizes new examples as opposed to duplicating examples.

SMOTE selects examples that happen to be in proximity in a feature space. It then takes a new example at a point along the segment, joining adjacent examples.

To elaborate further, it finds the [k-nearest-neighbors](https://deepai.org/machine-learning-glossary-and-terms/kNN#) (k-NN) in the minority class. The k-NN refers to a classification approach where the likelihood of a data point belongs to one group or another depending on the data points in closest proximity to the data point.

SMOTE chooses an instance of the minority class at random and computes its k-NN. A neighbor to it is then chosen randomly.

After that, a synthetic example is created at a point selected at random between the two examples. This process can generate as many synthetic examples needed for a minority class to create balance.

A benefit of oversampling is that there is no data loss from the original training set. All the data from both the majority and minority classes are used. Yet, the downside of oversampling is that it causes overfitting.

#### Undersampling
When there exists a class that is in abundance, undersampling aims to reduce the size of the abundant class to balance the dataset.

Using a similar context to the oversampling example, we have a classification problem with two classes and 100K data points. 20K data points are of the positive class, 80K for the negative class. We would need to undersample the majority class.

This would involve choosing 20K data points randomly from the 80K available. We then have 20K positive and 20K negative data points, bringing the total dataset size to 40K data points.

For classification problems, there exists a method known as [Tomek links](http://www.samdrazin.com/classes/een548/project1report.pdf). It aims to improve the accuracy of the classification of data. This is done by removing as much class label noise as possible.

Let's define label noise. Classification involves predicting the class of new samples using a model that makes an inference from training data.

Let's assume that each sample associates itself with an observed label. The label usually indicates the class of the sample. This label may be subjected to a process that pollutes labels.

This process is described as label noise. A type of label noise is known as class noise. This [paper](https://www.researchgate.net/publication/261601383_Classification_in_the_Presence_of_Label_Noise_A_Survey) describes class noise as noise that changes the observed labels assigned to instances. An example would be wrongly assigning a positive label on a negative instance.

Tomek links also work to remove borderline examples with a higher probability of being incorrect. This is known as Tomek link removal.

Tomek links are points that are the closest neighbors to each other but have different class labels. Since this technique makes it possible to identify points near different class labels, it is easy to get rid of them until none are left.

In the context of undersampling, this technique gets rid of unwanted overlap between classes. The result is only having neighbors of the same class in close proximity.

We can also argue that a [support vector machine](https://towardsdatascience.com/support-vector-machines-imbalanced-data-feb3ecffbb0e) algorithm can function similarly to the Tomek links method.

An SVM algorithm, though also competent at regression tasks, is effective at classification tasks since it finds a hyperplane decision boundary that separates examples into two categories.

The hyperplane is placed equidistantly from both classes. A margin defines the hyperplane by maximizing the distance between the boundary and nearest examples from each class.

However, a distinguishing factor between Tomek links and SVMs is that SVMs are ineffective at imbalanced classification.

They are very sensitive to imbalanced datasets and produce a less than optimal performance. Nonetheless, there exists a method to improve the effectiveness of SVMs on imbalanced data.

There exists a parameter C, that controls the trade-off between broadening the margin between classes and lessening instances of misclassification.

This C value can be weighted to reflect the importance of each class in an imbalanced set. This allows SVMs to be competent at working with imbalanced datasets.

This variation of SVM is known as Weighted SVM or Cost-Sensitive SVM.

Read more on it [here](https://machinelearningmastery.com/cost-sensitive-svm-for-imbalanced-classification/).         

#### Ensemble learning
An ensemble-based method can be used to deal with imbalanced datasets. The belief is that multiple learning methods are more effective than a single one. It's an approach that combines the performance or results of many classifiers to better the performance of a single classifier.

Let’s briefly define a couple of ensemble methods:

**Bagging**– This method attempts to apply similar learners on tiny sample populations then takes the mean of all predictions made.

![bagging](/engineering-education/imbalanced-data-in-ml/bagging.png)

[*Bagging Image Source*](https://www.analyticsvidhya.com/blog/2015/08/introduction-ensemble-learning/)

**Boosting**– is a technique that adjusts an observation's weight based on the most recent classification.

Boosting attempts to increase the weight of an observation that has been incorrectly classified. This is an iterative process, since new models are then trained on the inefficiencies of prior models.

This makes the newer models better and stronger than the previous ones. The resulting ensemble has many machine learning models.

These models boast different accuracies and can provide better accuracies when used together. Boosting also reduces bias error of the models.

#### The right evaluation metrics
Whenever there is an imbalance in class labels, that means that the classification accuracy metric is not ideal for model performance.

What do we mean by this. Classification accuracy is a good metric when the samples belonging to each class are equal in number.

Consider a scenario with 93% of samples from class C and 7% from class F in a training set. A model can simply achieve 93% training accuracy by predicting each training sample in class C. This is even assuming that it fails to predict any samples in class F correctly.

Therefore, when dealing with imbalanced datasets, it's wise to use the correct evaluation metrics. It's not advisable to use accuracy as a measure of performance. We may consider metrics such as F1-score, precision, and recall.

Here is an [article](https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234) that defines the metrics below in greater detail.

As defined in my previous [article](/evaluating-ml-model-performance/):

Precision is the number of true positives against the total positive results predicted by a classifier.

$$ Precision = \frac{True Positives}{True Positives + False Positives} $$

The recall is the number of true positives divided by all the samples that should have been positive.

$$ Recall = \frac{True Positives}{True Positives + False Negatives} $$

F1-score shows us how accurate a model is by showing how many correct classifications are made. F1-score has a range between 0 and 1. The greater the score, the better the performance of the model.

$$ F1-score = \frac{2 * Precision * Recall}{Precision + Recall} $$

#### More data
To deal with an imbalanced dataset, there exists a very simple approach in fixing it: collect more data!

The data we collect is for the class with a low distribution ratio. This method would be advisable if it is cheap and is not time-consuming.

However, data collection is often an expensive, tedious, and time-consuming process. This makes further data collection unfeasible in some cases.

### Wrapping up
Imbalanced datasets can deceive both human beings and the model itself into believing that it generalizes well. To avoid such a scenario, it is important to understand how to correct the datasets' imbalance.

We have explored a few of the possible techniques to carry out this correction. However, the choice of technique is dependent on the nature of the problem which should be taken into consideration.

Below are some links to some useful publications on imbalanced datasets for further reading. Good luck!

### References and further reading
1. [5 Important Techniques To Process Imbalanced Data In Machine Learning](https://analyticsindiamag.com/5-important-techniques-to-process-imbalanced-data-in-machine-learning/)

2. [Handling imbalanced datasets in machine learning](https://towardsdatascience.com/handling-imbalanced-datasets-in-machine-learning-7a0e84220f28)

3. [Dealing with Imbalanced Data in Machine Learning](https://heartbeat.fritz.ai/dealing-with-imbalanced-data-in-machine-learning-18e45fea7bb5)

4. [What Is Balanced And Imbalanced Dataset?](https://medium.com/analytics-vidhya/what-is-balance-and-imbalance-dataset-89e8d7f46bc5)

5. [Addressing Challenges Associated with Imbalanced Datasets in Machine Learning](https://www.einfochips.com/blog/addressing-challenges-associated-with-imbalanced-datasets-in-machine-learning/)

6. [Dealing with Imbalanced Data in Machine Learning](https://www.kdnuggets.com/2020/10/imbalanced-data-machine-learning.html)

7. [Unbalanced Datasets & What To Do About Them](https://blog.strands.com/unbalanced-datasets)

8. [SMOTE: Synthetic Minority Over-sampling Technique](https://arxiv.org/pdf/1106.1813.pdf)

9. [SMOTE for Imbalanced Classification with Python](https://machinelearningmastery.com/smote-oversampling-for-imbalanced-classification/)

10. [Under-sampling: A Performance Booster on Imbalanced Data](https://towardsdatascience.com/under-sampling-a-performance-booster-on-imbalanced-data-a79ff1559fab)

11. [Classification of Imbalance Data using Tomek Link (T-Link) Combined with Random Under-sampling (RUS) as a Data Reduction Method](https://www.researchgate.net/publication/326590590_Classification_of_Imbalance_Data_using_Tomek_Link_T-Link_Combined_with_Random_Under-sampling_RUS_as_a_Data_Reduction_Method)

12. [What is ensemble learning?](https://bdtechtalks.com/2020/11/12/what-is-ensemble-learning/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)


<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });
    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>
