### How to use symbolic maths toolbox in Matlab to analyze Fourier series
### Introduction
Symbolic math toolbox provides an easy, intuitive and complete environment to interactively learn and apply math operations such as calculus, algebra, and differential equations. It can also perform common analytical computation such as differentiation and integration to get close form results, simplify and manipulate expression for great insights and solve algebraic and differential equations. 
In this tutorial, the Fourier series is implemented and simulated using Symbolic Math's Toolbox of Matlab(Both forms of the Fourier series, Trigonometric and Exponential, are implemented). The proposed programs are versatile and can receive any function of time(t). It means the function is dependent on time. Moreover, the program gives plots of harmonics, original and approximated functions, magnitude spectrum, and phase spectrum. The advantage is that this toolbox is already available in Matlab. You can check [here] to understand more how the Fourier series works mathematically; you can check [here](https://www.mathsisfun.com/calculus/fourier-series.html).

### ### Prerequisites
To follow along with this tutorial, you will need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### Symbolic math toolbox
This toolbox has a wide range of applications:
1. You can use this toolbox to visualize analytical expressions in 2-D and 3-D and even animate plots to create videos from it.
2. Symbolic math in the live editor(mode in Matlab) lets you interactively update and display Symbolic math computations. Also, Matlab code formatted text, equations, and images can be published as executable live scripts, PDFs, or HTML documents. While working with analytical problems, you can get suggestions for the next step. These suggestions help you insert and execute function calls or live editor tasks directly into live scripts.
3. In addition to providing exact rational math, the Symbolic toolbox provides precision for higher or lower positions, allowing algorithms to run higher or lower than Matlab's in-built double. It also includes units for working with physical quantities and performing dimensional analysis.

