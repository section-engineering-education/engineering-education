### Understanding how cluster markers work in web mapping using leaflet.js
 This is no fact again as we are all aware that BIG DATA is the keyword of the 21st century, and it's shocking to know that only a few people understand that a large part of data is categorized as geospatial. Nowadays nearly all of the gadgets we use are satellite-based systems like GPS. Today, the simplest case of displaying data/marker on a map with an acceptable user experience may be a real challenge especially for the user, they might find it difficult to understand or to analyze data at a particular zoom level. For instance, a platform that has users with hundreds of markers on the map. When you zoom out the map, these markers all overlap and make the map appear messy and crowded. To improve this kind of map, it is professional to use the marker clustering method, and this is the most efficient technique of grouping markers together.

### Prerequisites
To Understand this tutorial it is assumed that the reader knows the below technologies:
- JavaScript
- HTML/CSS
### Goal

At the end of this guide, we'll build a map with clustering features, and these features include:
- Leaflet map and its usage.
- Leaflet Marker Cluster with beautiful animation.
### Getting Started

Have you ever tried to visualize a large amount of data on the map? If so, using the normal method you will end up like this, lots of markers here and there.

![image info](engineering-education/understanding-how-cluster-marker-works/marker.png)

Instead of visualizing a map using the normal method, it is important to consider the usage of the Clustering method which is the most efficient way of mapping when it comes to visualizing big data. To achieve the clustering of markers, the usage of the leaflet-marker-cluster plugin is needed, So let get started. we need to initialize our map for data visualization, open any code editor and create an `index.html` file in a new project directory, then copy and paste snippet the below.

```html
<!DOCTYPE html>
<html>
    <head> <title>Marker Cluster</title>
    </head>
    <body> </body>
</html>
```
Initialize Leaflet JS CSS link inside the head tag by pasting below snippet.

```css
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
```

Insert the below snippet to the body tag.
```html
<div id="my_map">

</div>
```
To style the map container, create a style tag inside the head tag with the snippet below.

```html
<style> 
    #my_map{ height: 100vh; width: 100% }
</style>
```

Initialize Leaflet JS JavaScript link at the bottom of the body tag.

```html
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""> </script>
```

Changes won't affect yet on your browser, because we haven't initialized our map. To initialize, the map, set the map-view to Africa using Google Street Map. Create a script tag, copy and paste the snippet below tho the script tag.

### Initialization of Map

```js
var map = L.map('my_map').setView([9.1021, 18.2812], 3);
```

The code snippet above initiates the map variable into the map using the id of `my_app`, setting the `longitude - 9.1021`, `latitude - 18.2812`, and the zoom `level - 3`. To add an OpenStreetMap we'll make use of `Google Street Map`. 

Create another script tag and add the code below inside.

```js
var osm = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }); osm.addTo(map);
```

The script will look like this:

```js
<script type="text/javascript"> var map = L.map('my_map').setView([9.1021, 18.2812], 3); var osm = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }); osm.addTo(map); </script>
```

After adding the `OSM` you will see the output which will look like the image below, and still retain the zoom level we set to the map with the `longitude` and `latitude`.

![image info](engineering-education/understanding-how-cluster-marker-works/map.png)

### Adding Data To Map
Any kind of data can be added to the map. but for the sake of this tutorial, we'll use the data generated from [geojson](geojson.io). Below is the image of data generated from [geojson](geojson.io).

![image info](engineering-education/understanding-how-cluster-marker-works/data.png)

Save and download the file generated as a GeoJson file. Create a file naming it `mapdata.js` Inside the `mapdata.js` create a variable map_data setting the value to your downloaded generated data. To create the variable, copy and paste the snippet below.

```js
const map_data = {

}
```

Go to the file you just downloaded and copy all the data into the `mapdata.js` variable that is initialize 

## Visualize geojson data on your map
To render the generated data on the map, you have to link the data to the map.

```sh
<script src="./mapdata.js" type="text/javascript"></script>
```

If you check the browser, you will notice that there are no changes. To render the data on the map you have to load the geojson data using the snippet below:

```js
L.geoJSON(map_data).addTo(map);
```

i.e Load geojson data from `mapdata.js` with variable name `map_data` Your code should look like this:

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

On the browser, you should have something like this; 

![image info](engineering-education/understanding-how-cluster-marker-works/map-marker.png)

## Marker Styling
Here we want to represent each marker with a circle.
To achieve this copy and paste the snippet below to the code above the `geojson loader`.

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

For the marker styling to take effect, you must pass this parameter below into your geojson loader.

```js
{
pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, marker)
}
```

Your code should look like this:

```js
L.geoJSON(map_data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, marker)
    }
}).addTo(map);
```

Save to check changes, all your markers should be represented like this:

![image info](engineering-education/understanding-how-cluster-marker-works/marker-style.png)

To improve the readability of this map, that's where the marker cluster comes in.

### Clustering Marker
Whenever you are working on a project that has to do with a map, in which the map will be having multiple pointers, it's important to make sure the usage of marker clustering method in render data on the map.

To achieve clustering your markers, we'll use Leaflet JS Marker Plugin. You can download the plugin via this [link](https://github.com/Leaflet/Leaflet.markercluster). But we'll be using the CDN link to achieve our marker cluster, you can read more on marker cluster on [Leaflet.js](https://leafletjs.com/2012/08/20/guest-post-markerclusterer-0-1-released.html) website.

### Initiate Marker Cluster CSS & JS Link

```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css">
```

Insert Marker Cluster CSS link into the head tag.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js" type="text/javascript"></script>
```

Add this script inside the body tag. adding all the CSS and JS links above doesn't make any difference on the browser.

![image info](engineering-education/understanding-how-cluster-marker-works/marker-style.png)

### Leaflet Marker Cluster Usage
Declare a variable of `markerCluster` above the geojson loader in the script tag and set the value to L.markerClusterGroup() as seen below;

```js
var markerCluster = L.markerClusterGroup();
```

You have to add the above declaration `markerCluster` to the map layer as seen below;


Use this to render the Marker Cluster on the map.

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
    }).addTo(map);

map.addLayer(markerCluster);
```


### Conclusion
As we all know, in analyzing big data, you need a sophisticated tool like a marker cluster.
Which has been a very helpful tool when it comes to mapping-related projects. You can view the source code for this project [here](https://github.com/Adebogunabdulroheem/Cluster-Markers).

### Further Reading
[Leaflet Js](https://leafletjs.com/).
[Marker Cluster](https://leafletjs.com/2012/08/20/guest-post-markerclusterer-0-1-released.html).










