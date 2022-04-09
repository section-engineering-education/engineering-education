---
layout: engineering-education
status: publish
published: true
url: /image-compression-using-pca/
title: Image Compression using Principal Component Analysis (PCA)
description: In this article, we will discuss PCA in detail. It is a dimensionality reduction algorithm with many applications in the field of computer vision and image processing. We will look at image compression using PCA. 
author: deewakar-chakraborty
date: 2021-08-30T00:00:00-13:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/image-compression-using-pca/hero.png
    alt: Image Compression using Principal Component Analysis (PCA) image example
---
Principal Component Analysis (PCA), is a dimensionality reduction method used to reduce the dimensionality of a dataset by transforming the data to a new basis where the dimensions are non-redundant (low covariance) and have high variance. 
<!--more-->
This tutorial aims to make the reader understand the concept of PCA mathematically by providing them with one of the use cases of PCA, image compression.

### Table of contents
- Prerequisites.
- Introduction
  -  What is Dimensionality Reduction?
  - Motivation for Dimensionality Reduction.
  - Why not care about $u_2$.
  - Correlation.
  - Desideratum.
- Principal Component Analysis(PCA)
  -  Orthogonal Transformation.
  - Covariance Matrix.
  - What do we want from the covariance matrix of transformed data?
  - Few points to ponder.
  - Principal Components.
  - Dimensionality Reduction.
- Use case: Image Compression
  - How is an image compressed?
  - Reconstructing images using less information.
- Conclusion.

