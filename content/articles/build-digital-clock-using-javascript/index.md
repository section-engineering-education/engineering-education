---
layout: engineering-education
status: publish
published: true
url: /build-digital-clock-using-javascript/
title: Building a digital clock with HTML, CSS, and JavaScript
description: In this article, we learn how to build a digital clock on the web using HTML, CSS and Javascript.
author: frank-joseph
date: 2021-09-22T00:00:00-00:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-digital-clock-using-javascript/hero.jpg
    alt: digital clock with js
---

The web made almost everything possible. The emergence of JavaScript as the programming language of the web enables us to see our code live and interact with web content. 
<!--more-->
This article seeks to use this important tool to build a digital clock that runs on the web with other web-based technologies such as HTML, CSS.

### Prerequisites
The reader should have basic knowledge of:
- JavaScript
- HTML
- CSS 
- Have a text editor of his or her choice, though I recommended vscode
- Internet connectivity

### Objectives
At the end of this tutorial, readers should be able to:
- Understand Javascript's built-in `setInterval` function
- Know how to use the JavaScript Date class
- Know how to create a function
- Know how to invoke or call a function
- Know what variable scope is
- Understand how ternary operators work

### Definition of terms
* **HTML** is a markup language that gives the web content its structure. It is also referred to as the skeleton of the web. HTML is an abbreviation meaning Hypertext Markup Language.

* **CSS** is an abbreviation meaning Cascading Style Sheet. It is the tool used to add designs like colors to our web content. It is the design, style, and formatting tool of web pages.

* **JavaScript** is the scripting language of the web and it is also a lightweight interpreted language that compiles at runtime. It is the language that adds interactivity to the web content hence it is widely in use. 

In this tutorial, we will use these tools to build a digital clock that displays the current time, day, month, and year.

### Implementation
To implement the clock, first, we need to create a folder for our HTML, CSS, and JavaScript files with their respective extensions (.html, .css, .js). You could use any editor you wish but for this tutorial, I’d prefer you use vscode.

#### First step
Create your `HTML` file, name it `index.html`.

The code snippet below shows the HTML file structure.

```html
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Clock</title>
      <link rel="stylesheet" href="index.css">
   </head>
   <body>
      <div>
         <div style="color: white;">The Time is: </div>
         <div id="Clock" class="glow">00:00:00</div>
      </div>
      <script src= index.js></script>
   </body>
</html>
```

This structure should be familiar to you, the `id = Clock` and `class = glow` will be used in our JavaScript and CSS files respectively.

To link our JavaScript and CSS files in the HTML file, the `script` and `link` tags are used as shown above. Though there are other ways of adding JavaScript and CSS to HTML in this article, I choose to use the external file source.

#### Second step
Create a JavaScript file and declare a function in it. I call mine `displayTime`. 

In this function, declare a variable and assign the JavaScript date object to it.

A function in JavaScript is almost the same as what is known as a method in Java. It is a set of statements or code that performs an action. 

For instance, you’re writing a program and you need to multiply two values in different instances in your code. Without a function or method, you’ll need to always repeat the same code over and over whenever you want to multiply two numbers. 

With a function, you write the code once and call the function that does the multiplication whenever you need it. Functions help for code modularity and cleanliness. The function is expected to perform just one task in this case multiplication.

Here is a code snippet to explain this better:

```js
//function declaration

function displayTime(){
   //variable
   const timeNow = new Date();
}
```

All we need to build our digital clock will be in the function block apart from the `setInterval` method. 

`setInterval`, is a method in JavaScript that takes two parameters, a function and the time it will take before the function executes.

Here is the syntax on how to represent `setInterval`:

```js
setInterval(displayTime, 1000);
```

The code above means that the function `displayTime` will keep executing after every 1000 milliseconds. 

Now that we've got this out of the way, let's go on to declare other variables. These will take the hour of day, minutes, seconds, days of the week, months, year, and period of the day.

```js
let hourOfDay = timeNow.getHours();
let minutes = timeNow.getMinutes();
let seconds = timeNow.getSeconds();
let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let today = weekDay[timeNow.getDay()];
let months = timeNow.toLocaleString("default", { month: "long" });
let year = timeNow.getFullYear();
let period = "AM";
```

> If we look closely, you will notice that we're using the `timeNow` variable to access the various methods in the JavaScript *date* class. We declared it up above in our function block.

- Hours, minutes, and seconds are assigned to the `hoursOfDay`, `minutes`, and `seconds` variables.
- The `weekDay` variable contains an array of days of the week.
- The `today` variable gets a particular day from the `weekDay` collection.
- The `months` variable gets the string representation of months of the year. We can use `timeNow.getMonths` to get months of the year but it is the number representation that will be printed using this method. Hence, the need to use the `toLocaleString` method that converts the month to string. The string *long* in the parenthesis means the complete spelling of the months should be printed. If you don't want that you can use *short* instead of long, and Feb instead of February will be printed for instance.
- The `year` variable gets the year from the `getFullYear()` method.
- The `period` variable is initialized to *AM*, this prints the period of the day.

Our next step would be to couple all of these variables in the function, here is how:

```js
function displayTime(){

   const timeNow = new Date();

   let hourOfDay = timeNow.getHours();
   let minutes = timeNow.getMinutes();
   let seconds = timeNow.getSeconds();
   let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
   let today = weekDay[timeNow.getDay()];
   let months = timeNow.toLocaleString("default", { month: "long" });
   let year = timeNow.getFullYear();
   let period = "AM"; 

}
```

That is what our function looks like right now. But this is not enough to build our digital clock, the reason you're reading this article. The next step is to set the period of the day.

Here is the code snippet to illustrate that:

