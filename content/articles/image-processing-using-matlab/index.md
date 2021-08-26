---
layout: engineering-education
status: publish
published: true
url: /image-processing-using-matlab/
title: Image Processing using Matlab
description: In this article, we are going to discuss the basics of image processing and analysis using Matlab to determine image characteristics, adjusting image features, and improving image quality.
author: vitalis-odhiambo
date: 2021-08-26T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/image-processing-using-matlab/hero.jpg
    alt: Image processing using matlab
---
Image processing is the process of manipulating the digital properties of an image to improve its quality or to get the desired information from the image. It entails importing the image in the image processing application, analyzing the image, then manipulating the image to get a suitable output that can produce desired results. 
<!--more-->
In this article, we are going to discuss the basics of image processing and analysis using Matlab to determine image characteristics, adjusting image features, and improving image quality.

### Prerequisites
- Have [Matlab](https://www.mathworks.com/products/matlab.html) installed in your computer.
- An understanding of [Matlab](/engineering-education/getting-started-with-matlab/) basics.

### Image importation in Matlab
Importing an image involves bringing the image to the current directory for Matlab. This makes it possible to use the image. 

To do this operation, Open Matlab and execute the command below:

```matlab
i = imread('name of the image;') %This will assign the image to i
imshow(i);
```

![The imported image](/engineering-education/image-processing-using-matlab/image_process-a.png) 

### Enhancement of an image using Matlab
This is the process of improving digital images to get more suitable results for visual display. Image enhancement can be done through `image filtering` and `deblurring`.

#### Image filtering
This is a form of image enhancement that emphasizes or omits the selected properties of an image. Image filtering mainly involves altering the concentration of certain pixels in an image. 

Color filtering makes an image more attractive or stresses certain image pixels. For instance, green can stress vegetation, while blue emphasizes water bodies.

This process can either make an image reddish, greenish or bluish depending on the concentration level applied.
`imhist` function gives a graphical presentation of color concentration in an image per pixel (Histogram).

```matlab
i =  imread('nyali.jpg');
imshow(i)
Red = i(:,:,1);
Green = i(:,:,2);
Blue = i(:,:,3);
temp = i;
```

```matlab
imhist(Red);
```

![Histogram of red](/engineering-education/image-processing-using-matlab/image_process-b.PNG) 

```matlab
imhist(Green);
```

![Histogram of green](/engineering-education/image-processing-using-matlab/image_process-c.PNG)

```matlab
imhist(Blue);
```

![Histogram of blue](/engineering-education/image-processing-using-matlab/image_process-d.PNG)

```matlab
figure;
temp = i;
temp(:,:,1) = temp(:,:,1) + 100;
imshow(temp);
```

![image filtered red](/engineering-education/image-processing-using-matlab/image_process-e.PNG)

```matlab
figure;
imshow(i)
temp = i;
temp(:,:,2) = temp(:,:,2) + 100;
imshow(temp);
```

![image filtered green](/engineering-education/image-processing-using-matlab/image_process-f.PNG)

```matlab
temp = i;
temp(:,:,3) = temp(:,:,3) + 100;
imshow(temp);
```

![image filtered blue](/engineering-education/image-processing-using-matlab/image_process-g.PNG)

#### Image deblurring
Deblurring an image increases the clarity of the image by making blurry pixels on the image more visible. To carry out this, we first import the image using the code below:

```matlab
i =  imread('nyali.jpg');       %this code imports the image
imshow(i)
```

![imported original image](/engineering-education/image-processing-using-matlab/image_process-a.PNG)

- Create a blurred image from the original image `i`. This image will be used as a simulator for the deblurring processes. 
- Begin by making a point spread function (PSF) by using the `fspecial` function with specified linear motion (for my case I will use 50 pixels at an angle of 10 degrees) then convolve the PSF with the image by using `imfilter` function.

```matlab
PSF = fspecial('motion',50,10);
Idouble = im2double(i);
blurred = imfilter(Idouble,PSF,'conv','circular');
imshow(blurred)
```

![Blur version of the original image](/engineering-education/image-processing-using-matlab/image_process-h.PNG)

- Use the command `deconvwnr` to restore the blurred image.

```matlab
wnr1 = deconvwnr(blurred,PSF);
imshow(wnr1)
```

![Deblurred image](/engineering-education/image-processing-using-matlab/image_process-i.PNG)

### Obtaining the number of objects contained in an image
The number of objects contained in an image can be determined through the following steps:
- Removal of objects whose numerical value is not required. 
- Making the image have a uniform background by removing its original background. 
- Changing the image to a grayscale image.
- Creating a binary version of the image will allow for a numerical analysis of the objects to be analyzed.

The following code snippet is used in the process.

```matlab
i = imread('imageName'); %import the image
imshow(i)
```

![Imported image](/engineering-education/image-processing-using-matlab/image_process-j.PNG)

```matlab
se = strel('disk',150);
background = imopen(i,se);  %Performs morphological openning
imshow(background)
```

![Morphological operation](/engineering-education/image-processing-using-matlab/image_process-k.PNG)

- Remove the background approximation image from the original image. This will form a resulting image with a uniform background but a bit dark.

```matlab
i2 = i - background; 
imshow(i2)
```

![Image with uniform background](/engineering-education/image-processing-using-matlab/image_process-l.PNG)

- Change the image format from RGB to grayscale. The newly processed image will be assigned to `i3`.

```matlab
i3 = rgb2gray(i2);
imshowi3
```

![Grayscale image](/engineering-education/image-processing-using-matlab/image_process-m.PNG)

- Use the `imbinarize` command to create a binary version of the grayscale image `i3`.

```matlab
bw = imbinarize(i3);
bw = bwareaopen(bw,50);
imshow(bw)
```

![Diarized image](/engineering-education/image-processing-using-matlab/image_process-n.PNG)

The binary version of the image enables the performance of object analysis. The accuracy of the results depends on object size, parameters connectivity, and the spacing between the objects.

>Note that the green-colored objects are not present in the binary version of the image as true colors(red, green, and blue) can not be binarized.

```matlab
cc = bwconncomp(bw) % shows image information
```

![Results](/engineering-education/image-processing-using-matlab/image_process-o.PNG)

### Finding an area in an image of a specific color
Areas of objects with different colors in an image can be determined using Matlab through color thresholding. Thresholding is assigning pixels to certain classes based on intensity. 

Color thresholding also enables us to determine areas of selected features in a map. For example, finding the area of a water body in a satellite Map.

To demonstrate this concept, I will determine the area of a body of water from a satellite map picture. The picture has a resolution of `480 * 494` pixels and a depth of 32 as per satellite.

```matlab
i = imread('l.victoria.PNG'); %import the image
imshow(i)
```

![Imported image](/engineering-education/image-processing-using-matlab/image-process-p.PNG)

```matlab
i2 = rgb2gray(i); % make a grayscale image of i
imshow(i2)
```

![Gray scale image](/engineering-education/image-processing-using-matlab/image_process-q.PNG)

```matlab
imhist(i2) %histogram for pixel distributions
```

![Histogram of grayscale image](/engineering-education/image-processing-using-matlab/image_process-r.PNG)

From the histogram, the X-axis represents the intensity value while the Y-axis represents pixel count. 

- Open APPS in Matlab window toolbar, scroll down to image processing and computer vision, then click on the color threshold. 
- On the new window load an image from the workspace and then choose a color space, click HSV. 

![Color space window](/engineering-education/image-processing-using-matlab/image_process-s.PNG)

![HSV window](/engineering-education/image-processing-using-matlab/image_process-t.PNG)

- Adjust the knob labeled `H` to remove the background colors, adjust `S` and `V` to smoothen the boundary of the object to be analyzed.

![Image with separated background](/engineering-education/image-processing-using-matlab/image_process-u.PNG)

- Create a binary version of the resultant image by clicking on the `show binary` button. 

![Binary version of the image](/engineering-education/image-processing-using-matlab/image_process-v.PNG)

- Import the binary version to the workspace for further analysis, it will be labeled as `BW`. The shape of the binary version resembles the shape of the lake, we can visually compare the two images using the function `imshowpair`.

```matlab
imshowpair(i,BW,'montage')
```

![Comparison of I and BW](/engineering-education/image-processing-using-matlab/image_process-w.PNG)

- To find the image statistics of the binary version of the image, use the `regionprops` function.

```matlab
stats = regionprops('table',BW,'all')
```

![Props data table](/engineering-education/image-processing-using-matlab/image_process-x.PNG)

The area of the region in pixels is the sum of the area props in the table.

```matlab
areainpixels = sum(props.Area)
```

![Area results](/engineering-education/image-processing-using-matlab/image_process-y.PNG)

The area can be converted into square kilometers using a scale that may be provided on the map. Usually, the scale has a predetermined value indicated in meters, miles, or kilometers.

Use the `imtool(i)` function to measure the distance between the beginning and the end of the linear scale. The measured value will be in pixels, and it represents the predetermined dimension of the scale. Convert from pixel to the required unit.

### Conclusion
Matlab provides a perfect environment for image processing, as the commands and snippets are easy to follow and apply. 

Image processing has a wide range of application areas, such as;
- Photography. 
- Geographical analysis of images for data.
- Decorations.
- Understanding biological structures.
- Machine vision, and entertainment. 

The accuracy of information extracted from an image depends on the quality of the tool used to process the image, and Matlab provides better tools for image processing.

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
