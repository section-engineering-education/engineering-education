### Introduction
In this tutorial, we can navigate through diverse OpenCV operations used for image processing.
**What are morphological operations?** -These are image processing variations implemented to both grayscale or binary photographs. These operations require a structuring element, that's used to outline the neighborhood of pixels on a picture. 
How to apply morphological operations to grow the size of items in images in addition to decreasing them.
We shall additionally talk about the maximum critical morphological operations that you`ll use inner your applications: 

-we shall use this image throughout the tutorial [download-sunflower.png](/Morphological-operations-in-image-processing-using-openCV-python/Oroginalimage.jpg)
### Prerequisites
To follow along through this tutorial, these are the requirements:

- An IDE which in our case use vs code. You can download VS Code [here](https://code.visualstudio.com/download)
- Download python [python-download](https://www.python.org/downloads) and set executable path.
- At the command type `python` then Set up OpenCV to your machine using  ``` pip install cv2 ```.
- Set up NumPy `pip install NumPy`. 
- Checking whether or not OpenCV is installed correctly ``` print(cv2.__version__) ```.
  
### Table of contents
- [Getting started](#Introduction) 
- [Prerequisites](#Prerequisites) 
- [Table of contents](#table-of-contents)
- [What is structuring element](#what-is-structuring-element)
- [Defining structuring element.](#defining-structuring-element)
- [Grayscale and rbgcolor images](#grayscale-and-rbgcolor-images)
- [Plotting the image](#Plotting-the-image)
- [Erosion and dilation morphological operations](#erosion-and-dilation-morphological-operations) 
- [Edge detection using canny filter](#Edge-detection-using-opencv) 
- [Canny filter](#Canny-filtering-operations)
- [Conclusions](#Wrapping-up)
  
### What is structuring element
  This is a **matrix** or a **form mask** this is used to identify pixels withinside the image being processed that is crucial in defining neighborhood utilized in every layer of a pixel. one chooses it with the identical length and form because the items you prefer to process within the input image.
  There exists **flat** and **non-flat** structuring elements
  **flat structuring detail** is valued as a binary neighborhood both 2-D or multi-dimensional right here the true pixels are used in morphological computations.
  **non-flat structuring detail** is a matrix of kind double that identifies pixels withinside the image being processed it carries finite values used as additive offsets in morphological computation.

### Defining structuring element.
OpenCV makes use of the subsequent characteristic to outline the structuring element. 
 ```python 
 #import important applications 
 import cv2 
 #create square strucuring detail of order 10 
 cv2.getStructuringElement(cv2.MORPH_RECT,(10,10)) 
 ``` 
 ###  Grayscale and rbgcolor images 
  The transformed grayscale picture can also additionally lose contrasts, sharpness, shadow, and shape of the sedation picture. 
  To keep contrasts, sharpness, shadow, and shape of the sedation picture enforce the set of rules below. 
  To convert the color image right into a grayscale picture the set of rules plays RGB approximation, reduction, and addition of chrominance and luminance. 
  The grayscale photographs generated the usage of the set of rules withinside the test verify that the set of rules has preserved the salient functions of the shadeation picture inclusive of contrasts, sharpness, shadow, and picture shape. 
  we can reverse the technique lower back to RGB color. 

```python
  #import essential packages
import os
# generate an array of 60,000 random bytes.
randomByteArray = bytearray(os.urandom(60000))
flatNumpyArray = numpy.array(randomByteArray)
# Convert the array to make a 200x300 grayscale image.
grayImage = flatNumpyArray.reshape(300, 200)
cv2.imwrite('RandomGrayimage.png', grayImage)
print(grayImage,"\nEND of gray Image\n")
# Convert the array to make a 200x100 color image.
bgrImage = flatNumpyArray.reshape(100, 200, 3)
cv2.imwrite('RandomrgbColor.png', bgrImage)
#using cv2. imread() it interprets in BGR format
print(bgrImage,"\nEND of bgr Image")
  ```
  ### Output: RandomgrayImage. 
  ![RandomgrayImage](/Morphological-operations-in-image-processing-using-openCV-python/RandomGrayimage.png).
  ### Output: RandomrbgImage.
  ![RandomrbgImage](/Morphological-operations-in-image-processing-using-openCV-python/RandomrgbColor.png).
  
### Plotting the image
 ```python 
 # connects to GUI loop that turns inline plotting wherein plot photos will appear
from matplotlib import pyplot as plt
from matplotlib import picture as Img
# study the picture
img = Img.imread('images/sunflower-horizon.jpg')
# test if the picture exists
if (img is None): 
 print("Could now no longer clear up the picture url")
else: print(img)
#plot the binary picture above
img1plot = plt.imshow(img)
```
### Erosion and dilation morphological operations
**Erosion** is a subset of Euclidean space/integer grid for a few measurements that makes use of a structuring detail for probing and decreasing form contained withinside the  picture its used to shrink linked pixels of 1s in a binary picture.
The length of the structuring detail used determines the range of pixels eroded in the picture.

 **Advantages of erosion**
- This will assist get rid of small dots or black dots frequently referred to as noise.
- Used for shrinking functions additionally removing of bridges, branches, and protrusions.
- They are beneficial in processing steps earlier than Optical Character Recognition(OCR) and if used as they should be it enhance the pleasant of recognition. 
  
 **Dilation** -It expands linked pixels of 1s in a binary picture normally used to develop functions additionally filling holes and gaps 

  **Advantages of dilation**
- Adds pixels to the bounds of items withinside the unique picture
- The length and form of the structuring detail are used to decide the range of pixels dilated at the picture. 
 
```python
import numpy
import cv2 as cv2
import os
#erosion and dilation operations on the image.
os.environ['OPENCV_IO_MAX_IMAGE_PIXELS']=str(2**64)
# use multiple threads
cv2.startWindowThread()
# Reading from the input image
img = cv2.imread('images/sunflower-horizon.jpg',cv2.IMREAD_UNCHANGED)
window1 = 'img'
# use matrix of order 9 to the kernel
kernel = numpy.ones((9,9), numpy.uint8)

