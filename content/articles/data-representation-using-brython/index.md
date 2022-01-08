The cooperation between JavaScript and the web has been a standard. There are different programming languages used for web development, with a notable mention being Python.  Python has micro-frameworks such as `Flask`, `Hug`, and `Cherrypy` which have enabled Python to cooperate with the web.

Instead of using Python micro-frameworks to run the client-side web applications, we have `Brython`.  `Brython` stands for Browser Python.  `Brython` is a client-side scripting language with Python3 execution that is adjusted to the HTML5 environment. 

Brython interfaces smoothly with JavaScript and its libraries to build high-level web projects. It incorporates libraries such as Vue.js, Bokeh, Highchart, and Phaser.

In this tutorial, we will represent data utilizing piecharts and scatterplots in Brython. This is possible because of the cooperation among Brython and Highchart.js libraries. Let's get started!

### Table of contents
- [Prerequisites](#prerequisites)
- [Aim of this tutorial](#aim-of-this-tutorial)
- [Getting started](#getting-started)
  - [Installing Brython with the Node Package Manager](#installing-brython-with-the-node-package-manager)
  - [Installing Brython using Content Delivery Network](#installing-brython-using-content-delivery-network)
  - [Create a piechart using Brython.](#create-a-piechart-using-brython)
- [Chart.py file](#chartpy-file)
  - [Creating a scatterplot using Brython.](#creating-a-scatterplot-using-brython)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Prerequisites

To follow along easily, the reader should:

- Install the [Python](https://www.python.org/downloads/) executable.
-  Have [Python programming](/engineering-education/python-projects-for-beginners/) skills.
-  Have [Javascript programming](https://www.w3schools.com/js/) skills.
-  Have [Visual Studio Code.](https://code.visualstudio.com/)

### Aim of this tutorial
In this tutorial, we aim to guide the readers on how to:

- Installing Brython in our local environment. We can achieve this using a host of methods:

    1. PyPI. To use this method make sure you have installed Python3.
    2. Content Delivery Network (CDN).
    3. Node Package Manager (npm).
    4. GitHub.
     
> NOTE: We will focus on the second and third methods in creating a piechart and scatter plot.

### Getting started
To get started, we will Install Brython with the Node Package Manager.

#### Installing Brython with the Node Package Manager
Node.js is a JavaScript runtime used to build scalable network applications. It executes JavaScript code outside a web browser. 
To install Brython using `npm`, download and install [Node.js](https://nodejs.org/en/). After installation, run this command in your terminal:

```bash
npm install brython
```

Run this command while in your working directory. This will create a folder called node_modules. This folder contains the Brython package.

To add the Brython and Brython stdlib package to your web project, use the script tag below:

```html
<script type="text/javascript" src="./node_modules/brython/brython.js"></script>
<script src="./node_modules/brython/brython_stdlib.js"></script>
```

#### Installing Brython using Content Delivery Network
Brython can be delivered directly from the web using a CDN link. Content Delivery Networks in JavaScript deliver hosted stylesheets and JavaScript files using the `src` attribute in the script tag. The JavaScript file for Brython and Brython stdlib are as below:

```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.10.4/brython.js" 
integrity="sha512-Dr8IR/2fk/pBmngFLduWN5Ys/t7lcPxGgLCulHdTdgDrDRnGb+ANMxGXq+DKVN87jom+N3BrzzI476Pf98RReA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.10.4/brython_stdlib.js" integrity="sha512-kMRN6F4Yq4sNLbPG2lH3EO9n776JHHZub+UWogDxVjh9uTnoVo3wtN/rnQD4C4/AZtqI2zQdvdouGAAxOGwNeA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

You can use any of the methods above to create your Brython project. After creating the Brython project, we can now create a piechart.

#### Create a piechart using Brython.
In this section, we will start by creating a piechart using Brython. To create the piechart, we will follow the following steps:

1. Initializing the HTML5 boilerplate.
To initialize the HTML5 boilerplate, use the following code in VisualStudio Code:

```html
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

2. Installing the Highcharts module.
To install the Highcharts module, use this code:

```npm
npm install highcharts
```

> Note: If you used the Node Package Manager, make sure you link your script to the `exporting.js` file in the `node_module folder`.

To link your script to the `exporting.js` file in the `node_module folder`, use this code:

```html
<!-- jquery -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- exporting.js -->
<script src="exporting.js"></script>
```

3.  Adding the `brython.js and brython_stdlib.js` file using our script tag. 

First, we will create a file named `chart.py.`  We then import these files into our HTML file using the script tag and set the type to `"text/python3"`.

- In the body section,  add the `onload` attribute `brython(1)`. It prints error messages on the browser's console. Within the body tag,  add a div tag with id `container`, the div has the inline styling below:

```css
#container{
    min-width: 310px; 
    height: 400px; 
    margin: 0 auto
}
```

The `html` code is shown below:

```html
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Piechart</title>

        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

        <script src="./node_modules/highcharts/highcharts.js"></script>
        <script src="exporting.js"></script>

        <script type="text/javascript" src="./node_modules/brython/brython.js"></script>
        <script src="./node_modules/brython/brython_stdlib.js"></script>
        <script type="text/python3" src="chart.py"></script>

    </head>
    <body onload="brython(1)">

        <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>

    </body>
</html>
```

### Chart.py file 
The chart.py file contains the following code:

```python
from browser import window

b_highchart = window.Highcharts.Chart.new

b_highchart({        
    'chart': {
        'plotBackgroundColor': '#FCFFC5',
        'plotBorderWidth': None,
        'plotShadow': False,
        'renderTo': 'container'
    },
    'title': {
        'text': 'Religious Distribution in Nigeria'
    },
    'tooltip': {
        'pointFormat': '<b>{point.percentage:.1f}%</b>'
    },
    'plotOptions': {
        'pie': {
            'allowPointSelect': True,
            'cursor': 'pointer',
            'dataLabels': {
                'enabled': True,
                'format': '<b>{point.name}</b>: {point.percentage:.1f} %',
                'style': {
                    'color': 'black'
                }
            }
        }
    },
    'series': [{
        'type': 'pie',
        'data': [
            ['Indigenious Beliefs',   10.7],
            ['Other Christian',       35.3],
            {
                'name': 'Roman Catholicism',
                'y': 10.0,
                'sliced': True,
                'selected': True
            },
            ['Islam',    43.5],
            ['Others',     0.5]
        ]
    }]
})
```

The code above is used to plot the pie chart using the following methods:
**`plotBackgroundColor`** 
It is used to plot the background color for the chart area.

**`plotBorderWidth`** 
This is used to plot the width of the chart area in pixels.

**`plotShadow`**  
This method takes in boolean values. It adds a drop shadow to the area. 

**`renderTo` **
This method is similar to `document.getElementBy` in javascript. It will take the `id` of the `div` tag in our HTML code.

**`tooltip`**
This object contains the details in the small box when we hover on our chart.

When we execute this code, our piechart is as shown below:

![piechart1](engineering-education/data-representation-with-react-and-ant-design/piechart1.png) 

![piechart2](engineering-education/data-representation-with-react-and-ant-design/piechart2.png)

#### Creating a scatterplot using Brython.
A scatter plot is used to test the relationship between two factors. To achieve this, we will implement the same methods used in plotting the piechart. The only difference is the code in the chart.py file.

The new `chart.py` file for the scatterplot is shown below:

```python
from browser import window

b_highchart = window.Highcharts.Chart.new

b_highchart({
    'chart': {
        'type': 'scatter',
        'zoomType': 'xy',
        'renderTo': 'container'
    },
    'title': {
        'text': 'Scatter plot of the height compared to the weight of 53 Individuals by Race.'
    },
    'xAxis': {
        'title': {
            'text': 'Height (cm)'
        }
    },
    'yAxis': {
        'title': {
            'text': 'Weight (kg)'
        }
    },

    'plotOptions': {
        'scatter': {
            'marker': {
                'radius': 5,
                'states': {
                    'hover': {
                        'enabled': True,
                        'lineColor': 'rgb(100,100,100)'
                    }
                }
            },
            'states': {
                'hover': {
                    'marker': {
                        'enabled': False
                    }
                }
            },
            'tooltip': {
                'headerFormat': '<b>{series.name}</b><br>',
                'pointFormat': '{point.x} cm, {point.y} kg'
            }
        }
    },
    'series': [{
        'name': 'African',
        'color': 'red',
'data': [[173, 104],[132, 132],[137, 72],[73, 153],[119, 109],[90, 136],[122, 81],[72, 189],[159, 135],
[121, 131],[77, 99],[129, 119],[82, 181],[88, 188],[129, 91],[122, 140],[140, 161],[175, 132]]

}, {'name': 'Asian',
'color': 'yellow',
'data':[[135, 111],[127, 179],[79, 162],[131, 109],[108, 143],[109, 92],[108, 158],[110, 102],[79, 149],
[92, 141],[86, 190],[71, 99],[129, 108],[123, 116],[89, 86],[132, 181],[137, 190],[132, 143]]

}, {
'name': 'Hispanic',
'color': 'green',
'data': [[156, 177],[177, 83],[180, 145],[122, 106],[100, 147],[155, 72],[85, 81],[90, 122],[107, 161],[73, 168],[100, 104],[117, 82],[153, 71],[88, 74],
[171, 117],[83, 185],[125, 136]]
}]
})
```
The code above shows the relation between weight and height using a sample of 53 individuals of different races.

When we execute this code, the scatterplot is as shown below:

![scatterplot](engineering-education/data-representation-with-react-and-ant-design/scatterplot.png)

The code above plots the scatterplot using the `chart` object.  The `chart` object has the following methods that specify the behavior of our scatter plot.

**`type`**
This method is used to specify the chart type.

**`zoomType`**
 This method specifies the zoom dimension when we move the mouse.
 
**`tooltip`** 
This is a small modal that pops up when we hover our mouse on the datasets in the plot.  It displays all details added to the scatter plot.

### Conclusion
The process of data representation is a delightful journey. Like all journeys, it must come to an end. 
Through the use of a content delivery network, we were able to import Brython and highchart's Javascript files. This further enabled us to represent data in the form of piechart and scatter plot using Brython.
[Here](https://github.com/ayodele96/brython) is the link to the repository containing the code snippets.

### Reference
For more exposure on this topic, go through the [Brython documentation](https://brython.info/static_doc/en/intro.html).
