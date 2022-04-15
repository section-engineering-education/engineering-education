---
layout: engineering-education
status: publish
published: true
url: /meme-generator-vanilla-javascript-skeleton-html5-canvas/
title: Building a Meme Generator with Vanilla JavaScript, Skeleton and HTML 5 Canvas
description: This tutorial will show the reader how to build a meme generator with Vanilla JavaScript, Skeleton, and HTML 5 Canvas.
author: doro-onome
date: 2022-02-24T00:00:00-14:55
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/meme-generator-vanilla-javascript-skeleton-html5-canvas/hero.jpg
    alt: Building a meme generator with Vanilla JavaScript, Skeleton and the HTML 5 Canvas
---
Memes are a stimulating and fun way to pass messages to people. This tutorial will take you through a step-by-step guide on how you can build a simple meme generator with JavaScript (no frameworks involved) and style its components with CSS and [Skeleton](http://getskeleton.com/).
<!--more-->
With the [HTML 5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), users will be able to upload images and texts of their choice and or from an online source to create comical memes for a mass online audience. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Adding Skeleton to your project](#adding-skeleton-to-your-project)
- [Designing the meme generator](#designing-the-meme-generator)
- [Adding JavaScript](#adding-javascript)
- [Importing locally-stored images to the application](#importing-locally-stored-images-to-the-application)
- [How to use the HTML 5 Canvas for this project](#how-to-use-the-html-5-canvas-for-this-project)
- [Getting the element’s context](#getting-the-elements-context)
- [The loadImage function](#the-loadimage-function)
- [Forming the text on the image](#forming-the-text-on-the-image)
- [Displaying the meme](#displaying-the-meme)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you are required to have the following:
- A text editor.
- Basic understanding of HTML, CSS, and JavaScript.

### Adding Skeleton to your project
Skeleton is a unique CSS framework that helps in designing web apps. It consists of several responsive and straightforward boilerplate codes that help with certain CSS functionalities that make styling easier. Skeleton also has utility classes that boost the UI appearance with its styled elements (e.g., `.button.button-primary`, representing a perfectly styled button without CSS).
There are two ways to install Skeleton into your application:
- Download the [zip file](https://github.com/dhg/Skeleton/releases/download/2.0.4/Skeleton-2.0.4.zip) and extract it into your system.
- Clone [this repo](https://github.com/dhg/Skeleton.git) with the following command:

```bash
git clone https://github.com/dhg/Skeleton.git
```

*I advise you to download the zip file because the command above is still under active development.*

After downloading and extracting the zip file to your project folder, you will find the file structure below in your text editor:

![skeleton-file-structure](/engineering-education/meme-generator-vanilla-javascript-skeleton-html5-canvas/skeleton-file-structure.png)

It contains Skeleton’s CSS, [Normalize CSS](https://necolas.github.io/normalize.css/), and `index.html` file that you can use to get your app started.

### Designing the meme generator
This app will have three sections. The first will contain the `input` files element, where you will choose a specific image you desire to use for your meme. The second section will include the top and bottom text inputs to insert the words and sentences you want in your meme. 

This section will also have a `create new meme` button that will complete a click event by displaying the finished meme on the last section of the app. Here is the code for the HTML layout of the application:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" content="width=content-width, initial-scale=1" />
    <link
      href="//fonts.googleapis.com/css?family=Raleway:400,300,600"
      rel="stylesheet"
      type="text/css"
    />
    <link rel="stylesheet" href="./Skeleton-2.0.4/css/skeleton.css" />
    <link rel="stylesheet" href="./style.css" />
    <title>Meme Generator with JS</title>
  </head>
  <body>
    <div class="row" id="grid-1">
      <div class="one-half column">
        <h4 class="choose-new-image">Choose new image</h4>
      </div>
      <div class="one-half column">
        <input
          type="file"
          id="choose-image"
          class="col-md-6"
          style="cursor: pointer"
        />
      </div>
    </div>
    <div class="row" id="grid-2">
      <div class="one-half column">
        <h5>Top Meme Text</h5>
        <input
          type="text"
          id="text-above"
          style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        />
      </div>
      <div class="one-half column">
        <h5>Bottom Meme Text</h5>
        <input
          type="text"
          id="text-below"
          style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        />
      </div>
    </div>

    <div class="btn-div">
      <button id="btn">create new meme</button>
    </div>

    <div class="">
      <canvas id="canvas"></canvas>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

We got the `row` classes you see on some of the elements from Skeleton to help align the app’s UI in a grid system. We also got the `create new meme` button from Skeleton and the inputs.

To make our application a little less bare, add the following style to your `style.css` file:

```css
@media (min-width: 400px) {
  * {
    box-sizing: border-box;
    font-family: "Nunito", sans-serif;
  }
  body {
    background-color: #000;
    border-radius: 20px;
    margin: 0 auto;
    padding-top: 2em;
  }
  #grid-1,
  #grid-2 {
    color: rgb(255, 191, 0);
    justify-content: space-around;
    font-size: 25px;
    padding-top: 1em;
    padding-left: 10em;
    padding-right: 10em;
    background-color: rgb(0, 255, 255);
    width: 90vw;
    height: 20vh;
    margin: auto;
    border-radius: 50px;
  }
  #grid-2 {
    padding-top: 0;
    margin-top: 1em;
  }
  .btn-div {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 40%;
  }
  #btn {
    margin-top: 1em;
    color: #fff;
  }
}
@media (min-width: 716px) {
  #canvas {
    width: 40vw;
    height: 50vh;
    border-radius: 20px;
  }
}
```

Our root page should look like this after adding the style:

![meme-generator](/engineering-education/meme-generator-vanilla-javascript-skeleton-html5-canvas/meme-generator.png)


### Adding JavaScript
First, create a `script.js` file. Call the HTML elements you intend to work on into your JavaScript file with the `document.querySelector(‘#elementId’)` method.

Here is the code:


```JavaScript
const chooseImage = document.querySelector('#choose-image');
const textAbove = document.querySelector('#text-above');
const textBelow = document.querySelector('#text-below');
const button = document.querySelector('#btn');
```

### Importing locally-stored images to the application
To create the meme, you will need a picture and texts, whether words or sentences. To get a particular image from your system to the application, you first need to add an event listener that will listen for a `change` event when the user chooses a new image.

Here is the code below:

```JavaScript
chooseImage.addEventListener("change", () => {
  const imageDataURL = URL.createObjectURL(chooseImage.files[0]);
  image = new Image();
  image.src = imageDataURL;
});
```

In the code above, we got the image URL by targeting the first file inside the `input` field and then converting it to a data URL (i.e., an image represented in a URL text form). We then set the `image.src` to the `imageDataURL`. The `chooseImage.files` is set to index 0, representing the first file the user picks in the file `input` which is the chosen image.

Now, we can proceed to display the image on the Canvas.

### How to use the HTML 5 Canvas for this project
You make use of the HTML5 `canvas` tag by giving it an `id` when trying to create a canvas in the DOM. You can also set a specific width and height that you desire. 

For example:  

```html
<div class="">
    <canvas id="canvas" width=”150” height=”100”></canvas>
</div>
```

Then, target the canvas with a `document.querySelector()` method so you can work with it in your JavaScript file. 

```JavaScript
const canvas = document.querySelector('#canvas');
```

> Note: Not all browsers support the HTML 5 Canvas. Chrome, Edge, Firefox, and Safari are the most popular browsers that support it.

Browsers like Internet Explorer 7 and 8 are not compatible with the HTML 5 canvas but, you can write a script that will aid the browser support for the canvas code.

Here is one for Internet Explorer:

```JavaScript
<script src = "excanvas.js"></script>
```  

### Getting the element’s context
The Canvas is initially blank. It is like a hollow void that you need to fill with images, texts, etc. You can do that by accessing its rendering context using the DOM rendering `getContext()` function. This function will help you draw what you need on the canvas (not manually). The `getContext()` function takes one parameter, `2d`, to ensure that the rendered image appears in 2D form. 

Here is the code to create the required context and check if the user’s browser supports it:

```JavaScript
var canvas = document.querySelector("#canvas");
if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
  // supported canvas code here
} else {
  // unsupported canvas code here
}
```

### The 'loadImage' function
We will need to create a `loadImage` function that will handle the display of the chosen image on the Canvas. Inside the `loadImage` function, you can append the image onto the canvas with the `drawImage(image, dx, dy)` method from the HTML 5 Canvas.

Here is the code below:

```JavaScript
if (canvas.getContext("2d")) {
  const loadImage = () => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    const width = image.width;
    const height = image.height;
    const yOffSet = height / 7;
    // load the canvas background
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);
  };
} else {
  alert("Your browser does not support this image format");
}
```

In the code above, the `image` in the function represents an image object on the canvas. The `dx` and `dy` represent the Canvas’s coordinate points to fix the image. We then set the `width` property of the Canvas to our image’s width. That way when the user tries to load the picture, it takes the canvas width, which will make the app UI look better. We also do that for the `height` and `yOffSet`.

### Forming the text on the image
Texts on the HTML 5 canvas have unique text formatting and styling methods. Some of them include:
- `textBaseline [ = value ]`: This one helps you set the text's baseline, whether top or bottom. 
- `fillText(text, x, y [, maxWidth ] )`: This property aids in filling the text in the particular position you indicate with the `x` and `y` coordinates. 
- `font [ = value ]`: This property helps you set the font and font size of the text you intend to use on the canvas. 
- `strokeStyle`/`fillStyle`: We will use the `fillStyle` to set the text body colour. The `strokeStyle` will help to set the text border colour. When you set these properties, the new value becomes the default for all the shapes you want to draw on the canvas 

Here is the code for the text formation:

```JavaScript
if (canvas.getContext("2d")) {
  const loadImage = () => {
    // styling the meme text
    ctx.font = "Bold 40px Sans-serif";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    // adding the top meme text
    ctx.textBaseline = "Top";
    ctx.fillText(textAbove.value, width / 3, yOffSet);
    ctx.strokeText(textAbove.value, width / 3, yOffSet);
    // adding the bottom text
    ctx.textBaseline = "Bottom";
    ctx.fillText(textBelow.value, width / 3, height - yOffSet);
    ctx.strokeText(textBelow.value, width / 3, height - yOffSet);
  };
} else {
  alert("Your browser does not support this image format");
}
```

### Displaying the meme
Now that we have everything in place, the last thing we need to do is to create an event listener on the `create new meme` button and call the `loadImage` function after a `click` event.

Below is the code:

```JavaScript
if (canvas.getContext("2d")) {
  const loadImage = () => {
    button.addEventListener("click", loadImage);
  };
} else {
  alert("Your browser does not support this image format");
}
```

To use the application, the user first needs to choose an image locally, input text in both the top and bottom `input` fields, and finally click the `create new meme` button to create a new meme.

Here is the app’s final appearance with a created meme:

![final-image](/engineering-education/meme-generator-vanilla-javascript-skeleton-html5-canvas/final-image.png)

To get the source code, you can head to my [GitHub repo](https://github.com/Nomzy-kush/Meme-Generator) to get the source code. [Here](https://pensive-kepler-281118.netlify.app/) is the link to the live application deployed on Netlify.
 
### Conclusion
In this tutorial, we learned the entire process of importing and using Skeleton for your application’s UI. We also learned how to use the HTML 5 Canvas to fix images and texts at specific coordinate points in the DOM, thus creating a new meme.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mwangi](/engineering-education/authors/geoffrey-mwangi/)
