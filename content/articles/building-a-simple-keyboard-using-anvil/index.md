Anvil is a free and open-source drag and drop web app builder. It is equivalent to the likes of Gradio application. The framework uses Python only. No HTML, no CSS, and Javascript. This tutorial will leverage this framework to build a functional keyboard similar to the one on your computer. 

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
To get started, we will begin by navigating to the [Anvil](https://anvil.works/) website. On the top-right corner of the webpage, you will see a `Start Building` button. Click on it. You will be prompted to create an account before you can start building. This sign up process is free. A verification email will be sent to your email to complete the sign up process. Once the verification is completed, you should be redirected to the login page and the following webpage will apear:

![Main Page](/engineering-education/building-a-simple-keyboard-using-anvil/main-webpage.png)

*Image Source: [Anvil](https://anvil.works/)*

Select the `New Blank App` option. Since we are planning to start from sratch and create a custom HTML page, we'll select the `Custom HTML` option. Additionally, we can select the `Blank Panel` option. At this point, your webpage should look like this:

![Blank Page](/engineering-education/building-a-simple-keyboard-using-anvil/blankpanel-webpage.png)

*Image Source: [Anvil](https://anvil.works/)*

Now, we can begin designing our interface.

### Creating the components needed for a keyboard
With Anvil, we can drag in whichever component we will like to use in the interface itself. For example, if we want to add a `Date Picker` component, we will drag and drop the `Date Picker` component from the sidebar into our interface. You can also set some basic properties of this component by scrolling down on the sidebar until you see the `properties` option. 

One of the most important components in a keyboard is the input fields. For this, we will drag and drop the `TextBox` component. We will drag and drop it below the image component with our logo.

Next, we will add our buttons. A keyboard has several buttons. It will make more sense to code them rather than drag and drop all these buttons.

### Creating a panel to replicate how a keyboard appears
On our main interface, we have both the `Design` and the `Code` option available. Select the `Code` option. You will see some basic commands already written for you by the web app builder. You will see a class with an `init` method to intialize the web app. We will build up on this code. We will begin by crating a list of characters to represent our buttons and store it in a variable known as `chars`. We will assign this variable to a list of strings where we arrange these strings in the exact same order that we want to see our buttons appear on the page.

This is shown below:

```python
chars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", 
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "-",
        "A", "S", "D", "F", "G", "H", "J", "K", "L", "*",
        "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"  
]
```
This simple keyboard design consists of letters in capital letters, numbers and punctuation marks. It also consists of `+, -, *, /` signs to perform arithmetic. 
The first row, `"1", "2", "3", "4", "5", "6", "7", "8", "9", "0"` represents the first row on the keyboard and so forth.

The next step involves looping over these strings and use them to create button components. For this, we will need to create an empty dictionary to store these buttons. We will call this dictionary, `self.btn`. We will assign it to a set of curly brackets, which is an empty dictionary as shown:

```python
self.btn = {}
```
Additionally, since we want to arrange these buttons in rows and columns, we will need a grid. We will create a `GridPanel` in camel case and assign it to a variable called `gridp` as shown:

```python
gridp = GridPanel()
```
Now, we can place our buttons inside this panel.

```python
for i in chars:
    self.btn[i] = Button(text=i)
    gridp.add_component(self.btn[i], row = 'A', col_xs = 3, width_xs = 2)

self.add_component(gridp)
```
> The letter `i` represents different buttons.

We can now go ahead and run this code. You can find the `Run` button in the top most section of the webpage. You will be prompted to assign your application a name. Assign it any name you wish. We've assign ours `Simple_Keyboard`. The created webpage should now appear.

As at this point, the components should be displayed on the screen. But, they are all over the place. They are not arranged. We will need to arrange them nicely. We will do that later. For now, let's take care of their functionalities.

### Implementing the different button callbacks
The goal is to collect the value of the button that we click. We can easily do this using a `tag` property as shown:

```python
self.btn[i].tag.name = i 
```
Thereafter, we can access it using a click event. Let's create a click method and connect it to all of our buttons. We will write this method at the button of our current code block, outside of the `init` method.

```python
def click(self, **event_args):
    event_args.['sender'].tag.name
```

### Testing the functionality of the keyboard

### Styling the keyboard

### Publishing the web app

### Wrapping up
We have used graphic design tools to create our web application. But this is not the only way. We can also add them into the interface using code as shown in this tutorial. Feel free to try creating one yourself, you could play around with the different components available that suits your project.

Happy coding!

### Further reading
[Anvil](https://anvil.works/)