---
layout: engineering-education
status: publish
published: true
url: /recursive-feature-elimination/
title: Getting started with Recursive Feature Elimination algorithm in Machine Learning
description: This tutorial aims to help the reader get started with the Recursive Feature Elimination algorithm and implement it in Python.
author: daniel-mwanthi
date: 2022-01-13T00:00:00-01:36
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/recursive-feature-elimination/hero.png
    alt:  Recursive Feature Elimination Algorithm Hero Image
---
Most of the time, the data we work with in machine learning is usually in high dimensions. As a result, models implemented on these data are victims of the Curse of Dimensionality. 

The Curse of Dimensionality refers to all problems associated with high dimensional datasets. For example, when the dataset dimensionality is too high, it is possible to be highly detailed, and therefore, the information contained in some features is already captured in other features in the same dataset. As a result, features end up being highly correlated. 

We need to understand that the dimensionality we are discussing refers to the number of features in the dataset and not the instances(rows).

Although more information is good, when the data contain duplicated or highly detailed information, the training speed of our machine learning model is slowed down. Additionally, high processing power is needed to accomplish the training process. 

Another problem associated with high dimensional datasets is that the model trained on them ends up overfitting and, therefore, lousy generalization of the data. From this discussion, it is evident that high-dimensional datasets are likely to yield a poor-performing model. Thus we need to take care of this problem.

To overcome the problem of the Curse of Dimensionality, we reduce the number of features of the original dataset. This process is done such that the new dimensional space obtained is lower than the initial dimensional space. The benefits associated with this new dimensional space are:

- Less computational power is needed compared to the original dimensional space
- Easy to perform data visualization
- No irrelevant information is contained in the data

In this article, we shall look at the problem of feature reduction with feature selection techniques known as Recursive Feature Elimination.

