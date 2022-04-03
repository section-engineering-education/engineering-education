---
layout: engineering-education
status: publish
published: true
url: /solving-linear-equations-using-matlab/
title: Solving Linear Equations Using Matlab
description: This article will look at how to solve linear algebra equations using Matlab. We will also look at the setup of these equations and the different types of equations.
author: paul-juma
date: 2021-09-15T00:00:00-21:35
topics: []
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/solving-linear-equations-using-matlab/hero.jpg
      alt: Solving Linear Equations on Matlab Hero Image
---

In mathematics, equations in the form `Ax=b` are linear algebra equations. In such equations, `A` is a matrix while `x` and `b` are column vectors. A matrix is a two-dimensional arrangement of numbers. 
<!--more-->
Such equations are common in engineering and scientific disciplines. Thus, understanding the setup of these equations and finding solutions to the problems is an essential skill.

Matlab gives a powerful and reliable way to find solutions to these problems. But, we will also realize that the solutions provided are not always what they appear to be. 

In this article, we will learn how to solve these problems using Matlab. It is a matrix laboratory, hence the best environment for solving matrix problems.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.
- Basic understanding of matrix.

### Solving simultaneous equations
We are going to look at how to solve simultaneous equations using Matlab. Simultaneous equations are finite sets of equations for which common solutions are set. 

What we mean is that they are conditions that define the relationship between two unknowns through an equal number of equations. 

We are going to use the matrix method. A matrix is a two-dimensional arrangement of numbers. For example, 

![sample matrix](/engineering-education/solving-linear-equations-using-matlab/linear_seventeen.png)

Defining the matrix is by dimensions `m x n`, where `m` is the number of rows while `n` is the number of columns. A row is a horizontal arrangement, while a column is the vertical arrangement of the numbers. 

If we have a 3x2 matrix, then what that means is that it has 3 rows and 2 columns. These matrices are used compactly to work with linear equations. The different forms of the matrix are;

- **Row vector** are matrices with a single row.
- **Column vector** are matrices with a single column.
- **Square matrices** are matrices where `m=n`, that is, the number of columns equals the number of rows. The basic form of linear equations is;

![lineq](/engineering-education/solving-linear-equations-using-matlab/linear_six.png)
  
Where `A_ij` are the elements of the `MxN` matrix, `X_j` are the elements of Nx1 matrix column vectors, and `b_i` are the elements of the `Mx1` row vector. For example, given a simultaneous equation shown below;

![sample simultaneous equation](/engineering-education/solving-linear-equations-using-matlab/linear_seven.png)

The simplification of this equation is;

![simplified](/engineering-education/solving-linear-equations-using-matlab/linear_eight.png)

For you to solve these simultaneous equations using the matrix method, `m` of the second matrix must equalize `n` of the first matrix after the simplification done above. It is because solving simultaneous equations using Matlab involves the multiplication of the matrix.

These equations are simultaneous because one set of `x_i` must satisfy all the equations of `M`. Assume that you have the value of `A` and `x` to find `b`, then the equation is easy to solve. You apply the matrix multiplication method. The big problem is finding `x` given `A` and `b`; focusing on such problems, we will see how to handle them.

### Matlab's solution
The basic operations that you use to solve these equations in Matlab depend on the variable provided. When;
- `A` and `x` are provided, the solution is `b = A*x`. The `n` of `A` must equal `m` of ` x` for this operation to work.
- `A` and `b` is provided, the solution is `A/b`. Here, `m` of `A`  must equal to `m` of `b`.
Example:

![simultaneous equation](/engineering-education/solving-linear-equations-using-matlab/linear_nine.png)

Below is the first matrix, `A`.

![first matrix](/engineering-education/solving-linear-equations-using-matlab/linear_ten.png)

Below is the second matrix `b`.

![second matrix](/engineering-education/solving-linear-equations-using-matlab/linear_eleven.png)

Now that you have `A` and `b`, we are supposed to find `x`. 

When you have `A` and `b`, we use `x =A\b`. So to get this done, execute the following command in the command window.

```matlab
A = [4 5; 3 -2];
b = [6; 14];
x = A\b
```

We have assigned our matrices to variables `A` and `b` then gave the formulae used to solve the problem. In Matlab, the separation of rows is by semicolons. When you execute the command, the result is displayed as shown below;

```matlab
x =

    3.5652
   -1.6522
```

Matlab provides a solution to linear algebra. But, at some point, it doesn't produce the solution, or the solutions provided are less trustworthy. So, Matlab will give the user a warning at some point, but this happens in rare cases. 

Now, the fault here may not be due to poor syntax or Matlab's fault, but it could be due to the user's failure to understand linear algebra. But don't worry. I am here to show you the causes of such problems and the meaning of the output given by Matlab.

The problem we solved before had two unknowns, `x` and `y`, and since there were two unknowns, the output had a length of two(column vector). There are various types of simultaneous equations:
- Inconsistent equations.
- Undetermined equations.
- Overdetermined equations.

### Inconsistent equations
Inconsistent equations are equations in which `m=n`(number of rows equals the number of columns), but the solution does not exist. In these types of equations, the left sides are equal, but right sides are not e.g

![inconsistent equation](/engineering-education/solving-linear-equations-using-matlab/linear_twelve.png)

