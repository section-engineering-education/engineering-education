### Introduction

A PHP Regular Expression, commonly known as RegEx, is a sequence of letters that form a search pattern. When searching for data in text, one can use this search method to define what he wants.

A RegEx can be a single letter or a more complex pattern. These expressions can be used to perform all types of text search and replacements.

### Table of contents

 1. [Introduction](#introduction)
 2. [Prerequisites](#prerequisites)
 3. [Syntax of PHP RegEx](#syntax-of-php-regex)
 4. [Examples of RegEx functions](#examples-of-regexfunctions)
 5. [Modififers used with RegEx functions](#modififers-used-with-regex-functions)
 6. [PHP RegEx patterns](#php-regex-patterns)
 7. [PHP RegEx Grouping](#php-regex-grouping)
 8. [Conclusion](#conclusion)


### Prerequisites
For a reader to understand this content, he or she should have a prior understanding of the following:

- A beginner's understanding of PHP programming in general. 
- A text editor for trying out the snippets. 


### Syntax of PHP RegEx

PHP RegEx functions are made of delimiters, pattern and variation of choice. Below is the RegEx functions' syntax:

```php
$ exp = "/ category / i";
```

In the example above, `/` with the delimiter, the `category` is a searchable pattern, and finally, the `i` is used to make the search case insensitive. The delimiter can be any character. The most common delimiter is slash forward (/). When the search pattern is made up of `/`, it is advisable to use other delimiters like `#`.

### Examples of RegEx functions

There are numerous functions in PHP that are used together with the RegEx functions. The functions of `preg_match ()`, `preg_match_all ()` and `preg_replace ()` are some of the most widely used:

- The `preg_match ()` function

This function is used to determine whether a pattern is found in the subject of the search or not. It outputs a one when the search is positive and a zero if the search is negative.
Below is a code illustration that shows how this function is used:

``` php
<? php

//declare varriables
$string1 = "In which category are you?";
$pattern = "/ category / i";

//initiate the search and print the result
echo preg_match ($pattern, $string1); 

?>
```

This code searches for the pattern `category` in the string 'In which category are you?' and highlights the instances found.

- The `preg_match_all ()` function

This function is used to count the number of times the pattern is found in the search criteria. It outputs the number of times the pattern was obtained in the search criteria. The number can always be a zero when the pattern is not found.
Below is a code illustration that shows how this function is used:

``` php
<? php

//Declare varriables
$string2 = "All the ladies are beautiful though Ruth is the most beautiful";
$pattern = "/ beautiful/ i";

//Initiate search and print results
echo preg_match_all ($ pattern, $ string2);
?>
```

This code searches for the pattern `beautiful` in `string2` and returns the number of positive matches.

- The `preg_replace ()` function

This function is used for replacement. It searches for criteria and replaces all of the instances with a given word. This function outputs a new thread from which the search pattern has been replaced with a specified pattern.

``` PHP

<? php

//Declare varriables 
$string3 = "Limuru is a cold place";
$pattern = "/ cold / i";

//initiate search and print result
echo preg_replace ($pattern, "warm", $ string3); 
?>
```

This code searches for all the instances of the pattern `cold` in string3, replaces them with the term warm, and displays the output.


### Modififers used with RegEx functions

Modifiers are used to transpose how a search is carried out. Below are some of the modifiers discussed briefly.
- u - This modifier is used to allow for searches on patterns encoded with the UTF-8.
- i - This modifier allows for case insensitive searches on a string.
- m - This modifier allows for searches on multiple lines at the same time.

### PHP RegEx patterns

This describes how the search patterns are decided. A pair of box brackets are used to enclose a list of characters. The brackets specify the range of the search as discussed below:

1. [^abd]- This specifies that any character can be found except those in the bracket list.
2. [cdef]-This requires that one character from the list in the brackets should be found in the string during a search.
3. [100-200]- This specifies that one number can be found from the specified range of 100 to 200.


### PHP RegEx Grouping

Brackets () are used for the grouping of parts of search patterns. They also come in handy in cases where quantifiers are being added to the search patterns.
An example is used to illustrate it as shown below:

Use the collection to search for the word "hippopotamus" by searching for hip followed by two "po" conditions:

```php
<? php

//varriable declaration
$string4 = "I saw an hippopotamus last night.";
$pattern = "/ hip (po) {2} / i";

//search and output
echo preg_match ($pattern, $strring4); 
?>
```

This code first searches for the phrase "hip" and then finds 2 phases of  "po"  and outputs the result.

### Conclusion

Having discussed the different PHP RegEx in this write-up, we now understand well why regular expressions are essential in PHP and how much they eased everyday tasks that would otherwise prove to be complicated.

