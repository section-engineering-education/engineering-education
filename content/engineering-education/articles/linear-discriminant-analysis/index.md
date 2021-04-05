---
layout: engineering-education
status: publish
published: true
url: /engineering-education/linear-discriminant-analysis/
title: Linear Discriminant Analysis from Scratch
description: In this article we will look at Linear Discriminant Analysis (LDA) theoretical concepts and look at its implementation from scratch using NumPy.
author: lalithnarayan-c
date: 2020-11-25T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/linear-discriminant-analysis/hero.jpg
    alt: Linear Discriminant Analysis example image
---
In this tutorial, we will look into the algorithm Linear Discriminant Analysis, also known as LDA. One should be careful while searching for LDA on the net. We also abbreviate another algorithm called Latent Dirichlet Allocation as LDA. 
<!--more-->
Linear Discriminant Analysis(LDA) is a supervised learning algorithm used as a classifier and a dimensionality reduction algorithm. We will look at LDA's theoretical concepts and look at its implementation from scratch using NumPy. 

Let's get started.

### Prerequisites
- [Theoretical Foundations for Linear Discriminant Analysis](https://www.isip.piconepress.com/publications/reports/1998/isip/lda/lda_theory.pdf)
- [Use of LDA in dimensionality reduction](https://machinelearningmastery.com/linear-discriminant-analysis-for-dimensionality-reduction-in-python/)

### Installation
We will install the packages required for this tutorial in a virtual environment. We’ll use conda to create a virtual environment. For more installation information, refer to the [Anaconda Package Manager website](https://www.anaconda.com/products/individual).

Create a new virtual environment by typing the command in the terminal. Perform this after installing anaconda package manager using the instructions mentioned on Anaconda’s website.

`conda create -n lda python=3.6`

This will create a virtual environment with Python 3.6.

We'll be installing the following packages:

1. [matplotlib](https://matplotlib.org/)
2. [sklearn](https://scikit-learn.org/)
3. [numpy](https://numpy.org/)

Activate the virtual environment using the command, `conda activate lda`. After activating the virtual environment, we’ll be installing the above mentioned packages locally in the virtual environment. To use these packages, we must always activate the virtual environment named `lda` before proceeding. If you choose to, you may replace `lda` with a name of your choice for the virtual environment.

To install the packages, we will use the following commands:

1. **matplotlib**: `pip3 install matplotlib`
2. **numpy**: `pip3 install numpy`
3. **sklearn**: `pip3 install sklearn`

Once installed, the following code can be executed seamlessly. 

### Introduction
In some cases, the dataset's non-linearity forbids a linear classifier from coming up with an accurate decision boundary. Therefore, one of the approaches taken is to project the lower-dimensional data into a higher-dimension to find a linear decision boundary. Consider the following example taken from [Christopher Olah's blog](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/).

![spiral data](/engineering-education/linear-discriminant-analysis/spiral_data.gif)

The other approach is to consider features that add maximum value to the process of modeling and prediction. If any feature is redundant, then it is dropped, and hence the dimensionality reduces. LDA is one such example. 

It's a supervised learning algorithm that finds a new feature space that maximizes the class's distance. The higher the distance between the classes, the higher the confidence of the algorithm's prediction. 

The purpose for dimensionality reduction is to:
- Obtain the most critical features from the dataset. 
- Visualize the dataset
- Have efficient computation with a lesser but essential set of features: Combats the "curse of dimensionality".

Let's say we are given a dataset with n-rows and m-columns.  Where `n` represents the number of data-points, and `m` represents the number of features. `m` is the data point's dimensionality. 

Assuming the target variable has `K` output classes, the LDA algorithm reduces the number of features to `K-1`. Hence, the number of features change from `m` to `K-1`.  

The aim of LDA is:
- **Minimize the Inter-Class Variability**: Inter-class variability refers to including as many similar points as possible in one class. This ensures less number of misclassifications. 
- **Maximize the Distance Between the Mean of Classes**: The classes' mean is placed as far as possible to ensure high confidence during prediction.

Below is a picture to help explain:

![LDA](/engineering-education/linear-discriminant-analysis/lda.png)

[*Image Source*](https://www.bogotobogo.com/python/scikit-learn/scikit_machine_learning_Data_Compresssion_via_Dimensionality_Reduction_2_Linear_Discriminant_Analysis.php)

The data-points are projected onto a lower-dimensional hyper-plane, where the above two objectives are met. In the example given above, the number of features required is 2. The scoring metric used to satisfy the goal is called Fischer's discriminant. 

The Fischer score is given as:

Fischer Score f(x) = (difference of means)^2/ (sum of variances). 

We're maximizing the Fischer score, thereby maximizing the distance between means and minimizing the inter-class variability. 

### Code 
Let's consider the code needed to implement LDA from scratch. 

We'll begin by defining a class `LDA` with two methods:

1. `__init__`: In the `__init__` method, we initialize the number of components desired in the final output and an attribute to store the eigenvectors.

2. `transform`:  We'll consider Fischer's score to reduce the dimensions of the input data. The Fischer score is computed using covariance matrices. The formula mentioned above is limited to two dimensions. We'll be coding a multi-dimensional solution. Therefore, we'll use the covariance matrices. The matrices `scatter_t`, `scatter_b`, and `scatter_w` are the covariance matrices. `scatter_w` matrix denotes the intra-class covariance and `scatter_b` is the inter-class covariance matrix. `scatter_t` covariance matrix represents a temporary matrix that's used to compute the `scatter_b` matrix. 

Using the scatter matrices computed above, we can efficiently compute the eigenvectors. The eigenvectors obtained are then sorted in descending order. The first `n_components` are selected using the slicing operation. If `n_components` is equal to 2, we plot the two components, considering each vector as one axis.

Finally, we load the iris dataset and perform dimensionality reduction on the input data. Then, we use the plot method to visualize the results. 

```py
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

class LDA:
    def __init__(self, n_components=None):
        self.n_components = n_components
        self.eig_vectors = None
    
    def transform(self,X,y):
        height, width = X.shape
        unique_classes = np.unique(y)
        num_classes = len(unique_classes)

        scatter_t = np.cov(X.T)*(height - 1)
        scatter_w = 0
        for i in range(num_classes):
            class_items = np.flatnonzero(y == unique_classes[i])
            scatter_w = scatter_w + np.cov(X[class_items].T) * (len(class_items)-1)
        
        scatter_b = scatter_t - scatter_w
        _, eig_vectors = np.linalg.eigh(np.linalg.pinv(scatter_w).dot(scatter_b))
        print(eig_vectors.shape)
        pc = X.dot(eig_vectors[:,::-1][:,:self.n_components])
        print(pc.shape)

        if self.n_components == 2:
            if y is None:
                plt.scatter(pc[:,0],pc[:,1])
            else:
                colors = ['r','g','b']
                labels = np.unique(y)
                for color, label in zip(colors, labels):
                    class_data = pc[np.flatnonzero(y==label)]
                    plt.scatter(class_data[:,0],class_data[:,1],c=color)
            plt.show()
        return pc

LDA_obj = LDA(n_components=2)
data = load_iris()
X, y = data.data, data.target
X_train, X_test, Y_train, Y_test = train_test_split(X, y, test_size=0.2)

LDA_object = LDA(n_components=2)
X_train_modified = LDA_object.transform(X_train, Y_train)

print("Original Data Size:",X_train.shape, "\nModified Data Size:", X_train_modified.shape)
```
The output of the code should look like the image given below. The iris dataset has 3 classes. Observe the 3 classes and their relative positioning in a lower dimension.

![output of code](/engineering-education/linear-discriminant-analysis/output.jpg)

### Conclusion
In this article, we have looked at implementing the Linear Discriminant Analysis (LDA) from scratch. I suggest you implement the same on your own and check if you get the same output. Another fun exercise would be to implement the same algorithm on a different dataset. I hope you enjoyed reading this tutorial as much as I enjoyed writing it. Happy learning.

Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
