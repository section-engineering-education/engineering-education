---
layout: engineering-education
status: publish
published: true
url: /optimizing-ml-models-with-optuna/
title: Optimize Machine Learning Models With Optuna
description: In this article, we learn about hyperparameter tuning, how we usually do it, and how we can automate this search process with Optuna.
author: bonface-ndolo
date: 2022-03-25T00:00:00-04:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/optimizing-ml-models-with-optuna/hero.jpg
    alt: Optimize Machine Learning Models With Optuna example image
---
In this tutorial, we will learn about Optuna - a framework to automate the hyperparameter search. Here, we will find the best hyperparameters for an XGBoost regressor model.
<!--more-->
[Optuna](https://optuna.org) is a software framework that automates learning optimization processes. These optimization processes aim to reduce the amount of time and effort required to complete a machine learning project while improving its performance.

Hyperparameters are a set of arguments that controls the learning process in machine learning algorithms.

Optuna uses grid search, random, bayesian, and evolutionary algorithms to find the best values for hyperparameters.

### Prerequisites
As a prerequisite, you should have the following:
- Basic knowledge of [Python](https://www.python.org/).
- Python environment of your choice installed.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Optimization process](#optimization-process)
  - [Load the dataset](#load-the-dataset)
  - [Standard scaling the dataset](#standard-scaling-the-dataset)
  - [Dataset split](#dataset-split)
  - [Test the model](#test-the-model)
  - [Define function](#define-function)
  - [Import optuna](#import-optuna)
  - [Create the primary objective function](#create-the-primary-objective-function)
  - [Create an optuna study object](#create-an-optuna-study-object)
  - [Visualize search history](#visualize-search-history)
  - [Compare the optimized model with the base model](#compare-the-optimized-model-with-the-base-model)
- [Conclusion](#conclusion)

### Optimization process
To learn how we can fit Optuna into our machine learning project, we will train an XGBoost model, conduct an in-depth analysis of hyperparameter optimizations, and assess the most efficient and timely optimization.

We'll start by creating a data frame that includes all the relevant modules and data.

#### Load the dataset
We import the following Python libraries:

```python
import sklearn
import pandas as pan
import numpy as num
from sklearn.datasets import load_boston
```

- `pandas` library helps with data frame related operations.
- `numpy` provides a wide range of utilities, from parsing different file formats to converting an entire data table to a NumPy matrix array.
- `sklearn.datasets.load_boston` is a dataset that contains housing prices in Boston. We will be using this dataset for our project.

#### Standard scaling the dataset
A pandas data frame `Our_loadboston` will be returned when we load the dataset using `load_boston()`:

```python
Our_loadboston = load_boston()
# Subset rows or columns of dataframe
dataframe = pan.DataFrame(Our_loadboston.data , columns = Our_loadboston.feature_names)
dataframe['target'] = Our_loadboston.target

X = dataframe.iloc[:,dataframe.columns != 'target']
y = dataframe.target

from sklearn.preprocessing import StandardScaler
standardSc = StandardScaler()
X = standardSc.fit_transform(X) # Computes the mean and standard deviation to scale, fit the scaled data, then transform it.
```

The code above does the following:
- Separates the targets and features after framing the dataset into pandas dataframe.
- Extracts features and target into `X` and `y` respectively.
- Scales the dataset into a single scale to help the model converge more quickly and divide the dataset into train and test sets more easily.
- Computes the mean and standard deviation of the dataset to scale, fit the scaled data, and then transform it.

#### Dataset split
To measure the performance of the model (how well the model has learned), we will divide the dataset into train and test sets as shown:

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train,y_test = train_test_split(X, y, test_size = 0.2, random_state = 12)
```

- `X_train` - Feature vectors that are to be trained
- `X_test` - Feature vectors that are to be tested
- `y_train` - Target vectors that are to be trained
- `y_test` - Target vectors that are to be tested

#### Test the model
Let's assess the performance of the model.

We will first start by importing `xgboost`, training it, and using the `cross_val_score()` method to evaluate a score for the model.

```python
import xgboost as gbst
from sklearn.model_selection import cross_val_score
xgboo_reg = gbst.XGBRegressor()

ourScores = cross_val_score(xgboo_reg, X_train, y_train , scoring = 'neg_root_mean_squared_error', n_jobs = -1, cv = 10)
#cross_val_score has a `neg_root_mean_squared_error` can be turned into a positive value by multiplying it by -1
print(num.mean(ourScores), num.std(ourScores))
print(ourScores) # output: score of our model
```

The code above does the following:
- Evaluate the model using the `cross-validation` method.
- Computes the standard deviation and mean of scores.
- Outputs the score of our model as a list.

**Output:**

```bash
-3.0784942308511307 # mean of score
 0.42284534035667176 # standard deviation
[-2.62847993 -3.60582341 -3.31998107 -3.60355075 -3.03760446 -2.50243868 -2.92302011 -2.61990331 -3.67855489 -2.8655857 ]
```

Let's evaluate the same model after optimizing it with Optuna.

#### Define function
This section will define the functions that take hyperparameters and return scores.

`return_score()` provides a cross-validated score based on the parameters that we send to it. Here, we will take `1000` samples to save time:

```python
def return_score(param):
  ourNewModel = gbst.XGBRegressor(**param)
  # A value that has been cross-validated for -(neg_root_mean_squared_error) is returned when parameters are used as a keyword argument by return_score() method.
  rootMeanSquareError = num.mean(cross_val_score( ouNewModel, X_train[:1000],y_train[:1000], cv = 4, n_jobs =-1, scoring='neg_root_mean_squared_error')) # training 1000 samples in both first part 'X_train' an second part 'y_train'
  return rootMeanSquareError
```

#### Import optuna
We import Optuna and its related libraries as shown:

```python
import optuna
from Optuna import Trial, visualization # visualizations that plot the optimization results
from optuna.samplers import TPESampler # Samplers class that defines the hyper-parameter space
```

You can install Optuna with `pip install optuna`.

#### Create the primary objective function
We'll build an object with all the information about hyper-parameters that we wish to try out. However, we must first define the ranges and the possible values of the hyper-parameters.

By specifying the range of values, we allow Optuna to look and evaluate the best hyperparameter that we can use for our model.

Hyper-parameter values can be defined in a variety of ways like:
- `trial.suggest_loguniform('learning_rate', 0.05, 0.5)` shows the log distribution between `0.05` and `0.5` for the `learning_rate`.
- `trial.suggest_uniform('lambda', 0, 2)` shows uniformly distributed numbers between `0` and `2` for `lambda`.
- `trial.suggest_int('depth', 3, 5)` shows integer parameters between `3` and `5` for `depth`.

Using the examples that we have stated above, the following code illustrates all potential hyper-parameter ranges:

```python
def objective(trial):
  parameter = {
      "n_estimators" : trial.suggest_int('estimators', 0, 500), # show integer parameters between 0 and 500 for estimators
      'max_depth':trial.suggest_int('depth', 3, 5), # show integer parameters between 3 and 5 for depth
      'reg_alpha':trial.suggest_uniform('alpha',0,6), # set a uniformly distributed numbers between 0 and 6 for alpha
      'reg_lambda':trial.suggest_uniform('lambda',0,2), # set a uniformly distributed numbers between 0 and 2 for lambda
      'min_child_weight':trial.suggest_int('childweight',0,5), # show integer parameters between 0 and 5 for childweight
      'gamma':trial.suggest_uniform('ourgamma', 0, 4), # set a uniformly distributed numbers between 0 and 4 for gamma
      'learning_rate':trial.suggest_loguniform('ourlearning_rate',0.05,0.5), # set a log distribution between 0.05 and 0.5 for learning rate
      'colsample_bytree':trial.suggest_uniform('colsample_bytree',0.4,0.9), # set a uniformly distributed numbers between 0.4 and 0.9 for colsample_bytree
      'subsample':trial.suggest_uniform('sample',0.4,0.9),
      'nthread' : -1
  }
  #returns the regressionModelse score
  return(return_score(parameter))
```

You can follow this [link](https://xgboost.readthedocs.io/en/latest/parameter.html) for more detail on the hyper-parameters.

#### Create an optuna study object
This study object stores all the information about the hyper-parameters.

In the code below, optimization parameters and their history are stored in an object created by `studyObject1`. After running, the study stops after 500 trials:

```python
# direction='minimize' is used since we want to minimize rootMeanSquareError
studyObject1 = optuna.create_study(
    direction='minimize', sampler=TPESampler()) # Bayesian Sampling Technique
studyObject1.optimize(objective, n_trials= 500) # set a limit of 500 trials but you can change to whichever trials you may want
```

**Output:**

![Best trial](/engineering-education/optimizing-ml-models-with-optuna/trial.jpg)

After running the code, we achieved the best score at trial `184`. We had a `rootMeanSquareError` of `3.07` at the start, which got reduced to `2.86` after `500` trials.

#### Visualize search history
It is possible to further decrease the scope of the search by narrowing down the ranges of parameters. Visualization will help analyze and decide on narrowing down the ranges:

```python
optuna.visualization.plot_slice(studyObject1)# plot the parameter relationship as slice plot
```

![Output](/engineering-education/optimizing-ml-models-with-optuna/visualization.png)

#### Compare the optimized model with the base model
We obtain the optimized hyper-parameters using `study.best_params` that produces a dictionary containing the optimized parameters:

```python
studyObject1.best_params# return parameters of the best trial
```

**Output:**

```bash
# Our best trial was 184 and below shows the parameters of the trial.
{
  'colsample_bytree': 0.8228985622676791,
  'ourgamma': 0.5064888131479657,
  'maxdepth': 4,
  'child_weight': 1,
  'estimators': 475,
  'ourlearning_rate': 0.053232877076795374,
  'alpha': 1.908137784762065,
  'lambda': 0.03170430168340592,
  'minisample': 0.7131725068799382,
}
```

To compare both models, we evaluate the scores before and after the hyperparameter optimizations:

```python
parameter = {}
print(f"without optimization {return_score(parameter)}")
print(f"with optimization {return_score(studyObject1.best_params)}")
```

**Output:**

```bash
without optimization 3.218281561235578
with optimization 2.9923284820263603
```

As you can see, we have achieved a lower reading (better score).

> By restricting the ranges of hyperparameters, we can optimize even more.

### Conclusion
In this tutorial, we trained an XGBoost model on the `boston_housing` dataset, explored hyperparameter optimization in-depth, and analyzed the visualization for better optimization.

Using Optuna, we learned how to experiment hyperparameter optimization that returns the best hyperparameters.

You can find the full source code [here](https://colab.research.google.com/drive/1eyNACNEbIn0mQ8-UPxNkz1Ng4ppgCrNr?usp=sharing).

You can learn more about hyperparameter optimization [here](https://optuna.readthedocs.io/).

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
