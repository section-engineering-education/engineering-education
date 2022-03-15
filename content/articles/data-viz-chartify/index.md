---
layout: engineering-education
status: publish
published: true
url: /data-viz-chartify/
title: Data Visualization with Chartify
description: Chartify is an open-source data visualization library from Spotify that makes it easy for data analysts to create charts and graphs. This article gives a brief introduction to this technology. 
author: benedict-ifeanyi-iheagwara
date: 2022-01-28T00:00:00-10:57
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-viz-chartify/hero.png
    alt: Data visualisation with Chartify Hero Image
---
Although Chartify isn't the new kid on the block, many data scientists are still unfamiliar with it. That's a bummer, considering that it was developed to make data visualization easier for data scientists and is more 'intuitive' than other Python charting libraries.

Data visualization is an important aspect of data analytics since it allows you to communicate information to shareholders in a visually appealing and understandable way.
<!--more-->

In this article, we'll learn how to visualize datasets with Chartify. This article will follow a very clear structure, starting with an overview of Chartify to what distinguishes it from other charting libraries, and ending with a demonstration of Chartify in action.

### Table of content
1. [Prerequisites](#prerequisites)
2. [What is Chartify?](#what-is-chartify)
3. [What makes Chartify ‘intuitive’?](#what-makes-chartify-intuitive)
4. [Installing Chartify](#installing-chartify)
5. [Importing Chartify](#importing-chartify)
6. [Loading the dataset](#loading-the-dataset)
7. [Problem Encounter while using Chartify](#problem-encounter-while-using-chartify)
8. [Data Visualization using Chartify](#data-visualization-using-chartify)
9. [Pokemon type distribution](#pokemon-type-distribution)
10. [Number of Pokemon in each generation](#number-of-pokemon-in-each-generation)
11. [Number of Pokemon of each type in each generation](#number-of-pokemon-of-each-type-in-each-generation)
12. [Pokemon Type Combination](#pokemon-type-combination)
13. [Pokemon Weight distribution](#pokemon-weight-distribution)
14. [Conclusion](#conclusion)
15. [Resources](#resources)


### Prerequisites
To follow along with this article, you should have a:
- Basic knowledge of Python.
- Basic knowledge in using Jupyter Notebooks or any other notebook-based technology. I would recommend Jupyter notebook or Google Colab for data visualization. However, for this tutorial, we will be using [Jupyter](https://jupyter.org/).

### What is Chartify?
According to the documentation, [Chartify](https://chartify.readthedocs.io/en/latest/) is a Python library that aims to make it easy for data scientists to create charts. This open-source library was introduced to the world in this article by [Spotify Lab](https://engineering.atspotify.com/2018/11/15/introducing-chartify-easier-chart-creation-in-python-for-data-scientists/), as a means for you and I to build visually appealing charts using Python.

The library was built on [Bokeh](https://docs.bokeh.org/en/latest/docs/user_guide/styling.html). Bokeh is a Python visualization framework that is JavaScript-based. Bokeh can be used to generate interactive visualizations for modern web browsers. You can use Bokeh to generate JavaScript-powered visualizations without having to write any JavaScript. I am sure you know what that means for Chartify... Yeah, you got it! Fantastic visuals.

![Introduction to Chartify](/engineering-education/data-viz-chartify/chartifydoc.png)

*Screenshot by author*

But, with so many Python libraries available for data visualization, such as Matplotlib, Seaborn, Plotly, Ggplot2, D3, and Bokeh, what sets Chartify apart?

### What makes Chartify ‘intuitive’?

It was observed that data scientists spend a lot of time customizing various details when using most of the other libraries to create charts. You’ll frequently find yourself spending hours on StackOverflow troubleshooting and writing a lot of code simply to get your charts to work. The main intent behind the creation of Charity was to solve this problem.

*Chartify is giving you the ability to create charts with only a few lines of code and little customization.*

This isn't to say you won't be able to make changes to your charts. Chartify like I earlier mentioned was built on top of Bokeh, so you can use Bokeh’s API and customize as you please. Chartify also makes data plotting and data frame manipulation simple, even when you have different input and data types.

Let's see how Chartify can help you visualize your data, but first, let's get it installed.

### Installing Chartify

All code used for this project is available on [GitHub](https://github.com/Bennykillua/Project/blob/main/Data%20visualization%20using%20Charify/Chartify.ipynb).

If you are working on your local machine, you will need to install Chartify. I highly recommend creating a [virtual environment](https://www.section.io/engineering-education/introduction-to-virtual-environments-and-dependency-managers/) to better manage your packages. But for this article, I would only be using Jupyter notebook. Let's open our notebook.

Chartify can be installed by running the code below:

```python 
pip install chartify
```
If you're using the Jupyter notebook and want to install a package with `pip`, you might have tried to run `pip` directly in the shell. However, this might not generally work. Thus, you can use the code snippet below:

```python
Import sys
!{sys.executale} -m pip install chartify
```
The library requires a ChromeDriver to generate a PNG output. You can download it from [the Chrome Website](https://sites.google.com/a/chromium.org/chromedriver/home). After downloading, you need to install it and copy it into the appropriate directory. This article will show you [how to add executables to your Windows PATH](https://medium.com/@kevinmarkvi/how-to-add-executables-to-your-path-in-windows-5ffa4ce61a53).

### Importing Chartify

```python 
import numpy as np
import pandas as pd
import chartify
```
Pandas is a Python library that is required for data cleaning and manipulation, while Numpy is a Python library for scientific computing. 

### Loading the dataset

Chartify comes with an in-built dataset. Run the code below to access it. 

```python
data = chartify.examples.example_data()
data.head()
```
However, for this tutorial, we are going to make use of the [complete Pokemon dataset](https://www.kaggle.com/rounakbanik/pokemon) which you can download for free from Kaggle. After unzipping the file, you should create a python file on your local machine in the same folder as your dataset. 

This dataset was also used in this tutorial piece on [Seaborn](https://www.section.io/engineering-education/seaborn-tutorial/). We would reproduce some of the graphs from the article and add other charts.

Now let us read and display the dataset by running the code below.

```python
pokemon_df = pd.read_csv('pokemon.csv')
pokemon_df.head(5)
```
We will check our column using the `.columns` and add an `s/n` column using the code snippet below.

```python
pokemon_df.columns
pokemon_df.insert(loc =0, column = 's/n',value = np.arange(len(pokemon_df)))
```
### Problem may encounter you while using Chartify
While working with Charify, I discovered a problem. I was unable to display my chart. 

When I ran my codes for the first time, I got an error message. If we take a look at the error message, we will see it was a compatibility issue. The latest version of ChromeDriver available only supports Chrome version 93 and my current Chrome browser version is 96.0.4664.45. 

![Error message](/engineering-education/data-viz-chartify/errormessage.png)

*Screenshot by author*

Why was this affecting chartify’s ability to display the visual? This is because like I mentioned earlier, ChromeDriver is needed for our PNG output (Visual). To resolve this problem, we will need to downgrade our Chrome browser. This can be achieved in 3 easy steps:

- **Step 1**: Uninstall Chrome.
- **Step 2**: Download Older Chrome Version. You can get this from sites like [FileHippo](https://www.slimjet.com/chrome/google-chrome-old-version.php) and [SlimJet](https://filehippo.com/download_google-chrome/history/) since there is an official repository hosting older builds of Chrome browser.
- **Step 3**:  Disable Chrome Auto-Updates. 

You can get a more detailed step-by-step tutorial here: [How to Downgrade and Install Older Versions of Chrome?](https://browserhow.com/how-to-downgrade-and-install-older-version-of-chrome/).

### Data Visualization using Chartify

To get started with our charts plotting, type and run the below code snippet.

```python
ch = chartify.Chart()
ch.show()
```
The code we just ran will give us the output below. 

![Chartify](/engineering-education/data-viz-chartify/chartifyone.png)

*Screenshot by author*

Chartify makes it relatively easy for first-timers to get started. That's an amazing thing about it. This empty chart that got displayed shows users of the library how they can fill the chart with data. 

Let’s visualize the Pokemon type distribution using a bar chart.

### Pokemon type distribution

A bar chart represents data by using bars of different heights. We would use one to see the distribution of the various Pokemon types. First, we need to create a data frame by grouping the Pokemon type 1 and its generation. This can be done using the code snippet below:

```python
bar_data = (pokemon_df.groupby('type1')[['generation']].sum()
            .reset_index()
           )
bar_data
```
Next, we would visualize this data frame. 

```python
ch = chartify.Chart(blank_labels=True, x_axis_type='categorical')
ch.set_title("Pokemon EDA using Chartify")
ch.set_subtitle("Pokemon type distribution")
ch.plot.bar(
        data_frame=bar_data,
        categorical_columns=['type1'],
        numeric_column='generation')
ch.show()
```
The first few arguments that we passed are `.set_title` and `.set_subtitle` which are for your chart title and subtitle. You can specify a name for your x and y axes using `.axes.set_xaxis_label` and `.axes.set_yaxis_label` respectively. The last argument, `.plot.bar` requires your data_frame which is the data to be plotted. The other parameters define the categorical and numerical columns you want to plot. 

![Chartify](/engineering-education/data-viz-chartify/chartifytwo.png)

*Screenshot by author*

Next, let’s look at the Pokemon type distribution, but this time considering the `is_legendary` attribute of each Pokemon. We would also start by creating a data-frame of the data needed. We can achieve this by grouping our Pokemon by the `type1` and `is_legendary` columns. This can be done by running the code snippet below:

```python
Pokemon_type_distribution = (pokemon_df.groupby(['type1','is_legendary'])['s/n'].sum().reset_index())
print(Pokemon_type_distribution.head())
```
Then we would visualize this data with Chartify by running the code below:

```python
ch = chartify.Chart(blank_labels=True, x_axis_type='categorical')
ch.set_title("Pokemon EDA using Chartify")
ch.set_subtitle("Pokemon type distribution")
ch.plot.bar(
        data_frame=Pokemon_type_distribution,
        categorical_columns=['type1', 'is_legendary'],
        numeric_column='s/n', color_column='is_legendary')
ch.show()
```
![Chartify](/engineering-education/data-viz-chartify/chartifythree.png)

*Screenshot by author*

### Number of Pokemon in each generation

Let's take a look at the number of Pokemon in each generation. We would extract this data from the Pokemon data by running the code snippet below.

```python
generations = pd.DataFrame ({'count': pokemon_df.generation.value_counts().sort_index()})
generations['generation'] = generations.index.get_level_values(0)
generations
```

Next, we would run a code snippet like the one we ran for the previous bar chart.

```python
ch = chartify.Chart(blank_labels=True, x_axis_type='categorical')
ch.set_title("Pokemon EDA using Chartify")
ch.set_subtitle("Number of Pokemon in Each Generation")
ch.plot.bar(data_frame=generations, categorical_columns='generation', 
                             numeric_column='count',color_column='generation')
ch.style.color_palette.reset_palette_order()
ch.plot.text(
        data_frame=generations,
        categorical_columns='generation',
        numeric_column='count',
        text_column='count',
        color_column='generation')
ch.show()
```
The `color_column` parameter gives your plot a color-based argument that colors the plot of the basis of the column specified. In our graph, Chartify will assign different colors to the different generations because we set `color_column` to be the column `generation`.

![Chartify](/engineering-education/data-viz-chartify/chartifyfour.png)

*Screenshot by author*

### Number of Pokemon of each type in each generation

Let us try out a line graph. We would use our knowledge of Python to extract our data from our Pokemon data. We would start by getting a count of each type.

```python
data2 = pokemon_df[pokemon_df.type2.notna()].copy()
data2.type1 = data2.type2
type_data = pd.concat ([pokemon_df, data2])

#get a count for each type
type_count = type_data.type1.value_counts()
type_count = pd.DataFrame ({'count': type_count})
type_count
```

Next, we will create a dataset that has the total for each Pokemon type for each generation by using the `.groupby` and `.value_counts` function.

```python
generations_types = type_data.groupby (['generation']).type1.value_counts()
generations_types = pd.DataFrame ({'count': generations_types})
generations_types['generation'] = generations_types.index.get_level_values(0)
generations_types['type'] = generations_types.index.get_level_values(1)
generations_types.reset_index(drop = True, inplace = True)
generations_types
```
Now we visualize our data by plotting the line graph using chartify `.plot.parallel` function.

```python
ch = chartify.Chart(blank_labels=True, x_axis_type='categorical')
ch.set_title("Pokemon EDA using Chartify")
ch.set_subtitle("Number of Pokemon of Each Type in Each Generation")
ch.plot.parallel(
        data_frame=generations_types,
        categorical_columns='generation',
        numeric_column='count',
        color_column='type')
ch.show()
```
Just like the bar charts, the line graph takes a data_frame argument for our data. We will also specify the `categorical_column`, `numeric_column`, and `color_column` in the same way as we did in the bar chart. After that, we run the code, and our output is displayed.

![Chartify](/engineering-education/data-viz-chartify/chartifyfive.png)

*Screenshot by author*

We can reproduce this data in a lollipop chart.  

*A lollipop chart is a variation of a bar chart in which the bar has been replaced with a line with a dot at the end, just like a lollipop.* 

Lollipop plots are great when trying to make comparisons between objects or categories. The lollipop chart also requires the same arguments as the bar and line charts. The `axes.set_xaxis_tick_orientation` allows us to set an orientation.

```python
ch = chartify.Chart(blank_labels=True, y_axis_type='categorical')
ch.set_title("Pokemon EDA using Chartify")
ch.set_subtitle("Number of Pokemon of Each Type in Each Generation using a Lollipop chart")
ch.plot.lollipop(
        data_frame=generations_types,
        categorical_columns=['generation','type'],
        numeric_column='count',
        color_column='generation')
ch.axes.set_xaxis_tick_orientation('horizontal')
ch.show()
```

![Chartify](/engineering-education/data-viz-chartify/chartifysix.png)

*Screenshot by author*

### Pokemon Type Combination

We would plot a heatmap to see the Pokemon type combination. Just as we did for the other visualizations, we would create a data frame. 

```Python
type_combos= (pokemon_df.groupby(['type1', 'type2'])['generation'].mean().reset_index())
```
And we would use the `.plot.heatmap` to create the heatmap. 

```python
ch = chartify.Chart(blank_labels=True, x_axis_type='categorical', y_axis_type='categorical')
ch.plot.heatmap(
        data_frame=type_combos,
        x_column='type1',
        y_column='type2',
        color_column='generation',
        text_column='generation',
        text_color='white')
ch.axes.set_xaxis_label('type1')
ch.axes.set_yaxis_label('type2')
ch.set_title('Pokemon EDA using Chartify')
ch.set_subtitle("Pokemon Type Combinations: Heatmap")
ch.show()
```

![Chartify](/engineering-education/data-viz-chartify/chartifyseven.png)

*Screenshot by author*

### Pokemon weight distribution

Let’s have a look at our Pokemon weight. This will be displayed in a histogram. In the `weight_kg` column, there were nan values. We will have to fill it. For this article, we would fill it with `0`.

```python
pokemon_df['weight_kg'] = pokemon_df['weight_kg'].fillna(0)
```

After that, we will plot our histogram.

```python
ch = chartify.Chart(blank_labels=True, y_axis_type='density')
ch.set_title("Pokemon EDA using Chartify")
ch.set_subtitle("Distribution of Weight: Histogram")
ch.plot.histogram(data_frame=pokemon_df, values_column='weight_kg',bins=50)
ch.show()
```
![Chartify](/engineering-education/data-viz-chartify/chartifyeight.png)

*Screenshot by author*

### Conclusion 

Data visualization is essential for gaining insight into large datasets. And Chartify ensures you get it done with less code. We hope that this post will help you get a feel of how you can use Chartify for data visualization. 

Finally, if you want to take a look at the code used in this post, you can find it [here](https://github.com/Bennykillua/Project/blob/main/Data%20visualization%20using%20Charify/Chartify.ipynb).

Happy coding!

### Further reading
- [Chartify’s documentation](https://chartify.readthedocs.io/en/latest/)
- [Chartify data visualization](https://www.geeksforgeeks.org/data-visualisation-with-chartify/)

---
Peer Review Contributions by: [Bonface Muriithi](/engineering-education/authors/bonface-muriithi)