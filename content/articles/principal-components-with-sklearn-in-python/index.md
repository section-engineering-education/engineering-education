---
layout: engineering-education
status: publish
published: true
url: /principal-component-analysis-with-sklearn-in-python/
title: Implementing Principal Component Analysis (PCA) using Scikit learn in Python
description: This tutorial will be an introduction to understanding dimensional reduction using PCA. We will also implement PCA algorithm using Scikit learn in Python.
author: nelson-ruto
date: 2021-11-06T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/principal-component-analysis-with-sklearn-in-python/hero.png
    alt: Implementing Principal Component Analysis Python Image
---
In the modern world, datasets generated from real-world sources such as social media and IoT are highly rich in information. This information is captured by many contributing features that lead the data to a high-dimensional space.
<!--more-->
Usually, some of these features are correlated, and therefore, not all of them are important to the data. As a result, it poses a challenge to figure out which feature is relevant and irrelevant in the data.

Such a task requires us to do some dimensional data analysis. This brings to the idea of **dimensionality reduction**.

### Table of contents
- [Introduction](#introduction)
- [Dimensionality reduction](#dimensionality-reduction)
- [Principle Component Analysis (PCA)](#principle-component-analysis-pca)
- [Prerequisites](#prerequisites)
- [Implementing the *PCA*](#implementing-the-pca)
  - [Step 1: Data preprocessing](#step-1-data-preprocessing)
  - [Step 2: Applying *PCA* to the dataset](#step-2-applying-pca-to-the-dataset)
  - [Step 3: Training the logistic model on the new training dataset](#step-3-training-the-logistic-model-on-the-new-training-dataset)
  - [Step 4: Printing the confusion matrix and the accuracy of our logistic regression model.](#step-4-printing-the-confusion-matrix-and-the-accuracy-of-our-logistic-regression-model)
  - [Step 5: Visualizing the training set result](#step-5-visualizing-the-training-set-result)
  - [Step 6: Visualizing the test set result](#step-6-visualizing-the-test-set-result)
  - [Conclusion](#conclusion)
- [References](#references)

### Dimensionality reduction
Usually, machine learning models are prone to the [curse of dimensionality](https://analyticsindiamag.com/curse-of-dimensionality-and-what-beginners-should-do-to-overcome-it/).

However, with the aid of *dimensionality reduction*, it's possible to find an effective solution to this problem.

In machine learning and statistics, *dimensionality* means the number of features in a dataset.

We can define *dimensionality reduction* as a technique used when reducing the number of unwanted features in a dataset, i.e., to make a high-dimensional space into a low-dimensional space.

According to the *dimensionality reduction*, we need to analyze our features space and choose a subset of relevant features from such dataset. This subset is then used in future modeling.

The *dimensionality reduction* can be done in several ways, a few includes:
- Principal Component Analysis
- [Linear Discriminant Analysis (LDA)](/engineering-education/linear-discriminant-analysis/)
- [Kernel PCA](en.wikipedia.org/wiki/Kernel_principal_component_analysis)
- [Canonical Correlation Analysis (CCA)](https://en.wikipedia.org/wiki/Canonical_correlation)

When detailing linearly separable high dimensional data, *PCA* is the most used technique for *dimensionality reduction*.

Since, we now have an idea of what *dimensionality reduction* is, let's turn to our topic of interest which is PCA.

### Principle Component Analysis (PCA)
The *PCA* algorithm, a *dimensionality reduction* technique, which reduces the dimension of a dataset by projecting a `d`- dimensional features space onto a `k`- dimensional subspace, where `k` is less than `d`.

The *PCA* creates new features from the existing ones by projecting all dependent features onto a new feature constructed in such a way that the projection error is minimized.

This technique can guarantee credible results only if the data is linearly separable.

*PCA* algorithm can be used in feature extraction, stock market prediction, gene analysis, and much more.

PCA involves the following steps:
1. Standardizing the data.
2. Determining the [eigenvalues](mathworld.wolfram.com/Eigenvalue.html) and the [eigenvectors](mathworld.wolfram.com/Eigenvector.html) from the [covariance](en.wikipedia.org/wiki/Covariance_matrix) or [correlation matrix](corporatefinanceinstitute.com/resources/excel/study/correlation-matrix).
3. Sort the eigenvalues in descending order.
4. Choose the first `k` eigenvectors corresponding to the `k` largest eigenvalues, where `k` is the dimension of the new features space, and it's such that $(k<d)$.
5. Constructing a projection matrix `M` from the selected `k` eigenvectors.
6. Transform the original dataset `X` via `M` to obtain the new `k`- dimensional feature subspace `Y`.

For more knowledge on the mathematical concepts behind the PCA algorithm, you can refer to this [article](/engineering-education/image-compression-using-pca/).

Now, let's learn how to implement the *PCA algorithm* using the sklearn library in Python with tabular data.

### Prerequisites
- Python installed on your computer
- Python programming skills
- A dataset
  
### Implementing the PCA
In our implementation, we will use a dataset that consists of features of different types of wine with a categorical study variable to which a wine belongs.

Our task is to apply *PCA* to this dataset to reduce its complexity by reducing the dimension of its features.

You can download the dataset [here](https://github.com/nelsonnrl/data/blob/main/Wine.csv).

Below are steps to follow in this session:

#### Step 1: Data preprocessing
Let's import our data to the working space and look at its first five rows using the `head()` function.

```python
# importing libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
# importing the dataset.
dataset = pd.read_csv('/content/drive/MyDrive/Wine.csv')
# Have a look at the dataset first five records
dataset.head()
```

#### Output

![image](/engineering-education/principal-component-analysis-with-sklearn-in-python/image.png)

As we can see, our data has 13 features and a target variable.

Each row is a type of wine. These wines have features ranging from the alcohol level to the proline and a customer segment to which such wine belongs. 

In total, we have three segments, i.e., segments 1, 2, and 3. Customers in each segment have the same preference for any wine that belongs to that segment.

Now that, we understand the dataset, let's carry out a *dimensionality reduction* using PCA on this data and develop a less complex dataset.

The reduced dimensionality dataset should provide an excellent way for future models to learn the correlation between these features.

To examine this, we will further implement a logistic regression on the dimensionality reduced dataset and examine its performance using a confusion matrix.

Let's run the code below and get our data ready to apply *PCA* on.

```python
# Splitting the data into features and target sets
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
# splitting the data into the training and test set.
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
# Feature scalling
from sklearn.preprocessing import StandardScaler
stndS = StandardScaler()
X_train = stndS.fit_transform(X_train)
X_test = stndS.transform(X_test)
```

#### Step 2: Applying PCA to the dataset
To apply the PCA to our dataset, we will do so separately on the training and test sets as shown:

```python
# Importing the PCA class from the decomposition module in sklearn
from sklearn.decomposition import PCA
# create a PCA object
pca = PCA(n_components = 2)# extracted features we want to end up within our new dataset(2).
# Apply the above object to our training dataset using the fit method.
X_train = pca.fit_transform(X_train)
# Apply the PCA object to the test set only to transform this set
X_test = pca.transform(X_test)
```

Here, we specify the number of principal components to `2` and transform the training and test dataset. So, an `N`- dimensional dataset is reduced to a `2`- dimensional dataset.

#### Step 3: Training the logistic model on the new training dataset
Here, we will build a [logistic regression](https://towardsdatascience.com/logistic-regression-detailed-overview-46c4da4303bc) on the new training set.

```python
# Importing the LogisticRegression class from the linear_model module in sklearn
from sklearn.linear_model import LogisticRegression
# create object of the above classifier
clfy = LogisticRegression(random_state = 0) # pass seed to ensure results are reproducible
clfy.fit(X_train, y_train) # calls fit method from the classifier object to fit the data to our model
```

#### Step 4: Printing the confusion matrix and the accuracy of our logistic regression model

```python
# Importing the confusion_matrix and accuracy_score class from the metrics module in sklearn
from sklearn.metrics import confusion_matrix, accuracy_score
y_pred = clfy.predict(X_test) # calls a predict method from the classfier object to target variable of the X_test
# creating a confussion matrix
cm = confusion_matrix(y_test, y_pred)
print(cm)
# model score
accuracy_score(y_test, y_pred) 
```

#### Output

```bash
[[14  0  0]
 [ 1 15  0]
 [ 0  0  6]]
0.9722222222222222
```

In the output above, it's clear that the model we implemented on the new dataset has an accuracy of `97.2%`. This indicates that not only the PCA was able to reduce the model complexity, by reducing the number of features, but it also was able to preserve a lot of the information in the dataset.

The initial dataset (before reducing the dimensionality) on implementation yields an accuracy of `100%`.

However, though very accurate, that model with thirteen features is too complex, and it's likely to suffer from the [dimensionality curse](https://analyticsindiamag.com/curse-of-dimensionality-and-what-beginners-should-do-to-overcome-it/).

Since the PCA can simplify a model and still preserve its performance simultaneously, this proves its power.

With its help, datasets in high dimensions can be reduced to low dimensions so that it is possible to carry out visualization on them.

For instance, it would be impossible to visualize our dataset in thirteen dimensionalities. However, upon reducing it to two dimensionalities, it's possible to have visualization as follows.

#### Step 5: Visualizing the training set result

```python
from matplotlib.colors import ListedColormap
X_set, y_set = X_train, y_train
# Create a rectangular grid out of the array of X_set values
X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1, stop = X_set[:, 0].max() + 1, step = 0.01),
                     np.arange(start = X_set[:, 1].min() - 1, stop = X_set[:, 1].max() + 1, step = 0.01))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha = 0.75, cmap = ListedColormap(('red', 'green', 'blue')))
plt.xlim(X1.min(), X1.max()) # Sets the x limits on the current axis
plt.ylim(X2.min(), X2.max()) # Sets the y limit on the current axis
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1], # create a scatter plot using X_set and y_set of the traing set
                c = ListedColormap(('red', 'green', 'blue'))(i), label = j) # creating a colarmap of discrete colour levels                             
plt.title('Logistic Regression (Training set)') # adds a tittle to the plot
plt.xlabel('PC1') # labels the x-axis
plt.ylabel('PC2') # labels the y-axis
plt.legend() # Creating a key to the plot
plt.show() # displays the scatter plot

```
#### Output

![image](/engineering-education/principal-component-analysis-with-sklearn-in-python/image.png)

#### Step 6: Visualizing the test set result
```python
from matplotlib.colors import ListedColormap
X_set, y_set = X_test, y_test
# Create a rectangular grid out of the array of X_set values
X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1, stop = X_set[:, 0].max() + 1, step = 0.01),
                     np.arange(start = X_set[:, 1].min() - 1, stop = X_set[:, 1].max() + 1, step = 0.01))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha = 0.75, cmap = ListedColormap(('red', 'green', 'blue')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1], # creating a scatter plot using X_set and y_set of the test set
                c = ListedColormap(('red', 'green', 'blue'))(i), label = j) # creating a colarmap
plt.title('Logistic Regression (Test set)') # adding a tittle to the plot
plt.xlabel('PC1') # labels the x-axis
plt.ylabel('PC2') # labels the y-axis
plt.legend() # creates a key to the plot
plt.show()  # shows the scatter plot
```

#### Output

![image](/engineering-education/principal-component-analysis-with-sklearn-in-python/logistic-test-set.png)

### Conclusion
In this article, we've learned the steps involved in the PCA algorithm, and we implemented the same in python.

Our implementation showed the importance of reducing the complexity of a model and enhancing visualization by reducing high dimension features to low visible dimensions using PCA.

Now that we have seen how great this algorithm is, we can apply it to other datasets with larger dimensions and get rid of the computational cost associated with such high dimensions.

Happy coding!

### References
- [More on Curse of Dimensionality and Dimension Reduction](https://www.cs.princeton.edu/courses/archive/fall15/cos521/lecnotes/lec12.pdf)
- [More on Data preprocessing](/engineering-education/data-preprocessing-python/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)