---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-rest-api-with-golang-using-native-modules/
title: How to Build a REST API with Golang using Native Modules
description: This tutorial will walk the reader through how to build a REST API with Golang using native modules.
author: joakim-gakure
date: 2022-05-04T00:00:00-06:30
topics: [Languages, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-rest-api-with-golang-using-native-modules/hero.png
    alt: How to Build a REST API with Golang using Native Modules Hero Image
---
Go is a fast-growing language among developers. Golang ecosystem has a ton of native libraries. However, it also has third-party libraries that developers can use to build APIs.
<!--more-->
When creating REST APIs with Go, you can choose to use various third-party libraries, such as *Gorm, Go fiber, Gin, fast HTTP*, etc. 

Developers can also use libraries that are native to Golang. These libraries do not require you to download them into your local project when building APIs.

In this guide, we will build a basic REST API using Golang's native libraries. We will not use any third-party libraries, meaning we won't download any library in our local project.

### Table of contents
- [Prerequisites](#prerequisites)
- [Setting up a Golang project](#setting-up-a-golang-project)
- [Create a CRUD Golang REST API using native modules](#create-a-crud-golang-rest-api-using-native-modules)
- [Setting up the movie handlers](#setting-up-the-movie-handlers)
  - [Creating an API test handler](#creating-an-api-test-handler)
  - [Getting Movies handler](#getting-movies-handler)
  - [Getting a single movie handler](#getting-a-single-movie-handler)
  - [Adding a movie handler](#adding-a-movie-handler)
  - [Deleting a movie handler](#deleting-a-movie-handler)
- [Initializing the server and routes](#initializing-the-server-and-routes)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader will need:
- Some basic knowledge of Golang. 
- An IDE installed on your computer (Preferably VS Code).
- [Go](https://go.dev/doc/install) installed on your computer.  

Once you have installed Go, run the command below to verify Go's version.

 ```bash
go version
``` 

Check this [guide](/engineering-education/golang-part-2-programming-basics/) to get started with how to write and run Golang programs.

### Setting up a Golang project
To start a Go project, you need to first initialize Go within your project. 

Create a project folder where you want your app to live. Open a command line that points to the newly created directory, then initialize Golang using the following command:

```bash
go mod init native-go-api
```

This will instantiate Go by creating a `go.mod` file. Any Go package that you install, and its dependencies, are saved here. 

The `go.mod` file has a `native-go-api` module name. This helps you create local modules and import them so that other local modules of your project can use them.

### Creating a CRUD Golang REST API using native modules
Let's dive in and create a Golang REST API using native modules. In this tutorial, we will create a simple movie API. It will help showcase how to use these native libraries in a typical Golang application.

First, you need to model the data you want your API to interact with. To do this, create a `models` folder at the root directory of your project. 

Then create a `movie.go` file and add the following model:

```go
package models

// Movie for modeling data dummy
type Movie struct {
 ID      string `json:"id"`
 Title    string `json:"title"`
 Description string `json:"description"`
}
```

A model sets a blueprint of your API. It sets the data and its values. This adds the data types to each movie property that the API will use. 

When using Go to create a model, use the keyword `struct`. Here, set a `struct` of type `Movie` and add its properties as shown in the code block above.

This API will interact with dummy data as the application database. Therefore, create a dummy database within your application. 

To do this, create a folder `db` inside your project directory. Inside this `db` folder, create a `db.go` file and add the following code:

```go
package db

import ("native-go-api/models")

// set up a database dummy
var (Moviedb = make(map[string]models.Movie))
```

This will set up a dummy database, `Moviedb`. This uses the `make` built-in function, it allocates and initializes a memory object of type `map`. 

It also takes a type as its first argument, `make` type returns the same data as the type of its argument. Here, `make` will refer to the type of `Movie` model set for the movies data.

### Setting up the movie handlers
An API uses HTTP methods to interact with your data. Therefore, you need to set up the right function that refers to the HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`. 

This will also set up the request and response message that every HTTP method should return.

In this example, the API will always return any data in JSON format. We need to set up a `ReturnJsonResponse` function that will return the movies data in JSON format. 

To do this, create a `utils` folder inside your project directory. Inside this `utils` folder, create a `utils.go` file and add the following code:

```go
package utils

import (
 "net/http"
)

// ReturnJsonResponse function for returning movies data in JSON format
func ReturnJsonResponse(res http.ResponseWriter, httpCode int, resMessage []byte) {
 res.Header().Set("Content-type", "application/json")
 res.WriteHeader(httpCode)
 res.Write(resMessage)
}
```

This will use the Go's native `http` module. The `ReturnJsonResponse` function will convert any response that the HTTP server returns and set the `Content-type` as JSON.

Once this is set, specify your HTTP handler functions. First, create a `handler` folder inside your project directory. 

Inside this `handler` folder, create a `movies.go` file and start importing the Go native modules and the local modules created in the above steps, as shown below:

```go
package handler

import (
 "native-go-api/models"
 "native-go-api/db"
 "native-go-api/utils"
 "net/http"
 "encoding/json"
)
```

This imports the local modules that we have created. Other native modules used include the `encoding/json` for encoding any JSON data and `net/http` for setting up the server-based methods, requests, and responses.

Next, let's create the `handler` functions as follows.

#### Creating an API test handler
Set a test handler that does not interact with the set API data to test if the API works correctly.

```go
// root api test handler
func TestHandler(res http.ResponseWriter, req *http.Request) {

 // Add the response return message
 HandlerMessage := []byte(`{
  "success": true,
  "message": "The server is running properly"
  }`)

 utils.ReturnJsonResponse(res, http.StatusOK, HandlerMessage)
}
```

When this handler is executed, it will return the set message to show that the server is ready.

#### Getting Movies handler
To fetch all the movies list that the dummy database will have, create a `GetMovies()` function as shown below:

```go
// Get Movies handler
func GetMovies(res http.ResponseWriter, req *http.Request) {

 if req.Method != "GET" {

  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Check your HTTP method: Invalid HTTP method executed",
  }`)

  utils.ReturnJsonResponse(res, http.StatusMethodNotAllowed, HandlerMessage)
  return
 }

 var movies []models.Movie

 for _, movie := range db.Moviedb {
  movies = append(movies, movie)
 }

 // parse the movie data into json format
 movieJSON, err := json.Marshal(&movies)
 if err != nil {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Error parsing the movie data",
  }`)

  utils.ReturnJsonResponse(res, http.StatusInternalServerError, HandlerMessage)
  return
 }

 utils.ReturnJsonResponse(res, http.StatusOK, movieJSON)
}
```

This handler will access the database and check if there are any movie records. The server will fetch this list and return the response to the user. 

The server will parse the movie data into JSON format, then return the response message with the fetched data.

#### Getting a single movie handler
Additionally, you can fetch a single movie from the movies list database. The movie structure has an `ID` unique to every movie in this case. 

When fetching a single movie, the server will use the `ID` value as the parameter to decide which movie the user wants to fetch.

```go
// Get a single movie handler
func GetMovie(res http.ResponseWriter, req *http.Request) {

 if req.Method != "GET" {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Check your HTTP method: Invalid HTTP method executed",
  }`)

  utils.ReturnJsonResponse(res, http.StatusMethodNotAllowed, HandlerMessage)
  return
 }

 if _, ok := req.URL.Query()["id"]; !ok {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "This method requires the movie id",
  }`)

  utils.ReturnJsonResponse(res, http.StatusInternalServerError, HandlerMessage)
  return
 }

 id := req.URL.Query()["id"][0]

 movie, ok := db.Moviedb[id]
 if !ok {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Requested movie not found",
  }`)

  utils.ReturnJsonResponse(res, http.StatusNotFound, HandlerMessage)
  return
 }

 // parse the movie data into json format
 movieJSON, err := json.Marshal(&movie)
 if err != nil {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Error parsing the movie data",
  }`)

  utils.ReturnJsonResponse(res, http.StatusInternalServerError, HandlerMessage)
  return
 }

 utils.ReturnJsonResponse(res, http.StatusOK, movieJSON)
}
```

Here the endpoint that fetches a single movie will have the `id` as the URL parameter. This endpoint will only execute a `GET` request. 

If the user uses a different method, set the error message to show what they are supposed to do. If the user forgets to add the parameter `id`, add the response return message. Check other handler messages implemented in this function.

#### Adding a movie handler
To add a movie, execute the POST method using the `AddMovie()` function below:

```go
// Add a movie handler
func AddMovie(res http.ResponseWriter, req *http.Request) {

 if req.Method != "POST" {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Check your HTTP method: Invalid HTTP method executed",
  }`)

  utils.ReturnJsonResponse(res, http.StatusMethodNotAllowed, HandlerMessage)
  return
 }

 var movie models.Movie

 payload := req.Body

 defer req.Body.Close()
 // parse the movie data into json format
 err := json.NewDecoder(payload).Decode(&movie)
 if err != nil {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Error parsing the movie data",
  }`)

  utils.ReturnJsonResponse(res, http.StatusInternalServerError, HandlerMessage)
  return
 }

 db.Moviedb[movie.ID] = movie
 // Add the response return message
 HandlerMessage := []byte(`{
  "success": true,
  "message": "Movie was successfully created",
  }`)

 utils.ReturnJsonResponse(res, http.StatusCreated, HandlerMessage)
}
```

This function will check the user's payload with the new data that the user wants to add. The service will assign this data to the `req.Body`. Each added movie will have all the properties set in the `Movie` model. 

Thus, if the user fails to specify this data field, the server will return an error message `Error parsing the movie data`. 

If the operation is successful, the server will return a server message `Movie was successfully created`.

#### Deleting a movie handler
To delete a movie record, add this `DeleteMovie()` function to your handler list.

```go
// Delete a movie handler
func DeleteMovie(res http.ResponseWriter, req *http.Request) {

 if req.Method != "DELETE" {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Check your HTTP method: Invalid HTTP method executed",
  }`)

  utils.ReturnJsonResponse(res, http.StatusMethodNotAllowed, HandlerMessage)
  return
 }

 if _, ok := req.URL.Query()["id"]; !ok {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "This method requires the movie id",
  }`)

  utils.ReturnJsonResponse(res, http.StatusBadRequest, HandlerMessage)
  return
 }

 id := req.URL.Query()["id"][0]
 movie, ok := db.Moviedb[id]
 if !ok {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Requested movie not found",
  }`)

  utils.ReturnJsonResponse(res, http.StatusNotFound, HandlerMessage)
  return
 }
 // parse the movie data into json format
 movieJSON, err := json.Marshal(&movie)
 if err != nil {
  // Add the response return message
  HandlerMessage := []byte(`{
   "success": false,
   "message": "Error parsing the movie data"
  }`)

  utils.ReturnJsonResponse(res, http.StatusBadRequest, HandlerMessage)
  return
 }

 utils.ReturnJsonResponse(res, http.StatusOK, movieJSON)
}
```

`DeleteMovie()` uses `id` to add to the `URL` parameter. Based on the request sent, this checks for the existing movies that the server should delete. 

For the server to delete that movie, it checks the parameter id against the id saved in the dummy data. If the movie is not found, the server would return a response message `Requested movie not found`.

### Initializing the server and routes
To execute the above handlers, you need to:
- Set up a server that runs on the localhost.
- Initialize the database data.
- Set up the routes that point to each handler function.

To do so, create a `main.go` file inside the project directory. Then set up the server:

First, import the local module and the Go native modules.

```go
package main

import (
 "fmt"
 "log"
 "native-go-api/db"
 "native-go-api/handler"
 "native-go-api/models"
 "net/http"
 "os"
)
```

Here import the following native modules:
- `fmt` - For setting `Println` messages.
- `log` - For logging basic application messages.
- `os` - For accessing the local computer to execute the server locally.
- `net/http` - For setting up the HTTP server and executing the server routes.

Next, create a `main()` as shown below:

```go
func main() {

}
```

Inside this function:

- Add a print message that shows the server is running.

```go
log.Print("The is Server Running on localhost port 3000")
```

- Initialize the database and set the dummy database data.

```go
// initialize the database
db.Moviedb["001"] = models.Movie{ID: "001", Title: "A Space Odyssey", Description: "Science fiction"}
db.Moviedb["002"] = models.Movie{ID: "002", Title: "Citizen Kane", Description: "Drama"}
db.Moviedb["003"] = models.Movie{ID: "003", Title: "Raiders of the Lost Ark", Description: "Action and adventure"}
db.Moviedb["004"] = models.Movie{ID: "004", Title: "66. The General", Description: "Comedy"}
```

- Add the server routes that point to each handler.

```go
// route goes here

// test route
http.HandleFunc("/", handler.TestHandler)
// get movies
http.HandleFunc("movies", handler.GetMovies)
// get a single movie
http.HandleFunc("/movie", handler.GetMovie)
// Add movie
http.HandleFunc("/movie/add", handler.AddMovie)
// delete movie
http.HandleFunc("/movie/delete", handler.DeleteMovie)
```

- Set the server port and start the server.

```go
// listen port
err := http.ListenAndServe(":3000", nil)
// print any server-based error messages
if err != nil {
 fmt.Println(err)
 os.Exit(1)
}
```

Your server should be ready. To test it, run `go run main.go` and start interacting with the different routes of your API.

### Conclusion
This tutorial has taught you how to use the native Go modules and create a basic movie API. These native modules help developers interact with the vanilla Golang code.

Some Golang third-party libraries you can use to set a server include, [mux](/engineering-education/build-a-rest-api-application-using-golang-and-postgresql-database/), [Go Fiber](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/), [Gorm](/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/), and [Echo](/engineering-education/how-to-set-up-golong-api-with-the-prisma-orm/).

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)