---
layout: engineering-education
status: publish
published: true
url: /php-exception-handling/
title: PHP Exception Handling
description: Exceptions are disruptions of the normal flow of program execution due to unexpected outcomes from the program. This article will walk the reader through php exception handling.
author: mackrine-awino
date: 2021-09-01T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/php-exception-handling/hero.jpg
    alt: Php exception handling image
---
Exceptions are disruptions of the normal flow of program execution due to unexpected outcomes from the program. Exceptions are basically like typical programming errors. However, unlike standard errors, exceptions can be handled by the program itself.
<!--more--> 

### Table of contents
- [Prerequisites](#prerequisites)
- [Intoduction to Exception Handling](#introduction-to-exception-handling)
- [Occurrences when an exception is triggered](#occurrences-when-an-exception-is-triggered)
- [Why use exception handling over error handling?](#why-use-exception-handling-over-error-handling)
- [Exception handling methodologies](#exception-handling-methodologies)
- [Conclusion](#conclusion)

### Prerequisites
A reader should have prior knowledge of the following to follow along with this article:
- A beginner's understanding of [PHP programing language](/engineering-education/search/?q=PHP).
- A beginner's understanding of programming in general.

### Introduction to exception handling
Exception handling is the handling errors that occur during program runtime and are usually the same in all programs. When an error occurs, exception handling changes the flow of the program. These errors are commonly referred to as exceptions.

The following keywords are used in handling exceptions in PHP:

#### try
This is the block where the code that is likely to have an exception is typed. If the code has exceptions during runtime, the exception is caught and corrected in the catch block. The `try block` is usually used with the `finally` or the `catch` block. A try block is usually used together with one or many catch blocks in a program.

#### catch
Whenever an exception is thrown in the `try block `of a PHP program, a code in the `catch block` is executed in an attempt to handle the exception. The `catch block` cannot exist on its own. Instead, it works together with the `try block`.

#### throw
The throw keyword is used to throw exceptions in a PHP program. It also allows listing all the exceptions thrown by a particular function and cannot be handled. The throw keyword cannot be used without a `catch block`.

#### finally
The `finally block` is used in PHP clean-up activity. This block contains the core of the code and is responsible for its execution. This block can be used as a `catch block` and is always executed even if an exception is not handled.

Below is a diagrammatic representation of the flow of events during exception handling:

![diagram](/engineering-education/php-exception-handling/Flowfile.png)

### Occurrences when an exception is triggered
Whenever an exception is triggered during program runtime, the following events occur:

1. The current code is saved.
2. Execution of the code is handed over to an exception handling function that is usually predefined.
3. The exception handling function then proceeds to either resume with executing the saved code, begin executing from another location in the code or even end the program's execution entirely. This decision is made based on the nature of the exception.

### Why use exception handling over error handling?
Exception handling has the following advantages over error handling:

- Error type groupings. Exception handling allows for errors to be grouped into classes and also classify them into types. This cannot be achieved with normal error handling. 
- Separation of error handling code from regular code, Exception handling using try...catch keeps program code separate from error handling code hence making the code clear and easily readable.

Exceptions can be handled in different ways and discussed below:

### Exception handling methodologies
#### 1. Using basic exceptions for error handling
This involves the use of `try...catch` blocks to handle exceptions every time an exception is thrown in a program code. Sometimes an exception is thrown but is not caught; this returns an error. 

Below is an example of code where the exception is not caught and, the output is an error:

```PHP

<?php

//function created
function ConfirmNumber($Num) 
{
  if($Num>1) 
  {
    throw new exception ("The number must be 1 or below");
  }
return True;
}

ConfirmNumber(2);

?>

```

The snippets above output an error message because the exception has been thrown, but the catch block has not been included in the code. Hence the try block cannot exist without the catch block.  

To avoid the above-demonstrated error, the correct blocks should be used in the code as shown below:

```PHP

<?php
// Create function ConfirmNumber
function Confirm_Number($Num) 
{
  if($Num>1) 
  {
    throw new exception ("The number must be 1 or below");
  }
  return True;
}


try
 {
  Confirm_Number(2);

  
  print 'The number is 1 or below'
}


catch(Exception $e) 
{
  echo 'Message: ' .$e->get_message();
}
?>

```

The above code throws an exception and catches it using the try and catch blocks successfully.

#### 2. Creation of a special customized exception class
This involves the creation of a custom class with functions that can be called in case of the occurrence of an exception. This customized exception class is expected to borrow properties from PHP's exception class plus other added functions.

Below is a code illustration of how an exception class can be created:

```PHP

<?php
// Decleare varriable emailAddress
 $email_Address = "awinomackie@gmail.com";

// customized class creation
class customizedException extends exception
 {
  // function error_message creation
  public function error_Msge() 
  {
   
    $error_Message = 'Error in the line '.$this->getLine().':'.$this->getMessage().' is not a valid E-Mail';
    return $error_Message;
  }
}
//exception handling block
try 
{
  // validate if the email address is correct
  if(filter_var($email_Address, FILTER_VALIDATE_EMAIL) ==FALSE) 
  {
   
    throw new customizedException($email_Address);
  }
}

catch (customizedException $e) 
{
 //print error message
  print $e->error_Msge();
}
?>

```

#### 3. Using multiple instances of exceptions
This involves the use of multiple exception handling classes to check for many exception instances.

Below is a code illustration of multiple instances of exceptions in use:

```PHP

<?php
//declare varriable and initialize
$email_Address = "awinomackie@gmail.com";

// exception class creation
class customizedException extends Exception 
{
  //create function Error _message
  public function error_Msge() 
  {
  
    $error_Message = 'Error in the  line '$this->getLine().': <b>'.$this->getMessage().' is not a valid E-Mail';
    return $error_Message;
  }
}

try
 {
//validate the email address
  if(filter_var($email_Address, FILTER_VALIDATE_EMAIL) == FALSE)
  {
   
    throw new customizedException($email_Address);
  }
 
  if(strpos($email_Address, "example") !== FALSE)
  {
    throw new Exception("$email_Address is an example e-mail");
  }
}
// outputs
catch (customizedException $e) 
{
  print $e->error_Msge();
}

catch(Exception $e) 
{
  print $e->get_Message();
}
?>

```

The code above is used to test two conditions, and exceptions are thrown if any of the conditions are not met.

#### 4. Re-throwing exceptions
This occurs when there is a need to handle an exception in a different way other than the standard way of exception handling. Hence an exception is thrown for the second time in a catch block.

Below is a code illustration of exception re-throwing:

```PHP

<?php
// varriable declaration
$Email = "awinomackie@gmail.com";

// exception class creation
class customizedException extends Exception 
{
  //create function
  public function error_Msge() 
  {
    
    $error_Message = $this->get_Message().' is not a valid E-Mail.';

    return $error_Message;
  }
}

try 
{

  //email validation
  try 
  {
    
    if(strpos($email_Address, "example") !== FALSE) 
    {
     
      throw new Exception($email_Address);
    }
  }
  catch(Exception $e) {
    
    throw new customizedException($email_Address);
  }
}
//output
catch (customizedException $e) {
  
  print $e->error_Msge();
}
?>
```

#### 5. Using a set of top-level exception handler functions
This is a way of handling uncaught exceptions. A user-defined function `set_exception_handler()` is used to achieve this, as shown in the code illustration below:

```PHP

<?php

// create function the_Exception
function the_Exception($exception) 
{
  //print the exception message
  echo "The Exception is:" . $exception->getMessage();
}
//declare the exception handler function
set_exception_handler('the_Exception');

throw new Exception('Exception not caught');

?>
```

### Conclusion
Exception handling is becoming a rising star as opposed to error handling. With the endless advantages and the numerous possibilities, exception handling seems like the future of code debugging in PHP. 

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
