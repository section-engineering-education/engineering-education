---
layout: engineering-education
status: publish
published: true
url: /building-a-routing-service-using-mapquest-api/
title: Building a routing service using mapquest API
description: This tutorial will show the reader how to build a routing service using mapquest API.
author: femi-ige-muyiwa-oladele
date: 2022-01-10T00:00:00-12:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-routing-service-using-mapquest-api/hero.jpg
    alt: Building a routing service using mapquest API Hero Image
---
Routing is a focal point in the mapping space. Routing services are essential in apps like Jumia foods delivery system,  Google maps, and a host of location-based service companies.
<!--more-->
Routing in geography is taking a course from a designated starting point to a destination. We build routing services in JavaScript with some APIs or plugins such as the Google directions API, open street routing machine (OSRM), and our focal point in this article, the Mapquest directions API.

Mapquest created a plugin for leaflet maps to send a request to its direction API services, receive these results and display them on a map. This tutorial will guide you on how to execute this feature in your maps.

### Prerequisites
The reader is required to have a strong foundation in the following:
- HTML, CSS, JavaScript.
- The reader should have a Mapquest API key. [Here](https://developer.mapquest.com/) is a link to get started in creating your API key.

### Table of contents
- [Aim](#aim)
- [Getting started](#getting-started)
  - [Creating the input form](#creating-the-input-form)
  - [Adding a map layer](#adding-a-map-layer)
  - [Implementing the routing function](#implementing-the-routing-function)
- [Conclusion](#conclusion)

### Aim
At the end of the tutorial, the reader should be able to:
- Integrate Mapquest into their map.
- Use Mapquest routing API for leaflet.Js.
- Create a front-end input form for inputting our desired routing position.
- Clear form data by replacing the map layer `onload`.

### Getting started
We'll split this article into different components:
- Creating an input form.
- Adding a map layer.
- Implementing the routing function.

To begin, we'll create HTML, CSS, and JavaScript files. Then, we can go to our first section.

#### Creating the input form
After initializing our HTML boilerplate, we create a div tag with the class name, `formBlock`.

Then let's build an input form containing a form, input and, button tag. The form tag has an id `form` with the input tags having a class name of `input`.

The input form in this project is to accept our starting and endpoint (locations) for our routing processes.

Below is the code snippet explained above:

```HTML
<div class="formBlock">
    <form id="form">
        <input type="text" name="start" class="input" id="start" placeholder="Choose starting point" />
        <input type="text" name="end" class="input" id="destination" placeholder="Choose end point" />
        <button type="submit">Go</button>
    </form>
</div>
```

Add some styling to our input form above. In our CSS file, add the following:

```CSS

.formBlock {
    max-width: 300px;
    background-color: #FFF;
    border: 1px solid #ddd;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px;
    z-index: 999;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    border-radius: 5px;
    width: 100%;
}

.input {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    border: 1px solid #ddd;
    font-size: 15px;
    border-radius: 3px;
}

#form {
    padding: 0;
    margin: 0;
}

input:nth-child(1) {
    margin-bottom: 10px;
}

#button{
    display: none;
}
```

On the implementation of the above, we should have our input form as:

![input](/engineering-education/building-a-routing-service-using-mapquest-api/input-form.png)

#### Adding a map layer
Next, add the leaflet JavaScript and CSS file in our header through a CDN. Let's also include Mapquest and its leaflet routing plugin JavaScript file.

```HTML
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>
```

```HTML
<script src="https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key=QGer4kg9yzSEAajj53JtHB4ngaooYSVs"></script>
<script src="https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-routing.js?key=QGer4kg9yzSEAajj53JtHB4ngaooYSVs"></script>
```
> Note! You need a Mapquest API key to use the (Mapquest's) service.

Let's create a div with the id `map`. This div serves as a container for our map layer. Next, load the map layer by initializing our Mapquest API key and defining our map objects (center and zoom).

```JavaScript
// default map layer
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [9.0820, 8.6753],
    zoom: 8
});
```
To display the map, add the style below:

```CSS
#map {
    height:100vh;
    width: 100%;
    position: relative;
}
```
![map](/engineering-education/building-a-routing-service-using-mapquest-api/map.jpg)

The map looks good at the moment🚀! To move our zoom control add the styling:
```CSS
.leaflet-top .leaflet-control {
    margin-top: 180px;
}
```
#### Implementing the routing function
Before we do this, we need to create a submit event function. First, invoke a JavaScript function called `submitForm` with the argument event. Add a `preventDefault()` method to prevent submitting an empty form. Concurrently, add the `map.remove()` to remove the current map layer once we add a new input.

Next, with the `getElemenetById()` method, get each values inputted in our form. Add a callback function called `runDirection(start, end)` to send the values in our input forms.

```JavaScript
function submitForm(event) {
    event.preventDefault();

    map.remove();

    start = document.getElementById("start").value;
    end = document.getElementById("destination").value;

    runDirection(start, end);

    document.getElementById("form").reset();
}
```

Our routing function requires a new map layer once the form is submitted. We'll take the liberty of having our custom markers. Next, create a marker object for the starting and endpoint.

```JavaScript
function runDirection(start, end) {

    // recreating new map layer after removal
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [9.0820, 8.6753],
        zoom: 8
    });

    var direction = MQ.routing.directions();

    direction.route({
        locations: [
            start,
            end
        ]
    });


    MainRouteLayer = MQ.Routing.RouteLayer.extend({
        initstartmarker: (location) => {
            var icon1;
            var startmarker;

            icon1 = L.icon({
                iconUrl: 'red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            startmarker = L.marker(location.latLng, { icon: icon1 }).addTo(map);

            return startmarker;
        },

        initEndmarker: (location) => {
            var icon2;
            var endmarker;

            icon2 = L.icon({
                iconUrl: 'blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            endmarker = L.marker(location.latLng, { icon: icon2 }).addTo(map);

            return endmarker;
        }
    });

    map.addLayer(new MainRouteLayer({
        directions: direction,
        fitBounds: true
    }));
}
```
Finally, invoke our `addEventListener` method to submit the form result and our map should be as follows:

```JavaScript
const form = document.getElementById('form');

form.addEventListener('submit', submitForm);
```
Our final code should be as follows:

```html
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>
    <script src="https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key=QGer4kg9yzSEAajj53JtHB4ngaooYSVs"></script>
    <script
        src="https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-routing.js?key=QGer4kg9yzSEAajj53JtHB4ngaooYSVs"></script>
    <style>
        #map {
            height: 100vh;
            width: 100%;
            position: relative;
        }

        .formBlock {
            max-width: 300px;
            background-color: #FFF;
            border: 1px solid #ddd;
            position: absolute;
            top: 10px;
            left: 10px;
            padding: 10px;
            z-index: 999;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
            border-radius: 5px;
            width: 100%;
        }

        .input {
            box-sizing: border-box;
            padding: 10px;
            width: 100%;
            border: 1px solid #ddd;
            font-size: 15px;
            border-radius: 3px;
        }

        #form {
            padding: 0;
            margin: 0;
        }

        input:nth-child(1) {
            margin-bottom: 10px;
        }

        #button {
            display: none;
        }

        .leaflet-top .leaflet-control {
            margin-top: 180px;
        }
    </style>
</head>

<body>
    <div id="map"></div>
    <div class="formBlock">
        <form id="form">
            <input type="text" name="start" class="input" id="start" placeholder="Choose starting point" />
            <input type="text" name="end" class="input" id="destination" placeholder="Choose ending point" />
            <button id="button" type="submit">Go</button>
        </form>
    </div>
</body>
<script>
    // default map layer
    let map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [9.0820, 8.6753],
        zoom: 8
    });
    function runDirection(start, end) {

        // recreating new map layer after removal
        map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [9.0820, 8.6753],
            zoom: 8
        });

        var direction = MQ.routing.directions();

        direction.route({
            locations: [
                start,
                end
            ]
        });


        MainRouteLayer = MQ.Routing.RouteLayer.extend({
            initstartmarker: (location) => {
                var icon1;
                var startmarker;

                icon1 = L.icon({
                    iconUrl: 'red.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                startmarker = L.marker(location.latLng, { icon: icon1 }).addTo(map);

                return startmarker;
            },

            initEndmarker: (location) => {
                var icon2;
                var endmarker;

                icon2 = L.icon({
                    iconUrl: 'blue.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                endmarker = L.marker(location.latLng, { icon: icon2 }).addTo(map);

                return endmarker;
            }
        });

        map.addLayer(new MainRouteLayer({
            directions: direction,
            fitBounds: true
        }));
    }

    function submitForm(event) {
        event.preventDefault();

        map.remove();

        start = document.getElementById("start").value;
        end = document.getElementById("destination").value;

        runDirection(start, end);

        document.getElementById("form").reset();
    }
    const form = document.getElementById('form');

    form.addEventListener('submit', submitForm);
</script>

</html>
```
![final-result](/engineering-education/building-a-routing-service-using-mapquest-api/final.gif)

In the gif above, our map is being run by a live server. If you use `vscode`, you might be familiar with the live server extension used for launching static pages. It serves the page by creating a web address through a secure port. To install it, go to the extension tab on `vscode` and type `live server` on the search bar. It's that easy!

[Here](https://github.com/muyiwexy/mapquest-API) is a link to the Github repository.

### Conclusion
We have been able to create a map layer, an input form, and a routing function.

As we said earlier, several location routing services are implemented with leaflet, but the mapquest routing API is by far the easiest of them all.

But, easy doesn't mean the best. Thus, in my personal opinion, the open street routing machine (OSRM) is a good choice for more experienced programmers looking to build similar services in JavaScript.

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
