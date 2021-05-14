---
layout: engineering-education
status: publish
published: true
url: /custom-scroll-bar/
title: How to Implement a Custom Scrollbar on a Web Page using CSS
description: In this tutorial, we will learn how to build a web page and use CSS to customize scrollbars on modern browsers. CSS is a fundamental language for any front-end developer as its among the core styling languages.
author: wilson-gichuhi
date: 2021-02-25T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/custom-scroll-bar/hero.jpg
    alt: Implement a custom scrollbar on a web page using CSS
---
CSS is the language we use to improve the look and feel of web pages in our applications. With the current CSS scrollbar specification from [W3C](https://www.w3.org/TR/2018/WD-css-scrollbars-1-20180925), we can now customize the appearance of the scrollbar using CSS.
<!--more-->
In this tutorial, we will learn how to build a web page and use CSS to customize scrollbars on modern browsers.

### Prerequisites
- To write the code, you will need a code editor installed on your system, preferably [VS Code](https://code.visualstudio.com/download).
- To view the web page, you will require a web browser such as [Google Chrome](https://www.google.com/chrome/).
- We will need a basic understanding of [HTML](https://www.w3schools.com/html/html_intro.asp) and [CSS](https://www.w3schools.com/css/default.asp).

### Objectives
By the end end of this tutorial, you will:

- Understand the browser scrollbar and various available CSS properties available for customization.
- Get an introduction to CSS pseudo-elements. We will focus mostly on the `::-webkit-scrollbar` pseudo-element.
- Be able to implement a customized scrollbar on your web page using CSS.
- Understand how we can target more browser support of this specification.

### The browser scrollbar CSS properties
CSS has support for various properties that allow us to have control over the way the application scrollbar will look. 

The following are the available selectors for scrollbar customization include:
- The `::-webkit-scrollbar` will represent the entire scrollbar.
- `::-webkit-scrollbar-button` is the buttons on the scrollbar. The arrows that point upwards and downwards.
- The `::-webkit-scrollbar-thumb` is a draggable handle to make scrolls.
- `::-webkit-scrollbar-track` is the track or the progress bar.
- `::-webkit-scrollbar-track-piece` represents the track that will not be covered by the handle when scrolling.
- `::-webkit-scrollbar-corner` is the bottom corner of the scrollbar, this is where both horizontal and vertical scrollbars meet.
- `::-webkit-resizer` is the draggable resizing handle that will appear at the bottom corner of the elements.

These are common properties in a -webkit vendor prefix. There exist various jQuery plugins that will extend or polyfill this functionality to other legacy browsers. A common plugin used is [jScrollPane](http://jscrollpane.kelvinluck.com/).

### Targeting more browser support
To build scrollbar customized styles, it is a good practice to target more support for this feature. This is where we need to write CSS code that targets support for both `-webkit-scrollbar` and CSS Scrollbars specifications from W3C.

This is an example that uses the properties of a scrollbar namely `scrollbar-width`, `scrollbar-color`, `::-webkit-scrollbar`, `::-webkit-scrollbar-track` and `::webkit-scrollbar-thumb`:

```CSS
/* This will work on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

/* Targtes on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: orange;
}

*::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
  border: 3px solid orange;
}
```

> A side note: WebKit browsers will ignore some of the rules that are not recognized and make a fallback to apply the `-webkit-scrollbar` rules. For example, Firefox browsers will ignore rules that they do not recognize and instead use the CSS Scrollbars specifications.

### Building a web page and implementing a customized scrollbar
In this section, we will build a landing page and implement the CSS code to customize the scrollbar. Let's create a folder for our project named `landing-page`. 

Inside this folder, we will create another folder and name it `images` that will contain an image for our showcase section. At the root of our `landing-page`, we have two files, the`index.html`and`styles.css`.

Let's design this application in the following steps:
1. Write the code for our HTML file for the web page structure.

2. Add the CSS stylesheet for the application layout design and scrollbar customization.

### The HTML
```HTML
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coding Websited</title>
    <link rel="stylesheet" href="design.css">
</head>
<body>
    <nav>
        <h1>CODING COMMUNITY</h1>
        <input type="search" name="search" id="search" placeholder="Search bar" />
        <div class="links">
            <button>
                <a href="#">Login</a>
            </button>
            <button>
                <a href="#">Register</a>
            </button>
            <button>
                <a href="#">About</a>
            </button>
        </div>
    </nav>
    <main>
        <img src="./images/gh.jpg" alt="">
    </main>

    <h1>Technologies Covered</h1>
    <section class="grid-container">

        <div>
            <img src="./images/download.png" alt="">
            This is the de-facto language for web development.
            JavaScript is a multi-paradigm language. Most popular Frameworks include React, Vue, Angular and Svelte.
            On the backend, the Node.js JavaScript runtime alongside the Express framework is the most popular.
        </div>
        <div>
            <img src="./images/1200px-Python-logo-notext.svg.png" alt="">
            Python is popular and powerful general purpose programming. From every stack
            web development, machine learning, data science, python growth is constant.

        </div>
        <div>
            <img src="./images/kotlin_250x250.png" alt="">
            The new Android king is a growing language in the JVM ecosystem. Kotlin was developed by JetBrains and was meant to be interoperable with Java. Nowadays, the support for backend development is rising.
        </div>
    </section>

    <footer>
        &copy; 2020. All rights reserved.
    </footer>
</body>
</html>

```

The code walkthrough:
- The link tag `<link rel="stylesheet" href="design.css">` is pointing to our external stylesheet named `design.css`. It is in the same root path as the HTML file.

- The navbar will contain the `h1`, a search input, and buttons.

- The main is the showcase having an image from our images folder. All images used should be in this folder.

- The `<section>` with a class `container` with three `<div>` tags displayed using a flexbox. Each div is a card with an image and a description.

### Adding the CSS to our application
To improve the look of HTML, we will use the CSS stylesheet.

The entire code for our web page style:

```CSS
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    font-family: monospace,sans-serif;
    background-repeat: no-repeat;
    position: relative;
    max-width: 100vw;
    max-height: 100vh;
}
img{
    width: 100%;
}
::-webkit-scrollbar{
    width: 10px;
}
::-webkit-scrollbar-track{
    background-color: rgb(0, 0, 0);
    border-radius: 5px;
}
::-webkit-scrollbar-thumb{
    background: linear-gradient(transparent, #30ff00);
    border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover{
    background: linear-gradient(transparent, #00c6ff);
}
main{
    background-attachment: fixed;
}
button{
    background-color: rgb(26, 85, 248);
    border:none;
    padding: 6px 8px;
}
nav{
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(24, 24, 24);
    color: white;
    padding: 1.4rem;
}
nav h1{
    color: coral;
    font-size: 2.5rem;
}
nav input{
    padding: 0.8rem 5rem;
}
nav input::placeholder{
    font-size: 1rem;
    color:rgb(26, 85, 248);
}

a{
    color: white;
    padding: 5px;
    font-size: 1rem;
    text-decoration: none;
}
h1{
    text-align: center;
}
.container{
    display: flex;
}
.container img{
    width: 100px;
    height: 100px;
}
.container div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
footer{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(24, 24, 24);
    color: white;
    padding: 1.4rem;
}
```

The CSS code:
- The image in the `<main>` tag is our showcase with a width of 100%. This makes it occupy the entire width of the viewport.

- The navbar is styled using flexbox. The `display: flex` property will make it a flexbox (flexible container). By default, it will be displayed horizontally. To add space in between, the `justify-content: space-between` is used.

- To style the container element, we are using CSS flexbox to display the elements horizontally.

- For our scrollbar, we will be using the `-webkit` vendor prefix. This feature utilizes the CSS pseudo-elements. A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element.

### Final application
The scrollbar will have a background color of `linear-gradient(transparent, #00c6ff);` when in the hover state.

![the application on hover](/engineering-education/custom-scroll-bar/img_1.png)

![the application photo](/engineering-education/custom-scroll-bar/img_2.png)

That is our final application that implements the scrollbar feature. The [Mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars) documentation is an awesome resource to reference and check on the current browser support.

You can check the live application on [netlify](https://scrollbar-site.netlify.app/).

### Conclusion
CSS is a fundamental language for any front-end developer as its among the core styling languages. The language is among the quickest to get started with but one of the hardest to master. 

This article covered topics on how to use CSS to style scrollbars by building a simple yet practical web page that translates to an even better-looking user interface. 

I hope you find this tutorial useful.

Happy coding.

---
Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
