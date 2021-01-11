
# How to use Seaborn for Data Visualization

Data Visualization is the art of representing data in the form of graphs. It is a useful tool for professionals who work with data, i.e financial analysts, business analysts, data analysts, data scientists, etc.

In this tutorial, we will be working with Seaborn, a Python Library.

  

### Table of Contents

  

1. Introduction

2. Prerequisites

3. Installing Seaborn

4. Import Seaborn and Load Dataset

5. Different Types of Graphs

6. Visualizing the Pokemon Dataset

7. Conclusion

  

---

### Introduction

Seaborn is an open-source Python library build on top of matplotlib. It is used for data visualization and exploratory data analysis. Seaborn works easily with dataframes and the Pandas library. The graphs created can also be customized  easily. Below are a few benefits of Data Visualization

  

- Graphs can help us find trends in data which is really useful in any machine learning or forecasting project.

- Graphs make it easier to explain your data to non-technical people

- Visually attractive graphs can make presentations and reports much more appealing to the reader

  

The tutorial can be divided into three main parts. The first part will talk about installing seaborn and loading our dataset. In the second part, we will discuss some common graphs in Seaborn. Finally, we will use seaborn and the [Pokemon Data](https://www.kaggle.com/rounakbanik/pokemon) to create some cool graphs.

  

I will we writing all my code in a google colab file, you can find it over [here](https://colab.research.google.com/drive/1Kv8B74wBfNhCD232DTnwdOCOJdXn_IxB?usp=sharing)

  

---

### Prerequisites

1. A good understanding of Python

2. Some Experience working with the Pandas Library

3. Some Experience working with the Matplotlib Library, you can check out the [following article](https://www.section.io/engineering-education/getting-started-with-data-visualization-using-pandas/)

4. A basic understanding of Data Analysis, you can check out the [following article](https://www.section.io/engineering-education/data-analytics-using-pandas/)

---

### Installing Seaborn

  

If you are working on Google Colab, you can skip the installation step. However, if you are working on your local machine, you will need to install seaborn. I highly recommend creating a virtual environment to better manage your packages.

  

```bash
python -m venv venv
venv/Scripts/activate
pip install pandas, matplotlib, seaborn
```

---

### Import Seaborn and Load Dataset

```python
import seaborn as sns
import pandas
import matplotlib.pyplot as plt
```

Seabron has 18 in-built datasets, you can list them down by typing the following command.

```python
sns.get_dataset_names()
```

We will be using the titanic dataset for this tutorial

```python
df = sns.load_dataset('titanic')
df.head()
```

---

### Different Types of Graphs

#### Count Plot

A count plot is helpful when dealing with categorical values. It is used to plot the frequency of the different categories. In the titanic data, the column **sex** contains categorical data, i.e male and female.

```python
sns.countplot(x='sex',data=df)
```
![image title](/engineering-education/seaborn-tutorial/countplot1.png) 
- **data** - The dataframe

- **x** - The name of the column

  

We can further break up the bars in the count plot based on another categorical variable. The color palette of the plot can also be customized.

```python
sns.countplot(x='sex', hue = 'survived', data = df,
palette = 'Set1')
```
![image title](/engineering-education/seaborn-tutorial/countplot2.png) 

- **hue** - The name of the categorical column to split the bars

- **palette** - The color palette to be used. For a list of color palettes, check out matplotlib's documentation [here](https://matplotlib.org/3.3.3/tutorials/colors/colormaps.html)
  
#### KDE Plot

A Kernel Density Estimate (KDE) Plot is used to plot the distribution of continuous data.

```python
sns.kdeplot(x = 'age' , data = df , color = 'black')
```
![image title](/engineering-education/seaborn-tutorial/kdeplot.png) 

- **data** - The dataframe

- **x** - The name of the column

- **color** - The color of the graph. You can find a list of colors [here](https://matplotlib.org/3.1.0/gallery/color/named_colors.html)

  

#### Distribution Plot

A Distribution plot is similar to a KDE plot. It is used to plot the distribution of continuous data.

```python
sns.displot(x = 'age',kde=True,bins = 5 , data =df)
```
![image title](/engineering-education/seaborn-tutorial/distplot1.png)
- **kde** - It is set to False by default. However, if you wish to plot a KDE graph on top of the bars, you can set it to True

- **bins** - The number of bins/bars. The lower the number, wider the bards and wider the intervals

```python
sns.displot(x ='age',kde=True,bins = 5 ,
hue = df['survived'] , palette = 'Set3', data=df)
```
![image title](/engineering-education/seaborn-tutorial/distplot2.png)

You can also pass **hue** and **palette** as parameters to customize the graph.

  

#### Scatter Plot
For this plot and the plots below we will be working with the iris dataset. First, we will need to load the iris dataset

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

A scatterplot requires data for its **x axis** and **y axis**. We can also pass a value for the **hue** parameter to color the dots based on a categorical column.

  

#### Joint Plot

A Joint Plot is also used to plot the correlation between data.

```python
sns.jointplot(x='sepal_length' , y ='petal_length',
data = df , kind = 'reg')
```
![image title](/engineering-education/seaborn-tutorial/jointplot.png)

- **kind** - The kind of plot to be plotted. It can be one of the following

'scatter', 'hist', 'hex', 'kde', 'reg', 'resid'

  

#### Pair Plots

Seaborn lets us plot multiple scatter plots. It's a good option when you want to get a quick overview of your data.

```python
sns.pairplot(df)
```

![image title](/engineering-education/seaborn-tutorial/pairplot.png)

It pairs all the continuous data and plots their correlation. It also plots the distribution of the data.

If you do not wish to pair all the columns, you can pass in two more parameters **x_vars** and **y_vars.**

  

#### Heatmaps

A heat map can be used to visualize confusion matrices and correlation.

```python
corr = df.corr()
sns.heatmap(corr)
```
![image title](/engineering-education/seaborn-tutorial/heatmap1.png)

We can customise the color scheme, the minimum and maximum values and annotations.

```python
sns.heatmap(corr, cmap=['red','green','blue'],
vmin = -.5 , vmax = 0.6,annot = True)
```
![image title](/engineering-education/seaborn-tutorial/heatmap2.png)

---

### Visualizing the Pokemon Dataset

You can download the Pokemon dataset from [here](https://www.kaggle.com/rounakbanik/pokemon).

To upload a file to google drive

```python
from google.colab import files
files.upload()
```

You can skip the above step if you are working on your local machine

```python
pokemon_df = pd.read_csv('pokemon.csv')
pokemon_df.head()
```

#### Pokemon Type Distribution

```python
plt.figure(figsize=(15,8))
sns.countplot(x = 'type1' , data = pokemon_df,
hue = 'is_legendary')
```
![image title](/engineering-education/seaborn-tutorial/pokemon1.png)

Since seaborn is built on top of matplotlib, we can matplotlib's function to increase the size of our graph. Looking at the graph, we can conclude the Water and Normal are the domination Pokemon types. We can also cocnlude that the dominating type for Legendary Pokemons is Psychic.

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

Some other plots you could try

- Distribution of Height/Weight

- Number of Legendary Pokemon vs Non-Legendary Pokemon

- Regression Plot of special attack and special defense

- Heatmap to show the correlation between features

  

### Conclusion

Data Visualization is a good way to present data and seaborn is a useful tool to have in your toolbox. Since it is built on top of matplotlib, you can customize your plots the same way you customize plots made using matplotlib.