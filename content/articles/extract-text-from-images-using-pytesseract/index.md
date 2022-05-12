---
layout: engineering-education
status: publish
published: true
url: /extract-text-from-images-using-pytesseract/
title: Extracting Text From Images Using PyTesseract
description: This article will introduce the reader to tesseract library, and how it can be used to extract textual information from images.
author: edwin-wachira
date: 2022-04-18T00:00:00-09:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/extract-text-from-images-using-pytesseract/hero.jpg
    alt: Extracting Text From Images Using PyTesseract Hero Image
---
As a developer, you might want to extract textual information from an image. Using Python, we can create a program that extracts such textual data from any given image.
<!--more-->
Python has been one of the most popular languages developers enjoy working with. Its human-readable syntax makes it easy to learn.

In this guide, we will write a Python script that extracts images, scans for text, transcribes it, and saves it to a text file. We will use the Python tesseract library to recognize textual data from images.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisities](#prerequisities)
- [Setting up tesseract OCR](#setting-up-tesseract-ocr)
- [Adding the project dependencies](#adding-the-project-dependencies)
  - [Pytesseract](#pytesseract)
  - [PyMuPDF](#pymupdf)
  - [Pillow](#pillow)
  - [Opencv-python](#opencv-python)
- [Create a Python tesseract script](#create-a-python-tesseract-script)
- [Extract images](#extract-images)
- [Extract text information](#extract-text-information)
- [Test the app](#test-the-app)
- [Conclusion](#conclusion)

### Prerequisities
To follow along with this article, ensure that you have [Python installed](https://www.python.org/downloads/) and running on your computer.

Also, ensure you have some basic [understanding of Python](https://www.youtube.com/watch?v=rfscVS0vtbw).

### Setting up tesseract OCR
Optical Character Recognition (OCR) is a technology that is used to recognize text from images. It can be used to convert tight handwritten or printed texts into machine-readable texts.

To use OCR, you need to [install and configure](https://medium.com/quantrium-tech/installing-and-using-tesseract-4-on-windows-10-4f7930313f82) tesseract on your computer.

First, download the Tesseract OCR executables [here](https://codetoprosper.com/tesseract-ocr-for-windows/). While installing this executable, make sure you copy the tesseract installation path and add it to your [system environment varibales](https://codetoprosper.com/tesseract-ocr-for-windows/).

Once the process is done, run the `tesseract -v` command to verify that the OCR is installed.

![tesseract](/engineering-education/python-app-that-extracts-images-scan-text-transcribe-save-to-txt-file/tesseract.jpg)

To test whether this environment is working, you may run OCR on any image and see if the textual data gets extracted and saved in a readable text file.

To do that, ensure you have an image with textual information. Use your command line to navigate to the image location and run the following `tesseract` command:

```bash
tesseract <image_name> <file_name_to_save_extracted_text>
```

In this case, you will provide the image name and the file name. When the command is executed, a `.txt` file will be created and saved in the same folder.

This confirms that the tesseract library is successfully installed. We may now proceed to implement the same using a Python script.

### Adding the project dependencies
We need to install a few dependent libraries to help us get started with the Python script.

#### Pytesseract
[Python-tesseract](https://pypi.org/project/pytesseract/) is an OCR library that is used to scan and transcribe any textual data in images. This library is used to recognize textual information but not to save it to any text document.

To install `pytesseract`, run the following command:

```bash
pip install pytesseract
```

#### PyMuPDF
[PyMuPDF](https://pypi.org/project/PyMuPDF/) is a python library that is used to access file documents and images, such as PDFs.

In this application, PyMuPDF will read PDF documents and check for any saved images. PyMuPDF renders the PDF files into PNG formats, scans for any text, and finally extracts the text from the rendered PNG images.

To install `PyMuPDF`, run the following command:

```bash
pip install PyMuPDF
```

#### Pillow
[Pillow](https://pypi.org/project/Pillow/) library acts as an image interpreter with all image processing capabilities.

To install pillow, run the following command:

```bash
pip install pillow
```

#### Opencv-python
[Opencv-python](https://pypi.org/project/opencv-python/) is used to read images and videos, manipulate media files with image transformations, draw shapes, and put text on those files.

We will use OpenCV to recognize texts from the media files (images).

To install opencv-python, run the following command:

```bash
pip install opencv-python
```

### Create a Python tesseract script
Create a project folder and add a new `main.py` file inside that folder.

First, we need to import these library dependencies that we installed. Add the following imports inside the `main.py` file:

```py
import os  # from native modules
import fitz  # from PyMuPDF
import pytesseract  # from pytesseract
import cv2  # from Opencv
import io  # from native modules
from PIL import Image, ImageFile  # from Pillow
from colorama import Fore  # from native modules
import platform  # from native modules
```

Then, allow this application to process the image files:

```py
ImageFile.LOAD_TRUNCATED_IMAGES = True
```

Once the application gives access to PDF files, its content will be extracted in the form of images. These images will then be processed to extract the text.

In this case, we need to create a few global variables that help to create and save these images to the project path. We also specify the path to save the extracted text into a `.txt` file.

Go ahead and add these global variables as shown:

```py
# Global variables
strPDF, textScanned, textScanned, inputTeEx, dirName = "", "", "", "", [
    "images", "output_txt"]
```

This will create a directory `images` where the PDF extracted images will be saved. An `output_txt` directory will be created to save the scanned text information as `.txt` file.

Now, let's create the method that helps us access the installed tesseract library, and the required files. We will do this under `gInUs()` function as shown:

```py
def gInUs():
    # Global var
    global strPDF
    global inputTeEx
    if(platform.system() == "Windows"):
        # Print input
        print(Fore.YELLOW +
              "[.] Add the tesseract.exe local path" + Fore.RESET)
        inputTeEx = input()
        # Print input
        print(Fore.GREEN + "[!] Add the PDF file local path:" + Fore.RESET)
        inputUser = input()
    # Print an alert if input is not valid, if not, call to fun reDoc
    if(inputUser == "" or len(inputUser.split("\\")) == 1):
        print(Fore.RED + "[X] Please enter a valid PATH to a file" + Fore.RESET)
    else:
        extIm(inputUser)
```

From the code above:
- `"[.] Add the tesseract.exe local path"` - it helps us access the tesseract library.
- `"[!] Add the PDF file local path:"` - it helps us access the local PDF file we want to use.

Once we enter this path, we need first to verify whether the file path is correct. If the path is incorrect, the application will display `Please enter a valid PATH to a file` error message. If the path is correct, the application will extract text from the images by executing the `extIm()` method.

### Extract images
Once we have the correct PDF file path, we need to run the file and extract the text to the `.txt` file.

First, we need to open the text file and read its contents. To do that, we will use the `fitz` module as shown below:

```py
# Extracting images
def extIm(fileStr):
    # open the file
    pdf_file = fitz.open(fileStr)
```

We create a path to save the images that we extract from the file:

```py
global dirName
# Create output folder if don't exists
for i in dirName:
    try:
        os.makedirs(i)
        print(Fore.GREEN + "[!] Directory ", i, " Created" + Fore.RESET)
    except FileExistsError:
        print(Fore.RED + "[X] Directory ", i,
            " already exists" + Fore.RESET)
 content = os.listdir("images")
```

We need to check if there are any images available in the folder. If so, list them and print the contents of each image as shown:

```py
# List images if exists and print each one. if not extract all images
if(len(content) >= 1):
    # Print every img in content
    for i in content:
        print(Fore.YELLOW + f"This is an image: {i}" + Fore.RESET)
else:
    # Iterate over PDF pages
    for page_index in range(len(pdf_file)):
        # get the page itself
        page = pdf_file[page_index]
        image_list = page.getImageList()
```

If no images are available in the folder, we iterate over the PDF files and extract their contents.

Let's print the count of total images that we have extracted and display an error message if no image is found in the folder:

```py
# printing number of images found on this page
if image_list:
    print(
        Fore.GREEN + f"[+] Found a total of {len(image_list)} images in page {page_index}" + Fore.RESET)
else:
    print(Fore.RED + "[!] No images found on page",
        page_index, Fore.RESET)
```

In the loop, we name every image that is generated from the PDF. Here, we will append the image count to the string `image`. For example, `image2_1`:

```py
for (image_index, img) in enumerate(page.getImageList(), start=1):
    # get the XREF of the image
    xref = img[0]
    # extract the image bytes
    base_image = pdf_file.extractImage(xref)
    image_bytes = base_image["image"]
    # get the image extension
    image_ext = base_image["ext"]
    # load it to PIL
    image = Image.open(io.BytesIO(image_bytes))
    # save it to local disk
    image.save(
        open(f"images/image{page_index+1}_{image_index}.{image_ext}", "wb"))
reImg()
```

Here, we execute the function `reImg()` to render these images and extract their content. Let's do this in the next step.

### Extract text information
Let's create a function named `reImg()` to hold these global variables:

```py
def reImg():
    # Global var
    global textScanned
    global dirName
    global inputTeEx
```

At this point, we will have to access the `tesseract.exe` file. To do that, we use the global variable `inputTeEx`, where we accept the file path from the user:

```py
pytesseract.pytesseract.tesseract_cmd = f"{inputTeEx}"
```

Python will use the `pytesseract` module to access the tesseract through the `cmd`.

We need to loop through each extracted images and read its content to extract textual information as shown:

```py
# List the images
content = os.listdir('images')
for i in range(len(content)):
    # Reading each image in images
    image = cv2.imread(f'images/{content[i]}')
    # Scan text from image
    print(Fore.YELLOW + f"[.] Scan text from {content[i]}" + Fore.RESET)
    text = pytesseract.image_to_string(image, lang='spa')
    # Concate text scanned in a string
    textScanned += text
    # print
    print(Fore.GREEN + "[!] Finished scan text" + Fore.RESET)
    # Showing img input
    cv2.imshow('Image', image)
    # 0.5 milisecond
    cv2.waitKey(1000)
```

```py
# Create and write file txtResult.txt
print(Fore.CYAN + "[.] Writing txtResult.txt" + Fore.RESET)
fileTxt = open(f"{dirName[1]}/txtResult.txt", "w")
fileTxt.write(textScanned)
print(Fore.GREEN + "[!] File Writted" + Fore.RESET)
```

Finally, call the `gInUs()` function to execute the program:

```py
# Call to main function
gInUs()
```

### Test the app
To test the app, run `python main.py`.

First provide the tesseract path and hit enter:

```bash
> [!] Add the tesseract.exe local path
```

Once you hit enter, you will be instructed to add the PDF path:

```bash
> [!] Add the PDF file local path
```

On execution, the program creates an `output_txt` folder to save the extracted text information in `.txt` files.

### Conclusion
In this guide, we created a Python script that extracts textual information from the images by scanning, transcribing, and saving it to a text file. You can get the code used in this guide on [GitHub](https://github.com/Wachira48/Extracts-images-save-text-to-a-.txt-file).

I hope you found this tutorial helpful.

Clap 👏 If this article helps you.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
