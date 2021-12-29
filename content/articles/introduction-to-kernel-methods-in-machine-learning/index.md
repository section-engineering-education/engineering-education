### Introduction to Kernel Methods in Machine Learning

### Prerequisites
- The Reader should have basic knowledge in machine learning. [Click here](https://www.digitalocean.com/community/tutorials/an-introduction-to-machine-learning) to read more about machine learning basics.
- The reader should understand basic terms like Support Vector Machine, classifications, unsupervised learning, and supervised learning.
- It's necessary for the reader to understand SVMs since kernels are implemented in SVM models. 


## Introduction
The concept of "data drawn from some probability distribution" underpins many statistics and machine learning techniques. A probability distribution is a model for the frequency of data points, i.e., how likely it is to see a particular value, outcome, or other occurrences. The parameters of the underlying distribution are used to define parametric methods (or algorithms).


However, the assumed model for the likelihood may not be correct; the "actual" distribution may be skewed, multimodal, with different components, and so on. In general, the scientist analyzing the data is unaware of this. This article aims to demonstrate the fundamental concepts underlying kernels and their applications in statistics and machine learning.

### Tables of Content
- [Introduction](#introduction)
	- [Tables of Content](#tables-of-content)
	- [_What are kernels?_](#what-are-kernels)
	- [Unsupervised and supervised machine learning](#unsupervised-and-supervised-machine-learning)
- [Kernel methods in ML](#kernel-methods-in-ml)
		- [1. Support Vector Machine (SVM)](#1-support-vector-machine-svm)
		- [2. Adaptive Filter](#2-adaptive-filter)
		- [3. Kernel perception](#3-kernel-perception)
		- [4. Principle Component Analysis](#4-principle-component-analysis)
		- [5. Spectral clustering](#5-spectral-clustering)
- [Conclusion](#conclusion)

### _What are kernels?_
Kernels, <span style="color:purple">also known as kernel techniques or kernel functions, are a collection of distinct forms of pattern analysis algorithms.</span> Using a linear classifier, they are utilized to solve an existing non-linear problem. SVM (Support Vector Machines) use Kernels Methods in ML to solve classification and regression issues. The SVM (Support Vector Machine) employs ["Kernel Trick"](https://towardsdatascience.com/the-kernel-trick-c98cdbcaeb3f) where data is processed and an optimal boundary for the various outputs is determined.

In other words a kernel is a term used to describe a way for applying linear classifiers to non-linear problems by mapping nonlinear data onto a higher-dimensional space without having to visit or understand that higher-dimensional region.

### Unsupervised and supervised machine learning
___Supervised machine learning___ is also known as supervised learning. It is distinguished by the use of labeled datasets to train algorithms capable of accurately classifying data or predicting outcomes.

A supervised learning algorithm examines training data and generates an inferred function that can be used to map new examples.

## Kernel methods in machine learning
These are some of the many methods of kernel ;
- Support Vector Machine (SVM)
- Adaptive Filter
- Kernel Perception
- Principle Component Analysis
- Spectral Clustering

#### 1. Support Vector Machine (SVM)
It can be defined as a classifier for separating hyperplanes, in wich hyperplanes are subspaces with one dimension less than the ambient space. 

Higher dimensions make support vector machines much more difficult to interpret. It's much more difficult to imagine how the data can be separated linearly and what the decision boundary will look like. In p-dimensions, a hyperplane is a p-1 dimensional "flat" subspace that exists within the larger p-dimensional space. The hyperplane is simply a line in two dimensions.

#### 2. Adaptive Filter
It uses a linear filter that integrates the transfer function, controlled by several methods and parameters, which will be used to fine-tune these parameters in accordance with the development algorithm.

Every adaptive filter is a digital filter due to the complexity of the optimization algorithm. An adaptive filter is required for applications in which there is no prior knowledge of the desired performance or where the performance changes. As required for optimal filter operation, the cost function is applied to a flexible closed loop filter. It determines how to alter the filter transfer function in order to reduce the cost of subsequent duplication.


#### 3. Kernel perception
In machine learning, it's a variant of the popular perceptron learning algorithm used to train kernel machines. It includes non-linear classifiers that use a kernel function to calculate the similarity of unseen samples to training samples.

The majority of the kernel algorithms discussed are statistically and are based on convex optimization or eigen problems. The statistical learning theory is used to analyze their statistical properties.

Kernel methods have a wide range of applications i.e;

 - 3D reconstruction
 - bioinformatics
 - geostatistics
 - chemoinformatics
 - handwriting recognition
 - inverse distance weighting
 - information extraction

#### 4. Principle Component Analysis
Principle component analysis is a tool used to reduce data size. It allows us to reduce the size of the data without losing much of the information. PCA reduces the size by obtaining a combination of orthogonal line (key components) for real flexibility with very large variations.

The first major component captures most of the data variability. The second main part is orthogonal in the main part and captures the remaining variations, the rest of the first main part and so on. There are many principal components which are uncorrelated and organized in such a way that a few principal components define most of the actual data variations.

The kernel principal component analysis is an extension of PCA that uses kernel methods. In contrast to the standard linear PCA, the kernel variant works for a large number of attributes but becomes slow for a large number of examples.

#### 5. Spectral clustering
In the context of image classification, it's known as segmentation-based object categorization. Size reduction is performed before merging into smaller sizes in Spectral Clustering, and this is accomplished by using the eigen value matrix for data matching. Its roots can be traced back to graph theory, where this method is used to identify node communities on a graph depending on the edges that connect them. This method is sufficiently adaptable to allow us to compile data from non-graphs too.

Soft kernel spectral clustering (SKSC) uses algorithm 1 to calculate complex initial classification of training data. Next, the soft group assignments go computerized cosine distance between each point and other group prototypes in the speculative space e (l). In particular, considering the speculation of training points 

ei = [e(1)
i, ..., e(k − 1)i], 

i = 1, ...,  and the corresponding heavy assignments (q,p,i) can count on each collection prototypes collection 

s1, ..., sp, ..., sk
, sp ∈ sk − 1 

such as: sp =1np 

np∑i = 1 be (1.6)

where **np** is the number of points assigned to cluster p during the initiation step by KSC.

### Conclusion
This article is by no means exhaustive; rather, it is intended to provide the reader with a basic understanding of what a kernel method is and a brief overview of the different types of kernel methods. However, reading this article will inspire the reader to take his/her first steps into the world of ML.
A few kernel method terms and concepts in ML have been summarized .