### Building a multi-source video player with ReactJS
### introduction
video playing capabilities are expected of modern websites such as blogs, social media, and educational websites. Building a video player that can render media from social media websites including YouTube, Facebook, Vimeo, etc., can be achieved with React.js.
in this article, we will look into the various steps and dependencies required to build a multi-source video player with React.js
### Prerequisite
To understand and utilize this article, it is expected that you have intermediate knowledge of React.js, CSS, and any additional design library. For beginners, take out time to enroll in a crash course before proceeding with this tutorial.
### Getting started with React Application
Before we begin the tutorial, let's have a quick overview of React.js. React.js is a modern JavaScript library capable of handling multiple web-based applications including our multi-source video player. 
The first step in every `React` development is the creation of a `react application`. This step makes available a clean slate application with all the default app dependencies installed. To create the `react application`, open the `command terminal` on your local computer and run the command below:
```bash
npx create-react-app Video-player
```
Alternatively, for yarn users:
```bash
yarn create-react-app Video player
```
The command above will create a new `react app`, and also provide a boilerplate that will accommodate subsequent components and code snippets.
### Task overview
To simplify the task of building a multi-source video player, we will breakdown the above into the following
- Installing the required app dependencies
- Creating the video player component
- Creating and exporting the various URL handlers
- Creating additional utilities and decoders.
- Styling and customizing the video player.
#### Step 1: Installing the required app dependencies
In this step, we will outline and install the dependencies required to create our application. They include the following:

```Json
"deepmerge": "^4.0.0",
"load-script": "^1.0.0",
"memoize-one": "^5.1.1",
"prop-types": "^15.7.2",
"react-fast-compare": "^3.0.1"
```
To install the above-listed dependencies, we open up the `command terminal` and run the command below:

```bash
npm install
```
Or
```bash
yarn install
```

