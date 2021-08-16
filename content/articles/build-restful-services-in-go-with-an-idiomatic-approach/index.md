**Go**, also known as *goLang*, is the brainchild of Rob Pike, Robert Griesemer, and Ken Thompson.

Go is:
- a *statically typed language*: the type of the variable is known during the compile time.
- similar to C but has garbage collection and concurrency, making it stand out from the other languages.

RESTful services are some of the most common practices used across software industries. In this tutorial, we will see how to build RESTful services using Go with an idiomatic approach. We will be building an *API* that returns *Coffee* object data.

## Pre-requisites
* Go installed on your system. You can download it from [here](https://golang.org/dl/).
* Basics of Go, if you aren't familiar with concepts like `interface`, `method`, etc., or new to Go, you can check out this excellent TDD tutorial over [here](https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/install-go).
* Familiarity with Go's packages like `net/http` and `encoding/json`.
* Basics of [REST](https://mlsdev.com/blog/81-a-beginner-s-tutorial-for-understanding-restful-api) services.

Without a further due, let's begin the tutorial.

The below image will give you a glimpse of how the folder is structured.
```html
go_RESTful
├───data
|   └───products.go
├───handlers
|   └───product_handler.go
└───main.go
```

We will start by creating a product structure, which will hold our *Coffee* product's data. In *products.go* under data folder, create a structure `Product` of type `struct` as shown below.
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
The `Product` struct has the fields mentioned above defined with struct tags, respectively. *struct tags* are a feature of Go that
allows us to add annotations to the fields and write parsers to pick up those annotations.

So here, our field name `ID` gets renamed to `id` in the http response as defined in the struct tag.
Also, we have defined `productList`, an array of type `Product` that holds the data about various Coffees.

In the next step, we will create a *handler* to handle the API requests. Create a new file *product_handler.go* under the *handlers* folder.

As shown below, we will define a new *struct* called `Products` whose methods will satisfy the `Handler` interface.
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

func NewProducts(l *log.Logger) *Products {
    return &Products{l}  
}

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

We use the standard `log` package to log the basic information about
our server and its events and write all the logs to `os.Stdout` stream.
Also, logging is a good practice, and they are beneficial while testing or debugging the code.

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

Here,
* `ph` is a `handler` that will reference our struct `Products` from *product_handler.go* and serve the `ServeHTTP` method.
* `sm` is an instance of `ServeMux`, a *multiplexer* to handle all the incoming HTTP requests.
  It compares the incoming HTTP requests against a lookup of predefined URL paths and calls that respective *handler* where the match is found.
* The method `ListenAndServe` listens to the TCP connection on the port defined and calls the `handler` to handle the requests.

---
**_Note:_**

As per the docs, the syntax for `ListenAndServe` is:
```go
func ListenAndServe(addr string, handler Handler) error
```
---
In our code, we are passing an instance of `ServeMux` as a *handler* here. It has a `ServeHTTP` method defined, and hence it will satisfy the `Handler` interface. When it is `nil`, it will call the `DefaultServeMux` internally.

So far, we have the *products* list and the handler template to serve the http requests. Now the question is, how do we pass the *Coffee* data from the `Product` structure to our `ServeHTTP` function.
For that, Go's standard library offers us a package called `encoding/json`, used for encoding/decoding json data. You can read about it more [here](https://blog.golang.org/json).

With the basic structure ready, we will define methods in the *products.go* file to return the `Product` data.
The reason behind defining those data model functions inside *products.go* is to create abstraction. 


Now, in the `products.go` file under *data* folder, we would need to create a function that
returns us the list of `Product` as shown:
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

func (p *Products) ToJSON(w io.Writer) error {
  e := json.NewEncoder(w)
  return e.Encode(p)
}

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
The *ToJSON* method has the function `NewEncoder` from `encoding/json` package that writes
data directly onto `io.Writer`.

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

func NewProducts(l *log.Logger) *Products {
  return &Products{l}
}

func (p *Products) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
  if r.Method == http.MethodGet {
    p.getProducts(rw, r)
    return
  }
  if r.Method == http.MethodPost {
    p.addProduct(rw, r)
    return
  }
  // if the method does not match the above methods.
  rw.WriteHeader(http.StatusMethodNotAllowed)
}

func (p *Products) getProducts(rw http.ResponseWriter, r *http.Request) {
  p.l.Println("Handle GET Products")
  // fetch the products from the productList
  lp := data.GetProducts()
  // serialize the list to JSON
  err := lp.ToJSON(rw)
  if err != nil {
    http.Error(rw, "Unable to convert it to json", http.StatusInternalServerError)
  }
}

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
We have added the methods to handle the requests. Now we will add the data model methods in *products.go*
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

func (p *Products) ToJSON(w io.Writer) error {
  e := json.NewEncoder(w)
  return e.Encode(p)
}

func (p *Product) FromJSON(r io.Reader) error {
  e := json.NewDecoder(r)
  return e.Decode(p)
}

func GetProducts() Products {
  return productList
}

func AddProduct(p *Product) {
  p.ID = getNextID()
  productList = append(productList, p)
}

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
This completes our implementation of RESTful services in Go, and attached below are the results of the API calls.

* `GET` request to query the current list of *Coffee* items.

![get request first](/engineering-education/build-restful-services-in-go-with-an-idiomatic-approach/get_first.png)

* `POST` request to insert a new *Coffee* item.

![post request](/engineering-education/build-restful-services-in-go-with-an-idiomatic-approach/post_first.png)

* To verify the newly added item, we will again call the `GET` method.

![get request second](/engineering-education/build-restful-services-in-go-with-an-idiomatic-approach/get_second.png)



## Conclusion
 
To conclude, we were able to:

* create handlers to handle `HTTP` requests respectively.
* understand how Go's standard packages like `encoding/json`, `log`, and `net/http` can be used.

## Additional Resources
* If you still don't get the whole idea of `Handler` interface, check out this source [here](https://perennialsky.medium.com/understand-handle-handler-and-handlefunc-in-go-e2c3c9ecef03).
* You can check out some additional helpful about `logger` [here](https://www.loggly.com/use-cases/logging-in-golang-how-to-start/).
* Last but not least, the go-to guide to understand and write better Go code is to follow the [Go-docs](https://pkg.go.dev/).
* As for the next step, you can use *PostgreSQL* to store/retrieve data and use the famous [*Gorilla Mux*](https://www.gorillatoolkit.org/) toolkit to handle the API requests.


