---
layout: engineering-education
status: publish
published: true
url: /linear-regression-introduction/
title: Theoretical Introduction to Linear Regression
description: This article will serve as an theoretical introduction to liner regression used in machine learning algorithms. In this article, we will define the class `LinearRegression.`  
author: lalithnarayan-c
date: 2021-01-21T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/linear-regression-introduction/hero.jpg
    alt: Theoretical Linear Regression example image
---
Linear regression is one of the most fundamental machine learning algorithm in the category of regression. There exist two types of machine learning algorithms: classification and regression. Under regression, we can have linear regression, polynomial regression, exponential regression, Gaussian process regression, etc. Regression is a supervised learning algorithm that outputs a continuous set of values. Linear regression refers to creating linear models to represent the data. 
<!--more-->
### Table of contents
- Linear Regression
- Methods to arrive at the line of best fit.
- Derivation
- Applications

### Linear regression
Linear regression is a simple and powerful learning algorithm. It is a technique to fit a line to a set of data points such that the total distance between the line and the data points is minimized. The equation to represent linear regression is a straight line. 

Therefore, the equation of a straight line is suitable to represent the same, which is given as:

$$ y\; = mx +\;c$$

In the equation above, the output is denoted with `y`, the input is denoted with `x`. The slope of the regression line is denoted by `m`, and the intercept is denoted by `c`. The input to the model is a set of input-output data pairs. The output is the equation to represent the data points. 

Therefore, we define an error function that computes the distance between the input data points and the equation's output data points. This error is minimized, and therefore the parameters of the equation are obtained. In the straight-line equation, the parameters of the equation are both the slope and the intercept value.

### Methods
There are a couple of methods that can be used to find the best fit line. The first method uses gradients to minimize the error function. This is an iterative approach, and with a suitable number of iterations, the desired result is obtained. The second method uses matrix inverses to get the solution in one shot. Let us explore the two methods in detail.

#### Using gradients
Let the line of best fit passing through the data points be written as:

$$ \hat{y_i} = mx_i + c, \; where \; \hat{y_i}\;is\;the\;predicted\;output$$

We use a cost function to measure the performance of the best fit line. The cost function, also known as an error function, calculates how close the predicted value is to the actual value. 

The error function should be given as:
`
$$ Loss\; function \;(L)= \sum_{i=i}^n (y_i - \hat{y_i})^2 \\
Substituting\; the\; equation\; of\; line\; for\; predicted\; output\; given\; above\;we \; obtain \\
L = \sum_{i=i}^n(y_i - mx_i -c)^2$$
`
We minimize the loss function by computing the derivatives and equating it to zero. This gives us the extremum points. These points include the minima, maxima, and saddle points. Since we are minimizing the error function, we are interested in minima. Therefore, we differentiate the loss function $L$ with respect to the parameters, slope, and intercept. We obtain the following relations for the slope and intercept. 

$$ c = \frac{\sum_{i=1}^n y_i -m\sum_{i=1}^n x_i}{n} $$

$$ m = \frac{\sum_{i=1}^n x_iy_i - x_i\bar{Y}}{\sum_{i=1}^n x_i^2 - x_i\bar{X}} $$

In the above equations, $\bar{X}$ denotes the average of input values, and $\bar{Y}$ denotes the average of output values. Substituting the values of c and m in the output equation, we obtain the straight-line equation. 

#### Least-squares solution
In the least-squares solution, we find the error in the same manner as the earlier method. We describe the linear regression model as follows:

$$ \hat{Y}=Xb $$

In this case, the intercept is another vector in the X matrix. In a matrix notation, we compute the loss function as follows:

$$ L =\frac{1}{2}( Y - \hat{Y})^2\\
L = \frac{1}{2}(Y- Xb)^2$$

Note that the squared function ensures the problem is framed as a convex problem.  

The problem is reformulated using the system of linear equations. A linear equations system may consist of an infinite number of solutions, specific solutions, or no solutions at all. 

In matrix terms, the equation is reformulated as follows:

$$ X^TXb = X^Ty$$

Therefore, the parameter b is found by taking the inverse of $X^TX$ on both sides. 

Therefore we obtain, 

$$ b= (X^TX)^{-1}X^TY $$

This can be solved using many methods, and the solution will be computed. Some of the methods that can be used to solve the same are given below: 
- QR decomposition
- SVD decomposition
- Moore - Penrose inverse

These methods help compute the inverse of a matrix. Moore-Penrose inverse is used when an inverse is not available, and an approximated solution is used. These methods have their advantages and disadvantages in terms of computational efficiency and accuracy of inverses computed. These topics are beyond the scope of this article, and therefore we won't go into them any further.

### Code
We will code the second approach in this article since it is a one-shot solution. In this article, we will define the class `LinearRegression.` The iterative approach requires further understanding of gradient descent, and we will cover the same in the upcoming articles. 

You can run the code [here](https://repl.it/@lalithNarayan/ThoseSlimWatchdog):
```py

class LinearRegression():
    def __init__(self):
        self.bias = None
        self.weights = None
                
    def fit(self,X,y):
        self.weights = np.dot(np.linalg.inv(np.dot(X.T, X)), np.dot( X.T, y ))
        self.bias = y.mean() - np.sum(self.weights * X.mean(axis=0))
    
    def predict(self,X):
        return np.dot(X, self.weights )+ self.bias
    
    def score(self,X,y):
        return 1-(np.sum(((y-self.predict(X))**2))/np.sum((y-np.mean(y))**2))
```

### Output
We get a training accuracy of 70.7% and a testing accuracy of 77.5%. 

```txt
Train Score: 0.711553862551374
Test Score:  0.6754645412095844
```

### Applications
The applications of linear regression analysis are multifold. The idea of linear regression is extended to vector spaces. A vector space is a region defined by a linear combination of specific vectors called the basis vectors. Using the basis vectors, we can model various high dimensional datasets as well. Linear regression works only in the case of linear decision boundaries. 

A few examples of linear regression in action are given below:

**Risk profiling**: Analyzing an investor's risk based on the investor's income and commitments can be a regression task. The output is the maximum risk the investor can take.  
- **Stock market portfolio analysis**: Predicting the future prices given the current conditions and historical data is a problem many mathematicians and analysts work on. Regression models are often used in such applications. 
- **Analysis and optimization**: Finding optimal solutions for a given problem given the constraints can be modeled using regression methods. For example, [predicting houses' prices](/house-price-prediction/) or used car prices using regression is a famous machine learning problem. 

### Conclusion
In this article, we have looked at the two methods to arrive at the best fit line. In the next article, we will code the same from scratch and analyze the output graphically. 

---
Peer Review Contributions by: [Collins Ayuya](engineering-education/authors/collins-ayuya/)

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

