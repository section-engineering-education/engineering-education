---
layout: engineering-education
status: publish
published: true
url: /continuous-wavelet-transform-of-signals/
title: Continuous Wavelet Transform of Simple and Discontinuous Signals in Python
description: This tutorial will look at the background theory of the wavelet and CWT. It will also discuss the various application of this wave transform.
author: joseph-odhiambo
date: 2022-06-22T00:00:00-12:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/continuous-wavelet-transform-of-signals/hero.jpg
    alt: Continuous wavelet transform of simple and discontinuous signals in Python Hero Image
---
Continuous wavelet transform (CWT) is defined as adding all the time signals and multiplying by the shift version of the wavelet. The output of the continuous wavelet transform gives the wavelet coefficients as the output. 
<!--more-->
These coefficients are functions of scale and position. This process can be performed for both simple and discontinuous signals. A discontinuous wavelet is a sine wave followed by a medium sine wave. A simple signal is a slow sine wave.

This tutorial will look at the background theory of the wavelet and CWT. We will also look at the CWT and the various application of this transform. Finally, we discuss the Python code for computing the CWT of simple and discontinuous signals.

### Prerequisites
To follow along with this tutorial, the reader will need:
- To be familiar with the [Python](https://www.programiz.com/python-programming/first-program) programming language.
- To have **Pycharm** installed on your computer. You can download it from [here](https://www.jetbrains.com/pycharm/download/).

### Theory of CWT: A wavelet
A wavelet is a waveform of effectively limited duration with an average zero value. It is defined as:

$$
\psi_{a,b}(t) = \frac{1}{\sqrt a}\psi(\frac{t-b}{a})  a,b \in \real
$$

Here, a and b are called dilation and translation parameters, respectively. Below is a sample wavelet equation and its corresponding wavelet.

![Wavelet](/engineering-education/continuous-wavelet-transform-of-signals/wavelet.jpg)

The plot is the magnitude plot.

### Finding CWT coefficients
The CWT of a signal f(t) is given by the equation below:

$$CWT_{(a,b)} = (f, \psi_{a,b}) = \frac{1}{\sqrt{a}}\int^{+\infin}_{-\infin}f(t).\psi*(\frac{t-b}{a})dt$$

Here, $(f, \psi_{a,b})$ is the inner product.

The results of the CWT are many wavelet coefficients that are a function of `a` and `b`. For different shapes of the wavelet, we compute the coefficients and plot them on the magnitude axis as shown below:

![Wavelet plot](/engineering-education/continuous-wavelet-transform-of-signals/wavelet-plot.jpg)

Starting from the origin on the scale axis is the lower scale, and along the axis is the higher scale. At lower scales, the wavelet is compressed, and the frequency here is high. 

At higher scales, it is stretched, and the frequency here is low. This arrangement of coefficients is known as a scalogram. Below is the actual plot of the scalogram, which is complete for some signals with wavelets.

![Scalogram](/engineering-education/continuous-wavelet-transform-of-signals/scalogram.jpg)

### Application of the CWT
- CWT is mainly used for spectral analysis of signals. We can use it to study frequency breaks, time discontinuity, signal burst, signal damping, and vibration pattern.
- CWT coefficients in the form of a scalogram can serve as image input to a deep neural network for signal classification.

Sample scalogram for different signals are shown below:

**1. Frequency break**

![frequency break](/engineering-education/continuous-wavelet-transform-of-signals/frequency-break.jpg)

In the signal, there is a frequency break. This clear difference can be seen in a scalogram. Also, it shows at what point the frequency changed.

**2. Discontinuity detection**

![Discontinuity detection](/engineering-education/continuous-wavelet-transform-of-signals/discontinuity.jpg)

Here, we have a discontinuous signal. Also, we can see where the discontinuity occurred at a certain moment in time.

### CWT of signals using Python
We use the `pywavelet` library to compute the CWT using Python.`Pywavelet` is an open-source wavelet transform software for Python. It combines a simple and high-level interface with low-level C and Python performance. Moreover, it comes with the Anaconda distribution. Therefore, we do not need to install it separately when using Anaconda.

Its dependencies are; `numpy`, `SciPy`, and `Matplotlib` (all these libraries come with Anaconda distribution).

The general syntax to compute the CWT is:

```python
coefs, freqs = pywt.cwt(signal, scales, wavelets)
```

Where:
- `Signal`: is the signal in the array form.
- `Scales`: is the scales to be used for the CWT in the array form.
- `Wavelets`: is the name of the wavelet used.
- `Coefs`: is the CWT coefficients.
- `Freqs`: Frequencies corresponding to the scale in the array form.

There are some other optional parameters. It means you do not have to define them. 

Such as:
- `Method`: The methods are such as convolution (`conv`) or fast Fourier transform (`fft`).
- `Sampling period`: It is the seconds taken for the output frequency.

The supported wavelets and their corresponding syntax to use in Python are as such:
- Mexican hat(mexh)
- Morlet(morl)
- Complex morlet(cmorB-C)
- Gaussian Deravative(gausP)
- Complex Gaussian Derivative(cgauP)
- Shannon(shanB-C)
- Frequency B-Spline(fbspB-C)

### Python code for CWT of 1-D signal
We begin by first importing some libraries. These libraries are shown below:

```python
import pywt
import numpy as np
import matplotlib.pyplot as plt
```

`Pywt` is used to compute the CWT, `numpy` for the numerical calculations, and `matplotlib` is for plotting the output.
We then define the time-space, signal, and scale to be used.

```python
t = np.linspace(0, 1, 200)

# Finding signal by adding three different signals
signal = np.cos(2 * np.pi * 7 * t) + np.real(np.exp(-7 * (t-0.4)**2)*np.exp(1j*2*np.pi*2*(t-0.4)))
scales = np.arange(1, 31)  # No. of scales
```

The time-space ranges from 0 to 1. The `linspace()` function separates the axis equal to 200 points. The number of scales used here is 31.

Now, we use the `pywt.cwt()` function to compute the CWT as shown below:

```python
coef, freqs = pywt.cwt(signal, scales, 'gaus1')  # Finding CWT using gaussian wavelet
```

This function uses a signal, scales, and the wavelet type as the arguments. We get the CWT coefficients stored in the `coef` variable when executing this function. The other output from this function is the corresponding frequency stored in the `freqs` variable.

Let us plot the CWT coefficient in the form of a scalogram.

```python
# Plotting scalogram
plt.figure(figsize=(15, 10))
plt.imshow(abs(coef), extent=[0, 200, 30, 1], interpolation='bilinear', cmap='bone',
           aspect='auto', vmax=abs(coef).max(), vmin=abs(coef).max())
plt.gca().invert_yaxis()
plt.yticks(np.arange(1, 31, 1))
plt.xticks(np.arange(0, 201, 10))
plt.show()
```

Here, we plot the scalogram by assuming the matrix is an image. This is why we use the `imshow()` function. The `abs()` function gives the absolute value of the coefficient `coefs`. 

Other parameters that we will use are `interpolation`. It is used to soften the plot. `cmap` gives the colormap. `Yticks` and `xticks` give the `x` and `y` axis, and `plt.show()` shows the output plot.

For visualization of our signal, we can also plot it using the commands below:

```python
# Plotting
plt.figure(figsize=(15, 10))
plt.plot(t, signal)
plt.grid(color='gray', linestyle=':', linewidth=0.5)
plt.show()
```

Let us now execute our program. 

The scalogram plot is shown below:

![Scalogram](/engineering-education/continuous-wavelet-transform-of-signals/signal-scalogram.jpg)

The corresponding signal is shown below:

![Signal plot](/engineering-education/continuous-wavelet-transform-of-signals/simple-signal.jpg)

### Python code for CWT of discontinuous signals
We first import the required libraries.

```python
import pywt
import numpy as np
import matplotlib.pyplot as plt
```

We then define our signal.

```python
Fs = 44100.0  #Samples per second
tclip = 10e-3
nos = np.int(Fs*tclip)  #No of samples in 10ms
tpoints = np.linspace(0, 10e-3, nos) #Time points
x = np.cos(2*np.pi*500*tpoints)  #cos(2*pi*f*t) signal
```

Here, our signal `Fs` sampling frequency is 44100, and the signal duration is 10ms. To get the number of samples, we get the product of samples per second `Fs` and the duration of the signal `tclip`. 

If the product is not an integer, the function `int()` rounds it to the nearest integer. We also define the time points `tpoints` and the signal `x`. Finally, we have a cosine signal defined by the `cos()` function.

Let us introduce discontinuity to our signal. This is done by forcing the signal to be 0 at a given point as shown below:

```python
scales = np.arange(1, 21, 1)  #No. of scales=20
x[87:89] = 0  #Giving discontinuity
x[307:309] = 0  #Giving discontinuity
```

We are forcing the signal to go to zero at the defined points. We then use the same function `pywt.cwt()` to compute the CWT for this signal and the similar commands to plot the scalogram as shown below:

```python
coef, freqs = pywt.cwt(x, scales, 'gaus4')  # Finding CWT using gaussian wavelet

# Plotting scalogram
plt.figure(figsize=(15, 10))
plt.imshow(abs(coef), extent=[0, 10e-3, 20, 1], interpolation='bilinear', cmap='copper',
           aspect='auto', vmax=abs(coef).max(), vmin=abs(coef).max())
plt.gca().invert_yaxis()
plt.yticks(np.arange(1, 21, 1))
plt.xticks(np.arange(0, nos/Fs, nos/(20*Fs)))
plt.show()

# Plotting
plt.figure(figsize=(15, 10))
plt.plot(tpoints, x)
plt.grid(color='gray', linestyle=':', linewidth=0.5)
plt.show()
```

We will have the plot for the signal and the corresponding scalogram plot when we execute this program. 

For example, the signal is shown below:

![Signal](/engineering-education/continuous-wavelet-transform-of-signals/discontinuity-signal.jpg)

As we can see, the signal has a discontinuity at 2ms and 7ms, respectively. The corresponding scalogram is shown below:

![Scalogram](/engineering-education/continuous-wavelet-transform-of-signals/discontinuity-scalogram.jpg)

If you look at the scalogram, we can see at what point was the breakpoints. So it shows the strength of CWT in the analysis of the signal.

### Conclusion
Performing the CWT is a very important process for analyzing various signals. This process is widely used in the various fields we discussed before. The scalogram view of the signal gives detailed visual information about the signal. It means by just looking at the scalogram, you can see the behavior of the signal.

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

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
