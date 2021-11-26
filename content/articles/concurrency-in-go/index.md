---
layout: engineering-education
status: publish
published: true
url: /concurrency-in-go/
title: Concurrency in Go
description: This article provides an explanation of concurrency in Go. From the introduction of concurrency, to the distinction between concurrency and parallelism, and other concepts with an illustrative example.
author: anita-achu
date: 2021-09-23T00:00:00-00:00
topics: [Languages]
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/concurrency-in-go/hero.png
    alt: Go image
---
Concurrency describes a process that occurs at the same time as other activities. It assumes that all these activities are operating at the same time. 
<!--more-->
Smaller sub-programs make up large programs and these sub-programs work together at a similar time for the functioning of the large program. In essence, various tasks can run at the same time while they remain part of the same program. This is referred to as Concurrency. 

In programming, concurrency is "*the composition of independently executed processes...*". Concurrency refers to the ability of a program to divide into independent tasks that can all execute at the same time. It could be handling many requests from users or sending many responses to users.

### Concurrency vs Parallelism
A lot of developers intertwine concurrency and parallelism. Although these two terms may seem similar and, are often confused and substituted for one another, they do not mean the same thing.

Concurrency is the ability to deal with lots of programs at the same time. These programs execute at the same time one after another.

For example, a coffee shop with many customers requesting a cup of their choice of coffee. As a customer gets served, the order of another customer processes. Every customer gets served from the same coffee machine.

On the other hand, parallelism is the ability to do lots of programs at the same time. The same analogy applies, although, here there are different coffee machines. In both scenarios, customers are served at the same time. Parallelism is a tool used by concurrency to achieve its goal, however, it is not the goal of concurrency.

### Concurrency in Go
Concurrency in some other programming languages is achieved by using threads. If there are lots of things to be executed that the machine can't handle, thread pools are created to handle them. 

In Go, concurrency works through the use of in-built functions known as Goroutines.

