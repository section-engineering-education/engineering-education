---
layout: engineering-education
status: publish
published: true
url: /how-to-solve-initial-value-problem-using-ode45-in-matlab/
title: How to Solve Initial Value Problem (IVP) using ODE45 in Matlab
description: This article will consider the Matlab algorithm `ode45` to solve the initial value problem. Matlab uses the ode45 function as the standard solver for ordinary differential equations of fifth-order (ode45)
author: joseph-odhiambo
date: 2021-09-30T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-solve-initial-value-problem-using-ode45-in-matlab/hero.jpg
    alt: MATLAB solve Initial Value Problem example image
---
Matlab uses the `ode45` function as the standard solver for ordinary differential equations of fifth-order (ode45). The `ode45` function applies Runge-Kutta formulae with the time step variable for easy computation. 
<!--more-->
### Introduction
`ode45` is used to solve equations of the form:

$
dx/dt = f(t,x), x(t0) = x0          equation 1
$

Here, `t` is the independent variable, `x` is a vector of dependent variables to be found, and f (t, x) is a function of t and x. You define this equation when the function's `x` is pre-determined, and the initial conditions, `x = x0` at the time `t0`, are given.

This article will consider the Matlab algorithm `ode45` to solve the initial value problem (IVP). IVP is an ordinary differential equation (ODE) together with some initial value(s). 

Here you have a differential equation describing the dynamics of how something is changing, but you know where to start. The initial value tells you where to start, but the differential equation tells you where to go next. `ode45` is a work course in Matlab, and it's the first algorithm you go to solve ode problems.

To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](/engineering-education/getting-started-with-matlab/) basics.

### Overview of Runge Kutta 4 method
In Runge Kutta 4 method, we obtain the solution of `y_i` at various values of `t_i` between the range `t_0` and `t_n`. The intermediate value at which the computations are done is calculated internally by the ODE45. 

ODE45 uses the adaptive step size Runge Kutta 4 method. It indicates that step size `H` is a varying value. 

What this means is that you first determine the step size. Step size is the distance between the current value and the subsequent initial value. 

Here, you have to know the initial value of your function. It is to get the solution to your differential equation. The basic formula of the Runge Kutta 4 method is given by:

$
y_{i+1} = (y_i + \frac{1}{6}(k_1 + 2K_2 + 2K_3 + k_4)
$
 
Where:
$k_1=f(x_i,y_i)$
$k_2=f(x_i + \frac{h}{2},y_i + \frac{k_1}{2})$
$k_3=f(x_i + \frac{h}{2},y_i + \frac{k_2}{2})$
$k_4=f(x_i + h,y_i + k_3)$
  
`f` is the function, and `h` is the step size. This method is a bit more complicated, to understand more about it; you can refer [here](https://lpsa.swarthmore.edu/NumInt/NumIntFourth.html)

### ODE45
In ODE45, the step size is not pre-determined, but at each step, it calculates the optimum size to reduce the error. In order to get the error among the tolerance that we have defined. 

>Note that for all the ODE solvers in Matlab, the variable step size for an adaptive step size is where Matlab decides the step size internally. It is to get errors within the required tolerance interval.

The basic Matlab syntax for ode45 is:

```matlab
[tsol, ysol]=ode45(@(t,y) fname(t,y), [t0, t_end], y0)
```

Where:
`tsol`, `ysol` are solution vectors; Matlab returns `ysol` for each time `tsol`.
`fname`: Function that returns `dy = f(t,y)`.
`t0`, `y0`: Initial condition representing `y(t0)=y0`.
`t_end`: Final value until the solution is desired.

To understand our syntax, lets say you are given a function $\frac{dy}{dt}=f(t,y)$ and the initial condition as `y(t0)=y0`.

In this case, the `F` is the function for both `t` and `y`, which we must provide. This function takes in two variables, that is, the independent variable `t` and dependent variable `y` and returns a vector $\frac{dy}{dt}$. 

Since we want to look at the single variable equations, the output $\frac{dy}{dt}$ will be a scalar. Single variables are equations with single variables.

ODE45 gives `t` and `y` as the arguments passed on to the function `fname`. Thus, we pass the initial conditions `t0`, `t_end` and the initial solution `y0` to the function.

We now want to see how this works given an equation $\frac{dy}{dt}=-2 * t * y$

### Matlab code
We first define the initial conditions.

```matlab
%solving ODE-IVP using matlab's ODE45
t0=0;    
y0=1;
tEnd=5;
```

We will now consider our ODE syntax.

```Matlab
%solving using ODE45
[tsol, ysol]=ode45(@(t,y) firstODEfun(t,y), [t0 tEnd], y0);
```

`t` and `y` are the variables passed to the function `ode45` and then call the function `firstODEfun`. 

Note, the arrangement of `t` and `y` is essential. The `t` must come first, followed by `y`. 

After this, we need to define our function `firstODEfun`. It should be on a separate script. The code below defines our function.

```matlab
function dy = firstODEfun(t,y)
dy= -2*t*y;
```

The `dy` is the defined function.

```Matlab
plot(tsol, ysol)
```

Now we save this script and plot the output of our function.

![our function plot](/engineering-education/how-to-solve-initial-value-problem-using-ode45-in-matlab/ode-one.png)

### Common errors when doing IVP
Let's make a small mistake in the `firstODEfun` by renaming the `t` in the `dy` function as `t1`. Then, when we run our program, we get an error, as displayed in the command window.

![error defination](/engineering-education/how-to-solve-initial-value-problem-using-ode45-in-matlab/ode-two.png)

The error indicates that the `t1` is undefined since the input variable was `t`. Keep in mind that our `t` and `y` are dummy variables. It means that they don't have any specification name, but you can use any name. 

The only thing that you should note is to use a similar name for the input, and in the definition, your function `dy`. Then, it won't be a problem. Also, as you use a different name, the order of the variable must remain, independent variable followed by the independent.

### Plug flow reactor (PFR)
Plug flow reactor, also known as tabular reactor, consists of a cylindrical pipe with an opening on each end for the reactor and products to flow through. Consumption of reactors is continuous as they flow down the length of the reactors. It means that as the reaction continues, the products increases.

You can figure the plug flow reactor as one long tube or several short tubes. They have different diameters. Determining the diameter to use is based on construction cost, pumping cost, and the heat transfer needed. Their application is used widely in gas or liquid systems. 

When modelling the PFR, you take an increment of the reactor when balancing the chemical equation occurring in the reactor and integrate the holdings. This is because it is a distributed parameter system. 

Holdings are the values used to balance the equation. Now, after balancing the equation and integrating the holding, you end up with the below equation.

$
-qdc = -rAdz  (equation1)
$

Where:
q = is the flow rate.
dc = is the change in the concentration.
r = is the flow rate.
z = length of the reactor.
A = is the crossectional area of the reactor.

Since we assume that this is a first-order reaction, the kinetics will be:

$
r = kc = k_oexp(-\frac{E}{RT})c  (equation2)
$

>Note that in equation2 above, `k` takes the initial form `ko`. Now, when we plug the equation2 into equation1, we end up with: 

$
\frac{dc}{dz}=\frac{k_0exp(-\frac{E}{RT}}{q})c
$

This is how to calculate the concentration profile in the reactor. To dive more into this, you can check [this article](http://matlab.cheme.cmu.edu/2011/11/17/modeling-a-transient-plug-flow-reactor/) out.

Now, let's look for an example to solve the plug flow reactor equation using Matlab.

### Example
The concentration along a PFR is given by:

$-\frac{1}{2}C^{1.25}$

With C(0)=1 and `C` is the concentration, and `V` is the volume.

Solve to find C for reactors volume of 1, 5, and 10 litres.

To solve this, we first define the variables.

```Matlab
%solve plug flow reactor simulation
C0=1;     %initial concentration
V0=0;     %Initial volumes
V_end = [1, 5, 10];   %volumes to find concentration
```

After defining our variables, we need to start solving the problem. We will now call the in-built function `VSpan`.

```matlab
VSpan = [V0, V_end];
```

`VSpan` integrates the differential equation y'=f(t,y) system from initial time `t0` to time `t_end` with the initial condition `V0`. 

We use the `VSpan` function to obtain the solution at specific times. We then introduce the `ode` function.

```Matlab
%solving using ode45
[Vsol, Csol] = ode45(@(V,C) pfrFun(V,C), VSpan, C0);
```

In this case, `V` is the independent variable and `C` the dependent variable. It gives a column vector for the solutions.

Let's now define our `pfrFun`. Definitions of this function should be in a different script. Defining the function is done by the code below. It is just the problem function given. 

```matlab
function dC = pfrFun(V,C)
dC=-0.5*C^1.25;
```

When we run our script, we obtain the solutions. The solutions are in the workspace, but you can execute `Vsol` and `Csol` to see them in the command window. 

The solutions are as shown below:

![Solution](/engineering-education/how-to-solve-initial-value-problem-using-ode45-in-matlab/ode-three.png)

>Note that the solution in the `V` column vector corresponds to the equivalent position in the `C` column vector. It means that for the initial volume 0, the concentration is 1, and for volume 1, the concentration is 0.6243, and so forth.

### Conclusion
Solving the initial value problem in Matlab using the ode45 method is made easy in Matlab. It is because Matlab has an in-built function, `ode45`. It is a solver in Matlab that helped to solve ode problems. 

Using this function is easy, you just need to call the function, and the problem is solved. Also, the ode syntax for solving the initial problem in Matlab simple to follow. Since Matlab can also be used to PFR problems using the `ode45` solver, this becomes an added advantage.

Happy coding!

---

Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

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