### Prerequisites
The reader should have basic knowledge of linear algebra (matrix operations and their properties) and statistics. Also, readers should be familiar with few terms of linear algebra, like [basis vectors](https://en.wikipedia.org/wiki/Basis_(linear_algebra)), [vector spaces](https://en.wikipedia.org/wiki/Vector_space), [orthogonality](https://en.wikipedia.org/wiki/Orthogonality), and [covariance](https://en.wikipedia.org/wiki/Covariance). Make sure you understand these terms before going through this blog.

### Introduction
#### What is Dimensionality Reduction?
**Dimensionality**: The number of input variables or features for a dataset is referred to as its dimensionality.

> **Dimensionality reduction** is the transformation of data from a high-dimensional space into a low-dimensional space so that the low-dimensional representation retains some meaningful properties of the original data, ideally close to its intrinsic dimension (number of variables needed in a minimal representation of the data).

Dimensionality reduction refers to techniques that reduce the number of input variables in a dataset. More input features often make a predictive modeling task more challenging to model, generally referred to as the **curse of dimensionality**.

To explain the concept of dimensionality reduction, I will take an example, consider the following data where each point (vector) is represented using a linear combination of the $x$ and $y$ axes:

![first-graph](/engineering-education/image-compression-using-pca/plot-1.png)

#### Motivation for Dimensionality Reduction
Now, what if we choose a different basis?

![image2](/engineering-education/image-compression-using-pca/plot-2.JPG)

Here I have used $u_1$ and $u_2$ as a basis instead of $x$ and $y$. We can observe that all the points have a minimal component in the direction of $u_2$(almost noise). 

It seems that the same data that was initially in $R_2:(x,y)$ can now be represented in $R_1:(u_1)$ by making an intelligent choice of basis.

#### Why not care about $u_2$.
Because the variance in the data in this direction is minimal (all data points have almost the same value in the $u_2$ direction), if we were to build a classifier on top of this data, then $u_2$ would not contribute to the classifier as the points are not distinguishable along this direction. In this way, we have reduced the dimensionality.

> In general, we are interested in representing the data using fewer dimensions such that the data has higher variance along these dimensions.

#### Correlation
Data correlation is how one set of data may correspond to another set. If two columns are highly correlated (or have high covariance), one is redundant since it is linearly dependent on the other column. 

We can normalize the correlation to get the correlation coefficient. The formula for the correlation coefficient is defined as:

![Equation](/engineering-education/image-compression-using-pca/capture.jpg)

#### Requirements for Dimensionality Reduction
In general, we are interested in representing the data using fewer dimensions such that,
- The data has **high variance** along these dimensions.
- The dimensions are linearly **independent** (uncorrelated).
- If we want to reduce dimensions by transforming the data into a new basis, the resulting basis should be **orthogonal**.

### Principal Component Analysis (PCA)
> **Principal Component Analysis (PCA)** is a statistical procedure that uses an orthogonal transformation that converts a set of correlated variables to a set of uncorrelated variables.

To explain the concept of PCA mathematically, I will go over an example:

### Orthogonal transformation
#### Assumptions 
Let $p_1$, $p_2$, $p_3$,....,$p_n$ be a set of $n$ orthonormal vectors. Let $p$ be a square matrix of order $n$ such that $p_1$, $p_2$, $p_3$,....,$p_n$ are the columns of matrix $p$.

Let $x_1$, $x_2$, $x_3$,.....,$x_n$ $\in$ $R^n$ be n data points and let $X$ be a square matrix such that $x_1$, $x_2$, $x_3$,.....,$x_n$ are the rows of a matrix 

(Assumption: Data is zero-mean and unit variance), we will go over why we have this assumption at a later part.

#### Transformation
Suppose we want to represent $x_i$ using the new basis $P$.

$x_i = \alpha_{i1}p_1 + \alpha_{i2}p_2 + ....... + \alpha_{in}p_n$

As we have assumed $P$ as an orthonormal basis, for an orthonormal basis, we can find $\alpha_i$ using, $\alpha_{ij} = x_i^T p_j$ .

In general, the transformed data $x_i'$ is given by $x_i'  =  x_i^T P$ , thus the transformed matrix will be given as:

$X' = XP$

#### Covariance matrix ( $\Sigma$ )
If $X$ is a matrix with zero mean, then $\Sigma = 1/m*(X'^T X)$ is the covariance matrix. In other words, $\Sigma_{ij}$ stores the covariance between columns $i$ and $j$ of $X$.

**Explanation**: Let $C$ be the covariance matrix of $X$. Let $\mu_i$ and $\mu_j$ denote the means of $i^{th}$ and $j^{th}$ column of $X$, respectively. 

Then by the definition of covariance, we can write:

$C_{ij}$ = $1/m*$ $\Sigma_{k=1}^m$ ($X_{ki}$-$\mu_i$)($X_{kj}$-$\mu_j$)

$C_{ij}$ = $1/m*$ $\Sigma_{k=1}^m$ $X_{ki}X_{kj}$ (&because; $\mu_i$ = $\mu_j$ = 0) 

$C_{ij}$ = $1/m*$ $X^T_i X_j$  = <b>$1/m*$$(X^TX)_{ij}$ 

So far we know that,

**$X' = XP$<**

Covariance matrix of transformed data can be written as: 

$=1/m *$ $X'^TX'$                                                                                                                                                                                         

$=1/m * (XP)^T XP$                                                                                                                                                                                     

$=1/m * P^T X^T XP$                                                                                                                                                                          

$=1/m * P^T (X^T X)P$                                                                                                                                                                               

$=P^T( 1/m*( X^T X)) P$                                                                                                                                                                                 

$=P^T \Sigma P$ 

#### What do we want from the covariance matrix of transformed data?

Ideally we want,
- $(1/m * X'^T X')_{ij} = 0$    if i $\ne$	 j     (Covariance $=$ 0)
- $(1/m * X'^T X')_{ij}  \ne 0$         if  i $=$ j    (Variance $=$ 0)           

​In other words, we want $P^T \Sigma P = D$ (where $D$ is a diagonal matrix).

#### Few points to ponder
- $X^TX$  is symmetrical.
- It will have distinct non-negative eigenvalues, and thus, linearly independent eigenvectors.                           
- Eigenvectors of a symmetric matrix are orthogonal, which can be turned into an orthonormal basis.                                        

#### Principal components
Now we know that $\Sigma$ is a symmetric matrix, and the eigenvectors of $\Sigma$ can be used as a suitable orthonormal basis. From the [Diagonalization of matrix](https://math.okstate.edu/people/binegar/3013-S99/3013-l16.pdf) principle, we can say that to make $P^T \Sigma P$ a diagonal matrix, $P$ will be the matrix of eigenvectors of the matrix $\Sigma$. 

Now we can perform orthonormal transformation:

$x_i = \Sigma^n_{j=1}  (\alpha_{ij}p_j)$

The $n$ orthogonal eigenvectors $p_j$ are the **Principal Components**.

#### Dimensionality reduction
As discussed already, we want to retain uncorrelated dimensions that have a maximum variance. Therefore for dimensionality reduction, we will sort the eigenvectors according to eigenvalues in descending order and keep top $k$ eigenvectors to represent $x_i$:

$x_i' = \Sigma^k_{j=1} \alpha_{ij}p_j$

Where $x_i'$ is a reconstructed vector with $k$ dimensions, earlier we were using $n$ dimensions to represent it. Hence the dimensionality is being reduced.

### Use case: Image compression
(**For illustration, I have used the Olivetti dataset, available at**: https://www.kaggle.com/imrandude/olivetti)

Consider we are given a large number of images of human faces (for this dataset, we have $400$ images), each image is $64\times64$(<b>$4096$ dimensions). 

Now, we would like to represent and store the images using much fewer dimensions(say $100$ dimensions).

```python
# Importing necessary libraries
import numpy as np
import matplotlib.pyplot as plt
from numpy import linalg as LA

dirname = '/content/gdrive/My Drive/Kaggle'
fileName = 'olivetti_faces.npy'
faces = np.load(os.path.join(dirname,fileName))
```

Let us see a sample image from the dataset.

```python
plt.imshow(faces[1], cmap='gray')
plt.axis('off')
```

![face-1](/engineering-education/image-compression-using-pca/face1.png)

Let's see what the average of all images looks like:

```python
avgFace = np.average(faces, axis=0)
plt.imshow(avgFace, cmap='gray')
plt.axis('off')
```

![face-2](/engineering-education/image-compression-using-pca/face2.png)

First, we will make all our images zero centered, subtracting the average image from each image in the matrix for zero centering.

```python
X = faces
X = X.reshape((X.shape[0], X.shape[1]**2)) #flattening the image 
X = X - np.average(X, axis=0) #making it zero centered

#printing a sample image to show the effect of zero centering
plt.imshow(X[0].reshape(64,64), cmap='gray')
plt.axis('off')
```

![face-3](/engineering-education/image-compression-using-pca/face3.png)

Now, after making the images zero-centered, we will calculate the covariance matrix.

```python
cov_mat = np.cov(X, rowvar = False)

#now calculate eigen values and eigen vectors for cov_mat
cov_mat = np.cov(X, rowvar = False)

#sort the eigenvalues in descending order
sorted_index = np.argsort(eigen_values)[::-1]
 
sorted_eigenvalue = eigen_values[sorted_index]
#similarly sort the eigenvectors 
sorted_eigenvectors = eigen_vectors[:,sorted_index]
```

Initially, the image had $4096$ dimensions. Let's reduce the dimension from $4096$ to $100$.

```python
n_components = 100
eigenvector_subset = sorted_eigenvectors[:,0:n_components]
print(eigenvector_subset.shape)
```

![snippet](/engineering-education/image-compression-using-pca/image.JPG)

These $100$ dimensions are the **Principal Components**. Now, as we can see, the shape of eigenvector_subset is $(4096,100)$. If represented as a $64 \times 64$ image after performing transpose on this matrix, we can get $100$ such images. 

These $100$ images will be called **Eigenfaces**, and one can represent any image as a linear combination of these $100$ images.

Let's print first $16$ eigenfaces.

```python
fig = plt.figure(figsize=[25,25])
for i in range(16):
  if(i%4==0):
  fig.add_subplot(4,4,i+1)
  plt.imshow(eigenvector_subsetT[i].reshape(64,64) , cmap= 'gray')
  plt.axis('off')
plt.show()
```

![eigenfaces](/engineering-education/image-compression-using-pca/face5.png)

#### How is the image compressed?
Initially, the image had dimensions of $4096$. Let's reduce the dimension from $4096$ to $100$.

```python
x_reduced = np.dot(eigenvector_subset.transpose(),X.transpose()).transpose()
print(x_reduced.shape)
```

![snippet](/engineering-education/image-compression-using-pca/image2.JPG)

Earlier, to store $400$ images, we required a $400 \times 4096$ matrix. We need to store $400 \times 100$ matrix for x_reduced and $4096 \times 100$ matrix for storing principal components. 

As the image is gray-scale, let's suppose it requires $2$ bits to store each pixel of an image. Therefore, after compressing the image, we will be able to save:

$=((400\times4096)\times2) ] - ((400\times100)+(4096\times100))\times2$                                                                                                                                 

$=2377600$ bits                                                                                                                                                                                                                              

$=297200$ bytes                                                                                                                                                                                                     

$\approx 290$ KB

For our example, the images were gray-scale and had a low resolution; that is why we could save only $290$ KB. On the other hand, suppose images have very high resolution with more than one channel, then one can use this method to save lots of space.

#### Reconstructing images using less information

```python
# Reconstructing the first image
temp= np.matmul(eigenvector_subset,x_reduced[1])
temp.shape
temp=temp.real
plt.imshow(temp.reshape(64,64) , cmap= 'gray')
plt.axis('off')
```

**Reconstructed Image:**

![face-6](/engineering-education/image-compression-using-pca/face6.png)

**Original Image:**

![face-1](/engineering-education/image-compression-using-pca/face1.png)

### Conclusion
As we have seen in this tutorial, using the concept of PCA, we have compressed the images and stored the eigenfaces. And to retain the image, we reconstruct it using the stored eigenfaces. 

But we have to note that there is extra calculation overhead for reconstructing the image (matrix multiplication), and also, there will be some reconstruction error. The greater the number of eigenfaces lesser is the reconstruction error.

Happy coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)


<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });
    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>
