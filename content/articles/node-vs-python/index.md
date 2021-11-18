---
layout: engineering-education
status: publish
published: true
url: /node-vs-python/
title: APIs in Node.js vs Python - A Comparison
description: Node.js and Python are among the most popular languages used to write APIs and backend services. Let's look at a comparison between the two most popular languages out there.
author: saiharsha-balasubramaniam
date: 2020-08-20T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/node-vs-python/hero.jpg
    alt: node.js vs Python
---
JavaScript and Python are two of the most popular languages among web developers. The idea of separating the front-end from the back-end as much as possible has birthed the idea of the JAMStack. JAMStack stands for **JavaScript, APIs and Markup**. It describes the idea of a website being completely static and client-side rendered. The website uses API calls to load all dynamic content. Let us look at the two most popular languages for writing APIs (Application Programming Interface), Node.js and Python to compare and contrast the two.
<!--more-->

### Table of Contents

- [The History](#the-history)
- [Node.js vs Python: The Differences](#node.js-vs-python:-the-differences)
- [APIs in Node.js](#apis-in-node.js)
- [APIs in Python](#apis-in-python)
- [Further Reading](#further-reading)

### The History

#### Node.js
Node.js is a server-side JavaScript runtime. JavaScript was originally designed to run within a browser, inside a JavaScript engine like V8. To expand the capabilities of JavaScript outside the browser, Node.js was developed in **2009** by **Ryan Dahl**. Node.js combined the capabilities of the V8 JavaScript engine, an event loop and low level calls into a robust server-side scripting runtime. It soon grew into the preferred language of web developers.

#### Python
Python is a multi-paradigm, scripting language conceived by **Guido van Rossum** in the late 1980s. Python is extremely easy to read, straightforward and simple to learn. It was built with simplicity in mind. It thus uses **indentation** to define the scope of loops and functions. Python is extensively used as a server-side language. Frameworks like **Django** and **Flask** make it simple to design performant websites. It is also used to create APIs and Machine Learning models. Python, combined with the package manager **pip** makes it perfect for projects.

### Node.js vs Python: The Differences
- [Performance and Architecture](#performance-and-architecture)
- [Syntax and Ease of Use](#syntax-and-ease-of-use)
- [Type of Projects](#type-of-projects)
- [Frameworks and Expandability](#frameworks-and-expandability)
- [Package Management](#package-management)

#### Performance and Architecture
Python and Node.js are interpreted languages. Therefore, they are comparatively slower than compiled languages like C++.

Python is a single threaded and single flowing language. Though it is optimized by frameworks such as Django, it is slow. Python runs well on servers, but is quite unsuitable for mobile. The limit in processing power is a bottleneck to Python's performance.

Node.js has the upper hand here. Node.js is heavily optimized by Google's V8 JavaScript Engine, making it performant. Node.js follows an event loop based architecture, which makes it non-blocking. Asynchronous requests are supported and this means that the runtime can execute multiple requests without getting blocked.

#### Syntax and Ease of Use
Python has extremely readable syntax. This makes it the preferred programming language for beginners to work on. It omits the use of curly braces and uses indentation to define scope.

Node.js follows the JavaScript syntax, which is harder to understand than Python. But for programmers that are familiar with C/C++, Node.js syntax is similar and poses no challenge.

#### Type of Projects
Both Python and Node.js are used for web development and full-stack projects.

##### Example of Python Websites

- Instagram
- Netflix
- Reddit

##### Example of Node.js Websites

- LinkedIn
- PayPal
- Medium.com

Python is heavily used as a part of Data Science and Machine Learning projects. It has libraries like numpy, pandas, scikit, opencv and tensorflow that make it perfect for:

- Neural Networks
- Face Recognition
- Data Processing

Python is also preferred for small, lightweight websites. Parts of Airbnb and Lyft are written in Flask. It is a micro-framework. The templating engine, Jinja is also written in Python.

Due to the event loop architecture of Node.js, it is used for websites that involve a lot of concurrent processes. For instance, a chat website has a lot of real-time communication that involves multiple requests being sent and received. It is also suitable for Internet of Things solutions and projects.

#### Frameworks and Expandability

A framework is a library of functions. It contains tools that make the development, testing and design of the web project quicker and more efficient.

Python uses an interpreter called CPython that improves the performance of Python. There are many frameworks and libraries for full stack development.
- [Django](https://www.djangoproject.com/) - A python web framework based on the Model-View-Controller Architecture
- [Flask](https://palletsprojects.com/p/flask/) - A python micro-framework for web development
- [Tensorflow](https://www.tensorflow.org/) - A python based Machine Learning platform

Node.js has a ton of libraries that make it extensible, scalable, and feature-rich.
- [Express](https://expressjs.com/) - Unopinionated web framework for Node.js.
- [Adonis](https://adonisjs.com/) - Full-Stack MVC Framework.
- [Koa](https://koajs.com/) - Robust Foundation for Web Applications.

#### Package Management

A package manager is a software that manages versions, packages and dependencies for your project. Some examples of package managers are npm, yarn, pip and composer. When a project grows in scale, a package manager helps to manage dependencies. It works perfectly across versions and even in collaborative projects. It cuts costs by reducing dependency problems across developer teams.

Python uses a package manager called `pip`. It is extremely easy to use and has a ton of community-published packages. These packages can be found at the [Python Package Index](https://pypi.org/).

It uses a file called **requirements.txt** to keep track of packages in a project.

To install a package in python, just enter:

```
pip install <package-name>
```

Node.js uses a package manager called `npm`. The [npm registry](https://www.npmjs.com/) contains open source packages for Node.js, front-end web development, mobile apps and more.

To keep track of packages in a project, Node.js uses a file called **package.json**

To install a Node.js package, just type:

```
npm i <package-name>
```

### APIs in Node.js

An API (Application Programming Interface) is an intermediary that allows our application to communicate with another application. With the increasing popularity of serverless applications, knowing how to build an API is essential for a developer.

Let us dive into creating an API in Node.js, our API has an endpoint _/read_ which reads data from a table, _sample_ in a MySQL Database.

MySQL is an open-source SQL database, that is maintained by Oracle. MySQL is popular with developers and is used in a lot of applications. For an introduction to MySQL, check out this [page](https://dev.mysql.com/doc/refman/8.0/en/tutorial.html).

```js
/* Importing Libraries */

const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

/* Initialize Express */

const app = express();

/* Body Parser */

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

/* MySQL Config */

const connection = mysql.createConnection({
  host: "<hostname>",
  user: "<username>",
  password: "<password>",
  database: "<dbname>",
});

/* Initialize MySQL Connection */
/* These lines of code initialize a connection to a MySQL database,
on a localhost or a remote server */

connection.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to the database.");
});

/* Define API Endpoint */

app.get("/read", (req, res) => {
  connection.query("SELECT * FROM sample", (err, res, fields) => {
    /* The above SQL query selects all records from the 'sample' table */
    if (err) throw err; // If there's a connection error, the server will throw an error message
    console.log(res);
  });
});
```

In the snippet above, we initialize a MySQL connection using the Node.js MySQL library. Whenever a get request is sent to the _/read_ endpoint, the database is read.

### APIs in Python
Let us build a similar API that reads a database (SQLAlchemy) using Python.

SQLAlchemy is a SQL database toolkit written in Python. It can be used to connect to SQL Engines like SQLite, PostgreSQL, MySQL and more. You can read more about SQLAlchemy [here](https://www.sqlalchemy.org/library.html#tutorials).

```python
# Importing libraries
from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from flask.ext.jsonpify import jsonify
from json import dumps

# Initialize the database using the MySQL engine
db = create_engine('mysql://username:password@host/database')

# Initialize the flask web server
app = Flask(__name__)
api = Api(app)

# Main class
class Read(Resource):
    def get(self):
        conn = db.connect() # Connect to Database
        query = conn.execute("select * from sample") # Query and return json result
        return jsonify(query)

# API Endpoint
api.add_resource(Read, '/read')

# Web server runs on port 5002
if __name__ == '__main__':
     app.run(port='5002')
```

In the snippet above, we initialize a MySQL connection using the SQLAlchemy library in Python. The Flask library is used for creating API endpoints.

### Further Reading
- [Flask RESTFul Documentation](https://flask-restful.readthedocs.io/en/latest/)
- [Express Documentation](https://expressjs.com/en/api.html)
- [Node.js vs JavaScript by freeCodeCamp](https://www.freecodecamp.org/news/nodejs-vs-python-choosing-the-best-technology-to-develop-back-end-of-your-web-app/)
