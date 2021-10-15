
#Building a Lyrics Search app with Vanilla Javascript

![hero image](/building-a-lyrics-search-app-with-vanilla-javascript/hero.jpg)

Knowing the lyrics of a song , is a major problem most song-lovers encounters , especially when it is a rap song . Finding a solution to this problem , by creating a platform where users can search for lyrics by entering the artist name or title of the song is a lovely and useful project.

In this article , i will walk you through how you can create a lyrics search app using html5 , css3 , vanilla js, async await with fetch method , ovh api and ES6 features like arrow functions.

##Prerequisites
..* A code editor. For example: Visual studio code.

..* Some basic knowledge of HTML , CSS , and JAVASCRIPT.

..* Internet Connection

##Structuring The Lyrics Search App With Html5

In other to structure or get started with this project , the first thing to do is to create a folder , name it Lyrics-app after which you create three files in the folder. The first file should be named lyrics.html for the html code , the second file should be named the lyrics.css for the CSS code , and the third should be named lyrics.js for the javscript code.

Inside the lyrics.html file you created , copy(ctrl a then ctrl c) and paste the code below to create the structure of the lyrics search app.

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

##Brief Explanation For The Html Code.
If you using visual studio code , type doc in lowercase letter then press enter key ,visual studio automatically generate the foundational structure of every html code.Set the title to Lyrics search app in the title tag , move into the body tag which enbodies all the visual part of every webpage.Create a div container , using emmet just type
div.container ,a div with a class of container is created.

In the div container , create another div using emmet , type div.intro-text and press the enter key.This newly created div will take in the the text description of the page.Using the h1 tag create a header text having content of Learn your favourite and another header text with the h2 tag having content of song lyrics.

The next thing to do is to create another div , using emmet just type div#lyrics-search ,inside this div create a file like i did in my html code above and a div with id of search-result , this is the div where the lyrics searched for will be displayed.

Lastly , do not forget to link the css and javascript file to your html ,I assume you can do that.

##Designing the lyrics search app
The next step to take is to design the web app with css , so the web app can look good.Here is the css for the structure of the web app(lyrics.html).

```css
html{
    box-sizing: border-box;
}

/**Using pseudo element to style the web page**/
*,*:before,*:after {
	margin:0;
	padding: 0;
	box-sizing: inherit;
	
}

body {
    background: #333333;
}

.container {
    margin: 0 auto;
} 

/**Styling the placeholder with a golden color**/
::placeholder {
    color: gold;
}

/**Styling the intro-text div which has content of learn your favourite song lyrics**/
.intro-text {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 2rem 0;
    color: gold
}

/**Styling the h1 header(learn your favourite)**/
h1 {
    text-align: center;
    padding: 1rem 0;
}

/**Styling the h2 header(song lyrics)**/
h2 {
    text-align: center;
    padding: 1rem 0;
} 


#lyricsHead {
    color: white;
}

#lyrics-search {
    text-align: center;
    align-items: center;
    margin:  20px;
    padding: 20px;
}

form {
    margin: 0 auto;
    padding-left: 10rem;
}

#lyricSearch {
    background-color: transparent;
    color: #eeeeee;
    outline: none;
    height: 30px;
    width: 64%;
    margin: 0 auto;
    padding-right: 2rem;
    font-size: 16px;
    font-family: cursive;
    outline-style: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom:1px solid #eeeeee;
}

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


#lyrics-display {
    color: white;
    font-size: 1.4rem;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
}
```
You have successfully designed the web page by adding colors ,font size and the remaining properties just to make this look nice.

This is what your web page should look like now:
![Screenshot for design](/building-a-lyrics-search-app-with-vanilla-javascript/design-screenshot.jpg)

##Adding functionality With Javascript.
Open your the lyrics.js file , the first thing to do is declaring variables and using the DOM selectors to bring in elements from the lyrics.html file into our javascript file using the code snippet below:

```javascript
//defining variables
const form = document.getElementById("searchMe");
const search = document.getElementById("lyricSearch");
const output = document.getElementById("search-result");
```
 
###Api
Api stands for Application programming interface , is a messenger that accepts request and produce result based on the logic given to it. As i mentioned earlier , the api used in this tutorial is the ovh api.

Declare the api url using the code below:

```javascript
const api = "https://api.lyrics.ovh";
```
The next step to take is to submit the form , we would define what would happen if the form input field is empty and likewise what should happen if the form input field is not empty.

To do this , we need to create an event listener using DOM event to listen for a submit event and not click event because we didn't create a button to submit the form.
Here is the code snippet for this:

```javscript
form.addEventListener("submit",e => {
	e.preventDefault();
	let searchValue = search.value.trim();

	if(!searchValue) {
		alert("please fill the search field");
	} else {
		getResult(searchValue);
	}
})
```

In the code above , we listened for a submit event after which we declared a variable searchValue to be equal to 
search.value.trim() , the trim() method simply trims whitespaces.The argument in the if statement is the shortcut for 
searchValue === " "(if searchValue equals to empty string) , alert please fill the search field and if it is not empty 
which is executed by the else block ,call the function getResult taken in the searchValue as argument.

