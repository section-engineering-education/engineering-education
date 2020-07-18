# A Simple Guide to Using APIs with Node.js and EJS

**Alternative title: Getting to Grips with APIs: Using Node.js and EJS**

Always wanted to use data from an API (Application Programming Interface) but never knew how? This tutorial will guide you through how to work with your first API using Node.js **Link** and EJS **Link** templating to create a dynamic **(use full-stack instead?)** web app. Don't worry if you've never used JSON before or know very little JavaScript, the guide is aimed at you.

**(Excerpt ends)**

So you've created your [first NodeJS web app](**Link to Converting Static Site article**) but now you want to build on those skills by working with an API. Using your existing knowledge of EJS templating and Node.js, you will be able to work with the Goodreads API to be able to search for, list and return details about books.

**Note:** Don't already have a basic NodeJS web app deployed? Check out my [Converting a Static Site to a Dynamic NodeJS Web App tutorial](**Link to Section article**) which will introduce you to full-stack development.

## Obtaining your API Keys

To be able to use the API, we first need to obtain some keys. This allows the API provider to monitor your usage and ensure you are within their terms of services. 

First, you need to have a Goodreads account. Register on the Goodreads [website](https://www.goodreads.com) if you haven't already done so.

Second, you need to register your app to get the key. Go to [goodreads.com/api/keys](https://www.goodreads.com/api/keys) and fill in the name of the app and the company name (which can just be your name.) 

Don't worry about any of the optional fields. The only one you would need to fill in is the callback URL for authentication which we will cover in part 2. 

Click the update app info button to submit the details. You should now see a key and secret which will be a long string of randomised numbers and letters. We will be adding these shortly into our server.js file so we can access the Goodreads API.

## Installing goodreads-api-node

Now we have our API key and secret for the Goodreads API, we need to tell our server how to access the Goodreads APIs.

The easiest way to do this is to install an API wrapper. The one we will be using is called [goodreads-api-node](https://github.com/baahrens/goodreads-api-node). An API wrapper is code a developer has written to make it easier for us to use the API.

To install goodreads-api-node, type `npm install --save goodreads-api-node` in the terminal and press enter. 

In your server.js file, add `const goodreads = require('goodreads-api-node');` underneath your other required node modules.

Now we need to add your API key and secret using the code below. It is highly advisiable to store these elsewhere so they aren't stolen. One of way doing this is using dotenv which I've done. See **link to Section article which covers dotenv**. 

If you don't want to, replace `process.env.GOODREADS_KEY` and `process.env.GOODREADS_SECRET` which the key and secret you obtained from the Goodreads website.

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

## Searching For A Book

The first piece of functionality we're going to create with the Goodreads API is searching for books. On the homepage, there will be a searchbar where users will type in the name of a book or its author and they will see book covers of the results.

### Displaying A Form

First, we need to add a form so users can type their query so in your index.ejs file add:

```html
<form action="/search" method="post">
            <input type="text" name="book" value="" placeholder="Book Title or Author">
            <input type="submit">
        </form>
```
This will POST the form to the /search route and append the value of the book field to the URL but we need to tell the server what to do when a user is there which requires the body-parser node module and creating a search route.

### Parsing the Submitted Form URL

To install body-parser, type `npm install body-parser --save` into the terminal and press enter. Add `const bodyParser = require('body-parser');` to your required node modules in server.js and add the following code after you've initialised Express:

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
###  Adding A Goodreads API searchBooks Function

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
    });
});
```
The bookquery variable parses the value of the book form field and plugs it into a searchBooks function using the Goodreads API. 

gr calls the goodreads-api-node module along with your API credentials. 

Then the q defines the query (search term) to be used. 

To speed up queries, Goodreads API uses pagination to split up results so you can choose which page you want returned using page. 

Finally, field determines which parameter to search for which in this case is title.

After the searchBooks function, there is a `booklist.then` function which is a promise. A promise is **link to an article about Promises - is there a Section one** a way of ensuring code is run after a function has finished. This is important because otherwise, if you were returning a lot of data code that requires that data may run before the data has been returned. **Reword this to make more sense - maybe use API example - if GoodReads server was slow etc.**

After declaring it as a function, in the brackets is the variable, result. This stores the output of the booklist function though you can rename the variable if you wish. In this example, we've used it in a `console.log()` so we can see what data has been returned.

###  Parsing Goodreads API searchBooks Data

Now that you've added a function to return the results of a book search, let's test it.

Go to localhost:8080 in your web browser, type the name of a book or author such as The Serpent's Shadow and click Submit Query.

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
This response tells us I made a successful search request with the query of The Serpent's Shadow. The displayed results were 1 to 20 though there were 33 in total. The source was Goodreads and the query on the server itself took 0.07 seconds.

However, the search results (the part of the response we want to return) are stored further down so we will adjust our console.log accordingly. Using trial and error with console.logs is a great way to understand how JSON and your chosen API works.

We can see from the response the search results are stored in search.results. Since there can up to around 20 books returned from a search, this information is stored in an array called work (which is what Goodreads classifies as a book.)

 Update your console.log to `console.log(result.search.results.work);` and test again. This should return specifically the book results. An example of the data for a book in the array is below:

```json
[
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
## Displaying Book Information on the Front-End

Now that we can return an array of results from a book search, we want to display this information (such as the title of the book) so users can see it. We can do this through EJS templating.

First, you need to add a variable for `result.search.results.work` and then render a new page including the variable you just created. The updated search route should look like:

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
    });
});
```
Second, create a new EJS file called search-results.ejs in your views/pages folder and include your partials (such as head, header and footer) like usual. 

Then between the main tags, add the following HTML:

```html
<% bookresult.forEach(function(book) { %>
            <h2><%= book.best_book.title %></h2>
            <% }); %>
```
This will take every book in the bookresult array (aka our search results) and render a h2 tag containing its title. 
