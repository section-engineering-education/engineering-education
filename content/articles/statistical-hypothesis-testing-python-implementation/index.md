---
layout: engineering-education
status: publish
published: true 
url: /statistical-hypothesis-testing-python-implementation/
title: Statistical Hypothesis Testing With Python Implementation
description: This tutorial is a comprehensive explanation and implementation of statistical hypothesis testing methods such as t-test, chi-squared test & ANOVA in python, It is well known that most of the implementation of these techniques are always in R, and most Data Scientists and Analysts who use python always shy away from it.
author: qoyum-olatunde-yusuf
date: 2021-06-16T00:00:00-11:00
topics: [Statistical Analysis, Hypothesis Testing, Data Science, Python ]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/statistical-hypothesis-testing-python-implementation/hero.png
 alt: statistic hypothesis testing with python cover image 
---
Technically, when you mention hypothesis testing, all data-oriented people will immediately think null and alternate but it takes a statistician or someone with strong analytical background to know what lies beyond five is far more than six. 
<!--more-->

## Understanding Hypothesis Testing

There are basically two types of hypothesis testing, namely:
1. Null Hypothesis
2. Alternate Hypothesis

Taking it to the fundamentals, we can say, **null hypothesis** is our ground truth or our initial assumption, while **alternate hypothesis** is like someone going against what we believe in, an assumption that counters our initial assumption.

Obviously, what we've known as fact, we already have a certain level of confidence in it, a lot of us hate it when people try to go against our beliefs. Hypothesis testing can be applied in real life to scenarios as well.

The null hypothesis is a statement believed to be true unless we can prove otherwise beyond a reasonable doubt.

In trying to assess two mutually exclusive facts on a certain sample of data. We will refer to H0 as our null hypothesis and H1 as our alternate hypothesis, H0 is our ground truth, or let's call it prior assumption while H1 is the fact ready to counter it.

To carry out hypothesis testing, our first step is to make that vague assumption (or initial assumption as vague sounds too biased), H0. As normal humans will do, always want to be right, we will now collect all data samples available to prove our hypothesis.

We will gather all the shreds of evidence and analyze the data. We will now make a decision whether to accept the H0 or reject it. 

However, in the process of doing that, there is a likelihood for four events to happen.

1. Our ground truth is not true, we will accept our (H1) alternate hypothesis and hence reject our (H0) null hypothesis.

This is impressive as there is no *error*.

2. Our ground truth(H0) is true, so we accept our null hypothesis(H0).

This is also very good as there is no *error*.

3. We reject our ground truth but eventually it is true. (H0) Null hypothesis is true but we reject it.

It looks very bad as it points to an error called *Type 1 Error*. 

4. We do not reject our ground despite the fact that it is not true, i.e, (H0) Null hypothesis is not true, but we did not reject it.

it looks bad as it points to an error called *Type 2 Error*.

Did you notice?
I called the type 1 error 'very bad'  but the type 2 error 'bad', why?

Normally, this is not right, it actually depends on the problem you're facing and trying to solve, you have to decide for yourself whether type 1 error is more harmful or type two error is more harmful in your project approach.

In a scenario whereby a septuagenarian woman has a swollen stomach or baby bump, our ground truth is going to be that 
**"She has fibroid"** 

while our alternate hypothesis will be
**"She doesn't have fibroid"**

```
H0 = "She has fibroid"
H1 = "She has no fibroid" (Maybe she's pregnant)
```

In this case, after carrying out hypothesis testing on her condition, will it be safe to make the mistake of saying or assuming
**"She has no fibroid",** 
when she actually has fibroid? 
or will it be costlier to make the assumption of  
**"She has fibroid",**
When she's actually miraculously pregnant like Hannah?.

There is someone's life involved here so you have to think it through.

## Confidence of Null Hypothesis (Probability Value)

Technically, the only way we can accept or reject our ground truth (null hypothesis) is after determining our *P-value* which is an abbreviation for probability value. It is the only thing that has the decisive power to accept or reject H0.

***The smaller our P-values is the more delicate it is to accept our null hypothesis.***

To calculate our P-value, there should be a certain level of significance to our ground truth or initial assumption, so a smaller P-value is telling us there are more reasons why we should accept our alternative hypothesis.

