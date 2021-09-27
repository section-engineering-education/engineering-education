---
layout: engineering-education
status: draft
published: false
url: /image-watermarking-with-opencv-python/
title: Multiple Image Watermarking Using OpenCV with Python
description: The objective of this tutorial is to help the reader understand the concept of how one can automate the process of image watermarking on multiple images with less effort and time.
author: atonya-dennis
date: 2021-09-22T00:00:00-10:16
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/image-watermarking-with-opencv-python/hero.jpg
    alt: OpenCV Example image
---

Watermarking plays an important role in todays businesses and online content credit making. The authors and compnay owners are provided with digital artifacts rights or credits, preventing their content from being stolen or duplicated without their consent. Watermarks can be as a distinctive and one-of-a-kind logo, signature, or stamps. Making these watermarks using Photoshop or manually requires more effort and time. We made this easier than ever using OpenCV with Python to automate watermarking multiple images.     
<!--more-->
We will cover as much as possible in this article to make the reader understand OpenCV, a python library used in the automation of image watermarking and in many other real-life scenarios.

### Table of contents

- [Prerequisites](#prerequisites).
- [OpenCV Library](#opencv-library).
- [Image Watermarking](#image-watermarking).
  - [Loading Logo Image](#loading-logo-image).
  - [Getting Images to Be Watermarked](#getting-images-to-be-watermarked).
  - [Placing Watermark](#placing-watermark).
- [Saving the Watermarked Images](#saving-the-watermarked-images).
- [Conclusion](#conclusion).

### Prerequisites
To follow through this tutorial, the reader should:
- Have a prior understanding of the basic python and OpenCV library concepts.
- Know how to read, write and show images using OpenCV.
- Have knowledge on how to use Pycharm IDE.

Use this [page](https://www.jetbrains.com/pycharm/download/#section=windows) to download Pycharm IDE and install it on your machine.

### OpenCV Library
[OpenCV](https://www.mygreatlearning.com/blog/opencv-tutorial-in-python/) is a handy python library that is open source meant for computer vision processing functionalities as well as doing other critical operations such as tracking camera movements, extracting 3D models of any object, creating image filters and watermarks. It is a great tool for the automation of image watermarks as we will see in this tutorial.
The library can be installed in the following ways:
- **Install using Anaconda**
Anaconda is a free and open-source conditional distribution of the Python and R computer languages for scientific computing, with the goal of making package management and deployment easier. It can be downloaded and installed from this [page](https://www.anaconda.com/products/individual).

After successfully installing anaconda, use the anaconda prompt to install OpenCV using the command below:

```bash
conda install -c conda-forge opencv 
```
- **For Windows and Linux**
You can use pip to install OpenCV on windows by typing the following command at the terminal or command line:

```bash
pip install opencv-python
```
- **For Mac**
Use homebrew with the command below to install OpenCV:

```bash
brew install opencv
``` 
After the installation, OpenCV can be used for multiple images watermarking as it is easier to use and more versatile. This scenario will have two folders: the `flowers` folder containing the images to be watermarked and the `watermarked_images` folder to hold the watermarked images after running the python scripts successfully. The process is as shown below: 
![Folders](/engineering-education/image-watermarking-with-opencv-python/folder.jpg)

### Image Watermarking
Watermarking images is done using either text or images. For this tutorial, we are going  to show how we can apply an image watermark to multiple flower images. 
The logo below will be added to the images automatically using the OpenCV python library;
![Logo](/engineering-education/image-watermarking-with-opencv-python/logo.jpg)
Source:[BrandCrowd](https://www.brandcrowd.com/maker/logo/55ae8aa4-3e99-42dc-a985-b5d8af51bc4c/draft/17ac39c8-615c-4121-9a40-661aed0b2cb8?code=REMIND15V4&utm_modal=nomodal&ctkn=94dfb3a9-06f8-471d-95ef-d5c46a4f8269&utm_medium=email&utm_source=template-braze&utm_campaign=delete-draft&utm_content=delete-7-days-standard-flow-discount-20210916-variation&utm_term=edit-logo-button).
>NOTE: We use a white logo with black background, since OpenCV library takes black background as no background making the logo visible and well seen without hiding some section of the image.

#### Import Libraries and Load Logo Image
We first import the OpenCV libraries and load the logo image to get its height and width as it will be needed when placing the watermark.

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
#### Getting Images to Be Watermarked
Once we have the logo we get the path of the images that are to be watermarked, this is done using the `glob library` that is already imported above. When the images are located a loop is created to load all the images getting their heights and widths. The images are located in the `flowers`  as shown.
![Image Folder](/engineering-education/image-watermarking-with-opencv-python/flowers.jpg)
Source:[Floranext](https://floranext.com/).

```python
images_path = glob.glob("flowers/*.*") #flowers is the folder holding the flower images to be watermarked.
print("Adding watermark")
for img_path in images_path: #loop loading the images and getting width and height
    img = cv2.imread(img_path)
    h_img, w_img, _ = img.shape
```
#### Placing Watermark
The location of the watermark depends on the user. It is possible to place the location anywhere, but this article will place the watermark at the center of the images. Will write a code to get the center of all the images and use the `cv2.addWeighted()`to specify the opacity of the logo for it to look nice and smooth when placed over the images.
```python
#get the image's center and the spot where the watermark should be placed
center_y = int(h_img / 2)
center_x = int(w_img / 2)
top_y = center_y - int(h_logo / 2)
left_x = center_x - int(w_logo / 2)
bottom_y = top_y + h_logo
right_x = left_x + w_logo
```
Having the center and location we specify the **Region of Interest(ROI)** on the images where the watermark will be placed then add the logo mark to the images;
```python
roi = img[top_y:bottom_y, left_x:right_x] #getting region of interest

result = cv2.addWeighted(roi, 1, logo, 0.3, 0) #adding logo to the ROI
img[top_y:bottom_y, left_x:right_x] = result #replacing ROI on the image
```
The output sample of a watermarked flower image is as shown below;
Original image.
![Original Flower Image](/engineering-education/image-watermarking-with-opencv-python/flowerB.jpg).
Watermarked image.
![Watermarked Flower Image](/engineering-education/image-watermarking-with-opencv-python/watermarked_flowerB.jpg).
### Saving the Watermarked Images
After the process of watermarking we get the filenames of the images and save the watermarked images on a different folder, `watermarked_images` folder as shown;
```python
filename= os.path.basename(img_path)

cv2.imwrite("watermarked_images/watermarked_" + filename, img) #watermarked_images is the folder holding the watermarked images.

print("Watermark added to all Images")
```
When the whole code is combined and run successfully it displays the output of the two print functions on the command line.

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
  
    # Extract ROI
    roi = img[top_y:bottom_y, left_x:right_x]

    result = cv2.addWeighted(roi, 1, logo, 0.3, 0)
    img[top_y:bottom_y, left_x:right_x] = result
    filename= os.path.basename(img_path)

    cv2.imwrite("watermarked_images/watermarked_" + filename, img)

print("Watermark added to all Images")
```
![Output](/engineering-education/image-watermarking-with-opencv-python/output.jpg).

This process will result in every image assigned with the name watermarked together with its original name.
![Watermarked Folder Image](/engineering-education/image-watermarking-with-opencv-python/watermarked.jpg).

### Conclusion

As we have seen it is easier to apply watermarks to multiple images using the OpenCV library as is fast and efficient. This makes it possible for an organization to be able to credit its content without having to do it manually on every image.

To summarize, we have:

- Learned what the OpenCV library is and its applications.
- Explored multiple images watermarking as one of the OpenCV applications demonstrated.
- Demonstrated image watermarking with a small project using image watermarks.
- Learned how one can load images and get the image heights and width.
- Learned how one can locate the center of the images.

You can find more information about multiple image watermarking using [here](https://pysource.com/2020/04/10/add-watermark-to-multiple-images-with-opencv-and-python/).
The full combined code can be found on [GitHub](https://github.com/dentonya/Image_Watermarking)

Happy coding!

---

