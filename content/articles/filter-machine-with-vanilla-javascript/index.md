---
name: "Filter Machine with Javascript"
description: "This is an app that can show participants how to implement and build a filter search bar in their applications using pure javascript"
author: "@Taiwrash"
---

### Filter machine
![Sample Page](/filter-machine-with-vanilla-javascript/page.gif)

This is the [Live Demo](https://filter-machine.taiwrash.repl.co) of the app and [Full Code](https://repl.it/@Taiwrash/filter-machine).

### Prerequisites
- Good internet access
- Basic knowledge of:
  - HTML
  - CSS
  - Javascript

### What we are building
In this workshop we will be building a filter bar which respond to user search in real time using vanilla javascript.

### The app features
- Seacrh Area
- List of Item to be Filtered (in this case a box containing letter of English Alphabets)

### Where to write all the code?
This Project was develop through the [repl website](https://repl.it/) chosing the `html/css/js` as language. It is easy to use, kindly sign up if you don't have an account. Our code in this workshop will be structured in three different file.

1. `HTML file (index.html)`: This contain all our html code
2. `CSS file (style.css)`: This contain all our css code
3. `SCRIPT file (script.js)`: This will contain all the javascript code

### HTML code
Below are the simple and easy to understand html code that we will be using. It consist of default `html boilerplate` in which our `css file` and `javascript file` was linked. See full HTML code down

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>workshop filter search bar</title>
  </head>
  <body>
    <main>
      <header>
        <h2>This is Filter Machine written in Vanilla Js</h2>
        <div class="form-area">
          <form>
            <input
              type="search"
              placeholder="Type Here to filter the List"
              autofocus
            />
          </form>
        </div>
      </header>

      <div class="content">
        <div class="card">
          <p>A</p>
        </div>
        <div class="card">
          <p>B</p>
        </div>
        <div class="card">
          <p>C</p>
        </div>
        <div class="card">
          <p>D</p>
        </div>
        <div class="card">
          <p>E</p>
        </div>
        <div class="card">
          <p>F</p>
        </div>
        <div class="card">
          <p>G</p>
        </div>
        <div class="card">
          <p>H</p>
        </div>
        <div class="card">
          <p>I</p>
        </div>
        <div class="card">
          <p>I</p>
        </div>
        <div class="card" id="not-found">
          <p>Not in the List</p>
        </div>
      </div>
    </main>
    <script src="script.js"></script>
  </body>
</html>
```

It's seems to be long, Right? It is so because there are repetition of `card` <div>. And it is very important to unnderstand a code before copy-paste it. Follow my explanation below.

### Contents of the HTML file
- It contain the `HEAD` tag which house the `title` and `css` file link. `title` display on our browser indicating the title of the page. The css link is pointing directly to our css file and it help pass the set of rule in the css file and apply it to the html content. Look like magic, right? It is not but it is interesting.

- The `main area` tag: This is where all what is display to the users appears. inside the main area we have a header which represent the top part of our application

- Follow by the `h2` tag to describe our Application with the form that contain our search bar. All in the `header tag`.

- Lastly, we have the <divs> with class attributes of `card` and was duplicated for every letters.

- A script link pointing to our javscript was included in just before the close </body> tag.

### Contents of the CSS file
- Clearing Default Style

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

This is done to remove the default margin and padding of every element and to set the box-sizing to border-box, which controls the behavioural activities of every elements on the page. This prevents the default addition of margins and paddings to the width and height.

- Styling Main Content area

```css
main {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

The width was set to the view width of the viewing device. It is display flex (Flex is a new feature in css that encourage and improve responsiveness of every web pages) [RWD] you can read more at CSS Flex on the official css website.

- Styling the header

```css
header {
  width: 100%;
  height: 200px;
  background: darkslategray;
  border-radius: 0 0 100% 100%;
  padding: 50px;
  margin: 0 0 20px;
  color: white;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  text-align: center;
}
```

It is simple, abi? We set the width and height. We give the background color. The background is powerful to detect what we pass in whether it is an image or color or any other background property, it interpreted it. In this case interpreted it to be a color. If you wish you can also use image or anyother pattern or even `background-color` property, it will do the same thing.

- Let's decorate the input i.e search bar

```css
input {
  width: 70%;
  height: 50px;
  margin-top: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 25px;
  padding-left: 20px;
}
```

Width was to the 70% of the header width, you can do the maths ): margin push it away from the `(<h2>)` tag on top. The little round corner was through the help of border-radius property

- Styling the cards

```css
.card {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: darkslategray;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 56px;
  font-family: monospace;
}
```

This is the circle you see on the app which contain the English letters. `border-radius:50%` will turn a square to circle. Amazing, right? Other property was set and follow the same pattern as before.

- Error card style

```css
.card:last-child {
  font-size: 30px;
  text-align: center;
  display: none;
}
```

The `:last-child` is a `CSS` pseudo class selector which help select last element of a particular child of an html elements. This card display when nothing match our search. Implementation will be done the javascript code.

### Responsive Web design(RWD) Style
Developing web based app which is accessible through mobile and tablet is important as mobile devices are everywhere. There are many ways of doing this but we will be implementing one of them which is `media query`. See implementation below

```css
@media screen and (min-width: 768px) {
  header {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 30px;
  }
  input {
    height: 80px;
  }
}
```

We only control the important part. The header will automatically increase in height at the point where the user screen is greater than `768px` and the search bar height was increased. Another important property of the css was also implemented using the flex property and the `flex-direction` was set to `column` to make the flex items (every contents) on header to display vertically.

### The app's Javascript Code 
```js
const input = document.querySelector("input");
const notFound = document.getElementById("not-found");

const filterFunction = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((item) => {
    let whatToSearch = item.querySelector("p");
    if (
      whatToSearch.innerHTML.toUpperCase().indexOf(input.value.toUpperCase()) >
      -1
    ) {
      item.style.display = "";
    } else {
      item.style.display = "none";

      //  Not found logic

      notFound.style.display = "flex";
    }
  });
};
input.addEventListener("keyup", filterFunction);
```

**Above is all the code. I will be explaning every steps below.**

- Line 1

```js
const input = document.querySelector("input");
```

A variable called `input` was created. I just choose what I like, you can call it anything. This variable hold the content of the search bar we created with our HTML. `querySelector` return a list of every HTML element with the tag input. Here, we only have one. And the user input can be gotten using the javascript `.value` method

- Line 3 - 4

```js
    const filterFunction = () => {
```

A new funtion was created us ES6(ECMAScript 2015) format known as arrow function. Inside the function we created another variable that hold every `card` <div>. This function will contain all the logic to filter evrything on the page as we wish.

```js
const cards = document.querySelectorAll(".card");
```

Using `querySelector` as explained before. Every elements with the class attribute of card will be returned as an array

- Line 5

```js
  cards.forEach((item) => {
```

The array returned was looped through using the `forEach` method of javascript which return each card as an item as indicated in the code.

- Line 6

```js
let whatToSearch = item.querySelector("p");
```

Inside every card, there is a <p> tag. Which is the paragraph element that hold the letters. line 5 create a variable to hold each <p> tag using `querySelector` on the item return by `forEach` method.

- Line 7 - 8

```js
 if (whatToSearch.innerHTML.toUpperCase().indexOf(input.value.toUpperCase()) >-1)
```

An `if statement` to check a condition if certain things is true, `whatToSearch.innerHTML` return the letter inside the `whatToSearch` variable which is the letter in the <p> tag `toUpperCase()` convert it to capital letter. `indexOf` search for a parameter passed which is the capital letter of the `input.value` (this return what the user type into the search bar), check line of code above for clarifications. if it is greater than `-1` it means the search value match but if not greater than `-1`it is not in the list.

- Line 9

```js
item.style.display = "";
```

This set a CSS property of display on the item to default display property or the property in the CSS file.

- Line 10

```js
item.style.display = "none";
```

If the type caracter does not match. it should display none that is nothing should be shown.

- Line 12 -13

```js
notFound.style.display = "flex";
```

A variable was created to hold the last div using the `getElementById` method on `line 2`. This return element with the `ID` passed in. The css display property was set to flex as it was set to none in the css file.

- Last Line

```js
input.addEventListener("keyup", filterFunction);
```

A `keyup` event listerner was set on the input which respond when user release hand from the keyboard and function created in line 3 was called.
![Demo](/filter-machine-with-vanilla-javascript/congrat.gif)

### Conclusion
Below is what we just built, isn't amazing?

![Demo](/filter-machine-with-vanilla-javascript/page.gif)

What you just built can be implemented in various real life projects and can be improve/ Suggestions on some improvement can be seen below.

1.  The Search bar can be modified by adding more styles to be more outstanding and give better look

2.  On a shopping cart application, user need to filter out the products to get their choices. This app can be integrated to give access

3.  Creativity is the limit of this app as it can be implemented on any application that need filter as its elements.

### Further applications 
1.  [worldcovid19app-app](https://taiwrash.github.io/worldcovid19cases)

2.  [tech-resumie-app](https://tech-resumie.herokuapp.com)

3.  [Country-list-app-with-filter-enabled](https://lookup-a-country.netlify.app)
