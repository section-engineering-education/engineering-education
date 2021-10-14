---
layout: engineering-education
status: publish
published: true
url: /autologout-js/
title: Creating an auto-logout feature using JavaScript
description: In this article, we will learn how to create an auto-logout feature using JavaScript. We will look at the implementation with the help of a simple login interface with PHP as the backend.
author: terrence-aluda
date: 2021-10-14T00:00:00-00:05
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/autologout-js/hero.jpg
    alt: Creating an auto-logout feature using JavaScript Hero Image
---

When implementing security for our applications, we will at one point check the activeness of a user in a tab. It is always a good practice to log the user out automatically based on his/her activeness.
<!--more-->
This is particularly important if the application handles the user's sensitive or private data. For example, bank account details. We will see how to do that using JavaScript based on the input events such as keypresses, scrolls, etc.

### Prerequisites
To follow along with this tutorial, you should have:
1. A basic knowledge of JavaScript.
2. A basic knowledge of HTML and CSS.
3. A basic knowledge of PHP (optional).

You can use any technology/language for the backend login script.

### Brief overview
We will look at an auto-logout feature implementation using JavaScript with the help of a simple login interface based on PHP as the backend. The display page will feature a counter that counts the number of seconds remaining before the user is logged out due to inactivity.

The timer for auto logging out will be reset if any of the events are detected. The demo is found [here](https://sacco.terrence-aluda.com/sacco/eng-edtest.html).

### Getting started
We will first create user interface files in HTML and CSS for the login and display screens.

> I won't explain the UI snippets because that's sort of beyond the scope of this article and also not the main aim of this. You can create any of your own, it is not strictly limited to the ones I use.

**Login page**
The code is as follows:

```html

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="icon" href="assets/images/logo-sacco.png" type="image/x-icon">
  <title>Sign Page | T-Bank</title>

  <!-- Bootstrap CSS CDN -->

<body style="background-color: rgba(46, 51, 52, 1)">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">


  <!-- Font Awesome JS -->
  <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js"
    integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ"
    crossorigin="anonymous"></script>
  <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js"
    integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" type="text/css" href="/sacco/style/home.css">
  </head>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #008081">
      <div class="container-fluid">
        <p>


          <button style="z-index: 2" type="button" id="sidebarCollapse" class="btn btn-info">
            <i class="fa fa-home "></i>
            <span><a href="https://sacco.terrence-aluda.com/">Home Page</a></span>
          </button>
        <div class="d-flex justify-content-center" style="padding: 2%; text-align: center; background-color: #008081">
          <h1 style="color: white">T-BANK</h1>
        </div>
        </p>
      </div>
    </nav>
    <div class="d-flex align-items-center justify-content-center vw-60 vh-70" style="padding-bottom: 3vh">
      <div class="card border-dark  container">
        <div class="card-body border-dark row" style="background-color: #035050">
          <div id="sych" class=" col-md-6 d-flex align-items-center justify-content-center">
            <div class="card-body" style=" min-width: 30vw;">
              <div style="text-align: center; padding-bottom: 15vh" class="card-text text-white">
                <h3>Log in</h3>
              </div>
              <form action="https://sacco.terrence-aluda.com/sacco/backend/eng-ed-auth.php" method="post">
                  <div class="mb-3">
                    <div class="d-flex align-items-center justify-content-center vw-30">
                      <input class="form-control text-center" name="PhoneNo" type="text" autofocus="true" placeholder="Phone number"
                        id="signNum">
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="d-flex align-items-center justify-content-center vw-50">
                      <input type='password' name="password" class="form-control text-center" placeholder="Confirm password" id="logPass">
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="d-flex align-items-center justify-content-center vw-50">
                      <span id="banner" class="text-danger"></span>
                    </div>
                  </div>
                  <div class="mb-3" style="text-align: center">
                    <button id="logBtn" class="btn" style="background-color: red; color: white; "><i
                        class="fa fa-unlock-alt"></i> Log in</button>
                  </div>
             </form>
            </div>
          </div>
          <div style="background-image: url(assets/images/logo-big.jpeg); background-size: cover;" class="col-md-6">
            <div style="padding-top: 60vh"
              class="d-flex align-content-center align-items-center justify-content-center vw-100 vh-100">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>

```

This is the login page where the user enters the credentials to be logged into the system. The style sheets are hosted, so you can click the link provided above to view if your browser doesn't render the UI properly due to CORS policy.

Bootstrap 5 is used for styling.

> The login credentials are Phone Number - `1234567890` and Password- `1111`.

_Output_

![Login page](/engineering-education/autologout-js/screen-one.png)

**Display page**

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="icon" href="assets/images/logo-sacco.png" type="image/x-icon">
  <title>Sign Page | T-Bank</title>

  <!-- Bootstrap CSS CDN -->

<body onload="startCountdown()" style="background-color: rgba(46, 51, 52, 1)">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">


  <!-- Font Awesome JS -->
  <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js"
    integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ"
    crossorigin="anonymous"></script>
  <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js"
    integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" type="text/css" href="/sacco/style/home.css">
  </head>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #008081">
      <div class="container-fluid">
        <p>


          <button style="z-index: 2" type="button" id="sidebarCollapse" class="btn btn-info">
            <i class="fa fa-home "></i>
            <span><a href="https://sacco.terrence-aluda.com/">Home Page</a></span>
          </button>
        <div class="d-flex justify-content-center" style="padding: 2%; text-align: center; background-color: #008081">
          <h1 style="color: white">T-BANK</h1>
        </div>
        </p>
      </div>
    </nav>
    <div class="d-flex align-items-center justify-content-center vw-60 vh-70" style="padding-bottom: 3vh">
      <div class="card border-dark  container">
        <div class="card-body border-dark row" style="background-color: #035050">
                      <p class="card-text">
                        <h6 class="text-white">The page will take you to the login page after</h6>&nbsp;<h5 style="color: #0af53a" id="numCount"><h5>&nbsp;<h6 class="text-white">seconds of inactivity.</h6>
                      </p>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</body>

<script src="https://sacco.terrence-aluda.com/sacco/js/autologout.js"></script>

</html>
```

This is the display page where the user will see the countdown before being logged out after a certain period of inactivity.

> Note that a method is fired in the body's `onload` attribute. We will talk about that in the JavaScript code.

_Output_

![Display page](/engineering-education/autologout-js/screen-two.png)

#### PHP login script

```php

<?php
require_once "connection.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $password = trim($_POST["password"]);
    $phone = trim($_POST["PhoneNo"]);
    $sql = "SELECT * FROM customers WHERE PhoneNo = '$phone' AND password = '$password'";
        $stmt = $mysqli->query($sql);
            if($stmt->num_rows>0){
                header("Location: https://sacco.terrence-aluda.com/sacco/display.html");
            }
}
$mysqli->close();
?>
```

This is the backend script. Again, you can write yours in any language of your preference. It uses a `POST` method for taking in the parameters, removes any trailing spaces then runs a simple `SELECT` query to check if the credentials are present. 

If the credentials are OK, we redirect the user to the display page.

#### Working of the three files
The three files are connected in that, the user first accesses the login page and signs in. After the PHP script authenticates the user, they are allowed to access the display page. 

After a set period of inactivity, the display page redirects to the login page.

```bash
Login -> [Backend aunthentication] -> Display -> (If user is inactive) -> Login
```

#### JavaScript
This is where the autologout feature is 'made'.

```javascript
let warningTimeout = 5000;
let warningTimerID;
let counterDisplay = document.getElementById("numCount");
let logoutUrl = "https://sacco.terrence-aluda.com/sacco/eng-edtest.html";
```

We first initialize the variables:
1. `warningTimeout` - For storing the timeout duration.
2. `warningTimerID` - For storing the timer ID. 
3. `counterDisplay` - For storing the element where the counter number will be displayed. 
4. `logoutUrl` - For storing the URL address where the script will redirect to after the logout.

```javascript
function startTimer() {
  // window.setTimeout returns an ID that can be used to start and stop the timer
  warningTimerID = window.setTimeout(idleLogout, warningTimeout);
  animate(counterDisplay, 5, 0, warningTimeout);
}
```

This is the method for starting the timer. 

`window.setTimeout()` returns an ID that will be used to start and stop the timer. After the timeout is attained, the `idleLogout()` method is called which logs the user out. 

The counter is animated using the `animate()` method. We will talk about these methods in detail in the next parts.

The timer is set to 5 seconds to save our time during testing the system, but you can change the values appropriately e.g. 3 minutes, 200 seconds, etc.

We also set the animated counter to run for 5 seconds due to the timer duration. You will set it to match the timer value you use like 100 for 100 seconds, 30 for 30 seconds, etc.

Another point to note is that due to some User Experience(UX) issues, it is recommended to set two timers, one for waiting for the inactive session and another for warning the user. 

This way, you can set the warning timer off after displaying a modal with the counter instead of the counter running the entire time of the program. For example, 10 minutes for waiting for the inactive state then 30 seconds for displaying the popup with the counter. 

You can have a look at [these](https://stackoverflow.com/questions/23023916/how-to-implement-auto-logout-in-javascript) suggestions which talk about the same on StackOverflow.

```javascript
function resetTimer() {
  window.clearTimeout(warningTimerID);
  startTimer();
}
[];
```

This one is pretty straightforward. It clears the timeout that matches the timeout ID. It is fired after any of the events are detected.

```javascript
function idleLogout() {
  window.location = logoutUrl;
}
```

This function simply redirects to the login page after a period of inactivity.

```javascript
function animate(obj, initVal, lastVal, duration) {
  let startTime = null;

  //get the current timestamp and assign it to the currentTime variable

  let currentTime = Date.now();

  //pass the current timestamp to the step function

  const step = (currentTime) => {
    //if the start time is null, assign the current time to startTime


  //pass the current timestamp to the step function

  const step = (currentTime) => {
    //if the start time is null, assign the current time to startTime

    if (!startTime) {
      startTime = currentTime;
    }

    //calculate the value to be used in calculating the number to be displayed

    const progress = Math.min((currentTime - startTime) / duration, 1);

    //calculate what is to be displayed using the value gotten above

    displayValue = Math.floor(progress * (lastVal - initVal) + initVal);
    obj.innerHTML = displayValue;

    //checking to make sure the counter does not exceed the last value(lastVal)

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };

  //start animating
  window.requestAnimationFrame(step);
}
```

The `animate()` function has been explained it in this [article](https://www.section.io/engineering-education/javascript-animation-counter/).

In summary, it gets the current timestamp and the timestamp the page loaded. It then calculates what is to be displayed using the difference between the two timestamps and displays it in element. 

In our case, it displays it in a `h5` element in the display page:

```html
<h5 style="color: #0af53a" id="numCount"><h5></h5></h5>
```

```javascript
function startCountdown() {
  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("mousedown", resetTimer);
  document.addEventListener("keypress", resetTimer);
  document.addEventListener("touchmove", resetTimer);
  document.addEventListener("onscroll", resetTimer);
  document.addEventListener("wheel", resetTimer);
  startTimer();
}
```

Lastly, we have the `startCountdown()` method. This is fired when the body loads in the body's `onload` attribute on the display page.

When the events (`mousemove, mousedown, keypress, touchmove, onscroll, wheel`) contained in the `AddEventListener()` methods are detected, the `resetTimer()` method is called to reset the timer so that the user stays logged in.

Here is the full JavaScript code.

```javascript
  let warningTimeout = 5000;
  let warningTimerID;
  let counterDisplay = document.getElementById('numCount');
  logoutUrl = "https://sacco.terrence-aluda.com/sacco/eng-edtest.html";

  function startTimer() {
    // window.setTimeout returns an ID that can be used to start and stop the timer
    warningTimerID = window.setTimeout(idleLogout, warningTimeout);
    animate(counterDisplay, 5, 0, warningTimeout);
  }
    //function for resetting the timer
  function resetTimer() {
    window.clearTimeout(warningTimerID);
    startTimer();
  }

  // Logout the user.
  function idleLogout() {
    window.location = logoutUrl;
  }

  function startCountdown() {}
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("keypress", resetTimer);
    document.addEventListener("touchmove", resetTimer);
    document.addEventListener("onscroll", resetTimer);
    document.addEventListener("wheel", resetTimer);
    startTimer();
  }
   //the animating function
      function animate(obj, initVal, lastVal, duration) {

        let startTime = null;

        //get the current timestamp and assign it to the currentTime variable

        let currentTime = Date.now();

        //pass the current timestamp to the step function

        const step = (currentTime ) => {

        //if the start time is null, assign the current time to startTime

            if (!startTime) {
            startTime = currentTime ;
            }

        //calculate the value to be used in calculating the number to be displayed

            const progress = Math.min((currentTime  - startTime) / duration, 1);

        //calculate what is to be displayed using the value gotten above

            displayValue = Math.floor(progress * (lastVal - initVal) + initVal);
            obj.innerHTML = displayValue;

        //checking to make sure the counter does not exceed the last value(lastVal)

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }else{
                window.cancelAnimationFrame(window.requestAnimationFrame(step));
            }
        };

        //start animating
        window.requestAnimationFrame(step);
    }

```

### Key research area
The code does not keep track of the pages in different tabs. For example, if you had logged in to the same page in different tabs, the events only reset the time in the active tab. This means that the other tab will still log the user out. The goal is to reset the timer for all the tabs.

Having read this, you can delve into it and make that improvement. The GitHub repository for contributing to the code is found [here](https://github.com/Agusioma/autologout-javascript).

### Conclusion
We looked at creating an auto-logout feature in pure JavaScript. We also looked at the working of the files and the JavaScript code in detail.

The user's private data is very key. It's always important to let no one else see another person's private information. The auto-logout feature is a good solution for that.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)