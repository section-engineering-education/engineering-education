---
layout: engineering-education
status: publish
published: true
url: /implementing-shooting-method-in-matlab/
title: Implementing shooting method in Matlab
description: This tutorial walks the reader through the concepts of Matlab shooting methods.
author: atieno-dorine
date: 2021-09-17T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-shooting-method-in-matlab/hero.jpg
    alt: shooting method Matlab
---

In numerical analysis, the shooting method reduces a boundary value problem to an initial value problem. It is a popular method for the solution of two-point boundary value problems. 
<!--more-->
If the problem is first defined by *y=f(x); y(x0)=a* and *$y(X_1)$*, it is transformed into the initial problem *y' =z(x)* and *z'(x) = f(x)* with some initial values. 

Since this method is a two-point boundary value problem, then it has two initial values. 

In the shooting method, one of the initial values is not known. This value is guessed and compared to the known solution at the boundary conditions until the target thus shooting method. 

This article contains the construction of the shooting method code for a linear BVP. We will look at recognizing the boundary value problem and formulate the BVP as an equivalent system of IVP.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Overview
Higher-order ODE's are written as;

$
\frac{d^n y}{dt^n}= f(t,y,\frac{dy}{dt},\frac{d^2}{dt^2},---,\frac{d^{n-1}y}{dt^{n-1}})
$

From the above equation, nth order ODEs will require *n* conditions for a unique solution. In the initial value problem, the conditions of the solution function `y` and all its derivatives up to the `N-1`. All at some initial value t=t0. The expression for the equation is;

$
y(t0),\frac{dy}{dt}|_{t=t0}\mathrm({,---,\frac{d^{n-1}y}{dt^{n-1}}})\mathrm{}|_{t=t0}
$

So if we know everything at the initial value, we would step the integration forward in time. 
The formulation of boundary value problems is different. It might be the same differential equation but what is different is that we know `y` at maybe two different time values, y(t0), y(t1).

### Why do we need a different strategy for the boundary value problem(BVP)?
Well, thinking about the second-order initial value, there are two basic approaches: Runga Kutta 4 and the multistep method. Both approaches require that we know the solution's value (s) at `t=t0` and step forward in time using the ODE function f(t,y). 

Now, this is not the case with BVP. It is because we don't know the condition at the first point of integration. There are two basic approaches to BVPs, that is;
- Shooting method
- Finite difference method

### Shooting method concept
The basic idea of the shooting method is that we take the second-order ODE and write it as a system of the first-order ODE. This system is known as equivalent IVP.

$
\frac{d^n y}{dt^n}= f(x,y,\frac{dy}{dx})
$

The two first-order ODE of this system will be;

$
\frac{d^n y}{dt^n}= f(x,y_1,y_2)
$ or $
\frac{d^n y}{dt^n}= f(x,y_1,y_2)
$

At `x = 0`, `$y_1=y_0$` and at `x =0`, `$y_2=\frac{dy}{dx}|_{x=0}$`

Now in this situation, we don't know one of the initial conditions, i.e, between y0 and $\frac{dy}{dx}|_{t=0}$, one value is not known. Therefore, we will guess the unknown initial condition in the shooting method and use the IVP solver. 

For example, we can guess $\frac{dy}{dt}|_{t=0}$, run the integration, and land into a different point which is not the target boundary condition as demonstrated below.

![demonstration](/engineering-education/implementing-shooting-method-in-matlab/shooting_one.png)

This way, it is called the shooting method. First, we aim the solution at the target and then use the IVP solver such as ODE45 to integrate the solution forward and see if we will hit the target. 

The next step in the shooting method is coming up with an intelligent way to keep improving our guesses to hit that target.

### Shooting method algorithm
It is the combination of all that we have been doing;
1. Convert the BVP into equivalent IVP.
2. Guess the value for the undefined `y0` initial condition.
3. Change guess until the final solution satisfies the end boundary condition i.e., $y(end)=BC_2$(boundary condition 2)

>For linear ODEs, we can use the linear interpolation requiring only two shots.
We do the first and second shots with a different guess and interpolate between the two shots for the correct guess.

![demonstration](/engineering-education/implementing-shooting-method-in-matlab/shooting_two.png)

### Example implementation of the shooting method
The ODE governing the deflection of a supported beam with a constant distributed load is:

$
EI\frac{d^2}{dx^2}=\frac{wlx}{2}-\frac{wx}{2}
$

With the boundary conditions *y(0)=y(l)=0*. Determine y(x) if E=200Gp, $I=3000cm^4$, w=kN/m, and l=3m.

