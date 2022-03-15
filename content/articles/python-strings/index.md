---
layout: engineering-education
status: publish
published: true
url: /python-strings/
title: Understanding Strings in Python
description: This tutorial will guide the reader on how to initialize, format, and concatenate strings in Python. It will also discuss some of the major methods you can use when dealing with Python strings.
author: dianne-sandra
date: 2021-07-30T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-strings/hero.png
    alt: Understanding Strings in Python
---
A string is a sequence of Unicode characters. This standard provides a unique code for every character to make them distinguishable. In Python, strings are used to represent text and can include spaces, special characters, and numbers.
<!--more-->
### Initializing strings in Python
We create strings by enclosing characters using single or double quotes. Triple quotes can also be used.

#### Using single quotes
We define strings using single quotes, as shown below:

```py
string = 'Hello there' #single quotes
print(string)
```
Output:

```bash
Hello there
```

#### Using double quotes
We define strings using double quotes as follows:

```py
string2 = "Double Quote String" #double quotes
print(string2)
```

Here is the output:

```bash
Double Quote String
```

####  Using triple quotes

```py
string3 = '''Tripple Quote String''' # defining strings using tripple quotes
print(string3)
```

Output:

```bash
Tripple Quote String
```

>Note that triple quotes can also be used to specify multi-line strings, as shown below:

```py
# Multi-line strings
string4 = '''My name is Jane Doe,
    I like traveling so much'''

print(string4)
```

```bash
My name is Jane Doe,
    I like traveling so much
```

### Accessing characters in a string
Strings can be regarded as arrays of characters. This means that we can access individual characters by specifying their index in square brackets, as shown below:

```py
# printing the first character of the string
string = 'Hello there'
print(string[0])
```

```bash
H
```

Since Python allows negative indexing whereby the last element can be accessed by index `-1`, the second last element by index `-2`, and so on, we can use the same approach to retrieve the last character, as demonstrated below:

```py
# printing the last index
string = 'Hello there'
print(string[-1])
```
Output:

```bash
e
```

### Printing a range of characters
We use `slicing` To print a range of characters from a given index to another. In this technique, we specify the `starting index` and the `ending index` separated by a colon `:`. 

In the following example, the string that will be printed out is between index 1 and 8.

```py
#slicing 1st to 8th character
string = 'hello there'

# Print the string between index 1 to 8
print('string[1:8] = ', string[1:8])
```

Output:

```bash
string[1:8] =  ello th
```

### Common methods in Python strings
`lower()` - This method is used to convert an alphabetical string to lower case. Any characters and numbers in the string are ignored.

```py
# original text
string = 'THIS IS TEXT IN UPPERCASE'

# print transformed string
print(string.lower())
```

Here is the output:

```bash
this is text in uppercase
```

`upper()` - This method transforms a given text into uppercase and ignores special characters, numbers, and symbols.

```py
# initial string 
string = 'this text is in lowercase'

# transform to upper case
new_string = string.upper()

# print transformed string
print(new_string)
```
Output:

```bash
THIS TEXT IS IN LOWERCASE
```

`len()` - This method returns the length of a given input string, as shown below:

```py
string = 'programming is fun'

# getting the length of the string
print(len(string))
```

```bash
Output: 18
```

`split()` - This method separates individual characters of a string into a list. By default, the list values are separated by white spaces. However, you can also use a comma, hash-tag, or any other character.

In the example below, we will split the string using a `?` character:

```py
# initial string
string = 'Hello?world?this?is?my?test?for?the?game'

# splitting the string
new_string = string.split("?")

# printing the new string
print(new_string)
```

Here is the output:

```bash
['Hello', 'world', 'this', 'is', 'my', 'test', 'for', 'the', 'game']
```

`join()` - This method combines all elements of a list specified by a separator into a single string. This function requires an iterable object as a parameter. An iterable object is one in which an individual element can be returned at a time.

```py
# iterable object 
object = ['Hello', 'world', 'this', 'is', 'my', 'test', 'for', 'the', 'game'] #list

# specifying the separator
separator = ' '

# Join where the comma occurs
print(separator.join(object))
```

Output:

```bash
Hello world this is my test for the game
```

`find()` - This method is used to determine if a character or a value exists in a given string. It returns the first occurrence of the value. If the word or character is not found, the `find` method returns -1.  

