---
layout: engineering-education
status: publish
published: true
url: /model-interpretation-using-lime/
title: Model Interpretation using LIME
description: In this tutorial we will build a simple machine learning model then use LIME (Local Interpretable Model-Agnostic Explanations) to interpret our model.
author: willyngashu
date: 2021-11-10T00:00:00-12:27
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/model-interpretation-using-lime/hero.jpg
    alt: Model Interpretation using LIME Hero image
---
Model interpretation finds out why a model makes certain decisions during the prediction phase. This ensures we have a fair, accountable, and transparent model. 
<!--more-->
In model interpretation, we try to answer the question; why should we trust the model? Why did the model make this conclusion?. Using model interpretation, we may be able to explain what the model is doing and why it's making a prediction. 

This helps the involved stakeholders and end-users understand how the model works. This makes users have trust and confidence to use these models to solve mission-critical real-world problems. 

These problems are helpful in matters such as self-driving cars models and health system models. They have a great impact on society and business because they are matter of life or death.

In this tutorial, we will build a simple machine learning model, then use [LIME](https://christophm.github.io/interpretable-ml-book/lime.html) to interpret our model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Model interpretation methods and techniques](#model-interpretation-methods-and-techniques)
- [Creating features](#creating-features)
- [Creating labels](#creating-labels)
- [Model building](#model-building)
- [Model training using logistic regression](#model-training-using-logistic-regression)
- [Model testing](#model-testing)
- [Calculating the accuracy score](#calculating-the-accuracy-score)
- [Making a single prediction](#making-a-single-prediction)
- [Model interpretation with LIME](#model-interpretation-with-lime)
- [LIME explainer](#lime-explainer)
- [Applying the LIME explainer](#applying-the-lime-explainer)
- [Showing the explainer results](#showing-the-explainer-results)
- [Conclusion](#conclusion)
- [References](#References)

### Prerequisites
To follow through with this article, the reader should:
- Have [Python](https://www.python.org/) installed.
- Have an understanding of [Python programming.](/engineering-education/python-projects-for-beginners/)
- Be familiar with [machine learning modeling.](engineering-education/house-price-prediction/)
- Be familiar with [Google colab notebooks.](https://colab.research.google.com)

### Introduction
Model interpretation has made a great impact in today's machine learning builds. Through interpretation, we can build a more robust, accurate, and most trustworthy model. 

These are a few reasons why model interpretation is important among others.

#### Importance of model interpretation
- It detects errors and bugs in the model - Models are prone to errors and bugs. These may be due to human errors or deprecated software dependencies. Model interpretation debugs these errors and resolves them.
- It detects bias during model training - Bias occurs when we have unbalanced data. This is when we do not split our dataset correctly. Model interpretation ensures that our dataset is well balanced to avoid any bias.
- To know model reliability - A reliable model is one that can give consistent results. Through model interpretation, we will be able to know if we can trust a model's prediction results.
- To improve model performance and generalization - Model interpretation increases the model's accuracy score. This ensures that it has a higher chance of making correct predictions.
- To identify wrong classifications during prediction - Model interpretation analyzes the prediction results. It uses different techniques to identify the wrong and right predictions. This ensures that only the right predictions are accepted.

In model interpretation, we have different methods and techniques used. They depend on the type of algorithm used, the type of machine learning problem, and the complexity of these problems.

### Model interpretation methods and techniques
These model methods and techniques are as follows.

#### Model-specific method
This technique is specific to only certain models and may not be applied to other machine learning models. It checks on the specific features and attributes within a model. 

It also checks how they impact the general functionalities of the model.

#### Local or global scope method
The local scope is used in individual prediction and explains why a model made a single prediction. The global scope goes beyond individual prediction, it explains the general behavior of the model.

In this tutorial, we will build a simple classification model using the iris dataset. The model classifies the flower species based on user input. 

From there, we will use LIME to interpret this model. To download the dataset for this tutorial click [here](https://drive.google.com/file/d/1Sk-ajxQ30vUHMHRffypb3l6fYApkU244/view?usp=sharing).

Let us start building our model.

#### Importing exploratory data analysis packages
These packages are used for data analysis and manipulation. We use Pandas to load our dataset. Numpy conducts mathematical and scientific computations on our dataset.

```python
import pandas as pd
import numpy as np
```

Let us use Pandas to load our dataset.

```python
df = pd.read_csv("iris-dataset.csv")
```

Let us check the dataset structure.

```python
df.head()
```

The output is shown below:

![Dataset structure](/engineering-education/model-interpretation-using-lime/dataset-structure.jpg)

This shows that our model has the following columns: `sepal_width`, `petal_length`, `petal_width`, and `species`. These columns are used as inputs when making predictions.

### Creating features
Features are the key attributes in the dataset that are used as inputs during model training. Features are used by the model for pattern recognition during model training.

```python
X = df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
```

### Creating labels
Labels are the target variable that the model is trying to predict. In this case, our label is the `species` column, the model is trying to predict the species of a given flower.

```python
Y = df['species']
```

Let us makes the output unique, this ensures that we can reduce model bias.

```python
class_names = Y.unique()
```

### Model building
We will import all the packages needed to build our machine learning model as shown below.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
```

**In the code above we import the following:**

#### LogisticRegression
This is a [Scikit-learn](https://scikit-learn.org/stable/) algorithm. It is used to solve classification problems.

#### accuracy_score
This is used to calculate the accuracy score of our model during prediction making. The higher the accuracy score the better our model is at making predictions.

#### train_test_split
This method is used to split our dataset into two sets. The first set is used to train our model while the second set is used to test the model.

Let us now split our dataset.

```python
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.30, random_state=7)
```

In the code above we specify the splitting ratio as `0.30`. This implies that `70%` of the dataset will be used to train our model and `30%` to test the same model.

Now, let us see the training values. The training values are the length and width of the flowers. These sizes are specific to the flower species.

The flower species are `virginica`, `setosa` and `versicolor`. Their length and width are shown in the image below stored in an array.

![Flower sizes](/engineering-education/model-interpretation-using-lime/flower-sizes.jpg)

Let us check the available data points in our training set.

```python
X_train.shape
```

The output is as shown below:

```bash
(105, 4)
```

This shows that there is a total of `105` flower species and `4` columns in the training set.

Next, let us use logistic regression to build and train our model.

### Model training using logistic regression
We start by initializing the `LogisticRegression()` method. This algorithm is used when training our model.

```python
model_logreg = LogisticRegression()
```

After initializing our model, we will fit the model into the dataset. We fit our model using the training dataset. The model uses this dataset to recognize the pattern that enhances predictive analysis.

During the training phase, the model gains knowledge through learning and stores it. It eventually uses this stored knowledge to make predictions.

```python
model_logreg.fit(X_train, Y_train)
```

During the training phase, the model fine-tunes its parameters. It then outputs the model with the best parameters.

The fine-tuned model will be used to give the optimal solution, as shown in the image below.

![Model output](/engineering-education/model-interpretation-using-lime/flower-sizes.jpg)

Let us test our model using the testing dataset.

### Model testing
This ensures that we evaluate the model quality and performance. It also ensures we do not have a biased model.

```python
model_logreg.predict(X_test)
```

The model is used to predict the data points instances found in the testing set. The prediction output is shown below.

![Testing output](/engineering-education/model-interpretation-using-lime/testing-output.jpg)

To evaluate this prediction, we need to calculate the accuracy score of this model.

### Calculating the accuracy score
The accuracy score shows the number of correct predictions made by our model. We express it as a percentage.

The higher the accuracy score the better the model in making predictions. 

The accuracy score is calculated as follows:

```python
accuracy_score(Y_test,model_logreg.predict(X_test))
```

The output is as shown below.

```python
0.8888888888888888
```

When we convert the accuracy score into a percentage it becomes `88.89%`. This shows that our model has an `88.89%` chance of making accurate predictions.

### Making a single prediction
Making a single prediction involves using a single data point in the dataset to make a prediction. Let us use a single data point from the dataset.

```python
ex_specie = np.array(X_test.iloc[8]).reshape(1,-1)
```

We use the `X_test.iloc()` method to extract the 8th row in our data set. This 8th row is what our model will use to make a single prediction.

We then use the `reshape(1,-1)` function to ensure that we have one column with the prediction result. Let us now use this column to make a prediction.

```python
model_logreg.predict(ex_specie)
```

The prediction results are as shown below.

```python
array(['setosa'], dtype=object)
```

The prediction results are `setosa` which is true according to our test dataset.

According to our model, these are the prediction results, but should we trust these results blindly?. Or, should we try to understand how this model reached this conclusion?

That is why we need to use model interpretation techniques to verify these results and increase our trust in the model. This ensures that we know how the model works and it's level of reliability.

Let us start our model interpretation with LIME.

### Model interpretation with LIME
LIME stands for Local Interpretable Model-Agnostic Explanations, it covers a local scope. Local scope is used in individual prediction. It explains why the model made a single prediction and does this simply and understandably.

To use LIME, we first need to install it. 

We install LIME using the following command:

```python
!pip install lime
```

LIME has different methods used for interpretation. This depends on the type of data used as input. 

They include:
- Tabular data interpretation technique.
- Textual data interpretation technique.
- Image data interpretation technique.

In this tutorial, we will be using tabular data. Tabular data is a type of data organized in rows and columns.

Let us import LIME and tabular data interpretation technique.

```python
import lime
import lime.lime_tabular
```

Let us now create an explainer for the prediction made above. An explainer will explain why the model made that prediction.

In the example above the model predicted the 8th row as the `setosa` species.

The explainer instance is as follows.

### LIME explainer

```python
explainer = lime.lime_tabular.LimeTabularExplainer(X_train.values, feature_names=feature_names, class_names=class_names, discretize_continuous=True)
```

In the code above we have to specify which kind of LIME interpretation we are dealing with. In this case, we have specified it as `lime_tabular.LimeTabularExplainer`.

We also need to pass the `X_train.values`, `feature_names`, and `class_names` as parameters. This allows LIME to understand the patterns in the input dataset. By doing this, it can verify the prediction results.

### Applying the LIME explainer
Let us apply this explainer to the 8th row of the dataset.

```python
exp = explainer.explain_instance(X_test.iloc[8],model_logreg.predict_proba,num_features=4,top_labels=1)
```

In the code above we have specified the row we want LIME to interpret its prediction as `X_test.iloc[8]`. We also pass `model_logreg` which is the logistic regression model. 

LIME can then verify the prediction results using `predict_proba`. `predict_proba` will provide the prediction probability of that instance.

We finally specify the features and labels in our dataset as `num_features=4` and `top_labels=1`. Let us now see the results of this explainer.

#### Showing the explainer results
To see the explainer results, run this command.

```python
exp.show_in_notebook(show_table=True, show_all=False)
```

This enables us to see the results in our notebook as shown in the image below.

![Explainer results](/engineering-education/model-interpretation-using-lime/explainer-resultst.jpg)

From the image above we can see that LIME has given the prediction probability as follows:
- setosa with a probability of 0.88.
- versicolor with a probability of 0.12.
- virginica with a probability of 0.0.

This shows setosa with a higher probability of 0.88 which makes it the right prediction result. The middle of the image provides the rules that must be achieved so that the prediction is setosa. 

The rules are as follows:
- petal_length >= 1.50
- sepal_width > 3.30
- sepal_length <= 5.10

According to the right side of the image, all these rules are met. The right side of the image gives the dimensions of our input features.

Using this visual representation, we can see that our model made the right prediction. This shows we now can trust this model.

### Conclusion
In this tutorial, we have learned about model interpretation using LIME. We started with building our simple model, we then used this model to explain the concept of model interpretation.

We also followed all the stages of machine learning and came up with a model. The model was able to predict the type of flower species.

Finally, we used LIME to interpret and explain the model predictions. We were able to understand the model functionality. This enables the users to trust these models when using them.

To get the Google colab notebook for this tutorial, click [here](https://colab.research.google.com/drive/149GrO47OiHYDQfqlTB4NKMixWJXtp_-v?usp=sharing).

### References
- [Google Colab notebook for this tutorial](https://colab.research.google.com/drive/149GrO47OiHYDQfqlTB4NKMixWJXtp_-v?usp=sharing)
- [LIME documentation](https://christophm.github.io/interpretable-ml-book/lime.html)
- [Basic model interpretation tools](https://neptune.ai/blog/ml-model-interpretation-tools)
- [Introduction to model interpretation](https://gilberttanner.com/blog/introduction-to-machine-learning-model-interpretation)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)