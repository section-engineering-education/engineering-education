---
layout: engineering-education
status: publish
published: true
url: /working-with-bash-arrays/
title: Working with Bash Arrays
description: This article provides a detailed explanation of what bash arrays are, how to perform key operations using bash arrays with detailed examples, and how to differentiate bash arrays from other similar bash concepts with examples and code snippets.
author: anita-achu
date: 2022-07-20T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/working-with-bash-arrays/hero.png
    alt: Bash image hero image
---
As a programmer, you may have come across or used the command line when building a tool, or for scripting. Bash is one of the most common command-line interpreters used for writing scripts.
<!--more-->
You can create variables, run for loops, work with arrays, etc with bashing scripting. However, we will focus on working with arrays in bash. Arrays in bash scripting are quite powerful for storing multiple data and fundamental data structures.

In this tutorial, we will walk you through what bash arrays are, the distinction between bash arrays and other concepts, and how to perform key operations on them with detailed examples.

Let’s dive in!

### What are bash arrays?
An array is a collection of multiple elements of a similar data type. However, this is in relation to other programming languages. Arrays are unique in Bash. A Bash array is a collection of elements of different data types. Bash arrays can contain values of various data types: strings, numbers, etc.

For example:

Let’s define an array,

```bash
my_array=(1 2 3 4 5...10)
```

The example above is a collection of elements of a similar data type, *Numbers.*  Although this is an array but not a bash array.

```bash
my_array=("one" 2 3 4 "five"...10)
```

This example, however, contains a collection of elements of different data types. This is a *Bash array*. There is no limit to how large an array may be and does not need the elements to be indexed or assigned in a logical order.

Having understood what a bash array is, let’s look into more concepts and how to work with bash arrays.

### Bash array vs. String

Bash also has good support for string operations. Bash like every other programming language and scripting tool presents strings as a data type just like numbers or integers.

A string is a set of values stored as characters rather than numbers. This set of characters could include numbers, but they are contained in a string as characters, not integers. Bash array, on the other hand, stores a set of values of different data types, integers, strings, words, etc.

Example of a string:

```bash
string1="Hello world", "Welcome", "12", "two"
```

The example above contains a set of characters, which includes words, and numbers but all present as a string. *One data type!*

Example of bash string:

```bash
my_array=("one", 2, 3, 4, "five",...10)
```

A bash array contains different data types, strings, numbers, etc.

### Bash Array vs. List
In Bash, there is no data type called **list**. Bash list simply means, a sequence of filenames or items in a bash loop separated by an operator.

Bash arrays on the other hand are a collection of elements of different data types. However, numerically indexed arrays are often referred to as list.

Example of a list,

```bash
list1 && list2
```

### How to declare array in bash
Bash array is declared based on the types of array. There are two types of bash arrays, the **numerically indexed array,** and **the associative array.**

The **numerically indexed array** is an array in which the values are integers(numbers). To declare a numeric array, you must first use the `declare` command, then specify the type of array. A lower case, `-a` is used to specify a numeric array.

A numeric array can be declared in the following way:

```bash
declare -a my_array
```

In the example above, we declared a numeric array with the name my_array.

The second type of array is the **associative array.** This type of array has its values represented by strings. Just like the numeric array, an associative array is declared using the `declare` command, followed by the type of array. An upper case `-A` is used to specify an associative array.

```bash
declare -A my_array
```

### How to add a variable to a bash array
As stated above, we can add a variable to an array by specifying what type of array it is, using their different keys. Next, initialize the array before adding a new variable. 

As shown in the example below:

```bash
# Declare the array
declare -a new_array=("orange", "pear", "grape", "apple")

# Initialize the array
new_array=("Fruits")

# Add a new variable
new_array[3]=("Apple")
```

For **indexed arrays**, we can also add an element by adding it to the end of the array, using the += operator. 

Example:

```bash
# Declare the array
declare -a new_array=("orange", "pear", "grape", "apple")

# Initialize the array
new_array=(Fruits)

# Add a new variable
new_array+=(Apple)
```

### How to reference array elements
An element in an array can be referenced by adding the index of the element. For example, to reference an element in the array below:


```bash
# Declare the array
declare -a new_array=("orange", "pear", "grape", "apple")

#reference element
echo ${new_array[2]}
```

**Output:**

```bash
grape
```

>Note: An array index begins at 0.

In addition, you can also reference all the elements in an array, by adding `*` or `@` as the index.

Run these scripts to execute:

```bash
# declare the array
declare -a new_array=("orange", "pear", "grape", "apple")

# reference all elements
echo "${new_array[@]}"
```

**Output:**

```bash
orange
pear
grape
apple
```

### How to remove bash array elements
An element or the entire array can be removed using the `unset` command. If you want to delete just a single element, you must specify the index of the element you intend to remove. 

Run the following script to remove an element in an array:

```bash
# declare the array
declare -a new_array=("orange", "pear", "grape", "apple")

# remove an element
unset new_array[2]
```

**Output:**

```bash
orange
pear
apple
```

Removing an entire array is much easier. All you have to do is add the name of the array to the `unset` command.

```bash
# remove entire elements in an array
unset my_array
```

### How to print bash array
The `echo` command is used to print an element or elements in an array. As earlier stated, you can use either the `@` or `*` command to reference all the elements in an array. Appending this to the `echo` command would print all the elements in an array. 

Run these commands:

```bash
# declare the array
declare -a new_array=("orange", "pear", "grape", "apple")

# print all elements
echo "${new_array[@]}"
```

**Output:**

```bash
orange
pear
grape
apple
```

However, if you want to print a single element in an array, specify the index of the element.

```bash
# Declare the array
declare -a new_array=("orange", "pear", "grape", "apple")

# print element
echo ${new_array[2]}
```

**Output:**

```bash
grape
```

### How to pass array to function
You can pass an array to a function using the `${array[@]}` command. This command pass the entire array. However, if you wish to pass only an element in an array, replace the `@` command with the index of the element you wish to pass.

Let’s pass an array in a function.

```bash
function array_echo() {
arr=("$@")
for i in "${arr[@]}"; do
echo -n "$i "
done
}
my_array=(1 2 3 4 5 )
array_echo "${my_array[@]}"
```

**Output:**

```bash
1
2
3
4
5
```

### Conclusion
Bash array is a great tool for storing multiple types of data. So far in this tutorial, we covered the basics of bash arrays, the types of bash arrays, and how to perform key operations on them.

Although its syntax is different and may seem complex, with constant usuage, you will become familiar with the syntax.

The scope of this tutorial is just the basics you can dive deep into other automation you can execute using bash arrays and other bash operations.

I hope you had a good time learning!

Happy coding!🙂
