---
layout: engineering-education
status: publish
published: true
url: /building-simple-maps-using-leaflet-js/
title: Building Simple Maps using Leaflet.js
description: This tutorial will show you how to build an easy and mobile-friendly map using the leaflet.js library.
author: femi-ige-muyiwa-oladele
date: 2021-09-02T00:00:00-10:31
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-simple-maps-using-leaflet-js/hero.jpg
    alt: Building Simple Maps using Leaflet.js Example Image
---
Leaflet.js is an open-source JavaScript library used to build mobile-friendly and lightweight maps. Leaflet.js is easily used to create maps.
<!--more-->
The library also supports many plugins which include, base map providers, search and popups, and layer switching controls. 
It assists JavaScript developers in building web mapping and web-GIS functionalities.

Leaflet.js makes it easier to build geoportals such as the [Coordinate Reference Systems (CRS)](https://cran.r-project.org/web/packages/eRTG3D/vignettes/v6.html). 
It has been used to build web applications such as the [World Weather App](https://github.com/Christophler/EngHack2021-WorldWeatherApp), which is an app built for getting weather data in a specific location.

This tutorial will show you how to build an easy and mobile-friendly map using the leaflet.js library.

### Prerequisites
To follow this guide, the reader should understand:
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- [HTML (Hypertext Markup Language)](https://developer.mozilla.org/en-US/docs/Web/HTML).
- [CSS (Cascading Style Sheet)](https://developer.mozilla.org/en-US/docs/Web/css).
- Code editors like [*Visual studio code*](https://code.visualstudio.com/download), and [*Sublime text*](https://www.sublimetext.com/3).

### Goal
In a moment, we will guide you on how to create an easy `OSM` map layer using leaflet.js and how to plot markers on them. We will also add a simple layer control feature to add some sparkle to the map layout. At the end of this guide, the reader should be able to:

- Integrate leaflet.js using its unique content delivery network (CDN).
- Create an easy `OSM` map layer.
- Plot markers on the map layer.
- Add a simple layer control.

### Setting up the environment
First, we will need to set up the environment. This involves loading the leaflet JavaScript and CSS files into our project. We can do this in three ways:
- Using Leaflet's unique Content Delivery Network (CDN).
- Using JavaScript's package manager.
- And lastly, the conventional method of downloading both the Leaflet JavaScript and CSS file to your local storage.

But in this tutorial, we will only focus on the first two methods.

#### Using Leaflet's CDN 
The CDN is a hosted version of Leaflet. To use it, place the content below in the `head` section of your HTML code:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
```
To avoid potential security problems, it is necessary we enable the [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) security feature when using Leaflet from a CDN.

```html
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
```
#### Using the JavaScript package manager
If we are using the `npm` package manager, we can fetch a local copy of the leaflet by running:

```bash
npm install leaflet
```
To use `npm`, we would need to follow the steps below:
- [Download and install node](https://nodejs.org/en/).
- Run the following command:

```bash
npm install
```
Once completed, we can move on to the next stage.

### Getting Started
#### Creating Map Container
In this guide, we will work with the Visual Studio code. We would also integrate our leaflet using the CDN. We would start by creating an HTML file within our code editor. Then, we would initialize our HTML file, and add our CDN:

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
We will create a div within the body and give it an id name called `map`. The div acts as a container when we initialize the map.

```html
<div id="map"></div>
```
In the head section, we create a style tag with the div id's name and style it. You can style it in any way you want. In this tutorial, we will give it basic styling. It is important that when styling your map, the div id should have a defined height. Otherwise, the map won't show.

```css
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

#### Initializing and creating the map layer
To initialize the map, all we need to do is create a variable name called *map_init* and write the following code. For more information on initialization, you can check the leaflet documentation [here](https://leafletjs.com/reference-1.7.1.html). 

```js
var map_init = L.map('map',{
    center: [9.0820, 8.6753],
    zoom:8
});
``` 
`L.map` represents a map object given the DOM ID of a `<div>` element. The values in the center variable name are known as the `coordinates`. The values `9.0820` and `8.6753` represent the latitude and longitude, respectively. They are coordinate systems used in determining or describing any position or place on the earth's surface. 

In leaflet.js, the zoom level is as essential as the latitude and longitude. The zoom level determines the detail specifications. Meaning, lower zoom level shows the entire continent while higher zoom levels display details of a city. So we can use different zoom levels. It all depends on our focus at the moment.

> Note: We used the div id name `map` to prevent errors like this:
> ```bash
> Uncaught Error: Map container not found.
> ```

We then add our map layer using tiles. A tile is a map displayed in a web browser by seamlessly joining dozens of individually requested image or vector data files. We would use the OSM (Open Street Map) map layer because of its easily understandable structure and simplicity. If you want to explore more, you can check on other tile layers compatible with Leaflet [here](https://leaflet-extras.github.io/leaflet-providers/preview/).

```js
var osm = L.tileLayer ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo (map_init);
```

`addTo` is a method used for adding data to a container. So, if you are planning on creating another tile layer, make sure you comment on the `addTo` method first and add it to your new tile layer. As we go on, we will learn how to put each tile layer in a layer controller. 

So let us continue.

#### Adding markers
Markers are standard symbols used to mark a single location on the map. Let's use the code below to create a standard marker icon on the coordinates shown below:

```js
var marker = L.marker([9.0820, 8.6753]).addTo(map_init);
```
`L.marker` represents a marker object given a coordinate (longitude and latitude). We can add as many as we want as long as we have a geographic point.

For the markers, we can use a different icon. It is all based on preference. If you want to use another icon, you have to follow the steps below to create the icon:

```js   
var greenIcon = L.icon({
iconUrl: 'filename',
});
```
- To add the newly created `greenIcon` marker to the map, we type in the following:

```js
L.marker([9.0820, 8.6753],  {icon: greenIcon}).addTo(map_init)
```

Adding markers via coordinates is not the only spatial representation that is done using the leaflet library. Polygons, circles can also be done using a group of coordinates or coordinates. 

To add a polygon, copy the code below:
```js
var polygonPoints = [
    [37.786617, -122.404654],
    [37.797843, -122.407057],
    [37.798962, -122.398260],
    [37.794299, -122.395234]];
var poly = L.polygon(polygonPoints).addTo(map_init);
```

To add circles, you can copy the code below:
```js
var circle = L.circle([37.786542, -122.386022], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 50.0
}).addTo(map-init);
```
The key *color* with the value *red* determines the color of the circle. The key *fillOpacity* determines the transparency within the circle's border (the higher the opacity, the less transparent it is). The key *radius* determines the circumference of the circle (the higher the radius, the larger the circumference). 

At the moment, we have been able to integrate leaflet.js using its unique content delivery network (CDN), create an easy osm map layer, and plot markers on the map layer.

#### Adding layer controller
In this section, we will show you how to add a layer controller. Layer controllers are there to give your map an orderly look. It also gives you a choice to select which feature you would like to view at that moment. 

To get this started, we create a variable name called *Basemaps* and another variable name called *Overlaymaps*. In the first variable, we create an object with key *"OSM"* and value *osm* (the variable name for our tile layer). For the second variable, we will do mostly the same as the first, but with different keys and values. The key is *"Marker"*, the value is *marker* (the variable name for our marker).

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
Finally, we have our final code as follows:

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
        center: [9.0820, 8.6753],
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
If we run the above HTML code in our browser, we would have our simple, lightweight web map like the image shown below:

![browser image](/engineering-education/building-simple-maps-using-leaflet-js/mapimage.PNG)

The coordinates used are the absolute location of Nigeria. As we mentioned earlier, coordinates determine any position on the earth's surface. So, if you want to get the coordinates of any location, you can follow the steps below:

- On your computer, open [Google Maps](https://www.google.com/maps/). 
- Right-click on any place or area on the map.
- Select the latitude and longitude. The coordinates will automatically be copied.

### Conclusion
In conclusion, we learned how to add tile layers, plot markers,  plot polygons and circles, create a layer control, and bring all these components together to have a simple map, all with leaflet.js.

You can find the entire code [here](https://github.com/muyiwexy/Leafletmap).

### Further reading 
- [The Leaflet documentation](https://leafletjs.com/reference-1.7.1.html)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
