### HOW TO BUILD A RANDOM PASSWORD GENERATOR APP WITH HTML CSS AND JAVASCRIPT.


In this article, readers will learn how to build a random password generator application with HTML, CSS, and JavaScript 

Before I begin, you will need to know what a `password generator application` is all about. This is an application that can automatically generate passwords randomly for you. These generated passwords consist of alphabets, numbers, and symbols. The main reason for this application is that it helps the user create a very strong password that cannot be easily guessed or brute-forced.

The password generator application you are going to build will, first of all, have a container where there would be an input field, a copy button that copies the password that has been randomly generated, then you are going to build an input button that shows the user the preferred length they want for their password a minimum of 5 words and maximum of 20 words, and if they want to include uppercase, letters, and symbols then lastly a generate password button which generates the random password. Below is a picture of how the application would look like so that you can have a pictorial understanding of how the application would look like.

![password generator app](/engineering-education/how-to-build-a-random-password-generator app- with-html-css-javascript/password-generator-app.jpg)


### What Are The Prerequisites For This Tutorial?

The reader should have a Fundamental knowledge of HTML, CSS and also a Basic understanding of JavaScript, including functions.

### Writing The Markup Of The Password Generator Application
You will start by opening any preferred text editor, then create an HTML file and save it with `index.html` this is where we would write our markup for the application. Now you are going to write out doctype HTML and the header like this below.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title> PASSWORD GENERATOR APP </title>
  <link rel="stylesheet" href="layout.css" /> 
  <script src="script.js" defer></script>
</head>
```
After writing the HTML doctype, you will also write the header which consists of the HTML `meta charset` UTF-8 encoding, the `meta name` to be viewport and `content` should be  width=device-width.

next is the `title` of our markup page, the CSS code for linking an external CSS file which you would save as `layout.css`, and the external javascript file which you would also save as `script.js` then the closing `head` tag.

Now you are going to write the codes for the body of the application which is shown in the codes below. 

```html

<body>

 <form id="passwordGeneratorForm">

 <div class="container">

 <h2>Password Generator Application</h2>

 <div class="result__container">

 <span id="result"></span>

 <button id="copy">Copy</button>

 </div>

 <div class="options">

 <div class="option">

 <label>Length</label>

 <input type="number" id="length" min="4" max="20" value="10">

 </div>

 <div class="option">

 <label>Include Uppercase</label>

 <input type="checkbox" id="uppercase" checked>

 </div>

 <div class="option">

 <label>Include Numbers</label>

 <input type="checkbox" id="numbers" checked>

 </div>

 <div class="option">

 <label>Include Symbols</label>

 <input type="checkbox" id="symbols" checked>

 </div>

 </div>

 <button class="btn" id="generate" type="submit">Generate Password</button>

 </div>

 </form>

 </body>

 </html>

```

Alright according to the codes above  inside the HTML body `tag` you would start the random password generator application like a `form` so you are going to create a div `form ID` and name it password generator form after that you are going to create a class `container`and then inside the div class, you have an `h2 tag` where you will input password generator application. You would also create another div class for the `result _container` where you are going to create a  `span ID` called `result` which basically shows the result of the randomly generated password and a `button id` called `copy` which will then eventually copy the password generated to our clipboard but though take note the functionality of all the div classes will be possible when we start implementing our javascript codes.

Now, you would be creating a div class called `options` and you are going to create another div class of different specific options inside the first initial div class `options` you created ( we are just creating multiple classes). These options are going to be needed for the kind of random passwords the user wants, for instance, the length of the password, if the user wants it to be `uppercase` if the user wants to include `numbers`, and lastly, if the user wants to include `symbols`. You are also going to create another div and build a `button` with id `generate` which will generate the random password.

### Styling The Random Password Generator Application 

We all know that CSS is what brings out the beauty of an application or website. It makes us able to structure the styles, layout, fonts, and properties. Now create a file and save it with `layout.css` this would be where you will write all the CSS for the application.

Before you start structuring the application we have to clear the default format of the CSS document with these codes in the picture below.

```css

* {

margin: 0;

padding: 0;

box-sizing: border-box;

}

