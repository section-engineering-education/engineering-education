---
layout: engineering-education
status: publish
published: true
url: /moore-penrose-pseudoinverse/
title: Understanding Moore Penrose Pseudoinverse with Python
description: In this tutorial we will explore Moore-Penrose Pseudoinverse and learn how to use it to perfom various matrix operations with Python.
author: daniel-mwanthi
date: 2022-02-17T00:00:00-11:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/moore-penrose-pseudoinverse/hero.jpg 
    alt: Understanding Moore Penrose Pseudoinverse with Python Hero Image
---
Moore-Penrose Pseudoinverse is a linear algebra technique used to approximate the inverse of non-invertible matrices. This technique can approximate the inverse of any matrix, regardless of whether the matrix is square or not. In short, Pseudo-inverse exists for all matrices. If a matrix has an inverse, its pseudo-inverse equals its inverse.
<!--more-->
The idea behind the pseudo-inverse is very close to what we already know about the inverse of a matrix. When we create an inverse of a matrix, we usually find a matrix that undoes what the original matrix did. So it is good to think of the inverse of a matrix as the matrix that maps a transformed vector(s) back to its original space.

The inverse of a matrix is applicable when solving a system of linear equations. However, when solving these systems, the challenge that often arises is that it is only possible to determine the solution of the system if the coefficient matrix is [non-singular](https://www.sciencedirect.com/topics/engineering/nonsingular-matrix) and square. 

If the coefficient matrix meets these two conditions, then it is invertible, and therefore, there exists a unique solution to the system, i.e.

If $A \in M_{n\times m}$ is invertible, then the linear system, 
$Ax=b$ has a unique solution, i.e.,
$A^{-1}Ax=A^{-1}b$
$x=A^{-1}b$

### Prerequisites:
- [Singular Value Decomposition](/engineering-education/singular-value-decomposition-in-python/)
- An ability to work with matrices in either [Jupyter notebook](https://jupyter.org/install) or [Google Colab](https://jupyter.org/install).
- Knowledge of the Systems of Linear equations.

### Introduction to Pseudo-inverse
Most of the time, the coefficient matrix of linear systems of equations is not always square, and it is impossible to determine its inverse. This implies that we cannot directly find a solution to a linear system if this is the case. These situations can arise in two possible ways. One is when a linear system is *underdetermined* (short-fat matrix).

A system is said to be underdetermined if the number of variables in the system is greater than the number of equations. In this case, the system may have an infinite number of solutions. The following case is the *Overdetermined* system (tall-skinny matrix). 

A system is termed *overdetermined* if it has a much higher number of equations than the number of variables. In this case, the system may have many solutions or no solutions. Now, to approximate the best solution for such systems with no unique solutions, we make use of [Singular Value Decomposition](/engineering-education/singular-value-decomposition-in-python/) (SVD). 

Let us see how the SVD facilitates this. Suppose we have a system of linear equations, $$Ax = b,$$ where the rectangular matrix A and vector b are known, and vector x is unknown.

To solve this system, we need to find the values for the vector x. In this case, A has no inverse, but we can approximate it using Singular Value Decomposition. We know, the SVD of a matrix, $$A = UΣV^T.$$

In the given system, we can replace matrix A with its SVD, i.e.,

Ax = b

$UΣV^Tx = b$,

Now, it is much easier to take an inverse of these singular components of A, i.e., $$VΣ^{-1}U^TUΣV^Tx = VΣ^{-1}U^Tb$$.

Since $U^TU$, $Σ^{-1}Σ$ and $VV^T$U^T they all multiply out to identify matrices, and therefore, our equation can be reduced to, $$\hat x = VΣ^{-1}U^Tb$$.

We denote the quantity $VΣ^{-1}U^T$ as $A^\dagger$, i.e., $$A^\dagger = VΣ^{-1}U^T.$$

This gives:

$\hat x= A^\dagger b$

The quantity $A^\dagger$ is what we call the *Pseudo-inverse* or, more generally, the *Moore Penrose Pseudo-inverse* of matrix A. 

This quantity generalizes the inverse of a matrix, and it exists for any matrix regardless of whether a matrix is square or not.

The $A^\dagger$ must satisfy four conditions known as Moore Penrose pseudo-inverse condition.
These are:
1.$AA^\dagger A = A$
2. $A^\dagger A A^\dagger = A^\dagger$
3. $(A A^\dagger)^* = AA^\dagger$
4. $(A^\dagger A)^* = A^\dagger A$

We will not prove these conditions, but you can find proofs [here](https://www.youtube.com/watch?v=8dhnUcc_dLM).

Now, let us look at an example to understand how this technique works intuitively.

Suppose we are given the following matrix:

$A=\begin{bmatrix}
    1&1&1&-1\\
    0&1&1&0\\
    -1&1&1&1
\end{bmatrix}$

We are required to find its Pseudo-inverse.

This matrix is a non-square matrix, so we cannot compute its inverse. Instead, we can approximate it using Pseudo-inverse. To do so, we first compute its Singular Value Decomposition. 

The Singular Value Decomposition of this matrix should return an output similar to the one provided below.

$U=\begin{bmatrix}
    \frac{1}{\sqrt 3} & \frac{1}{\sqrt 2} & \frac{1}{\sqrt 6}\\
    \frac{1}{\sqrt 3} & 0 &\frac{-2}{\sqrt 6}\\
\frac{1}{\sqrt 3} & \frac{-1}{\sqrt 2} & \frac{1}{\sqrt 6}
\end{bmatrix}$


$\sum = \begin{bmatrix}
    \sqrt6 & 0& 0&0\\
    0&2&0&0\\
    0&0&0&0
\end{bmatrix}$

$V=\begin{bmatrix}
    0&1&0&1\\
    1&0&1&0\\
    1&0&-1&0\\
    0&-1&0&1
\end{bmatrix}$

Next, we determine the $Σ^\dagger$ from the $Σ$ matrix by taking the reciprocal of all non-zero elements and then transposing the resultant matrix. 

This yields:

$\sum^{\dagger} = \begin{bmatrix}
    \frac{1}{\sqrt6} & 0& 0&0\\
    0&\frac{1}{2}&0&0\\
    0&0&0&0\\
    0&0&0&0\\
\end{bmatrix}$

We now have all we need to compute the Moore-Penrose Pseudoinverse of $A$.

```bash
$A^{\dagger}=V {Σ^\dagger}U^T
=\frac{1}{\sqrt 2}\begin{bmatrix}
    0&1&0&1\\
    1&0&1&0\\
    1&0&-1&0\\
    0&-1&0&1
\end{bmatrix}\begin{bmatrix}
    \frac{1}{\sqrt6} & 0& 0\\
    0&\frac{1}{2}&0\\
    0&0&0\\
    0&0&0
\end{bmatrix}\begin{bmatrix}
    \frac{1}{\sqrt 3} & \frac{1}{\sqrt 3} & \frac{1}{\sqrt 3}\\
    \frac{1}{\sqrt 2} & 0 &\frac{-1}{\sqrt 2}\\
\frac{1}{\sqrt 6} & \frac{-2}{\sqrt 6} & \frac{1}{\sqrt 6}
\end{bmatrix}$
```
```bash
$=\begin{bmatrix}
    0&1&0&1\\
    1&0&1&0\\
    1&0&-1&0\\
    0&-1&0&1
\end{bmatrix}\begin{bmatrix}
    \frac{1}{6} & \frac{1}{6}& \frac{1}{6}\\
    \frac{1}{4}&0&\frac{-1}{4}\\
    0&0&0\\
    0&0&0
\end{bmatrix}=\frac{1}{12}\begin{bmatrix}
    3&0&-3\\
    2&2&2\\
    2&2&2\\
    -3&0&3
\end{bmatrix}$
```

This solution is the Pseudo-inverse of $A$.

Let us look at one more example.

Suppose we have an $m\times n$ $A$ matrix, where, $m\neq n$, let us determine its Pseudo-inverse.

$A=\begin{bmatrix}
-1&2\\
3&-2\\
5&7
\end{bmatrix}$

This time, we utilize and at the same time learn how to compute the Moore-Penrose pseudo-inverse of a matrix using the software. In our case, we will carry out our computations in Python.


### Python implementation of Moore Penrose Pseudoinverse
Here, we only need the `numpy` library since it contains a package dedicated to linear algebra. So, let us import this library.

```python
import numpy as np
```

The next thing is to create our matrix, $A$. We do this as shown below.

```python
A = np.array([[-1,2],[3,-2],[5,7]])
print(A)
```
Output:

```bash
[[-1  2]
 [ 3 -2]
 [ 5  7]]
```

We got a matrix of 3 x 2, just as expected, but since this matrix is not square, we can not find its inverse. 

However, it has a pseudo-inverse. To determine its pseudo-inverse, let us first obtain its Singular Value Decomposition.

```python
U,d,VT = np.linalg.svd(A)
```

We can now print these three matrices explicitly as follows.

```python
print(U)
```
Output:

```bash
array([[ 0.12708324,  0.47409506,  0.87125411],
       [ 0.00164602, -0.87847553,  0.47778451],
       [ 0.99189069, -0.0592843 , -0.11241989]])
```

```Python
print(d)
```

Output:
```bash
array([8.66918448, 4.10429538])
```

```Python
print(VT)
```

Output:
```bash
array([[ 0.55798885,  0.82984845],
       [-0.82984845,  0.55798885]])
```

Now, to compute $A^\dagger$, we require V and $D^\dagger$ from the above SVD outputs. 

It is easy to compute V using the `VT` matrix returned from the SVD. So, the only task we have is to compute $D^\dagger$. We create these matrices as follows.

To determine $D^\dagger$, we first create a diagonal matrix D using singular values of the vector d obtained above.

```python
D  =  np.diag(d)
print(D)
```

This code creates the diagonal matrix we are looking for. Executing this code, we should get an output similar to the one provided below.

```bash
array([[8.66918448, 0.        ],
       [0.        , 4.10429538]])
```

The next thing is to take the reciprocal of all non-zero entries in this diagonal matrix. Note that we only take the reciprocal for non-zero entries.

From the `linalg` model, we use the `inv()` method to get the above matrix inverted automatically.

```python
D_inver = np.linalg.inv(D)
print(D_inver)
```

Executing the code we get:

```bash
array([[0.1153511 , 0.        ],
       [0.        , 0.24364718]])
```

Next, we to get the transpose of the `D_inver` above. Also, we need to note that the `D_inver` is a 2 x 2 square matrix.

To meet the law of matrix multiplication, we need to ensure the number of columns of $D^{\dagger}$ matches the number of rows of U. 

Since $U$ has three rows, we concatenate a zero column on $D^{\dagger}$. 

Let us do this using the code below:

```python
Dplus = np.concatenate((D_inver, np.array([[0,0]]).T),axis = 1)
print(Dplus)
```

Output:
```bash
array([[0.1153511 , 0.        , 0.        ],
       [0.        , 0.24364718, 0.        ]])
```

Here is our $D^\dagger$ matrix. Now, we have everything we need to calculate our $A^†$. 

We know, $A^†=VD^†U^T$ and from our singular value decomposition we got U and $V^T$, we can now compute our Pseudo-inverse $A^†$ as follows.

```python
Aplus = np.dot(VT.T, np.dot(Dplus,U.T))
print(Aplus)
```

Output:

```bash
array([[-0.08767773,  0.17772512,  0.07582938],
       [ 0.07661927, -0.1192733 ,  0.08688784]])
```

Above is the Pseudo-inverse of our matrix. We can test what it gives by multiplying it with the original matrix. 

Does it provide an identity matrix as we expect when we multiply a matrix with its inverse or not? Let us see this in practice.

```python
np.dot(Aplus, A)
```

Output:

```bash
array([[ 1.00000000e+00, -2.91433544e-16],
       [-2.77555756e-17,  1.00000000e+00]])
```

Indeed, the output is not far away from an identity matrix. Note that the leading diagonal has ones, and all other elements in the off-diagonal are so negligible that they can be assumed to be zero.

So, we can conclude that the Pseudo-inverse approximates a matrix's inverse very appropriately. Unfortunately, it is time-consuming to perform all these steps one by one, as we have noticed. 

If you are only interested in getting the final answer, there exists a method in `Numpy` under the Linear Algebra model that automatically computes the pseudo-inverse. Let us see if we can use that method to obtain the same answer as above.

```python
np.linalg.pinv(A)
```

Output:
```bash
array([[-0.08767773,  0.17772512,  0.07582938],
       [ 0.07661927, -0.1192733 ,  0.08688784]])
```

The `pinv()` method gave us the same answer we had computed earlier.

### Conclusion
This article has introduced us to *Moore Penrose Pseudo-inverse*. Utilizing this concept, we can approximate the inverse of non-square matrices, both manually and practically. It is important to perform such an operation, especially with real data.

This involves finding a solution for variables when the data is a non-square matrix. Furthermore, we have explained how pseudo-inverse can simplify the work. Now that you know how to perform the Pseudo-inverse, you can go on and challenge yourself by solving a system of linear equations by applying the knowledge you have gained in this material. This will give your understanding a reinforcement.

### Further reading
- [More on Pseudo-Inverse](https://www.math.ucla.edu/~laub/33a.2.12s/mppseudoinverse.pdf)

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