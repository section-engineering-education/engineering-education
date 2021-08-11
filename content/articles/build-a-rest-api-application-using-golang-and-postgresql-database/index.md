[Golang](https://golang.org/) is an open-source programming language that makes it easy to build simple, reliable, and efficient apps. It is a very promising language. It's a very powerful language run. The Google team runs it. Certain technologies like Docker and Kubernetes are developed in Go. Go is a compiled language. When you write a code, you have to compile it and generate machine code directly. This tutorial will discuss Golang and finally create a REST API application using Golang and PostgreSQL database.

### How Golang came to be

Go was developed by Google. Go is commonly known as Golang. It is [refered as Golang](https://golang.org/doc/faq) due to its domain name `golang.org`, the reason being `go.org` was not available for use. Hence the Go language was shortened to Golang and thus the domain name `golang.org`.

The project of the Golang development started in 2007. Its main objective was to utilize multi-core processors. With the ability to develop large and distributed systems and highly scalable network servers.

Golang project was made opensource in 2009, and its very first initial version 1.0 was released in 2012.

The Google Jetbrain team refers to Go as the most promising programming language.

![Go-jetbrain](/engineering-education/build-a-rest-api-application-using-golang-and-postgresql-database/go-jetbrain.png)

[Image source](https://www.jetbrains.com/lp/devecosystem-2019/)

According to the JetBrains 2021 Developer Ecosystem survey, Go was classified as one of the first languages. It was also one of the top programming languages that developers are planning to adopt or migrate to.

![Jetbrain-survey](/engineering-education/build-a-rest-api-application-using-golang-and-postgresql-database/jetbrain-survey.png)

[Image source](https://www.jetbrains.com/lp/devecosystem-2021/)

The survey aimed to map the landscape of the developer community. Check out the survey to learn more on the [2021 survey report](https://www.jetbrains.com/lp/devecosystem-2021/).

Also, on a yearly survey done by stack overflow, Go was one of the topmost wanted languages developers want to learn.

![Stack-overflow-survey](/engineering-education/build-a-rest-api-application-using-golang-and-postgresql-database/stack-overflow-survey.png)

[Image source](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-wanted)

### Getting started with Go

To get started with Go, you need to get Go runtime installed on your computer. Install it, head over here, and select the Go environment that you want to install. Once downloaded, you can go ahead and install it. Once installed, you run the `go version` in your terminal, and the go version installed in your computer will be printed out. This way, you will know that Go is installed correctly and ready to tun some Golang code.

One thing about Go is that it is very opinionated on how you arrange and set up the project folder and file structure. This means you need to arrange your directory hierarchy well to tun Go code. Check this guide and learn how to arrange your [Go workflow](https://pkg.go.dev/go.temporal.io/temporal/workflow).

Here we are going to use Visual studio code to interact with go. So download he visula stusio code and intsall it. After that, open Visual studio code and download the following Go package. This will help us write and execute Go as well as providing inellicece for Go code.

![golang-vscode](/engineering-education/build-a-rest-api-application-using-golang-and-postgresql-database/golang-vscode.png)

Let's create a simple Go application and see how it works. We will create the simplest Go application (`Hello world!`) and see how God works. So create a project folder, open it using VisualStudio code, and create an `index.go` file.

- The first thing do when we create an application is to define a package. All go files are created inside a package. By default, the package is always `package main`. Thus, every file will have its package, which acts as a module for that file, and you can import it to the file.

- The next thing is to import modules (this could be local modules or Go modules). In this case, we would use the `fmt` module. `fmt` module allows you to print messages and text to the console, so we need to use it to lof a hello world string to the console.

- After that, you need an entry point for your application. This is a Go main function that helps you to execute your file and code. The function will be automatically be called when you build and run the Go program.

Now when you write the hello world program, you will have the following key properties.

```go
// Go package
package main

/// Go fmt import
import "fmt"

// Go main function
func main() {
    fmt.Println("Hello World!")
}
```

Now we need to run this application. To do so, open a terminal. You can use the Visual studio code integrated terminal. Else you can open your computer terminal and then cd to the project folder. Then run `go run <file name or file path for nested folders>`.

For this application, we will run `go run main.go`. This will execute and run the application and print the hello world on the console. And there, you have the simplest Go application set and running.

### Build a REST API application using Golang and PostgreSQL database

Golang is used on the server-side to create a backend for the web application. This means we can use it to create web-based APIs. So let's see how we can build a REST API application using Golang and PostgreSQL database.

#### Install PostgreSQL database setup

Since we are using PostgreSQL as our database, download and install [PostgreSQL](https://www.postgresql.org/download/windows/) into your local computer. Then we will create a database, add a table and some records to it. Here are some sample queries. First, create a `movies` database in your PostgreSQL pgAdmin.

To create a table use:

```sql
CREATE TABLE movies (
    id SERIAL,
    movieID varchar(50) NOT NULL,
    movieName varchar(50) NOT NULL,
    PRIMARY KEY (id)
)
```

To add some data to the table, use:

```sql
INSERT INTO movies (
    movieID,
    movieName
)
VALUES
    ('1', 'movie3'),
    ('2 ', 'movie2'),
    ('3', 'movie1');
```

#### Add the package main

Create a file at the root of your project directory and name it `index.go`. As we said, we need to define a package for the Go file. Since this will be the main file we have, we add the `package main`.

```go
package main
```

#### Import the necessary packages

```go
import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/mux"
    _ "github.com/lib/pq"
)
```

- `fmt` and `log` - for logging errors and printing messaging
- `encoding/json` - Go core package for handling JSON data.
- `database/sql` - Go core package for handling SQL-based database communication.
- `net/http` - a Go HTTP package for handling HTTP requesting when creating GO APIs
- `[mux](github.com/gorilla/mux)` - for URL matcher and routing. It helps in implementing request routers and match each incoming request with its matching handler.
- `[pq](github.com/lib/pq)` - a Go PostgreSQL driver for handling the database/SQL package

Here we have two third-party libraries. To use them, we need to install them so that our app can access and use them.

First, run `go mod init example.com/m`. This will generate a `go.mod` file that saves the third-party libraries we require. To install `mux` run `go get github.com/gorilla/mux`. To install `pq` run `go get github.com/lib/pq`.

#### Add PostgreSQL database connection parameters

To communicate to a SQL database such as PostgreSQL, we need to add some database parameters to help us access the database and manipulate data. This includes the database user (by default, this should be `postgres`), the password set when installing PostgreSQL, and a database name you want to use.

```go
const (
    DB_USER     = "postgres"
    DB_PASSWORD = "12345678"
    DB_NAME     = "movies"
)

// DB set up
func setupDB() *sql.DB {
    dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
    db, err := sql.Open("postgres", dbinfo)

    checkErr(err)

    return db
}
```

#### Add JSON structs

A struct is like a class. It's used for object-oriented programming in Golang, which can have properties and methods. Structs work similarly to an ES6 class in JavaScript and classes in Java and C sharp. For example, the struct `Movie` will define the json fields that we want to fetch. The struct `JsonResponse` will display the Json response once the data is fetched.

```go
type Movie struct {
    MovieID   string `json:"movieid"`
    MovieName string `json:"moviename"`
}

type JsonResponse struct {
    Type    string `json:"type"`
    Data    []Movie `json:"data"`
    Message string `json:"message"`
}
```

#### Add Go main function

When the main function gets executed, we also need to run some endpoints that will help us get into the server through an HTTP request. Here, each endpoint will execute a method. When that endpoint is called, the method will be executed by calling the function that defines the necessary parameters for a certain method. So first, initialize the `mux` router, then add the router handlers to establish the endpoints for our API. Finally, add a port to serve the application.

```go
// Main function
func main() {

    // Init the mux router
    router := mux.NewRouter()

// Route handles & endpoints

    // Get all movies
    router.HandleFunc("/movies/", GetMovies).Methods("GET")

    // Create a movie
    router.HandleFunc("/movies/", CreateMovie).Methods("POST")

    // Delete a specific movie by the movieID
    router.HandleFunc("/movies/{movieid}", DeleteMovie).Methods("DELETE")

    // Delete all movies
    router.HandleFunc("/movies/", DeleteMovies).Methods("DELETE")

    // serve the app
    fmt.Println("Server at 8080")
    log.Fatal(http.ListenAndServe(":8000", router))
}
```

#### Function for handling messages

For printing messages, we are adding a function that will help us handle which message to log depending on what part of the application we will be interacting with.

```go
// Function for handling messages
func printMessage(message string) {
    fmt.Println("")
    fmt.Println(message)
    fmt.Println("")
}
```

#### Function for handling errors

To track any error that may occur while executing the application, we are adding a function that will check and log that error.

```go
// Function for handling errors
func checkErr(err error) {
    if err != nil {
        panic(err)
    }
}
```

#### Fetch all records

```go
// Get all movies

// response and request handlers
func GetMovies(w http.ResponseWriter, r *http.Request) {
    db := setupDB()

    printMessage("Getting movies...")

    // Get all movies from movies table that don't have movieID = "1"
    rows, err := db.Query("SELECT * FROM movies")

    // check errors
    checkErr(err)

    // var response []JsonResponse
    var movies []Movie

    // Foreach movie
    for rows.Next() {
        var id int
        var movieID string
        var movieName string

        err = rows.Scan(&id, &movieID, &movieName)

        // check errors
        checkErr(err)

        movies = append(movies, Movie{MovieID: movieID, MovieName: movieName})
    }

    var response = JsonResponse{Type: "success", Data: movies}

    json.NewEncoder(w).Encode(response)
}
```

#### Insert a record into the database

```go
// Create a movie

// response and request handlers
func CreateMovie(w http.ResponseWriter, r *http.Request) {
    movieID := r.FormValue("movieid")
    movieName := r.FormValue("moviename")

    var response = JsonResponse{}

    if movieID == "" || movieName == "" {
        response = JsonResponse{Type: "error", Message: "You are missing movieID or movieName parameter."}
    } else {
        db := setupDB()

        printMessage("Inserting movie into DB")

        fmt.Println("Inserting new movie with ID: " + movieID + " and name: " + movieName)

        var lastInsertID int
    err := db.QueryRow("INSERT INTO movies(movieID, movieName) VALUES($1, $2) returning id;", movieID, movieName).Scan(&lastInsertID)

    // check errors
    checkErr(err)

    response = JsonResponse{Type: "success", Message: "The movie has been inserted successfully!"}
    }

    json.NewEncoder(w).Encode(response)
}
```

#### Delete a single record

```go
// Delete a movie

// response and request handlers
func DeleteMovie(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)

    movieID := params["movieid"]

    var response = JsonResponse{}

    if movieID == "" {
        response = JsonResponse{Type: "error", Message: "You are missing movieID parameter."}
    } else {
        db := setupDB()

        printMessage("Deleting movie from DB")

        _, err := db.Exec("DELETE FROM movies where movieID = $1", movieID)

        // check errors
        checkErr(err)

        response = JsonResponse{Type: "success", Message: "The movie has been deleted successfully!"}
    }

    json.NewEncoder(w).Encode(response)
}
```

#### Delete all records

```go
// Delete all movies

// response and request handlers
func DeleteMovies(w http.ResponseWriter, r *http.Request) {
    db := setupDB()

    printMessage("Deleting all movies...")

    _, err := db.Exec("DELETE FROM movies")

    // check errors
    checkErr(err)

    printMessage("All movies have been deleted successfully!")

    var response = JsonResponse{Type: "success", Message: "All movies have been deleted successfully!"}

    json.NewEncoder(w).Encode(response)
}
```

### Testing

Once done with the above, we can now run and est this app. To run it, open the terminal and change the directory to the project directory and run `go run index.go`. This will successfully start the app and serve it so that we can access it.

To start testing, use postman and start sending requests to the respective endpoints.

### Some pros and cons of using Golang

- Go is made to be compatible with large enterprises. Go has the ability to handle a large amount of data processing. Go is a good choice if the application is progressively increasing the amount of data to process.
- Go processes data with low latency. This means you don't have to worry about the response time between when a user requests some data and when that data is served to the user.
- Well-established concurrency and multi-threading support. Go concurrency is built within the language itself and not from libraries and external features. Thus compiling and execution are done faster
- Go focuses a lot on the efficiency of the application. It is very minimalistic. It has a small code base with no generics templates and separate runtime libraries. Thus when compiled, the binary ends up being small. This makes Golang fast to write, compile and execute.
- Learning curve. Go is a combination of low-level languages such as C and modern languages such as Python. This makes it easier to learn if you have previously learned another language before. Also, like Trpescipt go supports structural and static typing. You can spot errors before compilation; hence, basics can be learned quickly, making it fast to learn.
- It has no GUI library. Thus you'll need to connect the library instead of using native solutions available in languages such as Python or java.
- Go is still a young language. Go doesn't have the maturity and user experience that many other established languages such as Java and Python have. However, they have huge built-in code and many libraries constantly created and maintained by different open-source community developers. The fact that it is still young means that the job market for Go programmers isn't extensive yet.

### Conclusion

Go is a fantastic and quite elegant language. Go aims to speed the efficiency of low-level languages such as C. Go shines most with its ability to utilize multi-core processing, which ensures low memory usage and low GPU power.