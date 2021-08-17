### Image processing using Matlab
### Introduction
Image processing is the process of performing some digital operations in an image or a lower quality image to improve on its quality or to get some useful information from the image, this information may be features or characteristics associated with the image. 
Steps of image processing entail importing the image in the image processor application being used, analyzing the image then manipulating the image to get a suitable output that can produce relevant results or information. 
In this article, we are going to discuss the basics of image processing and image analysis using Matlab. This analysis can be used to determine some of the image characteristics, adjusting certain features of the image, and improving the image quality.
### Prerequisites
-[Matlab](https://www.mathworks.com/products/matlab.html) installed.
-proper understanding of [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics
### Image importation in Matlab
Importing an image involves bringing the image to the current directory for Matlab. This makes it possible to use the image for any analysis that you want to carry out. To do this, Open Matlab and type after the command;
```Matlab
i = imread('name of the image;') %This will assign the image to i
imshow(i);
```
After running the above command the intended image will be displayed on the screen.

![The imported image](/engineering-education/image-processing-using-matlab/image_process-a.png) 
### Enhancement of an image using Matlab
This is the process of improving digital images to get more suitable results for visual display. Image enhancement can be done through image filtering and deblurring.
### Image filtering
This is a form of image enhancement that emphasizes or omits certain features of an image. Image filtering mainly involves altering the concentration of a certain color in an image. It can also smoothen or sharpen certain characteristics of the image.
Color filtering makes an image to be more attractive or stresses certain information about an image for example green can stress more about vegetation while blue emphasizes water bodies. This process can either make an image reddish, greenish or bluish depending on the concentration level applied.
`imhist` function gives a graphical presentation of color concentration in an image per pixel(Histogram).
```Matlab
i =  imread('nyali.jpg');
imshow(i)
Red = i(:,:,1);
Green = i(:,:,2);
Blue = i(:,:,3);
temp = i;
```
```Matlab
imhist(Red);
```
![Histogram of red](/engineering-education/image-processing-using-matlab/image_process-b.png) 
```Matlab
imhist(Green);
```
![Histogram of green](/engineering-education/image-processing-using-matlab/image_process-c.png)
```Matlab
imhist(Blue);
```
![Histogram of blue](/engineering-education/image-processing-using-matlab/image_process-d.png)
```Matlab
figure;
temp = i;
temp(:,:,1) = temp(:,:,1) + 100;
imshow(temp);
```
![image filtered red](/engineering-education/image-processing-using-matlab/image_process-e.png)
```Matlab
figure;
imshow(i)
temp = i;
temp(:,:,2) = temp(:,:,2) + 100;
imshow(temp);
```
![image filtered green](/engineering-education/image-processing-using-matlab/image_process-f.png)
```Matlab
temp = i;
temp(:,:,3) = temp(:,:,3) + 100;
imshow(temp);
```
![image filtered blue](/engineering-education/image-processing-using-matlab/image_process-g.png)

### Image deblurring
Deblurring an image increases the clarity of the image by making certain information on the image more visible. To carry out this, we first import the image using the code below;
```Matlab
i =  imread('nyali.jpg');       %this code imports the image
imshow(i)
```
![imported original image](/engineering-education/image-processing-using-matlab/image_process-a.png)

Create a blurred image from the original image `i`, this image will be used as a simulator for the deblurring processes. Begin by making a point spread function(PSF) by using `fspecial` function with specified linear motion (for my case I will use 50 pixels at an angle of 10 degrees) then convolve the PSF with the image by using `imfilter` function.
```mMatlabPSF = fspecial('motion',50,10);
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
Removal of objects whose numerical value is not required, making the image have a uniform background by removing its original background, changing the image to a grayscale image, then creating a binary version of the image which will allow for numerical analysis of the objects to be analyzed.
The following codes are used in the process.
```Matlab
i = imread('imageName'); %import the image
imshow(i)
```
![Imported image](/engineering-education/image-processing-using-matlab/image_process-j.png)
```Matlab
se = strel('disk',150);
background = imopen(i,se);  %Performs morphological openning
imshow(background)
```
![Morphological operation](/engineering-education/image-processing-using-matlab/image_process-k.png)

Remove the background approximation image from the original image. This will form a resulting image with a uniform background but a bit dark.
```Matlab
i2 = i - background; 
imshow(i2)
```
![Image with uniform background](/engineering-education/image-processing-using-matlab/image_process-l.png)

Change the image format from RGB to gray. The newly processed
the image will be assigned to `i3`.
```Matlab
i3 = rgb2gray(i2);
imshowi3
```
![Grayscale image](/engineering-education/image-processing-using-matlab/image_process-m.png)

Use `imbinarize` command to creat a binary version of the grayscale image `i3`.
```Matlab
bw = imbinarize(i3);
bw = bwareaopen(bw,50);
imshow(bw)
```
![Binarized image](/engineering-education/image-processing-using-matlab/image_process-n.png)

The binary version of the image enables the performance of object analysis. The accuracy of the results depends on object size, parameters connectivity, and the spacing between the objects. Note that the green-colored objects are not present in the binary version of the image; true colors(red, green, and blue) can not be binarized.
```Matlab
cc = bwconncomp(bw) % shows image information
```
![Results](/engineering-education/image-processing-using-matlab/image_process-o.png)
### Finding an area in an image of a specific color
Areas of objects with different colors in an image can be determined using Matlab through color thresholding. Thresholding means assigning pixels to a certain class or classes. Color thresholding can also enable us to determine areas of certain features in a map for example finding the area of a water body in a satellite Map. To demonstrate, i will determine the area of a water body from a satellite map picture, the picture has a resolution of 480 * 494 pixels and a bit depth of 32 as per satellite.
```Matlab
i = imread('l.victoria.png'); %import the image
imshow(i)
```
![Imported image](/engineering-education/image-processing-using-matlab/image-process-p.png)
```Matlab
i2 = rgb2gray(i); % make a grayscale image of i
imshow(i2)
```
![Gray scale image](/engineering-education/image-processing-using-matlab/image_process-q.png)
```Matlab
imhist(i2) %histogram for pixel distributions
```
![Histogram of grayscale image](/engineering-education/image-processing-using-matlab/image_process-r.png)

From the histogram, the X-axis represents the intensity value while the Y-axis represents pixel count. Open APPS in Matlab window toolbar, scroll down to image processing and computer vision then click on the color threshold. on the new window load an image from the workspace and then choose a color space, click HSV. 

![Color space window](/engineering-education/image-processing-using-matlab/image_process-s.png)

![HSV window](/engineering-education/image-processing-using-matlab/image_process-t.png)

Adjust the knob labeled H to remove the background colors, adjust S and V to smoothen the boundary of the object to be analyzed.

![Image with separated background](/engineering-education/image-processing-using-matlab/image_process-u.png)

Create a binary version of the resultant image by clicking on the show binary button. 

![Binary version of the image](/engineering-education/image-processing-using-matlab/image_process-v.png)

Import the binary version to the workspace for further analysis, it will be labeled as `BW`. The shape of the binary version resembles the
shape of the lake, we can visually compare the two images using the function `imshowpair`.
```Matlab
imshowpair(i,BW,'montage')
```
![Comparision of i and BW](/engineering-education/image-processing-using-matlab/image_process-w.png)

To find the image statistics of the binary version of the image, use `regionprops` function.
```Matlab
stats = regionprops('table',BW,'all')
```
![Props data table](/engineering-education/image-processing-using-matlab/image_process-x.png)

Area of the region in pixels is the sum of the area props in the table.
```Matlab
areainpixels = sum(props.Area)
```
![Area results](/engineering-education/image-processing-using-matlab/image_process-y.png)

The area can be converted into square kilometers using a scale that may be provided on the map. The scale has a predetermined value indicated usually in miters, miles, or kilometers and it is in form of a straight line. Use `imtool(i)` function to measure the distance between the beginning and the end of the linear scale; The measured value will be in pixels and it represents the predetermined dimension of the scale.
Convert from pixel to the required unit.
### conclusion
Matlab provides a good environment for image processing, the codes are easy to apply due to their interactive nature. Image processing has a wide range of application areas such as; photography, geographical analysis of images for data collection, decorations, the medical field in biological structures, recognizing patterns, machine vision, and entertainment purposes. The accuracy of information extracted from an image depends on the quality of the tool used to process the image and Matlab provides better tools for image processing.
