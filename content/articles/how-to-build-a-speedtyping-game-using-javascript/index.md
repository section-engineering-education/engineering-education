---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-speedtyping-game-using-javascript/
title: How to Build a Speed Typing Game using JavaScript
description: This article will be an introduction on how to build a speed typing game using JavaScript. We will explore this is a step by step process.
author: muktar-owolabi
date: 2021-05-19T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-speedtyping-game-using-javascript/hero.jpg
    alt: Speed typing game image
---
Javascript is a programming language that web developers use when creating dynamic web page features and interactivity in web projects.
<!--more-->
This tutorial will focus on using concepts such as Javascript, API calls, timers, DOM (Document Object Model) manipulation to build a speed typing game to improve your coding skills.

This should be interesting because you will learn and have fun simultaneously. The game could also turn out useful, as it could test and improve your typing abilities.

### Table of contents
- [Why learn Javascript?](#why-learn-javascript)
- [About the Game](#about-the-game)
- [How the Game Works?](#how-the-game-works)
- [Building The Game](#building-the-game)
- [Conclusion](#conclusion)
- [Additional Resources](#additional-resources)

### Prerequisites
To follow this article along, a reader will need the following:
- Text Editor: A text editor could be described as an application that allows an individual to create, open, and edit texts e.g. Visual Studio Code, Atom, Sublime, etc.
- HTML: Hypertext Markup Language is the standard markup language used to create web pages. The code is used to structure the web pages and their contents.
- CSS: Cascading Style Sheet is the language used to style an HTML document, describing how HTML documents should be displayed.
- JavaScript: The programming language used to add interactivity to a web page.

### Why learn JavaScript?
The works of Sacha Greif and Raphaël Benitte [The State of Javascript 2020](https://stateofjs.com/), point out how vast and beneficial the world of a developer skilled with Javascript could be.

It was stated in the survey that:

> As crappy as 2020 was, Javascript as a whole still managed to somehow move forward. As the language itself keeps improving.

### About the game
A speed typing game is a game used to test, calculate, and improve typing speed and accuracy, while having fun. It is also very beneficial for a developer to develop a skill in speed typing as it improves one's efficiency and productivity.

### How the game works?
In the finished product (The complete code for this project is available on [GitHub](https://github.com/CallmeMukty/Speed-typing-game)), there's a timer counting up, we have an area where we can enter the texts that we are typing and it will tell us whether we are right or wrong.

If we are right, it would move to the next question (or quote) for us.

We will be using visual studio code as the text editor for this tutorial, and we will use an API to develop a random quote generator that will develop quotes for our speed typing game.

### Building the game
To begin with our game’s development, we would have to first create an `index.html` file where we are going to write all our HTML codes.

[Tip: You can just type an exclamation mark (!) and hit "Enter". It's going to generate all the boilerplate for us (Boilerplates are sections of code or standardized texts commonly used in multiple places with little or no variation in web development)].

We will need to create a `link` tag for our CSS and Javascript, since we will need CSS and Javascript to build the game. For our CSS, we will create a `stylesheet` link and call it `styles.css`.

```html
<link rel="stylesheet" href="styles.css">
```

and also a script tag for our JS and call it `script.js`.

We need to make sure we `defer` the script so that it loads after the body of the HTML as shown:

```html
<script src="script.js" defer></script>
```  

Now, we move on to the HTML file where we will add the timer, input, container, and quote texts.

To create the timer, we create a `div` with a class as `timer` and an `id` as `timer`, so that we can access it easily in Javascript.

```html
<!-- create a 'class' and 'id' to be easily accessed by css and javascript -->
<div class="timer" id="timer"></div>
```

Next, we need a `div` with class as `container` and inside the `container` we have the quote and the text area. 

First, we have to create a `div` with the `class` as `quote-display` and give it an `id` of `quoteDisplay` so as to access it in JavaScript.

Next, we need the `textarea` that is going to be the area where we type. We specify the `class` as `quote-input` and `id` as `quoteInput`. 

We also need to set the `textarea` to `autofocus`, which implies that as our page loads, our cursor will make starting the typing incredibly easy by automatically focusing inside the box.

```html
<!-- The 'container' will have both the quote and text area -->
<div class="container">
  <div class="quote-display" id="quoteDisplay"></div>
  <textarea id="quoteInput" class="quote-input" autofocus></textarea>
</div>
```

Next, we create a `styles.css` file where we will create all the styles for the game.

Now we need to set the `box-sizing` to `border-box`:

```css
/* This is to make working with 'widths', 'paddings' and 'margins' very much easier */
* {
  box-sizing: border-box;
}
```

This makes working with `widths`, `paddings`, and `margins` much easier.

Then, we style the `body` to the center of our `container`. To do that, we set the `margin` to `0`, to get rid of the scroll bar when the game is displayed and we set the preferred `background-color`:

```css
/* Getting rid of the scroll bar, placing all of our contents at the center and setting our background color */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: #1E0555;
}
```

Then, we set our preferred font and its stylings as shown:

```css
/* Setting the text-font for the game */
body, .quote-input {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
```

Next, we style our `.container`:

```css
/* Styling the text and quote container */
.container {
  background-color: #F0DB4F;
  padding: 1rem;
  border-radius: .5rem;
  width: 700px;
  max-width: 90%;
}
```

Later, we have to style the `timer` so that it is placed over the text. (The timer won't work until we add some Javascript).

```css
/* Styling the timer */
.timer {
  position: absolute;
  top: 2rem;
  font-size: 3rem;
  color: #F0DB4F;
  font-weight: bold;
}
```

Next thing, we will work on is `.quote-display`:

```css
/* Styling the quote area */
.quote-display {
  margin-bottom: 1rem;
  margin-left: calc(1rem + 2px);
  margin-right: calc(1rem + 2px);
}
 ```

Style the `.quoteInput`:

```css
/* Styling where the texts would be typed (text area) */
.quote-input {
  background-color: transparent;
  border: 2px solid #A1922E;
  outline: none;
  width: 100%;
  height: 8rem;
  margin: auto;
  resize: none;
  padding: .5rem 1rem;
  font-size: 1rem;
  border-radius: .5rem;
}
```

Select `.quoteInput` and put it in a `focus` state, the `border-color` will be made `black`, so that when we click on a text, it's highlighted in black.

```css
/* Creating a focus in the text  area to help know where the focus is */
.quote-input:focus {
  border-color: black;
}
```

We will be creating a `.correct` and `.incorrect` class in our CSS, which we will be eventually linking with our Javascript:

```css
/* Style for the color of text when typing correctly */
.correct {
  color: green;
}
 
.incorrect {
/* Style for the color of text when typing incorrectly */
  color: red;
  text-decoration: underline;
}
```

#### Adding JavaScript
(This is where it gets interesting).

We create a `script.js` file where we will be writing all of our JavaScript.

Getting our quotes into our text box is the first thing we want to do. This could be achieved by using a free API called [Random Quote Generator](api.quotable.io/random).

Whenever we access the URL, we get a random quote from the `content` attribute of the API. We copy that URL, then go back to our `script.js` file to create a `const` variable that stores the URL.

```js
// creating a 'const' variable to store the URL for API of quote generator 
const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
```

Now, what we need to do is to fetch the data from our API. To do so, we will create a `function` called `getRandomQuote` to fetch the API data.

We can achieve that by putting the URL for our API, then call the `.then()`.

The `.then()` returns a promise that we are going to get a `response` object. Here, we convert it to `JSON`. 

We are going to also call another `.then()` which contains the `data`. The `data` attribute is essentially the entire text that we see on our API platform.

So, for us to get the `content` key, this is what we should do:

```js
// Fetching our API for quote generator and returning a promise
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}
```

The next thing we are going to do is to create the `async function` to `renderNewQuote` because we are going to render our quote inside this function:

```js
// Creating an  `async function` to return a promise
async function renderNewQuote() {
  const quote = await getRandomQuote()
}
```

Remember in our HTML we created an `Id` for `quoteInput`, where we will type our quotes, and an `id` for `quoteDisplay` where we would show our quote.

So, in the JavaScript file, we will create a `const` variable which we can call `quoteDisplayElement` and set it to `document.getElementById('quoteDisplay')`.

```js
// Creating a const variable of 'quoteDisplay'
const quoteDisplayElement = document.getElementById('quoteDisplay')
```

Then, we go to our `async function` where we `renderNewQuote` and say that `quoteDisplayElement.innerText=quote`;

```js
// Adding quotes to the quote area. 
async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerText=quote
}
```

Now, our quote can be put in its section and whenever we refresh, a new quote will generated.

So to add our input, what we need to do is call `quoteInputElement`, then we set it to:

```js
// Adding our texts value document.getElementByID('quoteInput')
const quoteInputElement = document.getElementById('quoteInput')
```

Then, we go to our `async function` where we `renderNewQuote` and say that:

```js
//To clear out the texts inside the text area anytime a new quote is generated
quoteInputElement.value = null
```

Remember, we should be able to change the color of each quote to signify when the user is typing them right or wrong.

To do that, we need an individual element for each character or quote, where we need to go through a `loop`:

```js
//Getting individual element for each character to be able to change color to either right or wrong
quote.split('').forEach(character => {
  const characterSpan = document.createElement('span')
  characterSpan.innerText = character
  quoteDisplayElement.appendChild(characterSpan)
}

// What we are trying to achieve here is that we are creating a 'span' for each character we get in our string then we set the text of that 'span' to that individual character
```

As we type characters in our text area, we are going to check to if the characters we are typing are correct. To that, we would need to set up an `EventListener`.

The input element in the `EventListener` will get called every time something in the text area changes. What we want to do is to loop over all of the different `span`, all the different characters in the `quote` array.

Then we compare each character to the individual character in the input based on their positions, so that the first character in the display area is compared to the first character in the input area.

The `correct` class will be added if they are similar, if they are different the `incorrect` class will be added.

If we get to the point where the user typed everything correctly, we want to move to the next quote, so we have to create a variable and call it as `correct`.

The `correct` variable will be set to `true` by default. It'll be assumed that everything is correct and if something happens to be `incorrect` the variable will be `false`.

So in a situation where the variable happens to be `true` we just want it to render the next quote:

```js
// Setting up an event listener to determine if the typing is right or wrong and to move to the next quote if the typing is right
quoteInputElement.addEventListener('input', () => { // The 'input' gets called everytime something in the text area changes
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')
 
  let correct = true       // If we typed the right characters
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
        characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false      // If we typed the wrong characters
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })
})
```

All we have left to do is to fix our `timer`.

We create a `startTimer` function and get our `timer` element.

If you remember, we created an element with the `id` of `timer` in our HTML, so we could just select the `id` of `timer`.

```js
// Using const variable to store our 'timer' 
const timerElement = document.getElementById('timer')
```

Now, we set the `timer` to 'zero':

```js
//Setting our timer to start at '0'
function startTimer() {
  timerElement.innerText = 0
```

Then, we call the `startTimer` in our `renderNewQuote`.

Whenever a new quote is rendered we want our `timer` to restart. So, for every second that we want our timer to be updated, the `setInterval` will be used since it accepts a function and a second parameter specifying the number of times you want the function to run (in milliseconds) as shown:

```js
// To update our timer and to run it every millisecond 
setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
```

This function is going to run every one second, but the `setInterval` isn't precise - it won't run exactly once per second. To compensate for the fact that `setInterval` is inaccurate, we will create a variable called `startTime` which will be the `date` when our timer begins.

The value of `startTime` will be set to the current time and date. 

Instead of calling `setInterval` we call `getTimerTime`, which takes the current time, and subtract it from our `startTime`.

This is going to be in milliseconds and we want to convert this to seconds. To do so, we will divide by 1000, which will give us the time in seconds (in decimals). To make it integer, we use `Math.floor()`.

All that is left now is setting the `text` of the timer. 

Our final code for our timer should be:

```js
// Setting a new date 
let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}
 
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000) // For the timer to work accurately in seconds
}
```

Our game should start counting up every second. It’s should tick up one more, because of the `startTime` and the currentDate(newDate) which is always accurate to the millisecond. While `setInterval` is not accurate and we can’t depend on it.

So you can check it out now, everything should be working perfectly. 

Congratulations!

This is what your game should look like:

![speed-typing-game-gif](/how-to-build-a-speedtyping-game-using-javascript/speed-typing-game.gif)

### Conclusion
Although the app works, it could be improved. We could still improve on the functionality and styling. If you have a hard time around it, just take your time to carefully follow each step.

Remember, practice makes perfect. Consistency is key.

Here's the link to the GitHub repo for the completed project: [Source Code for Completed Project](https://github.com/CallmeMukty/Speed-typing-game).

Happy coding.

### Additional resources
- [HTML Script Defer Attribute (w3schools)](https://www.w3schools.com/tags/att_script_defer.asp)
- [Javascript Async](https://www.w3schools.com/js/js_async.asp)
- [Javascript Promises](https://www.w3schools.com/js/js_promise.asp)
- [Javascript JSON](https://www.w3schools.com/js/js_json.asp)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)