A time series is a measured metric value over regular time intervals eg stock prices and weather records. A time series shows all the variables that affect the recorded metric in the dataset.

In time series analysis and modeling, we will train models to gain an understanding of the time series data. Forecasting involves finding the future values that the time series will take.

A time series can be univariate, bivariate, or multivariate. Univariate consists of only one variable, bivariate has two variables, and multivariate has more than two variables. In this tutorial, we will be dealing with univariate time series modeling.

We will first discuss a few concepts that are essential to understanding time series with ARIMA and Seasonal ARIMA. We will finally implement the ARIMA and Seasonal ARIMA models with Python.

### Table of contents
- [Prerequisites](#prerequisites)
- [How the ARIMA model works](#how-the-arima-model-works)
- [what is a stationary time series?](#what-is-a-stationary-time-series)
- [Differencing](#differencing)
- [Components of ARIMA model](#components-of-arima-model)
- [How to check for stationarity](#how-to-check-for-stationarity)
- [Augmented Dickey-Fuller test](#augmented-dickey-fuller-test)
- [How SARIMA works](#how-sarima-works)
- [Time series dataset](#time-series-dataset)
- [Using the dataset](#using-the-dataset)
- [Visualizing the time series data](#visualizing-the-time-series-data)
- [Implementing Augmented Dickey-Fuller test](#implementing-augmented-dickey-fuller-test)
- [Applying the function](#applying-the-function)
- [Implemnting differencing](#implemnting-differencing)
- [Plotting the new dataset](#plotting-the-new-dataset)
- [Implementing the ARIMA model](#implementing-the-arima-model)
- [Plotting ACF](#plotting-acf)
- [Plotting PACF](#plotting-pacf)
- [Import the ARIMA model](#import-the-arima-model)
- [Training the ARIMA model](#training-the-arima-model)
- [Testing the ARIMA model using the test portion](#testing-the-arima-model-using-the-test-portion)
- [Implementing the SARIMA model](#implementing-the-sarima-model)
- [Training the SARIMA model](#training-the-sarima-model)
- [Testing the SARIMA model using the test portion](#testing-the-sarima-model-using-the-test-portion)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should understand the following:

- [Time series concepts](/engineering-education/introduction-to-time-series/)
- [Time series analysis and modelling.](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/)
- [Time series applications](https://www.tutorialspoint.com/time_series/time_series_applications.htm)
- [Time series patterns](https://otexts.com/fpp2/tspatterns.html)
- [Time series plots](https://towardsdatascience.com/5-types-of-plots-that-will-help-you-with-time-series-analysis-b63747818705)

> NOTE: Ensure you implement the ARIMA and SARIMA models in [Gooogle Colab.](https://research.google.com/colaboratory/)

### How the ARIMA model works
Auto-Regressive Integrated Moving Average(ARIMA) is a time series model that uses the information and attributes in the past metric values to predict the future metric values. 

The information found in the past values indicates the nature of the future values. It assumes that the previous values have unique attributes and properties that can predict future values. For example, an ARIMA model can predict future stock prices based on observing and analyzing previous stock prices.

The model analyzes the single time-dependent (univariate) variable found in the times series dataset. ARIMA will model time series data based on its past metric values.

ARIMA only works when the time series data is stationary. When the dataset is non-stationary, we always have to make it stationary before applying the ARIMA model.

### What is a stationary time series?
A stationary time series is a series whose attributes and properties remain constant over time. The properties and attributes found in a time series are variance, mean, and covariance. 

Stationary time series data does not have trends, repetitive cycles/seasonality. When the time series has trends, repetitive cycles/seasonality, it becomes non-stationary. The trends and seasonality have an impact on the properties and attributes of the time series. They make them change with time.

Most time-series data is non-stationary, especially stock prices and other financial data. This is due to the repetitive cycles and the huge swings available in the financial market. 

For ARIMA to use such time-series data, we have to make the data stationary. Making the data stationary will remove the trends and seasonality. 

It will be easier for ARIMA to make a prediction using stationary data. We change non-stationary time series data to stationary using the differencing technique. 

### Differencing
Differencing is the process of changing a non-stationary time series data to stationary. It is an essential process when preparing times series data for the ARIMA model. 

It transforms the variance, the covariance, and the mean values data, making them constant over time. It also reduces the repetitive cycles in the time series data.

It finds the difference between the current data points and the previous data points in the time series. We may find the difference between the data points once but still not produce a stationary dataset. In this case, we need to find the difference various times until the dataset becomes stationary.

### Components of ARIMA model
ARIMA model is made up of three components: 

1. Auto Regression
2. Integrated 
3. Moving average. 

#### Auto Regression
It uses the changing values in the time series to make future predictions. It applies the dependent relationship between a current observation and other observations. 

 #### Integrated
 This component performs differencing to make the time series stationary. It subtracts a current data point from the previous data point in the time series.

#### Moving Average
It uses errors of past values to make future predictions. It uses the dependency between an actual observation and errors from previous observations.

When creating an ARIMA model, we pass each component as a parameter using the following standard notations: `p` `d` and `q`. These notations represent the parameters that build an ideal ARIMA model. ARIMA models are usually initialized as ARIMA(p,d,q).

The functions of the standard notations are as follows:

- p: It represents the order of the Auto Regression (AR) component. It represents the number of lag (time gap) observations found in the ARIMA model. 

A lag is the time gap between two data points/observations in the time series. We determine the best value of `p` using a [Partial Autocorrelation Function](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64) (PACF) plot.

- d: It is the total differencing steps performed to make the time series stationary. When we have time-series data that is already stationary, there is no need to conduct differencing. Thus, d will be 0 (d=0).

- q: It represents the order of the Moving Average (MA) component. It shows the forecast errors that the final ARIMA Model should have. We determine the best value of `q` using an [AutoCorrelation Function](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64) (ACF) plot.

> NOTE: An order in a time series is the number of previous observations/values that the current values depend on. 

### How to check for stationarity
There are many methods to check whether a time series is stationary such as visualizing the charts and performing statistical tests.

#### visualizing the charts
It entails visualizing the time-series plots (line charts) to check for trends or seasonality. 

#### Performing statistical tests
It entails performing statistical tests on the time series to check for stationarity. We use various statistical tools for this testing. In this tutorial, we will use the Augmented Dickey-Fuller tool.

### Augmented Dickey-Fuller test
We will implement the Augmented Dickey-Fuller (ADF) test to check for stationarity in our dataset. The ADF test uses hypothesis testing to check the dataset stationarity. It has a null hypothesis and an alternative hypothesis.

The null hypothesis of this test states that the times series is non-stationary. The alternative hypothesis states the time series is stationary. When we perform the ADF test and find the time series is non-stationary, we will have to change it to stationary using differencing.

The ADF test has an important parameter known as the `p-value` that determines if the time series is stationary or not. If the `p-value` of the ADF test is < 0.05, then the time series is stationary. So, if the p-value > 0.05, we will have to change the time series to stationary.

### How SARIMA works
Seasonal Autoregressive Integrated Moving Average (Seasonal ARIMA), is a subset of ARIMA models that handle and model time series data that has repeating cycles or seasonality.

SARIMA is also implemented using the ARIMA models parameters (p,d,q). We just have to add a few new parameters to handle the repeating cycles or seasonality in the data.

The newly added parameters are `P`, `Q`, `D`, and `s`.  SARIMA models will be initialized as SARIMA(p,d,q)(P, D, Q, s). 

- `D`: It represents the number of seasonal differences steps to the time series.
- `Q`: It represents the order of the seasonal moving average component.
- `P`: It represents the order of the seasonal autoregressive component.
- `s`: It represents the periods in each seasonality component. The number of periods (months) in a year is 12. So,`s=12`

SARIMA handles seasonality using the `D` parameter. It performs seasonal differencing. Instead of subtracting the data points in the whole times series- this is what happens in ARIMA, seasonal differencing only subtract data points in the seasonality components.

Now that we have discussed these important concepts, let's start building our models.

### Time series dataset
We will prepare the sales dataset. The dataset will build a time series model that predicts monthly champagne sales. You can get the dataset from [here.](https://drive.google.com/file/d/10haWtwrkr15Z-GhHg_t18fVi7V0buSsR/view?usp=sharing)

The dataset shows monthly sales from 1964 to 1972. We will build the model on the train set, predict the sales on the test portion of the data. For prediction using the test portion, we will have the actual sales and the predicted sales. 

#### Using the dataset
We will use Pandas to read the dataset so that we can start using it.

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

![First five](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/first-five.png)

To display the last five data points of the dataset, use this code:

```python
df.tail)
```
Last five data points:

![Last five](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/last-five.png)

From this output, the 105th and the 106th data points/rows have missing values. We will have to drop these data points, but first, let's rename the columns.

#### Renamaing columns
Use this code:

```python
df.columns=["Month","Sales"]
df.head()
```
The output of the renamed columns:

![New column names](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/renamed-columns.png)

#### Drop the data points
To drop the 105th and the 106th data points/rows, use this code:

```python
df.drop(,axis=0,inplace=True)
df.drop(,axis=0,inplace=True)
df.tail()
```
Output:

![Dropping the rows](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/dropping-rows.png)

We have dropped these rows, the new dataset will now have 104 data points/rows.

#### Converting the `month` column
We need to convert the `month` column to a DateTime format. This format will supports time-series analysis. We will use the `pd.to_datetime` function. 

```python
df['Month']=pd.to_datetime(df['Month'])
```
The see the converted `month` column, run this code:

```python
df.head()
```
Output:

![Columns](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/datetime-columns.png)

We also need to set the `month` column as the index column. Use this code:

```python
df.set_index('Month',inplace=True)
```
To view the new changes, run this code:

```python
df.head()
```
Output:

![Index column](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/index-column.png)

### Visualizing the time series data
We will plot time series data and check for trends or seasonality/repeating cycles. As mentioned earlier, this is a simple method to check for stationarity or non-stationarity.

We will use `Matplotlib` for plotting.

```python
import matplotlib.pyplot as plt
```
To plot, run this code:

```python
df.plot()
```
It produces the following line chart:

![Line chart](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/monthly-sales-line-chart.png)

The line chart plots the `sales` against `month`. By observing the line chart, we can see the time series has seasonality or repeating cycles. The spikes and dips keep on repeating during certain months of the year. Using this we can say the dataset is non-stationary since it has seasonality. 

We will still need to perform a statistical test on the time series to prove this non-stationarity. As mentioned earlier, we will use the Augmented Dickey-Fuller test.

### Implementing Augmented Dickey-Fuller test
We import the Augmented Dickey-Fuller tool as follows:

```python
from statsmodels.tsa.stattools import adfuller
```
Let's initialize the `adfuller` function and pass the `sales` column.

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
The ADF test uses hypothesis testing to check the dataset stationarity. The null hypothesis is non-stationary. The alternative hypothesis is stationary.

The `p-value` will determine if the time series is stationary or not. If the `p-value` of the ADF test is < 0.05, then the time series is stationary. 

Let's apply the function to the `Sales` column so that we can know the ADF test results.

#### Applying the function
To apply the function, use this code:

```python
adf_test(df['Sales'])
```
It produces the following results:

![ADF test results](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/adf-test-results.png)

From the output above we have different output values that show the nature of our dataset. We are only interested in the `p-value` result. The `p-value` is 0.363915771660247. This number is > 0.05, therefore the dataset is non-stationary.

We will have to make the time series stationary so that the ARIMA model can use. We use the differencing approach.

### Implementing differencing
It will make the time-series stationery. It will find the differences between the current monthly sales and the previous monthly sales in the time series. We will difference only once, therefore our `d=1`.

```python
df['Differencing']=df['Sales']-df['Sales'].shift(12)
```
This code will difference `sales` values. Let's again perform the Augmented Dickey-Fuller test to check if the dataset has become stationary.

```python
adf_test(df['Differencing'].dropna())
```
The test results.

![ADF test results](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/testing-again.png)

From the test results the `p-value` is 2.519620447387081e-10 (0.0000000002519620447387081). This number is < 0.05, therefore the dataset has become stationary.

We will plot this new dataset to see if the seasonal components have been removed.

### Plotting the new dataset
Run this code:

```python
df['Differencing'].plot()
```
![New dataset plot](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/new-dataset-plot.png)

From this output, we can see the seasonal components have been removed. We can start applying the ARIMA model to the dataset.

### Implementing the ARIMA model
As mentioned earlier, ARIMA models are usually initialized as ARIMA(p,d,q). So we need to get the values of these parameters. We have already discussed the function of each parameter. We already know the `d=1`. It is because we have performed differencing only once. Let's now get the best `p` and `q` values.

#### Getting the best `p` and `q` values
We get the best value of `q` using a [Autocorrelation Function](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64) (ACF) plot. 

We get the best value of`p` using a [Partial Autocorrelation Function](https://mxplus3.medium.com/interpreting-autocorrelation-partial-autocorrelation-plots-for-time-series-analysis-23f87b102c64) (PACF) plot

Lets import `PACF` and `ACF`.

```python
from statsmodels.graphics.tsaplots import plot_acf,plot_pacf
import statsmodels.api as sm
```
Let's first plot the ACF.

#### Plotting ACF
```python
ax1 = fig.add_subplot(211)
fig = sm.graphics.tsa.plot_acf(df['Differencing'].iloc[13:],lags=40,ax=ax1)
```
It produces the following plot:

![ACF plot](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/acf-plot.png)

We will use this plot to get the best value of `q`. From the ACF plot, we can observe that lag no 1 stands out. It is indicated using the red arrow. 

It is slightly above (cuts off) the significance line (the blue line). We will select this lag to be the best value of `q`. Therefore, `q=1`.

To understand how to interpret an ACF plot and get the best value of  `q`, read this [article](https://people.duke.edu/~rnau/411arim3.htm)

#### Plotting PACF
Use this code:

```python
ax2 = fig.add_subplot(212)
fig = sm.graphics.tsa.plot_pacf(df['Differencing'].iloc[13:],lags=40,ax=ax2)
```
It produces the following plot:

![PACF plot](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/pacf-plot.png)

We will use this plot to get the best value of `p`. From the ACF plot, we can observe that lags 1 and 13 stand out. They are indicated using the red arrow. 

They are above (cuts off) the significance line (the blue shaded line). We will select lag no 1 to be the best value of `p`. It is the first lag that is above the significance line. Therefore, `p=1`. 

Our values will be: `p=1`, `d=1` and `q=1`. Let's import the ARIMA model.

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
We have trained the ARIMA model, we can use it to predict the test portion of the data. For prediction using the test portion, we will have the actual monthly sales and the predicted (forecast) monthly sales.

### Testing the ARIMA model using the test portion
We will use the values from the 90th row to the 103rd row as the test portion/set. We will then use `Matplotlib` to show the actual and the predicted (forecast) monthly sales. 

```python
df['forecast']=arima_model.predict(start=90,end=103,dynamic=True)
df[['Sales','forecast']].plot(figsize=(12,8))
```
It produces the following line chart:

![ARIMA line-chart](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/arima-line-chart.png)

From the output above, the blue line is the actual monthly sales and the orange line is the forecast monthly sales. The ARIMA model has not performed well, it has not made correct predictions. The forecast line is far apart from the actual line. We will now build another model using SARIMA.

### Implementing the SARIMA model
SARIMA will handle and model time series data that has repeating cycles or seasonality. From the earlier ADF test, the dataset has seasonality. 

SARIMA models are usually initialized as SARIMA(p,d,q)(P, D, Q, s). We already have the `p`, `d`, and `q` values. We can get the `P`, `D`, `Q` in the same way. Thus, p=P, q=Q, and d=D. `s=12` since there are 12 months in a year.

Let's initialize the SARIMA model:

```python
model=sm.tsa.statespace.SARIMAX(df['Sales'],order=(1, 1, 1),seasonal_order=(1,1,1,12))
```
### Training the SARIMA model
We use `fit` function to train the SARIMA model. The SARIMA model will learn from the time series dataset. 

```python
sarima_model=model.fit()
```
We have trained the SARIMA model, we can use it to predict the test portion of the data. For prediction using the test portion, it will also have the actual and the predicted (forecast) monthly sales.

### Testing the SARIMA model using the test portion
We will also use the values from the 90th row to the 103rd row as the test portion/set. Let's use Matplotlib to show the actual and the predicted (forecast) sales.

```python
df['forecast']=sarima_model.predict(start=90,end=103,dynamic=True)
df[['Sales','forecast']].plot(figsize=(12,8))
```

It produces the following line chart:

![SARIMA line-chart](/engineering-education/univariate-time-series-analysis-and-forecasting-with-arima-and-seasonal-arima-in-python/sarima-line-chart.png)

From the output above, the blue line is the actual monthly sales and the orange line is the forecast monthly sales. It is a good prediction, the two lines are close to each other. The SARIMA model has performed well as compared to the ARIMA model.

### Conclusion
We have learned how to build a univariate time series model with ARIMA and SARIMA in Python. We discussed how both the ARIMA and SARIMA models work. We also talked about time-series stationarity and how to make the series stationary using differencing. We covered how to check for stationarity using the Augmented Dickey-Fuller test.

We explored all the components of the ARIMA model and their specific parameters. We then used the autocorrelation Function (ACF) plot and Partial Autocorrelation Function (PACF) plot to get the best `p` and `q` values

Finally, we implemented both the ARIMA and SARIMA models. The SARIMA model made good predictions, the two lines were close to each other.

You can get the Python code for this article from [here](https://colab.research.google.com/drive/1_cuqDtySmRnvXkzJmLaQ4YzJ63YCwzwR?usp=sharing)

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
