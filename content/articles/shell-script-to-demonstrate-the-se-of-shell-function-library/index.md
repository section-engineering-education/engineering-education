### Introduction
The Shell Function Library is a set of functions that may be called from any location in the development environment. Shell scripting becomes a little less laborious and repetitious as a result. We may access and call such functions from other files or scripts by building a shell script with some functions specified in it. It aids in the avoidance of code repetition in huge files and sophisticated scripts.

In C/C++, a Shell Function Library is similar to a header file, whereas, in Python, it is similar to a module. The current script must be aware of the function's location. To be able to use the functions, we must additionally add the file's location to the Environment variables, or run the script in the terminal to temporarily load the function library into the current shell. Shell Script Functions are similar to regular shell scripts in that they only define functions.

### Table of contents
- [Why use Function Library](#why-use-function-library)
- [Creating function library](#creating-function-library)
- [Using Functions From Library](#using-functions-from-library)
- [A simple Demo of using Bash script as fuction library](a-simple-demo-of-using-bash-script-as-fuction-library)
- [Usage of Shell Function Library](#usage-of-shell-function-library)
- [Conclusion](#conclusion)


### Why use Function Library
The most important reason for having a function library is for reusability. We require functions in a function library for the following reasons.

1. Sometimes we require logic to address looping logic. For example, in Oracle Applications, whenever a concurrent request is sent, we usually click on the Refresh button to retrieve the most recent data about the concurrent program's status. Or, we may create a function and place it in the function library so it can be used in other scripts.
2. We could need a collection of functions to deal with an excel file, a CSV file, an XML file, or a properties file at times. This is the situation when we wish to work with and would need across several test automation scripts, so once the functions are developed, they can be reused wherever they are needed. We may need to interact with these files for a variety of reasons, including test data iterations, spreadsheet verification, and so on.
3. Some businesses even create functions for each business function of the application under test, which can then be utilized to create other test script combinations.

> Similarly, individuals desire function libraries for a variety of reasons. Another advantage is that once these functions are exposed, they become central, so any changes made to them are reflected in any scripts that utilize them.
             
### Creating function library
Let's look at how to make a function library with an Open script.

To construct a function library, follow these steps.

1. Open the file open script
2. Select New from the File menu.
3. Click Next after selecting a project type.
4. Check the box labeled `Create a script as function library`.

![How to create a Script as a Function Library](/engineering-education/Shell-Script-to-Demonstrate-the-Use-of-Shell-Function-Library/create_script_as_function_library.png)

5. Next, type the name of the function library you want to use.
6. Enter the desired package name, which may be the name of your company or a generic package name that we produce for every Java program.
7. Enter your preferred Class name, which should be similar to the name of your function library.

![How to enter a class name](/engineering-education/Shell-Script-to-Demonstrate-the-Use-of-Shell-Function-Library/class_name_entry.png)

8. Finish by clicking the Finish button.

After the function library has been built, the end-user may add the functions that they want to utilize in automation scripts.

### Using Functions From Library
The following are the steps to using the function library:
1. Any new automation script can be created.
2. Make your way to the Assets section.
3. Click Add after selecting the script's node.

![How to add a script](/engineering-education/Shell-Script-to-Demonstrate-the-Use-of-Shell-Function-Library/adding_scripts_node.png)

4. Enter the path to the function library we generated.
5. CGive it a suitable alias name ( this name would be used in the scripts to call the functions )
6. All functions in the function library are now ready for usage.

#### A simple Demo of using Bash script as function library
The first step in this procedure is to build a shared library file that contains all of the script's functionalities. Make a function library file called `myfuncs.sh` in this directory.

```bash
function addem
{
   echo $[ $1 + $2 ]
}

function multem
{
  echo $[ $1 * $2 ]
}

function divem
{
  if [ $2 -ne 0 ]
  then
     echo $[ $1 / $2 ] 
  else
     echo -1 
  fi
}
```
Simply add the following line to a shell script to launch the myfuncs library file:

Next, include the `myfuncs.sh` library file in the script file that uses these functions. There is a problem with the scope of shell functions at this time. Shell functions, like environment variables, are only valid for the duration of the shell session in which they are specified. The function will not appear in the current script if you try to run the library file like a normal script file.

```bash
./myfuncs.sh

result=$(addem 5 10)
echo "The reslut is $result"
```
> In this example, `myfuncs.sh` and `test13.sh` are both located in the same directory. If not, you must access the file using the appropriate path.


### Usage of Shell Function Library

The Shell Function Library is relatively basic, but it is dependent on the user's usability and order of choice since it has the potential to seriously disrupt the code structure. If the user needs to alter the function, he may forget where it is kept. Shell Function Libraries are a fantastic method to become organized quickly and easily. It simplifies the process of memorizing or rewriting code over and over. It may save a lot of time and effort by allowing you to do things quickly and simply. This functionality of the Linux shell may be extremely useful in terms of increasing user productivity and maximizing time spent scripting files.


### Conclusion
In this article, we have learned what a script is, how to create one using the open script, and then demonstrate the use of the Shell Function Library using Bash scripts in Linux distributions. I urge the reader to continue researching this article for further knowledge on automation using function libraries.