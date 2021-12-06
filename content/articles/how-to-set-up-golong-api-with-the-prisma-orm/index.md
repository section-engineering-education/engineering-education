An ORM is an object-relational mapper. It’s a technique for storing, retrieving, updating, and deleting from a database within an object-oriented program. ORM simplifies the way you query and mutate data in an object-oriented paradigm. ORM models data without writing and database query. It utilizes a data layer that exits between your model classes and the database to manage the translation between the two. This makes dealing with the database a lot easier. Instead of using a kind of complex SQL statement, we would use an object-oriented through the use of an ORM like Prisma.

Prisma is a modern ORM that allows you to write type-safe database schemas. When setting a database, everything needs to be well set to define what that database will look like. In this case, Prisma abstracts you from writing database queries. Thus ensuring you write safe database access schemas. It provides Prisma client as a way to set up and write your database the data modeling, data validation, describing the relationships between different data fields, etc. Prisma client then enables you to generate queries and connect to the database of your choice.

### Why Prisma
- It allows you to check and ensure you type-safe database models. Prisma adds syntax highlighting, formatting, auto-completion, jump-to-definition, and linting for `.prisma` files. This helps you avoid errors by providing a reliable and utterly type-safe API built exclusively for your Prisma code.

- It provides database schema migrations. Like utilities such as GitLab, Prisma generates new versions whenever new changes are introduced. This way, you can always roll back to the previous stable version whenever your current schema fails to work.

- It provides introspection. If you have an already existing database, you don’t have to create Prisma models from scratch. It also allows you to introspect data into Prisma schemas. If you already have a predefined schema inside a database table, you can introspect that and put it into the prism schemas.

- It allows you to visualize data models that you write in `.prisma` files. Prisma provides you with a GUI called Prisma studio. This will enable you to visualize data through a GUI, just like the typical datasets GUI. You can go ahead and insert, create or update your data.

