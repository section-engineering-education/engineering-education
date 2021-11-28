---
layout: engineering-education
status: publish
published: true
url: /how-to-build-graphql-apis-with-expressjs-and-typescript/
title: How To Build GraphQL APIs with ExpressJS and Typescript
description: GraphQL is a query language for APIs and a runtime for fulfilling those queries with existing data. It's an API specification like REST, but with GraphQL, we can use one query to get all we need.
author: babatunde-koiki
date: 2021-11-15T00:00:00-07:00
topics: ['typescript', 'graphql', 'expressjs', 'mongodb']
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/hero_600x400.png
    alt: graphql, mongodb, express js and typescript
---

## Introduction

In this article, you will learn how to build a graphQL API in express JS, and you’ll also learn how to connect your API to a database system, in this case, MongoDB, and we’ll be using Mongoose as a wrapper for MongoDB. Finally, I will convert the codebase to Typescript.

![gql](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/graphql-query.png)

GraphQL is an API specification similar to the REST and SOAP specification. But in GraphQL, all requests have the same HTTP method, POST, and a single URL endpoint. You can check their official docs [here](https://graphql.org/). Now that you have an idea of GraphQL, you might be thinking, why so much noise about it? Why can’t we stick to REST? The following reasons don't mean that the REST or SOAP specifications are obsolete. They only highlight areas in which GraphQL shines, which doesn’t mean REST will go.

1. Your API is accessed just from one endpoint. Say you have a books collection. The client will use the same URL to access all books in the books collection, a single book in the books collection, etc. This makes it possible to get multiple resources in a single request; that’s cool, right?
2. GraphQL also allows us to ask for exactly what we need. Let’s say we want to get all books created by a user in a standard REST API. We can access that by going to `api/v1/users/books/`, and we get an array of books. But in a situation where we need the book title of each Book, then the API is giving us more than we need or if, for example, we want to create a new book. We send a post request to `api/v1/users/books/` if everything should work fine; we do not want to start requesting for what we already have. Instead, we should request things we do not have, like the `_id` of the Book. But with GraphQL, we can query all books and get just the title of each Book. We can do something like what we have below, and the server will return an array of Books with just the title field in it.

```graphql
{
    books {
            title
    }
}

```

### GraphQL Queries

GraphQL queries are used to perform read operations on the server, basically, things you will typically do with a GET request.

![gql queries](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/sample-gql-query.png)

### GraphQL Mutations

GraphQL mutations are typically used to perform write operations on the server, which we will typically do using a POST, PUT, DELETE in a REST architecture.

![gql mutations](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/sample-gql-mutation.png)

### GraphQL subscriptions

If you’re familiar with WebSockets, then you’d like GraphQL subscriptions. GraphQL subscriptions are used to create real-time events and connections.

![gql subscriptions](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/sample-gql-subscription.png)

### GraphQL Schema

A schema is used to define the kind of data that our graphQL API expects and the kind of data it gives back to the client. It can also serve as documentation to people using our API. So we may not even have to write documentation for our API again. This also helps with data validation as GraphQL will parse the request and return an error if the client’s data does not match what the server is expecting.

![gql schema](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/sample-gql-schema.png)

You can check the GraphQL [docs](https://graphql.org/) to learn more about what graphQL is.

## Building The GraphQL API

Now that we know what GraphQL is all about, let's discuss how we can use this specification to build a simple API. I’m assuming that you have a basic understanding of express JS; you can check out [this](https://codeforgeek.com/express-nodejs-tutorial/) article if you don’t.

### Getting started - Installing Deps And Setting Up The Project

Firstly, we will create a book API to create books, update books, delete books, get all books, and get a single book. We’d need to create our project and set it up. Let’s name the api `bookrr`. Create a new npm project and give it the name bookrr. Your project structure should look like what we have below.

![project structure](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/project-structure.png)

Next, add your start script to your `package.json` file`.

```JSON
“start”: “node server.js”
```

Finally, we need to install our dependencies.

```bash
npm i express express-graphql dotenv graphql
```

We need [express](https://www.npmjs.com/package/express) to run the server and manage routes, [express-graphql](https://www.npmjs.com/package/express-graphql) to create our schema and the handler for the route. GraphQL is what we use to build our schema and [dotenv](https://www.npmjs.com/package/dotenv) to access environment variables.

### Creating Boilerplate Code

Let’s start coding. Add the following app setup to your `server.js` file.

```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, resolver } = require('./api/schema');
const envs = require('./envs');

const app = express();
app.use(express.json());

app.use(
    envs.graphqlPath,
    graphqlHTTP((request, response, graphQLParams) => ({
        schema,
        rootValue: resolver,
        graphiql: true,
        context: {
            request,
            response,
        },
    }))
);

app.listen(envs.port, () => {
    console.log(`Server is running at http://localhost:${envs.port} ${envs.graphqlPath}`);
});

```

The first four lines are where we import all the dependencies for this file. We start by importing `express`, then import `graphqlHTTP` object from `express-graphql`, which is concerned with making our handler a GraphQL handler. It takes in a callback function with three parameters, `request`, `response`, and `graphQLParams`, and we return an object with the `schema` of our API. The `root` is what our API returns based on the Query or the mutation, `graphiql`, which tells GraphQL to make our API have a web client where we can test it on the browser and finally, the `context` object.

I also created an `envs.js` file; this is a personal preference. I like having a file that does one thing and encapsulates it. In this file, I exported all the environment variables that I’d be creating for this app, and I can import them anywhere I need them. For now, they’re just `PORT` and `GRAPHQL_PATH`. So my `envs.ts` file will look like what we have below.

```javascript
const { config } = require( 'dotenv');

config();

module.exports = {
    port: process.env.PORT || 3000,
    graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
}

```

Line 9 - 20 is where most of the magic happens. I created a route for our GraphQL code and used `graphqlHTTP` to create the handler for the route. If we run the app now, we’d get errors as we haven’t defined `schema` and `root`.

### API Schema

Create a folder called `schema` in your root folder, and create the following files `schema.js`, `mutation.js`, `query.js`, and `index.js`. `types.js` is where we will write the app schema both for response and inputs will be written, while `query.js` is where,  `mutation.js` is where we will write the resolver for mutations, and `index.js` imports these files and exports `schema` which is from `types.js` and `resolver` which combines `query.js` and `mutations.js`.

In your `schema.js`, add the following.

```javascript
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        books(limit: Int): [Book]
        book(id: ID!): Book
    }
    type Mutation {
        addBook(title: String!, author: String!, description: String!): BookResponse
        updateBook(id: ID!, title: String, author: String, description: String): BookResponse
        deleteBook(id: ID!): BookResponse
    }
    type Book {
        id: ID!
        title: String!
        author: String!
        description: String!
    }
    type Books {
        books: [Book]
    }
    type BookResponse {
        data: Book
        error: String
        ok: Boolean
    }
