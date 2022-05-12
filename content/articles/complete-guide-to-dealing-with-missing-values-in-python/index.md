---
layout: engineering-education
status: publish
published: true
url: /complete-guide-to-dealing-with-missing-values-in-python/
title: A Complete Guide to Dealing with Missing Values in Python
description: In this article, the reader will learn about what missing values are and how to handle them. We will learn and experiment different methods that can be used to handle missing values.
author: jackline-gesare
date: 2021-12-16T00:00:00-05:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/complete-guide-to-dealing-with-missing-values-in-python/hero.jpg
    alt: A Complete Guide to Dealing with Missing Values in Python Hero Image
---
Data cleaning is one of the most crucial steps for machine and deep learning models to perform well. It involves transforming raw data into a format that the end-user can interpret by handling missing values, removing special characters, handling skewed data, and so on.
<!--more-->
This article will look into data cleaning and handling missing values.

Generally, missing values are denoted by `NaN`, `null`, or `None`.

The dataset's data structure can be improved by removing errors, duplication, corrupted items, and other issues.

### Prerequisites
- Install [Python](https://www.python-ds.com/python-environment) into your Python environment.
- Having some knowledge of the Python programming language is a plus.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Significance of handling the missing values](#significance-of-handling-the-missing-values)
- [Problems caused by missing values](#problems-caused-by-missing-values)
- [Types of missing data types](#types-of-missing-data-types)
  - [Missing completely at random (MCAR)](#missing-completely-at-random-mcar)
  - [Missing at Random (MAR)](#missing-at-random-mar)
  - [Missing not at Random (MNAR)](#missing-not-at-random-mnar)
- [Types of imputed information](#types-of-imputed-information)
- [How to fix our dataset's missing data](#how-to-fix-our-datasets-missing-data)
  - [Removing the rows/columns that are not in use](#removing-the-rowscolumns-that-are-not-in-use)
  - [Imputation based on the mean](#imputation-based-on-the-mean)
  - [Using the median to compute](#using-the-median-to-compute)
  - [Imputation based on the most common values (mode)](#imputation-based-on-the-most-common-values-mode)
  - [Interpolation–Linear](#interpolationlinear)
- [Conclusion](#conclusion)
- [References](#references)

### Significance of handling the missing values
Effective data management necessitates the ability to fill in blanks. It's a big deal in data analysis because it has such an impact on the outcome.

The results of models with many data gaps are really hard to accept. In a statistical study, skewed estimates could make it unreliable and give people the wrong results.

### Problems caused by missing values
- Having missing values makes it more difficult to rule out the [null hypothesis](https://en.wikipedia.org/wiki/Null_hypothesis) during testing.
- Parameter estimations could be affected if data is lost.
- The sample's representation may be distorted as a result.
- Because of this, interpreting the study's results may be more difficult.
- The accuracy of models might not be suitable.
- Data inconsistencies might lead to frequent errors while training the model.

### Types of missing data types
Several classifications or prediction models depend on the data pattern lacking from the dataset.

#### Missing completely at random (MCAR)
It doesn't matter if there are observed or unobserved data when using MCAR. If data are MCAR, the data can be seen as a simple random sample of the entire dataset of interest.

MCAR is an overly optimistic and frequently unfounded assumption. This assumption occurs when the chance of missing data is unrelated to the prediction value or the observed response to a query.

In simple words, missing data not correlated with the target variable can be ignored.

**Solution:** Deleting rows or columns.

#### Missing at Random (MAR)
In the case of MAR data, the observed data are systematically linked to the missing data.

A complete case analysis of a data set containing MAR data may or may not result in a bias, depending on whether all relevant data is present and no fields are missing. As long as you consider the known factors, you can objectively analyze the case.

Rather than taking into account of a single missing value, a cluster of observed responses has a more significant impact on the likelihood that an experimenter will receive an absent answer.

**Solution:** Imputation of data.

We attribute the missing data when we find that missing data has a high correlation to the target variable, resulting in better model results.

#### Missing not at Random (MNAR)
When data are MNAR, the missing data is always linked to the unobserved data, which means the missing data is linked to things or events that the researcher can't measure.

Complete case analysis of a data set with MNAR data can be biased because the missing data sources aren't counted. This means that this issue can't be addressed in the analysis, which means that this fact will skew your conclusion about the effect of the data set.

Missing not at random is the only information that is lacking, other than the previously listed categories.

Managing the MNAR datasets is a significant annoyance. Modeling the missing data is the only way to approximate the parameters in this scenario.

**Solution:** Improve dataset find data.

You can read more about these [here](https://www.ncbi.nlm.nih.gov/books/NBK493614/).

### Types of imputed information
A variety of sizes and shapes are offered in the form of imputations.

To build an accurate model of our application, we must first fill in any data gaps in our dataset.

These are a few techniques:
- **Single Imputation:** Only add missing values to the dataset once, to create an imputed dataset.
- **Univariate Imputation:** This is the case in which only the target variable is used to generate the imputed values.
- **Numerous imputations:** Duplicate missing value imputation across multiple rows of data. To get multiple imputed datasets, you must repeat a single imputation process.
- **Multivariate Imputation:** Impute values based on other variables, such as estimating missing values using linear regression.

### How to fix our dataset's missing data
There are a variety of approaches to deal with missing data. We will look at some of them, but first, we will start with things like importing libraries.

```Python
import pandas as pan
import numpy as num
dataset = pan.read_csv("IncomeAndGender.csv")
dataset.head()
```

**Output:**

```bash
      Salary  Gender  AgeNumber   PhD
0   150.0   1   30.0    Yes
1   30.0    0   NaN     Yes
2   50.0    0   50.0    Nan
3   20.0    1   20.0    AND
4   15.1    0   25.0    No
```

You can find the CSV file for the dataset [here](https://colab.research.google.com/drive/1O7O4oo2k5FIFFTcE-bU8kBGxeumyv1v2?usp=sharing)

Looking at the dataset's dimensions as a measure of its size:

```Python
print(dataset.shape)
```

**Output:**

```bash
(6, 4)
```

In the search for missing information:

```Python
print(dataset.isnull().sum())
```

**Output:**

```bash
Salary       0
Gender       0
AgeNumber    1
PhD          0
dtype: int64
```

Don't worry about not having enough information. The algorithm decides how to read the data that you give and how it will be used if there isn't enough.

Loss-reduction algorithms can be trained to find the best values for missing data.

An error can be made in linear regression. We need to deal with the lack of data until we figure out what went wrong with the model. If it's positive, we'll go ahead. If not, we'll stop.

```Python
dataset["AgeNumber"][:10]
```

**Output:**

```bash
0    30.0
2    50.0
3    20.0
4    25.0
5    20.0
Name: AgeNumber, dtype: float64
```

#### Removing the rows/columns that are not in use
The next most straightforward thing to do is leave out observations that don't have any data. In the end, you might not know important things.

Python's panda's module has a method called `dropna()` that can get rid of empty rows. When dealing with machine learning problems, don't try to fill in every blank in every column.

There are both advantages and disadvantages to removing the rows/columns:
- It's Faster and Easier
- Approximately 40% of the data is lost.

```Python
dataset.dropna(inplace=True)
print(dataset.isnull().sum())
```

**Output:**

```bash
Salary       0
Gender       0
AgeNumber    0
PhD          0
dtype: int64
```

#### Imputation based on the mean
Each missing value can be restored after calculating the non-missing values in a column. Using this method with anything other than numbers is severely restricted.

It's a simple way to analyze small amounts of data. One flaw is the lack of feature correlations, but there are others.

This technique only works with one column at a time. A skewed mean value will likely replace an outlier treatment.

The technique only works with numerical datasets and fails when independent variables are correlated.

Using the mean also destroys the relationships between variables. True, the inserted mean preserves the observed data mean. Even when data are missing at random, a fair and accurate mean estimate can be obtained:

```Python
dataset["AgeNumber"] = dataset["AgeNumber"].replace(num.NaN, dataset["AgeNumber"].mean())
print(dataset["AgeNumber"][:10])
```

**Output:**

```bash
0    30.0
2    50.0
3    40.0
4    25.0
5    20.0
Name: AgeNumber, dtype: float64
```

#### Using the median to compute
Using median values is another method of Imputation that addresses the previous method's outlier issue.

An outlier is an object or data item significantly different from the rest of the dataset.

When sorting, a column's center value is updated rather than an outlier. No correlation between the independent variables was found, and it only works with numerical datasets. An independent variable is what you change precisely.

```Python
dataset["AgeNumber"] = dataset["AgeNumber"].replace(num.NaN, dataset["AgeNumber"].median())
print(dataset["AgeNumber"][:10])
```

**Output:**

```bash
0    30.0
2    50.0
3    20.0
4    25.0
5    20.0
Name: AgeNumber, dtype: float64
```

#### Imputation based on the most common values (mode)
It can be applied to categorical variables with a restricted number of values.

`Education level` is an excellent example of an ordinal absolute attribute that falls into this category.

Since feature relationships are not considered when utilizing this procedure, data bias can occur. If the category values are not evenly distributed among the classes, biasing the data increases.

It is compatible with all data formats, and the value of covariance between independent features cannot be predicted:

```Python
import statistics
dataset["AgeNumber"] = dataset["AgeNumber"].replace(num.NaN, statistics.mode(dataset["AgeNumber"]))
print(dataset["AgeNumber"][:10])
```

#### Interpolation–Linear
A straight line is used to join dots in increasing order to approximate a missing value.

For the most part, the unknown value is calculated in the same ascending order as the previous values. We don't have to specify Linear Interpolation because it is the default method.

Almost always, it will be used in a time-series dataset.

```Python
dataset["AgeNumber"] = dataset["AgeNumber"].interpolate(method='linear', limit_direction='forward', axis=0)
dataset.isnull().sum()
```

**Output:**

```bash
Salary       0
Gender       0
AgeNumber    0
PhD          0
dtype: int64
```

To fill in the blanks in our dataset, we can use the concepts mentioned earlier.

When it comes to finding missing values, there isn't a single method that works best. Finding missing values differs based on the feature and application we want to use.

As a result, we'll have to experiment to find the best solution for our application.

You can find the full code [here](https://colab.research.google.com/drive/1O7O4oo2k5FIFFTcE-bU8kBGxeumyv1v2?usp=sharing).

### Conclusion
Data cleaning is a feature of the pre-processing data module that we explored in this post. Furthermore, data loss may lead to skewed parameter estimations, reduced sample representativeness, and more complex research analysis.

In conclusion, we looked at various approaches to handling missing data and how these techniques are used.

I hope you found this tutorial helpful.

Happy coding!

### References
- [See the whole code of the tutorial](https://colab.research.google.com/drive/1O7O4oo2k5FIFFTcE-bU8kBGxeumyv1v2?usp=sharing)
- [Handling missing data](https://machinelearningmastery.com/handle-missing-data-python/)
- [Causes and solutions of missing data](https://phoenixnap.com/kb/handling-missing-data-in-python)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
