---
layout: engineering-education
status: publish
published: true
url: /creating-movies-and-animations-using-matlab/
title: Creating movies and animations using Matlab
description: In this article, we will look at how you can create an animation using Matlab. We will also look at the various steps involved and use the Matlab in-built functions to make the activity simpler.
author: florence-atieno
date: 2021-10-17T00:00:00-04:47
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-movies-and-animations-using-matlab/hero.png
    alt: Creating movies and animations using Matlab Hero image
---

Animation is a series of still images one after another. If you show these images together in rapid succession, the brain interprets them as continuous fluid motion.
<!--more-->
The animation follows a similar workflow to that of creating a flip-flop book. A flip-flop book is a booklet with a series of images that gradually change from one page to the next.

When you view the pages quickly, the images appear to animate by simulating motion or some other change. Animation has a wide advantage and is widely used in the science and engineering field. It helps to bring ideas into real-life or give the context of the idea.

In this article, we will look at how you can create an animation using Matlab. We will also look at the various steps involved and use the Matlab inbuilt functions to make the activity simpler.

### Prerequisites
To follow along with this tutorial, you will need:
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

Animation in Matlab follows a workflow like that of creating a flipbook. The steps involved in creating an animation in Matlab are as follows:
1. Run a simulation or generate data.
2. Draw/render the scenario at some time `t_k`.
3. Take a snapshot of the scenario.
4. Advance time `t_k` to `t_(k+1)`.
5. Saving the movie.

Note that you have to repeat steps 2 to 4 to keep going through building one frame or one page in the flipbook one at a time and saving it to the large flipbook before proceeding to step 5.

### Matlab functions that can be important at each of the steps
#### 1. Run a simulation or generate a data
Maybe you have a fancy flight simulator that will run a scenario, kick out all this data, and save it to a file. So all you need here is to load the data. It means that You use the `load` function here. Also, if you are familiar with Simulink, you know that you can run a Simulink model from a Matlab script to generate data using the `sim` function.

#### 2. Drawing/ rendering the scenario at some point t_x
This deals with plotting or drawing one single frame of the animation. It means that you will use the plot functions such as `plot`, `plot3`, `surf`. A couple of things that can be helpful include the `hold on` function for complicated scenarios or animations. Also, it helps to draw many figures on the same plot. Because of jamming the `plot` function inside the `for` loop, you have to periodically wipe the slate clean after every time. In this, we use the `clf` function.

#### 3. Take a snapshot of the scenario
Once you have drawn one page of the flipbook, we want to grab that frame and save it into the large flipbook. Matlab has the function `get frame` for doing this.

#### 4. Advance time t*k to t*(k+1)
Like we said before, If we put the process inside a `for` loop or a `while` loop, the step is automatically handled. If you have data that you are simulating that is very temporally timely spaced, you might have tons of data.

You may not want to plot every single point of your data since that will be a very dense movie. So we will implement the logic of skipping some data and using the `continue` function for this.

#### 5. Saving the movie
To save the movie, we will use `VideoWriter` and `WriteVideo` functions.

### Example
We want to animate the trajectory of a point. Let us say we run some simulations or have some equations that generate the trajectory at some point in the space. The position vector describing where the point is located at any given `x`, `y`,`z` location given time `t` is:

$$
r(t)=\begin{cases} x(t)=5cos(t)\\y(t)=2sin(t)\\z(t)=t\end{cases}
$$

The range of `t` is from 0 to `2pi`. If you look at that position vector long enough, you will see that it describes the particle moving in the upward elliptical single helix.

### Implementation in Matlab
We create a script file for this and do the normal clearance of the workspace and the command window.

```matlab
%Illustration of animation using Matlab
clear
clc
clear all
```

Now let us work through the five steps. As we said earlier, the time is going to go through from 0 to `2*pi` and we will use 100 points for this.

#### Step 1
To generate 100 equally spaced points, we use the `linspace` function. We also define our `x`, `y`, and `z` positions.

```matlab
%% step 1: generate plot
t = linspace(0, 2*pi, 100);
x = 5*cos(t);
y = 2*sin(t);
z = t;
```

#### Step 2
We then start a new figure using `figure` functions and use a `for` loop to extract data at the current time.

