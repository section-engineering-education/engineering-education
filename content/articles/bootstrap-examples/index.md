---
layout: engineering-education
status: publish
published: true
url: /a-look-at-some-bootstrap-examples/
title: A Look at Some Bootstrap Examples 
description: This article takes a look at some bootstrap examples. Bootstrap is a front-end framework for developing responsive, mobile-first projects on the web.
author: erastus-muriithi
date: 2021-09-07T00:00:00-10:50
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/a-look-at-some-bootstrap-examples/hero.jpg
    alt: A Look at Some Bootstrap Examples Hero Image
---
Bootstrap is a front-end framework for developing responsive web projects. It includes a powerful grid system, a flexible media object, and a powerful color system.
<!--more-->
Boostrap is built with [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5), [Sass](https://en.wikipedia.org/wiki/Sass_(stylesheet_language)), and [CSS3](https://www.w3.org/TR/2001/WD-css3-roadmap-20010523/).

### Advantages of using bootstrap:
1. It saves time and effort - With bootstrap, you can focus on writing your content, and the framework will take care of the rest, thus, saving you time and effort.
2. Developers can customize the framework to their needs.
3. Bootstrap is responsive - It can be used on any device without breaking.
4. The grid system is easy to use - Bootstrap has a friendly grid system for developing responsive websites.

### Getting started!
Bootstrap was developed at [Twitter](https://en.wikipedia.org/wiki/Twitter) to help speed up the development of responsive websites. It is now used by many companies and projects around the world.

### Downloading bootstrap
To use bootstrap, you need to download its files and add them to your project. In this tutorial, we will install the bootstrap using the `package manager`. 

To do this, we need to first install [Node.js]((https://nodejs.org/en/)) as it has the `npm` package manager. Download the latest files based on your Operating System (OS) and install them. In my case, I am using Ubuntu.

After installing, navigate to the folder where you have downloaded the files and run the following command in the terminal:

```bash
npm install bootstrap
```

A new folder will be created called `node_modules`. This folder contains the files required for bootstrap. These files are:
- `/bootstrap` - Contains the `js` and `css` files. This tutorial will use these files.
- `/.package-lock.json` - This file is used to keep track of the version of the bootstrap files.
- `/@popperjs` - This folder contains the files required for the `popper.js` library.

### How to use the bootstrap files in your project
In the folder containing the installed bootstrap files, create an `index.html` file and add the code snipet below:

```html
<html>
  <head>
    <title>Getting Started with Bootstrap</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
    />
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

In the code above, we have added the `bootstrap file` to our project in the `head` section. Open the `index.html` file in your browser.

If you see the alert box, then you have successfully installed bootstrap. Congratulations!

> We will use the above `index.html` in all examples in this tutorial.

### Container
In bootstrap, the `container` is the wrapper for the entire section of a page. It is a block element used to contain the page's content. Containers align the content within a device or a viewpoint.

The syntax for containers is as follows:

```html
<div class="container">
  <!-- other code here -->
  <div></div>
</div>
```

### Rows
Rows are wrappers for the columns. They are used to align the content in the columns. They help structure the grid system, hence, keep everything in order.

The syntax for rows is as follow:

```html
<div class="row"></div>
```

### Jumbotron
Jumbotron is a special type of container that allows specific content to standout. It is a block element and it is used to contain the page's content. 

To display Jumbotron, a grey box with rounded corners is used. The font size of the text inside the jumbotron is also enlarged. 

You can place the Jumbotron inside or outside a container.

#### Placing the Jumbotron inside the container
If you add the bootstrap inside the container, it will not extend the edges of your screen.

Assuming you want to add a Jumbotron to the `index.html` file above, then the syntax would be as follows:

```html
<div class="container">
  <div class="jumbotron">
    <h3>Section Community</h3>
    <p>
      Section is backed by a group of top-shelf Venture Capital firms, led by
      the Foundry Group.
    </p>
  </div>
</div>
```

#### Placing the Jumbotron outside the container
This method will result in the Jumbotron extending the edges of the screen.

To understand this better place the code snippet below in the `index.html` file and open it with a browser.

```html
<div class="jumbotron">
  <div class="container">
    <h3>Section Community</h3>
    <p>
      Section is backed by a group of top-shelf Venture Capital firms, led by
      the Foundry Group.
    </p>
  </div>
</div>
```

Comparing the two code snippets, the second one will result in the Jumbotron extending the edges of the screen while the first one will not.

### Bootstrap collapse
The collapse is a component that allows you to hide and show content. It is a block element and it is used to contain the content of the page. 

It helps to give more importance or extra attention to the content.

For instance, if you have a lot of content, the navbar might end up taking too much space on mobile devices. This is where the `collapse` comes in.

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

In the code snippet above, we have added the `collapse` to the page. When you press on the `Click On Me` button, the `collapse` having `About` and `Contact` will be shown.

### Bootstrap modal plugin
Bootstrap modal plugin is a dialog that pops up when you click on a button. It is displayed on top of a page.

The following example shows how to use a modal plugin:

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
          Click on me for the modal
        </button>
        <div class="modal fade" id="modal" role="dialog">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <p>You have created a modal. Congrats!</p>
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

### Bootstrap progress bar
The progress bar is a component that shows the progress of a task, eg the progress of installing software. The progress is normally represented in a percentage form. 

In the `index.html` file, replace the existing snippet with the one below, open the file with your favourite browser to see the output:

```html
<html>
  <head>
    <title>progress bar</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  </head>
  <body>
    <div class="container" style="border: 1px solid; width: 300px; height: 150px; top: 50%; ">
      <h5>Example of a Progress bar</h5>
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="40"  aria-valuemin="0" aria-valuemax="10" style="width: 57%;">
          67% Complete
        </div>
      </div>
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="10" style="width: 82%;">
          82% Complete
        </div>
      </div>
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="10" style="width: 100%;">
          100% Complete
        </div>
      </div>
    </div>
  </body>
</html>
```

### Bootstrap Media Object
The media object is a component used to display a media object. It is used to display images, videos, and other media.
 
They are accompanied by a right-aligned or left-aligned image and text content.

Assume that you have an image `media.jpg` and you want to add some content describing the image on the right side of the image. You can accomplish that task using the snippet below:

```html
<html>
  <head>
    <title>Media Object</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container mt-3" >
      <div class="media border p-3 ">
        <img src="img/media.jpg" alt="media" class="mr-3 mt-3 rounded-circle" style="width: 40px;">
        <div class="media-body" >
          <h6><strong>Peter</strong>Joined Section on 1st June 2020</h6>
          <p>Peter is currently a reviewer.</p>
        </div>
      </div>
    </div>
</html>
```

### Bootstrap star rating
The star rating is a component that allows end-users to rate a product or service. The number of stars chosen by the user is indicated by the number of filled stars.

Assuming you are asking a user to rate your work and the user rates your work using only two stars. The snippet below shows the feedback you would get:

```html
<html>
  <head>
    <title>Rating Star</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </head>
  <body>
    <div class="rating" style="border: 1px solid; width: 300px; height: 100px; top: 50%;">
      <h5>Please Rate my work</h5>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
    </div>
    <style>
      .checked {
        color: red;
      }
      .rating {
        position: absolute;
        border-bottom: 20px;
        margin-left: 500px;
        text-align: center;
      }
    </style>
  </body>
</html>
```

In the code snippet above, we have used the `star icon` to represent the star rating.

### Bootstrap Flex Box
The flex box is a component that allows you to create a layout that can be easily resized and adjusted.

To change the allignment of the flex box, you can use the `justify-content` property as shown in the snippet below:

```html
<html>
  <head>
    <title>Bootstrap Flex</title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css"/>
  </head>
  <body>
    <div class="container" style=" width: 400px; height: 600px; border: 1px solid; top: 60px; position: absolute; margin-left: 500px;">
      <h6 style="text-align: center;">Example of a Flix</h6>
      <div class="d-flex justify-content-end bg-secondary mb-3">
        <!--flex items aligned at the end -->
        <div class="p-2 my-flex-item">A</div>
        <div class="p-2 my-flex-item">B</div>
        <div class="p-2 my-flex-item">C</div>
        <div class="p-2 my-flex-item">D</div>
      </div>

      <div class="d-flex justify-content-center bg-secondary mb-3">
        <!--  flex items aligned at the center -->
        <div class="p-2 my-flex-item">A</div>
        <div class="p-2 my-flex-item">B</div>
        <div class="p-2 my-flex-item">C</div>
        <div class="p-2 my-flex-item">D</div>
      </div>

      <div class="d-flex justify-content-left bg-secondary mb-3">
        <!--  flex items aligned on the left -->
        <div class="p-2 my-flex-item">A</div>
        <div class="p-2 my-flex-item">B</div>
        <div class="p-2 my-flex-item">C</div>
        <div class="p-2 my-flex-item">D</div>
      </div>

      <div class="d-flex flex-column bg-secondary mb-3 my-flex-container-column">
        <!--  flex items aligned in a column manner -->
        <div class="p-2 my-flex-item">A</div>
        <div class="p-2 my-flex-item">B</div>
        <div class="p-2 my-flex-item">C</div>
        <div class="p-2 my-flex-item">D</div>
      </div>

      <div class="d-flex flex-column flex-column-reverse bg-secondary mb-3 my-flex-container-column">
        <!--  reverse order of the column -->
        <div class="p-2 my-flex-item">A</div>
        <div class="p-2 my-flex-item">B</div>
        <div class="p-2 my-flex-item">C</div>
        <div class="p-2 my-flex-item">D</div>
      </div>
    </div>
  </body>
</html>
```

### Conclusion
Bootstrap can be used to create a better-looking website. It is a very popular framework and it is used by many companies including [Spotify](https://www.spotify.com/us/) and [Twitter](https://twitter.com/?laneng=).

---
Peer Review Contributions by: [Dawe-Daniel](/engineering-education/authors/dawe-daniel/)
