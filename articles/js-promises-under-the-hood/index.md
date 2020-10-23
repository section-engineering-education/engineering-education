# How Promises in Javascript Work Under the Hood.

### Introduction
JavaScript is a single-threaded language (one executing command at a time). And, it has a Synchronous model of execution (each line executes in the order in which the code appears).

So, what happens if we have to wait a while before we can execute some code bits? Maybe, we have to wait for data from a GET request, or for a set timer to complete, after which we execute our code.

Such scenarios introduce a challenge. A dilemma. Between having to postpone the execution of some code. And, not wanting to prevent the thread from executing the rest of the code while we wait.

Asynchronous JavaScript solves this exact challenge!

This guide’s goal is to help you understand JavaScript Promises. An implementation of Asynchronous JavaScript.

At the very end, you should be able to understand:

1. Why such scenarios introduce a challenge.
2. How JavaScript promises overcome the challenge.
3. How JavaScript implements promises under the hood.



## Prerequisites

Before you begin this guide you'll need the following:

- A basic understanding of JavaScript

## Step 1 — What Happens When Javascript Executes (Runs) My Code?

```JavaScript 
1. const num = 3;
2. function multiplyBy2 (inputNumber){
3.     const result = inputNumber*2;
4.     return result;
5.     }
6. const name = "Will"
```
 

In this step, we will walk through the above lines of code like the JavaScript engine would.

Why?
To understand what happens when we run the code.

First, you need to note that there are two halves to the process of executing code.

One is the ability to walk through the code line by line by line, top to bottom. Known as The **Thread of Execution**.

The other part is, a place to store the bits of data that we announce as we go through our code's execution. This place is our computers **Memory**.

In line 1, you are saying, save in memory a constant, **num**, as the label for an integer, **3**.

In line 2, you meet a JavaScript keyword [**function**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions). The function keyword means, go save in memory **multiplyBy2**, as the label for the functionality of the function, `multiplyBy2()`.

At this point, if you were to run:
```JavaScript
console.log(multiplyBy2)
```
You would see the actual source code for the funtion!

From there, you would move on to line 6 and not line 3. But wait, why not line 3 if, in JavaScript, each line executes in the order that the code appears?

This is because in JavaScript we **do not** go into the body of a function until it executes. And our function `multiplyBy2()` does not execute.

Inline 6, the same thing as line 2 happens. A constant, **name**, is saved to memory as the label for a string, **"Will"**.

And so, to recap, as soon as we start executing(running) our code, we have two halves of that process:

1. One, the ability to go through our code line by line. That's our **Thread Of Execution**.
2. Two, a live memory to store our labels and associated data. Another term for that is a **Variable Environment**.

These two halves together are known as an **Execution Context**, where a context is a space to do something. In this case, it is a space where we execute code, hence an execution context.

And it is a **Global Execution Context**. You are going to discover, a little later, when you run the code inside of a function, you create a **Local Execution Context**.  The Local Execution context is for running the code inside the function.

So, for the entire Step 1, we stayed in the global execution context. Why? Because we did not call (execute/run/invoke) `multiplyBy2()`. We only declared (defined/stored in memory) the label 'multiplyBy2', that points to the functionality of `multiplyBy2()`.

In the next step, you will get to see how a local execution context comes into play when you call the function `multiplyBy2()`.

## Step 2 — Title Case

Another introduction

Your content

Transition to the next step.

## Step 3 — Title Case

Another introduction

Your content

Transition to the next step.

## Conclusion

In this article you [configured/set up/built/deployed] [something]. Now you can....

<!-- Speak  to reader benefits of this technique or procedure and optionally provide places for further exploration. -->



<!-- Some examples of how to mark up various things

This is _italics_ and this is **bold**.

Only use italics and bold for specific things. Learn more at https://do.co/style#bold-and-italics

This is `inline code`. Use it for referencing package names and commands.

Here's a command someone types in the Terminal:

```command
sudo nano /etc/nginx/sites-available/default
```

Here's a configuration file. The label on the first line lets you clearly state the file that's being shown or modified:

```nginx
[label /etc/nginx/sites-available/default]
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root <^>/usr/share/nginx/html<^>;
    index index.html index.htm;

    server_name localhost;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Here's output from a command:

```
[secondary_label Output]
Could not connect to Redis at 127.0.0.1:6379: Connection refused
```

Learn about formatting commands and terminal output at https://do.co/style#code

Key presses should be written in ALLCAPS with in-line code formatting: `ENTER`.

Use a plus symbol (+) if keys need to be pressed simultaneously: `CTRL+C`.

This is a <^>variable<^>.

This is an `<^>in-line code variable<^>`

Learn more about how to use variables to highlight important items at https://do.co/style#variables

Use `<^>your_server_ip<^>` when referencing the IP of the server.  Use `111.111.111.111` and `222.222.222.222` if you need other IP addresses in examples.

Learn more about host names and domains at https://do.co/style#users-hostnames-and-domains

<$>[note]
**Note:** This is a note.
<$>

<$>[warning]
**Warning:** This is a warning.
<$>

Learn more about notes at https://do.co/style#notes-and-warnings

Screenshots should be in PNG format and hosted on imgur. Embed them in the article using the following format:

![Alt text for screen readers](/path/to/img.png)

Learn more about images at https://do.co/style#images-and-other-assets
-->
