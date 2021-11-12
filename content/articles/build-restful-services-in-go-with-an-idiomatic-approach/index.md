---
layout: engineering-education
status: publish
published: true
url: /build-restful-services-in-go-with-an-idiomatic-approach/
title: Building RESTful Services in Go with an Idiomatic Approach
description: This article will walk the reader through how to build RESTful services using Go with an idiomatic approach. We will build an API that returns Coffee object data.
author: mahantesh-r
date: 2021-09-08T00:00:00-10:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-restful-services-in-go-with-an-idiomatic-approach/hero.png
    alt: Data Binding using Angular example image
---
**Go**, also known as *goLang*, is the [brainchild](https://en.wikipedia.org/wiki/Go_(programming_language)) of Rob Pike, Robert Griesemer, and Ken Thompson. The development started at Google in 2007 and was open-sourced in 2009, with version 1.0 released in March 2012. 
<!--more-->
As of writing this article, the latest version stands at *go1.17*.

Go is:

> A *statically typed language*.

> It is similar to *C* but has garbage collection and concurrency, making it stand out from the other languages.

Writing good, understandable code is what every developer seeks, and they learn those patterns, properties, etc., by being part of a community where people follow a certain style.

As ***Dave Cheney*** quotes in his article [*The Zen of Go*](https://dave.cheney.net/2020/02/23/the-zen-of-go):

> To say that something is idiomatic is to say that it follows the style of the time. If something is not idiomatic, it is not following the prevailing style. It is unfashionable.

RESTful services are some of the most common practices used across software industries. In this tutorial, we will see how to build RESTful services using Go with an idiomatic approach. We will build an *API* that returns Coffee object data.

### Prerequisites
To follow along the reader should have the following:
- Go installed on your system. You can download the latest version from [here](https://golang.org/dl/).
- Basics of Go, if you aren't familiar with concepts like `interface`, `method`, etc., or new to Go, you can check out this excellent TDD tutorial over [here](https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/install-go).
- Familiarity with Go's packages like `net/http` and `encoding/json`.
- Basics of [REST](https://mlsdev.com/blog/81-a-beginner-s-tutorial-for-understanding-restful-api) services.

The folder will be structured in the following manner:

```html
go_RESTful
├───data
|   └───products.go
├───handlers
|   └───product_handler.go
└───main.go
```

We will start by creating a product structure, which will hold our *Coffee* product's data. In *products.go* under the data folder, create a structure `Product` of type `struct` as shown below.
```go
package data  
  
import "time"  

type Product struct {  
  ID          int      `json:"id"`  
  Name        string   `json:"name" validate:"required"`  
  Description string   `json:"description"`  
  Price       float32  `json:"price" validate:"gte=0"`    
  CreatedOn   string   `json:"-"`  
  UpdatedOn   string   `json:"-"`  
  DeletedOn   string   `json:"-"`  
}  
   
// productList is a list of Coffees
var productList = []*Product{
  {
    ID:          1,
    Name:        "Latte",
    Description: "Made with espresso and steamed milk.",
    Price:       2.99,
    CreatedOn:   time.Now().UTC().String(),
    UpdatedOn:   time.Now().UTC().String(),
  },
  {
    ID:          2,
    Name:        "Mocaccino",
    Description: "A chocolate-flavoured warm beverage that is a variant of a caffè latte",
    Price:       1.99,
    CreatedOn:   time.Now().UTC().String(),
    UpdatedOn:   time.Now().UTC().String(),
  },
}
```

The `Product` struct has the fields mentioned above defined with struct tags, respectively. The *struct tags* feature allows us to add annotations to the fields and write parsers to pick up those annotations.

So here, our field name `ID` gets renamed to `id` in the http response as defined in the struct tag. We also defined `productList`, an array of type `Product` that holds the data about various Coffees.

We will create a *handler* to handle the API requests. Create a new file *product_handler.go* under the *handlers* folder. As shown below, we will define a new *struct* called `Products` whose methods will satisfy the `Handler` interface.

```go
package handlers
// handlers here is the folder name

import (
 "log"
 "net/http"
)

type Products struct {
    l *log.Logger
}

// a logger that references the Products struct
func NewProducts(l *log.Logger) *Products {
    return &Products{l}  
}

// function to handle the incoming requests
func (p *Products) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
    
}
```
and as per the docs, the syntax for a `Handler` is:
```go
type Handler interface {
  ServeHTTP(ResponseWriter, *Request)
}
```

Remember this general rule that anything that adheres to the http `handler` interface needs to have the `ServeHTTP` method.

We use the standard `log` package to log the basic information about our server and its events and write all the logs to `os.Stdout` stream.

Logging is also a good practice, and they are beneficial while testing or debugging the code.

The method `NewProducts` will be used as a reference to create a *handler* in the *main.go* file.

In the `main.go` file; we will create a reference for the `Handler`.

```go
package main

import (
  "log"
  "net/http"
  "os"
  "go_RESTful/handlers"
)

func main() {
  l := log.New(os.Stdout, "COFFEE-API", log.LstdFlags)
  ph := handlers.NewProducts(l)

  sm := http.NewServeMux()
  sm.Handle("/", ph)

  // register the handler with the server
  http.ListenAndServe(":4200", sm)
}
```

- `ph` is a `handler` that will reference our struct `Products` from *product_handler.go* and serve the `ServeHTTP` method.
- `sm` is an instance of `ServeMux`, a *multiplexer* to handle all the API requests. It compares the incoming HTTP requests against a lookup of predefined URL paths and calls that respective *handler* where the match is found.
- The method `ListenAndServe` listens to the TCP connection on the port defined and calls the `handler` to handle the requests.

***Note:***

As per the docs, the syntax for `ListenAndServe` is:
```go
func ListenAndServe(addr string, handler Handler) error
```

In our code, we are passing an instance of `ServeMux` as a *handler* here. It has a `ServeHTTP` method defined, and hence it will satisfy the `Handler` interface. When it is `nil`, it will call the `DefaultServeMux` internally.

So far, we have the *products* list and the handler template to serve the http requests. Now the question is, how do we pass the *Coffee* data from the `Product` structure to our `ServeHTTP` function.

For that, Go's standard library offers us a package called `encoding/json`, used for encoding/decoding json data. You can read about it more [here](https://blog.golang.org/json).

With the basic structure ready, we will define methods in the *products.go* file to return the `Product` data. The reason behind defining those data model functions inside *products.go* is to create *abstraction*. 

Now, in the `products.go` file under *data* folder, we will need to create a function that returns us the list of `Product` as shown:
```go
func GetProducts() []*Product {
return productList
} 
```

Rather than doing it this way, we will create a *type* called `Products`, a list of `Product`, and then add methods. 
```go
package data

import (
  "time"
  "io"
  "encoding/json"
)

type Product struct {
  ID          int      `json:"id"`
  Name        string   `json:"name" validate:"required"`
  Description string   `json:"description"`
  Price       float32  `json:"price" validate:"gte=0"`
  CreatedOn   string   `json:"-"`
  UpdatedOn   string   `json:"-"`
  DeletedOn   string   `json:"-"`
}

type Products []*Product

// converts the Product fields to JSON
func (p *Products) ToJSON(w io.Writer) error {
  e := json.NewEncoder(w)
  return e.Encode(p)
}

// returns the list of products
func GetProducts() Products {
  return productList
}

// productList is a list of products for this example data source
var productList = []*Product{
  {
    ID:          1,
    Name:        "Latte",
    Description: "Made with espresso and steamed milk.",
    Price:       2.99,
    CreatedOn:   time.Now().UTC().String(),
    UpdatedOn:   time.Now().UTC().String(),
  },
  {
    ID:          2,
    Name:        "Mocaccino",
    Description: "A chocolate-flavoured warm beverage that is a variant of a caffè latte",
    Price:       1.99,
    CreatedOn:   time.Now().UTC().String(),
    UpdatedOn:   time.Now().UTC().String(),
  },
}
```

The *ToJSON* method has the function `NewEncoder` from `encoding/json` package that writes data directly onto `io.Writer`.

The final step is to identify the type of incoming HTTP requests in the *product_handler.go* file and serve that method, respectively.
```go
package handlers

import (
  "log"
  "net/http"
  "go_RESTful/data"
)

type Products struct {
  l *log.Logger
}

// a logger that references the Products struct
func NewProducts(l *log.Logger) *Products {
  return &Products{l}
}

// function to handle the incoming requests
func (p *Products) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
  if r.Method == http.MethodGet {
    p.getProducts(rw, r)
    return
  }
  if r.Method == http.MethodPost {
    p.addProduct(rw, r)
    return
  }
  rw.WriteHeader(http.StatusMethodNotAllowed)
}

// function to handle GET requests
func (p *Products) getProducts(rw http.ResponseWriter, r *http.Request) {
  p.l.Println("Handle GET Products")
  lp := data.GetProducts()
  err := lp.ToJSON(rw)
  if err != nil {
    http.Error(rw, "Unable to convert it to json", http.StatusInternalServerError)
  }
}

// function to handle POST requests
func (p *Products) addProduct(rw http.ResponseWriter, r *http.Request) {
  p.l.Println("Handle POST Product")
  prod := &data.Product{}
  err := prod.FromJSON(r.Body)
  if err != nil {
    http.Error(rw, "Unable to unmarshal json", http.StatusBadRequest)
  }
  data.AddProduct(prod)
}
```

We have added the methods to handle the requests. Now we will add the data model methods in *products.go*.
```go
package data

import (
  "time"
  "io"
  "encoding/json"
)

type Product struct {
  ID          int      `json:"id"`
  Name        string   `json:"name" validate:"required"`
  Description string   `json:"description"`
  Price       float32  `json:"price" validate:"gte=0"`
  CreatedOn   string   `json:"-"`
  UpdatedOn   string   `json:"-"`
  DeletedOn   string   `json:"-"`
}

type Products []*Product

// converts the Product fields to JSON
func (p *Products) ToJSON(w io.Writer) error {
  e := json.NewEncoder(w)
  return e.Encode(p)
}

// converts incoming JSON data to Product fields
func (p *Product) FromJSON(r io.Reader) error {
  e := json.NewDecoder(r)
  return e.Decode(p)
}

// returns the list of products
func GetProducts() Products {
  return productList
}

// adding a new Product item to productList
func AddProduct(p *Product) {
  p.ID = getNextID()
  productList = append(productList, p)
}

// returns a new ID based on the last item in productList 
func getNextID() int {
  lp := productList[len(productList)-1]
  return lp.ID + 1
}

// productList is a list of products for this example data source
var productList = []*Product{
  {
    ID:          1,
    Name:        "Latte",
    Description: "Made with espresso and steamed milk.",
    Price:       2.99,
    CreatedOn:   time.Now().UTC().String(),
    UpdatedOn:   time.Now().UTC().String(),
  },
  {
    ID:          2,
    Name:        "Mocaccino",
    Description: "A chocolate-flavoured warm beverage that is a variant of a caffè latte",
    Price:       1.99,
    CreatedOn:   time.Now().UTC().String(),
    UpdatedOn:   time.Now().UTC().String(),
  },
}
```

From the terminal, within the project directory, run the command:
```go
  go run main.go
```

This completes our implementation of RESTful services in Go, and attached below are the results of the API calls.

- `GET` request to query the current list of *Coffee* items.

![get request first](/engineering-education/build-restful-services-in-go-with-an-idiomatic-approach/get-first.png)

- `POST` request to insert a new *Coffee* item.

![post request](/engineering-education/build-restful-services-in-go-with-an-idiomatic-approach/post-first.png)

- To verify the newly added item, we will again call the `GET` method.

![get request second](/engineering-education/build-restful-services-in-go-with-an-idiomatic-approach/get-second.png)

### Conclusion
To conclude, we have created handlers to handle `HTTP` requests. While ensuring the methods that operate on *Coffee* data list remain abstracted. Lastly, we now better understand how Go's standard packages like `encoding/json`, `log`, and `net/http` can be used. 

Happy coding!

### Additional resources
- If you still don't get the whole idea of the `Handler` interface, check out this source [here](https://perennialsky.medium.com/understand-handle-handler-and-handlefunc-in-go-e2c3c9ecef03).
- To understand more about `logger`, check out this [article](https://www.loggly.com/use-cases/logging-in-golang-how-to-start/).
- The go-to guide to understand and write better Go code is to follow [Go-docs](https://pkg.go.dev/).
- As for the next step, you can use *PostgreSQL* to store/retrieve data and use the popular [*Gorilla Mux*](https://www.gorillatoolkit.org/) toolkit to handle API calls.

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)



