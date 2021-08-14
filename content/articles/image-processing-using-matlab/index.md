
Image processing is the process of manipulating the digital properties of an image to improve its quality or to get desired information from the image. 

Image processing entail importing the image in the image processing application, analyzing the image, then manipulating the image to get a suitable output that can produce desired results.

In this article, we are going to discuss the basics of image processing and image analysis using Matlab. This analysis can be used to determine image characteristics, adjusting image features, and improving image quality.

### Prerequisites
- [Matlab](https://www.mathworks.com/products/matlab.html) installed in your computer.
- Proper understanding of [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics

### Importing an image into Matlab
Importing an image involves bringing the image to the current directory in Matlab. This makes it possible to use the image. 

To do this operation, open Matlab and execute the command below:

```matlab
i = imread('name of the image;') %This will assign the image to i
imshow(i);
```

![The imported image](/engineering-education/image-processing-using-matlab/import1.png) 

### Image enhancement
This is the process of improving the quality of digital images to get more suitable results for visual display. Image enhancement can be done through `image filtering` and `deblurring`.

#### Image filtering
This is a form of image enhancement that emphasizes or omits the selected properties of an image. Image filtering mainly involves altering the concentration of certain pixels in an image. 

Color filtering makes an image to be more attractive or stresses certain image pixels. For instance, green can stress more about vegetation while blue emphasizes water bodies.

This process can either make an image reddish, greenish or bluish depending on the concentration level applied.

`imhist` function gives a graphical presentation of color concentration in an image per pixel(Histogram).

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

![Histogram of red](/engineering-education/image-processing-using-matlab/capturecolor1.png) 

```matlab
imhist(Green);
```

![Histogram of green](/engineering-education/image-processing-using-matlab/capturestepgreen.png)

```matlab
imhist(Blue);
```

![Histogram of blue](/engineering-education/image-processing-using-matlab/captureblue.png)

```matlab
figure;
temp = i;
temp(:,:,1) = temp(:,:,1) + 100;
imshow(temp);
```

![image filtered red](/engineering-education/image-processing-using-matlab/capturered.png)
```

figure;
imshow(i)
temp = i;
temp(:,:,2) = temp(:,:,2) + 100;
imshow(temp);
```

![image filtered green](/engineering-education/image-processing-using-matlab/capturefinal.png)
```matlab
temp = i;
temp(:,:,3) = temp(:,:,3) + 100;
imshow(temp);
```
![image filtered blue](/engineering-education/image-processing-using-matlab/captureb.png)

#### Image deblurring
Deblurring an image increases the clarity of the image by making blurry pixels on the image more visible. 

To carry out this, we first import the image using the code below:
```Matlab
i =  imread('nyali.jpg');       %this code imports the image
imshow(i)
```
![imported original image](/engineering-education/image-processing-using-matlab/import1.png)

Create a blurred image from the original image `i`, this image will be used as a simulator for the deblurring processes. 

Begin by making a point spread function(PSF) by using the `fspecial` function with specified linear motion (for my case I will use 50 pixels at an angle of 10 degrees) then convolve the PSF with the image by using the `imfilter` function.

```matlab
PSF = fspecial('motion',50,10);
Idouble = im2double(i);
blurred = imfilter(Idouble,PSF,'conv','circular');
imshow(blurred)
```
![Blurr version of the original image](/engineering-education/image-processing-using-matlab/blurr.png)


Use command `deconvwnr` to restore the blurred image.
```matlab
wnr1 = deconvwnr(blurred,PSF);
imshow(wnr1)
```

![Deblurred image](/engineering-education/image-processing-using-matlab/capturestep3.png)

### Obtaining the number of objects in an image
The number of objects contained in an image can be determined through the following steps:
- Removal of objects whose numerical value is not required.
- Making the image have a uniform background by removing its original background.
- Changing the image to a grayscale image.
- Creating a binary version of the image will allow for numerical analysis of the objects to be analyzed.

The following code snippets are used in the process.

```matlab
i = imread('imageName'); %import the image
imshow(i)
```

![Imported image](/engineering-education/image-processing-using-matlab/ob1.png)

```matlab
se = strel('disk',150);
background = imopen(i,se);  %Performs morphological openning
imshow(background)
```

![Morphological operation](/engineering-education/image-processing-using-matlab/ob2.png)

Remove the background approximation image from the original image. This will form a resulting image with a uniform background but a bit dark.

```matlab
i2 = i - background; 
imshow(i2)
```

![Image with uniform background](/engineering-education/image-processing-using-matlab/ob3.png)

Change the image format from RGB to grayscale. The newly processed
the image will be assigned to `i3`.

```matlab
i3 = rgb2gray(i2);
imshowi3
```
![Grayscale image](/engineering-education/image-processing-using-matlab/ob4.png)


Use the `imbinarize` command to create a binary version of the grayscale image `i3`.

```matlab
bw = imbinarize(i3);
bw = bwareaopen(bw,50);
imshow(bw)
```
![Binarized image](/engineering-education/image-processing-using-matlab/obb5.png)

The binary version of the image enables the performance of object analysis. The accuracy of the results depends on object size, parameters connectivity, and the spacing between the objects. 

Note that the green-colored objects are not present in the binary version of the image as true colors(red, green, and blue) can not be binarized.

```matlab
cc = bwconncomp(bw) % shows image information
```
![Results](/engineering-education/image-processing-using-matlab/obb6.png)

### Finding the area of a region in an image
Areas of objects with different colors in an image can be determined using Matlab through color thresholding. 

Thresholding is assigning pixels to certain classes based on pixel intensity. Color thresholding can also enable us to determine areas of selected features in a map. For example, finding the coverage of a water body in a satellite Map. 

To demonstrate this concept, I will determine the area of a water body from a satellite map picture, picture. 

```Matlab
i = imread('l.victoria.png'); %import the image
imshow(i)
```
![Imported image](/engineering-education/image-processing-using-matlab/st6.png)

```matlab
i2 = rgb2gray(i); % make a grayscale image of i
imshow(i2)
```

![Gray scale image](/engineering-education/image-processing-using-matlab/st7.png)

```matlab
imhist(i2) %histogram for pixel distributions
```
![Histogram of grayscale image](/engineering-education/image-processing-using-matlab/st8.png)

From the histogram, the X-axis represents the intensity value while the Y-axis represents pixel count. 

Open APPS in Matlab window toolbar, scroll down to image processing and computer vision then click on the color threshold. 

On the new window load an image from the workspace and then choose a color space, click HSV. 

![Color space window](/engineering-education/image-processing-using-matlab/st1.png)

![HSV window](/engineering-education/image-processing-using-matlab/st2.png)

Adjust the knob labeled `H` to remove the background colors, adjust `S` and `V` to smoothen the boundary of the object to be analyzed.

![Image with separated background](/engineering-education/image-processing-using-matlab/st11.png)

Create a binary version of the resultant image by clicking on the `show binary` button. 

![Binary version of the image](/engineering-education/image-processing-using-matlab/st9.png)

Import the binary version to the workspace for further analysis, it will be labeled as `BW`. The shape of the binary version resembles the shape of the lake, we can visually compare the two images using the function `imshowpair`.

```matlab
imshowpair(i,BW,'montage')
```

![Comparision of I and BW](/engineering-education/image-processing-using-matlab/st55.png)

To find the image statistics of the binary version of the image, use the `regionprops` function.

```matlab
stats = regionprops('table',BW,'all')
```
![Props data table](/engineering-education/image-processing-using-matlab/st4.png)

Area of the region in pixels is the sum of the area props in the table.

```matlab
areainpixels = sum(props.Area)
```

![Area results](/engineering-education/image-processing-using-matlab/st5.png)

The area can be converted into square kilometers using a scale that may be provided on the map. The scale has a predetermined value indicated usually in meters, miles, or kilometers.

Use the `imtool(i)` function to measure the distance between the beginning and the end of the linear scale. The measured value will be in pixels and it represents the predetermined dimension of the scale convert from pixel to the required unit.

### Conclusion
Matlab provides a perfect environment for image processing. The commands and snippets are easy to follow and apply. 

Image processing has a wide range of application areas such as;
- Photography.
- Analysis of geographical data.
- Decorations.
- Understanding biological structures,
- Pattern recognition
- Machine vision, and entertainment.

The accuracy of information extracted from an image depends on the quality of the tool used to process the image and Matlab provides better tools for image processing.
