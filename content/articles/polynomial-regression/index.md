---
layout: engineering-education
status: publish
published: true
url: /polynomial-regression/
title: Getting Started with Polynomial Regression in R
description: This article will introduce the reader to polynomial regression in R. This model will help the reader make accurate predictions.
author: lawrence-mbici
date: 2021-07-30T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/polynomial-regression/hero.jpg
    alt: Getting Started with Polynomial Regression in R
---
Polynomial regression is used when there is a non-linear relationship between dependent and independent variables. Examples of cases where [polynomial regression](https://towardsdatascience.com/introduction-to-linear-regression-and-polynomial-regression-f8adc96f31cb) can be used include modeling population growth, the spread of diseases, and epidemics.
<!--more-->
Such trends are usually regarded as [non-linear](https://sciencing.com/non-linear-relationship-10003107.html). 

The general form of a polynomial regression model is:

y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>X<sup>2 </sup> +........+ ε

For example, a polynomial model of `2` degrees can be written as:

y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>X<sup>2 </sup> + ε

Now that we know what Polynomial Regression is, let's use this concept to create a prediction model.

### Prerequisites
A general understanding of [R](https://www.r-project.org/) and the Linear Regression Model will be helpful for the reader to follow along.

### Step 1 - Data preprocessing
The dataset used in this article can be found [here](https://drive.google.com/file/d/1RToZTGkD8XI0OhacwretKIItStYBqqNn/view?usp=sharing). 

The first step we need to do is to import the dataset, as shown below:

```r 
dataset = read.csv('salaries.csv')  
```

This is how our dataset should look like:

![Dataset output](/engineering-education/polynomial-regression/dataset.png)

In the dataset above, we do not need `column 1` since it only contains the names of each entry. 

To remove `column 1` from our dataset, we simply run the following code:

```r
dataset= dataset[2:3]
```

Our dataset should now look like this:

![Newdataset output](/engineering-education/polynomial-regression/newdataset.png)

To determine whether a polynomial model is suitable for our dataset, we make a scatter plot and observe the relationship between `salary` (dependent variable) and `level` (independent variable).

```r
library(ggplo2)
ggplot() +
  geom_point(aes(x = dataset$Level, y = dataset$Salary),
             colour = 'red')
```

Our scatter plot should look as shown below:

![Plot of Salary against levels](/engineering-education/polynomial-regression/Salaryplot.png)

From the analysis above, it's clear that `salary` and `level` variables have a non-linear relationship. Therefore, a polynomial regression model is suitable.

The second step in data preprocessing usually involves splitting the data into the `training set` and the `dataset`. In our case, we will not carry out this step since we are using a simple dataset.

The `lm` function has also allowed us to take care of feature scaling.

### Step 2 - Fitting the polynomial regression model
The polynomial regression model is an extension of the linear regression model. The only difference is that we add `polynomial terms` of the `independent variables` (level) to the dataset to form our matrix. 

This is demonstrated below:

```r
dataset$Level2 = dataset$Level^2
dataset$Level3 = dataset$Level^3
dataset$Level4 = dataset$Level^4
```

Our new dataset will look like this:

![Newdataset added levels](/engineering-education/polynomial-regression/newdatasetlevels.png)

As stated, to fit the polynomial model, we use the `lm` function, as highlighted below:

```r
poly_reg = lm(formula = Salary ~ .,data = dataset)
```

After completing the polynomial model, we use the following code to evaluate its effectiveness:

```r
summary(poly_reg)
```

![polynomial regression summary results](/engineering-education/polynomial-regression/summary.png)

From the results above, the model is quite good due to its 99.53% accuracy.

### Step 3 - Visualizing of the model
We use the [ggplot2](https://ggplot2.tidyverse.org/) library to visualize our model, as demonstrated below:

```r
library(ggplot2)
x_grid = seq(min(dataset$Level), max(dataset$Level), 0.1)
ggplot() +
  geom_point(aes(x = dataset$Level, y = dataset$Salary),
             colour = 'red') +
  geom_line(aes(x = x_grid, y = predict(poly_reg,
                                        newdata = data.frame(Level = x_grid,
                                                             Level2 = x_grid^2,
                                                             Level3 = x_grid^3,
                                                             Level4 = x_grid^4))),
            colour = 'blue') +
  ggtitle('Truth or Bluff (Polynomial Regression)') +
  xlab('Level') +
  ylab('Salary')
```

Below are the results obtained from this analysis:

![visualization of the polynomial regression](/engineering-education/polynomial-regression/visualpoly.png)

From the graph above, we can see that the model is nearly perfect. It fits the data points appropriately. Therefore, we can use the model to make other predictions.

### Step 4 - Making predictions using the polynomial regression model
Now that we have developed the model, it's time to make some predictions. 

Assuming that you would like to predict the `salary` of an employee whose `level` is `7.5`. To do this, we use the `predict()` function, as highlighted below.

```r
# Predicting a new result with the polynomial regression
predict(poly_reg, data.frame(Level = 7.5,
                             Level2 = 7.5^2,
                             Level3 = 7.5^3,
                             Level4 = 7.5^4))
```

Output:

```r
225126.3
```

The `salary` of an employee with a `level` of `3.7` is calculated, as shown below: 

```r
predict(poly_reg, data.frame(Level = 3.7,
                             Level2 = 3.7^2,
                             Level3 = 3.7^3,
                             Level4 = 3.7^4)
```

The result is:

```r
84363.82 
```

The next step is to examine the effect of additional degrees on our polynomial model:

```r
dataset$Level5 = dataset$Level^5
```

Let's build a new model with a `Level5` column added and then examine its effects:

```r
poly_reg2 = lm(formula = Salary ~ .,data = dataset)

predict(poly_reg2, data.frame(Level = 7.5,
                             Level2 = 7.5^2,
                             Level3 = 7.5^3,
                             Level4 = 7.5^4
                             Level5= 7.5^5))
```

The employee's salary is predicted to be `237446` as compared to the `225123.3` we had obtained from the model with 4 degrees.

Generally, the more degrees the polynomial regression model has, the more accurate its predictions are.

### Conclusion
From this article, you have learned how to analyze data using polynomial regression models in R. You can use this knowledge to build accurate models to predict disease occurrence, epidemics, and population growth.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa)