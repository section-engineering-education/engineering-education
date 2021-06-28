### Introduction

Closure in computer science is a technique for implementing first-class function with free variables bound in the lexical environment. This is a sensitive topic to all developers and mostly those who are adapting the functional paradigm.

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

**Free variable** is a variable that is defined in the parent scope of function but used inside it.

**Lexical scoping** answers the question _what is the value of this variable at this line_, refered to as _"eyeball scoping"_. The value of _variable x_ is given by the _innermost_ statement that _declares x_.

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

1. Closures preserve the partial running state of a program, thus can be used to simulate classes.
1. Closures are used to implement callbacks in Ruby.

To have a good understanding of our topic, we will take a tour around Ruby blocks and callable objects.

## Blocks

Blocks are used to capture code that can be passed into methods as arguments and executed later.

In Ruby, blocks can be delimited by _curly braces_ or by _do/end_ keyword pair, they also act as anonymous functions.

We are going to explore the **yield** keyword and **block_given?()** method, explore block variables and how they relate to blocks acting as closures.

Encapsulating behaviour into blocks and passing it into methods is a powerful technique in programming.

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

## Relationship between blocks and closures

Blocks act's as **anonymous functions** in ruby, it carries around the execution context in which it was defined and carry around a bunch of code to be called only when yielded.

Blocks local variables are a way to ensure that the variables within a block don't override another outer variable of the same name, circumventing the variable capturing behavior of a closure.

```rb
x = "outside x"

1.times { x = "modified from the outside block" }
```

In the code above the outer x is modified by the block, the block closes over the outer x and has no reference to it. This can be avoided with:

```rb
x = "outside x"

1.times { |;x| x = "modified from the outside block" }

```

Blocks have access to variables that already exist. However, block parameters behave differently from non-parameter variables.

If you have a variable of a given name in scope and also use the same name as one of your block parameters, then the two variables are not the same as each other.

Blocks serve as the body of anonymous function objects and those objects preserve the local variables that are in scope at the time of their creation.

## Procs

In our definition above we mentioned the concept of first-class functions, this is made possible in Ruby by the use of Procs.

Let's take a look at what Procs are:

Procs are callable objects, a block that you can create, store and pass around as method arguments and executed with a call method.
You can call Procs in four different ways

- Proc#call(args)
- .(args)()
- Threeequals
- Lambdas

You create a Proc object by instantiating the `Proc` class, including a code block:

```rb
pr = Proc.new { puts "Inside a Proc's block" }
```

When you call the proc `pr.call`, the code block becomes the body of the proc and the block is executed.

Procs have a lot of similarities with lambdas and lamdas are procs. However, a proc is not a lambda.

Invoking lambdas is identical to invoking Procs, with the exception of the lambda keyword.

```rb
lambda { |x, y| x + y }.call(x, y)

```

Ruby offers an alternative way of calling lambdas, stabby lambdas

```rb
->(x, y) { x + y }.call(x, y)
```

### The difference between a lambda and a proc

#### Arity

Lambdas unlike procs expect an exact number of arguments to be passed. For Procs unassigned arguments are given nil and extra arguments are silently ignored.

```rb
l = lambda { |x, y| puts "x: #{x}, y: #{y}" }

p = proc { |x, y| puts "x: #{x}, y: #{y}" }

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

Proc does not throw an exception, let's try the same trick with lambdas

```rb
l.call(4)

```

Unlike Proc lambda is unhappy with the trick. This also happens when we get to supply extra arguments

#### Return semantic

Proc returns from the context it was created. it is advised to use lambdas because the return semantics of lambdas resemble the normal behavior of methods.

```rb
class ReturnSemantic
  def method_that_calls_proc_or_lambda(procy)
    puts "Calling #{proc_or_lambda(procy)}"
    procy.call
    puts "#{proc_or_lambda(procy)} gets called"
  end

  def proc_or_lambda(proc_like_thing)
    proc_like_thing.lambda? ? "Lambda" : "Proc"
  end
end
```

`method_that_calls_proc_or_lambda()` takes a proc or lambda, prints out a message then invokes the proc or lambda. Depending on how the proc or lambda returns the final puts() statement will execute.

`proc_or_lambda()` is a tiny helper function that tells us if `proc_like_thing()` is a lambda of proc.

```rb
c = ReturnSemantic.new
c.method_that_calls_proc_or_lambda lambda { return }
```

With a lambda, the second puts() statement is executed

Let's try it with a Proc.

```rb
c = ReturnSemantic.new
c.method_that_calls_proc_or_lambda proc { return }
```

Returns a `LocalJumpError`, implying that a Proc always returns from the context it was created. In our case, Proc was created in the _main context_ which means returning from the main context which is the top-most level of our program and it's impossible.

### Conclusion

Closures are powerful in the hands of a developer, one can write functional code in Ruby and also be able to write your own lazy enumarables. For further exploration in the topic I would highly recommend the [Mastering_Ruby_Closures](http://media.pragprog.com/titles/btrubyclo/intro.pdf) book.

### References

- [Mastering_Ruby_Closures](http://media.pragprog.com/titles/btrubyclo/intro.pdf)
- [The_Well_Grounded_Rubyist](https://www.amazon.com/Well-Grounded-Rubyist-David-Black/dp/1617295213)

You can always reach out to me via [Twitter](https://twitter.com/njunusimon)

Happy coding!!
