---
layout: engineering-education
status: publish
published: true
url: /how-to-insert-3d-objects-into-a-webpage-using-html-and-css/
title: How to Insert 3D Objects into a Webpage using HTML and CSS
description: In this article we will understand how to build build 3D objects in webpage using HTML and CSS. We will also build a simple webpage containing a 3D object.
author: chris-mutua
date: 2021-03-24T00:00:00-08:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-insert-3d-objects-into-a-webpage-using-html-and-css/hero.jpg
    alt: How to Insert 3D Objects into a webpage using HTML and CSS example image
---
Are you a creative frontend web designer or are you looking for ways to make your website look more interactive and visually appealing? Would you like to advertise your products interestingly? Look no further. Today, we are going to learn how to insert 3D objects into a website.
<!--more-->
In this tutorial, we will create a simple webpage with basic components, design its layers, and then inserting 3D objects into the webpage.

### Key takeaways
At the end of this tutorial, the reader will get to learn about:
- 3D objects, formats, and some of their properties.
- How to create or acquire 3D objects for their website.
- Inserting a 3D object in a website.
- Formatting the 3D object inserted into the webpage.

### Prerequisites
Before we begin, some prerequisites for this tutorial include:
- Basic knowledge with good understanding of HTML and web development.
- A basic understanding of CSS.
- A basic web development IDE or a text editor installed on your machine. In our case, we will be using Visual Studio Code.
- A stable internet connection.

### What are 3D objects? 
If this question is in your mind, we can easily answer it by saying that 3D objects or 3D models are shapes with three dimensions: length, width, and height.

### How to get 3D Objects?
We can obtain 3D Objects by either creating one from scratch, scanning real-life objects, modifying templates to suit your need, and downloading online models. We are going to look briefly at each of the methods mentioned above.

#### Creating 3D objects from scratch
One may create 3D objects from scratch using 3D model creation software, which is downloadable into the computer. One may also design it online at 3D modeling sites.

#### Scanning from real-life objects
You can create one by scanning the item with your scanner of choice.

Photogrammetry is another process that one may use.

> Photogrammetry can be simply defined as the art of acquiring reliable measurements from 2D images by overlapping them to form a 3D model.

This method is much simpler and more preferable, since one can use 2D images generated with a smartphone and obtain live 3D models. An example is illustrated [here](https://www.youtube.com/watch?v=ZIW4XU6Wm8Q).

#### Modifying existing templates
One can modify existing templates that are on the computer or were previously created for another project to suit your needs.

#### Online download
There are many sites with different 3D models. Examples that allow free downloads are [Sketchfab](https://sketchfab.com/) and [Google Poly](https://poly.google.com/) among others.

### 3D model formats
These are used to store the appearance of a model, encoding the model animations, encoding the geometry, and storing the physical appearance of the model. They are used in video games, 3D printing, engineering, movies and so much more.

Some popular formats available include `FBX`, `STL`, `OBJ`, `glTF`, and `DAE` among others.

In our case, we will use the `glTF model`.

> Graphics Language Transmission Format (glTF), is a 3D model format designed for efficient transmission and loading of 3D models by applications.

After visiting the sites above or any other, search for any preferable model and download it. In this case, we are going to search, download and use a Virtual Reality Headset (VR Headset) model in glTF format.

![VR Headsets](/engineering-education/how-to-insert-3d-objects-into-a-webpage-using-html-and-css/poly-VR-Headset.png)

### 3D model attributes
These are the characteristics of the viewed 3D Object on the website set by the frontend developers.

Some attributes that one can set to 3D models include:
- Auto-Rotate
- Alternative text (alt)
- Model-Visibility
- Augmented Reality
- Touch-action
- Camera-controls
- Source (src)
- ios-src and many more...

Let's now get into the tutorial.

First things first, let's set up our Visual Studio Code IDE.

1) In the extensions tab, search for the [HTML Boilerplate](https://marketplace.visualstudio.com/items?itemName=sidthesloth.html5-boilerplate) and [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extensions and install them.
2) Create a folder and name it "3D Objects".
3) Open the folder with Visual Studio Code and create two folders named "assets" and "css".
4) Create an "index.html" file in the main directory and "style.css" in the CSS folder.

### Create a webpage structure
We are going to create a simple HTML structure.

