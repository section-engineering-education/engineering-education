### Introduction

The best way to learn any programming language is through hands-on projects. The Snake Game is a simple game you can make using the basics of JavaScript and HTML.

The basic goal is to navigate a snake and eat as many apples as possible without touching the walls or the snake’s body.
In this article, I will show you step-by-step how to create this Snake Game using JavaScript and HTML.

### Prerequisites

- Basic CSS knowledge.
- Basic JavaScript knowledge.
- Basic knowledge of HTML Canvas.

### Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Display the canvas](#display-the-canvas)
- [Display the Snake](#display-the-snake)
- [Use Arrow keys to change the Snake’s direction](#use-arrow-keys-to-change-the-snake’s-direction)
- [Incorporate Food](#incorporate-food)
- [Collition detection](#collision-detection)
- [Increase length of Snake](#increase-length-of-snake)
- [Incorporate Score](#incorporate-score)
- [Implement Game Over logic](#implement-game-over-logic)
- [Add Game Over Text](#Add-game-over-text)
- [Conclusion](#conclusion)

### Display the canvas

First, we need to display the game board and the snake. Start by creating the file `index.html`. This will contain all our code. Next, open the file in your preferred browser.

To be able to create our game, we have to make use of the `HTML <canvas>`, which is used to draw graphics with JavaScript. [Click here to learn more about HTML canvas.](https://www.youtube.com/watch?v=Yvz_axxWG4Y)

```HTML
 <canvas id="game" width="400" height="400"/>
```

**Note**
The `id` is used to identify our canvas

Until now the browser will not display anything since the canvas has no default background. To make our canvas visible, we can give it a border by writing some CSS code. Add `<style>` and `</style>` tags after the `</title>` tag. Then key in the following block of code.

```CSS

   <style>
 body{
 margin: 0px;
 padding: 0px;
 display: flex;
 flex-direction: column; /* arrage items on top of the other */
 justify-content: center;
 align-items: center;
       }
 canvas{
 box-shadow: black 20px 10px 50px; /*elevate our canvas and add shadow*/

       }
   </style>

```

Now, we will create an `index.js` file that will contain our `JavaScript` code. For the file to be effective on our HTML main file, we need to link the `index.js` file to the HTML file. This is done by adding the following line of code below the `</canvas>` tag.

```javaScript
<script src="index.js"></script>
```

Next is to make the canvas for our snake to navigate. First, we get the canvas element using the id `game`. Next, we get the canvas `2d context`, which means that it will be drawn into a `2D` space.

```javaScript
   const canvas=document.getElementById('game'); const ctx=canvas.getContext('2d');
```

Then, add black background color to our canvas by creating a new function called `clearScreen` and calling it on our primary function `drawGame`.

```javaScript
function drawGame(){
    clearScreen();

}

 function clearScreen(){

ctx.fillStyle= 'black'// make screen black
ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)// black color start from 0px left, right to canvas width and canvas height

 }
 drawGame();
```

The `fillStyle` method is a kind of brush, which paints our screen with black color, and it is used together with the `fillRect` method, which paints the entire rectangle from coordinates `(0,0)` to the actual height and width of our canvas.
<br>The following screen should appear.

![black screen](/education-engineering/how-to-build-a-snake-game-with-javascript/canvasblank.png)

The next task is to create the game loop that will update the screen; by creating a variable named `speed` that holds the number of times to update the screen and using the `setTimeout` function which will calculate the interval between each update.
This will be done in a function named `drawGame`.

```javaScript
function drawGame(){
    let speed=7;//The interval will be seven times a second.

    setTimeout(drawGame, 1000/speed);//update screen 7 times a second
}
```

### Display the Snake

In this section, we will first establish a variable called `tileCount` which will divide our screen into `20 small squares`. Then define the `horizontal position` of our snake as `headX`, and initialize it with value `10`, Also, we will define the `vertical position` of our snake as `headY`, and initialize it with value `10` which will center our snake.

Next is to define the initial size of our snake, by creating a variable called `tileSize` and assigning it a value of `18`.

To display our snake, we create a function named `drawSnake`, and then call it on our primary function `drawGame` as shown in the code snippet below.

```javaScript
let tileCount=20;
let tileSize=18;
let headX=10;
let headY=10;

function drawGame(){
    clearScreen();
   drawSnake();
}
 function drawSnake(){
      ctx.fillStyle="orange";
    ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize)

 }

```

In the above code snippet, the blush paint orange color in the rectangle starts from `coordinate (20,20)` to our rectangle total height and width.

It displays the following result.

![snake]((/education-engineering/how-to-build-a-snake-game-with-javascript/orangesnake.png)

### Use Arrow keys to change the Snake’s direction

First, set two variables namely `xvelocity` and `yvelocity`, and initialize them with values zero.

```javaScript
//initialize the speed of snake
let xvelocity=0;
let yvelocity=0;
```

In order to enable the use of the arrow key for snake navigation, we create an `event listener` as shown below.

```javaScript
 //add event listener to our body
 document.body.addEventListener('keydown', keyDown);
```

Next, we will check if the pressed key matches one of the arrow keys. This will be done in a function called `keyDown` which will compare keys and their `keycode`.

```javaScript
function keyDown(event)

//up
{
    if(event.keyCode==38){
        yvelocity=-1; //move one tile up
        xvelocity=0;

    }
    //down
    if(event.keyCode==40){
        yvelocity=1;//move one tile down
        xvelocity=0;
    }

//left
    if(event.keyCode==37){
        yvelocity=0;
        xvelocity=-1;//move one tile left
    }
    //right
    if(event.keyCode==39){
        yvelocity=0;
        xvelocity=1;//move one tile right
    }
}
```

If the key pressed matches the given `keycode` we change the snake position in a function named `changeSnakePosition`.

```javaScript
 function changeSnakePosition(){
     headX=headX + xvelocity;
     headY=headY+ yvelocity;

 }

 function drawGame(){
    clearScreen();
   drawSnake();
   changeSnakePosition()
}

```

We also need to check if the snake is moving in the opposite direction of the new, intended direction. This will prevent our snake from reversing, such as when you press the up arrow key when the snake is moving to the bottom.

```javaScript
function keyDown()
//up
{
    if(event.keyCode==38){

        if(yvelocity==1)
        return; //prevent snake from moving in opposite direction
        yvelocity=-1;
        xvelocity=0;

    }
    //down
    if(event.keyCode==40){
        if(yvelocity==-1)
        return;//prevent snake from moving in opposite direction
        yvelocity=1;
        xvelocity=0;
    }

//left
    if(event.keyCode==37){
        if(xvelocity==1)
        return;//prevent snake from moving in opposite direction
        yvelocity=0;
        xvelocity=-1;
    }
    //right
    if(event.keyCode==48){
        if(xvelocity==-1)
        return;//prevent snake from moving in opposite direcction
        yvelocity=0;
        xvelocity=1;
    }
}
```

### Incorporate Food

First, we will define the position of apple(food), both vertical and horizontal.

```javaScript
//draw apple
let appleX=5;
let appleY=5;
```

Then create a function named `drawApple` which displays the apple.

```javaScript
 function drawGame(){
    clearScreen();
   drawSnake();
   changeSnakePosition()
   drawApple()
}
 function drawApple(){
     ctx.fillStyle="red";// make apple red
     ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)//position apple within tile count
 }
```

The following should appear.

![food](/education-engineering/how-to-build-a-snake-game-with-javascript/apple.png)

### Collision detection

Let’s make the function `checkCollision` to generate an x-coordinate and a y-coordinate for the food’s positions. We also have to ensure that the food is not located where the snake currently is.

If it is, then we have to generate a new food location. See the functions below:

```javaScript
 function drawGame(){
    clearScreen();
   drawSnake();
   changeSnakePosition()
   checkCollision()
   drawApple()
}
 function checkCollision(){
     if(appleX==headX && appleY==headY){
         appleX=Math.floor(Math.random()*tileCount);
         appleY=Math.floor(Math.random()*tileCount);
     }
 }
```

### Increase length of the Snake

We need to define an array named `snakeParts` which will hold the parts of the snake and a variable named `tailLength` which will keep track of the snake length. I.e it ensures the snake has the intended parts.

```javaScript
// array for snake parts
const snakeParts=[];
let tailLength=2; //initial parts of snake

function checkCollision(){
     if(appleX==headX && appleY==headY){ //collision happens when left, right ,top, and bottom sides of apple is in contact with any part of snake
         appleX=Math.floor(Math.random()*tileCount); //generate apple to a random horizontal position
         appleY=Math.floor(Math.random()*tileCount);//generate apple to a random vertical position
         tailLength++;

     }
```

Then we will track snake movement to ensure the added parts come after the tail.

```javaScript
class snakePart{
constructor(x, y){
    this.x=x;
    this.y=y;
}

}
```

let us now draw the added parts of our snake. We will do it on the `drawSnake` function; The added features will be of color green.

```javaScript
 function drawSnake(){

    ctx.fillStyle="green";
    //loop through our snakeparts array
    for(let i=0;i<snakeParts.length;i++){
        //draw snake parts
        let part=snakeParts[i]
         ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize,tileSize)
    }
     snakeParts.push(new snakePart(headX,headY));//put item at the end of list next to the head
 }
```

### Incorporate score

We need to initialize a `score` variable to zero and increment it every time the snake eats the food. To display the score, we will create a function named `drawScrore`. Which will set the font color to white, and position `score` text at the right-hand corner.

```javaScript
//scores
let score=0;

function drawGame(){
    changeSnakePosition();
    clearScreen();
    drawSnake();
    checkCollision()
    drawApple();
    drawScore();
    setTimeout(drawGame, 1000/speed);//update screen 7 times a second
}
// score function
function drawScore(){
ctx.fillStyle="white"// set our text color to white
ctx.font="10px verdena"//set font size to 10px of font family verdena
ctx.fillText("Score: " +score, canvas.clientWidth-50,10);// position our score at right hand corner

}
```

Now let us increment the score value whenever there is a collision.

```javaScript
 function checkCollision(){
     if(appleX==headX && appleY==headY){ //if left, right, top, and bottom side of apple is in contact with any part of snake
         appleX=Math.floor(Math.random()*tileCount); //move apple to a random horizontal position
         appleY=Math.floor(Math.random()*tileCount);//move apple to a random vertical position

         tailLength++; // increase tail length
         score++; //increase our score value

     }
 }
```

These results should appear.
![score](/education-engineering/how-to-build-a-snake-game-with-javascript/score.png)

### Implement game over logic

There are two cases in which the game can end: The head of the snake collides with its body and the head of the snake collides with the canvas boundary. We will check these conditions in a function named `isGameOver` which returns true or false.

```javaScript
//Game Over function
function isGameOver(){
    let gameOver=false;
    //check whether game has started
    if(yvelocity===0 && xvelocity===0){
        return false;
    }
    if(headX<0){//if snake hits left wall
        gameOver=true;
    }
    else if(headX===tileCount){//if snake hits right wall
        gameOver=true;
    }
    else if(headY<0){//if snake hits wall at the top
        gameOver=true;
    }
    else if(headY===tileCount){//if snake hits wall at the bottom
        gameOver=true;
    }

    //stop the game when snake bumps into itself

     for(let i=0; i<snakeParts.length;i++){
         let part=snakeParts[i];
         if(part.x===headX && part.y===headY){//check whether any part of snake is occupying the same space
             gameOver=true;
             break; // to break out of for loop
         }

            return gameOver;// this will stop the execution of the drawgame method
     }

```

Now we will check if the value returned by `isGameOver` is true, if it is we stop further execution of the game.

```javaScript
// create game loop-to continously update screen
function drawGame(){
    changeSnakePosition();
    // game over logic
    let result=isGameOver();
    if(result){// if result is true stop other following function from exucuting
        return;
    }

    clearScreen();
    drawSnake();
    checkCollision()
    drawApple();


    drawScore();
    setTimeout(drawGame, 1000/speed);//update screen 7 times a second
}
```

Stopping execution results.

![stop execution](/education-engineering/how-to-build-a-snake-game-with-javascript/stopexecution.png)

### Add Game Over Text

This text will appear whenever the game is over. We will implement this on a function named `isGameOver`.

```javaScript
function isGameOver(){
    let gameOver=false;
    //check whether game has started
    if(yvelocity===0 && xvelocity===0){
        return false;
    }
    if(headX<0){//if snake hits left wall
        gameOver=true;
    }
    else if(headX===tileCount){//if snake hits right wall
        gameOver=true;
    }
    else if(headY<0){//if snake hits wall at the top
        gameOver=true;
    }
    else if(headY===tileCount){//if snake hits wall at the bottom
        gameOver=true;
    }

    //stop the game when snake bumps into itself

     for(let i=0; i<snakeParts.length;i++){
         let part=snakeParts[i];
         if(part.x===headX && part.y===headY){//check whether any part of snake is occupying the same space
             gameOver=true;
             break; // to break out of for loop
         }
     }


    //display text Game Over
    if(gameOver){
     ctx.fillStyle="white";
     ctx.font="50px verdana";
     ctx.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2);//position our text in center
    }

    return gameOver;// this will stop the execution of the draw game method
}
```

Game over results.

![game over](/education-engineering/how-to-build-a-snake-game-with-javascript/gameoverText.png)

You can get the complete code [here](https://github.com/Kamau-ke/How-to-buid-snake-game-with-javaScript/tree/main/snake%20game)

### Conclusion

Projects are best for learning any programming language. Throughout this article, Lerner was able to understand and implement the javaScript function, math function, and Html canvas.

Happy coding!
