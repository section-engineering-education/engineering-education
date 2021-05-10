---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-build-chrome-extension/
title: How to Build Your First Chrome Extension
description: This tutorial will provide fundamentals for building your first Chrome extension, empowering you to make any chrome extension that involves taking data/text from the page, running a script on it(or not) and replacing/altering it with something of your choosing.
author: ria-thakkar
date: 2020-07-08T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-chrome-extension/hero.jpg
    alt: chrome extension image example
---
I’ve been using Chrome extensions religiously for years. Yet, I never had a clue how to make one. I recently tried for the first time and it took 6 hours of frustration to build something that, at its core, was just grabbing all the text from a webpage. Part of that was because most of the tutorials I tried to follow were geared for things either too simple or too complex. However, after understanding what parts go into it, I have taken a deep sigh of relief because really… it is way less intimidating than it looks.
<!--more-->

Extensions have the power to let you use code that you've developed for your own use locally and expand that to virtually any application on the web. You can access all the information about a website and use that to make your code do some really cool things. Chrome extensions are a great solution to the problem of having great code but nowhere to use it easily.

In this tutorial, I will show you how to make a basic extension that changes all the text on your page to “Foot”.

This might sounds really strange, but the core concepts will allow you to build off this and make any chrome extension that involves taking data/text from the page, running a script on it(or not) and replacing/altering it with something of your choosing. Pretty powerful!

### Getting Started
First you’re going to make a directory to hold all these files. Later on you will drag this folder into the extensions interface to make it usable to you. Make sure all your files are in this folder!

```
mkdir my-chrome-extension
```
```
cd my-chrome-extension
```

These commands will (first) make a directory called `my-chrome-extension` and then move you to that directory.

Next we will create our `manifest.json` file:

```
touch manifest.json
```

This file is required to make any chrome extension usable. It contains all the information needed for configuration, like the files that are used for the popup, the name of the extension, the permissions, etc. **It’s important!!** If you get a permission error later on, it’s most likely because something here was done incorrectly.

```json
// manifest.json
{
  "manifest_version": 2,

  "name": "Text to Foot",
  "description": "This extension will convert all text on page to the word foot and change the background.",
  "version": "1.0",

  "browser_action": {
   "default_icon": "foot.png"
  },
  "permissions": [
   "activeTab"
 ]
```
The required elements in this are:
- `manifest_version`
- `name`
- `description`

The **`browser_action`** attribute contains the things that the browser will show the world about your extension. It can contain an icon, tooltip, badge or a popup. Later on we will be adding functionality for the popup. Right now we’ve just added the icon.

The **`permissions`** attribute contains what the extension is allowed to access. In this case, our extension will be requesting access to the activeTab or whatever tab we are currently on.

Let’s test to see if we have made our `manifest.json` correctly.

Navigate to `chrome://extensions`

