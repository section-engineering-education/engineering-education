---
layout: engineering-education
status: publish
published: true
url: /how-to-solve-discrete-logistic-equation-in-matlab/
title: How to Solve a Discrete Logistic Equation in Matlab
description: In this tutorial, the reader will understand all about the logistic equation. The reader will also learn how to solve a problem using the logistic equation in Matlab.
author: peter-adongo
date: 2021-09-14T00:00:00-00:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-solve-discrete-logistic-equation-in-matlab/hero.jpg
    alt: Logistic Equation Image Example
---
The logistic equation is a population growth model in which the resources and space are limited. Therefore, the logistic model is a model that factors in the carrying capacity.
<!--more-->
The carrying capacity is the maximum number of populations that an environment can support without the available resources getting exhausted.

The objective of this model is to find the maximum population that a given environment can support.

The ecology sector uses this equation to model the population growth as they assume the reproduction rate to be directly proportional to the current population and the resources available.

It can also determine the various factors that affect the population growth in a given niche. The good news is that you can program these logistic problems.

In this article, we will look at how to use Matlab to solve these logistic problems.

### Prerequisites
To follow through this article, you need to have:
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

#### Overview of the logistic equation
The logistic model gets its base on the mathematical equation below:

```bash
\begin{cases} X_{t+1} = X_t + KX_t(1-X_t/C)\\X_0 = 10 \end{cases}
```

Where:

K = growth rate.

C = Carrying capacity.

X_n = The population at a given time.

n = Time.

The logistic equation is a more realistic model for population growth. This means that the logistic model looks at the population of any set of organisms at a given time.

In addition, the logistic model is a model that factors in the carrying capacity. Carrying capacity is the maximum number of individuals that an environment can support.

The exponential model `$A=Ke^{rt}$` assumes an infinite amount of space and resources.

Let's say, for example, we have a number of rabbits on a given island. The exponential model assumes that it does not matter how many rabbits are on the island; there will always be enough food and space.

It means that the rabbit population will grow with no limit as time goes.

Basically, in the real world, the rabbit population will grow, but it will reach a point in which the rabbits run out of resources or space.

When this happens, they don't grow anymore; they start to level off. This makes the logistic model a little more realistic.

#### Matlab code
We create a function that will help us calculate the logistic equations:

```Matlab
function logistic_Model
```

We then define the parameters. In this case, our parameters are, `k` and `c`:

```matlab
% Parameters
k = 0.5;    % growth rate
c = 250;    % Carrying capacity
```

The next thing that we need to do is to use our initial condition. In the equation of the model, we have `x0=10`; which is the initial value of our growth rate. 

We are going to define this in our code.

Note that you can change the parameters and the initial value at any time, depending on what you are handling.

```Matlab
x0 = 10;
```

The next thing that we can define is the time information.

For these discrete equations, we know that time steps forward from 1,2,3,4, e.t.c. It means that we need to tell Matlab the last iteration number we want.

```Matlab
% Time information
N_end = 100;     %number of iterations
```

We are almost at the point at which we've done all the back work. We have set the parameters, initial values, and time information.

It means we will go ahead and iterate for the solutions. We will do this by storing our iteration values in a vector.

This is because they are immensely important when counting. So, if we have our vector of solutions values, we will make the first value in that vector our initial value.

The other thing to note is that Matlab starts indexing at one. It means we will be a bit off in the way in which we are thinking of our initial value.

Remember, our initial value is `10`. So, we will assign this value to be our first index:

```matlab
%store the initial value solution in a vector
x(1) = x0;
for n = 1:1:N_end-1
x(n+1) = x(n) + k*x(n)*(1-x(n)/c);
end
```

In the above code, the index `n` will be counting for us every time we go through the loop. In writing the iterations, we consider our equation and update the `x`.

This `for` gives a new solution every time we go through the `for` loop.

We will now plot our solution to visualize it. We will plot it against the time information.

```Matlab
nvec = 1:1:N_end;    %stores n values
```

This value generates values from 1 to N_end with a space of one and stores them in the `nvec` variable. We plot the solution against `nvec` as shown below:

```Matlab
plot(nvec,x);
hold on
```

The primary function of the `hold on` is to add more solutions to the same plot.

For example, if this was a coupled system where we had `x`, `y`, and `z`, you can keep on adding these `hold on`; so that the solution for `x` will be plotted on the same plot as the solution for `y` and `z`.

For proper understanding and easy use of the code, the general code for the logistic equation will be as follows:

```Matlab
function logistic_Model

%------------------------------------------
% Parameters
k = 0.5;        %growth rate
c = 250;        % Carrying capacity

%-------------------------------------------
x0 = 10;         %Initial value

%------------------------------------------
% Time information
N_end = 100;     %number of iterations

%------------------------------------------
%Store initial value in the solution vector
x(1) = x0;    %First entry in solution vector is initial value
               %Matlab starts indexing vectors at 1.
%-------------------------------------------
%iterate to get solution values!!
for n = 1:1:N_end-1
    x(n+1) = x(n) + k*x(n)*(1-x(n)/c);
end

%-------------------------------------------
%plot
%         -> Solutions is stored in x
%          -> Plot against time n
nvec = 1:1:N_end;    %stores n values to plot against

plot(nvec,x);
hold on
```

![logistic model](/engineering-education/how-to-solve-discrete-logistic-equation-in-matlab/logistic_one.png)

From the output, we see the population grows to a given level where it is constant. This point is the **carrying capacity**.

When the population rises past this point, the resources will be limited. When the resources are limited, the organisms begin to die, and the population starts to decline.

### Conclusion
The logistic model can be used to estimate the carrying capacity of a given niche. It helps implement various factors that can help maintain the population growth rate in relation to the carrying capacity.

This helps manage the available resources in the environment. This model is widely applicable in the ecology sector. Programming these models is easier using Matlab's in-built functions; as we have seen.

I hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
