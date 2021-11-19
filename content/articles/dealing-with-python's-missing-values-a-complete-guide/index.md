 Machine learning and deep learning frameworks have nothing to do with data purification. As part of pre-processing, we'll look into Data Cleaning. The dataset's data structure can be improved by removing errors, duplication, corrupted items, and other issues.
### The significance of completing the missing values
Effective data management necessitates the ability to fill in blanks. It's a big deal in data analysis because it has such an impact on the outcome. When you're aware of so many data gaps, it's hard to accept the results. The statistical strength of a study might be weakened by skewed estimates, leading to inaccurate results.
### The problems outlined below are caused by missing values.
- Because of this, it becomes more difficult to rule out the null hypothesis during testing.
- Parameter estimations could be affected if data is lost.
- The sample's representation may be distorted as a result.
- Because of this, interpreting the study's results may be more difficult.
### Types of missing data-types
There are a number of classifications that can be used depending on the pattern or data that is lacking from the dataset or data.
- **Missing Completely at Random**

This occurs when the chance of missing data is unrelated to the precise value that will be obtained or the observed replies to a query.
**Solution:** Deleting rows or columns.
- **Missing at Random**

Rather than taking into account a single missing value, a cluster of observed responses has a greater impact on the likelihood that an experimenter will receive a missing response.

**Solution:** Imputation of data.
- **Missing not at Random**

Missing not at Random is the only piece of information that is lacking, other than the previously listed categories. Managing the MNAR data sets is a major annoyance. Modeling the missing data is the only way to get a good approximation of the parameters in this scenario.

**Solution:** Improve dataset find data.
### Missing values can be classified into the following categories:
1. Numerical dataset with a continuous variable or attribute
2. Qualitative or feature variables are also included in the list of quantitative and objective variables.
### The Different Types of Imputed Information
A variety of sizes and shapes are offered in the form of imputations. In order to build an accurate model of our application, we must first fill in any data gaps that exist in our dataset. This is one of the techniques for doing so.
- The term univariate or mean imputation is used when only the target variable is imputed.
- Linear regression can be used to predict missing values based on other variables, or multivariate imputation can be used to predict missing values based on a single variable.
- All missing values in the dataset can be imputed once to create an imputed set of values.
- Several imputations are needed if the same missing values are imputed in different places in the same dataset more than once. This simply requires repeating a single imputation to produce a large number of imputed datasets from a single source dataset.
### How to fix our dataset's missing data
There are a variety of approaches to dealing with missing data; we will look at some of them, but first, we will start from the beginning with things like importing libraries.
```Python
import pandas as pan
import numpy as num

dataset = pan.read_csv("IncomeAndGender.csv")
dataset.head()
```
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
Salary          0
Gender          0
AgeNumber       16
PhD             13
dType:          int64
```
Don't worry about the info that isn't there. It's up to the algorithm to decide how it interprets the information you give it. Missing data affects algorithms in different ways. The optimal imputation values for missing data can be obtained by training loss reduction algorithms.

Using linear regression as an example, an error can be made. As soon as we know what went wrong with the model, we have to figure out how to deal with the lack of data until we get a clearer grasp of what went wrong in the first place. If the reaction is positive, we'll proceed. If it is negative, we'll stop.
```Python
dataset["AgeNumber"][:10]
```
### Removing the rows/columns that are not in use
The next simplest strategy is to exclude observations with missing data. In the end, you can miss out on important pieces of information. Python's pandas module has a dropna() method for getting rid of empty columns. When dealing with machine learning issues, rely on your own experience or that of a domain expert rather than attempting to fill in every blank in every column.

There are both advantages and disadvantages to removing the rows/columns; for example, the model becomes more robust after deleting missing data. If you have a large amount of missing data, your model will be less accurate.
```Python
dataset.dropna(inplace=True)
print(dataset.isnull().sum())
```
### Imputation based on the mean
After calculating the non-missing values in a column, each missing value can be restored individually and independently. This tool is severely limited if you want to use it with anything other than numbers. If you only have a small amount of data, it's a quick and straightforward way to analyze it The lack of feature correlations is one of the flaws, but there are others as well. One column at a time can be used with this technique, and that's it. The model is likely to employ a skewed mean value to make up for the loss of the outlier treatment.

Imputation based on the mean has a number of drawbacks, including the fact that technique only works with numerical datasets and fails when independent variables are correlated.
```Python
dataset["AgeNumber"] = dataset["AgeNumber"].replace(num.NaN, dataset["AgeNumber"].mean())
print(dataset["AgeNumber"][:10])
```
### Using the Median to Compute
The median values of the population can be used to deal with outliers in the prior procedure. When sorting, a column's center value is updated rather than an outlier. No correlation between the independent variables was found, and it only works with numerical datasets.
```Python
dataset["AgeNumber"] = dataset["AgeNumber"].replace(num.NaN, dataset["AgeNumber"].median())
print(dataset["AgeNumber"][:10])
```
### Imputation  based on the most common values
It can be applied to categorical variables with a restricted number of values. You can use the drop-down menu to select the most common value. Education level is a good example of an ordinal categorical attribute that falls into this category: Data bias can occur since feature relationships are not considered when utilizing this procedure. If the category values are not evenly distributed among the categories, the likelihood of biasing the data increases.

It is compatible with all data formats, and the value of covariance between independent features cannot be predicted.

```Python
import statistics
dataset["AgeNumber"] = dataset["AgeNumber"].replace(nam.NaN, statistics.mode(dataset["AgeNumber"]))
print(dataset["AgeNumber"][:10])
```
### Interpolation – Linear
Connecting dots sequentially along a straight line is a technique for coming up with a number. Alternatively, it works by using the previous values to calculate the unknown one. Because Linear Interpolation is the default approach, it was not required to employ it. It is almost always used in a time-series dataset.
```Python
dataset["AgeNumber"] = dataset["AgeNumber"].interpolate(method='linear', limit_direction='forward', axis=0)
dataset.isnull().sum()
```
> To fill in the blanks in our dataset, we can make use of the aforementioned concepts. When it comes to finding missing values, there isn't a single method that works best; the answer for finding missing values differs based on the feature and application we want to use. As a result, we'll have to experiment to find the best solution for our application.
### Conclusion
Data Cleaning is a feature of the data pre-processing module that we explored in this post. Furthermore, the loss of data may lead to skewed parameter estimations, reduced sample representativeness, and more difficult research analysis.