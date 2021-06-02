---
layout: engineering-education
status: publish
published: true
url: /building-web-server-with-vlang/
title: Building a Web Server using Vlang
description: This tutorial will introduce us to the V programming language. We will look at installing Vlang in our local machine and creating a simple web server with Vlang.
author: samuel-umoren
date: 2021-04-05T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-web-server-with-vlang/hero.jpg
    alt: V Vlang example
---
A lot of new programming languages are released every year and very few end up getting noticed. Very few make it to the top programming languages list. One language that has recently gotten recognition by programmers, especially backend developers, is Vlang (V).
<!--more-->
With the rise of statically typed programming languages such as Go and Rust, developers are more interested in languages or frameworks that improve on the tradeoffs of these popular ones. In this case, Vlang has made some enormous claims. 

The aim of this article is to:
- Introduce the language and its features.
- Guide on setting up a Vlang environment.
- Guide on building a web server with Vweb.

### What is Vlang
Vlang (V) is a statically typed programming language inspired by Rust, Go, Oberon, Swift, Kotlin, and Python. It is open-sourced and claims to be very easy to learn.

Based on the V documentation:

> "Going through this documentation will take you about an hour, and by the end, you will have learned the entire language."

V takes a more strict approach to everything compared to Go and Rust. 

For instance:
- There are no global variables.
- No `null`.
- No undefined values.
- Pure functions by default.
- Uses structs instead of objects.
- Variables are immutable.

### Core features of V
Let's go through some features of V.

#### Code style
The V programming language drives programmers to write good code. There’s only one programming style in V unlike languages such as Rust and Golang.

V claims that because of its one-style approach to programming, it’s easier for developers in teams to understand, change team members’ code, and build maintainable software.

#### Safety
V is very strict about writing secure, fast, and memory-safe programs. 

Some strict policies of the language included:

#### 1. Variables are immutable by default
Let's see how this works:

```c
// how to declare a variable 
name := 'Sammy'
println(name) //Sammy

// mutating the variable using =
name = 'Bob'
println(name)
```

You will get the following error:

```c
main.v:2:1: error: `name` is immutable, declare it with `mut` to make it mutable
1 | name := "Sammy"
2 | name = "Bob"
    | ~~~~
3 | 
4 | println(name)
```

