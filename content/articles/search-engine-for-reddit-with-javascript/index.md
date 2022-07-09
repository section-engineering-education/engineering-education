---
layout: engineering-education
status: publish
published: true
url: /search-engine-for-reddit-with-javascript/
title: How to Build a Search Engine for Reddit with JavaScript
description: This article shows the reader how to build a Reddit Search application that uses the parcel-bundler and Reddit API.
author: muhammed-ali
date: 2022-01-27T00:00:00-12:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/search-engine-for-reddit-with-javascript/hero.jpg
    alt: Reddit Search Engine
---
In this article, we will be looking at how to build a front-end application that uses the parcel-bundler and Reddit API.
<!--more-->
This application should:
1. Allow us to search article content on Reddit.
2. Allow us to limit the number of results between the ranges of 5 to 100 results
3. Allow us to sort the results by either relevance or date (latest).

We will also add an alert that will trigger if a user does not add a search term.

#### Prerequisites
To follow along with this tutorial, you should have:
1. Basic Knowledge of API
2. Basic knowledge of JavaScript

### How to set up Parcel
This is a package manager similar to a [webpack](https://webpack.js.org/) with zero configuration, very simple to set up.

First, create a new folder for the project on your desktop and open the folder with VS Code or any text editor you prefer.

To install [parcel](https://parceljs.org/getting-started/webapp/) globally, open your terminal and run the following command, `npm I -g parcel-bundler`.

When you install the package completely, type in `npm init` in the terminal. This will create a `package.json` file where we enter the package name, description, entry point, author, and license of the project.

After that, you create an `index.html` and `index.js` file within the folder we just created. What the parcel is going to do is to package it and put it in a `dist folder`. The parcel also starts the development server on the terminal, which you can do by running `npx parcel index.html` in the terminal.

### Building the application
This app is built using HTML, Bootstrap, and JavaScript; we will discuss more on JavaScript.

Let's first brush through the HTML, since we are using bootstrap, we have to get the [CDN](https://www.bootstrapcdn.com/) link from the site and copy the CSS link tag.

We will be going straight to the JavaScript work. You can get the full HTML code from this [link](https://github.com/khabdrick/reddit-search-engine/blob/main/index.html) to flow along.

#### Developing the JavaScript section
We have to get the search button and input form, then add an event listener so that when you submit the form, it will trigger a function that will get the sort by input value, and the limit.

```js
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Form event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get search term
  const searchTerm = searchInput.value;
  //get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // get limit
  const searchLimit = document.getElementById("limit").value;
  // check input if empty
  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }
  // to clear input after search
  searchInput.value = "";
});
```

In order to make sure we cannot submit an empty search box, we will add an alert message. This will be done by using a simple `if` statement; which we have already written in the code above. This will need a function. In this function, we have to set a timeout so that the alert message does not remain on the screen indefinitely.

```js
// show function to output the message
function showMessage(message, className) {
  // create div
  const div = document.createElement("div");
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const searchContainer = document.getElementById("search-container");
  // get search
  const search = document.getElementById("search");
  // insert message
  searchContainer.insertBefore(div, search);

  // timeout the alert
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
  //we have to set timeout in milliseconds so after the alert message is displayed it has to clear
}
```

![empty-search.png](/engineering-education/search-engine-for-reddit-with-javascript/empty-search.png)

You can see the alert message displayed in the image above when the search is empty.

#### Fetching the Reddit API
First, we will create another JavaScript file in the root of your project, **not in the dist folder**, and name it `redditapi.js`. In this file, we will create a module object and make the request to fetch the API, and export the file to `index.js`.

In the file you just created, paste the code below:

```js
export default {
  search: function (searchTerm, searchLimit, sortBy) {
    // fetch api of reddit
    return (
      fetch(
        `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
      )
        .then((res) => res.json())
        .then((data) => data.data.children.map((data) => data.data))
        // to get error
        .catch((err) => console.log(err))
    );
  },
};
```

In the [Reddit API documentation](https://www.reddit.com/dev/api/#section_search), you will see more information for the search endpoint.

We have just created a separate file to fetch the Reddit API. We will have to import the module to the `index.js` file using `import reddit from './redditapi';` this should be done in the first line of the `index.js` file. Note that the `reddit` in the inline code above is a variable that we will use to call the search function.

To get the data which in this case is the result which we will be output to the UI using the bootstrap card. We will loop through all the results and create a card for each one.

The code below should be within the very first function linked with the event listener:

```js
// search reddit
reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
  let output = '<div class="card-columns">';
  // loop through post
  results.forEach((post) => {
    console.log("results");

    output += `
            <div class="card">
   <div class="card-body">
     
    <h5 class="card-title">${post.title}</h5>
     
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
     
    <a href="${post.url}" target="_blank" class="btn btn-dark">Read More</a>
  </div>
</div>
            `;
  });
  output += "</div>";
  document.getElementById("results").innerHTML = output;
});
```

As you can see, we have appended the result to the DOM with the id `result` we created in our HTML file, we also see that we used the `truncateText` in the `selftext` to shorten the post.

Below is the function to implement the truncation:

```js
// truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf("", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
```

![final.png](/engineering-education/search-engine-for-reddit-with-javascript/final.png)

From the image above we can see that the search brought out the word searched which are in a card form. The **read more** button when clicked will open in a new tab with the content of the search for one to read.

### Conclusion
In this article, we have seen how the parcel bundle works and how to install it globally using `npm`. We built an application that searches the Reddit API directly and fetches the data entered in the form.

We also found a way to filter the searched items based on relevance, latest, and the number of results you want to receive.

I advise you get familiar with the Reddit API documentation, so you will be able to implement more features of the API in your future projects. 

You can find the code used in this article on [GitHub](https://github.com/khabdrick/reddit-search-engine).

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
