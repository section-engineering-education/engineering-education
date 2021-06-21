---
layout: engineering-education
status:
published:
url:
title: Boosting Algorithms (Part 1)
description: Boosting is an ensemble method and is a statistical technique that is used to enhance the performance of a machine learning model by converting weak learners to strong learners.
author: prashanth-saravanan
date:
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/boosting-algorithms-part-1/hero.jpg
    alt: Boosting Algorithms
---
This article is aimed at refreshing the reader of their knowledge of boosting algorithms, how different they are from the existing performance-enhancing algorithms, and discusses the existing boosting models.
<!--more-->
Boosting has quickly risen to be one of the most sought-after techniques to improve the performance of models in machine learning. There has been an exponential rise in the usage of boosting algorithms in the world of Kaggle. One can hardly pick a model at the top 20 of any competition that hasn't used a boosting algorithm.

### Table of Contents
1. [Introduction](#introduction)
2. [Pre-Requisites](#pre-requisites)
3. [Bagging vs Boosting](#bagging-vs-boosting)
4. [Data Preprocessing](#data-preprocessing)
4. [AdaBoost](#adaboost)
5. [AdaBoost Implementation in Python](#adaboost-implementation-in-python)
6. [XGBoost](#xgboost)
7. [XGBoost Implementation in Python](xgboost-implementation-in-python)
8. [Additional Resources](#additional-resources)

### Introduction

The first-ever boosting algorithm called AdaBoost (Adaptive Boosting) was introduced to the world by Freund and Schapire. [Statisticians](https://web.stanford.edu/~hastie/Papers/buehlmann.pdf) have come forward, laying proofs and theorems as to how this gradient descent algorithm in function space, based on statistical estimations and numerical optimizations has proven to be very competitive in terms of prediction accuracy. AdaBoost was described as a "stagewise, additive modeling", where "additive" didn't mean a model fit added by covariates, but meant a linear combination of estimators. An ensemble technique almost always confused with bagging, boosting can be considered as extensively regularizing a model through model iterations. 

The article is split into two parts for the convenience of the reader. This part focuses on refreshing the reader about boosting and explains two boosting algorithms in-depth - Adaptive Boosting (AdaBoost) and eXtreme Gradient Boosting (XGBoost). The second part of the article will focus on explaining two more popular boosting techniques - Light Gradient Boosting Method (LightGBM) and Category Boosting (CatBoost).

### Pre-Requisites

The reader is expected to have a beginner-to-intermediate level understanding of machine learning and [machine learning models](https://www.geeksforgeeks.org/machine-learning/) with a higher focus on [decision trees](https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052). The reader is encouraged to go through the following resources for a better understanding of this article:

1. [Supervised Learning Algorithms by Lalithnarayan C](https://www.section.io/engineering-education/supervised-learning-algorithms/)
2. [Understanding Loss Functions in Machine Learning](https://www.section.io/engineering-education/understanding-loss-functions-in-machine-learning/)
3. [Introduction to Random Forest in Machine Learning by Onesmus Mbaabu](https://www.section.io/engineering-education/introduction-to-random-forest-in-machine-learning/)

For running the code, the user is expected to have the following libraries: NumPy, Pandas, Sklearn, and XGBoost. The reader can install the mentioned libraries in their Windows-operated machine using the following command in the Command Prompt:

```bash
pip install numpy
pip install pandas
pip install scikit-learn
pip install xgboost
```
To test if the libraries are imported, let us import the libraries in Python.

```py
import numpy as np
import pandas as pd
import sklearn
import xgboost
```

### Bagging vs Boosting

As mentioned, boosting is confused with [bagging](https://en.wikipedia.org/wiki/Bootstrap_aggregating). Those are two different terms, although both are ensemble methods. Let us try to understand what ensembling is, and move on to breaking down the differences between bagging and boosting.

[Ensemble methods](https://www.section.io/engineering-education/ensemble-learning/) are techniques that use multiple models and combine them into one for enhanced results. The term "models" could refer to any model - regression, support vector machines, and kNNs, and the model whose performance has to be improved is called the base model. Although the technique "boosting" uses decision trees to improve the model's accuracy, it can be applied to any base model. However, it has been observed that boosting a decision tree based model provides better results than boosting other models. One possible explanation could be the structural similarities of the base model (decision tree) and the boosting algorithm.

Bagging and boosting both use an arbitrary `N` number of learners by generating additional data while training. These `N` learners are used to create `M` new training sets by sampling random sets from the original set. The idea behind bagging is to combine the results of the `M` models that are generated from the sampled sets. The models run in parallel and are independent of each other, and the final results are obtained from combining the results of all the models. 

![Bagging](/engineering-education/boosting-algorithms-part-1/bagging.png)

*Source: [Towards Data Science](https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205)*

Whereas in boosting, the `M` models are trained sequentially, with the models carrying forth the performance of the previous model in an attempt to correct the errors of the previous model. The performance of the models is analyzed by taking the weighted mean of the performances of the individual model, with weights being assigned by their performance.

![Boosting](/engineering-education/boosting-algorithms-part-1/boosting.png)

*Source: [Towards Data Science](https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205)*

### Data Preprocessing

The article uses the [UCI Machine Learning Mushroom Dataset](https://www.kaggle.com/uciml/mushroom-classification) to implement the AdaBoost and XGBoost algorithms. For the set of features in the dataset, the task is to identify whether the type of mushroom is poisonous or edible. The reader is encouraged to download the dataset and follow along with the code blocks in the article for better understanding.

First, let's import the required libraries.

```py
import numpy as np
import pandas as pd
from sklearn.ensemble import AdaBoostClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
```

Now, let's import the dataset using the `read_csv` method in Pandas and analyze the number of distinct categories in each feature. If a feature has only one unique value, we can drop it as it has no significance while building the model.

```py
df = pd.read_csv("mushrooms.csv")
for col in df.columns:
    print('Number of unique values in',col,'is',len(df[col].unique()))
```
The output?

    Number of unique values in class is 2
    Number of unique values in cap-shape is 6
    Number of unique values in cap-surface is 4
    Number of unique values in cap-color is 10
    Number of unique values in bruises is 2
    Number of unique values in odor is 9
    Number of unique values in gill-attachment is 2
    Number of unique values in gill-spacing is 2
    Number of unique values in gill-size is 2
    Number of unique values in gill-color is 12
    Number of unique values in stalk-shape is 2
    Number of unique values in stalk-root is 5
    Number of unique values in stalk-surface-above-ring is 4
    Number of unique values in stalk-surface-below-ring is 4
    Number of unique values in stalk-color-above-ring is 9
    Number of unique values in stalk-color-below-ring is 9
    **Number of unique values in veil-type is 1**
    Number of unique values in veil-color is 4
    Number of unique values in ring-number is 3
    Number of unique values in ring-type is 5
    Number of unique values in spore-print-color is 9
    Number of unique values in population is 6
    Number of unique values in habitat is 7

The feature `veil-type` has only one distinct value in it and hence, can be dropped.

```py
df = df.drop("veil-type",axis=1)
```
Since machine learning models prefer numerical data, let us convert the dataset to numbers by encoding it.

```py
label_encoder = LabelEncoder()
for column in df.columns:
    df[column] = label_encoder.fit_transform(df[column])
```
Splitting the dataset into a target matrix `Y` and a feature matrix `X`,

```py
X = df.drop('class',axis=1)
Y = df['class']
```
The dataset must be split into two -  training data and testing data. Let us go ahead and split the data, 70% of it for training and 30% for testing and standardize the values.

```py
X_train, X_test, Y_train, Y_test = train_test_split(X,Y,test_size=0.3,random_state=100)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

### AdaBoost

[AdaBoost](http://rob.schapire.net/papers/explaining-adaboost.pdf), short for Adaptive Boosting, was one of the first boosting methods that saw success in improving the performance of models. AdaBoost works on improving the areas where the base learner fails. A base learner is the first iteration of the model. Being a weak learner, it combines the predictions from short tress (one-level trees) called decision stumps. 

![Stumps](/engineering-education/boosting-algorithms-part-1/decisionstumps.png)

*Source: [Edureka](https://www.edureka.co/blog/boosting-machine-learning/)*

These decision stump algorithms are used to identify weak learners. Starting with one decision tree, the misclassified examples are penalized by increasing their weight (the weight is boosted), and another decision tree is built from the new and modified training data, which contain the weighted samples. New weak learners are added to the model sequentially to learn and identify tougher patterns. The data after every iteration is never the same and the possible misclassifications are pointed out for the algorithm to identify and learn from. The weights of the misclassifications are increased so that the next iteration can pick them up. The process is repeated for the specified number of iterations. The algorithm makes predictions based on the weak learner's majority vote coupled with their respective accuracies. AdaBoost is resistant to overfitting as the number of iterations increase and are most effective when it works on a binary classification problem. AdaBoost includes an extra condition where a model is required to have an error of less than 50% to maintain it, otherwise, the iterations are repeated until a better learner is generated.

![Adaboost](/engineering-education/boosting-algorithms-part-1/adaboost.png)

*Source: [Towards Data Science](https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205)*

AdaBoost for Regression works on the same principle, with the only difference being the predictions are made using the weighted average of the decision tree, with the weight being the accuracy of the learner against the training data. AdaBoost includes randomization in the construction of the models, so each time a piece of code is run, a slightly different model is generated. Stochastic learning algorithms produce different results every time the code is run, therefore, it is good practice to evaluate the performance of such algorithms by running the code a few times and taking the average of the results obtained.

### AdaBoost Implementation in Python

The `sklearn` library in Python has an `AdaBoostClassifier` method which is used to classify the features as poisonous or edible. The method has the following parameters:

* `base_estimator`: The base estimator from which the boosted ensemble is built. If `None`, then the base estimator is `DecisionTreeClassifier(max_depth=1)`.
* `n_estimators`: The maximum number of estimators at which boosting is terminated. Has a default value of 50. In the case of a perfect fit, the learning procedure is stopped early.
* `learning_rate`: The learning rate shrinks the contribution of each classifier by `learning_rate`. It has a default value of 1.
* `algorithm`: If 'SAMME' then use the SAMME discrete boosting algorithm. The SAMME.R algorithm typically converges faster than SAMME, achieving a lower test error with fewer boosting iterations. The default value is 'SAAME'.
* `random_state`: It is the seed used by the random number generator. If None, the random number generator is the RandomState instance used by `np.random`.

Let us invoke an instance of the `AdaBoostClassifier` and fit it with the training data.

```py
adaboost = AdaBoostClassifier(n_estimators=50,learning_rate=0.2).fit(X_train,Y_train)
score = adaboost.score(X_test,Y_test)
```
The output?

    0.9848236259228876

### XGBoost

Ever since the world was introduced to the XGBoost algorithm through this [paper](https://arxiv.org/pdf/1603.02754.pdf), [XGBoost](https://xgboost.ai/) has been considered the Mona Lisa of boosting algorithms, for the advantages it provides over its peers is undisputed. Widely considered as one of the most important boosting methods, the algorithm has found its way to CERN, where statistical physicists have considered it to be the best approach to classify signals from the Large Hadron Collider. What makes it the most sought-after technique by Kagglers to win data science competitions?

![Quotes](/engineering-education/boosting-algorithms-part-1/quotes.png)

*Source: [Machine Learning Mastery](https://machinelearningmastery.com/gentle-introduction-xgboost-applied-machine-learning/)*

Breaking the process of boosting down from a mathematical standpoint, boosting is used to help find the minima of the 'n' features mapped in 'n' dimensional space, and most algorithms use gradient descent to find the minima. However, XGBoost uses a technique called the [Newton-Raphson method](https://en.wikipedia.org/wiki/Newton%27s_method), which provides a more direct route to the minima. Newton's Method uses the second derivative of the function which provides curvature information. This helps in the [faster minimization of functions](https://math.stackexchange.com/questions/1013195/why-is-newtons-method-faster-than-gradient-descent) when compared to [Gradient Descent](https://en.wikipedia.org/wiki/Gradient_descent), which uses the first derivative. In XGBoost, the decision trees that have nodes with weights that are generated with less evidence are shrunk heavily. This clever method of eliminating nodes that aren't significant is reflected in the speed of the algorithm and its memory consumption.

![Performance](/engineering-education/boosting-algorithms-part-1/performance.png)

*Source: [Datascience.la](http://datascience.la/benchmarking-random-forest-implementations/)*

XGBoost also comes with an extra randomization parameter, which reduces the correlation between the trees. Less correlation between classifier trees translates to better performance of the ensemble of classifiers. XGBoost solves the problem of overfitting by correcting complex models with [regularization](https://www.section.io/engineering-education/regularization-to-prevent-overfitting/). Regularized Gradient Boosting is also available in XGBoost with both L1 and L2 regularization. For enhancing the processing performance, the algorithm uses multiple cores in the CPU. Multiple decision trees are generated in parallel by the algorithm by utilizing all the cores in your CPU. The system is designed as block-like structures, which enables the layout of the data to be reused in subsequent iterations instead of computing it all over again. This is used to find split points in the tree where the data points have equal weights, which makes it difficult to handle. The algorithm uses a distributed weighted quantile sketch algorithm to handle weighted data. The XGBoost library for Python is written in C++ and is available for C++, Python, R, Julia, Java, Hadoop and cloud-based platforms like AWS and Azure.

### XGBoost Implementation in Python

Unlike AdaBoost, XGBoost has a separate library for itself, which hopefully was installed at the beginning. Before importing the library and creating an instance of the `XGBClassifier`, let us take a look at some of the parameters required for invoking the `XGBClassifier` method.

* `max_depth`: Maximum depth of the tree for base learners.
* `learning_rate`: The learning rate of the XGBooster.
* `verbosity`: The degree of verbosity. Valid values are between 0 (silent) and 3 (debug).
* `objective`: To specify the learning task and the corresponding learning objective or a custom objective function to be used.
* `booster`: To specify which booster to use: `gbtree`, `gblinear` or `dart`.
* `tree_method`: To specify which tree method to use. If it is set to default, XGBoost will choose the most conservative option available.
* `n_jobs`: Number of parallel threads used to run XGBoost.
* `gamma`: Minimum loss reduction required to make a further partition on a leaf node of the tree.
* `reg_alpha`: L1 regularization term on weights of XGBoost
* `reg_lambda`: L2 regularization term on weights of XGBoost
* `base_score`: The initial prediction score of all instances, global bias.
* `random_state`: Random number seed.
* `importance_type`: The feature importance type for the feature_importances property: either `gain`, `weight`, `cover`, `total_gain` or `total_cover`.

```py
from xgboost import XGBClassifier
xgboost = XGBClassifier(n_estimators=1000, learning_rate=0.05).fit(X_train, Y_train, early_stopping_rounds=5, eval_set=[(X_test, Y_test)],verbose=False)
score_xgb = xgboost.score(X_test,Y_test)
```
And the final result?

    0.9950779327317474

By experimenting with the parameters, one can achieve 100% accuracy with this dataset.

### Conclusion

The article briefly covered two popular ensemble methods - bagging and boosting, explained their differences. AdaBoost and XGBoost algorithms were discussed from a technical standpoint, the methodology was briefly discussed and were coded. The reader is encouraged to run the code bits and is encouraged to tweak the parameters to obtain higher accuracies. Finally, the reader is expected not to limit their knowledge on boosting algorithms to this article and are encouraged to go through the additional resources to expand their horizons on the topic.

### Additional Resources

1. [Sci-kit Learn Documentation](https://scikit-learn.org/stable/modules/ensemble.html)
2. [Official GitHub Repository of XGBoost](https://github.com/dmlc/xgboost)
3. [Mathematical Perspective of Boosting](https://www.sciencedirect.com/topics/computer-science/boosting-algorithms)
4. [Science Direct](https://www.sciencedirect.com/topics/computer-science/boosting-algorithms)
5. [Kaggle](https://www.kaggle.com/general/70690)
6. [Towards Data Science](https://towardsdatascience.com/boosting-algorithms-explained-d38f56ef3f30)