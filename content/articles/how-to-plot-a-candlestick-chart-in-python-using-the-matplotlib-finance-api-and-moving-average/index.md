In this tutorial, we'll use the matplotlib finance api, `mplfinance` to plot a candlestick chart in Python. In addition to using the `mpllfinance api`, we will implement the [moving average](https://www.investopedia.com/terms/m/movingaverage.asp) function, which is commonly used to analyze cryptocurrencies. Many tutorials have used candlestick to plot in Python, but few have used candlestick charts in Python with Moving Average. We'll also show how this can be applied to some cryptocurrencies using data from [CoinAPI](https://www.coinapi.io/).

This tutorial is necessary for anyone looking to start plotting share prices using Python.

### Table of contents
- [Introduction](#introduction)
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Data preprocessing](#data-preprocessing)
- [Plotting the share prices using Python](#plotting-the-share-prices-using-python)
- [Wrapping up](#wrapping-up)

### Prerequisites
To understand this tutorial, you need to be familiar with:
- Python programming language.
- Machine learning.
- Cryptocurrencies.
- Google Colab or Jupyter Notebook.

> To follow along easily, please use Google Colab.

### Introduction
Candlestick charts are financial charts that are composed of candlesticks. Those candlesticks give you information about the open, close, high, and low values in a stock. The open value is the value a stock opens with, for example, $100. At the end of the day, when trading stops, that value that is recorded is the `closing` value. Let's say $105. If we have a spike in the stock price at any point during the day and it shoots to $110, and that's the highest value recorded throughout the day, that's our `high`. Finally, if the vice versa happens, and we record a low of $97 that's our `low`.
These four values are what a candlestick chart uses to visualize.

The matplotlib finance API is a package built on top of the matplotlib library to visualize financial data. It integrates easily with Pandas dataframes.

The moving average is a technical indicator that tracks stock prices over time and plots it on a line. It helps smooth out price fluctuations giving an investor a general idea of where a trend is heading. It could determine an uptrend, downtrend, or sideways trend in prices. This enables an investor to know when to buy or sell, or hold stocks/cryptocurrencies. Today, it is popularly used to analyze trends in cryptocurrencies. 

Now that you're familiar with the main concepts, let's get started.

### Installing and importing dependencies
Let's start by installing the matplotlib finance api.

```bash
pip install --upgrade mplfinance
```
Output:

```bash
Installing collected packages: mplfinance
Successfully installed mplfinance-0.12.7a17
```

After installation, we go ahead and import the dependencies that we'll need for our tutorial.

```python
from matplotlib.pyplot import title
import requests
import json
import pandas as pd
import mplfinance as mpl 
```
To plot the candlestick chart using moving average, we first choose a timeframe (a start and end date). A timeframe can be any period, i.e., a day, month, year. For our case, we will select a time between `2021-06-06` and `2021-10-05`.

```python
start_date = "2021-06-06"
end_date = "2021-10-05"
freq = "1DAY"
coin = "BTC"

url = f'https://rest.coinapi.io/v1/exchangerate/{coin}/USD/history?period_id={freq}&time_start={start_date}T00:00:00&time_end={end_date}T00:00:00'
headers = {'X-CoinAPI-Key' : 'Paste your api key here'}
response = requests.get(url, headers=headers)
```
To get your free CoinAPI for testing or hobby projects, please visit their official website via this [link](https://www.coinapi.io/pricing?apikey). Once you're there, you'll notice there are five packages available. Select the first package to get a free api key. This api key will be sent to your email. Copy the key and paste is above in the section named, 'Paste your api key here'. The CoinAPI will provide you with fast, reliable and unified data APIs to cryptocurrency markets. In our example, we'll use it to fetch Bitcoin `BTC` data.

### Data preprocessing

```python
content = json.loads(response.text)
print(content)
```
Using Pandas, we convert the JSON file into a Dataframe

```python
df = pd.json_normalize(content)
```
This next step involves changing `DType` to `DataTime`.

```python
df.time_period_start = pd.to_datetime(df.time_period_start)
```

```python
df = df.set_index("time_period_start")
```

Let's now remove the unnecessary columns in our data.

```python
df.drop(['time_period_end', "time_open", "time_close"], axis=1, inplace=True)
print(df.columns)
```
Output:

```bash
Index(['rate_open', 'rate_high', 'rate_low', 'rate_close'], dtype='object')
```

This next step involves renaming the remaining columns to our desired names.

```python
df.rename(columns={"rate_open": "Open", "rate_high":"High", "rate_low":"Low", "rate_close": "Close"}, inplace=True)
df.head()
```
Output:

```bash
                                Open      High       Low         Close
time_period_start               
2021-04-25 00:00:00+00:00   1.056056    1.156487    0.947005    1.032632
2021-04-26 00:00:00+00:00   1.042543    1.370573    1.020200    1.369125
2021-04-27 00:00:00+00:00   1.350937    1.462192    1.334610    1.401779
2021-04-28 00:00:00+00:00   1.405354    1.449042    1.286561    1.358817
2021-04-29 00:00:00+00:00   1.358232    1.420125    1.331622    1.399415
```

This concludes the data preprocessing. Let's now plot the share prices using the maplotlib finance api.

### Plotting the share prices using Python

```python
mpl.plot(
    df,
    type="candle", 
    mav =(3,6,9),
    title = f"{coin} Price",  
    style="yahoo"
    )
```

Output:

![BTC candlestick chart](/engineering-education/how-to-plot-a-candlestick-chart-in-python-using-the-matplotlib-finance-api-and-moving-average/btc.png)

We successfully plotted a candlestick chart in Python using the matplotlib finance API and moving average.

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1Tl_kqWI3IvavcY2m7Xd-PMSx_t2b3vff?usp=sharing).

### References
- [CoinAPI](https://www.coinapi.io/)
- [Matplotlib Finance API](https://github.com/matplotlib/mplfinance#newapi)
- [Moving average function](https://www.investopedia.com/terms/m/movingaverage.asp)