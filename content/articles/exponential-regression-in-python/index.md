---
layout: engineering-education
status: publish
published: true
url: /exponential-regression-in-python/
title: A Gentle Introduction to Exponential Regression in Machine Learning
description: This article will discus how the exponential hypothesis is represented, how to approximate its parameters, fit the curve using python and finally state down our model using the parameters returned in python. 
author: sumba-elvis
date: 2022-03-16T00:00:00-12:14
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/exponential-regression-in-python/hero.jpg
    alt: A Gentle Introduction to Exponential Regression in Machine Learning Hero Image
---

In real-world applications, the goal of modelling is usually to represent the behaviours of natural phenomena that change over time in mathematical models with the best [generalization](https://en.wikipedia.org/wiki/Regularization_(mathematics)). Various models have been developed and proven to capture those behaviours very well. There are various models for modelling different problems.

Linear regression is the widely known model in modelling due to its simplicity and ability to be used at elementary levels. However, almost all real-world problems are nonlinear. Due to this, the linear regression remains to have limited application in significant problems.

Nevertheless, the implication is not that the linear regression is insignificant. On the contrary, due to its cheap computation cost compared to nonlinear models, most nonlinear models are usually transformed to linear space where we approximate their unknown parameters, which we then mapped to the original space.

One possible scenario where a different model other than the linear regression might be required is in the situation of rapid growth or rapid decay.

In such cases, processes tend to experience doubling time, i.e., the time it takes for a quantity to double. In real life, doubling time can be witnessed in the fields such as; financial investments, wildlife populations, natural resources and biological samples.

Therefore, the exponential function can be the appropriate model for modelling these processes.

In this article, we will learn how the exponential hypothesis is represented, how to approximate its parameters, fit the curve using Python and finally state down our model using the parameters returned in Python.

Finally, using our stated model, we will predict some future values.

### Prerequisites
- Good knowledge of the optimizations methods such especially the [Bisection Method](https://byjus.com/maths/bisection-method/) will be required in this section.
- Good understanding of Python functions.

### Introduction to Exponential Function
As we previously said, exponential is the model used to explain the natural behaviour where the system experience a doubling growth rate. This model takes the form:

$1.\,\,\,y = A_0e^{bt}$,

or;

$2.\,\,\,y = A_0e^{-bt}$
​​
where:
- t is any point in time,
- y is the value of the function at any time t,
- $A_0$ is the value of the model at $t=0$,goal of
- $e$ is Euler's constant, which is usually 2.71828..., and,
- b is the constant that determines the rate of change

The first model, i.e., $(1)$, models processes that multiply over time. Thus it is a model for rapid growth. The second case, i.e., $(2)$, models the rapid decay processes over time. An excellent example of where this model is applied is radioactivity decay modelling.

Now, suppose we are give $(x_1,y_1),\,(x_2,y_2),\, .\,.\,.\,,(x_n,y_n)$, and we are expected to fit, $y=e^{bx},$ to the data.

The constant $a$ and $b$ are unknown parameters of the model. Thus, they have to be estimated. But, first, we need to define a loss function to estimate these parameters.

The loss function is simply the deviance of the predicted values from the observed values. So, we first obtain the residual for each data point as below.

$E_i=y_i-ae^{bx_i}$

We then sum the residuals over all the training set examples. This gives us the Sum of squares Residuals(SSR) as shown below:

$S_i=\sum_{i=1}^{n} (y_i-ae^{bx_i})^2 = \sum_{i=1}^{n} E_i$,

 Where n is the number of instances in the training set.

To approximate the constants a and b, we minimize the above lose function, i.e., SSR, by differentiating it with respect to a,b and equating the resulting equations to zero.

We perform this as follows:

- Differentiating the error function with respect to the $a$.

$\large {\frac{\delta S}{\delta a}= \sum_{n=1}^{n} 2(y_i-ae^{bx_i})(-e^{bx_i})=0}$

- Differentiating the error function with respect to $b$.

$\large{\frac{\delta S}{\delta b}= \sum_{n=1}^{n} 2(y_i-ae^{bx_i})(-ax_ie^{bx_i})=0}$

These equations can be expressed as:

$\large \frac{\delta S}{\delta a}= \sum_{n=1}^{n} y_ie^{bx_i} + a \sum_{n=1}^{n} e^{2bx_i}=0; \ . \ . \ . \ . \ (1.0)$

$\large \frac{\delta S}{\delta b}= \sum_{n=1}^{n} y_ix_ie^{bx_i} - a \sum_{n=1}^{n} x_ie^{2bx_i}=0; \ . \ . \ . \ . \ (1.1)$

Equations $1.0$ and $1.1$ are nonlinear in $a$ and $b$ and thus not in closed form to be solved as in the linear regression case.

In general, iterative methods such as [Gauss Newton iterative method](https://en.wikipedia.org/wiki/Gauss%E2%80%93Newton_algorithm), [Method of Steepest Descent](https://en.wikipedia.org/wiki/Method_of_steepest_descent#:~:text=In%20mathematics%2C%20the%20method%20of,steepest%20descent%20or%20stationary%20phase.), [Direct Search Method](https://www.mdpi.com/1999-4893/9/2/40/htm), e.t.c can be applied to determine values of $a$ and $b$.

Note, from equation $1.0$, $a$ can expressed in terms of $b$, i.e.,

${\Large a= \frac{\sum_{i=1}^{n} y_ie^bx_i}{\sum_{i=1}{n} e^{2bx_i}}};\,.\,.\,.\,.\, (1.2)$

Substituting equation $1.2$ in $1.1$ gives:

$\Large \frac{\delta S}{\delta b}= \sum_{n=1}^{n} y_ix_ie^{bx_i} - {\frac{\sum_{i=1}^{n} y_ie^bx_i}{\sum_{i=1}{n} e^{2bx_i}}}\sum_{n=1}^{n} x_ie^{2bx_i}=0; \ . \ . \ . \ . \ 5(b)$

As we can see, this equation is still is nonlinear in $b$. However, using the bisection method, we can determine $b$.

For a clear understanding, let us consider an example and see how we can put the above formulas into practice.

Problem:

Many patients get concerned when a test involves an injection of radioactive material.
For example, a few drops of Technetium-99m isotope are used for scanning a gallbladder. Half of the technetium-99m would be gone in about 6 hours. It, however, takes
about 24 hours for the radiation levels to reach what we are exposed to in day-to-day
activities. Below is given the relative intensity of radiation as a function of time.

![data-set](/engineering-education/exponential-regression-in-python/data.png)

The level of the relative intensity of radiation is related to time through an exponential function $γ = Ae^{\lambda t}$. We are required to find

  a) the model's parameters, i.e., A and λ,
  b) the radiation intensity after 24 hours.

Let us solve this problem first by hand and later implement the model.

$\Large\gamma=Ae^{\lambda t}$

The value of $\lambda$ is given by solving the nonlinear equation of:

${\Large {f(\lambda) = \sum_{n=1}^{n} \gamma_i t_ie^{\lambda t_i} - \frac{\sum_{i=1}^{n} \gamma_i e^{\lambda t_i}}{\sum_{i=1}^{n} e^{2 \lambda t_i}} \sum_{i=1}^{n} t_ie^{2 \lambda t_i}=0}}$ $. \ . \ . (8)$
We then evaluate A as:

$\Large A= \frac{\sum_{i=1}^{n} \gamma_ie^{\lambda t_i}}{\sum_{i=1}{n} e^{2 \lambda t_i}}$

Using the bisection method, let us attempt to solve equation $8$ for $\lambda$.

We first estimate our initial guesses as:

$\lambda=-0.120$, and

$\lambda=-0.110$

First we need to check if these guesses cointains the root of our equation within their interval, i.e., $f(-\lambda)\times$$f(\lambda)<0$.

When $\lambda=-0.120$ we evalute  the $f(-0.120)$ as shown in the table

![table-of-valiues](/engineering-education/exponential-regression-in-python/table.png)

From this table, $f(-0.120)=(6.2501)-\frac{2.9062}{2.8763}(6.0954)=0.091357$

Similary we can compute $f(− 0.110)=−0.10099$

The fuction $f(\lambda)$ changes sign between the $\lambda=-0.120$, and $\lambda=-0.110$, thus the root exists between the interval $[-0.110,-0.120]$. Continuing with the bisection method we the valu of $\lambda$ such that the $f(\lambda)=0$ after 20 iterations as $\lambda = −0.11508$. This solution was obtain at an accuracy of the absolute relative error of less than $0.000008\%$.

Using equation $1.2$, we can compute the value for $a$ as follows.

$\Large{ a= \frac{\sum_{i=1}^{n} \gamma_ie^bt_i}{\sum_{i=1}^{n} e^{2bt_i}}};\,.\,.\,.\,.\, (1.2)$

![value-a](/engineering-education/exponential-regression-in-python/a-value.png)

$= \Large \frac{2.9373}{2.9378}$

$= 0.99983$

Since we have values of both unknown parameters, we can state down our model as follows.

$\gamma = 0.99983e^{−0.11508t}$.

Now, let us look at how we implement this model in Python.

### Python implementation of Exponential Model
To implement the model, first, we need to import the required libraries. In this session, we need the following libraries.
1. Numpy for working with data arrays.
2. Maltplotilib for data visualization
  
Let us import these libraries.

```python
import numpy as np
import matplotlib.pyplot as plt
```

Next, let us create our dataset.

```python
# create the dataset
t = np.array([0,1,3,5,7,9])
y = np.array([1.000,0.891,0.708,0.562,0.447,0.355])
```

We can see the underlined relationship between our variables by plotting a scatter plot of our data.

```python
#plotting the data
plt.scatter(t, y, color="green")
plt.title("Scatter Plot")
plt.show()
```

![scatter plot](/engineering-education/exponential-regression-in-python/data-scatterplot.png)

As we can see from the above scatter plot, the data depicts a gradually decaying relationship. Thus, an exponential model is the best model for fitting the curve to this dataset. Now, let us fit our model:

```python
#fit the model
the model for our data is:
y = A*exp{λt};
Taking the log on both sides of y, we get
log(y) = log(A) + λt

So to fit our model, we first take the natural log on only the y variable and not t.

model = np.polyfit(t, np.log(y), 1) # the argument 1 idicates the degree of the polynomial
# view the model's output
print(model)
```

Output

```bash
[-0.11504963 -0.0002615 ]
```

The first element of the model output above is the coefficient that corresponds to the explanatory variable t, i.e., λ, and the second one corresponds to the values of the fitted model when $t = 0$, i.e.,  log(A).

To get the model that best fits the given data, we transformed the fitted model by taking the inverse of the transformation we performed on the data. Using the returned coefficients, the model we build is as follows:

$log(y) = log(-0.11504963) -0.0002615t$

Taking an exponential on both sides, we get:

$y = exp{(-0.0002615)}e^{-0.11504963t}$;

Simplifying this, we get our final model as.

$y = 0.99974e^{-0.11504963t}$

Now, suppose we want to compute the relative intensity of the radiation after 24 hours. To do this, we plug in $t=24$ in our model and get the results back, i.e.

$y = 0.99974e^{-0.11504963(24)}=6.320 \times 10^{-2}$

Since at $t= 0\,, \,\, y = 0.99974$, using the above output, we can compute the percentage of the remaining radioactive intensity after 24 hours as follows:

$\frac{6.320 \times 10^{-2}}{0.99974}\times 100 \%=6.3216\%$

Thus, only $6.3216\%$ of the initial radioactive intensity will have remained after 24 hours. This is how we use an exponential model to make predictions.

Finally, we can visualize our model.

```python
# Visualize the model
myplot = plt.plot(t,y)
myplot
```

#### Output
![exponential model](/engineering-education/exponential-regression-in-python/expo-model.png)

As we can see, our model is shown a curvature-like declining relationship between the two variables.

### Summary
In this article, we introduced the exponential model. We first defined the exponential model and outlined its two types. We then looked at its hypothesis representation from which we derived the loss function.

To approximate the unknown constants of the model, we solve the loose function by finding the values of the unknown that minimize the error function.

After covering these, we then looked at a case study, and we were able to bring our theoretical understanding of the model into practice. Finally, we implemented our model in python and made predictions using it.

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)

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