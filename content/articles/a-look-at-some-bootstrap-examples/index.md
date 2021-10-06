---
layout: engineering-education
status: publish
published: true
url: /a-look-at-some-bootstrap-examples/
title: Getting Started with Bootstrap
description: This article will cover Bootstrap, which is a popular front-end web framework. It has ready-to-use components and design elements for formatting HTML content.
author: erastus-muriithi
date: 2021-10-05T00:00:00-04:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/a-look-at-some-bootstrap-examples/hero.png
    alt: Getting started with Bootstrap cover image
---
Bootstrap is a front-end framework for developing responsive web projects. It has a powerful grid system, flexible media objects, and a powerful color system.
<!--more-->
Mark Otto and Jacob Thornton developed Bootstrap using [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5), [Sass](https://en.wikipedia.org/wiki/Sass_(stylesheet_language)), and [CSS3](https://www.w3.org/TR/2001/WD-css3-roadmap-20010523/).

### Advantages of using Bootstrap:
- It saves time and effort. With Bootstrap, you can focus on writing your content, and the framework will take care of the rest.
- Developers can customize their site using Bootstrap to suit their needs.
- Bootstrap is responsive. It can be used on any device without crashing.
- Bootstrap has a simple grid system for developing responsive websites.

### Prerequisites
To follow along with this tutorial, you need to have the following:
- Basic knowledge of [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) and [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS).
- An IDE installed, preferably [Visual Studio Code](https://code.visualstudio.com/). 

### Getting started
Bootstrap was developed to help speed up the development of responsive websites. Many companies and projects around the world use Bootstrap.

#### Downloading Bootstrap
To use Bootstrap, you need to download its files and add them to your project. In this tutorial, we will install Bootstrap using the `Node Package Manager`. 

To do this, we first need to install [Node.js]((https://nodejs.org/en/) as it has the `npm` package manager. 

Download the latest files based on your operating system and install them. In my case, I am using [Ubuntu](https://ubuntu.com/download/desktop).

After installing, navigate to the folder where you have downloaded the files and run the following command in the terminal:

```bash
npm install bootstrap
```

This command will create a new folder called `node_modules`. The folder contains files required by Bootstrap. These files are:
- `/bootstrap` - It contains the `JS` and `CSS` files. This tutorial will use these files.
- `/.package-lock.json` - This file keeps track of the version of the bootstrap files.
- `/@popperjs` - This folder contains the files required for the `popper.js` library.

#### How to use the Bootstrap files in your project
In the folder containing the installed bootstrap files, create an `index.html` file and add the code snippet below:

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

In the code above, we have imported the `bootstrap file` to our project in the `head` section. Open the `index.html` file in your browser.

If you see the alert box, then you have successfully installed bootstrap. Congratulations!

> We will use the above `index.html` in all examples in this tutorial.

#### 1. Container
In bootstrap, the `container` is the wrapper for the entire section of a page. It is a block element used to contain the page's content. Containers align the content within a device or a viewpoint.

The syntax for containers is as follows:

```html
<div class="container">
  <!-- other code here -->
  <div></div>
</div>
```

#### 2. Rows
Rows are wrappers for the columns. They are used to align the content in the columns. They help structure the grid system, hence, keep everything in order.

The syntax for rows is as follows:

```html
<div class="row"></div>
```

#### 3. Jumbotron
Jumbotron is a particular type of container that allows specific content to stand out. It is a block element, which contains the page's content.

Jumbotron is displayed using a grey box with rounded corners. The font size of the text inside the Jumbotron is also enlarged. You can place the Jumbotron inside or outside a container.

##### Placing the Jumbotron inside the container
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

##### Placing the Jumbotron outside the container
This method will result in the Jumbotron extending the edges of the screen.

To understand this better, place the code snippet below in the `index.html` file and open it in a browser.

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

When the two code snippets are compared, the second one will result in the Jumbotron extending the edges of the screen while the first one will not.

#### 4. Bootstrap collapse
The collapse is a component that allows you to hide and show content. It is a block element and is used to contain the content of a page. 

It helps to give more importance or extra attention to the content. For instance, if you have much content, the navbar might end up taking too much space on mobile devices. Hence, this is where the collapse comes in.

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

In the code snippet above, we have added the `collapse` to the page. When you press on the `Click On Me` button, the `collapse` having `About` and `Contact` menu items will be shown.

#### 5. Bootstrap modal plugin
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

#### 6. Bootstrap progress bar
The progress bar is a component that shows the progress of a task, e.g., the installation of software. The progress is usually represented in a percentage form.

In the `index.html` file, replace the existing snippet with the one below and open the file in a browser:

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

#### 7. Bootstrap media objects
The media object is a component that displays a media object. It displays images, videos, and other media content. They are accompanied by a `right-aligned` or `left-aligned` image and text content.

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

#### 8. Bootstrap star rating
The star rating is a component that allows end-users to rate a product or service. The number of filled stars indicates the number of stars chosen by the user.

Assuming you are asking a user to rate your work and then he clicks on only two stars. The snippet below shows the feedback you would get:

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

In the above example, we have used the `star icon` to represent the star rating.

#### 9. Bootstrap flexbox
The flexbox is a component that allows you to create a layout that can be easily resized and adjusted.

To change the alignment of the flexbox, you can use the `justify-content property as shown in the snippet below:

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

#### 10. Radio buttons
Radio buttons are components that allow end-users to select one option from a set of options. Each radio button contains a label that represents the choice of each radio button. 

Note that a radio button can only be selected once, whereas the checkbox can be selected multiple times.

Below is an example of a radio button snippet:

```html
<html>
  <head>
    <title>Radio Buttons</title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/js/bootstrap.js.map" type="text/css">
  </head>
  <body>
    <div class="container" style=" background-color: grey; width: 400px; height: 200px; border: 1px solid; top: 60px; position: absolute; margin-left: 500px;">
      <div class="form-check">
        <h6 style="text-align: center;">Select your Gender</h6>
        <div >
          <input class="form-check-input" name="inlineRadioOptions" type="radio" value="male" id="inlineRadio1" >
          <label class= "form-check-label"for="inlineRadio1">Male</label>
        </div>
        <div>
          <input class="form-check-input" name="inlineRadioOptions" type="radio" value="female" id="inlineRadio1" >
          <label class= "form-check-label"for="inlineRadio1">Female</label>
        </div>
        <div>
          <input class="form-check-input" name="inlineRadioOptions" type="radio" value="others" id="inlineRadio1" >
          <label class= "form-check-label"for="inlineRadio1">Others</label>
        </div>
      </div>
    </div>
  </body>
</html>
```

Below is an example of a checkbox snippet: Here, you will notice that you can select more than one option unlike in the radio button above.

```html
<html>
  <head>
    <title>check box</title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/js/bootstrap.js.map" type="text/css">
  </head>
  <body>
    <div class="container" style=" background-color: grey; width: 400px; height: 200px; border: 1px solid; top: 60px; position: absolute; margin-left: 500px;">
      <div class="form-check">
        <h6 style="text-align: center;">What type of food do you like?</h6>
        <div >
        <div>
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label for="food"> Pizza</label>
        </div>
        <div>
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label for="spaghet">Spaghet</label>
        </div>
        <div>
          <input type="checkbox" class="form-check-input" id="exampleCheck1" >
          <label for="pilau">Pilau</label>
        </div>
      </div>
    </div>
  </body>
</html>
```

#### 11. Grid system
The Bootstrap grid system is a 12-column system that is used to layout content. It consists of `containers`, `rows`, and `columns`.

- The `container` is the outermost element that is used to contain all other elements.
- The `row` creates a horizontal group of columns.
- The `column` is the innermost element that is used to contain content.

Let's see how the grid system works in a code snippet:

```html
<html>
  <head>
    <title>Grid System</title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/js/bootstrap.js.map" type="text/css">
  </head>
  <body>
    <div class="container" style=" width: 400px; height:350px; border: 1px solid;
     top: 60px; position: absolute; margin-left: 500px;">
      <div class="row">
        <h6 style="text-align: center;">3 equal collums</h6>
        <div class="col-md-4">
          <p>This is the first  columns</p>
        </div>
        <div class="col-md-4">
          <p>This is the second  columns</p>
        </div>
        <div class="col-md-4">
          <p>This is the third  columns</p>
        </div>
      </div>
      <div class="row">
        <h6 style="text-align: center;">2 equal collums</h6>
        <div class="col-md-6">
          <p>This is the first  columns</p>
        </div>
        <div class="col-md-6">
          <p>This is the second  columns</p>
        </div>
      </div>
      <div class="row">
        <h6 style="text-align: center;">3 uequal collums</h6>
        <div class="col-md-4">
          <p>This is the first  columns</p>
        </div>
        <div class="col-md-5">
          <p>This is the second  columns</p>
        </div>
        <div class="col-md-3">
          <p>This is the third  columns</p>
        </div>
      </div>
    </div>
  </body>
</html>
``` 

#### 12. Lists
A list is a series of items grouped in a single `container`. The list can be ordered or unordered.

To create a list, use the `ul/ol` and `li` tags with `.list-group` and `.list-item-group`, respectively.

##### Ordered list
An ordered list is a list that has a numerical index on each item.

```html
<html>
<head>
  <title>List</title>
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css"/>
  <link rel="stylesheet" href="node_modules/bootstrap/dist/js/bootstrap.js.map" type="text/css">
</head>
<body>
  <div class="container">
    <h6>ordered list item</h6>
    <ol class="list-group">
      <li>First list</li>
      <li>Second list</li>
      <li>Third list</li>
    </ol>
    </ul>
  </div>  
</body>
</html> 
```

##### Unordered list
An unordered list does not have a numerical index on each item. They are marked by bullet points in default.
  
```html
<html>
<head>
  <title>List</title>
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css"/>
  <link rel="stylesheet" href="node_modules/bootstrap/dist/js/bootstrap.js.map" type="text/css">
</head>
<body>
  <div class="container">
    <h6>unordered list item</h6>
    <ul class="list-group">
      <li>First list</li>
      <li>Second list</li>
      <li>Third list</li>
    </ul>
    </ul>
  </div>  
</body>
</html>
```

In the code snippet above, we have used the `ol` tag to create an ordered list and the `ul` tag to create an unordered list.

##### List with links
A list can also contain `links` that connect to other pages.

```html
  <html>
  <head>
    <title>List</title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/js/bootstrap.js.map" type="text/css">
  </head>
  <body>
    <div class="container">
      <h6>An ordered list with links</h6>
      <div class="list-group">
        <ol>
          <li><a href="https://www.google.com">Google</a></li> 
          <li><a href="https://www.section.io">Section</a></li>   
        </ol>
      </div>
    </div>
  </body>
</html>
  ```

#### 13. Bootstrap forms
A set of `elements` that allows users to input different data as required by the `form`. 

A simple basic form may contain input fields like `name`, `email`, `password`, `text area`, and `checkbox`.

The snippet below is an example of a bootstrap form:

```html
<html>
  <head>
    <title>Form</title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/js/bootstrap.js.map" type="text/css">
  </head>
  <body>
    <div class="container" style=" width: 400px; height:350px; border: 1px solid;
     top: 60px; position: absolute; margin-left: 500px;">
      <h6>Please fill the form below</h6>
      <div class="form-group">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" name="name" class="form-control" placeholder="Enter Your name" required = "true">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" class="form-control" placeholder="Enter Your email" required = "true">
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" name="subject" class="form-control" placeholder="Enter Your subject" required = "true">
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <input type="text_area" name="message" class="form-control" placeholder="Enter Your message" required = "true">
        </div> <br>
        <div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </body>
</html>
```

#### 14. Bootstrap scrollspy
A set of elements that allow users to scroll to a particular section of the page. It automatically updates the navigation bar to highlight the current section/link. 

The snippet below is an example of a Bootstrap scrollspy:

```html
<html>
<head>
  <title>Bootstrap Scrollspy</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body data-spy="scroll" data-target="#myScrollspy" data-offset="20">
<div class="container">
  <div class="row">
    <nav class="col-sm-3" id="myScrollspy">
      <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#footer">Footer</a></li>
      </ul>
    </nav>
    <div class="col-sm-9">
      <div id="home">    
        <h1>Home Page</h1>
        <p>This is the home page.</p>
      </div>
      <div id="about"> 
        <h1>About</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Nemo optio consequatur, dignissimos necessitatibus magni doloremque 
          tempora in obcaecati sit sint! Perspiciatis quidem, 
          voluptatem suscipit dolorem iure dicta cupiditate aut saepe?</p>
      </div>        
      <div id="services">         
        <h1>Services</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Nemo optio consequatur, dignissimos necessitatibus magni doloremque 
          tempora in obcaecati sit sint! Perspiciatis quidem, 
          voluptatem suscipit dolorem iure dicta cupiditate aut saepe?</p>
      </div>
      <div id="contact">         
        <h1>Contact</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Nemo optio consequatur, dignissimos necessitatibus magni doloremque 
          tempora in obcaecati sit sint! Perspiciatis quidem, 
          voluptatem suscipit dolorem iure dicta cupiditate aut saepe?</p>
      </div>
      <div id="blog">         
        <h1>Blog</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Nemo optio consequatur, dignissimos necessitatibus magni doloremque 
          tempora in obcaecati sit sint! Perspiciatis quidem, 
          voluptatem suscipit dolorem iure dicta cupiditate aut saepe?</p>
      </div>
      <div id="footer">         
        <h1>Footer</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Nemo optio consequatur, dignissimos necessitatibus magni doloremque 
          tempora in obcaecati sit sint! Perspiciatis quidem, 
          voluptatem suscipit dolorem iure dicta cupiditate aut saepe?</p>
      </div>
    </div>
  </div>
</div>
</body>
</html>
```

Let's add some styles to the scroll spy:

```css
<style>
  body {
    position: relative;
  }
  ul.nav-pills {
    top: 20px;
    position: fixed;
  }
  div.col-sm-9 div {
    height: 250px;
    font-size: 28px;
  }
  #home {background-color: blue;}
  #about {background-color: purple;}
  #footer {background-color: red;}
 #services {background-color: gray;}
  #blog {background-color: brown;}
  #contact {background-color: black;}
  </style>
```

### Conclusion
Bootstrap can be used to create highly appealing websites. It is a popular framework, and many companies, including [Spotify](https://www.spotify.com/us/) and [Twitter](https://twitter.com/?laneng=), use it.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
