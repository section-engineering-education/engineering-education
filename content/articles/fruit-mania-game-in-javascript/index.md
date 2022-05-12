---
layout: engineering-education
status: publish
published: true
url: /fruit-mania-game-in-javascript/
title: Creating Fruit Mania Game Using Javascript
description: In this instructional exercise, you will learn how to make a fruit-themed version of the classic arcade game Fruit Ninja. The main objective is to see how creative you can be with your degree of javaScript expertise.
author: esther-maina
date: 2021-11-26T00:00:00-03:08
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/fruit-mania-game-in-javascript/hero.png
    alt: Creating Fruit Mania Game Using Javascript Hero Image
---
In this instructional exercise, you will learn how to make a fruit-themed version of the classic arcade game (Fruit Ninja). The main objective is to see how creative you can be with your degree of javaScript expertise.
<!--more-->
### Prerequisites
Before we get started on the game itself, we should be aware of some of the methods that will be used to achieve our project's goal.

These methods include:
- `addEventListener()`
- `setAttribute()`
- `setTimeout()`
- `setInterval()`
- `createElement()`
- `appendChild()`
- `every()`
- `includes()`

You can refer to the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for more information.

### Table of content
- [Prerequisites](#prerequisites)
- [Table of content](#table-of-content)
- [Fruit mania game](#fruit-mania-game)
  - [index.html](#indexhtml)
  - [style.css](#stylecss)
  - [app.js](#appjs)
- [Conclusion](#conclusion)

### Fruit mania game
First and foremost, create three files, namely:
1. `index.html`
2. `style.css`
3. `app.js`

#### index.html
Our goal is to use this file to create a `scoreboard` that will record our progress and also a grid where all of our candies will be placed.

In your `html` file, paste the code shown below:

```html
<div class="score-board">
  <h3>score</h3>
  <h1 id="score"></h1>
</div>
<div class="grid"></div>
```

#### style.css
Since the main purpose is to understand the logic of the game, we will not spend much time on styling.

We will only have some basic styling, to which you can add as many styling as you desire.

Remove the obnoxious default margins and padding, as demonstrated in the example below:

```css
* {
  margin: 0;
  padding: 0;
}
```

For the body, we want to make sure that the contents are fairly dispersed across the area available, thus we will style the body as follows:

```css
body {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
```

We will be able to store our candy in this `grid` box. We will have the following styles to make it more appealing:

```css
.grid {
  margin-top: 34px;
  height: 560px;
  width: 560px;
  display: flex;
  flex-wrap: wrap;
}

.grid div {
  height: 70px;
  width: 70px;
}
```

#### app.js
First and foremost, we have an event listener named `DOMContentLoaded` as part of our boilerplate setup, and this is simply checking to see if our script file is loaded when the HTML element is displayed on the screen.

```javascript
document.addEventListener("DOMContentLoaded", () => {});
```

This event listener will be the container for all of our javascript code.

The next step is to design a board that will be `8` inches wide to provide us with `70` little grids that will be ideal for storing our candies.

For this, build a function called 'createBoard()' that looks like the one shown below:

```javascript
// create Board
let createBoard = () => {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    let randomColor = Math.floor(Math.random() * candyColors.length);
    square.style.backgroundImage = candyColors[randomColor];
    grid.appendChild(square);
    squares.push(square);
  }
};

createBoard();
```

It will also make the little divisions draggable, and it will assign them random colors as well as the other features of this function.

We defined four variables to drag candies as well as replace them:
1. `let colorBeingDragged`.
2. `let colorBeingReplaced`.
3. `let squareIdBeingDragged`.
4. `let squareIdBeindReplaced`.

We employed event listeners to assist us in completing this task, and each event is associated with a function, for example, a method dragOver() is associated with the event `dragover,` and so on.

Examine the code below:

```javascript
//drag the candies
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeindReplaced;
    squares.forEach(square => square.addEventListener('dragstart', dragstart))
    squares.forEach(square => square.addEventListener('dragEnd', dragEnd))
    squares.forEach(square => square.addEventListener('dragOver', dragOver))
    squares.forEach(square => square.addEventListener('dragEnter', dragEnter))
    squares.forEach(square => square.addEventListener('dragLeave', dragLeave))
    squares.forEach(square => square.addEventListener('dragDrop', dragDrop))


    function dragstart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        console.log(colorBeingDragged);
        console.log(this.id, 'dragstart');
    }

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover');
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, 'dragenter');
    }

    function dragLeave() {
        console.log(this.id, 'dragleave');
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop');
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeindReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    }

    function dragEnd()
```

Since we are now able to drag the candies, it is time to move on to the more intriguing aspect of the game: determining whether or not a move is valid.

The result will be an additional function to verify if candies match in a column or row, depending on how they are grouped together. It is possible to obtain a score in a match:

```javascript
function dragEnd() {
  console.log(this.id, "dragend");
  //what is a valid move
  let validMoves = [
    squareIdBeingDragged - 1,
    squareIdBeingDragged - width,
    squareIdBeingDragged + 1,
    squareIdBeingDragged + width,
  ];

  let validMove = validMoves.includes(squareIdBeindReplaced);
  if (squareIdBeindReplaced && validMove) {
    squareIdBeindReplaced = null;
  } else if (squareIdBeindReplaced && !validMove) {
    squares[squareIdBeindReplaced].style.backgroundImage = colorBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  } else {
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  }
}
```

Now that we have determined a valid move, we may graciously search for a match, in this case, we will find a match for the number `3` candies.

You are allowed to search for matches for any number you want, if you so like. When a match is found, the score will be updated and a new batch of candies will be generated.

```javascript
 const checkRowForThree = () => {
        for (i = 0; 1 < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
            if (notValid.includes(i)) continue;
            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                })
            }
        }
    }
    checkRowForThree();

    const checkColumnForThree = () => {
        for (i = 0; 1 < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                })
            }
        }
    }
    checkColumnForThree();

    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = '';
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                let isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[1].style.backgroundImage === '') {
                    let randomColor = Math.floor(Math.random() * candyColors.length);
                    squares[1].style.backgroundImage = candyColors[randomColor];
                }
            }
        }
```

Here is a complete reference of the source code:

HTML file:

```html
<div class="score-board">
  <h3>score</h3>
  <h1 id="score"></h1>
</div>
<div class="grid"></div>
```

Stylesheet:

```css
* {
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.grid {
  margin-top: 34px;
  height: 560px;
  width: 560px;
  display: flex;
  flex-wrap: wrap;
}

.grid div {
  height: 70px;
  width: 70px;
}
```

JavaScript file:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const squares = [];
  let scoreDisplay = document.getElementById("score");
  let score = 0;
  const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];

  // create Board
  let createBoard = () => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  };

  createBoard();
  //drag the candies
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeindReplaced;
  squares.forEach((square) => square.addEventListener("dragstart", dragstart));
  squares.forEach((square) => square.addEventListener("dragEnd", dragEnd));
  squares.forEach((square) => square.addEventListener("dragOver", dragOver));
  squares.forEach((square) => square.addEventListener("dragEnter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragLeave", dragLeave));
  squares.forEach((square) => square.addEventListener("dragDrop", dragDrop));

  function dragstart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged);
    console.log(this.id, "dragstart");
  }

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragover");
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragenter");
  }

  function dragLeave() {
    console.log(this.id, "dragleave");
  }

  function dragDrop() {
    console.log(this.id, "dragdrop");
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeindReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }

  function dragEnd() {
    console.log(this.id, "dragend");
    //what is a valid move
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];

    let validMove = validMoves.includes(squareIdBeindReplaced);
    if (squareIdBeindReplaced && validMove) {
      squareIdBeindReplaced = null;
    } else if (squareIdBeindReplaced && !validMove) {
      squares[squareIdBeindReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }

  const checkRowForThree = () => {
    for (i = 0; 1 < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  };
  checkRowForThree();

  const checkColumnForThree = () => {
    for (i = 0; 1 < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  };
  checkColumnForThree();

  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        let isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[1].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[1].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  window.setInterval(() => {
    moveDown();
    checkRowForThree();
    checkColumnForThree();
  }, 100);
});
```

Output:

![fruit-mania-game](/engineering-education/fruit-mania-game-in-javascript/fruit-mania-game.png)

### Conclusion
With the knowledge provided, you now understand how to set the attributes of an HTML element, how to create an HTML element, how to work with timers, and most significantly, how to use javascript for game development.

There are other ways of creating the game discussed in this post, this was simply a straightforward method of doing so. You can experiment with different approaches to make it more fascinating. For more practice, you can develop a Tetris game using javascript.

Happy Coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)