---
layout: engineering-education
status: publish
published: true
url: /auto-typing-js/
title: How to Create an Auto-typing Feature in JavaScript
description: This article will guide you on how to create an auto-typing feature using JavaScript and HTML. This feature can help in attracting users to particular content.
author: sandra-moringa
date: 2021-07-20T00:00:00-11:31
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/auto-typing-js/hero.jpg
    alt: Auto-typing in JavaScript Hero Image
---
In some cases, a developer may want to animate text content for users to see when they visit the web page. This can be achieved through auto-typing. This feature helps to enhance the look of a site and improves the overall user experience.
<!--more-->
Auto typing can be used to make eye-catching adverts or auto-complete text when a user is typing. It can be regarded as animation and helps to retain attention, as well as simplify complex information. This is indeed a useful feature to implement in a frontend web project.

### Prerequisites
To follow along with this tutorial, you need to have:
- A basic understanding of JavaScript.
- An understanding of HTML and Bootstrap.

### Goal
In this article, we will implement the auto typing feature using JavaScript and [jQuery](https://jquery.com/), as shown in the video below.

<iframe width="478" height="269" src="https://youtu.be/6NtN8K5cp50" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Getting started
We will use jQuery and [Immediately Invoked Function Expressions](https://www.javascripttutorial.net/javascript-immediately-invoked-function-expression-iife/) due to their simplicity.

The general syntax of an IIFE is shown below:

```js
(function () {
  statements;

})();
```

In the above example, the grouping operator prevents variables within the IIFE from being accessed from the global scope. 

You can learn more about IIFEs from the official documentation [here](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). 

> Note that we will put all of our code in a single file.

### Creating JavaScript functions
Create a new folder on your computer and give it any name. In this directory, generate a new file and name it as `index.html`. 

We need to add the following JavaScript code in the `index.html` file. I have explained the code snippets using inline comments:

```js
//The function for auto-typing
function autoType(elementClass, typingSpeed, timeout) {
//The target class where the auto-typing will be invoked
    var ourClass = $(auto-typing);
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
    //changing the text visibility to visible
      ourClass.css("opacity", 1);
      //clearing out the text temporarily
      ourClass.text("");
      //The IIFE where the characters are displayed after computing the typing speed in a for-loop
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
//calling the functions with respective arguments (text field, typing speed, and timeout)
    autoType(".type-js", 85, 1000);
    autoType(".type-js-ii", 200, 2500);  
    autoType(".type-js-iii", 85, 5800);  
    autoType(".type-js-iv", 200, 9300);   
    autoType(".type-js-v", 85, 15000);    
} 
```

Let's understand further what the above JavaScript code entails:

The `autoType()` function requires three parameters:
- `elementClass` - The target class where the auto-typing will be invoked.
- `typingSpeed` - This is the typing speed.
- `timeout` - The waiting period before the `autoTyping()` function is fired.

`ourClass` variable stores the target class, as demonstrated below:

```js
 ourClass = ourClass.find(".text-js");
```

We add styling to the elements using the following code:

```js
  ourClass.css({
      "position": "relative",
      "display": "inline-block"
    });
```

Next, we look for `text-js`. This is a class found in our target class. It contains the text that will be typed out. Thereafter, we remove any trailing spaces. This is demonstrated below:

```js
ourClass = ourClass.find(".text-js");
    //remove any trailing spaces
    var text = ourClass.text().trim().split('');
```

The `amntOfChars` variable will contain the length of our text. We will then store the text to display inside the `newString` variable.

```js
var amntOfChars = text.length;
    //variable to store the text to display
    var newString = "";
```

In the `setTimeout()` function, we set the `opacity` of the target class's contents from `0` to `1` to make it visible. We also clear the text of the target class.

In the `for` loop, the IIFE takes the `index` and the `text character` at a particular index as parameters. It then calculates the timeout by multiplying the index number by the typing speed. 

The `newString` is concatenated with the `text character` at the provided `index` until the `for` loop ends.

```js
 setTimeout(function () {
    //changing the text visibility to visible
      ourClass.css("opacity", 1);
      //clearing out the text temporarily
      ourClass.text("");
      //The IIFE where the characters are displayed after computing the typing speed in a for-loop
      for (var i = 0; i < amntOfChars; i++) {
        (function (i, char) {
          setTimeout(function () {
            newString += char; //concatenation
            ourClass.text(newString);
          }, i * typingSpeed);
        })(i, text[i]);
      }
    }, timeout);
```

Finally, we call the `auto-typing()` function inside the `fire` method. This is shown below:

```js
function fire(){
//calling the functions with respective arguments (text field, typing speed, and timeout)
    autoType(".type-js", 85, 1000);
    autoType(".type-js-ii", 200, 2500);  
    autoType(".type-js-iii", 85, 5800);  
    autoType(".type-js-iv", 200, 9300);   
    autoType(".type-js-v", 85, 15000);    
}
```

### The HTML and CSS part
We will use the following HTML code:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
                  Is this Eng-Ed?
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

In the `<head>` section, we set the `text color` to `black`, `font` to `Lucida sans`, and the `text height` to `auto`.

```html
 <style type="text/css">
      .text-js {
        opacity: 0; 
        color: black;
        height: auto; 
        font-family: lucida sans;
      }
    </style>
```

In the `<body>` tag, we call the `fire()` function when it loads. 

```js
<body onload="fire()" style="background-color: white">
```

`Bootstrap 5` is used for styling. The documentation can be found [here](https://getbootstrap.com/docs/5.0/getting-started/introduction/). 

In the code above, we have imported `Bootstrap` using the code below:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
```

Remember to import the `jQuery` or the auto-typing feature will not work.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

#### The full code
After completing the above steps, we can save our file and then view it in the browser. Your final code should look, as shown below:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
                  Is this Eng-Ed?
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
//The function for auto-typing
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

### Conclusion
This tutorial has shown you how to create an auto typing feature using JavaScript and jQuery. We have analyzed the JavaScript code and determined how it works. I hope you gained some insights that you'll apply in your next project.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
