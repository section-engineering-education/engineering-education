---
layout: engineering-education
status: publish
published: true
url: /gradient-descent-algorithm-in-python/
title: Getting Started with Gradient Descent Algorithm in Python
description: This article will look at how we can minimize the cost function of using the gradient descent algorithm to obtain optimal parameters of a machine learning model.
author: jackson-munyai
date: 2021-11-11T00:00:00-16:34
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/gradient-descent-algorithm-in-python/hero.png 
    alt: Gradient Descent Algorithm Python Image
---
In machine learning, the goal is to predict the target variable as close to the ground truth as possible. Thus, the model we adopt for prediction should have reasonable accuracy. As the input values are fixed, to improve the quality of the model, all we can do is to tune its parameters such that the deviation of the predicted value from the actual value is highly minimized.  
<!--more-->
The variation of the expected value from the actual value on a single training example is called the **loss function**. We denote this function as $L(ŷ,y)$. Summing up the **loss functions** of the entire training set and averaging them over the total number of all the training examples in that set. 

Doing this we obtain a function known as the **cost function**. The *cost function* measures how well we are doing in the entire training dataset. 

This function is denoted as $J(\Theta)$. This article will look at how we minimize this cost function using the gradient descent algorithm to obtain optimal parameters of a machine learning model.

### Prerequisites
For a clearer understanding of this content, the reader is required:
- To be familiar with logistic representations such as the logistic hypothesis representation, loss function and cost function.
- To be familiar with python programming.
- Willingness to learn. 

### Introduction to gradient descent 
Gradient descent is a crucial algorithm in machine learning and deep learning that makes learning the model's parameters possible. For example, this algorithm helps find the optimal weights of a learning model for which the cost function is highly minimized.

There are three categories of gradient descent:
1. Batch gradient descent: In batch gradient descent, the learning parameters are updated by considering all the examples of the training dataset.

