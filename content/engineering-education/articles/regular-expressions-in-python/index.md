---
layout: engineering-education
status: publish
published: true
url: /engineering-education/regular-expressions-in-python/
title: Regular Expressions in Python
description: This tutorial will go through regular expressions (RegEx) in Python. In Python a regular expression is the pattern compiled into a series of bytecodes that is executed by an implementation of the finite state machine in C.
author: prashanth-saravanan
date: 2020-12-19T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/regular-expressions-in-python/hero.jpg
    alt: Regular Repression in Python example image
---
A Regular Expression (RegEx) has put a lot of programmers in a bit of a hassle. A casual conversation with a professional with 15 years of programming experience under his belt revealed that he practiced RegExes everyday for a year to wrap his head around the syntax without having to look it up.
<!--more-->
This is a small attempt from my end (hopefully not a disastrous one) to dive into regular expressions using Python.

### Table of Contents
- [Introduction](#introduction)
- [Reason for Regular Expressions](#reason-for-regular-expressions)
- [How do Regular Expressions work?](#how-do-regular-expressions-work)
- [Syntax of Regular Expressions in Python](#syntax-of-regular-expressions-in-python)
- [Email Validation using Regular Expressions](#email-validation-using-regular-expressions)
- [Conclusion](#conclusion)
- [Further Readings](#further-readings)

### Introduction
A Regular Expression (or RegEx) is a tiny programming language in itself. It's more of formal grammar used to parse strings than a programming language. Like any other programming language, RegEx has a syntax and a specific RegEx can be used to match all strings following that specific format. 

Webscraping and data cleaning are among the [numerous applications](https://www.analyticsvidhya.com/blog/2020/01/4-applications-of-regular-expressions-that-every-data-scientist-should-know-with-python-code/#:~:text=Regular%20Expressions%20are%20useful%20for,data%20extraction%20and%20what%20not!) of this string-matching engine. 

The question begs to be asked - why go for a complex, difficult-to-interpret piece of code when one can easily iterate through the string and check for the conditions?

### Reason for Regular Expressions
Remember those websites where your password must be between 8-12 characters with at least a capital letter, a small letter, a number and a special character? You miss any one of those, and your password is invalid. 

In the backend, it matches every attempt you take at making a password with a RegEx and ensures your password follows the right format. The computational resources wasted while scaling up the format checks when if-elif-else comparisons are used instead of RegExes is quite significant.

And it doesn't just stop there.

With the help of RegExes, your code becomes cleaner. Faster computation translates to faster validation. And RegExes are fairly standard. If you're able to grasp a specific implementation of a RegEx, all it takes is minor tweaks to switch between different implementations. 

RegExes can be used in multiple ways, such as: replacing substrings, finding substrings, splitting strings - all at the expense of a set of brackets and alphabets and symbols. 

What started off as a theoretical concept in computer science, has helped wall street financial analysts save thousands of man hours. Especially when extracting relevant financial and statistical data from from relevant documents like quarterly reports and quarterly earnings.

In a nutshell, the effort's worth it.

### How do Regular Expressions work?
Performance enhancement? Check.
Compact code? Check.
Efficient and effective? Check.

But how do these work?

The key behind these enhancements is a powerful concept called Finite State Machines. A [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine) is an abstract machine that contains states. These states can be initial states, final states or intermediate states. A [state-transition table](https://en.wikipedia.org/wiki/State-transition_table) takes the present state as inputs and returns the appropriate output event - but not without transitioning through the other intermediate states. 

There are two types of FSMs - [Deterministic Finite Machine](https://www.tutorialspoint.com/automata_theory/deterministic_finite_automaton.htm) and [Non Deterministic Finite Machine)](https://www.tutorialspoint.com/automata_theory/non_deterministic_finite_automaton.htm). The working of a vending machine can be represented as a Finite State Machine, where certain steps must be followed in a specific order to dispense candy according to the amount inserted in the slot. 

![Finite State Machine](/engineering-education/regular-expressions-in-python/fsm.png)

*Source: [FSM of a Vending Machine](http://osr600doc.sco.com/en/SDK_c++/_What_is_a_Finite_State_Machine.html)*

The figure above is a state diagram of a vending machine. The circles denote the states where zero is the initial state (no money implies no candy) and the termination state is either 15 cents or 20 cents. 

Notice how a process, after reaching the end state is reverted back to its initial state. A click here represents an increase by 5 cents from one state to another, and depending on the amount, the appropriate candy is dispensed. A basic yet understandable implementation of a FSM in Python can be found [here](https://www.python-course.eu/finite_state_machine.php).

A RegEx engine works in a similar way, but with a lot more states and a lot more transitional changes between two or more states.

In Python, when a regular expression is written, the pattern is compiled into a series of [bytecodes](https://opensource.com/article/18/4/introduction-python-bytecode) that is executed by an implementation of the finite state machine in C. 

Although a bit out of scope and not imperative, a rough idea of how a RegEx comparison engine executes a certain RegEx could reflect in writing expressions in a certain way to produce bytecodes that run faster. 

Writing expressions in a certain way? What does that mean?

### Syntax of Regular Expressions in Python
To lay the foundation, most characters and letters are matched to themselves. That means "p" is matched to the character "p". However, there are exceptions to this, and these characters are called metacharacters. 

Here are the list of metacharacters:

`
. ^ $ * + ? { } [ ] \ | ( )
`

Before we get into the syntax, let's import Python's RegEx library:

```py
import re
```

Python's RegEx module offers a set of functions that search for a string for a match.

- findall: Return a list of all non-overlapping matches in the string.
- search: Looks for a match to the pattern and returns a match object, or None if no match was found.
- split: Splits the source string by the occurrences of the pattern and returns a list containing the resulting substrings.
- sub: Replaces one or many matches in the source string.

The metacharacteres mentioned above can be interpreted as follows:

1. Square brackers denote a character class, a set of characters that are to be matched. "[abef]" maps to any one of "a", "b", "e", "f". If the comparison is for a character within a range, the starting and the ending characters must be specified within the square brackets, separated by a "-". "[a-z]" maps to any character in lowercase and "[A-Z]" maps to any character in uppercase.

    ```py
    test_string = "I d0n't want any num6er 1n th1s 5tr1ng"
    regex = re.findall("[0-9]",test_string)
    if regex:
        print("There is(are) number(s) in the string")
    else:
        print("There are no numbers in this string")

    # Output - There is(are) number(s) in the string
    ```

2. Another rule that metacharacters enforce is that they do not have any effect in a character class unless it starts with a metacharacter. A complement of a character class is denoted by the metacharacter "^". So, "[^abc]" will match with any character except "a", "b" and "c" whereas "[abc^]" will match with characters "a", "b", "c" and "^" even though "^" is a metacharacter. Note that the complement happens only within a character class.

    ```py
    import re
    test_string = "I doubt I can. It’s a major part of many many words."
    regex = re.search("[^e]",test_string)
    if regex:
        print("There is no 'e' in the string")
    else:
        print("There is atleast one 'e' in this string")

    # Output - There is no 'e' in the string

    test_string = "2^4 equals 16"
    regex = re.search("[z^]",test_string)
    if regex:
        print("There is either a z or a ^ in this string")
    else:
        print("There is no z or ^ in this string")

    # Output - There is either a z or a ^ in this string
    ```

3. A combination of character classes is allowed in RegExes. "[0-2][0-4]" matches with any number between 00 and 24, "[ac][b-d]" matches with the strings "ab", "ac", "ad", "cb", "cc" and "cd", and "[a-zA-Z]" returns a match for any character between a to z, lowercase or uppercase. The same applies to numbers as well.

    ```py
    test_string = "Brutus stabbed Caesar"
    regex = re.search("[aeiou][aeiou]",test_string)
    if regex:
        print("There are consecutive vowels in this string")
    else:
        print("There are no consecutive vowels in this string")

    # Output - There are consecutive vowels in this string

    print(regex)

    # <_sre.SRE_Match object; span=(16, 18), match='ae'>
    ```

    The span parameter in the RegEx object displays the position of the match (in this case, "ae").

4. "^" within a string matches with a string that starts with the sequence of characters after "^" and "$" within a string matches with a string that ends with the sequence of characters before "$".

    ```py
    names = ["Steve Aoki","Joe Willink","Steve Carrel","Jim Ross"]
    for name in names:
        if re.search("^Steve",name):
            print(name)

    # Output - Steve Aoki
    #          Steve Carrel

    names = ["Evan Smith","Gary Neville","Jamie Carragher","Steve Smith","Elaine Smith"]
    names_ending_with_smith = [name for name in names if re.search("Smith$",name)]
    print(*names_ending_with_smith, sep = ", ")

    # Output - Evan Smith, Steve Smith, Elaine Smith
    ```

5. A number within "{ }" is used to specify the exact number of occurences to be checked.

    ```py
    test_string = "Too maaaany aaa's becaaause the keyboaaard is broken"
    regex = re.sub("a{3}","a",test_string)
    print(regex)

    # Output - Too maany a's because the keyboard is broken
    ```

    Notice that there are two a's in the word 'many' in the output. This is because the expression replaces three a's consecutively with a single 'a' and the word 'maaaany' in the source string has 4 a's.

6. "." is matched against any character.

    ```py
    test_string = "the ball is over there"
    regex = re.findall("t...e",test_string)
    print(regex)

    # Output - ['there']
    ```

7. Finally, the "\\" is an important metacharacter. It is used to represent pre-defined character sets that are common. The following are a few special sequences:

- \d - Matches decimal numbers; same as [0-9].
   
- \D - Matches non-digit characters; same as [^0-9].

- \Z - Matches the specified characters at the end of the string;

- \s - Matches whitespace characters; same as [\t\n\r\f\v].

- \S - Matches non-whitespace characters; same as [^\t\n\r\f\v].

- \w - Matches alphanumeric characters; same as [a-zA-Z0-9].

- \W - Matches non-alphanumeric characters; same as [^a-zA-Z0-9].

The following is another version of a previous example:

```python
    test_string = "I d0n't want any num6er 1n the 5tr1ng"
    regex = re.findall("\d",test_string)
    if regex:
        print("There is(are) number(s) in the string")
    else:
        print("There are no numbers in this string")

    # Output - There is(are) number(s) in the string
```

### Email validation using Regular Expressions
Let's put what we've grasped up to this point to the test. Let's try to build a regular expression that would check if a given email address is valid or not. 

The format of an email ID goes like 'name'[at]'email'[dot]'suffix' with the following constraints:
- The string "name" can be alphanumeric without capital letters and only allow special characters "." and "_". 
- The string "email" is strictly alphabetical (no numbers or special characters).
- The string "suffix" is strictly alphabetical (no numbers or special characters) with a length of 2 or 3.

Since the email ID starts with the 'name' string, we use "^". Alphanumeric without any capital letters forces the character set to be [a-z0-9]. "[\\.\_]" ensures that no other special character is allowed in the first part of the name. 

Considering the possibility that "name" doesn't always need to have a special character, "?[a-z0-9]" is added to the combination of [a-z0-9] and [\\.\_], with "?" representing 0 or more occurences of the preceeding expression. 

The RegEx matching the string "name" would be ^[a-z0-9]+[\\._]?[a-z0-9].

The very constrained string "email" can be represented by "\w+" and the string "suffix" is represented by "\w{2,3}$", the "$" to denote the end and {2,3} for the number of characters from the character set "\w".

Piecing it all together, our email ID validator goes like:

```py
'^[a-z0-9]+[\\.\_]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
```

Let's test it out,

```py
email_ids = ["john@example.com", 
            "john@ex.ample.com", 
            "john.doe@example.com",
            "john_doe@example.au", 
            "john.doe@example.fred"]

regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
for email in email_ids:
    if re.findall(regex,email):
        print(email, "-", "Valid")
    else:
        print(email, "-", "Invalid")

# Output - john@example.com - Valid
#          john@ex.ample.com - Invalid
#          john.doe@example.com - Valid
#          john_doe@example.au - Valid
#          john.doe@example.fred - Invalid
```

...it works perfectly!

### Conclusion
Regular Expressions is a tool that comes in handy to avoid messy code and improve performance. Although it can be a bit tricky, putting in the effort to understand the syntax would be an advantage and a huge trick in your arsenal, especially while performing intense string manipulation tasks like web scraping and programming in general.

### Further Readings
1. [W3Schools](https://www.w3schools.com/python/python_regex.asp)

2. [Programiz](https://www.programiz.com/python-programming/regex)

3. [Python Official Docs](https://docs.python.org/3/howto/regex.html)

4. [O'Reilly](https://www.oreilly.com/library/view/mastering-regular-expressions/0596528124/?CMP=AFC-ak_book&ATT=Mastering+Regular+Expressions)

5. [Loggy](https://www.loggly.com/blog/regexes-the-bad-better-best/)

6. [Improve your Regex Performance](https://www.loggly.com/blog/five-invaluable-techniques-to-improve-regex-performance/)

7. [Rexegg](https://www.rexegg.com/)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
