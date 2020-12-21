# An Introduction to Processors

A __processor__ is an integrated electronic circuit that receives input and converts it into necessary output. It is also known as the __Central Processing Unit__. Computers seem to take in input and give output in human-readable forms such as print media and audio. 
However, computers are binary in nature and can only “understand” data in two states. These are usually described as on & off or 1 & 0. 

Using high level languages such as python and java, programmers pass instructions to processors to accomplish certain tasks. The code is then passed on to either an assembler, compiler or interpreter. These are the programs that translate code from human language to assembly or directly to machine language. Assembly language is a low level language that resembles human language. Assembly has a low level of __abstraction__ and therefore runs very fast.

> Abstraction refers to the hiding of detail that therefore, “protects” the programmer from the complexities of the particulars. 

![alt text](Abstraction.png)

Let us consider the printing of ‘Hello World’ at various levels.  C++ has a high level of abstraction as few lines of code are required to complete the task. Machine Language does not hide any details of the process and thus translation is not required. Consequently, machine language would run fastest. As a middle ground, Assembly language is functional in assisting programmers capitalize on speed and code efficiency as they understand the translation process better. 
### Hello World Program
| C++  | 
| ------------- |
```
#include <iostream>

int main()
{
    
    std::cout << "Hello, world!\n";
    return 0;
}
 ```    

| Assembly Language | 
| ------------- |
```
global  _main
    extern  _printf

    section .text
_main:
    push    message
    call    _printf
    add     esp, 4
    ret
message:
    db  'Hello, World', 10, 0
```

| Machine Language | 
| ------------- |
```
b8    21 0a 00 00   #moving "!\n" into eax
a3    0c 10 00 06   #moving eax into first memory location
b8    6f 72 6c 64   #moving "orld" into eax
a3    08 10 00 06   #moving eax into next memory location
b8    6f 2c 20 57   #moving "o, W" into eax
a3    04 10 00 06   #moving eax into next memory location
b8    48 65 6c 6c   #moving "Hell" into eax
a3    00 10 00 06   #moving eax into next memory location
b9    00 10 00 06   #moving pointer to start of memory location into ecx
ba    10 00 00 00   #moving string size into edx
bb    01 00 00 00   #moving "stdout" number to ebx
b8    04 00 00 00   #moving "print out" syscall number to eax
cd    80            #calling the linux kernel to execute our print to stdout
b8    01 00 00 00   #moving "sys_exit" call number to eax
cd    80            #executing it via linux sys_call
```



To understand how code is turned from human-readable to machine-readable then executed, we shall use the __x86 Instruction Set Architecture__. This refers to a series of microprocessors developed by Intel based on the 8085 Processor. A __microprocessor__ is a programmable electronic chip that has computing and decision-making capabilities. These microprocessors(x86) share similar instruction set architectural models and are hence grouped together. For example: 80186 & 80286 microprocessors.

>An instruction set architecture refers to the basic design of the processor’s components. It represents how they have been organized and implemented, and how they interact with main memory and other components. Architecture is concerned with the general plan and functions of a processor.

## Overview of the x86 Processor

![alt text](x86TrainerKit.png)



The figure above represents the 8086 trainer kit. A trainer kit is a device that functions as a simulator of the actual 8086 processor. It is used as a tool for learning, teaching and development.

The 8086 is a 16-bit microprocessor that has 20 address lines and 16 data lines. An address bus is an internal channel that transfers the RAM location of the data being processed or the instruction being fetched. The number of lines (wires) in the address bus determines the maximum amount of RAM that can be directly accessed by the CPU as each line carries one bit of the address. Therefore, the x86 Processor has 2^(20) = 1,049,576 bytes = Approximately 1MB of RAM. 

The 8086 microprocessor is divided into two functional parts: __Bus Interface Unit__(BIU) and the __Execution Unit__(EU). The Bus Interface Unit provides the interface of 8086 to external memory and I/O devices while the Execution Unit performs the operations and calculations as instructed by the computer program.


The 8086 utilises _pipelining_ to improve performance. This is a technique that balances the fetching and execution of an instruction, i.e., while an instruction is being executed, another is fetched. Pipelining increases the overall instruction throughput thus speeds up the microprocessor.

The Execution Unit triggers the start of the Bus Interface Unit by sending instructions. After finding the location required, it is accessed, and data is retrieved using the data bus. The Execution Unit then removes instructions from the Instruction Stream Byte Queue for processing as the Bus Interface Unit simultaneously fetches more instructions from memory and puts them in the queue.

In this article, we have outlined the basic functionality of a processor. In the next article, we will dive into the details using the x86 Processor’s Instruction Set Architecture.
