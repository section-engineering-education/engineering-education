---
layout: engineering-education
status: publish
published: true
url: /how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/
title: How to use Go Fiber and Gorm Frameworks to run a Golang Application
description: In this tutorial we will learn more about Go Fiber. We will use Go Fiber with Gorm and an SQLite database to build a todo application. 
author: joakim-gakure
date: 2021-11-16T00:00:00-17:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/hero.jpg
    alt: Golang Gorm frameworks
---
Go is a general-purpose language. You can use Go to build web apps, microservices, cloud services, APIs, DevOps tooling, and any application.
<!--more-->
Go Fiber is an Express-inspired framework for Golang. Go Fiber is a web framework built on top of fast HTTP. It can be used to handle operations such as routing/endpoints, middleware, server request, etc.

In this tutorial, we will learn more about Go Fiber. Then, we will use Go Fiber with Gorm and an SQLite database to build a todo application.

### Prerequisites
To follow along with this tutorial, ensure you have a basic knowledge of Golang. 

This include:
- Have the Go installed on your computer, run the `go version` command to verify Go installation.
- Being able to set up basic Golang application.
- Run and create Golang application as well as understand how to write Golang code.

### Setting up Go project
Like the standard basic application, create a project folder and open it with your favorite text editor. I will be using Visual studio code in this tutorial.

Go uses different libraries and frameworks. Therefore, when creating an application, you need to save the binaries of those packages within your project so that your app can access them.

Go also uses the file system to save module dependencies. This saves the Go module with the module paths and the sematic version associated with the currently installed module. We then import these modules to our application within the project's root directory.

