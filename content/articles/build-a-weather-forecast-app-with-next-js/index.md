---
layout: engineering-education
status: publish
published: true
url: /build-a-weather-forecast-app-with-next-js/
title: Build a Weather Forecast App in Next.js
description: This tutorial will be an introduction to Next.js. We will walk through what Next.js is, and why and when we should use it. We will also be building a simple weather forecast application using Next.js.
author: oyedele-temitope
date: 2021-12-29T00:00:00-02:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-a-weather-forecast-app-with-next-js/hero.jpg
    alt: Build a Weather Forecast App in Next.js Hero Image
---
In this tutorial, we will build a weather application in Next.js showing how to grab live web data from cities all across the world via an external API. We will also use the API to look up the daily weather forecast.
<!--more-->
The API we will be using for this tutorial is Openweather API. To start using it, you will have to sign up [here](https://openweathermap.org/api).

### Prerequisites
To follow along with this tutorial, it's important to have:
- A basic understanding of React and want to learn how to make a server-side rendered react app with Next.js.
- Installed a code editor.

At the end of this tutorial, you should be able to:
- Know what Next.js is.
- Know when to use it.
- Know the key advantages Next.js has over React.js.
- Install Next.js.
- Be able to create an application using Next.js.
- Fetch an external API.

### Overview
- Introduction
- What is Next.js
- Why you should use it
- Comparing Next with React
- Building a weather forecast app

### What is Next.js?
Next.js is an open-source development framework built on top of Node.js that enables server-side rendering and the generation of static websites in React-based web applications.

It's a JavaScript framework that lets you create really fast and user-friendly static web applications with React. It's a fantastic tool for creating your future website. It has a lot of fantastic features and benefits that could make Next.js your first choice for developing your next web app.

### Why should you use it?
This framework has various advantages, both for client apps and the development (frontend) team. Let's take a look at some of the benefits.

#### Rendering on the server (SSR)
Next.js comes with a unique server-side rendering (SSR) solution for React components. It ensures that developers are able to use Next to display their code on the server.

However, before Next.js, developers had to handle a great deal of tinkering with common issues like caching, load on the server, the content, and the application's architecture.

#### Improved performance
Because Next.js restricts the browser from downloading and executing a large amount of JavaScript code at once, it can significantly improve metrics like time to first draw (TTFD).

TTFD determines how long it takes for a user to view the very first content on their screen, and ideally, this should be less than one second.

#### Enhanced search engine optimization
We all know this has been covered a lot, but it's also worth noting that using server-side rendering in place of client-rendered JavaScript can increase your search engine exposure greatly.

You can design a web application with all the functionality and interactivity you need, while still enjoying the SEO benefits of a static website. It will also provide you with a significant competitive advantage.

#### Static site generation
Let's assume you run a blogging website, the content of this type of website rarely changes once it is launched. As a result, no data from the client or server is required. Everything is on the HTML and CSS pages.

As a result, the browser merely needs to parse them and possibly a small amount of javascript.

Static sites were the name for this type of website. Because they have fewer duties to fulfill, they are extremely fast. We can produce static HTML at build time with Next.js and no longer have to worry about it.

### Comparing Next.js with React
Since Next.js is built on top of React framework, we'll be understanding them according to:
- Features
- Speed of coding
- Performance
- Documentation
- Community

Let's get started!

#### Features
In Next.js, we make use of React to assist us in creating single-page applications.

It comes with the following features:
- Rendering on the server (SSR)
- Exporting static data (SSG)
- Pre-rendering
- Build size optimization is done automatically.
- Compilation of code more quickly

All of these features will assist you in developing a functional and ready-to-use application.

React can simply be extended to integrate functionality like routing and state management patterns using frameworks like Redux. React is a simple framework that can be adapted for almost any project.

#### Speed of coding
We all know that in React, you have to first create a component and then add it to the router to create pages for our React project.

Unlike React, to make a page for the Next.js project, we simply place it in the `pages` folder and link it to the required header component.

Easy right?

Next.js helps simplify your life by reducing the amount of code you write and making the project easier to follow.

There are also advantages to using React. For example, the `Create React App` is a tool that saves you time and effort when it comes to setting up and customizing your development environment. All you need to do is run the command to get all of the tools you need to make your React project up and running.

#### Performance
Because static sites and server-side rendering features makes Next.js apps really fast, and not just that, they work by default, thanks to performance-enhancing technologies like Image Optimization and many more.

As a result, when you use Next.js, you'll get automatic server rendering and code splitting (which will improve performance). In addition, SSR (Server Side Rendering) will significantly increase your application's performance.

For React, there are a few things that make it not worthy of this discussion. It only supports client-side rendering out of the box, which is not enough if you are building a high-performance application.

#### Documentation
This is self-evident, but it is frequently overlooked. While the designs of home pages of certain frameworks may be eye catching, you'll still need additional tutorials, and even articles to get started, in addition to just reading the documentation.

With documentation, both React.js and Next.js provide amazing options.

Next.js includes a set of "learn-by-doing" documentation that leads you through tasks like component development and routing. React also provides a similar setup with multiple tutorials covering the fundamentals being displayed.

You can check out their official documentation (both React and Next.js) for better understanding.

In my opinion, Next.js only scores high in performance than React, all others are even.

Since we've taken a look at Next.js and why you should use it, let's move on to build a weather forecast application using Next.

### Requirements
Head over to [https://openweathermap.org/api](https://openweathermap.org/api) to signup in order to access the API. Click on the API key, you should see something like this:

![api_key](/engineering-education/build-a-weather-forecast-app-with-next-js/api-key.png)

You can choose to generate your key (which is recommended).

### Building a weather forecast application
The first thing when creating a Next project is to install Next.js by opening our terminal, navigating to the folder you want to install using the command:

```bash
npm create-next-app next-weather-build
```

To make this easy, we'll be using a built-in frontend containing a JSON file.

For reference, you can find the full code [here](https://github.com/oyedeletemitope/weather-tutorial-front). You can clone or download the project:

```bash
npm install
```

This will install all the node modules for the project:

```bash
npm install dotenv
```

We'll be using the dotenv for our environment variables which is our API key.

```bash
npm install moment
```

This allows us to format dates.

```bash
npm moment-timezone
```

```bash
npm install sass
```

This allows us to compile our styles.

Let's now start our project by running this command:

```bash
npm run dev
```

This would start up our next project. If you have an issue with loading `SWC`, you can disable it and switch to babel by creating a file named `.babelrc` in your project folder and adding the following code:

```json
{
  "presets": ["next/babel"]
}
```

Rerun the server, that should take care of it once you start the server click on the localhost link, you should see something like the image below:

![front-end](/engineering-education/build-a-weather-forecast-app-with-next-js/front-end.jpg)

The first thing we want to work on is our `Searchbox.js`. We want to make sure that whenever we input a city, it brings us a result that matches our city, if not it should tell us no result.

For us to do this, we first need to import the city list from the JSON file under the `lib` folder. Also, we have to import `link` from `next`:

```javascript
import cities from "../lib/city.list.json";
import Link from "next/link";
import Router from "next/router";
```

Then, add the following code:

```javascript
export default function SearchBox({ placeholder }) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };
```

What we did here is:
- Create a state variable named `query` and also set our variable (react.usestate) state to an empty string. What we are trying to do is; when we type in a value, we want the value to be saved to our `query`.
- We also created a new state variable named `results` and gave it an empty string. This will be responsible for showing our matching cities.
- The `const OnChange` is supposed to be attached to the input so when we type into our input we get an event that will give us the value. We also got our `value` and set it to our `query`.
- Now, we have to use our `query` and search against our city data to see if it matches any of our cities.

Let's paste in the following code right after our `setQuery` (value) before the closing curly braces:

```javascript
let matchingCities = [];
if (value.length > 3) {
  for (let city of cities) {
    if (matchingCities.length >= 5) {
      break;
    }
    const match = city.name.toLowerCase().startsWith(value.toLowerCase());
    if (match) {
      const cityData = {
        ...city,
        slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
      };
      matchingCities.push(cityData);
    }
  }
}
return setResults(matchingCities);
```

So, what we did in the code above is; if our type in more than 3 characters it should map through the cities and bring out the results matching our value, making us not search unnecessarily.

We also created a slug to create a unique page name and display it through our results. We can use our slugs to find out the area so when we create our weather page for each city, we know which area we are referring to through our results.

Let's add our value to our input tag:

```javascript
value = {query}onChange={onChange}
```

Let's also call out our `query` as this makes our matching cities accessible via results.

Let's now add some conditional logic to map through our results, using the `city.slug` as our key.

Right after our `input` tag, write the following code:

```javascript
{
  query.length > 3 && (
    <ul>
      {results.length > 0 ? (
        results.map((city) => (
          <li key={city.slug}>
            <Link href={`/location/${city.slug}`}>
              <a>
                {city.name}
                {city.state ? `, ${city.state}` : ""} <span>({city.country})</span>
              </a>
            </Link>
          </li>
        ))
      ) : (
        <li className="search__no-results">NO results</li>
      )}
    </ul>
  );
}
```

![searchbox](/engineering-education/build-a-weather-forecast-app-with-next-js/first-pic.jpg)

### Displaying our matching cities
Let's navigate to a folder named `location` under the `pages` folder, locate the file named `[city].js` as shown:

```javascript
import cities from "../../lib/city.list.json";
import moment from "moment-timezone";
import Link from "next/link";
import Head from "next/head";
```

We'll also import our today's weather and hourly weather which we'll be working on soon:

```javascript
import TodaysWeather from "../../components/TodaysWeather";
import HourlyWeather from "../../components/HourlyWeather";
```

We want this page to access any kind of dynamic slug that we're going to make. This is where Next.js comes in.

Like we learned earlier, Next.js is server-side rendered, meaning - we can grab the data before the page loads unlike just using react where we have to wait before the page loads before grabbing the data.

We'll be using the get `serversideprops` and then pass in so let's paste this:

```javascript
export async function getServerSideProps(context) {
  const city = getCityId(context.params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }
}
```

What we did here was that we used a function `getserversideprops` to get the serversideprops since our data is likely to change (our data is live weather data which is subject to change). If our data wasn't changing we would use `getstaticprops`.

The next thing we want to do is make use of our environment variables to link the external API.

Let's first create a `.env` file, name it `.env.local`.

Here, we'll be creating an API key and making it equal to the API key of our open weather map like this:

```bash
API_KEY =78b705a31f5b7bebcfe38a2624152e8d
```

Please make sure it's the API key you're inputting. Next, we head over to our `next.config.js` and paste this:

```javascript
require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
};
```

The code we pasted also allows us to use openweather image icons which we will use when displaying the weather data.

Now, let's go back to our `[city].js` and paste the following code below the conditional statement right before the last closing curly brace:

```javascript
const res = await fetch(
  `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
);

const data = await res.json();

if (!data) {
  return {
    notFound: true,
  };
}

const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);
const weeklyWeather = data.daily;

return {
  props: {
    city: city,
    timezone: data.timezone,
    currentWeather: data.current,
    hourlyWeather: hourlyWeather,
    weeklyWeather: weeklyWeather,
  }, // will be passed to the page component as props
};
```

Here, we are requesting to our API and fetching the data. Notice that we set the units to Celsius, and we also excluded some data like the `minute` data. We also wrote a conditional statement to check if the data is available or not, it returns our city data as props, if found.

Now, let's paste in the following codes:

```javascript
const getCityId = (param) => {
  const cityParam = param.trim();
  // get the id of the city
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];
  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);
  if (city) {
    return city;
  } else {
    return null;
  }
};
```

This will help us get the `id` of our city and if there isn't, return `null` (no data collected). To get our hourly weather data, let's paste in this code:

```javascript
const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);
  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};
