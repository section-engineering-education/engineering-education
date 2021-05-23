---
layout: engineering-education
status: publish
published: true
url: /data-analytics-using-pandas/
title: Introduction to Data analysis using Pandas
description: In this tutorial we will learn how Pandas provide a robust collection of functions that make it easy to process and read data.
author: adith-bharadwaj
date: 2020-10-10T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-analytics-using-pandas/hero.jpg
    alt: pandas example image
---
Data Science and Data Analytics are some of the hottest topics in the Computer Science industry. The ability to analyze and make predictions based on data is nothing short of extraordinary.
<!--more-->
*Python is one of the most popular languages in the data science community. This is due to its ease of use and rich collection of libraries built to work with data. Pandas is a library that makes handling data easy and efficient*. In this tutorial, we are going to understand how Pandas can be used to explore and draw insights from data.

### Table of Contents	 
- [Prerequisites](#prerequisites)
- [What is Pandas?](#what-is-pandas)
- [Analyzing data using Pandas](#analyzing-data-using-pandas)	 
- [Code](#code)
- [Conclusion and further reading](#conclusion-and-further-reading)	 

### Prerequisites
1. A basic understanding of programming in [Python](/data-structures-python-part-1/)

2. Basic knowledge of [data analytics](https://data-flair.training/blogs/data-analytics-tutorial/)

### What is Pandas?
According to the official documentation, Pandas is a fast, powerful, flexible, and easy to use open-source data analysis and manipulation tool. It is built on top of the Python programming language. Pandas is usually used in conjunction with Jupyter notebooks, making it more powerful and efficient for [exploratory data analysis](https://towardsdatascience.com/exploratory-data-analysis-in-python-c9a77dfa39ce).

If you are new to Jupyter notebooks, [this](/introduction-to-jupyter-notebooks/) article walks you through the installation and basics of Jupyter notebooks.

Pandas provide a robust collection of functions that make it easy to process and read data. In this tutorial, we are going to explore some useful functions and techniques that are an integral part of a data scientist's toolset. You can install Pandas by using Python's package manager, [pip](https://pip.pypa.io/en/stable/).

Enter the following command on the terminal:

```bash
pip3 install pandas
```

Alternatively, if you want to install Pandas using a different method, [this](https://pandas.pydata.org/docs/getting_started/install.html) tutorial walks you through the various ways in which you can install Pandas.

### Analyzing data using Pandas
Now that we have Pandas installed on our system, we can delve into data exploration and analysis. For this, I will be using the "wine dataset". Navigate to [this](https://www.kaggle.com/uciml/red-wine-quality-cortez-et-al-2009) link to download the dataset from [Kaggle](https://www.kaggle.com/).

*The "wine" dataset is a beginner-friendly dataset that provides information on various factors that affect the quality of the wine*. It has 12 columns describing different factors such as pH, the acidity of the wine, etc. I will be using **Jupyter notebooks** to execute Python code in this tutorial. However, you can execute the code in a different text editor or IDE of your choice. Jupyter notebooks make it easier to view and explore the data.

Create a Jupyter notebook by running the following command on the terminal:

```bash
jupyter notebook
```

It will open a browser window and display the Jupyter notebook UI.

### Code

```python
# Import necessary Libraries
import pandas as pd

# read the data using pandas
data = pd.read_csv("winequality-red.csv")
```

The first line imports the Pandas library and gives it an Alias called `pd`. Therefore, every time we use `pd`, we will be referring to pandas. The `read_csv` function is used to read a [CSV](https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/) (comma separated values) file and stores the contents in a variable called `data`.

Pandas stores the read data in a data structure called a [Data Frame](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html). According to the official documentation, a data frame is a two-dimensional, size-mutable, potentially heterogeneous tabular data structure that also contains labeled axes (rows and columns).

It is similar to a [2D array](https://www.tutorialspoint.com/python_data_structure/python_2darray.htm) in Python. By "size-mutable", we mean that we can modify the size of the data frame at any time. By "heterogeneous", we mean that it can have data of different [types](https://www.w3schools.com/python/python_datatypes.asp).

In simple terms, a data frame is like a table that contains named columns and rows of data similar to a table in a database. A data frame is powerful and has a lot of built-in functions that allow us to manipulate data. We are going to look at some of these functions. In the example above, the wine dataset is read and stored in a data frame called data.

```python
data.head()

data.columns

data.info()
```

![Data functions](/engineering-education/data-analytics-using-pandas/first.png)

The `head()` function prints the first 5 rows in the dataset by default. If a number 'n' is specified as an argument, it prints the first 'n' rows in the dataset.

The `data.columns` prints a list containing all the column names in the data.

The `info()` function provides useful information about the data such as the number of rows, number of columns, name of each column, and its data type, etc.

```python
# Finding the min and max quality of the wine
print("Wine with maximum quality:",data.quality.max())
print("Wine with minimum wuality:",data.quality.min())

data.quality.head(10)
data.quality.tail(5)
```

![More Functions](/engineering-education/data-analytics-using-pandas/second.png)

In a data frame, we can access individual columns by using the dot(.) operator.

For instance, in the example above, we access the 'quality' column in the data and print the minimum and maximum values. Similarly, we can also access the 'pH' column by typing `data.pH`.

This is another way to access individual columns: `data['quality']`

```python
data.describe()

data['pH'] = data['pH'].values.astype(int)
data.head()
```

![Describe](/engineering-education/data-analytics-using-pandas/third.png)

The `describe()` function provides some statistical measures such as [mean, median](https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-data-statistics/mean-and-median/v/statistics-intro-mean-median-and-mode), [standard deviation](https://www.mathsisfun.com/data/standard-deviation.html), minimum, and maximum values.

![Astype](/engineering-education/data-analytics-using-pandas/fourth.png)

The `astype()` function converts the data from its original type to the one specified in the argument. In the example above, we convert the 'pH' column that has `float` values to integers by specifying `int` as the argument.  

```python
data['good_wine'] = data['quality'] > 5
data['bad_wine'] = data['quality'] <= 5
data.head()

data = data.sort_values('alcohol', ascending=False)
data.head(10)
```

![Quality](/engineering-education/data-analytics-using-pandas/fifth.png)

We created two new columns, 'good_wine' and 'bad_wine' as shown in the example above. The 'good_wine' column will have `True` wherever the 'quality' of the wine is greater than 5. The 'bad_wine' will have `True` wherever the 'quality' is less than or equal to 5.

![Sort](/engineering-education/data-analytics-using-pandas/sixth.png)

The `sort_values()` function sorts the data frame based on the specified column. In the example above, we specify the 'alcohol' column, and the data is sorted based on this column. `ascending=False` tells pandas to sort the data in descending order. This can be set to `True` if you want the data to be sorted in ascending order.

```python
data = data.drop(columns=['good_wine', 'bad_wine'])
data.head()
```

![Drop](/engineering-education/data-analytics-using-pandas/seventh.png)

The `drop()` function can be used to get rid of unwanted columns in the dataset. You can specify a list of columns as an argument, and Pandas will delete all these columns. As you can see in the image above, the 'good_wine' and 'bad_wine' columns have been removed.

### Conclusion and further reading
In conclusion, whether you are a data scientist, data engineer, or a software developer, Pandas is an indispensable part of your toolkit. In this tutorial, we looked at how we can explore the wine dataset and how we can draw insights from it using Pandas and its built-in functions.

Now that we have a better understanding of data analytics basics, you can go to [Kaggle](https://www.kaggle.com/), download any dataset of your choice, and use Pandas to read, explore, and gain insights from the dataset.

You can also go one step further and apply [machine learning](https://www.geeksforgeeks.org/machine-learning/) algorithms to [classify](https://www.simplilearn.com/classification-machine-learning-tutorial) and [predict](https://www.datarobot.com/wiki/prediction-explanations/) values from the dataset.  

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