```

Alright you are going to move on to styling of the `body` inside the body element. You have to specify the `height` and` width` of the body element. Now specify the height and width to be 100vh and 100vw,  the `display` should be flex, `align-items` should be center, `justify-content` will also be center, the `flex-direction` will be  column, the `font family` is going to be Ostwald and sans serif then set our `background-color` to  blue.

after that is the `container` div you would now set `padding` to 1 rem and 1.5 rem which is just 16 pixels, after that next is the `border` which should be 1px solid then set the `width` to 350px and lastly set `background-color` blue. You are now going to style the `h2 tag `remember which is also the password generator heading so you would put it at the center meaning you are going to use the property `text-align` as center then the `padding` will be 15px 0 front and bottom of the heading.

Okay next is to style the div `option` you are going to set the `display` to flex the `justify-content` should be space between and then set the `padding` to 4px. The codes are shown below 

```css

body {

height: 100vh;

width: 100vw;

display: flex;

align-items: center;

justify-content: center;

flex-direction: column;

font-family: 'Oswald', sans-serif;

background-color: #39378f;

}

.container {

padding: 1rem 1.5rem;

border: 1px solid black;

width: 350px;

background-color: #4abd15;

}

h2 {

text-align: center;

padding: 15px 0;

}

.option {

display: flex;

justify-content: space-between;

padding: 4px;

}

```

Next, you are going to style `result_container` which is the password box, lets specify the `height` to 50px and the `width` as 100% the `display` should be flex, then set `justify-content` to space-between, then the `align-items` to center, `the border` should be 1px solid black and `padding` 0.5px. 

After that is the ``.result-container #result `` all you are going to do here is to specify a `word-wrap` to break-word and a `max-width` to calc(100%-40px).

Alright you will be styling the `.result_container #copy` button all you will be doing here is to specify the `height` 40px the `width` 40px and give it a `background-color` red then the color white the `border` should be none also make the `cursor` pointer because we want the user to know that the button is clickable then also the `outline` should be none here are the codes below

 

```css

.result__container {

height: 50px;

width: 100%;

display: flex;

justify-content: space-between;

align-items: center;

border: 1px solid black;

padding: 0 5px;

}

.result-container #result {

word-wrap: break-word;

max-width: calc(100% - 40px);

}

.result__container #copy {

height: 40px;

width: 40px;

background-color: #eb1606;

color: #ffffff;

border: none;

cursor: pointer;

outline: none;

}

```

Lastly, you need to style a hover in the`.result_container #copy: hover` button all you have to do is change the color for the hover effect. Let the `background-color` be dark blue and the color white. After that what is left remaining for the CSS is the `#generate button` all you have to do is specify the `height` to 40px the `width` to 100% then add a `border-radius` to 10px the `border` none a `background-color` dark blue the `color` should be set as white the `font-size` should be 15px, the `font-weight` should be bold and the `outline` none. You are also going to add a `hover` to the generate button so when the mouse cursor clicks the generate button the background color will change so all will have to do is style the `#generate: hover` the `background-color` should be fountain-blue and the `color` should be white, Here are the codes below.

```css

.result__container #copy:hover {

background-color: #1c2541;

color: #ffffff;

}

#generate {

height: 40px;

width: 100%;

border-radius: 10px;

border: none;

background-color: #0b132b;

color: #ffffff;

font-size: 15px;

font-weight: bold;

cursor: pointer;

outline: none;

}

#generate:hover {

background-color: #5bc0be;

color: #ffffff;

}

```

### Understanding The ASCII Character Table 

First of all, I don’t advise you to jump straight to coding the JAVASCRIPT without a prior understanding of the ASCII character because the logic behind the random password generator is understanding ASCII below is a table of the ASCII character. 

