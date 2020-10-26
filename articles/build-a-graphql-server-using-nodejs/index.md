In present-day applications, where data plays a pivotal role, it becomes important to design systems that adapt to the ever-changing needs of the application. One of the primary functionalities of APIs(Application Programming Interfaces) are to be a consistent and reliable way to communicate between server and client. GraphQL is a game-changer in this field. 

Quoting the [official website](https://graphql.org/), 
> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

The article covers two primary aspects
- What is GraphQL and its basics
- Implement GraphQL server in Node.js

### What is GraphQL?


### Setup a GraphQL server in Node.js
This section of the article covers a walkthrough of how to make your own basic GraphQL server using Node.js. As already said earlier, GraphQL is language-agnostic and database-agnostic, and this is one of the many possible implementations of GraphQL. For the data, the example uses Javascript in-built arrays and objects for starting and then MongoDB for further steps.

If you are new to Node.js or MongoDB, it would be recommended to be acquainted with the basics of the same to get a better understanding. 

For reference, the entire GitHub repository, along with a deployed version of the project would be linked so that you can view and understand for further clarity.

#### Reference to get started with Node.js and MongoDB
- [Setup a server on Node.js using Express](https://www.section.io/engineering-education/express/)
- [Getting started with databases](https://www.section.io/engineering-education/working-with-databases-part1/)
- [Other Node.js references](https://www.section.io/engineering-education/topic/node.js/)

#### Initialize Project with Express

1. Create a folder for your project and open the folder in the text editor of your choice. 
2. Open a terminal in the project folder and initialize a Javascript project.  <br>
```npm init``` <br>
Follow the prompts on the terminal to create the project or if you want to suppress the prompts and create with the default configuration, use, <br>
```npm init -y```
3. Install Express via terminal. <br>
```npm i express```
4. Open ```index.js``` or the equivalent file as per the configuration you did while ```npm init```. By default it is ```index.js```.
5. Import Express and initialize it.<br>
```
const express = require('express');

const app = express();
```
6. Start server to listen at PORT 5000 or as per your preference. <br>
```
app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});
```
7. Add a root end-point for the server to respond to.<br>
```
app. use('/',(req,res) => {
    res.send("Welcome to GraphQL server. Use GraphQL endpoint at /graphql")
})
```
Once done, this is how the file would look.

![express-init](/engineering-education/build-a-graphql-server-using-nodejs/express-init.png)

8. Run the server.<br>
Throughout the setup, wherever "Run the server" is mentioned, you can do `node index.js` from the project folder or you can use a NodeJS process manager like nodemon or PM2 to make sure your server refreshes whenever your code updates. To stop a server started using `node index.js`, you can use CTRL/CMD+C. 

Once done, this is how the terminal window will look.

![express-init-terminal](/engineering-education/build-a-graphql-server-using-nodejs/express-init-terminal.png)

Once done, this is how the browser window will look.

![express-init-browser](/engineering-education/build-a-graphql-server-using-nodejs/express-init-browser.png)

#### Initialize GraphQL

1. Install GraphQL libraries for Javascript via terminal. <br>
```npm i express-graphql graphql``` <br>
graphql library provides the Javascript implementation of GraphQL. <br>
graphql-express library provides integration between Express server and GraphQL. 
2. Create a `schema` folder within the project folder and create a `schema.js` file inside it. <br>
3. Import `graphql` in `schema/schema.js` <br>
`const graphql = require('graphql');` <br>
GraphQL schema defines how various GraphQL queries and mutations are structured and inter-linked. Refer the Schema section in this article for a full explanation.
4. Import the required GraphQL Types. For the basic query we need `GraphQLObjectType, GraphQLString, GraphQLSchema`. Types in GraphQL are used to convert the Javascript datatypes and custom datatypes into GraphQL-friendly Types for compilation. <br>
`const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;`
5. Add a root query that will print `Welcome to GraphQL` when the query contains a field named `status`. The field `status` is of type `GraphQLString`. <br>
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
6. Export the query written above to be used in `index.js`. Export the query as GraphQLSchema Type so that GraphQL can parse it as its schema. The GraphQLSchema takes an object with key-value pairs. One of the keys is `query`. To this key, pass the above created `RootQuery` as value. We will be using the additional key-value pairs for GraphQLSchema in the further section of this article.
```
module.exports = new GraphQLSchema({
    query: RootQuery
});
```
7. Once done, this is how the file would look.

![graphql-init](/engineering-education/build-a-graphql-server-using-nodejs/graphql-init.png)

8. Import the schema in `index.js`. <br>
`const schema = require('./schema/schema');`

9. Add GraphQL endpoint to server. It is a common practice to add GraphQL endpoint to `/graphql` but this customisable as per requirement. To the GraphQL middleware, pass `graphqlHTTP` as the second argument in `app.use()`. `graphqHTTP` takes `schema` as a mandatory parameter. Pass the imported `schema` to `graphqlHTTP` with the key as `schema`. `graphqlHTTP` takes an optional parameter `graphiql`. If `graphiql` is set to `true`, it provides an in-browser GraphQL query tool.<br>
Refer the GraphiQL section in this article for a full explanation.<br>
```
app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }));  
```

Once done, this is how the file would look.

![graphql-init-2](/engineering-education/build-a-graphql-server-using-nodejs/graphql-init-2.png)

10. Run the server and open `http://localhost:5000/graphql` in the browser.<br>
Call the GraphQL server with the input as
```
{
  status
}
```
Click play and this is how the browser window will look.

![graphql-init-browser](/engineering-education/build-a-graphql-server-using-nodejs/graphql-init-browser.png)