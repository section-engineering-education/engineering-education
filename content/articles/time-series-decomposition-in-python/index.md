### Time Series Decomposition in Python
Time series refers to the data that is sequentially collected over time. Any observed time series value at any particular point in time, it's usually contributed by various components. Thus a time series can be decomposed such that each component exists independently. Usually, it's challenging to work with a model whose most of the cause of variation is unknown. In time series, some of the causes of variation to the model are deterministic. Analyzing a model with many causes of variation is computationally expensive. Therefore, we decompose those components whose variation is deterministic.  The indeterministic ones, residuals, are then used in the analysis of autocorrelation

### Prerequsite:
For the learner to gain the maximum benefit from this course, they are required to have basic Python programming knowledge.

### Components of the time series
At any given time, a time series is usually composed of the following components:
1. Trend
2. Seasonality
3. Residual 

Let's understand what these components are:
1. Trend: The trend is the long-term direction of the time series. This component is normally either increasing, decreasing, or constant. The figure below illustrates a growing trend for a time series.

![trend](/engineering-education/time-series-decomposition-in-python/trend.png)

1. Seasonality: This is the periodic behavior of the time series that occurs within a year. The plot below is an example of the seasonality component of the time series.

![seasonality](/engineering-education/time-series-decomposition-in-python/seasonality.png)

1. Residual: This is what remains of the time series after the trend and seasonality are removed.

![residual](/engineering-education/time-series-decomposition-in-python/residual.png)

As we said, the time series value is usually a combination of the above components at any point in time. These values can be due to summing up all components or multiplying them together, or both operations interacting together.

Therefore, we use the following three models when decomposing a time series.
1. Additive time series model
1. Multiplicative time series model
1. Pseudo-Additive Model

Now, it's usually the case that before we decompose the time series, we first discover the model to use. To discover this knowledge, we normally plot the time series and then see if the plot satisfies the following assumption for choosing an appropriate model to use.

1. If the seasonality and residuals are independent of the trend in the plotted time series, we use an Additive model to decompose the data. The plot below shows the case where an additive time series model was used to decompose the data. As we can see, the seasonality component does not change with the change in trend.

![additive model](/engineering-education/time-series-decomposition-in-python/additive-time-series.png)

The additive time series model we are talking about is of the form:
$O_t = T_t+S_t+R+t$

Where:
$O_t$ is the observed value
$T_t$ is the trend value
$S_t$ is the seasonality value
$R_t$ is residual value
$_t$ is a variable for a particular time indexing.

1. If the plotted series shows the seasonality and residuals to change with the change in trend, we use a multiplicative model to decompose our series. A good example of using a multiplicative time series model is as shown in the figure below.

![multplicative model](/engineering-education/time-series-decomposition-in-python/multiplicative-time-series.png)

From the time series plot above, we note that the seasonality increases with the trend increase.
A multiplicative time series model is of the form:

$O_t = T_t*S_t*R_t$
Where, $O_t$, $T_t$, $S_t$, and $R_t$ are as we previously explained.

There're cases where we can't either use an additive time series model or a multiplicative one to decompose our data. In such situations, we use a special model known as the Pseudo additive model.
This model is of the form:

$O_t = T_t+T_t(S_t-1)+T_t(R+t-1)$

In this tutorial, however, we will not consider this model.

Since we know various models we can use and decompose our time series model, let's now look at how we decompose time series in python.

To make this session exciting, we shall stimulate data for each time series component and later aggregate them all using both an additive and the multiplicative model separately to obtain two-time series data for each kind of model. After this, we shall then decompose these models back to those initial components we created. By so doing, we will have saved ourselves time spent on real-world data preprocessing.

Now, let's get started.

### Python time series decomposition
As usual, let's first import the needed libraries for this session.

```python
# get libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose as sm

```
**Simulating time series components:**
To begin, let's set the range of our time series.

```python
# stting the range of time series
T_Series = np.arange(1, 51)

```
Let's create the trend component of our time series.

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
![trend component](/engineering-education/time-series-decomposition-in-python/trend.png)

Now that we have the trend component let's simulate our seasonality component as well. To do this, we shall adopt the sin function as it is the function that can yield those seasonal fluctuations of time series in the best way.

```python
# creating the seasonality component
seasonality = 10 + np.sin(T_Series) * 10

```
Output:

![seasonality component](/engineering-education/time-series-decomposition-in-python/seasonality.png)

The remaining component to create is the residual component. Let's simulate it using the numpy random function.

```python
np.random.seed(10)  # for result reproducibility
residual = np.random.normal(loc=0.0, scale=1, size=len(T_Series))
```
We the plot this residual component as follows.
```python
plt.plot(T_Series, residual, 'r-.')
plt.title("Residuals against Time")
plt.xlabel("Minutes")
plt.ylabel("Product demand");

```
Output:
![residual component](/engineering-education/time-series-decomposition-in-python/residual.png)

We have all the time series components now, and therefore, we can create the time series value at any particular point in time.

The first thing we shall do with these components is to create an additive model of our time series. So let's run the code below and get this done.

