title: Introductions to time series
description: This article will give users an introduction to what time series is in machine learning. It is fast rising deep learning concept with a broad scope of projects, and It will also give a detailed overview and basic implementations.

### INTRODUCTION TO TIME SERIES

![Simple](https://github.com/jamessandy/engineering-education/blob/new-article/articles/introduction-to-time-series/hero.jpg)

In machine learning, time series is a very crucial aspect but is often overlooked. They are useful in forecasting, stock market analysis and even forex but their time component makes it challenging to handle. This article will give a friendly introduction to the time series.

#### Tabel of Content
1. Introductions to time series
2. Real-life applications of the time series
3. Time-series forecasting & time-series analysis
4. Time Series forecasting methods
5. Components of time series
6. Conclusion

Time series can be defined as a sequence or series of data points that are ordered in time. In traditional machine learning,a dataset is a collection of observations. Predictions are made based on unseen data and the future is predicted with all the previous observations taken into considerations. In time series, the dataset is different. Time-series adds a definite order dependence between observations.

Time series are assumed to be generated at a spaced timing. When the data in time series are timed and regular they are called **regular time series** and when they are not at regular or timed, they are called **irregular time series**

#### Real-life applications of time series
1. Can be used in predicting the closing price of the stock at the end of the day
2. Used in predicting the number of product sales
3. Forecasting the birth or death rate at a hospital
4. Forecasting the number of passengers a bus terminal will have 
5. Used to forecast the unemployment rate of a city or state

#### Time-series forecasting
Time series forecasting is fitting a model on a historical dataset which is the training set and then using it to predict a future occurrence which is the test set. The performance of the time series model is rated based on its future prediction. The whole idea is that our model observes all the previous data and understands the foundational process in the series. Secondly it predicts based on its understanding of the foundational process of the historical data.

#### Time-series analysis
Time series analysis can be defined as getting meaningful insight and characteristics to comprehend it better. Time series is beneficial in making predictions. It understands the scope and uses it for future forecasting.

#### Time series forecasting methods 
Now let’s look at 4 time-series forecasting methods. To understand them let's have a brief introduction on Autoregression (AR) and Moving average models. An AR model simply uses a linear combination of the target's past values to make forecasts, while a moving-average model is an approach for modeling univariate time series. The moving-average model specifies that the output variable relies linearly on a stochastic term's current and various past values.

1. Autoregressive Integrated Moving Average (ARIMA): This method combines both the Autoregression and Moving Average model. In ARIMA models the steps are in sequence as a linear function, the difference in observation and residual errors are at previous steps. This method works best for univariate time series with trend and without seasonal components.
2. Seasonal Autoregressive Integrated Moving-Average (SARIMA): In the SARIMA model the next steps are in a linear function style based on the different observations, errors, difference in seasonal observation, and seasonal errors at the previous time steps. The SARIMA is fitted for univariate time series with the trend or seasonal components.
3. Vector Autoregression (VAR): This method models the next step in each of the time series using the AR methods. It uses the generalization of the AR to multiply parallel time series e,g multivariate time series.
4. Simple Exponential smoothing (SES): In this method the model uses the next step as an exponentially weighted linear function of observation at previous time steps. This method works best for univariate time series without trend and seasonal components.

#### Types of Time series
We are going to look at two types of time series:

**Deterministic time series:** A deterministic time series is expressed by an analytic expression. It doesn’t have random or probabilistic aspects. In deterministic time series the past and future are explicitly specified by the derivative values at that time.

**Non-deterministic time series:** This type of time-series means it cannot be described by an analytic expression and has some random aspect making it unable to describe the behavior. There are two reasons that make a time series non-deterministic. First is if the information required to describe it is not available. Secondly, the nature of the process for generation is inherent.

#### Components of time series
Here are some useful time series analysis techniques, and they are divided into four parts.

- Trend: This is the long-term increase or decrease in the data. It can be linear or non-linear.
- Irregular component: This component is uncertain. In every time series there's an unpredictable component that makes it a random variable
- Seasonality: It is the regular pattern of up and down fluctuations in a time series. It may be a short term variation occurring due to seasonal factors.
- Cyclicity: In very simple terms, this is a variation caused by circumstances that repeat in irregular intervals.

![Simple](https://github.com/jamessandy/engineering-education/blob/new-article/articles/introduction-to-time-series/img.jpg)

#### Conclusion
Time series problems are real-life scenarios that provide an unending opportunity for prediction. Most of the traditional statistical methods are founded on the assumptions that time series are approximately stationary. In order to build a good time series model, ensure that you make the data stationary, choose the best model, and crosscheck the accuracy of the model too.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
