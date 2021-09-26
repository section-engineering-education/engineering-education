Websites need notifications to display urgent or additional information.Pop-ups, used to pass notifications, are effecient if used effectively and at the right time. Notification effects depending on the main website theme bring a website's unique taste and signature look.

In this article, you will learn how to apply some of these notification effects including the Genie, Slide-in, Jelly, and scale Pop-up notification effects. You will learn how to build the eye-catching catching effects and appreciate that these effects are dependent on the type of information being displayed.

### Table of Contents
- [Table of Contents](#table-of-contents)
- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [Brief overview](#brief-overview)
- [Create Folder structure](#create-folder-structure)
- [Overall Webpage Structure](#overall-webpage-structure)
- [Add styling](#add-styling)
- [Add a notification to the window](#add-a-notification-to-the-window)
- [Create functions to search for the classes in the HTML file](#create-functions-to-search-for-the-classes-in-the-html-file)
- [Modify the HTML file to add the notification](#modify-the-html-file-to-add-the-notification)
- [Use a minified modernizr file for animations](#use-a-minified-modernizr-file-for-animations)
- [Format the notification](#format-the-notification)
- [Add the growl effect to the notification](#add-the-growl-effect-to-the-notification)
- [Normalize the webpages](#normalize-the-webpages)
- [Bonus](#bonus)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways
By the end of this article, you will learn how to apply the following notification effects to a webpage.

- Slide-in effect
- Genie effect
- Scale growth effect
- Jelly pop-up effect

You will also get to know some notification effects which we can use on your webpage and when to use them.

### Pre-requisites
For you to flow easily with this article, you need to know the following:
- Basics of HTML. Know-how on creating web pages and linking other files to them.
- Good use of CSS.
- Interactions with JavaScript.
- Web development IDE. It should support webpage preview capabilities. These will be helpful during the development process.
I definitely recommend Visual Studio Code IDE. You can download it from [here](https://code.visualstudio.com/).

### Create Folder structure
Create a root folder named `Notifications`. All the project code will lie here. The root folder structure will be as shown below:

```shell
.
├── css (folder)
│   ├── demo.css (file)
│   ├── normalize.css (file)
│   ├── ns-default.css (file)
│   └── ns-style-growl.css (file)
├── js (folder)
│   ├── classie.js (file)
│   ├── modernizr.custom.js (file)
│   └── notificationFx.js (file)
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
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Notification Styles | Growl-Style</title>
    <link rel="stylesheet" type="text/css" href="css/normalize.css" />
    <link rel="stylesheet" type="text/css" href="css/demo.css" />
    <link rel="stylesheet" type="text/css" href="css/ns-default.css" />
    <link rel="stylesheet" type="text/css" href="css/ns-style-growl.css" />
    <script src="js/modernizr.custom.js"></script>

</head>
<body>
<div class="container">
    <!-- Top Navigation -->

    <header class="notifications-header">
        <h1>Notification Styles <span>Simple ideas &amp; effects for website notifications</span></h1>
    </header>
    <div class="main clearfix">
        <div class="column">
            <p class="small">Click on the button to show the notification:</p>
            <button id="notification-trigger" class="progress-button">
                <span class="content">Show Notification</span>
                <span class="progress"></span>
            </button>
        </div>
        <div class="column">
            <nav class="notifications-demos">
                <h3>Growl-like</h3>
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
<!-- /container -->
<script src="js/classie.js"></script>
<script src="js/notificationFx.js"></script>

</body>
</html>
```

![Webpage Framework](Webpage-framework.png "Webpage Framework")

Copy-paste the above code in the `growl-effects-genie.html` file. Repeat the step in `growl-effects-jelly.html` and `growl-effects-slide-in.html` files.

Modify the current page class of the in the above files so that it will show that it is on that page.
This is shown below:

- In the `growl-effects-genie.html`:

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

Repeat this for the other two files to get the Code below for:

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

### Add styling

In the `demo.css` file,

- Use `border-box` for all elements before and after. Set clearfix class styling both before and after.

```css
*, *:after, *:before { -webkit-box-sizing: border-box; box-sizing: border-box; }
.clearfix:before, .clearfix:after { content: ''; display: table; }
.clearfix:after { clear: both; }
```

- Format the `html` and `body` elements:

```css
html, body {
	height: 100%;
}

body {
	background: #6CC1EDFF;
	color: #f5f3ec;
	font-weight: 400;
	font-size: 1em;
	line-height: 1.25;
	position: relative; z-index: 1;
	font-family: 'Raleway', Calibri, Arial, sans-serif;
}
```

- Style the links, buttons, and container elements:

```css
a, button {
	outline: none;
}

a {
	color: rgba(0,0,0,0.5);
	text-decoration: none;
}

a:hover, a:focus {
	color: #fff;
}

.container {
    min-height: 100%;
}
```

- Create color templates to easily choose from for the page:

```css
/* You can choose colors quickly from the color templates below*/
.color-2 { background: #729DBF; }
.color-3 { background: #72BF7B; }
.color-4 { background: #484860; }
.color-5 { background: #7772BF; }
.color-6 { background: #B3BF72; }
.color-7 { background: #72BFB9; }
.color-8 { background: #BFA372; }
.color-9 { background: #6cc1ed; }
.color-9 { color: rgba(0,0,0,0.6); }
.color-10 { background: #00cfbe; }
.color-11 { background: #00a2d3;}
```

- Format the header and the header span:

```css
/* Header */
.notifications-header {
	margin: 0 auto;
	padding: 0 2em 0em;
	text-align: center;
}

.notifications-header h1 {
	margin: 0;
	font-size: 3.5em;
	line-height: 1.3;
}

.notifications-header h1 span {
	display: block;
	padding: 0.4em 0 0.6em 0.1em;
	font-size: 46%;
	font-weight: 300;
	opacity: 0.7;
}
```

- Format the top of the notification:

```css
/* To Navigation Style */
.notifications-top {
	width: 100%;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 0.69em;
	text-align: center;
	padding: 2em 0;
}
```

- Format the buttons which enable you to access the other web pages:

```css
/* Demo Buttons Style */
.notifications-demos {
	padding-top: 1em;
	font-size: 0.8em;
}

.notifications-demos div {
	margin-left: 90px;
	padding-bottom: 1em;
}

.notifications-demos a {
	display: inline-block;
	margin: 0.35em 0.1em;
	padding: 0.35em 0.9em 0.35em;
	outline: none;
	text-decoration: none;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: 700;
	background: rgba(255,255,255,0.3);
	color: #fff;
	border-radius: 2px;
	font-size: 110%;
}

.notifications-demos a:hover,
.notifications-demos a.current-demo {
	background: rgba(0,0,0,0.2);
	color: inherit;
	border-color: initial;
}

.notifications-demos h3 {
	margin: 0;
	padding: 1em 0 0.5em 0;
	font-size: 0.9em;
	float: left;
	min-width: 90px;
	clear: left;
}
```

- Format the content in the main content and in the columns:

```css
/* Main content */
/* Main */
.main {
	max-width: 69em;
	margin: 0 auto;
	padding: 3% 0 10%;
}

/* Column */
.column {
	float: left;
	width: 50%;
	padding: 0 2.5em;
	min-height: 200px;
	position: relative;
}

/* First column formatting */
.column:first-child {
	box-shadow: inset -1px 0 0 rgba(0,0,0,0.1);
	text-align: right;
}

/* Paragraph in the column */
.column p {
	font-weight: 300;
	font-size: 1.8em;
	padding: 0 0 0.5em;
	margin: 0;
	line-height: 1.5;
}

/* Small text in the column */
.column p.small {
	font-size: 1em;
	padding: 0.75em 0 1em;
	font-weight: 700;
	line-height: 1.2;
}
```

- Format the progress bar. The bar acts as a trigger example for an event that leads to a notification pop-up.
The styling is as shown below:

```css
/* Notification progress bar */
/* This mimics a process which produces a notification */
.progress-button {
	position: relative;
	display: inline-block;
	padding: 0 3em;
	outline: none;
	border: none;
	color: #fff;
	text-transform: uppercase;
	font-weight: 700;
	letter-spacing: 1px;
	font-size: 1em;
	z-index: 50;
	line-height: 4;
	overflow: hidden;
	border-radius: 5px;
	background: rgba(0,0,0,0.2);
}

/* Text inside the progress button */
.progress-button .content {
	position: relative;
	display: block;
	z-index: 10;
	-webkit-transition: -webkit-transform 0.3s;
	transition: transform 0.3s;
}

/* Progress button transition animation */
.progress-button .progress {
	position: absolute;
	left: 0;
	background: rgba(0,0,0,0.2);
	top: 0;
	width: 0%;
	opacity: 0;
	height: 100%;
	z-index: 0;
	-webkit-transition: width 0s 0.3s, opacity 0.3s;
	transition: width 0s 0.3s, opacity 0.3s;
}

/* Active button on progress styling */
.progress-button.active .progress {
	opacity: 1;
	width: 100%;
	-webkit-transition: width 1.2s;
	transition: width 1.2s;
}
```

- Create screen responsiveness for different display sizes:

```css
/* Allow the screen to be responsive */
@media screen and (max-width: 46.5em) {
	.column {
		width: 100%;
		min-width: auto;
		min-height: auto;
		padding: 2em;
		font-size: 90%;
	}

	.column:first-child {
		text-align: center;
		box-shadow: inset 0 -1px 0 rgba(0,0,0,0.1);
	}
}

@media screen and (max-width: 25em) {

	.notifications-header h1 {
		font-size: 2.5em;
	}

	.notifications-top a {
		font-size: 1.6em;
		border: 2px solid black;
		border-color: initial;
		padding: 0.5em;
		border-radius: 3px;
	}
}
```

![Style the pages](style-the-pages.png "Style the pages")

### Add a notification to the window
In the Javascript folder, named `js`, open the 'notificationFX.js' file. In the file, you will do the following:

- Create a function that will take in the window as the argument. The function will later invoke it.
The function will hold all the other functions in it.
This code is shown below:

```javascript
( function( window ) {

    /** This enables you to avoid using undeclared variables */
	'use strict';
    
    
} )( window );
```

- In the function, you will get the root element in the webpage. This code returns the HTML element. Add the end of event names which refer to the end of animations.
You will also create a function that checks if an object has a property that it holds.
If so, it will add the property to the former object.
The `extend` function will be used in the `NotificationFX` function. It will place a new property to the object that had been initially saved with another property.
This is shown in the code below:

```javascript
/** Get the root element */
	var docElem = window.document.documentElement,
		support = { animations : Modernizr.cssanimations },
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	/**
	 * extend obj function
	 */
	function extend( a, b ) {
		for( var key in b ) {
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/**
	 * NotificationFx function
     * Uses the extend function created above
	 */
	function NotificationFx( options ) {
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}
```

- Create a `NotificationFX options` function that allows one to easily set the notification type and styles.
The function allows one to set the following: 

    - wrapper of the notification
    - message
    - layout
    - effect
    - time taken to leave the scene once displayed (ttl). The time is in milliseconds(ms).
    - on-open and on-close callback functions

These are well displayed below:

```javascript
/**
    * NotificationFx options
    */
NotificationFx.prototype.options = {
    // element to which the notification will be appended
    // defaults to the document.body
    wrapper : document.body,
    // the message
    message : 'Hello!',
    // layout type: growl|attached|bar|other
    layout : 'growl',
    // effects for the specified layout:
    // for growl layout: scale|slide|genie|jelly
    effect : 'slide',
    // notice, warning, error, success
    // will add class ns-type-warning, ns-type-error or ns-type-success
    type : 'error',
    // if the user doesn´t close the notification then we remove it
    // after the following time
    ttl : 6000,
    // callbacks
    onClose : function() { return false; },
    onOpen : function() { return false; }
}
```

> Remember, the wrapper of the notification can be changed. This can be handy if the notification should only be in a certain element or part of the webpage.

- Add a new function below the above function. This function is for initializing and caching variables created.

The function will do the following:
    - create a new `div` element in the HTML file
    - add classes to the created element. This addition helps the notification inherit the properties and styles in the stylesheets.
    - Add the message specified in the options set above inside the element
    - Add a closing tag to the element created
    - append the notification to the body or the element specified in `options.wrapper`
    - check if the notification is still active or on. If so, dismiss the notification once the time in the `options.ttl` runs out.


```javascript
NotificationFx.prototype._init = function() {
    // create HTML structure
    this.ntf = document.createElement( 'div' );
    this.ntf.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type;
    var strinner = '<div class="ns-box-inner">';
    strinner += this.options.message;
    strinner += '</div>';
    strinner += '<span class="ns-close"></span></div>';
    this.ntf.innerHTML = strinner;

    // append to body or the element specified in options.wrapper
    // This creates the notification before the first child in the HTML file.
    this.options.wrapper.insertBefore( this.ntf, this.options.wrapper.firstChild );

    // dismiss after [options.ttl]ms
    var self = this;

    if(this.options.ttl) { // checks to make sure ttl is not set to false in notification initialization
        this.dismissttl = setTimeout( function() {
            if( self.active ) {
                self.dismiss();
            }
        }, this.options.ttl );
    }

    // init events
    this._initEvents();
}
```

- Create a function that dismisses the notification when one clicks the close button.

```javascript
/**
    * init events
    */
NotificationFx.prototype._initEvents = function() {
    var self = this;
    // dismiss notification
    this.ntf.querySelector( '.ns-close' ).addEventListener( 'click', function() { self.dismiss(); } );
}
```

- Add a function that will display the notification.
It will utilize the functions in the `classie.js` file to search for the class names and remove them from the element.

The function will add another class to it. It then executes the on-open callback function. Check this out below:

```javascript
/**
* show the notification
*/
NotificationFx.prototype.show = function() {
    this.active = true;
    classie.remove( this.ntf, 'ns-hide' );
    classie.add( this.ntf, 'ns-show' );
    if (typeof this.options.onOpen === 'function')
        this.options.onOpen();
}
```

- Add a function to dismiss the notification once the timeout runs out or the notification close button is clicked on. The timeout will be cleared. The `ns-show` class name will also be removed.

The function then executes on-close callback functions if specified. The time to execute the callback function procedures is set to 25 ms.

The function removes the notification element once the notification ends. If it doesn't find the notification in the `target` inside the DOM element, then returns false.

```javascript
/**
    * dismiss the notification
    */
NotificationFx.prototype.dismiss = function() {
    var self = this;
    this.active = false;
    clearTimeout( this.dismissttl );
    classie.remove( this.ntf, 'ns-show' );
    setTimeout( function() {
        classie.add( self.ntf, 'ns-hide' );

        // callback
        if (typeof self.options.onClose === 'function')
            self.options.onClose();
    }, 25 );

    // after animation ends remove ntf from the DOM
    var onEndAnimationFn = function( ev ) {
        if( support.animations ) {
            if( ev.target !== self.ntf ) return false;
            this.removeEventListener( animEndEventName, onEndAnimationFn );
        }
        self.options.wrapper.removeChild( self.ntf );
    };

    if( support.animations ) {
        this.ntf.addEventListener( animEndEventName, onEndAnimationFn );
    }
    else {
        onEndAnimationFn();
    }
}
```

- Add the `NotificationFx` function to be a global function seen in all the window.
This step allows the function to be used in the HTML file quickly.
See this in the code below:

```javascript
/**
    * add to the global namespace
    */
window.NotificationFx = NotificationFx;
```

### Create functions to search for the classes in the HTML file
Open the `classie.js` file and add add a function to take in the window as an argument and invoke it.

```javascript
( function( window ) {

'use strict';


})( window );
```

- Create a `RegEX` function that searches for the class name that is in between other words in the file.

```javascript
function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}
```

- Create functions to check if an HTML file has a certain class in it, to add or remove the class in a certain element.
These functions utilize the `RegEx` function created above.

```javascript
// classList support for class management

var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}
```

- Create a `toggleClass` function that uses the `hasClass` procedure to check if the file has the class in the element.
If it has, it removes it and adds another. This acts as a toggle function.

```javascript
function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}
```

- Shorten the names of the functions or procedures so that they can be easily used.

```javascript
var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};
```

- Make the `classie` function to be a global function in the workspace.

```javascript
// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}
```

### Modify the HTML file to add the notification
Inside the `growl-effects-scale.html` file, just below the `<script src="js/notificationFx.js"></script>` line, add a script that does the following:

- Create a function that invokes itself. It will hold the other functions:

```html
<script>
    (function() {
        
    })();
</script>
```

- Listens for a button click from the progress bar button. It enables the button for clicks.
Look at the button below for this:

```javascript
        var bttn = document.getElementById( 'notification-trigger' );

        // make sure..
        bttn.disabled = false;
```

- Add a function that disables the button which is clicked.
It then uses the `NotificationFx` function created before to quickly set the options of the notification. making makes sure that the button is not disabled since disabling the button prevents double-clicking till when the notification disappears. As for the `growl` layout, it supports the following notification effects:
    - scale (will be used in the `growl-effects-scale.html` file)
    - jelly
    - slide in
    - genie

```javascript
bttn.addEventListener( 'click', function() {
    
    // simulate loading (for demo purposes only)
    classie.add( bttn, 'active' );
    setTimeout( function() {

        classie.remove( bttn, 'active' );

        // create the notification
        var notification = new NotificationFx({

            // Added an apostrophe (') escape character in the message to avoid errors
            message : '<p>Hello there! I\'m a classic notification, but I have some elastic jelliness thanks to <a href="http://bouncejs.com/">bounce.js</a>. </p>',
            layout : 'growl',
            effect : 'scale',
            type : 'notice', // notice, warning, error or success
            ttl : 6000,
            // On close of the notification, enable the button
            onClose : function() {
                bttn.disabled = false;
            }
        });

        // show the notification
        notification.show();

    }, 1200 );

    // disable the button (for demo purposes only)
    this.disabled = true;
} );
```

### Use a minified modernizr file for animations
Head over to this [link](https://github.com/prograte/Genie-Slide-in-Jelly-and-scale-Pop-up-Notification-effects/blob/main/js/modernizr.custom.js) to find the `modernizr.custom.js` file. Copy the content into the `modernizr.custom.js` file in the `js` folder. Do this by copy-pasting the code directly or viewing it as a _RAW_ file before copy-pasting it.

> '**modernizr.custom.js**' has been generated and downloaded from this [Modernizr](http://modernizr.com/download/#-cssanimations-shiv-cssclasses-prefixed-testprop-testallprops-domprefixes-load) site.
>
> [Modernizr.com](Modernizr.com) generates for one a minified JS file that detects the browser being used and features it supports.
> This reduces the blacklisting of browsers in the HTML file. It rather allows developers to customize experiences based on the browser's capabilities.

The downloaded file will enable the webpage to display the notification on the webpage.
It will look as follows:

![Add modernizr minified js file](add-modernizr.custom.js-file.png "Add modernizr minified js file")

One notices that it hardly looks like a pop-up notification. The reason for this is that it has not been formatted yet.

### Format the notification
Style the notification to look like a pop-up notification. In the `ns-default.css` file do the following:

- Style the notification box in the webpage:

```css
/* Common, default styles for the notification box */

.ns-box {
	position: fixed;
	background: rgba(42,45,50,0.85);
	padding: 22px;
	line-height: 1.4;
	z-index: 1000;
	pointer-events: none;
	color: rgba(250,251,255,0.95);
	font-size: 90%;
	font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;
}
```

- Style the notification box when the notification is shown:

```css
/* Notification 'on show' styling */
.ns-box.ns-show {
	pointer-events: auto;
}
```

- Format the links and paragraphs in the notification box. This styling is shown below:

```css
/* Notification link styling */
.ns-box a {
	color: inherit;
	opacity: 0.7;
	font-weight: 700;
}

.ns-box a:hover,
.ns-box a:focus {
	opacity: 1;
}

/* Notification paragraph styling */
.ns-box p {
	margin: 0;
}
```

- Add auto pointer-events when the notification is visible:

```css
/* Visible notification styling */
.ns-box.ns-show,
.ns-box.ns-visible {
	pointer-events: auto;
}
```

- Style the notification when the notification is closed both before and after.
Check this out below:

```css
/* `on close` notification styling */
.ns-close {
	width: 20px;
	height: 20px;
	position: absolute;
	right: 4px;
	top: 4px;
	overflow: hidden;
	text-indent: 100%;
	cursor: pointer;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

.ns-close:hover, 
.ns-close:focus {
	outline: none;
}

/* Notification 'on close' before and after styling */
.ns-close::before,
.ns-close::after {
	content: '';
	position: absolute;
	width: 3px;
	height: 60%;
	top: 50%;
	left: 50%;
	background: #6e6e6e;
}

.ns-close:hover::before,
.ns-close:hover::after {
	background: #fff;
}

.ns-close::before {
	-webkit-transform: translate(-50%,-50%) rotate(45deg);
	transform: translate(-50%,-50%) rotate(45deg);
}

.ns-close::after {
	-webkit-transform: translate(-50%,-50%) rotate(-45deg);
	transform: translate(-50%,-50%) rotate(-45deg);
}
```

The results for this styling is as shown in the image below:

![add default notification box styling](add-default-notification-box-styling.png "add default notification box styling")

Notice that the notification now looks more like a pop-up notification.
The only issue is that it doesn't close automatically, neither can it be closed.

Solve these problems by adding some CSS styling in the `ns-style-growl.css` file.

### Add the growl effect to the notification

In the `ns-style-growl.css` file, add growl effects.
The styling for the notification is as shown below:

- Add growl styling that will be shared with all the types of growl effects:

```css
/* Growl-style notifications */
.ns-growl {
	top: 30px;
	left: 30px;
	max-width: 300px;
	border-radius: 5px;
}

.ns-growl p {
	margin: 0;
	line-height: 1.3;
}

[class^="ns-effect-"].ns-growl.ns-hide,
[class*=" ns-effect-"].ns-growl.ns-hide {
	-webkit-animation-direction: reverse;
	animation-direction: reverse;
}
```

- Add individual effects for each of the growl effect sets. Start with the scale effect.
The _scale_ effect copies its name. It expands from a small size to a larger size. The code for the effect is shown below:

```css
/* Individual effects */

/* Scale */
.ns-effect-scale {
	background: #67c58f;
	box-shadow: 0 25px 10px -15px rgba(0,0,0,0.05);
}

.ns-effect-scale a {
	color: #1f8a4c;
}

.ns-effect-scale a:hover,
.ns-effect-scale a:focus {
	color: #fff;
}

.ns-effect-scale .ns-close::before,
.ns-effect-scale .ns-close::after {
	background: #1f8a4c;
}

.ns-effect-scale .ns-close:hover::before,
.ns-effect-scale .ns-close:hover::after {
	background: #fff;
}

.ns-effect-scale.ns-show,
.ns-effect-scale.ns-hide {
	-webkit-animation-name: animScale;
	animation-name: animScale;
	-webkit-animation-duration: 0.25s;
	animation-duration: 0.25s;
}

@-webkit-keyframes animScale {
	0% { opacity: 0; -webkit-transform: translate3d(0,40px,0) scale3d(0.1,0.6,1); }
	100% { opacity: 1; -webkit-transform: translate3d(0,0,0) scale3d(1,1,1); }
}

@keyframes animScale {
	0% { opacity: 0; -webkit-transform: translate3d(0,40px,0) scale3d(0.1,0.6,1); transform: translate3d(0,40px,0) scale3d(0.1,0.6,1); }
	100% { opacity: 1; -webkit-transform: translate3d(0,0,0) scale3d(1,1,1); transform: translate3d(0,0,0) scale3d(1,1,1); }
}
```

It produces a notification with the animation shown in the GIF below:

![Scale effect gif](scale-effect-gif.gif "Scale effect gif")

- Add the _Jelly_ animation effect. Some part of it is generated from [bouncejs.com](http://bouncejs.com/).

  > [Bouncejs.com](http://bouncejs.com/) is a site used to generate awesome CSS3 animations for a website.
  > Click on the site to check out some presets available or create animations which are tailored for the site.

```css
/* Jelly */
.ns-effect-jelly {
	background: #97d2f1;
	max-width: 280px;
}

.ns-effect-jelly a {
	color: #5699bc;
}

.ns-effect-jelly a:hover,
.ns-effect-jelly a:focus {
	color: #fff;
}

.ns-effect-jelly .ns-close::before,
.ns-effect-jelly .ns-close::after {
	background: #5699bc;
}

.ns-effect-jelly .ns-close:hover::before,
.ns-effect-jelly .ns-close:hover::after {
	background: #fff;
}

.ns-effect-jelly.ns-show {
	-webkit-animation-name: animJelly;
	animation-name: animJelly;
	-webkit-animation-duration: 1s;
	animation-duration: 1s;
	-webkit-animation-timing-function: linear;
	animation-timing-function: linear;
}

.ns-effect-jelly.ns-hide {
	-webkit-animation-name: animFade;
	animation-name: animFade;
	-webkit-animation-duration: 0.3s;
	animation-duration: 0.3s;
}

@-webkit-keyframes animFade {
	0% { opacity: 0; }
	100% { opacity: 1; }
}

@keyframes animFade {
	0% { opacity: 0; }
	100% { opacity: 1; }
}

/* Generated with Bounce.js. Edit at http://goo.gl/6iLZu5 */

@-webkit-keyframes animJelly { 
	0% { -webkit-transform: matrix3d(0.7, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.7, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	2.083333% { -webkit-transform: matrix3d(0.75266, 0, 0, 0, 0, 0.76342, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.75266, 0, 0, 0, 0, 0.76342, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	4.166667% { -webkit-transform: matrix3d(0.81071, 0, 0, 0, 0, 0.84545, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.81071, 0, 0, 0, 0, 0.84545, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	6.25% { -webkit-transform: matrix3d(0.86808, 0, 0, 0, 0, 0.9286, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.86808, 0, 0, 0, 0, 0.9286, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	8.333333% { -webkit-transform: matrix3d(0.92038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.92038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	10.416667% { -webkit-transform: matrix3d(0.96482, 0, 0, 0, 0, 1.05202, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.96482, 0, 0, 0, 0, 1.05202, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	12.5% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.08204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1.08204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	14.583333% { -webkit-transform: matrix3d(1.02563, 0, 0, 0, 0, 1.09149, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.02563, 0, 0, 0, 0, 1.09149, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	16.666667% { -webkit-transform: matrix3d(1.04227, 0, 0, 0, 0, 1.08453, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.04227, 0, 0, 0, 0, 1.08453, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	18.75% { -webkit-transform: matrix3d(1.05102, 0, 0, 0, 0, 1.06666, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.05102, 0, 0, 0, 0, 1.06666, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	20.833333% { -webkit-transform: matrix3d(1.05334, 0, 0, 0, 0, 1.04355, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.05334, 0, 0, 0, 0, 1.04355, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	22.916667% { -webkit-transform: matrix3d(1.05078, 0, 0, 0, 0, 1.02012, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.05078, 0, 0, 0, 0, 1.02012, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	25% { -webkit-transform: matrix3d(1.04487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.04487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	27.083333% { -webkit-transform: matrix3d(1.03699, 0, 0, 0, 0, 0.98534, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.03699, 0, 0, 0, 0, 0.98534, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	29.166667% { -webkit-transform: matrix3d(1.02831, 0, 0, 0, 0, 0.97688, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.02831, 0, 0, 0, 0, 0.97688, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	31.25% { -webkit-transform: matrix3d(1.01973, 0, 0, 0, 0, 0.97422, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.01973, 0, 0, 0, 0, 0.97422, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	33.333333% { -webkit-transform: matrix3d(1.01191, 0, 0, 0, 0, 0.97618, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.01191, 0, 0, 0, 0, 0.97618, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	35.416667% { -webkit-transform: matrix3d(1.00526, 0, 0, 0, 0, 0.98122, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00526, 0, 0, 0, 0, 0.98122, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	37.5% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.98773, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 0.98773, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	39.583333% { -webkit-transform: matrix3d(0.99617, 0, 0, 0, 0, 0.99433, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99617, 0, 0, 0, 0, 0.99433, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	41.666667% { -webkit-transform: matrix3d(0.99368, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99368, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	43.75% { -webkit-transform: matrix3d(0.99237, 0, 0, 0, 0, 1.00413, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99237, 0, 0, 0, 0, 1.00413, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	45.833333% { -webkit-transform: matrix3d(0.99202, 0, 0, 0, 0, 1.00651, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99202, 0, 0, 0, 0, 1.00651, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	47.916667% { -webkit-transform: matrix3d(0.99241, 0, 0, 0, 0, 1.00726, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99241, 0, 0, 0, 0, 1.00726, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	50% { -webkit-transform: matrix3d(0.99329, 0, 0, 0, 0, 1.00671, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99329, 0, 0, 0, 0, 1.00671, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	52.083333% { -webkit-transform: matrix3d(0.99447, 0, 0, 0, 0, 1.00529, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99447, 0, 0, 0, 0, 1.00529, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	54.166667% { -webkit-transform: matrix3d(0.99577, 0, 0, 0, 0, 1.00346, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99577, 0, 0, 0, 0, 1.00346, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	56.25% { -webkit-transform: matrix3d(0.99705, 0, 0, 0, 0, 1.0016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99705, 0, 0, 0, 0, 1.0016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	58.333333% { -webkit-transform: matrix3d(0.99822, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99822, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	60.416667% { -webkit-transform: matrix3d(0.99921, 0, 0, 0, 0, 0.99884, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99921, 0, 0, 0, 0, 0.99884, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	62.5% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99816, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 0.99816, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	64.583333% { -webkit-transform: matrix3d(1.00057, 0, 0, 0, 0, 0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00057, 0, 0, 0, 0, 0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	66.666667% { -webkit-transform: matrix3d(1.00095, 0, 0, 0, 0, 0.99811, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00095, 0, 0, 0, 0, 0.99811, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	68.75% { -webkit-transform: matrix3d(1.00114, 0, 0, 0, 0, 0.99851, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00114, 0, 0, 0, 0, 0.99851, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	70.833333% { -webkit-transform: matrix3d(1.00119, 0, 0, 0, 0, 0.99903, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00119, 0, 0, 0, 0, 0.99903, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	72.916667% { -webkit-transform: matrix3d(1.00114, 0, 0, 0, 0, 0.99955, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00114, 0, 0, 0, 0, 0.99955, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	75% { -webkit-transform: matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	77.083333% { -webkit-transform: matrix3d(1.00083, 0, 0, 0, 0, 1.00033, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00083, 0, 0, 0, 0, 1.00033, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	79.166667% { -webkit-transform: matrix3d(1.00063, 0, 0, 0, 0, 1.00052, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00063, 0, 0, 0, 0, 1.00052, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	81.25% { -webkit-transform: matrix3d(1.00044, 0, 0, 0, 0, 1.00058, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00044, 0, 0, 0, 0, 1.00058, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	83.333333% { -webkit-transform: matrix3d(1.00027, 0, 0, 0, 0, 1.00053, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00027, 0, 0, 0, 0, 1.00053, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	85.416667% { -webkit-transform: matrix3d(1.00012, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00012, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	87.5% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.00027, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1.00027, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	89.583333% { -webkit-transform: matrix3d(0.99991, 0, 0, 0, 0, 1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99991, 0, 0, 0, 0, 1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	91.666667% { -webkit-transform: matrix3d(0.99986, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99986, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	93.75% { -webkit-transform: matrix3d(0.99983, 0, 0, 0, 0, 0.99991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99983, 0, 0, 0, 0, 0.99991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	95.833333% { -webkit-transform: matrix3d(0.99982, 0, 0, 0, 0, 0.99985, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99982, 0, 0, 0, 0, 0.99985, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	97.916667% { -webkit-transform: matrix3d(0.99983, 0, 0, 0, 0, 0.99984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99983, 0, 0, 0, 0, 0.99984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
}

@keyframes animJelly { 
	0% { -webkit-transform: matrix3d(0.7, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.7, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	2.083333% { -webkit-transform: matrix3d(0.75266, 0, 0, 0, 0, 0.76342, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.75266, 0, 0, 0, 0, 0.76342, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	4.166667% { -webkit-transform: matrix3d(0.81071, 0, 0, 0, 0, 0.84545, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.81071, 0, 0, 0, 0, 0.84545, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	6.25% { -webkit-transform: matrix3d(0.86808, 0, 0, 0, 0, 0.9286, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.86808, 0, 0, 0, 0, 0.9286, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	8.333333% { -webkit-transform: matrix3d(0.92038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.92038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	10.416667% { -webkit-transform: matrix3d(0.96482, 0, 0, 0, 0, 1.05202, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.96482, 0, 0, 0, 0, 1.05202, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	12.5% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.08204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1.08204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	14.583333% { -webkit-transform: matrix3d(1.02563, 0, 0, 0, 0, 1.09149, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.02563, 0, 0, 0, 0, 1.09149, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	16.666667% { -webkit-transform: matrix3d(1.04227, 0, 0, 0, 0, 1.08453, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.04227, 0, 0, 0, 0, 1.08453, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	18.75% { -webkit-transform: matrix3d(1.05102, 0, 0, 0, 0, 1.06666, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.05102, 0, 0, 0, 0, 1.06666, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	20.833333% { -webkit-transform: matrix3d(1.05334, 0, 0, 0, 0, 1.04355, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.05334, 0, 0, 0, 0, 1.04355, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	22.916667% { -webkit-transform: matrix3d(1.05078, 0, 0, 0, 0, 1.02012, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.05078, 0, 0, 0, 0, 1.02012, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	25% { -webkit-transform: matrix3d(1.04487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.04487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	27.083333% { -webkit-transform: matrix3d(1.03699, 0, 0, 0, 0, 0.98534, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.03699, 0, 0, 0, 0, 0.98534, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	29.166667% { -webkit-transform: matrix3d(1.02831, 0, 0, 0, 0, 0.97688, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.02831, 0, 0, 0, 0, 0.97688, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	31.25% { -webkit-transform: matrix3d(1.01973, 0, 0, 0, 0, 0.97422, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.01973, 0, 0, 0, 0, 0.97422, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	33.333333% { -webkit-transform: matrix3d(1.01191, 0, 0, 0, 0, 0.97618, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.01191, 0, 0, 0, 0, 0.97618, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	35.416667% { -webkit-transform: matrix3d(1.00526, 0, 0, 0, 0, 0.98122, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00526, 0, 0, 0, 0, 0.98122, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	37.5% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.98773, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 0.98773, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	39.583333% { -webkit-transform: matrix3d(0.99617, 0, 0, 0, 0, 0.99433, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99617, 0, 0, 0, 0, 0.99433, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	41.666667% { -webkit-transform: matrix3d(0.99368, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99368, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	43.75% { -webkit-transform: matrix3d(0.99237, 0, 0, 0, 0, 1.00413, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99237, 0, 0, 0, 0, 1.00413, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	45.833333% { -webkit-transform: matrix3d(0.99202, 0, 0, 0, 0, 1.00651, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99202, 0, 0, 0, 0, 1.00651, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	47.916667% { -webkit-transform: matrix3d(0.99241, 0, 0, 0, 0, 1.00726, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99241, 0, 0, 0, 0, 1.00726, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	50% { -webkit-transform: matrix3d(0.99329, 0, 0, 0, 0, 1.00671, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99329, 0, 0, 0, 0, 1.00671, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	52.083333% { -webkit-transform: matrix3d(0.99447, 0, 0, 0, 0, 1.00529, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99447, 0, 0, 0, 0, 1.00529, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	54.166667% { -webkit-transform: matrix3d(0.99577, 0, 0, 0, 0, 1.00346, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99577, 0, 0, 0, 0, 1.00346, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	56.25% { -webkit-transform: matrix3d(0.99705, 0, 0, 0, 0, 1.0016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99705, 0, 0, 0, 0, 1.0016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	58.333333% { -webkit-transform: matrix3d(0.99822, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99822, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	60.416667% { -webkit-transform: matrix3d(0.99921, 0, 0, 0, 0, 0.99884, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99921, 0, 0, 0, 0, 0.99884, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	62.5% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99816, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 0.99816, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	64.583333% { -webkit-transform: matrix3d(1.00057, 0, 0, 0, 0, 0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00057, 0, 0, 0, 0, 0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	66.666667% { -webkit-transform: matrix3d(1.00095, 0, 0, 0, 0, 0.99811, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00095, 0, 0, 0, 0, 0.99811, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	68.75% { -webkit-transform: matrix3d(1.00114, 0, 0, 0, 0, 0.99851, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00114, 0, 0, 0, 0, 0.99851, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	70.833333% { -webkit-transform: matrix3d(1.00119, 0, 0, 0, 0, 0.99903, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00119, 0, 0, 0, 0, 0.99903, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	72.916667% { -webkit-transform: matrix3d(1.00114, 0, 0, 0, 0, 0.99955, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00114, 0, 0, 0, 0, 0.99955, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	75% { -webkit-transform: matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	77.083333% { -webkit-transform: matrix3d(1.00083, 0, 0, 0, 0, 1.00033, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00083, 0, 0, 0, 0, 1.00033, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	79.166667% { -webkit-transform: matrix3d(1.00063, 0, 0, 0, 0, 1.00052, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00063, 0, 0, 0, 0, 1.00052, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	81.25% { -webkit-transform: matrix3d(1.00044, 0, 0, 0, 0, 1.00058, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00044, 0, 0, 0, 0, 1.00058, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	83.333333% { -webkit-transform: matrix3d(1.00027, 0, 0, 0, 0, 1.00053, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00027, 0, 0, 0, 0, 1.00053, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	85.416667% { -webkit-transform: matrix3d(1.00012, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.00012, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	87.5% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.00027, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1.00027, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	89.583333% { -webkit-transform: matrix3d(0.99991, 0, 0, 0, 0, 1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99991, 0, 0, 0, 0, 1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	91.666667% { -webkit-transform: matrix3d(0.99986, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99986, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	93.75% { -webkit-transform: matrix3d(0.99983, 0, 0, 0, 0, 0.99991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99983, 0, 0, 0, 0, 0.99991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	95.833333% { -webkit-transform: matrix3d(0.99982, 0, 0, 0, 0, 0.99985, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99982, 0, 0, 0, 0, 0.99985, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	97.916667% { -webkit-transform: matrix3d(0.99983, 0, 0, 0, 0, 0.99984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99983, 0, 0, 0, 0, 0.99984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
	100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
}
```

Head over to the `growl-effects-jelly.html` either by opening it in a browser or clicking the `Jelly` button on the webpage.
Click on `SHOW NOTIFICATION` to see the animation. The animation looks like that in the GIF below:

![Jelly effect gif](jelly-effect-gif.gif "Jelly effect gif")

- Add slide-in animation to the project. This is shown in the code below:

```css
/* Slide */
.ns-effect-slide {
	background: rgba(65,95,118,0.8);
	top: auto;
	bottom: 30px;
}

.ns-effect-slide .ns-close::before,
.ns-effect-slide .ns-close::after {
	background: #333;
}

.ns-effect-slide .ns-close:hover::before,
.ns-effect-slide .ns-close:hover::after {
	background: #fff;
}

.ns-effect-slide.ns-show {
	-webkit-animation-name: animSlideElastic;
	animation-name: animSlideElastic;
	-webkit-animation-duration: 1s;
	animation-duration: 1s;
	-webkit-animation-timing-function: linear;
	animation-timing-function: linear;
}

/* Generated with Bounce.js. Edit at http://goo.gl/akZHSq */

@-webkit-keyframes animSlideElastic { 
	0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1000, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1000, 0, 0, 1); }
	1.666667% { -webkit-transform: matrix3d(1.92933, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -739.26805, 0, 0, 1); transform: matrix3d(1.92933, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -739.26805, 0, 0, 1); }
	3.333333% { -webkit-transform: matrix3d(1.96989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -521.82545, 0, 0, 1); transform: matrix3d(1.96989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -521.82545, 0, 0, 1); }
	5% { -webkit-transform: matrix3d(1.70901, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -349.26115, 0, 0, 1); transform: matrix3d(1.70901, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -349.26115, 0, 0, 1); }
	6.666667% { -webkit-transform: matrix3d(1.4235, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -218.3238, 0, 0, 1); transform: matrix3d(1.4235, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -218.3238, 0, 0, 1); }
	8.333333% { -webkit-transform: matrix3d(1.21065, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -123.29848, 0, 0, 1); transform: matrix3d(1.21065, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -123.29848, 0, 0, 1); }
	10% { -webkit-transform: matrix3d(1.08167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -57.59273, 0, 0, 1); transform: matrix3d(1.08167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -57.59273, 0, 0, 1); }
	11.666667% { -webkit-transform: matrix3d(1.0165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -14.72371, 0, 0, 1); transform: matrix3d(1.0165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -14.72371, 0, 0, 1); }
	13.333333% { -webkit-transform: matrix3d(0.99057, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11.12794, 0, 0, 1); transform: matrix3d(0.99057, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11.12794, 0, 0, 1); }
	15% { -webkit-transform: matrix3d(0.98478, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 24.86339, 0, 0, 1); transform: matrix3d(0.98478, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 24.86339, 0, 0, 1); }
	16.666667% { -webkit-transform: matrix3d(0.98719, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30.40503, 0, 0, 1); transform: matrix3d(0.98719, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30.40503, 0, 0, 1); }
	18.333333% { -webkit-transform: matrix3d(0.9916, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30.75275, 0, 0, 1); transform: matrix3d(0.9916, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30.75275, 0, 0, 1); }
	20% { -webkit-transform: matrix3d(0.99541, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 28.10141, 0, 0, 1); transform: matrix3d(0.99541, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 28.10141, 0, 0, 1); }
	21.666667% { -webkit-transform: matrix3d(0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 23.98271, 0, 0, 1); transform: matrix3d(0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 23.98271, 0, 0, 1); }
	23.333333% { -webkit-transform: matrix3d(0.99936, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 19.40752, 0, 0, 1); transform: matrix3d(0.99936, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 19.40752, 0, 0, 1); }
	25% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 14.99558, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 14.99558, 0, 0, 1); }
	26.666667% { -webkit-transform: matrix3d(1.00021, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11.08575, 0, 0, 1); transform: matrix3d(1.00021, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11.08575, 0, 0, 1); }
	28.333333% { -webkit-transform: matrix3d(1.00022, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 7.82507, 0, 0, 1); transform: matrix3d(1.00022, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 7.82507, 0, 0, 1); }
	30% { -webkit-transform: matrix3d(1.00016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5.23737, 0, 0, 1); transform: matrix3d(1.00016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5.23737, 0, 0, 1); }
	31.666667% { -webkit-transform: matrix3d(1.0001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.27389, 0, 0, 1); transform: matrix3d(1.0001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.27389, 0, 0, 1); }
	33.333333% { -webkit-transform: matrix3d(1.00005, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.84893, 0, 0, 1); transform: matrix3d(1.00005, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.84893, 0, 0, 1); }
	35% { -webkit-transform: matrix3d(1.00002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.86364, 0, 0, 1); transform: matrix3d(1.00002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.86364, 0, 0, 1); }
	36.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.22079, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.22079, 0, 0, 1); }
	38.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.16687, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.16687, 0, 0, 1); }
	40% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.37284, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.37284, 0, 0, 1); }
	41.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.45594, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.45594, 0, 0, 1); }
	43.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.46116, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.46116, 0, 0, 1); }
	45% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.4214, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.4214, 0, 0, 1); }
	46.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.35963, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.35963, 0, 0, 1); }
	48.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.29103, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.29103, 0, 0, 1); }
	50% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.22487, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.22487, 0, 0, 1); }
	51.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.16624, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.16624, 0, 0, 1); }
	53.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.11734, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.11734, 0, 0, 1); }
	55% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.07854, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.07854, 0, 0, 1); }
	56.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.04909, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.04909, 0, 0, 1); }
	58.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.02773, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.02773, 0, 0, 1); }
	60% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.01295, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.01295, 0, 0, 1); }
	61.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00331, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00331, 0, 0, 1); }
	63.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.0025, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.0025, 0, 0, 1); }
	65% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00559, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00559, 0, 0, 1); }
	66.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00684, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00684, 0, 0, 1); }
	68.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00692, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00692, 0, 0, 1); }
	70% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00632, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00632, 0, 0, 1); }
	71.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00539, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00539, 0, 0, 1); }
	73.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00436, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00436, 0, 0, 1); }
	75% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00337, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00337, 0, 0, 1); }
	76.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00249, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00249, 0, 0, 1); }
	78.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00176, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00176, 0, 0, 1); }
	80% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00118, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00118, 0, 0, 1); }
	81.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00074, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00074, 0, 0, 1); }
	83.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00042, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00042, 0, 0, 1); }
	85% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00019, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00019, 0, 0, 1); }
	86.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00005, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00005, 0, 0, 1); }
	88.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1); }
	90% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00008, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00008, 0, 0, 1); }
	91.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0001, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0001, 0, 0, 1); }
	93.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0001, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0001, 0, 0, 1); }
	95% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00009, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00009, 0, 0, 1); }
	96.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00008, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00008, 0, 0, 1); }
	98.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00007, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00007, 0, 0, 1); }
	100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
}

@keyframes animSlideElastic { 
	0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1000, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1000, 0, 0, 1); }
	1.666667% { -webkit-transform: matrix3d(1.92933, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -739.26805, 0, 0, 1); transform: matrix3d(1.92933, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -739.26805, 0, 0, 1); }
	3.333333% { -webkit-transform: matrix3d(1.96989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -521.82545, 0, 0, 1); transform: matrix3d(1.96989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -521.82545, 0, 0, 1); }
	5% { -webkit-transform: matrix3d(1.70901, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -349.26115, 0, 0, 1); transform: matrix3d(1.70901, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -349.26115, 0, 0, 1); }
	6.666667% { -webkit-transform: matrix3d(1.4235, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -218.3238, 0, 0, 1); transform: matrix3d(1.4235, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -218.3238, 0, 0, 1); }
	8.333333% { -webkit-transform: matrix3d(1.21065, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -123.29848, 0, 0, 1); transform: matrix3d(1.21065, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -123.29848, 0, 0, 1); }
	10% { -webkit-transform: matrix3d(1.08167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -57.59273, 0, 0, 1); transform: matrix3d(1.08167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -57.59273, 0, 0, 1); }
	11.666667% { -webkit-transform: matrix3d(1.0165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -14.72371, 0, 0, 1); transform: matrix3d(1.0165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -14.72371, 0, 0, 1); }
	13.333333% { -webkit-transform: matrix3d(0.99057, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11.12794, 0, 0, 1); transform: matrix3d(0.99057, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11.12794, 0, 0, 1); }
	15% { -webkit-transform: matrix3d(0.98478, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 24.86339, 0, 0, 1); transform: matrix3d(0.98478, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 24.86339, 0, 0, 1); }
	16.666667% { -webkit-transform: matrix3d(0.98719, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30.40503, 0, 0, 1); transform: matrix3d(0.98719, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30.40503, 0, 0, 1); }
	18.333333% { -webkit-transform: matrix3d(0.9916, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30.75275, 0, 0, 1); transform: matrix3d(0.9916, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30.75275, 0, 0, 1); }
	20% { -webkit-transform: matrix3d(0.99541, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 28.10141, 0, 0, 1); transform: matrix3d(0.99541, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 28.10141, 0, 0, 1); }
	21.666667% { -webkit-transform: matrix3d(0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 23.98271, 0, 0, 1); transform: matrix3d(0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 23.98271, 0, 0, 1); }
	23.333333% { -webkit-transform: matrix3d(0.99936, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 19.40752, 0, 0, 1); transform: matrix3d(0.99936, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 19.40752, 0, 0, 1); }
	25% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 14.99558, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 14.99558, 0, 0, 1); }
	26.666667% { -webkit-transform: matrix3d(1.00021, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11.08575, 0, 0, 1); transform: matrix3d(1.00021, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11.08575, 0, 0, 1); }
	28.333333% { -webkit-transform: matrix3d(1.00022, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 7.82507, 0, 0, 1); transform: matrix3d(1.00022, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 7.82507, 0, 0, 1); }
	30% { -webkit-transform: matrix3d(1.00016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5.23737, 0, 0, 1); transform: matrix3d(1.00016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5.23737, 0, 0, 1); }
	31.666667% { -webkit-transform: matrix3d(1.0001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.27389, 0, 0, 1); transform: matrix3d(1.0001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.27389, 0, 0, 1); }
	33.333333% { -webkit-transform: matrix3d(1.00005, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.84893, 0, 0, 1); transform: matrix3d(1.00005, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.84893, 0, 0, 1); }
	35% { -webkit-transform: matrix3d(1.00002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.86364, 0, 0, 1); transform: matrix3d(1.00002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.86364, 0, 0, 1); }
	36.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.22079, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.22079, 0, 0, 1); }
	38.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.16687, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.16687, 0, 0, 1); }
	40% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.37284, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.37284, 0, 0, 1); }
	41.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.45594, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.45594, 0, 0, 1); }
	43.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.46116, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.46116, 0, 0, 1); }
	45% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.4214, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.4214, 0, 0, 1); }
	46.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.35963, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.35963, 0, 0, 1); }
	48.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.29103, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.29103, 0, 0, 1); }
	50% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.22487, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.22487, 0, 0, 1); }
	51.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.16624, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.16624, 0, 0, 1); }
	53.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.11734, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.11734, 0, 0, 1); }
	55% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.07854, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.07854, 0, 0, 1); }
	56.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.04909, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.04909, 0, 0, 1); }
	58.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.02773, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.02773, 0, 0, 1); }
	60% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.01295, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.01295, 0, 0, 1); }
	61.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00331, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00331, 0, 0, 1); }
	63.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.0025, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.0025, 0, 0, 1); }
	65% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00559, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00559, 0, 0, 1); }
	66.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00684, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00684, 0, 0, 1); }
	68.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00692, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00692, 0, 0, 1); }
	70% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00632, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00632, 0, 0, 1); }
	71.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00539, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00539, 0, 0, 1); }
	73.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00436, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00436, 0, 0, 1); }
	75% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00337, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00337, 0, 0, 1); }
	76.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00249, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00249, 0, 0, 1); }
	78.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00176, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00176, 0, 0, 1); }
	80% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00118, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00118, 0, 0, 1); }
	81.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00074, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00074, 0, 0, 1); }
	83.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00042, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00042, 0, 0, 1); }
	85% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00019, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00019, 0, 0, 1); }
	86.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00005, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.00005, 0, 0, 1); }
	88.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1); }
	90% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00008, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00008, 0, 0, 1); }
	91.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0001, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0001, 0, 0, 1); }
	93.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0001, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.0001, 0, 0, 1); }
	95% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00009, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00009, 0, 0, 1); }
	96.666667% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00008, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00008, 0, 0, 1); }
	98.333333% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00007, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.00007, 0, 0, 1); }
	100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
}

.ns-effect-slide.ns-hide {
	-webkit-animation-name: animSlide;
	animation-name: animSlide;
	-webkit-animation-duration: 0.25s;
	animation-duration: 0.25s;
}

@-webkit-keyframes animSlide {
	0% { -webkit-transform: translate3d(-30px,0,0) translate3d(-100%,0,0); }
	100% { -webkit-transform: translate3d(0,0,0); }
}

@keyframes animSlide {
	0% { -webkit-transform: translate3d(-30px,0,0) translate3d(-100%,0,0); transform: translate3d(-30px,0,0) translate3d(-100%,0,0); }
	100% { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); }
}
```

Open the `growl-effects-slide-in.html` by clicking on the `Slide in` button.
This file has the notification style set to slide hence it will implement the `slide in` effect.
The effect is displayed in the GIF shown below:

![Slide-in effect gif](slide-in-effect-gif.gif "Slide-in effect gif")

- Finally, in the file, add the Fly Up effect.
This effect can be seen on the `growl-effects-genie.html` file accessed by clicking on the  `Genie` button.
The code for this is shown below:

```css
/* Fly up */
.ns-effect-genie {
	top: auto;
	bottom: 30px;
	background: #1c2e2d;
	box-shadow: 0 7px 6px rgba(0,0,0,0.2), 2px 4px 6px rgba(0,0,0,0.5);
}

.ns-effect-genie .ns-close::after,
.ns-effect-genie .ns-close::before {
	background: #0eada0;
}

.ns-effect-genie .ns-close:hover::after,
.ns-effect-genie .ns-close:hover::before {
	background: #fff;
}

.ns-effect-genie.ns-show,
.ns-effect-genie.ns-hide {
	-webkit-animation-name: animGenie;
	animation-name: animGenie;
	-webkit-animation-duration: 0.4s;
	animation-duration: 0.4s;
}

@-webkit-keyframes animGenie {
	0% { opacity:0; -webkit-transform: translate3d(0,calc(200% + 30px),0) scale3d(0,1,1); -webkit-animation-timing-function: ease-in; }
	40% { opacity:0.5; -webkit-transform: translate3d(0,0,0) scale3d(0.02,1.1,1); -webkit-animation-timing-function: ease-out; }
	70% { opacity:0.6; -webkit-transform: translate3d(0,-40px,0) scale3d(0.8,1.1,1); }
	100% { opacity:1; -webkit-transform: translate3d(0,0,0) scale3d(1,1,1); }
}

@keyframes animGenie {
	0% { opacity:0; -webkit-transform: translate3d(0,calc(200% + 30px),0) scale3d(0,1,1); -webkit-animation-timing-function: ease-in; transform: translate3d(0,calc(200% + 30px),0) scale3d(0,1,1); animation-timing-function: ease-in; }
	40% { opacity:0.5; -webkit-transform: translate3d(0,0,0) scale3d(0.02,1.1,1); -webkit-animation-timing-function: ease-out; transform: translate3d(0,0,0) scale3d(0.02,1.1,1); animation-timing-function: ease-out; }
	70% { opacity:0.6; -webkit-transform: translate3d(0,-40px,0) scale3d(0.8,1.1,1); transform: translate3d(0,-40px,0) scale3d(0.8,1.1,1); }
	100% { opacity:1; -webkit-transform: translate3d(0,0,0) scale3d(1,1,1); transform: translate3d(0,0,0) scale3d(1,1,1); }
}


@media screen and (max-width: 25em) {
	.ns-growl {
		top: 10px;
		left: 10px;
		right: 10px;
		max-width: none;
	}

	.ns-effect-slide,
	.ns-effect-genie {
		top: auto;
		bottom: 10px;
	}
}
```

![genie effect gif](genie-effect-gif.gif "genie effect gif")

### Normalize the webpages
Copy and paste the content of `normalize.css` file from [here](https://github.com/prograte/Genie-Slide-in-Jelly-and-scale-Pop-up-Notification-effects/blob/main/css/normalize.css). Do this by copy-pasting the code directly or viewing it as a _RAW_ file before copy-pasting it.

The code in the file styles the webpage elements to look well.
It is additional formatting to make the webpage look appealing to other browsers.

In case of any issues, find the code for the article in [this](https://github.com/prograte/Genie-Slide-in-Jelly-and-scale-Pop-up-Notification-effects) repository. Modify it to create desired outputs for projects.


![changing color template](changing-color-template.png "changing color template")

>Use [coolors.co](https://coolors.co/) to generate color templates for more visually appealing sites. 

### Conclusion
In the article, the reader learned the folllowing:
- Creating a web structure for a notification
- Formatting the webpage
- Adding a notification trigger event
- Adding a notification to the webpage
- Changing the type of notifications
- Changing the colors of the site according to the templates created.

