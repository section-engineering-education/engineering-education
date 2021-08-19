---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-optimization-in-matlab/
title: Getting Started with Optimization in MATLAB
description: In this article we discuss 
author: florence-atieno
date: 2021-08-20T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  -url: /engineering-education/getting-started-with-optimization-in-matlab/hero.jpg
   alt: MATLAB optimization example image
---


Optimization combines the inputs to achieve the optimum output subject to satisfying certain specified constraints and conditions. It involves choosing the best among given data or combining the inputs to obtain the optimal working condition. It is a mathematical discipline that works to get the maxima and minima. Thus, optimization forms a part of linear programming. 


### Prerequisites
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Introduction

Optimization is applicable in a wide range of fields. It includes the financial sector, transport sector, and many more. Hence, it is an essential tool used in everyday life with it's impact felt by billions of people on a daily basis. This article will look at the basics of optimization and how to apply them in Matlab. We will also look at its application in various fields.

An optimization problem is defined by `df(x)/dx=0`. Finding the minimum point in a curve can be done using a while loop. For example, given a function $y(x)= 2x^2+20x-22$, we find its minimum point using a simple while loop as shown below;

```matlab
clear
clc
x = -20: 0.1: 20;
y = 2.*x.^2 + 20.*x - 22;
plot(x,y)

grid
```

Here we plot the function using the `plot` function as shown above. Then, we use the while loop to iterate over all the data points in the curve. When the current value is larger than the previous value, we identify the point as the minimum of the curve. Once done, we print our output using the `fprintf` function. The command window displays the coordinates of the minimum point.

```Matlab
i = 1;
while (y(i) > y(i + 1))
    i = i + 1;
end

x (i);
y(i)
fprintf('the minimum of the curve is %d and %d\n', x(i), y(i))
```

![plotted function](/engineering-education/getting-started-with-optimization-in-matlab/opt1.png)
![Obtained results](/engineering-education/getting-started-with-optimization-in-matlab/opt2.png)

We can use this method in simple mathematical functions, but you will use the Matlab In-built functions for complex equations. The in-built functions used in optimization using Matlab are such as;
`fminbnd()` is for finding the minimum of single-varied functions on a fixed interval. It means for single variable functions, we `fminbnd` function.
- `fminsearch()`-This function is similar to `fminbnd()` except that it handles functions of more variables.

We will now use the `fminbnd()` function in the previous mathematical function to get its minimum point. To get more information about the in-built function, we will type help `fminbnd,` and then Matlab will give us the essential information. In this case, we will first create a script where we will define our function.

> Note that the function name and the script's name should be the same, and when naming this script, consider this. 
```Matlab
function f = mysimplefunc(x)

f = 2.*x.^2 + 20.*x - 22;
```
In this case, `mysimplefunc` is the name of the defined function in the script. It means that the name of our script should be `mysimplefunc.m`. `f` is the function variable. The name of the scripted and defined function should be the same. This script is where the function in which we want to obtain its minimum point is defined. We will then create another script to define the variable and then call our function here. The code in this script should be as follows;
```Matlab
x = -20:0.1:20;       % The x values

f = mysimplefunc(x);   % The values of f from the function we created.

plot(x,f) 
```
The code above plots our function; with the `f` values used as the y-axis, we use the `fminbnd` function to obtain our minimum point.

```Matlab

xmin = fminbnd(@mysimplefunc, -20, 20);

ymin = mysimplefunc(xmin);
```
When using the `fmibnd` function, we give it the inputs, `mysimplefunc` and the minimum and maximum values of `x` in that order. After obtaining the minimum point in the x-axis, we can get the minimum `y` by referring to the `x`'s minimum value. We then display the result, or we can check them in the workspace.
```Matlab
disp(xmin)
disp(ymin)
```
We obtain a similar result when we execute the code above since we used the same function as before.

### Example 2
Now let's introduce a more complex function and find its lowest point. In this example, we have a function $ f(x)=x^3-4x $ to use. We will first plot this function and then find its lowest point of the function. Just as before, we will use the `fminbnd` function to find these values. Just as before, we will create a script function `mysimplefunc.m` to define our mathematical function and then call our script to define that minimum point. The script function code is as follows;
```Matlab
function f = mysimplefunc(x)

f = x.^3 - 4*x;
```
We will call this script function which contains our mathematical function in our script, plot the mathematical function and obtain the minimum point as follows;
```Matlab
x = -3:0.1:3;

f = mysimplefunc(x);

plot(x,f)

xmin = fminbnd(@mysimplefunc, -3, 3);

ymin = mysimplefunc(xmin);

disp(xmin)
disp(ymin)
```
When we run our code, the result is as follows;
![plot of the function](/engineering-education/getting-started-with-optimization-in-matlab/opt3.png)
![minimum point](/engineering-education/getting-started-with-optimization-in-matlab/opt4.png)

### Rosenbrock's banana function
It is a function that is a famous test case for optimization software. Given a function $f(x,y) = (1-x)^2 + 100(y-x^2)^2$, this function is known as Rosenbrock's banana function. We will first plot this function and then find its minimum point. In this case, we have two variables in our function, i.e., `x` and `y`, we cannot use the previous `fminbnd` function, but instead, we will use the `fminsearch` function to obtain this.
> Note that the `fminbnd` function can only handle one variable while `fminsearch` can take more than one variable. 
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
surf(x,y,f)    %use surf function to plot the surf of the function, but in this case, we color the plotting
shading interp;
colormap (hot);     %used to color the plot
```
![plot of the banana function](/engineering-education/getting-started-with-optimization-in-matlab/opt5.png)

We will use the `fminsearch` function to find the minimum of our given mathematical function. We will first create a function script in which we will define our function as shown below;

```matlab
function f = bananafunc(x)

f = (1-x(1)).^2 + 100.*(x(2)-x(1).^2).^2;
```
In the previous example, we used `x` and `y`, but we need to use vectors instead for this case. It is why instead of `x`, we use the first values of `x`, that is, `x(1)` and `x(2)`, for the `y` value in our function. We will then execute the `fminsearch` in the command window to find this point. The code will be;
```Matlab
[x, fval] = fminsearch(@bananafunc, [-1.2; 1])  %fval is the f function values.
```
Note that you first run your function script before executing the above command in the command window.
![minimum point of banana function](/engineering-education/getting-started-with-optimization-in-matlab/opt6.png)

In our result, we see that `x` has two values. The first value is the `x` value, and the second is the `y` value. `fval` is the `z` value.

### Conclusion
Optimization is an essential tool in the science and engineering section. It is applicable in a wide area such as model-based design and also machine learning and data analysis. Matlab is an excellent language for optimization. As you can see above, the in-built functions make it so easy to carry out this optimization. Moreover, the code is easy to understand and use. Therefore, it makes it a suitable tool for working out this problem.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)



---

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
