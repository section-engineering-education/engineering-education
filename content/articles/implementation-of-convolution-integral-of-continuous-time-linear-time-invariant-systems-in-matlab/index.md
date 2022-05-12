---
layout: engineering-education
status: publish
published: true
url: /implementation-of-convolution-integral-of-continuous-time-linear-time-invariant-systems-in-matlab/
title: Implementation of Convolution Integral of Continuous Time Linear Time Invariant Systems in Matlab
description: This article discusses the various types of convolution integrals of LTI systems and how they can be implemented using functions in Matlab.
author: queenter-bruce
date: 2022-01-25T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementation-of-convolution-integral-of-continuous-time-linear-time-invariant-systems-in-matlab/hero.jpg
    alt: Implementation of Convolution Integral of Continuous Time Linear Time Invariant Systems in Matlab Hero image.
---
Convolution is an integral that shows the overlap of a function f(x) when it shifts another function. This integral is used to blend two functions.
<!--more-->
In image synthesis, the dirty map is the Convolution of the clean map having the dirty beam.

A dirty beam is the point spread function(PSF) in an observation. The PSF shows how the response system of an image response to the source of the image.

Linear time invariants(LTI) is a system that receives input and gives output. The input is known as the excitation since the output depends on it, while the output is the system's response.

LTI systems can be characterized entirely by a single system impulse response function. It is represented by h(t) for the continuous system. The inputs can be obtained for any input x(t) by Convolution of inputs and impulse response.

An impulse response is a function that is 1 at a time and 0 at all other times. In this article, we will be looking at the various types of convolution integrals of LTI systems and how they can be implemented in Matlab.

