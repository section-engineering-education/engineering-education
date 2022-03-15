---
layout: engineering-education
status: publish
published: true
url: /eigen-decomposition-orthogonolization-and-orthonormalization-in-matlab/
title: Implementation of Eigenvalues, Orthogonalization, and Orthonormalization in Matlab
description: This article walks the reader through the implementation of eigenvalues, eigenvectors, eigendecomposition, orthogonalization and orthonormalization in Matlab.
author: paul-juma
date: 2021-11-06T00:00:00-16:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/eigen-decomposition-orthogonolization-and-orthonormalization-in-matlab/hero.jpeg
    alt: eigendecomposition orthogonalization eigendecomposition image
---
A matrix is the rectangular arrangement of numbers. We represent them in the form of `m x n`, where `m` is the rows while `n` is the number of columns. Eigen decomposition is the process of representing vectors or a matrix by its eigenvalues and eigenvectors. The eigenvalue is like a scalar, but we will go over this in more detail in the article.
<!--more-->
Orthogonalization is the process of making vectors orthogonal. Orthogonal vectors are vectors that are perpendicular to each other; that is, the angle between them is 90 degrees. 

Orthonormalization is the process of normalizing the vectors. Normalization is the process of changing the vectors into unit vectors. All these processes form the basics of the matrix. However, engineers and data analysts use more of these processes in their daily activities in daily life and daily activity. 

Since Matlab is a matrix laboratory, then it means that it has tools that make working these processes easier. This article will look at how we can get these values in Matlab.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- A proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Eigen decomposition
Eigen decomposition is the process of representing vectors or a matrix by its eigenvalues and eigenvectors.

### Eigen values and eigenvectors
We have a matrix `A` product and a vector `x` as `Ax`. 

Taking `A` as `2 x 2` matrix as:

$$
\left(\begin{array}{cc} 
1 & 2\\
2 & 4
\end{array}\right)
$$ 

![image one](/engineering-education/eigen-decomposition-orthogonolization-and-orthonormalization-in-matlab/matrix_one.jpeg)

In the graph above, we consider two cases; the first case is if `x` is:

$$\begin{vmatrix}1\\1\end{vmatrix}$$

Note that `Ax` will also be a vector. I have plotted the graph for easier understanding and interpretation. Now, what is the graph telling you? Do you notice that the resultant vector has been scaled and rotated compared to `x`?

![expressing eigenvalues and eigenvectors](/engineering-education/eigen-decomposition-orthogonolization-and-orthonormalization-in-matlab/matrix_two.jpeg)

We just multiplied a matrix and a vector, and got the result to be scaled and rotated compared to `x`.

Let's now look at case 2. 

We now take `x` as:

$$\begin{vmatrix}1\\2\end{vmatrix}$$

![expressing eigenvalues and eigenvectors](/engineering-education/eigen-decomposition-orthogonolization-and-orthonormalization-in-matlab/matrix_three.jpeg)

In this case 2, the resultant is scaled but not rotated. The eigenvector is a vector that undergoes pure scaling without any rotation, while the scaling factor is the eigenvalue. 

The basic equation of eigenvalues and eigenvector is given by:

$A.x = \alpha x$ 

Where;:

`x` is the eigen vector and $\alpha$ is the eigen value.

### Matlab code for eigenvalue and eigenvectors
Calculating the eigenvalue and eigenvector of a matrix in Matlab is very easy. This is because Matlab has the function `eig` that returns the eigenvalue. 

Let's say we have a 3 x 3 matrix which is:

$$
\left(\begin{array}{cc} 
1 & 2 & 3\\
4 & 0 & 0\\
5 & 0 & 6
\end{array}\right)
$$ 

Now we want to calculate the eigenvector of this matrix using Matlab.

```matlab
A = [1,2,3; 4, 0, 0; 5, 0, 6];
eig(A)
```

When you execute the command above, we get the three eigenvalues as shown below:

