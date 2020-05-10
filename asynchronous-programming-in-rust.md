---
layout: engineering-education
status: publish
published: true
title: What Is Asynchronous programming in Rust
description: Asynchronous programming is a method of programming that can allow multiple different things to be run concurrently or in  parallel, this programming allows a unit of work to run separately from the main application thread and notify the calling thread of its completion, failure or progress.
author: Zack Jorquera
date: 2020-05-08T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/async-programming.jpg
    alt: computer screen asynchronous programming
---
Asynchronous programming is a method of programming that can allow multiple different things to be run concurrently (or in parallel). In Rust, it is accomplished using a high-level idea called a Future.
<!--more-->

### Asynchronous programming in Rust
Asynchronous programming is used a lot for IO, this is because there are many times where you have to wait for something <!-- "something", I don't like to use this word but I don't know what else to use. I cant use process because that has a very different meaning. This is very important as using process in this context would be very ambiguous is not just wrong. Maybe task would be a good word here. IDK. --> to happen (such as reading from a socket or a file) during which no progress can be made.
This is a perfect moment to hand over control to something else so that it can start to make progress.
This allows our program to always be making progress, which is the name of the game.

This article will be talking a lot about the implementation of futures in Rust.
However, most of the time programming asynchronous code you will only ever have to use async/await because everything low level is already implemented.
This article will not talk about how to use async/await in the traditional sense, however, knowing how the underlying concepts work is very useful for programming async/await.

I chose to talk about Rust specifically because Rust is a systems-level language; meaning that, even for a high-level idea, there is almost no hidden magic that is happening behind the scenes.
This article does not come close to covering the more specialized workings of futures in Rust especially when explaining how Rust can guarantee memory safety throughout all of this.
While this is very important for Rust to do, it's also very complicated and best left for more extended readings which I've also noted towards the end of the article.

### The setup
Let's think about a very simple fake [socket](https://www.tutorialspoint.com/unix_sockets/what_is_socket.htm) operation.
In short, all it does is wait 2 seconds before the data is available and then it sets the data to be a single random `i32` (an `int` in C).
To make it act more like a real socket we'll have a few functions that we can use to interface with it.
```rust
struct MySocket { /* fields omitted */ }
impl MySocket
{
    fn new() -> Self {
        /* code omitted */
        /* Will start task that waits 2 seconds and then sets data */
    }
    // would be implemented with epoll
    fn has_data_to_read(&mut self) -> bool { /* code omitted */ }

    fn read_data(&self) -> i32 { /* code omitted */ }

    // would be implemted with signal handeling
    fn set_readable_callback(&self, waker: Waker) { /* code omitted */ }
}
```
*My implementation can be found [here at line 43](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=b66fc60f4a54aa12a4f4a325f75d87b2) with comments.*

Let's look at using `has_data_to_read` and `read_data` to make a synchronous function to get the data.
We'll have to check if the data is ready in a loop and then when it is, we can return the data.

```rust
fn get_num_sync() -> i32
{
    let s = MySocket::new();
    // busy wait until data is ready to be read
    // will take 2 seconds
    while !s.has_data_to_read() {}
    return s.read_data()
}
```

Now, say we wanted to call this function twice, one after another. We would have to wait 4 total seconds to get both results ([try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=b66fc60f4a54aa12a4f4a325f75d87b2)).
We could also write a function that creates 2 sockets at the same time and then busy waits together.
Now we only have to wait 2 seconds for both results.

```rust
fn get_2_num_async_hardcode() -> (i32, i32)
{
    let s1 = MySocket::new();
    let s2 = MySocket::new();

    // busy wait until data is ready to be read
    // will take 2 seconds
    while !s1.has_data_to_read() || !s2.has_data_to_read() {}
    return (s1.read_data(), s2.read_data())
}
```
This is asynchronous ([try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=1f3f8fb2cae281cc22974f89f3b36989)).

