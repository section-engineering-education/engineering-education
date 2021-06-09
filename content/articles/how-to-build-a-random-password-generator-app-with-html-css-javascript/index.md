---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-random-password-generator-app-with-html-css-javascript/
title: How to Build a Random Password Generator app with HTML, CSS and JavaScript
description: In this tutorial, we will create a random password generator application with just using HTML, CSS and JavaScript.
author: destiny-etinagbedia
date: 2021-06-09T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-random-password-generator-app-with-html-css-javascript/hero.jpg
    alt: How to Build a Random Password Generator app with HTML, CSS and JavaScript Hero Image
---
A password generator is an application that can auto-generate passwords for you. These generated passwords are comprised of letters, numbers, and symbols. This application helps the user create a solid password that cannot be easily guessed or brute-forced.
<!--more-->
In this article, we will learn how to build a random password generator application with HTML, CSS, and JavaScript.
 
![password generator app](/engineering-education/how-to-build-a-random-password-generator-app-with-html-css-javascript/password-generator-app.png)
 
### Prerequisites
The reader should have:
- A fundamental knowledge of HTML, CSS.
- A basic understanding of JavaScript, including functions.
 
### Building the HTML page for the password generator
Let's start by creating an HTML file and saving it as `index.html`. 

Copy the following code to the HTML file:
 
```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>PASSWORD GENERATOR APP</title>
    <link rel="stylesheet" href="layout.css" />
    <script src="script.js" defer></script>
  </head>
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
 
Now, let's create a file and save it as `layout.css`. This is where you will write all the CSS for the application. 

Below is the CSS for the application:
 
```CSS
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
 
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
 
### Understanding the ASCII character table
I don’t advise you to jump straight to coding the JavaScript file without a prior understanding of the ASCII characters. 

Here is the table of the ASCII characters:
 
![ascii-table](/engineering-education/how-to-build-a-random-password-generator-app-with-html-css-javascript/ascii-table.png)
 
