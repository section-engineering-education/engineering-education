### Solving simultaneous equations

### Linear algebra using matlab

### Introduction

In mathematics, equations in the form Ax=b in mathematics are linear algebra equations. In such equations, A is a matrix while x and b are column vectors. A matrix is a two-dimensional arrangement of numbers. Such equations are common in engineering and scientific disciplines. Thus, understanding the setup of these equations and finding solutions to the problems is an essential skill.

Matlab gives a powerful and reliable way to find solutions to these problems. But, we will also realize that the solutions provided are not always what they appear to be. In this article, we will learn how to solve these problems using Matlab. It is a matrix laboratory, hence the best environment for solving matrix problems.

### Prerequisites

To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.
- Basic understanding of matrix.

### Solving simultaneous equations

We are going to look at how to solve simultaneous equations using Matlab. Simultaneous equations are finite sets of equations for which common solutions are set. What we mean is that they are conditions that define the relationship between two unknowns through an equal number of equations. We are going to use the matrix method. A matrix is a two-dimensional arrangement of numbers. For example, 

$$\left[\begin{array}
{rrr}
1 & 3 & 4 \\
4 & 1 & 3
\end{array}\right]$$ 
$$\left[\begin{array}
{rrr}
1 & 3 \\
4 & 1
\end{array}\right]
$$

Defining the matrix is by dimensions m x n, where m is the number of rows while n is the number of columns. A row is a horizontal arrangement, while a column is the vertical arrangement of the numbers. If we have a 3x2 matrix, then what that means is that it has 3 rows and 2 columns. These matrices are used compactly to work with linear equations. The different forms of the matrix are;

