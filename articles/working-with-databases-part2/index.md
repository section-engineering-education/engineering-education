# Getting to Grips With Databases: Part 2 - Develop Your First Data-Driven Node.js Web App

You've created your first MongoDB database and now you want to use it on a website. How do you display its data on the web? How can users add, modify and delete data? The solution is to create a dynamic Node.js web app using the MongoDB node module.

**Note:** First time developing a Node.js web app or don't already have a database? Get started with [Node.js](Link to Converting a Static site article) and [databases](Link to Database Part 1).

## Connecting MongoDB Database to the Web App

First, we need to install the MongoDB node module so we can connect the local database we created in [part 1](Link to Part 1) to our web app **(server?)**.

In the terminal, type:

```bash
npm install mongo --save 
```
The install has been successful if `added 1 package`  appears.

Second, we need to add some code to our `server.js` file to tell our Express server where our database is and that it needs to use the MongoDB node module. 

Add the following to the start of your `server.js` file:

```js
// Database Connections
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/firstdb";
```
The `url` variable stores the location of the database you want to use. Change `firstdb` if you chose a different database name.

Finally, after `app.use()` in your `server.js` file, we will create a variable called `db` which we will use throughout `server.js` to connect to our database.

```js
var db;
// connecting variable db to database
MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    db = client.db('firstdb');
    app.listen(8080);
    console.log('Listening on 8080');
});
```
Again, if your database isn't called `firstdb`, you should change it accordingly.

So far, your `server.js` file should resemble:

```js
// Database Connections
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/firstdb";

// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

// Initialising Express
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// connecting variable db to database
var db;
MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    db = client.db('firstdb');
    app.listen(8080);
    console.log('Listening on 8080');
});

// *** GET Routes - display pages ***

// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});
```
## Creating a Table of Book Data

### Returning Data from a MongoDB Collection

Since we already have a database with data in it, the first thing you'll learn is how to display the data on a webpage.

Assuming you followed [Part 1](Link to Part 1), inside your `firstdb` database, there's a collection called `books` with several entries of containing `name` and `genre`. We'll add this data into a table and even make it pretty using some CSS from [CSSTricks](Link to CSSTricks table example.)

The first step is to add a books route. The books route will contain the code to search our database collection, then create an EJS variable of the results and finally render a new page with the variable.

Add the following to your `server.js`, below the root route:

```js
// Books Route
app.get('/books', function (req, res) {
    // Find data in books collection
    db.collection('books').find({}).toArray(function (err, result) {
        console.log("Book Collection: " + result);
    // Show books page
        res.render('pages/books');
    });
});
```
You'll notice the `db.collection('books').find({})` is similar to the `db.books.find()` command we did in Part 1 in the terminal. All Mongo Shell commands (i.e. terminal commands) can be used in Node.js only the syntax is a bit different. 

The `.toArray` part will convert the results into an Array because there will be multiple results.

We'll use the `console.log` command to see what's being returned from the database but first we'll need to add a `books.ejs` file for the route.

In your `views/pages` folder, add `books.ejs` with the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <%- include('../partials/head') %>
</head>
<body>
    <header>
        <%- include('../partials/header') %>
    </header>
    <main>
        <p>Our Book Database will be displayed here</p>
    </main>
    <footer>
        <%- include('../partials/footer') %>
    </footer>
</body>
</html>
```
We only need to add some basic HTML here so we can test. Once the correct data is returned from the database, we can add it to the EJS file.

Run `npm start` in the terminal and then go to `localhost:8080/books` in your browser.

Back in your terminal window, you should see `Book Collection: [object Object],[object Object],[object Object],[object Object]` which isn't very helpful. 

Because it's an array (containing multiple results) rather than a string, you'd have to loop through it (`forEach`) to see the data inside. A quicker solution however, is to convert it to a string for logging purposes.

Alter your `console.log` to `JSON.stringify` the result like so: `console.log("Book Collection:" + JSON.stringify(result));` and then rerun the app and navigate to the books page again.

The response should contain all the data you've added to the `books` collection.

**Books Collection `console.log` example**
```json
Book Collection:[{"_id":"5ed79cc24096aca107f150fc","name":"Harry Potter and the Chamber of Secrets","genre":"Fantasy"},{"_id":"5ed7a03df2223b53e6e0defe","name":"Slated","genre":"Sci-Fi"},{"_id":"5f269cdeb81a7a48f4618bf3","name":"The Novice","genre":"Taran Matharu"},{"_id":"5f269d45cacefe08bc94bcf1","name":"The Outcast","genre":"Taran Matharu"}]
```
### Displaying Data on the Front-End



### Styling a Table