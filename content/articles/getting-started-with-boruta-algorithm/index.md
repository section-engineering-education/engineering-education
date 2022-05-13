---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-boruta-algorithm/
title: How to Get Started with the Boruta Algorithm in Machine Learning
description: This tutorial will walk the reader through how to get started with Boruta algorithm in machine learning.
author: nelson-ruto
date: 2022-05-13T00:00:00-10:40
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-boruta-algorithm/hero.png
    alt: How to Get Started with Boruta Algorithm in Machine Learning Hero Image
---
Boruta is a Machine Learning algorithm used in feature selection. Feature selection is a process of reducing the number of features in a dataset by identifying features that largely influence the study variable. 
<!--more-->

It is an important aspect of machine learning, for instance, supposing we are required to perform an analysis of genetic data. The dataset, in this case, can be very huge, and fitting the machine learning model in it may have significant challenges.

This may include; high computational cost and processing time, also machine learning models that fit on high dimensional datasets tend to have poorer performance than when fit on optimal features of the dataset.

There are various methods used in feature selection. These methods fall into four broad categories: Filter methods, Wrapper methods, Embedded methods, and Hybrid methods.

This article will guide you on how to perform feature selection using the Boruta algorithm and implement it in Python.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction to Boruta algorithm](#introduction-to-boruta-algorithm)
- [Python implementation of the Boruta algorithm](#python-implementation-of-the-boruta-algorithm)
- [Step 1: Creating a dataset as a pandas dataframe](#step-1-creating-a-dataset-as-a-pandas-dataframe)
- [Step 2: Creating the shadow feature](#step-2--creating-the-shadow-feature)
- [Step 3: Fitting the classifier:](#step-3-fitting-the-classifier)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader will need:
- Some basic knowledge of Python and Jupiter notebook environment.
- Background knowledge with [Random forest](/engineering-education/introduction-to-random-forest-in-machine-learning/).

### Introduction to Boruta algorithm
Boruta is a wrapper method of the **Feature selection** built around the [Random Forest Classifier algorithm](/engineering-education/introduction-to-random-forest-in-machine-learning/). 

The algorithm works by taking features of the original dataset and creates a copy of them. On this copy, values in each column are shuffled to attain randomness. 

These shuffled features are known as **Shadow Features**. The shadow features are then merged with the original features to obtain a new feature space whose dimension is twice the original dataset. The diagram below clarifies the above discussion.

![image](/engineering-education/getting-started-with-boruta-algorithm/boruta.png)

Now, it builds a classifier (Random Forest Classifier) on these new features space which determines their importance using a statistical test, known as the `[Z-Sore]()`. 

The algorithm checks if the real (the original) feature has higher importance than the maximum importance of shadow features, i.e., `$(Z-Score_{original} > Z-Score_{Max\, shadow})$`.

If that's the case, the feature is considered significant and thus kept; otherwise, if it's insignificant, it is dropped from the dataset.

The features that qualify in the first iteration create the dataset used in the second iteration. The algorithm creates shadow features again using those features and determines their importance as it did in the first iteration. 

Some features are dropped, while others are kept. This repeats until a specified number of iterations has been achieved or when all features have been confirmed or dropped. 

### Python Implementation of the Boruta Algorithm
To make this session more friendly,  we will implement what we have learned from scratch. We will generate a simple data frame and then implement the Boruta algorithm. 

### Step 1: Creating a dataset as a pandas dataframe
To create our data frame, we need to import the Pandas library.

```python
# import pandas to work
import pandas as pd
# creating a dataframe
X = pd.DataFrame({'X1':[30, 52, 65, 57, 89,70],
                  'X2':[200,789,156,754,379,800],
                  'X3':[12,78,654,123,456,520]})
y = pd.Series([30,39,41,58,75,80], name="Income")
```

We can view our dataframe using the code below:

```python
# use the join method to join X and y
print(X.join(y))
```

Output:

![dataframe](/engineering-education/getting-started-with-boruta-algorithm/data.png)

### Step 2:  Creating the shadow feature
Before creating the shadow features, first, let's create a copy of our dataset with which we will randomly shuffle all values in each column. Let's do that using the code below.

```python
import numpy as np
np.random.seed(42)
X_shadow = X.apply(np.random.permutation) 
X_shadow.columns = ['shadow_' + feat for feat in X.columns] # returns names of the shadow dataframe if printed
X_boruta = pd.concat([X,X_shadow], axis = 1)
```

#### Understanding the code:
The code starts by importing `NumPy` as `np`. Then we set the seed as `42` to make the results reproducible for this example. 

We then created the `X_shadow` variable that contains columns of new data, which is created by randomly permuting each column of `X`. 

We use the `apply()` method to ensure this is performed for all the columns in the entire dataset. 

The `pd.concat()` method combines the `X` and `X_shadow` dataframes into one array, with all the columns in both `X` and `X_shadow`.

Upon executing the above code, let's print the following components.
1. The shadow dataframe.
   
```python
print(X_shadow)
```

Output:

![image](/engineering-education/getting-started-with-boruta-algorithm/shandow.png)

2. The merged dataframe.

```python
print(X_boruta)
```

Executing the code above, we get:

![image](/engineering-education/getting-started-with-boruta-algorithm/marged.png)

As we can see, the dataset consists of both columns in `X` and `X_shadow`.

Next, we will fit a random classifier on this `X_boruta` dataset and compute the feature's importance. 

Note, to further simplify things; we can fit the classifier on both `X` and `X_shadow` separately.

### Step 3: Fitting the classifier:
As mentioned earlier, the classifier we will fit is the random forest.

```python
# RandomForestRegressor class from sklearn
from sklearn.ensemble import RandomForestRegressor
# create the rfr class object and specify max_depth, the number of trees used to make a prediction, as 5,
# set an internal state of 42 so that can be used to generate pseudo numbers.
forest = RandomForestRegressor(max_depth = 5, random_state=42)
# 
forest.fit(X_boruta, y) # uses the above specified internal state to fit model with 5 trees
# returns importance of each feature in X
feat_imp_X = forest.feature_importances_[:len(X.columns)] 
# returns importance of each feature in X_shandow
feat_imp_shadow = forest.feature_importances_[len(X.columns):]
# comparing feature importance
hits = feat_imp_X > feat_imp_shadow.max()
```

Upon executing the above commands, we can print the following parts:

- Features importance for `X`.

```python
print(feat_imp_X)
```

This returns:

```bash
array([0.28386363, 0.1566719 , 0.06911553])
```

- Features importance for `X_shadow`.

```python
print(feat_imp_shadow)
```

This returns:

```bash
array([0.10908914, 0.13950675, 0.24175304])
```

We will compare each feature's importance for `X` with the maximum feature importance for the shadow dataframe `X_shadow`. 

Let's also print the maximum value of the `X_shadow`.

```python
print(feat_imp_shadow.max())
```

The output is:

```bash
0.24175304021345345
```

For any feature in `X` to be considered, its importance should be greater than 0.24175. To compare which features are important in `X`, we will print `hits` which will return a boolean output. 

The true values correspond to those features that have importance in `X`, and False that have insignificant influence in defining our study variable `Y`. 

Now, let’s print `hits`.

```python
print(hits)
```

Output:

```bash
array([ True, False, False])
```

This output means that only the first variable in `X`, i.e., `X1`, significantly influences the study variable y. We can now use this accepted variable and implement our model, which has nothing to do with the model used to determine the feature's importance. 

In this demonstration, we landed on the optimal output after only one iteration, but don't forget this was meant to get you familiar with this algorithm. 

In practice, it might take this algorithm many iterations to figure out the optimal features from a high dimensional dataset. This makes the algorithm very slow, hence one of its major drawback.

You can check out the complete code [here](https://github.com/nelsonnrl/program-center/blob/main/boruta.py)

### Conclusion
In this article, we learned the basics of the Boruta algorithm and its implementation in Python. Boruta is a powerful feature selection method with application in almost all datasets. Although it might be time-consuming, especially when data reduction is performed on a large dataset, but the financial result can be reliable.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
