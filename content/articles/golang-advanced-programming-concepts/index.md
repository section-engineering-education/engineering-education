---
layout: engineering-education
status: publish
published: true
url: /golang-advanced-programming-concepts/
title: Advanced Programming Concepts with Go
description: This article will go over advanced programming concepts in Go such as functions, structures, and arrays.
author: adith-bharadwaj
date: 2020-10-08T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/golang-advanced-programming-concepts/hero.jpg
    alt: Go example image
---
*Go is a powerful statically-typed, open-source, and procedural programming language that is gaining popularity in the IT industry*. In our [first introduction article](/golang-part-1-introduction/), we looked at the history of Go, its purpose, and its installation. In our [second article](/golang-part-2-programming-basics/), we explored basic programming concepts such as variables, input/output, etc...
<!--more-->

In this article, we are going to go over advanced programming concepts such as functions, structures, and arrays.

### Prerequisites
1. Have Go installed on your system (The first article covers this in detail).

2. Basic understanding of the Go workspace.

3. Basic understanding of Go commands and Linux commands.

4. Knowledge of programming concepts like loops, variables, and data types.

The first two articles in the series cover all the prerequisites mentioned above.

### Table of Contents
- [Functions](#functions)
- [Arrays](#arrays)
- [Structures](#structures)
- [Putting It All Together](#putting-it-all-together)
- [Further Reading](#conclusion-and-further-reading)

### Functions
A [function](https://www.tutorialspoint.com/computer_programming/computer_programming_functions.htm) can be defined as a set of reusable code that can be used to perform a particular task based on the requirements of the user. In other words, if there are a lot of repetitive tasks in the program, the user can create a function for that particular task, then execute the function instead of writing the same piece of code multiple times.

By creating functions, the user can avoid repetitive code and make the program easier to read and understand. By grouping similar tasks, the code becomes more [modular](https://en.wikipedia.org/wiki/Modular_programming) and more intuitive to understand by other developers, thereby increasing productivity and efficiency within the team. Therefore, functions are extremely powerful, and it is generally considered good practice to use functions in your program.

The syntax for creating functions in Go is as follows:

```go
func <name of function>(list of arguments) return type{
	// block of reusable and repetitive code
        return statement
}
```

Let us create a function to add two numbers and return the result.

```go
package main

import "fmt"
// functon to add two numbers
func add_numbers(x int, y int) int {
    return x + y
}

func main() {
    // call the function and store the result in variable "x"
    var x = add_numbers(1, 2)
    fmt.Println(x)
}
```

The function `add_numbers()` takes 2 parameters: the two numbers to be added, and returns the sum of the two numbers. The two numbers are specified as `int` in the above example, but the parameters can be of any data type permissible in Go.

For more information on Go datatypes, please visit this [link](/golang-part-2-programming-basics/). The return type is also specified as `int` because the sum of two integers is also an integer.  

A function can be ["called"](https://www.digitalocean.com/community/tutorials/how-to-define-and-call-functions-in-go) or "invoked" by specifying the name of the function and passing the required parameters. In the example above, we call the `add_numbers()` function by passing two integers as parameters.  

The `main()` function is a special type of function. It serves as the entry point to the program where all other functions and pieces of code are executed. Go automatically runs the `main()` function and the program ends when it reaches the end. Therefore, there is no need to explicitly invoke or call the main function.

### Arrays
An [array](https://www.geeksforgeeks.org/arrays-in-go/) is a collection of multiple values or items of the same data type. This makes it easier to find a value by referencing its position relative to the start of the array (index 0).

In other words, if there are 10 items of the same data type numbered from 0 to 9 (array indexes always start from 0), we can get the 6th item by simply looking at index 5 in the array. For example, if the user wants to store the scores obtained by 100 students in a test, he can use an integer array of length 100.

![Array](/engineering-education/golang-advanced-programming-concepts/array.png)

*[Image Source](https://stackabuse.com/remove-element-from-an-array-in-java/)*

The syntax for creating an array is as follows:

```go
var <name of the array>[<length>] <data type>

```

Example:

```go
package main

import "fmt"

func main() {
    var test[10] int
    // assigning the value 10 to the first index in the array
    test[0] = 10
    // assigning the value 20 to the second index
    test[1] = 20
    // printing the first element
    fmt.Println(test[0])

    var test2[1] string
    test2[0] = "hello"
    fmt.Println(test2[0])
}
```

In the example above, we created an array of integers called "test" with a length of 10. We then assigned the values 10 and 20 to the first and second index, respectively. We can retrieve and print the first value by referring to the index 0.

```go
package main

import "fmt"

func main() {
    // create an array of size 10
    var test[10] int
    for i := 0; i < 10; i++ {
        test[i] = i
    }
    // print the values in the array
    for i := 0; i < 10; i++ {
        fmt.Println(test[i])
    }
}
```

We can also use loops to assign values to the array. In the example above, we assigned values from 0 to 9 to the elements in the array and then printed them on the screen.

### Structures
A [structure](https://medium.com/rungo/structures-in-go-76377cc106a2), also called struct, is similar to a [class](https://en.wikipedia.org/wiki/Class_(computer_programming)) in the [object-oriented](https://searchapparchitecture.techtarget.com/definition/object-oriented-programming-OOP) paradigm.

For those that are not familiar with OOP or object-oriented programming, structs are user-defined types that are used to group similar fields of the same or different data types together.

For instance, details about a student such as name, score, age, etc. are values of different data types. It makes sense to group them instead of creating different variables for each of them.  

The syntax for creating a struct is as follows:

```go
type <name of the structure> struct {
    field1 <data type>
    field2 <data type>
}
```

Example:

```go
package main

import "fmt"
// create a structure called student to store their name, age, and score
type Student struct {
    name string
    age int
    score float64
}

func main() {
    // create s1 of type student
    var s1 = Student {
        "Adith", 1, 99.5,
    }
    // print the details of the student
    fmt.Println(s1)
    fmt.Println(s1.name)
    fmt.Println(s1.age)
    fmt.Println(s1.score)

    var s2 = Student {}
    s2.name = "Bharadwaj"
    fmt.Println(s2.name)
}
```

In the example above, we created a struct called "Student" with three fields: `name`, `age`, and `score` of types `string`, `int`, and `float64`, respectively. In the main function, we created a variable called `s1` of type `Student` and initialized it with values that corresponded to the `name`, `age`, and `score`. The curly braces({}) are used to initialize the values of a struct.

The `dot(.)` operator can also be used to assign values to the fields in the struct. In the example above, we created another variable called `s2` of type `Student` without initializing it. We then used the `dot(.)` operator to assign the value "Bharadwaj" to the name.

### Putting it all together
We are going to write a program to create a `struct` called "Student", get the details of 5 students, and display them to the user.

```go
package main

import "fmt"
// define a structure for student details with name, age, and score
type Student struct {
    name string
    age int
    score float64
}

// function to get the details of 10 students from the user on the command line.
func get_details() {
    // create an array of 5 students
    var array[5] Student
    fmt.Println("Enter the details of 5 students")
    // get the details of the students from the user
    // we create a for loop that iterates 5 times
    for i := 0; i < 5; i++ {
        fmt.Println("Enter the name: ")
        fmt.Scanln( & array[i].name)
        fmt.Println("Enter the age: ")
        fmt.Scanln( & array[i].age)
        fmt.Println("Enter the score: ")
        fmt.Scanln( & array[i].score)
    }
    // print the details of all 5 students
    fmt.Println("The details of the 5 students are as follows: ")
    for i := 0; i < 5; i++ {
        fmt.Println("Name:", array[i].name)
        fmt.Println("Age: ", array[i].age)
        fmt.Println("Score: ", array[i].score)
    }
}
// execute get_details in the main function
func main() {
    get_details()
}
```

The function `get_details()` gets the details of 5 students from the user and displays them on the terminal using a `for` loop. We created an array of type `Student` with length 5. This array stores the details of all 5 students.

### Conclusion and further reading
We explored some advanced programming concepts in this article by looking at functions and how they can help us avoid repetitive code and make the program modular. We then explored arrays and how they can be used to store and work with similar data. We also learned what structures are and how they can be used to store data belonging to different types. Finally, we wrote a program to get the details of 5 students from the user by using everything we learned in this article. Congratulations! You can now write your own programs in Go.  

- [Go language specification](https://golang.org/ref/spec)
- [Tour of Go](https://tour.golang.org/basics/1)
- [Go by example](https://gobyexample.com/)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
