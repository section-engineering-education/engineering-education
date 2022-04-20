---
layout: engineering-education
status: publish
published: true
url: /sales-forecasting-with-prophet/
title: Sales Forecasting with Prophet in Python
description: This tutorial will leverage the Prophet library to accurately estimate sales trends.
author: monica-dalmas
date: 2022-02-22T00:00:00-09:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sales-forecasting-with-prophet/hero.png
    alt: Sales Forecasting with Prophet in Python Hero image
---
Prophet is a library developed by Facebook that is ideal for performing time series forecasting. It is used to forecast anything that has a time series trend, such as the weather and sales.
<!--more-->
This tutorial will leverage this library to estimate sales trends accurately. We will use the Python programming language for this build.

### Prerequisite
To follow along, you need to be familiar with:
- [Time series](/engineering-education/introduction-to-time-series/)
- [Time series modeling](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/)
- [Google Colab](https://colab.research.google.com/)

### Outline
- [Installing and importing required dependencies](#installing-and-importing-required-dependencies)
- [Loading data into our notebook](#loading-data-into-our-notebook)
- [Data preprocessing](#data-preprocessing)
- [Training the time series model](#training-the-time-series-model)
- [Making predictions and evaluating performance](#making-predictions-and-evaluating-performance)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Installing and importing required dependencies
Let's begin by installing the model.

```bash
!pip install prophet
```
After installing it, we need to import it into our notebook.

```python
import pandas as pd
from prophet import Prophet
```
- `pandas` allows us to bring in tabular data.
- `prophet` allows us to import the Prophet library into our Google Colab.

Let's bring our data into the notebook. We will use store sales [transaction data](https://www.kaggle.com/c/store-sales-time-series-forecasting/data?select=transactions.csv) from Kaggle.

The dataset includes dates, store and product information, and sales numbers. It contains four years' worth of sales data sold at Favorita stores located in Ecuador. You'll need to download the data and upload it into your Colab.

### Loading data into our notebook
We will use the `pandas` library to read in our `csv` file.

```python
dataframe = pd.read_csv('transactions.csv')
```
We load in our data and save it inside a variable called `dataframe`. We can check the first five rows of data using the pandas `head()` method.

You can use the `tail()` method to check the last five rows.

```python
dataframe.head()
```
Output:

```bash
 	date 	 store_nbr 	transactions
0 	2013-01-01 	25 	770
1 	2013-01-02 	1 	2111
2 	2013-01-02 	2 	2358
3 	2013-01-02 	3 	3487
4 	2013-01-02 	4 	1922
```
Let's take a look at the data types for these columns.

```python
dataframe.dtypes
```
Output:

```bash
date            object
store_nbr        int64
transactions     int64
```
From these results, we can see that the date column is a string. The model cannot accept it as it is. It needs to be converted into a date-time format for it to work with the model.

Let's perform some preprocessing.

> It's important whenever you're working with time-series data that you have a date or timestamp column. It is a requirement by the Prophet model to forecast trends.

### Data preprocessing
Using the Pandas `to_datetime()` function, we will convert the date column from a string to a date-time format.

```python
dataframe ['date'] = pd.to_datetime(dataframe ['date'])
dataframe.dtypes
```
Output:
```bash
date            datetime64[ns]
store_nbr                int64
transactions             int64
```
We have converted our date column into a date-time format.

We need to drop the `store_nbr` column. Besides, for this data to work with the Prophet model, we only need two columns, i.e,  a `ds` and `y` column. We need to rename our date column to `ds` and the transactions column to `y`.

```python
dataframe.drop('store_nbr', axis=1, inplace=True)
```
We are dropping only the `store_nbr` column. The `axis=1` argument tells Pandas library to drop the columns and not the rows.

Output:
```bash
 	date 	transactions
0 	2013-01-01 	770
1 	2013-01-02 	2111
2 	2013-01-02 	2358
3 	2013-01-02 	3487
4 	2013-01-02 	1922
```
We now have only two columns. As mentioned above, we need to rename the data column to `ds` and transactions columns to `y`.

```python
dataframe.columns = ['ds', 'y']
dataframe.head()
```

Output:
```bash
        ds  	y
0 	2013-01-01 	770
1 	2013-01-02 	2111
2 	2013-01-02 	2358
3 	2013-01-02 	3487
4 	2013-01-02 	1922
```
Using the command above, we have successfully renamed our columns. That's the last of the preprocessing step. We can now go ahead and create the time series model.

### Training the time series model
We begin by creating an instance `p` of the Prophet class.

```python
p = Prophet(interval_width=0.92, daily_seasonality=True)
```
We use the `interval_width` argument to estimate the uncertainty interval from the number of samples used. We've set ours to `0.92`.

The argument `daily_seasonality=True` will fit daily seasonality for a sub-daily time series. It will default to weekly and yearly seasonalities if you don't set this parameter.

You can play around with these values to check how it affects the results obtained after training.

We can now train our model.

```python
model = p.fit(dataframe)
```
After running the command above, the model will be trained on the data.

### Making predictions and evaluating performance
Let's go ahead and make predictions.

```python
future = p.make_future_dataframe(periods=200, freq='D')
future.tail()
```
Output:
```bash
 	ds
1877 	2018-02-27
1878 	2018-02-28
1879 	2018-03-01
1880 	2018-03-02
1881 	2018-03-03
```
From the results, we can see that the model has made future predictions, `200` days away from the last data value using a daily frequency. If you want to train for longer periods, you can change the value in the `periods=200` argument.

To predict, we use the `predict()` method and pass in the future dataframe as shown:

```python
forecast_prediction = p.predict(future)
forecast_prediction.tail()
```
From the results generated, the model has generated a lot of sales information in addition to the predicted `ds` and `yhat` column. The most important column is the `yhat` column, as it is what represents your sales forecast.

We can visualize these predictions.

```python
plot1 = p.plot(forecast_prediction)
```
![Forecast](/engineering-education/sales-forecasting-with-prophet/forecast.png)

If you take a keen look at the plot, you'll notice that the predicted sales trend mimics the actual data's trend. We could take this plotting even a step further and plot the individual components that make up the above plot.

```python
plot2 = p.plot_components(forecast_prediction)
```
![Plot components](/engineering-education/sales-forecasting-with-prophet/plot-components.png)

This plot could give you a lot more information about the sales data. For instance, more sales are made between Friday and Monday. Also, they seem to make a lot of sales between November and February. During the rest of the year, sales are average.

You can find the complete code for this tutorial [here](https://colab.research.google.com/drive/1kmb4zguNvYZ4LqGQZAUhYgS_ZZNz-sMg?usp=sharing).

### Wrapping up
That's sales forecasting using the Prophet model in a nutshell.

This tutorial introduces you to time series forecasting using Prophet. It should only introduce you to how to use the model in a project, and is in no way to be used for production purposes.

To use the model for production, you'll need to do more research on it. You can also read about the [Neural Prophet](https://neuralprophet.com/html/index.html) library. It is an extension of Prophet that adds neural networks to the mix.

### Further reading
- [Prophet](https://research.facebook.com/blog/2017/02/prophet-forecasting-at-scale/)
- [Forecasting at scale](https://facebook.github.io/prophet/)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
