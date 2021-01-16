React is a popular platform for creating rich and interactive single page web applications. Some of the major companies that use react include Facebook, Twitter, and Airbnb. Therefore, knowing React, particularly how to consume data from an API, can be a positive addition to your CV.

### Introduction

Application Programming Interface, denoted by `API`, allows developers to access and use data from third parties. Today, there are many free and paid APIs. For example, some APIs provide information about movies, animals, weather, and even financial records. Many developers prefer APIs because it helps save significant resources. Therefore, the time that could have been spent building a back-end application can be invested in other applications. In `React`, using an API allows developers to focus on the front-side application. This means that they have enough time to create a visually appealing website.

### Prerequisites

To follow along in this tutorial, you must have:

 - Some knowledge in using React and Bootstrap.
 
 - npm installed on your computer.
 
 - Node.js server.

### Goal

To create a react application that consumes data from an API

Now that we have got the introduction out of the way, let's jump into the cool stuff.

### Step 1 – Understand the data coming from the API

Before creating any react web application, it's vital to evaluate the type of information presented by the API. Some of the areas to look at include `variables names,` `types,` `dates,` and `arrays.` Data from an API is commonly presented in a `JSON` format. This makes it much easier for it to be consumed in the application.
In this tutorial, we will be using [omdapi](http://www.omdbapi.com/). One needs a valid key to gain access to this API. This key can be generated from the omdapi website and looks something like this `cebd9b53`.

The `key` is included in the `API` request, as shown.

```
http://www.omdbapi.com/?i=tt3896198&apikey=cebd9b53
```
When we navigate to the above link in a browser, it returns `JSON` data as shown below.

```json
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
In the above `JSON` response, the variables include `Title,` `Year,` `Rated,` `Released,` `Runtime,` and `Genre.`

### Step 2: Creating a react project.

We create a React application using the following `npx` command.

```
npx create-react-app omdapi
```
Once you execute the above statement, you have to give it a few minutes to enable the installation of the required dependencies. You can then open the folder in your preferred code editor when the installation is completed. Please note that to use `npx,` you must have `npm` installed.

### Step 3: Understanding the react project structure

All the files we will be working with are located in the `src` folder. These files will be compiled and shown to the user. The `public` folder stores all of the compiled files. The `App.js` helps to connect different `UI` components. The `index.css` stores the formatting properties of the body tag on the web page. The `App.css,` on the other hand, helps format individual components. The `node_modules` folder stores all the required React dependencies. The image below shows the overall structure of the React application.

![structure](/engineering-education/how-to-consume-data-from-an-API-using-react/structure.png)

### Step 4: Developing the react application

Use `npm start ` to start the development server. All changes you make in the code editor are reflected in the application. By default, the react projects are usually hosted at `http://localhost:3000/`.
Let’s delete all the unnecessary items in our project. Modify the `app.js` file to look like this.

```javascript
function App() {
  return (
    <div className="App">
      // we will add our components here
      <Movie/>
    </div>
  );
}
export default App;
```

Our app will have two major components: `Movie` page and `MovieItem`. The movie page will showcase the `movies` returned from the API, while the `MovieItem` presents precise information about the film. In other words, the `Movie` page hosts the `MovieItem`. Let’s create these items.

### Step 5: Creating the Movie web page

Please note that this page will hold our logic for requesting and handling data from the omdapi. To get started, create a new folder named components in the src directory. In the components folder, create a file called Movie.js. Before we move forward, we need to import `useEffect` and `useState`. We do so by adding the following line in the `Movie.js` file.

```javascript
import React, {useEffect, useState} from 'react';
```

The `useEffect` allows `React` to perform a specific action after a web page is loaded. In our case, we will use `useEffect` to make network requests to the API.
`useState` method will help in state management. It ensures that `UI` components are updated in case there of any data changes. 

The next step is to create a function named `Movie`, as shown below.

```javascript
Function Movie(){
}
```

We will add other logic and elements in the above `Movie` component.

We need to define several constants in the Movie component. 

```javascript
const [movie, setMovie]=useState([]);
const [search, setSearch]= useState('');
const [userquery, setUserQuery] = useState('chicken');
const API_KEY = "cebd9b53";
const url = `http://www.omdbapi.com/?t=${userquery}&apikey=${API_KEY}`;
```

The `movie` will hold data returned from the omdAPI. The `setMovie` helps in changing the contents of the movie.
The search variable will help retrieve user input. This value is updated by the `setSearch` function whenever the user enters a value in the input field.
Finally, the `userquery` and `setUserQuery` hold the actual values that will be sent to the `omdapi` to perform a search. Let's dive into the actual methods.

#### 1.	getMovie
This method will be called whenever the page is reloaded. It will make a request to the API and return a movie object. The `getMovie` function uses async and await. This is because network operations may take some time before they are completed. We, therefore, need to wait for the result. When we get the response, we convert it into JSON and store it in the movie variable. Here is the code for the `getMovie` object.
```
const getMovie = async()=>{
  const response = await fetch(url);
  const data = await response.json()
  setMovie(data);
};
```
#### 2.	getInput
This method helps in getting the users' input before a query is performed. It listens for changes in the input field. The entered value is then updated using the setSearch method.

```javascript
const getInput = e =>{
  setSearch(e.target.value);
}
```
#### 3.	getSearch
This method is executed when a user clicks on the `search` button. It updates the `userquery` variable using the `setUserQuery` function. This function also prevents the page from reloading when the `form` is submitted.

```javascript
const getSearch = e =>{
  e.preventDefault(); //prevents page from reloading
  setUserQuery(search); //updating the value for the search variable
}
```
#### 4.	useEffect
As noted, this method is executed after the components are rendered. We will fetch data from the API in this function. We will also listen for changes in the query. 

```javascript
useEffect(()=>{
    getMovie(); //fetch data from api
}, [userquery]); //listens for changes in the userquery
```

### Step 6 – Returning the component
When we fetch data, we need to display it to the user. The web page will have a `form` (one input field and a button). It will also have a `MovieItem` (displays actual movie data), which we will create in the next step. Here is the code for our MovieItem layout.

```javascript
return(
  <div>
  <br/>
  <form onSubmit={getSearch}>
      <input type="text" value={search} onChange={getInput}/>
      <button type="submit">Search</button>
  </form>
  <br/>
  <MovieItem  title = {movie.Title} year={movie.Year} writer = {movie.Writer} poster ={movie.Poster}/>
 </div>
);
```

As shown above, the `getSearch` method is called whenever the form is submitted. Similarly, we listen for changes in the input value using the `getInput` function.
Since we are returning a JSON object rather than an array, there is no need to loop through it. We use `{movie.Title} ` to extract data and pass it to the `MovieItem` component.

Here is the code for the `Movie.js` component

```javascript
import React, {useEffect, useState} from 'react';
import MovieItem from './MovieItem.js'

function Movie(){
    const [movie, setMovie]=useState([]);
    const [search, setSearch]= useState('');
    const [userquery, setUserQuery] = useState('chicken');
    const API_KEY = "cebd9b53";
    const url = `http://www.omdbapi.com/?t=${userquery}&apikey=${API_KEY}`;

    const getMovie = async()=>{
        const response = await fetch(url);
        const data = await response.json()
        setMovie(data);
    };

    const getInput = e =>{
        setSearch(e.target.value);
    }

    const getSearch = e =>{
        e.preventDefault();
        setUserQuery(search);
    }

    useEffect(()=>{
        getMovie();
    },[userquery]);

    return(
        <div>
        <br/>
            <form onSubmit={getSearch}>
                <input type="text" value={search} onChange={ getInput}/>
                <button type="submit">Search</button>
            </form>
            <br/>

        <MovieItem  title = {movie.Title} year={movie.Year} writer = {movie.Writer} poster ={movie.Poster}/> //this movie item is created in the next step

    </div>

    );
}

export default Movie;
```

### Step 7: Creating the MovieItem component

Create a new file named `MovieItem.js` in the `components` folder. Add the following line to import the required dependencies.

```javascript
import React from 'react';
```

The `MovieItem` widget will have an image, heading, and paragraph tags. We will receive data from the parent widget through a constructor, as shown.

```javascript
MovieItem = ({title, year, writer, poster})
```

This data is then parsed to the specific widgets. Remember to add `export default MovieItem` at the end of the file.
Here is the code for the MovieItem.js

```javascript
import React from 'react';

const MovieItem = ({title, year, writer, poster})=>{
  return (
    <div className="Movie">
      <img src={poster} alt=""/>
      <h4>Title: {title}</h4>
      <p>Year: {year}</p>
      <p>Writer: {writer}</p>
     <p></p>
    </div>
  );
}

export default MovieItem;
```

### Step 8: Linking components

In this stage, we need to link our movie component to the main app layout. Open the App.js file and add <Movie/> as shown below. Once again, ensure that you have imported the Movie component.

```javascript
import './App.css';
import Movie from './components/Movie.js';

function App() {
  return (
    <div className="App">
      <Movie/>
    </div>
  );
}

export default App;
```

### Step 9: Testing our web application

If you have successfully reached this stage, congratulations. Follow the steps in the video below to test out the web application.

<iframe width="478" height="269" src="https://www.youtube.com/embed/lud9SWK8pmo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion

In the above tutorial, we have learned how to fetch and consume data from an API. We use async and await when performing network operations. Furthermore, useEffects and useState help in state management. This means that we can update our UI components in case our data changes. You can download the entire code from [here](https://github.com/WanjaMIKE/react-omdapi/).
