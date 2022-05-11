---
layout: engineering-education
status: publish
published: true
url: /univariate-time-series-analysis-with-arima-in-python/
title: Univariate Time Series Analysis and Forecasting with ARIMA/SARIMA
description: This tutorial will discuss a few essential concepts like time series with ARIMA and Seasonal ARIMA. We will implement the ARIMA and Seasonal ARIMA models with Python.
author: joseph-gatura
date: 2022-05-11T00:00:00-14:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/univariate-time-series-analysis-with-arima-in-python/hero.jpg
   alt: Forecasting with ARIMA and Seasonal ARIMA in Python Hero Image
---
A time series is a sequence of data points that occur over regular time intervals. A time series shows all the time-dependent variables in the dataset. An example of time series data is stock prices and weather records. 
<!--more-->
In time series analysis and modeling, we train models to identify patterns in datasets. Time series forecasting involves finding the future values that the time series will take. 

A time series can be univariate, bivariate, or multivariate. A univariate time series has only one variable, a bivariate has two variables, and a multivariate has more than two variables. 

In this tutorial, we will be dealing with univariate time series modeling. We will first discuss a few concepts in ARIMA and Seasonal ARIMA models. We will then practically implement the ARIMA and Seasonal ARIMA models.

### Table of contents
- [Prerequisites](#prerequisites)
- [How the ARIMA model works](#how-the-arima-model-works)
- [what is a stationary time series?](#what-is-a-stationary-time-series)
- [What is differencing?](#what-is-differencing)
- [Components of the ARIMA model](#components-of-the-arima-model)
- [How to check for stationarity](#how-to-check-for-stationarity)
- [Augmented Dickey-Fuller test](#augmented-dickey-fuller-test)
- [How SARIMA works](#how-sarima-works)
- [Time series dataset](#time-series-dataset)
- [Loading the dataset](#loading-the-dataset)
- [Visualizing the time series data](#visualizing-the-time-series-data)
- [Implementing Augmented Dickey-Fuller test](#implementing-augmented-dickey-fuller-test)
- [Applying the function](#applying-the-function)
- [Implementing differencing](#implementing-differencing)
- [Plotting the new dataset](#plotting-the-new-dataset)
- [Implementing the ARIMA model](#implementing-the-arima-model)
- [Plotting ACF](#plotting-acf)
- [Plotting PACF](#plotting-pacf)
- [Import the ARIMA model](#import-the-arima-model)
- [Training the ARIMA model](#training-the-arima-model)
- [Testing the ARIMA model using the test dataset](#testing-the-arima-model-using-the-test-dataset)
- [Implementing the SARIMA model](#implementing-the-sarima-model)
- [Training the SARIMA model](#training-the-sarima-model)
- [Testing the SARIMA model using the test dataset](#testing-the-sarima-model-using-the-test-dataset)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To easily follow this tutorial, a reader should know the following:
- [Time series concepts](/engineering-education/introduction-to-time-series/)
- [Time series analysis and modeling](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/)
- [Time series applications](https://www.tutorialspoint.com/time_series/time_series_applications.htm)
- [Time series patterns](https://otexts.com/fpp2/tspatterns.html)
- [Time series plots](https://towardsdatascience.com/5-types-of-plots-that-will-help-you-with-time-series-analysis-b63747818705)

> NOTE: Ensure you implement the ARIMA and SARIMA models in [Gooogle Colab](https://research.google.com/colaboratory/).

### How the ARIMA model works
Auto-Regressive Integrated Moving Average (ARIMA) is a time series model that uses the information in the past time series values to make future predictions. The information found in the past values will indicate the nature of the future predictions. For example, an ARIMA model can predict future stock prices after observing and analyzing previous stock prices.

The ARIMA model will use the single time-dependent (univariate) variable in the time series to make predictions. ARIMA models only work when the time series is stationary.

### What is a stationary time series?
A stationary time series is a series whose properties remain constant over time. These properties are variance, mean, and covariance. Stationary time series do not have trends and repetitive cycles/seasonality. Most time-series is non-stationary, especially stock prices and other financial data.

For ARIMA models to work, we have to make the data stationary. We remove the trends and seasonality. This will make it easier for ARIMA to make a prediction. To make a time series stationary, we apply the differencing technique. 

### What is differencing?
Differencing is the process of making a time series stationary. It is an essential step in dataset preprocessing. It makes the variance, the covariance, and the mean of the time series constant. It also reduces the repetitive cycles and seasonality components in the time series data.

The differencing technique finds the difference between the current time series value and the previous value. We may get the difference between the time series values once but still not make the time series stationary. In this case, we need to find the difference multiple times until the time series becomes stationary.

### Components of the ARIMA model
The ARIMA model is comprised of three components. They are combined to form the final ARIMA model. 

The components are as follows:
1. Auto Regression
2. Integrated
3. Moving average 

#### Auto Regression
It uses the previous time series values in the time series to make future predictions. It uses the dependency between a current time series value and past observations. 

#### Integrated
This component performs differencing to make the time series stationary. It subtracts a current time series value from the previous time series value.

#### Moving Average
It uses errors in past predictions to make future predictions. It uses the dependency between an actual time series value and model errors from previous ones.

When creating an ARIMA model, we pass each component as a parameter using the following standard notations: `p`, `d`, and `q`. They represent the parameters that build the ARIMA model. We initialize the ARIMA model as ARIMA (p,d,q). 

The functions of the standard notations are as follows:

- p: It represents the order of the Auto Regression (AR) component. It represents the number of lag observations found in the ARIMA model. A lag is the time gap between two data points/observations in the time series. We get the best value of `p` using a [Partial Autocorrelation Function](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64) (PACF) plot.

- d: It is the total differencing steps performed to make the time series stationary. If the time-series data is already stationary, there is no need for differencing.

- q: It represents the order of the Moving Average (MA) component. It shows the forecast errors that the final ARIMA Model should have. We get the best value of `q` using an [AutoCorrelation Function](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64) (ACF) plot.

> NOTE: An order in a time series is the number of previous observations/time series values that the model uses to make a single prediction. 

### How to check for stationarity
We will visualize the time series charts and perform statistical tests to check for stationarity.

#### Visualizing the time series charts
This entails visualizing the time-series plots (line charts) to check for trends or seasonality. 

#### Performing statistical tests
This entails performing statistical tests on the time series to check for stationarity. We use various statistical tools for this testing. In this tutorial, we will use the Augmented Dickey-Fuller tool.

### Augmented Dickey-Fuller test
We will implement the Augmented Dickey-Fuller (ADF) test to check for stationarity. The ADF test uses hypothesis testing to check for stationarity. It has a null hypothesis and an alternative hypothesis. The null hypothesis of this test is that the times series is non-stationary. The alternative hypothesis is that the time series is stationary.

The ADF test has an important parameter known as the `p-value` that determines whether a time series is stationary. The time series is stationary when the `p-value` is less than 0.05.

### How SARIMA works
Seasonal Autoregressive Integrated Moving Average (Seasonal ARIMA) is a subset of ARIMA models that supports the direct modeling of time series with seasonality/repeating cycles.

We will also implement SARIMA using the ARIMA models parameters (p,d,q). We then add a few new parameters to handle the repeating cycles or seasonality. The newly added parameters are `P`, `Q`, `D`, and `s`. We initialize the SARIMA model as SARIMA(p,d,q)(P, D, Q, s). 

- `D`: It represents the number of seasonal differences steps in the time series.
- `Q`: It represents the order of the seasonal moving average component.
- `P`: It represents the order of the seasonal autoregressive component.
- `s`: It represents the periods in each seasonality component. The number of periods (months) in a year is 12, s=12.

SARIMA handles seasonality using the `D` parameter. It performs seasonal differencing. It subtracts data points in the seasonality components. The next step is to start building our models.

### Time series dataset
We will prepare the sales dataset. The dataset will build a time series model that predicts monthly champagne sales. You can get the dataset from [here](https://drive.google.com/file/d/10haWtwrkr15Z-GhHg_t18fVi7V0buSsR/view?usp=sharing). The dataset shows monthly sales from 1964 to 1972. We will build the model on the training dataset and make predictions using the test dataset. 

#### Loading the dataset
We will use the `Pandas` library to load the dataset.

```python
import pandas as pd
```
Use this code to read the data:

```python
df = pd.read_csv('monthly-sales.csv')
```
To display the first five data points of the dataset, use this code:

```python
df.head()
```
First five data points:

![First five](/engineering-education/univariate-time-series-analysis-with-arima-in-python/first-five.png)

To display the last five data points of the dataset, use this code:

```python
df.tail()
```
Last five data points:

![Last five](/engineering-education/univariate-time-series-analysis-with-arima-in-python/last-five.png)

From this output, the 105th and the 106th data points/rows have missing values. We will have to drop these data points. We also have to rename the columns.

#### Renamaing columns
To rename the columns, use this code:

```python
df.columns=["Month","Sales"]
df.head()
```
The output of the renamed columns:

![New column names](/engineering-education/univariate-time-series-analysis-with-arima-in-python/renamed-columns.png)

#### Drop the data points
To drop the 105th and the 106th data points/rows, use this code:

```python
df.drop(,axis=0,inplace=True)
df.drop(,axis=0,inplace=True)
df.tail()
```
Output:

![Dropping the rows](/engineering-education/univariate-time-series-analysis-with-arima-in-python/dropping-rows.png)

We have dropped these rows. The new dataset will now have 104 data points/rows.

#### Converting the 'month' column
We need to convert the `month` column to a `DateTime` format. This format allows us to perform time-series analysis. We will use the `pd.to_datetime` function. 

```python
df['Month']=pd.to_datetime(df['Month'])
```
To see the converted `month` column, run this code:

```python
df.head()
```
Output:

![Columns](/engineering-education/univariate-time-series-analysis-with-arima-in-python/datetime-columns.png)

We also need to set the `month` column as the index column. Use this code:

```python
df.set_index('Month',inplace=True)
```
To view the new changes, run this code:

```python
df.head()
```
Output:

![Index column](/engineering-education/univariate-time-series-analysis-with-arima-in-python/index-column.png)

### Visualizing the time series data
We will plot time series data and check for trends or seasonality/repeating cycles. As mentioned earlier, this is a simple method to check for time series stationarity or non-stationarity. We will use `Matplotlib` for plotting.

```python
import matplotlib.pyplot as plt
```
To plot, run this code:

```python
df.plot()
```
It produces the following line chart:

![Line chart](/engineering-education/univariate-time-series-analysis-with-arima-in-python/monthly-sales-line-chart.png)

The line chart plots the `sales` against `month`. Through visualization, the time series has seasonality or repeating cycles. The spikes and dips keep on repeating during certain months of the year. 

We can conclude that the time series is non-stationary since it has seasonality. We still need to perform a statistical test on the time series to prove this non-stationarity. As mentioned earlier, we will use the Augmented Dickey-Fuller test.

### Implementing Augmented Dickey-Fuller test
We import the Augmented Dickey-Fuller tool as follows:

```python
from statsmodels.tsa.stattools import adfuller
```
We initialize the `adfuller` function and pass the `sales` column as follows:

```python
passing_data=adfuller(df['Sales'])
```
We will create a function that will check for dataset stationarity. We just need to prove what we have observed earlier on the line chart.

```python
def adf_test(sales):
    result=adfuller(sales)
    labels = ['Test parameters', 'p-value','#Lags Used','Dataset observations']
    for value,label in zip(result,labels):
        print(label+' : '+str(value) )
    if result[1] <= 0.05:
        print("Dataset is stationary")
    else:
        print("Dataset is non-stationary ")
```

The ADF test will check for stationarity. The `p-value` will determine whether the time series is stationary. When the `p-value` of the ADF test is less than 0.05, then the time series is stationary. We then apply the function to the `Sales` column to know the ADF test results and get the `p-value`.

#### Applying the function
To apply the function, use this code:

```python
adf_test(df['Sales'])
```
It produces the following results:

![ADF test results](/engineering-education/univariate-time-series-analysis-with-arima-in-python/adf-test-results.png)

From the output above, we have different output values that show the nature of our dataset. We are only interested in the `p-value` result. The `p-value` is 0.363915771660247. 

This number is greater than 0.05. It implies that the time series is non-stationary. We will have to make the time series stationary using the differencing approach.

### Implementing differencing
This approach finds the difference between the current monthly values and the previous monthly values in the time series. We will difference only once, therefore our `d=1`.

```python
df['Differencing']=df['Sales']-df['Sales'].shift(12)
```
This code will difference `sales` values. 

We again perform the Augmented Dickey-Fuller test to check whether the time series has become stationary.

```python
adf_test(df['Differencing'].dropna())
```
The test results.

![ADF test results](/engineering-education/univariate-time-series-analysis-with-arima-in-python/testing-again.png)

From the test results the `p-value` is 2.519620447387081e-10 (0.0000000002519620447387081). This number is < 0.05, therefore the dataset has become stationary. We will plot this new time series to see whether we have removed the seasonal components.

### Plotting the new dataset
To plot the new dataset, use this code:

```python
df['Differencing'].plot()
```
![New dataset plot](/engineering-education/univariate-time-series-analysis-with-arima-in-python/new-dataset-plot.png)

From the output above, we have removed the seasonal components. We can start applying the ARIMA model to the dataset.

### Implementing the ARIMA model
As mentioned earlier, we initialize the ARIMA model as ARIMA (p,d,q). So we need to get the values of these parameters. We have already discussed the function of each parameter. 

We already know the `d=1`. It is because we have performed differencing only once. The next step is to get the best `p` and `q` values.

#### Getting the best 'p' and 'q' values
We get the best value of `q` using an [Autocorrelation Function](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64) (ACF) plot. 

We get the best value of `p` using a [Partial Autocorrelation Function](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64) (PACF) plot.

Lets import `PACF` and `ACF`.

```python
from statsmodels.graphics.tsaplots import plot_acf,plot_pacf
import statsmodels.api as sm
```
We then first plot the ACF as follows:

#### Plotting ACF
To plot the ACF, use this code:

```python
ax1 = fig.add_subplot(211)
fig = sm.graphics.tsa.plot_acf(df['Differencing'].iloc[13:],lags=40,ax=ax1)
```
The code above produces the following plot:

![ACF plot](/engineering-education/univariate-time-series-analysis-with-arima-in-python/acf-plot.png)

We will use this plot to get the best value of `q`. From the ACF plot, lag number one stands out. The red arrow shows the lag point. It is slightly above (cuts off) the significance line (the blue line). We will select this lag as the best value of `q`. Therefore, `q=1`.

To understand how to interpret an ACF plot and get the best value of  `q`, read this [article](https://people.duke.edu/~rnau/411arim3.htm).

#### Plotting PACF
To plot the PACF, use this code:

```python
ax2 = fig.add_subplot(212)
fig = sm.graphics.tsa.plot_pacf(df['Differencing'].iloc[13:],lags=40,ax=ax2)
```
It produces the following plot:

![PACF plot](/engineering-education/univariate-time-series-analysis-with-arima-in-python/pacf-plot.png)

We will use this plot to get the best value of `p`. From the PACF plot, we can observe that lags 1 and 13 stand out. The red arrow shows the lag points. 

These points are above (cuts off) the significance line (the blue shaded line). We select lag number one as the best value of `p`. It is the first lag that is above the blue line. Therefore, `p=1`. 

Our values will be: `p=1`, `d=1` and `q=1`. The next step is to import the ARIMA model.

### Import the ARIMA model
We import the ARIMA model as follows:

```python
from statsmodels.tsa.arima_model import ARIMA
```
We initialize the model as follows:

```python
model=ARIMA(df['Sales'],order=(1,1,1))
```
### Training the ARIMA model
We use `fit` function to train the ARIMA model. The ARIMA model will learn from the time series dataset.

```python
arima_model=model.fit()
```

We have trained the ARIMA model. We can use it to predict the test dataset. The prediction will show the actual monthly sales and the predicted (forecast) sales.

### Testing the ARIMA model using the test dataset
We will use the values from the 90th row to the 103rd row as the test portion/set. We will then use `Matplotlib` to show the actual and the predicted (forecast) monthly sales. 

```python
df['forecast']=arima_model.predict(start=90,end=103,dynamic=True)
df[['Sales','forecast']].plot(figsize=(12,8))
```
It produces the following line chart:

![ARIMA line-chart](/engineering-education/univariate-time-series-analysis-with-arima-in-python/arima-line-chart.png)

From the output above:
- The blue line is the actual monthly sales.
- The orange line is the forecast sales. 

The ARIMA model has not performed well since it has not made correct predictions. The orange line is far apart from the blue line. We will now build another time series model using SARIMA to improve the performance.

### Implementing the SARIMA model
SARIMA will handle and model time series data with repeating cycles or seasonality. From the earlier ADF test, the dataset has seasonality. We initialize the SARIMA model as SARIMA (p,d,q)(P, D, Q, s). We already have the `p`, `d`, and `q` values. 

We can get the `P`, `D`, `Q` in the same way. Thus, p=P, q=Q, and d=D. `s=12` since there are 12 months in a year. We initialize the SARIMA model as follows:

```python
model=sm.tsa.statespace.SARIMAX(df['Sales'],order=(1, 1, 1),seasonal_order=(1,1,1,12))
```
### Training the SARIMA model
We use `fit` function to train the SARIMA model. The SARIMA model will learn from the time series dataset. 

```python
sarima_model=model.fit()
```
We have trained the SARIMA model. We can use it to predict the test dataset. The prediction will show the actual monthly sales and the forecast sales.

### Testing the SARIMA model using the test dataset
We will also use the values from the 90th row to the 103rd row as the test portion/set. We use `Matplotlib` to show the actual and the predicted (forecast) sales as follows:

```python
df['forecast']=sarima_model.predict(start=90,end=103,dynamic=True)
df[['Sales','forecast']].plot(figsize=(12,8))
```

It produces the following line chart:

![SARIMA line-chart](/engineering-education/univariate-time-series-analysis-with-arima-in-python/sarima-line-chart.png)

From the output above:
- The blue line is the actual monthly sales.
- The orange line is the forecast sales. 

The time series model had made correct predictions since the two lines are close together. The SARIMA model has performed well as compared to the ARIMA model.

### Conclusion
We have built a univariate time series model with ARIMA and SARIMA in Python. We discussed how both the ARIMA and SARIMA models work. We also talked about time-series stationarity and how to make the series stationary using differencing. We covered how to check for stationarity using the Augmented Dickey-Fuller test.

We explored all the components of the ARIMA model and their specific parameters. We then used the autocorrelation Function (ACF) plot and Partial Autocorrelation Function (PACF) plot to get the best `p` and `q` values. Finally, we implemented both the ARIMA and SARIMA models. The SARIMA model made better predictions.

You can get the Python code for this article from [here](https://colab.research.google.com/drive/1_cuqDtySmRnvXkzJmLaQ4YzJ63YCwzwR?usp=sharing).

Happy coding!

### References
- [Interpreting Autocorrelation and Partial Autocorrelation plots](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64)
- [Autocorrelation and Time Series Methods](https://online.stat.psu.edu/stat462/node/188/)
- [What is Arima and Sarima models](https://becominghuman.ai/what-is-arima-and-sarima-model-10972b5e13c0)
- [Introduction to Autocorrelation and Partial Autocorrelation](https://machinelearningmastery.com/gentle-introduction-autocorrelation-partial-autocorrelation/#:~:text=Autocorrelation%20and%20partial%20autocorrelation%20plots,observations%20at%20prior%20time%20steps.)
- [Identifying AR and MA terms](https://people.duke.edu/~rnau/411arim3.htm)
- [Handling a Non-Stationary Time Series](https://www.analyticsvidhya.com/blog/2018/09/non-stationary-time-series-python/)
- [Non-Stationary Processes](https://www.investopedia.com/articles/trading/07/stationary.asp)
- [ARIMA definition](https://www.investopedia.com/terms/a/autoregressive-integrated-moving-average-arima.asp)
- [Understanding SARIMA Model](https://towardsdatascience.com/time-series-forecasting-with-a-sarima-model-db051b7ae459)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