#### Step 2: Creating the Video player component
The `Video-player component` is the main component of our application. We will provide the video player with utility functions that will enable it to render videos from multiple sources as required. To begin, in the `src` folder, we will create a `Player.js` file. Thereafter we set it up by implementing the code snippet below
```JavaScript
import React, { Component } from 'react'
import isEqual from 'react-fast-compare'
import { propTypes, defaultProps } from './props'

export default class Player extends Component {
static displayName = 'Player'
static propTypes = propTypes
static defaultProps = defaultProps
mounted = false
isReady = false
isPlaying = false // Track playing state internally to prevent bugs
isLoading = true // Use isLoading to prevent onPause when switching URL
loadOnReady = null
startOnPlay = true
seekOnPlay = null
onDurationCalled = false

componentDidMount () {
this.mounted = true
}
componentDidUpdate (prevProps) {
// if no player is available, the component will do nothing
if (!this.player) {
return
}
const { url, playing, volume, muted, playbackRate, pip, loop, activePlayer } = this.props
if (!isEqual(prevProps.url, url)) {
if (this.isLoading && !activePlayer.forceLoad) {
console.warn(`ReactPlayer: the attempt to load ${url} is being deferred until the player has loaded`)
this.loadOnReady = url
return
}
this.isLoading = true
this.startOnPlay = true
this.onDurationCalled = false
this.player.load(url, this.isReady)
}
if (!prevProps.playing && playing && !this.isPlaying) {
this.player.play()
}
if (prevProps.playing && !playing && this.isPlaying) {
this.player.pause()
}
if (prevProps.volume !== volume && volume !== null) {
this.player.setVolume(volume)
}
if (prevProps.muted !== muted) {
if (muted) {
this.player.mute()
} else {
this.player.unmute()
if (volume !== null) {
setTimeout(() => this.player.setVolume(volume))
}
}
}
handlePlayerMount = player => {
this.player = player
this.player.load(this.props.url)
this.progress()
}

getDuration () {
if (!this.isReady) return null
return this.player.getDuration()
}
handleReady = () => {
if (!this.mounted) return
this.isReady = true
this.isLoading = false
const { onReady, playing, volume, muted } = this.props
onReady()
if (!muted && volume !== null) {
this.player.setVolume(volume)
}
if (this.loadOnReady) {
this.player.load(this.loadOnReady, true)
this.loadOnReady = null
} else if (playing) {
this.player.play()
}
this.handleDurationCheck()
}

handlePlay = () => {
this.isPlaying = true
this.isLoading = false
const { onStart, onPlay, playbackRate } = this.props
if (this.startOnPlay) {
if (this.player.setPlaybackRate && playbackRate !== 1) {
this.player.setPlaybackRate(playbackRate)
}
onStart()
this.startOnPlay = false
}
onPlay()
if (this.seekOnPlay) {
this.seekTo(this.seekOnPlay)
this.seekOnPlay = null
}
this.handleDurationCheck()
}

handlePause = (e) => {
this.isPlaying = false
if (!this.isLoading) {
this.props.onPause(e)
}
}

handleEnded = () => {
const { activePlayer, loop, onEnded } = this.props
if (activePlayer.loopOnEnded && loop) {
this.seekTo(0)
}
if (!loop) {
this.isPlaying = false
onEnded()
}
}

handleError = (...args) => {
this.isLoading = false
this.props.onError(...args)
}

handleLoaded = () => {
// this fuction prevents the player from getting stuck while loading
this.isLoading = false
}

render () {
const Player = this.props.activePlayer
if (!Player) {
return null
}
return (
<Player
{...this.props}
onMount={this.handlePlayerMount}
onReady={this.handleReady}
onPlay={this.handlePlay}
onPause={this.handlePause}
onEnded={this.handleEnded}
onLoaded={this.handleLoaded}
onError={this.handleError}
/>
)
}
}
```
The code snippet above looks complex, but not to worry I will explain what is going on there.
From the snippet above, we created some basic functions that will handle the player behavior, and they include the following:
- On play: this function handles the play operation, ie. When the user clicks the `play button`
- On pause: this function handles the pause operation, ie when the user clicks the `pause button`
- Get Duration: this function provides the video duration when the user hovers over the progress bar 
- Progress bar: this function shows a moving bar to show the elapsed and remaining time to the user.
- On Ready: the `onReady` function handles the buffering of the video once loading is completed
- On Mute: this function enables the user to mute and unmute sound while playing video
- Handle Ended: when the video is completed, the `HandleEnded` function prevents the player from crashing
- Handle Error: this function handles the errors that may occur during rendering or due to a broken URL.
We also created a `timeout` function to handle incorrect video buffering from looping indefinitely. 

