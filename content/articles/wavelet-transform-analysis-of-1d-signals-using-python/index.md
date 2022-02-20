### Wavelet-based denoising of the 1-D signal using Python
### Introduction
Wavelet is a function widely applied for processing digital signals and compression. Wavelet transform is transforming a high-resolution signal into approximated and detailed coefficients. The approximated coefficients are always referred to as low-resolution approximations. It is because it does not show what has changed. The detailed coefficients give detail to what has changed in a signal. The detailed coefficient shows the changes and makes it possible to recover the original image from the approximated coefficients.
In this tutorial, we will see how to perform the wavelet transform of the 1-D signal. Also, we will look at the various packages used for this analysis. The commands and a sample of how to use such commands in an application.

### Prerequisites
To follow along with this tutorial, you need:
- To be familiar with the [Python](https://www.programiz.com/python-programming/first-program) programming language.
- To have **Pycharm** installed on your computer. You can download it from [here](https://www.jetbrains.com/pycharm/download/).

### Noise model
When a signal is transmitted over some distance, it is frequently contaminated by noise. The simplest model for the acquisition of noise is additive noise. The additive noise has the form:
f'k = f(k) + n(k)
Where: f'(k): Is the contaminated signal.
        f(k): Is the original signal.
        n(k): Is the noise signal.
The basic assumption of noise signals are:
- Noise is additive.
- Noise is a random signal(White Gaussian noise with 'zero' mean value).
- Noise is a high-frequency signal.
The objective here is to remove noise(n(k)) from noisy audio signal(f'(k)) using wavelet transform technique. The scheme used here is shown below:

![Denoising Scheme](/engineering-education/wavelet-transform-analysis-of-1d-signals-using-python/wavelet-one.png)

Here, the signal is first decomposed to detailed and approximated coefficients. Then, these coefficients are thresholded, and inverse wavelet transform is performed to the thresholded coefficients. Thresholding is a very simple non-linear technique that operates on one wavelet coefficient at a time. Finally, the inverse wavelet transform is done to give the original signal. In setting the threshold, we use some methods. These methods are such as universal threshold, Bayes, Sure minimax e.t.c.

### Scikit-image python package
The scikit-image or scikit extends `scipy.ndimage` to provide a versatile set of image processing routines. It is written in the python language. It has a function library for wavelet-based denoising under restoration. Although it is mainly applicable for 2-D images, it can use it for 1-D signals. The good news is that the `scikit` image package is already available in anaconda. It means you do not need to install it separately.
`Scikit` wavelet denoising includes two main functions. These functions are `estimate_sigma()` and `denoise_wavelet()`. For thresholding estimation, there are only two supported methods. They are:
- Universal threshold(VishuShrink).
- Bayes Shrink(this is the default method).

`Denoise_wavelet()` function by default is for images. Here, we use it for 1-D signals. This means the attributes that are related to the image only are dropped. The syntax for using this function is:

```python
y = denoise_wavelet(x, wavelet='db1', mode='soft', wavelet_levels=n, method='BayesShrink', rescale_sigma='True')
```

Where:
`X`: Is the input noise signal.
`Y`: Is the denoised output.
`Wavelet`: This is the name of wavelet used.
`Mode`: It is the thresholding mode used. There is two thresholding mode, i.e. soft and hard threshold.
`Wave_levels`: This is the decomposition levels. Note that this must be an integer.
`Method`: It is the thresholding method used. Here we use any of the two supported methods, ie. VishuShrink and BayesShrink.
`Rescale-sigma`: There are only two options. These options are `True` or `false`. For 1-D signals, it should be set to `true`. It is to rescale the noise variance signal if it is internally rescaled.

### Python code for denoising ecg signal
First, we need to import some packages as shown below:

```Python
import numpy as np
import PyWavelets as pywt
from skimage.restoration import denoise_wavelet
import matplotlib.pyplot as plt
```

The `numpy` package handles mathematical and logical operations on arrays. The `pywt` package performs wavelet transform for the input signal. We then import the `denoise_wavelet()` function from the `skimage` package. Finally, for any plot in Python, the `matplotlib` package is used.
Read the data from the in-built database. Python has an in-built ecg database. It makes it more efficient since you do not need to look for the data from an external source. To read this data, we use the code below:

```Python
x = pywt.data.ecg().astype(float)/256  # In-built ecg data is read
```

The signal obtained from the database is noise-free. We need to add noise to it to perform the denoising operation. To add the noise, we first define the noise variance. The noise variance is the noise energy per sample.

```python
sigma = 0.05  # Noise variance
x_noisy = x + sigma * np.random.randn(x.size)   # Adding noise to signal
```

To add the noise to our signal(x), we use the formula `x + sigma * np.random.randn(x.size)`. The `randn()` is used to add a random noise in consideration to the noise variance `sigma`.
Let us now perform wavelet denoising using the `denoise_wavelet()` function using the syntax described earlier as shown below:

```python
# Wavelet denoising
x_denoise = denoise_wavelet(x_noisy, method='BayesShrink', mode='soft', wavelet_levels=3, wavelet='sym8', rescale_sigma='True')
```

For visualization, we plot the noisy signal `x_noisy` and the denoised signal `x-denoise`.

```python
plt.figure(figsize=(20, 10), dpi=100)
plt.plot(x_noisy)
plt.plot(x_denoise)
```

We first create a figure using the `plt.figure()` function when plotting. This figure is of the size 20x10pixel as described by the function property `figsize`. Next, the noisy and the denoised signals are plotted in the same figure using the `plt.plot()` function. The output of this plot is as shown below:

![Plot of the signals](/engineering-education/wavelet-transform-analysis-of-1d-signals-using-python/wavelet-two.png)

The blue signal is the noisy ecg signal, and the read signal is the denoised signal. So it is how to denoise a noisy ecg signal.
Let us now look at how to denoise the audio signal since it is also a sample of a 1-D signal.

### Python code for denoising an audio signal
The first step is importing the libraries that we are going to use.

```Python
from scipy.io import wavfile
import numpy as np
from skimage.restoration import denoise_wavelet
import matplotlib.pyplot as plt
```

We are importing the `wavfile` from the `scipy.io`. It is used to read audio signals in the `.wav` format. Since some numerical operations are involved, we import `numpy`. We also import the `denoise_wavelet()` function and `matplotlib.pyplot`.
We then read the audio file using `wavfile.read()` function and normalize the amplitude as shown below:

```python
Fs, x = wavfile.read('guitar.wav') # Reading audio wave file
x = x/max(x)   # Normalizing amplitude
```

We are reading the `guitar.wav` in the current directory. The signal samples will be stored in the `x` variable and the sampling frequency to `Fs` variable. The amplitude is normalized because `wavfile` reads the audio in `int16` mode. This mode gives large values. Therefore, we need to reduce these values through normalization.
Since the audio signal has no noise, we add noise. This is done in a similar way we did for the ecg signal.

```python
sigma = 0.05  # Noise variance
x_noisy = x + sigma * np.random.randn(x.size)   # Adding noise to signal

# Wavelet denoising
x_denoise = denoise_wavelet(x_noisy, method='VisuShrink', mode='soft', wavelet_levels=3, wavelet='sym8', rescale_sigma='True')
```

After adding the random noise, we denoise the signal using the `denoise_wavelet()` function. Here, we use `VishuShrink` method. 
For visualization, we plot the output.

```python
plt.figure(figsize=(20, 10), dpi=100)
plt.plot(x_noisy)
plt.plot(x_denoise)
plt.show()
```

![Output for the denoised audio signal](/engineering-education/wavelet-transform-analysis-of-1d-signals-using-python/wavelet-three.png)

The blue signal is the noisy signal, and the orange is the denoised output.
Now, in this audio signal, it is hard to know whether the denoising is done or not. It can be done by either calculating the peak signal to noise ratio(PSNR) or physically listening to the music. For you to listen to the audios, we add `sounddevice` python package to anaconda. All these can be done in the terminal. To import `sounddevice` we execute the command below in the terminal.

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
Denoisng 1-D signal python is easy. A few codes are used to execute the process. It is because Python has libraries. These libraries are functions that perform a specific operation. For example, denoising a signal is essential in science and technology. It is also applicable in the security sector and for signal enhancement and modification.
Happy coding!
