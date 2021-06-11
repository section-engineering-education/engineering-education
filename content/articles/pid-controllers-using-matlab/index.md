
### PID controllers in Matlab
### Introduction
The performance of a system is usually on basis of a few parameters. These parameters are separated into  time and frequency domain. 
PID controller is an acronym that stands for proportional integral derivative. These acronyms form the basis of the controllers. This means that we have Proportional controllers, Integral controllers, and derivative controllers. When all these modes are combined, we have the PID controllers. It is used to makes some factors such as temperature, pressure, and flow constant. It uses a control loop feedback to ensure that the output wanted is what you get. A controller can are the system's response modifiers. They come in various forms such as standalone units or PLC programming.
In this tutorial, we will see how to use the Matlab `PID()` function and the various effect of changing the parameter Kp, Ki, and Kd. This will help us understand what is going on in the controller.

### Prerequisites
1. [Matlab](https://www.mathworks.com/downloads/) installed.
2. A proper understanding of [Matlab](https://www.section.io/  engineering-education/getting-started-with-matlab/) language.

We first clear the variables and the command window. You then set up the transfer function variables. The code below is executed to make all these possible;
```Matlab
clear all
clc

num = [ 1 ];
den = [ 1 3 1];
```
In the transfer function variables above, the numerator is set to 1 and the denominator to [1 3 1]. This means that the denominator is s^2 + 3s + 1. After getting the transfer function variables, you set the plant and get the feedback.
```matlab
Gp = tf(num,den);
H = 1;
```
In the feedback, the transfer function is set to 1 to keep it simple but all this can be modified later if there be a need to.
We will set up the controller. In setting the PID controller, we set a variable `m` which will give the feedback from the plant and the transfer function.
```matlab
M = feedback(Gp);
```
Actually what the above code does is, it takes the `feedback` as the forward path transfer function and `H` as the feedback. It will be a closed-loop transfer function. You will do the step response of the transfer function `m`. This is done using the `step` function as shown below;
```Matlab
step(m)
```
Executing the code above gives a plot of the step function.
>Note that in the workspace, we see the transfer function specified.

![The step function](/engineering-education/pid-controllers-using-matlab/PID1.png)
The step-response looks like a smoothed-out step function. This means that the system is responding. We placed a unit response of 1 but the system goes up to 0.5 as seen in the plot(y-axis). This means that we got some steady-state error. When we also look at the time-base(x-axis), it takes about 5secs before it finally stops approaching its steady-state value and that's relatively long to converge. We will try to correct this error but before we do that. We will add some PID variables.
```matlab
Kp = 24;
Ki = 2;
Kd = 8;
```
At this point, we create a controller GC and we will use the `PID` function and pass Kp, Ki, and Kd.
```matlab
Gc = pid(Kp,Ki,Kd);
```
When we look at the variable, both the Ki and Kd are 0. This means that we have a PID controller that is going to amplify by 1. Create another closed-loop transfer function(Mc). This will be the transfer function with control.
```Matlab
Mc = feedback(Gc*Gp, H);
step(Mc)
grid on
```
In this case, the forward-path is the product of the controller(Gc) and the plant(Gp), and H. Here, the controller is PID with a P of gain 1 which is a short circuit. We first run the program to get the transfer function(Mc) and then add the step to get the step response. Basically, after doing this and re-running the program, we will have two plots, that is, the step response of the system without a controller and that of the system with the controller. Now, since the step response of the system with the controller has a gain of 1, the plots will be the same and we will not be able two see the two.
![plot of the step responses](/engineering-education/pid-controllers-using-matlab/PID2.png)
We will now look at the effects of changing P, I, and D because we did a step response but they are identical transfer functions. We will now change the PID controller. This is done as follows;
- Highlight the Kp variable.
- Hover over the variable and right-click.
- In the new window, choose the increment value and run section.
![changing the PID](/engineering-education/pid-controllers-using-matlab/PID3.png) 
We will have a new tool for adding the Kp values and automatically running the program after the addition. The initial value of Kp is 1 but we will change this to 2 by clicking the addition sign on the tool. Because the graph keeps changing and we can't see the effect, we will add the `hold on` function immediately after step M.
When we run the program after adding the `hold on` function, this is what we will have.
![step response when value is changed](/engineering-education/pid-controllers-using-matlab/PID4.png)
In the image above, we get a plant with the feedback which is the blue plot and it goes asymptotic to 0.5 in about 5secs. The red plot is a lower code where we put the controller in and all we did was to put a peak controller with the peak controllers just to make the system do whats it's going to do but faster and could change the steady-state error. To make the steady-state visible in our plot, we folow the below procedure;
- Right-click anypoint within your graph.
- Click on the characteristics.
- Click on the steady-state.
![image showing the steady states](/engineering-education/pid-controllers-using-matlab/PID5.png)
When you hover over the dots, we see that as time goes to infinity, the blue plot goes to 0.5 and the red plot to 0.667.
We want the steady-state of the red plot which is the controller to go to 1. This means we got some steady state-state error. To correct this, we will increase the Kp until it is attained.
> Note that every time we increase the Kp, the value changes in the program.

![How Kp changes](/engineering-education/pid-controllers-using-matlab/PID6.png)

![Final plot of the Kp and the initial](/engineering-education/pid-controllers-using-matlab/PID7.png)

We will now increase the Kd. Just like the pulse train in a Fourier series with an infinite number of terms states, if you don't pass the higher terms that are near infinity, then you will get ringing in your output edge. This means that we need to allow higher frequencies to come in the controller to turn the oscillation into a more square edge. These high frequencies are put in the system by adding the Kd.
![How the response changes with change in Kd](/engineering-education/pid-controllers-using-matlab/PID8.png)

![plot of final response and initial response](/engineering-education/pid-controllers-using-matlab/PID9.png)

The system stabilizes when the Kd is 8 and the Kp is 24. When we look at the response, the controller goes to 0.5 when our input requires it t be 1 since it was a unit step. Our control response went to 0.96 which is close to 1 but we are not going to get 1 unless we put some integration. This means we will also improve the Ki. We will use a similar way of adding used before to add the Ki. We observe that the red dots to 1 when we increase the Ki to 2. Since this is its required point, we will leave it at that.
![How response changes with changes in Ki](/engineering-education/pid-controllers-using-matlab/PID10.png)

![plot of final response and initial response](/engineering-education/pid-controllers-using-matlab/PID11.png)
Our PID controller is the final values of Kp, Ki, and Kd. We now use the PID function to get the Gc. when we type `Gc` in the command window, we get the transfer function.
![transfer function](/engineering-education/pid-controllers-using-matlab/PID12.png)
Below is the full code in order;
```matlab
%PID example

clear all
clc

num = [ 1 ];
den = [ 1 3 1];

Gp = tf(num, den);
H = [ 1 ];
M = feedback( Gp, H);
step(M)
hold on
grid on

%%
Kp = 24;
Ki = 2;
Kd = 8;

Gc = pid(Kp,Ki,Kd);

Mc = feedback(Gc*Gp, H);
step(Mc)
grid on
```
### Conclusion
Matlab helps in the analysis of the response and can be used to obtain a steady-state response as shown before. This helps to attain the optimum performance in a system which is the requirement of a system. This makes Matlab a special tool for the analysis of a system response. 
