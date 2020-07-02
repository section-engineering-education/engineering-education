# Chrome Extensions for Dummies

I’ve been using chrome extensions religously for years. Yet, I never ever had a clue how to make one. I tried for the first time a week ago and it took 6 hours of frustration to build something that, at its core, was just grabbing all the text from a webpage. Part of that was because most of the tutorials I tried to follow were geared for things either too simple or too complex.
Though, after understanding what parts go into it, I have taken a deep sigh of relief because really… it is way less intimidating than it looks.

Extensions have the power to let you use code that you've developed for your own use locally and expand that to virtually any application on the web. You can access all the information about a website and use that to make your code to do some really cool things. Chrome Extensions are a great solution to the problem of having great code but no where to use it easily.

I am going to show you all how to make a basic extension that changes all the text on your page to “Foot”

I know this sounds really strange, but the core concepts will allow you to build off this and make any chrome extension that involves taking data/text from the page, running a script on it(or not) and replacing/altering it with something of your choosing. Pretty powerful!

### Getting Started
First you’re going to make a directory to hold all these files. Later on you will drag this folder into the extensions interface to make it usable to you. Make sure all your files are in this folder!

`mkdir my-chrome-extension`
`cd my-chrome-extension`

This command will make a directory called **my-chrome-extension and enter you in that directory.**

Next we will create our `manifest.json` file.

`touch manifest.json`

This file is required to make any chrome extension usable. It contains all the information needed for configuration, like the files that are used for the popup, the name of the extension, the permissions etc. It’s important!! If you get permissions errors later on, it’s most likely because something here was done incorrectly.

<pre><code>{
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
}</code>
</pre>
<script src="https://gist.github.com/riathakkar/1b2edd235b8e1e749893a9430549fcc4.js"></script>

The required elements in this are:
- manifest_version
- name
- description

The **browser_action** attribute contains the things that the browser will show the world about your extension. It can contain an icon, tooltip, badge or a popup. Later on we will be adding functionality for the popup. Right now we’ve just added the icon.

The **permissions** attribute contains what the extension is allowed to access. In this case our extension will be requesting access to the activeTab or whatever tab we are currently on.

Let’s test out to see if we have made our `manifest.json` correctly.

Navigate to `chrome://extensions`.

![image title](chrome-extension-developer-mode-off.png)

Tick the developer mode switch and your toolbar will look like this.

![image title](chrome-extension-developer-mode-on.png)

Hit the Load unpacked button and select the folder that we have been working in. If all goes well it will load and it will appear in the chrome extensions toolbar on the upper right portion of your screen.

![image title](chrome-extension-toolbar.png)

Yay! We did it! Very cool. Now to actually add some functionality into this pretty little button.

### Starting to Code(popups!)

Lets create the file that dictates how the popup will appear.

`touch popup.html`

Think of the popup as a little mini webpage hidden away inside that foot icon.

As with everything in chrome extensions, if we want to link another file we have to reference it in the `manifest.json`

<script src="https://gist.github.com/riathakkar/8456b4462476222de3042697145138bd.js"></script>

Here we reference it in **browser_action** which tells the browser that when someone clicks on our icon, the popup is popup.html It will hold all of the UI elements for our popup.

<script src="https://gist.github.com/riathakkar/c9dc495719892337f3c95ca63b9fe0aa.js"></script>

Here we are referencing a javascript file called `popup.js` This file will contain the logic for `popup.html`

Remember to keep this in the same directory

`touch popup.js`

Since this is only referenced by `popup.html`, we don’t have to reference it in `manifest.json`

<script src="https://gist.github.com/riathakkar/0a475f472796a2b372eea339dacbff2d.js"></script>

We use `addEventListener` to make sure the popup is loaded and the button is clicked, before we execute any of our code.
Follow the steps to load up your extension again, hit update and click on your icon!

![image title](popup.png)

Hit the **Change Text** button and if you did everything correctly an alert should congratulate you on your screen.

![image title](working-popup.png)

### Grabbing Text off the Webpage

Next we are going to grab all the text off the webpage in every html tag.This is actually a really simple phrase that took me forever to find. You can test it out for yourself on this site by right clicking on your screen, hitting inspect and finding the console.

Then type `document.all[0].innerText`

Cool Right!

For this example we are going to use `document.body.innerText` as it only grabs the text with the `<body>` tags.

In order to get this information though we need to utilize message passing between the popup and the webpage itself. If you think about it, the popup thinks it is its own little website. It knows nothing about the webpage we are on. We can change this by adding a **content_scripts** attribute to our `manifest.json`

With the additions, our `manifest.json` will look something like this.

<script src="https://gist.github.com/riathakkar/42f5591563c2298aa729ae8644837c88.js"></script>

The **content_scripts** attribute takes in two items here
- matches — tells you what pages the scripts will be injected to/used on. Here it is all URLS
- js — tells us which scripts will be injected into the webpages

Since we have referenced a `content.js` it’s time to make it.

`touch content.js`

`content.js` will allow us to communicate with the webpage and get information from it. However, it doesn’t have access to the popup at all so we have to send a message to it to signal we want something from the webpage. After we send it a message, we have to send a response back from `content.js` to `popup.js`

First let’s edit our `popup.js` file to send a message to `content.js` to change the webpage.

<script src="https://gist.github.com/riathakkar/2f741b6e7f061d3accb6af04f7b2b3d7.js"></script>
<pre><code>This is a code block.
</code></pre>

`chrome.tabs` references the tabs api. The `chrome.tabs.query` call will look through all the tabs and return back the tabs that fit the parameters used to make the call. As we can see, our call is trying to fetch the `activeTab`.

`sendMessage` will then send a message to our `content.js` script. The response will then be processed by the function and an alert will popup on our screen letting us know we have succeeded!

<script src="https://gist.github.com/riathakkar/2296d656cf2ee80641503f78d0e41907.js"></script>

Here we send a response back to the calling script, in this case `popup.js`

The code here will only activate if `changePage` is the method argument passed in. This gives you room to add more methods in your `popup.js` to do different things in `content.js` For example, passing in a random method called `playVideo`, simply add another if statement into `content.js` that adds the functionality you need.

We’ve also made this code in such a way that the response from the request is all the text on the webpage. Change your `popup.js` to this to see all the text on the webpage in the alert that’s generated.

<script src="https://gist.github.com/riathakkar/376f409d9ac710ad65b44f3f99f0d84d.js"></script>

### Congratulations!
You’ve made your first chrome extension! In my next article I’m going to write more about a concept in Message Passing called portals. This allows you send multiple requests in quick succession from your `popup.js` to your `content.js`

Although simple and it gets the job done, this form of one time message passing is only good for certain types of applications like this one where a message only needs to be sent when a button is pressed.

Please comment below if you have any questions and follow this link for the [Chrome Extension Documentation](https://developer.chrome.com/extensions/devguide). It’s pretty helpful and you can use it to extend this chrome extension with new functionalities. You’ve gotten set up with the basics :)
