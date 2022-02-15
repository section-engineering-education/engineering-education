---
layout: engineering-education
status: publish
published: true
url: /implement-graphql-api-using-golang-and-mongodb-database/
title: How to Implement a GraphQL API Server using Golang and MongoDB
description: In this tutorial, the reader will learn how to implement a GraphQL API server using Golang and MongoDB.
author: joakim-gakure
date: 2022-02-15T01:00:00-08:30
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/implement-graphql-api-using-golang-and-mongodb-database/hero.jpg
    alt: How to Implement a GraphQL API server using Go lang and MongoDB Hero Image
---
GraphQL is a query language for APIs that allow a client and a server to exchange data. 
<!--more-->
It allows developers to structure data-driven applications much more efficiently than in REST and SOAP approaches. 

GraphQL gives a detailed and understandable representation of the data through an API. It enables clients to request only the data that they need rather than the whole API data structure. 

This makes it easier and faster to modify APIs over time. It also gives developers access to robust development tools, as well as more control over how they use data in their apps.

GraphQL can be implemented with different languages and databases such as Golang and MongoDB. Go is a general-purpose language, meaning it can be used for different things. 

For instance, you can use Go to build web apps, microservices, cloud services, APIs, DevOps tooling, and other applications. This means you will probably use Go to build a server-side-based application. 

Just like Node.js, you need the right tools to handle server-side code. After developing your application with Go, you might need a database to store data, such as the NoSQL MongoDB database. 

MongoDB is a document-oriented database management system, classified as a NoSQL database. It stores data in JSON-like documents.

While interacting with a web-based application, you might not be aware of the data format that users send. Therefore, a NoSQL database such as MongoDB would be a good solution for data handling and storage.

