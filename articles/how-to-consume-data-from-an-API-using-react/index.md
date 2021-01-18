Application Programming Interface (API), allows developers to access and use data from third parties. Today, there are many free and paid APIs. For example, some APIs provide information about movies, animals, weather, and even financial records. Many developers prefer APIs because it helps save time and resources. The time that could have been spent building a back-end application can be invested elsewhere. In React, using an API allows developers to focus on the front-side application. This means that they have enough time to create a visually appealing website.

### Goal

The goal of this tutorial is to create a React application that consumes data from an API.

### Prerequisites

To follow along in this tutorial, you must have:

 - Basic knowledge in using React and JavaScript. 

 You can learn more about ReactJs from [here](https://reactjs.org/docs/getting-started.html).

### Step 1 – Understand the data coming from the API

Before consuming data from an API, it's vital to understand the type of data that the API provides. Data from an API is commonly presented in a `JSON` format. This makes it much easier for it to be consumed in the application.

In this tutorial, we will be using [OMDb API](http://www.omdbapi.com/). You need an API key to gain access to this API. This API key can be generated from the OMDb API's [website](http://www.omdbapi.com/apikey.aspx). 

![signup](/engineering-education/how-to-consume-data-from-an-API-using-react/signup.png)

The API key is usually sent to your email, as shown below.

![email](/engineering-education/how-to-consume-data-from-an-API-using-react/email.png)

> Note that the API key must be included in the API request, as shown:

```
http://www.omdbapi.com/?i=tt3896198&apikey={your_key}
```

When we navigate to the above link in a browser, the endpoint will return JSON data as shown below.

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
npx create-react-app OMDbApi
```
Once you execute the above statement, you have to give it a few minutes to enable the installation of the required dependencies. You can then open the folder in your preferred code editor when the installation is completed. Please note that to use `npx,` you must have `npm` installed.

### Step 3: Understanding the react project structure

All the files we will be working with are located in the `src` folder. These files will be compiled and shown to the user. 

- The `App.js` helps to connect different `UI` components. 

- The `index.css` stores the formatting properties of the body tag, as well as other React components. 

- The `App.css,` on the other hand, helps format individual components. 

- The `node_modules` folder stores all the required React dependencies. The image below shows the   overall structure of the React application.

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

Our app will have two major components: `Movie` page and `MovieItem`. The movie page will showcase the `movie` returned from the API, while the `MovieItem` presents precise information about the film. In other words, the `Movie` page hosts the `MovieItem`. Let’s create these items.

### Step 5: Creating the Movie web page

Please note that this page will hold our logic for requesting and handling data from the OMDb API. 
we need to import `useEffect` and `useState` in our react application. We do so by adding the following line in the `app.js` file.

```javascript
import React, {useEffect, useState} from 'react';
```

The `useEffect` allows `React` to perform a specific action when the state changes. In our case, we will use `useEffect` to make network requests to the API.
`useState` method will help in state management. It ensures that `UI` components are updated in case of any data changes. 

We need to define several constants in the `App.js` file. 

The `movie` will hold data returned from the OMDb API. The `setMovie` helps in changing the contents of the movie.

```javascript
 const [movie, setMovie] = useState([]);
 ```
The search variable will help retrieve user input. This value is updated by the `setSearch` function whenever the user enters a value in the input field. The final value is then added to the search url and a request sent to the server.

```javascript
const [search, setSearch] = useState('');
```
You can also have a constant for your API key or include it in your url directly.

```javascript
const API_KEY = "your_api_key";
const url = `http://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`;
```

The App component also has several functions which are discussed below.

#### 1.	getMovie

This method will be called whenever the search button is clicked. It will make a request to the API and return a movie object. The `getMovie` function uses async and await. This is because network operations may take some time before they are completed. We, therefore, need to wait for the result. When we get the response, we convert it into JSON and store it in the movie variable. Here is the code for the `getMovie` function.

```
    const getMovie = async()=>{
      const response = await fetch(url);
      const data = await response.json()
      setMovie(data);
    }
```
#### 2.	onInputChange

This method helps in updating the search query state when the value of the input changes, The value of the search state is updated using the `setSearch` method.

```javascript
   const onInputChange = e =>{
      setSearch(e.target.value);
    }
```

#### 4.	useEffect

As noted, this method is executed after the components are rendered. We will fetch data from the API in this function. We will also listen for changes in the query. 

```javascript
  useEffect(()=> {
      getMovie();//fetch data from api
    }, []);
```

### Step 6 – Returning the component

When we fetch data, we need to display it to the user. In the app.js file we need to include an input field and a button. The page also has a `MovieItem` (displays actual movie data), which we will create in the next step. Here is the code for the input and MovieItem components.

```javascript
    return(
      <div>
        <input type="text" value={search} onChange={onInputChange}/>
        <button type="submit" onClick={getMovie}>Search</button>
        <MovieItem  title = {movie.Title} year={movie.Year} writer = {movie.Writer} poster ={movie.Poster}/>
      </div>
    );
```

As shown above, the `getMovie` method is called whenever the button is clicked. Similarly, we listen for changes in the input value using the `onInputChange` function.

Since we are returning a JSON object rather than an array, there is no need to loop through it. We use `{movie.Title}`,`movie.Year`, and `movie.Writer` to extract data and pass it to the `MovieItem` component.

Here is the code for the `app.js` component

```javascript
import './App.css';
import React, {useEffect, useState} from 'react';
import MovieItem from './components/MovieItem.js'


function App() {
    const [movie, setMovie] = useState([]);
    const [search, setSearch] = useState('');
    const API_KEY = "cebd9b53";
    const url = `http://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`;

    const getMovie = async()=>{
      const response = await fetch(url);
      const data = await response.json()
      setMovie(data);
    }


    const onInputChange = e =>{
      setSearch(e.target.value);
    }

    useEffect(()=> {
      getMovie();
    }, []);

    return(
      <div>
        <input type="text" value={search} onChange={onInputChange}/>
        <button type="submit" onClick={getMovie}>Search</button>
        <MovieItem  title = {movie.Title} year={movie.Year} writer = {movie.Writer} poster ={movie.Poster}/>
        //movieitem
      </div>
    );

}

export default App;

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

In this stage, we need to link our MovieItem component to the main app layout. Open the App.js file and add <Movie/> as shown below. Once again, ensure that you have imported the MovieItem component.

```javascript
return(
      <div>
        <input type="text" value={search} onChange={onInputChange}/>
        <button type="submit" onClick={getMovie}>Search</button>
        <MovieItem  title = {movie.Title} year={movie.Year} writer = {movie.Writer} poster ={movie.Poster}/>
        //movieitem
      </div>
    );
```

### Step 9: Testing our web application

If you have successfully reached this stage, congratulations. Follow the steps in the video below to test out the web application.

<iframe width="478" height="269" src="https://www.youtube.com/embed/lud9SWK8pmo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion

In the above tutorial, we have learned how to fetch and consume data from an API. We use async and await when performing network operations. Furthermore, useEffects and useState help in state management. This means that we can update our UI components in case our data changes. You can download the entire code from [here](https://github.com/WanjaMIKE/react-omdapi/).