```Matlab
ans =

    8.3477
   -3.1646
    1.8170
```
### Properties of eigenvalues
- The product of the eigenvalues equals the determinant. To prove this, we need to find the product of our eigenvalues and the determinants.

```Matlab
prod(eig(A))

ans =

  -48.0000
```

Let's now see the determinant of matrix A.

```Matlab
det(A)

ans =

  -48.0000
```
So this is true.

- Sum of eigenvalues equals the sum of the major diagonal elements.

```Matlab
sum(eig(A))

ans =

    7.0000
```

To find the sum of the major diagonal, we use the command below:
```Matlab
trace(A)

ans =

     7
```

Now to calculate the eigenvector, we use the command below:
```Matlab
[V D]=eig(A)
```

This function gives two outputs. The first output will be the eigenvector, while the second will be the eigenvalues. Let's see the eigenvector of our sample. 

The output is:
```Matlab
V =

   -0.4165   -0.5877   -0.3707
   -0.1996    0.7428   -0.8162
   -0.8870    0.3206    0.4432


D =

    8.3477         0         0
         0   -3.1646         0
         0         0    1.8170
```

`V` is the eigenvector, while the main diagonal of `D` is the eigenvalues. 

To extract these values, we use the `diag` function and get the output as shown below:
```Matlab
diag(D)
ans =

    8.3477
   -3.1646
    1.8170
```

Now, let's show that our equation for eigenvector and eigenvalues work. 

It means that we will have:

$Ax-\alpha x=0$

The output is as shown below:
```Matlab
A*V-V*D

ans =

   1.0e-14 *

    0.3553   -0.0888   -0.0222
    0.0222    0.0888         0
    0.4441    0.1998   -0.0111
```

As we can see, the output is close to zero, if not zero.

### Orthogonality
Orthogonal vectors can be referred to as perpendicular vectors. This means that the angle between them is 90 degrees. The dot product between the two vectors is equal to zero. The dot product of a vector is the product of two vectors multiplied by the cosine between them.

$$A.B=\begin{vmatrix}A*Bcos\theta\end{vmatrix}$$

Cosine of 90 degrees is zero; then the product will be zero. 

Let's consider the vector of A=$$\begin{vmatrix}4\\2\\-1\end{vmatrix}$$ and B=$$\begin{vmatrix}1\\-3\\-2\end{vmatrix}$$

To see if these vectors are orthogonal, we must check that the dot product is zero. Apart from the geometric definition we mentioned before, we can also use the algebraic method, which is:

$$A.B = (A_1)(B_1)+(A_2)(B_2)+(A_3)(B_3)$$

We can now check if our vector is orthogonal.

$$A.B = (4)(1)+(2)(-3)+(-1)(-2)$$

$$A.B = 4-6+2=0$$

Since the dot product of the two vectors is 0, the vectors are orthogonal.

### Matlab code for orthogonality
In finding the orthogonality of a matrix, we use the `gschmidt` function with the matrix as the arguement for the function. This function implements the Gram-Schmidt process.

```matlab
function [Q,R]=gschmidt(V)
% Input: V is an m by n matrix of full rank m<=n
% Output: an m-by-n upper triangular matrix R
% and an m-by-m unitary matrix Q so that A = Q*R.
[m,n]=size(V);
```

We make all the values of the matrix zeros to normalize the first column of the matrix.
```Matlab
R=zeros(n);            %making the values of n zero
R(1,1)=norm(V(:,1));
Q(:,1)=V(:,1)/R(1,1);   %Dividing the first column of both vectors
```

Since Gram-Schmidt is an iterative process, it takes the first vector and then it creates the second vector that is orthogonal to the initial one and normalize it.

```matlab
for k=2:n
R(1:k-1,k)=Q(:,1:k-1)'*V(:,k);
Q(:,k)=V(:,k)-Q(:,1:k-1)*R(1:k-1,k);
R(k,k)=norm(Q(:,k));
```

Now we need to lump all these vectors into one vector and then create a perpendicular projection.