This guide runs a GraphQL server using Golang and a MongoDB database. This Go GraphQL server will use [gqlgen](https://gqlgen.com/) Framework to bootstrap GraphQL boilerplate code.

### Table of contents
- [Prerequisites](#prerequisites)
- [What is gqlgen?](#what-is-gqlgen)
- [Setting up Go GraphQL server using gqlgen](#setting-up-go-graphql-server-using-gqlgen)
- [Setting up a GraphQL API with MongoDB database](#setting-up-a-graphql-api-with-mongodb-database)
- [Setting up the MongoDB database](#setting-up-the-mongodb-database)
- [Setting up Queries and Mutations](#setting-up-queries-and-mutations)
- [Setting the Go server](#set-the-go-server)
- [Conclusion](#conclusion)

### Prerequisites
To fully understand this guide, it's essential to have:

- Some basic knowledge of writing and running Golang code.
- Fundamental knowledge of how GraphQL APIs work.

### What is gqlgen?
When creating GraphQL API with Go, you need to first decide which libraries to use to set it up. 

Go has different libraries that help one to build a minimal type-safe server. This include [gophers](https://github.com/graph-gophers/graphql-go), [gqlgen](https://github.com/99designs/gqlgen), [thunder](https://github.com/samsarahq/thunder) and [graphql-go](https://github.com/graphql-go/graphql). 

This guide will focus on using the *gqlgen* library. Check out this [guide](https://gqlgen.com/feature-comparison/) to understand the feature comparison between these Go GraphQL implementation libraries.

[Gqlgen](https://github.com/99designs/gqlgen) is a Go package that allows developers to create and generate type-safe GraphQL servers. Gqlgen makes the building of GraphQL server intuitive and straightforward. It adds features such as:

**Schema first**

GraphQL API uses Schema Definition Language (SDL) to define types. This allows you to describe the shape of the result that you want your GraphQL endpoint to get. 

As a result, you always get consistent API data that is short, concise, and easy to read. This creates schema reusability that both the client and server can understand.

Since the schema definition comes first, the back-end team can use SDL mocks to spin up a server that queries specific data. 

This means that the front-end teams can begin writing client code while the server is simultaneously being developed.

**Code generation**

Building a GraphQL from scratch can be tiresome and time-consuming. *Gqlgen* simplifies the hard task of developing GraphQL APIs, allowing you to focus on the logic of your Go applications. 

It generates a boilerplate code template that has a ready-to-run GraphQL example. This is similar to some of the popular backend frameworks such as React.js, Angular and Svelte. 

However, using gqlgen puts you a step ahead when building your application. This is because it is easy to set up as compared to other frameworks.

### Setting up Go GraphQL server using gqlgen
To set a Go application, you first need to initialize the Go modules file using `go mod init`, as shown below:

```bash
go mod init go-graphql-mongodb-api
```

This will set up a `go.mod` file with `go-graphql-mongodb-api` as the local module. Once that is done, go ahead and set up a GraphQL gqlgen project using the `gqlgen init` command.

First, install gqlgen using `go get github.com/99designs/gqlgen`. Then initialize gqlgen by running this command:

```bash
go run github.com/99designs/gqlgen init
```

This will generate files and folders at the root of your project with a *todos* boilerplate GraphQL API. Some of these generated files include;

- `gqlgen.yml` - This is the default gqlgen configuration file, which allows the gqlgen dependencies to control the code that gqlgen creates for your application sample.

- `graph/generated/generated.go` - It contains the heavy code that gqlgen generates. This abstracts you from writing your Go GraphQL API from scratch. It also controls the execution runtime for GraphQL.

- `graph/model/models_gen.go` - It contains *todos* model that bootstrap the boilerplate graph, or the graph you intend to build.

- `graph/schema.graphqls` - This is where you will write your graph schemas and set them up.

- `graph/schema.resolvers.go` - It executes your application logic code and gets the data that a request wants to get from the application you build.

- `server.go` - It defines your application *main* function. This is a basic entry point that provides the HTTP handlers and routes required to start a Go server.

You can test if your generated files are working by running `go run server.go` in your project's root directory. 

If you navigate to `http://localhost:8080/` on the browser, you will be served with a GraphQL playground where you can start interacting with the generated GraphQL server.

> Note: You may encounter a handler error while running the `go run server.go`. To solve this, run the following command and install the handler dependencies.

```bash
go get github.com/99designs/gqlgen/graphql/handler/transport
go get github.com/99designs/gqlgen/graphql/handler/lru
go get github.com/99designs/gqlgen/graphql/handler/extension
```

### Setting up a GraphQL API with MongoDB database
Let's dive in and create a GraphQL Movie API that uses the MongoDB database. Start by defining the movie schema. 

A schema defines the data that the Movie API will hold. Navigate to `graph/schema.graphqls` file and make the following changes;

```go
type Movie{
  id: ID!
  name: String!
}

input NewMovie{
  name: String!
}

type Mutation{
  createMovie (input: NewMovie!): Movie!
}

type Query {
  movie(_id: String!): Movie!
  movies: [Movie!]!
}
```

This will create a `Movie` type with a `Query` that returns the movies. Each movie consists of the *movie id* and *movie name*. 

The schema also defines the input value that the API needs when creating the movies and a mutation for creating that movie.

Now you need to regenerate the rest of the boilerplate code based on the schema that you just defined. To do this run:

```bash
go run github.com/99designs/gqlgen generate
```

This may require you to delete the `CreateTodo` and `Todos` functions. Navigate to your `graph/schema.resolvers.go` file and delete the above-listed functions.

This may also require you to install the following gqlgen dependencies:

```bash
go get github.com/99designs/gqlgen/internal/imports
go get github.com/99designs/gqlgen/internal/code
go get github.com/99designs/gqlgen/cmd
```

Once done, run the command `go run github.com/99designs/gqlgen generate` again, and your code template will be updated to reflect the new schema. 

You can also run `go run server.go` to test if the regenerated template works.

### Setting up the MongoDB database
You now have all the code that's related to GraphQL. Now we need to implement the logic that handles database operations. 

First, create a `database` directory at the root of your project and add a `database.go` file.

Next, install the MongoDB Go driver by running the command below:

```bash
go get go.mongodb.org/mongo-driver/mongo
```

Next, Follow these steps to implement the GraphQL MongoDB logic.

**Create the database package and import the packages:**

```go
package database

import (
    "time"
    "fmt"
    "context"
    "log"


    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo/readpref"
    "go.mongodb.org/mongo-driver/mongo"
    "go-graphql-mongodb-api/graph/model"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/bson/primitive"

)
```

**Create a database struct:**

```go
type DB struct {
    client *mongo.Client
}
```

This takes a `client` of type `mongo.Client`.

**Set the MongoDB connection client:**

```go
func Connect(dbUrl string) *DB {
    client, err := mongo.NewClient(options.Client().ApplyURI(dbUrl))
    if err != nil {
        log.Fatal(err)
    }
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    err = client.Connect(ctx)
    if err != nil {
        log.Fatal(err)
    }
    err = client.Ping(ctx, readpref.Primary())
    if err != nil {
        log.Fatal(err)
    }

    ctx, cancel = context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()
    err = client.Ping(ctx, readpref.Primary())
    if err != nil {
        log.Fatal(err)
    }

    return &DB{
    client: client,
    }
}
```

`Connect()` function initializes the `mongo.Client` by starting background monitoring goroutines to monitor the deployment state. 

The `NewClient` command generates a new client to connect to the deployment indicated by the `uri`, which is the `mongo.Client`.

While this monitoring is happening in the background, use the `client.Ping` method to verify if the connection to the `mongo.Client` was created successfully. 

If a successful connection is initiated, it will return the `DB struct` values with the MongoDB client connection.

Start implementing the necessary methods to perform any database operation, i.e., CRUD operations. You need these functionalities to perform any action on the database, such as creating new movies or fetching a list of existing movies.

**Insert a movie to Mongo database:**

```go
func (db *DB) InsertMovieById(movie model.NewMovie) *model.Movie {
    movieColl := db.client.Database("graphql-mongodb-api-db").Collection("movie")
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    inserg, err := movieColl.InsertOne(ctx, bson.D{{Key: "name", Value: movie.Name}})

    if err != nil { 
        log.Fatal(err)
    }

    insertedID := inserg.InsertedID.(primitive.ObjectID).Hex()
    returnMovie := model.Movie{ID: insertedID, Name: movie.Name}

    return &returnMovie
}
```

This will basically add a new movie object to the database. MongoDB will first auto-create a `graphql-mongodb-api-db` database and a `movie` collection for saving new movie inputs. 

Each movie query will add a movie document with the *name* and *id* to the created collection. In this case, *id* is a value generated by the MongoDB driver, which is of type `primitive.ObjectID` created from a *hex* string.

The method `InsertMovieById()` will only `InsertOne()` document at a time. The `InsertOne()` function runs an insert command to add a single document to the collection. It takes document parameter `name` to be inserted based on the current `Value` of the insert command.

**Fetch a single movie from the MongoDB database based on the MovieId:**

```go
func (db *DB) FindMovieById(id string) *model.Movie {
    ObjectID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        log.Fatal(err)
    }

    movieColl := db.client.Database("graphql-mongodb-api-db").Collection("movie")
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    res := movieColl.FindOne(ctx, bson.M{"_id": ObjectID})

    movie := model.Movie{ID: id}

    res.Decode(&movie)

    return &movie
}
```

`FindMovieById()` is based on getting a single result from the database document. 

For this operation to successfully return a single document, you need to compare the value `primitive.ObjectIDFromHex(id)` with the document `_id`. 

This process is carried out in the background, and if successful, `FindOne()` will execute a `select` command and return a single movie for one document in the collection.

In this case, `ObjectID` acts as a filter parameter for the document containing the query response. This is then used to select the document to be returned.

**Fetch all added movies from the MongoDB database:**

```go
func (db *DB) All() []*model.Movie {
    movieColl := db.client.Database("graphql-mongodb-api-db").Collection("movie")
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    cur, err := movieColl.Find(ctx, bson.D{})
    if err != nil {
        log.Fatal(err)
    }

    var movies []*model.Movie
    for cur.Next(ctx) {
        sus, err := cur.Current.Elements()
        fmt.Println(sus)
        if err != nil {
            log.Fatal(err)
        }

        movie := model.Movie{ID: (sus[0].String()), Name: (sus[1].String())}

        movies = append(movies, &movie)
        }

    return movies
}
```

`All()` will get all the movie lists saved to the `movie` collection. This will basically execute a `Find()` and return all matching documents in the `movie` collection. 

These documents will be fetched based on how they are saved in the collection. `Next()` gets the next document for this operation. 

`Next()` is only returned when a document is available or if the `Next()` block returns *false*, making the subsequent calls *false*.

### Setting up Queries and Mutations
GraphQL uses queries to fetch data from a server. A query will essentially specify the data you want the GraphQL to return. 

Mutations, on the other hand, are similar to queries and can be used to return data from the GraphQL API. Mutations are typically used when you want to run a query that writes data to a GraphQL server.

In this step, we need to set the GraphQL server queries based on the query defined in the `schema.graphqls` file. 

To do this, edit the `schema.resolvers.go` file, `queryResolver`, and the `mutationResolver`.

Navigate to `schema.resolvers.go` file and edit it as follows:

Since you are accessing the MongoDB database, ensure you have imported the `database` module.

```go
import (
"go-graphql-mongodb-api/database"
)
```

Then, create the following `db` variable. It has the connection URL that connects to the MongoDB database. Add this variable at the end of your `schema.resolvers.go` file:

```go
var db = database.Connect("mongodb://localhost:27017/")
```

**Edit the CreateMovie mutationResolver:**

`CreateMovie()` adds a movie document to a MongoDB database. Thus it's supposed to return the `InsertMovieById()` input value. 

This method executes a query that writes data. Therefore, you must refer to a `Mutation()` to return `generated.MutationResolver` implementation. 

Below is how your `CreateMovie()` should look once updated:

```go
func (r *mutationResolver) CreateMovie(ctx context.Context, input model.NewMovie) (*model.Movie, error) {
    return db.InsertMovieById(input), nil
}
```

**Edit the Movie queryResolver:**

`Movie()` gets a single movie document from a MongoDB database. Thus it's supposed to return the `FindMovieById(id)`. 

`Movie()` executes a query that reads data, thus you must refer to it using `Query()` to return the `generated.QueryResolver` implementation. Below is how your `Movie()` should look once updated:

```go
func (r *queryResolver) Movie(ctx context.Context, id string) (*model.Movie, error) {
    return db.FindMovieById(id), nil
}
```

**Edit the Movies queryResolver:**

`Movies()` gets movie documents from a MongoDB database. Therefore, it's supposed to return the `All()` argument. 

Since `Movies()` executes a query that reads data, you can refer it to a `Query()` to return the `generated.QueryResolver` implementation. Below is how your `Movies()` should look once updated:

```go
func (r *queryResolver) Movies(ctx context.Context) ([]*model.Movie, error) {
    return db.All(), nil
}
```

**Import the packages:**

```go
import (
    "net/http"
    "log"
    "os"

    "go-graphql-mongodb-api/database"
    "go-graphql-mongodb-api/graph"
    "go-graphql-mongodb-api/graph/generated"

    "github.com/99designs/gqlgen/graphql/handler"
    "github.com/rs/cors"
    "github.com/99designs/gqlgen/graphql/playground"  
)
```

### Set the Go server
To run this GraphQL API, you need to expose the methods you have created to localhost to access them using an endpoint. To implement this, use the following steps:

**Install the `AllowedOrigins` CORS package:**

```bash
go get github.com/rs/cors
```

**Import the packages:**

```go
import (
    "net/http"
    "log"
    "os"

    "go-graphql-mongodb-api/database"
    "go-graphql-mongodb-api/graph"
    "go-graphql-mongodb-api/graph/generated"

    "github.com/99designs/gqlgen/graphql/handler"
    "github.com/rs/cors"
    "github.com/99designs/gqlgen/graphql/playground"  
)
```

**Create a default server port:**

```go
const defaultPort = "8080"
```

**Create the Go main function:**

```go
func main() {
    database.Connect("mongodb://localhost:27017/")
    c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"},
        AllowCredentials: true,
    })

    port := os.Getenv("PORT")
    if port == "" {
        port = defaultPort
    }

    srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

    http.Handle("/", playground.Handler("GraphQL playground", "/query"))
    http.Handle("/query", c.Handler(srv))

    log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}
```

This will execute the MongoDB connection URL and expose it to localhost that uses the Go core `"net/http"` module. 

You then expose `Resolvers` to the server using an HTTP `Handler`. The `NewExecutableSchema` will create an `ExecutableSchema` from the ResolverRoot interface.

The server is ready, and you can now test it out. Navigate to your project root directory and run `go run server.go`. 

This will expose the GraphQL API on `http://localhost:8080/`. If you open `http://localhost:8080/` on a browser, you will be served with a GraphQL playground.

Now you can start interacting with the GraphQL API to test if it connects to the MongoDB database. Start by creating new movie items. 

Add the following mutation to your GraphQL playground query panel and press the *play* button:

```go
mutation createMovie {
  createMovie(
    input: {
      name: "My test movie title"
    }
  ) {
    name
  }
}
```

![create-movie](/engineering-education/implement-graphql-api-using-golang-and-mongodb-database/create-movie.png)

This will execute the above query and return the added movie. If you head over to your MongoDB Compass, a `graphql-mongodb-api-db` database and a `movie` collection will be created. 

The new movie will be added as a document to the `movie` collection.

![mongodb-database](/engineering-education/implement-graphql-api-using-golang-and-mongodb-database/mongodb-database.png)

Go ahead and try adding more movie items using the above query. Also, try executing queries for:

**Getting a single movie:**

```go
query Movie{
  movie (_id: ":id") {
    id
    name
  }
}
```

Where `:id` is the `_id` value of the movie you want your GraphQL API to return.

**Getting all movies:**

```go
query Movies{
  movies {
    id
    name
  }
}
```

### Conclusion
This guide has used *gqlgen* to set up a GraphQL API. Gqlgen allows you to bootstrap a GraphQL code with a sample GraphQL API. 

I hope you have learned how simple it is to set up a basic GraphQL API without writing the entire code from scratch. You can use *gqlgen* to connect your GraphQL API to other databases.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)