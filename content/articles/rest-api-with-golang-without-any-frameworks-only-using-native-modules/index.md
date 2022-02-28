Go is a fast-growing language among developers. Its popularity is still growing and unshaken. Golang ecosystem has a tone of native libraries. However, it has third-party libraries that developers can still choose to use.

When creating Rest API with Go, you might choose to use libraries such as Gorm, Go fiber, Gin, fast HTTP, etc. On the same, you can still combine this with other third-party libraries to come up with the API of your choice.

However, due to the many libraries that the Go ecosystem has, you can still choose native libraries that you don't have to download and build your APIs. In this guide, we will build a complete and functional REST API. This API will only use native libraries that Golang has.

### Requirements

To follow along with this tutorial, it's essential to have prior knowledge of how to work with Golang. Therefore, ensure you have the Golang IDE installed on your computer to execute the Golang code. Once installed, run the `go version` command to verify Go is installed.

Check this [guide](/engineering-education/golang-part-2-programming-basics/) to get started with how to write and run Golang programs.

### Set a Golang project

To start a Go project, you need to first initialize Go within your project. In this case, create a project folder where you want your app to live. Open a command line that points to the newly created directory, then initialize Golang using the following command:

```bash
go mod init native-go-api
```

This will initialize a Go project by creating a `go.mod` file. Any go package that you install, its dependencies are saved here. The `go.mod` file has a `native-go-api` module name that helps you create local modules and import them so that other local modules of your project can use them.

### Create a CRUD Golang REST API using native modules

Let's dive in and create a Golang REST API using native modules. This tutorial will use a movie use case. First, model the movie data you want your API to interact with. To do this, create a `models` folder at the root directory of your project. Then create a `movie.go` file and add the following model:

```go
package models

// Movie for modeling data dummy
type Movie struct {
 ID      string `json:"id"`
 Title    string `json:"title"`
 Description string `json:"description"`
}
```

Model set a blueprint of your API. it sets the data and its values. This adds the data types to each movie property the API will use. When using Go to create a model, use the keyword `struct`. In this case, set a `struct` of type `Movie` and add its properties as shown in the above code block.

This API will interact with some dummy data as the application database. Therefore, go ahead and create a dummy database within your application. To do this, create a folder `db` inside your project directory. Inside this `db` folder, create a `db.go` file and add the following code:

```go
package db

import (
 "native-go-api/models"
)

// set up a database dummy
var (
 Moviedb = make(map[string]models.Movie)
)
```

This will set up a database dummy `Moviedb`. This uses the `make` built-in function. It allocates and initializes memory of the object of type `map`. It takes a type as its first argument. `make` type returns the same as the type of its argument. In this case, `make` will refer to the type of `Movie` model set for the movies data.

### Setting up the movie handlers

An API uses HTTP methods to interact with your data. In this case, you need to set up the right function that refers to the HTTP methods such as GET, POST, PUT, and DELETE. This will also set up the request and response message that every HTTP method should return. In this example, the API will always return any data in JSON format.

Go ahead and set up a `ReturnJsonResponse` function for returning movies data in JSON format. To do this, create a `utils` folder inside your project directory. Inside this `utils` folder, create a `utils.go` file and add the following code:

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

This will use the native `http` module that Go has. The `ReturnJsonResponse` function will convert any response that the HTTP server returns and set the `Content-type` into JSON format.

Once this is set, go ahead and set your HTTP handler functions. First, create a `handler` folder. Inside this `handler` folder inside your project directory, create a `movies.go` file and start importing the Go native modules and the local modules created in the above steps:

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

This imports the local modules we have created. Other native modules used include the `encoding/json` for encoding any JSON data and `net/http` for setting up the server-based methods, requests, and responses.

Next, create the handler functions as follows.

#### Create an API test handler

To test if the API is working correctly, set a test handler that does not interact with the set API data.

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

#### Get Movies handler

To fetch all the movies list that the dummy database will have, Create a `GetMovies()` function as shown below.

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

This handler will access the database and check if there are any movie records. The server will fetch this list and return the response to the user. The serve will parse the movie data into JSON format then return the response message with the fetched data.

#### Get a single movie handler

Additionally, you can fetch a single movie inside the movies list database. In this case, the movie structure has an ID unique to every movie. When fetching a single movie, the server will use the id value as the parameter to decide which movie the user wat to fetch.

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

Here the endpoint that fetches a single movie will have the `id` as the URL parameter. This endpoint will only execute a GET request. If the user uses a different method, set the error message to show what they are supposed to do. If the user forgets to add the parameter `id`, add the response return message. Check other handler messages implemented in this function.

#### Add a movie handler

To add a movie, execute the POST method using this `AddMovie()` function.

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

This function will check the user's payload that has the new data that the user wants to add. The service will assign this data to the `req.Body`. Each added movie will have all the properties set in the `Movie` model. Thus if the user fails to specify this data field, the server will return an error message `Error parsing the movie data`. If the operation is successful, the server will return a server message `Movie was successfully created`.

#### Delete a movie handler

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

`DeleteMovie()` uses id add to the URL parameter. Based on the sent request, this checks for the exiting movies that the server should delete. For the server to delete that movie, it checks the parameter id against the id saved in the dummy data. If the movie was not found, the server would return a response message `Requested movie not found`.

### Initialize the server and routes

To execute the above handlers, you need to set up a server that execute of the local host, initialize the database data, and set up the routes that point to each handler function. To do so, create a `main.go` file inside the project directory. Then set up the server as follows:

First, import the local module ad the Go native modules.

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

- `fmt` - for setting `Println` messages.
- `log` - for logging basic application messages.
- `os` - for accessing the local computer to execute the server on the computer localhost system.
- `net/http` - for setting up the HTTP server and executing the server routes.

Next, create a `main()` as shown below. Inside this function:

```go
func main() {

}
```

- Add a print message that shows the server is running

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
// print any server based error messages
if err != nil {
 fmt.Println(err)
 os.Exit(1)
}
```

At this point, your server should be ready. To test it, run `go run main.go` and start interacting with the different routes of your API.

### Conclusion

This API has taught you how to use the native Go modules and create a basic movie API. These native modules help you interact with the native Golang language. The only problem with this is that it requires you to write many lines of code you could, however, avoid when using third-party libraries. Some of the Golang third-party libraries that you can use to set a server include, [mux](/engineering-education/build-a-rest-api-application-using-golang-and-postgresql-database/), [Go Fiber](/engineering-education/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/), [Gorm](/how-to-use-go-fiber-and-gorm-frameworks-to-run-a-golang-application/), and [Echo](/engineering-education/how-to-set-up-golong-api-with-the-prisma-orm/).
