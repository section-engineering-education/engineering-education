---
layout: engineering-education
status: publish
published: true
url: /engineering-education/golang-part-1-introduction/
title: Introduction to Golang
description:  It covers the history of Golang, its purpose, where it is used, and how to install -  Go is  similar to C but with memory safety.
author: adith-bharadwaj
date: 2020-07-29T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/golang-part-1-introduction/hero.jpg
    alt: golang image example
---

*Golang is a powerful open-source programming language, created by Google, that makes it easy to create robust, efficient, and scalable software programs*. Many development teams prefer high-level programming languages such as Golang to harness the power of their software development tools. Go is rapidly gaining popularity as an open-source language in the industry. In this article, we are going to explore the basics of Golang, its history, and why it is rapidly gaining popularity.
<!--more-->

### History of Go
According to the [official documentation](https://golang.org/doc/), Go was born out of frustration with existing languages and environments for the work that was being done at Google. Programming in a lot of the existing languages had become difficult and cumbersome. Programmers had to choose between efficient compilation, efficient execution, or ease of programming as all these features were not available in a single programming language. C++ and Java are statically typed and more efficient but are not easy to use. Multiple processors were becoming more popular but most existing languages did not have the capabilities to work on multiple processors safely and efficiently. In some cases, programmers chose dynamically typed languages like Python and Javascript over C++ and Java by sacrificing efficiency because of their ease of use.

*Google addressed these issues by attempting to combine the ease of programming of an interpreted language with the efficiency and safety of a statically typed and compiled language, and created Go*. Go also supports modern programming paradigms such as networking and multi-core computing. Most importantly, Google wanted a **fast and efficient** programming language. Building Java executables takes a lot of time, whereas building an enormous executable program in Go takes only a **few seconds**, even on a single computer. Go provides support for concurrency, parallelism, multithreading, asynchronous programming, etc. It also has a [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) that makes resource management easy in concurrent programs. This makes it **highly scalable** and efficient for server-side applications and web services.

#### Who created Go?
Google gathered three of the top minds in the field of computer science to create Go: **Rob Pike**, **Ken Thompson**, and **Robert Griesemer**. [Rob Pike](https://research.google/people/r/) worked at Bell Labs and was a member of the UNIX team. He is also the co-creator of the **UTF-8**, a prevalent character encoding scheme. Robert Griesemer is a software engineer at Google and worked on Google's **V8 JavaScript engine**. [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson) is responsible for designing and implementing the original **Unix** operating system and invented the B programming language, which is the predecessor to C.

#### Where is Go used?
According to the Go documentation, Go is used widely in production inside Google. Other big tech companies like Uber, Twitch, Dropbox, etc also use Go for their back end. [Docker](https://www.docker.com/), the most popular containerization tool that enables the creation and use of Linux containers, is written in Go. [Kubernetes](https://kubernetes.io/) is a portable, extensible, open-source platform for automating deployment, scaling, and management of containerized applications, written in Go. It was created by Google and donated to [CNCF](https://www.cncf.io/) or the Cloud Native Computing Foundation. Go is increasingly being used by a lot of big tech companies because it is a light, open-source language that is suitable for building microservices and is one of the **highest paying** programming languages according to [Stack Overflow](https://insights.stackoverflow.com/survey/2020#top-paying-technologies). you can find a list of companies using Go throughout the world, [Here](https://github.com/golang/go/wiki/GoUsers).

### Installing Go
1. Download the Go binary file from the official [web page](https://golang.org/dl/). You can find a list of download links for different versions of Go and different operating systems. Based on your OS and requirements, choose the version you want and download the binaries. I recommend going with the latest stable version.

![Downloading Go](/engineering-education/golang-part-1-introduction/go-downloads.png)

2. Once the archive file has been downloaded, move it to /usr/local. Extract the tar file using the following command:

```
sudo tar -xvf <Version of go you downloaded>
```
This will extract the tar file inside /usr/local and will create a folder called go.

#### Setting up the environment
Before we can start writing and running programs in Go, we need to configure some environment variables. GOROOT and GOPATH are environment variables that define the layout of the source code. This tutorial covers setting up the environment in Linux or Mac OS-based systems. Windows users can follow [this tutorial](https://www.geeksforgeeks.org/how-to-install-go-on-windows/).

**GOROOT**: This is an environment variable that defines where the Go SDK is located.

**GOPATH**: This is an environment variable that lists places to look for Go code.

1. Open the .profile file and add the following lines at the end. You can also add the following lines to the .bashrc file (for bash users) or .zshrc file (for zsh users). We also need to add /usr/local/go/bin to the PATH environment variable.

```
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
```
2. Save the .profile file and execute the following command:

```
source ~/.profile
```

This allows us to execute go commands and continue the session without restarting the terminal.

#### Verifying the installation
To check whether go has been installed on your system, run the following command on your terminal:

```
go version
```
This command shows us the version of Go currently installed on the system.

![Go version](/engineering-education/golang-part-1-introduction/go-version.png)

#### Running your first Go program
1. Create a file called hello_world.go and add the following lines of code:

```
package main

import "fmt"

func main() {
	fmt.Printf("hello world\n")
}
```

2. Build the code using the command:

```
go build hello_world.go
```

3. Execute the program by running:

```
./hello_world
```

![Go version](/engineering-education/golang-part-1-introduction/hello-world-go.png)

You will see "hello world" on your terminal. In the next few articles, we will understand the code to print hello world and explore the syntax and features of Go.

### Conclusion
Golang was designed to strike the right balance between powerful and cost-effective development tools. It has become an example of how we can get the best out of both worlds by striking a balance between dynamic and static languages. However, Go is still in its early stages of development and is rapidly evolving every day. Whether you are a software developer, architect, DevOps engineer, or a student,  this is the best time to learn and explore Go. In the upcoming articles, we are going to explore the basic programming concepts in Go.
