---
layout: engineering-education
status: publish
published: true
slug: document-object-model
title: Understanding Document Object Model(DOM)
description: Understanding document object model (DOM) is a structure which acts as the framework of a standard HTML (HyperText Markup Language) DOM is a programming API for HTML and XML documents.
author: kanishkvardhan-a-n
date: 2020-07-30T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/document-object-model/hero.jpg
    alt: computer screen image
---
**A Document Object Model (abbreviated as DOM) is a structure which acts as the framework of a standard HTML (HyperText Markup Language) or DHTML (Dynamic HyperText Markup Language) webscripts.** DOM is basically a structure. A tree is known to have many branches. Likewise, a DOM has many branches and sub-branches which describe various elements of the webpage. Each branch of the tree represents one element. Each element may be referred to as a single node in the DOM structure. If a particular element has one or more attributes in the HTML webpage, then the branch forks into multiple nodes depending on the number of attributes. The formation of nodes is proportional to the number of attributes in the HTML page.
<!--more-->

### STRUCTURE OF DOM
DOM follows a hierarchical tree structure in its representation. The first node in the DOM is Document node. That is because the whole web code for the HTML page is nothing but a document. The `<html>` tag is the root node. All the nodes which are directly attached to the root node are the child nodes.
Let’s take a look at this simple example:
```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title>This text displays the title of the web page</title>
  </head>
  <body>
    <h1>HELLO WORLD</h1>
    <p>The above text will be larger in size</p>
  </body>
</html>
```

This is a simple example of the markup language with a very few basic tags. As you can see, the `<title>` tag is inside the `<head>` tag. The text “This text displays the title of the web page” will be the title of the webpage in the header section. The main content of the webpage is what is inside the `<body>` tag. DOM structure for the above HTML code will be:

![DOM-tree](/engineering-education/document-object-model/DOM1.jpg)

It is quite easy to understand. The `<html>` node or the root element acts as the parent node to `<head>` and `<body>` nodes. The `<head>` and `<body>` nodes act as parent nodes to `<title>` and `<h1>` , `<p>` nodes respectively. In the same way, the hierarchy continues if any more elements or attributes are introduced in the web script.


### USING DOM
Having a DOM helps to make any relevant changes in the webpage without having to change the actual web code or the corresponding HTML page. DOM helps the user to access the tree model. Once the access is granted, the user can make any changes related to the composition, layout, content, or style of the HTML page. DOM is not a language but it is a structural representation of web pages. So, it exemplifies as an Application Programming Interface or API for short. One of the common examples of accessing DOM is through the Inspect Element tool in web browsers. Using the console tool in the inspect element helps us to make relevant temporary changes to the web pages. The changes can be related to HTML and CSS files. For example, by typing `console.log(document.head); ` in the console tool we, can access the `<head>` section of the current HTML page.

Likewise, `console.log(document.body);` helps us to access the `<body>` section. Not only elements or attributes, but we can also retrieve details of the webpage.

Consider this code, `console.log(document.documentURI);` URI stands for Uniform Resource Identifier. DocumentURI feature returns the location of the webpage. To make things simpler, all the pages have the same preset set of strings but differ in their extended hierarchical names.
(For example, http://)

Some more examples of APIs used to manipulate web pages using DOM are:
`document.getElementById(id)`
`document.getElementsByTagName(name)`
`element.innerHTML`
`element.style.left`
`element.setAttribute()`
`element.getAttribute()`
`Document.embeds`
`Document.fonts`
`Document.head`
`Document.hidden`
`document.getElementsByTagName(name)`
`Document.images`

### APPLICATIONS

##### Browsing
- DOM is an easy way to learn how the HTML web pages are interpreted by web browsers. The DOM structure explains how a particular web page is built hierarchically.

##### Manipulation
- By using DOM, one can utilize the prewritten HTML codes to study them. Those codes can be changed temporarily using any scripting languages. Web pages can be manipulated using scripting languages by changing the values of attributes of DOM elements.

##### GUI
- DOM acts as an interactive API where the user can design his own ideas by inspecting web pages and employing them in their own HTML codes. Different elements can be added or removed.

##### CSS
- CSS or Cascading Style Sheet is a type of markup language which is used to design front end applications. DOM helps the user to know about the styling of a particular webpage. Users can make any temporary changes with respect to the styling of the web page.

##### JavaScript
- JavaScript is a type of scripting language. To make any changes in DOM, JavaScript is used. The web pages can be altered, modified or toggled using JavaScript. Basically, JavaScript is a dynamic scripting language that allows the user to interact with the web page.

### ADDITIONAL RESOURCES
- [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model)
- [Document API's](https://developer.mozilla.org/en-US/docs/Web/API/Document)
