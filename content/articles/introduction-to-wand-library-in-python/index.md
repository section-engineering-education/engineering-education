---
layout: engineering-education
status: publish
published: true
url: /introduction-to-wand-library-in-python/
title: Introduction to Wand Library in Python
description: This tutorial will go over the Wand library, its origin and how it can be used to manipulate images. We will learn image manipulation techniques like inverting, blurring, and drawing images.
author: ezra-mukono
date: 2022-04-14T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-wand-library-in-python/hero.png
    alt: Introduction To Wand Library In Python Hero Image
---
Wand library is a [ctypes](https://docs.python.org/3/library/ctypes.html#module-ctypes)-based simple [ImageMagick](https://imagemagick.org/index.php) binding for Python. ImageMagick is extensively used with image formats for its precision and ease of use. 
<!--more-->
We will learn more about this module to understand how you can manipulate a single image into various forms.

In this tutorial, we will take a deep look at what the Wand library is and how we can use it to work with images. We will also look at a few examples where we will learn about its unique features and applications.

### Prerequisites
The reader should have some basic knowledge of Python and must have Python installed in their local machine.

### Table of contents
- [Wand library](#wand-library)
- [Verify installation](#verify-installation)
- [Read an image](#read-an-image)
- [Blur an image](#blur-an-image)
- [Transform an image](#transform-an-image)
- [Draw an image](#draw-an-image)
- [Comparison with other image libraries](#comparison-with-other-image-libraries)
- [Conclusion](#conclusion)

### Wand library
Using the wand library, we can open and edit images. Using it along with NumPy, it offers several other functions for image transformations. 

Below are some of its uses:
- We can use it to display a single image in several orientations. For example, inverted, rotated, blurred, skewed, etc.
- We have features to enhance the images with various effects.
- We can scale and crop the images.
- It supports reading and writing images in various formats.

Now, let's look at how to install the wand library.

> NOTE: For this tutorial, we will be using Ubuntu.

```python
sudo apt-get install libmagickwand-dev
pip install Wand
```

To have a comprehensive understanding of ImageMagick's dependency installation, it is recommended to go through [this](#https://imagemagick.org/script/advanced-linux-installation.php) documentation.

### Verify installation
On successfully installing the wand library and its related dependencies, we will verify it by importing `Wand` in our code.

Using any editor of your choice, create a Python file and save it with a `.py` extension, e.g., test.py, and then type `import wand` in the created file as shown:

```python
import wand
```

Upon running the code, if wand was successfully installed, it will not throw any errors. Otherwise we must recheck its installation.

### Read an image
To use features from the `image` library of `Wand` module, we will need to import the necessary packages. On importing, we will get access to several methods to modify properties such as height, width, and the interpretation of the image. 

Now, let's look at an example to return the width and height of an image:

```python
from Wand.image import image as wandImage  # We will start importing the image library from the Wand.

# The second step is to import the image using its correct pathname.
with wandImage(filename='/wand-library-in-python/original_image.png') as img:
    # The third step is to print the image's height and width.
    print('The Height of the image is:', img.height)
    print('The width of the image is:', img.width)
```

From the above code:
- The initial step is to import the `image` library from the `Wand`.
- Next, we specify the image details like file path and file name.
- Then, we print the details of the image.

The input image is:

![python](/engineering-education/introduction-to-wand-library-in-python/original_image.png)

**Output:**

```bash
The height of the image is: 203
The width of the image is: 601
```

### Blur an image
We have several ways to blur an image in Python.

One may decide to blur an image using the `pillow` package, while others may use the `OpenCV` library. However, in our case, we will use the `Wand` library to blur the image as shown:

```python
from Wand.image import Image as wandImage  # Import the image library from Wand
with wandImage(filename='/wand-library-in-python/original_image.png') as img:  # Import the image using the correct image location.
    img.blur(radius=1, sigma=3) # Blur function and its dimensions    
    img.save(filename='/wand-library-in-python/blurred_image.png') # Save the blurred image using to a certain location.    
```

From the code above:
- We import the `image` library from `Wand`.
- We then import the image using the file path.
- Then, we call the blur function by specifying the `radius` and `sigma` of the image.
- The `radius` parameter determines the radius of the gaussian aperture, which is the size of the gap. It is always an integer number.
- The `sigma` parameter describes the sigma value that denotes the standard deviation of the gaussian filter. It is always an integer input.
- We then save the image.

![python](/engineering-education/introduction-to-wand-library-in-python/original_image.png)

**Output:**

![python](/engineering-education/introduction-to-wand-library-in-python/blurred_image.png)

### Transform an image
Image transformation is an essential and robust feature when dealing with images. Image transformation deals with rotating, inverting, adding effects, and so on.

Here, we try to invert the image as shown below:

```python
from Wand.image import Image  # Let's import the image library

with Image(filename='/wand-library-in-python/blurred_image.png') as img:  # Get image
                            
    with image.clone() as flip: # Clone image
        flip.flip() # flip function. The flip function is used to reverse the order of elements.
        flip.save(filename='/wand-library-in-python/inverted_image.png') # Save image
```

The following steps are used to transform an image:
- Import the libraries and then open the image.
- The `clone()` function is called to make a copy of the image.
- The cloned and flipped image is then saved in a specific location.

![python](/engineering-education/introduction-to-wand-library-in-python/original_image.png)

**Output:**

![python2](/engineering-education/introduction-to-wand-library-in-python/inverted_image.png)

### Draw an image
Apart from the above features that we have looked at, with Wand, drawing an image and displaying it is also possible.

```python
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
        img.save(filename = '/wand-library-in-python/draw_image.png') 
```

From the code above:
- We import the required modules like `color`, `image`, and `drawing`.
- Then, we specify the color of the image and the size the image.
- Then, we determine the outside border of the image together with its color.
- Now we can save the image.

**Output:**

![python5](/engineering-education/introduction-to-wand-library-in-python/draw_image.png)

### Comparison with other image libraries
For image manipulation, apart from Wand, we have other libraries like pillow and OpenCV. Now, we will look at how these libraries differ from each other.

OpenCV library is developed using C and C++ programming languages, while Pillow is designed using C and Python programming languages.

OpenCV is faster when compared to pillow in dealing with image manipulation. This makes it the best out of all three.

However, even if these libraries are developed using different languages, their functionalities are almost identical since the image manipulation techniques across the libraries are practically similar.

For example, let's take a look at resizing an image using the pillow package.

```python
from PIL import Image
image=Image.open('original_image.png')
new_image=image.resize((200,200))
new_image.save('pillow.png')
print('Original image size: ', image.size)
print('Resized image size: ', new_image.size)
```

**Output:**

```bash
Original image size: (601, 203)
Resized image size: (200, 200)
```

![python](/engineering-education/introduction-to-wand-library-in-python/original_image.png)

The image was initially the size of `601` by `203`, and after resizing it:

![pp](/engineering-education/introduction-to-wand-library-in-python/pillow.png)

### Conclusion
To conclude, we outlined what one can do using the image library in Wand — blurring, resizing, drawing, and transforming images.

You can check out the full source code [here](https://github.com/mukono10/Wand-library-in-python#wand-library-in-python).

To learn more about image manipulation, it is recommended to go through [this](https://www.programcreek.com/python/example/82689/wand.image.Image) article.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)