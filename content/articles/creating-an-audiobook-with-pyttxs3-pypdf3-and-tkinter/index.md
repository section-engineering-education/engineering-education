---
layout: engineering-education
status: publish
published: true
url: /creating-an-audiobook-with-pyttxs3-pypdf3-and-tkinter/
title: Creating an audiobook with Pyttxs3, PyPDF3 and Tkinter
description: This tutorial demonstrates how to create a free audiobook from a pdf file with pyttxs3, pypdf3, and tinker.
author: adhinga-fredrick
date: 2021-07-23T00:00:00-05:56
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-an-audiobook-with-pyttxs3-pypdf3-and-tkinter/hero.jpg
    alt: audiobook example image
---  
The wise men say that no matter how busy you are, you should find time to read a good book to avoid self-inflicted ignorance. As software developers, we know the reality of this statement, but time is never enough for us. This is why we run for audiobooks which we all know their prices do not come cheaply or free.

In this tutorial, we will learn how to create an audiobook converter which we will use to convert PDF files to their audiobooks equivalent using Python libraries.

### Introduction
To build our audiobook converter, we will use the following Python libraries: `Pyttsx3`, `PyPDF3` and `tkinter`. The latter `tkinter` will be used to create a dialog window through which we will use to select our desired PDF files.

We will look deeper into the other libraries as we continue.

### Prerequisites  
To understand this article, a reader needs to have:
- A good understanding of Python.
- [`Python3`]((https://www.python.org/downloads/)) installed on the computer.
- [`Python text to speech`](https://pypi.org/project/pyttsx3/) library version 3 installed.
- [`Python PDF`](https://pypi.org/project/python-pdf/) version 3 installed.
- A good understanding of [`Tkinter`](https://docs.python.org/3/library/tk.html).

### What is PyPDF3?  
From PyPDF3's [official documentation](https://pythonhosted.org/PyPDF2/), it is a pure-python library built as a PDF toolkit. It was built to help with the following:

* Extracting document information (title, author, etc.).
* Splitting documents page by page.
* Merging documents page by page.
* Cropping pages.
* Merging multiple pages into a single page.
* Encrypting and decrypting PDF files.

> It is important to note that since this library is built from a file page perspective, it has problems manipulating pdf files that are not correctly page numbered.

#### Application
It can be used as a tool for websites that manage or manipulate PDFs.

### What is Pyttsx3?
From the Pyttsx3's [official documentation](https://pyttsx3.readthedocs.io/en/latest/), Python Text to Speech version 3 (`pyttsx3`) is a text-to-speech conversion library in Python. Unlike alternative libraries, it works offline and is compatible with both Python 2 and 3.

#### Application
It can be applied in desktop and mobile applications and websites to convert text to speech for the visually impaired.

It can be used to create an audiobook.

### Installation requirements
We'll install the required packages for this tutorial in a virtual environment. A virtual environment helps with our project management. For more information on virtual environments, look into this [article](https://www.section.io/engineering-education/introduction-to-virtual-environments-and-dependency-managers/).

We will use `pipenv` to create our virtual environment.

First, install `pipenv` if you don't have it installed on your machine by running the following command:

```bash
pip install pipenv
```

Then to create the virtual environment, let's install the required packages by running the following commands:

```bash
pipenv install pyttsx3
pipenv install PyPDF3
```

We then activate the environment with the following command:

```bash
pipenv shell
```

After this, we are ready to write our code as you will see below.

### Writing our code
While inside our virtual environment, let's create a file and name it `main.py`. Afterward, write the following code into it:

```python
# We first import the libraries we just installed
import pyttsx3
import PyPDF3
from tkinter import Tk # tkinter comes pre-installed with Python
from tkinter.filedialog import askopenfilename

Tk().withdraw() # prevents the root window from appearing

# Open the dialog window
file = askopenfilename()

# Read the name of the pdf file from the user
pdfreader = PyPDF3.PdfFileReader(file)

# Read the number of pages in the pdf file
pages = pdfreader.numPages

# Read all data from each page of the pdf file
for no in range(0,pages):
page = pdfreader.getPage(no)
text = page.extractText()
audio = pyttsx3.init()
audio.say(text)

# Save the audio in an mp3 file
'''Make sure to include the `save_to_file` method after the `say` method to get to record the audio of your book.'''
audio.save_to_file(text, 'myaudiobook.mp3')
audio.runAndWait()
```

### Results
After running the code above, you'll see a dialog window pops up:

![Dialog Window](/engineering-education/creating-an-audiobook-with-pyttxs3-pypdf3-and-tkinter/dialog.png)

Select the PDF file of your choice and enjoy your book as your machine reads it to you.

Feel free to have a preview of the results on my [replit](https://replit.com/join/xsaeqptwdi-frederico23).

> **Note:** Not all PDF files will be read through and recorded. Try using the unnumbered pages PDF files for better results.

### Conclusion
You can explore more with [Python text to speech](https://pypi.org/project/pyttsx3/) library to be able to change voice, change the rate of speech, and the volume of speech. For more information on PyPDF3 library, you can read this [documentation](https://pypi.org/project/PyPDF3/).

It's time those stacked up books that you got on your "*to-read list*" got exhausted with your own made audiobook converter.

Good luck!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)