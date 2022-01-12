---
layout: engineering-education
status: publish
published: true
url: /javascript-screen-recorder/
title: Building a Screen Recorder application with Javascript
description: This article guides us on implementing this functionality in a web browser using React and Node.js
author: wilson-gichuhi
date: 2022-01-12T00:00:00-11:45
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/javascript-screen-recorder/hero.jpg
    alt:  Building a Screen Recorder application with Javascript Image
---

Computers are essential tools in our day-to-day business tasks. At times, we may find it helpful to record online zoom meetings, create presentation videos from slides, or support customers with a video tutorial on how to complete tasks.
<!--more-->
To achieve such actions, utility software with screen capture ability is needed. A screen recorder app can generate digital video content by recording the activities of footage on a computer or mobile screens in real-time.

This article guides us on implementing this functionality in a web browser using React and Node.js.

### Prerequisites
- Knowledge of the [JavaScript](https://www.javascript.com/) programming language.
- Basics of React library. Learn more on the official documentation [here](https://reactjs.org/).
- A code editor such as [VS Code](https://code.visualstudio.com/download) or an IDE.
- Have a Node.js LTS or later version on your development environment. You can download it [here](https://nodejs.org/en/download/).

### Getting started
Our screen recorder application will use full-stack JavaScript. The main libraries on the client-side include:
- `React`- A frontend JavaScript library for dynamic apps.
- `socket.io-client` for interacting with the webserver.

For the backend, we will use:
- `Express.js` - A Node.js framework for servers.
- `Socket.io` - a Node.js library for developing real-time bi-directional applications using web sockets.
- `FFmpeg` - an open-source tool for working with multimedia streams such as audio and video.

### Application setup
Our application structure includes a backend(`server` directory) and a React `client` folder.

First, we will create our application folder and name it `screen-recorder-app`. Then, we will have the two directories inside the folder; the `server` folder for the backend and the `client` folder for the React application.

On your bash terminal, create the `screen-recorder-app` project folder:

```bash
mkdir screen-recorder-app
```

Navigate the directory to create the React client using the `create-react-app` utility. Execute the following commands:

```bash
cd screen-recorder-app

npx create-react-app client
```

The `create-react-app` command-line tool creates a boilerplate code for our application. However, our entire code will be on the `src/App.js` file.

Our application needs the web sockets interface to reach the backend. For this functionality, let us add the `socket.io-client` and `react-loader-spinner` module:

```bash
npm install socket.io-client react-loader-spinner
```

Finally, open the folder on your IDE. For VS Code, run the command:

```bash
code  .
```

To set up our component, head over to your `src/App.js` file and import the `useEffect`, `useRef`, and `useState` hooks. Next, from our `socket.io-client` module, import the `io` object to initialize our client.

```js
import { useEffect, useRef, useState, Fragment } from 'react';
import { io } from 'socket.io-client';

// adding a simple loading spinner component
import Loader from 'react-loader-spinner';
```

On top of our main `App.js` file, declare the app variables that include:
- Backend local server address as `http://localhost:5000`.
- The data_chunks of the recorded data and `MediaRecorder` instance interface will provide an API to record `MediaStream`.

```js
// server address
const LOCAL_SERVER = 'http://localhost:5000';
let data_chunks = [];

// MediaRecorder instance
let media_recorder = null;
```

We will write everything in the `App.js` file for our client-side React. Let's add a functional component rendered from the JSX with a `<h1>` tag of Recorder App.

```js
function App() {

// return a JSX of h1
  return (
    <Fragment>
      <h1>Recorder App</h1>
    </Fragment>
  )
}
```

If we start our server using the CLI command of `npm start`, then head over to our browser, we should see something like:

![local server](/engineering-education/javascript-screen-recorder/img1.png)

### The App component
In your `App.js` component, add the following code above your return statement.

```js
function App() {
  // a random username
  const username = useRef(`User_${Date.now().toString().slice(-4)}`)

  const socketRef = useRef(io(LOCAL_SERVER))

  const linkRef = useRef()
  const videoRef = useRef()

  // hold state for audio stream from device microphone
  const [voiceStream, setVoiceStream] = useState()

  // A stream of a video captured from the screen
  const [screenStream, setScreenStream] = useState()

  // loading status indicator
  const [loading, setLoading] = useState(true)

  // recording status indicator
  const [recording, setRecording] = useState(false)

  return (
    <Fragment>
      <h1>Recorder App</h1>
    </Fragment>
  )
}
```

Since our application does not authenticate any user, we need to generate a random username from the current timestamp using the `useRef` hook to create a reference to the DOM element.

The socketRef will initiate a call to our backend web socket connection using the server URL. This creates an interface to start the stream of sending and receiving data. The `videoRef` hook maps to the DOM to allow the user to download the screen capture in video format.

The goal of WebSockets API is to create a full-duplex communication channel over a single TCP connection. To trigger an event, the `socket.emit` method will accept the event type as well as the data sent.

At the end of the client connection, we process events by listening to the WebSockets using `socket.on` method. This method accepts the event type as an argument and the callback function to execute once the event is emitted.

Next, we need to capture the screen:

```js
  /**
   *  First, the client needs to notify the server
   *  when a new user has connected from the random username
  */

  useEffect(() => {
    ;(async () => {
      if (navigator.mediaDevices.getDisplayMedia) {

        try {
        //  grant screen
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
          })
           // get the video stream
          setScreenStream(screenStream)
        }
        // exception handling
        catch (err) {
          setLoading(false)
          console.log('getDisplayMedia', err)
        }

      } else {
        setLoading(false)
        console.log('getDisplayMedia is not supported...')
      }

    })()
  }, [])
```

Navigator is a browser window object. Under the `navigator.mediaDevices` object, we have access to all connected media inputs that include microphones, cameras, and screen sharing.

In this case, we are capturing screen data capture as a live stream of the `screenStream`.

>In Chrome and Microsoft Edge, the method `getDisplayMedia` can capture audio content.

To start receiving media stream from the user's device, create a `startRecording` function with the following code:

```js
  function startRecording() {
    if (screenStream && voiceStream && !mediaRecorder) {

      // set recording state to true
      setRecording(true)

      videoRef.current.removeAttribute('src')
      linkRef.current.removeAttribute('href')
      linkRef.current.removeAttribute('download')

      let mediaStream
      if (voiceStream === 'unavailable') {
        mediaStream = screenStream
      }

      // update media streams (... spread operator)
      else {
        mediaStream = new MediaStream([
          ...screenStream.getVideoTracks(),
          ...voiceStream.getAudioTracks()
        ])
      }

      // mediaRecorder instance
      mediaRecorder = new MediaRecorder(mediaStream)
      mediaRecorder.ondataavailable = ({ data }) => {
        dataChunks.push(data)
        socketRef.current.emit('screenData:start', {
          username: username.current,
          data
        })
      }

      mediaRecorder.onstop = stopRecording;

      // ..
      mediaRecorder.start(250);
    }
  }
```

We are ready to write the screen without sound, so if any error occurs related to receiving an audio stream (including the user's refusal to grant permission to use the microphone), we set the voice stream to unavailable.

Let's take a look at the markup:

```js
function stopRecording() {
    setRecording(false)

    socketRef.current.emit('screenData:end', username.current)

    const videoBlob = new Blob(dataChunks, {
      type: 'video/webm' //... blob type of video web media
    })

    const videoSrc = URL.createObjectURL(videoBlob) //

    //...Refs and video source
    videoRef.current.src = videoSrc
    linkRef.current.href = videoSrc
    linkRef.current.download = `${Date.now()}-${username.current}.webm`

    //...
    mediaRecorder = null
    dataChunks = []
  }

  // bind the onClick method to a DOM button
  // to start or stop recording
  const onClick = () => {
    if (!recording) {
      startRecording()
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop()
      }
    }
  }
  // loading spinner: we show the user a loading spinner till all needed permissions are granted.

  if (loading) return <Loader type='Oval' width='50' color='#027' />
```

The JSX in the return statement includes:
- `video` item to view item
- A link to download video records
- A button to start or stop recording


```js
 return (
    <>
      <h1>Recorder App</h1>

      {/* */}
      <video controls ref={videoRef}></video>
      <a ref={linkRef}>Download</a>

      {/**/}
      <button onClick={onClick} disabled={!voiceStream}>
        {!recording ? 'Start' : 'Stop'}
      </button>
    </>
  )
```

### Working on the backend
We will use the `server` folder inside the `screen-record` project folder for the backend. Initialize a new Node.js project using the command:

```bash
 npm init -y
```

Since the LTS and higher version of Node.js support ES6 import module syntax, we need to add a `module` type on our `package.json` file to enable it on our backend.

```JSON
"type": "module",
```

To automatically monitor and re-run our server upon changes, let us add a `nodemon` module:

```bash
npm install -D nodemon
```

The script that triggers this event is:

```JSON
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
```

Next, on your `index.js` root file, import `express` and `Server` objects from the `socket.io`. Then, the `onConnectionHandler` function will handle our web sockets connection.

```js
import express from 'express';
import { Server } from 'socket.io';

// nodejs native module
import http from 'http';

// sockets connection event handler
import { onConnectionHandler } from './socket-io/onConnectionHandler.js';
```

Below the import in the `index.js` file, instantiate sockets connection, and express.

```js
const app = express()
const server_app = http.createServer(app)
```

```js
const io = new Server(server_app, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

// listen to connection event before web sockets trigger
io.on('connection', onConnectionHandler);
```

Next, create a `utils` folder. Inside the folder, add a `saveData.js` file with a function to save the recording of our application. Paste the following code:

```js
import { saveData } from '../utils/saveData.js'

const socketByUser = {};

// data chunks
const dataChunks = {};

export const onConnection = (socket) => {
  // user connection event
  socket.on('user:connected', (username) => {

    // create socket id from username
    if (!socketByUser[socket.id]) {
      socketByUser[socket.id] = username
    };
  });

  // push data chunks once recording starts
  socket.on('screenData:start', ({ data, username }) => {
    if (dataChunks[username]) {
      dataChunks[username].push(data)
    }

    else {
      dataChunks[username] = [data]
    }
  })

  socket.on('screenData:end', (username) => {
    if (dataChunks[username] && dataChunks[username].length) {
      saveData(dataChunks[username], username)
      dataChunks[username] = []
    }
  })

  // event handler on disconnect
  socket.on('disconnect', () => {
    const username = socketByUser[socket.id]
    if (dataChunks[username] && dataChunks[username].length) {
      saveData(dataChunks[username], username)
      dataChunks[username] = []
    }
  })
}
```

Finally, start the server on port 5000 with a callback function that logs once the event is fired.

```js
server.listen(5000, () => {
  console.log('Server ready... ');
})
```

### A running demo
![demo 1](/engineering-education/javascript-screen-recorder/demo1.png)
![demo 2](/engineering-education/javascript-screen-recorder/demo2.png)

Check source code on [GitHub](https://github.com/Qodestackr/screen-recorder-app).

### Conclusion
With the help of screen recording apps, we can save, copy, and reuse videos helpful to businesses or customers in a wide array of enterprise tasks.

In this article, we have learned about screen recording software, what it is, how to build one using React and Node.js, and some of its benefits. Thanks for reading!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