- Row vector - Are matrices with a single row.
- Column vector - Are matrices with a single column.
- Square matrices - Are matrices where m=n, that is, the number of columns equals the number of rows. The basic form of linear equations is;
- 
> ![lineq](http://mathurl.com/yacqpchy.png)
  
Where $A_ij$ are the elements of the MxN matrix, $X_j$ are the elements of Nx1 matrix column vectors, and $b_i$ are the elements of the Mx1 row vector. For example, given a simultaneous equation shown below;

$$
\begin{cases} 4x+5y=3\\3x-2y=14\end{cases}
$$

The simplification of this equation is;

$$
\left(\begin{array}{cc} 
4 & 5\\
3 & 2
\end{array}\right)
\left(\begin{array}{cc} 
x\\ 
y
\end{array}\right)=
\left(\begin{array}{cc} 
3\\
14
\end{array}\right)
$$

For you to solve these simultaneous equations using the matrix method, `m` of the second matrix must equalize `n` of the first matrix after the simplification done above. It is because solving simultaneous equations using Matlab involves the multiplication of the matrix.

These equations are simultaneous because one set of $x_i$ must satisfy all the equations of M. Assume that you have the value of A and x to find b, then the equation is easy to solve. You apply the matrix multiplication method. The big problem is finding `x` given `A` and `b`; focusing on such problems, we will see how to handle them.

### Matlab's solution

The basic operations that you use to solve these equations in Matlab depend on the variable provided. When;
- A and x are provided, the solution is b = A*x. The `n` of `A` must equal `m` of ` x` for this operation to work.

- A and b is provided, the solution is A/b. Here, `m` of `A`  must equal to `m` of b.
Example

$$
\begin{cases} 4x+5y=3\\3x-2y=14\end{cases}
$$
$$\left[\begin{array}
{rrr}
4 & 5 \\
3 & -2
\end{array}\right]
$$

This is the first matrix, A.

$$\left[\begin{array}
{rrr}
6\\
14
\end{array}\right]
$$

It is the second matrix b. Now that you have A and b, then we are supposed to find x. When you have A and b, we use x =A\b. So to get this done, execute the following command in the command window.

```Matlab
A = [4 5; 3 -2];
b = [6; 14];
x = A\b
```

We have assigned our matrices to variables `A` and `b` then gave the formulae used to solve the problem. In Matlab, the separation of rows is by semicolons. When you execute the command, the result is displayed as shown below;

```
x =

    3.5652
   -1.6522
```

Matlab provides a solution to linear algebra. But, at some point, it doesn't produce the solution, or the solutions provided are less trustworthy. So, Matlab will give the user a warning at some point, but this happens in rare cases. Now, the fault here may not be due to poor syntax or Matlab's fault, but it could be due to the user's failure to understand linear algebra. But don't worry. I am here to show you the causes of such problems and the meaning of the output given by Matlab.

The problem we solved before had two unknowns, `x` and `y`, and since there were two unknowns, the output had a length of two(column vector). There are various types of simultaneous equations, that is,

- Inconsistent equations.
- Undetermined equations.
- Overdetermined equations.

### Inconsistent equations

Inconsistent equations are equations in which m=n(number of rows equals the number of columns), but the solution does not exist. In this type of equation, the left side is equal, but right sides are not e.g

$$
\begin{cases} 4x+5y=6\\4x+5y=14\end{cases}
$$

What we mean is that for the left side we have *4x+y* for both equation 1 and 2 while for the right side we have 6 and 14 for equation 1 and 2 respectively. It shows that the equations are inconsistent. Solving simultaneous is finding the point at which two equations meet when plotted. When you plot these two equations, the lines are parallel.

Let's make a plot to visualize what we are talking about in the above statement. Since we are plotting `x` against `y`, we will first make `y` the subject for each equation then plot. As shown below:

$$
\begin{cases} y1=(6-4x)/5\\y2=(14-4x)/5\end{cases}
$$

To plot, we give the `x` variables first

```matlab
x = [-10:10];        % x ranges from -10 to 10
y1 = (6 -4*x)/5;     %y variables
y2 = (14 -4*x)/5;
plot(x, y1, x, y2)   %plotting the two equations
legend('y1', 'y2')   %Adding legends to the plot
```

![output](/engineering-education/solving-linear-equation-using-matlab/linear_one.png)

The two lines are parallel. It means that the two lines intersect at infinity. So when you try to get the solution to this problem using Matlab, the output given for the unknowns is `inf`, which means infinity.

```
x =

  -Inf
   Inf
```

### Undetermined equations

These are equations in which m>n. It means that the provided information is insufficient to give a solution to the problem example;

4x + 5y =6

Mathematically, the solution is y = (6-4x)/5. It means that the `x` value can range from `-inf` to `inf` as long as it works with the provided y. If Matlab is used to solve such equations, it will give only one value and the other set to 0. 

```Matlab
A = [4 5];
b = 6;
x = A\b
```

The output will be;

```
x =

         0
    1.2000
```

Inadequate information not only occurs in cases where m=n, but it can also occur for problems in which m>n. It could be due to the redundancy of other equations. e.g

$$
\begin{cases} 4x + 5y=6\\8x + 10y=12\\ -2x -2.5y =-3\end{cases}
$$

In the above equation, the information is insufficient since equations (i) and (ii) can be generated from equation (i). If you take equation(i) and multiply by 2, we get equation (ii), and also, if you take equation(i) and divide by -2, we get equation(iii).

### Overdetermined equations

This kind of equations mainly occurs when m>n. Here, the information provided by the equations is too much. The equation Ax=b cannot be satisfied simultaneously by any value of the vector x. When you solve the equation using Matlab, it will give an output, but it does not satisfy the matrix rule a*x =b. To understand this, we start by plotting the equations below;

$$
\begin{cases} 4x + 5y=6\\3x - 2y=14\end{cases}
$$

For the first equation, y1 = -(4x - 6)/5. To plot `y2` and `y1` against `x`.

```matlab
x = [-10;10];
y1 = (-4*x + 6)/5;
y2 = (3*x -14)/2;
plot(x, y1, x, y2);
grid on
xlabel('x');
ylabel('y');
legend('y1', 'y2')
```

![output two](/engineering-education/solving-linear-equation-using-matlab/linear_two.png)

We will use the `intersect function` to find the point at which the lines intersects. The intersect function uses the gradients and the constants as the inputs as shown below;

```matlab
function [x0, y0] = intersectPoints(m1,m2,b1,b2) %m is the gradient while b is the constant. 
x0 = (b2-b1)/(m1-m2); %find the x point
y0 = m1*x0+b1;
end
```

To call this function in the command window;

```matlab
intersectPoints(-4/5, 3/2, 6/5, -14/2) 
```

The output will be;

```
ans =

    3.5652
```

This function gives a single output corresponding to the `x` value for the point of intersection. To find  `y`, you can replace `x` in the equation and get your `y`.
The diagram shows that the solution is similar to the one we found before(3.5652,-1.6522). It means that the solution is correct. Now assume that now we have the equation below;

$$
\begin{cases} 4x + 5y=6\\8x + 10y=12\\ -2x -2.5y =-3\\ 7x - y =25\end{cases}
$$

Let's plot the line of the three equations. To do that, we add the code below;

```Matlab
y3 = 7*x - 25;
hold on
plot(x, y1, x,y2, x, y3)
```

![output](/engineering-education/solving-linear-equation-using-matlab/linear_three.png)

When you execute the above commands, we get a 3rd line(the green line) which is for the third equation. Looking at the plots, you may think these three lines intersect at a common point, but this is not the case. To see this, zoom out the plots. To zoom out, click on the magnifying lens icon having `+` inside it. After clicking it, move to the point at which the lines seems to intersect a few times, and the result will be;

![output](/engineering-education/solving-linear-equation-using-matlab/linear_four.png)

This shows that there is no perfect solution to these problems. If we try solving it using matlab and plot this output to see the position that matlab gives as the output. This can be done by the code below;

```matlab
A = [4 5; 3 -2; 7 -1];
b = [6; 14;25];
x = A\b;
hold on
plot(x(1),x(2),'k*')
plot(x(1),x(2),'r*')
```

![output](/engineering-education/solving-linear-equation-using-matlab/linear_five.png)

As you can see, Matlab is trying to locate a point close to all three lines, and this is an approximation. You can find the error to the solution by;

```Matlab
error = A*x -b
```

Matlab locates this closest point by finding the square root of the sum of squares of elements of the input vector. Locating this point is by use of the `norm` function.

```Matlab
norm(error)
```

The output is `0.7941` and is known as `optimum solution in the least square sense`. It is the point at which the `norm(error)` is as small as possible. If we try other points, we get `norm(error)` to be higher than `0.7941`.

### Conclusion

Solving simultaneous equations in Matlab depends on the type of problem that you are handling. As a user, you should know the type of equation or problem you are trying to solve. Besides, it will help you know the output you expect from Matlab. What you must know is that Matlab will provide a solution to all these problems. Also, knowing the type of equation helps you avoid errors in linear equations.

That's it. Happy Coding.
