---
layout: engineering-education
status: publish
published: true
url: /drug-labels-extraction-using-deep-learning/
title: Drug Label Extraction using Deep Learning
description: This tutorial will show the reader how to extract drug labels from prescription medicine using Optical Character Recognition and deep learning.
author: wilkister-mumbi
date: 2021-09-21T00:00:00-10:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/drug-labels-extraction-using-deep-learning/hero.png
    alt: Drug Label Image
---
Optical Character Recognition (OCR) uses optics to extract readable text into machine-encoded text. A large number of companies that process paper-based forms use OCR to extract texts from documents.
<!--more-->
Applying cutting-edge technologies to modern problems has enabled various problems to be solved in healthcare, thereby improving people's lives. 

Machine learning has been used in hospitals to identify patients faster in disease identification and diagnosis, robotic surgery, and medical imaging diagnosis.

One notable area of concern in healthcare that hasn't been explored a lot is drug label extraction. Optical Character Recognition (OCR) uses optics to extract readable text into machine-encoded text.

OCR has been used on Google's visual translation service. Recently, most companies offering PDF services, such as Adobe, also provide this feature on their app.

We will be using OCR to enable us to automatically extract drug labels/text from prescription medicine.

We'll specifically use the PaddleOCR, previously referenced in a paper known as [PP-OCR: A Practical Ultra Lightweight OCR System](https://arxiv.org/pdf/2009.09941v3.pdf). The PaddleOCR is a model that the engineers at [Baidu](https://www.baidu.com/) originally built.

### Prerequisites
To understand this tutorial, you will need the following:
- Have Google Colab or Jupyter Notebook installed.
- You will need to be familiar with machine learning.
- You will need to have Python and PaddleOCR installed.

