---
layout: engineering-education
status: publish
published: true
url: /mathematics-for-machine-learning/
title: Mathematics for Machine Learning
description: This article is intended to go over the mathematics for machine learning, by providing a general overview on the topics behind ML and how they are used. 
author: willies-ogola
date: 2021-01-12T00:00:00-12:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/mathematics-for-machine-learning/hero.jpg
    alt: Mathematics for Machine Learning example image
---
We need the equivalent of high school mathematics to understand the concepts used in Machine Learning (ML), such as linear algebra, probability, statistics, and multivariate calculus. Yet, a background in ML is necessary to understand the ML concepts and algorithms.
<!--more-->
### Introduction
Is it necessary to understand the mathematics behind ML?

Absolutely. 

Machine learning is all mathematics. ML is built on mathematical prerequisites. The math helps you understand why some models are better than others.

The chart below shows the importance of each mathematical concept needed to master ML.

![The chart shows the importance of each mathematical concept](/engineering-education/mathematics-for-machine-learning/math-topics.png)<br>

It can be summarized below as:
- Linear Algebra (35.0%)
- Probability and Statistics (25.0%)
- Calculus (15.0%)
- Algorithms (15.0%)
- Others (10.0%)

This article is not intended to go into details about the mathematical calculations in the various topics. Instead, it's meant to give you a general overview of the math topics behind ML and how they are used. 

Let's dive into it.

