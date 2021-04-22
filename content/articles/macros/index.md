---
layout: engineering-education
status: publish
published: true
url: /engineering-education/macros/
title: Using Macros - C, Nim, and Rust
description: DRY is a very important concept in software engineering. Sometimes, it seems like some repetition is required, but it isn't. Many languages have macros. Today we'll show you how to use them in C, Nim, and Rust.
author: mike-white
date: 2020-09-14T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/macros/hero.jpg
    alt: Macros DRY example image
---
Macros are cool. A macro is a tool, sometimes embedded into the programming language, that can be used to generate code. This can be very useful for when you need to have some repeating code, but can not use a function. Unfortunately, macros are imports. Every programming language implements them just a little bit differently. Today, we'll cover some of the popular ones.
<!--more-->

### C Macros
Some programming languages have very simple macros, like C. C has a preprocessor directive called `#define`. It looks something like this:

```c
#define LENGTH_OF_ARRAY 5 // this is a define macro

int main() {
    int numbers[LENGTH_OF_ARRAY]; // initializes the array

    int i; // incrementing variable
    for (i = 0; i < LENGTH_OF_ARRAY; i++) {
        numbers[i] = i;
    }

    return 0;
}
```

This takes any instance of `LENGTH_OF_ARRAY` and replaces it with the number 5. This can be super useful if you want to have a constant variable, because this uses no memory whatsoever.

This can bring problems though. For example, consider the following:

```c
#include <stdio.h>
#define TEN 5 + 5

int main() {
    printf("%d", 5 * TEN);

    return 0;
}
```

What does this print? It should print `50`, right? Wrong. It actually prints 30. Why? Because the compiler sees it as this:

```c
printf("%d", 5 * 5 + 5);
```

C follows the proper order of operations, which means that the first operation is (5 x 5) = 25. Then, it adds five, making the final answer of 30.

You can fix this by using parentheses.

```c
#define TEN (5 + 5)
```

C Macros can also take parameters! This…

```c
#define ADD(X, Y) (X + Y)

int add(int a, int b) {
    ADD(1, 2);
    return ADD(a, b);
}
```

turns into this...

```c
int add(int a, int b) {
    1 + 2;
    return a + b;
}
```

