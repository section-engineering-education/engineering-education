---
layout: engineering-education
status: publish
published: true
url: /concurrency-in-go/
title: Concurrency in Go
description: This article provides a detailed explanation of  what is concurrency in Go. From the introduction of concurrency to the distinction between concurrency and parallelism, and other concepts with a built in project as an example
author: anita-achu
date: 2021-09-03T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/concurrency-in-go/hero.png
    alt: Go image
---



The term "concurrency" describes a process that happens at the same time with one or more other activities. It is assumed that all these processes are operating at the same time. Smaller sub-programs make up large programs. What is ideal is for these smaller sub-programs to together run at a similar time for the functioning of the larger application or program. This means a program that has two or more tasks can execute simultaneously and are still part of the same program. This is what is referred to as Concurrency. In programming, concurrency is "the composition of independently executed processes...". Simply, concurrency refers to a program's ability to be divided into independent tasks that can be executed at the same time. it could be handling many requests from users or sending many responses to users.

### Concurrency vs Parallelism

A lot of developers intertwine concurrency with parallelism. Though these two terms may seem similar and are often confusing and substituted for the other, they do not mean the same thing. Concurrency is the ability to deal with lots of programs at the same time. These programs are executed at the same time one after another. For example, a coffee shop with many customers requesting to get a cup of their preferred choice of coffee. While one customer gets served, the other customer makes their order according to their choice and gets served from the same coffee machine.

Parallelism on the other hand is the ability to do lots of programs at the same time. Using the same analogy as earlier, here there is a different coffee machine for customers according to their choice of coffee. 

In both scenarios, customers are served at the same time. Therefore, parallelism is a tool that concurrency can employ to accomplish its goals, but it should be remembered that parallelism is not the ultimate aim of concurrency.

### Concurrency in Go

Before the development of Go, concurrent codes in other programming languages were written in threads and if there are lots of things to be executed concurrently which the machine can not handle, threat pools were created to handle that.  

In Go, concurrency is done through the use of in-built functions known as Goroutines and channels. [Goroutines](https://www.golangprograms.com/goroutines.html) is a function that runs simultaneously alongside other code or programs. Goroutines are unique to Go. They’re not OS threads though they may be considered lightweight threads. Goroutines are deeply integrated with Go runtime. Go's runtime monitors goroutine behavior and suspends them when they become blocked, then resumes them once they are unblocked. This makes them preemptible in some ways, but only when the goroutine is blocked. The runtime and the logic of a goroutine work together beautifully.

 

**[Channels](https://www.golangprograms.com/go-language/channels.html)**

Goroutines can interact with one another and synchronize their execution through channels.

In Go, one of the synchronization elements is called a channel. Though they are used to synchronize memory access, they are ideal for communicating information between goroutines. 

When data has to be shared across goroutines while performing a concurrent activity as a goroutine, channels function as a conduit (pipe) between the goroutines and provide a method that ensures asynchronous exchange.

After understanding the basics of Concurrency in Go, we will be building a simple command-line application that takes in some URLs and sends HTTP requests, and displays responses as output. 

Through this application, we will use the Go concurrency model and have a better understanding of how it works. 

 

*Let's get started!*

We begin by writing a Go code with no concurrency, then subsequently we will add concurrency. 

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

This program contains two functions: the *request function* and the *main function*. The request function sends an *HTTP* request and also returns a response or an error if any. 

The *main function* is set to hold more than two arguments. Next, we iterate over the URLs and send requests.

Let's run this on our terminal, using the *time* command we can see how long this program can run. I will pass in some URLs. Add this in your bash terminal: `time go run main.go google.com github.com youtube.com facebook.com` run this command and see how many seconds it took. 

So, we sent a request to the first argument and once it's completed and a response comes in, then the program returns to the for loop and sends another request to the next argument, and the process continues.

We can see a waste of time while waiting for the response from one argument before a request is made to another argument. 

*Think of it this way*, what if we close up the gap in time while waiting for the response of the first argument we can send another request for the second argument. That is, as the response for the first argument is processing another request is made for the second argument. Instead of waiting for the first response to come back before another request can be made.  

Now, this is what concurrency using Goroutines solves. 

**How Goroutines work**  

Goroutines allow our application to become asynchronous. 

Where there are more than one Goroutines, these Goroutines are submitted to the Go runtime scheduler which manages their lifecycle. Then allocates the Goroutine to a number of os threads. If a goroutine starts blocking the Go scheduler performs what is referred to as a *"context-switch".*

> *The context switch is the process of storing the state of a thread so it can be restored and resume execution at a later point*

So while one goroutine is stored in the background the go scheduler gives the thread to another goroutine. 

Now we are running a separate goroutine for each of our URLs and we are running the same request function inside those goroutines. Though there are goroutines for each of the URLs when running none of the goroutines would be completely processed yet the program would finish executing. This is because the main goroutine exists before them and we never told the main function to *wait* for them. 

To solve this problem we use *WaitGroup.* 

*WaitGroup* is included in the golang sync package. It includes features that allow it to block and wait for any number of goroutines to complete their execution.

Think of it in this manner, whenever we create a new goroutine we add 1 to that **WaitGroup** to increment it and when that goroutine completes the process we remove 1 to decrement it.

Let's implement WaitGroup. 

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

Firstly, we declared a global variable, **WaitGroup** `var wg sync.WaitGroup` Next, anytime we create a goroutine in our main function we increment it by adding one, `wg.Add(1)`  Once we are doing with the goroutine we proceed to call `wg.Done()` function. Lastly, we make our *main function* wait till all the goroutines are complete using `wg.Wait`. 
When we run this, all the application processes are completed.

We have covered every aspect of concurrency in Go. From the introduction of concurrency to the distinction between concurrency and parallelism, Go concurrency built-in, how concurrency using goroutines work in Go, and other concepts such as Go scheduler, runtime, and **WaitGroup**. 

I hope this article gave you a good grasp of what concurrency in Go means. 

Thank you and Happy coding! 🙂