#### Step 3: Creating the URL Handlers
In the previous step, we created a `Player` component. for our `Player` to have the ability to render videos from multiple URLs, we need to provide the required functions and logic. The URL handler components will handle videos from:
- Facebook
- YouTube
- Twitch and
- Vimeo
To build our URL handler components, first, we create a `media` folder, thereafter we proceed to the various files shown below
#### The Facebook URL handler (Facebook.js)
This component will handle videos from Facebook URL, i.e. from facebook groups, pages and feeds. To achieve this, in our `media` folder, we create a `Facebook.js` file which will accommodate the code snippet below:
```JavaScript
import React, { Component } from 'react'
import { callPlayer, getSDK, } from '../utils'
import { canPlay } from '../Decoder'

const SDK_URL = 'https://connect.facebook.net/en_US/sdk.js'
const SDK_GLOBAL = 'FB'
const SDK_GLOBAL_READY = 'fbAsyncInit'
const PLAYER_ID_PREFIX = 'facebook-player-'

export default class Facebook extends Component {
static displayName = 'Facebook'
static canPlay = canPlay.facebook
callPlayer = callPlayer
playerID = this.props.config.playerId || `${PLAYER_ID_PREFIX}`
componentDidMount () {
this.props.onMount && this.props.onMount(this)
}

load (url, isReady) {
if (isReady) {
getSDK(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(FB => FB.XFBML.parse())
return
}
getSDK(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(FB => {
FB.init({
appId: this.props.config.appId,
xfbml: true,
version: this.props.config.version
})
FB.Event.subscribe('xfbml.render', msg => {
// Here we know the SDK has loaded, even if onReady/onPlay
this.props.onLoaded()
})
FB.Event.subscribe('xfbml.ready', msg => {
if (msg.type === 'video' && msg.id === this.playerID) {
this.player = msg.instance
this.player.subscribe('startedPlaying', this.props.onPlay)
this.player.subscribe('paused', this.props.onPause)
this.player.subscribe('finishedPlaying', this.props.onEnded)
this.player.subscribe('startedBuffering', this.props.onBuffer)
this.player.subscribe('finishedBuffering', this.props.onBufferEnd)
this.player.subscribe('error', this.props.onError)
if (this.props.muted) {
this.callPlayer('mute')
} else {
this.callPlayer('unmute')
}
this.props.onReady()
document.getElementById(this.playerID).querySelector('iframe').styl e.visibility = 'visible'
}
})
})
}

play () {
this.callPlayer('play')
}
pause () {
this.callPlayer('pause')
}
stop () {
// does nothing
}
seekTo (seconds) {
this.callPlayer('seek', seconds)
}
mute = () => {
this.callPlayer('mute')
}
unmute = () => {
this.callPlayer('unmute')
}

render () {
const { attributes } = this.props.config
const style = {
width: '100%',
height: '100%'
}
return (
<div
style={style}
id={this.playerID}
className='fb-video'
data-href={this.props.url}
data-autoplay={this.props.playing ? 'true' : 'false'}
data-allowfullscreen='true'
data-controls={this.props.controls ? 'true' : 'false'}
{...attributes}
/>
)
}
}
``` 
From the code snippet above, we created some functions to `get` and `load` the SDK from Facebook embed. Once the SDK is loaded, the video will be buffered and transferred to our `player` for rendering. Finally, we implemented the getDuration, play, pause, mute, stop and unmute handlers created in the `player` component.