```matlab
%% step2: Draw/render the scenario
figure

for k = 1:length(t)
%extract data at the current time
t_k = t(k);
x_k = x(k);
y_k = y(k);
z_k = z(k);
```

So that is the current location of the particle. Let us go ahead and plot this current location.

```matlab
%plot the current location of the particle
plot3(x_k, y_k, z_k, 'go', 'LineWidth', 3, 'MarkerSize', 15)
```

#### Step 3

To draw the entire trajectory, we execute the code below:

```matlab
%plot the entire trajectory
hold on
plot3(x,y,z, 'b-', 'LineWidth',2)
```

Let's add the title and the labels to our plot and set the viewpoint.

```matlab
%decorate the plot
grid on
xlabel('x')
ylabel('y')
zlabel('z')
title(['particle at t=', num2str(t_k), 'seconds'])

view([30 35])
```

Let us run the script and see what we have at this point.

![the plot](/engineering-education/creating-movies-and-animations-using-matlab/animation_one.png)

We noticed from the image above that Matlab plotted all the points because we had the `hold on` function that kept on plotting and plotting.

One of the things that we need to do is to make a change. Our expectation is not to plot all the points but to have a point moving on the spiral. Now let us wipe the slate clean so that every time we are plotting, it is on a blank figure.

#### Step 4
To do this, add the code below after the `k=length(t)` so that we have:

```matlab
for k = 1:length(t)
% wipe the slate clean, so we are plotting with a black figure
clf
```

If we run the code now, we will have:

![the plot](/engineering-education/creating-movies-and-animations-using-matlab/animation_two.png)

Surprisingly, this, too, didn't work. As we can see, it ended up drawing the very last image here, which is not what we expected. What we expect is a particle moving up a spiral. It did not happen because Matlab noticed that our plot command was inside a `for` loop.

Matlab is smart to realize that it will slow down if it draws every single image here in this loop. So it suppresses the plotting until you drop out of the loop and then render the very last seen.

Since that is not the behavior we need here, we will force Matlab to draw the image. We do this by using the `drawnow` function. This function forces Matlab to flush the graphics to plot this as it goes.

```matlab
% Force Matlab to draw the image at this point
drawnow
```

Let us now run the code:

![the animated plot](/engineering-education/creating-movies-and-animations-using-matlab/animation_three.png)

Now it seems reasonable. Or, we can use the `pause` function. This function takes the pause time as the argument.

```matlab
pause(0.2)     %It pauses for 0.2 seconds and continues
```

What we are doing now is watching flipbooks occur one time on our screen. This isn't exactly what we would like to do here because we want to save the flipbook.

Let us call the `getframe` function to force the graphics to render and return a bitmap or matrix of the values of the current figure. This function works as the `drawnow` function.

Comment out the `drawnow` and have the code below:

```matlab
% Force Matlab to draw the image at this point
% drawnow
movieVector = getframe;
end
```

When we run this program, every time it hits a point, it will grab the current picture and jam it into the variable `movieVector`. Thus, you will see a vector `movieVector` in the workspace when the program has completed running.

#### Step 5
The last step is saving the movie. We have a movie vector which is all our flipbook. We need to print it out as an actual `.mp4` file. We use a `videoWriter` function that Matlab uses to do a lot of video writing operations. The argument for this function is the name of the movie and, in our case, `curve`.

```matlab
%% Save the movie
myWriter = VideoWriter('curve');
```

Now, let's go ahead and change the parameter, e.g. frame rate

```matlab
myWriter.FrameRate = 20;    %movie to play at 20frames per second.
```

We now need to open the video writer, write the movie, and close the file.

```matlab
open(myWriter);
writeVideo(myWriter, movieVector);    %It generates a .avi video and saves it in your drive.
close(myWriter);
```

To locate your file, you look at the current folder in Matlab and locate it on your device and play it. In case your device cannot open a .avi file, there is an alternative for this. The alternative is specifying `.mp4` to the `videoWriter` function, as shown below:

```matlab
myWriter = VideoWriter('curve', '');
```

### Conclusion
Matlab provides a better environment for performing the animations because of the in-built functions that makes this process quicker. Also, Matlab is very smart and performs specific operations automatically.

These operations are such as data generation. Movies and animations can be performed for more complex operations in the field of science. It helps to visualize the ideas in the field of science.

I hope this tutorial helps you create movies and animations using Matlab. Happy coding.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
