### Prerequisites

The equivalent of high school maths is needed to understand the concepts used in Machine Learning (ML), such as linear algebra, probability and statistics, and multivariate calculus. Yet, a background in ML is necessary to understand the ML concepts and algorithms. 

### Introduction

Is it necessary to understand the mathematics behind ML?

Absolutely. 

Machine learning is all mathematics. ML is built on mathematical prerequisites. The math helps you understand why some models are better than others.

The chart below shows the importance of each mathematical concept needed to master ML.

![The chart shows the importance of each mathematical concept](/engineering-education/mathematics-for-machine-learning/math-topics.png)<br>

It can be summarized below as:

1. Linear Algebra (35.0%)
2. Probability and Statistics (25.0%)
3. Calculus (15.0%)
4. Algorithms (15.0%)
5. Others (10.0%)

This article is not intended to go into details about the mathematical calculations in the various topics. Instead, it's meant to give you a general overview of the math topics behind ML and how they are used. 

Let's dive into it.

### Linear Algebra

Linear Algebra covers a significant part of the mathematical concepts used for Machine Learning. According to [Wikipedia](https://en.wikipedia.org/wiki/Linear_algebra/), Linear Algebra is a mathematics domain concerned with linear equations and the way they are represented in vector spaces and through matrices.

The topics in Linear Algebra essential for understanding the methods used in machine learning include:

1. Principal Component Analysis (PCA)
2. Eigenvalues and Eigenvectors
3. Singular Value Decomposition (SVD)
4. Matrix Operations, i.e., addition, subtraction, multiplication, transpose, and inverse. 
5. Vector Spaces and Norms
6. Orthogonalization and Orthonormalization
7. Latent Semantic Analysis
8. Eigen decomposition of a matrix

#### Some Applications of Linear Algebra in ML

1. Principal Component Analysis (PCA) is used in machine learning for Dimensionality Reduction. This helps reduce the high-dimension data into low-dimension data, which is often easier to analyze.
2. Singular Value Decomposition is a commonly used algorithm for data processing. It is used in machine learning for data reduction and dimensionality reduction.
3. Latent Semantic Analysis is used in the Natural Language Processing (NLP) domain.
4. In Convolution Neural Networks (CNN), Linear Algebra helps us apply transformations on inputs such as images. It converts images into pixel data and performs convolution operations on them. 
5. Eigen decomposition is used in Principal Component Analysis (PCA).

### Multivariate Calculus

Calculus is an important field in mathematics. It is used in machine learning to study the rate of change in quantities, such as the curves' slopes. 
Unlike single variable calculus, where we use functions with single inputs, which gives us single outputs, multivariate calculus involves feeding functions with multiple input variables that give either single output or multiple output results.

There are a couple of topics in Calculus that are essential for ML. They include:

1. Differential Calculus
2. Integral Calculus
3. Partial Derivatives
4. Hessian
5. Jacobian
6. Laplacian and Lagrarian Distribution.
7. Chain Rule.
8. Vector-Values Functions
9. Directional Gradient

#### Some Applications of Calculus in ML

1. Optimization techniques such as the Gradient Descent, Adam, RMSProp, and Ada Delta methods use Calculus to help find the local and global minimum and maxima.
2. Backpropagation is the main algorithm used to train neural networks. It is achieved by using calculus, which utilizes concepts such as chain rule and partial derivatives.

### Probability $ Statistics

Probability is the study of the measure of uncertainty. There is a need to quantify uncertainty in the real world, as the information we work with is usually incomplete. Thus, probability helps us model elements of uncertainty, i.e., the probability of a user paying back a bank loan based on past transaction information. It is important to note that the probabilities of all outcomes always sum up to 1.
On the other hand, Statistics is a discipline in applied mathematics that involves gathering, explaining, and presenting data.

The topics in Probability and Statistics essential for understanding the methods used in machine learning include:

1. Maximum Likelihood Estimation (MLE)
2. Prior and Posterior
3. Bayes' Theorem
4. Standard Distributions (Gaussian, Bernouilli, Binomial, Multinomial, and Uniform distributions)
5. Random Variables
6. Moment Generating Functions
7. Sampling Methods
8. Maximum a Posteriori Estimation (MAP)
9. Probability Rules and Axioms

#### Some Applications of Probability and Statistics

1. Maximum Likelihood Estimation (MLE) provides a framework for predictive modeling in machine learning. It is used to maximize the likelihood of a function, which results in finding parameters that explain observed data and probability distributions in a dataset. It is commonly used to train models in ML techniques such as linear regression and logistic regression.
2. Sampling is a method used in probability. In machine learning, datasets usually contain a lot of noise and bias. Sampling helps us solve this problem by obtaining samples, i.e., from different areas, instead of only using samples from one specific area, which may be biased and containing a lot of noise. Thus, sampling gives us complete coverage of the problem domain.
3. Probability forms the foundation to develop specific algorithms such as the Naive Bayes classifier.
4. Standard distributions such as the commonly used Gaussian distribution focus on a massive chunk in the field of statistics. These distributions provide functions used to calculate the probability of a single observation from a collection of sample spaces.

### Algorithms

Algorithms are a set of instructions that enable a computer program to put together different information sources and eventually generate a result. Understanding how algorithms work is essential in understanding the best ways to scale our ML algorithms and exploit sparsity information in our datasets, i.e., why some range of values has no data.

Below is a list of the necessary algorithm topics needed to start with ML:

1. Dynamic Programming
2. Stochastic Gradient Descent
3. Random and Sub-linear algorithms
4. Graphs
5. Data structures, i.e., Hashing, Binary Trees, Stack, and Heap.

### Others

This section includes topics that are not covered by the four main mathematical concepts but are still essential to understand machine learning. These topics include:

1. Real and Complex Analysis
2. Function Spaces and Manifolds
3. Information Theory
4. Fourier Transforms

### Resources

Here is a collection of books and videos that'll get you started on your journey to understand the math used for machine learning.

1. [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw) 

The 3Blue1Brown is a great YouTube resource channel. It entertainingly explains mathematical concepts by using animations. It's easy to understand and follow-through, especially for beginners.

Feel free to visit their website: https://www.3blue1brown.com if you want to ask questions, share interesting mathematical concepts, or discuss videos.

2. [Mathematics for Machine Learning](https://mml-book.github.io/) by Marc Peter Deisenroth, A. Aldo Faisal, and Cheng Soon Ong.

This book covers the mathematical literature that forms the basis for present-day machine learning. This book presumes that the reader has a mathematical knowledge at least equivalent to a high school graduate.

The book covers Linear Algebra, Analytical Geometry, Vector Calculus, and Probability and Distributions.

3. [Mathematics for Machine Learning - Linear Algebra](https://www.youtube.com/playlist?list=PLiiljHvN6z1_o1ztXTKWPrShrMrBLo5P3) offered by the Imperial College in London. 

This course is hosted on YouTube by Coursera. It was designed to help you quickly build an intuitive understanding of linear algebra required for standard machine learning techniques.

You can visit their YouTube channel for more information.

4. [Mathematics for Machine Learning - Multivariate Calculus](https://www.youtube.com/playlist?list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23) offered by the Imperial College in London. 

The course is offered by two instructors, Dr. Sam Cooper and Dr. David Dye. 

The course offers an introduction to the multivariate calculus used in machine learning. It covers machine learning algorithms such as backpropagation, a standard algorithm used to train neural networks that rely on Calculus.

### Wrapping up

That's it! That's the mathematics used for Machine learning. Yes, you can do Machine learning without the maths, but you won't understand what you're doing. Do spare some time and learn maths if you want to understand machine learning in-depth. I've compiled a list of book and video resources that will help you explore the math used further. I hope you've found this article helpful. 

For a start, this [book](https://mml-book.github.io/) is a great resource published by the Cambridge University Press. The book is for people who don't have a maths degree but want to understand enough math to deploy and build ML algorithms. The book will help you master the fundamentals of mathematics and how they are used in ML. And it's free. Feel free to check it out. 

### References

1. [Mathematics for Machine Learning](https://mml-book.github.io/)
2. [Linear Algebra](https://en.wikipedia.org/wiki/Linear_algebra/)
3. [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw/)
4. [Mathematics for Machine Learning - Linear Algebra](https://www.youtube.com/playlist?list=PLiiljHvN6z1_o1ztXTKWPrShrMrBLo5P3)
5. [Mathematics for Machine Learning - Multivariate Calculus](https://www.youtube.com/playlist?list=PLiiljHvN6z193BBzS0Ln8NnqQmzimTW23)