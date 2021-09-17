---
layout: engineering-education
status: publish
published: true
url: /introduction-to-sequalize-orm-for-nodejs/
title: Introduction to Sequelize ORM for Node.js
description: In this tutorial, we will introduce Object Relational Mapper in Node.js called Sequelize. We will also learn to sequelize a simple database in Node.js.
author: oruko-pius
date: 2021-04-19T00:00:00-11:30
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-sequalize-orm-for-nodejs/hero.jpg
    alt: ORM example Image
---
Connecting an Object-relational Mapper (ORM) to a Node.js application is not an easy task for most developers, since there are no elaborate resources and/or documentation about it.
<!--more-->
Before we directly jump into ORM for Node.js, we could start with what is `sequelization`, then what is `ORM`, and what is the use of connecting ORM with Node.js.

`Sequelization` is the process of connecting a Node.js application to an Object Relational Mapper for better database synchronization.

An ORM is simply an Object Relational Mapper that helps in data manipulation and querying by the use of objects from the database. Using an `ORM` optimizes SQL queries making them easy to reuse and maintain.

|Table of contents                                                             |
|-------------------------                                                     |
|[Prerequisites](#prerequisites)                                               |
|[SQL database basics](#sql-database-basics)                                   |
|[Object Relational Mappers](#object-relational-mappersorm-nodejs-approaches)  |
|[Sequelize](#what-is-sequelize)                                               |
|[Benefits of Sequelize](#benefits-of-sequelize)                               |
|[Conclusion](#conclusion)                                                     |

### Prerequisites
To follow this article along the reader is supposed to have a good understanding of JavaScript and MySQL.

We first set up a new npm package as shown below:

```bash
npm init -y
```

We then install Sequelize as shown below:

```bash
npm install sequelize --save
```

It is available via `npm` and `yarn`. The `--save` makes the dependency available in our `package.json` file. You'll then have to install the driver of your preferred database, for example:

```bash
npm install pg pg-hstore --save
npm install mysql2 --save
npm install mariadb --save
npm install sqlite3 --save
npm install tedious --save
```

### SQL database basics
Let's brush up on our knowledge on SQL before we get to Sequelize.

Structured Query Language (SQL) is a language that allows us to interact with databases when performing database queries.

Pronunciation differs from `SQL` to `sequel` your choice. SQL only allows execution on relational databases.

SQL enables us to perform operations abbreviated as `CRUD`; Create Read Update and Delete.

To illustrate this we have two tables in our database `Employees`:

Table `lego_people`:

|name   |age    |
|-----  |----   |
|james  |34     |
|craig  |15     |
|paul   |67     |
|cynthia|55     |

Table `lego_height`:

|name   |cm     |
|-----  |----   |
|james  | 4     |
|craig  | 5     |
|paul   | 7     |
|cynthia| 5     |

So, we will insert sample data in the `lego_people` table using the `INSERT` query as shown below:

```sql
INSERT INTO lego_people(name, age)
VALUES ('Joe' ,12);
```

The `INSERT INTO` statement is used to create data in a database table. We pass in `name` and `age` as arguments to specify the properties that we want to add.

To read values from the `lego_people` table, we use the `SELECT` query as shown below:

```sql
SELECT name FROM lego_people;
```

The `name` represents the column name in the `lego_people` table.

To `update` a record in the `lego_height` table by making `paul` as `8cm` tall, we use `UPDATE` query:

```sql
UPDATE lego_height
SET name = 'paul', height = 8;
```

We can also perform a `delete` operation from the database. For example, let's delete `paul` altogether using the following command:

```sql
DELETE FROM lego_height
WHERE name = 'paul';
```

The `WHERE` clause specifies the data to be deleted.

If for instance, we wanted to have the records of both age and height in one table we would use a `LEFT JOIN` statement to combine both tables as shown below:

```sql
SELECT name, age FROM lego_people
LEFT JOIN lego_height USING (name);
```

This would result in this:

|name   |age   |cm    |
|-----  |----- |----- |
|james  |34    | 4    |
|craig  |15    | 5    |
|paul   |67    | 7    |
|cynthia|55    | 5    |

We have different types of `JOINS`, for more on that check out this [article](https://codingsight.com/everything-you-should-know-about-sql-server-joins/).

### Object Relational Mappers (ORM) Node.js approaches
Before we get started with Sequelize, let's understand what an ORM is and some of the supported ORMs in Node.js.

Object Relational Mapping is a simplified way of converting data between relational databases and objects.

Many times we encounter scenarios where we have to write complex SQL query statements to perform CRUD operations from a database. 

Worse enough, we still need to convert data from the database into an object that is compatible with our language of choice, as we will see in the next chapter. It additionally simplifies the manipulation of database engines whenever the need arises.

So how does ORMs work, well first, we start by choosing the right database you want to use. Then, decide on the Object Relational Mapper that would work efficiently with the database, and install it. Since we're using Node.js, we'll consider Sequelize.

Second, we create a database model. This represents the structure of our database.

Database models provide the advantage of scalability, efficiency. The structure defined in the model includes tables, database collection, columns. We then connect our database.

The types of Object Relational Mappers with Node.js support are:
- `Sequelize` which has support for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server databases.
- `Caminte` supports a large number of databases such as MySQL Sqlite3, Riak, Postgres, CouchDB, MongoDB, Redis. 
- `Node-ORM` has support for MySQL, SQLite, and PostgreSQL.

For more on ORMs, you can check out this [documentation](https://www.npmjs.com/search?q=object%20relational%20mapper).

### What is Sequelize?
Sequelize is an open-source Node.js module that enables JavaScript developers to work with relational databases more easily, including but limited to MySQL, Postgres.

Chances are that you're working with relational databases already, when you are doing something like this:

```js
// create a database table
CREATE TABLE articles(
    id          INT AUTO_INCREMENT,
    title       NVARCHAR(100) NOT NULL,
    body        NVARCHAR(100) NOT NULL,
    submittedAt DATETIME      NOT NULL
);

// instantiate mysql
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "demo_schema"
});
connection.connect();

// query sql statements
const query = "SELECT `id`, `title`, `content`, `submittedAt` \
FROM 'articles' WHERE `articles`.`id` = ?";
connection.query(query, 5, function(error, article){
    console.log(article);
});
```

You're writing a separate script to create tables that define associations between them, then you're embedding SQL queries in your JavaScript using a low-level adapter to execute those queries against your database.

Low-level adapters are database modules for interfacing with SQL servers. They include `pg`, `jdbc-postgres` for interfacing `PostgreSQL` with various programming languages.

JavaScript does not support multi-line strings very well. For instance, in our case we're ending the first line of the string with a backslash. 

Even if it did support it, switching between JavaScript and SQL is just unpleasant. This contributes to a lot of junk code and little business logic which are not easy to maintain.

On the other hand, using sequelize you can avoid writing SQL queries altogether. 

Let's have a look at this code snippet:

```js
// instantiate sequelize
const Sequelize = require('sequelize');

// connect db
const connection = new Sequelize("db name", "username", "password");

// define article model
const Article = connection.define("article", {
    title: Sequelize.String,
    content: Sequelize.String
});
connection.sync();
```

First, we instantiate Sequelize and define our database connection parameters. Instead of writing a separate SQL file containing SQL code to generate tables, we define what is referred to as models. 

For example, in our case, `article` is our model and we define two attributes: `title` and `content`.

Using the `sync()` function, Sequelize will look at all the models you've defined and then generate SQL queries that will in turn create associated tables.

Then, when we're ready to query the data instead of embedding the SQL, we just use the Sequelize friendly API.

For example, in the snippet below instead of using a query, we're simply writing `findById()` and then specifying the ID of the article which is `5` in our case improving its readability.

```js
// instantiate sequelize
const Sequelize = require('sequelize');

// connect db
const connection = new Sequelize("db name", "username", "password");

// define article model
const Article = connection.define("article", {
    title: Sequelize.String,
    content: Sequelize.String
});
connection.sync();

// query using sequelize API
Article.findById(5).then(function (article) {
    console.log(article);
})
```

Using Sequelize helps us have less craft, less boilerplate ultimately making our code easier to read, maintain, and extend.

### Benefits of Sequelize
In general, the benefits of Sequelize and Object Relational Mappers are:
- Sequelize allow us to write less code.
- Enable us to write more consistent code.
- You can mostly avoid SQL queries.
- Sequelize abstracts the database engine.
- Good tooling for migrations.

### Conclusion
In general, it mainly depends on the type of database you're using that will influence your decision on choosing an ORM for your Node.js application. 

In this article, we covered why Sequelize seems the best option when compared to the already existing ones.

For more reference on Sequelize, be sure to check their [documentation](https://sequelize.org/master/manual/getting-started.html) for more clarity.

Happy Coding :>)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)