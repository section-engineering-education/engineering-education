###  Introduction
A string is a sequence of Unicode characters. Unicode is a standard for providing unique code for every character, so that characters are distinguishable from one another. Strings as a data type have wide use in programming. Just like any other programming language, strings in python are used to represent text but could also include spaces, special characters as well as numbers.

###  Initializing strings in python
In python, we create strings by enclosing characters using single or double-quotes. Triple quotes could be used as well.
####  Using single Quotes
```py 
# defining strings using single quotes
string = 'Hello there'
print(string)
```
```bash
Hello there
```

####  Using Double Quotes
```py
# defining strings using double quotes
string2 = "Double Quote String"
print(string2)
```
```bash
Double Quote String
```

####  Using Triple Quotes
```py
# defining strings using tripple quotes
string3 = '''Tripple Quote String'''
print(string3)
```
```bash
Tripple Quote String
```

####  Tripple quotes can also be used to specify multi-line strings.
```py
# Multi-line strings
string4 = '''My name is Jane Doe,
    I like traveling so much''
print(string4)
```
```bash
My name is Jane Doe,
    I like traveling so much
```

###  Accessing Characters of Strings
Strings are arrays of characters and therefore, just as arrays we can access the individual characters of a string. We can do this by specifying the position of the string using square brackets and the index.

####  First character
```py
# printing the first character of the string
string = 'Hello there'
print(string[0])
```
```bash
H
```

####  Last Character
Since python allows negative indexing whereby the last element can be accessed by index `-1`, the second last element by index `-2`, and so on, we can use the same to get the last element of a string.
```py
# printring the  last index
string = 'Hello there'
print(string[-1])
```
```bash
e
```

####  Printing a range of characters
If we wanted to print a range of characters say from a given index to another, we use `slicing`. In slicing, we specify the starting index and the ending index separated by a semi-colon `:`. The string printed out is that which occurs in that range.
```py
#slicing 1st to 8th character
string = 'hello there'

# Print the string between index 0 to 8
print('string[1:8] = ', string[1:8])
```
```bash
string[1:8] =  ello th
```

###  Common Methods in Python Strings
- `lower()`. This method is used to convert an alphabetical string to lower case. If the string includes characters and numbers, they are ignored.
```py
# original text
string = 'THIS IS TEXT IN UPPERCASE'

# print transformed string
print(string.lower())
```
```bash
this is text in uppercase
```

- `upper()`. This does the opposite of the `lower()` method. It transforms a given text into uppercase ignoring special characters, numbers, and symbols.
```py
# initial string 
string = 'this text is in lowercase'

# transform to upper case
new_string = string.upper()

# print transformed string
print(new_string)
```
```bash
THIS TEXT IS IN LOWERCASE
```

- `len()`. This method returns the length of a given input string.
```py
# The string
string = 'programming is fun'

# getting the length of the string
print(len(string))
```
```bash
18
```

- `split()`.  This method separates the individual characters of a string into a list. By default, the list values are separated by white spaces. You can however specify the separator as you wish using either a comma, hash-tag, or any other separator. The separator means that the string will be split at every occurrence on the separator. For instance, the code snippet below will split the string at every occurrence on a question marker `?`.
```py
# initial string
string = 'Hello?world?this?is?my?test?for?the?game'

# splitting the string
new_string = string.split("?")

# printing the new string
print(new_string)
```
```bash
['Hello', 'world', 'this', 'is', 'my', 'test', 'for', 'the', 'game']
```

- `join()`. This method combines all elements of a list specified by a separator into a single string. The method takes an iterable object as a parameter. An iterable object is one in which an individual element can be returned at a time.
```py
# iterable object
object = ['Hello', 'world', 'this', 'is', 'my', 'test', 'for', 'the', 'game']

# specify the separator
separator = ' '

# Join where the comma occurs
print(separator.join(object))
```
```bash
Hello world this is my test for the game
```

