---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-php-sessions/
title: Getting Started with PHP Sessions
description: This article will show you how to create, read, update, and destroy sessions. These components allow one to store temporary user data on the server.
author: neema-muganga
date: 2021-07-29T00:00:00-08:52
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-php-sessions/hero.jpg
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

Let's create a `details.php` file and then include the following code:

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

You should have the following output:

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

Since our sessions were set in the `details.php` file, we should have the following output:

```bash
Hi Neema Muganga, glad to know you enjoy writing too!
```
  
In case you misspelled the `session variables`, PHP may not recognize the data you are referring to and, therefore, return the `else` statement.

Output:

```bash
Sorry.. no such session variables set!
```

> Ensure you place a semicolon at the end of a PHP statement to avoid syntax errors that prevent your code from running.

### How to update a set session
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

- `unset()` - This function destroys `one` particular session variable. It requires the target variable as a parameter. 

- `session_destroy()` - This function destroys `all` previously set session variables. It does not require any parameters.

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

### Creating an application that implements sessions
Let's put in practice what we have learned in the above section.

We will create a simple web application that uses PHP sessions. We will utilize [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) styling to save time.

The first step is to create a file and name it `file1.php`. In this file, add the following code: 

```php
<?php
//Starting the Session
session_start();

//Accessing session variables
$_SESSION['name'] = 'John Doe';
$_SESSION['email'] = 'john@gmail.com';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Project</title>
    <link rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:ital">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/reset.css">
</head>
  <body>
        <header>
            <nav id="navbar-top" class="navbar navbar-expand-lg bg-warning navbar-light py-2">
                <div class="container ">
                    <img src="" alt="Blogs logo">
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navmenu">
                        <ul class="navbar-nav ms-auto" >
                            <li class="nav-item"><a href="#" class="nav-link active">Home</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">About Us</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">Find Blogs</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">Log in</a></li>
                        </ul>
                    </div>   
                </div>
            </nav>
        </header>

        <div class="container d-flex justify-content-center mt-5">
        <!-- clicked button will direct us to file2.php that accesses the declared session variables -->
            <a href= file2.php><button>Click me </button></a>
        </div>

  </body>
</html>
```

When you navigate to your browser, the web page should look, as shown below:

![first page output](/engineering-education/getting-started-with-php-sessions/image1.png)

In the above code, we created an app that stores session variables (name and email). We will retrieve this data when we navigate to the second web page.

For the second page, create a file and name it `file2.php`. Then add the following code:

```php
<?php
//start session
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Project</title>
    <link rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:ital">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/reset.css">
</head>
  <body>
      <header>
          <nav id="navbar-top" class="navbar navbar-expand-lg bg-warning navbar-light py-2">
              <div class="container ">
                  <a href="index.php"><img src="" alt="Blogs logo"></a>
                  
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navmenu">
                      <ul class="navbar-nav ms-auto" >
                          <li class="nav-item"><a href="#" class="nav-link active">Home</a></li>
                          <li class="nav-item"><a href="#" class="nav-link">About Us</a></li>
                          <li class="nav-item"><a href="#" class="nav-link">Find Blogs</a></li>
                          <li class="nav-item"><a href="file3.php" class="nav-link">Log out</a></li>
                      </ul>
                  </div>   
              </div>
          </nav>
      </header>

      <!-- Access the set variables in file1.php and echoing them in the statement -->
      <div class="container d-flex justify-content-center mt-5">
      <h5> Hey There <?php echo $_SESSION['name']?> we confirm that <?php echo $_SESSION['email']?> is your email address!</h5><br>
      </div>
   
  </body>
</html>
```

When you view the app in your browser, you should have the following output:

![Accessed variables](/engineering-education/getting-started-with-php-sessions/image2.png)

As stated, when you click the button in `file1.php`, you will be redirected to a different page, as demonstrated below: 

![navbar changes](/engineering-education/getting-started-with-php-sessions/image3.png)

This page retrieves the `variables` set in `file1.php` and displays them on the browser. 

We can destroy our sessions by closing the browser or logging out of an application. 

We can also delete sessions programmatically using `session_destroy()` function, as demonstrated below:

```php
<?php
session_start();

//Checks if sessions exist
if(isset($_SESSION["name"]) && isset($_SESSION["email"])){

    //destroys the sessions
    session_destroy();

    //redirects the user to file1.php
    echo "<script> location.href='file1.php'</script>";
}

?>
```

Clicking on the logout button will invoke the `session_destroy()` method. This is shown in the image below:

![logout functionality](/engineering-education/getting-started-with-php-sessions/image4.png)

### Conclusion
Sessions are indeed a crucial part of a web application. This article has shown you how to create, update, retrieve, and delete sessions. You can, therefore, use this knowledge to craft other powerful applications.

#### Further reading
- [w3schools PHP Sessions](https://www.w3schools.com/php/php_sessions.asp)
- [Tutorial Republic](https://www.tutorialrepublic.com/php-tutorial/php-sessions.php)
- [Basic usage of PHP sessions from PHP Manual](https://www.php.net/manual/en/session.examples.basic.php)

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
