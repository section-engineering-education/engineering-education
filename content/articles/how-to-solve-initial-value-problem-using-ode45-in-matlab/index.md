### How to solve initial value problem(IVP) using ODE45 in Matlab
### Introduction

MATLAB’s uses the `ode45` function as the standard solver for ordinary differential equations. The `ode45` function applies Runga-Kutta formulae with the time step variable for easy computation. `ode45` is meant to solve the equation of the general form shown below;

dx/dt = f(t,x), x(t0) = xo

Here, `t` is the independent variable, `x` is a vector of dependent variables to be found, and f (t, x) is a function of t and x. The mathematical equation is defined when the `x` of functions on the right-hand side of Eq. (1), f (t, x), is pre-determined, and the initial conditions, x = x0 at time t0, are given.

In this article, we will consider the Matlab algorithm `ode45` to solve the IVP. IVP is an ODE together with some initial value(s). Here you have a differential equation describing the dynamics of how something is changing, but you know where to start. The initial value tells you where to start, but the differential equation tells you where to go next. `ode45` is a work course in Matlab, and it's the first algorithm you go to solve ode problems.

To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

In Runga Kutta 4 method, we obtain the solution of $y_i$ at various values of $t_i$ between the range $t_0$ and $t_n$. The intermediate value at which the computations are done is calculated internally by the ODE45. ODE45 uses adaptive step size Runga Kutta 4 method. This indicates that stepsize `H` is a varying value. It means that you have to define the stepsize.  Step size is the distance between the current value and the subsequent initial value.

In ODE45, the step size is not pre-determined, but at each step, it calculates the optimum size to reduce the error and get the error among the tolerance that we have defined. Note that for all the ODE solvers in Matlab, the variable step size for an adaptive step size is where Matlab decides the step size internally. It is to get errors within the required tolerance interval.

### ODE45 syntax

Typical use of ode45

```matlab
[tsol, ysol]=ode45(@(t,y) fname(t,y), [t0, t_end], y0)
```

Where;
`tsol`, `ysol` are solution vectors; Matlab returns `ysol` for each time `tsol`.
`fname`: Function that returns `dy = f(t,y)`.
`t0`, `y0`: Initial condition representing `y(t0)=y0`.
`t_end`:Final value until which the solution is desired.

To understand our syntax, lets say you are given a function $\frac{dy}{dt}=f(t,y)$ and the initial condition as y(t0)=y0.

In this case, the `F` is the function for both *t* and *y*, which we must provide. This function takes in two variables, that is, the independent variable `t` and dependent variable `y` and returns a vector $\frac{dy}{dt}$. Since we want to look at the single variable equations, the output $\frac{dy}{dt}$ will be a scalar. Single variables are equations with single variables.

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

`t` and `y` are the variables passed to the function `ode45` and then call the function `firstODEfun`. Note, the arrangement of `t` and `y` is essential. It has to be `t` and then `y` not the other way round. It is a mistake commonly made by many students. After this, we need to define our function `firstODEfun`. It should be on a separate script. The code below defines our function.

```matlab
function dy = firstODEfun(t,y)
dy= -2*t*y;
```

The `dy` is the defined function.

```Matlab
plot(tsol, ysol)
```

Now we save this script and plot the output of our function.

![our function plot](ode_one.png)

### Common errors when doing IVP

Let's make a small mistake in the `firstODEfun` by renaming the `t` in the `dy` function as `t1`. Then, when we run our program, we get an error, as displayed in the command window.

![error defination](ode_two.png)

The error indicates that the `t1` is undefined since the input variable was `t`. Keep in mind that our `t` and `y` are dummy variables. It means that they don't have any specification name, but you can use any name. The only thing that you should note is to use a similar name for the input and, in the definition, your function `dy`. Then, it won't be a problem. Also, as you use a different name, the order of the variable must remain, independent variable followed by the independent.

### Plug flow reactor(PFR)

Plug flow reactor, also known as tabular reactor, consists of a cylindrical pipe with an opening on each end for the reactor and products to flow through. Consumption of reactors is continuous as they flow down the length of the reactors. It means that as the reaction continues, the products increases.

The plug flow reactor may be figured as one long tube or several short tubes. They range in diameter from few centimetres to several meters. The choice of diameter is based on the construction cost, pumping cost, and heat transfer needed. They have a wide variety of applications in either gas or liquid phase systems.

Now, let's look for an example of solving the plug flow reactor equation using Matlab.

### Example

The concentration along a PFR is given by;

$
\frac{dc}{dv}=-\frac{1}{2}C^{1.25}
$

With C(0)=1 and 
`C` is the concentration, and `V` is the volume.

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

`VSpan` integrates the differential equation y'=f(t,y) system from initial time `t0` to time `t_end` with the initial condition `V0`. We use the `VSpan` function to obtain the solution at specific times. We then introduce the `ode` function.
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

When we run our script, we obtain the solutions. The solutions are in the workspace, but you can execute `Vsol` and `Csol` to see them in the command window. The solutions are as shown below;

![Solution](ode_three.png)

Note that the solution in the `V` column vector corresponds to the equivalent position in the `C` column vector. It means that for the initial volume 0, the concentration is 1, and for volume 1, the concentration is 0.6243, and so forth.

### Conclusion

Solving the initial value problem in Matlab using the ode45 method is made easy in Matlab. It is because Matlab has an in-built function, `ode45`. It is a solver in Matlab that helped to solve ode problems. Using this function is easy as you just need to call the function, and the problem is solved. Also, the ode syntax for solving the initial problem in Matlab is so easy. The other advantage is that you can use this ode function to solve the PFR problems.

Happy coding!
