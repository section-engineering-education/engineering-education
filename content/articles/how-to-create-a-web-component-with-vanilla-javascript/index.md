---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-web-component-with-vanilla-javascript/
title: Creating a web Component With Vanilla JavaScript
description: This article will walk the user through understanding web components and how one can create a web component using vanilla javascript.
author: wangui-leah
date: 2021-09-20T00:00:00-00:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url:  /engineering-education/how-to-create-a-web-component-with-vanilla-javascript/hero.jpg
    alt: Vanilla Javascript web Component image
---
Web application development is a pretty crowded field of technology. There are different types of frameworks, libraries, and tools. While developing web apps, the main objective is delivering high-quality user interfaces (UI) with encapsulated components. 
<!--more-->
Therefore, when you use frameworks like React, Vue, Angular, or any other front-end framework, you break everything in your UI up into components. However, we can do something similar without even using a framework or a library, and that's plain JavaScript (Vanilla JavaScript).

This article will talk about what web components are and why they are helpful. Finally, it will take you through how to create a web component from scratch.

### Table of contents
- [What are web components](#what-are-web-components)
- [Why use web components](#why-use-web-components)
- [Creating a web component with Vanilla JavaScript](#creating-a-web-component-with-vanilla-javascript)
  - [Create the template](#create-the-template)
  - [Load the template with content](#load-the-template-with-content)
  - [Create the HTML element](#create-the-html-element)
  - [Encapsulate the HTML element](#encapsulate-the-html-element)
  - [Lifecycle methods](#lifecycle-methods)
  - [Creating custom elements](#creating-custom-elements)
- [Conclusion](#conslusion)
- [References](#references)


### Prerequisites
Web components are a fantastic and interactive guide. Therefore a good understanding of HTML, CSS, and JavaScript is needed. 

### What are web components 
[Web components](https://www.webcomponents.org/introduction) are sets of specifications that add functionalities and features to web pages and applications. For example, they allow reusability and encapsulation of  HTML elements.

The web components enable you to build functions that can be reused on a different web platform, application, or page.

Web components consist of three leading technologies to create custom elements that can be reused when you like. They include:

- **Custom elements:** these APIs allow you to define and create custom elements to provide the desired UI.
- **Shadow DOM:** APIs that enable encapsulation. Specific elements are separated from your main DOM, thus preventing issues such as document collision.
- **HTML templates:** elements that allow you to declare fragments of markup templates that are not displayed on the page. These elements are used as a template to reuse in multiple places.

Web browsers including chrome, firefox, and edge offer support for web components. That means technologies, i.e. (Custom Elements, Shadow DOM, and HTML templates) are supported fully.

This image from [webcomponents.org](https://www.webcomponents.org/) shows the current web components browser support.

![Browser support](/engineering-education/how-to-create-a-web-component-with-vanilla-javascript/browser-support.jpg)

### Why use web components
Code reusability has proven to be useful, and before the initiation of web components,  it was not easy to implement a reusable user interface that works across diverse frameworks and projects.

Web Components allow web developers to build reusable UI's using built-in web APIs. This means we can create a web component for one project and carry it to another with no additional coding.

### Creating a web component with vanilla JavaScript
This tutorial creates a web component with [Vanilla JavaScript](https://snipcart.com/blog/learn-vanilla-javascript-before-using-js-frameworks#:~:text=What%20is%20%22Vanilla%20JavaScript%22%3F&text=%22VanillaJS%20is%20a%20name%20to,need%20for%20additional%20JavaScript%20libraries.%22) or without the help of any framework or libraries.

We are going to create an employee card web component. It will contain a user image, name, id, job title, phone, and email. Below is the user image we will use:

![User Image](/engineering-education/how-to-create-a-web-component-with-vanilla-javascript/image.png)

We will begin by creating an `index.html` and `employee-card.js` files. Then copy and paste this code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Web Components</title>
    <style>
      h2{
        color: purple;
      }
    </style>
  
</head>
<body>
    <h2>Employee Card Example</h2>
    <employee-card name="Leah Crystal" avatar=image.png></employee-card>
    <div slot="id"><b>ID:</b> 238</div>
    <div slot="job title"><b>Job Title:</b> Database Administrator</div>
    <div slot="email"><b>Email:</b> lcrystal34@gmail.com</div>
    <div slot="phone"><b>Phone:</b> 292-856-410</div>

     <!-- scripts -->
  <script src="employee-card.js"></script> 
    
</body>
</html>
```

To create an employee card web component, create a `.js` file. Let us name it `employee-card.js` copy and paste this code there:

```JavaScript
const template = document.createElement('template');
template.innerHTML = `
<style>
<style>
  .employee-card {
    font-family: sans-serif;
    background: #f4f6f7;
    width: 250px;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 10px;
  }

</style>
<div class="employee-card">
  <img/>
  <div>
    <h3></h3>
    <div class="details">
      <p><slot name="id"/></p>
      <p><slot name="job title"/></p>
      <p><slot name="email"/></p>
      <p><slot name="phone"/></p>
    </div>
  </div>
</div>`;

class EmployeeCard extends HTMLElement{
 constructor(){
     super();
     this.attachShadow({ mode: 'open'});
     this.shadowRoot.appendChild(template.content.cloneNode(true));
     this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
     this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');   
 } 

 connectedCallback(){
   this.h3 = this.getAttribute("name")
   this.render();
 }

 render(){
   this.h3;
 }
}
window.customElements.define('employee-card', EmployeeCard);
```

The code above shows how to create an employee card web component, so let us understand each part step by step.

#### Create the template
```JavaScript
const template = document.createElement('template');
```

The first step is creating an HTML content template element `<template>`. The `<template>` element holds HTML that is not rendered immediately after running a page. 

#### Load the template with content
```JavaScript
template.innerHTML = `
<style>
<style>
  .employee-card {
    font-family: sans-serif;
    background: #f4f6f7;
    width: 250px;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 10px;
  }

</style>
<div class="employee-card">
  <img/>
  <div>
    <h3></h3>
    <div class="details">
      <p><slot name="id"/></p>
      <p><slot name="job title"/></p>
      <p><slot name="email"/></p>
      <p><slot name="phone"/></p>
    </div>
  </div>
</div>
`;
```

The template element is stored in a `template` variable and linked with `inner HTML` properties. The `innerHTML` property sets the HTML content on the element. Therefore, we can add the HTML we want to display on the screen, such as `<div>`, `<p>`, and more HTML elements.

#### Create the HTML element
```JavaScript
class EmployeeCard extends HTMLElement{}
```

We create a class `EmployeeCard` that extends the HTMLElement class. The HTMLElement represents all the HTML elements.

#### Encapsulate the HTML element
```JavaScript
constructor(){
     super();
     this.attachShadow({ mode: 'open'});
     this.shadowRoot.appendChild(template.content.cloneNode(true));
     this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
     this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');   
 } 
```

We have an empty class. Next, we create a constructor and call the base class `super()` method to inherit the features of a class. 

A shadow DOM is created, i.e, `this.attachShadow({ mode: 'open'})` and becomes the encapsulated part of our web component. It keeps our component's behaviour independent and from the rest of the Html. 

You can have your shadow DOM mode closed or open. This means whether you can access shadow DOM via JavaScript in your components.

Web Components enable us to use shadow DOM, a feature built into the browser. So if child elements are added to a shadow DOM of a component, they are wrapped inside a shadow root.

```JavaScript
this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
this.shadowRoot.querySelector('img').src = this.getAttribute('avatar')
```
The web component API then gets attributes name and avatar to be displayed on the page.

#### Lifecycle methods
```JavaScript
connectedCallback(){
   this.h3 = this.getAttribute("name")
   this.render();
 }

 render(){
   this.h3;
 }
```

There are four callback methods defined inside the custom elements. They enable the code to run when events occur in an element.

Let us take a look at some of the callback methods:
- `connectedCallback:` is called when the component is inserted into an HTML document's DOM.
- `disconnectedCallback:` is called when the element is removed from the document's DOM.
- `adoptedCallback:` is called when the component is moved to another HTML document.
- `attributeChangedCallback:` is when the attributes of the component are changed.

#### Creating custom elements
```JavaScript
window.customElements.define('employee-card', EmployeeCard);
```

Our web component has been created, but there is one more step remaining: creating custom elements. We use the JavaScript class `EmployeeCard` while creating the custom elements. Whereby the class inherits the properties of `HTML Element`.

Finally, to test if we created an employee card web component, open the `index.html` file using a browser. The output is as shown below:

![Employee card web component](/engineering-education/how-to-create-a-web-component-with-vanilla-javascript/employee-card.jpg)

### Conclusion
With this tutorial, you have learned how to build a simple web component with vanilla JavaScript. 

Hopefully, you have understood web components, why they are useful, and how to build one. Furthermore, creating a web component can be achieved using frameworks such as react.js and vue.js. I, therefore, encourage you to keep exploring and experimenting.

Happy Coding!

### References
- https://developer.mozilla.org/en-US/docs/Web/Web_Components
- https://www.webcomponents.org/introduction
 
---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
