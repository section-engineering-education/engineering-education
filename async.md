# Async in Rust
Asynchronous programming is a method of programming that can allow multiple different things to be run concurrently (or in parallel).
In rust, it is accomplished using an idea called a [Future](https://doc.rust-lang.org/beta/std/future/trait.Future.html) (It is similar to javascript's promises).

Asynchronous programming is used a lot for IO, this is because there are many times where you have to wait for something to happen (like reading from a socket) during which no progress can be made.
This is a perfect moment to hand over control to another future so that it can start to make progress.
This is why we will be talking about synchronous programming as it relates to IO.

This article will be talking a lot about the implementation of futures in rust. <!-- add more -->
I chose to talk about rust specifically because rust is a systems-level language meaning that all of the magic with futures is "visible".
Also, knowing how asynchronous code works, in general, will help with understanding how to use it in all languages.

<!-- Why is it important to talk about how it works and not just dive into how to use it? -->
This article does not come close to covering the extent to how futures in rust work.
This is especially true when explaining how rust can guarantee memory safety with futures.
While it's very important, it's also very completed and best left for further reading.

<!-- Why is it useful? Why don't threads cover it? -->
<!-- I don't think this is important to talk about -->


## The setup
Let's think about a very simple fake [socket](https://www.tutorialspoint.com/unix_sockets/what_is_socket.htm) operation.
In short, all it does is wait 2 seconds before the data is available and then it sets the data to be a single random `i32` (a C `int`).
To make is act more like a real socket we'll have a few functions that we can use the access it.
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
*My implementation can be found [here](#) with comments. Note, it doesn't use real sockets.*

The functions do exactly what you would expect.
It is important to note that if you try to read the data before it is readable you will get an error.

Let's look at `has_data_to_read` and `read_data` to make a synchronous function to get the data.
We'll have to keep checking if the data is ready and then when it is we can return the data.

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

Now, if we wanted to call this function twice, one after another, we would have to wait 4 total seconds to get both results.
We could also write a function that creates 2 sockets at the same time and then busy waits together.
Now we only have to wait 2 seconds for both results. This is asynchronous.

This is a good start for understanding how we actually implement asynchronous code, however, there are a few issues:
- There is no good way to accommodate more sockets which out creating a new function.
- If we wanted to add other unrelated asynchronous operations, like reading from a file, then our code would get very complicated.
- We are using a busy-wait; while not inherently bad for our program, it won't scale well with other processes.


## How does it work
The basic idea here is that async works with a trait called a [Future](https://doc.rust-lang.org/beta/std/future/trait.Future.html).
Here is a simplified version of this trait. 
The real implementation is more complicated but still has the same underlying concepts. <!-- we talk about the real implementation later -->

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
This trait requires anything that wants to be a future to implement the poll method.
This is important because polling is where the magic in asynchronous programming happens.

Before we talk about how we can implement the poll function lets look into how we use it.
When we call poll on a future we are letting progress to be made on that future.

The return type for poll is of type `Poll` which is an algebraic data type that can be `Ready(data)` or `Pending` as shown by the enum.
If the task has finished, i.e. our socket is done waiting, then we can return that data as `Ready(data)`.
However, poll must never block, so as soon it knows it can't make progress it should return `Pending`.

Note, poll can have multiple things to wait on and thus needs to return `Pending` multiple times before it can eventually return `Ready(data)`.

### Defining an Executor
<!-- This needs a lot of work and rewrites -->
An executor is what takes a future and runs it.
How to run it, whether that be single-threaded or multithreaded, with priorities and so on, is left very open-ended as far as rust is concerned.
In this article, we will only be talking about how an even loop driven executer works using a single thread.

We can sort of think about how we can implement an executor similar to our first asynchronous function idea:
We could iterate over each future and poll it to check if it is ready.
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
                if let Ready(d) = fut.poll(||) // it expects a wake function but we are not using it yet
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
So now, when poll returns `Pending` then we know that the future can't make progress and that the futures will have arranged for its self to be "woken up" (by calling the `wake()` function) when it can make progress.
This `wake()` function is created by the executor so that it can keep track of which futures can be polled.

Here is another pseudo implementation.
<!-- I really dont like this code. make more rusty (less psudo) -->
```rust
fn run2(fut_vec)
{
    can_make_progress_vec.push_many(fut_vec);
    while !all_done()
    {
        for fut in can_make_progress_vec
        {
            can_make_progress_vec.remove(fut);
            if let Ready(d) = fut.poll(|| can_make_progress_vec.push(self))
            {
                done(fut) = true;
            }
        }
    }
}
```
*This is pseudo-code, it breaks a lot of rust rules. If you want to see the real implementation look [here](#)*

I'm not going to go into depth on the specifics of implementing an executor in rust because it is enough to know how an executor works.
And there are a lot of good ones that you can just use out of the box like the one in the [futures crate](https://docs.rs/futures-preview/0.3.0-alpha.19/futures/executor/index.html).

### Defining Poll
We know now what the executor expects of the poll function. For our socket that means 2 things.
1. Return `Ready(data)` if data is ready.
2. Set up wake function and return `Pending` otherwise.

This fairly straight forward now.

```rust
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
            return Poll::Ready(self.inner.read_data());
        } else {
            // Set waker so that the inner MySocket can wake up the
            // current task when the 2 sec timer has completed.
            self.inner.set_readable_callback(cx.waker().clone());
            return Poll::Pending;
        }
    }
}
```

The first thing you will notice is that we are no longer using the `SimpleFuture` trait anymore.
We are now using the standard `Future` trait. The main differences are that we are taking a `Pin` to `&mut Self`.
This is just a fancy way that rust guarantees memory safety and is way outside the scope of this article.
Just think of it as a regular mutable reference to self (as it will be optimized out). The second difference is that we are not passing a `wake` closure anymore.
Now, it's a `Context` which is just an abstraction to a [virtual function pointer table](https://en.wikipedia.org/wiki/Virtual_method_table) which is also outside the scope of this article. 
Just know that the <!--`Context::waker()`-->`cx.waker()` will get the previously used `wake` closure.

Now with that out of the way lets look at what is happening here. If the data is there, we return the data as a `Ready(data)`.
Otherwise, we arrange to be woken by using `set_readable_callback` and then return `Pending`. 

With that, we now have everything needed to use futures. You can try out all of the code [here](#).


## async/await
It's easy to see how writing out poll function can get complicated as more things need to be done in them.
For example, assume we wanted to write an asynchronous `read_file` function that opens a file and reads it.
We must do this in two steps, we need to open it (this takes time, we will have to ask the OS to give us a file descriptor).
Once that has finished we can then read the file (also takes time).

Both steps can be done asynchronously but together have to happen synchronously.
If we imagined what the poll function would look like for this operation, we would have to know where we are in the process (of opening and then reading).
Every time poll is called, we would have to check to see where we are at in the whole process and run a different thing accordingly. <!-- needs work -->

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
This poll function would work in the following way. There would be a few states that allow it to know where it is throughout this function.
The first would be an uninitialized state, this is when we just start executing the program.
On our first poll this would run until we reach the first await. At this point we would poll the future created by `File::open()` and most likely won't be able to make progress so the poll would return `Pending`.
Once that future wakes back up and returns `Ready(data)` then we can progress to the next state with our new file variable set.
This next state would be defined for everything in between the two awaits and the same process would continue.

 
One thing to note is that we can't replace our `FutSocket`'s poll implementation with async/await because we have to do special things like set the `wake` function and interface with the OS (if it were real).
Async/await is used to take existing future implementation (like `File::open(p)` and `File::read_to_string(...)`) and chain them together to make more complicated more useful asynchronous code easily.



## How is it used in production
Futures in rust are zero cost which you can tell by our implementation. This effort to get futures into rust has taken over 3 years.
And, it pays off because the only posable limitation to performance would then be in executer design. <!-- I don't like this, it's too negative -->
Because of the way rust guarantees memory and thread safety the implementation for executors can very complicated and yet very safe.
One of the more popular executers (or in this case runtimes) is called tokio, it is a multithreaded, work-stealing, task scheduler tuned for async networking workloads.

It is using tokio that an actor based web framework called [actix](https://actix.rs/), written in rust, can handle 153% more [fortunes responses](https://github.com/TechEmpower/FrameworkBenchmarks/wiki/Project-Information-Framework-Tests-Overview#fortunes) per second then the next best web framework <!-- is this how math works --> written in C according to [this TechEmpower benchmark](https://www.techempower.com/benchmarks/#section=data-r18).


## Further Reading
- [Pinning](https://rust-lang.github.io/async-book/04_pinning/01_chapter.html)
- [The Rust Async Book](https://rust-lang.github.io/async-book/)
- [tokio-rs](https://tokio.rs/)
