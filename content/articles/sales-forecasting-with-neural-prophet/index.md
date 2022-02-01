Prophet is a library developed by Facebook that is ideal for performing time series forecasting. It is used to forecast anything that has a time series trend such as the weather and sales. This tutorial will leverage this library to accurately estimate sales trends. We will use the Python programming language for this build.

### Prerequisite
To follow along, a reader needs to be familiar with:
- [Time series](/engineering-education/introduction-to-time-series/)
- [Time series modeling](/engineering-education/building-a-time-series-weather-forecasting-application-in-python/)
- [Google Colab](https://colab.research.google.com/)

### Outline
- [Installing and importing required dependencies](#installing-and-importing-required-dependencies)
- [Loading data into our notebook](#loading-data-into-our-notebook)
- [Data preprocessing](#data-pre-processing)
- [Training the time series model](#training-the-time-series-model)
- [Making predictions and evaluating performance](#making-predictions-and-evaluating-performance)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Installing and importing required dependencies
Let's begin by installing the model.

```bash
!pip install prophet
```
After installing it, we need to import it into our notebook.

```python
import pandas as pd
from prophet import Prophet
```
- `pandas` allows us to bring in tabular data.
- `prophet` allows us to import the Prophet library into our Google Colab.

The next thing that we are going to do is to bring in our data into the notebook. We will use store sales [transaction data](https://www.kaggle.com/c/store-sales-time-series-forecasting/data?select=transactions.csv) from Kaggle. The dataset includes dates, store and product information, and the sales numbers. It contains four years worth of sales data sold at Favorita stores located in Ecuador. You'll need to download the data and upload it into your colab. 

### Loading data into our notebook
We will use the pandas library to read in our `csv` file.

```python
dataframe = pd.read_csv('transactions.csv')
```
We load in our data and save it inside a variable called `dataframe`. We can check the first five rows of data using pandas `head()` method.
> You can use `tail()` method to check the last five rows.

```python
dataframe.head()
```
Output:

```bash
 	date 	 store_nbr 	transactions
0 	2013-01-01 	25 	770
1 	2013-01-02 	1 	2111
2 	2013-01-02 	2 	2358
3 	2013-01-02 	3 	3487
4 	2013-01-02 	4 	1922
```
Let's take a look at the data types for these columns.

```python
dataframe.dtypes
```
Output:

```bash
date            object
store_nbr        int64
transactions     int64
```
From these results, we can see that the date column is a string. The model cannot accept it as it is. It needs to be converted into a date-time format for it to work with the model. Let's perform some preprocessing.

> It is important whenever you're working with time series data that you have a date or time stamp column. It is a requirement by the Prophet model to forecast trends. 

### Data preprocessing
Using Pandas `to_datetime()` function, we will convert the date column from a string to date time format.

```python
dataframe ['date'] = pd.to_datetime(dataframe ['date'])
dataframe.dtypes
```
Output:
```bash
date            datetime64[ns]
store_nbr                int64
transactions             int64
```
Our date column has been converted into date time format.

We need to drop the `store_nbr` column. Besides, for this data to work with the Prophet model, we only need two columns, a `ds` and `y` column. We need to rename our date column to `ds` and the transactions column to `y`.

```python
dataframe.drop('store_nbr', axis=1, inplace=True)
```
We are dropping only the `store_nbr` column. The `axis=1` arguments tells Pandas that we are dropping the column and not rows.

Output:
```bash
 	date 	transactions
0 	2013-01-01 	770
1 	2013-01-02 	2111
2 	2013-01-02 	2358
3 	2013-01-02 	3487
4 	2013-01-02 	1922
```
We now have only two columns. As mentioned above, we need to rename the data column to `ds` and transactions columns to `y`.

```python
dataframe.columns = ['ds', 'y']
dataframe.head()
```

Output:
```bash
        ds  	y
0 	2013-01-01 	770
1 	2013-01-02 	2111
2 	2013-01-02 	2358
3 	2013-01-02 	3487
4 	2013-01-02 	1922
```
Using the command above, we have successfully renamed our columns. That's the last of the preprocessing step. We can now go ahead and create the time series model.

### Training the time series model



### Making predictions and evaluating performance


Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1kmb4zguNvYZ4LqGQZAUhYgS_ZZNz-sMg?usp=sharing).

### Wrapping up

### Further reading
- [Prophet](https://research.facebook.com/blog/2017/02/prophet-forecasting-at-scale/)
- [Forecasting at scale](https://facebook.github.io/prophet/)