---
layout: engineering-education
status: publish
published: true
url: /polynomial-regression-in-python/
title: Polynomial Regression in Python
description: In this article the reader will understand the theory of polynomial regression and implement it using libraries in Python.
author: faith-mwangangi
date: 2021-11-26T00:00:00-16:10
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/polynomial-regression-in-python/hero.png
   alt: Polynomial Regression example image
---
Polynomial regression is a machine learning model used to model non-linear relationships between dependent and independent variables.
<!--more-->
### Getting Started with Polynomial Regression in Python
Examples of cases where polynomial regression can be used include modeling population growth, the spread of diseases, and epidemics.

### Table of contents
- [Getting Started with Polynomial Regression in Python](#getting-started-with-polynomial-regression-in-python)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Introduction to Polynomial Regression](#introduction-to-polynomial-regression)
- [Polynomial curve fitting](#polynomial-curve-fitting)
  - [Obtaining the $\textbf w$](#obtaining-the-textbf-w)
- [Implementing the polynomial regression model](#implementing-the-polynomial-regression-model)
- [Step 1: Importing the libraries](#step-1-importing-the-libraries)
- [Step 2: Importing the dataset](#step-2-importing-the-dataset)
- [Step 3: Training the Linear Regression model on the whole dataset](#step-3-training-the-linear-regression-model-on-the-whole-dataset)
- [Step 4: Training the Polynomial Regression model on the whole dataset](#step-4-training-the-polynomial-regression-model-on-the-whole-dataset)
- [Step 5: The visualization of linear regression results](#step-5-the-visualization-of-linear-regression-results)
- [Step 6: The Polynomial Regression results visualization](#step-6-the-polynomial-regression-results-visualization)
- [Step 7: The Polynomial Regression results visualization (for higher resolution and smoother curve)](#step-7-the-polynomial-regression-results-visualization-for-higher-resolution-and-smoother-curve)
- [Step 8: A new result prediction with Linear Regression](#step-8-a-new-result-prediction-with-linear-regression)
- [Step 9: A new result prediction with Polynomial Regression](#step-9-a-new-result-prediction-with-polynomial-regression)
- [Conclusion](#conclusion)

### Prerequisites
A general understanding of Python and the Linear Regression Model will be helpful for the reader to follow along.

### Introduction to Polynomial Regression
Suppose we want to predict the value of a real-valued target variable $y$ using real-valued inputs of the observed variable $x$. Suppose our training set comprises of N training examples, with $\textbf x$ being features variable written $\textbf{x} ≡ (x_1 , . . . , x_N )^T$ , and a corresponding target variable $y$ given as, $\textbf{ y} ≡ (y_1 , . . . , y_N )^T$  with N = 10. 

Now, suppose we fit a polynomial curve on this data:

The obtained curve would look like the one in the figure below:

![Polynomial curve](/engineering-education/polynomial-regression-in-python/poly-regression.png)

Usually, when fitting a curve, the goal is to exploit the training set and learn the underlying regularities of the data to predict the target variable values on new values of the input variable $x$. The general task here is to discover the underlying function from which the training data was generated. 

To find this function, we need to generalize the ﬁnite data of the training set optimally. However, the training set is typically corrupted with random noise. This situation poses a challenge.

To have a valid generalization of the data, we need to minimize this noise. The noise here is nothing but the uncertainty associated with the actual value of $y$ we are trying to predict using the input value $x$.

### Polynomial curve fitting
The polynomial function we use to fit the data is of the form:

$y(x,\textbf{w})=w_0 + w_1x + w_2x^2 + , . . .,+ w_Mx^M=\sum_{j=0}^{M} w_jx^j$

Where;
- $M$ is the polynomial order.
- $x^j$ is input variable $x$ raised to the power $j$.
- $\textbf{w}=w_0 , .\ .\ . , w_M$ denotes a vector of weights.
  
From the polynomial hypothesis above, we note that this function $y(x, \textbf w)$ is a non-linear function of $x$. However, this function is a linear function of the weights $\textbf w$. Functions that are non-linear in the input variable but linear in the unknown set of the parameters are linear and fall under the *linear models* class. Thus a *polynomial regression* is a **linear model**.

Now the task is to determine the value of $\textbf w$ and $M$.

#### Obtaining the $\textbf w$
To determine the values of the coefﬁcients, we first ﬁt a polynomial to the training dataset. After that, we find the error function, i.e., $E(\textbf w)$, which measures the misﬁt between the fitted curve $y(x, \textbf w)$ and the data points of the training set. 

One of the most used error functions in machine learning is the sum of squares of the errors between the predictions $y(x_n, \textbf w)$ and the corresponding target values for each point $x_n$ $y_n$ fin the data. 

This error function is of the form:

$E(\textbf w)=\frac{1}{2}\sum ( {y(x_n , w) − y_n } )^2$

Where:
- The factor of 1/2 is introduced for later convenience.
- $y(x_n, w)$ is the predicted value from the model.
- $y_n$ is the actual value of the input variable.
  
The good thing with this error function is that it's non-negative, and it can be zero only and only if the function $y(x, \textbf w)$ passes exactly through each point of the training set.

To solve the problem of the curve ﬁtting, we choose the value of $\textbf w$ for which $E(\textbf w)$ is minimized as small as possible. Since the error function is quadratic, we can solve it using techniques such as the *Least Squares* or the *gradient descent* optimizer. 

We thus obtain the optimal set of the parameters $\textbf w$ for which $E(\textbf w)$ is minimized as small as possible. The unique set of solutions for $\textbf w$ we obtain through minimizing the error function is denoted as $\textbf w^\star$. From this, we represent our polynomial function as: $$y(x,\textbf w^\star)$$

Our only remaining discussion now is how we choose the value of $M$ for our polynomial function. Selecting a value of $M$ is a problem that results in the *model comparison* or *model selection*. It turns out that setting a value of $M$ too small may *underfit* our model, and setting it too large, may result in the problem of *over-fitting*. 

Hence a poor generalization of the data in both cases. Therefore, as the goal is to achieve good generalization, we need to select a value of $M$ that helps in generalizing the model better. Now that we know what a Polynomial Regression is let's use this knowledge and develop a prediction model.

### Implementing the polynomial regression model
The dataset we will use in this tutorial can be obtained from [here](https://github.com/Faith034/My-Data/blob/main/Position_Salaries.csv). Our task in this implementation session is to predict a team member's salary depending on their position level in the company. 

To make this session more enjoyable, we shall work along with both the linear regression and the polynomial regression to know when to choose a polynomial regression model over the linear regression model.

To get started, we import the required libraries for this session and load the dataset.

### Step 1: Importing the libraries
We import the following libraries:
```python
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

```

### Step 2: Importing the dataset
In this step, we import the dataset and create a dataframe.

```python
dataset = pd.read_csv('/content/drive/MyDrive/Position_Salaries.csv') # read the dataset
dataset

```

This code prints the following dataset.

![dataset](/engineering-education/polynomial-regression-in-python/polynomial-data.png)

This dataset contains information on how employees of a particular company are paid. 

The dataset contains the following information:
- Position Level: The level of the team members in that company. There are ten position levels in general.
- Salary: The salary of a team member. For different levels, there are significant differences in the salary. Thus, we need to find a way to generalize the data. 
- Splitting the data into features and labels
  
```python
X = dataset.iloc[:, 1:-1].values # extracts features from the dataset
y = dataset.iloc[:, -1].values # extracts the labels from the dataset

```

### Step 3: Training the linear regression model on the whole dataset
In this step, we will train the linear regression model on the entire dataset. The code below explains how this is done.

```python
from sklearn.linear_model import LinearRegression # import the Linear Regression model
lin_reg = LinearRegression() # creat model object
lin_reg.fit(X, y) # fits the model to the training data

```
#### Output

```bash
LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None, normalize=False)

```

The output indicates the linear regression model has been trained on the whole dataset.

### Step 4: Training the polynomial regression model on the whole dataset
In this step, we will train the polynomial regression model on the whole dataset. The code below explains how this is done.

```python
from sklearn.preprocessing import PolynomialFeatures # importing a class for Polynomial Regression
poly_regr = PolynomialFeatures(degree = 4) # our polynomial model is of order
X_poly = poly_regr.fit_transform(X) # transforms the features to the polynomial form
lin_reg_2 = LinearRegression() # creates a linear regression object
lin_reg_2.fit(X_poly, y) # fits the linear regression object to the polynomial features

```

#### Output
```bash
LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None, normalize=False)

```

The output indicates the polynomial regression model has been trained on the whole dataset.

### Step 5: The visualization of linear regression results 
In this step, we will plot the linear regression results. To visualize the results of this model, let's execute the following code.

```python
plt.scatter(X, y, color = 'red') # plotting the training set
plt.plot(X, lin_reg.predict(X), color = 'blue') # plotting the linear regression line
plt.title('Truth or Bluff (Linear Regression)') # adding a tittle to our plot
plt.xlabel('Position Level') # adds a label to the x-axis
plt.ylabel('Salary') # adds a label to the y-axis
plt.show() # prints our plot

```

The code above plots the data and fit a linear regression model on it, as shown below.

![graph](/engineering-education/polynomial-regression-in-python/linear-regression.png)

As seen from the plot above, the linear regression model does not fit the data well.

### Step 6: The polynomial regression results visualization
To visualize the polynomial regression results, let's execute the code below.

```python
plt.scatter(X, y, color = 'red') # plotting the training set
plt.plot(X, lin_reg_2.predict(poly_reg.fit_transform(X)), color = 'blue') # plotting the polynomial regression line
plt.title('Truth or Bluff (Polynomial Regression)') # adding a tittle to our plot
plt.xlabel('Position level') # adding a label to the x-axis
plt.ylabel('Salary') # adding a label to the y-axis
plt.show() # prints our plot

```

The code above plots the data and fit a polynomial regression model on it, as shown below.

![graph](/engineering-education/polynomial-regression-in-python/polynomial-2.png)

### Step 7: The polynomial regression results visualization (for higher resolution and smoother curve)
In this step, we plot the polynomial regression results on a higher resolution (100 points per axis) to get a smoother curve. To visualize the results of this model, let's execute the following code.

```python
X_grid = np.arange(min(X), max(X), 0.1) # choice of 0.1 instead of 0.01 to make the graph smoother
X_grid = X_grid.reshape((len(X_grid), 1)) # reshapes the array to be a matrix
plt.scatter(X, y, color = 'red') # plots the training set
plt.plot(X_grid, lin_reg_2.predict(poly_reg.fit_transform(X_grid)), color = 'blue') # plots a polynomial regression line
plt.title('Truth or Bluff (Polynomial Regression)') # adds tittle to the plot
plt.xlabel('Position level') # adds label to the x-axis
plt.ylabel('Salary') # adds label to the y-axis
plt.show() # prints our plot

```

The code above yields the plot below.

![graph](/engineering-education/polynomial-regression-in-python/polynomial-3.png)

### Step 8: A new result prediction with linear regression
Here, we predict a new output with the linear regression model. Let's execute the code below and see the output.

```python
lin_reg.predict([[6.5]]) # predicting a new result with linear regression

```

Upon executing the code above, the output should be:

```bash
array([330378.78787879])

``` 

The variable $X=6.5$ is exact between $X=6$ and $X=7$. Thus we expect the model to predict a salary value between 150000 and 200000. With linear regression, this is not the case. 

It overshoots the expected salary actually by almost two times. This indicates that linear regression is not suitable for this problem.

### Step 9: A new result prediction with polynomial regression
Here, we predict a new output with the polynomial regression model. Let's execute the code below and see the output.

```python
lin_reg_2.predict(poly_reg.fit_transform([[6.5]]))

```


```bash
array([158862.45265155])

```

Executing the code above returns a predicted salary as 158862.45265155. This value lies within the range of our expectations, and thus we can conclude the polynomial regression is suitable for this problem.

### Conclusion
In this session, we have learned the knowledge behind the polynomial regression. Specifically, we learned how to obtain an optimal set of the parameters from the error function and avoid underfitting and overfitting in polynomial regression. 

Then we implemented this model on a real dataset, and we were able to visualize its graph and use it to make predictions. I hope this session has been helpful, and we can now apply this knowledge comfortably to other datasets.
 
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
