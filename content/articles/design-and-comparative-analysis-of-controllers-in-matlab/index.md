---
layout: engineering-education
status: publish
published: true
url: /design-and-comparative-analysis-of-controllers-in-matlab/
title: Design and Comparative Performance Analysis of P, I, D, PI, PD, and PID Controllers in Matlab
description: This tutorial will be a brief dive into understanding controllers and their properties in Matlab.
author: queenter-bruce
date: 2022-05-04T00:00:00-12:48
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/hero.jpg
    alt: Design and Comparative Performance Analysis of P, I, D, PI, PD, and PID Controllers in Matlab Hero Image
---
Design and comparative analysis involves the construction of various controllers. These controllers are then analyzed deeply to get the difference depending on their properties. 
<!--more-->
These properties are then analyzed to see their merits and demerits. Also, we analyze their performance to get their efficiency.

In this tutorial, we will look at the various types of controllers. This includes the theory and property of these controllers. 

The types of controllers that we will cover are such as proportional, integral derivative controllers and combinational modes. We will alos look at how to design these controllers using Matlab.

### Prerequisites
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### Why need controllers?
1. The performance of a system is usually analyzed based on a few parameters. These parameters are the time and the frequency domain. 
   They are analyzed in the image below:

![The parameters](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/parameters.png)

1. When we design a system, we get the transfer function. If, after testing, the value does not satisfy based on the rise time, overshoot, steady-state error, phase margin parameters, e.t.c, the controller is used to achieve the desired response.

2. Controllers are system response modifiers.

A controller is introduced with the main plant transfer function in the feed-forward loop as shown below:

![Introduction of controllers](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/controller.png)

Here, we have the plant(Gs) we want to modify to attain certain requirements. The controller is used to change the response of the plant.

### Different types of controllers
There are two types of continuous controllers.
1. Basic modes - These basic mode controllers include proportional(P), integral(I), and derivatives(D) controllers.
2. Combinational mode - These controllers include proportional + intergral(PI), proportional + derivatives(PD), and proportional + intergral+ deravatives(PID) controllers.

Let us now take a look at these controllers.

### Basic modes
#### 1. Proportional(P) controllers
A proportional controller is simply an amplifier. Its transfer function is `Gcs = kp`. It does not add any new pole or zero to the system. 

The controller can be represented as shown below:

![Schematic representation of P-controller](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/p-controller.png)

`$e_j(t)$` is the input error and `$e_o(t)$` is the output error. $E_j(s)$ and $E_o$ are the frequency domain representation. The time domain equation is:

$$e_0(t) = kp*e_j(t)$$

The frequency-domain equation where you can find the transfer function is:

$$Gc(s) = \frac{E_0(s)}{E_j(s)} = kp$$

With P-controller, the response of closed-loop systems becomes faster, but maximum overshoot also increases. The large value of `kp` can make the system unstable.

Also, P-controllers cannot handle the steady-state error and provide offset error. Let us look at its performance comparison. 

The plot below shows the system response with the controller and without controllers:

![Performance comparison](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/p-controllerperformance.png)

The blue plot is the system response without the controller, and the red plot is the system's response to the controller.
As we can see, the system response has increased, and the rise time(Tr) has been reduced. 

Also, the maximum overshoot has greatly increased.

#### 2. Intergral(I) controllers
Its transfer function is $Gc(s) = \frac{kj}{s}$ because of the integration. It adds a pole and hence increases the order system by one. The time-domain equation of the controller is shown below:

$$e_0(t)=k_j\int^t_0 e_j(t)dt$$

The frequency-domain equation is:

$$Gc(s) = \frac{E_o(s)}{E_j(s)}=\frac{k_j}{s}$$

With I-controllers, the offset error of the P-controller is removed. Also, the steady-state error in step response is eliminated. 

However, the system's response becomes slightly lower. Oscillation in the system's response and maximum overshoot increases. This increase can make the system unstable.

The performance comparison is as shown below:

![Comparison response of I-controller](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/i-controllerperformance.png)

As we can see above, a stable state is achieved. The rise time(Tr) has decreased, and the response is slightly lower. Also, there is a slight increase in the maximum overshoot.

#### 3. Derivative(D) controllers
It's transfer function is $Gc(s) = k_d.S$ because of the differentiation. It adds a zero to the system. The time-domain equation is given by:

$$e_0(t)=k_d\frac{d}{dt}.e_j(t)$$

