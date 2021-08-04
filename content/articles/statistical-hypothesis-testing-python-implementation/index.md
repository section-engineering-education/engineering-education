---
layout: engineering-education
status: publish
published: true
url: /statistical-hypothesis-testing-python-implementation/
title: Statistical Hypothesis Testing With Python Implementation
description: This tutorial is a comprehensive explanation and implementation of statistical hypothesis testing methods such as T-Test, Chi-square test & ANOVA in Python.
author: qoyum-olatunde-yusuf
date: 2021-06-16T00:00:00-11:00
topics: [Statistical Analysis, Hypothesis Testing, Data Science, Python ]
excerpt_separator: <!--more-->
images:
 
 - url: /engineering-education/statistical-hypothesis-testing-python-implementation/hero.PNG
alt: statistic hypothesis testing with python cover image
---
Hypothesis is the act of making observations and generating probing questions from the observations made in an attempt to come to a conclusion. Hypothesis testing is the test of assumptions on a population sample. It involves checking out whether a hypothesis should be accepted or not. In the business world and in real life, hypothesis testing has been of great importance in making worthy decisions off mere observations. Billions of data are being generated on a daily basis around the globe and this has made the relevance of hypothesis testing a stronghold in making business decisions.
<!--more-->
### Table of Contents
1. [Prerequisites](#prerequisites)
2. [Goals of the tutorial](#goals-of-the-tutorial)
3. [Understanding hypothesis testing](#understanding-hypothesis-testing)
4. [Confidence of null hypothesis](#confidence-of-null-hypothesis)
5. [Statistical techniques for hypothesis testing](#statistical-techniques-for-hypothesis-testing)
6. [Chi-square test - Python implementation](#chi-square-test-python-implementation)
7. [T-Test - Python implementation](#t-test-python-implementation)
8. [ANOVA - Python implementation](#anova-python-implementation)
9. [Conclusion](#conclusion)
10. [Additional resources]((#additional-resources))
 
### Prerequisites
The reader of this tutorial should have basic knowledge of python programming, must have an idea of the concept of exploratory data analysis and how pandas and numpy work, must have an elementary understanding of statistics, and must be a data science enthusiast.
 
### Goal of the Tutorial
At the end of this tutorial, readers should be able to
- understand clearly the concept of statistical hypothesis testing.
- perform the implementation of t-test, chi-squared test & ANOVA with python and a new dataset.
- differentiate clearly the trade-off between type 1 and type 2 error of null hypothesis.
- explain the confidence of the null hypothesis.
- play with basic pandas functions for exploratory data analysis.
- figure out the best case-study for "t-test", "chi-squared test" and "ANOVA test".
 
### Understanding Hypothesis Testing
There are two types of hypothesis testing, namely, null hypothesis and alternate hypothesis.
 
[**Null hypothesis**](https://en.wikipedia.org/wiki/Null_Hypothesis:_The_Journal_of_Unlikely_Science) is the initial assumption about an event (also referred to as the ground truth), whereas [**alternate hypothesis**](https://en.wikipedia.org/wiki/Alternative_hypothesis) is an assumption that counters the initial assumption.
 
Consider a situation where a seventy-year-old woman has a visible bump in her belly. The medical opinion is that the bump could be a fibroid. In this case, our initial conclusion (or our null hypothesis) is that -
 
**"She has fibroid"**.
while our alternate hypothesis will be
**"She does not have fibroid"**.
 
In trying to make a valid conclusion between two assumptions on a certain sample of data, we will refer to the null hypothesis (or our initial assumption) as H0 hypothesis and the alternate hypothesis (or the counter assumption) as H1 hypothesis.
 
To carry out hypothesis testing, the first step is to form and label the null hypothesis as H0 and the alternate hypothesis as H1. The next step is to collect all data samples available to support the null hypothesis, collect data pertaining to the hypothesis and analyze it to make a decision if H0 can be accepted or rejected.
`While doing that, there is a likelihood for four events to happen:`
 
1. The ground truth (H0) is true, so H0 is accepted
2. The ground truth (H0) is not true, so H0 is rejected and H1 is accepted
 
- These two cases are the desired possibilities as either our null hypothesis was right and adopted or our null hypothesis was wrong and rejected.
 
However, the remaining two possibilities, which are
 
3. Null hypothesis (H0) is true but we reject it.
4. Null hypothesis (H0) is not true, but we did not reject it.
 
These cases are not desirable as we have either failed to recognize the right hypothesis or we have chosen the wrong one.
 
Rejecting the null hypothesis although it is true is referred to as a [**type-1 error**](https://www.thoughtco.com/difference-between-type-i-and-type-ii-errors-3126414) whereas failing to reject the null hypothesis even though it is wrong is referred to as a [**type-2 error**](https://www.thoughtco.com/difference-between-type-i-and-type-ii-errors-3126414).
The severity of type-1 and type-2 errors depend on the task at hand, so it is the analyst's decision to judge which error would negatively impact the outcome.
 
 
Consider the example of the seventy-year-old woman with a bump. In such a situation,
Null Hypothesis (H0): **She has fibroid**
Alternate Hypothesis (H1):  **She does not have fibroid**
 
In this case, will it be safe to make the mistake of assuming she does not have fibroid when she actually has fibroid (type-1 error) or will it be costlier to make the assumption that she has fibroid when she doesn't actually have it (type-2 error)?
 
There is someone's life involved here, therefore care must be taken before making assumptions.
 
In this case, encountering type 1 error is assuming she does not have fibroid when she actually is, i.e. the null hypothesis is true but we reject it.
 
If a type two error is encountered, which is assuming she's pregnant when she is truly not, the null hypothesis is wrong but we insist on not rejecting it. The consequence might probably be leaving the bump-like pregnancy to grow, and it turns out to be an acute fibroid.
 
Considering these two situations, it would be safe to conclude that the consequences of making a type-1-error is much more grave than making a type-2-error. While trying to solidify the assumption, it is mandatory to employ the service of a p-value, which is basically used to determine whether to accept or reject our null hypothesis.
### Confidence of Null Hypothesis (Probability Value)
 
[P-value](https://www.investopedia.com/terms/p/p-value.asp) explains the likelihood of the gathered fact or data to occur under the condition of the null hypothesis.
Technically, the only way we can accept or reject our ground truth (null hypothesis) is after determining our [*P-value*](https://www.scribbr.com/statistics/p-value/) which is an abbreviation for probability value. It is the only thing that has the decisive power to accept or reject H0.
 
***The smaller our P-value is,the more delicate it is to accept our null hypothesis.***
 
To calculate our P-value, there should be a certain level of significance to our ground truth or initial assumption, so a smaller P-value is telling us there are more reasons why we should accept our alternative hypothesis.
 
P-value is within the range of 0 and 1, but the threshold value is set at 0.05, the threshold value can also be called *alpha*, alpha level is always set before the experiments in order to avoid bias.
Alpha is the level we set our p-value at inorder to ascertain whether to accept our null hypothesis or not.
Our alpha value is the probability of making a wrong decision when the ground truth(H0) is true. It is always calculated as
```
alpha = 1 - confidence level
```
If the confidence level from what we've seen in our data is 95%, then
```
alpha = 1 - 0.95
```
which is 0.05.
 
Why is the 95% confidence level the most accustomed?
 
Since we know that alpha level is the probability of encountering a Type I error(which is rejecting H0 despite being true), would it not make sense to make it as bitsy as possible. Imagine our alpha value being set to 10%, obviously, there is an increasing chance that we will make the mistake of rejecting the null hypothesis, but it must not be too small as well, if we set the alpha value as 1%, it will be too small that our decision will be reeking of bias. Hence, the standard has been 5%.
 
While implementing statistical hypothesis testing, there are some methodologies that can be employed. In this tutorial, I will be touching on three methods of carrying out statistical hypothesis testing.
 
 
### Statistical Techniques for Hypothesis Testing
The three methods to be discussed are:
1. Chi-Square Test
2. T-Test
3. ANOVA Test
 
#### Chi-Square Test
 
Chi-square test is used to perform testing on two categorical variables in our data population. It is focused on looking for an important relationship between two categorical variables.
For example, comparing the aftereffects of malaria drug A, malaria drug B, and malaria drug C.
Chi-square is a tool for checking how divergent the observed frequency is from the expected frequency.
With Chi-Square, we accept the null hypothesis when variable A and variable B are not dependent, i.e. there is no relationship between them.
We reject the null hypothesis(or accept the alternate hypothesis) when variable A depends on variable B, i.e. there is a relationship between them. The formula for calculating chi-square test is:
 
![chi_square_formula](/engineering-education/statistical-hypothesis-testing-python-implementation/chi-square.PNG)
 
Consider the following example:
 
A mathematics teacher conducted a test for a class of 20 students. He expected 5 to score good marks, 7 to score average marks while 8 to fail. Eventually, when the result came out, 5 failed, 6 were average while 9 scored good marks. Mathematically, carry out chi-square test for this class.
 
|  | Good  |  Average  | Fail | Total |
|----|--------|:----------|--------------|--------|
| Observed| 9 | 6 | 5 | 20 |
| Expected| 5 | 7 | 8 | 20 |
 
Where
 
- observed good is A,
- expected good is a,
- observed average is B,
- expected average is b,
- observed fail is C, and
- expected to fail is c.
```
Chi-square = Σ[(observed value - expected value)² / expected value]
```
```
A-a = 4
B-b = -1
C-c = -3
```
```
# find the square of our values
/A-a/² = 16
/B-b/² = 1
/C-c/² = 9
```
```
Good = (16/5) = 3.2
Average = (1/7) = 0.143
Fail = (9/8) = 1.125
 
chi-square = 3.2 + 0.143 + 1.125
chi-square = 4.468
```
For huge datasets, mathematical calculations cannot be done by hand. The implementation of the chi-square test in Python is discussed in the next section.

### Chi-square test - Python implementation.
 
```python
import pandas as pd
import numpy as np
import scipy.stats as stats
from scipy.stats import f_oneway
from scipy.stats import chi2_contingency
import matplotlib.pyplot as plt
 
import statsmodels.api as sm
from statsmodels.formula.api import ols
 
import warnings
warnings.filterwarnings( "ignore" )
```
 
The libraries imported are the most important libraries used for any data science python implementation work, except for the f_oneway used for the implementing one way ANOVA test and chi2_contigency used for the implementation of Chi-square.
 
I will be using the popular iris data set for the tutorial, you can get it almost anywhere but I downloaded this from [Kaggle](https://www.kaggle.com/vikrishnan/iris-dataset).
 
Load the data into the notebook
```python
df = pd.read_csv("/content/drive/MyDrive/IRIS.csv")
df.columns =['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species']
```
```python
df.head()
```
![df.head.png](/engineering-education/statistical-hypothesis-testing-python-implementation/dataset_head.PNG)
On checking the first five, it seems all the species of flower are setosa, but the iris dataset has 2 more samples apart from that, to be sure, let's run df.sample() to visualize samples randomly.
```python
df.sample(10)
```
![sampleten](/engineering-education/statistical-hypothesis-testing-python-implementation/dataset_sample.PNG)
 
Always check for missing values to avoid future complications.
```python
df.isnull().sum()
```
```bash
sepal_length    0
sepal_width     0
petal_length    0
petal_width     0
species         0
dtype: int64
```
```python
(df["species"].unique())
```
```bash
array(['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'], dtype=object)
```
We can be sure now that there are 3 classes of species and there are no missing values.
Let's proceed with the data manipulation.
 
Let's use petal width to compare species for our chi-square test.
 
The first step is to check the summary of `petal_width`
 
Secondly, use the information derived to convert it to a categorical variable.
```python
df.petal_width.describe()
```
```bash
count    150.000000
mean       1.198667
std        0.763161
min        0.100000
25%        0.300000
50%        1.300000
75%        1.800000
max        2.500000
Name: petal_width, dtype: float64
```
Since, the operation we are going to be performing are mathematical operations and they don't work with letters or words except numbers.
 
The Chi-square test helps in determining if there is a notable difference between the observed and normal frequencies in one or more categories, the values of petal_width must be changed into categories of zeros and ones using the 50% percentile which is the second quartile as the yardstick.
 
There are clear [differences](https://byjus.com/maths/difference-between-percentage-and-percentile/) between percentage and percentile. As percentage is just a fraction of a hundred, the percentile is more concerned with ranks, it can be termed as the percentage of values that fall below a certain value mark.
 
It is rather used to find the position of a value in a given set of values. For example, if a girl has the 50th percentile on an examination of 200, we can say that by scoring 200 marks, she has higher marks than 50% of the remaining class.
There are two conditions that must be satisfied while calculating percentile.
1. Data must be arranged in ascending order.
2. if the index is not an integer, it must be rounded up.
```python
print(np.percentile(df.petal_width, 50))
```
```bash
1.3
```

A quartile is another term related to percentile, it is a specified percentile, we have 1st quartile as 25% percentile, second quartile as 50%, and 3rd as 75% percentile. You can as well read this [article](https://datascienceupskill.com/statistics/percentiles-and-quartiles) to get a better grip. 
 
```python
def petal_cat(df):
 if df['petal_width'] <= 1.3:
   return 0
 elif df['petal_width'] > 1.3:
   return 1
 else:
   return 'indifferent'
 
df['petal_width_new'] = df.apply(petal_cat, axis=1) 
```
The non-machine-friendly format for our *species* class has to be transformed to 0,1 and 2, which is a machine-readable format for the testing to be carried out. Therefore, with [label-encoding](/engineering-education/content/articles/introduction-to-scikit-learn-in-python/
), a numeric value will be assigned to each of the categories in the class. To learn more about label encoding, [click](/engineering-education/content/articles/data-preprocessing-in-r/).
 
```python
def species_cat(df):
 if df["species"] == "Iris-virginica":
   return 0
 elif df["species"] == "Iris-versicolor":
   return 1
 else:
   return 2
 
df["species"] = df.apply(species_cat, axis=1)
```
```python
df.sample(5)
```
![dfsample5](/engineering-education/statistical-hypothesis-testing-python-implementation/dfsample5.PNG)
```python
df_new = df.drop(columns=["sepal_width", "sepal_length", "petal_length", "petal_width"])
```
```python
df_new.head()
```
![newhead](/engineering-education/statistical-hypothesis-testing-python-implementation/df_new.PNG)
 
Let's make use of `chic2_contigency` provided for us in the `scipy.stats` library.
```python
stat, p, dof, expected= chi2_contingency(df_new)
 
print(dof)
```
```bash
The degree of freedom is: 149
```
We can comfortably get 3 outputs in test statistics, degree of freedom, p-value, and expected values.
 
[Test statistic](https://online.stat.psu.edu/statprogram/reviews/statistical-concepts/chi-square-tests) is a characterized feature of significance in the Chi-square test that helps in determining how uncommon the result might be provided that null hypothesis is assumed to be true.
 
The number of features or variables that we have access to varies by the degree of freedom. Follow the link for more information on [degree of freedom](https://byjus.com/maths/chi-square-test/).
 
Hence, we set our probability of confidence to 95% as explained earlier in the tutorial.
```python
prob = 0.95
 
alpha = 1.0 - prob
 
print('The alpha/significance level=%.3f' % alpha)
print('The P-value is =%.2f' % p)
 
if p <= alpha:
 print('Reject the Null Hypothesis ( reject H0)')
else:
 print('Accept the Null Hypothesis (fail to reject H0)')
```
```bash
alpha/significance level=0.050
P-value =0.10
Accept the Null Hypothesis (fail to reject H0)
```
The `p-value` is greater than the `alpha value` set at 0.05, we will fail to reject the null hypothesis and accept the null hypothesis. This means the petal width and species of flower are not dependent, i.e. there is no relationship between them.
 
### T-Test - Python implementation
 
The T-test is utilized when we plan to evaluate the discrepancy between the means of two groups of samples. Unlike the Chi-Square Test, the T-test is used on continuous variables.
 
T-tests has three basic types
 
1. **One sample t-test:** It checks whether the population has a different mean from the sample.
The mathematical formula is:
 
[t-test = a-BX∕N](https://www.datanovia.com/en/lessons/t-test-formula/one-sample-t-test-formula/)
 
Where
 
the observed mean group is a
 
the assumed population means is B
 
the standard deviation of the data group is X
 
the number of observations in the group is V
 
2. **Two-sample t-test:** It checks and compares the means of two groups that are not dependent on each other and compares the population's means to see if there is a huge difference.
The mathematical expression is:
 
[t-test = Ma – (Mb*v*Na)+vNb](https://www.statology.org/two-sample-t-test/)
 
Where
 
Data sample A's mean is Ma.
 
Data sample B's mean is Mb.
 
The size of sample A is Na.
 
The size of sample B is Nb.
 
Variance is v.
 
3. **Paired t-test:** It is used in checking and comparing the means of different samples from a group.
Mathematically, it can be resolved with:
 
[t-test = D - (m*xd)∕N](https://www.datanovia.com/en/lessons/t-test-formula/paired-t-test-formula/)
 
Where
 
The difference between paired observations' sample mean is D.
 
the assumed mean difference is m.
 
standard deviation is xd.
 
The number of observations in the group is N.
 
#### Performing a One-Sample T-Test
```python
df_ = df.petal_width
```
```python
df_.sample(5)
```
```bash
103    1.8
131    2.0
114    2.4
35     0.2
38     0.2
Name: petal_width, dtype: float64
```
```python
stats.ttest_1samp(a=df_, popmean=1.199)
```
```bash
Ttest_1sampResult(statistic=-0.0053494404016899925, pvalue=0.9957389399651244)
```
**H0:** The mean of petal_width is 1.199
 
**H1:** The mean of petal_width is not 1.199
 
Analyzing one-sample t-test, it finds out if the hypothesized mean is the same or different from the group's mean. From the example above, we've selected the petal_width as the population sample to perform the test on.
From the test, since the P-value beats the alpha level set at 0.05, we fail to reject the null hypothesis because we don't have enough evidence to prove otherwise, moreover, if you check, the P-value is very close to 1.0, this means that the mean of petal_width is most likely 1.199.
The evidence is too strong to be rejected, it is almost accurate. (Obviously, I copied the value of mean from the summary).
 
#### Performing a Two-Sample T-Test
 
The first step is to calculate the variances and compare them.
 
The ratio of the higher to the lower variance must be less than 4:1 before we can assume the two samples have the same variance.
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
```python
ratio_check = np.var(class2)/np.var(class1)
 
print(ratio_check)
```
```bash
1.1773294225379805
```
Obviously, the ratio is less than 4:1, thus the variances are assumed to be equal.
```python
stats.ttest_ind(a=class1, b=class2, equal_var=True)
```
```bash
Ttest_indResult(statistic=-50.51520141387464, pvalue=3.7974378831185126e-148)
```
Evaluating this:
 
**H0:** The mean of the two samples (petal_width and sepal_length) are equal.
 
**H1:** The mean of the two samples (petal_width and sepal_length) are not equal.
 
Our P-value (p=3.7974378831185126e-148) is far less than alpha = 0.05,
 
Checking of the variance is only making sure that two populations are probably spread out or normally distributed, this will help prevent bias. Hence, the null hypothesis will be assuming that since the two groups are normally distributed, they likely should have the same mean.
 
However, interpreting any form of t-test largely depends on the p-value, the result above explains that the means of the two samples(petal_width and sepal_length) are different. Thus, we will reject the Null Hypothesis which says the mean of the two samples are the same because their variances are assumed to be equal, there is no evidence sustainable enough to prove the two populations have the same mean.
H1 (alternate hypothesis) is however true.
 
### ANOVA - Python implementation
 
ANOVA is a word coined from 'Analysis of Variance', it is a statistical concept that shows the differences between the means of more than two independent classes, using variance analysis on samples from those classes.
It is used to check the contrast between three or more samples with one test. Especially when the categorical class has more than two categories.
 
Why ANOVA? With ANOVA you get to discover obvious differences between the means of your independent features, and on getting a clearer picture of the differences, you can get to understand how each of them connects to your dependent variable, and what are the influencing factors for the relationship.
 
A typical example:
'The growth department of a certain company discovered an increase in sales for a particular product. In recent times, they've tried several advertisement channels so it is difficult to say which one yielded the sales increase the most.’
 
They did online posters, billboards, TV ads, mouth-to-mouth, and sponsorship. By carrying out an ANOVA test on the several advertisement channels, they will be able to better understand which one works best out of all channels(independent variables), with the connection it has with the increase in sales which is the dependent variable.
This can be applied in the marketing department of every organization.
 
During ANOVA testing, the hypothesis is:
 
**H0:** When all samples' means are the same.
 
**H1:** When one or more samples are very much different.
 
#### One Way ANOVA Test
```python
class1 = df.petal_width
class2 = df.sepal_length
class3 = df.petal_length
```
```python
f_oneway(class1, class2, class3)
```
```bash
F_onewayResult(statistic=555.8702565323317, pvalue=5.738282463819433e-122)
```
 
Since our P-value (5.738282463819433e-122) is far less than alpha = 0.05, therefore, we reject the Null Hypothesis, there is no evidence sustainable enough to accept it.
 
This means that the sample means are very much different. Hence, our H1 (alternate hypothesis) is thus true.
 
#### Two Way ANOVA Test
 
This is called for when we are dealing with three or more variables, trying to compare their means with each other.
```python
petal = df.petal_width
sepal = df.sepal_length
species = df.species
 
model = ols('species ~ C(petal) + C(sepal) + C(petal):C(sepal)', data=df).fit()
print(sm.stats.anova_lm(model, typ=2))
```
![twowayanova](/engineering-education/statistical-hypothesis-testing-python-implementation/twowayanova.PNG)
 
The P-value of petal width is greater than 0.05, which increases the probability of our null hypothesis being accepted.
 
The P-value of sepal length is less than 0.05, which increases the probability of our null hypothesis being rejected.
 
Likewise, the P-value of both petal_width and sepal_length is less than 0.05, we reject the null hypothesis because it is obvious one or more samples are very much different in their means. That is to say, the average of all data samples is not equal.
 
### Conclusion
At the end of this tutorial, I believe the readers should have more than a grasp of the concept of statistical hypothesis testing and how to implement it with python programming. To carry out hypothesis testing, the first step is to form an initial assumption and label it as H0. The next step would be to collect all data samples available to support our hypothesis, collect all the shreds of evidence and analyze the data, and make a decision whether to accept the H0 or reject it. However, errors of type 1 and type 2 have been explained using an assumed pregnant woman as an example, which is something almost everyone can relate with. When we reject the ground truth but eventually it is true, we encounter the *Type 1* error. On the flip side, when we do not reject the ground truth despite the fact that it is not true, we encounter the *Type 2* error.
 
Additional resources are added below to better solidify the knowledge gained from this tutorial.
 
**Happy coding**
 
### Additional Resources
1. [Hypothesis Testing in Data Science](/engineering-education/content/articles/hypothesis-testing-data-science/)
2. [ANOVA Test: Definition, Types, Examples](https://www.statisticshowto.com/probability-and-statistics/hypothesis-testing/anova/)
3. [Understanding t-Tests: t-values and t-distributions](https://blog.minitab.com/en/adventures-in-statistics-2/understanding-t-tests-t-values-and-t-distributions)
4. [MAKING SENSE OF THE TWO-SAMPLE T-TEST](https://www.isixsigma.com/tools-templates/hypothesis-testing/making-sense-two-sample-t-test/)
5. [Understanding Hypothesis Tests: Significance Levels (Alpha) and P values in Statistics](https://blog.minitab.com/en/adventures-in-statistics-2/understanding-hypothesis-tests-significance-levels-alpha-and-p-values-in-statistics)
6. [Chi-squared test application](http://www.openanesthesia.org/chi-squared_test_application/)
7. [Chi-square mathematics for statistics students](https://www.yourarticlelibrary.com/project-reports/chi-square-test/chi-square-test-meaning-applications-and-uses-statistics/92394).