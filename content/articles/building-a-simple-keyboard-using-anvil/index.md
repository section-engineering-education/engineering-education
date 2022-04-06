---
layout: engineering-education
status: publish
published: true
url: /building-a-simple-keyboard-using-anvil/
title: Building a Simple Keyboard using Anvil
description: This tutorial will show our readers how to leverage Anvil to build a functional keyboard similar to the one on your computer.
author: willies-ogola
date: 2022-03-31T00:00:00-13:29
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-simple-keyboard-using-anvil/hero.png
    alt: Building a simple keyboard using Anvil Hero Image
---
Anvil is a free and open-source drag and drop web app builder. It is equivalent to the likes of Gradio application. The framework uses the Python programming language only. No HTML, no CSS, and no Javascript. 

<!--more-->

This tutorial will leverage this framework to build a functional keyboard similar to the one on your computer. 

### Prerequisites
To follow through with this tutorial, you need to be conversant with:
- The Python programming language.
- HTML, CSS, and Javascript programming languages.

### Outline
- [Creating a web page with Anvil](#creating-a-web-page-with-anvil)
- [Creating the components needed for a keyboard](#creating-the-components-needed-for-a-keyboard)
- [Creating a panel to replicate how a keyboard appears](#creating-a-panel-to-replicate-how-a-keyboard-appears)
- [Implementing the different button callbacks](#implementing-the-different-button-callbacks)
- [Testing the functionality of the keyboard](#testing-the-functionality-of-the-keyboard)
- [Styling the keyboard](#styling-the-keyboard)
- [Publishing the web app](#publishing-the-web-app)
- [Further reading](#further-reading)

### Creating a web page with Anvil
To get started, we will begin by navigating to the [Anvil](https://anvil.works/) website. On the top-right corner of the webpage, you will see a `Start Building` button. Click on it. You will be prompted to create an account before you can start building. This sign-up process is free. 

A verification email will be sent to your email to complete the sign-up process. Once you complete the verification process, you should be redirected to the login page, and the following webpage will appear:

![Main Page](/engineering-education/building-a-simple-keyboard-using-anvil/main-webpage.png)

*Image Source: [Anvil](https://anvil.works/)*

Select the `New Blank App` option. Since we plan to start from scratch and create a custom HTML page, we'll select the `Custom HTML` option. Additionally, we can select the `Blank Panel` option. At this point, your webpage should look like this:

![Blank Page](/engineering-education/building-a-simple-keyboard-using-anvil/blankpanel-webpage.png)

*Image Source: [Anvil](https://anvil.works/)*

Now, we can begin designing our interface.

### Creating the components needed for a keyboard
With Anvil, we can drag in whichever component we would like to use in the interface itself. For example, if we want to add a `Date Picker` component, we will drag and drop the `Date Picker` component from the sidebar into our interface. You can also set some basic properties of this component by scrolling down on the sidebar until you see the `properties` option. 

One of the most vital components of a keyboard is the input field. For this, we will drag and drop the `TextBox` component. Then, we will drag and drop it below the image component with our logo.

Next, we will add our buttons. A keyboard has several buttons. It will make more sense to code them rather than drag and drop all these buttons.

### Creating a panel to replicate how a keyboard appears
We have both the `Design` and the `Code` options on our main interface. Select the `Code` option. You will see some basic commands already written for you by the web app builder. You will see a class with an `init` method to initialize the web app. We will build upon this code. 

![Design Code](/engineering-education/building-a-simple-keyboard-using-anvil/design-code.png)

*Image Source: [Anvil](https://anvil.works/)*

We will begin by creating a list of characters to represent our buttons and store it in a variable known as `chars`. Next, we will assign this variable to a list of strings where we arrange these strings in the same order that we want to see our buttons appear on the page.

This is shown below:

```python
 chars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 
        ",", ".", "/", "-", "=", "+", "<--", "*", "Clr",     
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", 
        "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M" 
]
```
This simple keyboard design consists of letters in capital letters, numbers, and punctuation marks. It also consists of `+, -, *, /` signs to perform arithmetic. The first row, `"1", "2", "3", "4", "5", "6", "7", "8", "9", "0"` represents the first row on the keyboard and so forth.

The next step involves looping over these strings and using them to create button components. First, we will need to create an empty dictionary to store these buttons. We will call this dictionary `self.btn`. Then, we will assign it to a set of curly brackets, which is an empty dictionary as shown:

```python
self.btn = {}
```
Additionally, since we want to arrange these buttons in rows and columns, we need a grid. So we will create a `GridPanel` in camel case and assign it to a variable called `gridp` as shown:

```python
gridp = GridPanel()
```
Now, we can place our buttons inside this panel.

```python
for i in chars:
    self.btn[i] = Button(text=i)
    gridp.add_component(self.btn[i], row = 'A', col_xs = 1, width_xs = 1)

self.add_component(gridp)
```
> The letter `i` represents different buttons.

We can now go ahead and run this code. You can find the `Run` button in the topmost section of the webpage. You will be prompted to assign your application a name. Assign it any name you wish. We've assigned ours `Simple_Keyboard`. The created webpage should now appear.

![Simple keyboard](/engineering-education/building-a-simple-keyboard-using-anvil/simple-keyboard.png)

*Image Source: [Anvil](https://anvil.works/)*

At this point, the components should be displayed on the screen. But they are all over the place. They are not arranged. We will need to arrange them nicely. We will do that later. For now, let's take care of their functionalities.

### Implementing the different button callbacks
The goal is to collect the value of the button that we click. We can easily do this using a `tag` property as shown:

```python
self.btn[i].tag.name = i 
```
After that, we can access it using a click event. Let's create a click method and connect it to all our buttons. We will write this method at the button of our current code block, outside of the `init` method.

```python
def click(self, **event_args):
    print(event_args.['sender'].tag.name)
```

> We've temporarily added the `print()` method to test the keys outputs.

Right before we add our buttons to the grid, we will add the following commands to add the click event method:

```python
self.btn[i].set_event_handler('click', self.click) 
```

Click on `Run` to check if everything runs correctly and displays a pressed key as the output. Everything should work perfectly.

> Make sure to expand the output bar to see the messages.

Once our buttons output the correct characters, we can concatenate them to our text box. Instead of printing the results on the terminal, we can add the following code to the click method to print to the text box instead.

```python
def click(self, **event_args):
    self.text_box_1.text += event_args['sender'].tag.name
```
When you click on a button, it should now display on the text box. It works as expected. The more we press the buttons, the longer our text box length becomes.

We have some buttons that have some special functionality to them, especially when we are dealing with numbers and arithmetic operators. For example, the `Clear` and `Delete` signs.

Let's go back to our code and add these special functionalities.

### Testing the functionality of the keyboard
To make the code simpler to read, we will add the following code inside the click method, a new variable called `val`:

```python
 def click(self, **event_args):
    val = event_args['sender'].tag.name
    
    if val == "=":
      self.text_box_1.text = eval(self.text_box_1.text)
    elif val == "Clr":
      self.text_box_1.text = ""
    elif val == "<--":
      self.text_box_1.text = self.text_box_1.text[:-1]
    else:
      self.text_box_1.text += val
```
Perfect! Our special functionalities should now be working. Click on the `Run` button to try it out. Add some numbers and click on the equality sign to output the result. Also, you can press the backspace button to clear characters one by one and the `Clear` button to remove everything on the text box.

Now, our keyboard is functioning properly. Let's add some style to it.

### Styling the keyboard
We begin by splitting our buttons into four different rows. We will count nine buttons for this build then jump to the next row. The `enumerate()` method will help us with this. We will pass our list of characters into it. Enumerate returns two different values instead of one. So we will add an `idx` to help count.

Let's add the following block of code:

```python
for idx, i in enumerate(chars):
      if idx < 9:
        row = 'A'
      elif 9 <= idx < 18:
        row = 'B'
      elif 18 <= idx < 27:
        row = 'C'
      elif 27 <= idx <36:
        row = 'D'
      else:
        row = 'E'
```
After adding that new code block, run it to see if it works.

![Styling](/engineering-education/building-a-simple-keyboard-using-anvil/styling.jpg)

*Image Source: [Anvil](https://anvil.works/)*

We replace the `A` value in `row = 'A'`, with `row = row` in the code `gridp.add_component(self.btn[i], row = 'A', col_xs = 1, width_xs = 1)`, which is our local variable.

We can also style our buttons to make them prettier. For example, let's add the following code:

```python
self.btn[i] = Button(text=i, bold = True)
```
Let's also add the following code snippet:

```python
self.space = Spacer(height=400)
self.add_component(self.space)
```

### Publishing the web app
Once we are happy with our web application, we can deploy it. We need to press the `Publish this app` button to do this with Anvil. It will generate a code that you can use to view the published web application on your browser. For this application, you can view the published web application [here](https://F34TDJ5X5E2JIR24.anvil.app/KFJIOSVXZZTEGBPBINNMCT7I).

### Wrapping up
We have deployed our keyboard online. It is beautiful, and we can share it with anyone we like. We have used graphic design tools to create our web application. But this is not the only way. We can also add them to the interface using code, as shown in this tutorial. Feel free to try creating one yourself. You could play around with the different components available that suits your project.

Happy coding!

### Further reading
[Anvil](https://anvil.works/)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
