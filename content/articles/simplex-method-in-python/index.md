---
layout: engineering-education
status: publish
published: true
url: /simplex-method-in-python/
title: Getting Started with the Simplex Method Algorithm
description: The simplex method is an algorithm used in linear programming problems to determine the optimal solution for a given optimization problem.
author: stanley-juma
date: 2022-01-17T00:00:00-13:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/simplex-method-in-python/hero.png
    alt:  Getting started with the Simplex Method Algorithm Image
---
The simplex method is a linear programming algorithm used to determine the optimal solution for a given optimization problem. 
<!--more-->
This method is used when the linear optimization problem is subjected to inequality constraints. In this article, we shall look at how this algorithm work.

### Prerequisites
To follow along the reader should have the following:
1. Python installed on your computer.
2. Knowledge in Gaussian [Jordan Elimination Method](https://www.storyofmathematics.com/gauss-jordan-elimination) in Linear Algebra.

To understand how this algorithm works, let us consider the following problem:

*A bicycle manufacturer makes touring, racing, and model bicycles. These bicycles are made of aluminum and steel. The company has 91800 steel units and 42000 aluminum units. The racing, touring, and mountain models require 17, 27, and 15 steel units and 12, 21, and 15 aluminum units. A company makes 8 dollars per racing bike, 12 dollars per touring bike, and 22 dollars per mountain bike. In order to maximize profits, how many of each type should be produced? What is the maximum profit that can be made?*

### Setting up a simplex method
Now, many optimization problems we will come across are in statement form. From that, we will be required to formulate the optimization equations correctly. Therefore, we chose this kind of problem, and not an already developed one, so that you can learn how to systematically develop the problem we later optimize. This will give an ability to do s9 in the future on your own.

The first thing we need to do is to define our variables. We define them as follows:
R: Number of racing bikes.
T: Number of touring bikes.
M: Number of mountain bikes.

So the next thing is to understand what we are optimizing the problem for. From the question, we are asked to find the maximum profit. Therefore we are optimizing the profit function.

Still from the question, the profit function is:

*P = 8R + 12T + 22M*

Now we have our objective function. The next thing is to find out the restrictions this function is imposed on. For example, all productions can only utilize up to the available resources. Therefore from this, we can realize our first constraint. 

Since we have two categories of resources with the respective possible number of production units made out of them, we will thus have two constraints. 

These constraints are:

$$17R+27T +34M\le91800$$
$$12R+21T +15M\le42000$$

Additionally, we need to understand that any product produced can either be zero when nothing is produced or greater than zero when at least a single unit is produced. Therefore on top of the above two constraints, we will add the following as well:

$R\ge0, T\ge0,M\ge0$ 

Now, we can combine the following and develop the following optimization problem:

![eqution](/engineering-education/simplex-method-in-python/equaiton1.png)

This is the optimization we need to solve. To get started, on the objective equation take all variables and put them to the left hanside, i.e.,

![eqution](/engineering-education/simplex-method-in-python/equaiton2.png)

For the coinstraints, we add a slack variable, such that the inequality becomes an an equal function, i.e.,

![eqution](/engineering-education/simplex-method-in-python/equaiton3.png)

Therefore, our problem will be re-written as:

![eqution](/engineering-education/simplex-method-in-python/equation4.png)

This is the standard form of our problem. From these equations, we obtain our initial table as:

![image](/engineering-education/simplex-method-in-python/table1.png)

The next thing is to figure out the pivot column, i.e., the column with the most negative value on the objective row. As we can see, the pivot column is M. From this column, we need to determine the pivot value. 

The pivot value is found as follows:

$min\,\,(91800/34, 42000/15) = min\,\,(91800/34, 42000/15) = 91800/34 = 2700$

Since 34 is the value of the pivot column corresponding to the lowest quotient, it is the pivot value. Now, we need to make this value a unit value. To do so, we multiply the pivot row by $1/34$. 

This will yield the following table:

![image](/engineering-education/simplex-method-in-python/table2.png)

The next step is to make all the values below and above the pivot value zeros. To get this done, we need to perform the following operations:

1. Replace $R_2$ with, $R_2 = -15R_1 + R_2$

2. Replace $R_3=$ with, $R_3=22R_1+R_3$

This operation will yield the following table:

![image](/engineering-education/simplex-method-in-python/table3.png)

We reached the optimal solution with no negative value in our objective row, indicating that we have an optimal solution. From this solution, we note that M and $S_2$are the basic variables (take the form of an identity matrix), and the rest are non-basic. Therefore, we set all non-basic variables to zero. 

This implies that our solution will be as follows:

$R = 0$
$T = 0$
$M=2700$
$P = 59400$

Therefore, the optimal solution will be to produce no racing bike, no touring bike, and 2700 mountain bikes to realize a maximum profit of $59,400$ dollars.

As we can note, this problem converged to the optimal solution faster. However, there are cases where this will not be the case. For example, let us look at the following example and see this in practice.

Suppose we are given the following linear programming problem:

*Using the Simplex method:*

![image](/engineering-education/simplex-method-in-python/optimize.png)

The first thing is to rewrite this problem in standard form by introducing slack variables. Since we have three less than inequalities in the above problem, we will introduce three slack variables($S_1,\ S_2,\, and\ S_3$) for inequalities to become equations.

Therfore, our problem becomes:

![image](/engineering-education/simplex-method-in-python/optimize2.png)

From this equation, we get our initial table as:

![image](/engineering-education/simplex-method-in-python/table4.png)

This solution is not optimal since there exist negative values in the $z^{th}$ row. So, we need to identify the pivot column, i.e., the column with the most negative value on the $z^{th}$-row. If we do so, the pivot column, also known as the Entering variable, is $y$.

From this column, let us find the pivot value, i.e., the value corresponding to the minimum quotient in the pivot column. Where the quotients are computed as follows:

- $50/1$
- $75/1$
- $90/2$

As we can note from the above quotients, 45 is the minimum of all the questions. Therefore, the pivot value is 2. We need to apply the Gaussian-Jordan Elimination row-reduction technique. This will make the pivot value one while all other elements are above or below zero. 

Upon performing these operations, we will get a table similar to the one below:

![image](/engineering-education/simplex-method-in-python/table5.png)

Since we have negative values in the $z^{th}$ row, this solution is not optimal. Again, we identify the pivot column from the current tableau and repeat all the steps, from identifying the pivot column and the pivot value. Applying the Gaussian Jordan Elimination Method, we make the pivot value a unit value and all other elements in the same column zeros. 

We then check if our objective row is optimal (has no negative value). If optimal, we execute the process; otherwise, we continue to find the next pivot column and pivot value until the $Z^th$ row is optimal.

Doing so on the above table, we will end up with the following table:

![image](/engineering-education/simplex-method-in-python/table6.png)

Where M is given as:

$M=min(5/0.5,30/1.5,45/0.5)=10$

As we can see, there is no negative value in the $Z^{th}$ row, and thus the solution is optimal. This is how the *Simplex Algorithm* algorithm work.

### Python implementation of the Simplex Algorithm
We can run the above two examples in Python and see if we get the same output. We will walk through how we created our input arrays from the first problem, and then the second problem will follow.

#### Case 1

```python
### Import the neccessary libraries
import numpy as np
import scipy as sp
# Get matrices
c = [-8, -12, -22]
A = [[17, 27, 34], [12, 21, 15]]
b = [91800, 42000]
# define the upper bound and the lower bound
R = (0, None)
T = (0, None)
M = (0, None)
# Implementing the Simplex Algorithm
from scipy.optimize import linprog
# Solve the problem by Simplex method in Optimization
res = linprog(c, A_ub=A, b_ub=b,  bounds=(R, T, M), method='simplex', options={"disp": True})  # linear programming p[roblem
print(res) # print results
```

This program returns:

```bash
Optimization terminated successfully.
         Current function value: -59400.000000
         Iterations: 3
     con: array([], dtype=float64)
     fun: -59400.0
 message: 'Optimization terminated successfully.'
     nit: 3
   slack: array([   0., 1500.])
  status: 0
 success: True
       x: array([   0.,    0., 2700.])
```

From this output, it is clear that the optimal action is to build 0 touring bikes, 0 racing bikes, and 2700 mountain bikes. If this action is practiced, the company will realize an optimal profit of $59,400 dollars.

Now, let us proceed and solve the second problem. 

The optimization problem was:

![image](/engineering-education/simplex-method-in-python/problem.png)

From this problem, we can have the following three arrays:

![image](/engineering-education/simplex-method-in-python/arrays.png)

We shall implement these matrices in Python and solve our problem. Below is the Python code which performs these operations.

#### Case 2

```python
### Import the neccessary libraries
import numpy as np
import scipy as sp
# Get matrices
c = [-30, -40]
A = [[1, 1], [4, 2], [50, 100]]
b = [50, 150, 4500]
# define the upper bound and the lower bound
x = (0, None)
y = (0, None)
# Implementing the Simplex Algorithm
from scipy.optimize import linprog
# Solve the problem by Simplex method in Optimization
res = linprog(c, A_ub=A, b_ub=b,  bounds=(x, y), method='simplex', options={"disp": True})  # linear programming p[roblem
print(res) # print results
```

Executing this program yields:

```bash
Optimization terminated successfully.
         Current function value: -1900.000000
         Iterations: 3
     con: array([], dtype=float64)
     fun: -1900.0
 message: 'Optimization terminated successfully.'
     nit: 3
   slack: array([ 0., 30.,  0.])
  status: 0
 success: True
       x: array([10., 40.])
```

In the result, the value of the objective function, i.e., fun, is -1900. This value is computed for the minimization problem. In the case of a maximization problem, we omit the negative sign. Therefore, the solution for our maximization is 1900. Also, from the results, we can see that the value for the `x` and `y` that will lead to an optimal solution are 10 and 15, respectively. 

The output we obtained from our two implementations above is similar to the respective manual problems we solved before. Thus, the simplex problem was successfully implemented.

### Conclusion
In this tutorial, we have theoretically looked at the simplex method and its implementation in Python. Other than solving the optimization problem itself, we showed you how we wisely deduce the optimization function from the given problem. 

Happy coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)

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
