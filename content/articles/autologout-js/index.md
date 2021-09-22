### Creating an auto-logout feature using JavaScript

#### Introduction
When implementing security for our applications, we will at one point check if the user is still actively using the screen and decide whether to keep him/her logged in or not. This is particularly important if the application handles sensitive or private data to the user, for example, bank account details. We will see how to do that using JavaScript basing on the input events such as keypresses, scrolls, etc.

#### Pre-requisites
1. A basic knowledge of JavaScript
2. A basic knowledge of HTML and CSS.
3. A basic knowledge of PHP(though not that necessary).

You can use any technology/language for the backend login script.

#### Brief overview
We will look at an autologout implementation using JavaScript with the help of a simple login interface based on PHP as the backend. The display page will feature a counter that counts the number of seconds remaining before the user is logged out due to inactivity. The timer for auto logging out will be reset if any of the events is detected.
The demo is found [here](https://sacco.terrence-aluda.com/sacco/eng-edtest.html).

#### Getting started
We will first create User Interface files in HTML and CSS for the login and display screens.

> I won't explain the UI snippets because that's sort of beyond the scope of this article and also not the main aim of this. You can create any of your own, it is not strictly limited to the ones I use.

> The login credentials are Phone Number - `1234567890` and Password- `1111`.


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

This is the login page where the user enters the credentials to be allowed into the system.
The style sheets are hosted, so you can click the link provided above to view if your browser doesn't render the UI properly due to CORS policy.
Bootstrap 5 is used for styling.

*Output*

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
Note that a method is fired in the body's `onload` attribute. We will talk about that in the JavaScript code.

*Output*

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

This is the backend script. Again, you can write yours in any language of your preference.

It uses a POST method for taking in the parameters, remove any trailing spaces then runs a simple SELECT query to check if the credentials are present. If the credentials are OK, we redirect the user to the display page.


#### Working of the three files
The three files are connected in that, the user first accesses the login page, signs in, and then after the PHP script authenticates the user, he is allowed to access the display page. After a  set period of inactivity, the display page redirects to the login page.

```bash
Login -> [Backend aunthentication] -> Display -> (If user is inactive) -> Login
 ```

#### JavaScript
This is where the autologout feature is 'made'.

```javascript
  let warningTimeout = 5000;
  let warningTimerID;
  let counterDisplay = document.getElementById('numCount');
  let logoutUrl = "https://sacco.terrence-aluda.com/sacco/eng-edtest.html";
```

We first initialize the variable for storing the timeout duration, timer ID, the element where the counter number will be displayed, and the URL address where the script will redirect to after the logout.

```javascript
  function startTimer() {
    // window.setTimeout returns an ID that can be used to start and stop the timer
    warningTimerID = window.setTimeout(idleLogout, warningTimeout);
    animate(counterDisplay, 5, 0, warningTimeout);
  }
```

This is the method for starting the timer. `window.setTimeout()` returns an ID that will be used to start and stop the timer. After the timeout is attained, the `idleLogout()` method is called which logs the user out. The counter is animated using the `animate()` method. We will talk about these methods in detail in the next parts.

> The timer is set to 5 seconds to save our time during testing the system, but you can change the values appropriately eg 3 minutes, 200 seconds, etc.

> We also set the animated counter to run for 5 seconds due to the timer duration. You will set it to match the timer value you use like 100 for 100 seconds, 30 for 30 seconds, etc.

> Another point to note is that due to some User Experience(UX) issues, it is recommended to set two timers, one for waiting for the inactive session and another for warning the user. In this way, you can set the warning timer off after displaying a modal with the counter instead of the counter running the entire time of the program. For example, 10 minutes for waiting for the inactive state then 30 seconds for displaying the popup with the counter. You can have a look at [these](https://stackoverflow.com/questions/23023916/how-to-implement-auto-logout-in-javascript) suggestions connected to the same at StackOverflow.

```javascript
  function resetTimer() {
    window.clearTimeout(warningTimerID);
    startTimer();
  }[]
```

This one is pretty straightforward. It clears the timeout that matches the timeout ID. It is fired after any of the events is detected.

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

This is the `animate()` function. I clearly explained it in this [article](https://www.section.io/engineering-education/javascript-animation-counter/). Please check it out.

In a summary, it gets the current timestamp and the timestamp the page loaded. It then calculates what is to be displayed using the difference between the two timestamps and displays it in element. In our case, it displays it in a h5 element in the display page:

```html
<h5 style="color: #0af53a" id="numCount"><h5>
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
Lastly, we have the `startCountdown()` method. This is fired when the body loads in the body's `onload` attribute in the display page.
When the events(`mousemove, mousedown, keypress, touchmove, onscroll, wheel`) contained in the `AddEventListener()` methods are detected, the `resetTimer()` method is called to reset the timer so that the user stays logged in.

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

### Summary
We looked at creating an autologout feature in pure javascript. We looked at the working of the files and the JavaScript code in detail.

### Key research area

The code does not keep track of the pages in different tabs. For example, if you had logged in to the same page in different tabs, the timer resets in the active tab does not affect the other tab in that the other tab will autologout. Having read this, you can delve into it and make that improvement.
The GitHub repository for contributing to the code is found [here](https://github.com/Agusioma/autologout-javascript). 

### Conclusion
The user's private data is very key. It's always important to let no one else see another person's private information. The autologout is a good workaround around that.

Thank you, reader. Have a great read.