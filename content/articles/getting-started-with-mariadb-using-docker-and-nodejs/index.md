---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-mariadb-using-docker-and-nodejs/
title: Getting Started with MariaDB Using Docker and Node.js
description: In this article, we will learn how to setup MariaDB inside a docker container and connect to it using Express and Node.js 
author: ephraim-njoroge
date: 2021-06-14T00:00:00-11:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-mariadb-using-docker-and-nodejs/hero.jpg
    alt: MariaDB Docker and NodeJS
---
[MariaDB](https://mariadb.com/) has been a preferred database solution used by developers over the years. It is open-source and relational thus has a massive community of developers using it to build their applications' databases.

<!--more-->

In addition, [MariaDB Corporation](https://mariadb.com/) provides high-quality enterprise products that put MariaDB in front of other database vendors.

Also, the [MariaDB Foundation](https://mariadb.org/), the custodian and guardian of the MariaDB community code, has significantly contributed to the MariaDB success.

This article will provide a guide and a platform for the developer on using MariaDB with [Docker](https://www.docker.com/) and [Node.js](https://nodejs.org/en/).

### Prerequisites
Before coding the application, the following are the requirements:
- Working knowledge of MariaDB and Docker commands
- A [MariaDB](https://mariadb.com/products/skysql/docs/clients/) client installed
- [Node.js](https://nodejs.org/en/download/) and NPM package installed
- [Docker](https://www.docker.com/products/docker-desktop) for desktop installed

### Setting up a MariaDB Docker Container
After successfully downloading and installing Docker, we need to pull the [MariaDB server image](https://hub.docker.com/_/mariadb) and create a container. Then, on the terminal, execute the following command:

```bash
$ docker run -p 127.0.0.1:3306:3306  --name mariadbdemo -e MARIADB_ROOT_PASSWORD=Demo123@ -d mariadb:latest
```

The above command will download and create a MariaDB server container to connect to and communicate using the MariaDB client.

The container's name is `mariadbdemo`, and the `Demo123@` is the password for the MariaDB root user. 

Note that other SQL clients can be used, but we will use MariaDB's latest version to keep things simple and uniform for this guide.

Next, will be to connect the MariaDB instance by running the below command in the terminal:

```bash
$ mariadb --host 127.0.0.1 -P 3306 --user root –pDemo123@
```

The below screen will appear, meaning that we have connected to the MariaDB instance successfully.

![maria-db-root](/engineering-education/getting-started-with-mariadb-using-docker-and-nodejs/maria-db-root.PNG)

The next step will be to create a new database by running the below command:

```sql
CREATE DATABASE demodb;
```

Then we create a new table by running the below command:

```sql
CREATE TABLE demodb.persons (Name VARCHAR(50));
```

Finally, will be to insert several records as below:

```sql
INSERT INTO demodb.persons VALUES ('Bob'), ('Alice'), ('Ben'), ('Mary');
```

### Connecting to MariaDB with Node.js
With MariaDB database downloaded and installed. It is now ready to use within a new Node.js app.

To begin, we create a new directory and then browse into it. Next, create a new JavaScript file named `server.js` which will act as the main module of the Node server. 

Next will be to browse to the directory and execute the following command in the terminal:

```bash
$ npm init
```

One can fill out the prompts that appear or leave them as default by pressing the enter key through all the options.

A `package.json` file will be auto-generated in the same directory as the `server.js` file.

Note that we now have a runnable Node application.

Next, we will install an [express](https://expressjs.com/) package, acting as our web framework for the Node application. To install the express package, we execute the below command.

```bash
$ npm install express
```

Then next, we will install a [MariaDB Node.js connector](https://mariadb.com/kb/en/nodejs-connector/). It will establish a connection and communicate with our MariaDB instance.

The below command will be used to install the MariaDB Node.js connector:

```bash
$ npm install mariadb
```

Now, we can add the code that will connect to MariaDB.

The First will be to create a new reusable [module](https://nodejs.org/api/modules.html) file by the name `db.js`.

The `db.js` module will utilize the MariaDB Node.js connector to enable our application to connect to and communicate with MariaDB.

The code for the `db.js` will be as follows:

```JavaScript
// here we import the mariadb
const mariadb = require('mariadb');

// here we create a new connection pool
const pool = mariadb.createPool({
  host: "127.0.0.1", 
  user: "root", 
  password: "Demo123@",
  database: "demodb"
});

// here we are exposing the ability to creating new connections
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  }
```

Note to avoid exposing all the sensitive database connection details directly to our connection module. Instead, it will be advisable to use the [dotenv](https://www.npmjs.com/package/dotenv) variable to handle sensitive connection details.

The final step will be to create an Express endpoint that utilizes the MariaDB Node.js connector via `db.js`

Open the file `server.js` and paste the below code into it

```JavaScript
const express = require('express');
const pool = require('./db');
const app = express();
const port = 5000;

// here we expose an endpoint "persons"
app.get('/persons', async (req, res) => {
    let conn;
    try {
        // here we make a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query to fetch all records from the table
        var query = "select * from persons";

        // we run the query and set the result to a new variable
        var rows = await conn.query(query);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
```

Finally, we will run the Node application by executing the following command in the terminal.

```bash
$ node server.js
```

Upon running the above command, a success message that the server is up and listening to the port specified will be displayed on the console.

### Testing
Once the Node project has been started, we can test it by executing a request. For instance, we can execute the following [curl](https://curl.se/) command:

```bash
$ curl http://localhost:5000/persons
```

The above command returns the below JSON response payload:

![person-route](/engineering-education/getting-started-with-mariadb-using-docker-and-nodejs/persons-route.PNG)

### Wrapping Up
As of now, the developer can now use a MariaDB with Node.js. MariaDB can offer a lot on how to build an innovative database to create modern applications.

The code snippets used in this guide can be accessed at the following [GitHub Repo](https://github.com/ephnjor2021/mariadb-nodejs).

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
