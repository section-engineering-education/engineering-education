---
layout: engineering-education
status: publish
published: false
url: /engineering-education/building-your-web-server-with-vlang/
title: Building your Web Server with Vlang
description: This article aims at introducing Vlang, its features and building a web server with vweb.
author: samuel-umoren
date: 2021-04-03T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /building-your-web-server-with-vlang/vandserver.jpg
    alt: vlang image 
---

 A lot of new programming languages are released every year and very few ends up getting noticed or making it to any of the top programming languages lists. One language that has gotten a considerable amount of recognition recently by programmers most especially backend developers is Vlang.

With the rise of statically typed programming languages such as Go and Rust, developers are more interested in languages/frameworks that improve on the tradeoffs of these popular ones, and in this case, Vlang has made some enormous claims. The aim of this article is to:

- introduce the language and its features
- set up a Vlang environment
- build a web server with vweb

### What is V

V is a statically typed programming language inspired by Rust, Go, Oberon, Swift, Kotlin, and Python. It is open-sourced and claims to be very easy to learn. Based on the V documentation:

> Going through this documentation will take you about an hour, and by the end, you will have learned the entire language.

V takes a more strict approach to everything compared to Go and Rust. For instance, they are no global variables, no `null`, no undefined values, pure functions by default, uses structs rather than objects and variables are immutable.

### Core Features of V

Let's go through some features of V.

#### Code Style

The V programming language drives programmers to write good code. There’s only one programming style with V unlike languages such as Rust and Golang. V claims that because of its one-style approach to programming, it’s easier for developers in teams to understand, change team members’ code, and build maintainable software.

#### Safety

V is very strict with writing secure, fast and memory-safe programs. Some strict policies of the language are:

