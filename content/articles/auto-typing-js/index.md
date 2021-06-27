#### Introduction

Auto-typing enhances the look of a site and improves the user experience. One may want to animate his/her text content for the users to see when they visit the page.
It can be used to make eye-catching adverts for attracting customers or auto-completing text when a user is typing. Autoyping may also be used to illustrate the talking speeds of people in a dialogue kind of conversation. It falls under animations which help retain attention, simplify complex information, and boosts retention.  It is indeed a useful feature to use in a frontend project.

In this article, we will look at how to implement it in JavaScript and jQuery.

#### Prerequisites

- A basic understanding of JavaScript
- An understanding of using HTML and CSS will be an added advantage

#### Getting started

We are going to create an auto-typing script that shows varying talking speeds between two people in a Question and answer session as shown below:

![Gif](/engineering-education/auto-typing/demo.gif)

We will look at the javascript code first before building the whole file. Let's jump into it.

#### Javascript

We will use jQuery and Immediately invoked function expressions(IIFEs) because of their fast implementations with less code.

The general syntax of an IIFE is:

```javascript
(function () {
  statements;
})();

```
In the first part, the Grouping Operator, () used prevents variables within the IIFE from being accessed and also affecting the global scope. Here is where you set your parameters and write your logic.

In the last part, the IIFE () is created where the JavaScript engine will directly interpret the function. Here is where you will pass arguments for the parameters.

> You can learn more about IIFEs from Mozilla Developer Network(MDN) docs found [here](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). 

```javascript
function autoType(elementClass, typingSpeed, timeout) {
    var ourClass = $(elementClass);
    ourClass.css({
      "position": "relative",
      "display": "inline-block"
    });
    ourClass = ourClass.find(".text-js");
    var text = ourClass.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    setTimeout(function () {
      ourClass.css("opacity", 1);
      ourClass.text("");
      for (var i = 0; i < amntOfChars; i++) {
        (function (i, char) {
          setTimeout(function () {
            newString += char;
            ourClass.text(newString);
          }, i * typingSpeed);
        })(i, text[i]);
      }
    }, timeout);
  }

function fire(){
    autoType(".type-js", 85, 1000);
    autoType(".type-js-ii", 200, 2500);  
    autoType(".type-js-iii", 85, 5800);  
    autoType(".type-js-iv", 200, 9300);   
    autoType(".type-js-v", 85, 15000);    
} 
```

The code consists of a function `autoType()` and an IIFE inside the function.

`autoType()` contains three parameters:
1. `elementClass` - the target class where the auto-typing will be invoked
2. `typingSpeed` - This is the speed of typing the text out
3. `timeout` - the timeout period for waiting =before the `autoTyping()` function is fired.

WE then have a variable `ourClass` for storing the target class. The next line is where we set the display style of the class.

Next, we look for `text-js`. This is a class found in our target class. It contains the text that will be typed out. Thereafter, we remove any trailing spaces.

The `amntOfChars` will store the length of text.
We will store the text to display inside the `newString` variable.

Inside the `setTimeout()` function, we start by setting the opacity of the target class's contents to 1 since we initially set it to 0 as we will see later. We do set it to 0 because we don't want it to be visible at first sight. The text of the target class is temporarily cleared before display.


Next is a `for-loop` where the IIFE is now used. The IIFE takes the index and the text character at the particular index as parameters. It then the timeout as the index number multiplied by the typing speed. The `newString`  is concatenated with the text character at the index until the characters of the sentence are finished.

THe function `fire()` is used to call the `auto-typing()` function.

#### HTML and CSS

Below is the HTML code:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Auto typing | Eng Ed</title>
    <style type="text/css">
      .text-js {
        opacity: 0; 
        color: black;
        height: auto; 
        font-family: lucida sans;
      }
    </style>
  </head>
  <body onload="fire()" style="background-color: white">
