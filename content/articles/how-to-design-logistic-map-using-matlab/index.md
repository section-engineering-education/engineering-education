---
layout: engineering-education
status: publish
published: true
url: /how-to-design-logistic-map-using-matlab/
title: How to Design Logistic Maps using Matlab
description: This tutorial introduces reader to basic concepts of logistics maps design patterns using Matlab. A logistic map is a polynomial mapping of degree two. This equation is used to show the chaotic behaviour that can arise from a simple non-linear dynamical equation.
author: simon-mwaniki
date: 2021-10-19T00:00:00-11:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-design-logistic-map-using-matlab/hero.jpg
    alt: Matlab logistics map image
---
A logistic map is a polynomial mapping of degree two. This equation is used to show the chaotic behaviour that can arise from a simple non-linear dynamical equation. From the statement above, the logistic map is represented by the equation:
<!--more-->

$X_{k+1}=\beta X_k(1-X_k)$. 

Where:
$X_{k+1}$ is the number of species in one year.

$X_k$ is the number of species at a particular time.

$\beta$ is the carrying capacity.

This equation means that the value of `x` keeps changing depending on the rate of `k`. Historically it has been one of the most important and classic systems during the early days of research on deterministic chaos. 

This map, despite the simplicity, exhibits some form of complexity. In this article, we will look at how to design a logistic map in Matlab. What we are basically doing here is seeing the effect of the population growth considering the carrying capacity of that given environmemt.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Matlab code for the logistic map
The equation of logistic map as we mentioned earlier is $X_{k+1}=\beta X_k(1-X_k)$. This equation is intended to capture two effects, that is, reproduction and starvation. In reproduction, the growth rate increases proportionally to the initial population, and in this case, the population is small. 

On the starvation side, the population growth rate decreases proportionally to the carrying capacity of the environment. Carrying capacity is the total population that the resources in a given environment can support. 

Basically, here we increase the value $\beta$ parameters. The first thing we do is to create a vector, `xvals`. What this does is store all the vectors values of the increasing size vector. 

It means that we will walk through the $\beta$ and simulate the dynamics and see where the points go. Next, create a script for this activity. It is done by clicking the `new` in the editor tab and selecting the new script.

When you create a new script, you use the `clear all` to clear all the stored values when running the script. Also, we use `close all` to close all the editors and `clc` to clear the command window. 

We should include all these in the script.

```Matlab
clear all
close all
clc

xvals=[];
for beta = 0:0.01:4
beta;
```

Now what we are going to do is to initialize `x0` to `0.5`. After this, we want to know the steady-state behaviour. It means that we will take the initial condition and run it through many times to hit the steady-state. 

We then store a few thousand of the steady-state values using the `for loop`. 

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

What happens here is every time we find `xnew`, it is saved to `xold`, and that becomes the initial `x`. Thus, the process iterates over and over again 2000 times as indicated in our `for` loop.

Since we don't want it to run through the 1000 iterations, we break it when it gets arbitrary close to itself. We then iterate the data to generate more data.

```Matlab
xss=xnew;
for i=1:1000
xnew=((xold-xold^2)*beta);
xold=xnew;
```

We save the values. We save the $\beta$ and `x` values. 

This is done by;
```matlab
xvals(1,length(xvals)+1)=beta;
xvals(2,length(xvals))=xnew;
```

These two values form the matrix, with the $\beta$ values forming the first row while the `x` values form the second row. After having this matrix, we will create a scatter plot that will be the diagram of the logistic map. 

Since we don't want to have a boring solution that is just a fixed point and `xnew=xold`, we break it using the `if` statement.

```matlab
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

![logistic map](/engineering-education/how-to-design-logistic-map-using-matlab/map-one.png)

To add labels to our plot, we use the `label` function.
```matlab
xlabel('beta')
ylabel('x')
```

![fixed point](/engineering-education/how-to-design-logistic-map-using-matlab/map-two.png)

Now, what we see is that as we increase `beta` from 0 to 1, there is a fixed point, and it is `x=0`. So what that means is that in our equation $X_{k+1}=\beta X_k(1-X_k)$, if `beta` is less than one, whatever your plugin for $x_k$ is going to go to zero. 

This means that after that transient period, everything died out and went to zero, and we got that fixed point of 0. When you increase `beta` from 1 to 3, you get a single fixed point that iterates and eventually converges at a point in the beta parameters and stays there for every future iteration. 

So when the beta is above 3, we get two solutions. What happens is that our `x` will bounce back and forth between the two solutions, and this is called the periodic orbit, where the population is bouncing back and forth for every generation.

![increasing the beta values](/engineering-education/how-to-design-logistic-map-using-matlab/map-three.png)

Now, as we increase the beta more and more, we see that the period doubles, and we have four solutions. This point is the quasi period. 

As you increase beta, even more, the system goes chaotic, and you get that interesting attractor where `x` is spending a lot of time bouncing around the four regions.

Now let us remove the transient section (comment out) and plot to see what happens. Copy the `xold` and `xnew` below the section of iteration.

```Matlab
xnew = xold;
```

![excluding the transient section](/engineering-education/how-to-design-logistic-map-using-matlab/map-four.png)

So we have this cool iteration. As beta increases, `x` jumps from 0 to each of the iterations.

As we have seen, it is easy to simulate the iterations using the `for` loop. You can get rid of the transient to see the steady-state behaviour. One of the interesting things is that this is a crude model for the population dynamics, and you can derive this. 

The reason why this is a good model for population dynamics, is that from $x_{k+1}=\beta x_k$ and this would be like an exponential growth at some rate beta. 

Now you realize that the earth doesn't have infinite resources, so there is some carrying capacity, and if `x` gets large enough, we have the $(1-x_k)$ since 1 is the highest population the environment can hold.

![demonstration](/engineering-education/how-to-design-logistic-map-using-matlab/map-five.jpg)

### Conclusion
A logistic map is used when showing the chaotic behaviour of a given parameter within a given period. It makes it important to analyze the behaviour of a given parameter or population considering the carrying capacity of that environment. 

The advantage of this method is that it is easy to simulate and analyze. Also, Matlab makes the design of this map using the in-built functions. Thus, it helps to visualize this chaotic behaviour of that parameter of a period.

Happy coding!

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
