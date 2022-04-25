---
layout: engineering-education
status: publish
published: true
url: /chaos-cryptography/
title: Chaos theory and its potential for cryptography
description: This article will introduce the reader to a different approach to cryptography in a simplistic, palatable way.
author: oliver-mulwa
date: 2022-04-22T00:00:00-18:30
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/chaos-cryptography/hero.jpg
    alt: Chaos theory and its potential for cryptography
---
### Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisite](#prerequisite)
- [Introduction](#introduction)
- [Characteristics of chaotic systems](#characteristics-of-chaotic-systems)
  - [Sensitivity to initial conditions](#sensitivity-to-initial-conditions)
  - [Periodic orbit density](#periodic-orbit-density)
  - [Topological mixing](#topological-mixing)
  - [Deterministic](#deterministic)
- [Chaos cryptographic primitives](#chaos-cryptographic-primitives)
  - [Hash function](#hash-function)
  - [Encryption Algorithm](#encryption-algorithm)
  - [Digital signature algorithm](#digital-signature-algorithm)
- [Practical problems of Chaos-Based Cryptography](#practical-problems-of-chaos-based-cryptography)
- [Possible solutions](#possible-solutions)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)


### Prerequisite
A basic understanding of the concepts of cryptography.

### Introduction
Chaos theory is a branch of mathematics that deals with the study of non-linear dynamical systems that exhibit sensitivity to initial conditions. Chaotic conditions exist in nature. A decent and typical example of such is the weather. Chaos theory has had many applications since its inception. These applications are in meteorology, anthropology, economics, and computer science, among others. Chaotic systems can be characterized by sensitivity to initial conditions, periodic orbit density, and topological mixing. Its attributes, such as determinism and sensitivity, make chaotic systems attractive for cryptography.

### Characteristics of chaotic systems
Let's look at the characteristics of chaotic systems.

#### Sensitivity to initial conditions
This means that a slight change to initial conditions creates unexpected behavior. The most common analogy used to express this idea is the [butterfly effect](https://fractalfoundation.org/resources/what-is-chaos-theory/). This is an important property in creating chaotic cryptographic algorithms and hash functions. This is because it is comparable to the [diffusion](https://cryptography.fandom.com/wiki/Confusion_and_diffusion) property.

#### Periodic orbit density
It means that any chaotic point in the trajectory can approach other points. This is due to the [strange attractor](https://www.stsci.edu/~lbradley/seminar/attractors.html) phenomenon. This characteristic is quite useful in creating affine transformations that can be quite useful in cryptography.

#### Topological mixing
This means that the chaotic trajectory generated from a random region of the phase space can cover the rest of the phase space as the trajectory evolves. This is an attractive feature in chaos since it is analogous to the **uniform distribution property** in cryptography.

#### Deterministic
This can be thought of as an extension of the sensitivity to initial conditions characteristics. It means that provided the initial conditions remain unchanged, the chaotic path followed will always be the same. This property is comparable to the deterministic pseudo-randomness property of cryptographic schemes.

### Chaos cryptographic primitives
Academics and researchers over the past decades have designed many chaos-based cryptographic schemes. The following sub-section will be a brief overview of some of their works.

#### Hash function
A hash function is a function that takes an input of any size and produces a fixed-length output. One of the chaos-based hash algorithms developed is the Chaos Hash Algorithm (CHA-1). CHA-1 is a cryptographic hash algorithm developed by two researchers. This hash algorithm uses the [logistic map](https://mathworld.wolfram.com/LogisticMap.html) as its basis for pseudo-randomness. Its comparison to SHA-1 shows a better security factor but lower performance.

#### Encryption Algorithm
Encryption aims to serve data confidentiality. Chaos is particularly used in image encryption. One such instance is the development of image encryption and compression algorithm. This algorithm relies on the [wavelet transform](https://en.wikipedia.org/wiki/Wavelet_transform) and 1-D discrete chaotic maps. Its design uses a 97-bit key combination, increasing its security. Statistical and correlation tests reveal its large keyspace and chaotic nature makes it infeasible for brute force attacks. 

#### Digital signature algorithm
Researchers have proposed a digital signature algorithm that relies on the [quadratic residue problem](https://en.wikipedia.org/wiki/Quadratic_residuosity_problem) and Chebyshev chaotic map. This signature scheme is a one-to-one interaction between the signer and the verifier. This scheme is more efficient. This is because it does not require modular exponentiation or scalar multiplication of conventional digital signature schemes. 

### Practical problems of Chaos-Based Cryptography
Many primitives use finite precision floating-point representation. If the same operating system, hardware platform, and mathematical representation are used in verification, then there will be no issues. It becomes difficult to verify the algorithm if there is a mismatch in any of these factors. This means that it becomes difficult to reproduce the results.

Efficiency problems may arise due to complex design algorithms. This means that most chaos cryptographic primitives are slower than conventional cryptosystems. For example, CHA-1 had a better security factor as compared to SHA-1 but was slower.

The use of weak keys is another problem. Special care needs to be taken to avoid secret key values that will lead to non-chaotic behavior. In a cryptosystem, this would be a huge flaw.

The lack of proper security tests via cryptanalysis is a major problem. Most of the chaos cryptographic primitives rely on statistical tests for security justifications. Statistical tests are important. However, they should not be the only basis for security tests. Other cryptanalytic tests should be done. These tests might be difficult to perform though. This is due to the over-complexity of the chaos cryptographic primitives.

### Possible solutions
Using simple but secure design principles in chaos-based algorithms is a possible solution. The design of convoluted and complex algorithms is a double-edged sword. It may make analysis by adversaries difficult. It also makes it difficult for researchers to verify its security claims. This solution may bring confidence in the practical application of chaos cryptographic primitives.

The performance of chaos cryptographic systems should be measured against conventional cryptosystems. Comparisons should be on the basis of metrics such as execution time and security factors.

Mathematical representations used by chaos cryptographic primitives should be rigorously defined. This helps to guarantee reproducibility. Floating-point representations suffer from dynamic degradation. Addressing this issue would be a great step in producing verifiable, consistent algorithms.

### Conclusion
Chaos theory possesses characteristics that suit cryptographic usage. There have been great strides in harnessing these characteristics. Even so, there is still a long way to go before realizing a practical chaos-based cryptosystem. Chaos theory has the potential to be useful for cryptography in the future. For now, however, it stays confined to the academic domain.

### Further reading
[Implementations and practical problems of chaos-based cryptography revisited](https://www.sciencedirect.com/science/article/abs/pii/S2214212619306544)

[New hash function based on chaos theory (CHA-1)](https://www.researchgate.net/publication/253155858_New_hash_function_based_on_chaos_theory_CHA-1)

[A New Chaos-Based Image-Encryption and Compression Algorithm](https://www.hindawi.com/journals/jece/2012/179693/) 

[A new digital signature scheme based on chaotic maps and quadratic residue problems](https://www.naturalspublishing.com/files/published/317re1c6x421q3.pdf)
