# Introduction to Kernel Methods in Machine Learning

### Prerequisites
- The Reader should have basic knowledge in machine learning. [Click here](https://www.digitalocean.com/community/tutorials/an-introduction-to-machine-learning) to read more about machine learning basics.
- The reader should understand basic terms like Support Vector Machine, classifications, unsupervised learning, and supervised learning.
- Before digging deeper into the operation of Kernel Methods, it is necessary first to understand support vector machines or SVMs, because kernels are implemented in SVM models.


## Introduction
The concept of "data drawn from some probability distribution" underpins many statistics and machine learning techniques. A probability distribution is a model for the frequency of data points, i.e., how likely it is to see a particular value, outcome, or other occurrences. The parameters of the underlying distribution are used to define parametric methods (or algorithms).


However, the assumed model for the likelihood may not be correct; the "actual" distribution may be skewed, multimodal, with different components, and so on. In general, the scientist analyzing the data is unaware of this. This article aims to demonstrate the fundamental concepts underlying kernels and their applications in statistics and machine learning.

### Tables of Content
- [What are kernels?](#what-are-kernels?)
- [Supervised and unsupervised machine learning](#supervised-and-unsupervised-machine-learning)
- [Kernel methods in machine learning](#kernel-methods-in-machine-learning)
- [Conclusion](#conclusion)

### _What are kernels?_
Kernels, <span style="color:blue">also known as kernel techniques or kernel functions, are a collection of distinct forms of pattern analysis algorithms.</span> Using a linear classifier, they are utilized to solve a non-linear problem. SVM (Support Vector Machines) use Kernels Methods to solve classification and regression issues. The SVM (Support Vector Machine) employs a technique known as the ["Kernel Trick"](https://towardsdatascience.com/the-kernel-trick-c98cdbcaeb3f) in which the data is processed and an optimal boundary for the various outputs is determined.

In other words a kernel is a term used to describe a way for applying linear classifiers to non-linear problems by mapping nonlinear data onto a higher-dimensional space without having to visit or understand that higher-dimensional region.

### __Supervised and unsupervised machine learning__
___Supervised machine learning___ is also known as supervised learning. It is distinguished by the use of labeled datasets to train algorithms capable of accurately classifying data or predicting outcomes.

A supervised learning algorithm examines training data and generates an inferred function that can be used to map new examples.

## Kernel methods in machine learning
There are some of the many methods of kernel and they include;
- Support Vector Machine (SVM)
- Adaptive Filter
- Kernel Perception
- Principle Component Analysis
- Spectral Clustering

### 1. Support Vector Machine (SVM)
SVM can be simply defined as a classifier for separating hyperplanes, where hyperplanes are subspaces with one dimension less than the ambient space. The dimension of this mathematical space is defined as the smallest quantity of coordinates needed to specify any point, whereas the ambient space is the space that surrounds the mathematical object. A mathematical object is now understood to be an abstract object which does not exist at any time or place but exists as a sort of thing.

Higher dimensions make support vector machines much more difficult to interpret. It's much more difficult to imagine how the data can be separated linearly and what the decision boundary will look like. In p-dimensions, a hyperplane is a p-1 dimensional "flat" subspace that exists within the larger p-dimensional space. The hyperplane is simply a line in two dimensions. A hyperplane is a regular two-dimensional plane in three dimensions.

### 2. Adaptive Filter
The adaptive filter uses a linear filter that integrates the transfer function, controlled by various parameters and methods, which will be used to adjust these parameters as per the development algorithm. 

Every adaptive filter is a digital filter mainly because of the complexity of this optimization algorithm . An adaptive filter is required for those applications where there is no prior information about the performance you want in advance or changes. The cost function is applied to a flexible closed loop filter, as necessary for optimal filter operation. It decides how to change the filter transfer function to reduce the cost of subsequent duplication.


### 3. Kernel perception
The kernel perceptron is a variant of the popular perceptron learning algorithm for learning kernel machines in machine learning. It contains non-linear classifiers that use a kernel function to compute the similarity of unseen samples to training samples.

The majority of the kernel algorithms discussed are statistically sound and are based on convex optimization or eigen problems. The statistical learning theory is used to analyze their statistical properties.

Kernel methods have a wide range of applications, including;
- 3D reconstruction
- bioinformatics
- geostatistics
- chemoinformatics
- kriging
- handwriting recognition
- inverse distance weighting
- information extraction

### 4. Principle Component Analysis
Principle component analysis is a tool used to reduce data size. It allows us to reduce the size of the data without losing much of the information. PCA reduces the size by obtaining a combination of orthogonal line (key components) for real flexibility with very large variations.
The first major component captures most of the data variability. The second main part is orthogonal in the main part and captures the remaining variations, the rest of the first main part and so on. There are many principal components which are uncorrelated and organized in such a way that a few principal components define most of the actual data variations.

Kernel principal component analysis is an extension of PCA that uses kernel methods. In contrast to the standard linear PCA, the kernel variant works for a large number of attributes but becomes slow for a large number of examples.

### 5. Spectral clustering
Spectral clustering is known as segmentation-based object categorization in the use of image classification. In Spectral Clustering, size reduction is done before merging into smaller sizes, this is done using the eigen value matrix for data matching. It has its roots in graph theory, where this method is used to identify node communities on a graph based on the edges they connect. This method is flexible enough and allows us to compile data from non-graphs as well.

Soft kernel spectral clustering (SKSC) uses algorithm 1 to calculate complex initial classification of training data. Next, the soft group assignments go
computerized cosine distance between each point and other group prototypes in the speculative space e
(l)
. In particular, considering the speculation of training points ei = [e
(1)
i
, ..., e
(k − 1)
i
], i = 1, ..., Ntr and the corresponding heavy assignments q
p
i can count on each collection prototypes collection
s1, ..., sp, ..., sk
, sp ∈ R
k − 1
such as:
sp =
1
np
np
∑
i = 1
be (1.6)
where np is the number of points assigned to cluster p during the initiation step
by KSC.

### __Conclusion__
This article is by no means exhaustive; rather, it is intended to provide you with a basic understanding of what a kernel method is and a brief overview of the different types of kernel methods. However, reading this article will prompt you to take your first step into the field of Machine Learning.
Some of the terminologies and types of kernel methods in Machine Learning have been summarized.



































































