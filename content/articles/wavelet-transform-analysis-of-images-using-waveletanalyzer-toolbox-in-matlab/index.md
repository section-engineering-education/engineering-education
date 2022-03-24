---
layout: engineering-education
status: publish
published: true
url: /wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/
title: Wavelet Transform Analysis of Images Using WaveletAnalyzer Toolbox in Matlab
description: This tutorial will walk the reader through wavelet analysis and synthesis of images. It also discusses how the Wavelet Analyzer Toolbox can be used to perform the wavelet analysis of images using Matlab functions.
author: atieno-dorine
date: 2022-03-24T00:00:00-03:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/hero.jpg
    alt: Wavelet Transform Analysis of Images Using WaveletAnalyzer Toolbox in Matlab Hero Image
---
The wavelet transform is the decomposition of signals using wavelet techniques, that is, functions. Each of these functions are shifted and a scaled copy of a function, the mother wavelet.
<!--more-->
Wavelet transform is the definition of the decomposition method class. Wavelet Analyzer app is an interactive tool for using wavelets to visualize and analyze signals and images. This app can be used for the wavelet transform analysis, de-noising images and signals, e.t.c.

This article covers wavelet analysis and synthesis of images using filter banks. It also discusses how to perform wavelet transform analysis of images using the Wavelet Analyzer toolbox. It will also cover how to use the various wavelet functions such as `dwt2` and `idwt2`.

### Prerequisites
To follow along with this tutorial, you will need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### Wavelet transform of images
Images are 2-D data i.e. f(x,y). To transform them, we need 2-D wavelets, i.e. $\varphi$(x,y). Below are the two examples of 2-D wavelets.

![Example of 2-D wavelets](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-one.png)

This approach needs a lot of computational power. Due to that, there is another approach that needs less computational power.

#### The other approach
We can successfully supply the 1-D transform to the rows and columns of images as separable 2-D transform. Instead of taking 2-D wavelets, we use 1-D wavelets and perform row-wise and column-wise operations to get the final 2-D transform.

In most applications where wavelets are used for image processing, this approach is preferred because of the low computational complexity of separable transform.

### Filter bank theory
The wavelet decomposition of an image based on the multi-resolution theory can be done using digital FIR filters. Here, wavelet coefficients are calculated with a fast O(N) algorithm using a multi-rate filter bank proposed by S.Mallet.

The scheme of the filter-based approach and column-wise operation is shown below:

![Scheme](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-two.png)

In the first step, we have an image of the dimension `MxM`. A row-wise operation is performed on this image. It is done in the low-pass wavelet decomposition filter(Lo_D) and the high pass wavelet decomposition filter(Hi-D).

Then the down-sampling of two is done for the output of both filters.

The next step is performing a column-wise operation to the down-sampled output. The down-sampling of two is also done for the output of the column-wise operation. The output of the down-sampling gives the wavelet coefficients.

These coefficients are approximated coefficient, horizontal detailed, vertical detailed and detailed diagonal coefficients.

After obtaining these coefficients, there is a reconstruction scheme to achieve the original image. The scheme is shown below:

![Reconstruction scheme](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-three.png)

The simplified operation at the first level of decomposition is shown below:

![Decomposition at the first level](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-four.png)

At the first decomposition level, all the coefficients are of the dimension `M/2xM/2`. At the second level decomposition, only the approximated coefficients($cA_1$) is decomposed into the four matrices as shown below:

![Decomposition of $cA_1$](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-five.png)

The matrices at this point are of the size `M/4xM/4`. You can do a 3rd level decomposition and so on. Below is an image sampled at different decomposition levels.

![At level one](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-six.png)

![At level two](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-seven.png)

### How to use Matlab wavelet analyzer toolbox
You execute the `waveletAnalyzer` command in the command window to open this toolbox. It opens a new window shown below:

![Wavelet analyzer toolbox](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-eight.png)

In this toolbox, as we can see, we can analyze various signals. These signals include; 1-D, 2-D, 3-D, e.t.c. Since we want to analyze images (2-D), we select the `wavelet 2-D`.

> Note that using this toolbox, we can perform the various wavelet operations such as wavelet transform, wavelet packet transform, curvelet wavelet transform etc.

After selecting `wavelet 2-D`, a new window opens up again, like the one below:

![Wavelet 2-D](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-nine.png)

