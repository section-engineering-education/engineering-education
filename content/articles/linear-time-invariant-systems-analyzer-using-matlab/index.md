---
layout: engineering-education
status: publish
published: true
url: /linear-time-invariant-systems-analyzer-using-matlab/
title: How to Implement Linear Time Invariant System Analyzer using MATLAB Graphical User Interface 
description: This article will be an introduction to Linear Time Invariant systems. We will build an linear time invariant system analyzer using Matlab along with a simple graphical user interface.
author: florence-akinyi
date: 2022-01-03T00:00:00-16:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/linear-time-invariant-systems-analyzer-using-matlab/hero.jpg
    alt: Linear Time Invariant (LTI) System Analyzer MATLAB Graphical User Interface (GUI) Hero Image
---
Linear Time Invariant (LTI) systems are a significant part of the signal processing toolbox that defines the action of a physical system on the signal.
<!--more-->
Filters are examples of the LTI systems. In this system, the input is called the "Excitation", and the corresponding output is the "Response". The basic principle of such a system is linearity and time invariance.

When you combine all the inputs and their corresponding outputs, it's linearity. When the system depends on the time, but not on the time function, it is time invariance. A graphical user interface (GUI) associates the user and the system without having to know what the system entails. It abstracts the functionality of the system, thereby acting as an interface for navigating.

In this tutorial, we will create an LTI system analyzer with a simple GUI. The analyzer should be capable of analyzing time, impulse, and ramp response. It will also make bode plots, magnitude plots, and pole-zero plots.

### Prerequisites
To follow along with this tutorial, you'll need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- A good understanding of [MATLAB basics](/engineering-education/getting-started-with-matlab/).
- [Getting started with a graphical user interface](/engineering-education/matlab-graphical-user-interface/) in MATLAB.

### Time invariance
Time invariance is a principle of LTI stating that if the output of `x(t)` is `y(t)`, then the output due to delayed output `x(t-T)` is also delayed by the time `T`. It means that the property of the signal does not change with time. Systems that follow linearity and time invariance (do not change with time) are known as LTI systems.

By plotting a graph of the input and output graph, if we get a straight line, we call it Linearity.
LTI systems are characterized entirely by a single function called the system's impulse response. The system impulse response is the response of an LTI system for a unit signal input at applied at `t=0`. 

