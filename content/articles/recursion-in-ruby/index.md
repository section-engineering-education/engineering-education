---
layout: engineering-education
status: publish
published: true
url: /recursion-in-ruby/
title: Introduction to Recursion in Ruby
description: This article will introduces the reader to recursion in Ruby. This programming aspect allows a developer to be productive by avoiding boiler plate code.
author: ian-maina
date: 2021-05-31T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/recursion-in-ruby/hero.jpg
    alt: Introduction to Recursion in Ruby
---
Recursion is mainly concerned with how functions are defined within themselves. Recursive functions have two major parts; recursive and base cases. The recursive portion determines when a method is called while the base case is invoked when the function stops.
<!--more-->
Recursion can be used to solve complex mathematical problems by breaking them into smaller components. In this article, we will discuss simple recursion calls, complex functions, and strategies of recursive programming. 

### Prerequisites
To follow along, you should have:
1. A basic understanding of [Ruby](https://www.tutorialspoint.com/ruby/index.htm) programing language.
2. A text editor, preferably [Visual Studio Code](https://code.visualstudio.com/download).

### Introduction 
Many people use helper methods to solve complex problems. In a helper method, you call a function from a different method. Recursion is almost similar, except that you are calling the method inside the same method. Recursive programming is mostly used to solve mathematical problems. 

Let us write our first simple recursive method.

```rb
def say_hi
    p "hi"
    say_hi
end

say_hi # prints "hi" until it crashes
```

You will notice that the `say_hi` method still obeys all the rules as a normal method and won't run unless we call it. 

Let's see how the code works:
- When we call `say_hi` for the first time, we print `hi` and call the `say_hi` function again. 
- The second call runs through the method definition and prints `hi` again. This pattern continues until the method crashes with a `stack error`.

Our `say_hi` method enters an infinite loop. Every time we call a function, some of the system memory is allocated to the execution of that method. 

Since we are printing `hi` without stopping, we will run out of memory, and the program will crash, displaying this `SystemStackError: stack level too deep` error.  

### Parts of a recursive method 
When using recursive methods, we should implement a way to stop our program from looping forever. To accomplish this, we use a statement that halts the recursion. 

As noted in the introduction, recursive methods have two important parts:
1. *Base case* where we stop the recursion by not making another call.
2. *Recursive step* where we progress the recursion by making other calls. 
   
Let's write a recursive working method.

The recursive method will calculate the factorial of any given number (n). 

To get the factorial of a number, we need to get the product of all whole numbers between 1 and the provided number. For instance, if we write down the factorial of several numbers, we will notice a pattern. 
 
```bash
# factorial(4) = 4 * 3 * 2 * 1
# factorial(3) = 3 * 2 * 1
# factorial(2) = 2 * 1
# factorial(1) = 1 
```

In the factorials above, the numbers keep decreasing by one.

The factorials can also be written as: 

```bash
# factorial(4) = 4 * factorial(3)
# factorial(3) = 3 * factorial(2)
# factorial(2) = 2 * factorial(1)
# factorial(1) = 1 
```

The recursive implementation of factorial will be:

```rb
def factorial(num)
 return 1 if num == 1 # base case 
  num * factorial(num - 1); # recursive step 
end

factorial(4) # => 24
```

### How to solve a problem recursively 
1. Identify the base case. The base case should completely cover the scenarios where the argument is small, that we can tell the result without having to do any calculations.
2. Solve the `immediate next case` of the problem and test it.  
3. Generalize the problem at each level.  

### Iteration vs recursion 
All recursive methods can be implemented iteratively using `loops` and no `recursion`. 

Let's try to implement the factorial method using iteration.  

```rb
def factorial(num)
 facto = 1
  (1..num).each do |i|
    facto *= i
  end

  facto
end
```

While it is possible to write recursive methods iteratively, this technique is more complicated. Therefore, when one is deciding whether to solve a problem recursively or iteratively, they should choose a method that they are well-acoustomed with.

### Stack creation in recursive calls
A `stack` is a data structure that is used to store objects. Using the `push` operation, items can be individually added to the stack for storing. The `pop` functions enables you to remove objects from the stack.  

Each time a recursive call is made, it adds to the stack until it gets to the base case. `Stack frames` are elements of a stack, and they contain the `local variables` of a method. 

In the event of an `infinite loop`, the stack grows until the system runs out of memory which is called `stack overflow`.

### Steps for programming recursively 
- Create a recursive decomposition: Figure out how the problem decomposes recursively. Through this process, you are able to identify key and helpful points.
- Figure out the base case: The stack stops growing once the base case is reached and the evaluation of the other recursive calls starts. 
- Solve one level up from the base case: Evaluate the result of the method in case there is one recursive call to make.
- Check that the values being returned from any case are of the same data type: If your recursive method results are in a string, then all cases should return a string. 

### Conclusion 
Recursion can indeed help you save a significant amount of time. However, you should use the base case to specify when the execution or program should stop. 

Ignoring this crucial aspect could cause the software to crash. Furthermore, your computer may slow down since significant memory and processing power will be allocated towards the execution of the recursive function.

Happy learning!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