<section style="margin-top: 10vh; padding-left: 15vw" class="pb-5">
    <div class="container pb-md-3">
        <div class="text-center">
            <div class="row">
              <div class="col-md-5" style="text-align: left">
                <h3 class="mb-4 title" style="color: red">Q & A&nbsp;</h3>
                <div class="type-js"><div class="text-js">
                  Is this End-Ed?
                </div>
                </div>
                <br>
                <div class="type-js-ii"><div class="text-js">
                  Yes, why?
                </div>
                </div><br>                
                <div class="type-js-iii"><div class="text-js">Tell me more about the community.
                </div>
                </div><br>
                <div class="type-js-iv"><div class="text-js">It is, I mean, it is that--
                </div>
                </div><br>                
                <div class="type-js-v"><div class="text-js">Could you please talk faster?
                </div>
                </div>                
              </div>
              <div class="col-md-7">
              <div class="row">
              <div class="col-lg-6 mx-lg-auto col-md-12">
                <img src="/home/incognito/Documents/section.jpeg" alt="" class="img-fluid mt-lg-5 mt-3">
              </div>
            </div>
            </div>
        </div>
    </div>
</section>

</body>
```

This is a bit straif]ght-forward so we will not dwell on it. We look at the `<style>` tag where the opacity of `text-js` is set to 0. We set the color to black, font to Lucida sans, and the text height to `auto`.

THen in the `<body>` tag, we call the `fire()` function when it loads. Bootstrap 5 is used for styling. Its documentation is found [here](https://getbootstrap.com/docs/5.0/getting-started/introduction/).

Here are a few Bootstrap codes that are used:
1. `pb-md-x` - sets padding-bottom for medium screen devices with respect to **x**.
2. `container` - THe foundation element when using the bootstrap grid system. which sets a maximum width in responsive breakpoints.
3. `col-md-x` - Sets a split ratio using **x** in medium screen devices for example 3 sets the ratio 3:12 making it 25/75%.
4. `mb-x` - sets margin-bottom in respect to **x**.
5. `col-lg-x` - Sets a split ratio using **x** in large screen devices.
6. `mx-lg-x` - sets margin-left and right for large screen devices using **x**.
7. `img-fluid` - makes an image responsive
8. `mt-x` - sets margin-top in respect to **x**.

#### The full code
Here is the full code.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Auto typing | Eng Ed</title>
    <style type="text/css">
      .text-js {
        opacity: 0; 
        color: black;
        height: auto; 
        font-family: lucida sans;
      }
    </style>
  </head>
  <body onload="fire()" style="background-color: white">
<section style="margin-top: 10vh; padding-left: 15vw" class="pb-5">
    <div class="container pb-md-3">
        <div class="text-center">
            <div class="row">
              <div class="col-md-5" style="text-align: left">
                <h3 class="mb-4 title" style="color: red">Q & A&nbsp;</h3>
                <div class="type-js"><div class="text-js">
                  Is this End-Ed?
                </div>
                </div>
                <br>
                <div class="type-js-ii"><div class="text-js">
                  Yes, why?
                </div>
                </div><br>                
                <div class="type-js-iii"><div class="text-js">Tell me more about the community.
                </div>
                </div><br>
                <div class="type-js-iv"><div class="text-js">It is, I mean, it is that--
                </div>
                </div><br>                
                <div class="type-js-v"><div class="text-js">Could you please talk faster?
                </div>
                </div>                
              </div>
              <div class="col-md-7">
              <div class="row">
              <div class="col-lg-6 mx-lg-auto col-md-12">
                <img src="/home/incognito/Documents/section.jpeg" alt="" class="img-fluid mt-lg-5 mt-3">
              </div>
            </div>
            </div>
        </div>
    </div>
</section>

</body>

<script>
function autoType(elementClass, typingSpeed, timeout) {

    var ourClass = $(elementClass);
    ourClass.css({
      "position": "relative",
      "display": "inline-block"
    });
    ourClass = ourClass.find(".text-js");
    var text = ourClass.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";

    setTimeout(function () {
      ourClass.css("opacity", 1);
      ourClass.text("");
      for (var i = 0; i < amntOfChars; i++) {
        (function (i, char) {
          setTimeout(function () {
            newString += char;
            ourClass.text(newString);
          }, i * typingSpeed);
        })(i, text[i]);
      }
    }, timeout);
  }

function fire(){
    autoType(".type-js", 85, 1000);
    autoType(".type-js-ii", 200, 2500);  
    autoType(".type-js-iii", 85, 5800);  
    autoType(".type-js-iv", 200, 9300);   
    autoType(".type-js-v", 85, 15000);    
}
</script>
</html>
```

#### Conclusion

This tutorial talked about creating an auto-typing feature using JabvaScfript and jQuery. We dissected the JavaScript code and looked at how it works. Hope you got some insights that you'll apply in your next project.