```python
# additive tine series model
additive_Tmodel = Trend + seasonality + residual

```
Now our additive time series model is created, and we  can go a step ahead and plot it for visualization as follows:

```python
plt.plot(T_Series, additive_Tmodel, 'k.')
plt.title("Additive Time Series")
plt.xlabel("Minutes")
plt.ylabel("product demand");

```
Output:
![additive time series](/engineering-education/time-series-decomposition-in-python/additive-time-series.png)

It is straightforward to note that the seasonality component of the additive time series model above does not change with the change in trend. This is an essential feature for a time series to be considered an Additive time series.

Similarly, let's create a multiplicative time series.  To make the pattern more apparent, in this case, we will ignore the residuals in the model. We then create our model as follows:

```python
# we ignore residual to make the pattern more apparent
ignored_residual = np.ones_like(residual)
# we multiply other components so as to create a multiplicative time series
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
![multiplicative time series](/engineering-education/time-series-decomposition-in-python/multiplicative-time-series.png)

From the output, we notice that the seasonality component of this time series changes with the change in the trend. We look for this characteristic to declare a time series model as a multiplicative time series model. Also, we should remember we ignored the residual component in this case. So we need to understand that the residual component also changes with the change in the trend for a multiplicative time series.

To this point, we have created our two types of time series. The task in our hands is to decompose these models independently back to their initial components.

### Time series decomposition
In this section, we shall get started by decomposing the Additive time series model we just created.

### Additive time series decomposition
Let's get the required library in place.

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
![additive time series decomposition](/engineering-education/time-series-decomposition-in-python/additive-time-series-decomposition.png)

The first plot represents our original time series. The second plot represents the trend of our time series model extracted from the original time series. Finally, the third and fourth plots represent seasonality and residual components in the same time series.

### Dicomposing Multiplicative Time Series Model

We shall follow similar steps as the ones we used to decompose the Additive time series except that we specify the model as the multiplicative time series.

So the the following code carry out this activity.
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

![multiplicative time series decomposition](/engineering-education/time-series-decomposition-in-python/multiplicative-time-series-decomposition.png)

Now, this was a demo, and as we know, we're not Data scientists only to deal with the problem we create on our own. Instead, we train ourselves to handle real-world challenges using hidden knowledge in the data. So, to learn the correlation in real-world data, we shall be required to decompose the data first to eliminate the deterministic causes of variation in the data. So, to train ourselves on decomposing these data, let's first learn where to obtain time series data for practice quickly.

To fetch time series, one can visit Kaggle, Google trend, etc. However, here we won't make our way to those sites. Instead, we shall use a famous python library that provides us with the stock market performance datasets for the big companies such as Amazon, Tesla, FB, Ali Babel, etc.

This python library is called `yfinance`. To access data in this library, we need to make sure it's installed in python.

In the Google colab, we install this library using the code `!pip install yfinance`, i.e.,

```python
!pip install yfinance
```
Now that we have installed this package, it doesn't mean we will access data from it directly. To use the data it contains, we need to load it t. So we load it as follows:

```python
# import the library
import yfinance as yf 
```
We can now access any time series data loaded in the `yfinance` library. So, for instance, we can access data for the Facebook stock as shown in the code below.

For instance we can obtain Facebook stock data as follows:
```python
data =  yf.download(tickers="FB", start="2016-1-1",end="2020-12-31",progress=False)
data.head()
```
This code should return an output similar to the one below.

![facebook stock data](/engineering-education/time-series-decomposition-in-python/fb-stock-data.png)

Above is multivariate time series for the Facebook stocks data. You can change the `tickers` value and download datasets of other companies such as the Amazone, "AMZN", Tesla company as "TSLA", etc.

Since the Facebook data we have above is a multivariant time series, which we will not discuss in this session, let's extract a univariant one by indexing a column, `High`, and plot it.

```python
data['High'].plot()
```
This code returns an output similar to the one provided below:

![plot](/engineering-education/time-series-decomposition-in-python/high-ts.png)

Upon plotting the `High` time series, we note that the series has an increasing trend. Also, the time series has no seasonal component; instead, it has a Cyclic component. That is why we accessed data within a year-plus period of more than one year. Therefore, we will decompose this data using the same procedure we used before, but the frequency, in this case, will be more than 12 months. Let's see this in the code below.

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

As we can see, setting the time series frequency as 36, the trend was well captured. Also, if we look at the residuals plot, we can see there is no well-defined pattern. Therefore we can say our time series was well decomposed into its components.

### Conclussion
To this fur, we have reached the end of our study. In this tutorial, we learned what's time series and its components. We discussed three types of models used in the time series decompose, and also we described under which situation a particular model is appropriate to use.

 Using a simple approach, we simulated a time series data and later decomposed it back to the initial components we'd created.

Later, if this was not enough, we learned of a library from which we fetch time series data. We fetched data for the Facebook stocks and decomposed one of its time series from that library.

This end finalizes our session, and I hope you enjoyed this content. Happy learning.