[Goroutines](https://www.golangprograms.com/goroutines.html) are functions, unique to Go, that run at the same time alongside other code or programs.

They’re not OS threads, though, they may be considered lightweight threads.

Goroutines are deeply integrated with Go's runtime. Go's runtime monitors goroutine behavior and suspends them when they become blocked, then resumes them once they are unblocked. This makes them preemptible in some ways, but only when the goroutine is blocking.

The runtime and the logic of a goroutine work together. Goroutines can communicate with one another and synchronize their execution. In Go, one of the synchronization elements is called a channel. 

Though channels are used to synchronize memory access, they are best used for communicating information between goroutines. When data is to be shared across goroutines while performing a concurrent activity as a goroutine, channels function as a conduit (pipe) between the goroutines and provide a method that ensures asynchronous exchange.

After understanding the basics of Concurrency in Go, we will be building a simple command-line application that takes in some URLs, sends HTTP requests, and displays responses as output. Using this application, we will work with Go concurrency features and in-built functions. Let's get started!

In this application, we will create a simple command-line application in Go to show how concurrency features in Go operate and how they help our program run faster. 

This program will receive several URLs as input, send HTTP GET requests, and return the status code of the URLs. We will begin with writing a Go code with no concurrency and take note of the time of execution, afterwards, we will add concurrency and compare the difference in time of execution.

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func request(url string) {
	res, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	fmt.Printf("[%d] %s\n", res.StatusCode, url)
}

func main() {
	if len(os.Args) < 2 {
		log.Fatalln("Usage: go run main.go <url1> <url2> ... <urln>")
	}
	for _, url := range os.Args[1:] {
		request("https://" + url)
	}
}
```

This program contains two functions: the `request` function and the `main` function. The request function sends an `HTTP` request and also returns a response or an error if any. 

The `main` function is set to hold more than two arguments. Next, we iterate over the URLs and send requests.

In our terminal, we will pass in some URLs as a request and see how much time it took for our request to complete. Now, using the `time` command in your bash terminal pass in these URLs: 

```bash 
time go run main.go google.com github.com youtube.com amazon.com plaid.com gitlab.com heroku.com notion.com
```

Run the command. 

![Zero concurrency](/engineering-education/concurrency-in-go/noconcurrency.png)

The program was executed at exactly, 14.110s

In this program, we sent a request to the first argument and when its completes, a response comes in. Then the program returns to the for loop and sends another request to the next argument, and the process continues. 

We can see a waste of time while waiting for the response from one argument before a request is made to another argument. Which is a problem. 

Now think of it this way, what if while waiting for the response of the first argument we close up the gap in time, by sending another request for the second argument.

That is, as the response for the first argument is processing another request is made for the second argument instead of waiting for the first response to complete before another request can be made.  

Now, this is what concurrency using Goroutines comes in. 

### How Goroutines work
Goroutines allow our application to become asynchronous. 

Where there are more than one Goroutines, these Goroutines are submitted to the Go runtime scheduler which manages their lifecycle and allocates the Goroutine to several OS threads. 

If a goroutine starts blocking the Go scheduler performs what is referred to as a `context-switch`.

> Context switch is the process of storing the state of a thread so it can be restored and resume execution at a later point

So while one goroutine is stored in the background the Go scheduler gives the thread to another goroutine. 

Back in our program, let's add concurrency by creating a distinct goroutine for our main function. This way, every time we enter the *for loop*, each of our function calls gets its own goroutine, and each of our URLs executes **concurrently**.  

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func request(url string) {
	res, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	fmt.Printf("[%d] %s\n", res.StatusCode, url)
}

func main() {
	if len(os.Args) < 2 {
		log.Fatalln("Usage: go run main.go <url1> <url2> ... <urln>")
	}
	for _, url := range os.Args[1:] {
		go request("https://" + url)
	}
}
```

Here we are ran a separate goroutine for each of our URLs while running the same request function inside those goroutines.

![Goroutine](/engineering-education/concurrency-in-go/goroutine.png)

This program was completed in *1.895s* which is faster than the request without concurrency. 

However, there was no output. This is because though there are goroutines for each of the URLs when running none of the goroutines are completely processed till the program finishes executing. 

You can also observe that there is no output, our `print` command does not display the response because the main goroutine ends before them, and the main function was not told to wait for them. 

To solve this problem we use `WaitGroup`. `WaitGroup` is included in the Golang sync package. It includes features that allow it to block and wait for any number of goroutines to complete their execution.

Think of it in this manner, whenever we create a new goroutine we add 1 to that `WaitGroup` to increment it and when that goroutine completes the process we remove 1 to decrement it. As a result, when the counter reaches zero, we can be certain that all our goroutines were successfully executed.

Let's implement `WaitGroup`. 

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
)

var wg sync.WaitGroup

func request(url string) {
	defer wg.Done()
	res, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	fmt.Printf("[%d] %s\n", res.StatusCode, url)
}

func main() {
	if len(os.Args) < 2 {
		log.Fatalln("Usage: go run main.go <url1> <url2> ... <urln>")
	}
	for _, url := range os.Args[1:] {
		go request("https://" + url)
		wg.Add(1)
	}
	wg.Wait()
}
```

First, we declared a global variable, **WaitGroup** `var wg sync.WaitGroup`. 

Next, we added `wg.Add(1)` to increment our main function anytime we create a goroutine by adding one. Once we are done with the goroutine we proceed to call `wg.Done()` function. 

Lastly, we make our `main` function wait till all the goroutines are complete using `wg.Wait`. 

Let's quickly run this to see our output.

![Waitgroup](/engineering-education/concurrency-in-go/waitgroup.png)

All the application processes are completed and our application completed in *7.717s* which is two times faster than the first program with no concurrency and we have our output displayed. 

### Conclusion
We have covered the important aspects of concurrency in Go. From the introduction of concurrency, to the distinction between concurrency and parallelism, to how concurrency using goroutines works in Go, and other concepts such as Go scheduler, runtime, and WaitGroup.

Most importantly, we saw how concurrency helps our application work faster while receiving several requests. 

I hope this article gave you a good grasp of how concurrency works in Go. 

Happy coding! 🙂

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
