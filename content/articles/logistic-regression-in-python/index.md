###Getting started with Logistic Regression in python
Logistic regression is a popular algorithm in machine learning that is widely used in classification problems. Some of the classification problems where the logistic regression offers a good solution are:
- Classifying whether an email is a spam or not spam.
- Predicting whether a customer continues to be a plying client to a business or they exit(Customer churn).
- Classifying whether a transaction is a fraud or not fraud.
- Classifying whether a tumour is malignant or benign.

In all these problems, the objective is to predict the chances of our target variable being positive. In the above problems, the target variable can only take two possible values, i.e.,
y $\in$ {0,1}
Where:
0: Indicates the absence of the problem, i.e., the Negative class.
1: Indicates the presence of the problem, i.e., the Positive class.
This kind of classification problem where the target variable can only take two possible classes is called **Binary classification**. There are other cases where the target variable can take more than two classes. This kind of classification is called **multi-class classification**.

To develop a classifying algorithm, we make use of classification algorithms on the training set. The possible algorithms we can approach the classification problem with are linear regression, logistic regression, etc. When we use linear regression, we fit a straight line to the training data set. We then obtain a hypothesis function of the form:

$h_\theta$($\it x$) = $\theta^{T}$$\it x$

To make predictions, we threshold the output of our hypothesis function at 0.5. If the hypothesis output is such that:


$h_\theta$($\it x$) $\geq$ 0.5 we predict y = 1.

$h_\theta$($\it x$) $<$ 0.5 we predict y = 0.

Using linear regression, it turns out that some data points may end up misclassified. Also, it is possible for the linear hypothesis to output values that are greater than one or less than 0. This possibility does not align with the possible values of our target variable, i.e., y $\in$ {0,1}. Thus, it indicates that using linear regression for classification problems is not a good idea.

To ensure all our predicted values fall between 0 and 1, we use the **Logistic regression**.

#### Logistic regression hypothesis representation
As we mentioned above, the logistic regression ensures all the hypothesis outputs are between 0 and 1. This property makes it suitable for predicting y(target variable). In other words, it predicts the probability of a specific feature to be in a particular class. To obtain the logistic regression hypothesis, we apply some transformations to the linear regression. Initially, we saw that our linear hypothesis representation was of the form:

$h_\theta$($\it x$) = $\theta^{T}$$\it x$

To obtain a logistic regression, we apply an activation function known as sigmoid function to this linear hypothesis, i.e.,

$h_\theta$($\it x$) = $\sigma$ ($\theta^{T}$$\it x$)

 From our logistic hypothesis function, we can define:

 z = $\theta^{T}$$\it x$

Hence;

$h_\theta$($\it x$) = $\sigma$ (z) = g(z)

g(z) is thus our logistic regression function and is defined as,

g(z) $=$ $\frac{1}{1 + e^{-z}}$

 The logistic function is also called the sigmoid function. Our logistic hypothesis representation is thus;

$h_\theta$($\it x$) $=$ $\frac{1}{1 + e^{-z}}$


Below is a graphical representation of a logistic function. The graph was obtained by plotting g(z) against z.

![graph](/engineering-education/logistic-regression-in-python/graph.png)

In the graph above, we notice that, the logistic function is asymptote at g(z) = 1 and g(z) = 0. It cuts the g(z) axis at an exact 0.5. We thus take 0.5 as our classifier threshold.


#### Understanding the output of the logistic hypothesis
When our hypothesis predicts a value, i.e., 0 $\leq$ $h_\theta$($\it x$) $\geq$ 1, we interpret that value as an approximated probability that y is 1.

For example,
Suppose we have a feature set X and want to predict wether a transaction is fraudelent or not. 
X is defined as;
X = $\begin{bmatrix}
    x_{0}\\
    x_{1}
\end{bmatrix}$ = $\begin{bmatrix}
    1\\
    creditcard
\end{bmatrix}$

Suppose we predict our feature X, and the hypothesis yields 0.8. The output means that, for a transaction with feature X, there are 80% chances that the transaction is fraudulent, i.e., y = 1.

Therefore we can express our hypothesis function as follows.

$h_\theta$($\it x$) = P( y = 1 | $\it x$; $\theta$)

From the probability rule, it follows that;

P( y = 0 | $\it x$; $\theta$) = 1 - P( y = 1 | $\it x$; $\theta$)

#### Decision Boundary  in Logistic regression
As we mentioned earlier, the task is to classify whether the given feature falls in class 1 or 0. Whenever $h_\theta$($\it x$) $\geq$ 0.5, we predict y = 1 . The reason is that when $h_\theta$($\it x$) $\geq$ 0.5, it is more likely for y to be 1 than to be 0.
From the *Logistic regression hypothesis* representation plot above, we notice that:
 >g(z) $\geq$ 0.5 
 Whenever z $\geq$ 0
 We know;
