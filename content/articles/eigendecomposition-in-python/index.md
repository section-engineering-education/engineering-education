---
layout: engineering-education
status: publish
published: true
url: /eigendecomposition-in-python/
title: Getting Started with Eigendecomposition in Python
description: This article will help readers understand Eigendecomposition in Python. This approach is used in Linear Algebra to decompose a matrix into smaller components.
author: jackson-munyai
date: 2022-03-11T00:00:00-05:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/eigendecomposition-in-python/hero.png
    alt: Getting Started with Eigendecomposition in Python Hero Image
---
Eigendecomposition is a technique used in Linear Algebra to break down a matrix into its constituent parts.
<!--more-->
In this tutorial, we will focus on _eigenvalues_ and the _eigenvectors_ of a matrix to derive Eigendecomposition. We will also work with square matrices because they support the computation of _eigenvalues_ and _eigenvectors_.

Let's use a simple matrix to understand how Eigendecomposition is derived.

Suppose we have a _2 x 2_ square matrix A:

![Matrix](/engineering-education/eigendecomposition-in-python/matrix-1.png)

Our first step is to determine its eigenvalues and eigenvectors. If you compute the eigenvalues, you should get:

![Eigenvalues](/engineering-education/eigendecomposition-in-python/eigenvalues.png)

The corresponding eigenvectors to these eigenvalues are:

![Eigenvectors](/engineering-education/eigendecomposition-in-python/eigenvectors.png)

When we normalize our eigenvectors, we should see the following output:

![Normalized-eigenvectors](/engineering-education/eigendecomposition-in-python/nor-eigenvectors.png)

We can develop the following equations using these components because they explain eigenvalues and eigenvectors:

$Au_1=\lambda_1u_1$

$Au_2=\lambda_2u_2$

If we compress these two systems into a matrix of eigenvectors and a matrix of eigenvalues, we get:

![Matrix-equation](/engineering-education/eigendecomposition-in-python/equation.png)

We can also use the following formula:

![Matrices](/engineering-education/eigendecomposition-in-python/matrices.png)

When we use $U$ and $\lambda$ in equation $(i)$, we get the following equation:

$AU=U\Lambda$

To get our matrix $A$ from this relationship, we take $U$ inverse, i.e., $U^{-1}$, on both sides of the matrix equation above. We end up with the equation below:

$A=U\Lambda U^{-1}$

This component is what we call Eigendecomposition. Matrix $U$ contains eigenvectors and $\Lambda$ has eigenvalues.

**Why is this matrix decomposition important?**

As stated, a matrix is a transformation that maps a vector from one point to another in the vector space.

In machine learning algorithms, we often apply such transformations several times until the final output is obtained at each phase of the algorithm.

However, the application also depends on the complexity of the problem. This means at the end, we will have taken our matrix raised to a power of a certain number.

To understand this, suppose we have the following square matrix:

$A^{P}$, where $p=16$

A simple approach to computing this matrix is to take the product of all possible pairs at each iteration.

Let's determine the number of iterations needed to compute this matrix until we get our final output as $A^p$.

We can explicitly write _A_ as:

```bash
A*A*A*A*A*A*A*A*A*A*A*A*A*A*A*A
```

When we take the product of each pair of the A matrix in the first iteration, we get:

$A^{2}*A^{2}*A^{2}*A^{2}*A^{2}*A^{2}*A^{2}*A^{2}$

In the next iteration, we check the product of the pairs of the matrix above. The result is:

$A^{4}*A^{4}*A^{4}*A^{4}$

If we perform the calculation again, we obtain:

$A^{8}*A^{8}$

We determine the final output as shown below:

$A^{8}$

To determine the final output, we performed the multiplication in four different iterations.

When the value of _p_ is huge, we can use the formula $log_2(p)$. This will enable us to know the number of iterations we need for the final output.

