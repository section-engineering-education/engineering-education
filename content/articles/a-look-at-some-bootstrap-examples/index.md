### Introduction
[Bootstrap](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)) is a front-end framework for developing responsive, mobile-first projects on the web. It includes a powerful grid system, a flexible media object, and a powerful color system.

It is built with [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5), [Sass](), and [CSS3](https://www.w3.org/TR/2001/WD-css3-roadmap-20010523/).
### Advantages of using Bootstrap:
1. It saves on time and effort. With bootstrap, you can focus on writing your content, and the framework will take care of the rest, therefore, saving you time and effort.
2. Developers can customize the framework to their needs. An advantage of bootstrap is that you can change it to your own.
3. Bootsrap is responsive. It can be used on any device. A code can run on a tablet and the same code can run on a laptop without breaking.
4. Grid system is easy to use. Bootstrap has a friendly grid system for developing responsive websites.
### Getting Started!
Bootstrap was developed at [Twitter](https://en.wikipedia.org/wiki/Twitter) to help speed up the development of responsive websites. It is now used by many companies and projects around the world.)
### Downloading Bootstrap
To use bootstrap, you need to download its files and add them to your project. 
In this tutorial, we will install the bootstrap using the `package manager`. To do this, we need to first install the `Node.js` as it has the  `npm` package manager. In [Node.js](https://nodejs.org/en/), download the latest files based on the OS you are using and install. In my case, I am using Ubuntu.

After installing navigate to the folder where you have downloaded the files and run the following command in the terminal:
```bash
npm install bootstrap
```
A new folder will be created called `node_modules`. This folder contains the files required for bootstrap. These files are:
- /bootstrap - Contains the `js` and `css` files. This tutorial will use these files.
- /.package-lock.json - This file is used to keep track of the version of the bootstrap files.
- /@popperjs - This folder contains the files required for the `popper.js` library.
### How to use the Bootstrap files in your project
In the folder containg the installed bootstrap files, create a `index.html` file and add the code snipet below:
```html
<html>
  <head>
    <title>Getting Started with Bootstrap</title>
    <link 
    rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
    > 
    <link
      rel="stylesheet"
      href="node_modules/bootstrap/dist/css/bootstrap.css"
      type="text/css"
    />
  </head>
  <body>
    <div class="alert alert-success">
      <strong> Congratulation!</strong>
      <p>Bootstrap is working Successful!</p>
    </div>
  </body>
</html>
```
In the code snippet above, we have added the `bootstrap file` to our project in the `head` section. Open the `index.html` file in your browser.

If you see the alert box, you have successfully installed bootstrap. Congratulation!

>> **Note** We will use the above `index.html` in all examples in this tutorial.
### Container
In bootstrap, the container is the wrapper for the entire section of a page. It is a block element and is used to contain the content of the page. They align the content within a device or a viewpoint.

The syntax for containers is as follow:
```html
<div class="container">
    <!-- other code here -->
<div>
```
### Rows
Rows are the wrappers for the columns. They are used to align the content in the columns. They help structure the grid system hence keeps everything in order.

The syntax for rows is as follow:
```html
<div class="row">
```
### Jumbotron
The jumbotron is a special type of container that helps to give more importance to the content. It is a block element and it is used to contain the content of the page. It helps to give more importance and extra attention to the content.

To display jumbotron, a grey box with rounded corners is used. The font size of the text inside the jumbotron is also enlarged.

You can place the jumbotron inside the container or outside the container.
#### Placing the jumbotron inside the container
If you add the bootstrap inside the container, it will not extend the edges of your screen.

Assuming you want to add a jumbotron to a `index.html` file above, then the syntax would be as follows:
```html
 <div class="container">
      <div class="jumbotron">
        <h3>Section Community</h3>
        <p>
          Section is backed by a group of top-shelf Venture Capital firms, led by the Foundry Group.
        </p>
      </div>
    </div>
```
#### Placing the jumbotron Outside the container
This method will result in the jumbotron extending the edges of the screen.

To understand this better place the code snippet below in the index.html file and open it with a browser.
```html
<div class="jumbotron">
      <div class="container">
        <h3>Section Community</h3>
        <p>
          Section is backed by a group of top-shelf Venture Capital firms, led by the Foundry Group.
        </p>
      </div>
    </div>
```
Comparing the two code snippets, the second one will result in the jumbotron extending the edges of the screen while the first one will not.
### Bootstrap Collapse
The collapse is a component that allows you to hide and show content. It is a block element and it is used to contain the content of the page. It helps to give more importance and extra attention to the content.

For instance, if you won't have a lot of content on a phone(which has a small screen), the navbar might end up taking too much space. This is where the collapse comes in.

To accomplish this, you need to add the following code to our `index.html` file:
```html
<html>
  <head>
    <title>Getting Started with Bootstrap</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  </head>
  <body>
    <div class="container">
      <div class="jumbotron">
        <a href="#demo" class="btn btn-info" data-toggle="collapse">
          Click On Me
        </a>
        <div id="demo" class="collapse">
          <h5 style="color: blueviolet; font-size: larger;">Section</h5>
          <ol>
            <a href="https://www.section.io/about/"><li>About</li></a>
            <a href="https://www.section.io/contact-us/"><li>Contact</li></a>
          </ol>
        </div>
      </div>
    </div>
  </body>
</html>
```
In the code snippet above, we have added the collapse to the page. On Clicking the button `Click On Me`, the collapse having `About` and `Contact` will be shown.
### Bootstrap Modal Plugin
Bootstrap Modal Plugin is a dialog that pops up when you click on a button. It is dispalyed on top of the page being displayed.

Assume you want to add a modal plugin on your page. Below is an example to accomplish that task:
```html
<html>
  <head>
    <title>The Modal</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  </head>
  <body>
    <div style="border: 1px solid; width: 900px; height: 300px;">
      <div class="container">
        <button
          type="button"
          class="btn btn-info"
          data-toggle="modal"
          data-target="#modal"
        >
          Click on me For the Modal 
        </button>
        <div class="modal fade" id="modal" role="dialog">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <p>You have created a modal.  Congrats!</p>
              </div>
              <div class="modal-body">
                <p>More information</p>
              </div> 
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```
### Conclusion
Bootstrap can be used to create a better looking website. It is a very popular framework and it is used by many companies like [Spotify](https://www.spotify.com/us/), [Twitter](https://twitter.com/?laneng=), etc.

