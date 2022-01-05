---
layout: engineering-education
status: publish
published: true
url: /in-page-filtered-search-with-vanilla-javascript/
title: In-Page Filtered Search with Vanilla JavaScript
description: This tutorial will be an introduction to in-page filtered search for any webpages. We will be building a simple webpage to demonstrate in-page search.
author: cecilia-wanjiru-wairimu
date: 2022-01-04T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/in-page-filtered-search-with-vanilla-javascript/hero.jpg
    alt: In-Page Filtered Search With Vanilla JavaScript Hero Image
---
Manually searching for textual data on websites with a lot of information is difficult and time-consuming. This problem can be handled by providing a search option that filters the results down the page, making them easier to discover and read. In-page filtering is one answer to this problem.
<!--more-->
This tutorial will help the reader to understand in-page filtering and how it can be applied using the vanilla script, a barebones version of JavaScript that does not include any extra types of libraries.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Overview of In-Page filtering search](#overview-of-in-page-filtering-search)
- [Create sample webpage](#create-sample-web-page)
- [Creating time delay](#creating-time-delay)
- [Fuzzy searches](#fuzzy-searches)
  - [Using a hidden element](#using-a-hidden-element)
  - [Searching through an attribute](#searching-through-an-attribute)
- [Caveat](#caveat)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial the reader should have:
- A good understanding of the fundamentals of HTML and CSS.
- Basic knowledge of JavaScript.

### Objectives
By the end of this tutorial, the reader will know the following:
- Understand the overview of the in-page filtered search.
- Know how to create a sample web page.
- Know how to create a time delay.
- Understand fuzzy searches.
- Getting to know caveat.

### Overview of in-Page filtering search
**In-page filtering** - is a type of search technology that filters down the web page content, making matching results easier to find and read. More so on pages with a lot of information.

JavaScript handles all the user interactions by:
- Locating all of the site information that the users want to browse through.
- Monitoring the user's input in the search box and filtering the `innerText` of the searchable elements.
- Testing if the text includes the search term and returns the query results.

To follow through, we will create a sample web page to illustrate this concept of in-page filtering search using vanilla JavaScript.

### Create sample webpage
To understand this, let's create a simple web page with a sample of frequently asked questions with the code snippet below:

```html
<h1>FAQ Section</h1>
<div class="cards">
  <h3>What is Paradise Island?</h3>
  <p>It's where Wonder Woman comes from.</p>
</div>
<div class="cards">
  <h3>Who were Batman's parents?</h3>
  <p>Thomas Wayne and Martha Wayne.</p>
</div>
<div class="cards">
  <h3>What is Kryptonite?</h3>
  <p>It's Superman's weakness</p>
</div>
<div class="cards">
  <h3>What is Eye of Agamotto?</h3>
  <p>It's a place where the Time Stone is hidden in Doctor Strange</p>
</div>
<div class="cards">
  <h3>Learn more</h3>
  <p>Want to learn more about us?</p>
</div>
```

When coming to JavaScript, we'll use the CSS code below to add/remove elements depending on the search circumstance to get ready for the interaction.

```css
.is_hidden {
  display: none;
}
```

We then add a search box together with its event that fires when the user tries to get any search results.

```html
<label for="searchbox">Search</label>
<input 
  type="search" 
  oninput="Search()" 
  id="searchbox" 
>
```

Then, we use the JavaScript code below to perform search and filter operations:

```JavaScript
function Search() {
  // Locate the card elements
  let cards = document.querySelectorAll('.cards')
  // Locate the search input
  let search_query = document.getElementById("searchbox").value;
  // Loop through the cards
  for (var i = 0; i < cards.length; i++) {
    // If the text is within the card...
    if(cards[i].innerText.toLowerCase()
      // ...and the text matches the search query...
      .includes(search_query.toLowerCase())) {
        // ...remove the `.is-hidden` class.
        cards[i].classList.remove("is_hidden");
    } else {
      // Otherwise, add the class.
      cards[i].classList.add("is_hidden");
    }
  }
}
```

- The code above finds and saves references of all the `cards` and the input.
- When a user initiates a search, the system runs through all of the `cards` and determines whether the text is contained within the card.
- If the text in the card matches the search query, the `.is_ hidden` class is removed, and the card is shown; if it doesn't, the class remains, and the card is hidden.

### Creating time delay
To ensure that our script doesn't run too many times and slows down the page, we will run our `Search` function only after waiting for a few seconds using the code below:

```JavaScript
let Timer;        
let Interval = 500; // Half a second
let searchInput = document.getElementById('searchbox');
searchInput.addEventListener('keyup', () => {
  clearTimeout(Timer);
  Timer = setTimeout(Search, Interval);
});
```

We then delete the input event on the search input:

```HTML
<label for="searchbox">Search</label>
<input type="search" id="searchbox">
```

### Fuzzy searches
These are searches that return the same result as an exact match when using related keywords. This increases the number of cards that could potentially "match" a search query.

There are two options for doing so:

#### Using a hidden element
Take, for example, a keyword-filled span. The code below will be used to use the hidden element:

```html
<div class="cards">
 <h3>What is Paradise Island?</h3>
  <p>It's where Wonder Woman comes from.</p>
  
    <!-- Put any keywords here -->
   <span class="is_hidden">secret</span> 
</div>
```

> NOTE: For the code above to work, we will update our `Search` function and we'll use `.textContent` instead of `.innerText` to incorporate all hidden components.

```JavaScript
for (var i = 0; i < cards.length; i++) {
  if(cards[i].textContent.toLowerCase()
          .includes(search_query.toLowerCase())) {
      cards[i].classList.remove("is_hidden");
  } else {
      cards[i].classList.add("is_hidden");
  }
}
```

#### Searching through an attribute
Here, we put the keywords directly on the attribute's value and if a user tries to type a word in the search box, those queries match what it contained in the attribute's value.

```JavaScript
for (var i = 0; i < cards.length; i++) {
  if(cards[i].getAttribute('alt').toLowerCase()
    .includes(search_query.toLowerCase())) {
      cards[i].classList.remove("is-hidden");
  } else {
    cards[i].classList.add("is-hidden");
  }
}
```

> NOTE: Since we want to search through the alt attributes in addition to what is really displayed on the page, we must alter `innerText` to `getAttribute('alt')` for the above method to function.

### Caveat
These methods work only when all the searchable content is in the DOM of the page that is already rendered.

You can find the full working code [here](https://github.com/Shee254/in-page-filtered-search-with-vanilla-javascript).

### Conclusion
As we have seen, in-page filtering plays a crucial role in helping users search for web content easily and quickly. Using vanilla JavaScript, we have been able to implement the above.

To summarize, we have:
- Learned what in-page filtering is.
- How to use the in-page filtered search in the vanilla script.
- How to create time delay to avoid page downtime.
- Learned about fuzzy searches and the various approaches to implementing them.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)