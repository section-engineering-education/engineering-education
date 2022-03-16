---
layout: engineering-education
status: publish
published: true
url: /model-explanation-with-dalex/
title: Machine Learning Model Explanation with Dalex
description: This article aims to demenstrate how to perfom a Machine Learning Model explanation using Dalex.
author: calvin-ombati
date: 2022-03-16T00:00:00-03:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/model-explanation-with-dalex/hero.png
    alt: Machine Learning Model Explanation with Dalex Hero Image
---
Machine learning engineers build models but hide the implementation from the end-users. The end-users apply the model blindly without knowing the model implementation. They do not know the functions, methods, and algorithms that train the model.
<!--more-->
End-users need an open and transparent model to understand how it makes the predictions, the workings of the model, the functions, and the algorithms. Together, these help users understand the contributing factors to the model's decision.

[Dalex](https://dalex.drwhy.ai/) is an open-sources library that explains and analyzes machine learning models. It makes the model transparent and open to the end-users. It builds trust in individuals and companies when using the models in production.

Using Dalex, the end-users (individuals and companies) will gain insightful information from the model. Moreover, it interprets the model simply so that the end-user can understand. In this tutorial, we will build a bank marketing model. We will then use [Dalex](https://dalex.drwhy.ai/) to explain the model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Dataset preparation](#dataset-preparation)
- [Splitting the dataset](#splitting-the-dataset)
- [Building the model](#building-the-model)
- [Machine learning pipeline](#machine-learning-pipeline)
- [Combining the stages](#combining-the-stages)
- [Accuracy score](#accuracy-score)
- [Getting started with Dalex](#getting-started-with-dalex)
- [Implementing overall model explanation](#implementing-overall-model-explanation)
- [Variable contribution to the model performance](#variable-contribution-to-the-model-perfomance)
- [Implementing single prediction explanation](#implementing-single-prediction-explanation)
- [Variable contribution to the single prediction](#variable-contribution-to-the-single-prediction)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
It would be best if you had the following to follow along with this tutorial:
- [Python programming.](/engineering-education/python-projects-for-beginners/)
- [Machine learning algorithms.](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/)
- Be able to build a simple [machine learning model.](/engineering-education/house-price-prediction/)
- Download the dataset from [here.](https://drive.google.com/file/d/1nQ3Zwb1qUki1sFrSbptEjNnPSTDHrzro/view?usp=sharing)

To get the best out of this tutorial, implement the Python code in [Gooogle Colab notebook.](https://research.google.com/colaboratory/) to get the same results. Ensure you sign in using your email. 

Google Colab will enable you to easily build and run the model due to the fast CPU and GPU  ideal for machine learning.

### Dataset preparation
In this section, we will prepare the bank marketing dataset. The dataset will build a model that solves a classification problem. The model will predict if a customer will join a monthly saving plan or not. You can get the dataset from [here.](https://drive.google.com/file/d/1nQ3Zwb1qUki1sFrSbptEjNnPSTDHrzro/view?usp=sharing)

#### Exploring dataset
We need to explore the dataset to know all the dataset variables.

Let us first import Pandas to will load the dataset.

```python
import pandas as pd
```

Use this code to load the dataset:

```python
df = pd.read_csv("/content/bank_marketing_dataset.csv")
```
To see the Data Frame, run this code:

```python
df.head()
```
Data Frame output:

![Data Frame](/engineering-education/model-explanation-with-dalex/data-frame.png)

The output shows rows and columns in the dataset. To know all the columns in the dataset, use this code:

```python
df.columns
```
The columns output:

![Columns output](/engineering-education/model-explanation-with-dalex/columns.png)

From the output above, the dataset has 21 columns. 

Dalex will show us how each column contributed to the model's final results. Then, we will select the input variables and the target variable from the dataset.

#### Selecting the input and target variables
The input variables are all the columns that train the model. The model will learn from these variables to solve the classification problem. 

The target variable is the model's output. It is what the model wants to predict. For example, our model will determine if a customer will join a monthly saving plan or not.

```python
Xfeatures = df[['age', 'job', 'marital', 'education', 'default', 'housing', 'loan',
       'contact', 'month', 'day_of_week', 'duration', 'campaign', 'pdays',
       'previous', 'poutcome', 'emp.var.rate', 'cons.price.idx',
       'cons.conf.idx', 'euribor3m', 'nr.employed',]]
ylabels = df['y']
```

The first 20 columns are the input variables/features, and the last column is the target variable. 

### Splitting the dataset
We will split the bank marketing dataset into two sets.

```python
from sklearn.model_selection import train_test_split
```
To split the dataset into a train and test set, use this code:

```python
x_train,x_test,y_train,y_test = train_test_split(Xfeatures,ylabels,test_size=0.3,random_state=7)
```
We have prepared and split the dataset. We will start now building the model.

### Building the model
We will build the model using a machine learning pipeline. It will simplify the machine learning process.

#### Machine learning pipeline
The machine learning pipeline will make the work easy. We have various libraries that support the implementation of a machine learning pipeline. We will use [Scikit-learn](https://scikit-learn.org/stable/) `Pipeline` class to build it.

To import the `Pipeline` class, use this code:

```python
isfrom sklearn.pipeline import Pipeline
```
To implement a machine learning pipeline, we need to initialize all the stages in machine learning. 

The pipeline stages are as follows:

#### Data to data stage
This stage involves the data transformer methods. This methods changes/transforms the input data into the format the model requires. Then, the algorithm uses the transformed data for model training.

Let us import the transformer methods.

```python
from sklearn.preprocessing import StandardScaler
```
We use the `StandardScaler` to initialize the data to the data stage. This method will convert the dataset to a specified range to ensure dataset consistency.

#### Data to model stage
This stage involves the data estimator algorithm. This algorithm will train the model using the transformed data. In this stage, we use the Scikit-learn algorithms for classification.

Let us import the Scikit-learn algorithm.

```python
from sklearn.linear_model import LogisticRegression
```
We will use the `LogisticRegression` to train the bank marketing model. Let us combine the two stages to create the pipeline.

#### Combining the stages
Combining the stages will allow the `Pipeline` class to initialize all the pipeline stages. It will then run all the initialized pipeline stages at once.

```python
pipe_lr = Pipeline(steps=[('std_scaler',StandardScaler()),('lr',LogisticRegression())])
```
We have added the `StandardScaler` and `LogisticRegression` to the `Pipeline` class. 

We will use the `fit` function to train the initialized pipeline stages.

### Using the `fit` function
The function fits the `Pipeline` to the training set. The pipeline will then learn from the dataset. 

The output of this process is the final trained bank marketing model.

```python
pipe_lr.fit(x_train,y_train)
```
The output of the final model:

![Final model](/engineering-education/model-explanation-with-dalex/final-model.png)

It shows all the initialized steps and the algorithm that trains the model. Let us get the accuracy score of this model:

### Accuracy score
Use this code to get the accuracy score:

```python
print("LR:",pipe_lr.score(x_test,y_test))
```
The accuracy score:

```bash
LR: 0.9105770008901837
```
This is a high accuracy score (91.057%). However, we cannot just trust this model because it has a high accuracy score. We need to know all the variables that contributed to this accuracy score.

We will use Dalex to explain the model and gain an insightful understanding.

### Getting started with Dalex
To install Dalex, use this code:

```bash
!pip install dalex
```
After installing Dalex, let us import it:

```python
import dalex as dx
```
Dalex explains the model in two ways: Overall model explanation and single prediction explanation.

#### Overall model explanation
In this way, it explains the whole structure of the trained model. In addition, it will show the methods, functions, and algorithms that build the model. 

The user will know the dataset that trains the model and how each variable in the dataset contributed to the general model performance.

#### Single prediction explanation
In this way, it focuses on the single prediction of the model. It shows the variables that have contributed to that specific prediction. The user will know if a prediction is correct or not.

Let us start with the overall model explanation.

### Implementing overall model explanation
We implement the overall model explanation as follows:

#### Using `Explainer` function
We use the `Explainer` function to display the structure of the model.

```python
exp = dx.Explainer(pipe_lr,x_train,y_train)
```
Output:

![Overall model explanation](/engineering-education/model-explanation-with-dalex/overall-model-explanation.png)

From the output, the dataset has `28831 rows 20 cols`. We can also know the target and input variables used. 

The output also shows algorithms that train the model and model information. 

Using this output, the user will have a detailed understanding of the model.

#### Checking model performance
Next, We can also display the performance scores using this code:

```python
exp.model_performance()
```
This code will display all the performance scores:

![Overall model explanation](/engineering-education/model-explanation-with-dalex/metrics-score.png)

The accuracy score of the model is `0.91034`. It is slightly lower than the one we had gotten earlier, but it is still a high accuracy score. It is the accurate/true score of the model.

#### Variable contribution to the model performance
Let us see how each variable in the dataset contributed to the model performance.

```python
exp.model_parts()
```

Variable contribution output:

![Variable contribution](/engineering-education/model-explanation-with-dalex/variable-contribution.png)

The output shows how each variable in the dataset contributed to the model performance (overall model). The contributions are from the least to highest contribution. `day_of_week` variable has the least. `emp.var.rate` variable has the highest. 

We can also show the variable contribution using a plot diagram.

#### Variable contribution using a plot diagram
We will use `plotly` to plot the variable contribution diagram.

```bash
! pip install plotly
```

To plot, use this code:

```python
exp.model_parts().plot()
```
Plot diagram output:

![Plot diagram](/engineering-education/model-explanation-with-dalex/plot-diagram.png)

The diagram also shows how each variable in the dataset contributed to the model performance (overall model). 

`emp.var.rate` variable has the highest contribution. The `day_of_week` variable has the least.

We have gained an overall understanding of the model. 

Let us now implement the single prediction explanation.

### Implementing single prediction explanation
To implement the single prediction explanation, we first need to use the model to make a single prediction. We will then explain the output.

#### Using the model
We will select the data sample that the model will predict.

```python
data_sample = x_test.iloc[7]
```

To see the selected data sample, use this code:

```python
data_sample
```

The data sample output:

![Data sample](/engineering-education/model-explanation-with-dalex/data-sample.png)

Let us check the expected prediction. 

```python
y_test.iloc[7]
```
The expected prediction is the actual classification of the data samples. 

```bash
1
```

The expected prediction is `1`. Let us now use the model to classify this data sample.

#### Classify data sample
use the `predict` function and pass in the data sample:

```python
print("LR:",pipe_lr.predict([data_sample]))
```

The output:

```bash
LR: [1]
```

It is an accurate prediction, but still, we need to know how each variable in the dataset contributed to this prediction.

#### Variable contribution to the single prediction
We first need to convert the data sample to a DataFrame. It is the format that Dalex can use.

```python
data_frame = pd.DataFrame(data_sample).T
```
To see the Data Frame, use this code:

```python
data_frame
```
The output:

![Sample Data Frame](/engineering-education/model-explanation-with-dalex/sample-data-frame.png)

Let's now see the variable contribution to the single prediction:

```python
explanation = exp.predict_parts(data_frame)
explanation.result
```

Variable contribution output:

![Variable contribution](/engineering-education/model-explanation-with-dalex/varaible-contribution-to-prediction.png)

The output shows how the variables contributed to the single prediction. The contributions are from the highest to least contribution. `emp.var.rate` variable has the highest. `day_of_week` variable has the least. 

We can also show the same using a plot diagram.

#### Using a plot diagram
To plot, use this code:

```python
explanation.plot()
```
![Plot](/engineering-education/model-explanation-with-dalex/detailed-plot.png)

The plot breaks down all the variables in the dataset. The variables with the light-green color have positive contributions to the prediction. Conversely, the variables with the red color have negative contributions. 

Using this plot, we can see how each variable contributed to the prediction- both positively and negatively. We have built a machine learning model and explained its results to make it transparent.

### Conclusion
We have learned model explanation with Dalex. We discussed the importance of model explanation and how it builds transparent models. We prepared the dataset for the model to use. We also implemented a machine learning pipeline that simplifies the machine learning process.

After training the model, we implemented Dalex for the model explanation. Using Dalex, we did an overall model explanation and a single prediction explanation.

To get the Google Colab notebook for this tutorial, click [here](https://colab.research.google.com/drive/1nLzokmqe-_KWmv7u6q63mSmoX-ohOXUv?usp=sharing)

### References
- [Explainable AI](/engineering-education/explainable-ai/)
- [Dalex documentation](https://dalex.drwhy.ai/)
- [Sckit-learn Pipeline](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/)
- [Machine learning algorithms](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/
