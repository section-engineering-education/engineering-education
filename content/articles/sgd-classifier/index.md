---
layout: engineering-education
status: publish
published: true
url: /sgd-classifier/
title: Stochastic Gradient Descent Optimized Linear Classifier in Python
description: This tutorial will go over how to implement a linear classifier using a stochastic gradient descent optimizer.
author: lalithnarayan-c
date: 2020-11-03T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sgd-classifier/hero.jpg
    alt: Stochastic Gradient Classifier example image
---
Welcome to a tutorial on implementing a linear classifier using a Stochastic Gradient Descent optimizer (SDG). This article will cover the theory behind modeling data using loss functions and help the reader understand the optimization process used to minimize the loss functions. Finally, we will code the linear classifier from scratch and use the Iris dataset to test the linear classifier.
<!--more-->
### Table of Contents
1. Linear Classifiers
2. Loss Functions
3. Stochastic Gradient Descent Optimizer
4. Code a Linear Classifier

### Linear Classifiers   
Linear classifiers are a type of [supervised learning algorithm](/supervised-learning-algorithms/) used on linear datasets. How is linearity defined in the case of a dataset?

Consider a dataset with two classes. If the linear classifier can come up with a linear decision boundary to classify the two categories, that is, a straight line of the form $y=mx+c$, then the dataset is linearly separable.

The notations used in the previous equation are as follows: $y$ is the output variable, $x$ is the input variable, $m$ is the slope, and $c$ is the intercept.  