This is a good start towards understanding how we actually implement asynchronous code, however, there are a few issues:
- There is no good way to accommodate more sockets without creating a new function.
- If we wanted to add other unrelated asynchronous operations, like reading from a file, then our code would get very complicated.
- We are using a busy-wait; while not inherently bad for our program, it [won't scale well](https://stackoverflow.com/questions/1107593/what-are-trade-offs-for-busy-wait-vs-sleep) with other [processes](https://en.wikipedia.org/wiki/Process_(computing)). <!-- this use of the word process refers to other OS processes. Throughout this article, I have been very intentional not to use this word for any other meaning. I link it here to give readers the idea that it has a meaning not necessarily telling them what -->

### How Does It Really Work
The basic idea is that async works with a [trait](https://doc.rust-lang.org/rust-by-example/trait.html) called [Future](https://doc.rust-lang.org/beta/std/future/trait.Future.html).
The following is a simplified version of that trait.
The real implementation is more complicated but still has the same underlying concepts.

```rust
trait SimpleFuture {
    type Output;
    fn poll(&mut self, wake: fn()) -> Poll<Self::Output>;
}
enum Poll<T> {
    Ready(T),
    Pending,
}
```
This trait requires anything that wants to implement Future to have a definition for poll.
This is important because polling is where the magic in asynchronous programming happens.

Before we talk about how we will implement the `poll` function lets look into how we use it.
When we call poll on a future we are allowing progress to be made on that future.

The return type for `poll()` is of type `Poll` which is an algebraic data type that can be `Poll::Ready(data)` or `Poll::Pending` as shown by the enum.
If the future has finished, i.e. our toy socket is done waiting, then we can return that data as `Poll::Ready(data)`.
However, poll must never block, so as soon it knows it can't make progress it should return `Poll::Pending` (like when `has_data_to_read()` is `false`).

Note, a task might have multiple things to wait on, and thus `poll` may need to return `Poll::Pending` multiple times before it can eventually return `Poll::Ready(data)`.

### Defining an Executor
An executor is what takes one or multiple futures and runs them.
How to run it, whether that be single-threaded or multithreaded, with priorities, and so on, is left very open-ended as far as Rust is concerned. <!--I'm just trying to say that async does not mean single-threaded -->
However, in this article, we will only be talking about how an [event loop](https://en.wikipedia.org/wiki/Event_loop) driven executor works using a single thread.

We can think about how we can implement an executor similar to our first asynchronous function idea:
We could iterate over each future and poll it to check if it is ready; and if it is not ready, just poll it again.
Here is some pseudo-code.

<!-- make more rusty (less pseudo) -->
```rust
fn run(fut_vec)
{
    let mut ret = vec![];
    while !all_done()
    {
        for fut in fut_vec
        {
            if !is_done(fut)
            {
                // if result of `fut.poll(...)` is `Poll::Ready(d)` then grab data as `d`
                if let Poll::Ready(d) = fut.poll(||) // it expects a wake function but we are not using it yet
                {
                    is_done(fut) = true;
                    ret.push(d);
                }
            }
        }
    }
    return ret;
}
```

This is a very basic event loop, but we can do better.

This is where the `wake` part of the poll function comes in.

The point of this [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is to allow the executor to not waste its time continuously checking to see if a future can make progress.
Instead, we will require each future to tell us when it can make progress.
So now when a future's poll returns `Poll::Pending`, we know that, that future can't make progress and that it will have arranged for its self to be "woken up" (by something <!-- I wanted to use the word task here but I don't think I would work as it might seem that another future is what will do the waking, that's not necessarily the case as anything can call it. --> else calling the `wake()` function) when it can make progress.
This `wake()` function is created by the executor so that it can keep track of which futures can be polled.

Let's try to add this to our pseudo executor. We'll keep a list of futures that can make progress and make the `wake()` function add the current future back to the list.
Here is the pseudo implementation.

<!-- I dont like this code. make more rusty (less pseudo)  -->
```rust
fn run2(fut_vec)
{
    let mut ret = vec![];
    let mut can_make_progress_vec = fut_vec.clone();
    while !all_done()
    {
        while let Some(fut) = can_make_progress_vec.pop()
        {
            if let Poll::Ready(d) = fut.poll(|| can_make_progress_vec.push(self))
            {
                is_done(fut) = true;
                ret.push(d);
            }
        }
    }
    return ret;
}
```
<!-- I dont like having to say that this this code is wrong. I would like to have real code here but in order to have it work you need to put in a lot more code and I dont want it to be overly completed -->
*This is pseudo-code(strictly as an example), it breaks a lot of Rust's rules. If you would like to see the real implementation look [here at line 227](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=57a64d3e4054bfcddbb50c81e1971f65)*

This pseudo-code is sufficient to understand how an executor works at a high level, therefore I will not go any more in-depth on the specifics of implementing an executor in Rust.
Implementing an executor is more of a Rust challenge than it is an understanding futures challenge; you can still play around with one by using the one in the [futures crate](https://docs.rs/futures-preview/0.3.0-alpha.19/futures/executor/index.html).

### Defining Poll
We know now what the executor expects of the poll function. That means 2 things for our toy socket.
<!-- OL -->
1. Return `Poll::Ready(data)` if data is ready.
1. Set up wake function and return `Poll::Pending` otherwise.

This is fairly straight forward:

```rust
// let's make a new struct for the future
struct FutSocket
{
    inner: MySocket
}
impl Future for FutSocket
{
    type Output = i32;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>
    {
        if self.inner.has_data_to_read() {
            // data is ready so we are done
            return Poll::Ready(self.inner.read_data());
        } else {
            // Set waker so that the inner MySocket can wake up the
            // current task when the 2-sec timer has completed.
            self.inner.set_readable_callback(cx.waker().clone());
            return Poll::Pending;
        }
    }
}
```
*The full implementation can be found [here at line 79](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=57a64d3e4054bfcddbb50c81e1971f65).*

The main thing you will notice is that we are no longer using our `SimpleFuture` trait anymore.
We are now using the standard `Future` trait. The first difference is that we are taking a [`Pin`](https://doc.rust-lang.org/beta/std/pin/index.html) to `&mut Self`.
This is just a very elegant way that Rust can guarantee memory safety, which is outside the scope of this article.
Just think of it as a regular mutable reference to self like in `SimpleFuture`, as it will be optimized out and in the poll function, we treat it as such.
The second difference is that we are not passing a `wake()` closure anymore.
Now it's a [`Context`](https://doc.rust-lang.org/beta/std/task/struct.Context.html) which is just an abstraction to a [virtual function pointer table](https://en.wikipedia.org/wiki/Virtual_method_table) (which is not the focus for this article).
Just note that `cx.waker()` will get the previously used `wake()` closure.

Now with that out of the way lets look at what is happening here. If the data is ready, we return the data as a `Poll::Ready(data)`.
Otherwise, we arrange to be woken by using `set_readable_callback` and then return `Poll::Pending`.

With that, we now have everything needed to use futures for asynchronous code.
You can try out all of this working together [here](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=57a64d3e4054bfcddbb50c81e1971f65).

### Async/Await
It's easy to see how writing out a poll function can get more complicated as more things need to be done within them.
For example, assume we wanted to write an asynchronous `read_file` function that opens a file and reads it.
We must do this in two steps, we need to open it wich this takes time, as we will have to ask the OS to give us a file descriptor.
Then once that has finished we can then read the file which will also take time to do.

Both steps can be run asynchronously, but to work together they have to happen synchronously (one after another).
If we imagined what the poll function would look like for this operation, we would have to know where we are in the process of running the future (opening and then reading the file). <!-- I sort of broke my rule with the use of process here, but I think that it is ok because it is less ambiguous in this context. IDK, I still don't like it. -->
This would be necessary so that every time poll is called we could continue execution where we left off.

This is heavily simplified by the `async` and [`.await`](https://boats.gitlab.io/blog/post/await-decision/) keywords.
The following is all we have to write to have the functionality mentioned above.

```rust
pub async fn read_file(file_path: &str) -> io::Result<String> {
    let mut file = File::open(file_path).await?;
    let mut buffer = String::new();
    file.read_to_string(&mut buffer).await?;
    Ok(buffer)
}
```
What does this do for us?
In short, it returns a future with the poll function implemented for us at compile-time.

This poll function would work in the following way. There would be a state variable that stores where it is throughout this function and any relevant data (like a file descriptor).
The first would be an uninitialized state, which is when we just start executing the program.
On our first poll, it would run until we reach the first await. At this point we would poll the future created by `File::open(...)` and most likely won't be able to make progress so the poll would return `Poll::Pending`.
Once the `File::open(...)` future wakes back up and returns `Poll::Ready(data)` then we can progress to the next state with our new file variable set.
This next state would be defined for everything in between the two awaits. This general idea continues until the end of the function.

One thing to note is that we can't replace our `FutSocket`'s poll implementation with async/await because we have to do special things like set the `wake()` function and interface with the OS.
Async/await is intended to take existing future implementation (like `File::open(...)` and `File::read_to_string(...)`) and chain them together to make more complicated, more useful asynchronous code, easily.

### How is it used in production
Due to their construction, Futures in Rust are [zero-cost](https://blog.rust-lang.org/2015/05/11/traits.html). This effort to implement zero-cost futures into Rust has taken over [4 years](https://areweasyncyet.rs/).
That time paid off because it means that performance is directly tied to executor design.
And, because Rust guarantees memory and thread safety, the implementation for executors can be very complicated and yet very safe.
One of the more popular executors (or in this case a [runtime](https://docs.rs/tokio/0.2.19/tokio/runtime/index.html)) is called [tokio](https://tokio.rs/), it is a multithreaded, work-stealing, task scheduler tuned for async networking workloads.

By using a runtime like tokio, the actor based web framework called [actix](https://actix.rs/), written in Rust, can handle 154% more [fortunes responses](https://github.com/TechEmpower/FrameworkBenchmarks/wiki/Project-Information-Framework-Tests-Overview#fortunes) per second than the next best web framework <!-- is this how math works (154% more)? --> written in C, according to this [TechEmpower benchmark](https://www.techempower.com/benchmarks/#section=data-r18).

### Further Reading
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Pinning](https://rust-lang.github.io/async-book/04_pinning/01_chapter.html)
- [The Rust Async Book](https://rust-lang.github.io/async-book/)
- [tokio-rs](https://tokio.rs/)

---

#### About the Author
<img style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;" src="/assets/images/education/authors/zack-jorquera.jpg">Zack Jorquera is a sophomore at the University of Colorado at Boulder pursuing a degree in computer science and applied mathematics. Zack’s key interests are systems programming and algorithmic design. In his free time, he likes to kayak and ski.
