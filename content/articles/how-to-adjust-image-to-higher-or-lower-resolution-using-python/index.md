### How to Adjust Image to Higher or Lower Resolution using Python
### Introduction
Low-resolution images can at times not bring out the desired information and accurate details. To overcome this challenge comes in the adjustment of resolutions in an image. In this tutorial, we will be requiring some basic tools to be used such as OpenCV, used in computer vision-based  tasks and the main function as required in our tutorial is for image processing.
### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Introduction in how to Instal and use Pillow and Numpy](#introduction-in-how-to-instal-and-use-pillow-and-numpy)
- [Having the Colors Fixed](#having-the-colors-fixed)
- [Implementing contrast enhancement](#implementing-contrast-enhancement)
- [Laplacian Pyramid Super-Resolution Network](#Laplacian-pyramid-super-resolution-network)
-  [Scaling Down the Images to Lower Resolutions](#scaling-down-the-images-to-lower-resolutions)
- [Scaling Up the Images to Higher Resolutions](#scaling-up-the-images-to-higher-resolutions)
- [Having the Colors Fixed](#having-the-colors-fixed)
- [Application Fields for Adjusting Image Resolution](#application-fields-for-adjusting-image-resolution)
- [Conclusion](#conclusion)

### Prerequisites
1.  You have to be familiar with Python basics and get started with it. Refer to this article to [a beginners guide to python](/engineering-education/a-beginners-guide-to-python/)

### Introduction in how to Instal and use Pillow and Numpy
Using any text editor of your choice, you will be required to run a few codes. To work with cv2 you will be required to install  OpenCV. To implement that, in your terminal, you will be required  run the below command if you don't have it pre-installed.
````bash
 pip install OpenCV-Python
 ````
 After openCV has been successfully installed, it allows for importing modules such as cv2.
 The second installation to be done is the 
 ```bash
  pip install numpy
```
This allows for the usage of packages implementing multidimensional arrays.
The third installation to be carried out is involves
```bash
pip install pillow
```
Also known as PIL module, allows for manipulating and processing of images.
Depending on the versions you may be required to update to the later version. For updating you will use the below command:
```bash
C:\Users\lizpa\PycharmProjects\jupyter\venv\Scripts\python.exe -m pip install --upgrade pip
```
You will have to change the path according to your machine's directory.
### Having the Colors Fixed
Images are made up of pixels in the form of X and Y coordinates. Having the colors fixed, we will have to use the RGB color format. This occurs when one color in the RGB format is omitted, let's say if blue is, the image will lack the blue pigment and any traces of it since every single pixel has blue taken away from it. Leaving only red and green components. We also learn that multiplying the RGB by factors of half, it reduces the amount of light in the image hence the image becomes darker. Bellow is a program for further illustrations:
```python
from PIL import Image  
pict = Image.open("sportscar.jpg")
#We will have to use the .bmp extension.
#This allows for other functions to be performed in the image
#Storing the image using save() function 
pict.save('sportscar.bmp')  
pict = Image.open('sportscar.bmp')  
pict.show()
#We create a loop that allows for iteration between the X and Y pixels  
for x in range(pict.size[0]):  
    for y in range(pict.size[1]):  
        r, g, b = pict.getpixel((x, y))  
        pict.putpixel((x, y), (r, g, 0))  
 #Used for displaying the executed image. 
pict.show()
``` 
Original image: 
![original](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/original.png)
Fixed image with Blue pixels omited:
![fixed](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/fixed.png)
 
###   Implementing Contrast Enhancement
Contrast deals with the intensity ,saturation and brightness level in an image. We will be adjusting the contrast with the help of ImageFilter function provided by the PIL module. With the above in place we are fit to dive into the coding section using an image of your choice: 
```python
from PIL import Image, ImageFilter  
img = Image.open("cool.jpg")  
enc_img = img.filter(ImageFilter.DETAIL)  
assert isinstance(enc_img, object)  
enc_img.show()
```
Now we will be running the code for image enhancement.
```python 
 from PIL import Image, ImageEnhancement
 img = Image.open("cool.jpg")  
 img_con = ImageEnhancement.Contrast(img)
  img_con.enhace(1.7).show("70% INCREASEMENT OF CONTRAST ENHANCEMENT")
```
  For  the above to work smoothly you will have to put the images to be used in the same directory as where the main python file is.
  
###  Laplacian Pyramid Super-Resolution Network
In a coarse-to-fine Laplacian pyramid structure, the LapSRN super-resolves low-resolution pictures. On a given out of five benchmark datasets for 4x and 8x Super-Resolution, our technique is quick and achieves state-of-the-art performance. LapSRN is a middle ground between the two upscaling procedures used at the beginning and conclusion of a project. It suggests a gradual increase in size till the end. Its name is derived from Laplacian pyramids, and the construction is similar to a pyramid, with the lower quality image being upscaled till the finish. Parameter sharing is frequently used for speed.
It mainly has got two parts, the extraction stage and the stage for reconstruction.
To implement the Laplacian pyramid is formed by the difference between that level in the Gausian Pyramid and extended version of its upper level in the Gausian Pyramid.
Explaining in coed snippets yields much understanding. Lets dive in:
## Instance #1
### Scaling Down the Images to Lower Resolutions
Now we will be scaling down the images to lower resolutions in the Gausian Pyramid model.
To perform this task we will be using the image bellow:
![sean](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/sean.jpg)

```python
import cv2  
import numpy as np  
img = cv2.imread("sean.jpg")#Here we will be reading the image 
layer = img.copy()  
gp = [layer] #Declaring a variable hence creating the Gausian Pyramid array. 
for j in range(10):#Providing room for iteration.
    layer = cv2.pyrDown(layer)  
    gp.append(layer)  
    cv2.imshow(str(j), layer)#This function displays the multiple images created.
cv2.imshow("Original image", img)#This will have the original image displayed.  
cv2.waitKey(0)  
cv2.destroyAllWindows()
``` 
Your output should match the bellow image.
![low](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/low.jpg)

## Instance #2

### Scaling Up the Images to Higher Resolution.
Once you  increase the resolution of an already lowered resolution it will not go back to its original form since lowering the resolution losses some information about the image using the pyrDown method. Hence the reults looks alittle blurred. Note that this is different from scaling up an original image. 

```python
import cv2  
import numpy as np  
img = cv2.imread("sean.jpg")  
#We will be factoring down images using the already scaled.
lwr1 = cv2.pyrDown(img)  
lwr2 = cv2.pyrDown(lwr1)  
lwr3 = cv2.pyrDown(lwr2)  
lwr4 = cv2.pyrDown(lwr3) 
# We will be Increasing the resolution of already scaled down image that is lwr4.
hir1 = cv2.pyrUp(lwr3)  
  
cv2.imshow("Original image", img)  
cv2.imshow("First Scaled Down Image", lwr1)  
cv2.imshow("Second Scaled Down Image", lwr2)  
cv2.imshow("Third Scaled Down Image", lwr3)  
cv2.imshow("Fourth Scaled Down Image", lwr4)  
cv2.imshow("First Scaled Up Image", hir1)  
  
cv2.waitKey(0)  
cv2.destroyAllWindows()
```
The output should be similar to the bellow image:
 ![high](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/high.jpg)
 
  ## Instance #3

To construct the Laplacian pyramid Super-Resolution Network, we will be taking the top level layer of the Gausian Pyramid which is the last image generated using the loop function then create a list for the Laplacian pyramid then create the extended version of the upper level of the  Gausian Pyramid.
To understand it better a code snippet will do:
```python
import cv2   
img = cv2.imread("sean.jpg")  
layer = img.copy()  
gp = [layer]  
for j in range(2):  
    layer = cv2.pyrDown(layer)  
    gp.append(layer)  
  
layer = gp[2]  
cv2.imshow("Gausian Upper level", layer)  
lp = [layer]#Introduce and create a list for the Laplacian Pyramid. 
  
for j in range(2, 0, -1):  
    Gausian_extended = cv2.pyrUp(gp[j])#Creating the Laplacian Pyramid.
laplacian = cv2.subtract(gp[j-1], Gausian_extended)  
cv2.imshow(str(j), laplacian)  
  
cv2.imshow("Original image", img)  
cv2.waitKey(0)  
cv2.destroyAllWindows()
```
Confirm with the below displayed:
![lapsn](/engineering-education/how-to-adjust-image-to-higher-or-lower-resolution-using-python/lapsn.png)
The Laplacian pyramid and the Gausian Pyramid is applied in the blending and reconstruction of the images.

### Application Fields for Adjusting Image Resolution

 - **Applied in the field of Astronomy**: This is achieved by focusing on tiny information of  images to higher resolutions that bring out clearer vision.
 - **Closed Circuit Television**: Feeds received from the CCTV footage can be focused to get more clearer images by resolving and fixing the colors where possible.
 - **Medicine**: Images received from scans such as the X-Rays require adjustment of resolutions to provide detailed and accurate information.  
 
 ### Conclusion 
 Covering all the details required in this tutorial, you are now equipped to handle matters concerning this tutorial. Being able to accurately work with this area of discussion and produce maximum results now, wish you all the best. 



