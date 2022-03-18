---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-chrome-extension-using-javascript/
title: How to Build a Chrome Extension that Displays Motivational Quotes Using Javascript
description: This article will guide you through the process of building a chrome extension that displays motivational quotes as notifications using javascript.
author: muhammed-umar
date: 2021-11-30T00:00:00-19:30
topics: [API, Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-chrome-extension-using-javascript/hero.jpg
    alt: Chrome Extension Quotes JavaScript example image
---
Every Chrome extension that exists on the Chrome web store performs a specific task. Over the years, I have had to install a couple of extensions that either helped me accomplish tasks at work, or enabled me to maximize productivity.
<!--more-->
Having used the Pomodoro timer extension for the last few months, I noticed a steep increase in productivity. So I thought to myself, "I am going to build something similar" - a Chrome extension that will display motivational quotes at scheduled intervals.

Luckily, the official Chrome documentation helped me understand the concepts I needed to get started with building what I wanted. Chrome extensions are relatively easy to develop, and you can create them locally on your machine and have them interact with any page on the web. 

Think of them as small applications residing on the browser and with their help we can access information about a website, and build awesome things with them. In this tutorial, we are going to build a Chrome extension using Javascript. 

Its major functionality will be to display random motivational quotes from an API. You will learn about the core concepts used in this work, and this will just be sufficient to enable you to build something similar or even more complex.

### Prerequisites
To better understand and build along with this tutorial you should have:
- The Chrome browser installed.
- A code editor (VS Code in my case).
- Some knowledge of JavaScript and its syntax.
- Your desktops notification turned on - this is where our motivational quotes will be displayed.

### Table of contents
- [Getting started](#getting-started)
- [Adding icons](#adding-icons)
- [Functionality](#functionality)
- [Creating the background script](#creating-the-background-script)
- [background.js](#backgroundjs)
- [Adding permissions](#adding-permissions)
- [Fetching random quotes from the API](#fetching-random-quotes-from-the-api)
- [Calling the quotes at intervals](#calling-the-quotes-at-intervals)
- [Creating notifications](#creating-notifications)
- [What to do?](#what-to-do)
- [Conclusion](#conclusion)
- [References](#references)

### Getting started
To get started we will need to create a directory to hold the extension's files on our local machine.

Using the Windows command prompt we can type in the following:

```bash
mkdir Random-Quote-Extension
cd Random-Quote-Extension
code .
```

The first line creates a new folder in our machine, the second line helps navigate into the folder we just created, and the last line opens up the just created folder in Visual studio code.

Next, we will create a `manifest.json` file and add the following codes to make it look like so:

```json
{
  "name": "Random Quote Extension for Chrome",
  "description": "A Chrome Extension that shows random quotes as notification",
  "version": "1.0.0",
  "manifest_version": 3
}
```

The `manifest.json` file contains important information about the extension.

- The `name` field contains information about the title of the extension we are building - Random Quote Extension.
- The `description` field as the name implies gives a brief description of the functionality of the extension.
- The `manifest_version` field tells us the current version we are building with. Make sure you use 3.0 as the previous version (2.0) is deprecated.
- Also, it is nice to start with a `version` that is small, you may want to update your extension as time passes. I'll go with 1.0 for now.

Now that we have our manifest file setup, let us add the directory as an extension in developer mode in our Chrome browser.

Navigate to the extensions management page by clicking on the extensions menu button at the top right of the browser, and selecting manage extensions at the bottom of the menu.

You should see a page like this:

![developer](/engineering-education/how-to-build-a-chrome-extension-using-javascript/developer.png)

Toggle on the developer mode and click on the load unpacked button. This opens your local machine directories and prompts you to choose the directory you would like to load as an extension.

Alright! You should see something similar to the image below:

![unpacked](/engineering-education/how-to-build-a-chrome-extension-using-javascript/unpacked.png)

We now have the extension listed amongst our previously installed extensions. Although, you'll notice yours does not have a custom icon.

Let's fix that right away.

### Adding icons
To attach customized icons to the toolbar, we create the action field to house the default icon field which contains our desired images. Also, to display these icons on the extension management page that shows favicon, we attach a new field called icons.

Its elements are the same images the default icon uses. You can access these images on my [GitHub repo](https://github.com/deverten/RandomQuoteExtension/tree/main/images).

Go ahead and update the `manifest.json` file to look like this:

```json
{
  "name": "Random Quote Extension for Chrome",
  "description": "A Chrome Extension that shows random quotes as notification",
  "version": "1.0.0",
  "manifest_version": 3,
  "action": {
    "default_icon": {
      "16": "/images/favicon-16x16.png",
      "48": "/images/android-chrome-512x512.png",
      "128": "/images/android-chrome-192x192.png"
    }
  },
  "icons": {
    "16": "/images/favicon-16x16.png",
    "48": "/images/android-chrome-512x512.png",
    "128": "/images/android-chrome-192x192.png"
  }
}
```

You might have noticed the fields "16", "48", and "128". They are the pixel sizes for each image (ignore my naming conventions for the images). If you are making a custom icon you will need to resize your images to meet the standards - (16px by 16px, 48px by 48px, 128px by 128px).

Reload the extension and watch the icons take effect in the toolbar and extension management page.

### Functionality
We now have a Chrome extension installed with no functionality. That, we will in a moment, but for clarity, I would like us to highlight the functionalities we expect of the extension.

That would be to:
- Fetch data from an API.
- Schedule continuous API calls at timed intervals.

Awesome! We can go ahead and implement these but first, let us create the background script.

### Creating the background script
Extensions are composed of various components created with basic web technologies: HTML, CSS, and JavaScript. Components include `background scripts` `content scripts` `options page` and a few others.

Depending on the intended functionality of the extension, we may not need to use every component. I would recommend going through the [documentation](https://developer.chrome.com/docs/extensions/mv3/getstarted/) if you want a deeper understanding of the concepts.

Let's dive right into creating our `background script` and registering it in our `manifest.json`.

Create a new file and call it `background.js`.

Next, let us register it in our manifest file. If you're wondering why we must do this, think of the manifest as a register where all components are referenced. They also show the expected behavior of the files.

The `manifest.json` file should look somewhat identical to this now:

```json
{
  "name": "Random Quote Extension for Chrome",
  "description": "A Chrome Extension that shows random quotes as notification",
  "version": "1.0.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_icon": {
      "16": "/images/favicon-16x16.png",
      "48": "/images/android-chrome-512x512.png",
      "128": "/images/android-chrome-192x192.png"
    }
  },
  "icons": {
    "16": "/images/favicon-16x16.png",
    "48": "/images/android-chrome-512x512.png",
    "128": "/images/android-chrome-192x192.png"
  }
}
```

The extension now looks out for the `service worker`: `background.js`. When we reload the extension, Chrome will search the background script for important instructions and events and execute them.

### background.js
We want the extension to listen for events when first installed, hence we include a listening event.

The `background.js` should look like so:

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
});
```

### Adding permissions
Chrome provides API's for specific purposes such as storage, bookmarks, cookies, alarm, notifications, etc. To access them we must get permissions, and we do this by registering them under the permissions field in the `manifest.json` file.

We will be needing the `chrome.alarms`, `chrome.notifications`, and `chrome.storage` APIs for our project.

Edit the manifest file to look like this:

```json
{
  "name": "Random Quote Extension for Chrome",
  "description": "A Chrome Extension that shows random quotes as notification",
  "version": "1.0.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage", "alarms", "notifications"],
  "action": {
    "default_icon": {
      "16": "/images/favicon-16x16.png",
      "48": "/images/android-chrome-512x512.png",
      "128": "/images/android-chrome-192x192.png"
    }
  },
  "icons": {
    "16": "/images/favicon-16x16.png",
    "48": "/images/android-chrome-512x512.png",
    "128": "/images/android-chrome-192x192.png"
  }
}
```

### Fetching random quotes from the API
Moving onto the major functionality of the Chrome extension, we will be fetching data from a random quotes API.

Extracting the data using a promise returns a random quote accompanied by the original author of the quote. We can log this to the console to verify that it displays correctly.

We did set up the background script to fire when the extension is installed, hence we want the motivational quotes to be fetched when the browser is active.

The code snippet below shows exactly how we can implement this:

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");

  async function startRequest() {
    const response = await fetch("https://api.quotable.io/random");
    const newData = await response.json();
    const data = `${newData.content} —${newData.author}`;
    console.log(data);
  }
});
```

### Calling the quotes at intervals
I would consider this part the more interesting to implement as I went with the wrong approach at first. Trying to use Javascript's `setInterval()` and `setTimeout()` functions to call the quotes at scheduled intervals.

Somehow, the scheduling of events in browser extensions has not really been explored judging from the limited support I could get from resources online.

The holy grail lies embedded in the [Chrome extension documentation](https://developer.chrome.com/docs/extensions/reference/). 

>You may want to glance through the available list of APIs chrome provides to extensions, to get ideas for your next chrome extension 😜 (pretty fun huh!)

Edit the `background.js` file to look like this:

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");

  // create alarm after extension is installed / upgraded
  chrome.alarms.create("startRequest", { periodInMinutes: 4 });
  startRequest();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  startRequest();
});

async function startRequest() {
  const response = await fetch("https://api.quotable.io/random");
  const newData = await response.json();
  const data = `${newData.content} —${newData.author}`;
  console.log(data);
}
```

The `chrome.alarms.create` creates an alarm. In this case, it is the event of the API call. It takes the name of the alarm (`startRequest`) and `periodInMinutes` as parameters. We make the API call `startRequest()` when the alarm is created.

We then create a listener and call the `startRequest` function. We will go ahead and display the output in our notifications box.

### Creating notifications
The `chrome.notifications` API is used to create interactive notifications which are then displayed to the users in the system tray.

We create an object containing details of the notification. These include the title, message to be displayed, a customized icon, and the type of notification we are creating.

To interact with the notifications you can set the field as true. False is okay as we want the notifications to come and go on their own.

Next, we use `chrome.notifications.create` to create the notifications and call the object `options` as a parameter.

Adding this to `the background.js` file we get:

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");

  // create alarm after extension is installed / upgraded
  chrome.alarms.create("startRequest", { periodInMinutes: 4 });
  startRequest();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  startRequest();
});

async function startRequest() {
  const response = await fetch("https://api.quotable.io/random");
  const newData = await response.json();
  const data = `${newData.content} —${newData.author}`;
  console.log(data);

  var options = {
    title: "Random Quotes",
    message: data,
    iconUrl: "/images/favicon-16x16.png",
    type: "basic",
    // requireInteraction: true
  };
  chrome.notifications.create("", options);
}
```

Finally, our motivational quotes are displayed in the notifications box like so:

![extension](/engineering-education/how-to-build-a-chrome-extension-using-javascript/completed.png)

Now that you have your extension up and running, you may want to publish it on the [Chrome web store](https://developer.chrome.com/docs/webstore/publish/) - you are however required to pay a small fee.

If you decide otherwise you can still share with a few friends, even without publishing on the web-store.

#### What to do?
- Right-click on the folder containing your extension.
- Select `send to compressed(zip)folder` to create a zip file copy.
- Share via any medium to your friends e.g mail, hard drives, etc.
- They can install the extension on their local machines by unzipping the file, then going to the chrome extension management page on their browser and clicking on `load unpacked` as we did in the beginning. This should prompt them to select the unzipped file folder.
- Lastly, they should have their system notifications visible.

### Conclusion
Hooray 🎉🎉 you have learned how to build a simple Chrome browser extension, register components like background script in the manifest file, fetch data from APIs, and how to use the Chrome extension APIs like chrome.alarms and chrome.notifications.

You can now share with friends with or without hosting in the web-store.

I'm excited to see the amazing things you'll build 🚀🚀

Happy coding!

### References
- [Chrome Documentation](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- [Rusty Zone - How to call an API from a chrome extension](https://www.youtube.com/watch?v=7Tu2j2pc87I)
- [The Coding Train - Chrome Extensions](https://www.youtube.com/watch?v=ew9ut7ixIlI)

---

Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
