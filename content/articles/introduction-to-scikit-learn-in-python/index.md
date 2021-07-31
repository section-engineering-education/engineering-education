---
layout: engineering-education
status: publish
published: true
url: /introduction-to-scikit-learn-in-python/
title: Introduction to Scikit Learn in Python
description: This tutorial will be a brief dive into the multi-faceted world of scikit-learn in Python. SciKit-Learn is a vital library used to build statistical models to make predictions.
author: prashanth-saravanan
date: 2021-01-25T00:00:00-15:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-scikit-learn-in-python/hero.png
    alt: Regular Repression in Python example image
---
The concept of machine learning has been booming over the past few years, and more often than not, graduate students and industry professionals have made a career switch to data science or machine learning. An essential ingredient for establishing familiarity in this field is to know your libraries and dependencies.
<!--more-->
### Introduction to Scikit-Learn in Python
A significant chunk of your work goes towards having the right approach towards the problem and manipulating the dataset regarding your approach. This multi-part article introduces the reader to SciKit-Learn, a vital library used to build statistical models to make predictions.

### Prerequisites
The reader is expected to understand basic libraries like NumPy and Pandas, machine learning, and machine learning algorithms, including linear and logistic regression, support vector machines and decision trees, and boosting algorithms. 

For a better understanding, the reader is advised to go through the following articles on [Python](https://www.w3schools.com/python/), [NumPy](/introduction-to-numpy/), [Matplotlib](/matplotlib-visualization-python/) and [SciPy](https://www.tutorialspoint.com/scipy/index.htm).

### Table of contents
1. [Introduction](#introduction)
2. [Installing the Scikit-Learn Library](#installing-the-scikit-learn-library)
3. [Dataset Transformations using sklearn](#dataset-transformations-using-sklearn)
4. [Scikit-Learn for Standardization](#scikit-learn-for-standardization)
5. [Scikit-Learn for Normalization](#scikit-learn-for-normalization)
6. [Scikit-Learn when Encoding Categorical Features](#scikit-learn-when-encoding-categorical-features)
7. [Scikit-Learn when Filling Missing Values](#scikit-learn-when-filling-missing-values)
8. [Conclusion](#conclusion)
9. [Further Readings](#further-readings)


### Introduction
SciKit-Learn (often referred to as sklearn) provides a wide array of statistical models and machine learning. sklearn, unlike most modules, is written in Python and not in C. Although it is written in Python, sklearn's performance is attributed to its usage of NumPy for high-performance linear algebra and array operations. 

SciKit-Learn was written as a part of Google's Summer of Code project and has since made lives easier for thousands of Python centered data scientists worldwide. This part of the series focuses on introducing the library and focusing on one aspect - dataset transformations, an important and crucial step to go through before building a prediction model.

### Installing the Scikit-Learn library
Scikit-Learn requires the following libraries to be pre-installed: NumPy, SciPy, Matplotlib, IPython, Sympy, and Pandas. Let's go ahead and install them from the terminal using pip (works only for Windows).

```bash
pip install numpy
pip install scipy
pip install matplotlib
pip install ipython
pip install sympy
pip install pandas
```

Now that we've installed the dependent libraries let us install Scikit-Learn.

```bash
\>> pip install scikit-learn
```

Let's check if Scikit-Learn can be accessed using Python.

```py
import sklearn
```
Yes, it works!

### Dataset transformations using sklearn
An essential component for building a machine learning algorithm is data. A lot of work goes into preparing the data so that it can be fed to the model. This is called data preprocessing. Data preprocessing tasks can range from a mere change in notation to changing a continuous variable to a categorical variable. 

The sklearn.preprocessing package provides various functions and classes to change the representation of certain variables to be better suited for the estimators down the model pipeline. So, let's go ahead and look at the methods that Scikit-Learn offers, that help in data preprocessing and transformation. Before that, let's import the sklearn.preprocessing package.

```py
from sklearn import preprocessing
```

### Scikit-Learn for standardization
[Distance based models](https://ir.library.oregonstate.edu/concern/graduate_thesis_or_dissertations/zw12z7835) are machine learning algorithms that use distances to check if they are similar or not. If two points are close together, one can infer that the feature values are simiar and hence, can be classified as similar.  Standardization is an essential task for distance based models so that one particular feature does not dominate over the other. 

A data point x is standardized as follows:

![Standardization](/engineering-education/introduction-to-scikit-learn-in-python/standardization-formula.png)

Where µ is the mean of the distribution and σ is the standard deviation of the distribution. Standardization is centering around zero and scaling the data point such that the mean is 0, and the standard deviation is 1. 

This means all the data points now lie between -1 and 1. The reader is encouraged to go through this [resource](https://builtin.com/data-science/when-and-why-standardize-your-data) to get a better grip on why to standardize your features.

The following are the temperatures recorded in Bloomington (in Fahrenheits) in Illinois in the month of January: 

```bash
[33.2,33.1,33.1,33.0,32.9,32.9,32.8,32.8,32.7,32.7,32.6,32.6,32.6,32.6,32.5,32.5,32.5,32.6,32.6,32.6,32.7,32.7,32.8,32.9,33.0,33.1,33.2,33.4,33.5, 33.7, 33.9]
```

Let us try to standardize this vector. 

```py
# Import libraries
from sklearn.preprocessing import StandardScaler
import numpy as np

# List of temperatures recorded in Bloomington
temperatures_list = [33.2,33.1,33.1,33.0,32.9,32.9,32.8,32.8,32.7,32.7,32.6,32.6,32.6,32.6,
                    32.5,32.5,32.5,32.6,32.6,32.6,32.7,32.7,32.8,32.9,33.0,33.1,33.2,33.4,33.5, 33.7, 33.9]

# Convert the list to a NumPy array
temperatures_np = np.array(temperatures_list).reshape(-1,1)

# Standardize the vector
temperatures_std = StandardScaler().fit_transform(temperatures_np)

# Print the means
print("Mean Before Standardizing:",sum(temperatures_list)/len(temperatures_list))
print("Mean After Standardizing:",sum(temperatures_std.reshape(1,-1)[0])/len(temperatures_std))

# Output:
# Mean Before Standardizing: 32.896774193548396
# Mean After Standardizing: -2.6215588839535955e-15
```

Notice that after standardizing the data, the mean is almost 0.

In the example above, `fit_transform()` is used. There are two important functions - `fit()` and `fit_transform()`. `fit()` is used to compute the mean and standard deviation, that is later used for scaling along the feature axis and `fit_transform()` computes the mean and standard deviation, scales the vector, and returns a NumPy array of the computed values. Therefore, standardization can either be done using `fit()` and `transform()` or in one single optimized step, `fit_transform()`.

### Scikit-Learn for normalization
[Normalization](https://en.wikipedia.org/wiki/Normalization_(statistics)) is another feature scaling technique used to transform the values of the numeric attributes to a standard scale (0 to 1). Normalization is used in cases where the values do not follow Gaussian distribution. (Rule of thumb - Standardize if the attribute can be modeled to be a Gaussian distribution. If not, normalize). 

Normalization is important because it does not provide a window for the model to prefer one attribute because of the scale of values. This [resource](https://blog.datasciencedojo.com/importance-of-data-normalization-prior-to-analytics/) by DataScienceDojo explains normalization with an easy-to-understand example.

A data point x is normalized as follows:

![Normalization](/engineering-education/introduction-to-scikit-learn-in-python/normalization-formula.png)

*Source: [Miro Medium](https://miro.medium.com/max/506/1*ii46F2WDo9mvFvdxzUvGbQ.png)*

Let's try to normalize the data using the same set of values used in the previous example.

```py
#Import libraries
from sklearn.preprocessing import MinMaxScaler
import numpy as np

#List of temperatures recorded in Bloomington
temperatures_list = [33.2,33.1,33.1,33.0,32.9,32.9,32.8,32.8,32.7,32.7,32.6,32.6,32.6,32.6,
                    32.5,32.5,32.5,32.6,32.6,32.6,32.7,32.7,32.8,32.9,33.0,33.1,33.2,33.4,33.5, 33.7, 33.9]

#Convert the list to a NumPy array
temperatures_np = np.array(temperatures_list).reshape(-1,1)

#Normalize the vector
temperatures_norm = MinMaxScaler().fit_transform(temperatures_np)

print("Minimum Value Before Normalization:",min(temperatures_np.reshape(1,-1)[0]))
print("Maximum Value Before Normalization:",max(temperatures_np.reshape(1,-1)[0]))
print("Minimum Value After Normalization:",min(temperatures_norm))
print("Maximum Value After Normalization:",max(temperatures_norm))

# Output:
# Minimum Value Before Normalization: 32.5
# Maximum Value Before Normalization: 33.9
# Minimum Value After Normalization: [0.]
# Maximum Value After Normalization: [1.]
```

### Scikit-Learn when encoding categorical features
Almost every dataset has a feature (or more than one feature), that is [categorical](https://en.wikipedia.org/wiki/Categorical_variable) in nature. Consider a dataset containing the details of all the passengers of a certain airline. The possible categorical variables in the dataset could be the passenger's gender (male/female) and their seating choice (economy, business, first-class). Estimators take in only numerical data, and hence, these categorical features have to be encoded.

There are 2 types of encoding - [Label Encoding](https://www.geeksforgeeks.org/ml-label-encoding-of-datasets-in-python/) and [One Hot Encoding](https://medium.com/@michaeldelsole/what-is-one-hot-encoding-and-how-to-do-it-f0ae272f1179)

Summarizing the above resources with an example, assume a dataset of car information with the feature "Manufacturer," and there are three car manufacturers - Ford, Hyundai, and Tata. 

Label Encoding would mean replacing all "Ford" with 0, all "Hyundai" with 1, and all "Tata" with 2, and one hot encoding would have three more features, 1 representing if the manufacturer was indeed that company, 0 indicating otherwise.

```py
from sklearn.preprocessing import LabelEncoder

bands = ["Pink Floyd","Led Zeppelin","Pink Floyd","Foo Fighters","Queen","Queen","Pink Floyd","AC/DC","Foo Fighters","Led Zeppelin","Queen",
           "Nirvana","AC/DC","The Doors","Queen","Fleetwood Mac","Nirvana"]

# Invoking an instance of Label Encoder
label_encoding = LabelEncoder()

# Fit the labels
encoded = label_encoding.fit(bands)

print(encoded.transform(bands))

# Output - [5 3 5 2 6 6 5 0 2 3 6 4 0 7 6 1 4]
```

If one were to look at the output, they would understand that the feature has been encoded. But mere numbers do not make any sense. Luckily, `classes_` help us interpret what these labels are.

```py
#Iterate through the classes_ list and print them
band_list = encoded.classes_

for band_number in range(1,len(band_list)+1):
    print(band_number, band_list[band_number-1])

# Output
# 1 AC/DC
# 2 Fleetwood Mac
# 3 Foo Fighters
# 4 Led Zeppelin
# 5 Nirvana
# 6 Pink Floyd
# 7 Queen
# 8 The Doors
```

Note that the labels have been encoded in ascending order.

If the `band_list` feature is one-hot encoded, it would be represented in 1's and 0's instead of decimals.

```py
import numpy as np
from sklearn.preprocessing import OneHotEncoder

band_list = np.array(["AC/DC","Fleetwood Mac","Foo Fighters","Led Zeppelin","Nirvana","Pink Floyd","Queen","The Doors"]).reshape(-1,1)

# Invoking an instance of Label Encoder
label_encoding = OneHotEncoder()

# Fit the labels
encoded = label_encoding.fit(band_list)

print(encoded.transform(band_list).toarray())

# Output
# [[1. 0. 0. 0. 0. 0. 0. 0.]
#  [0. 1. 0. 0. 0. 0. 0. 0.]
#  [0. 0. 1. 0. 0. 0. 0. 0.]
#  [0. 0. 0. 1. 0. 0. 0. 0.]
#  [0. 0. 0. 0. 1. 0. 0. 0.]
#  [0. 0. 0. 0. 0. 1. 0. 0.]
#  [0. 0. 0. 0. 0. 0. 1. 0.]
#  [0. 0. 0. 0. 0. 0. 0. 1.]]
```

### Scikit-Learn when filling missing values
Almost 70% of time and resources are spent on collecting and cleaning the dataset for every project. When one deals with a real-life dataset, there are always missing values. Cleaning the dataset and handling missing data is important as many machine learning algorithms do not accommodate a missing attribute in the data. 

This is where Scikit-Learn's impute module comes into play. A simple way to deal with missing values is to remove the row of data with a missing value, that would mean losing valuable-yet-incomplete data. A better way is to replace the missing values with values that can be inferred from known data. One way would be to replace the missing data with the mean of that column.

Missing values are encoded with NumPy's NaN (numpy.nan)

The following are the temperatures recorded in Bloomington (in Fahrenheits) in Illinois in the month of February: 

```bash
[33.2,32.8,32.9,33.0,nan,33.2,33.4,33.1,32.6,32.5,32.5,33.1,33.0,nan,32.7,32.7,32.6,nan,32.6,32.9,32.8,32.8,32.5,32.6,nan,32.6,32.7,32.7,33.5, 33.7,33.9].
```

Let's try to replace the missing temperatures with their mean.

```py
import numpy as np
from sklearn.impute import SimpleImputer

#List of temperatures
temperatures = [33.2,32.8,32.9,33.0,"NaN",33.2,33.4,33.1,32.6,32.5,32.5,33.1,33.0,"NaN",32.7,32.7,32.6,"NaN",32.6,32.9,32.8,
                32.8,32.5,32.6,"NaN",32.6,32.7,32.7,33.5, 33.7,33.9]

temperatures_cleaned = []

#Replace NaN's with np.nan
for temperature in temperatures:
    if temperature=="NaN":
        temperatures_cleaned.append(np.nan)
    else:
        temperatures_cleaned.append(temperature)

temperatures_np = np.array(temperatures_cleaned).reshape(-1,1)

# Create an instance of the imputer
imputer_mean = SimpleImputer(missing_values=np.nan,strategy='mean')

#Transform the array and fit according to the chosen strategy
temperatures_np = imputer_mean.fit_transform(temperatures_np)

print(*temperatures_np, sep=", ")

# Output - [33.2], [32.8], [32.9], [33.], [32.91111111], [33.2], [33.4], [33.1], [32.6], [32.5], [32.5], [33.1], [33.], [32.91111111], 
#          [32.7], [32.7], [32.6], [32.91111111], [32.6], [32.9], [32.8], [32.8], [32.5], [32.6], [32.91111111], [32.6], 
#          [32.7], [32.7], [33.5], [33.7], [33.9]
```

SimpleImputer provides four options for strategy - mean, median, most_frequent, and constant. Since mean was the chosen strategy, the nan's were replaced with the mean of the temperatures (32.91111111). 

Had most_frequent been the chosen category:

```py
# Create an instance of the imputer
imputer_most_frequent = SimpleImputer(missing_values=np.nan,strategy='most_frequent')

#Transform the array and fit according to the chosen strategy
temperatures_np = imputer_most_frequent.fit_transform(temperatures_np)

print(*temperatures_np,sep=", ")

# Output - [33.2], [32.8], [32.9], [33.], [32.6], [33.2], [33.4], [33.1], [32.6], [32.5], [32.5], [33.1], [33.], [32.6], [32.7], 
#          [32.7], [32.6], [32.6], [32.6], [32.9], [32.8], [32.8], [32.5], [32.6], [32.6], [32.6], [32.7], [32.7], [33.5], [33.7], [33.9]
```

... the nan's would be replaced with the value with the most occurrences (the mode of the feature) - 32.6.

Opting for constant would require a value for the parameter `fill_value`.

```py
# Create an instance of the imputer
imputer_constant = SimpleImputer(missing_values=np.nan,strategy='constant',fill_value=32.9)

#Transform the array and fit according to the chosen strategy
temperatures_np = imputer_constant.fit_transform(temperatures_np)

print(*temperatures_np,sep=", ")

# Output - [33.2], [32.8], [32.9], [33.], [32.9], [33.2], [33.4], [33.1], [32.6], [32.5], [32.5], [33.1], [33.], [32.9], [32.7], 
#          [32.7], [32.6], [32.9], [32.6], [32.9], [32.8], [32.8], [32.5], [32.6], [32.9], [32.6], [32.7], [32.7], [33.5], [33.7], [33.9]
```

### Conclusion
This article was a brief dive into the multi-faceted world of scikit-learn. Scikit-Learn is a very important package to have a good understanding of and some experience in within every data scientist's journey. This article aimed to make the reader comfortable with data manipulation using sklearn and would prove to be a great starting point for Scikit-Learn.

Happy Coding!

### Further readings
1. [Official Docs](https://scikit-learn.org/dev/modules/preprocessing.html)

2. [Medium](https://medium.com/@michaeldelsole/what-is-one-hot-encoding-and-how-to-do-it-f0ae272f1179)

3. [Tutorialspoint](https://www.tutorialspoint.com/scikit_learn/scikit_learn_introduction.htm)

4. [Machine Learning Mastery](https://machinelearningmastery.com/handle-missing-data-python/)

5. [Data Camp](https://www.datacamp.com/community/blog/scikit-learn-cheat-sheet)


---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

