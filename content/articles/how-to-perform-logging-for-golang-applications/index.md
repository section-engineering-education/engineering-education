---
layout: engineering-education
status: publish
published: true
url: /how-to-perform-logging-for-golang-applications/
title: Introduction on Performing Logging in Go applications
description: This tutorial introduces the concept of logging, and how to perform logging using the Go programming language.
author: antony-gitau
date: 2022-03-17T00:00:00-12:51
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-perform-logging-for-golang-applications/hero.jpg
    alt: How to Perform logging for Go applications Hero Image
---
Go is used to build backend-based applications. As a developer, you might need to know what is going on behind the scenes of your running app. For example, you need to know when a certain activity is carried out to track what comes in and out of your application. Thus, you need to set up a logging wrapper that will help you get to know more of the task your server is doing.
<!--more-->
This guide introduces the concept of logging using the Go programming language. First, we will explain this concept and how it works. Then build an application that has logging within a Golang application.

### What is logging
When you have created an application for production, many problems can happen that are out of your control and unexpected. The hardest part of fixing such problems is identifying where the problem is. The same application may also require reports showing how your users are interacting with different modules and services of your application. And whenever things go wrong, you want to know what's happened to your application codebase. In this case, you would want the same application to give you feedback behind the scenes of your code execution.

The concept of logging tries to solve this for you. But, unfortunately, it leaves a trail of breadcrumbs. So whenever something goes wrong, you can determine the cause at the right time and solve it before it messes up your application. Logging allows you to write your application status messages to files, databases, or other output streams. These messages contain information on which parts of your code have been executed and what problems may have arisen.

### Why logging
As a developer, logging plays a critical role in fixing an error in your application. First, it helps you determine which section of your code is causing an issue. This essentially helps you debug your application by letting you track step by step execution of your application. There are several tools that we can use for debugging. However, logging messages is arguably one of the most efficient ways to debug your code.

To help you prioritize which code issues need more attention, logging classified logging messages to different logging levels. A logging level acts as a message filter. These logging include Trace < Debug < Info < Warn < Error < Fatal, based on the priority order.

Logging can be applied to almost any programming language. So let's dive in and see how we can set up some basic logging for the Go application.

### Set up logging for Go apps
First, you need to initialize a Go application on your computer. Thus, you need to install Go. Check Golang installation in case you haven't installed it yet. Once installed, run `go version` to check if Go has been installed. Then create and navigate to a project folder and initialize Go using `go mod init go-logging-app`. This will set up some ready to write Go code.

Go has several standard packages that allow you to set loggers in your application. However, Go has a logging package built for native Golang.

