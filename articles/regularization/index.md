---
layout: engineering-education
status: publish
published: true
url: /engineering-education/regularization/
title: Regularization to Prevent Overfitting
description: This article will provide an overview on how to prevent overfitting of data using Regularization. The goal is to understand what overfitting is, and how to prevent them using regularization techniques.
author: collins-ayuya
date: 2021-01-22T00:00:00-19:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/regularization/hero.jpg
    alt: Regularization hero image
---
Overfitting impacts the accuracy of Machine Learning models. The model attempts to capture the data points that do not represent the accurate properties of data. These data points may be considered as a noise.
<!--more-->
To avoid the occurrence of overfitting, we may use a method called as regularization. In this article, we will mathematically explore two types of regularization.

### Contents

1. Regularization and Overfitting
2. Lasso Regression
3. Ridge Regression

### Prerequisites

As a prerequisite, a basic understanding of Machine Learning is required. To learn more about Machine Learning, read this [article](/engineering-education/supervised-learning-algorithms/). The equations covered in this article are very simple and easy to follow.

### Regularization and Overfitting

Overfitting is an occurrence that impacts the performance of a model negatively. 

It occurs when a function fits a limited set of data points too closely. Data often has some element of random noise within it. For example, The training data may contain data points that do not accurately represent the properties of the data. These points are considered as noise. When a function fits a set of such datapoints too closely, the model learns from noise in the data. As a result, the complexity of the model is increased. This impacts the ability of the model to make reliable predictions on test data. The model may also be unable to fit additional data. This may lead to sub-par performance on test data. 

The image below shows the phenomena of overfitting, underfitting, and the correct fit.

![overfitting](/engineering-education/regularization/overfitting.png)

*Overfitting, correct fit, and underfitting.*