$h_\theta$($\it x$) = g($\theta^{T}$$\it x$) $\geq$ 0.5
It follows;
$\theta^{T}$$\it x$  $\geq$ 0
Thus;
y = 1 whenever
$\theta^{T}$$\it x$  $\geq$ 0

The same intuation holds for y = 0, i.e.,

>g(z) $\ <$ 0.5 
Whenever z $\ <$0
We know;
$h_\theta$($\it x$) = g($\theta^{T}$$\it x$) $\ <$ 0.5
It follows that;
$\theta^{T}$$\it x$  $\ <$ 0
Thus;
y = 0 whenever
$\theta^{T}$$\it x$  $\ <$ 0

From the above caes we can summarise that:
>$\theta^{T}$$\it x$  $\geq$ 0 $ \implies$ y = 1
$\theta^{T}$$\it x$  $\ <$ 0 $ \implies$ y = 0

Now that we know when the prediction is positive or negative, let us define the **decision boundary**. The *decision boundary* is simply a line that separates y = 0 from y = 1. It is the hypothesis function that creates the decision boundary and not the dataset set. With an example, let us understand it better.

Let's define $\theta$ such that;
$\theta$ = $\begin{bmatrix}
    3\\
    -1\\
    0
\end{bmatrix}$
 To obtain decision boundary,
 First we define our $\theta^{T}$$\it x$, i.e.,
 >$\theta^{T}$$\it x$ = 3 + -$\it x_1$ + 0$\it x_2$
 y = 1 when 3  -$\it x_1$ + 0$\it x_2$ $\geq$ 0
 3 - $\it x_1$ $\geq$ 0
-$\it x_1$ $\geq$ - 3
$\it x_1$ $\leq$ 3

From our example, we get a verticle decision boundary line through the point $\it x_1$ = 3, and all points that fall on the left-hand side of our decision boundary belong to y = 1. Even though we obtain a decision boundary in the form of a straight line, in this case, it is possible to get non-linear and much complex decision boundaries.  This situation arises when we are dealing with polynomial functions. To this point, we now know the decision boundary in logistic regression and how to compute it.

