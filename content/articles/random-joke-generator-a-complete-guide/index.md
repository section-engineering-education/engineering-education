### Introduction
In programming, there are regular cases where you need to recover an arbitrary number. For instance, you might be making a speculating game and need your program to create an arbitrary number each time the client runs your program. Or on the other hand, you might need to run a capacity an irregular number of times.
That is the place where the JavaScript `Math.random()` work comes in. `Math.random()` is an implicit strategy that can be utilized to create irregular numbers in JavaScript. The capacity returns a worth between 0 and 1, yet we can utilize another capacity called `Math.floor()` to transform our number into an entirely arbitrary number.
In this instructional exercise, we will investigate the nuts and bolts of JavaScript irregular number age, and talk about how you can utilize the `Math.random()` work in your code.
### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [JavaScript Math Refresher](#javascript-math-refresher)
- [JavaScript Math.random()](#javascript-mathrandom)
- [JavaScript Random number between Two values](#javascript-random-number-between-two-values)
- [Random joke generator](#random-joke-generator)
- [Conclusion](#conclusion)


### JavaScript Math Refresher 
The JavaScript Math object offers designers various numerical capacities which can be performed on numbers. These capacities incorporate returning the outright worth of a number, adjusting a number, ascertaining the square base of a number, among others.One of the most helpful capacities of the Math library is the `Math.floor()`. This strategy can be utilized to convey a worth adjusted downwards to the nearest number, or entire number. 
 Illustration:
 - open The browser console and paste the below code
```javascript
alert(Math.floor(7.7)); 
```
The output is: `7`. The number handled was adjusted down and that explains why we obtained `7` instead of `8`.
Likewise, `Math.round()`cycles a number up to the closest worth. 
 Illustration:
 - open The browser console and paste the below code 
 ```javascript
alert(Math.round(7.7)); 
```
The output is: `8`. The Math object incorporates various other numerical capacities that can be utilized to work with numbers.The fundamental ones to produce a JavaScript irregular number are `Math.floor()` and `Math.random()`.
### JavaScript Math.random()
Returns an irregular number between 0 and 1. It returns a coasting point pseudo-irregular number, which implies that it will incorporate a decimal. 
- **syntanx**
```javascript
Math.random()
```
- **Example**
- On your favourite browser console paste the below code
  ```javascript
  alert(Math.random());
  ```
  The outPut is:
```
0.29823436671341197
```
- The code returned an arbitrary number somewhere in the range of `0` and `1`. Be that as it may, this number is somewhat little, and many are the occasions we would need to produce bigger arbitrary numbers. To fulfill this need `Math.floor()` work comes right into it. 
We can utilize the `Math.floor()` capacity to adjust our arbitrary number up to turn into an irregular whole number, and we can duplicate that number to create a bigger one. 
- **Example**
- Run the Following in your favourite browser
```javascript
let randNum = Math.floor(Math.random()*20);
alert(randNum);
```
  our program has obviously created an irregular number.`* 20` was utilized  to create a bigger number. This capacity will assist us in getting a number somewhere in the range of `1` and `20.` 
  A more bigger number could be obtained by:
```javascript
let randNum = Math.floor(Math.random() * 100);
alert(randNum);
```

### JavaScript Random number between Two values
`Math.random()` does exclude any contentions, which implies we can't utilize the capacity to produce a number between two qualities. Nonetheless, we can make a custom technique that permits us to produce an arbitrary number between two qualities. Suppose that we are making an expansion game that ought to produce two numbers somewhere in the range of `10` and `20` for a further developed level.
- **Example**
```javascript
let getRandNum = (minVal, maxVal) =>  {
return Math.floor(Math.random() * (maxVal - minVal) + minVal);
  };
alert(getRandNum(10, 20));
```
> The program will generate numbers between `10` and `20`.
- **Expalnation**
   - `getRandNum()` takes two parameters:
       1. maxVal
       2. minVal
   - The two parameters are the determinant to which digits are to be generated.
   - `Math.random()` generates a random number with assurance of the result being in our range by the the two variables.
   - Finally we called the function and passed in arguements.

### Random joke generator
- This small project will help you build a random joke generator you can get the source code [Here](https://github.com/EssyG10/random-joke-generator).
     - Create a folder and give it a name of your choice
     - Inside this folder create the following files:
               1. index.html
               2. style.css
               3. main.js
- `index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Joke Generator</title>
    <link rel="stylesheet" href="style.css">
   
</head>

<body>
   <div class="container">
        <h1>Try Not to laugh 😆</h1>
        <p class="joke-text">
            Joke resides here...
        </p>
        <div class="button">
            <button class="btn new-joke-btn">New Joke</button>
        </div>
    </div>

 <script src="main.js"></script>
</body>

</html>
```
- `style.css`
```css

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,body {
  width: 100%;
  height: 100vh;
  background-color: #6B2A7E;
  font-family:cursive;
  display: flex;
  justify-content: center; 
  align-items: center; 
  text-align: center;
}
.container {
  width: 450px;
  padding: 40px 22px; 
  background-color: #ccc;
  border-radius: 5px;
}
.btn {
  padding: 10px 20px; 
  margin: 0 5px; 
  font-size: 0.99rem;
  border-radius: 3px;
  outline: none;
  border: none;
  color: #fff;
  background-color: blue; 
  cursor: pointer;
}
h1 {
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 20px;
} 
.new-joke-btn {
  background-color: #FF0000;
}

.joke-text {
  font-size: 15px;
  margin-bottom: 25px;
  font-family: cursive;
}
```
- `main.js`
```javascript
const jokeText = document.querySelector('.joke-text');
const newJokeBtn = document.querySelector('.new-joke-btn');
newJokeBtn.addEventListener('click', getJoke);
getJoke();

function getJoke() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        const joke = data.joke;
        jokeText.innerText = joke;
    });
}
```
### Conclusion
 `Math.random()` creates an irregular number between `0` and `1`.`Math.floor()` can create bigger number dependent on our necessities. 
 Overall we learnt how we can produce an arbitrary number and also we made a custom capacity that can be utilized to produce an irregular number between two qualities.
You also saw how you can generate a random joke in a javascript application.

Happy coding !