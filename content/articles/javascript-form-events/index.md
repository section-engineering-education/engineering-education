---
layout: engineering-education
status: publish
published: true
url: /javascript-form-events/
title: Getting Started with JavaScript Events
description: This tutorial will walk the reader through the major types of JavaScript events, how to listen to them, and pass them to event handlers.
author: samuel-zabastian
date: 2021-08-17T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/javascript-form-events/hero.png
  alt: Getting started with JavaScript events
---
A JavaScript event is any operation that occurs when a user interacts with a given web page. These events can be used to provide a user with dynamic interaction with a given website. Through JavaScript events, browsing becomes seamless and enjoyable. 
<!--more-->
It's the JavaScript events that are used to make a website interactive. You are probably scrolling smoothly on this page and may click on a link or two because of the underlying JavaScript events used to build this page. So let's take a look at these events and how to use them.

### Goal
In this article, we are going to cover the major types of JavaScript events, how to listen to them, and pass them to event handlers that specify the tasks performed when a given event is handled.

### Prerequisites
This article requires the reader to have a basic understanding of HTML and JavaScript. The code snippets are simple and easy to understand for beginners and web experts as well.

### Project setup
We will create a new folder called `JavaScript events`. In this folder, create a new file called `index.htm` and another JavaScript file called `main.js`. We will use these two files to demonstrate the concept of JavaScript events. Your folder structure should look like this.

```bash
|-- index.html
|-- main.js
|-- main.css
```

### JavaScript event examples
They are many types of events that occur in a webpage, for instance;
- Selecting an element.
- Hovering over a button.
- Usin a keyboard to scroll.
- Resizing or close a browser window.
- Loading a new webpage.
- Submitting a form after filling in details.
- Playing an audio or video file.

### Event handlers
For each of the events mentioned above, there is usually an event handler, which is a code snippet created by a programmer to run when the event fires. Event handlers listen for events fired from the front end and handle them on the back end.

### Types of JavaScript events
JavaScript events used on a web page can be classified as below.

#### 1. Mouse events
This kind of event occurs when a user interacts with our web page using pointing devices such as a mouse or a trackpad. The common mouse events include a `single-click`, `double click`, `mouse up`, and `mouse down`. 

An example of a mouse event is clicking a button, hovering over an HTML element, or dragging an element over a webpage. 

- MouseClick Events. These kinds of events occur when a mouse clicks an element. The code snippets below demonstrate how to use `mouseClick()` event. 

In your `index.html` file, add the snippets below:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <title>JavaScript Events</title>
</head>
<body>
    <!-- container -->
    <div class="container">
        <!-- heading -->
        <h1>Section Engineering Education</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis officiis numquam, 
            cum necessitatibus, reprehenderit tempora pariatur ab maiores aut deleniti, 
            a voluptas sed minus inventore quod ipsam dolores velit animi.
        </p>
    </div>
    <button id="button">Click me</button>
       <!-- close container -->
    <script src="main.js"></script>
</body>
</html>
```

- A mouse click event is handled by the `onClick` event handler. We will use the event handler to show the user that the button was clicked as below:

```js
/**
 * Getting the button id
 */
const button = document.getElementById("button");

/**
 * Adding the event Listener
 */
button.addEventListener('click', handleClickEvent)

/**
 * FUnction triggered when the button is clicked
 */
function handleClickEvent(){
    alert("The button was clicked!")
}
```

- Mouseover events. These events are fired when a mouse cursor moves over an element. 

For instance, we could hover the mouse over the button to change the page themes using the snippets below:

```js
/**
 * mouseover event
 */
button.addEventListener('mouseover', () =>{
    document.documentElement.setAttribute("data-theme", "light")
})


```
- Mouseout events. These kinds of events are fired when the mouse cursor is removed away from an HTML element. Just as we used the `mouseover` event, to change the background of the page, we could use the `mouseout` event to return the initial theme using the snippets below:


```js
/**
 * Mouseout event
 */
button.addEventListener('mouseout', () =>{
    document.documentElement.setAttribute("data-theme", "dark")
})
```

- Mousedown and Mouseup event. Mousedown is a kind of event that gets fired when the mouse is pressed over an element. 
`Mouseup` is exactly the opposite of `mousedown`. It gets fired when you release the mouse button. 

The snippets below demonstrate how `mouseup` and `mousedown` events operate.

> Remember to comment on the other functions when testing these two mouse events, as we are using the same files and elements.

```js
/**
 * Mousedown event
 */
button.addEventListener('mousedown', () =>{
    document.documentElement.setAttribute("data-theme", "dark")
})

/**
 * Mouseup event
 */
