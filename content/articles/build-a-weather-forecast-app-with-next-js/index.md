# Build  a weather forecast app in Next js


## Introduction
In this tutorial, I'll show you how to make a weather app in Next js. Showing you how to grab live web data from cities all across the world via an external API. We'll also use the API to look up the daily weather forecast.

The API we’ll be using for this tutorial is openweather API but to do that we’ll have to sign up with them to be able to make use of their API.

It's a really basic beginner project, and it's for those who have a basic understanding of React and want to learn how to make a server-side rendered react app with Next js. The only requirement is that you have a basic understanding of React. We’ll be using for this tutorial is openweather API but to do that we’ll have to signup with them to be able to make use of their API.

At the end of this tutorial the readers should be able to:
- know what next js is
- when to use it
- Know the key advantages next js has over React
- Install next js
- Be able to create an application in Next js
- fetch an external API in next

So sit back, relax and enjoy the ride!!!
### OVERVIEW
- Introduction
- What is Next js
- Why you should use it
- Comparing Next with React
- Building a weather forecast app 

## What is Next js?
So what exactly is Next js ? Next.js is an open-source development framework built on top of Node.js that enables server-side rendering and the generation of static websites in React-based web apps.t's a JavaScript framework that lets you create ultrafast, user-friendly static websites and web applications with React. It's a fantastic tool for creating your future website. It includes a lot of fantastic features and benefits that could make Nextjs your first choice for developing your next web app which brings us to why you should use it.

## Why should you use it?
This framework has various advantages, both for client apps and for the development (frontend) team. Let’s take a look at some of the benefits.

- Rendering on the Server (SSR)
Next.js comes with an out-of-the-box server-side rendering (SSR) solution for React components. Developers can use Next.js to display JavaScript code on the server and provide simply indexable HTML to users. Before Next.js, this wasn't hard to accomplish. However, it necessitated a great deal of tinkering with issues like caching, server load, on-demand content, and the application's architecture. It all took time away from your ability to focus on your application's business logic.

- Improved Search Engine Optimization
I know this has been covered a lot, but it's worth noting that using SSR instead of client-rendered JavaScript can significantly increase your search engine exposure. You may design a web application with all of the functionality and interactivity you need while still reaping the SEO benefits of a static text-based website. And it will provide you a significant competitive advantage — according to the State of Frontend survey, more than half of developers do not consider SEO to be a critical component during development.

- Enhanced performance
Because Next.js prevents the browser from downloading and executing a large amount of JavaScript code at once, it has the potential to significantly improve metrics like time to first draw (TTFD). It determines how long it takes for a user to view the very first content on their screen, and should ideally be less than one second. 

- Static Site Generation
Assume you run a blogging site. The content of this type of website rarely changes once it is launched. As a result, no data from the client or server is required. Everything is on the HTML and CSS pages. As a result, the browser merely needs to parse them and possibly a small amount of javascript. Static sites were the name for this type of website. Because they have fewer duties to fulfill, they are extremely fast. We can produce static HTML at build time with Nextjs and no longer have to worry about it.


## Comparing Next.js with React

Since Next.js is a React framework then why compare it with its library? Well, as developers we tend to favor a library or framework over the other depending on taste. I’m sure React fans take Next.js and really enjoy working with it in their projects. In this article, i’ll be comparing them according to



- Speed of coding
- Performance
- Features
- Documentation
- Community

    So let’s get started!!


### Speed of coding


In React, You must first develop a component and then add it to the router in order to create pages for a React project.To make a page for the Next.js project, simply place it in the pages folder and link it to the required header component. This simplifies your life by reducing the amount of code you write and making the project easier to follow.

Create React App is a wonderful approach to learning React if you're just starting started with it. If you want to utilize React to create a Single Page Application, the CRA will offer you a head start (SPA).

Because Create React App simply creates the front-end assembly, you can use it with any server you choose, including Node. You should also be aware that CRA employs Babel and Webpack behind the scenes, but you don't need to know anything about them.

