---
layout: engineering-education
status: publish
published: true
url: /place-locator-with-geojson/
title: Building a Place Locator using GeoJson and Javascript
description: This article will walk the reader through the use of GeoJson to build a place locator application using GeoJson, MongoDB, Mapbox and Javascript.
author: jamila-laureen
date: 2022-01-26T00:00:00-01:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/place-locator-with-geojson/hero.jpg
    alt: Place Locator using GeoJson and Javascript Hero Image
---
GeoJson is a conventional method of storing geographic points in a database using JavaScript Object Notation format. Being based on JSON, GeoJson easily integrates with JavaScript. In addition, GeoJson allows the encoding of Geographic features like Latitude, Longitude, line strings, and Polygons.
 <!--more-->
This article will walk the reader through the use of GeoJson to build a place locator application using Javascript. In the article, we will develop an application that adds a location to a MongoDB database, Geocodes it to obtain the latitude, longitude, and a readable address of the location then displays the latitudinal and longitudinal mapping of the locations on a map. 

This project explores several APIs that work together with GeoJson. The APIs used are Mapbox to render a map on a web page, mapquest to send location requests, and geocode the locations' names into matching latitudes and longitudes.

### Prerequisites
To follow along with this article, you need to have the following:
- A code editor. I prefer [VS Code](https://code.visualstudio.com/download) for its availability of helpful extensions for web development.
- Mapquest Account for the API Key.
- [Mapbox account](https://account.mapbox.com/) to have the mapquest API key.
- Understanding of Javascript.
- A working installation of Node.js.

### Project environmental setup
Run npm init -y to create an empty `package.json` file to get started. This file contains all the dependencies required to develop and run the application. It is essential to include the dependencies in this file so that when the project is executed anywhere apart from the local development environment, the user executes a single command to get the project running.

Next, execute the command below to install the required packages.

```bash
npm install express cors node-geocoder mongoose dotenv
```

After successfully installing the dependencies, we need to set up a mongo DB database for the project. One can follow these steps to set up a database and obtain a [connection URL](https://docs.mongodb.com/manual/reference/connection-string/) that he will use for the project.

In the next step, log in or create a new account with [Mapbox](https://www.mapbox.com/) to get an API key to generate a map on the project website. Then, the same procedure should be done with [Mapquest](https://developer.mapquest.com/user/me/apps). 

However, the key needs to be global with mapquest, while the Mapbox API key comes with a startup code that we will use in the JavaScript file in the website folder.

Both Mapbox and Mapquest are used to map location data and geocode place names to latitudes and longitudes, respectively. Mapquest ensures that given a place name, it returns all the information related to that place, including the formatted address, latitude, longitude, street name, zip code, and the country. However, we only need the latitude and longitude for our project to locate the place on a map provided by Mapbox.

### Folder organization
We are going to use the MVC development pattern. However, the size of the project will deviate from it a bit. Therefore, we will separate our models, controller, and routes into separate folders. Additionally, we will have a website folder that contains the files required to render the data on the user interface. Lastly, we will have a utility folder to contain the utility files required for the project. 

The final folder organization for the project is as shown below:

```bash
developer-locator
    ┣ config
    ┣ controllers
    ┣ models
    ┣ routes
    ┣ utilities
    ┣ website
    ┗ package.json
```

Each of the folders above will have files that we will discuss in a moment.

### Setting up the project server
Before setting up the server file, we need to store the global variables in a config file. So, create a new file named `config.env` and add the following snippet in the config folder.

```env
PORT=5000
MODE=development
MONGO_URI='YOUR MONGO URI'
PROVIDER=mapquest
GEOCODER_API_KEY='YOUR GEOCODER API KEY'
````

Create a new file called `server.js` in the application's root folder. This file will contain all the server configurations for a project ranging from the port to run on, the required dependencies, and global variables. Add the following snippet to the `server.js` file.

```js
const path = require('path');
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

///load environmental variables into the project
dotenv.config({ path: './config/config.env' });

//initialize the application
const app = express()

//uloading the bosy parser middleware
app.use(express.json())

//using cors
app.use(cors())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running in ${process.env.MODE} mode on port ${PORT}`);
})
```

### Setting the database connection
We need the database to store a developer's information, including the name, location, and date registered to the system. First, we need to set up a database connection to the remote mongo DB database that we created earlier. In the `config` folder, create a new file called `database.js` and at the snippet below:

```js
const mongoose = require('mongoose');

const connectDatabase = async() => {
    try {
        const connection = await mongoose.connect(YOUR MONGO URI, {
            useUnifiedTopology: true,
        });

        console.log(`Database connected to ${connection.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDatabase;
```

The next step is to load the database connection function in the server file. Then, add the following code snippet into the `server.js` file to facilitate the database connection.

```js
const connectDatabase = require('./config/database')

connectDatabase();
```

### Creating the developer model
A model is like a scaffolding that provides a way of representing data in the database. It specifies all the properties of a given data element and the data type of each property. 

We will store the developer's name, address, location,  and the date he is registered for our case. Create a file named `Developer.js` in the `models` folder. The following piece of code represents the schema for a developer. 

```js
const mongoose = require('mongoose');
const DeveloperSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please add developer name']
        },
        address: {
            type: String,
            required: [true, 'Please add developer address']
        },
        location: {
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            },
            readableAddress: String
        },
        dateRegistered: {
            type: Date,
            default: Date.now
        }
    }
);
```

After creating the developer schema, we need to add a middleware that picks up the location string provided by the user and geocodes it into latitude, longitude, and a readable address, which are then stored in the respective properties in the location object.

All these are done before the developer object is saved into the database. We also set `this.location` to undefined to prevent the geocoded location data from being saved into the database.

```js
//geocode and create location
DeveloperSchema.pre('save', async function(next){
    const locate = await geocoder.geocode(this.address);
    this.location = {
        type:  'Point',
        coordinates: [locate[0].latitude, locate[0].longitude],
        readableAddress: locate[0].formattedAddress
    }


    this.address = undefined;
    next();
});
```

For the middleware above to work, we need to add the geocoder utility, including the service provider and the API key. This utility is obtained from the `node-geocoder` dependency that we downloaded.

In the `utilities` folder, create a new file called `geocoder.js`, then add the following code snippet.

```js
const nodeGeocoder = require('node-geocoder');
const options = {
    provider: process.env.PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = nodeGeocoder(options);
module.exports = geocoder;
```


### Working on the controller
The controller determines how data is obtained and entered into the database. We will have two methods that do the functions, respectively. First, in the `controllers` folder, create a new file called `developer.js`, then add the code snippet below:


```js
const Developer = require('../models/Developer')

exports.getDevelopers = async (req, res, next) =>{
    try {
        const developers = await Developer.find();
        return res.status(200).json({
            data: developers
        })
    } catch (error) {
        res.status(500).json({
            error: error,
        })
    }
}


exports.addDeveloper = async (req, res, next) =>{
    try {
        const developer = await Developer.create(req.body);
        return res.status(200).json({
            data: developer
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}
```

### Passing the data to the router
Routing is necessary to specify where to channel a request and where the URL does the fetch data goes. Our route file took the functions from the controller and applied the necessary function depending on the request.

We will instantiate a router and pass the functions from the controller, then export the file to the server file, which is the applications entry point.

```js
const express = require('express')
const {getDevelopers, addDeveloper} = require('../controllers/developers')
const router = express.Router()
router.route('/').get(getDevelopers).post(addDeveloper);
module.exports = router
```

### Working on the website
Our website will have a title and a map area showing the developers available in a given locality. 

Additionally, we will have a form to add the developers to the system. The form will submit the data to invoke the `addDeveloper` function in the `controller` file.

Next, we have a JavaScript file that renders the Map on the browser. This code snippet is provided once you create the API key in Mapbox.

```js
mapboxgl.accessToken = 'yourmapboxapikey;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', //,ap style
    zoom: 9, //zoom level
    center: [ 36.82194619999996, -1.2920659] //the center of the map
})
```

The snippet specifies the zoom level, map style, and the center, which is chosen based on where you want to map out the developers.

### Getting developers and displaying them on the Map
In this step, we want to collect all the developers in the database then display them on the Map depending on the specific latitude and longitude. 

We first need a function that will fetch all the developers from the database. Next, we will convert the developers into an array that we modify to fit the style specified by Mapbox.

```js
async function getDevelopers() {
    const res = await fetch('/api/developers');
    const data = await res.json();


    const developers = data.data.map(developer => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [ 
                    developer.location.coordinates[0], //latitude
                    developer.location.coordinates[1] // longitude
                ]
            },
            properties: {
                name: developer.name, //developer name
                icon: 'house' //icon to display
            }
        };
    });
    
    loadMap(developers); //load map with developers
}
```

The following function loads the Map with the developers mapped into their respective latitudes and longitudes. Next, we pass the array of developers from the above function to the `loadMap()` function. We also set the icon size and added the developer name.

Lastly, we call the `getDevelopers` function, which calls the `loadMap` function.

```js
//Load map with devs
function loadMap(developers) {
    map.on('load', function() {
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: developers //add the develpers array
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{name}',
                'text-anchor': 'top'
            }
        });
    });
}

getDevelopers()
```

### Testing the application
To run the application, use `npm start` to start your server then head to the [localhost](http://localhost:5000/) on the port you specified in the `config.env` file to access your site.

Your site should be as below before adding the developers.
![Map without developers](/engineering-education/place-locator-with-geojson/empty-map.png)

However, after adding the developers, the Map should look as shown below:

![Map with developers](/engineering-education/place-locator-with-geojson/map-with-devs.png)

### Conclusion
This article covered how to use Mapbox with GeoJson to build an application that locates developers on a map. We explored how to geocode the location names into latitudes and longitudes that we then stored in a MongoDB database. 

The stored locations of the developers were then pinned onto the Map using Mapbox. Exploring GeoJson, Mapbox, and Mapquest in this project can be a great starting point for using maps and Geocoding.

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
