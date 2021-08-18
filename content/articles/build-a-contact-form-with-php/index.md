---
layout: engineering-education
status: draft
published: false
url: /build-a-contact-form-with-php/
title: Build a contact form with PHP
description: Learn how to add a contact form to your PHP website.
author: samuel-torimiro
date:
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/build-a-contact-form-with-php/hero.jpg
    alt: PHP example image
---

[PHP](https://www.php.net/) is a programming language used for creating interactive web applications. It's a widely used language that runs on the server.
<!--more-->
In this tutorial, will build a contact form with PHP. It will include the following features, form validation, the ability to send emails using Google Gmail SMTP server, and [PHPMailer library](https://github.com/PHPMailer/PHPMailer).

![Project](/engineering-education/build-a-contact-form-with-php/project.png)
### Table of contents
- [Prerequisites](#prerequisites).
- [Project Setup & Overview](#project-setup-overview).
- [PHP New Project](#php-new-project).
  - Step 1
  - Step 2
- [Creating the Form](#creating-the-form).
- [Form validation in PHP](#form-validation-in-php).
- [Sending Email with PHP Mailer and Google Gmail SMTP server](#sending-email-with-php-mailer-and-google-gmail-smtp-server).
  - Download PHP mailer
  - Configure your Gmail account
- [Conclusion](#conclusion).
### Prerequisites

To follow along with this tutorial, a basic understanding of HTML and PHP is required. Therefore, you must have PHP installed. For this tutorial, we will be using [XAMPP](https://www.apachefriends.org/index.html) for our development purposes to run PHP locally on our machine.

### Project Setup & Overview

In this section, we would be setting up our project. Recall that this tutorial uses XAMPP (a free cross-platform PHP development environment), therefore to follow exactly this tutorial download and install XAMPP using this [link](https://www.apachefriends.org/index.html). After the installation, start the `Apache` and `MySQL` module:

![XAMPP Settings](/engineering-education/build-a-contact-form-with-php/xampp-settings.png)

Next, open your browser to [http://localhost/dashboard/](http://localhost/dashboard/), you should see the following:

![XAMPP Server Hompage](/engineering-education/build-a-contact-form-with-php/xampp-server-homepage.png)

Let's create a new PHP project.

### Step 1

Inside your `C: drive` open the folder `xampp`, inside this folder open the folder `htdocs` and create a new folder with the name `php-contact`.

### Step 2

Open this folder with your favourite code editor. Inside it create a new file called `index.php`. For testing purposes, inside `index.php` file paste the following.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

Navigate back to [http://localhost/php-contact/](http://localhost/php-contact/), you should see a heading with the text **Hello World**. Note that we didn't add to the URL path `index.php` because by default in PHP navigating to the root page of a folder automatically loads the index.php file, although we could have explicitly stated it as [http://localhost/php-contact/index.php](http://localhost/php-contact/index.php).

### Creating the form

In this section, we will be creating a basic form. Inside the `index.php` replace the previous code with the following:

```php
<!DOCTYPE html>
<html>

<head>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">


    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        .error {
            color: white;
            background-color: crimson;
            border-radius: 7px;
            text-align: center;
        }

        .success {
            background-color: darkgreen;
            color: white;
            border-radius: 7px;
            text-align: center;
        }
    </style>
</head>


<body>

    <main class="container">
        <h4>Contact</h4>

        <hr>

        <div class="row">
            <div class="col s12 l5">
                <span class="bold">Get in touch with me via email</span>
            </div>
            <div class="col s12 l5 offset-l2">

                <div class="success"><?php echo $success ?></div>
                <div class="error"><?php echo $error ?></div>
                <form action="index.php" method="post">

                    <div class="input-field">
                        <i class="material-icons prefix">account_circle</i>
                        <input type="text" name="name" id="name" value="<?php echo htmlspecialchars($name) ?>">

                        <label for="name">Your name*</label>
                        <div class="error"><?php echo $errors["name"] ?></div>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">email</i>
                        <input type="email" name="email" id="email" value="<?php echo htmlspecialchars($email) ?>">
                        <label for="email">Your email*</label>
                        <div class="error"><?php echo $errors["email"] ?></div>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">mode_edit</i>
                        <textarea id="message" class="materialize-textarea" name="message"><?php echo htmlspecialchars($message) ?></textarea>
                        <label for="message">Your Message*</label>
                        <div class="error"><?php echo $errors["message"] ?></div>
                    </div>
                    <div class="input-field center">
                        <input type="submit" class="btn-large z-depth-0" name="submit" id="submit" value="Send"></input>
                    </div>

                </form>


            </div>
        </div>


    </main>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

</body>

</html>
```

**What's happening here**

1. We created a basic form with the **POST** method which ultimately sends the request back to this page.

> To learn more about PHP forms, check out this awesome [article](https://www.section.io/engineering-education/working-with-forms-in-php/).

2. We are also using [materializeCSS](https://materializecss.com/about.html) for some default styling.
3. And finally we added some PHP variables within our HTML page to echo out either the error messages or the value that you inputted inside your form. Note that we haven't created these variables yet inside our PHP script so it will produce some errors if you refresh your browser.

> The **htmlspecialchars** function is used to turn special characters returned into the ones HTML can understand and properly display. It prevents vulnerabilities like **cross-site scripting** attack (XSS) by replacing all harmful characters with harmless HTML entities. Therefore, always include this function when outputting users input in your HTML.

### Form Validation in PHP

In this section, we will be creating the logic of our web page to validate users input. In the same `index.php`, at the top of the file add the following code:

```php
<?php

$success = "";
$error = "";
$name = $message = $email = "";
$errors = array('name' => '', 'email' => '', 'message' => '');

?>
```

**What you should know**

1. We created several variables to store user input and error or success message
2. We also created an errors array for errors of specific error messages of the input fields.

Navigate back to the homepage and refresh the homepage, all should work well since we have stated all the variables in our PHP script.

> Notice that this PHP script is wrapped inside a `<?php ?>` tag, if not they would not be treated as PHP code.

Next, add this function after the code above, but inside the PHP tags:

```php
function SanitizeString($var)
{
    $var = strip_tags($var);
    $var = htmlentities($var);
    return stripslashes($var);
}
```

**What you should know**

1. This function is used to sanitize the string of user input, by removing `HTML entities`, `slashes` and `tags`. This is very important to prevent malicious users from inputting malicious text.

Next, add this after the code above, but inside the PHP tags:

```php
if (isset($_POST["submit"])) {
    if (empty(trim($_POST["name"]))) {
        $errors['name'] = "Your name is required";
    } else {
        $name = SanitizeString($_POST["name"]);
        if (!preg_match('/^[a-zA-Z\s]{6,50}$/', $name)) {
            $errors['name'] = "Only letters and spaces allowed";
        }
    }

    if (empty(trim($_POST["email"]))) {
        $errors["email"] = "Your email is required";
    } else {
        $email = SanitizeString($_POST["email"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors["email"] = "Pls give a proper email address";
        }
    }

    if (empty(trim($_POST["message"]))) {
        $errors["message"] = "Please type your message";
    } else {
        $message = SanitizeString($_POST["message"]);
        if (!preg_match("/^[a-zA-Z\d\s]+$/", $message)) {
            $errors["message"] = "Only letters, spaces and maybe numbers allowed";
        }
    }

    if (array_filter($errors)) {
    } else {
        // Send email
    }
}
```

**What's happening here**

1. This conditional statement checks whether the form was submitted. If it was, it performs several functions to sanitize and validate users input or display any error messages.
2. The combination of the `trim` and `empty` function checks whether the form that is required was not left empty.
3. The `preg_match` function is used to check user input based on some criteria given using **regex**.
4. And finally, if there are no errors in the errors array, it's time to send the email

### Sending Email with PHP Mailer and Google Gmail SMTP server

In other to send an email with Google Gmail we would need to have a Google account. If you don't have one, follow this [link](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp) to create a new Google account.

#### Download PHP mailer

[PHPMailer](https://github.com/PHPMailer/PHPMailer) is a popular library written in PHP for sending emails. It as a whole lot of additional features. Download this library using [this link](https://github.com/PHPMailer/PHPMailer/archive/master.zip).

Unzip the package inside the directory where you want to save the **php-contact** directory.

> You can go through the **readme** file to understand more about this library.

#### Configure your Gmail account

To use your Google Gmail account to send an email, you will need to enable access for less secure applications using [this link](https://myaccount.google.com/lesssecureapps).

![Google Less Secure Homepage](/engineering-education/build-a-contact-form-with-php/google-less-secure.jpg)

Note that Google accounts with the 2-step Verification turned on don't work with secure apps. Instead, you use app passwords. You can generate an app password using [this link](https://myaccount.google.com/u/1/apppasswords).

Add the following code to the `index.php` file at the top of the file, but inside the PHP tags:

```php

// Include packages and files for PHPMailer and SMTP protocol
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Initialize PHP mailer, configure to use SMTP protocol and add credentials

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->Mailer = "smtp";

$mail->SMTPDebug  = 1;
$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username   = "<paste your gmail account here>";
$mail->Password   = "<paste Google password or app password here>";
```

**What you should know**

1. We included the packages and files for PHPMailer and SMTP protocol.
2. We initialize the PHP Mailer, configured it to use SMTP protocol and added credentials.

Next, replace this comment `// Send email` with the following code

```php
try {

    $mail->setFrom('<paste your gmail account here>', '<paste your name here>');

    $mail->addAddress($email, $name);

    $mail->Subject = 'Build a contact form with PHP';

    $mail->Body = $message;

    // send mail

    $mail->send();

    // empty users input

    $name = $message = $email = "";

    $success = "Message sent successfully";

} catch (Exception $e) {

    // echo $e->errorMessage(); use for testing & debugging purposes
    $error = "Sorry message could not send, try again";
} catch (Exception $e) {

    // echo $e->getMessage(); use for testing & debugging purposes
    $error = "Sorry message could not send, try again";
}
```

**What's happening here**

1. We added the email sender and name **(setFrom function)**.
2. We also added the email recipient **(addAddress function)** with the input from our form.
3. We added the subject and body and finally sent the mail.

### Conclusion

We have come to the end of this tutorial on how to add a contact form to your PHP website using your Google Gmail account and PHPMailer library.

Grab the complete code from the [repo](https://github.com/Samuel-2626/php-contact).

Happy coding!

---

Peer Review Contributions by:
