---
layout: engineering-education
status: publish
published: true
url: /understanding-machine-learning-algorithms-and-how-to-implement-them/
title: Understanding machine learning algorithms and how to Implement them
description: This article will cover basic concept of machine learning algorithms and how to Implement them elements.
author: kelvin-munene
date: 2022-01-10T00:00:00-04:26
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/hero.png
    alt: algorithm ML image
---
Artificial Intelligence is growing at a dizzying speed. Machine learning is employed in practically every service we use daily.
<!--more-->
Machine learning is the study of creating and developing algorithms, which computers now learn. It is gaining popularity and becoming a key tool in the health, education, and business industries.

### Table of contents
- [Understanding the classification of machine learning algorithms](#understanding-the-classification-of-machine-learning-algorithms)
- [Division of Machine Learning Algorithms](#division-of-machine-learning-algorithms)
- [Algorithims implementation](#algorithims-implementation)
- [Conclusion](#conclusion)

### Understanding the classification of machine learning algorithms
Machine learning algorithms are divided into four major types. 

They include:
1. Reinforcement Machine Learning
2. Supervised Machine Learning
3. Semi-supervised Machine Learning
4. Unsupervised Machine Learning

Let's look at one algorithm at a time for better understanding.

#### Reinforcement Machine Learning
Data scientists employ reinforcement learning to teach algorithms how to interact with data. This system learns by making errors and succeeding.

Algorithms are trained to make decisions depending on the feedback and rewards. For example, a data scientist designs an algorithm that performs a task and is rewarded or punished.

This is the reinforcing signal. Applications of reinforcement learning include resource management, video gaming, and robotics.

#### Supervised Machine Learning
Supervised learning applies existing knowledge to fresh data to predict future events. The algorithm is trained on a labeled dataset.

It contains a set of input variables (x) and output variables (y) that identify the mapping function. New data entering the algorithm balances weights until the algorithm is suitably fitted.

This ensures that the algorithm does not over-or under-fit the data. This learning is important to businesses because it lets them recognize spam and place it in a separate folder from normal email.

Here are some examples of how supervised learning works:
- Regression modeling
- Ensembling
- Multi-class classification
- Binary classification

#### Semi-supervised machine learning
This machine learning technique uses a small amount of labeled data and a large amount of unlabeled data to learn. So both supervised and unsupervised machine learning is present.

Unsupervised learning predicts labels before feeding them to supervised techniques. This strategy improves learning precision.

Unsupervised learning is effective in the following situations:
- Labeling data
- Machine translation
- Fraud detection

#### Unsupervised machine learning
Unsupervised learning, unlike supervised learning, focuses only on the input. The algorithm is taught using unlabeled, unstructured data.

This technique focuses on systematic assessments of unclassified data. Algorithms can automatically organize data and uncover hidden patterns.

Unsupervised learning may be used in the following ways:
- Anomaly detection
- Association mining
- Dimensionality reduction
- Clustering

### Division of machine learning algorithms
Problems in Machine Learning Algorithms are divided into two:

1. `Regression` - The dependent and independent variables have a continuous relationship. The dependent variables might be numeric or category.

2. `Classification` is the most typical issue statement in the actual world. The target variable has only two values (True/False, 0/1). The target variable in the Multinomial Classification problem has multiple classes (Apple, Orange, Mango). The target variable in ordinal classification is ordered (e.g., students' grades).

Scientists and programmers devised programs or algorithms to examine data and anticipate outcomes. A tree-based algorithm is not linear.

When the feature and the target variable are not linear, tree-based methods like Decision Tree, Random Forest, and Gradient Boosting are employed.

### Algorithms implementation
Currently, there are various machine learning algorithms available, and this number will only grow due to ongoing research.

The initial algorithms you learn as a data scientist are linear and logistic regression, then more sophisticated algorithms.

Here we will look at some of the machine learning algorithms.
- Linear regression
- K-Nearest Neighbors

#### Linear regression
Linear regression is a prominent machine learning method. It is a statistical forecasting method. Linear regression predicts sales, salary, age, product price, etc.

A dependent `(y)` has a linear connection with one or more independent variables `(y)`.

Since linear regression displays a linear connection, it finds how the dependent variable changes concerning the independent variable. It shows a straight line connecting variables.

![Linear regression](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/linear-regression.png)

Linear regression is stated mathematically as:

```bash
y= a0+a1x+ ε
```

`Y` denotes the Dependent Variable, `X` denotes an independent variable, `a0` represents the line's intercept, `a1` is the linear regression coefficient, `ε` is an abbreviation for random error.

Linear regression algorithms are divided into two:

- `Simple Linear Regression` uses a single independent variable to predict the value of a numerical dependent variable.

- `Many Linear Regression` predicts the value of a numerical dependent variable using `multiple independent variables`.

##### Linear Regression Line
This graph depicts the association between two variables. As a result, a regression line appears.

- `Positive linear connection`- Axis of the dependent variable increases as the independent variable X rises.

![Positive linear connection](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/positive-linear-connection.png)

- `Negative Linear Relationship` -Y drops while X rises, indicating a negative linear relationship.

![Negative Linear Relationship](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/negative-linear-relationship.png)

##### Choosing the best fit line
In linear regression, the best fit line has the least anticipated and actual values. The ideal line.

Using the cost function, we can find the optimum values for `a0` and `a1`.

**Cost function**
- The cost function may be used to determine the mapping function's accuracy. These are Hypothesis functions.

- It maximizes regression coefficients. It assesses a linear regression.

- The cost function estimates the best fit line's coefficients.

Using linear regression, you employ the MSE cost function (average of anticipated and actual values). It is spelled:

The mean square error (MSE) for the linear equation above may be determined as follows:

![MSE Formula](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/mse-formula.png)

Where `N` denotes the total number of observations, `Yi` is the actual value, and `(a1xi+a0)` predicted the value.

#### K-Nearest Neighbors implementation
K-NN divides data into training and test samples. The `k` closest method is implemented as follows in a classification issue.

- `k` is the number of training instances in the feature space.

- Calculate unknown data points' distance from all training examples.

- Find the `k` observations closest to the unknown data point in the training data.

- Calculate the unknown data point's distance from the training set.

- The closest neighbor is the training data with the least value.

Lesser distances between training and sample points are indicated as closest neighbors in KNN regression. Finally, it forecasts the outcome using the whole sum's average.

##### How to Pick K Value
Because of this, the appropriate `k` value is picked.

- To boost performance, it is better to use a big `k` value.

- It will be possible to capture fine structures if they exist in the feature space by choosing k as a small value.

For example, an algorithm that works well on a training set may not perform well on unknown test data if `k` is too small, leading to overfitting.

**Distance metrics**
The following methods may be used to compute distance:

1. Euclidian distance

![Euclidian distance formula](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/euclidian-distance.png)

2. Manhattan distance

![Manhattan distance formula](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/manhattan-distance.png)

3. Weighted distance

![Weighted distance formula](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/weighted-distance.png)

##### How to pick the weights
The weighted distance approach may be utilized for both classification and regression issues.

Assigning weights indicates the relative importance of each neighbor's contributions, with the closest neighbors receiving a higher weight indicating a greater overall contribution.

Weighing options include:
- wi = 1/ k
- wi ∼ 1 − ||xi − xo ||
- wi ∼ k − rank ||xi − xo ||

**Improvement**
1. The first strategy suggests that giving various weights to the closest neighbors may enhance prediction. Significant traits have higher weights, whereas less important attributes receive lower weights.

2. Two traditional techniques help speed up the closest neighbor search.

For example:

![Illustration of two traditional techniques](/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/improvement-graph.png)

We've got N locations in D-space and one unlabeled sample q. We need to identify the point closest to q. For big N and D, the KNN method is unworkable.

There are two conventional algorithms for speeding up the search:

1. `Bucketing technique:` The Bucketing technique divides space into identical cells, each containing a list of data items.  

The cells are evaluated to increase the distance from q, and the distance between each cell's internal data points and q is calculated.

The search ends when the distance from q to the cell exceeds the nearest point previously visited.

2. `k-d trees`: A k-d tree is a high-dimensional binary search tree. Each internal node in a k-d tree has an orthogonal hyper-rectangle and hyperplane.

By using the hyper-plane, you may divide the hyper-rectangle into two halves. Partitioning continues until the number of data points in the hyper-rectangle falls below n.

### Conclusion
Machine learning is a newer component of data science. It's time for company owners to use AI automation and machine learning fully.

Humans and robots will soon work together to achieve even bigger technological marvels. Choose the finest machine learning approach. Collaboration between humans and machines will improve results.

Happy learning!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
