---
layout: engineering-education
status: publish
published: true
url: /maps-api-in-a-webpage/
title: Using Maps, Places, and Directions APIs
description: This article will illustrate how to use Maps, Places and Directions APIs in a website to show location, direction and distance between two points.
author: mercy-meave
date: 2021-08-18T00:00:00-05:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/maps-api-in-a-webpage/hero.jpg
    alt: Maps API in a website hero image
---
Google Maps API is a web mapping API that allows developers to easily add a map in a website. The API provides satellite views, streets view, aerial photography, and street maps.
<!--more-->
This API is used to locate places such as businesses, sports grounds, roads, and streets. What is more interesting is the ability to combine the Directions and Places APIs with the Google Maps API.

The three, when used together, can provide a useful application whereby a user can navigate, find directions, and estimate distances on a webpage. These are some of the functions that when embedded in a website could increase the usability of the web application.

### Table of content
- [Goal of the project](#project-goal)
- [File and Folder organization](#project-files-and-folder-organization)
- [Setting up the project API - Key](#setting-up-the-api-key)
- [Working on the user interface](#webpage-design)
- [Bringing the API Key](#bringing-the-api-key)
- [The JavaScript Driver code](#coding-the-javascript-functions)
- [Conclusion](#conclusion)

### Project goal
The sole purpose of this project is to enable the reader to understand the core functionalities and applications of various APIs used with Google Maps.

We will create a webpage that displays a map, gives a user two input fields with place autocomplete; a starting point and a destination, calculates the distance between them, and display the shortest path between the two locations.

### Project files and folder organization
We will create one folder called `resource`. In this folder, we will store our bootstrap file.

Next, we will create three files named `index.html`, `style.css` and `app.js`. The `index.html` will contain our frontend components.

The `style.css` will contain the styling of our webpage while the `app.js` will have driver code for the implementation of the APIs.

### Setting up the API Key
We need an API key for each of the modules we are going to use. However, if we create a single project in Google Console and add the APIs, we can use several APIs using a single key.

To set up the API Key:
1. Head over to [Google Console](https://console.cloud.google.com/)
2. Create a new project, then give it a name.
3. Select the project and select `APIs and Services`.
4. Click on `ENABLE APIS AND SERVICES`.
5. In the APIs library, enable the `Directions API`, `Distance Matrix API`, `Places API`, and `MapsJavascript API`.
6. Next, we need to create an `API-Key`. In the dashboard, go to the `APIs & Services` screen.
7. Under the credentials screen, click `CREATE CREDENTIALS`, then copy the created API key.

### Webpage design
In this section, we will create the webpage where our app will display the map.

We will have a form with two input fields. One field will be where one enters the start point, and the second for the desired destination.

In the `index.html` file, add the snippets below:

```html
<form class="form-horizontal">
	<div class="form-group">
		<label for="from" class="col-xs-2 control-label"
			><i class="far fa-dot-circle"></i
		></label>
		<div class="col-xs-4">
			<input
				type="text"
				id="origin"
				placeholder="Origin"
				class="form-control"
			/>
		</div>
	</div>
	<div class="form-group">
		<label for="to" class="col-xs-2 control-label"
			><i class="fas fa-map-marker-alt"></i
		></label>
		<div class="col-xs-4">
			<input
				type="text"
				id="destination"
				placeholder="Destination"
				class="form-control"
			/>
		</div>
	</div>
</form>
```

Next, we will have a button that calls a function to calculate the driving distance between the two places.

With the same function, we will estimate the time to travel the calculated distance and draw the shortest path on the map from the starting point to the destination.

```html
<div class="col-xs-offset-2 col-xs-10">
	<button class="btn btn-success btn-lg " onclick="calculateDistance();">
		<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
	</button>
</div>
```

Lastly, we will have the map displayed on the webpage and the function's below the map.

```html
<div class="container-fluid">
	<div id="googleMap"></div>
	<div id="output"></div>
</div>
```

### Bringing the API Key
We need to bring the API key we generated from Google Cloud Console to enable our project access to Google Maps and other map services.

Paste the copied `API Key` into a script tag just below the closing body tag as shown below:

```html
<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=YOUR API KEY"></script>
```

### Coding the JavaScript functions
Now we want to create functions that will make the activities described work.

Create a new file named `app.js` in the same folder and the `index.html` file.

Link the two files by adding the snippets below before the closing `body` tag.

```html
<script src="app.js"></script>
```

### Setting the Map location
Google Maps covers the whole world. For this reason, we cannot display it on a single webpage. We need to choose a small Geographical location where our map will show.

My map covers the area around Nairobi, Kenya. I chose this location because it is where I live, and I am familiar with the towns and cities around the area.

To choose a location, ensure you know the latitude and longitudes where the location lies, then change them appropriately in the snippets below:

```js
//set map options
var myLatLng = { lat: 1.2921, lng: 36.8219 };
var mapOptions = {
	center: myLatLng,
	zoom: 7,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
};
```

I also set the level of `zoom` and `maptype` in the script. Map type specifies whether you want your map to show geographical features or roads. I chose `ROADMAP` to show the roads on the map.

### Creating the map on the webpage
In our `index.html` file, we gave some `div` element and `id=googleMap`. To render the created map in the same `div` tag, add the snippets below in the `app.js` file:

```js
//create map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
```

![Map on webpage](/engineering-education/maps-api-in-a-webpage/project.jpg)

### Using the directions service
The direction service is responsible for giving the direction from one point to another on the map.

First, we need to call the service from Google using the snippet below:

```js
/**
 * Direction service object
 */
var directionsService = new google.maps.DirectionsService();
```

Next, we need to render the direction on the same map object that we created before.

We call the `DirectionsRenderer()` that will show the path on the map, then specify it to render it on our map using the `setMap(map)` method.

```js
/**
 * Render the direction object
 */
var directionsDisplay = new google.maps.DirectionsRenderer();

/**
 * Display the directions on the map by binding the directions service to the map service
 */
directionsDisplay.setMap(map);
```

### Autocomplete of cities
The autocomplete feature enables the map to autocomplete places as users type them in real-time. We use Places API to enable the autocomplete feature.

To add autocompletion of cities, we need to bring the inputs and then limit Google to show city names in a given country by specifying the country in the options object as shown below:

```js
/**
 * Adding autocomplete feature for cities
 */
var options = {
	types: ["(cities)"],
	componentRestrictions: { country: "ke" },
};

var input1 = document.getElementById("origin");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("destination");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
```

![autocomlete of cities](/engineering-education/maps-api-in-a-webpage/autocomplete.jpg)

Lastly, we need to remove the dropdown list of cities after a given city is chosen.

Use the snippet below:

```js
google.maps.event.removeListener(autocomplete1);
google.maps.event.removeListener(autocomplete2);
```

### Calculation of distance between cities
At this point, we can display a map on our webpage and render the direction from the origin to destination.

Next, we need to calculate the distance from the origin to the destination and estimate the time to drive that distance.

We will begin by requesting with our `origin`, `destination`, and the traveling mode, which in our case is `DRIVNG`.

```js
/**
 * Creating a new request
 */
var request = {
	origin: document.getElementById("origin").value,
	destination: document.getElementById("destination").value,
	travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
	unitSystem: google.maps.UnitSystem.IMPERIAL,
};
```

Next, we will pass the request to the `route()` method of the `DirectionsService()`, which checks if the direction is available.

If the requested direction is available, the function calculates the distance between the origin and destination and stores the obtained path in the `result` parameter.

If the direction is not available, the function eliminates the route from the map.

The map gets re-centered to the current location, and the function returns an error message showing the user that it did not obtain the direction requested.

```js
function calculateDistance(){
   /**
   * Creating a new request
   */
   var request = {
     origin: document.getElementById("origin").value,
     destination: document.getElementById("destination").value,
     travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
     unitSystem: google.maps.UnitSystem.IMPERIAL
   }

   /**
   * Pass the created request to the route method
   */

   directionsService.route(request, function (result, status) {
     if (status == google.maps.DirectionsStatus.OK) {

       /**
       * Get distance and time, then display on the map
       */
       const output = document.querySelector('#output');
       output.innerHTML = "<p class='alert-success'>From:
       " + document.getElementById("origin").value + "</br>" +"
       To: " + document.getElementById("destination").value +
       "</br>"+"Driving distance <i class='fas fa-road'></i> : " +
        result.routes[0].legs[0].distance.text +"</br>"+
        " Duration <i class='fas fa-clock'></i> : " +
        result.routes[0].legs[0].duration.text + ".</p>";

       /**
       * Display the obtained route
       */
       directionsDisplay.setDirections(result);
     } else {
       /**
       * Eliminate route from the map
       */
       directionsDisplay.setDirections({ routes: [] });

       /**
       * Centre the map to my current location
       */
       map.setCenter(myLatLng);

       /**
       * show error message in case there is any
       */
       output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
     }
   });
}
```

![Finding Directions on Map](/engineering-education/maps-api-in-a-webpage/direction.jpg)

### Conclusion
In this article, we learn how to use three different Maps APIs in a single project.

We built a webpage, implemented Place autocomplete that fills places in a given map, and used Directions API to draw a direction between two locations on a Map.

We also used the API to calculate the distance between two different places and the estimated time to cover the estimated distance.

You can find the code for the project [here](https://github.com/mercymeave/maps).

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
