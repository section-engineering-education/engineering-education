
### Introduction
The term Graphic User interface, as opposed to text-based user interfaces, typed command labels, or text navigation, allows users to interact with electronic devices through the use of graphical icons and audio indicators such as primary notation. GUIs were developed in response to the perceived steep learning curve of command-line interfaces, which require commands to be typed on a computer keyboard.
In most cases, activities in a GUI are performed by directly manipulating the graphical elements. In addition to computers, GUIs are used in a variety of handheld mobile devices such as MP3 players, portable media players, gaming devices, cellphones, and smaller household, office, and industrial controllers.
Programmers can learn how to build a password generator using Tkinter in this tutorial.

### Table of content
- [Prerequisites](#prerequisites)
- [What is Tkinter?](#what-is-tkinter?)
- [What are Widgets?](#what-are-widgets?)
- [How to build a password generator](#how-to-build-a-password-generator)
- [Conclusion](#conclusion)

### Prerequisites
Download the latest version of [Python](https://www.python.org/downloads/) and install it.
Also download a python code editor more preferable [PyCharm](https://www.jetbrains.com/pycharm/download/), it is student-oriented, friendly and easy to use.

### What is Tkinter
Tkinter is a platform that is included with Python. Tkinter has several advantages. Because the code is cross-platform, they can run it on Windows, Mac OS X, and Linux. Tkinter applications appear to be native to the platform on which they are running because visual elements are created using native operating system elements.
Python must be installed before Tkinter can be installed. When the user installs Python, the user gets Tkinter as well. During the Python installation process.
However if Tkinter was not  installed when Python was installed, we can do it later with the pip command.
Tkinter can be installed using the pip command at the terminal.
Run the following command 
```python
Pip install tk
```
This program will begin obtaining and installing Tkinter library-related items. After that, you'll see a notification indicating that the installation was successful.

### What are widgets?
Widgets are the building blocks of graphical user interface programming, and they are used to view data or solicit input from the user. Here are a few examples of commonly used widgets.

`Frame`: The Frame widget is a container widget that organizes and borders other widgets.

`Label`: The Label widget is used to display text on the screen.

`Button`: The button widget can contain text and can perform an action when clicked.

`Entry`: The Entry widget displays a single-line text field for accepting user input.

`Text`: A Text entry widget allows you to enter text in multiple lines.

### how to build a password generator
A  password generator is a piece of software that accepts input from a random or pseudo-random number generator and automatically generates  a password for the user.
A password generator is a program that creates passwords depending on the rules the user select in order to build a strong, unpredictable password for multiple accounts. The Password Generator program generates a unique and random password for users, assisting them in creating a strong password with increased security.
Online hacking is growing more sophisticated, resulting in the loss of passwords and login information on a regular basis. If your passwords fall into the wrong hands, this may be highly inconvenient, and it can even result in the loss of money or sensitive personal information.
Unfortunately, the majority of stolen passwords are simple and easy to guess. Names, birthdays, hobbies, and favorite pets don't make good passwords, and using them is a recipe for disaster.
Password generators come very handy in this situation.
For personal or corporate usage, the best password generators make it simple to create strong passwords that are difficult to guess or crack.

Define the coding work by importing tkinter
The tkinter.ttk module gives the user access to the Tk widget set and allows the user to import Combobox. 
A combobox is a graphical user interface component that combines a drop-down box, list box, or allows the user to select input.

```Python
from tkinter import *
from tkinter.ttk import Combobox
import random
```

A root window is created using the Tk class.
The Tk function assists in the creation of this GUI window and provides numerous options such as setting the title and the geometry of the GUI window.
The geometry() method is one of the many methods provided by Tkinter.
We'll be working on the backdrop color of the Tkinter GUI window in this line of code.

```Python
screen = Tk()
screen.title("Password Generator")
screen.geometry('600x400')
screen.configure(background ="bisque")
``` 

The global variable sc1 is defined in the line code below.
We used the set method on the sc1 in the lines of code below.
Set the value of sc1 to null. Then assign a null value to the passw variable. 
The length variable will retain the value of c1, and the value type of c1 will be integer. 
Now create a lowercase variable that will hold a string value. 
After that, create an uppercase variable to hold a string value.
And at the last line of code, we define the mix.

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
   
we define the if condition for assigning some condition in our project to monitor the strength of the passwords  generated on the password generator

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

Define the sc1 variable
In order to design the GUI window's section In this project, we'll use a Label, an Entry Box, and a Button.
On the GUI window, create a Label t1, where t1 is the name of the Label object.
We type the text on the label and then change the font and background of the label.
Using x or y coordinate values, assign the location of the t1 Label.
Create a label t2  and type the text and its background
Then set its coordinates.

```Python
sc1=StringVar('')
t1=Label(screen,text='Automatic Password Generator',font=('Arial',25),fg='red',background ="bisque")
t1.place(x=60,y=0)
t2=Label(screen,text='password:',font=('Arial',14),background ="bisque")
t2.place(x=145,y=90)
```

On the GUI window, define the Entry Box with the object il, set the font of il Entry, and let the text variable to store the string value of sc1. 
Now, use x and y coordinates to assign the location of the il Entry.
Define the Label t3 once more. Then, using coordinate values, assign it a location.
Create the t4 Label. Then, using the coordinates values, assign the location. Then, give Entry c1 a name.
Set the Combobox c2's values to Low Strength, Medium Strength, and High Strength.
The current function is used to set the c2 value.
Then, using x or y coordinate values, assign the location of the c2 Combobox.
Define b as a Button and use the generator command to conduct an action when the Button is clicked. 
Then we use x and y coordinates to assign the location of the b Button.
The mainloop() function is an infinite loop that is used to run the program.

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

Here is an image of the password generator interface.


![passwordimage](/engineering-education/introduction-to-gui-using-tkinter-in-python/password.png)

Congratulations on finishing this tutorial.

### Conclusion

We covered the fundamentals of GUI in this article, as well as how to build a simple calculator and how to build a password generator application in Python using Tkinter.

### Reference

[perlego](https://www.perlego.com/book/721869/python-gui-programming-with-tkinter-pdf)
[Python tkinker](https://medium.com/analytics-vidhya/python-tkinter-as-a-java-application-36536176fe83)



 



