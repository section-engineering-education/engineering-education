---
layout: engineering-education
status: publish
published: true
url: /how-to-consume-data-from-an-api-in-react/
title: How to Consume Data from an API in a React application
description: This tutorial provides a detailed overview how to consume data from an API in a React application. We will learn how to fetch and consume data from an API. We will use async and await when performing network operations.
author: michael-barasa
date: 2021-01-21T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-consume-data-from-an-api-in-react/hero.png
    alt: How to consume data from an API in a React application image
---
API is the acronym for Application Programming Interface, which is a software intermediary that allows two applications to talk to each other. APIs typically serve data. You can either build your API or use third-party APIs. You need to make network requests to communicate back and forth between the API and your application.
<!--more-->
In this tutorial, you'll learn how to consume data from an API in a React application. 

### Prerequisites
To follow along in this tutorial, you must have a basic understanding of how to use React and JavaScript. 

You can learn more about React from [here](https://reactjs.org/docs/getting-started.html).

### Step 1: Understand the data from the API
Before consuming data from an API, it's important to understand the data that the API provides. Data from an API is commonly presented in a `JSON` format. This makes it much easier for it to be consumed in the application.

In this tutorial, we will be using [OMDb API](http://www.omdbapi.com/). You need an API key to gain access to this API. This API key can be generated from the OMDb API's [website](http://www.omdbapi.com/apikey.aspx). 

![signup](/engineering-education/how-to-consume-data-from-an-api-in-react/signup.png)

The API key will be sent to your email, as shown below.

![email](/engineering-education/how-to-consume-data-from-an-api-in-react/email.png)

> Note that the API key must be included in the API request, as shown:

```bash
http://www.omdbapi.com/?i=tt3896198&apikey={your_key}
```

When we navigate to the above link in a browser, the endpoint will return the JSON data as shown below.

```JSON
{
   "Title":"Guardians of the Galaxy Vol. 2",
   "Year":"2017",
   "Rated":"PG-13",
   "Released":"05 May 2017",
   "Runtime":"136 min",
   "Genre":"Action, Adventure, Comedy, Sci-Fi",
   "Director":"James Gunn",
   "Writer":"James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)",
   "Actors":"Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel",
   "Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
   "Language":"English",
   "Country":"USA",
   "Awards":"Nominated for 1 Oscar. Another 15 wins & 57 nominations.",
   "Poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
   "Ratings":[
      {
         "Source":"Internet Movie Database",
         "Value":"7.6/10"
      },
      {
         "Source":"Rotten Tomatoes",
         "Value":"85%"
      },
      {
         "Source":"Metacritic",
         "Value":"67/100"
      }
   ],
   "Metascore":"67",
   "imdbRating":"7.6",
   "imdbVotes":"562,796",
   "imdbID":"tt3896198",
   "Type":"movie",
   "DVD":"N/A",
   "BoxOffice":"$389,813,101",
   "Production":"Marvel Studios, Walt Disney Pictures",
   "Website":"N/A",
   "Response":"True"
}
```

In the above `JSON` response, we have data like the `Title,` `Year,` `Rated,` `Released,` `Runtime,` `Genre`, etc, of the movie Guardians of the Galaxy Vol. 2.

### Step 2: Creating a react project
Let's create a React application using the following command:

```bash
npx create-react-app omdbapi
```

Once you run the above statement, it'll take a few minutes to install the required dependencies. Once the project is created, you can open the folder in your preferred code editor.

### Step 3: Project structure
All the files that we'll be working with are located in the `src` folder. These files will be compiled and shown to the user.

The image below shows the overall structure of the React application.

![structure](/engineering-education/how-to-consume-data-from-an-api-in-react/structure.png)

### Step 4: Developing the react application
Use `npm start` to start the development server. By default, the react projects are usually hosted at `http://localhost:3000/`.

We'll write all of our code in the `App.js`. Modify the `App.js` file to look like this before we start.

```JSX
import React from 'react';

function App() {
  return (
    <div className="App">
    
    </div>
  );
}

export default App;
```

We should import `useEffect` and `useState` into this component.

```JSX
import React, {useEffect, useState} from 'react';
```

The `useEffect` hook allows `React` to perform a specific action when the state changes. In our case, we will use `useEffect` to make network requests to the API when the component mounts for the first time.

The `useState` hook will help create a state and a function to update that state. When you update a state, the component will re-render.

Let's create a state for the movie. The `movie` state will hold the `object` or data returned from the OMDb API. The `setMovie` helps in updating the `movie` state.

```JSX
const movie, setMovie = useState({});
```

Next, let's create a state to hold the search input from the user. This value is updated by the `setSearch` function whenever the user enters a value in the input field. 

```JSX
const [search, setSearch] = useState('');
```

The search query value is added to the search URL.

```JSX
const API_KEY = "your_api_key";
const url = `http://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`;
```

The `App` component will also has several functions. 

They are:

#### getMovie
This method will be called whenever the search button is clicked. It will request the API and return a movie object.

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's, such as eventual success value or failure reason. 

This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future. 

A Promise can either be in one of the following states:

- Pending: It means that the Promise has neither been rejected nor completed.

- Fulfilled: It means the operation was successful.

- Rejected: This state means that the operation failed.

When a Promise is pending, it can either be completed successfully or rejected. The `then` method helps handle any of the resulting states.

Here is an example of handling a promise:

```JSX
const dataPromise = (new Promise(fetchData))
  .then(() => {
      // handleData1
  })
  .then(() => {
      // handleData2
   })
  .catch(() => {
      // handleError
   });
```

As shown above, we handle the Promise if it is rejected in the catch block.

The `getMovie` is an async function. An async function is a function declared with the async keyword. Async functions are instances of the AsyncFunction constructor, and the await keyword is allowed within them.

```JSX
async getData(){
  //do something
  //await statement
}
```

This is because network operations are asynchronous. Therefore, an API request will return a promise and we should wait for the promise to get resolved. The promise will be resolved if the API request is successful. If not, the promise will be rejected.

The `await` keyword allows you to wait for a Promise to get resolved.

```JSX
async getData(){
    var response = await fetch("your_url")
    console.log(response);
}
```

The above function will wait for the promise to be returned from the network request to be resolved and will print the response from the request.

You can learn more about async, await, and promise from [here](https://www.w3schools.com/js/js_promise.asp). This tutorial uses async and await methods.

We can handle server and network errors using a `try/catch` block. We send a network request inside the `try` block. If an error occurs, the catch block will be executed.

Here is the code for the `getMovie` function.

```JSX
const getMovie = async () => {
  try {
     const response = await fetch(url);
      const data = await response.json()
      setMovie(data);
   } catch (e) {
       console.error(e.toString);
   } 
}
```

This method is also executed when the component is rendered for the first time using the `useEffect` hook to load some initial data.

```JSX
useEffect(()=> {
   getMovie(); //fetch data from api
}, []);
```

#### onInputChange
This method helps update the search query state when the value of the input changes, the value of the search state is updated using the `setSearch` method.

```JSX
const onInputChange = e => {
   setSearch(e.target.value);
}
```

### Step 5: Building the UI
After we fetch the data, we should display it to the user. In the `App.js` file, we should include an input field and a button for search. The page also has an image, title, and paragraph tags. Here is the code for our app's layout.

```JSX
return(
   <div>
     <input type="text" value={search} onChange={onInputChange}/>
     <button type="submit" onClick={getMovie}>Search</button>
     <img src={movie.Poster} alt=""/>
     <h4>Title: {movie.Title}</h4>
     <p>Year: {movie.Year}</p>
     <p>Writer: {movie.Writer}</p>
   </div>
);
```

As shown above, the `getMovie` method is called whenever the button is clicked. 

The `onInputChange` function is called when the value of the input changes.

### Step 6: Handling errors
Errors are a common occurrence when dealing with an API. For this tutorial, we need to notify the user in case a movie is not found in the database. One key variable we can use to track the data is `Response`. 

The API returns the `Response` with a value of `True` when a movie is found and `False` if it's unavailable. We therefore, check the state of this variable.

To do this, we need a new method and an if-else statement. Create a method named `checkResponse` in the app.js file. Add the following code.

```JSX
function checkResponse(data){
   if(data.Response==="True"){
    return(
      <div>
         <img src={data.Poster} alt=""/>
         <h4>Title: {data.Title}</h4>
         <p>Year: {data.Year}</p>
         <p>Writer: {data.Writer}</p>
         <p>{data.Response}</p> 
      </div>
    );
   }

   return (
     <p>No Movie found</p>
   );
 }
```

A `No Movie Found` message is displayed in case the response is False.

> Note the `Response` variable stores a string rather than a boolean.

We need to replace the following code:

```JSX
return(
   <div>
      <img src={data.Poster} alt=""/>
      <h4>Title: {data.Title}</h4>
      <p>Year: {data.Year}</p>
      <p>Writer: {data.Writer}</p>
      <p>{data.Response}</p> 
   </div>
 );
```

With this:

```JSX
return(
   <div>
      <input type="text" value={search} onChange={onInputChange}/>
      <button type="submit" onClick={getMovie}>Search</button>
      <br></br>   
      {checkResponse(movie)}
   </div>
);
```

Here is the `App.js` code with the error handling part included.

```JSX
import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
    const [movie, setMovie] = useState({});
    const [search, setSearch] = useState('');
    
    const API_KEY = "<-- Your API Key here -->";
    const url = `http://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`;

    const getMovie = async()=>{
      try {
        const response = await fetch(url);
         const data = await response.json()
         setMovie(data);
      } catch (error) {
          console.error(error);
      } 
    }

    const onInputChange = e =>{
      setSearch(e.target.value);
    }

    useEffect(()=> {
      getMovie();
    }, []);


  function checkResponse(data){
     if(data.Response==="True"){
       return(
         <div>
            <img src={data.Poster} alt=""/>
            <h4>Title: {data.Title}</h4>
            <p>Year: {data.Year}</p>
            <p>Writer: {data.Writer}</p>
            <p>{data.Response}</p>
         </div>
       );
    }
      return (
        <p>No Movie found</p>
      );
    }

   return(
      <div>
         <input type="text" value={search} onChange={onInputChange}/>
         <button type="submit" onClick={getMovie}>Search</button>
         <br></br>   
         {checkResponse(movie)}
      </div>
   );
}

export default App;
```

### Step 7: Testing our web application
If you have successfully reached this stage, congratulations. Follow the steps in the video below to test out the web application.

![React App](/engineering-education/how-to-consume-data-from-an-api-in-react/app.gif)

### Conclusion
In this tutorial, we have learned how to fetch and consume data from an API. We use async and await when performing network operations. You can refer to the final code from this [GitHub Repository](https://github.com/WanjaMIKE/react-omdapi/).

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