In other to understand how to use the ovh api , open your browser and type in ovh api docs , read through the api docs then return to this tutorial because we moving to how we can fetch data(lyrics) from the ovh api.

##Async await
According to stackoverflow , function defined as async is a function that can perform asynchronous actions but still look synchronous. The way it's done is using the await keyword to defer the function while it waits for a promise to resolve or reject.

Now , we would use Async await with the fetch method to get data from the ovh lyrics api.

Using the promise-based Fetch API , we create an async function getResult(searchValue).
Here is the code snippet to fetch the data:

```javascript
async function getResult(searchValue) {
	try {
        const searchResult = await fetch (`${api}/suggest/${searchValue}`);
	    const result= await searchResult.json();
       // console.log(result);
	    showData(result);
    }
    catch (err) {
       console.error(err.message);
    }
   
}
```
Create an async function , name it getResult ,the async function will take in the argument of searchValue which is whatever is inputted in the search field.Next , use try and catch method , in the try block declare two variables with the const keyword. 

###Fetch() Method
The fetch() method is used to send request to the server and it loads the result gotten from the server on the webpage.
It is supported by most modern browsers.Note , fetch() accepts a particular argument which is the url you intend to fetch data from.

###Template Literals
Template literals are unique string literals that are used in place of the single quote '..' or the double quotes "..". 
They are accessed by using backticks to take in strings and not the standard form of quotes.

Template literals embeds expression using the ${ expression } syntax.It is used for value or expression interpolation

Basic example of template literals:
```javascript
//first declare two variaables.
const name = "segun";
const language = "javascript";

console.log(`${name} is a ${language} developer.`); //result should be segun is a javscript developer.
```
Back to explanation of the code for fetching data from api:
The first variable declared is used to fetch data from the api , we implemented template literals by using the back ticks and also the dollar sign with curly braces passing the variable api and variable searchValue to the fetch method.

The second variable declared is used to store the data gotten using the fetch() method , this data is stored in json format because the data we are fetching is a text , if the data being fetched is a picture the it would have been await searchResult.blob().

Next call a function showData taking argument of result.

> Note , the argument for the fetch method must include template literal(back ticks) and not quotes , the back tick key > is the key before the no 1 key.

###Json()
JSON stands for Javascript Object Notation , it is used for storing(when working with localStorage) and exchanging data(when working with api calls).An alternative to JSON is the XML but JSON is more efficient.

Below is an example of a JSON file for students:
{
    "students"
    [
        {"name":"Segun","class":"jss two"},
        {"name":"Tayo","class":"jss three"},
        {"name":"Bolu","class":"jss one"}
    ]
}

Comment out the showData function in the code snippet above(remember to uncomment the showData function) , type in cast in the search field and console log the result which should display the data in the console.To access the console open your browser(Chrome) , then right click , click the inspect option then navigate to console.
Your screen should be like the screenshot below:

![Screenshot for consoled data](/building-a-lyrics-search-app-with-vanilla-javascript/console-screenshot.jpg)

Great job getting this far , i hope you happy knowing that you can fetch data from an api incase you are a beginner and do not know how to fetch data from api before now.The next thing to do is for us to display the data(lyrics) being fetched on the web page.

##The showData function

This is the code snippet for that:
```javascript
function showData(result) {
	output.innerHTML = `
	<ul class="lyrics">
	    ${result.data
         .map(song=> `<li>
                          <span class="attribute" song-title = "${song.title_short}"
                           song-artist = "${song.artist.name}"><strong>${song.title_short}</strong>-${song.artist.name}</span>
                        </li>`
         	)
         .join("")
	  }
	</ul>
	`;
}
```

In the code snippet above , a showData function was created and result was passed as the argument.The name of the function is very descriptive , it is to display the lyrics on the web page.The question that comes to mind is where exactly do we want to display the lyrics , if you recall we have an empty div in the html file.The lyrics will be displayed inside that div ,the variable that connect the div to the javascript file is the variable output.

###innerHTML
This is the DOM property that either sets or retrieve the content of an html element.In this instance we want to set the content of the empty div tag in the html file to display the lyrics in a list form.

Using the innerHTML property , set it to an unordered list with class lyrics(use template literals:back ticks).
In other to access the data ,the result is taken as the overall object of the data , go check the screenshot above you would notice that the data enbodies some set of objects which has properties that are to be displayed on the webpage.

That's the reason why in the curly braces it is result.data , now to make the code cleaner use the map array method.
The map methos takes in song as argument ,in a way song is simply representing result.data , use back ticks again to use template literal .Create a list item since we want the song title to be displayed in the form of a list , inside the list element make a span tag with class of attribute and also set attributes for song-title and song-artist using template literals.

GO back and look at the screenshot opening further the object inside data , we have a title_short for song title and another object artist inside this object we can see a name property.Our concern is how to display song title and song artist name on the page , so how can this be done?

