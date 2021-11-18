---
layout: engineering-education
status: publish
published: true
url: /astradb-nodejs/
title: Building Backend Applications using Astra DB and Datastax's API
description: In this tutorial, we will build a blog application using Apache Cassandra ,Node.js and Datastax's document API.
author: wilson-gichuhi
date: 2021-11-05T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/astradb-nodejs/hero.jpg
    alt: Building Backend Applications using Astra DB
---
One of the popular distributed NoSQL database management systems is Apache Cassandra. It guarantees scalability and reliability at scale across its infrastructure via partitioning and replication. However, this form of cloud-native development usually is slow and complex. 
<!--more-->
Astra DB is a zero-config serverless database that seamlessly abstracts the Apache Cassandra cloud-native services for database and streaming operations.

This article explains the fundamentals of Apache Cassandra and Astra DB. Then, we will perform CRUD operations on a blog database using Node.js and Datastax's document API. We will create tables, read database records, perform updates and deletions.

### Prerequisites
1. You'll need an [Astra DB](https://www.datastax.com/products/datastax-astra) account for the database.
2. Have [Node.js](https://nodejs.org/en/) runtime installed on your development system.
3. An IDE, I recommend [VS Code](https://code.visualstudio.com/) for development. 

### Database setup
First, you'll need to log in to DataStax. I use my GitHub account. Connect your Google account or even use your email and password.

![datastax-sign in](/engineering-education/astradb-nodejs/image1.png)

A successful login will take you to your AstraDB dashboard. Then, on the left panel of the dashboard, click `create database`. 

![dashboard](/engineering-education/astradb-nodejs/image2.png)

To create a serverless database, choose a name and a keyspace. Apache Cassandra will use keyspaces to group data together. In my case, I will name the database `cassandra-demo` and `blog` as the keyspace.

![database creation](/engineering-education/astradb-nodejs/image3.png)

> "Documentation refers to [keyspace as a bucket that will hold your tables](https://docs.aws.amazon.com/keyspaces/latest/devguide/AmazonKeyspaces.pdf). You can create different keyspaces for groups of tables”. 

Datastax's Astra DB is distributed in different regions. Therefore, before completing the database setup, pick a provider from the options. In my case, I will choose GCP and the region as us-east1.

![cassandra-demo](/engineering-education/astradb-nodejs/image4.png)

### Insert data into the database
Since Apache Cassandra is a NoSQL, it organizes data in collections. When we create a Cassandra collection, it automatically exposes a REST or GraphQL API as an endpoint where we can interact with data from our database. We will utilize the document API gateway from our Node.js application.

We need to create a new token for access to DataStax's database in our application. Head over to the DataStax Astra DB dashboard. On the panel, click connect. 

This shows various ways in which we can access our application, including REST and GraphQL APIs. We will use the Document API; head over under the prerequisites and click the link to create a new Application token.

![application token](/engineering-education/astradb-nodejs/image5.png)

In this project, we will use the `Administrator role` to access every privilege in the database security. Now, copy the generated `Client ID`, `Token`, and `Client Secret` and store them on your `env` file.

Since we have no interface created, we will use the [curl](https://curl.se/) command line to insert data. 

The curl command to make a POST request will be similar to the following:

```bash
 curl --request POST \
--url https://$ASTRADB_ID-$ASTRADB_REGION.apps.astra.datastax.com/api/rest/v2/namespaces/$ASTRA_DB_KEYSPACE/collections/members \
-H "X-Cassandra-Token: $ASTRADB_TOKEN" \
-H 'Content-Type: application/json' \
-d '{
"title": "New Title",
"description": "descriptive stuff...",
"author": "john doe"
}'
```

To insert more data, rerun this command with a different title to insert more data. However, don't forget to change the `title`, `description`, and `author` from the json body. 

### Project setup 
On your terminal, create a project folder and name it `astra-app-demo`:

```bash 
mkdir astra-app-demo
```

Next, navigate inside the folder and open it in your IDE:

```bash
cd astra-app-demo && code .
```

To bootstrap this project, initialize it using the command `npm init -y` to create a `package.json` file. 

Let's now install the following dependencies:

Our Node.js application will need the following packages from npm:
- Express: `express` is a low overhead Node.js web application framework that relies on middlewares in the request and response cycle.

- `@strajs/collections`: This is the module that acts as a driver to our document [stargate API](https://stargate.io/) in AstraDB. DataStax uses a Stargate API gateway to connect from our Node.js application. 
  
- Dotenv: Since we are using a serverless database, we need a way to store API keys. It injects environment variables from a `.env` file in our application, avoiding hardcoding any sensitive data. Ensure to add a .env in your `.gitignore` file not to push this to a GitHub repository.
  
- Nodemon: `nodemon` module monitors changes in our application and restarts our application server.

On your terminal, install the packages using the command below:

```bash
  npm i express @astrajs/collections dotenv nodemon
```

Node.js 14 and latest has support for ES modules. 

To start using this feature, head to your package.json and add:

```json
  "type": "module",
```

Next, create an entry `index.js` file inside our `astra-app-demo` directory and add the following code to initiate our server:

```js
// import express and dotenv package installed above
import express from 'express'
import dotenv from 'dotenv'

// instantiate our express app
const app = express()

// enable env varibales for .env file
dotenv.config()

// a basic index route
app.get('/', (req,res)=>{
  res.send("You're in the index page")
})

// run application on Port:: 5000
app.listen(5000, () => {
    console.log(`server running: port:: 5000`)
})
```

Then add `nodemon` script in your `package.json` to restart our server:

```json
"scripts": {
    "dev": "nodemon index.js"
  },
```

If everything is okay, head over to your browser on `localhost:5000`. 

![image7](/engineering-education/astradb-nodejs/image7.png)

Congratulations, the server setup is up and running! In the next sections, we will be manipulating our DataStax Astra database using the Document API and `@astrajs/collections` in Node.js

### Connecting and retrieving data
We can now add the initially generated credentials to the `.env` file. Under the `.gitignore`, make sure to exclude its commit to GitHub public repository. 

The file should look like the following:

```bash
ASTRA_DB_REGION = us-east1
ASTRA_DB_KEYSPACE = stackr
ASTRA_DB_APPLICATION_TOKEN= YOUR_DB_APPLICATION_CLIENT_TOKEN

ASTRA_DB_CLIENT_ID= YOUR_CLIENT_ID
ASTRA_DB_CLIENT_SECRET= YOUR_CLIENT_SECRET
```
 
At the top of our `index.js` file, let's import `createClient` from `@astrajs/collections` with:

```js
import { createClient } from "@astrajs/collections"`
```

Since we are interacting with an API, express uses middlewares to parse the JSON and URL encoded data as follows:

```js
// enable json and url encoded data
app.use(express.json())
app.use(express.urlencoded({extended: false}))
```

Then we need to create an instance of the collection client, `createClient`. Then, invoke the function passing the environment variables set earlier as object arguments.

```js
// create an Astra DB client
const astraClient = await createClient({
  astraDatabaseId: process.env.ASTRA_DB_ID,
  astraDatabaseRegion: process.env.ASTRA_DB_REGION,
  applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
})
```

To simplify the database collection, we will create for the collection that we will work on:

```js
const collection = astraClient.namespace("stackr").collection("testcollection")
```

The collection needs a namespace which is the keyspace, and a collection name. We name them `stackr` and `testcollection`, respectively.

Let's head over to list all blogs in our collection. Create a `GET` route to list all collections. 

The `find` method from the `collection` instance is the method that returns all records in the collection:

```js
// get all documents
app.get('/blogs', async (req, res) => {
  const blogs = await collection.find({})
  return res.json(blogs)
}
```

Under the `GET` endpoint, we return a JSON response with blogs. I will use [thunder client VS code extension](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client). Feel free to use any other REST API Client such as [postman](https://www.postman.com/) or [insomnia](https://insomnia.rest/). 

If we make a `GET` request, AstraDB sends back the data with the document ID as the key:

![image8](/engineering-education/astradb-nodejs/image8.png)

![image9](/engineering-education/astradb-nodejs/image9.png)

### Creating documents in AstraDB
To create a document in a collection, use the `POST` HTTP verb with an endpoint such as `/new`. The `create` method from the `collection` instance will create a new document. 

To test this, head to the thunder client and add a body that includes a `title`, `description`, and `author`.
```js
// post route
app.post('/new', async(req, res) => {
  const {title, description, author} = req.body
  const newUser = await collection.create({
    title: title,
    description: description,
    author: author
  })
    // return a success msg with the new doc 
  return res.json({data: newUser, msg: 'user created successfully'})
})
```

In the code above, using a destructuring syntax, we pass the values to `collection.create()`. Our response returns a success message and the newly created document.

![creat route](/engineering-education/astradb-nodejs/image10.png)

### Updating documents in AstraDB
For this operation, add one more `/update` endpoint. In REST, update operations use the `PUT` HTTP verb. The Astra Document API exposes the `collection.update( )` method to update any document based on its ID under a collection.

```js
// updating docs
app.put('/update', async(req, res)=>{
  const {title, description, author} = req.body
const updatedUser = await collection.update("1b4a845d-7460-4971-a8a7-0ef371771d85", {
    title: title,
    description: description,
    author: author
  })

  return res.json({data: updatedUser, msg: 'user updated successfully'})
})
```

![update endpoint](/engineering-education/astradb-nodejs/image11.png)

### Deleting documents in AstraDB
To delete records, add a `DELETE` with the `/delete` REST endpoint. In this case, we perform delete operations based on document ID. 

If the document does not exist, we return a 404 error message. On success, our API returns a JSON response as `user deleted successfully.

```js
app.delete('/delete', async(req,res)=>{
  const user = await collection.delete("1b4a845d-7460-4971-a8a7-0ef371771d85")

  if(!user){
    return res.json({msg: '404 user not found'})
  }

  return res.json({msg: 'user deleted successfuly'})
})
```

![delete endpoint](/engineering-education/astradb-nodejs/image12-delete.png)

### Conclusion
Being open-source, the Apache Cassandra is a popular database due to its ability to maintain seamless scalability and consistency in a distributed cloud infrastructure. 

Combining these technical features with the DataStax stargate API gateway gives us the ability to develop a serverless database with zero configuration. The database is serverless which has a great free tier and developer experience.

To read more, check the `astrajs` docs [here](https://docs.datastax.com/en/astra/docs/astra-collection-client.html).

Happy coding!

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