We can simplify the process using boilerplate generators which may come pre-installed by default in Visual Studio Code or as downloadable extensions by typing in the index file, "html:5" or "html5-boilerplate".

Since we don't need additional elements in the boilerplate generated, we will delete the extra code and link it to our CSS file.

Let's also link it with some online scripts that will load some "Font Awesome" fonts and icons. 

The outcome will be as shown below:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>3D Object</title>
        <script src='https://kit.fontawesome.com/a076d05399.js' />
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
    </body>
</html>
```

Start the live server by either right-clicking on the "index.html" file in the explorer and selecting "Open with Live server" or on the status bar clicking on "Go live" to start the server.

It will automatically open a preview of the webpage in the default browser which will be blank because we haven't added any content yet.

I recommend you to use Google Chrome browser, since it supports most 3D objects. You can change the default browser in the settings. 

If it doesn't automatically open the webpage preview in the browser, check the port number in which the server uses at the Visual Studio Code status bar then add access it in the browser by typing in the URL, something like this:

```html
<code>http://127.0.0.1:5501/</code>
```

Port numbers vary from one to another. In my case, it is port number `5501`. If the server doesn't launch completely, stop any services with a similar address running in the background. If it still has errors please look for additional support online concerning the error it displays.

In the head section, add a link to import a `model-viewer` JavaScript code. This enables you to import the component into the webpage.

```html
<!--Imports a model-viewer JavaScript code -->
<!--It helps to handle how the 3D Object would be displayed -->
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
```

Copy your logo picture into the assets folder.

When done, add a `div` element of `id` as a `container` to hold all our content in the body tags and also another in it for our navigation bar.

Let's also add `div` elements with the following `id`s:
- `aside` for holding our 3D object, 
- `content` for some explanations on the object, and
- `icons` for some social media icons.

Add a simple logo and some links to the webpage and some of their properties in css as shown below:

```html
<!-- Main Container -->
<div id="container">
    <!-- Navbar container -->
    <div id="navbar">
        <div id="logo">
            <img src="assets/logo.png" alt="logo">
        </div>
        <ul>
            <li class="active">
                <a href="#">Home</a>
            </li>
            <li><a href="#">Tech</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Help</a></li>
        </ul>
    </div>
    <!-- An aside -->
    <!-- This is for holding the 3D object -->
    <div id="aSide">
        
    </div>

    <!-- Content container -->
    <!-- This is for holding some brief description about the 3D object -->
    <div id="content">
        <h2>3D VR LIVE</h2>
        <p>The modern headsets, boost your pleasure to the MAX!</p>
        <button>Shop</button>
    </div>

    <!-- Social media icons -->
    <!-- This is for holding some company's social media icons and related links -->
    <div id="icons">
        <div id="iconsLogo">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-youtube"></i>
            <i class="fab fa-twitter"></i>
        </div>
    </div>
</div>
```

Now, use CSS to style the page and the `div` elements:

```css
/* The webpage overall styling */
* {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    box-sizing: border-box;
    color: grey;
}

/*  This is for styling the main container that holds everything */
#container {
    height: 100vh;
    width: 100%;
    position: relative;
    background: #f7f7f7;
}

/* This styles the navbar and its contents */
#navbar {
    height: 60px;
    width: 100%;
    position: absolute;
    top: 20px;
    left: 0;
}

/* This styles the logo in the navbar */
#navbar #logo {
    height: 60px;
    width: 60px;
    position: absolute;
    left: 3%;
    top: -5px;
}

/* This styles the logo image to be used in the navbar */
#navbar #logo img {
    height: 60px;
    width: 60px;
}

/* This styles the unlisted links in the navbar */
#navbar ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 5%;
    top: 0;
}

/* This changes the appearance of the listed links in the navbar */
#navbar ul li {
    height: 60px;
    width: 80px;
    margin: 0 30px;
    display: grid;
    place-items: center;
    color: grey;
}

/* This sets the hover action of the navbar links */
#navbar ul:hover .active {
    background: none;
    border: none;
}

/* This styles the descriptions of the 3D object */
#content {
    height: 500px;
    width: 700px;
    position: absolute;
    left: 12%;
    top: calc(50% - 250px);
}

/* This styles the heading in the 3D description */
#content h2 {
    font-size: 140px;
    color: grey;
}

/* This styles the paragraph in the 3D description*/
#content p {
    font-size: 20px;
    color: rgb(189, 189, 189);
}

