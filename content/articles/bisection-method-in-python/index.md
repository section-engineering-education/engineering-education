### A Complete Guide to Bisection Algorithm for Non-Linear Optimization
Roots of a function $f(x)$ refers to values of $x$ for which the function equals zero, i.e., $f(x)=0$. Determining the roots of a function is a routine activity in machine learning where we establish a polynomial cost function and then try to find the values, say $x$ such that the cost function is minimal. In practice, we deal with huge datasets, and the models fit on such datasets may involve thousands of parameters that we are required to estimate. It is impossible to find the roots of such function by hand. There exist well-defined algorithms that one can use to determine these parameters to the required accuracy iteratively. 

 Some of the most used algorithms in root determining or model optimization are; the Bisection method, [Newton Raphson method](https://brilliant.org/wiki/newton-raphson-method), [Steepset Descent method](https://www.math.usm.edu/lambers/mat419/lecture10.pdf), etc. These methods are used in different scenarios depending on the optimization problem's properties.
 
 This article will guide you to know how the Bisection method work and how we can utilize it to determine the optimal parameters of a model.

### Pre-requsite:
To follow along with this material comfortably, you need to have the following:
1. Python installed on your computer
2. Good understanding of python control flows.
3. An ability to work with python functions

### Introduction to Bisection method
Before diving into the Bisection method, let's look at how we define the initial interval that contains at least one root of the cost function.

If a function $f(X)$ is continous in the interval $a$ and $b$ and $f(a)$ and $f(b)$ are of opposite signs, then there exist at least one root for $f(x)$ between $a$ and $b$. This fuction, $f(x)$, is usually non-linear and has a geometrical view similar to the one in the figure below.

![plot](/engineering-education/bisection-method-in-python/polynomial-curve.png)

Provide the initial interval $[a,b]$ meets the conditions above, we can utilize the Bisection method and get the optimal root values.

### How Bisection Algorithm work
Suppose an interval $[a,b]$ cointains at least one root, i.e, $f(a)$ and $f(b)$ have opposite signs, then using the Bisection method, we determine them as follows:

- $\underline {Bisect}$ this inteval and set the new values to $x_0$, i.e.,

 $x_0=\frac{b+a}{2}$.
 Note: $x_0$ is the midpoint of the interval [a,b]. 

Using our $x_0$, we consider three cases to determine the root or the new interval containing the root.
1. If $f(x_0)=0$, then $x_0$ is the required root.
2. If $f(x_0)\le0$, i.e., negative number, then $f(x_0)$ and $f(b)$ have opposite signs. Thus, the required root lies between $x_0$ and $b$. In this case our new interval becomes, $[x_0,b]$.
3. If $f(x_0)\ge0$, i.e., postive number, then $f(a)$ and $f(x_0)$ are the closest values with opposite signs have opposite signs. Therefore, the new interval cointaing the root is $[a,x_0]$.

- If case one occurs, we terminate the bisection process since the root has been found.
- If either case $(2)$ or $(3)$ occurs, the process is repeated until the root is obtained to the desired tolerance.

The diagram below illustrates the working criterion for the Bisection method that we have just highlighted.

![Bisection Method Plot](/engineering-education/bisection-method-in-python/bisection.png)
Source:[Oionquest](https://orionquest.github.io/Numacom/bisection.html)

Since we now have a clear intuition of how the Bisection method work, we can now look at its application using a simple problem that we can easily optimize by hand.

*Problem:*
1. *a.* Show that the equation   $x^3 + x^2 - 3x-3=0$ has a root between $1$ and $2$.
$b.$ Use the bisection method and estimate the root correct to $2$ decimal places.

*Solution:*
To show this function has a root between the given interval, we will evaluate its values using this starting point and focus only on the signs of the resulting outputs. If signs are different, the root exists within the given interval; otherwise, it does not.

Let's do that this.
$f(x)=x^3 + x^2 - 3x-3$
$f(1)=(1)^3 + (1)^2 - 3(1)-3=-4<0$
$f(2)=(2)^3 + (2)^2 - 3(2)-3=3>0$

As we can see, $f(1)$ has a negative sign and $f(2)$ positive sign. Therefore, a root for this function exists in the interval $[1,2]$.

Now, let's apply the Bisection method and get such root to the required accuracy.

- Our intial interval cointaing the root is $[1,2$
- Bisect to get $x_0$, i.e., $$x_0=\frac{1+2}{2}=1.5$$.
- Evalute $f(x_0)$ at $x_0=1.5, \ i.e.,$
$$f(1.5)=-1.88$$

Since $f(x_0)$ has a negative sign, then the new interval cointaing the root is between this current $x_0$ and the value $x=2$ . Now,let's proceed and determin $x_1$.

$$x_1=\frac{1.5+2}{2}=1.75$$
Again, let's evaluate our function at $x_1$.
$$f(1.75)=0.75(+ve)$$
Now, our updated interval falls within the previous negative values and $x_1$. Therefore, we bisect this new interval again and check whether the obtain $x$ is such that $f(x)=0$.

$$x_2=\frac{1.5+1.75}{2}=1.625$$

Let's re-evaluate our function and notice the sign of the output in case it doesn't give $f(x)=0$.

$$f(1.625)=-0.943$$, $f(x_2)\neq 0$

The new interval cointaing the root becomes:
$$[x_2,x_1].$$
Again we bisect this interval to get our $x_3$, i.e.,

$$x_3=\frac{1.625+1.75}{2}=1.6878$$
Evaluating $f(x_3)$ gives:

$$f(1.6878)=-0.943$$

Continuing this process, we obtain the root at the required accuracy on the eighth iteration. As we can see, this method converges very slow, and this is its major drawback. 

Given the size of the required accuracy, one can check the number of iterations they need to perform to get the root of the function prior to actual bisections.

Now, for the Bisection method to converge to the exact root, the length of the interval containing the root must satisfy the condition:

$L_n\le$ the required accuracy. i.e., $\frac{b-a}{2^n}\le0.5\times10^{-k}$ if the given accuracy is $k$ decimal places.

From our previous example, our initial interval that contained the root needed was $[1,2]$. The condition was to get the root with an accuracy of 2 decimal places. We can determine the number of iterations we need to perform to obtain our root. We do this as follows:

$a=1$
$b=2$

![image](/engineering-education/bisection-method-in-python/no-iter.png)

This output means that we have to perform at least eight iterations if we need our root to $2$ decimal places.

This is all you need to know about the Bisection algorithm. Let's now proceed and learn how this algorithm is implemented in python.

### Python Implementation of Bisection Method.
Since we may not always give the correct guess for the initial interval, we can take inputs from the user so that any wrong guess is notified automatically to the user and asked to give new inputs.

Suppose we are required to determine the root of the following function.

$f(x) = x^3 + x^2 - 3x - 3$

Below is an implementation of how we do this in python.

```python
# get the necessary libraries
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import fsolve

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
Execting this code, we get;

### Output:

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
To estimate our root, it took 8 iterations. Below is the curve of our function we are trying to determine its root within the chosen interval.

![plot](/engineering-education/bisection-method-in-python/plot.png)

From this plot, we can see that there exists a root around $x=1.7$. From the iterative outcome, our algorithm determined a root that exists at that point. 

### Conclusion
In this article, we have looked at the Bisection method. We Defined what this algorithm is and how it works. We also looked at its major limitation and finally saw how it is implemented in python. I hope this material was clear to understand, and you enjoyed reading.
