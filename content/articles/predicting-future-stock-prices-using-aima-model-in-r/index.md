---
layout: engineering-education
status: publish
published: true
url: /predicting-future-stock-prices-using-aima-model-in-r/
title: Predicting Stock Prices using ARIMA Model in R
description: This tutorial will walk the reader through how to predicting stock prices using ARIMA Model in R.
author: hosea-kipngetich
date: 2022-05-10T00:00:00-12:19
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/predicting-future-stock-prices-using-aima-model-in-r/hero.jpg
    alt: Predicting Stock Prices Using ARIMA Model in R Hero Image
---
With the rise of so many investors in the stock and cryptocurrencies market space. It would be great to create a program that can predict the market prices to help investors.
<!--more-->
Help them make the best decision on whether or not it's the right time to invest, so that they can make more profits or money.

### Introduction
ARIMA model is one of the most useful and accurate time series models in making predictions about future trends. In our case we will predict stock market prices using R programming language. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Importing Yahoo Finance data in R](#importing-yahoo-finance-data-in-r)
- [Stock charting](#stock-charting)
- [Analyze the correlation of data](#analyze-the-correlation-of-data)
- [Differencing data to be stationary](#differencing-data-to-be-stationary)
- [Do stationary testing using unit root testing](#do-stationary-testing-using-unit-root-testing)
- [Building ARIMA model](#building-arima-model)
- [Fitting the ARIMA model and forecasting](#fitting-the-arima-model-and-forecasting)

### Prerequisites
To follow along with this tutorial, the reader will need the following:
- A basic knowledge of time series and how various time series models work.
- Have R studio installed on your PC.
- A basic knowledge on how to analyze and interpret charts.

### Importing Yahoo Finance data in R
In this tutorial, we are going to demonstrate stock price forecasting using the Amazon stock price, we will be using the `NASDAQ` symbol: AMZN which will be imported into Yahoo Finance using the quantmod package in R.  

The data will consist of OHLC (Open, High, Low, and Closed) type, but for simplicity sake we will use the close price to make our model a univariate time series.

We need to install the quantmond packages using;

```bash
install.packages("quantmod")
```

![installing quantmod](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/psp.jpg)

After installing the quantmod package, open the library to activate it using this code `library(quantmod)`.

![activating quantmod](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/arima.jpg)

Then to import Amazon data, use `getSymbols()` function.

![importing amazon data](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/amazon.jpg)

### Stock charting
To start analyzing the stock, we need to add technical indicators such as moving average, Bollinger bands (20, sd=1), relative strength index of 14 days, and Moving Average Convergence Divergence (12, 25) as the technical tools of analysis before forecasting.

![stock charting](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/stock.jpg)

![graph](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/graph.jpg)

To make our analysis easier, we will do a log transformation of the data to depict the growth rate of the stock and scale the unit value as shown below.

Plotting the log transformation of the data:

![log](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/log.jpg)

![log transformation](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/trans.jpg)

The stock shows an upward trend, but there is also a slight downward trend showing that there is a high volatility which means that the data is non-stationary like most financial data. 

Therefore, we can assume that it's a random walk; meaning that the current price is equal to the price at the time (t-1) plus white noise therefore in order to fit the data in ARIMA model, we should differentiate the data in a particular lag.

![differencing log data](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/difference.jpg)

### Analyze the correlation of data
We analyze the AutoCorrelation function (ACF) and partial AutoCorrelation perform analysis to see if there is any correlation between today's and yesterday's price.

### Differencing data to be stationary
Now that we know that our data is not stationary, we need to make it stationary by differentiating it at a certain lag for it to fit our ARIMA model. 

Making the data stationary is important in that it helps us predict that the past statistical properties of our data will remain the same in the future. Here, the log-transformed data will be differenced by 1 lag to make it stationary. 

We'll have to make sure that we fill in missing values with values from the observations after the missing value.

![differencing data to be stationary](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/amazondiff.jpg)

### Do stationary testing using unit root testing
After differentiating the data at lag 1 and making our data stationary, we'll test if the data is stationary using Unit Root Testing. 

We'll test this using the Augmented Dickey Fuller test. This tests the hypothesis of the stationary data. 

If the resulting p-value is below 0.05, we will reject the null hypothesis and conclude that the data is stationary. We are going to test our differenced data.

To do this, activate the `tseries` package using library (tseries) then we perform `adf` test using:

```R
adf<-adf.test(AMAZON_diff, alternative=c(“stationary”,”explosive”), k=0)

adf
```

![doing stationary test](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/stationary.jpg)

The p-value is 0.01 meaning that our data is now stationary with no unit root making it appropriate for our ARIMA model.

To check if our data can fit into the AutoRegressive model and MA process, we will generate ACF and PACF correlogram using `acf` and `pacf` functions as follows.

We need to split our training data into sub sets starting from the first period to the 3355th period, which is from 3rd January 2013 to 12th March 2022 to train our model.

Next, install the **caTools** library using;

```bash
install.packages(“caTools”)
```

Activate the library **caTools**:

`library(caTools)`

To select our train data, we will use;

`train_data<-AMAZON_diff[1:3355]`

![differencing log data](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/difference.jpg)

### Building ARIMA model
The ARIMA model in R is found in the package ‘forecast’ which we will first install and then activate as follows:

```bash
install.packages(“forecast”)
```

`library(forecast)`

`Auto.arima` is used to generate the ARIMA model.

![generating ARIMA model](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/auto.jpg)

To check the summary of our best fit ARIMA model, we use;

`summary(arima_mode)`

![summary for our model](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/fit.jpg)

We then check for any residual in our ARIMA model, and judging by the Ljung-Box test, we conclude that the p-value > 0.05 (insignificant). This means that the model’s residuals are independent and not auto correlated. Which means we don't have to do volatility modeling using models like Garch, commonly used on financial data with heteroscedasticity problem.

![checking for residuals](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/hetero.jpg)

Assuming that ARIMA (0,0,2) is our model, days ahead shows a straight line indicating that our ARIMA model fits well as it is supposed to follow a normal distribution and should be stationary. 
 
The plot of our Residuals from our ARIMA model shows our forecast for 100.

![residuals form ARIMA](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/from.jpg)

### Fitting the ARIMA model and forecasting
Now, to fit the model into the training data set, we use;

`arima<-arima(train_data, order=c(0, 0, 2)`

`summary(arima)`

![fitting our model](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/model.jpg)

Now, we can make our forecast for the next 100 days using the `forecast` package with h=100.

And we can plot our forecast using `plot(forecast)`.

![plotting our forecast](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/plotting.jpg)

And then check residuals in our model using `checkresiduals(arima)`.

![checking residual](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/residual.jpg)

![our arima](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/fore.jpg)

Our forecast will be:

![our forecast](/engineering-education/predicting-future-stock-prices-using-aima-model-in-r/forecast.jpg)

This shows that in the next 100 days, there will be a rise in AMAZON’s stock prices with a slight downward movement in the next few days and then an almost steady rise. 

Now that the investor knows the expected trends for the next 100 days in Amazon stock, he/she can make the right decision in buying and selling to maximize profits and avoid losses. You can make a prediction of your desired period of time by using `h="time"`.

### Conclusion
We learned how to predict Amazon stock prices using R programming language, perform financial modeling, and then use time series models in forecasting. There are various automated functions that can fit into models, which will give accurate results when fed with enough data. 

You can go ahead and learn more about how to perform forecasting in R and Python using the resources below.

Happy coding!

### Further reading  
- [Time series forecasting in R](https://www.simplilearn.com/tutorials/data-science-tutorial/time-series-forecasting-in-r)
- [Pluralsight time series forecasting in R](https://www.pluralsight.com/guides/time-series-forecasting-using-r)
- [A guide to forecasting in R](https://towardsdatascience.com/a-guide-to-forecasting-in-r-6b0c9638c261)
- [Forecasting](https://cran.r-project.org/web/packages/forecast/forecast.pdf)

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
