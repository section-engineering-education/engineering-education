---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-is-an-abi/
title: What is an ABI?
description: The application binary interface (ABI) orchestrates how code binaries works together. The ABI deals with the implementation details of code i.e. what code turns into when it's compiled.
author: zack-jorquera
date: 2020-09-01T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-an-abi/hero.jpg
    alt: hero image ABI application binary interface library int rust c++ cpp ffi FFI
---
An ABI is an application binary interface. The ABI deals with the implementation details of code i.e. what code turns into once it is compiled. Sometimes ABIs are in place to conform to hardware/kernel requirements but most of the time they are there to make sure that two pieces of binary code can work together (like using a pre-compiled library).
<!--more-->
### What is an ABI
We can imagine why this might be important: let's say we are using a library with an API that requires the caller to pass some arguments to a function. Now, how would your code know how to pass those arguments to the library function? Generally we would use the stack or registers, but we want to guarantee that both our code and the library know what to use and in what order. This is exactly the problem that an ABI resolves.

In most cases, you as a programmer will never need to deal with conforming to the ABI as the compiler will take care of that for you. However, different languages can have different ABIs so it is good to know what the ABI does, and therefore how different languages handle it.

This article will serve as an introduction to some of the important things that an ABI defines and looking at how some current ABIs defines them.

