### Image processing using Matlab
### Introduction
Image processing is the process of performing some digital operations in an image or a lower quality image to improve on it is quality or
to get some useful information from the image, this information may be features or characteristics associated with the image. Steps of image
processing entail importing the image in the image processor application being used, analyzing the image then manipulating the image to get 
a suitable output that can produce relevant results or information. In this article, we are going to discuss the basics of image processing
and image analysis using Matlab. This analysis can be used to determine some of the image characteristics, adjusting certain features of the
image, and improving the image quality.
### Prerequisites
-[Matlab](https://www.mathworks.com/products/matlab.html) installed.
-proper understanding of [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics
### Image importation in Matlab
Importing an image involves bringing the image to the current directory for Matlab. This makes it possible to use the image for any analysis
that you want to carry out. To do this, Open Matlab and type after the command prompts;
```matlab
i = imread('name of the image;') %This will assign the image to i
imshow(i);
```
After running the above command the intended image will be displayed on the screen.
![The imported image](import1.png) 
### Enhancement of an image using Matlab
This is the process of improving digital images to get more suitable results for visual display or further processing, these processes include
filtering, deblurring, and removal of noise. Noise is the random changes in certain image qualities like the brightness of color information in
an image.
### Image filtering
Image filtering can emphasize or omit certain features of an image. it can also increase the visual presentation of an image through smoothening
or sharpening certain characteristics of the image. Deblurring an image increases the clarity of the image by making certain information on the
image more visible. To carry out this, we first import the image using the code below;
```matlab
i =  imread('nyali.jpg');       %this code imports the image
imshow(i)
```
![imported original image](import1.png)
Create a blurred image from the original image `i`, this image will be used as a simulator for the deblurring processes. Begin by making a point
spread function(PSF) by using fspecial function with specified linear motion (for my case ill use 50 pixels at an angle of 10 degrees) then
convolve the PSF with the image by using `imfilter` function.
```matlab
PSF = fspecial('motion',50,10);
Idouble = im2double(i);
blurred = imfilter(Idouble,PSF,'conv','circular');
imshow(blurred)
```
![Blurr version of the original image](blurr.png)
Use command `deconvwnr` to restore the blurred image.
```matlab
wnr1 = deconvwnr(blurred,PSF);
imshow(wnr1)
```
![Deblurred image](capturestep3.png)
### Editing color concentration of an image using Matlab
color editing makes an image to be more attractive or to stress on certain information about an image for example green can stress more about
vegetation while blue emphasizes on water bodies. This process can either make an image redish, greenish of bluish. `imhist` function gives a
graphical presentation of colour concentration in an image per pixel(Histogram).
```matlab
i =  imread('C:/Users/user/Pictures/nyali.jpg');
imshow(i)
Red = i(:,:,1);
Green = i(:,:,2);
Blue = i(:,:,3);
temp = i;
```
```matlab
imhist(Red);
```
![Histogram of red](capturecolor1.png) 
```matlab
imhist(Green);
```
![Histogram of green](capturestepgreen.png)
```matlab
imhist(Blue);
```
![Histogram of blue](captureblue.png)
```matlab
figure;
temp = i;
temp(:,:,1) = temp(:,:,1) + 100;
imshow(temp);
```
![image filtered red](capturered.png)
```
figure;
imshow(i)
temp = i;
temp(:,:,2) = temp(:,:,2) + 100;
imshow(temp);
```
![image filtered green](capturefinal.png)
```matlab
temp = i;
temp(:,:,3) = temp(:,:,3) + 100;
imshow(temp);
```
![image filtered blue](captureb.png)

### Counting the number of objects in an image
This process involves; removal of objects whose numerical value is not required, making the image have a uniform background by removing its
original background, changing the image to a grayscale image then creating a binary version of the image which will allow for numerical analysis.
True colors (Red, Green, and blue) will not be binarized hence their numerical value will not be included in the final results. Removal of
objects that cannot be contained in the structure of the elements to be counted will be done using a disk radius of 150. The following codes
are used in the process.
```matlab
i = imread('imageName'); %import the image
imshow(i)
```
![Imported image](ob1.png)
```matlab
se = strel('disk',150);
background = imopen(i,se);  %Performs morphological openning
imshow(background)
```
![Morphological operation](ob2.png)
Remove the background approximation image from the original image. This will form a resulting image with a uniform background but a bit dark.
```matlab
i2 = i - background; 
imshow(i2)
```
![Image with uniform background](ob3.png)
Change the image format from RGB to gray then Increase the contrast of the image `i2` using the command `imadjust`. The newly processed
image will be assigned to `i3`.
```matlab
i3 = rgb2gray(i2);
imshowi3
```
![Grayscale image](ob4.png)
Use `imbinarize` command to creat a binary version of the grayscale image `i3`.
```matlab
bw = imbinarize(i3);
bw = bwareaopen(bw,50);
imshow(bw)
```
![Binarized image](obb5.png)
The binary version of the image enables the performance of object analysis. The accuracy of the results depends on object size, parameters 
connectivity, and the spacing between the objects. Note that the green-colored objects are not present in the binary version of the image.
```matlab
cc = bwconncomp(bw) % shows image information
```
![Results](obb6.png)
### Finding an area in an image of a specific color
Areas of objects with different colors in an image can be determined using Matlab through color thresholding. Thresholding means assigning
pixels to a certain class or classes. Color thresholding can also enable us to determine areas of certain features in a map for example finding
the area of a water body in a satellite Map. To demonstrate I will determine the area of a water body from a satellite map picture, the picture
has a resolution of 480 * 494 pixels and a bit depth of 32 as per satellite.
```matlab
i = imread('l.victoria.png'); %import the image
imshow(i)
```
![Imported image](st6.png)
```matlab
i2 = rgb2gray(i); % make a grayscale image of i
imshow(i2)
```
![Gray scale image](st7.png)
```matlab
imhist(i2) %histogram for pixel distributions
```
![Histogram of grayscale image](st8.png)
From the histogram, the X-axis represents the intensity value while the Y-axis represents pixel count. Open APPS in Matlab window toolbar,
scroll down to image processing and computer vision then click on the color threshold. on the new window load an image from the workspace and
then choose a color space, click HSV. 
![Color space window](st1.png)
![HSV window](st2.png)
Adjust the knob labeled H to remove the background colors, adjust S and V to smoothen the boundary of the object to be analyzed.
![Image with separated background](st11.png)
Create a binary version of the resultant image by clicking on the show binary button. 
![Binary version of the image](st9.png)
Import the binary version to the workspace for further analysis, it will be labeled as `BW`. The shape of the binary version resembles the
shape of the lake, we can visually compare the two images using function `imshowpair`.
```matlab
imshowpair(i,BW,'montage')
```
![Comparision of `i` and `BW`](st55.png)
To find the image statistics of the binary version of the image, use `regionprops` function.
```matlab
stats = regionprops('table',BW,'all')
```
![Props data table](st4.png)
Area in pixels is the sum of the area props in the table.
```matlab
areainpixels = sum(props.Area)
```
![Area results](st5.png)
The area can be converted into square kilometers using a scale that may be provided on the map. The scale has a predetermined value indicated
usually in miters, miles, or kilometers and it is in form of a straight line. Use `imtool(i)` function to measure the distance between the
beginning and the end of the linear scale; the measured value will be in pixels and it represents the predetermined dimension of the scale.
Convert from pixel to the required unit.
### conclusion
Matlab provides a good environment for image processing, the codes are easy to apply due to their interactive nature. Image processing has 
a wide range of application areas such as; photography, geographical analysis of images for data collection, decorations, the medical field in
biological structures, recognizing patterns, machine vision, and entertainment purposes. The accuracy of information extracted from an image
depends on the quality of the tool used to process the image and Matlab provides better tools for image processing.
