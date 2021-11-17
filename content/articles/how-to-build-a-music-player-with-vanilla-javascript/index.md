---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-music-player-with-vanilla-javascript/
title: Building a Music Player with Vanilla JavaScript
description: In this article, we will demonstrate how to create a music player using HTML, CSS, JavaScript, and the HTML5 Audio API for playing music via a brower.
author: doro-onome
date: 2021-08-25T00:00:00-17:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-music-player-with-vanilla-javascript/hero.jpg
    alt: Music player with vanilla Javascript
---
Streaming music is a major activity people use the internet these days. For this reason, creating a media platform with a regular music player app features is great and fun project.
<!--more-->
In this article, we will show you how to create a music player using HTML, CSS, JavaScript, and the HTML5 Audio API with which can play music on your browser.

### Prerequisites
- A good code editor. For example: Visual Studio Code.
- Some knowledge of HTML, CSS, and JavaScript.

### Designing the music player
The first thing you have to do is to create three files in your code editor. 

Name them `index.html` for your HTML code, `style.css` for your CSS code, and a `script.js` for the JavaScript. 

You will also need to download three songs as `.mp3` files and their corresponding images as `.jpg` files. You can find the images and music used on this project on my [Github](https://github.com/Nomzy-kush/Music-Player-with-JS) repository.

In your `index.html` file, copy and paste the following code to create the structure of the music player.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Music Player</title>
  </head>
  <body>
    <h1>Music Player</h1>
    <div class="music-container" id="music-container">
      <div class="music-info">
        <h4 id="title"></h4>
        <div class="progress-container" id="progress-container">
          <div class="progress" id="progress"></div>
        </div>
      </div>
      <audio src="music/Polo G – I Know.mp3" id="audio"></audio>
      <div class="img-container">
        <img src="images/Polo G – I Know.jpg" alt="music-cover" id="cover" />
      </div>
      <div class="navigation">
        <button id="prev" class="action-btn">
          <i class="fas fa-backward"></i>
        </button>
        <button id="play" class="action-btn action-btn-big">
          <i class="fas fa-play"></i>
        </button>
        <button id="next" class="action-btn">
          <i class="fas fa-forward"></i>
        </button>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>

```

The music container contains the music title, the progress bar, the previous, play, next button icons, and the music image. Here is the CSS for the index.html file.

```css
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-image: linear-gradient(
    0deg,
    #8A2BE2,
    #9370DB
  );
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  margin: 0;
}

/* styling the outer music container */
.music-container {
  background-color: #efefef;
  box-shadow: inset -1px -1px 5px rgba(33,33,33, 0.5), inset 1px 1px 5px rgba(33,33,33,0.5); 
  display: flex;
  padding: 20px 30px;
  position: relative;
  margin: 100px 0;
  z-index: 10;
}

.img-container {
  position: relative;
  width: 110px;
}

/* styling the image to look like a disc by placing a small circle in it*/
.img-container::after {
  content: '';
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, 50%);
}

/* using animation to make the image rotate continiously when music is playing */
.img-container img {
  border-radius: 50%;
  object-fit: cover;
  height: 110px;
  width: inherit;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: rotate 3s linear infinite;

  animation-play-state: paused;
}

/* making sure the image rotates only when the music is playing */
.music-container.play .img-container img {
  animation-play-state: running;
}

/* creating the animation keyframe and setting the image to rotate 360 degrees continiously */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* styling the navigation buttons */
.action-btn {
  border: 0;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin: 0 20px;
}

.action-btn.action-btn-big {
  font-size: 30px;
  outline: none;
}

.action-btn:focus {
  outline: 0;
}

/* styling the music-info div by placing it under the music container */
.music-info {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 0;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  z-index: 0;
}

/* making the music info pop up when the music playing using the transform property*/
.music-container.play .music-info {
  opacity: 1;
  transform: translateY(-100%);
}

.music-info h4 {
  margin: 0;
}

/* styling the song progress container */
.progress-container {
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  height: 4px;
  width: 100%;
}

/* styling the actual progress bar and making it flow along with the song*/
.progress {
  background-color: #fe8daa;
  border-radius: 5px;
  height: 100%;
  width: 0%;
  transition: width 0.1s linear;
}

```

You have successfully designed the music player and added a bit of animation in the music theme image, making it rotate when the music is playing. 

You will see that in action after coding the JavaScript.

Here’s what the music player looks like at this point:

![music-player](/engineering-education/how-to-build-a-music-player-with-vanilla-javascript/music-player.jpg)

### JavaScript
In your JavaScript file, the first thing we need to do is to bring in the different elements we need into the DOM using the code snippets below:

```js
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

