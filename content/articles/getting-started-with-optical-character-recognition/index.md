---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-optical-character-recognition/
title: Getting Started with Optical Character Recognition
description: This tutorial will help the reader understand how to extract text from images and visualize these results using the OpenCV library.
author: lilian-cheptoo
date: 2022-01-26T00:00:00-02:13
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-optical-character-recognition/hero.png
    alt: Getting Started with Optical Character Recognition Hero image
---
Optical character recognition is a technology where each character on a page is scanned individually so that your text is uploaded as text documents and not images.
<!--more-->
EasyOCR is a python package that makes it easy to perform optical character recognition. We'll use it to extract text from images. We will be able to visualize these results using OpenCV. 

### Prerequisites
To follow along with this tutorial, you need to:
- Be familiar with Machine Learning modeling.
- Use either Jupyter Notebook or Google Colab.
> We will use Google Colab for this tutorial.

### Table of contents
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Reading our image](#reading-our-image)
- [Using EasyOCR to extract text from our image](#using-easyocr-to-extract-text-from-our-image)
- [Visualizing results using the OpenCV library](#visualizing-results-using-the-opencv-library)
- [Handling multiple lines](#handling-multiple-lines)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Installing and importing dependencies
The first dependency that we will need to install is PyTorch as EasyOCR runs on top of the PyTorch library. To install PyTorch, we need to head on to their main [website](https://pytorch.org/get-started/locally/). Select your preference and an installation code will be generated. For our case, we've selected the `Stable (1.10.1)` PyTorch build, `Linux` OS, `Pip` package, `Python` language, and `CUDA 10.2` compute platform. The following code is generated after selecting those preferences. 

```bash
!pip3 install torch torchvision torchaudio
```

EasyOCR is the second dependency that we will need to install. 

```bash
pip install easyocr
```
We now have PyTorch and EasyOCR installed. The next thing that we need to do is to import our dependencies into our notebook. 

```python
import cv2
import easyocr
import numpy as np
from matplotlib import pyplot as plt
```
We've imported four things:
- `EasyOCR` is the main package that we will use to perform optical character recognition.
- OpenCV as `cv2`. It will help us import our image and visualize it.
- `Matplotlib` also helps in visualization.
- `Numpy` to help perform mathematical calculations.

We now need to read in our images. We've downloaded two images from [Unsplash](https://unsplash.com). These images are:
- [Image one](https://unsplash.com/photos/XmMsdtiGSfo)
- [Image two](https://unsplash.com/photos/mRMQwK513hY)

Feel free to use any image you wish.

### Reading our image
```python
from google.colab.patches import cv2_imshow

image = cv2.imread("image-one.jpg")
cv2_imshow(image)
```
Now that our image is loaded onto our notebook, let's use EasyOCR to go ahead and perform optical character recognition.

### Using EasyOCR to extract text from our image
First, we need to pass in the `easyocr` reader and pass in the language that we want to use. In our case, that'll be English.

Secondly, using the `ocr_reader`, we pass in the `readtext` command and pass in our image. We save these results in a variable called `results`.

```python
ocr_reader = easyocr.Reader(['en'])
results = ocr_reader.readtext(image)
results
```
Results:
```bash
([[121.756503204768, 455.2312153828863],
   [389.1020796120134, 432.6470713866934],
   [389.24349679523203, 524.7687846171136],
   [122.8979203879866, 547.3529286133066]],
  'GOOD',
  0.5394189953804016),
 ([[126.45506700720357, 542.3292546273735],
   [389.0906482289428, 511.83345289506786],
   [393.5449329927964, 599.6707453726265],
   [130.90935177105715, 630.1665471049322]],
  'NEWS',
  0.993106484413147),
 ([[190.6717988226486, 618.007698233973],
   [392.5179510077811, 588.6436857858664],
   [398.3282011773514, 642.992301766027],
   [196.48204899221892, 672.3563142141336]],
  'COMING',
  0.9999751310992928)]
```
After applying EasyOCR on the image, we can see that it has been able to extract the text from the image with a good confidence value. The different values indicate the coordinates where our text is in the image.

### Visualizing results using the OpenCV library
Let's begin by defining a couple of key variables to determine where our different coordinates are. We'll use the OpenCV library for this task.

Let's set our coordinate variable.

```python
top_left = tuple(results[0][0][0])
bottom_right = tuple(results[0][0][2])
text = results[0][1]
font = cv2.FONT_HERSHEY_PLAIN
```
We began by defining a variable for our `top_left` coordinate. We've converted it into a `tuple` because when we pass it to OpenCV, it's expecting a tuple. We've done a similar thing with the `bottom_right` variable. We grab that text and put it into a variable known as `text`. We've also gone ahead and defined the OpenCV font that we're going to use. To learn about more OpenCV text fonts, please refer to this [article](https://www.oreilly.com/library/view/mastering-opencv-4/9781789344912/16b55e96-1027-4765-85d8-ced8fa071473.xhtml).

Let's now go ahead and visualize it. 

```python
img = cv2.imread("image-one.jpg")
img = cv2.rectangle(img,top_left,bottom_right,(0,255,0),3)
img = cv2.putText(img,text,top_left, font, 0.5,(255,255,255),2,cv2.LINE_AA)
plt.imshow(img)
plt.show()
```
![Box](/engineering-education/getting-started-with-optical-character-recognition/box.png)

Though small, we can see that a green bounding box has been drawn on the top right text. That's optical character recognition in a nutshell. Currently, it's only able to handle a single line of text. What happens if we have an image with multiple lines of text?

Let's try and make EasyOCR handle multiple lines of the extracted text.

### Handling multiple lines
Handling it is all the same as in the previous reader code, what changes is how we go ahead and visualize it. We need to loop through to visualize the other texts.
> As a side note, it will be taking a little longer to process as we are now working with multiple texts.

```python
image = cv2.imread("image-one.jpg")
spacer = 100
for detection in results: 
    top_left_detection = tuple([int(val) for val in detection[0][0]])
    bottom_right_detection = tuple([int(val) for val in detection[0][2]])
    text = detection[1]
    image = cv2.rectangle(img,top_left_detection,bottom_right_detection,(0,255,0),3)
    image = cv2.putText(image,text,(20,spacer), font, 0.5,(0,255,0),2,cv2.LINE_AA)
    spacer+=15
    
plt.imshow(img)
plt.show()
```
Result:

![Multiple lines](/engineering-education/getting-started-with-optical-character-recognition/multiple-lines.png)

You can find the complete code for this tutorial [here](https://colab.research.google.com/drive/1AxjheSGuvbTmGBypnAGz8csqc1tQQTF6?usp=sharing).

### Wrapping up
We've done quite a fair bit in this tutorial. We started by installing and importing our dependencies, we read our image using the EasyOCR reader, we drew our results using OpenCV, and finally took a look at how we can handle different detections on multiple lines. Hopefully, you found this tutorial useful.

Happy coding!

### Further reading
- [EasyOCR documentation](https://github.com/JaidedAI/EasyOCR)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
