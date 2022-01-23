---
layout: engineering-education
status: publish
published: true
url: /time-series-decomposition-in-python/
title: Getting started with Time Series Decomposition in Python
description: This article will discuss the decomposition of the time series data and the type of models we use when decomposing this data(Additive, Multiplicative, and Pseudo-additive Models).
author: sumba-elvis
date: 2022-01-12T00:00:00-01:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/time-series-decomposition-in-python/hero.png
    alt: Time Series Decomposition in Python Hero Image
---
Time series refers to the data that is sequentially collected over time. Various components usually contribute to any observed time series value at any particular point in time.
<!--more-->
Thus a time series can be decomposed such that each component exists independently. Usually, it is challenging to work with a model whose most of the cause of variation is unknown. In time series, some of the causes of variation to the model are deterministic.

Analyzing a model with many causes of variation is computationally expensive. Therefore, we decompose those components whose variation is deterministic. The indeterministic ones, residuals, are then used to analyze autocorrelation.


### Table of contents
- [Time Series Decomposition in Python](#time-series-decomposition-in-python)
- [Prerequisites](#prerequisites)
- [Components of the time series](#components-of-the-time-series)
- [Python time series decomposition](#python-time-series-decomposition)
  - [Step 1: Simulating time series components:](#step-1-simulating-time-series-components)
  - [Step 2: Time series decomposition](#step-2-time-series-decomposition)
- [Conclusion](#conclusion)

### Prerequisites
To gain the maximum benefit from this material, the learner must have the following:
- Basic knowledge of Python programming language. 
- Familiarity with the [Google Colab](https://colab.research.google.com/?utm_source=scs-index) or [Jupyter Notebook](https://jupyter.org/).

### Components of the time series
At any given time, a time series is usually composed of the following components:
1. Trend
2. Seasonality
3. Residual 

Let us understand what these components are:

1. Trend - This is the long-term direction of the time series. This component usually is increasing, decreasing, or constant. The figure below illustrates a growing trend for a time series.

![Trend](/engineering-education/time-series-decomposition-in-python/trend.png)

2. Seasonality - This is the periodic behavior of the time series that occurs within a year. The plot below is an example of the seasonality component of the time series.

![Seasonality](/engineering-education/time-series-decomposition-in-python/seasonality.png)

3. Residual - This is what remains of the time series after the trend and seasonality are removed.

![Residual](/engineering-education/time-series-decomposition-in-python/residual.png)

As we said, the time series value is usually a combination of the above components at any point in time. These values can be summed up all components, multiplying them together, or interacting with both operations.

Therefore, we use the following three models when decomposing a time series:
1. Additive time series model.
2. Multiplicative time series model.
3. Pseudo-Additive model.

Now, it is usually the case that before we decompose the time series, we first discover the model to use. To discover this, we usually plot the time series and then see if the plot satisfies the following assumption for choosing an appropriate model to use.

If the seasonality and residuals are independent of the trend in the plotted time series, we use an additive model to decompose the data. The plot below shows the case where an additive time series model was used to decompose the data. As you can see, the seasonality component does not change with the change in trend.

![Additive model](/engineering-education/time-series-decomposition-in-python/additive-time-series.png)

The additive time series model we are talking about is of the form:
`$O_t = T_t+S_t+R+t$`

Where:
- `$O_t$` is the observed value.
- `$T_t$` is the trend value.
- `$S_t$` is the seasonality value.
- `$R_t$` is residual value.
- `$_t$` is a variable for a particular time indexing.

If the plotted series shows the seasonality and residuals to change with the change in trend, we use a multiplicative model to decompose our series. An excellent example of using a multiplicative time series model is shown in the figure below.

![Multplicative model](/engineering-education/time-series-decomposition-in-python/multiplicative-time-series.png)

From the time series plot above, we note that the seasonality increases with the trend increase. A multiplicative time series model is of the form:

`$O_t = T_t*S_t*R_t$`

Where, `$O_t$`, `$T_t$`, `$S_t$`, and `$R_t$` are as we previously explained.

There are cases where we cannot either use an additive time series model or a multiplicative one to decompose our data. We use a special model known as the Pseudo additive model in such situations. This model is of the form:

`$O_t = T_t+T_t(S_t-1)+T_t(R+t-1)$`

In this tutorial, however, we will not consider this model.

Since we know various models we can use and decompose our time series model, let us now look at how we decompose time series in python.

To make this session exciting, we shall stimulate data for each time series component and later aggregate them all using both an additive and the multiplicative model separately to obtain two-time series data for each kind of model. 

After this, we shall then decompose these models back to those initial components we created. By so doing, we will have saved ourselves time spent on real-world data preprocessing.

Now, let us get started.

### Python time series decomposition
As usual, let us first import the needed libraries for this session.

```python
# get libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose as sm
```

### Step one: Simulating time series components
To begin, let us set the range of our time series.

```python
# stting the range of time series
T_Series = np.arange(1, 51)
```
Let us create the trend component of our time series.

```python
Trend = T_Series * 2.75
```

We can plot this trend using the code below. If we do so, we should obtain an output similar to the one provided below.

```python
plt.plot(T_Series, Trend, 'c.')
plt.title("Trend against Time")
plt.xlabel("Minutes")
plt.ylabel("product demand");

```
Output:

![Trend component](/engineering-education/time-series-decomposition-in-python/trend.png)

Now that we have the trend component let us simulate our seasonality component. To do this, we shall adopt the sin function as it is the function that can yield those seasonal fluctuations of time series in the best way.

```python
# creating the seasonality component
seasonality = 10 + np.sin(T_Series) * 10
```
Output:

![Seasonality component](/engineering-education/time-series-decomposition-in-python/seasonality.png)

The remaining component to create is the residual component. Let's simulate it using the NumPY random function.

```python
np.random.seed(10)  # for result reproducibility
residual = np.random.normal(loc=0.0, scale=1, size=len(T_Series))
```

We then plot this residual component as follows:

```python
plt.plot(T_Series, residual, 'r-.')
plt.title("Residuals against Time")
plt.xlabel("Minutes")
plt.ylabel("Product demand");
```

Output:

![Residual component](/engineering-education/time-series-decomposition-in-python/residual.png)

We have all the time series components now, and therefore, we can create the time series value at any particular point in time.

The first thing we shall do with these components is to create an additive model of our time series. So let us run the code below and get this done.

```python
# additive tine series model
additive_Tmodel = Trend + seasonality + residual
```

Now our additive time series model is created, and we can go a step ahead and plot it for visualization as follows:

```python
plt.plot(T_Series, additive_Tmodel, 'k.')
plt.title("Additive Time Series")
plt.xlabel("Minutes")
plt.ylabel("product demand");
```

Output:

![Additive time series](/engineering-education/time-series-decomposition-in-python/additive-time-series.png)

It is straightforward to note that the seasonality component of the additive time series model above does not change with the change in trend, which is an essential feature for a time series to be considered an additive time series.

Similarly, let us create a multiplicative time series. To make the pattern more apparent, in this case, we will ignore the residuals in the model. We then create our model as follows:

```python
# we ignore residual to make the pattern more apparent
ignored_residual = np.ones_like(residual)
# we multiply other components to create a multiplicative time series
multiplicative_Tmodel = Trend * seasonality * ignored_residual
```

Plot the model:

```python
plt.plot(T_Series, multiplicative_Tmodel, 'k-.')
plt.title("Multiplicative Time Series")
plt.xlabel("Minutes")
plt.ylabel("product demand");
```

This code returns:

![Multiplicative time series](/engineering-education/time-series-decomposition-in-python/multiplicative-time-series.png)

From the output, we notice that the seasonality component of this time series changes with the change in the trend. We look for this characteristic to declare a time series model as a multiplicative time series model. Also, we should remember that we ignored the residual component in this case. So we need to understand that the residual component also changes with the change in the trend for a multiplicative time series.

To this point, we have created our two types of time series. The task in our hands is to decompose these models independently back to their initial components.

### Step two: Time series decomposition
In this section, we shall get started by decomposing the Additive time series model we just created.

- #### Additive time series decomposition
Let us import the required library.

```python
from statsmodels.tsa.seasonal import seasonal_decompose
```

The code below will decompose our model into its initial components.

```python
# frequency is the time a time serie is taking to complete on cycal
ts_dicomposition = seasonal_decompose(x=additive_Tmodel, model='additive', freq=6)
trend_estimate = ts_dicomposition.trend
seasonal_estimate = ts_dicomposition.seasonal
residual_estimate = ts_dicomposition.resid
```

We can plot the decomposed components by running the following code.

```python
# Plotting the time series and it's components together
fig, axes = plt.subplots(4, 1, sharex=True, sharey=False)
fig.set_figheight(10)
fig.set_figwidth(20)
# First plot to the Original time series
axes[0].plot(additive_Tmodel, label='Original') 
axes[0].legend(loc='upper left');
# second plot to be for trend
axes[1].plot(trend_estimate, label='Trend')
axes[1].legend(loc='upper left');
# third plot to be Seasonality component
axes[2].plot(seasonal_estimate, label='Seasonality')
axes[2].legend(loc='upper left');
# last last plot to be Residual component
axes[3].plot(residual_estimate, label='Residuals')
axes[3].legend(loc='upper left');
```

Output:

![Additive time series decomposition](/engineering-education/time-series-decomposition-in-python/additive-time-series-decomposition.png)

The first plot represents our original time series. The second plot represents the trend of our time series model extracted from the original time series. Finally, the third and fourth plots represent seasonality and residual components in the same time series.

- #### Decomposing multiplicative time series model
We shall follow similar steps as the ones we used to decompose the Additive time series except that we specify the model as the multiplicative time series.

So the following code carries out this activity.

```python
ts_decomposition = seasonal_decompose(x=multiplicative_Tmodel, model='multiplicative', freq=6)
trend_estimate = ts_decomposition.trend
seasonal_estimate = ts_decomposition.seasonal
residual_estimate = ts_decomposition.resid
```

We then plot the decomposed components by running the following code block.

```python
fig, axes = plt.subplots(4, 1, sharex=True, sharey=False)
fig.set_figheight(10)
fig.set_figwidth(15)

axes[0].plot(multiplicative_Tmodel, label='Original')
axes[0].legend(loc='upper left');

axes[1].plot(trend_estimate, label='Trend')
axes[1].legend(loc='upper left');

axes[2].plot(seasonal_estimate, label='Seasonality')
axes[2].legend(loc='upper left');

axes[3].plot(residual_estimate, label='Residuals')
axes[3].legend(loc='upper left');
```

This code yield:

![Multiplicative time series decomposition](/engineering-education/time-series-decomposition-in-python/multiplicative-time-series-decomposition.png)

Now, this was a demo, and as we know, we are not data scientists only to deal with the problem we create on our own. Instead, we train ourselves to handle real-world challenges using hidden knowledge in the data. 

So, to learn the correlation in real-world data, we shall be required to decompose the data first to eliminate the deterministic causes of variation in the data. So, to train ourselves on decomposing these data, let us first learn where to quickly obtain time-series data for practice.

To fetch time series, one can visit Kaggle, Google trend, and many more. However, here we will not make our way to those sites. Instead, we shall use a famous python library that provides us with the stock market performance datasets for the big companies such as Amazon, Tesla, FB, Ali Babel, and others.

This python library is called `yfinance`. To access data in this library, we need to make sure it is installed in python.

In the [Google colab](https://colab.research.google.com/?utm_source=scs-index), we install this library using the code below:

```python
!pip install yfinance
```

Now that we have installed this package, it does not mean we will access data from it directly. To use the data it contains, we need to load it. So we load it as follows:

```python
# import the library
import yfinance as yf 
```

We can now access any time series data loaded in the `yfinance` library. So, for instance, we can access data for the Facebook stock as shown in the code below.

For instance, we can obtain Facebook stock data as follows:

```python
data =  yf.download(tickers="FB", start="2016-1-1",end="2020-12-31",progress=False)
data.head()
```

This code should return an output similar to the one below.

![Facebook stock data](/engineering-education/time-series-decomposition-in-python/fb-stock-data.png)

Above is multivariate time series for the Facebook stocks data. You can change the tickers' value and download datasets of other companies such as Amazon "AMZN," Tesla "TSLA," etc.

Since the Facebook data we have above is a multi-variant time series, which we will not discuss in this session, let us extract a univariant one by indexing a column, `High`, and plot it.

```python
data['High'].plot()
```

This code returns an output similar to the one provided below:

![plot](/engineering-education/time-series-decomposition-in-python/high-ts.png)

We note that the series has an increasing trend upon plotting the `High` time series. Also, the time series has no seasonal component, instead, it has a Cyclic component. That is why we accessed data within a year-plus period of more than one year. 

Therefore, we will decompose this data using the same procedure we used before, but the frequency, in this case, will be more than 12 months. Let us see this in the code below:

```python
ts_decompose_add = seasonal_decompose(x=data['High'], 
                                          model='additive', 
                                          freq=36) # the frequency of fluctuation is more than one year thus cyclic component
estimated_trend_add = ts_decompose_add.trend
estimated_seasonal_add = ts_decompose_add.seasonal
estimated_residual_add = ts_decompose_add.resid
```

Now we can run the following block code and get those components printed.

```python
fig, axes = plt.subplots(4, 1, sharex=True, sharey=False)
fig.set_figheight(10)
fig.set_figwidth(15)

axes[0].plot(data['High'], label='Original')
axes[0].legend(loc='upper left');

axes[1].plot(estimated_trend_add, label='Trend')
axes[1].legend(loc='upper left');

axes[2].plot(estimated_seasonal_add, label='Cyclic')
axes[2].legend(loc='upper left');

axes[3].plot(estimated_residual_add, label='Residuals')
axes[3].legend(loc='upper left');
```
Output:

![Time Series Components](/engineering-education/time-series-decomposition-in-python/time-series-components.png)

As we can see, setting the time series frequency as 36, the trend was well captured. Also, if we look at the residuals plot, we can see no well-defined pattern. Therefore we can say our time series was well decomposed into its components.

### Conclusion
We have reached the end of our study. We learned what time series and its components are. We discussed three types of models used in the time series decompose, and also we described under which situation a particular model is appropriate to use.

Using a simple approach, we simulated a time series data and later decomposed it back to the initial components we had created.

We learned of a library from which we fetch time series data. We fetched data for the Facebook stocks and decomposed one of its time series from that library. This end finalizes our session, and I hope you enjoyed it. 

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)