###map() Array Method
This array method is one of the most used array methods , as a developer should know how to use the map array method.
Map() method returns a new array based on the values of existing array.

For example , we have array of numbers and we want to get the value of triple of each of number
```javascript
const numbers = [2 , 4 ,6 ,8];

const tripleNo = numbers.map(tripleNum);

function tripleNum(number) {
    return number * 3;
}

console.log(tripleNo); //[6 , 12 , 18 , 24] this should be displayed in your console.
```

Normally to access the song title and song artist name ,we would have done result.data.title_short for song title and result.data.artist.name for song artist name.Recall , i said the the song argument is more like representing the 
result.data . For the fact that the data is been mapped we access the song title using song.title_short and song artist 
using song.artist.name .I hope have been able to explain the concept behind displaying the data very well.

With all the codes we have written so far , we won't still be able to access the lyrics but we getting closer.For now when will fill in the search field we get suggestion base on what's inputted but the lyrics is not gotten. 

The following code helps us listen to click event inside the output innerHTML.
```javascript
output.addEventListener("click",e => {
	const clickedButton = e.target;

	if(clickedButton.className === 'attribute') {
		const artist = clickedButton.getAttribute('song-artist');
		const songTitle = clickedButton.getAttribute('song-title');

		getLyrics(artist , songTitle);
	} 
})

```

Above is the code that helps to know if the clicked element is the span tag ,if it is (i.e if the span tag is === to variable clickedButton) the statement in the if block is implemented because the span tag has a class of attribute.We get the attribute for song title , store it in variable songTitle and also the attribute for the song artist and store it in variable artist after which the getLyrics function is called.

###getLyrics()  async Function
This is the most important function because this is what makes us get the lyrics displayed.The function takes in two arguments artist and songTitle respectively ,recall that you can search base on two things which are either the name of the artist or the song title.This is the reason why the get Lyrics function is taking those two arguments.

Below is the code for getLyrics async function:
```javscript
async function getLyrics(artist , songTitle) {
	const response = await fetch(`${api}/v1/${artist}/${songTitle}`);
	const data = await response.json();

	const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');

	output.innerHTML = `<h2 id="lyricsHead"><strong>${songTitle}</strong> - ${artist}</h2>
	
	<p id="lyrics-display">${lyrics}</p>`;

}	
```

Read through the api docs to understand the value of variable response. Next , the regular expression syntax was implemented in the variable lyrics using the replace method.The carriage return is what the browser understands , for the lyrics to look well aligned when displayed, the carriage returns and line breaks are removed and replaced with a ``` html<br> ```.The regular expression helps to look through for any carriage return alone or carriage return with new line and replace it with the``` html <br> ``` . The /g is regular expression flag ,it means globally , the entire document to be searched through(all matches).

Output contents displays song title in bolder form compared to the artist name because of the strong tag.
Finally, the lyrics is displayed in the paragraph tag when the span tag is clicked.

The entire javascript code together:
```javascript
//defining variables
const form = document.getElementById("searchMe");
const search = document.getElementById("lyricSearch");
const output = document.getElementById("search-result");

const api = "https://api.lyrics.ovh";


form.addEventListener("submit",e => {
	e.preventDefault();
	let searchValue = search.value.trim();

	if(!searchValue) {
		alert("please input the search field");
	} else {
		getResult(searchValue);
	}
})


async function getResult(searchValue) {
	try {
        const searchResult = await fetch (`${api}/suggest/${searchValue}`);
	    const result= await searchResult.json();
       // console.log(result);
	    showData(result);
    }
    catch (err) {
       console.error(err.message);
    }
   
}

function showData(result) {
	output.innerHTML = `
	<ul class="lyrics">
	    ${result.data
         .map(song=> `<li>
                          <span class="attribute" song-title = "${song.title_short}"
                           song-artist = "${song.artist.name}"><strong>${song.title_short}</strong>-${song.artist.name}</span>
                        </li>`
         	)
         .join("")
	  }
	</ul>
	`;
}

output.addEventListener("click",e => {
	const clickedButton = e.target;

	if(clickedButton.className === 'attribute') {
		const artist = clickedButton.getAttribute('song-artist');
		const songTitle = clickedButton.getAttribute('song-title');

		getLyrics(artist , songTitle);
	} 
})

async function getLyrics(artist , songTitle) {
	const response = await fetch(`${api}/v1/${artist}/${songTitle}`);
	const data = await response.json();

	const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');

	output.innerHTML = `<h2 id="lyricsHead"><strong>${songTitle}</strong> - ${artist}</h2>
	
	<p id="lyrics-display">${lyrics}</p>`;

}	
```

##Conclusion
In this tutorial , we made use of html5 , css3 , Vanilla javascript alongside ES6 features.All this code together builds up a functioning lyrics search web app.

Am a big fan of you not just stopping at what is given in this tutorial , if indeed you've learnt something from this , i challenge to add some more features to this web app.You can add things like a button that copies the lyrics to clipboard or a button that helps you share lyrics with friends via social media.

The source code is available on [Github](https://github.com/shegz101/Lyrics-Web-App).



