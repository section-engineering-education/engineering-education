---
layout: engineering-education
status: publish
published: true
url: /simple-guide-to-using-apis-nodejs/
title: Getting to Grips with APIs - Using Node.js and EJS
description: Using the Goodreads API and goodreads-api-node wrapper to search for books, display the results as book titles and create book pages when a book title is clicked upon.
author: louise-findlay
date: 2020-07-30T00:00:00-12:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/simple-guide-to-using-apis-nodejs/hero.jpg
    alt: hero image using APIs
---
Have you always wanted to use data from an API (Application Programming Interface) but never knew how? This tutorial will guide you through how to work with your first API using [Node.js](https://nodejs.org) and [EJS](https://ejs.co) templating to create a dynamic web app. Don't worry if you've never used JSON before or know very little JavaScript, the guide is aimed at you.
<!--more-->

So you've created your [first NodeJS web app](/static-site-dynamic-nodejs-web-app/) but now you want to build on those skills by working with an API. Using your existing knowledge of EJS templating and Node.js, you will be able to work with the Goodreads API to be able to search for, list and return details about books.

**Note:** Don't already have a basic NodeJS web app deployed? Check out my [Converting a Static Site to a Dynamic NodeJS Web App tutorial](/static-site-dynamic-nodejs-web-app/) which will introduce you to full-stack development.

### Obtaining your API Keys

To be able to use the API, we first need to obtain some keys. This, among other things, allows the API provider to monitor your usage and ensure you are within their terms of services.

**Note:** Unfortunately as of 8th December 2020, the Goodreads APIs is being deprecated with no new API keys being issued so new developers cannot use it. However, this article is still useful as an in-depth beginner's guide to working with APIs since the process is similiar no matter which API you use. But if you're looking for a guide about an active API you can use in your next project, watch out for Getting to Grips with APIs - Using the Spotify API.

First, you need to have a Goodreads account. Register on the Goodreads [website](https://www.goodreads.com) if you haven't already done so.

Second, you need to register your app to get the key. Go to [goodreads.com/api/keys](https://www.goodreads.com/api/keys) and fill in the name of the app and the company name (which can just be your name.)

Don't worry about any of the optional fields. The only one you need to fill in is the callback URL for authentication, which we will cover in part 2.

Click the update app info button to submit the details. You should now see a key and secret which will be a long string of randomized numbers and letters. We will be adding these shortly into our server.js file so we can access the Goodreads API.

### Installing goodreads-api-node

Now that we have our API key and secret for the Goodreads API, we need to tell our server how to access the Goodreads APIs.

The easiest way to do this is to install an API wrapper. The one we will be using is called [goodreads-api-node](https://github.com/baahrens/goodreads-api-node). An API wrapper is code a developer has written to make it easier for us to use the API.

To install goodreads-api-node, type `npm install --save goodreads-api-node` in the terminal and press enter.

In your server.js file, add `const goodreads = require('goodreads-api-node');` underneath your other required node modules.

Now we need to add your API key and secret using the code below. It is highly advisable to store these elsewhere so they aren't stolen. One way of doing this is using **dotenv**, which I've done here.

(If you prefer to take the risk, simply replace `process.env.GOODREADS_KEY` and `process.env.GOODREADS_SECRET` with the key and secret you obtained from the Goodreads website.)

```js
const myCredentials = {
  key: 'process.env.GOODREADS_KEY',
  secret: 'process.env.GOODREADS_SECRET'
};

const gr = goodreads(myCredentials);
```

If you've added the code correctly, the start of your server.js file (before you've added any routes) should look like:

```js
// Node Modules
const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const goodreads = require('goodreads-api-node');
const app = express();

// Goodreads API - NodeJS
const myCredentials = {
    key: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};
const gr = goodreads(myCredentials);

// Initialising Express
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');
app.listen(8080);
console.log('Listening on 8080');
```

### Searching For A Book
The first piece of functionality we're going to create with the Goodreads API is searching for books. On the homepage, there will be a search bar where users will type in the name of a book or its author and they will see book covers of the results.

#### Displaying A Form

First, we need to add a form so users can type their query. So, in your `index.ejs` file add:

```html
<form action="/search" method="post">
            <input type="text" name="book" value="" placeholder="Book Title or Author">
            <input type="submit">
        </form>
```

This will POST the form to the /search route and append the value of the entered query to the URL. Next, we need to tell the server what to do with this request, which requires the body-parser node module and creating a search route.

#### Parsing the Submitted Form URL

To install body-parser, type `npm install body-parser --save` into the terminal and press enter. Add `const bodyParser = require('body-parser');` to your required node modules in server.js and add the following code after you've initialized Express:

```js
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
```

**Updated server.js Example**

```js
// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();
const goodreads = require('goodreads-api-node');
const app = express();

// Goodreads API - NodeJS
const myCredentials = {
    key: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};
const gr = goodreads(myCredentials);

// Initialising Express
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.listen(8080);
console.log('Listening on 8080');
```

### Adding A Goodreads API searchBooks() Function

To create the search route, add the following:

```js
// *** POST Routes ***

// Search Route
app.post('/search', function (req, res) {
    var bookquery = req.body.book;
    var booklist = gr.searchBooks({
        q: bookquery,
        page: 1,
        field: 'title'
    });
    booklist.then(function (result) {
        console.log(result);
    }).catch(function () {
        console.log("Goodreads Search Books Rejected");
    });
});
```

The **`bookquery`** variable parses the value of the book form field and plugs it into a **`searchBooks()`** function using the Goodreads API.

**`gr`** calls the goodreads-api-node module along with your API credentials.

Then the **`q`** defines the query (search term) to be used.

To speed up queries, Goodreads API uses pagination to split up results so you can choose which page you want returned using **`page`**.

Finally, **`field`** determines which parameter to search for, which in this case is title.

After the searchBooks function, there is a **`booklist.then`** function which is a promise. A [promise](https://hackernoon.com/exploring-differences-between-promises-and-callbacks-in-javascript-9m2a3uk0) is a way of ensuring code is run after a function has finished. This is important because otherwise, if you were returning a lot of data, code that requires that data may run before the data has been returned. The catch part of the promise refers to what will happen if the promise is rejected (i.e. fails).

After declaring it as a function, in the brackets is the variable, **`result`**. This stores the output of the booklist function, though you can rename the variable if you wish. In this example, we've used it in a `console.log()` so we can see what data has been returned.

####  Parsing Goodreads API searchBooks Data

Now that you've added a function to return the results of a book search, let's test it.

Go to localhost:8080 in your web browser, type the name of a book or author such as *The Serpent's Shadow* and click Submit Query.

Wait about five seconds (depending on how good your internet connection is) and back in the terminal you should have received a response similar to:

```json
{
  Request: {
    authentication: 'true',
    key: '(Your API Key)',
    method: 'search_index'
  },
  search: {
    query: "The Serpent's Shadow",
    'results-start': '1',
    'results-end': '20',
    'total-results': '33',
    source: 'Goodreads',
    'query-time-seconds': '0.07',
    results: { work: [Array] }
  }
}
```

This response tells us that we made a successful search request with the query of "The Serpent's Shadow". The displayed results were 1 to 20, though there were 33 in total. The source was Goodreads and the query on the server itself took 0.07 seconds.

However, the search results (the part of the response we want to return) are stored further down, so we will adjust our `console.log()` accordingly. Using trial and error with `console.log()` is a great way to understand how JSON and your chosen API works before wiring it up to your front-end code.

We can see from the response that the search results are stored in `search.results`. Since there can be up to 20 books returned from a search, this information is stored in an array called work (which is what Goodreads classifies as a book).

 Update your `console.log()` to `console.log(result.search.results.work);` and test again. This should return the specific book results. An example of the data for a book in the array is below:

```json
{
    id: { _: '16416771', type: 'integer' },
    books_count: { _: '92', type: 'integer' },
    ratings_count: { _: '117390', type: 'integer' },
    text_reviews_count: { _: '5244', type: 'integer' },
    original_publication_year: { _: '2012', type: 'integer' },
    original_publication_month: { _: '5', type: 'integer' },
    original_publication_day: { _: '1', type: 'integer' },
    average_rating: '4.29',
    best_book: {
        type: 'Book',
        id: [Object],
        title: "The Serpent's Shadow (The Kane Chronicles, #3)",
        author: [Object],
        image_url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1366227982l/12893742._SX98_.jpg',
        small_image_url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1366227982l/12893742._SY75_.jpg'
    }
},
```

### Displaying Book Information on the Front-End
Now that we can return an array of results from a book search, we want to display this information (such as the title of the book) so users can see it. We can do this through EJS templating.

First, you need to add a variable for `result.search.results.work` and then render a new page, including the variable you just created. The updated search route should look like:

```js
// Search Route
app.post('/search', function (req, res) {
    var bookquery = req.body.book;
    var booklist = gr.searchBooks({
        q: bookquery,
        page: 1,
        field: 'title'
    });
    booklist.then(function (result) {
        var bookresult = result.search.results.work;
        console.log(bookresult);
        res.render('pages/search-results', {
            bookresult: bookresult
        });
    }).catch(function () {
        console.log("Goodreads Search Books Rejected");
    });
});
```

Second, create a new EJS file called `search-results.ejs` in your `views/pages` folder and include your partials (such as head, header and footer) like usual.

Then between the main tags, add the following HTML:

```html
<% bookresult.forEach(function(book) { %>
            <h2><%= book.best_book.title %></h2>
            <% }); %>
```

This will take every book in the bookresult array (aka our search results) and render a `h2` tag containing its title.

### Creating Dynamic Book Pages
So far, we've created a search page with a form to search for books using the Goodreads API and a results page to display every title in the first page of results, but how do users find out more about those books? Finally, our last task is to dynamically create new book pages and link them to the results.

First, we need to create a new route to handle these book pages and use the `gr.showBook()` function to grab the detailed information for a single book.

```js
// Single Book Route
app.get('/book', function (req, res) {
    var bookid = gr.showBook(req.query.id);
    bookid.then(function (result) {
        var bookdetails = result.book;
        console.log(bookdetails);
        res.render('pages/book', {
            bookdetails: bookdetails
        });
    }).catch(function () {
            console.log("Book Search Rejected");
        });
});
```

There's only one issue. How do we append the book id to the URL so the API knows which book to get information for when a user clicks on a book title? The answer is a little bit of client-side JavaScript and HTML.

In search-results.ejs, surround the h2 tag with an `a` tag like this:

```html
<% bookresult.forEach(function(book) { %>
        <a id="<%= book.best_book.id._ %>" href="/book">
            <img class="book-result" src="<%= book.best_book.image_url %>">
            <% }); %>
        </a>
```

This will link every book title to the /book route we just created and add its Goodreads book id (required for the `gr.showBook` function) as an id attribute.

Now, if you haven't already, create a `script.js` file in your public/js folder and add a script tag in your head.ejs partial file. Add the following to your `script.js` file:

```js
// Append slash with book id, only if a book ID is not found in the link yet
    const booklinks = document.querySelectorAll('a[href*="/book"]');
    booklinks.forEach(function (el) {
        if (!el.href.includes('id=')) {
            el.href = el.href.replace(/\?.*$/, '') + '?id=' + el.getAttribute('id');
        }
    });
```

This will take every link with an `<a href="/book">` tag (i.e. every book title on the results page) and append `?id=` and the id of the tag (which in this case is the book id) which will allow our `gr.showBook()` function to grab the book id we want.

Finally, we just need to create a `book.ejs` to determine the content of the book pages. Between the main tags, add the following:

```html
<h3><%= bookdetails.title %></h3>
        <img src="<%= bookdetails.image_url %>">
        <h3><%= bookdetails.publication_year %></h3>
        <p><%= bookdetails.description %></p>
```

This will show the book title, year it is was published and the book description.

Congratulations, you've just worked with your first API using Node.js and EJS templating. Why not try it out? Search for a book and click on any of the titles. A new page will load with details of the result you clicked from the Goodreads API. 

Looking to deploy it to the web? Check out my [guide to deploying a Node.js web app using DigitalOcean](/deploying-nodejs-web-app)

### **Next Steps:**
If you're looking to expand, why not look at altering the book URL to include the title such as /book/booktitle. Want to access a user's owned books through their Goodreads account, check out [part 2](/simple-guide-to-using-apis-part2) which will teach you how to authenticate with the Goodreads API

Looking for more example code? Check out [LibraryTrackr](https://github.com/louisefindlay23/library-trackr), a NodeJS web app I'm developing aimed at solving library management (both print and eBook) for bibliophiles.

<section class="section-rich-text xs-pb-80 xs-pt-80">
  <div class="section-container">
    <div class="section-rich-text-inner prl-5">
      <a class="decoration-none" href="/modules/node-js/">
        <div class="cta-block-box relative xs-mt-10 xs-mb-50">
          <div class="cta-block-box-left-block absolute"></div>
          <div class="cta-block-box-left-stripes absolute"></div>
          <div class="cta-block-box-inner pa-5 cta-shadow">
            <h3 class="title-3" style="text-align: center;"><img src="/assets/images/blog/featured-images/Node.js_logo.png" width="150" style="margin: 0;"><br>Edge Hosting</h3>
            <p class="xs-mb-20">Section’s Node.js Edge Hosting empowers DevOps teams to run mission critical Node.js applications at the network edge for blazingly fast results with enterprise level AppSec protection.</p>
            <span class="link-with-arrow-blue text-blue text-18-medium">Learn more and get started on a free plan</span>
          </div>
          <div class="cta-block-box-right-block absolute"></div>
          <div class="cta-block-box-right-stripes absolute"></div>
        </div>
      </a>
    </div>
  </div>
</section>