To put it another way, Create React App is a tool that saves you time and effort when it comes to setting up and customizing your development environment. All you have to do is run one command to get all of the tools you'll need to run your React project up and running. So, rather than wasting time on modification, you can go right to work on developing your program.


### Performance

Because of static sites and server-side rendering, Next.js apps are lightning-fast. They work by default, thanks to a slew of performance-enhancing technologies like Image Optimization, which debuted in Next 10.

As a result, if you use Next.js, you'll get automatic server rendering and code splitting (which will improve performance). Furthermore, SSR (Server Side Rendering) will significantly increase your application's performance.

When it comes to React, there are a few things that rule it out of the discussion. It only supports client-side rendering out of the box, which is insufficient if you want to construct a high-performance application.


### Features

Next.js makes use of React to assist developers in creating single-page apps.

It has the following features:



- Rendering on the server (SSR)
- Exporting static data (SSG)
- Pre-rendering
- Build size optimization is done automatically.
- Compilation of code more quickly

All of these capabilities will assist you in developing a functional and ready-to-use application.

With frameworks like Redux, React can simply be extended to integrate functionality like routing and state management patterns. React is a simple framework that can be adapted for almost any project.


### Documentation

This is self-evident, but it is frequently overlooked. While the stylish home pages of certain frameworks may capture your eye, you'll still need additional courses, books, tutorials, and articles to get started, in addition to the monotonous and dry documentation.

In any software project, effective documentation may make it much easier to find out how to use the tools, which libraries to utilize, and so on. Both React and Next.js provide amazing documentation options.

Next.js includes a set of "learn-by-doing" documentation that leads you through tasks like component development and routing. React provides a similar setup, with multiple tutorials covering the fundamentals.

Check to browse the official React documentation to learn more about React at a high level. We also recommend reading the official Next.js documentation to obtain a better understanding of the framework.

In my opinion, next js only scores high in performance than React all others are even.

Now that we’ve taken a look at Next js and why you should use it, let’s move on to build a weather forecast application in Next .


### Requirements


### To get started you just need a basic understanding of javascript and react knowledge and also signup to openweathermap to make use of their API, it’s completely free. so head over to [https://openweathermap.org/api](https://openweathermap.org/api) and signup. Click on the API key, you should see something like this:
![api_key](build-a-weather-forecast-app-with-next-js/api_key.PNG)

You can choose to generate your own key which I recommend.


### Building A Weather Forecast Application

