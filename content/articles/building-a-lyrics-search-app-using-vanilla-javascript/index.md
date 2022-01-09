---
layout: engineering-education
status: publish
published: true
url: /building-a-lyrics-search-app-using-vanilla-javascript/
title: Building a Lyrics Search App Using Vanilla JavaScript With OVH API
description: This tutorial will help the reader understand how to build a search app using Vanilla JavaScript and OVH API. We will be using OVH API and async-await to dynamically load the fetched lyrics from the API.
author: bobate-olusegun
date: 2022-01-09T00:00:00-19:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-lyrics-search-app-using-vanilla-javascript/hero.png
    alt: Building a Lyrics Search App Using Vanilla JavaScript With OVH API Hero Image
---
Not knowing the lyrics of a song, is a problem most song-lovers encounter. In this article, you will be creating a platform where users can search for lyrics by entering the artist's name or the title of the song.
<!--more-->
You will be creating a web application using HTML5, CSS3, Vanilla JavaScript, async-await with fetch method, OVH API, and ECMAScript 2015 (ES6) features like arrow functions to build a search feature for lyrics. 

### Table of contents
- [Pre-requisites](#pre-requisites)
- [Structuring the lyrics search app with HTML5](#structuring-the-lyrics-search-app-with-html5)
- [Designing the lyrics search app](#designing-the-lyrics-search-app)
- [Brief Introduction To OVH API](#a-brief-introduction-to-ovh-api)
- [Adding functionality with JavaScript](#adding-functionality-with-javascript)
- [Testing the Current State Of the Web app](#testing-the-current-state-of-the-web-app)
- [Inner - HTML](#inner---html)
- [GetLyrics() async function](#getlyrics-async-function)
- [Styling and centering the lyrics](#styling-and-centering-the-lyrics)
- [Conclusion](#conclusion)

### Pre-requisites
To follow along with this tutorial, you need the following:
- A code editor (like Visual Studio Code).
- Basic knowledge of HTML5, CSS, and JavaScript.
- A laptop with an internet connection.

### Structuring the lyrics search app with HTML5
To begin, create a folder named `lyrics-app`, then you need to create three files in the folder: `lyrics.html`, `lyrics.css`, and `lyrics.js`.

For laying out the structure of the lyrics search app, you will use HTML5. This section deals with the `lyrics.html`.

- In the `head` tag of the HTML file, you will input the needed or pre-defined meta tags that are essential for all web apps.
- Also, you would link the CSS file to the HTML file and also give the web app a title of `Lyrics Search App` embedded within `title` tags.
- Next, you would create a `div` with a class of `container`. This is the `div` that would house other `div`s which you will create.
- Moving forward, you will create another `div` with a class of `intro-text` with two other separate headers `h1` and `h2` tag respectively.
- The content of the first text is `Learn your favourite`, it will be embedded in the `h1` tag, while the content of the second text is `song lyrics`, it will be embedded in the `h2` tag.

Inside the `div` with a class of `container`, you will create a `div` with `id` of `lyrics-search` where we create a form containing an input field, and also another `div` to display fetched lyrics. 

This is the code snippet for the structure of the web app:

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
            <h1>Learn your favourite</h1>
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
The next step is to design the web app with CSS by navigating to your CSS file. Here's the CSS for the structure (HTML code) of the web app:

First, style the overall HTML, body of the HTML, and the `div` with the class `container` which embodies all other divs.

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

Now, you are going to style the contents in the `body` tag, starting from the text that defines what the web app does, to the placeholder and then the input field.

```css
/**This is how placeholders are styled**/
::placeholder {
    color:gold;
}
```

Next, style up the page description text (`Learn your favorite song lyrics`) as shown:

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
 /**You might decide to use the comma-separated form of styling tags with the same properties. I decided to be more explicit here for the sake of clarity**/
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

You will complete the CSS code for now by styling up the form and the input field.

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

You have successfully designed the web page by adding colors, font-sizes, font-family, padding, margin, and so on, just to make this web app look nice.

Here is what your web page should look like:
![Screenshot for design](/engineering-education/building-lyrics-search-app-using-vanilla-javascript/design-screenshot.png)

### A brief introduction to OVH API
The OVH lyrics API is a simple API that helps us retrieve the lyrics of the song requested. While trying to fetch lyrics from this API, we use two parameters to fetch data (lyrics), which are the artist name and title of the song.

This basically means you can retrieve lyrics by using either the artist's name or the title of the song. When a request is made, the data is returned in JSON format.

Using this API, you will get two status codes. They are:
- Status code 200 while the API call is successful
- Status code 404 while the API call fails

You should be familiar with status code 404, if you don't know, `404` stands for `Page/Method Not Found`.

You can read more about the OVH API [here](https://api.lyrics.ovh/v1/artist/title).

An example of the URL in action looks like this: `https://api.lyrics.ovh/v1/Drake/Toosie Slide`.

In the example above, `Drake` stands as the artist and `Toosie Slide` is the title of the song, so we basically slot them into the URL, where `Drake` replaces the artist and `Toosie` Slide replaces the title.

### Adding functionality with JavaScript
In your `lyrics.js` file, declare variables and use the DOM selectors to connect with elements in the `lyrics.html` file, using the code snippet below:

```javascript
//you comment in js using double slash, with vscode just highlight what you want to comment and then press "ctrl + /"
//defining variables
const form = document.getElementById("searchMe");//target the form tag in the html file
const search = document.getElementById("lyricSearch");//target th input field
const output = document.getElementById("search-result");//target the output `div`
```

The desired API to get data (lyrics) for this web app to be fully functional, is the [OVH API](https://api.lyrics.ovh).

Declare the API URL using the code below:

```JavaScript
const api = "https://api.lyrics.ovh";
```

The next phase is to submit the form. You will define what would happen if the input field is empty and likewise what would happen if the input field is not empty.

To do this, let's create an event listener using DOM events to listen for a submit event and not click the event because you didn't create a button to submit the form.

Here is the code snippet for this:

```JavaScript
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

- In the code above, you listened for a submit event after which you declared a variable `searchValue` to be equal to `search.value.trim()`, the `trim()` method simply trims whitespaces.
- The `if` statement validates if `searchValue` equals an empty string to alert "Nothing to search", otherwise invokes the `startSearch()` function taking the `searchValue` as the argument.

It is highly recommended to go through the [OVH API documentation](https://api.lyrics.ovh) before proceeding further.

Now, you can use async-await with the fetch method to get data from the OVH lyrics API.

Using the promise-based fetch API, you will create an async function `startSearch()`.

Here is the code snippet to fetch the data:

```JavaScript
async function startSearch(searchValue) {
    const searchResult = await fetch(`${api}/suggest/${searchValue}`);
    const data = await searchResult.json();
    console.log(data);
    showData(data);
}
```

### Testing the current state Of the Web app
At this point, you are going to test if the web app is actually returning the object of data from the OVH API when you input the title of a song or the name of an artist in the search field.

The following are the tasks to carry out in this section:
- Comment out the `showData` function in the code snippet above (remember to uncomment the showData function).
- Launch the web app using the [live server vs code extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
- Type in a song in the search field (note that some suggested song lyrics are not available on this API, you can get a paid API to explore more).
- Console log the result (To access the console, right-click inside the webpage, click the inspect option then navigate to the console in the chrome dev tools).

Your screen should be like the screenshot below:

![Screenshot for consoled data](/engineering-education/building-lyrics-search-app-using-vanilla-javascript/console-screenshot.png)

In the screenshot above, the lyrics we searched for have a song title of `cast`. If you wish to get the exact data that we got in the screenshot above, you can simply search for the lyrics with song title of `cast`.

The next thing to do is to create a function `showData()` that displays the data in the console (the screenshot above) on the webpage. The function `showData()` is being called from the async function `startSearch()`.

This is the code snippet for the `showData()` function:

```JavaScript
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

- In the code snippet above, a `showData()` function is created and data is passed as an argument.
- The name of the function is very descriptive, it is to display the lyrics on the webpage. The question that comes to mind is where you want to display the lyrics.
- The lyrics will be displayed inside an empty `div` in the `lyrics.html` file, the variable that connects the `div` to the JavaScript file is the variable output.

### Inner - HTML
This is the DOM property that either sets or retrieves the content of an HTML element. In this instance, you will set the content of the empty `div` in the `lyrics.html` file to display the lyrics suggestions in a list form.

To access the data, refer to the screenshot above, you will notice that the data embodies some set of objects which has the properties we want to display on the webpage.

Also, from the screenshot above, the object inside the data has a key of `title` that returns a property of the song title, likewise an artist object that embodies a key of `name` that returns a property of the song artist.

Our concern is how to display the song title and song artist name on the webpage.

The `map()` method is one of the most used methods. The method returns a new array based on the values of the existing array. 

For example, we have array of numbers and we want to get an array that has value of triple of each of the number:

```JavaScript
const numbers = [2 , 4, 6, 8];
const tripleNo = numbers.map(tripleNum);
function tripleNum(number) {
   return number * 3;
}
console.log(tripleNo);//[6,12,18,24] this should be displayed in your console.
```

Normally, to access the song title and song artist name, you would have invoked `data.data.title` for song title and `data.data.artist.name` for the song artist name. If you recall, the argument - song represents the resulting data. 

Since the data has been mapped, you will access the song title using `song.title` as well as the song artist name by using `song.artist.name`.

The following code helps us listen to click event inside the output InnerHTML:

```JavaScript
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

- The code above helps to know if the clicked element is the span tag (if the variable `clickedElement` contains `span` as `tagName`).
- If so, the statement in the `if` block is executed because the span tag bears the tagname `SPAN`. You will store the attribute `data-songtitle` in variable `songTiltle` as well as the attribute `data-artist` for song artist in variable `artist`, which the `getLyrics()` function takes in the two variables as parameters.

Note, arguments are the actual values passed to a function, while parameters are the values passed when a function is defined. Arguments are values passed when a function is invoked. That's why we referred the two variables passed into the `getLyrics()` function as parameters and not arguments.

### GetLyrics() async function
This is the most important function because this is what makes us get the lyrics themselves displayed.

The function takes in two parameters, `artist` and `songTitle` respectively. Recall that you can search for lyrics through inputting song artist or song title. This is the reason why the `getLyrics()` function is taking those parameters.

Below is the code for `getLyrics()` async function:

```JavaScript
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

> Note, the API doesn't have access to all the lyrics, under its free version. If you wish to have access to all the lyrics, I would suggest you get a paid lyrics API.

If a particular lyric is not available, it will return `undefined` in the `div` to display lyrics. It also alerts you that the lyrics are not available on the API.

Next, you can decide to implement Regular Expression (REGEX) syntax in the variable lyrics using the `replace` method, by adding `.replace(/(\r\n|\r|\n)/g ,'<br>');` to the lyrics variable somewhat like this:

`const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g ,'<br>');`

This will return well-aligned lyrics displayed on the webpage.

REGEX usage helps to look through our data (lyrics) for:
- Carriage return alone.
- Carriage return with a new line. 

If any of the instances defined above is found, REGEX `replace` method replaces it with the `<br>` (break line). 

The `/g` is a regular expression flag, it means globally, the entire data (lyrics) should be searched through (for all matches).

The content of the variable output displays song titles in bolder form compared to the artist name because of the strong tag.

Finally, the lyrics are displayed in the paragraph tag when the span tag is clicked.

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

```JavaScript
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
        console.log('lyrics doesnt exist in this api');
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
In this tutorial, we learned to build a lyrics search web app using HTML5, CSS3, Vanilla JavaScript alongside ES6 features.

I'm a big fan of you not just stopping at what is provided in this tutorial. If indeed you've learned something from this, I challenge you to add more features to this web app and also make the User Interface (UI) better.

You can add a button that copies the lyrics to the clipboard or a button that helps you share lyrics with friends via social media platforms.

You can find the full source code [here](https://github.com/shegz101/Lyrics-Web-App) on GitHub.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
