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
import React from 'react'
import isEqual from 'react-fast-compare'

class Player extends React.Component {
static viewName = 'Player'
buffered = false
playerReady = false
videoPlaying = false // for bugs prevention
loadon_Ready = null
videoLoading = true // to ease loading and URL switching
videoStart = true
timeSeek = null
callDuration = false

componentDidMount (props) {
this.buffered = true // to load video when ready
}
componentDidUpdate (prevProps) {
// if no player is available, the component will do nothing
if (!this.player) {
return null
}
const { url, muted, playing, playbackRate,volume, pip, loop, activePlayer } = this.props
this.callDuration = false
this.videoStart = true
this.videoLoading = true
this.player.load(url, this.playerReady)
}
if (playing && !this.videoPlaying && !prevProps.playing  ) {
this.player.play()
}
if ( !playing && this.videoPlaying && prevProps.playing ) {
this.player.pause()
}
if ( volume !== null && prevProps.volume !== volume ) {
this.player.setVolume(volume)
}
if (prevProps.muted !== muted) {
if (muted == true) {
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
if (!this.playerReady) return null
return this.player.getDuration()
}
readyHandler = () => {
if (!this.buffered) return
this.videoLoading = false
this.playerReady = true
const { playing,, muted, volume, on_Ready} = this.props
on_Ready()
if (  volume !== null && !muted) {
this.player.setVolume(volume)
}
if (this.loadon_Ready) {
 this.loadon_Ready = null
this.player.load(this.loadon_Ready, true)
} else if (playing) {
this.player.play()
}
this.handleDurationCheck()
}

playHandler = () => {
 this.videoLoading = false
this.videoPlaying = true
const { playbackRate, onStart, on_play  } = this.props
if (this.videoStart) {
if (playbackRate !== 1 && this.player.setPlaybackRate  ) {
this.player.setPlaybackRate(playbackRate)
}
onStart()
this.videoStart = false
}
on_play()
if (this.timeSeek) {
 this.timeSeek = null
this.seek_to(this.timeSeek)
}
this.handleDurationCheck()
}

pauseHandler = (e) => {
this.videoPlaying = false
if (!this.videoLoading) {
this.props.on_pause(e)
}
}

playEnded = () => {
const {  loop,on_ended, playerActive,  } = this.props
if (loop && playerActive.loopon_ended  ) {
this.seek_to(0) // restarts the video when play is completed
}
if (!loop) {
this.videoPlaying = false
on_ended()
}
}

errorHandler = (...args) => {
 this.props.on_error(...args)
this.videoLoading = false
}

handleLoaded = () => {
// we set the videoLoading to false so the player doesnt get stuck
this.videoLoading = false
}

render () {
const Player = this.props.playerActive
if (!Player) {
return null
}
return (
<Player
{...this.props}
on_Mount={this.handlePlayerMount}
on_Ready={this.readyHandler}
on_play={this.playHandler}
on_pause={this.pauseHandler}
on_ended={this.playEnded}
on_Loaded={this.handleLoaded}
on_error={this.errorHandler}
/>
)
}
}
export default Player
```

The code snippet above looks complex, but not to worry I will explain what is going on there.
From the snippet above, we created some basic functions that will handle the player behavior, and they include the following:

- On play: this function handles the play operation, ie. When the user clicks the `play button`
- On pause: this function handles the pause operation, ie when the user clicks the `pause button`
- Get Duration: this function provides the video duration when the user hovers over the progress bar
- Progress bar: this function shows a moving bar to show the elapsed and remaining time to the user.
- On Ready: the `on_Ready` function handles the buffering of the video once loading is completed
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
import React from 'react'
import { call_player, get_SDK, } from '../utils'
import { can_play } from '../Decoder'

const URL_SDK = 'https://connect.facebook.net/en_US/sdk.js'
const GLOBAL_SDK = 'FB'
const GLOBAL_SDK_READY = 'fbAsyncInit'
const PLAYER_ID_STR = 'facebook-player-'

export default class Facebook extends React.Component {
 static can_play = can_play.facebook
static viewName = 'Facebook'

componentDidMount () {
 this.props.on_Mount(this) && this.props.on_Mount
}

call_player = call_player
player_ID =  `${PLAYER_ID_STR}` || this.props.config.player_Id

load ( playerReady, url,) {
if (playerReady) {
get_SDK(GLOBAL_SDK_READY, GLOBAL_SDK, URL_SDK).then(FB => FB.XFBML.parse())
return
}
get_SDK( GLOBAL_SDK_READY, GLOBAL_SDK,URL_SDK, ).then(FB => {
FB.init({
 version: this.props.config.version
xfbml: true,
appId: this.props.config.appId,
})
// adding event subscription
FB.Event.subscribe('xfbml.render', msg => {
 // to get notified when the player is loaded and ready
this.props.on_Loaded()
})
FB.Event.subscribe('xfbml.ready', msg => {
if (msg.type === 'video' && msg.id === this.player_ID) {
this.player = msg.instance
this.player.subscribe('playingStarted', this.props.on_play)
this.player.subscribe('videoPaused', this.props.on_pause)
this.player.subscribe('playingFinished', this.props.on_ended)
this.player.subscribe('bufferingStarted', this.props.on_buffer)
this.player.subscribe('bufferingFinished', this.props.on_bufferEnd)
this.player.subscribe('error', this.props.on_error)
if (this.props.muted) {
 // for muting
this.call_player('mute')
} else {
 // for unmuting
this.call_player('unmute')
}
this.props.on_Ready()
document.getElementById(this.player_ID).querySelector('iframe').style.visibility = 'visible'
}
})
})
}
// playing function
play () {
this.call_player('playVideo')
}
// pausing function
pause () {
this.call_player('pauseVideo')
}
stop () {
// does nothing
}
seek_to (seconds) {
this.call_player('seek', seconds)
}
mute = () => {
this.call_player('mute')
}
unmute = () => {
this.call_player('unmute')
}

render () {
let { attributes } = this.props.config
let propStyle = {
 height: '99%',
width: '99%'
}
return (
<div
className='fb-video'
style={propStyle}
id={this.player_ID}
data-href={this.props.url}
data-allowfullscreen='true'
data-controls={!this.props.controls ?  'false' : 'true'}
{...attributes}
data-auto_play={!this.props.playing ?'false' : 'true' }
/>
)
}
}
```

From the code snippet above, we created some functions to `get` and `load` the SDK from Facebook embed. Once the SDK is loaded, the video will be buffered and transferred to our `player` for rendering. Finally, we implemented the getDuration, play, pause, mute, stop and unmute handlers created in the `player` component.

#### The YouTube URL handler (YouTube.js)
YouTube is a video-based social networking website, and also an option in our video player. To provide our player access to videos from YouTube URLs, we need to create a handler for it. To do that, we create a `Youtube.js` file in the `media` folder already created. Then we go ahead with the code implementation below:

```JavaScript
import React from 'react'
import {parse_endTime, call_player, get_SDK, parse_StartTime, } from '../utils'
import {YOUTUBE_URL_MATCH, can_play} from '../Decoder'

const URL_SDK = 'https://www.youtube.com/iframe_api'
const GLOBAL_SDK = 'YT'
const GLOBAL_SDK_READY = 'onYouTubeIframeAPIReady'

 class YouTube extends React.Component {
static viewName = 'YouTube'
static can_play = can_play.youtube
call_player = call_player

componentDidMount () {
 this.props.on_Mount(this) && this.props.on_Mount
}
return url.match(YOUTUBE_URL_MATCH)[1]
}
load ( playerReady, url) {
const {  plays_inline, on_error, playing, controls, loop, muted, config, } = this.props
const {embed_Options, playerValues,  } = config
let id = this.getID(url)
if (playerReady) {
this.player.cueVideoById({
 startSeconds:playerValues.start || parse_StartTime(url) ,
video_Id: id,
endSeconds:playerValues.end ||  parse_endTime(url),
})
return
}
get_SDK(GLOBAL_SDK_READY, URL_SDK, GLOBAL_SDK, YT => YT.loaded).then(YT => {
if (!this.section) return
this.player = new YT.Player(this.section, {
 height: '99%',
width: '99%',
 video_Id: id,
playerValues: {
 mute: !muted ? 0 : 1,
auto_play: !playing ? 0 : 1,
origin: window.location.origin,
start: parse_StartTime(url),
controls: !controls ? 0 : 1,
end: parse_endTime(url),
plays_inline: !plays_inline ? 0 : 1,
...playerValues
...this.parsePlaylist(url),
},
events: {
on_Ready: () => {
if (loop) {
this.player.setLoop(true) // this is to loop the playlist
}
this.props.on_Ready()
},
on_error: e => on_error(e.data)
},
})
}, on_error)
}
on_StateChange = (e) => {
let { data } = e
const { on_play, loop, on_pause, on_buffer, on_ended, on_bufferEnd, on_Ready, config: {on_Unstarted, playerValues } } = this.props
const {  PLAYING, BUFFERING, PAUSED, UNSTARTED, CUED,  ENDED,  } = window[GLOBAL_SDK].PlayerState
if (data === UNSTARTED) on_Unstarted()
if (data === PLAYING) {
on_play()
on_bufferEnd()
}
if (data === BUFFERING) on_buffer()
if (data === PAUSED) on_pause()
if (data === ENDED) {
this.loop()
on_ended()
}
if (data === CUED) on_Ready()
}

play () {
this.call_player('playVideo')
}

pause () {
this.call_player('pauseVideo')
}
mute = () => {
this.call_player('mute')
}

unmute = () => {
this.call_player('unMute')
}
getDuration () {
return this.call_player('getDuration')
}
getCurrentTime () {
return this.call_player('getCurrentTime')
}
ref = section => {
this.section = section
}

render () {
let { display } = this.props
const propStyle = {
 display
 height: '99%',
width: '99%',
}
return (
 <React.Fragment>

<div style={propStyle}>
<div ref={this.ref} />
</div>
 </React.Fragment>
)
}
}
export default YouTube
```

As shown in the snippet above, similar to the `Facebook` component setup, we created and exported a class-based component. We used the SDK function like iframe functions to embed external links to a web page.
For better understanding, consider what happens when a video is loaded to a player, the user expects some basic operations examples including getting current time, getting duration of the video, pause, play stop, mute, etc. and we made available functions to handle those operations.

#### The Twitch URL handler (Twitch.js)
We have completed the creation and setup of the `Facebook` and `YouTube` components, time to proceed with the `Twitch` component. Similar to what we did earlier, in the `media` folder, create another file `Twitch.js`. thereafter we will set up the component by shipping the code snippet below:

```JavaScript
import React from 'react'

import { call_player, get_SDK, parse_StartTime } from '../utils'
import { can_play, MATCH_TWITCH_CHANNEL_URL, MATCH_TWITCH_VIDEO_URL } from '../Decoder'

const URL_SDK = 'https://player.twitch.tv/js/embed/v1.js'
const GLOBAL_SDK = 'Twitch'
const PLAYER_ID_STR = 'twitch-player'

 class Twitch extends React.Component {
static viewName = 'Twitch'
static can_play = can_play.twitch
static loopon_ended = true
call_player = call_player
player_ID = this.props.config.player_Id || `${PLAYER_ID_STR}`

componentDidMount () {
this.props.on_Mount && this.props.on_Mount(this)
}

load (playerReady, url) {
const { on_error, controls, config, plays_inline, } = this.props
const fromChannel = MATCH_TWITCH_CHANNEL_URL.test(url)
const id = fromChannel ? url.match(MATCH_TWITCH_CHANNEL_URL)[1] : url.match(MATCH_TWITCH_VIDEO_URL)[1]
if (playerReady) {
if (fromChannel) {
this.player.setChannel(id)
} else {
this.player.setVideo('v' + id)
}
return null
}

get_SDK(URL_SDK, GLOBAL_SDK).then(Twitch => {
this.player = new Twitch.Player(this.player_ID, {
video: fromChannel ? '' : id,
channel: fromChannel ? id : '',
width: '99%',
height: '99%',
auto_play: this.props.playing,
plays_inline: plays_inline,
time: parse_StartTime(url),
muted: this.props.muted,
controls: fromChannel ? true : controls,
...config.options
})
const { READY, PLAYING, PAUSE, ENDED, ONLINE, OFFLINE } = Twitch.Player
this.player.addEventListener(READY, this.props.on_Ready)
this.player.addEventListener(PLAYING, this.props.on_play)
this.player.addEventListener(PAUSE, this.props.on_pause)
this.player.addEventListener(ENDED, this.props.on_ended)
this.player.addEventListener(ONLINE, this.props.on_Loaded)
this.player.addEventListener(OFFLINE, this.props.on_Loaded)
}, on_error)
}

onPlay () {
this.call_player('play')
}

onPause () {
this.call_player('pause')
}

onStop () {
this.call_player('pause')
}
mute = () => {
this.call_player('setMuted', true)
}
unmute = () => {
this.call_player('setMuted', false)
}
getDuration () {
return this.call_player('getDuration')
}

render () {
const style = {
width: '100%',
height: '100%'
}
return (
<div style={style} id={this.player_ID} />
)
}
}
export default Twitch
```

The twitch setup is fairly easy to understand, the major difference from previous components setups is the offline playability. The twitch SDK provides offline playability once the video is already loaded, the process is called caching. Finally, we also handled looping and autoplay i.e. to restart the video automatically once the duration is exhausted and playing videos automatically after loading respectively.

#### The Vimeo URL handler (Vimeo.js)
Finally, we will equip our `Player` component with the required functions to render videos from Vimeo. Vimeo as we know it is a video hosting and sharing platform, so it should also be covered by our `video player`. First, we create a `Vimeo.js` file in our `media` folder. In the file, we create the required functions and logic by:

```JavaScript
import React from 'react'
import { call_player, get_SDK } from '../utils'
import { can_play } from '../Decoder

const URL_SDK = 'https://player.vimeo.com/api/player.js'
const GLOBAL_SDK = 'Vimeo'

export default class Vimeo extends React.Component {
static viewName = 'Vimeo'
static can_play = can_play.vimeo
static forceLoad = true
call_player = call_player
videoDuration = null

componentDidMount () {
this.props.on_Mount && this.props.on_Mount(this)
}

load (url) {
this.videoDuration = null
get_SDK(URL_SDK, GLOBAL_SDK).then(Vimeo => {
if (!this.section) return
this.player = new Vimeo.Player(this.section, {
url,
auto_play: this.props.playing,
loop: this.props.loop,
plays_inline: this.props.plays_inline,
muted: this.props.muted,
controls: this.props.controls,
...this.props.config.playerOptions
})
this.player.ready().then(() => {
const iframe = this.section.querySelector('iframe')
iframe.style.height = '99%'
iframe.style.width = '99%'
}).catch(this.props.on_error)
this.player.on('loaded', () => {
 this.refreshDuration()
this.props.on_Ready()
})
this.player.on('play', () => {
this.props.on_play()
this.refreshDuration()
})
this.player.on('pause', this.props.on_pause)
this.player.on('ended', this.props.on_ended)
this.player.on('error', this.props.on_error)
this.player.on('bufferstart', this.props.on_buffer)
this.player.on('bufferend', this.props.on_bufferEnd)
}, this.props.on_error)
}
play () {
const promise = this.call_player('play')
if (promise) {
promise.catch(this.props.on_error)
}
}
pause () {
this.call_player('pause')
}
stop () {
this.call_player('unload')
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
return this.videoDuration
}
ref = section => {
this.section = section
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
import { can_play } from '../Decoders'

export default [
{
key: 'youtube',
name: 'YouTube',
can_play: can_play.youtube,
lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerYouTube' */'./YouTube'))
},
{
key: 'vimeo',
name: 'Vimeo',
can_play: can_play.vimeo,
lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerVimeo' */'./Vimeo'))
},
{
key: 'facebook',
name: 'Facebook',
can_play: can_play.facebook,
lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerFacebook' */'./Facebook'))
},
{
key: 'twitch',
name: 'Twitch',
can_play: can_play.twitch,
lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerTwitch' */'./Twitch'))
},
]
```

#### Step 4: Setting up the Utilities (Utils.js)
As stated earlier, some `helpers functions` must be created for our application to perform the desired task of rendering videos from multiple URLs. to do that, we create a `Utils.js` file. then we proceed with the code block below:

```JavaScript
const START_STAMP_MATCH = /(\d+)(h|m|s)/g
const MATCH_NUMERIC = /^\d+$/

function parseTimeParam (pattern, url ) {
if (url instanceof Array) {
return undefined
}
const match = url.match(pattern)
if (match) {
const stamp = match[1]
if (stamp.match(START_STAMP_MATCH)) {
return parseTimeString(stamp)
}
if (MATCH_NUMERIC.test(stamp)) {
return parseInt(stamp)
}
}
return undefined
}

function parseTimeString (stamp) {
let sec = 0
let array = START_STAMP_MATCH.exec(stamp)
while (array !== null) {
const [time, count] = array
if (time === 'h') sec += parseInt(count, 10) * 3600
if (time === 'm') sec += parseInt(count, 10) * 60
if (time === 's') sec += parseInt(count, 10)
array = START_STAMP_MATCH.exec(stamp)
}
// returning the time format
return sec
}
export function queryString (object) {
return Object
.keys(object)
.map(key => `${key}=${object[key]}`)
.join('&')
}

function get_Global (key) {
if (window[key]) {
return window[key]
}

if (window.module && window.module.exports && window.module.exports[key]) {
return window.module.exports[key]
}
if (window.exports && window.exports[key]) {
return window.exports[key]
}
return null
}
const req = {}
export function get_SDK (url, sdkGlobal, sdkReady = null, isLoaded = () => true, fetchScript) {
const isGlobal = get_Global(sdkGlobal)
if (isGlobal && isLoaded(isGlobal)) {
return Promise.resolve(isGlobal)
}
req[url] = [{ reject, resolve,  }]
const on_Loaded = sdk => {
// each request will be resolved after loading
req[url].forEach(r => r.resolve(sdk))
}
fetchScript(url, err => {
if (err) {
req[url].forEach(request => request.reject(err))
req[url] = null
} else if (!sdkReady) {
on_Loaded(get_Global(sdkGlobal))
}
})
})
}
export function call_player (method, ...args) {
// we use this method to call the player
if (!this.player || !this.player[method]) {
let message = `ReactPlayer: ${this.constructor.viewName} could not call player %c${method}%c – `
if (!this.player) {
message += ' player unavailable'
} else if (!this.player[method]) {
message += 'call method unavailable'
}
console.warn(message, 'font-weight: bolder', '')
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
- Fetch script function: this handles and rejects all requests if loading the SDK fails.
- Get SDK: the function that loads an external SDK or returns the SDK if it is already loaded.
- Parse time function: the function that displays the video duration and calculates the hours, minutes, and seconds.
- Get Global function: this function handles window modules and exports.
- isMediaStream function: prevents undefined URL for breaking the player.

#### Step 5: Setting up the URL Decoder (Decoder.js)
The `Decoder` will check the URL and assign it to the appropriate component. if the URL matches the corresponding parser i.e. Facebook, YouTube, etc. it will then be decoded and transferred for buffering. To achieve this, we create a `Decoder.js` file, thereafter proceed with the code snippet below:

```JavaScript
import { isMediaStream, BlobURL } from './utils'

export const YOUTUBE_URL_MATCH = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//
export const MATCH_URL_VIMEO = /vimeo\.com\/.+/
export const MATCH_URL_FACEBOOK = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/
export const MATCH_URL_FACEBOOK_WATCH = /^https?:\/\/fb\.watch\/.+$/
export const MATCH_TWITCH_VIDEO_URL = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/
export const MATCH_TWITCH_CHANNEL_URL = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/
export const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i

const can_playFile = url => {
if (url instanceof Array) {
for (let entity of url) {
if (typeof entity === 'string' && can_playFile(entity)) {
return true
}
if (can_playFile(entity.src)) {
return true
}
}
return false
}
if (isMediaStream(url) || BlobURL(url)) {
return true
}
return (
AUDIO.test(url) ||
VIDEO.test(url) ||
HLS.test(url) ||
DASH.test(url) ||
FLV.test(url)
)
}

export const can_play = {
youtube: url => {
if (url instanceof Array) {
return url.every(entity => YOUTUBE_URL_MATCH.test(entity))
}
return YOUTUBE_URL_MATCH.test(url)
},
vimeo: url => MATCH_URL_VIMEO.test(url) && !VIDEO_EXTENSIONS.test(url) && !HLS_EXTENSIONS.test(url),
facebook: url => MATCH_URL_FACEBOOK.test(url) || MATCH_URL_FACEBOOK_WATCH.test(url),
twitch: url => MATCH_TWITCH_VIDEO_URL.test(url) || MATCH_TWITCH_CHANNEL_URL.test(url),
}
```

To understand what is going on under the hood, all we did was copy and paste the sources template URLs to compare and determine which component will handle the user's URL request. Once the URL is processed, the video stream is then forwarded to the player to be displayed.

#### Step 6: Modifying the App (App.js)
to render the application in the `react-dom`, we must first setup the `App` component. to do that, We import all the necessary files and the `Player` component. finally, we modify the `App.js` file by implementing the code block below:

```JavaScript
import React from 'react'
import './App.css'
import Player from '../Player'
import './media/index'
class App extends React.Component {
state = {
url: null,
playing: true,
controls: false,
loop: false,
muted: false,
playbackRate: 1.0,
played: 0,
volume: 0.7,
duration: 0,
loaded: 0,

}

load = url => {
this.setState({
url,
pip: false
loaded: 0,
played: 0,
}
)}
handleStop = (e) => {
this.setState({ url: null, playing: false })
}
handleVolumeChange = event => {
this.setState({ volume: parseFloat(event.target.value) })
}
handleToggleMuted = (e) => {
this.setState({ muted: !this.state.muted })
}
handlePlay = () => {
console.log('on_play')
this.setState({ playing: true })
}
handlePause = () => {
console.log('on_pause')
this.setState({ playing: false })
}
handleEnded = () => {
console.log('on_ended')
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
<h2>Video Player</h2>
<div
className='player-container'>
<Player
ref={this.ref}
className='video-player'
height='99%'
width='99%'
volume={volume}
url={url}
controls={controls}
playing={playing}
muted={muted}
on_play={this.handlePlay}
on_pause={this.handlePause}
on_ended={this.handleEnded}
on_error={e => console.warn('error occured', e)}
onProgress={this.handleProgress}
onDuration={this.handleDuration}
/></div>
<table>
<tbody>
<tr>
<th>Options</th>
<td>
<button onClick={this.handleStop}>Stop</button>
<button onClick={this.handlePlayPause}>{!playing ? 'Play':'Pause'}</button>
<button onClick={this.handleClickFullscreen}>Fullscreen</button>
{light &&
<button onClick={() => this.player.showPreview()}>Show preview</button>}
{ReactPlayer.canEnablePIP(url) &&
<button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
</td>
<br />
</tr>
<tr>
<th>Volume</th>
<td>
<input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange}/>
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
<th>YouTube Video</th>
<td>
{this.renderLoadButton('https://www.youtube.com/watch?v=oUFJJNQGwhk', 'Test A')}
</td>
</tr>
<tr>
<th>Facebook</th>
<td>
{this.renderLoadButton('https://www.facebook.com/facebook/videos/10153231379946729/', 'Test A')}
</td>
</tr>
<tr>
<th>Vimeo Video</th>
<td>
{this.renderLoadButton('https://vimeo.com/90509568', 'Test A')}
{this.renderLoadButton('https://vimeo.com/169599296', 'Test B')}
</td>
</tr>
<tr>
<th>Twitch Video</th>
<td>
{this.renderLoadButton('https://www.twitch.tv/videos/106400740', 'Test A')}
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
.player-container {
width: 480px;
height: 270px;
}
.video-player {
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
