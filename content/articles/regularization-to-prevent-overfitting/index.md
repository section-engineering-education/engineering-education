---
layout: engineering-education
status: publish
published: true
url: /regularization-to-prevent-overfitting/
title: Regularization to Prevent Overfitting
description: This article will provide an overview on how to prevent overfitting of data using Regularization. The goal is to understand what overfitting is, and how to prevent them using regularization techniques.
author: collins-ayuya
date: 2021-02-08T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/regularization-to-prevent-overfitting/hero.jpg
    alt: Regularization hero image
---
Overfitting impacts the accuracy of Machine Learning models. The model attempts to capture the data points that do not represent the accurate properties of data. These data points may be considered as noise. To avoid the occurrence of overfitting, we may use a method called regularization.
<!--more-->
In this article, we will mathematically explore two types of regularization.

### Contents
1. Regularization and Overfitting
2. Lasso Regression
3. Ridge Regression

### Prerequisites
As a prerequisite, a basic understanding of Machine Learning is required. To learn more about Machine Learning, read this [article](/supervised-learning-algorithms/). The equations covered in this article are very simple and easy to follow.

### Regularization and overfitting
Overfitting is an occurrence that impacts the performance of a model negatively. 

It occurs when a function fits a limited set of data points too closely. Data often has some elements of random noise within it. For example, the training data may contain data points that do not accurately represent the properties of the data. These points are considered as noise. 

When a function fits a set of such datapoints too closely, the model learns from noise in the data. This impacts the ability of the model to make reliable predictions on test data. The model may also be unable to fit additional data. This may lead to sub-par performance on test data.

The image below shows the phenomena of overfitting, underfitting, and the correct fit.

![overfitting](/engineering-education/regularization-to-prevent-overfitting/overfitting.png)

*Overfitting, correct fit, and underfitting.*

