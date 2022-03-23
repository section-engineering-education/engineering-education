### Predicting Future Stock Prices Using ARIMA Model in R

### Introduction
With the increase in the number of investors in the stock market and the increase in popularity of various cryptocurrencies whose rates in the stock market changes constantly, it is useful to create a program that can predict future prices in the stock market to help investors make a better decision on the right time to invest so that they can maximize their profits.

ARIMA model is one of the most useful models in predicting future trends and in this case, future prices using R language or Python. in this article, I am going to show you how exactly you can go about it step by step.

### Table of Contents
-[Importing yahoo finance data in R](#importing-yahoo-data-in-r)

-[Stock charting](#stock-charting)

-[Analyze the correlation of data](#analyze-the-correlation-of-data)

-[Differencing data to be stationary](#differencing-data-to-be-stationary)

-[Do stationary testing using unit root testing](#do-stationary-testing-using-unit-root-testing)

-[Building ARIMA model](#building-arima-model)

-[Fitting ARIMA model and forecasting](#fitting-arima-model-and-forecasting)

### Importing yahoo finance data in R

In this tutorial, we are going to demonstrate stock price forecasting using Amazon stock, and the data that we will be using are AMZN which we will import in yahoo finance using the quantmod package in R . the data will consist of OHLC (open, high, low and closed) but for simplicity, we will use the close price to make our model univariate time series. 

First, we will install quantmond packages by using;

`install.packages("quantmod")`

 as follows; 

![installing quantmod](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/psp.jpg)

After installing quantmod package, open the library to activate using this code 
`library(quantmod)`

![activating quantmod](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/arima.jpg)

>Then to import Amazon data, use `getSymbols()`  function

![importing amazon data](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/amazon.jpg)

### Stock charting
To start analyzing the stock, we need to add technical indicators such as moving average, Bollinger bands(20, sd=1), relative strength index of 14 days, and Moving Average Convergence Divergence (12, 25) as the technical analysis before forecasting.

![stock charting](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/stock.jpg)

![graph](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/graph.jpg)

To make the analysis easier, we will do a log transformation of the data to depict the growth rate of the stock and scale the unit value as shown below.

>Plotting the log transformation of the data ;

![log](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/log.jpg) 

![log transformation](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/trans.jpg)

The stock mainly shows an upward trend but there is also a slight downward trend showing that there is volatility showing that the data is non-stationary like most financial data, therefore, we can assume that it's a random walk meaning that the current price is equal to the price at the time (t-1) plus white noise therefore in order to fit the data in ARIMA model, we should differentiate the data in a particular lag.

![differencing log data](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/difference.jpg)

### Analyze the correlation of data
To AutoCorrelation function(ACF) and partial AutoCorrelation to analyze if there is any correlation between today's prices and yesterday's, we use ACF function. 

### Differencing data to be stationary
Now that we know that our data is not stationary, we need to make it stationary by differentiating it at a certain lag for it to fit our ARIMA model. Making the data stationary is important in that it helps us predict that the past statistical properties of our data will remain the same in the future. Here, the log-transformed data will be differenced by 1 lag to make it stationary. First, we'll have to, make sure that we fill in missing values with values from observation after the missing value.

![differencing data to be stationary](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/amazon_diff.jpg) 
### Do stationary testing using unit root testing
After differentiating the data at lag 1 and making our data stationary, we'll test if the data are stationary using Unit Root Testing . We'll test using the Augmented Dickey Fuller test which tests the hypothesis of stationarity of the data and if the resulting p-value will be below 0,05, we will reject the null hypothesis and conclude that the data is stationary. We are going to test our differenced data. 
We will first activate tseries package using library(tseries) then we perform adf test using;
`
adf<-adf.test(AMAZON_diff, alternative=c(“stationary”,”explosive”), k=0)`

`adf`

![doing stationary test](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/stationary.jpg) 

The p-value is o.01 meaning that our data is now stationary with no unit root making it appropriate for our ARIMA model. 
To check if our data can fit the AutoRegressive model and MA process, we will generate ACF and pacf correlogram using acf and pacf functions as follows. 
We need to split the data into training by subsetting the data from the first period to the 3355th period which is from 3rd January 2013 to 12th March 2022 to train the model. 
We need to install caTools library using; 

`install.packages(“caTools”)` 

Activate the library caTools by:

`library(caTools)` 

To select our train data, we use;

`train_data<-AMAZON_diff[1:3355]`

![differencing log data](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/difference.jpg)

### Building ARIMA model 
ARIMA model in R is found in the package ‘forecast’ which we will first install and then activate as follows;

`install.packages(“forecast”)`

`library(forecast)`

Auto.arima is used to generate the ARIMA model

![generating ARIMA model](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/auto.jpg)

To check the summary for chosen best fit ARIMA model, we use;

`summary(arima_mode)`

![summary for our model](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/fit.jpg)

We then check for any residual in our ARIMA model. and judging by the Ljung-Box test, we conclude that the p-value > 0.05 (insignificant) means that the model’s residuals are independent and not autocorrelated which means we don't have to do volatility modeling using models like Garch, commonly used on financial data with heteroscedasticity problem.
![checking for residuals](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/hetero.jpg)

Suggesting that ARIMA(0,0,2) is our model.

The plot of our Residuals from our ARIMA model shows that our forecast for 100 days ahead shows a straight line indicating that our ARIMA model fits well as it is supposed to follow a normal distribution and should be stationary.  
![residuals fom ARIMA](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/from.jpg)

### Fitting ARIMA model and forecasting

Now, to fit the model into the training data set, we use;

`arima<-arima(train_data, order=c(0, 0, 2)`

`summary(arima)`

![fitting our model](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/model.jpg)

Now, we can make our forecast of the next 100 days using `forecast` package with h=100

And we can plot our forecast using 
`plot(forecast)`

![plotting our forecast](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/plotting.jpg)

And then check residuals in our model using
 `checkresiduals(arima)` 

![checking residual](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/residual.jpg)

![our arima](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/fore.jpg)

Our forecast will be;

![our forecast](/engineering-education/predicting-future-stock-prices-using-arima-model-in-r/forecast.jpg)

This shows that in the next 100 days, there will be a rise in AMAZON’s stock prices with a slight downward movement in the next few days and then an almost steady rise.

### Conclusion 

With proper data, forecasting in R is so simple as there are very many automated functions to fit in various powerful models which are used in forecasting that give accurate results when fed with enough data. You can use this method in fitting various models used in forecasting such as decomposition models, exponential smoothing models, etc. provided you have installed the required packages. In cases where the data has a heteroskedasticity problem, you can use Garch or Arch models to resolve volatility issues in order to use the ARMA model. 




















