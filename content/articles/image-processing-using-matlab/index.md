### Image processing using Matlab
### Introduction
Image processing is the process of manipulating the digital properties of an image to improve it's quality or to get desired information from the image.

Image processing entail importing the image in the image processing application, analyzing the image then manipulating the image to get a suitable output that can produce desired results. 

In this article, we are going to discuss the basics of image processing and image analysis using Matlab. This analysis can be used to determine image characteristics, adjusting image features, and improving the image quality.
### Prerequisites
-[Matlab](https://www.mathworks.com/products/matlab.html) installed in your computer.

-proper understanding of [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics
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
### Image filtering
This is a form of image enhancement that emphasizes or omits the selected properties of an image. Image filtering mainly involves altering the concentration of a certain pixels in an image.

Color filtering makes an image to be more attractive or stresses certain image pixels. for instance green can stress more about vegetation while blue emphasizes water bodies.

This process can either make an image reddish, greenish or bluish depending on the concentration level applied.
`imhist` function gives a graphical presentation of color concentration in an image per pixel(Histogram).

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
![Histogram of red](/engineering-education/image-processing-using-matlab/image_process-b.png) 

```matlab
imhist(Green);
```

![Histogram of green](/engineering-education/image-processing-using-matlab/image_process-c.png)

```matlab
imhist(Blue);
```
![Histogram of blue](/engineering-education/image-processing-using-matlab/image_process-d.png)

```matlab
figure;
temp = i;
temp(:,:,1) = temp(:,:,1) + 100;
imshow(temp);
```
![image filtered red](/engineering-education/image-processing-using-matlab/image_process-e.png)

```matlab
figure;
imshow(i)
temp = i;
temp(:,:,2) = temp(:,:,2) + 100;
imshow(temp);
```
![image filtered green](/engineering-education/image-processing-using-matlab/image_process-f.png)

```matlab
temp = i;
temp(:,:,3) = temp(:,:,3) + 100;
imshow(temp);
```
![image filtered blue](/engineering-education/image-processing-using-matlab/image_process-g.png)

### Image deblurring
Deblurring an image increases the clarity of the image by making blurry pixels on the image more visible. 

To carry out this, we first import the image using the code below;
```matlab
i =  imread('nyali.jpg');       %this code imports the image
imshow(i)
```
![imported original image](/engineering-education/image-processing-using-matlab/image_process-a.png)

Create a blurred image from the original image `i`, this image will be used as a simulator for the deblurring processes.

Begin by making a point spread function(PSF) by using the `fspecial` function with specified linear motion (for my case I will use 50 pixels at an angle of 10 degrees) then convolve the PSF with the image by using `imfilter` function.

```matlab
PSF = fspecial('motion',50,10);
Idouble = im2double(i);
blurred = imfilter(Idouble,PSF,'conv','circular');
imshow(blurred)
```
![Blurr version of the original image](/engineering-education/image-processing-using-matlab/image_process-h.png)

Use command `deconvwnr` to restore the blurred image.
```matlab
wnr1 = deconvwnr(blurred,PSF);
imshow(wnr1)
```
![Deblurred image](/engineering-education/image-processing-using-matlab/image_process-i.png)
### Obtaining the number of objects contained in an image
The number of objects contained in an image can be determined through the following steps; 
-Removal of objects whose numerical value is not required. -Making the image have a uniform background by removing it's original background. 
-changing the image to a grayscale image.
-Creating a binary version of the image will allow for numerical analysis of the objects to be analyzed.

The following code snippets are used in the process.

```matlab
i = imread('imageName'); %import the image
imshow(i)
```
![Imported image](/engineering-education/image-processing-using-matlab/image_process-j.png)

```matlab
se = strel('disk',150);
background = imopen(i,se);  %Performs morphological openning
imshow(background)
```
![Morphological operation](/engineering-education/image-processing-using-matlab/image_process-k.png)

Remove the background approximation image from the original image. This will form a resulting image with a uniform background but a bit dark.

```matlab
i2 = i - background; 
imshow(i2)
```
![Image with uniform background](/engineering-education/image-processing-using-matlab/image_process-l.png)

Change the image format from RGB to grayscale. The newly processed image will be assigned to `i3`.

```matlab
i3 = rgb2gray(i2);
imshowi3
```
![Grayscale image](/engineering-education/image-processing-using-matlab/image_process-m.png)

Use `imbinarize` command to creat a binary version of the grayscale image `i3`.

```matlab
bw = imbinarize(i3);
bw = bwareaopen(bw,50);
imshow(bw)
```
![Binarized image](/engineering-education/image-processing-using-matlab/image_process-n.png)

The binary version of the image enables the performance of object analysis. The accuracy of the results depends on object size, parameters connectivity, and the spacing between the objects. 

Note that the green-colored objects are not present in the binary version of the image as true colors(red, green, and blue) can not be binarized.

```matlab
cc = bwconncomp(bw) % shows image information
```
![Results](/engineering-education/image-processing-using-matlab/image_process-o.png)
### Finding an area in an image of a specific color
Areas of objects with different colors in an image can be determined using Matlab through color thresholding. 

Thresholding means assigning pixels to a certain classes based on intensity. Color thresholding can also enable us to determine areas of selected features in a map. For example, finding the area of a water body in a satellite Map. 
To demonstrate, i will determine the area of a water body from a satellite map picture, the picture has a resolution of 480 * 494 pixels and a bit depth of 32 as per satellite.

```matlab
i = imread('l.victoria.png'); %import the image
imshow(i)
```
![Imported image](/engineering-education/image-processing-using-matlab/image-process-p.png)

```matlab
i2 = rgb2gray(i); % make a grayscale image of i
imshow(i2)
```
![Gray scale image](/engineering-education/image-processing-using-matlab/image_process-q.png)

```matlab
imhist(i2) %histogram for pixel distributions
```
![Histogram of grayscale image](/engineering-education/image-processing-using-matlab/image_process-r.png)

From the histogram, the X-axis represents the intensity value while the Y-axis represents pixel count. 

Open APPS in Matlab window toolbar, scroll down to image processing and computer vision then click on the color threshold.

on the new window load an image from the workspace and then choose a color space, click HSV. 

![Color space window](/engineering-education/image-processing-using-matlab/image_process-s.png)

![HSV window](/engineering-education/image-processing-using-matlab/image_process-t.png)

Adjust the knob labeled `H` to remove the background colors, adjust `S` and `V` to smoothen the boundary of the object to be analyzed.

![Image with separated background](/engineering-education/image-processing-using-matlab/image_process-u.png)

Create a binary version of the resultant image by clicking on the `show binary` button. 

![Binary version of the image](/engineering-education/image-processing-using-matlab/image_process-v.png)

Import the binary version to the workspace for further analysis, it will be labeled as `BW`. The shape of the binary version resembles the shape of the lake, we can visually compare the two images using the function `imshowpair`.

```matlab
imshowpair(i,BW,'montage')
```
![Comparision of I and BW](/engineering-education/image-processing-using-matlab/image_process-w.png)

To find the image statistics of the binary version of the image, use the `regionprops` function.

```matlab
stats = regionprops('table',BW,'all')
```
![Props data table](/engineering-education/image-processing-using-matlab/image_process-x.png)

Area of the region in pixels is the sum of the area props in the table.

```matlab
areainpixels = sum(props.Area)
```
![Area results](/engineering-education/image-processing-using-matlab/image_process-y.png)

The area can be converted into square kilometers using a scale that may be provided on the map. The scale has a predetermined value indicated usually in miters, miles, or kilometers.

Use the `imtool(i)` function to measure the distance between the beginning and the end of the linear scale; The measured value will be in pixels and it represents the predetermined dimension of the scale. Convert from pixel to the required unit.
### conclusion
Matlab provides a perfect environment for image processing. The commands and snippets are easy to follow and apply. 

Image processing has a wide range of application areas such as;
-Photography. 

-Geographical analysis of images for data.

-Decorations.

-Understanding biological structures.

-Machine vision, and entertainment. 

The accuracy of information extracted from an image depends on the quality of the tool used to process the image and Matlab provides better tools for image processing.
