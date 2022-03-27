---
layout: engineering-education
status: publish
published: true
url: /build-a-portfolio-website-with-vite-and-threejs/
title: Build a Portfolio Website with Vite and Three.js
description:  In this tutorial, we will be building a portfolio website with Three.js and Vite. 
author: oyedele-temitope
date: 2022-02-01T00:00:00-10:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/build-a-portfolio-website-with-vite-and-threejs/hero.png
   alt: Implementing GANs example image
---

A portfolio is a collection of photos or photographs of examples of your works used when entering competitions or applying for jobs. Your portfolio website is likely to be the first place someone goes after reading your CV, so it's vital to make a great first impression. In this tutorial, we'll be building a portfolio website with Three.js. So let's get started.

<!-- more -->

### What Is Threejs
Three.js is a JavaScript framework that allows you to quickly build a 3D or 2D graphic on your web page. With Three.js, we don't have to use  WebGL directly. It's an abstract layer built on WebGL to make it easier to use. Anyone can use a web browser to view 3D graphics without downloading any extra frameworks. Since Three.js is built on JavaScript, adding interactivity between 3D objects and user interfaces is quite simple. This makes Three.js ideal for creating 3D games on the web platform. It also offers exceptional features such as effects, scenes, cameras, etc.

Three.js has been around for a long time. To understand Three.js, we must first understand what WebGL is. WebGL is a JavaScript API for generating high-performance interactive 3D and 2D graphics. WebGL can be used without any plug-ins in any supported web browser. WebGL is based on OpenGL ES (embedded systems). The main drawback of WebGL is that the application development has extensive and heavy code. You can check out their [documentation to know more](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API).

