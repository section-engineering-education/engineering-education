### Wand Library in Python
[ImageMagick](https://imagemagick.org/index.php) is an attribute developed to change the format of an image. ImageMagick is extensively used due to its capability to work with image formats in the broader scope and its precision and ease of use. 

Therefore, we will take a deep look at the wand Python binding, which Imagemagick developed in this article. Furthermore, with the help of several examples, which will well explain, we will learn about the features and applications of the Wand library in the Python programming language.
### Defining Wand library.
Using Python programming language, which created a library known as Imagemagick, and this is what we term as the Wand. The library, therefore, provides Imagick API functionalities across various versions of Python. We can use the Wand to edit and open images, but in collaboration with NumPy, it offers significant functions for machine learning codes. Below are some of its uses.
1. We can use it to change the appearance of photographs.
2. This package additionally enhances the photos with various effects.
3. Image scaling and cropping are also supported.
4. The wand library can read and write images in various formats.

We shall now take a look at how to install wand library.

Let us check the following syntax, and in this case, we will use Ubuntu.
```python
$pip install Wand
```
The python module wand will be installed in the machine as a version of pip and Python.
```Python
Requirement already satisfied: Wand in ./.local/lib/python3.9/site-packages (0.6.7)
```
Again, we must include the Imagick dependencies because the wand library is an Imagick API. And in our case, we are still  going to install the Imagick dependencies in Ubuntu Linux
```Python
$ sudo apt-get install libmagickwand-dev  
```
### Installation Verification
After successfully installing the wand python module and Imagemagick dependencies in the machine, we will test by importing Wand.
```python
import wand
```
### How can we read an image in Python Wand?.
By utilizing the Wand's picture library's Image module, one will import image files. After that, We will use numerous properties such as height, width, and so to interpret the image. 

Implementation using an example.

1. The first step is to import the image library from the Wand
```Python
from Wand.image import image as wandImage
```
By importing the above library, one will get details about an image like height, width, etc.

2. The second step in this process is to import an image that you want to get its details. The following syntax will be implemented when importing an image.
```python
with wandImage(filename='pathname_image')
```
Let us look at an example.
```Python
with wandImage(filename='home_test.png') as img:
```
However, to ensure that the image details will be output successfully, the correct pathname should be input and in the correct format. Furthermore, this mostly applies to an image located within several folders. The following format should be used when encountering such an image.
```Python
with wandImage(filename='/home/jm/Downloads/python.png') as img:
```
3. The third step is now to print the details of the image, i.e., the width and the height. The following syntax is used.
```Python
print('Our Image height is :', img.height)
print('Our Image Width is :', img.width)
```
Now let us look at a complete example of checking the width and height of an image by following the above three steps.
```Python
# We will start by importing the image library from the Wand.
from Wand.image import image as wandImage
# The second step is to import the image using its correct pathname.
with wandImage(filename='/home/jm/Downloads/python.png') as img:
# The third step is to print the image's height and width.
    print('The Height of the image is:', img.height)
    print('The width ogf the image is:', img.width)
```
The input image is:

![python](/engineering-education//home/jm/jm/DESKTOP/jm/projects/article/mukono10/wand-library-in-python/python.png)

The output is as follows.
```bash
The height of the image is: 203
The width of the image is: 601
```
### Use Wand package in Python to blur an image
We can use several ways in Python to blur an image. For example, one can decide to blur an image using the pillow package, another one can abandon the pillow package and use the OpenCV library, and all will perform the same job. However, in our case, we will use the Wand library to blur the same image, and the following are the steps that we shall use.

1. We shall import the image library from Wand as we had done in our previous example.
```Python
from Wand.image import Image as wandImage
```
2. We shall then import our image using the correct pathname.
```Python
with wandImage(filename='/home/jm/Downloads/python.png') as img:
```
3. We shall then call the blur function by specifying the radius and sigma of the image.

The radius parameter is used to specify the radius of the gaussian aperture, which is the size of the gap, and it is always an integer number, e.g., 3.

The sigma parameter is used to specify the value of sigma, which is the Gaussian filter's standard deviation, and it is also an integer input, e.g., 5.
```Python
img.blur(radius=2, sigma=3)
```
4. The last step is to save the image from differentiating it from the original image.
```Python
img.save('pathname_image')
```
Let us take a look at an example.
```Python
# Importing the image library from Wand
from Wand.image import Image as wandImage
# Importing the image using the correct image location.
with wandImage(filename='/home/jm/Downloads/python.png') as img:
# Blur function and its dimensions    
    img.blur(radius=1, sigma=3)
# Saving the blurred image using in a certain location.    
    img.save(='/home/jm/Downloads/python1.png)
```
The input image is:

![python](/engineering-education//home/jm/jm/DESKTOP/jm/projects/article/mukono10/wand-library-in-python/python.png)

The output image is:

![python](/engineering-education//home/jm/jm/DESKTOP/jm/projects/articles/mukono10/wand-library-in-python/python1.png)
### Image transform using Python wand.
Another essential and robust feature of the Python wand is the image transform feature. It is used to transform an image to be displayed differently from the display of the original image. The image transformation is achieved through the collaboration of several functions. The following steps are used to transform an image.

1. The first and second steps shall be referred to in the above examples, i.e., importing the image library from Wand and importing the image.

2. The clone() function is called for making the image.
```Python
with img.clone() as flip:
```
3. The cloned image is then saved in a certain location.
```Python
img.save(filename='pathname_img')
```
Let us consider a complete example.
```Python
# Let us import image library
from wand.image import Image 
# Get image
with Image(filename='/home/jm/Downloads/python1.png') as img:
# Clone image
    with image.clone() as flip:
# flip function
        flip.flip()
# Save image
        flip.save(filename='/home/jm/Downloads/python2.png')
```
The input image is:

![python](/engineering-education//home/jm/jm/DESKTOP/jm/projects/article/mukono10/wand-library-in-python/python.png)

The output image is :

![python2](/engineering-education//home/jm/jm/DESKTOP/jm/projects/article/mukono10/wand-library-in-python/python2.png)

 
### Use Python wand to draw an image.
Apart from all those features that we have looked at, drawing an image and displaying it is possible. We will achieve this by using a combination of various functions.

Let us look at the example below:
```Python
from wand.image import Image  
from wand.drawing import Drawing  
from wand.color import Color  
with Drawing() as img_draw:  
    img_draw.stroke_color=Color('red')
    img_draw.stroke_width=4
    
    img_draw.fill_color=Color('white')
    img_draw.circle((300, 300), (200, 200)) 
    with Image(  
        width = 480,  
        height =600,  
        background = Color('blue')  
        ) as img:  
        img_draw(img)  
        img.save(filename = '/home/jm/Downloads/python5.png') 
```
To draw an image using a python wand, a colour is specified(any colour can do). The size of what the image will cover is also determined. Then the overall dimensions of the image coverage are also determined.

The output image is :

![python5](/engineering-education//home/jm/jm/DESKTOP/jm/projects/article/mukono10/wand-library-in-python/python5.png)
### Conclusion
In conclusion, we had outlined what one can do using the image library in Wand—blurring an image, drawing, and transforming the same idea. This has proved that iot can use a single image but have several displays, which is achieved by calling several functions.