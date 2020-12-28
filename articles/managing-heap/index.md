---
layout: engineering-education
status: publish
published: true
url: /engineering-education/managing-heap/
title: Managing the Heap in C
description: Working with the heap in C is very difficult. Even Google struggles with it. But it's very important to not have memory issues in your code.
author: mike-white
date: 2020-07-31T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/managing-heap/hero.jpg
    alt: memory drive image example
---
Memory management is very important. In Google Chrome, [70% of security bugs are memory problems](https://zdnet.com/article/chrome-70-of-all-security-bugs-are-memory-safety-issues/). Fixing memory management would lead to much more reliable and secure programs. There are two possible solutions to this. You can use a language with [better](https://www.rust-lang.org) or [easier](https://www.java.com) memory management, or just learn how to use memory properly. We will talk about the latter today.
<!--more-->

### The Stack
There are two places where memory can be placed: the stack and the heap.

The stack is the default for primitive variables in most statically-typed programming languages. The stack is at the front of memory. Not only does it contain variables, but also function parameters, and return addresses. Assigning a variable to the stack is easy. Just create a variable.

```c
int stack_num = 5; // this variable is stored in the stack
```

The advantage of using the stack is that it’s relatively fast. Not as fast as [cpu registers](https://www.section.io/engineering-education/assembly-part-1/#registers), but still fast. It only takes a couple cycles of the CPU to use it. There are still some times when it’s useless though…

### The Heap

#### What is the Heap?
The heap is in the back of memory, and it’s managed by the operating system. Using this is a bit more involved. You need to use the `malloc` function to tell the operating system how much memory you need.

```c
// malloc returns a pointer to the memory address that the OS has allocated to your program
int* heap_num = malloc(sizeof(int)); // use sizeof() to determine the size of a value
*heap_num = 5;
```

Now we have a problem though. Normally, a variable exits scope at the end of the function it was declared in. But the OS will never let go of this memory unless we tell it to. There are other programs that need to run on this computer, and it would be selfish of us to horde it all for ourselves. We need to free up this memory using the `free` function.

```c
free(heap_num);
```

Some programs forget to do this, which causes what is called a “memory leak”. The OS still thinks you need that memory and doesn’t clear it until the program ends.

If you try to access `heap_num` now, you’ll get the dreaded “segmentation fault”. You’re trying to access memory that doesn’t belong to you. There are very good security reasons why this happens.

The heap is much slower than the stack. The computer needs to keep track of what processes are allowed to use which points of memory. Accessing the memory isn’t as big of a problem as the allocation. The `malloc` function has to find an empty place in memory, mark the space as used, and then tell your program where it is.

#### Why Use the Heap at all?
The heap gives you control over when memory is freed. Consider the following function.

```c
int* mut_num(int value) {
    int number = value;
    return &number;
}
```

You may expect this to give you a pointer to whatever value you put in, but it doesn’t. If you’re lucky, it might actually give you what you’re looking for. But it’s more likely that you just get a random number. Why? Because `number` is deallocated at the end of the function. You can’t use it outside of this function, because it no longer exists once the function ends. Instead, you’ll need to rewrite it to look like the following:

```c
int* mut_num(int value) {
    int* number = malloc(sizeof(int));
    *number = 5;
    return number;
}
```

This way, the value still exists when you leave the function. If this seems like a contrived example, you’re right. A better example would be if you needed to pass a mutable structure between functions.

```c
struct Account {
    int id;
    char* name;
    int amount;
};

struct Account* new_account(char* name) {
    static int current_id = 0;
    current_id ++;

    struct Account* account = malloc(sizeof(Account));
    account -> name = name;
    account -> id = current_id;
    account -> amount = 0;

    return account;
}
```

This way, you can modify the account and pass it in between functions. In Java, [all objects are stored in the heap](https://www.baeldung.com/java-stack-heap) for this reason. It makes it easier to have multiple references to a single object.

### Other Problems
Of course, there are other problems that can occur when using the heap. Here are a few:

#### Dereferencing Null
Some functions, instead of returning a pointer, return `NULL`. This indicates something has gone wrong. Normally, this causes a segmentation fault. That’s because `NULL` isn’t a real address that you have permission to use.

#### Using Uninitialized Memory
This isn’t strictly a heap problem, but say you try to do this.

```c
int* pointer = malloc(sizeof(int));
printf("%d", *pointer); // undefined behavior, most likely a random number
```

You never initialized the value of `pointer`. The value will be whatever just happened to be there before. This is almost completely random.

#### Double Free
You don’t want to try to free something that’s already free. In some cases, it can actually cause a problem with the memory manager, and cause future mallocs or frees to fail.

```c
free(pointer);
free(pointer); // undefined behavior
```

### Conclusion
Now you know many of the problems with memory management. You should be able to prevent these errors from popping up in your own C code.
