---
layout: engineering-education
status: publish
published: true
url: /machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/
title: Machine Learning using Pandas Profiling and Scikit-learn Pipeline
description: In this tutorial we will learn how to build a customer churn model using Pandas Profiling and Scikit-learn Pipeline.
author: bravin-wasike
date: 2022-02-28T00:00:00-15:11
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/hero.jpg
    alt: Machine Learning using Pandas Profiling and Scikit-learn Pipeline Hero Image
---
Pandas profiling is a Python library that performs an automated Exploratory Data Analysis. It automatically generates a dataset profile report that gives valuable insights. For example, we can know which variables to use and which ones we can drop using the profile report.
<!--more-->
A machine learning pipeline is used to automate the machine learning development stages. These stages are dataset ingestion, dataset preprocessing, feature engineering, model training, model evaluation, making predictions, and model deployment.

A machine learning pipeline is made of multiple initialized steps. It uses the steps to automate the machine learning development stages. The steps are initialized in sequential order so that one's output is used as an input for the next. Therefore, the pipeline steps need to be well-organized for faster model implementation.

Many libraries support the implementation of a machine learning pipeline. We will focus on the Scikit-Learn library. The library provides a Pipeline class that automates machine learning. We will build a customer churn model using Pandas Profiling and Scikit-learn Pipeline. 

