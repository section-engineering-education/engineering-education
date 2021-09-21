### Creating an auto-logout feature using JavaScript

#### Introduction
When implementing security for our applications, we will at one point check if the user is still actively using the screen and decide whether to keep him/her logged in or not. This is particularly important if the application handles sensitive or private data to the user. We will see how to do that using JavaScript basing on the input events such as keypresses and scrolls.

#### Pre-requisites
1. A basic knowledge in JavaScript
2. A basic knowledge in HTML and CSS.
3. A basic knowledge in PHP(though not that necessary).

#### Brief overview
We will look at an autologout implementation using JavaScript with the help of a simple login interface based on PHP. The display page will feature a counter that counts the number of seconds remaining befpre the user is loogged out due to inactivity. The timer for auto logging out will be reset if any of the event is detected.
The demo is found [here](https://sacco.terrence-aluda.com/sacco/eng-edtest.html).

#### Getting started
We will first create User Interface files in HTML and CSS for the login and display screeens.

> I wont explain the UI snippets because that's sort of beyond the scope of this article and also not the main aim.

##### Login page
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

The style sheets are hosted, so you can click the link provided above to view if your browser doesn't render the UI properly due to CORS policy.

*Output*


##### Display page

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

*Output*


#### PHP login script

```php
<?php
require_once "connection.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate name

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

#### Working of the three files
The three files are connected in that the user firsts accesses the LOgin page, signs in, and after the PHP scirpt authenticates the user, he is alloweed to access the display page. After 5 seconds of inactivity, the display page redirects to the login page.

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

We first initialise the variable for storing the timeout duration, timer ID, the elemetn where the counter number will be displayed, and the URL address the script will redirect to after the autologout.

```javascript
  function startTimer() {
    // window.setTimeout returns an Id that can be used to start and stop a timer
    warningTimerID = window.setTimeout(idleLogout, warningTimeout);
    animate(counterDisplay, 5, 0, warningTimeout);
  }
```

The method for starting the timer. `window.setTimeout()` returns an ID that will be used to start and stop the timer. After the timeout is attained, the `idleLogout()` method is called which the logs the user out. THe counter is animated using the `animate()` method. We will talk about these methods in detail in the next parts.

```javascript
  function resetTimer() {
    window.clearTimeout(warningTimerID);
    startTimer();
  }[]
```

THis one is straightforward. It clears the timeout that matches the timeout ID. It is fired after any of the events is detected.

```javascript
  function idleLogout() {
    window.location = logoutUrl;
  }
```

THis function simply redirects to the login page afyter a period of inactivity.

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

        //calculate what to be displayed using the value gotten above
        
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
Lastly, the `startCountdown()` method. THis is fired when the body loads in the `<body> onload` attribute in the display page.
When the events(`mousemove, mousedown, keypress, touchmove, onscroll, wheel`) contained in the AddEventListener methods, the `resetTimer()` method is called to reset the timer so that the user stays logged in.

Here is the full JavaScript code.
```javascript
  let warningTimeout = 5000;
  let warningTimerID;
  let counterDisplay = document.getElementById('numCount');
  logoutUrl = "https://sacco.terrence-aluda.com/sacco/eng-edtest.html";

  function startTimer() {
    // window.setTimeout returns an Id that can be used to start and stop a timer
    warningTimerID = window.setTimeout(idleLogout, warningTimeout);
    animate(counterDisplay, 5, 0, warningTimeout);
  }

  function resetTimer() {
    window.clearTimeout(warningTimerID);
    startTimer();
  }

  // Logout the user.
  function idleLogout() {
    window.location = logoutUrl;
  }

  function startCountdown() {
    
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("keypress", resetTimer);
    document.addEventListener("touchmove", resetTimer);
    document.addEventListener("onscroll", resetTimer);
    document.addEventListener("wheel", resetTimer);
    startTimer();
  }
   
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

        //calculate what to be displayed using the value gotten above
        
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
We looked at creating an autologout feature in pure javascript. WE looekd at the working oogf the files,and the JavaScript code in detail.

### Key reaearch area

THe code does not keep track of the pages in differetnt tabs. For example, if you had loogged in the same page in different tabs, the time resets in the active tab does not affect the other tab such that the other tab will autologout. Having read this, you can delve into it and makek that improvement.
The GitHub repository for contributing to the code is found [here]. 

Thank you, reader.Have a great read.