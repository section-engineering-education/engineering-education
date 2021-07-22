---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-sessions-in-php/
title: Getting Started with PHP Sessions
description: This article will show you how to create, read, update, and destroy sessions. These components allow one to store temporary user data on the server.
author: neema-muganga
date: 2021-07-29T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-sessions-in-php/hero.jpg
    alt: Getting Started with PHP Sessions
---
PHP sessions allow web applications to store user information on the server. As a result, the data can be accessed from several pages throughout a website.
<!--more-->
Sessions rely on an `identifier` to identify different users. It is, therefore, easy to retrieve data about a particular user.

> Unlike sessions, cookies store users' information on their local computer.

### Prerequisites
To follow along, you need:
- A basic understanding of PHP basic concepts.
- A text editor installed. In this article, we will use [visual studio code](https://code.visualstudio.com/download).
- [xampp](https://www.apachefriends.org/download.html) or [wampp](https://sourceforge.net/projects/wampserver/) installed. These two applications allow us to run PHP locally.

### Understanding PHP sessions
A PHP session stores user's data that can be rendered across several pages of an application or website. 

A unique session identifier or `ID` is used to identify a specific user. Therefore, when a `session ID` is null, it implies no session has been created yet. Hence, PHP is prompted to initiate one. 

In this tutorial, we will learn how to start sessions and initialize variables shortly. We will make use of session variables (`$_SESSION`). This is a PHP superglobal. You can read more about PHP superglobals from [here](https://www.section.io/engineering-education/php-superglobals/).

### How to start a session
We need to store user data in `session variables` before they can be accessed across multiple web pages. Therefore, our first step is to start a `session` by invoking a PHP function called `session_start()`.

The `session_start()` function creates a `new session`, or restarts an existing one then generates a unique session ID for the user. This is mainly done through a GET or POST request. You can learn more about these request methods from [here](https://www.w3schools.com/php/php_forms.asp). 

> It is always important to place the `session_start()` function immediately after the `<?php` tag at the beginning of your script. This ensures that all the required functionalities are accessible.

Let's create a `details.php` file and then include the following code.

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

You should have the following output.

```bash
Successfully set the session variables.
```

### Accessing a created session
Now that we already have our sessions in the preceding section, let's retrieve them to ensure that they were set successfully.

Create an **accessdetails.php** file. We will use this file to access the previously set session variables.

We will need to use a conditional statement to access the required session variables. We will also require an `isset()` function to check whether the `session variables` were set.

```php
<?php 
  //Note that we need to call the session_start() function here before proceeding 
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

Since our sessions were set in the `details.php` file, we should have the following output.

```bash
Hi Neema Muganga, glad to know you enjoy writing too!
```
  
In case you misspelled the `session variables`, PHP may not recognize the data you are referring to and, therefore, return the `else` statement.

Output:

```bash
Sorry.. no such session variables set!
```

> Ensure you place a semicolon at the end of a PHP statement to avoid syntax errors that prevent your code from running.

### How to update a set session.
In some cases, we may want to change a session variable to a different value.

In this step, we will replace the preset `name` variable in the `details.php` file, as shown below:

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

The above code will change your name and then display it in the browser.

Output:

```bash
  You changed your name to Liz Muganga!
```

### Destroying a session.
The whole point of using `sessions` was to store user's data and make it accessible throughout the web application. 

Therefore, the server can determine who is accessing the application using the unique session identifier.

The session will be destroyed when one logs out or closes the browser window.

#### Functions we may use when destroying a session.
We can also use the following data to destroy the stored session variables:

`unset()` - This function destroys `one` particular session variable. It requires the target variable as a parameter. 

`session_destroy()` - This function destroys `all` previously set session variables. It does not require any parameters.

The following code shows how to destroy a PHP session:

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

From this analysis, I hope you have an idea of how the  `logout` functionality is implemented in many applications. 

### Conclusion
Sessions are indeed a crucial part of a web application. This article has shown you how to create, update, retrieve, and delete sessions. You can, therefore, use this knowledge to craft other powerful applications.

#### Further reading
- [w3schools PHP Sessions](https://www.w3schools.com/php/php_sessions.asp).
- [Tutorial Republic](https://www.tutorialrepublic.com/php-tutorial/php-sessions.php).
- [Basic usage of PHP sessions from PHP Manual](https://www.php.net/manual/en/session.examples.basic.php).

Happy coding!


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)