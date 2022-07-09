---
layout: engineering-education
status: publish
published: true
url: /pathlib-vs-os-modules-for-file-and-directory-system-operation/
title: Pathlib Vs OS Modules for File and Directory System Operations
description: In this article, we will look at what OS and Pathlib modules are, where and how to use them for file system operations.
author: akenz-michael
date: 2022-02-23T00:00:00-03:11
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/pathlib-vs-os-modules-for-file-and-directory-system-operation/hero.jpg
    alt: Pathlib Vs OS Modules for File and Directory System Operations Example Image
---
In this tutorial, we will run through different viable contexts to discover an agreeable decision to utilize Python's Pathlib and OS packages for file system operations.
<!--more-->
We will learn about various file system operations - not limited to writing and reading a file, describing document information, renaming files, creating directories, and so on.

### Pre-requisites
To follow along with this tutorial, you will need to have some basic knowledge of the Python programming language.

### Goals
By the end of this tutorial, the reader must be able to:
- Utilize Pathlib and OS modules to manipulate a file and a directory path.
- Implement object-oriented programming and functional programming in file system operation.
- Convert a file's metadata to basic readable information.
- Manipulate relative path and absolute path.
- Understand the scenario where OS and Pathlib modules can independently fit in.

### Table of contents
- [Introduction](#introduction)
  - [OS module](#os-module)
  - [Pathlib module](#pathlib-module)
- [Difference between OS and Pathlib modules](#difference-between-os-and-pathlib-modules)
- [Theoretical differences between Pathlib and OS](#theoretical-differences-between-pathlib-and-os)
- [Conclusion](#conclusion)

### Introduction
File system operation can be characterized as a technique that can be used to control or construct files and directories.

There are two different ways to work with file systems, using:
1. Functional dependencies.
2. Object-oriented concepts.

This tutorial practically highlights the different scenarios to differentiate between [Pathlib](https://docs.python.org/3/library/pathlib.html) and [OS](https://docs.python.org/3/library/os.html) modules.

#### OS module
The OS (operating system) module is a Python-based operating system interface that functionally renders a convenient way to work with files and directories with a simple function call.

Additionally, the OS module empowers us to deal with I/O tasks straight-forward.

#### Pathlib module
The Pathlib module is an object-oriented file system that offers classes representing file system paths with semantics that fit various operating systems.

### Difference between OS and Pathlib modules
In this section, we will practically illustrate the semantic differences between Pathlib and OS modules using comparable code snippets to help you determine where every module fit in.

Before you begin with, let's import the libraries as shown:
```python
import os
from pathlib import Path
```

#### Query the current path using OS and Pathlib
TO query the current working directory is a basic task when you are dealing with a path.

With these libraries, you can fetch relative paths and absolute paths.

An absolute path gives a full description of the current location that you are working, while a relative path refers to a location that is relative to the current working directory.

> Note: Querying the current path using OS and Pathlib will return an absolute path.

##### Query the current path using OS
```python
import os
print(os.getcwd())
```

**Output:**

```bash
C:\Users\DELL\Desktop\practical_folder
```

The output returns a string representation of the absolute current path that you are working on.

> Note that, your output will look different (will contain forward slash `/`), if you are not using Windows OS.

##### Query the current path using Pathlib
```python
from pathlib import Path
print(Path().cwd())
```

**Output:**

```bash
WindowsPath('C:/Users/DELL/Desktop/practical_folder')
```

In this example, the output returns one of the two respective path module subclasses' instances of the current location you are working:
- It returns a windows object if you are using Windows.
- It returns a POSIX path object if you are using any POSIX operating system like Linux and macOS.

However, we can convert this object to a string as shown:
```python
from pathlib import Path
print(str(Path().cwd()))
```

The in-built string function will help you convert the path object to a string.

**Output:**

```bash
'C:\\Users\\DELL\\Desktop\\practical_folder'
```

> Notice the `\\` and `/` in the previous 2 outputs.

#### Navigate to the home directory
Helps navigate easily to the home directory from your current directory.

##### Using OS module to navigate to the home directory
Navigating to the user's home directory path using the OS module requires us to pass a string representation of these components `~` and `~user` as an argument.

```python
from os import path
print(path.expanduser('~'))
```

**Output:**

```bash
C:\Users\DELL
```

You can read more about it [here](https://docs.python.org/3/library/os.path.html#module-os.path).

##### Using Pathlib module to navigate to the home directory
```python
from pathlib import Path
print(Path().home())
```

**Output:**

```bash
WindowsPath('C:/Users/DELL')
```

The example illustrates that the `Path().home()` function returns an object representation of the path which may be converted to a string value.

#### List a directory path content
In this section, we will outline the files/directories in the current directory, the parent directory, and a given directory.

##### Using OS module to list the current directory
```python
import os
print(os.listdir())
```

**Output:**

```bash
['.ipynb_checkpoints', 'Untitled.ipynb']
```

This example returns a list of objects containing files and folders in the given or current directory.

You can also list a previous directory or current directory an example will be demonstrated in the next snippet.

To outline the items in the previous directory requires you to pass two dots string as an argument which is simply known as relative path pattern.

```python
import os
print(os.listdir('..'))
```

**Output:**

```bash
['.idea',
 'Anaconda3-2021.05-Windows-x86_64.exe',
 'Apps and Questions',
 'vector.lnk',
 'Visual Studio Code.lnk',
 'WPS Office.lnk',
 'WPS PDF.lnk']
```

In this example, the function returns a list containing the files and directories' names in a string representation.

##### Using Pathlib module to list a directory content
Using Pathlib module to outline items in a given directory is somehow not as straightforward compared to the previous example in the OS module.

Let's consider the following example:

```python
from pathlib import Path
print(Path().iterdir())
```

**Output:**

```bash
<generator object Path.iterdir at 0x0000017A030A7120>
```

In this example, the function returns an iterator object wrapped in a generator function alongside the heap memory address. To outline the items in the iterator object we can basically iterate through the iterator object or choose the other way round by converting it to a list object.

For this situation, let's convert it to a list object.

```python
from pathlib import Path
print(list(Path().iterdir()))
```

**Output:**

```bash
[WindowsPath('.ipynb_checkpoints'), WindowsPath('Untitled.ipynb')]
```

This example illustrates that there are two items in the given directory.

Pathlib also accepts two dots string as an argument that can be passed through the constructor to iterate through the prompt parent directory.

```python
from pathlib import Path
print(list(Path('..').iterdir()))
```

**Output:**

```bash
[WindowsPath('../.idea'),
 WindowsPath('../Anaconda3-2021.05-Windows-x86_64.exe'),
 WindowsPath('../Apps and Questions'),
 WindowsPath('../vector.lnk'),
 WindowsPath('../Visual Studio Code.lnk'),
 WindowsPath('../WPS Office.lnk'),
 WindowsPath('../WPS PDF.lnk')]
```

The output is the list of the files and directories in the prompt parent directory that are in my Desktop directory.

However, pathlib alternatively provides `Path.glob()` to list files and directories in a given or current directory, and this method requires a string argument to perform a specific task.

#### Utilize glob method to outline a relative directory path
The glob method can be used to carry out relative pattern matching files in the directory represented by the given path.

```python
from pathlib import Path
print(list(Path('..').glob('*')))
```

In this example, the asterisk passed to the `glob('*')` method instructs the method to list all the items in the given directory.

**Output:**

```bash
[WindowsPath('../.idea'),
 WindowsPath('../Anaconda3-2021.05-Windows-x86_64.exe'),
 WindowsPath('../Apps and Questions'),
 WindowsPath('../vector.lnk'),
 WindowsPath('../Visual Studio Code.lnk'),
 WindowsPath('../WPS Office.lnk'),
 WindowsPath('../WPS PDF.lnk')]
```

The output covered the list of the items in the given directory.

To outline a specific pattern of a file with `Path.glob()` method, we follow the below commands:

```python
from pathlib import Path
print(list(Path('..').glob('*.lnk')))
```

**Output:**

```bash
[WindowsPath('../vector.lnk'),
 WindowsPath('../Visual Studio Code.lnk'),
 WindowsPath('../WPS Office.lnk')]
```

It returns all the files that end with the given pattern. Pathlib module also provides `PurePath.suffix()`method to perform the same operation without having to necessarily convert it to a list.

#### Create a directory and file
In some situations, you may need to automatically create a directory or file whenever you are writing a Python script. In that case, we will utilize this opportunity to semantically illustrate how we can create a file or directory in python.

##### Create a file using OS module
```python
import os

os.mknod('script.py')
print(os.listdir())
```

The `os.mknod()` function helps you create a file. If the file already exists, it will raise a `FileExistError` exception which can be handled using `try-except`.

> Note: The `os.mknod()` function is only available on a Unix type operating system.

**Output:**

```bash
['script.py', 'main.py']
```

##### Create a file using pathlib
```python
from pathlib import Path

Path('new_script.py', exist_ok=True).touch()
print(list(Path('').iterdir()))
```

Pathlib provides the `Path.touch()` method for both POSIX and Windows operating systems, just like the `os.mknod()` function.

This method creates a file while returning nothing, which means we need to iterate through the current directory to confirm whether the file has been created or not.

Confirming the file creation with `Path.touch()` is a much easier and more efficient method.

**Output:**

```bash
[WindowsPath('.ipynb_checkpoints'),
 WindowsPath('new_script.py'),
 WindowsPath('Untitled.ipynb')]
```

##### Create a new directory using OS
```python
import os
os.mkdir('Document')
```

##### Create a new directing using pathlib
```python
from pathlib import Path
print(Path('Movie').mkdir(exist_ok=True))
```

If the directory already exists, a `FileExistError` will be raised. However, you can simply pass the `exist_ok=True` argument to handle `FileExistError` exception.

#### Check for an existing file or directory
We can check if a file already exists by navigating to the path manually, but to make it easier and avoid manual checking, we may use OS and Pathlib to verify the existence.

##### Check for a directory using OS module
```python
import os
print(os.path.exists('Movie'))
```

Depending on whether the directory already exists or not the return value is going to be a boolean value.

**Output:**

```bash
True
```

##### Check for a directory using Pathlib
```python
from pathlib import Path
print(Path('Document').exists())
```

**Output:**

```bash
True
```

It returns `True` since the directory exists. If not, it would return `False`.

#### Rename a directory and file
We can rename a file or directory using both OS and Pathlib modules.

##### Rename a directory using OS module
```python
import os
os.rename("Movie", "NewMovie")
```

The function returns void, and the directory name is renamed to the given name (second parameter).

If you iterate through the current directory or confirm using the `os.exists()` function, you will notice that the directory has been renamed.

##### Rename a directory using Pathlib module
```python
from pathlib import Path

target = Path('Data')
current =Path('Document')
print(Path.rename(current, target))
```

The `Path.rename()` method of class `Path` only takes a path object that's the reason you would not be able to pass a string as an argument if you had tried it, also there is an alternative way you can rename a file or a directory using pathlib. We will try this in the next example.

**Output:**

```bash
WindowsPath('Data')
```

This method returns a WindowsPath object containing the new name of the directory.

An alternative way to rename a file or directory using pathlib is:

```python
from pathlib import Path

target = Path('data_script.py')
current = Path('new_script.py')
print(current.rename(target))
```
**Output:**

```bash
WindowsPath('data_script.py')
```

This method returns a path object containing the new name of the file.

#### Join path components together
OS and Pathlib modules provide methods/functions to join two directory paths together.

##### Join paths together with OS module
```python
import os

current_path = os.getcwd()
print(os.path.join(current_path, 'data_script.py'))
```

**Output:**

```bash
'C:\\Users\\DELL\\Desktop\\practical_folder\\data_script.py'
```

The `os.path.join()` function gives you the ability to join two components together by concatenating both the strings.

The result is a concatenated string.

##### Join paths together using pathlib module
Class `Purepath` of pathlib module provides the capability to join two components together.

```python
from pathlib import Path, PurePath
print(PurePath.joinpath(Path().cwd(),'Data'))
```

**Output:**

```bash
WindowsPath('C:/Users/DELL/Desktop/practical_folder/Data')
```

> Note: The `PurePath.joinpath()` method expects a path object as the first argument, and a string as the second argument. The method doesn't check whether the path given as the second argument exists or not.

Pathlib provides an alternative way to join various components together using a forward-slash `/` operator.

To join paths, we use the forward-slash operator with a `PurePath` object in the numerator along with the string in the denominator as shown:

```python
from pathlib import PurePath, Path

path = PurePath(str(Path().cwd()))
print(path / 'Data')
```

**Output:**

```bash
PureWindowsPath('C:/Users/DELL/Desktop/practical_folder/Data')
```

It returns one of the direct subclass of the class `PurePath` containing the combined components.

To append several strings to the existing path, follow the commands as shown:

```python
from pathlib import PurePath

path = PurePath('old')
print(path / 'new' / 'script.py')
```

**Output:**

```bash
PureWindowsPath('old/new/script.py')
```

#### Query path to retrieve the current working directory
Either we use pathlib or OS module to query a path to fetch the current working directory, which returns a string representation of the final file or directory name.

##### Using OS module
```python
import os
print(os.path.basename(os.getcwd()))
```

**Output:**

```bash
'practical_folder'
```

In this example, the result of the function returns the basename of the current directory with a string representation.

##### Using pathlib module
```python
from pathlib import PurePath, Path
print(PurePath(Path().cwd() / 'data_script.py').name)
```

The class `PurePath` expects a path object or string to be passed via its constructor, so we just combined a file name with the current directory to avoid the typing stress, also to save us from calling the `PurePath.joinpath()` method.

**Output:**

```bash
'data_script.py'
```

The result is the string representation of the final component and this component is always a file.

#### Remove a directory
OS and Pathlib modules provides a method or function that conditionally deletes a directory.

The condition expresses that attempting to delete a directory that is not empty will lead to an error, and this basically implies you can't remove an occupied directory.

To do that, you can use the `os.remove()` function provided by OS module or `Path.unlink()` method provided by Pathlib module to remove a file or directory.

> If a non-existent directory is attempted to be removed, an `IsADirectoryError` exception will be raised. Similarly, if a non-existent file is removed, a ` FileNotFoundError` exception will be raised.

##### Remove file or directory with OS module
```python
import os

first_dir = 'Data'
print(f'Does "{first_dir}" exist? \n', 'Yes!' if os.path.exists(first_dir) else 'No!')
os.rmdir(first_dir)
print(f'\nAfter deleting "{first_dir}".\n')
print(f'Does "{first_dir}" exist? \n', 'Yes!' if os.path.exists(first_dir) else 'No!')
```

Additionally, we utilized the `os.path.exists()` function in the `print()` statement to confirm whether the directory gets removed.

If the directory successfully gets deleted, the response will be `Yes` else the response will be `No`. And, if the directory doesn't exist, a `FileExistError` exception will be raised.

**Output:**

```bash
Does "Data" exist?
Yes!
After deleting "Data".
Does "Data" exist?
No!
```

##### Remove file or directory with pathlib module
```python
from pathlib import Path

second_dir = 'NewMovie'
print(f'Does "{second_dir}" exist? \n', 'Yes!' if Path(second_dir).exists() else 'No!')
Path(second_dir).rmdir()
print(f'\nAfter deleting "{second_dir}".\n')
print(f'Does "{second_dir}" exist? \n', 'Yes!' if Path(second_dir).exists() else 'No!')
```

**Output:**

```bash
Does "NewMovie" exist?
Yes!
After deleting "NewMovie".
Does "NewMovie" exist?
No!
```

#### Retrieve and convert a file information
In this section, we will use the `time` and `datetime` modules to convert and interpret a given file's information.

##### Using OS module to retrieve information
OS module provides three functions that can be used to query file information notwithstanding we will be using the most comprehensive one in this tutorial:

```python
import os

note_file = os.stat('Untitled.ipynb')
print(f'Size = {note_file.st_size}\nlast time accessed = {note_file.st_atime}\nlast time modified = {note_file.st_mtime}\ncreation time = {note_file.st_ctime}')
```

**Output:**

```bash
Size = 5694
last time accessed = 1642186406.360829
last time modified = 1642186405.3119907
creation time = 1641623379.0384889
```

In the example above, we queried the corresponding attributes to get their distinguished state representing the file's metadata.

- `st_size` contains the file size in bytes.
- `st_atime` contains the date of the most recent access to the given file in seconds.
- `st_mtime` attribute contains the file last modified date in seconds.
- `st_ctime` attribute respond differently on UNIX and Windows operating system. In Windows, it outputs the creation date, while for UNIX it outputs the updated date.
- `st_birthtime` to query the creation time on UNIX operating system.

###### Convert the information using datetime module
Converting the file's time and date with `datetime` module makes the output readable for us.

```python
from datetime import datetime
import os

note_file = os.stat('Untitled.ipynb')
last_accessed = datetime.fromtimestamp(note_file.st_atime)
last_modified = datetime.fromtimestamp(note_file.st_mtime)
creation_date = datetime.fromtimestamp(note_file.st_ctime)
print(f'last time accessesd: {last_accessed}\nlast time modified: {last_modified}\ncreation time: {creation_date}')
```

**Output:**

```bash
last time accessesd: 2022-01-14 21:15:26.361177
last time modified: 2022-01-14 21:15:25.322196
creation time: 2022-01-08 07:29:39.038489
```

###### Convert the information using time module
Time module is not commonly used to convert date and time information about a file.

```python
import os, time

note_file = os.stat('Untitled.ipynb')
last_accessed = time.ctime(note_file.st_atime)
last_modified = time.ctime(note_file.st_mtime)
creation_date = time.ctime(note_file.st_ctime)
print(f'last time accessesd: {last_accessed}\nlast time modified: {last_modified}\ncreation time: {creation_date}')
```

**Output:**

```bash
last time accessesd: Fri Jan 14 21:17:26 2022
last time modified: Fri Jan 14 21:17:25 2022
creation time: Sat Jan 8 07:29:39 2022
```

##### Using pathlib module to query information
Pathlib module provides `Path.stat()` method to retrieve information about a given file which returns a `os.stat_result` object containing the information about a given file.

```python
from pathlib import Path

recent_script = Path('new_script.ipynb').stat()
print(f'Size = {recent_script.st_size}\nlast time accesed = {recent_script.st_atime}\nlast time modified = {recent_script.st_mtime}\ncreation time = {recent_script.st_ctime}')
```

**Output:**

```bash
Size = 72
last time accessed = 1642193846.365352
last time modified = 1642193544.1581955
creation time = 1642193544.1562355
```

> You can convert the date and time to readable format by following the above 2 topics on format conversion.

##### Query file extension
Pathlib and OS module provides a function or method that allows us to query a file extension.

##### Using OS module to query file extension
The OS module provides the `os.path.splitext()` function to query the file extension. It splits the path into pairs that return both the file name and the file extension.

```python
import os
print(os.path.splitext('Untitled.ipynb'))
```

**Output:**

```bash
('Untitled', '.ipynb')
```

##### Using pathlib module to query file extension
Pathlib provides two attributes to split a file extension and file name. These attributes are `Path.suffix` and `Path.stem`.

The `Path.suffix` is used to split a file and retrieve the file extension, while `Path.stem` is used to split a file to retrieve the file name.

```python
from pathlib import Path

file = Path('new_script.ipynb')
print(f'File name: {file.stem}\nFile extension: {file.suffix}')
```

**Output:**

```bash
File name: new_script
File extension: .ipynb
```

> Note: The `Path.suffix` attribute will retrieve an empty string if a given file doesn't have an extension.

### Theoretical differences between Pathlib and OS modules
Illustrating the theoretical differences between OS and Pathlib modules.

#### OS module
- It provides a submodule named `path` to manipulate common pathname and offers direct functions to perform I/O activity.
- Its basic functions mostly return a string representation.
- It provides different functions that can perform additional operations on environment variables like setting an environment, removing an environment, and more operations.

#### Pathlib module
- It offers distinguished classes to perform explicit system operations on various operating systems which clearly expresses that the pathlib module isn't portable.
- The methods usually return system-compatible objects like PurePathPosix, PosixPath, PurePathWindows, and WindowsPath.
- Listing the contents of a directory is a tedious task since it returns a generator that needs to be iterated to output readable strings.
- The path class in pathlib provides a method to create a permanent empty file with a different extension which makes working with file system operation mind-boggling in python.
- It doesn't make any arrangement for environment variables operation.

### Conclusion
At this point, you should have the edge difference between OS and Pathlib modules. Also, you would have learned the following:
- Good decision-making when choosing the right module for file system operations.
- How to work with file system operation.
- Removing a file.
- Identify the difference between relative path and absolute path.
- Conversion of file date properties using time and datetime modules.
- How to work with a path on a distinguished operating system.
- Retrieving specific file information.

Thanks for reading!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
