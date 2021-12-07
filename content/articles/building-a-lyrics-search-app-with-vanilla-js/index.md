
##Building a Lyrics Search app with Vanilla Javascript

![hero image](/building-lyrics-search-app-with-vanilla-javascript/hero.jpg)

Not knowing the lyrics of a song is a problem most song-lovers encounter, especially when it's a rap song.

In this article, we will be creating a platform where users can search for lyrics by entering the artist name or title of the song.

We will be creating the search app using HTML5, CSS3, Vanilla JS, async-await with fetch method, OVH API, and ES6 features like arrow functions.

### Prerequisites
- A code editor (Visual studio code.)
- Some basic knowledge of HTML, CSS, and JAVASCRIPT.
- A laptop with an internet connection

### Structuring the lyrics search app with HTML 5.
To begin, create a folder named `lyrics-app`, then you create three files in the folder: `lyrics.html`, `lyrics.css` and `lyrics.js`

In the `lyrics.html` file, include the code below to create the structure for the lyrics search app.

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

        <div id="lyrics-serach">
            <form action="" id="searchMe">
                <input type="text" id="lyricSearch" placeholder="artist name or song title"/>
            </form>
            <div id="search-result">
                
            </div>
        </div>
    </div>
    <script src="script.js">
        
    </script>
</body>
</html>

```

### Designing the lyrics search app
The next step is to design the web app with CSS by navigating to your CSS file. Here’s the CSS for the structure of the web app(HTML code):

Firstly, style the overall HTML, body of the HTML, and the div with the class of container which embodies all other divs.

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

/****/
.container {
    margin:0 auto;
}

```
Now, we are going to style the contents in the body tag, from the page description to the placeholder and the input field.

```css

/**This is how placeholders are styled**/
::placeholder {
        color:gold;
}

```
Next, style up the page description text, that is, “Learn your favorite song lyrics”.

```css

/**Styling the intro text div which has the content of “learn your favorite song” lyrics**/

.intro-text {
      font-family: Verdana, Geneva, Tahoma, sans-serif;/**If the device doesn’t have any of the first three font-family sans-serif will automatically be used **/
      padding:2rem 0;
     Color:gold;
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
Centering the div container where the form and input field are embedded, using its id(lyrics-search)

```css
#lyrics-search {
    text-align:center;
    align-items:center;
    margin:20px;
    padding:20px;
}

```
We complete the css code for now by styling up the form and the input field.

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

You have successfully designed the web page by adding colors, font sizes, font family, padding, margin, and so on just to make this web app look nice.

Here is what your web page should look like now:
![Screenshot for design](/building-lyrics-search-app-with-vanilla-javascript/design-screenshot.jpg)

### Adding functionality with JavaScript.
In your `lyrics.js` file,  declare variables and use the DOM selectors to bring in elements from the lyrics.html file into our javascript file using the code snippet below:

```javascript

//you comment in js using double slash, with vscode just highlight what you want to comment and then press "ctrl + /"
//defining variables
const form = document.getElementById("searchMe");//target the form tag in the html file
const search = document.getElementById("lyricSearch");//target th input field
const output = document.getElementById("search-result");//target the output div

```
Let’s explore APIs and the desired API we would use to get the data we need to make this web app up and running.
 
Declare the API URL using the code below:

```javascript

const api = "https://api.lyrics.ovh";
```
The next phase is to submit the form, we would define what would happen if the form input field is empty and likewise what would happen if the form input field is not empty.

To do this, let’s create an event listener using DOM events to listen for a submit event and not click events because we didn’t create a button to submit the form.

Here is the code snippet for this:

```javascript
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

In the code above, we listened for a submit event after which we declared a variable `searchValue` to be equal to `search.value.trim()`, the `trim()` method simply trims whitespaces. The if statement validates if `searchValue` equals to an empty string, alert "Nothing to search", else, invoke the `startSearch()` function taking the `searchValue` as the argument.