/* This styles the button in the 3D description*/
#content button {
    width: 35%;
    height: 40px;
    font-size: 16px;
    font-family: sans-serif;
    margin-top: 5vh;
    margin-left: center;
    border: none;
    outline: none;
    border-radius: 20px;
    background: dodgerblue;
    color: white;
}

/* This adds some hover effects over the button */
#content button:hover {
    background: navy;
}

/* This styles the social media icons*/
#icons {
    height: 500px;
    width: 140px;
    background: none;
    position: absolute;
    left: 0;
    top: calc(50% - 250px);
    display: flex;
    align-items: center;
    filter: drop-shadow(2px 2px 2px grey);
}

/* This styles the social media icons logos*/
#icons #iconsLogo {
    height: 300px;
    width: 50px;
    display: flex;
    flex-direction: column;
}

/* This styles the social media icons logos images*/
#icons #iconsLogo i {
    height: 50px;
    width: 50px;
    font-size: 30px;
    margin: 10px;
    color: grey;
    display: grid;
    place-items: center;
    cursor: pointer;
}
```

The results are as follows:

![Page structure](/engineering-education/how-to-insert-3d-objects-into-a-webpage-using-html-and-css/structure-design.png)

### Insert the 3D Object
Now, let's add the 3D model to the webpage. First, if the 3D model files are in a `zip` format, extract the downloaded model `zip` into files such as the `.bin` and `.gltf`.

> Data from the ".bin" file is used for buffering in buffers, which is then used by BufferViews, accessors, and mesh primitives

Copy the files into the `assets` folder in the `main` directory. Make sure to check and see if the `zip` has any additional files or images, when copying the files. 

The file names may not conflict with those of the images in the assets folder. If they do conflict, rename the images in the assets folder first before pasting.

In the `div` element with the `aside` id, let's import the 3D object and some of its attributes.

For this case, we are going to use the `type`, `source(src)`, `alternative text` (in case of any loading errors), `auto-rotate` (for a continuous rotation of the object), `camera-controls` (to allow one to view the object at their preferred angle of view), `ar` (to support Augmented Reality, AR, devices), and `ios-src` (to be used on supported iOS 12+ devices).

Write the code below to import the 3D model in the webpage:

```html
<!-- 3D objsect -->
<!-- This inserts the 3D object inside the aside container -->
<model-viewer src="assets/HTC_Vive_Headset.gltf" alt="VR Headset" auto-rotate camera-controls ar ios-src="assets/HTC_Vive_Headset.gltf"></model-viewer>
```

You can obtain the code above and even more attributes on the [Model-viewer](https://modelviewer.dev/) site. Here, you can also see some model attributes available for the object and their usages in the docs section.

In the live preview, it will output the following:

![Inserting a 3D Model](/engineering-education/how-to-insert-3d-objects-into-a-webpage-using-html-and-css/Inserting-a-3D-model.png)

The next step is to modify its appearance using CSS. 

Let's do this by adding the code below to our CSS file:

```css
/* This styles the aside container */
#aSide {
    height: 600px;
    width: 600px;
    position: absolute;
    top: calc(50% - 250px);
    right: 7%;
}

/* This styles the 3D object inserted in the aside container */
#aSide model-viewer {
    height: 600px;
    width: 600px;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
}
```

#### Final results:

![Final results](/engineering-education/how-to-insert-3d-objects-into-a-webpage-using-html-and-css/full-design.png)

You can find the code above in [this](https://github.com/RisoriTofa/Insert-3D-Objects-in-a-webpage-using-HTML-and-CSS-only) repository.

If you have reached this point, this means that your 3D model is well inserted in the webpage, rotates at a uniform rate and the camera angle can be modified.

### Conclusion
3D objects can be very useful to help a client see their products in their full dimension and relative size. They are more interesting to look at and interactive when compared to 2D images.

To summarize, the reader learned about:
- What 3D objects are.
- Formats and attributes of 3D objects.
- How to get 3D objects.
- How to insert 3D objects into a webpage using HTML and CSS.

You can learn more about 3D objects and how to create one using JavaScript at the references below.

Happy coding!

### References
- [School of motion - Photogrammetry video](https://www.youtube.com/watch?v=ZIW4XU6Wm8Q).
- [Diego González blog](https://medium.com/samsung-internet-dev/adding-3d-models-to-your-website-d374a8cbbadd).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)