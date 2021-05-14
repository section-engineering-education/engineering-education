---
layout: engineering-education
status: publish
published: true
url: /javascript-animation-counter/
title: Creating an Animated Counter in JavaScript
description: This article gives the reader a guide on how to create an animated counter in a web application using JavaScript. We will do this with a few JavaScript helper methods and by setting the duration for the animation.
author: terrence-aluda
date: 2021-01-16T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/javascript-animation-counter/hero.jpg
    alt: Javascript Animation Image
---
Animated counters are a great way to show statistics on your website because interactive elements improve the user experience. Animated counters can be used to show your site visits, members registered, or show some numbers in your online game.
<!--more-->
While this could otherwise be implemented using some static boring numbers. Animated counters help us give our sites an expressive and professional look.

JavaScript has helper methods that when artistically manipulated can help us achieve that in a very easy way. We can do this in a few statements using a framework or library, but it's better to create one for ourselves from scratch and understand the underlying code. It also gives us an upper hand in customizing the code and adding more functionalities ourselves.

### Overview
We only need to use a few JavaScript helper methods and set the duration for the animation. The JavaScript methods used (which we will discuss in more detail further on) are:

- **Math.min()**
- **Math.floor()**
- **window.requestAnimationFrame()**
- **window.cancelAnimationFrame()**

Let's begin coding an animated counter similiar to the one illustrated below:

![Illustration](/engineering-education/javascript-animation-counter/illustration.gif)

### The JavaScript code
The full code can be accessed at my [Github Repository](https://github.com/Agusioma/animation-counter-javascript/).

```Javascript
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
        obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

        //checking to make sure the counter does not exceed the last value (lastVal)
        if (progress < 1) {
              window.requestAnimationFrame(step);
        }
        else{
              window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };

    //start animating
    window.requestAnimationFrame(step);
}

let text1 = document.getElementById('0101');
let text2 = document.getElementById('0102');
let text3 = document.getElementById('0103');

const load = () => {
    animate(text1, 0, 907, 5000);
    animate(text2, 0, 432, 5000);
    animate(text3, 100, 12, 5000);
}
```

#### Explanation
We have three user-defined functions:

1. `animate()`
2. `step()`
3. `load()`

The `animate()` function is a higher-order function containing the `step()` function. 

This function takes four parameters:

1. **A DOM object**(`obj`).

2. **Initial value** which the counter will start with(`initVal`).

3. **Last value** which the counter will end with (`lastVal`).

4. The **duration** in milliseconds which the animation will last (`duration`).

The animate function has a variable `startTime` initialized to `null`. This variable stores the timestamp when the counter starts. It also has a `currentTime` variable that stores the latest timestamp as the counter executes. Next, we have the `step()` function which is used to compute the number to be displayed, where it is displayed, and controls the animation.

The first `if` block assigns the starting time of the counter to `startTime`. It negates `startTime` to get a *true* value if `startTime` is `null` and then assigns it the current start time. The constant `progress` stores a value that will set the interval between the previous and next number which should not exceed 1. 

It does so by subtracting the start timestamp from the current timestamp then dividing it by the duration. Since it does not have to be greater than 1 (1,2,3,4,...), we use the `Math.min` method which usually returns the lowest value from its parameters. The interval number does not need to change throughout the lifetime of the `step` function hence we make it a `const`.

**A mathematical example**
The next statement subtracts the first value from the last value, multiplies the answer gotten by the interval then adds the first value basing on the operator precedence e.g. for a reducing counter.


*Current timestamp = 202018500*

*Start timestamp = 202018200*

*(202018500 - 202018200) = 300*

*300/5000 = 0.06*

*0 - 100 = -100*

*-100 * 0.06 = -6*

*-6 + 100 = 94*

***At the timestamp 202018500 the counter will have reduced to 94***

The `Math.floor` function rounds the number to a whole number lower than the parameter given. It then sets the content of `obj` to the number through the `innerHTML` property. The second `if` block stops the counter once the interval is greater than 1.

**The window.requestAnimationFrame() and window.cancelAnimationFrame()**

The `window.requestAnimationFrame()` method is used when we need to show an animation. It instructs the browser to update the animation through a callback function it takes in, in our case, the `step()` function.

The `window.cancelAnimationFrame()` cancels an animation to be called by taking the animation frame request ID as a parameter. The `load()` functions assigns `text1`, `text2` and `text3` DOM objects gotten by their respective IDs. It is called when the HTML body loads using the `<body>` `onload` attribute. This is shown in the HTML code below. It uses the `animate()` function to set the values and perform the counter.

### The HTML code
Below is the HTML code. We used Bootstrap 5 for the styling.

```html
<html>
   <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Animation counter</title>
   </head>
   <link href= "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
   <style>
      .container{
      background-color: #6f4e37;
      }
      p{
      text-align: center;
      }
   </style>
   <body onload="load()">
      <p>
      <div class="d-flex justify-content-center fs-1 fw-bold ">Animation Counter</div>
      </p>
      <p>
      <div class="container">
         <div class="row">
            <div class="col-sm">
               <p id='0101' class="fs-2 text-light">0</p>
               <p class="text-light">Site visits</p>
            </div>
            <div class="col-sm">
               <p id='0102' class="fs-2 text-light">876</p>
               <p class="text-light">Members signed</p>
            </div>
            <div class="col-sm">
               <p class="fs-2 text-light"><span id='0103'>12</span>%</p>
               <p class="text-light align-content-center">Average complain rate</p>
            </div>
         </div>
      </div>
      </p>
   </body>
</html>
```

Although we have used JavaScript in this tutorial, you can also achieve this with pure CSS. We will talk about that in another tutorial.

That's all for now. I hope you got a helpful insight into how to create animated counters using JavaScript. Later on, you can enhance this counter further by changing the durations, numbers, or even implement it for words rather than digits.</br>

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
