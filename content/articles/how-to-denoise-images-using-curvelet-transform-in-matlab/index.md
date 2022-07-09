---
layout: engineering-education
status: publish
published: true
url: /how-to-denoise-images-using-curvelet-transform-in-matlab/
title: How to Denoise images using Curvelet Transform in Matlab
description: This tutorial will explore Curvelet analysis and how one can use it to denoise images in Matlab.
author: paul-juma
date: 2022-02-01T00:00:00-08:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/hero.jpg
    alt: How to Denoise Images using Curvelet Transform in Matlab Hero Image
---
Curvelet transform is a powerful tool that can capture details along the curvature in images. It is useful when it comes to feature extraction and pattern recognition. 
<!--more-->
Curvelet transform is also efficient in image denoising. This is the removal of noise signals in an image.

This tutorial will look into the Curvelet transform analysis and denoising of images using Matlab. We will also discuss the application of the Curvelet toolbox.

### Table of contents
- [Prerequisites](#prerequisite)
- [Theoretical background of Curvelet transform](#theoretical-background-of-curvelet-transform)
- [Curvelet Toolbox](#curvelet-toolbox)
- [Curvelet transform of an image](#curvelet-transform-of-an-image)
- [Curvelet based denoising of an image](#curvelet-based-denoising-of-an-image)
- [Matlab code for denoising](#matlab-code-for-denoising)
- [Conclusion](#conclusion)

### Prerequisite
To follow along, you need to have:
- [Matlab](https://www.mathworks.com/products/matlab.html) installed in your computer.
- A clear understanding of [Matlab](/engineering-education/getting-started-with-matlab/) basics.

### Theoretical background of Curvelet transform
Curvelet transform is a geometric scale transform, used to represent edges and curves more efficiently than traditional wavelets. A huge disadvantage of wavelets is that they are not directional.

Wavelets are effective in capturing coefficients along the horizontal, vertical, and diagonal axes but poor in determining coefficients along the curvature.

The complex transform is one way to improve directional selectivity. However, it is difficult to design complex wavelets with perfect reconstruction properties and filter characteristics.

Ridgelet transform was proposed by Candes and Donoho in 1999. It was regarded as an anisotropic geometric wavelet transform. 

In 2000, they introduced 1st and 2nd generation Curvelet transform, called Ridgelet transform-based Curvelet transform.

The 2nd generation Curvelet transform is an efficient tool in numerous applications including image processing, seismic data exploration, fluid mechanics, and solving partial differential equations. It is also efficient in representing curve-like edges.

However, this generation suffered two main drawbacks:

- It is not optimal for sparse approximation of curve features beyond C-square singularity.
- It is highly redundant, thus giving a poor output.

Later, a fast and less redundant Curvelet transform version was introduced. This newly implemented version, also known as Fast discrete curvelet transform (FDCT), is implemented in two ways:

1. [Unequally spaced Fast Fourier transform(USFFT)](https://www.researchgate.net/publication/30765385_Fast_Discrete_Curvelet_Transforms).

2. [Wrapping function](https://www.researchgate.net/publication/30765385_Fast_Discrete_Curvelet_Transforms).

Wrapping-based FDCT is faster than USFFT, which makes it widely used.

In general, Discrete Curvelet transform can be expressed as follows:

![expression](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-one.jpeg)

Where:
`C`: is the Curvelet coefficients which are the function of `j`, $\theta, k_1$, and $k_2$.
`j`: is for scale. These are the layers of decomposition. For example, if `j` is 3, we have three levels of decomposition of the image using a Curvelet.
$\theta$: This is the Curvelet orientation. It is because the Curvelet is arranged in the spatial domain.
$k_1$ and $k_2$: They are the spatial location of the Curvelet.
$\varphi[x,y]$: Is the Curvelet function.
f[x,y]: This is the input image with a size of `MxN`.

This curvelet transform is usually expressed in the frequency domain, as shown below:

```Matlab
curvelet transform = IFFT{FFT(curvelet) x FFT(image)}
```

### Curvelet toolbox
Mathworks Matlab has no function to implement Curvelet transform. However, they can be computed using a third-party toolbox created by [Curvelab](curvelet.org).

Fortunately, the software is free. All you need is to create an account, then download it.

The Curvelab has two functions:

```matlab
c=fdct_wrapping(x, is_real, finest, nbscales, nbangles_coarse)  % for FDCT
x=ifdct_wrapping(c, is_real, M, N)
```

In the function above;
`x`: is the input image which is an MxN matrix.

`is_real`: Is the type of transform. Here, `0` is the default and is used for complex-valued curvelet. `1` is for a real-valued curvelet.

`Finest`: This can be Curvelet or wavelet. The value `1` is for curvelet, and `2` is for the wavelet.

`nbscales`: This shows the number of decomposition levels. If this value is not defined, the default value is given by:

```Matlab
ceil[log2(min(M, N))-3]
```

`nbangles_coarse`: This is the orientation of the angles. This value must be a multiple of `4`. The minimum value is `8`, and the default is `16`.

`C`: This is the output cell array of the Curvelet coefficients. It is in the form of `C{j}{k1, k2}`.

### Curvelet transform of an image
We first need to select our image from the stored folder and then read the image. In this tutorial, we use the images in the CurveLab (Lena).

```Matlab
[filename, pathname] = uigetfile('*.*', 'select your input grayscale image');
filewithpath = strcat(pathname, filename);
img = imread(filewithpath);
```

The function `uigetfile` allows one to select an image from different folders. It takes in the `filename` and `path` as arguments.

`Strcat` converts this path to a string, and then the image is read using the `imread` function. All pixel values are converted to double, as shown below:

```Matlab
imgd = double(img);
```

Now, we are taking the `FDCT` of the input image, and extracting the approximation coefficients. 

Since these coefficients are so large, we normalize them for display using the code below:

```matlab
C = fdct_wrapping(imgd, 1, 2, 3); %Taking FDCT of input images.
cA = C{1, 1}{1, 1}; %Extracting approximation coefficients.
cAd = 225.*(cA./max(cA));  %Normalizing coefficients for display only.
figure(1)
imshow(uint8(cAd), []);   % Showing approximation coefficients.
```

To get the FDCT of the input image, we use the curve lab function `fdct_wrapping`. This function takes the image pixel values that are stored in the `imgd` variable, real-valued curvelets (1), wavelet at finest level (2), and the decomposition level (3).

We then extract approximate coefficients using `C{1,1}{1,1}`. To normalize the coefficients, we use the formula:

```Matlab
225.*(cA./max(cA))
Where;
cA: Are the extracted coefficients.
```

Then the display uses the `imshow` function. For instance, let's show all the detailed coefficients at scale `2` using a `for` loop:

```Matlab
%Showing all the detailed coefficients at scale 2.

figure(2)
for k=1:16
    x=C{1, 2}{1, k};
    xr=imresize(x, [512, 512]);
    imshow(uint8(xr), []);
    pause(1);
end
```

`k` is the number of edges, ranging from `1-16`. `c` Is the `FDCT` of the input image. The detailed coefficient at the second decomposition level is extracted using the varying `k`. It is done by `C{1, 2}{1, k}`.

These extracted coefficients are resized to a square dimension of `512` using the `imresize` function. 

The square coefficients are then displayed using the `imshow` function one by one:

![curvelet coefficients](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-three.png)

The white colors are the Curvelet coefficients of scale 2 at different orientations. They kept changing since the number of edges was `16`. This is how Curvelets are efficient in capturing coefficients along the curvature.

The image below shows the approximated coefficients:

![Approximated coefficients](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-four.png)

### Curvelet based denoising of an image
Below is the curvelet-based denoising scheme:

![Denoising scheme](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-five.jpeg)

This scheme takes the noisy images as the input, performs FDCT to obtain the approximation coefficients `cA` and detailed coefficients `cD`. 

It then analyzes the threshold for the detailed coefficients. The denoised image is obtained when IFDCT is performed on these thresholded coefficients.

### Matlab code for denoising
We first retrieve the input image from our folder using the `uigetfile` function and read it using the `imread` function. 

We then determine the size of this image using the `size` function, as shown below:

```Matlab
[filename, pathname] = uigetfile('*.*', 'select your input grayscale image');
filewithpath = strcat(pathname, filename);
img = imread(filewithpath);   %reading the image.
imgd = double(img); %converting the image matrix to double datatype.

n = size(img, 1);   %getting the size of the image.
```

Define the noise variance (sigma) and then add noise to the image using the code below:

```Matlab
sigma = 20;

noisy_img = imgd + sigma*randn(n);   %Adding noise
```

`sigma` defines the noise variance. You get noise when you multiply this variance by a random matrix of equal distribution using the function `randn`. 

Let'calculate the norm of the curvelet. The norm gives a measure of the element's magnitude:

```matlab
%Compute norm of curvelets(exact)
F = ones(n);
X = fftshift(ifft2(F)) * sqrt(numel(F));
Cn = fdct_wrapping(X, 0, 2);
E = cell(size(Cn));

for s = 1:length(Cn)
    E{s} = cell(size(Cn{s}));

    for w = 1:length(Cn{s})
        A = Cn{s}{w};
        E{s}{w} = sqrt(sum(sum(A.*conj(A))) / numel(A));
    end
end
```

The code above is for obtaining the norm of the Curvelet. The code remains unchanged in all programs. It is the general way of obtaining the Curvelet's norm.

Let's now find the Curvelet transform of the noisy image using the `fdct_wrapping` function:

```matlab
%Taking curvelet transform
C = fdct_wrapping(noisy_img, 1, 2);
```

In this case, the decomposition level is not given. Thus, the default one is used. To apply the threshold, we use the code below:

```Matlab
%Applying thresholding
Ct = C;

for s = 2:length(C)
    thresh = 3*sigma + sigma*(s == length(C));

    for w = 1: length(C{s})
        Ct{s}{w} = C{s}{w}.*(abs(C{s}{w}) > thresh*E{s}{w}); %hard thresholding
    end
end
```

All the curvelet coefficients are stored in the variable `Ct`. We use a `for` loop to read all the thresholded coefficients. 

The loop starts from two (2: length(c)). This is because the approximated coefficients are not thresholded. We obtain the threshold using the following formula:

```Matlab
3*sigma + sigma*(s == length(C))   %hard thresholding
```

We also perform IFDCT to reconstruct this image using the threshold coefficients:

```matlab
% Taking inverse curvelet transform
restored_img = real(ifdct_wrapping(Ct, 1));
```

To get the IFDCT of the threshold coefficients, we use the `ifdct_wrapping` function. After this, we visualize the output using the `imshow` function:

```matlab
%plotting results
subplot(131); imshow(uint8(img), []); title('Original image');
subplot(132); imshow(uint8(noisy_img), []); title('Noisy image');
subplot(133); imshow(uint8(restored_img), []); title('Denoised image');
```

When performing a denoising operation, it is good to get the Signal to noise ratio(SNR) to see how well your program is performing. This SNR can be obtained using the code below:

```matlab
%Finding SNR
orig_vs_Noisy = 20*log10(norm(imgd(:))/norm(imgd(:)-noisy_img(:)));
orig_vs_Denoised = 20*log10(norm(imgd(:))/norm(imgd(:)-restored_img(:)));
```

`Orig_vs_Noisy` stores the SNR of the original image to the noisy image while `orig_vs_Denoised` stores the SNR of the original to the denoised image. 

`imgd` is the matrix forming the image but in the `double` form.

When we run our program, we get:

![output of denoised image](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-six.png)

We can see the SNR if the analysis is well performed. To get the SNR of the original image to the noise, we execute `orig_vs_Noisy` in the command window. 

To get that of the original image to the denoised, we execute `orig_vs_Denoised`:

```bash
orig_vs_Noisy

orig_vs_Noisy =

   16.2380
orig_vs_Denoised =

   19.5566
```

As we can see, there is an improvement in the SNR from `16` to `19`. Our program can now be described as effective.

### Conclusion
Curvelet transform is efficient for denoising and transforming images. 

In the [Curvelab](curvelab.org), we can access Matlab functions and C++ code. This makes it an efficient tool for performing several operations. 

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)