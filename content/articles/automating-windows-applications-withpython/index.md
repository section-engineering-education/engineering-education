### Automating Windows Applications with Python
### Introduction
Performing repetitive tasks over and over again can be pretty boring and tiresome. Most humans like to be challenged and thereafter rewarded for complex tasks that make them grow in their skill set. This is where automation comes in. Automating repetitive tasks saves one precious time for other important things. Armed with a little knowledge in Python programming however one can have the computer automatically do these tasks for you efficiently and effectively.

In the windows platform, different tasks can be automated using Python scripts, these tasks include launching notepad, reading and writing data in an excel spreadsheet. To approach automation with Python you will need to understand what automation is, and what python is. Automation describes a variety of technologies that reduce human intervention in the process by determination of decision criteria, sub-process, related action, and how they are related. On the other hand, Python is a high-level versatile programming language with friendly, approachable syntax, and a tone of libraries that can be utilized in task automation. 

In this article, I will be demonstrating how to automate boring stuff in windows using the Pywinauto module. Pywinauto is a bundle of Python modules for automating the Microsoft Windows GUI(Graphic user interface). It allows you to send your input action to windows dialogue and control.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Installation of Pywinauto](#installation-ofpywinauto)
- [Automating notepad](#automating-notepad)
- [Automating Excel with Pywinauto](#automating-excel-with-pywinauto)
- [Python automation tools](#python-automation-tools)
- [Conclusion](#conclusion)


### Prerequisites
To follow along, the reader must have a good knowledge of [Python](https://www.python.org).


### Installation of Pywinauto
Command to install Pwinauto :
```python
pip install pywinauto 
```
To manually install pywinauto install the following python packages:
 - pyWin32
 - comtypes
 - six
 - pillow (for taking screenshots)
 - download the latest pywinauto from GitHub: https://github.com/pywinauto/pywinauto/releases
 - unpack and run `python setup.py install`

To validate yout installation run this code snippet below:
```python
from pywinauto.application import Application
app = Application(backend="uia").start("notepad.exe")
app.UntitledNotepad.type_keys("%FX")
```
This should start up your notepad application on the windows interface.
After this installation and validation, we will jump to notepad automation which is the simple technique, followed by excel automation where we will read data from a spreadsheet and write data to the excel cells.

### Automating notepad
This example will give us an insight into how pywinauto functions by looking at functionalities like starting an application, maximizing and minimizing the application, and writing text in a notepad application. To begin, let us first import the relevant fields and launch notepad using the start method of the application imported.

```python
from pywinauto import application
ap = application.Application ()
ap.start('Notepad.exe')
```
We then need to retrieve the top window of the notepad. This can be implemented by:
```py
ap.top_windoow ():
```
This returns the top window for all opened apps including the notepad app. W lets add some text on the opened notepad application. The message we intend to display is passed as a string in the text area inside the `type_key()` method.

```py
text_message = "Hello, this is a sample text for python automation"
dlg.typekeys(text_message, with_spaces = True)
```
We can use the `is_maximize ()` method to maximize the notepad window as in most cases when notepad is started its window is not in full screen always. 
```py
 if dlg.is_maximized () == False:
    dlg.maximize()
```
Output :
![Notepad](/automating-windows-applications-withpython/automating-notepad.jpg)

### Automating Excel with Pywinauto
Here we will learn how we can map and write data on excel files automatically. First, we commence by accessing the excel spreadsheet.
```python
program_path = r"C:Program Files (x86)Microsoft OfficerootOffice16EXCEL.exe"
file_path = r"C:Users\Desktop\mysample.xlsx"
```
We now open our `.xlsx` file through excel.exe.

```python
app = application.Application(backend= "uia"). start(r'{} "{}"'.format(program_path, file_path))
```

As we did with notepad, we must now choose the window mysample.xlxs that we need to deal with. Then print the results.
```python
print(app.windows())
```
Output:
```
[, , , ,]
```
We can either `select ()` index window or directly get it by passing the name.
```python
dlg = app['mysample.xlsx-Excel']
```
We will now read data automatically from an excel sheet and print it in a sentence.

![Excel](/automating-windows-applications-withpython/exel-1.jpg)

We have data entries in cell `A1`, `B1`, and `C1` hence the automation id of cell `A1` is `A1` and that of `D1` is `D1`. The code used to read the data and write the findings in a statement is:
```python
tXt = ""
for j in range 65, 65 + 5):
    ex_id = str (chr(j)) + str (1)
dlg.child_window(auto_id = ex_id).click_input()
ein = dlg.child_window(auto_id=ex_id)
ein.click_input()
txt+=(ein.legacy_properties()['Value'])
txt+=" "
print("Text read from mysample.xlsx is:",(txt))
```

Result :
```
The text read from mysample.xlsx is: student name admission number year of study
```

The automation id we making for each cell is inside the for loop, `dlg. child_window ()` is used to get specific elements where automation id is passed as a parameter. Then we do a mouse click to grab that element using `click input ()`. `legacy_properties()['value']` is then used to read data in the specific cell.
We will now write data in cell `A4`:

```python
write_data = "John Doe"
window = dlg.child_window(auto_id="A4")
window.click_input()
window.type_keys(write_data, with_spaces=True)
```
Output:
 ![Excel](/automating-windows-applications-withpython/exel2.jpg)

Here the string we need to write is `write_data`. We then grab the element and click on it using the click input. To write data in cell `A4` we use the `type_keys` method that takes two parameters, the string to be written, and check for spaces in the typed data.

### Python automation tools
Python has a variety of tools, libraries, and frameworks that will aid you in your coding journey. Below we will take a look at a few important tools for automating your computerized jobs.

####  Smtplib
The [smtplib](https://docs.python.org/3/library/smtplib.html) tool is an amazing resource for handling your emails. It utilizes the Simple Mail Transfer Protocol(SMTP), which is easily compatible with most major email providers, like Gmail. 

#### Selenium 
This package allows you to control the website browser activities from Python. You can read more about Selenium from the official documentation [here](https://selenium-python.readthedocs.io/)

#### Beautifull Soup
This module is used for obtaining data in HTML and XML files. You can read more about  Beautiful Soup from the official documentation [here](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

### Conclusion
In this tutorial we have learned what Pywinauto is, and how to automate both notepad and excel. We have also looked at a few Python automation tools like selenium,smtlib, etc. You can discover further about different concepts from [here](https://python-forum.io/thread-24253.html).