[Source](https://analyticsindiamag.com/regularization-in-machine-learning-a-detailed-guide/)

For a better understanding of overfitting, bias and variance, check out my previous [article](/engineering-education/ensemble-bias-var/). 

Overfitting occurs because a model fails to generalize data that contains a lot of irrelevant data points. Regularization is an answer to overfitting. It is a technique that improves model accuracy as well as prevents loss of important data that is suffered during underfitting. Regularization is a type of regression that shrinks coefficient estimates to zero to reduce the capacity of a model. It removes extra weights from select features and redistributes the weights evenly. This means that regularization discourages the learning of both a model of high complexity and flexibility. In turn, the risk of overfitting is lowered.

Let’s use a linear regression equation to explain regularization further.

$$ Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + … + \beta_p X_p $$

$Y$ represents the value that is to be predicted. $\beta_i$ stands for the regressor coefficient estimates for the corresponding predictor $X_i$. And, $X_i$ represents the weights or magnitudes assigned to various predictors (independent variables). Here, `i` represents any value greater than or equal to `0`, and less than `p`.
A loss function is involved in the fitting process. This loss function is referred to as the residual sum of squares (RSS). Linear models attempt to optimize the coefficients to minimize the loss function. This is shown by the equation for the loss function below.

$$ RSS = \sum\limits_{i=1}^n( y_i – \beta_0 - \sum\limits_{j=1}^p {\beta_j x_ij )^2} $$

Based on the training data, the coefficients shall be adjusted. If there is the existence of noise in the training data, the approximated coefficients shall not generalize well to unseen data. Regularization comes into play and shrinks the learned estimates towards zero.

### Lasso Regression

Lasso regression is a regularization technique to reduce model complexity. It is also known as L1 regularization. Lasso stands for Least Absolute Shrinkage and Selector Operator. Let’s look at the equation below.

$$ \sum\limits_{i=1}^n( y_i – \beta_0 - \sum\limits_{j=1}^p {\beta_j x_ij )^2} + \lambda \sum\limits_{j=1}^p \mid \beta_j \mid = RSS + \lambda \sum\limits_{j=1}^p \mid \beta_j \mid $$

We note that it is a variation of the loss function equation, with the introduction of a penalty term. To penalize high coefficients, lasso uses absolute values of beta $ (\mid \beta\mid) $. Whereas, as we shall learn, ridge regression uses the squares of beta $(\beta^2)$ for a similar purpose.
Lasso shrinks the regression coefficients to regularize the model parameters. Unlike ridge regression, as we shall cover later, lasso can reduce some regression coefficients to zero. This is particularly important when it comes to feature selection.
The feature selection process is attributed to the ability of lasso to reduce some regression coefficients to zero. It comes after the regression coefficients are shrunk. Every non-zero regression coefficient is selected for use in the model. Since some features are eliminated, less important features will not feature in the final model. This greatly assists in minimizing prediction errors.

Lasso also improves the prediction accuracy of models. The shrinking of coefficients minimizes the bias and reduces the variance of models. A context that favors the use of lasso is when we have a high number of features and a small amount of data. The tuning parameter $\lambda$ controls the shrinkage. From the equation, when $\lambda$ is zero, the equation is reduced to the linear regression loss function equation. The greater the value of $\lambda$, the greater the reduction of the coefficients towards zero.

### Ridge Regression

Ridge regression refers to a type of linear regression where in order to get better predictions in the long term, we introduce a small amount of bias. Known as L2 regularization, it is a technique used to reduce model complexity. In ridge regression, the loss function is altered. A penalty term is added to it, as we shall see below. Let’s explain ridge regression better using the following equation.

$$ \sum\limits_{i=1}^n( y_i – \beta_0 - \sum\limits_{j=1}^p {\beta_j x_ij )^2} + \lambda \sum\limits_{j=1}^p \beta_j^2 = RSS + \lambda \sum\limits_{j=1}^p \beta_j^2 $$

Above is the ridge regression equation. AS we can see, the difference between the above equation and the general equation for the loss function is that $ \lambda \sum\limits_{j=1}^p \beta_j^2 $ is added on both sides. A shrinkage quantity is added to RSS, thus modifying it. To estimate the coefficients, the function above has to be minimized. A penalty term is introduced. To penalize the flexibility of our model, we use a tuning parameter that decides the extent of the penalty. The tuning parameter is $\lambda$. Higher values of the coefficients represent a model with greater flexibility. To minimize the function, these coefficients should be small. L2 regularization ensures the coefficients do not rise too high.

When the value of $\lambda$ tends to zero, the L2 regularization equation becomes the loss function of the linear regression model. The penalty term will have no effect. This means that if the value of $\lambda$ is minimum, the model can be called a simple linear regression model. Conversely, when the $\lambda$ value tends to infinity, the effect of the shrinkage penalty increases. As a result, the coefficient estimates of the ridge regression will approach zero. This underlines the importance of choosing a good value for $\lambda$.

Linear or polynomial regression will likely prove unsuccessful if there is high [collinearity](https://machinelearningmind.com/2019/10/19/multicollinearity-how-to-fix-it/) between the independent variables. Ridge regression is a potential solution to handle multicollinearity. We shall explore this in a different article.

However, ridge regression has one clear disadvantage; model interpretability. When shrinking the coefficients of the predictors of the least importance, it will get them to be very close to zero. Here’s the problem. They won’t actually be zero. As a result, one may end up including all the coefficients in the final model. Whereas lasso regression manages to force some coefficient estimates to zero when $\lambda$ is large enough. Resultantly, we can say lasso performs feature selection. Furthermore, the resulting models can be considered sparser compared to the ones resulting from the L2 technique. This is because some of the estimate coefficients can be truly zero. The number of predictors is reduced.

### Wrapping Up

Regularization is a formidable technique to prevent overfitting. There are several regularization techniques. We have looked at two of the most popular ones. Through this article, we have understood how the two compare to each other and how they are derived from the linear regression loss function equation. Until next time, good luck!

### References and Further Reading

1. [The Elements of Statistical Learning](https://www.springer.com/gp/book/9780387848570)

2. [Regularization in Machine Learning](https://towardsdatascience.com/regularization-in-machine-learning-76441ddcf99a)

3. [Regularization in Machine Learning](https://www.geeksforgeeks.org/regularization-in-machine-learning/)

4. [Regularization In Machine Learning – A Detailed Guide](https://analyticsindiamag.com/regularization-in-machine-learning-a-detailed-guide/)

5. [Regularization in Machine Learning](https://www.javatpoint.com/regularization-in-machine-learning#:~:text=Regularization%20is%20one%20of%20the%20most%20important%20concepts,does%20not%20perform%20well%20with%20the%20test%20data.)

6. [What is Regularization in Machine Learning?](https://codeburst.io/what-is-regularization-in-machine-learning-aed5a1c36590)

7. [Regularization Machine Learning](https://www.educba.com/regularization-machine-learning/)

8. [Regularization](https://datascience.eu/machine-learning/regularization-in-machine-learning/)
