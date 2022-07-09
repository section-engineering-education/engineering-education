---
layout: engineering-education
status: publish
published: true
url: /data-representation-using-brython/
title: Data Representation using Brython
description: This article will guide the reader on how to present data using pie charts and scatterplots in Brython.
author: femi-ige-ayodele
date: 2022-02-14T00:00:00-03:30
topics: [languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-representation-using-brython/hero.jpg
    alt: Data Representation using Brython Hero Image.
---
Apart from JavaScript, Python is another alternative language for web development. This is due to micro-frameworks such as Flask, Hug, and Cherrypy. 
<!--more-->
Brython is a client-side scripting language with Python3 performance that adapts to the HTML5 environment. We can, therefore, use *Brython* to run client-side web applications.

Brython is compatible with JavaScript and libraries such as *Vue, Bokeh, Highchart*, and *Phaser*.

In this tutorial, we will discuss the process of data representation using pie charts and scatterplots in Brython. 

Let's get started!

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Getting started](#getting-started)
- [Setting up the environment](#setting-up-the-environment)
- [Installing the Highcharts module.](#installing-the-highcharts-module)
- [Adding the `brython.js` and `brython_stdlib.js` file using our script tag.](#adding-the-brython.js-and-brython_stdlibjs-file-using-our-script-tag)
- [Creating a pie chart using Brython.](#creating-a-pie-chart-using-brython)
- [Chart.py file](#chart.py-file)
- [Creating a scatterplot using Brython.](#creating-a-scatterplot-using-brython)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Prerequisites
To follow along, the reader should:

- Install the [Python](https://www.python.org/downloads/) executable.
- Have some [Python](/engineering-education/python-projects-for-beginners/) and [Javascrip](https://www.w3schools.com/js/) programming skills.
- Have an IDE such as [Visual Studio Code](https://code.visualstudio.com/) installed.

### Goals
The purpose of this tutorial is to guide the reader on how to:

1. Install Brython in our local environment. We can achieve this using the following host methods:

- PyPI. To use this method, make sure you have installed Python3.
- Content Delivery Network (CDN).
- Node Package Manager (npm).
- GitHub.

> NOTE: We will focus on the Content Delivery Network (CDN) and Node Package Manager (npm) in our project.

2. Create a pie chart using Highchart and Brython.

3. Create a scatterplot using Highchart and Brython.

### Getting started
To get started, we will install Brython in our local environment.

There are two ways to install Brython, we will first use the Node Package Manager.

##### Using the Node Package Manager
Node.js is a JavaScript runtime used to build scalable network applications. Node executes JavaScript code outside a web browser. 

To install Brython using the Node package manager (npm), we download and install [Node.js](https://nodejs.org/en/). 

After the installation, we will run the command below in our terminal:

```bash
npm install brython
```

> NOTE: Ensure that you run the above command while in your working directory. This will create a folder called node_modules which contains the Brython package.

To add the `brython.js` and `brython_stdlib.js` files  to our web project, we will use the script tag below:

```html
<script type="text/javascript" src="./node_modules/brython/brython.js"></script>
<script src="./node_modules/brython/brython_stdlib.js"></script>
```

Using the code snippets above, we have successfully installed Brython using the Node Package Manager. 

##### Using the Content Delivery Network
Brython can also be fetched from the web using a CDN link. A Content Delivery Network (CDN) in JavaScript delivers hosted stylesheets and JavaScript files using the `src` attribute in the script tag.

We will retrieve the `brython.js` and `brython_stdlib.js` files from the web using a CDN, as follows:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.10.4/brython.js" integrity="sha512-Dr8IR/2fk/pBmngFLduWN5Ys/t7lcPxGgLCulHdTdgDrDRnGb+ANMxGXq+DKVN87jom+N3BrzzI476Pf98RReA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.10.4/brython_stdlib.js" integrity="sha512-kMRN6F4Yq4sNLbPG2lH3EO9n776JHHZub+UWogDxVjh9uTnoVo3wtN/rnQD4C4/AZtqI2zQdvdouGAAxOGwNeA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

This is the easiest method of installing Brython. However, for this method to be successful, you should be online.

Both methods are efficient in integrating `brython.js` and `brython_stdlib.js` into our project. 

#### Setting up the environment
The following steps will show how to set up the HTML file that will be used to create the pie chart and scatterplot. 

In addition to the Brython modules, a few packages are needed for our project. They include:

- *Highcharts.js*
- *JQuery*
- *Exporting.js*

##### Installing the Highcharts module.
To install the *Highcharts* module, use the following code:

```bash
npm install highcharts
```

Using the command above, we will download some important Highchart modules such as `highchart.js` and `exporting.js`. 

The `exporting.js` library allows us to download charts in different file formats like *PDF, PNG, vector images(SVG)*, and *JPG*.

In the HTML boilerplate code, we will add the  `Jquery` script, the `exporting.js` file, and the `highchart.js` module, as shown below:

```html
<!-- jquery -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- highchart -->
<script src="./node_modules/highcharts/highcharts.js"></script>
<!-- exporting -->
<script src="./node_modules/highcharts/modules/exporting.js"></script>
```

##### Adding brython.js and brython_stdlib.js files
To add *brython.js* and *brython_stdlib.js* files, we first include the above Brython modules into our boilerplate using a script tag. 

Next, we set the `onload` attribute in the body tag to `brython(1)`. This enables us to print error messages on the browser's console. 

Within the `body` tag, we add a `div` tag with the id of `container`, the div has the following inline styling:

```css
#container{
    min-width: 310px; 
    height: 400px; 
    margin: 0 auto
}
```

Here is how our HTML file now looks:

```html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Pie chart</title>
    <!-- jquery -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <!-- highchart -->
    <script src="./node_modules/highcharts/highcharts.js"></script>
    <!-- exporting -->
    <script src="./node_modules/highcharts/modules/exporting.js"></script>
    <!-- brython -->
    <script type="text/javascript" src="./node_modules/brython/brython.js"></script>
    <!-- brython stdlib -->
    <script src="./node_modules/brython/brython_stdlib.js"></script>
</head>
<body onload="brython(1)">
    <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
</body>
</html>
```

#### Creating a pie chart using Brython.
In statistics, a pie chart is a `circular` graph divided into pieces to show numerical proportions. 

To build the pie chart, we will create a Python file called `chart.py.` As we progress, this file will contain some necessary code required in building our pie chart. 

Let's get started!

##### Chart.py file
We will create the `chart.py` file then import it into our HTML code using the script tag. We will also set the type attribute to `text/python3`. 

This file is imported into the HTML boilerplate using the script tag below:

```html
<!-- chart.py -->
<script type="text/python3" src="chart.py"></script>
```

The `chart.py` file that we have created contains the following code:

```python
from browser import window

b_highchart = window.Highcharts.Chart.new
b_highchart(
    {
        "chart": {
            "plotBackgroundColor": "#FCFFC5",
            "plotBorderWidth": None,
            "plotShadow": False,
            "renderTo": "container",
        },
        "title": {"text": "Religious Distribution in Nigeria"},
        "tooltip": {"pointFormat": "<b>{point.percentage:.1f}%</b>"},
        "plotOptions": {
            "pie": {
                "allowPointSelect": True,
                "cursor": "pointer",
                "dataLabels": {
                    "enabled": True,
                    "format": "<b>{point.name}</b>: {point.percentage:.1f} %",
                    "style": {"color": "black"},
                },
            }
        },
        "series": [
            {
                "type": "pie",
                "data": [
                    ["Indigenious Beliefs", 10.7],
                    ["Other Christian", 35.3],
                    {
                        "name": "Roman Catholicism",
                        "y": 10.0,
                        "sliced": True,
                        "selected": True,
                    },
                    ["Islam", 43.5],
                    ["Others", 0.5],
                ],
            }
        ],
    }
)
```

The code above plots the pie chart using the following methods and attributes:

- `from browser import window`: It imports the window module which allows Brython access to the JavaScript object.

- `plotBackgroundColor`: It plots the background color for the chart area.

- `plotBorderWidth`: It plots the width of the chart area in pixels.

- `plotShadow`: This method takes in boolean values and adds a drop shadow to the area. 

- `renderTo`: This method is like `document.getElementById` in javascript. It will take the `id` of the `div` tag in our HTML code.

- `tooltip`: This object shows certain details in a small box when we hover on our chart.

- `allowPointSelect`: If set as `true`, it allows one to toggle or select any of the slices in the pie chart.

- `Series`: This is a set of data. In our case, it is the religious distribution of people in Nigeria.

When we execute this code, our pie chart will appear as follows:

![Piechart](/engineering-education/data-representation-using-brython/piechart1.png) 

#### Creating a scatterplot using Brython.
A scatterplot tests the relationship between two factors or variables. To achieve this, we will use the HTML file that we previously used to create the pie chart. 

We only need to make some changes to the *chart.py* file.

##### Making changes to the chart.py file
We will use the following `chart.py` file to plot the scatterplot:

```python
from browser import window

b_highchart = window.Highcharts.Chart.new
b_highchart(
    {
        "chart": {"type": "scatter", "zoomType": "xy", "renderTo": "container"},
        "title": {
            "text": "scatterplot of the height compared to the weight of 53 Individuals by Race."
        },
        "xAxis": {"title": {"text": "Height (cm)"}},
        "yAxis": {"title": {"text": "Weight (kg)"}},
        "plotOptions": {
            "scatter": {
                "marker": {
                    "radius": 5,
                    "states": {
                        "hover": {"enabled": True, "lineColor": "rgb(100,100,100)"}
                    },
                },
                "states": {"hover": {"marker": {"enabled": False}}},
                "tooltip": {
                    "headerFormat": "<b>{series.name}</b><br>",
                    "pointFormat": "{point.x} cm, {point.y} kg",
                },
            }
        },
        "series": [
            {
                "name": "African",
                "color": "red",
                "data": [
                    [173, 104],
                    [132, 132],
                    [137, 72],
                    [73, 153],
                    [119, 109],
                    [90, 136],
                    [122, 81],
                    [72, 189],
                    [159, 135],
                    [121, 131],
                    [77, 99],
                    [129, 119],
                    [82, 181],
                    [88, 188],
                    [129, 91],
                    [122, 140],
                    [140, 161],
                    [175, 132],
                ],
            },
            {
                "name": "Asian",
                "color": "yellow",
                "data": [
                    [135, 111],
                    [127, 179],
                    [79, 162],
                    [131, 109],
                    [108, 143],
                    [109, 92],
                    [108, 158],
                    [110, 102],
                    [79, 149],
                    [92, 141],
                    [86, 190],
                    [71, 99],
                    [129, 108],
                    [123, 116],
                    [89, 86],
                    [132, 181],
                    [137, 190],
                    [132, 143],
                ],
            },
            {
                "name": "Hispanic",
                "color": "green",
                "data": [
                    [156, 177],
                    [177, 83],
                    [180, 145],
                    [122, 106],
                    [100, 147],
                    [155, 72],
                    [85, 81],
                    [90, 122],
                    [107, 161],
                    [73, 168],
                    [100, 104],
                    [117, 82],
                    [153, 71],
                    [88, 74],
                    [171, 117],
                    [83, 185],
                    [125, 136],
                ],
            },
        ],
    }
)
```

The code snippet above shows the relationship between *weight* and *height* using a sample of *53* individuals from different races.

The `chart` object used in the scatterplot has the following methods:

- `type`: This method specifies the chart type. In this case, it is a scatterplot. Therefore, it takes the value `scatter`.

- `zoomType`: This method specifies the zoom dimension when we move the mouse.

- `radius`: It specifies the horizontal distance between the two closest points in a series.

- `hover`: If enabled as *true*,  there is a hover effect when the mouse is placed over any of the series.

- `tooltip`: This is a small modal that pops up when we hover our mouse on the plot. It displays all details added to the scatterplot.

When we execute the above code, the scatterplot is as shown below:

![Scatterplot](/engineering-education/data-representation-using-brython/scatterplot.png)

### Conclusion
In this tutorial, we used a Content Delivery Network to import Brython and Highchart Javascript files. 

These libraries enabled us to represent data in the form of a pie chart and scatterplot. 

You can find the full code used in this tutorial in this [GitHub repository](https://github.com/ayodele96/brython).

Happy coding!

### Further reading
- [documentation](https://brython.info/static_doc/en/intro.html).

---
Peer Review Contributions by: [Bravin Wasike](/engineering-education/authors/bravin-wasike/)