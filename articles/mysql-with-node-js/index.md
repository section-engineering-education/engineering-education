If you are new to MySQL with Node.js, this guide will help you learn the basics and what you need to get started with MySQL using Node.js.

### Prerequisites
To get along with this guide, you need;

- Basic knowledge of how to [write SQL queries](https://www.w3schools.com/sql/).
- Basic understanding of [Node.js](https://www.w3schools.com/nodejs/nodejs_get_started.asp).

### Background
MySQL is a fast and easy to use Relational Database Management System(RDBMS). DBMS is a collection of systems that allows us to access the relational database and manipulate data. It is written in C and C++. MySQL is based on Structured Query Language (SQL) that interact with relational databases.

Here are remarkable reasons why you should use MySQL.
- It an open-source database and scalable. It is suitable for both small and large applications.
- MySQL is very powerful, and it can handle a large set of functionality.
- It supports numerous operating systems and a wide list of programming languages such as JavaScript, PHP, JAVA, etc.
- It has an excellent performance in terms of speed.
- MySQL is secure and efficient to use.

### Setting up the MySQL server
Whenever working with MySQL, you first need a MySQL development server and MySQL workbench to host and manage databases.

#### MySQL Windows Installation
- Download [MySQL Installer](https://dev.mysql.com/downloads/installer/) for Windows. Double click the installer file to start the installation.

- Choose the setup type to install, as shown in the screenshot below.

![](/engineering-education/mysql-with-node-js/start-installation.jpg)

- Click next without changing the default settings. This will install the MySQL products provided by the installation catalog.

![](/engineering-education/mysql-with-node-js/install-setups.jpg)

- Click next until prompted to provide MySQL root password. Enter a password that you can remember. The password will be used to establish a connection to your MySQL server.

![](/engineering-education/mysql-with-node-js/password.jpg)

- The server is set, and now you need to check if the server is working by providing the password you provided above.

![](/engineering-education/mysql-with-node-js/server-test.jpg)

- This confirms that the server is up and running.

![](/engineering-education/mysql-with-node-js/server-running.jpg)

- Everything is set. Click `Finish` to complete the installation process.

![](/engineering-education/mysql-with-node-js/finish-installation.jpg)

- This will automatically launch MySQL workbench.

![](/engineering-education/mysql-with-node-js/start-mysql-workbench.png)

- MySQL workbench has a server already set with the password that we provided.

![](/engineering-education/mysql-with-node-js/server-ready.png)

- Under MySQL connections, click the connection as highlighted in the screenshot above. You will be prompted to enter the root password set previously.

![](/engineering-education/mysql-with-node-js/password.png)

Check MySQL [Mac](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation-pkg.html) and [Ubuntu](https://www.mysqltutorial.org/install-mysql-ubuntu/) Installations.

Other options that will work include using [wamp](https://www.wampserver.com/en/) and [xampp](https://www.apachefriends.org/index.html). They both run a Database Management System (DBMS) using apache.

### Setting up Node.js
Since we are using Node.js, you need it installed on your computer. Download it [here](https://nodejs.org/en/).

Once installed, create a project folder and initialize the project with `npm init -y`. Here’s a [guide](/engineering-education/beginner-guide-to-npm) that will help you understand NPM in detail.

To connect Node.js with an SQL database, you need the MySQL package installed.

Run `npm install mysql` to install the package. Create a `.js` file to work on, for example, `app.js`.

### Creating a connection to MySQL server
Before carrying out any database operation, you first need to create a connection to the MySQL server.

In just a few steps below, and you have a connection to the database established.

- Import MySQL using the `require()` function.

```js
let mysql = require("mysql");
```

- Create a connection object with `createConnection()`.

The object specifies your database server's details, such as password, username, and host. In this case, I am using the default values provided by the MySQL server.

```js
let dbconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    //MySQL root password
    password: "",
});
```

- Establishing a connection to the server.

To make a connection, use the variable `dbconnection` we have created above and call the `connect()` function.

```js
dbconnection.connect((err) => {
    //check connection errors
    if (err) {
        return console.error("ERROR: " + err.message);
    }
    // execute queries related to the database after a successful connection
    console.log("connection established...");
});
```

The `connect()` function allows us to execute the database queries whenever a connection to the server is established. If a connection was not successful, the server would log an error that describes what went wrong while establishing the connection.

Run `node app.js` to check if the connection is established.

![](/engineering-education/mysql-with-node-js/connection-established.png)

If you run into an error close to the one shown below.

![](/engineering-education/mysql-with-node-js/error.jpg)

Follow [the following steps](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server).

- Run the following query in MySQL Workbench.

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
```

Where `root` is the user, `localhost` is the URL and `password` is the password. In this case, the password you provided earlier will be overridden, and thus your new password will be `password`.

- Run `flush privileges` to refresh privileges.

We need to create a database that will be queried by the connection we have created.

### Creating a database
We need to create a database that we will store our information. Create a function `createDB()`. We will use this function to create a new database. After making a successful connection, call the function `createDB()` as shown below.

```js
let mysql = require("mysql");
let dbconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

//check connection errors
dbconnection.connect((err) => {
    if (err) {
        return console.error("ERROR: " + err.message);
    }
    // call createDB() after the connection is established
    createDB();
});

function createDB() {
    let sqlQuery = "CREATE DATABASE IF NOT EXISTS Company";
    dbconnection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log("Database created...");
    });
}
```

Calling `createDB()` will create a new database named `Company`, if it does not exist.

Run `node app.js`.

![](/engineering-education/mysql-with-node-js/db-created.png)

Go ahead and check that, and indeed, a database was successfully created.

![](/engineering-education/mysql-with-node-js/database-created.jpg)

Now that we have a database, we need to specify that inside `createConnection()` as shown below.

```js
host: "localhost",
user: "root",
password: ""
// include the database we have just created
database: "Company"
```

### Creating a table and adding rows
Next on, we need to add a table and rows to our database. Instead of manually creating tables and rows, let's write some codes that will create a table and automatically insert some rows.

A relational database comprises tables of related data. Data in a table is stored in rows and columns. Rows specify an entry recorded in a table. Columns hold data of the same kind, for example, first names.

To get a visual of a database table representation, think of an ordinary table with some data. In this case, each column of this table has a specific data type, and each row is a record of that table.

Back to Node.js. Let's create a table with some rows in it.

Again remember relational databases uses SQL queries to execute a command to a database.

[For example](https://www.mysqltutorial.org/mysql-change-storage-engine);

```sql
CREATE TABLE `offices` (
  `officeCode` int(11) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `postalCode` varchar(15) NOT NULL,
  `territory` varchar(10) NOT NULL,
  PRIMARY KEY (`officeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

We will be using such queries alongside Node.js to perform the operations we want within the database we've created.

```js
let mysql = require("mysql");
let dbconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Company"
});

//check connection errors
dbconnection.connect((err) => {
    if (err) {
        return console.error("ERROR: " + err.message);
    }

    // call createTableOffices() after the connection is established
    createTableOffices();
});

function createTableOffices() {
    //Sets up the Database Table and Rows
    const createTable = `CREATE TABLE IF NOT EXISTS offices( officeCode int AUTO_INCREMENT,city varchar(50) NOT NULL,
  phone varchar(50) NOT NULL,
  addressLine1 varchar(50) NOT NULL,
  addressLine2 varchar(50) DEFAULT NULL,
  state varchar(50) DEFAULT NULL,
  country varchar(50) NOT NULL,
  postalCode varchar(15) NOT NULL,
  territory varchar(10) NOT NULL,
  PRIMARY KEY (officeCode))`;

    //Execute tables creation query
    dbconnection.query(createTable, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Table and rows created...");
    });
}
```

Call `createTableOffices()` after the connection is established and run `node app.js` to execute the query. You may need to refresh the MySQL workbench to reflect the changes.

![](/engineering-education/mysql-with-node-js/refresh.jpg)

![](/engineering-education/mysql-with-node-js/table-and-rows-created.jpg)

In the above code;

We've created a table called `offices`. We included several rows.

An `officeCode` set to auto-increment. Every time we insert a record in this table, the `officeCode` will auto-increment without specifying that during the data insertion.

When working with relational databases, you need to specify a primary key in each table. A primary key is a unique value found in every record. The primary key forms a column in a table, and each table has only one primary key. The choice of a primary key depends on the table preference to meet the users' preferences.

For example, uber drivers can uniquely be identified with their driver's licenses.

When executing such SQL queries, remember to set the correct data types such as integers, varchar, date, or time to enhance data consistency.

### Inserting into a database.
We have a table and rows set. It's time to insert some data into our table. Inserting into a table involves specifying the data to insert into the rows.

```js
function insertOffices() {
    let office = {
        city: "San Francisco",
        phone: "+1 650 219 4782",
        addressLine1: "100 Market Street",
        addressLine2: "Suite 300",
        state: "CA",
        country: "USA",
        postalCode: "94080",
        territory: "America",
    };
    let sqlQuery = "INSERT INTO offices SET ?";
    let query = dbconnection.query(sqlQuery, office, (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log("an office added...");
    });
}
```

We specify the data we want to insert. Performing an insertion command, specify the row name followed by the data you want to insert.

Call `insertOffices()` after the connection is established and run `node app.js` to execute the query.

Go back to MySQL workbench. Hover over the office table and click the small icon on the far end to open the table and view the row you have inserted.

![](/engineering-education/mysql-with-node-js/open-table.jpg)

![](/engineering-education/mysql-with-node-js/view-table-rows.jpg)

Try inserting another office record.

```js
function insertOffices() {
    let office = {
        city: "NYC",
        phone: "+1 212 555 3000",
        addressLine1: "523 East 53rd Street",
        addressLine2: "",
        state: "NY",
        country: "USA",
        postalCode: "9401002280",
        territory: "America",
    };

    let sqlQuery = "INSERT INTO offices SET ?";
    let query = dbconnection.query(sqlQuery, office, (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log("an office added...");
    });
}
```

`addressLine2` is set to null. Meaning there is an instance that the column will be null. You need to specify that with "". Otherwise, the program will throw an error.

Go ahead and try adding more offices to the `offices` table.

![](/engineering-education/mysql-with-node-js/add-more-rows.jpg)

### Fetching from a database
Fetching data allows displaying data to the end-users.

To fetch from a database, specify a select operation while specifying the rows you want to display. Let's do that from the data we have inserted.

There are several ways you can use select to fetch data from a table.
- To select all rows from the table, specify wildcards as shown below.

```js
function showOffices() {
    let sqlQuery = `SELECT * FROM offices`;
    let query = dbconnection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log("fetched:");
    });
}
```

- When selecting, you can opt to fetch specific columns using a where clause. It allows you to select the rows and columns that you need by meeting particular conditions.

```js
let sqlQuery = `SELECT officeCode, phone, state, postalCode, territory FROM offices WHERE country ="USA"`;
```

- You can order your section depending on the columns you have in a table.

```js
let sqlQuery = `SELECT * FROM offices ORDER BY officeCode DESC`;
```

- When you want to select a specific number of records, LIMIT will help you return the numbers of records you wish to display.

```js
let sqlQuery = `SELECT * FROM offices LIMIT 3`;
```

- And you can combine them all in one selection.

```js
let sqlQuery = `SELECT officeCode, phone, state, postalCode, territory FROM offices WHERE country="USA" ORDER BY officeCode DESC LIMIT 2`;
```

Now you get how to write the SQL queries using Node.js. I want to introduce Express.

***[Express](http://expressjs.com/en/starter/installing.html) is a fast, unopinionated, minimalist web framework for Node.js with various HTTP utility methods and middleware at your disposal.***

Check this [guide](/engineering-education/express/) to get started with Express.

Web services are based on HTTP requests and responses. When building a web application, you want to capture responses based on a server request. Usually, you want to get server responses and initiate an interaction between the server and a database. With a few examples, we will demonstrate how to create an Express server to communicate with the MySQL server to manage and manipulate our database information.

You may need [Nodemon](https://www.npmjs.com/package/nodemon). It is an optional package Installed globally. It helps automatically restart the server every time after saving any changes made in a file. Check this [guide](https://www.npmjs.com/package/nodemon) to learn more about Nodemon.

```bash
npm install -g nodemon
```

Go ahead and install Express.

```bash
npm install express
```

Creates a file `server.js` import MySQL and express using the `require()` function.

```js
let express = require("express");
let mysql = require("mysql");
```

Set a simple express server.

```js
let express = require("express");
let mysql = require("mysql");
let app = express();

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});
```

Run `nodemon` to start the server—type `localhost:3000` in your browser. If you get `Cannot GET /`, you are good to go.

Create routes to run the SQL queries. For our server to start communicating with the database, we need to create a database connection, as we explained above.

```js
let express = require("express");
let mysql = require("mysql");
let app = express();
let dbconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Company",
});