The transfer function $Gc(s)$ is given by:

$$Gc(s) = \frac{E_0(s)}{E_j(s)}$$

D-controllers give a fast action when the input changes rapidly. However, D-controllers are not used alone. They are not used alone because if the error $e_j(t)$ is constant, its output is zero, and the actuator output will also be zero.

Also, if the error $e_i(t)$ changes suddenly, then the controller's output will be impulsive. This impulsive output can cause a sudden act of the actuator. This sudden act can cause a breakdown of the system components.

### Combinational modes
#### 1. Proportional + Integral(PI) controllers
Its transfer function is given by $Gc(s)=kp(1+\frac{1}{T_js)}$. The time domain is given by:

$$e_0(t)=kp.e_j(t) + \frac{kp}{T_j}\int^t_0e_j(t)dt$$

In this case, $kp.e_j(t)$ is for the P-controller and $\frac{kp}{T_j}\int^t_0e_j(t)dt$ is for the I-controller. Here, `kp` is the proportional gain and $T_j$ is the integral time. $\frac{1}{T_j}$ is the reset rate.

$T_j$ affects integral control action while `kp` affects proportional and integral control actions. The advantage of both P-controllers and I-controllers are clubbed together in PI-controller.

Due to P-controllers, the response becomes faster due to the I-controller, and the steady-state error becomes zero.
When $T_j$ is increased, the damping factor also increases; therefore, large oscillations due to P-controller can be made smaller. 

The comparative response is shown below:

![Comparison performance of PI-controller](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/pi-controllerperformance.png)

#### Proportional + Derivative(PD) controller
Its transfer function is given by $Gc(s) = kp(1+T_dS)$. The time domain equation given by $e_0(t)=kp.e_j(t) + kp.T_d\frac{d}{dt}.e_j(t)$.
Kp is the proportional gain, and $T_d$ is the derivative time.

- PD controllers produce a fast response. However, it cannot handle the steady-state error and produces offset too. Both the P and D controllers cannot reduce the steady-state error.
  
- PD-controllers increase damping, improves transient and reduces oscillation of response. Therefore, it can make the system more stable. Also, PD controllers amplify the noise signal and may cause a saturation effect in actuators. The comparison response is shown below:

![Comparison response of PD-controller](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/pd-controllerperformance.png)

#### Proportional + Integral + Derivative(PID) controllers
It's transfer function is $Gc(s)=kp(1+T_dS + \frac{1}{T_dS})$.

This controller gives a faster response due to P-controller and D-controller actions. It has a zero steady-state due to the I-controller actions and high stability due to the D-controller action. This zero steady-state makes the PID controller as best among these.

Also, to achieve the desired response, we must fine-tune the PID controllers to find optimal values of `kp`, `Td`, and `Tj`. The performance comparison is shown below:

![Comparison response of PID-controllers](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/pid-controllerperformance.png)

You can create the different controllers and connect them in parallel form to get the PID controllers, as shown below:

![Parallel connection of controllers](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/controller-connection.png)