`);

module.exports = schema;

```

![buildSchema](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/build-schema-docs.png)

If you hover on `buildSchema`, you should see what we have above. The only required parameter is a string which is the schema of our application. But what if we have an extensive application with a lot of mutations, queries, and types? Then, it won’t be a great idea to use this. In such a case, you can always use apollo graphql, which is out of the scope of this article. The schema has the following: Query, Mutation, and some other types: ` Book` and `Books`.

The Query contains `books` and `book`, which denotes all books and a single book. We add an optional parameter for the books query: limit ( a number), which limits the output. The `book` query takes in `ID`, which is used to search for the requested Book.

The Mutation contains `addBook`, `updateBook` and `deleteBook`. The data inside the bracket defines the Query or mutation’s input type.  They all have the same response type, `Book` since we’re dealing with a single book.

The `Book` defines the structure of a single book, and `[Book]` defines books as an array of `Book`. Note that an exclamation mark means the field is required. This means all input for our mutation is required. Now that we have all our schema set, now is the time to start writing our resolvers.

### The GraphQL Query Resolver

In your `query.js` file, type the following.

```javascript
const booksData = require('./data')

const query = {
    books: async ({limit}, context) => {
        return limit ? booksData.slice(0, limit) : booksData;
    },

    book: async ({id}, context) => {
        return booksData.find(book => book.id === id);
    }

};

module.exports = query

```

