---
layout: engineering-education
status: publish
published: true
url: /intersection-observer-api/
title: How to use Intersection Observers in a Website
description: In this article, we will discuss how the Intersection Observer API is made to detect element visibility by building a simple web page that implements image lazy-loading.
author: wilson-gichuhi
date: 2021-01-22T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/intersection-observer-api/hero.jpg
    alt: Intersection Observer example image
---
An Intersection Observer is a browser API that provides a way to observe the visibility and position of a DOM element relative to the containing root element or viewport. The API is asynchronous, giving a smooth user experience. Some common use cases of this API include lazy-loading images on scroll, implementing infinite scrolling, and animations.
In this article, we will discuss how this API is made to detect element visibility by building a simple web page that implements image lazy-loading features.
<!--more-->
### Prerequisites
This article is about a JavaScript browser API so you will need a basic knowledge of the [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) programming language, [HTML markup](https://www.w3schools.com/html/html_intro.asp) and [CSS](https://www.w3schools.com/css/) styling. 

To build the lazy-loading image web page, you will need a browser and a text editor. I will be using [Google Chrome](https://www.google.com/chrome/) and [VS Code](https://code.visualstudio.com/download). Regarding the browser support for this API, [caniuse](https://caniuse.com/intersectionobserver) is a great site for reference.

### How the Intersection Observer works
To describe how this API works, we will use an example regarding the `IntersectionObserver` object.

First, we need to test if the browser supports this API. 

You can use a condition statement like:

```javascript
if ('IntersectionObserver' in window) {
    console.log("Your browser supports IntersectionObserver");
} else {
    console.log("Your browser does not support IntersectionObserver");
}
```

See the structure of how an `IntersectionObserver` look like below:

```javascript
let options= {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

function callbackFunction(entries){ // array of observing elements
    entries.forEach(entry=>{
        // The logic to apply for each entry
    })
}

let observer= new IntersectionObserver(callbackFunction,options);
observer.observe();
```

The `IntersectionObserver` object takes two arguments, a callback function, and an optional object:

- A callback is executed when the target intersects with the viewport.

- In our options object, the root refers to the element that the target is intersecting against. The root property is set to null, which will refer to the viewport and is also the default reference when it's not defined.

- The `rootMargin` will define the margin around the root element to extend, or shrink the capturing frame when the dimensions of the root do not provide enough flexibility.

- The callback function takes an argument of entries referring to an array of elements we are observing. Inside the function is a loop that applies the logic needed for each entry. `IntersectionObserver` can accept only one element for the observation. This is why we are iterating the elements to observe each separately.

- Calling `observer.observer()` will observe the intersection when the target closes the threshold in either direction.

- A `threshold` refers to numeric values between 0 and 1 to represent the percentage in which the target intersects the root. A value of 0 will mean the intersection is 0% and a value of 1 will mean that the intersection is 100%. In our case, it is 50%. If the `threshold` option is not set, the default value 0 is used.

- If you need to observe the same element multiple times on different percentages, you need to set multiple thresholds as an array in the options object like this:

```javascript
let options= {
    root:null,
    rootMargin:'0px',
    threshold:[0, 0.5, 0.75, 1]
    };
```

This will make the API report only to the change in visibility when the target crosses these thresholds.

### Lazy loading images on a web page using the Intersection Observer API
Since images are a common form of content in most websites, lazy-loading may improve page load speed by deferring downloading images on the initial page render. This is the part where we will build a webpage that lazy-loads images and applies some CSS styles if the image intersects the viewport.

The structure for this project is simple. First, open your editor and create a folder named `Gallery-Site`. Inside this folder, create three files namely `index.html` for the markup, `design.css` for our CSS styling, and `app.js` for the JavaScript. For our images, create a folder named images inside the Gallery-Site folder. 

You can check out the images and this application in my [Github repository](https://github.com/ReactifyStudio/ImageLoad-IntersectionObserver).

#### The HTML file
The HTML file will have a simple navigation bar on the top, a heading with a `h2` tag, a `div` acting as the container for the images, and a footer at the bottom of the page. 

Our images will use a `data-src` attribute that will point to our image and the attribute `src` will be updated with JavaScript when the image is visible on the screen. This will prevent the image from loading instantly on the page. We also have a `<link rel="stylesheet" href="design.css">` link tag for our styles and a `<script src="app.js"></script>` for the JavaScript file.

We will be creating these files in the next steps. 

This is the markup in the `index.html` file:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>

    <nav>
        <h1>MY GALLERY</h1>
        <div>
            <a href="#">About</a>
            <a href="#">Register</a>
            <a href="#">Login</a>
        </div>
    </nav>
    <h2>This is my Gallery Website</h2>

    <div class="image-container">
    <img data-src="./images/ai.jpg" alt="img-1">

    <img data-src="./images/code.jpg" alt="img-2">

    <img data-src="./images/fg.jpg" alt="img-3">

    <img data-src="./images/hero.jpg" alt="img-4">

    <img data-src="./images/images.jpg" alt="img-5">

    <img data-src="./images/lapt.jpg" alt="img-6">

    <img data-src="./images/lock.jpg" alt="img-7">

    <img data-src="./images/lpt.jpg" alt="img-8">
</div>

    <footer>
        Built by Wilson Njugia <a href="https://github.com/reactifyStudio">-reactifyStudio</a>.
        &copy; 2020. All rights reserved.
    </footer>
    <script src="app.js"></script>
</body>
</html>
```
#### Styling our webpage
Next, we'll apply some simple styles to our images. When the image is visible on the screen, we will perform a simple animation in our fade class.

*Note* - I have also added a customized scroll bar using CSS `pseudo-element`.

The `design.css` file is as shown below:

```CSS
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    font-family:monospace,sans-serif;
}
body::-webkit-scrollbar{
    width: 10px;
}
body::-webkit-scrollbar-track{
    background-color: black;
}
body::-webkit-scrollbar-thumb{
    background-color: white;
}
nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: coral;
    padding: 1.5rem 0;
}

nav h1{
    font-size: 2rem;
    color:white;
}
h2{
    color:rgb(255, 32, 225);
    text-align: center;
    font-size: 2.5rem;
}
a{
    text-decoration: none;
    font-size: 1.5rem;
    color: white;
}
.image-container{
    background-color: #d5d6d5;
}
img{
    width: 60vw;
    height: 450px;
    transform: translateX(50%);
    opacity: 0;
    transition: all 900ms;
}

.fade{
    transform: translateX(0);
    opacity: 1.0;
    transition: all 900ms;
}

footer{
    background-color: rgb(8, 7, 10);
    padding: 1.8rem;
    color: #ffffff;
}
```

### The Intersection Observer with JavaScript
Here is the JavaScript code:

```javascript
const targets = document.querySelectorAll("img");

const lazyLoad = (target)=>{
  const io = new IntersectionObserver((entries,observer)=>{
      entries.forEach(entry=>{
          if(entry.isIntersecting){
              const img=entry.target;
              const src=img.getAttribute("data-src");

              img.setAttribute("src",src);
              img.classList.add("fade");
              observer.disconnect();
          }
      })
  },{threshold:[0.7]});

  io.observe(target);
}
targets.forEach(lazyLoad);
```

The code walkthrough:
- `const targets=document.querySelectorAll("img")` will get all our images in the DOM.

- The `lazyLoad` function takes a DOM element as its argument. Inside this function, we create our observer object named `io` that takes a callback with two parameters.

- The first parameter `entries` is the actual observations on the element and the `observer` parameter is the interface used to manage the instance of this observer.

- The `entries.forEach` method will loop over our entries. Inside the loop, we check with `entry.isIntersecting` to see if the image is intersecting with the viewport. 

    When the image intersects, we will add the `src` attribute from its `data-src` attribute by calling `img.setAttribute("src",src)` and then add a fade class using `img.classList.add()` method.

    Each image has its own observer therefore, we can call the method `observer.disconnect()` to dispose of the image observer. Our options object will use a threshold of 0.7. 

    The `io.observe(target)` is the method that will observe the image visibility.

- We now need to loop over `targets` containing our images and pass the `lazyLoad` callback function to be observed by the `IntersectionObserver`.

To see the finished example, check out the deployed version on [Netlify](https://galleryio.netlify.app/).

### Summary
In summary, the `IntersectionObserver` API is easy to use and currently has good support in modern browsers. The API works in an asynchronous non-blocking way, unlike expensive listeners that will depend on scroll events running on the main thread, therefore it isn't a detriment to load pages quickly.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
