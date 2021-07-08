---
layout: engineering-education
status: publish
published: true
url: /data-preprocessing-python/
title: Getting started with data preprocessing in Python
description: 
date: 2021-07-10T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  -url: /engineering-education/data-preprocessing-python/hero.jpg
   alt: Data preprocessing example image
---


Data preprocessing is the first machine learning step in which we transform raw data into a suitable format that makes it easy to implement accurate machine learning models.
In this article, we will learn all the steps that are involved in the data preprocessing phase. 

### Prerequisites

To follow this tutorial comfortably, we need to meet the following conditions.
1. Prior knowledge in python programming.
2. Connected to the internet.
2. Access to Google Colab [Here](https://colab.research.google.com/notebooks/intro.ipynb).

### Mounting our drive to Google Colab

In this article, we shall carry out our data preprocessing activities on Google Colad. Therefore, we need to ensure our Google Drive is accessible by the Google Colab. To ensure this, first, let's download our data to our computer from [here](https://github.com/Madrinmarison/data).

Since we've successfully downloaded our data, let's now upload it to google drive through [google.drive.com](https://drive.google.com/drive/u/0/my-drive).

Now our data is uploaded to Google Drive.

To be able to use this data, we need to give Google Colab access to the drive. To enhance this, in Google Colab, let's type and run the code below.

```python
from google.colab import drive
drive.mount("/content/drive/")
```
Upon executing our code, it will lead us to a Google Authentication stage similar to the figure below.

![Google_Authentication](/engineering-education/data-preprocessing-python/URL.png)

We click on the URL link on your Google Colab interface and proceed to allow permissions until we reach the verification code stage, i.e.

![Verification_code](/engineering-education/data-preprocessing-python/Cpo.png)

We then copy and paste this code in the authorization code box on Colab interface and click **Ctrl + Enter**. This shows that our drive is mounted.

Now that our drive it's successfully mounted in Google Colab, we proceed and import the libraries we shall require to work with along our journey.
To import these libraries, let's type and run the code below.


### Step 1: Importing the Libraries

```Python
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
```
Next, we proceed and import the dataset.

### Step 2: Import the dataset

Let's type and run the following code.

```python
Dataset = pd.read_csv("/content/drive/MyDrive/Dataset.csv")

# importing an array of features
x = Dataset.iloc[:, :-1].values 
# importing an array of dependent variable
y = Dataset.iloc[:, -1].values
```

Above, we specified two variables, x for the features and y for the dependent variable. The features set, as declared in the code `Dataset.iloc[:, :-1]` will consist of all rows and columns of our dataset except the last column. Similarly, the dependent variable y will consist of all rows but only the last column as declared in the code `Dataset.iloc[:, -1].values`

Let's have a look at our data by executing the code.

```Python
print(x) # returns an array of features
```

![Features_Array](/engineering-education/data-preprocessing-python/Feature.array.png)

```Python
print(y) # viewing an array of the dependent variable.
```
![Features_Array](/engineering-education/data-preprocessing-python/dependent_variable.png)

Our data is imported successfully in the form of an array of features x and a dependent variable y.

### Step 3: Taking care of the missing data

We notice that x, an array of our features, contains missing values in the Age and Salary column from our output. We need to deal with this problem before we can implement our machine learning models on our data. There exist two techniques that we use to deal with the missing value:

1. **Deleting the observation reporting the missing value(s):**

This technique works well with big datasets with few missing values. For instance, deleting a row from a dataset with hundreds of observations cannot affect the information quality of the dataset. However, this technique is not suitable for the dataset reporting many missing values. Deleting many rows from a dataset can lead to information loss information.

To ensure no crucial information is lost, we need to make use of an appropriate technique.

2. **Replace the missing value(s) with the average of the variable in which the data is missing:**

This technique has reported no harm to the dataset's quality; therefore, it's the technique that we most use to handle missing values.

Now that we know the techniques we use to take care of the missing values let's handle this problem in our dataset. Since our dataset is small, we cannot eliminate a row reporting the missing value(s). Therefore we shall make use of the second technique.

The code below will solve this problem present in our dataset.

```Python
# Importing the class called SimpleImputer from impute model in sklearn
from sklearn.impute import SimpleImputer
# To replace the missing value we create below object of SimpleImputer class
imputa = SimpleImputer(missing_values = np.nan, strategy = 'mean')
''' Using the fit method, we apply the imputa object on the matrix of our feature x.
The `fit()` method identifies the missing values and computes the mean of such feature a missing value is present.
'''
imputa.fit(x[:, 1:3])
# Repalcing the missing value using transform method
x[:, 1:3] = imputa.transform(x[:, 1:3])


```
Upon executing the code, we obtain a matrix of features with the missing values replaced.

![Handling missing_values](/engineering-education/data-preprocessing-python/missing_values.png)

The missing value on the age column is replaced with the mean of the age column, i.e., 38.77777777777778. Similarly, the missing value on the salary column is replaced with the mean of such a column, i.e., 63777.77777777778.

### Step 4: Encoding categorical data

In encoding, we transform text data into numeric data. Encoding Categorical data, therefore, involves changing data that fall into categories into numeric data. 

The `Country` and the Purchased columns of our dataset contain data that fall into categories. Since machine learning models are based on the mathematical equation, which takes only numerical inputs, it will be difficult for the machine learning model to compute the correlation between the feature and the dependent variables. To ensure this does not happen, we need to convert those string entries into numbers, i.e., we shall encode France into 0, Spain into 1, and Germany into 2. However, our future machine learning model can interpret the numerical order between 0 for France, 1 for Spain, and 2 for Germany do matter, which is not the case. To ensure this misinterpretation does not occur, we make use of one-hot encoding. One-hot encoding converts ours country column into three columns and creates a binary vector for each country such that there is no numerical order between the country categories. Therefore, instead of encoding the country variable into 1,2, and 3, vectors [1, 0 ,0] for the France, [0, 1, 0] for the Spain and [0, 0, 1] for the Germany. Similarly, we shall encode the Purchased column into 1,s for Yes and 0,s for No.

First, let us start with encoding the country column, which falls on the features subset x.

To achieve this, let us execute the code below.

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [0])], remainder= 'passthrough')
x = np.array(ct.fit_transform(x))
```
**Output**
```Python
# executing the cell we obtain:
print(x)
```
![Encoded Country column](/engineering-education/data-preprocessing-python/Encoding_country.png)

  From the output,the country column has been transformed into 3 columns with each row representing only one encoded column where, France was encoded into a vector [1.0 0.0 0.0], Spain encoded into a vector [0.0 0.0 1.0], and Germany encoded into a vector [0.0 1.0 0.0] and they're all unique.

To encode our depended variable y, let's run the code below.

 ```python
 from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)
