
### Introduction
Object-based image analysis is the processing of an image based on the classification of its pixels to get more helpful information on the image. For example, such data can be based on height, edges, and boundaries. Matlab provides an interactive environment for object-based image analysis by executing functions used in analysis or inbuilt apps for image processing.

Images contain objects with distinct regions. These regions have features such as area, perimeter, shapes, and height. Matlab allows for analysis of these properties using image analyzer functions or region props to obtain data from these images.

Object-based image analysis is useful, especially in analyzing satellite maps, machine vision, and obtaining information based on object characteristics in an image.

### Table of contents
- [Prerequisites](#prerequisites)
- [Edge detection](#edge-detection)
- [Methods of edge detection](#methods-of-edge-detection)
- [Object boundary detection](#object-boundary-detection)
- [Boundary detection using morphological operations](#boundary-detection-using-morphological-operations)
- [Obtaining boundary by erosion](#obtaining-boundary-by-erosion)
- [Obtaining boundary by dilation](#obtaining-boundary-by-dilation)
- [Highlighting text in an image](#highlighting-text-in-an-image)
- [Labeling objects in images](#labeling-objects-in-images)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Basic understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.


### Edge detection 
Edge detection is the identification of points within an image. These points are where the image has excellent contrast, and they are the defining points of the image. Edge detection work by detecting changes in brightness of the image pixels.

Edge detection is useful in image segmentation and data extraction for comparison, objects separation, computer vision, and machine learning. Matlab supports a variety of functions that aids in edge detection.

### Methods of edge detection
There are several methods used in edge detection in images. These methods are used with the primary function `edge()`.  We will demonstrate most of these methods using a similar image and then compare the outcome to find a more suitable way to provide a more detailed output.

All these methods only accept a grayscale image input; hence it is essential to fast convert the RGB image to a grayscale image, conversion of RGB to gray is done using the function `rgb2gray()`. The initial stage of all image processes is importing the image to the Matlab workspace. Importation of image is done using the function `imread('imagefolderpath')`. 

The following codes are used in importation and image conversion to grayscale. The outcome will be used to demonstrate various edge detection methods.

First, we import the image using the function `imread()` as demonstrated with the below codes.
```matlab
i = imread('print.PNG'); %importing the image
figure,imshow(i) %  Displaying the imported image
```
![The imported image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_one.jpg)

The imported RGB image is then converted to a grayscale image using the `rgb2gray()`, this is important since the methods of edge detection we are going to discus only accetps a graycale image as the input image. The below codes show conversion of RGB image to grayscale.
```matlab
i2 = rgb2gray(i) %coverting the imported RGB image to grayscale image
figure,imshow(i2)% Displaying the grayscale image 
```
![Grayscale image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_two.jpg)

We will use this grayscale image `i2` to demonstrate sobel, prewitt, log and canny methods of edge detection in images. 

The following are edge detection methods with codes illustrations:

- Sobel method; in this method, the edge is determined from the points with the highest gradient. This method is executed using the function `sobel()` and the syntax is `i_edge = edge(i_gray,'sobel')`.

 To detect edges using sobel method, we use the function `edge()` then in the bracket we specificy the grayscale image followed by the method used for the process of edge detection. For example, in the below codes our grayscale image is `i2` then the method is `sobel`. When the below codes are executed the output figure assigned variable `s` consist of object edges detected using sobel method.
```matlab
s = edge(i2,'sobel'); % edge detection using sobel method
figure,imshow(s) %displaying edges detected using sobel method
```
![Edges detected using sobel method](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_three.jpg)

- Prewitt method: This is a suitable method of estimating the magnitude and orientation of edges in an image. It gives a more detailed output compared to the sobel method. The output image may be noisy depending on the number of edges present and their proximity. This method is executed using the function `prewitt()` and the syntax is `i_edge = edge(i_gray,'prewitt')`.

To detect edges using prewitt method, we use the function `edge()` then in the bracket we specificy the grayscale image followed by the method used for the process of edge detection. For our case, the grayscale image is `i2` then the method of edge detection  is `prewitt`. When the below codes are executed the output figure assigned variable `p` consist of object edges detected using prewitt method. 
```matlab
p = edge(i2,'prewitt'); %edge detection using prewitt method
figure, imshow(p) %displaying edges detected using prewitt method
```
![Edges detected using Prewitt method](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_four.jpg)

- Log method: This method smoothens the image then executes the laplacian function resulting in a double-edged image. This method uses the function `log()` and the syntax is `i_edge = edge(i_gray,'log')`.

 To detect edges using log method, we use the function `edge()` ,in the bracket we specificy the grayscale image followed by the method used for edge detection process. For our case, the grayscale image is `i2` then the method of edge detection  is `log`. When the below codes are executed, the output figure assigned variable `l` consist of object edges detected using log method. 
```matlab
l = edge(i2,'log'); %edge detection using log method
figure, imshow(l) %displaying edges detected using log method
```
![Edge detected using log method](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_five.jpg)

- Canny method: This method detects the edges by separating noise from the image. This is better because it does not disturb the features of the edges in the image. This method uses the function `canny()` and the syntax is `i_edges = edge(i_gray,'canny')`.

 To detect edges of objects contained in an image using the canny method, we use function `edge()`, in the bracket we specify the grayscale image followed by the method used for detecting the edges. For our case the method used is `canny` and the grascale image is `i2`. When the codes are executed, the output image assigned variable `c` consist of object edges detected using canny method.
```matlab
c = edge(i2,'canny'); %edge detection using canny method
figure, imshow(c) %displaying edges detected using canny method
```
![Edge detected using canny method](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_six.jpg)


### Object boundary detection
Boundaries are lines that mark the limits of an object or an area. A boundary in images can be detected by either performing morphological operations on the image or using toolbox functions.

### Boundary detection using morphological operations
Morphological operations mainly involve subtracting some parts of a binarized image remaining with only the object's boundary. In morphological operations, boundaries can be detected by either `erosion` or `dilation` of the objects whose boundary is to be obtained.

### Obtaining boundary by erosion
In this method, some pixels from a binarized image are removed, the eroded part is then subtracted from the main image containing the main object. The remaining part is the boundary of the object. Erosion of image is done using the function `imerode()` with a specified `strel()` length. The following codes and step by step illustrations of this method;

First, we import the image which will be used to perform the operations. The image is imported using the function `imread()` as shown in the codes below.
```matlab
i = imread(plate.PNG); %importing the image to workspace
figure,imshow(i) %displaying the imported image
```
![Imported image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_seven.jpg)

We then convert the imported rgb image to a grayscale image using the function `rgb2gray()`, the output grayscale image will be assigned `i_gray` as shown in the below codes.
```matlab
i_gray = rgb2gray(i); % converting the imported image to grayscale image
figure,imshow(i_gray) %displaying the grayscale image
```
![Grayscale version of the imported image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_eight.jpg)

The grayscale image `i_gray` is then converted to a black and white image using a threshold value, for our case, we will use a threshold value of 250. we will label the black and white image as `i2`. The following codes demonstrate this process. 
```matlab
i2 = i_gray< 250; %making a black and white image from the grayscale image
figure, imshow (i2) %displaying the black and white image
```
![Black and white image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_nine.jpg)

We then specify the strel length which will be used to perform morphological erosion, we will use a disk length of 80 to erode the black and white image `i2`. The eroded image will be labeled `i_eroded` .The below codes shows this process.
```matlab
se1 = strel('disk',80); % specifying strel length for erosion process
i_eroded = imerode(i2,se1); % erosion of the image at a specified strel length
figure, imshow(i_eroded) % Displaying the eroded image
```
![Eroded image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_ten.jpg)

The boundary is then obtained by subtracting the eroded part of the image `i_eroded` from the black and white image `i2` as shown in the following codes.
```matlab
i_boundary = i2-i_eroded; %subtracting the eroded part of the image
figure , imshow(i_boundary) % displaying the boundary obtained
```
![Boundary of the object by erosion method](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_eleven.jpg)

### Obtaining boundary by dilation
Dilation increases the size of the object boundary by adding some pixels to the boundary of the image, the number of pixels added depends on the size and the shape of the object being processed. When the binarized version of the original image is subtracted from the dilated image, the resultant image is the boundary of the targeted object. Dilation of the image is done using the function `imdilate()` with a specified `strel()` length on a binary image. The output image depends on the original image's contrast and sharpness of pixels. The following are the step by step codes used in this method:

First, we import the image which will be used to demonstrate the dilation process. The image is imported using the function `imread()` as shown in the codes below. The imported image will be assigned a variable `i`.
```matlab
i = imread('plate.PNG'); %importing an image
figure,imshow(i) %Displaying the imported image
```
![Imported image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twelve.jpg)

We then convert the imported RGB image `i` to a grayscale image `i2` using the function `rgb2gray()` as shown below.
```matlab
i2 = rgb2gray(i); %converting the imported RGB image to a grayscale image
figure,imshow(i2) %Displaying the grayscale image
```
![Grayscale version of the imported image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_thirteen.jpg)

The grayscale image `i2` is then converted to a binary image `bw1` using the function `imbinarize()` as shown in the following codes.
```matlab
bw1 = imbinarize(i2); %binarizing the grayscale image
figure,imshow(bw1) %Displaying the binarized image
```
![Binary image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_fourteen.jpg)

We then specify the strel length which will be used to perform morphological dilation, we will use a disk length of 5 to dilate the binary image `bw1`. The dilated image will be assigned `i3`  as demonstrated in the below codes.
```matlab
se = strel('disk',5); % specifying strel length
i3 = imdilate(bw1,se); % dilation of the image at a specified strel length
figure, imshow(i3) %Displaying the dilated image
```
![Dilated image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_fifteen.jpg)

The boundary is then obtained by subtracting the binarized image `bw1` from the dilated image `i3` as shown in the following codes. `i_boundary` is the image showing boundary of the object.
```matlab
i_boundary = i3 - bw1; % subtracting some parts of the image
figure,imshow(i4) %Displaying the boundaries obtained 
```
![Boubdary obtained by dilation method](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_sixteen.jpg)


###  Highlighting text in an image
In an image containing text messages with different words, the words are the objects contained in the image. Matlab provides functions for highlighting specified words in a text image.
We will demonstrate by highlighting the word 'MATLAB' in an image containing random letters. `locatetext()` function is used to locate the text to be highlighted. The following codes are used in the process;

First, we import the image containing the text using the function `imread()`. The imported image will be assigned variable `i`. Below are codes showing this process.
```matlab
i = imread('C:/Users/user/Pictures/TEXT.PNG'); % importing the image
figure,imshow(i) %Displaying the imported image
```
![Imported immage](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_seventeen.jpg)

In order to view the detected letters in the imported image `i`, we use function `ocr()`. The image text data will be assigned `ocrOutput` as demonstrated in the below codes.
```matlab
ocrOutput = ocr(i) %text data
```
![Image text data](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_eighteen.jpg)

Location of the words is done using the function `locatetext()` within the detected text data and with a condition, for our case the condition is `ignoreCase` meaning the specified words will be detected and highlighted regardless of the case. we will assign `i2` to the image with highlighted words. Highlighting of the words is done using the function `insertshape()`, we will use a `FilledRectangle` to highlight the specified words as sshown in the below codes.
```matlab
text_location = locateText(ocrOutput, 'Matlab', 'IgnoreCase', true); %specifying text to located
i2 = insertShape(i, 'FilledRectangle', text_location); % highlighting the located text
figure,imshow(i2) %Displaying the highlighted text in the image
```
![Highted text image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_nineteen.jpg)

### Labeling objects in images
Objects contained in an image can be detected and labeled using the `bwlabel()` function. This function is executed in a binarized image. One can view the labeled object by converting `bwlabel()` results to RGB image using the function `label2rgb()`. we will demonstrate this process using the following codes:

We first import the image using the function `imread()` as shown in the codes below. The imported image will be assigned variable `i`.
```matlab
i = imread('capture.PNG'); %importing the image
figure,imshow(i) %Displaying the imported image
```
![Imported image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twenty.jpg)

We then convert the imported RGB image `i` to a grayscale image `i2` using the following codes.
```matlab
i2 = rgb2gray(i); % converting the imported image to grayscale
figure,imshow(i2)%Displaying the grayscale image
```
![Grayscale image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twentyone.jpg)

The grayscale image `i2` is then converted to the binarized image `i3` to allow the labeling of the object. The following codes are used.
```matlab
i3 = imbinarize(i2); % binarizing the grayscale image
figure,imshow(i3) %Displaying the binarized image
```
![Binary image](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twentytwo.jpg)

Labeling of the objects is done using by executing the function `bwlabel()` on a binarized image `i3`. The labeled objects can be viewed by converting the `bwlabel()` output assigned  `i3_label` to RGB image assigned `i4` using the function `label2rgb()`. The following codes are used in this process.
```matlab
i3_label = bwlabel(i3) % labeling the objects in the binarized image
i4 = label2rgb(i3_label); % converting the labeled objects to RGB image
figure,imshow(i4) %Displaying the labeled objects
```
![The labeled objects](/engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twentythree.jpg)

### Conclusion
Object-based image analysis helps distinguish objects contained in an image from the background part of the image by extracting certain features like boundaries and edges. Object-based image analysis has a wide range of areas of application. It can be applied in areas like;
- Machine vision.
- Fingerprint matching for verification.
- medical diagnosis.
- Map analysis.
