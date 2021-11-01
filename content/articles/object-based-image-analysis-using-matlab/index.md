### Object-based image analysis
### Introduction
Object-based image analysis is the processing of an image based on the classification of its pixels to get more useful information on the image, such information can be based on height, edges, and boundaries. Matlab provides an interactive environment for object-based image analysis through the execution of functions used in analysis or inbuilt apps for image processing.

Images contain objects with distinct regions, these regions have features such as area, perimeter, shapes, and height. Matlab allows for analysis of these properties using image analyzer functions or region props to obtain data from these images.

Object-based image analysis is useful especially in analyzing satellite maps, machine vision, and obtaining information based on object characteristics in an image.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.


### Edge detection 
Edge detection is the process of identification of points within an image, these points are where the image has great contrast and they are the defining points of the image. Edge detection work by detecting changes in brightness of the image pixels.

Edge detection is useful in image segmentation and data extraction for comparison, objects separation, computer vision, and machine learning. Matlab supports a variety of functions that aids in edge detection.
### Methods of edge detection
There are several methods used in edge detection in images, these methods are used with the main function `edge`.  We will demonstrate most of these methods using a similar image and then compare the outcome to find a more suitable method providing a more detailed outcome.

All these methods only accept a grayscale image input hence it is important to fast convert the RGB image to a grayscale image, conversion of RGB to gray is done using the function `rgb2gray`. The initial stage of all image processes is the importation of the image to Matlab workspace, importation of image is done using the function `imread('imagefolderpath')`. 

The following codes are used in importation and image conversion to grayscale, the outcome will be used to demonstrate various methods of edge detection.
```matlab
i = imread('print.PNG'); %importing the image
figure,imshow(i)
```
![The imported image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_one.png)
```matlab
i2 = rgb2gray(i) %coverting RGB image to grayscale image
figure,imshow(i2) 
```
![Grayscale image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_two.png)

We will use the grayscale image `i2` to demonstrate various methods of edge detection in images. The following are methods used in edge detection:

- Sobel; in this method, the edge is determined from the points with the highest gradient. This method is executed using the function `sobel` and the syntax is `i_edge = edge(i_gray,'sobel')`.
```matlab
s = edge(i2,'sobel'); % edge detection using sobel method
figure,imshow(s)
```
![Edges detected using sobel method](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_three.png)

- Prewitt: This is a suitable method of estimating the magnitude and orientation of edges in an image. It gives a more detailed output compared to the sobel method. The output image may be noisy depending on the number of edges present and their proximity. This method is executed using the function `prewitt` and the syntax is `i_edge = edge(i_gray,'prewitt')`.
```matlab
p = edge(i2,'prewitt'); %edge detection using prewitt method
figure, imshow(p)
```
![Edges detected using prewitt method](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_four.png)

- Log: This method smoothens the image then executes the laplacian function resulsting to a double edged image. This method uses the funtion `log` and the syntax is `i_edge = edge(i_gray,'log')`.
```matlab
l = edge(i2,'log'); %edge detection using log method
figure, imshow(l)
```
![Edge detected using log method](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_five.png)

- Canny: This method detects the edges by separating noise from the image, this is better because it does not disturb the features of the edges in the image. This method uses the function `canny` and the syntax is `i_edges = edge(i_gray,'canny')`.
```matlab
c = edge(i2,'canny'); %edge detection using canny method
figure, imshow(c)
```
![Edge detected using canny method](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_six.png)


### Object boundary detection
Boundaries are lines that mark the limits of an object or an area. A boundary in images can be detected by either performing morphological operations on the image or by using toolbox functions.
### Boundary detection using morphological operations
Morphological operations mainly involve subtracting some parts of a binarized image remaining with only the boundary of the object. In morphological operations, boundaries can be detected by either `erosion` or `dilation` of the objects whose boundary is to be obtained.
### Obtaining boundary by erosion
In this method, some pixels from a binarized are removed, the eroded part is then subtracted from the main image containing the main object. The remaining part is the boundary of the object. Erosion of image is done using the function `imerode` with a specified `strel` length. The following codes and step by step illustrations of this method;
```matlab
i = imread(plate.PNG);
figure,imshow(i)
```
![Imported image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_seven.png)
```matlab
i_gray = rgb2gray(i); % converting to grayscale image
figure,imshow(i_gray)
```
![Grayscale version of the imported image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_eight.png)
```matlab
i2 = i_gray< 250; 
figure, imshow (i2)
```
![Black and white image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_nine.png)

