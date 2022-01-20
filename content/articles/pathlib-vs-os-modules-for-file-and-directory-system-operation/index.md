### Pathlib vs OS Modules for File and Directory System Operation
### Prerequisites
- Basic knowledge in Python programming language.
### Contents
- [Introduction](#introduction)
- [Os module](#os-module)
- [Pathlib module](#pathlib-module)
- [Theoretical difference between Pathlib and Os](#theoretical-difference-between-Pathlib-and-OS)
- [Practical difference between Os and Pathlib module](#practical-difference-between-OS-and-Pathlib-module)
- [Querying current path using os and pathlib](#querying-current-path-using-os-and-pathlib)
- [Navigating to home directory](#navigating-to-home-directory)
- [Listing directory content](#listing-directory-content)
- [Creating a directory and files](#creating-a-directory-and-files)
- [Checking for an existing file or directory](#checking-for-an-existing-file-or-directory)
- [Renaming a directory or file](#renaming-a-directory-or-file)
- [Joining path together utilizing Os and Pathlib module](#joining-path-together-utilizing-os-and-pathlib-module)
- [Querying path to retrieve a final file or directory name](#querying-path-to-retrieve-a-final-file-or-directory-name)
- [Removing a directory](#removing-a-directory)
- [Removing a file](#removing-a-file)
- [Retrieving and converting a file information](#retrieving-and-converting-a-file-information)
- [Querying a file extension](#querying-a-file-extension)
- [Wrapping Up](#wrapping-up)

### Introduction
File System Operation can be characterized as the example or technique that can be
used to control or construct files and directories and there are two different ways
of working with File System Operation, either utilizing functional dependency or utilizing
Object-Oriented. I will practically highlight the different situations to separate between
the two kinds of modules python provided for system operation. These modules are OS and Pathlib.

#### OS Module
The OS (operating system) module is a different operating system interface that functionally renders a convenient way
of working with files and directories with a simple function call, additionally,
OS empowers us to deal with I/O tasks straightforwardly.
#### Pathlib Module
The pathlib module is an Object-Oriented document framework activity that gives an order of just
one direct superclass "PurePath" which permits you to play out a computational activity yet, doesn't
give I/O activities, yet a substantial classpath that broadens PurePath and gives procedure on I/O.

### Theoretical difference between Pathlib and Os
The difference between Os and pathlib is theoretically addressed in this section.
#### OS
- It gives a submodule named path for manipulating common pathname, and
  It basically offers direct functions for performing I/O activity.
- It mostly renders the same functionality that utilizes the same interface irrespective of the operating system you are
  using in order to keep its portability.
- Its basic functions mostly return a string representation of a path.
- It provides a submodule for creating temporary files and directories.
- It provides a function that effectively lists directory content.
- It additionally provides a function that makes an empty file but unfortunately, it is just accessible on Unix nor on
  Windows in the meantime numerous engineers
  accept that it's impossible you create a file without calling the in-built function open for opening it first.
- It tends to be utilized to execute a file irrespective of the extension (e.g csv, pdf, mp3, and so on)
  but unfortunately, it only works on Windows operating except you use some other available module python recommends.
- It provides different functions that can perform additional operations on environment variables
  like setting an environment, removing an environment, and more operations.
- It provides a capacity that can copy a document.

#### Pathlib
- It gives high-level Path object for performing operations on pathname and class path has methods that enable the
  capacity of performing I/O activity which is much simpler and
  behaves like the in-built open function thus python documentation recommends.
- It offers distinguished classes for performing explicit system operations on various operating systems
  which clearly expresses that the pathlib module isn't portable.
- Its module objects' methods generally return system compatible objects (e.g PurePathPosix, PosixPath, PurePathWindows,
  and WindowsPath) which enables us to perform the additional operations.
- It doesn't give either article or strategy to making transitory records and catalogs.
- For listing a directory content when using pathlib is a tedious task because pathlib only provides method iterator
  of the class path for listing directory content which requires additional operation because method iterator returns an
  object representation.
  - Class path in pathlib provides a method for creating a permanent empty file with different extension which makes
    working with File System Operation mind-boggling in python.
- It can't be utilized to execute a document yet can open a record while composing or perusing a .txt document.
- It doesn't make any arrangement for environment variables operation.
- None of the available objects in pathlib makes a provision for making a duplicate file.

### Practical difference between OS and Pathlib module
In this section i will be illustrating the semantic differences between Pathlib and Os module, with comparable code
snippets to help you determine where every module fit in. I realized that there are many conducive differences which may
not be absolutely understood without seeing how it works, additionally, note that every demonstration requires the
importation of the two modules.

### Querying current path using os and pathlib
Querying the current working directory is a basic task when you are dealing with a path.  There are two unique types of
path which are relative path and absolute path.An absolute path gives a full description of the current location you are
working while a relative path refers to a location that is relative to the current working directory. Note querying the
current path using os and pathlib will return an absolute path.

Querying current path using os.
```python
import os

os.getcwd()
```
Output:
```output
C:\Users\DELL\Desktop\practical_folder
```
The output returns a string representation of the current path you are working, note your
output will be different and contains forward slash (/) if you are not using Windows os.

Querying current path using pathlib.
```python
from pathlib import Path

Path().cwd()
```
Output:
```output
WindowsPath('C:/Users/DELL/Desktop/practical_folder')
```
In this example, the output returns one of the two respective class path subclasses' instances of the
current location you are working. It returns a windows object if you are using Windows operating
system while it returns a posixpath object if you are using any posix operating system,
note because I'm using windows os your output might be not quite the same as mine if you are using posix os.
You can likewise convert this value to a string, let's attempt it:
```python
from pathlib import Path

str(Path().cwd())
```
The in-built string function will convert the path object to string.

Output:
```python
'C:\\Users\\DELL\\Desktop\\practical_folder'
```

### Navigating to home directory
Exploring the home directory gives you a simple opportunity to work straightforwardly with files or directories in the
home directory.
#### Using os module.
```python
from os import path

path.expanduser('~')
```
Output:
```python
C:\Users\DELL
```
#### Using pathlib module
```python
from pathlib import Path

Path().home()
```
Output:
```python
WindowsPath('C:/Users/DELL')
```

### Listing directory content
We will list out the files/directories in the current directory and previous parent directory or a given directory.

#### Using os module to list the current directory.
```python
import os

os.listdir()
```
Output:
```python
['.ipynb_checkpoints', 'Untitled.ipynb']
```
This returns a list object containing the names of files/directories in the given directories,
the output shows that I only have a folder, and a file in my current directory the 'Untitled.ipynb'
is the jupyter notebook file I'm currently using in writing the scripts.
You can also list a previous directory or current directory.

Listing the contents of the previous parent directory by passing a double dots string argument.
```python
import os

os.listdir('..')
```
Output:
```python
['.idea',
 'Anaconda3-2021.05-Windows-x86_64.exe',
 'Apps and Questions',
 'ArgoUML.lnk',
 'Databse Setup',
 'desktop.ini',
 'dztd.php',
 'Extra files',
 'Figma.lnk',
 'Intel-HD-Graphics-Driver_3PV49_WIN_20.19.15.5126_A11_02.EXE',
 'Postman.lnk',
 'practical_folder',
 'SET of CO',
 'setups',
 'Silicon Valley',
 'Slack.lnk',
 'Start Tor Browser.lnk',
 'todo-app',
 'Tor Browser',
 'vector.lnk',
 'Visual Studio Code.lnk',
 'WPS Office.lnk',
 'WPS PDF.lnk']
```
In this example, the function returns the files and directories accessible in the quick parent directory, and here's the
content of my Desktop directory you will see that Desktop is the prompt parent directory comprising the functioning
directory.

#### Using pathlib module to list a directory content.
```python
from pathlib import Path

Path().iterdir()
```
Output:
```python
<generator object Path.iterdir at 0x0000017A030A7120>
```
In this example, the strategy returns a generator object alongside the heap memory address
of the generator object, this is so useful don't be worried over it,
note that the generator item can be utilized to iterate through it or basically
convert it to a list object, for this situation, I will rather change it over to a list.

Converting the generator object to a list
```python
python
from pathlib import Path

list(Path().iterdir())
```

Output:
```
[WindowsPath('.ipynb_checkpoints'), WindowsPath('Untitled.ipynb')]
```
The output returns a list of WindowsPath object including the name of the file and directory in the directory.

Pathlib can also iterate through an immediate parent directory by passing two dots in a string format as an argument.
```python
from pathlib import Path

list(Path('..').iterdir())
```
Output:
```python
[WindowsPath('../.idea'),
 WindowsPath('../Anaconda3-2021.05-Windows-x86_64.exe'),
 WindowsPath('../Apps and Questions'),
 WindowsPath('../ArgoUML.lnk'),
 WindowsPath('../Databse Setup'),
 WindowsPath('../desktop.ini'),
 WindowsPath('../dztd.php'),
 WindowsPath('../Extra files'),
 WindowsPath('../Figma.lnk'),
 WindowsPath('../Intel-HD-Graphics-Driver_3PV49_WIN_20.19.15.5126_A11_02.EXE'),
 WindowsPath('../Postman.lnk'),
 WindowsPath('../practical_folder'),
 WindowsPath('../SET of CO'),
 WindowsPath('../setups'),
 WindowsPath('../Silicon Valley'),
 WindowsPath('../Slack.lnk'),
 WindowsPath('../Start Tor Browser.lnk'),
 WindowsPath('../todo-app'),
 WindowsPath('../Tor Browser'),
 WindowsPath('../vector.lnk'),
 WindowsPath('../Visual Studio Code.lnk'),
 WindowsPath('../WPS Office.lnk'),
 WindowsPath('../WPS PDF.lnk')]
```
Here's the list of the files and directories in the immediate parent directory which tends to be my Desktop
directory.

However, pathlib alternatively provides a method that can be utilized to list a specific or current directory and this
method is known as `Path.glob()`, the method can also be used to list files in a given relative pattern yielding all the
matching files.
```python
from pathlib import Path

list(Path('..').glob('*'))
```
Output:
```python
[WindowsPath('../.idea'),
 WindowsPath('../Anaconda3-2021.05-Windows-x86_64.exe'),
 WindowsPath('../Apps and Questions'),
 WindowsPath('../ArgoUML.lnk'),
 WindowsPath('../Databse Setup'),
 WindowsPath('../desktop.ini'),
 WindowsPath('../dztd.php'),
 WindowsPath('../Extra files'),
 WindowsPath('../Figma.lnk'),
 WindowsPath('../Intel-HD-Graphics-Driver_3PV49_WIN_20.19.15.5126_A11_02.EXE'),
 WindowsPath('../Postman.lnk'),
 WindowsPath('../practical_folder'),
 WindowsPath('../SET of CO'),
 WindowsPath('../setups'),
 WindowsPath('../Silicon Valley'),
 WindowsPath('../Slack.lnk'),
 WindowsPath('../Start Tor Browser.lnk'),
 WindowsPath('../todo-app'),
 WindowsPath('../Tor Browser'),
 WindowsPath('../vector.lnk'),
 WindowsPath('../Visual Studio Code.lnk'),
 WindowsPath('../WPS Office.lnk'),
 WindowsPath('../WPS PDF.lnk')]
```
In this example, the method performs exactly the same operation the iterator method does.

Listing a specific pattern of file or directory with method `Path.glob()`:
```python
from pathlib import Path

list(Path('..').glob('*.lnk'))
```
Output:
```python
[WindowsPath('../ArgoUML.lnk'),
 WindowsPath('../Figma.lnk'),
 WindowsPath('../Postman.lnk'),
 WindowsPath('../Slack.lnk'),
 WindowsPath('../Start Tor Browser.lnk'),
 WindowsPath('../vector.lnk'),
 WindowsPath('../Visual Studio Code.lnk'),
 WindowsPath('../WPS Office.lnk'),
 WindowsPath('../WPS PDF.lnk')]
```
It returns all the files that end with the given pattern there's a method that performs the same operation
without having to necessarily convert it to a list, I will be using the method later in this tutorial.

### Creating a directory and files
You can easily create a directory or file using the option provided by the operating system, However in some
situations you may need to automatically create a directory using python script, in that case, I will be utilizing this
opportunity to semantically illustrate how you can create a file.
Creating a file using os module.

```python
import os

os.mknod('script.py')
os.listdir()
```
This function returns void and if the file already exist is going it will throw a FileExistError exception then you can
use python exception handler to avoid your program breaking down perhaps you can confirm if the file was created or not,
we can do this  by iterating through the directory just like I did above or using a path module predigate function but
unfortunately, this function is only available on the Unix-type operating system.

Output:
```python
['script.py', 'main.py']
```
Yippee the file was created after iterating through the current directory, definitely, i could remember I mentioned that
I use windows I had to execute the code in an online python shell which runs on Linux OS.

Creating a file using pathlib
```python
from pathlib import Path

Path('new_script.py', exist_ok=True).touch()
list(Path('').iterdir())
```
Pahtlib provides the touch method for both Posix and Windows operating systems, just like the `os.mknod()` function touch also returns void which means we need to iterate through
the current directory as I did in the code snippet above, I believe using touch for creating a file is much easier and efficient to use.

Output:
```python
[WindowsPath('.ipynb_checkpoints'),
 WindowsPath('new_script.py'),
 WindowsPath('Untitled.ipynb')]
```
In this example, the result stated the file was created and if the file already exists the code will not break since
I passed a second argument that handles the exception.


Creating a new directory using os
```python
import os

os.mkdir('Document')
```
We can check if the directory was created just like we did while we created a new file.

#### Creating a new directing using pathlib
```python
from pathlib import Path

Path('Movie').mkdir(exist_ok=True)
```
The directory was created because I never had a movie directory in my current folder as you may have seen from the
beginning of this tutorial, although you may not notice if the directory already exists because I already passed the
second argument that handles the `FileExistError` exception that could have been raised and this flavor makes pathlib
more useful in this context.

### Checking for an existing file or directory
We can check if a file exists by navigating to the path but for proper practice and good comfort, you may not like to
leave the working environment to check if a file already exists or not. Os and pathlib module allow us to
perform this confirmation. Now let's confirm if the folder we created in the previous section is available.

#### Checking if the movie directory exist using os module.
```python
import os

os.path.exists('Movie')
```
If the directory exist or not the return value is going be a boolean.

Output:
```python
True
```
It returns true because the directory exists if the directory doesn't exist the return value would be false.

Checking if the document directory exists using pathlib
If the directory exists or not the return value is going to be a boolean.

```python
from pathlib import Path

Path('Document').exists()
```
Output:
```python
True
```
It returns true because the directory exists, let's see what happens if check a file that doesn't exist:

```python
from pathlib import Path

Path('prime_number.py').exists()
```
Output:
```python
False
```
Of course, it will return false because the file. doesn't exist in the current directory.

### Renaming a directory or file
We can rename a file or directory using both os and pathlib module is very yielding, Let's take a look at the following
examples.

#### Renaming the movie directory using os module
```python
import os

os.rename("Movie", "NewMovie")
```
The function returns void, and the directory name was renamed to the new given name, if you iterate through the current
the directory or confirm using the `os.exists()` function you see that the directory has been renamed.


#### Renaming the document directory utilizing pathlib module
```python
from pathlib import Path

target = Path('Data')
current =Path('Document')
Path.rename(current, target)
```
Obviously, the `Path.rename()` method of class Path only takes a Path object that's why you can't pass a string as an argument if you had tried it,
also, there is an alternative way you can rename a file or a directory using pathlib.

Output:
```python
WindowsPath('Data')
```
This method returns a path object containing new name of the directory.

#### Utilizing an alternative way of renaming a file or directory using pathlib, let's try this renaming a file.
```python
from pathlib import Path

target = Path('data_script.py')
current = Path('new_script.py')

current.rename(target)
```
Output:
```python
WindowsPath('data_script.py')
```
This method return a path object containing new name of the file.

### Joining path together utilizing Os and Pathlib module
Joining paths together is one of the interesting flavors both modules provide. Os and Pathlib modules provide
methods/functions for joining two components together. Also joining the path together is a demonstration that helps you
avoid the backslash and forward-slash challenge.

#### Joining path together with os module
```python
import os

current_path = os.getcwd()
os.path.join(current_path, 'data_script.py')
```
The `os.path.join()` function gives the ability to join two components together also using the `os.getcwd()` function reduces
the stress of being careful of backslash and forward-slash, initially what the function does is concatenate two strings
together which means you can join two nonexistent strings together, and I will be demonstrating an example after
displaying the output.

Output:
```python
'C:\\Users\\DELL\\Desktop\\practical_folder\\data_script.py'
```
The function returns the result as a concatenated string, and the function doesn't care if the path exists or not.

#### Joining nonexistent components together
```python
import os

os.path.join('path', 'new.py')
```
Output:
```python
'path\\new.py'
```
None of the two components exist, yet the function join the two together, which means the function only concatenated the
two-component.

#### Combining path together using pathlib module
Class purepath provides the capability of joining two components together also pathlib provides an alternative way of
joining various components together using an operator. Pathlib doesn't also care if the two paths exist but requires a
path object as the first argument in the PurePath.joinpath() method. Let's try it out:
```python
from pathlib import Path, PurePath

PurePath.joinpath(Path().cwd(),'Data')
```
Output:
```python
WindowsPath('C:/Users/DELL/Desktop/practical_folder/Data')
```
Now we got an object as a return as you may remember that it can be converted to a string.

Combining two nonexistent components together
```python
from pathlib import Path, PurePath

PurePath.joinpath(Path('hello'),'program')
```
None of the components exists, the method only combined the two components together.

Output:
```python
WindowsPath('hello/program')
```
Combining paths using a slash operator

```python
from pathlib import PurePath, Path

path = PurePath(str(Path().cwd()))

path / 'Data'
```
The slash operator accept string value as an argument and does the same thing the `PurePath.joinpath()` does but add an
extra flavor by accepting various path arguments.

Output:
```python
PureWindowsPath('C:/Users/DELL/Desktop/practical_folder/Data')
```
It returns one of the direct subclass of the PurePath containing the combined components.
Let's try the slash operator with various arguments.
```python
from pathlib import PurePath

path = PurePath('old')

path / 'new' / 'script.py'
```
Output:
```python
PureWindowsPath('old/new/script.py')
```

### Querying path to retrieve a final file or directory name
Either using pathlib or os module querying a path to get the final file or directory name returns a string
representation name of the final file or directory name.

#### Using os to get a directory file
```python
import os

os.path.basename(os.getcwd())
```
Output:
```python
'practical_folder'
```
In this example, the resulting state that the function returns the base name of the current directory in a string
representation.

#### Using pathlib to get a basename of a pathname
```python
from pathlib import PurePath, Path

PurePath(Path().cwd() / 'data_script.py').name
```
The purepath takes a path object or string, so I just combined a file with the current directory to avoid the typing
stress, also to save of from calling the join method.

```python
'data_script.py'
```
The result is the string representation of the final component.

### Removing a directory
Os and pathlib modules provide methods/functions that conditionally deletes a directory path, the condition state that
if you try to delete a directory that is not empty you will get an error message, and this means you can't remove an
occupied directory meanwhile there are alternative ways you can delete a directory that contains files or a file, either
you use the `os.remove()` function provided by os module or `Path.unlink()` method provided by pathlib.


#### Removing a directory with os module
```python
import os

first_dir = 'Data'

print(f'Does a "{first_dir}" directory exist? \n', 'Yes!' if os.path.exists(first_dir) else 'No!')

os.rmdir(first_dir)
print(f'\nAfter deleting the "{first_dir}" directory..\n')

print(f'Does a "{first_dir}" directory exist? \n', 'Yes!' if os.path.exists(first_dir) else 'No!')
```
Additionally, I utilized the os.path.exists() function to confirm if the directory was deleted and if the directory was successfully
deleted the answer will be yes if the directory doesn't exist then an exception will be raised.

Output:
```python
Does a "Data" directory exist?
 Yes!

After deleting the "Data" directory..

Does a "Data" directory exist?
 No!
```
So there we go the os.rmdir() function is a void method which means it returns nothing so for us to confirm if the directory still exists.

#### Removing directory with pathlib module
```python
from pathlib import Path

second_dir = 'NewMovie'

print(f'Does a "{second_dir}" directory exist? \n', 'Yes!' if Path(second_dir).exists() else 'No!')

Path(second_dir).rmdir()
print(f'\nAfter deleting the "{second_dir}" directory..\n')

print(f'Does a "{second_dir}" directory exist? \n', 'Yes!' if Path(second_dir).exists() else 'No!')
```

Output:
```python
Does a "NewMovie" directory exist?
 Yes!

After deleting the "NewMovie" directory..

Does a "NewMovie" directory exist?
 No!
```
The output is exactly the same as the one at the Os module section

### Removing a file
Deleting a file also requires certainty because you have to be sure that you are deleting
a file not a directory or if the file does not exist an error will be raised.

#### Deleting a file using os module
Intending to delete a nonexistent file using the os module a FileNotFoundError is raised or deleting a directory with
this function will trigger the IsADirectoryError. Os module provides two different functions that can be used to delete
a file but will be using one while is similar to the type pathlib provides.

```python
import os

script = 'data_script.py'

print(f'Does a "{script}" file exist? \n', 'Yes!' if os.path.exists(script) else 'No!')

os.remove(script)
print(f'\nAfter deleting the "{script}" file..\n')

print(f'Does a "{script}" file exist? \n', 'Yes!' if os.path.exists(script) else 'No!')
```

Output:
```python
Does a "data_script.py" file exist?
 Yes!

After deleting the "data_script.py" file..

Does a "data_script.py" file exist?
 No!
```
Here's the output after the file has been deleted, you can as well try to loop through the current directory at your end
since you have been shown how to do so.

#### Deleting a file using pathlib module
Pathlib provides a method named unlink this is a two in one method which can delete both a file anda symbolic link, this
method raises a `FileNotFoundError` if the file does not exist and it raisesPermissionError if you try to delete a
directory with the unlink method.
```python
from pathlib import Path

Path('new_script.py').touch()

new_file = 'new_script.py'

print(f'Does a "{new_file}" directory exist? \n', 'Yes!' if Path(new_file).exists() else 'No!')

Path(new_file).unlink()

print(f'\nAfter deleting the "{new_file}" directory..\n')

print(f'Does a "{new_file}" directory exist? \n', 'Yes!' if Path(new_file).exists() else 'No!')
```
Firstly I created a file with the touch method before deleting the file because I don't have any other file
I could have used it as an example.

Output:
```python
Does a "new_script.py" file exist?
 Yes!

After deleting the "new_script.py" file..

Does a "new_script.py" file exist?
 No!
```

### Retrieving and converting a file information
Any transaction related to working with file information can also be called Metadata, in this section, we will be using
module time and datetime to help us convert/interpret some information we will retrieve from a specific file while i
noticed that many books or articles most used datetime for converting information we will be using both time and
datetime to have a good comparison. Both os and pathlib modules provide function/method that can be used to retrieve
information about a file this function and method perform exactly the same operation and return the same value.

#### Using os module to retrieve information and about a file
Os module provides three functions that can be used to query file information notwithstanding we will be using the most
comprehensive one in this tutorial.

```python
import os

note_file = os.stat('Untitled.ipynb')

print(f'Size = {note_file.st_size}\nlast time accessesd = {note_file.st_atime}\nlast time modified = {note_file.st_mtime}\ncreation time = {note_file.st_ctime}')

```
I assigned the returned value to the variable i named "note_file", and the function `os.stat()` returns a stat_result
object which provides several public attributes that can be used to retrieve a given file's information, we are using
only the corresponding attribute in this section which are `st_size`, `st_atime`, `st_mtime`, `st_ctime`. `st_size`
contains the file size in bytes, `st_atime` contains the date of the last time the file was modified, `st_mtime`
attribute contains the file last modified date, `st_ctime` attribute respond differently on Unix and Windows, for
windows it contains the creation date, as for Unix it contains the changed date, and you can use st_birthtime for
querying creation time.

Output:
```python
Size = 5694
last time accessesd = 1642186406.360829
last time modified = 1642186405.3119907
creation time = 1641623379.0384889
```
#### Converting the information using datetime module
Converting the file time and date using the datetime module makes it readable for us. Note that the file I used in this
an example is my notebook script which I used in writing the script.
```python
from datetime import datetime
import os

note_file = os.stat('Untitled.ipynb')

last_accessed = datetime.fromtimestamp(note_file.st_atime)

last_modified = datetime.fromtimestamp(note_file.st_mtime)

creation_date = datetime.fromtimestamp(note_file.st_ctime)

print(f'last time accessesd: {last_accessed}\nlast time modified: {last_modified}\ncreation time: {creation_date}')
```
Output:
```python
last time accessesd: 2022-01-14 21:15:26.361177
last time modified: 2022-01-14 21:15:25.322196
creation time: 2022-01-08 07:29:39.038489
```
#### Converting the information using time module
I have always wondered why time module is rarely used to convert date information about a file, but i will show you
how awesome it using it to use time module for converting a file date information.

```python
import os, time

note_file = os.stat('Untitled.ipynb')

last_accessed = time.ctime(note_file.st_atime)

last_modified = time.ctime(note_file.st_mtime)

creation_date = time.ctime(note_file.st_ctime)

print(f'last time accessesd: {last_accessed}\nlast time modified: {last_modified}\ncreation time: {creation_date}')

```
Output:
```python
last time accessesd: Fri Jan 14 21:17:26 2022
last time modified: Fri Jan 14 21:17:25 2022
creation time: Sat Jan  8 07:29:39 2022
```
#### Using pathlib module to query information and about a file
Pathlib also provide `Path.stat()` method to retrieve information about a given file which returns a `os.stat_result` object which means
the value the method return depends on os module. In this example I have created a new file we will be using as an example.
```python
from pathlib import Path

recent_script = Path('new_script.ipynb').stat()

print(f'Size = {recent_script.st_size}\nlast time accessesd = {recent_script.st_atime}\nlast time modified = {recent_script.st_mtime}\ncreation time = {recent_script.st_ctime}')
```
Output:
```python
Size = 72
last time accessesd = 1642193846.365352
last time modified = 1642193544.1581955
creation time = 1642193544.1562355
```
#### Converting the information using datetime module
```python
from datetime import datetime
from pathlib import Path

recent_script = Path('new_script.ipynb').stat()

last_accessed = datetime.fromtimestamp(recent_script.st_atime)

last_modified = datetime.fromtimestamp(recent_script.st_mtime)

creation_date = datetime.fromtimestamp(recent_script.st_ctime)

print(f'last time accessesd: {last_accessed}\nlast time modified: {last_modified}\ncreation time: {creation_date}')
```
Output:
```python
last time accessesd: 2022-01-14 22:11:26.397169
last time modified: 2022-01-14 21:52:24.158195
creation time: 2022-01-14 21:52:24.156235
```

#### Converting the information using time module
```python
from pathlib import Path
import time

recent_script = Path('new_script.ipynb').stat()

last_accessed = time.ctime(note_file.st_atime)

last_modified = time.ctime(note_file.st_mtime)

creation_date = time.ctime(note_file.st_ctime)

print(f'last time accessesd: {last_accessed}\nlast time modified: {last_modified}\ncreation time: {creation_date}')
```
Ouput:
```python
last time accessesd: Fri Jan 14 21:17:26 2022
last time modified: Fri Jan 14 21:17:25 2022
creation time: Sat Jan  8 07:29:39 2022
```

### Querying a file extension
Pathlib and os module provide function and method that allow us to query a file extension.

#### Using os module to query file extension
Path module provides the `os.path.splitext()` function for querying file extension and `os.path.splitext()` splits path
into pair which returns both the file name and the file extension and if the file doesn't have an extension it returns
the pair including the file name and an empty string representing the extension.

```python
import os

os.path.splitext('Untitled.ipynb')
```
Output:
```python
('Untitled', '.ipynb')
```
#### Using pathlib module to query file extension and file name
Pathlib provides an attribute `Path.suffix` for splitting a file extension and attribute `Path.stem` for file name.
`Path.suffix` contains the default value which an empty string if a path final path doesn't have an extension.
```python
from pathlib import Path

file = Path('new_script.ipynb')

print(f'File name: {file.stem}\nFile extension: {file.suffix}')
```
Output:
```python
File name: new_script
File extension: .ipynb
```

### Wrapping Up
At this point, I believe you should have the edge difference between Os and Pathlib modules. In this article, I believe you have
learned these following:
- Good decision-making when choosing the right module for file system operation.
- How to work with file system operation
- Working path
- Removing a file
- Conversion of file date properties
- How to work with a path on different operating system

Thanks for reading!