```js
// Permit me to declare period and hourOfDay again even though we've declared them before

let period = "AM";

let hourOfDay = timeNow.getHours();

// write a condition that set our period to AM or PM

if(hourOfDay > 12) {
   hourOfDay -= 12;
   period = "PM";
   /*This block checks whether the hour is greater than 12 and if that is true, 12 is subtracted from the hour. The result is then assigned back to ```hour``` and the period is set to PM. 12 is subtracted since we're building a 12-hour time clock*/
}

if(hourOfDay == 0) {
   hourOfDay = 12;
   period = "AM";
  /*This block checks whether the hour is equal to 0. If that is true, we assign 12 to the hourOfDay variable and the period is set to AM.*/
}
```

The next step is to set our clock display pattern. 

In our HTML file, we set our clock to display 2 digits for hourOfDay, seconds, and minutes (00:00:00). We need to write a program to conform to that pattern. In doing that, we will use *ternary operator*, represented as **?**. 

The ternary operator is a conditional operator that takes three operands. The first being condition followed by a question mark (?). The second is an expression to execute if the condition is true, followed by a colon (:). Finally, the third operand is another expression to execute if the condition is false. It is a simpler way to write an if-else statement.

Here is the code snippet to illustrate that:

```js
hourOfDay = hourOfDay < 10 ? "0" + hourOfDay : hourOfDay;
// if hourOfDay is less than 10, set hour position to 0 plus hourOfDay else set position to hourOfDay
minutes = minutes < 10 ? "0" + minutes : minutes;
// if minutes is less than 10, set minutes position to 0 plus minutes else set position to minutes
seconds = seconds < 10 ? "0" + seconds : seconds;
// if seconds is less than 10, set seconds position to 0 plus seconds else set position to seconds
```

We are almost done, the next thing to do is to set our current time. To do that, we need to declare a variable called `currentTime`. Here is how:

```js
let currentTime = hourOfDay + ":" + minutes + ":" + seconds + period;
```

We initialize the `currentTime` variable with `hourOfDay`, a colon, `minutes`, a colon, `seconds`, and `period`. 

So for instance if the hour is 10, minutes is 12, seconds is 23, and period is AM, `currentTime` will be 10:12:23AM. Two more things and we're done with the function body and JavaScript part of this article.

Our next task is to display our clock on the web page and to do this, we need our JavaScript to manipulate our HTML. This is where the knowledge of the Document Object Model (DOM) comes in handy.

There are various document methods but in this tutorial, we'll be using  `document.getElementById`. With this, we'll be able to access an HTML element with a particular *id*. In this case, we will access the element with the id *Digital_Clock*.

Here is the code snippet to illustrate how:

```js
document.getElementById('Digital_Clock').innerHTML =  currentTime + " " + today +" " + months + " " + year;
```

The `innerHTML` is a property of the DOM that sets or returns the HTML content of an element. In this case, the content of the div tag with an id of `Digital_Clock` is set to show the values of `currentTime`, `today`, `months`, and `year`. 

The last thing is a function call or invocation. After our function has been declared, given a function body, it will still not work unless it is invoked or called. This is done by placing the function name and brackets immediately after the function's closing curly braces (}).

This is how our final code will look:

```js
setInterval(displayTime, 1000);

function displayTime() {

    const timeNow = new Date();

    let hoursOfDay = timeNow.getHours();
    let minutes = timeNow.getMinutes();
    let seconds = timeNow.getSeconds();
    let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let today = weekDay[timeNow.getDay()];
    let months = timeNow.toLocaleString("default", {
        month: "long"
    });
    let year = timeNow.getFullYear();
    let period = "AM";

    if (hoursOfDay > 12) {
        hoursOfDay-= 12;
        period = "PM";
    }

    if (hoursOfDay === 0) {
        hoursOfDay = 12;
        period = "AM";
    }

    hoursOfDay = hoursOfDay < 10 ? "0" + hoursOfDay : hoursOfDay;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = hoursOfDay + ":" + minutes + ":" + seconds + period;

    document.getElementById('Clock').innerHTML = time + " " + today + " " + months + " " + year;

}
displayTime();
```
##### Variable Scope
A variable is said to have a *global scope* when it can be seen, accessed, or used anywhere within a program. Global variables are declared outside of a function. Any variable declared within a function can only be used within the function.

Did you see how we intentionally declared all our variables within the function? The aim is to make them local variables to the function. Hence, a *local variable* is one whose scope is only within its function definition. That is a variable whose value cannot be accessed outside the scope where it was declared.

We declared all the variables inside the function because there was no need to use them outside the function body.

#### Third Step
With what we have now, our code should work but we need to add style to it to make it look nice.

We need to create a CSS file and add these styles. I call mine `index.css`.

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
body {
     display: flex;
     align-items: center;
     justify-content: center;
     height: 100vh;
     background: #000;
     padding: 0;
     margin: 0;
     box-sizing: border-box;
     font-family: 'IBM Plex Sans', sans-serif;
}
.glow {
     font-size: 60px;
     color: #fff;
     font-weight: bold;
     animation: glow 1s ease-in-out infinite alternate;
     -moz-animation: glow 1s ease-in-out infinite alternate;
     -webkit-animation: glow 1s ease-in-out infinite alternate;
}
```

### Conclusion
In this article, we have learned about function declaration and function calls. We've also learned about the ternary operator and JavaScript date class. Finally, talked about how to get the string value of months in a year using the toLocaleString method.

With all this, we have been able to build our digital clock using only HTML, CSS, and JavaScript. If you want to play around with the code or have a reference to what we did, [here](https://replit.com/@Frank-dev20/Clock) is a link to the final code.

### References
- [JavaScript date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [W3school on the JavaScript date object](https://www.w3schools.com/js/js_dates.asp)

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
