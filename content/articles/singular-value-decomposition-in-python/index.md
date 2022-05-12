---
layout: engineering-education
status: publish
published: true
url: /singular-value-decomposition-in-python/
title: Getting Started with Singular Value Decomposition in Python
description: In this article the reader will understand the concept of Singular Value Decomposition and implement it using Python.
author: faith-mwangangi
date: 2021-12-28T00:00:00-09:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/singular-value-decomposition-in-python/hero.jpg
   alt: Singular Value Decomposition Image
---
Singular Value Decomposition (SVD) is a powerful technique widely used in solving dimensionality reduction problems. This algorithm works with a data matrix of the form, `m x n`, i.e., a rectangular matrix. 
<!--more-->
The idea behind the SVD is that a rectangular matrix can be broken down into a product of three other matrices that are easy to work with. This decomposition is of the form as the one shown in the formula below:

$A=U \Sigma V^T$

Where:
- A is our m x n data matrix we are interested in decomposing.
- U is an m x m orthogonal matrix whose bases are orthonormal.
- $\Sigma$ is an m x n diagonal matrix.
- $V^T$ is the transpose of an orthogonal matrix.

### Prerequisites
To understand this material, the reader will need to have a good understanding of:
- Eigenvalues and Eigenvectors.
- Gram-Schmidt Process.
- Vector Orthogonality and Orthonormality.
- Basic knowledge of working with matrices in Python.

### Introduction
Suppose we have an `m x n` rectangular matrix A, then we can break it down into an m x m orthonormal matrix U, `m x n` diagonal matrix $\Sigma$, and an `n x n` orthonormal matrix $V^T$.

Using the data matrix A, we can compute its SVD, i.e., matrices U, $\Sigma$ and $V^T$ as follows:

$U = AA^T$
Columns of U are orthonormal eigenvectors of $AA^T$ and are called the left singular vectors of A.
$V = A^TA$
Columns of V are orthonormal eigenvectors of $A^TA$ and are called the right singular vectors of A.

The matrix $\Sigma$ is a diagonal matrix whose values are square roots of eigenvalues of the matrix U or V in decreasing order. These diagonal entries of matrix $\Sigma$ are called the singular values.

To reinforce our understanding of the above discussion, consider the following example. Suppose we are given the matrix A as follows:

$A= \begin{bmatrix}
    3&1&1\\
    -1&3&1
\end{bmatrix}$

We are required to obtain its Singular Value Decomposition (SVD).

*Solution*
Using our matrix A, let us obtain our three matrices of SVD.

1. We shall first find the matrix U.

$AA^T=\begin{bmatrix}
    3&1&1\\
    -1&3&1
\end{bmatrix} \begin{bmatrix}
    3&-1\\
    1&3\\
    1&1
\end{bmatrix}=\begin{bmatrix}
    11&1\\
    1&1
\end{bmatrix}$

Eigenvalues of matrix $AA^T$ are:

$ \lambda_1= 10$

$\lambda_2=12$
The Eigenvectors corresponding to the above eigenvalues are:

$\vec u_1=\begin{bmatrix}
    1\\
    1
\end{bmatrix}$
,and 

$\vec u_2=\begin{bmatrix}
    1\\
    -1
\end{bmatrix}$

Since we do not know whether the following vectors are orthogonal, let us apply Gram-Schmidt to them and transform them to end up with an orthonormal matrix.

