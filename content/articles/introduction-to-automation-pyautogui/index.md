---
layout: engineering-education
status: publish
published: true
url: /introduction-to-automation-pyautogui/
title: Introduction to Automation Using PyAutoGUI 
description: In this article, we are going to take a look at a simple automation task that involves opening Google Chrome, click on the address search bar, typing the URL to YouTube, searching for a video and playing the video.
author: raphael-mbindyo
date: 2021-11-06T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  -url: /engineering-education/introduction-to-automation-pyautogui/hero.jpg
   alt: Introduction to Automation PyAutoGUI example image
---

 
Doing the same repetitive tasks daily can be a bit boring. Automating those tasks can save us much time and help us be productive in other areas. We can achieve the automation process with a Python library known as PyAutoGUI. To learn more about PyAutoGUI, click [here](https://pyautogui.readthedocs.io/en/latest/).

In this article, we are going to take a look at a simple automation task that involves opening Google Chrome, clicking on the address search bar, typing the URL to YouTube, searching for a video(in this case, a snap), clicking on it to play and finally minimizing the Google Chrome window. 


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
To get started:
- Create a folder named **Automating Basic Tasks**.
- Open the folder and create a file named `automation.py` We are using the `.py` file extension because it's a python file.
- Open the file with your code editor.

In this case, we are using VS Code.

Launch the VS Code integrated terminal and type in the following command:

```bash
py -m pip install pyautogui
```

The above command is used to install PyAutoGUI on windows. To install for a different OS, click [here](https://pyautogui.readthedocs.io/en/latest/install.html) and find the instructions.

> **Disclaimer:** In this article, I have used coordinates that correspond to my screen size and the positions of the specific points where items I want to perform the automation operations are located. To follow along with this article, you need to use the MouseInfo Python library to get the correct coordinates that
correspond to the position that you want to perform any of these automation operations. 

> Adjust the duration of the time it takes to perform an action that suits your internet speed. Using short duration when on a slow internet connection may lead to clicking an unintended point as the page will not have fully loaded.

### Getting the Coordinates
PyAutoGUI uses the screen coordinates to get the exact position to perform various actions like clicking, typing, scrolling, pressing, and dragging.

MouseInfo is a module that comes with the PyAutoGUI library. You need to write and run the code below in a separate file in that,
do not include it in the code that we will use during the automation task. 

```python
import pyautogui

pyautogui.mouseInfo()
```

**Code explanation:**
- `import pyautogui` - This line of code is used to import the PyAutoGUI library into our project.

`pyautogui.mouseInfo()` - We use this command to get the point's x,y coordinates on the screen.

Run the above code. It will display a dialog box that displays the point's x and y coordinates where the cursor is positioned. If you want to get the coordinates of another point on the screen, move the cursor to that point, and it will give you the coordinates. As you move the cursor from one point to another on the screen, you will notice that coordinates increase as you move away from the top-left corner. This is because the pixel at the top-left corner is at coordinates (0,0) which makes it the origin.

It is important to know how x,y coordinates represent moving vertically and moving horizontally, respectively. This is because the coordinates are measured in pixels.

Having learned the basics, we can now go right ahead and start working on our automation task.
Type in the code below, and afterwards, we will go through it line by line explaining it.

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

The next line of code, `import time` is used to import the time module into our project. We will use it to work with time-related functions like setting the delays and the duration an operation should take before it executes.

`time.sleep(2)` this line of code sets the delay time to 2 seconds. This gives us enough time to move from VS Code to our search bar to search for Chrome.

`pyautogui.moveTo()` function automatically moves the cursor from one point to another specified by the x,y coordinates passed as arguments. In our task, our x,y coordinates are 69,750, respectively. When we pass 69,750 as x,y coordinates, our cursor moves from its current position to the point (69,750). You can optionally pass duration as the third argument for this particular function. For example, `pyautogui.moveTo(69,750,duration=1)`. Here, we have set the duration to one second. This means the cursor will take one second to move from its current position to the specified point. If you want the movement to be instantaneous, you do not have to pass duration as the third argument as we have done in our automation code.

`pyautogui.click(69,750,duration=1)`.This function is used to automate mouse clicks. It has three arguments passed to it, the x,y coordinates respectively and duration. Here, we are instructing our mouse to click at point (69,750) after one second. So after our mouse moved from where it was to our search bar, which we have specified by those coordinates, it then clicked on the search bar.

The mouse has three options for clicking; the left, middle, and right mouse buttons. You have to specify if you want to press the middle and right mouse buttons since the left mouse button is the default one.For example, `pyautogui.click(50,890,button='right')`. This code performs a right-click at point (50,890). 

You can also perform a double click by entering this code `pyautogui.doubleClick()`.

`pyautogui.write('Chrome')` this code is a keyboard function used to automate typing. It automatically types the string argument you pass to it. You first have to click the exact place where you want that string to be written using the `pyautogui.click()` function. We are passing 'Chrome' as its argument because we want the search bar to search for Chrome.

After searching Chrome, we then move the cursor to open Chrome using this code, `pyautogui.moveTo(478,363,duration=1)`.

After moving the cursor to where open Chrome is, we need to click on it to open. We do this by entering this code,`pyautogui.click(478,363,duration=1)`.

We then move the cursor to Chrome's address bar to enter the YouTube URL using this code, `pyautogui.moveTo(177,58,duration=1)`.

After moving the cursor, we click on the address bar to activate the search bar for typing operation.We do this by using this code, `pyautogui.click(177,58,duration=1)`.

Now we can go ahead and perform our write operation using the following code, `pyautogui.write('https://www.youtube.com/')`.

We then automate the keyboard press functionality to press on the Enter key to search for youtube. This is made possible by using this code, `pyautogui.press('enter')`.

After youtube loads, we move the cursor to its search bar using this line of code, `pyautogui.moveTo(458,135,duration=2)`.

Then we need to click on that particular search bar for us to be able to perform a write operation.Type in this code to enable this, `pyautogui.click(458,135,duration=2)`.

 Use this code to type `pyautogui.write('perfect strangers')` into the YouTube search bar.This will search for 'perfect strangers' from youtube.

For the search to happen, you have to click enter. For example, the following line of code does this for us.`pyautogui.press('Enter')`.

Clicking enter prompts youtube to search for us. After searching and finding what we were searching for, we need to move the cursor to click on the search result we want.The move operation is made possible by this code, `pyautogui.moveTo(763,222,duration=3)`.

Next, we click on it for the song to play. Type the following code to achieve this,`pyautogui.click(763,222,duration=3)`.

The final step of this automation is to minimize the YouTube window. Again, you use this code, `pyautogui.moveTo(1253,27,duration=3)`, to move the cursor to the position of the minimize button.

Lastly, perform the minimize operation by clicking the minimize button using this code, `pyautogui.click(1253,27,duration=3)`.

It is important to know automation, but we should not forget that we might encounter errors that arise from this automation. Such as:
- The mouse moving everywhere at a terrific speed.
- The keyboard virtually strikes keys at multiple impulses uncontrollably.

To recover from this, you can do the following:

- Use the PYAUTOGUI fail-safe feature. PYAUTOGUI has a 10<sup>th</sup> of a second delay after execution, so you slide the cursor to one of the four corners of the screen. This makes PYAUTOGUI raise a Pyautogui fail-safe exception.

- In the worst-case scenario, you have to log out. You can log out by pressing a combination of keys, CTRL+ALT+DEL, for Unix and Microsoft users.


### Conclusion
The above code shows a simple mouse and keyboard automation using the PyAutoGUI library. Upon successfully running the above code, you can modify and use it to automate your daily repetitive tasks. Some of the tasks that can be automated

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