You can try this using the Vlang playground [here](https://v-wasm.now.sh/).

The only way you can mutate a variable is by using the `mut` keyword. 

```c
mut name := 'Sammy'
name = 'Bob'
println(name) // Bob
```

We can also use the `mut` keyword for mutating function arguments.

#### 2. V functions are pure
This means that it’s based on the return value, on the function of argument.

```c
fn add(x int, y int) int {
    return x + y
}
```

#### 3. There are no global variables in V
The issue with global variables is that they make your program less clear as it grows in size. If you don't know how to use them properly, you may end up writing messy code.

#### Error handling
V doesn't handle errors in `throw/try/catch` blocks. Instead, it combines `Option/Result` into one type. The `Option/Result` type can either be a none, an error or return a value.

The way you write this, is by adding a `?` to the return type.

```c
fn (r Repo) find_user_by_id(id int) ?User {
	for user in r.users {
		if user.id == id {
			// V automatically wraps this into an option type
			return user
		}
	}

	return error('User $id not found')
}
```

In the code snippet above (taken from the V official documentation), the `?User` type, returns an error message. You can also use `return none` if you don't have an error message.

```c
fn main() {
	repo := Repo{
		users: [User{1, 'Andrew'}, User{2, 'Bob'}, User{10, 'Charles'}]
	}
	user := repo.find_user_by_id(10) or { // Option types must be handled by `or` blocks
		return
	}

   	user := repo.find_user_by_id(7) or {
		println(err) // "User 7 not found"
		return
  	}

	println(user.id) // "10"
	println(user.name) // "Charles"
}
```

The code snippet above is a typical example of how the `Option/Result` type works. The `err` returns the message passed to the `error()`.

#### Other features of V are:
- TCC backends: The main backend compiles V to human readable C.
- V possesses a compile-time of 1 million lines of code per second.
- There are no dependencies. V is being built with V!
- Memory management: By design, V promotes a simple abstraction-free code style. 

Based on the official V documentation:
> "Auto-free engine: the compiler inserts necessary free calls automatically during compilation and frees most objects (~90-100%). It frees the remaining small percentage of objects via reference counting."

- V supports cross-platform application development. V UI (cross-platform UI toolkit with native API support built with V) and Volt (native desktop client) made this possible.
- Seamless deployment: V requires zero build environments, header files, etc.
- Libraries: V has its own package manager (**vpm**) for installing new libraries.
- Clang and GCC optimization.

### Getting started with V
Let's proceed to install V and write our first V program.

### Prerequisites
To continue with this tutorial, you will need:
- [Git](https://git-scm.com/download/win) installed in your machine.
- A C compiler like [TCC](https://developerinsider.co/download-turbo-c-for-windows-7-8-8-1-and-windows-10-32-64-bit-full-screen/) installed in your machine.
- A terminal (cmd, powershell, or bash).
- A code editor like VSCode.

#### Installation
For Linux, macOS, FreeBSD, etc, open a terminal and run the following commands:

```bash
git clone https://github.com/vlang/v
cd v
make
sudo ./v symlink 
```

For Windows, open Powershell and run:

```bash
git clone https://github.com/vlang/v
cd v
make.bat
.\v.exe symlink # this adds V to the PATH of your environmental variables
```

After your installation is complete, reopen the terminal and run this command to confirm that V is installed:

```bash
v version
```

You should get something like: `V 0.2.2 2b53992`. 

#### Writing your first V program
Open your code editor. If you use VSCode, install `vlang-vscode.extension`. The extension gives you syntax highlighting, linting, formatting, and code snippet support for Vlang.

Let's now write our first Hello World program with V.

Run this command to create a `hello.v` file.

```bash
touch hello.v
```

Then add the following lines of code to the file.

`hello.v`
```c
fn main() {
  println('Hello V World!')
}
```

Run `v run hello.v` on your terminal to run the v code above.

You should get: `Hello V World!` 

### Using V on the web
The official V documentation claims that anything you can do in other languages, you can do in V.

The V programming language has a built-in library for building web applications called **Vweb**. 

Vweb is built from scratch with V. It is tiny and easy to deploy. It’s still in the pre-alpha stage.

Notwithstanding, let's go ahead to write a simple web server with Vweb. 

#### Building a web server with V
Create a `server.v` file and add the following lines of code.

`server.v`
```c++
import vweb

struct App {
    vweb.Context
}

fn main() {
    vweb.run<App>(8080)
}

pub fn (mut app App) index() vweb.Result {
	return app.text('Hello world from vweb!')
}
```

First, we will import the `vweb` module.

Next, we create a struct to hold any variable that we'll need in the app. 

For instance, we could have something like this:

```c
struct App{
	mut:
		count int
}
```

We could then make use of `count` somewhere else in the program.

Next, we start the web server by listening to a port. 

The syntax for handling this in pure V is:

```c
fn run<T>(port int)
```

In Vweb, `run` is an built-in method, where you pass the port number as an argument. That's why we have `vweb.run<App>(8080)`.

Finally, to create routes in V, you can either specify the path like this:

```c
fn (mut app App) index() vweb.Result {
    return app.text('Hello world from vweb')
}
//access the endpoint on http://localhost:8080/

fn (mut app App) test() vweb.Result {
    return app.text('Hello world from vweb')
}
//access the endpoint on http://localhost:8080/test
```

Compile the program using the V compiler or run `v run server.v` on your terminal.

You should get something like this on your terminal:

```c
[Vweb] Running app on http://localhost:8080
```

Navigate to http://localhost:8080 on your browser.  

You should have something like this:

```c
Hello world from vweb!
```

Exceptional!! You just wrote your first V web server.

> [Gitly](https://gitly.org/) is an alternative to GitHub/GitLab built with V and Vweb.

Now you can explore the web library.

#### Why use V (and contribute to its development)
V is relatively still a very fresh programming language, and a very promising one too. 

It has over 25 GitHub sponsors, 23k GitHub stars, and 43 patreons contributing $875 monthly. The ability to get this number of sponsors for the language in such a short time shows that Alex Medvednikov and the 381 other open-source contributors are building something cool. 

Here are some reasons to explore the language:

#### V isn’t re-inventing the wheel
V isn’t trying to waste our time by building what is existing. Instead, it is filtering the features you don’t fancy on C, Go, Oberon, Rust, Python, and so on.

#### V wants you to write less buggy code with its strict programming style
While this might be costly during development, you reap the benefits during production because you always get your expected outputs hence **no undefined behavior**.

#### V is open-source
The language is now fully open for contributions on GitHub. It has over 381 contributions as of today.

There’s still a lot of work in progress (WIP). Most parts of the language, especially, the libraries are still under development. The **Vweb** library you used is a WIP. You can contribute to it's development as a hobby.

> **Disclaimer:** I do not aim this at encouraging you to dump your current backend language or framework in production for Vlang.

### Conclusion
This article highlights the core features, snippets, ideas and shares insights on the V programming language.

In this article, you got a quick overview of the language web capabilities when you built a simple server with Vlang library for building web applications using **Vweb.**

I have also highlighted some reasons you should keep tabs on the V project.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
