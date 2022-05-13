---
layout: engineering-education
status: publish
published: true
url: /anomaly-detection-model-on-time-series-data-using-isolation-forest/
title: Anomaly Detection Model on Time Series Data using Isolation Forest
description: This tutorial will use the Isolation Forest algorithm to train an anomaly detection model on time series data.
author: collins-kirui
date: 2022-04-16T00:00:00-15:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/hero.jpg 
    alt: Anomaly Detection Model on Time Series data using Isolation Forest Hero Image
---
A time series is a sequence of data points that occur in successive order over time. A time series shows all the variables in the dataset that change with time.
<!--more-->
Examples of time-series data are company sales, weather records, Covid-19 caseloads, forex exchange prices, and stock prices. The time-series data can be minutes, hours, days, weeks, or years.

For example, in forex exchange, we can record the daily closing exchange rates of the Euro and US Dollar (EUR/USD) for a week. A time series model can then analyze these closing exchange rates to identify patterns. Eventually, the model predicts future EUR/USD exchange rates based on previously historical/observed closing prices.

During time series analysis and modeling, the dataset used may contain anomalies. Anomalies/outliers are unusual data points or observations that don't follow the expected dataset patterns.

Anomalies are spikes or drops in a time series dataset. Anomaly detection is the process of identifying the anomalies in a time series dataset. Time series dataset with anomalies leads to inconsistent results during forecasting.

We will use the Isolation Forest algorithm to train a time series model. We will also plot a line chart to display the anomalies in our dataset.

