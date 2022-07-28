---
layout: engineering-education
status: publish
published: true
url: /probability-predictions-on-multi-class-labels/
title: Guide to Probability Predictions on Multi-class Labels
description: In this tutorial, the reader will learn about probability predictions on multi-class labels.
author: mwaniki-njagi
date: 2022-07-28T00:00:00-11:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/probability-predictions-on-multi-class-labels/hero.jpg
   alt: Probability Distributions and their Simulations in R Hero Image
---
Classification problems are among the most common problems in machine learning. It is, therefore, necessary to understand that there are multiple ways one can solve these problems.
<!--more-->

The most common way to solve classification problems is by getting discrete or explicit categorizations as dictated by the nature of the issues in question. This does not always have to be the case as it is possible to solve classification problems by using probability instead of discrete classes of values in a given category.  

By using this method you can assess the likelihood of a given set of features to give the desired label in comparison to other labels.

Additionally, it may also be desirable to make a clear visualization on a table that would compare all these different labels and the probabilities in order to have a more robust understanding of the nature of our predicted data.

### Prerequisites
- [Python 3 and above.](https://www.python.org/)
- [Pandas.](https://pandas.pydata.org/)
- [Scikit-learn and its dependcies.](https://scikit-learn.org/stable/)
- Matplotlib installed.
- XGBoost
- An appropriate IDE or environment.
- A desire to learn.

### Introduction
This particular kind of problem is known as imbalanced classification. There are a few things that are needed in order to perform successful classifications using this method. Some prior knowledge on loss functions and hyperparameter tuning may be needed. We will learn about imbalance classification but this will be a beginner lesson to introduce the core concept.

The exploratory data analysis and data preprocessing steps required to achieve this will be akin to normal workflow.

Let's get to it!

### Steps 
1. Loading the dataset
2. Performing simple exploratory data analysis.
3. Using a model that will predict the probabilities.
4. Arranging the different predictions in a table for proper comparison.
  
### 1. Loading the dataset
We will use a common dataset. This will require a time-consuming preprocessing method. The best candidate for this is the famous Iris dataset that could be found either in [Scikit-learn](http://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html) or downloaded on [Kaggle](https://www.kaggle.com/datasets/uciml/iris?resource=download).

The first step is to call all the libraries that we need.

```python
import pandas as pd
import matplotlib.pyplot as plt
from xgboost import XGBClassifier
from sklearn.preprocessing import 
```

We will then load the dataset and have a look at the data.
```python
df = pd.read_csv("Iris.csv")
df = pd.drop(["Id"], axis=1) #This drops the Id column that is not needed
print(df.head())
```

The code above gives us a look at the first five rows of our data.

```bash
SepalLengthCm | SepalWidthCm | PetalLengthCm | PetalWidthCm | Species
    
0 |5.1 | 3.5 | 1.4 | 0.2 | Iris-setosa 
1 |4.9 | 3.0 | 1.4 | 0.2 | Iris-setosa 
2 |4.7 | 3.2 | 1.3 | 0.2 | Iris-setosa 
3 |4.6 | 3.1 | 1.5 | 0.2 | Iris-setosa 
4| 5.0 | 3.6 | 1.4 | 0.2 | Iris-setosa 
```

###  2. Performing simple exploratory data analysis
The next step is checking whether the data is heavily skewed in any one direction.

```python
print(df["SepalLengthCm"].skew())
print(df["SepalWidthCm"].skew())
print(df["PetalLengthCm"].skew())
print(df["PetalWidthCm"].skew())
```

The above code gives us four distinct numbers that show that the data is not exceedingly skewed to need skew-reducing transformations.

```bash
The values that the above code presents
0.3149109566369728 
0.3340526621720866
-0.27446425247378287
-0.10499656214412734
```

Another practical step would be to have a look at the numerical values that may be of importance such as mean, standard deviation, and the count of the values. All of this can be achieved by running one line of code.

```python
df.describe()
```

|     | SepalLengthCm | SepalWidthCm | PetalLengthCm | PetalWidthCm |
| --- | --- | --- | --- | --- |
| count | 150.000000 | 150.000000 | 150.000000 | 150.000000 |
| mean | 5.843333 | 3.054000 | 3.758667 | 1.198667 |
| std | 0.828066 | 0.433594 | 1.764420 | 0.763161 |
| min | 4.300000 | 2.000000 | 1.000000 | 0.100000 |
| 25% | 5.100000 | 2.800000 | 1.600000 | 0.300000 |
| 50% | 5.800000 | 3.000000 | 4.350000 | 1.300000 |
| 75% | 6.400000 | 3.300000 | 5.100000 | 1.800000 |
| max | 7.900000 | 4.400000 | 6.900000 | 2.500000 |

The results above allows us to extract a few key insights and trends that will be of use later. For example, from the data provided we could infer that on average, the highest values are in the SepalLengthCm column while the lowest are in the PetalWidthCm column. But this may be of no advantage as we are looking at all three categories of species.

What results would arise from individually describing the different species?

Let's have a look at Iris-virginica and compare it with Iris-setosa.

Iris-virginica:
```python
#Drops Iris-setosa and Iris-versicolor
df = df[df["Species"].str.contains("Iris-setosa|Iris-versicolor")== False]
df.describe()
```

|     | SepalLengthCm | SepalWidthCm | PetalLengthCm | PetalWidthCm |
| --- | --- | --- | --- | --- |
| count | 50.00000 | 50.000000 | 50.000000 | 50.00000 |
| mean | 6.58800 | 2.974000 | 5.552000 | 2.02600 |
| std | 0.63588 | 0.322497 | 0.551895 | 0.27465 |
| min | 4.90000 | 2.200000 | 4.500000 | 1.40000 |
| 25% | 6.22500 | 2.800000 | 5.100000 | 1.80000 |
| 50% | 6.50000 | 3.000000 | 5.550000 | 2.00000 |
| 75% | 6.90000 | 3.175000 | 5.875000 | 2.30000 |
| max | 7.90000 | 3.800000 | 6.900000 | 2.50000 |

Iris-setosa:

```python
#Drops Iris-virginca and Iris-Versicolor
df = df[df["Species"].str.contains("Iris-virginica|Iris-versicolor")== False]
df.describe()
```  

|       | SepalLengthCm | SepalWidthCm | PetalLengthCm | PetalWidthCm |
|-------|---------------|--------------|---------------|--------------|
| count | 50.00000      | 50.000000    | 50.000000     | 50.00000     |
| mean  | 5.00600       | 3.418000     | 1.464000      | 2.02600      |
| std   | 0.35249       | 0.381024     | 0.173511      | 0.10721      |
| min   | 4.30000       | 2.300000     | 1.000000      | 0.10000      |
| 25%   |  4.80000      | 3.125000     | 1.400000      | 0.20000      |
| 50%   | 5.00000       | 3.400000     | 1.500000      | 0.20000      |
| 75%   | 5.20000       | 3.675000     | 1.575000      | 0.30000      |
| max   | 5.80000       | 4.400000     | 1.900000      | 0.60000      |

The insights are now clearer as we are comparing two different categories. There is a distinct difference in the means that highlight that we are dealing with different ranges here.

### 3. Using a model that will predict the probabilities
My desired model for this is XGBoost as it will quickly get us to a solution that we may desire.

```python
X = df.drop(["Species"], axis=1)
y = df["Species"]
#performing train test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=5)
#Training XGBoost
model = XGBClassifier(eval_metric = "mlogloss")
model.fit(X_train, y_train)
y_predict = model.predict_proba(X_test)
print(y_predict)
```

After performing train-test-splits to avoid overfitting data we expect three new columns representing the 3 different species and their probability values. We use [logloss](https://towardsdatascience.com/intuition-behind-log-loss-score-4e0c9979680a#:~:text=Log%2Dloss%20is%20indicative%20of,is%20the%20log%2Dloss%20value) for this type of prediction in our XGBoost model as it tells us whether our values are close to the true value which is either 0(false) or 1(true).

The first two rows will appear in this manner:

```bash
[[2.5100906e-03 9.9584949e-01 1.6403686e-03]
[1.6350182e-02 6.5069902e-01 3.3295083e-01]
[1.0797891e-03 2.8213044e-03 9.9609888e-01] 
[9.9380070e-01 4.2259935e-03 1.9732981e-03] 
[1.3190582e-03 2.5665318e-03 9.9611437e-01]]
```

They will be in the order of the appearance of unique labels in the "Species" column. Any value greater than 0.5 will be considered the best candidate for the given identity if the model is as accurate as it could be. 

But this is not the last step. We may need to present this in a dataset for presentation or submission in a given situation. The next step would be to transfer the probabilities in the array and assign them to unique columns.

### 4. Arranging the different predictions in a table

```python
y_predict_0 = y_predict[:, 0]
y_predict_1 = y_predict[:, 1]
y_predict_2 = y_predict[:, 2]
#Assigning values to columns and a new file
predicted = pd.DataFrame() #Creates empty dataframe
predicted["Iris-setosa"] = y_predict_0
predicted["Iris-versicolor"] = y_predict_1
predicted["Iris-virginica"] = y_predict_2
predicted.to_csv("predicted.csv", index = False)
predicted.head()
```

```bash
Iris-setosa,Iris-versicolor,Iris-virginica
.0025100, .9958490, .00164010
.0163500, .6506990, .33295120
.0010800, .0028210, .99609930
.9938010, .0042260, .00197340
.0013190, .0025670, .996114

```

### Conclusion
We now have a file that can be used for submissions if the need ever arose. There is one peculiar problem. Since there are no identification indices, we cannot tell which particular data these observations arose from. 

This is specifically because we used test data extracted from the original file. In a situation where both train and test files are offered, there will be no use to drop the identification in the test file.

Hope you found this tutorial useful. 

Happy coding!