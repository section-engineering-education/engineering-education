---
layout: engineering-education
status: publish
published: true
url: /data-representation-using-brython/
title: Data Representation using Brython
description: In this article, We aim to guide the reader on a step-by-step process of data representation using pie charts and scatterplots in Brython.
author: femi-ige-ayodele
date: 2022-01-24T00:00:00-10:23
topics: [languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-representation-using-brython/hero.jpg
    alt: Data Representation using Brython Hero Image.
---
The cooperation between JavaScript and the web has been a standard for ages. Python is the closest alternative in web development, and it's made possible through its micro-frameworks such as Flask, Hug, Cherrypy, etc. These frameworks have enabled Python to cooperate with the web.
<!--more-->
Instead of using Python micro-frameworks to run the client-side web applications, we have `Brython`. Brython, which stands for "Browser Python" is a client-side scripting language with Python3 performance that adapts to the HTML5 environment. Brython interfaces with JavaScript and its libraries like Vue, Bokeh, Highchart, and Phaser to build high-level web projects.

We aim to guide you on a step-by-step process of data representation using pie charts and scatterplots in Brython. This is possible because of the cooperation among Brython and Highchart libraries. Let's get started!

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Aim of this tutorial ](#aim-of-this-tutorial)
- [Getting started](#getting-started)
- [Installing Brython to our local environment](#installing-brython-to-our-local-environment)
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
- Have [Python programming](/engineering-education/python-projects-for-beginners/) skills.
- Have [Javascript programming](https://www.w3schools.com/js/) skills.
- Have [Visual Studio Code](https://code.visualstudio.com/) installed.
### Aim of this tutorial
The purpose of this tutorial is to guide the reader through how to:

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

#### Installing Brython in our local environment
There are two ways to install Brython, we will first install Brython using the Node Package Manager.
##### Using the Node Package Manager
Node.js is a JavaScript runtime used to build scalable network applications. Node executes JavaScript code outside a web browser. To install Brython using the Node package manager (npm), we download and install [Node.js](https://nodejs.org/en/). After the installation, we will run the command below in our terminal:

```bash
npm install brython
```

>NOTE: Ensure you run the above command while in your working directory. This will create a folder called node_modules which contains the Brython package.

To add the `brython.js` and `brython_stdlib.js` files  to our web project, we will use the script tag below:

```html
<script type="text/javascript" src="./node_modules/brython/brython.js"></script>
<script src="./node_modules/brython/brython_stdlib.js"></script>
```

Using the code snippets above, we have successfully installed Brython using the Node Package Manager. 

##### Using the Content Delivery Network
 Brython can also be delivered from the web using a CDN link. A Content Delivery Network (CDN) in JavaScript delivers hosted stylesheets and JavaScript files using the `src` attribute in the script tag. Using a CDN, we will get the `brython.js` and `brython_stdlib.js` files from the web.

To get the `brython.js` and `brython_stdlib.js` files, use the following code snippet:
```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.10.4/brython.js" integrity="sha512-Dr8IR/2fk/pBmngFLduWN5Ys/t7lcPxGgLCulHdTdgDrDRnGb+ANMxGXq+DKVN87jom+N3BrzzI476Pf98RReA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.10.4/brython_stdlib.js" integrity="sha512-kMRN6F4Yq4sNLbPG2lH3EO9n776JHHZub+UWogDxVjh9uTnoVo3wtN/rnQD4C4/AZtqI2zQdvdouGAAxOGwNeA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

This is the easiest method of installing Brython. For this method to successfully work, you need to be online.

The two methods are efficient in integrating `brython.js` and `brython_stdlib.js` into our project. After adding `brython.js` and `brython_stdlib.js` into our project, let's move to the next step.

#### Setting up the environment
The following steps will show how to set up the HTML file that will be used to create the pie chart and scatterplot.

##### Installing the Highcharts module.
To install the Highcharts module, use this code:

```npm
npm install highcharts
```

Using the command above, we will download some important Highchart modules such as `highchart.js` and `exporting.js`. The `exporting.js` allows us to download the charts in different file formats like PDF, PNG, vector images(SVG), and JPG.

In our HTML boilerplate, we will add the  `Jquery` script, the `exporting.js` file, and the `highchart.js` module. Use the following code snippet:

```html
<!-- jquery -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- highchart -->
<script src="./node_modules/highcharts/highcharts.js"></script>
<!-- exporting -->
<script src="./node_modules/highcharts/modules/exporting.js"></script>
```

##### Adding the `brython.js and brython_stdlib.js` file using our script tag. 
Having created our `chart.py` file, We import this file into our boilerplate using the script tag and set the type attribute to `"text/python3"`.

In the body section, we set the `onload` attribute to `brython(1)`. This enables us to print error messages on the browser's console. Within the `body` tag, we add a `div` tag with id `container`, the div has the inline styling below:

```css
#container{
    min-width: 310px; 
    height: 400px; 
    margin: 0 auto
}
```

The implementation of the aforementioned steps, our HTML file is as below:

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
    <!-- chart.py -->
    <script type="text/python3" src="chart.py"></script>
</head>
<body onload="brython(1)">
    <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
</body>
</html>
```

#### Creating a pie chart using Brython.
In statistics, a pie chart is a `circular` graph divided into pieces to show numerical proportions. In this section, we'll guide you on how to create a pie chart using Brython. To create the pie chart, we created a Python file called chart.py. As we progress, this file will contain some necessary code required in building our pie chart. Let us get started!🚀.

##### Chart.py file
The chart.py file contains the following code:

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
The code above plots the pie chart using the following methods:
- `from browser import window`: imports the window module from, thus allowing Brython access to Javascript object.
- `plotBackgroundColor`: It plots the background color for the chart area.
- `plotBorderWidth`: It plots the width of the chart area in pixels.
- `plotShadow`: This method takes in boolean values and adds a drop shadow to the area. 
- `renderTo`: This method is like `document.getElementBy` in javascript. It will take the `id` of the `div` tag in our HTML code.
- `tooltip`: This object contains the details in the small box when we hover on our chart.
- `allowPointSelect`: If set as `true`, it allows you to toggle or select any of the slices in the pie chart
- `Series`: this is a set of data. In this case, it is the religious distribution of people in Nigeria.

When we execute this code, our pie chart is as shown below:

![piechart1](engineering-education/data-representation-with-react-and-ant-design/piechart1.png) 

![piechart2](engineering-education/data-representation-with-react-and-ant-design/piechart2.png)

#### Creating a scatterplot using Brython.
A scatterplot tests the relationship between two factors. To achieve this, we will put in place the HTML file used for the pie chart. The only difference is the code in the chart.py file.

##### Chart.py file
The `chart.py` file for the scatterplot is as below:

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

The code above shows the relation between weight and height using a sample of 53 individuals of different races.

When we execute this code, the scatterplot is as shown below:

![scatterplot](engineering-education/data-representation-with-react-and-ant-design/scatterplot.png)

The code above plots the scatterplot using the `chart` object. The `chart` object has the following methods that specify the behavior of our scatterplot.

- `type`: This method specifies the chart type. In this case, it is a scatterplot. Thus, it taking the value `scatter`
- `zoomType`: This method specifies the zoom dimension when we move the mouse.
- `radius`: This specifies the horizontal distance between the two closest points in a series.
- `hover`: if enabled as true, hover takes effect when the mouse is placed over any of the series, thereby highlighting them.
- `tooltip`: This is a small modal that pops up when we hover our mouse on the datasets in the plot. It displays all details added to the scatterplot.

### Conclusion
The process of data representation is a delightful journey. Like all journeys, it must come to an end.  Through the use of a Content Delivery Network, we were able to import Brython and Highchart's Javascript files. This further enabled us to represent data in the form of a pie chart and scatterplot using Brython. To get the Python code used in this tutorial, click [here](https://github.com/ayodele96/brython).

### Further Reading
For further reading on Brython, read this [documentation](https://brython.info/static_doc/en/intro.html).
