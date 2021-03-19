Are you a creative frontend web designer or are you looking for ways to make your website look more interactive and visually appealing? Would you like to advertise your products interestingly? Look no further. Today, we are going to learn how to insert 3D objects into a website.

In this tutorial, we will be creating a simple webpage with basic components, design its layers, and then inserting the 3D object into the webpage.

### Key takeaways:
At the end of this tutorial, the user will get to learn about:
- 3D objects, formats, and some of their properties
- How to create or acquire 3D objects for their website
- Inserting a 3D object in a website
- Formatting the 3D object inserted into the webpage

### Prerequisites
Before we begin, some requirements of this tutorial include:
- A basic knowledge and understanding of HTML and web development.
- A basic understanding of CSS.
- A basic web development IDE or a text editor installed on your machine. In our case, let's use Visual Studio Code.
- A stable internet connection


# 3D Objects
Let us learn briefly about 3D Objects:

### What are 3D objects? 
If this question is in your mind, we can easily answer it by saying that 3D objects or 3D models are shapes with three dimensions; length, width, and height.

### How to get 3D Objects
We can obtain 3D Objects by either creating one from scratch, scanning real-life objects, modifying templates to suit your need, and downloading online models. We are going to look briefly at each of the methods mentioned above.

#### Creating 3D objects from scratch
One may create 3D objects from scratch using 3D model creation software which is downloadable into the computer. One may also design it online at 3D modeling sites.

#### Scanning from real-life objects
You can create one by scanning the item with your scanner of choice.
Photogrammetry is another process one may use.

