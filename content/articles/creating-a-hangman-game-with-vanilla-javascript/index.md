###Creating a Hangman Game with Vanilla JavaScript
A Hangman game is a word-guessing game. One player picks a secret word, and the other player tries to guess it. In this article, I will take you through building a simple Hangman game with just Vanilla JavaScript, and more importantly, how I made it accessible for players who navigate with their keyboard without using any frameworks.

###Prerequisites
Any good Text Editor.
Basic knowledge of HTML, Bootstrap, and JavaScript.

###Designing the Game
First thing you have to do is create three files on your text editor and name them “index.html” for your HTML code and a “script.js” for your JavaScript code. I majorly used Bootstrap CDN in styling this game. You can do that by pasting the code below inside the `<head></head>` in your HTML file.
 
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
```
 
Below is the entire HTML code. The images used in this project can be found in my [Github](https://github.com/Nomzy-kush/Hangman-Game) repo.
 
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
 
###The Actual JavaScript
Firstly you need to link your Javascript code to your HTML file by pasting the  code below at the end of the <body></body> tag.
 
```html
<script src='script.js'></script>
```
 
 In your JavaScript file, you need to create an array containing all the words to be guessed inside the game. I used social media as my niche of words. You can use any one of your choice. Here's how it looks on your code. 
 
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
 
These are words that are going to be randomized in the game.
Next, you have to define the id's you created. Here it is in the code: By default,
 
```javascript
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
```
 
The "answer" id contains the correct word to be guessed. The "maxWrong" id contains the maximum number of times you can guess wrong. The "mistakes" id contains the number of times you have guessed wrong so far, while the "guessed" id contains the letters you will guess.

###The Game Functions

###The randomWord() function
This function will help to randomly pick any of the words you placed in your social media array, which now makes the game more interesting as you do not know what word you are guessing next. Here is how the code looks like:
 
```javascript
function randomWord() {
  answer = socialMedia[Math.floor(Math.random() * socialMedia.length)];
}
 
Then you call the function by using the code below:
randomWord();
```
 
###The generateButtons() function
If you notice, there are alphabet buttons in our HTML. Without them, how are we supposed to guess the words? Well, this function helps us generate those buttons. This is a better method of creating these buttons rather than creating 26 different button tags in the HTML file. It is a good representation of "don’t-repeat-yourself" coding. Here's the code below:
 
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
 
In the code above, we defined all 26 letter buttons while styling them with Bootstrap. "letter" in the code represents each of the looped items in the array of alphabets that we just created in the variable. You then connect it to your HTML using the `document.getElementById('keyboard').innerHTML = buttonsHTML`. Remember, we defined the "keyboard" id in the HTML. Also, ` .join('')` was added to eliminate the commas between the alphabet buttons.
 
Then you run it with the code below:
 
```javascript
generateButtons();
```
 
 
Here's what the game looks like at this point:
![hangman 1](/engineering-education/creating-a-hangman-game-with-vanilla-javascript/hangman 1.jpg)
 
We will update the wrong guesses, i.e., setting the maximum number of wrong guesses a player can get per game. You can do that using the code below:
 
```javascript
document.getElementById('maxWrong').innerHTML = maxWrong;
```
 
###The guessedWord() function
This function takes care of the word to be guessed. Firstly, you have to define the "wordStatus" and render it null by default. Here it is in your code:
 
```javascript
let wordStatus = null;
```
 
This function helps to set each letter of the word to be guessed as underscores(' _ ') till they are guessed correctly. You then connect it to the HTML tag containing the "wordSpotlight" id. Here's how the code will look like:
 
```javascript
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
 
  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}
```
 
Of course, we have to run the function using this code:
 
```javascript
guessedWord();
```
 
Here's how it looks like at this point:
![hangman 2](/engineering-education/creating-a-hangman-game-with-vanilla-javascript/hangman 2.jpg)
 
Now let’s actually guess the letters.

###The handleGuess() function
Firstly, we are going to pass down a `chosenLetter`  . This function handles the letters to be guessed and determines if the answer is true or false. In the function, we are going to say if the chosen letter does not exist, we want to go ahead and push `chosenLetter` into the array but if it does exist, then we would do nothing.  Next, you run an `if` statement saying `if (answer.indexOf(chosenLetter) >= 0)` meaning that if it exists, then run the `guessed();` function so that it updates the letters. Now we have to start incrementing the number of wrong guesses if the player gets it wrong.  We can do that by using the `elseif` statement inside this function and passing in the “answer.indexOf(chosenLetter) === -1” then mistakes is going to be added by one. Here’s  what the code will look like:
 
```javascript
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);
 
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
  }
}
```
 
###The updateMistakes() function
You also have to run the updateMistakes(); function so that it actually updates the number since we are not using any framework like ReactJS or the rest of them.  Here’s how it would look like in the code:
 
```javascript
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
```
 
Now, the number of wrong guesses will always keep updating by +1.
The next thing to do now is to check for wins and losses so that the player does not just keep playing endlessly. To do that you run a checkifGameWon(); in the `if` statement of the `handleGuess();` function and a `checkIfGameLost();` in the corresponding `elseif` statement.
###The checkIfGameWon() function
We are going to start by creating an if statement saying if “wordStatus” is equal to the answer, the keyboard will print out “You won!!!”. Here is the code below:
 
```javascript
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}
```
 
###The checkIfGameLost() function
Here’s the code to check if the game lost.
 
```javascript
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}
```
 
In the code above, We set the game to print out “You lost!!!” when the player has reached the maximum number of wrong guesses. We also set the game to print out the correct answer too.

###The reset() function
In this function, we are going to set everything back to default.  Here is how it looks in the code:

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
 
###The updateHangmanPicture () function
Firstly, we are going to run the `updateHangmanPicture();` in the `elseif` statement of the `handleGuess()` function so that the image updates every time the player gets a letter wrong. Then we create the updateHangmanPicture() function using the code below:
 
```javascript
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'images/' + mistakes + '.jpg';
}
```
 
In the code above, we set the images to update each time the player gets an answer wrong continually. I named all six images (0-6).jpg, and we have a maximum number of 6 mistakes to be made. This now conveniently helps us set the pictures to update every time the player gets a letter wrong.
 
Lastly, we need to make the game accessible to players that wish to navigate with their keyboard. Firstly, you need to define the alphabet keys on your keyboard using the code below:
 
```javascript
Let alphabets=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
```
 
Next, you need to create a function that will link these keys on your keyboard to the game and make them appear as valid guesses as they are clicked by using `document.onkeypress`. Here is the code below:
 
```javascript
document.onkeypress = function (e) {
  e = e || window.event;
  var charCode = e.charCode || e.keyCode,
      character = String.fromCharCode(charCode);
 
  if (alphabets.includes(character))
  handleGuess(character);
};
```
 
So as to say, “in the event of a key being pressed, handle it as a guess in the game.”
Below is a video of the game in action with both the mouse and keyboard in use:
 
<iframe width="478" height="269" src="https://www.youtube.com/embed/WBThhqHnn2I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 
###Conclusion
We made use of vanilla JavaScript and Bootstrap CDN to organize our code. We also used the `onkeypress` event to make the game accessible to players who wish to use their keyboards.
 With that, you have a fully interactive Hangman game. You can also add your features to the game if you wish to. The source code of our application is available on [Github](https://github.com/Nomzy-kush/Hangman-Game).
Happy coding!
 
 



 






