---
layout: engineering-education
status: publish
published: true
url: /genie-slide-in-jelly-and-scale-pop-up-notification-effects/
title: Genie Slide-in Jelly and Scale Pop-up Notificaiton Effects
description: In this article we will go over how to implement genie, slide-in, jelly and scale pop-up notification effects for a website. We will build effects that are dependent on the type of information being displayed.
author: prosper-grateful-juma
date: 2021-11-05T00:00:00-11:13
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/hero.png
    alt: Genie Slide-in Scale Pop-up Notifications
---
Websites need notifications to display urgent or additional information. Pop-ups are used to pass notifications, they are
efficient if used effectively and at the right time. Notification effects, depending on the main website theme, bring a
website's unique taste and signature look.
<!--more-->
In this article, you will learn how to apply some of these notification effects, including the Genie, Slide-in, Jelly,
and scale Pop-up notification effects. 

You will learn how to build eye-catching effects and appreciate that these effects are dependent on the type of information being displayed.

### Table of contents
- [Key takeaways](#key-takeaways)
- [Prerequisites](#prerequisites)
- [Project folder structure](#project-folder-structure)
- [Overall webpage structure](#overall-webpage-structure)
- [Add styling the webpage](#add-styling-the-webpage)
- [Add a notification to the window](#add-a-notification-to-the-window)
- [Create functions to search for the classes in the HTML file](#create-functions-to-search-for-the-classes-in-the-html-file)
- [Modify the HTML file to add the notification](#modify-the-html-file-to-add-the-notification)
- [Use a minified modernizr file for animations](#use-a-minified-modernizr-file-for-animations)
- [Format the notification](#format-the-notification)
- [Add the growl effect to the notification](#add-the-growl-effect-to-the-notification)
- [Normalize the webpages](#normalize-the-webpages)
- [Conclusion](#conclusion)

### Key takeaways
By the end of this article, you will learn how to apply the following notification effects to a webpage:
- Slide-in effect
- Genie effect
- Scale growth effect
- Jelly pop-up effect

You will also get to know some notification effects which we can use on your webpage and when to use them.

### Prerequisites
For you to follow along with this article, you'll need to know/have the following:
- Understanding of the basics of HTML. Know-how on creating web pages and linking other files to them.
- Good use of CSS.
- Interactions with JavaScript.
- Web development IDE. It should support webpage preview capabilities. These will be helpful during the development process. I recommend Visual Studio Code IDE. You can download it from [here](https://code.visualstudio.com/).

### Project folder structure
Create a root folder named `Notifications`. All the project code will lie here. 

The root folder structure will be as shown below:

```bash
.
├── css (folder)
│   ├── demonstration.css (file)
│   ├── normalization.css (file)
│   ├── default_notification.css (file)
│   └── growl-notification-style.css (file)
├── js (folder)
│   ├── classEditor.js (file)
│   ├── modernizr.custom.js (file)
│   └── notificationFunction.js (file)
├── growl-effects-genie.html (file)
├── growl-effects-jelly.html (file)
├── growl-effects-scale.html (file)
└── growl-effects-slide-in.html (file)
```

### Overall webpage structure
In the `growl-effects-scale.html`, add the following snippet:

```html
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8"/>
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta content="IE=edge" http-equiv="X-UA-Compatible">
  <title>Notification Styles | Growl-Style</title>
  <link href="css/normalization.css" rel="stylesheet" type="text/css"/>
  <link href="css/default_notification.css" rel="stylesheet" type="text/css"/>
  <script src="js/modernizr.custom.js"></script>
  <link href="css/growl-notification-style.css" rel="stylesheet" type="text/css"/>
  <link href="css/demonstration.css" rel="stylesheet" type="text/css"/>

</head>

<body>
<div class="main-container">
  <!-- Top Navigation -->

  <header class="notifications-header">
    <h1>Notification Styles
      <span>Simple, easy and effective ideas &amp; animation effects for website notifications</span>
    </h1>
  </header>
  <div class="main clear-fixes">
    <div class="column">
      <p class="small-text">Click this button to show a notification:</p>
      <button class="progress-button" id="notification-trigger">
        <span class="content">Show a Notification</span>
        <!--Addition of an empty span-->
        <span class="progress">
                    <!--No content-->
                </span>
      </button>
    </div>
    <div class="column">
      <nav class="notifications-demos">
        <h3>Growl-like: </h3>
        <div>
          <a class="current-demo" href="growl-effects-scale.html">Scale</a>
          <a href="growl-effects-jelly.html">Jelly</a>
          <a href="growl-effects-slide-in.html">Slide in</a>
          <a href="growl-effects-genie.html">Genie</a>
        </div>
      </nav>
    </div>
  </div>
</div>
<!-- /main-container -->
<script src="js/classEditor.js"></script>
<script src="js/notificationFunction.js"></script>



</body>

</html>
```

![Webpage Framework](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/webpage-framework.png)

Copy-paste the code above in the `growl-effects-genie.html` file. Repeat the step in `growl-effects-jelly.html`
and `growl-effects-slide-in.html` files.

Modify the class of the current page in the above files so that it will show that it is on that page. 

This is shown below:

In the `growl-effects-genie.html`:

```html

<div>
  <a href="growl-effects-scale.html">Scale</a>
  <a href="growl-effects-jelly.html">Jelly</a>
  <a href="growl-effects-slide-in.html">Slide in</a>
  <!-- Show that it is currently active -->
  <!-- This is by adding the 'current-demo' class referenced in the CSS-->
  <a class="current-demo" href="growl-effects-genie.html">Genie</a>
</div>
```

Repeat this for the other two files to get the code below for:

- `growl-effects-jelly.html`:

```html

<div>
  <a href="growl-effects-scale.html">Scale</a>
  <a class="current-demo" href="growl-effects-jelly.html">Jelly</a>
  <a href="growl-effects-slide-in.html">Slide in</a>
  <a href="growl-effects-genie.html">Genie</a>
</div>
```

- `growl-effects-slide-in.html`:

```html

<div>
  <a href="growl-effects-scale.html">Scale</a>
  <a href="growl-effects-jelly.html">Jelly</a>
  <a class="current-demo" href="growl-effects-slide-in.html">Slide in</a>
  <a href="growl-effects-genie.html">Genie</a>
</div>
```

### Add styling the webpage
In the `demonstration.css` file,

Create color templates to easily choose from for the page:

```css
/* You can choose colors quickly from the color templates below*/

:root {
  --white: #fff;
  --black: #00000099;
  --medium-black: #00000033;
  --shadow-black: #00000019;
  --light-black: #333;
  --light-blue: #97d2f1;
  --bright-blue: #6cc1ed;
  --sky-blue: #5699bc;
  --dark-blue: #00a2d3;
  --navy-blue: #729DBF;
  --deep-dark-blue: #415F76CC;
  --light-green: #67c58f;
  --light-green-shadow: #0000000C;
  --medium-green: #72BF7B;
  --forest-green: #1f8a4c;
  --hill-green: #1c2e2d;
  --blue-green: #0eada0;
  --green-blue: #00cfbe;
  --indigo: #415f76;
  --light-purple: #7772bf;
  --purple: #484860;
  --light-yellow: #B3BF72;
  --light-orange: #BFA372;
}
```

Use `border-box` for all elements before and after. Set clear_fix class styling both before and after.

```css
/*All*/
*, /*All elements after*/
*:after, /*All elements before*/
*:before {
  /*These two set how the overall width and height is calculated*/
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.clear-fixes:after,
.clear-fixes:before {
  /*No content*/
  content: '';
  display: table;
}

.clear-fixes:after {
  clear: both;
}
```

Format the `html` and `body` elements:

```css
html,
body {
  height: 100vh;
  width: 100vw;
}

body {
  /*body formatting*/
  background: var(--bright-blue);
  font-weight: 400;
  font-size: 1em;
  font-family: 'Raleway', Calibri, Arial, sans-serif;
  line-height: 1.25;
  z-index: 1;
  color: #f5f3ec;
  position: relative;
}
```

Style the links, buttons, and container elements:

```css
button, a {
  /*No outline*/
  outline: none;
}

a {
  /*No text-decoration*/
  text-decoration: none;
  color: #0000007F;
}

a:focus, a:hover {
  color: var(--white);
}

.main-container {
  min-height: 100vh;
}
```

Format the header and the header span:

```css
/* Header */

.notifications-header {
  padding: 0 2em 0;
  margin: 0 auto;
  /*Align the text to the center*/
  text-align: center;
}

.notifications-header h1 {
  line-height: 1.3;
  margin: 0;
  font-size: 3.5em;
}

.notifications-header h1 span {
  font-weight: 300;
  display: block;
  font-size: 46%;
  opacity: 0.7;
  padding: 0.4em 0 0.6em 0.1em;
}
```

Format the buttons which enable you to access the other web pages:

```css
/* To Navigation Style */

/* Demo Buttons Style */

.notifications-demos {
  font-size: 0.8em;
  padding-top: 1em;
}

.notifications-demos div {
  padding-bottom: 1em;
  margin-left: 90px;
}

.notifications-demos a {
  padding: 0.35em 0.9em 0.35em;
  margin: 0.35em 0.1em;
  display: inline-block;
  outline: none;
  color: var(--white);
  background: rgba(255, 255, 255, 0.3);
  font-weight: 700;
  font-size: 110%;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 2px;
}

.notifications-demos a.current-demo, .notifications-demos a:hover {
  background: rgba(0, 0, 0, 0.2);
  border-color: initial;
  color: inherit;
}

.notifications-demos h3 {
  padding: 1em 0 0.5em 0;
  margin: 0;
  min-width: 90px;
  font-size: 0.9em;
  clear: left;
  float: left;
}
```

Format the content in the main content and the columns:

```css
/* Main content */

/* Main */

.main-container {
  padding: 3% 0 10%;
  max-width: 69em;
  margin: 0 auto;
}

/* Column */

.column {
  padding: 0 2.5em;
  position: relative;
  width: 50%;
  min-height: 200px;
  float: left;
}

/* First column formatting */

.column:first-child {
  text-align: right;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

/* Paragraph found in the column */

.column p {
  font-size: 1.8em;
  margin: 0;
  font-weight: 300;
  line-height: 1.5;
  padding: 0 0 0.5em;
}

/* small-text found in the column */

.column p.small-text {
  line-height: 1.2;
  padding: 0.75em 0 1em;
  font-weight: 700;
  font-size: 1em;
}
```

Format the progress bar. The bar acts as a trigger example for an event that leads to a notification pop-up. 

The styling is as shown below:

```css
/* Notification progress bar */

/* This mimics a process that produces a notification */

.progress-button {
  padding: 0 3em;
  border: none;
  position: relative;
  overflow: hidden;
  display: inline-block;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 1em;
  outline: none;
  color: var(--white);
  border-radius: 5px;
  background: var(--medium-black);
  line-height: 4;
  z-index: 50;
}

/* Text inside the progress button */

.progress-button .content {
  z-index: 10;
  display: block;
  position: relative;
  transition: transform 0.3s;
  -webkit-transition: -webkit-transform 0.3s;
}

/* Progress button transition animation */

.progress-button .progress {
  top: 0;
  height: 100%;
  width: 0;
  left: 0;
  position: absolute;
  opacity: 0;
  background: var(--medium-black);
  z-index: 0;
  transition: width 0s 0.3s, opacity 0.3s;
  -webkit-transition: width 0s 0.3s, opacity 0.3s;
}

/* Active button on the progress styling */

.progress-button.active .progress {
  width: 100%;
  opacity: 1;
  transition: width 1.2s;
  -webkit-transition: width 1.2s;
}
```

Create screen responsiveness for different display sizes:

```css
/* Allow the screen to be responsive */

@media screen and (max-width: 25em) {
  .notifications-header h1 {
    font-size: 2.5em;
  }
}

@media screen and (max-width: 46.5em) {
  .column {
    padding: 2em;
    font-size: 90%;
    min-width: auto;
    width: 100%;
    min-height: auto;
  }

  .column:first-child {
    box-shadow: inset 0 -1px 0 var(--shadow-black);
    text-align: center;
  }
}
```

![Style the pages](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/style-the-pages.png)

### Add a notification to the window
In the JavaScript folder, named `js`, open the 'notificationFunction.js' file. 

In the file, you will do the following:

Create a function that will take in the window as the argument. The function will later invoke it. The function will hold all the other functions in it. 

This code is shown below:

```js
(function (window, document) {

  /** This enables you to avoid using undeclared variables */
  'use strict';


})(window, document);
```

In the function, you will get the root element in the webpage. 

This code returns the HTML element. Add the end of event names which refer to the end of animations. You will also create a function that checks if an object has a property that it holds. If so, it will add the property to the former object.

The `extend` function will be used in the `notificationFunction` function. It will place a new property to the object that had been initially saved with another property.

This is shown in the code below:

```js
/** Get the root element and link the animation end event names*/
let support = {animations: Modernizr.cssanimations},
        animEndEventNames = {
          'WebkitAnimation': 'webkitAnimationEnd',
          'OAnimation': 'oAnimationEnd',
          'msAnimation': 'MSAnimationEnd',
          'animation': 'animationend'
        },
        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

/**
 * extend object function
 */
function extend(obj_a, obj_b) {
  for (let key in obj_b) {
    if (obj_b.hasOwnProperty(key)) {
      obj_a[key] = obj_b[key];
    }
  }
  return obj_a;
}

/**
 * NotificationFunction function
 */
function NotificationFunction(options) {
  this.options = extend({}, this.options);
  extend(this.options, options);
  this._init();
}
```

Create a `notificationFunction options` function that allows one to easily set the notification type and styles. 

The function allows one to set the following:
- wrapper of the notification
- message
- layout
- effect
- time taken to leave the scene once displayed (totalTimeToLeave). The time is in milliseconds(ms).
- on-open and on-close callback functions

These are well displayed below:

```js


/**
 * NotificationFunction options
 */
NotificationFunction.prototype.options = {
  // The element to which the notification will be appended to in the application
  // The defaults are to the 'document.body' element
  notificationWrapper: document.body,
  // the notificationMessage
  notificationMessage: 'Hello!!! Developer!',
  notificationLayout: 'growl',
  // The effects to be set for the specified notification Layout:
  // for growl notification Layout: { genie || scale || jelly || slide } effects
  notificationEffect: 'slide',
  // error,warning, success, notice
  // This step will add class notification-type-warning, notification-type-error or notification-type-success
  notificationType: 'error',
  // if the current user does not close the notification then it gets removed
  // This is automatically after the following time
  totalTimeToLeave: 5000,
  // Some of the callback functions
  onClose: function () {
    /*return the output of false*/
    return false;
  },
  onOpen: function () {
    /*return the output of false*/
    return false;
  }
};
```

> Remember, the wrapper of the notification can be changed. This can be handy if the notification should only be in a certain element or part of the webpage.

Add a new function below the above function. This function is for initializing and caching variables created.

The function will do the following:
- create a new `div` element in the HTML file.
- add classes to the created element. This addition helps the notification inherit the properties and styles in the stylesheets.
- add the message specified in the options set above inside the element.
- add a closing tag to the element created.
- append the notification to the body or the element specified in `options.notificationWrapper`.
- check if the notification is still active or on. If so, dismiss the notification once the time in the `options.totalTimeToLeave` runs out.

```js
 /**
 * initialization function
 * initialize and cache some variables for the application
 */
NotificationFunction.prototype._init = function () {
  // create HTML structure
  this.ntf = document.createElement('div');
  this.ntf.className = 'ns-boxes ns-' + this.options.notificationLayout + ' ns-effect-' + this.options.notificationEffect + ' ns-type-' + this.options.notificationType;
  let innerString = '<div class="ns-boxes-inner">';
  innerString += this.options.notificationMessage;
  innerString += '</div>';
  innerString += '<span class="ns-close"></span></div>';
  this.ntf.innerHTML = innerString;

  // append to body or the element specified in options.notificationWrapper
  // This creates the notification before the first child in the HTML file.
  this.options.notificationWrapper.insertBefore(this.ntf, this.options.notificationWrapper.firstChild);

  // dismiss after [options.totalTimeToLeave]ms
  let notification_self = this;

  if (this.options.totalTimeToLeave) { // checks to make sure totalTimeToLeave is not set to false in notification initialization
    this.dismisstotalTimeToLeave = setTimeout(function () {
      if (notification_self.active) {
        notification_self.dismiss();
      }
    }, this.options.totalTimeToLeave);
  }

  // init events
  this._initEvents();
};
```

Create a function that dismisses the notification when one clicks the close button.

```js
/**
 * initialize the notification events
 */
NotificationFunction.prototype._initEvents = function () {
  let notification_self = this;
  // dismiss notification
  this.ntf.querySelector('.ns-close')
          .addEventListener('click',
                  function () {
                    notification_self.dismiss();
                  });
};
```

Add a function that will display the notification. It will utilize the functions in the `classEditor.js` file to search for the class names and remove them from the element. 

The function will add another class to it. It then executes the on-open callback function. 

Check this out below:

```js
/**
 * show the notification
 */
NotificationFunction.prototype.show = function () {
  this.active = true;
  classEditor.remove(this.ntf, 'ns-hide');
  classEditor.add(this.ntf, 'ns-show');
  if (typeof this.options.onOpen === 'function')
    this.options.onOpen();
};
```

Add a function to dismiss the notification once the timeout runs out or the notification close button is clicked on.

The timeout will be cleared. The `ns-show` class name will also be removed. The function then executes on-close callback functions if specified.

The time to execute the callback function procedures is set to 25 ms.

The function removes the notification element once the notification ends. If it doesn't find the notification in
the `target` inside the DOM element, then it returns false.

```js
/**
 * dismisses the notification
 */
NotificationFunction.prototype.dismiss = function () {
  let notification_self = this;
  this.active = false;
  clearTimeout(this.dismisstotalTimeToLeave);
  classEditor.remove(this.ntf, 'ns-show');
  setTimeout(function () {
    classEditor.add(notification_self.ntf, 'ns-hide');

    // callback
    if (typeof notification_self.options.onClose === 'function')
      notification_self.options.onClose();
  }, 25);

  // after animation ends remove ntf from the DOM
  let onEndAnimationFn = function (ev) {
    if (support.animations) {
      if (ev.target !== notification_self.ntf) return false;
      this.removeEventListener(animEndEventName, onEndAnimationFn);
    }
    notification_self.options.notificationWrapper.removeChild(notification_self.ntf);
  };

  if (
          /*Found in Modernizr file*/
          support.animations
  ) {
    /*An event listener*/
    this.ntf.addEventListener(animEndEventName, onEndAnimationFn);
  } else {
    /*Returns this function*/
    onEndAnimationFn();
    /*End*/
  }
};
```

Add the `notificationFunction` function to be a global function seen in all the windows. This step allows the function to be used in the HTML file quickly. 

See this in the code below:

```js
/**
 * add to the global namespace
 */
window.NotificationFunction = NotificationFunction;
```

### Create functions to search for the classes in the HTML file
Open the `classEditor.js` file and add a function to take in the window as an argument and invoke it.

```js
/*
 * classEditor - It contains class helper functions
 *
 * These functions include:-
 *
 * classEditor.has( element, 'my-current-class' ) -->>> true or false
 * classEditor.add( element, 'my-new-class' )
 * classEditor.remove( element, 'my-unwanted-class' )
 * classEditor.toggle( element, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window, document) {

  /** This enables you to avoid using undeclared variables */
  'use strict';


})(window, document);
```

Create a `RegEX` function that searches for the class name that is in between other words in the file.

```js
// class helper functions for the application

function class_Regex(class_name) {
  return new RegExp("(^|\\s+)" + class_name + "(\\s+|$)");
}

// classList support for the management of classes
// The API accepts only one change at once instead of multiple classes
let hasThisClass, addsClass, removesClass;

if ('classList' in document.documentElement) {
  hasThisClass = function (element, Class) {
    return element.classList.contains(Class);
  };
  addsClass = function (element, Class) {
    element.classList.add(Class);
  };
  removesClass = function (element, Class) {
    element.classList.remove(Class);
  };
} /*If not execute this*/
else {
  hasThisClass = function (element, Class) {
    return class_Regex(Class).test(element.className);
  };
  addsClass = function (element, Class) {
    if (!hasThisClass(element, Class)) {
      element.className = element.className + ' ' + Class;
    }
  };
  removesClass = function (element, Class) {
    element.className = element.className.replace(class_Regex(Class), ' ');
  };
}
```

Create a `togglesClass` function that uses the `hasThisClass` procedure to check if the file has the class in the element. If it has, it removes it and adds another. This acts as a toggle function.

```javascript
function togglesClass(element, Class) {
  let functionFn = hasThisClass(element, Class) ? removesClass : addsClass;
  functionFn(element, Class);
}
```

Shorten the names of the functions or procedures so that they can be easily used.

```js
let classEditor = {
  // The function full names
  removeClass: removesClass,
  toggleClass: togglesClass,
  addClass: addsClass,
  hasClass: hasThisClass,

  // short names for the functions above
  remove: removesClass,
  add: addsClass,
  toggle: togglesClass,
  has: hasThisClass
};
```

Make the `classEditor` function to be a global function in the workspace.

```js
// transport
if (typeof define === 'function') {
  define(classEditor);
} else {

  // It is found in the browser at a global scope

  window.classEditor = classEditor;
}
```

### Modify the HTML file to add the notification
Inside the `growl-effects-scale.html` file, just below the `<script src="js/notificationFunction.js"></script>` line,
add a script that does the following:

Create a function that invokes itself. 

It will hold the other functions:

```html

<script>
  (function () {

  })();
</script>
```

Listens for a button click from the progress bar button. It enables the button for clicks. 

Look at the button below for this:

```js
let notificationButton = document.getElementById('notification-trigger');

// make sure the button is disabled
notificationButton.disabled = false;
```

Add a function that disables the button which is clicked.

It then uses the `notificationFunction` function created before to quickly set the options of the notification. It makes sure that the button is not disabled since disabling the button prevents double-clicking until the notification disappears.

As for the `growl` layout, it supports the following notification effects:
- scale (will be used in the `growl-effects-scale.html` file)
- jelly
- slide in
- genie


```js
notificationButton.addEventListener('click', function () {
  // simulate loading (for demo purposes only)
  classEditor.add(notificationButton, 'active');
  setTimeout(function () {

    classEditor.remove(notificationButton, 'active');

    // create the notification
    let notification = new NotificationFunction({

      // Added an apostrophe (') escape character in the notificationMessage to avoid errors
      notificationMessage: '<p>Hello there!!! I\'m a classic notification pop-up, but I have some Jelly elasticity thanks to <a href="http://bouncejs.com/">bounce.js</a>. </p>',
      notificationLayout: 'growl',
      notificationEffect: 'scale',
      notificationType: 'notice',
      totalTimeToLeave: 5000,
      // On close of the notification, enable the button
      onClose: function () {
        notificationButton.disabled = false;
      }
    });

    // This function Displays the notification
    notification.show();

  }, 1200);

  // disable the button (This is meant for demonstration purposes only)
  this.disabled = true;
});
```

### Use a minified modernizr file for animations
Head over to this [link](https://github.com/prograte/Genie-Slide-in-Jelly-and-scale-Pop-up-Notification-effects/blob/main/js/modernizr.custom.js) to find the `modernizr.custom.js` file. 

Copy its contents into the `modernizr.custom.js` file in the `js` folder. Do this by copy-pasting the code directly or viewing it as a *RAW* file before copy-pasting it.

'**modernizr.custom.js**' has been generated and downloaded from this [Modernizr](http://modernizr.com/download/#-cssanimations-shiv-cssclasses-prefixed-testprop-testallprops-domprefixes-load) site.

[Modernizr.com](Modernizr.com) generates for one a minified JS file that detects the browser being used and features it supports. This reduces the blacklisting of browsers in the HTML file and allows developers to customize experiences based on the browser's capabilities.

The downloaded file will enable the webpage to display the notification on the webpage.

![Add modernizr minified js file](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/add-modernizr.custom.js-file.png)

One notices that it hardly looks like a pop-up notification. The reason for this is that it has not been formatted yet.

### Format the notification
Style the notification to look like a pop-up notification. 

In the `default_notification.css` file do the following:

```css
/* Common, default styles for the notification box */

.ns-boxes {
  position: fixed;
  font-size: 90%;
  font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;
  padding: 22px;
  line-height: 1.4;
  z-index: 1000;
  background: rgba(42, 45, 50, 0.85);
  color: rgba(250, 251, 255, 0.95);
  pointer-events: none;
}
```

Style the notification box when the notification is shown:

```css
/* Notification 'on show' styling */
.ns-boxes.ns-show {
  /*Set the pointer-events to auto*/
  pointer-events: auto;
}
```

Format the links and paragraphs in the notification box. 

This styling is shown below:

```css
/* Notification link styling */
.ns-boxes a {
  opacity: 0.6;
  font-weight: 700;
  /* The current color can be used indirectly for other color attributes e.g border color */
  color: inherit;
}

.ns-boxes a:hover, .ns-boxes a:focus {
  opacity: 1;
}

/* Notification paragraph styling */
.ns-boxes p {
  margin: 0;
}
```

Add auto pointer-events when the notification is visible:

```css
/* Visible notification styling */
.ns-boxes.ns-show, .ns-boxes.ns-visible {
  /*Set the pointer-events to auto*/
  pointer-events: auto;
}
```

Style the notification when the notification is closed both before and after. 

Check this out below:

```css
/* `on close` notification styling */
.ns-close {
  overflow: hidden;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  text-indent: 100%;
  position: absolute;
  cursor: pointer;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.ns-close:hover, .ns-close:focus {
  outline: none;
}

/* Notification 'on close' before and after styling */
.ns-close::after, .ns-close::before {
  left: 50%;
  top: 50%;
  height: 60%;
  width: 3px;
  content: '';
  background: #6e6e6e;
  position: absolute;
}

.ns-close:hover::after, .ns-close:hover::before {
  background: var(--white);
}

.ns-close::before {
  transform: translate(-50%, -50%) rotate(45deg);
  -webkit-transform: translate(-50%, -50%) rotate(45deg);
}

.ns-close::after {
  transform: translate(-50%, -50%) rotate(-45deg);
  -webkit-transform: translate(-50%, -50%) rotate(-45deg);
}
```

The results for this styling is as shown in the image below:

![add default notification box styling](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/add-default-notification-box-styling.png)

Notice that the notification now looks more like a pop-up notification. The only issue is that it doesn't close
automatically, neither can it be closed. Solve these problems by adding some CSS styling in
the `growl-notification-style.css` file.

### Add the growl effect to the notification
In the `growl-notification-style.css` file, add growl effects. Find the code and some inline commentary of the growl effects CSS code [here](https://github.com/prograte/Genie-Slide-in-Jelly-and-scale-Pop-up-Notification-effects/blob/main/css/growl-notification-style.css).


The code: 

Add growl styling that will be shared with all the types of growl effects.

Add individual effects for each of the growl effect sets. This starts with the scale effect. The *scale* effect copies its name. It expands from a small size to a larger size. 

It produces a notification with the animation shown in the GIF below:

![Scale effect gif](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/scale-effect-gif.gif)

Added the *Jelly* animation effect. Some part of it is generated from [Bouncejs.com](http://bouncejs.com/).

> [Bouncejs.com](http://bouncejs.com/) is a site used to generate awesome CSS3 animations for a website. Click on the site to check out some presets available or create animations that are tailored for the site.

Head over to the `growl-effects-jelly.html` either by opening it in a browser or clicking the `Jelly` button on the
webpage. Click on `SHOW NOTIFICATION` to see the animation. 

The animation looks like that in the GIF below:

![Jelly effect gif](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/jelly-effect-gif.gif)

Added the slide-in animation to the project. Open the `growl-effects-slide-in.html` by clicking on the `Slide in` button. This file has the notification style set to slide hence it will implement the `slide in` effect. 

The effect is displayed in the GIF shown below:

![Slide-in effect gif](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/slide-in-effect-gif.gif)

Finally, in the file, add the Fly Up effect. This effect can be seen on the `growl-effects-genie.html` file accessed by clicking on the  `Genie` button. 

The code for this is shown below:

![genie effect gif](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/genie-effect-gif.gif)

### Normalize the webpages
Copy and paste the content of the `normalization.css` file from [here](https://github.com/prograte/Genie-Slide-in-Jelly-and-scale-Pop-up-Notification-effects/blob/main/css/normalization.css)

Do this by copy-pasting the code directly or viewing it as a *RAW* file before copy-pasting it.

The code in the file styles the webpage elements to look well. It is additional formatting to make the webpage look appealing to other browsers.

In case of any issues, find the code for the article in [this repository](https://github.com/prograte/Genie-Slide-in-Jelly-and-scale-Pop-up-Notification-effects). Modify it to create desired outputs for projects.

![changing color template](/engineering-education/genie-slide-in-jelly-and-scale-pop-up-notification-effects/changing-color-template.png)

> Use [Coolors.co](https://coolors.co/) to generate color templates for more visually appealing sites.

### Conclusion
In the article, we learned the following:
- Creating a web structure for a notification.
- Formatting the webpage.
- Adding a notification trigger event.
- Adding a notification to the webpage.
- Changing the type of notifications.
- Changing the colors of the site according to the templates created.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
