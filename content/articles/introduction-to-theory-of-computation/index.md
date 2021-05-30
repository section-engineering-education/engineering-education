---
layout: engineering-education
status: publish
published: true
url: /introduction-to-theory-of-computation/
title: Introduction to the Theory of Computation
description: This article will cover the basics of theory of computation and its role within the efficiency of computers such as the automata theory and complexity theory.
author: elly-omondi
date: 2021-01-04T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-theory-of-computation/hero.jpg
    alt: Theory of Computation cover image 
---
[Theory of computation (TOC)](https://en.wikipedia.org/wiki/Theory_of_computation) is a branch of Computer Science that is concerned with how problems can be solved using algorithms and how efficiently they can be solved.
<!--more-->
Real-world computers perform computations that by nature run like mathematical models to solve problems in systematic ways. The essence of the theory of computation is to help develop mathematical and logical models that run efficiently and to the point of halting. Since all machines that implement logic apply TOC, studying TOC gives learners an insight into computer hardware and software limitations.

### Overview
This article will cover:
- [Key considerations of computational problems](#key-considerations-of-computational-problems)
- [The importance of Theory of computation](#importance-of-theory-of-computation)
- [Automata Theory](#automata-theory)
- [Computability Theory](#computability-theory)
- [Complexity Theory](#complexity-theory)
- [Conclusion](#conclusion)

### Key considerations of computational problems
- What can and cannot be computed.

- Speed of such computations.

- The amount of memory in use during such computations.

### Importance of Theory of computation
The theory of computation forms the basis for:

- Writing efficient algorithms that run in computing devices.

- Programming language research and their development.

- Efficient compiler design and construction.

The Theory of Computation is made up of 3 branches. 

They are:
1. Automata Theory.

2. Computability Theory.

3. Complexity Theory.

### Automata Theory
Mathematicians and Computer Scientists developed this theoretical computer science branch to simplify the logic of computation by using well defined abstract computational devices (models).

[Automata Theory](https://en.wikipedia.org/wiki/Automata_theory) is the study of abstract computational devices. It forms a formal framework for designing and analyzing computing devices such as biocomputers and quantum computers. These models are essential in several areas of computation (applied and theoretical fields). 

An Automaton is a machine that operates singularly on input and follows a defined pattern or configuration to produce the desired output. Through automata, we learn how problems and compute functions are solved by the use of automatons. 

A basic computation performed on/by an automaton is defined by the following features:
- A set of input symbols.

- The configuration states.

- Output.

#### Branches of Automata theory 
- **Finite Automata (FA):** This is a computer model that is inferior in its computation ability. This model is fit for devices with limited memory. It is a simple abstract machine with five elements that define its functioning and processing of problems.

A [Finite Automaton (FA)](https://www.geeksforgeeks.org/introduction-of-finite-automata/) is a finite collection of states with rules (transition functions) for traversing through the states depending on the input symbol. FA accepts or rejects input strings while reading the strings from left to right.

**The tuples are:**

- **Q:** *Finite set of states*.

- **∑:** *Set of input symbols*.

- **q:** *Initial state*.

- **F:** *Set of final states*.

- **δ:** *Transition function*.

Finite Automata is useful in building text editors/text preprocessors. FA are poor models of computers. They can only perform simple computational tasks.

- **Context-Free Grammars (CFGs):**  They are more powerful abstract models than FA and are essentially used in the programming languages and natural language research work.

- **Turing Machines:** They are abstract models for real computers having an infinite memory (in the form of a tape) and a reading head. They form much more powerful computation models than FA, CFGs, and Regular Expressions.

### Computability theory
The [Computability theory](https://plato.stanford.edu/entries/computability/) defines whether a problem is “solvable” by any abstract machine. Some problems are computable while others are not.

Computation is done by various computation models depending on the nature of the problem at hand, examples of these machines are: the Turing machine, Finite state machines, and many others.

### Complexity theory
This theoretical computer science branch is all about studying the cost of solving problems while focusing on resources (time & space) needed as the metric. The running time of an algorithm varies with the inputs and usually grows with the size of the inputs.

#### Measuring Complexity
Measuring complexity involves an algorithm analysis to determine how much time it takes while solving a problem (time complexity). To evaluate an algorithm, a focus is made on relative rates of growth as the size of the input grows. 

Since the exact running time of an algorithm often is a complex expression, we usually just estimate it. We measure an algorithm's time requirement as a function of the input size (n) when determining the time complexity of an algorithm.

As T(n), the time complexity is expressed using the [Big O](https://en.wikipedia.org/wiki/Big_O_notation) notation where only the highest order term in the algebraic expressions are considered while ignoring constant values.

The common running times when analyzing algorithms are:
- O(1) - Constant time or constant space regardless of the input size.

- O(n) - Linear time or linear space, where the requirement increases uniformly with the size of the input.

- O(log n) - Logarithmic time, where the requirement increases in a logarthimic nature.

- O(n^2) - Quadratic time, where the requirement increases in a quadratic nature.
  

This analysis is based on 2 bounds that can be used to define the cost of each algorithm. 

They are:
1. Upper (*Worst Case Scenario*)

3. Lower (*Best Case Scenario*)

The major classifications of complexities include:
- *Class P:* The class P consists of those problems that are solvable in polynomial time. These are problems that can be solved in time O(n^k) for some constant k where n is the input size to the problem. It is devised to capture the notion of efficient computation.

- *Class NP:* It forms the class of all problems whose solution can be achieved in polynomial time by non-deterministic Turing machine. NP is a complexity class used to classify decision problems.

A major contributor to the complexity theory is the complexity of the algorithm used to solve the problem. Among several algorithms used in solving computational problems are those whose complexity can range from fairly complex to very complex. 

The more complex an algorithm, the more computational complexity will be in a given problem.

#### Factors that influence program efficiency
- The problem being solved.

-	The algorithm used to build the program.

- Computer hardware.

- Programming language used.

### Conclusion
Programs are formally written from descriptions of computations for execution on machines. We've learned that TOC is concerned with a formalism that helps build efficient programs. Efficient algorithms lead to better programs that optimally use hardware resources.

Good understanding of the Theory of Computation helps programmers and developers express themselves clearly and intuitively, thus avoiding entering into potentially uncomputable problems while working with computational models. 

#### Relevant Resources
- [Theory of Computation](https://www.geeksforgeeks.org/introduction-of-theory-of-computation/)
- [Computability Theory](https://www.sciencedirect.com/topics/mathematics/computability-theory)
- [Complexity Theory](https://en.wikipedia.org/wiki/Computational_complexity_theory)
- [Time Complexity](https://en.wikipedia.org/wiki/Time_complexity)

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

