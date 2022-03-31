---
layout: engineering-education
status: publish
published: true
url: /introduction-to-automation-pyautogui/
title: Introduction to Automation using PyAutoGUI 
description: In this article, we will discuss how to build a simple automation task using PyAutoFUI.
author: naomi-bitutu
date: 2021-11-19T00:00:00-06:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/introduction-to-automation-pyautogui/hero.jpg
   alt: Introduction to Automation PyAutoGUI example image
---
Doing the same repetitive tasks can be a bit boring. Automating such activities can save us much time and help us to be productive in other areas. 
<!--more-->
We can achieve the automation process with a Python library known as PyAutoGUI. To learn more about PyAutoGUI, click [here](https://pyautogui.readthedocs.io/en/latest/).

In this article, we are going to take a look at a simple automation task. 

It involves launching Google Chrome, clicking on the search bar, typing a YouTube url, searching for a video (in this case, a snap), and clicking on it to play. We will then minimize the browser window. 

### Prerequisites
To follow along in this article, you need to:
- Install Python on your machine. To download Python, click [here](https://www.python.org/downloads/).
- Have a code editor, preferably VS code.
- Have a browser installed in your machine, preferably Google Chrome.

### Goal
By the end of this article, you should be able to:
- Automate mouse movements and clicks.
- Automate keyboard key presses.
- Automate typing into a textbox.

### Setting up our project
To get started, create a folder named **Automating Basic Tasks**. 

Navigate into this folder and create a file named `automation.py`. We are using the `.py` file extension because it's a Python file.

Finally, open the file with your code editor.

In this case, we are using VS Code.

Launch the VS Code integrated terminal and type in the following command:

```bash
py -m pip install pyautogui
```

The above command is used to install PyAutoGUI on windows. To install for a different OS, click [here](https://pyautogui.readthedocs.io/en/latest/install.html) to learn more.

> **Disclaimer:** In this article, I have used coordinates that correspond to my screen size. 

To follow along with this article, you need to use the `MouseInfo` Python library to determine the correct coordinates that correspond to the position that you want to perform the automation operations. 

Adjust the duration of the time it takes to perform an action according to your internet speed. 

Using a short duration on a slow internet connection may lead to errors since the page will not have fully loaded.

### Getting coordinates
PyAutoGUI uses the screen coordinates to determine the exact position to perform actions such as clicking, typing, scrolling, pressing, and dragging.

MouseInfo is a module that comes with the PyAutoGUI library. You need to write and run the code below in a separate file:

```python
import pyautogui

pyautogui.mouseInfo()
```

**Code explanation:**

- `import pyautogui` - This line of code is used to import the PyAutoGUI library into our project.

`pyautogui.mouseInfo()` - We use this command to retrieve the point's x,y coordinates on the screen.

When you run the above code, it will display a dialog box that shows the point's x and y coordinates where the cursor is positioned. 

If you want to get the coordinates of another point on the screen, move the cursor to that point, and it will show you the coordinates. 

As you move the cursor from one point to another on the screen, you will notice that coordinates increase as you move away from the top-left corner. 

This is because the pixel at the top-left corner is at coordinates (0,0) which makes it the origin.

It is important to know how x and y coordinates represent moving vertically and moving horizontally respectively. This is because the coordinates are measured in pixels.

Having learned the basics, we can now start working on the automation task.

Add the following code in a `.py` file:

```python
import pyautogui
import time
time.sleep(2)
pyautogui.moveTo(69,750)
pyautogui.click(69,750,duration=1)
pyautogui.write('Chrome')
pyautogui.moveTo(478,363,duration=1)
pyautogui.click(478,363,duration=1)
pyautogui.moveTo(177,58,duration=1)
pyautogui.click(177,58,duration=1)
pyautogui.write('https://www.youtube.com/')
pyautogui.press('enter')
pyautogui.moveTo(458,135,duration=2)
pyautogui.click(458,135,duration=2)
pyautogui.write('perfect strangers')
pyautogui.press('Enter')
pyautogui.moveTo(763,222,duration=3)
pyautogui.click(763,222,duration=3)
pyautogui.moveTo(1253,27,duration=3)
pyautogui.click(1253,27,duration=3)
```

On the first line of this code, `import pyautogui`, we import PyAutoGUI to automate python scripts.

This helps us use our keyboard and mouse without physically being in contact with those devices.

The next line of code, `import time`, is used to import the time module into our project. 

We use the `time` module to work with time-related functions like setting the delays and the duration an operation should take before it executes.

`time.sleep(2)` this line of code sets the delay time to 2 seconds. This gives us enough time to move from VS Code to our search bar to search for Chrome.

`pyautogui.moveTo()` function automatically moves the cursor from one point to another as specified by the x,y coordinates passed as arguments. 

When we pass `69`, `750` as x and y coordinates, our cursor moves from its current position to the point (69, 750). 

You can optionally pass duration as the third argument for this particular function. For example, `pyautogui.moveTo(69, 750, duration=1)`. Here, we have set the duration to one second. 

This means the cursor will take one second to move from its current position to the specified point. If you want the movement to be instantaneous, you do not have to pass duration as the third argument.

`pyautogui.click(69, 750, duration=1)` function is used to automate mouse clicks. It has three arguments passed to it, the x, y coordinates and the duration. 

Here, we are instructing our mouse to click at point (69, 750) after one second. So after our mouse moved to the search bar, which we have specified by those coordinates, it will click on it.

The mouse has three options for clicking; the left, middle, and right mouse buttons. Therefore, Yyou have to specify which button to press

The left mouse button is usually the default one. For example, `pyautogui.click(50,890,button='right')`. This code performs a right-click at point (50, 890). 

You can also perform a double click using `pyautogui.doubleClick()` function.

`pyautogui.write('Chrome')` is a keyboard function used to automate typing. It automatically types the string argument you pass to it. 

However, you should first click on the exact place where you want that string to be written using the `pyautogui.click()` function. 

We are passing 'Chrome' as its argument because we want the search bar to search for Chrome.

After searching Chrome, we move the cursor to launch Chrome using `pyautogui.moveTo(478,363,duration=1)`.

After moving the cursor to where open Chrome is, we need to click on it to open. We do this by entering this code,`pyautogui.click(478,363,duration=1)`.

We then move the cursor to Chrome's address bar to enter the YouTube URL using `pyautogui.moveTo(177,58,duration=1)` method.

After moving the cursor, we click on the address bar to activate it for typing operation. We do this by using `pyautogui.click(177,58,duration=1)`.

Now we can go ahead and perform our write operation using the following code, `pyautogui.write('https://www.youtube.com/')`.

We then automate the keyboard press functionality to press on the `Enter` key to search for YouTube. This is made possible by using `pyautogui.press('enter')`.

After YouTube loads, we move the cursor to its search bar using this line of code, `pyautogui.moveTo(458,135,duration=2)`.

We should click on that particular search bar for us to perform a write operation. Type in `pyautogui.click(458,135,duration=2)` to enable this functionality.

 Use this code to type `pyautogui.write('perfect strangers')` into the YouTube search bar. This will search for 'perfect strangers'.

For the search to happen, you have to click `enter` using `pyautogui.press('Enter')` method.

After searching and bringing the results, we need to move the cursor to click on the search items that we want. The move operation is made possible by this code, `pyautogui.moveTo(763,222,duration=3)`.

We need to click on the view for the song to play. We do so using `pyautogui.click(763,222,duration=3)` function.

The final step of this automation is to minimize the YouTube window. Again, you use this code, `pyautogui.moveTo(1253,27,duration=3)`, to move the cursor to the position of the minimize button.

Lastly, perform the minimize operation by clicking the minimize button using this code, `pyautogui.click(1253,27,duration=3)`.

Some of the errors that can arise in this automation include:
- The mouse moving everywhere at a terrific speed.
- The keyboard virtually strikes keys at multiple impulses.

To recover from these issues, you can do the following:

- Use the PyAutoGUI fail-safe feature. PYAUTOGUI has a `10<sup>th</sup>` of a second delay after execution. When you slide the cursor to one of the four corners of the screen, Py AutoGUI will raise a fail-safe exception.

- In the worst-case scenario, you will have to log out. You can do so by pressing a combination of keys, CTRL+ALT+DEL, for Unix and Microsoft users.

### Conclusion
The above code shows a simple mouse and keyboard automation using the PyAutoGUI library. 

You can modify the above code and use it to automate your daily repetitive tasks.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)