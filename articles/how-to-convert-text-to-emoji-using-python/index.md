# HOW TO CONVERT TEXT TO EMOJI USING PYTHON

![Hero image](/engineering-education/how-to-convert-text-to-emoji-using-python/hero.jpg)

### Introduction
Emojis are frequently used on social media to communicate expressions and emotions. Most programmers may have considered writing Python code that generates emojis. Well, this is the article to read.

In this tutorial, programmers will learn how to build an emoji converter from text using dictionaries in Python.

### Table of content
- Prerequisites
- Variables
- Strings and Formatted strings
- The IF and ELSE statement
- The Input and print function
- Dictionaries
- Text to emoji converter
- Conclusion

### Prerequisites
Download the most recent version of [Python](https://www.python.org/ftp/python/3.9.2/python-3.9.2-macosx10.9.pkg) and install it. 
Also download a python code editor more preferable [PyCharm](https://www.jetbrains.com/pycharm/download/download-thanks.html?platform=mac), which is an integrated development environment for professional developers, and it's also student-oriented, friendly, and easy to use.

### Variables
Variables are labels that signify where you can store data in your computer memory, and they contain values. They can store simple values like strings, integers, and Boolean values. Variables should always be in lowercase, preferably.

### Strings and Formatted string
Strings are a sequence of characters. Programmers define strings by using both double (“ ”) and single (‘ ’) apostrophe signs. Formatted strings are helpful in situations where one may want to generate some text with variables. Formatted strings make it easier for a user and reader to visualize the string concatenation in their head and output. To define Formatted strings, prefix your code with an ‘f’ and use curly brackets {} to insert values in your strings.
See example below.

```Python
first_name='john'
last_name='smith'
message=f"{first_name} {last_name} is a coder"
print(message)
```

See terminal output below.

```Python
john smith is a coder
```

### IF and ELSE statement
The IF and ELSE statement allows programmers to build programs that can decide based on certain conditions (either TRUE or FALSE). They test a condition and then return a value depending on the outcome, whether the condition passes or fails.

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

See terminal output below.

```Python
its a lovely day
have a nice day ahead
```

### The input and print function
The print and input are general-purpose functions that are built into Python. programmers use the print function to print a specified message on the screen. The input function is used to receive input from the user. This function can instruct the program to pause and wait for the user to enter the required information. See example below.

```Python
name=input("what is your name? ")
favourite_colour=input("what is your favorite colour? ")
print(name + " likes " + favourite_colour)
```

See terminal output below.

```Python
what is your name? maji
what is your favorite colour? red
maji likes red
```

### Dictionary
Dictionaries stores data values in key pairs. A dictionary is a list of objects that can be rearranged without repeating its data values. Keys and values in dictionaries are written in curly brackets, The key name refers to dictionary objects, which are presented in keys; value pairs.

```Python
details = { "brand": "Ford",
           "model": "Mustang",
           "year" : 2001}
print(details.get("brand"))
print(details.get("model"))
print(details.get("year"))
```

See terminal output below.

```Python
Ford
Mustang
2001
```

From the above illustration, one can decide to use the `.get()` method to get values stored in a dictionary.

`.update()` methods will update the items from an argument. If the item does not exist, then it will add the item to the dictionary. Other methods are;

`.pop()` this method removes the item with the specific key name.

`.copy()` this method returns a copy of the dictionary.

`.clear()` this method empties the dictionary.

Try more tricks using the  `dictionary.get()` method.

To determine how many items a dictionary has, use the `print(len(details))`

### Text to emoji converter
Programmers believe that printing emojis would require a complex algorithm. However, this is not the case; writing codes to convert texts to emojis is straightforward. This is another excellent application of using a dictionary.
The first step is to call the input function stored in a string. Next, call the `.split(“ ”)` method. This method goes through this string, and anywhere it finds a space, it uses it to separate this string into multiple words and return it as a list. Also, define a dictionary for mapping special characters to emoji attributes, then combine the pair's key values and map them to a particular emoji character. Press Ctrl, Command, and Space key on the keyboard to bring out the emoji box on a Mac System, for Windows, press and hold the Window button and either the  Fullstop (.) or semicolon (;) until the emoji picker appear.
Finally, loop through the string using the `.get()` method.
See example below.

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

See output in the terminal below.
```Python
> today is a good day because i woke up happy
 today is a good day because i woke up 😀 
```

Use the `def` function to transform this code into a reusable function that can be use in other applications.

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

### Conclusion
Writing codes to convert text to emojis is relatively easy to do and requires sound knowledge of the basics of python language. Programmers should clearly understand this principle and how it works. Practice these codes.

### Reference
 - [pdfdrive](https://www.pdfdrive.com/python-programming-python-programming-for-beginners-python-programming-for-intermediates-e180663309.html)
- [learn python](https://www.udemy.com/course/learn-python/)
- [learn python](https://www.learnpython.org/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
