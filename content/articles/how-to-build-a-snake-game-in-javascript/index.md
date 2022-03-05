### Introduction

The best way to deal with and get familiar with any programming language is through active ventures. The Snake game is a straightforward game that can be made by utilizing JavaScript and HTML abilities.

Snake is a retro computer game delivered in the last part of the 1970s. The principal aim is to explore a snake while eating as many apples as could be expected while staying away from contact with the snake's body or the dividers.
Snake is an old-school video game from the late 1970s. The primary goal is to navigate a snake while eating as many apples as possible while avoiding contact with the walls or the snake's body.
In this instructional exercise, I'll tell you the best way to make a Snake Game utilizing JavaScript and HTML bit by bit.
In this article, I’ll show you step-by-step how to create this Snake Game using JavaScript and HTML.

### Prerequisites

- Basic CSS knowledge
- Basic javaScript knowledge

### Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Display the Canvas](#display-the-canvas)
- [Display the snake](#display-the-snake)
- [Use arrow keys to move and change the snake’s direction](#use-arrow-keys-to-move-and-change-the-snake’s-direction)
- [Incorporate food](#incorporate-food)
- [Collition detection](#collision-detection)
- [Increase length of snake](#increase-length-of-snake)
- [Incorporate score](#incorporate-score)
- [Implement game over logic](#implement-game-over-logic)
- [Add game over text](#Add-game-over-text)
- [Conclusion](#conclusion)

### Display the Canvas

First, we need to display the game board and the snake. Start by creating the file `index.html`. This will contain all our code. Next, open the file in your preferred browser.

To be able to create our game, we have to make use of the HTML `<canvas>`, which is used to draw graphics with JavaScript.

```HTML
 <canvas id="game" width="400" height="400"/>
```

**Note**
The `id` is used to identify our canvas with width and height properties of 400px.

Until now the browser will not display anything since the canvas has no default background. To make our canvas visible, we can give it a border by writing some CSS code.

To do that, we need to insert `<style>` and `</style>` tags after the `</title>` tag. Then Copy and paste the following block of code.

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

Now, we will create an index.js file that will contain the logic. For the file to be effective on our HTML main file, we need to link the js file to the HTML file. This is done by adding the following line of code below the `</canvas>` tag.

```javaScript
<script src="index.js"></script>
```

Now, we will create an index.js file that will contain the logic. For the file to be effective on our HTML main file, we need to link the js file to the HTML file. This is done by adding the following line of code below the `</canvas>` tag.

```javaScript
 <script src="index.js"></script>
```

Now, we can make the canvas for our snake to navigate. First, we get the canvas element using the id `game`. Next, we get the canvas “2d context", which means that it will be drawn into a 2D space. We will then ​make a 400 x 400 black rectangle which will cover the entire canvas starting from the top left corner 0, to the entire rectangle.

```javaScript
   const canvas=document.getElementById('game'); const ctx=canvas.getContext('2d');
```

Now, Let's add black background color to our canvas by creating a new function called **clearScreen** and calling it on our primary function **drawGame**.

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

The **fillStyle** method is a kind of brush, which we are telling to paint our screen with black color, and it's used together with the **fillRect** method, which means the brush to paint the entire rectangle from position (0,0) to the actual height and width of our canvas.
<br>The following screen should appear.

![black screen](/education-engineering/how-to-build-a-snake-game-with-javascript/canvasblank.png)

Now, we will create a game loop that will update the screen; by creating a variable named **speed** which will hold the number of times to update the screen, then use the `setTimeout` function which will calculate the interval between each update. I.e . The interval will be seven times a second.
This will be done in a function named **drawGame**.

```javaScript
function drawGame(){
    let speed=7;

    setTimeout(drawGame, 1000/speed);//update screen 7 times a second
}
```

### Display the snake

First, we will establish a variable named `tileCount` which will divide our screen into 20 small squares. Then we will define the horizontal position of our snake as **headX**, and initialize it with 10, Also, we will define the vertical position of our snake as **headY**, and initialize it with 10. This will center our snake.
So far, have the position of the snake but we don't have its size. To define the size of our snake, we will create a variable named **tileSize** and assign a value of 18, which will be the initial size of our snake.

Let's now display our snake, To do so, we will define a function named **drawSnake**, and then call it on our primary function **drawGame** as shown in the following code.

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

In the above code, we tell the blush to paint orange color to our rectangle starting from the left corner to our rectangle's total height and width.

The following should appear.
![snake]((/education-engineering/how-to-build-a-snake-game-with-javascript/orangesnake.png)

### Use arrow keys to move and change the snake’s direction

First, we are going to set two variables, I will name mine,**xvelocity** and **yvelocity**, then initialize them with zero.

```javaScript
//initialize the speed of snake
let xvelocity=0;
let yvelocity=0;
```

Now let's put in place event listener to our body to enable the use of arrow keys for snake navigation.

```javaScript
 //add event listener to our body
 document.body.addEventListener('keydown', keyDown);
```

Let’s make the function **keyDown**. This will check if the pressed key matches one of the arrow keys. If it does, we will change the vertical and horizontal positions. We will use the `keyCode` value, which is a number assigned to each key.

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

As you can recall, our **headY** which is the vertical position of our snake was set to 10, Now when the up arrow key is pressed, it subtracts one tile from the ten tiles, and the snake's vertical position changes to nine and so on. For the down arrow key, **headY** is increased by one in each keypress. The same applies to **headX**. As you have realized when you have implemented the above code snake's position didn't change, that's because we have implemented logic but, we have not applied it to our main snake position. Let's do that by defining a new function named **changeSnakePosition**, and calling it on our primary function **drawGame**.

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

### Incorporate food

First, we will define the position of apple(food), both vertical and horizontal.

```javaScript
//draw apple
let appleX=5;
let appleY=5;
```

We also need a function to draw the food on the canvas and update **drawGame** to incorporate the **drawApple** function as shown in the following block of code.

```javaScript
 function drawGame(){
    clearScreen();
   drawSnake();
   changeSnakePosition()
   drawApple()
}
 function drawApple(){
     ctx.fillStyle="red";
     ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)//position apple within tile count
 }
```

The following should appear.

![food](/education-engineering/how-to-build-a-snake-game-with-javascript/apple.png)

### Collision detection

Let’s make the function **checkCollision** to generate an x-coordinate and a y-coordinate for the food’s positions. We also have to ensure that the food is not located where the snake currently is.

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

### Increase length of the snake

The snake will grow whenever the head of the snake is at the same position as the food. We will track this on a class named **snakePart**.

```javaScript
class snakePart{
constructor(x, y){
    this.x=x;
    this.y=y;
}

}
```

Now, we will define an empty array that will hold the parts of the snake. In my case, I will call it **snakeParts**, and define another variable that will initialize the snake's size. I will name it **tailLength**. Then we will check if there is a collision; if there is, we will increase the snake's length by incrementing it by one.

```javaScript
// array for snake parts
const snakeParts=[];
let tailLength=2; //initial length of snake

function checkCollision(){
     if(appleX==headX && appleY==headY){ //collision happens when left, right ,top, and bottom sides of apple is in contact with any part of snake
         appleX=Math.floor(Math.random()*tileCount); //Move apple to a random horizontal position
         appleY=Math.floor(Math.random()*tileCount);//Move apple to a random vertical position
         tailLength++;

     }

```

Now, let's draw the parts of our snake. We will do it on the **drawSnake** function; The added features will be the color green. Then we will add the items to the snake parts array.

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

We need to initialize a score variable and increment it every time the snake eats the food. To display the score, we will need a new function named **drawScrore**. Here, we will set score text using `ctx.fillText` and set the color to white using `ctx. fillStyle`; after that, we will position it to the right-hand corner as shown in the following code.

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

Now let's increment the score value whenever there is a collision.

```javaScript
 function checkCollision(){
     if(appleX==headX && appleY==headY){ //if left, right, top, and bottom side of apple is in contact with any part of snake
         appleX=Math.floor(Math.random()*tileCount); //move apple to a random horizontal position
         appleY=Math.floor(Math.random()*tileCount);//move apple to a random vertical position

         tailLength++;
         score++; //increase our score value

     }
 }
```

This is how it should look.
![score](/education-engineering/how-to-build-a-snake-game-with-javascript/score.png)

### Implement game over logic

To prevent our snake from moving infinitely, we need to add boundary conditions. For this, let’s make the function **isGameOver**, which returns true when the game has ended and false if otherwise.

There are two cases in which the game can end: The head of the snake collides with its body and the head of the snake collides with the canvas boundary.
These two conditions are incorporated in the code below:

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

On our **drawGame** function, we will define a variable that will contain the value returned by the **isGameOver** function. We will check if that value is true, if it's true we will stop other functions from executing.

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

![stop execution](/education-engineering/how-to-build-a-snake-game-with-javascript/stopexecution.png)

### Add game over text

The game over text appears whenever the snake bumps itself or hits the walls. This will be implemented in a function named **isGameOver**.

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

![game over](/education-engineering/how-to-build-a-snake-game-with-javascript/gameoverText.png)

You can get the complete code [here](https://github.com/Kamau-ke/How-to-buid-snake-game-with-javaScript/tree/main/snake%20game)

### Conclusion

Projects are best for learning any programming language. Throughout this article, Lerner was able to understand and implement the javaScript function, math function, and Html canvas.

Happy coding!
