---
layout: engineering-education
status: publish
published: true
url: /wavelet-transform-based-denoising-of-images-using-matlab/
title: Wavelet-Based Denoising of images using Matlab
description: This article will be an introduction to denoising of images using Wavelet transform method. We will explore about Matlab, what signals are, noising and denoising are, and how to denoise a noisy image.
author: atieno-dorine
date: 2021-07-04T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/wavelet-transform-based-denoising-of-images-using-matlab/hero.jpg
    alt: Wavelet Matlab Sample Image
---
Wavelet-based denoising is a method of analysis that uses time-frequency to select an appropriate frequency band based on the characteristics of the signal.
<!--more-->
A signal describes various physical quantities over time. While noise is an unwanted signal which interferes with the signal carrying the original message. This causes a change in the parameters of the signal message. Denoising is the process of removing noise from the signal.

Wavelet analysis can be applied in daily life activities such as feature extraction, face recognition, data analysis and prediction, voice recognition, numerical analysis, and many more.

Getting rid of the image noise that contaminates during a signal transfer, is very challenging. Several algorithms are being discovered, but it remains to be a challenge.

In this article, we will discuss one such method called Wavelet-based denoising of images, which is one of the most efficient methods.

### Prerequisites
1. [Matlab](https://www.mathworks.com/downloads/) installed.
2. A proper understanding of the [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) language.

### Introduction
During transmission of signals over a distance, there are chances for it to get contaminated with noise. The objective here is to remove the noise from the image signals using the wavelet technique.

The signal acquires the noise through the additive method and the general form of this is:

`f'(x,y) = f(x,y) + n(x,y)`

where `f'(x,y)` is the noise-contaminated signal, `f(x,y)` is the original signal, and `n(x,y)` is the noise signal.

The basic assumption of a noise signal `n(x,y)`, for the proposed scheme, are:

- Noise is additive
- Noise is a random signal (white gaussian with zero mean value)
- Noise has a high frequency.

To understand more about the noise signals and the equation, you can read [this](https://towardsdatascience.com/introduction-to-image-denoising-3e269f176483) article.

Here, our objective is to remove the noise `n(x,y)` from the noisy image `f'(x,y)` using the wavelet technique.

### Wavelet-based denoising scheme
The denoising scheme involves passing the signal through a decomposer to be decomposed into various wavelet co-efficient using Discrete Wavelet Transform (DWT).

Discrete Wavelet Transform is a method used in the transformation of image pixels to wavelets that are used for wavelet-based compression and coding.

The coefficients are then thresholded and reconstructed to form the original image. This process of reconstruction is known as an Inverse Discrete Wavelet Transform (IDWT).

Here, image thresholding is the separation of foreground and background signals. It is an image segmentation method that isolates grayscale images, by converting them to binary images.

> Grayscale images are images that contain only a single color with two possible intensity values, is black and white. The values are often 0 for black and 1 for white.

Using the Inverse Discrete Wavelet Transform (IDWT) to get the denoised image. Inverse discrete wavelet transform is used for finding threshold labels. We may use other methods such as universal threshold, Bayes, SURE, MinMax, etc.

### Matlab's WaveletAnalyzer tool
This is an in-built tool found within Matlab and need not be installed.

Primarily, it is used for image denoising. To access it, type `wavelet analyzer` on the command prompt. We get a new window as shown below:

![WaveletAnalyzer tool](/engineering-education/wavelet-transform-based-denoising-of-images-using-matlab/image1.png)
*WaveletAnalyzer tool*

After accessing the tool, we locate `Wavelet 2-D`, since the images are to be denoised are 2-D. When you click on this, a new window opens up:

![wavelet 2-D](/engineering-education/wavelet-transform-based-denoising-of-images-using-matlab/image2.png)
*WaveletAnalyzer work area*

Click `File -> Load -> Image`, to import the image to be denoised. And, choose the noisy image that is to be denoised.

![imported image](/engineering-education/wavelet-transform-based-denoising-of-images-using-matlab/image3.png)
*Opening a noisy image in WaveletAnalyzer*

On the top left corner of the window above, choose the wavelet (denoising method) e.g., `bior 2.2` as its co-efficient, and the level of decomposition.

> Note that, `Db`, `haar`, `sym`, and `coif` are orthogonal wavelets and has compact support (smaller support).

- `bior`, `rbior` are biorthogonal wavelets and has compact support.
- `mey`, `dmey` are orthogonal wavelets and has non-compact support.

These methods are named after the people who invented them. To read more about this method, click [here](https://www.mathworks.com/help/wavelet/ref/wdenoise.html).

Orthogonal wavelet is a single scaling function. When a wavelet is biorthogonal, it generates a single scaling function, a wavelet for decomposition, and another for reconstruction. The scaling function can be used shrinking or magnifying the function.

Level decomposition involves passing signal through a low pass and high pass filter, thus making the resultant signal be downsampled by 2.

We obtain a high-frequency signal with detailed co-efficient for high pass filter and low frequency for low pass filter with approximated co-efficient. This is one level of decomposition(level one).

When the process continues from a low pass filter, the level increases. The maximum number of decomposition is calculated by:

max. No. of decomposition = $log_2N$

where `N` represents the signal length.

The whole decomposition described above is Discrete Wavelet Transform (DWT), while the opposite is IDWT.

When the `Analyzer` pushbutton is pressed, our image is denoised. This gives us a window with plots for the wavelet coefficient.

![Plot of wavelet co-efficient](/engineering-education/wavelet-transform-based-denoising-of-images-using-matlab/image4.png)

*Image denoising*

At level ($l_1$), we the image's horizontal, diagonal, and vertical details. This also applies to level 2 ($l_2$).

On the left side of the window, select the `Threshold` method and the noise structure as well. In this case, we choose the `scaled white noise`, since it is Gaussian white noise.

Using the scrollbar, we can modify the threshold value, then click the `denoise` pushbutton:

![Denoised image](/engineering-education/wavelet-transform-based-denoising-of-images-using-matlab/image5.png)
*Denoising*

We get the denoised image as shown above. This is how you use the wavelet analyzer tool to the denoise image.

### Functions used in Wavelet denoising
`wdencmp` - It can be used for denoising of both 1-D and 2-D signals. This means it can be used for both audios as well as images.

**Syntax:**

```Matlab
imgden = wdencmp('gbl_or_Ivd', img, 'wname', N, THR, SORH, KEEPAPP)
```

where

- `img`: is the noisy image that we input.
- `imgden`: is the denoised output image.
- `gbl_or_ivd`: either use `gbl` for single threshold or `Ivd` for level-dependent threshold (either use `gbl` or `Ivd`).
- `wname`: is the type of wavelet used.
- `N`: represents the decomposition levels.
- `thr`: threshold levels.
- `sorh`: `s` or `h` corresponds to the soft and hard thresholding respectively.
- `keepapp`: it is either 0 or 1. It is 0 when the approximation coefficients cannot be thresholded and 1 if they can be.

The single thresholding method is used when the intensity distribution between the objects of foreground and background are very distinct.

In level thresholding, thresholds are rescaled at each level to arrive at new corresponding to the standard deviation of wavelet co-efficient at each level.

Hard thresholding is the process of setting to zero the coefficients whose absolute values are lower than the threshold.

Soft thresholding is the method that involves first setting to zero coefficients whose absolute values are lower than the threshold and then shrinking the non-zero coefficients toward zero.

### Functions used for finding the default values for denoising (THR, SORH, KEEPAPP)
The default values are found automatically using `ddencmp`. The function syntax is:

```Matlab
[THR, SORH, KEEPAPP] = ddencmp('den', 'wv', img)
```

We pass the input noisy image (img), defined denoising method, and wavelet (WV). Executing this function we get the values for these constants.

### Example code to show the use of wdencmp and ddencmp
We first load the original image from the PC.

```Matlab
[filename, pathname] = uigetfile('*.*', 'select input image');
fileWithPath = strcat(pathname, filename);  
img = imread(fileWithPath); % assigning the image to this variable fileWithPath.
```

We read the image using `imread` function. The image `img` is the original image. We manually add noise to make the image noisy.

```Matlab
imgn = imnoise(img, 'gaussian', 0, 0.005);  %add noise
```

> Note that, we add `gaussian` noise of mean value of 0 and variance is 0.005.

We then define the signal extension mode `dwtmode`, which is a periodic extension of the signals. This done using the code below:

```Matlab
dwtmode('per'); %signal extension mode
```

We first execute `ddencmp` function. So, when we execute this function, we will get the `thr`, `sorh`, `keepapp` that will be used in the `wdencmp` function.

```Matlab
[thr, sorh, keepapp] = ddencmp('den', 'wv', imgn); %finding default values
```

After defining the `thr`, `sorh`, `keepapp`, we pass them to the `wdencmp` function as shown below:

```Matlab
% Denoise image using global thresholding.
imgden = wdencmp('gbl', double(imgn), 'sym4', 2, thr, sorh, keepapp);
```

This is done to denoise images using image thresholding.

> Note that, the wavelet and thresholding methods cannot be renamed. This is how they are recognized in Matlab and any change would cause an error.

`gbl` stands for single threshold method. `sym4` is used for the decomposition of wavelet and `2` is the decomposition level.

When we execute the code we get `imgden` as the output. This is the denoised image. We show the images to see the difference, we use the codes below:

```Matlab
subplot(131), imshow(img), title('Original Image')
subplot(132), imshow(img), title('Noisy Image')
subplot(133), imshow(uint8(imgden), []), title('denoised image')
```

We find the SNR (Signal to Noise Ratio):

```Matlab
%Finding SNR
Orig_vs_Noisy_SNR = 20*log10(norm(double(img(:)))/norm(double(img(:))-double(imgn(:))));   % This gives the value of ratio between the original image and the noisy image.
Origin_vs_denoised = 20*log10(norm(double(img(:)))/norm(double(img(:))-double(imgden(:))));   % This gives the value of ratio between the original image and the denoised image.
```

The SNR helps us understand the effects of denoising. The former helps us understand the difference between the original vs the noisy image, while the latter represents the original image vs the denoised image.

Below is the image obtained after execution of the code:

![Output after denoising](/engineering-education/wavelet-transform-based-denoising-of-images-using-matlab/image6.png)

For further reading on this topic, check out the Mathworks documentation [here](https://www.mathworks.com/help/wavelet/denoising-and-compression.html?s_tid=CRUX_lftnav).

### Conclusion
Wavelet transform is an important feature for engineers working with images or audio. This is because it helps in the analysis of signals and decomposes the signal for further analysis.

Wavelet transform is applicable in various fields like image processing, as we have learned here. They can also be applied in the audio signal analysis sector and many others.

Matlab is a very important language that makes understanding wavelets easier. It has numerous in-built features and functions that make this analysis easier.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)