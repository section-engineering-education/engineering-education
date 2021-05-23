---
layout: engineering-education
status: publish
published: true
url: /best-javascript-animation-libraries/
title: The Top 9 JavaScript Animation Libraries
description: In this tutorial we will go over the best JavaScript animation libraries such as anime.js, howler.js, and KUTE.js to name a few.
author: judy-nduati
date: 2020-11-12T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/best-javascript-animation-libraries/hero.jpg
    alt: JavaScript animation libraries image example
---
A well known programming language used for animating web applications is JavaScript. In this article, we will discuss JavaScript animation libraries in more depth.
<!--more-->
### Introduction
Animating with JavaScript libraries is more efficient and advanced compared to SVG and CSS. In today’s world, JavaScript is an essential language because of the magic it does while animating. Animations using JavaScript is a complex task to perform. It needs an extensive amount of knowledge and skills.

### Prerequisites
JavaScript Animation Libraries is an exciting and interactive topic. Therefore, I recommend the reader to have a basic understanding of HTML, CSS, and JavaScript.

### JavaScript Animations
Animations on web applications are appealing and grab the user’s attention. JavaScript can animate what CSS can’t. JavaScript is the preferred tool of use because it handles more complex and advanced effects.

There are several JavaScript animation libraries. Here is a list of the best JavaScript animation libraries you can use in your project.

