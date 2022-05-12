---
layout: engineering-education
status: publish
published: true
url: /implementation-of-linear-quadratic-regulator-control-for-the-inverted-pendulum/
title: Implementation of Linear Quadratic Regulator Control for the Inverted Pendulum
description: This tutorial will give a step by step process of designing a controller for the inverted pendulum on a cart. The controller will use the linear quadratic regulator to balance it upright.
author: atieno-dorine
date: 2021-12-07T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementation-of-linear-quadratic-regulator-control-for-the-inverted-pendulum/hero.jpg
    alt: Implementation of Linear Quadratic Regulator Control for the Inverted Pendulum Hero Image
---
Linear Quadratic Regulator (LQR) is a control method that provides high feedback gain enabling the design of high-performance systems. The main reason for the LQR is to relieve the designer from the optimization task of the controller. It can be an automatic way of the right state-feedback controller.
<!--more-->
However, when dealing with this, the engineer must consider the cost function. It makes it possible to be compared with the targeted goals.

This tutorial will show you how to implement the LQR in Matlab.

First, we design an optimal full-state feedback controller for the inverted pendulum on a cart example using the linear quadratic regulator (LQR). Then, to get the connection between the designed controller parameter and its behavior, We consider its Full-state feedback.

### Prerequisites
To follow along with this tutorial, you'll need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Inverted pendulum on a cart
In this section, we will look at how simple it is to control a system using Matlab. For example, let's imagine an inverted pendulum sitting on top of a cart, and we can move the cart around.

![inverted cart](/engineering-education/implementation-of-linear-quadratic-regulator-control-for-the-inverted-pendulum/pendulum-one.png)

This system seems more physical than a simple pendulum with some torque at the bottom. Here, we have a cart trying to move around to stabilize the inverted pendulum.

In this system, we consider the following parameters:
- State of the system (x): It is the cart's position.
- Angle of the pendulum arm($\theta$).

![inverted cart with parameters](/engineering-education/implementation-of-linear-quadratic-regulator-control-for-the-inverted-pendulum/pendulum-two.png)

We are going to represent our dynamical state by vector `x` and the positions as shown below:

$$\begin{vmatrix}x\\\dot{x}\\\theta\\\dot{\theta}\end{vmatrix}$$

This is a two-degree of freedom system with the `x` values (position of the cart) and the pendulum's angle ($\theta$). Since it is two-degree freedom, from newton's second law, we get four couple `ode45`. We will have:

$$\frac{d}{dt}x=f(x)$$

It is a non-linear system, but we can make it linear. Intuitively, we know that there are a couple of key fixed points. The fixed points in this system are fixed points corresponding to the pendulum down position and the fixed point corresponding to the point up. We will have:

$$
\theta=0, \pi \\\dot{\theta}=0\\\dot{x}=0 \\x
$$

- The `x` is a free variable because no rate of change depends on it.

We can apply the Eulers Lagrange method to compute the jacobian matrix using these fixed points. For example, you can get this through $\frac{df}{dx}$ evaluation at a fixed point:

$$f(x)\ \hArr\dot{x} = Ax + Bu$$

Where `u` is the control input for the system.

We will say `u` is equal to the force on the cart in the `x` direction. It is reasonable. We mean that, like a motor, on one of those wheels, we can have some controllers to specify what we want.

For example, if you specify that you want twice the force, it will give the force, indicate it, and then move the pendulum.

### Matlab code
We have a function `cartpend`, which stands for `cart pendulum system`. This function takes in the parameters of the cart as arguments. It gives the output as a time derivative.

```Matlab
function dx = cartpend(x,m,M,L,g,d,u)
```

Where:<br/>
x - is the state of the cart.<br/>
m: mass of the pendulum head.<br/>
M: Mass of the cart.<br/>
L: Length of the inverted pendulum.<br/>
g: Gravity<br/>
d: damping(opposition)

The `cartpend` function gives the time derivatives given the states above.

We are now simulating the system using the code below:

```matlab
function dx = cartpend(x,m,M,L,g,d,u)
Sx = sin(x(3));
Cx = cos(x(3));
```

The `sin` and `cos` give us the details about the vertical and horizontal position of the cart, considering the current state.

Now, we need to simulate our system. As we know, all the simulations are based on the mathematical concept of the system. We won't go into more details about the mathematical concept, but you can check them [here](https://en.wikipedia.org/wiki/Inverted_pendulum).

```matlab
D = m*L*L*(M+m*(1-Cx^2));    %damping term.
dx(1,1) = x(2);
dx(2,1) = (1/D)*(-m^2*L^2*g*Cx*Sx + m*L^2*(m*L*x(4)^2*Sx - d*x(2))) + m*L*L*(1/D)*u;    %pendulum up
dx(3,1) = x(4);
dx(4,1) = (1/D)*((m+M)*m*g*L*Sx - m*L*Cx*(m*L*x(4)^2*Sx - d*x(2))) - m*L*Cx*(1/D)*u;   %pendulum down
```

In the simulation case, it's either the pendulum is down or up. If it is up, we treat its equation as positive, otherwise, it is considered negative.

The force `u` enters the `xdot` and the $\theta$ if you look at the langrage equation. Thus, the right-hand equation is non-linear, making it relatively easy to simulate the system.

Let's create another function, `sim_cartpend`. In this function, we specify the parameters. We then use `ode45` to integrate the vector field. The parameters are similar to those we discussed before:

```matlab
clear all; close all; clc;
m=1;
M=5;
L=2;
g=-10;
d=1;
x=4;
K=1;

%% Simulate closed-loop system
tspan = 0:.001:10;
x0 = [-1; 0; pi+.1; 0]; % initial condition
wr = [1; 0; pi; 0]; % reference position
u=@(x)-K*(x - wr); % control law
[t,y] = ode45(@(t,y)cartpend(x,m,M,L,g,d,u(y)),tspan,x0);
```

