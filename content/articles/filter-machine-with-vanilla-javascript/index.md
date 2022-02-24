---
layout: engineering-education
status: publish
published: true
url: /filter-machine-with-vanilla-javascript
title: Filter machine with vanilla Javascript
description: In this article, we will be building a search bar that filters and responds to your search input in real-time using vanilla Javascript.
author: mudasiru-rasheed
date: 2021-07-26T00:00:00-06:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/filter-machine-with-vanilla-javascript/hero.png
    alt: Filter machine with vanilla Javascript Hero Image
---
In this article, we will be building a search bar that filters and responds to your search input in real-time using vanilla Javascript.
<!--more-->
### Goal
By the end of the article, we should have an application that has a functional search bar as illustrated below:

![Sample Page](/engineering-education/filter-machine-with-vanilla-javascript/page.gif)

This is the [live demo](https://filter-machine.taiwrash.repl.co) of the app and the [full code](https://repl.it/@Taiwrash/filter-machine).

### Prerequisites
To follow along with this tutorial, you should know:
- HTML.
- CSS.
- Javascript.

This project was developed on the [repl website](https://repl.it/) using the `html/css/js` stack. Feel free to use it to follow along with the article.

Our code will be split into three distinct files:
1. `HTML file (index.html)`: This contains all our HTML code.
2. `CSS file (style.css)`: This contains all our CSS code.
3. `SCRIPT file (script.js)`: This contains all the Javascript code.

### HTML
The HTML code below consists of the default `html boilerplate` to which our `css` and `Javascript` files are linked.

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

The code above contains:
- The `head` tag houses the `title` and `CSS` file links.
- The `title` that displays on our browser indicating the title of the page.
- The CSS link that points directly to our CSS file and helps pass the set of rules in the CSS file that are to be applied to the HTML content.
- The `main` tag contains the main content of our HTML page.
- The `header` tag contains the header of our application.
- The `h2` tag describes our Application with the form that contains our search bar.
- The `divs` with class attributes of `card` that are duplicated for every letter.
- The `script` link that points to our Javascript code included just before the closing `</body>` tag.

### CSS
First, we clear the default `margin`, `padding` and `box-sizing` styling:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

We do this to prevent the default addition of margins and paddings to the width and height of elements; and to set the box-sizing to border-box, which controls the behavioral activities of every element on the page in relation to the box model.

We then style the main content area:
```css
main {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

We set the width to the view width of the viewing device. We then use Flexbox to achieve a responsive layout.

We then style the header:
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

We set the width and height, and the background color using the `background` property; the `background` property can take multiple options eg. an image, color, etc. If you wish to, you can use an image, any other pattern, or even the `background-color` property, which will do the same thing.

Now, let us decorate the search bar's input element:
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

We set the width to 70% of the header width. We add a margin to push it away from the `(<h2>)` tag above it. We add the rounded corner using the `border-radius` property.

Then, let's style the cards:
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

These are the circular cards containing the English letters. We set `border-radius: 50%` which makes the cards circular. The other properties follow the same pattern as before.

We then style the error card:
```css
.card:last-child {
  font-size: 30px;
  text-align: center;
  display: none;
}
```

The `:last-child` is a `CSS` pseudo-class selector which helps select the last child element contained within a parent element. We will display this card when nothing matches our user's search. The implementation will be done in the javascript code.

### Making the CSS responsive
Developing a web-based app that is accessible through mobile and tablet is important as mobile devices are everywhere. 

There are many ways of doing this; we will be implementing responsiveness using a `media query`:
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

We will only control the important sections of our application. The header will automatically increase in height at the point where the user's screen is greater than `768px` and the search bar height was increased too. 

Another important property is the flex property `flex-direction` which we set to `column` to make the flex items contained in the header to be displayed vertically.

### Javascript code
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

Above is all the required Javascript code. In the following steps, I will be explaining what the code does.

- Line 1

```js
const input = document.querySelector("input");
```

We create a variable called `input`. This variable holds the content of the search bar we created in our HTML. The  `querySelector` method returns a list of every HTML element with the tag input. Here, we only have one. 

Later on, the user input can be obtained by using Javascript's `.value` method on the `input` variable.

- Line 3 - 4

```js
const filterFunction = () => {
```

We create a new arrow function, `filterFunction` using ES6 (ECMAScript 2015) syntax. Inside the function, we create another variable that holds every `card` div. The `filterFunction` function will contain all the logic to filter everything on the page as we wish.

```js
const cards = document.querySelectorAll(".card");
```

We use `querySelector` as explained before; every element with the class attribute of `card` will be returned as an item in an array.

- Line 5

```js
cards.forEach((item) => {
```

We then loop through the array returned using the `forEach` method.

- Line 6

```js
let whatToSearch = item.querySelector("p");
```

Inside every card, there is a `<p>` tag that holds the letters. line 5 creates a variable to hold each `<p>` tag using `querySelector` on the item returned by the `forEach` method.

- Line 7 - 8

```js
if (whatToSearch.innerHTML.toUpperCase().indexOf(input.value.toUpperCase()) >-1)
```

We then use an `if` statement to check if our search input matches any text in the div's we are searching through. 

`whatToSearch.innerHTML` returns the letter inside the `whatToSearch` variable, which is the letter in the `<p>` tag. 

We use `toUpperCase()` to convert it into a capital letter. We then use `indexOf` to check if the user's input value is found within the `whatToSearch` values. If the return value is greater than `-1` it means the search value matched with something, if not greater than `-1` the search value is not in the list.

- Line 9

```js
item.style.display = "";
```

This sets a CSS property of `display` on the item to default the `display` property or the property in the CSS file.

- Line 10

```js
item.style.display = "none";
```

If the type character does not match, it should set `display` to `none`, that is, nothing should be shown.

- Line 12 -13

```js
notFound.style.display = "flex";
```

We create a variable to hold the last div using the `getElementById` method on `line 2`. This returns the element with the `ID` passed in. The CSS `display` property was set to flex as it was set to none in the CSS file.

- Last Line

```js
input.addEventListener("keyup", filterFunction);
```

We set a `keyup` event listener on the input which responds when a user releases their hand from the keyboard and the function created in line 3 is called.
### Conclusion
Below is what we just built, isn't amazing?

![Demo](/engineering-education/filter-machine-with-vanilla-javascript/page.gif)

What you just built can be implemented in various real-life projects and can be improved by:

1.  The search bar can be modified by adding more styles to be more outstanding and give a better look.
2.  On a shopping cart application, users need to filter out the products to get their choices. This app can be integrated to give access.
3.  Creativity is the limit of this app as it can be implemented on any application that needs a filter to its elements.

### Further reading
- [Creating a Responsive Navigation bar Using Tailwind CSS and Javascript](https://www.section.io/engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/)
- [Documenting JavaScript Code With JSDocs](https://www.section.io/engineering-education/jsdoc-documentation/)
- [DOM Manipulation with JavaScript](https://www.section.io/engineering-education/dom-manipulation-with-javascript/)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)