### Logistic cost function
The  Logistic cost function is of the form:
>J($\theta$) = $\frac{1}{m}$ $\sum_{i=1}^{m}$ Cost($h_\theta$($\it x^{(i)}$), y$^{(i)}$)
where;
Cost($h_\theta$($\it x^{(i)}$), y$^{(i)}$) = $-$log($h_\theta$($\it x^{(i)}$)           if y = 1
Cost($h_\theta$($\it x^{(i)}$), y$^{(i)}$) = $-$log(1$-$$h_\theta$($\it x^{(i)}$)       if y = 0

Let us examine how this cost function behaves with the aid of a graph.

![Logistic cost function](/engineering-education/logistic-regression-in-python/logistic_cost_function.png)

- For **Cost($h_\theta$($\it x$), y) = $-$ log($h_\theta$($\it x$))**, we obtain a graph of the form: 
From the plot above, our cost function has one desireable property. When the predicted value, $h_\theta$($\it x^{}) = $ 1 and it turns out that the actual value y = 1, then the cost our algorithm faces is 0. Also,
as;
$h_\theta$($\it x)$ $\rightarrow$ 0
Cost $\rightarrow$ $\infty$

- For **Cost($h_\theta$($\it x$), y) = $-$ log(1$-$$h_\theta$($\it x$))**, we obtain the plot below.
From the plot, we notice that,
If $h_\theta$($\it x$) = 0 and it turns out that the y = 0, 
then the cost our algorithm face is 0, i.e.,
Cost = 0
We also notice that,
$h_\theta$($\it x)$ $\rightarrow$ 1
Cost $\rightarrow$ $\infty$
This behaviour makes sense because we expect the algorithm to be penalized with a large amount when it predicts 1 when the actual value is indeed 0.

We can combine the two cases of our cost function into one equation and obtain our cost function as:

Cost($h_\theta$($\it x$), y) = $-$ ylog($h_\theta$($\it x$) $-$ (1 $-$y)log(1$-$$h_\theta$($\it x$)
From this cost function, we notice that the second part is 0 when y = 1 and the first part is zero when y = 0, and thus we retained the distinct property of our initial cost functions. At this point, we can now write the full cost function as:

J($\theta$) = $\frac{1}{m}$ $\sum_{i=1}^{m}$ $-$ ylog($h_\theta$($\it x$) $-$ (1 $-$y)log(1$-$$h_\theta$($\it x$) 
Above is our logistic cost function.

 To obtain our logistic classifier, we need to fit parameter $\theta^{T}$ to our hypothesis h$_\theta$($\it x$). One way we can obtain these parameters is by minimizing the cost function. To do this, we make use of an optimization algorithm known as **Gradient descent**.

Below is the general form of the gradient descent algorithm.
>      Repeat{
       >$\theta_j$ :$=$ $\theta_j$ $-$ $\alpha$ $\frac{δ}{δθ_j}$J($\theta$)
                            > (Update all $\theta_j$ simultenously)
 }

On our cost function J($\theta$), we develop the gradient descent algorithm as follows:

J($\theta$) = $\frac{1}{m}$ $\sum_{i=1}^{m}$ $-$ ylog($h_\theta$($\it x$) $-$ (1 $-$y)log(1$-$$h_\theta$($\it x$) 
We want **Min$_\theta$ J($\theta$):**

*Gradient descent algorithm*
>Repeat{
         $\theta_j$ :$=$ $\theta_j$ $-$ $\frac{α}{m}$ $\sum_{i=1}^{m}$($h_\theta$($\it x^{(i)}$ $-$ y$^{(i)}$) $\it x_j^{(i)}$
                            (update all $\theta_j$ simultenously)
 }

When implementing this algorithm, it turns out that it runs much faster when we use a vectorized version of it rather than using a for-loop to iterate over all training examples.
Below is the vectorized version of the gradient descent algorithm.

>$\theta$ :$=$ $\theta$ $-$ $\frac{α}{m}$ $\it X^{T}$ (g($\it X$$\theta$) $-$ $\vec{y}$)



### Python Implementation of Logistic regression
Our implementation will use a company's records on customers who previously transacted with them to build a logistic regression model. This model should predict which of these customers is likely to purchase any of their new product releases. Upon predicting, the company can now target these customers with their social network ads.

The steps below outline how we achieve this in python:

### Step 1: Data Preprocessing
The code block below carries out this task.

```python
# Import the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
# Importing the dataset
snA_data = pd.read_csv('/content/drive/MyDrive/Social_Network_Ads.csv')
X = snA_data.iloc[:, :-1].values
Y = snA_data.iloc[:, -1].values
# Splitting dataest into the training and test set
from sklearn.model_selection import train_test_split
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.25, random_state = 0)
# Scalling up our features set
from sklearn.preprocessing import StandardScaler
stand_S = StandardScaler()
X_train = stand_S.fit_transform(X_train)
X_test = stand_S.transform(X_test)

```
### Step 2: Training a logistic regression model
From the linear_model module in the scikit learn, we first import the `LogisticRegression` class to train our model.
```python
from sklearn.linear_model import LogisticRegression
# Create the model
clf = LogisticRegression(random_state = 0)
# fit the model on our training dataset
clf.fit(X_train, Y_train)

```
Now that we have built our model, let us use it and make the prediction.
### Step 3: Predicting the test set
Before we can predict our test set, let us predict a single data example.

```python
# Making a single observation prediction
print(clf.predict(stand_S.transform([[32, 150000]])))

```
**Output**
```bash
[1]

```
We predicted the third example of our dataset, and it turned out our model did a great job as the prediction was correct. So now, let us predict our test set.

```python
y_pred = clf.predict(X_test)
print(np.concatenate((y_pred.reshape(len(y_pred),1), Y_test.reshape(len(Y_test),1)),1))

```

### Evaluating the performance
Here we shall print the confusion matrix, showing us the number of correctly predicted 1,s and 0,s our model made. Also, it will show us the number of the wrong prediction our model made in both cases. In the same part, we shall still determine the accuracy of our model. To carry out this task, we run the following code:


```python
from sklearn.metrics import confusion_matrix, accuracy_score
cfm = confusion_matrix(Y_test, y_pred)
print(cfm)
accuracy_score(Y_test, y_pred)

```
**Output**
```bash
[[65  3]
 [ 8 24]]
0.89

```
From our output above, we see that our model predicted 65 negatives and 24 positives correctly. However, it misclassified three positives and eight negatives. Out of 100 test set examples, the model classified 89 observations correctly, with only 11 incorrectly classified. Hence, our model is 89% accurate. It thus indicates, our model is performing better.

At this point, we have reached the end of our python implementation.

### Conclusion
In this article, we looked at the intuition behind logistic regression and lastly learned how to implement it in python. I hope we found this content helpful and we all enjoyed the learning process to this end. Happy learning.
