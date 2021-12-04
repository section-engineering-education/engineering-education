For machine learning and deep learning models to perform well, data cleaning is one of the most important step. It involves transforming raw data into a format that can be interpreted by the end-user by handling missing values, handling special characters, handling skewed data, and so on.

In this article, we'll look into data cleaning and handling missing values.

Generally, missing values are denoted by `NaN`, `null`, or `None`.

The dataset's data structure can be improved by removing errors, duplication, corrupted items, and other issues.

### Prerequisites
- Install [Python](https://www.python-ds.com/python-environment) into your Python environment.
- Having some knowledge of the Python programming language is a good idea.

### Table of contents
- [Significance of handling the missing values](#significance-of-handling-the-missing-values)
- [Problems caused by missing values](#problems-caused-by-missing-values)
- [Types of missing data types](#types-of-missing-data-types)
- [Types of Imputed Information](#types-of-imputed-information)
- [How to fix our dataset's missing data](#how-to-fix-our-dataset's-missing-data)

### Significance of handling the missing values
Effective data management necessitates the ability to fill in blanks. It's a big deal in data analysis because it has such an impact on the outcome.

When you're aware of so many data gaps, it's hard to accept the results. The statistical strength of a study might be weakened by skewed estimates, leading to inaccurate results.

### Problems caused by missing values
- Because of this, it becomes more difficult to rule out the [null hypothesis](https://en.wikipedia.org/wiki/Null_hypothesis) during testing.
- Parameter estimations could be affected, if data is lost.
- The sample's representation may be distorted as a result.
- Because of this, interpreting the study's results may be more difficult.
- The accuracy of models might not be right.
- Data inconsistencies might lead to frequent errors while training the model.

### Types of missing data types
Several classification or prediction models depends on the pattern of the data lacking from the dataset.

#### 1. Missing completely at random
It doesn't matter if there are observed or unobserved data when using MCAR. The participants with incomplete data and those with complete data did not show any systematic differences. If data are MCAR, the remaining data can be viewed as a simple random sample of the entire dataset of interest. According to most, MCAR is an overly optimistic and frequently unfounded assumption.

This occurs when the chance of missing data is unrelated to the prediction value or the observed response to a query.

In simple words, missing data that are not correlated with the target variable can be ignored.

__Solution:__ Deleting rows or columns.

#### 1. Missing at Random
In the case of MAR data, the observed data are systematically linked to the missing data. A complete case analysis of a data set containing MAR data may or may not result in a bias, depending on whether all relevant data and no fields are missing. As long as you take into account the known factors , you can get an objective analysis of the case.

Rather than taking into account of a single missing value, a cluster of observed responses has a greater impact on the likelihood that an experimenter will receive as a missing response.

__Solution:__ Imputation of data.

We impute the missing data, when we find that missing data has high correlation to the target variable that might result in better model results.

#### 3. Missing not at Random
Whenever data are MNAR, the missingness is systematically linked to the unobserved data, meaning that the missingness is linked to events or factors that the researcher is unable to measure. If a complete case analysis of a data set containing MNAR data is biased, the fact that sources of missing data are unmeasured means that this issue cannot be addressed in analysis and the estimate of effect will likely be biased.

Missing not at random is the only piece of information that is lacking, other than the previously listed categories.

Managing the MNAR data sets is a major annoyance. Modeling the missing data is the only way to get a good approximation of the parameters in this scenario.

__Solution:__ Improve dataset find data.

### Types of Imputed Information
A variety of sizes and shapes are offered in the form of imputations. To build an accurate model of our application, we must first fill in any data gaps that exist in our dataset. This is one of the techniques for doing so.
- __Single imputation:__ Only add missing values to the dataset once to create an imputed dataset.
- __Univariate imputation:__ Is the case in which only the target variable is used to generate the imputed values.
- __Numerous imputations:__ Duplicate missing value imputation across multiple rows of data. To get multiple imputed datasets, you must basically repeat a single imputation process.
- __Multivariate imputation:__ Impute values based on other variables, such as estimating missing values using linear regression. 
### How to fix our dataset's missing data
There are a variety of approaches to dealing with missing data; we will look at some of them, but first, we will start from the beginning with things like importing libraries.
```Python
import pandas as pan
import numpy as num

dataset = pan.read_csv("IncomeAndGender.csv")
dataset.head()
```
Output:
```bash
      Salary  Gender  AgeNumber   PhD
0   150.0   1   30.0    Yes
1   30.0    0   NaN     Yes
2   50.0    0   50.0    Nan
3   20.0    1   20.0    AND
4   15.1    0   25.0    No
```
> You can find the csv file [here for the dataset](https://colab.research.google.com/drive/1O7O4oo2k5FIFFTcE-bU8kBGxeumyv1v2?usp=sharing)

Looking at the dataset's dimensions as a measure of its size:
```Python
dataset.shape
```
In the search for missing information:
```Python
print(dataset.isnull().sum())
```
OUTPUT
```Bash
Salary       0
Gender       0
AgeNumber    1
PhD          0
dtype: int64
```
Don't worry about missing information. The algorithm decides how to interpret the data you provide and also are affected by missing data. Training loss reduction algorithms yields optimal imputation values for missing data.

An error can be made in linear regression. We need to deal with the lack of data until we figure out what went wrong with the model. If it's positive, we'll go ahead. If not, we'll stop.
```Python
dataset["AgeNumber"][:10]
```
#### Removing the rows/columns that are not in use
The next simplest strategy is to exclude observations with missing data. In the end, you can miss out on important pieces of information. Python's pandas module has a dropna() method for getting rid of empty columns. When dealing with machine learning issues, rely on your own experience or that of a domain expert rather than attempting to fill in every blank in every column.

There are both advantages and disadvantages to removing the rows/columns; 
#### Advantages:
It's Faster and Easier
#### Disadvantages:
Approximately 40% of the data is lost.
```Python
dataset.dropna(inplace=True)
print(dataset.isnull().sum())
```
#### Imputation based on the mean
Each missing value can be restored after calculating the non-missing values in a column. Using this method with anything other than numbers is severely restricted. It's a simple way to analyze small amounts of data. One flaw is the lack of feature correlations, but there are others. This technique only works with one column at a time. An outlier treatment will likely be replaced by a skewed mean value.

The technique only works with numerical datasets and fails when independent variables are correlated. Using the mean also destroys the relationships between variables. True, the inserted mean preserves the observed data mean. Even when data are missing at random, a fair and accurate mean estimate can be obtained.
```Python
dataset["AgeNumber"] = dataset["AgeNumber"].replace(num.NaN, dataset["AgeNumber"].mean())
print(dataset["AgeNumber"][:10])
```
Output:
```bash
0    30.0
2    50.0
3    40.0
4    25.0
5    20.0
Name: AgeNumber, dtype: float64
```
#### Using the Median to Compute
Using median values is another method of imputation that addresses the previous method's outlier issue. An outlier is an object or data item that is significantly different from the rest of the dataset. When sorting, a column's center value is updated rather than an outlier. No correlation between the independent variables was found, and it only works with numerical datasets. An independent variable is what you change precisely. 
```Python
dataset["AgeNumber"] = dataset["AgeNumber"].replace(num.NaN, dataset["AgeNumber"].median())
print(dataset["AgeNumber"][:10])
```
#### Imputation based on the most common values (mode)
It can be applied to categorical variables with a restricted number of values. `Education level` is a good example of an ordinal categorical attribute that falls into this category: Data bias can occur since feature relationships are not considered when utilizing this procedure. If the category values are not evenly distributed among the categories, the likelihood of biasing the data increases.

It is compatible with all data formats, and the value of covariance between independent features cannot be predicted.

```Python
import statistics
dataset["AgeNumber"] = dataset["AgeNumber"].replace(num.NaN, statistics.mode(dataset["AgeNumber"]))
print(dataset["AgeNumber"][:10])
```
#### Interpolation – Linear
It is a where a straight line is used to join dots in increasing order to approximate a missing value. For the most part, the unknown value is calculated in the same ascending order as the previous values. We didn't have to specify Linear Interpolation because it is the default method. Almost always, it will be used in a time-series dataset.
```Python
dataset["AgeNumber"] = dataset["AgeNumber"].interpolate(method='linear', limit_direction='forward', axis=0)
dataset.isnull().sum()
```
> To fill in the blanks in our dataset, we can make use of the aforementioned concepts. When it comes to finding missing values, there isn't a single method that works best; the answer for finding missing values differs based on the feature and application we want to use. As a result, we'll have to experiment to find the best solution for our application.

You can run the codes [here](https://colab.research.google.com/drive/1O7O4oo2k5FIFFTcE-bU8kBGxeumyv1v2?usp=sharing)
### Reference 
1. [See the whole code of the tutorial](https://colab.research.google.com/drive/1O7O4oo2k5FIFFTcE-bU8kBGxeumyv1v2?usp=sharing)
1. [Handling missing data](https://machinelearningmastery.com/handle-missing-data-python/)
2. [Causes and solutions of missing data](https://phoenixnap.com/kb/handling-missing-data-in-python)
### Conclusion
Data Cleaning is a feature of the data pre-processing module that we explored in this post. Furthermore, the loss of data may lead to skewed parameter estimations, reduced sample representativeness, and more difficult research analysis.

In conclusion, we looked at various approaches to handling missing data and how most are always used. I hope you found this tutorial helpful.

Happy coding!