P-value is within the range of 0 and 1, but the threshold value is always set at 0.05, it can also be called *alpha*, alpha is always set before the experiments in order to avoid bias. 

Our alpha value is the probability of making a wrong decision when the ground truth(H0) is true. It is always calculated as 

```
alpha = 1 - confidence level
```

if the confidence level from what we've seen in our data is 95%, then 

```
alpha = 1 - 0.95
```

which is 0.05.

## Why is 95% confidence level the most accustomed?

Since we know that alpha level is the probability of encountering a Type I error(which is rejecting H0 despite being true), would it not make sense to make it as bitsy as possible. Imagine our alpha value being set to 10%, obviously, there is an increasing chance that we will make the mistake of rejecting the null hypothesis, but it must not be too small as well, if we set the alpha value as 1%, it will be too small that our decision will be reeking of bias. Hence, the standard has been 5%.

## Statistical Techniques for Hypothesis Testing

In this tutorial, I will be touching on three methods of carrying out statistical hypothesis testing, namely:

1. Chi-Square Test
2. T-Test
3. ANOVA Test

## Chi-Square Test

This is used to perform testing on two categorical variables in our data population. It is focused on looking for an important relationship between two categorical variables.

With Chi-Square, we accept the null hypothesis when variable A and variable B are not dependent, i.e. there is no relationship between them.
We reject the null hypothesis(or accept the alternate hypothesis) when variable A depends on variable B, i.e. there is a relationship between them.



### Load our dependencies.



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

The libraries imported are the day-to-day libraries for any data science python implementation work, except the f_oneway for the ANOVA and chi2_contigency for Chi-square.

##### I will be using the popular iris data set for the tutorial, you can get it almost anywhere but I downloaded this from [kaggle](www.kaggle.com).

#### Load the data into the notebook



```python
df = pd.read_csv("/content/drive/MyDrive/IRIS.csv")
```



```python
df.head()
```



