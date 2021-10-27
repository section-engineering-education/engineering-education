---
layout: engineering-education
status: publish
published: true
url: /storing-unicode-characters-using-character-literals-in-java/
title: How to Store Unicode Characters using Literals in Java
description: This tutorial will help the reader understand how to store Unicode characters using string literals in Java.
author: diana-peter
date: 2021-10-05T00:00:00-02:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/storing-unicode-characters-using-character-literals-in-java/hero.jpg
    alt: Storing Unicode Characters using Character Literals in Java Hero Image
---
Meaningless data elements are called literals because they have fixed values. In Java, literals are also known as constants. 
<!--more-->
It is possible to represent a wide variety of values with the help of literals. 

Strings in Java are objects. If we specify the same string in many variables, only a single string object will be stored in memory by Java's virtual machine.

There is an international standard for encoding characters. 

Characters can be represented in various forms such as text files. They can also be stored in Unicode or char data types. 

The three types of character encoding are `UTF-8`, `UTF-16`, and `UTF-32`. Web content should only use `UTF-8`.

To use literals, we should put them in single quotation marks.

Single quotes can be used to specify any printable character other than a backslash `\` as the character itself. `a`, `A`, and `+` are examples of these literals.

To represent characters that cannot be typed out in this manner, such as the backspace, escape sequences must be used instead. 

As with other character literals, the escape sequences should be wrapped in single quotes.

### Table of content
- [Encoding approaches](#encoding-approaches)
- [Advantages of Unicode](#advantages-of-unicode)
- [Unicode character literals](#unicode-character-literals)
- [More on Literals](#more-on-literals)

### Encoding approaches
#### 1. Using the char datatypes Unicode.
In this approach, we use single quotes to store Unicode characters in a char variable and then output the value.

The implementation is shown below:

```java
import java.io.*;
class Example {
    public static void main(String[] args)
    {
        char first1 = '/';
        System.out.println(first1);
        char second2 = '?';
        System.out.println(second2);
        char third3 = '1';
        System.out.println(third3);
        char fourth4 = '~';
        System.out.println(fourth4);
        char fifth5 = '$';
        System.out.println(fifth5);
        char sixth6 = 'a';
        System.out.println(sixth6);
        char seventh7 = 'A';
        System.out.println(seventh7);
    }
}
```

**Output**
```bash
/
?
1
~
$
a
A
```
#### 2. Attributing Unicode values to the char data types
Using single quotes, you'll establish a character variable, store a Unicode value in the variable, and then print it.

The implementation is shown below:

```Java
import java.io.*;
class Example {
    public static void main(String[] args)
    {       
        char first1 = '\u002F';
        System.out.println(first1);
        char second2 = '\u003F';
        System.out.println(second2);
        char third3 = '\u0031';
        System.out.println(third3);
        char fourth4 = '\u007E';
        System.out.println(fourth4);
        char fifth5 = '\u0024';
        System.out.println(fifth5);
        char sixth6 = '\u0061';
        System.out.println(sixth6);
        char seventh7 = '\u0041';
        System.out.println(seventh7);
    }
}
```

**Output**
```bash
/
?
1
~
$
a
A
```

#### 3. Assigning ASCII data types
A single quote will save the ASCII value in a variable, which will then be used to print the value, as demonstrated below.

```java
import java.io.*;
class Example {
    public static void main(String[] args)
    {
        char first1 = 47;
        System.out.println(first1);
        char second2 = 49;
        System.out.println(second2);
        char third3 = 126;
        System.out.println(third3);
        char fourth4 = 36;
        System.out.println(fourth4);
        char fifth5 = 97;
        System.out.println(fifth5);
        char sixth6 = 65;
        System.out.println(sixth6);
    }
}
```

**Output**

```bash
/
1
~
$
a
A
```

### Unicode character literals
To print Unicode characters, enter the escape sequence "u".

Unicode sequences can be used everywhere in Java code. As long as it contains Unicode characters, it can be used as an identifier. 

You may use Unicode to convey comments, ids, character content, and string literals, as well as other information. 

However, note that they are interpreted by the compiler early. Using the Unicode linefeed as part of a print statement would, therefore, cause an error in your source code.

The compiler would treat this issue as an actual linefeed that appears before the closing single quote of a character literal, which results in an error. 

The code below shows the error and the best use case:

```java
System.out.print( "\n" );   // This is okay
System.out.print( '\u000a' ); // This will give a compiler error
```

A linefeed is used to prematurely terminate the Unicode sequence. As discussed, a compiler interprets the Unicode sequence as a character literal.

### Advantages of Unicode
- Symbols for reading and writing character data are contained in a single code page when an application uses Unicode. This boosts the development speed.
- Each of the standard ASCII characters in UTF-8 is assigned its ASCII value. For ASCII applications, this feature simplifies the conversion process.
- It is possible for OpenEdge clients that utilize different code pages to read and write to a single UTF-8 database without any problems. 

One disadvantage of Unicode is that it requires more memory when it comes to storing and assigning variables.

### More on literals 
Using literals in your software allows you to specify precise values in your code.

When naming variables and assigning values, certain rules must be followed to make the program more readable. 

One advantage of literals is that they do not require significant computation. This means that they can be defined directly in the source code.

### Conclusion
Data is converted into letters and numbers using character encoding. This process instructs the computer on how to perform the conversion. 

During conversion, a letter, number, or symbol is assigned a numeric value. When dealing with Unicode files, some editors add byte-order markings or BOMs at the beginning of the file. 

### Further reading
- [Data flair](https://data-flair.training/blogs/literals-in-java/)
- [Informit](https://www.informit.com/articles/article.aspx?p=130880&seqNum=11)

---
Peer Review Contributions by: [Samuel Mwangi](/engineering-education/authors/samuel-mwangi/)