To load your data into the toolbox, click on the `file` at the top of the window. Next, click on the `Load` tab then select `Image` as shown below:

![Loading data](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-ten.png)

The command `load-image` allows you to select your input image from any folder. When you import your image, it should appear in the original image section as seen here:

![The image section](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-eleven.png)

You can select the wavelet type you want to use and the level of decomposition by clicking on the dropdown arrow. After defining these, click on the analyzer to get the output. In our case, we have used the `haar` wavelet and the decomposition level as three. The output is as as shown below:

![Output](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-twelve.png)

Now let us see how to use the `dwt2()` and `idwt2()` function in Matlab to perform a similar operation.

### Using `dwt2()` and `idwt()` functions
The syntax for these two functions is as follows:

```matlab
[cA, cH, cV, cD]=dwt2(x, 'wname', 'mode', extmode)   %Single level decomposition
Y=idwt(cA, cH, cV, cD, 'wname', 'mode', extmode)    %single level reconstruction
```

Where:
- `cA`: Approximated coefficients.
- `cH`: Horizontal detailed coefficients.
- `cV`: Vertical detailed coefficients.
- `cD`: Detailed Diagonal coefficients.
- `X`: Input image.
- `Y`: Reconstructed image.
- `WName`: This is the type of wavelet you are using.
- `Mode`: Signal extension mode. This extension mode can be periodic, symmetric e.t.c.

`Dwt2()` function is used for the single-level decomposition, while the `idwt2()` is used for single-level reconstruction. The `dwt2()` gives all the coefficients as the output.

The coefficients are used for the image reconstruction. It means they are arguments of the `idwt2()` function.

### Program to show the use of dwt2() and idwt2() function
The first step is to import the input image into Matlab. This will be achieved using the following lines:

```Matlab
[filename, pathname] = uigetfile('*.*', 'Select your input grayscale image');
filewithpath = strcat(pathname, filename);
img = imread(filewithpath);
```

The `uigetfile` is a function that allows the user to select the input image from any folder. This folder does not have to be in the current directory. This input image is then read using the `imread()` function.

Since the input image is not in the current directory, the `imread()` function uses the filename and the path as the arguments to get the image.

Our image `img` is grayscale. It means it is made up of the `uint8` data type. We convert this datatype from `uint8` to double using the `double()` function. It is converted as shown below:

```Matlab
img1 = double(img);
```

We are converting the image to `double` type because the functions `dwt2()` function only accepts double datatype as the arguments.
Let's perform the decomposition using the `dwt2()` function:

```Matlab
[cA, cH, cV, cD] = dwt2(img1, 'haar', 'mode', 'sym'); %first level decomposition
```

We use the `haar` wavelet, and the `extmode` is symmetric `sym`. For visualization we plot these coefficients in subplots as shown below:

```matlab
subplot(2,2,1)
imshow(uint8(cA));
title('Approximated coefficients');

subplot(2,2,2)
imshow(uint8(cH), []);
title('Horizontal detailed coefficients');

subplot(2,2,3)
imshow(uint8(cV), []);
title('Vertical detailed coefficients');

subplot(2,2,4)
imshow(uint8(cD), []);
title('Diagonal detailed coefficients');
```

These coefficients are of the `double` type. We have to convert them to the original type `uint8` and show the output using the `imshow()` function. When we run the program at this point, we will have the plot of the coefficients as shown below:

![Plot of the coefficients](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-thirteen.png)

To get the transformed image, we reconstruct the coefficients. For reconstruction, we use the `idwt2()` function as shown here:

```matlab
imgr = idwt2(cA, cH, cV, cD, 'haar', 'mode', 'sym'); %first level decomposition
```

We then plot the output using the `imshow()` function:

```matlab
figure(2)
imshow(uint8(imgr))
title('Reconstructed Image');
```

When we now run this program, we get the reconstructed image like the one below:

![Reconstructed image](/engineering-education/wavelet-transform-analysis-of-images-using-waveletanalyzer-toolbox-in-matlab/image-fourteen.png)

### Conclusion
As illustrated, the waveletAnalyzer toolbox is simple to use. Its interface is very clear. Also, this toolbox is not only used for wavelet transform but also de-noising, e.t.c.

Therefore, this toolbox is efficient even for users who are unfamiliar with Matlab. Also, you don't have to write any code while using it. Since their output is accurate, the wavelet functions `dwt2()` and `idwt2()` are efficient.

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
