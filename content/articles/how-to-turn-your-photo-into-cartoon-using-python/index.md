---
layout: engineering-education
status: publish
published: true
url: /how-to-turn-your-photo-into-a-cartoon-using-python/
title: How to Turn Your Photo Into a Cartoon using Python
description: This article takes the reader through converting any photo to a cartoon image using Python. We make use of optimized machine learning algorithms which produce clear and sharp images.
author: eugiene-kanillar
date: 2021-08-18T00:00:00-09:30
topics: [Machine Learning, Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-turn-your-photo-into-a-cartoon-using-python/hero.jpg
    alt: Photo to cartoon image example
---
The use of cartoon characters has become a popular trend among the youth worldwide. This can be seen from their profile pictures on online social platforms to trending memes.
<!--more-->
The use of these cartoon characters is not only limited to the social platforms but also to other various fields.

### Introduction
For example, you can include cartoon characters of real people in school magazines or comics to amuse your readers.

In this era of technology, cartoons do not need to be drawn manually. We have apps that can convert your images easily into cartoons.

However, you are only limited to the pre-set custom options within the app. Well, the good news is that you can create your desired effect on the image using a few lines of code.

In this article, I will show you how to convert any photo to a cartoon image using Python. We make use of optimized machine learning algorithms which produce clear and sharp images.

The OpenCV and Numpy libraries come in handy for this operation. You can use this concept to build an app solely for converting any image to a cartoon image. The results are quite impressive.

Some subtle differences exist between real images and cartoon images. The differences can be identified by considering the images below:

![cartoon image](/engineering-education/how-to-turn-your-photo-into-a-cartoon-using-python/deadpool1.PNG)

![real image](/engineering-education/how-to-turn-your-photo-into-a-cartoon-using-python/Deadpool5.PNG)

[Image Source](https://unsplash.com/s/photos/deadpool)

One of the big differences is that a real image has thick and clearly defined edges. Another observable difference is that a cartoon image has fewer distinct colors than a real image.

Our goal is thus to give these characteristics to a real image. 

We will divide this process into four parts namely:

- [1. Loading the image](#loading-the-image)
- [2. Creating an edge mask](#creating-an-edge-mask)
- [3. Reducing the number of distinct colors](#reducing-the-number-of-distinct-colors)
- [4. Combining the edge mask with the reduced-color image](#combining-the-edge-mask-with-the-reduced-color-image)

### Prerequisites
To follow along with this tutorial, one must meet the following minimum requirements.

- Have an intermediate level of expertise programming in Python.
- A Google colab notebook.

We will make use of the Google colab notebook due to its various advantages such as:
- No configuration required. Configuring your computer for data science may get complicated at times especially for newbies.
- Free access to Graphics Processing Units (GPU).
- Easy Sharing. You can easily share your work with co-workers or experts for advice.

All you need is a browser and a good internet connection.

For the challenge lovers, who like to tinker and solve things to the core, you can set up your computer for this exercise. I suggest you read more from this [article](/engineering-education/data-science-setup/) to learn how to set up your computer for data science.

### Part 1: Loading the image
We are going to make use of the NumPy library and the OpenCV library. NumPy is the short form for Numerical Python and OpenCV is the short form for Open Source Computer Vision.

Make sure to import these libraries before running any code. 

We import them as follows:

```python
import numpy as np
import cv2 #This is how we import the OpenCV library

#include the following since we are running on Google Colab
from google.colab.patches import cv2_imshow #This will help in displaying the image as we continue to modify it
from google.colab import files #This will help us to select any image from our local files for editing
```

We want to be able to load any image of our liking and be able to "cartoonize" it. 

Let us create a function that loads the image:

```python
def readFile(file_name)
    image=cv2.imread(file_name)
    cv2_imshow(image)
    return image
```

Now call the function to load the image:

```python
uploaded=files.upload()
file_name=next(iter(uploaded))
img=readFile(file_name)

```

The upload() method renders a widget that prompts the user to upload local files to the kernel. It returns a [map](https://realpython.com/python-map-function/).

I chose the following image to turn into a cartoon:

![real-image](/engineering-education/how-to-turn-your-photo-into-a-cartoon-using-python/deadpool1.PNG)

### Part 2: Creating an edge mask
We use the edge mask to emphasize the thickness of the image's edges. The edges in an image can be detected using a very important method of the OpenCV library called the adaptiveThreshold().

Let us define the edge mask function:

```python
def edgeMask(image,lineSize,blurValue)
    gray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    grayBlur=cv2.medianBlur(gray,blurValue)
    edges=cv2.adaptiveThreshold(grayBlur,255,cv2.ADAPTIVE_THRESH_MEAN_C,CV2.THRESH_BINARY,lineSize,blurValue)
    return edges
```

In the function above, we transform the image from RGB mode to grayscale mode using the `cvtColor()` function. A grayscale mode in simple terms is a black and white mode.

If we display the image after converting it to grayscale, we discover that there is a lot of noise. To reduce the noise within the blurred grayscale image, use the `cv2.medianBlur()` function.

We can play around with the `blurValue` to alter the noise observed up to an acceptable point. To access the edges, we use the `cv2.adaptiveThreshold` method which has several parameters passed to it.

Now let us call the defined function:

```python
lineSize=7
blurValue=7
edges=edgeMask(image,lineSize,blurValue)
cv2_imshow(edges)
```

The result should be as seen below:

![image with edges](/engineering-education/how-to-turn-your-photo-into-a-cartoon-using-python/deadpool2.PNG)

### Part 3: Reducing the number of distinct colors
As I had earlier indicated at the start of this article, one major difference between a cartoon and a real image is the number of distinct colors in it. A cartoon has fewer distinct colors in it as compared to a real image. To reduce the number of colors within an image, we employ a color-quantization technique.

Here is where we learn to appreciate machine learning algorithms by making our work easier. We use the `k-means` clustering algorithm which is innate the OpenCV library.

Let us define a color quantization function as shown below:

```python
def colorQuantization(image,k)
    data=np.float32(image).reshape((-1,3))
    criteria=(cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER,20,0.001)
    ret,label,center=cv2.kmeans(data,k,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)
    center=np.uint8(center)
    result=center[label.flatten()]
    result=result.reshape(img.shape)
    return result
```

We transform the image into an array and then reshape it into a 2-dimensional array. We also create criteria with which it shall use during the color quantization.

The parameter `k` in the function is used to determine the number of distinct colors we want in our image.

Let us now call the function:

```python
colors=9
image=colorQuantization(image,colors)
```

The resulting image is as shown below:

![quantized image](/engineering-education/how-to-turn-your-photo-into-a-cartoon-using-python/deadpool3.PNG)

As we can see, the image is quite sharp and noisy. We make use of the `bilateralFilter` contained in the `cv2` library to reduce the noise. The filter also gives a blur and sharpness reducing effect to the image.

We achieve this using these lines of code:

```python
blurImage=cv2.bilateralFilter(image,d=7,sigmaColor=200,sigmaSpace=200)
```

- `d` parameter is the diameter of each pixel neighborhood.
- `sigmaColor` parameter represents the areas of semi-equal color.
- The `sigmaSpace` parameter represents how further pixels influence each other as long as their colors are close enough.

### Part 4: Combining the edge mask with the reduced-color image
Finally, we need to combine our "color-quantized image" with the `edge mask` to get the complete cartoon image.

To achieve this we use the `cv2.bitwise_and()` method. 

This is illustrated in the code below:

```python
cartoonImage=cv2.bitwise_and(blurImage,blurImage,mask=edges)

```

The final image should be as seen below:

![cartoon-image](/engineering-education/how-to-turn-your-photo-into-a-cartoon-using-python/Deadpool5.PNG)

### Conclusion
We were able to convert a real image into a cartoon with the help of libraries in Python. We also appreciated the importance of machine learning models by making our work easier.

You can play around with the code to create your desired effect. Besides, you can make use of the plethora of functions in the OpenCV library to create even more wonderful effects.

The Google colab notebook I used can be found in this [link](https://colab.research.google.com/drive/19Vgt7YUk5pmgoc9K0_Qy6Cd6yhIL2vGj#scrollTo=-BScmj0vpWbF) for reference.

Happy coding!

---
Peer Review Contributions by: [Solomon Eseme](/engineering-education/authors/solomon-eseme/)
