title: Section Engineering Education

description: Resources created by engineers for engineers

aliases:
  - '/create-screen-recoder/'
  - '/javascript-screen-recorder/'
type: articles

images:
  - url: /engineering-education/create-screen-recorder-in-javascript/hero.png
    alt: Screen Recorder in JavaScript


### Introduction
The Screen Capture API is used to capture the screen or a part of the screen as a Media Stream. From the recorded Media Stream we can create a video file.

### Prerequisites

To follow along with this tutorial, you should have:

-   A basic understanding of HTML and JavaScript.

-   A code editor. I’ll be using  [Visual Studio Code](https://code.visualstudio.com/download).

-   A browser to view the webpage, preferably  [Google Chrome](https://www.google.com/intl/en_in/chrome/).

### Project directory

Create a new directory for the project and create   `index.html`  and  `recordscreen.js` files.

```bash
screen_recorder_project/
|-index.html
|-recordscreen.js
```

### HTML Page
On the `index.html` page there will be
* Two buttons one to Start Screen Recording another to Stop Screen Recording.
* One `div` to display the recording status, the style for the div is also added in the `index.html` file.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>JavaScript Screen Recorder</title>
        <style>
            .status {
                background: pink;
                font-size: 30px;
                padding: 10px;
                margin : 0;
                margin-bottom: 30px;
                line-height: 40px;
                box-sizing: border-box;
            }
        </style>
    </head>
    <body>
        <div class="status">Record your screen by pressing Start Screen Recording </div>
        <button id="start">Start Recording</button>
        <button id="stop">Stop Recording</button>
        <script src="recordscreen.js" charset="utf-8"></script>
    </body>
</html>
```
### The JavaScript file

In the JavaScript file, we will have 3 methods
1. `recordScreen` -- This will start recording the user's screens.
2. `createMediaStream` -- This will create a MediaStream object from the screen stream.
3. `saveRecording` -- This will save the recorded stream as a file to our computer.

#### Record Screen

On calling `getDisplayMedia` method in `navigator.mediaDevices` object will prompt the user to select and give permission to record the screen or part of the screen (browser tab). If the user has multiple screens then all the screens are displayed.

For `getDisplayMedia`  method we need to pass an object([constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia#parameters)) as argument  with two property `audio` and `video` . If we set the value of `audio` to true then the audio is included in the stream.  In our case, we need both audio and video.

```js
async function recordScreen() {
	return await navigator.mediaDevices.getDisplayMedia({
		audio: true,
		video: true
	});
}
```

#### Create MediaRecorder

The `getDisplayMedia` will return a stream data. From that, we need to create a `MediaRecorder`.

 The`MediaRecorder` interface contains the following methods

|Method   	  | Functionality                		 |
|-------------|--------------------------------------|
|start  	  |  Start recording the stream 		 |
|pause  	  |  Pause the recording        		 |
|resume 	  |  Resume the paused recording		 |
|stop         |  Stop the recording			   		 |
|requestData  |  Returns the recorded data as blob   |

The important events available in `MediaRecorder` are

**dataavailable**:

This event is fired when the MediaRecorder delivers media data to your application for its use. We can collect the data from here and store it.

**stop**:

This will be triggered by calling the top method on the MediaRecorder interface.

Steps to create a recorder
 * Create a Media Recorder object with the stream returned by the `recordScreen` method
 * Add an event listener for dataavailable event and store the received data
 * Add an event listener for stop event and call save method from there with the stored data
 * Start recording by calling the `start` method. We can pass the time interval to the `start` method,  for triggering the dataavailable event. If we call `start(100)` then for every 100 milliseconds the dataavailable event is triggered.

```js
function createRecorder (stream) {
  // the stream data is stored in this array
  let recordedChunks = [];

  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }  
  };

  mediaRecorder.onstop = function () {
     saveFile(recordedChunks); // will be created below
     recordedChunks = [];
  };
  mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return mediaRecorder;
}
```

#### Save the file

From the recorded data create a blob and ask the user for the file name and download the file.

```js
function saveFile(recordedChunks){

   const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    let filename = window.prompt('Enter file name'),
        downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.webm`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(blob); // clear from memory
    document.removeChild(downloadLink);
}
```

Now we have created the required functions. Let's add an event listener to the two buttons.
* On pressing the start recording button we need to  
  * Record Screen
  * Create Media Recorder
*  On pressing the stop recording button we need to
    * Stop Recording
    * Save the Recording

```js
let start = document.getElementById('start'),
    stop  = document.getElementById('stop'),
    msg = document.getElementById("status"),
    mediaRecorder;

start.addEventListener('click', async function(){
    let stream = await recordScreen();
    mediaRecorder = createRecorder(stream);
    msg.textContent = "Screen is Recording";
    this.disabled = true;
    stop.disabled = false;
})

stop.addEventListener('click', function(){
    mediaRecorder.stop();
    msg.textContent = "Press Start Recording";
    start.disabled = false;
    this.disabled = true;
})
```

### Result
You can take a look at the project in Codepen  [here](https://codepen.io/JAGATHISH1123/pen/rNyXgeP?editors=1010).

You can also check out the final code in this [GitHub Repository](https://github.com/Jagathishrex/screenrecorder).

### Let’s recap

- We create an HTML file with 2 buttons for start and stop recording
- We recorded the screen using  `navigator.mediaDevices.getDisplayMedia` this will return the screen as a stream
- From the stream, we created a MediaRecorder to record the stream
- Created save method to save the recorded data
- Added listener to the buttons
- On pressing the start button we  will
  - Start recording Screen  
  - Create a Media recorder from the Stream
  - Stored the recorded data in a variable
- On pressing the start button we  will
  - Get the recorded data
  - Create a blob and convert it into a URL
  - Download the blobURL

Congratulations 🎉  You did it.

Thanks for reading!
 
