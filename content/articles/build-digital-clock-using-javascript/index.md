 

# How to build a digital clock with only HTML, CSS, and JavaScript

### Introduction

The web made almost everything possible, and the emergence of JavaScript, the programming language of the web enables us to see our code live as they appear on the web and give us the ability to interact with web content. This article seeks to use this important tool of the web to build a digital clock that runs on the web with other web-based technologies such as HTML, CSS.

### Prerequisites

The reader should have basic knowledge of:

- JavaScript

- HTML

- CSS 

- Have a text editor of his or her choice, though I recommended vscode

- Internet connectivity

### Objectives

At the end of this tutorial, readers should be able to:

- Understand JavaScript setInterval built-in method

- Know how to use the JavaScript Date class

- Know how to create a function

- Know how to invoke or call a function

- Know what variable scope is

- Understand how ternary operators work

### Definition of terms

#### HTML

This is a markup language that gives the web content its structure, it is also referred to as the skeleton of the web. HTML is an abbreviation meaning Hypertext Markup Language.

#### CSS

It is an abbreviation meaning Cascading Style Sheet, it is the tool used to add designs like colors to our web content. It is the design, style, and formatting tool of web pages.

#### JavaScript

It is the scripting language of the web and it is also a lightweight interpreted language that compiles at runtime.

It is the language that adds interactivity to the web content hence it is widely in use. 

In this tutorial, we will use these tools to build a digital clock that displays the time of the day (hours, minutes, and seconds), the day, month, and the year.

#### Implementation

To implement this tutorial, first, we need to create a folder in which you’ll create HTML, CSS, and JavaScript files with their respective extension(.html, .css, .js) using any code editor of your choice but for this tutorial, I’d prefer you use VScode.

#### First step

Create your ```HTML``` file, name it ```index.html```.

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

This structure should be familiar to you, the ```id = Clock``` and ```class = glow``` will be used in our JavaScript and CSS files respectively.

To link JavaScript file and CSS file in HTML file, ```script``` and ```link`` tag is used as shown above respectively. Though there are other ways of adding JavaScript and CSS to HTML in this article, I choose to use the external file source.

#### Second step

Create a JavaScript file, in it declare a function, I call mine ```displayTime```. In this function declare a variable and assign the JavaScript date object to it. But before we go ahead, what is a *Function*?

Function in JavaScript is almost the same as what is known as a method in Java, it is a set of statements or codes that performs an action. For instance, you’re writing a program and you need to calculate the multiplication of two values in different instances in your code, without function or method you’ll need to always repeat the same code over and over whenever you want to multiply two numbers but with a function, you write the code once and call the function that does the multiplication whenever you have the need to calculate the multiplication of two numbers. I hope this is clear enough? Functions help for code modularity and for a cleaner code, the function is expected to perform just one task in this case multiplication.

Here is a code snippet to explain this better:

```js

//function declaration

function displayTime(){

   //variable

   const timeNow = new Date();

}

```

All we need to be able to build our digital clock will be in the function block apart from the ```setInterval``` method that takes the function as a parameter. The ```setInterval```, is a method in JavaScript that takes two parameters, a function and the time it will take before the function execute.

Here is the syntax on how to represent ```setInterval```:

```js

setInterval(displayTime, 1000);

```

From the code above it means that the function ```displayTime``` will keep executing after every 1000 milliseconds. Now that we've got this out of the way, let's go on to declare other variables that will take hours, minutes, seconds, days of the week, months, year, and period of the day.

```js

let hoursOfDay = timeNow.getHours();

let minutes = timeNow.getMinutes();

let seconds = timeNow.getSeconds();

let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let today = weekDay[timeNow.getDay()];

let months = timeNow.toLocaleString("default", { month: "long" });

let year = timeNow.getFullYear();

let periodOfDay = "AM";

```

If we look closely, you will notice that we're using the ```timeNow``` variable to access the various methods in the JavaScript *date* class. We declared it up above in our function block.

- Hours, minutes, and seconds are assigned to the ```hoursOfDay```, ```minutes```, and ```seconds``` variables.

- The ```weekDay``` variable contains an array of days of the week.

- The ```today``` variable gets a particular day from the ```weekDay``` collection.

- The ```months``` variable gets the string representation of months of the year. We can use ```timeNow.getMonths```to get months of the year but it is the number representation that will be printed using this method. Hence, the need to use the ```toLocaleString``` method that converts the month to string. The string *long* in the parenthesis means the complete spelling of the months should be printed, if you don't want that you can use *short* instead of long, and Feb instead of February will be printed for instance.

- The ```year``` variable gets the year from the ```getFullYear()``` method.

- The ```periodOfDay``` variable is initialized to *AM*, this prints the period of the day.

I think that is enough explanation up there. Our next step would be to couple all of these variables in the function, here is how:-

```js

function displayTime(){

   const timeNow = new Date();

   let hoursOfDay = timeNow.getHours();

   let minutes = timeNow.getMinutes();

   let seconds = timeNow.getSeconds();

   let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

   let today = weekDay[timeNow.getDay()];

   let months = timeNow.toLocaleString("default", { month: "long" });

   let year = timeNow.getFullYear();

   let periodOfDay = "AM"; 

}

