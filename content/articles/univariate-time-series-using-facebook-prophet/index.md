A time series is a collection of data points that occur in successive order over time. A time series shows factors that influence variables in a dataset.  Examples of time series data are stock prices, weather records, product sales, forex exchange, and health records.

In stock investment, a time series model tracks the movement of stock prices and identifies patterns over a specified time. The model then predicts future stock prices based on previously historical/observed prices.

Time series datasets are in three groups: Univariate, Bivariate, and Multivariate. Univariate data consists of only one variable, bivariate data have two variables and multivariate data contains more than two variables

In this tutorial, we will be focusing on the univariate time series model using Facebook Prophet. The model will predict airline passengers.

### Table of contents
- [Prerequisites](#prerequisites)
- [Univariate vs Bivariate vs Multivariate datasets](#univariate-vs-bivariate-vs-multivariate-datasets)
- [Getting started with Facebook Prophet](#getting-started-with-facebook-prophet)
- [Benefits of using Facebook Prophet](#benefits-of-using-facebook-prophet)
- [Installing Facebook Prophet](#installing-facebook-prophet)
- [Airline passengers dataset](#airline-passengers-dataset)
- [Plotting the line graph](#plotting-the-line-graph)
- [Changing the column names](#changing-the-column-names)
- [Plotting an interactive line chart](#plotting-an-interactive-line-chart)
- [Building the model using Facebook Prophet](#building-the-model-using-facebook-prophet)
- [Making future predictions](#making-future-predictions)
- [Calling the predict method](#calling-the-predict-method)
- [`y` vs `yhat` line graph](#y-vs-yhat-line-graph)
- [Plot diagram](#plot-diagram)
- [Components of our time series forecasts](#components-of-our-time-series-forecasts)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To easily understand this article, a reader should:

- Have some knowledge in [time series](/engineering-education/introduction-to-time-series/)
- Understand [Time series decomposition in Python](/engineering-education/time-series-decomposition-in-python/)
- Know how to work with [time series dataset](https://towardsdatascience.com/analyzing-time-series-data-in-pandas-be3887fdd621)
- Know how to use basic plotting librarries such as [Matplotlib](https://matplotlib.org/)

### Univariate vs Bivariate vs Multivariate datasets

#### Univariate data
This dataset consists of only one variable that changes over time. Time series analysis of univariate data is faster because the model only uses one variable during training.

The image below shows an example of univariate data:

![Univariate data](/engineering-education/univariate-time-series-using-facebook-prophet/univariate-data.png)

*Image Source: [Analyticsvidhya](https://cdn.analyticsvidhya.com/wp-content/uploads/2018/09/var_3.png)*

#### Bivariate data
This dataset consists of two variables that change over time. Time series analysis of bivariate data involves finding the relationships between two variables.

The image below shows an example of bivariate data:

![Bivariate data](/engineering-education/univariate-time-series-using-facebook-prophet/bivariate-data.png)

*Image Source: [GeeksforGeeks](https://www.geeksforgeeks.org/univariate-bivariate-and-multivariate-data-and-its-analysis/)*

#### Multivariate data
This data set contains more than two variables. Time series analysis of bivariate data is more complicated because we have to find the relationships among all the variables.

The image below shows an example of multivariate data:

![Multivariate data](/engineering-education/univariate-time-series-using-facebook-prophet/multivariate-data.png)

*Image Source: [Analyticsvidhya](https://cdn.analyticsvidhya.com/wp-content/uploads/2018/09/var_4.png)*

### Getting started with Facebook Prophet
Facebook Prophet is an open-source library for forecasting time series data. It helps individuals and businesses analyze the market values and make future predictions.

Facebook Prophet is performs forecasting using a decomposable additive model. The model has a non-linear trend that is fit with yearly, weekly, and daily seasonality and holiday effects.

It decomposes time series data into the following components:

#### Trend
It is visible a pattern in data. A trend shows the long-term movement in the dataset. A trend can be upward (uptrend), downward(downtrend), or constant(horizontal). The trends in a dataset occur within a given time and then disappear.

The image below shows the three types of trends.

![Trend](/engineering-education/univariate-time-series-using-facebook-prophet/trends.png)

*Image Source: [Medium](https://miro.medium.com/max/1400/1*lmK4zwDN3AwyD8190xIdng.png)*

#### Seasonality 
It is the periodic changes in time series that occur within a given time. Seasonality can be daily, weekly, or yearly. For example, during winter, more winter clothes are sold. It keeps on repeating during this time.

The image below shows a seasonality pattern.

![Seasonality pattern](/engineering-education/univariate-time-series-using-facebook-prophet/seasonality-pattern.png)

*Image Source: [Machine Learning Mastery](https://machinelearningmastery.com/wp-content/uploads/2016/12/Minimum-Monthly-Temperature-Dataset.png)*

#### Holiday effect
It is the recurring days and events in a time series dataset. It includes the occurrence of popular holidays such as Christmas and Valentine's day.

For example,  during Valentine's day, more chocolates and flowers are sold. It keeps recurring every year.

### Benefits of using Facebook Prophet
The following are the benefits of using Facebook Prophet in time series modeling.

- It is automatic and fast
It saves time for manual time series analysis and decomposition.

- It produces accurate models.
Facebook Prophet produces reliable and accurate models.

- It can handle missing values and outliers
Facebook Prophet imputes the missing values to ensure we have a complete dataset. It also removes data points that deviate from the general dataset observations.

- It can handle seasonality and holiday effects.
Facebook Prophet can handle the spikes in the dataset and include them in model training.

- It produces a tunable model
Facebook Prophet produces models that we fine-tune to improve accuracy when forecasting.

### Installing Facebook Prophet
To install Facebook Prophet, use this command:

```bash
! pip install fbprophet
```
### Airline passengers dataset
We will use the airline passengers dataset to train the model. The dataset shows the airline passengers recorded monthly from `1949-01-01` to `1960-12-01`. It has only a one-time dependant variable. To download the dataset, use this [link](https://drive.google.com/file/d/10OJHq3jT6YcRCj3gYfEOCUj2fz6Fjq8Q/view?usp=sharing)

We will read the dataset using Pandas.

```python
import pandas as pd
```
We read the dataset, using this code:

```python
df=pd.read_csv('/content/airline_passengers.csv')
```

To see the first five rows of our dataset, use this code:

```python
df.head()
```
It produces the following output:

![First five rows](/engineering-education/univariate-time-series-using-facebook-prophet/first-five-rows.jpg)

From the image above the dataset has two columns, `Month` and `Thousands of Passengers`. The model will use the `Thousands of Passengers` column as the input variable. `Thousands of Passengers` is the one variable in the dataset that changes over time.

To see the last five rows of our dataset, use this code:

```python
df.head()
```
The output:

![Last five rows](/engineering-education/univariate-time-series-using-facebook-prophet/last-five-rows.jpg)

From the image above, the last column has null values. Let's drop this column to remove the missing values from the dataset.

```python
df.drop(144,axis=0,inplace=True)
```
### Plotting the line graph
We will plot the line graph that represents the dataset using Matplotlib. Let's import Matplotlib.

```python
import matplotlib.pyplot as plt
%matplotlib inline
```
To plot the graph, use this code:

```python
df.plot()
```
The line graph:

![Line graph](/engineering-education/univariate-time-series-using-facebook-prophet/line-graph.jpg)

From the image above our dataset is on an uptrend. The number of airline passengers has been increasing over time.

### Changing the column names
Facebook Prophets expects an input DataFrame with two columns named `ds` and `y`. `ds` column contains the dates of the time series and `y` has the times series values (data points).

```python
df.columns = ['ds','y']
```
To see the dataset with the changed column names, use this code:

```python
df.head()
```
The output:

![Changed column names](/engineering-education/univariate-time-series-using-facebook-prophet/changed-column-names.jpg)

### Plotting an interactive line chart
We will use the Plotly Express library to plot a more interactive line chart.

```python
import plotly.express as px
```
To plot the line chart, use this code:

```python
fig = px.line(df, x='ds', y='y', title='Airline Passengers')

fig.update_xaxes(
    rangeslider_visible=True,
    rangeselector=dict(
        buttons=list([
            dict(step="all")
        ])
    )
)
fig.show()
```
From the code above, the x-axis is `ds` and the y-axis is the `y`. The title of the line chart is `Airline Passengers`. ` rangeslider_visible` will enable us to zoom the line chart. `rangeselector` select some of the data points on the line chart.

The line chart is shown below:

![Interactive line chart](/engineering-education/univariate-time-series-using-facebook-prophet/interactive-line-chart.jpg)

### Converting the `ds` column
We need to convert the `ds` column to the DateTime format. It will enable us to perform time-series operations on this column. We will use the Python Datetime module.

```python
from datetime import datetime
```
Use this code to convert the `ds` column:

```python
df['ds'] = pd.to_datetime(df['ds'])
```
Let's view the first five rows of the converted dataset.

```python
df.head()
```
The output:

![First five rows](/engineering-education/univariate-time-series-using-facebook-prophet/first-rows.jpg)

To see the last five rows of our dataset, use this code:

```python
df.head()
```
The output:

![Last five rows](/engineering-education/univariate-time-series-using-facebook-prophet/last-rows.jpg)

### Building the model using Facebook Prophet
Let's import Facebook Prophet.

```python
from fbprophet import Prophet
```
#### Initializing the model
Use the code below:

```python
model=Prophet()
```
The `Prophet` class has initialized the model.

#### Calling the fit method
We call the `fit` method and pass the DataFrame as an input. The `fit` enables the model to find meaningful patterns in the data. This will aid the model in the forecasting of future values.

```python
model.fit(df)
```
### Making future predictions
The process above has trained the model and is ready to make predictions. We use the model to forecast the airline passengers for the next 1000 days (1961-01-01 to 1963-08-28).

We need to provide the model with a new future DataFrame. It contains the number of days the model forecasts/predicts.

We use this code:

```python
future_dates=model.make_future_dataframe(periods=1000, freq='M')
```
To check the last five rows of the future DataFrame, use this code:

```python
future_dates.tail()
```
The output is below:

![Prediction values](/engineering-education/univariate-time-series-using-facebook-prophet/prediction-values.jpg)

### Calling the predict method
We call the `predict` method and pass the future DataFrame as an input. It performs the actual predictions.

```python
prediction=model.predict(future_dates)
```
To see the last five rows of the predicted values, use this code:

#### Last five rows of the prediction DataFrame
```python
prediction[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail()
```
The prediction DataFrame has the following columns:
- `ds`: It contains the Datetime of the predicted values. It holds the Datetime of the 1000 days.
- `yhat`: It contains the prediction values of the time series model.
- `yhat_lower`: It contains the bottom bound of the prediction values.
- `yhat_upper`: It contains the top bound of the prediction values.

The prediction values:

![Predicted values](/engineering-education/univariate-time-series-using-facebook-prophet/predicted-values-tail.jpg)

#### First five rows of the prediction DataFrame
Use this code:

```python
prediction.head()
```
The output:

![Predicted values](/engineering-education/univariate-time-series-using-facebook-prophet/predicted-values-head.jpg)

Let's plot a line graph that shows the actual values (y) and the predicted values (yhat).

### `y` vs `yhat` line graph
To plot the `y` vs `yhat` line graph, use this code:

```python
pd.concat([df.set_index('ds')['y'],prediction.set_index('ds')['yhat']],axis=1).plot()
```
The code produces the following line graph:

![y vs yhat line graph](/engineering-education/univariate-time-series-using-facebook-prophet/y-vs-yhat.jpg)

The blue line shows the actual values (y). The orange line shows the predicted values(yhat). The graph also shows the forecast values for the next 1000 days from `1961-01-01 to 1963-08-28`.

We can also plot a diagram to show the `y`, `yhat`, `yhat_lower`, and the `yhat_upper` values.

### Plot diagram
Use this code:

```python
model.plot(prediction)
```
The output is shown below:

![Plot diagram](/engineering-education/univariate-time-series-using-facebook-prophet/plot-diagram.jpg)

The shaded light blue region shows the uncertainty intervals. This region contains the `yhat_upper` and `yhat_lower` values. 

The black dots show the actual data points(y). The blue line shows the predicted values(yhat). The graph also shows the forecast values for the next 1000 days from `1961-01-01 to 1963-08-28`.

We can also use Facebook Prophet to plot the components of our time-series forecasts.

### Components of our time series forecasts
To plot the components, use this code:

```python
model.plot_components(prediction)
```
The output:

![Plot components](/engineering-education/univariate-time-series-using-facebook-prophet/plot-components.jpg)

The output above shows the trend and yearly seasonality components. The trend image shows an uptrend. It shows a linear increase in passengers from 1949 to 1964. The yearly seasonality components show July and August as the busiest months with the highest passengers.

### Conclusion
In this tutorial, we have learned how to build a univariate time series model using Facebook Prophet. We discussed the different types of time-series datasets. We used examples to describe univariate, bivariate, and multivariate datasets. We explored Facebook Prophet and how it decomposes time-series datasets.

We were able to build a time series model which forecasts airline passengers. We used Matplotlib to plot the actual and predicted values. Finally, we used Facebook Prophet to plot the components of our time series forecasts

To access the full Python code in Google Colab notebook, click [here.](https://colab.research.google.com/drive/1kq1DGr6_RbtJ9j0Xjk5rDYxs0rletGLJ?usp=sharing)

### References
- [Time Series Decomposition in Python](/engineering-education/time-series-decomposition-in-python/)
- [Introduction to Time Series](/engineering-education/introduction-to-time-series/)
- [Facebook Prophet Github](https://facebook.github.io/prophet/)
- [Univariate vs Bivariate vs Multivariate datasets](https://www.geeksforgeeks.org/univariate-bivariate-and-multivariate-data-and-its-analysis/)
- [Introduction to Time Series  with Facebook Prophet](https://www.kaggle.com/prashant111/tutorial-time-series-forecasting-with-prophetmodelling