dbconnection.connect((err) => {
    if (err) {
        return console.error("ERROR: " + err.message);
    }
});
app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});
```

### Making a selection from the server
We have already done a couple of selects. In this example, I want the select offices base on the `officeCode`. To do this, we will create and set a route and specify the `officeCode` of the office we want to select.

```js
let express = require("express");
let mysql = require("mysql");
let app = express();
let dbconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Company",
});

dbconnection.connect((err) => {
    if (err) {
        return console.error("ERROR: " + err.message);
    }
});

app.get("/offices/:officeCode", (req, res) => {
    let sqlQuery = `SELECT * FROM offices WHERE officeCode = ${req.params.officeCode}`;
    const querry = dbconnection.query(sqlQuery, (err, result, fields) => {
        if (!err) res.send(result);
        else console.log(err);
    });
});

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});
```

Open `localhost:3000/offices/1` to get the result, where `1` is the officeCode representing the office we want to select.

We specify the `officeCode` while making a request to the server. The server returns a response equal to the request we sent.  the server communicates with the database. The server will return the database results where the `officeCode` is equal to the `officeCode` we specified.

### Updating
The next thing we are going to do is update or change specifies values in our table.

When managing data, at times, you need to change some data information. With the relation database, an update command allows you to change and update specific row's values and update it with the news values.

Let's see that with an example.

```js
// Update office
app.get("/updateoffice/:officeCode", (req, res) => {
    let newaddressLine = "25 Old Broad Street";
    let newState = "WD";
    let sqlQuery = `UPDATE offices SET 
    addressLine1 = '${newaddressLine}',state = '${newState}' WHERE officeCode = ${req.params.officeCode}`;
    let query = dbconnection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("office updated...");
    });
});
```

Open `localhost:3000/updateoffice/1` to get the results.

Open the offices' table to confirm changes.

![](/engineering-education/mysql-with-node-js/fields-updated.jpg)

SQL uses a set command to tell a MySQL server which values to update by setting the updating values. The `SET` value is followed by a `WHERE` condition to match the record we want to update.

### Deleting
Perhaps you want to delete one or multiple records in a database. `DELETE` command is available to do this while observing some condition from where a deletion should be performed.

```js
// Delete office
app.get("/deleteoffice/:id", (req, res) => {
    let sqlQuery = `DELETE FROM offices WHERE id = ${req.params.id}`;
    let query = dbconnection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("An office deleted...");
    });
});
```

Open `localhost:3000/deleteoffice/1` to get the results.

Open the offices' table to confirm changes.

![](/engineering-education/mysql-with-node-js/office-deleted.jpg)

### Closing the connection
Once the queries are executed, you need to close/terminate the connection. This ensures that all queries are executed and send the quit packet to the MySQL server.

There are methods to close a MySQL database connection.

- Using a `end()` function.

`end()` terminated a connection when the queued queries finish execution before sending a `COM_QUIT` message to the server.

```js
dbconnection.end((err) => {
  // The connection is terminated now
});
```

If an error occurs, the error result is sent to a callback, and the connection is terminated.

- Using `destroy()`.

When called, it closes all the connections without waiting for an executing query to finish.

```js
dbconnection.destroy();
```

### Connection pooling
It is a concept that creates multiple connections to executes the queries parallel. In our examples, we've used `createConnection()`, which creates a connection once. Whenever executing another query, a connection to the server has to be established again.

With `createPool()`, a new connection doesn't have to be established multiple times, as a connection is created in a pool.

Connection pooling comes into play when an application has, for example, many users. Execution happens parallel. It maintains a cache of database connections for executing queries. This saves the time and resources needed to create a new connection for each user.
Here is a basic example of connection pooling.

```js
const {createPool} = require("mysql");

// create pool connection
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "Company",
    connectionLimit: 10,
});

//execute query
pool.query(`select * from offices`, (err, result, fields) => {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
});
```

This creates multiple connections to execute the queries parallel. A new connection doesn't have to be established, as a connection is created in a pool.

I hope this guide helps get you started writing SQL queries and executing them within the Node.js application.

### Related Topics and Additional Resources
[Introduction to Express.js](/engineering-education/express/)
[Understanding HTTP Requests in Node.js](/engineering-education/http-requests-nodejs/)
[An Absolute Beginner Guide to Node Package Manager](/engineering-education/beginner-guide-to-npm/)
[Develop Your First Data-Driven  Web App Using  MongoDB database and Node.js](/engineering-education/working-with-databases-part2/)
[Getting to Grips with MongoDB Database](/engineering-education/working-with-databases-part1/)