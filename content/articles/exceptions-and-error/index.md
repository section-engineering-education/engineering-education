Exceptions and Error Handling in Python

##Introduction

Over the years, Python has gained acceptance in the programming world because of its simplicity and application across diverse areas, ranging from game development to web development, data science, and cyber security.
Though Python is simple to work with, it is not that gracious to errors as whenever an error occurs during a program execution that makes python unsure of what to do, the program will halt and show a "traceback" error message which includes a report about the exception raised.
Exceptions are special objects that manage errors raised during program execution they can be handled with "try-except blocks' which tells python what to do when such an error occurs.
In this article, we will look at some major errors in python and how to handle them using the "try-except block''.
## Key Takeaways
At the end of this article, it is excepted that the reader should have learned the following:
- What  exceptions are
- How to handle exceptions in python 
## Prerequisites
To better understand this article, the reader is expected to have a basic understanding of python and is familiar with working with any code editor. In this article,  the Jupyter notebook was used. 
##Table of contents
[Keyboard interrupt error](#keyboard interrupt error)
[Exception](#exception)
[Handling exceptions](#handling-exceptions)
[Working with multiple exceptions in one block of code](#working-with-multiple-exceptions-in-one-block-of-code)
[The “Finally Block”](#the-“finally-block”)
[Conclusion](#conclusion)
[Further reading](#further-reading)

Python 3 has 63 defined built-in exceptions with all of them arranged to form a “tree-type” of hierarchy. Some of these exceptions are more general than others, i.e they include other exceptions, while others are completely concrete as they represent only themselves. 

![exception_hierarchy](exceptions-and-error/exception_hierarchy.png)

[Source](https://w3.cs.jmu.edu/lam2mo/cs240_2014_08/lab05-exceptions.html)

The tree form is a bit weird as it starts from the root going up. At the top of this tree is the most general exception called the “Base exception”.After the base exception, the next in this hierarchy are; system exit, exception, general exit, and keyboard interrupt.  This article will focus more on the “Exception” branch because most of the errors that you will encounter in your day-to-day work with python are from this branch, but before that let us look at the keyboard interrupt and what it means in a brief. 

## Keyboard interrupt error
The keyboard interrupt error is raised when a user hits the hot-key “ctrl-c of ctrl-z”. This error is raised no matter how much the user wants to avoid it and at any stage of your program execution.  We will cover how to handle this error in a subsequent section.

## Exception

![The Exception branch](/exceptions-and-error/except.png)
Image by author

The exception error is the branch with the most errors that you will encounter more often as a programmer while working with python. This branch is subdivided into: attribute error, EOR error, name error, lookup error, OS error,  type error, and value. Here, we will look at attribute error, name error, type error, arithmetic error, and its branches, and then lookup error and its branches (index error and key error). 

### Attribute error
Attribute error is one of the common errors encountered in python, especially for beginners. This error is raised when you try to call an attribute that a particular object or data type does not support.
For example, if you call the ```.key()``` method on a list it will raise an attribute error because list does not support the  ``` key()``` method, rather it is a dictionary method that returns the keys of the specified dictionary. So whenever you get an attribute error, it shows that you are using the wrong attribute on a particle data type or object.

### Name error
Name error is raised when a wrong variable name is called, i.e if the name called has not been declared or when a wrong function name is called. This means that a variable or function can only be called or used after it has been created. 
This error can also be raised when you define a variable in a local scope and you try to access it in the global scope.  
 
``` Names  =  [ “James”, “Peter”, “June”, “Jane”] 
    names.lower()
```
![Name Error](/exceptions-and-error/nameerror.jpg)
Image by author

When you run the code above, you will get a **name error** because the list  created was stored in variable “Names”, not “names”. Python is case sensitive so it sees “Names” and “names” as two different variables, with one declared the other undeclared.
 
![ Local and variable scope](/exceptions-and-error/local.jpg)
Image ny author

In the image above, we got a name error because the variable called was declared within a function and we try to access it outside the function which is not allowed in python. 

### Type error
Type error is raised when you try to perform an operation that is not supported by an object or function. 

```name = “James”
Name / 2
```
In the code above, we assign   **James**  to the variable name and tried to perform a division operation. We will get a “TyrpeError” because “name”  is a string and those do not support that division type of operation. 

![Type error](/exceptions-and-error/type.jpg)
Image by author
### Arithmetic error
The arithmetic error occurs when an error is encountered during numeric calculations in python. This includes Zerodivision Error and Floating point error
Zero division error is raised when you try to divide a numeric value by zero. 
 
``` number  = 6
ZeroErro = 6 / 0
 ```
When we run this code, we will get a ZeroDivision error. In mathematics, this is said to be undefined.

![ZeroDivisionError](/exceptions-and-error/zero.jpg)

Image by Author

### Lookup error
Lookup error is the base class for key error and index error. 
The key error is raised when a wrong key is used to access a dictionary value, i.e, using a key that is not in the dictionary. This error means that the key you are using to access a dictionary is wrong. 

```
 gender = { “June’ : “female”, “John” : “male” , “Kim”: “female”}
  gender(“James”)

```
![KeyError](/exceptions-and-error/key.jpg)

Image by author

In the example above, we passed the name “James” to obtain James’ gender, this will return a key error because the key used was not found in the dictionary. 

The index error is raised when you try to access a sequence (index) of a list that does not exist or is out of range. 

``` name  = [ “James”, “Peter”, “Max”, “Brown”]
 print(name[4])
```
When you run this code you will get an index error because the index number “4” is out of range. Though there are 4 items in the list we created, python starts indexing from zero to show how far a list item is from the beginning of the list. 

![Index error](/exceptions-and-error/index.jpg)
Image by author

## Handling exceptions. 

In the first part of this article, we cover some exceptions; though these are not all the exceptions in python, they are the commonly encountered exceptions. In the second part of this article, we will be discussing how to handle these exceptions in your python program such that your program will continue running when these errors are encountered. 
 
To handle exceptions, python has four major defined components: Try, except,  else, and finally. The image below shows how these four-component are used in exception handling

![]()
 

Try: The try block specifies the code you want to “try” for an exception.
Except: With the except, you specify the expected exception that you want your try block to search for and the message you want to be displayed should this be cached
 Else: The else block contains code that you will want to be executed if the except block fails to catch an exception. Consider this a fall backplane/code
Finally: This block of code is executed irrespective of what happens in the blocks above. 
Using the steps above, we will go into detail on how to handle some specific exceptions in python. 
### Lookup error. 
 ```

try:
      details =  [{'name':'James', 'gender':'male','age': 23},
                 {'name' : 'Peter','gender': 'male', 'age': 35},
                 {'name':'Jane', 'gender' : 'female', 'age':29}]
except  LookupError:
    print('Wrong key used')
else:
    print('Thank you')

```
In the code block above, we used the LookupError exception which is the base exception for key error and index error. If any of these exceptions are encountered, **except** block will be executed, if none of them is encountered, the **else** block will be executed. The problem with using a general or base exception is that you won’t know which specific error was captured. 
For example, in the code above, if we try to access the dictionary using the wrong key we get that error and access it using the wrong index, we will get the same error as shown below. 

```
 details[1]['location']
```
In the code above, we try to access the dictionary which contains a list of workers’ personal information. But because the index is right and the key is wrong, the exception message will be printed. Also, if we provide the wrong index but the right, the same exception will be printed. 
To have these exceptions handled separately, we use the specific exceptions in our except block like this: 

```

try:
      details =  [{'name':'James', 'gender':'male','age': 23},
                 {'name' : 'Peter','gender': 'male', 'age': 35},
                 {'name':'Jane', 'gender' : 'female', 'age':29}]
except  KeyError:
    print('Wrong key used')
else:
    print('Thank you')

 When you run this code and provide a wrong key, the except block will capture it and be executed, but if you provide a wrong index, the else block will be executed. 
```
try:
countries = [ “USA”, “China”, “UK”, “Nigeria”,” South Korea”]
except IndexError:
          print(“wrong Index used”)
else:
print(“You are welcome”)
```
 Whenever a wrong index is used, the program will print “wrong index used”. 
 
## Working with multiple exceptions in one block of code. 
Python provides you the ability to have multiple exceptions within a single block of code. This simplifies your work and avoids unfavorable code growth in your program. It looks like this:
``` 
try:
  :
except  first exception:
  :
except second exception:
  :
except: 
```
If the try block encounters an exception as specified in the first, except block, it will be handled by that block, if it raises the second exception, the “except second exception” will handle this exception. 
In the event that the exception raised was not specified by either of these blocks, the last block will be executed. Though this block is optional, it is very important in the event that your interpreter encounters an exception that was not included in the previous except blocks, if this block is not included in the program. 
Using the code below as an example. 

```
try:
first_number = int(input(“Enter the first number:”))
second_number = int(input(“Enter the second number:”))
sum = first_number + second_number
division =  first_number / second_number
except ZeroDivisionError:
   print(“You can not divide by zero”)
except ValueError:
    print(“ Please enter an integer value, not an alphabet or any special character”)
except :
    print(“An error occurred”)
print(“Goodbye”)

When the interpreter encounters an exception, it goes through the except blocks and when it finds a matching exception, it executes that particular “except block”. 
In the code above, if you input “ 0” as your second number, the first except block is executed and the remaining blocks are skipped

## Handling Multiple Exceptions in one Except Block 

In python, you can have one except block handle multiple exceptions at once. The problem with this method is that the “print message” is the same for all exceptions making it difficult to know which error was raised.  
```
try:
first_number = int(input(“Enter the first number:”))
second_number = int(input(“Enter the second number:”))
sum = first_number + second_number
division =  first_number / second_number
except( ZeroDivisionError, ValueError):
   print(“ Sorry, an error was encountered”)
except:
    print(“An error occurred”)
print(“Goodbye”)

If any of the exceptions listed within the parenthesis is encountered, the print statement within the except block will be executed, if the exception encountered is not among the listed exceptions, the last ``` except ``` block will be executed and if there is no exception in the **try** block, the last ```print``` statement will be executed. 

## The “Finally Block”
Optionally, Python provides you with a “finally block”. This block is executed no matter the outcome of the **try block*; meaning whether the exceptions raised by your interpreter were captured by the **try block** or not, the **finally block** will be executed. 

```
try:
first_number = int(input(“Enter the first number:”))
second_number = int(input(“Enter the second number:”))
sum = first_number + second_number
division =  first_number / second_number
except ZeroDivisionError:
   print(“You can not divide by zero”)
except ValueError:
    print(“ Please enter an integer value, not an alphabet or any special character”)
except :
    print(“An error occurred)
finally:
   print(“You are welcome”)
```
In the code above, whether or not an exception was captured, the print statement “You are welcome” will be printed.

## Conclusion. 
 Murphy's law states that “ Anything that will go wrong, will go wrong”. This is true for python because it is not gracious to errors, because of this it is imperative that we know how to handle these errors as it is impossible to avoid all of them. This article covers some of the basic exceptions in python and how to handle them. 

## Further reading
- [Python KeyError](https://realpython.com/python-keyerror/)
- [ How to access a dictionary key value present inside a list](https://stackoverflow.com/questions/6521892/how-to-access-a-dictionary-key-value-present-inside-a-list?newreg=d4d7b888275840f38d28f2c2d191f38e)
- [Python - Error types](https://www.tutorialsteacher.com/python/error-types-in-python)