![Question](/engineering-education/implementing-shooting-method-in-matlab/shooting_three.png)

Where:

```bash
EI=flexual rigidity
w = Magnitude of the equally distributed load
l=length
```

We will look at how to solve this problem using Matlab. We first define our variables.

```Matlab
%Shooting method example for linear BVP
E = 200*10^9;      %Pa
I = 30000*(1/100)^4;     %m4
w = 15000;             %N/m
L = 3;               %m
```

This is followed by definning the linear differential equation

```matlab
yp = @(x,y) [y(2); 1/(E*I)*((w*L*x/2)-(w*x^2)/2)];
```

The above is our $\frac{dy}{dx}$ function. Just like we have been using our IVP, we've written the differential equation as a system of two. The systems are first-order differential equation and the $\frac{dy}{dx}$ function. It returns a column vector of

$$
[dy_1 dx\\dy_2 dx]
$$

Now give the boundary conditions

```matlab
y0 = 0; yL = 0;
```

Then we have our guesses at the initial condition. Since this is a linear differential equation, we need two guesses. We now give our guesses.

```matlab
ICguesses = [0 -1];
```

`ICguesses` is like our aim, and we will aim at the IVP solver, which is ODE45, at that target boundary condition using the two guesses. So far, our first integration we call ODE45 with the first guesses.

```matlab 
[x1, y1] = ode45(yp, [0 L], [y0 ICguesses(1)]);
```

Note that from our first guess, always save the last value of `y1` in the first integration since this is the value we are interested in. Furthermore, we want to compare this last value of `y1` to the target boundary condition `y2`. Therefore, it is saved as `shot1`.
```Matlab
shot1 = y1(end,1);
```

Now conduct the second 'shot' using the `ICguesses(2)` and save the last value as `shot2`.

```matlab
[x2, y2] = ode45(yp, [0 L], [y0 ICguesses(2)]);
shot2 = y2(end,1);
```

Then put the 'shots' together in a vector.

```Matlab
shots = [shot1 shot2];
```

The next step is to perform the interpolation.

```matlab
newIC = interp1(shots, ICguesses, yL, 'linear', 'extrap');
```

To demonstrate what is happening in the code above, we look at the sketch below. We have our `ICguesses` on the `y-axis` and `y-end` on the `x-axis`.

![demonstration](/engineering-education/implementing-shooting-method-in-matlab/shooting_four.png)

Now, that's the plot for the 'shots' and the guesses. 

We then want to know the guess to get `yl`. So we have three points that we know for the interpolation. They are all our target boundary conditions, that is, shots to the boundary condition and the actual target boundary condition `$y_l$`. 

The unknown value is the unknown guess. It is why we use them for the call to the enterprise. Shots are the `x-values` and `ICguess` the y-values. 

Since this is a linear equation, we use the linear interpolation defined by `linear interp`. The last call in that function is the `extrap`, which means extrapolation. It is in case the `$y_l$` is not between the two shots.

The final step for the shooting method is to use the new initial condition for the final call to ODE45 to our solution.

```matlab   
[x3, y3] = ode45(yp, [0 L], [y0 newIC]);
```

We can compare our solution to the `y3` to the analytical solution of the same problem. To get the analytical solution, we use the code below; 

```Matlab
%Analytical solutions
xx = linspace(0,L);
y_analytical = w/(24*E*I)*(2*L*xx.^3-xx.^4-L^3*xx);
```

We will now plot the two solution in the same figure so we can be able to compare the two. We plot using the code below;

```matlab
figure(1)
plot(xx,y_analytical, 'b-',x3,y3(:,1), 'ro')
xlabel('x(m)')
ylabel('y(m)')
legend('analytical solution', 'Shooting method')
title('Beam Deflection')
```

![solution](/engineering-education/implementing-shooting-method-in-matlab/shooting_five.png)

As we can see from the plot, the shooting method is accurate as the analytical method. For the error behavior of the shooting method, it's going to be the same as whichever IVP solver you are using.

### Conclusion
Using the shooting method to get the solution for the linear differential equations is straightforward. 

The advantage of the shooting method is that you don't need the initial values. You can use guesses for these values, but still, you get the solution. Thus, it reduces the time that could be spent to get the initial values.  

Also, at some point, the methods used to find these initial values are so tiresome, e.g., the Runga Kutta method, which is not involved in the shooting method. Matlab also makes it easier since it has some in-built functions that help to work such problems easier.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

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