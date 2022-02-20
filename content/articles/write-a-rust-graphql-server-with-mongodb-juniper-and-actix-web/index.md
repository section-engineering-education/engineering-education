GraphQL is an open-source query language. It is intuitive and well-designed for building APIs. It is built around HTTP to receive resources from a server. 

GraphQL gives you a single endpoint that allows you to determine what data you get back based on the query that you send to that endpoint. Therefore, it is a more flexible way to interact with your server than a REST API.

A REST API is based on executing different endpoints to get specific data, returning extra information that is not required. However, with GraphQL API, you only get data specified in a GraphQL query. This way, you only make a single request to the server that queries different resources and return the data you need. 

This article aims to introduce Rust developers to the concept of GraphQL by building a fully-functional application using GraphQL, Rust programming language, and MongoDB database.

### Pre-requisites
To follow along with this article, it is helpful to have the following:
- [MongoDB](https://www.mongodb.com/try/download/community) installed on your computer.
- How to use MongoDB database.
- [Rust compiler](https://www.rust-lang.org/tools/install) installed on your computer.
- Basic knowledge working with GraphQL, Rust, Juniper, and Actix framework.

### Setting up the application
Run the following command to confirm that you have Rust installed:

```bash
cargo -v
```

If you do not get the current version of Rust, consider installing Rust before proceeding with this tutorial.

Next, create a project directory, then launch a terminal that points to the created project directory. Finally, run the following command to initialize the Rust template project:

```bash
cargo init
```

Test the default template project created by running the following command:

```bash
cargo run
```

The project will build and then log the `Hello, world!` text, implying that your Rust application is well set.

You will need a couple of dependencies to set up a Rust server and communicate with the MongoDB database. These dependencies include:

- [Actix-Web framework](https://crates.io/crates/actix-web) to set up and manage a Rust HTTP server.
- [Dotenv](https://crates.io/crates/dotenv) to connect to a MongoDB database, you will need to set up environment variables that host the MongoDB connection parameters, such as MongoDB connection URL. Dotenv is used to load the environmental variables to project files.
- [Features](https://doc.rust-lang.org/cargo/reference/features.html) for handling asynchronous calls to MongoDB.
- [MongoDB](https://crates.io/crates/mongodb). You need a MongoDB driver to communicate between the GraphQL server and the MongoDB database.
- [serde_json](https://crates.io/crates/serde_json). When sending data to MongoDB, you need to serialize it to JSON format. In this case, use serde_json to get the GraphQL API requests and convert the data being sent into JSON format.
- [Juniper framework](https://docs.rs/juniper/latest/juniper/). This is a GraphQL server framework for the Rust programming language. Juniper will help you write a GraphQL server in Rust. It provides type-safe GraphQL APIs and convenient schemas definitions for Rust.
- [Tokio](https://crates.io/crates/tokio) for handling asynchronous calls.

To use the above dependencies, make sure they are available in your project. Navigate to the `Cargo.toml` file in the project root directory and update is as follows:

```Rust
[dependencies]
juniper = "0.13.1"
dotenv = "0.9.0"
serde_json = "1.0"
actix-web = "1.0.0"
serde = { version = "1.0", features = ["derive"] }
[dependencies.mongodb]
tokio = { version = "0.2", features = ["full"] }
futures = "0.1"
version = "2.1.0"
features = ["sync"]
default-features = false
```

Then install the dependencies by running the following command:

```bash
cargo run
```

### Setting up the schema
A schema is a collection of fields specific to a data object. It defines the GraphQL API blueprint. A schema also defines types such as query and mutation. 

Query and mutation are requests a client makes to access the API data. A query type sets the API read operation. 

It is commonly known as the GET request, especially using the REST approach. A mutations type sets the API-write operations, such as POST and PUT requests.

To set up these types and fields, head over to your project `src` directory and create a `schema.rs` file. This file will define the Todo fields, query, mutation, and handle the connection to the database. 

First, import `RootNode` from `juniper`. This module will help you use juniper to write the GraphQL schema.

```rust
use juniper::{RootNode};
```

Define the schema of the Todo fields:

```Rust
struct Todo {
    id: i32,
    title: String,
    description: String,
    completed: bool
}
```

From above, you can see that every todo will have an id, title, description, and completed fields.

Define a `juniper` object for the above todo fields:

```rust
#[juniper::object(description = "A todo")]
impl Todo{
    pub fn id(&self)->i32{
        self.id
    }

    pub fn title(&self)->&str{
        self.title.as_str()
    }

    pub fn description(&self)->&str{
        self.description.as_str()
    }

    pub fn completed(&self)->bool{
        self.completed
    }
}
```

The objects defined by the `Todo()` function set the fields that a client can request from the GraphQL API.

Define the root query and a `juniper` object for the root query. For now, use a query with dummy data and set up the MongoDB dynamic data later in this guide.

```Rust
pub struct QueryRoot;

#[juniper::object]
impl QueryRoot{
    fn todos() -> Vec<Todo> {
        vec![
            Todo{
                id:1,
                title:"Watching Basketball".to_string(),
                description:"Watchig the NBA finals".to_string(),
                completed: false
            },
            Todo{
                id:2,
                title:"Watching Football".to_string(),
                description:"Watching the NFL".to_string(),
                completed: false
            },
        ]
    }
}
```

Define the root mutation and the structure for adding new todo, using the `GraphQLInputObject`.

```Rust
pub struct MutationRoot;

#[derive(juniper::GraphQLInputObject)]
pub struct NewTodo{
    pub title: String,
    pub description: String,
    pub completed: bool
}
```

The `GraphQLInputObject` sets the objects a client needs to use when creating a new todo. For example, each new todo will have a `title`, `description`, and `completed`. In addition, this object sets the structure that mutation requires to write data to a GraphQL server.

Define the juniper object for the mutation:

```rust
#[juniper::object]
impl MutationRoot {
    fn create_todo(new_todo: NewTodo) -> Todo {        
        Todo{
            id:1,
            title:new_todo.title,
            description:new_todo.description,
            completed: new_todo.completed
        }        
    }
}
```

This object returns the records set by the mock query set earlier.

The scheme is now set and ready to be executed. Go ahead and define a function to create the schema:

```Rust
pub type Schema = RootNode<'static, QueryRoot, MutationRoot>;

pub fn create_schema() -> Schema {
    return Schema::new(QueryRoot, MutationRoot);
}
```

### Setting up the routes
To access any web-based API, you need to set up routes that will help you send and receive requests and responses, respectively. 

This GraphQL API will have the following two routes:

- `/graphql`: For executing the queries and mutation.
- `/graphiql`: For loading the GraphQL playground to execute queries and mutations.

To set up these routes, navigate to your `main.rs` and start by updating your modules and dependencies imports as follows:

```Rust
#[macro_use]
extern crate juniper;

use std::io;
use std::sync::Arc;

use actix_web::{web, App, Error, HttpResponse, HttpServer};
use futures::future::Future;
use juniper::http::graphiql::graphiql_source;
use juniper::http::GraphQLRequest;

mod schema;
use schema::{create_schema, Schema};
```

Inside the `main()` function, configure the two routes as follows:

```rust
fn main() -> io::Result<()> {

// Initialize the graphql schema
let schema = std::sync::Arc::new(create_schema());

// move: to create a copy of the schema
HttpServer::new(move || {
    App::new()

        // clone the schema
        .data(schema.clone())
        .service(web::resource("/graphql").route(web::post().to_async
        
        // service for executing query and mutation requests
        (graphql)))
        .service(web::resource("/graphiql").route(web::get().to
        
        // service for providing an interface to send the requests
        (graphiql))) 
})

// start on port 8080
.bind("localhost:8080")?
.run()
}
```

From this `main()` function:

- Initialize the GraphQL schema you defined earlier.
- Create a new instance of `HTTPServer` with a copy of the schema.
- Clone the schema data.
- Set up `graphql` and `graphiql` service.
- Run the server on localhost port `8080`.

These routes will excute the `graphql` and `graphiql` services. Go ahead and define them as follows:

- Define the `graphql` service:

```rust
fn graphql(
        st: web::Data<Arc<Schema>>,
        data: web::Json<GraphQLRequest>,
    ) -> impl Future<Item = HttpResponse, Error = Error> {

        // Get the GraphQL request in JSON
        web::block(move || {
            let res = data.execute(&st, &());
            Ok::<_, serde_json::error::Error>(serde_json::to_string(&res)?)
        })

        // Error occurred.
        .map_err(Error::from)

        // Successful.
        .and_then(|user| {
            Ok(HttpResponse::Ok()
                .content_type("application/json")
                .body(user))
        })
    }
```

This `graphql()` function returns an asynchronous call with either a success or error state. It gets the GraphQL request in JSON and executes them. Then chains them to `.map_err` in case an error occurs and `.and_then` if an HTTP response has been successful.

- Define the `graphiql` service:

```rust
fn graphiql() -> HttpResponse {

    // Get the HTML content
    let html = graphiql_source("http://localhost:8080/graphql");
    
    // Render the HTML content
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}
```

The `graphiql()` function gets the HTML content that executes the GraphQL playground and renders it to the browser. This process creates an interactive interface that allows you to execute your API queries and mutations.

You can now test out the development server using the following Cargo command:

```bash
cargo run
```

The project should run and expose port `8080` on your localhost. You can now access the GraphQL playground using the `http://localhost:8080/graphiql` route from your browser.

Write a query on the GraphQL playground to get the todos:

```Rust
query GetTodos {
  todos{
    id
    title
    description
    completed
  }
}
```

Hit the play button at the centre, and you should be able to visualize the results as below:

![mock-mutation](/engineering-education/write-a-rust-graphql-server-with-mongodb-juniper-and-actix-web/mock-query.png)

Write a mutation on the GraphQL playground to add a todo:

```rust
mutation CreateTodo{
  createTodo(
    newTodo:{
      title:"Coding in Rust",
      description:"Implementing GraphQL and MongoDB",
      completed:false
    }){
    id
    title
    description
    completed
  }
}
```

Feel free to change the title and the description. Then, hit the play button at the centre and observe the results.

![mock-mutation](/engineering-education/write-a-rust-graphql-server-with-mongodb-juniper-and-actix-web/mock-mutation.png)

The next step will now involve setting up a database.

### Setting up the MongoDB Database
The above example uses dummy data to run the queries and mutations. First, let us set a MongoDB database and execute the API with dynamic data.

Create a `.env` at the root of the project. In this file, specify the MongoDB database URL. This specifies the URL that allows your application to connect to MongoDB and create your database.

```rust
MONGODB_URL="mongodb://localhost:27017/test"
```

Open the `schema.rs` file and import dotenv for accessing the `env` variable, Juniper, Serde, and MongoDB driver components:

```rust
// For RootNode and FieldResult type
use juniper::{RootNode,FieldResult};
// For environment variables
use dotenv::dotenv; 
use mongodb::{
    // doc type
    bson::doc, 
     // synchronous calls
    sync::Client,
};
// serializing and derializing data
use serde::{Serialize,Deserialize}; 

```

Redefine the schema of a Todo. This will reflect the dynamic data saved in MongoDB.

```rust
#[derive(Debug, Serialize, Deserialize)]
struct Todo {
    title: String,
    description: String,
    completed: bool
}
```

This code snippet defines the `Debug`, `Serialize`, and `Deserialize` properties on a todo. 

Since you will be working with `MongoDB`, you will also remove the `id` property. MongoDB will auto-create it whenever you add a new todo.

Define a function that establishes database connection:

```rust
fn connect_to_db()-> FieldResult<Client> {
    dotenv().ok();
    // Load the database URL.
    let db_url = std::env::var("MONGODB_URL").expect("MONGODB_URL must be set"); 
    // Get the client synchronously.
    let client = Client::with_uri_str(&db_url)?; 
    // return the client.
    return Ok(client); 
}
```

### Running the Queries
Replace the mock todos you were fetching locally with todos to be fetched from the database. Therefore, you will make the following changes to the `schema.rs` file and replace the dummy todos data. Navigate to `QueryRoot` and edit `todos()` function as follows:

```rust
fn todos() -> FieldResult<Vec<Todo>> {
    // Initialize the database connection
    let client = connect_to_db()?; 
    // Connect to the todos collection
    let collection = client.database("test").collection("todos"); 
    / Get the cursor to loop through the todos
    let cursor = collection.find(None, None).unwrap(); /
    // Iniatialize a mutation to store the todos
    let mut todos = Vec::new(); 
    // Map through the todos from the cursor, adding them to the list
    for result in cursor { 
        todos.push(result?);
    }
    // Return the todos
    return Ok({ 
        todos
    })
 }
```

### Running the Mutation
 As we said, a mutation offers write-operation to a GraphQL server. Previously, the API was returning mock todos, but now you can send new todos values and save them in the database. Therefore, in your `schema.rs` file, navigate to the `MutationRoot` and edit `create_todo()` as follows:

```rust
fn create_todo(new_todo: NewTodo) -> FieldResult<Todo> {
    // Connect to the database
    let client = connect_to_db()?; 
    // Connect to the collection
    let collection = client.database("todos").collection("todos"); 
    // Instanciate the todo to be saved
    let todo = doc!{ 
        "title": new_todo.title,
        "description": new_todo.description,
        "completed": new_todo.completed
    }; 
    // Save the todo and return the ID
    let result = collection.insert_one(todo, None).unwrap(); 
    // Get the ID
    let id = result.inserted_id.as_object_id().unwrap().to_hex(); 
    // Query for the saved ID
    let inserted_todo = collection.find_one(Some(doc!{"_id": id}), None).unwrap().unwrap(); 
    // Return the saved todo
    return Ok(Todo{ 
        title: inserted_todo.get("title").unwrap().as_str().unwrap().to_string(),
        description: inserted_todo.get("description").unwrap().as_str().unwrap().to_string(),
        completed: inserted_todo.get("completed").unwrap().as_bool().unwrap()
    });     
}
```

At this stage, whenever a new todo is sent, it will be saved to the database. To test this, stop your running development server using `CTRL + C` and restart using the cargo command:

```bash
cargo run
```

Once the server is up and running, open GraphQL playground `http://localhost:8080/graphiql`, and run your queries and mutations as showcased in the following image samples:

- Creating a todo mutation with MongoDB:

![creating_todo_mutation_with_mongodb](/engineering-education/write-a-rust-graphql-server-with-mongodb-juniper-and-actix-web/creating-todo-mutation-with-mongodb.png)

- Getting todos query with MongoDB:

![getting_todos_query_with_mongodb](/engineering-education/write-a-rust-graphql-server-with-mongodb-juniper-and-actix-web/getting-todos-query-with-mongodb.png)

- Getting todos MongoDB response:

![getting_todos_mongodb_response](/engineering-education/write-a-rust-graphql-server-with-mongodb-juniper-and-actix-web/getting-todos-mongodb-response.png)

### Conclusion
APIs power many world applications. These APIs must have the capacity to deliver data of all shapes, capabilities, and sizes. 

Exposing APIs with GraphQL enables clients to access this data in different formats and only request the information they need, allowing them to access the API data fast and flexibly.

Check the code used in this tutorial on [GitHub](https://github.com/Catemacharia/Rust-GraphQL-Server-With-MongoDB-Juniper-and-Actix-Web).