We need to integrate from 0 to the `tspan` with the initial condition `x0` in simulating. The initial condition means x is 0, $\dot{x}$ is zero, $\theta$ is zero and $\dot{\theta}$ is 0.5. `tspan` is used to give the integration limit.

Now, we tell the `ode45` to integrate our function and lock the parameters, and the zero control `u`.

`ode45` is a Matlab in-built function used for integrating differential equations of the order 4 and 5. This control law is also a mathematical model covered in the link provided above.

We are just simulating our systems in free physics. We create a loop with the function `cartpend`, which helps to plot the movement of the pendulum.

```Matlab
for k = 1:length(t)
    drawcartpend_bw(y(k,:), m, M, L);
end
```

The `drawcartpend_bw` plots a movie of the pendulum. When we execute this, we see our pendulum swing, and if we integrate for a long time, it will come to rest.

![swinging](/engineering-education/implementation-of-linear-quadratic-regulator-control-for-the-inverted-pendulum/pendulum-three.png)

This is the system that we want to control.

Let's place a pole in our cart to help in the control. Let's create a script for this. We will name the script `poleplacement.m`. This file assumes we have the `A` and `B` matrix that makes up the control law. The content of this file will be:

```matlab
m = 1;
M = 5;
L = 2;
g = -10;
d = 1;
s = 1; %pendulum up

A = [0 1 0 0; 0 -d/m -m*g/m 0; 0 0 0 1; 0 -s*d/(m*l) -s*(M+m)*g/(M*L) 0];

B = [0; 1/M; 0; s*1/(M*L) 0];

eig(A)
```

We have obtained an A\*B matrix for the linear system of the equation. Since the up and down linearization shares a lot in common, we use switch `s`.

When the pendulum is up, the switch is 1, and when it is down, it is -1. For now, it is 1, which means the pendulum is up, but when we want to make it down, we change it to -1.

`eig(A)` gives us the eigenvalues of `A`. These values helps tell if the system is controllable or not.

Now, we want to know if `A` and `B` are controllable. To do that, we use the `ctrb` function and the dot product of our matrix as the arguments. We will have:

```Matlab
ctrb(A.B)
```

When we execute this, we will have the controllability matrix. It is a `4x4` matrix. After getting this matrix, we find its rank. If the rank is 4, then our system is controllable, if not, then it is uncontrollable. To find the rank, execute the code below:

```Matlab
rank(ctrb(A,B))
```

The output will be:

```Matlab
ans =

     4
```

As we can see, it is four, which means it is controllable. It is a good indication that we can develop a controller to control our system. Since this system is controllable, we can design a state-feedback which is given as `u = -kx`.

We can place the eigenvalues of the closed-loop system anywhere we want. It is a one-line code in Matlab where you specify the eigenvalues, and it will find the gain matrix denoted by `k` to move your system to those eigenvalues. The code will be:

```matlab
k = place(A,B, eig)
```

We then take the controller and apply it to the non-linear system to show that we can stabilize the unstable inverted pendulum configuration.

### Linear Quadratic regulator (LQR)
Initially, we said that the state feedback allows us to place our eigenvalues anywhere. However, the problem is knowing the right place to put them.

There is a powerful tool in the control theory called LQR. It is the essential solution to the problem stated. The idea is, we can cook the cost function that tells us how bad it is, if our state is slow to converge to where we want it to be.

For example, making the system lightly dump and barely stable will take forever to stabilize. Also, if we make the system faster, we may need a large motor to keep it in that state.

We will build the cost function using the expression below:

$$J = \int (x^TQ_x + u^TRu)dt$$

The matrix Q tells you how bad the penalty is if `x` is not supposed to be. We add the two states so that the pendulum is not where it should be, trying to stabilize it to 0.

Let's assume Q and R are these matrices:

```bash
Q = \left(\begin{array}{cc}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 10 & 0\\
0 & 0 & 0 & 100
\end{array}\right)
```

If the system is not wanted, it receives a penalty of 1, which is the first element in the first row of our matrix. As the process continues, the penalty becomes bigger, as you can see in the major diagonal. It makes the system stabilize faster.

Let's assume that in this case, electricity is cheap or we have a beefy motor, and so we make the vector `R` so small:

```bash
R = 0.001
```

In Matlab, if you have `Q` and `R`, it turns out that `k` is the optimal matrix. Note that the best `k` is the best controller that minimizes the cost function, the `LQR`.

Applying this in Matlab is as easy as shown below:

```Matlab
k = lqr(A,B,Q,R)
```

Using the initials of the system to control it, we add the following code:

```matlab
Q = [1 0 0 0;0 1 0 0;0 0 10 0;0 0 0 100]

R = 0.001;    % R vector
k = lqr(A, B, Q, R);        %gives a low optimal feedback
tspan = [0: .001: 10]
```

![final output](</engineering-education/implementation-of-linear-quadratic-regulator-control-for-the-inverted-pendulum/pendulum-four.png>)

This system finds `k` and simulates. It then stabilizes to the position specified by the `Q` and `R` vectors. For example, to see where our LQR chose to place the `eig` values, execute the code below:

```Matlab
eig(A-B*k)
```

### Conclusion
Using Matlab to control an inverted pendulum is fun. What makes it more interesting is that you can visualize every step you carry out. Though it might be sucking in the mathematical model of it, if you understand what is going on, you will make it.

Also, Matlab has in-built functions that make your work easier by reducing the long code and long interventions.

Hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

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
