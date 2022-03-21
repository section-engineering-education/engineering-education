Time-series data is a collection of metric values that are in continuous intervals over time. A time series shows all the variables in the dataset that change with time. The metric values are recorded in intervals such as hourly, daily, weekly, minutes, monthly, and yearly.

Examples of time-series data are the annual budget, company sales, weather records, air traffic, covid-19 caseloads, forex exchange rates, and stock prices. The time-series data are recorded in minutes, hours, days, weeks, or years.

For example in forex exchange, we can record the daily closing exchange rates of the Euro and US Dollar(EUR/USD) for a week. A time series model can then analyze these closing exchange rates to identify patterns. Eventually, the model predicts future EUR/USD exchange rates based on previously historical/observed closing prices.

Time series analysis and modeling involve training models to gain an understanding of the time series data. Forecasting involves finding the future values that the time series will take.

A time series can be univariate, bivariate, or multivariate. Univariate consists of only one variable, bivariate we have two variables, and multivariate we have more than two variables. In this tutorial, we will be focusing on multivariate time series forecasting using [Auto ARIMA](https://alkaline-ml.com/pmdarima/modules/generated/pmdarima.arima.auto_arima.html). 

### Table of contents
- [Prerequisites](#prerequisites)
- [Getting started with Auto ARIMA](#getting-started-with-auto-arima)
- [What is an ARIMA model?](#what-is-an-arima-model)
- [What is a stationary time series?](#what-is-a-stationary-time-series)
- [What is differencing?](#what-is-differencing)
- [Components of ARIMA model](#components-of-arima-model)
- [Why do we use Auto ARIMA?](#why-do-we-use-auto-arima)
- [Energy consumption dataset](#energy-consumption-dataset)
- [Plotting the 'demand' column](#plotting-the-demand-column)
- [Plotting subplots](#plotting-subplots)
- [Checking for missing values](#checking-for-missing-values)
- [Imputing missing values](#imputing-missing-values)
- [Dataset resampling](#dataset-resampling)
- [Implementing the Auto ARIMA model](#implementing-the-auto-arima-model)
- [Initialize 'auto_arima()' function](#initialize-autoarima-function)
- [Splitting the time series dataset](#splitting-the-time-series-dataset)
- [Fitting the Auto ARIMA model](#fitting-the-auto-arima-model)
- [Using the Auto ARIMa model to make predictions](#using-the-auto-arima-model-to-make-predictions)
- [Making prediction on the test data frame](#making-prediction-on-the-test-data-frame)
- [Making prediction on the unseen future values](#making-prediction-on-the-unseen-future-values)
- [Plotting the future predicted values](#plotting-the-future-predicted-values)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should:

- Understand [time series analysis and modelling](/engineering-education/univariate-time-series-using-facebook-prophet)
- Have an introduction to [time series terms and concepts](/engineering-education/introduction-to-time-series/)
- Understand [time series components](/engineering-education/time-series-decomposition-in-python/)
- Be able to build a simple [time series model](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/)
- Ensure you run the Python code in [Google Colab](https://research.google.com/colaboratory/)

### Getting started with Auto ARIMA
[Auto ARIMA](https://alkaline-ml.com/pmdarima/modules/generated/pmdarima.arima.auto_arima.html) is a time series library that automates the process of building a model using ARIMA. Auto ARIMA automatically finds the best parameters of an ARIMA model. Let's discuss the ARIMA model briefly which will be essential in following this tutorial easily and understanding how Auto ARIMA works. We will also discuss concepts related to the ARIMA model.

### What is an ARIMA model?
Auto-Regressive Integrated Moving Average(ARIMA) is a time series model that uses the information in the past metric values to predict the future values. 

The past values indicate the forecasts of the future values. It assumes that the previous values have unique attributes and properties that can predict future values. For example, an ARIMA model can be used to predict future forex exchange rates based on observing and analyzing previous forex exchange rates. The model analyzes the different variables found in the times series dataset. 

ARIMA only works when the time series data is stationary. When the dataset is non-stationary, we always have to make it stationary before applying the ARIMA model.

### What is a stationary time series?
A stationary time series is a series whose attributes and properties do not change over time. Common properties and attributes of time series are variance, mean, and covariance. Stationary data does not have trend and seasonal components.

A non-stationary time series has trends, repetitive cycles, and seasonality. The trends and seasonality make the time series attributes and properties change with time.

Most time-series data is non-stationary, especially forex exchange prices and stock prices. This is due to the trends and the repetitive cycles.

To apply an ARIMA model, we have to make the data stationary. Making the data stationary will remove the trends and seasonality. It will be easier for ARIMA to make a prediction using stationary data. We change non-stationary data to stationary using the differencing technique. 

### What is differencing?
It changes a non-stationary time series data to stationary. It is an essential process when preparing times series data for the ARIMA model. 

It makes a variance, the covariance, and the mean values data constant over time. It also removes repetitive cycles in the time series data.

It finds the difference between the current time series values and the previous values. We may find the difference between the time series values once but still not produce a stationary dataset. In this case, we need to find the difference various times until the dataset becomes stationary. An ARIMA model has the following components.

### Components of ARIMA model
ARIMA model is made up of three components: 

1. Auto Regression
2. Integrated 
3. Moving average. 

#### Auto Regression
It uses the changing time series values to make future predictions. It uses the dependency between current time series values and previous values. 

#### Integrated
This component performs differencing to make the time series stationary. It subtracts a current time series value from the previous value.

#### Moving Average
It uses errors of previous time series values to make future predictions. It uses the dependency between an actual observation and errors from previous observations.

When creating an ARIMA model, we pass each component as a parameter using the following standard notations: `p` `d` and `q`. These notations are the essential parameters that build an ideal ARIMA model. ARIMA models are usually initialized as ARIMA(p,d,q).

The functions of these parameters:

- p: It represents the order of the Auto Regression (AR) component. It represents the number of lag observations found in the ARIMA model. A lag is the time gap between two data points/observations in the time series.

- d: It is the total differencing steps performed to make the time series stationary. When we have time-series data that is already stationary, there is no need to conduct differencing. Therefore, d will be 0 (d=0).

- q: It represents the order of the Moving Average (MA) component. It shows the forecast errors that the final ARIMA Model should have.

### Why do we use Auto ARIMA?
In an ARIMA model, we need to pass the p,d, and q values. We use statistical plots and techniques to find the optimal values of these parameters. We use statistical plots such as [Partial Autocorrelation Function plots](https://people.duke.edu/~rnau/411arim3.htm) and [AutoCorrelation Function plot](https://people.duke.edu/~rnau/411arim3.htm). 

The process of using statistical plots is usually hectic and time-consuming. Many people have difficulties in interpreting these plots to find the optimal parameter values. Wrong interpretation leads to wrong p,d, and q values and it affects the ARIMA model performance. 

Auto ARIMA automatically generates the optimal parameter values (p,d, and q). The generated values are the best and will help the model to give accurate forecast results. So basically Auto ARIMA will simplify the process of building a time series model using the ARIMA model.

Now that you know how an ARIMA and Auto ARIMA model works, let's now start working with the time series dataset.

### Energy consumption dataset
We will use the energy consumption dataset to build the Auto ARIMA model. The dataset shows the energy demand from 2012 to 2017 which is recorded in an hourly interval. 

Download the time series dataset using this [link](https://drive.google.com/file/d/1l5MhAnlBYdp5Dk7EvcxzfGJFpvrwbbuw/view?usp=sharing). After downloading the time series dataset, let's load it using Pandas.

```python
import pandas as pd
```
To load the energy consumption dataset, run this code:

```python
df = pd.read_csv('energy_consumption.csv')
```

To visualize the dataset, use this code:

```python
df
```
Energy consumption dataset output:

![Energy consumption dataset](/engineering-education/multivariate-time-series-using-auto-arima/energy-consumption-dataset.png)

From this output, the `timeStamp`, `demand`, `precip` and `temp` columns. The columns are the variables that will build the time series model. The time series is multivariate since it has three-time dependent variables (`demand`, `precip` and `temp`)

The `timestamp` column shows the time the data point was recorded. The `demand` column shows the hourly energy consumption. The `precip` and `temp` columns correlate with the `demand` column. 

#### Converting the `timestamp` column
We need to explicitly convert the `timestamp` column to the DateTime format. It will enable us to perform time-series analysis and operations on this column. 

We will use the `pd.to_datetime` function.

```python
df['timeStamp']=pd.to_datetime(df['timeStamp'])
```
### Plotting the 'demand' column
Since we are forecasting the `demand`, we plot it to visualize the data points. It will enable us to check for trends or seasonality in the time series.

We will use the Plotly Express Python module to plot the line chart. Let's import the Plotly Express Python module.

```python
import plotly.express as px
```
We plot using the following code:

```python
fig = px.line(df, x='timeStamp', y='demand', title='Energy Consumption')

fig.update_xaxes(
        ])
    )
)
fig.show()
```
It plots the following line chart:

![Energy consumption plot](/engineering-education/multivariate-time-series-using-auto-arima/energy-consumption-plot.png)

From the image the dataset has seasonality. Repetitive cycles or spikes occur during the same period in the dataset. Since the dataset has seasonality, we can say it is non-stationary. But still, we need to perform an Augmented Dickey-Fuller (ADF) test to check for stationarity in our dataset. The test will help us to statistically check the dataset.

If we find the dataset is non-stationary after the ADF test, we will have to perform differencing to make it stationary. AutoARIMA will perform this process automatically. 

Let's set the `timeStamp` to be our index column. 

```python
el_df=df.set_index('timeStamp')
```
We set the `timeStamp` to be our index column for better interaction with the data frame. The Auto ARIMA model also expects the `timeStamp` to be the index column.

### Plotting subplots
The subplots will show the time-dependent variables in the dataset. We will visualize the `demand`, `precip` and `temp` columns.

```python
el_df.plot(subplots=True)
```
It produces the following subplots.

![Subplots](/engineering-education/multivariate-time-series-using-auto-arima/sub-plots.png)

### Checking for missing values
We need to check for missing values in the dataset. Missing values affects the model and leads to inaccurate forecast results.

```python
print ("\nMissing values :  ", df.isnull().any())
```
Output:

![Checking missing values](/engineering-education/multivariate-time-series-using-auto-arima/check-missing-values.png)

From the output, all the columns have missing values. We have to have imputed the missing values so that we have a complete-time series dataset.

### Imputing missing values
We will first impute the missing values in the `demand` column. We will use the `fillna` method to impute the missing values in each of the columns.
 
#### Imputing 'demand' column
```python
df['demand']=df['demand'].fillna(method='ffill')
```
#### Imputing 'temp' column
```python
df['temp']=df['temp'].fillna(method='ffill')
```
#### Imputing 'precip' column
```python
df['temp']=df['precip'].fillna(method='ffill')
```
To learn more on how to impute missing values in time series, go through this [article](/engineering-education/missing-values-in-time-series/)

Let's check again for missing values. It will enable us to know if we have imputed the missing values in the time series. 

```python
print ("\nMissing values :  ", df.isnull().any())
```
![Checking missing values](/engineering-education/multivariate-time-series-using-auto-arima/rechecking-missing-values.png)

From the output, we have imputed the missing values in the time series.

### Dataset resampling
The time series has many data points which may be difficult to analyze and visualize each data point. We need to resample the time by compressing and aggregating it to monthly intervals. We will have fewer data points that are easier to work with. 

The `resample` method will aggregate all the data points in the time series and change them to monthly intervals. 

```python
el_df.resample('M').mean()
```
Dataset resampling output:

![Dataset resampling](/engineering-education/multivariate-time-series-using-auto-arima/dataset-resampling.png)

Let's plot new subplots of the resampled dataset.

### Plotting new subplots
We plot the new subplot as follows:
```pyton
el_df.resample('M').mean().plot(subplots=True)
```
![New subplots](/engineering-education/multivariate-time-series-using-auto-arima/new-subplots.png)

From these new subplots, we have resampled the dataset and have plotted fewer data points. It will easier to model these fewer data points. Let's save the resampled dataset in a new variable.

#### Saving the resampled dataset
We save the resampled dataset as follows:

```python
final_df=el_df.resample('M').mean()
```
This is the dataset we will use to train the time series model. We can now start implementing the Auto ARIMA model.

### Implementing the Auto ARIMA model
We implement the Auto ARIMA model using the [`pmdarima`](https://pypi.org/project/pmdarima/) time-series library. This library provides the `auto_arima()` function which automatically generates the optimal parameter values. 

Let's install the `pmdarima` using this command:

```bash
! pip install pmdarima
```
After installing, let's import it.

```python
import pmdarima as pm
```
The next step is to initialize the  `auto_arima()` function.

### Initialize 'auto_arima()' function
We initialize the  `auto_arima()` function as follows:

```python
model = pm.auto_arima(final_df['demand'], 
                        m=12, seasonal=True,
                      start_p=0, start_q=0, max_order=4, test='adf',error_action='ignore',  
                           suppress_warnings=True,
                      stepwise=True, trace=True)
```
In the `auto_arima()` function we pass the `final_df` which is our resampled dataset. We select the `demand` column since this is what the model wants to predict. 

The function can either use the [Grid Search technique](/engineering-education/grid-search/), or [Random Search technique](/engineering-education/random-search-hyperparameters/) to find the optimal parameter values. It tries multiple combinations of p,d,q and then selects the optimal one.

The `auto_arima()` function also has the following important parameters:
 
- `m=12`
It represents the number of months in a year.

- `start_p=0`
It is the start `p` value that can be selected during the random search.

- `start_q=0`
It is the start `q` value that can be selected during the random search.

- `max_order=4`
It the maximum `p`, `d`, and `q` values that can be selected during the random search.

- `test='adf'`
It is an Augmented Dickey-Fuller (ADF) test to check for stationarity in our dataset. 

If the dataset is non-stationary after the ADF test, the `auto_arima()` function will automatically generate the `d` value for differencing. If the dataset will be stationary, then the function sets d=0 (no need for differencing).

- `suppress_warnings=True`
It ignores the warnings during the parameter searching. 

- `stepwise=True`
It will run the Random Search to find the optimal parameters. Grid Search is more exhaustive since it tries all the parameters combinations but it is slow. We opt to use Random Search which is faster.

When you run this code, the function will randomly search the parameters and produce the following output:

![Auto ARIMA output](/engineering-education/multivariate-time-series-using-auto-arima/model-output.png)

From this output, the best model is `ARIMA(1,0,1)`. p=1, d=0 and q=1. The function automatically sets d=0 because the ADF test found the dataset to be stationary.

We had previously observed the time series dataset plots to have seasonality. We, therefore, thought the time series dataset was non-stationary hence a need for differencing. 

But using the ADF test, which is a statistical test, found the seasonality to be insignificant. That is why the function sets d=0 and there is no need for differencing.

After initializing the `auto_arima()` function, the next step is to split the time series dataset. 

### Splitting the time series dataset
We split the time series dataset into a training data frame and a test data frame as follows:

```python
train=final_df[(final_df.index.get_level_values(0) >= '2012-01-31') & (final_df.index.get_level_values(0) <= '2017-04-30')]
```
The code selects the data points from 2012-01-31 to 2017-04-30 for model training. Let's select the data points for model testing.

```python
test=final_df[(final_df.index.get_level_values(0) > '2017-04-30')]
```
The data points from 2017-04-30 are for model testing. To display the test data points, use this code:

```python
test
```
![Test data frame](/engineering-education/multivariate-time-series-using-auto-arima/test-data-frame.png)

From the output, the test data frame has four data points. 

Let's fit the Auto ARIMA model to the train data frame.

### Fitting the Auto ARIMA model
Fitting the Auto ARIMA model to the train data frame will enable the model to learn from the time-series dataset. The final model after training will make future predictions.

```python
model.fit(train['demand'])
```
After training, it produces the following output:

![Auto ARIMA training](/engineering-education/multivariate-time-series-using-auto-arima/model-training.png)

The model is trained using the train data frame. It also uses the p,d, and q values that the `auto_arima()` function generates. Let's use the trained model to make predictions.

### Using the Auto ARIMA model to make predictions
The Auto ARIMA model will predict using the test data frame and the unseen future values. For prediction using the test data frame, we will have the actual energy demand and the predicted energy demand. 

#### Predicting the test data frame
We predict on the test data frame as follows:

```python
forecast=model.predict(n_periods=4, return_conf_int=True)
```
- `n_periods=4`: Is the number of the data points in the test data frame that the model will predict. To see the predicted values use this code:

```python
forecast
```
![Predicted values](/engineering-education/multivariate-time-series-using-auto-arima/predicted-values.png)

We need to convert the predicted values to a Pandas data frame. It will easier to plot the Pandas data frame using Matplotlib.

```python
forecast_df = pd.DataFrame(forecast[0],index = test.index,columns=['Prediction'])
```
To see the Pandas data frame, run this code:

```python
forecast_df
```
It produces this output:

![Pandas data frame](/engineering-education/multivariate-time-series-using-auto-arima/pandas-data-frame.png)

Let's plot the Pandas data frame using Matplotlib.

#### Plotting the Pandas data frame
We import Matplotlib as follows:

```python
import matplotlib.pyplot as plt
```
We plot the line chart as follows:

```python
pd.concat([final_df['demand'],forecast_df],axis=1).plot()
```
It produces the following line chart:

![Line chart](/engineering-education/multivariate-time-series-using-auto-arima/test-data-frame-predictions.png)

From the line chart above:
- The blue line is the actual energy demand.
- The orange line is the predicted energy demand. 

The Auto ARIMA model has performed well, it has made accurate predictions. The two lines are close to each other. 

We can now use this model to predict the unseen future values.

####  Predict the unseen future values
To predict the unseen future values use this code:

```python
forecast1=model.predict(n_periods=8, return_conf_int=True)
forecast_range=pd.date_range(start='2017-05-31', periods=8,freq='M')
```
- `n_periods=8`
Is the number of data points the model will predict in the future. The future dates are from 2017-05-31. We also need to convert the predicted values to a Pandas data frame.

```python
forecast1_df = pd.DataFrame(forecast1[0],index =forecast_range,columns=['Prediction'])
```
Finally, let's plot the future predicted values using Matplotlib

#### Plotting the future predicted values
We plot the future predicted values as follows:

```python
pd.concat([final_df['demand'],forecast1_df],axis=1).plot()
```
It produces the following line chart:

![Prediction line chart](/engineering-education/multivariate-time-series-using-auto-arima/unseen-future-predictions.png)

From the line chart above:
- The blue line represents the actual energy demand.
- The orange line represents the predicted energy demand. 

The orange line also shows the unseen future predictions. The Auto ARIMA model has performed well, the orange line maintains the general dataset pattern. 

### Conclusion
In this tutorial, We have learned how to build a multivariate time series model with AutoARIMA. We discussed how the Auto ARIMA model works and how it automatically finds the best parameters of an ARIMA model. 

We briefly discussed a non-stationary time series and how to perform differencing. We covered how to check for stationarity using the Augmented Dickey-Fuller test. We also discussed why we need an Auto ARIMA model in time series.

Finally, we implemented the Auto ARIMA model. We used the trained Auto ARIMA model to predict the energy demand on the test data frame and the unseen future values. The model made good predictions, the two lines were close to each other.

You can access the Python code in Google Colab for this tutorial [here](https://colab.research.google.com/drive/1X10JHyXMkUAWz_Z2wPngfa7PXUjzuVvf?usp=sharing)

### References
- [Auto ARIMA documentation](https://alkaline-ml.com/pmdarima/modules/generated/pmdarima.arima.auto_arima.html)
- [Pmdarima documentation](https://pypi.org/project/pmdarima/)
- [What is auto ARIMA?](https://medium.com/featurepreneur/what-is-auto-arima-b8025c6d732d)
- [ARIMA Model time series forecasting](https://www.machinelearningplus.com/time-series/arima-model-time-series-forecasting-python/)
- [ARIMA model definition](https://www.investopedia.com/terms/a/autoregressive-integrated-moving-average-arima.asp)
- [Hyperparameter Tuning](/engineering-education/hyperparameter-tuning-of-machine-learning-model-in-python)
- [Random Search technique](/engineering-education/random-search-hyperparameters/)
- [Grid Search technique](/engineering-education/grid-search/)
- [ARIMA model guide](https://machinelearningmastery.com/arima-for-time-series-forecasting-with-python/)
- [ARIMA models](https://otexts.com/fpp2/arima.html)