### Linear algebra
[Linear algebra](https://en.wikipedia.org/wiki/Linear_algebra/) covers a significant part of the mathematical concepts used for Machine Learning. It is a mathematics sub-domain dealing with linear systems of equations and the way they are represented in vector spaces and through matrices.

The essential topics in linear algebra for understanding the methods used in machine learning include:
- [Principal Component Analysis (PCA) ](https://royalsocietypublishing.org/doi/10.1098/rsta.2015.0202)
- [Eigenvalues and Eigenvectors](https://www.youtube.com/watch?v=PFDu9oVAE-g&t=59s) 
- [Singular Value Decomposition (SVD) ](https://www.youtube.com/watch?v=gXbThCXjZFM)
- [Matrix Operations, i.e., addition, subtraction, multiplication, transpose, and inverse.](https://www.youtube.com/watch?v=rowWM-MijXU) 
- [Vector Spaces and Norms](https://en.wikipedia.org/wiki/Normed_vector_space)
- [Orthogonalization and Orthonormalization](https://en.wikipedia.org/wiki/Orthogonalization)
- [Latent Semantic Analysis](https://www.youtube.com/watch?v=hB51kkus-Rc) 
- [Eigen decomposition of a matrix](https://en.wikipedia.org/wiki/Eigendecomposition_of_a_matrix)

#### Some applications of linear algebra in ML
- Principal Component Analysis (PCA) is used in machine learning for dimensionality reduction. This helps reduce the high-dimension data into low-dimension data, that is often easier to analyze.
- Singular Value Decomposition is a commonly used algorithm for data processing. It is used in machine learning for data reduction and dimensionality reduction.
- Latent Semantic Analysis is used in the Natural Language Processing (NLP) domain.
- In Convolution Neural Networks (CNN), linear algebra helps us apply transformations on inputs such as images. It converts images into pixel data and performs convolution operations on them. 
- Eigen decomposition is used in Principal Component Analysis (PCA).

### Multivariate calculus
Calculus is an important field in mathematics. It is used in machine learning to study the rate of change in quantities, such as the curves' slopes. Unlike single variable calculus, where we use functions with single inputs, which gives us single outputs, multivariate calculus involves feeding functions with multiple input variables that give either single output or multiple output results.

There are a couple of topics in calculus that are essential for ML. 

They include:
- [Differential Calculus](https://www.youtube.com/watch?v=ZetdIWyktGs&list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23&index=6)
- [Integral Calculus](https://www.youtube.com/watch?v=rCWOdfQ3cwQ)
- [Partial Derivatives](https://www.youtube.com/watch?v=pK7ap_wog9Y&list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23&index=5)
- [Hessian](https://www.youtube.com/watch?v=5qD53Exg6kQ&list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23&index=17)
- [Jacobian](https://www.youtube.com/watch?v=VhiHhHnBXcY&list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23&index=14)
- [Laplacian and Lagrarian Distribution](https://www.youtube.com/watch?v=EW08rD-GFh0)
- [Chain Rule](https://www.youtube.com/watch?v=B-mNJEZqpms&list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23&index=21)
- [Vector-Values Functions](https://www.youtube.com/watch?v=40r56pX4mqA)
- [Directional Gradient](https://www.youtube.com/watch?v=GJODOGq7cAY)

#### Some applications of calculus in ML
- Optimization techniques such as the Gradient Descent, Adam, RMSProp, and Ada Delta methods use Calculus to help find the local and global minimum and maxima.
- Backpropagation is the main algorithm used to train neural networks. It is achieved by using calculus, which utilizes concepts such as chain rule and partial derivatives.

### Probability and Statistics
Probability is the study of the measure of uncertainty. There is a need to quantify uncertainty in the real world, as the information we work with is usually incomplete. Thus, probability helps us model elements of uncertainty, i.e., the probability of a user paying back a bank loan based on past transaction information. 

It is important to note that the probabilities of all outcomes always sum up to 1. On the other hand, Statistics is a discipline in applied mathematics that involves gathering, explaining, and presenting data.

The topics in Probability and Statistics essential for understanding the methods used in machine learning include:

- [Maximum Likelihood Estimation (MLE)](https://online.stat.psu.edu/stat415/lesson/1/1.2)
- [Prior and Posterior](https://www.youtube.com/watch?v=o2Tpws5C2Eg/)
- [Bayes' Theorem](https://www.youtube.com/watch?v=XQoLVl31ZfQ/)
- [Standard Distributions](https://www.youtube.com/watch?v=CfZa1daLjwo) (Gaussian, Bernouilli, Binomial, Multinomial, and Uniform distributions)
- [Random Variables](https://www.youtube.com/watch?v=3v9w79NhsfI)
- [Moment Generating Functions](https://www.youtube.com/watch?v=cbmfYoepHPk/)
- [Sampling Methods](https://www.youtube.com/watch?v=pTuj57uXWlk/)
- [Maximum a Posteriori Estimation (MAP)](https://www.youtube.com/watch?v=kkhdIriddSI)
- [Probability Rules and Axioms](https://sites.nicholas.duke.edu/statsreview/probability-axioms/)

#### Some applications of Probability and Statistics
- Maximum Likelihood Estimation (MLE) provides a framework for predictive modeling in machine learning. It is used to maximize the likelihood of a function, which results in finding parameters that explain observed data and probability distributions in a dataset. It is commonly used to train models in ML techniques such as linear regression and logistic regression.
- Sampling is a method used in probability. In machine learning, datasets usually contain a lot of noise and bias. Sampling helps us solve this problem by obtaining samples, i.e., from different areas, instead of only using samples from one specific area, which may be biased and containing a lot of noise. Thus, sampling gives us complete coverage of the problem domain.
- Probability forms the foundation to develop specific algorithms such as the Naive Bayes classifier.
- Standard distributions such as the commonly used Gaussian distribution focus on a massive chunk in the field of statistics. These distributions provide functions to calculate the probability of a single observation from a collection of sample spaces.

### Algorithms
Algorithms are instructions that enable a computer program to put together different information sources and eventually generate a result. Understanding how algorithms work is essential in understanding the best ways to scale our ML algorithms and exploit sparsity information in our datasets, i.e., why some range of values has no data.

Below is a list of the necessary algorithm topics needed to start with ML:
- [Dynamic Programming](https://www.youtube.com/watch?v=vYquumk4nWw)
- [Stochastic Gradient Descent](https://www.youtube.com/watch?v=hMLUgM6kTp8)
- [Random and Sub-linear algorithms](https://www.youtube.com/watch?v=fCPhlWYzIPY)
- [Graphs](https://www.youtube.com/watch?v=vZi-Ca9QBME)
- [Data structures,](https://www.youtube.com/watch?v=bum_19loj9A) i.e., Hashing, Binary Trees, Stack, and Heap.

### Others
This section includes topics that are not covered by the four main mathematical concepts, but are still essential to understand machine learning. 

These topics include:
- [Real and Complex Analysis](https://59clc.files.wordpress.com/2011/01/real-and-complex-analysis.pdf)
- [Function Spaces and Manifolds](https://webspace.science.uu.nl/~ban00101/anman2009/lecture3.pdf)
- [Information Theory](https://www.youtube.com/watch?v=d9alWZRzBWk)
- [Fourier Transforms](https://www.youtube.com/watch?v=spUNpyF58BY)

### Resources
Here is a collection of books and videos that'll get you started on your journey to understand the math used for machine learning.

- [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw) 

The 3Blue1Brown is a great YouTube resource channel. It entertainingly explains mathematical concepts by using animations. It's easy to understand and follow-through, especially for beginners.

Feel free to visit their website: https://www.3blue1brown.com if you want to ask questions, share interesting mathematical concepts, or discuss videos.

- [Mathematics for Machine Learning](https://mml-book.github.io/) by Marc Peter Deisenroth, A. Aldo Faisal, and Cheng Soon Ong.

This book covers the mathematical literature that forms the basis for present-day machine learning. This book presumes that the reader has a mathematical knowledge at least equivalent to a high school graduate.

The book covers Linear Algebra, Analytical Geometry, Vector Calculus, and Probability and Distributions.

- [Mathematics for Machine Learning - Linear Algebra](https://www.youtube.com/playlist?list=PLiiljHvN6z1_o1ztXTKWPrShrMrBLo5P3) offered by the Imperial College in London. 

This course is hosted on YouTube by Coursera. It was designed to help you quickly build an intuitive understanding of linear algebra required for standard machine learning techniques.

You can visit their YouTube channel for more information.

- [Mathematics for Machine Learning - Multivariate Calculus](https://www.youtube.com/playlist?list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23) offered by the Imperial College in London. 

The course is offered by two instructors, Dr. Sam Cooper and Dr. David Dye. 

The course offers an introduction to the multivariate calculus used in machine learning. It covers machine learning algorithms such as backpropagation, a standard algorithm used to train neural networks that rely on Calculus.

### Wrapping up
That's it! That's the mathematics used for Machine learning. Yes, you can do machine learning without the math, but you won't understand what you're doing. Spare some time and learn the math if you want to understand machine learning in-depth. I've compiled a list of book and video resources that will help you explore the math used further. I hope you've found this article helpful. 

As a starter, this [book](https://mml-book.github.io/) is a great resource published by the Cambridge University Press. The book is for people who don't have a mathematics degree but want to understand enough math to deploy and build ML algorithms. The book will help you master the fundamentals of mathematics and how they are used in ML. And it's free. Feel free to check it out. 

### References
1. [Mathematics for Machine Learning](https://mml-book.github.io/)
2. [Linear Algebra](https://en.wikipedia.org/wiki/Linear_algebra/)
3. [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw/)
4. [Mathematics for Machine Learning - Linear Algebra](https://www.youtube.com/playlist?list=PLiiljHvN6z1_o1ztXTKWPrShrMrBLo5P3)
5. [Mathematics for Machine Learning - Multivariate Calculus](https://www.youtube.com/playlist?list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23)
6. [Principal Component Analysis (PCA) ](https://royalsocietypublishing.org/doi/10.1098/rsta.2015.0202)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
