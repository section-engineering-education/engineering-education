### Introduction
Leaflet.js is an open-source JavaScript library used in building mobile-friendly and lightweight maps. Leaflet.js is easily used to create maps, also supports many plugins. It assists JavaScript developers in building web mapping and web-GIS functionalities. It also helps in making it easier to build geoportals and share maps all around the world.

This tutorial will show you how to build an easy and mobile-friendly map using the leaflet.js libraries.
### Prerequisite
To grasp this guide, the reader must have a level of knowledge on:
- JavaScript.
- HTML (Hypertext Markup Language).
- CSS (Cascading Style Sheet).
- Code editors like *visual studio code, sublime text*.
### Goal
In this guide, we will show you how to create an easy `OSM` map layer and plotting some markers on them. We will also add a simple layer control feature to add some swagger to the map layout. At the end of this guide, the reader should be able to:
- Integrate leaflet.js using its unique content delivery network (CDN).
- Create an easy `OSM` map layer.
- Plot markers on the map layer.
- Add a simple layer control.
### Setting up the environment
First, we will need to set up the environment. It means loading the leaflet JavaScript and CSS files into our project. We can do this in three ways:
- using Leaflet's unique CDN (Content delivery network).
- Using JavaScript package manager.
- And last, the conventional method of downloading both the Leaflet JavaScript and CSS file to your local storage.

But in this tutorial, we would deal alone with the first two.
### Using Leaflet's CDN 
The CDN is a hosted version of Leaflet, and to use it, place the content below in the `head` section of your HTML code:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
```
To avoid potential security problems, it is necessary we enable [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) when using Leaflet from a CDN.
```html
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
```
### Using the JavaScript package manager
If we are using the `npm` package manager, we can fetch a local copy of Leaflet by running:
```
npm install Leaflet
```
To use `npm`, we would need to follow the steps below:
- [Download and install node](https://nodejs.org/en/).
- run the following command:
```
npm install
```
Once completed, we can move on to the next stage.
### Getting Started
### Creating Map Container
In this guide, we will work with visual studio code. We would also integrate our leaflet using the CDN (content delivery network). We would start by creating an HTML file within our code editor. Then, we would initialize our HTML and, of course, add our CDN above to the code below:
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
</head>
<body>
    
</body>
</html>
```
We will create a div within the body and give it an id name called `map`. The div acts as a container for when we initialise the map.

```html
    <div id="map"></div>
```
Then we create a style tag with the div id's name and style with any choice of ours. In this tutorial, we will give it basic styling.
```CSS
<style>
    body {
        margin: 0;
        padding: 0;
    }

    #map {
        width: 100%;
        height: 100vh;
    }
</style>
```
At the moment, our code looks like this:
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        #map {
            width: 100%;
            height: 100vh;
        }
    </style>
</head>
<body>

    <div id="map"></div>
    
</body>
</html>
```

### Initialising and creating map layer
To initialise the map, we can check the leaflet documentation [here](https://leafletjs.com/reference-1.7.1.html). All we need to do is create a variable name called *map_init*.
```js
    var map_init = L.map('map',{
        center: [6.465422, 3.3792],
        zoom:8
    });
``` 
`L.map` represents a map object given the DOM ID of a `<div>` element. The value in the centre name are coordinates known as Latitude and Longitude. They are coordinate systems used in determining or describing any position or place on the earth surface.

Note: we used the div id name map to prevent errors like this.
 ```
 Uncaught Error: Map container not found.
```
We then add our map layer. We would use the OSM map layer but if you want to explore, you can check on other tile layers compatible with Leaflet [here](https://leaflet-extras.github.io/leaflet-providers/preview/).
```js
    var osm = L.tileLayer ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo (map_init);
```
`addTo` is a method used for adding data to a container. So, if you are planning on creating another tile layer, make sure you comment on the `addTo` method first and add it to your new tile layer. As we go on, we will learn how to put each tile layer in a layer controller. 

So let us continue.
### Adding marker
```js
    var marker = L.marker([9.0820, 8.6753]).addTo(map_init);
```
`L.marker` represents a marker objects given a coordinate (Longitude and Latitude). We can add as many as we want as long as we have a geographic point.

At the moment, we have been able to integrate leaflet.js using its unique content delivery network (CDN), create an easy osm map layer, plot markers on the map layer.

### Adding layer controller
To get this started, we create a variable name called *Basemaps* and another variable name called *Overlaymaps*. In the first variable, we create an object with key *"OSM"* and value *osm* (the variable name for our tile layer). In the second variable, we will do mostly the same as the first, but with different keys and values. The key is *"Marker"*, the value is *marker* (the variable name for our marker).

Example:
```js
var Basemaps = {
    "OSM": osm;
}
var Overlaymaps = {
    "Marker": marker;
}
L.control.layers(Basemaps, Overlaymaps).addTo(map_init);
```
Finally, we have our code as
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        #map {
            width: 100%;
            height: 100vh;
        }
    </style>
</head>
<body>

    <div id="map"></div>
    
</body>
<script>
    var map_init = L.map('map',{
        center: [6.465422, 3.3792],
        zoom:8
    });
    var osm = L.tileLayer ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo (map_init);
    var marker = L.marker([9.0820, 8.6753]).addTo(map_init);
    var Basemaps = {
        "OSM": osm
    }
    var Overlaymaps = {
        "Marker": marker
    }
    L.control.layers (Basemaps, Overlaymaps).addTo (map_init);
</script>
</html>
```
If we run the above HTML code in our browser, we would have our simple, lightweight web map like the image below.

![browser image](/Building-simple-and-interactive-maps-using-leaflet.js/mapimage.png)
### Conclusion
In conclusion, we learnt how to add tile layers, plot markers, create a layer control and bring all these components together to have a simple map, all with leaflet.js.
Link to [repo](https://github.com/muyiwexy/Leafletmap)
### Reference
-[Hero image](https://unsplash.com/photos/eyfMgGvo9PA)
### Further reading 
-[Go through the leaflet documentation](https://leafletjs.com/reference-1.7.1.html)