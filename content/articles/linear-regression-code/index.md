---
layout: engineering-education
status: publish
published: true
url: /linear-regression-code/
title: Implementing Linear Regression Using Gradient Descent in Python
description: This article will be a hands-on implementation of Linear Regression using the Gradient Descent algorithm in Python. We will implement the linear regression from scratch using numpy.
author: lalithnarayan-c
date: 2021-01-24T00:00:00-11:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/linear-regression-code/hero.jpg
    alt: Linear Regression example image
---
In the previous article, we looked at the theory behind linear regression. In this article, we will implement the linear regression algorithm from scratch and understand the various steps involved. 
<!--more-->
In my earlier [article](/linear-regression-introduction/), I used the in-built function in scikit-learn to predict the houses' prices. Towards the end of the article, we will compare the two approaches and reason for the outputs.

### Prerequisites
- [Introduction to Machine Learning ](/supervised-learning-algorithms/)
- [Feature Engineering in Machine Learning](/feature-engineering-in-machine-learning/)

### Introduction
Linear regression is a type of supervised learning algorithm. It is used in many applications, such as in the financial industry. First, let's understand the various functions needed to implement a linear regression class, to begin with the coding aspect. 

### Code structure
We define the following methods in the class `Regressor`:
1. `__init__`: In the `__init__` method, we initialize all the parameters with default values. These parameters are added as and when required. For now, you will see that all the parameters are initialized beforehand. But while coding, you create new variables as and when needed.
2. `initialize_weights_and_bias`: In the `initialize_weights_and_bias` method, the weights and biases are initialized. We use random initialization to initialize the weights, and the bias is initially 0. 
3. `computeError`: This function calculates the error or loss function and returns the cost. The input to this function is the predicted output and the actual output. 
4. `optimize`: This function uses stochastic gradient descent to optimize the loss function. We initially compute the gradients of the weights and the bias in the variables `dW` and `db.` Using these gradients, we updated our weights and biases iteratively.
5. `normalize`: This function subtracts the mean from the data and divides it by its standard deviation. This ensures the data is centered around 0, and the standard deviation is always 1. Data with such distribution is easier to work with and results in the model learning better. This is because various features have various scales. The larger values may end up contributing more to the output. Hence, normalization ensures no such anomalies take place. 
6. `fit`: The fit method calls all the above functions. In this method, we perform normalization on the input features and compute the loss. Once the loss is computed, we optimize the loss function by applying the `optimize` function on the input-output pair. We perform this until there is no significant change in the loss values obtained after training.
7. `predict`: This function is used to test the model on unseen data. The input to the function is the input data. The predict function outputs the dependent variable.
8. `plot`: In this method, we plot the loss function versus the number of iterations.
9. `score`: This function calculates the accuracy. The accuracy is computed using the following formula:

    $$ accuracy = \frac{(y - \hat{y})^2}{\sum{_i}^n(y-\bar{y})^2}$$

### Code 
Let us put together the information we collected above and create the `Regressor` class. 

```py
import numpy as np
import matplotlib.pyplot as plt
# Define Regressor class
class Regressor():
    # init methodd initializes all parameters needed to implement regression
    def __init__(self, learning_rate=0.01, tol=0.01, seed=None,normalize=False):
        self.W = None
        self.b = None
        self.__lr = learning_rate
        self.__tol = tol
        self.__length = None
        self.__normalize = normalize
        self.__m = None
        self.__costs = []
        self.__iterations = []
        np.random.seed(seed if seed is not None else np.random.randint(100))
    # random initialization of weights and bias
    def __initialize_weights_and_bias(self):
        self.W = np.random.randn(self.__length) #(n,1)
        self.b = 0
    # compute the error function: sum of squared errors 
    def __computeCost(self,h,Y):
        loss = np.square(h-Y)
        cost = np.sum(loss)/(2*self.__m)
        return cost
    # implement optimization function
    def __optimize(self,X,Y):
        h = np.dot(X,self.W)+self.b
        dW = np.dot( X.T, (h-Y) ) / self.__m
        db = np.sum( h-Y )  / self.__m
        self.W = self.W - self.__lr*dW
        self.b = self.b - self.__lr*db
    # normalize the dataset by subtracting the mean and dividing by std deviation
    def __normalizeX(self,X):return (X-self.__mean) / (self.__std)
    # fit the model to the dataset: training process
    def fit(self, X, y, verbose=False):
        if self.__normalize:
            self.__mean, self.__std = X.mean(axis=0), X.std(axis=0)
            X = self.__normalizeX(X)
        self.__m,self.__length = X.shape
        self.__initialize_weights_and_bias()
        last_cost,i = float('inf'),0
        while True:
            h = np.dot(X,self.W)+self.b
            cost = self.__computeCost(h,y)
            if verbose: print(f"Iteration: {i}, Cost: {cost:.3f}")
            self.__optimize(X,y)
            if last_cost-cost < self.__tol: break
            else: last_cost,i = cost,i+1
            self.__costs.append(cost)
            self.__iterations.append(i)
    # test the model on test data
    def predict(self,X):

        if self.__normalize: X = self.__normalizeX(X)
        return np.dot(X,self.W)+self.b
    # plot the iterations vs cost curves
    def plot(self,figsize=(7,5)):
        plt.figure(figsize=figsize)
        plt.plot(self.__iterations,self.__costs)
        plt.xlabel('Iterations')
        plt.ylabel('Cost')
        plt.title("Iterations vs Cost")
        plt.show()
    # calculates the accuracy
    def score(self,X,y):
        return 1-(np.sum(((y-self.predict(X))**2))/np.sum((y-np.mean(y))**2))

```

### Test the code 
We use the Boston housing dataset to test the performance of the model built. The code to call the Boston housing dataset and to train the model is given below.

```py
# load the boston housing dataset
from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split

data = load_boston()
# split the dataset into train and test sets
X_train, X_test, y_train,y_test = train_test_split(data.data, data.target,test_size=0.1)
# print train and test set shapes
print(f"X_train:{X_train.shape}\ny_train:{y_train.shape}")
# normalize the dataset and instantiate Regressor object
regressor = Regressor(normalize=True)
# call the fit method
regressor.fit(X_train,y_train)

train_score = regressor.score(X_train,y_train)
test_score = regressor.score(X_test,y_test)

print("Train Score:", train_score)
print("Test Score: ",test_score)
regressor.plot()

```
Run this code [here](https://repl.it/@lalithNarayan/SuperiorDeficientType).


### Output analysis
We get a training accuracy of about 71%, and test accuracy stands at 65%. A fun exercise would be to set `normalize` to `False` and try the same code. Check the train and test accuracies. You will understand the significance of normalization.

```bash
Train Score: 0.7142761537090165
Test Score:  0.6504432415059116
```

### Comparison with scikit learn
The training and test accuracy obtained using the [library](/house-price-prediction/) stand at 93% and 79.29%, respectively. We conclude that the data requires some non-linearity to be introduced, and polynomial regression would probably work much better than linear regression. 

### Conclusion
In this article, we implemented the linear regression from scratch using numpy. This should give you an idea about converting mathematical equations into Pythonic code. Implementing machine learning algorithms from scratch enhances one's understanding of the subject. 

Happy learning. 

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)