<div>
<style scoped>
 .dataframe tbody tr th:only-of-type {
 vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sepal_length</th>
      <th>sepal_width</th>
      <th>petal_length</th>
      <th>petal_width</th>
      <th>species</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>Iris-setosa</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>Iris-setosa</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>Iris-setosa</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
      <td>0.2</td>
      <td>Iris-setosa</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>Iris-setosa</td>
    </tr>
  </tbody>
</table>
</div>



On checking the first five, it seems all the species of flower are setosa, but the iris dataset has 2 more samples apart from that, to be sure, let's run df.sample() to visualize samples randomly.



```python
df.sample(10)
```



<div>
<style scoped>
 .dataframe tbody tr th:only-of-type {
 vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sepal_length</th>
      <th>sepal_width</th>
      <th>petal_length</th>
      <th>petal_width</th>
      <th>species</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>16</th>
      <td>5.4</td>
      <td>3.9</td>
      <td>1.3</td>
      <td>0.4</td>
      <td>Iris-setosa</td>
    </tr>
    <tr>
      <th>116</th>
      <td>6.5</td>
      <td>3.0</td>
      <td>5.5</td>
      <td>1.8</td>
      <td>Iris-virginica</td>
    </tr>
    <tr>
      <th>70</th>
      <td>5.9</td>
      <td>3.2</td>
      <td>4.8</td>
      <td>1.8</td>
      <td>Iris-versicolor</td>
    </tr>
    <tr>
      <th>101</th>
      <td>5.8</td>
      <td>2.7</td>
      <td>5.1</td>
      <td>1.9</td>
      <td>Iris-virginica</td>
    </tr>
    <tr>
      <th>72</th>
      <td>6.3</td>
      <td>2.5</td>
      <td>4.9</td>
      <td>1.5</td>
      <td>Iris-versicolor</td>
    </tr>
    <tr>
      <th>107</th>
      <td>7.3</td>
      <td>2.9</td>
      <td>6.3</td>
      <td>1.8</td>
      <td>Iris-virginica</td>
    </tr>
    <tr>
      <th>42</th>
      <td>4.4</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>Iris-setosa</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>Iris-setosa</td>
    </tr>
    <tr>
      <th>62</th>
      <td>6.0</td>
      <td>2.2</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>Iris-versicolor</td>
    </tr>
    <tr>
      <th>20</th>
      <td>5.4</td>
      <td>3.4</td>
      <td>1.7</td>
      <td>0.2</td>
      <td>Iris-setosa</td>
    </tr>
  </tbody>
</table>
</div>



Always check for missing values to avoid future complications.



```python
df.isnull().sum()
```



   sepal_length    0
    sepal_width     0
    petal_length    0
    petal_width     0
    species         0
    dtype: int64



We can be sure now that there are 3 classes of species and there are no missing values. 
Let's proceed with the manipulation.

## Let's Start Our Operations

Let's use petal width to compare species for our Chi-Square Test. 

The first step is to check the summary of petal_width 

secondly, use the information derived to convert it to a categorical variable.



```python
df.petal_width.describe()
```



   count    150.000000
    mean       1.198667
    std        0.763161
    min        0.100000
    25%        0.300000
    50%        1.300000
    75%        1.800000
    max        2.500000
    Name: petal_width, dtype: float64



Let us break up the value of petal_width into zeros and ones using the median as the yardstick.

The 50% quartile.



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

Let's transform our "species" column too into 0,1 and 2.



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



<div>
<style scoped>
 .dataframe tbody tr th:only-of-type {
 vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sepal_length</th>
      <th>sepal_width</th>
      <th>petal_length</th>
      <th>petal_width</th>
      <th>species</th>
      <th>petal_width_new</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>88</th>
      <td>5.6</td>
      <td>3.0</td>
      <td>4.1</td>
      <td>1.3</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>57</th>
      <td>4.9</td>
      <td>2.4</td>
      <td>3.3</td>
      <td>1.0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>59</th>
      <td>5.2</td>
      <td>2.7</td>
      <td>3.9</td>
      <td>1.4</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>55</th>
      <td>5.7</td>
      <td>2.8</td>
      <td>4.5</td>
      <td>1.3</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>54</th>
      <td>6.5</td>
      <td>2.8</td>
      <td>4.6</td>
      <td>1.5</td>
      <td>1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



```python
df_new = df.drop(columns=["sepal_width", "sepal_length", "petal_length", "petal_width"])
```



```python
df_new.head()
```



<div>
<style scoped>
 .dataframe tbody tr th:only-of-type {
 vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>species</th>
      <th>petal_width_new</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



Let's make use of chic2_contigency provided for us in scipy.stats library.

It has been added to our dependencies earlier in the notebook.



```python
stat, p, dof, expected= chi2_contingency(df_new)

print(dof)
```

    149



We can comfortably get 3 outputs in test statistics, degree of freedom, p-value, and expected values.

The amount of features or variables that we have access to varying is the degree of freedom.

Hence, we set our probability of confidence to 95% as explained earlier in the tutorial.



```python
prob = 0.95

alpha = 1.0 - prob

print('alpha/significance level=%.3f' % alpha)
print('P-value =%.2f' % p)

if p <= alpha:
 print('Reject the Null Hypothesis ( reject H0)')
else: 
 print('Accept the Null Hypothesis (fail to reject H0)')
```

    alpha/significance level=0.050
    P-value =0.10
    Accept the Null Hypothesis (fail to reject H0)



## Conclusion

Since the P-value is greater than the alpha value set at 0.05, we will fail to reject the null hypothesis. This means the petal width and species of flower are not dependent, i.e. there is no relationship between them.

## T-Test

The T-test is utilized when we plan to evaluate the discrepancy between the means of two groups of samples. Unlike Chi-Square Test, the T-test is used on continuous variables.

It has three basic types

1. **One sample t-test:** It checks whether the population has a different mean from the sample.

2. **Two-sample t-test:** It checks and compares the means of two groups that are not dependent on each other and compare with the population's means to see if there is a huge difference.

3. **Paired t-test:** It is used in checking and comparing the means of different samples from a group.

## Performing a One-Sample T-Test



```python
df_ = df.petal_width
```



```python
df_.sample(5)
```



   101    1.9
    92     1.2
    99     1.3
    20     0.2
    43     0.6
    Name: petal_width, dtype: float64



```python
stats.ttest_1samp(a=df_, popmean=1.199)
```



   Ttest_1sampResult(statistic=-0.0053494404016899925, pvalue=0.9957389399651244)



## Conclusion

**H0:** The mean of petal_width is 1.199

**H1:** The mean of petal_width is not 1.199

From the test, since the P-value beats the alpha level set at 0.05,

we fail to reject the null hypothesis because we don't have enough evidence to prove otherwise, moreover, if you check, the P-value is very close to 1.0,

This means that the mean of petal_width is most likely 1.199.
 
 The evidence is too strong to be rejected, it is almost accurate. (Obviously, I copied the mean from the summary).

## Performing a Two-Sample T-Test

We need to first of all check their variances.

The ratio of the higher to the lower variance must be less than 4:1 before we can assume the two samples have the same variance.



```python
class1 = df.petal_width
class2 = df.sepal_length
```

find variance for each group



```python
print(np.var(class1), np.var(class2))
```

    0.5785315555555559 0.6811222222222222



```python
ratio_check = 0.6811222222222222 / 0.5785315555555559

ratio_check
```



   1.1773294225379805



Obviously, the ratio is less than 4:1, thus the variances are assumed to be equal.



```python
stats.ttest_ind(a=class1, b=class2, equal_var=True)
```



   Ttest_indResult(statistic=-50.51520141387464, pvalue=3.7974378831185126e-148)



## Conclusion

Evaluating this:

**H0:** The mean of the two samples (petal_width and sepal_length) are equal. 

**H1:** The mean of the two samples (petal_width and sepal_length) are not equal.

Our P-value ( p = 3.7974378831185126e-148) is far less than alpha = 0.05, 

This explains that the means of the two samples are different and not equal. Thus, we will reject the Null Hypothesis, there is no evidence sustainable enough to accept it.
H1 (alternate hypothesis) is however true.

## ANOVA Test

It is used to check the contrast between three or more samples with one test. Especially when the categorical class has more than two categories.
 

During ANOVA testing, the hypothesis is:

**H0:** When all samples' means are the same.

**H1:** When one or more samples are very much different.

## One Way ANOVA Test



```python
class1 = df.petal_width
class2 = df.sepal_length
class3 = df.petal_length
```



```python
f_oneway(class1, class2, class3)
```



   F_onewayResult(statistic=555.8702565323317, pvalue=5.738282463819433e-122)



## Conclusion

As mentioned earlier:

In ANOVA testing, the hypothesis is:

**H0:** When all samples' means are the same.

**H1:** When one or more samples are very much different.

Since our P-value (5.738282463819433e-122) is far less than alpha = 0.05, therefore, we reject the Null Hypothesis, there is no evidence sustainable enough to accept it. 

This means that the sample means are very much different. Hence, our H1 (alternate hypothesis) is thus true.

## Two Way ANOVA Test

This is called for when we are dealing with three or more variables, trying to compare their means with each other.



```python
petal = df.petal_width
sepal = df.sepal_length
species = df.species
```



```python
model = ols('species ~ C(petal) + C(sepal) + C(petal):C(sepal)', data=df).fit()
sm.stats.anova_lm(model, typ=2)
```



<div>
<style scoped>
 .dataframe tbody tr th:only-of-type {
 vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sum_sq</th>
      <th>df</th>
      <th>F</th>
      <th>PR(&gt;F)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>C(petal)</th>
      <td>-3.366075e-09</td>
      <td>21.0</td>
      <td>-2.959187e-09</td>
      <td>1.000000e+00</td>
    </tr>
    <tr>
      <th>C(sepal)</th>
      <td>3.871868e+00</td>
      <td>34.0</td>
      <td>2.102372e+00</td>
      <td>9.847289e-02</td>
    </tr>
    <tr>
      <th>C(petal):C(sepal)</th>
      <td>5.940146e+02</td>
      <td>714.0</td>
      <td>1.535914e+01</td>
      <td>3.716614e-16</td>
    </tr>
    <tr>
      <th>Residual</th>
      <td>2.166667e+00</td>
      <td>40.0</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



## Conclusion

The P-value of petal width is greater than 0.05, which increases the probability of our null hypothesis being accepted. 

The P-value of sepal length is less than 0.05, which increases the probability of our null hypothesis being rejected.

Likewise, the P-value of both petal_width and sepal_length is less than 0.05, we reject the null hypothesis because it is obvious one or more samples are very much different in their means. That is to say, the average of all data samples is not equal.

**Happy coding**

---
hero image is gotten from: 
https://automatetheplanet.com via duckduckgo image search
---