---
layout: engineering-education
status: publish
published: true
url: /golang-part-2-programming-basics/
title:  Golang - Programming Basics
description: Covering the basics of programming in Go - directories, workspaces, variables, loops, conditionals and control flow, etc.
author: adith-bharadwaj
date: 2020-08-06T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/golang-part-2-programming-basics/hero.jpg
    alt: golang image example
---

*Go is a statically-typed and procedural programming language whose syntax resembles C*. In the [previous article](/golang-part-1-introduction/), we looked at the history of Go, its purpose, and installation. In this article, we are going to explore basic programming concepts such as variables, input/output, arrays, etc. Before we start writing programs, there are a few concepts to bear in mind. 

### Go workspace
*Go programs are usually kept in the same workspace*. A workspace may contain multiple repositories from version control systems such as Git.  

These repositories can contain several packages. According to the [documentation](https://golang.org/), Go programs are organized into packages. A package is a collection of programs in the same directory that are compiled together. 

*A repository contains one or more modules*. A module is a collection of related Go packages that are released together. A Go repository typically contains only one module, located at the root of the repository. 

#### Directories
A workspace is a directory hierarchy with three directories at its root: `src`, `bin`, and `pkg`.

**`src`**: The src directory contains the source code (Go programs) written by the user. It may contain multiple repositories. 

**`bin`**: This folder contains the binary executable files that are built and installed by the Go tool. 

**`pkg`**: This directory contains all the non-executable packages or shared libraries that are used in other executable packages. 

This is an example of a workspace that contains an executable program called hello inside the bin directory and multiple programs inside the src directory in a hierarchical structure. 

```
bin/
    hello                                                   
src/
    github.com/golang/example/                     
        hello/
            hello.go
        program/
            program.go               
```

### Program structure
Go programs have the following structure:

```go
package main

import "fmt"

func main() {
  
   fmt.Println("Hello, World!")
}
```

1. **Package declaration:** This is The first line of the program and defines the name of the current package name. `Package main`, tells Go that this is the starting point to run the program. We can use the **package** keyword to define packages in our program. 

2. **Imports:** Import statements tell the Go compiler to include the files defined in that particular package. In the above example, we are importing the `fmt` package that implements I/O functions in Go. We can use the **import** keyword to import a particular package to our program.   

3. **Functions:** A function is a set of statements that perform a particular task. The main function defines where the program begins and ends. The main function is mandatory to define in the main package. Go automatically executes everything in the main function, and the program exits when it reaches the end. The **func** keyword is used to define functions.

The `go run` command can be used to run the go programs. This command compiles and executes the program on the terminal or command prompt.

Copy and paste all the examples in this tutorial onto a file, give the file a name, and run it using the `go run <file name>` command on your terminal. 

![go run](/engineering-education/golang-part-2-programming-basics/go-run.png)


#### Components

##### Variables
Variables are used to store information and can be referenced or manipulated in a program. In Go, each variable has a specific type associated with it that determines the variable's properties such as the size occupied in memory, operations permitted, etc. A complete list of data types can be found [here](https://www.tutorialspoint.com/go/go_data_types.htm). Variables can only begin with a letter or an underscore and may contain the letters ‘a-z’ or ’A-Z’ or digits 0-9 or underscore.

```go
package main

import (
    "fmt"
)

func main() {
    var a, b int = 1, 2
    
    var c = a + b
    fmt.Println(c)

    d := 10
    fmt.Println(d)

    e := "hello"
    fmt.Println(e)
}
```

The user can define single or multiple variables using the **var** keyword. Multiple variables can be declared in a single line and Go will infer the type of the variables if they are initialized without a type. Variables that are declared but not initialized are automatically initialized to zero. The `:=` operator is a shorthand that declares and initializes a variable in the same line and the compiler automatically identifies the type of the variable. In the above example, `d` and `e` are declared using the shorthand operator. 

[Operators](https://yourbasic.org/golang/operators/) are special symbols that tell Go to perform a particular mathematical operation on variables. 

The structure for declaring variables is:

```
var variable_name data_type(optional) = value(optional)

variable_name := value (shorthand)
```

##### Keywords
Keywords are words that are reserved by a program because they have a special meaning and are used for some internal action. Keywords are reserved and cannot be used as identifiers in a program.

There are 25 keywords in Go:
![go keywords](/engineering-education/golang-part-2-programming-basics/go-keywords.png)

##### Identifiers
Identifiers are names of various components defined by the user in the program. An identifier can be the name of a variable, function, constant, statement, etc.



##### Constants
Constants are fixed values that are initialized once and not altered anywhere else in the program. The **const** keyword is used to declare a single or multiple constant variables in Go. 

```go
package main

import (
    "fmt"
)

func main() {
    const a = 100
    fmt.Println(a)

    const s string = "hello" 
    fmt.Println(s)
}

```
In the above code, we declare `a` to be a constant. If we try to change the value of `a` or assign a new value to it, the compiler throws an error. The structure for declaring constant variables is:

```
const variable_name data_type (optional) = value (optional)
```

##### Conditionals and control flow
[Conditionals](https://en.wikipedia.org/wiki/Conditional_(computer_programming)) are features that execute a particular action depending on certain conditions that evaluate to either true or false. Consider the following example:

```go
package main

import (
    "fmt"
)

func main() {

    if 3%2 == 0 {
        fmt.Println("7 is even")
    } else {
        fmt.Println("7 is odd")
    }

    if 5 > 3 {
        fmt.Println("5 is greater")
    } else if 5 < 3 {
        fmt.Println("5 is equal to three")
    } else{
        fmt.Println("5 is less than 3")
    }

}
```

**if** is a keyword that checks an expression to see if it is true or false. If the expression evaluates to true, the statements inside the curly braces are executed. If the expression is false, then the statements enclosed in the **else** portion are executed. For example, `if 3%2 == 0` evaluates to `false` as 3 is not divisible by two and the print statement inside the else part gets executed. Similarly, since 5 is greater than 3, `if 5 > 3` evaluates to `true` and the print statement inside if gets executed. 

A user can execute multiple if-else statements and the statements are executed from the top down. As soon as one of the conditions is true, the statement associated with that is executed. This creates a "ladder" also called the if-else ladder.

![control flow](/engineering-education/golang-part-2-programming-basics/control-flow.jpg)<br>
The basic structure of conditionals:

```
if condition1 {
    statements executed when condition1 is true
} else if condition2 {
    statements executed when condition2 is true and condition1 is false
.
.
.
} else {
    statements executed when none of the conditions are true
}
```

An `if` statement can be used without a corresponding else statement whereas an `else` statement must always follow an `if` statement. `else` statement cannot be used without a corresponding `if`. 
 
```
if condition {
    statements
}
```

An if-else block can be "nested" inside another if-else block as follows:

```
if condition1 {
    statements

    if condition2 {
        statements
    } else {
        statements
    }
}
```
##### Loops
[Loops](https://en.wikipedia.org/wiki/For_loop) are a set of instructions that are repeated until a certain condition is met. Loops can be used when the user wants to execute a block of statements multiple times. 

```go
package main

import (
    "fmt"
)

func main() {

    for i := 0; i <= 10; i++ {
        fmt.Println(i)
    }
}
```
A for loop executes all the statements inside the curly brackets as many times as specified. In the above example, the for loop prints all the numbers from 0 to 10. The structure of a for loop is as follows:

```
for variable declaration; condition; operation {
    statements
}

(while loop)
for condition {
    statements
}

```

The loop only executes until the condition is satisfied. In the above example, we declare and initialize a variable called `i` to zero and execute the for loop until `i` reaches the value 10. The increment operator (`++`) is used to increment the value of `i` after every iteration of the loop. 

Go does not have a **while** loop. However, a for loop can act as a while loop in go:

```go
package main

import (
    "fmt"
)

func main() {

    i := 0
    for i <= 10 {
        fmt.Println(i)
        i++
    }
}
```

### Putting it all together
Let's use the above concepts to write a program to add all the even numbers from 1 to 100 and print the result.

```go
package main

import (
    "fmt"
)

func main() {
   
    var sum int = 0

    for i := 1; i <= 100; i++ {
  
        if i % 2 == 0 {
            sum = sum + i
        }
    }
    fmt.Println(sum)
}
```

1. We define a variable called sum as an integer and initialize it to zero.

2. We run a for loop to go through all the numbers from 1 to 100 (inclusive).

3. In the for loop, we check to see if the current number is divisible by 2: `if i % 2 == 0`. If it is divisible by 2, the statements inside the if block are executed. 

4. If the number is divisible by 2, we add it to our sum. Every time a number is divisible by two, it gets added to the sum variable.

5. We print the value of sum at the end. This will print 2550 (sum of all even numbers from 1 to 100).

#### Further reading

[Go language specification](https://golang.org/ref/spec)  

[Go playground](https://tour.golang.org/welcome/4)

[Github repo](https://github.com/golang/go)
