
![heroimage](/engineering-education/introduction-to-gui-using-tkinter-in-python/hero.jpg)

### Introduction

The term GUI refers to a desktop application that allows programmers to communicate with computers and improves their experience of giving commands (command-line input) to code. They are used in desktop computers, notebook computers, and other electronic devices to perform a variety of tasks.

Programmers can learn how to build a basic Graphical User Interface (GUI) and a simple calculator using Tkinter in this tutorial.

### Table of content

- Prerequisites
- Tkinter
- What are Widgets?
- How to build a simple calculator
- How to build a password generator
- Conclusion

### Prerequisites

Download the latest version of [Python](https://www.python.org/ftp/python/3.9.2/python-3.9.2-macosx10.9.pkg) and install it.

Also download a python code editor more preferable [PyCharm](https://www.jetbrains.com/pycharm/download/download-thanks.html?platform=mac), it is student-oriented, friendly and easy to use.

### Tkinter

Tkinter is a platform that is included with Python. Tkinter has several advantages. Because the code is cross-platform, they can run it on Windows, Mac OS X, and Linux. Tkinter applications appear to be native to the platform on which they are running because visual elements are created using native operating system elements.

### What are widgets?

Widgets are the building blocks of graphical user interface programming, and they are used to viewing data or solicit input from the user. Here are a few examples of commonly used widgets.

`Frame`: The Frame widget is a container widget that organizes and borders other widgets.

`Label`: The Label widget is used to display text on the screen.

`Button`: The button widget can contain text and can perform an action when clicked.

`Entry`: The Entry widget displays a single-line text field for accepting user input.

`Text`: A Text entry widget allows you to enter text in multiple lines.

### How to build a simple calculator

```Python
 
# import everything from tkinter module

from tkinter import *
 
# Declare the expression variable

expression = ""
 
 
def press(num):

# point out the global expression variable

    global expression
 
# concatenation of string

    expression = expression + str(num)
 
# update the expression by using the set method

    equation.set(expression)
 
 
# def function to evaluate the final expression

def equalpress():

# use  the Try and Except statement
# to handle zero errors, division errors, etc.
 
    try:
 
        global expression
 
# evaluate function evaluates the expression
# and str function convert the  result to a string

        total = str(eval(expression))
 
        equation.set(total)
 
# initialze the expression variable using an empty string

        expression = ""
 
    
    except:
 
        equation.set(" error ")
        expression = ""
 
 
# def function to clear the contents

def clear():
    global expression
    expression = ""
    equation.set("")
 
 
# Driver code

if __name__ == "__main__":

# create a GUI root window

    gui = Tk()
 
# set the background colour of GUI window

    gui.configure(background="light green")
 
# set the title of GUI window

    gui.title("Simple Calculator")
 
# set the configuration of GUI window

    gui.geometry("270x150")

    
    equation = StringVar()
 
# create the text entry box for showing the expression.

    expression_field = Entry(gui, textvariable=equation)
 
# grid method is used for placing the widgets at respective positions
# in table like structure.

    expression_field.grid(columnspan=4, ipadx=70)
 
# create the Buttons

    button1 = Button(gui, text=' 1 ', fg='black', bg='red',
                    command=lambda: press(1), height=1, width=7)
    button1.grid(row=2, column=0)
 
    button2 = Button(gui, text=' 2 ', fg='black', bg='red',
                    command=lambda: press(2), height=1, width=7)
    button2.grid(row=2, column=1)
 
    button3 = Button(gui, text=' 3 ', fg='black', bg='red',
                    command=lambda: press(3), height=1, width=7)
    button3.grid(row=2, column=2)
 
    button4 = Button(gui, text=' 4 ', fg='black', bg='red',
                    command=lambda: press(4), height=1, width=7)
    button4.grid(row=3, column=0)
 
    button5 = Button(gui, text=' 5 ', fg='black', bg='red',
                    command=lambda: press(5), height=1, width=7)
    button5.grid(row=3, column=1)
 
    button6 = Button(gui, text=' 6 ', fg='black', bg='red',
                    command=lambda: press(6), height=1, width=7)
    button6.grid(row=3, column=2)
 
    button7 = Button(gui, text=' 7 ', fg='black', bg='red',
                    command=lambda: press(7), height=1, width=7)
    button7.grid(row=4, column=0)
 
    button8 = Button(gui, text=' 8 ', fg='black', bg='red',
                    command=lambda: press(8), height=1, width=7)
    button8.grid(row=4, column=1)
 
    button9 = Button(gui, text=' 9 ', fg='black', bg='red',
                    command=lambda: press(9), height=1, width=7)
    button9.grid(row=4, column=2)
 
    button0 = Button(gui, text=' 0 ', fg='black', bg='red',
                    command=lambda: press(0), height=1, width=7)
    button0.grid(row=5, column=0)
 
    plus = Button(gui, text=' + ', fg='black', bg='red',
                command=lambda: press("+"), height=1, width=7)
    plus.grid(row=2, column=3)
 
    minus = Button(gui, text=' - ', fg='black', bg='red',
                command=lambda: press("-"), height=1, width=7)
    minus.grid(row=3, column=3)
 
    multiply = Button(gui, text=' * ', fg='black', bg='red',
                    command=lambda: press("*"), height=1, width=7)
    multiply.grid(row=4, column=3)
 
    divide = Button(gui, text=' / ', fg='black', bg='red',
                    command=lambda: press("/"), height=1, width=7)
    divide.grid(row=5, column=3)
 
    equal = Button(gui, text=' = ', fg='black', bg='red',
                command=equalpress, height=1, width=7)
    equal.grid(row=5, column=2)
 
    clear = Button(gui, text='Clear', fg='black', bg='red',
                command=clear, height=1, width=7)
    clear.grid(row=5, column='1')
 
    Decimal= Button(gui, text='.', fg='black', bg='red',
                    command=lambda: press('.'), height=1, width=7)
    Decimal.grid(row=6, column=0)
    
# Finally start the GUI

    gui.mainloop()
   ```

Here is an image of the interface on the home screen.

![calculatorimage](/engineering-education/introduction-to-gui-using-tkinter-in-python/calculator.png)

### how to build a password generator
A password generator is a program that creates passwords depending on the rules you select in order to build a strong, unpredictable password for your accounts. The Password Generator program generates a unique and random password for users, assisting them in creating a strong password with increased security.

```Python

# define coding work

from tkinter import *
from tkinter.ttk import Combobox
import random

# create a root window()
#create the titele of the project and the background colour

screen = Tk()
screen.title("Password Generator")
screen.geometry('600x400')
screen.configure(background ="bisque")

# define a function for the global varaiable sc1

def gen():
   global sc1
   sc1.set("")
   passw=""
   length=int(c1.get())
   lowercase='abcdefghijklmnopqrstuvwxyz'
   uppercase='ABCDEFGHIJKLMNOPQRSTUVWXYZ'+lowercase
   mixs='0123456789'+lowercase+uppercase+'@#$%&*'
   
 # define the if function to assign some conditions to the project

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

# Here we define a Label t1 on the GUI window
# where t1 is the name of the Label object.
# Here we write the text on the label and set the font

sc1=StringVar('')
t1=Label(screen,text='Automatic Password Generator',font=('Arial',25),fg='red',background ="bisque")
t1.place(x=60,y=0)
t2=Label(screen,text='password:',font=('Arial',14),background ="bisque")
t2.place(x=145,y=90)

# Here define the Entry Box with the object il on the GUI window
# set the font of il Entry
# the text variable holds the string value of sc1.
# assign the place of the il Entry using x or y coordinates values.


il=Entry(screen,font=('Arial',14),textvariable=sc1)
il.place(x=270,y=90)
t3=Label(screen,text='Length: ',font=('Arial',14),background ="bisque")
t3.place(x=145,y=120)

t4=Label(screen,text='Strength:',font=('Arial',14),background ="bisque")
t4.place(x=145,y=155)

c1=Entry(screen,font=('Arial',14),width=10)
c1.place(x=230,y=120)

# define combobox c2
# define the values of combobox from high strength, medium strenght to low strenght
# then define the b Button on the GUI window 
#  give the gen command on the Button for performing an action  
# Th assign the place of the b Button using x or y coordinates value

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



 



