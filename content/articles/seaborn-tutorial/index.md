---
layout: engineering-education
status: publish
published: true
url: /seaborn-tutorial/
title: How to use Seaborn for Data Visualization
description: In this tutorial we will ve working with Seaborn, a Python Library used by data scientists for data visualization. Seaborn is an open-source Python library built on top of matplotlib.
author: rahul-banerjee
date: 2021-01-29T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/seaborn-tutorial/hero.jpg
    alt: UI model using Streamlit image example
---
Data Visualization is the art of representing data in the form of graphs. It is a useful tool for professionals who work with data, i.e., financial analysts, business analysts, data analysts, data scientists, to name a few examples.
<!--more-->
In this tutorial, we will be working with Seaborn, a Python Library.  

### Table of contents
1. Introduction

2. Prerequisites

3. Installing Seaborn

4. Import Seaborn and Load Dataset

5. Different Types of Graphs

6. Visualizing the Pokemon Dataset

7. Conclusion

### Introduction
Seaborn is an open-source Python library built on top of [matplotlib](/matplotlib-visualization-python/). It is used for data visualization and exploratory data analysis. Seaborn works easily with dataframes and the Pandas library. The graphs created can also be customized easily. Below are a few benefits of Data Visualization.

Graphs can help us find data trends that are useful in any machine learning or forecasting project.

- Graphs make it easier to explain your data to non-technical people.

- Visually attractive graphs can make presentations and reports much more appealing to the reader.

