---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-optimization-in-matlab/
title: Getting Started With Optimization in MATLAB
description: This article will look at the basics of optimization and how to apply them in Matlab. We will also look at its application in various fields. 
author: florence-atieno
date: 2021-08-23T00:00:00-12:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-optimization-in-matlab/hero.jpg
    alt: MATLAB optimization example image
---
Optimization refers to combining inputs to achieve the optimum output subject to satisfying certain specified constraints and conditions. It involves choosing the best among given data using given criteria or combining the inputs to obtain the optimal working condition.
<!--more-->
It is a mathematical discipline that works to get the maxima and minima. Thus, optimization forms a part of linear programming.

Optimization problems generally maximize or minimize a real function. They do this by systematically choosing input values from within an allowed set and computing the value of the function.

### Prerequisites
To follow through this article, you need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Introduction
Optimization problems of all sorts occur in all quantitative disciplines such as computer science, engineering, and economics. Hence, it is an essential tool used in everyday life, with its impact felt by billions of people daily.

This article will look at the basics of optimization and how to apply them in Matlab. We will also look at its application in various fields.

An optimization problem is defined by `df(x)/dx=0`. Finding the minimum point in a curve can be done using a while loop.

For example, given a function `y(x)= 2x^2+20x-22`, you can find it's minimum point using a while loop as shown below:

```matlab
clear
clc
x = -20: 0.1: 20;                  %x values
y = 2.*x.^2 + 20.*x - 22;          % the function
plot(x,y)                          %plotting the output

grid
```

Here, we plot the equation using the `plot` function as shown above. Then use the while loop to iterate over all the data points in the curve. The point at which the current value is larger than the previous value is identified as the curve's minimum.

Once done, the output is printed using the `fprintf` function. This printed output is the minimum point of our function.

```Matlab
i = 1;                    %initializing i to 1.
while (y(i) > y(i + 1))    % when the initial i is greater than i+1
    i = i + 1;             % The new value of i
end

x (i);                        % x position of i
y(i)                          % y position of i
fprintf('the minimum of the curve is %d and %d\n', x(i), y(i))
```

![plotted function](/engineering-education/getting-started-with-optimization-in-matlab/opt1.png)

![Obtained results](/engineering-education/getting-started-with-optimization-in-matlab/opt2.png)

The `while` loop method is used in simple mathematical functions. For complex equations, we use Matlab in-built functions. The in-built functions used in optimization in Matlab are as follows:

- `fminbnd()` - is for finding the minimum of single-varied functions on a fixed interval. Single-varied functions are functions with one variable.
- `fminsearch()`- This function is similar to `fminbnd()` except that it handles functions with more than one variable.

Let us apply the `fminbnd` function in the mathematical equation we used in the `while` loop method earlier. To get more information about the in-built function, type `help fminbnd` in the command window.

Matlab displays the details about it in the command window. But, first create a script where you define your functions.

> Note that the function name and the script's name should be the same.

```Matlab
function f = mysimplefunc(x)

f = 2.*x.^2 + 20.*x - 22;
```

In this case, `mysimplefunc` is the name of the defined function in the script. It means that the name of our script should be `mysimplefunc.m`. `f` is the function variable. In this script, you define how you are the finding the minimum point.

Now create another script to define the variable and call the `mysimplefunc` function here. The code in this script should be as follows:

```Matlab
x = -20:0.1:20;       % The x values

f = mysimplefunc(x);   % The values of f mysimplefunc.m function we created.

plot(x,f)
```

The code above plots the function; with the `f` values used as the y-axis. Use the `fminbnd` function to obtain the minimum point.

```Matlab
xmin = fminbnd(@mysimplefunc, -20, 20);

ymin = mysimplefunc(xmin);
```

When using the `fmibnd` function, give it the inputs, `@mysimplefunc` and the range of `x-axis` minimum and maximum values respectively.

After obtaining the minimum point in the x-axis, Matlab gets the minimum `y` by referring to the `x` minimum value.

We ask Matlab to display the results using the `disp` function:

```Matlab
disp(xmin)
disp(ymin)
```

Matlab gets a similar result as that obtained when using the `while` loop method. So again, the equation that we are finding its minimum point is similar for both methods.

### Example 2
Now let's introduce a more complex equation and find its lowest point.

In this example, `f(x)=x^3-4x` is the function. The first step is plotting this function and then finding its lowest point.

Now, use the `fminbnd` function to see how it applies in these complex equations.

Create a script function `mysimplefunc.m` to define the mathematical equation.

The script function code is shown below:

```Matlab
function f = mysimplefunc(x)

f = x.^3 - 4*x;
```

Create another script and call the `mysimplefunc` function; which contains our mathematical equation in this new script.

Plot the mathematical function and obtain Its minimum point as follows:

```Matlab
x = -3:0.1:3;

f = mysimplefunc(x);

plot(x,f)

xmin = fminbnd(@mysimplefunc, -3, 3);

ymin = mysimplefunc(xmin);

disp(xmin)
disp(ymin)
```

After running the code, the result should be as follows:

![plot of the function](/engineering-education/getting-started-with-optimization-in-matlab/opt3.png)

![minimum point](/engineering-education/getting-started-with-optimization-in-matlab/opt4.png)

### Rosenbrock's banana function
It is a function that is a famous test case for optimization software.

Given a function `f(x,y) = (1-x)^2 + 100(y-x^2)^2` (Rosenbrock's banana function), we first plot this function and then find its minimum point. In this case, we have two variables in our function, i.e. `x` and `y`.

You cannot use the previous `fminbnd` function, but instead, use the `fminsearch` function to obtain this.

> Note that the `fminbnd` function can only handle one variable while `fminsearch` can take more than one variable. The first step is always plotting your function. For the `Rosenbrock's banana function`, plot the surf and mesh plots of it.

```Matlab
clear
clc

[x,y] = meshgrid(-2:0.1:2, -1:0.1:3);

f = (1-x).^2 + 100.*(y-x.^2).^2;  % our defined function

figure(1)
surf(x,y,f) %use surf function to plot the surf of the function

figure(2)
mesh(x,y,f)   %use mesh function to plot the surf of the function

figure(3)
surf(x,y,f)    %use surf function to plot the surf of the function, but in this case, color the plotting
shading interp;
colormap (hot);     %used to color the plot
```

![plot of the banana function](/engineering-education/getting-started-with-optimization-in-matlab/opt5.png)

Use the `fminsearch` function to find the minimum of the given mathematical function.

Once done, create a function script to define the function:

```Matlab
function f = bananafunc(x)

f = (1-x(1)).^2 + 100.*(x(2)-x(1).^2).^2;
```

In the previous example, `x` and `y` were the variables, but we use vectors instead for this case. This is why we replace `x` with the first value of `x`, which is `x(1)` and `x(2)` for `y`.

Now execute the `fminsearch` in the command window to find this point. The code will be as shown below:

```Matlab
[x, fval] = fminsearch(@bananafunc, [-1.2; 1])  %fval is the f function values.
```

Note that you first run your function script before executing the above command in the command window.

![minimum point of banana function](/engineering-education/getting-started-with-optimization-in-matlab/opt6.png)

In our result, `x` has two values. The first value is the `x` value, and the second is the `y` value. `fval` is the `z` value.

### Conclusion
Optimization is an essential tool in the science and engineering section. It is applicable in a wide area such as model-based design, machine learning, and data analysis.

Matlab is an excellent language for optimization. As we see above, the in-built functions make it so easy to carry out this optimization.

Moreover, the code is easy to understand and use. This makes it a suitable tool for working out this problem.

```html
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
```

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
