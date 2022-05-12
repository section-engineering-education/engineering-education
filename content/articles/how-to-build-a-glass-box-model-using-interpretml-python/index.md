---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-glass-box-model-using-interpretml-python/
title: Building a Glass-box model using InterprateML
description: This article will provide a guide on how to use InterpretML to build glass box machine learning models.
author: charles-ndirutu
date: 2021-12-15T00:00:00-04:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/hero.jpg
    alt: Building a Glass-box model using InterprateML Image
---

Glass box models are models that are transparent to the user. In a glass box model, all the features and the model parameters are known to the user. They also know the criteria used by the model to reach its prediction results and conclusion. 
<!--more-->
This gives full transparency. One can know how the model works and functions behind the scenes. Glass box models are more robust and easily adaptable in a production environment.

Traditionally, many machine learning engineers have been building black-box models. However, in black-box models, the users do not know the internal workings of the model. As a result, users cannot understand these models and accept the model blindly.

Black-box models hide the actual risk of using these models. The glass box model is the better alternative that gives you full exposure to the model.

This tutorial will build both a black-box model and a glass box model. First, we will build a glass box using InterpretMl. InterpretMl has methods and attributes that explain every decision made by a model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Advantages of glass box models](#advantages-of-glass-box-models)
- [Exploring-dataset](#exploring-dataset)
- [Black box model](#black-box-model)
- [Labels and features](#labels-and-features)
- [Split the dataset](#split-the-dataset)
- [Model accuracy score](#model-accuracy-score)
- [Glass box model](#glass-box-model)
- [Making a prediction](#making-a-prediction)
- [Interpreting the model results](#interpreting-the-model-results)
- [Global Explanation](#global-explanation)
- [Local Explanation](#local-explanation)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

To follow along with this tutorial, you need the following:
- Have [Python programming](/engineering-education/python-projects-for-beginners/) skills.
- Know how to [build machine learning models.](/engineering-education/house-price-prediction/)
- Know how to [work with the Sckit-learn library.](https://scikit-learn.org/stable/)
- Know how to run [Google Colab notebooks.](https://research.google.com/colaboratory/)

### Advantages of glass box models
Glass box models have the following advantages.
- Help data scientists and machine learning engineers understand the behavior of models.
- Glass box models can be easily debugged.
- Glass boxes are more accurate; The prediction results made by the model are accurate and can be trusted.
- They are simple to train and use.
- Reduces risk when adopted in a business.This is because business stakeholders clearly understand how the model works. This helps minimize the occurrence of risks.

### Install InterpretMl
To use InterpretMl, we need to install it. Let us install it using the following code.

```bash
! pip install interpret
```

Now that we have installed InterpretMl, let us start working with our dataset.

### Exploring dataset
We need to import the exploratory data analysis packages to work with our dataset. These packages are used for data analysis and manipulation.

```python
import pandas as pd
import numpy as np
```

We will use a dataset collected from different banks. The dataset contains various information about the bank customers. For example, it predicts if a bank customer will subscribe to a monthly bank payment or not.

A snip of the dataset is shown below.

![Dataset snip](/engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/dataset-snip.png)

To get the full dataset used in this tutorial, click [here](https://drive.google.com/file/d/1bJn59P8fJCWR059zD98yT7JU1t35XZwR/view?usp=sharing) then use the snippet below to load the dataset.

```python
df = pd.read_csv("/content/bank-full.csv",sep=';')
```

The code snippet below enables us to see the structure of our dataset.

```python
df.head()
```

The structure is shown below.

![Dataset structure](/engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/dataset-structure.png)

We also need to format our dataset. The dataset should have the same data type for uniformity during model training. Add this code snippet to show the types.

```python
df.dtypes
```

The output is shown below.

![Dataset datatypes](/engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/dataset-datatypes.png)

From the image above, the dataset is not uniform. For example, we have `int64` and `object`, we need to convert all the datatypes into `int64`. `int64` are easily readable by the model because they are numbers. `object` are categories or groups.

The process of converting `object` to `int64` is known as categorical encoding. For a detailed explanation on categorical encoding, click [here](https://analyticsindiamag.com/a-complete-guide-to-categorical-data-encoding/)

To convert our data type run this code.

```python
df1 = pd.DataFrame({col: df[col].astype('category').cat.codes for col in df}, index=df.index)
```

In the code above `cat.codes` assigns numeric numbers to the categories or groups in our dataset. To see the results run this code.

```python
df1.head()
```

The output is shown below.

![Categorical encoding](/engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/categorical-encoding.png)

From the image above, we can see that our dataset is converted into numeric values. Now that our dataset is appropriately formatted, we can start model building.

### Black box model
We will begin by building a black-box model. But, first, let us import the machine learning packages.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split,cross_val_score
```

Let us see what we have imported.

**LogisticRegression**: this is the algorithm used to train our black box classification model.

**train_test_split**: it will split the dataset into a train set and a test set.

**cross_val_score**: will be used to calculate the accuracy score of the machine learning model.

### Labels and features
Features are the `X variable` in our dataset. This represents all the input columns that will be used during model training.

```python
Xfeatures = df1[['age', 'job', 'marital', 'education', 'default', 'balance', 'housing','loan', 'contact', 'day', 'month', 'duration', 'campaign', 'pdays', 'previous', 'poutcome']]
```

Labels are the `y variable` in our dataset. This represents the output column during the prediction phase.

```python
ylabels = df1['y']
```

### Split the dataset

To split the dataset, run this command.

```python
x_train,x_test,y_train,y_test = train_test_split(Xfeatures,ylabels,test_size=0.3,random_state=7)
```

The dataset will be split using `test_size=0.3`. `70%` of the dataset will be used for training and `30%` for testing.

We will build the model using the `LogisticRegression` algorithm.

```python
lr_model = LogisticRegression()
lr_model.fit(x_train,y_train)
```

We initialize the algorithm as `LogisticRegression()`. We then fit the model into our dataset. The `fit` method enables the model to learn from the `x_train` and `y_train`. The model can gain enough knowledge to make predictions.

### Model accuracy score
We calculate the accuracy score using the following code.

```python
lr_model.score(x_test,y_test)
```

The results are shown below.

```bash
0.8905927455028015
```

The accuracy score is `89.05927455028015%`. 

This is a black-box model, and it does not explain to the user how it reached that accuracy score. In addition, it does not show the contributing features to this accuracy score. 

We need a glass box model to help solve this problem for these reasons.

### Glass box model
As mentioned earlier, we will use InterpretMl to build a glass box model. Use the following code snippet to import the  InterpretMl.

```python
import interpret
```

We will use the `ExplainableBoostingClassifier` algorithm to build the glass box model. This algorithm is an in-built InterpretMl algorithm that builds a transparent model.

`ExplainableBoostingClassifier`  has a combination of techniques and algorithms. This builds a highly efficient model and accurate model. It also improves the model performance significantly.

Use the snippet below to  import `ExplainableBoostingClassifier.`

```python
from interpret.glassbox import ExplainableBoostingClassifier
```

We can now initialize the algorithm and fit it into our training set.

```python
ebm = ExplainableBoostingClassifier()
ebm.fit(x_train,y_train)
```

As shown below, this process will train and build our glass box model.

![Glass box model](/engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/glass-box-model.png)

We can now calculate the accuracy score of our model.

```python
ebm.score(x_test,y_test)
```

The accuracy score is shown below.

```bash
0.9081391919787674
```

The accuracy score is `90.81391919787674%`. The accuracy is higher compared to the black box model accuracy score.

### Making a prediction
We will use the following data sample to predict using the model.

```python
ex1 = x_test.iloc[8]
```

This code will select the `9th` row in our testing set.

```python
print(ebm.predict([ex1]))
print(ebm.predict_proba([ex1]))
```

The `ebm.predict` method will print the prediction results while the `ebm.predict_proba` will print the prediction probability below.

```bash
[0]
[[0.93202639 0.06797361]]
```

The prediction is `0`, showing that the customer will not subscribe to the monthly bank payment. The prediction probability is `0.93202639`, a very high probability of occurrence.

Since this is a glass box model, we can use InterpretMl to explain why the model made this prediction. It also shows us what features contribute to the accuracy score.

### Interpreting the model results
We can now explore the methods and attributes used for interpretation.

```python
dir(interpret)
```

This will show us all the methods and attributes as shown below.

![InterperMl Methods and attributes](/engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/methods-and-attributes.png)

From the image above, InterpretMl has different methods and attributes. The one we are most interested in is the `show` method. This method will give us a clear view of all the contributing factors to any decision made by our model.

Let us import the `show` method.

```python
from interpret import show
```

We have two techniques for explaining the model results: global explanation and local explanation. Global explanation explains the overall structure and behavior of any model. Local explanation explains the individual prediction or classification made by the model. It is more specific than a global explanation.

### Global explanation
To perform a global explanation, run this code.

```python
ebm_global = ebm.explain_global()
```

The `explain_global()` method is used to explain the model. To see the explanation in a user interface, run this code.

```python
show(ebm_global)
```

The `show` method will display a user interface as shown below.

![Global explantion UI](/engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/global-explanation.png)

The image above gives a summary of the overall importance of each feature. The features are arranged according to their level of importance. The `duration` feature has the highest importance. It contributed significantly to the model's accuracy score and the prediction results, while the `education` features had the least contribution.

### Local explanation
To perform a local explanation, run this code.

```python
ebm_local = ebm.explain_local(x_test,y_test)
```

The `ebm.explain_local` method will explain the predictions. To display a user interface, run this code.

```python
show(ebm_local)
```
The interface is shown below.

![Local explantion UI](/engineering-education/how-to-build-a-glass-box-model-using-interpretml-python/local-explanation.png)

The features are grouped into features that contributed to the prediction result and those against the prediction results. Features for the prediction results are colored `orange`. On the other hand, those against the prediction are colored `blue`.  Using the UI, users can now know the role played by each feature. This leads to more transparent models that people can easily understand.

### Conclusion

In this tutorial, we have learned how to build a black-box model and a glass box model. We also discussed the advantages of the glass box model and why they are more preferred to the black box.

After building both models, we compared the results to see which was better. Finally, using InterpretMl, we explained our black-box model, which gives users a detailed understanding of the model works.

Glass box models are always the better alternative, and users can easily trust them. This reduced risks when using the model in production. To get this notebook , click [this link](https://colab.research.google.com/drive/1aOtEiZDZyJqbPO4pI0sBCdY-4OhA0tu_?usp=sharing)

### References
- [Google Colab notebook](https://colab.research.google.com/drive/1aOtEiZDZyJqbPO4pI0sBCdY-4OhA0tu_?usp=sharing)
- [Black box vs Glass box](https://bigcloud.global/the-difference-between-white-box-and-black-box-ai/)
- [Advantages of glass box models](https://towardsdatascience.com/think-outside-the-black-box-7e6c95bd2234)
- [Sckit-learn documentation](https://scikit-learn.org/stable/)
- [InterpretMl documentation](https://github.com/interpretml/interpret)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
