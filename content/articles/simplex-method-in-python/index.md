
### Understanding the Simplex Method
The simplex method is an algorithm used in linear programming problems to determine the optimal solution for a given optimization problem. This method is used when a linear optimization problem is subjected to inequality constraints. 

In this article, we shall look at how this algorithm work.

### Prerequisites
1. Python installed on your computer
1. Knowledge in Gaussian [Jordan Elimination Method](https://www.storyofmathematics.com/gauss-jordan-elimination) in Linear Algebra.

To understand how this algorithm works, let's consider the following problem:

Manufacture of bicycles builds racing, touring, and models. The bicycles are made of both aluminum and steel. The company has available 91800 units of steel and 42000 of aluminum. The racing, touring, and mountain models need 17, 27, and 15 units of steel, and 12, 21, and 15 units of aluminum, respectively. How many of each type of bicycle should be made to maximize the profit if the company makes 8 dollars per racing bike, 12dollars per touring bike, and 22 dollars per mountain bike? What is the maximum possible profit?

### Setting up a Simplex method
Now, many optimization problems we will come across are in statement form. From this statement, we need to formulate our optimization problem correctly. Therefore, we chose this kind of problem and not an already developed one to show you how you can systematically develop an optimization problem so that in the future, you can do so on your own.

The first thing we need to do is to define our variables:
R: Number of racing bikes
T: Number of touring bikes
M: Number of mountain bikes

So the next thing is to understand what we are optimizing. 
From the question, we are asked to find the maximum profit. Therefore we are optimizing the profit function.
Still from the question, the profit function is:
P = 8R + 12T + 22M

Now we have our objective function. The next thing is to find out what are restrictions this function is imposed on. For example, all productions can only utilize up to the available resources. Therefore from this, we can realize our first constrain. 

Since we have two categories of resources with the respective possible number of production units made out of them, we will thus have two constraints. These constraints are:
$17R+27T +34M\le91800$
$12R+21T +15M\le42000$

Additionally, we need to understand that any type of product produced can either be zero for not produce or greater than one when at least a single product is produced. Therefore on top of the above two constraints, we will all the following as well:
$R\ge0, T\ge0,M\ge0$ 

Now, we can combine the following and come up with the following optimization problem.

$Maximize\ P = 8R+12T+22M $
Sujected to:
$17R+27T +34M\le91800$
$12R+21T +15M\le42000$
$R\ge0, T\ge0,M\ge0$

This is the optimization we need to solve.

To get started, on the objective equation take all variables and put them to it's left hanside, i.e.,
$Maximize\ -8R-12T-22M + P = 0$
$s|t$
$17R+27T +34M\le91800$
$12R+21T +15M\le42000$
$R\ge0, T\ge0,M\ge0$

For the coinstrains, we add a slack variable, such that the inequality becomes an eaquality function, i.e.,

$17R+27T +34M\le91800\rightarrow17R+27T +34M+S_1=91800$
$12R+21T +15M\le42000\rightarrow12R+21T +15M+S_2=42000$
$S_1\ge0,S_2\ge0$

Therefore, our problem will be re-written as:
$Maximize\ -8R-12T-22M + P = 0$
$s|t$
$17R+27T +34M\le91800\rightarrow17R+27T +34M+S_1=91800$
$12R+21T +15M\le42000\rightarrow12R+21T +15M+S_2=42000$
$R\ge0, T\ge0,M\ge0S_1\ge0,S_2\ge0$

This is the standard form of our problem.

From these equations, we can obtain our initial tableau as:

$\begin{bmatrix}
\begin{array}{cccccc|cc}
  R & T & M & S_1 & S_2 &P & Solution 
  \\ \hline
   17 & 27& 34& 1& 0 & 0& 91800 \\ 
   12 & 21& 15& 0& 1& 0& 4200  \\
  \hline
   -8 & -12 & -22& 0& 0& 1& 0 \\ 
\end{array}
\end{bmatrix}$

The next thing is to figure out the pivot column, i.e., the column with the most negative value. As we can see, the pivot column is M.

From this column, we need to determine the pivot value.
The pivot value is found as follow:
$min(91800/34, 42000/15) = min(91800/34, 42000/15) = 91800/34 = 2700$

Since 34 is the value of the pivot column corresponding to the lowest quotient, it's the pivot value. Now, we need to make this value a unit value. To do so, we multiply the pivot row by $1/34$. This will yield the following tableau.

$\begin{bmatrix}
\begin{array}{cccccc|cc}
  R & T & M & S_1 & S_2 &P & Solution 
  \\ \hline
   1/2 & 27/34& 1& 1/34& 0 & 0& 2700 \\ 
   12 & 21& 15& 0& 1& 0& 42000  \\
  \hline
   -8 & -12 & -22& 0& 0& 1& 0 \\ 
\end{array}
\end{bmatrix}$
The next step is to make all the values below and above the pivot value zeros.

To get this done, we need to perform the following operations.
1. Replace $R_2$ with, $R_2 = -15R_1 + R_2$

2. Replace $R_3=$ with, $R_3=22R_1+R_3$

This operation will yield the following tableau:

$\begin{bmatrix}
\begin{array}{cccccc|cc}
  R & T & M & S_1 & S_2 &P & Solution 
  \\ \hline
   1/2 & 27/34& 1& 1/34& 0 & 0& 2700 \\ 
   9/2 & 309/34& 0& -11/34& 1& 0& 1500  \\
  \hline
   3 & 93/17 & 0& 11/17& 0& 1& 59400 \\ 
\end{array}
\end{bmatrix}$
We reach the optimal solution when there is no negative value in our objective row. Since there is no negative value in the objective row from the above table, we have an optimal solution. 

From this solution, we note that M and $S_2$are the basic variables( take the form of an identity matrix), and the rest are non-basic. Therefore, we set all non-basic variables to zero. This implies that our solution will be as follows:

$R = 0$
$T = 0$
$M=2700$
$P = 59400$

Therefore, the optimal solution will be to produce no racing bike, no touring bike, and 2700 mountain bikes to realize a maximum profit of 59400 dollars.

As we can note, this problem converged to the optimal solution so faster. However, there are cases where this will not be the case. For example, let's world through the following example and see this in practice.

Suppose we are given the following linear programming problem.

*Using the Simplex method:*
*Maximize*, $Z=30x+40y$
Subject to, 
$x+y\leq 50$
$4x++2y\leq 150$
$50x+100y\le 4500$
$x\ge0$, $y\ge0$

The first thing is to rewrite this problem in standard form by introducing slack variables. Since we have three less than inequalities in the above problem, we will introduce three slack variables($S_1,\ S_2,\, and\ S_3$) for inequalities to become equations.

Therfore, our pronlem becomes:
Maximize, $Z=30x+40y$
Subject to, 
$x+y+S_1= 50$
$4x++2y+S_2 =150$
$50x+100y+S_3= 4500$
$x\ge0$, $y\ge0,+S_1\ge0,S_2\ge0,S_3\ge0$

From this equation, we get our initial tableau as:

$\begin{bmatrix}
\begin{array}{c|ccccc|cc}
  Basis&x & y & s_1 & s_2 & s_3 & Solution 
  \\ \hline
   s_1&1 & 1& 1 & 0 & 0 & 50 \\ 
   s_2&2 & 1 & 0 & 1 & 0& 75  \\
   s_3&1 & 2 & 0 & 0 & 1 & 90 \\ \hline
   Z&-30 & -40 & 0 & 0 & 0 & 0 \\ 
\end{array}
\end{bmatrix}$

This solution is not optimal since there exist negative values in the $z^{th}$ row.
So, we need to identify the pivot column, i.e., the column with the most negative value on the $z^{th}$-row.
  If we do so, the pivot column, also known as the Entering variable, is $y$.
From this column, let's find the pivot value, i.e., the value corresponding to the minimum quotient in the pivot column. Where the quotients are computed as follows:

- $50/1$
- $75/1$
- $90/2$

As we can note from the above quotients, 45 is the minimum of all the questions. Therefore, the pivot value is 2.

We need to apply the Gaussian-Jordan Elimination row-reduction technique and make the pivot value one while all other elements are above or below zero. Upon performing these operations, we will get a tableau similar to the one below:

$\begin{bmatrix}
\begin{array}{c|ccccc|cc}
  Basis&x & y & s_1 & s_2 & s_3 & Solution 
  \\ \hline
   s_1&1/2 & 1& 1 & 0 & -1/2 & 5 \\ 
   s_2&1.5 & 0 & 0 & 1 & -1/2& 30  \\
   s_3&1/2 & 1 & 0 & 0 & -1/2 & 45 \\ \hline
   Z&-10 & 0 & 0 & 0 & 20 & 1800 \\ 
\end{array}
\end{bmatrix}$

Since we have negative values in the $z^{th}$ row, this solution is not optimal.
Again, we identify the pivot column from the current tableau and repeat all the steps, from identifying the pivot column and the pivot value. Applying the Gaussian Jordan Elimination Method, we make the pivot value a unit value and all other elements in the same column zeros. 

We then check if our objective row is optimal(has no negative value). If it's optimal, we execute the process; else, we continue to find the next pivot column and pivot value until the $Z^th$ row is optimal.

Doing so on the above tableau, finally, we will end up with the following tableau.

$\begin{bmatrix}
\begin{array}{c|ccccc|cc}
  Basis&x & y & s_1 & s_2 & s_3 & Solution 
  \\ \hline
   M&1 & 0& 2& 0& 1& 10 \\ 
   s_2&0 & 0 & 3 & 1 & 1& 15  \\
   y&0 & 1 & 1 & 0 & 1 & 40 \\ \hline
   Z&-10 & 0 & 0 & 0 & 20 & 11900 \\ 
\end{array}
\end{bmatrix}$

Where M is given as:
$M=min(5/0.5,30/1.5,45/0.5)=10$

As we can see, there's no negative value in the $Z^{th}$ row, and thus the solution is optimal. This is the *Simplex Algorithm*

### Python Implementation of Simplex Algorithm
Now we can run the above two examples in python and see if we get the same output.

We will work through how we create our input arrays from the first problem  and then the second problem will one will follow.

#### Case 1.

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
From this output, it's clear that the optimal action is to build 0 touring bikes, 0 racing bikes, and 2700 mountain bikes. If this action is practiced, the company will realize an optimal profit of 59400 dollars.

Now, let's proceed and solve the second problem.

The optimization problem was:
Maximize, $Z=30x+40y$
Subject to, 
$x+y\leq 50$
$4x++2y\leq 150$
$50x+100y\le 4500$
$x\ge0$, $y\ge0$

From this problem, we can have the following three arrays.

$c = [-30, -40]$

$A=\begin{bmatrix}
   1&1\\ 
   4&2 \\
   50&100
\end{bmatrix}$

$b = [50, 150, 4500]$

These are the matrices we shall implement in python and get opur problrm solved.
Bellow is the python code which perform these operations.
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

Execting this program yields:

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

In the result, the value of the Objective function, i.e., fun, is -1900. This value is computed for the minimization problem. In the case of a maximization problem, we omit the negative sign. Therefore, the solution for our maximization is 1900. Also, from the results, we can see that the value for the x and y that will lead to an optimal solution are 10 and 15, respectively. 

The output we obtained from our two implementations above is similar to the respective manual problems we solved before. Thus, the simplex problem was successfully implemented.

### Conclusion
In this tutorial, we have theoretically looked at the simplex method and its implementation in python. Other than solving the optimization problem itself, we showed you how we wisely deduce the optimization function from the given problem. Happy learning.
