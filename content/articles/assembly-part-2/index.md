---
layout: engineering-education
status: publish
published: true
url: /assembly-part-2/
title: Assembly Part 2 - Let's Write Assembly!
description: Learning assembly language, is any low-level programming language in which there is a very strong correspondence between the instructions in the language and the architecture's machine code instructions.
author: mike-white
date: 2020-07-03T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/assembly-part-2/hero.jpg
    alt: computer image asm example
---
In the [first part of this series](/assembly-part-1/), we talked about the basics of Assembly. Now, we want to write a couple of programs. In this article, we'll try to do "Hello, World!" and a Fibonacci program.
<!--more-->

**NOTE:** Unlike the first part, this part will only work on the Linux operating system. A virtual machine or WSL should also be able to run this.

### System Calls
Before we get started, there's something we have to talk about. We wrote an infinite loop in the first tutorial, but we want to write a program that ends now. But we can't just go to the end of the program. We want to end *gracefully*.

In Linux, you do this using a "system call". For our purposes, all of our system calls will tell the operating system to do something, such as printing to the console or exiting the program. To do a system interrupt, we use the `int 0x80` instruction. Then, depending on what is in the registers, [something will happen](http://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/). Here are two examples:

* **sys_exit** - If `eax` is set to 1, then a system exit will be performed. The exit code is whatever number is stored in `ebx`.
* **sys_write** - If `eax` is 4 and `ebx` is 1, then the string with its pointer stored in `ecx` will be printed. The length of the string is in `edx`

With these two system calls, we can write "Hello, world!" in Assembly. Let's do it!

```asm
section .text
	global _start

	start:

		; print("Hello, world!\n")
		mov eax, 4	; print
		mov ebx, 1 ; print to console
		mov ecx, message ; the message to write
		mov edx, len ; the length of the message
		int 0x80

		; exit(0)
		mov eax, 1 ; system exit
		mov ebx, 0 ; exit code 0
		int 0x80
```

That's the `text` section, but now we need the `data` section. To create a string of characters, we use `db`, which stands for "declare bytes".

```asm
section .data
	message db "Hello, world!", 10, 0 ; the message to print
```

The [`10` is a newline character](http://www.asciitable.com/) (equivalent to `\n` in traditional programming languages) and the `0` is a null character (equivalent to `\0`).

One down, one to go. Now we need the `len` constant. We could just say `15`, but what if we have to change it later? Assembly has some syntactical sugar that can help us define our `len` constant.

```asm
len equ $-message ; length of the message
```

There's a lot of [cleverness](https://stackoverflow.com/a/20411716/12195838) in this line, don't worry about it if it works.

### Fibonacci

Ok, so enough with the boring stuff. Let's do something interesting. Let's print out the first forty Fibonacci numbers. If for some reason, you still don't know what [fibonacci numbers](https://www.mathsisfun.com/numbers/fibonacci-sequence.html) are, the first two are zero and one. To get the next Fibonacci number, you just add the last two fibonaccci numbers together, like so:

`0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...`

We'll use the following algorithm to generate the numbers:

```rust
fn fibonacci() {
    let mut iteration = 40;

    let mut a = 0;
    let mut b = 1;
    let mut c : usize;

    while iteration != 0 {

        c = a + b;
        println!("{}", c);

        a = b;
        b = c;

        iteration -= 1;
    }
}
```

Before you read further, try to see if you can do it on your own. Then, you can come back to this article if you get stuck.

To get started, we'll store our variables in the `bss` section. Let's just focus on initializing our variables for now:

```asm
section .text
	global _start

	_start:
		; initialize values
		mov dword [var_a], 0
		mov dword [var_b], 1
		mov dword [itera], 40	; generate 40 numbers

section .bss
	var_a resb 4
	var_b resb 4
	var_c resb 4

	itera resb 4
```

Each of our numbers are 32 bits. We set up `itera` to start at 40, so 40 numbers are generated.

Now we need a loop in our code to generate a single fibonacci number. We'll make a label called `one_num`. For now, we'll just focus on generating the next number. We'll worry about creating the loop later.

```asm
one_num:
	; c = a + b
	mov dword [var_c], var_a	; c = a
	add dword [var_c], var_b	; c += b

	mov dword [var_a], var_b	; a = b
	mov dword [var_b], var_c	; b = c
```

We can't simply make `var_c` equal to the sum of two numbers, so we must first set it equal to a, and then add b to it. Then, we just move the value of b into a and c into b, so that we're ready for the next number.

Now that we can generate one fibonacci number, we need to loop. The first thing we need to do is check `itera` at the beginning so that we can jump to the end if it's zero. We'll also need an `end` label. Remember to decrement `itera` at the end of the loop.

```asm
one_num:
	; if (iteration == 0) goto end
	cmp dword [itera], 0
	je end

	; ... generate fib number

	dec dword [itera]	; iteration --

end:
```

Now we just need to exit gracefully:

```asm
end:
	mov eax, 1	; system exit
	mov ebx, 0	; exit code 0
	int 0x80
```

Here's the full code:

```asm
section .text
	global _start

	_start:
		; initialize values
		mov dword [var_a], 0
		mov dword [var_b], 1
		mov dword [itera], 40		; generate 40 numbers

	one_num:
		; if (iteration == 0) goto end
		cmp dword [itera], 0
		je end

		; c = a + b
		mov dword [var_c], var_a	; c = a
		add dword [var_c], var_b	; c += b

		mov dword [var_a], var_b	; a = b
		mov dword [var_b], var_c	; b = c

		dec dword [itera]			; iteration --

	end:
		mov eax, 1					; system exit
		mov ebx, 0					; exit code 0
		int 0x80

section .bss
	var_a resb 4
	var_b resb 4
	var_c resb 4

	itera resb 4
```

The next step is to print the numbers to the console. See if you can figure that out on your own with the steps above as a guide. :wink:
