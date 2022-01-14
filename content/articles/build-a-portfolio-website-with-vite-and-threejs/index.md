
 Most visual mindblowing websites in the world seem to follow a similar pattern, they use 3d animations that bring the content to life when the page is scrolled. We'll be working on something similar in this tutorial by building a portfolio website with Three.js. So let's get started.

### What Is Threejs

Three.js is a JavaScript framework that allows you to easily build a 3d or 2d graphic on your webpage without using WebGl directly. It's essentially an abstract layer built on top of webGl to make it easier to use. Anyone can simply use the Web browser to experience 3D graphics without having to download any additional framework. Since Three.js is built on JavaScript, adding interactivity between 3d objects and user interfaces is quite simple. This makes Three.js ideal for creating 3d games on the web platform. Aside from that, it has outstanding features like effects, scenes, cameras, animations, materials, mesh making, lights, scaling, and rendering.

 Three.js has been around for a long time. To understand Three.js we must first have an understanding of what  WebGl is. WebGl is a JavaScript API for generating high-performance interactive 3D and 2D graphics without the usage of plug-ins in any supported web browser. WebGl is an OpenGl version based on OpenGL ES (embedded systems) and it is also complicated because while it is supported by most modern browsers, it is not particularly enjoyable to deal with because it necessitates the development of extensive, heavy code.