### Table of contents
- [Prerequisites](#prerequisites)
- [Why perform anomaly detection?](#why-perform-anomaly-detection)
- [Dataset preparation](#dataset-preparation)
- [Dataset resampling](#dataset-resampling)
- [Adding new columns](#adding-new-columns)
- [Plotting line charts](#plotting-line-charts)
- [Plotting a detailed line chart](#plotting-a-detailed-line-chart)
- [Building the anomaly detection using Isolation Forest](#building-the-anomaly-detection-using-isolation-forest)
- [Initialize the Isolation Forest algorithm](#initialize-the-isolation-forest-algorithm)
- [Fitting the Isolation Forest model](#fitting-the-isolation-forest-model)
- [Using Isolation Forest model to make predictions](#using-isolation-forest-model-to-make-predictions)
- [Anomalous data points](#anomalous-data-points)
- [Display the anomalies in our dataset](#display-the-anomalies-in-our-dataset)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should be familiar with the following:
- [Time series concepts](/engineering-education/introduction-to-time-series/)
- [Time series analysis and modeling](/engineering-education/anomaly-detection-model-on-time-series-data/)

### Why perform anomaly detection?
Anomaly detection has the following benefits:

- It helps with fraud detection. Anomaly detection will identify unusual and suspicious events in time series. Anomaly detection models are applied in banks and other financial institutions to detect fraud. The anomaly detection model will identify suspicious activities and transactions.

- It detects sudden spikes and drops in the time series dataset. Anomaly detection will explain the sudden spikes and drops in the dataset. We will also be able to gain valuable insights from the dataset. The sudden spikes and drops may lead to inconsistent results during forecasting. 

- It identifies noise in the dataset. Noise is unwanted and erroneous data points. Noisy data has meaningless information that may corrupt the time series model in training. Removing the noise will ensure we have a high-quality dataset.

- It helps in identifying failures/malfunctioning in applications and devices. The model identifies unexpected changes in time-series data that record devices and applications' performance. The unexpected changes may be associated with device failure or malfunctioning.

- It helps in network intrusion and network anomaly detection. Models that monitor the network traffic will detect sudden changes in network traffic. These sudden changes may be due to cyber-attacks and other unauthorized access.

### Dataset preparation
We will prepare the dataset that the anomaly detection model will use. We will use the New York Taxi dataset. The dataset shows the number of taxi rides for six months. It is in 30 minutes intervals. 

It will train the anomaly detection model using the Isolation Forest algorithm. The model will be able to identify all the anomalies in our dataset. Download the dataset from [here](https://drive.google.com/file/d/1tI7DOx57sF1MwhNGTyx9IImKX-pxqm9S/view?usp=sharing)

#### Reading the dataset
We will use Pandas to read the dataset.

```python
import pandas as pd
```

Use this code to read the data:

```python
df = pd.read_csv('taxi_rides.csv')
```

To see the rows and columns in the dataset, run this code:

```python
df
```

Output:

![Rows and columns](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/taxi-dataset.png)

The dataset has `timestamp` and `value` columns. The `timestamp` column shows the time of recording. The `value` column contains the number of taxi rides.

#### Converting the 'timestamp' column
We will convert the `timestamp` column to the DateTime format. DateTime will allow us to perform time-series analysis and operations on the column. 

We will use the `datetime` Python module.

```python
from datetime import datetime
```
Run this code to convert the `timestamp` column:

```python
df['timestamp']=pd.to_datetime(df['timestamp'])
```
### Dataset resampling
There are many data points in our time series dataset. It may be hard to plot and visualize all the data points. 

We will resample the time-series dataset and aggregate it to hourly intervals. We use Pandas `resample` method to aggregate it to hourly intervals. 

```python
df=df.set_index('timestamp').resample("H").mean().reset_index()
```
Use this code to see the new aggregated dataset:

```python
df
```

Aggregated dataset output:

![Aggregated dataset](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/aggregated-dataset.png)

From this output, the dataset is aggregated and has hourly intervals.

### Adding new columns
We will add two news columns to our time series dataset. These columns will hold specific time series values that the Isolation Forest algorithm will use for training.

**Hour column**
This column will hold the hourly time stamp in the time series dataset. It will show the taxi rides during each hour of the day.

```python
df['hour']=df.timestamp.dt.hour
```

**Weekday column**
This column will hold the number of taxi rides during each day of the week. It will show how the number of taxi rides varies across the days of the week. 

```python
df['weekday']=pd.Categorical(df.timestamp.dt.strftime('%A'), categories=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'], ordered=True)
```

Use this code to see the new dataset with the added columns:

```python
df
```

Output:

![New columns](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/new-columns.png)

### Plotting line charts
We will plot two line charts. The first line chart will show the number of taxi rides during each day of the week. The second line chart will show the number of taxi rides during each hour of the day. We will plot the line chart using Matplotlib. 

Let's import Matplotlib.

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
```

#### First line chart
Use this code snippet:

```python
df[['value','weekday']].groupby('weekday').mean().plot()
```

Line chart output:

![First line chart](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/first-line-chart.png)

The line chart above shows the number of taxi rides recorded during each day of the week. From this line chart, the number of taxi rides increases during the weekdays (Monday-Friday). It is because most people are going to work. During the weekends the number of rides reduces. Most people are at home and do not need taxi rides.

#### Second line chart
Use this code snippet:

```python
df[['value','hour']].groupby('hour').mean().plot()
```

Line chart output:

![Second line chart](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/second-line-chart.png)

The line chart above shows the number of taxi rides recorded during each hour of the day. During the morning hours (5-10), the number of taxi rides increases or is higher. Most people are going to work at this time. Also, during the evening hours, the number of rides is higher because most people travel home from work.

We will also plot a detailed line chart to show all the data points.

### Plotting a detailed line chart
We will use the Plotly Express library to plot a detailed line chart. It will show all the data points in the aggregated time series dataset.

Let's import Plotly Express.

```python
import plotly.express as px
```
To plot the line chart, use this code snippet:

```python
fig = px.line(df.reset_index(), x='timestamp', y='value', title='TAXI RIDES')
fig.update_xaxes(
    rangeslider_visible=True,
)
fig.show()
```
Detailed line chart output:

![Detailed line chart](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/detailed-line-chart.png)

We have prepared our dataset and visualized the data points. Let's start building the anomaly detection model using an Isolation Forest.

### Building the anomaly detection using Isolation Forest
[Isolation Forest](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html) is an unsupervised algorithm for anomaly detection. It does not require a labeled time-series dataset to identify anomalies.

Let's import an Isolation Forest algorithm.

```python
from sklearn.ensemble import IsolationForest
```
Isolation Forests (IF), similar to [Random Forests](/engineering-education/introduction-to-random-forest-in-machine-learning/), are built based on decision trees. An IF algorithm randomly selects features in the time series dataset. It then sub-samples data points using a tree-based structure. 

Isolation Forest builds multiple decision trees so that each leaf of the decision tree will isolate the data points in the time series dataset. Each leaf of the tree isolates exactly one observation from the data set. 

The data point can either be an anomaly or not. Let's initialize the Isolation Forest algorithm.

#### Initialize the Isolation Forest algorithm
To initialize the Isolation Forest algorithm, use the following code:

```python
model =  IsolationForest(contamination=0.004)
```

The `IsolationForest` has a `contamination` parameter. This parameter specifies the number of anomalies in our time series data. It sets the percentage of points in our data to be anomalous. We set this value to `0.004%`. It will determine how the dataset is "contaminated" with anomalies.

Let's fit the Isolation Forest model to the time series data.

#### Fitting the Isolation Forest model
We will use the `fit` function.

```python
model.fit(df[['value']])
```

The `value` will train the Isolation Forest model. It will learn and identify anomalies.

We can now use the trained Isolation Forest model to make predictions. The model will identify anomalies in the time series dataset.

### Using Isolation Forest model to make predictions 
To make predictions using the trained Isolation Forest model, use the code snippet below:

```python
df['outliers']=pd.Series(model.predict(df[['value']])).apply(lambda x: 'yes' if (x == -1) else 'no' )
```

The code above adds a new `outliers` column to the dataset. This column will either be labeled `yes` or `no`. `yes` will show the anomalous data points. `no` will show the normal data points.

We use the `predict` function to make predictions. Let's display all the anomalous data points.

### Anomalous data points
We use the `query` method to display all the anomalous data points.

```python
df.query('outliers=="yes"')
```

Anomalous data points output:

![Anomalous data points](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/anomalous-datapoints.png)

All the data points displayed above are anomalous. Let's plot a line chart to show the anomalies in our dataset.

### Display the anomalies in our dataset
We will use Plotly Express to visualize all the anomalies in our dataset. To display the anomalies, run this code:

```python
fig = px.scatter(df.reset_index(), x='timestamp', y='value', color='outliers', hover_data=['weekday'], title='TAXI DRIVES')
fig.update_xaxes(
    rangeslider_visible=True,
)
fig.show()
```

![Ploty Express diagram](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/ploty-express-diagram.png)

The above Ploty Express diagram shows the anomalous data points/outliers (orange dots) and the normal data points (blue dots). 

We have detected, plotted, and visualized the anomalies in the time series dataset.

### Conclusion
In this tutorial we learned how to perform anomaly detection on time series data. We created the anomaly detection model using the Isolation Forest algorithm. We discussed the benefits of anomaly detection and how it helps explain the spikes and drops in the dataset.

We prepared the dataset so that the anomaly detection model can be used. Finally, we used the prepared dataset to build the model. Using this tutorial, you should be able to detect, plot, and visualize the anomalies in the time series dataset.

To get the Python code used in this tutorial, click [here](https://colab.research.google.com/drive/19-1sWjLilDVNnNlkDjioQBHJZH8XCUaK?usp=sharing)

### References
- [Anomaly Detection](https://towardsdatascience.com/anomaly-detection-for-dummies-15f148e559c1)
- [Isolation Forest algorithm](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html) 
- [Time Series basics](/engineering-education/introduction-to-time-series/)
- [Plotly Express in Python](https://plotly.com/python/plotly-express/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
