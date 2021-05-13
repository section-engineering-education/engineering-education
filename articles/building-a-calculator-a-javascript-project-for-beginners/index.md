---
layout: engineering-education
status: publish
published: true
url: /engineering-education/building-a-calculator-a-javascript-project-for-beginners/
title: How to Build a Calculator using JavaScript
description: This article will guide you on how to build a calculator using JavaScript. This project is suitable for beginners since it allows you to gain crucial skills and knowledge.
author: 
date: 2021-05-25T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/building-a-calculator-a-javascript-project-for-beginners/hero.jpg
    alt: Building a Calculator Using JavaScript
---
Building a web calculator is a great project, especially if you have just started learning JavaScript. It is quite simple to create for people of any skill level. This project covers the interactions with UI and key JavaScript methods. 
<!--more-->
In this article, you will be taken through the various HTML and CSS elements along with Vanilla JavaScript and modern ES6 practices used in building a functional and responsive calculator, as shown in the image below:

![calculator-image](/engineering-education/building-a-calculator-a-javascript-project-for-beginners/calculator-image.png)

### Prerequisites
- Any good Text editor.
- Basic understanding of JavaScript and HTML.

### Designing the Calculator
To get started, you need to consider the basic functionalities of a calculator. They include `addition`, `subtraction`, `multiplication`, `division`, `delete`, `all-clear`, and of course, the ability to use `decimal numbers` in performing these operations.

In your text editor, create `three` separate folders for your `HTML`, `CSS` and `JavaScript`. This just basically makes your code more orderly. In your HTML folder, you can link your CSS and JavaScript codes using the code below:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Calculator</title>
    <link href="Calculator with Js\style.css" rel="stylesheet">
    <script src="Calculator with JS\script.js" defer></script>
```

The next thing you need to do is add all the different elements. We will use `grid` for a nice design. Therefore, create a `div` with a class named `calculator-grid`. 

```html
   <div class="calculator-grid">
