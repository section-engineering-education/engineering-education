---
layout: engineering-education
status: publish
published: true
url: /random-number-genrator-python/
title: How to Generate Random Numbers in Python
description: This article will go over how to generate random numbers in Python. Computers cannot be completely random without getting input from actual random events. True-random events are very rare.
author: mike-white
date: 2021-01-13T00:00:00-19:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/random-number-genrator-python/hero.jpg
    alt: Generate Random Numbers in Python example image
---
A random event is an event that cannot be predicted in advance. How do computers make random numbers? We will make a few of our own random number generators to show how they work.
<!--more-->

### Why do this?
Why make a random number generator when we can just use `random.random()`?

It's nice to know how the algorithms that you're using work. Some may be better for your project than others. Knowing how they work will help you pick the best one.

Some random number generators are [known to be very bad](http://www0.cs.ucl.ac.uk/staff/d.jones/GoodPracticeRNG.pdf). The default ones in Perl, Java, and C are infamous. If you're working in any of those languages, you may prefer to make your own generator.

### Real-world events
We can use real-world events to generate randomness. This is actually how [random.org](https://www.random.org/) works. It uses atmospheric noise to generate its numbers. Atmospheric noise is very chaotic. You technically could predict it if you knew the exact state of every molecule in the world. 

The site is betting on the fact that you don't. As Dr. Mads Haahr puts it, "I think the most meaningful definition of randomness is that which cannot be predicted by humans."

You can use [random.org's API](https://api.random.org/dashboard) to use these random numbers in your code. Although you'll need the Internet to use it, and many people wouldn't appreciate that.

The problem with using real-world events is that you need a device to measure them with. If you don't have that, it doesn't work.

### Pseudo-randomness
There's gotta be a better way, right?

Computers cannot be completely random without getting input from actual random events. True-random events are very rare. If you knew the exact state of every quark in the universe, you might be able to predict almost anything.

Instead, computers typically use pseudo-random number generators. They're not 100% random, but it will seem random to most people.

Your computer is capable of coming up with pseudo-random numbers. The most common numbers to use are the current time and the exact inputs that the user has made. The time is a bit more popular these days. However, back when we had machines that didn't keep track of the time, we'd need to use user input.

Of course, just using the time as the random number doesn't sound all too random. If someone makes a bunch of random numbers at about the same time, there'll be a problem. We can change it in some chaotic way to generate a more random number. We can call the original number a seed since it's the starting value. Then we use an algorithm to take our seed and turn it into a pseudo-random number. There are a couple of ways we can do this.

>Note: If you're trying to use random numbers for security reasons, don't use any of these algorithms. There are better ones for your case.

#### System entropy
Unix-based operating systems have a unique way of generating random numbers. A file called `/dev/random` contains a random number based on many sources. Every time you read from this file, you'll get a new number. There are a couple of problems with this.

Reading from this file may take a while on Linux. It doesn't open until there's enough information to create a sufficiently random number. There is a solution to this. There's another file, `/dev/urandom,` which will open immediately. This file is slightly more predictable, though. 

Also, the blocking is only a problem on Linux versions older than `5.6`. In macOS, `/dev/random` and `/dev/urandom` behave the same. In Linux 5.6, `/dev/random` only blocks if the random number generator hasn't been initialized yet. Linux 5.6 isn't [long-term stable yet, as of this writing](https://www.kernel.org/), so many people still aren't using it. It still may be slow for some users.

The other problem is that this file doesn't exist on Windows. We want a random number generator that works on all systems.

#### A giant list
This method is the easiest to implement. We just need a giant list of numbers, and then we can go through the list.

```python
random_numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4]
random_number_index = 0

def rand():
  global random_number_index
  number = random_numbers[random_number_index]
  random_number_index = (random_number_index + 1) % len(random_numbers)
  return number
```

[Run the code](https://repl.it/@Botahamec/Giant-Random-List)

We get a number from the list and move to the next number in the list. This is a quick and easy way to generate random numbers. This method is used in Fire Emblem, and [clever players have learned to abuse this](https://www.youtube.com/watch?v=Qq8ZRWkhovs). Obviously, this method isn't very good. It repeats in a predictable way that's consistent with every run. We can certainly do better.

#### Xorshift
The xorshift is a fast random number generator. Only a couple of operations are needed: bitwise xor and bit-shifting. Because of its simplicity, it can run in very few clock cycles. 

Here's a Python implementation:

```python
xorshift_seed = # The initial seed should go here

def xorshift():
  global xorshift_seed
  xorshift_seed ^= xorshift_seed << 13
  xorshift_seed ^= xorshift_seed >> 17
  xorshift_seed ^= xorshift_seed << 5
  xorshift_seed %= int("ffffffff", 16) # The modulus limits it to a 32-bit number
  return xorshift_seed
```

[Run the code](https://repl.it/@Botahamec/Xorshift)

The problem is that it's just statistically speaking, [not very random](https://www.iro.umontreal.ca/~lecuyer/myftp/papers/xorshift.pdf). We can make a [demo](https://repl.it/@Botahamec/Xorshift-Test) to show this. This demo runs both the given implementation of xorshift, and the `random.randint()` function, to see how evenly distributed the results are.

```bash
xorshift() % 10
0: 189 times
1: 220 times
2: 179 times
3: 181 times
4: 214 times
5: 169 times
6: 239 times
7: 197 times
8: 203 times
9: 209 times

random.randint(0, 9)
0: 198 times
1: 189 times
2: 190 times
3: 218 times
4: 222 times
5: 186 times
6: 197 times
7: 195 times
8: 218 times
9: 187 times
```

While the xorshift implementation is fairly even, the number 6 is fairly more common, and 5 is a little uncommon. The range of occurrences is about 70. However, with Python's builtin random function, the values are closer. The range is only about 40.

However, there are [some variations](https://en.wikipedia.org/wiki/Xorshift#Variations) of xorshift that work much better. Look into those if you need an incredibly fast random number generator.

#### Middle square algorithm
Take the seed, square it, and just use the middle digits. To calculate the next number, you take the previous random number and use that as the seed.

![A demonstration of the middle squares algorithm](/engineering-education/random-number-genrator-python/middle_squares.png)

To generate a seed, you can choose from a couple of methods. You can use the current time or use `/dev/random` or `/dev/urandom` on Unix.

The problem with this is that, depending on the seed, you might get a repeating pattern sooner than you want. We call the number of times it takes to get a repeating sequence the *period*. Some seeds will give you a longer period than others. 

A two-digit seed of 50 will just keep repeating the same number forever. If the numbers repeat very quickly, it will be much easier to predict, and some numbers won't show up at all. A better algorithm is needed.

#### Linear congruential generator
For this algorithm, we need a few more parameters. In addition to the seed, we'll need a multiplier, an increment, and a modulus. We'll talk about how to figure these out later. To generate a number, you just need to calculate the following:

```bash
number = (multiplier * seed + increment) % modulus
```

With a good multiplier and increment, the period for this algorithm is the modulus. You could write a function to generate the multiplier and increment for you. Although, it would be faster to just hard-code them in. We can use specific values for the multiplier, increment, and modulus to get as long of a period as possible.

- The increment and modulus should have no common factors.
- (multiplier - 1) should be divisible by all the prime factors of the modulus.
- If the modulus is a multiple of 4, then the multiplier should also be a multiple of four.

To be clear, you are still guaranteed to have repetition at some point with this algorithm. Although, if you use the right values, the program will probably end before that happens.

Any of these random number generators will make numbers that feel random. Some may be better for your program than others. After reading this, you should be capable of picking the right one for your project.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