2. [Stochastic gradient descent](https://en.wikipedia.org/wiki/Stochastic_gradient_descent): Stochastic gradient descent is an iterative method for optimizing an objective function with suitable smoothness properties.

3. Mini-batch gradient descent: To update parameters, the mini-bitch gradient descent uses a specific subset of the observations in a training dataset from which the gradient descent is ran to obtain an optimal set of parameters.

#### Recall
We have defined the following function:
- $L(\hat{y}^{(i)}, y^{(i)})$ is loss function on a single training example. 
- $J(\theta)$ is a cost function of the entire training set and is obtain by averaging the sum of the loss function $L(\hat{y}^{(i)}, y^{(i)})$.

Using linear regression, we can define the functions above as:

$L(\hat{y}^{(i)}, y^{(i)})= (h_\theta(x^{(i)})-y^{(i)})^{2}$

$J(\theta) = \frac{1}{m} \sum_{i=1}^{m} L(\hat{y}^{(i)}, y^{(i)})$

Our goal is to find a set of $\theta$ values for which the cost function $J(\theta)$ is minimized. To find such a set using the gradient descent algorithm, we initialize $\theta$ to some random values on our cost function. 

We then use the gradient to gradually move towards the local minimum of our cost function $J(\theta)$. Next the cost function is minimized at the local optimum, and the $\theta$ values at that point of the cost function are the optimal value for the $\theta$.

Let's understand the above discussion using a cost function $J(\theta)$ plot. Assuming simple linear regression, we want to learn the best two $\theta$ values, i.e., $\theta_0$ and $theta_1$, minimizing the cost function. In this case, our cost function will be denoted as, $J(\theta_0, \theta_1)$. 

The plot of this function is as in the figure below:

![plot](/engineering-education/gradient-descent-algorithm-in-python/cost-function-plot.png)

In the above three dimensional plot, we have all $\theta$ 's on the horizontal axis and $J(\theta_0, \theta_1)$, the cost function we want to minimize, on the verticle axis. Thus, on one of the two horizontal axes, we have the possible values for $\theta_0$, and on the other, we have the possible values for $\theta_1$.

Now, to find the $\theta$ values corresponding to minimum value of our cost function $J(\theta_0, \theta_1)$.
We start by initializing $\theta_0$ and $\theta_1$ to some random values on the $J(\theta_0, \theta_1)$, i.e.;
$\theta_0 = 0$
$\theta_1 = 0$

We then determine the derivative of the cost function $J(\theta_0, \theta_1)$ at these initial points with respect to $\theta_o$ and $\theta_1$. We thus obtain two partial derivatives. These derivatives tell us the direction of the cost function we should take to minimize the error. 

Using these gradients and our cost function, we take a step towards the direction in which the cost function gradually decreases with a high value. As a result, we end up landing in a new position on the cost curve. In the process, the values of $\theta_0$ and $\theta_1$ are updated. 

The process repeats itself until the algorithm reaches or approaches close to the global minimum. Below is a mathematical representation of the gradient descent algorithm.

### The gradient descent algorithm

Repeat until convergence:
{
$\theta_1  := \theta_1 - \alpha\frac{\delta}{\delta\theta_1}J(\theta)$
$\theta_0 := \theta_0 - \alpha\frac{\delta}{\delta \theta_0}J(\theta)$
  }

Where:
- $\alpha$ is the learning rate.
- $\frac{\delta}{\delta\theta_1}J(\theta)$ is derivative of our cost function $J(\theta)$ with respect to $\theta_1$.
- $\frac{\delta}{\delta \beta_0}J(\theta)$ is derivative our cost function $J(\theta)$ with respect to $\theta_0$.

The learning rate determines the step size we take down the slope. Choosing a small learning rate value may take the gradient descent too long to converge to the local minimum. On the other hand, a too-large value may overshoot our local minimum and the gradient descent and may never converge. Therefore this value should not be too small or too large.

### Implementing the gradient descent
In this session, we shall assume we are given a cost function of the form: $J(\theta) = (\theta - 5)^2$ and $\theta$ takes values in the range 10. 

Let us start by importing libraries we will be working with:

```python
import numpy as np
import matplotlib.pyplot as plt
```

### Generate some random data points

```python
theta = np.arange(12)
#cost function
J = (theta - 5)**2
print(theta,J)
```

### Output

![output](/engineering-education/gradient-descent-algorithm-in-python/output.png)


### Visualizing the cost function

```python
# Finding the value of x that minimizes J
plt.style.use("seaborn")
plt.plot(beta,J)
# adding labels to the curve
plt.ylabel('J (θ) ')
plt.xlabel("θ")
# printing the plot
plt.show()
```

### Output

![cost curve](/engineering-education/gradient-descent-algorithm-in-python/cost_function.png)

Our cost function is convex, and we can see its minimum is at $\theta=5$. So now we shall run gradient descent, which should return a value equal to or very close to 5.

### Obtaining the optimal $\theta$ using gradient descent

```python
error=[]
# initializing beta to initial value
beta = 0
# learning rate
learn_rate = 0.1
for i in range (50):
  gradient = 2*(beta - 5)
  beta  = beta - learn_rate*gradient
  J = (beta -5 )**2
  error.append(J)
  print(beta)
```

Running the code above, we will obtain our optimal $\theta$ as $\theta=4.999928637615365$. This value is very close to the real value, and therefore the gradient descent did excellent work. 

### Viewing the error plot

```python
plt.plot(error)

```

![gradient descent](/engineering-education/gradient-descent-algorithm-in-python/error.png)

From this plot, we may notice that the error was initially high, but with each run of gradient descent, it decreases until it is at its minimum value where it can not change anymore.

### Conclusion
This article looked at the theory behind the gradient descent algorithm and explained how this algorithm works. We then learned how to use Python to obtain the optimal value of the learning parameter. In our case, we assumed a simple linear regression of a model given cost function. 

Happy coding!

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
