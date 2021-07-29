---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-sessions-in-php/
title: Getting Started with PHP Sessions
description: This article will show you how to create, read, update, and destroy sessions. These components allow one to store temporary user data on the server.
author: neema-muganga
date: 2021-07-24T00:00:00-07:41
topics: [Languages]
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
What makes learning even more fun is being able to put to practice the concepts grasped into a real-time application. Therefore, we will create one using HTML, which you should be familiar with, Bootstrap CDN link which you could get from the Bootstrap official page [here](https://getbootstrap.com/docs/5.0/getting-started/introduction/) for basic styling and the sessions concepts we have just learnt. Let's begin!
Create a file and name it file1.php then write the following code in it.

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
	<!-- clicked button will direct us to file1.php that accesses the declared session variables -->
        <a href= file2.php><button>Click me </button></a>
    </div>



```
This code will give you an output as in the image below.
![first page output](/engineering-education/getting-started-with-sessions-in-php/image1.PNG)
In the code above, we created a session and attached it to values for name and email. Note that we have not accessed the session variables yet but we have linked the button to another file which we will implement soon and from here, will be accessing the session variables.


Now create a file2.php and write the following code.

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
You should have an output like below.
![Accessed variables](/engineering-education/getting-started-with-sessions-in-php/image2.PNG)
Notice that clicking the button in file1.php (in the first image) directs us to a different page and you should see that the contents of the nav bar also changed as seen in the image below. 
![navbar changes](/engineering-education/getting-started-with-sessions-in-php/image3.PNG)
This page accesses the Variables set in file1.php and outputs them in the statement. When we covered destroying sessions above, we mentioned that in a practical example, closing the browser or logging out of an application will destroy a created session. Let's see this practically.
The session destroying code for this will be written in a file named file3.php as below.

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

The logout button in file2.php was linked to file3.php that contains code to destroy the sessions and redirects the user to the first page rendered by file1.php code.

Click the Log out link in the navbar to see this practically.
![logout functionality](/engineering-education/getting-started-with-sessions-in-php/image4.PNG)

Now you understand how the logout functionality in applications works. 
Notice that the sessions variables can only be accessesed when the button in file1.php is clicked and from the redirected page in file2.php. And from this page you could signout to destroy the sessions. There you have it then. This was a simple practical example of using sessions and I hope everything is even clearer as at now. 

### Conclusion
Sessions are indeed a crucial part of a web application. This article has shown you how to create, update, retrieve, and delete sessions. You can, therefore, use this knowledge to craft other powerful applications.

#### Further reading
- [w3schools PHP Sessions](https://www.w3schools.com/php/php_sessions.asp)
- [Tutorial Republic](https://www.tutorialrepublic.com/php-tutorial/php-sessions.php)
- [Basic usage of PHP sessions from PHP Manual](https://www.php.net/manual/en/session.examples.basic.php)

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)