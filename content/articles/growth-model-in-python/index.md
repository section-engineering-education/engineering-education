---
layout: engineering-education
status: publish
published: true
url: /growth-model-in-python/
title: Getting Started with Growth Model in Python
description: This article will discuss the basics of the growth model and how to use it to predict a childs growth using Python.
author: sumba-elvis
date: 2022-06-27T00:00:00-13:14
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/growth-model-in-python/hero.jpg
    alt: Exponential Regression in Python hero image
---
Growth models are common in scientific fields and have been used and successfully modeled for various problems.
<!--more-->
### Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction to Growth Model](#introduction-to-growth-model)
- [Prerequisite:](#prerequisite)
- [Establishing an optimization problem for the Growth model](#establishing-an-optimization-problem-for-the-growth-model)
  - [Example](#example)
- [Making the prediction using the growth model](#making-the-prediction-using-the-growth-model)
- [Implementing the growth model](#implementing-the-growth-model)
- [Fitting the model](#fitting-the-model)
- [Conclusion](#conclusion)

### Introduction to Growth Model
Some of the areas where these models have been used explain how something grows with changes in the predictor variable, which often is time. A real-life example is modeling the time it takes until the business grows, understanding how the population grows over time, etc. 

Growth models take the form:

$${\Large y = \frac{a}{(1 + be^{ −cx})}},$$

Where a, b and c are unknown constants of the model. 

At *x = 0* , $\large y = \frac{a}{(1+b)}$, and as $x → ∞$ , $y → a$.

### Prerequisite
To comfortably follow along, the reader needs to have some knowledge on:
1. Python programming knowledge.
2. Partial Differential Calculus for optimization purposes.
3. [Ralphson Newton Method](https://brilliant.org/wiki/newton-raphson-method).

### Establishing an optimization problem for the growth model
To establish an optimization function, we need to develop a function that the goal is to minimize or maximize. Since the goal is to minimize the error, that is, the predicted values should be as close to the true values as possible, we develop an error function as follows: 

The error at each data point $x_i$ is defined as:
$$\Large E_i=y_i - \frac{a}{(1 + be^{ −cx})}$$

Summing all these errors over the entire dataset, we obtain the *Cost function*, which is of the form:

$$\Large S_r = \sum_{i = 1}^{n} E_i^2$$

$$\Large = \sum_{i = 1}^{n}\left(y_i - \frac{a}{(1 + be^{ −cx})}\right)^2$$

This is our optimization function.

Now, the goal is to determine the values of the unknown coefficients, a, b, and c, that minimizes the above cost function. Since our cost function is quadratic, we minimize it by partially differentiating it with respect to each of the unknown parameters and equating the resulting equations to zero.

If we do this, we should get:

![partial derivatives](/engineering-education/growth-model-in-python/partial-derivatives.png)

One can use the Newton-Raphson method on the above set of simultaneous nonlinear equations to solve for a, b and c.

To have an intuitive understanding of this model, consider the following example.

#### Example
The height of a child is measured at different ages as follows.

![data table](/engineering-education/growth-model-in-python/data-table.png)

Suppose we are required to build a growth model from the above dataset that we will use and make some predictions.

The first thing we need to do is determine the knobs for the model.

Since we know that the height is connected to the time by a growth relationship, our general hypothesis is of the form:

$$\large H = \frac{a}{1 + be^{-ct}}$$

We want to determine the values for a, b, and c. If we use the bisection method to determine these values, then a, b, c are the roots for the bisection method, and we end up optimizing the following functions:

![optimization curve](/engineering-education/growth-model-in-python/optimize.png)

By solving the lost function using the Newton Raphson method. We need initial guesses of the roots to get the iterative process started to find the root of those equations. Suppose we use three of the given data points such as (0, 20), (12,60) and (18, 70) to find the initial guesses of roots; we have

$$\large 20 = \frac{a}{1 + be^{-c(0)}}$$
$$\large 60 = \frac{a}{1 + be^{-c(12)}}$$
$$\large 70= \frac{a}{1 + be^{-c(18)}}$$

One can solve for the three unknowns a, b and c from the three equations as;

$a = 7.4321 × 10^1$

$b = 2.8233$

$c = 2.1715 × 10^{− 1}$

Applying the Newton-Raphson method, one should get the roots as:

$a = 7.4321 × 10^1$

$b = 2.8233$

$c = 2.1715 × 10^{− 1}$

The full growth model of a child's height then becomes:

$$\large H = \frac{7.4321 × 10^1}{1 + {2.8233}e^{-2.1715 × 10^{− 1}t}}$$

### Making the prediction using the growth model
Suppose we are required to determine the height of an individual in 30 years to come.

Now, in our model, we only need to plug in the value of $t = 30$ and evaluate the value of *H*. 

That is:

$$\large H = \frac{7.4321 × 10^1}{1 + {2.8233}e^{-2.1715 × 10^{− 1}×(30)}}$$

Solving the expression, we get:

74

### Implementing the growth model
To implement this model, first, we need to import the necessary libraries and work all through using a user-defined function in Python.

Let us import the libraries.

```Python
import numpy as np # for matrix operations
import matplotlib.pyplot as plt # for visualization

```

Create a dataset.

```python
# create the dataset
t = np.array([0,5,8,12,16,18])
h = np.array([20,36.2,52,60,69.2,70])

```

Now, let's visualize our data on a scatter plot.
```python
#plotting the data
plt.scatter(t, h, color="green")
plt.title("Scatter Plot")
plt.show()

```

Output:

![growth curve output](/engineering-education/growth-model-in-python/growth-curve.png)

As seen in the plot above, the data shows a gradual growth over time, stabilizing later. Thus, a growth model fits this data.

### Fitting the model
The model that we fit on the data is:

$$\large H = \frac{7.4321 × 10^1}{1 + {2.8233}e^{-2.1715 × 10^{− 1}t}};$$

From our parameter estimation, we know that:

$a = 7.4321 × 10^1$, 
$b=2.8233$, and 
$c=2.1715 × 10^{− 1}$

Let's use a user-defined function and implement our function.

```python
#defining the parameters
a = 7.4321*10
b=2.8233
c=2.1715*10**(-1)

# fitting the model

def H (t,a,b,c):
    return a/(1 + c*np.exp(-b*t))

#Making prediction at t = 30
print("Hight = " , H(30,a,b,c))

```
Output:
```bash
Hight =  74.321

```

Manually we had found the height of an individual aged 30 is 74. With our model, this is the case. Thus we have implemented and made predictions using our model.

### Conclusion
In this session, we looked at the growth model. We saw how the growth model hypothesis is stated and went a step further to determine a set of its unknown parameters. Then, using our model, we were able to make predictions manually. Later we implemented this model in Python.

Happy coding!

---
Peer review contribution by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)


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