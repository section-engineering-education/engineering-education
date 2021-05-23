---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-data-visualization-using-pandas/
title: Getting Started with Data Visualization using Pandas
description: In this tutorial we will go through how to implement different types of plots and charts. Then we'll build a simple app to better understand the need for data visualization.
author: ahmad-mardeni
date: 2020-11-06T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-data-visualization-using-pandas/hero.png
    alt: data visualization Pandas
---
**Data Visualization** is the graphical representation of the data, it is both an art and a science. Nowadays images speak louder than words, and the main use of it is to discover unknown facts and the reasons for a specific result.
<!--more-->
### Introduction
Yale professor [Edward Tufte](https://www.edwardtufte.com/tufte/) believes that excellent data visualizations consist of ‘complex ideas communicated with clarity, precision, and efficiency.’

#### Why should you learn data visualization?
Today more than ever before, organizations are using computer technologies to perform **data visualization** in order to discover new patterns and spot trends. **Data visualization** is changing the way we make sense of the information and create value from it.

In this tutorial, we will go through how to implement different types of plots and charts. Then we'll build a simple app to better understand the need for data visualization.

### Prerequisites
Before we dive right in, the reader would need to have the following:

- A good understanding of the **Python** programming language.
- A basic understanding of the **pandas** library and **data analysis**, you can start with our tutorial [here](/data-analytics-using-pandas/).
- Have **Jupyter notebook** installed, which you can download from [here](https://jupyter.org/install).

### Importing the Dataset
In this tutorial, we are going to use the "Red Wine Quality" dataset which you can download for free from [here](https://www.kaggle.com/uciml/red-wine-quality-cortez-et-al-2009).
After unzipping the file you have to create the python file in the same folder of that dataset.

After importing and performing data analysis on the dataset, we will visualize that data. For more information on the data analysis, you can start [here](https://www.section.io/engineering-education/data-analytics-using-pandas/).

If you don't want to go through our [first tutorial](/data-analytics-using-pandas/#prerequisites) and you feel you have a firm grasp on **data analysis** you can move forward with this tutorial.

```python
import pandas as pd
# read the data using pandas
data = pd.read_csv("winequality-red.csv")
```
### Scatter Plot
In order to know how much one variable is affected by another one, we have to use a **Scatter Plot** that makes points on a horizontal and a vertical axis.

To create a scatter plot we have to call `plot.scatter()` and pass three arguments to it:
1. The X-column.
2. The y-column.
3. The title of the plot.

```python
data.plot.scatter(x='fixed acidity', y='volatile acidity', title='The acidity of the wine')
```
The result will be the following plot:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/scatter_plot.PNG)

### Histogram
The histogram provides the frequency distribution of a data set for you. Histograms are one of the most frequently used methods for charting historical data. It was first introduced by [Karl Pearson](https://en.wikipedia.org/wiki/Karl_Pearson).

In order to make a histogram, we'll use the first five values of the "free sulfur dioxide" column in our dataset for the x-axis and the y-axis will be the number of the values in the x-axis.

```python
data['free sulfur dioxide'].head().hist(bins = 40,color = 'teal')
```

The bins argument is the number of histogram bins to be used, and you can choose whatever color you want by passing the name of it to the color argument.

The result will be:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/histogram.PNG)

You can also create multiple histograms in one line of code.

```python
data.head().plot.hist(subplots=True, layout=(4,3), figsize=(10, 10), bins=20)
```

You can change the dimensions of your figure by changing the arguments of figsize, you can also choose how many histograms you want to show per line by changing the layout arguments.

The result will be a histogram for the first five values of every column in our dataset.

![](/engineering-education/getting-started-with-data-visualization-using-pandas/all_histogram.PNG)

### Line Chart
The main usage of a line chart is to display the change of the data over time.
As an example we'll create a simple chart, we'll use the first five values of the quality column for the y-axis and the x-axis will be the values numbers (it starts from 0 to 4).

```python
data['quality'].head().plot.line(title='quality')
```

The result will be:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/line_chart.PNG)

### Bar Chart
When you have comparative data, the bar chart is the best choice. These bars can be displayed horizontally or vertically and it is very easy to implement.
Let's make a vertical bar chart with our "total sulfur dioxide" column.

```python
data['total sulfur dioxide'].head().plot.bar()
```

The result will be:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/bar.PNG)

To obtain a horizontal bar chart, we modify our code as follows:

```python
data['total sulfur dioxide'].head().plot.barh()
```

Let's create a compound horizontal bar chart. In this example we'll learn how to input data manually:

```python
index = ["USA", "Germany", "France", "UK"]
dataFrame = pd.DataFrame(data = {"Growth rate": [7, 1.6, 1.5, 6.2],
                       "Inflation rate":[3.2, 3.4, 4.5, 2.7]})
dataFrame.index = index
dataFrame.plot.barh(title="Inflation and Growth of the countries")
```

The compound horizontal bar chart is created for two variables, for each one a horizontal bar is drawn in the corresponding category.
The dataFrame index allows you to put strings instead of numeric values in the axis.

Our chart will now look like:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/hbar.PNG)

After learning the basics of **data visualization**, we're going to build a simple real-life application to flush out the idea.

### Let's code!
First of all, we're going to use the "80 Cereals" dataset which you can download from [here](https://www.kaggle.com/crawford/80-cereals).

The CSV file contains the nutritional values for 77 cereal brands.

```python
import pandas as pd
# reading from the dataset
data = pd.read_csv("the path of the file on your desktop\cereal.csv")
```

Let's visualize the protein value for every cereal brand in the dataset.

```python
ax = data.protein.plot.bar(xticks=data.index,rot=90,layout=(4,4),figsize=(30, 10))
```

The xticks argument allows us to put strings instead of numeric values in the x-axis, there is  yticks that you can also use for the y-axis. The rot argument changed the rotation of the names in the x-axis to 90 degrees.

```python
ax.set_xticklabels(data.name)
```

Then we choose the "name" column in the dataset to be the label for the x-axis.

We use `savefig(filename)` to save a high-resolution file on the local system. Saving it locally ensures easier and faster access to the results.

```python
ax.figure.savefig("output.pdf")
```

You can save it as PNG by changing the suffix of the file name.
After running our code you will see the following chart:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/protein_all.png)

As a result, we can conclude that the "Cheerios" and "Special K" brands have a higher value of protein among any of the brands in our dataset, and we can recommend it to the athletes.

You can use the process mentioned above to know which brands have a higher carbo value in order to prevent people who want to lose weight from eating it.

### Wrapping up
Data is a hot topic, people are buying and wearing T-shirts saying "Data Nerd" or "Data is the new bacon".

In the digitalization era, data become cheap and difficult to understand. If it's correctly processed it may be digital gold, and here is where **data visualization** comes into play, it is now one of the most important fields in the **data science** industry.

The possibilities are endless and understanding **data visualization** can keep you ahead of the game.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