### Table of content
- [Prerequisites](#prerequisites)
- [How the Scikit-learn Pipeline works](#how-the-scikit-learn-pipeline-works)
- [Transformers](#transformers)
- [Estimators](#estimators)
- [Benefits of using Scikit-learn Pipeline](#benefits-of-using-scikit-learn-pipeline)
- [Dataset used](#dataset-used)
- [Automated Exploratory Data Analysis with Pandas Profiling](#automated-exploratory-data-analysis-with-pandas-profiling)
- [Overview](#overview)
- [Variables](#variables)
- [Interactions](#interactions)
- [Correlations](#correlations)
- [Missing values](#missing-values)
- [Sample](#sample)
- [Dataset splitting](#dataset-splitting)
- [Importing transformer methods and classes](#importing-transformer-methods-and-classes)
- [Drop columns transformer](#drop-columns-transformer)
- [Numeric Transformers](#numeric-transformers)
- [Categorical transformer](#categorical-transformer)
- [Combining the initialized transformers](#combining-the-initialized-transformers)
- [Applying the transformers](#applying-the-transformers)
- [Adding the final estimator](#adding-the-final-estimator)
- [Fitting the pipeline](#fitting-the-pipeline)
- [Getting accuracy score on the training set](#getting-accuracy-score-on-the-training-set)
- [Getting accuracy score on the testing set](#getting-accuracy-score-on-the-testing-set)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this article, a reader should:
- Know how to build a [machine learning model](/engineering-education/house-price-prediction).
- Know how to implement [Scikit-learn algorithms](https://scikit-learn.org/stable/).
- Understand [machine learning workflows](https://www.simplilearn.com/tutorials/machine-learning-tutorial/machine-learning-steps).
- Understand [steps in dataset preprocessing](https://towardsdatascience.com/introduction-to-data-preprocessing-in-machine-learning-a9fa83a5dc9d).

### How the Scikit-learn Pipeline works
Scikit-learn Pipeline is a powerful tool that automates the machine development stages. It has a sequence of transformation methods followed by a model estimator function assembled and executed as a single process to produce a final model. 

The Scikit-learn Pipeline steps are in two categories: 
1. Transformers.
2. Estimators.

#### Transformers
This step contains all the Scikit-Learn methods and classes that perform data transformation. Data transformation is an important stage in machine learning. 

It converts the raw dataset into a format that the model can understand and easily use. In addition, data transformation performs feature engineering and dataset preprocessing. 

Feature engineering gets relevant and unique attributes from the dataset called features. The model then uses the features as input during training. Dataset preprocessing involves cleaning, formatting, and removing noise from the dataset. 

Some of the most common activities involved in dataset preprocessing are as follows:
- Removing outliers: Outliers are data points that deviate from the other observations in the dataset. It ensures we have data points that conform to the expected behaviour of the dataset.

- Imputing missing values: Dataset imputation replaces missing values in a dataset with some generated values. It ensures that we have a complete dataset before feeding it to the model.

- Dataset standardization: Dataset standardization transforms a dataset to fit within a specific range/scale. For example, you can scale a dataset to fit within a range of 0-1 or -1-1. It will ensure that our dataset values have a unit variance of 1 and a mean of 0.

For a better understanding of the dataset standardization, you could read this [article](https://towardsdatascience.com/what-is-feature-scaling-why-is-it-important-in-machine-learning-2854ae877048).

- Handling Categorical Variables: In handling categorical values, we convert categorical data into integer values. One-Hot encoding is one of the methods that perform this process.

#### Estimators
Estimators take the processed dataset as an input and fit the model into the dataset. Estimators then train the model, which will be used to make predictions. 

Estimators are the Scikit-learn algorithms that perform classification, regression, and clustering. Common estimators are Logistic Regression, Decision Tree Classifier, K-NN clustering algorithm, Naive Bayes algorithm, and Random Forest Classifier.

### Benefits of using Scikit-learn Pipeline
- Faster model implementation through automation.
- It produces models with a very high accuracy score.
- Model debugging to remove errors during model training.
- Produces a more robust and scalable model.

### Dataset used
We will use the telecommunication dataset that contains information about their customers. This dataset will train a customer churn model. To download the dataset, use this [link](https://drive.google.com/file/d/1XXi7tng7NVF9rdFe7nMrDGV2ViPnceY5/view?usp=sharing).

After downloading the dataset, we load the dataset using Pandas. To import Pandas, use this code:

```python
import pandas as pd
```

We can use Pandas to load the dataset.

```python
df=pd.read_csv("customer-churn-dataset")
```

We will view the loaded dataset using this command:

```python
df
```

The output:

![Customer churn dataset](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/customer-churn-dataset.jpg)

Let us now start automated exploratory data analysis using the Pandas Profiling.

### Automated Exploratory Data analysis with Pandas Profiling 
To install the Pandas Profiling library, use this command:

```bash
!pip install -U pandas-profiling
```

We will use Pandas Profiling to generate a profile report. The report will give the dataset overview and dataset variables.

We generate the profile report using this code:

```python
profile = ProfileReport(df, title='Churn Data Report', explorative=True)
profile.to_notebook_iframe()
```

The title of the generated report will be `Churn Data Report`. The profile report will have the following sections:

#### Overview
The overview section produces the following output:

![Dataset overview](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/dataset-overview.jpg)

From the generated report, the dataset has 21 variables and 7043 observations/data points. The dataset has no missing values and duplication rows. The image also shows the variable types, which are categorical (13), boolean (6), and numerical (2).

#### Variables
This section shows all the dataset variables. In addition, it provides useful characteristics and information about the variables. 

The outputs below show some of the important variables:

**customerID and gender**

![CustomerID and Gender](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/customer-id-and-gender.jpg)

**SeniorCitizen and partner**

![SeniorCitizen and partner](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/senior-citizen-and-partner.jpg)

**Dependents and tenure**

![Dependents and tenure](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/dependants-and-tenure.jpg)

**InternetService and OnlineSecurity**

![InternetService and OnlineSecurity](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/internet-service.jpg)

**MonthlyCharges and TotalCharges**

![Dependents and tenure](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/monthly-charges-and-total-charges.jpg)

#### Interactions
The interaction section has the following output:

![Interaction section](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/interaction-section.jpg)

The interaction section shows the relationship between two variables using a scatter plot. For example, the image above shows the relationship between `tenure` and `monthly charges`.

#### Correlations
The correlation section shows the relationship between the dataset variables using [Seaborn’s](https://seaborn.pydata.org/) heatmap. Pandas Profiling allows toggling between the four main correlations plots.

These plots are the [Phik (φk)](https://towardsdatascience.com/phik-k-get-familiar-with-the-latest-correlation-coefficient-9ba0032b37e7), [Kendall’s τ](https://en.wikipedia.org/wiki/Kendall_rank_correlation_coefficient), [Spearman’s ρ](https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient), and [Pearson’s r](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient).

The correlations section produces the following output:

![Correlations section](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/correlations-plots.jpg)

The image above shows the `Phik (φk)` correlation plot. We can easily toggle between the four main correlations plots to view the plots. By clicking the `Toggle correlations descriptions` button, we will view a detailed description of each correlation plot.

#### Missing values
This section shows if there are missing values in the dataset.

![Misssing values](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/missing-values.jpg)

The image shows the number of data points in each variable. All the variables have the same number of data points (7043). It shows there are no missing values in the dataset.

#### Sample
This section displays the first 10 rows and the last 10 rows of our dataset.

**First 10 rows**

![First 10 rows](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/first-10-rows.jpg)

**Last 10 rows**

![Last 10 rows](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/last-10-rows.jpg)

This marks the end of automated Exploratory Data Analysis using the Pandas Profiling. The library provides a descriptive analysis of our dataset and better understands the churn dataset. Let us now specify the X and y variables of our dataset.

### X and y varables
The X variables represent all the independent variables in a dataset which are the model inputs. The y variable is dependent, which is the model output.

To add the X and y variables, use this code:

```python
X = df.drop(columns=['Churn'])
y = df['Churn']
```

From the code above, the `Churn` variable is the `y` variable, and the remaining variables are the `X` variable.

### Dataset splitting
Let us import the method used for dataset splitting.

```python
from sklearn.model_selection import train_test_split
```

We will split the dataset into two sets using the following code:

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=124)
```

We use `test_size=0.30` from the code above, which is the splitting ratio. 70% of the dataset will be for model training and 30% for model testing. 

### Variable types
Using Pandas Profiling, we were able to see that the dataset has three variable types. The variable types are: categorical (13), boolean (6) and numerical (2).

We need to specify the columns that belong to these variable types. We use the code below:

```python
numeric_features = ['tenure', 'TotalCharges']
categorical_features = ['SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'InternetService','OnlineSecurity','OnlineBackup','DeviceProtection','TechSupport','StreamingTV','StreamingMovies','Contract']
```

The code selects the columns that have categorical and numerical values.

### Selecting the unused columns
We select all the unused columns using the following code:

```python
drop_feat= ['customerID','gender','PhoneService','MultipleLines', 'PaperlessBilling','PaymentMethod']
```
We will drop the selected columns from our dataset. To drop this column, we will use one of the Scikit-learn Pipeline transformer methods. Let us first import all the transformer methods and classes.

### Importing transformer methods and classes
As mentioned earlier, the Scikit-learn Pipeline steps has two categories. Transformers and Estimators. The pipeline will have a sequence of transformers followed by a final estimator. 

We create transformers using various Sckit-learn methods and classes which perform data transformation. Let us import all the transformer methods and classes we will use in this tutorial.

```python
from sklearn.compose import ColumnTransformer 
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
```

From the code above, we have imported the following transformer methods:

- **ColumnTransformer:** It is a Scikit-learn class that applies the transformers to our columns. It also combines various transformers into a single transformer.
- **SimpleImputer:** It is a Scikit-learn class that imputes missing values. It will replace missing values in a dataset with some generated values.
- **StandardScaler:** It performs dataset standardization. It will ensure that our dataset values have a unit variance of 1 and a mean of 0.

For a better understanding of the dataset standardization process, read this [article](https://towardsdatascience.com/what-is-feature-scaling-why-is-it-important-in-machine-learning-2854ae877048)

**OneHotEncoder:** It performs categorical encoding. The method converts categorical data into integer values using a one-hot scheme.

For a better understanding of OneHotEncoder, read this [article](https://towardsdatascience.com/categorical-encoding-using-label-encoding-and-one-hot-encoder-911ef77fb5bd).

Let us now create our first transformer using these methods.

### Drop columns transformer
The first transformer will drop the unused columns.

```python
drop_transformer = ColumnTransformer(transformers=[('drop_columns', 'drop', drop_feat)], remainder='passthrough')
```

The unused columns are in the `drop_feat` variable. The `remainder='passthrough'` will enable the model to use the remaining columns in the dataset.

We will then add the `drop_transformer` to the `Pipeline` class. However, first, let us import the `Pipeline` class from Scikit-learn.

### Import the 'Pipeline' class
We import the `Pipeline` class as follows:

```python
from sklearn.pipeline import Pipeline
```

The `Pipeline` assembles all the initialized transformers and the final estimator. It then executes them as a single process to produce a final model. 

To add the `drop_transformer`, use this code:

```python
pipeline = Pipeline([('drop_column', drop_transformer)])
```

Next, we fit the pipeline.

```python
pipeline.fit(X_train)
```

It fits the model to the training set. It produces the following output:

![ColumnTransformer](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/column-transformer.jpg)

The output shows the `drop_transformer` added to the `Pipeline` class. The next step is to use the `transform` method to drop the unused columns.

```python
transformed_train=pipeline.transform(X_train)
```

To see the transformed dataset, use this code:

```python
transformed_train
```

The output is shown below:

![Dropped columns](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/dropped-columns.jpg)

### Numeric Transformers
The numeric transformers will perform data imputation and standardization.

To initialize these transformers, use this code:

```python
numeric_transformer = Pipeline(steps=[
                                     ('meanimputer', SimpleImputer(strategy='mean')),
                                     ('stdscaler', StandardScaler())
                                     ])
```
From the code above, `SimpleImputer` will perform data imputation. `strategy='mean'` replaces the missing values using the generated mean in each column. The `StandardScaler()` method performs data standardization. 

### Categorical transformer
It will handle the categorical values in the dataset. Then, we will use the `OneHotEncoder` method to convert the categorical data into integer values.

```python
categorical_transformer = Pipeline(steps=[
                                         ('onehotenc', OneHotEncoder(handle_unknown='ignore'))
                                         ])
```
We then combine these initialized transformers.

### Combining the initialized transformers
We use the following code:

```python
col_transformer = ColumnTransformer(transformers=[('drop_columns', 'drop', drop_feat),
                                                   ('numeric_processing',numeric_transformer, numeric_features),
                                                    ('categorical_processing', categorical_transformer, categorical_features)
                                                  ], remainder='drop')
```
We have used `ColumnTransformer` to combine all the initialized transformers. `numeric_processing` transforms the `numeric_features` , while `categorical_processing` transforms the `categorical_features`. We save the final transformer in the `col_transformer` variable. 

Let us add it to the `Pipeline` class.

### Adding the 'col_transformer' transformer
To add the `col_transformer`to `Pipeline` class, use this code:

```python
pipeline = Pipeline([('transform_column', col_transformer)])
```

Next, we fit the pipeline to the train set.

```python
pipeline.fit(X_train)
```

It produces the following output:

![Added transfomers](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/added-transformer.jpg)

The image above shows all the added transformers. The next step is to use the `transform` method to apply the transformers to the columns.

### Applying the transformers

```python
transformed_train=pipeline.transform(X_train)
```
To see the transformed dataset, use this code:

```python
pd.DataFrame(transformed_train)
```

![Transformed dataset](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/transformed-dataset.jpg)

#### Applying the transformers to test dataset
Use this code:

```python
pipeline.transform(X_test)
```
To see the transformed test dataset, use this code:

![Transformed test dataset](/engineering-education/machine-learning-using-pandas-profiling-and-scikit-learn-pipeline/transformed-test-dataset.jpg)

### Adding the final estimator
The last step in the Scikit-learn Pipeline is to add an estimator. An estimator is an algorithm that trains the machine learning model. We will use the `LogisticRegression` as the estimator.

```python
from sklearn.linear_model import LogisticRegression
```
To add the estimator to the `Pipeline` class, use this code:

```python
pipeline = Pipeline([
                     ('transform_column', col_transformer),
                     ('logistics', LogisticRegression())
                    ])
```

From the image above, the `Pipeline` class has all the transformers (col_transformer) and the final estimator (LogisticRegression). 

Let us fit the model into the dataset.

### Fitting the pipeline 
To fit the pipeline, use this code:

```python
pipeline.fit(X_train, y_train)
```
The pipeline will identify patterns in the training set.

### Getting accuracy score on the training set
To get the accuracy score, use the following code:

```python
pipeline.score(X_train, y_train)
```
The output is shown below:

```bash
0.7953346855983773
```

It is a good accuracy score and shows the model has a 79.533% chance of making correct predictions. 

Let us evaluate the model using the testing set.

### Getting accuracy score on the testing set
We get the accuracy score using the following code:

```python
pipeline.score(X_test, y_test)
```

The output is shown below:

```bash
0.8078561287269286
```

When we compare the two accuracy scores, the accuracy score on the testing set is better. It shows that the model still performs well using the testing set, which is new to the model. 

### Conclusion
In this tutorial, we learned how to build a machine learning model using Pandas Profiling and Scikit-learn Pipeline. The tutorial explained how the Scikit-learn Pipeline works and the key pipeline steps. Pandas Profiling generated a profile report that shows the dataset overview. 

After this process, we implemented our transformers using Scikit-learn transformer methods and classes. Then, we stacked these transformers together, and the other added a final estimator. Finally, we trained the customer churn model using the Telecommunication dataset. 

The model had a good accuracy score using the training and the testing dataset. To access the complete Google Colab notebook for this tutorial, click [here](https://colab.research.google.com/drive/1gIUVxhtOyeh_JDb4PA7r0GsZMmRIer_Z?usp=sharing).

### References
- [Scikit-learn Pipeline documentation](https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html)
- [Pipelines and composite estimators](https://scikit-learn.org/stable/modules/compose.html)
- [Scikit-learn ColumnTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html)
- [Categorical encoding](https://towardsdatascience.com/categorical-encoding-using-label-encoding-and-one-hot-encoder-911ef77fb5bd)
- [Scikit-learn OneHotEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html)
- [Dataset standardization](https://towardsdatascience.com/what-is-feature-scaling-why-is-it-important-in-machine-learning-2854ae877048)
- [Introductioon to Pandas Profiling](https://medium.com/@sandeep.panchal545/pandas-profiling-to-boost-exploratory-data-analysis-8e718238bcd1)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
