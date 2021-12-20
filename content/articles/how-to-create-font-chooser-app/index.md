---
layout: engineering-education
status: publish
published: true
url: /how-to-create-font-chooser-app/
title: How to Create a Font Chooser App Using Python
description: This article will show you how to create a font chooser app using Python.
author: majiyebo-ezra-shewuri
date: 2021-11-19T00:00:00-02:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-font-chooser-app/hero.jpg
    alt: Font Chooser Tkinter
---

A font picker is a simple application that allows you to browse through all the fonts installed on your computer, filtering down your options to find the ideal one for your project.
<!--more-->
In this tutorial, the Tkinter Python library will be used to construct a font chooser application.

### Table of contents
- Prerequisites
- What is Tkinter?
- Creating a font chooser app
- Conclusion
- Reference

### Prerequisites
To follow along with this tutorial, you will need to have:

- [Python3](https://www.python.org/downloads/) installed on your computer system.
- A code editor. I use [Pycharm](https://www.jetbrains.com/pycharm/download/).

### What is Tkinter?
Tkinter is Python's standard GUI library. When Python and Tkinter are integrated, creating graphical user interfaces becomes much faster and easier.

Tkinter provides geometric widget configuration, which organizes widgets in parent windows for grahical user interface.

Tkinter is a fantastic tool for creating graphical user interfaces and applications in python. We will be using it to build the font chooser application.

You can install Tkinter by using the `pip` command.

```python
pip install tk
```

### A little background about fonts
A font is a digital data file that contains a collection of graphically related glyphs. A font maker application is used to design and create a computer font.

Fonts are also known as typefaces, and they come in a variety of weights, shapes, sizes, color, design and widths.

According to estimates, there are over half a million fonts in use worldwide. A font chooser application will assist computer users in filtering down the total number of fonts installed in a computer system and selecting the font they wants to use.

To add style to a web page or document, different fonts are used. That is, they can be used to set or match the text's "tone" depending on the content. Additionally, depending on the medium, certain fonts have an impact on readability.

Computer font file data formats are divided into three categories:

#### 1. Bitmap font
The glyph in each face, weight, width and size is represented by a matrix of dots.

![bitmap font image](/engineering-education/how-to-create-font-chooser-app/bitmapfont.jpg)

#### 2. Vector font
It is also known as the outline font. Here each glyph is described by drawing specifications and mathematical methods, allowing the character outlines to be scaled to any size.

![vector font image](/engineering-education/how-to-create-font-chooser-app/vectorfont.png)

#### 3. Stroke font
The size and shape of the line in a specific typeface is defined using a series of specified lines and additional data, which together decide the appearance of the glyph.

![stroke font image](/engineering-education/how-to-create-font-chooser-app/strokefont.jpg)

### Creating the font chooser app
In our code editor, we'll make a new file called `font.py`, where we'll write our code.

Let's begin by importing Tkinter as well as fonts from the Tkinter library.

```python
from tkinter import *
from tkinter import font

root = Tk()

root.title('maji.com - Font Chooser App')
root.iconbitmap('c:/gui/maji.ico')
root.geometry("500x400")
```

First, we create a root widget. This is a window with a title bar. After creating the root widget, the programmer can then create other widgets.

Then we give our font app a name (I used `maji.com`. You can use your own name if you want to customize the app).

Then we set the size of the application.

```python
def font_chooser(a):
    user_font.config(
        family=user_listbox.get(user_listbox.curselection()))
```

Then we write the `font_chooser` function, which includes defining the font function and configuring the `Listbox` to retrieve the system's current font selection.

```python
user_font = font.Font(family="Helvetica", size="30")

my_frame = Frame(root, width=490, height=285)
my_frame.pack(pady=10)
my_frame.grid_propagate(False)
my_frame.columnconfigure(0, weight=10)
```

Then we specify our font by setting our `font_variable` to a Helvetica typeface with a size of 30. Then a frame is created by defining `my_frame` variable, which specifies the width and height.

The `.grid` function is also used to freeze the frame and prevent the size of the `Listbox` from changing unnecessarily each time a new font is picked from the font chooser app.

```python
user_text = Text(my_frame, font=user_font)
user_text.grid(row=1, column=1)
user_text.grid_rowconfigure(0, weight=1)
user_text.grid_columnconfigure(0, weight=1)

user_listbox = Listbox(root, selectmode=SINGLE, width=90)
user_listbox.pack()
```

By defining the `user_text` variable, we can add the textbox. We do this by putting the defined variable in a frame and utilising our font to make the font size dynamic.

We utilize the `.grid` function to prevent the font app from resizing abnormally. We set the row and column weights to 1 to ensure that additional space in the row and column is evenly distributes.

We create a `Listbox` by setting the `user_listbox` variable to a `Listbox` with a single-mode selection, which allows us to choose only one font at a time while still specifying the width size.

```python
for f in font.families():
    user_listbox.insert('end', f)

user_listbox.bind('<ButtonRelease-1>', font_chooser)
root.mainloop()
```

We use a `for` loop to iterate over the `font.families` sequence adding the font families to the already formed `Listbox`. We then use the `.bind` function to bind the `Listbox`.

`mainloop()` is the method that we will use to run the font chooser application. It will allow the application to run continuously and indefinitely until the user decides to end the program by closing the window or using the Escape key on the keyboard.

And the font chooser interface will look like this:

![fontapp image](/engineering-education/how-to-create-font-chooser-app/fontchooserapp.png)

### Conclusion
In this tutorial, we looked at the different types of computer font formats and how to make a font chooser application. Go ahead and try it out in your projects.

### Reference
[Python GUI programming with Tkinter](https://www.perlego.com/book/721869/python-gui-programming-with-tkinter-pdf) by Alan D Moore

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