For instance, if we want to find the occurrence of the word `world` in the string `hello world`, we can use the `find` method, as shown below. 

```py 
# string
string = 'Hello world'

# Find the occurence of world
y = string.find('world')

print(y)
```

Output:

```bash
6
```

In the code above, the function returns `6` which is the index of the string `world`.

`replace()` - This method replaces a phrase in a string with another phrase. The method takes 3 parameters; the string to be replaced, what to replace it with, and the number of times to do the replacement.

> If we do not state the number of times the replacement is to be done, the method replaces all the occurrences of the phrase.

```py
# string
string = 'Hello world, this world are a nice world'

# replace world with people
y = string.replace('world', 'people')

# print the output
print(y)

```
Output:

```bash
Hello people, these people are very nice people
```

`strip()` - This method removes any character that either trails or leads a string. By default, the `split()` function removes spaces, as illustrated below:

```py
string = "     hello world     " #string with extra spaces
x = string.strip()

print(x)

```
Output:

```bash
Hello world
```

A specific character can also be passed to the `strip` method as a parameter:

```py
string = "//////Hello world,,,,,"

x = string.strip("/,") # removes ///

print(x)
```
Output:

```bash
Hello world
```

###  Python string operations
This section discusses some of the operations that can be performed on strings using Python.

####  String iteration
We can iterate through a given string using a `for` loop. We can iterate to determine the string's length, count the occurrence of a given character, or check the presence of a particular letter or character. 

To demonstrate this, let's loop through a string and print every character of that string:

```py
# Iterating through a string
for letter in 'Hello World':
    print(letter)

# count the number of letter
count = 0
string = 'Hello. how. is home from th lool above'
for letter in string:
    if(letter == 'o'):
        count+=1
print('The letter o occurs ' +str(count)+ ' times')   
```

Output:

```bash
H
e
l
l
o
 
W
o
r
l
d

The letter `o` occurs 7 times
```

#### Concatenation
String concatenation involves joining one string with another string. We perform this operation using the `+` operator.

```py
# concatenating Strings using the plus operator
# string 1
string1 = 'section'

#string 2
string2 = 'engineering'

#concatenated string
string3 = string1 + string2

#printing the output
print(string3)  
```

Output:

```bash
sectionengineering
```

#### Character membership
This is a test done on a given string to determine if some characters exist in the string. If the characters are found, the method returns `true`.

We usually use the keyword `in` to check for character membership:

```py
# input string 
inputString = 'Hello World'

# string to find
stringToCheck = 'World'
stringToCheck2 = 'Google'

# membership test
x = stringToCheck in inputString
y = stringToCheck2 in inputString

#print output
print(x)
print(y)
```

Here is the output:

```bash
True
False
```
### Formatting strings
In this section, we will discuss three main methods of [string formatting](https://www.learnpython.org/en/String_Formatting).

#### Using the '%' operator
We use `%` to format the string by replacing what is in the variable with the operator, as shown below:

```py
# Using % operator 
name = 'Dianne Sandra
print('My name is %s' %name)
```

```bash
My name is Dianne Sandra
```

#### Using the 'str.format' method
This approach was introduced in `Python 3.0` to enable programmers to handle complex string operations more efficiently. 

`str.format` is an inbuilt method and does not require additional libraries. It supports string manipulation by substituting certain values and variables. 

This function is demonstrated below:

```py
# using format option 
print ("{} is a good platform.".format("Section Engineering Education"))

# substitution using variable names
print ('{name} is {age} years old and she is a {occupation}'
.format(name = 'Dianne', age = 19, occupation = 'programmer'))
```

Output:

```bash
Section Engineering Education is a good platform.
Dianne is 19 years old and she is a programmer
```

#### Using f-strings
Introduced in `Python 3.6`, f-Strings allow embedding expressions into strings. 

It has the name `f-string` due to the constants into which other expressions are embedded, which are prefixed by the letter `f`. 

Take a look at the following example:

```py
# embbeding variables into string constants using f-string
string1 = 'Hello'
string2 = 'world'

# print the embeded string
print(f'{string1}  {string2}')
```

```bash
Output: Hello  world
```

### Conclusion
In this article, we have learned about strings in Python. We discussed how to initialize strings, we learned operations that we can perform on the strings, some inbuilt methods, and string formatting. You can know use this knowledge to craft powerful applications

You can download the code snippets from [here](https://github.com/diannesandra/python-strings).

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)