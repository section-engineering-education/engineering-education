---
layout: engineering-education
status: publish
published: true
url: /kernel-svm-in-python/
title: Data Classification with Kernel SVM in Scikit-learn
description: Support vector machines (SVMs) are a set of supervised learning methods used for classification, regression and outliers detection.
author: lawrence-mbici
date: 2021-12-22T00:00:00-04:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kernel-svm-in-python/hero.png
    alt: Data Classification with Kernel SVM in Scikit-learn image
---

Kernel SVMs are a class of Support Vector Machines (SVMs) that use kernel functions to classify data. 
<!--more-->
It is a generalization technique of the linear SVM on nonlinear data. Indeep, the Kernel SVM offers more flexibility when dealing with a linearly inseparable classification task.

### Prerequisites
For learners to benefit most from this material, they should be comfortable working with the [scikit learn library](https://scikit-learn.org) in python. 

You will also need basic knowledge of the linear SVM.

### Getting started with Kernel SVM
Before understanding how this algorithm works, we need to revisit the two linear SVM versions.

1. **Hard Support Vector Machine:** According to this version, data is assumed to be perfectly linearly separable, i.e., we can classify data using a linear hyperplane such that all the data points of a class lie on the same side of the hyperplane.

An example of a Hard Support Vector Machine is shown below.

![image](/engineering-education/kernel-svm-in-python/hard-margin.png)

As we can see, there is no misclassification in this case.

2. **Soft Support Vector Machine:** This version is more general and can be used for nonlinear separability. According to this version, data is not linearly separable but still can be classified using a linear hyperplane with minimum trade-off possible.

An example of Soft SVM is shown in the figure below.

![image](/engineering-education/kernel-svm-in-python/soft-margin.png)

As we can see, there is minor misclassification in the case of soft SVM.

Although the soft SVM can handle nonlinear data with the least number of errors, there are cases in which the data is highly nonlinear. Therefore, it cannot obtain a hyperplane with minimum data misclassifications. An example of highly nonlinear data is shown in the scatter plot below.

![scatter plot](/engineering-education/kernel-svm-in-python/non-linear.png)

In this kind of problem, we say data is linearly inseparable. Regardless of how we fit linear decision boundaries to the data, the model's accuracy can only be less than 50%. Thus, we cannot use linear SVM to solve this problem.

In such a problem, the Kernelized form of the Support Vector Machine comes into play. So let us now look at kernel SVMs in detail.

### Kernel SVM
As we saw in the non-linear scatter plot above, it is impossible to classify data points using a linear hyperplane. 

However, if we transform the data from two-dimensional to three-dimensional, we obtain a plot similar to the figure below.

![different](/engineering-education/kernel-svm-in-python/transformed-data.png)

As we can see in the above plot, transforming the data is now linearly separable, and we can classify it using a linear hyperplane. 

Since we mapped our data from two to three dimensions, the decision boundary that optimally classifies our data is a plane.

Most non-linear datasets are usually in high dimensional space in the real-world scenario. Mapping these features further to higher dimensional(kernel space) can result in even theoretically infinite-dimensional feature space.

As a result, the processing time and power required on this kernel space are very high, making this approach inefficient.

Another problem associated with higher dimensional mapping is that the model obtained on such a higher dimension is very complex. 

Therefore, we employ a technique known as the *kernel trick* to make things less complex. This technique enables us to work in the input space without visiting the kernel space.

Let us understand the intuition behind the kernel trick.

As we already stated, the Kernel trick is a technique that enables us to work in the input space of the data without projecting it to a higher dimensional space.

Instead, it classifies data inputs in the input space as if they were in high dimensional space that we could have achieved through transforming the data.

For instance, suppose we have two vectors, i.e.,

$\vec x_i= \begin{bmatrix}
    x_{i1}\\
    x_{i2}
\end{bmatrix}$

$\vec x_j= \begin{bmatrix}
    x_{j1}\\
    x_{j2}
\end{bmatrix}$

Suppose we map these vectors to higher dimensional space as follows.

$\phi: \vec x^2 \rightarrow \vec x^4$


$\phi (\vec x_i)= \begin{bmatrix}
    x_{i1}^2\\
    x_{i1}x_{i2}\\
    x_{i2}x_{i1}\\
    x_{i2}^2
\end{bmatrix}$

$\phi (\vec x_j)= \begin{bmatrix}
    x_{j1}^2\\
    x_{j1}x_{j2}\\
    x_{j2}x_{j1}\\
    x_{j2}^2
\end{bmatrix}$

Where:
The $\phi (x_i)$) and $\phi (x_j)$ are two points we obtained through transforming data to a higher dimension.

The next thing we are interested in is to know how far $\phi (x_i)$ and $\phi (x_j)$ are from each other. 

To do this, we take the dot product of these two $\phi$ vectors as shown below.

$\phi (\vec x_i) . \phi (\vec x_j)=\begin{bmatrix}
    x_{i1}^2\\
    x_{i1}x_{i2}\\
    x_{i2}x_{i1}\\
    x_{i2}^2
\end{bmatrix}.\begin{bmatrix}
    x_{j1}^2\\
    x_{j1}x_{j2}\\
    x_{j2}x_{j1}\\
    x_{j2}^2
\end{bmatrix}$

Suppose we deal with a dataset with hundreds or even thousands of features. Transforming the data and carrying out computations in the same manner as above could be very inefficient.

This approach is time-consuming and requires high processing power. Therefore, we need to develop a more efficient way to carry out the desired computations efficiently. The solution to this challenge is the *kernel trick*.

The good thing with the kernel trick is that we need not transform our data inputs to learn the relationship in their high dimensional space.

Instead, we can directly carry out the computation in the high dimensional space while in the original features space as if we are in the dimensional space.

