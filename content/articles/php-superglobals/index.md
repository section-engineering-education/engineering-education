### Getting started with PHP superglobals

Superglobals are [varriables](https://www.w3schools.com/php/php_variables.asp) just like the ones we declare in our everyday code. The only difference is, superglobal variables are inbuilt and predefined. This means superglobal variables are not user-defined variables but are variables that are made available to a programmer by the PHP class library. You should however know that not all inbuilt predefined variables in the class library are superglobals.

Superglobals are special types of variables because they are accessed from any scope. The accessibility can be from any file, class, or even function without the implementation of any special code segments.

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

To understand the contents of this article, the reader should have the following:)

- A basic understanding of the PHP variables declaration technique.

- A beginner's understanding of PHP as a programming language.

### Introduction to PHP superglobals

Superglobals came into existence during the use of PHP 4.1.0 and have been an important part of PHP since then. There exist about 9 superglobal variables in PHP. They are sometimes referred to as Automatic globals. They are as stated below:)
1. $GLOBALS
2. $_SERVER
3. $_GET
4. $_POST
5. $_REQUEST
6. $_SESSION
7. $_COOKIE
8. $_FILE

The above-stated superglobals are looked at in detail with examples as follows.

1. ### $GLOBALS

$GLOBALS is a PHP variables that is used in accessing other variables , function or even from a PHP method in a PHP script. All the PHP global variables are kept in an array known as $GLOBALS[index] where the index holds the variable name.

Below is an example of superglobal $GLOBAL in use:)

```html
   <!doctype html>
   <html>
   <head>
   <title>$GLOBAL example</title>
     </head>
     <body>
     <?php
        //php Script
       // Varriable declaration
       $a = 5;
       $b = 6;
         function multiplication()
         {
           $GLOBAL['c'] = $GLOBAL['a']* $GLOBAL['b'];

         }
         multiplication();
         echo $c;

      ?>
    </body>
   </html>
```
In the above example, the variable $c is accessible both in the function and outside because is within the $GLOBALS array.

2. ### $_SERVER

$_SERVER is a superglobal that keeps information headers, paths, and locations of a PHP script. The $_SERVER variable has several elements that it holds and some of them are discussed below:)
- $_SERVER['PHP_SELF']- This returns the file name of the script that is currently being executed.

- $_SERVER['SERVER_NAME']- This returns the name of the server that is hosting the site being created with the code.

- $_SERVER['HTTP_HOST']- This returns the header of the host of the current request.

- $_SERVER['SCRIPT_NAME']- This returns the current script's path.

Below is a sample code showing how the elements above can be used:)
``` html
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

The output of the above code would be :

- A Filename
- Name of the host server

- Header of the host current request

- Path of the current script

3. ### $_GET

The $_GET variable is a PHP superglobal that collects data from an HTML form after submission.
The HTML form is structured in a way that $_GET is used as a [method](https://www.w3schools.com/tags/att_form_method.asp). $_GET can also be used for collecting data sent in a uniform resource locator.

An example of an HTML form is shown below where varriable $_GET is implemented:

``` html
   <!doctype html>
   <html>
   <head>
   <title>$_GET example</title>

   </head>
      <body>
         //html form
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

When a user clicks the Submit button, the information from the form is sent with the GET method and is displayed in the URL however, only up to 2048 characters can be sent at a time.

4. ### $_POST

The $_POST variable just like the $_GET variable collects values from a HTML form.This is done using the GET method.

Information sent using the POST method is not displayed in the URL hence not visible. There is also no limit to the number of characters that can be sent at a time.
An example is shown below:)
```html
    <!doctype html>
    <html>
    <head>
    <title>$_POST example</title>

    </head>
      <body>
          //html form
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
    

### Why does POST take preference to GET?

Although POST and GET methods do the same function, POST is preferred because of the following reasons;

1. The POST method does not have a limit to the data size that can be sent.
2. The POST method can send both [ASCII](https://en.wikipedia.org/wiki/ASCII) and [Binary](https://en.wikipedia.org/wiki/Binary_number) data.
3. The POST method doesn't display the information being sent on the URL hence preventing bookmarking.
4. The POST method uses an HTTP header to send data hence in a case where a secure HTTP protocol is used, the security of the sent data is guaranteed.

5. ### $_REQUEST

The $_REQUEST variable is a PHP superglobal that is used to collect data after submitting a form.
It contains the contents of $_GET, $_POST and even $_COOKIE by default.
Data from various fields can be collected by PHP using the $_REQUEST variable.

Below is an implementation example:)
```html
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
          if($_SERVER["REQUEST_METHOD"]=="POST")
          {
             $name = $_REQUEST['myname'];
             if(!empty($myname))
          {
        echo $myname;

          }
           else
          {
             echo "Empty name";
          }

         }
        ?>

           </body>
       </html>
```

The output of the above code will be the name that had been submitted from the form and if no name was submitted it will print a message "Empty name".

6. ### $_SESSION

A session variable is a PHP superglobal that stores and avails information about a site user every time the user opens the site until its closure.

Each time a user visits a site, a session is started. The function below is used to start a session in the PHP code;

session_start()

After a session is started, it needs to be set using the variable $_SESSION.

When a user leaves a site the session is automatically destroyed. This is done without the user's knowledge using the PHP function stated below

session_destroy()

The example below demonstrates the use of $_SESSION:
```html
<? php

    session_start;

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
 <?php
   session_destroy();
?>

 </body>
</html>
```

7. ### $_COOKIE
A cookie is a small file that is kept in a client by the server. It identifies the user. Whenever a client requests a page, the cookie is sent together with the page. PHP creates cookies using the function setcookie( )

Syntax
setcookie(cookie_name,cookie_value, expiry, path, domain,secure,httponly)

The syntax has many parameters. However, only one is required, the rest are optional.

After creation, the cookie is retrieved using the superglobal $_COOKIE. The program code below shows how to create and retrieve a cookie.
``` php
  <?php

    $cookie_name = "uname";
    $cookie_value = "Mackrine";

   //setting cookie

    setcookie($cookie-name, $cookie-value, time()+(86400*30),"/");

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

A cookie can also be deleted using the setcookie( ) function only with a past expiry date.

8. ### $_FILES

$_FILES is a variable that contains items that are uploaded using [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) POST. The files array has some elements as stated below:)

- $_FILES['file']['name']- This is usually the original name of file to be uploaded.

- $_FILES['file']['type']- This refers to the type of the file being uploaded.

- $_FILES['file']['size']- Usually the file size in bytes.

- $_FILES['file']['tmp_name']- Refers to a temporary filename of the storage file where the file being uploaded resided on the server.

- $_FILE['file']['error']- The file upload's associated error code.


### Conclusion

Superglobals are in conclusion the core of PHP language and a large part of the PHP language requires the different superglobals for the programs to be complete and functional.

Blissful reading!
