### Introduction

Closure in computer science is a piece of code that carries its creation context around with it. This is a sensitive topic to all developers and mostly those who are adapting the functional paradigm.

### Prerequisites

To follow along this article, it is helpful to have the following:

- [Ruby](https://www.ruby-lang.org/en/)
- Basic knowledge of Ruby programming.
- How to use the interactive ruby console.

### Overview

- [Closures](#closures)
- [Rules_of_identifying_a_closure](#rules-of-identifying-a-closure)
- [Closure_use_cases](#closure-use-cases)
- [Blocks](#blocks)
- [Relationship_between_blocks_and_closures](#relationship-between-blocks-and-closures)
- [Procs](#procs)
- [The_difference_between_a_lambda_and_a_proc](#the-difference-between-a-lambda-and-a-proc)

### Closures

In order to get a clear picture of what closures are we need to understand _first-class functions_, _free variables_, and _lexical environment_.

**A first-class function** is a function that can be treated as an object and passed as a parameter to another function.

**Free variable** is a variable that is not declared in a function parent scope but can be accessed in the function.

**Lexical scoping** Scope refers to the visibility of variables, lexical scope also _"eyeball_scoping"_ is the ability to identify a variable in a piece of code by reading through the code.

Try this in your interactive console

```rb

parent_scope = "I'm available everywhere"

3.times do
  inner_scope = "Only accessed in the scope above: -"
  puts "#{inner_scope} #{parent_scope}}"
end

```

The code above demonstrates lexical scoping, `inner_scope` can only be visible from the block it's defined. Try accessing it outside the block and ruby will throw an exception.

So it is safe to define closures as a block of code that can be used later and stores variables in an environment in which it was created.

### Rules of identifying a closure

- It needs to be a function
- Function body should reference some variable
- Variable should be declared in a parent scope

## Closure use-cases

1. Closures can be used to simulate classes in Ruby.
2. Closures are used to implement callbacks in Ruby.

To have a good understanding of our topic, we will take a tour around Ruby blocks and callable objects.

## Blocks

Blocks are used to capture code that can be passed as method arguments and executed later.

In Ruby, blocks can be delimited by _curly braces_ or by _do/end_ keyword pair, they also act as anonymous functions.

We are going to explore the **yield** keyword and **block_given?()** method, explore block variables and how they relate to blocks acting as closures.

Encapsulating behavior into blocks and passing it into methods is a powerful technique in programming.

Yield inside a block simply means _"execute the block"_

```rb
def do_it
  yield
end

do_it { puts "I'm doing it" }

```

Try calling `do_it` without a block, the console will inform you that the method was not given a block to execute.

We can capture the exception by introducing the **block_given?()** method, the block will not throw an exception but rather provide _nil_ if block is not found.

```rb
def do_it
  yield if block_given?
end

do_it

```

## Relationship between closures and blocks

Blocks act's as **anonymous functions** in ruby, it carries around the execution context in which it was declared.

Block contains local variables this eliminates variable collusion in case one gives a variable in the global scope same name as that in the block scope.

```rb
x = "Global variable"

1.times { x = "Block variable... conflicts and is modified" }

```

```rb
puts x #Block variable... conflicts and is modified
```

When you run the snippet above you will get a different output as the one expected this because we have defined a variable in the global scope with the same name as that in the block scope.

There is a simple trick one can use to avoid this behaviour, provide a block parameter in the decalred block.

```rb
x = "Global variable"

1.times { |;x| x = "Block parameter prevents variable overiding" }

```

```rb
puts x #Global variable
```

This clearly illustrates that you can define a variable with the same name in the parent scope of the block and another in it's local scope and they will be differentiated.

## Procs

In our definition above we mentioned the concept of first-class functions, this is made possible in Ruby by the use of Procs.

Let's take a look at what Procs are:

Procs are callable objects, a block that you can create, store and pass around as method arguments and executed with a call method.
You can call Procs in four different ways

- Proc#call(args)
- .(args)()
- Threeequals
- Lambdas

A proc object is created upon instantiation of the `Proc` class, providing it with a code block:

```rb
pr = Proc.new { puts "Inside a Proc's block" }
```

When you call the proc `pr.call`, the code block becomes the body of the proc and the block is executed.

Procs have a lot of similarities with lambdas and lamdas are procs. However, a proc is not a lambda.

You can create a lambda same way as you create a proc object but this time you get to use the lambda keyword.

```rb
lambda { |x, y| x + y }.call(x, y)

```

Ruby offers an alternative way of calling lambdas, stabby lambdas

```rb
->(x, y) { x + y }.call(x, y)
```

### The difference between a lambda and a proc

#### Arity

Lambdas unlike procs expect an exact number of arguments to be passed.

```rb
l = lambda { |a, b| puts "x: #{a}, y: #{b}" }

p = proc { |a, b| puts "x: #{a}, y: #{b}" }

```

Invoke the objects.

```rb
l.call("Ruby", "closures")

p.call("Ruby", "closures")
```

What happens when we supply one argument to Proc

```rb
p.call("Ruby")

```

Proc does not throw an exception, procs have no restrictions on argument.

Let's try the same trick with lambdas

```rb
l.call(4)

```

Unlike Proc lambda is unhappy with the trick. This also happens when we get to supply extra arguments

#### Return semantic

Proc always return from it's creation context, thus not a recommended choice.
Lambda is preffered over procs since it has the same bahavioral pattern as normal methods.

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

`method_that_calls_proc_or_lambda()` is a method responsible of passing a callable object as an argument, it invokes the callable object expecting return values.The values retuned from the method call will differentiate if the callable object is a proc or a lambda.

`proc_or_lambda()` is also a method that uses a ternary operator to identify if the argument passed in is a proc or a lambda.

```rb
c = ReturnSemantic.new
c.method_that_calls_proc_or_lambda lambda { return }
```

When one provide a lambda as a parameter, the method will return the last execution of the puts statement.

Let's try it with a Proc.

```rb
c = ReturnSemantic.new
c.method_that_calls_proc_or_lambda proc { return }
```

Returns a `LocalJumpError`.

### Conclusion

Closures are powerful in the hands of a developer, one can write functional code in Ruby and also be able to write your own lazy enumarables. For further exploration in the topic I would highly recommend the [Mastering_Ruby_Closures](http://media.pragprog.com/titles/btrubyclo/intro.pdf) book.

### References

- [Mastering_Ruby_Closures](http://media.pragprog.com/titles/btrubyclo/intro.pdf)
- [The_Well_Grounded_Rubyist](https://www.amazon.com/Well-Grounded-Rubyist-David-Black/dp/1617295213)

You can always reach out to me via [Twitter](https://twitter.com/njunusimon)

Happy coding!!
