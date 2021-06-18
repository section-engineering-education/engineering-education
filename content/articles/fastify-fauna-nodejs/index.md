---
layout: engineering-education
status: publish
published: true
url: /engineering-education/fastify-fauna-nodejs
title: Getting Started With Fastify Node.js framework and Faunadb
description: In this article, we use Node.js, Fastify, and FaunaDB to learn about basic CRUD operations, creating routes, and creating collections.
author: mary-njeri
date: 2021-06-18T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/fastify-fauna-nodejs/hero.jpg
    alt: faunadb example image
---
Choosing the right JavaScript tech stack in the massive ecosystem is challenging. One of the Node.js web server framework that is rising in popularity these days is Fastify due to its ease of use and great developer experience.
<!--more-->
In this tutorial, we will use Fauna to create a `User` collection containing our users' documents, protect the routes, read and delete the user document in the collection.

Refer to this [Github repository](https://github.com/marienjus/fastify-faunadb) to follow along.

### Prerequisites
1. A basic understanding of JavaScript [programming language](https://www.w3schools.com/js/) is essential.
2. Have any recent version of Node.js runtime installed on your system. I recommend downloading the [LTS version](https://nodejs.org/en/). This will also add NPM which will manage your dependencies.
3. Have a text editor like [VS Code](https://code.visualstudio.com/download) installed.
4. You need an API Client such as [Postman](https://www.postman.com/downloads/). In my case, I will be using [Thunder Client](https://www.thunderclient.io) which is available as a VSCode extension.
5. FaunaDB is a cloud database. Therefore, you will need at least a basic free tier [account](https://fauna.com/).

### Project setup
To get started, create your project folder named `fastify-fauna`, open it in your favorite IDE, and make sure to access it from the terminal.

Initialize NPM with the command `npm init -y`. This should create an initial `package.json` file in your project folder.

Next, we will need to install our application `npm` dependencies which include:

- `fastify`: Fastify is a Node.js web framework with great developer experience and a powerful plugin architecture.

- `faunadb`: FaunaDB client is a Node.js database driver that interacts with the Fauna cloud multi-model database.

- `dotenv`: API keys are sensitive data in any application and therefore should not be hardcoded or pushed to any Github repository. This is the package that will inject any environment variables we use in the `.env` file into our Node.js application server.

To install these packages using npm, run the command:

`npm install fastify faunadb dotenv`

Next, create an entry file `index.js` in the project folder and add the initial code to start our server:

```js
const fastify = require('fastify')({ logger: true });

async function startServer () {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1);
  }
};

startServer();
```

To briefly dissect the above code:

- We import the fastify module using `const fastify = require('fastify')({ logger: true })`. The logger is an optional parameter that ensures that we get logs on our application in the console.

- Before listening requests on `port 3000`, fastify expects an asynchronous function (`async function start()`) that will resolve or reject in case our server fails to start.

Later on, we will use the command `node index.js` to start our server and check if everything is okay.

### Creating Fauna initial database
You need to create a free account to access the fauna dashboard so as to create a new database. Initially, the dashboard screen should look like this:

![new database](/engineering-education/fastify-fauna-nodejs/newdatabase1.png)
*Fauna dashboard*

Next, give your database a name. Name the database `FASTIFY-FAUNA`:

![database name](/engineering-education/fastify-fauna-nodejs/db-name2.png)
*Create new database in Fauna*

Since we need to access our fauna database from our Node.js application code, we now create a server access key.

On your Fauna dashboard, navigate to the `Security` section and create a new key. Make sure to use its `Role` options as `Server`:

![role server](/engineering-education/fastify-fauna-nodejs/role-server3.png)
*Creating a security key*

The key is secret and is what we use to access Fauna from Node.js.

> Note: The server key should be stored safely, as Fauna will not show it again.

From here, we are now ready to execute our database queries. We will create our first collection and index.

In this project, we're going to use the available shell right from our dashboard:

We need a database collection that will store the documents for users. To create the `Users` collection, run this query in the shell:

```sh
CreateCollection({
  name: "Users"
})
```

When we executing the above query, it should return:

![shell](/engineering-education/fastify-fauna-nodejs/shell-create-collection.png)
*Create new collection in DB*

Next, we need an index. This is a copy of data columns from a table that is mainly designed to enable very efficient search. It will also allow us to ensure unique usernames:

```sh
CreateIndex({
  name: "Users_by_username",
  source: Collection("Users"),
  terms: [{field: ["data", "username"]}],
  unique: true
})
```

Let's now go back to our project and create a `.env` file inside the project folder with this format:

`FAUNA_SERVER_SECRET=fnAEL1cTZWACBe86wLa_EgUk6JAz8IebvKlQAK-u`

You should use the secret you obtained when creating a server key as I will be deleting this.

Any environment variable that in our `.env` file will be accessed using `process.env` in our code. To prevent the `.env` file containing our sensitive server information from being pushed to a Github repository, create a `.gitignore` and add as shown below:

```
.env
node_modules
```

### Creating our custom error class
Before we can start working on our server routes endpoints, we will first handle any error that may be received from Fauna.

Therefore, create a custom `FaunaError` class that will be integrated into Fastify's error handling flow control.

Add folder and a file as `errors/FaunaError.js` and paste the following code:

```js
class FaunaError extends Error {
  constructor (error) {
    super()

    const errors = error.requestResult.responseContent.errors

    this.code = errors[0].code
    this.message = errors[0].description
    this.statusCode = 500

    if (this.code === 'instance not unique'){
      this.statusCode = 409
    }

    if (this.code === 'authentication failed') {
      this.statusCode = 401
    }

    if (this.code === 'unauthorized') {
      this.statusCode = 401
    }

    if (this.code === 'instance not found') {
      this.statusCode = 404
    }

    if (this.code === 'permission denied') {
      this.statusCode = 403
    }
  }
}

module.exports = FaunaError
```

This class checks the HTTP status and description returned from the Fauna error instance. Fastify will read the `statusCode` property and return it as the HTTP code of the response when a request fails.

### Creating users in Fauna
Let us now create our first Fastify REST route that makes a `POST` request to create new users:

```js
fastify.post('/users', require('./routes/create-user.js'))
```

Now, create a `routes` folder and inside it, add `routes/create-user.js` file. Paste the code:

```js
const faunadb = require('faunadb')
const FaunaError = require('../errors/FaunaError.js')

// destructure Create and Collection
const {Create, Collection} = faunadb.query

module.exports = {
  // Validation schema for the Fastify route
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {type: 'string'},
        password: {
          type: 'string',
          minLength: 10
        }
      }
    }
  },
  async handler (request, reply) {

    const {username, password} = request.body

    const client = new faunadb.Client({
      secret: process.env.FAUNA_SERVER_SECRET
    })

    try {

      // Create a new user document with credentials
      const result = await client.query(
        Create(
          Collection('Users'),
          {
            data: {username},
            credentials: {password}
          }
        )
      );

      // Return the created document
      reply.send(result)

    } catch (error) {
      throw new FaunaError(error)
    }
  }
}
```

This is a public route, therefore, we are using our server secret to make sure that we can execute the queries. When our users are logged in, we will be using their generated secret to execute queries.

The authorization rules will only permit users to perform actions that have been allowed at a certain endpoint. More on this later.

Fauna uses an HTTP engine that is different from other database clients, we will need to instantiate a new client on every request to the database. It runs on the cloud and therefore each database query is simply an HTTP request.

If an error is returned from the database, we will need to catch it and throw a new instance of the FaunaError class which will then be logged into the console. Fastify should take care of the rest, since logging is enabled.

To test our routes during development, an HTTP client is useful. I will be using Thunder client which is available as a VS Code extension. It's quite similar to Postman else, use whatever you are most comfortable with (eg: cURL, Insomnia, etc).

Let us make a POST request to `http://localhost:3000/users` with the body as a JSON object. Do not forget to add the `Content-Type` header:

```JSON
{
  "username": "Winchy",
  "password": "supersecretpassword"
}
```

If everything works as we expected, our response body should contain a JSON document representation that has been created in the `Users` collection:

```JSON
{
  "ref": {
    "@ref": {
      "id": "301556533148254727",
      "collection": {
        "@ref": {
          "id": "Users",
          "collection": {
            "@ref": {
              "id": "collections"
            }
          }
        }
      }
    }
  },
  "ts": 1606435813770000,
  "data": {
    "username": "Winchy"
  }
}
```

![create user](/engineering-education/fastify-fauna-nodejs/create-user.png)
*Request-Response for creating new users*

Trying to create the same user twice should return a Fauna error since the `Users_by_username` index does not allow two documents to exist with the same username.

### Handling user authentication
Before making further requests, let's create an endpoint with Fastify that will authenticate our users.

Add this code to the `index.js` file:

```js
fastify.post('/login', require('./routes/login.js'))
```

This is a `/login` `POST` HTTP endpoint from the routes folder that will be used for authenticating users. Also, create the file `routes/login.js` with this code:

```js
const faunadb = require('faunadb')
const FaunaError = require('../errors/FaunaError.js')

const {Login, Match, Index} = faunadb.query

module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {type: 'string'},
        password: {type: 'string'}
      }
    }
  },
  async handler (request, reply) {

    const {username, password} = request.body

    const client = new faunadb.Client({
      secret: process.env.FAUNA_SERVER_SECRET
    });

    try {

      // Authenticate with Fauna
      const result = await client.query(
        Login(
          Match(Index('Users_by_username'), username),
          {password}
          )
        )

      // If the authentication was successful
      // return the secret to the client
      reply.send({
        secret: result.secret
      })

    } catch (error) {
      throw new FaunaError(error)
    }
  }
}
```

We are using the `Users_by_username` index with the `Login()` function that is destructured from the `faunadb.query` object instance. The `FAUNA_SERVER_SECRET` is passed to the client instance before authentication.

Once the username and password from the request body match, the user authentication should be completed successfully. This will return a server secret to make a future request for that user.

Let's try it out by making a POST request to `http://localhost:3000/login`. The JSON body of our request should be:

```JSON
{
  "username": "Winchy",
  "password": "supersecretpassword"
}
```

If this is successful, the API should return a response body with the user's secret:

```JSON
{
  "secret": "fnED7o254PACAAPuFGfOAAIDnuZTNlU5Z7dD3LdjPKycDCyUkeI"
}
```

The client is required to store the generated secret and use it for further requests to the API. More on this in the next route.

> This is a simple basic form of authentication. In your production applications, you should decide which authentication strategy works better for your use case. Always use HTTPS to interact with servers and third-party APIs.

### Retrieve a user document
Let's now create an endpoint to be that reads a single user.

Unlike our previous routes, we will make this a private route. The recommended way to use private routes in Fastify is using a hook. They act as custom bits of code that will be executed at certain points in the request/response lifecycle.

A hook is registered using the `.addHook` method which helps us interact and listen to events within Fastify's lifecycle.

Check the [Fastify docs](https://www.fastify.io/docs/latest/Hooks/) for more info on how to use them.

Our hook will first check if the `fauna-secret` header is present on all routes that we mark as private. A decorator is created by `fastify.decorateRequest` and lets Fastify know that our request object will be a subject modification.

The code to achieve this should be in the `index.js` file:

```js
fastify.addHook('onRequest', async (request, reply) => {

  // If the route is not private we ignore this hook
  if (!reply.context.config.isPrivate) return

  const faunaSecret = request.headers['fauna-secret']

  // If there is no header
  if (!faunaSecret) {
    reply.status(401).send()
    return
  }

  // Add the secret to the request object
  request.faunaSecret = faunaSecret
})

fastify.decorateRequest('faunaSecret', '')
```

If we happen use an invalid secret, Fauna should return an error response.

Add this to the `index.js` file before making a `GET` request:

```js
fastify.get('/users/:userId', require('./routes/get-user.js'))
```

Also create the `routes/get-user.js` file with the code:

```js
const faunadb = require('faunadb')
const FaunaError = require('../errors/FaunaError.js')

const {Get, Ref, Collection} = faunadb.query

module.exports = {
  config: {
    isPrivate: true
  },
  schema: {
    params: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: {
          type: 'string',
          pattern: "[0-9]+"
        }
      }
    }
  },
  async handler (request, reply) {

    const userId = request.params.userId

    const client = new faunadb.Client({
      secret: request.faunaSecret
    })

    try {

        // Get the user document
        const result = await client.query(
            Get(
                Ref(
                    Collection('Users'),
                    userId
                )
            )
        )

        // Return the document
        reply.send(result)

    } catch (error) {
        throw new FaunaError(error)
    }
  }
}
```

A brief code walkthrough:
- We import our fauna client and `FaunaError` class in our `get-user.js` file.

- We import the `Get`, `Ref`, and `Collection` methods from the `fauna.query` object for making queries to the Fauna database.

- We add the `isPrivate` property in the config section of our `GET` route to indicate that this route private for our hook.

- Also, the user secret provided is used to communicate with Fauna.

If we try this request on this route, we will get an error response since our user does not have permission to read the `Users` collection. A quick fix is to modify this like a new custom role in Fauna.

### Set up authorization in Faunadb
To configure the authorization using the dashboard, go to the `Security` section of the dashboard, on the `Roles` tab, click the `New Custom Role`. Assign it the name of `User`, add the collection of `Users`, and click on the Read permission to enable it:

![new custom role](/engineering-education/fastify-fauna-nodejs/read-privileges.png)
*Creating new custom roles*

Fauna will need to know who belongs to this role. Go back to the dashboard. Under the `Membership` tab, select the `Users` collection as a member of this role:

![membership](/engineering-education/fastify-fauna-nodejs/Usersmembercoll.png)
*Create new membership collection*

Any user who logs in with a token based on a document from the `Users` collection has the read permission on any document in that collection. My document ID from the previous user happens to be `301556533148254727`.

For your case, check the `ID` of the user by going back to the Collections section of the fauna dashboard and grab it from that document.

Before we make this HTTP request, we need to ensure that we add the user's secret (the one that we got after logging in our user) and add it into the custom `fauna-secret` HTTP header:

Now, we need to make a `GET` HTTP request to the endpoint `http://localhost:3000/users/301556533148254727`. The request should respond with the document `ID` in the URI:

```JSON
{
  "ref": {
    "@ref": {
      "id": "301556533148254727",
      "collection": {
        "@ref": {
          "id": "Users",
          "collection": {
            "@ref": {
              "id": "collections"
            }
          }
        }
      }
    }
  },
  "ts": 1606435813770000,
  "data": {
    "username": "Winchy"
  }
}
```

![get user](/engineering-education/fastify-fauna-nodejs/get-user.png)
*GET Request for fetching user details*

### Deleting a user
To make a delete request, first, we will need to add the permission that allows us to delete the `User` to the custom roles.

On the dashboard, go back to the `Security` section and modify the `Roles` on the `Users` collection to permit deletion requests. Save the modifications and add the `DELETE` HTTP route to our `index.js` file:

```js
fastify.delete('/users/:userId', require('./routes/delete-user.js'));
```

Finally create the `routes/delete-user.js` file and paste the code:

```js
const faunadb = require('faunadb')
const FaunaError = require('../errors/FaunaError.js')

const {Delete, Ref, Collection} = faunadb.query

module.exports = {
  config: {
    isPrivate: true
  },
  async handler (request, reply) {

    const userId = request.params.userId

    const client = new faunadb.Client({
      secret: request.faunaSecret
    })

    try {

      // Delete the user document
      const resultDelete = await client.query(
        Delete(
          Ref(
            Collection('Users'),
            userId
          )
        )
      )

      // Return the deleted document
      reply.send(resultDelete)

    } catch (error) {
      throw new FaunaError(error)
    }
  }
}
```

Our endpoint uses the `Delete` function from the `faunadb.query` object to match the `userId` passed as a parameter. Making `DELETE` request to `http://localhost:3000/users/301556533148254727` endpoint responds with the deleted document.

If we try to use a secret for a deleted user, we will get back a `401` error indicating that the request is unauthorized.

### Conclusion
The simplicity of the FaunaDB cloud database offers greate experience without sacrificing scalability and simplicity. It is a complete serverless, fast, and ACID-compliant database that will scale infinitly on the cloud without much hassle from the developer.

Fastify on the other hand offers a high performance and ludicrous speed in Node.js web servers. It's rich ecosystem of plugins ensures we do not reinvent the wheel.

Worrying about being developer friendly?

Well, just like Express, Fastify is simple and elegant with great logging system. What else can we ask for?

I hope you give it a try in your next Node.js project.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)