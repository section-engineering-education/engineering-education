### Introduction
A graphical user interface (GUI), as opposed to text-based user interfaces, typed command labels, or text navigation, allows users to interact with electronic devices through the use of graphic icons and audio indicators such as primary notations. GUIs were developed in response to the perceived steep learning curve of command-line interfaces, which require commands to be typed on a computer keyboard.

In most cases, activities in a GUI are performed by directly manipulating the graphical elements. In addition to computers, GUIs are used in a variety of handheld mobile devices such as MP3 players, portable media players, gaming devices, cellphones, and smaller household, office, and industrial controllers.

In this tutorial, we will learn how to build a password generator GUI using Tkinter.

### Table of content

- [What is Tkinter?](#what-is-tkinter?)
- [Prerequisites](#prerequisites)
- [What are Widgets?](#what-are-widgets?)
- [What is a password generator?](#what-is-a-password-generator?)
- [Conclusion](#conclusion)

### What is Tkinter?
Tkinter is a GUI library that is installed together with Python. Tkinter has several advantages. Because the code is cross-platform, apps built with it can run on Windows, Mac OS X, and Linux. Tkinter applications appear to be native to the platform on which they are running. This is because the visual elements are created using native operating system elements.

Python must be installed before Tkinter can be used. When you install Python, you get Tkinter as well. However, if Tkinter was not installed when Python was installed, you can do it later using the pip command.

Tkinter can be installed using the pip command on a terminal, by running the command below.

```python
pip install tk
```

This command will install the Tkinter library and it's related libraries.

### Prerequisites
If you don't have Python already installed, download the [latest version of Python](https://www.python.org/downloads/) and install it.

You can download a python-oriented code editor, most preferably [PyCharm](https://www.jetbrains.com/pycharm/download/) and install it.

### What are widgets?
Widgets are the building blocks of graphical user interface programming, and they are used to view data or solicit input from the user. Here are a few examples of commonly used widgets.

- `Frame`: The frame widget is a container that organizes and borders other widgets.
- `Label`: The label widget is used to display text on the screen.
- `Button`: The button widget can contain text and can perform an action when clicked.
- `Entry`: The entry widget displays a single-line text field for accepting user input.
- `Text`: A text entry widget allows you to enter multiline text.

### what is a password generator?
A  password generator is a software that accepts input from a random or pseudo-random string or number generator and uses it to generate a password for the user.

A password generator is a program that creates passwords depending on the rules the user select in order to build a strong and unpredictable password for multiple accounts. The password generator program generates a unique and random password for users, assisting them in creating a strong password with increased security.

Online hacking is growing more common these days, resulting to passwords and login information being compromised on a regular basis. If your passwords fall into the wrong hands, it can be highly inconvenient, and can even result to the loss of money or sensitive personal information.

Unfortunately, the majority of stolen passwords are simple and easy to guess. Names, birthdays, hobbies, and favorite pets don't make good passwords, and using them is a recipe for disaster. Password generators come very handy in this situation.

For personal or corporate usage, the best password generators make it simple to create strong passwords that are difficult to guess or crack.

#### Let us see how we can build a password generator.
Create a new file `passgen.py` on your [PyCharm](https://www.jetbrains.com/pycharm/download/) or any python-oriented code editor.

Let's start by importing Tkinter.

```Python
from tkinter import *
from tkinter.ttk import Combobox
import random
```

The `tkinter.ttk` module gives the user access to the Tkinter widget set and allows the user to import `Combobox`. A combobox is a graphical user interface component that combines a drop-down box, list box, or allows the user to select input.

```Python
screen = Tk()
screen.title("Password Generator")
screen.geometry('600x400')
screen.configure(background ="bisque")
``` 

A root window is created using the `Tk` class. The `Tk()` function assists in the creation of this GUI window, and provides numerous options such as setting the title and the geometry of the GUI window. The `geometry()` method is one of the many methods provided by Tkinter. We will change the background color using the `screen.configure()` method.

```Python
def gen():
   global sc1
   sc1.set("")
   passw=""
   length=int(c1.get())
   lowercase='abcdefghijklmnopqrstuvwxyz'
   uppercase='ABCDEFGHIJKLMNOPQRSTUVWXYZ'+lowercase
   mixs='0123456789'+lowercase+uppercase+'@#$%&*'
```

The global variable `sc1` is defined in the line code `global sc1`. We used the `.set()` method to set the value of `sc1` to an empty string. We also assign a empty string value to the `passw` variable. The `length` variable will retain the value of `c1` which will determine the total number of values(alphabets,numbers and symbols) required to form any password as selected by the user. We then create a `lowercase` variable that holds a string value of all the alphabets in lowercase. After that, we create the `uppercase` variable to hold a string value of all the alphabets in uppercase. And at the last line of code, we define the `mixs` this holds the values for all integer values, alphabets in both uppercase and lowercase as well and signs and symbols that will be required in creating a high-strength password.

Add the following code.

```Python
if c2.get()=='Low Strength':
    for i in range(0,length):
        passw=passw+random.choice(lowercase)
    sc1.set(passw)
elif c2.get()=='Medium Strength':
    for i in range(0,length):
        passw=passw+random.choice(uppercase)
    sc1.set(passw)
elif c2.get()=='High Strength':
    for i in range(0,length):
        passw=passw+random.choice(mixs)
    sc1.set(passw)
```

We define the `if` condition to monitor the strength of the passwords generated.
`if` the user decides the length of the password and then clicks on `Low Strength` the password generator generates a random password in lowercase `elif` the user decides to click on `Moderate Srength` the password generator generates a random password in both lowercase and uppercase there by decreasing the chance of an intruder's ability to predict the password `elif` if the user decides to click on `High Strength` the password generator generates a random password that is a `mixs` containing uppercase, lowercase and special alphabetical signs and symbols, this gives an intruder little or no chance in predicting the password
  
Add the following code.

```Python
sc1=StringVar('')
t1=Label(screen,text='Automatic Password Generator',font=('Arial',25),fg='red',background ="bisque")
t1.place(x=60,y=0)
t2=Label(screen,text='password:',font=('Arial',14),background ="bisque")
t2.place(x=145,y=90)
```

We have defined the `sc1` variable. In order to design the GUI window's section In this project, we'll use a label, an entry box, and a button. On the GUI window, we have created a label `t1`, where `t1` is the name of the label object. We type the text on the label. We have also changed the font and background of the label. Then using the x and y coordinate values, we have assigned the location of the `t1` label.

We have also created a label `t2`, it's placeholder text and its background. We have also set its coordinates.

Add the code below.

```Python
il=Entry(screen,font=('Arial',14),textvariable=sc1)
il.place(x=270,y=90)
t3=Label(screen,text='Length: ',font=('Arial',14),background ="bisque")
t3.place(x=145,y=120)
t4=Label(screen,text='Strength:',font=('Arial',14),background ="bisque")
t4.place(x=145,y=155)
c1=Entry(screen,font=('Arial',14),width=10)
c1.place(x=230,y=120)
c2=Combobox(screen,font=('Arial',14),width=15)
c2['values']=('Low Strength','Medium Strength','High Strength')
c2.current(1)
c2.place(x=237,y=155)
b=Button(screen,text='Generate',font=('Arial',14),fg='red',background ="white",command=gen)
b.place(x=230,y=195)

screen.mainloop()
```

On the GUI window, we have defined the entry box with the object `il`. We have set the font of `il` and set the text variable to store the string value of `sc1`. We have used x and y coordinates to assign the location of the `il` entry. We then defined the label `t3`. Then, using coordinate values, we assigned it a location. 

We then created the `t4` label. Using coordinates values, we assigned the location. We also gave entry `c1` a name. Set the `Combobox` c2's values to "Low Strength", "Medium Strength", and "High Strength". The `current()` function is used to set the value of `c2`. 

Then, using x and y coordinate values, we assigned the location of the `c2` `Combobox`. We then define `b` as a button and use the generator command to conduct an action when the button is clicked.

Then, we use x and y coordinates to assign the location of the button `b`. The `mainloop()` function is an infinite loop that is used to run the program.

Here is an image of the password generator interface.

![password image](/engineering-education/introduction-to-gui-using-tkinter-in-python/password.png)

Congratulations on finishing this tutorial.

### Conclusion

We covered some fundamentals of Tkinter GUI in this tutorial, as well as how to build a password generator application in Python using Tkinter.

### References
- [Python GUI programming with Tkinter](https://www.perlego.com/book/721869/python-gui-programming-with-tkinter-pdf)
- [Python Tkinter as a Java application](https://medium.com/analytics-vidhya/python-tkinter-as-a-java-application-36536176fe83)
