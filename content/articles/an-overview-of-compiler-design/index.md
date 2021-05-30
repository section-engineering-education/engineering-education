---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-compiler-design/
title: An Overview of Compiler Design
description: This article will be an overview of the fundamental aspects of Compiler Design such as the Phases of a Compiler and its real-life applications.
author: onesmus-mbaabu
date: 2021-02-04T00:00:00-06:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-compiler-design/hero.jpg
    alt: Compiler Design image
---
The computer is an integral tool in our lives because it runs applications that solve many real-life problems. Computer programmers write programs (using programming languages) to perform various tasks. The high-level programming languages currently used can only be understood by human beings, but not by the computer. 
<!--more-->
It requires a compiler to convert this high-level language to a language that can be understood by the machine. In this article, we will learn about the fundamental aspects of compiler design. Some of the aspects covered include language processing systems, compiler design architecture, and the phases of a compiler. The article will also discuss the real-life applications of compiler technology.

### What is a compiler?
A compiler is a computer program that transforms a source language (high-level language (HLL)) into a machine language (low-level language (LLL)) without changing the program meaning. It is an intermediary between the machine-readable language and the human-readable language. The principles of compiler design gives an overview of the translation and optimization processes. 

A compiler can perform various operations such as parsing, preprocessing, lexical analysis, and semantic analysis. It can also perform code generation and code optimization. These operations are implemented in phases that consist of inputs and outputs.

There are various types of compilers. 

