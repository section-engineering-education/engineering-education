### Introduction
- In this tutorial, we'll go over a variety of OpenCV procedures that can be used to process images.
- Morphological operations are image processing variants that can be applied to grayscale or binary images.
- A structuring element is required for these processes, which is used to outline the pixels on a picture.
- Users will learn how to perform morphological operations on photos after completing this tutorial.
- Please note that the following image will be used throughout the tutorial:
[Download-sunflower.png]
(/engineering-education/morphological-operations-in-image-processing-using-opencv/sunflower-horizon.jpg)

### Prerequisites
To follow along with this lesson, you'll need the following:
- An IDE which in our case use vs code. You can download vs code[here](https://code.visualstudio.com/download)
- Download Python [Python-download](https://www.python.org/downloads) and set executable path.
- At the command type `python` then Set up OpenCV to your machine using ``` pip install cv2 ```.
- Set up NumPy `pip install NumPy`.
- Checking whether or not OpenCV is installed correctly ``` print(cv2.__version__) ```
### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [What is the structuring element](#what-is-the-structuring-element)
- [Defining structuring element.](#defining-structuring-element)
- [Grayscale and rbgcolor images](#grayscale-and-rbgcolor-images)
- [Plotting the image](#plotting-the-image)
- [Erosion and dilation morphological operations](#erosion-and-dilation-morphological-operations)
- [Edge detection using opencv](#edge-detection-using-opencv)
- [Canny filtering operations](#canny-filtering-operations)
  - [Step 1: read original image](#step-1-read-original-image)
  - [Step 2: declaring kernel](#step-2-declaring-kernel)
  - [Step 3: Filter 2D operation to perform a linear filtering operation](#step-3-filter-2d-operation-to-perform-a-linear-filtering-operation)
  - [Step 4: Display original and filtered image using imshow()](#step-4-display-original-and-filtered-image-using-imshow)
  - [Step 5: save the filtered image to the disk using write()](#step-5-save-the-filtered-image-to-the-disk-using-write)
- [Wrapping up](#wrapping-up)


### What is the structuring element

- This is a **matrix** or a **form mask** that is used to identify pixels withinside the image being processed that is crucial in defining the neighborhood utilized in every layer of a pixel.
- One chooses it with the identical length and form because of the items you prefer to process within the input image.
- There exists **flat** and **non-flat** structuring elements.
- **Flat structuring detail** is valued as a binary neighborhood both 2-D or multi-dimensional right here the true pixels are used in morphological computations.
- **Non-flat structuring detail** is a matrix of kind double that identifies pixels withinside the image being processed it carries finite values used as additive offsets in morphological computation.

### Defining structuring element.

- OpenCV makes use of the subsequent characteristic to outline the structuring element.
```python
#import important applications
import cv2
#create square strucuring detail of order 10
cv2.getStructuringElement(cv2.MORPH_RECT,(10,10))
```

### Grayscale and rbgcolor images

- The transformed grayscale picture can also additionally lose contrasts, sharpness, shadow, and shape of the sedation picture.
- To keep contrasts, sharpness, shadow, and shape of the sedation picture enforce the set of rules below.
To convert the color image right into a grayscale picture the set of rules plays RGB approximation, reduction, and addition of chrominance and luminance.
The grayscale photographs generate the usage of the set of rules withinside the test to verify that the set of rules has preserved the salient functions of the image inclusive of contrasts, sharpness, shadow, and picture shape.
we can reverse the technique lower back to RGB color.
- The following code generates 2 images a grayscale image and a colored image into a `randombyteArray`.
  
```python
import os
import numpy as np
import cv2
# generate an array of 60,000 random bytes.
randomByteArray = bytearray(os.urandom(60000))
flatNumpyArray = np.array(randomByteArray)
# Convert the array to make a 200x300 grayscale image.
grayImage = flatNumpyArray.reshape(300, 200)
print(grayImage,"\nGenerated gray Image randomByteArray\n")
cv2.imwrite('RandomGrayimage.png', grayImage)

# Convert the array to make a 200x100 color image.
bgrImage = flatNumpyArray.reshape(100, 200, 3)
print(bgrImage,"\nGenerated bgr format randomByteArray")
cv2.imwrite('RandomrgbColor.png', bgrImage) #using cv2. imread() it interprets in BGR format

```
### Plotting the image

- We shall display the graph using the `plot.show()` function and also set the x-limits of the current axes. The `x-lim()` function changes the range of our plotting defined from left values to right values depending on your choice.
- In this example, weâ€TMll set the left current axis limit variable and the right current axis limit variable by taking the keyword argument `left` and also the right keyword with `slim()` function.
- To add the title of the graph employ `title()` function.
- To add tha labels at axes, we use the `xlabel()` and `ylabel()` functions.
  
```python
import cv2 as cv2
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
Img = mpimg.imread('content/articles/morphological-operations-in-image-processing-using-opencv/sunflower-horizon.jpg')
plt.xlim(left=0,right=600)
plt.imshow(Img)
plt.show()
colors = ('b', 'g', 'r')
plt.figure()
plt.title('histogram')
plt.xlabel('Binary output')
plt.ylabel('number of pixels')

for i, col in enumerate(colors):
hist = cv2.calcHist([Img], [i], None, [255], [0,255 ])
plt.plot(hist,color=col)
plt.xlim([0,256])
plt.show()
```
### Erosion and dilation morphological operations

**Erosion** is a subset of Euclidean space/integer grid for a few measurements that makes use of a structuring detail for probing and decreasing form contained withinside the picture its used to shrink linked pixels of 1s in a binary picture.
The length of the structuring detail used determines the range of pixels eroded in the picture.

**Advantages of erosion**
- This will assist get rid of small dots or black dots frequently referred to as noise.
- Used for shrinking functions and additionally removing of bridges, branches, and protrusions.
- They are beneficial in processing steps earlier than Optical Character Recognition(OCR) and if used as they should be it enhance the pleasant of recognition.
**Dilation** -It expands linked pixels of 1s in a binary picture normally used to develop functions additionally filling holes and gaps

**Advantages of dilation**
- Adds pixels to the bounds of items withinside the unique picture
- The length and form of the structuring detail are used to decide the range of pixels dilated in the picture.

```python

import numpy
import cv2 as cv2
import os
#erosion and dilation operations on the image.
os.environ['OPENCV_IO_MAX_IMAGE_PIXELS']=str(2**64)
# use multiple threads
cv2.startWindowThread()
# Reading from the input image
img = cv2.imread('content/articles/morphological-operations-in-image-processing-using-opencv/sunflower-horizon.jpg',cv2.IMREAD_UNCHANGED)

# use matrix of order 9 to the kernel
kernel = numpy.ones((9,9), numpy.uint8)
erodedImg = cv2.erode(img, kernel, iterations=1)
window2 = 'erodedImg'
#img=original image, kernel=matrix in which image is convolved,
# iterations=No of times to dilate or erode image
# dilate the original image note that it removes white spaces=noise
dilatedImg = cv2.dilate(img, kernel, iterations=1)
# display and save to disk
cv2.imshow('OriginalImage',img)
cv2.imwrite('OriginalImage.jpg', img)

cv2.imshow('Dilatedimage', dilatedImg) # dilated image
cv2.imwrite('Dilatedimage.jpg', dilatedImg) #save image

cv2.imshow('Erodedimage', erodedImg)
cv2.imwrite('Erodedimage.jpg', erodedImg)

# set wait time to 1 ms
cv2.waitKey(1)
# destroy all sessions and close windows
cv2.destroyAllWindows()

```

- Output: dilated image.

![dilated-image](/engineering-education/morphological-operations-in-image-processing-using-opencv/Dilatedimage.jpg)

- Output: eroded image.

![eroded-image](/engineering-education/morphological-operations-in-image-processing-using-opencv/Erodedimage.jpg).


### Edge detection using opencv

- Finds edge points of the image that are shown clearly only strong points are detected which are the points with high intensity of pixels neighboring each other.
- Here we are only considering grayscale images since we don't need information on a color image.
- Then we need to apply the `cv2.GaussianBlur()` function to smoothen the intensity distribution of the image pixels near the edge points.
- We will obtain a blurred image by including a convolutional kernel of order 3*3 that indicates the blurring intensity.
- Additionally, let us save the blurred image using the `imwrite()` function.
- Noisy parts are eliminated using the `Cannyfilter` function to the earlier blurred image that would produce unwanted details to the edges.
- The gradient threshold is determined by 2 different values which we shall discuss:-

1. Gradient magnitude value `threshold1` here the pixels are prevented and excluded from the resultant edge map
2. Gradient magnitude value `threshold2` only those pixels associated with strong edge points are added to the final edge map and also weak edge points are included.
Only identified predominant edges have used the advantage of this algorithm `minimizes suppression` and archives `hysteresis thresholding` .


syntax:

```python
import cv2 as cv2
# use multiple threads
cv2.startWindowThread()
# Reading from the input image
img = cv2.imread('content/articles/morphological-operations-in-image-processing-using-opencv/sunflower-horizon.jpg',cv2.IMREAD_UNCHANGED)
# Blur the original image for edge detection
blurredImg = cv2.GaussianBlur(img, (3,3), 0)
# Canny Edge Detection by calculating threshold of the 3x3 dimension
edges = cv2.Canny(image=blurredImg, threshold1=100, threshold2=200)
# Display Canny Edge Detection Image
print("\nCanny filter Edge Detection of the original image:\n")
window_name = 'edges'
cv2.imshow(window_name, edges)
cv2.imwrite('filteredImg.jpg', edges)
# set waittime() to 2 ms
cv2.waitKey(2)
```

- Output: canny filter edge detection.

![Canny-filter-edge-detection](/engineering-education/morphological-operations-in-image-processing-using-opencv/filteredImg.jpg)
### Canny filtering operations
- It is a technique used to smoothen the surfaces of an image and can be used to compute convolutions using a 2D separation as follows.
- This involves 5 major steps discussed below.

#### Step 1: read original image

```python
#set wait time to 2 milliseconds
cv2.waitKey(2)
#read text image
img = cv2.imread('content/articles/morphological-operations-in-image-processing-using-opencv/sunflower-horizon.jpg')
```

#### Step 2: declaring kernel

Declaring a kernel with an echelon form filter matrix yields an image that is the same as the original image but with no background color.
Declaring convolution kernel yields a square matrix where both matrices(M and N) are both odd integers.
`declare kernel syntax`

```python
#Obtain a 3Ã—3 2D echelon matrix kernel
kernel1 = numpy.array([[1, 0, 0],
                      [0, 1, 0],
                      [0, 0, 1]])

# Declaring a convolution 3 x 3 2D matrix

kernel2 = numpy.array([2, 0, 0,],
                      [0, 2, 0],
                      [0, 0, 2])

```

#### Step 3: Filter 2D operation to perform a linear filtering operation

```python
kernel2 = numpy.ones((9, 9), numpy.float32) / 10
image = cv2.filter2D(src=img, ddepth=-2, kernel=kernel1)
# The first argument is original image
# ddepth is the depth of final image with a value of -2 showing 2x depth of source image/original image
# kernel is the kernel that we apply the source image
identity = cv2.filter2D(src=img, ddepth=-2, kernel=kernel1)
# print identity image
cv2.imwrite('identity.png', identity)
```

#### Step 4: Display original and filtered image using imshow()

```python
#displaying original image
cv2_imshow(img)
# Displaying filteres image
cv2_imshow(image)
```
#### Step 5: save the filtered image to the disk using write()
This example will load an image and its size then convert it to .jpg format and save it as a blurred image using imwrite() function.

`save to disk Syntax`

```python
cv2.waitKey()
print('\n image after filter operation ')
cv2.imwrite('blurredimgkernel.jpg', image)
#Kernel blurred image
cv2_imshow(image)
# destroy all sessions
cv2.destroyAllWindows()

```
### Wrapping up

In this tutorial, we have familiarized ourselves with:-
- Declaring and defining a structuring element.
- Erosion and dilation operations were applied to images.
- Applying a linear filtering operation to the image also saved to disk
- Edge detection technique is used in OpenCV.
  
Happy coding!