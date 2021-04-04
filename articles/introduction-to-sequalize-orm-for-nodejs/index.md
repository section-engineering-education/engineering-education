### Introduction to Sequalize ORM for Node.js
![hero image](/engineering-education/introduction-to-sequalize-orm-for-nodejs/hero.jpg)

### Introduction
In this article we will have an introductory on SQL database basics, a deep look into Object Relational Mappers, their types, and why one should choose Sequalize over any other existing ORMs with Node.js support, an outlook of what Sequalize is, its basic setup. We will not dive into though into how Sequalize ORM integrates with a Nodejs application. Let us save that for a future tutorial.

### Prerequisites
We first set up a new npm package:

```bash
npm init -y
```

We then install Sequalize:

```bash
npm install sequalize --save
```

It is available via `npm` and `yarn`. The `--save` makes the dependency available in our `package.json` file. You'll then have to install the driver of your preferred database, for example:

```bash
npm install pg pg-hstore --save
npm install mysql2 --save
npm install mariadb --save
npm install sqlite3 --save
npm install tedious --save
```

### SQL database Basics
Let's brush our knowledge on SQL before we get to Sequalize. Structured Query Language is a language that allows us to interact with databases in performing database queries. Pronunciation differs from `SQL` to `sequel` your choice. SQL only allows execution on relational databases.

SQL enables us to perform operations abbreviated as `CRUD`; Create Read Update and Delete. To illustrate this we have two tables in our database `Employees`:

Table `lego_people`

|name   |age    |
|-----  |----   |
|james  |34     |
|craig  |15     |
|paul   |67     |
|cynthia|55     |


Table `lego_height`

|name   |cm     |
|-----  |----   |
|james  | 4     |
|craig  | 5     |
|paul   | 7     |
|cynthia| 5     |

So if we want to `create` data in the `lego_people` table we:

```sql
INSERT INTO lego_people(name, age)
VALUES ('Joe' ,12);
```
The `INSERT INTO` statement is used to create data in a database table. We pass in `name` and `age` as arguments to specify the properties we want to add.
To `read` value from the `lego_people` table:

```sql
SELECT name FROM lego_people;
```
The `name` represents the column name in the` lego_people` table. The `SELECT` statement is used to read data from the database.

To `update` a record in the `lego_height` table by making Paul 8cm tall:

```sql
UPDATE lego_height
SET name = 'paul', height = 8;
```

We can also perform a `delete` operation from the database for example lets delete Paul altogether:

```sql
DELETE FROM lego_height
WHERE name = 'paul';
```

The `WHERE` clause specifies the data to be deleted.

If for instance, we wanted to have the records of both age and height in one table we would use a `JOIN` statement to combine both tables:

```sql
SELECT name, age FROM lego_people
LEFT JOIN lego_height USING (name);
```

This would result to this:

|name   |age   |cm    |
|-----  |----- |----- | 
|james  |34    | 4    |    
|craig  |15    | 5    |
|paul   |67    | 7    |    
|cynthia|55    | 5    |

### Object Relational Mappers(ORM) Node.js Approaches
Before we get started with Sequalize, let's get to understand what an ORM is and some of the supported ORMs in Node.js. Object Relational Mapping is a simplified way of converting data between relational databases and objects (Primrose katena, 2020).

Most times we encounter scenarios where we have to write complex SQL query statements to perform CRUD operations from a database. Worse enough, we still need to convert data from the database into an object that is compatible with our language of choice as we will see in the next chapter. It additionally simplifies the manipulation of database engines whenever the need arises. 

So how does ORMs work, well first, choosing the right database you want to use. Then decide on the Object Relational Mapper that would work efficiently with the database and install it. For our case since we're using Node.js, we'll consider Sequalize.
Second, we create a database model. This represents the structure of our database. Database models provide the advantage of scalability and efficiency. The structure defined in the model includes tables, database collection, and columns. We then connect our database.

The types of Object Relational Mappers with Node.js support are:
* `Sequalize` which has support for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server databases.
* `Caminte` supports a large number of databases such as MySQL Sqlite3, Riak, Postgres, CouchDB, MongoDB, Redis. 
* `Node-ORM` has support for MySQL, SQLite, and PostgreSQL.

For more on ORMs, you can check out this [documentation](https://www.npmjs.com/search?q=object%20relational%20mapper).

### What is Sequalize
Sequalize is an open-source Node.js module that enables JavaScript developers to work with relational databases more easily including but not limited to MySQL and Postgres. Chances are that if you're working with relational databases already you are doing something like this:

```javascript
CREATE TABLE articles(
    id          INT AUTO_INCREMENT,
    title       NVARCHAR(100) NOT NULL,
    body        NVARCHAR(100) NOT NULL,
    submittedAt DATETIME      NOT NULL
);

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "demo_schema"
});
connection.connect();

const query = "SELECT `id`, `title`, `content`, `submittedAt` \
FROM 'articles' WHERE `articles`.`id` = ?";
connection.query(query, 5, function(error, article){
    console.log(article);
});
```

First, you're writing a separate script to create tables and define associations between them, then you're embedding SQL queries in your JavaScript and using a low-level adapter to execute those queries against your database in this case we're using the MySQL node module. Whilst this code in itself isn't terrible, you'll find over time having separate scripts to create your table adds unnecessary friction, also mixing SQL and JavaScript like in this case is not sustainable.

JavaScript does not support multiline strings very well, for instance in our case we're ending the first line of the string with a backslash. Even if it did support it, switching between JavaScript and SQL is just unpleasant. This contributes to a lot of junk code and little business logic which are not easy to maintain.

On the other hand, using sequalize you can avoid writing SQL queries altogether. Let's have a look at this code snippet:

```javascript
const Sequalize = require('sequalize');

const connection = new Sequalize("db name", "username", "password");
const Article = connection.define("article", {
    title: Sequalize.String,
    content: Sequalize.String
});
connection.sync();
```

First, we instantiate Sequalize and define our database connection parameters. Instead of writing a separate SQL file containing SQL code to generate tables, we define what is referred to as models. For example in our case, `article` is our model and we define two attributes; `title` and `content`. Then using the `sync()` function, Sequalize will look at all the models you've defined and then generate SQL queries that will in turn create associated tables. Then when we're ready to query the data instead of embedding the SQL we just use the Sequalize friendly API. For example in the snippet below instead of using a query, we're simply writing `findById()` and then specifying the ID of the article which is `5` in our case improving its readability.

```javascript
const Sequalize = require('sequalize');

const connection = new Sequalize("db name", "username", "password");
const Article = connection.define("article", {
    title: Sequalize.String,
    content: Sequalize.String
});
connection.sync();

Article.findById(5).then(function (article) {
    console.log(article);
})
```

Using Sequalize helps us have less craft, less boilerplate ultimately making your code easy to read, maintain and extend.

### Benefits of Sequalize
So to conclude this introduction we're going to touch on the benefits of Sequalize and Object Relational Mappers in general.
* Sequalize allow us to write less  
* Enable us to write more consistent code
* You can mostly avoid SQL queries
* Sequalize abstract the database engine
* Good tooling for migrations

### Conclusion
In general, it mainly depends on the type of database you're using that will inform your decision on choosing an ORM for your Node.js application. In this article, we try to cover why Sequalize seems the best option compared to the already existing ones. 
For more reference on Sequalize, be sure to check their [documentation](https://sequelize.org/master/manual/getting-started.html) for more clarity.

Happy Coding :>)


