---
layout: engineering-education
status: publish
published: true
url: /js-splice-method/
title: Understanding the Slice(), Splice() and Split() methods in JavaScript
description: This article will debunk the Slice(), Split() and Splice() methods used in Javascript. These methods are often confused because of their similar nomenclature.
author: caroline-gatwiri
date: 2021-09-16T00:00:00-15:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/js-splice-method//hero.jpg
    alt: Understanding the Slice(), Splice() and Split() methods in JavaScript Cover image
---

### Introduction 
One of JavaScript in-built functions, which are often confused are:
- slice() method
- splice() method
- split() method 

The above functions are often confused because of their similar nomenclature. If you are a beginner and find them challenging, do not worry cause even experienced developers sometimes confuse them. 
Once we grasp how to use these built-in JavaScript methods, we can save much time when developing.

### Preferences
To follow along with this tutorial, you need to have some knowledge of how arrays work. You can read more about the arrays [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### JavaScript Arrays
To begin, you must first comprehend how JavaScript arrays work. In JS, we utilize arrays to store numerous data, much like in other programming languages. The distinction is that JavaScript arrays can hold multiple types of data at the same time.

On occasion, we must perform operations on those arrays. The most commonly used functions on arrays are slice (), splice (), and split() functions. You can declare an array in JavaScript as follows:

```js
let array_name = []; 
```
Let us create a new array containing a variety of data kinds. I will use the same example throughout the tutorial to help you learn the different uses of the slice (), spice(), and split() methods. 

The following is the example we will use:

```js
let myArray = [5, 6, 7, "pizza", 3.32, true];
```

The above syntax is an acceptable JavaScript use. The above array contains many data types, such as string, integer, and boolean.

#### Slice ( )
The slice( ) method duplicates a portion of an array and gives it back as a new array without changing the initial one.

```js
array.slice(start, to);
```

Start: Slice the array from the specified element index

To: Slice the array up to the specified index.

To show you how the slice() method works, let us follow the example below. We will focus on slicing the first three items from the array.

>Note: Indexing in an array starts from 0.

```js
array.slice(0, 3);
``` 
So the above code is going to remove the values from index 0 to index 2. This is where things may be a bit difficult. I must set the parameter to index 3 when slicing the first three elements. The last supplied element is not included in the slice() method.
Now let create a new code that will slice the array elements and also assign a newArray variable for the sliced Array.
```js
let myArray = [5, 6, 7, "pizza", 3.32, true];
let newArray = array.slice(0,3); 
```
the result will be
```js
(3)[5,6,7]
```
>Note: Slice() method can be used in strings.

### Splice ( )
This function's name is highly similar to the slice ( ) method, and developers are frequently perplexed by this naming resemblance. An array is changed by the splice() method by adding or removing items from the array. 
### Removing Elements Using Splice() Method
We must provide the index parameter as well as the number of elements to be eliminated to remove elements:
```js
array.splice(from, upto);
```
**From** is the place to start when it comes to eliminating elements. Elements with a lower index number will not be deleted from the supplied index., what I mean is:
```js
array.splice(2);  // Starting at index 2, every item will be eliminated.
```
**Upto** specify's till where the elements will be removed.
If the second option is not specified, it will eliminate
every array component from the beginning of the specified index.
As a second example, I set the second option to 1, which means that each time we execute the splice ( )function, elements starting at index two will be removed one by one:
```js
array.splice(2, 1);
```
Original array:
```js
let myArray = [5, 6, 7, "pizza", 3.32, true];
```
Results after:
After 1st call:
```js
array
(5) [5, 6, "pizza", 3.32, true]
```

After 2nd call:
```js
array
(4)[5, 6, 3.32, true]
```
From index 2, every piece will be eliminated until there is no more index 2.
### Adding Elements Using Splice() Method
No matter how many items we are needed to add to an array, we must always pass them through the splice() method.
The syntax for the splice method is:

```js
array.splice(index, number of items, item1, ..., itemN);//itemN means you can enter any number of items.
```
I'm adding m and n to the very beginning of the array as an example, and I'm not removing anything:
```js
array.splice(0, 0, 'm', 'n');
```
Result after you learn the above code:
```js
array
(8)["m","n",5,6,7,"pizza",3.32,true]
```
### Split ( )
For arrays, the slice( ) and splice( ) functions are used, but as for the strings, the split () function is used to divide the strings and return substrings after splitting the string. The substrings are returned in an array.
The split() method has some parameters which are not compulsory to use.
The split () method syntax is shown below.
```js
string.split(separator, limit);
```
Separator: This parameter shows how a string is separated, for example, by a comma or a character.
Limit: Sets a limit on the number of splits made with a given number of divides. 
It is important to note that the split() function won't work with arrays directly; therefore, we need to change the members of our array into a string.
Let's take a closer look at how it functions. Converting our array into a string requires the use of the toString( ) method:
Using the toString( ) method, let us convert our array into a string:
```js
let ourString = array.toString();
```
Result:

```js
let ourString = array.toString();
```
Result:
```js
ourString
"5, 6, 7, "pizza", 3.32, true"
```
We will now divide ourString down into three substrings, keep them to three, and return the results as an array:

```js
let ourNewArray = ourString.split(",", 3);
```
Result:
```js
(3)["5","6","7"]
```
ourString is separated by commas, as we can see. Only the top three elements are returned because we limit the split to three.


### Conclusion
Finally, we discovered the following:
#### Slice ( ) method
- Slice() method copies an array's contents and returns a new array of them.
- Nothing happens to the original array when using the slice() method.
- array. slice begins slicing from (start...to) and continues until the supplied index is reached.
- The “to” index argument is not included in Slice.
- Slice() method can use both arrays and strings
#### Splice ( ) method
- Use this function to add/remove entries from an array.
- Returns a list of elements that have been removed from the list.
- The array is changed after using the splice() method.
- array.splice is used to add elements (index, number of items, item1, ..., itemN).
- array.splice is used to remove elements (from, upto).
- It's just good for arrays; this means it can't be used for strings.
#### Split ( ) method
- Substrings are created by dividing a string into substrings using the split function.
- Returns the string as an array.
- It accepts two parameters, both of which are optional.
- Split() function does not affect the original string.
- Split () method can only work on strings.

I'm hoping that the slice(), splice(), and split() methods will no longer cause problems.

