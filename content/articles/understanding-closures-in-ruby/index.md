---
layout: engineering-education
status: publish
published: true
url: /understanding-closures-in-ruby/
title: Understanding Closures in Ruby
description: This article will guide you in understanding closures in Ruby. These components are quite important when writing highly functional code.
author: njunu-simon
date: 2021-07-22T00:00:00-14:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-closures-in-ruby/hero.jpg
    alt: Understanding Closures in Ruby Hero Image
---
A closure in computer science is a piece of code that carries its creation context around with it. In Ruby, closures include code blocks or methods that have variables linked to the scope environment. This is a sensitive topic to all developers, especially those who are adapting to the functional paradigm.
<!--more-->
### Prerequisites
To follow along with this tutorial, it is vital to have the following:
- [Ruby](https://www.ruby-lang.org/en/) installed on your computer.
- A basic understanding of Ruby programming.
- Some knowledge in using the interactive Ruby console.

### Overview
- [Closures](#closures)
- [Closure use cases](#closure-use-cases)
- [Blocks](#ruby-blocks)
- [Relationship between blocks and closures](#relationship-between-blocks-and-closures)
- [Procs](#procs)
- [The difference between a lambda and a proc](#the-difference-between-a-lambda-and-a-proc)

### Closures
To get a clear picture of what closures are, we need to understand `first-class functions`, `free variables`, and `lexical environment`.

`A first-class function` is a method that can be treated as an `object` and passed as a `parameter` to another function.

`A free variable` is not declared in the function parent scope but can still be accessed inside the function.

`Lexical scoping` refers to the visibility of variables. `Lexical scope` also known as `eyeball_scoping` is the ability to identify a variable in a program by reading through the code.

Try this in your interactive console:

```rb
parent_scope = "I'm available everywhere"

3.times do
  inner_scope = "Only accessed in the scope above: -"
  puts "#{inner_scope} #{parent_scope}}"
end
```

The code above demonstrates `lexical scoping`. The `inner_scope` is only visible from the block where it's defined. When you try to access it outside the block, Ruby will throw an exception.

Therefore, we can define `closures` as a block of code that can be used later and stores variables in an environment in which it was created.

We use the following rules when identifying a closure:
- It needs to be a function.
- The function body should reference some variable.
- The variable should be declared in a parent scope.

### Closure use cases
- Closures can be used to simulate classes in Ruby.
- Closures also help to implement callbacks in Ruby.

To have a good understanding of our topic, Let's look at Ruby blocks and callable objects.

### Ruby Blocks
`Blocks` are used to capture code that can accept arguments and be executed later.

In Ruby, `blocks` can be delimited by `curly braces` or by the `do/end` keyword pair. They can also act as anonymous functions.

Let's explore the `yield` keyword and `block_given?()` method. It is important to understand how these two concepts relate to closures.

Encapsulating behavior into blocks and passing it into methods is a powerful programming technique.

`yield` when defined inside a `block` simply means `execute the block`.

```rb
def do_it
  yield
end

do_it { puts "I'm doing it" }
```

When you try to call the `do_it` method without a block, the console will show an error.

We can capture the `exception` using the `block_given?()` method. In this case, the function will only be executed when a block is provided.

```rb
def do_it
  yield if block_given?
end

do_it
```

### Relationship between closures and blocks
In Ruby, `blocks` act as anonymous functions. 

Blocks contain local variables that eliminate variable collusion. This happens when one gives a global variable the same name as that in the block scope.

```rb
x = "Global variable"

1.times { x = "Block variable... conflicts and is modified" }
```

```rb
puts x #Block variable... conflicts and is modified
```

When you run the snippet above, you will get an unexpected output. This is because we have assigned a variable in the `global scope` with the same name as that in the `block scope`.

We can provide a parameter in the declared block to avoid this issue, as shown below:

```rb
x = "Global variable"

1.times { |;x| x = "Block parameter prevents variable overriding" }

puts x #Global variable
```

### Procs
In the introduction, we discussed first-class functions. These methods are usually supported by `procs`.

Procs are simply callable objects. A block that you can create, store and pass around as method arguments. It is also executed just like a method.

Procs can be accessed using `Proc#call(args)`, `(args)()`, and `lambdas`.

A Proc object is created upon instantiation of the `Proc` class:

```rb
pr = Proc.new { puts "Inside a Proc's block" }
```

When you call the above `proc` using `pr.call`, the code block becomes the body of the `proc` and is, therefore, executed.

Procs have a lot of similarities with lambdas. However, note that a proc is not necessarily a lambda.

We create a lambda function using the `lambda` keyword, as shown below:

```rb
lambda { |x, y| x + y }.call(x, y)
```

In Ruby, lambdas can also be defined as [stabby lambdas](https://dev.to/keithrbennett/why-i-prefer-stabby-lambda-notation-5gcj). This is illustrated below:

```rb
->(x, y) { x + y }.call(x, y)
```

### The difference between a lambda and a proc

#### Arity
Lambdas, unlike procs, expect an exact number of arguments to be passed:

```rb
l = lambda { |a, b| puts "x: #{a}, y: #{b}" } # number of args

p = proc { |a, b| puts "x: #{a}, y: #{b}" }

l.call("Ruby", "closures") #invoking object

p.call("Ruby", "closures")
```

When we supply one argument to the `proc`, it will not throw an exception since there are no restrictions on the parameters.

Unlike procs, lambdas will throw an exception when arguments are not inserted correctly.

#### Return semantic
Procs always return from their creation context which may be problematic.

Lambdas are preferred over procs since they have the same behavioral pattern as normal methods. This is demonstrated below:

```rb
class ReturnSemantic
  def method_that_calls_proc_or_lambda(callable_object)
    puts "Calling #{proc_or_lambda(callable_object)}"
    callable_object.call
    puts "#{proc_or_lambda(callable_object)} gets called"
  end

  def proc_or_lambda(proc_like_thing)
    proc_like_thing.lambda? ? "Lambda" : "Proc"
  end
end
```

In the example above, `method_that_calls_proc_or_lambda()` is responsible for passing a callable object as an argument. It invokes the callable object thus, expects return values. The results returned from this method will differ if the callable object is a proc or a lambda.

`proc_or_lambda()` uses a [ternary operator](https://www.rubyguides.com/2019/10/ruby-ternary-operator/) to identify if the argument passed in is a proc or a lambda.

```rb
c = ReturnSemantic.new
c.method_that_calls_proc_or_lambda lambda { return }
```

When one provides a lambda as a parameter, the method will return the last execution of the `puts` statement.

When try it with a proc, it returns a `LocalJumpError`, as shown below:

```rb
c = ReturnSemantic.new
c.method_that_calls_proc_or_lambda proc { return }
```

### Conclusion
Closures are indeed powerful in the hands of a developer. One can write functional and readable code in Ruby using these components. You can read more about closures in Ruby from [here](https://gist.github.com/rsliter/4196841).

### Further reading
- [Mastering Ruby Closures](http://media.pragprog.com/titles/btrubyclo/intro.pdf)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
