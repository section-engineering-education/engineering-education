
Computers are essential tools in our day-to-day business tasks. At times, we may find it helpful to record online zoom meetings, create presentation videos from slides, or support customers' with a video tutorial on how to complete tasks. Such actions need utility software with screen capture ability to achieve. A screen recorder app can generate digital video content by recording the activities of footage on a computer or mobile screens in real-time.

This article guides us on implementing this functionality in a web browser using React and Node.js.

## Prerequisites

- Knowledge of the [JavaScript](https://www.javascript.com/) programming language.

- Basics of React library. Learn more on the official documentation [here](https://reactjs.org/).

- A code editor or IDE such as [VS Code](https://code.visualstudio.com/download).

- Have a Node.js LTS or later version on your development environment. You can download [here](https://nodejs.org/en/download/).
  
### Getting Started

Our screen recorder application will use full-stack JavaScript. The main libraries on the client-side include:

- `React`- A frontend JavaScript library for dynamic apps.
  
- `socket.io-client` for interacting with the webserver.

For the backend side, we will use:

- `Express.js` - A Node.js framework for servers.
    
- `Socket.io` - a Node.js library for developing real-time bi-directional applications using web sockets.

- `FFmpeg` - an open-source tool for working with multimedia streams such as audio and video.
  
### Application Setup

Our application structure includes a backend(`server` directory) and a React `client` folder. First, we will create our application folder and name it `screen-recorder-app`.  We will have the two directories inside the folder: the `server` folder for the backend and the `client` folder for the React application.

On your bash terminal, create the `screen-recorder-app` project folder:

```bash
mkdir screen-recorder-app
```

Using the ' create-react-app ' utility, navigate inside the directory to create the React client. Execute the following commands:

```bash
cd screen-recorder-app

npx create-react-app client
```

The `create-react-app` command-line tool creates a boilerplate code for our application. However, our entire code will be on the `src/App.js` file. 

Our application needs the web sockets interface to reach the backend; therefore, for this functionality, let's add the `socket.io-client` and `react-loader-spinner` module:

```bash
npm install socket.io-client socket.io-client react-loader-spinner
```

Finally, open the folder on your IDE. For VS Code, run the command:

```bash 
code .
```

To set up our component, head over to your `src/App.js` file and import the `useEffect` hook, `useRef` hook, and `useState` hook. From our `socket.io-client` module, we need to import the `io` object that will initialize our client.

```js
import { useEffect, useRef, useState, Fragment } from 'react';
import { io } from 'socket.io-client';

// adding a simple loading spinner component
import Loader from 'react-loader-spinner';
```

On top of our main `App.js` file, declare the app variables that include:
- Backend local server address as `http://localhost:5000`.
- The data_chunks of the recorded data, and `MediaRecorder` instance interface that will provide an API to record `MediaStream`.

```js
// server address
const LOCAL_SERVER = 'http://localhost:5000';
let data_chunks = [];

// MediaRecorder instance
let media_recorder = null;
```

For our client-side React, we will write the entire thing in the `App.js` file. Let's add a functional component that will be rendered from the JSX with a <h1> tag of Recorder App.

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

### The App component
Above your return statement add the following code in your `App.js` component.

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

A code walkthrough:
- The ```const username = useRef(`User_${Date.now().toString().slice(-4)}`)``` will generate a random username (e.g User_1548) since we don't have a real authenticated user to retrieve from context of auth.
  
- With `socketRef`, we call the call io client socket with the server URL that creates an interface to send or receive data.
  
- The `linkRef` and `videoRef` have a link to the DOM node and the video to enable download and view in the DOM.

We use a hook useRefto persist states between renders.

```js
  /**
   *  first the client needs to notify the server 
   *  when a new user has connected from the random username
  */
  useEffect(() => {
    ;(async () => {

      if (navigator.mediaDevices.getDisplayMedia) {
        try {
          const _screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
          })
          setScreenStream(_screenStream)

        } catch (err) {

          setLoading(false)
          console.log('getDisplayMedia', err)
          
        }
      } else {
        setLoading(false)
        console.log('getDisplayMedia is not supported...')
        
      }
    })()

  }, [])

  useEffect(() => {
    ;(async () => {
      if (navigator.mediaDevices.getUserMedia) {
        if (screenStream) {
          try {
            const _voiceStream = await navigator.mediaDevices.getUserMedia({
              audio: true
            })
            setVoiceStream(_voiceStream)
          } catch (e) {
            console.error('*** getUserMedia', e)
            setVoiceStream('unavailable')
          } finally {
            setLoading(false)
          }
        }
      } else {
        console.warn('*** getUserMedia not supported')
        setLoading(false)
      }
    })()
  }, [screenStream])
  ```

Let's briefly understand the above React code:


```js
  function startRecording() {
    if (screenStream && voiceStream && !mediaRecorder) {
      setRecording(true)

      videoRef.current.removeAttribute('src')
      linkRef.current.removeAttribute('href')
      linkRef.current.removeAttribute('download')

      let mediaStream
      if (voiceStream === 'unavailable') {
        mediaStream = screenStream
      } else {
        // const audioTracks = voiceStream.getAudioTracks()
        // audioTracks.forEach(track => {
        //   screenStream.addTrack(track)
        // })
        // mediaStream = screenStream
        mediaStream = new MediaStream([
          ...screenStream.getVideoTracks(),
          ...voiceStream.getAudioTracks()
        ])
      }

      mediaRecorder = new MediaRecorder(mediaStream)
      mediaRecorder.ondataavailable = ({ data }) => {
        dataChunks.push(data)
        socketRef.current.emit('screenData:start', {
          username: username.current,
          data
        })
      }
      mediaRecorder.onstop = stopRecording
      mediaRecorder.start(250)
    }
  }
```

```js
function stopRecording() {
    setRecording(false)

    socketRef.current.emit('screenData:end', username.current)

    const videoBlob = new Blob(dataChunks, {
      type: 'video/webm'
    })

    const videoSrc = URL.createObjectURL(videoBlob)

    videoRef.current.src = videoSrc
    linkRef.current.href = videoSrc
    linkRef.current.download = `${Date.now()}-${username.current}.webm`

    mediaRecorder = null
    dataChunks = []
  }

  const onClick = () => {
    if (!recording) {
      startRecording()
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop()
      }
    }
  }

  if (loading) return <Loader type='Oval' width='50' color='#027' />
```

```js
 return (
    <>
      <h1>Recorder App</h1>
      <video controls ref={videoRef}></video>
      <a ref={linkRef}>Download</a>
      <button onClick={onClick} disabled={!voiceStream}>
        {!recording ? 'Start' : 'Stop'}
      </button>
    </>
  )
```

### Backend
Since the LTS and higher version of Node.js support ES6 import module syntax, we need to add a `module` type on our `package.json` file to enable it on our backend.

```JSON
"type": "module",
```

To automatically monitor and re-run our server upon changes, let's add a `nodemon` module:

```bash
npm install -D nodemon
```

The script to trigger this is:

```JSON
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
```

```js
import express from 'express';
import { Server } from 'socket.io';

// nodejs native module
import http from 'http';

// sockets connection event handler
import { onConnectionHandler } from './socket-io/onConnectionHandler.js';
```

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

io.on('connection', onConnectionHandler);
```

```js
import { saveData } from '../utils/saveData.js'

const socketByUser = {}
const dataChunks = {}

export const onConnection = (socket) => {
  socket.on('user:connected', (username) => {
    if (!socketByUser[socket.id]) {
      socketByUser[socket.id] = username
    }
  })

  socket.on('screenData:start', ({ data, username }) => {
    if (dataChunks[username]) {
      dataChunks[username].push(data)
    } else {
      dataChunks[username] = [data]
    }
  })

  socket.on('screenData:end', (username) => {
    if (dataChunks[username] && dataChunks[username].length) {
      saveData(dataChunks[username], username)
      dataChunks[username] = []
    }
  })

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


### Conclusion

With the help of screen recording apps, we can save, copy, and reuse videos helpful to businesses or customers in a wide array of enterprise tasks. In this article, we have learned about screen recording software: what it is, how to build one using React and Node.js, and some of its benefits. Thanks for reading!
