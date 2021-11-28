### Implementation of linear quadratic regulator (lqr) control for the inverted pendulum on a cart using Matlab
Linear Quadratic Regulator(LQR) is a control method that provides high feedback gain enabling the design of high-performance systems. The main reason for the LQR is to reduce the designer from the optimization task for the controller. It can be an automatic way of the right state-feedback controller. However, when dealing with this, The engineer must consider the coast function. It makes it possible to be compared with the targeted goals.

This tutorial will show how to implement the LQR in Matlab. First, we design an optimal full-state feedback controller for the inverted pendulum on a cart example using the linear quadratic regulator (LQR). Then, to get the connection between the designed controller parameter and its behavior, We consider its Full-state feedback.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### inverted pendulum on a cart
This section will look at how simple it is to control a system using Matlab. For example, let's imagine an inverted pendulum sitting on top of a cart, and we can move that cart around.

![inverted cart](/engineering-education/implementation-of-linear-quadratic-regulator-(lqr)-control-for-the-inverted-pendulum-on-a-cart/pendulumOne.png)

This system seems more physical than a simple pendulum with some torque at the bottom. Here, we have a cart, trying to move it around to stabilize the inverted pendulum.

In this system, we consider the following parameters:
- State of the system(x): It is the cart's position.
- Angle of the pendulum arm($\theta$).

![inverted cart with parameters](/engineering-education/implementation-of-linear-quadratic-regulator-(lqr)-control-for-the-inverted-pendulum-on-a-cart/pendulumTwo.png)

Now, we are going to represent our dynamical state by vector `x` and the positions as shown below:

$$\begin{vmatrix}x\\\dot{x}\\\theta\\\dot{\theta}\end{vmatrix}$$

So, this is a two-degree of freedom system with the `x` values(position of the cart) and the pendulum's angle ($\theta$). Since it is two-degree freedom, from newton's second law, we get four couple `ode45`, and so we will have:

$$\frac{d}{dt}x=f(x)$$

It is a non-linear system, but we can linearize the system. Intuitively, we know that there are a couple of key fixed points. The fixed points in this system are fixed points corresponding to the pendulum down position and the fixed point corresponding to the point up. So we will have:

$$
\theta=0, \pi \\\dot{\theta}=0\\\dot{x}=0 \\x
$$

- The `x` is a free variable because no rate of change depends on `x`.

We can apply the Eulers Lagrange method to compute the jacobian matrix using these fixed points. For example, you can get this through $\frac{df}{dx}$ evaluation at a fixed point:

$$f(x)\ \hArr\dot{x} = Ax + Bu$$

Where:
`u` is the control input for the system.

We will say `u` is equal to the force on the cart in the `x` direction. It is reasonable. We mean here that, like a motor on one of those wheels, we can have some controllers to specify what we want. For example, if you specify that you want twice the force, it gives that and indicates that and makes the pendulum move.

### Matlab code
We have a function `cartpend`, which stands for `cart pendulum system`. This function takes in the parameters of the cart as the argument. It gives the output as a time derivative.

```Matlab
function dx = cartpend(x,m,M,L,g,d,u)
```

Where: 
x - is the state of the cart.
m: mass of the pendulum head.
M: Mass of the cart.
L: Length of the inverted pendulum.
g: Gravity
d: damping(opposition)

The function `cartpend` gives the time derivatives given the states above.
We are now simulating the system using the code below:

```matlab
function dx = cartpend(x,m,M,L,g,d,u)
Sx = sin(x(3));
Cx = cos(x(3));
```
The `sin` and the `cos` give us the details about the vertical and horizontal position of the cart, considering the current state.
Now, we need to simulate our system. As we know, all the simulations are based on the mathematical concept of the system, here also we will consider the mathematical concept of the system. We won't go into more details about the mathematical concept, but you can check them [here](https://en.wikipedia.org/wiki/Inverted_pendulum).
```matlab
D = m*L*L*(M+m*(1-Cx^2));    %damping term.
dx(1,1) = x(2);
dx(2,1) = (1/D)*(-m^2*L^2*g*Cx*Sx + m*L^2*(m*L*x(4)^2*Sx - d*x(2))) + m*L*L*(1/D)*u;    %pendulum up
dx(3,1) = x(4);
dx(4,1) = (1/D)*((m+M)*m*g*L*Sx - m*L*Cx*(m*L*x(4)^2*Sx - d*x(2))) - m*L*Cx*(1/D)*u;   %pendulum down
```
In the simulation case, it's either the pendulum is down or up. If it is up, we treat its equation as positive, and if not, it's considered negative. 
The force `u` enters the $xdot$ and the $\theta$ if you look at the langrages equation. Thus, the right-hand equation is non-linear, making it relatively easy to simulate the system.

