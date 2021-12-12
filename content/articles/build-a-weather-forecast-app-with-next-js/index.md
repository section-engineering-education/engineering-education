# Build a weather forecast app in Nextjs

### Introduction

In this tutorial, we'll be building a weather application in Nextjs, Showing you how to grab live web data from cities all across the world via an external API. We'll also use the API to look up the daily weather forecast.

The API we’ll be using for this tutorial is openweather API but to do that we’ll have to do is [sign up](https://openweathermap.org/api) with them to be able to make use of their API.

It's a really basic beginner project, and it's for those who have a basic understanding of React and want to learn how to make a server-side rendered react app with Next js. The only requirement is that you have a basic understanding of React. We’ll be using for this tutorial is openweather API but to do that we’ll have to signup with them to be able to make use of their API.

At the end of this tutorial the readers should be able to:

- Know what Nextjs is.
- When to use it.
- Know the key advantages Nextjs has over React.
- Install Nextjs.
- Be able to create an application in Nextjs.
- Fetch an external API.

So sit back, relax and enjoy the ride!!!

#### Overview
- Introduction
- What is Nextjs
  - Why you should use it
- Comparing Next with React
- Building a weather forecast app

### What is Next.js?
So what exactly is Nextjs ? Nextjs is an open-source development framework built on top of Node.js that enables server-side rendering and the generation of static websites in React-based web apps. It's a JavaScript framework that lets you create really fast and user-friendly static web applications with React. It's a fantastic tool for creating your future website. It includes a lot of fantastic features and benefits that could make Nextjs your first choice for developing your next web app which brings us to why you should use it.

#### Why should you use it?
This framework has various advantages, both for client apps and for the development (frontend) team. Let’s take a look at some of the benefits.

##### Rendering on the Server (SSR)
Nextjs comes with a unique server-side rendering (SSR) solution for React components. It ensures that developers to be able to use Next to display their codes on the server. Now, this was also possible before the advent of Nextjs Before Nextjs however, it also required a great deal of tinkering with common issues like caching, load on the server, the content, and the application's architecture.
##### Improved performance
Because Nextjs restricts the browser from downloading and executing a large amount of JavaScript code at once, it can significantly improve metrics like time to first draw (TTFD). It determines how long it takes for a user to view the very first content on their screen, and should ideally this should be less than one second.

##### Enhanced search engine optimization
We all know this has been covered a lot, but it's also worth noting that using server-side rendering in place of client-rendered JavaScript can increase your search engine exposure greatly. You can design a web application with all the functionality and interactivity you need while still enjoying the SEO benefits of a static website. And it will provide you with a significant competitive advantage.


##### Static Site Generation
Let's assume you run a blogging website, the content of this type of website rarely changes once it is launched. As a result, no data from the client or server is required. Everything is on the HTML and CSS pages. As a result, the browser merely needs to parse them and possibly a small amount of javascript. Static sites were the name for this type of website. Because they have fewer duties to fulfill, they are extremely fast. We can produce static HTML at build time with Nextjs and no longer have to worry about it.

### Comparing Nextjs with React
Since Nextjs is a React framework then why compare it with its library? In this article, we'll be comparing them according to:
- Features
- Speed of coding
- Performance
- Documentation
- Community So let’s get started!!
  
#### Features
In Next.js, We make use of React to assist us in creating single-page applications.

It comes with the following features:
- Rendering on the server (SSR)
- Exporting static data (SSG)
- Pre-rendering
- Build size optimization is done automatically.
- Compilation of code more quickly
All of these features will assist you in developing a functional and ready-to-use application.

 React can simply be extended to integrate functionality like routing and state management patterns using frameworks like Redux. React is a simple framework that can be adapted for almost any project.
#### Speed of coding
 We all know that in React, you have to first create a component and then add it to the router to create pages for our React project. Unlike React to make a page for the Nextjs project, We simply place it in the pages folder and link it to the required header component. Easy right? Nextjs helps simplify your life by reducing the amount of code you write and making the project easier to follow.

There are also advantages of using React for example the `Create React App` is a tool that saves you time and effort when it comes to setting up and customizing your development environment. All you need to do is run the command to get all of the tools you need to make your React project up and running.

#### Performance
Now because of static sites and server-side rendering features, this makes Nextjs apps really fast, and not just that, they work by default, thanks to performance-enhancing technologies like Image Optimization and many more. As a result, when you use Nextjs, you'll get automatic server rendering and code splitting (which will improve performance). In addition, SSR (Server Side Rendering) will significantly increase your application's performance.

For React, there are a few things that make it not worthy of this discussion. It only supports client-side rendering out of the box, which is not enough if you are building a high-performance application.

#### Documentation 
This is self-evident, but it is frequently overlooked. While the designs of home pages of certain frameworks may be eye catchy,  you'll still need additional tutorials, and even articles to get started, in addition to just reading the documentation.

As regarding documentation, Both React and Nextjs provide amazing documentation options.

Now while Nextjs includes a set of "learn-by-doing" documentation that leads you through tasks like component development and routing React also provides a similar setup, with multiple tutorials covering the fundamentals being displayed. You can check out their official documentation(both React and Nextjs) for better understanding.
In my opinion, Nextjs only scores high in performance than React all others are even.

Since we’ve taken a look at Nextjs and why you should use it, let’s move on to build a weather forecast application in Next.

### Requirements
To get started you just need a basic understanding of javascript and react knowledge and also signup to openweathermap to make use of their API, it’s completely free. so head over to [https://openweathermap.org/api](https://openweathermap.org/api) and signup. Click on the API key, you should see something like this:
![api_key](./api_key.PNG)

You can choose to generate your key which is recommended.

### Building a weather forecast application
The first thing when creating a Next project is to install Nextjs by opening our terminal, navigating to the folder you want to install next on, run the command:

```bash
npm create-next-app next-weather-build
```

To make this easy, we'll be using a built-in frontend which we will use for this project, a JSON file has also been included. This contains a list of also  cities so all you have to do is visit my GitHub repo through this [link](https://github.com/oyedeletemitope/weather-tutorial-front) and clone and download the project, then run:

```bash
npm install
```

This will install our node modules for the project you can decide to choose to install Next app and just copy the files into yours but be sure to install the following packages

```bash
npm install dotenv
```

(We’ll be using the dotenv for our environment variables which is our API key)

```bash
npm install moment
```

(this allows us to format dates)

```bash
Npm moment-timezone
```

```bash
npm install sass
```

(this allows us to compile our styles)
Now that we’ve done that let’s start our project by running this command:

```bash
npm run dev
```

This would start up our next project. If you have an issue with loading `SWC` you can disable it and switch to babel by creating a file called .babelrc in your project folder and inputting the following code:

```json
{
    "presets": ["next/babel"]
  }
```

Rerun the server, that should take care of it once you start the server click on the localhost link you should see something like the image below:

![front-end](/./front_end.jpg)

The first thing we want to work on is our `Searchbox.js`. We want to make sure that whenever we input a city it brings us a result, that matches our city if not is should tell us no result. For us to do this, we first need to import the city list which is a JSON format that should be in our lib folder we also want to import  `link` from next as we’ll be using that also.

```javascript
import cities from "../lib/city.list.json";
import Link from "next/link";
import Router from "next/router";
```


Then below it add the following codes:

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

- Create a state variable called query and also set our variable(react.usestate) state to an empty string. What we are trying to do is when we type in a value, we want the value to be saved to our query.
- We also created a new state variable called results and gave it an empty string also but this will be responsible for showing our matching cities.
- The const OnChange is supposed to be attached to the input so when we type into our input we get an event that will give us the value. We also got our value and set it to our query,
  Now we want to use our query and search against our city data to see if it matches: any of our cities. Let’s paste in the following codes right after our setQuery(value) before the closing curly braces:

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

So what we did above code is that if our type in more than 3 characters it should map through the cities and bring out the results matching our value, making us not search unnecessarily. We also created a slug to create a unique page name and display through our results, so we can use our slugs to find out which area so when we create our weather page for each city, we know which one we are referring to through our results.

So let's add our value to our input tag:

```javascript
value = {query}onChange={onChange}
```

Let's also call out our query as this makes our matching cities accessible via results. now let's do some conditional logic and map through our results, using the `city.slug` as our key so we can show them on the screen. Right after our input tag, write the following codes:

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

![searchbox](/./first_pic.jpg)

### Displaying our matching cities:
Now let's navigate to a folder called location which is inside our pages folder, locate the file called `[city].js.` That’s what we’ll be working on next. Top of the page let’s import our city list file:

```javascript
import cities from "../../lib/city.list.json";
import moment from "moment-timezone";
import Link from "next/link";
import Head from "next/head";
```
We’ll also import our today’s weather and hourly weather which we’ll be working on soon

```javascript
import TodaysWeather from "../../components/TodaysWeather";
import HourlyWeather from "../../components/HourlyWeather";
```

We want this page to access any kind of dynamic slug that we’re going to make. This is where Nextjs comes in like said earlier Next is server-side rendered meaning we can grab the data before the page loads unlike just using react where we have to wait before the page loads before grabbing the data. We’ll be using the get `serversideprops` and then pass in so let’s paste this:

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

What we did here was that we used a function `getserversideprops` the serversideprops since our data is likely to change(our data is live weather data which is subject to change)if our data wasn’t changing we would use `getstaticprops`. we also did a conditional statement sting that if not city return not true

The next thing we want to do is make use of our environment variables this is where we have to input the API link so let’s first create a .env file, name it .env.local here we’ll be creating an API key and making it equal to the API key of our open weather map like this:

```bash
    API_KEY =78b705a31f5b7bebcfe38a2624152e8d 
```
Please make sure it's your API key you're inputing. Next, we head over to our next.config.js clear and paste this:

```javascript
require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  images:{
    domains: ["openweathermap.org"],
  }
}
```
The code we pasted also allows us to use openweather image icons which we will use when displaying the weather data.

Now, let’s go back to our `[city].js` and paste the following code below the conditional statement right before the last closing curly brace:

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

Here we are making a request to our API and fetching the data. Noticed I set the units to Celcius, we also excluded some data like the minute data and did a conditional statement to check if the data is available or not, if it returns our city data as props grabbing the city from our context if not, return not found.

Now let’s paste in the following codes:

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

This will help us get the id or our city and if there isn’t return null. (no data collected). To get our hourly weather data, let’s paste in this code:

```javascript
const getHourlyWeather = (hourlyData, timezone) => {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const eodTimeStamp = Math.floor(endOfDay / 1000);
    const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);
  
    return todaysData;
  };

```

Here we wrote a function to get hourly data, create a variable where we called moments which helps us get current time then we passed in the timezone we created variable to which will use to divide by 1000 since openweather is giving us our value in milliseconds and we want it to be in seconds. We attributed it to our todaysData.
Now let’s access our data. On our function City, inside the brackets add these props:

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

Then we let's clear what we were returning under it and paste this:

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

Here are going to be displaying hourly weather and today's weather by passing them down to their components so we can access the data. The link and the search are just for us to be able to go back or search for another city Now we’ve done all the hard job. If you got it up to this level you're a genius already!!!

### Displaying of weather
Let's navigate to the folder called components and click on `todaysweather` what we want to input the info we want to be displayed. First of let’s import the following packages:

```javascript
import moment from "moment-timezone";
import React from "react";
import Image from "next/image";
```

Inside the brackets of our functions let's pass in the props city and also the props weather and timezone :

```javascript
{
  city, weather, timezone;
}
```

Now what we want to do is render the city data and also the weather data. So inside our `div classname` let's paste in these:

```javascript
      <h1>
       {city.name} ({city.country})
      </h1>
       <h2>
         <span>{weather.temp.max.toFixed(0)}&deg;C</span>
         <span>{weather.temp.min.toFixed(0)}&deg;C</span>
       </h2>
```

After our span sunrise let's paste this:

```javascript
<span>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</span>
```

And under our span sunset, let's paste these:

```javascript
<span>{moment.unix(weather.sunset).tz(timezone).format("LT")}</span>
```

Now let's paste in some image icons that weather API allows us to use under the div icon wrapper is another div under that let's paste this:

```javascript
<Image
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="Weather Icon"
  layout="fill"
/>
```

We then want to get the weather description so we paste this after two closed divs:

```javascript
<h3>{weather.weather[0].description}</h3>
```

Now we’re done with today’s weather let’s work on hourly weather:

### Hourlyweather
Navigate to file `Hourlyweather` still under the folder components. Just like we did for todaysweather we want to render the weather data. First, we want to import the following:

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

So just like our `todaysweather` we are rendering our weather data(weather, format, displaying an image icon from our openweather) or the result should be like this:
![final result](/./final_result.jpg)

If you have something like that then congratulations you just built yourself a weather forecast application!! when we search for another city while still under the city page what we want to do is that we want to listen to the page change so that when our page changes it sets our query to nothing to this let’s paste in these codes inside our Searchbox right after the two variable states we created :

```javascript
React.useEffect(() => {
 const clearQuery = () => setQuery("");
 Router.events.on("routeChangeComplete", clearQuery);
 return () => {
  Router.events.off("routeChangeComplete", clearQuery);
 };
}, []);
```

We used use effect to open up a function and inside we created a mini function called clear query and made use of Nextjs route so the route will tell us when we change pages and when it does clear the query, the square means the function will happen when the search box mounts. Now we’re done

### Conclusion
So in this tutorial we've learned what Nextjs is all about when to use them, we also compared it with just using the create react app, and let's not forget we built a weather app in Nextjs. Job well done guys. Here’s a [link](https://github.com/oyedeletemitope/next-weather-app) to the project on GitHub all you have to do is create your own `.env file`. Would you please share if you found this helpful?
