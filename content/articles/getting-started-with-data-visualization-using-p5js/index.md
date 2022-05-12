---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-data-visualization-using-p5js/
title: Getting Started with Data Visualization Using P5.js
description: This tutorial will focus on data visualization, where collected data will be represented on a graph. We will use the P5.js JavaScript library which contains functions useful in drawing canvases for data representation.
author: julius-gikonyo
date: 2021-11-10T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-data-visualization-using-p5js/hero.png
    alt: Getting Started with Data Visualization Using P5.js Hero Image
---
With digitalization globalization, data has developed from a limited, expensive, difficult to find, or gather and collect to abundant and cheap. People are spending more time in the digital world watching the news or on social media, buying and selling products and services, which is kind of a new normal in this digital world.
<!--more-->
Data may be simply acquired from many important consumers in the present digitalization. However, this creates bulky and extensive information across different channels. With such a massive volume of data, it becomes troublesome to store, process, analyze, and comprehend each piece of information.

This modest quantity of data is so large that traditional software cannot gather, store, comprehend, or analyze it. As a result, the notion of big data arose.

With easier accessible data, there are terabytes of data sitting around us and in the data centers. This data is unused and is sitting as a burden. These resources are only as excellent as what we can produce out of it as individuals and corporations.

The concept of big data processes terabytes of raw data into meaningful value that businesses and individuals can use, such as predictive analytics. This way, data doesn’t sit in a data center unused. Instead, it is turned into digital gold.

Data visualization represents raw data and transforms it into graphs, charts, and pictures that show how the raw data is represented. Processing such data ensures that the data is clean and accurate.

This enables us to acquire insights, identify new patterns and trends. A visual depiction of it gives the original raw data meaning and purpose. As a consequence, patterns and trends emerge, and we can generate actionable insights.

When we talk about visualization, it’s all about using our eyes to visualize things around us. Then we visualize the information so that we can make an informed decision. So we can see the trends and patterns in the data and connect with it.

In this tutorial, we will learn about data visualization and how to use JavaScript to represent data in graphs and charts using P5.js. P5.js is an open-source JavaScript library that makes data visualization accessible to a webpage.

### Why we use data visualization
Data visualization brings in visual interpretation. This is a much faster way to understand when compared to text. It helps us to process visual stuff quicker. Therefore, data visualization is really important in analyzing the trends and patterns to find the insights and make smarter, informed decisions.

### Setting up P5.js
P5.js is an open-source creative coding JavaScript library. It is used to sketch and draw using the HTML5 canvas element. 

It can be installed using the following installation methods:

- Using NPM

If you are a Node.js developer, NPM would be an appropriate approach to have packages run on your computer. NPM is an online registry that provides a variety of open-source libraries that you can use when running Node.js in your computer. 

So if you have Node.js installed, running the following command will get the P5.js installed and ready for use:

```bash
npm install p5
```

Make sure you first initialize a Node.js project using `npm init`. Then run the above command inside the project folder that you have created.

- Using CDN

CDN stands for Content Delivery Network. CDN is a system of geographically distributed servers, located in reliable data centers throughout different regions of the world. This network helps deliver pages and other web content to a user, based on his/her geographic location.

When you use CDN for content distribution, many copies are created and served to end-users from different locations based on the best route possible. As a result, users get your content at the best speed and performance.

To install P5.js with a CDN, you include a CDN linking to the P5.js resources in an HTML file, as shown below:

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.min.js"></script>
```

### Getting started with P5.js
Let's now dive in and start using this amazing library!

Create a project directory where we will save the code file. In this guide, we will use a CDN to access the P5.js resources. Inside your project folder, create an `index.js` file. We will add the CDN script here and load the P5.js JavaScript code to the browser. In your `index.html` file, add the following CDN scripts.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.min.js"></script>
```

Also, remember to create the `app.css` and `index.js` files that we have imported in the above HTML code block.

P5.js uses some functions that defines how your sketch will look like. 

These include:
- A **`setup()`** function that is used for creating the canvas and setting the background for that canvas.
- A **`draw()` function** - this function is called continuously in different time frames. It is used to draw sketches. It executes each line of code in the draw function once, then it restarts it, draws it again and again until the whole check is completely loaded.

The following is a basic setup of a P5.js sketch that draws a rectangle on a web page:

```js
function setup() {
    // put setup code here
    createCanvas(400, 300);
}

function draw() {
  // put drawing code here
    background(200);
    rectMode(CENTER);

    // a central colored rectangle
    fill(27, 0, 179);
    stroke(0, 107, 179);
    strokeWeight(3);
    rect(200, 150, 150, 150);
}
```

This is how the setup looks when you run the code above:

![a-rectangular-sketch](/engineering-education/getting-started-with-data-visualization-using-p5js/a-rectangular-sketch.png)