It is represented by `h(t)` for [continuous wavelet transform](https://en.wikipedia.org/wiki/Continuous_wavelet_transform) `cwt` and by `h(n)` for the [discrete-time systems](https://engineering.purdue.edu/VISE/ee438L/lab2/pdf/lab2.pdf). A continuous wavelet transform is a tool used for the overcomplete representation of signals by letting the wavelets vary continuously where the wavelets are just signals that begin from zero.

Discrete-time systems take discrete-time signals in and give discrete-time signals as output. A Discrete-time signal is a time series consisting of a sequence of quantities.

![LTI systems](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image1.png)

For any input `x(t)` or `x(n)`, the output can simply be obtained by convolution of input and the impulse response `h(t)` or `h(n)` as shown:

```bash
y(t)=x(t).h(t)......equation 1
y(n)=x(n)*h(n)......equation 2
```

- `Equation 1` can be represented in the frequency domain by [Laplace transform](https://en.wikipedia.org/wiki/Laplace_transform) to give `equation 3`.
- We replace the time function `t` with `s` for the Laplace transform, giving `equation 3`.
- For `equation 2`, we represent it to the [z-transform](https://en.wikipedia.org/wiki/Z-transform) to give `equation 4` as shown below:

```bash
Y(s)=X(s).H(s)........equation 3
Y(z)=X(z).H(z)........equation 4
```

Laplace transform is the integral transform of the given derivative function with real variable `t` to convert into a complex function with variable `s`. When you take the Laplace transform of `equation 2`, the convolution of both the equations above becomes multiplication.

Convolution is the addition of two signals to form a third signal. This is how your complicated convolution becomes the easy multiplication in the frequency domain. To understand more about Laplace transform, you can refer to [here](https://byjus.com/maths/laplace-transform/).

From `equation 3`, we can find the ratio of `Y(s)` and `X(s)` as shown:

$H(s)=\frac{Y(s)}{X(s)}=\frac{laplace(y(t))}{laplace(x(t))} $

If all the initial conditions are set to zero, then it is called the "Transfer function" of the LTI system, and the inverse laplace transform of the transfer function $L^{-1}{H(s)}$ is the impulse response `h(t)` of the LTI system.

For discrete systems, we have:

$H(z)=\frac{Y(z)}{X(z)}=\frac{z-transform ({y(n)})}{z-transform ({x(n)})}$

Analysis of LTI systems is easy, and transfer function plays an important role. Roots of the numerator of a transfer function are called `zeros` of systems, and roots of the denominator are the `poles` of the system.

The poles and the zeros are useful in the systems stability, analysis, and time response behavior of the LTI systems. The transfer function is utilized to analyze the time domain behavior frequency-domain behavior of the systems.

### Various analyses of LTI systems
There are various analyses performed on LTI systems. 

Some basic analyses are shown below:

![various analysis of LTI systems](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image2.png)

If we consider the time domain, we have the three analyses:
1. Time response
2. Error analysis
3. Stability analysis

We consider the output response for each input when analyzing time response. For example, if you give impulse response as input, you get impulse response as the output. Similarly, to step and ramp response.

We consider the steady-state error/error coefficients for error analysis, concentrating on the root locus for stability.

Considering the frequency domain, we have:

![frequency domain](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image3.png)

### Matlab GUI to implement basic LTI system analysis
Our objective is to develop a GUI in Matlab to implement the following analysis of any LTI system:
- **Impulse response** - is the response of an LTI system for a unit signal input applied at `t=0`.
- **Step response** - is the time behavior of the outputs of a general system when its inputs change from zero to one in a very short time.
- **Ramp response** - represents the constant change in the input. For example, if the velocity increases with a constant acceleration, then it is a ramp response.
- **Frequency response** (bode magnitude and phase plot) - is the representation of the range of frequencies produced.
- **Root locus plot** - shows how the close loop poles vary with system parameters.
- **Nyquist plot** - is a plot that shows the relationship between the feedback and the gain. A gain is a relationship between the output and the input at a steady state.
- **Log magnitude vs. Phase plot** - A log plot is the plot of the gain as a function of the frequency, while the phase plot is the phase plot that shows how the phase shift develops when the source frequency starts to enter the cutoff region. 

![glimpse of the gui](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image4.png)

The above GUI image is a sample of what we are going to build using Matlab. The axes show the plot. When you enter the numerator and the denominator and press the push button `find TF`, the transfer function is displayed below the push button.

The transfer function is defined as the ratio of the Laplace transform of the output variable to the Laplace transform of the input variable, assuming all initial conditions to be zero. Laplace transform transforms a signal to a complex plane `s`. It then plots any plot type selected by the user.

> In the numerator and denominator edit box, only enter the coefficient of your function.

For example, if we have the function as $\frac{s+25}{s^2+5s+25}$, we enter `1` and `25` in that edit box, and that of denominator will be `1`, `5`, and `25`.

The figure below shows the expected behavior:

![find TF](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image5.png)

When we click `find TF`, we expect the results above:

![output](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image6.png)

### Creating GUI
To open the guide, we execute the command `guide` on the command window and open a blank GUI.

You can read more about the MATLAB GUI [here](/engineering-education/matlab-graphical-user-interface/). It is highly recommended to read through this article since it introduces you to building a GUI and explains various functions that are used for building them.

This GUI comprises static texts, axes, edit texts, pushbuttons, radio buttons, button groups, and text fields. Place your components such that your GUI appears as shown below:

![component arrangement](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image7.png)

Double-click the component to add the labels and the tags for each component, and a new window `property inspector` as shown below:

![property inspector](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image8.png)

This property inspector enables you to modify/edit the properties of various components according to the desired values.

While doing this, ensure you take note of the tag of each component. This tag is used to link the GUI and the components.

> Note that you can change this tag to anything you wish as long as you can easily remember them.

The string of the components can be the same, but the tags should be unique since the callbacks functions are identified using tags.

Callback functions are the codes that render the functionality of the codes. After adding all the component labels, click the `run` icon on the top of your GUI to give you the final layout, as shown below:

![final layout](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image9.png)

When you click the run icon, Matlab autogenerates a script containing the GUI code. This autogenerated code is where we are writing the callback for our components.

> We only add codes to the callback section, not the CreateFcn.

![callback section](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image10.png)

Now, if you carefully look at the generated codes, you'll realize that we have the callback functions for all components, except for radio buttons and the button group. This is because Matlab, by default, does not generate callback for radio buttons and button group, but you can create them.

To do this, go back to the GUI layout and right-click on the button group, and select the `view callback`. It opens a new selection and on this new selection, select `selectionChangedFcn`.

![creating callback for radio buttons](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image14.png)

When you do this, Matlab writes the callback for the components.

### Codes for various callback functions
### Edit1 and edit2 callback (Enter the numerator, enter the denominator)
To locate the component's callback, go to the layout in the GUI, select the component, and right-click on it. Then, select the `view callback` and click on `callback`. This way it takes you directly to the component's callback in the generated code:

```Matlab
num = textscan(get(hObject, 'string'), '%f');
handles.num=cell2mat(num);
guidata(hObject, handles)
```

- Whatever is written in the edit box is a `string`, but they are read as a number using the `%f`. The `textscan` function stores the inputs into the `num` variable. 
- The `num` is a cell array, but we convert it to a matrix using the `cell2mat` function. Because it has to be used among the various callbacks, it should be available across the callbacks; thus, we have `handles.num`. 
- We then update the `hObject` and the `handles` using `guidata(hObject, handles)`

This code is similar to that of `editbox2`. They all perform a similar function of getting the input from the user:

```Matlab
den = textscan(get(hObject, 'string'), '%f');
handles.den=cell2mat(den);
guidata(hObject, handles)
```

We only change the variable from `num` to `den`, since we accept a value for the denominator.

### Pushbutton1 (Find TF)
When you press this button, the transfer function should be displayed in the `text6` box. The callback is:

```matlab
sys=tf(handles.num, handles.den);
handles.sys=sys;
T=evalc('sys');
set(handles.text6, 'String', T);
```

- The transfer function is calculated using the `tf` function in Matlab. This function takes in the numerator `handles.num` and the denominators `handles.den` as the arguments. 
- The `tf` is stored in the `sys` variable. Now, this `sys` is evaluated in string form using the `eval('sys')`. We then display the string to the text area using the `set function` and string form.

### Uibuttongroup1_SelectionChangedFcn (Select Plot Types)
```matlab
switch get(eventdata.NewValue, 'Tag')   %Get tag of the selected object.
    case 'radiobutton1'
        handles.response = '1';
    case 'radiobutton2'
        handles.response = '2';
    case 'radiobutton3'
        handles.response = '3'; 
    case 'radiobutton4'
        handles.response = '4';
    case 'radiobutton5'
        handles.response = '5';
    case 'radiobutton6'
        handles.response = '7';
    case 'radiobutton8'
        handles.response = '8'; 
end
guidata(hObject, handles);
```

Here, we are using a `switch` control statement based on `get(eventdata.NewValue, 'Tag')` that assigns the respective radio buttons strings based on the tag. Then, you update the handles.

### Pushbutton2 (Compute)
Here, we use the `switch` control statement to write the response of each plot type.

```matlab
switch handles.response
    case '1'
        cla;
        tx=length(impulse(handles.num, handles.den));
        t=0:tx-1; ft=zeros(1,tx);   %create zero line
        impulse(handles.num, handles.den); 
        hold on
        plot(t, ft, 'r')
        hold off;
        grid;
```

`switch handles.response` gives the expected output.

For example, if the user chooses `1` which is the impulse response, then that is the output that they should get.
- `cla` clears the axes.
- `tx` takes in the numerator and the denominator
- Compute the response using the `impulse` function.

```matlab       
    case '2'
        cla;
        tx=length(step(handles.num, handles.den));
        t=0:tx-1; ft=zeros(1,tx);   %create zero line
        step(handles.num, handles.den); 
        hold on
        plot(t, ft, 'r')
        hold off;
        grid;
```

This code is similar to that of case one. The only difference is instead of using the `impulse` function, we used the `step` since it is a step response.

Case 3 is for the ramp response. Now, Matlab has no inbuilt function for calculating this. But, we can get it from the step response. This is possible by multiplying the `den` by $\frac{1}{s}$ then finding the transfer function of this modified function.

```matlab
    case '3'
        cla;
        [~, t0]=step(tf(handles.num, handles.den));
        T=t0(end);
        den1=[handles.den 0];
        [y, t]=step(tf(handles.num, den1));
        I=find(t==T);
        plot(t(1:I), t(1:I), t(1:I), 'r'); 
        xlim([0, T]);
        title('Ramp Response');
        xlabel('Time(seconds)');
        ylabel('Amplitude');
        grid;
```

`step(tf(handles.num, handles.den))` gives us the first step response of our function using the `step` function. This response is then initialized by `T=t0` since we use it to find the second step response (ramp).

Using the denominator of our first step response function, we get the second transfer function `[y, t]=step(tf(handles.num, den1))` and then plot the output using the `plot` function.

```matlab
    case '4'
        cla;
        bode(handles.num, handles.den);
        grid
```

In the case above, we are finding the frequency response with the help of the `bode` function. We pass the numerator and the denominator, giving the frequency response.

`case 5` is for the locus response. Matlab has an inbuilt function `rlocus` for computing it.

```matlab 
    case '5'
        cla
        rlocus(handles.num, handles.den);
        axis equal
```

Both `case6` (nyquisit) and `case7` (nichols plot) have inbuilt functions for executing them:

```matlab 
    case '6'
        cla;
        nyquist(handles.num, handles.den); 
        axis equal
    case '7'
        cla;
        nichols(handles.num, handles.den);
        grid;
```

`Case8` is the pole-zero plot. Here, we use the `pzmap` function. Matlab's default `pzmap` creates a very dull-looking plot. This is because the markers are small and are difficult to see and so we modify their plots.

```matlab
    case '8'
        cla;
        sys=tf(handles.num, handles.den);
        pzmap(sys);
        h=findobj(gca, 'Type', 'Line');
        h(2).LineWidth=3; h(2).MarkerSize=15; h(2).Color='b';
        h(3).LineWidth=3; h(3).MarkerSize=20; h(2).Color='r';
end
guidata(hObject, handles);
```

We have modified the marker colors `h(2).Color='b'` and `h(2).Color='r'` to differentiate. We also make the marker sizes large `h(2).MarkerSize=15`. `pzmap` is an inbuilt function that uses the transfer function as the argument.

> Before running your program, these callbacks have to be inserted in their respective callbacks.

You can find the full code [here](https://github.com/florenceakinyi/lti).

Now, let's test the functionality of our program using the function below:

$$\frac{s + 25}{s^2+2s+25}$$

In the inputs for the numerator, we have 1 and 25, and for the denominator, we have 1, 2, and 25.

When you click on the `Find TF`, we see the transfer function displayed as shown below:

![displaying transfer function](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image11.png)

When you select, for example, impulse response and press the `compute` button, we see the plot is displayed in the axes. You can do this for other plot types.

![output](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image12.png)

If you choose bode plot, you will have:

![bode plot](/engineering-education/linear-time-invariant-systems-analyzer-using-matlab/image13.png)

For more details on the LTI systems, you can check [here](https://allsignalprocessing.com/lessons/introduction-to-linear-time-invariant-systems/).

### Conclusion
In this tutorial, we learned to analyze LTI systems easily by just inputting the numerator and the denominators. Also, it can help you when doing some numerical analysis and use it for verifying your answers.

Furthermore, the numerous in-built Matlab functions make the creation of this GUI easier.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

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