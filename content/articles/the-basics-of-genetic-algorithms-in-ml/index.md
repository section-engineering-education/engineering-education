---
layout: engineering-education
status: publish
published: true
url: /the-basics-of-genetic-algorithms-in-ml/
title: The Basics of Genetic Algorithms in Machine Learning
description: This article will provide an overview of the genetic algorithm in machine learning. It will cover fundamental aspects such as the benefits, phases, limitations, and real-life applications of genetic algorithms.   
author: arthur-muthee
date: 2021-05-26T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/the-basics-of-genetic-algorithms-in-ml/hero.jpg
    alt: genetic algorithm example image
---
A genetic algorithm is a search-based algorithm used for solving optimization problems in machine learning. This algorithm is important because it solves difficult problems that would take a long time to solve. It has been used in various real-life applications such as data centers, electronic circuit design, code-breaking, image processing, and artificial creativity.
<!--more-->
This article will take the reader through the basics of this algorithm and explains how it works. It also explains how it has been applied in various fields and highlights some of its limitations.

### Genetic algorithm (GA) explained 
The following are some of the basic terminologies that can help us to understand genetic algorithms:
- **Population:** This is a subset of all the probable solutions that can solve the given problem. 
- **Chromosomes:** A chromosome is one of the solutions in the population.
- **Gene:** This is an element in a chromosome.
- **Allele:** This is the value given to a gene in a specific chromosome. 
- **Fitness function:** This is a function that uses a specific input to produce an improved output. The solution is used as the input while the output is in the form of solution suitability. 
- **Genetic operators:** In genetic algorithms, the best individuals mate to reproduce an offspring that is better than the parents. Genetic operators are used for changing the genetic composition of this next generation.  

A genetic algorithm (GA) is a heuristic search algorithm used to solve search and optimization problems. This algorithm is a subset of [evolutionary algorithms](https://en.wikipedia.org/wiki/Evolutionary_algorithm), which are used in computation. Genetic algorithms employ the concept of genetics and natural selection to provide solutions to problems. 

These algorithms have better intelligence than [random search algorithms](https://en.wikipedia.org/wiki/Random_search) because they use historical data to take the search to the best performing region within the solution space. 

GAs are also based on the behavior of chromosomes and their genetic structure. Every chromosome plays the role of providing a possible solution. The fitness function helps in providing the characteristics of all individuals within the population. The greater the function, the better the solution. 

### Advantages of genetic algorithm
- It has excellent parallel capabilities.
- It can optimize various problems such as discrete functions, multi-objective problems, and continuous functions.
- It provides answers that improve over time.
- A genetic algorithm does not need derivative information. 
  
### How genetic algorithms work
Genetic algorithms use the evolutionary generational cycle to produce high-quality solutions. They use various operations that increase or replace the population to provide an improved fit solution. 

Genetic algorithms follow the following phases to solve complex optimization problems:

#### Initialization
The genetic algorithm starts by generating an initial population. This initial population consists of all the probable solutions to the given problem. The most popular technique for initialization is the use of random binary strings. 

#### Fitness assignment
The fitness function helps in establishing the fitness of all individuals in the population. It assigns a fitness score to every individual, which further determines the probability of being chosen for reproduction. The higher the fitness score, the higher the chances of being chosen for reproduction. 

#### Selection
In this phase, individuals are selected for the reproduction of offspring. The selected individuals are then arranged in pairs of two to enhance reproduction. These individuals pass on their genes to the next generation. 

The main objective of this phase is to establish the region with high chances of generating the best solution to the problem (better than the previous generation). The genetic algorithm uses the fitness proportionate selection technique to ensure that useful solutions are used for recombination. 

#### Reproduction
This phase involves the creation of a child population. The algorithm employs variation operators that are applied to the parent population. The two main operators in this phase include crossover and mutation. 

1. **Crossover:** This operator swaps the genetic information of two parents to reproduce an offspring. It is performed on parent pairs that are selected randomly to generate a child population of equal size as the parent population.

2. **Mutation:** This operator adds new genetic information to the new child population. This is achieved by flipping some bits in the chromosome. Mutation solves the problem of local minimum and enhances diversification. The following image shows how mutation is done.
  
![Mutation](/engineering-education/the-basics-of-genetic-algorithms-in-ml/mutation.png)

[Image Source](https://www.digitalvidya.com/wp-content/uploads/2018/09/mutation.png)

#### Replacement
Generational replacement takes place in this phase, which is a replacement of the old population with the new child population. The new population consists of higher fitness scores than the old population, which is an indication that an improved solution has been generated. 

#### Termination
After replacement has been done, a stopping criterion is used to provide the basis for termination. The algorithm will terminate after the threshold fitness solution has been attained. It will identify this solution as the best solution in the population. 

### Application areas
Genetic algorithms are applied in the following fields:
- **Transport:** Genetic algorithms are used in the traveling salesman problem to develop transport plans that reduce the cost of travel and the time taken. They are also used to develop an efficient way of delivering products. 
- **DNA Analysis:** They are used in DNA analysis to establish the DNA structure using spectrometric information. 
- **Multimodal Optimization:** They are used to provide multiple optimum solutions in multimodal optimization problems.
- **Aircraft Design:** They are used to develop parametric aircraft designs. The parameters of the aircraft are modified and upgraded to provide better designs. 
- **Economics:** They are used in economics to describe various models such as the game theory, cobweb model, asset pricing, and schedule optimization. 
  
### Limitations of genetic algorithms
- They are not effective in solving simple problems.
- Lack of proper implementation may make the algorithm converge to a solution that is not optimal.
- The quality of the final solution is not guaranteed.
- Repetitive calculation of fitness values may make some problems to experience computational challenges.

### Conclusion
This article has provided the basics of genetic algorithms, which are heuristic search algorithms used for solving complex problems. These algorithms are important because they are efficient and fast. 

They work in generational phases such as *initialization, fitness assignment, selection, reproduction, replacement, and termination.* 

Genetic algorithms are used in the traveling salesman problem to establish an efficient plan that reduces the time and cost of travel. It is also applied in other fields such as *economics, multimodal optimization, aircraft design, and DNA analysis.* 

Happy learning.

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