### Prerequisites
- Have [Matlab](https://www.mathworks.com/products/matlab.html) installed in your computer.
- An understanding of [Matlab](/engineering-education/getting-started-with-matlab/) basics.

### Convolution integrals
There are two different types of Convolution, which are:
- Linear Convolution
- Circular Convolution

### Linear convolution intergrals
This is an operation that gives the output of an LTI system given the input. Convolution can be used in finding output responses in digital systems.

When you have two signals x(n) and h(n), the linear convolution of the two signals can be defined by the product of the functions(y(n) = x(n)\*h(n)).

### Algorithm
The algorithm that we will be using to implement the convolution integral is as follows:
1. Start.
2. Enter the sequences.
3. Input the sequence length.
4. Calculate the linear Convolution.
5. Stop.

### The program
```matlab
%program to find convolution of two sequences
clc
close all
clear all
n = -10:10;
x1 = [1 2 3 4]; % the data value

subplot(4,2,1); % This the first subplot
stem(x1);  % stem plot of the x1 data without performing convolution operation to it.
title('-----x1(n)----');

h1 = [1,2,3]; %This is the second data value.

subplot(4,2,3);
stem(h1); %stem plot of the second data value without performing convolution operation to it.
title('-----h1(n)----');

%%%%%linear convolution%%%%%%
l1 = conv(x1,h1) % %conv gives the convolution of x1 and h1 vectors. l1 stores these values.
subplot(4,2,5);
stem(l1); %gives the stem plot of the l1 data values.

title('-----linear convolution-1--');
```

### Matlab functions used
`conv` is the function for convolution and polynomial multiplication. `a = conv(x,h)` gives the convolution of the two vectors `x` and `h`. The results of `conv(x,h)` is the length `MAX([LENGTH(A)+LENGTH(B)-1,LENGTH(A),LENGTH(B)])`.

If the vectors are polynomials, then the convolution is the product of the two polynomials. At points, you can get the subsection of the convolution using `conv(x, h, 'shape')` where `shape` is the shape of the subsection.

There are other convolution options that you can use in Matlab. They include:
- `conv(x,h, 'full')`: The output gives the full convolution of the input vectors.
- `conv(x,h, 'same')`: Here, the output is the center of the convolution and has the same size as the first vector.
- `conv(x,h, 'valid')`: This code gives output as the part of the convolution computed with zero-padded edges. Zero padded-edges are matrix surrounded with zeros.

`length` gives the length of the vector. For example, `length(x)` gives the length of vector `x`.

The `clc` function clears the window and returns the cursor at the home tab. It closes all the open figures.

`clear all` is used to clear the software's memory which is the workspace. It is done by clearing all the variables and functions.

The `stem` function gives a stem plot. `stem(y)` plots the data as stem from the x-axis with circles at the data value. We will understand this better after executing the program below;

When we execute the code, the output is as shown in the figure below:

![convolution of two sequences](/engineering-education/implementation-of-convolution-integral-of-continuous-time-linear-time-invariant-systems-in-matlab/convolution-one.png)

The first plot is the stem plot of the `x1` vectors, the second plot is the stem plot of the second vector `h1`, and the last plot is the stem plot of the linear convolution integrals of vector `x1` and `h1`.

As you can see, a stem plot plots data as a stem from the x-axis and a circle at the data value. If you look at the first plot, the data values were `[1 2 3 4]`, and the circles are at these points.

### Circular convolution
It is the convolution of two periodic functions. These functions have the same period. This type of convolution is used in maximizing the efficiency of different common filters.

The function used is `cconv`. This function gives the circular convolution. It uses the vectors and the convolution length as the inputs.

This function is executed as `cconv(x, h, N)`. In this case, N is the length of the resulting vector. If `N` is not defined, the default length, `LENGTH(A)+LENGTH(B)-1`, is used.

When this length is used, the resulting convolution is similar to that of the linear convolution.

```matlab
%%%%%%%%%% circular convolution %%%%%%%%%%%5
x1 = [1 2 3 4]; % first data values.
h1 = [1 2 3 0]; % Second data values.

c1 = cconv(x1,h1,4) %gives the circular convolution of the first and second data values.
stem (c1); %plots the stem plot of the circular convolution integrals.

title('-----circular convolution-1---');
```

The output for the circular convolution is as shown in the figure below:

![circular convolution](/engineering-education/implementation-of-convolution-integral-of-continuous-time-linear-time-invariant-systems-in-matlab/convolution-two.png)

### Example 2(matrix convolution integrals)
We use two vectors of `zeros` and `ones` in this example. These two matrices are stored in a single variable, and the linear and circular convolutions are determined. We use the `zeros` and `ones` function to get the two matrices.

`zeros(M, N)` gives a matrix of zeros with `MxN` dimensions. The function `ones(M, N)` gives a matrix of 'ones' with `MxN` dimensions. We plot both the linear and circular convolution in this example' script.

```matlab
x2 = [zeros(1,10) ones(1,11)]; %combining two matrix ones and zeros.
subplot(4,1,1);
stem(x2); % stem plot of the combined matrices

title('-----x2(n)----');

h2 = [zeros(1,12) ones(1,9)]; % second matrix combination
subplot(4,1,2);
stem(h2);

title('-----h2(n)----');

%%%%%linear convolution%%%%%%
l2= conv(x2,h2) %linear convolution of the first and second matric combination
subplot(4,1,3);
stem(l2);
title('-----linear convolution--2--');

%%%%%%%%%% circular convolution %%%%%%%%%%%
c2 = cconv(x2,h2,8) %circular convolution of the first and second matrix combination. N is 8.
subplot(4,1,4);
stem(c2);
title('-----circular convolution--2----');
```

The output of the above example is as shown below:

![convolution of matrices](/engineering-education/implementation-of-convolution-integral-of-continuous-time-linear-time-invariant-systems-in-matlab/convolution-three.png)

As we can see, the output of the vector and matrix convolution is different, but we can perform convolution to find the convolution integrals. Also, the linear and circular convolution in this example are different. This is because `N` is defined for the circular convolution.

### Conclusion
It is easier to find the convolution integrals for both vectors and matrices using Matlab. This is because of the in-built functions, which have a quick algorithm for calculating the convolution integrals.

The convolution integrals are very important in the science field. If we leave their use in the LTI systems alone, they maximize filter efficiencies. It makes it a widely used mechanism, with Matlab being the most preferred software for the operation.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)


