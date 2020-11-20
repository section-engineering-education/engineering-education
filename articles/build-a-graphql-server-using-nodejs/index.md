---
layout: engineering-education
status: publish
published: true
url: /engineering-education/build-a-graphql-server-using-nodejs/
title: How to build a GraphQL Server Using Node.js
description: This tutorial will serve as a guide on the basics of GraphQL and will go over how we build a GraphQL server using Node.js.
author: abel-mathew
date: 2020-11-20T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-a-graphql-server-using-nodejs/hero.jpg
    alt: How to build a GraphQL Server Using Node.js image

---
Before we dive into the comparative study on the various methods used to authenticate users, it is necessary to answer one main question: Why does a website, app or service need to have login flow? Is it impossible to cater to the userbase without it?
<!--more-->
In present-day applications, data plays a pivotal role. It then becomes essential to design systems that adapt to the ever-changing needs of the application. One of the primary functionalities of an API (Application Programming Interfaces) is to be a consistent and reliable way to communicate between the server and the client. GraphQL is a game-changer in this field.

Quoting the [official website](https://graphql.org/),

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to develop APIs over time, and enables powerful developer tools.

This article will cover two primary aspects:

- What is GraphQL and its basics.

- Implementing a GraphQL server in Node.js.

### What is GraphQL?
GraphQL was internally developed by Facebook in 2012 and was later open-sourced to the public. As stated above, GraphQL is a query language for APIs. It gives the client the freedom to request only the data it needs from the server. It also helps in the aggregation of data in the response itself.

#### Features of GraphQL
- Query only specific fields and get the response from the server, hence saving on network bandwidth.

- Aggregation of data in a single request, thereby reducing network calls.

- It’s strongly typed and allows validation easily. Additionally, GraphQL IDE like GraphiQL autogenerates docs from the schema for reference.

![GraphQL Schema Docs](/engineering-education/build-a-graphql-server-using-nodejs/graphql-docs.png)

### Schema and Types
The schema in GraphQL is a description of how data is linked and its hierarchy. The schema defines a set of types and the relationships between those types. In our example, detailed in a further section below we have a blog built by using GraphQL, the two major types are `ArticleType` and `ContributorType`. The resolvers are used to populate these types with data from the database.

Be sure not to confuse between GraphQL schema and MongoDB schema. MongoDB schema is a representation of the database structure in MongoDB Atlas. It's used to do database operation from the server on the database. GraphQL schema defines how queries are linked to the data and also how queries are interlinked. Both these schemas have a dependency on each other but are not the same.

### Setting up a GraphQL Server in Node.js
This section of the article is a walkthrough on how to make your own basic GraphQL server using Node.js. As stated earlier, GraphQL is language-agnostic and database-agnostic.

This is one of the many implementations of GraphQL. For the data, the setup uses JavaScript in-built arrays and objects for initial steps and then MongoDB for further steps.

If you are new to Node.js or MongoDB, we recommend to get acquainted with the basics to get a better understanding.

For reference, the entire GitHub repository, along with a deployed version of the project would be linked so you can view and understand for further clarity.

#### Reference to get started with Node.js and MongoDB
- [Setup a server on Node.js using Express](/engineering-education/express/)
- [Getting started with databases](/engineering-education/working-with-databases-part1/)
- [Other Node.js references](/engineering-education/topic/node.js/)

#### Initialize project with Express
1. Create a folder for your project and open the folder in the text editor of your choice.

2. Open a terminal in the project folder and initialize a JavaScript project.

`npm init`

Follow the prompts on the terminal to create the project or if you want to suppress the prompts and create it with the default configuration, use:

`npm init -y`

3. Install Express via terminal.

`npm i express`

4. Open `index.js` or the equivalent file as per the configuration you did while `npm init`. By default, it's `index.js`.

5. Import Express and initialize it.

```
const express = require('express');

const app = express();
```

6. Start the server to listen at PORT 5000 or as per your preference.

```
app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});
```

7. Add a root endpoint for the server to respond to.

```
app. use('/',(req,res) => {
    res.send("Welcome to GraphQL server. Use GraphQL endpoint at /graphql")
})
```

Once done, this is what the file should look like:

![Initialize express.js](/engineering-education/build-a-graphql-server-using-nodejs/express-init.png)

8. Run the server. Throughout the setup, wherever "Run the server" is mentioned, you can do `node index.js` from the project folder, or you can use a NodeJS process manager like nodemon or PM2 to make sure your browser refreshes whenever your code updates.

To stop a server started using `node index.js`, you can use CTRL/CMD+C.

Once that is done, this is what the terminal window would look like:

![Initialize express.js via terminal](/engineering-education/build-a-graphql-server-using-nodejs/express-init-terminal.png)

This is what the browser window will look like:

![Express.js server in browser](/engineering-education/build-a-graphql-server-using-nodejs/express-init-browser.png)

#### Initialize GraphQL
1. Install GraphQL libraries for JavaScript via terminal.

`npm i express-graphql graphql`

`graphql` library provides the JavaScript implementation of GraphQL.

`graphql-express` library provides integration of Express server with GraphQL.

2. Create a `schema` folder within the project folder and create a `schema.js` file inside it.

3. Import `graphql` in `schema/schema.js`

`const graphql = require('graphql');`

GraphQL schema defines how various GraphQL queries and mutations are structured and inter-linked. Refer to the "Types and Schema" section in this article for a full explanation.

4. Import the required GraphQL types. For the basic query, we need `GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema`. Types in GraphQL are used to convert the JavaScript data types and custom datatypes into GraphQL-friendly types for compilation.

`const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema } = graphql;`

5. Add a root query that will print `Welcome to GraphQL` when the query contains a field named `status`.

The field `status` is of type `GraphQLString`.

```
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args){
                return "Welcome to GraphQL"
            }
        }
    }
});
```

6. Export the query written above to be used in `index.js`. Export the query as GraphQLSchema type so that GraphQL can parse it as its schema. The GraphQLSchema takes an object with key-value pairs. One key is `query`. To this key, pass the above created `RootQuery` as a value. We will use the additional key-value pairs for GraphQLSchema in the further section of this article.

```
module.exports = new GraphQLSchema({
    query: RootQuery
});
```

7. Once done, this is how the file would look.

![Initialize GraphQL Schema](/engineering-education/build-a-graphql-server-using-nodejs/graphql-init.png)

8. Import the schema in `index.js`.

`const schema = require('./schema/schema');`

9. Add GraphQL endpoint to the server. It's a common practice to add GraphQL endpoint to `/graphql` but this is customizable per requirements. To the GraphQL middleware, pass `graphqlHTTP` as the second argument in `app.use()`. `graphqlHTTP` takes `schema` as a mandatory parameter.

Pass the imported `schema` to `graphqlHTTP` with the key as `schema`. `graphqlHTTP` takes an optional parameter `graphiql`.

If `graphiql` is set to `true`, it provides an in-browser GraphQL query tool.

```
app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }));  
```

When done, this is how the file would look.

![Query Using GraphiQL Code](/engineering-education/build-a-graphql-server-using-nodejs/graphql-init-2.png)

10. Run the server and open `http://localhost:5000/graphql` in the browser.

Call the GraphQL server with the input as:

```
{
  status
}
```

Click play, and this is how the browser window will look.

<iframe width="478" height="269" src="https://www.youtube-nocookie.com/embed/uGMX8s7iFaw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The server can be queried via any GraphQL API client like Postman or in browser with GraphiQL.

![Query GraphQL API](/engineering-education/build-a-graphql-server-using-nodejs/graphql-init-query.png)

#### Adding basic queries
This section would use static data stored in arrays to be fetched via GraphQL server. In a later section, we will replace it with MongoDB.

1. Install the `lodash` library for JavaScript via terminal.
This library makes working with arrays and objects easy. To get a brief idea about Lodash, read this [EngEd article](/engineering-education/most-useful-nodejs-packages/) (Lodash is the fourth section of the article).

For more details, visit the [Lodash website](https://lodash.com/).

`npm i lodash`

2. Open `schema/schema.js` and import the `lodash` library.

`const _ = require('lodash')`

3. Import the required GraphQL types. To fetch and show the data for the query we need `GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema`.

`const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema } = graphql;`

4. Add static data. This will be replaced with MongoDB later. The data consists of `articles` and `contributors`. An article is written by a contributor. A contributor can have more than one article written under their name. Both articles and contributors have ID to identify them uniquely. Articles have `contributorId` to identify the contributor.

```
let articles = [
    { name: 'The History of Node.js', topic: 'Node.js', date: '2020-08-25T00:00:00Z', id:"1", contributorId:"1"},
    { name: 'Understanding Docker Concepts', topic: 'Containers', date: '2020-07-23T00:00:00Z', id:"2", contributorId:"2"},
    { name: 'Linting in Node.js using ESLint', topic: 'Node.js', date: '2020-08-24T00:00:00Z', id:"3", contributorId:"2"},
    { name: 'REST APIs - Introductory guide', topic: 'API', date: '2020-06-26T00:00:00Z', id:"4", contributorId:"1"},
];

let contributors = [
    { name: 'John Doe', url: '/john-doe', major: 'Computer Science', id:"1"},
    { name: 'Jane Doe', url: '/jane-doe', major: 'Physics', id:"2"},
];
```

5. Create a user-defined `GraphQLObjectType` for articles and authors, and these would be re-used in code. The ID field is of type `GraphQLID` and the rest as `GraphQLString`.

```
const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        topic: { type: GraphQLString },
        date: { type: GraphQLString },
        contributorId: { type: GraphQLID },
    })
});

const ContributorType = new GraphQLObjectType({
    name: 'Contributor',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
        major: { type: GraphQLString },
    })
});
```

6. Update the `RootQuery` to add `article` and `contributor` to query. As `ArticleType` and `ContributorType` is already declared, it can be directly used here. Both the fields should take an argument for ID which would query the data. The argument is of type `GraphQLID` and can be referenced in `resolve(parent, args)` function by `args.id`. `lodash` is used to find articles and contributors that match `args.id`.

```
article: {
    type: ArticleType,
    args: {id:{type: GraphQLID}},
    resolve(parent,args){
        return _.find(articles,{'id':args.id})
    }
},
contributor: {
    type: ContributorType,
    args: {id:{type: GraphQLID}},
    resolve(parent,args){
        return _.find(contributors,{'id':args.id})
    }
}
```

7. Run the server to it in action.

8. To have data inter-linked in GraphQL, we need to modify the `ArticleType` to include full contributor's info of the article and also show a list of articles published by the contributor with `ContributorType`.

This can be done by adding `contributor` field of type `ContributorType` inside `ArticleType`. As this will be a nested query, details about `contributorId` can be fetched in `resolve(parent,args)` by `parent.contributorId`.

The modified `ArticleType` would look like:

```
const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        topic: { type: GraphQLString },
        date: { type: GraphQLString },
        contributorId: { type: GraphQLID },
        contributor:{
            type: ContributorType,
            resolve(parent,args){
                return _.find(contributors,{id:parent.contributorId})
            }
        }
    })
});
```

9. Do a similar step for `ContributorType`. A contributor can have multiple `articles`, hence the `articles` field under `ContributorType` should be a `GraphQLList` of type `ArticleType` as `ArticleType` is only for one article.

The `filter()` function in `lodash` is used to return data that match the filter.

The modified `ContributorType` would look like:

```
const ContributorType = new GraphQLObjectType({
    name: 'Contributor',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
        major: { type: GraphQLString },
        articles:{
            type: new GraphQLList(ArticleType),
            resolve(parent,args){
                return _.filter(articles, {contributorId:parent.id})
            }
        }
    })
});
```
10. Once done, this is how the file would look:

![Write GraphQL Query](/engineering-education/build-a-graphql-server-using-nodejs/graphql-query.png)

11. Run the server and open `http://localhost:5000/graphql` in the browser.
Call the GraphQL server with the input query to test. Below is an example query. Notice how GraphQL response only shows the fields that are queried and not every field.

![Run GraphQL Query In Browser](/engineering-education/build-a-graphql-server-using-nodejs/graphql-query-browser.png)

#### Using MongoDB as a database
This section would replace the stored static data with MongoDB Atlas instance.

1. Install the `mongoose` and `dotenv` libraries for JavaScript via the terminal.
`mongoose` facilitates the Node.js server to connect with MongoDB and complete the database operations.
`dotenv` loads the environment variables from a `.env` file into `process.env` to be used in code. This is more secure than directly using secrets in code. Don't push environment variables to public domains.

`npm i mongoose lodash`

2. Get the MongoDB connection URL with username and password from MongoDB Atlas and add it to `.env`. Use the variable named as `MONGODB_URL`.

It would look similar to this after adding.
`MONGODB_URL=mongodb+srv://admin:<password>@cluster0.uqhv0.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`

3. Import the `mongoose` library in `index.js` and connect to MongoDB using the URL from the environment variable.

```
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB")
})
```

Once done, this is how the file would look like:

![Connect GraphQL To MongoDB](/engineering-education/build-a-graphql-server-using-nodejs/graphql-mongo-connect.png)

4. Create `models` folder to store database schema. Create `article.js` for `articleSchema`. Import `mongoose` and initialize `mongoose.Schema`. The schema doesn't need a definition of `id` field as MongoDB by default creates an `_id` field for all documents. Export the model by passing it `articleSchema` as the parameter. This model would be used to interact with the collection from the server.

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const articleSchema = new Schema({
    name: String,
    topic: String,
    date: String,
    contributorId:String
})
module.exports = mongoose.model('Article',articleSchema);
```

Do a similar step for `contributor.js` by creating the file in `models`.

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const contributorSchema = new Schema({
    name: String,
    url: String,
    major: String
})
module.exports = mongoose.model('Contributor',contributorSchema);
```

5. The models are now ready for the server to directly interact with the database. To use them in GraphQL, replace the `lodash` reference with equivalent `mongoose` functions after importing the models.

```
const Article = require('../models/article');
const Contributor = require('../models/contributor');
```

- Replace `return _.find(contributors,{'id':args.id})` with `return Contributor.findById(args.id)`
- Replace `return _.filter(articles, {contributorId:parent.id})` with `return Article.find({contributorId:parent.id})`
- Replace `return _.find(articles,{'id':args.id})` with `return Article.findById(args.id)`
- Replace `return _.find(contributors,{id:parent.contributorId})` with `return Contributor.findById(parent.contributorId)`

6. The project is now fully configured to read from MongoDB via GraphQL queries. The MongoDB database doesn't have any data now, and if it runs the server, it would not give intended results. The next section will add the functionality to write to MongoDB via GraphQL. The code at this state can be tested by adding data to MongoDB manually via MongoDB Atlas dashboard, MongoDB Compass or mongoshell.

#### Setting up GraphQL mutations
GraphQL Mutation is used to modify the data. Just like in queries, if the mutation function can return data. This is useful to fetch the latest information stored in the database after the mutation operation.

1. Import the `GraphQLNonNull` GraphQL type in `schema/schema.js`. This is useful to make sure that the fields in mutations are not left empty.

`const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql;`

2. Similar to `RootQuery`, define `Mutation` as the type `GraphQLObjectType`. Add two fields, one to add articles and another to add a contributor.

3. Write a field `addArticle` of type `ArticleType` to add an article to the database. The type is wrapped with `GraphQLNonNull` to make sure the fields aren't left empty when queried.

The `resolve()` function within the field modifies the data. Create a temporary variable of type `Article` from MongoDB model and use `args` from `resolve(parent,args)` to populate the fields.

The `save()` function as part of `mongoose` is used to write data to the database. On success, it returns an instance of the saved data that is returned to the `resolve()` function.

```
addArticle: {
    type: ArticleType,
    args: {
        name:{type: new GraphQLNonNull(GraphQLString)},
        topic:{type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)},
        contributorId: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve(parent,args){
        let article=new Article({
            name: args.name,
            topic: args.topic,
            date:args.date,
            contributorId:args.contributorId
        })
        return article.save();
    }
},
```

4. Do a similar step to add contributors.

```
addContributor: {
    type: ContributorType,
    args: {
        name:{type: new GraphQLNonNull(GraphQLString)},
        major:{type: GraphQLString},
        url: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parent,args){
        let contributor= new Contributor({
            name:args.name,
            major:args.major,
            url:args.url
        })
        return contributor.save();
    }
}
```

5. Export the `Mutation` in `module.exports` along with the query. This would make the mutations accessible from GraphQL endpoint.

```
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
```

When done, this is how the file would look:

![Write Mutation In GraphQL](/engineering-education/build-a-graphql-server-using-nodejs/graphql-mongo-mutation.png)

6. Run the server to see it in action. Now the server should be able to write and read from MongoDB through GraphQL queries and mutations.

The video below shows how the server is intended to work.

<iframe width="478" height="269" src="https://www.youtube-nocookie.com/embed/jehG685TZkM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Using a GraphQL server in production
The above example illustrates the basics of GraphQL, but there are some best practices to be followed to make sure the code is optimized and secure.

#### Nesting queries cautiously
Although GraphQL allows nesting, reducing the depth of nested queries optimizes the query response time. A nested query depth limit is recommended to limit the client from sending deeply nested queries.

#### Optimizing database queries
Although GraphQL is a query language for APIs, that doesn't mean that database queries and structure shouldn't be optimized. Having inefficient database queries and design puts unnecessary load on the database server and increases network bandwidth.

##### Example
**Scenario**
There is a field to fetch the latest three articles from the database.

**Case 1**
Query database for all articles and filter the latest three articles on GraphQL server.

**Case 2**
Query database for the latest three articles specifically.

Case 2 is a better option as it reduces network bandwidth and allows for a faster response time.

### Final Note
Having gained an understanding on how we build a GraphQL server using Node.js, I hope you are better equipped to develop your GraphQL server. To gain a more detailed insight we recommend any further reading, follow-up on the keywords (listed in the article and in the section below) used here by doing a web search. Make sure you are always staying up to date with recent articles and updates to have an optimized and secure API server.

**Keywords**: Apollo GraphQL, nodes and edges in GraphQL, caching in GraphQL, access control in GraphQL, Relay by Facebook.

I have included a linked to the code and a demo of the example above, down below as references. It’s for demonstration and should not to be used in any production code.

- Codebase for the example above https://github.com/DesignrKnight/graphlql-blog
- Project demo for the example above https://graphql-blog-demo.herokuapp.com/graphql
