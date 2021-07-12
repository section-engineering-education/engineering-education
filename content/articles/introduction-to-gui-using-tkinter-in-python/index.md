---
layout: engineering-education
status: publish
published: true
url: /introduction-to-gui-in-python-using-tkinter/
title: Introduction to GUI in Python using Tkinter
description: In this article, we will look at the basics of the graphical user interfaces programming in Python using Tkinter. We will build a simple password generator application.
author: majiyebo-ezra-shewuri
date: 2021-06-29T00:00:00-05:18
topics: [Languages]
excerpt_separator: 
images:

 - url: /engineering-education/introduction-to-gui-in-python-using-tkinter/hero.jpg
   alt: Python GUI Tkinter
---
A graphical user interface (GUI) allows users to interact with electronic devices using electronic symbols, as opposed to text-based user links, typed commands, or text exploration. GUIs were designed in response to command-line networks, an apparent steep learning curve, which requires command input via a computer keyboard.
<!--more-->
In most cases, activities in a GUI are performed by directly manipulating the graphical elements. GUIs are utilized in a range of mobile gadgets, including MP3 players, gaming devices, workplaces, and industrial controllers, in addition to computers.

In this tutorial, we will gain an understanding of how to build a password generator GUI using Tkinter.

### Table of content
- [What is Tkinter?](#what-is-tkinter?)
- [Prerequisites](#prerequisites)
- [What are Widgets?](#what-are-widgets?)
- [What is a password generator?](#what-is-a-password-generator?)
- [Conclusion](#conclusion)

### What is Tkinter?
Building GUIs with Tkinter has several advantages. Because Python is a cross-platform, apps built with Tkinter can run on Windows, Mac OS X, and Linux. 

Tkinter applications appear to be indigenous to the instance on which they run. This is because the visual components are built with native system applications.

Python must be installed before Tkinter can be used. When you install Python, you get Tkinter as well. However, if after installing Python Tkinter was not installed, you can use the `pip` command to install it:

```python
pip install tk
```

This command will install the Tkinter library and its related libraries.

### Prerequisites
To follow along with this tutorial, you should have:
- Python [installed](https://www.python.org/downloads/).
- A Python-oriented code editor. I use [PyCharm](https://www.jetbrains.com/pycharm/download/).

### What are widgets?
Widgets are the building blocks of graphical user interface programming, and they are used to view data or collect input from the user. See some examples of commonly used widgets below:

- `Frame`: It is a container that organizes and borders other widgets.
- `Label`: The label widget is used to display text on the screen.
- `Button`: It can contains text and when a button is clicked it executes an action.
- `Entry`: It displays a single-line text field for accepting user input.
- `Text`: A text entry widget allows you to enter multi-line text.

### what is a password generator?
A password generator is software that accepts input from a random or pseudo-random string or number generator and uses it to generate a password for the user.

It is a program that creates passwords depending on the rules the user selects to build complicated passwords that are tough to predict or breach for multiple accounts. 

Online hacking is growing more common these days, resulting in passwords and login information being compromised regularly, loss of money, and delicate personal information. 

Unfortunately, the majority of stolen passwords are uncomplicated and easy to guess. Names, date of birth, name of your spouse or family member, and personal pet names should not be used as passwords, because they are easy to guess. Password generators are very useful in these circumstances.

### Building a password generator
Create a new file named `passgen.py` where we will write our code.

Let's start by importing Tkinter:

```python
from tkinter import Button, Entry, Label, StringVar, Tk
from tkinter.ttk import Combobox
import random
```

The `tkinter.ttk` module gives the user access to the Tkinter widget set and allows the user to import `Combobox`. A combobox is a graphical user interface element that merges a drop-down box, list box, and allows the user to select input.

```python
screen = Tk()
screen.title("Password Generator")
screen.geometry('600x400')
screen.configure(background ="red")
```

A root window is created using the `Tk` class. The `Tk()` function assists in the creation of this GUI window, and provides numerous options such as setting the title and the geometry of the GUI window. 

The `geometry()` method is one of the many methods provided by Tkinter. We changed the background color to red using the `screen.configure()` method.

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

We defined the global variable `sc1`. We used the `.set()` method to set the value of `sc1` to an empty string. We also assigned an empty string value to the `passw` variable. 

The `length` variable will retain the value of `c1` which will determine the total number of values (alphabets, numbers, and symbols) required to form any password as selected by the user. 

We then created a `lowercase` variable that holds a string value of all the alphabets in lowercase. After that, we created the `uppercase` variable to hold a string value of all the alphabets in uppercase. 

In the last line, we defined the `mixs` which holds the values for all integer values, alphabets in both uppercase and lowercase, signs and symbols that will be required in creating a high-length password.

Add the following code inside the `gen()` function:

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

We defined the `if` condition to monitor the strength of the passwords generated. If the user decides the length of the password and then clicks on `Low Strength`, the password generator generates a random password in lowercase. 

If the user clicks on `Moderate Srength`, the password generator generates a random password in both lowercase and uppercase. This decreases the chances of an intruder predicting the password. 

If the user clicks on `High Strength`, the password generator generates a random password that is a `mixs` containing uppercase, lowercase, and special alphabetical signs and symbols. This gives an intruder little or no chance of predicting the password.
  
Add the following code outside the `gen()` function:

```python
sc1=StringVar('')
t1=Label(screen,text='Password Generator',font=('Arial',26),fg='white',background ="red")
t1.place(x=60,y=0)

t2=Label(screen,text='password:',font=('Arial',16),background ="red")
t2.place(x=145,y=90)
```

The variable `sc1` has been defined. In order to design the GUI window's section in this project, we'll use a label, an entry box, and a button. 

On the GUI window, we have created a label `t1` which is the title of the label item. We type the text on the label. We have also changed the font and background of the label. Then by using the x and y coordinate values, we have assigned the location of the `t1` label.

We have also created a label `t2`, its placeholder text, and its background. And we set its coordinates.

Add the code below:

```python
il=Entry(screen,font=('Arial',16),textvariable=sc1)
il.place(x=280,y=95)

t3=Label(screen,text='Length: ',font=('Arial',16),background ="red")
t3.place(x=150,y=130)

t4=Label(screen,text='Strength:',font=('Arial',16),background ="red")
t4.place(x=145,y=155)

c1=Entry(screen,font=('Arial',16),width=10)
c1.place(x=230,y=120)

c2=Combobox(screen,font=('Arial',16),width=15)
c2['values']=('Low Strength','Medium Strength','High Strength')
c2.current(1)
c2.place(x=237,y=155)

b=Button(screen,text='Generate',font=('Arial',16),fg='red',background ="white",command=gen)
b.place(x=230,y=195)

screen.mainloop()
```

Using the object `il`, we defined the entry box. We have calibrated the font of `il` and put the text variable to store the string worth of `sc1`. We have used x and y coordinates to assign the location of the `il` entry. We defined the label `t3`. Then, using coordinate values, we assigned it a location.

We then created the `t4` label. Using coordinates values, we assigned the location. We also gave entry `c1` a name. Set the `Combobox` c2's values to "Low Strength", "Medium Strength", and "High Strength". The `current()` function is used to set the value of `c2`. 

Then, using x and y coordinate values, we assigned the location of the `c2` `Combobox`. We defined `b` as a button and used the generator command to build an action when the button is clicked.

Finally, we used x and y coordinates to assign the location of the button `b`. The `mainloop()` function is an infinite loop that is used to run the program.

To run our app, execute the following command on your terminal:

```python
$ python passgen.py
```

And the password generator interface will be:

![password image](/engineering-education/introduction-to-gui-in-python-using-tkinter/passsword.png)

Congratulations on building your first Tkinter application!

### Conclusion
In this tutorial, We covered some fundamentals of the Tkinter GUI, and we built a password generator application in Python using Tkinter. You can find the code on [github](https://github.com/majiezra/password_analyser/blob/main/pass.py).

Happy Coding!

### Further reading
- [Python GUI programming with Tkinter](https://www.perlego.com/book/721869/python-gui-programming-with-tkinter-pdf)
- [Python Tkinter as a Java application](https://medium.com/analytics-vidhya/python-tkinter-as-a-java-application-36536176fe83)

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)