Consider the image given below. This is a linear classifier classifying the conjunction (AND) function. The two-input [AND](https://en.wikipedia.org/wiki/AND_gate) function outputs only one when the two inputs are 1. In all other cases, it's output is 0. The dotted line given in the image is the decision boundary.  

![AND function](/engineering-education/sgd-classifier/and.jpg)

*[Image Source](http://www.ece.utep.edu/research/webfuzzy/docs/kk-thesis/kk-thesis-html/node19.html)*

Now we'll look at the [XOR](https://en.wikipedia.org/wiki/XOR_gate) function. 2-input XOR function outputs a 1 when the number of 1's in the input is odd. If the number of 1's is even, then the output is 0. Consider the dotted lines and see that a single decision boundary is insufficient to classify the XOR function results. Hence XOR is said to be a non-linearly separable function.

![xor function](/engineering-education/sgd-classifier/xor.jpg)

*[Image Source](http://www.ece.utep.edu/research/webfuzzy/docs/kk-thesis/kk-thesis-html/node19.html)*

Linear classifiers work very well on datasets with linear decision boundaries. According to the example above, linear classifiers will fail when it comes to the XOR function but will classify the AND function.

### Loss Functions
Consider the following problem of fitting the best line for a given set of data-points. An intuitive way of fitting the line would be to fit a line at random and slowly changing the slope and the intercept values until we get a line close to all the data points in the set. The loss function, also known as the error function, mathematically defines the difference between the ideal and the actual values.

![linear regression](/engineering-education/sgd-classifier/linear_regression.jpg)

*[Image Source](https://www.numpyninja.com/post/what-is-line-of-best-fit-in-linear-regression)*

The linear classifier fits a linear boundary (a straight line) through the given points in the image above. The line is termed as the best-fit line. To obtain the line of best-fit, a loss function is defined.

It's defined as the sum of squares of the distance between the line and the points. It's called the [least squares loss function](https://www.toppr.com/guides/fundamentals-of-business-mathematics-and-statistics/time-series-analysis/method-of-least-squares/).

The loss function is responsible for the performance of the linear classifiers.
For this article, I will be using the logistic loss function, defined as follows:

![logistic loss](/engineering-education/sgd-classifier/logistic_loss.png)

*[Image Source](https://towardsdatascience.com/optimization-loss-function-under-the-hood-part-ii-d20a239cde11)*

The cost function takes in the classifier's output, denoted by $h_\theta(x)$, and the actual output, $y$ as its inputs. We want to ensure only one of these values is activated for a given class.

Therefore, we have two equations, one for $y=1$ and the other for $y=0$. The $log$ terms ensure that the loss values are [differentiable](http://www.graphnow.com/2dgallery2.html) to ensure better optimization.  

A detailed analysis of loss functions is cited in the following article. Go through it for an in-depth understanding of [loss functions](https://www.analyticsvidhya.com/blog/2019/08/detailed-guide-7-loss-functions-machine-learning-python-code/).


### Stochastic Gradient Descent (SGD) Optimizer
Stochastic Gradient Descent Optimizer tries to find the minimum for a function. The function of interest, in this case, is the loss/error function. We want to minimize the error, and therefore we use the SGD optimizer.

The SGD optimizer works iteratively by moving in the direction of the gradient. The direction of the minimum is in the direction where the values are decreasing. Thus, this is computed using [gradients](https://ruder.io/optimizing-gradient-descent/).

A visual representation of the Stochastic Gradient Descent Optimizer is given below.

![gif SGD](/engineering-education/sgd-classifier/SGD.gif)

*[Image Source](https://medium.com/chung-yi/ml%E5%85%A5%E9%96%80-%E5%8D%81%E4%BA%8C-sgd-adagrad-momentum-rmsprop-adam-optimizer-e331ef3cf5cf)*

Observe the balls rolling into the low-lying areas. The low-lying regions represent the minima. Sometimes, there might be two minima of varying sizes. The pink and the blue balls land up in the smaller minima, called the local minima, whereas the other three balls end up in the deeper minima, called the global minima.

This is a problem associated with SGD. Sometimes, we might end up obtaining the minimum of a loss function at the local minimum. This leads to an inefficient modeling of the loss function, thereby leading to a decrease inaccuracy.

The speed with which the balls travel is analogous to the learning rate, that is used later. Sufficient iterations of SGD are applied to tackle and nullify the problem of local minima.

### Implementing the Linear Classifier from Scratch
Let's begin with the implementation of the code. We will define a class called `LinearClassifierwithSGD`.

This class will contain the following methods:
1. `__init__`
2. `sigmoid`
3. `initialize_weights`
4. `logistic_loss`
5. `optimize`
6. `normalize_function`
7. `fit`
8. `predict`
9. `predict_probability`
10. `plot`
11. `score`

We will implement the methods one by one, and in the end, coalesce the code together.

1. `__init__`: The init method initializes the various parameters involved with the linear classifier. The linear classifier requires the following parameters:
- `learning_rate`: The `learning_rate` defines how fast the optimizer reaches the minima. It should ideally be between $10e-5$ to $10e-2$.
- `tolerance`: The `tolerance` is the smallest error allowed. If the error goes below the tolerance value, then the execution of the program is stopped.
- `seed`: `seed` is used in the `np.random.random` function to generate random numbers. Specifying the seed argument ensures the reproducibility of results.
- `normalize`: An argument that indicates whether to normalize the data or not.
- `num_iterations`: The number of iterations the algorithm runs for. Iterations are defined as the number of times the algorithm goes through the dataset.

```py
        def __init__(self,learning_rate=0.01,tolerance=10e-10, seed=42, normalize=True, num_iterations= 100):
            np.random.seed(seed)
            self.weight = None
            self.num_iterations = num_iterations
            self.bias = None
            self.learning_rate = learning_rate
            self.tolerance = tolerance
            self.length = None
            self.normalize= normalize
            self.m = None
            self.costs  = []
            self.iterations = []
```

We will define and initialize the parameters in this method, that will be used in the next functions.

2. `sigmoid`: The sigmoid function is the activation function. The sigmoid function restricts the outputs to the range $[0,1]$. Therefore, all scores are converted into probabilistic scores. This helps in classifying data as we shall see in the `predict_probability` function.

![sigmoid image](/engineering-education/sgd-classifier/sigmoid.jpg)

*[Image Source](http://www.financial-hacker.com/build-better-strategies-part-5-developing-a-machine-learning-system/)*

It's given by the equation $sig(x) = \frac{1}{1+e^-x}$. We use the [numpy library](/introduction-to-numpy/) to implement exponentiation. Numpy offers `np.exp()` function to compute the exponential function.

```py
        def sigmoid(self,z):
            return 1/(1+np.exp(-z))
```

3. `initialize_weights`: In this method, we'll initialize the weights and the biases. The weights are analogous to the slope, and the biases are equivalent to the intercept that we have seen in the equation $y=mx+c$.

```py
        def initalize_weights(self):
            self.weight = np.random.random(self.length)
            self.bias = 0

```

4. `logistic_loss`: The `logistic_loss` function computes the logistic loss that we have mentioned in the [earlier section](#loss-functions).

We'll compute the `indvidual_loss,` that is the loss computed per data-point. We'll sum up these losses over the entire dataset using the `np.sum` function. The sum is the total cost, that is returned by the function.

```py
        def logistic_loss(self,p,y):
            individual_loss = -(y*np.log(p)+(1-y)*np.log(1-p))
            cost = np.sum(individual_loss)/self.m
            return cost
```

5. `optimize`: We will define the stochastic gradient descent optimizer from scratch in this function:

This is an exciting function. We will compute the output `estimated_y` initially. Using this function, we can calculate the gradients `dW` and `db.`

These give information about the direction of the loss function's increase. We are interested in reaching the minimum of the loss function. Therefore, we invert the signs of the gradients by multiplying it with $-1$.

```py
        def optimize(self,X,y):
            estimated_y = self.sigmoid(np.dot(X,self.W)+self.bias)
            dw = np.dot(X.T,(estimated_y-y))
            db = np.sum(estimated_y - y)/self.m
            self.weight = self.weight - self.learning_rate * dw
            self.bias = self.bias - self.learning_rate * db
```

6. `normalize_function`: `normalization` is an essential preprocessing step where the dataset values are normalized. This is done to ensure the mean is 0, and the variance is 1. Under such circumstances, the models learn faster and do not overfit the dataset.

The library `sklearn` includes a `normalize` function in the `sklearn.preprocessing` module. It is implemented as follows: The mean is subtracted from the data point and then divided by the dataset's standard deviation.

```py
        def normalize_function(self,X):
            return (X-np.mean(X))/np.std(X)        
```

7. `fit`: This method is the function that fits the linear classifier to the dataset. The classifier learns the decision boundary in this function.

The function `fit` takes in arguments `X` and `y.` The linear classifier is initialized with random weights. The initial cost is assumed to be `infinity.`

The while loop marks the beginning of the training phase. During the training, the following steps take place:
- estimated_y is computed.
- cost is calculated using the logistic_loss function. The cost is calculated between the actual and predicted values.
- Optimize the cost computed by calling the optimize function.
- Repeat the same for 100 iterations until the loss reduces.

```py
        def fit(self,X,y):
            if self.normalize:
                X = self.normalize_function(X)
            self.m,self.length = X.shape
            self.initalize_weights()
            previous_cost , iteration_number = float('inf'), 0
            self.costs.append(previous_cost)
            self.iterations.append(iteration_number)

            while iteration_number<self.num_iterations:
                estimated_y  = self.sigmoid(np.dot(X,self.weight)+self.bias)
                cost = self.logistic_loss(estimated_y, y)
                print(f"Iteration:{iteration_number}, Cost: {cost:.3f}")
                self.optimize(X,y)

                if previous_cost < 0:
                    break
                else:
                    previous_cost, iteration_number = cost, iteration_number + 1
                    self.costs.append(cost)
                    self.iterations.append(iteration_number)
```

8.  `predict`: This function is used to predict the classes on unseen data. We call the `predict_probability` function through this function.

```py
        def predict(self, X):
            return self.predict_probabilty(X)[:, 1] > 0.5
```

9.  `predict_probability`: A function that converts the outputs into probabilities. The function is an interesting one.

The input to the function is `X.` We normalize `X` if the argument `normalize` is True. We send it through the sigmoid function to compute the output variable `ones.` The variable `ones` contains the probability that the data-point `X` belongs to class-1.

Therefore, the probability that the data-point belongs to class-2 is `1 -prob(belongs to class 1)`. Therefore, we return a numpy array, which groups the consecutive columns to return the probabilities. The output looks like this:

```txt
            [[.5,.5],[0.1,0.9],[0.2,0.8]....[0.32,0.68]]
```

Notice the sum of elements inside each list is 1. The sum of probabilities is 1.

```py
        def predict_probabilty(self, X):
            if self.normalize:
                X = self.normalize_function(X)
            ones = self.sigmoid(np.dot(X,self.weight)+self.bias)
            return np.c_[1-ones, ones]
```

10. `plot`: The plot function uses the matplotlib library to plot graphs. More information can be found in this [article](/matplotlib-visualization-python/).

```py            
        def plot(self):
            plt.figure(figsize= (7,6))
            plt.plot(self.iterations, self.costs,marker='.',linestyle='-')
            plt.xlabel('Iterations')
            plt.ylabel(('Loss'))
            plt.title('Iterations vs Loss')
            plt.show()
```

11.  `score`: This method returns the test and trains the accuracies of the classifier. It checks if the predicted value is equal to the true value and loops over the entire dataset.

The accuracy is computed as follows:
        `$accuracy = \frac{\# of correct predictions}{\# of total predictions}$`

```py    
        def score(self,X,y):
            return (self.predict(X) == y).sum()/len(y)

```

### Repl.it Code Implementation
The repl.it link is included so that you can see the output. Observe the decrease in the loss as the number of iterations increases.

[Run it here!](https://repl.it/@lalithNarayan/CumbersomePromotedDictionaries?lite=true)


### Code Output
![cost vs iterations](/engineering-education/sgd-classifier/loss_vs_iterations.jpg)

### Conclusion
In this article, we have coded a linear classifier from scratch. I would like to congratulate you on making it this far. As a recap, I have attached the flow chart on how the data is fit for a linear model. I hope this helps conclude this article on a good note.

![fitting a linear classifier](/engineering-education/sgd-classifier/flow_chart.jpg)

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
