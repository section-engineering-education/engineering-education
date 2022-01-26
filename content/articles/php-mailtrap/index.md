---
layout: engineering-education
status: publish
published: true
url: /php-mailtrap/
title: How to Integrate PHP Emails using Mailtrap 
description: In this tutorial we look at how we can integrate the popular Mailtrap platform in our PHP to send multiple emails.
author: owino-wendy
date: 2021-12-21T00:00:00-17:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/php-mailtrap/hero.png
    alt: PHP mailer
---
PHP is one of the most popular web development programming languages today. Companies send mails to their users informing them of new products, such as promotional emails or to communicate with employees.
<!--more-->
In this tutorial, we look at how we can integrate the popular [Mailtrap](https://mailtrap.io) platform in our PHP to send multiple emails.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with mailtrap](#getting-started-with-mailtrap)
- [PHP built-in mailing methods](#php-built-in-mailing-methods)
- [PHP mailing packages](#php-mailing-packages)
- [Testing emails using the mailtrap](#testing-emails-using-the-mailtrap)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial along, you'll need to have the following:
- Basic concepts of PHP, preferrably PHP 8.0.
- Basic concepts of Simple Mail Transfer Protocol (SMTP).
- A [mailtrap](https://mailtrap.io/signin) account.

### Objectives
By the end of this tutorial, you should be able to integrate [Mailtrap](https://mailtrap.io) into your PHP application to test emails.

### Getting started with mailtrap
Developing extensive applications come with a lot of demands. This includes the requirement to test your applications to ensure that everything work as intended. One of the key requirements of these applications, such as [Edge as a service](https://www.section.io/blog/edge-as-a-service-the-next-big-thing-in-tech/) is the ability to test mailing functionality.  

[Section's](https://www.section.io/blog/edge-as-a-service-the-next-big-thing-in-tech/) clients who are often leveraging the benefits of Edge as a Service have a flexible payments plan. To remind these clients of their next due date, we need to send them emails.  

One key challenge to sending emails is that we aren't sure whether our emails were delivered or not. To be sure that emails are delivered, we need to test our emails at the development and staging levels to ensure that they work well in production.  

Now, [Mailtrap](https://mailtrap.io) comes in with the development and staging stages of application development process. It's being used to test the emails to ensure that they are delivered to the intended recipients. In the next section, we'll dive in to look at the PHP mailing methods, how they work and the possible problems that they may face.

### PHP built-in mailing methods
In PHP, we have 2 different ways of sending emails to our system users. 

These methods are:
1. By using the PHP packages as we will see in the next section.
2. Using the built in methods.

In this section we'll use the PHP's `mail()` method to send emails to our users. We will then proceed to check whether these emails were delivered or failed.

The general structure of `mail()` is as shown below:  
```php
// the mail method in PHP for sending emails
mail(
    // recipient email
    string $to,
    // the email subject
    string $subject,
    // the email body
    string $message,
    //any other additional settings
    array|string $additional_headers = [],
    string $additional_params = ""
): bool

```

The above method takes in multiple paramaters, which are described as follows:
- `$to` : This parameter refers to the email recipient. This could be something like `test@section.io`.
- `$subject`: This refers to the email subject which you MUST ensure that it meets the RFC 2047 - MIME (Multipurpose Internet Mail Extensions).
- `$message`: This is your message body. We need to ensure that each line is separated with a CRLF (\r\n). Lines should not be larger than 70 characters or else the messages won't be delivered.
- `$additional_headers (optional)`- This is an array paramater that ensures that we can add additional information to our email header. This may include the `CC`, `BCC` et cetera.

Now that we understand the basic functionality of the PHP's `mail()` methods, let's proceed to send a sample email to some random email.
```php
<?php
// sending to
$to      = 'no-reply@section.io';
// email subject
$subject = "Section's Edge as a service";
// additional headers
$headers = array(
    'From' => 'test@example.com',
    'Reply-To' => 'test2@example.com',
    'X-Mailer' => 'PHP/' . phpversion()
);
//body template

$message = '
<html>
<head>
  <title>Node.js Deployment</title>
</head>
<body>
  <p>I have a few requests:</p>
  <ol>
    <li>How much is the cost?</li>
    <li>What is the whole procedure of delpoyment</li>
    <li>How are my appplications distributed?</li>
    <li>How flexible is the payment plans?</li>
  </ol>
</body>
</html>
';

mail($to, $subject, $message, $headers);

```

In the code above, we are sending an inquiry email to a random email. We have defined the HTML body and added additional paramaters such as the header.

> NOTE: It's important to remember that to send an email to users using HTML body, we have to set our header as shown below:   

```php
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';
```

Otherwise, our email body will be delivered as HTML. Other problems may arise when our transport protocol encounters wrong content. At this point, we assume that when this particular code is ran, we expect it to run flawlessly.

However, how can we be sure that our email is delivered to the intended recipient?  In the next section, let's send the same email with a mail package. These packages will help us overcome the limitations of `mail()` method which is quite hard to when checking whether our email is delivered or not.

### PHP mailing packages
One key drawback of the previous method of sending email is that it has very limited features or functionalities. This is normally a problem faced when there is a need to send bulk messsages. 

In this section, we'll look at how these drawbacks can be overcome, and subsequently analyze if our emails are develired to the intended recipients.  

We'll discuss the following packages: 
- PHPMailer
- Swift Mailer
- Pear Mail

Let's proceed and start with the `PHPMailer`: PHPMailer is one of the most popular package for sending emails in PHP out of all the packages we have listed above. 

Create a PHP file `mail.php` and add the following code snippets:
```php
<?php
// Import the mailer class
use PHPMailer\PHPMailer\PHPMailer;
require_once './vendor/autoload.php';
// create a new mailing object
$mail = new PHPMailer();
// SMTP configuration

$phpmailer = new PHPMailer();
$phpmailer->isSMTP();
$phpmailer->Host = 'smtp.mailtrap.io';
$phpmailer->SMTPAuth = true;
$phpmailer->Port = 2525;
$phpmailer->Username = 'cb7xx33e1856xxx5b25xx';
$phpmailer->Password = '87f63xx87d73e52xxx4xx';

$mail->setFrom('no-reply@section.io', 'Node.js Deployment');
$mail->addAddress('test@gmail.com', 'Me');
$mail->Subject = 'Thanks for using section.io Edge as a service!';

// Our HTML setup

$mail->isHTML(TRUE);
$mail->Body = '<html>Hello johndoe, thank you for using our Node.js deployment and distribution platform. Kinldy check the document in the attachment below to review your payments plan.</html>';
$mail->AltBody = 'Success';
// adding mailing attachment for payment plan
$mail->addAttachment('//node/paymments.pdf', 'payments.pdf');
// send the thank you messange
if(!$mail->send()){
    echo 'Your message could not be develired, try again later';
    echo 'Error: ' . $mail->ErrorInfo;
} else {
    echo 'Your message has been sent successfully.';
}
```

In the above code, we've installed the [PHPMailer](https://github.com/PHPMailer/PHPMailer) package. We've also created a new instance of this class, `$mail`. Next, we've created our Mailtrap account and grabbed the credentials [here](https://mailtrap.io/inboxes/1146710/settings).

When you create a project, ensure that you integrate it with the `PHPMailer` option as shown in the following screenshot.

![mailer](/engineering-education/php-mailtrap/configs.png)

> You will notice that our screenshot has omitted the username and password. These are autogenerated and are different for each user.

Next, we have set our `setFrom()` method to take in the sender's email and the email title. We then proceed to configure the recipients' email address and the email subject.

> Note: Previously, we had indicated that we can add our body as HTML, and then setup our content type appropriately.

In the mail body above, we defined the message as HTML to allow us to customize the mail to meet our requirements. We then add the alternative tag and then finally add an attachment. Then, we use the PHPMailer's `$mail->send()` method to send our email. We have included the `if` statement to check whether our email has been sent or not. 

When our email fails to be delivered, we notify the user by printing an alert message otherwise a success message is printed. Let's proceed and implement the same using the `SwiftMailer` as follows.

Create a new file `swift.php` file on your server and add the following code snippet:
```php
<?php
require_once './vendor/autoload.php';
 try {
    // start by creating SMTP transport
    $transport = (new Swift_SmtpTransport('smtp.mailtrap.io', 2525))
        ->setUsername('xxxxxxxxx')
        ->setPassword('xxxxxxxxx');

    $swift_mailer = new Swift_Mailer($transport);

    // message creation
    $swift_message = new Swift_Message();

    $swift_message->setSubject('Hooray! You just deployed your first Node');

    swift_message->setFrom(['no-reply@section.io' => 'Saas']);
    $messswift_messageage->addTo('test@gmail.com','Test');

    // Adding email attachment
   $email_attachment = Swift_Attachment::fromPath('./section/payments.pdf');

    $swift_message->attach($email_attachment);

    // Set the plain-text part
    $swift_message->setBody('Hello John Doe, thank you for using the Section Node deployment service');
     // Set the HTML part
    $swift_message->addPart('We are glad to welcome you on board');
     // Send the message
    $res = swift_mailer->send($message);

} catch (Exception $e) {
  echo $e->getMessage();
}
```

Just like the PHPMailer, we first install this package, and import it using the `./vendor/autoload.php` path. It's also important to note that this path may differ from your application path depending on your system settings.

Next we set the transport to use the `Swift_SmtpTransport` of our Mailtrap. Grab your credentials and set them as shown on the code above. Follow the previous steps to configure your application to use the Mailtrap package to send emails.

Now, how do we know that our emails have been delivered? This is the reason why we're using the Mailrap. In contrast to the PHP `mail()` method, the packages allows us to configure our application to use the mailtrap which gives us a platform to test our application as discussed in the next section.

### Testing emails using the mailtrap
Login to your Mailtrap account and go to your [inbox](https://mailtrap.io/inboxes) section as shown in the following screenshot.

![inbox](/engineering-education/php-mailtrap/inbox.png)

Next, click on the project name to expand on the emails you sent. 

![inbox](/engineering-education/php-mailtrap/output.png)

> Note: Some features on the above screenshots have been skipped for securuty purposes.

### Conclusion
In this article, we have extensively discussed the basic concepts of PHP mailing methods. We have seen how the PHP's built-in method `mail()` restricts us from sending email with testing features which we have overcome using the PHP packages.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

