---
layout: engineering-education
status: publish
published: true
url: /javascript-canvas-piechart/
title: Creating a pie chart using JavaScript, HTML Canvas, and CSS
description: This article will discuss how to create a pie chart from scratch using JavaScript, HTML Canvas, and CSS.
author: sandra-moringa
date: 2021-12-17T00:00:00-04:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/javascript-canvas-piechart/hero.jpg
   alt: JavaScript Canvas Piechart Example Image
---

Sometimes, you may want to create a chart without any library. This tutorial will take you through how to do that using JavaScript, HTML Canvas, and CSS.
<!--more-->

### Prerequisites
To follow along, you will be required to have a basic understanding of these programming languages:
1. HTML
2. CSS
3. JavaScript

### Table of contents
- [An overview of the canvas](#an-overview-of-the-canvas)
- [Drawing the pie](#drawing-the-pie)
- [Conclusion](#conclusion)

### An overview of the canvas
It's easy to position, give custom shapes and color to items in the DOM using the CSS styling provided. But, some operations like drawing lines between two or more locations, are particularly difficult to accomplish with standard HTML components. That being said, there are two other options provided:
1. Scalable Vector Graphics (SVG)
2. Canvas

As the name suggests, SVG is used to create vector graphics in XML format. This article focuses on the canvas, so we won't go further into SVG. If you are interested in SVG, you can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg). 
 
The second option is the canvas. A canvas is a single DOM element that gives us a way to draw shapes on a node's space using its provided drawing interface and methods. You can declare a simple canvas element as shown in the line below:

 ```html
<canvas width="200" height="200"></canvas>
 ```

Its size is determined in pixels. Thus,  you can set its dimensions (height and width) to tailor your needs. To start manipulating the canvas, we need to access its drawing methods. The methods are found in its drawing interface which we access by creating a context object. This object contains all the methods we will use to draw the shapes, set the color, create rotations, translations, etc.

The object provides drawing styles: `2d` for two-dimensional(2D) graphics and `webgl` for three-dimensional(3D) graphics. We pass the style we are going to use in the context's `getContext()` method as a parameter i.e:

```javascript
let context = canvas.getContext("2d");
```

We are going to use `2d` for our article. For a detailed `webgl` guide, follow this [link](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL).

The two main canvas 2D methods we will be using for our article are:
1. `arc()` - For drawing the pie chart's arcs.
2. `lineTo()` - For drawing a separator line between the pie's slices.

Lastly, we will use JavaScript's array `reduce()` method. This will come in handy when we will be processing the data to display in our chart. 

#### arc()
A simple example to demonstrate the creation of  an arc is shown in this snippet:

```html
<!DOCTYPE html>
<html>
<head>
    <title>canvas test</title>
    <style type="text/css">
                .container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
    </style>
</head>
<body>
<div class="container">
<canvas width="200" height="200"></canvas>
</div>
</body>
<script>
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(50,50, 50, Math.PI/2,  Math.PI);
    ctx.stroke();
</script>
</html>
```

This produces:

![pie-one](/engineering-education/javascript-canvas-piechart/pie-one.png)

This is the `arc()` method's syntax:

```javascript
void ctx.arc(center-x-coordinate,center-y-coordinate, arc-radius-length, startAngle, endAngle [, counterclockwise]);
```
We pass in the center's `x` and `y` coordinates, the radius' length, and the angles where the arc will start and where it will end. We then have an optional boolean value for the direction our arc will follow between the two angles. It is counterclockwise by default (`true`). If `false`, it draws it in a clockwise manner.

> NOTE: We use the radians method to denote our angles where `Math.PI(π)` is **180°**. It starts from 0°, in our case, in a counterclockwise manner that's why our 90°(`Math.PI(π)/2`) is located at the bottom.

We also stroked it to give it the black line. In our case for the pie chart, we will use the `fill()` method. We will look at that later.

#### lineTo()
This method is used to draw a straight line. It is used together with the `beginPath()` and `moveTo()` to create a line. `beginPath()` is used to start a new path while the `moveTo()` creates a point (a 'from' coordinate) which will be joined by the `lineTo()` method. Let's see that through an example:

```javascript
ctx.beginPath();
ctx.moveTo(50,0);   
ctx.lineTo(200, 0);
ctx.stroke();
```

We start at `(50,0)` then end at `(200,0)`.

The output is as shown below:

![line](/engineering-education/javascript-canvas-piechart/pie-two.png)

#### Array.prototype.reduce()
This method executes a user-defined callback function on each element of the array passed to it in order. It returns a single value. Let's see this using a multiplication example.

```javascript
const testArray = [5, 5, 9, 1];
//multiplying our previous element  with the current element
const ourCallback = (prevElem, currElem) => prevElem * currElem;
console.log(testArray.reduce(ourCallback));
```

The result will be **225**. 

As far as the `reduce()` function is related to this, we will be using only that functionality. More on the reduce() function is found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

### Drawing the pie
This is where our article is based on. We will start by creating a `results` object where we will create our pie from.

```javascript
const results = [
        {mood: "Angry", total: 1499, shade: "#0a9627"},
        {mood: "Happy", total: 478, shade: "#960A2C"},
        {mood: "Melancholic", total:332, shade: "#332E2E"},
        {mood: "Gloomy", total: 195, shade: "#F73809"}
    ];
```
It contains different moods of people, their total number, and the color representing the mood in descending order. (Let's assume it's from a surveying API 😃).

To get the total number of people who participated in the survey, we use the `reduce()` function as shown below:

```javascript
let sum = 0;
let totalNumberOfPeople = results.reduce((sum, {total}) => sum + total, 0);
```

Next, we draw the pie.

```javascript
    let currentAngle = 0;

    for (let moodValue of results) {
        //calculating the angle the slice (portion) will take in the chart
        let portionAngle = (moodValue.total / totalNumberOfPeople) * 2 * Math.PI;
        //drawing an arc and a line to the center to differentiate the slice from the rest
        ctx.beginPath();
        ctx.arc(100, 100, 100, currentAngle, currentAngle + portionAngle);
        currentAngle += portionAngle;
        ctx.lineTo(100, 100);
        //filling the slices with the corresponding mood's color
        ctx.fillStyle = moodValue.shade;
        ctx.fill();
    }
```
We have a `for/of` loop where we start by calculating the angle the slice (portion) will take in the chart using this formula:

```
(total number of people containing a mood / total number of people) * 360°
```

> We start from 0° to 360° in an anticlockwise fashion.

We then draw an arc and a line to the center to differentiate the slice from the rest. We set the current angle to where angle the portion consumed. This will be used to set where the next slice will start.

For the colors, we style the portion with the corresponding mood's color using the `fill()` method. Here, we don't use the `stroke()` method.

The final output is shown below:

![pie](/engineering-education/javascript-canvas-piechart/pie-three.png)

Here is the full code:

```html
<!DOCTYPE html>
<html>
<head>
    <title>canvas test</title>
    <style type="text/css">
                .container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
    </style>
</head>
<body>
<div class="container">
<canvas width="200" height="200"></canvas>
</div>
</body>
<script>
    let ctx = document.querySelector("canvas").getContext("2d");

    const results = [
        {mood: "Angry", total: 1499, shade: "#0a9627"},
        {mood: "Happy", total: 478, shade: "#960A2C"},
        {mood: "Melancholic", total:332, shade: "#332E2E"},
        {mood: "Gloomy", total: 195, shade: "#F73809"}
    ];

    let sum = 0;
    let totalNumberOfPeople = results.reduce((sum, {total}) => sum + total, 0);
    let currentAngle = 0;

    for (let moodValue of results) {
        //calculating the angle the slice (portion) will take in the chart
        let portionAngle = (moodValue.total / totalNumberOfPeople) * 2 * Math.PI;
        //drawing an arc and a line to the center to differentiate the slice from the rest
        ctx.beginPath();
        ctx.arc(100, 100, 100, currentAngle, currentAngle + portionAngle);
        currentAngle += portionAngle;
        ctx.lineTo(100, 100);
        //filling the slices with the corresponding mood's color
        ctx.fillStyle = moodValue.shade;
        ctx.fill();
    }

</script>
</html>
```

To build on this, you can create line charts, bar charts, etc. using the canvas. You have to play with rotations because the canvas starts to draw from the top-left and not the bottom-left. You can also add text to the slices.

### Conclusion
In a nutshell, we walked you through an overview of the canvas, looked at the canvas' methods we would use and the JavaScript's `reduce()` method. Lastly, we created the pie using a simple JavaScript code.

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
