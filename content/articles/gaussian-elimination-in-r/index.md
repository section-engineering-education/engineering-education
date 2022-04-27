#### A Beginner Guide on How to Solve a  System of Linear Equations using Gaussian Elimination Algorithm
A system of linear equations is a collection of one or more linear equations involving the same set of variables. Linear systems are encountered when building regression models in machine learning. There are various techniques for solving this problem. Some methods are complex, while others are easy to understand and implement. The Gaussian Elimination method is one of the best approaches to solving these systems.

This article will look at the intuition behind the Gaussian Elimination method, carry out a handy computation, and finally illustrate how we can implement this method in R.

### Prerequisites
The learner is required to have:
1. A basic understanding of Elementary Linear Algebra.
2. R programming skills
3. R downloaded on their computer

### Understanding the Gaussian Elimination Algorithm
We follow the following steps to solve a system of linear equations using the Gaussian Elimination algorithm.

Suppose we are  a system of linear equations as shown below.

![matrix-image](engineering-education/gaussian-elimination-in-r/matrix.png)

Step 1:
Represent the above system of linear equations in a matrix form, i.e.,
![image](engineering-education/gaussian-elimination-in-r/matrix-form.png)

Assign A, X and b to the coefficient matrix, variables vector and a vector of solutions, respectively. That is:

![matrix](engineering-education/gaussian-elimination-in-r/matrix-a.png)

![vector](engineering-education/gaussian-elimination-in-r/vector-x.png)

![vector](engineering-education/gaussian-elimination-in-r/vector-b.png)

Step 2:
Using matrices A and b, we create an augmented matrix, i.e., attach b to matrix A as the last column.
![aug-matrix](engineering-education/gaussian-elimination-in-r/augmented-matrix.png)
  
Now, to reduce the above matrix ${\bold C}$ to a form that is simple to solve for unknowns, we need to perform some operations. These operations should not change the solution of the linear system. Some of the allowed operations are:

  1. Change the order of the rows
  2. Scale-up a row, i.e., multiplying with a constant
  3. To eliminate particular values, you can multiply one row with a constant and add the output to another row.
   
 So using these operations, we will learn how to reduce a system of linear equations using the Gaussian Elimination Algorithm.

Step 3:
In this step, we make the first value in the first row of ${\bold C}$ an identity. This identity value, which we preserve in that column, is called a pivot. Now, using our $3^{rd}$ operation outlined above, we make all the values below this identity value zeros. This is as shown in the matrix below.

Step 4:
In the second iteration, we make the first value after the zero in the second row an identity. Then, as we did in the first iteration, make all values below this identity value zeros.

This is as shown below:

Step 3:
Repeat the above operations until we obtain an upper triangular matrix.

The last step is to find the solution to our original system using this reduced matrix. Below is an outline of how we determine this solution.

We then create a simplified system of linear equations from this triangular matrix, which we solve by back substitution. Now, this new system of equations is usually much easier to solve than the original system.

 In this article, we will cover the Gaussian Elimination Algorithm in detail.

- What's a system of linear equations
- How to create a matrix of coefficients from a system of linear equations.
- How to create an augmented matrix
- Finally, the learner will be able to carry out all operations involved in reducing a matrix using the Gaussian Elimination algorithm and how it's performed in R and Python.

![image](engineering-education/gaussian-elimination-in-r/image-0.png)

Next:
![image](engineering-education/gaussian-elimination-in-r/image-1.png)

Let's remember the goal was to bring the matrix into an upper rectangular matrix. The last matrix we obtained above is already in an upper rectangular form. From this matrix, we can write the following system of linear equations.

![image](engineering-education/gaussian-elimination-in-r/equations.png)

To find the solution to the original system, we will use the above system of linear equations we just derived from our upper triangular matrix. This is very easy and fast compared to computing the solution using the original system. Remember, in the real world application, a system of linear equations can consist of millions of rows and columns. Using methods such as obtaining the inverse of the coefficient matrix can be computationally expensive and time-consuming. That's why first simplifying computation is a crucial step in real-world applications.

Now, on the above system, all we need to do is to perform a back substitution. The back substitution is performed in the order outlined below:

