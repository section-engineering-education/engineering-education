


### Building an Ensemble Learning Based Regression Model Using Python

Machine learning models are always evaluated based on their performance using specific metrics like; accuracy, precision, Mean Squared Error(MSE) etc. Each type of machine learning problem has its own evaluation metrics. 
Building high performance models (low errors) therefore, depends on achieving the highest evaluation metric score.

### Introduction 

In this tutorial, we shall be building a performance driven linear regression model using ensemble learning. **Linear regression** is a statistical method of modeling the relationship between independent variables (x) and dependent variables (y). It uses independent variables (features) to predict dependent variables (target).

**Ensemble learning** is a machine learning technique that seeks to achieve better predictive performance of model by combining decisions from different models.

For our model's evaluation, we shall be using RMSE (Root Mean Squared Error). 

> **NB:** Regression problems cannot be measured using accuracy metric since the goal is to measure how close the predicted values is to the expected values and not to evaluate how correct the prediction is. Hence we use error to evaluate our models.

### Prerequisite

To follow through the tutorial, you need to:
1. Know the basics of Python
2. Have a [Kaggle](https://www.kaggle.com/) account
3. Know basics of Machine Learning

### Setting Up Your Environment

Before we start building our model, we shall first go to Kaggle and create a new **notebook** and rename it to **Create_Folds**.
![notebook](engineering-education/building-an-ensemble-learning-based-regression-model-using-python/notebook.jpg)
 
After that, [download](https://www.kaggle.com/c/30-days-of-ml/data) the data from Kaggle and add it to your environment using the **Add Data** button and upload the downloaded data as **30daysml**.

>**HINT:**  To flawlessly upload your data to Kaggle, compress the datasets.

### Creating K-Folds
Once done with setting up the environment, we shall move on to creating k-folds for our dataset.
Cross-validation is a validation technique used to evaluate machine learning models on a finite dataset.  It is quite popular as it is easier to understand and results to less biased predictions than other methods like train/test split.

It is also best that whenever you're starting with a machine learning problem, you create folds that you'll be using throughout the modeling process.

#### Importing the necessary Libraries

Before proceeding, we need to import the following necessary libraries.

```python
import numpy as np 
import pandas as pd 
from sklearn import model_selection
```
#### Read Data
```python
train_data = pd.read_csv('/kaggle/input/30daysml/train.csv')
test_data = pd.read_csv('/kaggle/input/30daysml/test.csv')
submission = pd.read_csv('/kaggle/input/30daysml/sample_submission.csv')
```
#### Creating Folds
Let's create a new column with the name *kfold* on the last column as shown below.
```python
train_data['kfold'] = -1
```
We shall then proceed to create 5 folds using the following code block:
```python
kf  = model_selection.KFold(n_splits= 5,shuffle = True, random_state=42)

for fold, (train_indicies,valid_indicies)in enumerate(kf.split(X=train_data)):
    train_data.loc[valid_indicies, "kfold"]=fold
```

After running the cell above, we shall output the *new* csv file (`train_kfolds.csv`) with kfolds by running the code block below:
```python
train_data.to_csv('train_kfolds.csv', index=False)
```
### Building a Regression Model

After creating the kfolds, we shall proceed to download the `train_kfolds.csv` from the output data on our **Create_kFolds** notebook. 

We'll then follow the same steps on [Setting up your environment](#setting-up-your-environment) to create a new notebook called **RegressionModel** and upload the **30daysml** and **`train_kfolds.csv`** data.

After we're done with the environment setup, we'll proceed to build our model.

####  Importing the necessary Libraries

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

We shall then proceed to read our data.

#### Read data

```python
data = pd.read_csv('/kaggle/input/trainfolds/train_kfolds.csv')
test_data = pd.read_csv('/kaggle/input/30daysml-data/test.csv')
submission = pd.read_csv('/kaggle/input/30daysml-data/sample_submission.csv')
```
#### Feature Selection

Here we shall select the useful features from our dataset and remove the not so useful/ impactful features.
To do this, run the following block of code:
```python
useful_features = [i for i in data.columns if i not in ("id", "target","kfold")]
object_cols = [col for col in useful_features if "cat" in col]
test_data = test_data[useful_features]
```
We shall select all features as useful for modeling except `id`, `target`, and `kfold`.

#### Modelling

To build our model, we shall run the following block of code:
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
For each fold, we shall encode the data and then train the model using XGBoost (extreme Gradient Boosting) which is an ensemble learning technique to boost the performance of our model.
XGBoost is a regularized boosting technique that provides high predictive power and is faster compared to other boosting techniques.
We shall then evaluate each fold individually and print out the results of the model.
 
 #### Model Evaluation
  
 After individually evaluating each fold, we shall now evaluate our model's performance by getting mean of the predictions on our test data. To do this, use the following code block:
 
```python
preds = np.mean(np.column_stack(final_predictions), axis=1)
```
To see how our model performed, we shall output the results of our model's prediction using the following code:
```python
submission.target =preds
submission.to_csv("submission1.csv", index=False)
``` 
>**N/B:** You can submit a late submission to 30 days ML Kaggle challenge and see how your model peforms.

### Hyperparameter optimization

In this process, we'll be fine-tuning and optimizing our model's algorithm paremeters until we achieve the desired result.
A few common XGBoost parameters with a large effect on the model perfomance include; **n_jobs**, **max_depth**, **learning_rate**, **n_estimators**, **colsample_bytree**, and **subsample**.
 
### Conclusion

Building a performance-driven model is not a very easy task. It involves refining our model again and again until we get the desired outcome. Either way mastering the art of modeling can be very rewarding. Whether it is in a project or a data science competition.
