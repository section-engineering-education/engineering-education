---
layout: engineering-education
status: publish
published: true
url: /creating-a-hangman-game-with-vanilla-js/
title: How to create a Hangman game with Vanilla JS
description: This article will guide you on how to build a simple Hangman game using vanilla JavaScript. This project is suitable for beginners.
author: doro-onome
date: 2021-07-27T00:00:00-00:30
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/creating-a-hangman-game-with-vanilla-js/hero.jpg
    alt: Game Hangman JavaScript JS Vanilla Example Image
---

The Hangman game is a word-guessing game where one player picks a secret word, and the other player tries to guess it.
<!--more-->
In this article, I will take you through building a simple Hangman game using vanilla JavaScript and more importantly, how to make it accessible to players who navigate with their keyboards, without using any frameworks.

### Prerequisites
1. A good code editor. Visual Studio Code can do the job.
1. Some knowledge of HTML, Bootstrap CSS, and JavaScript.

### Designing the game
The first thing you have to do is to create two files in your code editor. Name them `index.html` for your HTML code and a `script.js` for your JavaScript code.

We will use Bootstrap CDN for styling this game. You can add the Bootstrap CDN by adding the code below inside the `head` tags of your HTML file.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
```

Below is the entire HTML code. The images used in this project can be found in my [Github repo](https://github.com/Nomzy-kush/Hangman-Game/tree/main/images).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

  <title>Hangman Game with JavaScript</title>
</head>
<body>
<div class="container">
  <h1 class="text-center" style="padding-top: 2em;">Hangman</h1>
  <div class="float-right">Wrong Guesses: <span id='mistakes'>0</span> of <span id='maxWrong'></span></div>
  <div class="text-center">
    <img id='hangmanPic' src="images/0.jpg" alt="">
    <p>Guess the Social Medium:</p>
    <p id="wordSpotlight">The word to be guessed goes here</p>
    <div id="keyboard"></div>
    <button class="btn btn-info" onClick="reset()">Reset</button>
  </div>
</div>

<script src='script.js'></script>
</body>
</html>
```

### JavaScript
In your JavaScript file, you need to create an array containing all the words to be guessed inside the game. I used social media as my niche keywords. You can use any one of your choices. 

Here's how the code should look like.

```javascript
var socialMedia = [
  "whatsapp",
  "instagram",
  "twitter",
  "snapchat",
  "tiktok",
  "youtube",
  "wechat",
  "facebook",
  "telegram",
  "bbm",
  "palmchat",
  "gmail",
  "2go",
  "linkedin",
  "reddit",
  "hangouts",
  "qq",
  "twitch",
  "douyin"
]
```

These words are going to be randomized in the game.

Next, you have to define the IDs you created. Here is the code:

```javascript
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
```

The `answer` id contains the correct word to be guessed. The `maxWrong` id contains the maximum number of times you can guess wrong. The `mistakes` id contains the number of times you have guessed wrong so far, while the `guessed` id contains the letters you will guess.

### The game functions

#### The randomWord() function
This function will help to randomly pick any of the words you placed in your social media array, which now makes the game more interesting as you do not know what word you are guessing next. Here is how the code looks like:

```javascript
function randomWord() {
  answer = socialMedia[Math.floor(Math.random() * socialMedia.length)];
}
```

Then you call the function by using the code below:

```javascript
randomWord();
```

#### The generateButtons() function
If you notice, there are alphabet buttons in our HTML. Without them, how are we supposed to guess the words?

This function helps us generate those buttons. This is a good way of creating these buttons rather than creating 26 different button tags in the HTML file. It is a good representation of "don’t-repeat-yourself" coding technique. 

Here's the code:

```javascript
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}
```

In the code above, we defined all 26 letter buttons while styling them with Bootstrap. "letter" in the code represents each of the looped items in the array of alphabets that we created. 

You then connect it to your HTML using the `document.getElementById('keyboard').innerHTML = buttonsHTML`. 

Remember, we defined the `keyboard` id in the HTML. Also, `.join('')` was added to eliminate the commas between the alphabet buttons.

Then you call the above function with the code below:

```javascript
generateButtons();
```

Here's what the game looks like at this point:
![the-game-buttons](/engineering-education/creating-a-hangman-game-with-vanilla-js/the-game-buttons.jpg)

