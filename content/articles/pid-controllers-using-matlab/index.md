### PID controllers in Matlab
### Introduction
A controller is a system's response modifiers. These systems may be such as a robot control or even a plant. In an open-loop scenario, the system's control system is acted upon by the input to generate output signals. Mostly in this open_loop scenario, the required performance is not met because the system is not smart enough.
Since in all plants, a certain output is required, control feedback is added into the open-loop systems. This is to sense the output of the plant then feeds it back to the system to make necessary adjustments. In feedback systems, there is a reference signal which is desired value or ultimate goal. The main aim of a controller is to move the error to zero and this means that all the requirements are met. An error is a difference between the current measured value and the expected output. 
PID controller is an acronym that stands for Proportional Integral Derivative. These terms show how the error term is handled before adding them to produce controller output. The error is set up by multiplying the input by $$K_p$$ for the proportional path, by $$K_i$$ then integrating for the integral path, by$$K_d$$ then differentiating for the derivative path. The three K are the gains and can be adjusted in plants with particular requirements.
In this tutorial, we will see how to use Matlab to create a PID controller and the various effect of changing the parameter $$K_p$$, $$K_i$$, and $$K_d$$. This is to make us understand the construction and functionality of a controller.

### Prerequisites
1. [Matlab](https://www.mathworks.com/downloads/) installed.
2. A proper understanding of [Matlab](https://www.section.io/  engineering-education/getting-started-with-matlab/) language.

We first clear the variables and the command window. You then set up the transfer function variables. A transfer function is a ratio of an input signal to that of the output signal of a controller for all values possible. The reference input operates through the transfer function to produce an output in the controlled output response. Below is the code for setting transfer function variable;
```Matlab
clear all
clc
% The transfer function variables. 
% It has both the numerator and denominator values.
num = [ 1 ];
den = [ 1 3 1];
```
In the transfer function variables above, the numerator is set to 1 and the denominator to [1 3 1]. This means that the denominator is $$s^2$$ + 3s + 1. After getting the transfer function variables, we are going to set the plant by passing the transfer variable onto the transfer function. This is how the feedback transfer function is found.

```matlab
% We denote the transfer function as tf.
Gp = tf(num,den);  %setting the transfer function.
H = 1;   % feedback transfer function. It shows the expected 
% unit response.
```
The feedback transfer function is set to 1 to keep it simple but all this can be modified later if there be a need to.
We will set up the controller. In setting the PID controller, we set a variable `m` which will give the feedback from the plant and the transfer function.
```Matlab
M = feedback(Gp); %feedback of the plant.
```
Actually what the above code does is, takes the feedback using the `feedback` function as the forward path transfer function and `H` as the feedback. You will do the step response of the feedback transfer function `m`. The step response is the time behavior of the output of a system when it changes from zero to one within a short time. We do the step response using the `step` function as shown below;
```Matlab
step(m)   %step response
```
Executing the code above gives a plot of the step function.
>Note that in the workspace, we see the transfer function specified.

![The step function](PID1.png)
*plot of the transfer function obtained*

The step-response looks like a smoothed-out step function. This means that the system is responding. We placed a unit response of 1 in the feedback `H` but the system goes up to 0.5 as seen in the plot(y-axis). This means that we got some steady-state error. When we also look at the time-base(x-axis), it takes about 5secs before it finally stops approaching its steady-state value and that's relatively long to converge. The error can be corrected but we first initialize the constants($$K_p$$, $$K_i$$, and $$K_d$$). These variables will help us obtain a steady-state system.
```matlab
Kp = 1;   % proportional constant
Ki = 0;    % integral constant
Kd = 0;    % derivative constant
```
At this point, we create a controller and it is denoted using `Gc`. We will use the `PID` function and pass Kp, Ki, and Kd. This means we are creating a PID controller by passing the constants.
```matlab
Gc = pid(Kp,Ki,Kd); % the contoller.
```
When we look at the variable, both the Ki and Kd are 0. This means that we have a PID controller that is going to amplify by 1. Create another closed-loop transfer function(Mc). This will be the transfer function with control since the controller which uses the constants for control and the expected unit response(H) are passed here.
```Matlab
Mc = feedback(Gc*Gp, H);  %transfer function with control.
step(Mc)    %step response of the transfer function with control.
grid on
```
In this case, the forward path is the product of the controller(Gc) the plant(Gp), and H then obtaining the feedback.
We first run the program to get the transfer function(Mc) and then add the step to get the step response. Basically, after doing this and re-running the program, we will have two plots, that is, the step response of the system without a controller and that of the system with the controller. Now, since the step response of the system with the controller has a proportional gain(Kp) of 1, the plots will be the same.
![plot of the step responses](PID2.png)
*plot of the step response*

We will now look at the effects of changing P, I, and D because we did a step response but they are identical transfer functions. We will now change the PID controller constants. let's begin with Kp. This is done as follows;
- Highlight the Kp variable.
- Hover over the variable and right-click.
- In the new window, choose the increment value and run section. We will have a new interface as shown below.
![changing the PID constant Kp](PID3.png)
*Interface for changing the values*

We will have a new tool for changing the Kp values and automatically running the program after the change. The initial value of Kp is 1 but we will change this to 2 by clicking the addition sign on the tool. Because the graph keeps changing and we can't see the effect, we will add the `hold on` function immediately after step M. This is to be able to see each plot after changing the value.
When we run the program after adding the `hold on` function, this is what we will have.
![step response when value is changed](PID4.png)
*plot of step responses when Kp is changed*

In the image above, we get a plant with the feedback which is the orange plot and it goes asymptotic to 0.5 in about 5secs. The red plot is a lower code where we put the controllers in and all we did was to put a peak controller with the peak controllers just to make the system do whats it's going to do but faster and to change the steady-state error. To make the steady-state visible in our plot, we follow the below procedure;
- Right-click any point within your graph.
- Click on the characteristics.
- Click on the steady-state.
![image showing the steady states](PID5.png)
*Image showing the steady-state*

When you hover over the dots, we see that as time goes to infinity, the blue plot goes to 0.5 and the red plot to 0.667.
We want the steady-state of the red plot which is the controller to go to 1. This means we got some steady state-state error. To correct this, we will increase the Kp until it is attained.
> Note that every time we increase the Kp, the value changes in the program.

![How Kp changes](PID6.png)
*Effect of changing Kp value*

![Final plot of the Kp and the initial](PID7.png)
*Final plot that with required output response*

We will now increase the Kd. Just like the pulse train in a Fourier series with an infinite number of terms states, if you don't pass the higher terms that are near infinity, then you will get ringing in your output edge. This means that we need to allow higher frequencies to come in the controller to turn the oscillation into a more square edge(unit response). These high frequencies are put in the system by adding the Kd.
![How the response changes with change in Kd](PID8.png)
*Effect of changing Kd values*

![plot of final response and initial response](PID9.png)
*final plot with required output response*

The system stabilizes when the Kd is 8 and the Kp is 24. When we look at the step response, our control response went to 0.96 but we require it to be at 1 since it is a unit response. We are not going to get 1 unless we put some integration. This means we will also increase the Ki values. We will use a similar way of adding used before to add the Ki. We observe that the step response goes to 1 when we increase the Ki to 2. Since this is its required point, we will leave it at that.
![How response changes with changes in Ki](PID10.png)
*Effect of changing Ki*

![plot of final response and initial response](PID11.png)
*Final plot with required output responses*
Our PID controller is the final values of Kp, Ki, and Kd. We now use the PID function to get the Gc which is our controller. When we type `Gc` in the command window, we get the transfer function.
![transfer function](PID12.png)

Below is the full Matlab code for the control above;
```
%PID example

clear all
clc

% The transfer function variables. We have the values for the numerator 
% and the denominator
num = [ 1 ];
den = [ 1 3 1];

% We denote the transfer function as tf.
Gp = tf(num, den);  % setting the transfer function.
H = 1;   % feedback transfer function. It shows the expected 
% unit response.

M = feedback( Gp, H);  %feedback of the plant.
step(M)     %step response
hold on
grid on

%%
Kp = 1;   % proportional constant
Ki = 0;    % integral constant
Kd = 0;    % derivative constant

Gc = pid(Kp,Ki,Kd);  % the contoller.

Mc = feedback(Gc*Gp, H);  %transfer function with control.
step(Mc)    %step response of the transfer function with control.
grid on
```
### Conclusion
Matlab helps in the analysis of the response and can be used to obtain a steady-state response as shown before. This helps to attain the optimum performance in a system which is the requirement of a system. This makes Matlab a special tool for the analysis of a system response. 