To set up a basic log with Go, create a `main.go` at the root of your project folder. To start simple logging, you can use a [log](https://pkg.go.dev/log) package to create a simple base logger. Go ahead and add the following to your `main.go` file.

```go
package main

import (
    "log"
)

func main() {
    log.Printf("This is my first baci Golang")
}
```

Then run your application using `go run main.go`. This will log a basic message to your console, i.e., `2022/01/29 16:51:08 This is my first basic Golang`. By default, it shows the date and time this log was created and the message that this log generated. This is where logging comes in handy. It gives you a timestamp to reach the exact time this log was recorded.

Let's see how to create a log with some logging levels attached to the log messages. Here is an example

```go
func main() {

    // pass any values to Println method
    log.Println("INFO: This is Info an log message")
    log.Println("WARNING: This is a Warning log message")
    log.Println("Error: This is an log message")
    log.Println("Fatal: This is a Fatal Error log message")
}
```

This will log some basic messages to your console. What if you want to save these log messages to a file. Here is how we can do this.

First, import the following packages to help you access your computer system. Next, we need to create a directory and a file to save the log. These packages will help us do so.

```go
import (
    "fmt"
    "log"
    "os"
    "time"
)
```

These logs will be written to the file system of your computer. The following function will help set up a directory and file and the root of your project.

```go
const (
    LogsDirpath = "logs"
)

type LogDir struct {
    LogDirectory string
}

func New() *LogDir {
    err := os.Mkdir(LogsDirpath, 0666)
    if err != nil {
        return nil
    }
    return &LogDir{
        LogDirectory: LogsDirpath,
    }
}

func SetLogFile() *os.File {
    year, month, day := time.Now().Date()
    fileName := fmt.Sprintf("%v-%v-%v.log", day, month.String(), year)
    filePath, _ := os.OpenFile(LogsDirpath+"/"+fileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)

    return filePath
}
```

This will create a directory `logs`. Here, we set a file name to be generated based on time the log is a message created. In this case, we will create a file and name it to the current date of the saved log. For example, `29-January-2022.log`.

Let's now write the function that will execute different log levels.

```go
func (l *LogDir) Info() *log.Logger {
    getFilePath := SetLogFile()
    return log.New(getFilePath, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
}

func (l *LogDir) Warning() *log.Logger {
    getFilePath := SetLogFile()
    return log.New(getFilePath, "WARNING: ", log.Ldate|log.Ltime|log.Lshortfile)
}

func (l *LogDir) Error() *log.Logger {
    getFilePath := SetLogFile()
    return log.New(getFilePath, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
}

func (l *LogDir) Fatal() *log.Logger {
    getFilePath := SetLogFile()
    return log.New(getFilePath, "FATAL: ", log.Ldate|log.Ltime|log.Lshortfile)
}
```

Each function will execute a level and save a message to the file path. In this case, we added parameters to format the log output. These include:

- `log.Ldate`: This will log the exact date the log message gets generated.
- `log.Ltime`: This will log the exact time the log message gets generated.
- `log.Lshortfile`: This will be the file that generated the log. It will also add the exact line of the code that is generating the message.

Now add a `main()` that wraps and executes the above function.

```go
func main() {
    
    appLogger := New()

    appLogger.Info().Println("This is Info an log message")
    appLogger.Warning().Println("This is a Fatal Error log message")
    appLogger.Error().Println("This is a Warning log message")
    appLogger.Fatal().Println("This is an log message")
}
```

Head over to the project directory and run `go run main.go`. This will automatically create a `logs` directory and a new file named with the current date these messages were generated. And if you open that file, it will contain the following log messages:

```go
INFO: 2022/01/29 19:22:03 main.go:59: This is Info and logs message
WARNING: 2022/01/29 19:22:03 main.go:60: This is a Fatal Error log message
ERROR: 2022/01/29 19:22:03 main.go:61: This is a Warning log message
FATAL: 2022/01/29 19:22:03 main.go:62: This is a log message
```

As you see, it is easier to track when and where the message was generated.

### Create custom logs
The above processes involve simple logs. Let's now see how you can add logs generated by the logic execution of your application.

Let's say you have an application that involves a divide operation. In this case, a user cannot divide any value with zero. And if this happens, you might want to catch that error and save it for error tracking. So let's see how we can handle this operation and catch such an error.

First, add the `errors` package to your `main.go` imports. Then create a function that executes a dive operation as shown below:

```go
//Divide return number from a value divided by b value and error if any
func Divide(a int, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("cannot divide any value with zero")
    }

    return a / b, nil
}
```

Create a function that will be executed to save the generated error to the file system.

```go
func (l *LogDir) Error1() *log.Logger {
    getFilePath := SetLogFile()
    return log.New(getFilePath, "Error: ", log.Ldate|log.Ltime|log.Lshortfile)
}
```

This defines the format at log message will be recorded. Finally, add the `Divide` logic to the main function.

```go
_, err := Divide(10, 5)
if err != nil {
appLogger.Error1().Println("error : ", err)
log.Println("error : ", err)
}
```

Run your application using `go run main.go`. This execution will not record a log message. In this example, we have two values, `Divide(10, 5)`, i.e., we are dividing 10 by 5, which is a true operation. Thus, no error was generated. Now go ahead and replace this with `Divide(10, 0)`. Note here we are dividing 10 with 0, which is an invalid operation. This operation will generate an error, and we want to get that error and save it in our log file. So, go ahead and re-run your application with `go run main.go`. This time we expect an error, and if you navigate to your log file, a message with the above invalid operation will be recorded, as shown below:

```go
Error: 2022/01/29 20:26:38 main.go:56: error : cannot divide any value with zero
```

And that's how you can use logs to record any possible error based on the logic you want to execute.

### Set up logging on a Go server
Go is also used to create web servers and APIs. They are expected to send responses and receive requests from a client in this case. You might want to implement logging to such a server to record when given methods such as GET and POST get executed and the data these methods return.

Logging can be added to a server to monitor such occurrences and get clients' access from your server. Let's set up a very basic sever that has Go logging features.

Go ahead and create a fresh import in your `main.go` file, as shown below:

```go
import (
    "fmt"
    "log"
    "net/http"
    "net/http/httputil"
)
```

We will create a simple server using the native HTTP module. But, first, we want to create a middleware logger that we will use to log in to the server request.

```go
func HelloHandler(w http.ResponseWriter, r *http.Request) {
    dump, err := httputil.DumpRequest(r, true)
    if err != nil {
        http.Error(w, fmt.Sprint(err), http.StatusInternalServerError)
        return
    }

    fmt.Printf("%q", dump)
    fmt.Fprintf(w, "The server Endpoint Request have been excuted")
}
```

This middleware function will access the server request using the `httputil.DumpRequest`. This will access the HTTP request and write its details, and fields of the request are included in the `DumpRequest`.

We will call this middleware to the route/ endpoint that we will use to access the server. But, first, we will do using the Go `main()` function as shown in the code block below:

```go
func main() {
    http.HandleFunc("/", HelloHandler)
    fmt.Println("Server started at port 8080")
    log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
}
```

Run the server using `go run main.go`. This will run the server on the local host at port `8080`. Whenever you as the server using the endpoint `http://localhost:8080/`. Check your console once you have opened the `http://localhost:8080/`. This will log a request as shown below.

![server-log](/engineering-education/how-to-perform-logging-for-golang-applications/server-log.png)

As you can see, the `HandleFunc()` executed a `Get` request and everything associated with the executed endpoint.

### Go logging tools diversification
Go is a trendy language. It has a great ecosystem with many libraries that you can use to build your Go-based applications. In this tutorial, we have used the Go log native module. However, there are many libraries that you can use to log your application. These can be native or third-party libraries.

You can choose to use the following native logging libraries:

- fmt - [fmt](https://pkg.go.dev/fmt) can be used to print code executions such as variables, errors, and functions. It uses the `fmt.Printf` to print logs in your application, just like the log module.
- Context - [context](https://docs.newrelic.com/docs/logs/logs-context/configure-logs-context-go/) is a native log management module for Go. Check this [guide and get started using context](<https://www.cockroachlabs.com/blog/enriching-log-messages-using-go-contexts/>) to control log messages for your application.

Apart from these amazing native libraries, the Go ecosystem has different third-party and open-source libraries that you can still choose to use for log management. They include:

- [Zap](https://pkg.go.dev/go.uber.org/zap#section-readme) is a structured and leveled logging package for Go applications. Its main core is to produce fast logging middleware by avoiding serialization overheads.
- [Zerolog](https://github.com/rs/zerolog) provides loggers that have JSON output.
- [Logrus](https://github.com/sirupsen/logrus) provides structured loggers compatible with native/standard libraries such as a log to help you scale logging processes.
- [Apex/log](https://github.com/sirupsen/logrus) is inspired by Logrus. It adds more [handlers](https://pkg.go.dev/github.com/apex/log?utm_source=godoc#Handler) to Logrus to handle log events. These [handlers includes](https://github.com/apex/log#handlers) colored-text output, JSON handler output, CLI output, level filter handler, etc.

Check this guide to [learn and compare](https://blog.logrocket.com/five-structured-logging-packages-for-go/) which package features best fit your log structures.

### Conclusion
Logging is a great practice you can implement in your application. It gives you ideas of what is happening within your application. And in case of errors, it becomes easier to trace them and solve them in time. It is advisable only to log meaningful information to avoid unnecessary logs. Each log should have a level that describes the severity of the error being enclosed. This way, you can prioritize logs that can harm your application more and at the right time.

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
