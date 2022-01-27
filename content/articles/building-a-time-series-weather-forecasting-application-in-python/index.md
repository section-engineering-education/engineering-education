---
layout: engineering-education
status: publish
published: true
url: /building-a-time-series-weather-forecasting-application-in-python/
title: Building a Time Series Weather Forecasting Application in Python
description: In this tutorial, we'll discuss how to build a weather forecast application using a time series package known as Neural Prophet.
author: monica-dalmas
date: 2022-01-14T00:00:00-10:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-time-series-weather-forecasting-application-in-python/hero.png
    alt: Time Series Weather Forecasting Application Hero image
---
This tutorial will look at how we can forecast the weather using a time series package known as Neural Prophet. 
<!--more-->
In this tutorial, we will be going through a couple of key things:
- We'll start by preprocessing our data fetched from Kaggle using the Pandas library.
- We'll train a time series forecasting model to predict temperature using the model.
- We'll learn how to forecast the temperature into the future.

### Prerequisites
To follow along with this tutorial, you need to:
- Be familiar with Machine Learning modeling. 
- Use either Google Colab or Jupyter Notebook.

### Table of contents
- [About Neural Prophet](#about-neural-prophet)
- [Installing and importing the required dependencies](#installing-and-importing-the-required-dependencies)
- [Loading the dataset](#loading-the-dataset)
- [Preprocessing the data ](#preprocessing-the-data )
- [Training the forecasting model]((#training-the-forecasting-model))
- [Forecasting the temperature into the future](#forecasting-the-temperature-into-the-future)
- [Wrapping up](#wrapping-up)

### About Neural Prophet
It is a time-series model built on top of [AR-Net](https://ai.facebook.com/blog/ar-net-a-simple-autoregressive-neural-network-for-time-series/) and [Facebook Prophet](https://github.com/facebook/prophet). It is an upgraded version of Facebook Prophet. It uses the PyTorch framework as a backend. It is beginner-friendly, and one can get started using a quick `pip` install.

It incorporates traditional statistical and neural network models for time series modeling, used in forecasting and anomaly detection. The model generates high-quality forecasts for time series data that have multiple seasonality with linear or non-linear growth.

We will use the model to forecast the future temperature of Austin, Texas, given past temperature data of the same location.

### Installing and importing the required dependencies
The main package that we will install is the Neural prophet package. 

```bash
!pip install neuralprophet
```
We need to import the necessary dependencies into our notebook. We will import `Pandas`, `Neural Prophet`, `Matplotlib`, and `Pickle`. 

```python
import pandas as pd
from neuralprophet import NeuralProphet
from matplotlib import pyplot as plt
```
- `Pandas` will help us read our data into our notebook.
- `NeuralProphet` is the class we will use to predict the future temperature.
- `Matplotlib` will be used in plotting.

The next step involves us importing our data.

### Loading the dataset 
We will use the [Austin Weather](https://www.kaggle.com/grubenm/austin-weather) dataset from Kaggle. Although it is a dataset contains the historical temperature, precipitation, humidity, and windspeed for Austin, Texas, we will only predict the temperature. That means we will only work with the temperature data from the dataset. You need to download it and upload the `austin_weather.csv` file into your notebook.

```python
df = pd.read_csv('austin_weather.csv')
df.tail()
```
We have used Pandas `read_csv()` method to load our dataset. In addition, we've used the `tail()` method to view the last five rows in our dataset.

Let us do a bit of exploratory data analysis on the data.

```python
df.Date.unique()
```
When you run the code above, you'll see that the dates in our dataset that'll be used for training range between `2013-12-21` and `2017-07-31`. That's about four years worth of data. 

Output:

```bash
array(['2013-12-21', '2013-12-22', '2013-12-23', ..., '2017-07-29',
       '2017-07-30', '2017-07-31'], dtype=object)
```

Let's take a look at all the columns available in our dataset.

```python
df.columns
```
Output:

```bash
Index(['Date', 'TempHighF', 'TempAvgF', 'TempLowF', 'DewPointHighF',
       'DewPointAvgF', 'DewPointLowF', 'HumidityHighPercent',
       'HumidityAvgPercent', 'HumidityLowPercent',
       'SeaLevelPressureHighInches', 'SeaLevelPressureAvgInches',
       'SeaLevelPressureLowInches', 'VisibilityHighMiles',
       'VisibilityAvgMiles', 'VisibilityLowMiles', 'WindHighMPH', 'WindAvgMPH',
       'WindGustMPH', 'PrecipitationSumInches', 'Events'],
      dtype='object')
```

As we advance, we will only be focusing on the `TempAvgF` column.

Let's now do a bit of preprocessing.

### Preprocessing the data 
We begin by checking the data types of the columns.

```python
df.dtypes
```
Output:

```bash
Date                          object
TempHighF                      int64
TempAvgF                       int64
TempLowF                       int64
DewPointHighF                 object
DewPointAvgF                  object
DewPointLowF                  object
HumidityHighPercent           object
HumidityAvgPercent            object
HumidityLowPercent            object
SeaLevelPressureHighInches    object
SeaLevelPressureAvgInches     object
SeaLevelPressureLowInches     object
VisibilityHighMiles           object
VisibilityAvgMiles            object
VisibilityLowMiles            object
WindHighMPH                   object
WindAvgMPH                    object
WindGustMPH                   object
PrecipitationSumInches        object
Events                        object
dtype: object
```

We will need to change the `Date` format from an `object` to a `datetime` format. The model only accepts the `datetime` format for the date column.

```python
df ['Date'] = pd.to_datetime(df ['Date'])
df.tail()
```
We've converted our date column from an object to a date-time type. If you type in `df.dtypes`, you will see that the formatting has changed.

Results:

```bash
Date                          datetime64[ns]
TempHighF                              int64
TempAvgF                               int64
dtype: object
```
This is a requirement whenever you're working with Neural Prophet. 

Neural prophet requires you to give it two columns only. The `ds` column is a timestamp, and a `y` column is the numeric one we want to predict. In this case, our `ds` will be `Date` while our `y` will be `TempAvgF`.

Let's use `matplotlib` to plot our temperature over time.

```python
plt.plot(df ['Date'], df ['TempAvgF'])
plt.show()
```

Result:

![Plot](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/plot.png)

To plot the graph above, we've used `plt.plot()` method from Matplotlib. We've passed `df['Date']` as the x variable and `df ['TempAvgF']` as the y variable. 
> Always check whether your data has missing values as you would not want to pass data with missing values to Neural Prophet. For our case, the data looks good.

Next, we will filter out a couple of our columns. As mentioned earlier, Neural Prophet only expects two columns. 

```python
new_column = df[['Date', 'TempAvgF']] 
new_column.dropna(inplace=True)
new_column.columns = ['ds', 'y'] 
new_column.tail()
```

When you run the code above, you'll notice that our dataset has been filtered to only two columns, `ds` and `y`. With our `Date` now being `ds` and the `TempAvgF` being `y`.
> If you want to forecast something else such as `HumidityAvgPercent` or `DewPointAvgF`, you only need to change the second variable in `df[['Date', 'TempAvgF']]` to your desired target. For example, `df[['Date', 'HumidityAvgPercent']]`.

We can now go ahead and train our model.

### Training the forecasting model
We need first to create a new instance of Neural Prophet using the `NeuralProphet()` class we imported earlier. We store this instance inside a variable `n`. Secondly, we'll use the `fit()` method to go ahead and train.

```python
n = NeuralProphet()
model = n.fit(new_column, freq='D', epochs=5000)
```
We will be training our model for `5000` epochs. You can choose to train yours for shorter or longer epochs depending on the accuracy you get. It uses AR-Net in the background to train. The `freq='D'` denotes that we're using a daily frequency. 

After training for 5000 epochs, we get a Mean Absolute Error of `1.74`.

Up until now, we've been doing preprocessing and training. Let's go ahead and perform some forecasting.

### Forecasting the temperature into the future

```python
future = n.make_future_dataframe(new_column, periods=1500)
forecast = n.predict(future)
forecast.tail()
```
We are forecasting for 1500 periods (1500 days into the future). We've also used the `n.predict()` method to go ahead and predict our future values. Finally, we use the `tail()` method to list our five last rows. You'll notice that the last row is our 1500th prediction. That is, `2021-09-08`. Remember, our dataset only has values up to the date `2017-07-31`.

Let's visualize these predictions.

```python
plot = n.plot(forecast)
```
Result:

![Visualizing our prediction](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/visual.png)

From these results, we can deduce that we expect the temperature to be very high in the middle of the year between June and August. In addition, between November and February, we expect a lot of colder temperatures. This result mimics the one that we had earlier with hotter temperatures between June - August and colder temperatures between November and February. 

You can find the complete code for this tutorial [here](https://colab.research.google.com/drive/1-jV0KIAxJEuozwS6quVGVf4tpRlfEZTE?usp=sharing).

### Wrapping up
That wraps up how to generate weather forecasts into the future. We performed some exploratory data analysis on our data, trained our model, and finally made the predictions with only a few lines of code. Feel free to try it out yourself.

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
