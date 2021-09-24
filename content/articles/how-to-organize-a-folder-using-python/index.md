### How To Organize a Folder Using Python
### Introduction
If you find yourself reading this article there is a high possibility that you've got files all over your desktop, or your download folder is unorganized since all downloaded files are stored there, this can be fixed using python.
Python is a high-level programming language designed to be easy to read and simple to implement. In this guide, we will see how to write a python script we can run anytime we want to organize any folder on our computer.

### Prerequisite
To understand this guide it's assumed that the reader has an understanding of basic python programming concepts such as;
- Data types
- Variables
- strings
- Flow control statement and
- loops

### Goal
In this guide, we will write a python script that will move files to a particular folder base on the [filename extension](). At the end of this guide, we will have a function that will move files to different folders by taking a source directory and a destination directory as parameters. 

### functions in python
Don't Repeat Your self(DRY), is a very important principle in programming, the DRY principle helps in reducing the repetition of software patterns by referring back to a single source or "snippet" which is mostly achieved by using the concept of functions. 

A Function is a group or a block of code that performs a particular task arranged in such a way that it is reusable. the code snippet below shows how to write a function.
```python
def nameoffunction(parameters):
    code
    return statement
```
from the above snippet, `def` or define is the keyword used to declare a function. `parameters` are the information the function code will act upon. `code` is the code that performs the task the function represents. `return statement` returns the output the function is giving.

### Os Module
The OS module is one of python's standard utility modules used to interact with the operating system. The OS module can be used to change a current working directory, create or delete a directory folder, get the contents in a directory e.t.c. 

### Shutil Module
The shutil module is also one of python's standard utility modules used to interact with files and their collections. It can be used to copy files from a source directory to a destination directory. it can also be used to remove files and directories.

### Moving a file from one folder to another
To move folders with python create a new project file and name it app.py then import the two modules mentioned above as shown below.
```python
import os, shutil
```
after importing the modules, create two folders or directories on your desktop with names ***file1*** and ***file2***. Create a file with the name *stt.txt* and save it into ***file2*** then update your code with the snippet below.

```python
source_dir = 'C:\\Users\\User\\Desktop\\file2'
destination_dir = 'C:\\Users\\User\\Desktop\\file1'

files = os.listdir(source_dir)

for f in files:
    shutil.move(os.path.join(source_dir, f), destination_dir)
```
from the code snippet above we saved the path to ***file2*** where our *stt.txt* file is located in a variable named **source_dir** and saved the path to ***file1*** where we will be moving the *stt.txt* file to as **destination_dir**.
> NOTE: in the file path `C:\\Users\\User\\Desktop\\file1`, *User*  is the name of your system user, Yours will be the name you set as your system user. A double backslash(`\\`) or single slash(`\`) will work depending on your operating system, use a forward slash(`/`) if the backslash does not work for you.

The code `os.listdir(source_dir)` saved in the **files** variable is listing the files inside the source directory.

From the code snippet `shutil.move(os.path.join(source_dir, f)`, `os.path.join` is combining the **source** file path and the file which is from the for loop iterating through the **files** in the **source_dir**. `shutil.move` is moving the file from **source_dir** to the **destination_dir**. After updating your code run the below command to execute your code.
```
python app.py
```
### Moving multiple files Using a Function
Start with creating a new file or clearing the previous `app.py` file. And paste in the code snippet below 
```python
import shutil, os

def file_manager(file_source_dir, file_destination_dir):
    source_dir = file_source_dir
    destination_dir = file_destination_dir


    file_names = os.listdir(source_dir)

    for file_name in file_names:
        if os.path.join(source_dir, file_name).endswith('.mp3'):
            shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'audios'))

        if os.path.join(source_dir, file_name).endswith('.mp4'):
            shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'videos'))

        if os.path.join(source_dir, file_name).endswith('.zip'):
            shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'zip'))

        if os.path.join(source_dir, file_name).endswith('.geojson'):
            shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'audios'))

        if os.path.join(source_dir, file_name).endswith('.pdf'):
            shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'pdf'))

        if os.path.join(source_dir, file_name).endswith('.jpg'):
            shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'pictures'))

        if os.path.join(source_dir, file_name).endswith('.png'):
            shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'pictures'))

        return "Success!!!!!"



file_manager('C:\\Users\\User\\Downloads', 'C:\\Users\\User\\Downloads')

```
In the code above we define a function with the name `file_manager` with a parameter *file_source_dir* which will take the source directory and *file_destination_dir* which will take the destination directory, **file_names** save the list of files in the source directory just like the previous code. 

The snippet `if os.path.join(source_dir, file_name).endswith('.mp3')`, is a conditional statement which checks if a file's name ends with `.mp3` file extension, the conditional statement helps move multiple files if they meet certain conditions. 

From the snippet `shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'audios'))`, *os.path.join(source_dir, file_name)*, joins the **source_dir** and the **file_name** just like the previouse code. *os.path.join(destination_dir, 'audios')* is joining the destination folder with the specific folder to store a particular type of file base on thier file extension. 

e.g the code above is checking for a file with the extension `.mp3`, which will move the file to a destination folder that contains another folder prepared for that type of file which is `audios` for mp3 files.

The same process was repeated for the other file extensions. At the end of the function we returned a string `success!!!!` and called the function with arguments *'C:\\Users\\User\\Downloads'* for *source_dir* and *'C:\\Users\\User\\Downloads'* for the *distination_dir* using the snippet  `file_manager('C:\\Users\\User\\Downloads', 'C:\\Users\\User\\Downloads')`. When you execute the code, it will scan through the download folder and move the files that meet the condition to the various folders as shown in the demo below. 
[]()

> Note: the destination_dir is the same as the source_dir because the destination folder is inside the source_dir. 

### Conclusion
We were able to write a function that moves files from one folder to the other, which takes the directory that contains files we want to move and a directory we want to move files to as parameters.

 