![ascii-table](/engineering-education/how-to-build-a-random-password-generator app- with-html-css-javascript/ascii-table.jpg)
Source:[https://favpng.com/png_view/binary-code-ascii-character-encoding-value-png/sdHr9cAb](https://favpng.com/png_view/binary-code-ascii-character-encoding-value-png/sdHr9cAb)

The full meaning of ASCII is American Standard Code for Information Interchange, if you look at the uppercase ASCII A it has a value of 65 and if you add the values with one, you would get all the 26 uppercase characters also the lowercase begins at the decimal 97 and keeps going up to 122, the symbols are at various places in the image above all we are going to do is to use these decimal values to generate different passwords, I advice you to read more about ASCII if you still don’t understand

### Writing The Javascript 

Start by linking the different HTML elements in the JAVASCRIPT here is the code below 

```javascript 

// Getting the DOM Elements

const resultDOM = document.getElementById('result');

const copybtnDOM = document.getElementById('copy');

const lengthDOM = document.getElementById('length');

const uppercaseDOM = document.getElementById('uppercase');

const numbersDOM = document.getElementById('numbers');

const symbolsDOM = document.getElementById('symbols');

const generatebtn = document.getElementById('generate');

const form = document.getElementById('passwordGeneratorForm');

```

Next, you are going to work on the character codes, this is the codes that will be used to form the randomly generated password, below are the codes for generating character codes for the application. For the uppercase codes, you are going to pass the low of 65 which is the value of uppercase A and the high value of 90 also the uppercase Z you can recall from the ASCII table, you are also doing this for the lowercase characters and numbers. But generating the character codes for the symbols are different because they are allocated in the various places of the ASCII table this will then make you use the `.concat function ` to combine them into a single array. Let me explain the `.concat function` this is a method in JAVASCRIPT which allows the concatenation of strings and arrays. Alright for the symbols they start at 33 and increase up to 47 and then continue at 58. 

``` javascript 

// Generating Character Codes For The Application

const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);

const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);

const NUMBER_CODES = arrayFromLowToHigh(48, 57);

const SYMBOL_CODES = arrayFromLowToHigh(33, 47)

 .concat(arrayFromLowToHigh(58, 64))

 .concat(arrayFromLowToHigh(91, 96))

 .concat(arrayFromLowToHigh(123, 126));

```

The next thing you want to do is build the `copy` button and copy to clipboard functionality and this can be achieved by creating a `textarea` element, sets its value to the value you want to copy, append the `textarea` to the HTML document, select the value by using the `select()`  method, execute the `exeCommand(copy)` method and remove the `textarea`. Now you are going to start with a `copybtnDOM` button we are going to listen to the click event on the “copybtnDOM” element so when the event is triggered we can pass a function, meanwhile, inside that function, you are going to create a `textarea` element by using the `createElement` method in javascript, Below are the codes for building that functionality and I will explain each and every syntax.

``` javascript 

// Copy Password Button 

copybtnDOM.addEventListener('click', () => {

 const textarea = document.createElement('textarea');

 const passwordToCopy = resultDOM.innerText;

 // A Case when Password is Empty

 if (!passwordToCopy) return;

 // Copy Functionality

 textarea.value = passwordToCopy;

 document.body.appendChild(textarea);

 textarea.select();

 document.execCommand('copy');

 textarea.remove();

 alert('Password Copied to Clipboard');

});

```

For the above code for  `const textarea=document.createElement(‘textarea’)` you just created a variable that will store any value that has to be copied and you can get the value using the`resultDOM.innerText ` because the text inside the `resultDOM` holds our randomly generated password. Then for the ` if (!passwordToCopy) return;`  just means if the passwordToCopy variable is empty it should just return the function. After we move straight to the `textarea. value = passwordToCopy;` syntax which we just use to set the textarea value with the value that you want to copy. 

Next is the `document.body.appendchild(textarea);` all you want to do here is append the textarea. value to the body of our document, the append child method adds a node to the end of the list of the children of a specified parent node. You need to select the elements that you want to copy so you are going to use the `textarea. select();` method then to copy the elements you will use the `document.execCommand(‘copy’);` method what this method does is it executes the specified command for the selected part of an editable section and that editable section is the textarea, and the copy command inside the function will copy the values of the editable section when it is done copying you need to remove the textarea and this can be removed by using the `textarea.remove();` and this will give the user a notification that the password is successfully copied you are going to code a simple alert for it to show it which is the `alert(‘password copied to clipboard’)`function, with all these written our application can not yet still generate random passwords at least for now because you have not finished implementing the functionality that generates random passwords. 

And also if you click the button you will observe that the page is reloading so what we need to do is to disable the reloading behavior and doing that in javascript is very easy all you need is a web API called `preventDefault.` this method will make sure the default behavior is not affecting the page this is shown in the codes below.

``` javascript 

// Checking the options that are selected and setting the password

form.addEventListener('submit', (e) => {

 e.preventDefault();

 const characterAmount = lengthDOM.value;

 const includeUppercase = uppercaseDOM.checked;

 const includeNumbers = numbersDOM.checked;

 const includeSymbols = symbolsDOM.checked;

 const password = generatePassword(

 characterAmount,

 includeUppercase,

 includeNumbers,

 includeSymbols

 );

 resultDOM.innerText = password;

});

```

 In the above codes the first step you take is disabling the default behaviour by using the function `e.preventDefalult();` basically you are listening to the submit event, for you to get the event you are going to pass it to a function using the arrow functions the `e` represents the event, then after that you will be checking the multiple options in other words you can access the values inside the password length field by using the `.value` getter method which returns the input value, also the `.checked` getter which returns the true if the checkboxes are selected or not, but it will return false if the checkboxes are not selected. Now if you look at the codes correctly you will see that the values you are getting from the options are stored inside separate variables, that being said we are going to create a variable called `password` all this variable will do is to store the value returned by the `generatePassword` function. Well, the `generatePassword` function takes four arguments because you have only four options to select from and the values stored are the arguments by the variables that you declared. Lastly, the `innerText` method would target the text inside `resultDOM` then change it with the generated password. 

Okay next is the password generating function which is the most critical function in our application because the password that you are getting will be generated from this function. Before you build the function remember the above codes you will see  that the generatePassword function takes only four arguments so you need to pass in the four arguments when creating this function, Everything is going to be shown in the codes below including building the whole password generating function.

``` javascript 

// The Password Generating Function

let generatePassword = (

 characterAmount,

 includeUppercase,

 includeNumbers,

 includeSymbols

) => {

 let charCodes = LOWERCASE_CODES;

 if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES);

 if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES);

 if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES);

 const passwordCharacters = [];

 for (let i = 0; i < characterAmount; i++) {

 const characterCode =

 charCodes[Math.floor(Math.random() * charCodes.length)];

 passwordCharacters.push(String.fromCharCode(characterCode));

 }

 return passwordCharacters.join('');

};

```

Now let me explain the codes after passing the four arguments you want the password to be lowercase if no option is checked then inside the  function you are going to create a variable that will store an array of the character codes, you are going to assign the lowercase character codes by using the `let charCodes` so after that you need to check if the options are true or not by using the conditional statements `` if (includeUppercase) charCodes `` for uppercase code, `if (includeSymbols) charcodes` for symbol codes, and `if (includeNumbers) charcodes` for number codes. Now depending on the options selected you concatenate the values to the `charCodes` variable, for the password that will be generated, you will create an empty array and call it `passwordCharacters` after that you will create a loop that will loop until it reaches the number of characters you the user want. While inside the loop you will generate random character codes from the values that are available in the `charCodes` array. And then convert the characters from the character codes and push them into the `passwordCharacters`array so that you have completed the `generatePasswordfunction`. Now you are going to loop till the character amount that you are getting from the input field in the app, the `charCodes` variable has all the character codes it all depends on the options the user selected. You will now generate a random index position of the array by using the ` math.random()`method, you are basically multiplying it with the `charCodes.length` to restrict it to generate numbers that up to the highest index position. Next is the `Math.floor`which will complete the number that is generated.

Lastly the `String.fromCharCode(characterCode)` will generate the string from the character code, and the `passwordCharacters.push() `will push the character to the array, the `return passwordCharacters.join(“) `will convert the array to a string and return it. 

All you need to do now is to create a function that generates the decimal values of the characters and in the end you will convert all these values to characters using this method below

```javascript
This is an example 

* Let array FromlowToHigh = (low, high) => {

Const array = [];

For (let i = low; i <= high; i++) {

 array.push(i);

}

Return array;

}; *

```

The function will take two inputs one of them for the highest value and the other for the lowest value. It just increments until the highest value is achieved, all the values that were incremented are pushed to an array and the function then returns the array, all  you are doing is generating the character code function here is the code below.

``` javascript 

 // Character Code Generating Function

function arrayFromLowToHigh(low, high) {

 const array = [];

 for (let i = low; i <= high; i++) {

 array.push(i);

 }

 return array;

}

```

Now if you run the codes our random password generator application would work perfectly well, we have successfully built our password generator application.

### Conclusion 

There are many other ways to build a random password generator application this tutorial is just one way to achieve it you can also research other ways of building it as long as it performs the same functionality. If you want the source codes for this application here is my Github repo [here](https://github.com/destiny251/random-password-generator-app-). 

