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
```