![image](engineering-education/gaussian-elimination-in-r/solution.png)

Note we first solved for the last variable and then incorporated its solution in solving for the variable before it. Then, we repeated this process until we compute for the first variable, i.e., $x_1$ at last.

### R implementation of Gaussian Elimination Algorithm
In this part, we will create our own matrix, which we will work on. Bellow is an implementation process of this method.

```r
# create a matrix
A <- matrix(c(-3,2,-1,6,-6,7,3,-4,4),byrow = T,nrow=3,ncol=3)
A # print a matrix
b <- matrix(c(-1,-7,-6),nrow=3,ncol=1)
b # print matrix b
# dimension of matrix A
nrow <- nrow(A)
nrow
# concatinante matrix A and vector b
Ugmt.mtx <- cbind(A,b)
Ugmt.mtx

Ugmt.mtx[1,] <- Ugmt.mtx[1,]/Ugmt.mtx[1,1]

for (i in 2:nrow){ # loop over rows
  for (j in i:nrow) { # loop over columns
    Ugmt.mtx[j, ] <- Ugmt.mtx[j, ] - Ugmt.mtx[i-1, ] * Ugmt.mtx[j, i-1] # replace the row values at jth position with left hand computions
  }
  Ugmt.mtx[i,] <- Ugmt.mtx[i,]/Ugmt.mtx[i,i]
}
# print ouput
Ugmt.mtx


```
Executing the code we obatin:
```bash
     [,1]       [,2]       [,3]       [,4]
[1,]    1 -0.6666667  0.3333333  0.3333333
[2,]    0  1.0000000 -2.5000000  4.5000000
[3,]    0  0.0000000  1.0000000 -1.0000000

```
Note, to find the values of our variables; we need to perform a back substitution using the above-reduced matrix output. To simplify things further, however, we can take the above matrix a step further and make elements on the upper triangular as zeros as well. This will ensure we do not need to perform the back substitution on the final output, which might be computationally expensive compared to creating an identity matrix with respect to the output variables. This method of reducing a matrix is called the Gauss-Jordan Elimination Method. To further understand how this method works, I recommend visiting this [blog](https://www.craftonhills.edu/current-students/tutoring-center/mathematics-tutoring/matrices-gauss-jordan.pdf).

This method is implemented in R as follows:

```r
A <- matrix(c(-3,2,-1,6,-6,7,3,-4,4),byrow = T,nrow=3,ncol=3)
A
b <- matrix(c(-1,-7,-6),nrow=3,ncol=1)
b
# dimension of matrix A
nrow <- nrow(A)
nrow
# concatinante matrix A and vector b
Ugmt.mtx <- cbind(A,b)
Ugmt.mtx

Ugmt.mtx[1,] <- Ugmt.mtx[1,]/Ugmt.mtx[1,1]

for (i in 2:nrow){
  for (j in i:nrow) {
    Ugmt.mtx[j, ] <- Ugmt.mtx[j, ] - Ugmt.mtx[i-1, ] * Ugmt.mtx[j, i-1]
  }
  Ugmt.mtx[i,] <- Ugmt.mtx[i,]/Ugmt.mtx[i,i]
}
for (i in p:2){
  for (j in i:2-1) {
    Ugmt.mtx[j, ] <- Ugmt.mtx[j, ] - Ugmt.mtx[i, ] * Ugmt.mtx[j, i]
  }
}
Ugmt.mtx

```
This code returns.
```bash
     [,1] [,2] [,3] [,4]
[1,]    1    0    0    2
[2,]    0    1    0    2
[3,]    0    0    1   -1

```
As we can see, the returned output contains the exact values for the variables we are solving for.

### Conclusion
This article has introduced the concept of solving systems of linear equations using the Gaussian elimination method. Using the reduced matrix, we determined the solution for our variables using the concept of back substitution. Finally, we implemented this process in R. Since the final output still required us to solve for unknowns, using the back substitution, we went a step further and demonstrated an upgraded version of our previous approach, the Jordan-Gaussian Elimination method. We demonstrated how to implement this method where it returned the exact values of the unknown variables.
