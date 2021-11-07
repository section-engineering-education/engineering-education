---
layout: engineering-education
status: publish
published: true
url: /building-a-calculator-a-javascript-project-for-beginners/
title: How to Build a Calculator using JavaScript
description: This article will guide you on how to build a calculator using JavaScript. This project is suitable for beginners since it allows you to gain crucial skills and knowledge.
author: doro-onome
date: 2021-05-28T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/building-a-calculator-a-javascript-project-for-beginners/hero.jpg
    alt: Building a Calculator Using JavaScript
---
Building a web calculator is a great project, especially if you have just started learning JavaScript. It is quite simple for people of any skill level. This project covers the interactions with UI and key JavaScript methods. 
<!--more-->
In this article, you will be taken through the various HTML and CSS elements along with Vanilla JavaScript and modern ES6 practices used in building a functional and responsive calculator, as shown in the image below:

![calculator-image](/engineering-education/building-a-calculator-a-javascript-project-for-beginners/calculator-image.png)

### Prerequisites
- Any good Text editor.
- Basic understanding of JavaScript and HTML.

### Designing the calculator
To get started, you need to consider the basic functionalities of a calculator. They include `addition`, `subtraction`, `multiplication`, `division`, `delete`, `all-clear`, and of course, the ability to use `decimal numbers` in performing these operations.

In your text editor, create `three` separate folders for your `HTML`, `CSS` and `JavaScript`. This just basically makes your code more organized. 

In your `HTML` folder, you can link `CSS` and `JavaScript` files using the code below:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Calculator</title>
    <link href="Calculator with Js\style.css" rel="stylesheet">
    <script src="Calculator with JS\script.js" defer></script>
```

The next thing you need to do is add all the different HTML elements. We will use `grid` for a nice design. Therefore, create a `div` with a class named `calculator-grid`. 

```html
   <div class="calculator-grid">
```

You will put all the different `HTML elements` and `buttons` inside the above `calculator-grid` div.

Below is the HTML code containing the required components:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <title>Calculator</title>
    <link href="Calculator with Js\style.css" rel="stylesheet">
    <script src="Calculator with JS\script.js" defer></script>
    <div class="calculator-grid">
        <div class="output">
            <div class="previous-operand"></div>
            <div class="current-operand"></div>
        </div>
        <button class="span-two">AC</button>
        <button>DEL</button>
        <button>÷</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button class="span-two">=</button>
    </div>
</head>
<body>
</body>
</html>
```

The above HTML code contains several `div` classes. The `output` class represents the calculator screen. The `previous-operand` represents the result of the `previous` operation in the calculator, while the `current-operand` class represents the `current` operation on the calculator. 

The `span-two` class represents the buttons that will occupy `two` columns on the calculator. You can `copy paste` the division sign (÷) from google or anywhere else since it is not available on your keyboard.

This is how your calculator would look like at this point:

![calculator-buttons](/engineering-education/building-a-calculator-a-javascript-project-for-beginners/calculator-buttons.png)

### Styling the calculator
Next, we need to style the calculator using `CSS`. First, select all the elements, including the `before` and `after` elements. We can then apply the `box-sizing` attribute and set it as `border-box`. 

You can also change the `font-family` and `font-weight` of the calculator using the code below:

```css
*, *::before, *::after {
  box-sizing: border-box;
  font-family: Gotham Rounded, sans-serif;
  font-weight: normal;
}
```

Next, we need to style the background by using the `body` element, as shown below:

```css
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(to right, #CBCE91FF, #EA738DFF);
  }
```

The next step is to style the `calculator-grid` div that we defined earlier. It wraps all of our different `buttons` and `elements`. We can set the `display` to `grid`. 

We can also use the `justify-content` attribute to set it to the center of the screen. Besides, the `align-content` attribute can help align items to the center of the screen. 

At this point, you may notice that the `calculator-grid` is not arranged vertically. We can fix that by setting the `min-height` to `100vh`. This means that the calculator grid will fill `100%` of the height all the time. 

Another thing is that `buttons` should be aligned at the center of your screen and spaced out. To make a regular calculator, we have to use `grid-template-columns` then set it to `repeat`, and each column could be `100px wide`. We can also do the same thing for the `grid-template-rows`. 

Here is the code below:

```css
.calculator-grid {
    display: grid;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: minmax(120px, auto) repeat(5, 100px);
    }
```

For the `output screen` to grow as large as it needs to and be adaptable to any number of input values, we need to set the `minmax` value to 120px and the `maximum value` to `auto`, as demonstrated in the code above. 

Here is how your calculator looks like at this point:

![calculator-in-grid-form](/engineering-education/building-a-calculator-a-javascript-project-for-beginners/calculator-in-grid-form.png)

In order to properly position buttons, we should select all the buttons in the `calculator-grid` and apply these `CSS` elements, as shown below:

