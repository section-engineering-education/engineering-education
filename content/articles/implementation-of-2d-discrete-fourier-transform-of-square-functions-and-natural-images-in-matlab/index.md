---
layout: engineering-education
status: publish
published: true
url: /implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/
title: Implementation of 2-D Discrete Fourier Transform of Square Functions and Natural Images in Matlab
description: This article will look  at the background theory of the DFT and shows how to implement it in digital and natural images.
author: peter-adongo
date: 2022-06-19T00:00:00-10:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/hero.jpg
    alt: Implementation of 2-D Discrete Fourier Transform of square functions and natural images in Matlab Hero Image
---
The discrete-time Fourier transform (DFT) represents an image as a sum of complex exponential of varying magnitudes, frequency and phases. Square functions as an image representation of a square, while the natural images are the image representation with rich local covariance. We can perform DFT for all these image types to improve their qualities.
<!--more-->
In this tutorial, we will look at the background theory of the DFT. We will see the applications and limitations of this process. We will also look at the Matlab code for the 2D-DFT of a square and the natural images.

### Prerequisites
To follow along the reader will need the following:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### 2D-Discrete time Fourier transform (DTFT)
For an image f(x,y) of the MxN, DTFT can be computed using the equation below:

$$f(\omega_1, \omega_2) = \sum^\infty_{x=0} \sum^\infty_{y=0} f(x,y)e^{-j\omega_1x} e^{-j\omega_2y}$$

$F(\omega_1, \omega_2)$ is a complex-valued continuous function that is periodic in both $\omega_1$ and $\omega_2$ with a period of $2\pi$. Since the periodicity usually on the range $-\pi <=(\omega_1, \omega_2)<=\pi$ is displayed.

The component F(0,0) is the sum of all the values of the image f(x,y). For this reason, F(0, 0) is often called the DC component of the Fourier transform. It is called so because, for $\omega_1=0$ and $\omega_2=0$, there is no frequency.

Since $F(\omega_1, \omega_2)$ is complex-valued, $|F(\omega_1, \omega_2)|$ is known as the magnitude spectrum and $<F(\omega_1, \omega_2)$ is known as the phase spectrum.

The inverse transform exists. We can get image f(x,y) back from its spectrum $F(\omega_1, \omega_2)$ by the following equation:

$$f(x,y)=\frac{1}{4\pi^2}\int^\pi_{\omega_1=-\pi}\int^\pi_{\omega_2=-\pi}F(\omega_1, \omega_2)e^{j\omega_1x}e^{j\omega_2y}d\omega_1d\omega_2$$

This equation states that f(x,y) can be represented as a sum of the infinite number of complex exponential(sinusoids) of different frequencies. $F(\omega_1, \omega_2)$ is a continuous function of $\omega$; therefore, this computation is not suitable for computers as they are discrete devices.

To make it feasible for computation in computers, $F(\omega_1, \omega_2)$ a continuous function of $\omega$, has to be discretized. Therefore, $F(\omega_1, \omega_2)$ is sampled to get the discrete values.

The DTFT represents the sampled version of a continuous spectrum of DTFT. This is the relationship between TFT and DTFT. We can say that DTFT is the normal frequency transform of your signal. It gives a continuous function of $\omega$. This function is not suitable for computer computations.

We are doing here that instead of the continuous function of $\omega$, we get the discrete version of the spectrum. For an image f(x,y) of the size MxN, DFT can be computed by the following equation.

$$F(u,v)=\sum^{M-1}_{x=0} \sum^{N-1}_{y=0} f(x,y)e^{-j(\frac{2\pi ux}{M})} e^{-j(\frac{2\pi vy}{N})}$$

The DTFT coefficients F(u,v) are samples of the DTFT having the following relations:

$$F(u, v)=F(\omega_1, \omega_2)$$ 

Where; 
  $\omega_1=\frac{2\pi u}{M}$  
  $\omega_2=\frac{2\pi v}{N}$,  
  x = 0, 1, 2...(M-1)  
  and y = 0, 1, 2...(N-1).  

Inverse DFT exists. Image f(x,y) can be recovered from DFT samples F(u,v) by the following equation:

$$F(x,y)=\frac{1}{MN}\sum^{M-1}_{u=0} \sum^{N-1}_{v=0} f(u,v)e^{j(\frac{2\pi ux}{M})} e^{j(\frac{2\pi vy}{N})}$$

Where:
  x = 0, 1, 2...(M-1)  
  and y = 0, 1, 2...(N-1).

