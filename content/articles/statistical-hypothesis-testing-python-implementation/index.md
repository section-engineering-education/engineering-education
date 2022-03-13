---
layout: engineering-education
status: publish
published: true
url: /statistical-hypothesis-testing-python-implementation/
title: Statistical Hypothesis Testing with Python Implementation
description: This tutorial is a comprehensive explanation and implementation of statistical hypothesis testing methods in Python.
author: qoyum-yusuf
date: 2021-09-16T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

- url: /engineering-education/statistical-hypothesis-testing-python-implementation/hero.PNG
  alt: statistic hypothesis testing with Python cover image
---
Hypothesis testing is the analysis of assumptions on a population sample. In other words, it involves checking whether a hypothesis should be accepted or not.
<!--more-->
Hypothesis testing has improved decision-making in different sectors including business. Today, organizations rely on hypothesis testing because of the enormous amount of data generated across the globe.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Goal](#goal)
3. [Understanding hypothesis testing](#understanding-hypothesis-testing)
4. [Confidence of null hypothesis](#confidence-of-null-hypothesis)
5. [Statistical techniques for hypothesis testing](#statistical-techniques-for-hypothesis-testing)
6. [Chi-square test with Python implementation](#chi-square-test-with-python-implementation)
7. [T-Test with Python implementation](#t-test-with-python-implementation)
8. [ANOVA with Python implementation](#anova-with-python-implementation)
9. [Conclusion](#conclusion)
10. [Additional resources](#additional-resources)

### Prerequisites
To follow along, readers should have some basic knowledge of Python programming. They should also understand how to perform data analysis using [Pandas](https://pandas.pydata.org/) and [Numpy](https://numpy.org/).

### Goal
At the end of this tutorial, readers should be able to:
- understand statistical hypothesis testing,
- perform t-test, chi-squared test & ANOVA using Python and a new dataset,
- differentiate between the two types of null hypothesis errors,
- explain the confidence of the null hypothesis,
- use Pandas functions for data analysis, and
- identify the best areas to apply t-test, chi-square test, and ANOVA test.

### Understanding hypothesis testing
The two types of hypothesis testing are null hypothesis and alternate hypothesis.

[Null hypothesis](https://en.wikipedia.org/wiki/Null_Hypothesis:_The_Journal_of_Unlikely_Science) is the initial assumption about an event (also referred to as the ground truth).


[Alternate hypothesis](https://en.wikipedia.org/wiki/Alternative_hypothesis) is an assumption that counters the initial assumption.

Consider a situation where a seventy-year-old woman has a visible bump in her belly. Medical officers may assume that the bump is fibroid.


In this case, our initial conclusion (or our null hypothesis) is that she has a fibroid while our alternate hypothesis is that she does not have a fibroid.

To carry out hypothesis testing, we will refer to the null hypothesis (initial assumption) as the H0 hypothesis and the alternate hypothesis (counter assumption) as the H1 hypothesis.

The follow-up action is to collect the available data samples to support the null hypothesis.

We should collect data pertaining to the hypothesis and analyze it to decide if H0 can be accepted or rejected.

While doing that, there is a likelihood of the following events happening:

1. The ground truth (H0) is true, so H0 is accepted.

2. The ground truth (H0) is not true, so H0 is rejected and H1 is accepted.

The above two cases are the desired possibilities. It's either our null hypothesis was right and adopted or our null hypothesis was wrong and rejected.

The remaining possibilities are outlined below:

3. Null hypothesis (H0) is true but we reject it.

4. Null hypothesis (H0) is not true, but we did not reject it.

These cases are not desirable since we have not recognized the right hypothesis.

[Type-1 error](https://www.thoughtco.com/difference-between-type-i-and-type-ii-errors-3126414) occurs when we reject the null hypothesis even though it was true.


[Type-2 error](https://www.ssc.wisc.edu/~gwallace/PA_818/Resources/Type%20II%20Error%20and%20Power%20Calculations.pdf) involves accepting the null hypothesis even though it was wrong.

The severity of type-1 and type-2 errors depends on the task at hand. Data analysts should therefore determine the errors that could impact the outcome negatively.

Base on the example above, it is essential to be sure due to the huge risks involved. For instance, it can be considered that the patient does not have fibroids while in real life she is affected. It would be safer to conclude that the consequences for making a type-1 error, in this case, are much more grave than making a type-2 error.

When making assumptions, it's crucial to use the p-value to determine whether to accept or dismiss the null hypothesis.

### Confidence of null hypothesis
A [p-value](https://www.investopedia.com/terms/p/p-value.asp) explains the likelihood of an assumption being true based on the null hypothesis. It is an abbreviation for probability value.


Technically, the only way we can accept or reject our null hypothesis is after determining our [p-value](https://www.scribbr.com/statistics/p-value/).

**The smaller our p-value is, the more delicate it is to trust our null hypothesis.**

To calculate our p-value, there should be a certain level of significance to the initial assumption.

However, the p-value is usually within the range of 0 and 1. In most cases, the threshold value is set at 0.05 before the experiments in order to avoid bias. 

We can also have a p-value greater than 0.05 e.g 0.1, the bigger or smaller the p-value is, depends on the task at hand, and how much confidence we have in the null hypothesis.

The alpha level allows us to ascertain whether to consider accepting or rejecting the null hypothesis. It also refers to the probability of making a bad choice if the ground truth (H0) is true.

The alpha level is determined by the following formula:

```py

alpha = 1 - confidence level

```

The level of confidence we have in the null hypothesis is measured in a percentage, having 100% confidence is saying the statement is a fact, but once the confidence level dropped out of 100, it means there is a level of doubt to it and at that point, hypothesis testing is needed on it.

If the `confidence level` from what we've seen in our data is 95%, then the `alpha` will be 0.05:

```py

alpha = 1 - 0.95

```

It is important to establish the alpha level correctly to avoid biased decisions, especially when we dismiss the null hypothesis. The standard or preferred level is 5%.

### Statistical techniques for hypothesis testing

There are three popular methods of hypothesis testing. 

They are:
1. Chi-square test
2. T-test
3. ANOVA test

#### Chi-square test
[The chi-square test](https://www.mathsisfun.com/data/chi-square-test.html) is adopted when there is a need to analyze two categorical elements in a data set. It focuses on the relationship between these two categorical variables. For example, comparing the after-effects of malaria drug A to those of malaria drug B.

Chi-square is a tool used when checking how divergent the observed frequency is from the expected results.

In a chi-square test, we acknowledge the null hypothesis when two variables, A and B are not dependent or have no relationship between them.

We call upon the alternate hypothesis if variable A depends on variable B or vice versa.

The formula for calculating the chi-square test is shown below:

![chi_square_formula](/engineering-education/statistical-hypothesis-testing-python-implementation/chi-square.PNG)

Consider the following example:

A mathematics teacher conducted a test for a class of 20 students. He expected 5 to score good marks, 7 to score average marks while 8 to fail. Eventually, when the result came out, 5 failed, 6 were average while 9 scored good marks.


We can use a chi-square test to analyze the performance of this class.

| Good | Average | Fail | Total |
|---|---|---|---|---|
| Observed| 9 | 6 | 5 | 20 |
| Expected| 5 | 7 | 8 | 20 |


From the table above, students fall into three categories ranging from what is expected to what is finally recorded. The main categories are `good`, `average`, and `fail`.

Let's denote the expected and observed values with letters to make them more understandable.

Let the

- observed good be `A` and the expected good be `a`,

- observed average be `B` and the expected average be `b`,

- observed fail be `C` and the expected to fail to be `c`.

We then find the difference between the expected and observed values, as shown below:

![chi-square-calculation](/engineering-education/statistical-hypothesis-testing-python-implementation/chi-square-calculation.PNG)

For huge datasets, mathematical calculations cannot be done by hand. The implementation of the chi-square test in Python is discussed in the next section.

#### Chi-square test with Python implementation
We need to import `pandas`, `numpy`, `scipy` and `matplotlib`, as demonstrated below:

```py

import numpy as np

import pandas as pd


import scipy.stats as stats

import matplotlib.pyplot as plt

import statsmodels.api as sm


from scipy.stats import f_oneway

from scipy.stats import chi2_contingency

from statsmodels.formula.api import ols

import warnings

warnings.filterwarnings( "ignore" )

```

The libraries imported are the most important libraries used for any data analysis project.

`f_oneway` and `chi2_contigency` libraries are used when implementing one-way ANOVA and chi-square tests respectively.

In this tutorial, we will be using the popular Iris dataset. It can be downloaded from [here](https://www.kaggle.com/vikrishnan/iris-dataset).

The next phase is to load the data into the notebook:

On reading the dataset into the notebook, it is important to add columns name to it for a better understanding of the data we are working with. Hence, we proceed to check the first five to confirm our formatting works.

```py

df = pd.read_csv("/content/drive/MyDrive/IRIS.csv")

df.columns = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species']


df.head()

```

![dataset head](/engineering-education/statistical-hypothesis-testing-python-implementation/dataset_head.PNG)


Let's run `df.sample()` to visualize samples randomly from our dataframe.


```python

df.sample(10)

```

![sampleten](/engineering-education/statistical-hypothesis-testing-python-implementation/dataset_sample.PNG)

Always check for missing values to avoid errors and be sure there is consistency going forward.


```py

df.isnull().sum()

```

```bash

sepal_length 0

sepal_width 0

petal_length 0

petal_width 0

species 0

dtype: int64

```

Confirm the categories in the target class.

```py

print(df["species"].unique())

```

```bash

array(['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'], dtype=object)

```

We can be sure now that there are 3 classes of species and there are no missing values.

Let's proceed with the data manipulation.

Let's use `petal_width` to compare species for our chi-square test.

The first move is to check the summary of `petal_width`. We then use this information to transform it into a categorical variable.


```python

print(df.petal_width.describe())

```

Output:


```bash

count 150.000000

mean 1.198667

std 0.763161

min 0.100000

25% 0.300000

50% 1.300000

75% 1.800000

max 2.500000

Name: petal_width, dtype: float64

```

The chi-square test helps in determining if there is a notable difference between observed and normal frequencies in one or more categories.

The values of `petal_width` must be changed into categories of zeros and ones using the 50% percentile.

There are two conditions that must be satisfied while calculating percentile:

1. Data must be arranged in ascending order.

2. The index must be rounded up if it is not an integer.


```py

print(np.percentile(df.petal_width, 50))

```

Output:

```bash

1.3

```

A quartile is another term relating to percentile. You can find out more about percentiles and quartiles [here](https://datascienceupskill.com/statistics/percentiles-and-quartiles).


Implementing a function to create the new petal width into the dataframe with the percentile calculated.

```py

def petal_cat(df):

if df['petal_width'] <= 1.3:

return 0

elif df['petal_width'] > 1.3:

return 1

else:

return 'Indifferent'

df['petal_width_new'] = df.apply(petal_cat, axis=1)

```

The data format for the `species` class has to be transformed to 0, 1, and 2, which is a machine-readable format to facilitate testing.

Therefore, with [label-encoding](/engineering-education/introduction-to-scikit-learn-in-python/), a numeric value representation will be given to each of the categories in the class.

To learn more about label encoding, the reader is advised to check up on the following [resource](/engineering-education/data-preprocessing-in-r/).

```py

def species_cat(df):

if df["species"] == "Iris-virginica":

return 0

elif df["species"] == "Iris-versicolor":

return 1

else:

return 2

df["species"] = df.apply(species_cat, axis=1)

```

Confirm the function works perfectly by printing randomly five samples.

```py

print(df.sample(5))

```

![dfsample5](/engineering-education/statistical-hypothesis-testing-python-implementation/dfsample5.PNG)

Drop all other columns except the two columns that we need, the `species` and the `petal_width_new` columns.

```py

df_new = df.drop(columns=["sepal_width", "sepal_length", "petal_length", "petal_width"])

print(df_new.head())

```

![newhead](/engineering-education/statistical-hypothesis-testing-python-implementation/df_new.PNG)

Let's make use of the `chic2_contigency` library that we had imported into the project.

```python

stat, p, dof, expected = chi2_contingency(df_new)

print("The degree of freedom is: ", dof)

```

Output:


```bash

The degree of freedom is: 149

```

The three outputs in test statistics will include the degree of freedom, p-value, and expected values.

[Test statistic](https://online.stat.psu.edu/statprogram/reviews/statistical-concepts/chi-square-tests) is a characterized feature of significance in the chi-square test. It helps in determining how uncommon the result might be, provided that the null hypothesis is agreed to be true.

The number of features or variables that we have access to varies depending on the [degree of freedom](https://byjus.com/maths/chi-square-test/). 

The probability of confidence is similar to the level of confidence explained earlier, it is about how close our assumption is inclined towards being a fact, it is the amount of confidence we have in our null hypothesis, it is therefore set to 95%.


```py

prob = 0.95

alpha = 1.0 - prob

print('The alpha/significance level = %.3f' % alpha)

print('The p-value is = %.2f' % p)

if p <= alpha:

print('Reject the Null Hypothesis (Reject H0)')

else:

print('Accept the Null Hypothesis (Do not reject H0)')

```

Output:

```bash

The alpha/significance level = 0.050

The p-value is = 0.10

Accept the Null Hypothesis (Do not reject H0)

```

In the results above, the p-value surpasses the alpha value set at 0.05. We will acknowledge the null hypothesis and as well dismiss the alternate hypothesis. 

This means the petal width and species of flower are not dependent on each other, i.e. there is no connection between them.

### T-Test with Python implementation
[The t-test](https://en.wikipedia.org/wiki/Student%27s_t-test) is utilized when we plan to evaluate the discrepancy between the means of two groups of samples. Unlike the chi-square test, the t-test is used on continuous variables.

T-test has three basic types.

1. **One sample t-test:** It checks whether the population has a different mean from the sample.

The mathematical expression is:

![one-sample-t-test](/engineering-education/statistical-hypothesis-testing-python-implementation/one-sample-t-test.PNG)

Where,

the observed mean group is `a`,

assumed population means is `B`,

the standard deviation of the data group is `X`, and

the number of observations in the group is `N`.


2. **Two-sample t-test:** It checks and juxtaposes the means of two groups that are not dependent on each other and compares the population's means to ascertain if there is a huge difference.

The mathematical expression is:

![two-sample-t-test](/engineering-education/statistical-hypothesis-testing-python-implementation/two-sample-t-test.PNG)

Where, data sample A's mean is `Ma`, data sample B's mean is `Mb`, the size of sample A is `Na`, the size of sample B is `Nb`, and variance is `v`.

3. **Paired t-test:** It is used in checking and comparing the means of different samples from a group.

Mathematically, it can be resolved with:

![paired-t-test](/engineering-education/statistical-hypothesis-testing-python-implementation/paired-t-test.PNG)

Where, the difference between paired observations' sample mean is `D`, the assumed mean difference is `m`, standard deviation is `xd`, and the number of observations in the group is `V`.

#### Performing a one-sample T-test
For the sake of a one-sample t-test, we will be re-assigning the column of petal width into a single dataframe for ease of use.

```python

df_ = df.petal_width

```

The pandas dataframe `sample()` function is used here as well to have a random view of our dataframe.

```python

print(df_.sample(5))

```

```bash

103 1.8

131 2.0

114 2.4

35 0.2

38 0.2

Name: petal_width, dtype: float64

```

Applying the one sample t-test function of the dataframe.

```python

print(stats.ttest_1samp(a=df_, popmean=1.199))

```

```bash

Ttest_1sampResult(statistic=-0.0053494404016899925, pvalue=0.9957389399651244)

```

- **H0:** The mean of petal_width is 1.199

- **H1:** The mean of petal_width is not 1.199

Analyzing the one-sample t-test, it finds out if the hypothesized mean is similar to or different from the group's mean. From the example above, we've selected the `petal_width` as the population sample to perform the test on.

From the test, since the p-value beats the alpha level set at 0.05, we acknowledge the null hypothesis because we don't have enough evidence to prove otherwise.

Moreover, if you check, the p-value is very close to 1.0, which means that the mean of `petal_width` is most likely 1.199.

The evidence is too strong to be rejected, it is almost accurate.

#### Performing a two-sample T-test
The standard for the two-sample t-test is for the two independent groups we are sampling to have equal variances. We can only know the variances are the same when the [ratio of the higher to the lower variance is less than 4:1.](https://www.real-statistics.com/students-t-distribution/two-sample-t-test-equal-variances/)

Checking the variance is only making sure that two populations are probably spread out or normally distributed, this will help prevent bias. 

Hence, the null hypothesis will be assuming that since the two groups are normally distributed, they likely should have the same mean.

```python

class1 = df.petal_width

class2 = df.sepal_length

```

Find variance for each group.

```python

print(np.var(class1), np.var(class2))

```

```bash

0.5785315555555559 0.6811222222222222

```

Do the ratio check to know if it satisfies the condition for the two-sample t-test. The ratio check is done on the variance to ensure that both of the populations are normally distributed.

```python

ratio_check = np.var(class2)/np.var(class1)

print(ratio_check)

```

```bash

1.1773294225379805

```

Obviously, the ratio is less than 4:1, thus the variances are considered to be equal.

Applying the two-sample t-test function on our classes,

```python

print(stats.ttest_ind(a=class1, b=class2, equal_var=True))

```

```bash

Ttest_indResult(statistic=-50.51520141387464, pvalue=3.7974378831185126e-148)

```

Evaluating this:

- **H0:** The mean of both samples (petal_width and sepal_length) are equal.

- **H1:** The mean of both samples (petal_width and sepal_length) are not equal.

Our `p-value` (p=3.7974378831185126e-148) is far less than `alpha` = 0.05.

However, interpreting any form of t-test largely depends on the `p-value`, the result above explains that the means of the two samples (`petal_width` and `sepal_length`) are different. 

Therefore we will dismiss the null hypothesis which says the mean of the two samples are the same because their variances are assumed to be equal.

There is no evidence sustainable enough to prove the two populations have the same mean. H1 (alternate hypothesis) is however true.

### ANOVA with Python implementation
ANOVA is a word coined from 'Analysis of Variance'. It is a statistical concept that shows the differences between the means of more than two independent groups, using variance analysis on samples from those groups.

It is used for checking the contrast between three or more samples with one test. Especially when the categorical class has over two categories.

### Why ANOVA? 
With ANOVA, you get to discover obvious differences between the means of your independent features. Upon getting a clearer picture of the differences, you can understand how each of them connects to your dependent variable. You can see what are the influencing factors for the relationship.

A generic example could be as follows:

The growth department of a certain company discovered an increase in sales for a particular product. In recent times, they've tried several advertisement channels so it is difficult to say which one yielded the sales increase the most.

They did online posters, billboards, TV ads, mouth-to-mouth, and sponsorship. By carrying out an ANOVA test on the several advertisement channels, they will be able to better understand which one works best out of all channels (independent variables), with the connection it has with the increase in sales which is the dependent variable.

During ANOVA testing, the hypothesis is:

- **H0:** When all samples' means are the same.

- **H1:** When one or more samples are very much different.

#### One way ANOVA test
This is employed to determine the effect of a variable on one or two other variables by comparing their means. Using the same petal example we will check if `petal width`, has an effect on `petal length` and `sepal length` using one-way ANOVA test.

```python

class1 = df.petal_width

class2 = df.sepal_length

class3 = df.petal_length


print(f_oneway(class1, class2, class3))

```

```bash

F_onewayResult(statistic=555.8702565323317, pvalue=5.738282463819433e-122)

```

Since our `p-value` (5.738282463819433e-122) is far less than `alpha` (0.05), we dismiss the null hypothesis, as there exists no evidence sustainable enough to accept it.

This means that the sample means are very different. Meaning that our H1 (alternate hypothesis) is true.

#### Two way ANOVA test
This is called when we are dealing with three or more variables, trying to compare their means with each other.

```python

petal = df.petal_width

sepal = df.sepal_length

species = df.species

model = ols('species ~ C(petal) + C(sepal) + C(petal):C(sepal)', data=df).fit()

print(sm.stats.anova_lm(model, typ=2))

```

![twowayanova](/engineering-education/statistical-hypothesis-testing-python-implementation/twowayanova.PNG)

The p-value of `petal_width` is more than 0.05, which increases the probability of our null hypothesis being accepted.

The p-value of `sepal_length` is less than 0.05, which increases the probability of our null hypothesis being rejected.

Likewise, the p-value of both `petal_width` and `sepal_length` is lower than 0.05, we dismiss the null hypothesis since it is obvious one or more samples are very much different in their means. That is the same thing as saying, the average of all data samples is not equal.

### Conclusion
At the end of this tutorial, I believe the readers should have a better grasp on the concept of statistical hypothesis testing and how to implement it with Python. 

To carry out hypothesis testing, the first step is to form an initial assumption and label it as H0. The next step would be to collect all data samples available to support our hypothesis, collect all the shreds of evidence and analyze the data, and make a decision whether to accept the H0 or reject it. 

When we reject the ground truth but it is true, we encounter the *Type 1* error. On the flip side, when we do not reject the ground truth despite the fact that it is not true, we encounter the *Type 2* error.

Happy coding!

Additional resources are added below to better solidify the knowledge gained from this tutorial.

### Additional resources
1. [Test of Hypothesis in Data Science](/engineering-education/content/articles/hypothesis-testing-data-science/)
2. [ANOVA Test: Definition, Types, Examples](https://www.statisticshowto.com/probability-and-statistics/hypothesis-testing/anova/)
3. [Understanding t-Tests: t-values and t-distributions](https://blog.minitab.com/en/adventures-in-statistics-2/understanding-t-tests-t-values-and-t-distributions)
4. [Make sense with two sample t-test](https://www.isixsigma.com/tools-templates/hypothesis-testing/making-sense-two-sample-t-test/)
5. [Understanding Hypothesis Testing: Level of Significance (Alpha) and P values in Statistics](https://blog.minitab.com/en/adventures-in-statistics-2/understanding-hypothesis-tests-significance-levels-alpha-and-p-values-in-statistics)
6. [Chi-squared test application](http://www.openanesthesia.org/chi-squared_test_application/)
7. [Chi-square mathematics for statistics students](https://www.yourarticlelibrary.com/project-reports/chi-square-test/chi-square-test-meaning-applications-and-uses-statistics/92394).

---

Peer Review Contributions by: [Prashanth Saravanan](/engineering-education/authors/prashanth-saravanan/)