The formula below shows how the kernel trick utilizes the original data inputs to obtain the same result we would have achieved by first transforming the data to higher dimensions.

$K(\vec x_i,\vec x_j)=(\vec x_i^T.\ \vec x_j)^2$

It follows that:

$K(\vec x_i,\vec x_j)= \phi (\vec x_i) . \phi (\vec x_j)$

So, with the kernel, we do not need to transform the data to learn the relationship in their high dimensional space.

Let us demonstrate this using a simple example.

Suppose we have a dataset with two features such that:

$\vec x_i= \begin{bmatrix}
    1\\
    2
\end{bmatrix}$

$\vec x_j= \begin{bmatrix}
    3\\
    4
\end{bmatrix}$

*Approach 1: Non-Kernelized*

Here, we first map our vectors to higher-dimensional space, as shown below.

$\phi: \vec x^2 \rightarrow \vec x^4$


$\phi (\vec x_i)= \begin{bmatrix}
    1\\
    2\\
    2\\
    4
\end{bmatrix}$

$\phi (\vec x_j)= \begin{bmatrix}
    9\\
    12\\
    12\\
    16
\end{bmatrix}$

Computing the distance between our two new vectors in high dimensions.

$\phi (\vec x_i) . \phi (\vec x_j)= \begin{bmatrix}
    1\\
    2\\
    2\\
    4
\end{bmatrix}.\begin{bmatrix}
    9\\
    12\\
    12\\
    16
\end{bmatrix}=9+24+24+64=121$

*Approach 2: Kernelized*

$K(\vec x_i,\vec x_j)= \left (\begin{bmatrix}
    1\\
    2
\end{bmatrix}^T.\begin{bmatrix}
    3\\
    4
\end{bmatrix}\right)^2=(11)^2=121$

With the kernelized version, we utilized the original dimension of the data. As a result, we obtained the same answer as the first approach, very first and with fewer computations.

This is the basic intuition behind how the kernel trick works. It only utilizes the original data inputs and does wonder.

In practice, we can utilize many types of kernel methods depending on the task convenience. 

The Gaussian RBF kernel and the Polynomial kernel are the most commonly used. However, in this tutorial, we shall explain how the Gaussian RBF kernel works.

The Gaussian RBF kernel formula is given as follows.

$\huge K(\vec x, \vec l^i)= e^{-\frac{||\vec x-\vec l^i||^2}{2\sigma^2}}$

Where $\sigma^2$ is the deviation of the Gaussian distribution, and $\vec l^i$ is considered as a landmark.

The landmark is usually located at point $(0,0)$. Vector $\vec x$ represents any possible point we can choose on the x and y-axis.

Using the Euclidean distance, the numerator, $x-l^i$, tries to capture the distance between the chosen point $\vec x$ and the landmark $\vec l^i$.

We have a $\sigma^2$ value on the denominator. This value is responsible for the steepness of the curve.

Various types of kernels functions can deal with non-linear classification problems. However, in this session, we shall utilize the Gaussian RBF kernel as our kernel function.

### Implementing Kernel SVM
The first thing we shall do is to import the dataset and clean it up before we can implement our model.
We can download this dataset [here](https://github.com/mbici/data/blob/main/dataset.csv).

### Data Preprocessing

#### Step 1: Importing the libraries
```python
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

```
#### Step 2: Importing the dataset
```python
dataset = pd.read_csv('dataset.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

```

#### Step 3: The training and test set data splitting
Here, we split the data into the training and test set at a ratio of 3:4. To obtain the same output as the one provided in this article, we need to set the same seed as the one provided in this session. 

To split our data, let us execute the following lines of code.
```python
from sklearn.model_selection import train_test_split
XTrain, XTest, yTrain, yTest = train_test_split(X, y, test_size = 0.25, random_state = 0)

```
#### Step 4: Feature scaling
Here we scale our features so that once with great values, they do not dominate the ones with small values. 

Let us run the code below in our workspace.
```python
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
XTrain = sc.fit_transform(XTrain)
XTest = sc.transform(XTest)

```

#### Step 5: Fitting the Kernel SVM to the training set
Since our data is now ready to use, let's now fit our model on the training set.
```python
# training the kernel SVM model
from sklearn.svm import SVC # import SVC model
classifier = SVC(kernel = 'rbf', random_state = 0) # creat model's object
classifier.fit(XTrain, yTrain) # fits the model to the training data

```
The above syntax trains the model.

#### Step 6: Predicting the test set results
Now let us try to use our model and predict the test set.

```python
# predicting the test set 
y_predict = classifier.predict(XTest)

```
Upon executing this code, let us proceed and evaluate our model performance on predicting the test set using a confusion matrix.

#### Step 7: Evaluating the model performance
Let us run the code below.
```python
from sklearn.metrics import confusion_matrix, accuracy_score
con_matrx = confusion_matrix(yTest, y_predict)
print(con_matrx)
accuracy_score(yTest, y_predict) 

```
The above code yield the following confusion matrix.

#### Confusion Matrix
```bash
[[64  4]
 [ 3 29]]
0.93 

```
Our model was able to classify 93% of our data points correctly. This performance score is excellent. Thus kernel SVM classified our data appropriately.

### Conclusion
This tutorial revisited the SVM algorithm and showed when it's suitable for classification and when it's not. Therefore, the kernelized version was the best approach to the problem. 

First, we discussed how the kernel trick works. Then, with a visual example, we demonstrated why going for it, rather than working with higher dimensions, is an efficient approach to the problem.

Now that we looked at only one kernel type, we can check with the reference section below and widen our understanding of the other kernel functions used in machine learning.

### Reference:
[Kernel Methods in Machine Learning](https://arxiv.org/pdf/math/0701907.pdf)

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)


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