- `find()`. This method is used to determine if a character or a value exists in a given string. It returns the first occurrence of the value. If the value being looked for in the string is not found, the method returns -1.  For instance, if we want to find the occurrence of the word `world` in the string `hello world`, we can use the find method as below. The method returns 6 which is the occurrence of the string `world`.
```py 
# string
string = 'Hello world'

# Find the occurence of world
y = string.find('world')

print(y)
```
```bash
6
```
- `replace()`. This method replaces a phrase in a string with another phrase. The method takes 3 parameters; the string to be replaced, what to replace it with and the number of times to do the replacement.
> If the number of times the replacement is to be done is not stated, the method replaces all the occurrences of the phrase.
```py
# string
string = 'Hello world, this world are a nice world'

# replace world with people
y = string.replace('world', 'people')

# print the output
print(y)

```
```bash
Hello people, this people are a nice people
```

###  Python String Operations
Python has a wide range of operations to perform on strings. This makes strings in python have a wide application than strings in any other programming languages.

####  String Iteration
We can iterate through a given string using for loop. We can iterate to find the length of a string, count the occurrence of a given character or check whether a given letter is found in a string. To demonstrate this, we can loop through a string and print every character of that string.
```py
# Iterating through a string
for letter in 'Hello World':
    print(letter)

# count the number of letter
count = 0
string = 'Hello. how. is home from th lool above'
for letter in string:
    if(letter == 'o'):
        count+=1
print('The letter o occurs ' +str(count)+ ' times')   
```
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
The letter o occurs 7 times
```

#### Concatenation
String concatenation involves joining one string with another string. We can join two strings using the plus `+` operator.
```py
# concatenating Strings using the plus operator
# string 1
string1 = 'section'

#string 2
string2 = 'engineering'

#concatenated string
string3 = string1 + string2

#printing the output
print(string3)  
```
```bash
sectionengineering
```

#### Character Membership
This is a test done on a given string to determine if some character or sequence of characters exists in the string. If the character or sequence of character exists, the method returns true else false.
When testing for the existence of a character of a substring in a string, we use the keyword `in`.
```py
# input string 
inputString = 'Hello World'

# string to find
stringToCheck = 'World'
stringToCheck2 = 'Google'

# membership test
x = stringToCheck in inputString
y = stringToCheck2 in inputString

#print output
print(x)
print(y)
```
```bash
True
False
```
### Formatting strings
Formatting involves writing strings with other variables. There are three main methods of string formatting. We will discuss the three methods in a beginner-friendly way as below.

#### Using the `%` operator
If you have ever used `printf` in C language then this will be easier to understand. Just like in c, we use `%` to format the string by replacing what is in the variable with the operator as shown below.
```py
# Using % operator 
name = 'Dianne Sandra
print('My name is %s' %name)
```
```bash
My name is Dianne Sandra
```

#### Using the `str.format` method
This approach was introduced in Python 3.0 to enable programmers to handle complex string operations efficiently. It is a method inbuilt with the python strings class and can be accessed without any additional libraries. It provides string manipulation by substituting values and variables in strings.

You could also do substitution by variable names then specifying the name in its respective position. This comes in very helpful especially if you want to substitute more than one string.
```py
# using format option 
print ("{} is a good platform.".format("Section Engineering Education"))

# substitution using variable names
print ('{name} is {age} years old and she is a {occupation}'
.format(name = 'Dianne', age = 19, occupation = 'programmer'))
```
```bash
Section Engineering Education is a good platform.
Dianne is 19 years old and she is a programmer
```
#### Using `f-strings`
Introduced in python 3.6, F-Strings allow embedding python expressions into python strings. It has the name f-string because the string constants into which other expressions are embedded are prefixed by the letter `f`. Take a look at the example below.
```py
# emebeding variables into string constants using f-string
string1 = 'Hello'
string2 = 'world'

# print the embeded string
print(f'{string1}  {string2}')
```

```bash
Hello  world
```
Generally, the f-string combines the initial string with the expressions to form the final string which is then presented for printing.

### Conclusion
In this article, we learned about strings in python. We dug into how to initialize strings in python, operations that we can perform on the strings, the inbuilt methods of the python string class as well as the various methods of string formatting. This article will give the reader a head start to python strings when followed closely.

You can find the code snippets [here](https://github.com/diannesandra/python-strings).