![Units for working with physical quantities](/engineering-education/how-to-use-symbolic-math's-toolbox-in-Matlab-to-analyze-the-Fourier-series/symbolic-one.jpeg)
*This is an example of how this toolbox adds units for physical quantities*

4. This toolbox is widely applied in many engineering and scientific application such as optimization, where symbolic expressions of exact gradient and Hessians improves accuracy and speed of optimization.
5. In non-linear control design, the Symbolic toolbox improves recalculation speed at any operating point during execution. Furthermore, you can integrate symbolic results with Matlab and Simulink applications by converting symbolic expressions into numeric Matlab functions, Simulink, and Simscape blocks.

![converting functions to simulink](symbolic-two.jpeg.jpeg)
*Sample of function converted to Simulink*

Now, all these applications discussed above were to give you an insight into the wide application of this toolbox. However, not all of them are discussed here. Here, we will only major in using the toolbox to solve Fourier series problems.

### How to use the symbolic toolbox
This toolbox is enabled in Matlab using the function `syms`. If you have an expression `x=2*a+b`, and you try to execute it in Matlab, you get an error message *undefined function or variable 'a'* as shown below:
```Matlab
x = 2*a + b
```
Output

```Matlab
Undefined function or variable 'a'.
```
When using the `syms` function, the variable `x` is saved without the error message. The idea here is, when using the sSymbolic toolbox, you first define the symbolic variables. Symbolic variables are the undefined variables in an equation. For our expression above, our symbols are `a` and `b`, so we first define these variables using the symbolic function `syms`.
```Matlab
syms a b
```
After defining the symbols and rerunning the code above, our variables are stored. We will have:
```Matlab
syms a b
x = 2*a + b
```
Output:
```Matlab
x =
 
2*a + b
```

### Solving Fourier series using the symbolic toolbox
Let's say we have a Fourier transform shown below:

$$\int e^{(\frac{-t}{2})}u(t) e^{-jwt}dt$$

The symbol variables are t, w, T, and W, which we define by executing the command below:
```Matlab
syms t w T W
```
`t` is used to show differentiation with respect to time.
`w` is the angle theta.
`T` is the time function.
`W` is used to express the angular radians in the Fourier transform.

After declaration of the symbol variables, you can write the Fourier transform as shown below:
```Matlab
f = int(exp(-t/2)*exp(-j*w*t), t, [0, inf])
```
In Matlab, `int` is used to mean integration. In the expression in Matlab above:
`exp(-t/2)` is our equation which we are finding its Fourier transform. 
`exp(-j*w*t)` is the basic function of the Fourier transform.
`t` shows that we are differentiating with respect to time.
`[0, inf]` shows the integration limits from `0` to `infinity`.

> Note that we don't write `f(t)` when writing our equation in Matlab. It is because we already know that our function is a time function. Also, `t` is a symbol variable, so we do not write it in our expression.

When the above program is executed, we get the output below:
```Matlab
f =
 
2/(1 + w*2i) - (2*limit(exp(-t/2)*exp(-t*w*1i), t, Inf))/(1 + w*2i)
```
For formatting of this output to a user-friendly manner, we use a function pretty(). `pretty(f)` prints the symbolic expression `f` in a format that resembles type-set mathematical equations.
```matlab
 pretty(f)
           /             /   t \              \
           |    lim   exp| - - | exp(-t w 1i) | 2
    2      \ t -> Inf    \   2 /              /
-------- - --------------------------------------
1 + w 2i                  1 + w 2i
```
Now, we need to get the values of `w` since we use them to plot the Fourier transform. To get the values, we execute the code below:
```Matlab
f_sub = subs(f, w, [-pi: pi])
```
`subs` mean symbolic substitution. It means all the symbolic variables are substituted. This function replaces the symbolic variable in `f` with the values of `w`, which is in the range of `-pi` to `pi`. When we do this, we get the values below:
```Matlab
f_sub =
 
[ -2/(- 1 + pi*2i), 39614081257132168796771975168/383180597959374460738291811785 + 169674450797966737934326431744i/383180597959374460738291811785, 39614081257132168796771975168/123059858877705322463182898633 + 90446288283702400340782481408i/123059858877705322463182898633, 39614081257132168796771975168/21395444824564859375161886153 + 11218125769438062747238531072i/21395444824564859375161886153, 39614081257132168796771975168/78187355799953071474228774345 - 68010036744826274846305419264i/78187355799953071474228774345, 39614081257132168796771975168/293435591803869958760383563209 - 147238199259090612439849369600i/293435591803869958760383563209, 39614081257132168796771975168/667140152836315521233626252745 - 226466361773354950033393319936i/667140152836315521233626252745]
```
Now, we plot these values using the `plot()` function.
```Matlab
subplot(2, 1, 2);
plot(angle(double(f_sub)));   %angle are the w values.
title('phase spectrum')   % title
```
`plot(angle(double(data_value)))` gives the phase spectrum plot. The function `subplot()` is for making a subplot. The `title()` gives the plot a title.  

![phase spectrum](/engineering-education/how-to-use-symbolic-math's-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-three.png)
*Phase spectrum plot*

Now lets plot the magnitude response using the same values of `w`.
```Matlab
subplot(2, 1, 1); 
plot(abs(double(f_sub))); %magnitude spectrum plot
title('magnitude spectrum')
```
The code `plot(abs(double(data_values)))` gives the magnitude spectrum. This plot uses the absolute values of the data, thus `abs()`.

![magnitude spectrum](/engineering-education/how-to-use-symbolic-math's-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-four.png)
*Magnitude spectrum plot*

### Example 2
lets look at another example:
![example 2](/engineering-education/how-to-use-symbolic-math's-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-nine.jpeg)

We will have:
```Matlab
syms t w T W
f = int(1*exp(-j*w*t), t, [-T, T])
```
The output here is:
```Matlab
f =
 
(2*sin(T*w))/w
``` 
pretty(f) gives:
```Matlab
2 sin(T w)
----------
     w
```
Now, we find the values of `w` and then plot these values. To find the values of `w`, we use the `subs()` function.
```Matlab
f_sub = subs(f, T, 0.5)
 
f_sub =
 
(2*sin(w/2))/w     % the output after execution of the code above.
```
We are now plotting the absolute values of the variable `f-sub`.
```matlab
ezplot(abs(f_sub), [-pi: pi])
ezplot(abs(f_sub), [-2*pi: 2*pi])
ezplot(abs(f_sub), [-4*pi: 4*pi])
ezplot(abs(f_sub), [-8*pi: 8*pi])
```
The output is:

![Range of -pi to pi](/engineering-education/how-to-use-symbolic-math's-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-five.png)
*Plot for the range -pi to pi*

![Range of -2pi to 2pi](/engineering-education/how-to-use-symbolic-math's-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-six.png)
*Plot for the range -2pi to 2pi*

![Range of -4pi to 4pi](/engineering-education/how-to-use-symbolic-math's-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-seven.png)
*Plot for the range -4pi to 4pi*

![Range of -8pi to 8pi](/engineering-education/how-to-use-symbolic-math's-toolbox-in-matlab-to-analyze-the-fourier-series/symbolic-eight.png)
*Plot for the range -8pi to 8pi*

While making the plots, we used the `ezplot` function. `ezplot(FUN)` is used to plot function `x` over the default domain, `-2*pi<x<2*pi`.
As we have seen, the Symbolic toolbox makes it easy to analyze the Fourier series. It is because the toolbox has an algorithm for working out these problems. Moreover, it makes it easy since you do not have to write long codes. Also, using this toolbox is very easy such that anyone can use it.

### Conclusion
Symbolic toolbox is a very important toolbox in Matlab in solving differential and integration operations. As we have seen in solving the Fourier series above, it is easy to use. This toolbox also helps find the Laplace transform of various equations. Generally, this toolbox has a wide application in science and engineering.
Enjoy coding!


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