```

Here, we write a function to get hourly data.

Create a variable named `moments` that help us get the current time when passed with the timezone information. We created variable `todaysData` that divides the response value by `1000`, since openweather returns value in milliseconds (we want it to be in seconds).

Now, let's access our data. On our function `City`, inside the brackets, add these props:

```javascript
{
  city,
  weather,
  currentWeather,
  hourlyWeather,
  weeklyWeather,
  timezone,
}
```

Then clear what we were returning under it and paste this:

```javascript
<div>
  <Head>
    <title>{city.name} Weather - Next Weather App</title>
  </Head>

  <div className="page-wrapper">
    <div className="container">
      <Link href="/">
        <a className="back-link">&larr; Home</a>
      </Link>
      <SearchBox placeholder="Search for a location" />
      <TodaysWeather
        city={city}
        weather={weeklyWeather[0]}
        timezone={timezone}
      />
      <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
    </div>
  </div>
</div>
```

Here, we are going to display hourly weather along with today's weather by passing them down to their components so we can access the data.

The link and the search are just for us to go back or search for another city.

### Displaying weather
Let's navigate to the folder named `components` and click on `todaysweather` where we want to input the information that we want to be displayed.

Let's start by importing the following packages:

```javascript
import moment from "moment-timezone";
import React from "react";
import Image from "next/image";
```

Inside the function, let's pass in the props `city` along with `weather` and `timezone`:

```javascript
{
  city, weather, timezone;
}
```

Now, what we want to do is render the city data and also the weather data. So, inside our `div classname`, paste this:

```javascript
<h1>
  {city.name} ({city.country})
