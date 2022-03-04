Software framework Optuna is used to automate optimization processes. It uses a variety of samplers, including grid search, random, bayesian, and evolutionary algorithms, to find the best values for hyperparameters. If you use machine learning methods, a `hyperparameter` is a parameter that may be changed to influence the learning process. Using our data, we'll tweak the model's learning parameters.

It is possible to use various resources to improve our model. Ensure that the ML model is acceptable for our data and required. The following section will discuss enhancements and new applications for `Xgboost` regressors which is an open-source library that implements the gradient boosting algorithm in an effective manner.
### Prerequisites
- Have a basic knowledge of [Flutter](https://flutter.dev/).
- Have flutter installed in your IDE.
### Table of contents
- [Reasons for using Optuna](#reasons-for-using-optuna)
- [Optuna functionalities](#optuna-functionalities)
- [Optimization process](#optimization-process)
- [Conclusion](#conclusion)
### Reasons for using Optuna
- The length of the optimization procedure may be specified.
- Pandas DataFrame integration.
- Pruning is a technique that the algorithm uses to eliminate poor-quality samples quickly.

The Optuna software framework automates the hyperparameter optimization process. **Tree-structured Parzen Estimator** is the name of the `Bayesian` optimization algorithm it uses. According to Bayesian fine-tuning, once it stops improving our score anymore, it stops looking for new ones.

### Optuna functionalities
- Installation is quick and easy, and there are only a few prerequisites to meet.
- To conduct large-scale investigations, optuna provides minimal or no code modifications.
- Analyzes optimization results using a wide range of graphing tools.
### Optimization process
#### Importing necessary modules
We will build a base model by first incorporating essential modules and data into a dataframe. 

1. **Loading the dataset**

```python
import sklearn
#pandas data frame will be used to segregate features and targets 
import pandas as pan
import numpy as num
from sklearn.datasets import load_boston
```
2. **Standard scaling the dataset**

 A pandas data frame will be used to segregate features and targets when the data is returned as a matrices by `load boston()`.
```python
Our_loadboston = load_boston()
dataframe = pan.DataFrame(Our_loadboston.data , columns = Our_loadboston.feature_names)
dataframe['target'] = Our_loadboston.target
X = dataframe.iloc[:,dataframe.columns != 'target']
y = dataframe.target
from sklearn.preprocessing import StandardScaler
standardSc = StandardScaler()
X = standardSc.fit_transform(X)
```
3. **Dataset splitting**

By dividing the dataset into train and test, the model is better able to reach a convergent state.
```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train,y_test = train_test_split(X, y, test_size = 0.2, random_state = 12)
```
#### Testing the model
We can see how much better our model is after fine-tuning the parameters by testing the model. We will use the `cross_val_score()` method to evaluate a score and xboost for gradient boosting algorithm. 
> Keep in mind that this is not the optimized model. We are testing the base model first.


```python
import xgboost as gbst
from sklearn.model_selection import cross_val_score
xgboo_reg = gbst.XGBRegressor()
# Cross-validation is a method for evaluating a score
ourScores = cross_val_score(xgboo_reg, X_train,y_train , scoring = 'neg_root_mean_squared_error',
                            #using all available CPUs
                            n_jobs = -1,cv = 10)
print(num.mean(ourScores), num.std(ourScores))
print(ourScores)
```
Output:
```bash
-3.0784942308511307 0.42284534035667176
[-2.62847993 -3.60582341 -3.31998107 -3.60355075 -3.03760446 -2.50243868 -2.92302011 -2.61990331 -3.67855489 -2.8655857 ]
```
#### Defining Functions
We will define the functions that takes hyperparameters and return scores in this section.

`return_score()` will be used to provide a cross-verified score based on keyword arguments that we will send to it. We will take 1000 samples to save time.
```python
def return_score(param):
  ouNewModel = gbst.XGBRegressor(**param)  
  regressionModelse = -num.mean(cross_val_score(ouNewModel,X_train[:1000],y_train[:1000], cv = 4, n_jobs =-1,scoring='neg_root_mean_squared_error'))
  return regressionModelse
```
#### Importing optuna
This is where we import Optuna. You can use the pip command to install.

An objective function may be examined via a trial to see whether it successfully tunes.
```python
import optuna
# The Samplers class defines our hyper-parameter space.
from Optuna import Trial, visualization
from optuna.samplers import TPESampler
```
#### Creating the primary objective function
We place all the possible hyper-parameter ranges first, and the method accepts and takes a trial object. The method should return a score value.

Hyper-parameter values can be defined in a variety of ways:
1. **trial.suggest_loguniform(‘learning_rate’,0.05,0.5)** to show log distribution between 0.05 and 0.5.
2. **trial.suggest_uniform(‘reg_lambda’,0,2)** to show uniformly distributed numbers between 0 and 2.
```python
def objective(trial):
  parameter = {
                "n_estimators" : trial.suggest_int('n_estimators', 0, 500),
                'subsample':trial.suggest_uniform('subsample',0.4,0.9),
                'gamma':trial.suggest_uniform('gamma', 0, 4),
                'reg_alpha':trial.suggest_uniform('reg_alpha',0,6),
               #uniformly distributed numbers between 0,2
                'reg_lambda':trial.suggest_uniform('reg_lambda',0,2),
                'min_child_weight':trial.suggest_int('min_child_weight',0,5),
                'learning_rate':trial.suggest_loguniform('learning_rate',0.05,0.5),
               #log distribution between [0.05,.5]
                'colsample_bytree':trial.suggest_uniform('colsample_bytree',0.4,0.9),
                'max_depth':trial.suggest_int('max_depth', 3, 5),
                'nthread' : -1
            }
  #returns the regressionModelse score
  return(return_score(parameter))
```
You can follow this [link](https://xgboost.readthedocs.io/en/latest/parameter.html) for more detail on hyper-parameters.
#### Creating an optuna–study object
This study object stores all the information about the hyper-parameters tested under that research.

In the below cod snippet, optimization's parameters and history are stored in an object created by `studyObject1`.
```python
studyObject1 = optuna.create_study(
    direction='minimize',sampler=TPESampler())
    # Bayesian Sampling Technique
studyObject1.optimize(objective, n_trials= 500)
```
After running i found that my best trial was 459.

Output:

![Best trial](/engineering-education/optimizing-ml-models-with-optuna/trial.png)
#### Visualizing search history
Our model can readily be shown to be affected by hyper-parameters by looking at the search history. It is possible to further decrease the scope of our search by cutting down the search parameters.
```python
optuna.visualization.plot_slice(studyObject1)
```
#### Comparing the optimized model with the base model
No hyper-parameters for the default model, but we are passing `study1.best_params` to the optimized model which returns a dictionary of the best hyper-parameters for the model.

The object of study encompasses all of the information about a certain inquiry or study. Best parameters are returned by `studyObject1.best_params.`
```python
studyObject1.best_params
```
Output:
```bash
{'colsample_bytree': 0.8228985622676791,
 'gamma': 0.5064888131479657,
 'max_depth': 4,
 'min_child_weight': 1,
 'n_estimators': 475,
 'ourlearning_rate': 0.053232877076795374,
 'reg_alpha': 1.908137784762065,
 'reg_lambda': 0.03170430168340592,
 'subsample': 0.7131725068799382}
 ```
Let's examine how far we've come with our model:
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
Following fine-tuning, as you can see, we've achieved a lower reading.
> By restricting the ranges of hyperparameters, we can fine-tune even more.
### Conclusion
ML models may be improved, and improved parameters can be discovered in this post. It's possible to make it even better by reducing the ranges of the learning parameters.

Hyperparameter optimization for the number of layers and hidden nodes in each layer in MXNet can be done in three steps:
1. Accuracy in model training can be achieved by incorporating an objective function.
2. Use a trial object to suggest hyperparameters.
3. Execute the optimization by creating a study object and running it.
### Reference
- Find the whole code [here](https://colab.research.google.com/drive/1eyNACNEbIn0mQ8-UPxNkz1Ng4ppgCrNr?usp=sharing)
- hyperparameter optimization [framework](https://optuna.readthedocs.io/)
