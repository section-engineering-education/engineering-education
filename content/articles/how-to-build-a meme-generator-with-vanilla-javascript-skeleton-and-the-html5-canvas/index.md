# How to build a Meme Generator with Vanilla JavaScript, Skeleton and the HTML 5 Canvas
Memes are a stimulating and fun way to pass messages across to people. This tutorial will take you through a step-by-step guide on how you can build a simple meme generator with JavaScript(no frameworks involved) and style its components with CSS’s [Skeleton](http://getskeleton.com/). With the [HTML 5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), users will be able to upload images and texts of their choice and or from an online source to create comical memes for a mass online audience. 

## Prerequisites for this tutorial
A text editor.
A sound understanding of HTML, CSS and JavaScript.

### Adding Skeleton to your project
Skeleton is a unique CSS framework that helps in designing web apps. It consists of several simple and responsive boilerplate codes that help with certain CSS functionalities and make them easier. Skeleton also comes with utility classes that boost the UI appearance with its own styled elements e.g. `.button.button-primary`.
There are two ways to install Skeleton into your application: You can either download the [zip file](https://github.com/dhg/Skeleton/releases/download/2.0.4/Skeleton-2.0.4.zip) and extract into your system or clone [this repo](https://github.com/dhg/Skeleton.git) with the following command:

`git clone https://github.com/dhg/Skeleton.git`

I advise you to download the zip file because the command above is still under active development. After downloading and extracting the zip file to your project folder, you will find the file structure below in your text editor:

![skeleton-file-structure](/engineering-education/how-to-build-a meme-generator-with-vanilla-javascript-skeleton-and-the-html5-canvas/skeleton-file-structure.png)

It contains Skeleton’s CSS, [Normalize CSS](https://necolas.github.io/normalize.css/), and `index.html` file that you can use to get your app started.

## Designing the Meme generator
This app will have three sections. The first will contain the `input` files element where you will choose whatever image you desire to use for your meme. The second section will contain the top and bottom text inputs where you insert the words and sentences you want in your meme. This section will also have a “Create New Meme” button that will complete a `click` event by displaying the finished meme on the last section of the app: ***The HTML 5 Canvas***. We will style this app with CSS and Skeleton. 



Here is the code for the HTML layout of the application:

```html

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" content="width=content-width, initial-scale=1">
    <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="./Skeleton-2.0.4/css/skeleton.css">
    <link rel="stylesheet" href="./style.css">
    <title>Meme Generator with JS</title>
  </head>
  <body>
    <div class="row" id="grid-1">
        <div class="one-half column">
      <h4 class="choose-new-image">Choose new image</h4>
      </div>
      <div class="one-half column">
      <input type="file" id="choose-image" class="col-md-6" style="cursor: pointer;">
      </div>
      </div>
        <div class="row" id="grid-2">
          <div class="one-half column">
      <h5>Top Meme Text</h5>
      <input type="text" id="text-above" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      </div>
      <div class="one-half column">
        <h5>Bottom Meme Text</h5>
        <input type="text" id="text-below" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      </div>
    </div>

    <div class="btn-div">
      <button id="btn">Create New Meme</button>
    </div>

      <div class="">
      <canvas id="canvas"></canvas>
      </div>
    <script src="./script.js"></script>
  </body>
</html>

```

The `row` classes you see on some of the elements, were gotten from Skeleton to help align the app’s UI in a grid system. We also got the “Create new Meme” button from Skeleton as well as the inputs.

Now the CSS:

```css

@media (min-width: 410px) {
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

#grid-1, #grid-2 {
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

@media(min-width: 716px) {
  #canvas {
    width: 40vw;
    height: 50vh;
    border-radius: 20px;
  }
}
```

This is what the root page of this app looks like at this point:

![meme-generator](/engineering-education/how-to-build-a meme-generator-with-vanilla-javascript-skeleton-and-the-html5-canvas/meme-generator.png)


## Adding JavaScript
First, create a `script.js` file. In there, you have to call the HTML elements that you intend to work on into your Javascript file with the `document.querySelector('#elementId')` function. Here is the code below:

```js
const chooseImage = document.querySelector('#choose-image');
const textAbove = document.querySelector('#text-above');
const textBelow = document.querySelector('#text-below');
const button = document.querySelector('#btn');

```

## Importing images locally to the application
To create the meme, you will need an image and texts whether words or sentences. To get a particular image from your system to the application, you first need to add an `eventListener` that will listen for a `change` event when the user chooses a new image. To get the exact image URL, we are going to grab the first file that exists within the file `input` field and convert it to a data URL(i.e. an image represented in a URL text form). After getting the image URL, you can then set the `image.src` to the `imageDataURL`. 
Here is the code below:

```js

chooseImage.addEventListener('change', () => {
    const imageDataURL = URL.createObjectURL(chooseImage.files[0])
    image = new Image();
    image.src = imageDataURL;
})

```
The `chooseImage.files` that is set to an index 0, represents the first file you pick in the file `input` which is the chosen image. Now, you can proceed to display the image on the Canvas.

## How to use the HTML 5 Canvas for this project
You make use of the HTML5 `canvas` tag and give it an `id` when trying to create a canvas in the DOM. You also have the option of setting your desired width and height for it. For example: 

```html
<div>
      <canvas id="canvas" width="150" height="100"></canvas>
      </div>
```

Then, you target the canvas with a `document.querySelector()` function so you can work with it in your JavaScript file. 

```js
const canvas = document.querySelector('#canvas');
```

Note that: Not all browsers support the HTML 5 Canvas. Some of the popular browsers that do include:

Chrome
Edge
Firefox
Safari, e.t.c.

Browsers like the Internet Explorer 7 and 8 are not compatible with the HTML 5 canvas but there is a way to work around it. You can use [Explorer Canvas](https://code.google.com/p/explorercanvas/) to facilitate canvas support on the Internet Explorer. Here’s how:

```html
 <!--[if IE]><script src = "excanvas.js"></script><![endif]-->
```  

### Getting the element’s context
Initially, the `<canvas>` element is blank and it remains so until you write a script that will access its rendering context. The HTML 5 Canvas has a DOM rendering function called `getContext` that you can use to draw whatever you need on the canvas(not manually of course). This function will take a parameter `2d` to ensure that the rendered image appears in 2d form. Here is the code to create the required context along with a check if the user’s browser supports it.

```js

var canvas  = document.querySelector("#canvas");

if (canvas.getContext) {   
   var ctx = canvas.getContext('2d');   
   // drawing code here   
} else {   
   
   // canvas-unsupported code here 
}

```

## The `loadImage` function
We are going to create a `loadImage` function that will handle the display of the chosen image on the Canvas. Inside `loadImage`, you can append the image onto the canvas with the `drawImage(image, dx, dy)` function from the HTML 5 Canvas. **Here**, the `image` in the function represents an image object on the canvas. The `dx` and `dy` represent the coordinate on the target canvas where the image should be placed. Next, we will set the width property of the canvas to our image’s width so, when the user tries to load the image on the canvas, the image will take its width thereby boosting the app’s UI appearance. We will also do that for the `height` and `yOffSet`. Here is the code below:

```js

if (canvas.getContext('2d')) {
    const loadImage = () => {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();

        const width = image.width;
        const height = image.height;
        const yOffSet = height / 7;

        // load the canvas background
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0);
}

} else {
    alert('Your browser does not support this image format');
```

## Forming the text on the image
Texts on the HTML 5 canvas, have special functions for text formation and styling. Some of them include:

`textBaseline [ = value ]`: This one helps you to set the baseline of the text whether top or bottom. 
`fillText(text, x, y [, maxWidth ] )`: This property aids in filling the text in the particular position you indicate with the `x` and `y` coordinates. 
`font [ = value ]`: This property helps you set the font and font size of the text you intend to use on the canvas. 
`strokeStyle`/`fillStyle`: When you set these properties, the new value becomes the default for all the shapes you want to draw on the canvas. We will use the `fillStyle` to set the text body colour. The `strokeStyle` will help to set the text border colour. 

Here is the code for the text formation:

```js

if (canvas.getContext('2d')) {
    const loadImage = () => {

        // styling the meme text
        ctx.font = 'Bold 40px Sans-serif';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';

        // adding the top meme text
        ctx.textBaseline = 'Top';
        ctx.fillText(textAbove.value, width / 3, yOffSet);
        ctx.strokeText(textAbove.value, width / 3, yOffSet);

        // adding the bottom text
        ctx.textBaseline = 'Bottom';
        ctx.fillText(textBelow.value, width / 3, height - yOffSet);
        ctx.strokeText(textBelow.value, width / 3, height - yOffSet);
        }

} else {
    alert('Your browser does not support this image format');
}

```

## Displaying the Meme
Now that we have everything in place, the last thing we need to do is to create an event listener on the “Create New Meme” button and call the `loadImage` function after a `click` event. Here is the code below:

```js

if (canvas.getContext('2d')) {
    const loadImage = () => {
    button.addEventListener('click', loadImage);

} else {
    alert('Your browser does not support this image format');
}

```

To make use of the application, the user needs to first choose an image locally then input text in both the top and bottom `input` fields and finally click the “Create New Meme” button to create a new meme.
Here is the app’s final appearance with a created meme. 

![final-image](/engineering-education/how-to-build-a meme-generator-with-vanilla-javascript-skeleton-and-the-html5-canvas/final-image.png)
 

# Conclusion
In this tutorial, you learned the entire process of importing and using Skeleton for your application’s UI. You also learned how to use the HTML 5 Canvas to fix images and texts at certain coordinate points in the DOM, together creating a new meme. You can head to my [Github Repo](https://github.com/Nomzy-kush/Meme-Generator) to get the source code. [Here](https://pensive-kepler-281118.netlify.app/) is the link to the live application deployed on Netlify.     

   



 






           
 