### Prerequisite
For maximum benefit from this material, you need to be familiar with the following:
- Python programming knowledge.
- This [dataset](https://github.com/Madrinmarison/datasets/blob/main/Data.csv).

### Introduction to Recursive Feature Elimination
Recursive Feature Elimination(RFE) is the Wrapper method, i.e., it can ta. This algorithm fits a model and determines how significant features explain the variation in the dataset. Once the feature importance has been determined, it then removes those less important features one at a time in each iteration. 

These features are repeatedly eliminated until a certain threshold(optimal number of features needed) is met. First, let us understand how this algorithm works in [sklearn](https://scikit-learn.org/stable/).

At a high level, the RFE algorithm takes two parameters.
1. `Estimator`: The RFC wraps any model adapted to fit the data and compute features significance in the dataset through this parameter. How features significance is computed depends on the model passed to the RFC class. For instance, if the model we give is a decision tree, the features' importance will be obtained by ranking all the features from the most important to the least important. 

On the other hand, if we fit a linear regression model, the feature importance will be computed in terms of coefficients. In this case, the most significant coefficient is associated with the most critical feature in the dataset, and the smallest feature is associated with the least important one. Primarily, tree-based models such, Decision trees, random forests, etc., are used to determine feature importance.

 From this section, we need to understand that the model taken to compute features' importance need not necessarily match the model the dataset is intended to be used with.

2. `n_features_to_select`: The number of features we want to keep is specified in this parameter. The challenge we have with the RFE class is that the optimal number of features to keep bare is not always known in advance. 

However, we run cross-validation on the top of the RFE class, which automatically determines the optimal number of features to keep. With sklearn, we do not need to do this separately. 

Instead, the sklearn provides us with the `RFECV` class, which implements the RFE together with the cross-validation and automatically selects the optimal number of features for us. With this said, we can now proceed and implement this algorithm in Python.


### Implementing RFE algorithm in Python
#### Data Preparation
To start with, we will import the following libraries.

```Python
# for numeric handling
import numpy as np
# to handle dataframes
import pandas as pd 
# for plotting
import matplotlib.pyplot as plt
```

The dataset we will use in this implementation can be downloaded from the link provided in the prerequisite section.

#### Read the dataset

```python
data = pd.read_csv("Data.csv")
# cheack for data shape
data.shape
```

Our data was successfully imported. This data has 1470 instances, 34 features, and a study variable. It contains information about employees of a particular company. Therefore, it will determine whether an employee will leave the organization or remain. Using the `head` function, let us look at the first five observations of this dataset.

```Python
# check for the first five observations of the dataset
data.head()
```
![Output](/engineering-education/recursive-feature-elimination/data-head.png)


The `Attrition` column is our study variable from the data subset above. This column has two possible values, `Yes` and `No`. The `Yes` value means an employee will leave the company soon, and `No` means an employee will not leave the company soon. This data is thus intended to build a model that will predict which employee will leave the company and who will stay.

However, since this dataset has many features; also known as explanatory variables; building a model with these features can be very expensive. The model built on this dataset can be highly complex for the intended purpose. Furthermore, in the attempt to capture all the features, the model may be overfitting.

To ensure this problem does not occur, we need to analyze our features space and select a subset of features that explain at least 95% of the variance in the dataset. We will use the Recursive Feature Elimination technique to achieve this objective. However, the Recursive Feature Elimination is computationally expensive, and therefore, we need to preprocess our data as much as possible.

Let us continue with data preprocessing activity before implementing the RFE model to obtain our optimal features subset.

Some features do not explain the study variable from the dataset head above. Thus, we need to drop them from our dataset. These columns include:
- Number of records in the dataset
- The EmployeeCount
- The employee number
- Over18
- StandardHours

To drop them from our dataset, let us run the code below.

```python
# Removing insgnificant features from the dataset
data = data.drop(["EmployeeCount","EmployeeNumber",
                   "Over18", "StandardHours"], axis=1)
# checking the current number of features
data.shape[1]

```

Output:

```bash
31
```

Unlike the original dimensionality, our data now has 31 columns (35 previously). So now, let us check if there are missing values in the data.

```python
# Check for missing values in our dataset and impute them if any
data.isnull().sum().sum()
```

Output:

```bash
0
```

The implication of the output above is that there are no missing values in the dataset.

Since we fit numerical data to a machine learning model, we need to check for any non-numeric data in the dataset and convert it into numeric, if any.

```python
# check for non-numeric data types
data.select_dtypes("object").head(5)
```

![Object data](/engineering-education/recursive-feature-elimination/object-data-types.png)

The above output reveals 8 out of our 31 columns to contain non-numeric data types. We have the Attrition column, our study variable, out of these eight columns. 

As we will not be fitting the study variable to our future estimator model, at the moment, we will not encode it. With this said, let us encode the remaining seven columns into numeric data type with the help of the `label encoder` class.

```python
# Encoding object data type
from sklearn.preprocessing import LabelEncoder
LbEn = LabelEncoder()
data["BusinessTravel"] = LbEn.fit_transform(data["BusinessTravel"])
data["Department"] = LbEn.fit_transform(data["Department"])
data["EducationField"] = LbEn.fit_transform(data["EducationField"])
data["Gender"] = LbEn.fit_transform(data["Gender"])
data["JobRole"] = LbEn.fit_transform(data["JobRole"])
data["MaritalStatus"] = LbEn.fit_transform(data["MaritalStatus"])
data["OverTime"] = LbEn.fit_transform(data["OverTime"])

# Checking for any remaining object data
data.select_dtypes("object").columns
```

Output:

```bash
Index(['Attrition'], dtype='object')
```

We have successfully encoded our data, and we can now split it into a set of features and study variables separately.

```python
X = data.drop(["Attrition"], axis=1)
Y = data["Attrition"]
```

We need to check if our dataset is balanced or not. If it is balanced, we shall continue with our activities, if not, then we will balance it. So let us run the code below and check this.

```python
data["Attrition"].value_counts()
```
Output:
```bash
No     1233
Yes     237
Name: Attrition, dtype: int64
```

Our data has 1233 observations for No and 237 for Yes from this output. From this output, it is clear that our data is highly imbalanced. Therefore, we need to balance it. To do so, we use a `smoteen` sampling technique:

```python
from imblearn.combine import SMOTEENN
smtn = SMOTEENN(random_state = 0)
# Training the model
smtn.fit(X,Y)
# Making samples
X, Y = smtn.fit_resample(X,Y)
Y.value_counts()
```
Once the code above is executed, it will return:

```bash
Yes    814
No     774
Name: Attrition, dtype: int64
```

The difference between the Yes and No classes is minimal from the output above. Therefore, our data is balanced. Now, we can split our data into the training and testing sets.

```python
from sklearn.model_selection import train_test_split
XTrain, XTest, YTrain, YTest = train_test_split(X,Y, test_size=0.2, random_state=0)
```

Our data is now ready to implement the RFE algorithm.

### Implementing RFE algorithm
Our estimator will be a decision tree, and therefore we shall fit our data into a decision tree.

```python
from sklearn.feature_selection import RFECV
from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier()
rfecv = RFECV(estimator= model, step = 1, cv = 5, scoring="accuracy")
rfecv = rfecv.fit(XTrain, YTrain)

print("The optimal number of features:", rfecv.n_features_)
print("Best features:", XTrain.columns[rfecv.support_])
```

Executing the code above, we obtain:

```bash
The optimal number of features: 3
Best features: Index(['JobLevel', 'MonthlyIncome', 'MonthlyRate'], dtype='object')
/usr/local/lib/python3.7/dist-packages/sklearn/base.py:446: UserWarning: X does not have valid feature names, but RFECV was fitted with feature names
  "X does not have valid feature names, but"
```

The output above shows that the optimal number of features is three. So, out of 35 features of the original dataset, the information they carry is captured in three features. These features are returned in the output above, i.e., the JobLevel, monthly income, and monthly rate. 

If we train our predictive model on these features, the time and processing power required in the training process is much less than if we were to train the model on all 35 features of the original dataset. As a result, the model's chances of suffering from overfitting are reduced by a higher chance.

### Summary
This article explained how to implement the Recursive Feature Elimination algorithm in Python. Before implementing this model, we discussed why it is essential to reduce dataset dimensionality, and later we looked at features selection with the Recursive Feature Elimination algorithm. I hope this article helped you get to understand the RFE algorithm.

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
