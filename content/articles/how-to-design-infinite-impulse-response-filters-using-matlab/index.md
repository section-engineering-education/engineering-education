---
layout: engineering-education
status: publish
published: true
url: /how-to-design-infinite-impulse-response-filters-using-matlab/
title: How to design Infinite Impulse Response (IIR) Filters using Matlab
description: This tutorial walks the reader through the concept of Infinite Impulse Response design using Matlab.
author: atieno-dorine
date: 2021-08-05T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /how-to-design-infinite-impulse-response-filters-using-matlab/hero.jpg
    alt: infinite impulse design example image
---
To filter is to remove the unwanted properties of a signal. IIR filters with an infinite number of impulses. Here the output y(n) response depends on the present input x(n), previous input x(n-1) as well as the previous output y(n-1).
<!--more-->


### Introduction
To filter is to remove the unwanted properties of a signal. IIR filters with an infinite number of impulses. Here the output y(n) response depends on the present input x(n), previous input x(n-1) as well as the previous output y(n-1). The differential equation for the IIR filter can be given by the differential equation $y(n)=b_0x(n)+b_1x(n-1)+---b_mx(n-m)-a_1y(n-1)---a_ny(m-n)$. To see more about this, you can get it [here](https://www.sciencedirect.com/topics/engineering/iir-filters). Since the filter uses the previous outputs, there is feedback from the filter structure. The design of an IIR filter is based on the transfer function($H_s$) that satisfies the requirement of the filter requirement. The transfer function($H_s$) is the ratio of the output response to the input response.

### Prerequisites
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.
- Understanding of the filters

We have various types of IIR filters. This type includes;
1. Butterworth filters.
2. Chebyshev filters.
3. Chebyshev II filters, also known as inverse Chebyshev and Type II Chebyshev filters.
4. Elliptic filters, also known as Cauer filters.
5. Bessel filters.

We will look at the design of the high pass and low pass Butterworth filter.

### How to design low pass and high pass Butterworth filters using Matlab.
It is also known as a maximally flat filter. It is because it is designed so that the frequency response is as flat as possible in the passband. Passband is the range of frequencies or wavelengths that can pass through a filter. The frequency response of a filter is the transfer function of a given filter. However, one main disadvantage of the Butterworth filter is that it achieves this passband flatness at the expense of a wide transition band as the filter changes from the passband to the stopband. As a result, it has poor phase characteristics as well. A transition band is the range of frequencies that allows transition between the passband and the stopband.

### Matlab code for Butterworth filter
Here, we want to design a low pass Butterworth filter with less than 3dB of ripple in the passband, defined from 0 to 40Hz, atleast 60dB of attenuation in the stopband 150Hz to the Nyquist frequency(500Hz) and 1000Hz sampling frequency.
```matlab
% Program to design and implementation of low pass butterworth filter
clc
clear 
close all
kp = 3;          % passband ripple
ks = 60;          % stop attenuation
fp = 40;          %passband frequency
fs = 1000;        %sampling frequency
Fs = 150;         % stop band frequency
```
When designing a filter, you first define its variable, as shown above. 
Next, - passband ripple - is the amount of variation in the amplitude within the designated passband rejection band of the filter. 
- passband frequency - as defined earlier in the range of frequency that can pass through a filter. It means that it only allows signals of a given frequency to pass.
- Stop attenuation - is the minimum attenuation level within the designated rejection band. 
- Sampling frequency - Sampling is the reduction of the continuous-time signal to a discrete-time signal. The sampling frequency is the number of samples per second taken from a continuous signal to make a discrete signal. After defining our filter, we need to normalize the filter. Normalization is the process of adjusting the component values to a convenient frequency. It is used to minimize redundancy from a relation. It is also used to remove undesirable characteristics. The normalization is done by the code below;
```Matlab
wp = fp/(fs/2);
ws = Fs/(fs/2);
```
We then determine the filter order and the cut-off frequency of the filter. Filter order is the maximum delay element in a filter circuit. The cut-off frequency is the frequency at which the response becomes too weak. To determine this, use the code below; 
```Matlab
[N wc] = buttord(wp, ws, kp, ks);
```
When we run this code, we will get the filter order `N` and the cut-off frequency `wc` in the command window. 

![the filter order and the cut-off frequency](/engineering-education/how-to-design-infinite-impulse-response-filters-using-matlab/image_one.png)

The cut-off `wc` frequency obtained above is then normalized cut-off frequency. The filter order is found from the transfer function, which is the output ratio to the input of a filter. Since we are designing a Butterworth filter, we use `buttord` command and pass `wp`, `ws`, `kp`, and `ks` to do this.
```matlab
[den num] = butter(N, wc, 'low');
```
The code above is used to obtain the coefficients of the filter. The coefficients are the numerator(output) and the denominator(input). It is done by passing the filter order obtained and the filter's cut-off frequency to the `butter` function. Since we are designing a low pass filter, we define using `low` when passing the filter order and the cut-off frequency. These values obtained help in the plotting of the filter's response, which is done by use of `freqz` function. Finally, we pass the filter coefficients, the number of points used for plotting, and the sampling frequency to this function.

```Matlab
freqz(den, num, 1000, fs)
```
When we run the program, we have;
![Filter response](/engineering-education/how-to-design-infinite-impulse-response-filters-using-matlab/image_two.png)

If we want to design a Butterworth high pass filter, it is now easy because the codes remain the same. The only thing is to change the `low` that we defined when finding the filter's coefficients to be `high`. So, the code will be;
```Matlab
kp = 3;          % passband ripple
ks = 60;          % stop attenuation
fp = 40;          %passband frequency
fs = 1000;        %sampling frequency
Fs = 150;         % stop band frequency

wp = fp/(fs/2);   %filter normalization
ws = Fs/(fs/2);

[N wc] = buttord(wp, ws, kp, ks);
[b a] = butter(N, wc, 'high');
freqz(b, a, 1000, fs)
```
The filter response will be as shown below;

![Filter response](/engineering-education/how-to-design-infinite-impulse-response-filters-using-matlab/image_three.png)

### Conclusion
A filter is essential in the field of engineering. They help get rid of the unwanted part of a signal by considering specific prescriptions discussed above. Matlab forms a vital tool in the design of filters and the visualization of their response. Furthermore, it helps improve the performance of a filter since you can respond and compare with the expected response. Such activities are made easier in Matlab by the use of the in-built functions.