### Gram-Schimidt process
In this article, we shall outline how the Gram-Schmidt process works on a matrix and not dive deep into what it is. You can attend this [lecture](https://www.youtube.com/watch?v=zHbfZWZJTGc) if you need to learn more about the Gram-Schmidt algorithm.

$\vec v_1=\vec u_1$

$\vec w= \frac{\vec v_1}{|\vec v_1|}=\begin{bmatrix}
    \frac{1}{\sqrt 2}\\
    \frac{1}{\sqrt 2}
\end{bmatrix}$

**$\vec v_2=\vec u_2-\frac{<\vec u_2,\vec v_1>}{<\vec v_1,\vec v_1>}\vec v_1$**

$\vec v_2=\begin{bmatrix}
    1\\
    -1
\end{bmatrix}-0\begin{bmatrix}
    1\\
    1
\end{bmatrix}=\begin{bmatrix}
    1\\
    -1
\end{bmatrix}-\begin{bmatrix}
    0,
    0
\end{bmatrix}=\begin{bmatrix}
    1\\
    -1
\end{bmatrix}$


**$\vec w_2= \frac{\vec v_2}{|\vec v_2|}=\begin{bmatrix}
    \frac{1}{\sqrt 2},
    -\frac{1}{\sqrt 2}
\end{bmatrix}$**

Therefore;
$U=\begin{bmatrix}
    \frac{1}{\sqrt 2}&\frac{1}{\sqrt 2}\\
    \frac{1}{\sqrt 2}&-\frac{1}{\sqrt 2}\\
\end{bmatrix}$

Now that we have our matrix U values, we can also compute matrix V.

The matrix V is an orthonormal matrix of:

$A^TA=\begin{bmatrix}
    3&-1\\
    1&3\\
    1&1
\end{bmatrix}\begin{bmatrix}
    3&1&1\\
    -1&3&1
\end{bmatrix}=\begin{bmatrix}
    10&0&2\\
    0&10&4\\
    2&4&2
\end{bmatrix}$

We then find the eigenvalues and afterward eigenvectors corresponding to each determined eigenvalue. If we determine eigenvalues for this 3x3 matrix, they will be as follows:

$\lambda_1=12$, $\lambda_2=10$, and $\lambda_3=0$
The respective eigenvector for the above $\lambda$ values are:

$\vec u_1=\begin{bmatrix}
    1\\
    2\\
    1
\end{bmatrix}$

$\vec u_2=\begin{bmatrix}
    2\\
    -1\\
     0
\end{bmatrix}$

$\vec u_3=\begin{bmatrix}
    1\\
    2\\
    -5
\end{bmatrix}$

Again, just as we did to obtain matrix U, we shall repeat the same steps until we obtain our matrix V. Since, in our singular decomposition, we need a matrix $V^T$, we shall then take the transpose of our orthonormal matrix V. So, using the Gram-Schmidt process:

$\vec v_1=\vec u_1$

$\vec w_1= \frac{\vec v_1}{|\vec v_1|}=\begin{bmatrix}
    \frac{1}{\sqrt 6},
    \frac{2}{\sqrt 6},
    \frac{1}{\sqrt 6}
\end{bmatrix}$

$\vec v_2=\vec u_2-\frac{<\vec u_2,\vec v_1>}{<\vec v_1,\vec v_1>}\vec v_1$

$\vec v_2=\begin{bmatrix}
    2,
   -1,
    0
\end{bmatrix}$


$\vec w_2= \frac{\vec v_2}{|\vec v_2|}=\begin{bmatrix}
    \frac{2}{\sqrt 5},
    -\frac{1}{\sqrt 5},
    0
\end{bmatrix}$

**$\vec v_3=\vec u_3-\frac{<\vec u_3,\vec v_1>}{<\vec v_1,\vec v_1>}\vec v_1-\frac{<\vec u_3,\vec v_2>}{<\vec v_2,\vec v_2>}\vec v_2=\begin{bmatrix}
    -\frac{2}{3},
    -\frac{2}{3},
    \frac{10}{3}
\end{bmatrix}$**

$\vec w_3= \frac{\vec v_3}{|\vec v_3|}=\begin{bmatrix}
    \frac{1}{\sqrt 30},
    \frac{2}{\sqrt 30},
    -\frac{5}{\sqrt 30}
\end{bmatrix}$

Therefore:
$V=\begin{bmatrix}
    \frac{1}{\sqrt6}&\frac{2}{\sqrt 5}&\frac{1}{\sqrt 30}\\
    \frac{2}{\sqrt 6}&-\frac{1}{\sqrt 5}&\frac{2}{\sqrt 30}\\
    \frac{1}{\sqrt 6}&0&-\frac{5}{\sqrt 30}\\
\end{bmatrix}$

$V^T=\begin{bmatrix}
    \frac{1}{\sqrt 6}&\frac{2}{\sqrt 6}&\frac{1}{\sqrt 6}\\
    \frac{2}{\sqrt 5}&-\frac{1}{\sqrt 5}&0\\
    \frac{1}{\sqrt 30}&\frac{2}{\sqrt 30}&-\frac{5}{\sqrt 30}
\end{bmatrix}$

Finally, our Singular Value Decomposition (SVD) of A given as $U\Sigma V^T$ is as follows; our matrix A can be expressed as follows:

$UΣV^T=\begin{bmatrix} 
    \frac{1}{\sqrt 2}&\frac{1}{\sqrt 2}\\
    \frac{1}{\sqrt 2}&-\frac{1}{\sqrt 2}\\
\end{bmatrix}\begin{bmatrix}
    \sqrt 12&0&0\\
    0&\sqrt 10&0
\end{bmatrix}$

$\begin{bmatrix}
    \frac{1}{\sqrt 6}&\frac{2}{\sqrt 6}&\frac{1}{\sqrt 6}\\
    \frac{2}{\sqrt 5}&-\frac{1}{\sqrt 5}&0\\
    \frac{1}{\sqrt 30}&\frac{2}{\sqrt 30}&-\frac{5}{\sqrt 30}
\end{bmatrix}=\begin{bmatrix}
    3&1&1\\
    -1&3&1
\end{bmatrix}=A$

Note:
- U and  V are unitary matrices, i.e.:
$UU^T=U^TU= \bold I$
$VV^T=V^TV= \bold I$,

Where $I$ is an identity matrix.

The real-world data are usually more extensive and beyond our manual handling capability. Some data matrices can consist of billions of both instances and features. A good example is a dataset for image recognition. 

Each image is usually stretched into a column vector with millions of elements, and the dataset itself can contain even millions of features, each corresponding to a unique face. No matter how we may attempt to solve this problem manually, we can never succeed in such a situation. Here comes the desire to take advantage of the computer's computational power.

To demonstrate how to carry out such computations on a computer, i.e., decomposing a matrix into more efficient components, we shall use a simple matrix and see how we can decompose it. So, let us learn how we perform these operations using Python.

### Implementing singular value decomposition
This implementation will use the following matrix:
$A= \begin{bmatrix}
    3&1&1\\
    -1&3&1
\end{bmatrix}$

So, let us obtain the decompose this matrix:

```python
# Singular-value decomposition
from numpy import array
from scipy.linalg import svd
# define a matrix
A = array([[3, 1, 1], [-1, 3, 1]])
print("A=",A)
# SVD
U, S, V_T = svd(A)
# left singular vectors
print("U=")
print(U)
# singular values
print("S=")
print(S)
#right singular vectors
print("V_T=")
print(V_T)

```

The code above returns an output similar to the one below:
```bash
A= [[ 3  1  1]
 [-1  3  1]]
U=
[[-0.70710678 -0.70710678]
 [-0.70710678  0.70710678]]
S=
[3.46410162 3.16227766]
V_T=
[[-4.08248290e-01 -8.16496581e-01 -4.08248290e-01]
 [-8.94427191e-01  4.47213595e-01  5.26260748e-16]
 [-1.82574186e-01 -3.65148372e-01  9.12870929e-01]]

```

The reason for decomposing a matrix is to represent it computationally efficiently so that the original matrix recovered quickly from these singular matrices with the least information loss. 

Let us try this out and see if we obtain the same matrix upon multiplying the three matrices of the SVD together. Before we do this, it is essential to note that the S vector does not fit the rule of matrix multiplication. Thus we first convert it into a diagonal matrix as follows.

```python
# Creating S diagonal matrix
S_diag = array([[3.46410162, 0, 0], [0, 3.16227766, 0]])
S_diag

```

This code returns the following diagonal matrix.

```bash
array([[3.46410162, 0.        , 0.        ],
       [0.        , 3.16227766, 0.        ]])

```

Now, let us reconstruct our matrix A from its SVD. The code below will carry out this operation.

```python
# reconstructing our original matrix A from singular value decomposition elements
# we multiply our matrices from right; that is, the last two matrices are multiplied first, and the result multiplied with the first matrix
B = U.dot(S_diag.dot(V_T))
print("Reconstructed matrix:")
print(B)

```

This code outputs the matrix below:

```bash
Reconstructed matrix:
[[ 3.  1.  1.]
 [-1.  3.  1.]]

```

As we can see, we recovered our original matrix from its SVD. However, in the real world, the application of the SVD is not always to only retrieve the entire matrix from the SVD. Instead, we truncate the SVD such that only the features with the most information in the original matrix are recovered. By so doing, we reduce both the needed computational power and processing time.

### Conclusion
To wind up, we looked at the SVD algorithm in this article. First, we learned the properties of its three matrices and how they are obtained from the given data matrix. Later, we saw how we could recover a given matrix from its SVD. 

Finally, since we were not handling data manually, we demonstrated how to perform these operations in Python. The SVD has a wide application in the industry, i.e., at Google, it is used in the PageRank algorithm and in the image recognition activities was the case previously with the Facebook image recognition model.

Since this article is meant to get you started with the Singular Value Decomposition algorithm, soon, we shall be looking at its application in image recognition in a later article. However, till then, stay tuned!

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)

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