Some of the common types include:
- **Source-to-source compiler:** This is a compiler in which the source code of one language is transformed into a source code of a different language. Examples include [CoffeeScript](https://en.wikipedia.org/wiki/CoffeeScript) and [Haxe](https://en.wikipedia.org/wiki/Haxe). 
- **Cross compiler:** In this compiler, the source code can be produced in one machine and executed in a different machine. [GNU Compiler Collection (GCC)](https://en.wikipedia.org/wiki/GNU_Compiler_Collection) is a good example of a cross compiler. 
- **JIT (just in time) compiler:** In this compiler, the compilation is deferred until the runtime. It is applied to modern programming languages such as Python, Java, and JavaScript. 
- **Hardware compiler:** This is a compiler that uses the hardware configuration to produce output, rather than a string of instructions. [Xilinx Synthesis Tool (XST)](https://www.xilinx.com/products/design-tools/xst.html) is a good example of a hardware compiler. 
  
### Introduction to language processing system 
Learning the language processing system for C programming language can improve our understanding of how a compiler is utilized. This system consists of various components that process the input language to produce the desired output. 

![Language Processing System](/engineering-education/an-overview-of-compiler-design/language-processing-system.jpg)

[Image Source: Tutorials Point](https://www.tutorialspoint.com/compiler_design/images/language_processing_system.jpg)

The computer programmers first write the source code using HLL (C programming language). The source code then goes through the various components of the language processing system. These components are organized in a logical order. 

The following provides a brief explanation of these components:
- **Preprocessor:** This tool produces an output that is used as the input for the compiler. It performs various operations such as macro-processing, language extension, and file inclusion. 
- **Compiler:** This compiles the high-level language and translates it into a language that can be understood by the assembler (assembly code or low-level language). 
- **Assembler:** This tool uses the output of the compiler as its input. In this tool, the assembly code is transformed into machine code. The output produced by the assembler is called the object file. 
- **Linker:** This tool transforms the output of the assembler into executable machine code. Here, all the program parts are linked to enhance execution.
- **Loader:** This tool collects the executable machine codes and loads them into the memory for execution. 

### The compiler design architecture
The compiler design architecture can be divided into two main parts: analysis and synthesis. 

![Compiler Design Architecture](/engineering-education/an-overview-of-compiler-design/compiler-design-architecture.jpg)

[Image Source: Scanftree](https://scanftree.com/compiler-design/images/compiler_analysis_synthesis.jpg)

#### Analysis 
This part represents the front-end in compiler design. It consists of various operations such as analyzing the source code, dividing the core into sections, and checking for errors.  It also constructs a symbol table to map source code symbols to relating information such as type, scope, and location. 

An intermediate representation (IR) of the program is generated and analyzed before it is sent to the synthesis phase. The analysis part of the architecture consists of phases such as preprocessing, lexical analysis, syntax analysis, and semantic analysis. 

#### Synthesis 
This part uses the intermediate code representation as the input. It represents the back-end in compiler design. The synthesis part of the architecture utilizes the symbol table and the intermediate code representation to produce the target program. It consists of phases such as optimization and code generation.

### Phases of a compiler
The following diagram shows the main phases of a compiler. These phases are in the two aforementioned parts of the compiler design architecture. 

![Phases of a Compiler](/engineering-education/an-overview-of-compiler-design/phases-of-a-compiler.png)

[Image Source: The Tech Pro](http://www.kttpro.com/wp-content/uploads/2017/02/Compiler-1024x792.png)

The following is a brief description of these phases.

- **Lexical analysis:** This is the first phase of the compiler that receives the source code, scans, and transforms it into *lexemes*. These *lexemes* are represented by the lexical analyzer in a *token* form. *Tokens* consist of various categories such as separators, identifiers, operators, comments, and keywords. 
- **Syntax analysis:** This phase is also referred to as *parsing*. It uses the tokens generated in the previous phase to produce a syntax tree (parse tree). It checks whether the token expressions are syntactically correct. 
- **Semantic analysis:** This phase checks whether the language rules in the parse tree have been followed. Semantic information is added to the parse trees produced in the syntax analysis. The semantic analysis phase performs various operations such as checking for errors, associating variables with corresponding definitions, and issuing warnings. The output of this phase is in the form of annotated syntax tree. 
- **Intermediate code generation:** This phase involves generating an intermediate code that can be translated into the final machine code. Intermediate representation can be in various forms such as three-address code (language independent), byte code, or stack code. 
- **Code optimization:** This is an optional phase that improves or optimizes the intermediate code to enable the output to be run faster. This phase eliminates unnecessary code lines and ensures that the output occupies less space. 
- **Code generation:** This is the final stage that transforms the optimized code into the desired machine code. 
  
### Applications of compiler technology
#### High-level programming language implementation
Compiler technology is applied when implementing high-level programming languages. These languages can only be implemented if there is a compiler to transform them into a low-level language that can be understood by the machine. Optimizing compilers can help in improving or optimizing the performance of codes, which eliminates the inefficiencies associated with high-level abstractions. 

#### New computer architecture design
This technology is also used in designing computer architectures. Computer architecture design has evolved over the years. Initially, compilers were created after the machines were set up. Nowadays, compilers are built in the processor-design stage of new computer architectures. Compiled codes are run on simulators to evaluate or assess the architectural features. 

Examples of architectures that have utilized the compiler technology include the [reduced instruction-set computer architecture (RISC)](https://cs.stanford.edu/people/eroberts/courses/soco/projects/risc/whatis/index.html#:~:text=RISC%2C%20or%20Reduced%20Instruction%20Set,in%20other%20types%20of%20architectures.) and specialized architectures such as [very long instruction word machines (VLIW)](https://whatis.techtarget.com/definition/VLIW-very-long-instruction-word#:~:text=Very%20long%20instruction%20word%20(VLIW,%2C%20at%20the%20same%20time).), and [single instruction multiple data (SIMD) architecture](https://en.wikipedia.org/wiki/SIMD).

#### Computer architecture optimization
Compiler technology is used to optimize computer architectures through two main ways: memory hierarchy and parallelism. Parallelism allows multiple operations to be executed at the same time (simultaneously). 

It also enables different application threads to be run on distinct processors. The memory hierarchy allows programmers to develop a large and fast storage. 

#### Program translation
This technology is also applied in various program translations such as binary translation, hardware synthesis, and database query interpretation. In binary translation, the compiler technology is used to translate binary codes. 

In hardware synthesis, compilers are used to transform RTL (register transfer level) descriptions into gates. Compilers are used for translating query languages (eg. Structured Query Language (SQL)) into commands that can be used for searching records in a database. 

### Conclusion
A compiler is an important computer program used for converting a human-readable language into a machine language. It works with other components such as preprocessors, assemblers, and loaders to produce an intended output in the language processing system. It consists of various phases such as lexical analysis, syntax analysis, semantic analysis, code optimization, and code generation. 

The compiler technology is applied in various computer fields such as HLL implementation, program translation, and computer architecture (design and optimization). In the future, we may experience complex compiler technologies that will be integrated with various computer applications. 

### Resources 
- [e-Computer Notes](https://ecomputernotes.com/compiler-design/language-processing-system)

- [Tech Target](https://whatis.techtarget.com/definition/compiler)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)