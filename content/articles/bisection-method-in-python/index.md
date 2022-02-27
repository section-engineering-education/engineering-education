---
layout: engineering-education
status: publish
published: true
url: /bisection-method-in-python/
title: A Beginner's Guide to Nonlinear Optimization with Bisection Algorithm 
description: This tutorial will guide you on nonlinear optimization with Bisection algorithm. 
author: stanley-juma 
date: 2022-02-27T00:00:00-11:56
topics: [Languages, Python]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/bisection-method-in-python/hero.jpg
    alt: A Beginner's Guide to Nonlinear Optimization with Bisection Algorithm Hero Image
---
Function optimization involves finding the best solution for an objective function from all feasible solutions. The optimal solution is achieved through the minimization of the error function. 
<!--more-->
In polynomial error function optimization, input values for which the error function is minimized are called zeros or simply roots of such function. We usually establish the cost function from the hypothesis, which we then minimize i.e. find the unknown values of the parameters that minimize the cost function.

In practice, where we deal with massive datasets, models tend to have many parameters that need to be estimated. This parameter makes the cost function have many parameters that need to be evaluated and thus impossible to do manually. However, well-defined algorithms can be utilized and approximate these parameters to the required accuracy iteratively. 

Some commonly used algorithms in this task include:
- Bisection method
- [Newton Raphson method](https://brilliant.org/wiki/newton-raphson-method)
- [Steepset Descent method](https://www.math.usm.edu/lambers/mat419/lecture10.pdf), etc.
  
These methods are used in different optimization scenarios depending on the properties of the problem at hand.

In this article, you will learn how the bisection method work and how we can use it to determine unknown parameters of a model.

### Table of Content
- [A Beginner's Guide to Nonlinear Optimization with Bisection Algorithm](#a-beginners-guide-to-nonlinear-optimization-with-bisection-algorithm)
- [Table of content](#table-of-content)
- [Prerequsites](#prerequsites)
- [Introduction to Bisection method](#introduction-to-bisection-method)
- [How bisection algorithm work](#how-bisection-algorithm-work)
- [Python implementation of bisection method](#python-implementation-of-bisection-method)
- [Output](#output)
- [Conclusion](#conclusion)

### Prerequsites
To get the most out of this tutorial, you will need the following:
- Python installed on your computer.
- A good understanding of python control flows and how to work with python functions.
- A basic knownledge on differential calculus.

### Introduction to Bisection method
Before diving into the Bisection method, let's look at the criteria we consider when guessing our initial interval.

If a function $f(X)$ is continous in the interval $[a,b]$ and $f(a)$ and $f(b)$ have opposite signs, then there exist at least one root for $f(x)$ within $[a,b]$. As we earlier said, the function $f(x)$ is usually non-linear and has a geometrical view similar to the one below.

![plot](/engineering-education/bisection-method-in-python/polynomial-curve.PNG)

Given that the initial interval $[a,b]$ meets the above conditions, we can now proceed with the bisection method and get the optimal root values.

### How Bisection algorithm work
Suppose an interval $[a,b]$ cointains at least one root, i.e, $f(a)$ and $f(b)$ have opposite signs, then using the bisection method, we determine the roots as follows:

- $\underline{Bisect}$ the initial inteval and set the new values to $x_0$, i.e.
 $x_0=\frac{b+a}{2}$.
 
Note: $x_0$ is midpoint of the interval $[a,b]$. 

Using $x_0$, we consider three cases to determine if $x_0$ is the root or if not so, we determine the new interval containing the root. These cases are:
1. If $f(x_0)=0$, then $x_0$ is the required root.
2. If $f(x_0)\le0$, that is, $f(x_0)$ is negative, the required root lies between $x_0$ and $b$. In this case our new interval become, $[x_0,b]$.
3. If $f(x_0)\ge0$, that is, $f(X_0)$ is postive, then the new interval cointaing the root is $[a,x_0]$. This is because, $[a,x_0]$ are closest values so further for which $f(a)$ and $f(x_0)$ have opposite signs.

- If case one occurs, we terminate the bisection process since we have found the root.
- If either case $(2)$ or $(3)$ occurs, the process is repeated until the root is obtained to the desired tolerance.

The below diagram illustrates how the bisection method works, as we just highlighted.

![Bisection method plot](/engineering-education/bisection-method-in-python/bisection.PNG)

Source:[Oionquest](https://orionquest.github.io/Numacom/bisection.html)

Since we now understand how the Bisection method works, let's use this algorithm and solve an optimization problem by hand.

**Problem:**
1. *a.* Show that the equation  $x^3 + x^2 - 3x-3=0$ has a root between $1$ and $2$.
$b.$ Use the bisection method and estimate the root correct to $2$ decimal places.

**Solution:**
To show that there exists a root for the above function within the interval provided, we evaluate its values using the given points and focus on the signs of the outputs. If signs of the output are opposite, then the root is enclosed within the interval; otherwise, it's not.

Let's do this.
$f(x)=x^3 + x^2 - 3x-3$
$f(1)=(1)^3 + (1)^2 - 3(1)-3=-4<0$
$f(2)=(2)^3 + (2)^2 - 3(2)-3=3>0$

As we can see, $f(1)$ and $f(2)$ have opposite signs on the output, the negative and positive signs, respectively. Thus, a root for this function exists in the interval $[1,2]$.

Now, let's apply the bisection method and get the root to the required accuracy.
- Our intial interval that cointains the root is $[1,2]$
- Bisect this interval to obtain $x_0$, i.e., $$x_0=\frac{1+2}{2}=1.5$$.
- Evalute $f(x_0)$ at $x_0=1.5, \ i.e. $

$$f(1.5)=-1.88$$

Since $f(x_0)$ has a negative sign, then our new interval cointaing the root is between the current $x_0$ and the value $x=2$ . Now,let's proceed and determin $x_1$.

$$x_1=\frac{1.5+2}{2}=1.75$$
Again, let's evaluate our function at $x_1$.
$$f(1.75)=0.75(+ve)$$
Now, our updated interval falls within the previous negative values and $x_1$. Therefore, we bisect this new interval again and check whether the obtain $x$ is such that $f(x)=0$.

$$x_2=\frac{1.5+1.75}{2}=1.625$$

Let's re-evaluate our objective function and notice the sign of the output.

$$f(1.625)=-0.943,$$ $f(x_2)\neq 0$

The new interval cointaing the root becomes:
$$[x_2,x_1].$$
Again, we bisect this interval to get our $x_3$, i.e.,

$$x_3=\frac{1.625+1.75}{2}=1.6878$$
Evaluating $f(x_3)$ gives:

$$f(1.6878)=-0.943$$

Continuing this process, we obtain the root to the required accuracy on the eighth iteration. As we can see, this method converges very slow, and this is its major limitation. 

Given the size of the required accuracy, one can determine the number of iterations that need to be performed to get the root of a function prior to actual bisections.

For the bisection method to converge to the required root, the interval length containing the root must satisfy the condition:

$L_n\le$ the required accuracy. i.e. $\frac{b-a}{2^n}\le0.5\times10^{-k}$ if the given accuracy is $k$ decimal places.

From our previous example, the initial interval that contained the needed root was $[1,2]$. We were supposed to get the root with an accuracy of 2 decimal places. We can determine the number of iterations we need to perform to obtain our root as follows:

$a=1$
$b=2$

![image](/engineering-education/bisection-method-in-python/no-iter.PNG)

This output means we have to perform at least eight iterations if we need our root to $2$ decimal places.

This is all you need to know about the *Bisection algorithm*. Let's now proceed and learn how this algorithm is implemented in python.

### Python implementation of Bisection method.
When implementing the bisection method, we probably provide wrong values for the initial interval. Whenever we run the program, and this turns out to be the case, it can be very tedious to update those values from the program body. We can automate the determination of the validity of our initial guess inputs and take them from the user instead. In this section, we will take inputs from the user. Now, let's consider the function we previously looked at and try to determine its zeros in python.

Our function is:

$f(x) = x^3 + x^2 - 3x - 3$

Below is the implementation of how we do this in python.

```python
# get the necessary libraries
import numpy as np
import matplotlib.pyplot as plt
from scipy. optimize import fsolve
```

Now let's implement our algorithm and get this done.

```python
# define a the bisection function
def f(x):
  return  x**3 + x**2 - 3*x - 3
def bisection(a, b, n):
  i = 1
  condition = True
  while condition:
    x=(a+b)/2
    if f(x) < 0:
      a = x
    else:
      b=x
    print("iteration = ", i, "x = ", x, "f(x) = ", f(x))
    if i == n:
      condition = False
    else:
      condition = True
      i = i + 1
  print("The required root is: ", x)
# take inputs from the user
a = input("First Approximate Root: ") 
b =input("Second Approximate Root: ")
n = input("Number of Iteration: ")
# consider inputs a and b as a float data type
a = float(a)
b =float(b)
# n must be give as an integer.
n = int(n)
# for root to exist between the two intial points we provide f(a)*f(b) < 0
if f(a)*f(b)> 0:
  print("The Given Approxiamte Root do not Bracket the Root.")
  print("Try again with different values.")
else:
  bisection(a,b,n)
# visualixzing the function
x = np.linspace(-2,2,100) # x range between -2 and 2
plt.plot(x, f(x)) # plot the function
plt.grid() # add grids to the plot
plt.show() # print the plot
```

After running the code above, we get:

### Output

```bash
Number of Iteration: 8
iteration =  1 x =  1.5 f(x) =  -1.875
iteration =  2 x =  1.75 f(x) =  0.171875
iteration =  3 x =  1.625 f(x) =  -0.943359375
iteration =  4 x =  1.6875 f(x) =  -0.409423828125
iteration =  5 x =  1.71875 f(x) =  -0.124786376953125
iteration =  6 x =  1.734375 f(x) =  0.022029876708984375
iteration =  7 x =  1.7265625 f(x) =  -0.051755428314208984
iteration =  8 x =  1.73046875 f(x) =  -0.014957249164581299
The required root is:  1.73046875
```
To estimate our root, it took 8 iterations. Below is the curve of the function we are determining its root within the chosen interval.

![plot](/engineering-education/bisection-method-in-python/plot.PNG)

From the above plot, it's clear that a root exists around $x=1.7$. From the iterative outcome, our algorithm determined a root that exists at that point. 

### Conclusion
In this article, we have looked at the Bisection method. First, we defined what this algorithm is and how it works. Then we looked at its major limitation, and finally, we were able to see how this algorithm is implemented in python. I hope you understood and enjoyed reading this tutorial.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
