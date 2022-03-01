### Introduction

The best way to deal with getting familiar with any programming language is through active ventures. The Snake Game is a straightforward game that can be made utilizing fundamental JavaScript and HTML abilities.

Snake is a retro computer game delivered in the last part of the 1970s. The principal objective is to explore a snake while eating however many apples as could reasonably be expected while staying away from contact with the snake's body or the dividers.

In this instructional exercise, I'll tell you the best way to make a Snake Game utilizing JavaScript and HTML bit by bit.

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

First, we need to create an `index.html` file where our HTML code will be stored, and then open it with your favorite browser.
To draw our canvas we will use the `<canvas>` tag which is used to render graphics with javaScript.

```HTML
 <canvas id="game" width="400" height="400"/>
```

The `id` is used to identify our canvas which has both height and properties of 400px.
Until now our canvas is not visible in the browser. To make it visible, we have to style it using CSS.
To style, insert `<style>` and `</style>` tag inside the `<head>` and `</head>` tag. Copy and paste the following code.

```css
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

Now, we will create an index.js file that will contain the logic. For the file to be effective on our HTML main file, we need to link the js file to the HTML file. This is done by adding the following line of code below after the `</canvas>` tag.

```javaScript
<script src="index.js"></script>
```

Let's add a black background color using javaScript.To do so, we first select our canvas by referring to it by its Id:
<br>Next, we will get canvas '2d' context to draw it in 2D space.

```javaScript
const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
```

Let's create a game loop that will continuously update the screen.
But first, we will create a variable named **speed** which will hold the number of times to update the screen.
<br>Now let's update our screen, and this is done by the use of the `setTimeout` function. In this case, we will refresh our screen 7 times a second.
<br> We will create **drawGame** function which will incorporate all other functions which will be included in our code, i.e When this function is called all the other functions in the code also get called.

```javaScript
let speed=7;
function drawGame(){

    setTimeout(drawGame, 1000/speed);//update screen 7 times a second
}
```

Since we have our canvas selected we can do whatever we want with it, with that Let's add black background color to it by creating a new function called **clearScreen** and calling it in our main function **drawGame**.

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

The **fillStyle** method is a kind of brush, which we are telling it to paint our screen with black color and it's used together with the **fillRect** method which tells the brush to paint the full rectangle from position 0 left and 0 top, to the actual height and width of our canvas.
<br>The following screen should appear.

![black screen](/education-engineering/how-to-build-a-snake-game-with-javascript/canvasblank.png)

### Display the snake

First, we will establish a variable called **tileCount** which will divide our screen into 20 small squares vertically and horizontally. Then we will define the horizontal position of our snake which is **headX** and initialize it with 10, Also we will define the vertical position of our snake as **headY** and initialize it with 10. This will center our snake.
<br>So far have the position of the snake but we don't have its size. To define the size of our snake we will use a variable called **tileSize** and assign a value of 18 which will be the initial size of the snake.
<br>Let's now display our snake, To do so we will define a function called **drawSnake** and then call it in our main function **drawGame** as shown in the following code.

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

In the above code, we are telling the blush to paint orange color to our rectangle starting from the left corner to the total height and width of our rectangle which is 18.
<br>The following should appear.
![snake]((/education-engineering/how-to-build-a-snake-game-with-javascript/orangesnake.png)

### Use arrow keys to move and change the snake’s direction

First, we are going to set two variables, I will name mine **xvelocity** and **yvelocity**, then initialize them with zero.

```javaScript
//initialize the speed of snake
let xvelocity=0;
let yvelocity=0;
```

Now let's implement event listener to our body to use arrow keys to move our snake.

```javaScript
 //add event listener to our body
 document.body.addEventListener('keydown', keyDown);
```

The `keydown` event listens to any press of keys on the keyboard. When a key is pressed **keyDown** function gets called as shown in the above code.
<br>To implement the arrow keys we will use the `keyCode` value, for example, the left arrow has the number 37 as its keyCode.

```javaScript
function keyDown()
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

As you can recall our **headY** which is the vertical position of our snake was set to 10, Now when the up arrow key is pressed it subtracts one tile from the ten tiles, and the snake vertical position changes to nine and so on. For the down arrow key **headY** is increased by one in each keypress. The same applies to **headX**.
<br>As you have realized when you have implemented the above code snake's position didn't change that because we have implemented logic but we have not applied it to our main snake position. Let's do that by defining a new function name `changeSnakePosition` and calling it to our main function **drawGame**.

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

Now let's prevent our snake from moving in the opposite direction when opposite keys like up and down are pressed.

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

Then we will add a function called **drawApple** then call it on the main function **drawGame**.Inside **drawApple** functions that's where we will define the look of our apple.

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

### Collition detection

You do realize when you move the snake across the apple nothing happens. let's implement collision detection by defining a function called ** checkCollision** and calling it on our main function **drawGame** before the **drawApple** function.
<br>Collision happens only when the **headX** or **headY** of the snake share the same position with **appleX** and **appleY**, when that happens we will move apple to a random position using **math.random** function in javaScript.Let's implement it in the code.

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

First, we will create a class called `snakePart` which will track the length of the snake. The constructor of our class will have x and y positions.

```javaScript
class snakePart{
constructor(x, y){
    this.x=x;
    this.y=y;
}

}
```

Then we will define an empty array that will hold the parts of the snake. In my case I will call it **snakeparts**, we define another variable that will initialize the size of the snake, I will name it **tailLength**. Then we will check if there is a collision, if there is we will increase the length of the snake by incrementing it by one.

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

Now, let's add the parts to our snake in case of collision. We will do it on the **drawSnake** function, We will style the added parts to color green. Then we will add the parts to the **snakeParts** array.

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

First, we will initialize the score variable and set it to zero, then we will create a function called **drawScore** and call it in our main function **drawGame**.On our drawScore function, we will set score text using `ctx.fillText` then we will set its color to white using `ctx.fillStyle`, after that we will position it to the right-hand corner as shown in the following code.

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

The game is over whenever the snake hits the wall or crushes to its own body. Let's implement that logic in a function called it `isGameOver`.Inside this function, we will initialize a boolean called **gameOver** and set it to false. When a snake hits any wall or crushes to its own body the boolean will be set to true.

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

    //stop the game when snake crushes to its own body

     for(let i=0; i<snakeParts.length;i++){
         let part=snakeParts[i];
         if(part.x===headX && part.y===headY){//check whether any part of snake is occupying the same space
             gameOver=true;
             break; // to break out of for loop
         }

            return gameOver;// this will stop the execution of draw game method
     }

```

On our **drawGame** we will define a variable that will contain the value returned by **isGameOver** function. We will check if that value is true, if it's true we will stop other functions from executing.

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

The game over text will appear whenever a game is over, So we will implement it on **isGameOver** function, where will check whether the snake has crushed its own body or wall. Then the game over text will be displayed.

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

    //stop the game when snake crushes to its own body

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

    return gameOver;// this will stop the execution of draw game method
}
```

![game over](/education-engineering/how-to-build-a-snake-game-with-javascript/gameoverText.png)

You can get the complete code [here](https://github.com/Kamau-ke/How-to-buid-snake-game-with-javaScript/tree/main/snake%20game)

### Conclusion

    Projects are best for learning any programming language. Throughout this article, Lerner was able to understand and implement the javaScript function, math function, and Html canvas.

    Happy coding!
