## Predicting Covid-19 Cases using NeuralProphet

Performing predictions on datasets where a time series is the independent variable can prove challenging using traditional machine learning methods. Facebook (now Meta) in 2017 came up with a library which extracts non-linear patterns which may have daily, weekly or other seasonality. This library is called Prophet (previously known as FbProphet).
One limitation of the library is that it does not generalize well to complext trends thus tends to under-fit. The Data Science Core Team at the company thus came up with NeuralProphet, a library based on AR-Net, a simple auto-regressive Neural Network for time-series and Pytorch.

We shall use the global cases dataset from [Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE) Global Covid-19 Data repository](https://github.com/CSSEGISandData/COVID-19) to perform forecasting. This is a very useful dataset as it has a lot of seasonality and complex time series patterns.

### Table of contents
- Preparing the environments.
- Importing understanding and preparing the data.
- Training a NeuralProphet Forecaster.
- Forecasting using the trained model.

### Prerequisites
- Basic knowledge of Python.
- Machine learning basics.
- Basic data manipulation skills with Pandas.
- Python (with `pip`, `numpy` and `pandas`) installed on your computer or an online environment like Google Colab or Kaggle.

### Goal
At the end of this tutorial, you will be comfortable with;
- Understanding Time-Series Forecasting.
- Installation of NeuralProphet.
- Formating the data for forecasting.
- Performing Forecasts on a single series Using NeuralProphet.
- Forecasting on multiple series.

### Setting up environments
On Google Colab, install Prophet and NeuralProphet run the following commands:

```bash
pip install neuralprophet[live]
```
Locally, run the following:

```bash
pip install neuralprophet
```

> Note: Online editors like `repl.it` may fail to run our code due to insufficient memory allocations.

### Importing and preparing the data
Let's start by importing `pandas` library and the dataset.

```python
import pandas as pd
path='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
dataset=pd.read_csv(path,engine='python')
print(dataset)
```

#### Dataset
We will be using the Covid-19 Global Cases Dataset from [COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19). To manually navigate to the CSV file within the repository, follow the path 'csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'.

This dataset is a collection of reporting from various countries health departments, agencies and universities that is updated daily by the CSSE at JHU.

The data has some countries having their data presented by Province or State. The 'Province/State' column should be combined into one country's column.
We also need to drop Lat and Long column since they're not useful for this task.

```python
dataset=dataset.groupby('Country/Region').sum()
dataset=dataset.drop(columns=['Lat','Long'])
```
We will rotate the data so that Countries are column names and dates are just rows for easier fetching during model training.

We shall do this by saving the dates in a variable ```dates```, transpose the rest of the dataset and concatenate it with ```dates``` as a ```'Date'``` column.

```python
dates=dataset.columns
dataset=dataset.transpose().reset_index(drop=True)
dates=pd.DataFrame(dates)
rotated_dataset= pd.concat([dates, dataset.diff()], axis=1, join='inner')
rotated_dataset=rotated_dataset.rename(columns={0:'Date'})
rotated_dataset
```

NeuralProphet only accepts two columns, dates and one y-column, fitting data. The columns must be named ```ds``` and ```y``` respectively.
We shall drop all values NULL values from the data.

For the moment, let's use the US data for demonstration.

```python
data=cases[['Date','US']]
data.columns=['ds','y']
data.dropna(inplace=True)
print(data)
```
**Output:**
![DataFrame 'data'](/engineering-education/covid-forecasting-using-neuralprophet/df1.png)

*Screenshot of the dataset by author*


### Training the model
Create an empty model from the NeuralProphet() class and assign it to the variable ```m```.

Fit the model on our training dataset ```data``` from the previous step. Pass three arguments to the fit() method;
- The dataset to train on, ```data```,
- Frequency of the data, ```freq``` as 'D' since the occurence of the data is daily,
- Training time, ```epochs```

```python
m = NeuralProphet()
m.fit(data,freq='D',epochs=1000)
```
After the training process is complete, we can obtain the model's metrics such as Mean Absolute Error (MAE) from the output of the cell.

### Forecasting
Forecast on future trends by calling the make_future_dataframe() method with the data and number of periods(days) to predict.
Let us predict for the next 14 days.

Call the predict() method on ```future``` to perform the forecast.
The predictions are the ```yhat1``` column of the ```forecast``` dataframe.

```python
future=m.make_future_dataframe(data,periods=14)
forecast=m.predict(future)
print(forecast)
```

We can plot the predictions on using the models in-built plotting method() from the matplotlib API.

```python
fig1 = m.plot(forecast)
```
**Output:**

![Predicted cases](/engineering-education/covid-forecasting-using-neuralprophet/df2.png)

*Image of plot by author*

As you can see, we have built a NeuralProphet model and used it for predicting Covid-19 cases.

### Conclusion
In this tutorial, we learned how to install NeuralProphet, import and prepare data for time-series forecasting, train NeuralProphet forecaster and forecast using the trained model.

This model can now be served via any web application framework like Streamlit or Dash using Django or Flask via an API. In case of any issues with NeuralProphet, you can raise an issue on [NeuralProphet's GitHub](https://github.com/ourownstory/neural_prophet).

You can find the full code [here](https://github.com/iannjari/neuralprophet/blob/main/NeuralProphet.ipynb).

Happy ML-ing!

### References
- [NeuralProphet's Contributors on Github](https://github.com/iannjari/neuralprophet/blob/main/NeuralProphet.ipynb)
- [NeuralProphet documenation](https://neuralprophet.com/html/contents.html)
- [NeuralProphet's Release Notes](https://ai.facebook.com/blog/neuralprophet-the-neural-evolution-of-facebooks-prophet/)
- [Notebook with accompanying Source Code](https://github.com/iannjari/neuralprophet/blob/main/NeuralProphet.ipynb).