![chrome://extensions toolbar](/engineering-education/how-to-build-chrome-extension/chrome-extension-developer-mode-off.png)<br>
Tick the developer mode switch and your toolbar will look like this:

![chrome:// developer mode](/engineering-education/how-to-build-chrome-extension/chrome-extension-developer-mode-on.png)<br>
Hit the **Load unpacked** button and select the folder that we have been working in. If all goes well, it will load and appear in the chrome extensions toolbar on the upper right portion of your screen.

![The foot is our extension!](/engineering-education/how-to-build-chrome-extension/chrome-extension-toolbar.png)<br>
Yay! We did it! Very cool. Now to actually add some functionality into this pretty little button.

### Starting to Code (popups!)
Lets create the file that dictates how the popup will appear:

```
touch popup.html
```

Think of the popup as a little mini webpage hidden away inside that foot icon.

As with everything in Chrome extensions, if we want to link another file, we have to reference it in the `manifest.json`

```json
// manifest.json
{
  "manifest_version": 2,

  "name": "Text to Foot",
  "description": "This extension will convert all text on page to the word foot and change the background.",
  "version": "1.0",

  "browser_action": {
   "default_icon": "foot.png",
   "default_popup": "popup.html"
  },
  "permissions": [
   "activeTab"
 ]
}
```

Here we reference it in **`browser_action`** which tells the browser that when someone clicks on our icon, the popup is `popup.html`. It will hold all of the UI elements for our popup.

```html
<!-- popup.html -->
<!doctype html>
<html>
  <head>
    <title>Text to Foot</title>
    <script src="popup.js"></script>
  </head>
  <body>
    <h1>Text to Foot</h1>
    <button id="check">Change Text</button>
  </body>
</html>
```

Here we are referencing a JavaScript file called `popup.js`. This file will contain the logic for `popup.html`.

Remember to keep this in the same directory:

```
touch popup.js
```

Since this is only referenced by `popup.html`, we don’t have to reference it in `manifest.json`
```javascript
// popup.js
document.addEventListener('DOMContentLoaded', function() {
  var checkButton = document.getElementById('check');
  checkButton.addEventListener('click', function() {
   alert("Hey your button is working!");
  }, false);
}, false);
```

We use `addEventListener` to make sure the popup is loaded and the button is clicked, before we execute any of our code. Follow the steps to load up your extension again, hit update and click on your icon!

![Should look like this!](/engineering-education/how-to-build-chrome-extension/popup.png)<br>
Hit the **Change Text** button and if you did everything correctly, an alert should congratulate you on your screen.

![Congratulations!](/engineering-education/how-to-build-chrome-extension/working-popup.png)

### Grabbing Text off the Webpage
Next we are going to grab all the text off the webpage in every html tag.This is actually really simple code that took me forever to find. You can test it out for yourself on this site by right clicking on your screen, hitting inspect and finding the console, then type:

```
document.all[0].innerText
```

Cool, Right?!

For this example we are going to use `document.body.innerText` as it only grabs the text within the `<body>` tags.

In order to get this information though, we need to utilize message passing between the popup and the webpage itself. If you think about it, the popup thinks it is its own little website. It knows nothing about the webpage we are on. We can change this by adding a **`content_scripts`** attribute to our `manifest.json`.

With the additions, our `manifest.json` will look something like this:

```json
// manifest.json
{
  "manifest_version": 2,

  "name": "Text to Foot",
  "description": "This extension will convert all text on page to the word foot and change the background.",
  "version": "1.0",

  "browser_action": {
   "default_icon": "foot.png",
   "default_popup": "popup.html"
  },
  "permissions": [
   "activeTab"
 ],
 "content_scripts": [
    {
     "matches": [
       "<all_urls>"
     ],
     "js": ["content.js"]
    }
  ]
}
```

The **`content_scripts`** attribute takes in two items here:
- **`matches`** — tells you what pages the scripts will be injected to/used on. Here it is all URLs
- **`js`** — tells us which scripts will be injected into the webpages

Since we have referenced a `content.js`, it’s time to make it:

```
touch content.js
```

`content.js` will allow us to communicate with the webpage and get information from it. However, it doesn’t have access to the popup at all, so we have to send a message to it to signal we want something from the webpage. After we send it a message, we have to send a response back from `content.js` to `popup.js`.

First, let’s edit our `popup.js` file to send a message to `content.js` to change the webpage:

```javascript
// popup.js
document.addEventListener('DOMContentLoaded', function() {
  var checkButton = document.getElementById('check');
  checkButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "changePage"}, function(response) {
          if(response.method == "changePage"){
            alert("Succeeded with "+response.method);
          }
        });
      });
  }, false);
}, false);
```

`chrome.tabs` references the tabs api. The `chrome.tabs.query` call will look through all the tabs and return back the tabs that fit the parameters used to make the call. As we can see, our call is trying to fetch the `activeTab`.

`sendMessage` will then send a message to our `content.js` script. The response will then be processed by the function and an alert will popup on our screen letting us know we have succeeded!

```javascript
// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "changePage"){
            document.body.innerText = "Foot";
            sendResponse({text: document.body.innerText, method: "changePage"}); //same as innerText
        }
    }
);
```

Here we send a response back to the calling script, in this case `popup.js`.

The code here will only activate if `changePage` is the method argument passed in. This gives you room to add more methods in your `popup.js` to do different things in `content.js` For example, passing in a random method called `playVideo`, simply add another if statement into `content.js` that adds the functionality you need.

We’ve also made this code in such a way that the response from the request is all the text on the webpage. Change your `popup.js` to this to see all the text on the webpage in the alert that’s generated.

```javascript
// popup.js
document.addEventListener('DOMContentLoaded', function() {
  var checkButton = document.getElementById('check');
  checkButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "changePage"}, function(response) {
          if(response.method == "changePage"){
            alert(response.text);
          }
        });
      });
  }, false);
}, false);
```
### Congratulations!
You’ve made your first chrome extension! In my next article I’m going to write more about a concept in Message Passing called portals. This allows you send multiple requests in quick succession from your `popup.js` to your `content.js`

Although simple and it gets the job done, this form of one time message passing is only good for certain types of applications like this one where a message only needs to be sent when a button is pressed.

For more resources, follow this link for the [Chrome Extension Documentation](https://developer.chrome.com/extensions/devguide). It’s pretty helpful and you can use it to extend this Chrome extension with new functionalities. You’ve gotten set up with the basics :)
