---
layout: engineering-education
status: publish
published: true
url: /introduction-to-kernel-methods-in-machine-learning/
title: Introduction to Kernel Methods in Machine Learning 
description: In this tutorial, we will learn about kernel methods in machine learning and how to use them to solve classification and regression problems.
author: brian-kiplangat
date: 2022-02-23T00:00:00-11:11
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-kernel-methods-in-machine-learning/hero.png
    alt: Kernel Methods in Machine Learning Hero Image
---
The concept of ***data drawn from some probability distribution*** underpins many statistics and machine learning techniques. 
<!--more-->
A probability distribution is a function defining all potential values and probabilities for a random variable in a specified range. The parameters of the underlying distribution are used to define parametric methods (or algorithms).

However, the assumed model for the likelihood may not be correct; the "actual" distribution may be skewed, multimodal, with different components, and so on. In general, the scientist analyzing the data is unaware of this. This article aims to demonstrate kernels' fundamental concepts and it's application in statistics and machine learning.

### Tables of content
- [Prerequisites](#prerequisites)
- [What are kernels?](#what-are-kernels)
	- [Unsupervised and supervised machine learning](#unsupervised-and-supervised-machine-learning)
- [Kernel methods in machine learning](#kernel-methods-in-machine-learning)
	- [1. Support Vector Machine (SVM)](#1-support-vector-machine-svm)
	- [2. Adaptive Filter](#2-adaptive-filter)
	- [3. Kernel perception](#3-kernel-perception)
	- [4. Principle Component Analysis (PCA)](#4-principle-component-analysis-pca)
	- [5. Spectral clustering](#5-spectral-clustering)
- [Conclusion](#conclusion)

### Prerequisites
- The Reader should have basic knowledge of [machine learning](https://www.section.io/engineering-education/topic/machine-learning/).
- The reader should understand basic terms like Support Vector Machine, Classifications, Unsupervised Learning, and Supervised Learning.
- It's necessary for the reader to understand SVMs since kernels are implemented in SVM models. 

### What are kernels?
Kernels, also known as kernel techniques or kernel functions, are a collection of distinct forms of pattern analysis algorithms, using a linear classifier, they solve an existing non-linear problem. SVM (Support Vector Machines) uses Kernels Methods in ML to solve classification and regression issues. The SVM (Support Vector Machine) employs ["Kernel Trick"](https://towardsdatascience.com/the-kernel-trick-c98cdbcaeb3f) where data is processed, and an optimal boundary for the various outputs is determined.

In other words, a kernel is a term used to describe applying linear classifiers to non-linear problems by mapping non-linear data onto a higher-dimensional space without having to visit or understand that higher-dimensional region.

### Unsupervised and supervised machine learning
***Supervised machine learning*** also known as supervised learning. It is distinguished by using labelled datasets to train algorithms that accurately classify data or predict outcomes. A supervised learning algorithm examines training data and generates an inferred function that we can use to map new examples.

***Unsupervised machine learning*** also known as unsupervised learning. It examines unlabeled datasets using ML algorithms, unsupervised learning main subgroup is known as clustering.  

### Kernel methods in machine learning
These are some of the many techniques of the kernel:
- Support Vector Machine (SVM)
- Adaptive Filter
- Kernel Perception
- Principle Component Analysis
- Spectral Clustering

#### 1. Support Vector Machine (SVM)
It can be defined as a classifier for separating hyperplanes, in which hyperplanes are subspaces with one dimension less than the ambient space. Higher dimensions make support vector machines much more challenging to interpret. 

It's more difficult to imagine how we can separate the data linearly and the decision boundary. In p-dimensions, a hyperplane is a p-1 dimensional "flat" subspace within the larger p-dimensional space. The hyperplane is simply a line in two dimensions.

#### 2. Adaptive Filter
It uses a linear filter that integrates the transfer function, controlled by several methods and parameters, which we will use to fine-tune these parameters per the development algorithm.
Every adaptive filter is a digital filter due to the complexity of the optimization algorithm. 

An adaptive filter is required for applications with no prior knowledge of the desired performance or where the implementation changes. The cost function is applied to a flexible closed-loop filter as needed for optimal filter operation. It determines how to alter the filter transfer function to reduce the cost of subsequent duplication.

#### 3. Kernel perception
In machine learning, it's a variant of the popular perceptron learning algorithm used to train kernel machines. It includes non-linear classifiers that use a kernel function to calculate the similarity of unseen samples to training samples.

Most of the kernel algorithms discussed are statistically based on convex optimization or eigenproblems. Therefore, the statistical learning theory is used to analyze their statistical properties.

Kernel methods have a wide range of applications:
- 3D reconstruction
- Bioinformatics
- Geostatistics
- Chemoinformatics
- Handwriting recognition
- Inverse distance weighting
- Information extraction

#### 4. Principle Component Analysis (PCA)
Principle component analysis is a tool used to reduce data size. It allows us to reduce the size of the data without losing much of the information. PCA reduces the size by obtaining a combination of orthogonal lines (key components) for real flexibility with very large variations.
The first major component captures most of the data variability. 

The second main part is orthogonal in the main part and captures the remaining variations, the rest of the first main part, and so on. Many principal components are uncorrelated and organized so that a few principal components define most of the actual data variations.
The kernel principal component analysis extends PCA that uses kernel methods. In contrast to the standard linear PCA, the kernel variant works for a large number of attributes but becomes slow for a large number of examples.

#### 5. Spectral clustering
In the context of image classification, it's known as segmentation-based object categorization. Size reduction is performed before merging into smaller sizes in Spectral Clustering, and this is accomplished by using the eigenvalue matrix for data matching. 

Its roots can be traced back to graph theory, where this method is used to identify node communities on a graph depending on the edges that connect them. This method is sufficiently adaptable to allow us to compile data from non-graphs too.

Soft kernel spectral clustering (SKSC) uses algorithm 1 to calculate complex initial classification of training data. Next, the soft group assignments go calculate cosine distance between each point and other group prototypes in the speculative space e (l). In particular, considering the speculation of training points.

ei = [e(1)
i, ..., e(k − 1)i], 

i = 1, ...,  and the corresponding heavy assignments (q,p,i) can count on each collection prototypes collection 

s1, ..., sp, ..., sk
, sp ∈ sk − 1 

such as: sp =1np 

np∑i = 1 be (1.6)

where `np` is the number of points assigned to cluster `p` during the initiation step by KSC.

### Conclusion
This article is not exhaustive; rather, it is intended to provide the reader with a basic understanding of what a kernel method is and a brief overview of the different types of kernel methods. However, reading this article will inspire the reader to take their first step into the world of Machine Learning (ML).

Happy learning!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
