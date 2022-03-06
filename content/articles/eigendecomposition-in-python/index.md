---
layout: engineering-education
status: publish
published: true
url: /eigendecomposition-in-python/
title: Getting Started with Eigendecomposition in Python
description: This article will help readers understand how to manage USB devices in C#. This feature is important when granting read/write permissions to removable drives.
author:
date: 2022-02-06T00:00:00-03:12
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/eigendecomposition-in-python/hero.png
    alt: Getting Started with Eigendecomposition in Python Hero Image
---
Eigendecomposition is one decomposition technique used in Linear Algebra to decomposition a matrix into its characteristic components.
<!--more-->
From its title, we can note the word `Eigen`, which is the centre of computing the Eigendecomposition. It signals we will work with the eigenvalues and the eigenvectors of a matrix to derive Eigendecomposition. Further, it implies that we will be working with square matrices as it's the only square matrices for which we can compute the eigenvalues and eigenvectors.

With the help of a simple matrix, let's see how the Eoigendecomposition is derived.

Suppose we have a 2 x 2 square matrix A, i.e.,

![matrix](/engineering-education/eigendecomposition-in-python/matrix-1.png)

Our first step is to determine its eigenvalues and eigenvectors. If you compute the eigenvalues, you should get:

![eigenvalues](/engineering-education/eigendecomposition-in-python/eigenvalues.png)

The corresponding eigenvectors to these eigenvalues are:

![eigenvectors](/engineering-education/eigendecomposition-in-python/eigenvectors.png)

Normalizing our eigenvectors, we get:

![normalized-eigenvectors](/engineering-education/eigendecomposition-in-python/nor-eigenvectors.png)

We can develop the following equations using these components, as they explain eigenvalues and eigenvectors are.

$Au_1=\lambda_1u_1$

$Au_2=\lambda_2u_2$

If we compress these two systems into a matrix of eigenvectors and a matrix of eigenvalues, we get.

![matrix-equation](/engineering-education/eigendecomposition-in-python/equation.png)

We can let,

![matrices](/engineering-education/eigendecomposition-in-python/matrices.png)

Using $U$ and $\lambda$ in equation $(i)$ we get the following equation.
$AU=U\Lambda$

To get our matrix $A$ from this relationship, we can take $U$ inverse, i.e., $U^{-1}$, on both sides of the matrix equation above. Doing so, we get the following equation.

$A=U\Lambda U^{-1}$

This component is what we call the Eigendecomposition. Matrix $U$ cointains eigenvectors and $\Lambda$ cointains eigenvalues.

Now, why is this kind of matrix decomposition important?

As we know, a matrix is a transformation that maps a vector from one point to another in the vector space. In a machine learning algorithm, we often apply such transformations several times until the final output is obtained at each phase of the algorithm. So, we apply the matrix transformation several times depending on the complexity of the problem. This means at the end, we will have taken our matrix raised to a power of some number. To understand this, let's suppose we have a square matrix A such that,

$A^{P}$, where
$p=16$
A simple approach to computing this matrix normally is to take the product of all possible pairs at each iteration. So, let's see the number of iterations needed to compute this matrix until we get our final output as $A^p$.

We can explicitly write A as:

$A*A*A*A*A*A*A*A*A*A*A*A*A*A*A*A$
Taking the product of each pair of A matrix in the first iteration, we get:

$A^{2}*A^{2}*A^{2}*A^{2}*A^{2}*A^{2}*A^{2}*A^{2}$

In the next iteration, we get the product of the above pairs of a matrix, and this will return:

$A^{4}*A^{4}*A^{4}*A^{4}$

If we do so again, we obtain:

$A^{8}*A^{8}$

Finally, we get to the final output.

$A^{8}$

In total, to get to our final output, we carried out our multiplication in four different iterations. Now, suppose the value of p is huge, we can use the formula $log_2(p)$ and know the number of iterations we need to get to the final output. It's clear the number of iteration changes with the size of p, making this approach computationally inefficient with a large number of p.

Suppose we apply the Eigendecomposition to this problem instead. We know,

$A=U\Lambda U^{-1}$

Writing A explicitly we get.

