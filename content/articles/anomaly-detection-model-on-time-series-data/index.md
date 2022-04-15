---
layout: engineering-education
status: publish
published: true
url: /anomaly-detection-model-on-time-series-data/
title: Anomaly Detection Model on Time Series data
description: This tutorial will guide a reader how to use Facebook Prophet to build an anomaly detection model.
author: charles-ndirutu
date: 2022-02-17T00:00:00-10:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/anomaly-detection-model-on-time-series-data/hero.jpg
    alt: Anomaly Detection Model on Time Series data Hero Image
---
In machine learning, a time series is a series of data points that are in successive order over a given time. The time can be minutes, hours, days, weeks, or years. Time series models analyze datasets and extract meaningful data characteristics.
<!--more-->
This makes the model understand patterns from data and gain useful insights. The model uses the knowledge gained to make future predictions. In time series modeling, we use diagrams and plots to show the predicted values.  

The application of time series is as follows: Weather forecasting, stock price prediction, forex trading, the field of science and engineering.   

When building a time series model, the dataset may have anomalies or outliers. Anomalies are observations or data points that deviate from normal behavior. When anomalies are left undetected in the dataset, they harm the model's performance. In this tutorial, we will use Facebook Prophet to build an anomaly detection model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Times series dataset](#time-series-dataset)
- [Importing packages](#importing-packages)
- [Loading the dataset](#loading-the-dataset)
- [Changing the dataset to be in hourly intervals](#changing-the-dataset-to-be-in-hourly-intervals)
- [Plotting a line chart](#plotting-a-line-chart)
- [Getting started with Facebook Prophet](#getting-started-with-facebook-prophet)
- [Dataset splitting](#dataset-splitting)
- [Initializing the model](#initializing-the-model)
- [Model fitting](#model-fitting)
- [Making predictions using the test dataset](#making-predictions-using-the-test-dataset)
- [Plotting diagram](#plotting-diagram)
- [Analyzing the predicted values](#analyzing-the-predicted-values)
- [Detecting anomalies](#detecting-anomalies)
- [Scatter plot](#scatter-plot)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, a reader should:
- Have some knowledge on [time series](/engineering-education/introduction-to-time-series/).
- Understand [time series decomposition in python](/engineering-education/time-series-decomposition-in-python/).
- Know how to build a [time series model](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/).
- Use [Google Colab notebook](https://research.google.com/).

### Time series dataset
In this tutorial, we will use the New York Taxi dataset. The dataset was recorded on a half-hour basis for 6 months. The dataset shows the number of active taxi drivers in New York city every half-hour. 

We will use this dataset to build a times series model using Facebook Prophet. We will then use the model to predict the number of active taxi drivers in New York. 

After the model has made the predictions, we will analyze the results of the predictions. This will enable us to detect the anomalies/outliers. By using a scatter plot, we will be able to visualize these outliers. Outliers are values that deviate from the expected prediction values (maybe extremely high or low). 

To download the New York Taxi dataset, use this [link](https://raw.githubusercontent.com/numenta/NAB/master/data/realKnownCause/nyc_taxi.csv).

### Importing packages
Let's import the packages that we will use in this tutorial:

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os
from datetime import datetime
import plotly.express as px
```

These packages are important for anomaly detection. The functions of each of these packages are as follows:

**matplotlib:** Matplotlib is a visualization package. We use Matplotlib to plot line graphs, figures, and diagrams.

**numpy:** Numpy will convert the time series dataset into arrays. It also enables us to perform mathematical operations on arrays.

**pandas:** Pandas perform data analysis and manipulation.

**os:** It enables us to interact with the operating system when in the Google Colab.

**datetime:** It converts the timestamps in our dataset into DateTime data types. Time series models only work with the DateTime datatypes for the time columns.

**plotly.express:** It plots more interactive diagrams. Plotly allows us to zoom on our diagrams and this enables us to gain more insights.

### Loading the dataset
To load the dataset, use this code:

```python
df = pd.read_csv('https://raw.githubusercontent.com/numenta/NAB/master/data/realKnownCause/nyc_taxi.csv')
```

To view the structure of the dataset, use this code:

```python
df
```

The dataset output is shown below:

![Dataset structure](/engineering-education/anomaly-detection-model-on-time-series-data/dataset-structure.jpg)

From the image, our dataset has two columns. The `timestamp` and the `value` column. The `timestamp` column has half-hour intervals. The `value` column shows the number of active taxi drivers every half-hour. The dataset also has `10320` data samples.

We need to convert the `timestamp` column to the `datetime` datatype using the following code:

```python
df['timestamp'] = pd.to_datetime(df['timestamp'])
```

### Changing the dataset to be in hourly intervals
The dataset has `10320` data samples. This value is huge and it may be difficult to visualize. We need to resample the dataset and change it to hourly intervals. This will reduce the observations to half making it easier to visualize.

```python
df = df.set_index('timestamp').resample("H").mean()
```

To view the resampled dataset, use this code:

```python
df
```

The output is shown below:

![Resampled dataset](/engineering-education/anomaly-detection-model-on-time-series-data/resampled-dataset.jpg)

From the image above, we have resampled our dataset and the new value is 5160.

### Plotting a line chart
We will visualize this dataset using the line chart. We will plot this diagram using the `plotly.express` library.

```python
fig = px.line(df.reset_index(), x='timestamp', y='value', title='NYC Taxi Demand')
fig.update_xaxes(
 rangeslider_visible=True,
 rangeselector=dict(
 buttons=list([
 dict(count=1, label='1y', step='year', stepmode='backward'),
 dict(count=2, label='3y', step='year', stepmode='backward'),
 dict(count=3, label='5y', step='year', stepmode='backward'),
 dict(step='all')
        ])
    )
)
fig.show()
```

From the code above, we initialize the x-axis as `timestamp`. The y-axis is the `value`. And the title of the line chart is `NYC Taxi Demand`. We then add labels that can show the data points within 1 year, 3 years, or 5 years. 

The diagram is shown below:

![Line chart](/engineering-education/anomaly-detection-model-on-time-series-data/line-chart.jpg)

The image above shows the number of active taxis from July 2014 to Jan 2015. 

Let's use this dataset to build the time series model.

### Getting started with Facebook Prophet
First, we install Facebook Prophet using the following command:

```bash
!pip install fbprophet
```

After installing Facebook Prophet, we import it using the following code:

```bash
from fbprophet import Prophet
```

Let's rename our dataset column.

```python
taxi_df = df.reset_index()[['timestamp', 'value']].rename({'timestamp':'ds', 
 'value':'y'}, 
 axis='columns')
```

In the code above, we have renamed our `timestamp` column to `ds` and `value` column to `y`. To check the structure of the renamed dataset, use this code:

```python
taxi_df.head()
```

The output is shown below:

![Renamed columns](/engineering-education/anomaly-detection-model-on-time-series-data/renamed-columns.jpg)

### Dataset splitting
We need to split our dataset into two sets. One set for training the time series model and the other set for testing the model.

```python
train_dataset = taxi_df[(taxi_df['ds']>='2014-07-01')&(taxi_df['ds']<='2015-01-27')]
test_dataset = taxi_df[(taxi_df['ds']>'2015-01-27')]
```

From the code above, the dataset between `2014-07-01` and `2015-01-27` is the train set. The test set contains timestamp values past `2015-01-27`. The model will use the test dataset to make predictions.

Let's initialize our model.

### Initializing the model
We will initialize our model using the following code:

```python
model = Prophet(changepoint_range=0.95)
```

We use a `changepoint_range=0.95` to increase the confidence interval of our output. The confidence interval determines if a prediction is right or wrong. The higher the confidence interval increases, the chances of the model making accurate predictions.

To understand the confidence interval in detail, read this [article](https://towardsdatascience.com/confidence-intervals-for-time-series-data-sharpestminds-slack-chats-4b05e211943a)

Let's fit the model to our train dataset.

### Model fitting
We fit the model to the training dataset so that the model can learn from it. 

```python
model.fit(train_dataset)
```

This code will train the model. After training, the model will be ready to make future predictions.

### Making predictions using the test dataset
The test dataset contains timestamp values past `2015-01-27`. The test set has 120 hours. We are forecasting for the 120 hours in the test dataset.

```python
future = model.make_future_dataframe(periods=120, freq='H')
future.tail()
```

From the code above, `periods=120` shows the 120 hours recorded in the test dataset. `freq='H'` will give the prediction values in hourly-interval. `future.tail()` will show the five last rows of the `ds` column. It shows the last five hours the model will predict.

The last five rows are shown below:

![Last five rows](/engineering-education/anomaly-detection-model-on-time-series-data/five-rows.jpg)

To make these predictions use this code:

```python
forecast = model.predict(future)
forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail()
```

From the code above, we have initialized various methods and columns.

- `model.predict`: It is the method that makes the actual predictions. 
- `ds`: It is the column that contains the timestamps values of the next 120 hours. 
- `yhat`: It is the column that contains the forecast values after the model makes predictions.
- `yhat_lower`: It is the column that contains the bottom values of the confidence interval.
- `yhat_upper`: It is the column that contains the upper values of the confidence interval.

If you run the code above, it will provide the following output:

![Predicted values](/engineering-education/anomaly-detection-model-on-time-series-data/predicted-values.jpg)

The image above shows the different predicted values. We can now plot a diagram to show the forecast values. 

### Plotting diagram
To plot the forecast values, use this code:

```python
digram1 = model.plot(forecast)
```

This will output the following diagram:

![Plot diagram](/engineering-education/anomaly-detection-model-on-time-series-data/plot-digram.jpg)

From the image above, the black points are the predicted values. We now need to analyze these values to detect the anomalies in these values.

### Analyzing the predicted values
To further understand these prediction results, we add two columns to the prediction data frame. So far the prediction data frame has four columns. We need to add an `error` column and the `uncertainty` column. These two columns will help detect anomalies/outliers.

#### Error column
We use this column to find the difference between the actual number of taxis and the predicted number of taxis. The actual values are saved in `y` column and the predicted values are in the `yhat` column.

We add the error column using the following code:

```python
outcome['error'] = outcome['y'] - outcome['yhat']
```

#### Uncertainity column
We use this column to find the difference between the confidence intervals (`yhat_upper` and `yhat_lower`).

We add the uncertainty column using the following code:

```python
outcome['uncertainity'] = outcome['yhat_upper'] - outcome['yhat_lower']
```

To see the new data frame, use this code:

```python
outcome.head()
```

The new data frame is shown below:

![New dataframe](/engineering-education/anomaly-detection-model-on-time-series-data/new-dataframe.jpg)

We now use these columns to detect anomalies.

### Detecting anomalies
We will use the following logic to identify anomalies.

```python
outcome['anomaly'] = outcome.apply(lambda x: 'Yes' if(np.abs(x['error'])>1.5*x['uncertainity']) else 'No',axis=1)
```

From the code above, a predicted value `yhat` is an anomaly if the absolute error value (error) is greater than 1.5 multiplied by the uncertainty value. The `outcome.apply` method will apply the logic and detect the anomalies.

We can now create a scatter plot to show the detected anomalies.

### Scatter plot
To create a scatter plot, use this code snippet:

```python
fig = px.scatter(outcome.reset_index(), x='ds', y='y', 
 color='anomaly',title='NYC Taxi Demand')
fig.update_xaxes(
 rangeslider_visible=True,
 rangeselector=dict(
 buttons=list([
 dict(count=1, label='1y', step='year', stepmode='backward'),
 dict(count=2, label='3y', step='year', stepmode='backward'),
 dict(count=3, label='5y', step='year', stepmode='backward'),
 dict(step='all')
        ])
    )
)
fig.show()
```

From the code above, we have set `ds` as the x-axis and `y` as the y-axis. The title of the scatter plot is `NYC Taxi Demand`. Also, the anomalies detected will be given a different color. When the code is executed, it outputs the following diagram:

![Scatter plot](/engineering-education/anomaly-detection-model-on-time-series-data/scatter-plot.jpg)

In the image above, the detected anomalies have a red color. The normal data points have a blue color. The scatter plot has helped us to detect the outliers available in our dataset.

### Conclusion
In this tutorial, we learned anomaly detection on time series data. We used the New York Taxi dataset to train our model. Using the Facebook Prophet library, we built a time series model. The model was used to predict the number of active taxi drivers in New York. We then used a scatter plot to detect anomalies in our dataset. Using this tutorial, a reader should detect anomalies on time series data.

To access the Google Colab notebook for this tutorial, use this [link](https://colab.research.google.com/drive/15amwA8CdN9AApOoZGnYS3roNMxr6mAcy?usp=sharing)

### References
- [Google Colab notebook](https://colab.research.google.com/drive/15amwA8CdN9AApOoZGnYS3roNMxr6mAcy?usp=sharing)
- [Facebook Prophet documentation](https://github.com/facebook/prophet#:~:text=Prophet%20is%20a%20procedure%20for,several%20seasons%20of%20historical%20data.)
- [Introduction to time series](/engineering-education/introduction-to-time-series/)
- [Time series decomposition in python](/engineering-education/time-series-decomposition-in-python/)
- [Time Series analysis with Facebook Prophet](https://towardsdatascience.com/time-series-analysis-with-facebook-prophet-how-it-works-and-how-to-use-it-f15ecf2c0e3a)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
