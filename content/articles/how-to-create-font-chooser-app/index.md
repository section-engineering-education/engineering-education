
![hero image](/engineering-education/how-to-create-font-chooser-application/heroimage.jpg)
## How to create a font chooser app using python 

Font picker is a simple application that allows you to browse through all of the fonts installed on your computer and filter down your options to find the ideal one for your project. The tkinter library will be used to construct a font chooser application in this tutorial.

### Table of content.

- Prerequisite
- Functions of tkinter
- Creating a font chooser app
- Conclusion
- Reference

### Prerequisite

To follow along with this tutorial as a programmer, you will need to have:

- The latest version of [python3](https://www.python.org/downloads/) installed on your computer system.
- A code editor, i use [pycharm](https://www.jetbrains.com/pycharm/download/) 

### Functions of tkinter

Python's standard GUI library is Tkinter. When Python and Tkinter are integrated, creating graphical user interfaces becomes much faster and easier.
Tkinter is a useful data analysis tool. 

Data analysis is the systematic application of statistical tools to explain and show, condense and appraise data.

Tkinter provides geometric widget configuration, which organizes widgets in parent windows for data science. There are three geometry manager classes in all. These are:

- pack() : It's used to organize widgets in blocks before they're placed in parent widgets.
 
- grid() : Before inserting widgets in the parent widget, grid() is used to organize them into a table-like layout.

- place() :This function is used to organize widgets by placing them in precise positions as specified by the programmer.

Tkinter can be used to construct a variety of charts (pie charts, bar charts, and line charts), which are essential for data analysis.

Tkinter's combobox can be used to plot data points in charts. You might use matplotlib to create dynamic values that change the diagram depending on the values selected in the Combobox.
 
 tkinter is used in creating GUI applications.
 
You can install tkinter by using the `pip` command.

```python
Pip install tk
```

### Creating a font chooser app

In our code editor, we'll make a new file called `font.py`, where we'll write our code.

Let's begin by installing tkinter as well as fonts from the tkinter library.

```python
from tkinter import *
from tkinter import font
root = Tk()
root.title('maji.com - Font Dialog Box')
root.iconbitmap('c:/gui/maji.ico')
root.geometry("550x450")
```

To start, first, we will create a root widget and this root widget is a window with a title bar. There can only be one root widget, and it must be created first before any other widgets.
Then we give our font app a name (maji.com notice that you can use your own name if you want to customize the app.), and then we set the size of the application.

```python
def font_chooser(e):
our_font.config(
 family=my_listbox.get(my_listbox.curselection()))
```

Then we write the `font_chooser` function, which includes defining the font function and configuring the Listbox to retrieve the system's current font selection.

```python
our_font = font.Font(family="Helvetica", size="30")
my_frame = Frame(root, width=490, height=285)
my_frame.pack(pady=10)
my_frame.grid_propagate(False)
my_frame.columnconfigure(0, weight=10)
```

Then we specify our font by setting our `font_variable` to a Helvetica typeface with a size of 30. Then a frame is created by defining the `my_frame` variable, which specifies the width and height. The `.grid` function is also used to freeze the frame and prevent the size of the Listbox from changing unnecessarily each time a new font is picked from the font chooser app.

```python

my_text = Text(my_frame, font=our_font)
my_text.grid(row=0, column=0)
my_text.grid_rowconfigure(0, weight=1)
my_text.grid_columnconfigure(0, weight=1)
my_listbox = Listbox(root, selectmode=SINGLE, width=90)
my_listbox.pack()
 ```  

By defining the `my_text` variable, we can add the textbox. We do this by putting the defined variable in a frame and utilising our font to make the font size dynamic.
We utilize the `.grid` function to prevent the font app from resizing abnormally, and we set the row and column weights to 1 to ensure that it evenly distributes any additional space in the row and column.
We create a Listbox by setting the `my_listbox` variable to a listbox with a single-mode selection, which allows us to choose only one font at a time while still specifying the width size.

```python
for f in font.families():
my_listbox.insert('end', f)
my_listbox.bind('<ButtonRelease-1>', font_chooser)
root.mainloop()
```

We then use the `for` loop to iterate over the `font.families` sequence to add font families to the already formed Listbox, and then use the `.bind` function to bind the Listbox.
`mainloop()` is the technique we'll utilize to run or execute our application. This technique will run indefinitely, waiting for user input until the user exits the program, either by closing the window or by using the Esc key.

And the font chooser interface will look like this:
![fontapp image](/engineering-education/how-to-create-font-chooser-application/fontchooser.png)

### Conclusion

 In this tutorial, we reviewed the role of tkinter in data science and built a font chooser application.

### Reference

 [Python GUI programming with Tkinter](https://www.perlego.com/book/721869/python-gui-programming-with-tkinter-pdf)

