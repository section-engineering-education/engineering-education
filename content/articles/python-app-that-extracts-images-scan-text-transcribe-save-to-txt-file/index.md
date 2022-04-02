Python is a huge and popular language that many developers enjoy working with. Its human-readable syntax makes it a popular language and an easy to learn path. As a developer, you might need to extract information from an image.

Images contain visual text that you can extract and add to the relevant text document. Python makes a good choice to create a program that extracts such text from any given image.

In this guide, we will learn how to create a python app using the tesseract. We will create and write a Python script that extracts images, scan text, transcribe and save it to a .txt file.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisities](#prerequisities)
- [Set up tesseract OCR](#set-up-tesseract-ocr)
- [Adding the project dependencies](#adding-the-project-dependencies)
- [Create a Python tesseract script](#create-a-python-tesseract-script)
- [Extracting images](#extracting-images)
- [Extracting text information](#extracting-text-information)
- [Test the Python tesseract app](#test-the-python-tesseract-app)
- [Conclusion](#conclusion)
### Prerequisities

To follow along with this article, ensure you have [Python installed](https://www.python.org/downloads/) and running on your computer. Also, make sure you have the basic [knowledge to write Python scrips](https://www.youtube.com/watch?v=rfscVS0vtbw).
### Set up tesseract OCR

To extract text from images, Python uses OCR technology. OCR (Optical Character Recognition) is a technology that is used to recognize text in images. It is used to convert tight handwritten or printed text into machine-readable text. OCR engine detects text in images and overlays the text onto PDFs.

To use OCR, you need to [install and configure](https://medium.com/quantrium-tech/installing-and-using-tesseract-4-on-windows-10-4f7930313f82) tesseract on your computer. First, download the Tesseract OCR executables [here](https://codetoprosper.com/tesseract-ocr-for-windows/). While installing this executable, make sure you copy the tesseract installation path and it to your [system environment varibales](https://codetoprosper.com/tesseract-ocr-for-windows/). Once the process is done, run the `tesseract -v` command to verify that the OCR is installed.

![tesseract](/engineering-education/python-app-that-extracts-images-scan-text-transcribe-save-to-txt-file/tesseract.jpg)

To test if this environment is working, you can run any image and see if the image text gets executed and saved in a readable text file.

First, endure you have an image with text information on your computer. Use your command line and navigate to the location when this image is saved. Then run the following `tesseract` command:

```bash
tesseract <image_name.png.jpeg.jpg> <file_name_to_save_extracted_text>
```

In this case, you will provide the image name and the file name. When the command is executed, a .txt file will be dave to the same folder your image is located.

That is it. This confirms that the OCR is working, and we can proceed to implement it using the Python script.

### Adding the project dependencies

We need to install a couple of dependencies to help us write the python script. This guide will use the following libraries:

- Pytesseract

[Python-tesseract](https://pypi.org/project/pytesseract/) is an OCR tool used to scan and transcribe any text messages embedded in images for python applications. This library is just used to only recognize this text information but not to save them to any text document.

To install pytesseract, run the following command:

```bash
pip install pytesseract
```

- PyMuPDF

[PyMuPDF](https://pypi.org/project/PyMuPDF/) is a python library used to access file documents and images such as PDF. In this application, PyMuPDF will read PDF documents and check for any saved images. PyMuPDF will destroy the PDF files, render them into PNG formats, scan for any text and finally extract the text from the rendered PNG images.

To install PyMuPDF, run the following command:

```bash
pip install PyMuPDF
```

- Pillow

[Pillow](https://pypi.org/project/Pillow/) provides image interpreter and processing capabilities for Python. To install pillow, run the following command:

```bash
pip install pillow
```

- Opencv-python

[Opencv-python](https://pypi.org/project/opencv-python/) is used to read images and videos, manipulate media files with image transformations, draw shapes and put text on those files. We will use Opencv for text recognition inside media files (images). This will help to detect and find text information in an image and recognize them using inbuilt methods.

To install opencv-python, run the following command:

```bash
pip install opencv-python
```

### Create a Python tesseract script

Let's dive in and write a script to execute this logic using Python. Create a project folder and add a new `main.py` file inside that folder. Below is how we will create this application:

First, we need to import these library dependencies that we installed in the above `pip` commands. Add the following imports inside the `main.py` file:

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

Then allow this application to process the image files:

```py
ImageFile.LOAD_TRUNCATED_IMAGES = True
```

Once the application access a PDF, its content will be extracted in the form of images. These images will then be processed to extract the text. In this case, we need to create some global variables that help create and save these images to the project path. We also need the path to save the extracted text into a `.txt` file. Go ahead and add these global variables:

```py
# Global variables
strPDF, textScanned,  textScanned, inputTeEx, dirName = "", "", "", "", [
    "images", "output_txt"]
```

This will create a directory `images` where the PDF extracted images will be saved. An `output_txt` director will also be created to save the scanned text information.

Now, let's create the command we need to access the installed tesseract and the file path. We will use this using the below `gInUs()` main function:

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
        print(Fore.RED + "[X] Please put a valid PATH to a file" + Fore.RESET)
    else:
        extIm(inputUser)
```

The funtion exucute your comouter sytem. Here we have two main paths ta we need to execute. The path to:

- `"[.] Add the tesseract.exe local path"` - this will access the tesseract and
- `"[!] Add the PDF file local path:"` - this will access the local PDF file we want to use.

Once you enter this path, we need first to verify if the file path is correct. If the path is incorrect, the application will show the `Please put a valid PATH to a file error message. If the path is correct, the application will extract the images by executing the`extIm()` let's go ahead and implement this function.

### Extracting images

Once we have the correct PDF file path, we need to run the file through our code and extract it to the images file running the `.txt` script.

First, we need to open the execute d file so that Python can read its content. We will use the `fitz` module as shown below:

```py
# Extracting images
def extIm(fileStr):
    # open the file
    pdf_file = fitz.open(fileStr)

```

We then need to create a path to save the images that we will extract from the file.

```py
global dirName
# Create output folder if don't exists
for i in dirName:
    try:
        os.makedirs(i)
        print(Fore.GREEN + "[!] Directory ", i,  " Created" + Fore.RESET)
    except FileExistsError:
        print(Fore.RED + "[X] Directory ", i,
            " already exists" + Fore.RESET)

 content = os.listdir("images")
```

In this case, we will create a directory if it does not exist on your computer. To create this directory, we need to access the computer system and create a new directory at the root of the project folder. The script will save the folder as `images`.

We need to check if there is any image available in this folder, list them and print each one.

```py
# List images if exists and print each one. if not extract all images
if(len(content) >= 1):
    # Print every img in content
    for i in content:
        print(Fore.YELLOW + f"This is an image: {i}" + Fore.RESET)
```

If no images are available, let's iterate over the PDF pages and extract all content into images. In this case, each page will be extact to the equivalent of one image.

```py
else:
    # Iterate over PDF pages
    for page_index in range(len(pdf_file)):

        # get the page itself
        page = pdf_file[page_index]
        image_list = page.getImageList()
```

Let's print the total images extracted and error messages if no images are found.

```py
# printing number of images found on this page
if image_list:
    print(
        Fore.GREEN + f"[+] Found a total of {len(image_list)} images in page {page_index}" + Fore.RESET)
else:
    print(Fore.RED + "[!] No images found on page",
        page_index, Fore.RESET)
```

Once the folder is identified and created, we also need to set naming for every image generated. In this case, will increment the image name from 1 to the maximum number of images available, then cast that to the name `image`, i.e., `image2_1`.

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

Here we are also executing the function `reImg()`. This will render these images and extract their content. Let's do this in the next step.

### Extracting text information

Not its time to scan for some text from the extracted images. Go ahead and create the `reImg()` function and add these global variables:

```py
def reImg():
    # Global var
    global textScanned
    global dirName
    global inputTeEx
```

At this point, we want to access the `tesseract.exe`. This local file will be accessed by the command that we set earlier at `"[.] Add the tesseract.exe local path" + Fore.RESET)`. We save this path using the global variable `inputTeEx` and assign it to the `input()` that you will insert based on your path.

```py
pytesseract.pytesseract.tesseract_cmd = f"{inputTeEx}"
```

Python will use the pytesseract module to access the tesseract through the cmd. It is a tesseract that will analyze the images and extract the text.

We need to access the extracted image path and read each image and its content.

```py
# List the images
content = os.listdir('images')

for i in range(len(content)):
    # Reading each image in images
    image = cv2.imread(f'images/{content[i]}')
```

Each image will undergo some scanning. In this case, we will scan the text available in each image.

```py
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

Once the images are scanned, we want to save this content to a `.txt` file.

```py
# Create and write file txtResult.txt
print(Fore.CYAN + "[.] Writing txtResult.txt" + Fore.RESET)
fileTxt = open(f"{dirName[1]}/txtResult.txt", "w")
fileTxt.write(textScanned)
print(Fore.GREEN + "[!] File Writted" + Fore.RESET)
```

Finally, call and execute the main we created earlier:\

```py
# Call to main function
gInUs()
```

### Test the Python tesseract app

To test the app run the `python main.py` and the roo of your project. This will create an interactive command. This will allow you to add the tesseract.exe and the PDF paths.

First, provide the tesseract path and hit enter:

```bash
> [!] Add the tesseract.exe local path
```

Once you hit enter, you will be instructed to add the PDF path.

```bash
> [!] Add the PDF file local path
```

This will execute the script and exact all images from the PDF. Then create an `output_txt` folder and save the extracted text information in a `.txt` file.

### Conclusion

In this guide, we have learned how to create a python app using the tesseract. We have created a Python script that extracts images, scans text, transcribes, and saves it to a .txt file. I hope you have found this tutorial helpful.

Clap 👏 If this article helps you.
