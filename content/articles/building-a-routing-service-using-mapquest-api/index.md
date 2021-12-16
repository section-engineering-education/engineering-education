 As simple as it sounds, routing has been a focal point in the mapping space. Companies like Amazon and location services like Google maps has made the need for a routing service more essential. Routing in geography is taking a course from a designated starting point to a destination.

Mapquest created a plugin for leaflet maps to send a request to its direction API services to receive the results and display them. We'll guide you on how to execute this feature in your maps.

### Prerequisites

The reader is required to have a strong foundation on the following:

- HTML, CSS, JavaScript.

- The reader should have their mapquest API key. [Here](https://developer.mapquest.com/) is the link to get started in creating your API key.

### Aim

At the end of the tutorial, the reader should be able to:
- Integrate mapquest into their map.
- Use Mapquest routing API for leaflet.Js.
- Create a front end to input their desired routing position.
- Clear form data by replacing the map layer on load.

### Getting Started

We'll split this article into different components beginning with:

- Creating an input form.

- Adding a map layer.

- Implementing the routing function.

To begin, we'll create HTML, CSS and JavaScript files. Then, we can go to our first section. Let's go!

#### Creating the input form

After initialising our HTML boilerplate, we'll create a div tag with the class name `formblock`. Then, we'll build an input form containing a form, input and, button tag. The form tag will have an id `form` with the input tags having a class name of `input`. The input form in this project is to input our starting and endpoint (locations) for our routing processes.

Below is an example of our explanation above:

```HTML
<div class="formBlock">
    <form id="form">
        <input type="text" name="start" class="input" id="start" placeholder="Choose starting point" />
        <input type="text" name="end" class="input" id="destination" placeholder="Choose starting point" />
        <button type="submit">Get Directions</button>
    </form>
</div>
```

We'll add some styling to our input form above. In our CSS file, we'll add the following:

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

![input](engineering-education/building-a-routing-service-using-mapquest-api/input-form.jpg)

#### Adding a map layer

Next, we'll add the leaflet JavaScript and CSS file through a content delivery network. We'll also add the mapquest and its leaflet routing plugin's JavaScript file.

```HTML
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>
```

```HTML
<script src="https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key=QGer4kg9yzSEAajj53JtHB4ngaooYSVs"></script>
<script src="https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-routing.js?key=QGer4kg9yzSEAajj53JtHB4ngaooYSVs"></script>
```
Note! the reader needs to have a mapquest API key.
We'll create a div with the id `map`. This div serves as a container for our map layer. Next, we will load our map layer by initialising our mapquest key and defining our map objects (centre and zoom).

#### Example
```JavaScript
// default map layer
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [9.0820, 8.6753],
    zoom: 8
});
```
To display our map, we'll add a simple styling to our map:
```CSS
#map {
    height:100vh;
    width: 100%;
    position: relative;
}
```
![map](engineering-education/building-a-routing-service-using-mapquest-api/map.jpg)

our map is looking good at the moment. To move our zoom control we'll add the styling;
```CSS
.leaflet-top .leaflet-control {
    margin-top: 180px;
}
```
#### Implementing the routing function
Before we get on with this, we'll need to create a submit event function. First, we'll create a function called `submitForm` with an argument `event`. We'll add a `preventDefault()` method to prevent us from submitting an empty form. Concurrently, we added the `map.remove()` to remove the current map layer once we add a new input.

Next, with the `getElemenetById()` method, we'll get each values inputted in our form. We'll also add a callback function called `runDirection(start, end)` to send the values in our input forms. Below is an example of these explanation:
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

For our routing function, we'll need to add a new map layer since the old map is removed once the form is submitted. We took the liberty of having our custom markers. Next, we'll create a marker object for the starting and endpoint. Below is the implementation of the routing function:
```JavaScript
function runDirection(start, end) {
    
    // recreating new map layer after removal
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [9.0820, 8.6753],
        zoom: 8
    });
    
    var dir = MQ.routing.directions();

    dir.route({
        locations: [
            start,
            end
        ]
    });


    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        },

        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        }
    });
    
    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    })); 
}
``` 
Finally, we'll add our addEventListener method to submit the form result and our map should be as follows:
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
            <input type="text" name="end" class="input" id="destination" placeholder="Choose starting point" />
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

        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                start,
                end
            ]
        });


        CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'red.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

                return marker;
            },

            createEndMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'blue.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

                return marker;
            }
        });

        map.addLayer(new CustomRouteLayer({
            directions: dir,
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
![final-result](engineering-education/building-a-routing-service-using-mapquest-api/final.gif)

### Conclusion
On careful implementation of the processes above, we have been able to create a map layer, an input form and a routing function.
[Here](https://github.com/muyiwexy/mapquest-API) is a link to the Github repository. Happy coding!
