
### Introduction
Wand library in Python contains a module known as [ImageMagick](https://imagemagick.org/index.php). It is an attribute developed to change the format of an image. ImageMagick is extensively used due to its capability to work with image formats in the broader scope and its precision and ease of use. The reason for studying this module in Python is to understand how you can manipulate a single image into various forms.

Therefore, we will take a deep look at the wand Python library, which Imagemagick developed. Furthermore, with the help of several examples, which will well explain, we will learn about the features and applications of the Wand library in the Python programming language.
### Prerequisite
For a learner to have a complete understanding of this topic, they should have some knowledge of Python and should also have Python installed in their machine for easier running of code.
### Table of contents
- [Defining Wand library](#defining-wand-library)
- [Installation Verification](#installation-verification)
- [How can we read an image in Python Wand?](#how-can-we-read-an-image-in-python-wand)
- [Use Wand package in Python to blur an image](#use-wand-package-in-python-to-blur-an-image)
- [Image transform using Python wand](#image-transform-using-python-wand)
- [Use Python wand to draw an image](#use-python-wand-to-draw-an-image)
- [How does wand library compare with other libraries?](#how-does-wand-library-compare-with-other-libraries)
- [Conclusion](#conclusion)
### Defining Wand library
Using Python programming language, which created a library known as Imagemagick, then the wand library was generated from here. Using Wand library, images are manipulated in several ways, discussed later in the article. We can use the Wand to edit and open images, but in collaboration with NumPy, it offers significant functions for machine learning codes. Below are some of its uses.
- We can use it to display a single image in several outlooks, e.g., upside down, blurred, etc.
- This package additionally enhances the photos with various effects.
- Image scaling and cropping are also supported.
- The wand library can read and write images in various formats.

We shall now take a look at how to install Wand library.

Let us check the following syntax, and in this case, we will use Ubuntu.
```bash
pip install Wand
```
The python module wand will be installed in the machine as a version of pip and Python.

Again, we must include the ImageMagick dependencies because the wand library is an Imagick API. The reason for having the dependencies is that they contain functions responsible for manipulating images, e.g., drawing.
```python
sudo apt-get install libmagickwand-dev  
```
To learn and have a comprehensive understanding of the ImageMagick dependency installation and the various actions that are performed to it during the installation process, follow [this](#https://imagemagick.org/script/advanced-linux-installation.php) link.
### Installation Verification
After successfully installing the wand python module and Imagemagick dependencies in the machine, we will test by importing Wand. Using an editing environment of your choice, create a Python file and save it with a `.py` extension, e.g., test.py, and then type `import wand` in the created file. If Wand were successfully installed, it would automatically pop up. Otherwise, Wand was not established.
```Python
import wand
```
### How can we read an image in Python Wand?
By implementing the Wand's picture library's Image module, one will import image files. After that, We will use numerous properties such as height, width, and so to interpret the image. 

Now let us look at a complete example of checking the width and height of an image by following the above three steps.
```Python
from Wand.image import image as wandImage  # We will start importing the image library from the Wand.

with wandImage(filename='/wand-library-in-python/python.png') as img:  # The second step is to import the image using its correct pathname.

     # The third step is to print the image's height and width.
    print('The Height of the image is:', img.height)
    print('The width of the image is:', img.width)
```
- The initial step is importing the image library from the Wand.
- The second step in this process is to import an image that you want to get its details.
- However, to ensure that the image details will be output successfully, the correct pathname should be input and in the correct format. Furthermore, this mainly applies to an image located within several folders. The following format should be used when encountering such an image.
- The third step is now to print the details of the image, i.e., the width and the height.

The input image is:

![python](/engineering-education/wand-library-in-python/python.png)

The output is as follows.
```bash
The height of the image is: 203
The width of the image is: 601
```
### Use Wand package in Python to blur an image
We can use several ways in Python to blur an image. For example, one can decide to blur an image using the pillow package, another one can abandon the pillow package and use the OpenCV library, and all will perform the same job. However, in our case, we will use the Wand library to blur the same image, and the following are the steps that we shall use.

Let us take a look at an example.
```Python
from Wand.image import Image as wandImage  # Importing the image library from Wand
with wandImage(filename='/wand-library-in-python/python.png') as img:  # Importing the image using the correct image location.

    img.blur(radius=1, sigma=3) # Blur function and its dimensions    

    img.save(filename='/wand-library-in-python/python1.png') # Saving the blurred image using in a certain location.    

```
- We shall import the image library from Wand as we had done in our previous example.
- We shall then import our image using the correct pathname.
- We shall then call the blur function by specifying the radius and sigma of the image. The radius parameter is used to determine the radius of the gaussian aperture, which is the size of the gap, and it is always an integer number, e.g., 3. Gaussian aperture function is to focus on what will be output. The sigma parameter is used to describe the sigma value, and it is also an integer input, e.g., 5.
- The last step is to save the image from differentiating it from the original image.

The input image is:

![python](/engineering-education/wand-library-in-python/python.png)

The output image is:

![python](/engineering-education/wand-library-in-python/python1.png)
### Image transform using Python wand
Another essential and robust feature of the Python wand is the image transform feature. It transforms an image to be displayed differently from the original image, e.g., an image can be changed and be outputted as an upside-down image. 

Image transformation, in this case, means that the output of the image will be upsidedown and reversed compared to the input image. The image transformation is achieved through the collaboration of several functions. 

Let us consider a complete example.
```Python
from Wand.image import Image  # Let us import the image library

with Image(filename='/wand-library-in-python/python1.png') as img:  # Get image

                                
    with image.clone() as flip: # Clone image
        flip.flip() # flip function. The flip function is used to reverse the order of elements.

        flip.save(filename='/wand-library-in-python/python2.png') # Save image

```
The following steps are used to transform an image.
- The first and second steps shall be referred to in the above examples, i.e., importing the image library from Wand and importing the image.
- The clone() function is called for making the image.
- The cloned image is then saved in a specific location.

The input image is:

![python](/engineering-education/wand-library-in-python/python.png)

The image output is:

![python2](/engineering-education/wand-library-in-python/python2.png)

 
### Use Python wand to draw an image
Apart from all those features that we have looked at, drawing an image and displaying it is possible. We will achieve this by using a combination of various functions.

Below is an example description:
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
        img.save(filename = '/wand-library-in-python/python5.png') 
```
The steps to be followed when implementing the above piece of code are as follows:
The initial step in the description example above is to import the required modules, i.e., color, image, and drawing, so that the desired output may be found. 
- After that, specify the color of the image and the size the image shall cover.
- Then, determine the outside border of the image together with its color.
- The image is then saved as the final step.

To draw an image using a python Wand, a color is specified(any color can do). The size of what the image will cover is also determined. Then the overall dimensions of the image coverage are also determined.

The output image is :

![python5](/engineering-education/wand-library-in-python/python5.png)
### How does wand library compare with other libraries?
Apart from the wand library that we have discussed, other libraries are also used to manipulate images, i.e., pillow and OpenCV. We are going to look at how these libraries differ from each other.

OpenCV library is developed using C and C++ programming languages, while the pillow is designed using C and python programming languages. However, OpenCV is faster compared to pillow when dealing with image manipulation. In the same manner, OpenCV still becomes superior to wand library, and hence it becomes the best out of all three that can best manipulate images.

However, even if these libraries are developed using different languages, their functionalities are almost identical because the image manipulation techniques across the libraries are practically similar.

For example, let's have a look at resizing an image using pillow package.
```python
from PIL import Image
image=Image.open('python.png')
new_image=image.resize((200,200))
new_image.save('pp.png')
print(image.size)
print(new_image.size)
```
Output

Original image
(601, 203)

Resized  image
(200, 200)

The input image was which was:

![python](/engineering-education/wand-library-in-python/python.png)

The image was initially of size 601 by 203, and after performing a resize, the picture looked as follows.

Output image:

![pp](/engineering-education/wand-library-in-python/pp.png)

The above example displays some of the functionalities performed by Pillow package.
### Conclusion
In conclusion, we had outlined what one can do using the image library in Wand—blurring an image, drawing, and transforming the same idea. This has proved that it can use a single image but have several displays, which is achieved by calling several functions.

For further studies about this topic, click [this](https://www.programcreek.com/python/example/82689/wand.image.Image) link.