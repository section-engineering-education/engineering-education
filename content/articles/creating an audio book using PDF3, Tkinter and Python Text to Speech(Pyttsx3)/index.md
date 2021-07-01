### Creating an audio book using PYPDF3 and Pyttsx3 (Python Text to Speech)

The wise men say that no matter how busy you are, you should find time to read a good book to avoid self inflicted ignorance. As a developer, we know the reality of this statement, but time is never enough for a software developer. This is why we run for the audio books which we all know does not come at a free price.

In this tutorial, we shall learn how to create a free audio book from a pdf file using python.

### 	Introduction

In order to build our own audiobook converter, we shall use the following Python libraries: `Pyttsx3`, `PyPDF3` and `tkinter`. The latter(`tkinter`) will be used to create a dialog window through which we shall use to select our desired pdf files.
We shall look deeper into the other libraries as we continue. 

### Prequisites

1. Have knowledge of Python
2. Have Python 3 installed in your computer.
3. Python text to speech library version3
4. Python PDF version 3
5. Understanding of [Tkinter](https://docs.python.org/3/library/tk.html)

### What is PyPDF3?

From PyPDF3's official documentation, it is a Pure-Python library built as a PDF toolkit. It was built to help with the following:

* Extracting document information (title, author, etc.)
* Splitting documents page by page.
* Merging documents page by page.
* Cropping pages.
* Merging multiple pages into a single page.
* Encrypting and decrypting PDF files.

> It is important to note that since this library is built from a file page perspective, it has problems manipulating pdf files that are not page numbered.

### Application

- It can be used as a tool for websites that manage or manipulate PDFs.

### What is Pyttsx3?

From the official documentation, Python Text to Speech version 3 (`pyttsx3`) is a text-to-speech conversion library in Python. Unlike alternative libraries, it works offline, and is compatible with both Python 2 and 3.

### Application

- It can be applied in desktop and mobile applications and websites to convert text to speech for the visually impaired.
- It can be used to create an audiobook.

### Installing Requirements

We'll install the required packages for this tutorial in a virtual environment. A virtual environment helps with our project management. For more information, [look into.](https://www.section.io/engineering-education/introduction-to-virtual-environments-and-dependency-managers/)

We will use `pipenv` to  create our virtual environment.

First, install `pipenv` if you don't have it installed in your machine by running the following command:

```bash
$ pip install pipenv
```

Then to create the virtual environment, let's install the required packages by running the following commands:

```bash
$ pipenv install pyttsx3
```

```bash
$ pipenv install PyPDF3
```

We then activate the environment with the following command:

```bash
$ pipenv shell
```

After this, we are ready to write our code as you will see below.

### Writing our code

```python:
# We first import the libraries we just installed

import pyttsx3
import PYPDF3
from tkinter import Tk  # comes pre-installed with Python

from tkinter.filedialog import askopenfilename 

Tk().withdraw() # prevents the root window from appearing

# Open the dialog window
file = askopenfilename()

# Read the name of the pdf file from the user
pdfreader = PyPDF3.pdfFileReader(file)

# Read the number of pages in the pdf file
pages = pdfreader.numPages

# Read all data from each page of the pdf file
for no in range(0,pages):
    page = pdfreader.getPage(no)
    text = page.extractText()
    audio = pyttsx3.init()
    audio.say(text)
    # Save the audio in an mp3 file
    '''Make sure to include the `save_to_file` method after the `say` method to as to get to record the audio of your book.'''
    audio.save_to_file(text, 'myaudiobook.mp3') 
    audio.runAndWait()
```

### Results

After running the code above, you'll see the a dialog window pop up.

![Dialog Window](/images/dialog.png)

Select the pdf file of your choice and enjoy your book as your machine reads it to you.

>  **Note:** Not all pdf files will be read through and recorded. Try using the numbered pages pdf files for greater results.

### Conclusion

You can explore more with [Python text to speech](https://pypi.org/project/pyttsx3/) library to be able to change voice, change the rate of speech, and the volume of speech. For more information on PyPDF3 library, you can read the [documentation](https://pypi.org/project/PyPDF3/).

It's time those stacked up books got on your "*to read list*" got exhausted with your own made audio book converter.

Good luck!