### Nim Macros
Some programming languages have macros that are super complex, such as Nim. Nim's macros give you fine control over the abstract syntax tree that Nim uses to parse your code. Here's a modified example from [one of the Nim tutorials](https://nim-lang.org/docs/tut3.html).

```nim
import macros # import the macro library

# here's the interesting part
macro myMacro(arg: untyped): untyped =
  var mt: string = "abcdef"

  let mtLit = newLit(mt)

  result = quote do:
    echo `arg`
    echo `mtLit`

myMacro("Hallo") # a call to the new macro
```

Let's focus specifically on the macro code itself.

```nim
macro myMacro(arg: untyped): untyped =
  var mt: string = "abcdef" # a string that the macro has

  let mtLit = newLit(mt) # turns the type into a "literal value"

  # puts the next couple lines into the code
  result = quote do:
    echo `arg`
    echo `mtLit`
```

The macro has its own string. It converts the string into a literal value (a value that's shown in code. Kind of like using `5` instead of making a variable with the value of 5.). The macro creates two `echo` calls (The same as `print` in Python). One prints the value passed into the macro. The other creates the specified string, and prints that out. By calling it with `myMacro("Hallo")`, we get the following code:

```nim
echo "Hallo"
echo "abcdef"
```

Run it, and we get the output we're looking for:

```bash
Hallo
abcdef
```

### Rust Macros
Rust has a balance between simplicity and complexity. The Rust developers don't give the programmer control of the Abstract Syntax Tree (AST). To do that, they'd need to stabilize it. Their argument is that they may want to add something, like the handy `?` operator. Stabilizing the AST would prevent them from doing that.

There are a few types of Rust macros. There's `derive` macros, which are very useful. They automatically implement traits (known in other languages as interfaces).

```rust
#[derive(Clone, Copy, Hash, Default, Debug)] // implements five traits automatically
struct MyType {
    a: f64,
    b: String
}
```

That is very useful. There are also attribute macros. These are attributes that are applied to the function, struct, trait, field, etc., they are applied to. They can take their own parameters, and they return the final TokenStream of the output. Here's an example from [The Rust Reference](https://doc.rust-lang.org/reference/procedural-macros.html).

```rust
// my-macro/src/lib.rs

#[proc_macro_attribute]
pub fn show_streams(attr: TokenStream, item: TokenStream) -> TokenStream {
    println!("attr: \"{}\"", attr.to_string());
    println!("item: \"{}\"", item.to_string());
    item
}
```

```rust
// src/lib.rs

use my_macro::show_streams;

// Example: Basic function
#[show_streams]
fn invoke1() {}
// out: attr: ""
// out: item: "fn invoke1() { }"
```

To use these, you'll need to make a separate library. You can't have a macro in your file, and then use it later, which is very annoying. Unless, you use declarative macros using `macro_rules!`.

These macros are very convenient to use. Let's say you have a bunch of enumerations that look like this:

```rust
enum Weight {
    Default,
    Bold,
    Light
}

enum Underline {
    Default,
    SingleUnderline,
    DoubleUnderline
}
```

You want to implement the default trait for these, but that doesn't work on enums. So you want to use a macro that uses `Enum::Default` as the default variant. We can make this conveniently using `macro_rules!`

```rust
macro_rules! impl_default_for_enum {
    ($name: ident) => {
        impl Default for $name {
            fn default() -> Self {
                Self::Default
            }
        }
    }
}
```

That's very complicated. If you just got scared from looking at this, don't worry. That's some very daunting syntax. Let's try to understand it though.

Every declarative macro starts with `macro_rules!`. This just means that we're making a declarative macro.

The name of the macro is `impl_default_for_enum`.

The parentheses are for parameters. Our macro has a parameter called `$name`, which has the type, `ident`, meaning identifier. An identifier is a name associated with a variable, struct, enum, trait, etc. All macro parameters have a name that starts with `$`.

In the curly braces, we have some text which should be put in place of our macro call. The `$name` in `impl Default for $name` gets replaced with the argument passed into our macro.

Now that we've done all that, we can finally call our macro.

```rust
enum Weight {
    Default,
    Bold,
    Light
}

enum Underline {
    Default,
    SingleUnderline,
    DoubleUnderline
}

impl_default_for_enum!(Weight);
impl_default_for_enum!(Underline);
```

To call a macro, remember to use the `!`. Those two macros translate to the following:

```rust
impl Default for Weight {
    fn default() -> Self {
        Self::Default
    }
}

impl Default for Underline {
    fn default() -> Self {
        Self::Underline
    }
}
```

We did it! But even the code above is a little repetitive. What if we could implement as many traits as we wanted in our macro?

As it turns out, Rust macros can do repeating patterns. It's even used in the `vec![]` macro, which initializes a Vector (aka ArrayList). We'll need more stars and dollar signs this time though.

```rust
macro_rules! impl_default_for_enums {
    ($($name: ident),*) => {
        $(
            impl_default_for_enum!($name);
        )*
    }
}
```

The first thing we did was make it so we can have as many arguments as we want. The comma says that the arguments have to be separated by commas. The star means the pattern can repeat forever.

Then we surround the code we want to repeat in `$(` and `)*`. If we wanted some non-repeating code, we'd put it outside of the parentheses.

Inside the code is what we want to repeat. We already created a macro that does what we want, so we might as well use that. We could even have recursive macros if we wanted.

Now, we can call our new macro using:

```rust
enum Weight {
    Default,
    Bold,
    Light
}

enum Underline {
    Default,
    SingleUnderline,
    DoubleUnderline
}

impl_default_for_enums!(Weight, Underline);
```

Perfect! We managed to shorten eleven lines of code into just one!

### Conclusion
Macros can be very handy. These were a few examples of some great languages that use them, but there are surely more. Next time you think all is lost, and you must repeat some code, try a macro. It just might work.
