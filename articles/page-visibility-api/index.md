We mostly use browser tabs to browse the web pages. This gives a chance that most of this tabs may not be visible to the user.
While they still consume resources in the background. The Page Visibility API is useful for improving performance and reducing resources for background tasks. 
The Page visiblity API is a browser API that provides a way to determine which browser tabs are currently active or idle.
This is useful in ...
In this tutorial, we will learn the basics of the Page visibility API by building a simple web page utilizing the HTML5 videos.
Depending on the current tab, we will pause or play the video.

### Introduction to the Page Visibility API
The Page Visiblity API is a browser interface that tells your JS app if the page is visible to the user or running in the background.
It provides an event `visiblityChange` and two properties accessible via the document object as document.hidden and
document.visiblityState.
Useful for saving resourcesand improved performance by letting page avoid the un-necessary tasks when doc isn't visible.
When users switches to another tab, the API emits the `visibiltyChange` event.The same event is emitted when users restores to the tab. Depending on the visiblity state, we can perform some actions or behave differently.
Common uses includes.
The following e,g listens for a tab visibilty change and log out a msg


-- visiblitychange --event that allows listeners to know the current visiblity state of the window or tab when changed.
-- visibilityState -- Denotes the current window or tab's current visiblity state. Valid values are hidden, visible or prerender
-- hidden ---> An attribute that returns a boolean value, true when tab is hidden ,false when tab is visible

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Page Visibility API</h1>

    <script>
       document.addEventListener("visibilitychange",()=>{
           if(document.visibilityState==="hidden"){
               console.log(" >> This window is hidden")
           }
           else{
               console.log(" >> This window is visible")
           }
       })
    </script>
</body>
</html>
```

We will pause the videos playback as soon as the tab becomes hidden or inactive
Helps users save bandwith on content they're not viewing

Embed a simple HTML video tag
```HTML
<video controls>
    <source type="video/mp4" src="./videos/my_video.mp4">

```

Create an event listener to the `visibilityChange` event that will detect whether the browser tab/window has changed
and updates the state playback as required.


### Building 

This
HTML
JS


### Conclusion



