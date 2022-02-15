---
layout: engineering-education
status: publish
published: true
url: /create-an-ajax-type-ahead-feature-for-a-website/
title: Creating a Type Ahead Feature in JavaScript using Fetch and Regex
description: This tutorial will discuss how to build a type-ahead feature for a website using Fetch and Regex.
author: godwin-martins
date: 2022-02-11T00:00:00-02:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/create-an-ajax-type-ahead-feature-for-a-website/hero.jpg
    alt: Creating a Type Ahead Feature in JavaScript using Fetch and Regex Hero Image
---
Creating an intuitive user interface that provides the best user experience for website users is part of the job of front-end developers. They create search suggestions or text completion for websites/web pages to help improve user experience.
<!--more-->
This tutorial will explain how to create an **ajax type-ahead feature** for your website using the [cities.json file](https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json).

This file contains information about states and cities in America. What this feature does is, if a user types a `name`, every state and city that matches the word `name` pops up.

### Prerequisites
To follow along with this tutorial, you should have:
- Basic HTML and CSS knowledge.
- ES6 JavaScript/Asynchronous JavaScript.
- A code editor.
- An understanding of [Regular Expression (RegExp)](https://eloquentjavascript.net/09_regexp.html).

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [How fetch works](#how-fetch-works)
- [Getting started](#getting-started)
  - [Create the Html and CSS page](#create-the-html-and-css-page)
- [The Javascript](#the-javascript)
  - [Getting the data](#getting-the-data)
- [Displaying data to the UI](#displaying-data-to-the-ui)
- [Formatting the output (Optional)](#formatting-the-output-optional)
- [The complete JavaScript code](#the-complete-javascript-code)
- [Final output](#final-output)
- [Conclusion](#conclusion)
- [References](#references)

### How fetch works
`Fetch`, like `XMLHttpRequest` gets resources asynchronously across networks. However, the `Fetch` method gives an easy, cleaner, and more efficient way to handle resources across networks.

This method uses `Promise` to deliver more flexible features to make requests to servers from the web browsers.

Syntax:

```js
Fetch(URL, options);
```

The fetch method requires the URL of the resource requested and an optional parameter that allows you to control other settings. Find more about fetch [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

### Getting started
#### Create the Html and CSS page
Create an HTML page with a search `input` and a `ul` (unordered list). The input form allows the user to enter the word to search, and the `ul` will display the matching states and cities.

The HTML page should look like the one below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <!-- Remix Icon CDN -->
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
      rel="stylesheet"
    />
    <title>Auto complete type ahead feature</title>
  </head>
  <body>
    <div class="container">
      <h2 class="header"><span>Find </span>State or City</h2>
      <main class="main">
        <form>
          <label for="search"><i class="ri-search-line"></i> </label>
          <input
            type="search"
            name="search"
            id="search "
            placeholder="Type to search"
          />
        </form>
        <ul class="card"></ul>
      </main>
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```

> You can create the HTML page however you want - The important thing is to include a search box and a container to display matching results.

Create a CSS file to style accordingly. In your CSS file, add a `.highlight` or `.hl` style to format the search term when you return the result.

The CSS file should look like the one below:

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  color: #f0ffff;
}

.container {
  width: 100%;
  min-height: 100vh;
  padding: 10% 15%;
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 2rem;
  background-image: linear-gradient(rgba(0, 8, 51, 0.466), rgba(0, 8, 51, 0.9)),
    url("./pexels-hasan-albari-1229861.jpg");
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
}

.header {
  align-self: flex-start;
  color: #00ffff;
}

.main {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

form {
  padding: 0.3rem 0.8rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border: 1px solid #f0f8ff;
  border-radius: 50px;
}

.ri-search-line {
  font-size: 2rem;
}

input[type="search"] {
  border: 0;
  outline: none;
  width: 90%;
  color: #f0f8ff;
  font-family: inherit;
  font-size: 2rem;
  background-color: transparent;
}

::placeholder {
  color: #c2a00a;
}

.card {
  max-height: 80vh;
  min-width: 350px;
  list-style: none;
  overflow-block: scroll;
  background-color: #f0f8ff;
  color: #000000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.card-item {
  width: 100%;
  position: relative;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card-item::after {
  content: "";
  width: 100%;
  height: 1px;
  background-color: saddlebrown;
  position: absolute;
  left: 0;
  bottom: 0;
}

.hl {
  color: red;
}
```

You can style the CSS file according to your preference.

### The Javascript
#### Getting the data
The data for this project is from the [cities.json](https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json) file; a file that has information of states cities in America.

From the file, we get access to the following information of each state in America:
1. State name
2. City name
3. Population
4. Latitude and longitude
5. Growth_from_2000_to_2013
6. Rank

You can choose the data to display from the list above.

Get the search word and the `ul` from the UI using the code below:

```js
const searchText = document.querySelector('input[type="search"]');
const card = document.querySelector(".card");
```

Create the data endpoint and create an empty array as shown below:

```js
const dataEndpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
```

Now we need to fetch our data from the endpoint and assign the returned value to the empty array we created:

```js
fetch(dataEndpoint)
  .then((blobdata) => blobdata.json())
  .then((data) => cities.push(...data));
```

> The blobdata object, in turn, does not contain the actual JSON response body but is instead a representation of the entire HTTP response. To extract the JSON body content from the Response object, we use the `JSON()` method. This method returns a second promise that resolves with the result of parsing the response body text as JSON. Look at using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

![Blobdata output](/engineering-education/create-an-ajax-type-ahead-feature-for-a-website/returned-blobdata.png)
_blobdata returns entire HTTP response_

Here are a few things to note:
- We defined the empty cities array using a `const` declaration so we cannot reassign data to it. We can only declare the cities array with a `let` keyword.
- Alternatively, you can push and [spread the data into the cities array](https://www.samanthaming.com/tidbits/92-6-use-cases-of-spread-with-array/).
- Create a function named `getMatches` that takes two arguments, the `wordToMatch` and the `cities` array.
- In the function above, we will return a filtered subset of the `cities` array to confirm what the user typed is returned. To acheive this, we will use [Regex](https://www.w3schools.com/js/js_regexp.asp) to check if the searched word matches any state or city in the `cities` array:

```js
function getMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
```

![Arrays of objects returned](/engineering-education/create-an-ajax-type-ahead-feature-for-a-website/console-output.png)
_Arrays of objects returned by the `getMatches` Function_

### Displaying data to the UI
Now that we can get the `getMatches` function to display arrays of searched words to the 'console', let us find a way to hook them up to the `ul`.

First, listen to the UI element that will trigger the display:

```js
searchText.addEventListener("change", displayMatchedResults);
searchText.addEventListener("keyup", displayMatchedResults);
```

Next, create a function named `displayMatches`.

Create a variable `searchTerm` and assign the search term from the UI to it:

```js
const searchTerm = this.value;
```

Call the `getMatches` function and assign it to a variable named `outputted`:

```js
const outputted = getMatches(searchTerm, cities);
```

`getMatches` function takes two arguments, the search word from the UI and the cities array returned from the fetch statement we created earlier.

At this point, `outputted` now holds an array of every state and city that matches the search word.

Now loop over `outputted` with the `.map()` array function and return the following `Html` element:

```js
const htmlToDisplay = outputted.map((place) => {
  return `
  <li class ='card-item'>
  <span class ='name '> ${place.city}, ${place.city}</span>
  <span class 'population'> ${place.population}</span>
  </li>`;
});
```

Since the `.map()` function returns an array, append the `.join()` method to convert it to one big string:

```js
const htmlToDisplay = outputted
  .map((place) => {
    return `
  <li class ='card-item'>
  <span class ='name '> ${place.city}, ${place.city}</span>
  <span class 'population'> ${place.population}</span>
  </li>`;
  })
  .join();
```

Set the inner `Html` of the `ul` element to the string returned from the step above:

```js
card.innerHTML = htmlToDisplay;
```

At this point, the `card.innerHTML` will display every state and city when the search box is empty. To handle this, you can throw in some control:

```js
if (searchTerm === "") {
  card.innerHTML = "";
} else {
  card.innerHTML = htmlToDisplay;
}
```

### Formatting the output (Optional)
Next, let us format the output to highlight the text on the result; which matches the text the user entered in the search box. Also, we will format the population to be comma-separated.

We achieve this by replacing the following code:

```js
const htmlToDisplay = outputted
  .map((place) => {
    return `
 <li class ='card-item'>
 <span class ='name '> ${place.city}, ${place.city}</span>
 <span class 'population'> ${place.population}</span>
 </li>`;
  })
  .join();
```

with:

```js
const htmlToDisplay = outputted
  .map((place) => {
    const regex = RegExp(searchTerm, "gi");

    const cityName = place.city.replace(
      regex,
      `<span class='hl'>${this.value}</span>`
    );

    const stateName = place.state.replace(
      regex,
      `<span class='hl'>${searchTerm}</span>`
    );

    const commaSeperated = place.population
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `
  <li class ='card-item'>
  <span class ='name '> ${cityName}, ${stateName}</span>
  <span class 'population'> ${commaSeperated}</span>
  </li>`;
  })
  .join("");
```

Read more about replacing a string with `.replace` and **regex** [here](https://www.freecodecamp.org/news/javascript-string-replace-example-with-regex/).

### The complete JavaScript code
Below is the complete JavaScript code for this tutorial. Save the Javascript code in the same folder as the HTML file and link them using the `script` tag.

```js
const dataEndpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const searchText = document.querySelector('input[type="search"]');
const card = document.querySelector(".card");

const cities = [];

fetch(dataEndpoint)
  .then((blobdata) => blobdata.json())
  .then((data) => cities.push(...data));

function getMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

searchText.addEventListener("change", displayMatchedResults);
searchText.addEventListener("keyup", displayMatchedResults);

function displayMatchedResults() {
  const searchTerm = this.value;
  const outputted = getMatches(searchTerm, cities);

  const htmlToDisplay = outputted
    .map((place) => {
      const regex = RegExp(searchTerm, "gi");

      const cityName = place.city.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );

      const stateName = place.state.replace(
        regex,
        `<span class='hl'>${searchTerm}</span>`
      );

      const commaSeperated = place.population
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return `
        <li class ='card-item'>
        <span class ='name '> ${cityName}, ${stateName}</span>
        <span class 'population'> ${commaSeperated}</span>
        </li>`;
    })
    .join("");

  if (searchTerm === "") {
    card.innerHTML = "";
  } else {
    card.innerHTML = htmlToDisplay;
  }
}
```

### Final output
![The final output](/engineering-education/create-an-ajax-type-ahead-feature-for-a-website/output.png)
_Final output using 'gon' as the search term_

### Conclusion
In this tutorial, we have learned how to build a type-ahead feature for a website. It displays the search suggestion containing the words that match the user input. We also learned an optional way to format the output to highlight the matched words.

The lessons learned from this tutorial can be used on any project, with a different data source of course. I hope you find this tutorial helpful.

Happy coding!

### References
- [Using Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JavaScript String.Replace() Example with RegEx - Freecodecamp](https://www.freecodecamp.org/news/javascript-string-replace-example-with-regex/)
- [Understanding Regex](https://www.computerhope.com/jargon/r/regex.htm)
- [Eloquent JavaScript](https://eloquentjavascript.net/09_regexp.html)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
