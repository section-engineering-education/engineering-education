### Understanding how cluster markers work in web mapping using leaflet.js
 Big data is the buzzword of the twenty-first century. Only a few people recognize that a major portion of the data is classified as geographical. Even the most basic scenario of showing data and markers on a map with a satisfactory user experience can be a major issue. The marker clustering method is recommended for improving this type of map.

### Requirements
It is assumed that the reader is familiar with the following technologies in order to understand this tutorial:
- HTML/CSS - JavaScript

### Objective
We'll create a map with clustering features at the end of this guide, which will include: - Leaflet map and its usage.
- A lovely animation of a Leaflet Marker Cluster.

### How to Get Started
Have you ever tried to use a map to view a vast amount of data? If you utilize the typical technique, you'll land up with something like this, with a bunch of marks thrown around.
![image info](engineering-education/understanding-how-cluster-marker-works/marker.png)

Create an `index.html` file in a new project directory with any code editor, then copy and paste the snippets below.

```html
<!DOCTYPE html>
<html>
  <head> <title>Marker Cluster</title>
  </head>
  <body> </body>
</html>
```
Paste the line below into the head tag to initialize the Leaflet JS CSS link.

```css
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
```
To the body tag, add the following snippet.
```html

<div id="my_map">
</div>
```
Create a style tag within the head tag with the snippet below to style the map container.

```html

<style>

  #my_map{ height: 100vh; width: 100% }

</style>
```

At the bottom of the body tag, create a Leaflet JS JavaScript link.

```html
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""> </script>
```

Make a script tag, then copy and paste the snippet below into it. Set the map-view to Africa using Google Street Map to get started. 
### Map initialization
```js
var map = L.map('my_map').
setView([9.1021, 18.2812], 3);
```
We'll utilize 'Google Street Map' to add an OpenStreetMap. The code snippet above loads the map variable into the map with the id'my app' and the values 'longitude - 9.1021', 'latitude - 18.2812', and zoom 'level - 3'.
Make a new script tag and paste the code below into it.

```js
var osm = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }); osm.addTo(map);
```

The script will look like this:

```js
<script type="text/javascript"> var map = L.map('my_map'). setView([9.1021, 18.2812], 3); var osm = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }); osm.addTo(map); </script>
```
After you've inserted the 'OSM,' you'll get an output similar to the one below, with the zoom level we set to the map and the 'longitude' and 'latitude' still intact.

![image info](engineering-education/understanding-how-cluster-marker-works/map.png)

### Adding Information To The Map
The map can be filled with any type of information. However, for the purposes of this lesson, we'll use the [geojson] data (geojson.io). The data created by [geojson] is shown in the image below (geojson.io).

![image info](engineering-education/understanding-how-cluster-marker-works/data.png)

Save and download the created GeoJson file. Create and save a file called `mapdata.js.` In mapdata.js, establish a variable called'map data' and assign the value to your downloaded produced data. To create the variable, copy and paste the code below.
```js
const map_data = {
}
```
Copy all of the data from the downloaded file into the `mapdata.js` variable that has been set up.
## Use your map to visualize geojson data
You must link the generated data to the map in order to render it on the map.
```html
<script src="./mapdata.js" type="text/javascript"></script>
```
If you check your browser, you'll note that nothing has changed, and you'll need to load the geojson data using the snippets below to render the data on the map:

```js
L.geoJSON(map_data).addTo(map);
```

i.e Load geojson data from `mapdata.js` using the `map data` variable. This is how your code should look:

```js
// Map Declearation
var map = L.map('my_map').setView([9.1021, 18.2812], 3);

var osm = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 50,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
osm.addTo(map);
//GeoJson Data
L.geoJSON(map_data).addTo(map);
```
Something like this should be in your browser;
![image info](engineering-education/understanding-how-cluster-marker-works/map-marker.png)
## Styling Using Markers
In this situation, each marker should be represented by a circle.
To do this, copy and paste the snippet below into the code above the `geojson loader.`
```js
var marker = {
  radius: 10,
  fillColor: "#6e2169",
  color: "#000",
  weight: 0.9,
  opacity: 0.9,
  fillopacity: 0.7
};
```
This argument must be passed into your geojson loader for the marker styling to work.
```js
{
pointToLayer: function (feature, latlng) {
  return L.circleMarker(latlng, marker)
}
```

This is how your code should look:

```js
L.geoJSON(map_data, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, marker)
  }
}).addTo(map);
```
Save and review your modifications; all of your markers should look like this:

![image info](engineering-education/understanding-how-cluster-marker-works/marker-style.png)

This is where the marker cluster comes in to help improve the map's legibility.

### Clustering Marker
When working on a project that includes a map with several pointers, it is more cost effective to employ the marker clustering approach.

We'll be using the CDN link to create our marker cluster; more information can be found on the [Leaflet.js](https://leafletjs.com/2012/08/20/guest-post-markerclusterer-0-1-released.html) website.

### Create a CSS & JS Link for the Marker Cluster

```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css">
```
In the head tag, add a Marker Cluster CSS link.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js" type="text/javascript">
</script>
```

This script must be inserted inside the body tag. Adding all of the CSS and JS links above has no impact on the browser.

[image info](engineering-education/understanding-how-cluster-marker-works/marker-style.png)

### How to Use a Leaflet Marker Cluster
Declare a variable called'markerCluster' above the geojson loader in the script tag, and set its value to L.markerClusterGroup(), as seen below.
```js
var markerCluster = L.markerClusterGroup();
```

As seen below, you must add the above declaration `markerCluster` to the map layer.


To render the Marker Cluster on the map, use this.
```js
map.addLayer(markerCluster);
```
Your Marker Cluster should be look like this;
```js
// Marker Cluster
var markerCluster = L.markerClusterGroup();

  // GeoJson Loader
  L.geoJSON(map_data, {
    pointToLayer: function (feature, latlng) {
      return markerCluster.addLayer(L.circleMarker(latlng, marker))
    }
  }).
  addTo(map);

map.addLayer(markerCluster);
```


### Endnotes
As we all know, evaluating massive data necessitates the use of a complex instrument such as a marker cluster, which has proven to be quite useful in mapping-related projects. This project's source code may be found at https://github.com/Adebogunabdulroheem/Cluster-Markers.

### Further Reading
[Leaflet Js](https://leafletjs.com/).
[Marker Cluster](https://leafletjs.com/2012/08/20/guest-post-markerclusterer-0-1-released.html).




