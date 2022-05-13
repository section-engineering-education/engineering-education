---
layout: engineering-education
status: publish
published: true
url: /wavelet-transform-analysis-of-1d-signals-using-python/
title: Wavelet-based Denoising of the 1-D signal using Python
description: This tutorial will walk the reader through performing Wavelet denoising of the 1-D signal.
author: collince-odhiambo
date: 2022-04-04T00:00:00-04:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/wavelet-transform-analysis-of-1d-signals-using-python/hero.jpg
    alt: Wavelet-based Denoising of the 1-D signal using Python Hero Image
---
Wavelet is a function applied for processing digital signals and compression. Wavelet transforms a high-resolution signal into an approximated and detailed coefficient. 

The approximated coefficients are low-resolution approximations because they do not show what has changed. On the other hand, the detailed coefficient shows the changes and makes it possible to recover the original image from the approximated coefficients.

In this tutorial, we will see how to perform the wavelet transform of the 1-D signal. Additionally, we will look at the various packages used for this analysis, the commands, and a sample of how to use such commands in an application.

### Prerequisites
To follow along with this tutorial, the reader should have the following:
- To be familiar with the [Python](https://www.programiz.com/python-programming/first-program) programming language.
- To have [Pycharm](https://www.jetbrains.com/pycharm/download/) installed.

### Noise model
A signal is frequently contaminated by noise when transmitted over some distance. Additive noise is the simplest model for noise acquisition. Additive noise is an unwanted signal that gest to the genuine original signal. The additive noise has the form:

f'k = f(k) + n(k)

Where: 
- f'(k): Is the contaminated signal.
- f(k): Is the original signal.
- n(k): Is the noise signal.

The basic assumption of noise signals are:
- Noise is additive.
- Noise is a random signal (White Gaussian noise with 'zero' mean value).
- Noise is a high-frequency signal.

The objective here is to remove noise(n(k)) from noisy audio signal(f'(k)) using wavelet transform technique. The scheme used here is shown below:

![Denoising Scheme](/engineering-education/wavelet-transform-analysis-of-1d-signals-using-python/wavelet-one.png)

First, the signal is decomposed into detailed and approximated coefficients from the image above. Then, these coefficients are thresholded, and inverse wavelet transform is performed to the thresholded coefficients. 

Thresholding is a non-linear technique operating on each wavelet coefficient dependently. Finally, the inverse wavelet transform is done to give the original signal. 

We use methods such as Universal threshold, Bayes, and Sure minimax in setting the threshold.

### Scikit-image python package
This package provides flexible routines of image processing. It is written in the python language. In addition, it has a function library for wavelet-based Denoising under restoration. 

Although it is mainly applicable for 2-D images, it can be used for 1-D signals. The good news is that the `scikit` image package is already available in anaconda; thus, no need of installing it.

`Scikit` wavelet denoising includes two main functions. These functions are `estimate_sigma()` and `denoise_wavelet()`. 

For thresholding estimation, there are only two supported methods.

- Universal threshold(VishuShrink).
- Bayes Shrink(this is the default method).

By default  the `Denoise_wavelet()` function is used  for images. However, in this tutorial, we will use it for 1-D signals, meaning that the other attributes related to the image are dropped. The syntax for using this function is:

```python
y = denoise_wavelet(x, wavelet='db1', mode='soft', wavelet_levels=n, method='BayesShrink', rescale_sigma='True')
```

Where:
- `x`: Is the input noise signal.
- `y`: Is the denoised output.
- `wavelet`: This is the name of the wavelet used.
- `mode`: The thresholding mode used. There is two thresholding mode, i.e. soft and hard threshold.
- `wavelet_levels`: The decomposition levels. Note that this must be an integer.
- `method`: The thresholding method used. Here we use any of the two supported methods, i.e. VishuShrink and BayesShrink.
- `rescale-sigma`: There are only two options. These options are `True` or `false`. For 1-D signals, it should be set to `true`. It is to rescale the noise variance signal if it is internally rescaled.

### Denoising an Electrocardiogram (ECG) signal
We need to install `numpy`, `PyWavelets`, `skimage`, and `matplotlib` for this program. We can install these packages using `pip` as shown below:

```bash
# For numpy package.
pip install numpy
# For pywavelet package.
pip install pywavelet
# For matplotlib
pip install matplotlib
# Install scikit-image
python -m pip install -U scikit-image
```

These installation commands are executed in the terminal. Then import them into the code as shown below:

```Python
import numpy as np
import PyWavelets as pywt
from skimage.restoration import denoise_wavelet
import matplotlib.pyplot as plt
```

- The `numpy` package handles mathematical and logical operations on arrays. 
- The `pywt` package performs wavelet transform for the input signal. We then import the `denoise_wavelet()` function from the `skimage` package.
- The `skimage` package enables the performance of signal preprocessing routines.
- Finally, for any plot in Python, the `matplotlib` package is used.

Read the data from the in-built database. Python has an in-built ecg database. It makes it more efficient, since we do not need data from an external source. To read this data, we use the code below:

```Python
x = pywt.data.ecg().astype(float)/256  # In-built ecg data is read
```

The signal obtained from the database is noise-free. We need to add noise to it to perform the denoising operation. To add the noise, we first define the noise variance. The noise variance is the noise energy per sample.

```python
sigma = 0.05  # Noise variance
x_noisy = x + sigma * np.random.randn(x.size)   # Adding noise to signal
```

To add the noise to our signal(x), we use the formula `x + sigma * np.random.randn(x.size)`. 

The `randn()` adds a random noise considering the noise variance `sigma`.

Let us now perform wavelet denoising using the `denoise_wavelet()` function using the syntax described earlier, as shown below:

```python
# Wavelet denoising
x_denoise = denoise_wavelet(x_noisy, method='BayesShrink', mode='soft', wavelet_levels=3, wavelet='sym8', rescale_sigma='True')
```

We plot the noisy signal `x_noisy` and the denoised signal `x-denoise` for visualisation.

```python
plt.figure(figsize=(20, 10), dpi=100)
plt.plot(x_noisy)
plt.plot(x_denoise)
plt.show()
```

We first create a figure using the `plt.figure()` function when plotting. This figure is of the size 20x10 pixel as described by the function property `figsize`. 

Next, the noisy and the denoised signals are plotted in the exact figure using the `plt.plot()` function. The code snippet `plt.show()` is used to show the output of the plot. The output of this plot is as shown below:

![Plot of the signals](/engineering-education/wavelet-transform-analysis-of-1d-signals-using-python/wavelet-two.png)

The blue signal is the noisy ecg signal, and the red is the denoised signal. Let us now look at how to denoise the audio signal since it is also a sample of a 1-D signal.

### Denoising an audio signal
The first step is importing the libraries that we are going to use. These libraries that we import are installed using the `pip` command in the terminal as shown below:

```bash
pip install scipy
pip install numpy
pip install skimage
pip install matplotlib
```

The `scipy` package solves your program's mathematical and scientific calculations. The `numpy` is used for working with arrays, `matplotlib` plots the outputs, while the `skimage` package is for image preprocessing routines, as explained earlier.

```python
from scipy.io import wavfile
import numpy as np
from skimage.restoration import denoise_wavelet
import matplotlib.pyplot as plt
```

We import the `wavfile` from the `scipy.io` to read audio signals in the `.wav` format. Since some numerical operations are involved, we import `numpy`. We also import the `denoise_wavelet()` function and `matplotlib.pyplot`.

We then read the audio file using the `wavfile.read()` function and normalize the amplitude as shown below:

```python
Fs, x = wavfile.read('guitar.wav') # Reading audio wave file
x = x/max(x)   # Normalizing amplitude
```
 The `guitar.wav`  file should be in the same folder as your python project so download this guitar file from [here](https://drive.google.com/file/d/1-qTlmyI4sO9iCuDHh19B52T7imVk4Ohr/view). The signal samples will be stored in the `x` variable and the sampling frequency to the `Fs` variable. 

The amplitude is normalized because `wavfile` reads the audio in `int16` mode. This mode gives large values. Therefore, we need to reduce these values through normalization.

Since the audio signal has no noise, we add noise similar to what we did for the ecg signal.

```python
sigma = 0.05  # Noise variance
x_noisy = x + sigma * np.random.randn(x.size)   # Adding noise to signal

# Wavelet denoising
x_denoise = denoise_wavelet(x_noisy, method='VisuShrink', mode='soft', wavelet_levels=3, wavelet='sym8', rescale_sigma='True')
```

After adding the random noise, we denoise the signal using the `denoise_wavelet()` function. Here, we use the `VishuShrink` method. 
For visualization, we plot the output.

```python
plt.figure(figsize=(20, 10), dpi=100)
plt.plot(x_noisy)
plt.plot(x_denoise)
plt.show()
```

![Output for the denoised audio signal](/engineering-education/wavelet-transform-analysis-of-1d-signals-using-python/wavelet-three.png)

The blue signal is the noisy signal, while the orange is the denoised output. So it is hard to know whether the Denoising is done or not. 
However, this can be done by either calculating the peak signal-to-noise ratio(PSNR) or physically listening to the music.  

We need to add the `sounddevice` python package to anaconda to listen to the audios. This can be done on the terminal using `conda` or `pip`  package managers as shown below:

- Using pip

```bash
python3 -m pip install sounddevice
```

- Using Conda

```bash
conda install -c conda-forge python-sounddevice
```

We use the code snippet below to import the `sounddevice` package.

```Python
import sounddevice as sd
```

Once you import the package, we can play the signal by executing the command below in the terminal.

```python
sd.play(x_noisy, Fs)
```

Here, we use the `sd.play()` function. This function takes the signal and the sampling frequency as the arguments. When we play the noisy signal, we realize a noise in the background.

We carry the same operation for the denoised audio signal to get the difference. To listen to the denoised audio signal, execute the code below:

```python
sd.play(x_denoise, Fs)
```

### Conclusion
Denoisng 1-D signal python is easy. Python has libraries for the operations; hence, a few code snippets are used for the process. 

Denoising a signal is essential in science and technology. It is also applicable in the security sector and for signal enhancement and modification.

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)