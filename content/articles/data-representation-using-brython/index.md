The cooperation between JavaScript and the web has been a standard. There are different programming languages used for web development, with a notable mention being Python.  Python has micro-frameworks such as `Flask`, `Hug`, and `Cherrypy` which have enabled Python to cooperate with the web.

Instead of using Python micro-frameworks to run the client-side web applications, we have `Brython`. `Brython` stands for Browser Python.  `Brython` is a client-side scripting language with Python3 execution that is adjusted to the HTML5 environment. 

Brython interfaces smoothly with JavaScript and its libraries to build high-level web projects. It incorporates libraries such as Vue.js, Bokeh, Highchart, and Phaser.

In this tutorial, we will represent data utilizing piecharts and scatterplots in Brython. This is possible because of the cooperation among Brython and Highchart.js libraries. Let's get started!
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

#### Installing brython with the node package manager
Node.js is a JavaScript runtime used for building scalable network applications and executes JavaScript code outside a web browser. 
To install Brython using npm, [Node.js](https://nodejs.org/en/) must be downloaded and installed. After installation, type the following command on your terminal:
```bash
npm install brython
```
Do this in your preferred directory for your project. You will notice a folder called node_modules, and within it contains the Brython package. 
Thus, you can add it to your web project using the script tag below:
```HTML
<script type="text/javascript" src="../node_modules/brython/brython.js"></script>
```

#### Installing brython using content delivery network
Similar to the use of script tags above, Brython can be delivered directly from the web using CDN. 
Content delivery networks in JavaScript deliver hosted stylesheets and JavaScript files using the `src` attribute in the script tag. The javascript file for Brython is as below:
```JavaScript
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.10.4/brython.js" 
integrity="sha512-Dr8IR/2fk/pBmngFLduWN5Ys/t7lcPxGgLCulHdTdgDrDRnGb+ANMxGXq+DKVN87jom+N3BrzzI476Pf98RReA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```
Any of the methods above is acceptable and, you should have your Brython project working as required.

#### Create a piechart using Brython.
In this section, we will start by creating a piechart using Brython. To create the piechart, we will follow the following steps:

1. Initializing the HTML5 boilerplate.
To initialize the HTML5 boilerplate, use the following code in VisualStudio Code:

```HTML
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```
- We'll add Jquery just as Highchart's exporting.js CDN to our boilerplate. Also, we'll install the Highcharts module using:
```
npm install highcharts
```
Note! If you used the Node package manager, link your script to the exporting.js file in the node_module folder.

To link your script to the `exporting.js` file in the `node_module folder`, use this code:
```html
<!-- jquery -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- exporting.js -->
<script src="exporting.js"></script>
```
3.  Adding the `brython.js` file using our script tag. 

First, we will create a file named `chart.py.`  We then import these files into our HTML file using the script tag and set the type to `"text/python3"`.

- In the body section,  add the `onload` attribute `brython(1)`. It prints error messages on the browser's console. Within the body tag,  add a div tag with id `container`, the div has the inline styling below:
```CSS
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

        <!-- <script src="highchart.js"></script> -->
        <script src="exporting.js"></script>

        <script type="text/javascript" src="../node_modules/brython/brython.js"></script>
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
        'text': 'Scatter plot of the height compared to the weight of 600 Individuals by Race.'
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
'data': [[156, 176],[146, 173],[126, 150],[146, 124],[156, 149],[149, 148],[150, 183],
[117, 138],[98, 115],[79, 86],[105, 169],[160, 77],[107, 137],[150, 114],[104, 166],
[149, 178],[136, 131],[103, 111],[147, 92],[157, 117],[179, 108],[113, 96],[96, 173],
[126, 131],[98, 186],[146, 89],[169, 138],[104, 154],[141, 129],[154, 153],[155, 103],
[145, 179],[84, 153],[75, 133],[104, 180],[174, 85],[147, 79],[89, 102],[79, 141],[168, 134]
,[125, 76],[149, 73],[85, 113],[134, 172],[176, 109],[175, 164],[121, 139],[103, 170],
[136, 182],[86, 143],[90, 97],[96, 91],[82, 185],[149, 184],[108, 79],[179, 154],[123, 72]
,[137, 114],[96, 81],[90, 182],[79, 163],[174, 93],[94, 95],[99, 76],[147, 179],[76, 96],
[174, 187],[123, 70],[101, 126],[70, 118],[132, 190],[158, 137],[164, 83],[83, 79],[75, 84],
[173, 129],[82, 113],[162, 177],[164, 140],[130, 70],[161, 136],[153, 145],[152, 74],[87, 161],
[105, 131],[74, 174],[106, 187],[102, 175],[135, 140],[174, 82],[107, 132],[73, 183],[151, 163],
[149, 129],[145, 160],[178, 116],[130, 117],[126, 71],[176, 136],[86, 187],[106, 173],[125, 71],
[154, 73],[77, 118],[103, 132],[93, 166],[150, 177],[75, 183],[178, 77],[119, 86],[160, 108],
[116, 73],[97, 95],[156, 151],[70, 165],[72, 114],[120, 126],[71, 77],[74, 157],[146, 164],[153, 158],
[143, 95],[114, 157],[117, 130],[80, 72],[115, 178],[161, 77],[79, 175],[119, 167],[159, 144],[71, 73],
[137, 152],[72, 166],[116, 141],[157, 92],[86, 170],[72, 93],[119, 172],[117, 79],[85, 166],[129, 180],
[146, 123],[161, 164],[93, 143],[147, 79],[111, 114],[99, 72],[156, 182],[86, 123],[85, 148],[84, 173],
[109, 95],[141, 86],[117, 76],[119, 127],[100, 137],[151, 115],[84, 98],[158, 190],[81, 171],[86, 97],
[92, 154],[160, 188],[92, 123],[77, 120],[154, 115],[175, 189],[81, 169],[169, 89],[138, 158],[101, 172],
[87, 164],[111, 177],[148, 178],[180, 157],[150, 92],[94, 185],[178, 104],[140, 152],[112, 71],[160, 90],
[96, 125],[173, 104],[132, 132],[137, 72],[73, 153],[119, 109],[90, 136],[122, 81],[72, 189],[159, 135],
[121, 131],[77, 99],[129, 119],[82, 181],[88, 188],[129, 91],[122, 140],[140, 161],[175, 132]]

}, {'name': 'Asian',
'color': 'yellow',
'data':[[151, 177],[146, 113],[157, 179],[150, 127],[141, 139],[168, 159],[119, 126],
[130, 165],[90, 149],[142, 105],[78, 77],[127, 118],[170, 98],[152, 172],[143, 132],[82, 181],
[93, 74],[147, 88],[121, 73],[131, 179],[165, 154],[98, 116],[87, 187],[120, 99],[149, 81],[102, 136],
[77, 175],[119, 189],[112, 88],[72, 121],[149, 107],[94, 89],[179, 131],[161, 171],[173, 128]
,[111, 136],[72, 164],[124, 121],[108, 82],[107, 85],[150, 103],[129, 147],[161, 180],[104, 153],
[119, 169],[146, 135],[102, 141],[142, 90],[135, 132],[160, 104],[125, 77],[92, 105],[126, 188],
[160, 123],[75, 184],[74, 187],[111, 143],[98, 145],[86, 102],[85, 149],[145, 150],[74, 122],[132, 141],
[89, 159],[177, 90],[134, 153],[172, 127],[106, 108],[85, 142],[118, 159],[128, 170],[76, 81],[114, 187],
[129, 168],[89, 157],[79, 121],[154, 97],[158, 183],[137, 116],[175, 152],[91, 96],[92, 144],[151, 85]
,[146, 177],[133, 110],[71, 96],[148, 82],[91, 184],[92, 129],[103, 125],[92, 145],[81, 82],[100, 165],
[139, 155],[168, 91],[114, 127],[154, 91],[153, 113],[84, 117],[111, 100],[129, 122],[159, 106],
[173, 109],[109, 136],[154, 162],[83, 98],[124, 150],[171, 145],[169, 76],[160, 142],[95, 130],
[120, 170],[161, 84],[159, 140],[167, 98],[133, 84],[176, 183],[172, 80],[127, 166],[162, 140],[103, 75],
[154, 96],[168, 124],[161, 79],[155, 126],[98, 153],[75, 135],[83, 157],[121, 150],[105, 154],[84, 180],
[87, 121],[76, 136],[102, 189],[71, 149],[71, 144],[140, 177],[120, 82],[75, 70],[149, 149],[134, 179],
[78, 127],[82, 112],[112, 185],[124, 137],[179, 91],[71, 124],[103, 172],[118, 176],[77, 166],[85, 106],
[152, 153],[101, 174],[174, 111],[94, 95],[97, 167],[163, 154],[146, 110],[76, 185],[77, 183],[152, 135],
[168, 161],[168, 156],[106, 165],[100, 81],[155, 167],[106, 161],[146, 118],[93, 184],[102, 79],[144, 106],
[135, 188],[99, 150],[73, 128],[138, 139],[81, 72],[140, 147],[112, 127],[87, 94],[174, 139],[77, 130],
[131, 95],[135, 111],[127, 179],[79, 162],[131, 109],[108, 143],[109, 92],[108, 158],[110, 102],[79, 149],
[92, 141],[86, 190],[71, 99],[129, 108],[123, 116],[89, 86],[132, 181],[137, 190],[132, 143]]

}, {
'name': 'Hispanic',
'color': 'green',
'data': [[92, 115],[136, 109],[80, 74],[135, 95],[126, 132],[163, 110],[73, 144],[154, 74],[150, 154],
[178, 168],[99, 148],[116, 143],[95, 171],[117, 90],[119, 170],[133, 156],[93, 137],[102, 148],[118, 155],
[154, 89],[161, 78],[98, 104],[153, 156],[70, 130],[76, 141],[125, 82],[169, 180],[158, 142],[110, 108],[71, 136],
[168, 155],[145, 96],[167, 160],[85, 172],[115, 84],[165, 81],[123, 184],[132, 175],[110, 168],[173, 133],[94, 127],
[81, 82],[171, 132],[96, 121],[75, 105],[140, 151],[83, 169],[118, 159],[155, 130],[180, 142],[171, 70],[172, 87],
[164, 133],[71, 83],[163, 118],[160, 112],[152, 78],[115, 83],[158, 105],[103, 167],[109, 121],[151, 147],[83, 72],
[169, 103],[130, 110],[171, 141],[86, 76],[82, 186],[163, 80],[162, 147],[108, 188],[152, 158],[146, 176],[139, 107],
[109, 153],[114, 138],[119, 172],[109, 104],[99, 87],[104, 109],[88, 189],[73, 95],[138, 134],[109, 101],[179, 185],
[105, 129],[140, 85],[133, 98],[157, 165],[152, 159],[179, 154],[175, 165],[119, 187],[70, 156],[87, 184],[73, 181],
[165, 131],[146, 114],[177, 176],[100, 106],[140, 101],[168, 109],[95, 72],[137, 124],[160, 182],[121, 142],[154, 128],
[156, 183],[99, 149],[132, 78],[77, 110],[108, 83],[110, 70],[166, 125],[150, 115],[83, 88],[81, 176],[155, 112],[119, 70],
[102, 158],[108, 147],[169, 153],[135, 121],[143, 93],[134, 128],[167, 96],[140, 138],[88, 146],[76, 157],[176, 91],[170, 108],
[79, 158],[148, 75],[145, 138],[82, 186],[102, 118],[96, 146],[162, 119],[76, 138],[129, 145],[116, 103],[89, 137],[169, 73],[118, 144],
[96, 155],[133, 164],[168, 138],[154, 110],[173, 80],[125, 164],[85, 94],[142, 182],[91, 183],[81, 135],[116, 180],[149, 119],[168, 110],
[103, 110],[113, 181],[95, 184],[134, 80],[104, 71],[78, 125],[103, 127],[139, 81],[115, 181],[127, 111],[91, 146],[77, 161],[80, 143],
[135, 86],[156, 155],[171, 167],[101, 184],[121, 75],[79, 157],[90, 180],[117, 167],[147, 78],[145, 157],[114, 141],[141, 134],[122, 147],
[156, 177],[177, 83],[180, 145],[122, 106],[100, 147],[155, 72],[85, 81],[90, 122],[107, 161],[73, 168],[100, 104],[117, 82],[153, 71],[88, 74],
[171, 117],[83, 185],[125, 136]]
}]
})
```
The code above shows the relation between weight and height using a sample of 600 individuals of different races.

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
The implementation of the above steps should assist you in achieving the tutorial's objective. 
[Here](https://github.com/ayodele96/brython) is the link to the repository containing the code snippets.
