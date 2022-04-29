---
layout: engineering-education
status: publish
published: true
url: /predictive-mean-matching/
title: Understanding Predictive Mean Matching and Regression Modeling in R
description: This tutorial will help the reader understand how to predict mean matching & regression modeling in R.
author: valentine-omondi
date: 2022-04-29T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/predictive-mean-matching/hero.jpg
    alt: understanding predictive mean matching and regression modeling in R Hero Image
---
In the real world, datasets have missing values/data which causes complications for data scientists who may deal with this by filling the datasets in an ad hoc fashion. Hence limiting them from their quest for data science main objectives: data visualization, data modeling, and giving conclusive meaningful summary or analysis of the dataset.
<!--more-->
This tutorial aims to replace the missing data using predictive mean matching and creating a predictive Regression model. We will explain the suitability, advantages, and limitation of each method for each use case.

In our tutorial, we will use the R programing language to statistically impute missing values in datasets using predictive mean matching and carrying out an analysis of PMM, and creating a regression model.

Let us get started.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Goals](#goals).
- [Installing and loading packages in R](#installing-and-loading-packages-in-r).
- [Predictive mean matching and the use case](#predictive-mean-matching-and-the-use-case).
- [Singular imputation](#singular-imputation).
- [Solving for missing Values Using Predictive Mean Matching](#solving-for-missing-values-using-predictive-mean-matching).
- [Plotting our imputed values](#plotting-our-imputed-values).
- [Fitting a linear regression for a predictive model](#fitting-a-linear-regression-for-a-predictive-model).
- [Multiple imputation by MICE](#multiple-imputation-by-mice).
- [Let us begin our imputation process](#let-us-begin-our-imputation-process).
- [Accessing the instances of imputations and the imputed values](#accessing-the instances-of-imputations-and-the-imputed-values).
- [Fitting a linear regression model-A predictive model](#fitting-a-linear-regression-modela-predictive-model).
- [A complete case analysis for all five regressed models](#a-complete-case-analysis-for-all-five-regressed-models).
- [To get a wholesome predictive model for all the five imputations combined](#to-get-a-wholesome-predictive-model-for-all-the-five-imputations-combined).
- [Conclusion](#conclusion).

### Prerequisites
To follow through this tutorial, the reader should:
- [Have R studio installed](https://www.rstudio.com/).
- Have a basic understanding of the R programming language.
- Basic data preprocessing methods.

### Goals
By the end of this tutorial, the reader should be able to:
- Understand and be able to carry out data imputation using these methods.
- Handle missing data in datasets.
- Visualize missing dataset using given plot functions.

### Installing and loading packages in R
For our first step in this tutorial, we need to install and load packages, which we will use for our imputation and visualizing data. Let's have the following packages installed; `VIM`, `mice`, `ggplot2`, since we will use some functions in them.

### Predictive mean matching and the use case
Predictive Mean Matching (PMM) is a technique of imputation that estimates the likely values of missing data by matching to the observed values/data. This can be carried out either by singular imputations or multiple imputations.

### Singular imputation
Let's call a dataset found in the VIM package called `nhanes`.

```r
head(nhanes)
```

![nhanes-dataset](/engineering-education/predictive-mean-matching/nhanes-dataset.PNG)

Our model will assume `chl` as the response variable and `bmi` and `hyp` as predictor variables. 

To find out the percentage of missing values, we will use the`mean()` and `is.na()` functions:
```bash
mean(is.na(nhanes$hyp))
[1] 0.32
mean(is.na(nhanes$bmi))
[1] 0.36
mean(is.na(nhanes$chl))
[1] 0.4
```

32%,36%,40% of hyp,bmi,chl are missing in the dataset, respectively.

### Solving for missing values using Predictive Mean Matching
For this, we are going to use the `mice` package in R:
We will apply some functions found in this package, the `complete()` and `mice()` functions to impute our data. Since we are imputing for the first instance only for our data, we let m be equal to one.

```bash
imp <- complete(mice(nhanes, m = 1, method = "pmm"))
#our imputed values are stored in the working environment
#we are doing a single imputation hence m=1
```
To view our data.
```bash
head(imp)
#putting our data in format for viewing
```
The data is stored in our environment, click on the `imp` to view it.

#### Plotting our imputed values
```bash
heart.plot <- ggplot(imp, aes(x=bmi, y=chl)) +
geom_point()
heart.plot
```

![r-box-plotting](/engineering-education/predictive-mean-matching/r-pbox-plotting.png)

### Fitting a linear regression for a predictive model
Writing the following code in R creates a predictive model with our interest modeled as: `chl` as the response variable and ` bmi`, `hyp` as the predicting variables.

```bash
fitmodel <- with(imp, lm(chl  ~  bmi + hyp))
summary(fitmodel)
#we get the following below
```

![summary](/engineering-education/predictive-mean-matching/summary.PNG)

The estimated effect of BMI on cholesterol level is 2.45, while the estimated effect of hypertension on cholesterol is 16.845. Implying that for every 1% increase in BMI, there is a correlated 2.45% increase in the incidence of cholesterol levels. 

Also, for every 1% increase in hypertension, there is a 1% increase in the rate of cholesterol levels.

### Multiple imputations by MICE
`Mice` is a package that takes an incomplete dataset; having missing/NA values, and then plugs in the missing values through an appropriate technique. The default plugging technique is predictive mean matching with the `m` set to be equal to five as the default.

For multiple imputations, what it does is create multiple numbers of complete datasets for each incomplete dataset and then perform the required analysis to give the desired output. For this section, we will call a dataset in R to show predictive mean matching by multiple imputations.

For our tutorial, we choose the `nhanes` dataset found in `mice` which has 4 variables `age`, `BMI`, `hyp`, and `chl`. In our case, we will prioritize modeling cholesterol levels as a function of age and hypertension.

Let's load our data in R by following the steps.
```bash
library(mice)
library(VIM)
head(nhanes)
#to view the data in nhanes we use the head function
age  bmi  hyp  chl
1  1  NA  NA  NA
2  2  22.7  1  187
3  1  NA  1  187
4  3  NA  NA  NA
5  1  20.4  1  113
6  3  NA  NA  184
```

We need `VIM` for plotting. In our case, let's take our response variable to be `cholesterol level` and the predictor variables to be `age` and `hypertension`.
The mice package also comes with some functions that will enable us to inspect the missing data patterns that are in the dataset. To inspect for the missing data patterns in our `nhanes` dataset, we will use the function `md.pattern()`.
```bash
md.pattern(nhanes)
age  hyp  bmi  chl
13  1  1  1  1  0
3  1  1  1  0  1
1  1  1  0  1  1
1  1  0  0  1  2
7  1  0  0  0  3
0  8  9  10  27
```
This signifies that 13 of the 25 rows have been completed. There is just one row where the `bmi` is missing, and seven rows where only the `age` is available, for 27 missing variables, missing values for `chl` equals ten.

We can have four types of missing data patterns represented in an array form.
- The observation where both pairs of values are observed and denoted by `rr`.
- The first variable in the row is observed while the second variable in the column is missing `rm`.
- The third pattern first variable is missing while the second variable is observed `mr`.
- The observation where both variables are missing `mm`.

To see the pair-wise pattern, we use `md.pairs()` to see the pair-wise pattern and store the result in a pattern-pairs object.
When we call `pattern-pairs` object, it gives us four matrices that give the pattern.

```bash
md.pairs(nhanes)
```
To show screen capture, we use the `VIM` package to get `pbox()` function to visualize the missing data in our `NHANES` dataset.
```r
pbox(nhanes,pos=1,int=GFALSE,cex=0.7)
```

![r-plot2](/engineering-education/predictive-mean-matching/r-plot2.png)

### Let us begin our imputation process
To begin our imputation, all we need is the name of our array in our case `nhanes` dataset.

```bash
imp<-mice(nhanes)
```

We will store it in `imp` object.

### Accessing the instances of imputations and the imputed values
The first imputed dataset can be obtained by writing the following code in r.
```bash
head(complete(imp))
#for the first instance of imputation
#head function to represent our data in data frame format
age  bmi  hyp  chl
1  1  22.7  1  187
2  2  22.7  1  187
3  1  30.1  1  187
4  3  28.7  2  186
5  1  20.4  1  113
6  3  25.5  2  184
```
For the second, we write.
```bash
head(complete(imp,2))
#for the second instance of imputation
age  bmi  hyp  chl
1  1  22.5  1  118
2  2  22.7  1  187
3  1  25.5  1  187
4  3  27.4  1  218
5  1  20.4  1  113
6  3  21.7  1  184
```
We can go to the fifth instance, and we can also check for an imputed variable value stored in each of the 5 imputed datasets by running the following code in r.
```bash
imp$imp$chl
#the second objectname,imputedvalue,is because we want the values to be stored in it
     1   2   3   4   5
1  187 118 199 187 187
4  186 218 218 218 204
10 229 186 204 206 187
11 187 199 187 206 131
12 199 187 218 206 206
15 187 186 187 199 187
16 184 113 238 204 131
20 186 218 184 186 199
21 187 238 187 229 113
24 184 204 187 206 284
```

For our next step, we append our imputed datasets with the original `nhanes` dataset. We carry out this using a function in `mice` called `complete()` function. We then use the `inc=TRUE` argument to specify what we want to combine with our original observed data.
Let's run the following code in R to produce this result.
```bash
imp2<- complete(imp, "long", inc = TRUE)
#it is converted to a format that can be used in other statistical programs eg spss.
#to view click `imp2` on the environment
```

### Fitting a linear regression model-A predictive model
As we had stated earlier, our aim is to build a predictive model with cholesterol level as our response variable, age, and hypertension status as our predictor variables. Running the following codes in R will approximate our regression model separately for the imputed datasets, from the first to the fifth.
```bash
fitmodel <- with(imp, lm(chl  ~  age + hyp))
summary(fitmodel)
#we use summary to give more details eg confidence interval,also the fmi
# A tibble: 15 x 6
term  estimate  std.error  statistic  p.value  nobs
<chr> <dbl> <dbl> <dbl> <dbl> <int>
1 (Intercept) 162. 21.4  7.56  0.000000148  25
2  age  15.1  10.9  1.39  0.179  25
3  hyp  2.68  20.7  0.130  0.898  25
4 (Intercept) 124. 26.3  4.71  0.000108  25
5  age  20.4  10.2  2.01  0.0571  25
6  hyp  25.8  22.6  1.14  0.266  25
7 (Intercept) 164. 22.2  7.38  0.000000221  25
8  age  13.1  11.3  1.16  0.259  25
9  hyp  6.72  21.5  0.312  0.758  25
10 (Intercept) 167. 21.8  7.66  0.000000120  25
11  age  14.2  11.1  1.29  0.212  25
12  hyp  3.78  21.1  0.179  0.859  25
13 (Intercept) 127. 23.9  5.30  0.0000253  25
14  age  32.9  10.9  3.01  0.00642  25
15  hyp  2.58  19.8  0.130  0.898  25
```

### A complete case analysis for all five regressed models
We write the following code in R to get this output.
```bash
pool(fitmodel)
Class:  mipo  m = 5
term  m  estimate  ubar  b  t  dfcom  df
1 (Intercept) 5  148.600681  537.6359  458.70483  1088.0817  22  6.098614
2  age  5  19.137087  118.0776  67.13213  198.6361  22  8.049288
3  hyp  5  8.301152  447.3520  97.94613  564.8873  22  13.659099
riv  lambda  fmi
1  1.0238263  0.5058864  0.6144994
2  0.6822511  0.4055584  0.5131566
3  0.2627357  0.2080687  0.3031436
```

### To get a wholesome predictive model for all the five imputations combined
Write the following code in R:
```bash
summary(pool(fitm))
term  estimate  std.error  statistic  df  p.value
1 (Intercept) 148.600681  32.98608  4.5049507  6.098614  0.003921111
2  age  19.137087  14.09383  1.3578341  8.049288  0.211353135
3  hyp  8.301152  23.76736  0.3492669  13.659099  0.732214796
```
Here, we get the set of the expected parameter evaluations for our predictive linear regression model.

### Conclusion
Predictive mean matching with m, 5 is the default in `mice` for continuous data. This way it provides imputations that possess many characteristics of the complete data. The imputed data lies in the range of the donor variables, meaning they are bounded above and below.

We then create a predictive model using regression modeling, which we will use when calculating other values. MAR (Missing At Random) is the response mechanism we used in our `mice` library. More information on the various response mechanisms can be found [here](https://cran.r-project.org/web/packages/mice/mice.pdf). 

Happy coding!

---
Peer Review Contributions by: [Mohamed alghadban](/engineering-education/authors/mohamed-alghadban/)
