---
layout: engineering-education
status: publish
published: true
url: /creating-an-application-using-beeware/
title: Creating an application using BeeWare
description: BeeWare is a Python library used to create cross-platform applications. This article will build a simple application using BeeWare.
author: john-kiguru
date: 2022-01-11T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/creating-an-application-using-beeware/hero.png
   alt: BeeWare Application Hero Image
---

BeeWare is a Python library used to create cross-platform applications. It serves as an alternative to other app-building libraries such as Kivy.
 <!--more-->
This article will build a simple application using BeeWare to introduce the readers to the library and appreciate how it works.

### Prerequisites
1. `Python` installed in your machine.
2. Install `beeware` and `toga`. Run `pip3 install beeware` and `pip3 install toga` to install them respectively.
3. Basic [Python](https://www.python.org/) knowledge.
4. A good internet connection.

### Getting started
This tutorial will create a simple calculator application.

Next, navigate into a folder of your choice using the terminal then execute the `briefcase new` command.

This command will create a new application in that folder. Follow the instructions and input the required details or repeatedly press enter to go with the default configurations.

The new app should have the following structure:

```bash
.
├── LICENSE
├── pyproject.toml
├── README.rst
└── src
    ├── simplecalculator
    │   ├── app.py
    │   ├── __init__.py
    │   ├── __main__.py
    │   └── resources
    │       ├── __init__.py
    │       ├── simplecalculator.icns
    │       ├── simplecalculator.ico
    │       └── simplecalculator.png
    └── simplecalculator.dist-info
        ├── INSTALLER
        └── METADATA
```

The `src` folder has files required for the applications to run. All the logic for running the application is found in the `app.py`. The `app.py` should look as follows:

```python
import toga
from toga.style import Pack
from toga.style.pack import COLUMN, ROW

class SimpleCalculator(toga.App):
    def startup(self):
        main_box = toga.Box()
        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = main_box
        self.main_window.show()

def main():
    return SimpleCalculator()
```

The file begins by importing the `toga` toolkit. `Toga` is a Python native cross-platform Graphical User Interface(GUI) toolkit.

Next, define a class `SimpleCalculator` that contains a `startup` method. This method defines a `toga box` component. It serves as the main box.

The name `main_box` is declared and initialized by default when you create the application but may be changed later as desired.

Declare the main window whose title is the app's name defined when creating the app with the ` briefcase new` command.

Next, we have the application show our window containing our empty main box as its content. Finally, define a `main` function that returns our `SimpleCalculator` class instance. This `main` method is called and invoked by the `__main__.py` file.

By now, you have a simple working application. You can change the directory into `Simple Calculator` and type `briefcase dev` to run the app in developer mode. You should have the following simple application:

![Starter app image](/engineering-education/creating-an-application-using-beeware/starter.png)


### Setting up the boxes
Modify the `app.py` file to create our final calculator application step by step. Start by defining all the necessary box components required. Modify the `app.py` file as follows:

```python
import toga
from toga.style import Pack
from toga.style.pack import COLUMN, ROW
from functools import partial

class SimpleCalculator(toga.App):

    def startup(self):
        box1 = toga.Box()
        box2 = toga.Box()
        box3 = toga.Box()
        box4 = toga.Box()
        box5 = toga.Box()
        box6 = toga.Box()

        main = toga.Box()

        # adding in main box
        main.add(box1)
        main.add(box2)
        main.add(box3)
        main.add(box4)
        main.add(box5)
        main.add(box6)
        main.style.update(direction=COLUMN)

        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = main
        self.main_window.show()

def main():
    return SimpleCalculator()

```

We have created six minor boxes and one main box with all the six boxes inside. We have the main box as a column box, meaning it will have all width by default unless defined, and height will expand according to the content within the box.

In the next section, we will have each box contain numbers and operators, apart from two which will have an input field and a calculate button, respectively. When you run the application, you will not see any changes.

### Putting up the buttons
Now set up the numbers, operators, and calculate buttons. We will also have a box for an input text. Edit the `app.py` to appear as follows:

```python
"""
Simple calculator
"""
from functools import partial

import toga
from toga.style import Pack
from toga.style.pack import COLUMN, ROW


class SimpleCalculator(toga.App):

    def startup(self):
        box1 = toga.Box()
        box2 = toga.Box()
        box3 = toga.Box()
        box4 = toga.Box()
        box5 = toga.Box()
        box6 = toga.Box()

        main = toga.Box()

        self.input_text = toga.TextInput()
        self.input_text.style.width = 200
        self.input_text.style.padding_left = 10

        button7 = toga.Button('7', on_press=partial(self.enterdata, number='7'))
        button7.style.padding_top = 20
        button7.style.padding_left = 10

        button8 = toga.Button('8', on_press=partial(self.enterdata, number='8'))
        button8.style.padding_top = 20

        button9 = toga.Button('9', on_press=partial(self.enterdata, number='9'))
        button9.style.padding_top = 20

        buttonplus = toga.Button('+', on_press=partial(self.enterdata, number='+'))
        buttonplus.style.padding_top = 20

        button4 = toga.Button('4', on_press=partial(self.enterdata, number='4'))
        button4.style.padding_left = 10

        button5 = toga.Button('5', on_press=partial(self.enterdata, number='5'))

        button6 = toga.Button('6', on_press=partial(self.enterdata, number='6'))

        buttonminus = toga.Button('-', on_press=partial(self.enterdata, number='-'))

        button1 = toga.Button('1', on_press=partial(self.enterdata, number='1'))
        button1.style.padding_left = 10

        button2 = toga.Button('2', on_press=partial(self.enterdata, number='2'))

        button3 = toga.Button('3', on_press=partial(self.enterdata, number='3'))

        buttonmultiply = toga.Button('×', on_press=partial(self.enterdata, number='*'))

        buttondot = toga.Button('.', on_press=partial(self.enterdata, number='.'))
        buttondot.style.padding_left = 10

        button0 = toga.Button('0', on_press=partial(self.enterdata, number='0'))

        buttonclear = toga.Button('C', on_press=partial(self.enterdata, number='C'))

        buttondivide = toga.Button('÷', on_press=partial(self.enterdata, number='/'))

        calculate = toga.Button('CALCULATE', on_press=self.calculate)
        calculate.style.width = 150
        calculate.style.padding_top = 30
        calculate.style.padding_left = 30

        # adding
        box1.add(self.input_text)

        box2.add(calculate)

        box3.add(button7)
        box3.add(button8)
        box3.add(button9)
        box3.add(buttonplus)

        box4.add(button4)
        box4.add(button5)
        box4.add(button6)
        box4.add(buttonminus)

        box5.add(button1)
        box5.add(button2)
        box5.add(button3)
        box5.add(buttonmultiply)

        box6.add(buttondot)
        box6.add(button0)
        box6.add(buttonclear)
        box6.add(buttondivide)

        # adding in main box
        main.add(box1)
        main.add(box2)
        main.add(box3)
        main.add(box4)
        main.add(box5)
        main.add(box6)

        main.style.update(direction=COLUMN)

        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = main
        self.main_window.show()

    def enterdata(self, widget, number):
        if (number == "C"):
            self.input_text.value = ""
        else:
            self.input_text.value = self.input_text.value + number

    def calculate(self, widget):
        output = eval(self.input_text.value)
        self.input_text.value = output


def main():
    return SimpleCalculator()

```

We have defined all the necessary buttons required to make our application. Each button is a toga button with some having a little padding to the top or left or both.

There is a callback method `on_press` defined within the same buttons. We make use of a class-defined function `enterdata` that takes a number or an operand such as `+`, `-`, `*`, `÷`, `.` and `C`. and appends it to the input value.

Then, we use the `partial` built-in function in Python that takes a function and some inputs pre-filled to return a fully-filled function. Our partial function takes our `enterdata` function and a number value to the final parameter to the function. When pressed, a `CALCULATE` button also calls the `calculate` function.

The `calculate` function takes our expression evaluated by the `enterdata` function and produces a result using Python's in-built function `eval`. The `eval` function takes an expression as input and returns the expression result as output.

We added our buttons to the different boxes defined earlier. We began by adding the input text to `box1`. Next, we added the `CALCULATE` button to the `box2` then added ` 7`, `8`, ` 9`, and `plus` buttons to `box3`. Finally, we added buttons 4,5,6, and minus to `box4`. Then, all the necessary buttons are added similarly.

When we finally run our application, we have the following output:
![Final App](/engineering-education/creating-an-application-using-beeware/final.png)

### Conclusion
At this point, you have a simple working calculator built using BeeWare running in developer mode.

However, if you wish to have your application running on a mobile phone, you should visit [BeeWare Documentation](https://docs.beeware.org/en/latest/) for instructions. The documentation also contains detailed information on how `beeware` works using `toga`.

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