[Image source](https://favpng.com/png_view/binary-code-ascii-character-encoding-value-png/sdHr9cAb)
 
ASCII stands for American Standard Code for Information Interchange. If you look at the uppercase A, it has an ASCII value of 65, and if you keep adding one to 65, you will get all the 26 uppercase characters. The lowercase begins at 97 and goes up to 122. The symbols are at various places in the image above.
 
### Writing the Javascript

#### Select DOM elements
Start by selecting the different HTML DOM elements in the JavaScript using the code below:
 
```JavaScript
// Getting the DOM Elements
const resultDOM = document.getElementById("result");
const copybtnDOM = document.getElementById("copy");
const lengthDOM = document.getElementById("length");
const uppercaseDOM = document.getElementById("uppercase");
const numbersDOM = document.getElementById("numbers");
const symbolsDOM = document.getElementById("symbols");
const generatebtn = document.getElementById("generate");
const form = document.getElementById("passwordGeneratorForm");
```

#### Generate character codes
Next, let's work on the character codes that we'll use to form the randomly generated password. For the uppercase codes, you will pass the low of 65, which is the value of uppercase A and the high value of 90, the uppercase Z as you can recall from the ASCII table.

You will also do this for the lowercase characters and numbers. But generating the character codes for the symbols is different because they are allocated in the various places of the ASCII table.

Use the `concat` function to combine them into a single array. This function is a method in JavaScript which allows the concatenation of strings and arrays. The symbols start at 33 and increase up to 47 and then continue at 58.
 
```JavaScript
// Generating Character Codes For The Application
const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));
```

The function `arrayFromLowToHigh` will take two inputs, the highest and the other one for the lowest value. It just increments until the highest value is achieved. 

All the incremented values are pushed to an array, and the function then returns the array, all you are doing is generating the character code function:
 
```JavaScript
// Character Code Generating Function
function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
```

#### Generate password
Next, let's create the password-generating function:
 
```JavaScript
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
  return passwordCharacters.join("");
};
```

For instance, if the user wants the password to be lowercase and if no option is checked, inside the function, we'll create a variable that'll store an array of character codes and assign the lowercase character codes. 
 
After that, you'll need to check if the options are true or not by using conditional statements. Now depending on the options selected you will concatenate the values to the `charCodes` variable for the password that it will create. Then, create an empty array and call it `passwordCharacters`. 
 
Next, create a loop that'll loop until it reaches the number of characters you want. While inside the loop, generate random character codes from the available values in the `charCodes` array. Then convert the characters from the character codes and push them into the `passwordCharacters`. 

Now, loop till the character amount you are getting is from the input field in the application. The `charCodes` variable has all the character codes, it all depends on the options the user selected. 
 
Now, generate a random index position of the array by using the `math.random()` method and multiply it with the `charCodes.length` to restrict it to generate numbers up to the highest index position. Next, floor the number using `Math.floor`, which will complete the number that is generated.
 
Then, the `String.fromCharCode(characterCode)` will generate the string from the character code, and the `passwordCharacters.push()` will push the character to the array, the `return passwordCharacters.join(“)` will convert the array to a string and return it.

#### Copy button
The next thing you want to do is to build the `copy` button and copy to clipboard functionality. We will listen to the click event on the `copybtnDOM` element. Meanwhile, inside that function, you will create a `textarea` element using the `createElement` method in JavaScript.
 
```JavaScript
// Copy password button
 
copybtnDOM.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const passwordToCopy = resultDOM.innerText;
  // A Case when Password is Empty
  if (!passwordToCopy) return;
  // Copy Functionality
  textarea.value = passwordToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password Copied to Clipboard");
});
```
 
In the code above, for `const textarea = document.createElement(‘textarea’)`, you just created a variable that holds the textarea DOM element. You can get the value for the textarea using the `resultDOM.innerText`.
 
Then, the `if (!passwordToCopy) return;` means if the `passwordToCopy` variable is empty, we should do nothing. The `textarea.value = passwordToCopy` syntax is used to set the `textarea` value with the value you want to copy.
 
Next is the `document.body.appendchild(textarea);` all you want to do here is append the text area value to the body of your document. The append child method adds a node to the end of the list of the children of a specified parent node. 
 
You need to select the elements you want to copy so you will use the `textarea.select();` method then to copy the elements, you will use the `document.execCommand(‘copy’);` method. This method executes the specified command for the selected part of an editable section which is the textarea.

The `copy` command inside the function will copy the values of the editable section, after which you need to remove the `textarea` by using the `textarea.remove();`. This will give the user a notification that the password is successfully copied. 
 
After that, you will code a “simple alert” for it to show the `alert(‘password copied to clipboard’)` function. With all these written, the application can not yet generate random passwords because you have not finished implementing the functionality that creates random passwords.

#### Put it all together
If you click the copy button, you'll observe that the page keeps reloading. You should disable this reloading behavior by using an event API called `preventDefault`. This method will make sure the default behavior i.e., reloading when submitting a form is not affecting the page. 

You can do this using the code below:
 
```JavaScript
// Checking the options that are selected and setting the password
form.addEventListener("submit", (e) => {
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
 
In the code above, the first step you take is to disable the default behavior of reloading the page when submitting a form using the function `e.preventDefalult();`. You are listening to the submit event. 
 
You can access the values inside the password field by using the `.value` getter method, which returns the input value. You can also use the `.checked` getter that'll return true if the checkboxes are selected or not. It will return false if the checkboxes are not selected. 
 
We are going to create a variable called `password`. This variable will store the value returned by the `generatePassword` function. The `generatePassword` function takes four arguments which are `characterAmount`, `includeUppercase`, `includeNumbers`, and `includeSymbols`. Finally, the `innerText` method would target the text inside `resultDOM` then change it with the generated password.
 
Now, if you run the codes, our random password generator application should work perfectly well. We have successfully built our password generator application.
 
### Conclusion
There are many other ways to build a random password generator application. This tutorial is just one way to achieve it. You can also research different ways of creating it as long as it performs the same functionality. [Here](https://github.com/destiny251/random-password-generator-app-) you can find the source code for our application.

Happy coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/) & [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
