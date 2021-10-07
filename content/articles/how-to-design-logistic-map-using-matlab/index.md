### How to design logistic map using Matlab
### Introduction
Let's say you want to model a population of rabbits if you have $X_k$ rabbits this year. How many rabbits will you have next year? The simplest model I can imagine is taking the population $X_k$ and multiplying it by the growth rate $\beta$. Let's say, for example, the growth rate is 2. It means that the population will double every year and the problem with that is the number of rabbits will grow exponentially forever. So here now, we add the term (1-x) to represent the constraints of the environment.

From the statement above, the logistic map is represented by the equation $X_{k+1}=\beta X_k(1-X_k)$. This map shows the behaviour of change from stable to chaotic as the parameters changes. Historically it has been one of the most important and classic systems during the early days of research on deterministic chaos. In this article, we will look at how to design a logistic map in Matlab

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

$X_{k+1}=\beta X_k(1-X_k)$ is the equation for the logistic map. This equation means that the value of `x` keeps changing depending on the rate of `k`.

### Matlab code for the logistic map
What we will do is to increase the value $\beta$ parameters. So we will go from 0 to 4. The first thing is to create a vector, `xvals`. What this does is store all the vectors values of the increasing size vector. It means that we will walk through the beta and simulate the dynamics and see where the points go. You should do this for all the increasing values of $\beta$. Next, create a script for this activity. It is done by clicking the `new` in the editor tab and selecting the new script.

When you create a new script, you use the `clear all` to clear all the stored values when running the script. We use `close all` to close all the editors and `clc` to clear the command window. We should include all these in the script.
```Matlab
clear all
close all
clc

xvals=[];
for beta = 0:0.01:4
beta;
```
Now what we are going to do is to initialize `x0` to `0.5`. After this, we want to know the steady-state behaviour. It means that we will take the initial condition and run it through a bunch of times to hit the steady state. We then store a few thousand of the steady-state values using the `for loop`. 
```Matlab
xold = 0.5;                        %initializing x

%transient
for i=1:2000
xnew=((xold-xold^2)*beta);
```
We then copy the new values of `xnew` to the `xold`.
```Matlab
xold=xnew;
end
```
What happens here is every time we find `xnew`, it is saved to `xold`, and that becomes the initial `x`. Thus, the process iterates over and over again 2000times as indicated in our `for` loop.

Since we don't want it to run through the 1000 iterations, we break it when it gets arbitrary close to itself. We then iterate the data to generate more data. 
```Matlab
xss=xnew;
for i=1:1000
xnew=((xold-xold^2)*beta);
xold=xnew;
```
We save the values. We save the $\beta$ and `x` values. This is done by;
```matlab
xvals(1,length(xvals)+1)=beta;
xvals(2,length(xvals))=xnew;
```
These two values form the matrix, with the $\beta$ values forming the first row while the `x` values form the second row. After having this matrix, we will create a scatter plot that will be the diagram of the logistic map. Since we don't want to have a boring solution that is just a fixed point and `xnew=xold`, we break it using the `if` statement.

if(abs(xnew-xss)<.001)
break
end
end
end
```
Now we can make a cool plot of these values, setting the gca color and the gcf color. `gca` simple means get the current axis and `gcf` means get the current figure and thats their functions. 
```matlab
plot(xvals(1,:), xvals(2,:), '.', 'LineWidth', .1, 'MarkerSize',1.2,...
'Color',[1 1 1])                   %the 1 1 1 vector represents white color
set(gca, 'color', 'k', 'xcolor', 'w', 'ycolor', 'w')
set(gcf, 'color', 'k')
```

![logistic map](map_one.png)

To add labels to our plot, we use the `label` function.
```matlab
xlabel('beta')
ylabel('x')
```
![fixed point](map_two.png)

Now, what we see is that as we increase `beta` from 0 to 1, there is a fixed point, and it is `x=0`. So what that means is that in our equation $X_{k+1}=\beta X_k(1-X_k)$, if `beta` is less than one, whatever your plugin for $x_k$ is going to go to zero. So it means that after that transient period, everything died out and went to zero, and we got that fixed point of 0.

When you increase `beta` from 1 to 3, you get a single fixed point that iterates and eventually converges at a point in the beta parameters and stays there for every future iteration. So when the beta is above 3, we get two solutions. What happens is that our `x` will bounce back and forth between the two solutions, and this is called the periodic orbit, where the population is bouncing back and forth for every generation.

![increasing the beta values](map_three.png)

Now, as we increase the beta more and more, we see that the period doubles, and we have four solutions. This point is the quasi period. As you increase beta even more, the system goes chaotic, and you get that interesting attractor where `x` is kinda spending a lot of time bouncing around the four regions.
Now let us remove the transient section(comment out) and plot to see what happens. Copy the `xold` and `xnew` below the section of iteration.
```Matlab
xnew = xold;
```

![excluding the transient section](map_four.png)

So we have this cool iteration. Essentially, after one iteration, `x` jumps to 0. Then, as beta increases, `x` jumps from 0 to each of the iterations.
As we have seen, it is easy to simulate the iterations using the `for` loop. You can get rid of the transient to see the steady-state behaviour. One of the interesting things is that this is a crude model for the population dynamics, and you can derive this. The reason as to why this is a good model for population dynamics is that from $x_{k+1}=\beta x_k$ and this would be like an exponential growth at some rate beta. Now you realize that the earth doesn't have infinite resources, so there is some carrying capacity, and if `x` gets large enough, we have the $(1-x_k)$ since 1 is the highest population the environment can hold.

![demonstration](map_five.png)

### Conclusion
A logistic map is for showing the chaotic behaviour of a given parameter within a given period. It makes it important to analyze the behaviour of a given parameter or population considering the carrying capacity of that environment. The advantage of this method is that it is easy to simulate and analyze. Also, Matlab makes the design of this map using the in-built functions. Thus, it helps to visualize this chaotic behaviour of that parameter of a period.