```matlab
se1 = strel('disk',80);
i_eroded = imerode(i2,se1); % erosion process
figure, imshow(i_eroded)
```
![Eroded image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_ten.png)
```matlab
i_boundary = i2-i_eroded; %subtracting the eroded part of the image
figure , imshow(i_boundary)
```
![Boundary of the object by erosion method](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_eleven.png)
### Obtaining boundary by dilation
Dilation increases the size of the object boundary by adding some pixels to the boundary of the image, the number of pixels added depends on the size and the shape of the object being processed. When the binarized version of the original image is subtracted from the dilated image, the resultant image is the boundary of the targeted object. Dilation of the image is done using the function `imdilate` with a specified `strel` length on a binary image. The output image depends on the contrast and sharpness of pixels in the original image. The following are the codes used in this method.
```matlab
i = imread('plate.PNG'); %importing an image
figure,imshow(i)
```
![Imported image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twelve.png)

```matlab
i2 = rgb2gray(i); %converting to a grayscale image
figure,imshow(i2)
```
![Grayscale version of the imported image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_thirteen.png)

```matlab
bw1 = imbinarize(i2); % binarizing image
figure,imshow(bw1)
```
![Binary image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_fourteen.png)

```matlab
se = strel('disk',5); % specyfying strel lenght
i3 = imdilate(bw1,se); % dilation of the image
figure, imshow(i3)
```
![Dilated image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_fifteen.png)

```matlab
i_boundary = i3 - bw1; % subtracting some parts of the image
figure,imshow(i4)
```
![Boubdary obtained by dilation method](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_sixteen.png)

###  Highlighting text in an image
In an image containing text messages with different words, the words are the objects contained in the image. Matlab provides functions for highlighting specified words in a text image.
We  will demonstrate  by highlighting the word 'MATLAB' in an image containing random letters. `locatetext` function is used to locate the text to be highlighted, the following codes are used in the process;
```matlab
i = imread('C:/Users/user/Pictures/TEXT.PNG'); % importing the image
figure,imshow(i)
```
![Imported immage](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_seventeen.png)

```matlab
ocrOutput = ocr(i) %text data
```
![Image text data](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_eighteen.png)

```matlab
text_location = locateText(ocrOutput, 'Matlab', 'IgnoreCase', true); %specifying text to located
i2 = insertShape(i, 'FilledRectangle', text_location); % highlighting
figure,imshow(i2)
```
![Highted text image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_nineteen.png)

### Labeling objects in images
Objects contained in an image can be detected and labeled using the function `bwlabel`, this function is executed in a binarized image. One can view the labeled object by converting `bwlabel` results to RGB image using the function `label2rgb`. we will demonstrate this process using the following codes:
```matlab
i = imread('capture.PNG'); %importing the image
figure,imshow(i)
```
![Imported image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twenty.png)
```matlab
i2 = rgb2gray(i); % converting the image to grayscale
figure,imshow(i2)
```
![Grayscale image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twentyone.png)
```matlab
i3 = imbinarize(i2); % binarizing the image
figure,imshow(i3)
```
![Binary image](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twentytwo.png)
```matlab
i3_label = bwlabel(i3) % labeling the objects
i4 = label2rgb(i3_label); % RGB image of the labeled objects
figure,imshow(i4)
```
![The labeled objects](engineering-education/object-based-image-analysis-using-matlab/objectanalysis_twentythree.png)

### Conclusion
Object-based image analysis helps in distinguishing objects contained in an image from the background part of the image by extracting certain features of the objects like boundaries and edges. Object-based image analysis has a wide range of areas of application, it can be applied in areas like;
- Machine vision.
- Fingerprint matching for verification.
- medical diagnosis.
- Map analysis.

