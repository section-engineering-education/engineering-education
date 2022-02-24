---
layout: engineering-education
status: publish
published: true
url: /data-preprocessing-in-r/
title: Data Preprocessing in R
description: This article will provide a detailed guide on how to preprocess a dataset before using it to train models. Data preprocessing is crucial in machine learning and needs to be performed properly and systematically.
author: stanley-juma
date: 2021-06-17T00:00:00-16:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-preprocessing-in-r/hero.jpg
    alt: Data Preprocessing in R Hero Image
---
Data preprocessing is the initial phase of Machine Learning where data is prepared for machine learning models. This part is crucial and needs to be performed properly and systematically. If not, we will end up building models that are not accurate for their purpose.
<!--more-->
In this article, we will learn all the steps that are involved in the data preprocessing stage. 

### Prerequisites
To follow this article along - the reader should have the following:
1. [RStudio](https://www.rstudio.com/products/rstudio/download/) installed on your computer.
2. Package packages ('caTools') installed. Follow [this](https://www.rdocumentation.org/packages/caTools/versions/1.17.1) link for installation instructions.

### Steps in data preprocessing
- [Steps in Data Preprocessing](#steps-in-data-preprocessing)
  - [Step 1: Importing the Dataset](#step-1-importing-the-dataset)
  - [Step 2: Handling the Missing Data](#step-2-handling-the-missing-data)
- [Step 3: Encoding Categorical Data.](#step-3-encoding-categorical-data)
  - [Output](#output)
- [Step 4: Splitting the Dataset into the Training and Test sets](#step-4-splitting-the-dataset-into-the-training-and-test-sets)
  - [Training set](#training-set)
  - [Test set](#test-set)
- [Step 5: Feature Scaling](#step-5-feature-scaling)
  - [training_set](#training_set)
  - [test_set](#test_set)

#### Step 1: Importing the dataset
Before we start preparing our data, first we need to dowload it from [here](https://github.com/Daniel695/data) and load it in RStudio IDE.

Here is how to achieve this.

```r
Dataset = read_csv('data.csv')
```

This code imports our data stored in CSV format. 

We can have a look at our data using the 'view()' function:

```r
view(Dataset)
```

Upon executing we obtain our dataset as below.

**Output**

![replaced Dataset](/engineering-education/data-preprocessing-in-r/Dataset.png)

Our dataset has four columns and ten observations, it shows how customers from three different countries with different ages and salaries responded to the purchase of a certain product.

#### Step 2: Handling the missing data
From the dataset, the Age and Salary column report missing data. Before implementing our machine learning models, this problem needs to be solved, otherwise it will cause a serious problem to our machine learning models. Therefore, it's our responsibility to ensure this missing data is eliminated from our dataset using the most appropriate technique.

Here are two techniques we can use to handle missing data:

1. **Delete the observation reporting the missing data:**

This technique is suitable when dealing with big datasets and with very few missing values i.e. deleting one row from a dataset with thousands of observations can not affect the quality of the data. When the dataset reports many missing values, it can be very dangerous to use this technique. Deleting many rows from a dataset can lead to the loss of crucial information contained in the data.
  
To ensure this does not happen, we make use of an appropriate technique that has no harm to the quality of the data.

2. **Replace the missing data with the average of the feature in which the data is missing:**

This technique is the best way so far to deal with the missing values. Many statisticians make use of this technique over that of the first one.
  
Now that we know the techniques used to treat the missing data, let's solve this problem from our data. In our case, we shall make use of the second technique.
  
Let's start by replacing the missing data in the Age column with the mean of that column. 

The code below carries out such a task.

```r
Dataset$Age = ifelse(is.na(Dataset$Age),
                     ave(Dataset$Age, FUN = function (x)mean(x, na.rm = TRUE)),
                     Dataset$Age)
```

**What does the code above really do?**

`Dataset$Age`: simply take the Age column from our dataset.

In the Age column, we've just taken that from our data set, we need to replace the missing data, and at the same time keep the data that is not missing.

This objective is achieved by the use of the if-else statement.

Our `ifelse` statement is taking three parameters:
- The first parameter is if the condition is true.
- The second parameter is the value we input if the condition is true.
- The third parameter is the action we take if the condition is false.

Our condition is `is.na(Dataset$Age)`. This will tell us if a value in the Dataset$Age is missing or not. It returns a logical output, YES if a value is missing and NO if a value is not missing. The second parameter, the 'ave()' function, finds the mean of the Age column. 

Because this column reports NA values, we need to exclude the null data in the calculation of the mean, otherwise we shall obtain the mean as NA. 

This is the reason we pass `na.rm = TRUE` in our mean function just as to declare those values that should be used and those should be excluded when calculating the mean of the vector Age.

The third condition is the value that will be returned if the value in the Age column of the dataset is not missing.

Executing the code we obtain:

![replaced Age_NA value](/engineering-education/data-preprocessing-in-r/dataset1.png)

The missing value that was in the Age column of our data set has successfully been replaced with the mean of the same column.

We do the same for the Salary column by executing the code below:

```r
Dataset$Salary = ifelse(is.na(Dataset$Salary),
                 ave(Dataset$Salary, FUN = function (x)mean(x, na.rm = TRUE)),
                 Dataset$Salary)
```

![replaced NA_value of the Salary column](/engineering-education/data-preprocessing-in-r/dataset2.png)

The missing value that was in the Salary column was successfully replaced with the mean of the same column.

### Step 3: Encoding categorical data
Encoding refers to transforming text data into numeric data. Encoding Categorical data simply means we are transforming data that fall into categories into numeric data. 

In our dataset, the Country column is Categorical data with 3 levels i.e. France, Spain, and Germany. The purchased column is Categorical data as well with 2 categories, i.e. YES and NO.

The machine models we built on our dataset are based on mathematical equations and it's only take numbers in those equations. 

Keeping texts of a categorical variable in the equation can cause some troubles to the machine learning models and this why we encode those variables. To transform a categorical variable into numeric, we use the `factor()` function.

Let start by encoding the Country column.

```r
Dataset$Country = factor(Dataset$Country, 
                      levels = c('France','Spain','Germany'), 
                      labels = c(1.0, 2.0 , 3.0 ))
```

Executing the code above we obtain.

**Output**

![Encoded Country_names](/engineering-education/data-preprocessing-in-r/encode1.png)

Our country names were successfully replaced with numbers.

We do the same for the purchased column.

```r
Dataset$Purchased = factor(Dataset$Purchased,
                           levels = c('No', 'Yes'),
                           labels = c(0, 1))
Dataset$Purchased[is.na(Dataset$Purchased)] <- 0
as.factor(Dataset$Purchased)
```

Using the  `view()` function we obtain.

![Encoded Purchased column](/engineering-education/data-preprocessing-in-r/encode_Purchased.png)

Our purchased column was successfully encoded into 0,s, and 1,s.

### Step 4: Splitting the dataset into the training and test set
In machine learning, we split data into two parts:

- Training set: The part of the data that we implement our machine learning model on.
- Test set: The part of the data that we evaluate the performance of our machine learning model on.
  
The reason we split this data is to ensure that our machine learning model does not overlearn the correlation of data it's trained on. If we let it learn too much on the data, it may perform poorly when tested on a new dataset with a different correlation. 

Therefore, whenever we are building a machine learning model, the idea is to implement it on the training set and evaluate it on the test set. We expect the performance in the training set and test set to be different and if this is the case the model can adapt to new datasets.

Using our dataset, let's split it into the training and test sets.

To begin with, we first load the required library.

```r
library(caTools)# required library for data splition
set.seed(123)
split = sample.split(Dataset$Purchased, SplitRatio = 0.8)# returns true if observation goes to the Training set and false if observation goes to the test set.

#Creating the training set and test set separately
training_set = subset(Dataset, split == TRUE)
test_set = subset(Dataset, split == FALSE)
training_set
test_set
```

Executing our code yields:

**Training Set**:

![training_set](/engineering-education/data-preprocessing-in-r/training_set.png)

From the results it clear that eight observations, 0.8 of our dataset observations, were split into the training set.

**Test Set**:

![test_set](/engineering-education/data-preprocessing-in-r/test_set.png)

From the output it clear that two observations went to the test set.

### Step 5: Feature scaling
It's a common case that in most datasets, features also known as inputs, are not on the same scale. Many machine learning models are Euclidian distant-based. 

It happens that, the features with the large units dominate those with small units when it comes to calculation of the Euclidian distance and it will be as if those features with small units do not exist. 

To ensure this does not occur, we need to encode our features so that they all fall in the range between -3 and 3. There are several ways we can use to scale our features. The most used one is the standardization and normalization technique. 

The normalization technique is used when the data is normally distributed while standardization works with both normally distributed and the data that is not normally distributed.

The formula for these two techniques is shown below.

![scaling formula](/engineering-education/data-preprocessing-in-r/one.png)

Now, let's scale both the training set and test set of our dataset separately.

Here is how we achieve this:

```r
training_set[, 2:3] = scale(training_set[, 2:3])
test_set[, 2:3] = scale(test_set[, 2:3])
training_set
test_set
```

Executing our code we obtain:

**Training Set**:

![scale(training_set)](/engineering-education/data-preprocessing-in-r/scaled_training_set.png)

**Test Set**:

![scale(test_set)](/engineering-education/data-preprocessing-in-r/scaled_test_set.png.png)

Our training and test set were successfully scaled.

>Note that in our code we specified the columns to be scale. 

If we fail to do so, R will show us an error. 

Such as:

```r 
training_set = scale(training_set)# returns an error
```

The reason is that our encoded columns are not treated as numeric entries.

### Conclusion
This is the end of our data preprocessing journey. Our data is now well prepared to give [Machine Learning](/engineering-education/topic/machine-learning/) models that can predict future outcomes effectively. I hope you enjoyed every step to this end. 

Happy coding.

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
