---
layout: engineering-education
status: 
published: 
url: /getting-started-with-php-sessions/
title: Getting started with PHP Sessions
description: This article will bring the reader to a better understanding of what PHP Sessions are, why they are used and how they can be implemented.
author: neema-muganga
date: 
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/getting-started-with-php-sessions/hero.jpg
    alt: Screen with written code image
---
This article will bring the reader to a better understanding of **what** PHP sessions are, **why** they are used and **how** they can be implemented.


### Introduction
PHP Sessions provide server side storage of user information by use of session variables and makes this information accessed from several pages throughout a website.
Sessions uniquely identify users via a Session Identifier which provides connection of that particular user to their stored data on the server. 
<!--more-->
Sessions are compared to but are not the same as cookies, because cookies store users' information on their local computer instead.

### Prerequisites
One needs to have the following before proceeding with the article.
1. Be familiar with PHP basic concepts.
2. Install a text editor that you prefer. Code in this article was written and run using VisualStudio code that can be downloaded [here](https://code.visualstudio.com/download) (if you already don't have it).
2. Either [xampp](https://www.apachefriends.org/download.html) or [wampp](https://sourceforge.net/projects/wampserver/) local server installed, for PHP to run.

### What will be covered
1. What a PHP Session is.
2. How to Start a session.
3. Accessing a created session.
4. How to update a set session.
5. How to destroy a session.

### What a PHP Session is
A PHP Session is in simple terms, a data storage for user's data that can be rendered across several pages of an application or website. A unique Session identifier or ID is used to identify the particular user the information references to.
Therefore, where a session ID is missing, it implies no session has been created yet. Hence, PHP is prompted to initiate one. 
We will learn how to start sessions and create session variables shortly.

We make use of Session variables that is written as **$_SESSION** (which is a PHP superglobal. Go [here](https://www.w3schools.com/php/php_superglobals.asp) and [Understanding PHP superglobals](https://www.section.io/engineering-education/php-superglobals/) to find out more about superglobals to store one particular user's information.

### How to Start a session
Remember a user's information needs to be stored in session variables before they can be accessed across multiple pages? So, before you even use this variable, you will be required to start a session by invoking a PHP function called session_start().
This function creates a new session, or restarts an existing one then generates for the user a unique session ID, through a GET or POST request. These two requests are extensively covered [here](https://www.w3schools.com/php/php_forms.asp). 

>NOTE: It is always important to place the **session_start()** function immediately after the ***<?php*** tag that comes before the HTML tags and at the beginning of your script else its functionality will not be implemented.

Create a **details.php** file and write the following code.

#### See below how starting a session is implemented

```php
<?php 
  //Starting session
  session_start();
?>

<!DOCTYPE html>
<html>
  <body>
    <?php 
      //Using session variables to set a session
      $_SESSION["name"] = "Neema Muganga";
      $_SESSION["hobby"] = "writing";
      
      echo "Successfully set the session variables.";
    ?>
  </body>
</html>
```

You will expect the following output.
Output:

```bash
Output:

Successfully set the session variables.

```

### Accessing a created session
Now that we already have our sessions in the preceding section set, we may want to access them just to be sure the sessions were set successfully.
Create an **accessdetails.php** file that will access the previously set session variables.
We introduce a conditional statement (you may want to follow [this](https://www.w3schools.com/php/php_if_else.asp) link, which talks more on PHP conditional statements) and an **isset()** function to check whether the session variables were really set.

#### Accessing set Session variables
```php

<?php 

  //Note that we call the session_start() function here also before proceeding 
  session_start();
?>
<!DOCTYPE html>
<html>
  <body>

    <?php
    
      //conditional statement with isset() function to check if session is set
      if(isset($_SESSION["name"]) && isset($_SESSION["hobby"])){
	echo "Hi ".$_SESSION["name"]. ", glad to know you enjoy ".$_SESSION["hobby"]. " too!"; 
      }

      //if session variables do not exist, this will run instead
      else{
	echo "Sorry.. no such session variables set!";
      }
    ?>
  </body>
</html>
```

Since our sessions were set in the **details.php** file already, we expect it to run and give the following output.

Output:

```bash
Output:

Hi Neema Muganga, glad to know you enjoy writing too!

```
Incase you misspelt the variable sessions in the files, PHP may not recognize the session variables you are referring to and therefore return the else statement.

Output:

```bash

Sorry.. no such session variables set!
```

>NOTE: Ensure you place a semicolon at the end of a PHP statement to avoid syntax errors that prevent your code from running.

### How to update a set session.
Incase you want to change a session variable to a different value instead of the existing one, follow the example below.
Replace the new session data in this case; **name**, in the details.php file.

```php
<?php
//starting session
session_start();

//updating the session variable name value
$_SESSION["name"] = "Liz Muganga";
?>

<!DOCTYPE html>
<html>
  <body>
    <?php
    echo "You changed your name to ".$_SESSION["name"]."!";
    ?>
  </body>
</html>

```

This will change the name set from Neema Muganga to Liz Muganga and the following output will be seen when you run the code.

Output:

```bash
You changed your name to Liz Muganga!

```

By now, you definitely have a good understanding of PHP Sessions. If not, please go through the previously covered sections of this article a second time and you will see everything making better sense.
Remember, you learn best by doing!.

### How to destroy a session.
The whole point of using sessions was to store user's data and make it accessible throughout several pages of the application. 
In other words, the server is able to know who is accessing the application at that particular point in time, by referencing the unique Session Identifier used, when creating the session variable.
Closing the browser or even logging out of the system at some point, loggs us out and redirects us back to the login page mostly.This is as a result of the session variable being destroyed.
Incase you want to see how the logout functionality in PHP is implemented, [watch this video](https://www.youtube.com/watch?v=O0Ky0tKvsJ8) that has a precise step by step guide on how to implement a logout functionality as this article does not talk much on it.

#### Functions we may use when destroying a session.
1. The **unset()** function. This function destroys one particular session variable by passing in the session variable we want to destroy. We will soon see how.

2. **session_destroy()**. This function destroys **all** previously set session variables and it does not require passing any parameters to it.

The following code shows how how to destroy a php session.
```php

<?php

  //starts the session
  session_start();
?>

<!DOCTYPE html>
<html>
  <body>
    <?php
      
      //gets rid of the name session variable
      unset($_SESSION["name"]);

      //Eventually destroys all sessions set
      session_destroy(); 
    ?>
  </body>
</html>
```

That was fun!. 
Now, I hope you have an idea of how the **logout** functionality is implemented in applications. 
The specific user data is wiped off the session variable if the **unset()** function is used, and ultimately every other user data stored is destroyed from the session variables, when the **session_destroy()** function is called. 


### Conclusion
Sessions to a beginner may sound hard of a concept to grasp, it is only normal to feel that way. This article therefore, is meant to simplify this concept and take you through a step by step learning process until you eventually get a hung of it which by now I believe you have. If not yet, you could always go over it another time until you are sure you got it well.

Below you can find links to other sources you may want to look at to make your understanding even better.

#### Further reading
- [w3schools PHP Sessions](https://www.w3schools.com/php/php_sessions.asp).
- [Tutorial Republic](https://www.tutorialrepublic.com/php-tutorial/php-sessions.php).
- [Basic usage of PHP sessions from PHP Manual](https://www.php.net/manual/en/session.examples.basic.php).

Happy coding!

f user information by use of session variables and makes this information accessed from several pages throughout a website.
Sessions uniquely identify users via a Session Identifier which provides connection of that particular user to their stored data on the server. 
<!--more-->
Sessions are compared to but are not the same as cookies, because cookies store users' information on their local computer instead.

### Prerequisites
One needs to have the following before proceeding with the article.
1. Be familiar with PHP basic concepts.
2. Install a text editor that you prefer. Code in this article was written and run using VisualStudio code that can be downloaded [here](https://code.visualstudio.com/download) (if you already don't have it).
2. Either [xampp](https://www.apachefriends.org/download.html) or [wampp](https://sourceforge.net/projects/wampserver/) local server installed, for PHP to run.

### What will be covered
1. What a PHP Session is.
2. How to Start a session.
3. Accessing a created session.
4. How to update a set session.
5. How to destroy a session.

### What a PHP Session is
A PHP Session is in simple terms, a data storage for user's data that can be rendered across several pages of an application or website. A unique Session identifier or ID is used to identify the particular user the information references to.
Therefore, where a session ID is missing, it implies no session has been created yet. Hence, PHP is prompted to initiate one. 
We will learn how to start sessions and create session variables shortly.

We make use of Session variables that is written as **$_SESSION** (which is a PHP superglobal. Go [here](https://www.w3schools.com/php/php_superglobals.asp) and [Understanding PHP superglobals](https://www.section.io/engineering-education/php-superglobals) to find out more about superglobals.) to store one particular user's information.

### How to Start a session
Remember a user's information needs to be stored in session variables before they can be accessed across multiple pages? So, before you even use this variable, you will be required to start a session by invoking a PHP function called session_start().
This function creates a new session, or restarts an existing one then generates for the user a unique session ID, through a GET or POST request. These two requests are extensively covered [here](https://www.w3schools.com/php/php_forms.asp). 

>NOTE: It is always important to place the **session_start()** function immediately after the ***<?php*** tag that comes before the HTML tags and at the beginning of your script else its functionality will not be implemented.

Create a **details.php** file and write the following code.

#### See below how starting a session is implemented

```php
<?php 
  //Starting session
  session_start();
?>

<!DOCTYPE html>
<html>
  <body>
    <?php 
      //Using session variables to set a session
      $_SESSION["name"] = "Neema Muganga";
      $_SESSION["hobby"] = "writing";
      
      echo "Successfully set the session variables.";
    ?>
  </body>
</html>
```

You will expect the following output.
Output:

```bash
Output:

Successfully set the session variables.

```

### Accessing a created session
Now that we already have our sessions in the preceding section set, we may want to access them just to be sure the sessions were set successfully.
Create an **accessdetails.php** file that will access the previously set session variables.
We introduce a conditional statement (you may want to follow [this](https://www.w3schools.com/php/php_if_else.asp) link, which talks more on PHP conditional statements) and an **isset()** function to check whether the session variables were really set.

#### Accessing set Session variables
```php

<?php 

  //Note that we call the session_start() function here also before proceeding 
  session_start();
?>
<!DOCTYPE html>
<html>
  <body>

    <?php
    
      //conditional statement with isset() function to check if session is set
      if(isset($_SESSION["name"]) && isset($_SESSION["hobby"])){
	echo "Hi ".$_SESSION["name"]. ", glad to know you enjoy ".$_SESSION["hobby"]. " too!"; 
      }

      //if session variables do not exist, this will run instead
      else{
	echo "Sorry.. no such session variables set!";
      }
    ?>
  </body>
</html>
```

Since our sessions were set in the **details.php** file already, we expect it to run and give the following output.

Output:

```bash
Output:

Hi Neema Muganga, glad to know you enjoy writing too!

```
Incase you misspelt the variable sessions in the files, PHP may not recognize the session variables you are referring to and therefore return the else statement.

Output:

```bash

Sorry.. no such session variables set!
```

>NOTE: Ensure you place a semicolon at the end of a PHP statement to avoid syntax errors that prevent your code from running.

### How to update a set session.
Incase you want to change a session variable to a different value instead of the existing one, follow the example below.
Replace the new session data in this case; **name**, in the details.php file.

```php
<?php
//starting session
session_start();

//updating the session variable name value
$_SESSION["name"] = "Liz Muganga";
?>

<!DOCTYPE html>
<html>
  <body>
    <?php
    echo "You changed your name to ".$_SESSION["name"]."!";
    ?>
  </body>
</html>

```

This will change the name set from Neema Muganga to Liz Muganga and the following output will be seen when you run the code.

Output:

```bash
You changed your name to Liz Muganga!

```

By now, you definitely have a good understanding of PHP Sessions. If not, please go through the previously covered sections of this article a second time and you will see everything making better sense.
Remember, you learn best by doing!.

### How to destroy a session.
The whole point of using sessions was to store user's data and make it accessible throughout several pages of the application. 
In other words, the server is able to know who is accessing the application at that particular point in time, by referencing the unique Session Identifier used, when creating the session variable.
Closing the browser or even logging out of the system at some point, loggs us out and redirects us back to the login page mostly.This is as a result of the session variable being destroyed. Implementing a logout functionality is beyond the scope of this article but you can check out [this](https:youtu.be/O0Ky0tKvsJ8) tutorial that clearly shows how to go about it.
Incase you want to see how logout functionality in PHP is implemented, watch [this](https:youtu.be/O0Ky0tKvsJ8) that has a precise step by step guide on how to implement a logout functionality.

#### Functions we may use when destroying a session.
1. The **unset()** function. This function destroys one particular session variable by passing in the session variable we want to destroy. We will soon see how.

2. **session_destroy()**. This function destroys **all** previously set session variables and it does not require passing any parameters to it.

The following code shows how how to destroy a php session.
```php

<?php

  //starts the session
  session_start();
?>

<!DOCTYPE html>
<html>
  <body>
    <?php
      
      //gets rid of the name session variable
      unset($_SESSION["name"]);

      //Eventually destroys all sessions set
      session_destroy(); 
    ?>
  </body>
</html>
```

That was fun!. 
Now, I hope you have an idea of how the **logout** functionality is implemented in applications. 
The specific user data is wiped off the session variable if the **unset()** function is used, and ultimately every other user data stored is destroyed from the session variables, when the **session_destroy()** function is called. 


### Conclusion
Sessions to a beginner may sound hard of a concept to grasp, it is only normal to feel that way. This article therefore, is meant to simplify this concept and take you through a step by step learning process until you eventually get a hung of it which by now I believe you have. If not yet, you could always go over it another time until you are sure you got it well.

Below you can find links to other sources you may want to look at to make your understanding even better.

#### Further reading
- [w3schools PHP Sessions](https://www.w3schools.com/php/php_sessions.asp).
- [Tutorial Republic](https://www.tutorialrepublic.com/php-tutorial/php-sessions.php).
- [Basic usage of PHP sessions from PHP Manual](https://www.php.net/manual/en/session.examples.basic.php).

Happy coding!