![image](/engineering-education/eigendecomposition-in-python/matrix-m.png)

It's easy to compute this long chain on the right-hand side of the above equation. By matrix multiplication rules, the product of a matrix and its inverse equals an identity matrix. With this in mind, we do not even need to compute such a quantity as any matrix multiplied with an identity matrix equals the matrix itself. Applying this knowledge on the above equation, it condenses to,

$A=U\Lambda^{16} U^{-1}$.

The only matrix we need to compute is $\Lambda^{16}$.

We know that $\Lambda$ is a diagonal matrix, and finding it to the power of something is the same as taking the power of its diagonal components. So it's very easy to compute this component too. Now, let's look at how many iterations we need to get to our final output using the Eigendecomposition.

First, we can carry out the following multiplication in the first iteration, $\Lambda^{16} U^{-1}$. Then, we take $U*$o(output from the first iteration) on the second iteration.

So, regardless of the size of p, with the Eigendecomposition, the number of times we carry out our computations remains constant, 2, unlike in the previous case.

With this in mind, now we can learn how we perform the Eigendecomposiotion in python.


### Python Implementation of Eigendecomposition
The python library needed in this session is only the `Numpy`. Let's import it.
```python
import numpy as np
import

```
In this python demo, we will use the following square matrix.

![matrix](/engineering-education/eigendecomposition-in-python/matrix-m.png)
$M=\begin{bmatrix}
  1&2&1\\
  0&1&0\\
  1&0&1
\end{bmatrix}$

Let's create this matrix in python.

```python
# create our matrix
M = np.array([ [1,2,1], [0,1,0], [1, 0, 1] ])
```
Let's print and have a look at this matrix.

```python
print(M)
```
Output:

```bash
[[1 2 1]
 [0 1 0]
 [1 0 1]]
```

To get the components of Eigendecomposition, we need first to compute eigenvalues and eigenvectors.
 
```python
#getting the eigenvalues and eigenvvector of M
Lambda, U = np.linalg.eig(M)

```
Let's print at our eigenvectors and eigenvalues.
```python
## eigenvectors
print(U)

```

```bash
[[ 7.07106781e-01 -7.07106781e-01  2.00093587e-17]
 [ 0.00000000e+00  0.00000000e+00  4.47213595e-01]
 [ 7.07106781e-01  7.07106781e-01 -8.94427191e-01]]
```
```python
print(Lambda)

```

```bash
[2. 0. 1.]

```
The only thing we need to get all components of our Eigendecomposition is $\Lambda$, and $U^-{1}$. First, let's use the Numpy `inv()` function and get our $U^{-1}$ by taking its inverse of $U$. The code below demonstrates this.

```python
# getting U inverse
inv_U = np.linalg.inv(U)
inv_U

```
Output:
```bash
array([[ 0.70710678,  1.41421356,  0.70710678],
       [-0.70710678,  1.41421356,  0.70710678],
       [ 0.        ,  2.23606798,  0.        ]])

```
Now, let's compute $\Lambda$ our diagonal matrix. We will use the Numpy `diag()` function with the `Lambda` vector to obtain this matrix.

```python
Λ = np.diag(Lambda)
Λ

```
Running this code returns:
```bash
array([[2., 0., 0.],
       [0., 0., 0.],
       [0., 0., 1.]])

```
Since we have all three components of our Eigendecomposition, let's reconstruct our original matrix using these components.

```python
def round(values, decs=0): $# we don't want to include decimal points in our returned matrix
  return np.round(values*10**decs)/(10**decs)

vec = np.dot(U,np.dot(Λ, inv_U)) # taking the product of our three matrices
round(vec, decs=0)

```
Upon executing the above code we obtain:
```bash
array([[ 1.,  2.,  1.],
       [ 0.,  1.,  0.],
       [ 1., -0.,  1.]])

```
We have successively recovered our original matrix from its Eigen components.

### Conclusion
In this tutorial, we learnt how to derive the Eigendecomposition. Then, through a simple illustration, we saw how computationally efficient this form of decomposition is compared to the ordinary matrix multiplication. Finally, we looked at how to perform it in python. You can now practice it with any square matrix data since you have all needed to get started with Eigendecomposition.


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)

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
