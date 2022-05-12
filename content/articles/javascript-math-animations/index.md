---
layout: engineering-education
status: publish
published: true
url: /javascript-math-animations/
title: Using JavaScript's Mathematical Functions to Create Animations
description: In this article we will discuss how we can use sin and cosine functions to create animations using JavaScript's mathematical functions.  
author: vincent-ngunzulu
date: 2021-12-01T00:00:00-18:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/javascript-math-animations/hero.jpg
   alt: JavaScript animations with mathematical functions
---
Animations are a great way to catch a user's attention and enhance the look of your website. In this article, we will look at how Javascript's built-in functions such as `Math.cos()` and `Math.sin()` can be applied to create the animations. 
<!--more-->
We will be creating an animation to show a simple rotating system so that we can see how the functions are applied. 

The final output will resemble this:

![Circle](/engineering-education/javascript-math-animations/circle.png)

Where the line shows the path the image follows.

### Prerequisites
1. An understanding of JavaScript.
2. An understanding of HTML and CSS.

### A brief look at the sin and cos functions in creating a circle
These two functions play a great role in defining the x and y coordinates of a circle. Let's have a look at this figure.

![Triangle shot](/engineering-education/javascript-math-animations/triangle.png)

Using the basic trigonometric formulas, we see that `sin θ = (y/r)` and `cos θ = (x/r)`.

Based on these, it's clear that given a circle of radius `r` at an angle of θ, the coordinates of the point (x, y) are found using:

- x = r cos(θ)
- y = r sin(θ)

We will use these two functions to rotate an image in our animation. You can find more about these [here](http://www.opentextbookstore.com/trig/trig-5-3.pdf).

### The JavaScript code
This is the JavaScript code.

```javascript
// The image variable
let image = document.querySelector("img");
// 90 degrees
let angle = Math.PI / 2;
//variable to store the previous time the animate funuction last fired
let prevTimeArg;
function animate(currentTimeParam){

    if (prevTimeArg != null) {
        angle += (currentTimeParam - prevTimeArg) * 0.004;
    }
    // Setting the previous time to the time the function currently fires
    prevTimeArg = currentTimeParam ;
    image.style.top = (Math.sin(angle) * 150) + "px";
    image.style.left = (Math.cos(angle) * 150) + "px";
    requestAnimationFrame(currentTime => animate(currentTime));
}
requestAnimationFrame(animate);
```

#### Explanation
The image is placed at a 90<sup>∘</sup> angle(`π/2`). We continuously update its `top` and `left` styles to move it along the circle's circumference. The speed at which the angle changes is dependent on the difference between the current timestamp and the last timestamp the function fired. 

This ensures that the motion of the image is stable because if we increased the angle of rotation by a fixed amount, the motion would not be smooth in case a heavy task is running in the machine. We store a counter for the current angle of the animation and increment it every time the `animate()` function is called. 

This angle is used to compute the current position of our image. The vertical radius of our circle is computed using `Math.sin()` and multiplied by **150**. We then assign the value to the `top` style. 

Setting the top with this value makes sure the image is maintained within its radius. The same is done for the horizontal radius by setting the `left` style value. We use `Math.cos()` multiplied by 150 to achieve the same radius.

> Note that you can make the image move in an anticlockwise function by making the top style negative. You can also change the speed of rotation by changing the number which you multiply the difference between the current time and the previous time the function executed.

For example, (currentTimeParam - prevTimeArg) * **0.004**. If you increase the number, the speed will increase. If you make it smaller, it will slow the speed down.

The `requestAnimationFrame()` function schedules the `animate()` function to run whenever the browser is ready to paint the window/screen with new content. The `animate()` function also calls the `requestAnimationFrame()` function to schedule the next screen update. 

> You can also set the path to an ellipse. You can do that by changing the two radii: horizontal radius and vertical radius.

### The HTML code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <title>Test</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          .circle {
            display: block;
            background: black;
            border-radius: 100%;
            height: 100px;
            width: 100px;

            background: radial-gradient(circle at center,#31f541, #000);
          }
          .container {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .circle-image{
              z-index: 2; 
              position: absolute; 
              margin-left: 50%; 
              margin-top: 50vh; 
              border-radius: 50%;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <img class="circle-image" src="https://sacco.terrence-aluda.com/sacco/images/blue.png"> 
          <figure class="circle"></figure>
      </div>
  </body>
</html>
```

It's a very small amount of code. We set the styles of the figure element and the image. For the `circle` class, we give it a block display, a black background, and a round border. 

The height and width are set equal for it to have the same diameter throughout. This way, we can make it appear like a circle. The `radial-gradient` function sets the color at the center to start with light green then end with black in a gradient fashion. 

Read more about `radial-gradient` [here](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient()) at the MDN documentation. This gradient effect gives it a spherical look. We give the `container` class a 100% width, a height of 100 view height, and a flex display. We also justify the content and align everything to the center. This centers our content in the `container` div horizontally and vertically.

The `circleimage` is given a `z-index` of 2 to overlay it over everything just in case the `sphere` overlaps with the image due to responsiveness. The margins are set to make it fit at almost the center. Again, the border-radius is set to 50% to give it a circular look of a rotating object.

Our 'sphere' is not perfectly at the center of the rotation if you are keen. You can fine-tune it using your styling.

### The full code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <title>Test</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          .circle {
              display: block;
              background: black;
              border-radius: 100%;
              height: 100px;
              width: 100px;

              background: radial-gradient(circle at center,#31f541, #000);
          }
          .container {
              width: 100%;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .circle-image{
              z-index: 2;
              position: absolute;
              margin-left: 50%;
              margin-top: 50vh;
              border-radius: 50%;
          }
      </style>
  </head>
  <body>
    <div class="container">
        <img class="circle-image" src="https://sacco.terrence-aluda.com/sacco/images/blue.png">
        <figure class="circle"></figure>
    </div>
    <script>
      // The image variable
      let image = document.querySelector("img");
      // 90 degrees
      let angle = Math.PI / 2;
      //variable to store the previous time the animate funuction last fired
      let prevTimeArg;
      function animate(currentTimeParam){

          if (prevTimeArg != null) {
              angle += (currentTimeParam - prevTimeArg) * 0.004;
          }
          // Setting the previous time to the time the function currently fires
          prevTimeArg = currentTimeParam ;
          image.style.top = (Math.sin(angle) * 150) + "px";
          image.style.left = (Math.cos(angle) * 150) + "px";
          requestAnimationFrame(currentTime => animate(currentTime));
      }
      requestAnimationFrame(animate);
    </script>
  </body>
</html>
```
### Applications for this
The most suitable areas for using these, that is after modifying it, include a circular progress indicator, a rotor in an aircraft/drone in a game, etc. These ideas are just some of many things you can do if you are creative and manipulate this idea well enough. 

A nice way to practice is with a solar system animation such as the one found [here](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations#an_animated_solar_system). Note that that guide uses this concept on a canvas unlike what we did. It should however serve as a great example even if you don't want to use canvases.

### Conclusion
In this guide, we first looked at how the sin and cos functions are used in circles. Next, we created a simple script in JavaScript to show the creation of an animation. 

Finally, we looked at embedding the script in an HTML file. I hope you get the chance to creatively build onto this simple program in a fun way. 

Have a great coding adventure!

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
