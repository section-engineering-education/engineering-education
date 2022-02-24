---
layout: engineering-education
status: publish
published: true
url: /nodejs-charts/
title: Getting Started with billboard.js charts
description: This tutorial will go over the basics of billboard.js chart types and how to create different types of charts in billboard.js
author: quinter-awuor
date: 2021-05-29T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nodejs-charts/hero.jpg
    alt: Getting Started with billboard.js charts example image
---
`billboard.js` is a JavaScript library that facilitates data visualization in charts and is based on D3 V4+. `billboad.js` makes it easier for developers to visualize data instantly without needing to write a lot of boilerplate code.
<!--more-->
### Table of contents
- [Table of contents](#table-of-contents)
- [Getting started with billboard.js](#getting-started-with-billboardjs)
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
  - [Installing billboard.js](#installing-billboardjs)
  - [Supported chart types in billboard.js](#supported-chart-types-in-billboardjs)
  - [Creating charts using billboard.js](#creating-charts-using-billboardjs)
  - [Displaying categorical data using billboard.js](#displaying-categorical-data-using-billboardjs)
  - [Chart themes in billboard.js](#chart-themes-in-billboardjs)
- [Conclusion](#conclusion)

### Prerequisites
- [Node.js](https://nodejs.org/en/) installed on your computer.
- [Npm](https://www.npmjs.com/) installed on your computer.
- [Javascript](https://www.w3schools.com/js/js_intro.asp) and [HTML](https://www.w3schools.com/html/default.asp) knowledge.

### Project setup
- Create a project directory named `charts`.
- Within the `charts` directory created above, create a new HTML file name `index.html`.

#### Installing billboard.js
`billboard.js` can be added to a project in two ways:

1. **Manual download**
Download `billboad.js` files from the [billboard.js official website](https://naver.github.io/billboard.js/). Add the CSS and Javascript files downloaded into the `chart` directory we created above.
   
In the `index.html`, add the code snippet below into the header section.
```Html
   <!-- Load D3.js -->
    <script src="https://d3js.org/d3.v5.min.js"></script>

    <!-- Load billboard.js -->
    <script src="billboard.js"></script>

    <!-- Load style -->
    <link rel="stylesheet" href="billboard.css">
```

2. **Installation through npm.**
To install `billboard.js` into our project through npm, we must initialize npm in the root directory of our project. 
- Change to current terminal directory to our project directory.
- Execute the command below to create `package.json` and `package.lock.json` files which are used by Node.js to manage external libraries added to Node.js applications.
  
```bash
    $ npm init
```
- To install `billboard.js` into our project through npm, execute the command below.
``` bash
    $ npm install billboard.js
```

#### Supported chart types in billboard.js
`billboard.js` supports a variety of charts. Below are certain chart types supported by `billboard.js`.

![Chart types](/engineering-education/nodejs-charts/chart-types.png)

#### Creating charts using billboard.js
In this section, we are going to create a simple chart using billboard.js.
1. Create an HTML file names `chart.html` in the project folder we created above.
2. Add the code snippet below to the `chart.html` file.
```html
   <!DOCTYPE html>

    <title>billboard.js application</title>

    <head>
    <!-- loading billboard.js styles from the cdn -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.css">

    <!--Loading D3.js -->
    <script src="https://d3js.org/d3.v5.min.js"></script>

    <!-- Loading billboard.js scripts from the cdn --> 
    <script src="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.js"></script>
    </head>
    <body>

    </body>

    </html>

```
3. Create a `div` with an id `charting` within the `body` tag in the `chart.html` file we created above.
```html
   <div id="charting"></div>
```
4. Create a file named `charting.js` in the root project directory and add the code snippet below.
   
```javascript
   bb.generate({
    bindto: "#charting",
    data: {
        columns: [
            ["Java", 10, 320, 400, 210, 90, 210],
            ["Python", 310, 200, 210, 24, 220, 30]
        ],
        types: {
          Java: "area-spline",
          Python: "step"
        },
        colors: {
          Java: "blue",
          Python: "green"
        }
    }
    });
```

- `bb.generate({})` generates a chart with the arguments passed to it.
- `bindto: "#charting"` holds the `div` id where the chart will be displayed in our HTML file.
- ` data` holds an object with all the information required to create the chart.
- `columns` hold the data from which the chart will be plotted.
- `types` indicates the type of chart to be used. In our chart, we are using a line chart for Java and a step-chart for Python.
- `colors` specifies the color in which each data will be presented.

5. Add the `charting.js` script to the `chart.html` file at the bottom of the `body` tag.
```html
   <script src="charting.js"></script>
```
The chart shown below is plotted.
   
![Chart Image](/engineering-education/nodejs-charts/basic-chart.png)

#### Displaying categorical data using billboard.js
When a large set of data is to be displayed, then displaying them in categories becomes handy.
- Create a `div` with id `categorical` in the `chart.html` file we created earlier.
- Create a Javascript file named `categorical.js` in the project directory.
- Add the code snippet below to the file created above.
  
```javascript
   var chart = bb.generate({
    bindto: "#categorical",
    data: {
    x: "x",
    columns: [
        ["x", "www.siteone.com", "www.sitetwo.com", "www.sitethree.com", "www.sitefour.com"],
        ["downloads", 50, 100, 200, 600],
        ["uploads", 80, 110, 150, 220]
    ],
    groups: [
      [
        "downloads",
        "loading"
      ]
    ],
        colors: {
          downloads: "blue",
          uploads: "green"
        },
    type: "bar",
    },
    axis: {
        x: {
        type: "category"
        }
    },
    bindto: "#categoryData"
    });
``` 

The categorical data above is displayed in the chart as shown in the image below.

![Image with Categorical data](/engineering-education/nodejs-charts/categorical-chart.png)

#### Chart themes in billboard.js
`billboard.js` comes with various themes, some of which include:
- `graph`
- `datalab`
- `insight`
- `default`
  
To use the above themes, load the CSS file provided by `billboard.js` into your HTML file as shown below.

```Html
<link rel="stylesheet" href="
https://naver.github.io/billboard.js/release/latest/dist/theme/insight.css">
```
### Conclusion
Now that you have learned how to integrate `billboard.js` into a Node.js application, explore the available charts and themes from the [billboard.js official docs](https://naver.github.io/billboard.js/). 

Find the full source code of the application [here](https://replit.com/@qawuor/chart#chart.html).

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
