
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

Our application needs the web sockets interface to reach the backend; therefore, for this functionality, let's add the `socket.io-client` module:

```bash
npm install socket.io-client
```

Finally, open the folder on your IDE. For VS Code, run the command:

```bash 
code .
```

```js
import { useEffect, useRef, useState, Fragment } from 'react';
import { io } from 'socket.io-client';

// adding a simple loading spinner component
import Loader from 'react-loader-spinner';

// using sass for styling
import './App.scss';
```

```js
// declare application constants

const LOCAL_SERVER = 'http://localhost:5000';
let data_chunks = [];
let media_recorder = null;
```

```js
function App() {
  const username = useRef(`User_${Date.now().toString().slice(-4)}`)
  const socketRef = useRef(io(SERVER_URI))
  const videoRef = useRef()
  const linkRef = useRef()

  const [screenStream, setScreenStream] = useState()
  const [voiceStream, setVoiceStream] = useState()
  const [recording, setRecording] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <Fragment>
      <h1>Recorder App</h1>
    </Fragment>
  )
}
```

```js
  useEffect(() => {
    ;(async () => {
      if (navigator.mediaDevices.getDisplayMedia) {
        try {
          const _screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
          })
          setScreenStream(_screenStream)
        } catch (e) {
          console.error('*** getDisplayMedia', e)
          setLoading(false)
        }
      } else {
        console.warn('*** getDisplayMedia not supported')
        setLoading(false)
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

```js
server.listen(5000, () => {
  console.log('Server ready... ');
})
```

### A running demo


### Conclusion

With the help of screen recording apps, we can save, copy, and reuse videos helpful to businesses or customers in a wide array of enterprise tasks. 
In this article, we have learned about screen recording software: what it is, how to build one using React and Node.js, and some of its benefits. 
Thanks for reading!
