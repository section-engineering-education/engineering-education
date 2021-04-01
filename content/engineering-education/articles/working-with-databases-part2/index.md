---
layout: engineering-education
status: publish
published: true
url: /engineering-education/working-with-databases-part2/
title: Develop Your First Data-Driven Node.js Web App
description: How to use Node.js, EJS and the MongoDB node module to add, modify and delete data in a MongoDB collection using a book databases as an example.
author: louise-findlay
date: 2020-08-04T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-databases-part2/hero.jpg
    alt: databases example images books
---
You've created your first MongoDB database and now you want to use it on a website. How do you display its data on the web? How can users add, modify and delete data? The solution is to create a dynamic Node.js web app using the MongoDB node module.

**Note:** First time developing a Node.js web app or don't already have a database? Get started with [Node.js](/engineering-education/static-site-dynamic-nodejs-web-app/) and [databases](/engineering-education/working-with-databases-part1/).
<!--more-->
### Connecting MongoDB Database to the Web App
First, we need to install the MongoDB node module so we can connect the local database we created in [part 1](/engineering-education/working-with-databases-part1/) to our web app.

In the terminal, type:

```bash
npm install mongo --save
```
The install has been successful if `added 1 package` appears.

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
### Creating a Table of Book Data

#### Returning Data from a MongoDB Collection

Since we already have a database with data in it, the first thing you'll learn is how to display the data on a webpage.

