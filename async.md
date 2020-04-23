# Async in Rust
Asynchronous programming is a method of programming that can allow multiple different things to be run concurrently (or in parallel).
In rust, it is accomplished using an idea called a Future. <!-- [Future](https://doc.rust-lang.org/beta/std/future/trait.Future.html). I don't want this to be a link because I don't want people to think they need to know what it is -->

<!-- this needs work -->
Asynchronous programming is used a lot for IO, this is because there are many times where you have to wait for something<!-- something, I don't like this word but I don't know what else to use. I cant use process because that has a different meaning. Maybe task would be a good word here (and for every other time I used the word something). --> to happen (such as reading from a socket or a file) during which no progress can be made.
This is a perfect moment to hand over control to something else so that it can start to make progress. <!-- needs work -->
This allows our program to always be making progress, that's the name of the game. <!-- I just added this last part and it sort of works-->
<!-- remove?: This is why we will be talking about asynchronous programming as it relates to IO. -->

This article will be talking a lot about the implementation of futures in rust. <!-- add more -->
However, most of the time programming asynchronous code you will only ever have to use async/await because everything low level is already implemented.
This article will not talk about how to use async/await in the traditional sense, however, knowing how the underlying concepts work is very useful for programming async/await.

I chose to talk about rust specifically because rust is a systems-level language; meaning is almost no hidden magic is happening behind the scenes. <!-- find a better word -->
This article does not come close to covering the more specialized workings of futures in rust especially when explaining how rust can guarantee memory safety throughout all of this.
While this is very important for rust to do, it's also very complicated and best left for [further reading](#further-reading).



## The setup
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
 
    // would be implemted with signal handeling <!-- is this needed and is this correct -->
    fn set_readable_callback(&self, waker: Waker) { /* code omitted */ }
}
```
*My implementation can be found [here at line 104](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=6ce079559e56a7fa2de45b7c04755e16) with comments.*

<!-- These functions do exactly what you would expect. -->
<!-- It is important to note that if you try to read the data before it is readable you will get an error.-->

Let's look at using `has_data_to_read` and `read_data` to make a synchronous function to get the data.
We'll have to check if the data is ready in a loop and then when it is we can return the data.

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

Now, say we wanted to call this function twice, one after another. We would have to wait 4 total seconds to get both results ([try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=bf5c809a66cc4eb0fdbedc8f31d90f62)).
We could also write a function that creates 2 sockets at the same time and then busy waits together.
Now we only have to wait 2 seconds for both results. This is asynchronous ([try it out](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=6740493f40cd2ca53c0a95ba0ddf1115)).

This is a good start for understanding how we actually implement asynchronous code, however, there are a few issues:
- There is no good way to accommodate more sockets without creating a new function.
- If we wanted to add other unrelated asynchronous operations, like reading from a file, then our code would get very complicated.
- We are using a busy-wait; while not inherently bad for our program, it won't scale well with other [processes](https://en.wikipedia.org/wiki/Process_(computing)). <!-- this use of the word process refers to other OS processes. Throughout this article, I have been very intentional not to use this word for any other meaning. -->


## How Does It Work
The basic idea is that async works with a [trait](https://doc.rust-lang.org/rust-by-example/trait.html) called [Future](https://doc.rust-lang.org/beta/std/future/trait.Future.html).
The following is a simplified version of that trait. 
The [real implementation](https://doc.rust-lang.org/beta/std/future/trait.Future.html) is more complicated but still has the same underlying concepts. <!-- we talk about the real implementation later -->

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
This trait requires anything that wants to implement Future to have a definition for `poll`.
This is important because polling is where the magic in asynchronous programming happens.

Before we talk about how we will implement the poll function lets look into how we use it.
When we call poll on a future we are allowing progress to be made on that future.

<!-- let's talk about the word task: Not the best work but it works: https://en.wikipedia.org/wiki/Task_%28computing%29 -->
The return type for `poll()` is of type `Poll` which is an algebraic data type that can be `Poll::Ready(data)` or `Poll::Pending` as shown by the enum.
If the task has finished, i.e. our socket is done waiting, then we can return that data as `Poll::Ready(data)`.
However, poll must never block, so as soon it knows it can't make progress it should return `Poll::Pending` (like when `has_data_to_read()` is `false`).

Note, a task might have multiple things to wait on, and thus `poll` may need to return `Poll::Pending` multiple times before it can eventually return `Poll::Ready(data)`.

### Defining an Executor
<!-- This needs a lot of work and rewrites -->
An executor is what takes a future and runs it.
How to run it, whether that be single-threaded or multithreaded, with priorities, and so on, is left very open-ended as far as rust is concerned. <!-- there are too many commas: I'm just trying to say that async does not mean single-threaded -->
However, In this article, we will only be talking about how an [event loop](https://en.wikipedia.org/wiki/Event_loop) driven executer works using a single thread.

We can think about how we can implement an executor similar to our first asynchronous function idea:
We could iterate over each future and poll it to check if it is ready; and if it is not ready, just poll it again.
Here is some pseudo-code.

<!-- make more rusty (less psudo). Also where can't use like that -->
```rust
fn run(fut_vec)
{
    while !all_done()
    {
        for fut in fut_vec
        {
            if !is_done(fut)
            {
                if let Poll::Ready(d) = fut.poll(||) // it expects a wake function but we are not using it yet
                {
                    is_done(fut) = true;
                }
            }
        }
    }
}
```

This is a very basic event loop, but we can do better. <!-- like??1?! -->

This is where the `wake` part of the poll function comes in. 

The point of this closure is to allow the executor to not waste its time continuously checking to see if a future can make progress.
Instead, we will require each future to tell us when it can make progress.
So now when poll returns `Poll::Pending`, we know that the future can't make progress and that the futures will have arranged for its self to be "woken up" (by something <!-- I wanted to use the word task here but i don't think i would work as i might seem that another future is what will the waking, that not the case. --> else calling the `wake()` function) when it can make progress.
This `wake()` function is created by the executor so that it can keep track of which futures can be polled. <!-- doesn't flow -->

Let's try to add this to our pseudo executor. we'll keep a list of futures that can make progress and make the `wake()` function add the current future back to the list. 
Here is the pseudo implementation.
<!-- I really dont like this code. make more rusty (less psudo) -->
```rust
fn run2(fut_vec)
{
    can_make_progress_vec.push_many(fut_vec);
    while !all_done()
    {
        while let Some(fut) = can_make_progress_vec.pop()
        {
            if let Poll::Ready(d) = fut.poll(|| can_make_progress_vec.push(self))
            {
                is_done(fut) = true;
            }
        }
    }
}
```
*This is pseudo-code, it breaks a lot of rust rules. If you want to see the real implementation look [here at line 214](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=6ce079559e56a7fa2de45b7c04755e16)*

I'm not going to go any more in-depth on the specifics of implementing an executor in rust as this is enough to know how an executor works at a high level.
There are a lot of executors that you can just use out of the box, like the one in the [futures crate](https://docs.rs/futures-preview/0.3.0-alpha.19/futures/executor/index.html). <!-- I don't like this line: bad structure -->

### Defining Poll
We know now what the executor expects of the poll function. That means 2 things for our toy socket.
1. Return `Poll::Ready(data)` if data is ready.
2. Set up wake function and return `Poll::Pending` otherwise.

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
*The full implementation can be found [here at line 79](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=6ce079559e56a7fa2de45b7c04755e16).*

The first thing you will notice is that we are no longer using the `SimpleFuture` trait anymore.
We are now using the standard `Future` trait. The first difference is that we are taking a [`Pin`](https://doc.rust-lang.org/beta/std/pin/index.html) to `&mut Self`.
This is just a very elegant way that rust can guarantee memory safety, which is outside the scope of this article.
Just think of it as a regular mutable reference to self like in `SimpleFuture` (as it will be optimized out).
The second difference is that we are not passing a `wake()` closure anymore.
Now it's a [`Context`](https://doc.rust-lang.org/beta/std/task/struct.Context.html) which is just an abstraction to a [virtual function pointer table](https://en.wikipedia.org/wiki/Virtual_method_table) (which is not important for this article). 
Just know that <!--`Context::waker()`-->`cx.waker()` will get the previously used `wake()` closure.

Now with that out of the way lets look at what is happening here. If the data is there, we return the data as a `Poll::Ready(data)`.
Otherwise, we arrange to be woken by using `set_readable_callback` and then return `Poll::Pending`. 

With that, we now have everything needed to use futures for asynchronous code.
You can try out all of this working together [here](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=6ce079559e56a7fa2de45b7c04755e16).


## Async/Await
<!-- I want to add more be we are already at 2000 words -->
It's easy to see how writing out a poll function can get complicated as more things need to be done in them.
For example, assume we wanted to write an asynchronous `read_file` function that opens a file and reads it.
We must do this in two steps, we need to open it wich this takes time, as we will have to ask the OS to give us a file descriptor.
Then once that has finished we can then read the file which will also take time to do.

Both steps can be done asynchronously but together have to happen synchronously (one after another).
If we imagined what the poll function would look like for this operation, we would have to know where we are in the code (of opening and then reading).
Every time poll is called, we would have to check to see where we are at in the code and run a different thing accordingly. <!-- needs work -->

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

So what does this do for us?
In short, it returns a future with the poll function implement for us at compile-time. 
<!-- Would it make sense to write out the pseudo poll implementation, of course, I would need a disclaimer saying that it is way more completed and that this is where Pin plays a big part. I don't know if that is where I want to take this article -->
<!-- it might make more sense to not add it to avoid confusion?? -->

<!-- Then again, if nothing else, it will help to go over the control flow at the very least -->
This poll function would work in the following way. There would be a state variable that stores where it is throughout this function and any relevant data (like a file descriptor).
The first would be an uninitialized state, this is when we just start executing the program.
On our first poll, this would run until we reach the first await. At this point we would poll the future created by `File::open()` and most likely won't be able to make progress so the poll would return `Poll::Pending`.
Once the `File::open()` future wakes back up and returns `Poll::Ready(data)` then we can progress to the next state with our new file variable set.
This next state would be defined for everything in between the two awaits. This general idea continues until the end of the function.
<!-- This is a lot like using a yield.  (might add/remove) -->

 
One thing to note is that we can't replace our `FutSocket`'s poll implementation with async/await because we have to do special things like set the `wake()` function and interface with the OS.
Async/await is used to take existing future implementation (like `File::open(p)` and `File::read_to_string(...)`) and chain them together to make more complicated, more useful asynchronous code easily.



## How is it used in production
Due to their construction, Futures in rust are zero-cost. This effort to get zero-cost futures into rust has taken over 3 years.
That time paid off because it means that performance is directly tied to executor design.
And, because rust guarantees memory and thread safety, the implementation for executors can very complicated and yet very safe.
One of the more popular executers (or in this case a [runtime](https://docs.rs/tokio/0.1.22/tokio/runtime/index.html)) is called [tokio](https://tokio.rs/), it is a multithreaded, work-stealing, task scheduler tuned for async networking workloads.

By using a runtime like tokio, the actor based web framework called [actix](https://actix.rs/), written in rust, can handle 153% more [fortunes responses](https://github.com/TechEmpower/FrameworkBenchmarks/wiki/Project-Information-Framework-Tests-Overview#fortunes) per second then the next best web framework <!-- is this how math works --> written in C according to [this TechEmpower benchmark](https://www.techempower.com/benchmarks/#section=data-r18).


## Further Reading
- [Pinning](https://rust-lang.github.io/async-book/04_pinning/01_chapter.html)
- [The Rust Async Book](https://rust-lang.github.io/async-book/)
- [tokio-rs](https://tokio.rs/)
