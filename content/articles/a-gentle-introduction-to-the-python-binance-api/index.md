In this tutorial, we'll show you how to extract and analyse real time securities and crypto data from Binance using the python-binance API and Pandas library. 

### Table of contents
- [The Python-Binance API](#the-python-binance-api)
- [Setting up the binance API](#setting-up-the-binace-api)
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Performing authentication](#performing-authentication)
- [Pull data from binance using Python-Binance](#pull-data-from-binance-using-python-binance)
- [Performing EDA with binance data](#performing-eda-with-binance-data)
- [Visualization using matplotlib-finance-library](#visualization-using-candlesticks)
- [Summary](#summary)
- [Futher reading](#further-reading)

### The Python-Binance API


### Setting up the binance API
We first need to setup an API key on binance. This step involves heading on to the main binance [website](https://www.binance.com/en), and signing up if you don't have an account with them yet. Registration is straightforward, as you would register for any web application. After a successful sign up and verification complete, hover over the profile button and select the `API Management` option as shown below:

![API Management](/engineering-education/a-gentle-introduction-to-the-python-binance-api/api.png)

The API management is the option where you will be allowed to setup your API key. Once opened, you need to label the API you want to create then click on the `Create API` button. For our case, we created one with the label, `BinanceIntroAPI`. After pressing the 'Create API' button, you will be prompted to perform a quick security verification. Once done, your API key will have been created successfully. You will get an `API key` and a `secret key`. 

To make these keys secure, on the top right corner, you'll see a button called `Edit restrictions`. Once inside, uncheck the `Enable Spot & Margin Trading` option and check the `Restrict access to trusted IPs only (Recommended)` option. Enter your IP address then click save. If you don't know your IP address just head on to Google and search, `my ip address`. This will be able to take away the trading permissions and only limit access to a computer with your IP address. 

Copy this API key and paste it on your notebook as shown below:

```python
apikey = 'ENTERYOURAPIKEY'
secret = 'ENTERYOURSECRETKEY'
```
We've store our API and secret keys in the `apikey` and `secret` variable respectively.

### Installing and importing dependencies
In this next step, we'll go ahead and install and import the necessary dependencies.

```python
!pip install python-binance pandas mplfinance
```
We've installed three dpendencies:
- `python-binance` which allows us to connect to the Binance API.
- `pandas` library which will allow us to transform the crypto data.
- `mplfinance` which will enable us visualize financial data easily.  

Let's now import them into our notebook.

```python
from binance import Client, ThreadedWebsocketManager, ThreadedDepthCacheManager
import pandas as pd
```
### Performing authentication
Using the `Client` class we imported earlier, we import the two variables, `apikey`, and `secret` key to perform authentication. We store this result in a variable called `client`.

```python
client = Client(apikey, secret)
```

### Pull data from binance using Python-Binance
This step involves retrieving data from the API using the python-binance library.

```python
tickers = client.get_all_tickers()
```
The function, `get_all_tickers()` allows you to go ahead and grab all ticker values. There are a lot other functions available for use to manage your account and place trades.

To view the grabbed data, we write the following code:

```python
tickers
```

Output:
```bash

```
We can use pandas for easier visualization of this data.

```python
ticker_dataframe = pd.Dataframe(tickers)
```
To view it, we write the following code on our notebook:

```python
ticker_dataframe.head()
```
As we've seen, the pandas library makes it easy to work with data as it organizes it into dataframes.

### Performing EDA with binance data
Using the pandas library, we'll perform some exploratory data analysis on the binance data.

### Visualization using matplotlib finance library
In this step, we will explore and visualize data using [mplfinance](https://github.com/matplotlib/mplfinance), a financial market data visualization tool that is built on top of matplotlib.

### Summary

### Further reading
- [Mplfinance](https://github.com/matplotlib/mplfinance)