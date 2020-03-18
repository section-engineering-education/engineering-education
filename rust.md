<!--
img: ![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1200px-Rust_programming_language_black_logo.svg.png)
-->
# Writing Good Code With The Rust Language
This article will talk about a lot of the interesting features that rust has to offer without really talking about how to write a program in rust. If that is what you are interested in, please refer
to the rust book: [https://www.rust-lang.org/learn](https://www.rust-lang.org/learn) which is really well done.

In talking about these interesting features I will regularly talk about how C/C++ handles these same things because C is a prime example of what rust can solve.
There are other languages, that are more comparable to Rust's features that I will not talk about. 

The main talking point for this article is how rust *forces* you to write good code which in turn eliminates all possibility of [undefined behavior](https://en.cppreference.com/w/cpp/language/ub) that can cause segfaults. Now, you can't just take C code, change the compiler and then say that you can guarantee no segfaults.
No, these changes must happen in the code because segfaults come from code, not the compiler. This doesn't mean that the compiler can't help you write good code.

## Normally, You Don't Want Things To [Rust](https://stackoverflow.com/q/16494822/9664285). <!-- This could be better -->
How does rust *force* you to write good code?
This happens in 2 main parts: the powerful type system (and error handling) and the ownership/borrowing rules.

### Rust's Type System
The best example to show this is null pointers. 
You might be wondering how can rust do anything about null pointers, it's just a part of systems programming? Don't you need access to raw pointers to be able to call it systems programming?

That being said, lets look at the following code.
```c
int * can_return_null() { ... }

int main()
{
    printf("%d\n", *can_return_null());
}
```
This is a problem, and what I would call bad code. We did not check to make sure that this pointer is not null and therefore this code can get a segfault. Furthermore, the compiler did nothing to help prevent us from doing this.

Now, surprisingly, rust has a solution for this. 
```rust
fn can_return_null() -> Option<&'static i32> { ... } // i32 is the same as an int

fn main()
{
    println!("{:?}", can_return_null()); // will print the Option not the data
}
```
This sort of works in two parts. The first is the `Option<T>` type.
This is an example of an [algabraic data type](https://en.wikipedia.org/wiki/Algebraic_data_type) that can take the values `Some(data)` or `None`.
In this example, the `data` part is the reference to the int that is returned.
What this means is that if the data is null you can instead return a `None` which has no data attached.
If the return value is not null then you can return a `Some(data)` of which you must first check to see if it is `Some` before you can access `data`.

The second thing is that the underlying return type, `&i32` (the `'static` refers to the [lifetime](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html) which is outside the scope of this article), is really a reference and not a raw pointer.
This is not a problem because references and raw pointers are the same things at the assembly level. The difference lies with how you create them, as null pointers show, raw pointers can be really anything (i.e `int *x = 0x0;`).
In rust, you can't use raw pointers (well, [this isn't entirely true](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch19-01-unsafe-rust.html?highlight=raw,pointer#dereferencing-a-raw-pointer)), instead, you must use a reference. References in rust must be created from existing values (i.e. `let ref_x = &x;` not `let ref_x = 0x0;`). 
Now going back to the code, because we can't create a null reference, we are therefore *forced* to use the `Option<T>` type by returning a `None` when we can't create a pointer.

All in all, when we try to access this return value we *must* first check to see if it is `Some(data)` before we use it.
```rust
if let Some(data) = can_return_null() {
    println!("{}", *data);
}
```
[Try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=3dcc80f1d9492a73e6d4e29135c9ddb2)

I'm not going to go into detail, but a lot of error handling in rust is done in the same way.
There is a type called [`Result<T, E>`](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html) that can be an `Ok(T)` or an `Err(E)`.

### Rust's Ownership Model
In rust, there is an idea called ownership. It is by far one of the most significantly different things from any other language.
The idea is that every value is owned by one variable, for example in `let x = 3;` the value 3 is owned by `x`.

Now, let's look at something called moving ownership. 
```rust
let s1 = String::from("hello");
let s2 = s1;

println!("{}, section.", s1);

```

The value `"hello"` is initially owned by `s1` but then in line two, it is moved to `s2` (it is now owned by `s2`).
In rust, a value can only be owned by one variable. This means that when we try to print `s1` we will get an error because the value was moved ([try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=c120b11388eba7a5cc0b7884f0bf2d0e)).
As a side note, look at how good rust's compiler errors are.

So why is this important? Well, if you were to try this in C you would get two references to the same point in memory.
This isn't necessarily a bad thing, but both of these references are mutable which can lead to race conditions. And that is where the problem lies because C lets you easily have race conditions.

Sometimes you want to have reference to an object. This is what borrowing does, and rules are a lot like [smart pointers](https://stackoverflow.com/a/106614/9664285).
However, rust is able to detect rule violations at compile time. To borrow, we just get a reference to the value.
```rust
let mut s1 = String::from("hello");
let s2 = &s1; // immutable referance
// let s3 = &mut s1; // mutable referance
// s3.push_str(", section.");

println!("{}, section.", &s1); // another immutable referance
println!("{}, section.", s2);
// println!("{}", s3);
```

On its own, the above code will compile. This is because we only ever create immutable references that can never create race conditions alone (no matter how many there are).
Now if we were to uncomment the `s3` stuff in the above code we would start to get compiler errors.
Specifically that we "cannot borrow `s1` as mutable because it is also borrowed as immutable".

This might not seem super significant but what's happening is that rust if *forcing* us to write *good code*.
In a similar way that smart pointers force you to follow their rules. This allows rust to guarantee that no race conditions will ever occur and that there will never be any memory aliasing.

[Try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=27083389043aa11874249ee2d1684c44)

## Ok, But We Still Want A Systems Programming Language
Rust is above all a systems programming language. What does this mean? For starters, this means that there is no run time.
In short, everything rust does uses zero-cost abstractions.

You might be wondering how rust is able to implement abstract data types without adding run time costs to the program.
They do this using their enum which is implemented using a C like union which can then be heavily optimized.
Here is the option implementation.
```rust
enum Option<T> {
    Some(T),
    None,
}
```
Now, this is a very good example of a zero-cost abstraction as it is compiled out completely in most cases.
When it comes to using Options, you generally treat them the same as nullable values. The compiler will see that and optimize the `None` into null and the `Some(&T)` into a `*T` (this is only if we are using references to types i.e. `Option<&t>`).
At the assembly level, this is the exact same as a raw pointer. The real difference is that rust guarantees that you will never get a null pointer exception because rust *forced* you to have `None` checks (which are now null checks).

When it comes to ownership and borrowing rust is able to check for rule violations at compile time.
This not only means that rust can run as fast as c but sometimes [even faster](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/rust.html).
They can do this because of the rules they put in place that allow rust to make optimizations that C can't. Here is a fairly simple [example of this](https://doc.rust-lang.org/nomicon/aliasing.html).
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
Rust is able to optimize this into the following.
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

This is because rust can guarantee that `input` and `output` are not referencing to the same thing (there is no memory aliasing).
This is something C just can't [always](https://stackoverflow.com/a/30827880/9664285) do. So if you tried this in C, it would just be wrong.

Also, as a side note, you cant have memory leaks in rust. <!-- I don't think we need this line -->

## I Can Just Write Good C Code <!-- needs work -->
It might seem like a lot of examples just show how rust prevents you from writing very trivial mistakes.
or even things that won't actually cause issues. While this is true, you are missing the point.

In reality, code can get very complicated and then simple mistakes can hide in the code way easier.
Then these errors can propagate throughout the whole program causing errors that can be very hard to debug.
Have you ever tried figuring out why you're getting a null pointer somewhere? <!-- I don't like this line -->

A lot of code can be "safe", where there is no way that it __*alone*__ will ever result in a segfault (like some of the above C examples).  
However, that doesn't mean it is good code. And in the end, that's what rust helps with.
Rust forces you to write good code so that simple mistakes don't come back to bite you.
If rust allowed you to write stupid code then rust would also allow you to make mistakes in more complicated code.

When you write code in rust you can be guaranteed that your code won't have any undefined behavior just by compiling.
That is something that no other language can offer (especially at compile time).

There is a reason the rust has been the most loved language for 4 years in a row according to the [stackoverflow developer servay](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-languages).
And, it has only been out of beta development for 3 of those years.