For more information on the background theory and the mathematical equations of DFT, we can check [here](https://brilliant.org/wiki/discrete-fourier-transform/).

### DFT applications and limitations
- Spectral analysis of signals: If you have the spectral of a particular image, you can visualize it to give the signal's frequency content.
- Filter design based on the signal information, you can design filters. What range of frequency you will allow, and what range you will attenuate.
- Finding systems response using fast convolution with the help of FFT. This is because the DFT equation we discussed before is computationally heavy. To get fast DFT computation, we need to have a fast algorithm FFT. Using FFT, we can compute the DFT computation in very little computation, which is good for computers.
- Image filtering and restoration: It can be used to enhance image quality.
- Fast correlation: It can be used to find the relationship between images. Also, for finding a particular pattern in an image.
- Solving differential and partial differential equations.

### Limitations of the DFT
- DFT spectrum is complex. It has both magnitude and phase spectrums. No sparse representation.
- DFT spectrum represents only magnitude vs frequency information. It has no time information, unlike wavelet transform. So, you cannot have information on the changes in the signal or the image.

### DFT of 2D square function
The image below shows a square function in the spatial domain at the center.

![Image in spatial domain](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/square-function.png)

We can visualize the same image in 3D as shown below:

![Image in spatial domain 3D](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/3D-squareFunction.png)

We can have the magnitude spectrum of the square function in the frequency domain. For example, the magnitude spectrum as shown below:

![Magnitude spectrum in the frequency domain](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/magnitude-spectrum.png)

The image above does not give clear information. If we look at the image in 3D, we can have a better idea. 

The 3D spectrum is shown below:

![Magnitude spectrum in 3D(freq. domain)](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/3DMagnitude-spectrum.png)

Now, here we can see the clear variations.

### DFT of a natural image 
Now, we have a natural image, and its responding 2D spectrum is shown below:

![Magnitude spectrum in freq. domain](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/lena3D-spatialDomain.png)

In the spectrum, we can see the center to be so bright. It means it has the highest magnitude. We can visualize this in 3D. Below is the cross-section of the center.

![Crossection of the center](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/lena-crossection.png)

Let us now look at the Matlab code for the 2D-DFT of square function and natural image for the images we used before.

### Matlab code for the 2D-DFT of a square and natural image
We start by reading the images using the `imread()` function. 

```matlab
%Program to compute 2D FFT of a square function and natural images.
f0 = imread('f0.bmp');
f1 = imread('f1.bmp');
f2 = imread('f2.bmp');
img = imread('lena.bmp');
```

The `f0`, `f1`, and `f2` are the square function but different sizes. So the size increased from `f0` to `f1`.

> Note that the image should be in the `.bmp` format. It is because its array is an MxN matrix. Some `.bmp` files have an additional column. Remove this column after reading your image.

We will then find the magnitude spectrum. To get this magnitude, we do the following:

```matlab
%finding magnitude spectrum
F0 = abs(fftshift(fft2(f0))); 
F1 = abs(fftshift(fft2(f1)));
F2 = abs(fftshift(fft2(f2)));
Fimg = abs(fftshift(fft2(img)));
```

We have used the Matlab function `fft2()` to compute the father spectrum and the images' mean. This spectrum is shifted to the center using the `fftshift()` function. When we compute the `fft()` function, we get only a quarter part of the spectrum for visualization. If we shift it to the center, we can get the complete spectrum.

We use the `abs()` function because we find the magnitude since the spectrum has complex values that cannot be plotted.
We will now plot the images with their corresponding spectrums into subplots.

```Matlab
subplot(331)
imshow(f0); title('Image1 (Spatial domain)')

subplot(332)
imshow(f1); title('Image2 (Spatial domain)')

subplot(333)
imshow(f2); title('Image3 (Spatial domain)')
```

To plot the corresponding magnitude spectrum in 2D, we use the following code:

```matlab
subplot(334)
imshow(log(1+F0), []); title('Mag. spectrum of image1')

subplot(335)
imshow(log(1+F1), []); title('Mag. spectrum of image2')

subplot(336)
imshow(log(1+F2), []); title('Mag. spectrum of image3')
```

In the code above, we use the `imshow()` function to plot the images. We use the `log(1+F0)` because if we directly use `F0` as the argument for the `imshow()` function, we will get a dark image.

It is dark because the `f(0, 0)` component has a very large magnitude compared to other frequency components. So, there is a huge difference between the magnitudes of these spectrums. This `log` reduces the magnitude difference to a small size, and thus we can visualize the available details in the image.

Now, we will visualize the magnitude spectrum in 3D. It is done using the `mesh()` function as shown below:

```Matlab
% 3D plots of the spectrum
subplot(337)
mesh(F0)
title('Mag. spectrum of image1 (3D)')

subplot(338)
mesh(F1)
title('Mag. spectrum of image2 (3D)')

subplot(339)
mesh(F2) 
title('Mag. spectrum of image3 (3D)')
```

When we run this program at this point, the output will be as shown below:

![Output of the first figure](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/output-figureOne.png)

From the output, we can observe that as the size of the square function increase in the spatial domain, the corresponding magnitude spectrum in 3D becomes sharper. 

This shows the property of the Fourier transform, which states that good time resolution is equivalent to poor frequency resolution and vice versa. It means that the sharper you are in the spatial domain, the coarser you will be in the frequency domain.

We create a separate figure to plot the lenna image in the spatial and the frequency domain. 

```Matlab
figure
subplot(121)
imshow(img)
title('Lena in Spatial domain')

subplot(122)
imshow(log(1+Fimg), [])
title('Lena in freq. domain')
```

The output is as shown below:

![Output of the lenna image](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/output-figureTwo.png)

The brightest point in the frequency domain shows the DC components. We can visualize the magnitude spectrum in 3D. It is done by executing the `mesh` command in the command window as shown below:

```Matlab
mesh(Fimg)
```

The output is as shown below:

![3D Magnitude plot of the lenna image](/engineering-education/implementation-of-2d-discrete-fourier-transform-of-square-functions-and-natural-images-in-matlab/lena3D-spectrum.png)

This is how we plot the spectrum of an image in Matlab.

### Conclusion
Performing the discrete Fourier transform is an essential process in improving the image or signal quality. It gives a wider image view in the spatial and frequency domain that helps you process your image. Performing this process in Matlab is made easier using functions in Matlab. This feature makes Matlab efficient to solve DFT problems.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

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
