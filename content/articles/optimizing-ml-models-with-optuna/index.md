Optuna is a software framework used to automate optimization processes. These optimization processes aim to reduce the amount of time and effort required to complete a project while also increasing the overall output. Optuna uses grid search, random, bayesian, and evolutionary algorithms to find the best values for hyperparameters.

Hyperparameter is a parameter whose value controls the learning process in machine learning. These are the parameters that control how the model learns from our data.

Many tools can be used to optimize models, but we will use Optuna. We will find the best hyperparameters for Xgboost regressor in an easier way. 
### Prerequisites
- Have a basic knowledge of [Python](https://www.python.org/).
- Have python environment of your choice installed.
### Table of contents
- [Optimization process](#optimization-process)
  - [Importing necessary modules](#importing-necessary-modules)
  - [Testing the model](#testing-the-model)
  - [Defining Functions](#defining-functions)
  - [Importing optuna](#importing-optuna)
  - [Creating the primary objective function](#creating-the-primary-objective-function)
  - [Creating an optuna study object](#creating-an-optuna-study-object)
  - [Visualizing search history](#visualizing-search-history)
  - [Comparing the optimized model with the base model](#comparing-the-optimized-model-with-the-base-model)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Optimization process
We will train Xgboost, conduct an in-depth analysis of hyperparameter optimization, and assess the visualization for more efficient and timely optimization.
#### Importing necessary modules
We'll start by creating a data frame that includes all the relevant modules and data.
##### **Loading the dataset**

```python
import sklearn
#'pandas' data frame will be used to segregate features and targets 
import pandas as pan# provides a wide range of utilities, from parsing different file formats to converting an entire data table to a NumPy matrix array
import numpy as num #to manipulate data as arrays
from sklearn.datasets import load_boston# contains prices that we shall be using as our data
```

##### **Standard scaling the dataset**
A pandas data frame will be used to segregate features and targets when the dataset is returned as a matrix by `load_boston().`

```python
# The load_boston imported contains prices that we shall be using as our data and has no null or missing values 
Our_loadboston = load_boston()
# Subset rows or columns of dataframe 
dataframe = pan.DataFrame(Our_loadboston.data , columns = Our_loadboston.feature_names)
dataframe['target'] = Our_loadboston.target

X = dataframe.iloc[:,dataframe.columns != 'target']
y = dataframe.target 

from sklearn.preprocessing import StandardScaler
standardSc = StandardScaler()
X = standardSc.fit_transform(X)# Computes the mean and std to be used for later scaling, fit to data, then transform it.
```

The code above does the following:

- Seperates the targets and features after framing the dataset into pandas dataframe.
- Extracts features and target.
- Scale the dataset into a single scale to help the model converge more quickly and divide the dataset into train and test sets more easily.
- Computes the mean and standards to be used for later scaling, fit to data, then transform it.

##### **Dataset splitting**
The model is able to reach a more convergent state more quickly since the dataset has been divided into train and test sets.
```python
from sklearn.model_selection import train_test_split
# We'll randomly divide up the dataset matrices into train and test subsets.
X_train, X_test, y_train,y_test = train_test_split(X, y, test_size = 0.2, random_state = 12)# x_train: The first sequence's training phase (x) x_test: The initial sequence's test segment (x). y_train: The second sequence's training phase (y). y_test: The second sequence's test section (y)
```
#### Testing the model
We can see how much better our model is after fine-tuning the parameters by testing the model. 
> Keep in mind that this is not the optimized model.

We will first start by importing Xgboost, training it, and using the `cross_val_score()` method to evaluate a score for the model. 

```python
# import xgboost that we will find it's best hyperparameters 
import xgboost as gbst
from sklearn.model_selection import cross_val_score
xgboo_reg = gbst.XGBRegressor()

ourScores = cross_val_score(xgboo_reg, X_train,y_train , scoring = 'neg_root_mean_squared_error', n_jobs = -1,cv = 10)
                            #cross_val_score has a neg_root_mean_squared_error can be turned into a positive value by multiplying it by -1 
print(num.mean(ourScores), num.std(ourScores))
print(ourScores)# output: score of our model
```

The above code does the following:

- Scores our model using the `cross-validation` method.
- Compute the standard deviation and mean of score.
- Gives out the score of our model as an output. 

Output:
```bash
-3.0784942308511307 # mean of score  
 0.42284534035667176 # standard deviation
[-2.62847993 -3.60582341 -3.31998107 -3.60355075 -3.03760446 -2.50243868 -2.92302011 -2.61990331 -3.67855489 -2.8655857 ]
```
We can see how much better our model is after optimizing the parameters by testing the model.
#### Defining Functions
This section will define the functions that take hyperparameters and return scores.

`return_score()` will be used to provide a cross-verified score based on keyword arguments that we will send to it. We will take 1000 samples to save time.
```python
def return_score(param):
  ourNewModel = gbst.XGBRegressor(**param)  
  # A value that has been cross-validated for -(neg_root_mean_squared_error) is returned when parameters are used as a keyword argument by return_score() method.
  rootMeanSquareError = -num.mean(cross_val_score( ouNewModel, X_train[:1000],y_train[:1000], cv = 4, n_jobs =-1, scoring='neg_root_mean_squared_error'))# raining 1000 samples in both first part 'X_train' an second part 'y_train'
  return rootMeanSquareError 
```
#### Importing optuna
This is where we import Optuna. You can use the pip command to install.

```python
import optuna
# Visualization is used to plot the optimization results
from Optuna import Trial, visualization
# The Samplers class will define our hyper-parameter space
from optuna.samplers import TPESampler
```
#### Creating the primary objective function
We'll build a study object with all the information about hyper-parameters tested in this study. However, we must first define the ranges of possible values of hyper-parameters.

Hyper-parameter values can be defined in a variety of ways:
1. **trial.suggest_loguniform(‘learning_rate’,0.05,0.5)** to show log distribution between 0.05 and 0.5 for learning_rate.
2. **trial.suggest_uniform(‘lambda’,0,2)** to show uniformly distributed numbers between 0 and 2 for lambda.
3. **trial.suggest_int('depth', 3, 5)** to show integer parameters between 3 and 5 for depth.

Using the examples of methods described above for defining hyper-parameters, the following code illustrates all potential hyper-parameter ranges:

```python
def objective(trial):
  parameter = {
                "n_estimators" : trial.suggest_int('estimators', 0, 500),
                'max_depth':trial.suggest_int('depth', 3, 5),
                'reg_alpha':trial.suggest_uniform('alpha',0,6),
               #set a uniformly distributed numbers between 0 and 2 for lambda
                'reg_lambda':trial.suggest_uniform('lambda',0,2),
                'min_child_weight':trial.suggest_int('childweight',0,5),
                'gamma':trial.suggest_uniform('ourgamma', 0, 4),
               #set a log distribution between 0.05 and 0.5 for learning rate
                'learning_rate':trial.suggest_loguniform('ourlearning_rate',0.05,0.5),
               #set a uniformly distributed numbers between 0.4 and 0.9 for colsample_bytree
                'colsample_bytree':trial.suggest_uniform('colsample_bytree',0.4,0.9),
                'subsample':trial.suggest_uniform('sample',0.4,0.9),
                'nthread' : -1
            }
  #returns the regressionModelse score
  return(return_score(parameter))
```

You can follow this [link](https://xgboost.readthedocs.io/en/latest/parameter.html) for more detail on hyper-parameters.

#### Creating an optuna study object
This study object stores all the information about the hyper-parameters.

In the code below, optimization's parameters and history are stored in an object created by `studyObject1`. After running, the study stops after 500 trials.

```python
#direction='minimize' is used since we want to minimize rootMeanSquareError
studyObject1 = optuna.create_study(
    direction='minimize',sampler=TPESampler())# Bayesian Sampling Technique
studyObject1.optimize(objective, n_trials= 500)# set a limit of 500 trials but you can change to whichever trials you may want 
```

Output:

![Best trial](/engineering-education/optimizing-ml-models-with-optuna/trial.png)

After running, I found that my best trial was 184.

We had a rootMeanSquareError of 3.07 at the start, which reduces to 2.86 after 500 trials.

#### Visualizing search history
It is possible to further decrease the scope of our search by narrowing down the ranges of parameters. Visualization will help in narrowing down the ranges.

```python
optuna.visualization.plot_slice(studyObject1)# plot the parameter relationship as slice plot 
```

![Output](/engineering-education/optimizing-ml-models-with-optuna/visualization.png)

#### Comparing the optimized model with the base model
The object of study stores all of the information about a particular search history or study. We obtain optimized hyper-parameters using `study.best_params`, which produces a dictionary containing the optimized parameters.

```python
studyObject1.best_params# return parameters of the best trial 
```

Output:

```bash
# Our best trial was 184 and below shows the parameters of the trial. 
{'colsample_bytree': 0.8228985622676791,
 'ourgamma': 0.5064888131479657,
 'maxdepth': 4,
 'child_weight': 1,
 'estimators': 475,
 'ourlearning_rate': 0.053232877076795374,
 'alpha': 1.908137784762065,
 'lambda': 0.03170430168340592,
 'minisample': 0.7131725068799382}
 ```
 
There are no hyper-parameters for the default model, but we will be passing `study1.best_params` to the optimized model, which returns a dictionary of the best hyper-parameters for the model.

The comparison is seen after running the code below:

```python
parameter = {}
print(f"without optimization {return_score(parameter)}")
print(f"with optimization {return_score(studyObject1.best_params)}")
```

Output:

```bash
without optimization 3.218281561235578
with optimization 2.9923284820263603
```

As you can see, we've achieved a lower reading.
> By restricting the ranges of hyperparameters, we can optimize even more.

### Conclusion
In this tutorial, we trained Xgboost on the `boston_housing dataset,` explored hyperparameter optimization in-depth, and analyzed the visualization for better optimization.

In order to create, train, and deploy deep neural networks on a variety of platforms—from cloud infrastructure to mobile devices—MXNet is an open-source deep learning framework. 

Optimization of hyperparameters for the number of layers and hidden nodes in each layer in MXNet can be done in three steps:
1. Accuracy in model training which can be achieved by incorporating an objective function.
2. Using a trial object to suggest hyperparameters.
3. Executing the optimization by creating a study object and running it.

### Reference
- Find the whole code [here](https://colab.research.google.com/drive/1eyNACNEbIn0mQ8-UPxNkz1Ng4ppgCrNr?usp=sharing)
- hyperparameter optimization [framework](https://optuna.readthedocs.io/)

Happy coding!
