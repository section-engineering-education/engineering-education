---
layout: engineering-education
status: publish
published: true
url: /understanding-simulink-using-matlab/
title: Understanding Simulink using Matlab
description: In this tutorial, we will learn how to fetch blocks & functions from the Simulink library browser. We will also learn how to use the sum & product blocks to connect multiple waves and display them on a scope. 
author: mohamed-alghadban
date: 2021-05-11T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-simulink-using-matlab/hero.png
    alt: Understanding Simulink using Matlab Image
---
In this tutorial, we will use the *Simulink* library browser to understand the blocks, waves, and functions that it has and perform a set of operations on a set of waves and plot each one of them on a scope.
<!--more-->
### Introduction
According to [Wikipedia](https://en.wikipedia.org/wiki/Simulink), **Simulink** is a MATLAB-based graphical programming environment for modeling, simulating, and analyzing multi-domain dynamical systems. Its primary interface is a graphical block diagramming tool and a customizable set of block libraries. 

It offers tight integration with the rest of the MATLAB environment and can either drive MATLAB or be scripted from it. Simulink is widely used in automatic control and digital signal processing for multi-domain simulation and model-based design.

### Table of contents
To follow this article along - the reader will need the following:
- A basic understanding of the Simulink library browser.
- Be able to perform logical & arithmetic operations on waves.
- Plot singular & compounded waves.

### Prerequisites
- A basic understanding of any programming language.
- Have Matlab installed on your system, you can download it from [here](https://www.mathworks.com/downloads/).

You can also get a free Simulink trial from [here](https://www.mathworks.com/campaigns/products/trials.html?prodcode=SL&s_tid=SL_B_pers_exclgetters_trial_2).

If you are new to Matlab, you can check [this tutorial](/getting-started-with-matlab/) which will help you understand the basic concepts of it.

### Simulink library browser
The Simulink *library browser* will provide blocks, waves, functions, models, and other useful tools that would help you with your simulation.

To open the Library Browser, click on the Library Browser button in the toolbar of Simulink.

![library browser](/engineering-education/understanding-simulink-using-matlab/picture1.png).

### Let's simulate!
Let's start with a simple [sine wave](https://en.wikipedia.org/wiki/Sine_wave): `Y = 2sin(4x)`.

In order to simulate a wave, you'll need to use the library browser to fetch the following:
- A Sin wave from Simulink > Sources > Sin wave.
- A Scope to implement the wave from Simulink > Commonly used blocks.

Drag & drop the blocks and double click on the sin wave to edit its properties.

Set the Amplitude to 2, the Frequency to 4 & the sample time to 0.001, finally connect the wave to the scope with your left courser.

![Simple sin wave](/engineering-education/understanding-simulink-using-matlab/picture2.png).

Click on the run button from the Simulink toolbar then double click on the scope to display the wave.

![Wave scope](/engineering-education/understanding-simulink-using-matlab/picture3.png).

#### Sum of 2 waves
In order to add 2 waves, you need to use the sum function from the library browser.

Let's simulate the following wave: `Y = 2sin(4x) + 5sin(6x)`.

- 2 Sin waves from Simulink > Sources > Sin wave.
- A Scope to implement the wave from Simulink > Commonly used blocks.
- A sum function to add the waves from Simulink > Math operations > sum.

Drag & drop the blocks and double click on the sin waves to edit their properties.

![Waves parameteres](/engineering-education/understanding-simulink-using-matlab/picture4.png).

Connect the sin waves to the sum block and connect the sum block to the scope.

![Sum block](/engineering-education/understanding-simulink-using-matlab/picture5.png).

Click on the run button from the Simulink toolbar, then double click on the scope to display the wave.

![Wave block](/engineering-education/understanding-simulink-using-matlab/picture6.png).

#### Compounded wave
We will simulate the following Compounded wave.

![Wave equation](/engineering-education/understanding-simulink-using-matlab/picture7.jpg).

- 3 Sin waves from Simulink > Sources > Sin wave.
- A Scope to implement the wave from Simulink > Commonly used blocks.
- A sum function to add the waves from Simulink > Math operations > sum.
- A product function from Simulink > Commonly used blocks > product.

Drag & drop the blocks and double click on the sin waves to edit their properties.

>**Note** that in Simulink you can't add cos wave, so to change that you need to add pi/2 to the phase of a sin wave to change it to a cos wave.

![Waves parameters](/engineering-education/understanding-simulink-using-matlab/picture8.png).

- Connect the first 2 sin waves to the product block, and from the product block connect the pipe to the first output of the scope & take another pipe to the sum block.
- Connect the cos wave to the second scope output & take another pipe to the sum block.
- Finally, connect the output of the sum to the third scope output.

This is how the waves should be connected:

![Product block](/engineering-education/understanding-simulink-using-matlab/picture10.png).

Click on the run button from the Simulink toolbar, then double click on the scope to display the wave.

![Scope waves](/engineering-education/understanding-simulink-using-matlab/picture9.jpg).

### Conclusion
In this tutorial, we have learned how to fetch blocks & functions from the Simulink library browser. We have also learned how to use the sum & product blocks to connect multiple waves and display them on a scope. Don’t forget to test out the waves with different amplitudes & frequencies to fully understand how it works.

Happy simulation!

### Further reading
1. https://www.mathworks.com/help/simulink/
2. https://ctms.engin.umich.edu/CTMS/index.php?aux=Basics_Simulink
3. https://www.sciencedirect.com/topics/computer-science/simulink

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