Three.js allows you to write short lines of code. With Three.js, you can create video games and showcase products in a 3D form. You can also import into Three.js to create a complex object using 3D software like blender. To learn more about Three.js, go to their [website and check the documentation](https://threejs.org/).

The main limitation of using Three.js is the performance. We don’t have the same performance between a native application and a web application with WebGL.

### What Is Vitejs?
It's a JavaScript development server that significantly improves the frontend development experience. So we can say it is a build tool for your development. It takes your code and transforms it into something that your browser understands.

Vite allows you to have a development server running. It also handles and refreshes your files based on what has changed. This process is done extremely fast to reflect your changes on the browser. Other features include:

- Bare module resolving.
- Hot module replacement.
- On-demand compilation.
- Advance configuration.

### Prerequisites
To follow along with this guide, you need to have:

- Basic understanding of the JavaScript programming language.
- A set of image templates

### Building The Portfolio
First, navigate to the folder where you want your project to live and run the following command:

```bash
npm init vite
```

After running these instructions, we will be able to name our project. We'll also choose a framework from a list of alternatives. Select `vanilla:vanilla`.

Navigate to the project folder we just created using the `cd` command and install the Three.js package:

```bash
 cd your_project_folder
```

Install Three.js.

```bash
npm install three   
```

Let’s start up our application:

```bash
npm run dev
```

Open up [http://localhost:3000/](http://localhost:3000/) in your browser.

We want to edit the `style.css` and `main.js.`. So, go to `style.css` and `main.js` and delete the existing code to start building our portfolio application.

First, head over to `index.html` and add a `canvas` to the body with an `id` of `bg`. This will be the element that shows the actual Three.js scene:

```html
<canvas id="bg"></canvas>
```

Let’s head over to `styles.css` to give the canvas fixed positioning and also pin it to the top left corner of the screen:

```css
canvas{
 position: fixed;
 top: 0;
 left: 0;
}
```

This will serve as a background for our portfolio. Now we’ll go into our `main.js` file and import our Three.js library:

```javascript
import * as THREE from 'three'
```

When working with 3D development using Three.js, there are elements that we need to change. These include:

- **Scene** - a scene is a container of layers. It also holds our objects, cameras, and lights.
- **Camera** - allow the perception of the object to replicate three dimensions.
- **Renderer** - used to render the actual graphic to the scene.
  
We need to import the above objects to our project. Let’s paste this code block just below the imported package of the `main.js` file:

```javascript
const scene  = new THREE.Scene();
 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
 
const renderer = new THREE.WebGLRenderer({
 canvas: document.querySelector('#bg'),
});
 
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
 
renderer.render(scene, camera);
```

The `perspectiveCamera` behaves similar to how the human eyeballs do. However, when we look at our app, the output should be black. That's because we haven't created an object yet. Let's do so using these steps:

- Geometry is a set of vectors that define the object itself. For example, in Three.js, there are a bunch of geometries such as cylinder, cone, box, etc. So let’s go ahead and create new geometry. Paste this code inside the `main.js` file:

```javascript
const geometry =  new THREE.TorusGeometry(10,3,16,100)
```

- **Material**: Now that we created a geometry, let's add a material. Think of material as wrapping paper for geometry. Three.js has different materials that give different results. First, we’ll be using a basic material with no light source. So let’s paste this right under our geometry:

```javascript
const material =  new THREE.MeshBasicMaterial({color:0xFF6347, wireframe:true});
```

- **Mesh**: We can achieve this by combining geometry with the material. Let’s paste this:

```javascript
const torus = new THREE.Mesh(geometry, material);


scene.add(torus)
```

Let’s call it out using the function that gives us an infinite loop. This calls the render method automatically.

```javascript
function animate(){
 requestAnimationFrame(animate);
 renderer.render(scene, camera);
}
 
animate()
```

Here we have a function named `animate`. This calls the `requestAnimationFrame` in the browser. It is a mechanism that tells the browser that you want to perform an animation. The browser can then call the render method to update the UI. Just think of this as a game loop.

Let’s check our browser.

![torus](/engineering-education/build-a-portfolio-website-with-vite-and-threejs/torus-shape.png)

Our torus has no movement, so let's change that. Go back to our animation loop and add this:

```javascript
 torus.rotation.x += 0.01;
 torus.rotation.y += 0.005;
 torus.rotation.y += 0.01;
```

Every shape used has a different position, rotation, and scale properties. What we did here was change the rotation along the x-axis by 0.01. We also did the same for the y and z-axis (changing the rotation along their axis). Let’s go back to our app:

![torus_round](/engineering-education/build-a-portfolio-website-with-vite-and-threejs/torus-round.gif)

As you can see, it’s animating in an infinite loop. Pretty cool, right? Now we want to introduce the concept of lightning. Lightening is what makes your 3D objects come to life. Let’s go back to our material. Change from `MeshBasicMaterial` to `MeshStandardMaterial`. This is a material that will react to light bouncing off it. Let’s also remove the `wireframe` property, so our material will look like this:

```javascript
const material =  new THREE.MeshStandardMaterial({color:0xFF6347});
```

Let’s go back to our browser. You’ll notice we have a black screen again. This is because we don't have anything lightening our object. So let’s create one. Paste this code right after the `scene.add(torus)`:

```javascript
scene.add(torus)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
 const ambientLight = new THREE.AmbientLight(0xffffff);
 scene.add(pointLight, ambientLight)
 ```

Here we are instantiating a new `pointLight` with a colour of white, setting its values, and adding it to our scene. We also instantiated an ambient light. It will give lightening to the entire scene equally.

Let’s add a `lightHelper` and a `gridHelper`. A `lightHelper` is used to show the position of a `pointLight`. While the `gridHelper` draws a two-dimensional grid. So let’s add it to the scene:

```javascript
const lightHelper = new THREE.PointLightHelper(pointLight)
 const gridHelper = new THREE.GridHelper(200,50);
 scene.add(lightHelper)
 ```

Let’s add `OrbitControls` to it. This will allow us to move around the scene using our mouse. To do that, we first have to import the `OrbitsControls` from Three.js:

```javascript
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
```

Once we’ve done that, we can now instantiate the OrbitControls class and pass in our arguments. Right after our `scene.add`, add the following:

```javascript
const controls = new OrbitControls(camera,renderer.domElement);
```

This would listen to `dom` events on the mouse and update the camera position accordingly.

We then need to call a `controls.update` in the animation loop to ensure that the UI reflects the changes. So inside our function `animate`, add this:

```javascript
controls.update();
```  

Check out the result in the browser by panning around with your mouse.

Now that we’re done with that, let’s generate many objects for our scene. We'll use the math helpers in Three.js to do that. First, we’ll create a function and instantiate a sphere geometry. Let's add this code block:

```javascript
function addStar(){
 const geometry = new THREE.SphereGeometry(0.25);
 const material = new THREE.MeshStandardMaterial({color: 0xffffff})
 const star = new THREE.Mesh( geometry, material);
 const [x,y,z]= Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
 
 star.position.set(x,y,z);
 scene.add(star)
 }
 
 Array(250).fill().forEach(addStar)
 ```

If you look at your browser, you will see that the scene is populated with 250 randomly generated stars.

Let’s add a simple image background to it. We’ll be using Three.js `textureLoader`:

 ```javascript
 const spaceTexture = new THREE.TextureLoader().load('your image.jpg');
 scene.background = spaceTexture;
```

Now our scene is starting to look better. We can also add textures to individual materials. This is known as texture mapping. Texture mapping is the process of taking a two-dimensional pixel and mapping them to a 3-dimensional geometry. Let’s load another image using a `textureLoader`. We'll also create a mesh that contains a box geometry and a basic material. We'll be adding that to the scene, so we paste this in:

```javascript
const avatarTexture = new THREE.TextureLoader().load('your image');
 
const avatar = new THREE.Mesh(
 new THREE.BoxGeometry(5,5,5),
 new THREE.MeshBasicMaterial({map: avatarTexture})
);
 
scene.add(avatar);
```

When we check our browser, we should see a 3D cube with the image map to all six sides. We can also combine many maps to create more interesting objects, just like what we’ll do for our image cube. Let’s create a new mesh named planet:

```javascript
const planetTexture = new THREE.TextureLoader().load('your image');
 
 
const planet =  new THREE.Mesh(
 new THREE.SphereGeometry(3,32,32),
 new THREE.MeshStandardMaterial({map: planetTexture,})
);
 
scene.add(planet);
```

Next up, let’s head to our `index.html` and add some markups inside our `canvas`.

```html
<main>
 
 <header>
 <h1>Temitope</h1>
 <p>🚀 Welcome to my website!</p>
 </header>
 
 
 <blockquote>
 <p>I love to make things and also write about things i've loved and experienced</p>
 </blockquote>
 
 <section>
 <h2>📜 About me</h2>
 <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>
 
 <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>
 
 <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>
 
 </section>
 
 <section class="light">
 <h2>👩🏽‍🚀 My Projects</h2>
 
 <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>
 
 <h2>🏆 Awards</h2>
 
 <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>
 
 </section>
 
 <blockquote>
 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br>-temitope</p>
 </blockquote>
 
 <section class="left">
 <h2>🌮 Places i've worked</h2>
 
 <h3>Mcanderson institute of technology</h3>
 <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>
 <h3>Strapi</h3>
 <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>
 <h3>Logrocket</h3>
 <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>
 
 </section>
 
 <blockquote>
 <p>Thanks for viewing!</p>
 </blockquote>
 
 
 </main>
```

Let’s make our main element absolute. Then, in our `style.css`, add this code block:

```css
main{
 position: absolute;
}
```

Let’s re-position our planet and also create a function `moveCamera`:

```javascript
planet.position.z = 30;
planet.position.setX(-10);
 
function moveCamera(){
const t = document.body.getBoundingClientRect().top;
planet.rotation.x += 0.05;
planet.rotation.y += 0.075;
planet.rotation.z += 0.05;
 
avatar.rotation.y += 0.01;
avatar.rotation.z += 0.01;
 
camera.position.z = t * -0.01;
camera.position.x = t * -0.0002;
camera.rotation.y = t * -0.0002;
}
 
document.body.onscroll = moveCamera
```

The `GetboundlingClientRect` gives the dimension of the viewport. This helps us calculate where the user is usually scrolled to. We also gave rotation properties to the planet, avatar, and the camera's position.

We are almost done! Let’s go back to our `styles.css`. Highlight all and paste this in:

```css
@import url("https://use.typekit.net/jmk3xov.css");
 
canvas {
 position: fixed;
 top: 0;
 left: 0;
}
 
 
:root {
 --dark-bg: rgba(15, 15, 15, 0.95);
 --spacing: 350px;
 
 font-family: brandon-grotesque, sans-serif;
 font-weight: 400;
 font-style: normal;
}
 
 
main {
 width: 100vw;
 color: white;
 z-index: 99;
 position: absolute;
 width: 100%;
 margin: 0px auto;
 padding: 120px 0px;
 
 display: grid;
 grid-template-columns: repeat(12, 1fr);
}
 
h1, h2, h3, blockquote {
 font-family: elevon, sans-serif;
 font-weight: 700;
 font-style: normal;
}
 
canvas {
 position: fixed;
 top: 0;
 left: 0;
}
 
 
 
 header {
 background: var(--dark-bg);
 grid-column: 2 / span 5;
 font-size: 2.5rem;
 padding: 2rem;
 margin-bottom: var(--spacing);
  }
 
 section {
 grid-column: 2 / 8;
 padding: 1rem;
 background: var(--dark-bg);
 font-size: 1.25rem;
 line-height: 1.5;
 margin-bottom: var(--spacing);
  }
 
 blockquote {
 margin: 0;
 padding: 0;
 grid-column: 2 / span 9;
 margin-bottom: var(--spacing);
  }
 
 blockquote p {
 color: black;
 background-color: white;
 font-size: 4rem;
 display: inline;
 line-height: 1;
  }
 
 .left {
 grid-column: 6 / 12;
  }
```

Check out the result in our browser.

![final_view](/engineering-education/build-a-portfolio-website-with-vite-and-threejs/final-view.gif)

We have created a portfolio website using Three.js. You can go ahead and add more Three.js features.

### Conclusion
This article discussed what Three.js is and what it can be used for, its relationship with WebGL. We also talked briefly about some terms and concepts while building our portfolio project. I hope you enjoyed this article. Here’s a link to the [GitHub](https://github.com/oyedeletemitope/Build-a-portfolio-website-with-vite-and-threejs) repository for this project. 

Please share if you find this helpful. 

Happy coding!

### References
- [Three.js Beginner’s Tutorial](https://www.youtube.com/watch?v=Q7AOvWpIVHU)
- [WebGL Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [Threejs Docs](https://threejs.org/)

---
Peer Review Contributions by: [Joseph Chege](/engineering-education/authors/joseph-chege/)
