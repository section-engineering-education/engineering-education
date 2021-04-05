---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-is-little-endian-and-big-endian/
title: What Is Little-Endian And Big-Endian Byte Ordering?
description: Computers store data in memory in binary. One thing that is often overlooked is the formatting at the byte level of this data. This is called endianness and it refers to the ordering of the bytes.
author: zack-jorquera
date: 2020-03-09T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-little-endian-and-big-endian/hero.jpg
    alt: little endian and big endian byte ordering
---
Computers store data in memory in binary. One thing that is often overlooked is the formatting at the byte level of this data. This is called endianness and it refers to the ordering of the bytes.
<!--more-->

Specifically, little-endian is when the least significant bytes are stored before the more significant bytes, and big-endian is when the most significant bytes are stored before the less significant bytes.

When we write a number (in hex), i.e. `0x12345678`, we write it with the most significant byte first (the `12` part). In a sense, big-endian is the "normal" way to write things down.

This article will only talk about endianness when it comes to integer numbers and not [floating point](https://en.wikipedia.org/wiki/Endianness#Floating_point) numbers, as it gets a lot more complicated and way less defined.

## Why This Is Important?
An important distinction to make about endianness is that it only refers to how values are stored in memory and not how we deal with values; for example, `0x12345678` is still `0x12345678`. There is no concept of endianness here. However, if we were talking about storing this 4-byte value into memory, then and only then would we have to specify endianness.

If we were to store the previously mentioned value into memory using little-endian we would get the following. Note that each 2 hex letters represent 1 byte.
```
78 56 34 12
```
And if we were to store it in big-endian we would get:
```
12 34 56 78
```

In the end, that is why endianness is important; because not knowing how data is stored would lead to communicating different values.

For example, all [x86_64](https://en.wikipedia.org/wiki/Endianness) processors (Intel/AMD) use little-endian while [IP/TCP](https://en.wikipedia.org/wiki/Endianness) uses big-endian. This means that in order for you to use the Internet, your computer has to account for the difference in endianness.

## Seems Straight Forward So Far, Right?
Most of the confusion lies with little-endian and so we'll start there.

As a reminder, little-endianness refers to the byte ordering where the least significant byte is stored first. So for example, if we have the 8-byte value of `0x123456789abcdef0` we would store it in memory in the following way. (Note: I put a pseudo memory address next to the values, this is so we can say that this value is at memory address `0x00`.)
```
0x00: f0 de bc 9a 78 56 34 12
```
The most important thing to understand here is that we are storing an 8-byte value. On the other hand, if we were storing a 4-byte value, we would still flip the byte order, but just for those 4 bytes. Take the following array as an example.
```c
int a[] = {0x12345678, 0x9abcdef0};
```
This array, like the 8-byte number, takes up 8 total bytes and looks very similar. However, in memory, we would not store the same thing as above, but instead the following:
```
0x00: 78 56 34 12
0x04: f0 de bc 9a
```
Notice here how the order of the array is preserved and that the `0x12345678` value individually (the first 4 bytes) is in little-endian.

This is very important to understand: we don't arbitrarily store any 8-bytes in little-endian, rather, we store individual values in little-endian based on the size they take up.

As a last example, take the following character array.
```
char s[] = {0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0};
```
As you might be able to predict, this is stored in the following format.
```
0x00: 12
0x01: 34
0x02: 56
0x03: 78
0x04: 9a
0x05: bc
0x06: de
0x07: f0
```
Again, maintaining order of the array.

Now, if we bring this back to big-endian, we can see that every one of these examples is stored in the same way.
```
0x00: 12 34 56 78 9a bc de f0
```
This is because big-endian is stored in the order that you see things.
I would recommend proving this for yourself.


## So Why Does Everyone Have It Backwards?
However counter-intuitive it might seem at first, there are valid reasons why little-endian is used over big-endian. The reason for the widespread use of little-endian is not because of the ease of user understanding (as you might have figured out), but rather for ease of the computer. Let's take a look at why. We will use this 8-byte value `0x0000000000000042`. When we store it in little-endian we have the following.
```
0x00: 42 00 00 00 00 00 00 00
```
and in big-endian we would get.
```
0x00: 00 00 00 00 00 00 00 42
```
Now let's say we were to run the following code.
```c
// In the case of 64 bit compilers, long long is the same size as long. They are both 8 bytes.
unsigned long long x = 0x0000000000000042;
unsigned long long * x_p = &x;
unsigned int * y_p = (unsigned int *)x_p;
unsigned int y = *y_p;
printf("y = %#.8x\n", y); // prints in hex with '0x' and with all leading zeros
```
We are doing something called a pointer down cast. We don't change anything in memory, just how the processor reads from memory.

An important thing to notice is that `x_p` and `y_p` will have the same value (they point to the same location). We will say they both point to `0x00`.

When we run this, we will get two very different results depending on what endianness the processor uses. First, let's assume that we are using an x86_64 processor (i.e. little-endian). We get exactly what you would expect to get: `y = 0x00000042`. This is because when we re-interpret the memory in 4-byte chunks and get the following:
```
0x00: 42 00 00 00
0x04: 00 00 00 00
```
Now, when we only grab 4 bytes at memory location `0x00` we get the 4 least significant bytes from the original 8-byte value. Feel free to [try this out](https://repl.it/@ZackJorquera/EndianDownCastExample) on your computer.

Big-endian, as you may expect, behaves very differently. Imagine that we ran this code on a big-endian processor instead. We would get: `y = 0x00000000`. Again, if we re-interpret the memory in 4-byte chunks we will see the reason why this is the case.
```
0x00: 00 00 00 00
0x04: 00 00 00 42
```
The `y_p` pointer (`0x00` in our case) points to `0x00000000`.

Getting code to run this in big-endian is hard because most processors are either little-endian or [bi-endian](https://en.wikipedia.org/wiki/Endianness#Bi-endianness). However, you can change the code by adding [byte swaps](https://stackoverflow.com/a/105339/9664285) to "emulate" big-endian.
```c
unsigned long long x = __builtin_bswap64(0x0000000000000042);
unsigned long long * x_p = &x;
unsigned int * y_p = (unsigned int *)x_p;
unsigned int y = __builtin_bswap32(*y_p);
printf("y = %#.8x\n", y);
```
And then you can [run that](https://repl.it/@ZackJorquera/EndianDownCastExample) on your computer.