I’d recommend that you explore the [OVH API doc](https://api.lyrics.ovh) here before proceeding further we’re about to fetch data (lyrics) from the OVH API.

Now, we would use  Async await with the fetch method to get data from the ovh lyrics API.
Using the promise-based fetch API, we create an async function getResult(searchValue).

Here is the code snippet to fetch the data:

```javascript
async function startSearch(searchValue) {
    const searchResult = await fetch(`${api}/suggest/${searchValue}`);
    const data = await searchResult.json();
    console.log(data);
    showData(data);
}


```

Comment out the showData function in the code snippet above(remember to uncomment the showData function), launch the web app using the [live server vs code extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), type in a song in the search field(note that some suggested song lyrics are not avilable on this api, you can get a paid api to explore more), and console log the result which should display the data in the console. To access the console, right-click inside the webpage, click the inspect option then navigate to the console in the chrome dev tools.

Your screen should be like the screenshot below:

![Screenshot for consoled data](/building-lyrics-search-app-with-vanilla-javascript/console-screenshot.jpg)

The next thing to do is to create a function that will display the data in the console on the webpage. The function(showData)  is being called from the async function `startSearch()`.

This is the code snippet for the showData function:

```javascript

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
In the code snippet above, a showData function was created and the data was passed as an argument. The name of the function is very descriptive, it is to display the lyrics on the web page. The question that comes to mind is where exactly do we want to display the lyrics, if you recall we have an empty div in the html file. The lyrics will be displayed inside that div, the variable that connects the div to the javascript file is the variable output.

### Inner - HTML
This is the DOM property that either sets or retrieves the content of an HTML element. In this instance, we want to set the content of the empty div tag in the HTML file to display the lyrics suggestions in a list form.


Using the innerHTML property, set it to an unordered list with class lyrics (use template literals: backticks). In other to access the data, refer to the screenshot above, you will notice that the data embodies some set of objects which has the properties we want to display on the webpage.

Also, from the screenshot above, the object inside the data, we have a `title` that returns the song title and the artist object that embodies the name property. Our concern is how to display the song title and song artist name on the page.

The `map()` method is one of the most used methods. The method returns a new array based on the values of the existing array.

For example, we have array of numbers and we want to get an array that has value of triple of each of the number;
```javascript
const numbers = [2 , 4, 6, 8];
const tripleNo = numbers.map(tripleNum);
function tripleNum(number) {
   return number * 3;
}
console.log(tripleNo);//[6,12,18,24] this should be displayed in your console.
```
Normally to access the song title and song artist name, we would have invoked `data.data.title` for song title and `data.data.artist.name` for the song artist name. If you recall, the argument - song represents the resulting data. 

Since the data has been mapped, we access the song title using `song.title` and song artist using `song.artist.name`.

The following code helps us listen to click event inside the output innerHTML:

```javascript
//event listener in get lyrics button
output.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

```

Above is the code that helps to know if the clicked element is the span tag. If it is, (i.e the span tag is === variable clicked button), the statement in the if block is executed because the span tag bears the tagname `SPAN`. We store this attribute in variable `songTiltle` and also the attribute for the song artist in variable `artist` which the `getLyrics()` function.

### GetLyrics() async function
This is the most important function because this is what makes us get the lyrics themselves displayed. The function takes in two arguments artist and songTitle respectively, recall that you can search for lyrics through inputting song artist or song title. This is the reason why the getLyrics function is taking those two arguments.

Below is the code for getLyrics async function:

```javascript
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
Note, the api doesn't have all the lyrics of songs it suggests, it's still in progress, if you wish to have an app that can return so many lyrics, i will suggest you get a paid lyrics api. The lyrics that are not avialable, returns undefined in the div to display lyrics, it also alerts you that the lyrics is not available on the api. Also, when you input a song title to search from, you have to exercise little patience for the data to load because it is a bit slow.

Next, you can decide to implement the regular expression syntax in the variable lyrics using the `replace` method. For well-aligned lyrics, the carriage returns, and line breaks are removed and replaced with a <br>. The regular expressions help to look through for any carriage return alone or carriage return with a new line and replace it with the <br>. 

The `/g` is a regular expression flag, it means globally, the entire document to be searched through(all matches).

Output content displays song titles in bolder form compared to the artist name because of the strong tag. 



Finally, the lyrics are displayed in the paragraph tag when the span tag is clicked.

### Styling and centering the lyrics
Navigate to your css file and add the code below to style and center the lyrics:

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

The entire javascript code :
    In other for you not to run into errors while fetching data from the api, i will suggest you rearrange your code like the code snippet below.What am basically doing, is creating a function above before it's been called, so we don't run into errors(javscript is very sensitive to things like this).
```javascript

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
 In this tutorial, we built a lyrics search web app using HTML5, CSS3, Vanilla Javascript alongside ES6 features.

I’m a big fan of you not just stopping at what is provided in this tutorial. if indeed you’ve learned something from this, I challenge you to add some more features to this web app and also make the UI better. You can add a button that copies the lyrics to the clipboard or a button that helps you share lyrics with friends via social media.

The source code is available on [Github](https://github.com/shegz101/Lyrics-Web-App).