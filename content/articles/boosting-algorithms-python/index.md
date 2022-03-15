---
layout: engineering-education
status: publish
published: true
url: /boosting-algorithms-python/
title: Boosting Algorithms in Python    
description: Boosting is an ensemble method and is a statistical technique that is used to enhance the performance of a machine learning model by converting weak learners to strong learners.
author: prashanth-saravanan
date: 2021-07-05T00:00:00-17:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/boosting-algorithms-python/hero.png
    alt: Boosting Algorithms image
---
This article is aimed at refreshing the reader of their knowledge of boosting algorithms, how different they are from the existing performance-enhancing algorithms, and discusses the existing boosting models.
<!--more-->
Boosting has quickly risen to be one of the most chosen techniques to improve the performance of models in [machine learning](/engineering-education/topic/machine-learning/). There has been an exponential rise in the usage of boosting algorithms in the world of Kaggle. One can hardly pick a model at the top 20 of any competition that hasn't used a boosting algorithm.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Bagging vs Boosting](#bagging-vs-boosting)
4. [Data Preprocessing](#data-preprocessing)
5. [AdaBoost](#adaboost)
6. [AdaBoost Implementation in Python](#adaboost-implementation-in-python)
7. [XGBoost](#xgboost)
8. [XGBoost Implementation in Python](#xgboost-implementation-in-python)
9. [Conclusion](#conclusion)
10. [Additional Resources](#additional-resources)

### Prerequisites
The reader is expected to have a beginner-to-intermediate level understanding of machine learning and [machine learning models](https://www.geeksforgeeks.org/machine-learning/) with a higher focus on [decision trees](https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052).

The reader is encouraged to go through the following resources to gain a better understanding of this article:
1. [Supervised Learning Algorithms](/engineering-education/supervised-learning-algorithms/) by [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/).
2. [Understanding Loss Functions in Machine Learning](/engineering-education/understanding-loss-functions-in-machine-learning/) by [Prashanth Saravanan](/engineering-education/authors/prashanth-saravanan/).
3. [Introduction to Random Forest in Machine Learning](/engineering-education/introduction-to-random-forest-in-machine-learning/) by [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/).

### Introduction
The first-ever boosting algorithm was called AdaBoost (Adaptive Boosting) was introduced to the world by Freund and Schapire. [Statisticians](https://web.stanford.edu/~hastie/Papers/buehlmann.pdf) have come forward, laying proofs and theorems as to how this ensemble method works well in improving prediction results. 

[Ensemble methods](/engineering-education/ensemble-learning/) are techniques that use multiple models and combine them into one for enhanced results. The term "models" could refer to any model - regression, support vector machines, and kNNs, and the model whose performance has to be improved is called the base model. Although the technique "boosting" uses decision trees to improve the model's accuracy, it can be applied to any base model.

However, it has been observed that boosting a decision tree based model provides better results than boosting other models. One possible explanation could be the structural similarities of the base model (decision tree) and the boosting algorithm.

The article is split into two parts for easier understanding and for the information retention of the reader. This part focuses on refreshing the reader about boosting and explains two boosting algorithms in-depth - **Adaptive Boosting (AdaBoost) and eXtreme Gradient Boosting (XGBoost)**. 

The second part of the article will focus on explaining two more popular boosting techniques - **Light Gradient Boosting Method (LightGBM) and Category Boosting (CatBoost)**.

To run the code, the user is expected to have the following libraries: NumPy, Pandas, Sklearn, and XGBoost. 

The reader can install the mentioned libraries in their Windows-operated machine using the following command in the Command Prompt:

```bash
pip install numpy
pip install pandas
pip install scikit-learn
pip install xgboost
```

Let us import the libraries in Python.

```py
import numpy as np
import pandas as pd
import sklearn
import xgboost
```

### Bagging vs boosting
As mentioned, boosting is confused with [bagging](https://en.wikipedia.org/wiki/Bootstrap_aggregating). Those are two different terms, although both are ensemble methods.

Bagging and boosting both use an arbitrary `N` number of learners by generating additional data while training. These `N` learners are used to create `M` new training sets by sampling random sets from the original set. 

The idea behind bagging is to combine the results of the `M` models that are generated from the sampled sets. The models are independent to each other and run in parallel, and the combining of the results of the models will yield the final result.

![Bagging](/engineering-education/boosting-algorithms-python/bagging.PNG)

*Source: [Towards Data Science](https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205)*

Whereas in boosting, the `M` models are trained sequentially, with the models carrying forth the performance of the previous model in an attempt to rectify the errors in its previous model. 

The performance of the models is analyzed by taking the weighted mean of the performances of the individual model, with weights being assigned by their performance.

![Boosting](/engineering-education/boosting-algorithms-python/boosting.PNG)

*Source: [Towards Data Science](https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205)*

### Data preprocessing
The article uses the [UCI Machine Learning Mushroom Dataset](https://www.kaggle.com/uciml/mushroom-classification) to implement the AdaBoost and XGBoost algorithms. For the set of features in the dataset, the task is to identify whether the type of mushroom is poisonous or edible. The reader is encouraged to download the dataset and follow along with the code blocks in the article to better understand.

First, let's import the required libraries.

```py
import numpy as np
import pandas as pd
from sklearn.ensemble import AdaBoostClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
```

Now, let's import the dataset using the `read_csv()` method in Pandas and analyze the number of distinct categories in each feature. If a feature has only one unique value, we can drop it, as it has no significance while building the model.

```py
df = pd.read_csv("mushrooms.csv")
for col in df.columns:
    print('Unique value count of', col, 'is', len(df[col].unique()))
```

**Output**

```bash
Unique value count of class is 2
Unique value count of cap-shape is 6
Unique value count of cap-surface is 4
Unique value count of cap-color is 10
Unique value count of bruises is 2
Unique value count of odor is 9
Unique value count of gill-attachment is 2
Unique value count of gill-spacing is 2
Unique value count of gill-size is 2
Unique value count of gill-color is 12
Unique value count of stalk-shape is 2
Unique value count of stalk-root is 5
Unique value count of stalk-surface-above-ring is 4
Unique value count of stalk-surface-below-ring is 4
Unique value count of stalk-color-above-ring is 9
Unique value count of stalk-color-below-ring is 9
Unique value count of veil-type is 1
Unique value count of veil-color is 4
Unique value count of ring-number is 3
Unique value count of ring-type is 5
Unique value count of spore-print-color is 9
Unique value count of population is 6
Unique value count of habitat is 7
```

As you can see `Unique value count of veil-type is 1`, the feature `veil-type` has only one distinct value in it and hence, can be dropped.

```py
df = df.drop("veil-type", axis=1)
```

Let's take a look at the data to see how it looks like.

```py
df.head(6)
```

![Data Head](/engineering-education/boosting-algorithms-python/datahead.PNG)

Since machine learning models prefer numerical data, let's convert the dataset to numbers by encoding it. `LabelEncoder()` is a method in the Scikit-Learn package that converts labels to numbers. 

The reader is required to go through [this](https://www.analyticsvidhya.com/blog/2020/03/one-hot-encoding-vs-label-encoding-using-scikit-learn/) resource on Label Encoding to understand why data has to be encoded.

```py
label_encoder = LabelEncoder()
for column in df.columns:
    df[column] = label_encoder.fit_transform(df[column])
```

Splitting the dataset into a target matrix `Y` and a feature matrix `X`,

```py
X = df.loc[:, df.columns != 'class']
Y = df['class']
```

The dataset must be be split into two - training and testing data. Let us go ahead and split the data, 70% of it for training and 30% for testing and standardize the values. 

To understand why numerical data has to be standardized, the reader is advised to go through [this](/engineering-education/introduction-to-scikit-learn-in-python/) article.

```py
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.3, random_state = 100)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

### AdaBoost
[AdaBoost](http://rob.schapire.net/papers/explaining-adaboost.pdf), short for Adaptive Boosting, was one of the first boosting methods that saw success in improving the performance of models. AdaBoost focuses on enhancing the performance in areas where the base learner fails. A base learner is the first iteration of the model.

Being a weak learner, it combines the predictions from short tress (one-level trees) called decision stumps. AdaBoost was described as a "stagewise, additive modeling", where "additive" didn't mean a model fit added by covariates, but meant a linear combination of estimators.

![Stumps](/engineering-education/boosting-algorithms-python/decisionstumps.PNG)

*Source: [Edureka](https://www.edureka.co/blog/boosting-machine-learning/)*

These decision stump algorithms are used to identify weak learners. Starting with one decision tree, the misclassified examples are penalized by increasing their weight (the weight is boosted).

Another decision tree is built from the new and modified training data, which contain the weighted samples. New weak learners are added to the model sequentially to learn and identify tougher patterns.

The data after every iteration is never the same and the possible misclassifications are pointed out for the algorithm to identify and learn from. The weights of the misclassifications are increased so that the next iteration can pick them up. 

The process is repeated for the number of iterations specified as a parameter. The algorithm makes predictions based on the weak learner's majority vote coupled with their respective accuracies.

AdaBoost is resistant to overfitting as the number of iterations increase and are most effective when it works on a binary classification problem. AdaBoost includes an extra condition where a model is required to have an error of less than 50% to maintain it, otherwise, the iterations are repeated until a better learner is generated.

![Adaboost](/engineering-education/boosting-algorithms-python/adaboost.PNG)

*Source: [Towards Data Science](https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205)*

AdaBoost for Regression works on the same principle, with the only difference being the predictions are made using the weighted average of the decision tree, with the weight being the accuracy of the learner against the training data. AdaBoost includes randomization in the construction of the models, so each time a piece of code is run, a slightly different model is generated.

[Stochastic](https://machinelearningmastery.com/stochastic-in-machine-learning/) learning algorithms produce different results every time the code is run, therefore, it is good practice to evaluate the performance of such algorithms by running the code a few times and taking the average of the results obtained.

### AdaBoost Implementation in Python
The `sklearn` library in Python has an `AdaBoostClassifier` method which is used to classify the features as poisonous or edible. 

The method has the following parameters:
- `base_estimator`: The boosted ensemble is built from this parameter. If `None`, the value is `DecisionTreeClassifier(max_depth=1)`.
- `n_estimators`: The upper limit in estimators at which boosting is terminated with a default value of 50. If there is a perfect fit, learning is stopped early.
- `learning_rate`: The learning rate reduces the contribution of the classifier by this value. It has a default value of 1.
- `algorithm`: Default value of 'SAAME'. Another option for this parameter, SAMME.R algorithm, converges faster than SAMME algorithm while taking fewer boosting iterations and producing lower test errors.
- `random_state`: Seed used by the random number generator.

Let us invoke an instance of the `AdaBoostClassifier` and fit it with the training data.

```py
adaboost = AdaBoostClassifier(n_estimators = 50, learning_rate = 0.2).fit(X_train, Y_train)
score = adaboost.score(X_test, Y_test)
```

**Output**

```bash
0.9848236259228876
```

### XGBoost
Ever since the world was introduced to the XGBoost algorithm through this [paper](https://arxiv.org/pdf/1603.02754.pdf), [XGBoost](https://xgboost.ai/) has been considered the Mona Lisa of boosting algorithms, for the advantages it provides over its peers is undisputed. 

Widely considered as one of the most important boosting methods, the algorithm has found its way to CERN, where statistical physicists have considered it to be the best approach to classify signals from the Large Hadron Collider. What makes it the most sought-after technique by Kagglers to win data science competitions?

![Quotes](/engineering-education/boosting-algorithms-python/quotes.PNG)

*Source: [Machine Learning Mastery](https://machinelearningmastery.com/gentle-introduction-xgboost-applied-machine-learning/)*

Breaking the process of boosting down from a mathematical standpoint, boosting is used to help find the minima of the 'n' features mapped in 'n' dimensional space, and most algorithms use gradient descent to find the minima. 

However, XGBoost uses a technique called the [Newton-Raphson method](https://en.wikipedia.org/wiki/Newton%27s_method), which provides a more direct route to the minima. Newton's Method uses the second derivative of the function which provides curvature information. 

This helps in the [faster minimization of functions](https://math.stackexchange.com/questions/1013195/why-is-newtons-method-faster-than-gradient-descent) when compared to [Gradient Descent](https://en.wikipedia.org/wiki/Gradient_descent), which uses the first derivative. 

In XGBoost, the decision trees that have nodes with weights that are generated with less evidence are shrunk heavily. This clever method of eliminating nodes that aren't significant is reflected in the speed of the algorithm and its memory consumption.

![Performance](/engineering-education/boosting-algorithms-python/performance.PNG)

*Source: [Datascience.la](http://datascience.la/benchmarking-random-forest-implementations/)*

XGBoost also comes with an extra randomization parameter, which reduces the correlation between the trees. Less correlation between classifier trees translates to better performance of the ensemble of classifiers. 

XGBoost solves the problem of overfitting by correcting complex models with [regularization](/engineering-education/regularization-to-prevent-overfitting/). Regularized Gradient Boosting is also an option, taking into account both L1 regularization and L2 regularization.

When enhancing the processing performance, the algorithm uses multiple cores in the CPU. Multiple decision trees are generated in parallel by the algorithm by utilizing all the cores in your CPU. 

The system is designed as block-like structures, which enables the layout of the data to be reused in subsequent iterations instead of computing it all over again. 

This is used to find split points in the tree where the data points have equal weights, which makes it difficult to handle. The algorithm uses a distributed [weighted quantile sketch algorithm](https://towardsdatascience.com/why-xgboost-is-so-effective-3a193951e289) to handle weighted data.

The XGBoost library for Python is written in C++ and is available for C++, Python, R, Julia, Java, Hadoop and cloud-based platforms like AWS and Azure.

### XGBoost implementation in Python
Unlike AdaBoost, XGBoost has a separate library for itself, which hopefully was installed at the beginning. Before importing the library and creating an instance of the `XGBClassifier`, let us take a look at some of the parameters required for invoking the `XGBClassifier` method.

- `max_depth`: Maximum depth of the tree for base learners.
- `learning_rate`: The learning rate of the XGBooster.
- `verbosity`: The degree of verbosity. Valid values are between 0 (silent) and 3 (debug).
- `objective`: The learning objective to be used.
- `booster`: The booster to be chosen amongst `gbtree`, `gblinear` and `dart`.
- `tree_method`: The tree method to be used. The most conservative option is set as default.
- `n_jobs`: Number of parallel threads.
- `gamma`: Minimum loss reduction required to make another split on a leaf node of the tree.
- `reg_alpha`: L1 regularization term on weights of XGBoost.
- `reg_lambda`: L2 regularization term on weights of XGBoost.
- `base_score`: The initial prediction (also called global bias).
- `random_state`: Random number seed.
- `importance_type`: The feature to focus on; either `gain`, `weight`, `cover`, `total_gain` or `total_cover`.

```py
from xgboost import XGBClassifier
xgboost = XGBClassifier(n_estimators = 1000, learning_rate = 0.05).fit(X_train, Y_train, early_stopping_rounds = 5, eval_set = [(X_test, Y_test)],verbose = False)
score_xgb = xgboost.score(X_test,Y_test)
```

The final result should be:

```bash
0.9950779327317474
```

By experimenting with the parameters, one can achieve 100% accuracy with this dataset.

### Conclusion
The article briefly covered two popular ensemble methods - bagging and boosting, explained their differences. AdaBoost and XGBoost algorithms were discussed from a technical standpoint, the methodology was briefly discussed and were coded. 

The reader is encouraged to run the code bits and is encouraged to tweak the parameters to obtain higher accuracies.

Finally, the reader is expected not to limit their knowledge on boosting algorithms to this article and are encouraged to go through the additional resources to expand their horizons on the topic.

Happy coding.

### Additional Resources
1. [Sci-kit Learn Documentation](https://scikit-learn.org/stable/modules/ensemble.html)
2. [Official GitHub Repository of XGBoost](https://github.com/dmlc/xgboost)
3. [Mathematical Perspective of Boosting](https://www.sciencedirect.com/topics/computer-science/boosting-algorithms)
4. [Science Direct](https://www.sciencedirect.com/topics/computer-science/boosting-algorithms)
5. [Kaggle](https://www.kaggle.com/general/70690)
6. [Towards Data Science](https://towardsdatascience.com/boosting-algorithms-explained-d38f56ef3f30)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)