[Source](https://analyticsindiamag.com/regularization-in-machine-learning-a-detailed-guide/)

For a better understanding of overfitting, bias and variance, check out my previous [article](/ensemble-bias-var/).

Overfitting occurs because a model fails to generalize the data that contains a lot of irrelevant data points. As mentioned in the previous paragraph, data points that do not reflect the properties of the data are considered to be irrelevant. An example is noise. Regularization is the answer to overfitting. 

It is a technique that improves model accuracy as well as prevents the loss of important data due to underfitting. When a model fails to grasp an underlying data trend, it is considered to be underfitting. The model does not fit enough points to produce accurate predictions. This means that it is likely to miss out on important data points that may have a telling impact on model accuracy. Hence we say important data may be lost as a result of underfitting.

Regularization is a technique that adds information to a model to prevent the occurrence of overfitting. It is a type of regression that minimizes the coefficient estimates to zero to reduce the capacity (size) of a model. In this context, the reduction of the capacity of a model involves the removal of extra weights. 

Regularization removes extra weights from the selected features and redistributes the weights evenly. This means that regularization discourages the learning of a model of both high complexity and flexibility. A highly flexible model is one that possesses the freedom to fit as many data points as possible. 

Furthermore, in this context, we may judge the complexity of a predictive model by the number of features it possesses. A model with a lot of features to learn from is at a greater risk of overfitting. By discouraging the learning of (or use of) highly complex and flexible models, the risk of overfitting is lowered.

Let’s use a linear regression equation to explain regularization further.

$$ Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + … + \beta_p X_p $$

$Y$ represents the value that is to be predicted. $\beta_i$ stands for the regressor coefficient estimates for the corresponding predictor $X_i$. And, $X_i$ represents the weights or magnitudes assigned to various predictors (independent variables). Here, `i` represents any value greater than or equal to `0`, and less than `p`.

A loss function is involved in the fitting process. It is computed as the difference between the actual and predicted output from a model. A loss function provides a means of assessing how well an algorithm models given data. It is used to minimize the error, in turn optimizing the weights. In this context, the loss function is referred to as the residual sum of squares (RSS). 

Below is the equation for the loss function.

$$ RSS = \sum\limits_{i=1}^n( y_i – \beta_0 - \sum\limits_{j=1}^p {\beta_j x_ij )^2} $$

Based on the training data, the loss function will adjust the coefficients. If the presence of noise or outliers is found in the training data, the approximated coefficients will not generalize well to the unseen data. Regularization comes into play and shrinks the learned estimates towards zero. 

In other words, it tunes the loss function by adding a penalty term, that prevents excessive fluctuation of the coefficients. Thereby, reducing the chances of overfitting.

### Lasso regression
Lasso regression is a regularization technique used to reduce model complexity. It is also known as L1 regularization. Lasso stands for Least Absolute Shrinkage and Selector Operator. 

Let’s look at the equation below:

$$ \sum\limits_{i=1}^n( y_i – \beta_0 - \sum\limits_{j=1}^p {\beta_j x_ij )^2} + \lambda \sum\limits_{j=1}^p \mid \beta_j \mid = RSS + \lambda \sum\limits_{j=1}^p \mid \beta_j \mid $$

We note that it has a slight variation to the previously discussed loss function, with the introduction of a penalty term. To penalize highly fluctuating coefficients, lasso uses absolute values of the regression coefficients $ (\mid \beta\mid) $.

Lasso minimizes the regression coefficients to regularize the model parameters. Sometimes, Lasso can reduce regression coefficients to zero, which is particularly important when it comes to feature selection.

[Feature selection](https://machinelearningmastery.com/an-introduction-to-feature-selection/) refers to the process of choosing relevant variables and predictors to construct a model. Here, the feature selection process is attributed to the ability of lasso to reduce some regression coefficients to zero. It occurs after the regression coefficients are shrunk. 

The predictors whose coefficients are reduced to zero will not be included in the final model. These are the predictors considered to have less importance. This is how some features are eliminated. However, every non-zero regression coefficient is selected for use in the model. This greatly assists in minimizing prediction errors.

Lasso also helps improve the prediction accuracy of the models. The shrinking coefficients minimizes the bias and improves the variance of models. A context that favors the use of lasso is, when we have a small dataset with more number of features. 

The tuning parameter $\lambda$ controls the shrinkage. From the equation, when $\lambda$ is zero, the equation is reduced to the linear regression loss function equation. The greater the value of $\lambda$, the greater the reduction of the coefficients will be towards zero.

### Ridge regression
Ridge regression refers to a type of linear regression where in order to get better predictions in the long term, we introduce a small amount of bias. It is also known as L2 regularization. In ridge regression, we have the same loss function with a slight alteration in the penalty term, as shown below:

$$ \sum\limits_{i=1}^n( y_i – \beta_0 - \sum\limits_{j=1}^p {\beta_j x_ij )^2} + \lambda \sum\limits_{j=1}^p \beta_j^2 = RSS + \lambda \sum\limits_{j=1}^p \beta_j^2 $$

As we can see, the main difference between the above equation and the general equation for the loss function is that $ \lambda \sum\limits_{j=1}^p \beta_j^2 $ contains the squared value of the regression coefficients. The tuning parameter is $\lambda$. Higher values of the coefficients represent a model with greater flexibility. To penalize the flexibility of our model, we use a tuning parameter that decides the extent of the penalty. To minimize the function, these coefficients should be small. L2 regularization ensures the coefficients do not rise too high.

When the value of $\lambda$ tends to zero, the L2 regularization equation becomes the loss function of the linear regression model. The penalty term will have no effect. This means that if the value of $\lambda$ is minimum, the model can be called a simple linear regression model. 

Conversely, when the $\lambda$ value tends to infinity, the effect of the shrinkage penalty increases. As a result, the coefficient estimates of the ridge regression will approach zero. This underlines the importance of choosing a good value for $\lambda$.

Linear or polynomial regression will likely prove unsuccessful if there is high [collinearity](https://machinelearningmind.com/2019/10/19/multicollinearity-how-to-fix-it/) between the independent variables. Ridge regression is a potential solution to handle multicollinearity. 

Collinearity is a condition in which there are two features in data that are heavily correlated to each other. Ridge regression adds an amount of bias to the regression estimates to reduce errors. We shall explore this in a different article.

The predictors of least importance refer to predictors that bear no telling influence on the predictive power of the model. They may also be predictors that do not accurately describe the properties of data, such as noise. 

Ridge regression has one clear disadvantage: model interpretability. When shrinking the coefficients of the predictors of least importance, it will reduce them to be close to zero. 

Here’s the problem. 

As a result, one may end up including all the coefficients in the final model. The final model ends up containing the predictors one may prefer to eliminate. As such, no feature selection is done. Whereas lasso regression manages to force some coefficient estimates to zero when the $\lambda$ is large enough. We can say lasso performs better feature selection. 

Furthermore, the resulting models can be considered sparser when compared to the ones resulting from the L2 technique. This is because some of the estimate coefficients can be truly zero. The predictors that are of little to no importance are eliminated thus reducing the number of predictors.

### Wrapping up
Regularization is a formidable technique to prevent overfitting. There are several regularization techniques. We have looked at two of the most popular ones. Through this article, we have understood how the two techniques help in preventing overfitting and how they are derived from the linear regression loss function equation. 

Until next time, good luck!

### References and Further Reading
1. [The Elements of Statistical Learning](https://www.springer.com/gp/book/9780387848570)

2. [Regularization in Machine Learning](https://towardsdatascience.com/regularization-in-machine-learning-76441ddcf99a)

3. [Regularization in Machine Learning](https://www.geeksforgeeks.org/regularization-in-machine-learning/)

4. [Regularization In Machine Learning – A Detailed Guide](https://analyticsindiamag.com/regularization-in-machine-learning-a-detailed-guide/)

5. [Regularization in Machine Learning](https://www.javatpoint.com/regularization-in-machine-learning)

6. [What is Regularization in Machine Learning?](https://codeburst.io/what-is-regularization-in-machine-learning-aed5a1c36590)

7. [Regularization Machine Learning](https://www.educba.com/regularization-machine-learning/)

8. [Regularization](https://datascience.eu/machine-learning/regularization-in-machine-learning/)

---

Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });
    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>