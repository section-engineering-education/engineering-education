
Certain programs might require different types of data to be accepted from the user. Whatever the aim of program is, you'll need data structures like lists and dictionaries to store them. You will always want to save the data that users enter, before they close your program. The best way to do this, is to use the JSON module to store your data.

In this tutorial, we'll look at how to store users' data in Python using the JSON module. We shall also learn how to use the JSON module to save and read user-generated data.

### Prerequisites
Have some basic knowledge of Python programming language.

### Why store data in Python using JSON module?

 1. Enables developers to dump simple Python data structures to a file and afterward load that data the next time the application runs.
 2. Data can be shared between Python programs using Json.
 3. When you store data using the JSON format, you can share it even with people working with other programming languages
 4. It's simple to learn and comes in a portable format.

### Using json.dump() 
To use `json.dump()` function import the `json` module first.

The `json.dump()` function take two arguments:
 1. Piece of information to save
 2. File object it can use to save the information

Let's develop a quick program to save a set of numbers. To save the set of numbers, we will use the `json.dump()` function.

```python
import json

numbers = [10, 20, 30, 70, 191, 23]  #create a set of numbers
filename = 'numbers.json'          #use the file extension .json
with open(filename, 'w') as file_object:  #open the file in write mode
 json.dump(numbers, file_object)   # json.dump() function to stores the set of numbers in numbers.json file
```

In this program, we store the set of numbers in the file *numbers.json*. The extension `.json` shows that the data inside the file is in *JSON* form.

We then access the file in `'w'`mode(*write mode*), to make JSON capable of writing data to a file. Finally,the `json.dump()` function keeps the set of numbers in the file *numbers.json*

This program has no terminal output, but when we open the file *numbers.json* we see the following data:

```
[10, 20, 30, 70, 191, 23]
```

### Using json.load()
Let's construct a program that reads the set of numbers back into memory using `json.load()`, considering the previous example:

```python
import json

filename = 'numbers.json'  #make sure is the same file you wrote to  
with open(filename,'r') as file_object:  #open in read mode
 numbers = json.load(file_object)#use json.load to load data and store it in the variable numbers

print(numbers)     #print the set of numbers
```

The `json.load(`) function takes one argument which is the file object. 

Ensure that you read from the same file that you wrote to. Python only requires to read out of that file hence open it in *read mode*.

In the above program, the `json.load()` function to loads the
information stored in *numbers.json*, and then store it in the variable *numbers*. Then we print the set of numbers:

```
[10, 20, 30, 70, 191, 23]
```

This is a simple technique for two programs to share data.


### Saving and reading user-generated data

When dealing with data provided by users, storing data with JSON is helpful since if you don't save your user's data in some way, you'll lose everything when your program terminates.

Consider the following case: we ask the user for their first name when they execute our program for the first time, and then
remember their first name when they re-run our program.

First, let's save their first name:

```python
import json

firstname = input("Enter your first name to register? ")
filename = 'firstname.json'
with open(filename, 'w') as file_obj:
     json.dump(firstname, file_obj)
     print("Thank you for registering in our community " + firstname + "!")
```

In this program, we ask for the first name to register the user.

We use `json.dump()` to store the first name in the file *firstname.json*. 

The user will then see a notification stating that he or she has been registered.

```
Enter your first name to register? Felix
Thank you for registering in our community Felix!
```

Let's now create a new program that welcomes a user whose first name has been registered.

```python
import json

filename = 'firstname.json'
with open(filename,'r') as file_obj:
 firstname = json.load(file_obj)
 print("Welcome back, " + firstname + " Thank you for registering!")
 ```

Here we use the `json.load()` to read the data saved in *firstname.json* into the variable *firstname*. We can finally welcome them back now that we've recovered their first name:

```
Welcome , Felix  Thank you for registering!
```

Let's combine the above two programs into one file.

When users run this program, if at all possible, we'd like to remember their first name.

We will begin with a try block that tries to recover the first name. In case the *firstname.json* file does not exist, we will use an except block to ask for a first name and store it in the file *firstname.json* for next time:

```python
import json

# If the user's first name has already been saved, load it..
# Otherwise, ask for and save the first name.
filename = 'firstname.json'
try:
 with open(filename, 'r') as file_obj:
  firstname = json.load(file_obj)
except FileNotFoundError:
 firstname = input("Enter your first name? ")
 with open(filename, 'w') as file_obj:
  json.dump(firstname, file_obj)
 print("Thank you for registering in our community, " + firstname + "!")
else:
 print("Welcome back, " + firstname + " Thank you for registering!")
```

We attempt to open the file *firstname.json* using the try block. We read the *firstname* back into memory if this file exists. Then we print a welcome back notification to the user using the else block.

For the first time, the user runs the program, the file *firstname.json* doesn't exist and a FileNotFoundError occurs. Python will execute except block, here we request the user's first name. 

Finally we use the `json.dump()` to store the first name and then print a thanksgiving message.

When you run this program for the first time, the output looks like this :

```
Enter your first name? Felix
Thank you for registering in our community, Felix!
```

If you've run this program at least once, you'll see the following output:

```
Welcome back, Felix Thank you for registering!
```

### Conclusion
In this article we have learned the following:
 - Reasons for storing data in Python using json module
 - Using json.dump() 
 - Using json.load()
 - Saving and reading user-generated data
