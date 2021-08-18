---
layout: engineering-education
status: publish
published: true
url: /php-superglobals/
title: Understanding PHP Superglobals
description: This article will discuss the different PHP suberglobal variables that exists, as well as show you how to implement them. 
author: mackrine-awino
date: 2021-06-24T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/php-superglobals/hero.jpg
    alt: Understanding PHP Superglobals
---
Superglobals are special types of variables because they can be accessed from any scope. The accessibility can be from any file, class, or even function without the implementation of any special code segments.
<!--more-->
Superglobal variables are inbuilt and predefined. They are available to a programmer through the PHP class library. Note that not all inbuilt predefined variables in the class library are superglobals.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction to PHP superglobals](#introduction-to-php-superglobals)
3. [$GLOBALS](#$GLOBALS)
4. [$_SERVER](#$_SERVER)
5. [$_GET](#$_GET)
6. [$_POST](#$_POST)
7. [Why does POST take preference to GET](#why-does-POST-take-preference-to-GET)
8. [$_REQUEST](#$_REQUEST)
9. [$_SESSION](#$_SESSION)
10. [$_COOKIE](#$_COOKIE)
11. [$_FILES](#$_FILES)
12. [Conclusion](#conclusion)

### Prerequisites
To understand the contents of this article, the reader should have the following:
- A basic understanding of the PHP variables declaration technique.
- A beginner's understanding of PHP.

### Introduction to PHP superglobals
Superglobals were introduced in PHP 4.1.0 and have been an important part of PHP ever since. There are about nine superglobal variables in PHP which are sometimes referred to as `automatic globals`. They are as stated below:

1. $GLOBALS
2. $_SERVER
3. $_GET
4. $_POST
5. $_REQUEST
6. $_SESSION
7. $_COOKIE
8. $_FILE
9. $_ENV

Let's discuss these superglobals in the following sections.

1. ### $GLOBALS

$GLOBALS is a PHP variable that is used in accessing other global variables within a PHP script. All the PHP global variables are kept in an array known as `$GLOBALS[index]`. The `index` holds the `variable name`.

Below is an example of the superglobal `$GLOBAL` variable in use :)

```php
   <!doctype html>
   <html>
   <head>
   <title>GLOBAL example</title>
     </head>
     <body>
     <?php
        //php Script
       // Varriable declaration
       $a = 5;
       $b = 6;
         function multiplication(){
          $GLOBALS['c'] = $GLOBALS['a']* $GLOBALS['b'];
         }

         multiplication();
         echo $c;

      ?>
    </body>
   </html>
```

In the above example, the variable `$c` is accessible both inside and outside the function because it is within the `$GLOBALS` array.

2. ### $_SERVER
`$_SERVER` is a superglobal that keeps information headers, paths, and locations of a PHP script. The `$_SERVER` variable has several elements that it holds. They include:

- $_SERVER['PHP_SELF'] - This returns the file name of the script that is currently being executed.

- $_SERVER['SERVER_NAME'] - This returns the name of the server that is hosting the site.

- $_SERVER['HTTP_HOST'] - This returns the header of the host of the current request.

- $_SERVER['SCRIPT_NAME']- This returns the current script's path.

Below is a sample code showing how the elements above can be used:

```php
   <!doctype html>
   <html>
   <head>
   <title> $_SERVER example</title>
   </head>
       <body>
       <?php
       // PHP script
              echo $_SERVER['PHP_SELF'];
              echo "<br>";
              echo $_SERVER['SERVER_NAME'];
              echo "<br>";
              echo $_SERVER['HTTP_HOST'];
              echo "<br>";
              echo $_SERVER['SCRIPT_NAME'];
        ?>
       </body>
   </html>
   ```

The output of the above code would include:

- A filename.
- Name of the host server.
- Header of the host current request.
- Path of the current script.

3. ### $_GET
The `$_GET` variable is a PHP superglobal that collects data from an HTML form after submission.
The HTML form is structured in a way that `$_GET` is used as a [method](https://www.w3schools.com/tags/att_form_method.asp). `$_GET` can also be used for retrieving data sent in a `uniform resource locator`.

Here is an example of how the `$_GET` variable is implemented in a HTML form:

```php
   <!doctype html>
   <html>
   <head>
   <title>$_GET example</title>

   </head>
      <body>
         <!-- html form -->
      <form action="" method="GET">
          <label>Name</label>
          <input type="text" name="Name">
          <label>Email</label>
          <input type="text" name="Email">
          <button>Submit</button>

      </form>

          </body>
   </html>
   ```

When a user clicks the `Submit` button, the information from the form is sent with the `GET` method and is displayed in the `URL`. However, only up to `2048` characters can be sent at a time.

4. ### $_POST
Just like the `$_GET` variable, `$_POST` collects values from a HTML form. Information sent using this method is not displayed in the URL. There is also no limit to the number of characters that can be sent at a time.

An example is shown below:

```html
    <!doctype html>
    <html>
    <head>
    <title>$_POST example</title>

    </head>
      <body>
          <!-- html form -->
      <form action="" method="POST">
         <label>Name</label>
         <input type="text" name="Name">
         <label>Email</label>
         <input type="text" name="Email">
         <button>Submit</button>
      </form>

      </body>
     </html>
```

#### Why is the POST variable preferred over GET?
Although `POST` and `GET` methods implement the same functionality, `POST` is preferred because of the following reasons:

1. The POST method does not have a limit to the data size that can be sent.
2. The POST method can send both [ASCII](https://en.wikipedia.org/wiki/ASCII) and [Binary](https://en.wikipedia.org/wiki/Binary_number) data.
3. The POST method doesn't display the information being sent on the URL hence preventing bookmarking.
4. The POST method uses an `HTTP header` to send data. This promotes data security.

5. ### $_REQUEST
The `$_REQUEST` variable is a PHP superglobal that is used to collect data after submitting a form. It contains the contents of `$_GET`, `$_POST` and even `$_COOKIE` by default. Data from various fields can be collected by PHP using the `$_REQUEST` variable.

The example below shows how to use the `$_REQUEST` variable:

```php
<!doctype html>
<html>
    <head>
    <title>$_REQUEST example</title>
    </head>
     <body>
     <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="POST">

        <label>Name</label>
        <input type="text" myname="Name">
        <button>Submit</button>

      </form>

      <?php
          if($_SERVER["REQUEST_METHOD"]=="POST"){
             $name = $_REQUEST['myname'];
             if(!empty($myname))
          {
        
            echo $myname;

          }else{
             echo "Empty name";
          }

         }
      ?>

    </body>
</html>
```

The output of the above code will be the `name` that had been submitted from the form. If no name was submitted it will print a message `Empty name`.

6. ### $_SESSION

A `$_SESSION` variable is a PHP superglobal that stores and avails information about a site user every time the user opens the site until its closure.

Each time a user visits a site, a session is started. The function below is used to start a session in the PHP code;

```php
   session_start()
```

After a session is started, it needs to be set using the `$_SESSION` variable.

When a user leaves a site, the session is automatically destroyed. This is done without the user's knowledge using the PHP function stated below

```php
session_destroy()
```

The example below demonstrates the use of `$_SESSION`:

```php
<? php
    session_start();
?>

 <!doctype html>
 <html>
   <head>
      <title>$_SESSION demonstration code</title>
   </head>

 <body>
      <?php
         //Set session varriables

         $_SESSION["name"]="Mackrine";
         $_SESSION["favcolor"]="Blue";
         echo "session varriables are set";
      ?>
 </body>

</html>
```

7. ### $_COOKIE
A cookie is a small file that is stored in a user's computer by the server. It identifies the user. Whenever a request is made to a server. A cookie is usually sent alongside the request. PHP creates cookies using the `setcookie()` function.

```php
   setcookie(cookie_name,cookie_value, expiry, path, domain,secure,httponly)
```

The syntax has many parameters. However, only the `name` parameter is required.

After its creation, the cookie can be retrieved using the superglobal `$_COOKIE` variable. The code below shows how to create and retrieve a cookie:

```php
  <?php

    $cookie_name = "uname";
    $cookie_value = "Mackrine";

   //setting cookie

    setcookie($cookie_name, $cookie_value, time()+(86400*30),"/");

     ?>
    <!doctype html>
    <html>
    <body>
    <?php

       if(isset($_COOKIE[$cookie_name]))
        {
            echo "Cookie name:" .$cookie_name;
            echo "<br>";
            echo "Cookie value:" .$cookie_value;

        }
         else
         {
            echo $cookie_name. " is not set!";

         }
    ?>
    </body>
    </html>
```

A cookie can also be deleted using the `setcookie()` function only with a past expiry date.

8. ### $_FILES
`$_FILES` is a variable that contains items that are uploaded using [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) POST method. The `$_FILES` array contains several elements which are stated below:

- $_FILES['file']['name'] - This is usually the original name of file to be uploaded.

- $_FILES['file']['type'] - This refers to the type of the file being uploaded.

- $_FILES['file']['size'] - The file size in bytes.

- $_FILES['file']['tmp_name'] - It refers to a temporary filename of the storage file uploaded on the server.

- $_FILE['file']['error']- The file upload's associated error code.

### Conclusion
Superglobal variables are the core of the PHP language. These variables are required in PHP programming to make highly functional programs. You can, therefore, use this information to craft quality applications.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)