Apache cassandra is distributed No SQL database management system. To ensure reliablility at scale, Apache cassandra relies on replication and partitioning of its infrastructure. However, this form of cloud-native development is normaly complicated. 

This article focuses on the basics of using Apache Cassandra and Astra DB. We will perform CRUD operations on a blog database using Node.js and Datastax's document API. We will create tables, read database records, perform updates, and deletions.


### Prerequisites
1. You'll need an [Astra DB](https://www.datastax.com/products/datastax-astra) account for the database.

2. Have [Node.js] (https://nodejs.org/en/) runtime installed on your development system

3. An IDE, I recommend [VS Code](https://code.visualstudio.com/) for developement. 

### Database Setup

First, you'll need to login to DataStax. I use my GitHub account.However, you connect your Google account or even use email and password.

![datastax-sign in](image1.png)


A successful login will take you to your AstraDB dashboard. On the left panel of the dashboard, click `create database`. 

![dashboard](image2.png)

To create a serverless database, choose a name and a keyspace. Apache Cassandra will use keyspaces to group data together. In my case, I will use `cassandra-demo` as the database name and `blog` as the keyspace.

![database creation](image3.png)

>>> Documetation refers to keyspace as a bucket that will hold your tables. You can create different keyspaces for groups of tables”. 

Datastax's Astra DB is distributed on different regions. Before completing the database setup, pick a provider from the options. In my case, I will chose GCP and the region as us-east1.

![cassandra-demo](image4.png)


### Insert data to the database

Since we have no interface created, we will manually use curl command to insert data. When we create a Cassandra collection, it automatically exposes a REST or GraphQL API as an endpoint where we can interact with data from our database. We will utilize the document API gateway from our Node.js application.

First, we need to generate new token to access the database in our application. Head over to the DataStax Astra DB dashboard. On the left panel, click ....
Store on env
 under "organizations". When creating the token. For this, I'll chose the  “Database Administrator” role to have access to every privilege.

 The curl command to make POST request will be similar to the following:

 ```curl
 curl --request POST \
--url https://$ASTRA_DB_ID-$ASTRA_DB_REGION.apps.astra.datastax.com/api/rest/v2/namespaces/$ASTRA_DB_KEYSPACE/collections/members \
-H "X-Cassandra-Token: $ASTRA_DB_APPLICATION_TOKEN" \
-H 'Content-Type: application/json' \
-d '{
"title": "Some Stuff",
"other": "This is nonsensical stuff."
}'
 ```

 You can run this multiple times to insert multiple data. However, don't forget to change the `name`, `github` and `location` values in the json body that is sent with the curl command, so you can have some variety in the data stored in the database.

 
  

### Project setup 
On your terminal, create a project folder and name it `astra-app-demo`:
```bash 
mkdir astra-app-demo
```
Next, navigate inside the folder and open it in your IDE:
```bash
cd astra-app-demo && code .
```
To bootstrap this project, initialize using the command `npm init -y` to create a `package.json` file. Let's now install the following dependencies:


Our Node.js application will need the following packages from npm:
- Express : `express` is a low overhead Node.js web application framework that relies on middlewares in request/response cycle.

- @strajs/collections: This is the module that acts as driver to our document [stargate API]() in AstraDB. DataStax uses a Stargate API gateway to connect from Node.js application. 
  
- Dotenv: Since we are using a serverless database, we need a way to store API keys. It injects environment varuables from a `.env` file in our application therefore avoiding hardcoding any sensitive data. Make sure to add a .env in your `.gitignore` file so that this is not pushed to a GitHub repository.
  
- Nodemon: `nodemon` module monitors changes in our application and restarts our application server.

On your terminal, install the packages using the command below:

```bash
  npm i express @astrajs/collections dotenv nodemon
```

If you are using the current version of Node.js, it has support for ES modules. To enable this, head to your package.json and add:

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
  res.send('Index page')
})

// run application on Port:: 5000
app.listen(5000, () => {
    console.log(`server running: port:: 5000`)
})
```


```js
import { createClient } from "@astrajs/collections"

// create an Astra DB client
const astraClient = await createClient({
  astraDatabaseId: process.env.ASTRA_DB_ID,
  astraDatabaseRegion: process.env.ASTRA_DB_REGION,
  applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
})

const collection = astraClient.namespace("stackr").collection("testcollection")

app.get('/', async (req, res) => {
  const members = await collection.find({})
  console.log(members)
  return res.json(members)
})


app.post('/new', async(req, res) => {

  const user = await collection.create("cliff@wicklow.com", {
    other: "cliff",
    title: "Mr",
  })
  console.log(`${user}: Done`)
  return res.json(user)
})

app.listen(process.env.APP_PORT, () => {
    console.log(`server running: port:: ${process.env.APP_PORT}`)
})
```


### Retrieving data from Astra DB



### Performing updates and deletions


### Conclusion
Being open source, the Cassandra is a popular database due to its ability to maintain seamless scalability and consistency in a distributed cloud infrastructure. Combining this technical features with DataStax stargate API gateway gives us the ability to develop a serverless database with zero configuration. The database is serverless which has a great free tier and developer experience.

Along with your free account, you also get an additional 25 USD of usage credit (at time of writing) each month to use after that.

I hope you enjoy this article.


<!-- 
posts: [(title, author, date, content) ]
 -->
