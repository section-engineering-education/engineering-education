### Creation of Calendar Heatmaps to Display Time-Series Quantitative Data with Python
In this  simple well-elaborated tutorial we have a lot of alternatives when it comes to choosing a visualization for our data.  
For a visualization to be said to be  good it's not only easy to do but also has a cognitive and neural basis. A basic heatmap is a graphical representation of data in which individual values are represented by a color gradient.  
Calendar heatmaps combine heatmaps and calendars into a single visualization. In a calendar view, a calendar heatmap employs colored cells to represent the relative quantity of events on each day.  
Weeks divide the days into columns, which are then classified by months and years. This allows us to immediately spot daily and weekly patterns as well as to detect anomalies in the data.
Time series is a design that collects data on the same variable at regular intervals(Days, Weeks, Months, Years).
It allows the researcher to access the impact of treatment over time, making it easier to predict  future values based on previously observed values. Key areas that implement it are :
- Business forecasting.
- Understanding  previous behavior.
- Planning the future.
- Evaluate current accomplishments.
### Table of contents
-  [Prerequisites](#prerequisites)
-  [Components of Time series](#components-of-time-series)
-  [Installation of calmap Library](#installation-of-calmap-library)
-  [Performing preprocessing from read data](#Performing-preprocessing-from-read-data)
-  [Setting up the Calendar Plot with the Library Calplot Modules](#setting-up-the-calendar-plot-with-the-library-calplot-modules)
- [Calendar Heatmap using the Python library ‘july’](#calendar-heatmap-using-the-python-library-‘july’)
-  [Conclusion](#Conclusion)

### Prerequisites
1. Python Language.
2. Be familiar working with CSV files, for reference click on  the link: [Working with CSV files in Python](/engineering-education/working-with-csv-files-in-python/)


### Components of Time series
Trends: it is a relative movement  of either higher or lower values for a very  long period of time, having an uptrend and a low trend.
Seasonality: referred to as upward or downward swings always a repeating pattern for a fixed period of time
Irregularity. known as 
Cyclic: it has non-regular components having fluctuations within the trend.

Without further ado lets jump into first things first. 
The data we will be using in this tutorial is obtained from kaggle, to access it we can click on the link provided below.[Marketing Funnel by Olist | Kaggle](https://www.kaggle.com/olistbr/marketing-funnel-olist)
Let's begin by first: 
### Installation of calmap Library
For us to be able to use calmap library, we first have to install it.  Below  is the command for its download and installation.
```
 pip install calplot
```
###  Performing preprocessing from read data
```py
#we will be having our data read 
import pandas as pd  
df = pd.read_csv('C:\Users\lizpa\PycharmProjects\olist_closed_deals_dataset.csv')  
df.shape
```
Output is as follows after running the above code:
![csv](/engineering-education/how-to-perform-threading-timer-in-python/csv.png)
For our data to work with calplot library, the data hence should be changed to time series and for it to be implemented we will be needing the date index.
```py
#changing the format of the data type   
df['won_date'] = pd.to_datetime(df['won_date'])  
#Setting won date as index  
df.set_index('won_date', inplace = True)
```
###  Setting up the Calendar Plot with the Library Calplot Modules
The calplot function is used for the generation of this plot. To create the plot the first argument of the variable and data frame is defined by the function calplot. **how** shows how we want to wholly form the data since it is the second argument. More standard python functions can still be passed.
The following argument to be passed is the **cmap** that defines the color scheme to be applied which is the color map.
```py
import calplotpl1 = calplot.calplot(data = df['declared_monthly_revenue'],how = 'sum', cmap = 'Reds', figsize
= (18, 9), suptitle = "Total declared monthly revenue")
```
Time series is thus divided into into years and the to months. We see that on  more dark colours their is more revenue collected  as opposed more light colours. Making it easier to identify most sales in a month.
Let us give a try to a new calplot library counting number of  won date put on a daily basis. We will also understand it more by the code snippet below.
```py
#We will be grouping won orders by their ID and have them counted daily.
counts = df.groupby('won_date')['declared_monthly_revenue'].agg( 'count').reset_index()  
counts['won_date'] = pd.to_datetime(counts['won_date'])  
counts# How creation of the plot is done.
calplot.calplot(counts['declared_monthly_revenue'], cmap = 'GnBu', textformat  ={:.0f}', figsize = (18, 9), suptitle = "Total declared monthly revenue")
```
Our results can be displayed as illustrated in the image bellow:
![daily](/engineering-education/how-to-perform-threading-timer-in-python/daily.png)

Since our dataset only covers  one year, it only executes a year's time series instead of multiple series of years.

###  Calendar Heatmap using the Python library ‘july’
This function displays one year per month of data rather than many years.
For us to use this library, we first have it installed and the dates to be output calculated in range. Important functions to consider are **heatmap** which creates the consolidated plot annually while the **calendar_plot**   displays each month  separately from the plotted year. More illustrations by code are implemented below:
 You can have module july first installed
 ```py
  pip install july
 ```
 After succesfully having it installed you can now procede to the next step:
 ```py
 import july  
from july.utils import date_range  
dates = date_range("2018-01-01", "2018-12-31")  
july.heatmap( dates, data =df1['declared_monthly_revenue'], title='Total declared monthly revenue', cmap="golden", month_grid=True, horizontal = True)
```

We will now be using calendar_plot as a function as a subset of july.
```py
july.calendar_plot(dates, df1['declared_monthly_revenue'], cmap = 'copper');
```
we will be getting a dispaly as shown below:
![2018](/engineering-education/how-to-perform-threading-timer-in-python/2018.png)

As evident as before we can see that the more saturated the color the more sales or orders won made. This simplifies our case more since our analysis is in a more discrete form hence breaking it down for accurate forecasting. we will have it implemented in singular month series.

### Conclusion
It's with great pleasure that you have managed to come this far.
We have  covered the most important features of calendar heatmaps not leaving out working with CSV files in our prerequisite.

To summarise we need to take care of these:

   -  Performing preprocessing from read data.
   - Setting up the Calendar Plot with the Library Calplot Modules.
   - Calendar Heatmap using the Python library ‘july’