From the above code block, we have added the `setup()` and `draw()` function. `setup()` is introducing and creating a canvas while `draw()` sketches a rectangle with an outside border (`stroke`). 

The rectangle is then set to the center using the `rectMode()` function. In this case, the background is being filled in every frame then it changes the full color to blue, and a rectangle is drawn using the set dimensions.

![a-rectangular-sketch-explained](/engineering-education/getting-started-with-data-visualization-using-p5js/a-rectangular-sketch-explained.png)

As you can see, it is easy to go along with these packages. Let's now make our codebase more complex. Let's try to draw a graph that represents some data. We will create and plot simple exponential lines as a graph.

We will start by setting up a canvas and a canvas background using the `setup()` function, as shown below:

```js
function setup() {

    createCanvas(600, 400);
    background(200);
}
```

The canvas is set, and that is where we will plot our exponential line.

Let's now set up a `draw()` function responsible for sketching and drawing an object within the canvas set above:

![create-canvas-background](/engineering-education/getting-started-with-data-visualization-using-p5js/create-canvas-background.png)

```js
function draw() {

    background(200);

    one = createVector(50,300);
    two = createVector(500,50);

    line(one.x,one.y,two.x,two.y);
}
```

![a-line-graph](/engineering-education/getting-started-with-data-visualization-using-p5js/a-line-graph.png)

The above graph is straightforward, just a simple line lying on a canvas. It's two-dimensional. It has an `x-axis` and a `y-axis`. This graph is just a sketch, and it doesn't have any meaningful data representation.

### Visualizing an array set of data
To drive in the aspect of data visualization, you first need to collect data, analyze it and represent it in a visual setup. In this case, for P5.js to work as a data visualization package, we need to have available data. This data can be collected and saved in different formats such as JSON, CSV, or as an array object.

We will use a simple project case of saved data then analyze that data and represent it using P5.js. We will use data stored in an array then plot it on a graph.

Before you begin, make sure you have CDN set within your HTML file `head` tags, i.e.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js" type="text/javascript"></script>
```

Also, ensure your `index.js` and `app.css` files are added to your HTML file. 

Below is the code that we will add in the `app.css` file:

```css
html, body {
  margin: 0;
  padding: 0;
}
```

Once that is set, we can start with a set of array object data. 

Below are the target values that we will use to plot a graph:

```js
["40","153","189","109","287","69","19","163"]
```

Let's dive in and start working on our code inside the `index.js` file. 

Start by setting up the following array values:

```js
// target values
let values = ["40","153","189","109","287","69","19","163"];
// intermediate values
let lerpValues = [];
// index which will increase at regular intervals
let index = 0;
```

We have added the data that we want to represent, as shown in the array above. Also, set an empty array that we will use to iterate through the intermediate values. 

Since a list of an array start at the `0` position. We added an index of `0` that will then increase as we iterate to the maximum array index. The data is ready, so we can now start setting up P5.js functions.

#### Adding the 'setup()' function
Let’s add the `setup()` function:

```js
function setup() {
  createCanvas(windowWidth,windowHeight);
  // Initialization of the table of intermediate values (all to zero)
  for(let i = 0;i<values.length;i++){
    lerpValues.push(0);
  }
}
```

Now we are creating the canvas and setting the background for that. In order to create our graph, we need to iterate over the intermediate values. This loops over the values and pushes them over the canvas.

This will initialize all array values. Also, avoid initializing such arrays with `draw()`. As we said, `draw()` is called over and over in different time frames. Creating a new array on every frame will slow down your frame rate.

#### Adding the 'draw()' function
The `draw()` function is responsible for plotting our graph:

```js
function draw() {
  background(255);
  noStroke();
  fill(0,200,220);
  for(i=0;i<index;i++){
    let posx = map(i,0,values.length,40,width);
    lerpValues[i] = lerp(lerpValues[i],values[i],0.2);
    rect(posx, height-20, 40, -lerpValues[i]);
    textAlign(CENTER);
    text(round(lerpValues[i]),posx+20,height-lerpValues[i]-30);
  }
}
```

#### Adding an interval time frame
`setInterval()` is used when you want to ask for the data frequently. This function is part of JavaScript itself in the browser and not a P5.js function. It triggers an event over and over every set of milliseconds.

```js
setInterval(function(){
  if(index<values.length){
    index+=1;
  }
},100);
```

This is mainly used when querying data from an API continuously while a program is running, and the program is animating something for the data representation. This helps to continue loading smoothly but updated whenever new data comes in. In the code above, we have set `setInterval()` and pass in a callback of `100 milliseconds`.

#### Adding a 'windowResized()' function
Since the graph can extend to the hidden screen when the screen is resized, this `windowResized()` function will help to keep the whole graph on screen as the screen size varies:

```js
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

Here is our final graph.

