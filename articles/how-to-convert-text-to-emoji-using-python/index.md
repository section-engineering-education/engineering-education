## HOW TO CONVERT TEXT TO EMOJI USING PYTHON

![Hero image](/engineering-education/how-to-convert-text-to-emoji-using-python/hero.jpg)

### Introduction
Emojis are now used by almost all on social media in some form or another.
As a programmer, have you ever considered writing code that produces emojis in python? well, this article is for you.
In this tutorial, we'll learn how to build an emoji converter from text using Python code and dictionaries, which store data as key-value pairs. This is another use for dictionaries in python programming.
Python is a high-level programming language that is quick to read and execute, it has a vast library that can perform other programming tasks such as changing files and text searching..
Python is a scripting language and is often used to create Web applications, dynamic Web content automation, and Artificial intelligence.

### Installation
As a beginner in python, you can use your browser to download the most recent version of [python](https://www.python.org/ftp/python/3.9.2/python-3.9.2-macosx10.9.pkg) and install it on your computer. 
You will also need to download a python code editor more preferable [PyCharm](https://www.jetbrains.com/pycharm/download/download-thanks.html?platform=mac) which is an integrated development environment for professional developers and it's also student-oriented, friendly, and easy to use.

### Variables
Variables are the most fundamental concepts in programming, particularly python. Variables are basically the labels that will signify where something will be stored in your computer memory and they may also contain values. They are use temporarily to store data in computer memory during programming, they can store simple values like strings integers, and Boolean values. Variables should be written in lower case preferable.

### Strings and formatted string
Strings are basically a sequence of characters. Strings are defined by both double (“ ”) and single (‘ ’)apostrophe signs. Formatted strings are useful in situations where you want to dynamically generate some text with your variables. Formatted strings make it easier for a user and reader to visualize the string concatenation in their head and output. To define formatted strings, prefix your code with an ‘f’ and use curly braces/brackets {} to dynamically insert values in your strings, using the ‘+’ sign to anastomose the strings together.
See example below

```Python
first_name='john'
last_name='smith'
message=f"{first_name} + {last_name} is a coder"
print(message)
country='nigeria is the giant of Africa'
locate='and it is a West African country'
msg=f'{country} +  {locate} and that is thriving to be the best in the world'
print(msg)
```

### If and else statement
The IF and ELSE statement allows us to build programs that can decide based on certain conditions (either these conditions are TRUE or FALSE). They test a condition and then return a value depending on the outcome, the value returned depends on whether the condition passes or fails.

```Python
is_hot=False
is_cold=False

if is_hot:
   print("its a hot day")
   print("please drink plenty of water")
elif is_cold:
   print("its a cold day")
   print("please waer something warm")
else:
   print("its a lovely day")
print("have a nice day ahead")
```

### The input and print function
The function is used to provide an autonomous service; they are a block of codes that is invoked when calling a program.
The print and input are general-purpose functions that are built into python. The print function is used for printing a specified message on the screen this message can be a string or any other object, while the input function is used for receiving input/messages from the user. This function can instruct the program to pause and wait for the user to enter the required information. See the example below.

```Python
name=input("what is your name? ")
age=int(input("how old are you?  " + name ))
favourite_colour=input("what is your favorite colour? ")
print(name + " likes " + favourite_colour)
```

Check your terminal to see the result.

### Dictionary
Data values are stored in key-value pairs using dictionaries. A dictionary is a list of objects that can be rearranged and do not repeat. The keys and values in dictionaries are written in curly brackets. The key name may refer to dictionary objects, which are presented in keys: value pairs. Data values are stored in dictionaries, which are an ordered list of data values.

```Python
details = { "brand": "Ford",
           "model": "Mustang",
           "year" : 2001}
print(details.get("brand"))
print(details.get("model"))
print(details.get("year"))
```

In the above illustration, you can use the `.get()` method to get values stored in a dictionary.
The  `.update()` methods will update the items from an argument, if the item does not exist, then the item will be added to the dictionary. Other methods you can use are:
`.pop()` this method removes the item with the specific key name
`.del()` removes the item with the specified key name
`.clear()`method empties the dictionary
Try more tricks using the  `dictionary.get()` method.
Kindly try this yourself during practice to perfect your skills
To determine how many items a dictionary has, use the `print(len(details))`

### Text to emoji converter
You may believe that printing emojis would require a complex algorithm. However, let me assure you that this is not the case; in fact, writing code is very easy. This is another cool application of using a dictionary.
To build this program we start by calling the input function stored in a string. And then we will call the `.split(“ ”)` method. this method goes through this string and anywhere it finds a space it uses it to separate this string into multiple words and return it as a list. Then we will define a dictionary for mapping special characters into emojis features.  We will then add key values of the pair and map it to a specific emoji character.
You can press ctrl, cmd, and space to bring out the emoji box on your mac system, on your system for windows, press and hold the window button and either the (.) or semicolon(;) until you see the emoji picker appear.
You will then loop through the string using the `.get()` method.
See the example below.

```Python
message = input("> ")
words = message.split( " ")
emojis = {
   ":)" : "😀",
   ":(" : "😞",
   "lol" : "😂",
   "sick":"😨",
   "happy": "😀",
   "mermaid": "🧜‍"
}
outcome = " "
for word in words:
   outcome += emojis.get(word, word) + " "
print(outcome)
```

We'll use the define function to transform this code into a reusable function that we can use in a variety of applications.

```Python
def  emoji_converter(message):
 	words = message.split( " ")
emojis = {
   ":)" : "😀",
   ":(" : "😞",
   "lol" : "😂",
   "sick":"😨",
   "happy": "😀",
   "mermaid": "🧜‍"
}
outcome = " "
for word in words:
   outcome += emojis.get(word, word) + " "
return output


Message = input  (“>”)
print(emoji_converter(message) )
```

Pretty easy, right?

*Try this yourself*

### Conclusion
Writing codes to convert text to emojis is quite easy to do and requires sound knowledge on the basis of python language. I hope you understand this concept better now and how they work. you can now practice the codes.

### Reference
 - [pdfdrive](https://www.pdfdrive.com/python-programming-python-programming-for-beginners-python-programming-for-intermediates-e180663309.html)
- [learn python](https://www.udemy.com/course/learn-python/)
- [learn python](https://www.learnpython.org/)

### About the author
![author image](/engineering-education/how-to-convert-text-to-emoji-using-python/majiyebo.jpg)
Majiyebo Ezra Shewuri
Majiyebo Ezra is pursuing a degree in medicine and surgery as an undergraduate. Technical writing, copywriting, and python programming are his passions (data science). He started his career as a data scientist two years ago. He is enthralled by new technology. Ezra is also a gamer and a sportsman.
