### Understanding PHP Callback functions

In Php programming, some functions are usually passed as arguments in other functions. Such functions are known as callback functions and are often referred to as Callbacks and are usually denoted by a callable type declaration.  A callable type is a data type in PHP. Any function can become a callback function every time it is used inside another function in the same program.

### Table of contents

1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Can callback functions be used in user defined functions?](#can-callback-functions-be-used-in-user-defined-functions)
4. [Practical use of callback functions in PHP](#practical-use-of-callback-functions-in-php)
5. [Methods of implementing callback functions in PHP](#methods-of-implementing-callback-functions-in-php)
6. [Conclusion](#conclusion)

### Prerequisites

A reader should have prior knowledge of the following to understand this article:

- A beginner's understanding of PHP as a programing language.
- A beginner's understanding of programming in general.

### Introduction

For a function to be used as a callback function, the function name is passed as an argument in the function. The function should always be in string form.  A callback function usually takes two arguments.
Below is a program code illustration showing how callback functions can be used in PHP programming:

```php

<?php
function Your_callback_function($fruit) 
{
  return strlen($fruit);
}

$strng= ["lemon", "mango", "pineaple", "passion"];
$lngth = array_map("Your_callback_function", $strng);
print_r($lngth);

?>
```

### Can callback functions be used in user-defined functions?

It is always very possible for callback functions to be used in user-defined functions. This is just a little different from the normal library functions in PHP and is achieved by just adding parenthesis to the variable of the function being called.
Below is a program code illustration showing how callback functions can be used with user-defined functions:

```php

<?php
function exclamation($strng)
{
  return $strng . "!";
}

function question($strng) 
{
  return $strng . "?";
}

function printFrmt($strng, $frmt) 
{
  echo $frmt($strng);

}

// passing callback functions

printFrmt("Good morning", "exclamation");
printFrmt("Good morning", "question");

?>
```

### Practical use of callback functions in PHP

Callback functions are so common in PHP coding. This is because of its ability to allow reusability of code by allowing the injection of your code in another function as it executes. Below are some real-life examples where callback functions came in handy:

- Used in Execution of transactions in a Database- Callback functions can be used to manipulate a database and output results.

- Used in Output buffering- Callback functions allow for you to return output in string form as opposed to other functions. It is advisable to output your results in 'string'.

- Used in Caching - Callback functions allow for cashing of resource calculations and database queries.

### Methods of implementing callback functions in PHP

There are several ways of implementing callback functions. Below are some of the methods of implementation of callback functions with illustratory examples:

1. Standard callback

A standard callback is a basic method of implementation where the callback function is used as a string inside the argument parenthesis.

```php

<?php
  
// Demonstrating a callback function
  
function MyFunction() 
{
    echo "This is my demo \n";
}
  
// Using a Standard callback
Call_The_function('MyFunction');
?>
```
This will print out the sentence "This is my demo". The function  `Call_The_Function()` will call `MyFunction()` which echos out the sentence.

2. Static class method callback

This callback method is used with array arguments that contain class string name and the method to be called:

```php 

<?php
  
class Section 
{
  
    // Print string
    static function MyFunction() 
    {
        echo "I write for section \n";
    }
}
  
class Articles extends Section 
{
  
    static function MyFunction()
    {
        echo "Section Article \n";
    }   
}
  // Callback
call_function(array('Articles', 'MyFunction'));
  
call_function('Articles::MyFunction');
  
call_function(array('Articles', 'new::MyFunction'));

?>
```

3. Object method callback

This callback method is used with array arguments that contain variables of the object and methods to be called.

 ```php 

 <?php
  
class Section 
{
  
    static function MyFunction() 
    {
        echo "section \n";
    }
  
    public function __invoke() 
    {
        echo "invoke section \n";
    }
}

// object Class 
$object = new section();
  

call_funcion(array($object, 'MyFunction'));
  
 
call_function($object);
  
?> 

```

3. Closure callbacks

```php

<?php
  
$prnt_function = function($strng)
{
    echo $strng."\n";
};
  
$string_array = array("section",  "Articles");

  // Callable closure
array_map($prnt_function, $strng_array);
  
?>
```

### Why use callback functions

Callback functions come in handy in the following circumstances:

- When there is a need to reuse code hence saving on time.
- When you want to use functions that are likely to be called in another function at a later stage in the same program.

- When you want to ensure a function is not executed before a task completes its execution.

### Conclusion

Callback functions enable code reuse and opening a wide range of activities to be done to a function. This, therefore, show the importance of the callables hence more studies should be done on this topic for more understanding.


Blissful reading
