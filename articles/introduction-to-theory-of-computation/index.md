---
layout: engineering-education
status: publish
published: 
url: /engineering-education/introduction-to-theory-of-computation/
title: Introduction to Theory of Computation
description: This article aims to cover the basics of theory of computation and its role in efficiency of computers
author: elly-omondi
date: 2020-12-08T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-theory-of-computation/hero.jpg
    alt: TOC cover image

---

### Introduction
[**Theory of computation**] (TOC)(https://en.wikipedia.org/wiki/Theory_of_computation) is a branch of Computer Science that is concerned with how problems can be solved  using algorithms and how efficiently they can be solved
Real-world computers perform computations that by nature run like mathematical models to solve problems in systematic ways. 
The essence of the theory of computation is to help develop mathematical and logical models that run efficiently and to the point of halting.Since all machines that implement logic apply TOC, studying TOC gives learners an insight into computer hardware and software limitations.

### Key considerations of computational problems
1. What can and cannot be computed.
2. Speed of such computations.
3. The amount of memory in use during such computations.

#### Importance of Theory of computation
The theory of computation forms the basis for:
* Writing efficient algorithms that run in computing devices
* Programming language research and their development.
* Efficient Compiler design and construction

The Theory of Computation is made up of 3 branches i.e
- Automata Theory
- Computability Theory
- Complexity Theory


#### Overview
This article will cover:
- [Introduction](#Introduction)
- [Basics-of-Automata](#Automata-Basics)
- [Computability](#Computability)
- [Complexity](#Complexity)
- [Conclusion](#Conclusion)

### Basics of Automata Theory
Mathematicians and Computer Scientists developed this theoretical computer science branch to simplify the logic of computation by using well defined abstract computational devices(models).
[Automata Theory](https://en.wikipedia.org/wiki/Automata_theory) is basically the study of abstract computational devices. It forms a formal framework for designing and analyzing computing devices such as biocomputers and quantum computers.
These models are essential in several areas of computation (applied and theoretical fields). 

Through automata, we learn how  problems and compute functions are solved by use of automatons. 
An Automaton is a machine that operate singly on input and follows a defined pattern or configuration to produce a desired output.

A basic computation performed on/by an automaton is defined by the following features:

+ A set of input symbols
+	The Configuration States
+ Output


#### Branches of Automata Theory 

- **Finite Automata(FA)**- This is a computer model, though inferior in its computation ability. This model is fit for devices with limited memory. It is a simple abstract machine with five elements that define its functioning and processing of problems.

A [*Finite Automaton*] (FA) (https://www.geeksforgeeks.org/introduction-of-finite-automata/) is a finite collection of states with rules (transition functions) for traversing through the states depending on the input symbol.
FA accepts or rejects input strings while reading the strings from left to right.
**The tuples are –**
+ **Q:** *Finite set of states*
+ **∑:** *Set of input symbols*
+ **q:** *Initial state*
+ **F:** *Set of final states*
+ **δ:** *Transition function*


Finite Automata is useful in building text editors/text preprocessors. FA are poor models of computers. They can only perform simple computational tasks.


- **Context-Free Grammars(CFGs)**  – are more powerful abstract models than FA and are essentially used in the programming languages and natural language research work

- **Turing Machines** - are abstract models for real computers having an infinite memory (inform of a tape) and a reading head. Form powerful computation models than FA, CFGs and Regular Expressions.


### Computability Theory
[Computational theory](https://plato.stanford.edu/entries/computability/) defines whether a problem is “solvable” by any abstract machine. Some problems are computable, others are not.
Computation is done by a various computation models depending on the nature of the problem at hand, among these machines being; Turing machine, Finite state machines and many others.


### Complexity Theory
This theoretical computer science branch is all about studying the cost of solving problems while focusing on resources (time & space) needed as the metric.
The running time of an algorithm varies with the inputs and usually grows with the size of the inputs.
**Measuring Complexity**

Involves algorithm analysis to determine how much time it takes while solving a problem.(Time complexity) 
To evaluate an algorithm , a focus is made on relative rates of growth as the size of the input grows. Since the exact running time of an algorithm often is a complex expression, we usually just estimate it. 
We measure an algorithm's time requirement as a function of the input size(n) when determining the time complexity of an algorithm.
As T(n),the time complexity is expressed using the Big Oh(O) notation where only the highest order term in the algebraic expressions is considered while ignoring constant values.

The common running times when analyzing algorithms are:

* O(1) - Constant time, where the running time is not affected by the size of the input(n)
* O(n) - Linear time, where time requirement increases uniformly with the size of the input.
* O(log n) - Logarithmic time
* O(n^2) - Quadratic time
  

This analysis is based on 2 bounds that can be used to define the cost of each algorithm. i.e 
- Upper(*Worst Case Scenario*) 
- Lower(*Best Case Scenario*)


The major classifications of complexities include:

1. *Class P* – devised to capture the notion of efficient computation. Are problems that can be solved in time O(nk) for some constant k where n is the input size to the problem
2. *Class NP* – forms the class of all problems whose solution can be achieved in polynomial time by Non deterministic Turing Machine

A major contributor to the complexity theory is the complexity of the algorithm used to solve the problem. Among a number of algorithms used in solving computational problems are those whose complexity can range from fairly complex to very complex. The more the complexity of an algorithm, the more the computational complexity on a given problem. 



### Conclusion
Programs are formally written from descriptions of computations for execution on machines. We've learned that TOC is concerned with a formalism that helps build efficient programs. Efficient algorithms lead to better programs that optimally use hardware resources.

Good understanding of the Theory of Computation helps programmers and developers express themselves clearly and intuitively, thus avoiding entering into potentially uncomputable problems while working with computational models. 
 #### Factors that influence program efficiency
* The problem being solved
*	Algorithm used to build the program
* Computer hardware
* Programming language used


#### Relevant Resources
[Theory of Computation](https://www.geeksforgeeks.org/introduction-of-theory-of-computation/)
[Computability](https://www.sciencedirect.com/topics/mathematics/computability-theory)
[Complexity](https://en.wikipedia.org/wiki/Computational_complexity_theory)