```

The next step is to arrange your songs with their song titles in an array. Your song titles need to match the pieces you have in your music folder.

Below is an array containing the songs I picked to use for this project.

```js
const songs = [
    'Juice WRLD Ft Benny Blanco - Real Shit',
    'Lil Baby, Lil Durk ft Rodwave - Rich Off Pain',
    'Polo G – I Know'
];
```

We need to keep track of the songs by setting the default initial song index to 2, the third song on the array.

```js
let songIndex = 2;
```

### The loadSong function
Next, you need to initially load your songs into the Document Object Module (DOM) using the code below:

```js
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
```

In this function, you are updating the song title, the audio source, and the image source.

Like mentioned earlier, your songs must be `.mp3` files and your pictures `.jpg` files if you want to use this exact script. 

Your song names must match your image names as well. At this point, if you change your song index, the song image will change with the corresponding index you input.

The next function is to make the `play button` play your songs. It should also change to the `pause button` while the song is playing. 

To do this, we need to create an event listener at the bottom of our code to listen for a click event on the play and pause buttons. 

```js
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
```

Now, you need to create the `playSong()` and `pauseSong()` functions.

### The playSong function
Use the code snippets below to implement the playSong function.

```js
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}
```


### The pauseSong function
Below is the code to implement the `pauseSong()` function. It does just the opposite of `playSong()`.

```js
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}
```

At this point, when you click the `play button`, it automatically switches to the `pause button`. The song details will also pop up, and the song image will start spinning.

The exact opposite occurs when the `pause button` is clicked. 

>Note that the `audio.play()` and `audio.pause()` functions actually plays and pauses the songs, respectively.

Next, you need to implement the `previous` and `next` buttons, and you’re going to need event listeners for these operations.

```js
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
```

Now, you have to create the `prevSong` and the `nextSong` functions.

### The prevSong function
When you click the `previous button`, the player should play the previous song in the songs array. You can do that by just decrementing the song index. 

You should ensure that the value of the song index does not decrease lower than 0. If it does, the player should loop back to the initial `songs.length -1`. 

You can implement these functions using the code below:

```js
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}
```

### The nextSong function
This time, when you click the next button, you want the song to skip to the next song. You can do that by incrementing the value of the song index. You also have to check the song index value, so it does not exceed the value of the `songs.length - 1`. 

```javascript
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

```

The last thing you need to do is to implement the progress bar. The progress bar contains the song title and the progress of the song being played, as well as the timer.

To implement this, you need to add an event listener to the `audio` tag, and with the HTML audio tag with the API, there’s an event called `timeupdate` which you will call in your event listener using the code below:

```js
audio.addEventListener('timeupdate', updateProgress);
```

### The updateProgress function
This function will take in an event object, and in this event object, you can get the duration of the song and the current time. You will also set the percentage of the progress by dividing the current time divided by the song duration.

Here is the code to constantly update the progress bar in your music player.

```js
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
```

### Additional functionalities
While your music is playing, you may want to click anywhere on the progress bar and have the song skip to that point. 

In order to do this we have to create an event listener which will listen for a click on the progress bar using the snippets below:

```js
progressContainer.addEventListener('click', setProgress);
```

Now, we have to create the `setProgress` function.

### The setProgress function
In this function, we are going to pass in an event object. We are going to target the width and set it to `this.clientWidth`. Then, we will get the exact position we click on the x-axis within the progress bar using `e.offsetX`. 

The next thing we want to get is the complete duration of the song by saying `audio.duration`. 

Lastly, you have to set the current time to wherever you click. 

Below is the code to set our progress bar:

```js
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
```

The last functionality we want to implement is making the music player automatically play the next song when the current song ends. 

To do that, we have to create an event listener for the audio API and listen for `ended,` and just call the `nextSong` function we created earlier.

```js
audio.addEventListener('ended', nextSong);
```

Below is a video of the music player and all its functionalities in use:

<iframe width="478" height="269" src="https://www.youtube.com/embed/7dIH4kf0Et0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion
In this tutorial we made use of CSS animation, pure Vanilla JavaScript with modern ES6 practices. With that, we have a fully functional music player app in the browser. 

You can also add additional features to the project by cloning the repository on my Github account.

The source code of our application is available on [GitHub](https://github.com/Nomzy-kush/Music-Player-with-JS).

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