#### The YouTube URL handler (YouTube.js)
YouTube is a video-based social networking website, and also an option in our video player. To provide our player access to videos from YouTube URLs, we need to create a handler for it. To do that, we create a `Youtube.js` file in the `media` folder already created. Then we go ahead with the code implementation below:
```JavaScript
import React, { Component } from 'react'
import { callPlayer, getSDK, parseStartTime, parseEndTime } from '../utils'
import { canPlay, MATCH_URL_YOUTUBE } from '../Decoder'

const SDK_URL = 'https://www.youtube.com/iframe_api'
const SDK_GLOBAL = 'YT'
const SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady'

export default class YouTube extends Component {
static displayName = 'YouTube'
static canPlay = canPlay.youtube
callPlayer = callPlayer

componentDidMount () {
this.props.onMount && this.props.onMount(this)
}
return url.match(MATCH_URL_YOUTUBE)[1]
}
load (url, isReady) {
const { playing, muted, playsinline, controls, loop, config, onError } = this.props
const { playerVars, embedOptions } = config
const id = this.getID(url)
if (isReady) {
this.player.cueVideoById({
videoId: id,
startSeconds: parseStartTime(url) || playerVars.start,
endSeconds: parseEndTime(url) || playerVars.end
})
return
}
getSDK(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, YT => YT.loaded).then(YT => {
if (!this.container) return
this.player = new YT.Player(this.container, {
width: '100%',
height: '100%',
videoId: id,
playerVars: {
autoplay: playing ? 1 : 0,
mute: muted ? 1 : 0,
controls: controls ? 1 : 0,
start: parseStartTime(url),
end: parseEndTime(url),
origin: window.location.origin,
playsinline: playsinline ? 1 : 0,
...this.parsePlaylist(url),
...playerVars
},
events: {
onReady: () => {
if (loop) {
this.player.setLoop(true) // Enable playlist looping
}
this.props.onReady()
},
onError: event => onError(event.data)
},
})
}, onError)
}
onStateChange = (event) => {
const { data } = event
const { onPlay, onPause, onBuffer, onBufferEnd, onEnded, onReady, loop, config: { playerVars, onUnstarted } } = this.props
const { UNSTARTED, PLAYING, PAUSED, BUFFERING, ENDED, CUED } = window[SDK_GLOBAL].PlayerState
if (data === UNSTARTED) onUnstarted()
if (data === PLAYING) {
onPlay()
onBufferEnd()
}
if (data === PAUSED) onPause()
if (data === BUFFERING) onBuffer()
if (data === ENDED) {
this.loop()
onEnded()
}
if (data === CUED) onReady()
}

play () {
this.callPlayer('playVideo')
}

pause () {
this.callPlayer('pauseVideo')
}
mute = () => {
this.callPlayer('mute')
}

unmute = () => {
this.callPlayer('unMute')
}
getDuration () {
return this.callPlayer('getDuration')
}
getCurrentTime () {
return this.callPlayer('getCurrentTime')
}
ref = container => {
this.container = container
}

render () {
const { display } = this.props
const style = {
width: '100%',
height: '100%',
display
}
return (
<div style={style}>
<div ref={this.ref} />
</div>
)
}
}
```
As shown in the snippet above, similar to the `Facebook` component setup, we created and exported a class-based component. We used the SDK function like iframe functions to embed external links to a web page. 
For better understanding, consider what happens when a video is loaded to a player, the user expects some basic operations examples including getting current time, getting duration of the video, pause, play stop, mute, etc. and we made available functions to handle those operations. 
#### The Twitch URL handler (Twitch.js)
We have completed the creation and setup of the `Facebook` and `YouTube` components, time to proceed with the `Twitch` component. Similar to what we did earlier, in the `media` folder, create another file `Twitch.js`. thereafter we will set up the component by shipping the code snippet below: 
```JavaScript
import React, { Component } from 'react'

import { callPlayer, getSDK, parseStartTime } from '../utils'
import { canPlay, MATCH_URL_TWITCH_CHANNEL, MATCH_URL_TWITCH_VIDEO } from '../Decoder'

const SDK_URL = 'https://player.twitch.tv/js/embed/v1.js'
const SDK_GLOBAL = 'Twitch'
const PLAYER_ID_PREFIX = 'twitch-player-'

export default class Twitch extends Component {
static displayName = 'Twitch'
static canPlay = canPlay.twitch
static loopOnEnded = true
callPlayer = callPlayer
playerID = this.props.config.playerId || `${PLAYER_ID_PREFIX}`

componentDidMount () {
this.props.onMount && this.props.onMount(this)
}

load (url, isReady) {
const { playsinline, onError, config, controls } = this.props
const isChannel = MATCH_URL_TWITCH_CHANNEL.test(url)
const id = isChannel ? url.match(MATCH_URL_TWITCH_CHANNEL)[1] : url.match(MATCH_URL_TWITCH_VIDEO)[1]
if (isReady) {
if (isChannel) {
this.player.setChannel(id)
} else {
this.player.setVideo('v' + id)
}
return
}
getSDK(SDK_URL, SDK_GLOBAL).then(Twitch => {
this.player = new Twitch.Player(this.playerID, {
video: isChannel ? '' : id,
channel: isChannel ? id : '',
height: '100%',
width: '100%',
playsinline: playsinline,
autoplay: this.props.playing,
muted: this.props.muted,
controls: isChannel ? true : controls,
time: parseStartTime(url),
...config.options
})
const { READY, PLAYING, PAUSE, ENDED, ONLINE, OFFLINE } = Twitch.Player
this.player.addEventListener(READY, this.props.onReady)
this.player.addEventListener(PLAYING, this.props.onPlay)
this.player.addEventListener(PAUSE, this.props.onPause)
this.player.addEventListener(ENDED, this.props.onEnded)

// Prevent abnormal isLoading behaviour when streams are offline
this.player.addEventListener(ONLINE, this.props.onLoaded)
this.player.addEventListener(OFFLINE, this.props.onLoaded)
}, onError)
}

play () {
this.callPlayer('play')
}

pause () {
this.callPlayer('pause')
}

stop () {
this.callPlayer('pause')
}
mute = () => {
this.callPlayer('setMuted', true)
}
unmute = () => {
this.callPlayer('setMuted', false)
}
getDuration () {
return this.callPlayer('getDuration')
}

render () {
const style = {
width: '100%',
height: '100%'
}
return (
<div style={style} id={this.playerID} />
)
}
}
```
The twitch setup is fairly easy to understand, the major difference from previous components setups is the offline playability. The twitch SDK provides offline playability once the video is already loaded, the process is called caching. Finally, we also handled looping and autoplay i.e. to restart the video automatically once the duration is exhausted and playing videos automatically after loading respectively. 
#### The Vimeo URL handler (Vimeo.js)
Finally, we will equip our `Player` component with the required functions to render videos from Vimeo. Vimeo as we know it is a video hosting and sharing platform, so it should also be covered by our `video player`. First, we create a `Vimeo.js` file in our `media` folder. In the file, we create the required functions and logic by:
```JavaScript
import React, { Component } from 'react'
import { callPlayer, getSDK } from '../utils'
import { canPlay } from '../Decoder

const SDK_URL = 'https://player.vimeo.com/api/player.js'
const SDK_GLOBAL = 'Vimeo'

export default class Vimeo extends Component {
static displayName = 'Vimeo'
static canPlay = canPlay.vimeo
static forceLoad = true // Prevent checking isLoading when URL changes
callPlayer = callPlayer
duration = null
currentTime = null
secondsLoaded = null

componentDidMount () {
this.props.onMount && this.props.onMount(this)
}

load (url) {
this.duration = null
getSDK(SDK_URL, SDK_GLOBAL).then(Vimeo => {
if (!this.container) return
this.player = new Vimeo.Player(this.container, {
url,
autoplay: this.props.playing,
muted: this.props.muted,
loop: this.props.loop,
playsinline: this.props.playsinline,
controls: this.props.controls,
...this.props.config.playerOptions
})
this.player.ready().then(() => {
const iframe = this.container.querySelector('iframe')
iframe.style.width = '100%'
iframe.style.height = '100%'
}).catch(this.props.onError)
this.player.on('loaded', () => {
this.props.onReady()
this.refreshDuration()
})
this.player.on('play', () => {
this.props.onPlay()
this.refreshDuration()
})
this.player.on('pause', this.props.onPause)
this.player.on('ended', this.props.onEnded)
this.player.on('error', this.props.onError)
this.player.on('bufferstart', this.props.onBuffer)
this.player.on('bufferend', this.props.onBufferEnd)
}, this.props.onError)
}
play () {
const promise = this.callPlayer('play')
if (promise) {
promise.catch(this.props.onError)
}
}
pause () {
this.callPlayer('pause')
}
stop () {
this.callPlayer('unload')
}
mute = () => {
this.setVolume(0)
}

unmute = () => {
if (this.props.volume !== null) {
this.setVolume(this.props.volume)
}
}

getDuration () {
return this.duration
}
ref = container => {
this.container = container
}

render () {
const { display } = this.props
const style = {
width: '100%',
height: '100%',
overflow: 'hidden',
display
}
return (
<div
key={this.props.url}
ref={this.ref}
style={style}
/>
)
}
}
```
The snippet above needs no further explanations, we simply repeated the same procedures earlier implemented. 
Note: it is expected that you encounter some errors because we have imported some utilities without creating them. We will go ahead and fix the errors in the next step. 
#### Exporting the Handlers (index.js)
For the various URL handlers to be integrated into our application, we need to export them. To avoid duplicate imports, it is recommended to export all your components from a single index file. To achieve this, create an `index.js` file in the `media` folder and export them by shipping the codes below:
```JavaScript
import { lazy } from 'react'
import { canPlay } from '../Decoders'

export default [
{
key: 'youtube',
name: 'YouTube',
canPlay: canPlay.youtube,
lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerYouTube' */'./YouTube'))
},
{
key: 'vimeo',
name: 'Vimeo',
canPlay: canPlay.vimeo,
lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerVimeo' */'./Vimeo'))
},
{
key: 'facebook',
name: 'Facebook',
canPlay: canPlay.facebook,
lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerFacebook' */'./Facebook'))
},
{
key: 'twitch',
name: 'Twitch',
canPlay: canPlay.twitch,
lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerTwitch' */'./Twitch'))
},
]
```

