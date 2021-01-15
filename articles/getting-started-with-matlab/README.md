# Getting-started-with-MATLAB
### Introduction
MATLAB (an abbreviation of "matrix laboratory") is a programming language and numerical computing environment developed by MathWorks.

### Prerequisites
- Good understanding of any programming language.
- MATLAB installed, you can download it from [here](https://www.mathworks.com/downloads/).

### Uses of MATLAB
- Signal Processing and Communications.
- Data analysis and visualization.
- Scientific and engineering graphics.
- Developing algorithms.
- Modeling, simulation, and prototyping.

MATLAB has an additional package "Simulink" which you can use for graphical multi-domain simulation and model-based design for dynamic and embedded systems. And you can get access to the symbolic computing abilities by using an optional toolbox that uses the MuPAD symbolic engine.

### Lets code!
MATLAB is like any programming language that allows you to do mathematical operations. For example, try: `1+1`, `sqrt(4)`, or `sin(pi/2)`.

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

##### Slicing Operation
To output a specific range of elements, you have to reference the vector with a colon. For example:
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

##### Column vector
You need to use semicolons between values. For example:
```matlab
a = [1;2;3;4]
```
The output:
```matlab
a =

     1
     2
     3
     4
```

#### Matrix
The matrix is a two-dimensional array of numbers.

To create a matrix, you have to enter the elements in each row with space or colon between them. Then you have to use semicolons to delimit the rows as we saw above. For example:
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

Now let's create a smaller matrix from our existing one. For example, `values(:, 1:2)` and the result will be:
```matlab
ans =

     1     2
     5     6
     9    10
```
You can specify the rows you want before the comma, in our case, it is every row in that matrix. Also, you can specify the columns you want after the comma, in the code above it is the first and the second rows.

Try executing `values(1:3, 2:4)`. Check if you get the same result as shown below:
```matlab
ans =

     2     3     4
     6     7     8
    10    11    12
```

#### Zeros, Ones and Eye
When you use `zeros` which is a built-in function, it initializes a matrix of specified dimensions with values initialized to 0. For example, if you write `a = zeros(4:5)` then the result will be four rows and five columns of zeros:
```matlab
a =

     0     0     0     0     0
     0     0     0     0     0
     0     0     0     0     0
     0     0     0     0     0
```
The `ones` method is similar to `zeros`, except it initializes the matrix's values to 1.

`Eye` is a built-in function that generates an identity matrix. An identity matrix is characterized by all diagonal elements being 1 and the non-diagonal entries equal to 0. Example:
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
`Linspace` generates vectors with entries spaced equidistantly. It takes in the starting point, the ending point, and the number of points as its arguments. For example, if you write `linspace(1,10,10)` then the result will be:
```matlab
ans =

     1     2     3     4     5     6     7     8     9    10
```
But if you change the last value to 8 instead of 10 then the result will be:
```matlab
ans =

    1.0000    2.2857    3.5714    4.8571    6.1429    7.4286    8.7143   10.0000
```

#### MATLAB-files
Using the MATLAB interpreter is not a wise choice for implementing and storing MATLAB code. Therefore, the code is stored in `.m` files.

Let's begin by clicking on *New Script*.
![](/engineering-education/getting-started-with-matlab/1.PNG)

Secondly, press on *New* followed by *Function*:

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
If you are familiar with the [Matplotlib plotting library](https://www.section.io/engineering-education/matplotlib-visualization-python/) for Python programming language, it will be very easy for you to follow this section. However, we will explain it simply as possible.

To plot any graph we need to define the range of *X* and *Y* values. Then to call the plot command which is `plot(X,Y)`.

Now let's move on to a complex example. We are going to create the following figure:

![sin and cos waves](/engineering-education/getting-started-with-matlab/sin-cos.jpg)

We need to define t (a variable indicating time).
```matlab
t = 0:0.01:5
```
Then to define the first [sin wave](https://en.wikipedia.org/wiki/Sine_wave):
```matlab
first = 3*sin(2*t+pi/2)
subplot(2,2,1),plot(t,first)
title('3sin(2t+pi/2)')
```
The subplot allows you to create multiple plots in one figure. The first and the second numbers specify how many rows and columns we want, in our case, it is 2 rows and 2 columns. The last number (1) specify that our plot will be in the first row and the first column (in the upper left corner).
And the title to define our plot title.

Let's do the same for the second and the third waves.
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
This is just a *tip of the iceberg*. Change the [amplitude](https://en.wikipedia.org/wiki/Amplitude), [frequency](https://en.wikipedia.org/wiki/Frequency), [phase](https://en.wikipedia.org/wiki/Phase_(waves)), subplot numbers, etc.. . Try it out for yourself and see the results. If you are interested more in MATLAB, keep following our [languages](https://www.section.io/engineering-education/topic/languages/) section to create future tutorials about SIMULINK and a lot more. Have a nice day!
