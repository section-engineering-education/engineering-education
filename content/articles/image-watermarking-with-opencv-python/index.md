---
layout: engineering-education
status: publish
published: true
url: /image-watermarking-with-opencv-python/
title: Multiple Image Watermarking Using OpenCV With Python
description: The objective of this tutorial is to help the reader understand how one can automate the process of image watermarking on multiple images with less effort and time.
author: atonya-dennis
date: 2021-10-08T00:00:00-07:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/image-watermarking-with-opencv-python/hero.jpg
    alt: OpenCV Example image
---
Watermarking plays an essential role in today's businesses and online content credit making. The authors and company owners are provided with digital artifacts rights or credits, preventing their content from being stolen or duplicated without their consent. 
<!--more-->
Watermarks can be as a distinctive and one-of-a-kind logo, signature, or stamps.

Making these watermarks using Photoshop or manually requires more effort and time. We made this easier than ever using OpenCV with Python to automate watermarking multiple images.

This article will cover as much as possible to make you understand OpenCV; a python library used to automate image watermarking and many other real-life scenarios.

### Table of contents
- [Prerequisites](#prerequisites).
- [The OpenCV library](#the-opencv-library).
- [Image watermarking](#image-watermarking).
  - [Importing libraries and loading the logo image](#importing-libraries-and-loading-the-logo-image).
  - [Getting images to be watermarked](#getting-images-to-be-watermarked).
  - [Placing the watermark](#placing-the-watermark).
- [Saving the watermarked images](#saving-the-watermarked-images).
- [Conclusion](#conclusion).

### Prerequisites
To follow through this tutorial, you should have:
- A prior understanding of the basic Python and OpenCV library concepts.
- The ability to read, write, and show images using OpenCV.
- Knowledge of how to use Pycharm IDE. Please use this [page](https://www.jetbrains.com/pycharm/download/#section=windows) to download Pycharm IDE and install it on your machine.

### The OpenCV library
[OpenCV](https://www.mygreatlearning.com/blog/opencv-tutorial-in-python/) is a handy python library that is open source for computer vision processing functionalities as well as doing other critical operations such as tracking camera movements, extracting 3D models of any object, creating image filters and watermarks.

It is a great tool for automating image watermarks, as we will see in this tutorial.

We can install the library in the following ways:

**Using Anaconda**

Anaconda is a free, and open-source conditional distribution of the Python and R computer languages for scientific computing to make package management and deployment easier.

It can be downloaded and installed from this [page](https://www.anaconda.com/products/individual).

After successfully installing Anaconda, use the following anaconda prompt to install OpenCV:

```bash
conda install -c conda-forge opencv
```

**Using pip install**

For Windows and Linux machines, you can use the `pip` command to install OpenCV on windows by typing the following command on the terminal or command line:

```bash
pip install opencv-python
```

For Mac devices, use homebrew with the command below to install OpenCV:

```bash
brew install opencv
```

After the installation, we will use OpenCV for multiple image watermarking as it is easier to use and more versatile.

This scenario will have two folders: the `flowers` folder containing the images to be watermarked, and the `watermarked_images` folder to hold the watermarked images.

The process is as shown below:

![Folders](/engineering-education/image-watermarking-with-opencv-python/folder.jpg)

### Image watermarking
Watermarking images is done using either text or images. For this tutorial, we will show how we can apply an image watermark to multiple flower images.

The logo below will be added to the images automatically using the OpenCV python library:

![Logo](/engineering-education/image-watermarking-with-opencv-python/logo.jpg)

_[Image source: BrandCrowd](https://www.brandcrowd.com/maker/logo/55ae8aa4-3e99-42dc-a985-b5d8af51bc4c/draft/17ac39c8-615c-4121-9a40-661aed0b2cb8?code=REMIND15V4&utm_modal=nomodal&ctkn=94dfb3a9-06f8-471d-95ef-d5c46a4f8269&utm_medium=email&utm_source=template-braze&utm_campaign=delete-draft&utm_content=delete-7-days-standard-flow-discount-20210916-variation&utm_term=edit-logo-button)_

> NOTE: We use a white logo with a black background. The OpenCV library takes black background as no background, making the logo visible and well seen without hiding some section of the image.

#### Importing libraries and loading the logo image
We first import the OpenCV libraries and load the logo image to get its height and width. These dimensions will be needed when placing the watermark.

```python
import cv2
import numpy as np
import glob
import os

from numpy._distributor_init import filename

logo = cv2.imread("elite_logo.jpg") #loading logo image
h_logo, w_logo, _ = logo.shape #getting height and width
```

![Logo Loaded](/engineering-education/image-watermarking-with-opencv-python/logo-loaded.jpg)

#### Getting images to be watermarked
Once we have the logo, we get the path of the images that are to be watermarked. This is done using the `glob` library that is already imported above.

A loop is created to load all the images, getting their heights and widths when the images are located. The images are located in the `flowers` folder as shown.

![Image Folder](/engineering-education/image-watermarking-with-opencv-python/flowers.jpg)

_[Image source: Floranext](https://floranext.com/)_

```python
images_path = glob.glob("flowers/*.*") #flowers is the folder holding the flower images to be watermarked.
print("Adding watermark")
for img_path in images_path: #loop loading the images and getting their width and height
    img = cv2.imread(img_path)
    h_img, w_img, _ = img.shape
```

#### Placing the watermark
The location of the watermark depends on the user. It is possible to place the location anywhere, but this article will place the watermark at the center of the images.

We will write a code to get the center of all the images and use the `cv2.addWeighted()` method to specify the logo's opacity for it to look nice and smooth when placed over the images.

```python
#get the image's center and the spot where the watermark should be placed
center_y = int(h_img / 2)
center_x = int(w_img / 2)
top_y = center_y - int(h_logo / 2)
left_x = center_x - int(w_logo / 2)
bottom_y = top_y + h_logo
right_x = left_x + w_logo
```

Now that we have the center and location, we specify the **Region of Interest(ROI)** on the images where the watermark will be placed, then add the logo to the images.

```python
roi = img[top_y:bottom_y, left_x:right_x] #getting region of interest

result = cv2.addWeighted(roi, 1, logo, 0.3, 0) #adding logo to the ROI
img[top_y:bottom_y, left_x:right_x] = result #replacing ROI on the image
```

The output sample of a watermarked flower image is as shown below:

This is the original flower image.

![Original Flower Image](/engineering-education/image-watermarking-with-opencv-python/flowerB.jpg).

This is the watermarked image.

![Watermarked Flower Image](/engineering-education/image-watermarking-with-opencv-python/watermarked-flowerB.jpg).

### Saving the watermarked images
After the process of watermarking, we get the file names of the images and save the watermarked images on a different folder, `watermarked_images` folder, as shown:

```python
filename= os.path.basename(img_path)

cv2.imwrite("watermarked_images/watermarked_" + filename, img) #watermarked_images is the folder holding the watermarked images.

print("Watermark added to all images")
```

Here is the complete code:

```python
import cv2
import numpy as np
import glob
import os

from numpy._distributor_init import filename

logo = cv2.imread("elite_logo.jpg")
h_logo, w_logo, _ = logo.shape
images_path = glob.glob("flowers/*.*")
print("Adding watermark")

for img_path in images_path:
    img = cv2.imread(img_path)
    h_img, w_img, _ = img.shape
    center_y = int(h_img / 2)
    center_x = int(w_img / 2)
    top_y = center_y - int(h_logo / 2)
    left_x = center_x - int(w_logo / 2)
    bottom_y = top_y + h_logo
    right_x = left_x + w_logo

    # Extracting the ROI
    roi = img[top_y:bottom_y, left_x:right_x]

    result = cv2.addWeighted(roi, 1, logo, 0.3, 0)
    img[top_y:bottom_y, left_x:right_x] = result
    filename= os.path.basename(img_path)

    cv2.imwrite("watermarked_images/watermarked_" + filename, img)

print("Watermark added to all images")
```

When the whole code is combined and run successfully, it displays the output of the two print functions on the command line.

![Output](/engineering-education/image-watermarking-with-opencv-python/output.jpg).

This process will result in every image assigned with the name watermarked together with its original name.

![Watermarked folder image](/engineering-education/image-watermarking-with-opencv-python/watermarked.jpg).

You can find the complete code and files on my [GitHub](https://github.com/dentonya/Image_Watermarking).

To summarize, we have:
- Learned what the OpenCV library is and its applications.
- Explored multiple images watermarking as one of the OpenCV applications demonstrated.
- Demonstrated image watermarking with a small project using image watermarks.
- Learned how one can load images and get the image heights and width.
- Learned how one can locate the center of the images.

You can find more information about multiple image watermarking [here](https://pysource.com/2020/04/10/add-watermark-to-multiple-images-with-opencv-and-python/).

### Conclusion
As we have seen, it is easier to apply watermarks to multiple images using the OpenCV library as it is fast and efficient.

This makes it possible for an organization to credit its content without having to do it manually on every image.

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