#### Step 4: Setting up the Utilities (Utils.js)
As stated earlier, some `helpers functions` must be created for our application to perform the desired task of rendering videos from multiple URLs. to do that, we create a `Utils.js` file. thereafter we:
```JavaScript
const MATCH_START_STAMP = /(\d+)(h|m|s)/g
const MATCH_NUMERIC = /^\d+$/

function parseTimeParam (url, pattern) {
if (url instanceof Array) {
return undefined
}
const match = url.match(pattern)
if (match) {
const stamp = match[1]
if (stamp.match(MATCH_START_STAMP)) {
return parseTimeString(stamp)
}
if (MATCH_NUMERIC.test(stamp)) {
return parseInt(stamp)
}
}
return undefined
}

function parseTimeString (stamp) {
let seconds = 0
let array = MATCH_START_STAMP.exec(stamp)
while (array !== null) {
const [, count, period] = array
if (period === 'h') seconds += parseInt(count, 10) * 60 * 60
if (period === 'm') seconds += parseInt(count, 10) * 60
if (period === 's') seconds += parseInt(count, 10)
array = MATCH_START_STAMP.exec(stamp)
}
return seconds
}
export function queryString (object) {
return Object
.keys(object)
.map(key => `${key}=${object[key]}`)
.join('&')
}

function getGlobal (key) {
if (window[key]) {
return window[key]
}
if (window.exports && window.exports[key]) {
return window.exports[key]
}
if (window.module && window.module.exports && window.module.exports[key]) {
return window.module.exports[key]
}
return null
}
const requests = {}
export function getSDK (url, sdkGlobal, sdkReady = null, isLoaded = () => true, fetchScript) {
const existingGlobal = getGlobal(sdkGlobal)
if (existingGlobal && isLoaded(existingGlobal)) {
return Promise.resolve(existingGlobal)
}
return new Promise((resolve, reject) => {
// If we are already loading the SDK, add the resolve and reject
if (requests[url]) {
requests[url].push({ resolve, reject })
return
}
requests[url] = [{ resolve, reject }]
const onLoaded = sdk => {
// When loaded, resolve all pending request promises
requests[url].forEach(request => request.resolve(sdk))
}
if (sdkReady) {
const previousOnReady = window[sdkReady]
window[sdkReady] = function () {
if (previousOnReady) previousOnReady()
onLoaded(getGlobal(sdkGlobal))
}
}
fetchScript(url, err => {
if (err) {
requests[url].forEach(request => request.reject(err))
requests[url] = null
} else if (!sdkReady) {
onLoaded(getGlobal(sdkGlobal))
}
})
})
}
export function callPlayer (method, ...args) {
// Util method for calling a method on this.player
if (!this.player || !this.player[method]) {
let message = `ReactPlayer: ${this.constructor.displayName} player could not call %c${method}%c – `
if (!this.player) {
message += 'The player was not available'
} else if (!this.player[method]) {
message += 'The method was not available'
}
console.warn(message, 'font-weight: bold', '')
return null
}
return this.player[method](...args)
}

export function isMediaStream (url) {
return (
typeof window !== 'undefined' &&
typeof window.MediaStream !== 'undefined' &&
url instanceof window.MediaStream
)
}
```
The `utils` is very essential to our application as it provides multiple functions and helpers to ensure smooth running pf our video player. The various functions are discussed as follows:
- Call player function: this guards against errors in case the player is not available or the player couldn't be called.
- Query string function: receives an object, maps over, and extracts the key for querying.
- Fetch script function: this rejects all requests if loading the SDK fails. It also resets the array of requests for this SDK
- Get SDK: the function that loads an external SDK or returns the SDK if it is already loaded.
- Parse time function: the function that displays the video duration and calculates the hours, minutes, and seconds.
- Get Global function: this function handles window modules and exports.
- isMediaStream function: prevents undefined URL for breaking the player.