It's clear that the number of iterations changes with the size of _p_. This makes the approach inefficient when a large number is applied.

Let's apply Eigendecomposition to this problem:

$A=U\Lambda U^{-1}$

When we write _A_ explicitly, we should have the following output:

![Matrix-m](/engineering-education/eigendecomposition-in-python/matrix-m.png)

It's easy to compute this long chain on the right-hand side of the equation above. The product of a matrix and its inverse equals an identity matrix.

This means that any matrix multiplied with an identity matrix equals the matrix itself. Applying this knowledge to the equation above, it condenses to:

$A=U\Lambda^{16} U^{-1}$

The only matrix we need to compute is $\Lambda^{16}$.

$\Lambda$ is a diagonal matrix. We calculate it using the power of its diagonal components.

To determine the number of iterations required for the output, we first carry out the following multiplication in the first iteration:

$\Lambda^{16} U^{-1}$.

We then take $U*$o (output from the first iteration) and transfer it to the second iteration.

Therefore, regardless of the size of _p_, in Eigendecomposition, the number of times we carry out our computations remains constant.

Let's now perform eigendecomposition in python.

### Implementation of Eigendecomposition in Python
We only need the `Numpy` Python library for this tutorial. Let's import it as follows:

```python
import numpy as np
```

We will use the following square matrix in this Python demo:

![Matrix](/engineering-education/eigendecomposition-in-python/matrix-m.png)

$M=\begin{bmatrix}
  1&2&1\\
  0&1&0\\
  1&0&1
\end{bmatrix}$

Let's create this matrix in Python:

```py
# create our matrix
M = np.array([ [1,2,1], [0,1,0], [1, 0, 1] ])
```

Let's print the matrix to understand its components:

```py
print(M)
```

Output:

```bash
[[1 2 1]
 [0 1 0]
 [1 0 1]]
```

To get the components of eigendecomposition, we first need to compute _eigenvalues_ and _eigenvectors_:

```py
#getting the eigenvalues and eigenvvector of M
Lambda, U = np.linalg.eig(M)
```

Let's print the _eigenvectors_ and _eigenvalues_:

```py
## eigenvectors
print(U)
```

```bash
[[ 7.07106781e-01 -7.07106781e-01  2.00093587e-17]
 [ 0.00000000e+00  0.00000000e+00  4.47213595e-01]
 [ 7.07106781e-01  7.07106781e-01 -8.94427191e-01]]
```

```py
print(Lambda)
```

Output:

```bash
[2. 0. 1.]
```

We need $\Lambda$ and $U^-{1}$ to calculate all components of our Eigendecomposition.

We will first utilize the Numpy `inv()` function to determine $U^{-1}$ using the inverse of $U$, as demonstrated below:

```py
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

Let's compute $\Lambda$ on the diagonal matrix. We will use the `diag()` function with the `Lambda` vector to obtain this matrix:

```py
Λ = np.diag(Lambda)
Λ
```

Output:

```bash
array([[2., 0., 0.],
       [0., 0., 0.],
       [0., 0., 1.]])
```

Since we have the three components of our eigendecomposition, let's reconstruct the original matrix:

```py
def round(values, decs=0): $# we don't want to include decimal points in our returned matrix
  return np.round(values*10**decs)/(10**decs)

vec = np.dot(U,np.dot(Λ, inv_U)) # taking the product of our three matrices
round(vec, decs=0)
```

When we execute the code above, we should have the following output:

```bash
array([[ 1.,  2.,  1.],
       [ 0.,  1.,  0.],
       [ 1., -0.,  1.]])
```

In the code above, we have successively recovered our original matrix from its _Eigen_ components.

### Conclusion
In this tutorial, we learned how to derive eigendecomposition. We also used a simple illustration to determine how efficient this form of decomposition is compared to ordinary matrix multiplication.

Finally, we looked at how to perform eigendecomposition using Python. You can now use this knowledge to craft other quality applications.

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
