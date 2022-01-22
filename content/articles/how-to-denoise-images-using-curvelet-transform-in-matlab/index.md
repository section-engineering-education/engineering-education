#### How to denoise images using curvelet transform in Matlab
### Table of content
[Introduction](#introduction)
[Prerequisites](#prerequisite)
[Theoritical background of Curvelet transform](#theoritical-background-of-curvelet-transform)
[Curvelet Toolbox](#curvelet-toolbox)
[Curvelet transform of an image](#curvelet-transform-of-an-image)
[Curvelet based denoising of an image](#curvelet-based-denoising-of-an-image)
[Matlab code for denoising](#matlab-code-for-denoising)
[Conclusion](#conclusion)

### Introduction
Curvelet transform is a powerful tool that can capture details along the curvature in images. It is a very useful tool for feature extraction in pattern recognition. It is also efficient in image denoising. Denoising of images is the removal of the noise signals in an image.
This tutorial will look into the Curvelet transform analysis and denoising of images. We will also look at the Matlab code for doing this. Also, in curvelet analysis, there is a curvelet toolbox that we will see how to use.

### Prerequisite
- Have [Matlab](https://www.mathworks.com/products/matlab.html) installed in your computer.
- An understanding of [Matlab](/engineering-education/getting-started-with-matlab/) basics.

### Theoretical background of Curvelet transform
Curvelet transform is a geometric scale transform, used in the representation of edges and curves effeciently than any traditional wavelet. However, wavelets have the disadvantage of poor directionality. They are good in capturing coefficients along the horizontal, vertical, and diagonal axis but poor in capturing coefficients along the curvature.
The complex transform is one way to improve directional selectivity. However, it is difficult to design complex wavelets with perfect reconstruction properties and filter characteristics.
In 1999 Ridgelet transform, which is an anisotropic geometric wavelet transform, was proposed by Candes and Donoho. In 2000, the same authors introduced 1st generation curvelet transform, called Ridgelet transform-based Curvelet transform. Later, a 2nd generation was introduced by the same authors.
This 2nd generation curvelet transform is an efficient tool for many different applications. These applications include image processing, seismic data exploration, fluid mechanics, and solving partial differential equations. It is also efficient in representing curve-like edges. This 2nd generation suffered two main drawbacks, these are;
- It is not optimal for sparse approximation of curve features beyond C-square singularity.
- It is highly redundant, thus giving a highly redundant output.

Later, a fast and less redundant curvelet transform was introduced. This newly implemented curvelet transform, also known as Fast discrete curvelet transform(FDCT), is implemented in two ways;
1. When using [unequally spaced Fast Fourier transform(USFFT)](https://www.researchgate.net/publication/30765385_Fast_Discrete_Curvelet_Transforms).
2. When using [wrapping function](https://www.researchgate.net/publication/30765385_Fast_Discrete_Curvelet_Transforms).

Wrapping-based FDCT is faster than USFFT; therefore, wrapping-based FCDT is widely used.
In general, Discrete curvelet transform can be expressed by;

![expression](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image1.jpeg)

Where;
`C`: is the curvelet coefficients which are the function of `j`, $\theta, k_1$, and $k_2$.
`j`:  is for scale. These are the layer of decomposition. For example, if `j` is 3, we have three levels of decomposition of the image using a curvelet.
$\theta$: Is the curvelet orientation. It is because the Curvelet is arranged in the spatial domain.
$k_1$ and $k_2$: They are the spatial location of the curvelets.
$\varphi[x,y]$: Is the curvelet function.
f[x,y]: Is the input image of the size MxN.

This curvelet transform is usually expressed in the frequency domain as shown below;
```Matlab
curvelet transform = IFFT{FFT(curvelet) x FFT(image)}
```

### Curvelet Toolbox
Mathworks Matlab has no function to implement curvelet transform. However, Curvelet transforms in Matlab can be computed using a third-party toolbox created by curvelet.org. So you get into the site and download the software to get this toolbox.

![curvelab.org](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image2.png)

This software is free. All you need to do is to create an account then download it.
The curvelab have two functions:
```matlab
c=fdct_wrapping(x, is_real, finest, nbscales, nbangles_coarse)  % for FDCT
x=ifdct_wrapping(c, is_real, M, N)
```
In the function above;
`x`: is the input image which is an MxN matrix.
`is_real`: Is the type of transform. Here, 0 is the default. This 0 is for complex-valued curvelets. `1` is for real-valued curvelets.
`Finest`: This is to mean Curvelet or wavelet. The value 1 is for curvelets, and `2` is for wavelets, and it is always the default value.
`nbscales`: This is to show the number of decomposition levels. If this value is not defined, the default value is given by;
```Matlab
ceil[log2(min(M, N))-3]
```
`nbangles_coarse`: This is the orientation of the angles. The value for this must be a multiple of 4. The minimum value is eight, and the default is 16.
`C`: This is the output cell array of the curvelet coefficients. It is in the form `C{j}{k1, k2}`.

### Curvelet transform of an image
We first select our image from the stored folder and then read the image. In this tutorial, we use the images in the curveLab(Lena). So, when you locate the curveLab files, you get it there.
```Matlab
[filename, pathname] = uigetfile('*.*', 'select your input grayscale image');
filewithpath = strcat(pathname, filename);
img = imread(filewithpath);
```
The function `uigetfile` allows you to select an image from different folders. This function takes in the `filename`, the file's name, and the file `path`, which is the file's path as arguments. `Strcat` converts this path to a string, and then the image is read `imread` function. All the pixel values are converted to double, which is a data type using the `double` function as shown below;
```Matlab
imgd = double(img);
```
Now, we are taking the FDCT of the input image, extract the approximation coefficients. Since these coefficients are so large, we normalise them for display and then show these approximation coefficients using the code below;
```matlab
C = fdct_wrapping(imgd, 1, 2, 3); %Taking FDCT of input images.
cA = C{1, 1}{1, 1}; %Extracting approximation coefficients.
cAd = 225.*(cA./max(cA));  %Normalizing coefficients for display only.
figure(1)
imshow(uint8(cAd), []);   % Showing approximation coefficients.
```
To get the FDCT of the input image, we use the curve lab function `fdct_wrapping`. This function takes the image pixel values in a double form stored in the variable `imgd`, real-valued curvelets(1), wavelet at finest level(2), and the decomposition level(3). We then extract approximate coefficients using `C{1,1}{1,1}`. To normalize the coefficients, we use the formula;
```Matlab
225.*(cA./max(cA))
Where;
cA: Are the extracted coefficients.
```
Then the display uses the `imshow` function.
Let us now show all the detailed coefficients at scale 2 using a `for` loop as shown below:
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
`k` is the number of edges, ranging from 1-16. `c` Is the FDCT of the input image. The detailed coefficient at the second decomposition level is extracted using the varying `k`. It is done by `C{1, 2}{1, k}`. These extracted coefficients are resized to a square dimension of `512` using the `imresize` function. These square coefficients are then displayed using the `imshow` function one by one, thus `pause(1)`. So after one display, it pauses before displaying the second and so on.

![curvelet coefficients](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-three.png)

The white colors are the curvelet coefficients of scale two at different orientations. They kept changing since the number of edges was 16. It is how curvelets are efficient in capturing coefficients along the curvature. Below are the approximated coefficients.

![Approximated coefficients](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-four.png)

### Curvelet based denoising of an image(Matlab code)
Below is the curvelet-based denoising scheme.

![Denoising scheme](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-five.jpeg)

This scheme takes the noisy images as the input, performs FDCT to obtain the approximation coefficients `cA` and detailed coefficients `cD`. It then performs the threshold for the detailed coefficients. It produces thresholded coefficients. THE DENOISED IMAGE IS OBTAINED when IFDCT is performed on these thresholded coefficients.

### Matlab code for denoising
We first get the input image from our folder using the `uigetfile` function and read it using the `imread` function. In this case, we use the barbara in the curve lab folder. We then get the size of this image using the `size` function as shown below;
```Matlab
[filename, pathname] = uigetfile('*.*', 'select your input grayscale image');
filewithpath = strcat(pathname, filename);
img = imread(filewithpath);   %reading the image.
imgd = double(img); %converting the image matrix to double datatype.

n = size(img, 1);   %getting the size of the image.
```
Define the noise variance(sigma) and then add noise to the image using the code below;
```Matlab
sigma = 20;

noisy_img = imgd + sigma*randn(n);   %Adding noise
```
`sigma` defines the noise variance, and when you multiply this variance by a random matrix of equal distribution using the function `randn`, we get noise. A noisy image is obtained when added to the input image `img`.
Now, let us obtain the norm of the curvelet. The norm gives a measure of the magnitude of the elements
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
The above is the code for obtaining the norm of the curvelets. These codes remain so in all programs. It is the general way of obtaining the norm of the curvelets.
Let us now find the curvelet transform of the noisy image using the `fdct_wrapping` function.
```matlab
%Taking curvelet transform
C = fdct_wrapping(noisy_img, 1, 2);
```
In this case, the decomposition level is not given; thus, the default one is used, as explained before. To apply the threshold, we use the code below;
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
All the curvelet coefficients `c` are stored in the variable `Ct`. We use a `for` loop to read all the thresholded coefficients. The loop starts from two(2: length(c)). It is because the approximated coefficients are not thresholded. Then, we obtain the threshold using the formula;
```Matlab
3*sigma + sigma*(s == length(C))   %hard thresholding
```
To reconstruct this image using the threshold coefficients, we perform IFDCT.
```matlab
% Taking inverse curvelet transform
restored_img = real(ifdct_wrapping(Ct, 1));
```
To get the IFDCT of the threshold coefficients, we use the `ifdct_wrapping` function. After this, we visualize the output using the `imshow` function.
```matlab
%plotting results
subplot(131); imshow(uint8(img), []); title('Original image');
subplot(132); imshow(uint8(noisy_img), []); title('Noisy image');
subplot(133); imshow(uint8(restored_img), []); title('Denoised image');
```
When performing a denoising operation, it is good to get the Signal to noise ratio(SNR) to see how well your program is performing. This SNR is found using the code below;
```matlab
%Finding SNR
orig_vs_Noisy = 20*log10(norm(imgd(:))/norm(imgd(:)-noisy_img(:)));
orig_vs_Denoised = 20*log10(norm(imgd(:))/norm(imgd(:)-restored_img(:)));
```
`Orig_vs_Noisy` stores the SNR of the original image to the noisy image while `orig_vs_Denoised` stores the SNR of the original to the denoised image. `imgd` is the matrix forming the image but in the `double` form.
When we run our program, we have;

![output of denoised image](/engineering-education/how-to-denoise-images-using-curvelet-transform-in-matlab/image-six.png)

We can see the SNR see if our program is well performed. To get the SNR of the original image to the noise, we execute `orig_vs_Noisy` in the command window. To get that of the original image to the denoised, we execute `orig_vs_Denoised`.
```Matlab
orig_vs_Noisy

orig_vs_Noisy =

   16.2380
orig_vs_Denoised =

   19.5566
```
As we can see, there is an improvement in the SNR from 16 to 19. So that is how our program is effective.

### Conclusion
Curvelet transform is efficient for denoising and performing a transform for the images. The curvelet org. It has made it easy. In the curve lab, we have the Matlab functions and C++. It makes it an efficient tool for performing this operation. Also, the performance of this Curvelet is very effective, as we have seen.

Happy coding!

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

