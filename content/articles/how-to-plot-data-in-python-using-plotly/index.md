---
layout: engineering-education
status: publish
published: true
url: /how-to-plot-data-in-python-using-plotly/
title: How to Plot Data in Python using Plotly
description: This tutorial will guide the reader on how to use Plotly for data visualization. Data visualization is essential when it comes to data science. It is often the first step of any data analysis work.
author: wilkister-mumbi
date: 2021-10-19T00:00:00-13:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-plot-data-in-python-using-plotly/hero.png
    alt: Plotly Image
---
Data visualization is essential when it comes to data science. It is often the first step in any data analysis work. Visualizing data usually gives you an intuitive understanding of data before you get to work on it. 
<!--more-->
Visualization often helps you see some patterns in data that you might not have been able to see otherwise.

In this tutorial, we will use [Plotly](https://pypi.org/project/plotly/) in Python for data visualization. 

### Prerequisites
To understand this tutorial, you'll need to:
- Have Python installed on your computer.
- Use [Jupyter Notebook](https://jupyter.org/) or [Google Colab](https://colab.research.google.com/?utm_source=scs-index). For this tutorial, we will be using Google Colab.

### What is plotly?
Plotly is an open-source framework for data visualization and graphing. It is a great tool to have if you're working on building any analytical presentation or trying to interpret results. It is language-independent. 

Not only can you use it in Python, but also for other languages such as R, MATLAB, Perl, Julia, Arduino, and REST. We'll begin by making a comparison between Plotly and Matplotlib to establish how the two compare.

### Is plotly better than matplotlib?
Plotly and matplotllib are tools used for data visualization. But, they do have their differences.

- Plotly is more focused on the web browser and on building interactive charts, whereas matplotlib is more professional and scientific because it has countless customization options.

- To create good-looking matplotlib charts, you'll need to take some time to write the code required to display the charts. With only a few lines of code, using plotly makes visualizing data easy. You can accomplish the same results with matplotlib, but you'll have to write a lot more code as it is a much more complex process.

So, which is better? It depends on your use case. Plotly is better as it runs on the web browser, it's interactive, and you can quickly visualize your data without writing complex code. 

If your goal is to create more professional and scientific visualizations, choose matplotlib. Using an example dataset, let's learn how you can use this library to visualize data.

#### Creating the data visualization
We need to first install plotly in our Google colab.

```bash
!pip install plotly==5.3.1 
```

```python
import plotly.express as px #for visualization
gapminder_df = px.data.gapminder()
```

Let's take a look at this data.

```python
gapminder_df
```

```bash
    country     continent   year    lifeExp     pop     gdpPercap   iso_alpha   iso_num
0   Afghanistan     Asia    1952    28.801  8425333     779.445314  AFG     4
1   Afghanistan     Asia    1957    30.332  9240934     820.853030  AFG     4
2   Afghanistan     Asia    1962    31.997  10267083    853.100710  AFG     4
3   Afghanistan     Asia    1967    34.020  11537966    836.197138  AFG     4
4   Afghanistan     Asia    1972    36.088  13079460    739.981106  AFG     4
...     ...     ...     ...     ...     ...     ...     ...     ...
1699    Zimbabwe    Africa  1987    62.351  9216418     706.157306  ZWE     716
1700    Zimbabwe    Africa  1992    60.377  10704340    693.420786  ZWE     716
1701    Zimbabwe    Africa  1997    46.809  11404948    792.449960  ZWE     716
1702    Zimbabwe    Africa  2002    39.989  11926563    672.038623  ZWE     716
1703    Zimbabwe    Africa  2007    43.487  12311143    469.709298  ZWE     716
```

Looking at these numbers, we would need to visualize this data so that someone can interpret and understand the data quickly. It is also aesthetically pleasing. As such, let's create the data visualization using interactive animations to help us visualize this data.

```python
px.scatter(data_frame=gapminder_df,
            x = 'gdpPercap',
            y = 'lifeExp',
            size = 'pop',
            color = 'continent',
            title = 'Life Span and Wealth 1952 - 2007',
            labels = { 'gdpPercap': 'Wealth',
                        'lifeExp': 'Life Span'}, 
            log_x = True,
            range_y = [25,95],
            hover_name = 'country',
            animation_frame = 'year',
            height = 600,
            size_max = 100)
```

Explaining this block of code:

-  `x = 'gdpPercap'` and  `y = 'lifeExp'` tells us what we want our `x` and `y` coordinates to be. The x-axis will represent the gdpPercap which has been assigned the label `Wealth`, while the y axis will represent the life expectancy assigned to the label `Life Span`.
- `color = 'continent',` tells plotly that we want each continent to have a different color.
- `title = 'Life Span and Wealth 1952 - 2007',` is the title of our visualization. You can change it to whichever title fits you best.
- `log_x = True,` converts the scale on the x-axis to be a log scale the distribution as it is is quite wide.
- `range_y = [25,95],` constrains the range on the y-axis to between 25 and 95 years.
- `hover_name = 'country',` tells us that when we hover our mouse on the circles, we want it to tell us which country it represents. 
- `height = 600,` tells plotly to adjust the size of the plot to 600px and `size_max = 100` to adjust the size of each point to 100px.

Now, let's take a look at our output when we run the code.

![Output](/engineering-education/how-to-plot-data-in-python-using-plotly/plotly-output-52.png)

The above image shows the distribution of wealth in the year 1952.

![Output](/engineering-education/how-to-plot-data-in-python-using-plotly/plotly-output-07.png)

The images above shows the distribution of wealth from the year 1952 to 2007. Initially, Africa and Asia had a population with the least wealth in the world. Gradually, more Asian people gained wealth and leapfrogged Africans. 

The results also show that most of the wealth by 2007 was concentrated among the Europeans, Oceanians, and Americans. You can zoom in and out using your mouse cursor to view individual points on the plot. Press the play button and see how the distribution shifts from 1952-2007. 

We used interactive animations to help us achieve our goal. There are many other ways you can visualize using plotly. This could be using line charts, bar charts, pie charts, interactive bubble charts, and choropleth. Explore more techniques [here](https://www.kaggle.com/jhossain/explore-the-gapminder-dataset-with-plotly-express).

Using the same dataset, let's plot using choropleth.

```python
px.choropleth(data_frame=gapminder_df,
             locations='iso_alpha', 
             color='gdpPercap', 
             title = 'Life Span and Wealth (1952 - 2007) using cloropleth',
             hover_name='country', 
             animation_frame='year', 
             height = 600,
             color_continuous_scale=px.colors.sequential.Plasma, 
             projection='natural earth')
```

![Plotting using choropleth (1952)](/engineering-education/how-to-plot-data-in-python-using-plotly/chloropleth-output-52.png)

The image shows the distribution of wealth in the year 1952 using choropleth projected on natural earth.

![Plotting using choropleth (2007)](/engineering-education/how-to-plot-data-in-python-using-plotly/chloropleth-output-07.png)

We see the distribution of wealth in the year 2007 using choropleth projected on natural earth.

Choropleth maps are best suited for use when you're working with only one variable. For example, the difference between two variables (e.g. the change of the unemployment rate from last year to this year). 

But if you want to show the correlation between values with more than one variable, choropleth maps might not be your best choice. Consider using a scatterplot instead.

Please find all the code for this tutorial [here](https://colab.research.google.com/drive/1mz0GthxE2FektPON4ZnkSUvO8Otf1Ix1#scrollTo=X0vwv1kIXHBn) and see how the distribution of wealth compares by continent from the year 1952 to 2007.

### Wrapping up
With a few lines of code, you can plot data in Python using plotly. I challenge you to find some datasets to try this with. Enjoy visualizing your data in a fun and impactful way. 

Happy coding!

### References
- [Plotly](https://pypi.org/project/plotly/)
- [Complete code](https://colab.research.google.com/drive/1mz0GthxE2FektPON4ZnkSUvO8Otf1Ix1#scrollTo=X0vwv1kIXHBn)
- [Explore the Gapminder Dataset with Plotly Express](https://www.kaggle.com/jhossain/explore-the-gapminder-dataset-with-plotly-express)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
