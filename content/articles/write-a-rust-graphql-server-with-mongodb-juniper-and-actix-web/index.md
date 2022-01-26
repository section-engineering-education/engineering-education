GraphQL is an open-source query language. It is intuitive and well-designed for building APIs. GraphQL is built around HTTP to set how you get and receive resources from a server. It gives you a single endpoint that allows you to determine what data you get back based on the query that you send to that endpoint. This gives you a more flexible way to interact with your server as compared with a REST API.

A REST API is based on executing different endpoints to get specific data. This will also return extra information that you don't want at the moment. However, with GraphQL API, you only get data that is specified in a GraphQL query. This way, you only make a single request to the server that queries different resources and return the data you need. Instead of sending different endpoints to different resources to return the same data.

This guide aims to introduce Rust to the concept of GraphQL. We will build a fully-functional application stack with GraphQL, Rust programming language, and MongoDB database.

### Pre-requisites
To follow up in this article, it is helpful to have the following:

- [MongoDB](https://www.mongodb.com/try/download/community) installed on your computer.
- How to use MongoDB database.
- [Rust compiler](https://www.rust-lang.org/tools/install) installed on your computer.
- Basic knowledge working with Rust, Juniper, Actix framework.

### Setting up the application
We need to set up a Rust application. We will use the Rust that helps you create a basic Rust application template. First, run the following command to confirm that you have Rust installed:

```bash
cargo -V
```

If you don't get the current version of Rust you have installed, consider installing Rust before proceeding with this tutorial.

Go ahead and create a project directory. Then launch a terminal that points to the created project directory. Finally, run the following command to initialize the project:

```bash
cargo init
```

Test the default template project created by running the following command:

```bash
cargo run
```

The project will build and then log the `Hello, world!` text. This implies your Rust application is well set, and we can proceed by building our GrapQL server. To set this application stack, we will need to install a couple of dependencies that will help us set up a Rust server and communicate with the MongoDB database. We will use the following dependencies:

- [Actix-Web framework](https://crates.io/crates/actix-web): This is a Rust framework that helps you set up and manage a Rust HTTP server.
- [Dotenv](https://crates.io/crates/dotenv): To connect to a MongoDB database, we will need to set up environment variables that host the MongoDB connection parameters, such as MongoDB connection URL. Dotenv is used to load the environmental variables to project files.
- [Features](https://doc.rust-lang.org/cargo/reference/features.html): For handling asynchronous calls to MongoDB.
- [MongoDB](https://crates.io/crates/mongodb): We are using a MongoDB database. Thus we need a MongoDB driver to handle communication between the GraphQL server and MongoDB database.
- [serde_json](https://crates.io/crates/serde_json): When sending data to MongoDB, we need to serialize it to JSON format. In this case, we will use serde_json to get the GraphQL API requests and convert the data being sent into JSON format.
- [Juniper framework](https://docs.rs/juniper/latest/juniper/): This is a GraphQL server framework for Rust programming language. Juniper will help us write a GraphQL server in Rust. It provides type-safe GraphQL APIs and convenient schemas definitions for Rust.

To use the above dependencies, we need to make them available for our project. Navigate to the `Cargo.toml` file in the project root directory and update is as follows:

```rust
[dependencies]
actix-web = "1.0.0"
mongodb = "1.2.0"
serde_json = "1.0"
futures = "0.1"
dotenv = "0.9.0"
juniper = "0.13.1"
```

Then install them by running:

```bash
cargo run
```

The dependencies will be installed. This will still give you the output `Hello, world!` since we have not added our code logic yet. And this implies you are good to go to the next step.

### Setting up the schema
Schema is a collection of types with fields that are populated from your back-end application. They are the defining GraphQL API blueprint. Apart from fields, a schema also defines types such as query and mutation. Query and mutation are just requests a client can make to access the API data. A query type sets the API read operation, commonly known as the GET request. A mutations type sets the API write operations, such as POST and PUT requests.

To set up these types, head over to your project `src` directory and create a `schema.rs` file. In this file, we will define the schema of Todo fields, query, mutation, and handle the connection to the database. This is how we will do it:

: First import `RootNode` from `juniper`. This will help us use juniper to write the GraphQL schema.

```rust
use juniper::{RootNode};
```

Define the schema of Todo fields:

```rust
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

The field defined by the above `Todo()` function will be accessible fields that a client can request from the Graphql API.

Define the root query:

```rust
pub struct QueryRoot;
```

Define a `juniper` object for the root query. For now, we will use a query with dummy data and set up the MongoDB dynamic data later.

```rust
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

Define the root mutation:

```rust
pub struct MutationRoot;
```

Define the structure for adding new todo, which will be the GraphQL input object:

```rust
#[derive(juniper::GraphQLInputObject)]
pub struct NewTodo{
    pub title: String,
    pub description: String,
    pub completed: bool
}
```

As from above, each new todo will have a `title`, `description`, and `completed`. This will set the structure that mutation requires to write data to a GraphQL server.

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

From the above object, we are returning the record just set by the mock query we set earlier.

Define the schema:

```rust
pub type Schema = RootNode<'static, QueryRoot, MutationRoot>;
```

Define a function to create the schema:

```rust
pub fn create_schema() -> Schema {
    return Schema::new(QueryRoot, MutationRoot);
}
```

At this point, our schema is now set up. The next step is to set up the routes.

### Setting up the routes

To access any web-based API, you need to set up that will help you send and receive requests and responses, respectively. For this GraphQL API, we will only need two routes:

- `/graphql`: For executing the queries and mutation.
- `/graphiql`: For loading the GraphQL playground to execute queries and mutations.

Navigate to your `main.rs` and start by updating the imports as follows modules and dependencies:

```rust
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

In the `main` function, configure the two routes as follows:

```rust
fn main() -> io::Result<()> {
let schema = std::sync::Arc::new(create_schema()); // Initialize the graphql schema
HttpServer::new(move || { // move: to create a copy of the schema
    App::new()
        .data(schema.clone()) // clone the schema
        .service(web::resource("/graphql").route(web::post().to_async(graphql))) // service for executing query and mutation requests
        .service(web::resource("/graphiql").route(web::get().to(graphiql))) // service for providing an interface to send the requests
})
.bind("localhost:8080")? // start on port 8080
.run()
}
```

From this `main()` function, we are:

- Initializing the GraphQL schema we defined earlier.
- Creating a new instance of `HTTPServer` with a copy of the schema.
- Cloning the schema data.
- Setting up `graphql` and `graphiql` service.
- Running the server on localhost port `8080`.

Next up is to define the `graphql` service:

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

The above function returns an asynchronous call with either a successful state or an error state. It gets the GraphQL request in JSON executes them. Then chains them to `.map_err` in case an error occurs. Or `.and_then` in case no error occurs.

The next service to define is the `graphiql` service:

```rs
fn graphiql() -> HttpResponse {

    // Get the HTML content
    let html = graphiql_source("http://localhost:8080/graphql");
    
    // Render the HTML content

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}
```

The above function simply gets the HTML content for the interface and renders it to the browser.

We can now test out the development server using the following command:

```bash
cargo run
```

The project should run and expose port `8080` on your localhost.

From your browser, you can now be able to access the GraphQL playground from `http://localhost:8080/graphiql`.

On the playground. Write a query to get the todos on the left pane:

```js
query GetTodos {
  todos{
    id
    title
    description
    completed
  }
}
```

Hit the play button at the center, and you should be able to visualize the results as below:

![mock-mutation](/engineering-education/write-a-rust-graphql-server-with-mongodb-juniper-and-actix-web/mock-query.png)

To test out the mutation, write a mutation as below:

```js
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

Feel free to change the title and the description. Hit the play button at the center and observe the results.

![mock-mutation](/engineering-education/write-a-rust-graphql-server-with-mongodb-juniper-and-actix-web/mock-mutation.png)

The next step will now involve setting up a database.

### Setting up the database
Create a `.env` at the root of the project. In this file, specify the MongoDB database URL. If the database does not exist, it will be created on the fly.

```rust
MONGODB_URL="mongodb://localhost:27017/test"
```

Open the `schema.rs` file and import dotenv from dotenv and the `env` from the standard library:

```rust
use dotenv::dotenv
use std::env;
```

Define a function that establishes database connection:

```rust
fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}
```

### Conclusion
APIs powers many world applications. These APIs must have the capacity to deliver data of all shapes, capabilities, and sizes. Exposing APIs with GraphQL enables clients to access this data in diffrent formats and only request the data they data. This allows them to access the API data fast and in a flexible manner. I hope you found this Rust MongoDB GraphQL API helpful.