```Matlab
Q(:,k)=Q(:,k)/R(k,k);
end
```

Let's assume we want to find the orthogonality of a matrix `A` given as:

$$
A = \left(\begin{array}{cc}  
3 & 3 & 1\\
1 & 2 & 3\\
6 & 5 & 4
\end{array}\right)
$$ 

We first assign this matrix to a variable in Matlab and then call our function.
```matlab
V = [3 3 1; 1 2 3; 6 5 4];
>> gschmidt(V)

ans =

    0.4423    0.2702   -0.8552
    0.1474    0.9187    0.3665
    0.8847   -0.2882    0.3665
```

### Orthonomality
Orthonormality comes from the word `ortho` and `normality`. The normality here means vectors have a length of 1. If a set of vectors has a length of 1 and is also orthogonal, the vector is orthonormal. Finding the length of a vector is done by finding the square root of the dot product.

$$\begin{vmatrix}A\end{vmatrix}=\sqrt{A.A}$$

If we then divide the original vector by the length, we will get a new length 1.

$\frac{A}{\begin{vmatrix}A\end{vmatrix}}$=1

If we take our initial vector to see if they are orthonormal. 

The length of A is given by:

$$\begin{vmatrix}A\end{vmatrix}=\sqrt{A.A}=\sqrt{(4)^2+(2)^2+(-1)^2}$$
$$\begin{vmatrix}A\end{vmatrix}=\sqrt{A.A}=\sqrt{16+4+1}=\sqrt{21}$$

$$\begin{vmatrix}B\end{vmatrix}=\sqrt{B.B}=\sqrt{(1)^2+(-3)^2+(-2)^2}$$

$$\begin{vmatrix}A\end{vmatrix}=\sqrt{A.A}=\sqrt{1+9+4}=\sqrt{14}$$

Now we can divide the vectors A and B by the lengths as shown below.

![orthogonormality](/engineering-education/eigen-decomposition-orthogonolization-and-orthonormalization-in-matlab/matrix_four.jpeg)

Here, the word unit means that they have lengths that are equal to 1. This process of making a vector into a unit vector is often called normalization. By doing this, we have only changed the magnitude of the vectors, not the direction.

They are still orthogonal, as we verified before. Since these two vectors are orthogonal and have lengths equal to 1, that makes them orthonormal.

### Matlab code for orthonormality
Matlab has an in-built function `orth` that is used to find the orthonormality of a matrix. 

The syntax is:
```Matlab
Q = orth(A)
```

Here, `A` is the matrix in which we are finding its orthonormality. Note that the number of columns for vector `Q` equals the number of the rows of `A`. We use this column to determine the rank of that matrix. To find the rank of a matrix, we use the `rank` function.

### Example
Let's find the orthonormality of matrix A:
$$
A = \left(\begin{array}{cc} 
4 & 2 & -3\\
1 & -1 & 1\\
3 & 0 & -6
\end{array}\right)
$$ 

We first define the variable to Matlab and then use the function to find the solution.
```matlab
A = [4 2 -3; 1 -1 1; 3 0 -6];
Q = orth(A) %Assigning a variable to stores the outputs.
```

The output is as shown below:
```Matlab
ans =

   -0.6080   -0.7673   -0.2039
    0.0458   -0.2903    0.9558
   -0.7926    0.5718    0.2117
```

We can find the rank of our matrix `A`.
```Matlab
r=rank(A)
r =

     3
```

We can get the error range for which the matrix is orthogonalized and normalized. This error should be as low as possible for accuracy. 

You can find the error using the code below:
```Matlab
E = norm(eye(r)-Q'*Q,'fro')
```
`Q` is the orthonormal basis, and `r` is the rank.

The output for our error range is as shown below:
```Matlab
E =

   9.0579e-16
```
### Conclusion
Matlab is a matrix laboratory. It means that Matlab easily evaluates matrix and vector problems. As we can see, all you do is use the in-built functions. The codes used for these problems are not complex, and anybody can understand what is going on.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)


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