#### Step 5: Setting up the URL Decoder (Decoder.js)
The `Decoder` will check the URL and assign it to the appropriate component. if the URL matches the corresponding parser i.e. Facebook, YouTube, etc. it will then be decoded and transferred for buffering. To achieve this, we create a `Decoder.js` file, thereafter proceed with the code snippet below: 
```JavaScript
import { isMediaStream, isBlobUrl } from './utils'

export const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//
export const MATCH_URL_VIMEO = /vimeo\.com\/.+/
export const MATCH_URL_FACEBOOK = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/
export const MATCH_URL_FACEBOOK_WATCH = /^https?:\/\/fb\.watch\/.+$/
export const MATCH_URL_TWITCH_VIDEO = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/
export const MATCH_URL_TWITCH_CHANNEL = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/
export const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i

const canPlayFile = url => {
if (url instanceof Array) {
for (const item of url) {
if (typeof item === 'string' && canPlayFile(item)) {
return true
}
if (canPlayFile(item.src)) {
return true
}
}
return false
}
if (isMediaStream(url) || isBlobUrl(url)) {
return true
}
return (
AUDIO_EXTENSIONS.test(url) ||
VIDEO_EXTENSIONS.test(url) ||
HLS_EXTENSIONS.test(url) ||
DASH_EXTENSIONS.test(url) ||
FLV_EXTENSIONS.test(url)
)
}

export const canPlay = {
youtube: url => {
if (url instanceof Array) {
return url.every(item => MATCH_URL_YOUTUBE.test(item))
}
return MATCH_URL_YOUTUBE.test(url)
},
vimeo: url => MATCH_URL_VIMEO.test(url) && !VIDEO_EXTENSIONS.test(url) && !HLS_EXTENSIONS.test(url),
facebook: url => MATCH_URL_FACEBOOK.test(url) || MATCH_URL_FACEBOOK_WATCH.test(url),
twitch: url => MATCH_URL_TWITCH_VIDEO.test(url) || MATCH_URL_TWITCH_CHANNEL.test(url),
}
```
To understand what is going on under the hood, all we did was copy and paste the sources template URLs to compare and determine which component will handle the user's URL request. Once the URL is processed, the video stream is then forwarded to the player to be displayed. 

