This tutorial will take a look at how we can forecast the weather using a time series package known as Neural Prophet. In this walkthrough, we'll be going through a couple of key things:
- We'll start by preprocessing our data fetched from Kaggle using the Pandas library.
- We'll train a time series forecasting model to predict temperature using the model.
- We'll learn how to forecast the temperature into the future.

### Prerequisites
- You can use either Google Colab or Jupyter Notebook.
> To follow along, please use Google Colab.
- You need to be familiar with Machine Learning modeling. 

### Table of contents
- [About Neural Prophet](#about-neural-prophet)
- [Installing and importing the required dependencies](#installing-and-importing-the-required-dependencies)
- [Loading the dataset](#loading-the-dataset)
- [Preprocessing the data ](#preprocessing-the-data )
- [Training the forecasting model]((#training-the-forecasting-model))
- [Forecasting the temperature into the future](#forecasting-the-temperature-into-the-future)
- [Wrapping up](#wrapping-up)

### About Neural Prophet

It is a package that has been built on top of AR-Net and Facebook Prophet.

### Installing and importing the required dependencies
The main package that we are going to install is the Neural prophet package. 

```bash
!pip install neuralprophet
```
We need to now import the necessary dependencies into our notebook. We'll import Pandas, Neural Prophet, Matplotlib, and Pickle. 

```python
import pandas as pd
from neuralprophet import NeuralProphet
from matplotlib import pyplot as plt
```
- `Pandas` will help us read our data into our notebook.
- `NeuralProphet` is the class we will use to help us predict the future temperature.
- `Matplotlib` will help us in plotting.

The next step involves us importing our data.

### Loading the dataset 
We will use the [Rain in Australia](https://www.kaggle.com/jsphyg/weather-dataset-rattle-package) dataset from Kaggle. Although it is a rain dataset, we are specifically going to predict the temperature. That means we will only work with the temperature data from the dataset. You need to download it and upload the `weatherAUS.csv` file into your notebook.

```python
df = pd.read_csv('weatherAUS.csv')
df.tail()
```
We've used Pandas `read_csv()` method to load in our dataset. In addition, we've used the `tail()` method to view the last five rows in our dataset.

Let's do a bit of exploratory data analysis on the data.

```python
df.Location.unique()
```
When you run the code above, you'll see that we have a couple of different locations in Australia. We'll pick one. 

Output:

```bash
array(['Albury', 'BadgerysCreek', 'Cobar', 'CoffsHarbour', 'Moree',
       'Newcastle', 'NorahHead', 'NorfolkIsland', 'Penrith', 'Richmond',
       'Sydney', 'SydneyAirport', 'WaggaWagga', 'Williamtown',
       'Wollongong', 'Canberra', 'Tuggeranong', 'MountGinini', 'Ballarat',
       'Bendigo', 'Sale', 'MelbourneAirport', 'Melbourne', 'Mildura',
       'Nhil', 'Portland', 'Watsonia', 'Dartmoor', 'Brisbane', 'Cairns',
       'GoldCoast', 'Townsville', 'Adelaide', 'MountGambier', 'Nuriootpa',
       'Woomera', 'Albany', 'Witchcliffe', 'PearceRAAF', 'PerthAirport',
       'Perth', 'SalmonGums', 'Walpole', 'Hobart', 'Launceston',
       'AliceSprings', 'Darwin', 'Katherine', 'Uluru'], dtype=object)
```

Let's take a look at all the columns available in our dataset.

```python
df.columns
```
Output:

```bash
Index(['Date', 'Location', 'MinTemp', 'MaxTemp', 'Rainfall', 'Evaporation',
       'Sunshine', 'WindGustDir', 'WindGustSpeed', 'WindDir9am', 'WindDir3pm',
       'WindSpeed9am', 'WindSpeed3pm', 'Humidity9am', 'Humidity3pm',
       'Pressure9am', 'Pressure3pm', 'Cloud9am', 'Cloud3pm', 'Temp9am',
       'Temp3pm', 'RainToday', 'RainTomorrow'],
      dtype='object')
```

Going forward, we will be focusing on the temperature column.

Let's now do a bit of preprocessing.

### Preprocessing the data 
We begin by checking the data types of the columns.

```python
df.dtypes
```
Output:

```bash
Date              object
Location          object
MinTemp          float64
MaxTemp          float64
Rainfall         float64
Evaporation      float64
Sunshine         float64
WindGustDir       object
WindGustSpeed    float64
WindDir9am        object
WindDir3pm        object
WindSpeed9am     float64
WindSpeed3pm     float64
Humidity9am      float64
Humidity3pm      float64
Pressure9am      float64
Pressure3pm      float64
Cloud9am         float64
Cloud3pm         float64
Temp9am          float64
Temp3pm          float64
RainToday         object
RainTomorrow      object
dtype: object
```

We'll need to change the `Date` format from an `Object` to a `Date time` format. 

```python
bris = df[df['Location']=='Brisbane'] 
bris['Date'] = pd.to_datetime(bris['Date']) 
```
We've done two things:
- We've filtered out the Brisbane location. If you want to use a different location, you can. You need to replace "Brisbane" with any location you wish.
- We've converted our date column from an object to a date-time type.

If you type in `bris.dtypes`, you will see that the formatting has changed.

Results:

```bash
Date             datetime64[ns]
Location                 object
dtype: object
```
This is a requirement whenever you're working with Neural Prophet. Neural prophet requires you to give it two columns only. A `ds` column which is a timestamp and a `y` column which is the numeric column that we want to predict. In this case, our `ds` will be `Date` while our `y` will be `Temp3pm`.

Let's use `matplotlib` to plot our temperature over time.

```python
plt.plot(bris['Date'], bris['Temp3pm'])
plt.show()
```

Result:

![Plot](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/plot.png)

To plot the graph above, we've used `plt.plot()` method from Matplotlib. We've passed `bris['Date']` as the x variable and `bris['Temp3pm']` as the y variable. 
> Always check whether your data has missing values as you would not want to pass data with missing values to Neural Prophet. For our case, the data looks good.

The next thing that we will do is filter out a couple of our columns. As mentioned earlier, Neural Prophet only expects two columns. 

```python
new_column = bris[['Date', 'Temp3pm']] 
new_column.dropna(inplace=True)
new_column.columns = ['ds', 'y'] 
new_column.tail()
```

When you run the code above, you'll notice that our dataset has been filtered to only two columns, `ds` and `y`. With our `Date` now being `ds` and the `Temp3pm` being `y`.
> If you want to forecast something else such as `Humidity9am` or `Pressure9am`, you only need to change the second variable in `bris[['Date', 'Temp3pm']]` to your desired target. For example, `bris[['Date', 'Humidity9am']]`.

We can now go ahead and train our model.

### Training the forecasting model
We need to first create a new instance of Neural Prophet using the `NeuralProphet()` class we imported earlier. We store this instance inside a variable `n`. Secondly, we'll use the `fit()` method to go ahead and train.

```python
n = NeuralProphet()
model = n.fit(new_column, freq='D', epochs=5000)
```
We will be training our model for `5000` epochs. You can choose to train yours for shorter or longer epochs depending on the accuracy you get. It uses AR-Net in the background to train. The `freq='D'` denotes that we're using a daily frequency. 

After training for 5000 epochs, we get a Mean Absolute Error of `1.74`.

Up until now, we've been doing preprocessing and training. Let's go ahead and perform some forecasting.

### Forecasting the temperature into the future

```python
future = n.make_future_dataframe(new_column, periods=400)
forecast = n.predict(future)
forecast.tail()
```
We are forecasting for 400 periods (400 days into the future). We've also used the `n.predict()` method to go ahead and predict our future values. Finally, we are using the `tail()` method to list our five last rows. You'll notice that the last row is our 400th prediction. That is, `2018-07-30`. Remember, our dataset only has values up to the date `2017-06-25`.

Let's visualize these predictions.

```python
plot = n.plot(forecast)
```
Result:

![Visualizing our prediction](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/vusual.png)

From these results, we can deduce that between `2018-01` and `2018-03`, we expect the temperature to be very high. In addition, in the months between June and July, we expect a lot colder temperatures. This result mimics the one that we had earlier with hotter temperatures in January - March and colder temperatures between June and July. 

You can find the complete code for this tutorial [here](https://colab.research.google.com/drive/1-jV0KIAxJEuozwS6quVGVf4tpRlfEZTE?usp=sharing).

### Wrapping up
That wraps up how to generate weather forecasts into the future. We performed some exploratory data analysis on our data, trained our model, and finally made the predictions with only a few lines of code. Feel free to try it out yourself.

Happy coding!
