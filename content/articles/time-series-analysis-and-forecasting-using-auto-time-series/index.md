---
layout: engineering-education
status: publish
published: true
url: /time-series-analysis-and-forecasting-using-auto-time-series/
title: Time Series Analysis and Forecasting using Auto Time Series
description: This tutorial will be discussing how to build an electricity consumption prediction model using Auto Time Series library(Auto-TS).
author: elisha-njeche
date: 2022-03-21T00:00:00-12:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/hero.jpg
    alt: Time Series Analysis and Forecasting using Auto Time Series example image
---
A time series is a sequence of data points that occur in successive order over time. It shows all the data set variables that change over time.
<!--more-->
Time series analysis extracts meaningful patterns and attributes from the historical data. It enables the model to gain knowledge and identify trends in the dataset.

Time series builds a model that predicts future values based on historical data. The model can forecast forex exchange rates, stock prices, weather, and Covid-19 caseload. In stock prediction, a time series model tracks the movement of stock prices, such as Apple stock. Accurate predictions of the model will yield profit to the investors. 

In this tutorial, we will build an electricity consumption prediction model. We will use [Auto Time Series library (Auto-TS)](https://pypi.org/project/auto-ts/) to train the model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Getting started with Auto Time Series library](#getting-started-with-auto-time-series-library)
- [Benefits of using Auto Time Series library](#benefits-of-using-auto-time-series-library)
- [Installing Auto Time Series library](#installing-auto-time-series-library)
- [Working with the dataset](#working-with-the-dataset)
- [Loading the dataset](#loading-the-dataset)
- [Plotting the line graph](#plotting-the-line-graph)
- [Splitting the dataset](#splitting-the-dataset)
- [Selecting the timestamp and the target columns](#selecting-the-timestamp-and-the-target-columns)
- [Initializing the Auto Time Series model](#initializing-the-auto-time-series-model)
- [Selecting the best model](#selecting-the-best-model)
- [Actual vs Forecast values](#actual-vs-forecast-values)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To easily understand this article, a reader should:
- Understand [time series](/engineering-education/introduction-to-time-series/)
- Know how to build a [time series model](/engineering-education/sales-forecasting-with-prophet/)
- Understand [time series decomposition in Python](/engineering-education/time-series-decomposition-in-python/)
- Know some of the different [types of time series models](https://codeit.us/blog/machine-learning-time-series-forecasting)
- Use [Google Colab notebook](https://colab.research.google.com/)

### Getting started with Auto Time Series library
[Auto Time Series (Auto-TS)](https://pypi.org/project/auto-ts/) is an open-source Python library to automate time series analysis and forecasting. It trains high-accuracy models within a short time. Auto-TS automatically runs multiple time series models on the training dataset. It then automatically selects the best model from all the models.

There are different types of time series models. The most common models that Auto Time Series runs are as follows:
- [PyFlux Model](https://pyflux.readthedocs.io/en/latest/).
- [Non-Seasonal ARIMA Model](https://otexts.com/fpp2/non-seasonal-arima.html).
- [Seasonal SARIMAX Model](https://towardsdatascience.com/understanding-the-seasonal-order-of-the-sarima-model-ebef613e40fa).
- [Basic Machine Learning Model](https://towardsdatascience.com/ml-approaches-for-time-series-4d44722e48fe).
- [Vector Autoregressive Model](https://medium.com/geekculture/vector-auto-regressive-var-models-for-multivariate-time-series-forecasting-106bb6f74add).
- [Facebook Prophet Model](https://www.kaggle.com/prashant111/tutorial-time-series-forecasting-with-prophet).

All the listed models above support time series analysis and forecasting. Auto-TS chooses the best model based on its accuracy score and predictions made. We will then plot a line graph to show the forecast values.

### Benefits of using Auto Time Series library
- It performs automated dataset preprocessing. It will automatically transform the input dataset into a format the model can use. It removes noise and unnecessary information in the dataset. 

- It can handle missing values and outliers. Auto-TS handles the missing values to ensure we have a complete dataset. It also removes outliers that are not within the dataset range.

- It trains high-accuracy models. Auto-TS produces reliable and accurate models.

- It selects the optimal time series model. Auto-TS automatically runs multiple time series models listed above. It then automatically selects the optimal model. 
This model will give the most accurate results.

- Automatic hyperparameter tuning and configurations. Auto-TS automatically fine-tunes the model parameters. It ensures the model gives the best accuracy score.

### Installing Auto Time Series library
To install the Auto Time Series library, run this command:

```bash
!pip install auto_ts
```

We import this using this code:

```python
import auto_ts as AT
```

Let's now start working with our dataset.

### Working with the dataset
We will use the electricity consumption dataset to train the model. The dataset shows the monthly electricity consumption of an individual household from `2016-01-01` to `2020-05-01`. You can download the electricity consumption dataset [here](https://drive.google.com/file/d/15VvheglnHwqZeGygiGI-Prq6pxs2uel9/view?usp=sharing).

The dataset output:

![Electricity consumption dataset](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/electricity-consuption-dataset.png)

From the image above, the dataset has six columns:

- `Bill_Date`: It shows the date on which the billing period ends.

- `On_peak`: It is the electricity consumption during the peak season.

- `Off_peak`: It is the electricity consumption during the off-peak season.

- `Usage_charge`: It is the total cost of electricity consumption without the tax.

- `Billed_amount`: It is the total cost of electricity consumption and the tax.

- `Billing_days`: It shows the number of days within the billing period. 

We need to convert the `Bill_Date` column to the DateTime format. The DateTime format is the format Auto Time Series understands. It also enables us to perform time-series operations on this column.

We will use the Python Datetime module.

```python
from datetime import datetime
```

Let's create a Python function to convert the `Bill_Date` column to the DateTime format.

```python
def parse(x):
    return datetime.strptime(x, '%m/%d/%Y')
```
We will call the function when loading the dataset. 

### Loading the dataset
We will load the dataset using Pandas.

```python
import pandas as pd
```
To load the dataset and also convert the `Bill_Date` column to the DateTime format, use this code:

```python
df = pd.read_csv('/content/electricity_consumption.csv', parse_dates = ['Bill_Date'], date_parser=parse)
```

To see the loaded dataset, use this code:

```python
df
```

The output of the dataset:

![Dataset output](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/dataset-output.png)

To check the dataset information, use this code:

```python
df.info()
```

The output:

![Dataset information](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/dataset-info.png)

From the output, the dataset has 53 entries. Also, there are no missing values.

Let's make the `Bill_Date` the index column. 

```python
ec_df = df.set_index('Bill_Date')
```

To see the dataset with `Bill_Date` as the index column, use this code:

```python
ec_df.head()
```

The dataset output:

![Dataset](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/index-column.png)

### Selecting the dependent variable
The dependent variable is the variable that the model will predict. This variable changes with time. The dependent variable is the `Billed_amount`.

```python
ec_data = ec_df['Billed_amount']
```

### Plotting the line graph
We will plot the line graph that shows the data points using Matplotlib. Let's import Matplotlib.

```python
import matplotlib.pyplot as plt
```

To plot the line graph, use this code:

```python
ec_data.plot(grid=True)
```

The line graph output:

![Dataset](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/line-graph.png)

The image shows the `Billed_amount` and the `Bill_Date` from 2016 to 2020. 

Let's plot a line graph to show electricity consumption for 2019.

#### Line graph for 2019
To plot the line graph, use this code:

```python
ec_df_2019=ec_df.loc['2019']
ec_data_2019=ec_df_2019['Billed_amount']
ec_data_2019.plot(grid=True)
```

The output:

![Line graph for 2019](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/line-graph-2019.png)

From the image above, the highest energy consumption was for September. We can also plot a bar graph to show electricity consumption for 2019.

#### Bar graph for 2019
To plot the bar graph, use this code:

```python
ec_df_2019=ec_df.loc['2019']
ec_data_2019=ec_df_2019['Billed_amount']
ec_data_2019.plot.bar()
```

The output:

![Bar graph for 2019](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/bar-graph-2019.png)

The bar graph shows the highest energy consumption was in September.

### Creating a copy of the dataset
We will use this copy of the dataset to train the model.

```python
final_df = df.copy()
final_df=final_df[['Bill_Date','On_peak','Off_peak','Billed_amount','Billing_days']]
```

### Splitting the dataset
We will split the dataset into two sets. One set for model training and the other for model testing.

```python
train = final_df[:50]
test = final_df[50:]
```

The first 50 entries/data points will train the model. The remaining entries will test the model.

Let's print the shape of the train and test datasets.

```python
print(train.shape, test.shape)
```

The output:

```bash
(50, 5) (3, 5)
```

### Selecting the timestamp and the target columns
The Auto Time Series model expects an input dataset with timestamp and target columns. The `timestamp` column contains the DateTime of the time series. The` target` column has the time series values (data points). The model will learn from these columns.

```python
ts_column = 'Bill_Date'
sep = ','
target = 'Billed_amount'
```

The `Bill_Date` is the timestamp column, and the `Billed_amount` is the target column. Also, our dataset is comma-separated.

### Initializing the Auto Time Series model
We initialize the Auto Time Series model using the following code:

```python
ml_dict = AT.Auto_Timeseries(train, ts_column,
                            target, sep,  score_type='rmse', forecast_period=6,
                            time_interval='Months', non_seasonal_pdq=None, seasonality=True,
                            seasonal_period=12,seasonal_PDQ=None, model_type='best',
                            verbose=2)
```
The Auto Time Series model has the following parameters:

- `train`: It contains the training set. These are the first 50 entries/data points that trains the model. 

- `ts_column`: It contains the DateTime of the time series.

- `sep`: It specifies the dataset format. Our dataset is comma-separated values (CSV).

-  `score_type`: It is the scoring metrics for the model. We use the Root Mean Square Error (RMSE). RMSE calculates the error of a model when making predictions. It indicates the absolute fit of the model to the data – how close the observed data points are to the predicted values.

- `forecast_period`: It shows the number of months the model will predict. The model will make predictions for the next six months.

- `time_interval`: It shows the time interval of the time series. It can be in minutes, hourly, daily, monthly, or yearly. Our dataset has monthly intervals.

- `non_seasonal_pdq`: It contains the parameters that train the Non-Seasonal ARIMA model.

- `seasonality`: It handles the periodic changes in the time series that occur within a given time. Seasonality shows a regular pattern within the dataset. 

Seasonality can be daily, weekly, or yearly. Our dataset has monthly seasonality. In our dataset, the highest energy consumption occurs during September. It keeps on repeating during this month for all the years. It is because of the seasonality effect.

- `seasonal_period=12`: It shows the monthly seasonality.

- `seasonal_PDQ=None`: It contains the parameters that train the Seasonal SARIMAX Model.

- `model_type='best`: It shows the types of models that Auto Time Series will use for training. We set the values to `best` so that Auto Time Series will run multiple time series models and select the best one.

When you execute the code above, Auto Time Series will run multiple time series models and produce the following outputs:

**Running Facebook Prophet Model**

![Running Facebook Prophet Model](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/running-facebook-prophet.png)

**Running PyFlux Model**

![Running PyFlux Model](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/runningp-pyflux-model.png)

**Running Non-Seasonal ARIMA Model**

![Running Non-Seasonal ARIMA Model](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/running-non-seasonal-arima.png)

**Running Seasonal SARIMAX Model**

![Running Seasonal SARIMAX Model](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/running-seasonal-sarimax.png)

**Running VAR Model**

![Running VAR Model](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/running-var-model.png)

**Running Machine Learning Models**

![Running Machine Learning Models](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/running-machine-learning-models.png)

**Showing time series components**

![Running Machine Learning Models](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/time-series-components.png)

It shows the overall trend of the time series data and the seasonality in the dataset.

**Original time series** 

![Original time series](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/original-time-series.png)

**Histogram of original time series**

![Histogram of original time series](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/histogram-of-original-time-series.png)

After the Auto Time-series automatically runs, it selects the best model. 

### Selecting the best model
Auto Time Series will select the best model with the lowest RMSE score. It shows the model with the lowest error when making predictions.

The best model is:

![Best model](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/best-model.png)

From the image above, the best model is Facebook Prophet. It also shows an array of actual and forecast values. The model has an RMSE score of `39.91`. It indicates the model can make accurate predictions.

Finally, Auto-TS will plot a line graph to show the actual and the forecast values.

### Actual vs Forecast values
The line graph output:

![Actuals vs Forecast Values](/engineering-education/time-series-analysis-and-forecasting-using-auto-time-series/actual-vs-forecast.png)

From the image above, the red line shows the actual values. The green line shows the forecast values. The model has made predictions for the next six months.

### Conclusion
We have learned how to perform time series analysis and forecasting using the Auto Time Series library. The tutorial shows the models that Auto Time Series runs. We also discussed the benefits of the Auto Time Series and how to install it. We used the Auto Time Series library to build an electricity consumption model. It selected Facebook Prophet as the best model. It had the lowest RMSE score and made predictions for six months.

To get the Python code in Google Colab, use this [link](https://colab.research.google.com/drive/1-VZ8YNIbs7GosvtTFyjaYK1HaZhqwqm-?usp=sharing). 

### References
- [Sales Forecasting with Prophet](/engineering-education/sales-forecasting-with-prophet/)
- [Predicting Covid-19 Cases Using NeuralProphet](/engineering-education/predicting-covid-using-neuralprophet/)
- [Introduction to Time Series](/engineering-education/introduction-to-time-series/)
- [Time series decomposition in Python/](/engineering-education/time-series-decomposition-in-python/)
- [Auto Time Series GitHub](https://github.com/AutoViML/Auto_TS)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