> For a proper understanding of the background equations involved in the design of the controllers, the transfer function, they can be found [here](https://www.tutorialspoint.com/control_systems/control_systems_controllers.htm)

### Controller design and tuning and Matlab
In control and designing these controllers, matlab has a function `pidtune()`. The syntax is:

```matlab
[Gc, info]=pidtune(sys, type, options)
```

Here:
- `Gc` - This is the transfer function of the controller.
- `Info` - This is the information about the controller.
- `Sys` - This is the system's transfer function (Gs).
- `Type` - This is the type of controller used.
- `Options` - These are the various controller options. These are desired phase margins, designed objectives, instability information of the open-loop system.

Example of how to use the syntax is shown below:

```matlab
syst=tf(1, [1 3 3 1]);
opts = pidtuneOptions('PhaseMargin', 45, 'DesignFocus', ''disturbance-rejection','NumUnstablePoles', 0);
[C, info]=pidtune(sys, 'pid', opts)
```

> Design focus has two options, that is, reference tracking and disturbance-rejection. Here, `tf()` function gives the transfer function, `PidtuneOptions()` gives the tuning option and the `pidtune()` gives the design.

### Matlab code for implementing controllers
In implementing the controller in Matlab, we first define the system open loop system known as the transfer function and the system closed loop.

```matlab
% Program to design PI, PD, and PID controllers for a plant with unity feedback
sys_ol = tf(5, [1 6 11 6]); %Open loop plant=5/(s^3+6s^2+11s+6)
sys_cl = feedback(sys_ol, 1); %Closed loop plant without controllers with unity feedback
```

The closed-loop provides feedback but without a controller. It means that the feedback is not controlled.

Let us now design our controllers. We will begin with the PI-controller. 

To design the PI-controller, we use the code below:


```matlab
% Design PI Controller
[Gc_PI, info_PI] = pidtune(sys_ol, 'PI');
disp('PI controller details:')
Gc_PI %TF of PI-controller
info_PI
sys_cl_PI = feedback(sys_ol*Gc_PI, 1); %closed loop TF of plant with PI-controller with H(s)=1
```

In the design of the PI-controller, we use the `pidtune()` function. This function takes the open-loop system and the type of the controller we are designing, PI-controller, as the arguments.

When you execute the `pidtunes()` function, it stores the controller's transfer function in the variable `Gc-PI`. Also, the controller's information is stored in the `info-PI` variable.

Finally, we make a closed-loop system with the controller. The variable `sys_cl_PI` is the system's transfer function with the controller. To design other controllers, we perform similar operations as shown below:

```matlab
%---------------------------------------------------------------------------------------------
% Design PD Controller
[Gc_PD, info_PD] = pidtune(sys_ol, 'PD');
disp('PD controller details:')
Gc_PD %TF of PI-controller
info_PD
sys_cl_PD = feedback(sys_ol\*Gc_PD, 1); %closed loop TF of plant with PD-controller with H(s)=1

%---------------------------------------------------------------------------------------------
% Design PID Controller
[Gc_PID, info_PID] = pidtune(sys_ol, 'PID');
disp('PID controller details:')
Gc_PID %TF of PI-controller
info_PID
sys_cl_PID = feedback(sys_ol\*Gc_PID, 1); %closed loop TF of plant with PID-controller with H(s)=1
```

Now, we will compute the step response of the closed-loop response. This step response gives information such as rise time, settling time, maximum overshoot, e.t.c, in the workspace for the closed-loop system without controllers and for the closed-loop systems with PID-controller.

Computing the step response is done by the code below:

```matlab
%---------------------------------------------------------------------------------------------
% Step response info i.e Tr, Mp, Ts etc
step_response_of_closed_loop_sys = stepinfo(sys_cl)
step_response_of_closed_loop_sys_with_PID = stepinfo(sys_cl_PID)
```

We can now plot the output of these responses in subplots as shown below:

```matlab

subplot(221)
step(sys_cl)
title('step response of uncontrolled system')

subplot(222)
step(sys_cl_PI)
title('step response of system with PI controller')

subplot(223)
step(sys_cl_PD)
title('step response of system with PD controller')

subplot(224)
step(sys_cl_PID)
title('step response of system with PID controller')
```

Now, we will create a separate figure. This figure will plot the open-loop systems, closed-loop systems without controllers, and closed-loop systems with controllers. This separate figure is for easy comparison of the output. 

To do this, we use the code below:

```matlab
figure(2)
step(sys_ol, sys_cl_PI, sys_cl_PD, sys_cl_PID, 'r--')
title('comparison of all step response')
legend({'Open Loop', 'Closed Loop', 'Closed Loop with PI', 'Closed Loop with PD',...
    'Closed loop with PID'}, 'Location', 'southeast')
legend('boxoff')
```

We make the plot of the step response using the `step()` function. Legend is created using `legend()` function. The legend shows the representation of each plot. 

This legend should not be attached to any of the plots. `Boxoff` does this. Now, when we run our program, the output will be as shown below:

![Step response of controllers](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/step-response.png)

_Plot of the step response of different controllers_

![Step response in one figure](/engineering-education/design-and-comparative-analysis-of-controllers-in-matlab/comparison-response.png)

_Plot of the response of different systems_

Suppose you look at the workspace to see the program's output you have displayed. Here, you get the transfer function of the closed-loop system. 

Also, it shows the rise time, settling time, overshoot, undershoot and peak time in the workspace. You can make the comparison in the workspace.

### Conclusion
Controllers form an important part of a system. A good controller is required for a system to operate effectively. 

Using Matlab, you can design a controller and test its effective performance. This property makes it easy to design the appropriate controllers. Also, you can compare the system's performance with a controller and without controllers.

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