The first thing when creating a Next project is to install Next js by opening our terminal, navigating to the folder you want to install next on, run the command:
```bash
npm create-next-app next-weather-build
```
To make this easier I built the frontend which we will use for this project, I also included a JSON file containing a list of cities so all you have to do is visit my GitHub repo through this [link](https://github.com/oyedeletemitope/weather-tutorial-front) and clone and download the project, after that run :
```bash
npm install 
```
This will install our node modules for the project  you can decide to choose to install Next app and just copy the files into yours but be sure to install the following packages 
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
Npm run dev
```
This would start up our next project. If you have an issue with loading ‘SWC’ you can disable it and switch to babel by creating a  file called .babelrc in your project folder and input the following code:

```bash
{
    "presets": ["next/babel"]
  }
```
Rerun the server, that should take care of it  once you start the server  click on the localhost link you should see something like the image below:

![front-end.PNG](build-a-weather-forecast-app-with-next-js/front-end.PNG)

The first thing we want to work on is our `Searchbox.js`. We want to make sure that whenever we input a city it brings us a result, that matches our city if not is should tell us no result. In order for us to do this, we first need to import the city list which is a JSON format that should be in our lib folder we also want to import link from next as we’ll be using that also.

```javascript
import cities from "../lib/city.list.json";
import Link from "next/link";
import Router from "next/router";
```

NOTE: the import should be on top of the page
Then below it add the following codes:

```javascript
export default function SearchBox({placeholder}) {
    const [query, setQuery ] = React.useState("");
    const[results, setResults] = React.useState([]);


    const onChange = (e)=>{
        const {value} = e.target;


        setQuery(value);
  };
```


 What we did here is 
- create a state variable called query and also set our variable(react.usestate) state to an empty string. What we are trying to do is when we type in a value, we want the value to be saved to our query
- We also created a new state variable called results and gave it an empty string also but this will be responsible for showing our matching cities.
- The const OnChange is supposed to be attached to the input so when we type into our input we get an event that will give us the value. We also got our value and set it to our query,
Now we want to use our query and search against our city data to see if it matches: any of our cities. Let’s paste in the following codes right after our setQuery(value) before the closing curly braces:

```javascript
 let matchingCities=[];

        if(value.length > 3){
            for(let city of cities){
                if (matchingCities.length >= 5){
                    break;
                }

                const match = city.name.toLowerCase().startsWith(value.toLowerCase());

                if(match){
                    const cityData = {
                        ...city,
                        slug: `${city.name.toLowerCase().replace(/ /g,"-")}-${city.id}`
                    }
                    matchingCities.push(cityData);
                }
            }
        }


        return setResults(matchingCities);
```
So what we did above code is that if our type in more than 3 characters it should map through the cities and bring out the results matching our value, making us not search unnecessarily. We also created a slug to create a unique page name and display through our results, so we can use our slugs to find out which area so when we create our weather page for each city, we know which one we are referring to through our results.

So lets add our value to our input tag:

```javascript
value={query}onChange={onChange}
```
Lets also callout our query as this makes our matching cities accessible via results.now lets do some conditional logic and  map through our results, using the city.slug as our key so we can show them on the screen. Right after our input tag, write the following codes:

```javascript
{query.length > 3 &&(
                <ul>
                    {results.length > 0 ?(
                        results.map((city)=>(
                            <li key={city.slug}>
                                <Link href={`/location/${city.slug}`}>
                                    <a>
                                        {city.name}
                                        {city.state? `, ${city.state}` :""}{" "}
                                        <span>({city.country})</span>
                                    </a>
                                </Link>
                            </li>
                        ))
                    ): ( <li className="search__no-results">NO results</li>
                    )}
                </ul>
            )}
```
![searchbox](/engineering-education/build-a-weather-forecast-app-with-next-js/first pic.PNG)

### DISPLAYING OUR MATCHING CITIES:

Now lets navigate to a folder called location which is inside our pages folder, locate the file called `[city].js.` That’s what we’ll be working on next. Top of the page let’s import our city list  file:

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
We want this page to access any kind of dynamic slug that we’re going to make. This is where next js comes in like said earlier next is server side rendered meaning we can grab the data before the page loads unlike just using react where we have to wait before the page loads before grabbing the data. We’ll be using the get serversideprops and then pass in so let’s paste 

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
What we did here was that we used a function `getserversideprops` the serversideprops since our data is likely to change(our data is live weather data which is subject to change)if our data wasn’t changing we would use getstaticprops. we also did a conditional statement sting that if not city return not true 

The  next thing we want to do is make use of our environment variables this is where we have to input the API link so let’s first create a .env file, name it .env.local here we’ll be creating an API key and making it equal to the API key of our open weather map like this:
```bash
    API_KEY =78b705a31f5b7bebcfe38a2624152e8d
```
Next, we head over to our next.config.js clear and paste this:

```bash
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
Here we are basically making a request to our API and fetch the data Noticed I set the units to Celcius, we also excluded some data like the minute data and did a conditional statement to check if the data is available or not, if it returns our city data as props grabbing the city from our context if nott, return not found.

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
 This will basically help us get the id or our city and if there isn’t return null. (no data collected). To  get our hourly weather data let’s paste in this code:


```javascript
const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);

  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};
```
Here we wrote a function to get hourly data, create a variable where we called moments which basically helps us get current time then we passed in the timezone we created variable to which will use to divide by 1000 since openweather is giving us our value in milliseconds and we want it to be in seconds. We attributed it to our todaysData.

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
 Then we lets clear what wewere returning under it and paste this:

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
Here are go to be displaying hourly weather and todaysweather by passing them down to their components so we can access the data. The link and the search is just for us to be able to go back or search for another city Now we’ve done all the hard job. If you got it up to this level youre a genius already!!!

### DISPLAYING TODAY’S WEATHER

Let's navigate to the folder called components and click on todaysweather what we want to input the info we want to be displayed. First of let’s import the following packages:

```javascript
import moment from "moment-timezone";
import React from "react";
import Image from "next/image";
```
Next inside the bracketsa of our functions lets pass in the props city and also the props weatherand timezone :

```javascript
{ city, weather, timezone }
```

Now what we want to do is render the city data and also the weather data. So inside our div classname lets paste in these:

```javascript
<h1>
            {city.name} ({city.country})
          </h1>

          <h2>
            <span>{weather.temp.max.toFixed(0)}&deg;C</span>
            <span>{weather.temp.min.toFixed(0)}&deg;C</span>
          </h2>
```

Next after our span sunrise lets paste this:

```javascript
 <span>
                {moment.unix(weather.sunrise).tz(timezone).format("LT")}
              </span>
```
And under our span sunset, lets paste these:

```javascript
<span>
                {moment.unix(weather.sunset).tz(timezone).format("LT")}
              </span>
```
 Now lets paste in some image icons that openweather allows us to use under the div icon wrapper is another div under that lets paste this:

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

### HOURLYWEATHER

Navigate to file ‘Hourlyweather’ still under the folder components. Just like we did for todays weather we want to render the weather data. First we want import the following:

```javascript
import React from 'react';
import moment from 'moment-timezone';
import Image from 'next/image';
```
Next inside the brackets of our export function city we paste this:

```javascript
{hourlyWeather,timezone}
```
Next after our `div` hourly weaher lets paste in this:

```javascript
   <div className="hourly__inner">
                {hourlyWeather.length > 0 && hourlyWeather.map((weather, index)=>(
                    <div className="hourly__box-wrapper" key={weather.dt}>
                        <div className="hourly__box">
                            <span className={`hourly__time ${index==0 ? 'hourly__time-now':""}`}>


                                {index == 0? "NOW" :moment.unix(weather.dt).tz(timezone).format("LT")}
                            </span>
                            <Image
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            width="100"
                            height="100"/>
                            <span>{weather.temp.toFixed(0)}&deg;C</span>
                        </div>

                    </div>
                ))}

            </div>
```
 So just like our todayswather we are rendering  our weather data(weather, format, displaying an image icon from our openweather) or result should be like this:
 ![final result](build-a-weather-forecast-app-with-next-js/final result.PNG)

If you have something like that then congratulations you just built yourself a weather forecast application!!  when we search for another city while still under the city page what we want to do is that we want to listen to the page change so that when our page changes it sets our query to nothing to this let’s paste in these codes inside our Searchbox right after the two variable states we created :

```javascript
React.useEffect(()=>{

     const clearQuery=()=>setQuery("");

 

     Router.events.on("routeChangeComplete",clearQuery)

     return () =>{

        Router.events.off("routeChangeComplete",clearQuery)

     }

    },[])
```
We used use effect to open up a function and inside we created a mini function called clear query and made use of Next js route  so the route will tell us when we change pages and when it does clear the query, the square basically means the function will happen when the search box mounts. Now we’re done

### CONCLUSION 

So in this tutorial we've learned what next js is all about when to use them, we also compared it with just using the create react app, and let's not forget we built a weather app in next js. Job well-done guys. Here’s a [link](https://github.com/oyedeletemitope/next-weather-app) to the project on github all you have to do is create your own `.env file`. Would you please share if you found this helpful.


