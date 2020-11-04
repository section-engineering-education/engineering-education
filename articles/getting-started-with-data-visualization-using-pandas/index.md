![](/engineering-education/getting-started-with-data-visualization-using-python/hero.PNG)

# Getting-Started-with-Data-Visualization-using-Pandas
### Introduction
**Data Visualization** is the graphical representation of the data, it is both an art and a science. Nowadays images speak louder than words, and the main use of it is to discover the unknown facts and the reasons for a specific result. Yale professor [Edward Tufte](https://www.edwardtufte.com/tufte/) believes that excellent data visualizations consist of ‘complex ideas communicated with clarity, precision, and efficiency.’

#### Why should you learn data visualization?
Today more than any day ever, organizations are using computer technologies to do **data visualization** in order to make better decisions. **data visualization** is changing the way we make sense of the information to create value out of it, it discovers new patterns and spot trends.

In this tutorial we will go through how to implement different types of plots and charts then we will build a simple app to better understand the need for data visualization.

### Prerequisites
Before we dive right in, the reader would need to have the following:

- Good understanding of **Python** programming language.
- Basic understanding of **pandas** library and **data analyzing**, you can start with our tutorial [here](https://www.section.io/engineering-education/data-analytics-using-pandas/).
- **Jupyter notebook** which you can download form [here](https://jupyter.org/install).

### Importing the Dataset
In this tutorial, we are going to use the "Red Wine Quality" dataset which you can download for free from [here](https://www.kaggle.com/uciml/red-wine-quality-cortez-et-al-2009).
After unzipping the file you have to create the python file in the same folder of that dataset.

Now after importing the dataset, and doing **data analyzing** for it as we saw in our [first tutorial](https://www.section.io/engineering-education/data-analytics-using-pandas/#prerequisites) we are going to visualize that data, even if you don't want to go through our [first tutorial](https://www.section.io/engineering-education/data-analytics-using-pandas/#prerequisites) and you already know **data analyzing** you can follow up with this tutorial.

```python
import pandas as pd
# read the data using pandas
data = pd.read_csv("winequality-red.csv")
```
### Scatter Plot
In order to know how much one variable is affected by another one, we have to use **scatter Plot** which makes points on a horizontal and a vertical axis.

To create a scatter plot we have to call ```plot.scatter()``` and pass three arguments to it:
1. The X-column.
2. The y-column.
3. The title of the plot.

```python
data.plot.scatter(x='fixed acidity', y='volatile acidity', title='The acidity of the wine')
```
The result will be the following plot:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/scatter_plot.PNG)

### Histogram
Now in order to make a histogram, we will use the first five values of the "free sulfur dioxide" column in our dataset for the x-axis and the y-axis will be the number of the values in the x-axis.

```python
data['free sulfur dioxide'].head().hist(bins = 40,color = 'teal')
```
The bins argument is the number of histogram bins to be used, and you can choose whatever color you want by passing the name of it to the color argument.

The result for the above line of code will be:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/histogram.PNG)

Also, you can create multiple histograms in one line of code.

```python
data.head().plot.hist(subplots=True, layout=(4,3), figsize=(10, 10), bins=20)
```
You can change the dimensions of your figure by changing the arguments of figsize, also you can choose how many histograms you want to show per line by changing the layout arguments.

The result will be a histogram for the first five values of every column in our dataset.

![](/engineering-education/getting-started-with-data-visualization-using-pandas/all_histogram.PNG)

### Line Chart
The main usage of a line chart is to display the change of the data over time.
As an example we will create a simple chart, we will use the first five values of the quality column for the y-axis and the x-axis will be the values numbers (it starts from 0 to 4).

```python
data['quality'].head().plot.line(title='quality')
```
The result will be:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/line_chart.PNG)

### Bar Chart
When you have comparative data, the bar chart is the best choice to use, these bars can be displayed horizontally or vertically and it is very easy to implement.
Let's make a bar chart with our "total sulfur dioxide" column.

```python
data['total sulfur dioxide'].head().plot.bar() 
```
The result will be:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/bar.PNG)

Now after learning the basics of **data visualization**, we are going to build a simple real-life app to let you get the idea better.
### Let's code!
First of all, we are going to use the "80 Cereals" dataset which you can download from [here](https://www.kaggle.com/crawford/80-cereals).

After unzipping the file you will find the CSV file for the dataset which contains the nutritional values for 77 cereal brands.
```python
import pandas as pd
# reading from the dataset
data = pd.read_csv("the path of the file on your desktop\cereal.csv")
```
Now let's visualize the protein value for every cereal brand in the dataset.
```python
ax = data.protein.plot.bar(xticks=data.index,rot=90,layout=(4,4),figsize=(30, 10))
```
In the code above we created a bar chart, the xticks argument allows us to put strings instead of numeric values in the x-axis, also there is yticks which you can use for the same purpose for the y-axis, the rot argument changes the rotation of the names in the x-axis to 90 degrees.
```python
ax.set_xticklabels(data.name)
```
Then we choose the "name" column in the dataset to be the label for the x-axis.

The most important thing now is to save the result with high resolution in order to check it whenever you want, by using the ```savefig(filename)``` method.
```python
ax.figure.savefig("output.pdf")
```
Also, you can save it as png just by changing the suffix of the file name.
After running our code you will see the following chart:

![](/engineering-education/getting-started-with-data-visualization-using-pandas/protein_all.png)

As a result, we can know that "Cheerios" and "Special K" brands have a higher value of protein among any brand in our dataset, and we can recommend it to the athletes who want a high amount of protein. You can do the same process above to know the brands which have higher carbo values in order to prevent people who want to lose weight from eating it.

### Wrapping up
Data is a hot topic, people are buying and wearing T-shirts saying "Data Nerd" or "Data is the new bacon", it is true and you can search for it. In the digitalization era data changed from being expensive and hard to collect to cheap and difficult to understand, huge amount of data in big companies like "Google", "Facebook" are waiting to be analyzed and taking advantage of, if it is correctly processed it may be digital gold, and here where **data visualization** comes into play, it is now the most important field after **data analyzing** in the **data science** industry.

The possibilities are endless and **data visualization** can keep you ahead.
