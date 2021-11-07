---
layout: engineering-education
status: publish
published: true
url: /page-visibility-api/
title: Getting Started with the Page Visibility API
description: In this tutorial, we will learn the basics of the Page visibility API by building a simple video playback controls webpage utilizing the HTML5 video tags.
author: wilson-gichuhi
date: 2021-03-01T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/page-visibility-api/hero.jpg
    alt: Implement a custom scrollbar on a web page using CSS
---
When we use browser tabs to browse the web pages, there is a chance that some (or most) of the tabs will not visible to the user at once. The Page Visibility API is a browser API that provides a way to determine which browser tabs are currently active or idle.
<!--more-->
This is useful when we need to reduce resources consumed by background tasks and improve the browsing user experience. In this tutorial, we will cover the basics of the Page visibility API by building a simple web page utilizing the HTML5 video tags.

### Prerequisites
To follow this tutorial along, the reader will need:
1. A basic understanding of the [JavaScript](https://www.w3schools.com/js/js_intro.asp) language and [HTML](https://www.w3schools.com/html/html_intro.asp) will be needed.
   
2. A code editor, preferably [VS Code](https://code.visualstudio.com/Download).
   
3. We will require a browser. I will be using [Google Chrome](https://www.google.com/chrome/).
   
### Objectives
By the end of this tutorial:
- We will learn how to use HTML5 media tags, particularly the video tag.
- We will learn how the JavaScript Page visibility API works to control various features in our applications.
- We will look at the API in action by building a simple web page that controls video playback depending on the tab idleness. 
- We will look at the advantages of utilizing the API to gain optimal web experience. 

### Introduction to the Page Visibility API
The Page Visibility API is a browser interface that tells your JavaScript application if the page is visible to the user or running in the background.

It has several features that are accessible via the `document` object:
- `document.hidden` is an attribute that will return a boolean value, it is true when the tab is hidden or false when the tab is visible.
  
- `document.visibilityState` will return a string that denotes the current tab visibility state. The values can be `hidden`, `visible` or prerender.
  
- `visibilitychange` is an event that is fired when the user switches to another tab. The API emits this event when a user leaves or restores to a certain tab. The API lets the listeners detect visibility state of the window or tab changes and perform different actions depending on this state.

Below is an example code snippet that listens for a tab visibility state and logs a message on the browser console.
```javascript 
       document.addEventListener("visibilitychange",()=>{
           if(document.visibilityState==="hidden"){
               console.log(" >> This window is hidden")
           }
           else{
               console.log(" >> This window is visible")
           }
       })
```

More about the Page Visibility API can be found in [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

### Common uses of the Page Visibility API
Not every user has access to fast internet speeds, by building your applications in a way that favors everyone even when the application is running in the background can be beneficial. 

I find the Page visibility API useful as its results in a power-efficient application and an improved performance while utilizing fewer resources by letting the application avoid un-necessary tasks when running in the background.

Some common uses of this API include:
1. The Page Visibility API is used to control the web media. Images and videos are common on the web these days. We may cancel network requests if the user is not viewing the web page to reduce network bandwidth. Alternatively, we can fetch the incomplete images or videos to give a completely loaded site when active again. This depends on what you want to achieve for your sites. In later sections of this article, I will demonstrate how to use this API by designing a simple web page that automatically pauses video playback if the window tab is idling in the background and resumes when active again.
   
2. Asynchronous loading with [webpack](https://webpack.js.org/). When the user is not viewing our page, we could request to download the remainder of our application's bundle using the webpack `dynamic import()` and cache the assets so that they are available when the tab is active again. You can follow up more on the webpack dynamic import [here](https://webpack.js.org/guides/code-splitting/).
   
3. Controlling the visibility state of an `iframe`, adverts, and animations. We can decide to display adverts or animations when the user is currently viewing the application.

4. The API is used to cancel time-based events when the browser tab is idle to improve performance. An example would be canceling the poll to the database calls to update an admin dashboard if the tab window is idle.
   
5. A common practice in web (especially in real-time) applications is to suspend web sockets and EventSource connections to the server and resume when the tab is active. This can be beneficial on mobile devices where the battery life and data bandwidth are limited.
   
6. Timers like the `setTimeout()` can be throttled in the background tabs to reduce resources and optimize the web experience.

### Designing the application
In this tutorial, we will write a simple JavaScript code that detects idle browser tabs to determine whether to play or pause a video. This is helpful to users as it helps save the bandwidth consumed by background tasks. 

First, create a folder named `video-site` and add two files named `index.html` and `app.js`. We will also add a folder inside our `video-site` folder named `videos` for our video. Grab any one of your videos on your machine to follow along.

I will start by writing the code in the `index.html` file:
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Using Page Visibility API</h1>

    <video id="video" controls>
        <source id="mp4" src="/videos/my_video.mp4"  type="video/mp4" />
        <p>Your Browser does not support HTML videos.</p>
    </video>

<script src="app.js" defer></script>
</body>
</html>

```

The HTML code is very straightforward. We have an embedded video tag in it, a `<h1>` tag as the header, and a link pointing to our script.

Let's now code the script to observe our tabs and determine whether to play or pause our video. 

Here is the API in action.

```JavaScript
        const video = document.querySelector("video")

       document.addEventListener("visibilitychange",()=>{
           if(document.visibilityState==="hidden"){
               console.log(" >> This window is hidden")
               video.pause()
           }
           else{
               console.log(" >> This window is visible")
               video.play()
           }
       })
``` 

The `document.querySelector()` will grab the video DOM element and assign it to the variable named `video`. We are then creating an event listener using the window property `document.addEventListener()` to the `visibilitychange` event that detects whether the browser tab has changed. 

Inside our callback function, the `if` and `else` condition statements will update the state playback as required while logging a message on the console.

To test this, start the video and then navigate to a new tab. The video should pause immediately and start when the tab is active.
> Note: Some mobile browsers will not allow automatic playback when you navigate to another tab until the user clicks the play button.

Check out the deployed application [here](https://video-playback-detector.netlify.app/) and the application source code on this [GitHub repository](https://github.com/ReactifyStudio/Detecting-Idle-Browser-Tabs).

### Conclusion
With multi-tab as the norm of surfing the web, we can deliver an improved user experience using this API to cut down background tasks and network activities. This article introduced you to the API by building a video controls playback web page. 

You can check out the [visibility.js](https://github.com/evilmartians/visibility.js) library that gives you the features to watch these interactions. This concludes my article. 

I hope you find other useful ways to optimize your applications using this API. 

Happy coding.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
