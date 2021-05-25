---
layout: engineering-education
status: publish
published: true
slug: assembly-part-1
title: Assembly Part 1 - Let's Learn Assembly!
description: In computer programming, assembly language, often abbreviated asm, is any low-level programming language in which there is a very strong correspondence between the instructions in the language and the architecture's machine code instructions.
author: mike-white
date: 2020-06-23T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/asm-image.jpg
    alt: computer image asm example
---
[In the beginning, there were punch cards](https://www.youtube.com/watch?v=nwDq4adJwzM). Eventually, someone got the bright idea to have the computer be programmable. Just type in the hexadecimal code and let it run. The problem is that it's very difficult to look at hexadecimal and decipher what it does.
<!--more-->

### Enter Assembly

[Assembly is still really down to the metal](https://en.wikipedia.org/wiki/Assembly_language), where every detail of how the computer does its task must be specified. The difference is that Assembly makes these instructions human-readable.

The next step above that would be to use a programming language, such as C, Java, or Typescript. This is certainly easier than using Assembly, but to this day, [there are still tasks which systems programming languages cannot accomplish](https://en.wikipedia.org/wiki/Assembly_language#Current_usage). Some examples include:

- Aggressive optimization (C and Rust are already very fast, but they're not perfect)
- Assembly makes it easier to calculate exactly how long a program will take to run
- Programs that have to work directly with hardware, such as drivers
- The booting of an operating system

### Requirements
Assembly isn't the same on all systems, unfortunately. Different computers need different code to work. Here's what you need for this tutorial:

- An x86 computer (This won't work on a Raspberry Pi, for example)
- A 32-bit or 64-bit operating system (preferably Linux)
- An Assembler (NASM on Linux or MASM on Windows)
- Experience in low-level programming (C, C++, Rust, and Go are good languages to know)

### Sections
Executable programs [can be divided into three sections](https://www.tutorialspoint.com/assembly_programming/assembly_basic_syntax.htm) ([you can use more](https://www.nasm.us/doc/nasmdoc7.html#section-7.1.3), but this tutorial will stick to three). Here they are:

- **text** - This section contains the actual instructions that your code will run.
- **bss** - All of the global variables are stored here. Any `static` variable is placed here.
- **data** - This section is used for constant globals.

Sections are declared simply by typing `section .name`. For example, the data section would be declared using:
```
section .data
```

### Variables
Variables, as we've already talked about, are stored in the `bss` section. We can't just declare their value, like in a normal language. Instead, we can tell the assembler exactly how many bytes to reserve.

```assembly
section .bss
	var	resb 4
```

This creates a variable called `var` and reserves four bytes for it. If we wanted to reserve two bytes, we would've put a `2` at the end. To access the value of `var`, we surround its name in square brackets: `[var]`.

### Statements
A statement in Assembly follows the following format:

```
mnemonic [operands] [;comment]
```

Let's break it down.

The `mnemonic` is the actual to run. Some operations take one parameter. Some take multiple. There are [many instructions](https://en.wikipedia.org/wiki/X86_instruction_listings) in Assembly, but we'll focus on the following ones.

| Mnemonic | Operand 1 | Operand 2 | Description                                                |
| :--	   | :--	   | :--	   | :--														|
| mov      | location  | value     | Sets operand 1 to operand 2                                |
| inc      | location  |           | Adds one to the location                                   |
| dec      | location  |           | Subtracts one from the location                            |
| add      | location  | value     | Adds the value to the location                             |
| sub      | location  | value     | Subtracts the value from the location                      |
| jmp      | label     |           | Jumps to a part of the program                             |
| cmp      | value1    | value2    | Compares two values                                        |
| je       | label     |           | Jumps to a part of the program if the two values are equal |
| int      | interrupt |           | Creates a software interrupt                               |

Comments in Assembly are anything that comes after a semicolon (`;`). You should already be familiar with what these do – they help explain your code to other people who are reading it.

We'll go into more detail about these instructions later. For now, here are some examples:

```assembly
mov [var], 5	; var = 5
dec [var]	; var --
add [var], 3	; var += 3
; See if you can come up with your own!
```
### Labels
Consider the following C code

```c
void main() {
	int var = 0;
	while (1) {
		var ++;
	}
}
```

This code uses a `while` loop to repeat forever. Assembly doesn't have loops that are as simple though. In Assembly, you have to do something more similar to the following

```c
void main() {
    int var = 0;
    loop:
        var ++;
        goto loop;
}
```

You'd be forgiven for not knowing this is valid C code. (It's pretty bad practice.) But in Assembly, that's all you have. Let's try to translate this to Assembly.

Let's set up our program. We need a `text` section to store the program instructions, and a `bss` section to store our variable.

```
section .text
section .bss
```

We didn't talk about this yet, but we need to tell the program where to start in our program. We'll make a label called `_start` and start there. We can tell the linker where to start using `global _start`.

```
section .text
	global _start

	_start:

```

Now we need to create our variable. We'll use a 32-bit integer, which requires four bytes.

```
section .bss
	var resb 4
```

Now we need to initialize the variable. This is exactly what the `mov` instruction is for.

```
_start:
	mov dword [var], 0 ; We have "dword" here because it's a 32 bit operation
```

Now we need a loop. We'll make a label, call it `loop`, and jump unconditionally to it.

```
_start:
	mov dword [var], 0
loop:
	jmp loop
```

Finally, we need to increment our variable.

```
section .text
	global _start

	_start:
		mov dword [var], 0
	loop:
		inc dword [var]
		jmp loop
section .bss
	var resb 4
```

I should probably mention how you can run this. Assuming that the file is called `incrementor.asm`, and you're using NASM:

```bash
nasm -f elf incrementor.asm
ld -m elf_i386 -s -o incrementor incrementor.o
./incrementor
```

### Registers
Did you know that your CPU has built-in memory? :astonished: Registers are memory that is built into the CPU. Because of this, it's lightning-quick to use registers, instead of storing values in RAM.

*So why don't we just use registers for everything?
Here's the problem. [We don't have very many registers](https://www.tutorialspoint.com/assembly_programming/assembly_registers.htm). This tutorial will only use four. This will become a problem later, but as long as we need less than four variables, this should work for us. We'll use four: `eax`, `ebx`, `ecx`, and `edx`. We'll use these four because it's very easy to remember them. They all follow the format of `e_x`. Each of these registers can store one 32-bit number.*

We can rewrite our infinite loop from before to use a register

```assembly
section .text
	global _start

	_start:
		mov eax, 0
	loop:
		inc eax
		jmp loop
```

Now we don't need any RAM at all!... except to store the actual program in memory. We also don't need to specify the size of the operation. The size of `eax` is always four bytes.

### Conclusion
This concludes the basics of Assembly. Check out my next article on [how to write an actual program using Assembly](/engineering-education/assembly-part-2/).
