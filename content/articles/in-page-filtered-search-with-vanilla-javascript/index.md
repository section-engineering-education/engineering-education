### Introduction
Searching for text on web sites with a lot of information is tough for users. This problem can be handled by providing a search option that filters the results down the page, making them easier to discover and read. In-page filtering is one answer to this problem.
<!--more-->
To understand this, will cover as much in this tutorial to help the reader understand in-page filtering and how we can apply it using the vanilla script, a barebones version of JavaScript that does not include any extra types of libraries.

### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Overview of In-Page Filtering Search](#overview-of-in-page-filtering-search)
- [Create Sample Web Page](#create-sample-web-page)
- [Creating Time Delay](#creating-time-delay)
- [Fuzzy Searches](#fuzzy-searches)
  - [Using a hidden element](#using-a-hidden-element)
  - [Searching through an attribute](#searching-through-an-attribute)
- [Caveat](#caveat)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial the reader should:
- Have a basic understanding of the fundamentals of HTML and CSS.
- Have basic knowledge of JavaScript.

### Objectives
By the end of this tutorial,the following is expected:
- Understand overview of in-page filtered search 
- Know how to create sample web page
- Know how to create time delay
- Understand fuzzy searches
- Getting to know caveat

### Overview of In-Page Filtering Search
**In-page filtering**- is a type of search technology that filters down the web page content, making matching results easier to find and read more so on pages with a lot of information.
JavaScript will handle all of the interactivity in this tutorial by;
- Locating all of the site information that the users want to browse through.
- Monitoring the user's input in the search box and filtering the `innerText` of the searchable elements.
- Testing if the text includes the search term and returns the query results.

To follow through will create a sample web page to illustrate this concept of In-page filtering search using vanilla JavaScript.

### Create Sample Web Page
To understand this, let's create a simple web page with a sample of frequently asked questions with the code snippet below.

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
In some scenarios, the page may contain a lot of questions. When we come to the JavaScript, we'll use the CSS code below to add/remove depending on the search circumstance to get ready for the interaction.
```css
.is_hidden {
   display: none;
    }
```
We then add a search box together with its event that will fire when the user tries to get any search results.

```html
<label for="searchbox">Search</label>
<input 
  type="search" 
  oninput="Search()" 
  id="searchbox" 
>
```
To do everything, we use the JavaScript Code below;

```javascript
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

The code above finds and saves references to all the cards and the input. When a user initiates a search, the system runs through all of the cards and determines whether the text is contained within the card. If the text in the card matches the search query, the `.is_ hidden` class is removed, and the card is shown; if it doesn't, the class remains, and the card is hidden.

### Creating Time Delay
To ensure that our script doesn't run too many times and slow down the page, we will run our `Search` function only after waiting for a few seconds using the code below;
```JavaScript
let Timer;        
let Interval = 500; // Half a second
let searchInput = document.getElementById('searchbox');
searchInput.addEventListener('keyup', () => {
  clearTimeout(Timer);
  Timer = setTimeout(Search, Interval);
});
```
We then delete the input event on the search input.
```HTML
<label for="searchbox">Search</label>
<input type="search" id="searchbox">
```

### Fuzzy Searches
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
> NOTE: For the above to work ,we will update our `Search` function and we'll use `.textContent` instead of `.innerText` to incorporate all hidden components.
```JavaSCript
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
Here we put the keywords directly on the attribute's value and if a user tries to type a word in the search box, those queries match what it contained in the attribute's value.
```JavaSCript
for (var i = 0; i < cards.length; i++) {
  if(cards[i].getAttribute('alt').toLowerCase()
    .includes(search_query.toLowerCase())) {
      cards[i].classList.remove("is-hidden");
  } else {
    cards[i].classList.add("is-hidden");
  }
}
```
> NOTE: Because we want to search through the alt attributes in addition to what is really displayed on the page, we must alter `innerText` to `getAttribute('alt')` for the above method to function.

### Caveat
Is a type of search technology that only works when all the searchable content are in the DOM of the page that is already rendered.

Get the example [here](https://github.com/Shee254/in-page-filtered-search-with-vanilla-javascript)

### Conclusion
As we have seen, in-page filtering plays a crucial role in helping users to search for web content easily and quickly. Using vanilla JavaScript, we have been able to implement the above.

To summarize, we have:

- Learned what in-page filtering is.
- How to use the in-page filtered search in the vanilla script.
- How to create time delay to avoid page downtime.
- Learned about fuzzy searches and the various approaches to implementing them.
Happy coding!