Inside the `query.js` file, we export an object with two functions, `books` and `book`, which we define inside our `Query` in our schema. Each of these functions has two parameters. According to the schema, the first is the args that I destructure to be what I expect. The second parameter is the context object, which contains details of our request. Remember that in our `graphQLHttp` function, we returned `context` and `response` as our context. Also, since we’re working with dummy data, I created a `data.js` where I’m storing books now(I will remove this when we integrate our database). Your `data.js` file should look like this.

```javascript
module.exports = [
    {
        id: "1",
        title: "Building Data-Intensive Applications",
        description: "The big ideas behind reliable, scalable and maintainable systems",
        author: "Martin Kleppmann"
    },
    {
        id: "2",
        title: "Docker In Action",
        description: "Docker in action teaches you everything you need to know in docker",
        author: "Jeff KleNickoloffppmann"
    },
    {
        id: "3",
        title: "The Art of Unit Testing",
        description: "The Art of Unit Testing teaches you everything you need to know in unit testing",
        author: "Roy Osherove"
    },
    {
        id: "4",
        title: "Site Reliability Engineering",
        description: "How Google runs production systems",
        author: "Betsy Beyer"
    }
]

```

### The GraphQL Mutation Resolver

We also need to create our mutation. In your `mutation.js` file, add the following:

```javascript
let books = require('./data')

const mutation = {
    addBook: async ({ title, author, description }, context) => {
        const book = { id: `${books.length+1}`, title, author, description }
        books.push(book)
        return {
            data: book,
            ok: true,
            error: ''
        };
    },

    updateBook: async ({ id, title, author, description }, context) => {
        const book = books.find(book => book.id === id);
        if (!book) {
            return {
                data: null,
                ok: false,
                error: 'Book not found'
            };
        }

        if (author) book.author = author
        if (title) book.title = title
        if (description) book.description = description
        books = books.map(b => b.id === id ? book : b)
        return {
            data: book,
            ok: true,
            error: ''
        };
    },

    deleteBook: async ({ id }, context) => {
        const book = books.find(book => book.id === id)
        if (!book) {
            return {
                data: null,
                ok: false,
                error: 'Book not found'
            };
        }

        books = books.filter(book => book.id !== id)
        return {
            data: book,
            ok: true,
            error: ''
        };
    }
};

module.exports = mutation

```

The mutation is similar to the Query, but instead of performing read operations, we’re also performing write operations as expected. We specified that we would return `data`, `ok`, and `error` in our schema instead of just `book`.

The last thing that needs to be done before we can run our application now is to add some data to our `schema/index.js`.

Add the following to your `schema/index.js` file.

```javascript
const schema = require('./schema.js');
const query = require('./query.js');
const mutation = require('./mutation.js');

const resolvers = {
    ...query, ...mutation,
};

module.exports.resolver = resolvers;
module.exports.schema = schema;

```

Here, we have to create a schema object from our `schema` file and a `resolver` object from our `query` and `mutation` files. The `rootValue` object in our `graphQLHttp` in the `server.js` file expects a single object containing all resolvers for our schema. Still, we have them separated into two different files, `query` and `mutation`, so we need to spread them into a single object. Now we have everything required to run our application. Run your application with `npm start` now go to `http://localhost:3000/graphql` you should see the following:

![gql server](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/graphql-server.png)

If you click on docs, you will view the docs for both Query and mutation.

Now let’s test our API. First, let’s get all books.

![books query](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/books-query.png)

As you can see, we didn’t include description in our response data, so it wasn’t part of our response. Let’s query a single book, and then we’d make two queries at the same time.

![book query](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/single-book-query.png)

![books and book query](/engineering-education/how-to-build-graphql-APIs-with-expressjs-and-typescript/multiple-queries.png)

Next, let us test our mutations.

![create and update book mutation](/engineering-education/how-to-build-graphql-APIs-with-expressjs-and-typescript/add-update-book-mutation.png)

From the images above, we created a new book and updated an existing book; if the book does not exist, we get a book not found error. As we can also see, we were able to create multiple mutations at the same time. But the only limitation we have is that we can not create a query and mutation together. Finally, let’s try to delete a book.

![delete book mutation](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/delete-book-mutation.png)

If we pass invalid data, the request won’t even get to our code as GraphQL will handle the validation.

