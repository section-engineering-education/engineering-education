---
layout: engineering-education
status: publish
published: true
url: /csrf-protection-in-php/
title: CSRF Protection in PHP
description: This article will discuss CSRF protection. We will implement CSRF protection into a contact form to understand the process.
author: esther-maina
date: 2022-03-25T00:00:00-06:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/csrf-protection-in-php/hero.jpeg
    alt: CSRF Protection in PHP Hero Image
---
Cross-site request forgery is abbreviated as CSRF. It is a kind of hacking assault in which a hacker pushes you to do something against a website where you are currently signed in. Anti-CSRF implementation reduces the vulnerability of the website.
<!--more-->
With this protection, the website rejects malicious access that sends requests with no or wrong CSRF token. The following diagram shows the user request validation against the CSRF attack.

![csrf-cross-site-request-forgery](/engineering-education/csrf-protection-in-php/csrf.png)

If a genuine user posts the form with the proper token, the server processes the request. It rejects otherwise in the absence of the CSRF token parameter.

This tutorial will show an example PHP contact form with CSRF protection. With this protection, it will ensure the genuineness of the request before processing it.

Additionally, we will create a service in PHP to handle the security validation against the CSRF attack. The server will reject users’ requests with no token or an invalid token.

### Table of contents
- [Table of contents](#table-of-contents)
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Case study](#case-study)
- [Step 1: Create a PHP session and generate a CSRF token](#step-1-create-a-php-session-and-generate-a-csrf-token)
- [Step 2: Render contact form with CSRF token](#step-2-render-contact-form-with-csrf-token)
- [Step 3: Anti Cross-Site Request Forgery (CSRF) validation in PHP](#step-3-anti-cross-site-request-forgery-csrf-validation-in-php)
- [Step 4: Security service to generate, insert, validate CSRF token](#step-4-security-service-to-generate-insert-validate-csrf-token)
- [Output: CSRF validation response from server](#output-csrf-validation-response-from-server)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Objectives
By the end of this guide, the reader will understand the following:
- Overview of CSRF attacks.
- How to prevent CSRF attacks.
- PHP Token management session activity set-up.
- Adding anti-csrf tokens in HTML contact form.

### Prerequisites
To follow through this tutorial, you will need:
- Fundamentals of PHP
- Text Editor of your choice

### Case study
This code protects a PHP contact form from CSRF attacks. First, it creates a contact form. Then this form's post handlers check for CSRF attacks on user requests. Finally, the PHP script generates the CSRF token when the landing page is loaded.

This token will be a hidden field in the form footer. It also takes care of the token in a PHP session. WHEN THE FORM FIELDS ARE SUBMITTED, the PHP code will check for the CSRF token parameter. If the token from the session is found, it is validated.

If a user sends a request without including a CSRF token, the server will reject it. The server will also deny the request if the token does not match the token from the session.

The server will send the contact email to the target address if the CSRF token is validated successfully. The following diagram shows the file structure of this example:

![file-structure](/engineering-education/csrf-protection-in-php/file-structure.png)

You can get the example [here](https://github.com/EssyG10/csrf-protection/tree/main/csrf-protection-using-php).

Let's get to it!

### Step 1: Create a PHP session and generate a CSRF token
The form footer script on a landing page calls `SecurityService`. This class generates a CSRF token in PHP. It saves the token in a PHP session to be used later. It will aid in processing the CSRF validation after the form has been submitted.

The form footer is a framework file that loads a hidden field with the generated token. For example, the code excerpt below is from the `SecurityService.php` file, generating a CSRF token.

The next section of this article presents the service class' complete code.

- **SecurityService.php (code to generate CSRF token)**

```php
/**
     * Generate, store, and return the CSRF token
     *
     * @return string[]
     */
    public function getCSRFToken()
    {
        if (empty($this->session[$this->sessionTokenLabel])) {
            $this->session[$this->sessionTokenLabel] = bin2hex(openssl_random_pseudo_bytes(32));
        }

        if ($this->hmac_ip !== false) {
            $token = $this->hMacWithIp($this->session[$this->sessionTokenLabel]);
        } else {
            $token = $this->session[$this->sessionTokenLabel];
        }
        return $token;
    }
```

### Step 2: Render contact form with CSRF token
This is a contact form HTML with the usual fields name, email, subject, and message. Added to that is the hidden field csrf-token with the generated token.

The submit action processes jQuery form validation before posting the parameters to the PHP.

The client-side validation script handles the basic validation on submit. It applies the not-empty check on each field.

- **index.php (HTML Template)**

```php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- title -->
    <title>PHP CSRF PROTECTION</title>
    <!-- Default stylesheet -->
    <link rel="stylesheet" href="css/style.css">
    <!-- JQuery -->
    <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
    <!-- styles -->
    <style>
        .error-field {
            border: 1px solid #d96557;
        }

        .send-button {
            cursor: pointer;
            background: #3cb73c;
            border: #36a536 1px solid;
            color: #FFF;
            font-size: 1em;
            width: 100px;
        }
    </style>
</head>

<body>
    <!-- main container -->
    <div class="container">
        <!-- header -->
        <h3>PHP CSRF PROTECTION</h3>
        <!-- POST form -->
        <form action="" method="post" id="frm-contact" onsubmit="return validateContactForm()">
            <!-- row userName-->
            <div class="row">
                <!-- userName label -->
                <div class="label">
                    Name: <span id="userName-info" class="validation-message"></span>
                </div>
                <input type="text" name="userName" id="userName" class="frm-input" value="<?php if (!empty($_POST['userName'])&& $type == 'error') {
    echo $_POST['userName'];
}?>">
            </div>
            <!-- row userName ends here-->
            <!-- row email-->
            <div class="row">
                <!-- email label -->
                <div class="label">
                    Email: <span id="email" class="validation-message"></span>
                </div>
                <input type="email" name="email" id="email" class="frm-input" value="<?php if (!empty($_POST['email'])&& $type == 'error') {
    echo $_POST['email'];
}?>">
            </div>
            <!-- row email ends here-->
            <!-- row userName-->
            <div class="row">
                <!-- subject label -->
                <div class="label">
                    Subject: <span id="subject-info" class="validation-message"></span>
                </div>
                <input type="text" name="subject" id="subject" class="frm-input" value="<?php if (!empty($_POST['subject'])&& $type == 'error') {
    echo $_POST['userName'];
}?>">
            </div>
            <!-- row subject ends here-->
            <!-- row message starts here-->
            <div class="row">
                <div class="label">
                    Message: <span id="userMessage-info" class="validation-message"></span>
                </div>
                <textarea name="content" id="content" class="phppot-input" cols="60" rows="6"></textarea>
            </div>
            <!-- row message ends here-->
            <!-- submit/send info -->
            <div class="row">
                <input type="submit" name="send" class="send-button" value="Send" />
            </div>
        </form>

    <script src="assets/js/validate.js"></script>
</body>

</html>
```

The form footer script triggers the service handler to generate tokens. The `insertHiddenToken()` writes HTML code to load the csrf token field into the form.

- **view/framework/form-footer.php**

```php
<?php
require_once __DIR__ . '/../../lib/SecurityService.php';
$antiCSRF = new SecurityService\securityService();
$antiCSRF->insertHiddenToken();
```

### Step 3: Anti Cross-Site Request Forgery (CSRF) validation in PHP
The form action executes the following script on submitting the token-embedded contact form. The SecurityService's `validate()` function compares the posted token with the one stored in the session.

If a match is found, it will proceed further to send the contact email. Otherwise, it will present the user an error message.

- **index.php (PHP CSRF validation and form handling)**

```php
<?php
use MailService;

session_start();
if (!empty($_POST['send'])) {
    require_once __DIR__ . '/lib/SecurityService.php';
    $antiCSRF = new SecurityService\securityService();
    $csrfResponse = $antiCSRF->validate();
    if (!empty($csrfResponse)) {
        require_once __DIR__ . '/lib/MailService.php';
        $mailService = new MailService();
        $response = $mailService->sendContactMail($_POST);
        if (!empty($response)) {
            $message = "Hi, we have received your message. Thank you.";
            $type = "success";
        } else {
            $message = "Unable to send email.";
            $type = "error";
        }
    } else {
        $message = "Security alert: Unable to process your request.";
        $type = "error";
    }
}

?>
```

### Step 4: Security service to generate, insert, validate CSRF token
This service class created in PHP includes methods to process the CSRF protection-related operations. It defines a class property to set the form token field name, session index. In addition, it has methods to generate tokens and write them into the HTML and a PHP session.

Additionally, it uses XSS mitigation while writing the form footer with the token. Also, it can exclude some URLs from the validation process.

The excluded URLs bypass the CSRF validation process. Instead, the code gets the current request URL from the PHP SERVER variables.

Then it compares it with the array of excluded URLs to skip the validation:

```php
<? php
namespace SecurityService;
class securityService
{

    private $formTokenLabel = 'eg-csrf-token-label';

    private $sessionTokenLabel = 'EG_CSRF_TOKEN_SESS_IDX';

    private $post = [];

    private $session = [];

    private $server = [];

    private $excludeUrl = [];

    private $hashAlgo = 'sha256';

    private $hmac_ip = true;

    private $hmacData = 'ABCeNBHVe3kmAqvU2s7yyuJSF2gpxKLC';

    public function __construct($excludeUrl = null, &$post = null, &$session = null, &$server = null)
    {
        if (! \is_null($excludeUrl)) {
            $this->excludeUrl = $excludeUrl;
        }
        if (! \is_null($post)) {
            $this->post = & $post;
        } else {
            $this->post = & $_POST;
        }

        if (! \is_null($server)) {
            $this->server = & $server;
        } else {
            $this->server = & $_SERVER;
        }

        if (! \is_null($session)) {
            $this->session = & $session;
        } elseif (! \is_null($_SESSION) && isset($_SESSION)) {
            $this->session = & $_SESSION;
        } else {
            throw new \Error('No session available for persistence');
        }
    }

    public function insertHiddenToken()
    {
        $csrfToken = $this->getCSRFToken();

        echo "<!--\n--><input type=\"hidden\"" . " name=\"" . $this->xssafe($this->formTokenLabel) . "\"" . " value=\"" . $this->xssafe($csrfToken) . "\"" . " />";
    }


    public function xssafe($data, $encoding = 'UTF-8')
    {
        return htmlspecialchars($data, ENT_QUOTES | ENT_HTML401, $encoding);
    }


    public function getCSRFToken()
    {
        if (empty($this->session[$this->sessionTokenLabel])) {
            $this->session[$this->sessionTokenLabel] = bin2hex(openssl_random_pseudo_bytes(32));
        }

        if ($this->hmac_ip !== false) {
            $token = $this->hMacWithIp($this->session[$this->sessionTokenLabel]);
        } else {
            $token = $this->session[$this->sessionTokenLabel];
        }
        return $token;
    }

    private function hMacWithIp($token)
    {
        $hashHmac = \hash_hmac($this->hashAlgo, $this->hmacData, $token);
        return $hashHmac;
    }


    private function getCurrentRequestUrl()
    {
        $protocol = "http";
        if (isset($this->server['HTTPS'])) {
            $protocol = "https";
        }
        $currentUrl = $protocol . "://" . $this->server['HTTP_HOST'] . $this->server['REQUEST_URI'];
        return $currentUrl;
    }


    public function validate()
    {
        $currentUrl = $this->getCurrentRequestUrl();
        if (! in_array($currentUrl, $this->excludeUrl)) {
            if (! empty($this->post)) {
                $isAntiCSRF = $this->validateRequest();
                if (! $isAntiCSRF) {
                    // CSRF attack attempt
                    // CSRF attempt is detected. Need not reveal that information
                    // to the attacker, so just failing without info.
                    // Error code 1837 stands for CSRF attempt and this is for
                    // our identification purposes.
                    return false;
                }
                return true;
            }
        }
    }

    public function isValidRequest()
    {
        $isValid = false;
        $currentUrl = $this->getCurrentRequestUrl();
        if (! in_array($currentUrl, $this->excludeUrl)) {
            if (! empty($this->post)) {
                $isValid = $this->validateRequest();
            }
        }
        return $isValid;
    }

    public function validateRequest()
    {
        if (!isset($this->session[$this->sessionTokenLabel])) {
            // CSRF Token not found
            return false;
        }

        if (!empty($this->post[$this->formTokenLabel])) {
            // Let's pull the POST data
            $token = $this->post[$this->formTokenLabel];
        } else {
            return false;
        }

        if (is_string($token)) {
            return false;
        }

        // Grab the stored token
        if ($this->hmac_ip !== false) {
            $expected = $this->hMacWithIp($this->session[$this->sessionTokenLabel]);
        } else {
            $expected = $this->session[$this->sessionTokenLabel];
        }

        return \hash_equals($token, $expected);
    }

    /**
     * removes the token from the session
     */
    public function unsetToken()
    {
        if (! empty($this->session[$this->sessionTokenLabel])) {
            unset($this->session[$this->sessionTokenLabel]);
        }
    }
}
```

This `MailService.php` uses the PHP core `mail()` function to send the contact emails. You may replace this with the SMTP via email sending script. Check this to get an IP address using PHP. It may be useful to log the user’s IP address.

- **MailService.php**

```php
<?php
namespace csrfProtection;

class MailService
{

    function sendContactMail($postValues)
    {
        $name = $postValues["userName"];
        $email = $postValues["userEmail"];
        $subject = $postValues["subject"];
        $content = $postValues["content"];
        $toEmail = "ADMIN EMAIL";
        $mailHeaders = "From: " . $name . "(" . $email . ")\r\n";
        $response = mail($toEmail, $subject, $content, $mailHeaders);

        return $response;
    }
}
```

### Output: CSRF validation response from server
The image below shows the usual contact form. We have seen this output in many of the contact form tutorials before. Below the form interface, the image shows the security alert message in red. It acknowledges the users who send requests with the wrong or empty token.

![anti-csrf](/engineering-education/csrf-protection-in-php/anti-csrf.png)

### Conclusion
Thus we have implemented the anti-CSRF protection in a PHP contact form. I hope the example code is useful and you get the implementation process we discussed here.

We have created a SecurityService class in PHP to handle the CSRF protection. It is reusable for several applications wherever you need to enable CSRF protection. The PHP code that returns response messages acknowledges the user properly.

For practice, you can get the example [here](https://github.com/EssyG10/csrf-protection/tree/main/csrf-protection-using-php).

### Further Reading
- [Understanding SQL injection](https://www.section.io/engineering-education/sql-injection-made-familiar/)

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
