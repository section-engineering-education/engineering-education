# Getting-started-with-MATLAB
### Introduction
According to Wikipedia, MATLAB (an abbreviation of "matrix laboratory") is a proprietary multi-paradigm programming language and numerical computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementing algorithms, creating user interfaces, and interfacing with programs written in other languages.

Although MATLAB is intended primarily for numerical computing, an optional toolbox uses the MuPAD symbolic engine allowing access to symbolic computing abilities. An additional package, Simulink, adds graphical multi-domain simulation and model-based design for dynamic and embedded systems.

### Prerequisites
- Good understanding of any programming language.
- MATLAB installed, you can download it from [here](https://www.mathworks.com/downloads/).

### Uses of MATLAB
- Signal Processing and Communications.
- Data analysis and visualization.
- Scientific and engineering graphics.
- Developing algorithms.
- Modeling, simulation, and prototyping.

### Lets code!
In heart, MATLAB is a calculator. For example, try: `1+1`, `sqrt(4)`, or `sin(pi/2)`.

Also, you can present complex numbers by:
| Symbol  | Function  |   
|---|---|
| abs(x)  | absolute value.  |   
| angle  | angle of complex number x.  |   
| conj(x)  | complex conjugate of x.  |   
| imag(x)  | imaginary part of complex number x.  |   
| real(x)  | real part of complex number x . |   

#### Vector
The vector is a one-dimensional array of numbers.
##### Row vector
You can create row vectors by:
```matlab
a = [ 1 2 3 4]
```
Or by using a comma to delimit the elements. MATLAB will return the following result:
```matlab
a =

     1     2     3     4
```
##### Column vector
You need to use semicolons between values. For example:
```matlab
a = [1;2;3;4]
```
And the output will be:
```matlab
a =

     1
     2
     3
     4
```
If you want to output a specific range of elements, you have to reference the vector with a colon. For example:
```matlab
values=[6 513 21 9 23 1 0];
values(2:5)
```
The result will be:
```matlab
ans =

   513    21     9    23
```
And if you want to list all of the vector elements, you can use `values(:)`.

#### Matrix
The matrix is a two-dimensional array of numbers.

To create a matrix, you have to enter the elements in each row with a space or colon between them. Then you have to use semicolons to delimit the rows as we saw above. For example:
```matlab
values=[1 2 3 4;5 6 7 8; 9 10 11 12]
```
The result:
```matlab
values =

     1     2     3     4
     5     6     7     8
     9    10    11    12
```
Now let's learn how to create a smaller matrix from our existing one. For example, if you execute `values(:, 1:2)` the result will be:
```matlab
ans =

     1     2
     5     6
     9    10
```
You can specify the rows you want before the comma, in our case, it is every row in that matrix. Also, you can specify the columns you want after the comma, in the code above it is the first and the second rows.

Now go and execute `values(1:3, 2:4)` yourself. What will be the result?
#### Zeros, Ones and Eye
When you use `zeros` which is a built-in function, it makes every value equal to zero. For example, if you write `a = zeros(4:5)` then the result will be four rows and five columns of zeros:
```matlab
a =

     0     0     0     0     0
     0     0     0     0     0
     0     0     0     0     0
     0     0     0     0     0
```
`Ones` use the same method above, it makes every value equal to one. Try `b = ones(5:6)` and see the result yourself.

`Eye` is a built-in function as well, it makes every value on the main diagonal equal to one and zeros elsewhere. Example:
```matlab
c = eye(4)
```
The result is:
```matlab
c =

     1     0     0     0
     0     1     0     0
     0     0     1     0
     0     0     0     1
```
#### Linspace 
Linspace function generates linearly spaced vectors. The difference between colon operator and linspace is that the second one gives us control over the points. For example, if you write `linspace(1,10,10)` then the result will be:
```matlab
ans =

     1     2     3     4     5     6     7     8     9    10
```
But if you change the last value to 8 instead of 10 then the result will be:
```matlab
ans =

    1.0000    2.2857    3.5714    4.8571    6.1429    7.4286    8.7143   10.0000
```

#### M-files
Entering commands at MATLAB prompt is not practical when the problems will be complicated and require re-evaluation. The solution will be using M-files which is user-defined commands normally have input & output and the script will be executed in sequence when it is called.

It is saved with the extension ".m".

Now let's create a function. First of all, you need to press on *New Script*:

![](/engineering-education/getting-started-with-matlab/1.PNG)

Second, press on *New* then *Function*:

![](/engineering-education/getting-started-with-matlab/2.PNG)

It is that easy! Now let's create a circle area function by:
```matlab
function [area] = areafunction(r)
%UNTITLED3 Summary of this function goes here
%   Detailed explanation goes here
area = pi*r*r;
end
```

After that, you have to save the function with the extension ".m" as we mentioned above.
Finally, write `areafunction(2)` in the command window and the result will be:
```matlab
ans =

   12.5664
```

#### Plotting
If you are familiar with the Matplotlib plotting library for Python programming language, it will be very easy for you to follow this section. However, we will explain it simply as possible.

To plot any graph we need to define the range of *X* and *Y* values. Then to call the plot command which is `plot(X,Y)`.

Now let's move on to a complex example. We are going to create sin and cos waves. We will create the following figure:

![sin and cos waves](/engineering-education/getting-started-with-matlab/sin-cos.jpg)

First of all, let's define the t which is a variable indicating time.
```matlab
t = 0:0.01:5
```
Second, we are going to define the first sin wave:
```matlab
first = 3*sin(2*t+pi/2)
subplot(2,2,1),plot(t,first)
title('3sin(2t+pi/2)')
```
The subplot allows you to create multiple plots in one figure. The first and second numbers specify how many rows and columns we want, in our case, it is 2 rows and 2 columns. The last number (1) specify that our plot will be in the first row and the first column (in the upper left corner).
And the title to define our plot title.

Now we are going to do the same for the second and the third waves.
```matlab
second = 3*cos(2*t)
subplot(2,2,3),plot(t,second)
title('3cos(2t)')

third = 2*cos(10*t)
subplot(2,2,[2 4]),plot(t,third)
xlabel('Time')
ylabel('Amplitude')
title('2cos(10t)')
```
The `xlabel('')` and the `ylabel('')` defined the names of those labels.

That's all! 

*Note*: please be sure to execute all of the code together to allow the 3 plots to appear in the same figure.

### Conclusion
This is just a *tip of the iceberg*. Change the amplitude, frequency, phase, subplot numbers, etc.. . Try it out for yourself and see the results. If you are interested more in MATLAB, keep following our [languages](https://www.section.io/engineering-education/topic/languages/) section to create future tutorials about SIMULINK and a lot more. Have a nice day!
