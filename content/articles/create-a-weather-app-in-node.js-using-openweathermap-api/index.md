Have you ever wanted to create a fully functional weather website in Node.js? Do you need an application that can show you weather forecasts instantly in clicks? If you are one of them, you are in the right place.
Weather forecasting is very necessary for our daily lives. It helps us to prepare and make plans depending on the expectations. In this tutorial, we will learn how to build a beautiful weather app using OpenWeatherMap API.

### Table of Contents

- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [Get the API Key](#get-the-api-key)
- [Setup the project](#setup-the-project)
  - [Folder Structure](#folder-structure)
  - [Install dependencies](#install-dependencies)
  - [package.json](#packagejson)
  - [server.js](#serverjs)
  - [index.ejs](#indexejs)
  - [style.css](#stylecss)
  - [.env](#env)
- [Run and access the application](#run-and-access-the-application)
- [Further projectsAPIs](#further-projectsapis)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways

At the tip of the tutorial, you would have known:

- What is OpenWeatherMap API
- How to work with OpenWeatherMap API to access data from the website
- Building a beautiful weather website using HTML, CSS, and JavaScript
- Integrating the API to the system
- Running the web Application

### Pre-requisites

Some basics needed for easy follow-up on this tutorial include:

- Basics in the web development process
- Basics on Node.js. If you don't have Node.js installed on your machine, you can download it from [here](https://nodejs.org/en/).
- An IDE is installed on the computer. I strongly recommend to those who don't have one, to download and install [Visual Studio Code](https://code.visualstudio.com/).
- A good and stable internet connection.

If you have all of the above, let's get into the steps to be followed to make a working project.

### Get the API Key

Visit [https://openweathermap.org/](https://openweathermap.org/ "https://openweathermap.org/") and create a new account or sign in if you already have an account.

> OpenWeatherMap: Offers both free and paid services. It all depends on the type and size of data being requested. Furthermore, it also depends on the number of requests per time being made.

![openweathermap login](/engineering-education/create-a-weather-app-in-node.js-using-openweathermap-api/openweathermap_login.png "openweathermap login")

Click on your account name link found on the top right side of the navigation bar. On the drop-down menu, select 'My API keys'. You can generate one with a new name or use the default one provided.
**Make sure that it is not seen by anyone for security reasons**. Also, don't save it directly in your application.

> In case of any invalid '*Invalid API key*' error, you can create a new key and save it for use. One that has never been used before.

### Setup the project

Create a new directory, which will be our root directory named 'Weather' and in it, we will initialize the Node.js project. This we will do by using the command below:

```bash
npm init -y
```

This quickly accepts all the default options in the Terminal dialogue. It creates a new configuration file called 'package.json' in the root directory.

Create a new folder named 'views' and in it, a file named 'index.ejs'. This will allow us to view the results using the 'ejs' view engine. Create another folder in the root directory named 'public' and in it another folder called 'css'. Create files in the root directory named '.env' and 'server.js' respectively. The project structure will be as shown below.

#### Folder Structure

```bash
.Weather
├── node_modules (Folder)
├── public (Folder)
│   ├── css (Folder)
│       └── style.css (File)
├── views (Folder)
│   └── index.ejs (File)
├── .env (File)
├── package.json (File)
└── server.js (File)
```

We shall now modify our files as follow:

#### Install dependencies

The following are our required dependencies:

- **express:** This shall help us in routings.
- **dotenv:** This will help us to hide our API secret key.
- **body-parser:** This is a Node.js body parsing middleware. It will allow us to parse incoming request bodies in a middleware before our handlers. These are available under the `req.body` property.
- **request:** This will help to make http calls.
- **ejs:** This will help in the conversion of our templates into an html static page that can be viewed in our browser.

We shall install them by using the command below:

```bash
npm i express dotenv body-parser request ejs
```

#### package.json

Open the file and in it add a start script as follows:

```json
        "scripts": {
            "start": "node server.js",
            "test": "echo \"Error: no test specified\" && exit 1"
        
        },
```

Our code shall look as follows:

```json
{
  "name": "Weather",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
      "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
     "body-<!-- Main container -->
    <div class="container">

        <!-- This shall hold the input fields and the output data -->
        <fieldset>
            <!-- This form shall be used to fetch our city name -->
            <form action="/" method="post">
                <input name="city" type="text" class="ghost-input" placeholder="Enter a City" required>
                <input type="submit" class="ghost-button" value="Get Weather">
            </form>

            <!-- Upon fetching of data we shall display it -->
            <%if( weather !== null){ %>
                <div class="grid">
                    <p>
                        <%= place %>
                    </p>
                    <p class="text-muted small">
                        <%= timezone %>
                    </p>
                </div>

                <!-- You can find other data fetched by the app on the console in JSON form and display it as you please -->
                <div class="card-deck">
                    <div class="card card-accent-dark mb-3" style="max-width: 18rem;">
                        <div class="card-header">Summary</div>
                        <div class="card-body text-dark">Bootstrap CSS
                            <img src="<%= icon %>" alt="Weather-Icon">
                            <h5 class="card-title">Temperature</h5>
                            <p class="card-text">
                                In Degrees:
                                <%= temp %>°C/
                                    <%= fahrenheit %>°F
                            </p>
                            <h5 class="card-title">Main</h5>
                            <p class="card-text">
                                <%= main %>
                            </p>
                        </div>
                    </div>
                    <div class="card-deck">
                        <div class="card card-acTomorrowcent-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header">Description</div>
                            <div class="card-body text-dark">
                                <h5 class="card-title">Overall Description: </h5>
                                <p class="card-text">
                                    <%= description %>
                                </p>
                                <h5 class="card-title">Cloud coverage: </h5>
                                <p class="card-text">
                                    <%= clouds %>%
                                </p>
                                <h5 class="card-title">Visibility: </h5>
                                <p class="card-text">
                                    <%= visibility %> meters
                                </p>
                            </div>
                        </div>
                        <div class="card-deck">
                            <div class="card card-accent-dark mb-3" style="max-width: 18rem;">
                                <div class="card-header">Other info</div>
                                <div class="card-body text-dark">
                                    <h5 class="card-title">Humidity: </h5>
                                    <p class="card-text">
                                        <%= humidity %> g.m-3
                                    </p>
                                </div>
                                <div class="card-body text-dark">
                                    <h5 class="card-title">Pressure: </h5>
                                    <p class="card-text">
                                        <%= pressure %> N·m−2
                                    </p>
                                </div>
                            </div>
                        </div>

                        <% } %>

                            <% if(error !== null){ %>
                                <p>
                                    <%= error %>
                                </p>
                                <% } %>
        </fieldset>
        </div>parser": "^1.17.2",
     "dotenv": "^10.0.0",
     "express": "^4.15.3",
     "request": "^2.81.0"
    }
}
```

#### server.js

We shall do the following in our code:

- Require node_modules
These are the ones which we had installed in our application as shown below:

```javascript
// Require node_modules

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// Configure dotenv package

require('dotenv').config();
```

- Set up our API KEY, express app, and body-parser configurations, and our javascript template view engine

```javascript
// Set up our OpenWeatherMap API_KEY

const apiKey = `${process.env.API_KEY}`;

// Setup our express app and body-parser configurations
// Setup our javascript template view engine
// we shall serve our static pages from the public directory, it will act as our root directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
```

- Setup our default display on launch

```javascript
// Setup our default display on launch
app.get('/', function(req, res) {

    // It shall not fetch and display any data in the index page
    res.render('index', { weather: null, error: null });
});
```

- Setup post request display
  Here, we shall use the city passed in the post request and API_KEY in our '.env' file to get the data from the site.

```javascript
// On a post request, the app shall data from OpenWeatherMap using the given arguments
app.post('/', function(req, res) {

    // Get city name passed in the form
    let city = req.body.city;

    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);

            // We shall output it in the console just to make sure that the data being displayed is what we want
            console.log(weather);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                // we shall use the data got to set up our output
                let place = `${weather.name}, ${weather.sys.country}`,
                    /* We shall calculate the current timezone using the data fetched*/
                    weatherTimezone = `${new Date(weather.dt * 1000 - (weather.timezone * 1000))}`;
                let weatherTemp = `${weather.main.temp}`,
                    weatherPressure = `${weather.main.pressure}`,
                    /* We shall fetch the weather icon and its size using the icon data*/
                    weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    weatherDescription = `${weather.weather[0].description}`,
                    humidity = `${weather.main.humidity}`,
                    clouds = `${weather.clouds.all}`,
                    visibility = `${weather.visibility}`,
                    main = `${weather.weather[0].main}`,
                    weatherFahrenheit;
                weatherFahrenheit = ((weatherTemp * 9 / 5) + 32);

                // We shall also round off the value of the degrees fahrenheit calculated into two decimal places
                function roundToTwo(num) {
                    return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);

                // We shall now render the data to our page (index.ejs) before displaying it out
                res.render('index', { weather: weather, place: place, temp: weatherTemp, pressure: weatherPressure, icon: weatherIcon, description: weatherDescription, timezone: weatherTimezone, humidity: humidity, fahrenheit: weatherFahrenheit, clouds: clouds, visibility: visibility, main: main, error: null });
     // On a post request, the app shall data from OpenWeatherMap using the given arguments
app.post('/', function(req, res) {

    // Get city name passed in the form
    let city = req.body.city;

    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openwea and displaythermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);

            // We shall output it in the console just to make sure that the data being displayed is what we want
            console.log(weather);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                // we shall use the data got to set up our output
                let place = `${weather.name}, ${weather.sys.country}`,
                    /* We shall calculate the current timezone using the data fetched*/
                    weatherTimezone = `${new Date(weather.dt * 1000 - (weather.timezone * 1000))}`;
                let weatherTemp = `${weather.main.temp}`,
                    weatherPressure = `${weather.main.pressure}`,
                    /* We shall fetch the weather icon and its size using the icon data*/
                    weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    weatherDescription = `${weather.weather[0].description}`,
                    humidity = `${weather.main.humidity}`,
                    clouds = `${weather.clouds.all}`,
                    visibility = `${weather.visibility}`,
                    main = `${weather.weather[0].main}`,
                    weatherFahrenheit;
                weatherFahrenheit = ((weatherTemp * 9 / 5) + 32);

                // We shall also round off the value of the degrees fahrenheit calculated into two decimal places
                function roundToTwo(num) {
                    return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);

                // We shall now render the data to our page (index.ejs) before displaying it out
                res.render('index', { weather: weather, place: place, temp: weatherTemp, pressure: weatherPressure, icon: weatherIcon, description: weatherDescription, timezone: weatherTimezone, humidity: humidity, fahrenheit: weatherFahrenheit, clouds: clouds, visibility: visibility, main: main, error: null });
            }
        }
    });
});       }
        }
    });
});
```

> **Note:** You can fetch and display much data as you will need in your project as needed in the json received.

- Set up our port configurations
  We shall utilize port 5000 for our project which can be accessed on `localhost:5000`.

```javascript
// We shall set up our port configurations
app.listen(5000, function() {
    console.log('Weather app listening on port 5000!');
});
```

You can just copy the code and paste it into your file.

#### index.ejs

Inside the 'index.ejs' file found in the 'views' folder, we shall create a webpage template that shall be converted into a static webpage during display once the values are fetched. To learn more on template engines, visit '[Getting Started with EJS Templating Engine](https://www.section.io/engineering-education/nodejs-ejs/ "Getting Started with EJS Templating Engine Section.io Blog")' blog.

> **Note:** When this shall render the static pages, they shall be served from the 'public' folder, it acts as the root directory. This is because of this line of code, `app.use(express.static('public'));` in the 'server.js' file. Therefore, it shall obtain its assets from the 'public' folder. This will include the 'css' or even image files.

This is what we shall be doing in the 'index.ejs' file:

- Create a new bootstrap boilerplate. Link the 'css' file that shall be found inside the 'css' folder. In it we shall also change the site's title to 'Weather' and add a favicon to it from a url as shown in the code below:

```html
<!doctype html>
<html lang="en">

<head>
    <title>Weather</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <!-- Use some of the bootstrap CSS and google fonts to quicken the process -->
    <!-- We shall also add a favicon -->
    <link rel="shortcut icon" href="https://img.icons8.com/office/16/000000/sunset--v2.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    



        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

</body>

</html>
```

- Inside the body tags, just above the bootstrap scripts, we shall add our content. We shall also use the data properties to access the data rendered to it from the URL. If there is no data, it shall just display the error.

```html
<!-- Main container -->
    <div class="container">

        <!-- This shall hold the input fields and the output data -->
        <fieldset>
            <!-- This form shall be used to fetch our city name -->
            <form action="/" method="post">
                <input name="city" type="text" class="ghost-input" placeholder="Enter a City" required>
                <input type="submit" class="ghost-button" value="Get Weather">
            </form>

            <!-- Upon fetching of data we shall display it -->
            <%if( weather !== null){ %>
                <div class="grid">
                    <p>
                        <%= place %>
                    </p>
                    <p class="text-muted small">
                        <%= timezone %>
                    </p>
                </div>

                <!-- You can find other data fetched by the app on the console in JSON form and display it as you please -->
                <div class="card-deck">
                    <div class="card card-accent-dark mb-3" style="max-width: 18rem;">
                        <div class="card-header">Summary</div>
                        <div class="card-body text-dark">Bootstrap CSS
                            <img src="<%= icon %>" alt="Weather-Icon">
                            <h5 class="card-title">Temperature</h5>
                            <p class="card-text">
                                In Degrees:
                                <%= temp %>°C/
                                    <%= fahrenheit %>°F
                            </p>
                            <h5 class="card-title">Main</h5>
                            <p class="card-text">
                                <%= main %>
                            </p>
                        </div>
                    </div>
                    <div class="card-deck">
                        <div class="card card-acTomorrowcent-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header">Description</div>
                            <div class="card-body text-dark">
                                <h5 class="card-title">Overall Description: </h5>
                                <p class="card-text">
                                    <%= description %>
                                </p>
                                <h5 class="card-title">Cloud coverage: </h5>
                                <p class="card-text">
                                    <%= clouds %>%
                                </p>
                                <h5 class="card-title">Visibility: </h5>
                                <p class="card-text">
                                    <%= visibility %> meters
                                </p>
                            </div>
                        </div>
                        <div class="card-deck">
                            <div class="card card-accent-dark mb-3" style="max-width: 18rem;">
                                <div class="card-header">Other info</div>
                                <div class="card-body text-dark">
                                    <h5 class="card-title">Humidity: </h5>
                                    <p class="card-text">
                                        <%= humidity %> g.m-3
                                    </p>
                                </div>
                                <div class="card-body text-dark">
                                    <h5 class="card-title">Pressure: </h5>
                                    <p class="card-text">
                                        <%= pressure %> N·m−2
                                    </p>
                                </div>
                            </div>
                        </div>

                        <% } %>

                            <% if(error !== null){ %>
                                <p>
                                    <%= error %>
                                </p>
                                <% } %>
        </fieldset>
        </div>
```

> **Note:** Scripts are always placed after the main contents on your page. This will allow the page content to fully load before JavaScript files are executed hence preventing errors. This is a good coding practice.

#### style.css

This shall be our css fomart:

```css
body {
    width: auto;
    margin: 0 auto;
    font-family: 'Open Sans', sans-serif;
}


/* This will format the whole fieldset content*/

.container {
    width: 80%;
    margin: 0 auto;
}


/* This will format the whole fieldset content*/

fieldset {
    display: block;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-before: 0em;
    -webkit-padding-start: 0em;
    -webkit-padding-end: 0em;
    -webkit-padding-after: 0em;
    border: 0px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    min-width: -webkit-min-content;
    padding: 30px;
}

.ghost-input,
p {
    display: block;
    font-weight: 300;
    width: 100%;
    font-size: 25px;
    border: 0px;
    outline: none;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #4b545f;
    background: #fff;
    font-family: Open Sans, Verdana;
    padding: 10px 15px;
    margin: 30px 0px;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
}

.ghost-input:focus {
    border-bottom: 1px solid #ddd;
}

.ghost-button {
    background-color: transparent;
    border: 2px solid #ddd;
    padding: 10px 30px;
    width: 100%;
    min-width: 350px;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
}

.ghost-button:hover {
    border: 2px solid #515151;
}

p {
    color: #E64A19;
}
```

#### .env

Inside our '.env' file, we shall place our OpenWeatherMap API kEY obtained. Just add the following to the file and then copy-paste the acquired key after it:

```bash
API_KEY=
```

Save the file.

You can find the code in the repository found [here](https://github.com/blacklihgt/Openweathermap-Node.js). Feel free to download and modify it to your needs.

### Run and access the application

To run the application, we shall utilize the 'start' script added earlier on in the 'package.json' file. This we can do by running the following code in the inbuilt terminal:

```bash
npm run start
```

We can also start the application using:

```bash
node server.js
```

Access the app in the browser at `localhost:5000`. Enter the city name of your choice and click on the 'Get Weather' button.

It will fetch the weather data and return results in the web browser and the console.

The results will look like this:

![Final Image](/engineering-education/create-a-weather-app-in-node.js-using-openweathermap-api/finalImage.png "Final Image")

You can close the app on the terminal using `Ctrl + C`.

### Further projectsAPIs

- OpenWeatherMap has more API calls for other types of forecasting which are free. This can be found in this link: [https://openweathermap.org/api](https://openweathermap.org/api "https://openweathermap.org/api"). Some are shown below:

![OpenWeatherMap Other Urls](/engineering-education/create-a-weather-app-in-node.js-using-openweathermap-api/other_api_urls.png "OpenWeatherMap Other URLs")

You can try fetching the data and displaying it in the console or the browser.

- Try to fetch and use the geolocation to fetch weather data of a user based on their location.
- Try and add a weather map found in this link: [https://openweathermap.org/api](https://openweathermap.org/api "https://openweathermap.org/api") in your website.

### Conclusion

You can access more data from the OpenWeatherMap site. This can be useful to customize your app data as required. This also includes live weather maps which can be embedded in web pages. In weather forecasting, the more data, the better.

### References

- [Getting Started with EJS Templating Engine](https://www.section.io/engineering-education/nodejs-ejs/ "Getting Started with EJS Templating Engine Section.io Blog") blog written by *Quinter Awuor
- [OpenWeatherMap website](https://openweathermap.org/).