button.addEventListener('mouseup', () =>{
    document.documentElement.setAttribute("data-theme", "dark")
})
```

#### 2. Keyboard events
Keyboard events occur when a key on the keyboard is pressed. These kinds of events belong to the keyboard event object. 
Just as discussed [here](/engineering-education/keyboard-events-in-javascript/), there are three different types of keyboard events in JavaScript, namely `keydown events`, `keypress events`, and `keyup events.`

These events occur when the key is pressed down, when any alphanumeric key is pressed and when a key is pressed up respectively. Every button on the keyboard has a name and a value, which can be demonstrated by the code snippet below:

```js
/**
 * Keydwon event
 */
document.addEventListener('keydown', (e) => {
    var keyName = e.key;
    var keyCode = e.code;
    alert(`Key pressed ${keyName} \r\n Key code value: ${keyCode}`);
}, false);

/**
 * Keyup
 */
document.addEventListener('keydown', (e) => {
    var keyName = e.key;
    var keyCode = e.code;
    alert(`Key pressed ${keyName} and  Key code value: ${keyCode}`);
}, false);

/**
 * Keypress event
 */
document.addEventListener('keypress', (e) => {
    var keyName = e.key;
    var keyCode = e.code;
    alert(`Key pressed ${keyName} and  Key code value: ${keyCode}`);
}, false);
```

#### 3. Window events
A window represents the interface onto which a website script runs. For example, the browser screen on a mobile phone, PC, or MacBook. Several events can be triggered on a browser window. 

Here are a few examples of window events.

- Onload window event. This event is usually fired when a page is just about to finish loading, all assets, and scripts on the website. Most developers use this event to call other functions that are dependent on the elements of the window. So you have to wait until the window loads to call the function.

- Onresize window event. This event is called when the size of the browser changes. The browser may be resized by enlarging or reducing the size it covers on the screen.

- OnUnload window event. This usually occurs when the browser window is closed, therefore all other components get unloaded from it.

- Onerror window event. This event is fired when an error occurs during the loading of the window.

#### 4. Form events
Form events occur when you work with forms. Usually, a form event occurs when you open, close, hover or submit form data to the backend of an application.

Below is a list of form events and their event handlers.

- Submit form event. This event is triggered when a user submits form data. Usually, form data is submitted after all the fields are filled.

```js
/**
 * Handling submit. WE first fetch the form and the submit button
 */
const form = document.getElementById('form');
const submitButton = document.getElementById('form-btn');
form.addEventListener('submit', () =>{
    alert("The from was succesfully submitted")
});
```

- Focus form event. This event usually happens when you focus on a specific element on the form.
```js
**
 * Handling focus event to change the text to upper 
 * case
 */
let btn = document.getElementById('button')

/**
 * pass the function to the onfocus event
 */
btn.onfocus = containerFocusFunction;

/**
 * Function to handle the focus event
 */
function containerFocusFunction(){
    document.documentElement.setAttribute("case", "upper")
    btn.innerHTML =" FOCUS FUNCTION ACTIVATED"
}
```

- On blur form event. This event is the opposite of the `onfocus`. It is triggered when you remove focus away from a given element.

```js
/**
 * Handling focus event to change the text to lowercase
 */
let btn = document.getElementById('button')

/**
 * pass the function to the blur event
 */
btn.onblur = containerBlurFunction;
 
/**
 * Function to handle the blur event
 */
function containerBlurFunction(){
    document.documentElement.setAttribute("case", "lower")
    btn.innerHTML =" FOCUS FUNCTION DE-ACTIVATED"
 }
}
```

The CSS code for the uppercase and lower case transformation is below:

```css
/* code for uppercase */
html[case = 'upper']{
    text-transform: uppercase;
}

/* code for lowercase */
html[lower='lower']{
    text-transform: lowercase;
}
```

- Change form event. This form event will be fired when the user changes the value of a form element. A change in value could be deleting entered data or changing a select option value. 

Let us demonstrate this by printing the user input as soon as the input field has a value.

```js

 /**
 * Handling form change event
 */

let text = document.getElementById('text')
let result = document.getElementById('result')
/**
 * Adding the event listener
 */
text.addEventListener('change', (e) =>{
    result.innerHTML = e.target.value
});
```

### Conclusion
Events in JavaScript make browsing very comfortable, besides their usefulness to programmers. Every programmer must have a clear understanding of JavaScript events for more intuitive browsing. 

As discussed above, there are various JavaScript events, and how they are all useful in different contexts, varying from mouse, keyboard, form, and window events. Getting familiar with these concepts enables developers to use JavaScript to make event better websites.

You can try the code snippets [here](https://replit.com/@bastian-zab/form-events#index.html).

Happy coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