</h1>
  <h2>
    <span>{weather.temp.max.toFixed(0)}&deg;C</span>
    <span>{weather.temp.min.toFixed(0)}&deg;C</span>
  </h2>
```

After our `span` `sunrise` paste this:

```javascript
<span>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</span>
```

And under our `span` `sunset`, paste these:

```javascript
<span>{moment.unix(weather.sunset).tz(timezone).format("LT")}</span>
```

Let's paste in some image icons that weather API allows us to use under the `div` icon wrapper:

```javascript
<Image
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="Weather Icon"
  layout="fill"
/>
```

We then want to get the weather description, so we paste this after two closed `divs`:

```javascript
<h3>{weather.weather[0].description}</h3>
```

We're done with today's weather

Let's work on hourly weather:

### Hourlyweather
Navigate to file `Hourlyweather` under the `components` folder. Just like we did for `todaysweather`, we want to render the weather data. First, we want to import the following:

```javascript
import React from "react";
import moment from "moment-timezone";
import Image from "next/image";
```

Inside the brackets of our export function city, we paste this:

```javascript
{
  hourlyWeather, timezone;
}
```

After our `div` hourly weather let's paste in this:

```javascript
<div className="hourly__inner">
  {hourlyWeather.length > 0 &&
    hourlyWeather.map((weather, index) => (
      <div className="hourly__box-wrapper" key={weather.dt}>
        <div className="hourly__box">
          <span
            className={`hourly__time ${index == 0 ? "hourly__time-now" : ""}`}
          >
            {index == 0
              ? "NOW"
              : moment.unix(weather.dt).tz(timezone).format("LT")}
          </span>
          <Image
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width="100"
            height="100"
          />
          <span>{weather.temp.toFixed(0)}&deg;C</span>
        </div>
      </div>
    ))}
</div>
```

So, just like our `todaysweather` we are rendering our weather data (weather, format, displaying an image icon from our openweather) or the result should be like this:

![final result](/engineering-education/build-a-weather-forecast-app-with-next-js/final-result.jpg)

If you have something like that then congratulations you just built yourself a weather forecast application!

When we search for another city while still under the city page what we want to do is that we want to listen to the page change and set our query to the updated value.

Let's paste in these codes inside our Searchbox right after the two variable states we created :

```javascript
React.useEffect(() => {
  const clearQuery = () => setQuery("");
  Router.events.on("routeChangeComplete", clearQuery);
  return () => {
    Router.events.off("routeChangeComplete", clearQuery);
  };
}, []);
```

We used `useEffect` to open up a function and inside we created a mini function named `clearQuery` and made use of the Next.js route.

The route will tell us when we change the page or when we clear the query.

### Conclusion
In this tutorial, we've learned what Next.js is all about and when to use it. We also compared it with React.js. And, we built a weather app using Next.js.

You can find the full code [here](https://github.com/oyedeletemitope/next-weather-app).

All you have to do is create your `.env` as we discussed earlier.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
