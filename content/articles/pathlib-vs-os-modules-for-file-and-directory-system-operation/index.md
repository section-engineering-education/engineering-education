### Pathlib vs OS Modules for File and Directory System Operation

In this tutorial, we will run through different viable contexts to discover an agreeable decision of utilizing either Pathlib or OS for file system operation. Also, we will utilize this tutorial to perform distinguished tasks for significant reference, these tasks are not limited to writing and reading a file, describing a document information, renaming files, creating directories and so on.

### Prerequisites
To follow this tutorial all it requires is the following:

- Basic knowledge in python programming language.

### Goals
By the end of this tutorial, the reader should be acquainted with:

- Utilizing Pathlib and OS modules to manipulating a file and a directory path.
- Implementing object-oriented programming and functional programming in file system operation.
- Converting a file's metadata to basic readable information.
- Manipulating relative path and absolute path.
- Understanding the scenario where OS and Pathlib modules can be independently fit in.

### Contents
- [Introduction](#introduction)
- [Os module](#os-module)
- [Pathlib module](#pathlib-module)
- [Highlighting the practical difference between os and pathlib module](#highlighting-the-practical-difference-between-os-and-pathlib-module)
- [Querying current path using os and pathlib](#querying-current-path-using-os-and-pathlib)
- [Navigating to home directory](#navigating-to-home-directory)
- [Listing a directory path content](#listing-a-directory-path-content)
- [Creating a new directory and file](#creating-a-new-directory-and-files)
- [Checking for an existing file or directory](#checking-for-an-existing-file-or-directory)
- [Renaming a directory and file](#renaming-a-directory-or-file)
- [Joining path components together](#joining-path-component-together)
- [Querying path to retrieve a final file or directory name](#querying-path-to-retrieve-a-final-file-or-directory-name)
- [Removing a directory](#removing-a-directory)
- [Removing a file](#removing-a-file)
- [Retrieving and converting a file information](#retrieving-and-converting-a-file-information)
- [Querying a file extension and name](#querying-a-file-extension-and-name)
- [Theoretical difference between pathlib and os](#theoretical-difference-between-pathlib-and-os)
- [Wrapping Up](#wrapping-up)

### Introduction
File System Operation can be characterized as the example or technique that can be used to control or construct files and directories and there are two different ways of working with file system operation, which are functional dependency and object-oriented concept. This tutorial practically highlights the different scenarios to differentiate between Pathlib and Os.

#### [Os module](https://docs.python.org/3/library/os.html)
The OS (operating system) module is a different operating system interface that functionally renders a convenient way of working with files and directories with a simple function call, additionally, OS empowers us to deal with I/O tasks straightforwardly.

#### [Pathlib module](https://docs.python.org/3/library/pathlib.html)
The Pathlib module is an Object-Oriented file system activity that offers classes representing filesystem paths with semantics fitting for various operating systems.

### Highlighting the practical difference between OS and Pathlib modules
In this section we will practically illustrate the semantic differences between Pathlib and OS modules using comparable code snippets to help you determine where every module fit in. Additionally, note that every demonstration requires the importation of the two modules.

#### Querying current path using OS and Pathlib
Querying the current working directory is a basic task when you are dealing with a path. There are two unique types of path which are relative path and absolute path. An absolute path gives a full description of the current location you are working while a relative path refers to a location that is relative to the current working directory. 

> Note:
> Querying the current path using OS and Pathlib will return an absolute path.

#### Querying current path using os

```python
import os

print(os.getcwd())
```

Output:
```bash
C:\Users\DELL\Desktop\practical_folder
```
The output returns a string representation of the absolute current path you are working, note your output will be different and contains forward slash (/) if you are not using Windows Os.

#### Querying current path using pathlib.
```python
from pathlib import Path

print(Path().cwd())
```
Output:
```bash
WindowsPath('C:/Users/DELL/Desktop/practical_folder')
```
In this example, the output returns one of the two respective path module subclasses' instances of the current location you are working. It returns a windows object if you are using windows object while it returns a posix path object if you are using any posix operating system e.g Linux Os and Mac os, We can likewise convert this value to a string, let's attempt it below

#### Converting the new windows' path object to a string
Converting the object to a string value requires you to call the in-built string method.

Consider the following example:

```python
from pathlib import Path

print(str(Path().cwd()))
```
The in-built string function will convert the path object to string.

Output:
```bash
'C:\\Users\\DELL\\Desktop\\practical_folder'
```
The output is somehow different from the type of string representation of the `os.cwd()` function returns, the above output consists of two backslashes while the `os.cwd()` function includes just a backslash.

### Navigating to home directory
Exploring the home directory gives you a simple opportunity to work straightforwardly with files or directories in the home directory, also it allows you to easily navigate to the home directory.

#### Using os module to navigate to the home directory
Navigating to the user's home directory path using os module requires us to pass string representation of these components `~` and `~user` as an argument. You can read more about it [here](https://docs.python.org/3/library/os.path.html#module-os.path).

```python
from os import path

print(path.expanduser('~'))
```

Output:
```bash
C:\Users\DELL
```
This example is the string representation of the user's home directory path.

#### Using pathlib module to navigate to the home directory

```python
from pathlib import Path

print(Path().home())
```

Output:
```bash
WindowsPath('C:/Users/DELL')
```
The example illustrates that the `Path().home()` function returns an object representation of the path which can be converted to a string value.

#### Listing a directory path content
In this section, we will outline the files/directories in the current directory, the parent directory, and a given directory.

#### Using os module to list the current directory

```python
import os

print(os.listdir())
```

Output:
```bash
['.ipynb_checkpoints', 'Untitled.ipynb']
```
This example is the return of a list object containing a file and a folder in the given or current directory, the output illustrates that the queried directory only contains the file (Untitled.ipynb) which is the jupyter notebook file I'm currently using in writing the scripts. 

You can also list a previous directory or current directory an example will be demonstrated in the next snippet.

#### Listing the contents of the previous parent directory by passing a double dots string argument.
To outline the items in the previous directory requires you to pass two dots string as an argument which simple known as relative path pattern.
```python
import os

print(os.listdir('..'))
```

Output:
```bash
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
In this example, the function returns a list containing the files and directories' name in a string representation, hence these are the accessible files in the previous directory.

#### Using pathlib module to list a directory content.
Using pathlib module to outline items in a given directory is somehow not as straight forward compared to the previous example in the os module.

Let's consider the following example:

```python
from pathlib import Path

print(Path().iterdir())
```

Output:
```bash
<generator object Path.iterdir at 0x0000017A030A7120>
```
In this example, the function returns an iterator object wrapped in a generator function alongside the heap memory address, to outline the items in the iterator object we can basically iterate through the iterator object or choose the other way round by converting it to a list object, for this situation, Let's convert it to a list object.

#### Converting the iterator object to a list

```python
python
from pathlib import Path

print(list(Path().iterdir()))
```

Output:
```bash
[WindowsPath('.ipynb_checkpoints'), WindowsPath('Untitled.ipynb')]
```
This example illustrates that there are two items in the given directory.

#### Outlining a relative directory path
Pathlib also accepts two dots string as an argument which can be passed through the constructor to iterate through the prompt parent directory.

```python
from pathlib import Path

print(list(Path('..').iterdir()))
```

Output:
```bash
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
The output is the list of the files and directories in the prompt parent directory which tends to be my Desktop directory.

However, pathlib alternatively provides `Path.glob()` to list files and directories in a given or current directory, and this method requires a string argument to perform a specific task.

Consider the following example:

#### Utilizing glob method to outline a relative directory path
The glob method can be used to carry out relative pattern matching files in the directory represented by the given path.

```python
from pathlib import Path

print(list(Path('..').glob('*')))
```
In this example, the asterisk passed to the `glob('*')` method instructs the method to list all the items in the given directory.

Output:
```bash
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
The output covered the list of the items in the given directory.

#### Outlining a specific pattern of a file with `Path.glob()` method

```python
from pathlib import Path

print(list(Path('..').glob('*.lnk')))
```

Output:
```bash
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
It returns all the files that end with the given pattern pathlib module also provides `PurePath.suffix()`method for performing the same operation without having to necessarily convert it to a list.

#### Creating a directory and file
Basically you can create a directory or file using the option provided by your operating system, However in some situations you may need to automatically create a directory or file whenever you are writing a python script, in that case, we will be utilizing this opportunity to semantically illustrate how we can create a file or directory in python.

#### Creating a file using os module

```python
import os

os.mknod('script.py')
print(os.listdir())
```
The `os.mknod()` function returns a void and if the file already exists it will raise a `FileExistError` exception either you can use the python exception handler to avoid your program being broken down, perhaps we can confirm if the file was created or not either by iterating through the directory using the `os.listdir()` function or by utilizing the `os.path.exists()` function which returns TRUE or FALSE. 

> Note: 
> The `os.mknod()` function is only available on a Unix type operating system which illustrates that this function is not available on a Windows operating system.

Output:
```bash
['script.py', 'main.py']
```
Yippee the file was created after iterating through the current directory, absolutely you are right that this output doesn't look consistent with the previous ones the script got executed utilizing an online python shell which runs on Linux operating system.

#### Creating a file using pathlib

```python
from pathlib import Path

Path('new_script.py', exist_ok=True).touch()
print(list(Path('').iterdir()))
```
Pahtlib provides the `Path.touch()` method for both Posix and Windows operating systems, just like the `os.mknod()` function, this method returns a void which means we need to iterate through the current directory to confirm whether the file has been created, in this kind of scenario we can easily make a better decision whenever we are creating a file and as we might have confirmed that using `Path.touch()` is much easier and efficient compared to `os.mknod()`.

Output:
```bash
[WindowsPath('.ipynb_checkpoints'),
 WindowsPath('new_script.py'),
 WindowsPath('Untitled.ipynb')]
```
In this example, the result proves that the file was created and if the file already exists the program will not break since we passed the second argument that handles the possible exception.

#### Creating a new directory using os

```python
import os

os.mkdir('Document')
```
We can check if the directory was created just like we did while we created a new file in the previous code snippet.

#### Creating a new directing using pathlib

```python
from pathlib import Path

print(Path('Movie').mkdir(exist_ok=True))
```
The directory was created because there was never a movie directory in the current path and if the directory already exists a `FileExistError` will be raised, to avoid your application from terminating however, you can simply pass the `exist_ok=True` argument to handle `FileExistError` exception which could have been raised, and this flavor makes pathlib more preferable in this context.

#### Checking for an existing file or directory
We can check if a file already exists by navigating to the path but for proper practice and good comfort, you may not like to leave the working environment to check if a file already exists or not. OS and Pathlib modules allow us to perform this confirmation. Now let's confirm if the folder we created in the previous section is available.

#### Checking if the movie directory exist using os module

```python
import os

print(os.path.exists('Movie'))
```
whether the directory already exists or not the return value is going to be a boolean value.

Output:
```bash
True
```
It returns true because the directory exists if the directory doesn't exist the return value would be false.

#### Checking if the document directory exists using pathlib

```python
from pathlib import Path

print(Path('Document').exists())
```

Output:
```bash
True
```
It returns true because the directory exists, let's see what happens if we check a file that does not exist:

```python
from pathlib import Path

print(Path('prime_number.py').exists())
```
Output:
```bash
False
```
Of course, it will return false because the file doesn't exist in the current directory.

#### Renaming a directory and file
We can rename a file or directory using both OS and Pathlib modules this operation is so yielding, let's take a look at the following examples.

#### Renaming the movie directory using os module

```python
import os

os.rename("Movie", "NewMovie")
```
The function returns void, and the directory name was renamed to the given name, if you iterate through the current directory or confirm using the `os.exists()` function you will notice that the directory has been renamed.

#### Renaming the document directory utilizing pathlib module
```python
from pathlib import Path

target = Path('Data')
current =Path('Document')
print(Path.rename(current, target))
```
The `Path.rename()` method of class Path only takes a Path object that's the reason you would not be able to pass a string as an argument if you had tried it, also there is an alternative way you can rename a file or a directory using pathlib. We will try this in the next example.

Output:
```bash
WindowsPath('Data')
```
This method returns a WindowsPath object containing the new name of the directory.

#### Utilizing an alternative way of renaming a file or directory using pathlib, let's try this renaming a file.

```python
from pathlib import Path

target = Path('data_script.py')
current = Path('new_script.py')

print(current.rename(target))
```
Output:
```bash
WindowsPath('data_script.py')
```
This method return a path object containing new name of the file.

#### Joining path components together
Joining paths together is one of the interesting flavors both modules provide. OS and Pathlib modules provide methods/functions for joining two components together. Also joining the path together is a demonstration that helps you avoid the backslash and forward-slash challenge.

#### Joining path together with os module

```python
import os

current_path = os.getcwd()
print(os.path.join(current_path, 'data_script.py'))
```
The `os.path.join()` function gives you the ability to join two components together, initially what the function does is concatenating two strings together which means you can join two nonexistent strings together, an example will be demonstrated in next example.

Output:
```bash
'C:\\Users\\DELL\\Desktop\\practical_folder\\data_script.py'
```
The function returns the result as a concatenated string, and the function doesn't care if the path exists or not.

#### Joining nonexistent components together
The purpose of joining nonexistent components is because we need to confirm that the python interpreter doesn't care about the relevance of the given paths.

```python
import os

print(os.path.join('path', 'new.py'))

```

Output:
```bash
'path\\new.py'
```
None of the two components exists, yet the function joined both of them together, which means the function only concatenated the two components.

#### Combining path together using pathlib module
Class purepath of pathlib module provides the capability of joining two components together.

```python
from pathlib import Path, PurePath

print(PurePath.joinpath(Path().cwd(),'Data'))
```
> Note:
> The `PurePath.joinpath()` method expects a path object as the first argument, and a string as the second argument, the method doesn't check whether the path given as second arguments exists or not.

Output:
```bash
WindowsPath('C:/Users/DELL/Desktop/practical_folder/Data')
```
We got a WindowsPath object as the returned value.

#### Combining two nonexistent components together

```python
from pathlib import Path, PurePath

print(PurePath.joinpath(Path('hello'),'program'))
```
None of the components exists, the method only combined the two components together.

Output:
```bash
WindowsPath('hello/program')
```
#### Combining paths using a forward slash operator
Pathlib provides an alternative way of joining various components together using the forward-slash operator, when using the forward operator placing a PurePath object will be expected as the numerator, and a string will be expected as the subsequent denominator. Let's try practice this.

```python
from pathlib import PurePath, Path

path = PurePath(str(Path().cwd()))

print(path / 'Data')
```

Output:
```bash
PureWindowsPath('C:/Users/DELL/Desktop/practical_folder/Data')
```
It returns one of the direct subclass of the PurePath containing the combined components.

#### Joining various paths with forward slash operator with various arguments.

```python
from pathlib import PurePath

path = PurePath('old')

print(path / 'new' / 'script.py')
```

Output:
```bash
PureWindowsPath('old/new/script.py')
```

#### Querying path to retrieve a final file or directory name
Either we use pathlib or os module to query a path for getting the final name of a file or the directory returns a string representation of the final file or directory name.

#### Using os to get a directory file
```python
import os

print(os.path.basename(os.getcwd()))
```
Output:
```bash
'practical_folder'
```
In this example, the resulting state that the function returns the basename of the current directory in a string representation.

#### Using pathlib to get a file name
```python
from pathlib import PurePath, Path

print(PurePath(Path().cwd() / 'data_script.py').name)
```
The class purepath expects a path object or string to be passed via its constructor, so we just combined a file name with the current directory to avoid the typing stress, also to save us from calling the `PurePath.joinpath()` method.

Output:
```bash
'data_script.py'
```
The result is the string representation of the final component and this component is always a file.

#### Removing a directory
OS and Pathlib modules provide a method or function that conditionally deletes a directory, the condition expresses that attempting to delete a directory that is not empty will lead to an error, and this basically implies you can't remove an occupied directory, meanwhile, there are alternative ways we can use to delete a directory that contains files or a file, possibly you can use the `os.remove()` function provided by os module or `Path.unlink()` method provided by pathlib to remove a file one after the other.

#### Removing a directory with os module
```python
import os

first_dir = 'Data'

print(f'Does "{first_dir}" exist? \n', 'Yes!' if os.path.exists(first_dir) else 'No!')

os.rmdir(first_dir)
print(f'\nAfter deleting "{first_dir}".\n')

print(f'Does "{first_dir}" exist? \n', 'Yes!' if os.path.exists(first_dir) else 'No!')
```
Additionally, we utilized the `os.path.exists()` function in the print statement to confirm whether the directory gets removed, note that if the directory successfully gets deleted the response will be `Yes` else the response will be `No` and if the directory doesn't exist a `FileExistError` exception will be raised.

Output:
```bash
Does "Data" exist?
 Yes!

After deleting "Data".

Does "Data" exist?
 No!
```
The `os.rmdir()` function is a void method which implies it returns nothing, for us to confirm whether the directory still exists we need to add the extra statements to the script.

#### Removing directory with pathlib module

```python
from pathlib import Path

second_dir = 'NewMovie'

print(f'Does "{second_dir}" exist? \n', 'Yes!' if Path(second_dir).exists() else 'No!')

Path(second_dir).rmdir()
print(f'\nAfter deleting "{second_dir}".\n')

print(f'Does "{second_dir}" exist? \n', 'Yes!' if Path(second_dir).exists() else 'No!')
```

Output:
```bash
Does "NewMovie" exist?
 Yes!

After deleting "NewMovie".

Does "NewMovie" exist?
 No!
```
The above example is similar to the previous os module example, the only difference is just the syntax, we have got almost the same output.

#### Removing a file
Removing a file also requires a certainty because you have to be sure that you are removing a file, not a directory else an `IsADirectoryError` exception will be raised, and if the given file doesn't exist a ` FileNotFoundError` exception will be raised.

#### Deleting a file using os module
Os module provides two different functions that can be used to delete a file, we will only be using one which will be `os.remove()` function, meanwhile the other one is known as `os.unlink()`.

```python
import os

script = 'data_script.py'

print(f'Does "{script}" exist? \n', 'Yes!' if os.path.exists(script) else 'No!')

os.remove(script)
print(f'\nAfter deleting "{script}".\n')

print(f'Does "{script}" exist? \n', 'Yes!' if os.path.exists(script) else 'No!')
```

Output:
```bash
Does "data_script.py" exist?
 Yes!

After deleting "data_script.py".

Does "data_script.py" exist?
 No!
```
The output covered that the file has been deleted, you can as well attempt to iterate through the current directory at your end since you have been shown how to do such.

#### Deleting a file using pathlib module
Pathlib provides a method known as `Path.unlink()`, this method can delete both a file and a symbolic link, this method raises a `FileNotFoundError` if the file does not exist, and a `PermissionError` will be raised if we attempt to remove a directory with the `Path.unlink()` method.

```python
from pathlib import Path

Path('new_script.py').touch()

new_file = 'new_script.py'

print(f'Does "{new_file}" exist? \n', 'Yes!' if Path(new_file).exists() else 'No!')

Path(new_file).unlink()

print(f'\nAfter deleting "{new_file}".\n')

print(f'Does "{new_file}" exist? \n', 'Yes!' if Path(new_file).exists() else 'No!')
```
In the example above we created a file with the touch method before deleting the same file.

Output:
```bash
Does "new_script.py" exist?
 Yes!

After deleting "new_script.py".

Does "new_script.py" exist?
 No!
```
The output stated that the file exits before deleting the file and confirmed that the file no longer exist after being deleted.

#### Retrieving and converting a file information
Any type of operation related to working with file information can also be called Metadata, in this section, we will be using the time and datetime modules to convert/interpret a given file's information. Both OS and Pathlib modules provide function/method for performing this type operation. The function and method provided by os module and path perform exactly the same operation and both return a `os.stat_result` object.

#### Using os module to retrieve information and about a file
Os module provides three functions that can be used to query file information notwithstanding we will be using the most comprehensive one in this tutorial.

```python
import os

note_file = os.stat('Untitled.ipynb')

print(f'Size = {note_file.st_size}\nlast time accessed = {note_file.st_atime}\nlast time modified = {note_file.st_mtime}\ncreation time = {note_file.st_ctime}')

```
In the example above, we simply queried the corresponding attributes to get their distinguished state representing the file metadata. The `st_size` contains the file size in bytes, the `st_atime` contains the date of the most recent access to the given file in seconds, the `st_mtime` attribute contains the file last modified date in seconds, the `st_ctime` attribute respond differently on Unix and Windows operating system, for windows it contains the creation date, as for Unix it contains the changed date, either you can use `st_birthtime` for querying creation time on Unix operating system.

Output:
```bash
Size = 5694
last time accessed = 1642186406.360829
last time modified = 1642186405.3119907
creation time = 1641623379.0384889
```
#### Converting the information using datetime module
Converting the file's time and date with datetime module makes the output readable for us. Note that the file we used in this example is a notebook script which is the current script used for this tutorial.

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
```bash
last time accessesd: 2022-01-14 21:15:26.361177
last time modified: 2022-01-14 21:15:25.322196
creation time: 2022-01-08 07:29:39.038489
```
#### Converting the information using time module
Time module is not commonly used for converting date and time information about a file, however, in this section, we will see how awesome it is using the time module for converting a file's date and time information.

```python
import os, time

note_file = os.stat('Untitled.ipynb')

last_accessed = time.ctime(note_file.st_atime)

last_modified = time.ctime(note_file.st_mtime)

creation_date = time.ctime(note_file.st_ctime)

print(f'last time accessesd: {last_accessed}\nlast time modified: {last_modified}\ncreation time: {creation_date}')
```

Output:
```bash
last time accessesd: Fri Jan 14 21:17:26 2022
last time modified: Fri Jan 14 21:17:25 2022
creation time: Sat Jan 8 07:29:39 2022
```
#### Using pathlib module to query information and about a file
Pathlib module provides `Path.stat()` method to retrieve information about a given file which returns a `os.stat_result` object containing the information about a given file and this covered that the `Path.stat()` method behaves exactly the same way as the `os.stat()` function.

```python
from pathlib import Path

recent_script = Path('new_script.ipynb').stat()

print(f'Size = {recent_script.st_size}\nlast time accesed = {recent_script.st_atime}\nlast time modified = {recent_script.st_mtime}\ncreation time = {recent_script.st_ctime}')
```

Output:
```bash
Size = 72
last time accessed = 1642193846.365352
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

print(f'last time accessed: {last_accessed}\nlast time modified: {last_modified}\ncreation time: {creation_date}')
```
Output:
```bash
last time accessed: 2022-01-14 22:11:26.397169
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

Output:
```bash
last time accessesd: Fri Jan 14 21:17:26 2022
last time modified: Fri Jan 14 21:17:25 2022
creation time: Sat Jan 8 07:29:39 2022
```

#### Querying a file extension and name
Pathlib and OS module provide a function or method that allows us to query a file extension.

#### Using os module to query file extension
The os module provides the `os.path.splitext()` function for querying file extension and the `os.path.splitext()` function splits the path into pairs which returns both the file name and the file extension and if the given argument representing the file doesn't have an extension it returns the pair including the file name and an empty string representing the extension.

```python
import os

print(os.path.splitext('Untitled.ipynb'))
```

Output:
```bash
('Untitled', '.ipynb')
```

#### Using pathlib module to query file extension and file name
Pathlib provides two attributes for splitting a file extension and splitting a given file name. These attributes are `Path.suffix` and `Path.stem`, the `Path.suffix` can be used to split a file and retrieve the file extension while `Path.stem` can be used to split a file too but retrieve the file name.

```python
from pathlib import Path

file = Path('new_script.ipynb')

print(f'File name: {file.stem}\nFile extension: {file.suffix}')
```

Output:
```bash
File name: new_script
File extension: .ipynb
```
The output is a string representation of the name and the extension of the file, the extension format means that the file is a jupyter notebook file type. 

>Note:
> The `Path.suffix` attribute will retrieve an empty string if a given file doesn't have an extension.

#### Theoretical difference between Pathlib and OS modules

Illustrating the theoretical difference between OS and Pathlib modules.

#### Os

- It gives a submodule named path for manipulating common pathname, and it offers direct functions for performing I/O activity.
- It mostly renders the same functionality that utilizes the same interface irrespective of the operating system you are using to keep its portability.
- Its basic functions mostly return a string representation of a path.
- It provides a submodule for creating temporary files and directories.
- It provides a function that effectively lists directory content.
- It additionally provides a function that makes an empty file but unfortunately, it is just accessible on Unix nor on Windows in the meantime numerous engineers accept that it's impossible to create a file without calling the in-built function open for opening it first.
- It tends to be utilized to execute a file irrespective of the extension (e.g csv, pdf, mp3, and so on) but unfortunately, it only works on Windows operating except you use some other available module python recommends.
- It provides different functions that can perform additional operations on environment variables like setting an environment, removing an environment, and more operations.
- It provides a capacity that can copy a document.

#### Pathlib

- It gives a high-level Path object for performing operations on pathname, and the path class has methods that enable the capacity of performing I/O activity which is much simpler and behaves like the in-built open function thus python documentation recommends.
- It offers distinguished classes for performing explicit system operations on various operating systems which clearly expresses that the pathlib module isn't portable.
- Its module objects' methods generally return system compatible objects (e.g., PurePathPosix, PosixPath, PurePathWindows, and WindowsPath) which enables us to perform the additional operations.
- It doesn't give either article or strategy to making transitory records and catalogs.
- For listing a directory content when using pathlib is a tedious task because pathlib only provides a method iterator of the path class for listing directory content which requires additional operation because the method iterator returns an object representation.
- The path class in pathlib provides a method for creating a permanent empty file with a different extension which makes working with File System Operation mind-boggling in python.
- It can't be utilized to execute a document yet can open a record while composing or perusing a .txt document.
- It doesn't make any arrangement for environment variables operation.
- None of the available objects in pathlib makes a provision for making a duplicate file.

#### Wrapping Up
At this point, you should have the edge difference between OS and Pathlib modules, also you would have learned these following:
- Good decision-making when choosing the right module for file system operation.
- How to work with file system operation.
- Removing a file.
- Identify the difference between relative path and absolute path.
- Conversion of file date properties using time and datetime modules.
- How to work with a path on distinguished operating system.
- Retrieving a specific file information.

Thanks for reading!
