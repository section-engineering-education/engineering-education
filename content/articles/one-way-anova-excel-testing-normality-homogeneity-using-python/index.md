---
layout: engineering-education
status: publish
published: true
url: /one-way-anova-excel-testing-normality-homogeneity-using-python/
title: Solving a One Way ANOVA with Excel using Python
description: In this article, we will be creating an ANOVA table using Microsoft Excel, box plots to test the normality of a one-way ANOVA, and Bartlett's rule for homogeneity with Python.
author: kuteyi-victor-toluwase
date: 2021-12-08T00:00:00-11:40
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/one-way-anova-excel-testing-normality-homogeneity-using-python/hero.jpg
    alt: One Way ANOVA with Excel using Python example image
---
Over the years, data has been an essential part of how the world works. This data can range from GDP to blood samples to every aspect of the world. As our data grew, statistics found ways to extract more meaning from them. 
<!--more-->
One of these methods is known as Analysis of variance (ANOVA). ANOVA is a set of statistical models that analyses the differences among means. Microsoft came up with statistical add-ins within Excel to solve these problems. However, Microsoft Excel is still somewhat limited. Later came tools like R-studio and Python. 

With Python, the test for normality and homogeneity became easier. This tutorial will focus on creating an ANOVA table using Microsoft Excel, box plots to test the normality of a one-way ANOVA, and Bartlett's rule for homogeneity with Python.

### Prerequisites
This tutorial requires readers to have proper knowledge on the following:
- Analysis of variance (ANOVA). Here's a [link](https://www.investopedia.com/terms/a/anova.asp) to their documentation.
- [Microsoft Excel](https://www.guru99.com/excel-tutorials.html).
- [Python](https://www.python.org/).

### Goal
At the end of the tutorial, the reader will be able to:
- Use Excel to create an ANOVA table.
- Install necessary Python dependencies to create a box plot.
- Test for normality using a box plot.
- Test for homogeneity using Bartlett's rule.

### Setting up the environment
We'll need to install Python and some of its dependencies to get started. [Here](https://www.python.org/downloads/) is a link to download the latest Python executable based on your operating system. 

We need to install the following dependencies:
- pandas
- matplotlib
- seaborn

#### Installing pandas, matplotlib, seaborn
There are several methods to install Python dependencies, the most popular being the use of package managers like pip or conda. 

To install `pandas`, we'll need to:
- Open our terminal (either our IDE's terminal or command prompt).

>Note: If you are using the command prompt, make sure to add the default folder to PATH.

- Type in the following command:
```bash
python -m pip install pandas
```

Wait a moment until the dependency is installed. Next, we'll follow the same steps for the other dependencies using the following commands respectively:

```bash
python -m pip install matplotlib
```

```bash
python -m pip install seaborn
```

After installing these dependencies, we'll create an ANOVA table with Excel.

### Getting started
#### Creating an ANOVA table with Excel
Microsoft Excels's Analysis Toolpak add-in is a game-changer in statistical Analysis. We'll show you how to create an ANOVA table containing the sum of squares, degree of freedom, mean squares, F value, P-value, F critical.

To perform a one-way ANOVA, implement the following step.
- Import your data set in any preferred Excel format.

![data set](/engineering-education/one-way-anova-excel-testing-normality-homogeneity-using-python/data-set.jpg)

- Go to the Data tab, click on the Data Analysis sub-tab. If you can't find the sub-tab, check the subheading beneath.
- Select ANOVA: single factor and click ok.
- Click on the input range and highlight the dataset you want to use.

![input range](/engineering-education/one-way-anova-excel-testing-normality-homogeneity-using-python/input-range.jpg)

>Note: Highlight the numbers in the data set alone.

- You can decide if you want to view it in the same spreadsheet or another spreadsheet.

![result](/engineering-education/one-way-anova-excel-testing-normality-homogeneity-using-python/result.jpg)

In our ANOVA table above, we analyzed the sum of squares and other values of the ANOVA. With this, we can solve a one-way ANOVA using Microsoft Excel.

#### Analysis toolpak
The analysis toolpak is an essential add-in for what we are trying to do. To load the add-in, we'll do the following:
- Click the file button or the Microsoft logo on the top left corner.
- Select Excel options and scroll down to add-ins.
- Out of the list, select Analysis Toolpak and click `Go`.
- Check on Analysis Toolpak and select `Ok`.
- Return to the Data tab, and you'll notice the data analysis sub-tab.

#### Testing for normality using box plots
We'll create a Python file and import [Pandas](/engineering-education/search/?q=pandas), [Matplotlib](/engineering-education/search/?q=Matplotlib), and [Seaborn](/engineering-education/search/?q=Seaborn) into our code. Pandas, Matplotlib & Seaborn are Python libraries used for data analysis. 

These libraries are of great importance in data visualization. Pandas imports tons of data formats, while Matplotlib and Seaborn are visualization libraries used to generate powerful visualizations. Seaborn is a library that compiles statistical graphics in Python.

Next, we'll read our dataset using the `read()` method from the pandas library (we used a CSV file format). We will reshape the data frame suitable for the statistical model package using the `melt()` method and replace the column names in the line below it from the pandas library. 

Then, we'll generate a boxplot to see the data distribution by treatments using our seaborn tool and `plt.show()` function to display our box plot.

>Note: When reading from a directory, use double backslash or put `r` at the front of the directory address encased in a quote symbol.

![unicode error](/engineering-education/one-way-anova-excel-testing-normality-homogeneity-using-python/unicode-error.jpg)

Below is an implementation of the instructions above:

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
data_set = pd.read_csv(r"C:\Users\DELL\Desktop\one-way-anova-excel-testing-normality-homogeneity-using-python\assignments.csv")
data_set_melt = pd.melt(data_set.reset_index(), id_vars=['index'], value_vars=['A', 'B', 'C', 'D', 'E'])
data_set_melt.columns = ['index', 'treatments', 'value']
ax = sns.boxplot(x='treatments', y='value', data=data_set_melt, color='#99c2a2')
ax = sns.swarmplot(x="treatments", y="value", data=data_set_melt, color='#7d0013')
plt.show()
```

On the implementation, the plot is shown below:

![boxplot](/engineering-education/one-way-anova-excel-testing-normality-homogeneity-using-python/boxplot.jpg)

#### Testing for homogeneity using Bartlett's rule
Before we show the process involved, we'll talk a bit about this rule. [Maurice Stevenson Bartlett](https://en.wikipedia.org/wiki/M._S._Bartlett) invented the rule. It is a procedure used to check if samples drawn from different populations have the same variances. 

It tests the assumption that differences in group sizes are equal across groups. The conventional structure of this test involves:
- Creating a hypothesis (null and alternate).
- Calculating the test statistic.
- Finding the critical value.
- Concluding.

Good news! Python has compiled these processes into a short line of code. To do this, we'll import `scipy.stats` and call Bartlett's method on our data set.

#### Example

```python
A = 7,12,14,19,7
B = 7,17,18,25,10
C = 15,12,18,22,11
D = 11,18,19,19,15
E = 9,18,19,23,11

import scipy.stats as stats 

print(stats.bartlett(A, B, C, D, E))
```

When we run the code above on our terminal, we should get:

![bartlett](/engineering-education/one-way-anova-excel-testing-normality-homogeneity-using-python/bartlett.jpg)

### Conclusion
We can conduct several tests for normality and homogeneity in ANOVA using Python. In this article, we've learned how to test for normality with box plots and homogeneity with Bartlett's rule. 

Happy coding!

### Further reading
- [ANOVA in Python](https://www.marsja.se/four-ways-to-conduct-one-way-anovas-using-python/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
