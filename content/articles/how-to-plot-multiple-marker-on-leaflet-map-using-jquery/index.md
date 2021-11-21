---
layout: engineering-education
status: publish
published: true
url: /how-to-plot-multiple-marker-on-leaflet-map-using-jquery/
title: How to Plot Multiple Markers on Leaflet Map using Jquery
description: This tutorial will show the reader how to plot multiple markers on specific locations on a leaflet map using Leaflet.js.
author: femi-ige-muyiwa-oladele
date: 2021-11-21T00:00:00-16:05
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/hero.jpg
    alt: How to plot multiple markers on leaflet map using jquery Hero Image
---
Markers are geospatial tools used to point or show the location of the desired object, given a Geographic Coordinate System (GCS). A GCS is a coordinate system associated with positions on earth. The latitude and longitude are types of geographic coordinates systems. Easting and northing are grid systems which are types of geographic coordinate systems. 
<!--more-->
Leaflet.js has made it easier to plot markers on specific locations using a simple line of code. With jquery and a simple front-end modal, we can take it a step higher. 

We will show you how to build an input box to fill in these coordinates and render them on a map. Have geojson instead?, we will guide you on the process of uploading JSON files to your map.

Let's get on with it then! 

### Prerequisites
A reader should have prior knowledge about the following:
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML). 
- [CSS](https://developer.mozilla.org/en-US/docs/Web/css). 
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/). 
- [Leaflet Basics](/engineering-education/building-simple-maps-using-leaflet-js/). 
- [Visual studio code](https://code.visualstudio.com/download). 
- [Sublime text](https://www.sublimetext.com/3). 

### Goal
In this guide, we will show readers three ways to plot multiple markers on a leaflet map. 

At the end of the tutorial, the reader should be able to:
- Add a tile layer.
- Plot markers in their code with geojson using leaflet.
- Upload geojson marker file to the map on the front end.
- Plot markers as an input on the front end using jquery.

### Getting started
#### Adding a tile layer
To get started, we will initialize our HTML5 boilerplate and import leaflet.js JavaScript and CSS files using a content delivery network (CDN). [Here](https://leafletjs.com/download.html) is a link to download leaflet's JavaScript and CSS file. 

The reader should go through this [documentation](/engineering-education/building-simple-maps-using-leaflet-js/) for a better understanding.

#### Example
```html
<html lang="en">

<head>
    <title>Multiple Markers</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />

</head>

<body>

</body>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>

</html>
```

Next, we will create a `style`, `div` and `script` tag within our HTML. The `div` will serve as a container for our map, so we'll give it an id name `map`. The `style` tag is to style our containers layout, while the `script` tag contains the JavaScript code for initializing our map.

We have an example shown below:

```html
<div id="map"></div>
```
```css
body {
    padding: 0;
    margin: 0;
}

#map {
    height: 100vh;
    width: 100%;
}
```

```javascript
var map = L.map('map').setView([9.0820, 8.6753], 7)
L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
```

All this brought together and we should have our baselayer (OSM layer) ready as shown below:

![Baselayer](/engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/base-layer.jpg)

#### Plotting markers with geojson using leaflet
According to Wikipedia, "GeoJSON is an open standard format designed for representing simple geographical features, along with their non-spatial attributes. It is based on the JSON format". 

Websites like [geojson.io](https://geojson.io/#map=2/20.0/0.0) have simplified getting your desired format of geographic JSON data. Leaflet has made it easier to render this data on a map using a small line of code. 
 
First, we'll have to import the JSON file. Importing a JSON file into JavaScript is done in various ways but for this section, we'll have to copy out its content and paste it within a given JavaScript variable. 

We have taken the liberty of getting a geojson with marker features to be used in the example below:

```javascript
var sample_json = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.778320312499999,
                    7.557417356841308
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.943115234375001,
                    7.801090616449597
                ]
            }
        }
    ]
}
```

And we add it to the map using the code below:

```js
L.geoJSON(sample_json).addTo(map);
```

Adding all these features together, we should have the following:

![geojson leaflet](/engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/geo-json-leaflet.jpg)

#### Plotting markers with geojson using file upload and leaflet
There is some similarity between this section and the last. The difference is while we added JSON as a JavaScript variable previously, it will be uploaded as a file on the front-end here. With the `json.parse()` method, we will parse a json string as a javascript object. 

To get started, we will create a file upload and submit button:

```html
<nav class="navbar navbar-inverse">
    <div class="conatiner-fluid">
        <form method="post" enctype="multipart/form-data">
            <div class="form-group form-inline">
                <input class="form-control" name="files[]" type="file" accept=".json">
                <input class="btn btn-primary" type="submit" value="Upload File" name="submit">
            </div>
        </form>
    </div>
</nav>
```

>Note: We used bootstrap 5 for the design.

We should have something like this at the moment:

![file upload navbar](/engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/file-upload-navbar.jpg)

We'll need to grab the form and input field and listen to the submit event. If we click the submit button, we'll need a function to handle it. In cases when no file is in the upload area and we click the submit button, `event.preventDefault()` method prevents any action from being taken. Next, we'll create a new file reader object and a call back event when the file has been read. 

We have an example of such implementation below:

```javascript
let form = document.querySelector('#upload');
let file = document.querySelector('#file');
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    if (!file.value.length) return;
    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsText(file.files[0]);
}
```

Once this is done, we'll create a function `logfile` (call back event). There, we'll get the result (data) of the file and parse it as a JavaScript object which is added to the map.

```javascript
let json = null;
function logFile(event) {
    let str = event.target.result;
    json = JSON.parse(str);
    let geo = L.geoJSON(json).addTo(map);
}
```

Our result should be as follows:

![geojson file upload](/engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/geo-json-file-upload.jpg)

#### Plot markers as an input using jquery
To get started, we'll import jquery's JavaScript file using a content delivery network.

```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

Next, we'll create a modal embedded in a button. This modal will have the latitude and longitude inputs, add and delete row button and the visualize button for displaying the inputted coordinates.

```html
<button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Add Coordinate</button>

<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Add Coordinate</h4>
            </div>
            <div class="modal-body">
                <div class="container">
                    <br />
                    <form>
                        <button type="button" onclick="addRow('dataTable')" class="btn btn-success btn-sm"> Add row </button>
                        <button type="button" onclick="deleteRow('dataTable')" class="btn btn-danger btn-sm">
                            Delete Row</button>
                        <br /><br />
                        <table>
                            <tr>
                                <th># &nbsp; </th>
                                <th>Latitude </th>
                                <th>Longitude</th>
                            </tr>
                            <tbody id="dataTable" width="350px" border="1">
                                <tr>
                                    <td><input type="checkbox" name="chk[]" id="chk_1" /></td>
                                    <td><input type="number" name="lat[]" id="lat_1"
                                            placeholder="Latitude" class="form-control lat_1" />
                                    </td>
                                    <td><input type="number" name="lng[]" id="lng_1"
                                            placeholder="Longitude" class="form-control lng_1" />
                                    </td>
                                </tr>
                            </tbody>
                            <input type="hidden" name="count" id="count" value="1">
                            <tr>
                                <td colspan="5">&nbsp;</td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal"
                    onclick="getInputValue();">Visualise</button>
            </div>
        </div>
    </div>
</div>
```

When implemented, we should have the following:

![modal button](/engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/modal-button.jpg)

![modal pop up](/engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/modal-popup.jpg)

To give the modal functionalities, we will use the jquery code below:

```javascript
function addRow(tableID) {
    var table = document.getElementById(tableID);
    var count = document.getElementById('count').value;
    //alert(count);
    var c = parseInt(count) + parseInt(1);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var colCount = table.rows[0].cells.length;
    for (var i = 0; i < colCount; i++) {
        var newcell = row.insertCell(i);
        newcell.innerHTML = table.rows[0].cells[i].innerHTML;
        switch (newcell.childNodes[0].type) {
            case "text": newcell.childNodes[0].value = "";
                var node_id = newcell.childNodes[0].id;
                var node_id_arr = node_id.split('_');
                newcell.childNodes[0].id = node_id_arr[0] + '_' + c;
                break;
            case "checkbox": newcell.childNodes[0].checked = false;
                var node_id = newcell.childNodes[0].id;
                var node_id_arr = node_id.split('_');
                newcell.childNodes[0].id = node_id_arr[0] + '_' + c;
                break;
        }
        $('#count').val(c);
    }
}
function deleteRow(tableID) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;
        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            var ids = row.cells[0].childNodes[0].id;
            if (null != chkbox && true == chkbox.checked) {
                var count = document.getElementById('count').value;
                var c = parseInt(count) - parseInt(1);
                if (rowCount <= 1) {
                    alert("Cannot delete all the rows.");
                    break;
                }
                table.deleteRow(i);
                rowCount--;
                i--;
                $('#count').val(c);
            }
        }
    }
    catch (e) {
        alert(e);
    }
}
```

We'll have the following:

![modal add](/engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/modal-add.jpg)

We are left with sending the coordinates to the map. To do this, we will be making use of for loops to load each filled row and plot the coordinates on the map. 

We have an example of such implementation below:

```javascript
function getInputValue() {
    // Selecting the input element and get its value 
    var inputVal_lat = document.getElementsByClassName("lat_1");
    var inputVal_lng = document.getElementsByClassName("lng_1");
    var visualmarker;

    for (let i = 0; i < inputVal_lat.length; i++) {
        visualmarker = L.marker([inputVal_lat[i].value, inputVal_lng[i].value]);
        visualmarker.addTo(map);    
    }
}
```

When we bring all this individual features together, we should have:
```html
<html lang="en">
<head>
    <title>Multiple Marker</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="src/index.css">
</head>

<body>
    <nav class="navbar navbar-inverse">
        <div class="conatiner-fluid">
            <form id="upload" method="post" enctype="multipart/form-data">
                <div class="form-group form-inline">
                    <input class="form-control" id="file" name="files" type="file" accept=".json">
                    <button class="btn btn-primary">Upload</button>

                    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Add Coordinate</button>

                    <!-- Modal -->
                    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">

                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Add Coordinate</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="container">
                                        <br />
                                        <form>
                                            <button type="button" onclick="addRow('dataTable')" class="btn btn-success btn-sm"> Add row </button>
                                            <button type="button" onclick="deleteRow('dataTable')" class="btn btn-danger btn-sm">
                                                Delete Row</button>
                                            <br /><br />
                                            <table>
                                                <tr>
                                                    <th># &nbsp; </th>
                                                    <th>Latitude </th>
                                                    <th>Longitude</th>
                                                </tr>
                                                <tbody id="dataTable" width="350px" border="1">
                                                    <tr>
                                                        <td><input type="checkbox" name="chk[]" id="chk_1" /></td>
                                                        <td><input type="number" name="lat[]" id="lat_1"
                                                                placeholder="Latitude" class="form-control lat_1" />
                                                        </td>
                                                        <td><input type="number" name="lng[]" id="lng_1"
                                                                placeholder="Longitude" class="form-control lng_1" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <input type="hidden" name="count" id="count" value="1">
                                                <tr>
                                                    <td colspan="5">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </form>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button class="btn btn-primary" data-bs-dismiss="modal"
                                        onclick="getInputValue();">Visualise</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </nav>
    <div id="map"></div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
<script src="src/index.js"></script>
<script src="src/geojson.js"></script>
<script src="src/file-upload.js"></script>
<script src="src/multi-marker.js"></script>

</html>
```

The result of this is shown below:

![marker](/engineering-education/how-to-plot-multiple-marker-on-leaflet-map-using-jquery/marker.gif)

Please find the link to the entire code and source files [here](https://github.com/muyiwexy/plot-multiple-markers).

#### Conclusion
In conclusion, we learned how to add multiple markers using geojson, through file upload and with the use of a simple front-end modal, all with vanilla javascript, jquery, bootstrap and leaflet.js. 

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
