---
layout: engineering-education
status: publish
published: true
url: /engineering-education/dry-manifesto/
title: A Something Sort Of Like a DRY-ism-ist Manifesto
description: DRY (Don't Repeat Yourself) is a very important part of software engineering. This tutorial will show you how, using functions, generics, and inheritance.
author: mike-white
date: 2020-09-18T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dry-manifesto/hero.jpg
    alt: DRY manifesto example image
---

> Points to whoever can figure out which [Slate Star Codex](https://slatestarcodex.com/) article the title is referencing.

### DRY Manifesto

Imagine you are a detective, perhaps in [the midst of Victorian-era London](https://en.wikipedia.org/wiki/Sherlock_Holmes). You are at your apartment at 112Y Caker Street, Seoul. Your plucky assistant, Blatson, immediately has an idea:
<!--more-->

"It seems like the victim had tuberculosis. It's likely that the murderer caught it as well. We need to find anyone who has tuberculosis."

"Right," you reply. You start looking through your casebook. It's filled with notes of evidence, places, tasks, and dialogue. You thumb through it to see if you can find anything that would show illness.

Blatson re-enters the room: "I've just finished interviewing Sir Birch!" he cries out.

"What in the devil-?", you respond, in confusion. "I've already interviewed him."

"Yes, well I forgot, so I needed to talk to him again. Did you know that Sir Birch has tuberculosis?"

"Yes, I know that," you say with irritation. "I know that because I wrote down everything in my casebook, and in my notes it says that Sir Birch has tuberculosis."

“Ah, you must be one of those [10X detectives](http://antirez.com/news/112) who can solve problems with no effort. Well, not all of us have your 'talent', O' greatest detective in London!”, Blatson replies sarcastically. “But seriously, how was *I* supposed to know to be taking notes?”

*This is Part Two of **The Adventures of Merlock and Blatson**. [Part One is here](https://www.thinkingmuchbetter.com/main/debugging-bad-detective/).*

---

DRY is a very important concept in software engineering. It stands for *Don't Repeat Yourself*. As Merlock pointed out, it's a waste of time to try to do the same action repeatedly. If you start copying and pasting code, then you may need to do some refactoring.

The examples in this article are done in various languages.

### 1. Functions

Say you need to draw a grid, using [Turtle](https://docs.python.org/3/library/turtle.html).

```python
# this is python, btw

turtle.forward(10)
turtle.left(90)
turtle.forward(10)
turtle.left(90)
turtle.forward(10)
turtle.left(90)
turtle.forward(10)
turtle.left(90)
turtle.forward(20)
# ...
```

This can get messy very quickly. Imagine if you wanted to change the size of the boxes! You'd need to rewrite all that code. [Writing a lot of code in the first place is bad anyway](https://github.com/AceLewis/my_first_calculator.py/blob/master/my_first_calculator.py). It can also increase the size of files. People don't like to download programs that are 20 GB in size. As an alternative, we can create functions so that we don't need to repeat code.

```python
def draw_box():
    turtle.forward(10)
	turtle.left(90)
	turtle.forward(10)
	turtle.left(90)
	turtle.forward(10)
    turtle.left(90)
	turtle.forward(10)
	turtle.left(90)
	turtle.forward(10)

def draw_row():
    draw_box()
    draw_box()
    draw_box()
    # ...

def next_row():
    turtle.backward(100)
    turtle.right(90)
    turtle.forward(10)
    turtle.left(10)

def draw_grid():
    draw_row()
    next_row()
    draw_row()
    next_row()
    draw_row()
    # ...
```

The alternative is 960 lines long for a 10x10 grid, so this is much better. But we can still improve it. Because, if we needed to change the size of the boxes, then we'd need to change quite a few lines of code. We can use parameters to make this easier.

```python
def draw_box(size):
    turtle.forward(size)
	turtle.left(90)
	turtle.forward(size)
	turtle.left(90)
	turtle.forward(size)
    turtle.left(90)
	turtle.forward(size)
	turtle.left(90)
	turtle.forward(size)

def draw_row(box_size):
    draw_box(box_size)
    draw_box(box_size)
    draw_box(box_size)
    # ...

def next_row(box_size):
    turtle.backward(10 * box_size)
    turtle.right(90)
    turtle.forward(box_size)
    turtle.left(90)

def draw_grid(box_size):
    draw_row(box_size)
    next_row(box_size)
    draw_row(box_size)
    next_row(box_size)
    draw_row(box_size)
    # ...
```

### 2. Loops
You've probably noticed that this is still very long. We have to repeat statements like `draw_grid` over and over again, which makes this code 40 lines long. We can fix that by using loops.

```python
def draw_box(size):
    for _i in range(4):
    	turtle.forward(size)
		turtle.left(90)
	turtle.forward(size)

def draw_row(box_size):
    for _i in range(10):
        draw_box(box_size)

def next_row(box_size):
    turtle.backward(10 * box_size)
    turtle.right(90)
    turtle.forward(box_size)
    turtle.left(90)

def draw_grid(box_size):
    for i in range(10):
        draw_row(box_size)
        # this won't move to the next line if this is the last one
        if i != 9: next_row(box_size)
```

This is great! We've reduced our code from 960 lines to just 21!

Even better than that is the fact that we can now vary the number of rows and columns.

```python
def draw_row(box_size, length):
    for _i in range(length):
        draw_box(box_size)

def next_row(box_size, length):
    turtle.backward(length * box_size)
    turtle.right(90)
    turtle.forward(box_size)
    turtle.left(90)

def draw_grid(box_size, rows, columns):
    for _i in range(rows):
        draw_row(box_size, columns)
        if i != length - 1: next_row(box_size, length)
```

If we didn't do this, we'd have to make separate functions for each size. Imagine having to make a `draw_grid8x5` function. It would be a great pain.

### 3. Generics
If you use a [statically-typed language](/engineering-education/typescript-static-typing/), you may need many types that are very similar. For example, you may need a list of integers, and a list of strings. [Some languages](https://golang.org/) will force you to actually make new types. But most statically-typed languages let you use generics.

A generic type takes a type parameter. Once the code is compiled, there are essentially multiple versions of the structure. This can [increase compile times](https://pingcap.com/blog/generics-and-compile-time-in-rust), but it can be worth it in order to save time writing code.

```java
// we're using java now
class MyArrayContainer<E> { // E is a generic parameter that takes a type
    private E[] list;

    public MyArrayContainer(E[] list) {
        this.list = list;
    }

    public E getElement(int index) {
        return list[index];
    }
}
```

Imagine creating twelve of these classes for all different types. It would be mayhem! That's why generics are such a plus for a language.

### 4. Inheritance
Sometimes, we can't reuse code, which is sad. But we can at least reuse function signatures.

A `ShortInteger` type and a `LongInteger` type are both very similar. The same operations can be performed on both. Unfortunately, these operations aren't exactly the same, so we can't reuse everything.

You may be saying that we should be using an interface, which is a viable option. But, say we wanted an `increment` method. As long as both classes have an `add` method, we can just tell the program to do `number.add(1)`. This way, we don't have to rewrite code for the `increment` method. This isn't possible in a Java interface, since default implementations are banned.

Luckily, [some languages](https://doc.rust-lang.org/book/ch10-02-traits.html) can have default implementations. Java has abstract classes, which can also have a default implementation. Let's try that!

```java
// An abstract class is a class that cannot be instantiated by itself
// Another class must extend it
abstract class AbstractInteger {

    // an abstract method must be implemented in any subclasses
    public abstract void add(int amount);

    public void increment() {
        this.add(1);
    }
}

class ShortInteger extends AbstractInteger {
    private short value;

    public ShortInteger(short value) {
        super(); // constructs the superclass
        this.value = value;
    }

    @Override
    public void add(int amount) {
        this.value += (short) amount;
    }
}

// the LongInteger class is very similar
```

Now, not only have we achieved less duplication, we've also achieved [polymorphism](https://www.tutorialspoint.com/java/java_polymorphism.htm)!

### Conclusion
Whenever you catch yourself going for Ctrl-C, try using one of these instead. Your time will thank you for it later.

Also, for the extra points - it was [A Something Sort Of Like a Left-Libertarianism-ist Manifesto](https://slatestarcodex.com/2013/12/08/a-something-sort-of-like-left-libertarianism-ist-manifesto/).
