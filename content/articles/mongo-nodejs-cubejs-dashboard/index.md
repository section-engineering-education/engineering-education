---
layout: engineering-education
status: publish
published: true
url: /mongo-nodejs-cubejs-dashboard/
title: Node Express Analytics Dashboard with Cube.js
description: This tutorial introduces the concept of Cube.js dashboard analytics.
author: bhanji-brilliant
date: 2021-08-20T00:00:00-05:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mongo-nodejs-cubejs-dashboard/hero.png
    alt: cube.js analytics dashboard image
---
In this tutorial, I will be showing you how to create a basic analytics dashboard with Node.js, Express.js, and Cube.js. For the database, we will be using MongoDB with MongoDB BI Connector.
<!--more-->
The BI Connector allows for the use of MongoDB as a data source for SQL based business intelligence and analytics platforms.

Cube.js solves a plethora of different problems every production-ready analytic application needs to solve. Issues like analytic SQL generation, query results caching and execution orchestration, data pre-aggregation, security, API for query results fetch, and visualization.
 
### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up the development environment](#setting-up-the-development-environment)
- [Generating Cube.js schema](#generating-cubejs-schema)
- [Adding Cube.js environmental variables](#adding-cubejs-environmental-variables)
- [Conclusion](#conclusion)

### Prerequisites
- This tutorial requires a basic understanding of MongoDB and MongoDB BI Connector.
- Basic knowledge in [Node.js](https://nodejs.org/en/docs/), [Express.js](https://expressjs.com), and [Cube.js](https://cube.dev).

### Objectives
By the end of this tutorial, you should be able to create a simple Node.js application dashboard for analytics, combining with the power of Cube.js and MongoDB.

### Setting up the development environment
Let's begin by installing all the above requirements before starting the development process.  

**Step 1:**
Download [Node.js](https://nodejs.org/en/download/current/) for your local machine. In this tutorial, we'll be using Node version `v16.5.0` on Ubuntu 20.04. However, it's important to note that the concepts will remain the same for any operating system.  

Check your installed version by running the following command:  

```bash
node --version
```
Output:

```bash
v16.5.0 # note that this version may vary from yours
```

**Step 2:**  
Let's proceed and create our application skeleton using [Express](https://expressjs.com) by running the following commands:

```bash
npm install express-generator -g
```
We proceed to generate our `example-analytics-dashboard` app by executing the following commands:

```bash
express --view=hbs example-analytics-dashboard
# notice that the view is set to use hbs
```
Expected Output:

```bash
create : example-analytics-dashboard/
create : example-analytics-dashboard/public/
create : example-analytics-dashboard/public/javascripts/
create : example-analytics-dashboard/public/images/
create : example-analytics-dashboard/public/stylesheets/
create : example-analytics-dashboard/public/stylesheets/style.css
create : example-analytics-dashboard/routes/
create : example-analytics-dashboard/routes/index.js
create : example-analytics-dashboard/routes/users.js
create : example-analytics-dashboard/views/
create : example-analytics-dashboard/views/error.hbs
create : example-analytics-dashboard/views/index.hbs
create : example-analytics-dashboard/views/layout.hbs
create : example-analytics-dashboard/app.js
create : example-analytics-dashboard/package.json
create : example-analytics-dashboard/bin/
create : example-analytics-dashboard/bin/www

change directory:
  $ cd example-analytics-dashboard

install dependencies:
  $ npm install

run the app:
  $ DEBUG=example-analytics-dashboard:* npm start
```
**Step 3:**
Let's now install the local MongoDB instance and MongoDB BI connector by running the following commands:  

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```
Expected Output:

```bash
OK
```
Next, run the following command to create a list for MongoDB and reload packages:

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list && sudo apt-get update

```
Install the MongoDB packages by exectuting the following on your terminal:

```bash
sudo apt-get install -y mongodb-org
```
On completion, start your MongoDB by executing the following commands:

```bash
sudo systemctl start mongod
```
**Step 4:**
With MongoDB instance locally available, we can proceed and install the MongoDB BI Connector.

> It's important to note that you MUST first have OpenSSL installed on your host.

- Start by downloading MongoDB BI Connector [here](https://www.mongodb.com/download-center/bi-connector/releases).
- Extract the downloaded file by running the following command:  

```bash
cd # to downloads
tar -xvzf mongodb-bi-xxxxxx.tgz 
```
Expected Output

```bash
mongodb-bi-linux-x86_64-ubuntu2004-v2.14.3/LICENSE
mongodb-bi-linux-x86_64-ubuntu2004-v2.14.3/README
mongodb-bi-linux-x86_64-ubuntu2004-v2.14.3/THIRD-PARTY-NOTICES
mongodb-bi-linux-x86_64-ubuntu2004-v2.14.3/example-mongosqld-config.yml
mongodb-bi-linux-x86_64-ubuntu2004-v2.14.3/bin/mongosqld
mongodb-bi-linux-x86_64-ubuntu2004-v2.14.3/bin/mongodrdl
mongodb-bi-linux-x86_64-ubuntu2004-v2.14.3/bin/mongotranslate
```

**Step 5:**
Now that we've got a complete application skeleton, in the next step, we will install [Cube.js](https://cube.dev/docs/frontend-introduction).

```bash
# cd into project root directory
cd example-analytics-dashboard
# then execute the command to add Cube.js to Express dependencies.
npm install 
# this installs all the dependencies for our application
npm install --save @cubejs-backend/server-core @cubejs-backend/mongobi dotenv
```
### Generating Cube.js schema
Previously, we have seen how to set up our development environment. In this section, we will see how we can use the power of `Cube.js` to come up with a general schema to build an API analytics dashboard.  

We use the Cube.js schema since it can generate raw data into a meaningful business definition.  This data schema is then exposed via the `query API`, allowing the end-users to perform analytical queries.  

Let's create a simple `employees` table with the following information.

| id   | first_name  | last_name  | Salary  |
| -----| ----------- |------------|---------|
| 1    | John        | Doe        |  $200   |
| 2    | Testname    | TestLast   |  $500   |

While analyzing the above table, a variety of questions arises:  

- How many employees does the company have?
- How much does the company spend on salaries?

These, among others, are questions that would be answered by writing a query for each question. But with `Cube.js` data schema, we can build well-organized and SQLs that are very reusable.  

Let's represent the above table using the Cube.js data schema:

```javascript

cube('Employees', {
  sql: 'SELECT * FROM employees',

  measures: {
    count: {
      sql: 'id',
      type: 'count',
    },
  },

  dimensions: {
    first_name: {
      sql: 'first_name',
      type: 'string',
    },
  dimensions: {
    last_name: {
      sql: 'last_name',
      type: 'string',
    },

    salary: {
      sql: 'salary',
      type: 'number',
    },
  },
});
```
From the above schema, we've both the measures and dimensions. Measures are used to represent quantitative data while the dimensions are categorical data.  

### Adding Cube.js environmental variables
In the beginning, while adding Cube.js to our Express application, we also added the `dotenv` package which we use to manage our credentials.  
In the `.env` file, add the following:

```properties
CUBEJS_DB_HOST=localhost
CUBEJS_DB_NAME=employees
CUBEJS_DB_PORT=3307
CUBEJS_DB_TYPE=mongobi
CUBEJS_API_SECRET=SECRET
```

Proceed and initialize the Cube.js as shown below:

```js
// inde.js file
const cubejs = require('@cubejs-backend/server-core');
// ... some codes goes here
app.use('/', indexRouter);

require('dotenv').config();
cubejs.create().initApp(app);
// ... some codes
```  

With all these, you may now proceed and build a dashboard for any application.

The full source code can be found [here](https://github.com/bhanjibrilliant/mongodb-json-files)

### Conclusion
In this tutorial, we have seen how we can build an analytics dashboard using Express.js, Cube.js, and MongoDB instance. We've also seen why we chose Cube.js to write queries instead of the normal repetitive SQL queries.  

Happy Coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