```css
.calculator-grid > button {
      cursor: pointer;
      font-size: 2rem;
      border: 1px, solid #FFFFFF;
      outline: none;
      background-color: rbga(255, 255, 255, 0.75);
    }

      .calculator-grid > button:hover {
        background-color: #a9a9a9;
      }
```

At this point, we can improve the calculator's design by changing the `align-items` attribute to `align-content` and set it to the `center`. 

We should then style the `span-two` class, which affects the `All-clear` and `Delete` buttons. We can set the `grid-column` to span `two` columns. 

### Styling the Output Window
Another important thing is to style the `output` displayed on the calculator. We can do that by adding a dummy text that says `123 +` to represent your previous operand and `456` to represent the current operand. 

Here is how the HTML code will look like:

```html
<div class="output">
<div class="previous-operand">123 +</div>
<div class="current-operand">456</div>
```

This way, you have a little bit of dummy text we can play around with while styling. Now, we can go ahead and style it. 

The first thing we can do is to set the `output` to `span` across the entire `width` of the calculator. We can do this by using the `grid-column` attribute again and setting it to span from column `1 to -1`, essentially just the last column.  

Next, we will change the `background-color` to `black` with transparency of `75%`. Then, we will align all the elements inside the container. 

The easiest way is by using `flex`. Therefore, set the `display` attribute to `flex` and `align-items` attribute to `flex-end`. The output elements will be positioned at the `right` side of the calculator. 

To space them out, we can use the `justify-content` attribute and set it to `space-around`. We can also change the `flex-direction` and set it to `column` to align the output elements vertically. 

Next, we can set the `padding` to any desired value. Also, to make the output elements `wrap` when they get too long, we can use the `word-wrap` attribute to choose where the words should break. 

Besides, we can add a `word-break` and set it to `break-all`. We should style the `previous` and `current` operands in the output class.

The final `CSS` code comes out like this:

```css
*, *::before, *::after {
  box-sizing: border-box;
  font-family: Gotham Rounded, sans-serif;
  font-weight: normal;
}

body {
  margin: 0;
  padding: 0;
  background: linear-gradient(to right, #CBCE91FF, #EA738DFF);
  }

  .calculator-grid {
    display: grid;
    justify-content: center;
    align-content: center;
    min-height: 100vh;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: minmax(120px, auto) repeat(5, 100px);
    }

    .calculator-grid > button {
      cursor: pointer;
      font-size: 2rem;
      border: 1px, solid #FFFFFF;
      outline: none;
      background-color: rbga(255, 255, 255, 0.75);
    }

      .calculator-grid > button:hover {
        background-color: #a9a9a9;
      }

      .span-two {
        grid-column: span 2;
        color: #adf802;
        background-color: rgba(139, 0, 139, 0.8);
      }

      .output{
        grid-column: 1 / -1;
        background-color: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        flex-direction: column;
        padding: 10px;
        word-wrap: break-word;
        word-break: break-all;
      }

      .output .previous-operand{
        color: rgba(255,255, 255, 0.75);
        font-size: 1.5rem;
      }

      .output .current-operand{
        color: white;
        font-size: 2.5rem;
      }
```

At this point, the calculator has already taken shape. Now, it is time to make it functional using JavaScript.

### The actual JavaScript
First, we should select all our calculator's buttons and operations. We can do this by putting some classes in the HTML file. However, since we do not want to mix `CSS` classes with `JavaScript` classes, we can use `data attributes` to select them instead. 

`data-operation` to represent your operation buttons, `data-numbers` to represent the `number` buttons, `data-all-clear` to represent the `All-Clear` button and `data-delete` to represent the `Delete` button. We can add these classes to the `previous-operand` and `current-operand`. 

Here's how it would look like in your code:

```html
  <div data-previous-operand class="previous-operand"></div>
    <div data-current-operand class="current-operand"></div>
<button data-all-clear class="span-two">AC</button>
  <button data-delete>DEL</button>
  <button data-operation>÷</button>
  <button data-number>1</button>
  <button data-number>2</button>
  <button data-number>3</button>
  <button data-operation>*</button>
  <button data-number>4</button>
  <button data-number>5</button>
  <button data-number>6</button>
  <button data-operation>+</button>
  <button data-number>7</button>
  <button data-number>8</button>
  <button data-number>9</button>
  <button data-operation>-</button>
  <button data-number>.</button>
  <button data-number>0</button>
  <button data-equals class="span-two">=</button>
```

The additions above are the only changes we need to make to the `HTML` file to select these elements in the JavaScript folder. 

In the JavaScript file, define some `constant variables` which will represent the `number` buttons. We will then perform a query using `document.querySelectorAll()`. This function will allow us to get all elements that match a certain string. 

