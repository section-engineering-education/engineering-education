ORM (Object Relation Mapping) is a common technique for storing, retrieving, updating, and deleting data from a database, specifically within a relational database. Common languages such as Node.js have different ORM libraries that help you achieve the general application of ORM when connecting the database and the application. The application wants to access the data from a database. However, it cannot do that directly. An ORM helps your application connect to a database. The significant advantage is that an ORM helps you create data schemas and relations within your application. Whenever you need to change a specific database field, you only so it in your application with just a few lines of codes to change. This helps you avoid the hectic work of recreating your databases every time to match your new data registry.

The concept of ORM is widely supported by many languages such as Rust. Rust uses the Diseal framework to help you write your schema queries within your rust application. In this guide, we learn more about the Rust Diseal and finally set up a Rust API that uses Diseal to communicate with a PostgreSQL relational database.

This tutorial will help you learn more about the ORM and understand how to use ORM in Rust using Diseal. We will also create a Rust API server that uses Diseal to connect to PostgreSQL and then generate and retrieve the application's data stored in the database. This will help you understand the use of the concept of ORM using the Rust Diseal in an ideal application.

### Prerequisites
To follow along with this guide, it is recommended to have the following toolsets.

- Prior knowledge of writing the Rust APIs and being able to set up a primary Rust GraphQL server.
- [Rust compiler](https://www.rust-lang.org/tools/install) installed and well set up on your computer.

### Tables of contents
- [Prerequisites](#prerequisites)
- [Tables of contents](#tables-of-contents)
- [Setting up a Rust application](#setting-up-a-rust-application)
- [Set up the GraphQL Schema](#set-up-the-graphql-schema)
- [Set up the GraphQL server](#set-up-the-graphql-server)

### Setting up a Rust application
Rust uses Cargo to set up and run its applications. Cargo gets installed once the Rust compiler gets installed in your computer. To set up a basic Rust application, proceed to your desired project location, open the terminal, and run the following command to initialize the project using [cargo](https://doc.rust-lang.org/cargo/).

```bash
cargo new todos-graphql-api
```

This will create a new directory `todos-graphql-api` that has a basic Rust application already set up for you. Navigate to this newly created directory using the following command.

```bash
cd todos-graphql-api
```

In the current directory, we have a `Cargo.toml` that contains project dependencies. The `main.rs` inside the `src` has a `main` function that just prints a `Hello, world!` to the console. You can test this out by running `cargo run` inside the `todos-graphql-api` directory.

Cargo also allows you to install and remote libraries that you want to run with your application. The application that we will create will use the following dependencies/libraries.

- [Actix-web](https://docs.rs/actix-web/1.0.0/actix_web/): For setting up Rust based HTTP servers.
- [Diesel](https://docs.rs/diesel/1.0.0/diesel/): For interacting with PostgreSQL as an ORM and query builder. Diesel lets you build schemas and querries and let them interact with a database of your choice while using the Rust language.
- [Dotenv](https://docs.rs/dotenv/0.9.0/dotenv/): For loading databse connection environmental variables.
- [Env_logger](https://docs.rs/env_logger/0.6.0/env_logger/): For logging environmental variables.
- [Features](https://docs.rs/futures/0.1/futures/): For handling Rust HTTP server asynchronous calls.
- [Serde](https://docs.serde.rs/serde/): For serializing and deserializing data structures.
- [Serde_derive](https://serde.rs/derive.html): For serializing and desirializing data structures.
- [Serde_json](https://docs.serde.rs/serde_json/): For serializing json file format.

To use these libraries, head over to the `Cargo.toml` and update the dependencies as follows:

```toml
[dependencies]
diesel = { version = "1.0.0", features = ["postgres"] }
futures = "0.1"
env_logger = "0.6"
serde = "1.0"
actix-web = "1.0.0"
serde_derive = "1.0"
juniper = "0.13.1"
serde_json = "1.0"
dotenv = "0.9.0"
```

### Set up the GraphQL Schema
A GraphQL Schema is made up of a root query and mutation. We will start by setting up a root query and an empty mutation that rides on some dummy data. We will then integrate the Postgres database for dynamic data later in this guide. In your src folder, create a `graphql_schema.rs` file and import `EmptyMutation`, and `RootNode` from `juniper` as shown below.

```rust
use juniper::{EmptyMutation,RootNode};
```

Define the structure of a todo. This sets the fields of data that your application will use.

```rust
struct Todo{
    id:i32,
    title:String,
    completed:bool
}
```

Describe the todo object by defining what each field should return.

```rust
#[juniper::object(description="A todo")]
impl Todo{
    pub fn id(&self)->i32{
        self.id
    }

    pub fn title(&self)->&str{
        self.title.as_str()
    }

    pub fn completed(&self)->bool{
        self.completed
    }
}
```

Define the root query.

```rust
pub struct QueryRoot;
```

Implement the root query to return some dummy todos.

```rust
#[juniper::object]
impl QueryRoot {
    fn todos() -> Vec<Todo> {
        vec![
            Todo{
                id:1,
                title:"Code in Rust".to_string(),
                completed:false
            },
            Todo{
                id:2,
                title:"Cook supper meal".to_string(),
                completed:false
            }
        ]
    }
}
```

Initialize the schema with the root query and empty mutation.

```rust
pub type Schema = RootNode<'static, QueryRoot, EmptyMutation<()>>;
```

Define a function to create the schema.

```rust
pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, EmptyMutation::new())
}
```

### Set up the GraphQL server
Now we proceed to `main.rs` to set up the HTTP server is started and that the schema is passed and called. First, update the imports as follows.

```rust
#[macro_use]
extern crate juniper;

use std::io;
use std::sync::Arc;

use actix_web::{web, App, Error, HttpResponse, HttpServer};
use futures::future::Future;
use juniper::http::graphiql::graphiql_source;
use juniper::http::GraphQLRequest;

mod graphql_schema;
use graphql_schema::{create_schema, Schema};
```

Update the main function as shown below.

```rust
fn main() -> io::Result<()> {
let schema = std::sync::Arc::new(create_schema());
HttpServer::new(move || {
    App::new()
        .data(schema.clone())
        .service(web::resource("/graphql").route(web::post().to_async(graphql)))
        .service(web::resource("/graphiql").route(web::get().to(graphiql)))
})
.bind("localhost:8080")?
.run()
}
```

Here we have defined the `main()` will return an `io::Result<()>` type. We are calling the `create_schema()` to initialize the GraphQL schema. `HttpServer::new` is marked with `move` so that the closure can take ownership of inner variables, which in our case will be a copy of schema. Inside the `data` function, we are passing schema to imply that it will be used in the two services.

The `/graphql` service will be executing our request aganist our schema, whereas the `/graphiql` service will provide an interface for sending the GraphQL requests. Implement the handler for `/graphql` service as shown below:

```rust
fn graphql(
        st: web::Data<Arc<Schema>>,
        data: web::Json<GraphQLRequest>,
    ) -> impl Future<Item = HttpResponse, Error = Error> {
        web::block(move || {
            let res = data.execute(&st, &());
            Ok::<_, serde_json::error::Error>(serde_json::to_string(&res)?)
        })
        .map_err(Error::from)
        .and_then(|user| {
            Ok(HttpResponse::Ok()
                .content_type("application/json")
                .body(user))
        })
    }
```

The above handler simply gets the GraphQL request in JSON, creates `futures` from `web::block`, and chains two handlers: `map_err` for error states and `and_then` for success states. To view the GraphQL API data, implement the handler for `/graphiql` service as shown below.

```rust
fn graphiql() -> HttpResponse {
    let html = graphiql_source("http://localhost:8080/graphql");
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}
```

This handler basically returns HTML for the GraphQL playground environment.

At this point, our server should be ready to be tested out. To do this, run the following command from your terminal:

```bash
cargo run
```

When the build is complete, from your browser, open `http://localhost:8080/graphiql`. You should receive a GraphQL playground interface. On the left pane, write the following query to get todos:

```rust
query GetTodos{
    todos{
        id
        title
        completed
    }
}
```

Hit the play button on top and observe the results on the right pane. Your results should be similar to:

![dummy-todos-query](/engineering-education/how-to-set-up-rust-api-servers-with-the-diseal-orm-and-the-postgresql/dummy-todos-query.png)