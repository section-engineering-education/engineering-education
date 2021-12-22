---
layout: engineering-education
status: publish
published: true
url: /feature-scaling-effects-machine-learning-model/
title: Effects of Feature Scaling on a Machine Learning Model
description: This article will discuss the effects of feature scaling on a machine learning model.
author: samuel-mwangi
date: 2021-12-21T00:00:00-13:13
topics: [Machine learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/feature-scaling-effects-machine-learning-model/hero.jpg
    alt: Effects of Feature Scaling Hero Image
---
The datasets that we use for training models in machine learning have unpredictable values that might vary from each other on a broad scale. Numerical values might have big differences amongst themselves, especially when they represent different scales, and this might make it difficult to compare them, i.e., kg, litres, millimetres, miles, pixels, etc.
<!--more-->
Feature scaling is introduced to solve this challenge. It adjusts the numbers to make it easy to compare the values that are out of each other's scope. This helps increase the accuracy of the models, especially those using algorithms that are sensitive to feature scaling, i.e., Gradient Descent and distance-based algorithms.

There are two techniques of scaling features:
1. **Normalization** - the values are rescaled to range between zero and one.
2. **Standardization** - the values are rescaled to center around the mean with units of standard deviation.

Choosing which to use on your dataset is subjective to your dataset, the machine learning algorithm, and the type of problem you might solve.

In this approach, we will learn how to implement each. We will first build a prediction model without feature scaling, one with standardized features, and lastly, one with normalized features. We will also use the same dataset for the three to compare how our dataset affects the choice of the technique we use.

### Table of contents
- [Prerequisites](#prerequisites)
- [Importing the libraries](#importing-the-libraries)
- [The initial model](#1the-initial-model)
- [Using Standard Scaling](#2using-standard-scaling)
- [Using Normalization](#3using-normalization)
- [Effects of the feature scaling](#effects-of-the-feature-scaling)
- [Choosing between the two scaling techniques](#choosing-between-the-two-scaling-techniques)
- [Exceptions](#exceptions)
- [Conclusion](#conclusion)

###  Prerequisites
We will need to have:
1. A fundamental knowledge of Python programming language.
2. A fundamental knowledge in Machine Learning.
3. Jupyter Notebook/ Jupyter Lab/ Google Colab.

Using the given data for training, we will build models to predict if a patient was diagnosed with either disease `M` or `B`.

###  Importing the libraries
In our notebook, let us import the following libraries and run the cell:

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler, MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC,SVC
from sklearn.metrics import classification_report
```
### 1.The initial model

#### (i) Fetching the dataset from github
We will use pandas to read the CSV file from the raw dataset URL:

```python
url = 'https://github.com/Sajeyks/Section-dataset1/blob/main/data.csv?raw=true'
df = pd.read_csv(url,index_col=0)
```
#### (ii) Exploring our dataset
We will use `df.info` to check what our dataset consists of:

```python
df.info()
```
Output:

![df.info()](/engineering-education/feature-scaling-effects-machine-learning-model/df-info.jpg)

As you can see, our dataset entails 32 columns, where most are floats, and one contains objects. The first 31 columns are also in a good state; hence no need for replacing or removing some rows. 

We can also use `df.head()` to have a look at the values in the first ten rows of our dataset:
 
 ```python 
 df.head(10)
 ```
 Output:
 
![fd.head(10)](/engineering-education/feature-scaling-effects-machine-learning-model/df-head.jpg)

####  (iii) Preparing the dataset
We will now select a set of attributes that can affect the dependent variables (diagnosis) in our dataset:

```python
my_features = ['radius_mean', 'perimeter_mean', 'area_mean', 'compactness_mean', 'concavity_mean', 'concave points_mean',
               'perimeter_worst', 'area_worst', 'compactness_worst', 'concavity_worst', 'concave points_worst']
``` 
Then we will split the data between `y(dependent)` and `X(independent)` variables:

```python
y = df.diagnosis
X = df[my_features]
```
As we saw above, y(diagnosis) is an object data type used to represent the status of the diagnosis. Machine learning algorithms only work with numerical values; hence we need to represent our diagnosis status numerically. To do that, we will use a `LabelEncoder`. We have two categories of diagnosis status, `M` and `B`. The label encoder will change them to categories of `1` and `0`, respectively:

```python
lb = LabelEncoder()
y = lb.fit_transform(df.diagnosis)
```
If you check `y` now, you will see that it transformed into an array of `1's` and `0's`:

```python
print(y)
```
Output:

![print(y)](/engineering-education/feature-scaling-effects-machine-learning-model/print-y.jpg)

After that, we can now go ahead and split our dataset into the training set and testing set in the ratios of 30:70:

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)
```
#### (iv) Fitting the model
We will use `LinearSVC` to build a Support Vector Classifier model that categorizes our data into either one of the two diagnosis statuses:

```python
classifier = LinearSVC()
# fitting model
classifier.fit(X_train,y_train)
# predict
y_predict = classifier.predict(X_test)
# check accuracy
accuracy_b4 = classifier.score(X_test, y_test)
```
#### (v) Predicting
We can then print both the prediction and testing sample and try to compare the results:

```python
print(y_predict)
```
![print(y_predict)](/engineering-education/feature-scaling-effects-machine-learning-model/y-predict.jpg)

```python
print(y_test)
```
![print(y_test)](/engineering-education/feature-scaling-effects-machine-learning-model/y-test.jpg)

###  2.Using Standard Scaling
We will build another model that uses `standard scaling` to level the dataset before fitting.

####  (i) Creating and analyzing dataframe
Use the code below to import the dataset and read then create the second dataframe:

```python
df1 = pd.read_csv(url,index_col=0)
# dataframe summary
df1.head(10)
```
Take note of how the values across the columns are distributed in a wide range, i.e., some are 122.80 and others 0.11840:

![df.head(10)](/engineering-education/feature-scaling-effects-machine-learning-model/df-head.jpg)

####  (ii) Implementing standard scaling
To scale properly, we will first collect the names of all the numerical columns in a list then use the list to fit the standard scaler.

```python 
col =[]
for col_name in df1.columns:
    if df1[col_name].dtype=='object':
        pass
    else:
        col.append(col_name)
# fitting the standard scaler
for i in col:
    sc = StandardScaler().fit(df1[[i]])
    df1[i] = sc.transform(df1[[i]]) 
``` 
Using `standard scaler` from `sklearn`, we could rescale our features using the `standardization` technique.

Now, if we check our `df1` again, you will notice how the range between the values has been reduced:

```python
df1.head(10)
```
![df.head(10)](/engineering-education/feature-scaling-effects-machine-learning-model/df1-head-after.jpg)

#### (iii) Splitting our dataset 
`y1` is given diagnosis status that is already encoded in numerical form, while `X1` is assigned the same features as the first model.

```python
lb = LabelEncoder()
y1 = lb.fit_transform(df1.diagnosis)
X1 = df1[my_features]
```
After that, we can now go on and split our dataset further into the training and testing sets:

```python
x_train1, x_test1, Y_train1, Y_test1 = train_test_split(X1, y1, test_size=0.3, random_state=1)
```
####  (iv) Fiting the model
We will fit our model using the same algorithm we used in the first model:

```python
classifier = LinearSVC()
# fit model
classifier.fit(x_train1, Y_train1)
# predicting
Y_predict1 = classifier.predict(x_test1)
# accuracy
accuracy_after_stdScaler = classifier.score(x_test1, Y_test1)
```
#### (v) Predicting
To check the predictions, we will use:

```python
print(Y_predict1)
```
Let us compare the results with the test set:
```python
print(Y_test1)
```
###  3.Using Normalization
We will now build the final model that also uses the same training algorithm and dataset, but the dataset will first go under normalization before being used.

####  (i) Creating a Dataframe
As in the above models, we first need to fetch and our dataset, then store it in a dataframe.

```python
df2 = pd.read_csv(url,index_col=0)
## df2 summary
df2.describe()
```
Take note of the values:

![df2.describe()](/engineering-education/feature-scaling-effects-machine-learning-model/df2-before.jpg)

####  (ii) Spliting data between dependent (Y) and independent (X) variables
Here we will select the target, features, and label encode our non-numerical target (y2).

```python
lb = LabelEncoder()
y2 = lb.fit_transform(df2.diagnosis)
X2 = df2[my_features]
```
#### (iii) Implementing Normalization
The next and also critical part in this model's preparation is `normalizing` the dataset, in this case, the features:

```python
norm = MinMaxScaler()
X2 = norm.fit_transform(X2)
```
Now, let us take a look at our dataset after normalization:
```python
X2_df = pd.DataFrame(X2)
X2_df.describe()
```
![df2.describe()](/engineering-education/feature-scaling-effects-machine-learning-model/df2-after.jpg)

If you compare this description with the one above, you will notice the difference. If you check the `min` and `max` values for all the columns, they are `0` and `1`, respectively. This means our features are now rescaled between 1 and zero.

#### (iv) Splitting dataset into training and testing sets
Now we can split our dataset into training and testing sets:

```python
X_train2, X_test2, y_train2, y_test2 = train_test_split(X2, y2, test_size=0.3, random_state=1)
```
####  (v) Fitting the model
We will use the same process of fitting as the one used for the previous two models:

```python
classifier = LinearSVC()
# fit model
classifier.fit(X_train2, y_train2)
#predicting
y_predict2 = classifier.predict(X_test2)
#accuracy
accuracy_after_normalization = classifier.score(X_test2, y_test2)
```
#### (vi) Predicting
To compare the test values and predicted values:
```python
print(y_predict2)
```
Also :
```python
print(y_test)
```

###  Effects of feature scaling 
We used variables to store the accuracy of each model. To check them out, we need to print them:

```python
print("Accuracy 1 :", accuracy_b4, "   Accuracy 2 :", accuracy_after_stdScaler, "    Accuracy 3:", accuracy_after_normalization)
```
![print(accuracy)](/engineering-education/feature-scaling-effects-machine-learning-model/accuracy.jpg)

As you can see above, the accuracy score of a `feature scaled` model is higher than that of the initial one. This goes on to demonstrate the effects of feature scaling on the models.

> You will also note that the accuracy of the feature-scaled models is consistent while that of the initial(unscaled) model keeps fluctuating despite setting a random state value.

###  Choosing between the two scaling techniques
When it comes to choosing between `normalization` and `standardization`, it depends on:
1. The dataset property- normalization is preferred if your dataset doesn't follow Gaussian Distribution.
2. Performance - you should try to use both and compare which works better for your model. As for us, `Standard Scaling` gives better results.

###  Exceptions
1. Feature scaling is not required when using tree-based algorithms, i.e., Random Forest and Decision Tree. 
2. When using standardization with a dataset that contains categorical data that is one-hot encoded, you should exclude the encoded columns. Not doing so might lead to your dataset losing its categorical property. 

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1v_KegBZvxju3DxGcnsTjQcy_6lPIPG_i?usp=sharing).

### Conclusion
We have learned the importance of `feature scaling`, looked at both the `Standard Scaling` technique and `Normalization` technique, and learned how to implement each and compared the results of using each. As we have learned from comparing the results, `feature scaling` can significantly boost a model's performance. It also helps stabilize the accuracy of a model. You can now choose and implement these `feature scaling` techniques in your machine learning projects. 

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
