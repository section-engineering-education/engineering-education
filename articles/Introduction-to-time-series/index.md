---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-time-series/
title: Introduction to Time Series
description: This article will give users an introduction to what time series is in machine learning. It is a deep learning concept; time series can be defined as a sequence or series of data points ordered in time.
author: james-sandy
date: 2020-12-22T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-time-series/hero.jpg
    alt: time series example image
---
In machine learning, time series is a very crucial aspect but is often overlooked. A time series is useful in forecasting, stock market analysis, and even forex, but their time component makes it a challenging concept to handle. This article will give a friendly introduction to the time series.
<!--more-->
### Introduction to Time Series

#### Table of Contents
- Introductions to time series
- Real-life examples of the time series
- Time-series forecasting & time-series analysis
- Time Series forecasting methods
- Components of time series
- Conclusion

Time series can be defined as a sequence or series of data points that are ordered in time. In traditional machine learning, a dataset is a collection of observations. 

Predictions are made based on unseen data, and the future is predicted with all the previous observations taken into consideration. In a time series, the dataset is different. A time-series adds a definite order of dependence between observations.

In time series any variable that changes as time goes on is acceptable, It is normal to use a time series to track progress over a period of time. This can be tracked over a short term or long term.

Time series are assumed to be generated at a spaced timing. When the data in time series are timed and regular, they are called **regular time series**, and when they are not regular or timed, they are called **irregular time series**.

### Real-life applications of time series
- A time series model can be used in predicting the closing price of the stock at the end of the day.
- It can be used in predicting the number of product sales.
- Time series models can forecast the birth or death rate at a hospital.
- It can be used to forecast the number of passengers a bus terminal will have.
- Used to forecast the unemployment rate of a city or state.

### Time series forecasting
Time series forecasting fits a model on a historical dataset, that is, the training set, and then using it to predict a future occurrence, which is the test set. The performance of the time series model is rated based on its future prediction. The whole idea is that our model observes all the previous data and understands the foundational process in the series. Secondly, it predicts based on its understanding of the foundational process of the historical data. time series forecasting deals with trend analysis, cyclical fluctuation analysis, and issues of seasonality like every forecasting method which is based on probability too.

### Time series analysis
Time series analysis can be defined as getting meaningful insight and characteristics to comprehend it better. Time series is beneficial in making predictions. It understands the scope and uses it for future forecasting.time series analysis is also used to understand the changes between the chosen data point compared to changes in other variables over the same time period.

### Time series forecasting methods 
Now let’s look at four time-series forecasting methods. Let's go over a brief introduction on Autoregression (AR) and Moving average models to understand them. 

An AR model uses a linear combination of the target's past values to make forecasts, while a moving-average model is an approach for modeling univariate time series. The moving-average model specifies that the output variable relies linearly on a stochastic term's current and various past values.

1. Autoregressive Integrated Moving Average (ARIMA): This method combines both the Autoregression and Moving Average model. In ARIMA models, the steps are in sequence as a linear function. The difference in observation and residual errors are at previous steps. This method works best for univariate time series with trends and without seasonal components.
2. Seasonal Autoregressive Integrated Moving-Average (SARIMA): In the SARIMA model, the next steps are in a linear function style based on the different observations, errors, difference in seasonal observation, and seasonal errors at the previous time steps. The SARIMA is fitted for a univariate time series with the trend or seasonal components.
3. Vector Autoregression (VAR): This method models the next step in each of the time series using the AR methods. It uses the generalization of the AR to multiply parallel time series, such as multivariate time series.
4. Simple Exponential Smoothing (SES): In this method, the model uses the next step as an exponentially weighted linear function of observation at previous time steps. This method works best for a univariate time series without trends and seasonal components.

### Types of time series
We are going to look at two types of time series:

#### 1) Deterministic time series
An analytic expression expresses a deterministic time series. It doesn’t have random or probabilistic aspects. In deterministic time series, the past and future are explicitly specified by the derivative values at that time.

#### 2) Non-deterministic time series
This type of time-series means an analytic expression can not describe it and has some random aspect, making it unable to describe the behavior. Given data, it can be classified as non-deterministic given it satisfies either of the two conditions. They are if the function generating the data is random or there exist missing pieces in the dataset.   

### Components of time series
Here are four useful time series analysis techniques:

1. **Trend**: This is the long-term increase or decrease in the data. The trend can be increasing or decreasing as well as linear or nonlinear.
2. **Irregular** This component is uncertain. In every time series, there's an unpredictable component that makes it a random variable which is as a results of a short-term fluctuations in a series which are not systematic and in some instances not predictable.
3. **Seasonality**: It is the regular pattern of up and down fluctuations in a time series. It may be a short term variation occurring due to seasonal factors, in seasonality there's a situation in which the data experiences regular and predictable changes
4. **Cyclicity**: In straightforward terms, this variation is caused by circumstances that repeat at irregular intervals. the length of the cycle is described as the period 

![Simple](/engineering-education/introduction-to-time-series/img.jpg)

### Conclusion
This article has gone through time-series forecasting methods, time-series forecasting & time-series analysis, time series components, etc. Hopefully, this article has given you a gentle introduction to the concept of time series. Happy learning. 

#### sources
1. [Time series-Introduction](https://towardsdatascience.com/time-series-introduction-7484bc25739a)
2. [What Is Time Series Forecasting?](https://machinelearningmastery.com/time-series-forecasting/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