What we mean is that for the left side we have `4x+y` for both equation 1 and 2 while for the right side we have 6 and 14 for equation 1 and 2 respectively. It shows that the equations are inconsistent. 

Solving simultaneous is finding the point at which two equations meet when plotted. When you plot these two equations, the lines are parallel.

Let's make a plot to visualize what we are talking about in the above statement. Since we are plotting `x` against `y`, we will first make `y` the subject for each equation then plot. As shown below:

![inconsistent equation](/engineering-education/solving-linear-equations-using-matlab/linear_thirteen.png)

To plot, we give the `x` variables first

```matlab
x = [-10:10];        % x ranges from -10 to 10
y1 = (6 -4*x)/5;     %y variables
y2 = (14 -4*x)/5;
plot(x, y1, x, y2)   %plotting the two equations
legend('y1', 'y2')   %Adding legends to the plot
```

![output](/engineering-education/solving-linear-equations-using-matlab/linear_one.png)

The two lines are parallel. It means that the two lines intersect at infinity. So when you try to get the solution to this problem using Matlab, the output given for the unknowns is `inf`, which means infinity.

```matlab
x =

  -Inf
   Inf
```

### Undetermined equations
These are equations in which `m>n`. It means that the provided information is insufficient to give a solution to the problem example;

4x + 5y =6

Mathematically, the solution is `y = (6-4x)/5`. It means that the `x` value can range from `-inf` to `inf` as long as it works with the provided `y`. If Matlab is used to solve such equations, it will give only one value and the other set to 0. 

```matlab
A = [4 5];
b = 6;
x = A\b
```

The output will be;

```matlab
x =

         0
    1.2000
```

Inadequate information not only occurs in cases where `m=n`, but it can also occur for problems in which `m>n`. It could be due to the redundancy of other equations. e.g

![underdertermined equations](/engineering-education/solving-linear-equations-using-matlab/linear_fourteen.png)

In the above equation, the information is insufficient since equations (i) and (ii) can be generated from equation (i). If you take equation(i) and multiply by 2, we get equation (ii). If you also take equation(i) and divide by -2, we get equation(iii).

### Overdetermined equations
These kind of equations mainly occur when `m>n`. 

Here, the information provided by the equations is too much. The equation `Ax=b` cannot be satisfied simultaneously by any value of the vector `x`. 

When you solve the equation using Matlab, it will give an output, but it does not satisfy the matrix rule `a*x=b`. To understand this, we start by plotting the equations below;

![overdetermined equation](/engineering-education/solving-linear-equations-using-matlab/linear_fifteen.png)

For the first equation, `y1 = -(4x - 6)/5`, plot `y2` and `y1` against `x`.

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

![output two](/engineering-education/solving-linear-equations-using-matlab/linear_two.png)

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

```matlab
ans =

    3.5652
```

This function gives a single output corresponding to the `x` value for the point of intersection. To find  `y`, you can replace `x` in the equation and get your `y`.

The diagram shows that the solution is similar to the one we found before(3.5652,-1.6522). It means that the solution is correct. Now assume that we have the equation below;

![overdetermined equations](/engineering-education/solving-linear-equations-using-matlab/linear_sixteen.png)

Let's plot the line of the three equations. To do that, we add the code below;

```matlab
y3 = 7*x - 25;
hold on
plot(x, y1, x,y2, x, y3)
```

![output](/engineering-education/solving-linear-equations-using-matlab/linear_three.png)

When you execute the above commands, we get a 3rd line(the green line) which is for the third equation. 

Looking at the plots, you may think these three lines intersect at a common point, but this is not the case. To see this, zoom out the plots by clicking on the magnifying lens icon having `+` inside it. 

After clicking it, move to the point at which the lines seems to intersect a few times, and the result will be;

![output](/engineering-education/solving-linear-equations-using-matlab/linear_four.png)

This shows that there is no perfect solution to these problems. Let's try solving it using matlab and plot this output to see the position that matlab gives as the output. This can be done by the code below;

```matlab
A = [4 5; 3 -2; 7 -1];
b = [6; 14;25];
x = A\b;
hold on
plot(x(1),x(2),'k*')
plot(x(1),x(2),'r*')
```

![output](/engineering-education/solving-linear-equations-using-matlab/linear_five.png)

As you can see, Matlab is trying to locate a point close to all three lines, and this is an approximation. You can find the error to the solution by;

```matlab
error = A*x -b
```

Matlab locates this closest point by finding the square root of the sum of squares of elements of the input vector. Locating this point is by use of the `norm` function.

```matlab
norm(error)
```

The output is `0.7941` and is known as `optimum solution in the least square sense`. It is the point at which the `norm(error)` is as small as possible. If we try other points, we get `norm(error)` to be higher than `0.7941`.

### Conclusion
Solving simultaneous equations in Matlab depends on the type of problem that you are handling. 

As a user, you should know the type of equation or problem you are trying to solve. Besides, it will help you know the output you expect from Matlab. What you must know is that Matlab will provide a solution to all these problems. Also, knowing the type of equation helps you avoid errors in linear equations.

That's it. Happy Coding.

---
Peer Review Contributions by: [Espira Marvin](/engineering-education/authors/espira-marvin/)