Let's create another function, `sim_cartpend`. In this function, we specify the parameters. We then use `ode45` to integrate the vector field. The parameters are similar to those we discussed before.

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
Here, we tell the `ode45` to integrate our function and lock the parameters, and the zero control `u`. `ode45` is a Matlab in-built function used for integrating differential equations of the order 4 and 5. This control law is also a mathematical model covered in the link provided before. So we are just simulating our systems in free physics. What this means is that we are applying the physics knowledge here. We create a loop with the function `cartpend`, which helps to plot the moving of the pendulum.

```Matlab
for k = 1:length(t)
    drawcartpend_bw(y(k,:), m, M, L);
end
```
The `drawcartpend_bw` plots a movie of the pendulum. When we execute this, we see our pendulum swing, and if we integrate for a long time, it will come to rest.

![swinging](/engineering-education/implementation-of-linear-quadratic-regulator-(lqr)-control-for-the-inverted-pendulum-on-a-cart/pendulumThree.png)

So, this is the system that we want to control. Let's place a pole in our cart to help in the control. Let's create a script for this. Let's call the script `poleplacement.m`. This file assumes we have the `A` and `B` matrix that makes up the control law. The content of this file will be:

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

We have obtained an A*B matrix for the linear system of the equation. Since the up and down linearization shares a lot in common, we decide to use switch `s`. When the pendulum is up, the switch is 1, and when it is down, it is -1. For now, it is 1, which means the pendulum is up, but when we want to make it down, we change it to -1. `eig(A)` gives us the eigenvalues of `A`. These value helps tell if the system is controllable or not.

Now, what is important is that we want to know if `A` and `B` are controllable. To do that, we use the `ctrb` function and the dot product of our matrix as the arguments. So we will have:

```Matlab
ctrb(A.B)
```

When we execute this, we will have the controllability matrix. It is a 4x4 matrix. After getting this matrix, we find the rank of this matrix. If the rank is 4, then our system is controllable, and if not, it is not. To find the rank, execute the code below:

```Matlab
rank(ctrb(A,B))
```

The output is:

```Matlab
ans =

     4
```

As we can see, it is four, which means it is controllable. It is a good indication that we can develop a controller to control our system. Since this system is controllable, we can design a state-feedback which is given as;

u = -kx

So, we can place the eigenvalues of the closed-loop system anywhere we want. It is a one-line code in Matlab where you specify the eigenvalues, and it will find the gain matrix denoted by `k` to move your system to those eigenvalues. The code is;

```matlab
k = place(A,B, eig)
```

We then take the controller and apply it to the non-linear system to show that we can stabilize the unstable inverted pendulum configuration.

### Linear Quadratic regulator(LQR)
Initially, we said that the state feedback allows us to place our eigenvalues anywhere, but the problem is knowing the right place to put them. Now, there is a powerful tool in the control theory called LQR. It is the essential solution to the problem we stated before. The idea is, we can cook the cost function that tells us how bad it is if our state is slow to converge to where we want it to be. For example, making the lightly dump and barely stable will take forever to stabilize. Also, if we make the system faster, we may need a large motor to keep it in that state, and so we will build the cost function using the expression below:

$$J = \int (x^TQ_x + u^TRu)dt$$

The matrix Q tells you how bad the penalty is if `x` is not supposed to be. So we add the two states so that the pendulum is not where it should be, trying to stabilize it to 0. Now, Q and R are these matrices, let's assume.

$$Q = \left(\begin{array}{cc} 
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 10 & 0\\
0 & 0 & 0 & 100
\end{array}\right)$$

If the system is not wanted, it recieves a penalty of 1, which is the first element in the first row of our matrix. As the process continues, the penalty becomes bigger, as you can see in the major diagonal. It makes the system stabilize faster.

Let's assume that in this case, electricity is cheap or we have a beefy motor, and so we make the vector `R` so small.

R = 0.001

In Matlab, if you have `Q` and `R`, it turns out that `k` is the optimal matrix. Note that the best `k` is the best controller that minimizes the cost function, the `LQR`.
Now applying this in Matlab is very easy, as shown below:

```Matlab
k = lqr(A,B,Q,R)
```

using the initials of the system to control it, we add the following code:

```matlab
Q = [1 0 0 0;0 1 0 0;0 0 10 0;0 0 0 100]

R = 0.001;    % R vector
k = lqr(A, B, Q, R);        %gives a low optimal feedback
tspan = [0: .001: 10]
```

![final output](/engineering-education/implementation-of-linear-quadratic-regulator-(lqr)-control-for-the-inverted-pendulum-on-a-cart/pendulumFour.png)

This system finds `k` and simulates. It then stabilizes to the position specified by the `Q` and `R` vectors. For example, to see where our LQR choose to place the `eig` values, execute the code below:

```Matlab
eig(A-B*k)
```

### Conclusion
Using Matlab to control an inverted pendulum is a lot of fun. What makes it more fun is that you can visualize every step you carry out. Though it might be sucking in the mathematical model of it, if you understand what is going on, then you gonna make it. Also, Matlab has in-built functions that make your work easier by reducing the long code and long interventions.

Happy coding!