```

That is what our function looks like right now. But this is not enough to build our digital clock, the reason you're reading this article. The next is to set period of day.

Here is the code snippet to illustrate that:

```js

// Permit me to declare the period and hours again even though we've declared them before

let periodOfDay = "AM";

let hoursOfDay = timeNow.getHours();

//write a condition that set our period to AM or PM

if(hoursOfDay > 12) {

   hoursOfDay -= 12;

   periodOfDay = "PM";

   /*This block checks whether the hour is greater than 12 and if that is true, 12 is subtracted from the hour and the result is assigned back to ```hour``` then the period is set to PM. 12 is subtracted since we're building a 12-hour time clock*/

}

if(hoursOfDay == 0) {

   hoursOfDay = 12;

   periodOfDay = "AM";

   /*This block checks whether hour is equal to or is 0 and if that is true, hour is set to 12 then period is set to AM. 12 is assigned to hours since we're building a 12 hour time clock*/

}

```

The next step is to set our clock display pattern. In our HTML file, we set our clock to display 2 digits for hours, seconds, and minutes (00:00:00). We need to write a program to conform to that pattern. In doing that, we will use *ternary operator*, represented as (?). 

What then is a ternary operator? A ternary operator is a conditional operator that takes three operands: A condition followed by a question mark (?), first expression, followed by a colon (:) and a second expression. The first expression is executed if the condition is true, else the second expression is executed if the condition is false. Simple right? It is a simpler way to write an if-else statement.

Here is the code snippet to illustrate that:

```js

hoursOfDay = hoursOfDay < 10 ? "0" + hoursOfDay : hoursOfDay;

//if hours is less than 10, set hour position to 0 plus hours else set position to hours

minutes = minutes < 10 ? "0" + minutes : minutes;

//if minutes is less than 10, set minutes position to 0 plus hours else set position to hours

seconds = seconds < 10 ? "0" + seconds : seconds;

//if seconds is less than 10, set seconds position to 0 plus hours else set position to hours

```

I hope the ternary operator is clear to you now.

We are almost done, the next thing is to set our time. To do that, we need to declare a variable, I call mine ```time```. Here is how:

```js

let time = hoursOfDay + ":" + minutes + ":" + seconds + period;

```

The ```time``` variable initialization takes the ```hoursOfDay``` values, a colon, ```minutes``` values, a colon, ```seconds``` values and ```periodOfDay```. So for instance if the hour is 10, minutes is 12, seconds is 23, and period is AM, ```time``` will be 10:12:23AM. This is clear, right? Two more things and we're done with the function body and JavaScript part of this article.

Our next task is to display our clock on the web page and to be able to do this, we need a way that allows our JavaScript to manipulate our HTML. This is where the knowledge of the Document Object Model (DOM) becomes handy.

There are various document methods but in this tutorial, we'll be using  ```document.getElementById``` with this we'll be able to access an HTML element with a particular *id* and in this case *Clock*.

Here is the code snippet to illustrate how:

```js

document.getElementById('Clock').innerHTML =  time + " " + today +" " + months + " " + year;

```

The ```.innerHTML``` is a property of the DOM that sets or returns the HTML content of an element. In this case, the content of the div tag with an id of ```Clock``` is set to ```time```, ```today```, ```months```, ```year```. 

The last thing is a function call or invocation. After our function has been declared, given a function body, it will still not work unless it is invoked or called. This is done by placing the function name immediately after the function closing curly braces (}).

This is how our final code will look:

```js

setInterval(displayTime, 1000);

function displayTime() {
    const hoursOfDay = timeNow.getHours();
    let minutes = timeNow.getMinutes();
    let seconds = timeNow.getSeconds();
    let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let today = weekDay[timeNow.getDay()];
    let months = timeNow.toLocaleString("default", {
        month: "long"
    });
    let year = timeNow.getFullYear();
    let period = "AM";

    if (hoursOfDays > 12) {
        hoursOfDay-= 12;
        periodOfDay = "PM";
    }

    if (hoursOfDay == 0) {
        hoursOfDay = 12;
        periodOfDay = "AM";
    }

    hoursOfDay = hoursOfDay < 10 ? "0" + hoursOfDay : hoursOfDay;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = hoursOfDay + ":" + minutes + ":" + seconds + period;

    document.getElementById('Clock').innerHTML = time + " " + today + " " + months + " " + year;

}
displayTime();
```

Did you see how we intentionally declare all our variables within the function? The goal is to make them locally scoped to the function.

#### Third Step

With what we have now, our code should work but we need to add style to it to make it look nice.

We need to create a CSS file and add these styles. I call mine ```index.css```.

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
  background: rgb(199, 172, 172);
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
.glow {
    font-size: 60px;
    color: #fff;
    font-weight: bold;
  }
 
```

### Conclusion

In this article, we have learned about function declaration and function call, we've also learned about the ternary operator and JavaScript date class. We talked about how to get the string value of months in a year using the toLocaleString method.

We have also been able to build our digital clock using only HTML, CSS, and JavaScript.


### References
-[JavaScript date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
-[W3school JavaScript date object](https://www.w3schools.com/js/js_dates.asp)