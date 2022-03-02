---
layout: engineering-education
status: publish
published: true
url: /pure-css-wave-animations-website/
title: How to Add Pure CSS Waves to Your Website
description: In this article, we will use pure CSS and HTML to add animations to a website. CSS animations lets an element gradually change from one CSS configuration style to another.
author: linchez-maina
date: 2021-12-08T00:00:00-11:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/pure-css-wave-animations-website/hero.jpg
    alt: Pure CSS Waves animations image
---
Adding animations to your website makes it look livelier and more attractive to your users, it increases its presence, and improves conversions. The downfall of adding animations using JavaScript is that they reduce a website's performance, especially when the developer fails to select an optimized library. 
<!--more-->
However, there is a turnaround to such a problem, and that is using pure CSS and HTML. 

### Goal
In this article, we will use pure CSS and HTML to add animations to a website similar to the one in this [video](https://www.youtube.com/embed/sAjpeUh3bIs).

### Prerequisites
To follow along with this tutorial, you should have:
- A basic knowledge of HTML and CSS.
- Your favorite code editor.

### Learning points
- What CSS animations are.
- Advantages of using CSS animations over JavaScript animations.
- How to use the CSS animation property. There will be a demonstration.
- We will make a pure CSS waves animation, and I will show you how to add it to a website.

### CSS Animations
CSS animations lets an element gradually change from one CSS configuration style to another.

They contain a couple of components:
- A style configuring the CSS animation.
- A stack of keyframes indicating how the animation style will begin and finish.
- Intermediate waypoints are also possible.

### Advantages of using CSS animations
A few of the advantages of using CSS animations, particularly over script-driven animation techniques like JavaScript, include:
- Simplicity, you do not have to learn complex programming concepts.
- You let the browser control the animation sequence when using CSS animations. This optimizes performance and efficiency.

The browser achieves this by reducing update times of animations running in tabs that are not visible.
- Good loading score. CSS animations load well, even under moderate system load. Using JavaScript can often make simple animations load poorly.

### How to use the CSS animation property
To create a CSS animation, you will have to design the elements you wish to animate with the `animation property` and its sub-properties.
- The `animation property` lets you configure values like duration.
- It does not dictate the natural appearance of the animation, as it is accomplished by utilizing the `@keyframes at-rule.`

You can learn how to configure the animation property using its sub-properties from [here](https://www.w3schools.com/cssref/css3_pr_animation.asp)

### Defining the animation order using the '@Keyframes rule'
After you have set your animation's sub-properties, and ensuring the `animation-duration` priority, you need to define the animation's sequence or appearance. This is done by configuring more than one keyframe using the `@keyframes rule.`

You can learn how to use the `@keyfreame rule` from [here](https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp)

### Steps to Follow
- Make an HTML file and, inside the body tags, write a `<div>` tag with a class of blue-parent and two child elements with their own `<div>` tags and have a class of `blue-child` each.
 
> Remember, giving our HTML elements classes and IDs makes it easier to reference them in other files. 
```css
<div class="blue-parent">
  <div class="blue-child"></div>
  <div class="blue-child"></div>
</div>

```

- Create `<style>` tags, set up a background for our body, and give it a radial gradient background.

> A radial background creates an image having a progressive transition between two or more colors that fan out from an origin. It can take the shape of either an ellipse or a circle.

- We will add three color-stop values at 0%, 35%, and 100% with color values of `rgba (245,254,234,1)` for the first two stops and a hex value of `#B7E8EB` for the last stop.

>You will notice that the background exhibits an ellipse as it moves away from the center with the three different colors laying over each othe. The last color-stop value being the most exterior color. 

- We prevent any scrolling from taking place by setting the value of the overflow property of the body tag to `hidden`.

- We then style the `<div>` element with the `blue-parent` class in a way that places it at the bottom of the page at all times.
```css
.blue-parent { 
  width:100%;
  height: 7%;
  background: #016890;
  position: absolute;
  left:0;
  bottom:0;
  }

```

- The `<div>` tag with a class of `blue-parent` is a parent element with two children `<div>` tags, each with a class of `blue-child`.

We will now give each of them a background obtained from the web.

> The background sets both backgrounds of the two `<div>` tags with an image of something that looks like one wave crest.

It then sets it to repeat to appear to be always onscreen like a long chain.

- We style the two `<div>` so that they are above each other by setting the top property with a negative value, giving them a width and height, and then setting the animation property.

> We use a shorthand method to describe all animation sub-properties instead of writing each sub-property line by line.

- We first give our animation a name: `wave-one`, which we will use with the `@keyframes rule` to set the animation's keyframes.
 
- Then we set it to go through one cycle in eight seconds by setting the animation duration to 8s.
```css
.blue-child {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/waves.svg) repeat-x;
  min-height: 197px;
  position: absolute;
  width: 6400px;
  top: -197px;
```

- Set the animation-timing-function property using the `cubic-bezier()` function. The function defines a Cubic Bezier curve which is defined by four points.

- We then set the `animation-iteration-count` to infinite to make the animation run forever.
```css
animation: wave-one 8s cubic-bezier (0.37, 0.44, 0.64, 0.54) infinite;
```

> Failing to set the other animation properties allows the computer to use the properties' default values while rendering the animation.

- Give the elements a transform property with a value of `translate3d.` The `translate3d` is used to define a 3D translation (takes a vector as values) to create a 3-dimensional effect. 

The final set of CSS rules defined for both `<div>` tags is as below:
```css
.blue-child {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/waves.svg) repeat-x; 
  position: absolute;
  min-height: 197px;
  position: absolute;
  width: 6400px;
  top: -197px;
  animation: wave-one 8s cubic-bezier (0.37, 0.44, 0.64, 0.54) infinite;
  transform: translate3d (0, 0, 0);
}
```

- Select the second child element of the class `.blue-child` using the nth-type pseudo-class.
```css
.blue-child:nth-of-type(2) {
  top: -174px;
```

We set it to be just below the first child element. Next, proceed to set the animation property.

- We name the two animations, wave-one and crests. We then set the animation wave-one with the animation-delay property. 

- Additionally, let's set it to a negative value to allow it to start first.
```css
animation: wave-one 8s cubic-bezier (0.37, 0.44, 0.64, 0.54) -.124s
```

- We have a second animation: `crests,` which will take `8s` to complete one cycle and has an animation-timing function of ease. This means the animation will start slow, fast, and slowly end. 

- It will have a negative value as its `animation-delay` property value.

- It's then set to run forever (infinite). Next, we proceed and set the element to opacity value of `1` to distinguish it from the first element.

```css
.blue-child:nth-of-type(2) {
  top: -174px;
  animation: wave-one 8s cubic-bezier (0.37, 0.44, 0.64, 0.54) -.124s infinite, crests 8s ease -1.24s infinite;
  opacity: 1;
  }
```

We use the `@keyframes rule` when defining the animations' sequence. This allows us to define how our animations 'behave' at certain times. In our case, we will first define a keyframe for the `wave-one` animation. We define two time stops: `0%` and `100%`.

- At the start state, we will set the left margin to `0`, then a negative value of `1600` pixels at the stop state. This allows the elements to move from right to left.
```css
@keyframes wave-one {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}
```

- We define a transform property with the value `translate3d` and set the y-value to go from a negative to a positive.

- The value then changes back to a negative value to make the second child element move up and down, completing the building of a wavy animation.

```css
@keyframes crests {
  0%, 100% {
    transform: translate3d (0, -24px, 0);
  }
  50% {
    transform: translate3d (0, 4px, 0);
  }
}
```

Our final code will look like this:

#### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="code on wavess .css">
  <title>Document</title>
</head>
<body>
  <div class="blue-parent">
    <div class="blue-child"></div>
    <div class="blue-child"></div>
  </div>
</body>
</html>
```

#### CSS

```css
html, body {height: 100%;}
body {
  background: radial-gradient (ellipse at center, rgba(245,254,234,1) 0%, rgba(245,254,234,1) 35%, #B7E8EB 100%);
  overflow: hidden;
}
.blue-parent { 
  width:100%;
  height: 7%;
  background: #016890;
  position: absolute;
  left:0;
  bottom:0;
}

.blue-child {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/waves.svg) repeat-x; 
  position: absolute;
  min-height: 197px;
  position: absolute;
  width: 6400px;
  top: -197px;
  animation: wave-one 8s cubic-bezier (0.37, 0.44, 0.64, 0.54) infinite;
  transform: translate3d (0, 0, 0);
}

.blue-child:nth-of-type(2) {
  top: -175px;
  animation: wave-one 8s cubic-bezier( 0.37, 0.44, 0.64, 0.54) -.124s infinite, crests 8s ease -1.24s infinite;
  opacity: 1;
}

@keyframes wave-one {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes crests {
  0%, 100% {
    transform: translate3d(0,-24px,0);
  }
  50% {
    transform: translate3d(0,5px,0);
  }
}
```

Our final website will have a wave animation that moves from right to left.

You can also look up this [GitHub repository](https://github.com/lin-chez/How-To-Add-Pure-CSS-Waves-To-Your-Website.git) to find the full code on how to add pure wave css animations to your website. 

### Conclusion
Using HTML and CSS only, we have created a wave animation that is simple to implement and will improve the website's performance. No one ever wants a slow loading website. Always keep that in mind while creating your website.

I hope this tutorial will help you develop an efficient and responsive website. Thank you for reading this tutorial.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
