---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-machine-learning-app-using-turicreate/
title: How to Create a Machine Learning App using Turi Create
description: In this article, we will discuss the library developed by Apple to create core machine learning supervised and unsupervised machine learning models. 
author: willyngashu
date: 2021-08-11T00:00:00-05:27
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/how-to-create-a-machine-learning-app-using-turicreate/hero.jpg
   alt: How to create machine learning app using Turing Create example image
---

Turi Create is an open-source python library developed by Apple, used to create core machine learning models for supervised and unsupervised learning. The models are used for classification, object detection, style transfers, regression, and recommender system by simplifying the development of custom machine learning models.

Turi Create is easy-to-use since it focuses on tasks instead of algorithms and has ready-to-deploy tools. This is why it is used as an alternative for [scikit-learn](https://scikit-learn.org/) in building machine learning models.

In this tutorial, we will get started with Turi Create to show us how to read CSV files, create data frames using SFrames, data manipulation, and finally create a machine learning model using this package.
We will build a machine model following various steps from data manipulation, training, and testing our model. Finally, we will use our model to make predictions.

### Table of contents

- [Prerequisites](#prerequisites)
- [Get started with Turi Create](#get-started-with-turi-create)
- [Data Manipulation](#data-manipulation)
- [Building Machine Learning Model](#building-machine-learning-model)
- [Model Evaluation](#model-evaluation)
- [Making Predictions](#making-predictions)
- [Save Model](#save-model)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

- A good understanding of Python.

### Get started with Turi Create

Turi Create has built algorithms for classification, regression, and clustering.
The supported algorithms are as follows:

#### Classification algorithms

1. Logistic regression.
2. Nearest neighbor classifier.
3. Support vector machines (SVM).
4. Boosted Decision Trees.
5. Random Forests.
6. Decision Tree.

#### Regression algorithms

1. Linear regression.
2. Boosted Decision Trees.

#### Clustering algorithms

1. K-Means Clustering.
2. Density-Based Spatial Clustering of Applications with Noise (DBSCAN).

To get started, we need to install Turi Create into our machine using the following command:

```python
pip install turicreate
```

### Data manipulation

In this tutorial, we will build a machine learning model used for diabetes risk prediction.
The dataset to be used will be from the [UCI Machine learning Repository](https://archive.ics.uci.edu/ml/datasets/Early+stage+diabetes+risk+prediction+dataset.).

The dataset contains the signs and symptoms of a newly diabetic person. This will help in training and building our model. In the end, we will use this model to make predictions.

An overview of our data is as shown:
![Dataset Overview](/engineering-education/how-to-create-a-machine-learning-app-using-turicreate/data.png)

#### Initializing dataset URL

```python
dataset_url = "https://archive.ics.uci.edu/ml/machine-learning-databases/00529/diabetes_data_upload.csv"
```

#### Loading Turi Create package

We need to import Turi Create into our machine so that we can be able to use it.

```python
import turicreate as tc
```

#### Loading dataset using SFrame

SFrame is a scalable data frame that is used to read the diabetes data CSV file.

```python
df = tc.SFrame(dataset_url)
```

**Output**:

```bash
Downloading https://archive.ics.uci.edu/ml/machine-learning-databases/00529/diabetes_data_upload.csv to /var/tmp/turicreate-root/59/2862b7a9-30ed-4b77-b817-7535c7012ac0.csv
Finished parsing file https://archive.ics.uci.edu/ml/machine-learning-databases/00529/diabetes_data_upload.csv
Parsing completed. Parsed 100 lines in 0.031653 secs.
------------------------------------------------------
Types from first 200 line(s)
column_type_hints=[int,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str]
If parse fail then correct
the  type list pass it to read the csv in
the column_type_hints argument
------------------------------------------------------
Finished parsing file https://archive.ics.uci.edu/ml/machine-learning-databases/00529/diabetes_data_upload.csv
Parsing completed. Parsed 520 lines in 0.014424 secs.
```

#### Nature of dataset

Please run the following command to show us how our data is structured.

```python
df.head()
```

#### Checking the datatype

This will return the data type of every column in the dataset.

```python
df.dtype()
```

**Output**:

```bash
[int,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str,
 str]
```

The first column of our dataset is an integer, and the remaining columns are strings, as shown in our output.

#### Plot the Class distribution

We will use this to give us a greater insight into the nature of our classes in the form of a plotted graph:

```python
df['class'].show()
```

#### Getting targets and features

We first need to get all of our columns to pick what we use as our features and targets.

```python
df.column_names()
```

**Output**:

```bash
['Age',
 'Gender',
 'Polyuria',
 'Polydipsia',
 'sudden weight loss',
 'weakness',
 'Polyphagia',
 'Genital thrush',
 'visual blurring',
 'Itching',
 'Irritability',
 'delayed healing',
 'partial paresis',
 'muscle stiffness',
 'Alopecia',
 'Obesity',
 'class']
```

The column titled `class` is our target variable.

### Getting features

Features are independent variables that will act as user inputs. The user will be able to feed these inputs into the system for the system to make predictions.
All the `feature_names` shown below are what the model will use to make predictions, and a user must input them.

```python
feature_names = ['Age',
 'Gender',
 'Polyuria',
 'Polydipsia',
 'sudden weight loss',
 'weakness',
 'Polyphagia',
 'Genital thrush',
 'visual blurring',
 'Itching',
 'Irritability',
 'delayed healing',
 'partial paresis',
 'muscle stiffness',
 'Alopecia',
 'Obesity']
```

### Building machine learning model

In this phase, we will start building our model using the given dataset above.
Before we begin, we need to split our dataset into a training set and a testing set. The training set will be 75%, and the testing set will be 25%.

#### Dataset splitting

```python
train_data,test_data = df.random_split(0.75)
```

#### Shape of the original data

```python
df.shape()
```

**Output**:

```bash
(520, 17)
```

#### Shape of our training set

```python
train_data.shape
```

**Output**:

```bash
(390, 17)
```

After splitting our data into a training and a testing set, we can begin building our model.

### Modelling algorithm

TuriCreate supports different classification algorithms, in our case, we will use the [Logistic regression](https://en.wikipedia.org/wiki/Logistic_regression).
We use logistic regression since our model has a binary output. Thus, our output can be either positive or negative to show if a person is at risk of getting diabetes or not.

Logistic regression is better suited for our problem since this algorithm gives higher accuracy and is less inclined to over-fitting.

- To use the logistic regression algorithm use the following command:

```python
logistic_model = tc.logistic_classifier.create(train_data,target='class',features=feature_names)
```

**Output**:

```bash
PROGRESS: Creating validation set data from 75% of train_data.


Logistic regression:
--------------------------------------------------------
Number of examples: 350
Number of classes: 2
Number of feature columns: 16
Number of unpacked features: 16
Number of coefficients: 17
Starting Newton Method
--------------------------------------------------------
+-----------+----------+--------------+-------------------+---------------------+
| Iteration | Passes   | Elapsed Time | Training Accuracy | Validation Accuracy |
+-----------+----------+--------------+-------------------+---------------------+
| 1         | 2        | 0.014390    | 0.927183         | 0.897374            |
| 2         | 3        | 0.016456    | 0.931734         | 0.843725            |
| 3         | 4        | 0.018732    | 0.949024         | 0.843725            |
| 4         | 5        | 0.020935    | 0.957320         | 0.843725            |
| 5         | 6        | 0.023619    | 0.960135         | 0.843725            |
| 7         | 8        | 0.026907    | 0.969716         | 0.843725            |
+-----------+----------+--------------+-------------------+---------------------+
SUCCESS: Optimal solution found.
```

TuriCreate iterates through the dataset several times to get the 'Training Accuracy' and 'Validation Accuracy' after each iteration. Here we iterate seven times, and the Training accuracy and Validation accuracy after seven iterations will be 0.969716 and 0.843725, respectively.

### Getting the model summary

After training our model, we can now check the model summary. The model summary shows us all the available classes and feature classes.
The model summary gives us a deeper understanding of our model, enabling us to gauge if our model will work well when making predictions.

```python
logistic_model.summary()
```

**Output**:

```bash
Class                          : LogisticClassifier

Schema
------
Number of coefficients: 17
Number of examples: 350
Number of classes: 2
Number of feature columns: 16
Number of unpacked features: 16

Hyperparameters
---------------
L1 penalty                     : 0.0
L2 penalty                     : 0.01

Training Summary
----------------
Solver: newton
Solver iterations: 7
Solver status                  : SUCCESS: Optimal solution found.
Training time (sec)            : 0.0333

Settings
--------
Log-likelihood: 42.9568

Highest Positive Coefficients
-----------------------------
Gender[Female]                 : 5.1663
Irritability[Yes]              : 3.5232
Itching[No]                    : 3.4068
Polyuria[Yes]                  : 3.2939
Genital thrush[Yes]            : 2.4532

Lowest Negative Coefficients
----------------------------
Polydipsia[No]                 : -6.5078
Alopecia[No]                   : -0.8826
weakness[No]                   : -0.283
Age                            : -0.0729
```

### Model evaluation

This is assessing our model to find out how well it learned. We do this by using the `test_data`.

```python
metrics = logistic_model.evaluate(test_data)
```

- Use the command below to get the model accuracy.

```python
metrics
```

```python
metrics['accuracy']
```

### Making predictions

#### Rule of making a prediction

To make predictions, you must submit an SFrame as input.
SFrame means scalable data frame. It's column-mutable dataframe object can scale to big data, and columns can be added and subtracted with ease.

It also enables our model to read the user's input easily. The following data formats are supported when constructing an SFrame:

1. CSV file - comma-separated value.
2. SFrame directory archive - A directory where an SFrame was saved previously.
3. General text file.
4. A Python dictionary.
5. Pandas DataFrame.
6. JSON.

#### Sample SFrame

Run the following command to create a sample SFrame.

```python
sf = {'Age': 41,
 'Alopecia': 'Yes',
 'Gender': 'Male',
 'Genital thrush': 'No',
 'Irritability': 'No',
 'Itching': 'Yes',
 'Obesity': 'No',
 'Polydipsia': 'No',
 'Polyphagia': 'Yes',
 'Polyuria': 'Yes',
 'class': 'Positive',
 'delayed healing': 'Yes',
 'muscle stiffness': 'Yes',
 'partial paresis': 'No',
 'sudden weight loss': 'No',
 'visual blurring': 'No',
 'weakness': 'Yes'}
```

#### Read from the created SFrame

```python
prediction1 = tc.SFrame({'data':[sf.values()]})
```

#### Make prediction

The following command will be used to make a prediction using the above SFrame as input:

```python
logistic_model.predict(prediction1)
```
The output will be either positive or negative to show if a person may be at risk or not.

- Get the prediction probability.

```python
logistic_model.classify(prediction1)
```

### Save model

Use the following command to save our model.

```python
logistic_model.save('diabetes_prediction.model')
```

### Conclusion

In this tutorial, we have learned how to create a machine learning model using Turi Create. We started by creating SFrames to load our dataset. We then did data manipulation for us to know the structure of the data we are working with.

Finally, after adequately understanding our data, we built a machine learning model to predict if a person is at risk of getting diabetes.

This tutorial is beneficial for someone who wants to learn TuriCreate to be able to create machine learning models more efficiently.

### References

- [Turi Create Documentation](https://apple.github.io/turicreate/docs/api/index.html)
- [Logistic Regression Algorithm](https://en.wikipedia.org/wiki/Logistic_regression)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
