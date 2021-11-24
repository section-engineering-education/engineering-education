---
layout: engineering-education
status: publish
published: true
url: /ensemble-learning-based-regression-model-using-python/
title: Building an Ensemble Learning Based Regression Model using Python
description: This tutorial aims to help the reader build an ensemble learning-based regression model using the python programming language.
author: adhinga-fredrick
date: 2021-10-19T00:00:00-14:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/ensemble-learning-based-regression-model-using-python/hero.jpg
    alt: An Ensemble Learning Based Regression Model Hero Image
---
Machine learning models are always evaluated based on their performance using specific metrics like; accuracy, precision, Mean Squared Error (MSE), etc. Each type of machine learning problem has its evaluation metrics.
<!--more-->
Building high-performance models (models with low errors), therefore, depends on how well the evaluation metric score is. In this tutorial, we will build a performance-driven linear regression model using ensemble learning.

### Prerequisites
To follow through the tutorial, you'll need:
1. To know the basics of Python.
2. To have a [Kaggle](https://www.kaggle.com/) account.
3. To know the basics of Machine Learning.

### Introduction
**Linear regression** is a statistical method of modeling the relationship between independent variables (x) and dependent variables (y). It uses independent variables (features) to predict dependent variables (target).

**Ensemble learning** is a machine learning technique that seeks to achieve a better predictive model performance by combining decisions from different models.

For our model's evaluation, we will be using RMSE (Root Mean Squared Error).

> **NB:** Regression problems cannot be measured using accuracy metric since the goal is to measure how close the predicted values are to the expected values and not to evaluate how correct the prediction is. Hence we use errors to evaluate our models.

### Setting up your environment
Before building our model, we will first go to Kaggle and create a new **notebook** and rename it to **Create_Folds**.

![Notebook](/engineering-education/ensemble-learning-based-regression-model-using-python/new-notebook.jpg)

After that, [download](https://www.kaggle.com/c/30-days-of-ml/data) the data from Kaggle and add it to your environment using the **Add Data** button and upload the downloaded data as **Dataset**.

![data](/engineering-education/ensemble-learning-based-regression-model-using-python/data.jpg)

>**HINT:**  To flawlessly upload your data to Kaggle, compress the datasets.

### Creating k-folds
Once done with setting up the environment, we will move on to creating k-folds for our dataset.

Cross-validation is a validation technique used to evaluate machine learning models on a finite dataset.  It is quite popular as it is easier to understand and results in less biased predictions than other methods like train/test split.

It is also best that you create folds that you'll be using throughout the modeling process whenever you're starting with a machine learning problem.

#### Importing the necessary libraries
Before proceeding, we need to import the following necessary libraries:

```python
import numpy as np 
import pandas as pd 
from sklearn import model_selection
```

#### Read data
We will now proceed to load our dataset into our notebook. We will use pandas library's `read_csv()` function to read the data as they constitute as `csv` files.

The code is as shown below:

```python
train_data = pd.read_csv('/kaggle/input/Dataset/train.csv')
test_data = pd.read_csv('/kaggle/input/Dataset/test.csv')
submission = pd.read_csv('/kaggle/input/Dataset/sample_submission.csv')
```

#### Creating the folds
As shown below, let's create a new column with the name *kfold* on the last column.

```python
train_data['kfold'] = -1
```

We will then proceed to create 5 folds using the following code block:

```python
kf  = model_selection.KFold(n_splits= 5,shuffle = True, random_state=42)

for fold, (train_indicies,valid_indicies)in enumerate(kf.split(X=train_data)):
    train_data.loc[valid_indicies, "kfold"]=fold
```

After running the cell above, we will output the *new* csv file (`train_kfolds.csv`) with kfolds by running the code block below:

```python
train_data.to_csv('train_kfolds.csv', index=False)
```

Here's the [Kaggle notebook](https://www.kaggle.com/adhingafredrick/create-kfolds), which you can copy and edit.

### Building a regression model
After creating the kfolds, we will download the `train_kfolds.csv` from the output data on our **Create_kFolds** notebook.

We'll then follow the same steps on [setting up your environment](#setting-up-your-environment) to create a new notebook called **RegressionModel** and upload the **Dataset** and **`train_kfolds.csv`** data.

After we're done with the environment setup, we'll proceed to build our model.

#### Importing necessary libraries
To build our regression model, we need to import the following libraries:

```python
import pandas as pd
import  numpy  as  np
from  sklearn.preprocessing  import  OrdinalEncoder
from  sklearn.model_selection  import  train_test_split
from  sklearn.ensemble  import  RandomForestRegressor
from  sklearn.metrics  import  mean_squared_error
from  xgboost  import  XGBRegressor
```

Once done, we will then proceed to read our data.

#### Read data
We will read our newly uploaded data, `Dataset2` and `trainfolds` using the following code block below:

```python
data = pd.read_csv('/kaggle/input/trainfolds/train_kfolds.csv')
test_data = pd.read_csv('/kaggle/input/Dataset2/test.csv')
submission = pd.read_csv('/kaggle/input/Dataset2/sample_submission.csv')
```

#### Feature selection
We will select the useful features from our dataset and remove the not so useful/impactful features. The not so useful features in this dataset would be; `id`, `target`, and `kfold`.

To select the useful features, run the following block of code:

```python
useful_features = [i for i in data.columns if i not in ("id", "target","kfold")]
object_cols = [col for col in useful_features if "cat" in col]
test_data = test_data[useful_features]
```

#### Modeling
To build our model, we will run the following block of code:

```python
final_predictions =[]

for fold in range(5):
    xtrain = data[data.kfold != fold].reset_index(drop=True)
    xvalid = data[data.kfold == fold].reset_index(drop=True)
    xtest = test_data.copy()
    
    ytrain = xtrain.target
    yvalid = xvalid.target
    
    xtrain = xtrain[useful_features]
    xvalid = xvalid[useful_features]
    
    # Data Encoding 
    oe = OrdinalEncoder()
    xtrain[object_cols] = oe.fit_transform(xtrain[object_cols])
    xvalid[object_cols] = oe.transform(xvalid[object_cols])
    xtest[object_cols] = oe.transform(xtest[object_cols])
    
    # Model Training
    model = XGBRegressor(random_state = fold, n_jobs=5)
    model.fit(xtrain, ytrain)
    preds_valid = model.predict(xvalid)
    preds_test = model.predict(xtest)
    final_predictions.append(preds_test)
    print(fold, mean_squared_error(yvalid, preds_valid, squared=False))
```

For each fold, we will encode the data and then train the model using XGBoost (Extreme Gradient Boosting), an ensemble learning technique to boost the performance of our model.

XGBoost is a regularized boosting technique that provides high predictive power and is faster than other boosting techniques. We will then evaluate each fold individually and print out the results of the model.

#### Model evaluation
After individually evaluating each fold, we will now evaluate our model's performance by getting the mean predictions on our test data. 

To do this, use the following code block:

```python
preds = np.mean(np.column_stack(final_predictions), axis=1)
```

To see how our model performed, we will output the results of our model's prediction using the following code:

```python
submission.target =preds
submission.to_csv("submission1.csv", index=False)
```

To see an output of our submission file, run the following code:

```python
sub = pd.read_csv('/kaggle/output/submission1.csv')
sub
```

>**Bonus:** You can submit a late submission to 30 days ML Kaggle challenge and see how your model performs, i.e., if you had signed up for the challenge earlier.

### Hyperparameter optimization
In this process, we'll fine-tune and optimize our model's algorithm parameters until we achieve the desired result.

A few common XGBoost parameters with a large effect on the model perfomance include; **n_jobs**, **max_depth**, **learning_rate**, **n_estimators**, **colsample_bytree**, and **subsample**.

To fine-tune our model, add the following changes to the XGBoost regressor:

```python
model = XGBRegressor(random_state = fold, n_jobs=5, learning_rate =0.1, subsample=0.8,
                         max_depth = 5, min_child_weight = 1, gamma = 0, scale_pos_weight = 1)
```

Once you run the above code, you'll see our model's result improve slightly better than our first example. You can continue changing the parameters until it meets the desired goal. For example, you can target a value like `0.7100` to measure your models' success.

You can also look at scikit-learn's [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html) or [Optuna](https://optuna.org/#code_XGBoost) which makes it easier to fine-tune your model.

Read more on this detailed [hyperparameter tuning](https://www.analyticsvidhya.com/blog/2016/03/complete-guide-parameter-tuning-xgboost-with-codes-python/) article that goes beyond the scope of this tutorial.

Here's the Kaggle [notebook](https://www.kaggle.com/adhingafredrick/regressionmodel) for our regression model.

### Conclusion
Building a performance-driven model is not a very easy task. It involves refining our model again and again until we get the desired outcome. 

Either way, mastering the art of modeling can be very rewarding, whether it is in a machine learning or a data science project, or a competition.

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
