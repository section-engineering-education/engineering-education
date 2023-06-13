---
layout: engineering-education
status: publish
published: true
url: /model-monitoring-and-detecting-drifts-using-deepchecks/
title: Model Monitoring and Detecting drifts in ML Models using Deepchecks
description: This tutorial will show the readers how to build a customer classification model and implement Deepchecks to detect any model drifts.
author: simon-ndiritu
date: 2022-05-30T00:00:00-16:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/hero.png
    alt: Model monitoring using Deepchecks Hero Image
---
Model monitoring is a stage in machine learning that keeps track of a trained machine learning model to help developers detect any changes in the model that may negatively affect the business operation. A good machine learning team should continuously monitor the model to identify any changes in model performance. These are known as model drifts.
<!--more-->
Many businesses depend on machine learning models for day-to-day operations. A company like PayPal uses machine learning models to detect fraudulent transactions. Model monitoring will keep track of the model to identify any changes in the fraud detection system. It will enable the developers to make changes in the model before a loss occurs.

Changes in model performance are due to changes in the input data, model features, target labels, and independent variables. It may also be due to the deprecated  libraries and other dependencies that the model uses. It leads to poor model predictions and poor model generalization. 

[Deepchecks](https://deepchecks.com/) is a machine learning library that monitors a machine learning model to detect or identify changes in model performance. The changes are called model drifts. We will build a customer classification model and then implement Deepchecks to detect changes in the model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Types of model drifts](#types-of-model-drifts)
- [Building the machine learning model](#building-the-machine-learning-model)
- [Loading bank customer dataset](#loading-bank-customer-dataset)
- [Selecting input and output variables from the columns](#selecting-input-and-output-variables-from-the-columns)
- [Splitting the bank customer dataset](#splitting-the-bank-customer-dataset)
- [Importing the Pipeline module](#importing-the-pipeline-module)
- [Fitting the Pipeline](#fitting-the-pipeline)
- [Accuracy score for the customer classification model](#accuracy-score-for-the-customer-classification-model)
- [Implementing Deepchecks](#implementing-deepchecks)
- [Creating the two dataset objects](#creating-the-two-dataset-objects)
- [Importing the full suite method](#importing-the-full-suite-method)
- [The full suite outputs](#the-full-suite-outputs)
- [Implementing the Check method](#implementing-the-check-method)
- [Importing the data drift method](#importing-the-data-drift-method)
- [Importing the concept drift method](#importing-the-concept-drift-method)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To easily understand the model monitoring concepts explained in this tutorial, the reader should have a grasp of the following:
- Understand [Python programming concepts](https://www.w3schools.com/python/)
- Understand how to use [Scikit-learn library](https://scikit-learn.org/stable/)
- Be able to build a [simple classification model](https://www.simplilearn.com/tutorials/machine-learning-tutorial/classification-in-machine-learning)
- Have a grasp of [Google Colab notebook](https://colab.research.google.com/)

### Types of model drifts
Model drift refers to the changes in the model performance leading to model degradation and poor predictions. It is due to changes in the model dataset. It is also due to the changes in the relationships between independent variables (features) and dependent variables (label/target). Depending on the changes, model drifts can be data or concept drifts.

#### Data drift
In data drift, the features in the dataset change over time after the model training. Features are the independent variables in the dataset that are the inputs for the machine learning model. Changes in the features are due to data leakage, contamination of the data with viruses, or changes in the general data structure.

#### Concept drift
In concept drift, the target/labels in the dataset changes over time after the model training. The target is the dependent variable which is the model output. We will use the `Deepchecks` library to detect these drifts in our machine learning model. Before we implement the Deepchecks, we will first build the machine learning model.

### Building the machine learning model
We will build the machine learning model using the bank customers dataset. The dataset has multiple independent variables (features) and one target variable. The model will predict whether a bank customer will subscribe to a monthly deposit plan. You can download the complete dataset for this model [here](https://drive.google.com/file/d/1jNSH7yYDYUu13EKkqyN5OpTpHI1Megd8/view?usp=sharing).

### Loading bank customer dataset
We will load the bank customer dataset using Pandas. We import this Python package as follows:

```python
import pandas as pd 
```
We then load the bank customer dataset as follows:

```python
df = pd.read_csv("/content/bank-customers.csv")
```
To see some of the data points, input the code below:

```python
df.head()
```
It shows the following data points.

![Data points](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/data-points.png)

The output shows the first five data points that have multiple columns. We have to select the input and output variables from these columns.

### Selecting input and output variables from the columns
We select the input and output variables as follows:

#### Selecting input variables
```python
Xfeatures = df.drop('y',axis=1)
```
We select all the columns except the last column as the input variables (features).

#### Selecting the output variable
```python
ylabels = df.iloc[: , -1:]
```
We select the last column (y) as the output/target variable.

### Listing the input variables
We can list all the columns we have selected to be the input variables as follows:

```python
Xfeatures.columns
```
The code lists the following columns:

![Input variables](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/input-variables.png)

### Splitting the bank customer dataset
We split the customer bank into two sets. One set will train the customer classification model. The second set will perform model testing and evaluate the performance. We have to import the package for splitting as follows:

```python
from sklearn.model_selection import train_test_split
```
We then split the dataset using the package as follows:

```python
x_train,x_test,y_train,y_test = train_test_split(Xfeatures,ylabels,test_size=0.2,random_state=7)
```
The bank customer dataset is now ready to be fed into the model. We will use the Pipeline module from Scikit-learn to build the classification.

### Importing the Pipeline module
The Pipeline module will speed up the process of building the classification model. We import the module from Scikit-learn as follows:

```python
from sklearn.pipeline import Pipeline
```
The Pipeline module will take in all remaining machine learning steps. We will add the data scaling step and model training step (these are the remaining steps) to the imported `Pipeline`.

#### Data scaling step
Data scaling will ensure the bank customer dataset fits into the model in the training phase. We will use the `StandardScaler` class for scaling. We import this class from Scikit-learn as follows:

```python
from sklearn.preprocessing import StandardScaler
```
#### Model training step 
We will use the `LogisticRegression` algorithm to train the bank classification model. We import the algorithm from Scikit-learn as follows:

```python
from sklearn.linear_model import LogisticRegression
```
### Adding the two steps
We add the two steps as follows:

```python
model_pl = Pipeline(steps=[('sdc',StandardScaler()),('lgsr',LogisticRegression())])
```
### Fitting the Pipeline
We will fit the Pipeline into the training dataset. The Pipeline will scale the training dataset and then train the model using the `LogisticRegression` algorithm. It will produce a final customer classification model.

```python
model_pl.fit(x_train,y_train)
```
### Accuracy score for the customer classification model
To get the accuracy score, input the following code:

```python
model_pl.score(x_test,y_test)
```
It outputs the following accuracy score:

```bash
0.9105770008901837
```
The accuracy score of the customer classification score is 91.0577%. It is a good accuracy score. It implies that the model can accurately classify different customers. We still need to implement Deepchecks to monitor the customer classification model.

### Implementing Deepchecks
We install the [Deepchecks](https://deepchecks.com/) library using this command:

```bash
!pip install deepchecks
```
After the installation process, we import the library using this code:

```python
import deepchecks
```
The `Deepchecks` library has various methods that monitor our model and detect any model drifts. To list these methods, use this code:

```python
dir(deepchecks)
```
The code outputs the following methods:

![Deep checks metods](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/deepchecks-methods.png)

Even though we have listed all the methods, we will not implement all of them. We will use `Dataset`, `Suite`, and `Check`.

#### Dataset method
It creates two dataset objects to represent the original dataset. The first one will represent the training dataset. The second one will represent the testing dataset. It will transform the original dataset into a format that Deepchecks will understand. We will then add the transformed dataset (the two dataset objects) to Deepchecks for model drift detection.

#### Suite method
We will use this method to give the general model performance. It also outputs a summary of all the functions and dataset variables that the model uses during the training process. We will import `full_suite` from `Suite` which is the specific method that will output the model summary. `full_suite` will also perform exhaustive/fully comprehensive checks on the model to detect both data and concept drifts.

#### Check method
This method is less exhaustive as compared to the `full_suite`. It runs a single specific check to detect either data or concept drift. We start by creating the two dataset objects using the `Dataset` method.

### Creating the two dataset objects
We create the dataset object that will represent the training dataset as follows:

```python
deepchecks_train_data = deepchecks.Dataset(df=x_train,label=y_train)
```
We then create the second Dataset object that will represent the testing dataset.

```python
deepchecks_test_data = deepchecks.Dataset(df=x_test,label=y_test)
```
The next step is to import the `full_suite` method. It will perform an exhaustive check on the dataset objects and the trained model. 

### Importing the full suite method
To import the `full_suite` method, use the code below:

```python
from deepchecks.suites import full_suite
```
We then initialize the `full_suite` using the code below:

```python
overall_suite = full_suite()
```
The next step is to add the dataset objects and the trained model to the `full_suite()`.  

### Adding the dataset objects and the trained model
We add the dataset objects and the trained model as follows:

```python
output = overall_suite.run(train_dataset=deepchecks_train_data, test_dataset=deepchecks_test_data, model=model_pl)
```
It uses the `run` function to run the `full_suite` method. It will then analyze the dataset objects and the trained model to detect model drifts (concept and data drifts). The `full_suite` method uses in-built conditions when running the fully comprehensive checks. Some of the conditions may pass, fail or run with a warning. These conditions will determine whether the model has drifts (either concept or data drifts) or any other changes. 

The following symbols represent these conditions: 
- ✖: It represents failed conditions.
- ✓: It represents passed conditions.
- !: It represents the conditions that runs with a warning.

To see the output after running the `full_suite`, use this code:

```python
output
```
It will generate a report/output that shows the model summary.

### The full suite outputs
The outputs are as follows:

#### Conditions Summary output

![Conditions Summary](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/conditions-summary.png)

The output shows some of the conditions that have passed while others have run with a warning.

#### Duplicates in the train set output

![Data Duplicates](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/data-duplicates-train-set.png)

The output shows some of the duplicate values in the training dataset.

#### Duplicates in the test set output

![Data Duplicates](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/data-duplicates-test-set.png)

The output shows some of the duplicate values in the testing dataset.

#### Performance report output

![Performance report](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/performance-report.png)

The output shows the performance of the classification model. The condition that checks/validates the model performance has passed. It implies the trained model has a good performance. It also shows the [F1](https://en.wikipedia.org/wiki/F-score), [Precision](https://medium.com/@shrutisaxena0617/precision-vs-recall-386cf9f89488), and [Recall](https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall) scores for the model.

#### Unused and the used model features output

![Model features](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/model-features.png)

The output shows all the used model features and the others. It shows the importance of the features and how they contributed to model building.

### Model inference time output

![Model inference time](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/model-inference-time.png)

It shows the time the model takes to learn from a dataset sample.

#### Train Test Drift output
This output will show whether there are drifts in the testing and training dataset after model training.

![Data Drift output](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/train-test-drift.png)

The condition for checking the drifts (data drift) in the testing and training dataset has passed. It uses a drift score to check for the data drift. 

The condition is:
- If the drift score is <= 0.1, then there is no data drift. This condition has been met (passed). Therefore, there is no data drift.

#### Train Test Label Drift output
This output will show whether there is a concept drift in our text classification model.

![Concept drift output](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/concept-drift.png)

The condition for checking the concept drift in the classification model has passed. It also uses a drift score to check for the concept drift. 

The condition is:
- If the drift score is <= 0.1, then there is no concept drift. This condition has passed. Therefore, there is no concept drift.

These are some of the outputs that the `full_suite` method produces. You can further explore the others. Let's move to the `Check` method. 

### Implementing the Check method
We will use the method to run a single specific check to detect either data drift or concept drift. Let's import the specific method to detect the data drift.

#### Importing the data drift method
We import the data drift method as follows:

```python
from deepchecks.checks import TrainTestFeatureDrift
```
We then initialize the data drift method as follows:

```python
data_drift_check = TrainTestFeatureDrift()
```
We then add the dataset objects and the model we had earlier trained.

```python
data_drift_output = data_drift_check.run(train_dataset=deepchecks_train_data, test_dataset=deepchecks_test_data, model=model_pl)
```
It uses the `run` function to run the method. It will then analyze the dataset objects and the trained model to detect data drift. 

To see the output, input this code:

```python
data_drift_output
```
It gives the following output:

![Checking data drift](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/checking-data-drift.png)

The output above shows the drift score using the `emp.var.rate` variable (an input feature). This variable gives a drift score of less than 0.1. It implies that there is no data drift. We can also see the drift score using the `duration` variable.

![Using duration variable](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/using-duration-variable.png)

It gives a negligible drift score. Therefore, there is no data drift. Let's import the method that detects the concept drift.

#### Importing the concept drift method
We import the method as follows:

```python
from deepchecks.checks import TrainTestLabelDrift
```
We then initialize the concept drift method as follows:

```python
concept_drift_check = TrainTestLabelDrift()
```
We also have to add the Deepchecks dataset objects.

```python
data_drift_output = concept_drift_check.run(train_dataset=deepchecks_train_data, test_dataset=deepchecks_test_data)
```
It uses the `run` function to run the method. It will then analyze the Deepchecks dataset objects to detect concept drift. 

To see the output, input this code:

```python
concept_drift_output
```
It gives the following output:

![Checking concept drift](/engineering-education/model-monitoring-and-detecting-drifts-using-deepchecks/checking-concept-drift.png)

The output above shows the drift score using the `y` variable (it is the target/label). It gives a negligible drift score. Therefore, there is no concept drift. We have used the Deepchecks methods to monitor the model, get the model summary and detect the model drifts.

### Conclusion
In this tutorial, we have monitored and detected drifts in machine learning models using Deepchecks. We discussed the data and concept drifts and how they affect the model performance. 

We then implemented a customer classification model. We used the Dataset, Suite, and Check methods to detect model drifts (both data and concept drifts). These methods generated a report or output that showed the model summary. It showed that there were no data and model drifts.

You can access the Google Colab notebook for this tutorial [here](https://colab.research.google.com/drive/1nnzTMKMKrGHTfrqRX92EAG0mHZeYX4lz?usp=sharing).

Happy coding!

### References
- [Deepchecks documentation](https://deepchecks.com/)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [What is concept drift?](https://datatron.com/what-is-model-drift/)
- [Model monitoring](https://valohai.com/model-monitoring/)
- [Model drift in machine learning](https://towardsdatascience.com/model-drift-in-machine-learning-models-8f7e7413b563)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
