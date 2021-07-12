---
layout: engineering-education
status: publish
published: true
url: /how-to-handle-navigation-in-flutter/
title: How to Handle Navigation in Flutter
description: This article will show you how to navigate between different pages in Flutter. We will be building a simple app that uses an organized Navigation Named route.
author: 
date: 2021-06-01T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-handle-navigation-in-flutter/hero.jpg
    alt: Handling Navigation in Flutter
---
In some cases, a developer may want to animate text content for users to see when they visit the web page. This can be achieved through auto-typing. This feature helps to enhance the look of a site and improves the overall user experience.
<!--more-->
Auto typing can be used to make eye-catching adverts or auto-complete text when a user is typing. It can be regarded as an animation and helps to retain attention, as well as simplify complex information. This is indeed a useful feature to implement in a frontend web project.

### Prerequisites
- A basic understanding of JavaScript.
- An understanding of HTML and CSS is also an added advantage.

> We will use Bootstrap for styling.

### Goal
In this article, we will implement the auto typing feature using JavaScript and [jQuery](https://jquery.com/) as shown in this [video](https://youtu.be/4vUHOCINzHo)

### Getting started
We will use jQuery and [Immediately Invoked Function Expressions](https://www.javascripttutorial.net/javascript-immediately-invoked-function-expression-iife/) because they can be implemented quickly.

The general syntax of an IIFE is shown below:

```js
(function () {
  statements;

})();

```

In the above example, the grouping operator prevents variables within the IIFE from being accessed from the global scope. 

> You can learn more about IIFEs from official documentation found [here](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). 

We will use the code in one file. So we will go through the code first starting with the JavaScript code.

```javascript
//The function for autotyping
function autoType(elementClass, typingSpeed, timeout) {
//The target class where the auto-typing will be invoked
    var ourClass = $(elementClass);
    //setting the CSS styling for the target class
    ourClass.css({
      "position": "relative",
      "display": "inline-block"
    });
    //looking for `text-js` containing the text that will be typed out
    ourClass = ourClass.find(".text-js");
    //remove any trailing spaces
    var text = ourClass.text().trim().split('');
    //storing the length of text
    var amntOfChars = text.length;
    //variable to store the text to display
    var newString = "";
    
    setTimeout(function () {
    //changing the text visibilty to visible
      ourClass.css("opacity", 1);
      //clearing out the text temporarily
      ourClass.text("");
      //The IIFE where the characters are displayed after computing the typing speed
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
//calling the functions with respective arguments
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
3. `timeout` - the timeout period for waiting before the `autoTyping()` function is fired.

We then have a variable `ourClass` for storing the target class. The next line is where we set the display style of the class.

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
Here is the full code. Create a file called *autotyping.html* at your preferred destination and paste the following code in there. After that run the file in your browser.

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
//The function for autotyping
function autoType(elementClass, typingSpeed, timeout) {
//The target class where the auto-typing will be invoked
    var ourClass = $(elementClass);
    //setting the CSS styling for the target class
    ourClass.css({
      "position": "relative",
      "display": "inline-block"
    });
    //looking for `text-js` containing the text that will be typed out
    ourClass = ourClass.find(".text-js");
    //remove any trailing spaces
    var text = ourClass.text().trim().split('');
    //storing the length of text
    var amntOfChars = text.length;
    //variable to store the text to display
    var newString = "";
    
    setTimeout(function () {
    //changing the text visibilty to visible
      ourClass.css("opacity", 1);
      //clearing out the text temporarily
      ourClass.text("");
      //The IIFE where the characters are displayed after computing the typing speed
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
//calling the functions with respective arguments
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

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
