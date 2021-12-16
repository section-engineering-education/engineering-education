---
layout: engineering-education
status: publish
published: true
url: /building-a-sheep-wolves-grass-agent-based-model-from-scratch/
title: Building a Sheep-Wolves-Grass Agent-Based Model using p5.js
description: This tutorial will take you through how to create an agent-based Model from scratch using the sheep-wolves-grass dynamics model.
author: samuel-santos
date: 2021-12-16T00:00:00-02:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-sheep-wolves-grass-agent-based-model-from-scratch/hero.jpg
    alt: Building a Sheep-Wolves-Grass Agent-Based Model Hero image
---

In this tutorial, we are going to create an Agent-Based Model from scratch. The model in question is the Sheep - Wolves - Grass dynamics.
<!--more-->

### Prerequisites
For this tutorial, you will need:
- Basic knowledge of HTML, CSS, and JavaScript;
- Basic knowledge of Object-Oriented Programming (objects, classes, methods, and inheritance).

### Table of contents
- [Introduction](#introduction)
- [p5.js](#p5js)
- [The Sheep - Wolves - Grass Model](#the-sheep---wolves---grass-model)
- [Step 1 - Basic Structure](#step-1---basic-structure)
- [Step 2 - Programming the agents](#step-2---programming-the-agents)
- [Step 3 - Programming the environment](#step-3---programming-the-environment)
- [Step 4 - Final tweaks and plotting](#step-4---final-tweaks-and-plotting)
- [Conclusion](#conclusion)
- [References](#references)

### Introduction
There are some complex dynamics and systems that we are not able to observe. That often happens for practical or ethical reasons. In these situations, simulations are very handy. 

With them, we can create an artificial environment with pre-defined rules. We can then simulate a whole system in this environment and analyze how it behaves. This is a model.

Models are abstract and simplified representations of reality. As the name implies, the purpose of models is not to faithfully reproduce a complex dynamic or system. But that doesn't imply they don't have their value. Models are powerful explanatory and predictive tools. We can extrapolate many insights from good models to real-world systems.

When we talk about real-world systems, we can think of an epidemic, an ecosystem, or traffic, for example. And they have one thing in common. They consist of several entities interacting in an environment. We call the entities that are part of these systems agents and we can model them using Agent-Based Models.

In this tutorial, we are going to create an Agent-Based Model from scratch. The model in question is the Sheep - Wolves - Grass dynamics.

### p5.js

> If you are already familiar with p5.js you can skip this section. 

We a going to use [p5.js](https://p5js.org/), a Javascript library for creative coding, to create our model. One of the applications of creative coding is to explain things visually. This is particularly interesting when we combine it with Agent-Based Models. With p5.js, we can:
- create visualizations of our model's complex dynamics
- manipulate parameters from our model
- make it all very nice-looking and intuitive for non-experts

So, let's have a quick introduction to p5.js. The basic structure of a p5.js sketch is the following:

```jsx
function setup() {
	// setup code
}

function draw() {
	// draw code
}
```

In `setup()`, we declare everything we need for the initial state of the sketch. For example, we can set up the size of our canvas, the color of the background, the initial position of an object, etc.

The `draw()` block functions like a loop. What we write inside of it will run several frames per second. This way we can update our initial state and create animations and interactions. It's like the functioning of a game. In the `draw()` block we usually draw objects and shapes, move them and update their state.

We didn't show any concrete p5.js real example yet but don't worry, we'll see it along with the tutorial.

### The Sheep - Wolves - Grass Model
Before we start to code, we need to know better what we are going to build.  Let's define an [Agent-Based Model](https://jasss.soc.surrey.ac.uk/12/4/4.html) with 3 elements:
- The **agents** and their behavior.
- The **environment** and its influence on agents.
- The **mechanisms of interaction** between agents.

With this, we can specify our Sheep - Wolves - Grass Model. For a reference and inspiration for this tutorial, you can look at [NetLogo's Wolf Sheep Predation model](https://ccl.northwestern.edu/netlogo/models/WolfSheepPredation).

#### The agents and the mechanisms of interaction
As the model's name says, we have only 2 agents: the **sheep** and the **wolves**. 

We'll start our model with a fixed number of agents of each type randomly positioned and then they will wander through the environment. At each time step, they will have a probability to reproduce, generating new agents of the same type. 

The agents will also have an initial amount of energy that decreases with time. When the energy gets to 0, they die. To live, the agents need to get new energy by eating.
- The wolves get a fixed amount of energy by eating sheep, thus they will hunt the sheep.
- The sheep need to flee from the wolves to survive. Besides, they get a fixed amount of energy by eating grass. This leads us to our next section.

#### The environment
Our environment is a grass field. We'll define it as a grid of squares where each square is "a unity of grass". The environment behaves this way:
- When a sheep hovers over a unity of grass, she eats it.
- When a unity of grass gets eaten, it disappears and the sheep can't get energy from that unity anymore until it regrows.
- A unity of grass regrows after a fixed amount of time has passed.

That's our environment! Now that you're already familiar with the basic functioning of our model, we are ready to go!

### Step 1 - Basic Structure
First, we need to set some things up. Start by creating a directory to store our files. Then, create a `index.html` file, and let's add the link to p5.js inside of it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <meta charset="utf-8" />
  </head>

  <body>
    <!-- body here -->
  </body>
</html>
```

Let's also create a `style.css` file with this basic stylization:

```css
html, body {
  margin: 0;
  padding: 0;
}

canvas {
  display: block;
}
```

The `canvas` in the CSS is referencing the canvas that p5.js is going to create. Now let's create our `sketch.js` with the following code:

```jsx
let w = 500
let h = 500

function setup() {
	createCanvas(w, h) // creating canvas with width w and height h
	background(200, 200, 200) // setting background color as rgb(200, 200, 200)
}

function draw() {
	// Nothing in here for now
}
```

We've created a canvas with the specified width and height. Then, we are coloring the canvas' background with the color `RGB(200, 200, 200)`. Think of the canvas as a coordinate system. We can position objects on it by specifying the x and y positions.

Let's just add a link to `sketch.js` and `style.css` in the `index.html`. It should look like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>

  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```

We can then open our `index.html` in the browser. If the web page gets stuck on *"Loading..."*, that's because we still need one more thing: a local server. In this tutorial, we are going to use the Node HTTP-server, but there are [many options](https://github.com/processing/p5.js/wiki/Local-server) you can use instead if you want to. 

If you don't have node.js installed yet, go on and [install it](https://github.com/processing/p5.js/wiki/Local-server). Then, open your terminal and type:

```bash
npm install -g http-server
```

Now, we're done! `cd` into our project's directory and type:

```bash
http-server
```

Go to [http://localhost:8080](http://localhost:8080) and *yay! A gray square!!*

> Note: From now on, we will need to update this page several times. If you update it and see no changes, try to update using `Ctrl + F5` or `Cmd + F5`.

### Step 2 - Programming the agents
We have two different types of agents: the Sheep and the Wolves. But they have a lot in common, right? 

For example, they have an initial amount of energy; when they eat they earn more energy; they have a reproduction probability, etc. So it may be beneficial for us to create an `Agent` class and make `Sheep` and `Wolf` inherit from it.

So, let's create `agent.js` and create our `Agent` class and constructor:

```jsx
class Agent {

    constructor(initialEnergy, 
                foodEnergy, 
                lostEnergy, 
                maxEnergy, 
                reprodProb,
                reprodNumber,
                visionR,
                maxSpeed,
                r) {
        // constructor code here
    }

}
```

What are all those parameters?

- `initialEnergy`: the initial amount of energy for an agent;
- `foodEnergy`: the amount of energy an agent earns from eating;
- `lostEnergy`: the amount of energy an agent loses at each time step;
- `maxEnergy`: the maximum amount of energy for an agent;
- `reprodProb`: the reproduction probability of an agent;
- `reprodNumber`: the number of new agents that an agent gives birth;
- `visionR`: an agent's radius of vision (this will be needed for programming the hunt and the flee);
- `maxSpeed`: an agent's maximum speed;
- `r`: the radius (size) of an agent.

Now let's code the constructor. First, we need to set the initial position of an agent which is a random position (x, y) in the canvas, 0 ≤ x ≤ `width` and 0 ≤ y ≤ `height`. The position then is a vector created using the p5.js method `createVector()`:

```jsx
constructor(...) {
	
	// initial position
	let x = Math.random() * (width-1) + 1
	let y = Math.random() * (height-1) + 1
	this.pos = createVector(x, y)

	// ...

}
```

Note that we didn't declare the `width` and `height` variables before. That's because they are p5.js variables, so we don't need to declare them. Let's also store our parameters:

```jsx
constructor(...) {
        
  // ...

  // parameters
  this.energy = initialEnergy
  this.foodEnergy = foodEnergy
  this.lostEnergy = lostEnergy
  this.maxEnergy = maxEnergy
  this.reprodProb = reprodProb
  this.reprodNumber = reprodNumber
  this.visionR = visionR
  this.maxSpeed = maxSpeed
  this.r = r

	// ...

}
```

We have already created our `Sheep` and `Wolf`. Create two more files: `sheep.js` and `wolf.js`. Create the respective classes:

```jsx
// wolf.js

class Wolf extends Agent {

    constructor() {

    }

    show() {
        
    }

}
```

```jsx
// sheep.js

class Sheep extends Agent {

    constructor() {

    }

    show() {
        
    }

}
```

Note that there's a `show()` method. It's not necessary, but it makes our code more organized. We'll use it later to display our agents on the canvas. But now we need to declare the parameters for each type of agent. Outside the classes, type:

```jsx
// sheep parameters
let sheepInitialEnergy = 200
let sheepFoodEnergy = 12
let sheepLostEnergy = 2
let sheepMaxEnergy = 1400
let sheepReprodProb = 0.004
let sheepReprodNumber = 2
let sheepVisionR = 60
let sheepMaxSpeed = 8
let sheepR = 7
```

```jsx
// wolf parameters
let wolfInitialEnergy = 500
let wolfFoodEnergy = 50
let wolfLostEnergy = 4
let wolfMaxEnergy = 2000
let wolfReprodProb = 0.002
let wolfReprodNumber = 3
let wolfVisionR = 100
let wolfMaxSpeed = 10
let wolfR = 8
```

You can change those values to whatever you want, there are no right or wrong values. Now, inside the constructors of Sheep and Wolf, let's call the superclass' constructor using `super()` and pass the parameters.

```jsx
constructor() {

	// change the '_' to 'sheep' or 'wolf' according to the class

	super(_InitialEnergy, 
	      _FoodEnergy, 
	      _LostEnergy, 
	      _MaxEnergy, 
	      _ReprodProb, 
	      _ReprodNumber, 
	      _VisionR, 
	      _MaxSpeed, 
	      _R)

}
```

We already have basic agents! Now it's time to draw! Let's represent a sheep using a white ball and a wolf using a gray triangle. Inside the Sheep's `show()`, type:

```jsx
show() {

  push() // starting a new drawing state
  translate(this.pos.x, this.pos.y) // displacing the cursor by pos.x and pos.y
  fill(255, 255, 255) // setting fill color as rgb(255, 255, 255)
  strokeWeight(1) // setting stroke weight as 1
  circle(0, 0, this.r)	// drawing a circle in the position (0, 0) with a the specified radius
	// note that the circle position is (0, 0) but we have translated the cursor by pos.x and pos.y before
	// thus the circle will be displayed in position (0 + pos.x, 0 + pos.y) = (pos.x, pos.y)
  pop() // restoring the previous drawing state

}
```

And inside Wolf's `show()`:

```jsx
show() {

  push() // starting a new drawing state
  translate(this.pos.x, this.pos.y) // displacing the cursor by pos.x and pos.y
  fill(56, 56, 56) // setting fill color as rgb(56, 56, 56)
  strokeWeight(1) // setting stroke weight as 1
  // displaying the triangle with:
  // vertex 1: (-radius, -radius / 2)
  // vertex 2: (-radius, radius / 2)
  // vertex 3(radius, 0)
  // remember that this is displaced by pos.x and pos.y because of `translate()`
  triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0)
  pop() // restoring the previous drawing state

}
```

Alright, let's see what's happening here:

- `push()` and `pop()`: when we are going to draw something, we may want to set new colors, displace an object, change the stroke width, etc. When we are dealing with several objects, it may be beneficial to isolate the styles of each object from the others. That's what `push()` and `pop()` do. With `push()` we start a new drawing state and with `pop()` we restore the previous drawing state. This way, we can have more control over the stylization of each object.
- `circle(x, y, radius)`: draws a circle in the specified (x, y) position with the specified radius.
- `triangle(x1, y1, x2, y2, x3, y3)`: draws a triangle with vertices (x1, y1), (x2, y2), (x3, y3).

The comments also help to understand what's happening step-by-step. 

Now add the links to `agent.js`, `sheep.js`, and `wolf.js` in `index.html` head:

```jsx
<script language="javascript" type="text/javascript" src="agent.js"></script>
<script language="javascript" type="text/javascript" src="sheep.js"></script>
<script language="javascript" type="text/javascript" src="wolf.js"></script>
```

Create two instances of `Sheep` and `Wolf` in the sketch and draw them:

```jsx
let sheep;
let wolf;

function setup() {
    createCanvas(500, 500) // creating canvas with width 500 and height 500
    background(200, 200, 200) // setting background color as rgb(200, 200, 200)

    sheep = new Sheep()
    wolf = new Wolf()
}

function draw() {

		// displaying our two agents
    sheep.show()
    wolf.show()

}
```

And *voilà*! Update your page in the browser and you should see a white circle and a gray triangle randomly positioned over a light gray background. Now it's time to make them move!

#### Movement
We have three moving behaviors for our agents:

- If a sheep is inside the vision radius of a wolf, the wolf will hunt her. This is the Seek behavior;
- If a wolf is inside the vision radius of a sheep, the sheep will try to not be eaten. This is the Flee behavior;
- When an agent is not Seeking nor Fleeing, it will walk aimlessly through the grass field. This is the Wander behavior.

These behaviors are not so hard to implement. But maybe they go out of this article's scope that's about Agent-Based Models and p5.js. 

Happily, Daniel Shiffman from The Coding Train implemented this all and has made it available for us! Thanks to him, now we don't have to worry about our agent's movement behaviors. To understand better how it all works, you can also see the explanatory videos on The Coding Train's [YouTube channel](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw).

##### Wander
Go to this [Github link](https://github.com/CodingTrain/website/blob/main/learning/nature-of-code/5.5-wander/main/vehicle.js) and download the `vehicle.js` to our project's directory. In `index.html` head, add a link to it before the links to our other *.js* files:

```jsx
<script language="javascript" type="text/javascript" src="vehicle.js"></script>
```

Now, let's make our `Agent` class inherit from the `Vehicle` class we just linked. In `agent.js`, change the line `class Agent` to `class Agent extends Vehicle`. 

In the constructor, change the line `this.pos = createVector(x, y)` to `super(x, y)`. Don't worry about the variable `pos`, the `Vehicle` constructor we called with `super()` will declare it. Now your `Agent` class should look like this:

```jsx
class Agent extends Vehicle{

  constructor(initialEnergy, 
              foodEnergy, 
              lostEnergy, 
              maxEnergy, 
              reprodProb, 
              reprodNumber,
              visionR,
              maxSpeed,
              r) {
      
    // initial position
    let x = Math.random() * (width-1) + 1
    let y = Math.random() * (height-1) + 1
    super(x, y)

    // parameters
    this.initialEnergy = initialEnergy
    this.foodEnergy = foodEnergy
    this.lostEnergy = lostEnergy
    this.maxEnergy = maxEnergy
    this.reprodProb = reprodProb
    this.reprodNumber = reprodNumber
    this.visionR = visionR
    this.maxSpeed = maxSpeed
    this.r = r

  }

}
```

Let's see if it's working. In `sketch.js`, call `wander()` and `update()` before `show()` for our agents. Your `draw()` should be like this:

```jsx
function draw() {

    sheep.wander()
    sheep.update()
    sheep.show()

    wolf.wander()
    wolf.update()
    wolf.show()

}
```

Now, update the page in your browser. There are a lot of circles and triangles on the canvas, right? That's because the objects are being drawn at each time step but the background isn't. We just need to remove the `background()` in the `setup()` and place it in `draw()`. This is our `sketch.js` now: 

```jsx
let sheep;
let wolf;

function setup() {
  createCanvas(500, 500)

  sheep = new Sheep()
  wolf = new Wolf()
}

function draw() {

  background(200, 200, 200)

  sheep.wander()
  sheep.update()
  sheep.show()

  wolf.wander()
  wolf.update()
  wolf.show()

}
```

If you run it, you should have only one circle and one triangle wandering. But we have another problem. If the agent goes out of the canvas, it might not come back. Luckily, in `vehicle.js` we also have a turnaround for this. In `draw()`, after each agent's `show()`, let's call `edges()`:

```jsx
function draw() {

  background(200, 200, 200)

  sheep.wander()
  sheep.update()
  sheep.show()
  sheep.edges()

  wolf.wander()
  wolf.update()
  wolf.show()
  wolf.edges()

}
```

If you update it again, you will see that when an agent goes out of the canvas it reappears on the other side. 

Okay, let's quickly see what's happening here. `wander()` makes the calculations, and `update()` updates the acceleration, velocity, and position of the agents. The `maxSpeed` parameter of `Agent` is used in the `Vehicle` superclass to limit the velocity. All the movement is handled by `Vehicle`, and then we display the object in the new position using `show()`. Finally, `edges()` prevent the agents from going out of the screen.

To make the movement more nice-looking, let's add one thing in Wolf's `show()`. Before `triangle()`, add `rotate(this.vel.heading())`. This will make the triangle point to the direction of its movement, instead of always pointing to the right. 

```jsx
show() {

  push() // starting a new drawing state
  translate(this.pos.x, this.pos.y) // displacing the cursor by pos.x and pos.y
  fill(56, 56, 56) // setting fill color as rgb(56, 56, 56)
  strokeWeight(1) // setting stroke weight as 1
  // displaying the triangle with:
  // vertex 1: (-radius, -radius / 2)
  // vertex 2: (-radius, radius / 2)
  // vertex 3: (radius, 0)
  // remember that this is displaced by pos.x and pos.y because of `translate()`
  rotate(this.vel.heading())
  triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0)
  pop() // restoring the previous drawing state

}
```

Update the page. Very nice! This `show()` method in `Wolf` is very inspired by Vehicle's `show()`. So, thank you again, Daniel Shiffman and The Coding Train! 

Let's add more agents to our canvas?! First, let's declare the initial number of sheep and wolves in `sketch.js` outside `setup()` and `draw()`:

```jsx
let initialSheep = 15
let initialWolves = 5
```

Let's also create arrays to store our agents. Remove the variables `sheep` and `wolf` from the beginning and add:

```jsx
let sheep = []
let wolves = []
```

In `setup()`, remove the lines `sheep = new Sheep()` and `wolf = new Wolf()`. Let's populate our arrays:

```jsx
// populating sheep array
for (let i = 0; i < initialSheep; i++) {
  sheep.push(new Sheep())
}

// populating wolves array
for (let i = 0; i < initialWolves; i++) {
  wolves.push(new Wolf())
}
```

In `draw()`, remove everything relative to the old `sheep` and `wolf` variables. Let's display all the new agents. Add this:

```jsx
// displaying sheep
for (let i = 0; i < sheep.length; i++) {
  let s = sheep[i]
  s.wander()
  s.update()
  s.show()
  s.edges()
}

//displayin wolves
for (let i = 0; i < wolves.length; i++) {
  let w = wolves[i]
  w.wander()
  w.update()
  w.show()
  w.edges()
}
```

If you update the project's page now, you should see several sheep and wolves wandering through the canvas.

For now, the agents are just wandering. We still need to implement the `Seek` and `Flee` behaviors. These behaviors happen when there's an overlap between an agent from a type and the vision field of an agent from another type. 

##### Seek
The vision field of the agents is a circle of radius `visionR` that we declared before. Let's visualize this. In `sheep.js`, let's draw the vision field after `translate()`.

```jsx
show() {

  // push and translate here ...

  // vision field
  noStroke()
  fill('rgba(0, 0, 255, 0.3)')
  circle(0, 0, this.visionR)

	// rest of the code here ...

}
```

We need to place it after `translate()` and before the rest of the code because we want it to be behind our sheep. The sheep's vision field color here is `rgba(0, 0, 255, 0.3)`, a deep blue with 30% of opacity. Do the same thing in `wolf.js`, but change the color to a red using `fill('rgba(255, 0, 0, 0.3)')`. Now we can see our agents' vision fields.

To know if an agent is in the vision field of another agent, we need to check if the agent is colliding with another agent's vision field. To do this, let's add the [p5.collide2D library](https://github.com/bmoren/p5.collide2D#collidecirclecircle). Add this to your `index.html` head:

```jsx
<script defer src="https://unpkg.com/p5.collide2d"></script>
```

Assuming we have a circle with radius r1 positioned in (x1, y1), and another circle with radius r2 positioned in (x2, y2), that's how we check if they collided using p5.collide2D:

```jsx
collideCircleCircle(x1, y1, r1, x2, y2, r2) // returns true or false
```

Thus, to check if a sheep is inside a wolf's vision radius, we do:

```jsx
collideCircleCircle(sheep.pos.x, sheep.pos.y, sheep.r, wolf.pos.x, wolf.pos.y, wolf.visionR)
```

If this returns `true`, the wolf will Seek the sheep. So, in our sketch's `draw()`, let's remove the line `w.wander()` and add:

```jsx
// check if there's a sheep to hunt
let closestSheep = null
for (let j = 0; j < sheep.length; j++) {
  let s = sheep[j]
	// check if there's a collision between vision radius and a sheep
  if (collideCircleCircle(s.pos.x, s.pos.y, s.r, w.pos.x, w.pos.y, w.visionR)) {
		// update closest sheep
    if (closestSheep == null || 
        dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestSheep.pos.x, closestSheep.pos.y, w.pos.x, w.pos.y)) {
            closestSheep = s
    }
  }
}

if (closestSheep == null) {
  // there's no sheep in the vision radius, the wolf wanders
  w.wander()
} else {
  // if there's any sheep inside the vision radius, the wolf hunts
  let force = w.seek(closestSheep.pos)
  w.applyForce(force)
}
```

What are we doing here:
- We check if there's any sheep in the wolf's vision radius;
- If this is true, we make the wolf seek the sheep;
- If this is false, the wolf keeps wandering;
- If there's more than one sheep in the vision radius, the wolf will hunt the closest one.

This is how our `draw()` function looks like now:
```jsx
function draw() {

  background(200, 200, 200)

  // displaying sheep
  for (let i = 0; i < sheep.length; i++) {
    let s = sheep[i]
    s.wander()
    s.update()
    s.show()
    s.edges()
  }

  //displaying wolves
  for (let i = 0; i < wolves.length; i++) {
    let w = wolves[i]
    
    // check if there's a sheep to hunt
    let closestSheep = null
    for (let j = 0; j < sheep.length; j++) {
        let s = sheep[j]
        if (collideCircleCircle(s.pos.x, s.pos.y, s.r, w.pos.x, w.pos.y, w.visionR)) {
            if (closestSheep == null || 
                dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestSheep.pos.x, closestSheep.pos.y, w.pos.x, w.pos.y)) {
                    closestSheep = s
            }
        }
    }
    if (closestSheep == null) {
        // there's no sheep in the vision radius
        w.wander()
    } else {
        // seek the closest sheep in the vision radius
        let force = w.seek(closestSheep.pos)
        w.applyForce(force)
    }

    w.update()
    w.show()
    w.edges()
  }

}
```

Update on the browser. The wolves are hunting sheep inside their vision radius. Now we need to make the sheep flee from the wolves.

##### Flee
To check if a sheep needs to flee, we need to check if the sheep's vision radius overlaps with the wolf. This is a little more complex because now the collision is not between two circles, but between a circle and a triangle that rotates. To check this, we need this function from p5.collide2D:

```jsx
collideCirclePoly(circle_x, circle_y, circle_radius, [polygon_vertices])
```

The circle coordinates are easy, we already have them. But we don't have the wolves' triangle vertices. Let's calculate it! In `wolf.js`, look at the `show()` method. We draw a triangle with the following vertices:
- vertex 1: (`-this.r`, `-this.r / 2`);
- vertex 2: (`-this.r`, `this.r / 2`);
- vertex 3: (`this.r`, 0).

But the triangle is rotated by `this.vel.heading()` and translated by (`this.pos.x`, `this.pos.y`). So, to find the actual position of the vertices we need to rotate and translate them by the same amounts. Add a getter method called `poly()` to Wolf and add:

```jsx
get poly() {

		// rotation angle
    let angle = this.vel.heading()
		
		// triangle vertices coordinates rotated and translated
    let wPoly = [
        createVector(-this.r, -this.r/2).rotate(angle).add(this.pos.x, this.pos.y),
        createVector(-this.r, this.r/2).rotate(angle).add(this.pos.x, this.pos.y),
        createVector(this.r, 0).rotate(angle).add(this.pos.x, this.pos.y)
    ]

    return wPoly
}
```

With this, we can go back to our `sketch.js` and do the same thing we did in the previous step, but now to the sheep. Let's remove the line `s.wander()` and put:

```jsx
// check if the sheep needs to flee
let closestWolf = null
for (let j = 0; j < wolves.length; j++) {
  let w = wolves[j]
  let wPoly = w.poly // getting the wolf polygon

  // checking the collision between the wolf polygon and the sheep's vision radius
  if (collideCirclePoly(s.pos.x, s.pos.y, s.visionR, wPoly)) {
    if (closestWolf == null ||
        dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestWolf.pos.x, closestWolf.pos.y, s.pos.x, s.pos.y)) {
          // calculating the closest wolf inside the vision radius  
          closestWolf = w
        }
  }
}
if (closestWolf == null) {
  // if there's no wolf inside the vision radius
  // the sheep keeps wandering
  s.wander()
} else {
  // if there's any wolf inside the vision radius
  // the sheep will try to flee from him
  let force = s.flee(closestWolf.pos)
  s.applyForce(force)
}
```

This is pretty much the same thing we did for wolves, but for sheep and replacing `seek()` with `flee()`. You can update your page now and see it. It's getting very nice, right? If you want to, you can comment on the code that draws our agents' vision fields to make our sketch simpler.

#### Life and Death (and Eating too)
There are 4 more behaviors that our agents have in common. They are: live, die, eat, and reproduce. In this step, we are going to deal with live, die, and eat. 

In our case, to live is to lose energy at each time step. To die is to be eaten or to not have energy. And to eat is to get energy from food. Let's add the methods `live()`, `died()`, and `eat()` to Agent in `agent.js`. They are very simple methods.

```jsx
live() {
  // loosing energy
  this.energy -= this.lostEnergy
}
```

```jsx
died() {
  // if energy <= 0, the agent died
  return this.energy <= 0 ? true : false
}
```

```jsx
eat() {
  // earning energy from food
  this.energy += this.foodEnergy
  // assuring the energy is not more than the max amount of energy
  if (this.energy > this.maxEnergy) {
      this.energy = this.maxEnergy
  }
}
```

Now, after `s.edges()` and `w.edges()` in `draw()`, we add this:

```jsx
// below s.edges()
s.live()

if (s.died()) {
	// removing s from sheep
	// i is the index of s in sheep
	sheep.splice(i, 1)
}
```

```jsx
// below w.edges()
w.live()

if (w.died()) {
	// removing w from wolves
	// i is the index of w in wolves
	wolves.splice(i, 1)
}
```

Now our sheep and wolves live and die. But they still don't eat. The sheep need grass to eat, but the grass is part of the environment, so let's leave the sheep eating to the environment section. But the wolves eat sheep and we can implement this now! In `draw()`, after `w.live()`, let's add:

```jsx
//check if some wolf caught a sheep
let wPoly = w.poly
for (let j = 0; j < sheep.length; j++) {
  let s = sheep[j]
  if (collideCirclePoly(s.pos.x, s.pos.y, s.r, wPoly)) {
    //the wolf killed the sheep j
    sheep.splice(j, 1)
    w.eat()
  }
}
```

In this code, we are verifying wolf by wolf if their polygon collided with the circle of some sheep. If true, then we remove the eaten sheep from the sheep array and call `w.eat()`, adding energy to the wolf who ate the sheep.

This is our `draw()` for now:

```jsx
function draw() {

    background(200, 200, 200)

    // displaying sheep
    for (let i = 0; i < sheep.length; i++) {
        let s = sheep[i]
        
        // check if the sheep needs to flee
        let closestWolf = null
        for (let j = 0; j < wolves.length; j++) {
            let w = wolves[j]
            let wPoly = w.poly // getting the wolf polygon

            // checking the collision between the wolf polygon and the sheep's vision radius
            if (collideCirclePoly(s.pos.x, s.pos.y, s.visionR, wPoly)) {
                if (closestWolf == null ||
                    dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestWolf.pos.x, closestWolf.pos.y, s.pos.x, s.pos.y)) {
                        // calculating the closest wolf inside the vision radius  
                        closestWolf = w
                    }
            }
        }
        if (closestWolf == null) {
            // if there's no wolf inside the vision radius
            // the sheep keeps wandering
            s.wander()
        } else {
            // if there's any wolf inside the vision radius
            // the sheep will try to flee from him
            let force = s.flee(closestWolf.pos)
            s.applyForce(force)
        }

        s.update()
        s.show()
        s.edges()
        s.live()

        // death
        if (s.died()) {
            sheep.splice(i, 1)
        }
    }

    //displaying wolves
    for (let i = 0; i < wolves.length; i++) {
        let w = wolves[i]
        
        // check if there's a sheep to hunt
        let closestSheep = null
        for (let j = 0; j < sheep.length; j++) {
            let s = sheep[j]
            if (collideCircleCircle(s.pos.x, s.pos.y, s.r, w.pos.x, w.pos.y, w.visionR)) {
                if (closestSheep == null || 
                    dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestSheep.pos.x, closestSheep.pos.y, w.pos.x, w.pos.y)) {
                        closestSheep = s
                }
            }
        }
        if (closestSheep == null) {
            // there's no sheep in the vision radius
            w.wander()
        } else {
            // seek the closest sheep in the vision radius
            let force = w.seek(closestSheep.pos)
            w.applyForce(force)
        }

        w.update()
        w.show()
        w.edges()
        w.live()

				//check if some wolf caught a sheep
        let wPoly = w.poly
        for (let j = 0; j < sheep.length; j++) {
            let s = sheep[j]
            if (collideCirclePoly(s.pos.x, s.pos.y, s.r, wPoly)) {
                //the wolf killed the sheep j
                sheep.splice(j, 1)
                w.eat()
            
        }

        // death
        if (w.died()) {
            wolves.splice(i, 1)
        }
    }

}
```

Update your page. Our agents are pretty complex now: they wander, seek, flee, live, die, and eat. That's a lot! 

> Note: If your agents are dying very fast or reproducing a lot or any weird thing like this is happening, try to modify the parameters in `sheep.js` and `wolf.js`, and the initial number of agents in `sketch.js`.

#### Reproduction

There's one behavior missing: reproduction. This is pretty straightforward too. Add a method `reproduced()` to our Agent class and add:

```jsx
reproduced() {
  let p = Math.random()
  return p <= this.reprodProb ? true : false
}
```

We calculate a random number p and if p ≤ agent's reproduction probability, then the agent reproduced! We can reproduce between life and death, so to complete let's add this in `draw()` after `live()` and before `died()` calls:

```jsx
// s.live() should be here

// reproduction
if (s.reproduced()) {
	// adding reprodNumber new sheep to sheep array
  for(let k = 0; k < s.reprodNumber; k++) {
    sheep.push(new Sheep())
  }
}

// if (s.died()) should be here
```

```jsx
// w.live() should be here

// reproduction
if (w.reproduced()) {
	// ading reprodNumber new wolves to wolves array
  for(let k = 0; k < w.reprodNumber; k++) {
    wolves.push(new Wolf())
  }
}

// if (w.died()) should be here
```

That's it! Update your page and see it working. Try to modify the parameters to see what happens. That's our `draw()` for now:

```jsx
function draw() {

    background(200, 200, 200)

    // displaying sheep
    for (let i = 0; i < sheep.length; i++) {
        let s = sheep[i]
        
        // check if the sheep needs to flee
        let closestWolf = null
        for (let j = 0; j < wolves.length; j++) {
            let w = wolves[j]
            let wPoly = w.poly // getting the wolf polygon

            // checking the collision between the wolf polygon and the sheep's vision radius
            if (collideCirclePoly(s.pos.x, s.pos.y, s.visionR, wPoly)) {
                if (closestWolf == null ||
                    dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestWolf.pos.x, closestWolf.pos.y, s.pos.x, s.pos.y)) {
                        // calculating the closest wolf inside the vision radius  
                        closestWolf = w
                    }
            }
        }
        if (closestWolf == null) {
            // if there's no wolf inside the vision radius
            // the sheep keeps wandering
            s.wander()
        } else {
            // if there's any wolf inside the vision radius
            // the sheep will try to flee from him
            let force = s.flee(closestWolf.pos)
            s.applyForce(force)
        }

        s.update()
        s.show()
        s.edges()
        //s.live()

        // reproduction
        if (s.reproduced()) {
            for(let k = 0; k < s.reprodNumber; k++) {
                sheep.push(new Sheep())
            }
        }

        // death
        if (s.died()) {
            sheep.splice(i, 1)
        }
    }

    //displaying wolves
    for (let i = 0; i < wolves.length; i++) {
        let w = wolves[i]
        
        // check if there's a sheep to hunt
        let closestSheep = null
        for (let j = 0; j < sheep.length; j++) {
            let s = sheep[j]
            if (collideCircleCircle(s.pos.x, s.pos.y, s.r, w.pos.x, w.pos.y, w.visionR)) {
                if (closestSheep == null || 
                    dist(s.pos.x, s.pos.y, w.pos.x, w.pos.y) < dist(closestSheep.pos.x, closestSheep.pos.y, w.pos.x, w.pos.y)) {
                        closestSheep = s
                }
            }
        }
        if (closestSheep == null) {
            // there's no sheep in the vision radius
            w.wander()
        } else {
            // seek the closest sheep in the vision radius
            let force = w.seek(closestSheep.pos)
            w.applyForce(force)
        }

        w.update()
        w.show()
        w.edges()
        w.live()

				//check if some wolf caught a sheep
        let wPoly = w.poly
        for (let j = 0; j < sheep.length; j++) {
            let s = sheep[j]
            if (collideCirclePoly(s.pos.x, s.pos.y, s.r, wPoly)) {
                //the wolf killed the sheep j
                sheep.splice(j, 1)
                w.eat()
            
        }

        // reproduction
        if (w.reproduced()) {
            for(let k = 0; k < w.reprodNumber; k++) {
                wolves.push(new Wolf())
            }
        }

        // death
        if (w.died()) {
            wolves.splice(i, 1)
        }
    }

}
```

### Step 3 - Programming the Environment
Start by creating `environment.js` and linking it in `index.html` head.

```jsx
<script language="javascript" type="text/javascript" src="environment.js"></script>
```

Our environment is a grass field. We'll implement it as a square grid where each tile is a unity of grass. Let `tile_size` be the size of our tiles. Then, we have `width`/`tile_size` X `height`/`tile_size` tiles. Let's create a `width`/`tile_size` X `height`/`tile_size` matrix called `grass_sate` to represent the state of each grass tile. 

The possible states are `1` — there's grass in the tile — or `n` — the grass has been eaten and still needs to wait `n` time steps to regrow. If a tile of grass has been eaten by a sheep, it regrows after `growTime` time steps. The initial state of the environment is fully covered by grass, i.e., all the values in `grass_state` are `1`.

Let's create a class `Environment` in `environment.js` and implement this:

```jsx
class Environment {

  constructor(width, height, tile_size, grow_time) {
    // checking if we can divide the screen into tiles
    if(!(width % tile_size == 0 && height % tile_size == 0)) {
      throw "dimensions and tile_size are not compatible"
    }

    this.tile_size = tile_size

    // grass_state is going to be a (width/tile_size X height/tile_size) matrix
    // if a position (i, j) is 1, then it has grass
    // if it's 0, then it has no grass
    this.grass_state = []
    this.dimensions = [width/tile_size, height/tile_size]
    
    // here we populate grass_state with the initial state of the field
    for (let i = 0; i < this.dimensions[0]; i++) {
      let line = []
      for (let j = 0; j < this.dimensions[1]; j++) {
        // the initial state of the grass field is 1 in every tile
        // i.e., there's grass in every tile of the field
        line.push(1)
      }
      this.grass_state.push(line)
    }
    
    // setting the time that the grass needs to grow
    this.growTime = grow_time
  }

}
```

When a grass tile is eaten, we add `growTime` to its state. At each time step, we decrease 1 unity in the state of the eaten grass tiles until it becomes `1` again, that is, the grass tile regrows. Lets implement this in a method `update()`:

```jsx
update() {
  for (let i = 0; i < this.dimensions[0]; i++) {
    for (let j = 0; j < this.dimensions[1]; j++) {
      if (this.grass_state[i][j] > 1) {
        // decreasing the time needed to regrow grass tile (i, j)
        this.grass_state[i][j] -= 1
      }
    }
  }
}
```

When a sheep hovers a tile, she eats the grass in it if it's available. Given a sheep's position (x, y), let's write a method to return if the tile she's hovering has available grass. Let's call this method `grassAvailable()`:

```jsx
grassAvailable(x, y) {
  let i = Math.floor(x/this.tile_size)
  let j = Math.floor(y/this.tile_size)

	if (i < 0 || i >= this.dimensions[0] || j < 0 || j >= this.dimensions[1]) {
	  // agent is out of screen
      return null
  }

	// the tile that contains (x, y) is the tile (i, j)
  if (this.grass_state[i][j] == 1) {
		// tile (i, j) is available
    return [i, j, true]
  } else {
    return [i, j, false]
  }
}
```

Then, add a method `tileEaten()` to set the new value of the tile state when a tile is eaten:

```jsx
tileEaten(i, j) {
	// tile has been eaten and now needs to wait growTime time steps to regrow
  this.grass_state[i][j] += this.growTime
}
```

Finally, let's write a method `show()` to display the grass field. We just need to loop through our `grass_state` matrix and draw a green square where there's available grass and a brown square otherwise.

```jsx
show() {

  push()
	noStroke()

  //drawing grass tiles
  for (let i = 0; i < this.dimensions[0]; i++) {
    for (let j = 0; j < this.dimensions[1]; j++) {

      let x = i*this.tile_size // position x of tile
      let y = j*this.tile_size // position y of tile

      let tile_state = this.grass_state[i][j]

      if (tile_state == 1) {
        // there's grass available in this tile
        fill(0, 204, 102) // green color
      } else {
        // there isn't grass available in this tile
        fill(153, 153, 102) // brown color
      }

      // drawing a square of side tile_size in position (x, y)
      rect(x, y, this.tile_size, this.tile_size)

    }
  }

  pop()
  
}
```

This is our `environment.js`:

```jsx
class Environment {

    constructor(width, height, tile_size, grow_time) {
        // checking if we can divide the screen into tiles
        if(!(width % tile_size == 0 && height % tile_size == 0)) {
            throw "dimensions and tile_size are not compatible"
        }

        this.tile_size = tile_size

        // grass_state is going to be a (width/tile_size X height/tile_size) matrix
        // if a position (i, j) is 1, then it has grass
        // if it's 0, then it has no grass
        this.grass_state = []
        this.dimensions = [width/tile_size, height/tile_size]
        
        // here we populate grass_state with the initial state of the field
        for (let i = 0; i < this.dimensions[0]; i++) {
            let line = []
            for (let j = 0; j < this.dimensions[1]; j++) {
                // the initial state of the grass field is 1 in every tile
                // i.e., there's grass in every tile of the field
                line.push(1)
            }
            this.grass_state.push(line)
        }
        
        // setting the time that the grass needs to grow
        this.growTime = grow_time
    }

    update() {
        for (let i = 0; i < this.dimensions[0]; i++) {
            for (let j = 0; j < this.dimensions[1]; j++) {
                if (this.grass_state[i][j] > 1) {
                    // decreasing the time needed to regrow grass tile (i, j)
                    this.grass_state[i][j] -= 1
                }
            }
        }
    }

    grassAvailable(x, y) {
        let i = Math.floor(x/this.tile_size)
        let j = Math.floor(y/this.tile_size)

        if (i < 0 || i >= this.dimensions[0] || j < 0 || j >= this.dimensions[1]) {
            return null
        }

        if (this.grass_state[i][j] == 1) {
            return [i, j, true]
        } else {
            return [i, j, false]
        }
    }

    tileEaten(i, j) {
        // tile has been eaten and now needs to wait growTime time steps to regrow
        this.grass_state[i][j] += this.growTime
    }

    show() {

        push()
        noStroke()

        //drawing grass tiles
        for (let i = 0; i < this.dimensions[0]; i++) {
            for (let j = 0; j < this.dimensions[1]; j++) {

                let x = i*this.tile_size // position x of tile
                let y = j*this.tile_size // position y of tile

                let tile_state = this.grass_state[i][j]

                if (tile_state == 1) {
                    // there's grass available in this tile
                    fill(0, 204, 102) // green color
                } else {
                    // there isn't grass available in this tile
                    fill(153, 153, 102) // brown color
                }

                // drawing a square of side tile_size in position (x, y)
                rect(x, y, this.tile_size, this.tile_size)

            }
        }

        pop()
        
    }

}
```

That's it! Let's display our environment! In `sketch.js`, create the variables `tile_size` and `grow_time`. Add values you think are good. Also, create a variable `environment`.

```jsx
let environment;
let tile_size = 10
let grow_time = 400
```

Inside `setup()`, initialize `environment` with:

```jsx
environment = new Environment(width, height, tile_size, grow_time)
```

Recall that `width` and `height` are global variables from p5.js, so we don't need to worry about them.

Now, remove the `background(200, 200, 200)` at the beginning of `draw()`. Replace it with:

```jsx
// updating and displaying grass field
environment.update()
environment.show()
```

Let's make the sheep eat. After `s.live()` in `draw()`, add:

```jsx
let grassAvailable = environment.grassAvailable(s.pos.x, s.pos.y)
if (grassAvailable != null && grassAvailable[2]) {
  // the tile hass grass available
  s.eat() // the sheep eats
  environment.tileEaten(grassAvailable[0], grassAvailable[1]) // the grass tile is updated
}
```

Our model is now complete! All the agents are wandering, seeking or fleeing, living, dying, reproducing, and eating. Let's now just add a plot of populations and do a few tweaks!

### Step 4 - Final tweaks and plotting
Let's add some variables to make it easier for us to manipulate the width, height, and frame rate: 

```jsx
let fr = 60 // frame rate
let w = 500 // width
let h = 500 // height
```

In `createCanvas()`, change `500, 500` to `w, h`. Add also `frameRate(fr)` in `setup()`.

```jsx
frameRate(fr)
createCanvas(w, h)
```

To make the plot, we are going to need grafica.js, a plotting library for p5js. Go to grafica.js [GitHub page](https://github.com/jagracar/grafica.js/tree/master/lib) and download the file `grafica.min.js` to our work directory. Add them to our project in `index.html`:

```jsx
<script language="javascript" type="text/javascript" src="grafica.min.js"></script>
```

In `sketch.js`, let's create the variables:

```jsx
let sheepPopulation = []
let wolvesPopulation = []
let time_step = 0
```

We'll use them to store the number of sheep and wolves at each time step so we can plot it. In `setup()`, write:

```jsx
// setup for plot
plot = new GPlot(this) // creating new plot
plot.setPos(0.5 * width, 0.6 * height) // positions
plot.setOuterDim(0.5 * width, 0.4 * height) // dimensions
plot.getXAxis().getAxisLabel().setText("time") // x-axis label
plot.getYAxis().getAxisLabel().setText("population") // y-axis label
plot.getTitle().setText("Population over time") // title
plot.setPoints(sheepPopulation) // adding points from sheepPopulation
plot.setLineColor(color(255, 255, 255)) // setting the line color to white
plot.addLayer("layer 1", wolvesPopulation) // creating a new layer with points from wolvesPopulation
plot.getLayer("layer 1").setLineColor(color(102, 102, 102)) // setting layer 1 line color to gray
```

In the very bottom of `draw()`, add:

```jsx
// adding points to the plot
let sheepNumber = sheep.length // getting current number of sheeps
let wolvesNumber = wolves.length // getting current number of wolves
// adding new points (time_step, sheepNumber) and  (time_step, wolvesNumber) to the arrays
sheepPopulation.push(new GPoint(time_step, sheepNumber, "(" + time_step + " , " + sheepNumber + ")"))
wolvesPopulation.push(new GPoint(time_step, wolvesNumber, "(" + time_step + " , " + wolvesNumber + ")"))
// updating the plot points
plot.setPoints(sheepPopulation)
plot.getLayer("layer 1").setPoints(wolvesPopulation)

//drawing plot
plot.beginDraw()
plot.drawXAxis()
plot.drawYAxis()
plot.drawTitle()
plot.drawGridLines(GPlot.BOTH)
plot.drawLines()
plot.endDraw()

// updating time_step
time_step += 1
```
That's it! We finished! Let's update our page (use `Ctrl + F5` or `Cmd + F5` if you see no changes).

You can view the whole code in this [GitHub repository](https://github.com/csamuelsm/sheep-wolves-grass-p5js).

### Conclusion
What we can do now is to play with the parameters and see what happens when we add different values. For example, what happens when there's a lot of sheep and just a few wolves? What happens if there's a lot of wolves but just a few sheep? And if the grass takes too long to regrow? How do the initial energy, the food energy, and the lost energy values interfere in the model? Is there a set of values that creates an equilibrium where wolves and sheep live together without one or both going extinct?

This is maybe the funniest part: running tests and creating hypotheses. Another thing you can try is to create variations of this model, maybe simplify it a bit or maybe add other parameters and make it more complex. You can also create your models from scratch now! Use your creativity and have fun!

### References
- [p5.js, a Javascript library for creative coding](https://p5js.org/)
- [Agent Based Modeling and Simulation: An Informatics Perspective](https://jasss.soc.surrey.ac.uk/12/4/4.html)
- [NetLogo's Wolf Sheep Predation model](https://ccl.northwestern.edu/netlogo/models/WolfSheepPredation)
- [The Coding Train's YouTube channel](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw)
- [Daniel Shiffman website](https://shiffman.net/)
- [p5.collide2D library](https://github.com/bmoren/p5.collide2D)
- [grafica.js, p5.js plotting library](https://github.com/jagracar/grafica.js/tree/master/lib)
- [This project's GitHub repository](https://github.com/csamuelsm/sheep-wolves-grass-p5js)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