Assuming you followed [Part 1](/engineering-education/working-with-databases-part1/), inside your `firstdb` database, there's a collection called `books` with several entries containing `name` and `genre`. We'll add this data into a table and even make it pretty using some CSS from [CSSTricks](https://css-tricks.com/complete-guide-table-element).

The first step is to add a books route. The books route will contain the code to search our database collection, then create an EJS variable of the results, and finally render a new page with the variable.

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
You'll notice the `db.collection('books').find({})` is similar to the `db.books.find()` command we did in Part 1 in the terminal. All Mongo Shell commands (i.e. terminal commands) can be used in Node.js, only the syntax is a bit different.

The `.toArray` part will convert the results into an Array because there will be multiple results.

We'll use the `console.log` command to see what's being returned from the database, but first we'll need to add a `books.ejs` file for the route.

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

Because it's an array (containing multiple results), rather than a string, you'd have to loop through it (`forEach`) to see the data inside. A quicker solution, however, is to convert it to a string for logging purposes.

Alter your `console.log` to `JSON.stringify` the result like so: `console.log("Book Collection:" + JSON.stringify(result));` and then rerun the app and navigate to the books page again.

The response should contain all the data you've added to the `books` collection.

**Books Collection `console.log` example**
```json
Book Collection:[
    {"_id":"5ed79cc24096aca107f150fc","name":"Harry Potter and the Chamber of Secrets","genre":"Fantasy"},
    {"_id":"5ed7a03df2223b53e6e0defe","name":"Slated","genre":"Sci-Fi"},
    {"_id":"5f269cdeb81a7a48f4618bf3","name":"The Novice","genre":"Fantasy"},
    {"_id":"5f269d45cacefe08bc94bcf1","name":"The Outcast","genre":"Fantasy"}
]
```
### Displaying Data on the Front-End

Congratulations! You've successfully returned data from a MongoDB collection using a Node.js server for the first time. Now, we just need to display it on the front-end.

Still in `server.js`, adjust our `res.render` to pass the database results to the front-end as an EJS variable.

```js
// Show books page
    res.render('pages/books', {
            bookdetails: result
        });
```
Now in `books.ejs`, add the following between the `<main></main>` tags.

```html
<table>
  <% bookdetails.forEach(function(book) { %>
    <th><h3>Name</h3></th>
    <th><h3>Genre</h3></th>
    <tbody>
      <tr>
        <td>
          <p><%= book.name %></p>
        </td>
        <td>
          <p><%= book.genre %></p>
        </td>
      </tr>
    </tbody>
  <% }); %>
</table>
```
This will create a table with two table headings: name and genre. Then for every entry in the array (books collection), a new row will be added with two cells. One for the entry's name and the other for its genre.

Run `npm start` again and go to the books page. You should see the table and the data inside.

### Styling a Table

You've got a table with your book data inside, which is great, but it doesn't look very nice. Luckily [CSSTricks](https://css-tricks.com/complete-guide-table-element) has come to the rescue with a few code snippets of CSS for tables.

In your CSS file (create one at `public/css` if you haven't already), and add the following:

```css
/* Table Styling from CSSTricks*/
table {
    width: 50%;
    margin: 25px auto;
    border-collapse: collapse;
    border: 1px solid #eee;
    border-bottom: 2px solid #ffd633;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.05), 0px 20px 20px rgba(0, 0, 0, 0.05), 0px 30px 20px rgba(0, 0, 0, 0.05);
}
table tr:hover {
    background: #f4f4f4;
}
table tr:hover td {
    color: #555;
}
table th, table td {
    color: #999;
    border: 1px solid #eee;
    padding: 5px 10px;
    border-collapse: collapse;
}
table th {
    background: #ffd633;
    color: #fff;
    text-transform: uppercase;
    font-size: 14px;
}
table td {
    padding: 15px 10px;
}
table p {
    text-align: center;
}
```
I adjusted the size of the table by adding a width and changing the padding of the cells, etc. to suit the length of the content. I also modified the accent colour to suit the app, so feel free to alter the CSS to fit your styling.

Reload the app using `npm start` and go back to the books page and the table should look a lot nicer.

### Modifying a MongoDB Collection from the Web App
Currently, we've only used data that we added to the database in the terminal but the average user shouldn't have to clone our web app and set up a local database to do the same. Let's create a form which users can use to add, delete or update book entries in our database.

Before we create a form or add a route to add, delete or modify database entries, we need to install a node module to grab the form queries from the submitted form URL.

Type `npm install body-parser --save` to do so, and then add `const bodyParser = require('body-parser');` to `server.js` underneath our other required node modules. We also need to include the following before `app.use()` to tell Express how to use the `body-parser` node module:

```js
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
```
Your `server.js` file should look like this so far:

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

// body-parser config
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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

// Books Route
app.get('/books', function (req, res) {
    // Find data in books collection
    db.collection('books').find({}).toArray(function (err, result) {
        // Turn array into a JSON string for logging
        console.log("Book Collection: " + JSON.stringify(result));
    // Show books page
    res.render('pages/books', {
            bookdetails: result
        });
    });
});
```

### Adding Data to a MongoDB Collection Using a Form

To allow users to add data to our database collection, we first need to create a form. The user will then type in the book's name and genre that they want to add and click the submit button.

Add the following HTML to your `index.ejs` file:

```html
<form id="addbook" action="/add" method="post">
    <input type="text" id="input-name" name="name" placeholder="Book Title">
    <label for="input-name">Book Name</label>
    <input type="text" id="input-genre" name="genre" placeholder="Book Genre">
    <label for="input-genre">Book Genre</label>
    <button type="submit" value="Add">Add
    </button>
</form>
```
The form action specifies what to do after submitting the form. In this case, it will go to the /add route which we will proceed to create. The method is set to POST because /add will be a POST route because we are POSTing data from the form.

**Note:** Label is an important tag to use in forms for accessibility reasons. They label input tags using the for attribute which associates itself with the corresponding input tag id.

Finally, we can create the /add route. In `server.js`, add the following at the end of the file:

```js
// *** POST Routes ***

// Add Route
app.post('/add', function (req, res) {
    // Get details from the form
    var bookname = req.body.name;
    var bookgenre = req.body.genre;
    // Format book details into JSON
    var bookdetails = { "name": bookname, "genre": bookgenre };
    // Add book details to book collection
    db.collection('books').insertOne(bookdetails, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect('/books');
    });
});
```
`req.body.name and req.body.genre`, grabs the value of the name and genre inputs from the submitted form URL. Then the `bookdetails` variable formats the data into JSON so MongoDB can understand it. Finally, `db.collection('books').insertOne` inserts our `bookdetails` entry into our books collection and then redirects the user to /books so they can see the updated list of books.

Run `npm start` and type the name of a book and its genre into the form and click the Add button to try it out for yourself.

### Deleting Data from a MongoDB Collection Using a Form
Congratulations, you've successfully created a form where users can type in their query; it's added to a local MongoDB database and a table is updated with the new information.

You'll find that creating a form to delete data is a very similar process. Create a new form but instead of having two input fields for book name and genre, just add one for the name. Then modify the action value to a new route called /delete. See the example below:

```html
<form id="deletebook" action="/delete" method="post">
    <input type="text" id="input-name" name="name" placeholder="Book Title">
    <label for="input-name">Book Name</label>
    <button type="submit" value="Delete">
    Delete
    </button>
</form>
```
In `server.js`, add a new route for /delete:

```js
// Delete Route
app.post('/delete', function (req, res) {
    // Get details from the form
    var bookname = req.body.name;
    // Format book details into JSON
    var bookdetails = { "name": bookname };
    // Add book details to book collection
    db.collection('books').deleteOne(bookdetails, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect('/books');
    });
});
```
As you can see, it's almost identical to the previous one you created for /add. The only difference is that you're deleting an entry, instead of inserting one, and you're only getting the value of one input field.

Test the new form out using `npm start` to make sure it works for you.

### Modifying Data from a MongoDB Collection Using a Form
The last form (and piece of functionality) we'll create is for modifying data. What if one of your users made a typo and wants to correct it?

Add a new form with two inputs like so:

```html
<form id="editbook" action="/edit" method="post">
    <input type="text" id="input-editname" name="editname" placeholder="Old Book Name">
    <input type="text" id="input-newname" name="newname" placeholder="New Book Name">
    <button type="submit" value="Edit">
    Edit
    </button>
</form>
```
Finally, in `server.js` add:

```js
// Edit Route
app.post('/edit', function (req, res) {
    // Get details from the form
    var oldbook = req.body.editname;
    var newbook = req.body.newname;
    // Format book details into JSON
    var bookquery = { "name": oldbook };
    var newbookquery = { $set: {name: newbook } };
    // Add book details to book collection
    db.collection('books').updateOne(bookquery, newbookquery, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect('/books');
    });
});
```
**Note:** the syntax for updating data is different than adding or deleting. `$set` tells MongoDB the query that should be updated and `updateOne` takes two variables rather the one: the old data to be updated and the new data that should replace it.

Congratulations, you've developed your first data-driven web app using Node.js and MongoDB. Looking to develop your book database further, improve the design or check out example code? Check out the [Github Repo](https://github.com/louisefindlay23/bookdatabase). Want to show off your first data driven web app to users? Learn how to [deploy a Node.js web app using DigitalOcean](/engineering-education/deploying-nodejs-web-app).
