---
layout: engineering-education
status: publish
published: true
url: /how-to-use-edge-histogram-descriptor-to-retrieve-images-in-matlab/
title: How to use Edge Histogram Descriptor to Retrieve Images in Matlab
description: This tutorial will discuss edge histogram descriptor (EHD), how to implement it in matlab, and its usefulness in image retrieval.
author: florence-atieno
date: 2022-03-10T00:00:00-02:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-use-edge-histogram-descriptor-to-retrieve-images-in-matlab/hero.jpg
    alt: How to use Edge Histogram Descriptor to Retrieve Images in Matlab Hero image
---
Edge Histogram descriptor is a method describing texture. It is mostly used for image retrieval. This method classifies images on local edge distribution with the histogram-based descriptor.
<!--more-->
Image retrieval is a computer process used in a large database of digital images to browse and retrieve images. It could be done using Edge Histogram in Matlab.

This tutorial will look at the visual descriptor - the edge histogram descriptor. It is an effective visual descriptor that focuses on the spatial edge distribution in an image.

We'll see the theory of EHD, its implementation in Matlab and its effectiveness in image retrieval. We will also interpret the output for proper understanding.

### Prerequisites
To follow along with this tutorial, you will need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### MPEG-7 visual descriptor
MPEG-7 is a standard for describing the future of multimedia content. It provides the world's richest set of audio-visual descriptions. With the help of these descriptors, users can search, browse, and retrieve content more effectively. It is more effective than using text-based search engines.

Many descriptors are members of the MPEG-7 family. They are categorized as follows:
- _Color descriptors_: These include dominant colour, scalable colour, colour layout, colour structure, and colour temperature.
- _Texture descriptor_: They are homogenous texture, texture browsing, edge histogram.
- _Shape descriptor_: They are region, contour, shape, 3D, and perceptual 3D.
- _Motion descriptor_: Include Camera motion, motion trajectory, parametric motion, and motion activity.
- _Others_: Localization descriptor, face identity descriptor, image signature.

### Edge histogram descriptor
The texture is a powerful low-level descriptor for image search and retrieval applications like colour. The distribution of edges is a good texture signature useful for image matching.

To capture features, MPEG-7 provides `Edge Histogram Descriptor(EHD)`, which is useful when the underlying region is not homogenous in texture properties.

EHD captures the spatial distribution of edges. It captures edges grouped into five categories, that is:
- Vertical
- Horizontal
- Diagonal45
- Diagonal135 and
- Isotropic(non-orientation specific)

### Steps for computing EHD
1. **Image partitioning**: The input image is divided into `4x4(16)` non-overlapping blocks. Each extracted block is further divided into 2x2 blocks for capturing local edge orientation. If the image dimension is not completely divisible by 4, it is resized so that M/4 and N/4 become an integer.

![Partitioning](/engineering-education/how-to-use-edge-histogram-descriptor-to-retrieve-images-in-matlab/edge-one.png)

Depending on the image size, the `2x2` blocks can be as many as possible.

2. **Capturing local edge orientation**: For each block`(M/4xN/4)`, a five point bin is initialized as:
`Bin=[V, H, D45, D135, NOE]=[0, 0, 0, 0, 0]` Where:</br>
`V` is the Vertical edge orientation</br>
`H` is the Horizontal edge orientation</br>
`D45` is the Diagonal edge @$45\degree$ orientation</br>
`D135` is the Diagonal edge @$135\degree$ orientation</br>
`NOE` is the Non-edge orientation(isotropic)</br>

Therefore, we have 16bins(from bin1 to bin16) for all the blocks. If the bins are kept side by side, it makes the EHD vector of the total length of `80(16x5)`. This EHD vector is given by: `EHD=Bin[1], Bin[2],...Bin[16]`

### How to capture edge orientation from the 2x2 block
The local edge orientation from the `2x2` sub-block is captured by the following `2x2` operators as shown below:

![Operators](/engineering-education/how-to-use-edge-histogram-descriptor-to-retrieve-images-in-matlab/edge-two.png)

Each operator applied on `2x2` sub-block is captured by following `2x2` operators as:

$EO_{type}=|\sum a_k.d_k|$

Where:

$$
[a_k]=\left(\begin{array}{cc}
a_0 & a_1\\
a_2 & a_3
\end{array}\right)
$$

$$
[d_k]=\left(\begin{array}{cc}
d_0 & d_1\\
d_2 & d_3
\end{array}\right)
$$

$[a_k]$ represents the `2x2` sub-block and $[d_k]$ represents edge detector. Using this method, we get five values i.e $EO_v, EO_h, EO_{d45}, EO_{d135}$, and $EO_{noe}$.

After this, we get the dominant edge orientation by finding the maximum of these five values and comparing to the predefined threshold(T) as shown below:

$$EO_{dominant}=max(EO_v, EO_h, EO_{d45}, EO_{d135})>T$$

