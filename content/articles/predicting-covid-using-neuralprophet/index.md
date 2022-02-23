---
layout: engineering-education
status: publish
published: true
url: /predicting-covid-using-neuralprophet/
title: Predicting Covid-19 Cases Using NeuralProphet
description: In this tutorial the reader will learn how to predict Covid-19 cases using the Neural Prophet library.
author: ian-njari
date: 2022-02-23T00:00:00-13:40
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/predicting-covid-using-neuralprophet/hero.png
    alt: Predicting Covid-19 Cases using NeuralProphet Example Image
---
Performing predictions on datasets where a time series is an independent variable can prove challenging using traditional machine learning methods. In 2017, Facebook (now Meta) came up with a library that extracts non-linear patterns which may have daily, weekly, or other seasonality.
<!--more-->
This library is called Prophet (previously known as FbProphet). One limitation of the library is that it does not generalize complex trends well, so it tends to under-fit. The Data Science Core Team at the company thus came up with NeuralProphet, a library based on AR-Net (a simple auto-regressive neural network for time-series) and Pytorch.

We will use the global cases dataset from the [Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE) Global Covid-19 Data Repository](https://github.com/CSSEGISandData/COVID-19) to perform forecasting. This is a very useful dataset as it has a lot of seasonality and complex time series patterns.

### Table of contents
- [About Time-Series Forecasting](#about-time-series-forecasting)
- [Preparing the environment](#setting-up-environments)
- [Importing, understanding and preparing the data](#importing-and-preparing-the-data)
- [The COVID-19 Dataset](#the-covid-19-dataset)
- [Importing and preparing the data](#importing-and-preparing-the-data)
- [Training a NeuralProphet Forecaster](#training-the-model)
- [Monitoring the training process and evaluating the model](#monitoring-the-training-process-and-evaluating-the-model)
- [Forecasting using the trained model](#forecasting)
- [Conclusion](#conclusion)

### Prerequisites
- Basic knowledge of Python.
- Machine learning basics.
- Basic data manipulation skills with Pandas.
- Python (with `pip`, `NumPy` and `Pandas`) installed on your computer or an online environment like Google Colab or Kaggle.

### Goals
At the end of this tutorial, you will be familiar with:
- Understanding Time-series forecasting.
- Installation of NeuralProphet.
- Formating the data for forecasting.
- Performing Forecasts on a single series using NeuralProphet.
- Forecasting on multiple series.

### About Time-series forecasting
Time series is a series of data points that are organized in an order of time. For example, weather data for a location for some time will be listed as dates with their corresponding temperature, rainfall amount, atmospheric pressure, and so on.

Predicting this kind of data using traditional statistics such as Linear regression, Ridge regression, and Lasso regression as well as Bayesian techniques, do not produce optimal results. Time-series forecasting is a modeling strategy used to predict future trends using past observations where the time-series are the independent variables. This technique can unravel time-domain relationships like seasonality, weekly, monthly, and yearly trends.

### Setting up environments
On Google Colab, to install NeuralProphet, run the following commands:

```bash
pip install neuralprophet[live]
```

Locally, run the following:

```bash
pip install neuralprophet
```

> Note: Online editors like `repl.it` may fail to run our code due to insufficient memory allocations.

### Importing and preparing the data
We will start by importing the `pandas` library and the dataset.

```python
import pandas as pd
path='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
dataset=pd.read_csv(path,engine='python')
```

### The COVID-19 Dataset
We will be using the Covid-19 Global Cases Dataset from [COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19). To manually navigate to the CSV file within the repository, follow the path `csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`.

This dataset is a collection of reports from various countries' health departments, agencies, and universities that is updated daily by the CSSE at JHU.

### Preparation of the data
The data has some countries' data presented by the `Province` or `State`. The 'Province/State' column should be combined into one country's column. We also need to drop the 'Lat' and 'Long' column since they're not useful for this task.

```python
dataset=dataset.groupby('Country/Region').sum()
dataset=dataset.drop(columns=['Lat','Long'])
```

For easier fetching during model training, we will rotate the data so that country names are column names and dates are just rows.

We will do this by saving the dates in a variable `dates`, transposing the rest of the dataset, and concatenating it with `dates` as a `Date` column.

```python
dates=dataset.columns
dataset=dataset.transpose().reset_index(drop=True)
dates=pd.DataFrame(dates)
rotated_dataset= pd.concat([dates, dataset.diff()], axis=1, join='inner')
rotated_dataset=rotated_dataset.rename(columns={0:'Date'})
```

NeuralProphet only accepts two columns; the `dates` and `y-column` when fitting data. The columns must be named `ds` and `y`, respectively. We will drop all `NULL` values from the data.

For the moment, let's use the `US` data for demonstration.

```python
data=cases[['Date','US']]
data.columns=['ds','y']
data.dropna(inplace=True)
data[:1].head()
```

**Output:**

```bash
 	      ds 	   y
2 	1/24/20 	1.0
3 	1/25/20 	0.0
4 	1/26/20 	3.0
5 	1/27/20 	0.0
6 	1/28/20 	0.0
```

### Training the model
We will import the `NeuralProphet()` class from `neuralprophet`, create an empty model from it, and assign it to the variable `m`. We will then fit the model on our training dataset `data` from the previous step. Thereafter, we will begin the training process by passing three arguments to the `fit()` method:

- The dataset to train on, `data`,
- Frequency of the data, `freq` as 'D' since the occurrence of the data is daily,
- Training time, `epochs`

```python
from neuralprophet import NeuralProphet
m = NeuralProphet()
m.fit(data,freq='D',epochs=1000)
```

After the training process is complete, we can obtain the model's metrics, such as Mean Absolute Error (MAE), from the output of the cell. We can note that the MAE is reduced significantly (~ 90%) during the training process.

### Monitoring the training process and evaluating the model
A NeuralProphet model self-validates and provides validation metrics as part of the training process outputs. If you installed the `[live]` version of NeuralProphet and want to monitor the metrics during the training process, split the data into training and testing sets using the model's `split_df()` method as shown below:

```python
df_train, df_test = m.split_df(data, freq='D')
metrics = m.fit(df_train, freq='D', epochs=1000, validation_df=df_test, plot_live_loss=True)
```

A live plot of the `SmoothL1Loss` and `MAE` will be plotted live during training.

The output of the code-cell below displays the metrics of the model at the end of training:

```python
metrics.tail(1)
```

**Output:**

```bash
index,SmoothL1Loss,MAE,RMSE,RegLoss,SmoothL1Loss_val,MAE_val,RMSE_val
1999,0.0029082219263359263,14688.557393324336,21929.236516299832,0.0,NaN,NaN,NaN
```

### Forecasting
Forecast future trends by passing the data and the number of periods (days) to the `make_future_dataframe()` method. Let us predict for the next 14 days. Let's call the `predict()` method on `future` to perform the forecast. The predictions are the `yhat1` column of the `forecast` dataframe.

```python
future=m.make_future_dataframe(data,periods=14)
forecast=m.predict(future)
print(forecast)
```

Let us plot the predictions using the model's in-built plotting method, `plot()` from the matplotlib API.

```python
fig1 = m.plot(forecast)
```

**Output:**

![Predicted cases](/engineering-education/predicting-covid-using-neuralprophet/df2.png)

Since we are predicting cases, they cannot be floating-point values. We round of the predictions to the nearest integer by casting the series of floats to an `int` datatype.

```python
forecast['yhat1'].astype(int)
```

The `yhat1` values are:

```bash
0     377139
1     376244
2     376643
3     376004
4     382333
5     358197
6     340498
7     353060
8     352851
9     353981
10    354114
11    361250
12    337950
13    321113
Name: yhat1, dtype: int64
```

This means that the model predicts 377,139 cases for tomorrow, 376,244 for the following day, and so on. We will obtain the predictions with their dates as follows:

```python
results_df=forecast[['ds','yhat1']]
results_df['yhat1']=forecast['yhat1'].astype(int)
results_df.columns=['Date','Predicted Cases']
results_df
```

**Output:**

```bash
index,Date,Predicted Cases
0,2022-02-14 00:00:00,377139
1,2022-02-15 00:00:00,376244
2,2022-02-16 00:00:00,376643
3,2022-02-17 00:00:00,376004
4,2022-02-18 00:00:00,382333
5,2022-02-19 00:00:00,358197
6,2022-02-20 00:00:00,340498
7,2022-02-21 00:00:00,353060
8,2022-02-22 00:00:00,352851
9,2022-02-23 00:00:00,353981
10,2022-02-24 00:00:00,354114
11,2022-02-25 00:00:00,361250
12,2022-02-26 00:00:00,337950
13,2022-02-27 00:00:00,321113
```

### Conclusion
We have built a NeuralProphet model and used it to predict Covid-19 cases. In this tutorial, we learned how to install NeuralProphet, import and prepare data for time-series forecasting, train the NeuralProphet forecaster, and forecast using the trained model. 

We can serve this model via any web application framework like Streamlit or Dash using Django or Flask via an API. In case of any issues with NeuralProphet, you can raise an issue on [NeuralProphet's GitHub](https://github.com/ourownstory/neural_prophet).

You can find the complete code [here](https://github.com/iannjari/neuralprophet/blob/main/NeuralProphet.ipynb).

Happy coding!

### References
- [NeuralProphet's Contributors on Github](https://github.com/iannjari/neuralprophet/blob/main/NeuralProphet.ipynb)
- [NeuralProphet documenation](https://neuralprophet.com/html/contents.html)
- [NeuralProphet's Release Notes](https://ai.facebook.com/blog/neuralprophet-the-neural-evolution-of-facebooks-prophet/)
- [Notebook with accompanying Source Code](https://github.com/iannjari/neuralprophet/blob/main/NeuralProphet.ipynb).

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
