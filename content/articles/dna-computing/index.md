---
layout: engineering-education
status: publish
published: true
url: /dna-computing/
title: Introduction to DNA Computing and its Applications
description: The article introduces to DNA computing, natural computing based on the concept of performing logical and arithmetic operations using molecular properties of DNA.
author: aditi-jayakumar
date: 2020-08-05T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dna-computing/hero.jpg
    alt: dna-computing
---
Every single cell which builds up a living organism carries information for various functions necessary for the survival of the cell. This genetic information in each cell is stored in molecules called nucleic acids. The most stable form of nucleic acids is called deoxyribonucleic acid(DNA).
Each of the DNA strands forms helical structures that are long polymers of millions of linked nucleotides. These nucleotides consist of one of four nitrogen bases, a five-carbon sugar, and a phosphate group. The nitrogen bases - **A** (Adenine), **T** (Thymine), **G** (Guanine), **C** (Cytosine) encodes the genetic information while the others provide structural stability. The strands are linked to each other by the base-pairing rule, T with A and C with  G.  The arrangement of these bases is important as they decide the functionality of different [genes](https://en.wikipedia.org/wiki/Gene).
<!--more-->

### What is DNA Computing
DNA computing *is an area of natural computing based on the concept of performing logical and arithmetic operations using molecular properties of DNA by replacing traditional carbon/silicon chips with biochips*. This allows massively parallel computation, where complex mathematical equations or problems can be solved at a much less time. Hence with a considerable amount of [self-replicating DNA](https://en.wikipedia.org/wiki/Self-replication#:~:text=Self%2Dreplication%20is%20any%20behavior,transmitted%20to%20offspring%20during%20reproduction.), computation is much efficient than the traditional computer which would require a lot more hardware.
A good experience with biology and computer science is required to build algorithms to be executed in DNA computing. The information or data instead of being stored in binary digits will now be stored in the form of the bases A, T, G, C. The ability to synthesize short sequences of DNA artificially makes it possible to use these sequences as inputs for algorithms.


### Applications
The first theory of DNA computation was proposed by Leonard Adleman in 1994[1]. He put his experimental theory into the test with a seven-point Hamiltonian path problem or also called the traveling salesman problem. The salesman in this problem needs to find the shortest path between seven cities whose distances are known in such a way that he crosses no city twice and returns to the original city. Adleman represented each city with a short DNA sequence with about 20 bases and a [complementary strand](https://en.wikipedia.org/wiki/Complementary_DNA) with 20 bases as the street between the cities. All the fragments are capable of linking with each other. When the fragments were put in a tube and mixed, the natural bonding tendencies the DNA created 109 formations or solutions in less than a second. Not all were correct and he took a week to extrapolate and filter out the shortest path through various techniques.

![Image source](/engineering-education/dna-computing/image1.png)

[*Image source*](https://www.cs.uaf.edu/2010/fall/cs441/proj1/dna/DNAComputingHTMLNotes.html)

Though this solution was not ideal, this demonstration opened floodgates to a wide range of possibilities and applications. A few applications being developed are mentioned below.

#### **Security**
Deploying DNA algorithms in cryptography[2] to build an [intrusion detection model](https://en.wikipedia.org/wiki/Intrusion_detection_system) is the most recent development. The ability to store 108 terabytes of data in 1 gram of DNA has led to the potential holding a huge one time pad. Another example is [DNA steganography](https://microbialcellfactories.biomedcentral.com/articles/10.1186/s12934-020-01387-0), in which a novel method was used to hide the messages in a microdot. Instead of the traditional binary encoding, each letter was denoted by three chemical bases i.e. the letter A was encoded by CGA. These messages are then encoded into DNA sequences and concealed by mixing it in a tube with a large amount of sonicated random human DNA. This led to the formation of microdots, which was then decoded by the receiver with appropriate primers(short sequence with complementary bases). However such encryption techniques have been posed with problems. The lack of a theoretical basis to explain the implementation and come up with good schemes seem to be a challenge. These are also expensive to apply, and analyze which requires modern infrastructure.

#### **Scheduling**
 A DNA computing based algorithm was presented to solve the job scheduling problem by Zhixing et al[3]. In order to explain the model with six tasks, he demonstrated the working operations, mimicking the method used for the Hamiltonian Path problem. This however was not the first time, Watada[4] in early 2000 used DNA algorithms to work out elevator schedule systems and rearrangement of Flexible Manufacturing System. However, due to a lack of theoretical base, only medium-sized tasks were taken into consideration.

#### **Clustering**
Clustering deals with deriving highly meaningful relationships in a complex collection of data by creating a structure using various concepts and algorithms. DNA- based clustering involves using strands to assign edges and vertices. Iterative calculations are performed for every produced cluster to improve quality. This method is of particular interest when dealing with large heterogeneous data with an unknown number of clusters. It helps in reducing the time complexity by high parallelism features of DNA.

### Pros and Cons
The use of DNA strands to compute has led to high parallel computation that makes up for the slow processing of the chip. Memory space required by DNA is around 1 bit per cubic nanometer which is much less when compared to regular storage systems Consumption of power is almost nil as the chemical bonds in DNA produce energy to build or repair new strands. However, the output yielded by such computation would require complex expensive tools. The synthesis of DNA is also prone to errors such as mismatching breaks. The possibility of errors increasing exponentially with each iteration which reduces the reliability.[5][6]

### Future prospects
The field of DNA computing is an emerging concept still in its infancy and its applications are still being understood. DNA computing can be harnessed to act along with the living cells to provide new detection methods in medical devices. With the flexible molecular algorithms on the rise, one might be able to assemble a complex entity on the nanoscale with the reprogrammable tile set. Though replacing silicon chips based computers seems highly unlikely in the near future, the concept of solving problems beyond the scope of conventional computers gives rise to unfathomable applications.

### References
[1] [Adleman, L. M. (1994). Molecular computation of solutions to combinatorial problems. Science, 266(5187), 1021-1024.](https://science.sciencemag.org/content/266/5187/1021.abstract)

[2] [Gehani, Ashish & Labean, Thomas & Reif, John. (2002). DNA-based Cryptography. Discr Math Theor Comput Sci. 54. 10.1007/978-3-540-24635-0_12.](https://link.springer.com/chapter/10.1007/978-3-540-24635-0_12)

[3] [Zhixiang, J. Cui, Y. Yang and Y. Ma, Job shop scheduling problem based on DNA computing, Journal of Systems Engineering and Electronic, vol.17, no.3 pp.654-659, 2006.](https://www.sciencedirect.com/science/article/abs/pii/S1004413206601126)

[4] [Watada, S. Kojima, S. Ueda and O. Ono, DNA computing approach to optimal decision problems, Proc. of the 2004 IEEE International Conference on Fuzzy Systems, vol.3, pp.1579-1584,2004.](https://ieeexplore.ieee.org/abstract/document/1375414)

[5] [J. Watada and R. b. a. Bakar, "DNA Computing and Its Applications," 2008 Eighth International Conference on Intelligent Systems Design and Applications, Kaohsiung, 2008, pp. 288-294, doi: 10.1109/ISDA.2008.362.](https://ieeexplore.ieee.org/abstract/document/4696346)

[6] [Young, W. C., & Sheu, B. J. (1997). Unraveling the future of computing. IEEE Circuits and Devices Magazine, 13(6), 14-21.](https://sci-hub.tw/https://www.nature.com/articles/35036086)