#### Step 6: Modifying the App (App.js)
to render the application in the `react-dom`, we must first setup the `App` component. to do that, We import all the necessary files and the `Player` component. finally, we modify the `App.js` file by implementing the code block below: 
```JavaScript
import React, { Component } from 'react'
import './App.css'
import Player from '../Player'
import './media/index'
class App extends Component {
state = {
url: null,
playing: true,
controls: false,
volume: 0.8,
muted: false,
played: 0,
loaded: 0,
duration: 0,
playbackRate: 1.0,
loop: false
}

load = url => {
this.setState({
url,
played: 0,
loaded: 0,
pip: false
})
}
handleStop = () => {
this.setState({ url: null, playing: false })
}
handleVolumeChange = e => {
this.setState({ volume: parseFloat(e.target.value) })
}
handleToggleMuted = () => {
this.setState({ muted: !this.state.muted })
}
handlePlay = () => {
console.log('onPlay')
this.setState({ playing: true })
}
handlePause = () => {
console.log('onPause')
this.setState({ playing: false })
}
handleEnded = () => {
console.log('onEnded')
this.setState({ playing: this.state.loop })
}
handleDuration = (duration) => {
console.log('onDuration', duration)
this.setState({ duration })
}
handleClickFullscreen = () => {
screenfull.request(findDOMNode(this.player))
}

ref = player => {
this.player = player
}

render () {
const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, pip } = this.state
return (
<div className='app'>
<section className='section'>
<h1>Player Demo</h1>
<div className='player-wrapper'>
<Player
ref={this.ref}
className='react-player'
width='100%'
height='100%'
url={url}
playing={playing}
controls={controls}
volume={volume}
muted={muted}
onPlay={this.handlePlay}
onPause={this.handlePause}
onEnded={this.handleEnded}
onError={e => console.log('onError', e)}
onProgress={this.handleProgress}
onDuration={this.handleDuration}
/>
</div>

<table>
<tbody>
<tr>
<th>Controls</th>
<td>
<button onClick={this.handleStop}>Stop</button>
<button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
<button onClick={this.handleClickFullscreen}>Fullscreen</button>
{light &&
<button onClick={() => this.player.showPreview()}>Show preview</button>}
{ReactPlayer.canEnablePIP(url) &&
<button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
</td>
</tr>
<tr>
<th>Volume</th>
<td>
<input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
</td>
</tr>
<tr>
<th>
<label htmlFor='controls'>Controls</label>
</th>
<td>
<input id='controls' type='checkbox' checked={controls} onChange={this.handleToggleControls} />
<em>&nbsp; Requires player reload</em>
</td>
</tr>
<tr>
<th>
<label htmlFor='muted'>Muted</label>
</th>
<td>
<input id='muted' type='checkbox' checked={muted} onChange={this.handleToggleMuted} />
</td>
</tr>
<tr>
<th>
<label htmlFor='loop'>Loop</label>
</th>
</tr>
<tr>
<th>
<label htmlFor='light'>Light mode</label>
</th>
<td>
<input id='light' type='checkbox' checked={light} onChange={this.handleToggleLight} />
</td>
</tr>
<tr>
<th>Played</th>
<td><progress max={1} value={played} /></td>
</tr>
<tr>
<th>Loaded</th>
<td><progress max={1} value={loaded} /></td>
</tr>
</tbody>
</table>
</section>
<section className='section'>
<table>
<tbody>
<tr>
<th>YouTube</th>
<td>
{this.renderLoadButton('https://www.youtube.com/watch?v=oUFJJNQGwhk', 'Test A')}
{this.renderLoadButton('https://www.youtube.com/watch?v=jNgP6d9HraI', 'Test B')}
</td>
</tr>
<tr>
<th>Facebook</th>
<td>
{this.renderLoadButton('https://www.facebook.com/facebook/videos/10153231379946729/', 'Test A')}
</td>
</tr>
<tr>
<th>Vimeo</th>
<td>
{this.renderLoadButton('https://vimeo.com/90509568', 'Test A')}
{this.renderLoadButton('https://vimeo.com/169599296', 'Test B')}
</td>
</tr>
<tr>
<th>Twitch</th>
<td>
{this.renderLoadButton('https://www.twitch.tv/videos/106400740', 'Test A')}
{this.renderLoadButton('https://www.twitch.tv/videos/12783852', 'Test B')}
</td>
</tr>
<tr>
<th>Custom URL</th>
<td>
<input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
<button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
</td>
</tr>
</tbody>
</table>
</section>
</div>
)
}
}
export default App
```
from the code block above, the complete multi-source video player is completed and ready for viewing.
To view the application, we need to start the `development server`. to do that, open your `command terminal` and run the command below:

```bash
npm start
```
alternatively
```bash
yarn start
```
#### Step 7: Styling the Video Player
Styling isn't the main focus of this article, but we will go ahead and compliment the inline styles we added to our components with some more styles. We will add some margins, colors, and adjusts the font sizes. To do that, in the `App.css` file, we implement the styles below:
```CSS
$column-width: 480px;
$gutter-width: 20px;
.app {
margin: auto;
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-weight: 300;
text-align: center;
}
.section {
display: inline-block;
max-width: $column-width;
margin: $gutter-width;
text-align: left;
vertical-align: top;
}
.player-wrapper {
width: 480px;
height: 270px;
}
.react-player {
margin-bottom: 10px;
background: rgba(0, 0, 0, .1);
}
.faded {
color: rgba(0, 0, 0, .5);
}
.footer {
margin: $gutter-width;
}
```
### Conclusion
We discussed extensively the various components and utilities required to set up a multi-source video player with React.js. the article covered in detail the various steps and dependencies to achieve the goal. Feel free to implement the code snippets in your video-based React.js project. And I hope you found this article useful.
Cheers,
Happy coding.
### References
https://reactjs.org/docs/getting-started.html