In this case, we pick a `data` attribute that must be inside of brackets and we select '[data-number]' which is going to select all `number` elements. 

We can do the same thing but for the `operation` buttons. This also goes for the `Equals`, `All-clear` and `Delete` buttons as well as your `previousOperandTextElement` and `currentOperandTextElement`. 

The code will come out like this:

```javascript
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
```

You may notice that `document.querySelectorAll` was only used for the `numbers` and `operation` buttons. Well, this is because these buttons appear several times on the calculator.

Now that we have everything selected, we can start coding to make the calculator work. The first thing we should consider is how we will store the output. 

We can do that by creating a calculator class at the top of the file. In this class, we will put a constructor that will take all the inputs for it and all the calculator functions. 

This constructor is going to take the `previousOperandTextElement` and `currentOperandTextElement` so that we can determine where to place the display text for your calculator. We also need to create some variables in this class. 

As soon as we create the calculator, we should call the `this.clear` function because we have to reset the inputs. 

Here's how the code will look like:

```javascript
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
}
```

### The calculator functions
Next, we have to define the different operations that the calculator will perform. The first one is the `clear()` function, which will clear all the different variables. The next method is `delete()` for clearing a `single` number. 

We will also create a function that determines what will occur every time a user clicks on a number to add to the display called `appendNumber(number)`. 

We need a `chooseOperation(operation)` function that controls what will happen anytime a user clicks on any `operation` button. 

Another key function is `compute()`. It takes the values inside your calculator and displays the result.

Finally, a `updateDisplay()` function lets us update the values inside of the output. 

These functions are illustrated in the code snippet below:

```javascript
clear() {
}

delete() {
}

appendNumber(number) {
}

chooseOperation(operation) {
}

compute() {
}

updateDisplay() {
}
```

Now that we have defined all operations, we can now think about the different properties the calculator needs to store. We should determine the `previous operand` the user entered, the `current operand` they are working on, and the `operation` they have selected. 

Let's start working on the functions.

### clear() function
The `clear()` function will delete all the displayed values. We should set `this.currentOperand` to an empty string if the values on the output are removed. We can also do the same for the `previous operand`. We have to change `this.operation` to be `undefined`. 

Here's how the `clear` function should look like:

```javascript
clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
```

Next, let's focus on hooking all the `variables` and making them operate on the calculator object. The first thing we should do is to create a `calculator constant` and set it to `new calculator` then, we pass everything from the constructor into it. We then pass in the `previous` and `current operand` text elements. 

Here is how it looks like in the code:

```javascript
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
```

### appendNumber(number) function
Now that we have passed those elements in, we can then use this calculator object.

We will select a `number` button, and then use a `for.each` statement to loop over all these different buttons. We can also add an `EventListener` on the buttons using `button.addEventListener`. The `EventListener` will invoke something whenever the button is clicked. 

In this case, we will only add a number to the calculator. This can be done by calling the `appendNumber` function and using `button.innerText` to display it. 

Once that is done, we need to call the `calculator.updateDisplay` method, thereby making sure that the `displayed values` are constantly updated every time we click on a button on the calculator. 

The code snippet is shown below:

```javascript
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
```

To ensure that everything we have written is working, inside the `updateDisplay()` function, add  `this.currentOperandTextElement.innerText = this.currentOperand`. 

Inside the `appendNumber()` function, we will also change the `current operand` to match that number instead of `appending` the number. 

When we click on a number on the calculator, it should be displayed in the output box. However, you may notice that nothing shows up when you click on `operation` buttons. The appending number functions are, therefore, properly assigned to all the buttons. 

Next, let's write the `appendNumber()` function. All you need to do is to update the `current operand` value and append the number. We can use `this.currentOperand` and convert it to a string if it's a number. This way, we can easily append something to the end by using "+". 

Note that we should convert numbers to a string to prevent the compiler from performing the actual operation. When you save the file and click on numbers, you find that they constantly get added to the list. But, the period(.) symbol is also added when clicked. 

We can prevent this by checking if the string of numbers in the output includes a period(.), then `return`. This will stop your function from executing any further. Now, if you try to add multiple periods, it will only add one. 

Below is the complete `appendNumber()`:

```javascript
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
```

### chooseOperation(operation) function
We need to use the same technique we applied to the `numbers` buttons on `operation` buttons. However, instead of `appendNumber`, we will use `chooseOperation(button.innerText)` and update the display using `calculator.updateDisplay`. 

The code will look like this:

```javascript
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
```

In the `chooseOperation()` function, we need to do some calculations. 

When you click a number, followed by an operation on your calculator, you might want it to move up to the previous operand section for you to type in the other number to complete the entire operation. 

For instance, if you want to compute `2 + 60 `, you may want the `2 +` portion to move into the `previous operand` section of the display so that `60` will be typed in the `current operand` section. 

