### Introduction
A graphical user interface (GUI) allows users to interact with electronic devices using electronic symbols, as opposed to text-based user links, typed commands, or text exploration. GUIs were designed in response to command-line networks, apparent steep learning curve, which requires command input via a computer keyboard.

In most cases, activities in a GUI are performed by directly manipulating the graphical elements. GUIs are utilized in a range of mobile gadgets, including MP3 players, gaming devices, workplace, and industrial controllers, in addition to computers.

In this tutorial, we will gain an understanding of how to build a password generator GUI using Tkinter.

### Table of content
- [What is Tkinter?](#what-is-tkinter?)
- [Prerequisites](#prerequisites)
- [What are Widgets?](#what-are-widgets?)
- [What is a password generator?](#what-is-a-password-generator?)
- [Conclusion](#conclusion)

### What is Tkinter?
Tkinter is a GUI library that is installed together with Python. Tkinter has several advantages. Because the code is cross-platform, apps built with it can run on Windows, Mac OS X, and Linux. Tkinter applications appear to be indigenous to the programme on which they run. Because the visual components are built with native system applications, this is the case.

Python must be installed before Tkinter can be used. When you install Python, you get Tkinter as well. However, if after installing Python Tkinter was not installed, you can use the `pip` command to install it afterwards.

Tkinter can be installed using the pip command on a terminal, by running the command below.

```python
pip install tk
```

This command will install the Tkinter library and it's related libraries.

### Prerequisites
If you don't have Python installed, download the [latest version of Python](https://www.python.org/downloads/) and install it.

You can download a Python-oriented code editor, most preferably [PyCharm](https://www.jetbrains.com/pycharm/download/) and install it.

### What are widgets?
Widgets are the building blocks of graphical user interface programming, and they are used to view data or solicit input from the user. See some examples of commonly used widgets below.

- `Frame`: The frame widget is a container that organizes and borders other widgets.
- `Label`: The label widget is used to display text on the screen.
- `Button`: The button widget can contain text and when a button is clicked it executes an action.
- `Entry`: The entry widget displays a single-line text field for accepting user input.
- `Text`: A text entry widget allows you to enter multiline text.

### what is a password generator?
A  password generator is a software that accepts input from a random or pseudo-random string or number generator and uses it to generate a password for the user.

A password generator is a program that creates passwords depending on the rules the user select in order to build a strong and unpredictable password for multiple accounts. The password generator program generates a unique and random password for users, assisting them in creating a strong password with increased security.

Online hacking is growing more common these days, resulting to passwords and login information being compromised on a regular basis. If your passwords fall into the wrong hands, it can be highly problematic, and can even result to the loss of money or delicate personal information. Unfortunately, the majority of stolen passwords are uncomplicated and easy to guess. Names, birthdays, hobbies, and favorite pets don't make good passwords, and using them is a recipe for calamity. Password generators are very useful in this circumstances.

For personal or official use, the best password generators makes it simple to generate complicated passwords that are tough to predict or breach.

#### Let us see how we can construct a password generator.
Create a new file `passgen.py` where we will write our code in PyCharm or any python-oriented code editor.

Let's start by importing Tkinter.

```python
from tkinter import *
from tkinter.ttk import Combobox
import random
```

The `tkinter.ttk` module gives the user access to the Tkinter widget set and allows the user to import `Combobox`. A combobox is a graphical user interface element that merges a drop-down box, list box, and allows the user to select input.

```Python
screen = Tk()
screen.title("Password Generator")
screen.geometry('600x400')
screen.configure(background ="bisque")
```

A root window is created using the `Tk` class. The `Tk()` function assists in the creation of this GUI window, and provides numerous options such as setting the title and the geometry of the GUI window. The `geometry()` method is one of the many methods provided by Tkinter. We will change the background color using the `screen.configure()` method.

```python
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

```python
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

We define the `if` condition to monitor the strength of the passwords generated. If the user decides the length of the password and then clicks on `Low Strength`, the password generator generates a random password in lowercase. If the user decides to click on `Moderate Srength`, the password generator generates a random password in both lowercase and uppercase. This decreases the chances of an intruder predicting the password. If the user clicks on `High Strength`, the password generator generates a random password that is a `mixs` containing uppercase, lowercase and special alphabetical signs and symbols. This gives an intruder little or no chance in predicting the password.
  
Add the following code.

```python
sc1=StringVar('')
t1=Label(screen,text='Automatic Password Generator',font=('Arial',25),fg='red',background ="bisque")
t1.place(x=60,y=0)
t2=Label(screen,text='password:',font=('Arial',14),background ="bisque")
t2.place(x=145,y=90)
```

We have defined the `sc1` variable. In order to design the GUI window's section in this project, we'll use a label, an entry box, and a button. On the GUI window, we have created a label `t1` which is the title of the label item. We type the text on the label. We have also changed the font and background of the label. Then using the x and y coordinate values, we have assigned the location of the `t1` label.

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

On the GUI window, we have defined the entry box with the object `il`. We have calibrate the font of `il` and put the text variable to store the string worth of `sc1`. We have used x and y coordinates to assign the location of the `il` entry. We then defined the label `t3`. Then, using coordinate values, we assigned it a location.

We then created the `t4` label. Using coordinates values, we assigned the location. We also gave entry `c1` a name. Set the `Combobox` c2's values to "Low Strength", "Medium Strength", and "High Strength". The `current()` function is used to set the value of `c2`. 

Then, using x and y coordinate values, we assigned the location of the `c2` `Combobox`. We define `b` as a button and use the generator command to conduct an action when the button is clicked.

Then, we use x and y coordinates to assign the location of the button `b`. The `mainloop()` function is an infinite loop that is used to run the program.

Here is an image of the password generator interface.

![password image](/engineering-education/introduction-to-gui-using-tkinter-in-python/password.png)

Congratulations on finishing this tutorial.

you can get the code on [github](https://github.com/majiezra/password_analyser/blob/main/pass.py)

### Conclusion
We covered some fundamentals of Tkinter GUI in this tutorial, as well as how to build a password generator application in Python using Tkinter.

Happy Coding!
### References
- [Python GUI programming with Tkinter](https://www.perlego.com/book/721869/python-gui-programming-with-tkinter-pdf)
- [Python Tkinter as a Java application](https://medium.com/analytics-vidhya/python-tkinter-as-a-java-application-36536176fe83)
