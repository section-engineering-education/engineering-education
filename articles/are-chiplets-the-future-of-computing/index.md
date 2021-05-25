---
layout: engineering-education
status: publish
published: true
url: /engineering-education/are-chiplets-the-future-of-computing/
title: Are Chiplets the Future of Computing?
description: Processors followed Moore's Law, which says that the number of transistors will double every two years. It is now being said that Moore's Law is coming to an end, especially with monolithic designs.
author: gregory-manley
date: 2020-02-26T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/are-chiplets-the-future-of-computing/hero.jpg
    alt: chiplet future of cumputing
---
The use of chiplets allows manufactures to use more than one node in a processor design. For example, the I/O components of CPUs are hard to shrink.
<!--more-->

For many years, CPUs have been made based upon a monolithic design. This processor followed Moore's Law, which says that the number of transistors will double every two years. It is now being said that Moore's Law is coming to an end, especially with monolithic designs.

### Processor Designs
Monolithic processors are ones in which all components are on a single die. This means that every different CPU, is designed separately to account for the number of cores on that die. This design has had disadvantages including cost, yields, and even the ability to move to a smaller node.

The use of chiplets allows manufacturers to use more than one node in a processor design. For example, the I/O components of CPUs are hard to shrink. [AMD has created a design](https://www.wired.com/story/keep-pace-moores-law-chipmakers-turn-chiplets/) using 14nm for the I/O controller, which does not handle pure number crunching, and uses 7nm for the chiplets on the same CPU package.

### What Are Chiplets?
Chiplets are, in the most basic sense, dies that contain some of the function blocks for the processor. These cores are on separate dies from the I/O and Memory controllers. [ExtremeTech](https://www.extremetech.com/computing/290450-chiplets-are-both-solution-and-symptom-to-a-larger-problem) says that "a chiplet contains some of the specialized functions blocks that we typically think of as making up a monolithic microprocessor. With its third-generation Ryzen CPUs, AMD has chosen to split its I/O and DRAM controllers into a single functional block, while its CPU cores and L3 cache are contained within each individual chiplet." Chiplets are, at this time, mainly CPU cores with their appropriate cache.

### How Are Chiplets Being Used in Today's Computers?
Chiplets offer many advantages, one of which is decreased costs. According to [Techquickie](https://www.youtube.com/watch?v=NkknclAeUZ8), chiplets are modular and therefore smaller dies. Chiplet designs are good for yields. This is due to how these dies are manufactured on a Silicon Wafer. The decreased size means more chiplets on a given wafer, and defectives would not waste a big area of silicon, since the chiplet is much smaller than a monolithic die. Since there is less waste and more dies per wafer, it allows for less expensive and faster production of the end product.

Up until AMD's Ryzen 3rd generation processors, chiplets had been restricted to high-end desktop and server processors. Ryzen 3 introduced many consumers to chiplet based processors, that offered a performance boost over previous monolithic designs of yester-year. The chiplet design allows manufactures to continue to shrink the transistors for the CPU cores without worrying (too much) about shrinking the complex I/O and Memory controllers. Chiplets have allowed for faster and less expensive production of processing units, creating more competition in the CPU market.