This operation can be implemented in the `chooseOperation()` function. The first thing to do is to set `this.operation` equal to the operation you passed. That way, your calculator is aware of what operation it desires to use when computing the value. 

Then, you set `this.previousOperand = this. currentOperand` so you are essentially saying you are through typing the current number, so you recycle that over to the previous operand. 

The new `current operand` also needs to be cleared by setting it to an empty string. You have to update your display. In the `updateDisplay()` function, add `this.previousOperandTextElement = this.previousOperand`.

If you go to your calculator and click any of the `operation` buttons, you will notice that they display even without clicking any number buttons. 

We need to add a check-in for that. You can just say if the current operation is empty, then `return`, which again will not let you execute any further into your code.

One more thing that you can add to the calculator is the ability to compute an operation automatically while simultaneously completing another one. 

For instance, if you type in `54 + 50` and then click on the `÷` button, the calculator should be able to compute `54 + 50`, making it `104` before dividing it automatically. 

We can do this by checking whether the `previous` operand is not equal to an `empty` string and invoking the `this.compute()` method. 

Here is what the code will look like:

```javascript
chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
```

With these two functions completed, you can now set all the values inside the calculator. All we need now is to work on how to compute things and display things.

### compute() function
We should add an `EventListener` to the `Equals` button. The EventListener will invoke the `compute` function and return the results. We then need to update the calculator's display. When you click the `Equals` button, it will call the `compute()` function. 

Here's the code linked to the Equals button:

```javascript
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
```

We can now perform the computation. The first thing you need to do is to create a variable that will store the result from the computation. We then need to create two extra variables. You'll have a preceding variable, and this is simply going to be that actual number version of your previous operand. 

You're just converting this `string` to a `number`, and you will do the same thing with the `current` operand. For example, when the user clicks on the `Equals` button without clicking any button before it, you do not want the code to run. You can fix that this way. 

You can say if it is not a number for previous, i.e., if it does not have a previous or current value, let it just `return`, which will cancel the function immediately. We will use a `switch` statement to determine or change the computation operation.

Here is the code for the `compute` function.

```javascript
compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
```

Now, the calculator can perform calculations. However, you will find out that you cannot clear things out, and that is because you have not implemented the `All-Clear` button yet. 

Here is the code to do that:

```javascript
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
```

Now you can use the `All-Clear` button on the calculator.

### delete() function
The last function to implement is the `delete()`. The first aspect you can do is to set `this.currentOperand = this.currentOperand`. We then convert this value to a `string` to get the last value of the string by using the `slice` method, as shown below. 

```javascript
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
```

You can now hook that variable up by implementing the Delete button. 

Below is the code to do that:
```javascript
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
```

Now, when you type a long string of characters, you can delete them one by one using the `Delete` button. The calculator is now fully functional, but the display still needs some work.

### updateDisplay function
The first thing you can do is to go into the `updateDisplay()` function and add an `if` statement. If we have an operation that is not null, then we will display the `previous` operand Text Element. 

We then display both the `previous` and `current` operands, as shown below:

```javascript
updateDisplay() {
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
```

On your calculator, you may notice that when you type a string of numbers, there are no commas to make the numbers more definitive. Well, we can change that by using a helper function and calling it `getDisplayNumber(number)`. We will then display the returned value. 

In short, we are going to add the `current` operand to the `updateDisplay()` function whenever it is invoked. Now, the changes you make in this function, are going to be mirrored in both the `previous` and the `current` operand values. 

Here is how the entire `updateDisplay()` function code would look like:

```javascript
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}
```

However, you will notice that numbers are not being formated correctly. This is because you need to make sure you use a `float` number in the `getDisplayNumber()` function instead of an `integer`, as shown below. 

```javascript
getDisplayNumber(number) {
    const floatNumber = parseFloat(number)
    if (isNaN(floatNumber)) return ''
    return floatNumber.toLocaleString('en')
}
```

We need to deal with a minor error. When you type in a value such as `0.0001`, it would not show up unless you click a different number like `0.2` or `0.3`. 

This is because the value cannot be converted into a `float`. We can fix this by splitting the number you get into two: the integer part and the decimal part. We also eliminate unnecessary decimal points by setting the maximum fraction digits to zero, as demonstrated below:

```javascript
getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
```

Finally, we need to clear the `previous` operand value. This can be achieved by creating an `if-else` statement and checking if `this.previousOperandTextElement.innerText` is an empty string.

```js
getDisplayNumber(number) {
if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
```


### Conclusion
While building the calculator, we used ES6 classes to organize our code. We also made use of vanilla JavaScript, CSS Grid, and Flexbox. 

With that, you have a fully functional calculator. The source code of our application is available on [GitHub](https://github.com/Nomzy-kush/CalculatorJS-Section).

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)