### Table of contents
- [Installing PaddleOCR for Python](#installing-paddleocr-for-python)
- [Applying PaddleOCR model to images](#applying-paddleocr-model-to-images)
- [Extracting prescription medication labels using PaddleOCR](#extracting-prescription-medication-labels-using-paddleocr)
- [Wrapping up](#wrapping-up)

To go through with our drug label extraction, we need to perform three key things:
1. Install and import our dependencies.
2. Instantiate the model and detect.
3. Visualize the results.

### Installing PaddleOCR for Python
We begin with opening a Jupyter notebook either on Colab or locally and install the required libraries. The dependency we want to install is the PaddleOCR. 

Head on to Paddle OCR's Github [page](https://github.com/PaddlePaddle/PaddleOCR). 

Under the `Tutorial` section, navigate to the `installation` sub-section. A thorough guide to install PaddleOCR is available [here](https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.3/doc/doc_en/environment_en.md#2).

There are two parts to the installation process. First, you have to install `paddlepaddle`, which is the underlying framework behind the PaddleOCR model. Second, we'll go ahead and install the `paddleOCR`.

The PaddleOCR model can run on both a GPU and CPU. GPUs are often preferred because of their greater memory bandwidth. 

If you have a GPU-enabled machine, use the following command to install the PaddleOCR:

```bash
!python3 -m pip install paddlepaddle-gpu==2.0.0 -i https://mirror.baidu.com/pypi/simple
```

If you have a CPU-enabled machine, use the following command to install the PaddleOCR:

```bash
!python3 -m pip install paddlepaddle==2.0.0 -i https://mirror.baidu.com/pypi/simple
```

> If you happen to get an error when installing, it's because you haven't installed the `pip` command. To install it, use the command, `pip3 install --upgrade pip`. Also, since we're installing it on our notebook, we have to include the exclamation mark `!` before the installation command.

Let's install PaddleOCR through a quick pip install, using the following command:

```bash
pip install paddleocr
```

It would be best if you cloned the PaddleOCR repo on Github.

```bash
!git clone https://github.com/PaddlePaddle/PaddleOCR
```

This clone is crucial as it'll enable the look-up of specific fonts when we visualize our results in the last step.  

Now that we've installed our dependencies, let's import them into our notebook/colab.

```python
from paddleocr import PaddleOCR, draw_ocr 
from matplotlib import pyplot as plt 
import cv2 
import os 
```
- `paddleocr` is our main OCR dependency
- `matplotlib` allows us to plot images
- `cv2` allows us to use the OpenCV library
- `os` allows for folder directory navigation

### Applying PaddleOCR model to images
Now, let us apply the PaddleOCR to our images.

These are the two images that we'll be applying PaddleOCR on:

![Drug1](/engineering-education/drug-labels-extraction-using-deep-learning/drug1.png)

*[Image Source: Canva](https://www.canva.com/)*

![Drug2](/engineering-education/drug-labels-extraction-using-deep-learning/drug2.png)

*[Image Source: Canva](https://www.canva.com/)*

Let's set it up using the following command:

```python
ocr_model = PaddleOCR(lang='en')
```

This command specifies the language of choice. For our case, we set it to English. Since the PaddleOCR is made by engineers at Baidu, it can also recognize Chinese characters. You may select your language as Chinese or any other supported language.

The following command sets up the path to our images on the machine. 

```python
img_path = os.path.join('.', 'drug1.jpg')
```

Let's run the OCR method on the `ocr_model` to make some detection. We can store the results in a variable known as `result.`

```python
result = ocr_model.ocr(img_path)
```

Running the command above gives the output:

```bash
[[[[114.0, 39.0], [265.0, 5.0], [273.0, 39.0], [121.0, 72.0]],
  ('Generio', 0.9429093)],
 [[[422.0, 99.0], [464.0, 89.0], [469.0, 113.0], [428.0, 122.0]],
  ('1', 0.5031448)],
 [[[135.0, 118.0], [457.0, 40.0], [467.0, 80.0], [144.0, 158.0]],
  ('TO APPOINTME', 0.9501941)],
 [[[302.0, 124.0], [433.0, 94.0], [442.0, 132.0], [311.0, 163.0]],
  ('THEN', 0.9947262)],
 [[[146.0, 166.0], [323.0, 122.0], [332.0, 160.0], [155.0, 203.0]],
  ('ONLY.', 0.9750903)],
 [[[154.0, 204.0], [455.0, 127.0], [468.0, 175.0], [167.0, 253.0]],
  ('TWICEDAILY', 0.99549305)]]
```

Using the `type(result)` command, we find these results stored in a list. We can use standard list indexing to get the results out. 

To grab all the texts, let's loop through the result variable, picking the first index that is the text. The following command is going to print out the text only.

```python
for res in result:
    print(res[1][0])
```

Output:

```bash
Generio
1
TO APPOINTME
THEN
ONLY.
TWICEDAILY
```

The few lines of code above allow us to extract the drug labels in drug bottles/capsules quickly.  

> Please note that we are using `drug1.jpg` in this example. You can play around with the code and use `drug2.jpg` and see the outcome.

### Extracting prescription medication labels using PaddleOCR
This step involves visualizing the results. The `draw_ocr` method, `opencv`, and `matplotlib` library help us achieve this.

Let's extract the boxes, scores, and text coordinates into separate variables. We then pass these coordinates into the `draw_ocr` method. 

This process feels similar to object detection if you've ever performed such a task. The `boxes` variable loops through and grabs the first index inside our `result` variable, the `texts` variable grabs the second, and the `scores` grab the third.

```python
boxes = [res[0] for res in result] 
texts = [res[1][0] for res in result]
scores = [res[1][1] for res in result]
```

The next step involves specifying the font path for our `draw_ocr` method. This is why I mentioned earlier in the tutorial that you need to clone the PaddleOCR Github repository. 

To use the `draw_ocr` method, we need a path defined to the specific fonts. Inside the downloaded repo, follow that path shown below, and you'll find different fonts inside a folder. For our case, `latin.ttf`. `ttf` is the font format we use for `True Type Font`.

We do this by issuing the following command:

```python
font_path = os.path.join('PaddleOCR', 'doc', 'fonts', 'latin.ttf')
```

Let's now load our image using OpenCV. We use OpenCV's `imread()` method to read in our image.

```python
img = cv2.imread(img_path) 
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
```

The command `cv2.COLOR_BGR2RGB` reorders the color channels. By default, OpenCV imports images as BGR.

The final step involves visualizing our images and detections. 

Using matplotlib, let's first resize our display area.

```python
plt.figure(figsize=(15,15))
```

We then use the `draw_ocr` method to draw annotations on the image.

```python
annotated = draw_ocr(img, boxes, texts, scores, font_path=font_path) 
```

Finally, we use matplotlib's `imshow()` method to visualize the image.

```python
plt.imshow(annotated)
```

Let's take a look at the result. This's the same image we had earlier. We can see that it has extracted the text and drawn bounding boxes around it.

![Output image using PaddleOCR](/engineering-education/drug-labels-extraction-using-deep-learning/output.png)

Please find the complete code to my code implementation [here](https://colab.research.google.com/drive/11EfSPacknXm16wWIkbyCCbyFSqVou0Ht).

### Wrapping up
One key feature of the PaddleOCR model is that it's swift. We also noted that with a few lines of code, we can extract labels from prescribed medicine. Amazing, right? 

In a nutshell, this tutorial showed you how you could use OCR to extract text from drug labels. The sizes and quality of your image will significantly impact your results. 

Remotely running this colab project may give you an error since you can't use my image path remotely. You can import an image of your choice into your colab, or you can carry out the task locally to circumvent this error.  

Try playing around with the code and see what you find.  

Happy coding!

### References
1. [PP-OCR: A Practical Ultra Lightweight OCR System](https://arxiv.org/pdf/2009.09941v3.pdf)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