### Prerequisites
- Have the latest version of Node.js installed.
- Have Golang installed on your computer.
- Postman installed in your for testing the API endpoints.
- Have some basic knowledge working with Golang.
- Basic understating of Prisma and how Prisma works.
- Have [Visual Studio Code](https://code.visualstudio.com/) installed on your computer. [Prisma extention](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) should be installed in your Visual Studio Code. Prisma extension adds syntax highlighting, formatting, auto-completion, jump-to-definition, and linting for `.prisma` files.

### Set up Go
First, we need to set a Go application and install the libraries that we need to have Prisma readily available. Go ahead and create a project folder. Call it `prisma-and-go`. Then initialize your Go application within this folder by running the following command.

```go
go mod init go-prisma
```

This will initialize a go application and create a `go.mod` file used to store any packages and modules that we will use. This will also create a local module, `go-prisma`, that we will use to import any local module that we will create.

Let's now install the packages that we need to set a Go Rest API with Prisma. We will use the following packages.

1. [Prisma Client Go](github.com/prisma/prisma-client-go) - a [Prisma](https://www.prisma.io/) ecosystem library that offers declarative data modeling, data access, visual data management database tools, and schema migrations. Prisma Client Go is a query builder that generates queries automatically, allowing type-safe database access and reduced boilerplate code.

To install this package, run;

```bash
go get github.com/prisma/prisma-client-go
```

2. [Echo](https://echo.labstack.com/) - A Highly performant and minimalistic Go framework for creating robust and scalable Go RESTful APIs. It is a highly efficient HTTP router with minimal dynamic memory allocation and intelligent route prioritization. This adds increased speed for a better user experience.

To install this package, run;

```bash
go get github.com/labstack/echo/v4    
```

Addning `v4` will insall Echo version 4. Always check the [latest available version](https://github.com/labstack/echo/) that Echo has.

Also, we will use the Echo middleware as a logging middleware. Install this by running the following command;

```bash
go get github.com/labstack/echo/v4/middleware
```

### Setting up Prisma
To set Prisma with Go, we will use the Node.js NPX command. This will help us create the prima models, push this into a database representation and set up Go client generation.

First, run `npx prisma init` to utilize Prisma Client. This will generate the files required by Prisma. It will create a `prisma` folder with `schema.prisma`, and `.env` files. `schema.prisma` file has the following blocks.

- `generator` specifies the assets to be generated while producing data database types that generate the actual database queries.

- `datasource` contains two primary parameters: `provider` and `url`. The `provider` specifies the database to use. `sqlserver`,`sqlite`,`mysql`, `postgresql`, and `mongodb` are examples.

The parameter `url` specifies the database server's connection string. Your `DATABASE UR` can be specified in the `.env` file. `DATABASE URL` is a connection string to the server hosting the database of your choosing.

These blocks are generated for JavaScript. Since we are using Go will modify the as follows. We will be using the SQLite (file-based SQL database). This is how you would set up your `datasource` and `generator`.

```go
datasource db {
  provider = "sqlite"
  url = "file:dev.db"
}

generator db {
  provider = "go run github.com/prisma/prisma-client-go"
}
```

### Creating a Prisma model
Models represent the entities of your application fields. A model corresponds to a database table. Let's get started modeling and representing entities in an SQLite database. Below the `generator` block, add the following todos model.

```go
model Todos {
  id String @id @default(uuid())
  complete Boolean @default(false)
  name String
  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
}
```

This model will create a `Todos` database table with five fields. With Prisma, each field is represented with a name, data type, and values that you want to add to each field. For example, you always have to set a unique field in the SQL table. In this case, we have an id that will be auto-generated using the `uuid()`. And since an id will always be added to every todo, we set `@default`, indicating that this value will always be created with a default id value. `complete` takes a Boolean value, either true or false. A false value will be created when a new todo is created by default. Each field has a data type that specifies the data needed. `createdAt` adds a default data value of the current time.

We need to execute the above model to reflect the Prisma schema in the SQLite database. To do so, run;

```bash
npx Prisma db push
```

This will create a `db` folder inside the `schema` directory. This will set up the configuration needed to load data to the SQLite database. Thus a `dev.db` will be created to reflect the set schema in a database table representation, as shown below.

![sqlite-table](/engineering-education/how-to-set-up-golong-api-with-the-prisma-orm/sqlite-table.png)

This created `db` will act as a local module configuration for this database. So we need to run the following command to set the module inside the `go.sum` entries.

```bash
go get go-prisma/prisma/db
```

Now change the `datasource url` to reflect the `prisma` module.

```go
datasource db {
  provider = "sqlite"
  url = "file:/prisma/dev.db"
}
```

The use the command `npx prisma generate`. This command will execute the `provider` of `generator` to set up `prisma-client-go`.

### Set up RESTful API with Go and Echo
We have managed to set up a todos schema and exported it to a typical database. Let's create a simple Restful API that will demonstrate how the loaded Prisma can be used along with a Go application.

### Set up Handlers using Echo
You need to perform different operations using different HTTP methods to set up an API. The most common HTTP methods are `GET`, `POST`, `PUT`, and `DELETE`. These HTTP methods have specific meanings. Typically, you use the correct method for the right operation, such as fetching, adding, updating, and deleting data. Let's write these write methods and create a REST.

Within your project directory, create a `handler` folder, and inside that folder, create a `todos.go` file and follow the following steps.

#### Step 1: Create a package and import modules
```go
package handler

import (
  "context"
  "go-prisma/prisma/db"
  "net/http"
  "github.com/labstack/echo/v4"
)
```

This will create a package `handler` that we will use within the local modules system. We also import the libraries that we need to set up a handler. This includes Go core modules such as `context` and `net/http`. Also, import the generated prism module to access the Prisma schema structures. And t create different http methods import the installed Echo package.

#### Step 2: Add structs
```go
type TodosHandler struct {
  client *db.PrismaClient
}

// TODO structure
type TodosResponse struct {
  db.TodosModel
}
```

`TodosHandler` will set up a `PrismaClient` engine, creating abstractions of what happens under the hood. This way query engine can spawn and send requests to `PrismaClient`.

`TodosResponse` creates a `TodosModel` representing the `json:"Todos"` model and a wrapper for accessing fields and methods.

#### Step 3: Create a function to execute the `TodosHandler`
```go
func NewTodoHandler(client *db.PrismaClient) *TodosHandler {
  return &TodosHandler{client}
}
```

Prisma provides Prisma-related methods as opposed to model methods. Now we can start implementing these Prisma-related methods to get the related responses.

#### Step 4: Crete a fetch function
```go
func (h *TodosHandler) ShowAll(c echo.Context) error {
  todos, err := h.client.Todos.FindMany().Exec(context.Background())
  if err != nil {
    return c.String(http.StatusInternalServerError, "error getting Todos")
  }

  return c.JSON(http.StatusOK, todos)
}
```

Like we said, Prisma provides Prisma-related methods. We will use the `FindMany()` Prisma method to fetch these todos. `PrismaClient` engine will create an abstraction of what happens under the hood then return with the list of the available todos. Or an error message if this execution context fails.

#### Step 5: Crete fetch single todo function
```go
func (h *TodosHandler) Show(c echo.Context) error {
  todo, err := h.client.Todos.FindUnique(db.Todos.ID.Equals(c.Param("id"))).Exec(context.Background())
  if err != nil {
    return c.String(http.StatusInternalServerError, err.Error())
  }
  return c.JSON(http.StatusOK, todo)
}
```

To get a single todo, use the `FindUnique()` that will execute the todo id field parameter and return the todo value that equals the provided id parameter.

#### Step 6: Create an add new todo function
```go
func (h *TodosHandler) Create(c echo.Context) error {
  var todo db.TodosModel
  if err := c.Bind(&todo); err != nil {
    return c.String(http.StatusInternalServerError, err.Error())
  }

  created, err := h.client.Todos.CreateOne(
    db.Todos.Name.Set(todo.Name),
  ).Exec(context.Background())
  if err != nil {
    return c.String(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusOK, created)
}
```

To create a new entry using the `PrismaClient` use `CreateOne()` function. The `PrismaClient` engine will create an abstraction of what happens under the hood while inserting a new item and then returning the values of the newly added todo.

Try creating other handlers to perform methods such as UPDATE and DELETE.

### Set up Routes using Echo
To execute all of the above handler functions, we need to set routes with the respective HTTP methods. For example, to fetch a todo, we need to set up a route that executes a GET request that returns the list of the available todos. To set up these routes, create a `router` folder within your project directory, and inside that folder, create a `todos.go` file and follow the following steps.

#### Step 1: Create a package and import modules
```go
package router

import (
  "github.com/labstack/echo/v4"
  "go-prisma/handler"
  "go-prisma/prisma/db"
)
```

This will create a package `router` that we will use within the local modules system. We also import the libraries that we need to set up a `router`. This includes the generated Prisma module to access the Prisma schema structures and the `handler` module to access the handler function. We also need the Echo package to create different http methods.

#### Step 1: Create a router function
```go
func TodoRouter(e *echo.Echo, dbClient *db.PrismaClient) {
  todoHandler := handler.NewTodoHandler(dbClient)
  g := e.Group("/todos/")
  g.GET("", todoHandler.ShowAll)
  g.GET(":id", todoHandler.Show)
  g.POST("", todoHandler.Create)
}
```

Here we are simply setting up a base route that will be used based on the method being executed. Also, specify an endpoint that needs a parameter, such as an id value.

### Set up the server
To set up everything we have built so far, we need to set up a local server that we will use to access the API. Here we use the Go `main()` function, which gets executed whenever the Go application runs. Here is how we are going to do this.

#### Step 1: Create a package and import modules
```go
package main

import (
  "github.com/labstack/echo/v4"
  "github.com/labstack/echo/v4/middleware"
  "go-prisma/prisma/db"
  "go-prisma/router"
  "log"
)
```

This will create the Go `main` module. We also import the local modules that we have created. This includes `router` and `prisma/db` modules. We also need the Echo package to access different http methods and Echo middleware and log to implement the http logging.

#### Step 1: Create the Go main function
```go
func main() {
  e := echo.New()
  e.Use(middleware.Logger())

  client := db.NewClient()
  if err := client.Prisma.Connect(); err != nil {
    log.Fatal(err)
  }

  defer func() {
    if err := client.Prisma.Disconnect(); err != nil {
      panic(err)
    }
  }()

  router.TodoRouter(e, client)

  log.Print(e.Routes())
  e.Logger.Fatal(e.Start(":8000"))
}
```

Here we set a logger using an `echo` instance. This log and print an HTTP status whenever an HTTP method gets executed.

To access `PrismaClient`, we use Prisma-related methods such as `Connect()` to establish a connection to the Prisma engine and `Disconnect()` to release resources from a running Prisma instance.

Once a connection to Prisma is available, execute the routes that we set earlier and map the server to a port number.

### Testing
The server is ready, and we can run it to them if the Go and Prisma are well set to execute the todos. Use the command `go run main.go` to run a Go app. This will start up the Go server using Echo.

![go-server-with-echo](/engineering-education/how-to-set-up-golong-api-with-the-prisma-orm/go-server-with-echo.png)

Once the server is up and running up, open your Postman, start testing out the different HTTP methods.

We will start by creating a new todo. Head over to Postman and create a POST method using the url `http://localhost:8080/todos/` as shown below.

![post-method](/engineering-education/how-to-set-up-golong-api-with-the-prisma-orm/post-method.png)

Hit **Send** to execute the above method, and the added todo will be added to your SQLite database and printed by the Postman as shown below.

![post-todo](/engineering-education/how-to-set-up-golong-api-with-the-prisma-orm/post-todo.png)

You can go ahead and try out adding several new todos.

Also, note every time you execute a method, a log will be registered in your command line console.

![http-logs](/engineering-education/how-to-set-up-golong-api-with-the-prisma-orm/logs.png)

Once you have added a todo list, you can send a GET request to fetch these todos.

![get-todos](/engineering-education/how-to-set-up-golong-api-with-the-prisma-orm/get-todos.png)

You can also fetch a single todo using its id as a request parameter, i.e., `http://localhost:8080/todos/:id` where `:id` is the id value of the todo you want to fetch.

### Conclusion
The beauty with the Prisma is that it made working with databases feel so intuitive and straightforward from the data modeling, running, migrations, writing the queries, and integrating it with the API.

I hope you found this helpful. Happy coding!