erodedImg = cv2.erode(img, kernel, iterations=1)
window2 = 'erodedImg'
#img=original image, kernel=matrix in which image is convolved,
# iterations=No of times to dilate or erode image
# dilate the  original stinkbug image note that removes white spaces=noise 
dilatedImg = cv2.dilate(img, kernel, iterations=1)
window3 = 'dilatedImg'

print("\n Original image:\n")
cv2.imshow(window1, img)
cv2.imwrite('Oroginalimage.jpg', img)
# eroded image
print("\n Eroded image:\n")
cv2.imshow(window2, erodedImg)
cv2.imwrite('Erodedimage.jpg', erodedImg)
# dilated image
print("\n Dilatedimage:\n")
cv2.imshow(window3, dilatedImg)
cv2.imwrite('Dilatedimage.jpg', dilatedImg)
# set wait time to 1 ms
cv2.waitKey(1)
# destroy  all sessions and close windows
cv2.destroyAllWindows()

```
### Output: dilated image.
![dilated-image](/Morphological-operations-in-image-processing-using-openCV-python/Dilatedimage.jpg).
### Output: eroded image.
![eroded-image](/Morphological-operations-in-image-processing-using-openCV-python/Erodedimage.jpg).
### Edge detection using opencv
- Finds edge points of the image that are shown clearly only strong points are detected which are the points with high intensity of pixels neighboring each other.
- Here we are only considering grayscale images since we don't need information on a color image.
- Then we need to apply the `cv2.GaussianBlur()` function to smoothen the intensity distribution of the image pixels near its edge points.
- We will obtain a blurred image by including a convolutional kernel of order 3*3 that indicates the blurring intensity.
- Additionally, let us save the blurred image using the `imwrite()` function.
- Noisy parts are eliminated using the `Cannyfilter` function to the earlier blurred image that would produce unwanted details to the edges.
- The gradient threshold is determined by 2 different values lets discuss them:-
 1. Gradient magnitude value `threshold1` here the pixels are prevented and excluded to the resultant edge map
 2. Gradient magnitude value `threshold2`  only those pixels associated with strong edge points are added to the final edge map and also weak edge points are included.
   Only identified predominant edges are used the advantage of this algorithm `minimizes suppression` and achives `hysterisis thresholding` .

syntax:
  ```python
  import cv2 as cv2
# use multiple threads
cv2.startWindowThread()
# Reading from the input image
img = cv2.imread('images/sunflower-horizon.jpg',cv2.IMREAD_UNCHANGED)
# Blur the original image for edge detection
blurredImg = cv2.GaussianBlur(img, (3,3), 0) 
#  Canny Edge Detection by calculating threshold of the 3x3 dimension
edges = cv2.Canny(image=blurredImg, threshold1=100, threshold2=200)
# Display Canny Edge Detection Image
print("\nCanny filter Edge Detection of the original image:\n")
window_name = 'edges'
cv2.imshow(window_name, edges)
cv2.imwrite('filteredImg.jpg', edges)
# set waittime() to 2 ms
cv2.waitKey(2)
  ```
  ### Output: canny filter edge detection.
  ![Canny-filter-edge-detection](/Morphological-operations-in-image-processing-using-openCV-python/filteredImg.jpg)
### Canny filtering operations
- It is a technique used to smoothen the surfaces of an image and can be used to compute convolutions using a 2D separation as follows.
- This involves 5 major steps discussed below.
    
  ### Step 1: read original image

  ```python
      #set wait time to 2 milliseconds
      cv2.waitKey(2)
      #read text image
      img = cv2.imread('sunflower-horizon.jpg')
  ```
  ### Step 2: declaring kernel
 Declaring a kernel with an echelon form filter matrix yields an image that is the same as the original image but with no background color.
 Declaring convolution kernel yields a square matrix where both matrices(M and N) are both odd integers.
 `declare kernel syntax`
  ```python
   #Obtain a 3×3 2D echelon matrix kernel
  kernel1 = numpy.array([[1, 0, 0],
                         [0, 1, 0],
                         [0, 0, 1]])
  
  # Declaring a convolution 3 x 3 2D matrix
  kernel2 = numpy.array([2, 0, 0,],
                        [0, 2, 0],
                        [0, 0, 2])
   ```
  ### Step 3: Filter 2D operation to perform a linear filtering operation

   ```python
    kernel2 = numpy.ones((9, 9), numpy.float32) / 10
    image = cv2.filter2D(src=img, ddepth=-2, kernel=kernel1)
    #  The first argument is original image
    #  ddepth is the depth of final image with a value of -2 showing 2x depth of source image/original image
    # kernel is the kernel that we apply the source image
    identity = cv2.filter2D(src=img, ddepth=-2, kernel=kernel1)
    # print identity image
    cv2.imwrite('identity.png', identity)
  ```
   ### Step 4: Display original and filtered image using imshow()

   ```python
    #displaying original image
      cv2_imshow(img)
    # Displaying filteres image
      cv2_imshow(image)
   ```
   ### Step 5: save filtered image to the disk using imwrite()
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
  - Applying a linear filtering operation to the image also saves to disk
  - Edge detection technique is used in OpenCV. 
  

  To see the complete implementation go to google colab link [here](https://colab.research.google.com/drive/1MuUQrg-kEcgSiVfsfMg4ZA0_f2Wnmm34?usp=sharing) 
  
 Happy coding!

