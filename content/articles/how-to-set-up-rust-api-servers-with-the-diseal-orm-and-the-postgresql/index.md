ORM (Object Relation Mapping) is a common technique for storing, retrieving, updating, and deleting data from a database. Common frameworks such as Node.js have different ORM libraries that help you achieve the general usability of ORM when connecting the database and the application.

An ORM helps your application connect to a database. ORM helps you create data schemas and relations within your application. Whenever you need to change a specific database field, you only do it in your application with just a few lines of code. This helps you avoid the hectic work of recreating your databases every time to match your new data registry.

The concept of ORM is widely supported by many languages such as Rust, JavaScript, and Python. Rust, for example, uses the [Diesel](https://docs.rs/diesel/1.0.0/diesel/) framework to help you write your schema queries within your Rust application. In this guide, we will learn more about the ORM and understand how to use ORM in Rust using Diseal. We will also create a Rust API server that uses Diseal to connect to PostgreSQL and then generate and retrieve the application's data stored in the database. This will help you understand the use of the concept of ORM using the Rust Diseal in an ideal application.

### Prerequisites
To follow along with this guide, it is recommended to have the following toolset.

- Prior knowledge of writing the Rust APIs and being able to set up a primary Rust [GraphQL server](https://blog.logrocket.com/how-to-create-a-graphql-server-in-rust/).
- [PostgreSQL](https://www.postgresql.org/download/) installed on your computer.
- [Rust compiler](https://www.rust-lang.org/tools/install) installed and well set up on your computer.

### Tables of contents
- [Prerequisites](#prerequisites)
- [Tables of contents](#tables-of-contents)
- [Setting up a Rust application](#setting-up-a-rust-application)
- [Set up the GraphQL schema](#set-up-the-graphql-schema)
- [Set up the GraphQL server](#set-up-the-graphql-server)
- [Setting up diesel](#setting-up-diesel)
- [Handling queries](#handling-queries)
- [Handling mutation](#handling-mutation)
- [Conclusion](#conclusion)

### Setting up a Rust application
Rust uses cargo to set up and run its applications. Cargo gets installed once the Rust compiler gets installed in your computer. Cargo helps you set and run Rust applications. It allows you to access and install remote libraries and use them in your application.

To set up a basic Rust application, navigate to your desired project location, and run the following command to initialize the project using [cargo](https://doc.rust-lang.org/cargo/).

```bash
cargo new todos-graphql-api
```

This will create a new directory `todos-graphql-api` that has a basic Rust application already set up for you. Navigate to this newly created directory using the following command.

```bash
cd todos-graphql-api
```

In the current directory, we have a `Cargo.toml` that contains project dependencies. The `main.rs` inside the `src` has a `main` function that prints a `Hello, world!` to the console. You can test this out by running `cargo run` inside the `todos-graphql-api` directory.

Cargo also allows you to install remote libraries that you want to run with your application. The application that we will create will use the following dependencies/libraries.

- [Actix-web](https://docs.rs/actix-web/1.0.0/actix_web/): For setting up Rust based HTTP servers.
- [Diesel](https://docs.rs/diesel/1.0.0/diesel/): For interacting with PostgreSQL as an ORM and query builder. Diesel lets you build schemas and queries and let them interact with a database of your choice while using the Rust language.
- [Dotenv](https://docs.rs/dotenv/0.9.0/dotenv/): For loading database connection environmental variables.
- [Env_logger](https://docs.rs/env_logger/0.6.0/env_logger/): For logging environmental variables.
- [Features](https://docs.rs/futures/0.1/futures/): For handling Rust HTTP asynchronous calls.
- [Serde](https://docs.serde.rs/serde/): For serializing and deserializing data structures.
- [Serde_derive](https://serde.rs/derive.html): For serializing and desirializing data structures.
- [Serde_json](https://docs.serde.rs/serde_json/): For serializing JSON file format.

To use these libraries, head over to the `Cargo.toml` and update the dependencies as follows:

```rust
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

### Set up the GraphQL schema
A GraphQL schema is made up of a root query and mutation. We will start by setting up a root query and an empty mutation that rides on some dummy data. We will then integrate the PostgreSQL database for dynamic data later in this guide.

In your `src` folder, create a `graphql_schema.rs` file and import `EmptyMutation`, and `RootNode` from `juniper` as shown below.

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
Now proceed to `main.rs` and set up the HTTP server that will ensure the schema is passed and called. First, update the imports as follows.

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

Here we have defined the `main()` which return an `io::Result<()>` type. We are calling the `create_schema()` to initialize the GraphQL schema. `HttpServer::new` is marked with `move` so that the closure can take ownership of inner variables, which in our case will be a copy of schema. Inside the `data` function, we are passing schema to imply that it will be used in set `web` services.

The `/graphql` service will run our request against our schema, whilst the `/graphiql` service will serve as an interface for making GraphQL requests. As illustrated below, implement the handler for the `/graphql` service:

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

The above handler simply gets the GraphQL request in JSON, creates `futures` from `web::block`, and chains two handlers. `map_err` for error states and `and_then` for success states.

Implement the handler for the `/graphiql` service as described below to access the GraphQL API data.

```rust
fn graphiql() -> HttpResponse {
    let html = graphiql_source("http://localhost:8080/graphql");
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}
```

This handler essentially generates HTML for the GraphQL playground.

At this point, our server should be ready to be tested out. To do this, run the following command from your terminal:

```bash
cargo run
```

When the build is complete open `http://localhost:8080/graphiql` on a browser, you should receive a GraphQL playground interface. On the left pane, write the following query to get todos:

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

### Setting up diesel
[Diesel](https://github.com/diesel-rs/diesel) is a safe and extensible query builder for Rust applications. Diesel generates client code and provides an interactive way to connect to a database server.

Diesel has features such as;

- Table macros - generate database tables that bind to the different columns within an SQL database that you can query against.

- Database migrations- it comes with migrations that allow you to save the previous queries/tables. This saves databases that already exist. You can roll back and use any of the previous migrations.

Run the following command to install Diesel alongside Postgres features.

```bash
cargo install diesel_cli --no-default-features --features postgres
```

Create a `.env` file at the root of the project and set the database URL:

```bash
echo DATABASE_URL=postgres://your_username:your_password@localhost/graphql_todos_example > .env
```

Setup diesel on your project:

```bash
diesel setup
```

The above command will create a `migrations` folder in the project root directory. Go ahead and generate a migration to create todos:

```bash
diesel migration generate create_todos
```

This will generate a subfolder under the `migrations` folder that contains two files:

- `up.sql`: Hosts SQL commands for setting up the database.
- `down.sql`: Hosts SQL commands for bringing the database down.

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

### Handling queries
We have set up Diseal and the queries that we need for the todos application to work. Let's now handle how the application will access these queries. Inside the `graphql_schema.rs` add the libraries imports as follows;

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

Remove the dummy data returned from the `todos` function inside `QueryRoot`:

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

Start the development server by running:

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

### Handling mutation
Import `Insertable` from Diesel:

```rust
use diesel::Insertable;
```

Declare a `MutationRoot` below `QueryRoot`:

```rust
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
- `table_name`: To inform which table to insert to.

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

The `create_todo()` receives the new todo as a parameter, establishes database connection, inserts the todo, and returns the newly inserted todo.

Replace `EmptyMutation` from schema with `MutationRoot`:

```rust
pub type Schema = RootNode<'static, QueryRoot, MutationRoot>;
```

Replace `EmptyMutation` in the `create_schema()` function as follows:

```rust
pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, MutationRoot {});
}
```

Rerun your development server, and on the same browser tab, write a similar GraphQL request as shown below:

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
In this guide, we have learned how to set up a Diesel ORM and use it with an ideal Rust application. We focused on PostgreSQL as the ideal database. You can go ahead and try using different databases to model your queries using the Diesel ORM.