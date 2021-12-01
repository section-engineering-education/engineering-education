### How to implement Linear Time Invariant(LTI) systems analyzer using Matlab Graphical User Interface(GUI)
### Introduction
LTI are systems that give output from a given input. In this system, the input is known as the excitation, while the output is the response. These systems follow linearity and time invariance. Linear systems are those that follow homogeneity and superposition principles. If we have an input x(t) that gives an output y(t), that system is called homogeneity. Also, if we have an output y_1(t) for input x_1(t) and y_2(t) for input x_2(t), this is the principle of superposition. If both are combined, the input ax_1(t) + ax_2(t) gives a corresponding output as ay_1(t) + ay_2(t).

A graphical user interface is how the user interacts with the electronic devices through visual indicators. Matlab is software that allows the implementation of various systems using a user interface. In this tutorial, we will see how to implement GUI using Matlab to analyze any LTI systems. The GUI can show the various time response curves such as tap response, impulse response, and ramp response. It can also show you stability curves such as root locus, bode plots, log magnitude curve, and pole-zero plot. We will see how to do all these using GUI in Matlab.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- [Proper understanding](https://www.section.io/engineering-education/getting-started-with-matlab/) of MATLAB basics.
- [Getting started with graphical user interface](https://www.section.io/engineering-education/matlab-graphical-user-interface/) in Matlab.

### Time invariance
This principle of LTI states that if the output x(t) is y(t), then the output due to delayed output x(t-T) is also delayed by the time T. It means that the property of the signal does not change with time. Systems that follow linearity and time invariance are known as LTI systems.
LTI systems are characterized entirely by a single function called the system's impulse response. It is represented by h(t) for continuous wavelet transform(cwt) and by h(n) for the discrete-time systems.

![LTI systems](/engineering-education/new/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image1.png)

For any input x(t) or x(n, the output can simply be obtained by convolution of input and the impulse response h(t) or h(n) as;

y(t)=x(t).h(t)......equation 1
y(n)=x(n)*h(n)......equation 2

Equation 1 can be represented in the frequency domain by Laplace transform and equation 2 by the z-transform as;

Y(s)=X(s).H(s)........equation 3
Y(z)=X(z).H(z)........equation 4

When you take the Laplace transform of the 2nd equation, the convolution of the two equations above becomes multiplication. It is how your complicated convolution becomes the easy multiplication in the frequency domain.
From equation 3, we can find the ratio of Y(s) and X(s) as;

$H(s)=\frac{Y(s)}{X(s)}=\frac{laplace(y(t))}{laplace(x(t))} $

If all the initial conditions are set to zero, then it is called the transfer function of the LTI system, and the inverse Laplace transform of the transfer function $L^{-1}{H(s)}$ is the impulse response h(t) of the LTI system. These are are the functions that describe the whole system.
For discrete systems, we have;

$H(z)=\frac{Y(z)}{X(z)}=\frac{z-transform ({y(n)})}{z-transform ({x(n)})}$

Analysis of LTI systems is easy, and transfer function plays an important role in it. Roots of the numerator of a transfer function are called `zeros` of systems, and roots of the denominator are the `poles` of the system. The poles and the zeros are useful in the systems stability, analysis, and time response behavior of the LTI systems. The transfer function is utilized to analyze the time domain behavior frequency-domain behavior of the systems.

### Various analyses of LTI systems
There are various analyses performed on LTI systems. Some basic analyses are shown below;

![various analysis of LTI systems](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image2.png)

Now, if we consider the time domain the time domain, we have the three analyses: time response, error analysis, and stability analysis.
For time response analysis, we consider the output response for the various input. So, for example, if you give impulse response as input, you get impulse response as the output. Similarly, to step and ramp response.
We consider the steady-state error/error coefficients for error analysis, and for stability, we concentrate on the root locus.
Considering the frequency domain, we have;

![frequency domain](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image3.png)

### Matlab GUI to implement basic LTI system analysis
Our objective is to develop a GUI in Matlab to implement the following analysis of any LTI system:
- Impulse response
- Step response
- Ramp response
- Frequency response(bode magnitude and phase plot)
- Root locus plot
- Nyquist plot
- Log magnitude vs. Phase plot

![glimpse of the gui](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image4.png)

The above GUI is what we want to create using Matlab. The axes show the plot. When you enter the numerator and the denominator and press the pushbutton `find TF`, the transfer function is displayed below the pushbutton. It then plots any plot type selected by the user.
>In the numerator and denominator edit box, only enter the coefficient of your function. For example, if we have the function as $\frac{s+25}{s^2+5s+25}$, we enter 1 and 25 in that edit box, and that of denominator will be 1, 5, and 25.

The figure below shows the expected behavior.

![find TF](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image5.png)

When we click `find TF`, we expect the results above.

![output](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image6.png)

Then the above should be what we see after selecting our plot.

### Creating GUI.
To open the guide, we execute the command `guide` on the command window and open `blank GUI`. We will not talk much about the components and the details about the GUI since they are all covered [here](https://www.section.io/engineering-education/matlab-graphical-user-interface/). It is a requirement to go through it before looking into this if you are a beginner. It introduces you to how you can build a GUI and the various functions of the various components.
This GUI comprises static texts, axes, edit texts buttons, pushbuttons, radio buttons, button groups, and text fields.
Place your components so that your GUI appears, as shown below after placing the components.

![component arrangement](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image7.png)

Double-click the component to add the labels and the tags for each component, and a new window `property inspector` shown below opens up.

![property inspector](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image8.png)

This property inspector enables you to modify the components to what you want them to be. For example, you can use it to change the font size, background color fonts e.t.c. To make labels of the components, in the Property inspector, you will locate the string and then change it to the component's label, for example, `enter the denominator`.
While doing this, ensure you take note of the tag of each component. It is because it is this tag that is used to link the GUI and the components.
> Note that you can change this tag to anything you wish as long as you can easily remember them.
> The string of the components can be the same, but the tag should not be the same since that is what is considered for the callbacks functions. Callback functions are the codes that render the functionality of the codes.
After adding all the component's labels, click the `run` icon on the top of your GUI to give you the final layout, as shown below.

![final layout](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image9.png)

When you click the run icon, Matlab autogenerates a script that contains the code for the GUI. This autogenerated code is where we are writing the callback for our components.
> We only add codes to the callback section, not the CreateFcn.

![callback section](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image10.png)

Now, if you carefully look at the generated codes, you'll realize that we have the callback functions for other components, but those for the radio buttons and the button group are not there. It is because Matlab, by default, do not generate callback for radio buttons and button group, but you can create them. To do this, go back to the GUI layout and right-click on the button group, and select the `view callback`. It opens a new selection and on this new selection, select `selectionChangedFcn`.
When you do this, Matlab writes the callback for the components.

### Codes for various callback functions.
### 1. Edit1 and edit2 callback(Enter the numerator, enter the denominator)
To locate the component's callback, go to the layout in the GUI, select the component, and right-click on it. Then select the `view callback` and click on  `callback`. This way takes you directly to the callback of the component in the generated code.
```Matlab
num = textscan(get(hObject, 'string'), '%f');
handles.num=cell2mat(num);
guidata(hObject, handles)
```
Whatever is written in the edit box is a `string`, but they are read as a number using the `%f`. The `textscan` function stores the inputs into the variable `num`. The `num` is a cell array, but we convert it to a matrix using the `cell2mat` function. Because it has to be used among the various callbacks, it should be available across the callbacks; thus, we have `handles.num`. We then update the `hObject` and the `handles` using `guidata(hObject, handles)`
This code is similar to that of editbox2. They all perform a similar function of getting the input from the user. We only change the variable since this is a denominator, so we can use something like `den`. So we will have:
```Matlab
den = textscan(get(hObject, 'string'), '%f');
handles.den=cell2mat(den);
guidata(hObject, handles)
```

### 2. Pushbutton1(Find TF)
When you press this button, the transfer function should be displayed in the `text6` box. The callback is:
```matlab
sys=tf(handles.num, handles.den);
handles.sys=sys;
T=evalc('sys');
set(handles.text6, 'String', T);
```
The transfer function is calculated using the `tf` function in Matlab. This function takes the numerator `handles.num` and the denominators `handles.den` as the arguments. The `tf` is stored in the `sys` variable. Now, this `sys` is evaluated in string form using the `eval('sys')`. We then display the string to the text area using the `set function` and string form.

### 3. Uibuttongroup1_SelectionChangedFcn(Select Plot Types)
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
Here, we are using the `switch` control statement. The `get(eventdata.NewValue, 'Tag')` does assign the radio buttons strings such that if you select 1, then it gets the response of the `radiobutton1` and so on. Finally, you update the handles.

### 4.Pushbutton2(Compute)
Here also we use the `switch` control statement to write the response of each plot type.
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
`switch handles.response` gives the expected output. For example, if the user chooses `1` which is the impulse response,then that is the output that they should get. `cla` clears the axes. `tx` takes in the numerator and the denominator and then compute the response using the `impulse` function.
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
This code is similar to that of case one. The only difference is instead of using the `impulse` function; we used the `step` since it is a step response.
Case 3 is for the ramp response. Now, matlab has no inbuilt function for calculating this but we can get it from the step response. This is possible by multiplying the den by $\frac{1}{s}$ then finding the transfer function of this modified function.
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
`step(tf(handles.num, handles.den))` gives us the first step response of our function using the `step` function. This response is then initialized by `T=t0` since we use it to find the second step response(ramp). Using the denominator of our first step response function, we get the second transfer function `[y, t]=step(tf(handles.num, den1))` and then plot the output using the `plot` function.
```matlab
    case '4'
        cla;
        bode(handles.num, handles.den);
        grid
```
In the case above, we are finding the frequency response with the help of the `bode` function. We pass the numerator and the denominator, and it gives the frequency response.

`case 5` is for the locus response. Matlab has inbuilt function `rlocus` for computing it.
```matlab 
    case '5'
        cla
        rlocus(handles.num, handles.den);
        axis equal
```
Both `case6`(nyquisit) and `case7`(nichols plot) have inbuilt functions for executing them. For `case6`, we have `nyquist` and for `case7`, we have `nichols` and both uses the numerator and the denominators as the arguements.
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
`Case8` is the pole zero plot. Here, we use the `pzmap` function. Now, matlab default pzmap creates a very dull looking plot. This is because the markers are small and are difficult to see and so we modify their plots.
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
We have modified the marker colors `h(2).Color='b'` and `h(2).Color='r'` to make the difference. We also make the marker sizes large `h(2).MarkerSize=15`
`pzmap` is an inbuilt function that uses the transfer function as the argument.
These callbacks have to be inserted in their respective callbacks before running your program.
Now, let's test the functionality of our program using the function below;
$$\frac{s + 25}{s^2+2s+25}$$

In the inputs for the numerator, we have 1 and 25, and for the denominator, we have 1, 2, and 25.
When you click on the `Find TF`, we see the transfer function displayed as shown below:

![displaying transfer function](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image11.png)

When you select, for example, impulse response and press the `compute` button, we see the plot is displayed in the axes. You can do this for other plot types.

![output](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image12.png)

If you choose bode plot, you will have:

![bode plot](/engineering-education/how-to-implement--linear-time-Invariant(lti)-systems-analyzer-using-matlab-graphical-user-interface(gui)/image13.png)

### Conclusion
The discussed above is a very nice GUI system because, with its help, you can analyze LTI systems easily by just inputting the numerator and the denominators. Also, it can help you when doing some numerical analysis and use it for verifying your answers. Furthermore, the numerous in-built Matlab functions make the creation of this GUI easier.

Happy coding!
