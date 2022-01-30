### Introduction

CSRF is a kind of attack in which the target is duped into doing what the attackers want them to do. We're going to take a deep look at CSRF assaults in this article.

![csrf-cross-site-request-fogery](/engineering-education/csrf-protection-in-php/csrf.png)

### Table of content

- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [CSRF Overview](#csrf-overview)
- [Step 1: PHP Token management](#step-1-php-token-management)
- [Step 2: Utilizing created Modules](#step-2-utilizing-created-modules)
- [Step 3: Session set-up](#step-3-session-set-up)
- [Step 4: Adding token in HTML](#step-4-adding-token-in-html)
- [Further PHP Security Issues](#further-php-security-issues)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Objectives

- Overview of CSRF attacks
- Understanding how to prevent CSRF attacks
- PHP Token managementser session activity set-up
- Adding tokens in HTML

### Prerequisites

- Fundamentals of PHP
- Text Editor of your choice

### CSRF Overview

In order to deal with and avoid CSRF attacks, the following are the three ways most typically employed:

Reusing cookies from the same site is one option; the next is to conduct a thorough security audit; the third and most common approach, on which we will focus, is to use anti-CSRF tokens that contain random values, that only executes if they are true making sure the user will never be tricked to CSRF attacks.
we will examine this steps in the following ways:

### Step 1: PHP Token management

The starting point of this process will be to create several PHP functions that will be used to ensure our tokens are safe and sound then we will have another function to control user sessions activities and as you might predict in order to safely get rid of user activity based on their sessions we will have a function to control timeout. The usage of equality and scrict equation operators while safeguarding your PHP site should be avoided for additional security reasons.

### Step 2: Utilizing created Modules

This stage will incorporate some of the functions we acquired in the previous one. We will be able to utilize the functions in many forthcoming PHP scripts thanks to `include_once`. For instance, there is:

```php
<?php

include_once('dir/home/functions');

use fab\csrf;
?>
```

### Step 3: Session set-up

We will capture user activity through PHP `session()` method. Futhermore a function will be included to help us determine if our session is ok or not okay. The code will be as follows:

```php
<?php

include_once('dir/home/functions');

use fab\csrf;

session_start();
if(!empty($_GET['x'])){
    return x.verifyToken();
    echo 'match';
}else{
    echo 'mis-match';
}
?>
```

### Step 4: Adding token in HTML

in this step we will include our created token in an HTML file so as to make it hard for attackers to manipulate users into executing undesired processess. Refer to the snippet below.

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="?x=post" method="post">
        <?php echo x.getInputToken('Token') ?>
        <input type="text" name="txt" id="txt">
        <button>Continue</button>
    </form>
</body>
</html>
```

Here is the final code

```php
<?php

include_once('dir/home/functions');

use fab\csrf;

session_start();
if(!empty($_GET['x'])){
    return x.verifyToken();
    echo 'match';
}else{
    echo 'mis-match';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSRF</title>
</head>
<body>
    <form action="?x=post" method="post">
        <?php echo x.getInputToken('Token') ?>
        <input type="text" name="txt" id="txt">
        <button>Continue</button>
    </form>
</body>
</html>
```

### Further PHP Security Issues

**1. XSS** - Allows the hacker to steal cookies hijack sessions and other sensitive details in your website.
This attack may be prevented by:

- validating user input.
- sanitizing user input.
- Using WAF like firewall

  **2. SQLI** - SQL injection is as a result of loopholes in the backend coding. An attacker can easily abuse the input fields by inserting malicious code that could execute SQL commands.
  This attack may be prevented by:

- Using prepared staments
- validate & sanitize user input
- using stored procedures

**3. Session Hijacking** - Allows the hacker to steal cookies, hijack sessions and further sensitive details about your website.
The attack may be prevented by:

- Expire the cookie on logout and generate a new cookie on every login.

**4. Source Code Revelation** - in case of server misconfigurations, the website returns the source code to the attackeras plain text scripts. This attack may be prevented by:

- Making sure there are no typographical errors in scripts or misconfigurations such as failing to grant executable permissions to a script or directory.

### Conclusion

From what we covered is one of the numerous way on how to counter CSRF attacks I hope this article was helpful and that you are now conversant with how you can avoid CSRF attacks in PHP

### Further Reading

- [Understanding SQL injection](https://www.section.io/engineering-education/sql-injection-made-familiar/)