The $EO_{dominant}$ will be equal to any of the five orientations(max). The count of the corresponding bin point is increased by 1. It is because they were all initialized to 0. This is repeated for all `2x2` sub-block in one image block.

For one image block, we get the complete bin as shown below:

`Bin[1]=[b0, b1, b2, b3, b4]`

The operation above is repeated for all the 16-image blocks to get 16 bins. Then we arrange the bins for all the 16 image blocks as:

$$
[AllBins]=\left(\begin{array}{cc}
b_0 & b_1 & b_2 & b_3 & b_4\\
b_5 & b_6 & b_7 & b_8 & b_9\\
. & . & . & . & .\\
. & . & . & . & .\\
b_{75} & b_{76} & b_{77} & b_{78} & b_{79}
\end{array}\right)
$$

We can find the global bin by taking the mean of the matrix `AllBins` as: `GlobalBin = mean(AllBins)`

The global bin, as the name suggests, is the mean bin. If this global bin is combined with all calculated bins, the length of the EHD vector will be 85. The final representation of the EHD vector will be: `EHD=[Bin[1], Bin[2],...Bin[16], GlobalBin]`

> Note that the MPEG-7 EHD suggests only the 80points. However, if we include the global bin, the results are much better than that of 80 points.

### Matlab code for retrieving images
We first get the two input images, that is, `img1` and `img2`:

```matlab
[filename, pathname]=uigetfile('*.*', 'Select your input image');
filewithpath=strcat(pathname, filename);
img1=imread(filewithpath);

[filename2, pathname2]=uigetfile('*.*', 'Select your input image');
filewithpath2=strcat(pathname2, filename2);
img2=imread(filewithpath2);
```

In the code above, the `uigetfile()` function allows you to select the input image from any directory on your pc. This input image is then read using the `imread()` function.

Let's now compute the corresponding EHD for the input images:

```matlab
ehd1 = findehd(img1); %Finding EHD1
ehd2 = findehd(img2); %Finding EHD2
```

When computing the EHD, we use the utility function `findehd()`. The utility function is a function that is not defined by Matlab but created by the user.

Now let's plot the images with their corresponding bins. We plot the bins in a subplot using the `subplot()` function:

```Matlab
figure(1)

subplot(221); imshow(img1); title('image1') %Image 1
subplot(222); bar(ehd1(81:85)); title('Global bin of image1') %bar plot of the global bin of image 1.
subplot(223); imshow(img2); title('image2') %image 2
subplot(224); bar(ehd2(81:85)); title('Global bin of image2') %bar plot of the global bin of image 2.
```

We use the `imshow()` function to show the image. We also create the bar plot of the global for both images using the `bar()` function. This is for easy comparison.

As explained earlier, the global bin is the last five points of the EHD vector. So we extract these five points using `(ehd2(81:85)`.

Then we will create another figure which plots the EHD for the images in the same window:

```Matlab
figure(2)
plot(ehd1); hold on; plot(ehd2); title('Comparing EHD1 and EHD2')
legend('EHD1', 'EHD2'); %plotting EHD
```

Since we plot the EHD for the input image in the same window, we add `legend` to know which plot is for which image.

Compute the distance between `ehd1` and `ehd2`:

```Matlab
%L2 distance between EHD1 and EHD2
D2=sqrt(sum((ehd1-ehd2).^2)); %norm(ehd1-ehd2),1);
disp(strcat('L2 Distance=',num2str(D2)))

%L1 distance between EHD1 and EHD2
D1=sum(abs(ehd1-ehd2)); %norm(ehd1-ehd2),1);
disp(strcat('L1 Distance=',num2str(D1)))
```

We use the formula `sum(abs(ehd1-ehd2))` to find the distance. Alternatively, we can use the Matlab function `norm()`. We finally display the output using the `disp()` function.

After running the code, we will get the following output:

![Plot for the global bin](/engineering-education/how-to-use-edge-histogram-descriptor-to-retrieve-images-in-matlab/edge-three.png)

![Comparing ehd1 and ehd2](/engineering-education/how-to-use-edge-histogram-descriptor-to-retrieve-images-in-matlab/edge-four.png)

The bars represent the various categories of edge orientation. The order of the bars is vertical, horizontal, diagonal@$45\degree$, diagonal@$135\degree$ and isotropic orientation.

From the bar plot, we can see which edge orientation is dominant. For example, for both images, the horizontal edge orientation is predominant over the other edge orientation.

When you look at the command window, you get the distance between the EHD1 and EHD2 as shown below:

```Matlab
L2 Distance=1549.1178
L1 Distance=9516
```

You can get the source code, the utility function, and the images used [here](https://github.com/florenceatieno45/edge-histogram-descriptor).

### Conclusion
Edge histogram descriptor (EHD) is a tool that makes it easy to retrieve images in a database. This system retrieves the images based on their edges.

It considers the five types of edges that we have described above. This method captures the edge of the input image and compares it to the various edges of other images in the database. It makes it a more efficient and time-saving image retrieval method.

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