```

You will put all the different `HTML elements` and `buttons` inside the `calculator-grid` div.

Below is the HTML code for the calculator:

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

The HTML code contains several `div` classes. The `output` class represents the calculator screen. The `previous-operand` represents the result of the previous operation in the calculator, while the `current-operand` class represents the current operation on the calculator. 

The `span-two` class represents the buttons that will occupy `two` columns on the calculator. You can `copy paste` the division sign (÷) from google or anywhere else since it is not available on your keyboard.

This is how your calculator would look like at this point:

![calculator-buttons](/engineering-education/building-a-calculator-a-javascript-project-for-beginners/calculator-buttons.png)

### Styling the Calculator
Next, we need to style the calculator using `CSS`. Firstly, select all the elements, including the `before` and `after` elements. We can then apply the `box-sizing` attribute and set it as `border-box`. 

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

The next step is to style the `calculator-grid` div that we defined earlier. It wraps all of our different `buttons` and `elements`. We can set the `display` to `grid`. We can also use the `justify-content` attribute to set it to the center of the screen. The `align-content` attribute can be used to align items to the center of the screen. 

At this point, you may notice that the `calculator-grid` is not arranged vertically. We can fix that by setting the `min-height` to `100vh`. This means that the calculator grid will fill `100%` of the height all the time. 

Another thing is that `buttons` are aligned at the center of your screen and spaced out. To make a regular calculator, we have to use `grid-template-columns` then set it to repeat, and each column could be `100px wide`. We also do the same thing for the `grid-template-rows`. Here is the code below:

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

For the `output screen` to grow as large as it needs to and be adaptable to any number of input values, we need to set the `minmax` value to 120px and the `maximum value` to `auto`, as demonstrated in the code above. Here is how your calculator looks like at this point:

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
Another important thing is to style the `output` displayed on the calculator. We can do that by adding a dummy text that says `123 +` to represent your previous operand and `456` to represent the current operand. Here is how the HTML code will look like:

```html
<div class="output">
<div class="previous-operand">123 +</div>
<div class="current-operand">456</div>
```

This way, you have a little bit of dummy text we can play around with while styling. Now we can go ahead to style it. 

The first thing we can do is to set the `output` to `span` across the entire width of the calculator. We can do this by using the `grid-column` attribute again and setting it to span from column `1 to -1`, essentially just the last column.  

Next, we will change the `background-color` to `black` with a transparency of `75%`. Then, we will align all the elements inside the container. The easiest way is by using `flex`. Therefore, set the `display` attribute to `flex` and `align-items` attribute to `flex-end`. The output elements will be positioned at the `right` side of the calculator. 

To space them out, we can use the `justify-content` attribute and set it to `space-around`. We can also change the `flex-direction` and set it to `column` to align the output elements vertically. 

Next, we can set the `padding` to any desired value. Also, to make the output elements `wrap` when they get too long, we can use the `word-wrap` attribute to choose where the words should break. Besides, we can add a `word-break` and set it to `break-all`. Lastly, we should style the `previous` and `current` operands in the output class.

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

### The Actual JavaScript
Firstly, we should select all our calculator's buttons and operations. We can do this by putting some classes in the HTML file. However, since we do not want to mix `CSS` classes with `JavaScript` classes, we can use `data attributes` to select them instead. `data-operation` to represent your operation buttons, `data-numbers` to represent the `number` buttons, `data-all-clear` to represent the `All-Clear` button and `data-delete` to represent the `Delete` button. We can add these classes to the `previous-operand` and `current-operand`. 

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

The above additions are the only changes we need to make to the `HTML` file to select these elements in the JavaScript folder. 

In the JavaScript file, define some `constant variables` which will represent the `number` buttons. We will the perform a query using `document.querySelectorAll()`. This function will allow us to get all elements that match a certain string. 

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

Now that we have everything selected, we can start coding to make your calculator work. The first thing you need to consider is how you will store all the information typed on your output. You can do that by creating a calculator class at the top of your file. Inside of this class, you will put a constructor that will take all the inputs for it and all the calculator functions. This constructor is going to take your "previousOperandTextElement" and your "currentOperandTextElement" so that you can easily know where to place the display text for your calculator. Inside of it, you will need to create some variables for his class. As soon as you create your calculator, you need to call a "this.clear" function because you have to clear all your inputs and set them to the default values as soon as you create a new calculator. Here's what the code will look like:

```javascript
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
}
```

### The Calculator Functions
Next, you have to define all the different operations the calculator can perform. The first one is clear() function, which will clear out all the different variables. Next is the delete() for clearing a single number. You will also create a function that will describe what will occur every time a user clicks on a number to add to the display called `appendNumber(number)`. The next thing you need to do is add a `chooseOperation(operation)` function that controls what will happen anytime a user clicks on any operation button. You also need to have are the `compute()` function that takes the values inside your calculator and brings out a single value result for what you need to display on the calculator. Lastly, you need a `updateDisplay()` function which lets you update the values inside of the output. The code comes out like this:

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

Now that you have defined all your operations, you can now think about the different properties the calculator needs to store. You need to know the previous operand the user entered, the current operand they are working on, and the operation they have selected.

### clear() Function
Inside the clear() function, all you need to do is put off all the values displayed. The first thing you can do is default "this.currentOperand" to an empty string if the values on the output are removed. You can also do the same for the previous operand again, defaulting it to an empty string. Lastly, you have to change the "this.operation" to be undefined since they do not have any operation selected if they clear things. Here's how the clear function will  look like in your code:
```javascript
clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
```
Now that you know all the different things your calculator can do defined by the functions and all the different variables it can hold, you can now focus on hooking all the variables and making them operate on the calculator object. The first thing you need to do is create a calculator constant and set it to "new calculator" then, you pass everything from the constructor into it. You then need to pass in the previous and current operand text elements. Here is how it looks like in the code:
```javascript
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
```
### appendNumber(number) Function
Now that you have passed those elements in, you can then use this calculator object. To first use it, you will select your number button, and then you will say "for.each" because you want to loop over all these different buttons. You can add an "EventListener" by saying "button.addEventListener" for each of these buttons. This EventListener represents whenever you click on the button you want to do something. In this case, all you have to do is add the number to the calculator. This can be done by saying "appendNumber" of whatever is inside that button which can be specified by saying "button.innerText". Once that is done, you need to call "calculator.updateDisplay", thereby making sure the display values are constantly updated every time you click on a button on your calculator. The code comes out like this:

```javascript
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
```

To test that everything you have written so far is working, inside your `updateDisplay()` function, input "this.currentOperandTextElement.innerText = this.currentOperand". Also, inside your `appendNumber()` function, you can just change the current operand to equal that number instead of appending the number. If you go over to your calculator and click on a number, it would show up on the output box, but you may notice that nothing shows up when you click on an operation button or any other buttons that are not numbers. So now you know that your appending number functions are properly hooked up on all your buttons and your display updated every time you click on a button. Since you know that your `appendNumber()` is working, you might as well write the `appendNumber()` function. All you need to do is update the current operand value and append the number you get passed to its end. You can just say "this.currentOperand" then convert it to a string if it's a number. This way, you can easily append something to the end by using "+" and you can just convert your number to a string as well. You need to convert everything to a string because JavaScript will now try to add these as actual numbers, i.e., it will now do one plus one equals two rather than one plus one equals eleven because you want your numbers to be appended and not added. When you save that and click on numbers, you find out that they constantly get added to the list. But, the period(.) symbol also continues to get added when clicked, and you do not want that. To check for that, you can say if the string of numbers in the output includes a period(.), just "return". This will stop your function from executing any further. Now, if you try to add multiple periods, it will only add one. This is the `appendNumber()` function completely done. The code will look like this:

```javascript
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
```

### chooseOperation(operation) Function
Now that that is out of the way, you can just do that same for the operation buttons as you did for your number buttons.  Instead of appendNumber, you rather use "chooseOperation(Button.innerText)" and again you just update the display using "calculator.updateDisplay". The code will look like this:

```javascript
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
```

Now, in your chooseOperation() function, you need to do a little bit of fancier math. When you click a number, followed by an operation on your calculator, you might want it to move up to the previous operand section for you to type in the other number to complete the entire operation. For instance, if you want to compute 2 + 60 when you type in 2+, you might want the 2+ to move into the previous operand section of the display output of the calculator so that 60 will be typed in the current operand section of the calculator. Well, you can implement that in your chooseOperation() function. The first thing you need to do is set "this.operation" equal to the operation you passed. That way, your calculator is aware of what operation it desires to use when computing the value. Then, you set "this.previousOperand = this. currentOperand" so you are essentially saying you are through typing the current number, so you recycle that over to the previous operand. You also have to clear out the new current operand, so you will just equate it to an empty string. Of course, you have to update your display so you go to your updateDisplay() function and just say "this.previousOperandTextElement = this.previousOperand"
If you go to your calculator and click any of the operation buttons, you will notice that they display even without clicking any number buttons, so you need to add a check-in for that. You can just say if the current operation is empty, then “return”, which again will not let you execute any further into your code. One more thing you can add to your calculator functionality is computing an operation automatically while simultaneously computing another one. For instance, if you type in 54 + 50 and then click on “÷,” the calculator should be able to compute 54+50, making it 104 before dividing automatically. This can be done with the aid of simply saying if the previous operand is not equal to an empty string, then just type in “this.compute()”. Here is what the code will look like below:

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

With these two functions completed, you can now set all the values inside your calculator. All you need to do now is work on how you need to compute things and display things.

### compute() Function
The first thing you need to do is to add an “EventListener” to your Equals button. In this case, again, it's going to be a rapid EventListener it's going to pass in that button, and all it's going to do is call the compute function and strive to get the computed value in your calculator. Again, you have to update the calculator’s display, so now, when you click the Equals button, it will call the compute() function inside of your code there. Here's the code for the Equals button:
```javascript
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
```
Now you can implement this, the first thing you need to do is create a variable that you are just going to call "computation" and this will be the result of your compute function. Next, you need to create two extra variables. You'll have a preceding variable, and this is simply going to be that actual number version of your previous operand. So you're just converting this string to a number, and you will do the same thing with your current operand. If, for example, the user clicks on the Equals button without clicking any button before it, you do not want the code to run. You can fix that this way. You can say If it is not a number for previous, i.e., if it does not have a previous or current value, let it just “return,” which will just cancel the function immediately. Then, you're going to use a `switch` statement on "this.operation" and inside of the switch, you define your `if` statements by using the keyword "case" and then you put what "this.operation" should equal. In this case, when you have a plus(+) symbol for "this.operation", you want to execute the code inside of this `case` when "this.operation" equals a plus(+). Then, you set that computation variable equal to your previous value added to your current value. Then you use `break`, which just says not to follow any of the other `case` statements and completely leave the `switch` statements. You then do this a bunch of times, once for each of your different addition, subtraction, multiplication, and division cases. Along with `if` statements, you also can define an `else` statement defined as a `default`. This `default` is whenever none of these values get computed, whatever is in the `default` will be executed. In that case, just return because if none of these symbols match your operation, that means you have an invalid operation somehow so that no computation can be carried out. Lastly, outside of the `switch` statement, you can set your current operand, which is just going to be equal to the result of your computation. You can set your "this.operation" equal to undefined, and you can set your previous operand equal to an empty string ''. The code will come out like this:

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

Now, your calculator can perform calculations, but you will find out that you cannot clear things out, and that is because you have not implemented the All Clear button yet. Here is the code to do that:

```javascript
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
```

Now you can use the All-Clear button on your calculator.

### delete() Function
The last function to implement is the Delete function. The first aspect you can do, is to set "this.currentOperand = this.currentOperand" then convert it to a “string” to get the very last value of the string and chop it off using the “slice” method to set it from the index number 0 to (-1). This is just going to take all of the different characters and numbers inside the string from the very first number all the way to the second-to-last number, essentially chopping off the last one. Here's the code:

```javascript
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
```
 You can now hook that variable up by implementing the Delete button. Below is the code to do that:
```javascript
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
```

If you type a long string of characters, you can delete them one by one using the Delete button. The calculator is now fully functional, but the display still needs some work.

### updateDisplay Function
The first thing you can do is to go into the updateDisplay() function with an `if` statement saying if you have an operation and the operation is not equal to null, then in there you will display your previous operand Text Element then you make it a concatenation of both your previous operand and your operation then you can just add the operation so ${this.operation} has the operation appended to the end. Here's the code below:

```javascript
updateDisplay() {
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
```

On your calculator, you may notice that when you type a string of numbers, there are no commas to really make the numbers more definitive. Well, you can change that by using a helper function and calling it `getDisplayNumber(number)`. Then you will return that number but in the form of a display value. You are going to call a function in the updateDisplay() say "this.GetDisplayNumber" then pass it in the current operand. You’ll also do the equal factor  however you'll do it for "this.previousOperand" and now the changes you make in this function, are going to be mirrored in both the previous and the current operand values. Here's what the entire updateDisplay() function code would look like:

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

If you go over to your calculator and type a string of numbers, you may notice that it is not formatting, and that is because you need to make sure you use your float number in the getDisplayNumber() function instead of a normal number. Now when you type in a long number in your calculator, it automatically places in commas. Here's what the code will look like:

```javascript
getDisplayNumber(number) {
const floatNumber = parseFloat(number)
if (isNaN(floatNumber)) return ''
return floatNumber.toLocaleString('en')
}
```

You may think that your calculator is perfect now, well, guess again. If you wanted to type in a decimal place like 0.0001, it would not show up unless you click a different number like 0.2 or 0.3, and that is because when you try to pass that decimal place into a "float", it's not possible because it's just a decimal place. You can fix this by splitting the number you get into the integer part and the decimal part. To do that, you're going to set a string number that will be equal to "number.toString()". You have to put a string there to split that string on the decimal character inside of it. Next, you want to get the integer numbers. You’ll say integer digits that you know is an actual float, and you're going to set it equal to "parseFloat" and take the string number, then split it on the actual period character. This is now going to take your string and turn it into an array. The first number in the array will be the part before the period(.), and the second number is the part after it. Then you get the first part which carries the integer values. You can do a very similar thing for your decimal digits, but you won’t parse this into a “float” yet because you do not need it to be a number. Also, you need to get the second component of the array, which is the numbers after the period(.). You want to get the integer Display separately. Then, you will need to check if your integer digits will be “not a number.” Essentially, this will take place anytime someone inputs nothing or simply inputs a decimal place. If that's the case, you'll want your inner display just to be equal to an empty string, but if, for example, they did not enter an integer value, that's where you may want to use that LocaleString. So, you set your integerDisplay equal to “integer Digits.toLocaleString('en')”. 

Another thing that you must do is to make sure that you do not have any additional and unnecessary decimal places after this. You can just set the maximum fraction digits equal to zero, which means there can never be any decimal places after this value when it gets converted to a string with commas which is what we want. The next thing you need to do is to check if you have any decimal digits. You say if decimal digits are null, that means the user did enter a period and has some numbers after it. If that is the case, you have to “return” the `${integerDisplay}.${DecimalDigits}` and if they do not have any decimal digits, then just return the “IntegerDisplay”
Here is the final code for the getDisplayNumber(number) function:

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

Now, if you go to your calculator and type something like 374.4, it would work. Also, if you start with a period(.) before the numbers, it displays, and that's what you want. But, you will notice that your previous operand value did not clear itself. If you go to your updateDisplay() function, you will find out that you are by no means truly clearing this value if the operation inputted, does not exist. To clear it, you just need to create an `else` statement  and you say if this.previousOperandTextElement.innerText = an empty string ''. Now, if you do a calculation, the previous operand value clears and leaves you with the current operand value, which is just amazing. The code will look like this:

```js
getDisplayNumber(number) {
if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
```


# Conclusion
While building the calculator, you used ES6 classes to organize your code. You made use of vanilla javascript as well as CSS Grid and Flexbox. With that, you have a completely functioning calculator working in the browser. The source code of our application is available on [GitHub](https://github.com/Nomzy-kush/CalculatorJS-Section).

Happy Coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)