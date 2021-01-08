Maybe you want to give some visual statistics about your site visits, members registered, or showing some numbers in your online game.</br>To give an appealing look and nice User Experience, you will in one way or another need to animate the digits which also aids in grabbing the attention of your site visitors for example in a social site. Moreover, it can be used as a marketing tool. This could otherwise be implemented using some static boring numbers.</br>The counters help us give our sites an expressive and professional look.</br></br>
JavaScript has helper methods which when artistically manipulated can help us achieve that in a very easy manner.(Of course, we can do this in a few statements using a framework or library, but it's better to create one for ourselves from scratch and understand the underlying code. It also gives us an upper hand in customizing the code and adding more functionalities ourselves).</br>
#### Overview
We only need to use a few JavaScript helper methods and set the duration in which we will use it in animating.</br>
The JavaScript methods used are:<br>

- **Math.min()**
- **Math.floor()**
- **window.requestAnimationFrame()**
- **window.cancelAnimationFrame()**

We will discuss the functions as we move on in case they look incomprehensible.</br>
We are going to create one as illustrated below:

![Illustration](/engineering-education/animation-counter-javascript/illustration.gif)

#### The JavaScript code
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

        //checking to make sure the counter does not exceed the last value(lastVal)

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

const load = () =>{

    animate(text1, 0, 907, 5000);
    animate(text2, 0, 432, 5000);
    animate(text3, 100, 12, 5000);

}

```

We got three user-defined functions:

- `animate()`
- `step()`
- `load()`
##### The code explanation</br>
The `animate()` function is a higher-order function containing the `step()` function.</br>
The function takes four parameters:
- **A DOM object**(```obj```)
- **Initial value** which the counter will start with(`initVal`)
- **Last value** which the counter will end with(`lastVal`)
- The **duration** in milliseconds which the animation will last(`duration`)

It has a variable `startTime` initialized to `null` which stores the timestamp when the counter starts and `currentTime` variable which stores the latest timestamp as the counter executes. We then have the `step()` function which is used to compute the number to be displayed, where it is displayed, and control the animation.

The first `if` block assigns the starting time of the counter to `startTime` from `null`. It negates `startTime` to get a *true* value if `startTime` is `null` and then assigns it the current start time. The constant `progress` stores a value that will set the interval between the previous and next number which should not exceed 1. It does so by subtracting the start timestamp from the current timestamp then dividing it by the duration. Since it does not have to be greater than 1(1,2,3,4,...) we use the `Math.min` method which usually takes the lowest value from its parameters. The interval number does not need to change throughout the lifetime of the `step` function hence we make it a `const`.<br>

**A mathematical example**</br>
The next statement first subtracts the first value from the last value, multiplies the answer gotten by the interval then adds the first value basing on the operator precedence e.g. for a reducing counter</br>
*Current timestamp = 202018500*</br>
*Start timestamp = 202018200*</br>
*(202018500 - 202018200) = 300*</br>
*300/5000 = 0.06*</br>
*0 - 100 = -100*</br>
*-100 * 0.06 = -6*</br>
*-6 + 100 = 94*</br>
***At the timestamp 202018500 the counter will have reduced to 94***

The `Math.floor` function rounds the number to a whole number lower than the parameter given. It then sets the content of `obj` to the number through the `innerHTML` property. The second `if` block stops the counter once the interval is greater than 1.<br>

**The window.requestAnimationFrame() and window.cancelAnimationFrame()**<br>

The `window.requestAnimationFrame()` method is used when we need to show an animation and instructs the browser to call a function to update the animation through a callback function it takes in, in our case, the `step()` function.

The `window.cancelAnimationFrame()` cancels an animation to be called by taking the animation frame request ID as a parameter. The `load()` functions assigns `text1`, `text2` and `text3` DOM objects gotten by their respective IDs. It is called when the HTML body loads using the `<body>` `onload` attribute(This is shown in the HTML code below). It uses the `animate()` function to set the values and perform the counter.<br>

#### The HTML code

Below is the HTML code. Bootstrap 5 is used for styling.
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
Although we have used JavaScript in this piece, you can do it with pure CSS only. That, we will talk about in another tutorial.<br>
That's all for now. Hope you got an insight on JavaScript counters.</br>You can, later on, add more enhancements like changing the durations, numbers, or even implement it for words other than digits.</br>
