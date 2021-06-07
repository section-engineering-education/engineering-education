---
layout: engineering-education
status: publish
published: true
url: /createjs-guide/
title: Creating Dynamic Web Content with CreateJS
description: This will be a guide on creating dynamic content using CreateJS, a suite of JavaScript libraries. These libraries allow for canvas manipulation, animations, sounds, and much more.
author: john-amiscaray
date: 2021-06-01T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/createjs-guide/hero.png
    alt: CreateJS example image
---
CreateJS is a suite of Javascript libraries to help you create interactive content. It allows for easy canvas manipulation, animations, sound effects, and asset loading. CreateJS is made up of four libraries, EaselJS, TweenJS, SoundJS, and PreloadJS. You can use them independently or in combination. 
<!--more-->
### Introduction
The web has evolved a lot, nowadays, it allows for more lively content. In particular, HTML5 introduced new features for dynamic graphics and sounds. These have made it easier to create cool content from info-graphics to mini-games. One tool to help you do this is CreateJS.

In this guide, we will be going over some of the key features of each of these libraries so you can use them to create fun web content.

### Prerequisites
To follow along with this guide, you should have intermediate Javascript knowledge. This includes knowledge of [callback functions](https://www.w3schools.com/js/js_callback.asp), [arrow functions](https://www.w3schools.com/js/js_arrow_function.asp), and [objects](https://www.w3schools.com/js/js_objects.asp).

### What does each of the libraries do?
As we mentioned earlier, CreateJS is comprised of four libraries, EaselJS, TweenJS, SoundJS, and PreloadJS. Each of these libraries is independent of the other but they can be used together. EaselJS is centered around canvas graphics manipulation. It allows users to draw shapes, move graphics, add event listeners, and to manipulate sprites. 

TweenJS is a library used for creating complex animations. It does so by manipulating properties using mathematical functions. You specify which attribute values you want your object to transition to, and a function to specify how it will reach that state. You can even use it to change CSS style properties. 

Next, PreloadJS is used for preloading assets for your application. This can be anything from sounds to images. Finally, SoundJS, as the name suggests, is for loading, playing, and manipulating sounds. Although you can delegate the sound loading to PreloadJS.

### Setting up CreateJS
CreateJS is very easy to set up. All that's needed is a blank HTML page with the following script tag:

```HTML

<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>

```

Then of course you need to create a blank `main.js` file and link it to our HTML.

### Loading assets
PreloadJS makes it super easy to load image and sound assets with only a few steps. First, we need to initialize a `createjs.LoadQueue` object in our `main.js` file. 

Then call the `installPlugin` method on that object like so:

```javascript
let queue = new createjs.LoadQueue();

queue.installPlugin(createjs.Sound);
```

The reason we need to call the `installPlugin` method like that is so we can load sound assets and have it work with `SoundJS`. Next, we need to call the `loadManifest` method of the `LoadQueue` object to load our assets. 

This method takes in an array of objects, each of which has an id and an src attribute. The id is to refer to our assets when we want to use them. 

Meanwhile, the src attribute specifies where the asset file is:

```javascript
queue.loadManifest([
	{ id: "cloud", src: "./assets/cloud.png" },
	{ id: "wind", src: "./assets/wind.m4a" },
]);
```

We can then call the `on` method of the `queue` object to pass a callback for when the assets are loaded:

```javascript
queue.on("complete", (_) => {
	console.log("finished loading");
});
```

Now, if you were to test this out in your browser, you will see *finished loading* printed out in the console. Also, if you check the network tab in your dev tools you should see something like this:

![successful asset loading](/engineering-education/createjs-guide/successful-asset-loading.png)

Notice how we have two *GET* requests for `wind.m4a` and `cloud.png`. One of them has a status of 200 and the other 304. This means that we successfully loaded our assets. In case you don't know, you can open the dev tools by right-clicking and selecting *inspect* or *inspect element*.

### Playing the sound
Loading assets on our page would be pointless if we don't use them. Let's have a look at how we can play the sound we just added. SoundJS makes it trivial to play our sounds. 

In the callback function when the loading is complete, all we need is a single method call:

```javascript
// Play the wind sound. The string passed is the id we used when loading the sound.
createjs.Sound.play("wind");
```

Now if you want to manipulate the sound, the `play` method returns an object representing the sound you want to play. You can change properties like its volume, how many times you want to loop it, whether it's paused or not, and more. We won't go over  how to manipulate all this here, because it should be as simple as changing properties. 

The [documentation](https://createjs.com/docs/soundjs/classes/AbstractSoundInstance.html#properties) already does a good job explaining the properties you can change. An interesting thing to note here is that this sound object also has the same `on` method the load queue has. You can use this to react to events like the sound loading (*complete*) or the sound failing to load (*failed*).

### Drawing the image
Next, let's have a look at how we can draw the image we loaded in. We will be drawing it onto an HTML5 canvas so that we can also show off EaselJS. 

First, we need to add a canvas element in our HTML to draw the image on:

```HTML

<canvas id="my-canvas" width="800px" height="800px"></canvas>

```

Then, in our Javascript file, we can create a reference to it using its id:

```Javascript

let stage = new createjs.Stage('my-canvas');

```

Then, let's create a function called `stageInit` that will draw our cloud on the canvas. In that function, we need to create a new `createjs.Shape` instance. 

Using that instance's `graphics` object, we can tell it to draw our cloud with a particular size:

```javascript
let shape = new createjs.Shape();
shape.graphics
	.beginBitmapFill(queue.getResult("cloud"))
	.drawRect(0, 0, 100, 100);
```

Then to place it on the stage, we set the x and y attributes and call the `addChild` method of our stage object:

```javascript
shape.x = 100;
shape.y = 100;
stage.addChild(shape);
```

After all that is done, the function should look like this:

```javascript
function stageInit() {
	let stage = new createjs.Stage("my-canvas");

	let shape = new createjs.Shape();
	shape.graphics
		.beginBitmapFill(queue.getResult("cloud"))
		.drawRect(0, 0, 100, 100);

	shape.x = 100;
	shape.y = 100;
	stage.addChild(shape);
}
```

From there, we just need to call it in our callback for when the assets are done loading. Now, if you were to run this in the browser you won't be able to see the cloud yet. This is because every time we change stuff on a stage we need to call an update method. 

What we are going to do to solve this is use the `Ticker` class that CreateJS provides, to call this update method at a certain frame rate. The default frame rate for this ticker is 20 frames per second. You can change this using the `framerate` or `interval` [properties](https://createjs.com/docs/easeljs/classes/Ticker.html#property_framerate). 

To call the update method on every frame is just a matter of adding an event listener as we've done before:

```javascript
createjs.Ticker.on("tick", (_) => {
	stage.update();
});
```

Now with this addition, the cloud should finally render properly.

### Animating the image with TweenJS
As it stands, our cloud is still on the canvas in one place. We can create an animation for it swinging back and forth using TweenJS. This animation will be in a function called `animateCloud`, which takes the shape representing our cloud as a *cloud* argument. We will call the function at the end of our callback function for when the assets are loaded. 

To start we call the static `get` method from the `createjs.Tween` class:

```javascript
createjs.Tween.get(cloud, { loop: true });
```

We pass our cloud argument as the first parameter to tell it to change the attributes of that object. You could in theory pass any object here and TweenJS would change its properties to try to animate it. The next object is a single property saying we want to loop the animation. 

Next, we call the `to` method of the return value of the `get` call like so:

```javascript
createjs.Tween.get(cloud, { loop: true }).to(
	{ x: 500 },
	2000,
	createjs.Ease.getPowInOut(4)
);
```

Here, the first argument specifies which attributes from our `cloud` object we want to change and to what values. In this case, we are changing its x property to a value of 500. Then, we specify that the animation will play throughout 2000 milliseconds (2 seconds). 

We then specify our ease function as an in and out quartic function (a polynomial with the greatest term to the power of 4). You won't be able to understand this exactly in words so check out this [visualization](https://easings.net/#easeInOutQuart). A

Once that's done we can tell TweenJS to play our wind sound by calling the `call` method on the return value of that `to` call:

```javascript
createjs.Tween.get(cloud, { loop: true })
	.to({ x: 500 }, 2000, createjs.Ease.getPowInOut(4))
	.call(playWindSound);
```

Note the `playWindSound` argument is a function that plays the wind sound as we did above. Now, we can have our cloud go back to where it was with the same ease function and then play the sound once more:

```javascript
createjs.Tween.get(cloud, { loop: true })
	.to({ x: 500 }, 2000, createjs.Ease.getPowInOut(4))
	.call(playWindSound)
	.to({ x: 100 }, 2000, createjs.Ease.getPowInOut(4))
	.call(playWindSound);
```

In all, the function we just wrote should look like this:

```javascript
function animateCloud(cloud) {
	createjs.Tween.get(cloud, { loop: true })
		.to({ x: 500 }, 2000, createjs.Ease.getPowInOut(4))
		.call(playWindSound)
		.to({ x: 100 }, 2000, createjs.Ease.getPowInOut(4))
		.call(playWindSound);
}
```

### Working with sprites
As a fun way to end this guide, let's look at how to create animated sprites. For our guide, we will be animating a stick figure using this sprite sheet I made:

![sprite sheet](/engineering-education/createjs-guide/sprite-sheet.png)

The first two frames we will use as a running animation while the last two will be an idle animation. Of course, before we start we need to load our sprite sheet as an asset. 

Add our sprite sheet to the manifest we gave to PreloadJS:

```javascript
queue.loadManifest([
	{ id: "cloud", src: "./assets/cloud.png" },
	{ id: "wind", src: "./assets/wind.m4a" },
	{ id: "spritesheet", src: "./assets/sprite-sheet.png" },
]);
```

From there, let's create a method called `spriteInit`. This will create our stick figure along with its animations and place them. 

In order to do that we need to create an object with information about our sprite sheet:

```javascript
let data = {
	images: [queue.getResult("spritesheet")],
	frames: { width: 14, height: 21, regX: 0, regY: 0, spacing: 0, margin: 0 },
	animations: {
		idle: [2, 3, "idle"],
		run: [0, 1, "run"],
	},
};
```

The `images` property is an array of all the images that our sprite will use for its animations. Then the `frames` property specifies the details about each frame in the sprite sheet. This includes the dimensions, the coordinates of its registration point (`regX`, `regY`), the spacing, and the margin. 

The registration point by the way acts sort of like the center of rotation for the sprite. Not only that but when you place the sprite on the stage, the coordinates you place the sprite on will be where your registration point is. If we had a `Sprite` object and set its x and y attributes to 10, then it will draw the registration point at the point 10,10. 

The rest of the sprite would then be relative to the registration point. Don't worry if you don't quite understand what this means yet, it won't be a factor for this guide. If you want to learn more about it, playing around with the registration point should help you. The `animations` attribute is an object containing information about our animations. 

For example, the *idle* attribute defines an array representing our idle animation. The first two elements of the array represent the starting and ending frames of the animation. What CreateJS does is it takes our sprite sheet and splits it into the appropriate frames based on our `frames` object and numbers it like an array.

In our case, it would number our frames in the sprite sheet like so:

![frame indexing example](/engineering-education/createjs-guide/frame-indexing-example.png)

The start of frame (2) and the end frame (3) of our idle animation correspond to the last two frames in our sprite sheet. Likewise, the start frame (0) and the end frame (1) of the run animation are the first two frames. 

Back to the *idle* array, the last element is a string that is the name of the animation we want to transition to when finished. In this case, the idle animation is looping since we put the string *idle* at the end. 

The same is true for our run animation. As an extra note, you can name the attributes that represent the arrays anything you want. They are then used as references for when you want to play the animation. There's a final optional element that you can add to your array as well to speed up or slow down the animation. 

For example, if you were to add 0.25 at the end after the string, then it will slow down the animation to 25% speed. Likewise, if you add 2 at the end, it will double the speed of the animation.

With the sprite sheet data created, the reset is straightforward. We use that data to create a sprite object and then place it on the canvas:

```javascript
let data = {
	images: [queue.getResult("spritesheet")],
	frames: { width: 14, height: 21, regX: 0, regY: 0, spacing: 0, margin: 0 },
	animations: {
		idle: [2, 3, "idle"],
		run: [0, 1, "run"],
	},
};

let spriteSheet = new createjs.SpriteSheet(data);
// create the sprite object using our sprite sheet, have it start off in the idle animation
let sprite = new createjs.Sprite(spriteSheet, "idle");

sprite.x = 40;
sprite.y = 40;
```

Finally, let's make it so that pressing the *d* key triggers our run animation, and the *a* key triggers the idle animation:

```javascript
window.addEventListener("keydown", (ev) => {
	if (ev.key === "d") {
		sprite.gotoAndPlay("run");
	} else if (ev.key === "a") {
		sprite.gotoAndPlay("idle");
	}
});
```

Now that we implemented the `spriteInit` method we need to call it at the end of our callback function for when the assets are loaded.

### Conclusion
In this guide, we learned some of the fundamentals of creating content with createJS. We discussed the libraries it's comprised of, loading assets, drawing graphics, and animations. From here, you should be able to start playing around with building canvas art or games using these tools. 

Of course, this guide wasn't an all-encompassing but you can learn a lot of createJS' well-written [documentation](https://createjs.com/). 

Be sure to check out [this replit](https://replit.com/@johna2002/createjs-guide#main.js) as well, for the full code we wrote in this guide. 

I encourage you to copy the code and play around with it yourself so you can internalize these concepts.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/authors/peter-kayere/)
