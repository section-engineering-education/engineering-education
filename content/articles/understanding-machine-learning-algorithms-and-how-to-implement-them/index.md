### Introduction 
Artificial Intelligence is growing at a dizzying speed. Machine learning is employed in practically every service we use daily. Machine learning is the study of creating and developing algorithms, which is how computers now learn. Machine learning is gaining popularity and becoming a key tool in industries including health, education, and business.

### Table of content
- [Understanding the classification of machine learning algorithms](#understanding-the-classification-of-machine-learning-algorithms)
- [Division of Machine Learning Algorithms](#division-of-machine-learning-algorithms)
- [Algorithims implementation](#algorithims-implementation)
- [Conclusion](#conclusion)

### Understanding the classification of machine learning algorithms
Machine learning algorithms are divided into four major types. They include:

1. Reinforcement Machine Learning
2. Supervised Machine Learning
3. Semi-supervised Machine Learning
4. Unsupervised Machine Learning

Let's look at one algorithm at a time for better understanding.

#### Reinforcement Machine Learning
Data scientists employ reinforcement learning to teach algorithms how to interact with data. This system learns by making errors and succeeding. Algorithms are trained to make decisions depending on the feedback and rewards they get. A data scientist designs an algorithm that performs a task and is then rewarded or punished. This is the reinforcing signal. Applications of reinforcement learning include resource management, video gaming, and robotics.

#### Supervised Machine Learning
Supervised learning is the application of existing knowledge to fresh data to predict future events. The algorithm is trained on a labeled dataset. It contains a set of input variables (x) and output variables (y) that identify the mapping function. New data entering the algorithm balances weights until the algorithm is suitably fitted. This ensures that the algorithm does not over-or under-fit the data. This kind of learning is important to businesses because it lets them recognize spam and place it in a separate folder from normal email.

Here are some examples of how supervised learning works:
- Regression modeling
- Ensembling
- Multi-class classification
- Binary classification

#### Semi-supervised machine learning 
This machine learning technique uses a little amount of labeled data and a large amount of unlabeled data to learn. So both supervised and unsupervised machine learning is present. Unsupervised learning predicts labels before feeding them to supervised techniques. This strategy improves learning precision.

Unsupervised learning is effective in the following situations:

- Labeling data
- Machine translation
- Fraud detection

#### unsupervised machine learning
Unsupervised learning, unlike supervised learning, focuses only on the input. The algorithm is taught using unlabeled, unstructured data. This technique focuses on systematic assessments of unclassified data. Algorithms can automatically organize data and uncover hidden patterns.
Unsupervised learning may be used in the following ways:

- Anomaly detection
- Association mining
- Dimensionality reduction
- Clustering

### Division of Machine Learning Algorithms
Problems in Machine Learning Algorithms are divided into two:

1. `Regression` – The dependent and independent variables have a continuous relationship. The dependent variables might be numeric or category.

2. `Classification`- it is the most typical issue statement in the actual world. The target variable has only two values (True/False, 0/1). The target variable in the Multinomial Classification problem has multiple classes (Apple, Orange, Mango). The target variable in ordinal classification is ordered (e.g., the grade of students).

Scientists and programmers devised programs or algorithms to examine data and anticipate outcomes. A tree-based algorithm is not linear. When the feature and the target variable are not linear, tree-based methods like Decision Tree, Random Forest, and Gradient Boosting are employed.

### Algorithms implementation
Currently, there are various Machine Learning algorithms available, and this number will only grow due to ongoing research. The initial algorithms you learn as a Data Scientist are linear and logistic regression, then more sophisticated algorithms.

Here we will look at some of the machine learning algorithms.
- Linear regression
- K-Nearest Neighbors

#### Linear regression
Linear regression is a prominent Machine Learning method. It is a statistical forecasting method. Linear regression predicts sales, salary, age, product price, etc.

A linear relationship exists between a dependent (y) and one or more independent variables (y). Since linear regression displays a linear connection, it finds how the dependent variable changes concerning the independent variable.

The linear regression model illustrates a sloping straight line between variables. Think about this:

![Image 1](image1)

Mathematically, linear regression is expressed as:

```bash
y= a0+a1x+ ε
```
where 

`Y` denotes the Dependent Variable, `X` denotes an independent variable, `a0` represents the line's intercept, `a1` is the coefficient of linear regression and `ε` is an abbreviation for random error.

Linear regression algorithms are divided into two:

- `Simple Linear Regression` uses a single independent variable to predict the value of a numerical dependent variable.
- `Many Linear Regression predicts the value of a numerical dependent variable using `multiple independent variables.`

##### Linear Regression Line
A regression line shows the relationship between two variables. As a consequence, a regression line may show

- `positive linear connection`- As the Y-axis of the dependent variable rises, so does the X-axis of the independent variable.

![Image 2](image2)

- `Negative Linear Relationship` -Y drops while X rises, indicating a negative linear relationship.

![Image 4](image4)

##### Choosing the best fit line
To find the best fit line in linear regression, we minimize the difference between predicted and actual values. The best fit line.

Using the cost function, we can find the optimum values for a0 and a1.

**Cost function**
- The cost function is used to estimate the coefficient values for the best fit line.
- The cost function optimizes regression coefficients. It evaluates a linear regression model.
- The cost function may be used to determine the mapping function's accuracy.These are Hypothesis functions.

If you use linear regression, you use the MSE cost function, which is the average of the predicted and actual values. It is spelled:

The mean square error (MSE) for the linear equation above may be determined as follows:

![Image 3](image3)

where `N` denotes the total number of observations, `Yi` is the actual value, and `(a1xi+a0)` predicted the value.

Alternatively, while using the python programming language, one can use the following code to find the best fit line.

```python
import matplotlib.pyplot as plt
plt.scatter(X, Y)

yfit = [a + b * xi for xi in X]
plt.plot(X, yfit)
```

Let's develop a Python linear regression model.

Assume you've been provided data singlevar.txt, which includes one variable. Data in this form has been broken down into several lines, each of which comprises an input value and an output value. Input parameter should be used.

For a collection of points, the line of best fit is `y = a + b * x.`
For this reason, use the following code.

```python

X = [0, 6, 11, 14, 22]
Y = [1, 7, 12, 15, 21]

def best_fit(X, Y):
   xbar = sum(X)/len(X)
   ybar = sum(Y)/len(Y)
   n = len(X) 

   numer = sum([xi*yi for xi,yi in zip(X, Y)]) - n * xbar * ybar
   denum = sum([xi**2 for xi in X]) - n * xbar**2

   b = numer / denum
   a = ybar - b * xbar

   print('best fit line:\ny = {:.2f} + {:.2f}x'.format(a, b))
   
   return a, b

a, b = best_fit(X, Y)

import matplotlib.pyplot as plt
plt.scatter(X, Y)
yfit = [a + b * xi for xi in X]
plt.plot(X, yfit)
plt.show()
best fit line:
y = 1.48 + 0.92x
```
The above code output the following 

![Image 11](image11)

This example uses the diabetes dataset's first feature to produce a two-dimensional regression graph. In linear regression, the residual sum of squares between observed and predicted responses is minimized by drawing a straight line.

#### K-Nearest Neighbors implementation
K-NN divides data into training and test samples. The k closest method is implemented as follows in a classification issue.

- k is the number of training instances in the feature space.
- Calculate unknown data points' distance from all training examples.
- Find the k observations closest to the unknown data point in the training data.
- Calculate the unknown data point's distance from the training set.
- The closest neighbor is the training data with the least value.
Lesser distances between training and sample points are indicated as closest neighbors in KNN regression. It forecasts the outcome using the whole sum's average.

##### How to Pick K Value
Because of this, the appropriate k value is picked.

- To boost performance, it is better to use a big k value.
- It will be possible to capture fine structures if they exist in the feature space by choosing k as a small value.
- As an example, an algorithm that works well on a training set may not perform well on unknown test data if k is too small, leading to overfitting.

**Distance Metrics**
The following methods may be used to compute distance:

1. Euclidian distance

![Image 5](image6)

2. Manhattan distance

![Image 6](image6)

3. Weighted distance

![Image 7](image7)

##### How to pick the Weights
The weighted distance approach may be utilized for both classification and regression issues. Assigning weights indicates the relative importance of each neighbor's contributions, with the closest neighbors receiving a higher weight, indicating a greater overall contribution.

Weighing options include:

- wi = 1/ k
- wi ∼ 1 − ||xi − xo ||
- wi ∼ k − rank ||xi − xo ||

**Improvement**

1. The first strategy suggests that giving various weights to the closest neighbors may enhance prediction. Significant traits have higher weights, whereas less important attributes receive lower weights.

2. Two traditional techniques help speed up the closest neighbor search.

for example 

![Image 8](image8)

We've got N locations in D-space and one unlabeled sample q. We need to identify the point closest to q. For big N and D, the KNN method is unworkable.

There are two conventional algorithms for speeding up the search.

1. `Bucketing technique:` The Bucketing technique divides space into identical cells, each containing a list of data items. The cells are evaluated in order of increasing distance from q, and the distance between each cell's internal data points and q is calculated. The search ends when the distance from q to the cell is greater than the nearest point previously visited.

2. `k-d trees`: A k-d tree is a high-dimensional binary search tree. Each internal node in a k-d tree has an orthogonal hyper-rectangle and hyperplane. By using the hyper-plane, you may divide the hyper-rectangle into two halves. Partitioning continues until the number of data points in the hyper-rectangle falls below n.

### Conclusion
Machine learning is a newer component of data science. It's time for company owners to fully use AI automation and machine learning. Humans and robots will soon work together to achieve even bigger technological marvels. Choose the finest machine learning approach. Collaboration between humans and machines will improve results.