```

**Output**
```Python
print(y)
```
```python
[0 1 0 0 1 1 0 1 0 1]

```
Our dependent variable is encoded successfully into 0's and 1's.

### Step 5: Splitting the dataset into the training and test set

In machine learning, we split the dataset into a training set and test set. The training set is the fraction of a dataset that we use to implement the model. On the other hand,  the test set is the fraction of the dataset that we use to evaluate the performance our the model. The test set is assumed to be unknown during the process of the model implementation.
We need to split our dataset into four subsets, i.e., x_train, x_test, y_train, and y_test. 

Here is how we acheive this:

```python
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.2,random_state= 1)
```
**Output:**

Let's print the output by executing the code below.
```python
print(x_train)
```
![Training set](/engineering-education/data-preprocessing-python/x_train.png)
 ```python 
print(x_test)
```
```python
[[0.0 1.0 0.0 30.0 54000.0]
 [1.0 0.0 0.0 37.0 67000.0]]
 ```
 ```python 
print(y_train)
```
![y_train](/engineering-education/data-preprocessing-python/y_train.png)
```python
print(y_test)
```
```Python
[0 1]
```
Our dataset is successfully split. Our features set was divided into eight observations for the training set and 2 for the test set, which corresponds( since we set our seed, random = 1) to the same splitting of the dependent variable y. We need to note that the selection is made randomly, and it's possible at any single execution to obtain different subsets other than the above output.

### Step 6: Feature scaling

In most cases, we shall work with datasets whose features are not on the same scale. Some features often have huge values, and others have small values. If we implement our machine learning model on such datasets, features with huge values will dominate ones with small values, and the machine learning model will treat ones with small values as if they don't exist. Their influence on the data will therefore not accounted for. To ensure this is not the case, we need to scale our features on the same range, i.e., within the interval of -3 and 3

Therefore, we shall only scale the age and salary columns of our feature set into this interval. The code below enables us to achieve this.

```python
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
# we only aply the feature scaling on the features other than dummy variables.
x_train[:, 3:] = sc.fit_transform(x_train[:, 3:])
x_test[:, 3:] = sc.fit_transform(x_test[:, 3:])
```
Printing the code we obtain:
```Python
print(x_train)
```
![Scaled Feature](/engineering-education/data-preprocessing-python/scaled.png)

```Python
print(x_test)
```

```python
[[0.0 1.0 0.0 -1.0 -1.0]
 [1.0 0.0 0.0 1.0 1.0]]
```
We need to understand that we scaled only the age and salary columns of our features data subset x and not on the dummy variable because scaling the dummy variable may interfere with its intended interpretation even though they fall within the required range.

### Conclusion

To this point, we have prepared our data wholly, and it is now ready to be fed into various machine learning models. The data at this point is free from irregularities and the models can make analytical sense of the dataset. I hope you found this helpful. Happy learning.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