The arrival of Three.js simplified things in WebGl . One can now write a short line of codes and be able to play with it instead of writing long lines of codes plus it is very slow and still does not understand what you just did. With Three.js we can create video games, use it to showcase our products(in a 3d form), we can also import into Three.js when we have to make a complex object using a 3d software like blender in formats like `gltf`,`obj`,`poly`, and so much more. To get started with Three.js we can visit their website [here](https://threejs.org/) and read their documentation.

The main limitation of using Three.js is the performance. We don’t have the same performance between a native application and a web application with WebGl.

### What Is Vitejs?

 Vite is a build tool that aims to provide a faster development experience for modern web projects. It's a JavaScript development server that significantly improves the frontend development experience We can simply say it is a build tool for your development. It takes your code and transforms it into something that your browser understands.

Vite allows you to have a development server running while it handles and refreshes your files based on what has changed. This process is done extremely fast to reflect your changes on the browser. Other features include:

- Bare module resolving.
- Hot module replacement.
- On-demand compilation.
- Advance configuration.

### Prerequisites 

To follow along with this guide, you need to:
- Basic understanding of the JavaScript programming language.
- A set of image templates

### Building The Portfolio

First, navigate to the folder where you want your project to live and run the following command:

```bash
npm init @vitejs/app
```
Upon running these commands, we would be able to give our project a name and also select from the list of options of framework to use. Select `vanilla:vanilla`.

Navigate to the project folder we just created using the `cd` command and install the Three.js package :
```bash
 cd your project folder
```
Install Three.js
```bash
npm install three   
```

Let’s start up our application:

```bash
npm run dev
```

Next, we want to make edits to our `style.css` and `main.js` so let’s go to our `style.css` and `main.js` to clear the codes and thereafter start building.
 
 The first thing we’re going to do is to head over to our `index.html` and add a `canvas` to the body which an `id` of `bg` which will be the element that shows the actual Three.js scene:

```html
<canvas id="bg"></canvas>
```

Now, let’s head down to `styles.css` to give the canvas fixed positioning and also pin it to the top left corner of the screen:

```css
canvas{
 position: fixed;
 top: 0;
 left: 0;
}
```

This will serve as a background for our portfolio. Now we’ll go into our `main.js` file and import our Three.js library :

```javascript
import * as THREE from 'three'
```

When we are working with 3d and also in 3d game dev there are elements it must comprise of which are:
- Scene
- Camera
- Renderer

A scene is a container of layers. It also holds our objects, cameras, and lights. The camera helps allow the perception of the object to replicate three dimensions just like the human eyes. The renderer is used to render the actual graphic to the scene Back to our project we’ll be needing these objects so let’s paste this just below or imported package:

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

 The perspective camera is used to behave just like how the human eyeballs do. Let’s check out our app. If you noticed it’s all black screen. The next thing we’ll do is add an object.
We can create objects using these steps: 

 - Geometry or a set of vectors that define the object itself. In Three.js, there are a bunch of geometries like a cylinder, cone, box, and many more. Let’s go ahead and create new geometry and paste this(still inside our `main.js`) :
 
```javascript
const geometry =  new THREE.TorusGeometry(10,3,16,100)
```

- Material:  Now that we created a geometry, we need material. Think of material as wrapping paper for geometry. Three.js has a lot of materials for different uses to give different results. We’ll be using a basic material with no light source. So let’s paste this right under our geometry:
 
```javascript
const material =  new THREE.MeshBasicMaterial({color:0xFF6347, wireframe:true});
```

- Mesh: This is the third step. We can achieve this by combining geometry with the material. let’s paste this:
const torus = new THREE.Mesh(geometry, material);

```javascript
scene.add(torus)
```

Let’s call it out using the function that gives us an infinite loop that calls the render method automatically so let's paste this:

```javascript
function animate(){
 requestAnimationFrame(animate);
 renderer.render(scene, camera);
}
 
animate()
```

Here we have a function named `animate` that calls the `requestAnimationFrame` in the browser which is a mechanism that tells the browser that you want to perform animation so the browser can always call the render method to update the UI. Just think of this as a game loop.
Let’s check our browser

![torus](/./torus_shape.png)

As you can see our torus has no movement so let's change that. Go back to our animation loop and add this:

```javascript
 torus.rotation.x += 0.01;
 torus.rotation.y += 0.005;
 torus.rotation.y += 0.01;
```

Every shape that we’ll be using has different properties like rotation, position, and scale. What we did here was changing the rotation along the x-axis by 0.01 we also did that for the y and z-axis(changing the rotation along their axis). Let’s go back to our app:

![torus_round](/./torus-round.gif)

As you can see it’s animating in an infinite loop. Pretty cool right? Now we want to introduce the concept of lightning. Lightening is what makes your 3d objects come to life. Let’s go back to our material and change from `MeshBasicMaterial` to `MeshStandardMaterial` which is a material that will react to light bouncing off it. Let’s also remove the `wireframe` property so our  material will look like this:

```javascript
const material =  new THREE.MeshStandardMaterial({color:0xFF6347});
```

Let’s go back to our browser, you’ll notice we have a black screen again. This is because we dont have anything lightening our object. So let’s create one.  Let’s paste this code right after our scene.add(torus):
```javascript
scene.add(torus)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
 const ambientLight = new THREE.AmbientLight(0xffffff);
 scene.add(pointLight, ambientLight)
 ```

Here we are instantiating a new `pointlight` with a color of white, setting its values, and adding it to our scene. We also instantiated an ambient light which will give lightening to the entire scene equally.

Let’s add a light helper and a grid helper. A light helper is used to show the position of a point light. While the grid helper draws a two-dimensional grid. So let’s add it to the scene:

```javascript
const lightHelper = new THREE.PointLightHelper(pointLight)
 const gridHelper = new THREE.GridHelper(200,50);
 scene.add(lightHelper)
 ```
 
Let’s add orbit controls to it. This will allow us to move around the scene using our mouse. To do that we first have to import the orbits control from Three.js:

```javascript
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
```

Once we’ve done that we now have to instantiate the controls class and pass in our arguments. Right after our `scene.add` we input the following:
const controls = new OrbitControls(camera,renderer.domElement);

What this would do is listen to `dom events` on the mouse and update the camera position accordingly.
We then need to call a `controls.update` in the animation loop to make sure that the changes are reflected in the UI. So inside our `requestAnimationFrame` input this and then check out the result in the browser by panning around with your mouse:

```javascript
controls.update();
```
Now that we’re done with that let’s generate a large number of objects for our scene using the math helpers in Three.js to do that, we’ll create a function and instantiate a sphere geometry so let’s input this:

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

If you look at your browser you see that the scene is populated with 250 randomly generated star
Let’s add a simple image background into it’. We’ll  be using Three.js texture loader
 
 ```javascript
 const spaceTexture = new THREE.TextureLoader().load('your image.jpg');
 scene.background = spaceTexture;
```

Now our scene is starting to look better. We can also add textures to individual materials which are known as texture mapping. Texture mapping is the process of taking two-dimensional pixels and mapping them to a 3-dimensional geometry. Let’s load another image using a `textureloader`, we'll also create a mesh that contains a box geometry and a basic material and also add that to the scene so we paste this in:

```javascript
const avatarTexture = new THREE.TextureLoader().load('your image');
 
const avatar = new THREE.Mesh(
 new THREE.BoxGeometry(5,5,5),
 new THREE.MeshBasicMaterial({map: avatarTexture})
);
 
scene.add(avatar);
```

When we check our browser we should see 3d cube with the image map to all 6 sides. We can also combine many maps to create more interesting objects just like what we’ll do for our image cube. Let’s create a new mesh named planet :

```javascript
const planetTexture = new THREE.TextureLoader().load('your image');
 
 
const planet =  new THREE.Mesh(
 new THREE.SphereGeometry(3,32,32),
 new THREE.MeshStandardMaterial({map: planetTexture,})
);
 
scene.add(planet);
```

Next up let’s head to our `index.html` to add some markups inside our `canvas`. You can choose to use this and edit later:

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

Let’s make our main element absolute so in our `style.css` we add this:

```css
main{
 position: absolute;
}
```

Let’s re-position our planet and also create a function movecamera:

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

The `GetboundlingClientRect` gives the dimension of the viewport which helps us calculate where the user is usually scrolled to. We also gave rotation properties to the moon, our avatar, and also the position of the camera.

Almost done! Let’s go back to our `styles.css`. Highlight all and paste this in:

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
![final_view](/./final_view.gif)

We just built ourselves a portfolio website!!!  You add can more features but this is how far we’ll go in this article.
### Conclusion
In this article, we discussed what Three.js is and what it can be used for, its relationship with WebGl . We also talked briefly about some terms and concepts while building our portfolio project I hope you enjoyed this article. Here’s a link to the[ github](https://github.com/oyedeletemitope/Build-a-portfolio-website-with-vite-and-threejs) repo for this project. Please share if you find this helpful. Happy coding!!!