Go uses [`go.mod` and `go.sum`](https://golangbyexample.com/go-mod-sum-module/) to manage these dependencies. `go.mod` contains all the indirect dependencies you install with the version that you want to use. Indirect dependencies are not used inside the project but are treated as indirect dependencies.

Also, any dependency mentioned in the `go.mod` package but not found in any of the source files is also considered an indirect dependency. `go.sum` maintains the checksum of the packages installed successfully.

If you rerun the project, it will not install all the packages. It does this by storing the package's cache in the `$GOPATH/pkg/mod` directory. A comparative example of this is when using Node.js and NPM. In this case, `package.json` and `package-lock.json` files are used to manage Node.js dependencies.

To initialize these files, run the following command at the root of your project directory.

```bash
go mod init go-fiber-app
```

A `go.mod` will be created with the following command:

```go
module go-fiber-app
go 1.17
```

In this case, `go-fiber-app` will be our direct module and a module declaration for maintaining version control.
`go-fiber-app` acts as a URL for importing local modules within our application. `go 1.17` is the go version currently running on your computer. `go.sum` will be created afterward when we start installing our packages.

### Setting up a basic Go Fiber server
Let's jump in and build our first HTTP Server in Go and get the most basic concept of Go Fiber. Just like Express, it is straightforward to start your first Go server using the Fiber framework.

Go Fiber is an Express inspired framework. So let's take one step back and see how we create a simple Node.js server with Express. Below is a basic server that utilizes the Express framework.

```js
// add Express library
const express = require("express");
// create a new Express instance
const app = express();
// Create a new endpoint
app.get("/", (req, res) => {
    // send text
    res.send("Hello World!");
});
// Start server on port 3000
app.listen(3000);
```

Now with Golang and using the Fiber framework, the above Node.js example works just the same. It is only some syntax that changes. The same HTTP server is being implemented but with a different language using different frameworks.

Let's dive in and see how we can create a look-alike server with Go and Fiber.

First, we need to make Fiber available for our app using the [go get](https://pkg.go.dev/cmd/go#hdr-Add_dependencies_to_current_module_and_install_them) command. 

Let's install it by running the following command:

```bash
go get -u github.com/gofiber/fiber/v2
```

Now we can start implementing our first Go Fiber inspired HTTP server. Go ahead and create a `main.go` file inside your project folder, then follow the steps below:

- Add the main module.

The main module is included in every Go file. It imports modules to other modules within the Go local files.

```go
package main
```

- Since we are using Fiber, we need to import the package to access the Go Fiber function and methods.

```go
// add Fiber package
import "github.com/gofiber/fiber/v2" 
```

- Add a main function.

The main function is a special Go method that defines the entry point of a Golang application. It's used to execute other explicit functions or a block of Golang code.

```go
func main() {
    // create a new Fiber instance
    app := fiber.New()
```

Within the `main` function, we are creating a new Fiber instance. This will instantiate a Fiber app.

- Create an endpoint.

`app.get` will set our default route function. It will take a `context` of Fiber context, and it expects an error. This `context` structure has all sorts of cool things. In our case, we are sending a plain string of text.

```go
// Create a new endpoint
app.Get("/", func(c *fiber.Ctx) error {
    // send text
    return c.SendString("Hello, World!")
})
```

- Define the server port.

Then set up a port number that our server will listen to and run on locally.

```go
// Start server on port 3000
app.Listen(":3000")
}
```

The app is ready, and we can now test it by running the following command:

```bash
go run main.go
```

Output:

![go-fiber-simple-server](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/go-fiber-simple-server.png)

There you have it. Your simplest Go Fiber HTTP server is up and running. Navigate to `http://127.0.0.1:3000/`, and a simple 'hello world' text displays on the browser.

### Setting up a Fiber todos application
The above is a simple HTTP server. Let's now dive into a more profound use case and explore more of the Go Fiber framework. We will use a todo application use case with an SQLite database to build a todos application.

Let's start by creating a project directory. Then, initialize Go with `go mod init go-fiber-todos`.

We will install the following packages.

- Gorm

```bash
go get -u gorm.io/gorm
```

- Gorm SQLite driver

```bash
go get -u gorm.io/driver/sqlite
```

- Google [UUID](https://pkg.go.dev/github.com/google/uuid)

```bash
go get github.com/google/uuid
```

- Air

Do you remember the [Nodemon](https://www.npmjs.com/package/nodemon) for the Node.js server? [Air](https://github.com/cosmtrek/air) works pretty much the same as Nodemon.

When you are building a server, you probably need to watch over your files. This way, you only start your server once. Then, when you make changes to your file, the server is automatically restarted again.

[Air](https://reposhub.com/go/miscellaneous/cosmtrek-air.html) is in the development package for Go. It live reloads your Go server whenever you modify your code. So you can set it up and focus on your code.

```bash
go get -u github.com/cosmtrek/air
```

### Setting up Air for our project
We need to set up Air so that the application can handle live reloads. Air will watch over the project files and directory, builds, and run the app by giving us some colorful logs output.

![air-live-reloads](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/air-live-reloads.gif)

To initialize Air run:

```bash
air init
```

The above command will create a `.air.toml` file to the current directory with the default settings. From there, you can just run `air` and start watching over your development server. Or run `air -d` to print all logs in a debug environment.

`.air.toml` is configurable. You can customize its parameters to suit your requirements. Check [this guide for more information](https://reposhub.com/go/miscellaneous/cosmtrek-air.html).

### Setting up the database
We are using Gorm to set up our SQLite database drivers. Gorm also utilizes [go-sqlite3](github.com/mattn/go-sqlite3) package to set up an SQLite database.

`go-sqlite3` is the `CGo` framework. `CGo` is a module in the Go programming language that enables the creation of packages that refer to C code. This means, if you are building your Go application using `go-sqlite3`, you need GCC (GNU Compiler Collection).

>The GCC compiler is an optimized version of the GNU Project that compiles various programming languages such as C code.

>[`go-sqlite3` documentation](https://github.com/mattn/go-sqlite3#installation) states that ***after you have built and installed go-sqlite3 with `go install github.com/mattn/go-sqlite3` (which requires GCC), you can build your app without relying on GCC in future.***

However, in our case, `go-sqlite3` is installed through the Gorm SQLite driver. Thus we need to set up a [GCC environment](https://gcc.gnu.org/install/). Let's [download GCC MinGW-w64](https://liquidtelecom.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/mingw-w64-install.exe) for 32 and 64 bit Windows operating systems. Then, install MinGW-w64 into your laptop.

While installing this, ensure you select the following architecture.

![gcc-for-windows](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/gcc-for-windows.png)

Once the installation is complete, add the GCC environment variable. Find the PATH environment variable in the System Variables section and add the GCC bin, i.e.,`C:\Program Files\mingw-w64\x86_64-8.1.0-posix-seh-rt_v6-rev0\mingw64\bin`. 

Ensure the path matches the bin path of the installed GCC. To apply these changes, you need to reboot your computer. Once that is done, run this command in your terminal to check if the changes were implemented.

```bash
gcc
```

If GCC is set, you will get this terminal output.

![gcc-installed](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/gcc-installed.png)

We are now ready to set up our SQLite database.

In your project root folder, create a folder and name it `database`. Inside this folder, create a `database.go` file. Let's start coding.

A `database` module that we will use to import to other local modules. The module is responsible for maintaining the connection to and operation of the database.

```go
// the database module
package database
```

Import SQLite drivers and Gorm. This will be responsible for creating our SQLite database.

```go
// import packages
import (
    _ "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)
```

Create a database instance for the Gorm connector.

```go
var (
    // Database instance => DB Gorm connector
    DBConn *gorm.DB
)
```

### Create todos
At the root directory, create a `todos` folder. Inside this folder, create a `todos.go` file. We will use it to define routes logic to handle the end-to-end processing of data.

CRUD operations are done based on models, which helps maintain the structure of the data sent to and received from clients (as well as the relationships between them). Therefore, we will add a todo model that maintains the structure of the sent and received data.

#### Create a todos module
```go
// the todos module
package todos
```

#### Import packages and modules
```go
import (
    // import modules
    "go-fiber-todos/database"
    "strconv"

    // import packages
    "github.com/gofiber/fiber/v2"
    "github.com/google/uuid"
    "gorm.io/gorm"
)
```

#### Add Todo structure
`struct` is used to hold the set of a model. In this case, we are setting and holding the todos database setting. We are mostly interested in the `ID`, `Name` and the completed `status` of a todo.

Gorm is helping us set this model. With Gorm, we can set up the data structure that we want to develop into our database. This helps to maintain the design of the data being sent and received.

```go
// Todo is a struct holding the todos settings.
type Todo struct {
    gorm.Model
    Id int `gorm:"primaryKey"`
    Name string `json:"name"`
    Completed bool `json:"completed"`
}
```

#### Fetch all todos
Here we are creating a `GetAll()` method. It will be responsible for handling all requests that fetch all the todos list. It is taking the Fiber context as a parameter to help set a handler. Once the todos are fetched, we will return them in JSON format.

```go
// @ func GetAll -> function that fetches a single all todos (Get all todos)
// @param c *fiber.Ctx -- fiber context
func GetAll(c *fiber.Ctx) error {
    db := database.DBConn
    var todoss []Todo
    db.Find(&todoss)
    // If the database read is successful
    return c.Status(fiber.StatusOK).JSON(todoss)
}
```

#### Fetch a single todo based on id
We are creating a `GetOne()` to fetch only one todo. In this case, when setting up this handler, we use the todo `id` as a parameter. This means we will create the handler endpoint as a route with a named parameter.

Go Fiber will map this parameter to the endpoint that requests a single todo. So, for example, when setting the route to handle `GetOne()`, an `id` unique to one todo will be parsed and then return the fetched data that matches that id/parameter.

In that case, we need to handle what the server sends back. If the `id` matches any existing todo, that todo will be returned to the Fiber context and output JSON format. If the `id` does not exist, the user will be served with an error `todo not found`.

```go
// @ func GetOne -> function that fetches a single todo (Get single todo)
// @param c *fiber.Ctx -- fiber context
func GetOne(ctx *fiber.Ctx) error {
    paramsId := ctx.Params("id")
    id, err := strconv.Atoi(paramsId)
    if err != nil {
        ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "cannot parse id",
        })
        return err
    }

    db := database.DBConn

    var todo Todo
    db.Find(&todo, id)

    // If the database read is successful
    if int(todo.Id) == id{
        return ctx.Status(fiber.StatusOK).JSON(todo)
    }

    // If the database fails to read the id parameter
    return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
        "error": "todo not found",
    })
}
```

#### Create a new todo
The `AddTodo()` function in the code below creates a new todo and saves it to the database. Here we are only adding `Name`. The `Completed` status is set to be `false` by default.

This is where the `uuid` comes into play. We use a UUID instance to generate and inspect our data structure before inserting it into the database. It generates an immutable Universally Unique IDentifier ([UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)) random number. Thus ensuring each id is unique to one todo.

```go
// @func AddTodo -> function that stores a new data (Create new todo)
// @param c *fiber.Ctx -- fiber context
func AddTodo(ctx *fiber.Ctx) error {
    db := database.DBConn
    type request struct {
        Name string `json:"name"`
    }
    // Parse POST data
    var body request
    err := ctx.BodyParser(&body)
    if err != nil {
        ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "cannot parse json",
        })
        return err
    }
    // Get the json struct that is required to send
    id := uuid.New()
    todo := Todo{
        Id: int(id.ID()),
        Name: body.Name,
        Completed: false,
        }
    // Insert to DB
    db.Create(&todo)

    return ctx.Status(fiber.StatusOK).JSON(todo)
}
```

#### Delete a todo based on id
In the code below, `DeleteTodo()` will delete an existing todo. We have to specify an id as a parameter to the Delete hanker and endpoint. This defines the single and unique todo we want to delete. 

There the id must be of an existing todo. Otherwise, we will return an error to that. We first need to fetch that todo and then send a delete request to the database to delete the id associated with that todo.

```go
// @func DeleteTodo -> a function that deletes the data (Delete todo)
// @param c *fiber.Ctx -- fiber context
func DeleteTodo(ctx *fiber.Ctx) error {
    db := database.DBConn
    paramsId := ctx.Params("id")
    id, err := strconv.Atoi(paramsId)
    if err != nil {
        return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "cannot parse id",
        })
    }

    var todo Todo
    db.First(&todo, id)

    if int(todo.Id) != id {
        return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "todo not found",
        })
    }

    db.Delete(&todo)

    return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
        "status": "todo deleted successfully",
    })
}
```

#### Update an existing todo
In the code below, the `UpdateTodo()` will update the values of an existing todo. We need to first fetch a single todo by specifying the parameter id. 

Here we can change the name of todo and the `completed` value of a todo. The completed value will update the todo as complete with a `true` value.

```go
// @func UpdateTodo -> a function that ulters a todo data (Update todo)
// @param c *fiber.Ctx -- fiber context
func UpdateTodo(ctx *fiber.Ctx) error {
    db := database.DBConn

    type request struct {
        Name *string `json:"name"`
        Completed *bool `json:"completed"`
    }

    paramsId := ctx.Params("id")
    id, err := strconv.Atoi(paramsId)
    if err != nil {
        return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "cannot parse id",
        })
    }

    var body request

    err = ctx.BodyParser(&body)
    if err != nil {
        return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error" : "Cannot parse body",
        })
    }

    var todo Todo
    // Check if todo exist, if exist assign it value to todo 
    db.First(&todo, id)

    // handling 404 error
    if int(todo.Id) != id {
        return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "todo not found",
        })
    }

    if body.Name != nil {
        todo.Name = *body.Name
    }

    if body.Completed != nil {
        todo.Completed = *body.Completed
    }

    db.Save(&todo)

    return ctx.Status(fiber.StatusOK).JSON(todo)
}
```

### Assigning handlers to the respective routes
We have added all the functions and handlers and defined all the logic for every CRUD operation. These handlers are accessed using the endpoint. These are `URLs` that send requests to perform an operation to a database or serve specific data to the user. We will implement this in the `main.go` file.

#### Create a todos module
```go
// the main module
package main
```

#### Import packages and modules
Here we are importing local, native and third-party packages and modules we want to use.

```go
import (
    // import packages
    "fmt"
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/logger"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"

    // import modules
    "go-fiber-todos/database"
    "go-fiber-todos/todos"
)
```

#### Set up the Fiber app
To execute the Go Fiber, we need to set a Fiber app. Here we are adding `Group`, which defines the routed for our handlers. `Group` is also used to set up routes common prefix. In this case, each path will have a `/v1` prefix.

```go
// App config => App denotes the Fiber application.
func setupV1(app *fiber.App) {
    // Group is used for Routes with a common prefix to define a new sub-router with optional middleware.
    v1 := app.Group("/v1")
    //Each route will have /v1 prefix
    setupTodosRoutes(v1)
}
```

#### Set up the application routes
Using the Fiber `Group`, let's set up our Routes. Each route will execute a single handler that we set in the `todo.go`. So here we are, adding simple routes and routes with parameters.

A simple route doesn't need any additional arguments besides the set `"/"` endpoint. However, a route with a parameter has additional arguments that you need to pass to execute a given endpoint. In our case, all routes with parameters take `:id` as the additional argument.

```go
// Router defines all router handle interface includes app and group router
func setupTodosRoutes(grp fiber.Router) {
    // Group is used for Routes with common prefix => Each route will have /todos prefix
    todosRoutes := grp.Group("/todos")
    // Route for Get all todos -> navigate to => http://127.0.0.1:3000/v1/todos/
    todosRoutes.Get("/", todos.GetAll)
    // Route for Get a todo -> navigate to => http://127.0.0.1:3000/v1/todos/<todo's id>
    todosRoutes.Get("/:id", todos.GetOne)
    // Route for Add a todo -> navigate to => http://127.0.0.1:3000/v1/todos/
    todosRoutes.Post("/", todos.AddTodo)
    // Route for Delete a todo -> navigate to => http://127.0.0.1:3000/v1/todos/<todo's id>
    todosRoutes.Delete("/:id", todos.DeleteTodo)
    // Route for Update a todo -> navigate to => http://127.0.0.1:3000/v1/todos/<todo's id>
    todosRoutes.Patch("/:id", todos.UpdateTodo)
}
```

#### Initialize the database
We set the database, but we didn't initialize or create the SQLite database. Here we need to create a `todos.db` file to save our todo.

We are also migrating the set database structure. All this will be created automatically when we build our application.

```go
// Database Connect function
func initDatabase() {
    // define error here to prevent overshadowing the global DB
    var err error
    // Create todos sqlite file & Config GORM config
    // GORM performs single create, update, delete operations in transactions by default to ensure database data integrity
    database.DBConn, err = gorm.Open(sqlite.Open("todos.db"), &gorm.Config{})

    // Connect to database
    if err != nil {
        // Database was connected
        panic("failed to connect database")
    }

    fmt.Println("Database successfully connected")

    // AutoMigrate run auto migration for gorm model
    database.DBConn.AutoMigrate(&todos.Todo{})
    // Initialize Database connection
    fmt.Println("Database Migrated")
}
```

#### Define the application entry point
This will define our application entry point. 

We are performing the following operation:
- Instantiate a new Fiber App.
- Call the `initDatabase()` method.
- Call the `setupV1(app)` method.
- Set up a middleware function for a simple route that returns plain text.
- Set up a logger middleware. This middleware will be used to log the HTTP verbs: GET, POST, PUT, etc. For each route when every HTTP verb gets invoked.
- Add a server port number. This will be used to run our server on localhost,
- Handle `panic` errors. `panic` is a Go inbuilt function that watches the execution of all the functions. If a function has an error, normal execution is immediately stopped.

```go
// entry point to our program
func main() {
    // call the New() method - used to instantiate a new Fiber App
    app := fiber.New()

    // call the initDatabase() method
    initDatabase()
    // call the setupV1(app) method
    setupV1(app)

    // Simple route => Middleware function
    app.Get("/", func(c *fiber.Ctx) error {
        // Returns plain text.
        return c.SendString("Hello, World!")
        // navigate to => http://127.0.0.1:3000
    })

    // sets up logger
    // Use middlewares for each route
    // This method will match all HTTP verbs: GET, POST, PUT etc Then create a log when every HTTP verb get invoked
    app.Use(logger.New(logger.Config{ // add Logger middleware with config
        Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
    }))

    // listen/Serve the new Fiber app on port 3000
    err := app.Listen(":3000")

    // handle panic errors => panic built-in function that stops the execution of a function and immediately normal execution of that function with an error
    if err != nil {
        panic(err)
    }
}
```

The todo application is set and ready for testing.

### Testing
We will use `air` command to start the server, i.e., run the following command inside your project root directory.

```bash
air
```

This builds an executable and saves it in a `temp` folder. Here is the command output.

![air-server](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/air-server.png)

With `air`, it becomes easy to watch and build our sever. If you change any code, the server will live-reload, build and run again. First, `air` will delete the `tmp` executable, rebuild the application, and save the newly built executable.

![air-live-reloaded-server](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/air-live-reloaded-server.png)

Let's now test our endpoints. Again, we will use Postman to test these endpoints.

Open your Postman and send a GET request to `http://127.0.0.1:3000` as shown below:

![postman-get-request](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/postman.png)

Let's now test the todo routes.

- Add a new todo.

Let's start by adding a list of todos to our database. Below is a sample todo list that I want to insert into the SQLite database. Next, navigate to Postman and perform a post request as illustrated below.

![add-a-new-todo](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/add-a-new-todo.png)

The new todo is as shown below:

![the-newly-added-todo](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/the-newly-added-todo.png)

If you get something different from what you added, you probably forgot one or two steps. Revisit your `AddTodo()` function or check to see if the JSON data that you are using is well-formatted.

Also, go ahead and add some other todos.

- Fetch todos.

Let's now fetch the added todo. Here will perform a get request as shown below:

![postman-get-request](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/postman.png)

![fetched-todos](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/fetched-todos.png)

- Fetch a single todo.

To fetch a single todo, you need to specify the id of the todo in your URL as a parameter. 

Check this example.

![single-todo](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/single-todo.png)

- Update a todo.

Once a todo is added, we can perform an update operation to change the values of that todo. Here we have to specify the id of the todo that we want to update values for. Then add the data that you want to replace your todo with.

![update-a-todo](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/update-a-todo.png)

Once you send a PATCH request, the values assigned to that todo's id will update. 

Here is an example:

![updated-todo](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/updated-todo.png)

- Delete a todo.

Let's now perform the last operation by deleting an existing todo. Let's specify the id of todo you want to delete, as shown below.

![todo-deleted](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/todo-deleted.png)

If you try to send a GET request to the deleted todo, you should get an error that states `" error": "todo not found"`

![deleted-todo-not-found](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/deleted-todo-not-found.png)

### Conclusion
Golang is a fantastic language. You can create almost any application that you otherwise would with other languages. In addition, Go can handle extensive applications. Thus, it can build applications of all levels while ensuring minimalism due to its ability to utilize multi-core processing.

Happy coding!

### Further readings
- [Golang - Programming Basics](/engineering-education/golang-part-2-programming-basics/)
- [Introduction to Golang](/engineering-education/golang-part-1-introduction/)
- [Advanced Programming Concepts with Go](/engineering-education/golang-advanced-programming-concepts/)
- [Concurrency in Go](/engineering-education/concurrency-in-go/)
- [Building RESTful Services in Go with an Idiomatic Approach](/engineering-education/build-restful-services-in-go-with-an-idiomatic-approach/)
- [How to build a REST-API using Golang and PostgreSQL](/engineering-education/build-a-rest-api-application-using-golang-and-postgresql-database/)

The code we used to build the todo application can be found on this [GitHub for further reference](https://github.com/Joakim-gakure/Go-todo-app-using-Go-Fiber-and-Gorm/tree/main).

I hope you found this tutorial helpful in understanding Go Fiber and how to use it to run and handle Go applications.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)