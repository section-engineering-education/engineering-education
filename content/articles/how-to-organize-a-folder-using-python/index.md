---
layout: engineering-education
status: publish
published: true
url: /how-to-organize-a-folder-using-python/
title: How to Organize a Folder using Python
description: This article will show a reader how to organize folders using a python script. It also explains how to move files to different folders by taking a source directory and a destination directory as parameters. 
author: nathaniel-dauda-musa
date: 2021-10-14T00:00:00-04:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-organize-a-folder-using-python/hero.jpg
    alt: How to Organize a Folder using Python Hero Image
---

If you find yourself reading this article, there is a high possibility that you have files all over your desktop, or your downloads folder is unorganized since all downloaded files are stored there. This can be fixed using python.
<!--more-->
Python is a high-level programming language designed to be easy to read and simple to implement. In this guide, we will see how to write a python script we can run anytime we want to organize folders on our computer.

### Prerequisites
To understand this guide, it's assumed that the reader has an understanding of basic python programming concepts such as;
- Data types
- Variables
- Strings
- Flow control statements
- Loops

### Goal
In this guide, we will write a python script that will move files to a particular folder based on the [filename extension](https://en.wikipedia.org/wiki/Filename_extension). At the end of this guide, we will have a function to move files to different folders by taking the source directory and a destination directory as parameters. 

### Functions in python
[Don't Repeat Yourself](https://dzone.com/articles/software-design-principles-dry-and-kiss) (DRY), is a fundamental principle in programming. The DRY principle helps in reducing the repetition of software patterns by referring back to a single source or "snippet" which is mainly achieved by using the concept of functions. 

A function is a group or a block of code that performs a particular task arranged so that it is reusable. Methods are also referred to as functions in python, but they are different. Let's look at the difference.

**Methods**: Methods are functions in a class that can only be accessed with an object or instance of a class.

**Function**: It is a function in itself that does not require an instance or object to access it because it does not belong to a class.

**Declaring a function**: A function can be defined with or without parameters (*parameters are values or properties in which a function acts upon*). The code snippet below shows how to write a function.

```python
# without parameters
def nameoffunction():
    code
    return statement

# with parameters
def nameoffunction(parameters):
    code
    return statement
```

From the above snippet, `def` or define is the keyword used to declare a function. `code` is the code that performs the task the function represents. `return statement` returns the output the function is giving.

**Calling a function**: Calling a function is also known as executing the function. We call a function with its name followed by a parenthesis that may or may not carry an argument (*an argument is the data representing the parameters given when declaring the function*) pending on whether the function has parenthesis. The code snippet below shows how to call a function.

```python
#without arguments
nameoffunction()

# with arguments 
nameoffunction(argument)
```

### The OS module
The OS module is one of python's standard utility modules used to interact with the operating system. The os module is made up of so many methods (functions) which can perform specific tasks, including:

- *Getting the working directory a user is* using the method as shown below:

```python
os.getcwd()
``` 
- *changing the current working directory* using the method as shown below:

```python
os.chdir()
```
- *listing folders and files* using the method as shown below:

```python
os.listdir()
```
- *Creating single and nested (a folder inside another folder) directories* using the method as shown below:

```python
# single directories
os.mkdir()
# nested directories
os.makedirs()
```
- *Removing single and nested directories* using the method as shown below:

```python
# single directories
os.rmdir()
# nested directories
os.removedirs()
```
To learn more about other functions, refer to this [documentation](https://docs.python.org/3/library/os.html).

### os.path module
*os.path* is a module in python used to process and manipulate file path (filename and directories) in a system. The *os.path* module can be used to:
- Return the name of a path using `os.path.dirname(file path)`. 
- Check the existence of any path in a system using `os.path.exists(file path)`
- Get the file size of a path in bytes using `os.path.getsize(file path)`
- Join path component using `os.path.join(path, *paths)` as we will see when moving multiple files from one directory to another.

### Shutil module
The `shutil` module is also one of python's standard utility modules used to interact with files and their collections. The shutil module can be used for varieties of functionalities which include:
- Copying files from one directory to another using `shutil.copyfile(source dir, destination dir,)`.
- Deleting entire directories using `shutil.rmtree(file path)`.
- Moving directories from one path to another using `shutil.move(source dir, destination dir, )`. To learn more about other functionalities, read this [documentation](https://docs.python.org/3/library/shutil.html).

### Moving a file from one folder to another
To move folders with python, create a new project file and name it `app.py`, then import the two modules mentioned above as shown below:

```python
import os, shutil
```
After importing the modules, create two folders or directories on your desktop with names **file1** and **file2**. Create a file with the name *stt.txt* and save it into **file2**, as shown:

![File 1](/engineering-education/how-to-organize-a-folder-using-python/file1.png)

![File 2](/engineering-education/how-to-organize-a-folder-using-python/file2.png)

Update your code with the snippet below:

```python
source_dir = 'C:\\Users\\User\\Desktop\\file2'
destination_dir = 'C:\\Users\\User\\Desktop\\file1'

files = os.listdir(source_dir)

for f in files:
    shutil.move(os.path.join(source_dir, f), destination_dir)
```
From the code snippet above, we saved the path to **file2** where our *stt.txt* file is located in a variable named **source_dir** and saved the path to **file1** where we will be moving the *stt.txt* file to as **destination_dir**.

> NOTE: in the file path `C:\\Users\\User\\Desktop\\file1`, *User*  is the name of your system user. Yours will be the name you set as your system user. A double backslash(`\\`) or single slash (`\`) will work depending on your operating system, use a forward slash(`/`) if the backslash does not work for you.

The code `os.listdir(source_dir)` saved in the **files** variable lists the files inside the source directory.

From the code snippet, `shutil.move(os.path.join(source_dir, f)`, `os.path.join` is combining the **source** file path and the file which is from the for loop iterating through the **files** in the **source_dir**. `shutil.move` is moving the file from **source_dir** to the **destination_dir**. After updating your code, run the command below to execute your code:

```python
python app.py
```
### Moving multiple files using a function
To move multiple files, start by creating a new file or clearing the previous `app.py` file, and paste in the code snippet below:

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
In the code above, we define a function with the name `file_manager` with a parameter *file_source_dir* which will take the source directory, and *file_destination_dir*, which will take the destination directory, **file_names**. Save the list of files in the source directory just like the previous code. 

The code snippet, `if os.path.join(source_dir, file_name).endswith('.mp3')`, is a conditional statement which checks if a file's name ends with `.mp3` file extension, the conditional statement helps move multiple files if they meet certain conditions. 

From the code snippet, `shutil.move(os.path.join(source_dir, file_name), os.path.join(destination_dir, 'audios'))`, *os.path.join(source_dir, file_name)*, joins the **source_dir** and the **file_name** just like the previouse code. *os.path.join(destination_dir, 'audios')* is joining the destination folder with the specific folder to store a particular type of file based on their file extension. 

For example, the code above is checking for a file with the extension `.mp3`, which will move the file to a destination folder that contains another folder prepared for that type of file which is `audios` for mp3 files.

The same process is repeated for the other file extensions. At the end of the function we returned a string `success!!!!`, and we call the function with arguments *'C:\\Users\\User\\Downloads'* for *source_dir*, and *'C:\\Users\\User\\Downloads'* for the *destination_dir* using the code snippet,  `file_manager('C:\\Users\\User\\Downloads', 'C:\\Users\\User\\Downloads')`. 

When you execute the code, it will scan through the download folder and move the files that meet the condition to the various folders, as shown in the video demo below:

![Demo](/engineering-education/how-to-organize-a-folder-using-python/demo.gif)

> Note: The `destination_dir` is the same as the `source_dir` because the destination folder is inside the `source_dir`. 

Please find the link to the repo [here](https://github.com/wobin1/file-management-with-python).

### Conclusion
We were able to write a function that moves files from one folder to the other, which takes the directory that contains files we want to move and a directory we want to move files to as parameters. 

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
