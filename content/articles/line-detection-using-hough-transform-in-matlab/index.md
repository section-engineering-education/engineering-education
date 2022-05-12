---
layout: engineering-education
status: publish
published: true
url: /line-detection-using-hough-transform-in-matlab/
title: Line Detection using Hough Transform in MATLAB
description: This article will help you understand line detection using hough transform in matlab.
author: atieno-dorine
date: 2022-02-12T00:00:00-02:44
topics: [Languages]
excerpt_separator:
images:

  - url: /engineering-education/line-detection-using-hough-transform-in-matlab/hero.jpg
    alt: Line Detection Using Hough Transform in MATLAB Hero Image
---
Hough transform is an algorithm that isolates specific shapes in an image. These desired features should be specified in a given parametric form. This algorithm is widely used in detecting regular curves. These curves are such as lines, curves, ellipses, etc. However, the general application of hough transform is impossible to attain the simple analytical feature description. For example, line detection is an important feature that helps analyze two objects. It can give a more important relationship between the two objects.
<!--more-->
This tutorial will look at how we can use the hough transform in Matlab. Furthermore, we will understand the importance of line detection and how to carry out line detection using Matlab code.

### Prerequisites
To follow along with this tutorial, you will need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Table of content
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Standard hough transform](#standard-hough-transform)
- [Using hough transform to detect a line](#using-hough-transform-to-detect-a-line)
- [Conclusion](#conclusion)

### Standard hough transform
We can use this transform to measure the length of a line. For example, suppose a line in an image needs to be detected, it can do that.

![Straight line](/engineering-education/line-detection-using-hough-transform-in-matlab/image-one.png)

The general expression of a line is y=mx+c. It means that you can map a line into a coordinate pair, `m, c`. However, vertical lines have a problem, since the slope value is unbounded. In this case, the hough transform uses a different parametric representation. The parameters are $\theta$ and $\rho$. Here, $\theta$ is the angle between the axis and the origin line connecting that closest point. $\rho$ corresponds to the distance from the origin to the nearest point on the straight line.

![Expression using rho, and theta](/engineering-education/line-detection-using-hough-transform-in-matlab/image-two.png)

Conceptually, hough transform is the mapping of image coordinate in the x and y into the parametric coordinate $\theta, \rho$

### Using hough transform to detect a line
Suppose an image consists of a line as shown below;

![Your line](/engineering-education/line-detection-using-hough-transform-in-matlab/image-three.png)

A line is made up of multiple points. Similarly, multiple lines can pass through the same point. We visualize multiple lines in a hough transform plane where the parameters $\theta$ are on the x-axis and $\rho$ on the y-axis. Every point on the image is transformed into a sinusoid. A sinusoid is a signal in the shape of a sine wave.

![Image in the hough transform plane](/engineering-education/line-detection-using-hough-transform-in-matlab/image-four.png)

It makes sense because many lines may pass through a given point in an image plane. It translates into a sinusoid in the hough plane. If two or more of these lines coincide to form a line in the image plane, they will intersect in the hough transform plane. This intersection corresponding to the $\theta, \rho$ pair corresponds to the detected line.

![Conciding lines](/engineering-education/line-detection-using-hough-transform-in-matlab/image-five.png)

> Note that the number of sinusoids intersecting determined the strengths of a line. It is how hough transformation works.

### Extracting line segments using hough transform in Matlab
Suppose you have an image with a line and you want to extract the line segments; the algorithm is:
1. Create a hough transform matrix using the hough function.
2. Locate the peaks in the Hough transform matrix function. The peaks correspond to the intersection point in the parameter plane. Each of these peaks is a detected line.
3. Use a hough transform function to map the peak back into the image plane. You then extract the line segments.

Now, we use a simple image to implement the above algorithm. We have two binary images shown below;

![Binary images](/engineering-education/line-detection-using-hough-transform-in-matlab/image-six.png)

These images are binary because hough transform function works on binary images. Note that it is possible to plot these two images in Matlab. We will first plot these two images and extract line segments. We first plot the image with the two dots and extract lines from it before going to the second.

To plot the image with the two dots, we will execute the code below;

```matlab
close all
clear
clc
%% 1. Image with two dots
a = zeros(50);
a(20,20) = 1; a(40,10) = 1;
figure;
subplot(2,2,1)
imshow(a)
title('Image with 2 dots')
```

`Close all` is used to close all the open figures, and `clc` clears the command window. We then make a matrix of zeros of the dimension 50x50 using `zero(50)`. `a(20, 20)` and `a(40, 10)` are the points at which the dots are placed. `Figure` creates a figure window. We then use the `imshow()` to view the output. Finally, using the `subplot()` function, we create a subplot for our output. `subplot(m,n,p)` creates an `MxN` axes, and the plot is placed at position `p`.

We use the `hough()` function to compute the hough matrix. This function takes in binary images as the input. This function gives out three outputs, that is, Transform matrix(H), theta(T), and rho(R). After that, we visualize the output using the utility function `houghMatViz()` as shown below:

```Matlab
[H, T, R] = hough(a);
subplot(2, 2, 2)
houghMatViz(H, T, R)
```

>Let us look at the content of this utility function. Remember, this function should be in a different script, and then we call it.

```Matlab
function houghMatViz(H,T,R)
Hgray = mat2gray(H); % Converting hough matrix(H) into grayscale image.
Hgray = imadjust(Hgray); % Enhancing the brightness

imshow(Hgray,'XData',T,'YData',R);
hold on

axis on % turning on the axis.
axis normal 
colormap(hot);title('Hough Transform'); % Giving colormap to the image.

xlabel('\theta')  % add x-y labels
ylabel('\rho');
```

This utility function converts the hough matrix into a grayscale image using the `mat2gray()` function. Then, the brightness of the grayscale image is adjusted using the imadjust()` function. Finally, this function takes the grayscale image as the argument. The `imshow()` function displays the output depending on the `XData` and the `YData`.
    
When we execute this code, we get two sinusoids that correspond to the two points in the image, as shown below:

![Two sinusoids corresponding to the two points](/engineering-education/line-detection-using-hough-transform-in-matlab/image-seven.png)

We use the `houghpeaks()` function to find the peaks. Using this function, you can provide the number of peaks required to be returned as the output. The output will be the highest peak if you fail to provide this. 

```Matlab
hPeaks = houghpeaks(H);
```

The output is the largest peak since we did not specify the number of peaks. To see this, execute `hpeaks` in the command window.
We can find where the peak occurs in the `H` matrix. It is done by indexing theta(T), Rho(R) array, and the pixel location and plotting the output as shown below:

```Matlab
x = T(hPeaks(:,2));  %indexing the theta(T) array
y = R(hPeaks(:,1));  %Indexing the rho(R) array

plot(x,y,'gs')
```

The output is:

![Peak](/engineering-education/line-detection-using-hough-transform-in-matlab/image-eight.png)

The green square is the peak location. Peak location is the line that goes through the two image dots.
Now, we will apply the same logic to the second image. The only difference here is that we extract line segments to redraw the detected lines.
Lets first plot the line.

```matlab
b = eye(150);
subplot(2,2,3)
imshow(b)
title('Image with a line')
```

Here, we use the function `eye()` to give an MxN matrix wherewith the ones in the main diagonal and zeros in other parts. When we use this function, we get the plot as shown below:

![Plot of line](/engineering-education/line-detection-using-hough-transform-in-matlab/image-nine.png)

In the image, there are many sinusoids. Each of these sinusoids corresponds to a point on a line.
The last step is to map the peak back into the image plane and extract the line segments. It can be done using `houghlines()` function. This function takes in the original image as the input for the image reference, an array of T, R values, and the peaks, which must be marked back into the image plane as the arguments.

```Matlab
hlines = houghlines(b, T, R, hPeaks);
```

Using these `hline` values, we can redraw the detected lines on the original image. This helps us to see if the detection worked. To do this we use the code below:

```matlab
xy = [hlines.point1; hlines.point2];
figure;
imshow(b)
hold on
plot(xy(:,1), xy(:,2), 'g--', 'Linewidth', 5)
title('Detected line')
```

Here, we use the `hlines` structure to create two points, i.e. `hlines.point1` and `hlines.point2`. On top of the original image, we plot the points with different linestyle(--), color (g), and linewidth(5). It gives the below plot.

![Reconstruction](/engineering-education/line-detection-using-hough-transform-in-matlab/image-ten.png)

We see the original line in the figure, and the dashed line represents the detected line. Now using this method, we can extract lines from images.

### Conclusion
Hough transform forms an algorithm that makes it easy to detect lines in images. Also, this same algorithm can be used to detect lines in videos. It is because a video is a combination of video frames. Video frames are the image part of a section. It means we can train the algorithm using images and then implement it in videos. It makes it widely applicable in the robotic field.

Happy coding.

---
Peer Review Contributions by: [Kelvin Munene](/engineering-education/authors/kelvin-munene/)

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