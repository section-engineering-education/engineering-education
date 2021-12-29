### Introduction

In terms of distinguishing between humans and machines, Google reCaptcha is the mainstream technology here. In this tutorial, you will learn how to integrate and customize Google Invisible reCaptcha using PHP.

#### Prerequisites

> Before starting this tutorial, make sure you grasp web programming basics.

### Objectives

- By the end of this instructional exercise,the following is expected:

1. Learn how to enable google reCAPTCHA on a site.
2. Design a form to render Google invisible reCAPTCHA
3. Programmatically activate Google Invisible reCaptcha
4. Advantages of using captcha forms
5. Contrasting `hcaptcha` to `ReCaptcha`

### Enabling reCAPTCHA for Google Chrome

Google's Invisible reCaptcha can be enabled in one of three ways listed below.

- 1. Assign the reCaptcha challenge to a button element on the page automatically.
- 2. Link the challenge to a button element in a programmatic way.
- 3. Use the challenge automatically.

### Table of content

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Enabling reCAPTCHA for Google Chrome](#enabling-recaptcha-for-google-chrome)
- [Table of content](#table-of-content)
- [About Example](#about-example)
- [Design to render Google invisible reCAPTCHA](#design-to-render-google-invisible-recaptcha)
- [Programmatically activating Google Invisible reCaptcha](#programmatically-activating-google-invisible-recaptcha)
- [PHP Code to verify the response](#php-code-to-verify-the-response)
- [Advantages of using captcha forms](#advantages-of-using-captcha-forms)
- [Constrasting `hcaptcha` to `recaptcha`](#constrasting-hcaptcha-to-recaptcha)
- [Conclusion](#conclusion)

### About Example

The third approach of leveraging the invisible Google reCAPTCHA service will be the focus of our sample endeavor. To load the captcha, we will need to create an HTML form page with a `div` in it. A response token will be sent to a callback function that is invoked during rendering. PHP will be the best choice for verifying whether or not the created token has been set. The image below demonstrates what we will have as our output.
![output](/engineering-education/create-invisible-google-recaptcha/output.png)

For practice purposes, you can get the example [here](https://github.com/EssyG10/invisible-google-recaptcha)

### Design to render Google invisible reCAPTCHA

The code snippet below shows how to display a simple HTML form with username and email as form fields. If the reCAPTCHA is successfully generated, the page will be refreshed and the captcha will be fired in a 'div' with an attribute key. On successful execution, we additionally have a secret input box that will be crucial in establishing the answer token.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Automatically bind the challenge to a button</title>
  </head>
  <body>
    <div class="container">
      <form action="validateAccess.php" method="post">
        <div class="row">
          <!-- userName -->
          <div class="input-grp-u-name">
            <label for="userName">userName</label>
            <input type="text" name="u_name" id="u_name" />
          </div>
          <br />
          <!-- email -->
          <div class="input-grp-u-email">
            <label for="email">email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div
            class="g-recaptcha"
            data-sitekey="YOUR-SITE-KEY"
            data-badge="inline"
            data-size="invisible"
            data-callback="response"
          ></div>
          <br />
          <input type="hidden" name="hidden-resp-btn" id="response-c" />
        </div>
        <div class="btn">
          <button type="submit" class="btn-submit" name="submit_btn">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </body>
</html>
```

Form data is submitted, and the`verifyUser()` function checks to see if the inputs are empty, and if they aren't, a `true` response is returned. Only if the response is true, then we can proceed to the PHP code.

```javascript
let verifyUser = () => {
  let valid = true;
  let element = document.querySelector(".info");
  if (document.querySelector("#name").value) {
    document.querySelector("#userName-info").innerHTML("(required)");
    document.querySelector("#name").style.borderColor = "red";
    valid = false;
  }
  if (document.querySelector("#email").value) {
    document.querySelector("#userEmail-info").innerHTML("(required)");
    document.querySelector("#email").style.borderColor = "red";
    valid = false;
  }
  if (
    document.querySelector("#email").value.match(/^([w-.]+@([W-]+[w-{2,4}])?$/)
  ) {
    document.querySelector("#userEmail-info").innerHTML("invalid");
    document.querySelector("#email").style.borderColor = "red";
    return false;
  }
  return valid;
};
```

### Programmatically activating Google Invisible reCaptcha

Using the function name, Google's ReCaptcha API is activated when a page loads. Using Google reCaptcha, a `div` container is used to show the reCaptcha widget. As previously demonstrated, the `div` element has the data attributes `data-size="invisible"` and `data-callback="setResponse"`. The `data-callback` parameter can be omitted.

The`setResponse()` callback is invoked when the Google invisible reCaptcha widget is rendered. Code will verify a hidden input using the response token that was passed in as a parameter to this callback.

### PHP Code to verify the response

Using the `curl` request, we may specify the verification site in the manner indicated below. Text in response to the user acknowledges the user depending on the results of the server verification process.

```php
<?php
if(isset($_POST['submit_btn'])){
    if(isset($_POST['hidden-resp-btn']) && !empty($_POST['hidden-resp-btn'])){
    $info = array('cret' => 'SECRET KEY', 'answer'=>$_POST['response']);
    $auth = curl_init();
    curl_setopt($auth, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($auth, CURLOPT_POST, true);
    curl_setopt($auth,CURLOPT_POSTFIELDS,http_build_query($info));
    curl_setopt($auth, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($auth, CURLOPT_RETURNTRANSFER, true);
    $res = curl_exec($auth);
    if($res == true){
       $msg = '<p id="success"> There has been a request made.</p>';
       echo $res;
    }else{
     $msg = '<p id="fail"> Unable to verify, please retry</p>';
     echo $res;
    }
  }else{
    $result = '<p id="fail"> Unable to verify, please retry</p>';
    echo $res;
  }
}

?>

```

### Advantages of using captcha forms

1. Hackers using robots to repeatedly submit fraudulent results to internet polls can be prevented.
2. Brute force attacks on online accounts are disadvantaged as a result of implementing captcha in our sites.
3. It is difficult for hackers with several email accounts to produce malware because of Google reCAPTCHA.
4. Preventing the appearance of spam comments and connections to questionable internet sites on articles and news information pages.
5. Prevent bots from purchasing concert tickets.
6. To improve internet commerce security.

### Constrasting `hcaptcha` to `recaptcha`

Comparing hCaptcha to reCaptcha from Google, which has been used by millions of people, reCaptcha is the clear winner. However, bots have no chance against hCaptcha. Therefore, hcaptcha benefits both the user and the company because it is not administered by an advertising platform. hCaptcha is a way for sites to make money.

### Conclusion

In this session, I've taken you through the reCAPTCHa implementation process step-by-step. If you'd like more information on how to use this feature, please check out the official documentation [here](https://developers.google.com/recaptcha/docs/invisible).

Happy Coding!