## Integrating Database To Our API

This section deals with adding MongoDB and Mongoose to our application. You can use a remote [MongoDB](https://www.mongodb.com/cloud/atlas/register) database if you don't have MongoDB locally. If you want to play around with MongoDB, you can try out MongoDB queries with test data on this [website](https://www.humongous.io/app/playground/mongodb).

Create a folder called `db` in the root folder of your application and create the following files `books.js`, `index.js`, `dbUtils.js`, and `connect.js`.

In your `books.js` file, add the following.

```javascript
const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

module.exports = new model('Books', bookSchema);

```

Here we created the schema of our book model, and we exported the book model.

In your `connect.js` file, add the following.

```javascript
​​const mongoose = require('mongoose')
const envs = require('../envs')

mongoose.connect(envs.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection

```

Here we used the `mongoose.connect` function to connect to our database. We need to add another value to our `envs.js` file. Now your `envs.js` file should look like the one below.

```javascript
const { config } = require('dotenv');

config();

module.exports = {
    port: process.env.PORT || 3000,
    graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/graphql-starter',
}

```

Finally, we must add the two exported objects in the `db` folder to `db/index.js`.

```javascript
const db = require('./connect');
const BookModel = require('./books');
const books = require('./dbUtils');

module.exports = {
    db,
    BookModel,
    books
};

```

We need to use this connection in our `server.js` file. We do this by importing the db object then using the `db.once` and `db.on` methods. Add the following just after the last import in your `server.js` file.

```javascript
const { db } = require('./db');
db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
    process.exit(1);
});

```

Now, we need to add helper functions that we will use to perform all the operations that we need to use to talk to the database, as this will make the logic of our queries and mutations neater. This will be done in the `dbUtils.js` file in your `db` directory. Add the following inside this file.

```javascript
const BookModel = require('./books');

const getAllBooks = async (limit) => {
    return await BookModel.find({}).limit(limit);
}

const getBookById = async (id) => {
    return await BookModel.findById(id);
}

const createBook = async ({ title, description, author }) => {
    return await BookModel.create({ title, description, author });
}

const updateBook = async (id, { title, description, author }) => {
    const set = {};
    if (title) set.title = title;
    if (description) set.description = description;
    if (author) set.author = author;
    return await BookModel.findByIdAndUpdate(id, set);
}

const deleteBook = async (id) => {
    return await BookModel.findByIdAndDelete(id);
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}

```

This file is straightforward; we have functions to get all books, get a book by id, create a new book, update a book and delete a book. All we need to do now is to use these functions. Update your `query.js` file to use this function instead. Your `query.js` file should now look like this.

```javascript
// const booksData = require('./data')
const { books} = require('../db/')

const query = {
    books: async ({limit}, context) => {
        // return limit ? booksData.slice(0, limit) : booksData;
        return await books.getAllBooks(limit)
    },

    book: async ({id}, context) => {
        // return booksData.find(book => book.id === id);
        return await books.getBookById(id)
    }
};

module.exports = query

```

Similarly, update your `mutation.js` file to look like the following.

```javascript
// let books = require('./data')
const { books } = require('../db')

const mutation = {
    addBook: async ({ title, author, description }, context) => {
        try {
            const book = await books.createBook({ title, author, description })
            // const book = { id: `${books.length+1}`, title, author, description }
            // books.push(book)
            return {
                data: book,
                ok: true,
                error: ''
            };
        } catch (error) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    },

    updateBook: async ({ id, title, author, description }, context) => {
        // const book = books.find(book => book.id === id);
        // if (!book) {
        //     return {
        //         data: null,
        //         ok: false,
        //         error: 'Book not found'
        //     };
        // }
        // if (author) book.author = author
        // if (title) book.title = title
        // if (description) book.description = description
        // books = books.map(b => b.id === id ? book : b)
        try {
            const book = await books.updateBook(id, { title, author, description })
            if (!book) {
                return {
                    data: null,
                    ok: false,
                    error: 'Book not found'
                };
           }
            return {
                data: book,
                ok: true,
                error: ''
            };
        } catch (error) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    },
    deleteBook: async ({ id }, context) => {
        // const book = books.find(book => book.id === id)
        // books = books.filter(book => book.id !== id)
        try {
            const book = await books.deleteBook(id)
            if (!book) {
                return {
                    data: null,
                    ok: false,
                    error: 'Book not found'
                };
            }
            return {
                data: book,
                ok: true,
                error: ''
            };
        }
        catch (error) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    }
};

module.exports = mutation

```

Now, we can start testing our application.

![books query db](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/all-books-query-mongo.png)

![add books mutations](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/multiple-addbook-mutation-mongo.png)

If we want to create the same mutation multiple times, we need to use an alias. This is done by giving each mutation a unique name. Using the `books` and `book` Query, we can get all the books and a single book.

![books and book queries](/engineering-education/how-to-build-graphql-APIs-with-expressjs-and-typescript/books-book-query-mongo.png)

Lastly, let’s test the `updateBook` and `deleteBook` mutations.

![update and delete book mutation](/engineering-education/how-to-build-graphql-APIs-with-expressjs-and-typescript/update-and-delete-book-mutations-mongo.png)

If we run these mutations one more time, the `deleteBook` mutation will return Book not found error.

## Migrating To TypeScript

I love building my applications with TypeScript instead of JavaScript, as TypeScript makes many things easier for me. Now seems to be a good time to migrate our code to TypeScript. If you are not familiar with Typescript, you can check the official docs [here](https://www.typescriptlang.org/docs/).

We start by installing Typescript as a dev dependency. Then we need to set up Typescript in our project by running `tsc --init`. This command will generate a `tscconfig.json` file for us. Inside the file set the `rootDir` value to `./` and `outDir` value to `./dist` also you can uncomment the `allowJs` line. The `rootDir` option tells Typescript how to find your source(Typescript) files. The `outDir` option tells Typescript where to put the compiled files. The `allowJs` option tells Typescript to compile JavaScript files as well.

In your `package.json` file, add the following to your `scripts` section.

```json
    "build": "tsc",
    "start": "node dist/server.js",
    "build:watch": "tsc --watch",
    "dev": "nodemon dist/server.js"
```

Next, we need to change all our file names from, say, `xxx.js` to `xxx.ts`

![project structure](/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/ts-project-structure.png)

If we try to compile our Typescript code, we should have a couple of errors, the remaining part of this article will be concerned with fixing these type errors. We also need to install type definitions for our project. This helps Typescript get the data type of functions and objects that will be used in the codebase.

```bash
npm i @types/express @types/mongoose @types/express-graphql @types/dotenv @types/graphql -D
```

We also need to install `nodemon` to run our application in development mode.

```bash
npm i nodemon -D
```

 We need to convert all our `require` to `import` statements and our `module.exports` to `export default`. The complete typescript source code can be seen [here](https://github.com/Babatunde13/bookrr). All I had to do to fix the errors was add types and interfaces to the codebase, change all `require` to `import` statements, create interfaces(or types) for my database schema and other objects.

To run the app, we need to first to compile our code. We can do that by running `npm run build` or `npm run build:watch` if we want to run the code in watch mode. Then to start the server, we need to run `npm start` or  `npm run dev` to run it in watch mode. Everything should work as expected now. And our API should work as expected.

## Conclusion

This article has walked you through building a simple graphQL API with database support. If you have any questions, you can reach out to me via [Twitter](https://twitter.com/bkoiki950). The source code is available [here](https://github.com/Babatunde13/bookrr).

Moving forward, now that we have our API up and running, what we might want to do next is to add an authentication middleware or just a way to add middlewares to our `request` object. You can check [this](https://graphql.org/graphql-js/authentication-and-express-middleware/) part of GraphQL documentation for that. You might also want to [dockerize](https://www.bezkoder.com/docker-compose-nodejs-mongodb/) your application and deploy it to [AWS](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html) or [Heroku](https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku).

The way I structured the `schema` is suitable even for large applications; let’s take, for instance, an application with queries and mutations for `users`, `books`, `authors` etc. We need to destructure all the mutations and queries in the `resolver` object inside the `schema/index.js` file, but our `schema` will be in one file, which can be a pain in the ass as the app grows large. But we can even implement that easier with [apollo graphql](https://www.apollographql.com/docs/apollo-server/).
