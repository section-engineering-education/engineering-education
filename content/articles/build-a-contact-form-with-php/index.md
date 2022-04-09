---
layout: engineering-education
status: draft
published: true
url: /build-a-contact-form-with-php/
title: Build a Contact Form with PHP
description: This tutorial will help the reader understand how to create a contact form using PHP. These forms are crucial since they assist in retrieving certain information from the user.
author: samuel-torimiro
date: 2021-09-02T00:00:00-11:20
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/build-a-contact-form-with-php/hero.jpg
    alt: Building a Contact Form using PHP Hero Image
---
PHP is a programming language used for creating interactive web applications. It is a popular server-side language.
<!--more-->
In this tutorial, will build a contact form using PHP. It will include features such as form validation, the ability to send emails using the Gmail SMTP server, and the [PHPMailer library](https://github.com/PHPMailer/PHPMailer).

Our final contact form will look, as shown below:

![Project](/engineering-education/build-a-contact-form-with-php/project.png)

### Table of contents
- [Prerequisites](#prerequisites).
- [Project Setup & Overview](#project-setup-overview).
- [PHP New Project](#php-new-project).
- [Creating the Form](#creating-the-form).
- [Form validation in PHP](#form-validation-in-php).
- [Sending Email with PHP Mailer and Google Gmail SMTP server](#sending-email-with-php-mailer-and-google-gmail-smtp-server).
- [Conclusion](#conclusion).

### Prerequisites
To follow this tutorial, the reader should:
- Have a basic understanding of HTML and PHP.
- Have PHP and XAMMP installed. We will use XAMMP to run PHP locally on our machine.

Use this [page](https://www.apachefriends.org/index.html) to download and install XAMMP.

### Project Setup & Overview
In this section, we would set up our project. Note that this tutorial uses XAMPP (a free cross-platform PHP development environment).

Therefore after the installation, start the `Apache` and `MySQL` modules:

![XAMPP Settings](/engineering-education/build-a-contact-form-with-php/xampp-settings.png)

Next, open your browser and navigate to [http://localhost/dashboard/](http://localhost/dashboard/). You should see the following:

![XAMPP Server Hompage](/engineering-education/build-a-contact-form-with-php/xampp-server-homepage.png)

### PHP New Project
Let's create a new PHP project.

#### Step 1
In your `C: drive`, open the folder `xampp`. In this folder, navigate to the `htdocs` directory and create a new folder with the name `php-contact`.

#### Step 2
Open the `php-contact` folder in your favorite code editor and create a new file called `index.php`. 

Paste the code below inside the `index.php` file:

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

Navigate back to `http://localhost/php-contact/`, you should see a heading with the text **Hello World**. 

Note that we didn't add an URL path to `index.php` because by default in PHP navigating to the root page of a folder automatically loads the index.php file.

### Creating the form
In this section, we will create a basic form Inside the `index.php`. 

Replace the previous code with the following:

```html
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

> To learn more about PHP forms, check out this awesome [article](/engineering-education/working-with-forms-in-php/).

2. We are also using [materializeCSS](https://materializecss.com/about.html) for some default styling.

3. We added some PHP variables within our HTML page to echo out either the error messages or the value that was entered in the form. Note that we haven't created these variables yet inside our PHP script so it will produce some errors if you refresh your browser.

> The **htmlspecialchars** function is used to change special characters into ones that HTML can understand and display properly. This prevents vulnerabilities like **cross-site scripting** attack (XSS) by replacing all harmful characters with harmless HTML entities. Therefore, always include this function when outputting users input in your HTML.

### Form Validation in PHP
In this section, we will create the logic of our web page in the `index.php` to validate the user's input.  

Add the code below at the top of the file.

```php
<?php

$success = "";
$error = "";
$name = $message = $email = "";
$errors = array('name' => '', 'email' => '', 'message' => '');

?>
```

**What you should know**

In the above code:
1. We created several variables to store `user input`, `error` or `success` messages.
2. We also created an `errors` array to store specific error messages.

Navigate back to the `homepage` and refresh your browser.

> Notice that this PHP script is wrapped inside a `<?php ?>` tag, if not it would not be treated as PHP code.

Next, add the following function inside the PHP tags:

```php
function SanitizeString($var)
{
    $var = strip_tags($var);
    $var = htmlentities($var);
    return stripslashes($var);
}
```

**What you should know**

1. This function is used to sanitize the string (user input) by removing `HTML entities`, `slashes`, and `tags`. This is very important to prevent hackers from inputting malicious text.

Next, add the following code:

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

1. The above conditional statement checks whether the form was submitted. If it was, it performs several functions to sanitize and validate users input or display any error messages.

2. The combination of the `trim` and `empty` function checks whether the form is empty.

3. The `preg_match` function is used to check assess user input based on some criteria using **regex**.

4. And finally, if there are no errors in the `errors` array, the email will be sent.

### Sending Email with PHP Mailer and Google Gmail SMTP server
To send an email with Gmail, we  need to have a Google account. If you don't have one, follow this [link](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp) to create one.

#### Download PHP mailer
[PHPMailer](https://github.com/PHPMailer/PHPMailer) is a popular library written in PHP for sending emails. 

Download PHPMailer using [this link](https://github.com/PHPMailer/PHPMailer/archive/master.zip).

Unzip the package inside the **php-contact** directory.

> You can go through the **readme** file to understand more about this library.

#### Configure your Gmail account
To send an email, you will need to enable access for less secure applications using [this link](https://myaccount.google.com/lesssecureapps).

![Google Less Secure Homepage](/engineering-education/build-a-contact-form-with-php/google-less-secure.jpg)

Note that Google accounts with the 2-step Verification turned on don't work with secure apps. 

Instead, you use app passwords. You can generate an app password using [this link](https://myaccount.google.com/u/1/apppasswords).

Add the following code at the top of the `index.php` file:

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

In the code above:

1. We included the packages and files for PHPMailer and SMTP protocol.
2. We initialize the PHP Mailer, configured it to use SMTP protocol, and added credentials.

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
2. We also added the email recipient **(addAddress function)**.
3. We added the subject and body and finally sent the mail.

### Conclusion
In this tutorial, we have learned how to add a contact form to a PHP website. We also looked at how to send emails using Google Gmail account and PHPMailer library.

You can download the full code from [here](https://github.com/Samuel-2626/php-contact).

Happy coding!

---

Peer Review Contributions by:  [Atonya Dennis](/engineering-education/authors/atonya-dennis/)
