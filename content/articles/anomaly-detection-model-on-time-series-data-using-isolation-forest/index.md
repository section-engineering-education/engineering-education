Time-series data is a collection of data points are in continuous intervals over time. A time series shows all the variables in the dataset that change with time.

Examples of time-series data are company sales, weather records, Covid-19 caseloads, forex exchange prices and stock prices. The time-series data are recorded in minutes, hours, days, weeks, or years.

For example in forex exchange, we can record the daily closing exchange rates of the Euro and US Dollar(EUR/USD) for a week. A time series model can then analyze these closing exchange rates to identify patterns. Eventually, the model predicts future EUR/USD exchange rates based on previously historical/observed closing prices.

During time series analysis and modeling, the dataset used may contain anomalies. Anomalies/outliers are unusual data points or observations that don't follow the expected dataset patterns.

Anomalies are spikes or drops in a time series dataset. Anomaly detection is the process of identifying the anomalies in a time series dataset. When we use a time series dataset with anomalies it leads to inconsistent results during forecasting.

In this tutorial, we will use the Isolation Forest algorithm to train a time series model. We will also plot a line chart to display the anomalies in our dataset.

### Table of contents
- [Prerequisites](#prerequisites)
- [Why perform anomaly detection?](#why-perform-anomaly-detection)
- [Dataset preparation](#dataset-preparation)
- [Dataset resampling](#dataset-resampling)
- [Adding new columns](#adding-new-columns)
- [Plotting line charts](#plotting-line-charts)
- [Plotting a detailed line chart](#plotting-a-detailed-line-chart)
- [Building the anomaly detection using Isolation Forest](#building-the-anomaly-detection-using-isolation-forest)
- [Initialiaze the Isolation Forest algorithm](#initialiaze-the-isolation-forest-algorithm)
- [Fitting the Isolation Forest model](#fitting-the-isolation-forest-model)
- [Using Isolation Forest model to make predictions](#using-isolation-forest-model-to-make-predictions)
- [Anomalous data points](#anomalous-data-points)
- [Display the anomalies in our dataset](#display-the-anomalies-in-our-dataset)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should:

- Understand [time series concepts](/engineering-education/introduction-to-time-series/)
- Understand [time series analysis and modelling.](/engineering-education/anomaly-detection-model-on-time-series-data/)

### Why perform anomaly detection?
Anomaly detection has the following benefits:

- It helps with fraud detection. 
Anomaly detection will identify unusual and suspicious events in time series. Anomaly detection models are then applied in banks and other financial institutions to detect fraud. The anomaly detection model will identify suspicious financial activity and transactions in a time series of data.

- It detects sudden spikes and drops in the time series dataset. 
Anomaly detection will explain why there are sudden spikes and drops in the dataset. We will also be able to gain valuable and useful insights from the dataset. If the sudden spikes and drops are left unchecked it may lead to inconsistent results during forecasting. 

- It identifies noise in the dataset.
Noise is unwanted and erroneous data points. Noisy data has meaningless information that may corrupt the time series model in training. Removing the noise will remove meaningless information and improve the quality of the time series data.

- It helps in identifying failures/malfunctioning in applications and devices.
The model identifies unexpected changes in time-series data that records devices and applications' performance. The unexpected changes may be associated with device failure or malfunctioning.

- It helps in network intrusion and network anomaly detection.
Models that monitor the network traffic, will detect sudden changes in network traffic. These sudden changes may be due to cyber-attacks and other unauthorized access.

### Dataset preparation
In this section, we will prepare the dataset so that the anomaly detection model can use. We will use a time-series dataset that shows the number of taxi rides for six months. 

The dataset is in 30 minutes intervals. The dataset will train the anomaly detection model using the Isolation Forest algorithm. The model will be able to identify all the anomalies in our dataset. Download the dataset from [here](https://drive.google.com/file/d/1tI7DOx57sF1MwhNGTyx9IImKX-pxqm9S/view?usp=sharing)

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

From this output, this dataset has two labeled columns: `timestamp` and `value`. The `timestamp` column shows the time the number of taxi rides was recorded. The `value` shows the number of taxi rides.

#### Converting the `timestamp` column
We need to convert the `timestamp` column to the DateTime format. It will enable us to perform time-series analysis and operations on this column. 

We will use the Python Datetime module.

```python
from datetime import datetime
```
Run this code to convert the `timestamp` column:

```python
df['timestamp']=pd.to_datetime(df['timestamp'])
```
### Dataset resampling
These are many data points in our time series dataset. It may be difficult to plot and visualize all the values. 

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
This column will hold the hourly time stamp in the time series dataset. In a day we have 24 hours, this column will show the taxi rides during each hour of the day.

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
We will plot two line charts. The first line chart will show the number of taxi rides recorded during each day of the week. The second line chart will show the number of taxi rides recorded during each hour of the day. 

We will plot the line chart using Matplotlib. Let's import Matplotlib.

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

The line chart above shows the number of taxi rides recorded during each day of the week. From this line chart, the 
number of taxi rides increases or is higher during the weekdays (Monday-Friday). This is because most people are going to work.

During the weekends the number of rides reduces. This is because most people are at home and do not need taxi rides.

#### Second line chart
Use this code snippet:

```python
df[['value','hour']].groupby('hour').mean().plot()
```
Line chart output:

![Second line chart](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/second-line-chart.png)

The line chart above shows the number of taxi rides recorded during each hour of the day. During the morning hours (5-10), the number of taxi rides increases or is higher. This is because most people are going to work at this time. Also, during the evening hours, the number of rides is higher because most people are coming from work.

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
Isolation Forest is an unsupervised algorithm for anomaly detection. Being unsupervised, it does not require a labeled time-series dataset to identify anomalies.

Let's import an Isolation Forest algorithm.

```python
from sklearn.ensemble import IsolationForest
```

The Isolation Forests are created using multiple decision trees. It identifies values that are very low or very high in the time series dataset. 

An Isolation Forest algorithm randomly selects features in the time series dataset. It then sub-samples data points using a tree-based structure. 

Isolation Forest builds multiple decision trees so that each leaf of the decision tree will isolate the data points in the time series dataset. Based on the set of rules, the data point will be labeled as either an anomaly or not.

Let's initialize the Isolation Forest algorithm.

#### Initialize the Isolation Forest algorithm
use this code:

```python
model =  IsolationForest(contamination=0.004)
```
The `IsolationForest` has `contamination` parameter. This parameter specifies the number of anomalies that may be in our time series data. We set this value to `0.004%`

Let's fit the Isolation Forest model to the time series data.

#### Fitting the Isolation Forest model
We will use the `fit` function.

```python
model.fit(df[['value']])
```
The `value` will train the Isolation Forest model so that it can learn and identify anomalies.

We can now use the trained Isolation Forest model to make predictions. The model will identify anomalies in the time series dataset.

### Using Isolation Forest model to make predictions 
Use the code snippet below:

```python
df['outliers']=pd.Series(model.predict(df[['value']])).apply(lambda x: 'yes' if (x == -1) else 'no' )
```
The code above adds a new `outliers` column to the dataset. This column will either be labeled `yes` or `no`. `yes` will show the anomalous data points. `no` will show the normal dataset values.
 
We use the `predict` function to make predictions. Let's display all the anomalous data points.

### Anomalous data points
We use the `query` method to display all the anomalous data points.

```python
df.query('outliers=="yes"')
```
Anomalous data points output:

![Anomalous data points](/engineering-education/anomaly-detection-model-on-time-series-data-using-isolation-forest/anomalous-datapoints.png)

All the data points displayed above are anomalous. Let's plot a line chart to display the anomalies in our dataset.

### Display the anomalies in our dataset
We will use Plotly Express to visualize all the anomalies in our dataset. Run this code:

```python
fig = px.scatter(df.reset_index(), x='timestamp', y='value', color='outliers', hover_data=['weekday'], title='TAXI DRIVES')

fig.update_xaxes(
    rangeslider_visible=True,
)
fig.show()
```
The above Ploty Express diagram shows the anomalous data points/outliers and the normal data points. We have been able to detect, plot, and visualize the anomalies in the time series dataset.

### Conclusion
We have learned how to perform anomaly detection on time series data. We created the anomaly detection model using the Isolation Forest algorithm. We discussed the benefits of anomaly detection and how it helps explain certain spikes and drops in the dataset.

In the next section, we prepared the dataset so that the anomaly detection model can use. Finally, we used the prepared dataset to build the model. Using this tutorial, you should be able to detect, plot, and visualize the anomalies in the time series dataset.

To get the Python code used in this tutorial, click [here](https://colab.research.google.com/drive/19-1sWjLilDVNnNlkDjioQBHJZH8XCUaK?usp=sharing)

### References
- [Anomaly Detection](https://towardsdatascience.com/anomaly-detection-for-dummies-15f148e559c1)
- [Isolation Forest algorithm](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html) 
- [Time Series basics](/engineering-education/introduction-to-time-series/)
- [Plotly Express in Python](https://plotly.com/python/plotly-express/)