> **Photogrammetry** can be simply defined as the art of acquiring reliable measurements from 2D images by overlapping them to form a 3D model.
This method is much simpler and more preferable since one can use 2D images generated with a smartphone and obtain live 3D models. An example is illustrated [here](https://www.youtube.com/watch?v=ZIW4XU6Wm8Q).

#### Modifying existing templates
One can modify existing templates that are on the computer or were previously created for another project to suit your needs.

#### Online download
There are many sites with different 3D models. Examples that allow free downloads are [Sketchfab](https://sketchfab.com/) and [Google Poly](https://poly.google.com/) among others.

### 3D Model Formats
These are used to store the appearance of a model, encoding the model animations, encoding the geometry, and storing the physical appearance of the model. They are used in video games, 3D printing, engineering, movies and so much more.
Some popular formats available include *FBX*, *STL*, *OBJ*, *glTF*, and *DAE* among others.
In our case, we will use the *glTF model*.

> **glTF**, *Graphics Language Transmission Format*, is a 3D model format designed for efficient transmission and loading of 3D models by applications.

After visiting the above sites or any other, search for any preferable model and download it, in this case, we are going to search, download and use a Virtual Reality Headset (VR Headset) model which is in glTF format. 

![VR Headsets](/engineering-education/How-to-insert-3D-objects-into-a-webpage-using-HTML-and-CSS/poly-VR-Headset.png)

## 3D Model Attributes
These are the characteristics of the viewed 3D Object on the website set by the frontend developers as preferred. Some attributes one can set to 3D models include:
- Auto-Rotate
- Alternative text(alt)
- Model-Visibility
- Augmented Reality
- Touch-action
- Camera-controls
- Source(src)
- ios-src and many more...


**Let's now get into the tutorial:**
First things first, let's set up our Visual Studio Code IDE. In the extensions tab, search for the "HTML Boilerplate" and "Live Server" extensions and install them. Create a folder and name it "3D Objects". Open the folder with Visual Studio Code and in it create other two folders namely "assets" and "css". Create an "index.html" file in the main directory and "style.css" in the CSS folder. 

## Create a webpage Strucure
We are going to create a simple HTML structure. We can simplify the process using boilerplate generators which may come pre-installed by default in Visual Studio Code or as downloadable extensions by typing in the index file, "html:5" or "html5-boilerplate" then key in the Enter key. Since we don't need additional elements in the boilerplate generated, we will delete the extra code and link it to our CSS file. Let's also link it with some online scripts which will load some Font Awesome fonts and icons. The outcome will be as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>3D Object</title>
    <script src='https://kit.fontawesome.com/a076d05399.js'></script>
    <link rel="stylesheet" href="css/style.css">
    
</head>
<body>
    
</body>
</html>
```
Start the live server by either right-clicking on the "index.html" file in the explorer and selecting "Open with Live server" or on the status bar clicking on "Go live" to start the server. It will automatically open a preview of the webpage in the default browser which will be blank because we haven't added any content yet. I recommend you use chrome since it supports most 3D objects. You can change the default browser in the settings. If it doesn't automatically open the webpage preview in the browser, check the port number in which the server uses at the Visual Studio Code status bar then add access it in the browser by typing in the URL:

~~~~
http://127.0.0.1:5501/
~~~~

Port numbers vary from one to another. In my case, it is port number 5501. If the server doesn't launch completely, stop any services with a similar address running in the background. If it still has errors please look for additional support online concerning the error it displays.


In the head section, add a link to import a model-viewer JavaScript code. This enables you to import the component into the webpage.

```html
    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
    <script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
```

Copy your logo picture in the assets folder.
When done, add a div element of id "container" to hold all our content in the body tags and also another in it for our navigation bar. Let us also add div elements with the following id; "aside" for holding our 3D object, "content" for some explanations on the object, and "icons" for some social media icons. Add a simple logo and some links to the webpage and some of their properties in css as shown below:

```html
<div id="container">
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
        <div id="aSide">
            
        </div>
        <div id="content">
            <h2>3D VR LIVE</h2>
            <p>The modern headsets, boost your pleasure to the MAX!</p>
            <button>Shop</button>
        </div>
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

Now use CSS to style the page and the div elements:

```css
* {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    box-sizing: border-box;
    color: grey;
}

#container {
    height: 100vh;
    width: 100%;
    position: relative;
    background: #f7f7f7;
}

#navbar {
    height: 60px;
    width: 100%;
    position: absolute;
    top: 20px;
    left: 0;
}

#navbar #logo {
    height: 60px;
    width: 60px;
    position: absolute;
    left: 3%;
    top: -5px;
}

#navbar #logo img {
    height: 60px;
    width: 60px;
}

#navbar ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 5%;
    top: 0;
}

#navbar ul li {
    height: 60px;
    width: 80px;
    margin: 0 30px;
    display: grid;
    place-items: center;
    color: grey;
}

#navbar ul:hover .active {
    background: none;
    border: none;
}

#content {
    height: 500px;
    width: 700px;
    position: absolute;
    left: 12%;
    top: calc(50% - 250px);
}

#content h2 {
    font-size: 140px;
    color: grey;
}

#content p {
    font-size: 20px;
    color: rgb(189, 189, 189);
}

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

#content button:hover {
    background: navy;
}

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

#icons #iconsLogo {
    height: 300px;
    width: 50px;
    display: flex;
    flex-direction: column;
}

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
![Page structure](/engineering-education/How-to-insert-3D-objects-into-a-webpage-using-HTML-and-CSS/structure-design.png)

## Insert the 3D Object
Let's now add the 3D model to the webpage. First, if the 3D model files are in a zip format, extract the downloaded model zip into files such as the ".bin" and ".gltf".

> Data from the ".bin" file is used for buffering in buffers, which is then used by BufferViews, accessors, and mesh primitives

Copy the files into the assets folder in the main directory. Make sure to check and see if the zip had additional files or images so that when copying the files, the file names may not conflict with those of the images in the assets folder. If they do conflict, rename the images in the assets folder first before pasting.
In the div element with the "aside" id, let's import the 3D object and some of its attributes. For this case, we are going to use the type, source(src), alternative text (in case of any loading errors), auto-rotate(for a continuous rotation of the object), camera-controls(to allow one to view the object at their preferred angle of view), ar(to support Augmented Reality, AR, devices), and ios-src(to be used on supported iOS 12+ devices). Write the code below to import the 3D model in the webpage:
 
 ```html
<model-viewer src="assets/HTC_Vive_Headset.gltf" alt="VR Headset" auto-rotate camera-controls ar ios-src="assets/HTC_Vive_Headset.gltf">
</model-viewer>
 ```

You can obtain the code above and even more attributes on the [Model-viewer](https://modelviewer.dev/) site. Here you can also see some model attributes available for the object and their usages in the docs section. 

In the live preview, it will output the following:
![Inserting a 3D Model](/engineering-education/How-to-insert-3D-objects-into-a-webpage-using-HTML-and-CSS/Inserting-a-3D-model.png)

The next step is to modify its appearance using CSS. Let's do this by adding the code below to our CSS file:

```css
#aSide {
    height: 600px;
    width: 600px;
    position: absolute;
    top: calc(50% - 250px);
    right: 7%;
}

#aSide model-viewer {
    height: 600px;
    width: 600px;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
}
```

**Final results:**
![Final results](/engineering-education/How-to-insert-3D-objects-into-a-webpage-using-HTML-and-CSS/full-design.png)

If you have reached here, this means that your 3D model is well inserted in the webpage, rotates at a uniform rate and the camera angle can be modified. 
Well done! You have successfully inserted a 3D object into your webpage.

This fixes #1645
