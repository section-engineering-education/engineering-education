---
layout: engineering-education
status: publish
published: true
url: /missing-values-in-time-series/
title: A Complete guide on how to impute Time Series Missing Values in Python
description: This tutorial will cover how to impute missing values in a time series in Python.
author: dennis-kimutai-koech
date: 2022-01-27T00:00:00-14:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/missing-values-in-time-series/hero.png
    alt: A Complete guide on how to impute Time Series Missing Values in Python Hero Image
---
When working with real-world data, it is a common challenge to encounter missing values.
<!--more-->
This article will guide us in addressing such a problem in time series data.

### Prerequisites
- Have a good understanding of how to work with [time series data](https://ck7aj.medium.com/the-basics-of-time-series-data-analysis-with-numpy-9cc1723153bf) in NumPy.
- Have a prepared Dataset. I am using this [Dataset](https://github.com/DennisKimt/datasets/commit/28bc7c1804279d8401b4dd399fe264852d719655) for this project. 
- Access to the [Jupyter Notebook](https://jupyter.org/) or [Google Colab](https://colab.research.google.com/?utm_source=scs-index).

### Introduction
Time series data usually differ from the machine learning datasets. In time series, data is collected in different conditions over time, and various mechanisms may contribute to missing records in different periods. Those mechanisms are known as **Missingness Mechanisms.**

There are three types of missing data:
1. Missing Completely at Random(MCAR): In simple terms, `MCAR` means there is no relationship between the missing data and already observed data. The probability of the missing data is entirely random and is not dependent on already observed data, i.e., `$P(Missing \ | \ Complete \ data)=p(Missing)$`.
2. Missing at Random(MAR): A variable is missing at random if the probability of missingness depends only on the available information, i.e., `$P(Missing \ | \ Complete \ data)=p(Missing \ | \ Observed \ data)$`.
3. Missing not at Random(MNAR): The probability of missingness, in this case, depends on the variable itself.

Time series models work with complete data, and therefore they require the missing data to be replaced with meaningful values before actual analysis. At a high level, missing values in time series are handled in two ways, either dropping them or replacing them. However, dropping missing values can be an inappropriate solution due to the time order of the data and the correlation between observations in adjacent periods.

Estimating a reasonable value such that the components of the series are not distorted is an excellent approach to dealing with missing values in time series. Imputation is the process of replacing missing values with values estimated from the same data or observed from the environment with the same conditions underlying the missing data.

Let us look at Python's various imputation techniques used in time series.

### Python implementation
In this step, we will work with the following libraries.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

import warnings
warnings.filterwarnings('ignore')

```

The data we will use in this implementation is about customers who visited a particular shop between the years 1949 to 1960. The link to download this data is provided in the prerequisites section. Make sure you have it downloaded and import it to your working space. Let us do so together.

### Importing the dataset
On top of reading our data to our workspace, we will convert it into a time series format.

```python
# import the data
dataset= pd.read_csv('/content/Time-Series.csv', header=None)
# name the columns
dataset.columns=['Date','Customers']
# represent date column in date fromat in the order, Year, month and the day
dataset['Date']=pd.to_datetime(dataset['Date'], format='%Y-%m')
# set the Date column be the index of our dataset
dataset= dataset.set_index('Date')
# now check the data shape
dataset.shape
```

Output:
```bash
(144, 1)
```

From this output, our data has 144 observations and 1 column. This type of time series is called univariate, contrary to multivariate time series, which has more than 1 column of interest.

With the aid of the `head()` function, we can look at the first five observations as follows:

```python
dataset.head()
```

Output:
![data head](/engineering-education/missing-values-in-time-series/data-head.png)

Our data is in the correct format. So, with the help of the `isnull()` method, let us check if this data has missing values.

```python
# creating series True or False for NaN data and present data respectively. 
nul_data = pd.isnull(dataset['Customers']) 
    
# print only the data, Customers = NaN 
dataset[nul_data]
```

Output:

![missing values](/engineering-education/missing-values-in-time-series/null-data.png)

Indeed our data has missing values. Our code returned four instances of missing data together with the dates associated with them. Since we are working with a univariate time series, and our data is not too large, we can plot this series, visually see where these NaN points appear in the graph and get the general idea of what type of time series we are working with. Let us run the following code and get this done.

```python
 # set the size of our plot
plt.rcParams['figure.figsize']=(15,7)
# plots our series
plt.plot(dataset, color='blue')
# adds title to our time series plot
plt.title('Customers visted shop since 1950') 
# print the plot
plt.show()
```

![data values](/engineering-education/missing-values-in-time-series/data-plot.png)

The broken points within the curve indicate missing values in our data. As we can see, the seasonality component in the data is not the same for different years. Now, let us apply techniques used to impute time series data and complete our data. These techniques are:

#### Mean imputation
This technique imputes the missing values with the average value of all the data already given in the time series. In python, we implement this technique as follows:

```python
# declare the size of the  plot
plt.rcParams['figure.figsize']=(15,7)
# fill the missing data using the mean of the present observations
dataset = dataset.assign(FillMean=dataset.Customers.fillna(dataset.Customers.mean()))
# pass the data and declared the colour of your curve, i.e., blue
plt.plot(dataset, color='blue')
# add tittle to the plot
plt.title('Mean Imputation')
 # print the plot
plt.show()
```

Output:

![mean imputation](/engineering-education/missing-values-in-time-series/mean-imp.png)

The second technique we will consider is *Median*.

#### Median imputation
We replace the missing values in the data with the meadian value of the data. We implement this technique as fiollows:

```python
# declare the size of the  plot
plt.rcParams['figure.figsize']=(15,7)
# fill the missing data using the of the present observations
dataset = dataset.assign(FillMean=dataset.Customers.fillna(dataset.Customers.median()))
# pass the data and declared the colouyr opf our curve as blue
plt.plot(dataset, color='blue')
# add tittle to the plot
plt.title('Median Imputation')
 # print the plot
plt.show()
```

Output:

![median imputation](/engineering-education/missing-values-in-time-series/median-imp.png)

Upon plotting the data in both of the above two methods, it is clear that all missing values were successfully imputed. However, we can notice a problem with using these techniques.

These techniques do not work appropriately if the time series has seasonality and trend components. The seasonality and trend components are not considered while imputing the missing data. Therefore, they can only work better if the observed time series has no seasonality or trend component. 

If the time series has these components, the following methods work better to impute its missing values:

1. Last Observation Carried Forward(LOCF)

According to this technique, the missing value is imputed using the values before it in the time series. Let's learn how this method is implemented. The code below demonstrates how to implement the *LOCF*.

```python
# figure size
plt.rcParams['figure.figsize']=(15,7)
# On the customer column of our data, impute the missing values with the LOCF
dataset['Customers_locf']= dataset['Customers'].fillna(method ='bfill')
# plot our time series with imputed values
plt.plot(dataset['Customers_locf'], color='blue')
#Plot tittle
plt.title('Last Observation Carried Forward')
# show the plot
plt.show()
```

Output:

![locf-plot](/engineering-education/missing-values-in-time-series/locf.png)

2. Next Observation Carried Backward(NOCB)

According to this technique, the missing values are imputed using an immediate value ahead of them. We can implement this method as follows:

```python
# ffigure size
plt.rcParams['figure.figsize']=(15,7)
# On the customer column of our data, impute the missing values with the LOCF
dataset['Customers_nocb']= dataset['Customers'].fillna(method ='ffill')
# plot our time series with imputed values
plt.plot(dataset['Customers_nocb'], color='blue')
#Plot tittle
plt.title('Next Observation Carried Backward')
# show the plot
plt.show()
```

Output:

![nocb-plot](/engineering-education/missing-values-in-time-series/nocb.png)

3. Linear interpolation

Lastly, let us look at the linear interpolation. This technique originates from Numerical Analysis, which estimates unknown values by assuming linear relation within a range of data points, unlike linear extrapolation, which estimates data outside the range of the provided data points. To estimate the missing values using linear interpolation, we look at the past and the future data from the missing value.

Therefore, the found missing values are expected to fall within two finite points whose values are known, hence a known range of values in which our estimated value can lie. Following is a python code for implementing linear interpolation on our data.

```python
# setting the plot size
plt.rcParams['figure.figsize']=(15,7)
# on our data, impute the missing values using rolling window method
dataset['Customers_L']= dataset['Customers'].interpolate(method='linear')
# plot the complete dataset
plt.plot(dataset['Customers_L'], color='blue')
# add the tittle of our plot as Linear interpolation
plt.title('Linear interpolatoin')
# print the plot
plt.show()
```

![linear interpolation](/engineering-education/missing-values-in-time-series/linear-interpolation.png)

Lastly, let us look at our final method.

#### Spline interpolation
Using a mathematical function, the method estimates values that minimize overall curvature, thus obtaining a smooth surface passing through the input points. The code below implements this method:

```python
# setting the plot size
plt.rcParams['figure.figsize']=(15,7)
# on our data, impute the missing values using the interpolation techniques and specifically, the lineare method
dataset['Customers_Spline']= dataset['Customers'].interpolate(option='spline')
# plot the complete dataset
plt.plot(dataset['Customers_Spline'], color='blue')
# add the tittle of our plot as Linear interpolation
plt.title('Spline Interpolation')
# print the plot
plt.show()
```

Output:

![spline interpolation](/engineering-education/missing-values-in-time-series/spline.png)

However, these methods we have discussed all assume that the adjacent data points are similar, which is not always the case. There are advanced approaches used in cases where this assumption does not hold and is beyond this tutorial's scope. All these methods we have discussed in this session perform best in different situations depending on the underlined components and type of the time series. 

However, linear and spline interpolation tends to provide imputation values. The imputed data has the [Mean Square Error](https://en.wikipedia.org/wiki/Mean_squared_error); hence, they can be considered the best techniques at this level.

### Conclusion
In this article, we have learned about various methods to utilize and appropriately take care of the missing values in the time series. Also, we saw how these methods are implemented in Python, which closed our session up. I hope you found this content helpful, and thanks for making it to this end.

Happy coding!