![array-data-graph](/engineering-education/getting-started-with-data-visualization-using-p5js/array-data-graph.png)

The data is now represented based on the size of each index used in this array. As you can see, it is simple to plot that data.

Let's try another use case.

### Visualizing data saved in a CSV file
Data comes saved in different formats. Let's use a simple use case and see how we can make use of data saved in a CSV file. Below is a sample CSV data that we will use. 

You can get this data from the files of this project hosted on [GitHub](https://github.com/JuliusGikonyoNyambura/Visualizing-CSV-using-P5.js):

![csv-previewed-data](/engineering-education/getting-started-with-data-visualization-using-p5js/csv-previewed-data.png)

This CSV represents the size of a country. It is then divided based on the mass of every component, such as the urban areas, forest cover, and road area. Each component will represent the mass that is occupied within the represented geographical borders.

Add the following in your `index.html` file.

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/addons/p5.dom.min.js"></script>
```

Also, add the following in your `app.css` to format the page.

```css
html, body {
  margin: 100;
  padding: 0;
}
canvas {
  display: block;
}
```

#### Add some variables

```js
let data;
let values
let labels;
let t = 0;
```

Here we are adding some variables to load data, data values, data labels (names), and iterates through the data.

#### Adding the 'preload()' function
To load any external data, use the `preload()` function. This specifies that we will load a CSV file with the header before we start using P5.js to visualize the data on a web page. Remember to download this `data.csv` file from [GitHub files](https://github.com/JuliusGikonyoNyambura/Visualizing-CSV-using-P5.js) of this project.

```js
function preload() {
  data = loadTable('./data.csv', 'csv', 'header');
}
```

#### Adding the 'setup()' function
We will add the following to our canvas:

```js
function setup() {
  createCanvas(800, 600);
  // give the name of the columns
  // give the number of lines
  // give the values of the Mass (Tt) column
  values = data.getColumn("Mass (Tt)");
  labels = data.getColumn("Component");
}
```

In the above code, we are setting the canvas that we want to lay down or graph. We are also loading the names of the columns and the value of each column. 

As a note, we can use `setup()` to load frames that can be called in different time frames. This reduces redundant calls that occur whenever `draw()` is called with the sketch frames.

We have two main columns, `Component` and `Mass (Tt)`. `Component` will load the text label (the column name) associated with each value. `Mass (Tt)` will load all the values that each column represents. We will use the values to draw different frames based on the mass that each component occupies.

#### Adding the 'draw()' function

```js
function draw() {
  background(255);
  for (let i = 0; i < values.length; i++) {
    rect(i * 40, height - 1, 40, -values[i] * t);
    fill(0, 200, 220);

    // text (labels [i], i * 40 + 20, height-1-values [i] * t-10);
    push();
    translate(i * 40 + 20, height - 1 - values[i] * t - 10);
    // to tilt the texts at 45 °
    rotate(radians(-45));
    fill(0, 200, 220);
    text(labels[i], 0, 0);
    pop();

  }
  if (t < 40) {
    t = t + 1;
  }
}
```

This is where the real sketch is implemented. So, now we need to iterate through this data and read each value. We are setting the height of each value based on the number that each component represents. Each value will draw a single graph. `draw()` will iterate and execute them. Then combine different time frames to come up with the whole graph.

For easier undesirability, we are also adding the names of the components as a label to each presented value.

The sketch is now complete, and we can test if everything is in order. To run this app, you need to use a live server. If you open this HTML file directly in a browser this code won't execute. We are running an external file that is hosted locally on your computer. This needs to run as a server.

To serve it to our application, we will utilize the live sever provided by the [Visual Studio Code](https://code.visualstudio.com/) and [Atom](https://atom.io/) editors.

- For Visual Studio atom-live-server, install the [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
- For Atom install the [atom-live-server](https://atom.io/packages/atom-live-server) package.

When you run your live server, you will get a graph similar to this one:

![visualized-csv-data](/engineering-education/getting-started-with-data-visualization-using-p5js/visualized-csv-data.png)

### Conclusion
P5.js is an ultimate sketch framework. It can be used with a variety of use cases such as creating illusion diagrams, designing simple games, data visualization, screen movements, etc. For example, [this pong game](https://margual56.github.io/pong/) was wholly designed using P5.js.

![pong-game](/engineering-education/getting-started-with-data-visualization-using-p5js/pong-game.png)

[Image Source](https://margual56.github.io/pong/)

Check the code used to implement the above pong game on [GitHub](https://github.com/margual56/pong).

Any sketch you can think of can be implemented using a P5.js package. As a data analytic tool, P5.js is compatible to load different data sources, such as CSV files or JSON objects. It can also be used to load data saved in a server (API), analyze and plot it with your best representable diagrams.

To learn more about P5.js check their [official documentation](https://editor.p5js.org/) to get up-to-date features.

Hope you find this helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