- Variables are immutable by default. Let's see how this works:

    ```c++
    // how to declare a variable 
    name := 'Sammy'
    println(name) //Sammy

    // mutating the variable using =
    name = 'Bob'
    println(name)
    ```
    You will get the following error:

    ```c++
     /*main.v:2:1: error: `name` is immutable, declare it with `mut` to make it mutable
        1 | name := "Sammy"
        2 | name = "Bob"
          | ~~~~
        3 | 
        4 | println(name)
    */
    ```

    You can try this using Vlang playground [here](https://v-wasm.now.sh/)

    The only way you can mutate a variable is by using the `mut` keyword. 

    ```c
    mut name := 'Sammy'
    name = 'Bob'
    println(name) // Bob
    ```

     We also used the `mut` keyword for mutating function arguments.

- V functions are pure. This means that it’s based on the return value, on the function of argument.

    ```c
    fn add(x int, y int) int {
    	return x + y
    }

    ```

- They are no global variables in V. The issue with global variables is that it makes your program less clear when it increases in size. If you don't know how to use them properly, you'll end up writing messy code.

#### Error Handling

V doesn't handle errors in `throw/try/catch` blocks, instead it combines `Option/Result` into one type. The `Option/Result` type can either be a none, an error or return a value.
The way you write this is by adding `?` to the return type.

```c++
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

In the code snippet above (taken from the v official documentation), the `?User` type, returns an error message. You can also use `return none` if you don't have an error message.

```c++
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

Other features are:

- TCC backends: The main backend compiles V to human readable C
- V possesses a compile-time of 1 million lines of code per second.
- They’re no dependencies. V is being built with V!
- Memory management: By design, V promotes a simple abstraction-free code style. Based on the official V documentation:

> Auto-free engine: the compiler inserts necessary free calls automatically during compilation and frees most objects (~90-100%). It frees the remaining small percentage of objects via reference counting.

- V supports cross-platform application development. V UI (cross-platform UI toolkit with native API support built with V) and Volt (native desktop client) made this possible.
- Seamless deployment: V requires zero build environments, header files, etc.
- Libraries: V has its own package manager **vpm** for installing new libraries.
- Clang and GCC optimization.

### Getting Started with V

Let's proceed to installing V and writing our first V program.

#### Prerequesites

- [Git](https://git-scm.com/download/win) installed in your machine.
- A C compiler like [TCC](https://developerinsider.co/download-turbo-c-for-windows-7-8-8-1-and-windows-10-32-64-bit-full-screen/)
- Terminal (cmd, powershell or bash)
- Code Editor like VSCode

#### Installation

For Linux, macOS, FreeBSD, etc:

```bash
git clone https://github.com/vlang/v
cd v
make
sudo ./v symlink 
```

For Windows:

```powershell
git clone https://github.com/vlang/v
cd v
make.bat
.\v.exe symlink # this adds V to the PATH of your environmental variables
```

When your installation is complete, reopen the terminal, then run this command to confirm that V is installed.

 

```bash
v version
```

You should get `V 0.2.2 2b53992` . 

#### Writing your first V program

Open your code editor and if you use VSCode, install `vlang-vscode.extension`. 

The extension gives you syntax highlighting, linting, formatting, and code snippet support for Vlang. 

Let's now write our first Hello World program with V.

Run this command to create a `hello.v` file.

```bash
touch hello.v
```

Then add the following lines of code to the file 

```c
//hello.v
fn main() {
  println('Hello V World!')
}
```

Run `v run hello.v` on your terminal to get the output.

You should get `Hello V World!` 

### Using V on the web

The official V documentation claims that anything you can do in other languages, you can do in V.

The V programming language has a built-in library for building web applications called **vweb. They built vweb from the scratch with V; it is tiny and easy to deploy. It’s still in the pre-alpha stage.

Notwithstanding, let's go-ahead to write a simple web server with vweb. 

#### Building a web server with V

Create a `server.v` file and add the following lines of code.

```c++
//server.v
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

First, import the `vweb` module.

Next, you create a struct to hold any variable that you'll need in the app. For instance, you could have something like this:

```c
struct App{
	mut:
		count int
}
```

and then make use of `count` somewhere else in the program.

Next, you start the web server by listening to a port. The syntax for handling this in pure V is `fn run<T>(port int)`. In vweb, `run` is an inbuilt method where you pass the port number as an argument. That's why we have `vweb.run<App>(8080)`.

Finally, to create routes in V, you can either specify the path as on vweb like this:
```c++
fn (mut app App) index() vweb.Result {
    return app.text('Hello world from vweb')
}
//access the endpoint on http://localhost:8080/

fn (mut app App) test() vweb.Result {
    return app.text('Hello world from vweb')
}
//access the endpoint on http://localhost:8080/test
```



 Compile the program using the v compiler, run `v run server.v` on your terminal.

You should get something like this on your terminal:

```bash
[Vweb] Running app on http://localhost:8080
```

Navigate to `[http://localhost:8080](http://localhost:8080)` on your browser and the output will be:

```
Hello world from vweb!
```

Exceptional!! You just wrote your first V web server. [Gitly](https://gitly.org/), is an alternative to GitHub/GitLab built with V and Vweb.

Now you can explore the web library.

#### Why use V (and contribute to its development)

V is relatively still a very fresh programming language and a very promising one too. It has over 25 GitHub sponsors, 23k GitHub stars, and 43 patreons contributing $875 monthly. The ability to get this number of sponsors for the language in such a short time shows that Alex Medvednikov and the 381 other open-source contributors are building something cool. Here are some reasons to explore the language:

- V isn’t re-inventing the wheel: V isn’t trying to waste our time by building what is existing. Instead, it is filtering the features you don’t fancy on C, Go, Oberon, Rust, Python, and so on.
- V wants you to write less buggy code with its strict programming style. While this might be costly during development, you reap the benefits during production because you always get your expected outputs hence **no undefined behavior**.
- It's open-source: The language is now fully open for contributions on GitHub. It has over 381 contributions as of today.
- There’s still a lot of work in progress (wip). Most parts of the language, most especially, the libraries are still under development. The **vweb** library you used is WIP. You can contribute as a hobby.

**Disclaimer:** I do not aim this at encouraging you to dump your current backend language/framework in production for Vlang.

### Conclusion

This article aimed to highlight core features, snippets, ideas and share insights on the V programming language.

In this article, you got a quick preview of the language web capabilities when you built a simple server with Vlang library for building web applications, **vweb.**

Also, I highlighted some reasons you should keep tabs on the V project.

Happy Coding!
