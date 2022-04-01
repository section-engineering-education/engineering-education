---
layout: engineering-education
status: publish
published: true
url: /how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/
title: How to use the Symbolic Math Toolbox in MATLAB to analyze the Fourier series
description: In this article, we will use the Symbolic Math Toolbox in MATLAB to analyze the Fourier series.
author: linet-achieng
date: 2022-03-02T00:00:00-11:42
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/hero.jpg
    alt: How to use the Symbolic Math Toolbox in MATLAB to analyze the Fourier series hero image
---
Symbolic Math Toolbox provides an easy, intuitive and complete environment to interactively learn and apply math operations such as calculus, algebra, and differential equations.

<!--more-->

It can perform common analytical computations such as differentiation and integration to get close form results.

It simplifies and manipulates expression for great insights and solves algebraic and differential equations.

In this tutorial, the Fourier series (Trigonometric and Exponential) is implemented and simulated using MATLAB's Symbolic Math Toolbox. 

The proposed programs are versatile and can receive any function of time(t). It means that the function is dependent on time. 

Moreover, the program gives plots of harmonics, original and approximated functions, magnitude spectrum, and phase spectrum. 

This toolbox is already available in MATLAB. Therefore, you do not need to retrieve it from an external source. For example, to understand more about the Fourier series, you can read [here](https://www.mathsisfun.com/calculus/fourier-series.html).

### Prerequisites
To follow along with this tutorial, you will need:
1. [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
2. A proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### Symbolic Math Toolbox
This toolbox has a wide range of applications:

To visualize analytical expressions in 2D and 3D and animate plots to create videos.

Symbolic Math Toolbox in the *live editor* (mode in MATLAB) lets you interactively update and display Symbolic math computations. 

Besides, MATLAB code, formatted text, equations, and images can be published as executable live scripts, PDFs, or HTML documents. 

While working with analytical problems, you can receive suggestions and tips. These suggestions help one insert and execute function calls or tasks directly into live scripts.

The Symbolic Math Toolbox also provides precision for higher or lower positions. It allows algorithms to run better than MATLAB's in-built double. Furthermore, it has units for working with physical quantities and performing dimensional analysis.

![Units for working with physical quantities](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-one.jpeg)

*This is an example of how this toolbox adds units for physical quantities*

Symbolic Math Toolbox is widely applied in many engineering and scientific applications. Symbolic expressions of exact gradient and Hessians improve accuracy and optimization speed.

In non-linear control design, the Symbolic Math Toolbox improves recalculation speed at any operating point during execution. Furthermore, you can integrate symbolic results with MATLAB and Simulink applications. It is done by converting symbolic expressions into numeric MATLAB functions, Simulink, and Simscape blocks.

![converting functions to Simulink](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-two.jpeg.jpeg)

*Sample of function converted to Simulink*

Now, all these applications discussed above were to give you an insight into the wide application of this toolbox. However, not all of them are discussed here. Here, we will only major in using the toolbox to solve Fourier series problems.

### How to use the Symbolic Math Toolbox
This toolbox is enabled in MATLAB using the function `syms`. However, you get an error message if you have the expression `x=2*a+b` and try to execute it in Matlab. The error message is *undefined function or variable 'a'* as shown below:

```MATLAB
x = 2*a + b
```
Output:

```MATLAB
Undefined function or variable 'a'.
```
When using the `syms` function, the variable `x` is saved without the error message. When using the Symbolic Math Toolbox, the idea here is that you first define the symbolic variables. Symbolic variables are the undefined variables in an equation. For example, our symbols are `a` and `b` for our expression above. We first define these variables using the symbolic function `syms`.

```MATLAB
syms a b
```
After defining the symbols and rerunning the code above, our workspace stored our variables. We will then have:

```MATLAB
syms a b
x = 2*a + b
```
Output:

```MATLAB
x =
 
2*a + b
```

### Solving Fourier series using the Symbolic Math Toolbox
Let's say we have a Fourier transform shown below:

$$\int e^{(\frac{-t}{2})}u(t) e^{-jwt}dt$$

The symbolic variables are `t`, `w`, `T`, and `W`, which we define by executing the command below:

```MATLAB
syms t w T W
```
`w` is the angle theta, `T` is the time function, and `W` is used to express the angular radians in the Fourier transform.

After the declaration of the symbolic variables, you can write the Fourier transform as shown below:

```MATLAB
f = int(exp(-t/2)*exp(-j*w*t), t, [0, inf])
```
In MATLAB, `int` means integration. In the MATLAB expression above:
`exp(-t/2)` is our equation which we are finding its Fourier transform. 
`exp(-j*w*t)` is the basic function of the Fourier transform.
`t` shows that we are differentiating with respect to time.
`[0, inf]` shows the integration limits from `0` to `infinity`.

> Note that we don't write `f(t)` when writing our equation in MATLAB. It is because we already know that our function is a time function. Also, `t` is a symbol variable, so we do not write it in our expression.

When the above program is executed, we get the output below:

```MATLAB
f =
 
2/(1 + w*2i) - (2*limit(exp(-t/2)*exp(-t*w*1i), t, Inf))/(1 + w*2i)
```
To format this output in a user-friendly manner, we use the function `pretty()`. `pretty(f)` prints the symbolic expression `f` in a format that resembles type-set mathematical equations. When you execute this function in the command window, we have:

```MATLAB
 pretty(f)
 ```
 Output
 ```matlab
           /             /   t \              \
           |    lim   exp| - - | exp(-t w 1i) | 2
    2      \ t -> Inf    \   2 /              /
-------- - --------------------------------------
1 + w 2i                  1 + w 2i
```

Now, we need to get the values of `w` since we use them to plot the Fourier transform. To do that, execute the code below:

```MATLAB
f_sub = subs(f, w, [-pi: pi])
```

`subs` mean symbolic substitution. This function replaces the symbolic variable in `f` with the values of `w`. The values range from `-pi` to `pi`. When we do this, we get the values below:

```MATLAB
f_sub =
 
[ -2/(- 1 + pi*2i), 39614081257132168796771975168/383180597959374460738291811785 + 169674450797966737934326431744i/383180597959374460738291811785, 39614081257132168796771975168/123059858877705322463182898633 + 90446288283702400340782481408i/123059858877705322463182898633, 39614081257132168796771975168/21395444824564859375161886153 + 11218125769438062747238531072i/21395444824564859375161886153, 39614081257132168796771975168/78187355799953071474228774345 - 68010036744826274846305419264i/78187355799953071474228774345, 39614081257132168796771975168/293435591803869958760383563209 - 147238199259090612439849369600i/293435591803869958760383563209, 39614081257132168796771975168/667140152836315521233626252745 - 226466361773354950033393319936i/667140152836315521233626252745]
```

We now plot these values using the `plot()` function.

```MATLAB
subplot(2, 1, 2);
plot(angle(double(f_sub)));   %angle are the w values.
title('phase spectrum')   % title
```
`plot(angle(double(data_value)))` gives the phase spectrum plot. The function `subplot()` is used to create a subplot. `title()` gives the plot a title.  

![phase spectrum](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-three.png)

*Phase spectrum plot*

Now, let us plot the magnitude response using the same values of `w`.

```MATLAB
subplot(2, 1, 1); 
plot(abs(double(f_sub))); %magnitude spectrum plot
title('magnitude spectrum')
```

The code `plot(abs(double(data_values)))` gives the magnitude spectrum. This plot uses the absolute values of the data, thus `abs()`.

![magnitude spectrum](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-four.png)

*Magnitude spectrum plot*

### Example 2
Let's look at another example:

![example 2](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-nine.jpeg)

We will have:

```MATLAB
syms t w T W
f = int(1*exp(-j*w*t), t, [-T, T])
```

The output here is:

```MATLAB
f =
 
(2*sin(T*w))/w
``` 

`pretty(f)` gives:

```MATLAB
2 sin(T w)
----------
     w
```

To find the values of `w`, we use the `subs()` function.

```MATLAB
f_sub = subs(f, T, 0.5)
```

The output is:

```MATLAB
f_sub =
 
(2*sin(w/2))/w     % the output after execution of the code above.
```

After that, we plot the absolute values of the variable `f-sub`.

```MATLAB
ezplot(abs(f_sub), [-pi: pi])
```
Output is:

![Range of -pi to pi](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-five.png)

*Plot for the range -pi to pi*

```MATLAB
ezplot(abs(f_sub), [-2*pi: 2*pi])
```

![Range of -2pi to 2pi](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-six.png)

*Plot for the range -2pi to 2pi*

```MATLAB
ezplot(abs(f_sub), [-4*pi: 4*pi])
```

![Range of -4pi to 4pi](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-seven.png)

*Plot for the range -4pi to 4pi*

```MATLAB
ezplot(abs(f_sub), [-8*pi: 8*pi])
```

![Range of -8pi to 8pi](/engineering-education/how-to-use-symbolic-math-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-eight.png)

*Plot for the range -8pi to 8pi*

While making the plots, we used the `ezplot` function. `ezplot(FUN)` is used to plot a function `x` over the default domain, `-2*pi<x<2*pi`.
As we have seen, the Symbolic Math Toolbox makes it easy to analyze the Fourier series. Moreover, it makes it easy since you do not have to write long codes.

### Conclusion
Symbolic Math Toolbox is an important toolbox for solving differential and integration operations. As we have seen in solving the Fourier series above, it is easy to use. This toolbox also helps find the Laplace transform of various equations. Generally, this toolbox has a wide application in science and engineering.

Enjoy coding!
---
Peer Review Contributions by: [Sandra Moringa](/engineering-education/authors/sandra-moringa/)


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

