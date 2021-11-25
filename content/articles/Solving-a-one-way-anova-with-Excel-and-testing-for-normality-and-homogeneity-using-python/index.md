Over the years, data has been an essential part of how the world works. These data range from GDP to blood samples to every aspect of the world. As data grew, statistics found ways to make meaning of them. One of them is the Analysis of variance. ANOVA is a set of statistical models that analyses the differences among means.

As we entered more technologically advanced stages, tools were created for ease in analysing this data. For ANOVA, Microsoft came up with statistical add-ins within Excel to solve some of these problems. Though the effort, Microsoft Excel was still limited. There came tools like R-studio and Python. With Python, the test for normality and homogeneity became easy.

This tutorial will focus on creating an ANOVA table using Microsoft Excel, box plots to test the normality of a one way ANOVA and Bartlett's rule for homogeneity with Python.

### Prerequisites
This tutorial requires readers to have proper knowledge on the following:
- Here is a link to the [Analysis of variance (ANOVA)](https://www.investopedia.com/terms/a/anova.asp) documentation.
- [Microsoft Excel](https://www.guru99.com/excel-tutorials.html).
- [Python](https://www.python.org/).
### Goal
At the end of the tutorial, the reader will be able to:
- Use Excel to create an ANOVA table.
- Install necessary Python dependencies to create a box plot.
- Test for normality using a box plot.
- Test for homogeneity using Bartlett's rule.
### Setting up the environment
To get started, we'll need to install Python and some of its dependencies. [Here](https://www.python.org/downloads/) is a link to download the latest Python executable based on your operating system. We must install the following dependencies:
- pandas
- matplotlib
- seaborn
#### Installing pandas, matplotlib, seaborn
There are several methods to install Python dependencies, the most popular being the use of package managers like pip or conda. To install `pandas`, we'll need to:
- Open our terminal (either our ide's terminal or command prompt).

Note! if you are using the command prompt, make sure to add the default folder to PATH.
- Type in the following command;
```bash
python -m pip install pandas
```
Wait a moment till the necessary dependencies are installed. Next, we'll follow the same steps for the other dependencies using the following commands respectively:
```bash
python -m pip install matplotlib
```
```bash
python -m pip install seaborn
```
After installing these dependencies, we'll proceed to the next thing, that is, creating an ANOVA  table with Excel.
### Getting started
#### Creating an ANOVA table with Excel
Microsoft Excels's Analysis Toolpak add-in is a game-changer in statistical Analysis. We'll show you how to create an ANOVA table containing the sum of squares, degree of freedom, mean squares, F value, P-value, F critical.

To perform a one way ANOVA, implement the following step.
- Import your data set in any preferred Excel format.

![data set](/engineering-education/Solving-a-one-way-anova-with-Excel-and-testing-for-normality-and-homogeneity-using-python/data-set.jpg)
- Go to the Data tab, click on the Data Analysis sub-tab. if you can't find the sub-tab, click [here](###analysis-toolpak).
- Select ANOVA: single factor and click ok.
- Click on the input range and highlight the dataset you want to use.

![input range](/engineering-education/Solving-a-one-way-anova-with-Excel-and-testing-for-normality-and-homogeneity-using-python/input-range.jpg)

Note! highlight the numbers in the data set alone.
- You can decide if you want to view it in the same spreadsheet or another spreadsheet.

![result](/engineering-education/Solving-a-one-way-anova-with-Excel-and-testing-for-normality-and-homogeneity-using-python/result.jpg)

In our ANOVA table above, we analysed the sum of squares and other values of the ANOVA. With this, we can solve a one way ANOVA using Microsoft Excel.
#### Analysis toolpak
It is an essential add-in for what we are planning to do. To load the add-in, we'll do the following:
- Click the file button or the Microsoft logo on the top left corner.
- Select Excel options and scroll down to add-ins.
- Out of the list, select Analysis Toolpak and click `Go`.
- Check on Analysis Toolpak and select `Ok`.
- Return to the Data tab, and you'd notice the data analysis sub-tab.
#### Testing for normality using box plots
First, we will create a Python file and import pandas, matplotlib and seaborn into our code. Pandas, Matplotlib & Seaborn are Python libraries for data analysis. Pandas is used in importing a wide variety of data formats, while Matplotlib and Seaborn are visualisation libraries used to generate powerful visualisations. Seaborn is a library that compiles statistical graphics in Python. It uses the matplotlib library.

Next, we'll read our dataset (it will be in CSV file format). Then we will reshape the data frame suitable for the statistical model package and replace the column names. Lastly, we'll generate a boxplot to see the data distribution by treatments.

Note! When reading from a directory, use double backslash or put `r` at the front of the directory address encased in a quote symbol.

![unicode error](/engineering-education/Solving-a-one-way-anova-with-Excel-and-testing-for-normality-and-homogeneity-using-python/unicode-error.jpg)

Below is an implementation of the above instructions:
```Python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
data_set = pd.read_csv(r"C:\Users\DELL\Desktop\Solving-a-one-way-anova-with-Excel-and-testing-for-normality-and-homogeneity-using-python\assignments.csv")
data_set_melt = pd.melt(data_set.reset_index(), id_vars=['index'], value_vars=['A', 'B', 'C', 'D', 'E'])
data_set_melt.columns = ['index', 'treatments', 'value']
ax = sns.boxplot(x='treatments', y='value', data=data_set_melt, color='#99c2a2')
ax = sns.swarmplot(x="treatments", y="value", data=data_set_melt, color='#7d0013')
plt.show()
```
On implementation, our box plot will be as below:

![boxplot](/engineering-education/Solving-a-one-way-anova-with-Excel-and-testing-for-normality-and-homogeneity-using-python/boxplot.jpg)
#### Testing for homogeneity using bartlett's rule
To do this, we'll import scipy.stats and call bartlett's method on our data set.
Example
```Python
A = 7,12,14,19,7
B = 7,17,18,25,10
C = 15,12,18,22,11
D = 11,18,19,19,15
E = 9,18,19,23,11
import scipy.stats as stats 
print(stats.bartlett(A, B, C, D, E))
```
When we run the above code on our terminal, we should have:

![bartlett](/engineering-education/Solving-a-one-way-anova-with-Excel-and-testing-for-normality-and-homogeneity-using-python/bartlett.jpg)
### Conclusion
There are several tests for normality and homogeneity in ANOVA using Python. At the moment, we've learned how to test for normality with box plots and homogeneity with Bartlett's rule. 
### Further reading
- [ANOVA in Python](https://www.marsja.se/four-ways-to-conduct-one-way-anovas-using-python/)
