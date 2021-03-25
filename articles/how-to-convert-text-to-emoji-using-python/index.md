# HOW TO CONVERT TEXT TO EMOJI USING PYTHON

![Hero image](/engineering-education/how-to-convert-text-to-emoji-using-python/hero.jpg)

### Introduction
Emojis are frequently used on social media to communication expressions and emotions. As a programmer, have you ever considered writing code that produces emojis in Python? Well, this article is for you.

In this tutorial, you will learn how to build an emoji converter from text using dictionaries in Python, which store data as key-value pairs. Python is a high-level programming language that is quick to read and execute. It has a vast library that can perform other programming tasks such as changing files and text searching.

It is also a scripting language and is often used to create Web applications, dynamic Web content automation, and Artificial intelligence.

### Table of content
- Prerequisites
- Variables
- Strings and Formatted strings
- The IF and ELSE statement
- The Input and print function
- Dictionaries
- Text to emoji converter
- conclusion

### Prerequisites
As a beginner in Python, you can use your browser to download the most recent version of [Python](https://www.python.org/ftp/python/3.9.2/python-3.9.2-macosx10.9.pkg) and install it on your computer. 
You will also need to download a python code editor more preferable [PyCharm](https://www.jetbrains.com/pycharm/download/download-thanks.html?platform=mac), which is an integrated development environment for professional developers, and it's also student-oriented, friendly, and easy to use.

### Variables
Variables are the most fundamental concepts in programming, particularly Python. Variables are labels that signify where you can store data in your computer memory, and they may also contain values. They can store simple values like strings, integers, and Boolean values. Variables should always be in lowercase, preferably.

### Strings and Formatted string
Strings are a sequence of characters. You define strings by both double (“ ”) and single (‘ ’)apostrophe signs. Formatted strings are helpful in situations where you want to generate some text with your variables. Formatted strings make it easier for a user and reader to visualize the string concatenation in their head and output. To define Formatted strings, prefix your code with an ‘f’ and use curly braces/brackets {} to insert values in your strings, using the ‘+’ sign anastomose the strings together.
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

### IF and ELSE statement
The IF and ELSE statement allows us to build programs that can decide based on certain conditions (either these conditions are TRUE or FALSE). They test a condition and then return a value depending on the outcome. The value returned depends on whether the condition passes or fails.

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
The print and input are general-purpose functions that are built into Python. You can use the print function to print a specified message on the screen. This message can be a string or any other object, while you can use the input function to receive input/messages from the user. This function can instruct the program to pause and wait for the user to enter the required information. See the example below.

```Python
name=input("what is your name? ")
age=int(input("how old are you?  " + name ))
favourite_colour=input("what is your favorite colour? ")
print(name + " likes " + favourite_colour)
```

Check your terminal to see the result.

### Dictionary
Dictionaries stores data values in key pairs. A dictionary is a list of objects that can be rearranged without repeating its data values. You write the keys and values in dictionaries in curly brackets, it is an ordered list of data values. The key name refers to dictionary objects, which are presented in keys; value pairs.

```Python
details = { "brand": "Ford",
           "model": "Mustang",
           "year" : 2001}
print(details.get("brand"))
print(details.get("model"))
print(details.get("year"))
```

In the above illustration, you can use the `.get()` method to get values stored in a dictionary.
The  `.update()` methods will update the items from an argument. If the item does not exist, then it will add the item to the dictionary. Other methods you can use are:
`.pop()` this method removes the item with the specific key name
`.del()` removes the item with the specified key name
`.clear()`method empties the dictionary
Try more tricks using the  `dictionary.get()` method.
Kindly try this yourself.
To determine how many items a dictionary has, use the `print(len(details))`

### Text to emoji converter
You may believe that printing emojis would require a complex algorithm. However, let me assure you that this is not the case; writing the code to convert texts to emoji is straightforward. This is another excellent application of using a dictionary.
The first step is to call the input function stored in a string. Next, you will call the `.split(“ ”)` method. This method goes through this string, and anywhere it finds a space, it uses it to separate this string into multiple words and return it as a list. Also, you define a dictionary for mapping special characters into emojis features.  you will then add key values of the pair and map it to a specific emoji character.
You can press Ctrl, Command, and Space key on your keyboard to bring out the emoji box on your Mac System. On your Windows System, press and hold the Window button and either the  Fullstop (.) or semicolon (;) until you see the emoji picker appear.
Finally, You will then loop through the string using the `.get()` method.
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

you will use the `def` function to transform this code into a reusable function that we can use in various applications.

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
Writing codes to convert text to emojis is relatively easy to do and requires sound knowledge of the basics of python language. I hope you understand this concept better now and how they work. You can now practice the codes.

### Reference
 - [pdfdrive](https://www.pdfdrive.com/python-programming-python-programming-for-beginners-python-programming-for-intermediates-e180663309.html)
- [learn python](https://www.udemy.com/course/learn-python/)
- [learn python](https://www.learnpython.org/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
