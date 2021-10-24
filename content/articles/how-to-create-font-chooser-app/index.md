![hero image](/engineering-education/how-to-create-font-chooser-application/hero image.png)

### How to create a font chooser app using python 
A font picker is a simple application that allows you to browse through all the fonts installed on your computer, and filter down your options to find the ideal one for your project or work.

The Tkinter Python library will be used to construct a font chooser application in this tutorial.

### Table of content.
- Prerequisite
- What is Tkinter?
- Creating a font chooser app
- Conclusion
- Reference

### Prerequisite
To follow along with this tutorial, you will need to have:

- [Python3](https://www.python.org/downloads/) installed on your computer system.
- A code editor, i use [Pycharm](https://www.jetbrains.com/pycharm/download/).

### What is Tkinter?
Python's standard GUI library is Tkinter. When Python and Tkinter are integrated, creating graphical user interfaces becomes much faster and easier. 

Tkinter provides geometric widget configuration, which organizes widgets in parent windows for grahical user interface.

Tkinter is a fantastic tool for creating graphical user interfaces and applications in python and we will be using it to build the font chooser application.

You can install Tkinter by using the `pip` command.

```python
pip install tk
```

### Creating a font chooser app
A font is a digital data file that contains a collection of graphically related glyphs. A font chooser application is used to design and create a computer font.

Fonts are also known as typefaces, and they come in a variety of weights, shapes, sizes, colour, design and  widths.

According to estimates, there are over half a million fonts in use worldwide; a font chooser application will assist a computer user in filtering down the total number of fonts installed in a computer system and selecting the font he wants to use.

To add style to a web page or document, different fonts are used. That is, they can be used to set or match the text's "tone" depending on the content. Additionally, depending on the medium, certain fonts have an impact on readability.

Computer font file data formats are divided into three categories:

- Bitmap font: The glyph in each face, weight, width and size is represented by a matrix of dots.

- Vector font: It is also known as the outline font, here each glyph is described by drawing specifications and mathematical method, allowing the character outlines to be scaled to any size.

- Stroke font: It defines the size and shape of the line in a specific typeface using a series of specified lines and additional data, which together decide the appearance of the glyph.

In our code editor, we'll make a new file called `font.py`, where we'll write our code.

Let's begin by importing Tkinter as well as fonts from the tkinter library.

```python
from tkinter import *
from tkinter import font

root = Tk()

root.title('maji.com - Font Chooser App')
root.iconbitmap('c:/gui/maji.ico')
root.geometry("500x400")
```

To start, first, we will create a root widget and this root widget is a window with a title bar. This widget has to be created first, and it is called the root widget, after creating the root widget, the programmer can then create other widgets.

Then we give our font app a name (I used `maji.ico`. You can use your own name if you want to customize the app.). Then we set the size of the application.

```python
def font_chooser(a):
        user_font.config(family=my_listbox.get(my_listbox.curselection()))
```

Then we write the `font_chooser` function, which includes defining the font function and configuring the `Listbox` to retrieve the system's current font selection.

```python
user_font = font.Font(family="Helvetica", size="30")

my_frame = Frame(root, width=490, height=285)
my_frame.pack(pady=10)
my_frame.grid_propagate(False)
my_frame.columnconfigure(0, weight=10)
```

Then we specify our font by setting our `font_variable` to a Helvetica typeface with a size of 30. Then a frame is created by defining the `my_frame` variable, which specifies the width and height.

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

We utilize the `.grid` function to prevent the font app from resizing abnormally, and we set the row and column weights to 1 to ensure that it evenly distributes any additional space in the row and column.

We create a `Listbox` by setting the `my_listbox` variable to a listbox with a single-mode selection, which allows us to choose only one font at a time while still specifying the width size.

```python
for f in font.families():
        my_listbox.insert('end', f)
my_listbox.bind('<ButtonRelease-1>', font_chooser)
root.mainloop()
```

We use a `for` loop to iterate over the `font.families` sequence to add font families to the already formed `Listbox`, and then use the `.bind` function to bind the `Listbox`.

`mainloop()` is the method that we will use to run the font chooser application. It will allow the application to run continuously and indefinitely until the user decides to end the program by closing the window or using the Escape key on the keyboard.

And the font chooser interface will look like this:
![fontapp image](/engineering-education/how-to-create-font-chooser-application/fontchooserapp.png)

### Conclusion
In this tutorial, we reviewed the role of Tkinter in data science and built a font chooser application.

### Reference
[Python GUI programming with Tkinter](https://www.perlego.com/book/721869/python-gui-programming-with-tkinter-pdf) by Alan D Moore

