---
layout: engineering-education
status: publish
published: true
url: /calculating-fibonacci-numbers-concurrently-in-Python./
title: Calculating Fibonacci Numbers Concurrently in Python
description: This article will cover how to calculate Fibonacci numbers concurrently in Python.
author:
date: 2022-05-11T00:00:00-18:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/calculating-fibonacci-numbers-concurrently-in-Python./hero.jpg
    alt: Calculating Fibonacci Numbers Concurrently in Python with examples
---
What is so special about Fibonacci numbers? They are numbers used to calculate other mathematical problems. They also have magnetic properties that do not apply to other types of numbers.
<!--more-->
One of these properties is recursion used to calculate Fibonacci numbers concurrently in Python using the fastest available algorithms today. What does that mean? You can find the nth Fibonacci number using far fewer computational steps than you think! This article will cover how to calculate Fibonacci numbers concurrently in Python.

### Table of contents
- Calculating Fibonacci numbers concurrently
- Adding Items
- Subtracting Items
- Multiplying Two Fibo Numbers
- Finding the sum of two Fibo numbers

### Prerequisites
- [Python](https://www.python.org/) installed. Preferably Python 3.6.2 version.
- Basic knowledge and understanding of asyncio
- Experience in using python libraries.

Let us get started!

#### Step one: Calculating Fibonacci numbers concurrently
In most programming languages, the calculation of Fibonacci numbers is sequential. However, we can calculate them concurrently if we know how many Fibonacci numbers we calculate and their values. For example, consider a program that calculates the first 5 Fibonacci numbers. There will be no more than five calls to function fib(n) since n=0..4, so we can run fib(0), fib(1), fib(2), fib(3), and fib(4) in parallel. The following example shows you how to do it in Python #!/user/bin/env python # -*- coding: utf-8 -*-  Calculating Fibonacci numbers concurrently  import time def fib(n): global count count += 1 return count print Calculating Fibonacci numbers concurrently start = time.time() for i in range(5): print i, fib(i) end = time.time() print Time took: end - start print Number of calls: count Output 0 1 1 2 3 2 3 4 5 3 5 8 13 4 8 21 34 5 13 34 55 Time taken: 0.0006 Number of calls: 6 . This output shows us that running all these functions concurrently took only 0.0006 seconds, and the total number of calls was six, which means that all functions were called at least once by the main thread. I am using range(5) instead of explicitly writing out every number because they would take up too much space. When I want to iterate over multiple numbers, it’s better to use range instead of writing out every value.

### Adding Items
The Fibonacci Sequence is a classic numerical series with many interesting properties and algorithms developed around it. Fibonacci numbers are defined by adding each pair of consecutive numbers starting with 1 and 2: 1, 2, 3, 5, 8, 13, 21. The sequence appears everywhere in nature (in animal populations) because it approximates growth at an exponential rate. These calculations can be done using simple techniques like loops or recursion. However, if you’re working on a multi-core machine, you can speed things up by calculating them concurrently. This tutorial will show you how to do just that. We’ll discuss what concurrency means and why it makes sense for us to use multiple cores when calculating these numbers. Then we’ll look at some simple solutions before moving on to our final example, which uses asyncio, a library for handling asynchronous I/O operations used heavily in Python 3 applications. Asyncio allows us to calculate our Fibonacci numbers concurrently without worrying about managing threads or locks—as long as we stick to its API! This post was written using Python 3.6.2 and is compatible with all versions above it (Python 2 support dropped in version 3). It requires basic knowledge of asyncio but isn’t dependent on any other external libraries besides NumPy, which is installed automatically with Anaconda.

### Subtracting Items
To calculate Fibonacci numbers concurrently, first, you must subtract one number from another: A-B=C. To perform subtraction concurrently, you’ll need a thread for each Fibonacci number. Each thread will be responsible for computing two numbers simultaneously: its value and that of its predecessor. Start by writing a function called fib(n) that returns the nth Fibonacci number; it should take n as an argument and return F(n-1)+F(n-2). Now create three threads: one for F(0), one for F(1), and one for F(2). Have them compute their values while communicating with each other via shared memory. The next step is to have these threads communicate with each other—but how? Here’s where channels come into play. Channels are used to pass messages between threads, allowing them to synchronize their work without getting stuck waiting on each other. Create a channel named fibo_channel and have your threads send messages through it when they want to share data or synchronize operations. Now that all three threads can talk to each other, add Code to make them do so. You could use message queues (the standard way of implementing concurrency in Python), but we won’t go into detail here because we don’t think it adds much value for such a simple example.

### Multiplying Two Fibo Numbers
If you’re trying to calculate a number, there are two ways that you can multiply two numbers together. The first way is by using regular multiplication. However, suppose you have many math problems that involve multiplying by Fibo numbers. In that case, it can be a lot easier and faster for your computer (or yourself) if you can use a technique called Fibonacci parallel computation. With Fibonacci parallel computation, instead of having one computer work on each step of calculating a number, you’ll be able to split up your problem into multiple parts so that multiple computers can work on each part simultaneously. It makes things much quicker and more efficient when calculating large sets of Fibo numbers. While we won’t get into how to implement parallel computing here, we will look at how to write some basic code that uses Fibonacci numbers. For example:
- Write out all of your Fibonacci numbers from 0 through 15 on a piece of paper. Make sure they are in sequential order from 0 through 15; if not, move them around until they are ordered correctly.

### Finding the sum of two Fibo numbers
One easy way of adding two Fibonacci numbers is based on their relationship with sums of previous Fibo numbers. This property provides us with a formula for finding each element without calculating all previous elements. The approach I will describe is good for illustrative purposes only and should not be used for real-world applications due to its heavy computational complexity. We will start by calculating a Fibonacci number: Let’s say we want to find F(3). We know that it is equal to 2 + 3 = 5. And since we know that each next number after 1 is equal to sum of previous two numbers (1 = 1, 2 = 1 + 1, 3 = 2 + 1), we can deduce that 5 must be equal to 2 + 3 = 5. So, if we look at our formula, we can see that if n equals 3, then F(n) must be equal to n * (n - 1) / 2. So far, so good. Now let’s try and figure out how many steps we need to calculate any given Fibonacci number? Let’s see what happens when you apply our formula with n = 0 or n = 1? In both cases, we get an error because division by zero is undefined. But from now on, everything works like a charm! For example, if you use our formula with n = 2 then you get F(2) = (2 * 1) / 2 = 1. If you use it with n = 3 then you get F(3) = (3 * 2) / 2 = 6 and so forth... As expected, each time we double one number in our calculation result becomes twice as big. If we have N elements to add, we need log_2(N) steps to complete our task. Since log_2(N) ~= N/log_2(N), it means that for us to calculate N elements successfully, we need O((log_2(N))^O(1)) operations, which makes no sense at all!

### Conclusion
Fibonacci numbers are integers that follow a particular pattern. The first two Fibonacci numbers are 0 and 1, and each subsequent number equals the sum of the two preceding ones. This pattern continues as needed; however, computing many such values concurrently can become time-consuming. To solve this problem, we wrote a program using several concurrent functions in Python 3.2. 3. We then discussed how to execute multiple functions at once and take advantage of some unique aspects of Python’s syntax. We concluded by showing how we can easily extend our solution to work with any length sequence desired. While most solutions will use recursion, ours uses no loops at all!