### Anime.js
[Anime.js](https://animejs.com/) is one of the best and fastest JavaScript animation libraries that exist. Anime.js was created by Julian Gardner. The library has at least 37k stars and 2.7k forks on [GitHub](https://github.com/juliangarnier/anime).

Anime.js is a lightweight library, that animates CSS properties, DOM elements, and SVG on a webpage. It supports modern web browsers such as Chrome, Internet Explorer 10+, and Mozilla Firefox, to name a few. You can use anime.js to create both simple and complex animations on the web.

Anime.js has a built-in staggering system that creates ripples and makes overlapping animations appear less complex. This library allows you to create different animations, effects, properties, synchronize multiple instances, and control all animation features.

To get started with anime.js, the procedure is very simple. All you need is to include anime.js script from [anime.js Content Delivery Network (CDN)](https://cdnjs.com/libraries/animejs) on your HTML page.

```html
 <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
 ```

Here is a simple example of anime.js;

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <title>AnimeJS Animation</title>
  </head>
  <body>
    <div style="background-color: purple; height: 100px; width: 100px"></div>
    <script>
      anime({
        targets: "div",
        translateX: 600,
        translateY: 600,
        rotate: [180, -180],
        borderRadius: 150,
        duration: 3000,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
      });
    </script>
  </body>
</html>
```
![Anime.js](/engineering-education/best-javascript-animation-libraries/animejs.gif)

### Howler.js
[Howler.js](https://howlerjs.com/) is an open-source JavaScript audio library. It’s used in game development and audio-related web apps. Howler.js makes coding easy while working with audio in JavaScript on web platforms.

It lays out a modern audio library supporting the [Web Audio API](https://webaudio.github.io/web-audio-api/#OfflineAudioContext) and a fallback technique for [HTML5 Audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).

Howler.js supports all browser-ready files from MP3, MP4, DOLBY, MPEG, WEBA, OGG to WAV. The library controls audio patterns by playing, pausing, looping, and seek to rate. Loaded audios are cached automatically, resulting in a more excellent performance.

### KUTE.js
[KUTE.js](https://thednp.github.io/kute.js/) is a feature-rich JavaScript animation library.

It keeps on evolving, thus being modular. KUTE.js animation engine creates complex animations with elements that can't be animated using CSS properties.

KUTE.js library focuses on performance, code quality, memory effectiveness, and flexibility while animating different web app components. This animation engine animates CSS properties, SVG, and other text elements.

You can download the latest version of KUTE.js from its [projects page](https://thednp.github.io/kute.js/) or use [KUTE.js CDN](https://cdnjs.com/libraries/kute.js/1.6.1) to get started.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/kute.js/1.6.1/kute.min.js"></script>
```
Here is some KUTE.js code. Remember to copy the CSS code below in a file named style.css and put it in your working folder.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>KUTEJS</title>
  </head>
  <body>
    <div>
      <div class="object first"></div>
      <div class="object second"></div>
      <div class="object third"></div>
      <div class="object fourth"></div>
    </div>
    <button class="start">Start Animation</button>
  </body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/kute.js/1.6.1/kute.min.js"></script>
  <script type="text/javascript">
    var theObjects = document.querySelectorAll(".object");
    var startButton = document.querySelector(".start");

    var animateOpacity = KUTE.allFromTo(
      theObjects,
      {
        opacity: 2,
      },
      {
        opacity: 0.01,
      },
      {
        offset: 1000,
      }
    );
    startButton.addEventListener(
      "click",
      function () {
        animateOpacity.start();
      },
      false
    );
  </script>
</html>
```
Style.css file:

```css
body {
  margin: 40px;
  font-family: "Sans-serif";
  font-weight: 500;
  text-align: center;
}
.object {
  width: 90px;
  height: 90px;
  display: inline-block;
  border: 2px solid red;
  margin: 10px;
  opacity: 0.1;
}
.first {
  background: blue;
}
.second {
  background: purple;
}
.third {
  background: chocolate;
}
.fourth {
  background: magenta;
}
button {
  background: red;
  border: 1px solid cyan;
  font-family: "Sans-serif";
  border-radius: 8px;
  padding: 10px;
  margin: 40px 0;
  outline: none;
  cursor: pointer;
}
```
![KUTE.js](/engineering-education/best-javascript-animation-libraries/kutejs.gif)

### Mo.js
[Mo.js](https://mojs.github.io/) is a JavaScript animation library dedicated to motion graphics for web use.

This animation library is fantastic and fun because you do not have to be a prominent developer or artist to make animations. Mo.js, compared to other animation libraries, has a distinct syntax and code animation structure approach.

Mo.js is good at click-to-animate micro-interactions, dynamic lettering, and dozens of shape manipulations. Using Mo.js on your web app enhance your skills, improve your content visually, and make spectacular animations.

Here is an example of Mo.js;

```html
<html>
  <head>
    <title>Mo.js Animation</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <button class="start">Start</button>
    <div class="container">
      <div class="box x"></div>
      <div class="box y"></div>
      <div class="box z"></div>
    </div>
  </body>

  <script src="https://cdn.jsdelivr.net/npm/@mojs/core"></script>
  <script type="text/javascript">
    var A = new mojs.Html({
      el: ".x",
      x: {
        0: 200,
      },
      angleZ: {
        0: 180,
      },
      duration: 1500,
      repeat: 3,
      isYoyo: true,
    });
    var B = new mojs.Html({
      el: ".y",
      x: {
        200: 0,
      },
      angleY: {
        0: 720,
      },
      angleZ: {
        0: 720,
      },
      duration: 1500,
      repeat: 4,
    });
    var C = new mojs.Html({
      el: ".z",
      x: {
        0: 200,
      },
      angleY: {
        0: 360,
      },
      scaleZ: {
        1: 2,
      },
      skewX: {
        0: 60,
      },
      duration: 1500,
      repeat: 5,
      isYoyo: true,
    });
    document.querySelector(".start").addEventListener("click", function () {
      A.play();
      B.play();
      C.play();
    });
  </script>
</html>
```
Mo.js style.css file:

```css
body {
  margin: 20px auto;
  font-family: "Serif";
  font-weight: 300;
  width: 600px;
  font-size: 1.3em;
}
.box {
  width: 70px;
  height: 70px;
  margin-top: 40px;
}
.x {
  background: cyan;
}
.y {
  background: purple;
}
.z {
  background: orange;
}
.container {
  perspective: 100px;
}
.start {
  background: red;
  border: none;
  color: white;
  font-family: "Serif";
  padding: 10px 15px;
  cursor: pointer;
  outline: none;
  margin: 20px;
  font-weight: 300;
}
```
![Mo.js](/engineering-education/best-javascript-animation-libraries/mojs.gif)

### Velocity.js
[Velocity.js](http://velocityjs.org/) is a JavaScript animation library for fast performing animations.

Created by [Julian Shapiro](https://github.com/julianshapiro/velocity) to solve the problem of JQuery’s slowness when animating complex or extensive animations.

Velocity.js works with and without JQuery. It uses same API as JQuery `$.animate()`, to use velocity.js you replace instances from `$.animate()` to `$.velocity()`.

Velocity.js is a high powered animation engine that creates high-quality animations. It improves the website interface and provides a simple experience to the user. Velocity.js helps you animate, fade and slide animations, color animations, SVG animations, transforms, scrolling, and loops.

### Three.js
[Three.js](https://threejs.org/) is a lightweight and user-friendly JavaScript 3D animation library. It makes it easy to come up with 3D content on a web page. Three.js uses WebGL (Web Graphics Library) to draw 3D animations.

WebGL is a JavaScript API for rendering interactive 3D graphics. It creates a scene with a camera and a geometric cube. A WebGL renderer is created for the scene and the camera.

WebGL renders (draw) 3D graphics on the scene inside the geometric cube. Finally, the geometric cube is animated within the scene for the camera.

To get started with Three.js, download its latest version or reference it from [Three.js CDN](https://cdnjs.com/libraries/three.js). Then include the script on your page using a script tag.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js "></script>
```
Three.js example;
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Three.js Animation</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <canvas id="graphics-box"></canvas>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js "></script>
    <script>
      function main() {
        const canvas = document.querySelector("#graphics-box");
        const renderer = new THREE.WebGLRenderer({ canvas });
        const fov = 80;
        const aspect = 2;
        const near = 0.2;
        const far = 4;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 4;
        const scene = new THREE.Scene();
        const boxWidth = 2;
        const boxHeight = 2;
        const boxDepth = 4;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        const material = new THREE.MeshBasicMaterial({ color: 0x32aa72 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        function render(time) {
          time *= 0.0002; // convert time to seconds
          cube.rotation.x = time;
          cube.rotation.y = time;
          renderer.render(scene, camera);
          requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
      }
      main();
    </script>
  </body>
</html>
```

Style.css file:

```css
body {
  margin: 0;
  height: 200vh;
}
canvas {
  display: block;
}
```

![Three.js](/engineering-education/best-javascript-animation-libraries/threejs.gif)

### GreenSock.js
[GreenSock Animation Platform (GSAP)](https://greensock.com/) is a powerful JavaScript animation library that is lightweight. It makes animations flow faster and easy to use. GSAP enables developers to create animations that look great in all major browsers, such as Chrome, Mozilla Firefox, and Internet Explorer 11+.

It has a ton of features that make it unique:

We use GSAP with DOM elements, CSS animations, SVG, WebGL, strings, colors, and motion paths. Also, it solves problems when things fall apart on browsers, thus enabling animations to work well.

Here is a simple example of GSAP:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        background: #f3034f;
        display: flex;
        width: 92vw;
        height: 88vh;
        justify-content: center;
        align-items: center;
      }

      .circle {
        background: #78db74;
        width: 50px;
        height: 50px;
        border-radius: 100%;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
    <title>GreenSockJs Animation</title>
  </head>
  <body>
    <div class="circle"></div>
    <script>
      gsap.to(".circle", {
        duration: 3,
        x: 1000,
        scale: 4,
      });
    </script>
  </body>
</html>
```
![GSAP.js](/engineering-education/best-javascript-animation-libraries/gsapjs.gif)

### Popmotion.js
[Popmotion.js](https://popmotion.io/) is a lightweight and robust JavaScript animation library. It is powerful because it supports animations like Keyframes, spring, decay, and complex animations.
Popmotion.js makes it easy for front-end developers and web designers to animate 3D objects, React components, SVG, CSS, and DOM elements.

### Typed.js
[Typed.js](https://mattboldt.com/demos/typed-js/) is a JavaScript animation library that provides the experience of creating a typing animation on your webpage. It has various options to change how the animations function.

Typed.js options include; strings, type speed, start delay, loop, back speed, and back delay.

To get started with type.js, download the latest version of the animation library from GitHub or use [type.js CDN](https://github.com/mattboldt/typed.js/blob/master/README.md). Then include the script to your page using a script tag.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Typed.js Animation</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="center">
      <p>This is <span class="animate"></span></p>
    </div>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.11"></script>
  <script src="typed.js"></script>
  <script>
    var typed = new Typed(".animate", {
      strings: [
        "Section Community",
        "typed.js Animation, It creates typing animations on a web page",
      ],
      typeSpeed: 40,
      backDelay: 50,
      backSpeed: 30,
      loop: true,
    });
  </script>
</html>
```

Here is type.js style.css file:

```css
body {
  margin: 0;
  padding: 0;
  background: #8b008b;
}
.center {
  top: 55%;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 200;
  font-size: large;
  width: 100%;
}
```
![Type.js](/engineering-education/best-javascript-animation-libraries/typejs.gif)

### Conclusion
There are many JavaScript animation libraries that can be implemented on your projects. Those listed above are a few with the best combination of complexity, ease, and stability. Each animation library differs from others and each fit different situations.

Let’s suppose you are looking for a powerful animation. The best JavaScript library options to go for is Anime.js, Velocity.js, GreenSock.js, and Popmotion.js.

If you are looking for an audio library, the best option is Howler.js. If you want 3D animations, the best JavaScript animation to use is Three.js.

If you are looking for a JavaScript animation library great for creating typing animations used on webpages, then Type.js is the best option.

Although using a JavaScript animation library makes your web application stand out. Overdoing it, beats the purpose and often confuses the user. Be careful and sensibly use animations.

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