### Primitive types
Primitive types are generally anything that the computer can operate on. Some examples are:
- Integers: `char`, `short`, `int`, `long`, `unsigned long`, etc. in C and `i8`, `i16`, `i32`, `isize`, `usize`, etc. in Rust
- Floating-points: `float`, `double` in C and `f32`, `f64` in Rust (There are more sizes of floats, but we won't talk about them)
- Booleans: `bool` in most languages.
- Pointers: `T*` (where `T` is a type) in C and `*const T` or `*mut T` in Rust to name a few.
- SIMD Vectors: This is SSE or AVX.
- and more

The primitive types can be grouped into [categories](https://software.intel.com/sites/default/files/article/402129/mpx-linux64-abi.pdf#section.3.2), what I'll call type-kinds (this is an unofficial term from [this article](https://gankra.github.io/blah/rust-layouts-and-abis/#abi) that I liked and will also use for this article). Most commonly these are:
- Integers: This includes all integer primitive types as well as booleans.
- Floating point: This only includes the above-mentioned floating-point primitives (Note, I am simplifying the scope of this type-kind).
- Pointer: For C/C++ ABIs, this will contain pointer and reference types, however, in Rust this type-kind [does not exist](https://gankra.github.io/blah/rust-layouts-and-abis/#abi) and instead pointer and reference types are in the integers type-kind.
- Vector: This is a SSE or AVX datatype (we won't talk about this type-kind).
- Aggregate: General type-kind for structs and classes (we will talk about this type-kind in the [structs](#structs) section).

*Sidenote*: Booleans in [C](https://software.intel.com/sites/default/files/article/402129/mpx-linux64-abi.pdf#section.3.2), [C++](https://isocpp.org/files/papers/n4296.pdf#section.3.9), and [Rust](https://rust-lang.github.io/unsafe-code-guidelines/layout/scalars.html#bool) all *only* have acceptable values of 0 and 1 (even though the size is 1 byte or 8 bits). This is because, as shown in these examples, [C](https://repl.it/@ZackJorquera/C-bools-only-0-or-1), [C++](https://repl.it/@ZackJorquera/Cpp-bools-only-0-or-1), and [Rust](https://repl.it/@ZackJorquera/Rust-bools-only-0-or-1) only look at the 0th bit to determine the truth value. This means that while a value like `4` (`0b0100` in binary) is not zero it will still be false as a bool (technically it is undefined behavior). However, in an if statement and when casting there is an [implicit conversion](https://isocpp.org/files/papers/n4296.pdf#section.4.12) that will take any non-zero value and make it have the value 1 if it isn't already the `bool` type.

We will talk more about these type-kinds in the [structs](#structs) and [calling conventions](#passing-data-to-the-callee-and-back) sections.

When it comes to primitive types the main issues to think about are how to store them in memory and how to operate on them. These two things play hand in hand because if we want to operate on some data we will first need to read them from memory and into a register.

For anything stored in memory, we will have to think about the [endianness](/engineering-education/what-is-little-endian-and-big-endian/) of the data. Most of the time this is dealt with by the hardware and will be exposed to the program as a `mov` instructions that already account for endianness, with the exception to loading constant value with `mov`. I won't go into detail as I wrote a whole article about it [here](/engineering-education/what-is-little-endian-and-big-endian/).

### Size and Alignment
There is also the size and alignment of each piece of data that we have to worry about (this follows for structs as well). The size must always be a multiple of the alignment. The alignment specifies where it can be stored in memory; it must be at least 1 and always a power of two. As an example, if some variable had an alignment of 4-bytes, then the address it is stored at must be divisible by 4-bytes (and the size must be divisible by 4-bytes). This exists mostly for [performance reasons](https://stackoverflow.com/q/49391001/9664285) because memory hardware is specialized in such a way as to read data from a cache-block (also called a cache-line) quickly. The alignment can guarantee that one piece of data is not split up into multiple cache-blocks which would require two memory reads.

Take for example a 4-byte value with a 4-byte alignment and an 8-byte value with an 8-byte alignment next to each other. To store these two values we would have to have 4 bytes of empty space between them (shown by the `x`s).

```
addr:  0123456789abcdef
value: aaaaxxxxbbbbbbbb
```

Most ABIs require the alignment of primitive types to be the same as the size:

![Table 1](/engineering-education/what-is-an-abi/table1.JPG)
*[Image Source](https://software.intel.com/sites/default/files/article/402129/mpx-linux64-abi.pdf#figure.3.1)*

![Table 2](/engineering-education/what-is-an-abi/table2.JPG)
*[Image Source](https://gankra.github.io/blah/rust-layouts-and-abis/#the-layoutsabis-of-builtins)*

### Structs
Like alignment, structs have a similar concept for the data in them. This is to say that structs also have their own alignment so that the data in them can have the alignment they require. We can think about each struct as containing their own space of memory where everything in them is aligned relative to the start of the struct. We call this memory address relative to the start the offset of a field in the struct. Let's look at an example.

```c++
struct MyStruct
{
    int32_t a;
    double b;
    int8_t c[3];
    float d;
}
```

We can assume that the struct has the alignment of at least the greatest needed alignment for any field in it. From there, the ABI needs to define how to allocate space within the struct for each field. In C this is done in the order the arguments were specified while being conscious of the alignments for each field.

As you would expect we will get the following layout (again the `x`s are padding). Note that a double is 64 bits (8 bytes) and a float is 32 bits (4 bytes).

```
offset: 0123456789abcdef01234567
value:  aaaaxxxxbbbbbbbbcccxdddd
```

If you want to prove this for yourself, I wrote an [example program](https://repl.it/@ZackJorquera/structoffsetsc) that will print out the offsets. For this struct it will print out `a: 0 b: 8 c: 16 d: 20` (note these numbers are in decimal whereas the offset values are in [hex](https://en.wikipedia.org/wiki/Hexadecimal)).
Note the size of this struct is 24 bytes.

Now, let's look at how this compares to Rust. Here is the same struct but in Rust code.

```rust
struct MyStruct
{
    a: i32,
    b: f64,
    c: [i8; 3],
    d: f32
}
```

I also wrote a [program to print the offsets](https://repl.it/@ZackJorquera/structoffsetsrust) for this struct in Rust. The result `a: 8 b: 0 c: 16 d: 12` (again the values are in decimal). This would imply that the layout is the following:

```
offset: 0123456789abcdef01234567
value:  bbbbbbbbaaaaddddcccxxxxx
```

This struct, although seemingly the same as the C struct, has a completely different layout and therefore a smaller size (19 bytes as opposed to C's 24 bytes). In reality, they are both 24 bytes because the size must be a multiple of the alignment and the alignment is 8 in both cases. This is why there is padding at the end.

The reason why this happens is that Rust is not required to maintain the order of the fields to the layout in memory. This, unlike C, allows Rust to make special optimizations for you. (It is important to say that you can manually arrange the order of the fields in the C struct to result in the same memory arrangement). Rust also gives you the ability to tell it that you want to use the C style layout with the [`repr`](https://doc.rust-lang.org/stable/reference/type-layout.html#representations) attribute i.e. you would put `#[repr(C)]` above the struct definition.

### Struct type-kinds
As mentioned before, the type-kind of a struct (or class in C++) is an Aggregate, however, this is only part of the equation. The real type-kind is defined by what's in the struct, the size of the struct, and more.

We will follow these steps to classify the type-kind of the struct (the sub-type-kind if you will).

- If the struct is greater then 32 bytes (4 eight-bytes) or contains unaligned fields then we will give the struct the Memory sub-type-kind.

- If the struct is less then 32 bytes in size then it will be split up into eight-byte chunks and each chunk will be given a sub-type-kind. We will determine what the sub-type-kind is based on the type-kind of the fields in it. If there are multiple fields in the eight-byte chunk then the sub-type-kind will be determined in this order Memory, Pointer, Integer, Float, and Vector.

Rust does this a little differently where each field is considered, not each eight-byte chunk.

### Calling Conventions
Now we need to think about what needs to get done when we call and return from a function. We need to (not in order):
- Transfer control to the callee and then back to the caller
- Save and restore the state of the caller
- Pass data to the callee
- Get the return value from the callee


When we call a function we want our ABI defined process to be dynamic. This means that we want to be able to do all the steps correctly, given that the only things the caller will know are the signature and where the callee is defined in memory. The only thing the callee will know is its own signature. We also want to be able to have a theoretically infinite function calling depth (memory bounded of course).

So how does this get done? Well, let's look at calling the function first.

### The Stack
The stack is how we will be able to keep track of who called the callee, more specifically were in the caller the callee needs to return to in memory. This is called the return address. The stack will also help with saving and resorting the caller's state so then when the callee returns to the caller, the caller can pick up where it left off.

The stack works in the way you would expect from the name, i.e. we can push things on to the top of the stack and we can pop the top element from the stack. I am grossly oversimplifying the functionality of the stack but this article is not meant to talk about all of the ins and outs of the stack.

#### Transferring Control
First a little background on how the CPU executed a list of instructions. To know which instruction needs to be executed next, there is a register called the instruction pointer, `rip`, that points to the next instruction needing to be executed. This will step through the code one instruction at a time.

Back to the topic, in assembly code, we would call a function with the `call <callee addr>` instruction. This will do two things; first, it will push the current value of the instruction pointer on to the stack (this is the return address), and then it will change the value of the instruction pointer to be the address of the callee function.

When we want to return from the callee and go back to the caller we can use the assembly instruction `ret` which will basically do the opposite of what `call` did. It will pop the return address off of the stack and into `rip` which will set the next instruction (what `rip` is pointing at) to be the instruction after the `call` in the caller code.

Now, you can think about how we could just keep calling functions, which would just keep pushing return addresses onto the stack until we choose to return, which would pop all of the return addresses one at a time off of the stack until we are back to where we started.


Calling and return from functions is important but it's more of a hardware thing than an ABI thing. Let's see how the ABI builds off of this to allow for argument passing.

#### Saving and Restoring The Caller State
Because the stack proved very useful in calling function and saving the return address we will use the stack again when saving the caller state.

Let's think about what ways we can do this. We could, before we call the callee, just back up every register's value we care about by pushing it onto the stack, and then after the callee is done we would just pop each value back into its register and carry on with the function.

This turns out to be very inefficient, because if we have a lot of registers in play and we call a function that doesn't use any of them, we would end up filling the stack for no reason. It turns out that there is a better way to do this. It is the concept of caller-saved and callee-saved registers. If a register is marked as callee-saved and the callee wants to use that register then the callee would have to back it up (push it onto the stack) before using it and restore it (pop it from the stack) before returning.

### Passing Data to the Callee and Back
Passing data is done in two different ways. The first is when you compile a program for 32 bits (x86 architecture); all arguments are passed on the stack. The second is when you compile a program for 64 bits (x64 architecture); registers are used to pass arguments. If there are too many arguments, the arguments that can't fit into a register will be put onto the stack.

The reason we can use the stack to pass arguments is because the stack is predictable enough that at compile-time, offsets from the top of the stack can be used. Here is a picture to make the point more clear.

!["Call stack"](/engineering-education/what-is-an-abi/image1.png)

*`rsp` and `esp` refer to the same register. `esp` is used in an x86 architecture and is the lower 4 bytes of `rsp` which is used in an x64 architecture.*

*Note: a lot of the time the stack is drawn upside down for whatever reason so make sure you look at the direction of increasing addresses.*

The stack pointer, `rsp` (`esp` in x86), always points to the top of the stack. From there we can apply an offset known at compile time to get the arguments. This offset is calculated based on the size that the callee allocated for local variables, the numbers of callee-saved registers saved, one pointer sized value for the return address, and finally the parameter sizes and alignments or each parameter before it.

*Note that when a function allocates space for local variable it will allocate it insuring there is a [16-byte alignment](https://stackoverflow.com/a/49397524/9664285) (some times even 32-bytes or 64-bytes depending on SIMD hardware being used but you can't always rely on that) by adding padding so that everything that follows has a known alignment.*

So, let's look at how parameters are passed to the callee in C when there are registers available to use. Note, this is only the case when the architecture is x64. We figure out how each argument is passed individually based on its type-kind. We do this for each argument:

- If the type-kind of the argument is an Integer then we will pick the next available general-purpose argument register (in order, they are `rdi`, `rsi`, `rdx`, `rcx`, `r8`, `r9`). If there are no available registers then the argument will be placed in the next argument position on the stack.

- If the type-kind of the argument is a Float then we will pick the next available float/vector argument register (they are `xmm0` to `xmm7`). If there are no available registers then the argument will be placed in the next argument position on the stack.

- If the type-kind is a Pointer then most of the time we follow the same steps as for the Integers type-kinds. If there are bounds associated with the pointer then more steps are taken, however, that is outside the scope of this article (read [this](https://software.intel.com/sites/default/files/article/402129/mpx-linux64-abi.pdf#section.3.2) on page 24 for more information).

- If the type-kind is an Aggregate then one of two things would happen depending on the size and the sub-type-kind. If the size can fit into two 8-byte registers then follow the steps for the sub-type-kind (Pointer, Integer and Float only). This means that two registers can be used. If the size is too big to fit into two registers or the sub-type-kind is Memory then the value is saved onto the stack in the caller local variables section and the pointer is passed as Pointer type-kind.

There is also the case of the return value. This is evaluated before the parameters and follows these steps:

- If the type-kind of the return type is an Integer then the register `rax` will be used (note if x86 then we still use a register for the return value, it is `eax` the lower 4 bytes of `rax`). If a second register is needed then `rdx` will be used.

- If the type-kind of the return type is a Float then the register `xmm0` will be used. If two registers are needed then `xmm1` will be the second register.

- If the type-kind of the return type is a Pointer then treat it as an Integer.

- If the type-kind of the return type is an Aggregate and the size can fit into two registers then follow the steps for the sub-type-kind (Pointer, Integers, or Float only).

If it is too big or the sub-type-kind is Memory then the caller will need to allocate space for it and pass the pointer to said space as a Pointer type in `rdi` (as if it was the first argument). Then the callee will return the same pointer as a Pointer type in `rax`.

A lot is going on here so let's do some examples:

First, we need to define some structs:

```c++
typedef struct { int32_t a; int32_t b; } TwoInts;
typedef struct { int32_t a; int32_t b; int32_t c; } ThreeInts;
typedef struct { int32_t a; int32_t b; int32_t c; int32_t d; } FourInts;
typedef struct { int32_t a; int32_t b; int32_t c; int32_t d; int32_t e; } FiveInts;
```

With this function signature we get:

```c++
FiveInts test_func1(int a, float b, TwoInts c, ThreeInts d);
```

```
var             type                where
return                 FiveInts*    rdi
a                        int32_t    rsi
b                          float    xmm0
c             {int32_t, int32_t}    rdx
d    {int32_t, int32_t, int32_t}    rcx, r8
-------------------------------------------
return                 FiveInts*    rax (points to stack)
```

With this function signature we get:

```c++
FourInts test_func4(int a, int b, int c, int d)
```
->
```
var                                  type       where
a                                    int32_t    rdi
b                                    int32_t    rsi
c                                    int32_t    rdx
d                                    int32_t    rcx
-----------------------------------------------------
return  {int32_t, int32_t, int32_t, int32_t}    rax, rdx
```

I have made a few more "interactive" examples for you to try [here](https://repl.it/@ZackJorquera/c-calling-conventions).

Now, it should go without saying that, just like for structs, Rust does this a little differently. Because this article is getting a little long I won't go over that in depth.

Also a little side-note, Rust currently [doesn't have a stable ABI](https://github.com/rust-lang/rfcs/issues/600) so everything is subject to change (however not often). This, as far as Rust is concerned, isn't necessarily a bad thing when it comes to writing production code as it really only means that using two different versions of the Rust compiler might result in backward compatibility issues. This in practice will never happen because [Cargo](https://doc.rust-lang.org/cargo/) will compile all your dependencies for you together.

Generally, everything is the same with exception to Aggregate type-kinds. [Experimentally](https://repl.it/@ZackJorquera/rust-calling-conventions) I have found that, like C, Rust will use at most 2 eight-byte registers for an Aggregate. However, it will only put one field into each register, so even if two 32 bit value could fit into one register they will be split up. Then the type-kind of the field will be used to determine how it is passed to the callee like with the C ABI.

Like for struct, you can tell Rust to conform to C's ABI's calling convention by prepending `extern "C"` to the function. If you want to play around with Rust's calling conventions I also made an "interactive" example [here](https://repl.it/@ZackJorquera/rust-calling-conventions).

### Foreign Function Interface
All the heavy lifting is already done, so pat yourself on that back for that one.

An FFI (foreign function interface) can be boiled down to: if you want to talk with another language then you have to play by its rules (defined by its ABI). Luckily, Rust gives you a lot of the tools needed to do this like the `#repr(C)` tag and the `extern "C"` function modifier, to name a few.

### Sources and Further reading
- [Notes on Type Layouts and ABIs in Rust](https://gankra.github.io/blah/rust-layouts-and-abis)
- [Intel MPX Linux AMD64 ABI](https://software.intel.com/sites/default/files/article/402129/mpx-linux64-abi.pdf)
- [C++ ISO Standard](https://isocpp.org/files/papers/n4296.pdf)
- [ABI section in Rust Reference](https://doc.rust-lang.org/stable/reference/abi.html)
---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)
