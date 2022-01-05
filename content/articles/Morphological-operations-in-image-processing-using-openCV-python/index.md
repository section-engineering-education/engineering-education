### Getting Started
We'll go over various OpenCV operations for image processing in this lesson. **What are morphological operations?** -
These are image transformations that can be applied to grayscale or binary images. These techniques involve the deployment of a structuring element, which is used to identify the pixels in an image's neighborhood. - How to perform morphological operations to enhance and decrease the size of objects in images.

We'll also go through some of the most important morphological processes you'll encounter in your applications:



### prerequisites

To undertake this tutorial, you'll require the following:

#### Step 1

- An IDE which in our case use vs code. You can download VS Code [here](https://code.visualstudio.com/download)

- Download and set the executable path for python [python-download](https://www.python.org/downloads).

#### Step 2

- Type ``` python``` at the command prompt then run the following command on your PC to install OpenCV ```pip install OpenCV```

#### Step 3 
- checking whether OpenCV is installed correctly ``` print(cv2.__version__) ```
## Table of contents
- [Table of contents](#table-of-contents)
- [What is structuring element](#what-is-structuring-element)
- [Defining structuring element.](#defining-structuring-element)
- [Grayscale and rbgcolor images](#grayscale-and-rbgcolor-images)
- [Plotting the image](#plotting-the-image)
- [Erosion and dilation morphological operations](#erosion-and-dilation-morphological-operations)
  - [Erosion](#erosion)
    - [<u> Advantages of erosion  </u>](#u-advantages-of-erosion--u)
  - [Dilation](#dilation)
- [Edge detection using opencv](#edge-detection-using-opencv)
- [Canny filtering operations](#canny-filtering-operations)
  - [Step 1: read original image:](#step-1-read-original-image)
  - [Step 2: declaring kernel:](#step-2-declaring-kernel)
  - [Step 3: Filter 2D operation to perform linear filtering operation:](#step-3-filter-2d-operation-to-perform-linear-filtering-operation)
  - [Step 4: Display original and filtered image using imshow():](#step-4-display-original-and-filtered-image-using-imshow)
  - [Step 5: save the filtered image to the disk using imwrite():](#step-5-save-the-filtered-image-to-the-disk-using-imwrite)
    - [To see the complete implementation click here](#to-see-the-complete-implementation-click-here)
- [Conclusion](#conclusion)
## What is structuring element
- This is a **matrix** or a **shape mask** that is used to identify pixels in the image being processed this is essential in defining the neighborhood used in each layer of a pixel. one chooses it with the same size and shape as the objects you desire to process in the input image.
- There exists **flat** and **non-flat** structuring elements
- #### Flat structuring element
  - This is valued as binary neighborhood either 2-D or multi-dimensional here the true pixels are included in morphological computations.
- #### Non-flat structuring element
  - It's a matrix of type double that identifies pixels in the image being processed it contains finite values used as additive offsets in morphological computation.
  
  ## Defining structuring element.
OpenCV uses the following function to define the structuring element.
  ```python
  #import necessary packages
  import cv2
  #create rectangular strucuring element of order 10
  cv2.getStructuringElement(cv2.MORPH_RECT,(10,10))
  ```
  ##  Grayscale and rbgcolor images
  - The converted grayscale image may lose contrasts, sharpness, shadow, and structure of the color image. 
  - To preserve contrasts, sharpness, shadow, and structure of the color image implement the algorithm below. 
  - To convert the color image into a grayscale image the algorithm performs RGB approximation, reduction, and addition of chrominance and luminance. 
  - The grayscale images generated using the algorithm in the experiment confirm that the algorithm has preserved the salient features of the color image such as contrasts, sharpness, shadow, and image structure.
  - we will reverse the process back to rgbcolor. 
  ```python
  import cv2
  import numpy
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
## Plotting the image
In order to show all the corner points of the image lets add a plotting function and then save the results which are printed in the console using a normalized form by combining the points.
```python
    # connects to GUI loop that turns inline plotting where plot graphics will appear
from matplotlib import pyplot as plt
from matplotlib import image as Img
# read the image
img = Img.imread('images/sunflower-horizon.jpg')
# check if the image exists
if (img is None):
  print("Could not resolve the image url")
else: print(img)
#plot the binary image above
img1plot = plt.imshow(img)
```
## Erosion and dilation morphological operations
### Erosion
-It is a subset of Euclidean space/integer grid for some dimension that uses a structuring element for probing and reducing shape contained in the input image it is used to shrink connected sets of 1s in a binary image.
- The size of the structuring element used determines the number of pixels eroded on the image.
  
  #### <u> Advantages of erosion  </u>
- This will help clean up small dots or black dots often called noise.
- used for shrinking features also removing bridges, branches, and protrusions.
- They are useful in processing steps before Optical Character Recognition(OCR) and if used appropriately it improves the quality of recognition.
  
### Dilation
 - It expands connected sets of 1s in a binary image commonly used to grow features also filling holes and gaps.
   
    #### <u> Advantages of dilation  </u>
- Adds pixels to the boundaries of objects in the original image
- The size and shape of the structuring element are used to determine the number of pixels dilated on the image.

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
## Edge detection using opencv
- Finds edge points of the image that are shown clearly only strong points are detected and grouped together with lines that are infinite from one endpoint to another and then merged as line segments.
syntax:
  ```python
  import cv2 as cv2
  #use multiple threads
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
## Canny filtering operations
- It is a technique used to smoothen the surfaces of an image and can be used to compute convolutions using a 2D separation as follows.
- This involves 5 major steps discussed below.
  
### Step 1: read original image:
- Loading the image using imread() function.
     ```python
      #set wait time to 2 milliseconds
      cv2.waitKey(2)
      #read text image
      img = cv2.imread('sunflower-horizon.jpg')
     ```
### Step 2: declaring kernel:
  - Declaring a kernel with an echelon form filter matrix yields an image that is the same as the  original image but with no background-color
  - Declaring convolution kernel yields a square matrix where both matrices(M and N)
  are odd integers
  - syntax   
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
### Step 3: Filter 2D operation to perform linear filtering operation:
- Syntax
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
### Step 4: Display original and filtered image using imshow():
    
  ```python
    #displaying original image
      cv2_imshow(img)
    # Displaying filteres image
      cv2_imshow(image)
  ```
### Step 5: save the filtered image to the disk using imwrite():
  - This example will load an image and its size then convert it to .jpg format and save it as a blurred image using imwrite() function.
    Syntax:

      ```python
      cv2.waitKey()
      print('\n image after filter operation ')
      cv2.imwrite('blurredimgkernel.jpg', image)
      #Kernel blurred image
      cv2_imshow(image)
      # destroy all sessions
      cv2.destroyAllWindows()
      ```
#### To see the complete implementation click [here](https://colab.research.google.com/drive/16J11NF96i5-0s-Cemx8YZGroWMaDa0Hk?usp=sharing)

   ## Conclusion 

  - From this tutorial we have familiarized ourselves with erosion and dilation operations applied to images and how to apply a canny filter to the image also edge detection technique is used in OpenCV. 

*Happy coding!*

