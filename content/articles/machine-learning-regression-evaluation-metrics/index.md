---
layout: engineering-education
status: publish
published: true
url: /machine-learning-regression-evaluation-metrics/
title: Machine Learning Regression Evaluation Metrics
description: In this tutorial, we will discuss various evaluation metrics used in regression models, advantages and disadvantages of these regression model metrics.
author: denis-kuria
date: 2021-11-25T00:00:00-13:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/machine-learning-regression-evaluation-metrics/hero.jpg 
    alt: Machine Learning Regression Evaluation Metrics Hero image
---
In machine learning, a regression model is a type of model that predicts a numeric value. These values can be those of price, fees, score, etc. 
<!--more-->
We need to measure the performance of machine learning models in order to determine their reliability. After model fitting, we assess the performance of the model by comparing the predictions the model generates to actual data. 

In this tutorial, we are going to discuss various evaluation metrics used in regression models. Besides, we will discuss the advantages and disadvantages of these regression model metrics. Finally, we will discuss what a good regression model is.

### Prerequisites
To understand this article, you ought to:
- Be familiar with Machine learning.
- Be familiar with regression models.

### Table of contents
- [Introduction](#introduction)
- [Mean Absolute Error (*MAE*)](#mean-absolute-error-mae)
- [Mean Squared Error (*MSE*)](#mean-squared-error-mse)
- [Root Mean Squared Error(*RMSE*)](#root-mean-squared-error-rmse)
- [R Squared (*R²*)](#r-squared-r²)
- [Adjusted R Squared](#adjusted-r-squared)
- [Root Mean Squared Log Error(*RMSLE*)](#root-mean-squared-log-error)
- [What is a good regression model](#what-is-a-good-regression-model)
- [Conclusion](#Conclusion)

### Introduction
There are numerous regression evaluation metrics. All these metrics aim at showing us the prediction error of our model. An error is defined as the difference between the value the model predicts and the actual value. The lower the error, the better the performance of the model, and the higher the error, the worse the performance of the model.

![Reference](/engineering-education/machine-learning-regression-evaluation-metrics/reference.jpeg)

The diagram above shows what an error is and how it is computed.

### Mean Absolute Error (MAE)
We obtain *MAE* by calculating the absolute difference between the predictions made by the model and the real values. Absolute means that we do not put into consideration the sign of the difference obtained. *MAE* is calculated using the formula below.

![MAE](/engineering-education/machine-learning-regression-evaluation-metrics/mae.png)

*n* is the total number of data points.

We calculate *MAE* by following the steps below:
1. Calculate the residual (error) of each data point.
2. Calculate the absolute value. This is to get rid of the sign.
3. Calculate the average of all residuals.

If *MAE* is zero, the model predictions are perfect. The higher the *MAE* the worse the predictions are.

**Advantages**
- The *Mean Absolute Error* we get is in a similar unit as the output variable.
- In terms of outliers, it is more robust.

**Disadvantages**
- We have to apply Gradient descent to the graph of *MAE* to make it differentiable.

### Mean Squared Error (MSE)
This metric is almost similar to *MAE*. The difference is that in *MSE* instead of using absolute values, we use the squares of the difference between the predicted values and the actual values. In the case of data outliers, *MSE* will be larger than *MAE* since we are squaring the error.

 *MSE* is calculated using the following formula.

![MSE](/engineering-education/machine-learning-regression-evaluation-metrics/mse.png)

We calculate *MSE* by following the steps below:

1. Calculate the error of each data point.
2. Calculate the squared value of the errors.
3. Calculate the average of the results we got in step 2.

**Advantages**
- Unlike *Mean Absolute Error* the graph of *Mean Squared Error* is differentiable hence we can easily use it as a loss function.

**Disadvantages**
The value of *MSE* is in the squared unit of the output. This makes it not easy to interpret loss.

### Root Mean Squared Error (RMSE)
Root Mean Error constitutes the standard deviation of the residuals. i.e differences between the model predictions and the true values. RMSE provides an estimate of how large the residuals are distributed.

We use the following formula to calculate *RMSE*:

![RMSE](/engineering-education/machine-learning-regression-evaluation-metrics/rmse.png)

We calculate *RMSE* by following the steps below:

1. Calculate the error for each data point.
2. Calculate the squared value of the residuals.
3. Calculate the average of the squared residuals.
4. Obtain the square root of the answer in step 3.

**Advantages**
- When it comes to outliers, *RMSE* is more sensitive than *MAE*.
- Makes it easier to compute gradient when used as a loss function.

**Disadvantages**
- When compared to *MAE* it is less robust to outliers.

### R Squared (R²)
This metric is used to describe the goodness of fit of linear regression. We also refer to it as the coefficient of determination. Simply put R² is used to show : 

"How the change in the output (y) is a result of the change in the input (x).

We use the following formula to calculate *RMSE*:

![R Squared](/engineering-education/machine-learning-regression-evaluation-metrics/r.png)

- SSR is the sum of the squared error of the regression line.

- SST is the sum of the squared error of the mean line.

The values of r2 are in the range, 0 < r2 < 1. When the value of r2 is closer to 0, the model is not doing a good job at capturing the trends in data. The closer r2 is to 1, the better our model is at performing its predictions.

**Advantages**
- Shows how well the predictions fit the observations.

**Disadvantages**
- It cannot determine whether the predictions are biased.

### Adjusted R Squared
We use Adjusted R-squared to figure out how reliable the correlation is. We determine this by adding new independent variables. It shows whether the added predictors improve the regression model or they are of no value.

We use the following formula to calculate *adjusted r squared*:

![Adjusted](/engineering-education/machine-learning-regression-evaluation-metrics/adjusted.png)

Adjusted R-squared will penalize us for adding independent variables that do not fit the model. The independent variable is represented by *k* in the above formula.

**Advantages**
- It shows us how relevant the new term we add is.

**Disadvantages**
- None. This is because it solves the problem of *R²*. The problem is that in R² every time a new term is introduced R² increases. This is regardless of whether the new term is relevant to the model or not.

### Root Mean Squared Log Error
In Root Mean Squared Squared Log Error, a higher penalty is administered when the value the model predicts is lower than the actual value. When the value the model predicts is higher than the actual value, *RMSLE* administers a lower penalty.

We use the formula below to calculate the *root mean squared error*:

![RMSLE](/engineering-education/machine-learning-regression-evaluation-metrics/rmsle.png)

In the *root mean squared error* we previously discussed, if an outlier is present, the error will shoot to a very high value. In *RMSLE*, the effect of the outlier is significantly lower due to the Introduction of log in the formula.

**Advantages**
- Useful when we want the output to vary on large scale.

**Disadvantages**
- Not very helpful when we are developing a model in which we are calling the inputs.

### What is a good regression model
A good regression model is one in which the difference between the predicted values and the actual values is low. The lower the better. The model should also be unbiased. To understand what a biased model is, refer to the following [article](https://stats.stackexchange.com/questions/13643/what-intuitively-is-bias).

### Conclusion
In this article, we have discussed the metrics used in the regression model. You now know what each metric entails. You will now be able to choose the metric that works for you when implementing these metrics in your model.

Wish you all the luck!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