This tutorial can be divided into three main parts. The first part will talk about installing seaborn and loading our dataset. In the second part, we will discuss some common graphs in Seaborn. Finally, we will use seaborn and this [Pokemon Data](https://www.kaggle.com/rounakbanik/pokemon) to create some cool graphs.

I will be writing all my code in a Google colab file. You can find it over [here](https://colab.research.google.com/drive/1Kv8B74wBfNhCD232DTnwdOCOJdXn_IxB?usp=sharing).

### Prerequisites
- A good understanding of Python.

- Some Experience working with the Pandas Library.

- Some Experience working with the Matplotlib Library, you can check out the [following article](/matplotlib-visualization-python/).

- A basic understanding of Data Analysis, you can check out the [following article](/data-analytics-using-pandas/).

### Installing Seaborn
If you are working on Google Colab, you can skip the installation step. However, if you are working on your local machine, you will need to install Seaborn. I highly recommend creating a virtual environment to better manage your packages.

```bash
python -m venv venv
venv/Scripts/activate
pip install pandas, matplotlib, seaborn
```

### Import Seaborn and loading dataset
```python
import seaborn as sns
import pandas
import matplotlib.pyplot as plt
```

Seaborn has 18 in-built datasets, that can be found using the following command.

```python
sns.get_dataset_names()
```

We will be using the Titanic dataset for this tutorial.

```python
df = sns.load_dataset('titanic')
df.head()
```

### Different types of graphs
#### Count plot
A count plot is helpful when dealing with categorical values. It is used to plot the frequency of the different categories. The column **sex** contains categorical data in the titanic data, i.e., male and female.

```python
sns.countplot(x='sex',data=df)
```

![image title](/engineering-education/seaborn-tutorial/countplot1.png) 

- **data** - The dataframe.

- **x** - The name of the column.

We can observe from the graph that the number of male passengers is significantly higher than the number of female passengers.

We can further break up the bars in the count plot based on another categorical variable. The color palette of the plot can also be customized.

```python
sns.countplot(x='sex', hue = 'survived', data = df,
palette = 'Set1')
```

![image title](/engineering-education/seaborn-tutorial/countplot2.png) 

- **hue** - The name of the categorical column to split the bars.

- **palette** - The color palette to be used. For a list of color palettes, check out matplotlib's documentation [here](https://matplotlib.org/3.3.3/tutorials/colors/colormaps.html).
  
#### KDE Plot
A Kernel Density Estimate (KDE) Plot is used to plot the distribution of continuous data.

```python
sns.kdeplot(x = 'age' , data = df , color = 'black')
```

![image title](/engineering-education/seaborn-tutorial/kdeplot.png) 

- **data** - The dataframe.

- **x** - The name of the column.

- **color** - The color of the graph. You can find a list of colors [here](https://matplotlib.org/3.1.0/gallery/color/named_colors.html).

The peak of the above graph is in between 20 and 40 so we can conclude that most passengers were between the ages of 20 and 40.

#### Distribution plot
A Distribution plot is similar to a KDE plot. It is used to plot the distribution of continuous data.

```python
sns.displot(x = 'age',kde=True,bins = 5 , data =df)
```

![image title](/engineering-education/seaborn-tutorial/distplot1.png)

- **kde** - It is set to False by default. However, if you wish to plot a KDE graph on top of the bars, you can set it to True.

- **bins** - The number of bins/bars. The lower the number, wider the bars and wider the intervals.

The plot above tells us that most people onboard the titanic were in their mid-twenties.

```python
sns.displot(x ='age',kde=True,bins = 5 ,
hue = df['survived'] , palette = 'Set3', data=df)
```

![image title](/engineering-education/seaborn-tutorial/distplot2.png)

You can also pass **hue** and **palette** as parameters to customize the graph.

Most of the surviving passengers were in their high-twenties.

#### Scatter plot
For this plot and the plots below, we will be working with the iris dataset. The iris dataset contains data related to flower's petal size (petal length and petal width) and sepal size (sepal length and sepal width). 

These features are used to classify the type of iris (Setosa, Versicolour, and Virginica). Below we will try to investigate the relation between the features.

First, we will need to load the iris dataset.

```python
df = sns.load_dataset('iris')
df.head()
```

Scatter plots help understand co-relation between data,

```python
sns.scatterplot(x='sepal_length', y ='petal_length' ,
data = df , hue = 'species')
```

![image title](/engineering-education/seaborn-tutorial/scatterplot.png)

A scatterplot requires data for its **x-axis** and **y-axis**. We can also pass a value for the **hue** parameter to color the dots based on a categorical column.

In the plot above we can observe that an iris flower with a sepal length < 6cm and petal length > 2cm is most likely of type **setosa**. 
Although there is no distinct boundary present between the **versicolor** dots and **virginica** dots, an iris flower with petal length between 2cm and 5cm is most likely of type **versicolor**, while iris flowers with petal length > 5cm are most likely of type **virginica**.

#### Joint plot
A Joint Plot is also used to plot the correlation between data.

```python
sns.jointplot(x='sepal_length' , y ='petal_length',
data = df , kind = 'reg')
```

![image title](/engineering-education/seaborn-tutorial/jointplot.png)

- **kind** - The kind of plot to be plotted. It can be one of the following.

`
'scatter', 'hist', 'hex', 'kde', 'reg', 'resid'
`

#### Pair plots
Seaborn lets us plot multiple scatter plots. It's a good option when you want to get a quick overview of your data.

```python
sns.pairplot(df)
```

![image title](/engineering-education/seaborn-tutorial/pairplot.jpg)

It pairs all the continuous data and plots their correlation. It also plots the distribution of the data.

If you do not wish to pair all the columns, you can pass in two more parameters **x_vars** and **y_vars.**

#### Heatmaps
A heat map can be used to visualize confusion, matrices, and correlation.

```python
corr = df.corr()
sns.heatmap(corr)
```

![image title](/engineering-education/seaborn-tutorial/heatmap1.png)

We can customize the color scheme, the minimum/maximum values, and annotations.

Based on the heatmap we can conclude that sepal length has a high positive correlation with petal length and petal width while sepal width has negative correlation with petal length and petal width.

```python
sns.heatmap(corr, cmap=['red','green','blue'],
vmin = -.5 , vmax = 0.6,annot = True)
```

![image title](/engineering-education/seaborn-tutorial/heatmap2.png)

### Visualizing the Pokemon dataset
You can download the Pokemon dataset from [here](https://www.kaggle.com/rounakbanik/pokemon).

To upload a file to google drive.

```python
from google.colab import files
files.upload()
```

You can skip the step above if you are working on your local machine. Make sure your downloaded file is in the same folder as your Python file.

```python
pokemon_df = pd.read_csv('pokemon.csv')
pokemon_df.head()
```

#### Pokemon type distribution
```python
plt.figure(figsize=(15,8))
sns.countplot(x = 'type1' , data = pokemon_df,
hue = 'is_legendary')
```

![image title](/engineering-education/seaborn-tutorial/pokemon1.png)

Since Seaborn is built on top of matplotlib, we can use matplotlib's function to increase our graph's size. Looking at the graph, we can conclude the Water and Normal are the dominant Pokemon types. We can also conclude that the dominating type for Legendary Pokemons is Psychic.

#### Relation between Attack and Defense

```python
sns.pairplot(x_vars=['attack' , 'defense','sp_attack','sp_defense'] ,
y_vars=['attack' , 'defense','sp_attack','sp_defense'] ,
data = pokemon_df)
```

![image title](/engineering-education/seaborn-tutorial/pokemon2.jpg)

Optionally you can also pass the **hue** parameter to gain more insights.

#### Relation between Height and Weight

```python
sns.jointplot(x = 'weight_kg', y = 'height_m',
data = pokemon_df,hue = 'is_legendary')
```

![image title](/engineering-education/seaborn-tutorial/pokemon3.png)

Based on the graph above, we can conclude that height and weight of a Pokemon do not have any correlation.

Some other plots you could try.

- Distribution of Height/Weight.

- Number of Legendary Pokemon vs. Non-Legendary Pokemon.

- Regression Plot of special attack and special defense.

- Heatmap to show the correlation between features.

### Conclusion
Data Visualization is a good way to present data, and Seaborn is a useful tool to have in your toolbox. Since it is built on top of matplotlib, you can customize your plots the same way you customize plots made using matplotlib.

Happy Coding! 

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
