---
layout: engineering-education
status: publish
published: true
url: /building-a-lyrics-search-app-using-vanilla-javascript-with-ovh-api/
title: Building a Lyrics Search App using Vanilla JavaScript with OVH API
description: This tutorial will help the reader to understand how to build a search app using Vanilla JavaScript and OVH API.
author: bobate-segun
date: 2022-02-01T00:00:00-02:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-lyrics-search-app-using-vanilla-javascript-with-ovh-api/hero.png
    alt: Building a Lyrics Search App Hero Image
---
Not knowing the lyrics of a song is a problem most song-lovers encounter. In this article, we will create a platform where users can search for lyrics by entering the name of an artist or song title.
<!--more-->
We will create the lyrics web application using *HTML5, CSS3, Vanilla JavaScript*, async-await with *fetch()* method, *OVH API*, and *ECMAScript 2015 (ES6)* arrow functions. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Structuring the lyrics search app with HTML5](#structuring-the-lyrics-search-app-with-html5)
- [Designing the lyrics search app](#designing-the-lyrics-search-app)
- [A brief introduction To OVH API](#a-brief-introduction-to-ovh-api)
- [Adding functionality with JavaScript](#adding-functionality-with-javascript)
- [Testing the current state Of the web app](#testing-the-current-state-of-the-web-app)
- [Inner - HTML](#inner-html)
- [GetLyrics() - Async function](#getlyrics-async-function)
- [Styling and centering the lyrics](#styling-and-centering-the-lyrics)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need:
- A code editor such as Visual Studio Code.
- Basic knowledge of *HTML5, CSS, and JavaScript*.
- A computer with an internet connection.

### Structuring the lyrics search app with HTML5
To begin, create a folder named `lyrics-app`, and add three files in the folder: `lyrics.html`, `lyrics.css`, and `lyrics.js`.

We will use HTML5 to structure the lyrics search app. This section deals with the `lyrics.html`.

In the `head` tag of the HTML file, you will input pre-defined meta tags that are essential for all web apps.

We will also link the CSS file to the HTML file and give the web app the title of `Lyrics Search App`.

Next, create a `div` with a class `container`. This `div` will contain other `div`s that will be created later.

Add another `div` with a class `intro-text` with two other `h1` and `h2` tags, respectively.

The content of the `h1` tag is `Learn your favorite song` while the `h2` tag will contain `song lyrics`.

Inside the `div` with a class `container`, you will create a `div` with an `id` of `lyrics-search` where we create a form containing an input field, and also another `div` to display fetched lyrics. 

Your HTML code should look as follows:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="lyrics.css"/>
    <title>Lyrics Search App</title>
</head>
<body>
    <div class="container">
        <div class="intro-text">
            <h1>Learn your favorite</h1>
            <h2>song lyrics</h2>
        </div>
        <div id="lyrics-search">
            <form action="" id="searchMe">
                <input type="text" id="lyricSearch" placeholder="artist name or song title"/>
            </form>
            <div id="search-result">
                
            </div>
        </div>
    </div>
    <script src="lyrics.js">
        
    </script>
</body>
</html>
```

### Designing the lyrics search app
The next step is to design the web app with CSS (`Lyrics.css`). 

First, style the overall HTML, body, and the `div` with the class `container` which embodies all other `divs`.

```css
html {
    box-sizing:border-box;
}

/**Use pseudo elements to set some static styles**/
*,
*:before,
*:after {
    margin:0;
    Padding:0;
}

body {
    background:#333333;
}

.container {
    margin:0 auto;
}
```

Next, style the contents of the `body` tag - starting from the text that defines what the web app does to the placeholder, and input field:

```css
/**This is how placeholders are styled**/
::placeholder {
    color:gold;
}
```

We now need to style up the page description with the text `Learn your favorite song lyrics` as shown below:

```css
/**Styling the intro text `div` which has the content of “learn your favorite song” lyrics**/
.intro-text {
    font-family: Verdana, Geneva, Tahoma, sans-serif;/**If the device doesn't have any of the first three font-family sans-serif will automatically be used **/
    padding:2rem 0;
    color:gold;
}

/**Styling the h1 header(learn your favourite):centering the h1 element**/
h1 {
    text-align:center;
    padding:1rem 0;
}

/**Styling the h1 header(learn your favourite):centering the h1 element**/
h2 {
    text-align:center;
    padding:1rem 0;
}
 /**You can use the comma-separated form of styling tags with the same properties. 
```

Centering the `div` container where the form and input field are embedded, using its `id` (`lyrics-search`).

```css
#lyrics-search {
    text-align:center;
    align-items:center;
    margin:20px;
    padding:20px;
}
```

Finally, style the form and the input field as follows:

```css
form {
    margin:0 auto;
    padding-left:10rem;
}

/**style the input field using its id(lyricSearch)**/
#lyricSearch {
    background-color: transparent;
    color:#eeeeee;
    outline:none;
    height:30px;
    width:64%;
    margin:0 auto;
    padding-right:2rem;
    font-size:16px;
    font-family:cursive;
    outline-style:none;
    border-top:none;
    border-left:none;
    border-right:none;
    border-bottom:1px solid #eeeeee;
}
```

We have now successfully designed the web page by adding colors, font sizes, font family, padding, and margin.

Here is what your web page should look like:

![Screenshot for design](/engineering-education/building-a-lyrics-search-app-using-vanilla-javascript-with-ovh-api/design-screenshot.png)

### A brief introduction to OVH API
OVH API is a simple API that helps us retrieve the lyrics of a song. We use two parameters to fetch data (lyrics). These are:
- Artist's name.
- Title of the song.

When a request is made, data is returned in JSON format. We also get two status codes:
- Status code 200 means that the API call is successful.
- Status code 404 indicates that the API call failed.

You can read more about the OVH API [here](https://api.lyrics.ovh/v1/artist/title).

An example of the URL in action looks like this: `https://api.lyrics.ovh/v1/Drake/Toosie Slide`.

In the example above, `Drake` stands as the artist's name, and `Toosie Slide` is the song title.

### Adding functionality with JavaScript
In your `lyrics.js` file, declare variables and use the DOM selectors to connect with elements in the `lyrics.html` file, using the code snippet below:

```js
//defining variables
const form = document.getElementById("searchMe"); //target the form tag in the html file
const search = document.getElementById("lyricSearch"); //target the input field
const output = document.getElementById("search-result"); //target the output `div`
```

The desired API to retrieve data (lyrics) for this web app is [OVH API](https://api.lyrics.ovh).

Declare the *API URL* using the code below:

```JavaScript
const api = "https://api.lyrics.ovh";
```

The next phase is to submit the form. You will define what would happen if the input field has a value or is empty.

To do this, create an event listener using DOM events to listen for a submit event. Note that we can't use the click event since we do not have a button.

Here is the code snippet for this functionality:

```js
// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("Nothing to search");
    } else {
        startSearch(searchValue);
    }
})
```

In the code above:
- You listened for a submit event after which you declared a variable `searchValue` to be equal to `search.value.trim()`. The `trim()` method simply removes whitespaces.

- if the `searchValue` equals an empty string, the app shows an alert message, otherwise, it invokes the `startSearch()` function and takes the `searchValue` as an argument.

It is highly recommended to go through the [OVH API documentation](https://api.lyrics.ovh) before proceeding.

Now, we can use *async-await* with the fetch method to retrieve data from the OVH lyrics API.

Here is the code snippet to fetch the data:

```js
async function startSearch(searchValue) {
    const searchResult = await fetch(`${api}/suggest/${searchValue}`);
    const data = await searchResult.json();
    console.log(data);
    showData(data);
}
```

### Testing the current state of the web app
We need to test if the web app is returning data from the OVH API when you input the title of a song or artist's name in the search field.

First, comment out the `showData` function in the code snippet above (remember to uncomment the `showData` function later).

Launch the web app using the [live server vscode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Type in a song in the search field (note that some suggested song lyrics are not available on this API).

Console log the result (To access the console, right-click inside the webpage, click the inspect option then navigate to the console in the chrome dev tools).

Your screen should be like the screenshot below:

![Screenshot for consoled data](/engineering-education/building-a-lyrics-search-app-using-vanilla-javascript-with-ovh-api/console-screenshot.png)

In the screenshot above, I searched for a song with the title of `cast`.

We need to create a function `showData()` that displays the data in the console. The `showData()` method is called from the `startSearch()` function.

Here is the code for the `showData()` function:

```js
// Display Search Result
function showData(data) {
    output.innerHTML = `
    <ul class="lyrics">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}
```

The above function will display lyrics inside an empty `div` in the `lyrics.html` file.

### Inner - HTML
This is the DOM property that either sets or retrieves the content of an HTML element. 

We will set the content of the empty `div` in the `lyrics.html` file to display the lyrics' suggestions in a list form.

The data from the API has some set of objects with properties that we want to display on the webpage.

Our concern is how to display the song title and song artist's name on the webpage.

`map()` is one of the most used methods. It returns a new array based on the values of the existing array. 

For example, we have a `numbers` array and we want to multiply each value by 3 and add them to a new array:

```js
const numbers = [2 , 4, 6, 8];
const tripleNo = numbers.map(tripleNum);
function tripleNum(number) {
   return number * 3;
}
console.log(tripleNo);//logs [6,12,18,24]
```

Normally, to access the song title and artist's name, you would have invoked `data.data.title` for the song title and `data.data.artist.name` for the artist's name. If you recall, the argument - song represents the resulting data. 

Since we have mapped the data, you can access the song title using `song.title` as well as the artist's name by using `song.artist.name`.

The following code helps us listen for a click event inside the output InnerHTML:

```js
//event listener in get lyrics button
output.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle);
    }
})
```

The code above helps to know if the clicked element is the span tag (i.e if the variable `clickedElement` contains `span` as `tagName`). If so, the statement in the `if` block is executed. 

You will store the attribute `data-song.title` in the variable `songTitle` as well as the attribute `data-artist` in the variable `artist`, which the `getLyrics()` function takes in the two variables as parameters.

Note that arguments are the actual values passed to a function when it is invoked, while parameters are the values passed when a function is defined. 

### GetLyrics() - Async function
This is the most important function because it allows us to display the song lyrics.

The function takes in two parameters, `artist` and `songTitle` respectively. Recall that you can search for lyrics by inputting either the artist's name or the song title. 

Below is the code for `getLyrics()` function:

```js
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${api}/v1/${artist}/${songTitle}`);
    const data = await response.json();
  
    const lyrics = data.lyrics;
    if (lyrics === undefined){
        alert('lyrics doesnt exist in this api');
        console.log('lyrics doesnt exist in this api');
    }
  
    output.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p id="lyrics-display">${lyrics}</p>`; 
}
```

> Note, the OVH API doesn't have access to all the lyrics, under its free version. If you wish to have access to all the lyrics, I would suggest you get a paid version.

If a particular lyric is not available, it will show `undefined` in the `div`. It also alerts you that the lyrics are not available on the API.

Next, you can decide to implement Regular Expression (REGEX) syntax in the variable lyrics using the `replace` method by adding `.replace(/(\r\n|\r|\n)/g ,'<br>');` to the lyrics variable:

```js
const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g ,'<br>');
```

This will return well-aligned lyrics that can be displayed on the webpage.

REGEX usage helps to look through our data (lyrics) for:
- Carriage returned alone.
- Carriage returned with a new line. 

If any of the instances defined above are found, the `replace()` method replaces it with the `<br>` (break line). 

The `/g` is a regular expression flag, it means globally. The entire data (lyrics) should be searched through (for all matches).

The lyrics will be displayed in the paragraph tag when the span tag is clicked.

### Styling and centering the lyrics
Navigate to your CSS file and add the code below to style and center the lyrics:

```css
.lyrics {
    width: 70%;
    list-style: none;
    margin: 0 auto;
    padding: 2rem 0;
}

.lyrics li {
    font-size: 1.4rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid  gold;
}

.lyrics li span {
    font-size: 1.4rem;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
}

.lyrics li span:hover {
    background-color: lightyellow;
}

/*styling the button to get the lyrics*/
.btn {
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    outline: none;
    border-radius: 3px;
    text-decoration: none;
    font-size: 1.2rem;
    cursor: pointer;
    background-color: gold;
    color: white;
}
```

You can find the full JavaScript code here:

```js
//defining the variables
const form = document.getElementById("searchMe");//target the form tag in the html file
const search = document.getElementById("lyricSearch");//target th input field
const output = document.getElementById("search-result");

const api = "https://api.lyrics.ovh";

//structuring how the result will be displayed using the suggestion mode the API supports
function showData(data) {
    output.innerHTML = `
    <ul class="lyrics">
      ${data.data
        .map(song=> `<li>
                    <`div`>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </`div`>
                    <span class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

//declaring async function to fetch data from api
async function startSearch(searchValue) {
    const searchResult = await fetch(`${api}/suggest/${searchValue}`);
    const data = await searchResult.json();

    showData(data);
}

//calling the function that gets and displays the lyrics
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${api}/v1/${artist}/${songTitle}`);
    const data = await response.json();
  
    const lyrics = data.lyrics;
    if (lyrics === undefined){
        alert('lyrics doesnt exist in this api');
        console.log('lyrics does not exist in this api');
    }
  
    output.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p id="lyrics-display">${lyrics}</p>`;
  
}

//listening if the clicked event is on the span tag, so lyrics can be called and displayed
output.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})


//listening for a submit event

form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("Nothing to search");
    } else {
        startSearch(searchValue);
    }
})
```

### Conclusion
In this tutorial, we learned how to build a lyrics search app using *HTML5, CSS3, Vanilla JavaScript, OVH API*, alongside *ES6* features.

You can, therefore, use this knowledge to craft other quality and productive applications.

You can find the full source code on this [GitHub repository](https://github.com/shegz101/Lyrics-Web-App).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)