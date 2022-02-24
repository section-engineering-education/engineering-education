---
layout: engineering-education
status: publish
published: true
url: /how-to-plot-a-candlestick-chart-in-python-using-the-matplotlib-finance-api/
title: How to Plot a Candlestick Chart in Python using the Matplotlib Finance API
description: This tutorial will show the reader how to plot a Candlestick chart using Matplotlib Finance API and Python
author: sharon-kinyan
date: 2021-11-03T00:00:00-09:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-plot-a-candlestick-chart-in-python-using-the-matplotlib-finance-api/hero.png
    alt: candlestick chart example image 
---
Candlestick charts provide information about different stock values. In this tutorial, we will use the Matplotlib Finance API to plot a candlestick chart in Python. 
<!--more-->
We will also implement the [moving average](https://www.investopedia.com/terms/m/movingaverage.asp) function, which is commonly used to analyze cryptocurrencies. 

Only a few tutorials have used candlestick charts in Python with moving average. The article will discuss how this concept can be applied to some cryptocurrencies using data from [CoinAPI](https://www.coinapi.io/).

This tutorial is helpful for any person that wishes to plot share prices using Python.

### Table of contents
- [Introduction](#introduction)
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Data preprocessing](#data-preprocessing)
- [Plotting the share prices using Python](#plotting-the-share-prices-using-python)
- [Wrapping up](#wrapping-up)

### Prerequisites
To understand this tutorial, you need to be familiar with:
- Python programming language.
- Basic aspects of machine learning and cryptocurrencies.
- [Google Colab](https://colab.research.google.com/?utm_source=scs-index) or [Jupyter Notebook](https://jupyter.org/).

> Note that we will Google Colab in this tutorial.

### Introduction
Candlestick charts provide information about open, close, high, and low values in stock. 

The `open` value is the value a stock opens with, for example, $100. At the end of the day, when trading stops, the amount that is recorded is referred to as the `closing` value. Let's say $105. 

If we have a spike in the stock price at any point during the day and it shoots to $110, and that's the highest value recorded throughout the day, that's our `high`. However, if the reverse happens, and we record a low of $97 that's our `low`.

These four values are what a candlestick chart uses to visualize. The Matplotlib Finance API is a package built on top of the Matplotlib library to visualize data. It can be integrated easily with Pandas dataframes.

The `moving average` is a technical indicator that tracks stock prices over time and plots them on a graph. It helps in dealing with price fluctuations which allow investors to understand different financial trends.

For instance, the `moving average` could determine an uptrend, or downtrend in prices. This enables an investor to know when to buy, sell, or hold stocks. 

### Installing and importing dependencies
Let's start by installing the Matplotlib Finance API:

```bash
pip install --upgrade mplfinance
```

Output:

```bash
Installing collected packages: mplfinance
Successfully installed mplfinance-0.12.7a17
```

After installation, we go ahead and import the dependencies that we'll need for our tutorial:

```python
from matplotlib.pyplot import title
import requests
import json
import pandas as pd
import mplfinance as mpl 
```

To plot the candlestick chart using `moving average`, we first choose a timeframe (a start and end date). A timeframe can be any period, i.e., a day, month, or year. 

For our case, we will select a time between `2021-06-06` and `2021-10-05`.

```python
start_date = "2021-06-06"
end_date = "2021-10-05"
freq = "1DAY"
coin = "BTC"
url = f'https://rest.coinapi.io/v1/exchangerate/{coin}/USD/history?period_id={freq}&time_start={start_date}T00:00:00&time_end={end_date}T00:00:00'
headers = {'X-CoinAPI-Key' : 'Paste your api key here'}
response = requests.get(url, headers=headers)
```

To get your free CoinAPI for testing or hobby projects, please visit their [official website](https://www.coinapi.io/pricing?apikey). 

You'll notice there are five packages available on the website. Select the first package to get a free API key. 

This API key will be sent to your email. Copy the key and paste it above in the section written; 'Paste your API key here'.

 The CoinAPI will provide you with fast, and reliable data from the cryptocurrency markets. In our example, we'll use it to fetch Bitcoin (`BTC`) data.

### Data preprocessing
We load our data using the following code:

```python
content = json.loads(response.text)
print(content)
```
We convert the JSON file into a Dataframe using Pandas:

```python
df = pd.json_normalize(content)
```

This next step involves changing `DType` to `DataTime`:

```python
df.time_period_start = pd.to_datetime(df.time_period_start)
```

```python
df = df.set_index("time_period_start")
```

Let's now remove the unnecessary columns in our data:

```python
df.drop(['time_period_end', "time_open", "time_close"], axis=1, inplace=True)
print(df.columns)
```
Output:

```bash
Index(['rate_open', 'rate_high', 'rate_low', 'rate_close'], dtype='object')
```

The next step involves renaming the remaining columns to our desired names:

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

Let's now plot the share prices using the Maplotlib Finance API.

### Plotting the share prices using Python
We use the `mpl.plot()` function to plot the share prices:

```python
mpl.plot(
    df,
    type="candle", 
    mav =(3,6,9),
    title = f"{coin} Price",  
    style="yahoo"
    )
```

There are different types of charts that can be used to plot these share prices. They include bar charts, candlestick charts, Renko charts, line charts, and figure charts. 

In this article, we've used the candlestick chart. These types of charts are simple and easy to analyze appearance. They provide more detailed information about the market at a glance than bar or line charts.

We've applied a moving average line using `mav` to our plot. We also added 3, 6, and 9-day as parameters. Popular moving averages on stock prices websites include 10, 20, and 30-day moving average.

We chose the `yahoo` style since it replicates the way you watch stock prices on the Yahoo website. However, there are other built-in styles in the `mplfinance` library you could try out. 

They include `binance`, `blueskies`, `brasil`, `charles`, `checkers`, `classic`, `default`, `mike`, `nightclouds`, `sas`, and `starsandstripes`.

Output:

![BTC candlestick chart](/engineering-education/how-to-plot-a-candlestick-chart-in-python-using-the-matplotlib-finance-api/btc.png)

We have now successfully plotted a candlestick chart in Python using the Matplotlib Finance API and moving average. 

Please find this tutorial's code [here](https://colab.research.google.com/drive/1Tl_kqWI3IvavcY2m7Xd-PMSx_t2b3vff?usp=sharing).

### Wrapping up
The mplfinance library allows us to visualize data easily. You can read more about the mplfinance API in the following references.

### References
- [CoinAPI](https://www.coinapi.io/)
- [Matplotlib Finance API](https://github.com/matplotlib/mplfinance#newapi)
- [Moving average function](https://www.investopedia.com/terms/m/movingaverage.asp)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)