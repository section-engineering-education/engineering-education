---
layout: engineering-education
status: publish
published: true
url: /rust-api-with-diesel-orm-and-postgresql/
title: Setting up Rust API with Diesel and PostgreSQL
description: This tutorial will walk the reader through the concept of an ORM and how to use it in a Rust-API together with Diesel and PostgreSQL. 
author: carol-wanjiru
date: 2022-02-02T00:00:00-10:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/rust-api-with-diesel-orm-and-postgresql/hero.jpg
    alt: Setting up Rust API with Diesel and PostgreSQL Hero Image
---
Object Relation Mapping(ORM) is a technique for storing, retrieving, updating, and deleting data from a database. Common frameworks such as Node.js have different ORM libraries that help developers connect their applications to databases.
<!--more-->
### Introduction 
An ORM helps us create data schemas and relationships within an application such that whenever we need to change a specific database field, we only do it in our application with just a few lines of code. 

An ORM helps us avoid the hectic work of recreating our databases every time to match the new database structure. 

The concept of ORM is widely supported by many languages such as Rust, JavaScript, and Python. Rust, for example, uses the [Diesel](https://docs.rs/diesel/1.0.0/diesel/) framework to help you write schema queries within your Rust application.

In this article, we will learn about ORM and how to use it in Rust together with  Diesel. Then, we will create a Rust API server that uses Diesel to connect to a PostgreSQL database. Finally, we will generate and retrieve the application's data stored in the database.

This article will help the reader understand how to use an ORM with the Rust Diseal framework in an application.

### Tables of content

- [Introduction](#introduction)
- [Tables of content](#tables-of-content)
- [Prerequisites](#prerequisites)
- [Setting up a Rust application](#setting-up-a-rust-application)
- [Setting up the GraphQL schema](#setting-up-the-graphql-schema)
- [Setting up the GraphQL server](#setting-up-the-graphql-server)
- [Setting up Diesel](#setting-up-diesel)
- [Handling Queries](#handling-queries)
- [Handling Mutation](#handling-mutation)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this article, it is recommended to have the following tools:

- Prior knowledge of writing the Rust API and setting up a primary Rust [GraphQL server](https://blog.logrocket.com/how-to-create-a-graphql-server-in-rust/).
- [PostgreSQL](https://www.postgresql.org/download/) installed on your computer.
- [Rust compiler](https://www.rust-lang.org/tools/install) installed and set up on your computer.

### Setting up a Rust application
Rust uses [Cargo](https://doc.rust-lang.org/cargo/) to set up and run its applications. 

Cargo is a Rust package manager that allows us to access, install and use remote libraries in an application. It gets installed together with the Rust compiler.

To set up the Rust application, navigate to your desired location, and run the following command.

```bash
cargo new todos-graphql-api
```

This command will create a new directory `todos-graphql-api` with a basic Rust application. Next, navigate to this newly created directory using the following command.

```bash
cd todos-graphql-api
```

We have a `cargo.toml` file that contains the project dependencies in the current directory. The `main.rs` inside the `src` folder has a `main` function that prints a `Hello, world!` on the console. 

You can test this out by running `cargo run` inside the `todos-graphql-api` directory.

Our application will use the following dependencies/libraries.

- [Actix-web](https://docs.rs/actix-web/1.0.0/actix_web/): For setting up Rust based HTTP servers.
- [Diesel](https://docs.rs/diesel/1.0.0/diesel/): For interacting with PostgreSQL as an ORM and query builder.
- [Dotenv](https://docs.rs/dotenv/0.9.0/dotenv/): For loading database connection environmental variables.
- [Env_logger](https://docs.rs/env_logger/0.6.0/env_logger/): For logging environmental variables.
- [Features](https://docs.rs/futures/0.1/futures/): For handling Rust HTTP asynchronous calls.
- [Serde](https://docs.serde.rs/serde/) and [Serde_derive](https://serde.rs/derive.html): For serializing and deserializing Rust data structures.
- [Serde_json](https://docs.serde.rs/serde_json/): For serializing JSON file format.

To use these libraries, head over to the `cargo.toml` and update the dependencies as follows:

```Rust
[dependencies]
serde_json = "1.0"
dotenv = "0.9.0"
serde_derive = "1.0"
juniper = "0.13.1"
serde = "1.0"
actix-web = "1.0.0"
diesel = { version = "1.0.0", features = ["postgres"] }
futures = "0.1"
env_logger = "0.6"
```

### Setting up the GraphQL schema
A GraphQL schema is made up of a root query and mutation. A query specifies the data to be returned by the GraphQL API.

Mutations are similar to queries and can return data from the GraphQL API. For example, mutations are used to run a query that writes data to a GraphQL server.

We will set up a root query and an empty mutation that rides on some dummy data. Then, we will integrate the PostgreSQL database for dynamic data later in the tutorial.

In the `src` folder, create a `graphql_schema.rs` file and import `EmptyMutation` and `RootNode` from `juniper`. Then implement GraphQL schema as shown in the following steps;

```rust
use juniper::{EmptyMutation,RootNode};
```

Define the structure of a todo by setting the fields of the `Todo`.

```rust
struct Todo{
    id:i32,
    title:String,
    completed:bool
}
```

Describe the Todo object by defining what each field should return.

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

Next, define the root query.

```Rust
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

This snippet will create two dummy Todos as shown in the `QueryRoot`. Next, initialize the schema with the root query and empty mutation.

```rust
pub type Schema = RootNode<'static, QueryRoot, EmptyMutation<()>>;
```

Define a function to create the schema and execute the `QueryRoot` and `EmptyMutation`.

```rust
pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, EmptyMutation::new())
}
```

### Setting up the GraphQL server
Now proceed to `main.rs` and set up the HTTP server to ensure that the schema is passed and called. However, first, update the imports as follows.

```rust
#[macro_use]
extern crate juniper;

use futures::future::Future;
use std::io;
use juniper::http::GraphQLRequest;
use actix_web::{web, App, Error, HttpResponse, HttpServer};
use std::sync::Arc;
use juniper::http::graphiql::graphiql_source;


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

Here we have defined the `main()` which return an `io::Result<()>` type. Next, we call the `create_schema()` to initialize the GraphQL schema.

`HttpServer::new` is marked with `move` so that the closure can take ownership of inner variables, which in our case will be a copy of the schema. Then, inside the `data` function, we pass schema to imply using it to set `web` services.

The `/graphql` service will run our request against our schema, while the `/graphiql` service will serve as an interface for making GraphQL requests. 

Next,  implement the handler for the `/graphql` service as illustrated below:

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

The above handler gets the GraphQL request in JSON, creates `futures` from `web::block`, and chains two handlers. `map_err` for error states and `and_then` for success states.

Implement the handler for the `/graphiql` service to access the GraphQL API data.

```rust
fn graphiql() -> HttpResponse {
    let html = graphiql_source("http://localhost:8080/graphql");
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}
```

This handler essentially generates HTML for the GraphQL playground. By this point, our server should be ready to be tested. To do this, run the following command from the terminal:

```bash
cargo run
```

When the build is complete, navigate to `http://localhost:8080/graphiql` on a browser. You should receive a GraphQL playground interface. Then, on the left pane, write the following query to get todos:

```Rust
query GetTodos{
    todos{
        id
        title
        completed
    }
}
```

Hit the play button on top and observe the results on the right pane. The results should be similar to the one below:

![dummy-todos-query](/engineering-education/rust-api-with-diesel-orm-and-postgresql/dummy-todos-query.png)

### Setting up Diesel
[Diesel](https://github.com/diesel-rs/diesel) is a safe and extensible query builder for Rust applications. Diesel generates client code and provides an interactive way to connect to a database server.

Diesel has features such as:
    - Table macros to generate database tables that bind to the different columns within an SQL database that you can query.
    - Database migrations to save the previous queries/tables. You can roll back and use any of the earlier migrations.

Run the following command to install Diesel alongside Postgres features.

```bash
cargo install diesel_cli --no-default-features --features postgres
```

Create a `.env` file at the root of the project and set the database URL:

```bash
echo DATABASE_URL=postgres://your_username:your_password@localhost/graphql_todos_example > .env
```

Set up Diesel on the project using the command below:

```bash
diesel setup
```

The above command will create a `migrations` folder in the project root directory. So go ahead and generate a migration to create todos:

```bash
diesel migration generate create_todos
```

This command will generate a subfolder under the `migrations` folder that contains two files:

- `up.sql`: Hosts SQL commands for setting up the database.
- `down.sql`: Hosts SQL commands for bringing down the database.

Inside the `up.sql` create a `todos` table and insert records into the table as shown below;

```sql
CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    completed BOOLEAN NOT NULL
)
```

```sql
INSERT INTO todos(title,completed) VALUES('Coding in Rust',FALSE);
INSERT INTO todos(title,completed) VALUES('Cooking Supper',FALSE);
```

Inside `down.sql`, drop table `todos` using the following SQL statement;

```sql
DROP TABLE todos;
```

Create the database and run the migration:

```bash
diesel setup --database-url "postgres://your_username:your_password@localhost/graphql_todos_example"
```

The above command will create a `schema.rs` file inside the `src` directory with the following schema:

```rust
table! {
    todos (id) {
        id -> Int4,
        title -> Varchar,
        completed -> Bool,
    }
}
```

### Handling Queries
We have set up Diseal and the queries that we need for the todos application to work. Now, we need to handle how the application will access these queries.

Inside the `graphql_schema.rs`, add the libraries imports as follows;

```rust
extern crate dotenv;
use std::env;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use crate::schema::todos;
```

Create a function to establish database connection:

```rust
fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}
```

Remove the dummy data returned from the `todos` function inside `QueryRoot` using the snippet below:

```rust
impl QueryRoot {
    fn todos() -> Vec<Todo> {
        
    }
}
```

Inside the `todos` function, initiate a database connection and load todos from the database using the `todos dsl` generated from the schema:

```rust
impl QueryRoot {
    fn todos() -> Vec<Todo> {
        use crate::schema::todos::dsl::*;

        let connection = establish_connection();
        let results = todos.load::<Todo>(&connection).expect("Error loading todos");

        results
    }
}
```

Start the development server by running the command below:

```bash
cargo run
```

Open the browser's previous tab, `http://localhost:8080/graphiql`, and run the same query, i.e.;

```rust
query GetTodos{
    todos{
        id
        title
        completed
    }
}
```

You should now receive todos now being fetched directly from the database.

### Handling Mutation
Import `Insertable` from Diesel:

```Rust
use diesel::Insertable;
```

Declare a `MutationRoot` below `QueryRoot`:

```Rust
pub struct MutationRoot;
```

Define the structure for a new todo:

```rust
#[derive(juniper::GraphQLInputObject, Insertable)]
#[table_name = "todos"]
pub struct NewTodo {
    pub title: String,
    pub completed: bool
}
```

The above code blocks are deriving;

- `juniper::GraphQLInputObject`: For creating an input object for the GraphQL schema.
- `Insertable`: To inform Diesel that it is a valid input to be used in an SQL statement.
- `table_name`: To inform Diesel into which table to insert data.

Implement the `MutationRoot`:

```rust
#[juniper::object]
impl MutationRoot {
    fn create_todo(new_todo: NewTodo) -> Todo {
        use crate::schema::todos::dsl::*;
        let connection = establish_connection();
        let todo = diesel::insert_into(todos)
            .values(&new_todo)
            .get_result::<Todo>(&connection)
            .expect("Error saving new todo");

        todo
    }
}
```

The `create_todo()` receives the new todo as a parameter, establishes a database connection, inserts the todo, and returns the newly inserted todo.

Replace `EmptyMutation` from a schema with `MutationRoot`. This will help us execute the dynamic mutation instead of the empty mutation we set earlier.

```rust
pub type Schema = RootNode<'static, QueryRoot, MutationRoot>;
```

Replace `EmptyMutation` in the `create_schema()` function as follows:

```rust
pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, MutationRoot {});
}
```

Re-run the development server, and on the same browser tab, then execute a similar GraphQL request as shown below:

```rust
mutation CreateTodoMutation($data: NewTodo!) {
    createTodo(data: {
        "title":"Ride a bike",
        "completed":false
    }) {
        id
        title
        completed
    }
}
```

Hit the play button, and the newly added todo should be printed on the right pane.

### Conclusion
In this guide, we have learned how to set up a Diesel ORM and use it with an ideal Rust application. We focused on PostgreSQL as the ideal database. 

You can try using different databases to model queries using the Diesel ORM.

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
