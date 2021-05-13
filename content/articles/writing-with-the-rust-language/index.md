---
layout: engineering-education
status: publish
published: true
url: /writing-with-the-rust-language/
title: Writing Good Code with the Rust Language
description: How Rust forces you to write good code which, in turn, eliminates all possibility of undefined behavior that can cause segfaults.
author: zack-jorquera
date: 2020-03-20T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/writing-with-the-rust-language/hero.jpg
    alt: rust language good code
---
This article will cover many of the interesting features that Rust has to offer, but does not go into detail around how to write a program in Rust. If you're looking for a good resource to get started with Rust, please refer to the [Learn Rust](https://www.rust-lang.org/learn) guide, which is very helpful for beginners.
<!--more-->

<img src="/engineering-education/writing-with-the-rust-language/Rust_language_logo.png" style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;">In talking about Rust's features, I will regularly talk about how C/C++ handles these same things as a matter of comparison. Rust fixes a lot of the issues inherent in C in rather elegant ways. (Note: there are additional languages that are also comparable to Rust's features that I will not be talking about.)

The main talking point for this article is how Rust "forces" you to write good code which, in turn, eliminates all possibility of [undefined behavior](https://doc.rust-lang.org/reference/behavior-considered-undefined.html) that can cause segfaults. Now, you can't just take C code, change the compiler, and then say that you can guarantee no segfaults; these changes must happen in the code because segfaults come from code, not the compiler. This also doesn't mean that the compiler can't help you write good code.

### Why Rust?
How does Rust force you to write good code? This happens in 2 main parts:
- powerful type system (and error handling)
- ownership/borrowing rules

#### Rust's Type System
It is important to know that Rust is strongly and statically typed.

The best example to show how powerful the type system is, is to demonstrate how Rust handles raw pointers and, more specifically, null pointers.

Now, you might be thinking, what is a systems programming language without raw pointers? Hopefully, Rust can challenge your preconceptions about this.

That being said, let's look at the following C code.
```c
int * can_return_null() { ... }
int main()
{
    printf("%d\n", *can_return_null());
}
```
There is a problem here. We did not check to make sure that this pointer is not null. This mistake will cause this code to segfault. Furthermore, the compiler did nothing to help prevent us from doing this. Now, surprisingly, Rust has a solution for this; replacing raw pointers with something else.
```rust
fn can_return_null() -> Option<&'static i32> { ... } // i32 is the same as an int
fn main()
{
    println!("{:?}", can_return_null()); // will print the Option not the data
}
```
This works in two parts. The first is the `Option<T>` type. This is an example of an [algebraic data type](https://en.wikipedia.org/wiki/Algebraic_data_type) that can take the values `Some(data)` or `None`.

In this example, the `data` part is the reference to the int that is returned.
This means if the data is null, you can instead return a `None` which has no data attached. If the return value is not null, then you can return a `Some(data)` of which you must first check to see if it is `Some` before you can access `data`.

The second is the underlying return type `&i32` (the `static` refers to the [lifetime](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html) which is outside the scope of this article), which is really a reference and not a raw pointer.

Functionally, at the assembly level, these are the same as raw pointers. The difference lies with how you create them. As null pointers show, raw pointers can take any value (e.g. `int *x = 0x0;`).

In Rust, you can't really use raw pointers (well, you [can](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch19-01-unsafe-rust.html?highlight=raw,pointer#dereferencing-a-raw-pointer), but it's more complicated and also outside the scope of this article). Instead, you must use a reference. References in Rust must be created from existing values (e.g. `let ref_x = &x;` not `let ref_x = 0x0;`).

Now going back to the code, because we can't create a null reference, we are therefore "forced" to use the `Option<T>` type by returning a `None` when we can't create a pointer.

All in all, when we try to access this return value we *must* first check to see if it is `Some(data)` before we use it.
```rust
if let Some(data) = can_return_null() { // if Some, grab data from Some
    println!("{}", *data);
}
```
[Try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=3dcc80f1d9492a73e6d4e29135c9ddb2)

Without going into too much detail, a lot of error handling in Rust is done in the same way.
There is a type called [`Result<T, E>`](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html) that can be an `Ok(T)` or an `Err(E)`. You can never assume that it is one or the other.

#### Rust's Ownership Model
In Rust, there is an idea called ownership. It is by far one of the most significantly different things from any other language. The idea is that every value is owned by one variable. For example, in `let x = 5;` the value `5` is owned by `x`. Now, let's look at something called moving ownership.
```rust
let s1 = String::from("hello"); // Makes a String object from a string literal
let s2 = s1;
println!("{}, section.", s1);
```
The value `"hello"` is initially owned by `s1` but then in line two, it is moved to `s2` (it is now owned by `s2`).

In Rust, a value can only be owned by one variable at a time. This means that when we try to print `s1` we will get an error because the value was moved.

[Try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=c120b11388eba7a5cc0b7884f0bf2d0e)

As a side note, take a look at how good Rust's compiler errors are. So why is this important? Well, if you were to try this in C, you would get two references to the same point in memory. This isn't necessarily a bad thing, but both of these references are mutable which can lead to race conditions. This is where the problem lies because C lets you easily have race conditions.

Sometimes you want to have multiple references to an object. This is what borrowing does. To borrow, we just get a reference to the value; you can have both mutable and immutable references that follow simple rules. Rust is able to detect rule violations at compile time.
```rust
let mut s1 = String::from("hello");
let s2 = &s1; // immutable reference
// let s3 = &mut s1; // mutable reference
// s3.push_str(", section.");
println!("{}, section.", &s1); // another immutable reference
println!("{}, section.", s2);
// println!("{}", s3);
```
On its own, the above code will compile. This is because we only ever create immutable references that alone can never create race conditions (no matter how many there are). Now, if we were to uncomment the `s3` stuff in the above code we would start to get compiler errors, specifically that we "cannot borrow `s1` as mutable because it is also borrowed as immutable".

This might not seem super significant but what's happening is that Rust is "forcing" us to write "good code". This allows Rust to guarantee that no race conditions will ever occur and that there will never be any memory aliasing.

[Try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=80073c4daa22554e95293475906f046a)

### Ok, but we still want a Systems Programming Language
Rust is, above all, a systems programming language. What does this mean? For starters, this means that there is [no runtime](https://prev.rust-lang.org/en-US/faq.html#does-rust-do-tail-call-optimization).

In short, everything Rust does uses zero-cost abstractions. You might be wondering how can Rust implement abstract data types without adding runtime costs to the program? They do this by using their [enum](https://doc.rust-lang.org/book/ch06-00-enums.html), which is implemented using a C-like union which can then be heavily optimized.

Here is the `Option<T>` implementation:
```rust
enum Option<T> {
    Some(T),
    None,
}
```
Now, this is a very good example of a zero-cost abstraction, as it is compiled out completely in most cases.

When it comes to using Options, you generally treat them the same as nullable values. The compiler will see this and optimize the `None` into null and the `Some(&T)` into a `*T` (this is only if we are using references to types, e.g. `Option<&t>`).

At the assembly level, this is the same as a raw pointer. The real difference is that Rust has "forced" you to have `None` checks (which are now null checks).

When it comes to ownership and borrowing, Rust can check for rule violations at compile time.
This not only means that Rust can run as fast as C, but sometimes [even faster](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/rust.html). They can do this because of the rules they put in place that allow Rust to make optimizations that C can't.

Here is a fairly simple [example of this](https://doc.rust-lang.org/nomicon/aliasing.html):
```rust
fn compute(input: &u32, output: &mut u32) {
    if *input > 10 {
        *output = 1;
    }
    if *input > 5 {
        *output *= 2;
    }
}
```
Rust is able to optimize this into the following:
```rust
fn compute(input: &u32, output: &mut u32) {
    let cached_input = *input; // keep *input in a register
    if cached_input > 10 {
        *output = 2;  // x > 10 implies x > 5, so double and exit immediately
    } else if cached_input > 5 {
        *output *= 2;
    }
}
```
This is because Rust can guarantee that `input` and `output` are not referencing the same thing (i.e. there is no memory aliasing). This is something C just [can't always](https://stackoverflow.com/a/30827880/9664285) do. In C,  these two pieces of code do different things.

### Can I just write good C code?
It might seem like a lot of the examples just show how Rust prevents you from writing very trivial mistakes or even things that won't actually cause issues. While this is true, in big projects, code can get very complicated and a simple mistake can hide in the code like a needle in a haystack.
Worse, errors can propagate throughout the whole program making it very hard to debug.
Have you ever tried figuring out why/where you're getting a null pointer?

A lot of code can be "safe", where there is no way that it *alone* will ever result in a segfault (like some of the above C examples). However, that doesn't mean it is good code. In the end, that's what Rust helps with.

Rust forces you to write good code so that simple avoidable mistakes don't come back to bite you.
When you write code in Rust, you can be guaranteed that your code won't have any undefined behavior just by compiling it (that's the hard part); this is something that no other language can offer (especially at compile time).

There is a reason that Rust has been the [most loved language](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-languages) for 4 years in a row according to the [Stack Overflow developer survey](https://insights.stackoverflow.com/survey).
