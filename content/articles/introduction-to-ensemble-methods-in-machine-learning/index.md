### Introduction to Ensemble Methods in Machine Learning

### Introduction
One thing I've noticed is that when we try to relate concepts and experiences we encounter in our daily lives, things become easier to learn. When we have a metaphor for real life, it is difficult to remember things. As a result, in order to keep this in mind, we will examine various methods of comparing ourselves to everyday situations.

The same approaches are used when integrating models in machine learning. To improve overall performance, they combine decisions from multiple models. This can be accomplished in a variety of ways, which are detailed in this article.

The goal of this article is to introduce the concept of learning by combining algorithms and to comprehend the algorithms that use this process. To help you understand this wide range of topics, we will explain step by step on the introduction to ensemble methods in machine learning focussing on the problem of real life.


### Table of contents
- [Prerequisites](#prerequisites)
- [Definition of Ensemble Methods](#definition-of-ensemble-methods)
- [Types of Ensemble Methods in Machine Learning](#types-of-ensemble-methods-in-machine-learning)
  - [Homogeneous Ensemble](#homogeneous-ensemble)
  - [Heterogeneous Ensemble](#heterogeneous-ensemble)
  - [Sequential Ensemble Methods](#sequential-ensemble-methods)
  - [Parallel Method](#parallel-method)
- [Technical Classification of Ensemble Methods](#technical-classification-of-ensemble-methods)
- [Similarities between boosting and bagging methods](#similarities-between-bagging-and-boosting-methods)
- [Conclusion](#conclusion)

### Prerequisites
- The reader should have basic knowledge in machine learning algorithms.
- The reader have read about machine learning life cycles and its advantages.


### Definition of Ensemble Methods
A multimodal system where different classifiers and techniques are grouped together to form a predictive model is referred to as the *ensemble methods*. It is compiled as Parallel Model, Heterogeneous, Homogeneous and Sequential Model methods etc. 

Ensemble also aids in reducing the variability of predicted data, reducing bias in the predictable model and accurately differentiating and predicting statistics in complex problems.


### Types of Ensemble Methods in Machine Learning
In machine learning, bias, diversity, and noise all have a negative impact on errors and predictions in machine learning models. A combination of several methods is used to avoid these issues. They include ;
   - Homogeneous Ensemble
   - Heterogeneous Ensemble
   - Sequential Ensemble Methods
   - Parallel Ensemble Methods


#### Homogeneous Ensemble
A homogeneous ensemble is made up of members who all use the same type of base learning algorithm. Bagging and boosting create diversity by allocating weights to training examples, but the ensemble is typically built using a single type of base classifier.

Bagging and boosting are the most known examples of homogeneous ensemble.


#### Heterogeneous Ensemble
Heterogeneous ensemble is made up of associates with various base learning algorithms, which includes, SVM, ANN, and Decision Trees. Stacking, which is analogous to boosting, is a well-known heterogeneous ensemble method.


#### Sequential Ensemble Methods
This is a type of ensemble method in which base learners are sequentially produced and where data dependency resides. In this ensemble method, all other data in the base learner relies on previous data in some way. As a result, the previously mislabeled data is tuned based on its weight in order to improve the overall system performance.


#### Parallel Ensemble Methods
In this ensemble method, the base learner is produced in parallel sequence, with no data dependency. Every piece of data in the base learner is obtained on its own.


### Technical Classification of Ensemble Methods
Ensemble methods are technically classified as ;

- Boosting
- Bagging
- Random forest
- Stacking

#### (a) Boosting
Booosting ensemble is an ensemble method that constructs a strong classifier from a group of weak classifiers by merging multiple weak classifiers in series. It's an example of sequential ensemble methods whose main aim/property is the concept of correcting prediction errors.

>Below is an example of how you implement boosting in python

![Implementing boosting in python](/engineering-education/introduction-to-ensemble-methods-in-machine-learning/boosting.jpg)

#### (b) Bagging
It's one of the parallel ensemble methods that combines numerous versions of a predicted model, it is also known as ***bootstrap aggregating***. Bagging minimises prediction variance by creating extra data while employing various combinations in the training data.

> Below is an example of how bagging is implemented in python

![Implementing bagging in python](/engineering-education/introduction-to-ensemble-methods-in-machine-learning/bagging.jpg)

#### (c) Random forest
It's almost similar to bagging since it also uses deep trees on bootstraps samples. A subset of a sample is chosen at random, hence reducing the likelihood of receiving related prediction values. Its key property is deciding for missing data.


#### (d) Stacking
Stacking method is an example of heterogeneous ensemble method that uses a meta-classifier to combine multiple classifications. Its main aim is to produce a model that is less bias.

>Here is an example of how to implement stacking in python

![Implementing stacking in python](/engineering-education/introduction-to-ensemble-methods-in-machine-learning/stacking.jpg)

### Similarities between boosting and bagging methods
- Both bagging and boosting are effective at increasing stability and reducing variance.
- Both bagging and boosting produce multiple training data sets and chooses samples at random.
- Both boosting and bagging aim at producing N learners from a single learner.

### Conclusion
Ensemble methods have always had a great impact in machine language world. With the information above the reader is able to tackle issues dealing with ensemble methods. 

You can check out the links below for more articles on ensemble methods ;
- [Ensemble Learning Techniques to Improve Machine Learning](https://www.section.io/engineering-education/ensemble-learning/)
- [Ensemble Learning on Bias and Variance](https://www.section.io/engineering-education/ensemble-bias-var/)
- [Building an Ensemble Learning Based Regression Model using Python](https://www.section.io/engineering-education/ensemble-learning-based-regression-model-using-python/)
- [Saving and Loading Stacked Ensemble Classifiers in ONNX Format in Python](https://www.section.io/engineering-education/save-and-load-stacked-ensembles-in-onnx/)
- [Boosting Algorithms in Python](https://www.section.io/engineering-education/boosting-algorithms-python/)



