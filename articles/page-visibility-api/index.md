We mostly use browser tabs to browse the web pages. This gives a chance that most of this tabs may not be visible to the user while they still consume resources in the background.
The Page visiblity API is a browser API that provides a way to determine which browser tabs are currently active or idle.
This is useful in when we need to reduce resources running in background tasks which improves experience and browsing user experience. In this tutorial, we will learn the basics of the Page visibility API by building a simple web page utilizing the HTML5 videos.

### Prerequisites
1. A basic of [JavaScript](https://www.w3schools.com/js/js_intro.asp) language and [HTML](https://www.w3schools.com/html/html_intro.asp) is needed.
   
2. A code editor, preferably [VS Code](https://code.visualstudio.com/Download).
   
3. You will require a browser. I will be using the [Google Chrome](https://www.google.com/chrome/).
   
### Objectives
By the end of this:
- We will learn some basics of using HTML5 media tags, particularly the video tag.
  
- We will also learn how the JavaScript Page visibilty API works to control various features in our applications.
  
- We will look at the API in action by building a simple web page that controls video playback depending on the tab idleness. We will also look at the advantages of utilizing the API to gain optimal web experience. 

### Introduction to the Page Visibility API

The Page Visiblity API is a browser interface that tells your JavaScript application if the page is visible to the user or running in the background.
It has several features that are accessible via the `document` object:
- `document.hidden` is an attribute that will return a boolean value, it is true when the tab is hidden or false when the tab is visible.
  
- `document.visibilityState` will return a string that denotes the current tab visibility state. The values can be `hidden`, `visible` or prerender.
  
- `visibilitychange` is an event that is fired when the user switches to another tab. The API fill emit this event when user leaves or restores to a certain tab. It lets the listeners know the current visibility state of the window or tab changes and perform different actions depending on this state.
Below is an example code that listens for a tab visibility state and logs a message on the browser console.
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
More about the Page Visibility API can be found in [mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

### Common uses of the Page Visibility API
Considering that not everyone has fast internet speeds, building your applications in a way that favours everyone even when the application is running in the background can benefit your users. I find the Page visibility API useful as its end result is a power efficient apllication and an improved performance while utilizing less resources by letting the application avoid un-necessary tasks when running in the background.
Some common uses of this API include:

1. The Page Visibility API can be used to control the web media. Images and videos are common on web this days. We can cancel network requests to fetch images and videos if the user is not viewing the web page and threfore reducing network bandwith. Alternatively, we can also fetch the incomplete images or videos so that when the user comes back, they will see a complete loaded page. This depends on what you want to achieve for your sites. In later sections of this article, I will demonstrate how to use this API by designing a simple web page that automaticaally pauses video playback if a the window tab is idling in the background and resumes when the tab is active again.
   
2. Asynchronous loading with [webpack](https://webpack.js.org/). When the user is not viewing our page, we could make a request to dwonload the remainder of our application's bundle using the webpack `dynamic import()` and cache the assets so that they are available when the tab is active again. Check more on webpack dynamic import [here](https://webpack.js.org/guides/code-splitting/.
   
3. Controlling the visibility state of an `iframe`, adverts and animations. We can decide to not display adverts or animations if the user is not currently viewing our application.

4. It can be used to cancel time based events when the browser tab is idle to improve performance. An example is cancelling the poll to the database calls to update an admin dashboard if the tab window is idle.
   
5. A common practice in web especially in real time applications is to suspend web sockets and EventSource connections to the server and resume when the tab is active to the user. This can be beneficial on mobile devices where the battery life and data bandwidth are limited.
   
6. Timers like the `setTimeout()` can be throttled in the background tabs to reduce resources and optimize the web experience.


### Designing the application
In this tutorial, I am going to write a simple JavaScript  code that detect idle browser tabs to determine whether to play or pause a video. This is helpful to users as it helps save the bandwidth consumed by background tasks. First, create a folder named `video-site` and add two files namely, an `index.html` and `app.js`. We will also add a folder inside or `video-site` folder named `videos` which will have our video. Grab one of your video in your machine to follow along.

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
        <p>Your Browser does not support HTML videos</p>
    </video>

<script src="app.js" defer></script>
</body>
</html>

```
The HTML code is very straightforward. We have an embedded video tag in it, a `<h1>` tag as the header and a link pointing to our script.

Let us now code the script to observe our tabs and determine whether to play or pause our video. Here is the API in action.
```javascript
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
The `document.querySelector()` will grab the video DOM element and assign it to the variable named `video`. We are then creating an event listener using the window property `document.addEventListener()` to the `visibilitychange` event that will detect whether the browser tab has changed. Inside our callback function, the `if` and `else` condition statements will update the state playback as required while logging a message on the console.
To test this, start the video and then navigate to a new tab. This should make it pause immediately and make it start when you go back on the tab that is running this application.
> Note: Some mobile browsers will not allow automatic playback when you navigate to another 
> tab until the user clicks the play button.

Check out the deployed application [here](https://video-playback-detector.netlify.app/) and the application source code on this [github repository](https://github.com/ReactifyStudio/Detecting-Idle-Browser-Tabs).

### Conclusion
With multi-tab as the norm of surfing the web, we can deliver an improved user experience by using this API to cut down background tasks and network activities. This article introduced you to the API by building a video controls playback web page. You can check out the [visibility.js](https://github.com/evilmartians/visibility.js) which is an awesome library that gives you the features to watch these interactions. This concludes my article, I hope you find other useful ways to optimize your applications using this API. 