We will update the wrong guesses, that is, setting the maximum number of wrong guesses a player can get per game. You can do that using the code below:

```javascript
document.getElementById('maxWrong').innerHTML = maxWrong;
```

#### The guessedWord() function
This function takes care of the word to be guessed. First, you have to define the `wordStatus` and render it `null` by default. Here is the code:

```javascript
let wordStatus = null;
```

This function helps to set each letter of the word to be guessed as underscores(' _ ') util they are guessed correctly. 

You then connect it to the HTML tag containing the `wordSpotlight` id.

Here's how the code will look like:

```javascript
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}
```

Then run the function using this line:

```javascript
guessedWord();
```

Here's how it looks like at this point:

![the-game-image](/engineering-education/creating-a-hangman-game-with-vanilla-js/the-game-image.jpg)

Now let’s actually guess the letters.

#### The handleGuess() function
First, we are going to pass down a `chosenLetter`. The `handleGuess()` function handles the letters to be guessed and determines if the answer is true or false.

In the function, if the chosen letter does not exist, we go ahead and push `chosenLetter` into the array but if it exists, do nothing.  Next, you run an `if` statement: `if (answer.indexOf(chosenLetter) >= 0)`. Meaning that if it exists, then run the `guessed()` function to update the letters.

Now we have to start incrementing the number of wrong guesses if the player gets it wrong. We can do that by using the `else if` statement inside this function and passing in the `answer.indexOf(chosenLetter) === -1`. This way the mistakes will be added by one.

Here’s how the code will look like:

```javascript
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}
```

#### The updateMistakes() function
You also have to run the `updateMistakes()` function so that it actually updates the number since we are not using any framework like ReactJS. Here’s how it would look like in the code:

```javascript
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
```

Now, the number of wrong guesses will always keep updating by +1.

The next thing to do is to check for wins and losses so that the player does not keep playing endlessly. To do that, you run `checkifGameWon()` in the `if` statement of the `handleGuess()` function and `checkIfGameLost()` in the corresponding `else if` statement.

#### The checkIfGameWon() function
We will start by creating an if statement to check if `wordStatus` is equal to the answer, then print out “You won!!!”. 

Here is the code:

```javascript
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}
```

#### The checkIfGameLost() function
Here’s the code to check if the player lost.

```javascript
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}
```

In the code above, we set the game to print out “You lost!!!” when the player has reached the maximum number of wrong guesses. We also set the game to print out the correct answer too.

#### The reset() function
In this function, we are going to set everything back to default.  Here is how it looks like:

```javascript
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}
```

#### The updateHangmanPicture() function
First, we are going to call the `updateHangmanPicture()` in the `else if` statement of the `handleGuess()` function so that the image updates every time the player gets a letter wrong.

```javascript
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'images/' + mistakes + '.jpg';
}
```

In the code above, we set the images to update each time the player gets an answer wrong continuously. I named all six images (0-6).jpg, and we have a maximum number of 6 mistakes to be made. 

This conveniently helps us set the pictures to update every time the player gets a letter wrong.

Lastly, we need to make the game accessible to players who wish to navigate with their keyboard. 

First, you need to define the alphabet keys on your keyboard using the code below:

```javascript
let alphabets=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
```

Next up, you need to create a function that will link these keys on your keyboard to the game and make them appear as valid guesses as they are clicked by using `document.onkeypress`. 

Here is the code:

```javascript
document.onkeypress = function (e) {
  e = e || window.event;
  var charCode = e.charCode || e.keyCode,
      character = String.fromCharCode(charCode);

  if (alphabets.includes(character))
  handleGuess(character);
};
```

The code above translates to: “in the event of a key being pressed, handle it as a guess in the game.

Below is a video of the game in action with both the mouse and keyboard in use:

<iframe width="478" height="269" src="https://www.youtube.com/embed/WBThhqHnn2I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion
We made use of vanilla JavaScript and Bootstrap CDN to build a Hangman game. We also used the `onkeypress` event to make the game accessible to players who wish to use their keyboards.

With that, you have a fully interactive Hangman game. You can also add other features to the game if you wish to.

The source code of our application is available on [Github](https://github.com/Nomzy-kush/Hangman-Game).

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
