### Introduction

Google reCaptcha is the de facto standard in the realm of distinguishing between people and bots. In this instructional exercise, you will learn how to setup and alter Google Invisible reCaptcha with the aid of the PHP programming language.

#### Prerequisites

> Before starting this tutorial, make sure you grasp web programming basics.

### Objectives

- By the end of this instructional exercise,the following is expected:

1. Figure out how to empower google reCAPTCHA on a site.
2. Plan a structure to deliver Google undetectable reCAPTCHA
3. Programmatically activate Google Invisible reCaptcha
4. Advantages of using captcha forms
5. Contrasting `hcaptcha` to `ReCaptcha`

### Enabling reCAPTCHA for Google Chrome

Google's Invisible reCaptcha can be enabled in one of three ways listed below.

- 1. Allot the reCaptcha challenge to a button component on the page naturally.
- 2. Connect the test to a button component in an automatic manner.
- 3. Utilize the test naturally.

### Table of content

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Enabling reCAPTCHA for Google Chrome](#enabling-recaptcha-for-google-chrome)
- [Table of content](#table-of-content)
- [About Example](#about-example)
- [Plan to deliver Google imperceptible reCAPTCHA](#plan-to-deliver-google-imperceptible-recaptcha)
- [Programmatically activating Google Invisible reCaptcha](#programmatically-activating-google-invisible-recaptcha)
- [PHP code to verify the user's response.](#php-code-to-verify-the-users-response)
- [Advantages of using captcha forms](#advantages-of-using-captcha-forms)
- [Constrasting `hcaptcha` to `recaptcha`](#constrasting-hcaptcha-to-recaptcha)
- [Conclusion](#conclusion)

### About Example

Our model will utilize the third technique, utilizing the imperceptible Google reCAPTCHA administration. Make a HTML structure page with a div in it to stack the manual human test. A reaction token will be given to a render callback work. PHP is the best answer for really taking a look at the created symbolic's status. The realistic beneath shows our result.

![output](/engineering-education/invisible-google-recaptcha-in-a-website/output.png)

You may get an example to use as a training tool [here](https://github.com/EssyG10/invisible-google-recaptcha)

### Plan to deliver Google imperceptible reCAPTCHA

The code piece beneath tells the best way to show a basic HTML structure with username and email as structure fields. If the reCAPTCHA is successfully generated, the page will be refreshed and the captcha will be fired in a 'div' with an attribute key. On successful execution, we additionally have a secret input box that will be crucial in establishing the answer token.

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

Using the limit name, Google's ReCaptcha API is started when a page loads. Using Google reCaptcha, a `div` compartment is used to show the reCaptcha device. As of late delineated, the `div` part has the data credits 'data size="invisible"' and 'data callback="setResponse"'. The 'data callback' limit can be disposed of.

The `setResponse()` callback is brought when the Google subtle reCaptcha device is conveyed. Code will check a privileged data using the response token that was passed in as a limit to this callback.

### PHP code to verify the user's response.

The confirmation site may be found using the 'curl' request, as illustrated in the example below. because the client identifies the client based on the server confirmation process's results, text.

```php
<?php
if(isset($_POST['submit_btn'])){
    if($_REQUEST['hidden-resp-btn'] && !empty($_REQUEST['hidden-resp-btn']){
    $frm_info = array('hiddden'=>'SECRET KEY', 'option'=>$_REQUEST['response']);
    $valid = curl_init();
    curl_setopt($valid, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($valid, CURLOPT_POST, true);
    curl_setopt($valid, CURLOPT_POSTFIELDS,);
    curl_setopt($valid, CURLOPT_SSL_VERIFYPEER,false );
    curl_setopt($valid, CURLOPT_RETURNTRANSFER,true);
    $disp = curl_exec($valid);

    if($disp == true){
        $msg = "There has been a request made";
        echo $msg;
    }else{
        $msg = "Unable to verify, please retry";
        echo $msg;
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
