We mostly use browser tabs to browse the web pages. This gives a chance that most of this tabs may not be visible to the user while they still consume resources in the background.
The Page visiblity API is a browser API that provides a way to determine which browser tabs are currently active or idle.
This is useful in when we need to reduce resources running in background tasks which improves experience and browsing user experience. In this tutorial, we will learn the basics of the Page visibility API by building a simple web page utilizing the HTML5 videos.

### Prerequisites
1. A basic of [JavaScript]() language and [HTML]() is needed.
   
2. A code editor, preferably [VS Code].
   
3. You will require a browser. I will be using the [Google Chrome]().
   
### Objectives
By the end of this:
- We will learn some basics of using HTML5 media tags, particularly the video tag.
  
- We will also learn how to use JavaScript Page visibilty API to control various things features in our applications.
  
- We will look at the API in action by building a simple web page that controls video playback depending on the tab idleness. We will also look at the advantages of utilizing the API to gain optimal web experience. 

### Introduction to the Page Visibility API

The Page Visiblity API is a browser interface that tells your JavaScript application if the page is visible to the user or running in the background.
It has several features that are accessible via the `document` object:
- `document.hidden` is an attribute that will return a boolean value, it is true when the tab is hidden or false when the tab is visible.
  
- `document.visibilityState` will return a string that denotes the current tab visibility state. The values can be `hidden`, `visible` or prerender.
  
- `visibilitychange` is an event that is fired when the tab visibility changes. It lets the listeners know the current visibility state of the window or tab has changed.

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

### Importance of the Page Visibility API
considering that not evryone has fast internet speeds considering your application even when running the background can benefit the user by only shipping what they need.
1. Pausing video or audio playback.
2. Asynchronous loading with web pack.
3. Controlling the visibility state of an `iframe`
4. Cancelling time based events when the browser tab is idle to improve performance

Useful for saving resourcesand improved performance by letting page avoid the un-necessary tasks when doc isn't visible.
When users switches to another tab, the API emits the `visibiltyChange` event.The same event is emitted when users restores to the tab. Depending on the visiblity state, we can perform some actions or behave differently.
Common uses includes.
The following e,g listens for a tab visibilty change and log out a msg


This can be a simple script that listens on the `visibilitychange` event to detect whether the user is active on the tab.


We will pause the videos playback as soon as the tab becomes hidden or inactive
Helps users save bandwith on content they're not viewing

Embed a simple HTML video tag
```HTML
<video controls>
    <source type="video/mp4" src="./videos/my_video.mp4">

```

Create an event listener to the `visibilityChange` event that will detect whether the browser tab/window has changed
and updates the state playback as required.


### The web page
In this tutorial, I am going to write a simple JavaScript  code that detect idle browser tabs to determine whether to play or pause a video. This is helpful to users as it helps save the bandwidth consumed by background tasks. First, create a folder named `video-site` and add two files namely, an `index.html` and `app.js`.
I will start by writing the code in the `index.html` file:
```HTML


```
Let us now code the script to observe our tabs and determine whether to play or pause our video.
```javascript

``` 
Check the deployed application [here] or the entire source code on my [github repository]().

### Conclusion
With multi-tab as the norm of surfing the web, we can deliver an improved user experience by using this API to cut down background tasks and network activities. This article introduced you to the API by building a video controls playback web page. Check out the [visibility.js](https://github.com/evilmartians/visibility.js) which is an awesome library that gives you the features to watch these interactions. I hope you find other useful ways to optimize your applications using this API. 