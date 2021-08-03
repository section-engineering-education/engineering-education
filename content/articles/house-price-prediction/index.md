---
layout: engineering-education
status: publish
published: true
url: /house-price-prediction/
title: House Price Prediction using Machine Learning
description: In this tutorial we will be going over how to implement an entire machine learning pipeline and we will understand how we implement machine learning algorithms.
author: lalithnarayan-c
date: 2020-11-23T00:00:00-14:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/house-price-prediction/hero.jpg
    alt: house price prediction example image
---
Welcome to a tutorial on predicting house prices using the [Random Forest Regression](https://en.wikipedia.org/wiki/Random_forest) algorithm. We will cover the data pipeline creation.
<!--more-->
This pipeline creation process involves loading the dataset, cleaning and pre-processing the dataset, fitting a model to the dataset, and testing the model’s performance using various evaluation metrics.
### Prerequisites
There are a few theoretical and programming pre-requisites required for this article. They are helpful but not required to understand the article.

1. [Introduction to Pandas](/data-analytics-using-pandas/)
2. [Introduction to Supervised Learning Algorithms using Scikit-Learn](/supervised-learning-algorithms/)

### Installation
We'll install the packages required for this tutorial in a virtual environment. You may bypass the process of creating the virtual environment. We will use `conda` to create a virtual environment. For more installation information, refer to the [Anaconda Package Manager website](https://www.anaconda.com/products/individual).

Create a new virtual environment by typing the command in the terminal. Perform this after installing anaconda package manager using the instructions mentioned on Anaconda's website.

```bash
conda create -n house-price python=3.6
```

This will create a virtual environment with Python 3.6. We'll be installing the following packages:
1. *[numpy](https://www.google.com/search?q=numpy&oq=numpy&aqs=chrome..69i57.1503j0j1&sourceid=chrome&ie=UTF-8)*
2. *[scikit-learn](https://scikit-learn.org/)*
3. *[pandas](https://pandas.pydata.org/)*

Activate the virtual environment using the command, `conda activate house-price.` After activating the virtual environment, we'll be installing these packages locally in the virtual environment.

To use these packages, we must always activate the virtual environment named `house-price` before proceeding. You may also use the name of your choice for the virtual environment. Just replace `house-price` with the name of your choice.

To install the packages, we'll use the following commands:
1. **scikit-learn**: pip install scikit-learn
2. **numpy**: pip3 install numpy
3. **pandas**: pip3 install pandas

### Introduction
The problem falls under the category of supervised learning algorithms. The dataset we'll be using is the [Boston Housing](https://www.kaggle.com/c/boston-housing) Dataset. The dataset comprises 13 input features and one target feature. The input features include features that may or may not impact the price.

#### Dataset
The Boston data frame has 506 rows and 14 columns. Each row comprises one data-point and contains details about a plot. Various features affect the pricing of a house.

The Boston housing dataset has 14 features, out of which we'll use 13 to train the model. The 14th feature is the price, which we'll use as our target variable.

The table gives the list of features included in the dataset, along with their respective descriptions.

Features | Description
--- | ---
**crim** | *per capita crime rate by town*
**zn** | *proportion of residential land zoned for lots over 25,000 sq.ft.*
**indus** | *proportion of non-retail business acres per town.*
**chas** | *Charles River dummy variable (= 1 if tract bounds river; 0 otherwise).*
**nox** | *nitrogen oxides concentration (parts per 10 million).*
**rm** | *average number of rooms per dwelling.*
**age** | *proportion of owner-occupied units built prior to 1940*
**dis** | *weighted mean of distances to five Boston employment centers.*
**tax** | *full-value property-tax rate per \$10,000.*
**ptratio** | *pupil-teacher ratio by town.*
**black** | *1000(Bk - 0.63)^2 where Bk is the proportion of blacks by town.*
**lstat** | *lower status of the population (percent).*
**medv** | *median value of owner-occupied homes in \$1000s.*

### Approach taken
We’ll use the Random Forest regression algorithm to predict the price of the houses. In this article, we’ll consider machine learning algorithms as a black box that fits the data.

This article focuses more on the machine learning pipeline. For more information on the Random Forest algorithm, I suggest looking into this [video](https://www.youtube.com/watch?v=nxFG5xdpDto).

We’ll begin by loading the data. Since we're using an inbuilt dataset, we’ll be calling the `load_boston` function from the `sklearn.datasets` module. We load the data into the `data` variable.

Once the data is loaded, we separate the data and target attributes of the `data` variable. We store them in variables `data` and `target`, respectively.

Once we have the data and target values in 2 different variables, we can divide the data into two parts: the testing data and training data.

The theory behind dividing the dataset into two parts is to ensure the model doesn’t overfit the training data. Otherwise, the model will perform well on the training data and perform poorly on the test data.

This means that the model has learned the training data so well that it cannot generalize new data points. This should be avoided.

Once we have the dataset split into training and testing sets, we can pre-process the data. Pre-processing involves scaling the values and converting the categorical values into numerical values.

For example, there is a variable in the given dataset that indicates whether the Charles river is close to the house or not. This variable takes the values `Near` and `Far.`

We need to convert this into a numerical value. To do this, we can use the `LabelEncoder` function available in the pre-processing module of sklearn. This will replace the column with numerical values of 0 and 1, respectively. 0 indicates `Near,` and 1 indicates `Far.`

Once we perform the pre-processing of the dataset, we can fit the data to the model. We begin with instantiating an object of the `RandomForestRegressor` class. This is available in the `sklearn.ensemble` module. We use the `fit` method to fit the data to the model.

Once the model is fit, we evaluate the model’s performance on the test set we got earlier. We use the `predict` method present in the `RandomForestRegressor` class.

The `predict` method takes in the test input data and predicts an output. Using the predicted output and the actual output known from the dataset, we compute the test accuracy.

Another useful evaluation metric is the `Mean Squared Error`. The Means Squared Error (MSE) loss estimates how far the prediction is from the mean of the output. Computing the MSE gives us an idea about the performance of the algorithm.

### Code
We’ll use the dataset stored in a CSV file for a detailed view and easier access. Download the CSV file from this [link](https://drive.google.com/file/d/1clV931HTopTlD7ZWLotFSbsr9SAX50S8/view?usp=sharing). Save the CSV file in the same directory as the python file.

```py
# load the libraries
import sklearn
from sklearn.metrics import mean_squared_error as MSE
from sklearn.pre-processing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import load_boston

import pandas as pd
import numpy as np
# load the data from load_boston function
data = load_boston()
# store the list of features in the dataset using feature_names
array = data.feature_names
array = np.append(array,['MEDV'])
# separate the data and target values in the dataset
data, target = data.data, data.target
# split the data into training and test set to avoid overfitting
Xtrain, Xtest, Ytrain, Ytest = train_test_split(data,target,test_size=0.3)

print(Xtrain.shape,Ytrain.shape)

TARGET_PRICE = 'MEDV'

# instantiate the LabelEncoder
le = LabelEncoder()
# the data is stored in a csv file for your reference
df = pd.read_csv('./boston.csv')

y = df[TARGET_PRICE]
# drop the target price column, as this is the training_data
df = df.drop([TARGET_PRICE], axis=1)
# tranform the categorical values into numerical values
df['CHAS'] = le.fit_transform(df['CHAS'])

x = df
# instantiate the RandomForestRegressor with all the processors available
dt = RandomForestRegressor(criterion='mae',n_jobs=-1, n_estimators=10,max_depth=6, min_samples_leaf=1, random_state=3)
# fit the random forest to training data
dt.fit(Xtrain,Ytrain)

# predict the output for test data
y_predicted = dt.predict(Xtest)
# find the accuracy of predcition using training data
accuracy = dt.score(Xtest,Ytest)
# compute the Mean Square error using MSE function from sklearn.metrics module.
MSE_score = MSE(Ytest,y_predicted)

# print the final results
print("Training Accuracy:",dt.score(Xtrain,Ytrain))
print("Testing Accuracy:",accuracy)
print("Mean Squared Error",MSE_score.mean())
```

The code output should look like this:
```bash
['CRIM' 'ZN' 'INDUS' 'CHAS' 'NOX' 'RM' 'AGE' 'DIS' 'RAD' 'TAX' 'PTRATIO'
 'B' 'LSTAT']
(354, 13) (354,)
Training Accuracy: 0.9365453347551779
Testing Accuracy: 0.799293144193572
Mean Squared Error 18.157684374999995
```

We get an accuracy of about 79.9%, and the MSE loss is around 18.15.

### Conclusion
We have gone through how to implement the entire machine learning pipeline, and we have an intuitive understanding of machine learning algorithms. The larger the dataset gets, the more complex each of the mentioned steps gets. Therefore, using this as a base will help while you build your knowledge of machine learning pipelines.

Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
