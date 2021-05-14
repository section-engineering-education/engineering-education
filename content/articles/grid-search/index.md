---
layout: engineering-education
status: publish
published: true
url: /grid-search/
title: Using Grid Search to Optimize Hyperparameters
description: In this post, we dive into a key technique to optimize hyperparameters known as grid-search. We will define grid search and explore how it works through a simple Python example. 
author: collins-ayuya
date: 2021-03-18T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/grid-search/hero.jpg
    alt: Grid search hero image
---
Unlike parameters, hyperparameters are set before training a machine learning model. These hyperparameters need to be optimized to adapt a model to a dataset. However, the optimal hyperparameter settings on one dataset are unlikely to be optimal on another. This makes the task of hyperparameter optimization that much trickier. 
<!--more-->
In this post, we will dive into a key technique to optimize hyperparameters known as grid-search.

### Contents
- [Contents](#contents)
- [Prerequisites](#prerequisites)
- [Goal](#goal)
- [Grid Search](#grid-search)
  - [Cross Validation](#cross-validation)
- [Grid Search Implementation](#grid-search-implementation)
  - [Steps](#steps)
  - [All the code](#all-the-code)
- [Conclusion](#conclusion)
- [References and Further Reading](#references-and-further-reading)

### Prerequisites
Before we begin it may be helpful to go over and install the following:
• A section of this [article](/meta-learning/) will give a brief introduction to hyperparameters and the grid search method.

• [VSCode](https://code.visualstudio.com/) will be my code editor, and we will be using Python as the language.

• [` GridSearchCV `](https://scikit-learn.org/stable/modules/grid_search.html#grid-search) is the tool from the [scikit-learn](https://scikit-learn.org/stable/) library to use to carry out grid search with cross validation.

• [Iris dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html)

### Goal
The goal of this article will be to understand grid search optimization through a simple implementation of it in Python.

### Grid search
Grid search refers to a technique used to identify the optimal hyperparameters for a model. Unlike parameters, finding hyperparameters in training data is unattainable. As such, to find the right hyperparameters, we create a model for each combination of hyperparameters. 

Grid search is thus considered a very traditional hyperparameter optimization method since we are basically “brute-forcing” all possible combinations. The models are then evaluated through cross-validation. The model boasting the best accuracy is naturally considered to be the best.

![grid](/engineering-education/grid-search/grid.png)

*Grid layout.*

[Source](https://jmlr.csail.mit.edu/papers/volume13/bergstra12a/bergstra12a.pdf)

From the image above, we note that values are in a matrix-like arrangement.

#### Cross validation
We have mentioned that cross-validation is used to evaluate the performance of the models. Cross-validation measures how a model generalizes itself to an independent dataset. We use cross-validation to get a good estimate of how well a predictive model performs.

With this method, we have a pair of datasets: an independent dataset and a training dataset. We can partition a single dataset to yield the two sets. These partitions are of the same size and are referred to as folds. A model in consideration is trained on all folds, bar one. 

The excluded fold is used to then test the model. This process is repeated until all folds are used as the test set. The average performance of the model on all folds is then used to estimate the model’s performance.

In a technique known as the k-fold cross-validation, a user specifies the number of folds, represented by $k$. This means that when $k=5$, there are 5 folds.

![crossvalidation](/engineering-education/grid-search/crossvalidation.png)

*K-fold cross-validation with K as 5.*

[Source](https://mlfromscratch.com/gridsearch-keras-sklearn/#/)

### Grid search implementation
The example given below is a basic implementation of grid search. We first specify the hyperparameters we seek to examine. Then we provide a set of values to test. After this, grid search will attempt all possible hyperparameter combinations with the aid of cross-validation. Let’s break down this process into the steps below.

#### Steps
1. **Load dataset**. 

My first step is loading the dataset using ` from sklearn.datasets import load_iris ` and ` iris = load_iris() `. The iris dataset is sci-kit learn library in Python. Data is stored in a $150 * 4$ array. To see the contents of the dataset, we can use ` print(iris.data) ` and ` print(iris.data.shape) `.

To see the dataset contents, our input becomes:
```python
from sklearn.datasets import load_iris
iris = load_iris()
print(iris.data)
print(iris.data.shape)
```

Our output:
```python
[[5.1 3.5 1.4 0.2]
 [4.9 3. 1.4 0.2]
 [4.7 3.2 1.3 0.2]
 [4.6 3.1 1.5 0.2]
 [5. 3.6 1.4 0.2]
 [5.4 3.9 1.7 0.4]
 [4.6 3.4 1.4 0.3]
 [5. 3.4 1.5 0.2]
 [4.4 2.9 1.4 0.2]
 [4.9 3.1 1.5 0.1]
 [5.4 3.7 1.5 0.2]
 [4.8 3.4 1.6 0.2]
 [4.8 3. 1.4 0.1]
 [4.3 3. 1.1 0.1]
 [5.8 4. 1.2 0.2]
 [5.7 4.4 1.5 0.4]
 [5.4 3.9 1.3 0.4]
 [5.1 3.5 1.4 0.3]
 [5.7 3.8 1.7 0.3]
 [5.1 3.8 1.5 0.3]
 [5.4 3.4 1.7 0.2]
 [5.1 3.7 1.5 0.4]
 [4.6 3.6 1. 0.2]
 [5.1 3.3 1.7 0.5]
 [4.8 3.4 1.9 0.2]
 [5. 3. 1.6 0.2]
 [5. 3.4 1.6 0.4]
 [5.2 3.5 1.5 0.2]
 [5.2 3.4 1.4 0.2]
 [4.7 3.2 1.6 0.2]
 [4.8 3.1 1.6 0.2]
 [5.4 3.4 1.5 0.4]
 [5.2 4.1 1.5 0.1]
 [5.5 4.2 1.4 0.2]
 [4.9 3.1 1.5 0.2]
 [5. 3.2 1.2 0.2]
 [5.5 3.5 1.3 0.2]
 [4.9 3.6 1.4 0.1]
 [4.4 3. 1.3 0.2]
 [5.1 3.4 1.5 0.2]
 [5. 3.5 1.3 0.3]
 [4.5 2.3 1.3 0.3]
 [4.4 3.2 1.3 0.2]
 [5. 3.5 1.6 0.6]
 [5.1 3.8 1.9 0.4]
 [4.8 3. 1.4 0.3]
 [5.1 3.8 1.6 0.2]
 [4.6 3.2 1.4 0.2]
 [5.3 3.7 1.5 0.2]
 [5. 3.3 1.4 0.2]
 [7. 3.2 4.7 1.4]
 [6.4 3.2 4.5 1.5]
 [6.9 3.1 4.9 1.5]
 [5.5 2.3 4. 1.3]
 [6.5 2.8 4.6 1.5]
 [5.7 2.8 4.5 1.3]
 [6.3 3.3 4.7 1.6]
 [4.9 2.4 3.3 1. ]
 [6.6 2.9 4.6 1.3]
 [5.2 2.7 3.9 1.4]
 [5. 2. 3.5 1. ]
 [5.9 3. 4.2 1.5]
 [6. 2.2 4.
1. ]
 [6.1 2.9 4.7 1.4]
 [5.6 2.9 3.6 1.3]
 [6.7 3.1 4.4 1.4]
 [5.6 3. 4.5 1.5]
 [5.8 2.7 4.1 1. ]
 [6.2 2.2 4.5 1.5]
 [5.6 2.5 3.9 1.1]
 [5.9 3.2 4.8 1.8]
 [6.1 2.8 4. 1.3]
 [6.3 2.5 4.9 1.5]
 [6.1 2.8 4.7 1.2]
 [6.4 2.9 4.3 1.3]
 [6.6 3. 4.4 1.4]
 [6.8 2.8 4.8 1.4]
 [6.7 3. 5.
1.7]
 [6. 2.9 4.5 1.5]
 [5.7 2.6 3.5 1. ]
 [5.5 2.4 3.8 1.1]
 [5.5 2.4 3.7 1. ]
 [5.8 2.7 3.9 1.2]
 [6. 2.7 5.1 1.6]
 [5.4 3. 4.5 1.5]
 [6. 3.4 4.5 1.6]
 [6.7 3.1 4.7 1.5]
 [6.3 2.3 4.4 1.3]
 [5.6 3. 4.1 1.3]
 [5.5 2.5 4. 1.3]
 [5.5 2.6 4.4 1.2]
 [6.1 3. 4.6 1.4]
 [5.8 2.6 4. 1.2]
 [5. 2.3 3.3 1. ]
 [5.6 2.7 4.2 1.3]
 [5.7 3. 4.2 1.2]
 [5.7 2.9 4.2 1.3]
 [6.2 2.9 4.3 1.3]
 [5.1 2.5 3. 1.1]
 [5.7 2.8 4.1 1.3]
 [6.3 3.3 6. 2.5]
 [5.8 2.7 5.1 1.9]
 [7.1 3. 5.9 2.1]
 [6.3 2.9 5.6 1.8]
 [6.5 3. 5.8 2.2]
 [7.6 3. 6.6 2.1]
 [4.9 2.5 4.5 1.7]
 [7.3 2.9 6.3 1.8]
 [6.7 2.5 5.8 1.8]
 [7.2 3.6 6.1 2.5]
 [6.5 3.2 5.1 2. ]
 [6.4 2.7 5.3 1.9]
 [6.8 3. 5.5 2.1]
 [5.7 2.5 5. 2. ]
 [5.8 2.8 5.1 2.4]
 [6.4 3.2 5.3 2.3]
 [6.5 3. 5.5 1.8]
 [7.7 3.8 6.7 2.2]
 [7.7 2.6 6.9 2.3]
 [6. 2.2 5.
1.5]
 [6.9 3.2 5.7 2.3]
 [5.6 2.8 4.9 2. ]
 [7.7 2.8 6.7 2. ]
 [6.3 2.7 4.9 1.8]
 [6.7 3.3 5.7 2.1]
 [7.2 3.2 6. 1.8]
 [6.2 2.8 4.8 1.8]
 [6.1 3. 4.9 1.8]
 [6.4 2.8 5.6 2.1]
 [7.2 3. 5.8 1.6]
 [7.4 2.8 6.1 1.9]
 [7.9 3.8 6.4 2. ]
 [6.4 2.8 5.6 2.2]
 [6.3 2.8 5.1 1.5]
 [6.1 2.6 5.6 1.4]
 [7.7 3. 6.1 2.3]
 [6.3 3.4 5.6 2.4]
 [6.4 3.1 5.5 1.8]
 [6. 3. 4.8 1.8]
 [6.9 3.1 5.4 2.1]
 [6.7 3.1 5.6 2.4]
 [6.9 3.1 5.1 2.3]
 [5.8 2.7 5.1 1.9]
 [6.8 3.2 5.9 2.3]
 [6.7 3.3 5.7 2.5]
 [6.7 3. 5.2 2.3]
 [6.3 2.5 5. 1.9]
 [6.5 3. 5.2 2. ]
 [6.2 3.4 5.4 2.3]
 [5.9 3. 5.1 1.8]]
(150, 4)
```

However, it is worth noting that the above visualization step is to understand the dataset and not necessarily in the implementation of grid search.	 

2. **Import ` GridSearchCV `, `svm` and `SVR`.** 

After loading the dataset, we then import ` GridSearchCV ` as well as ` svm ` and `SVR` from ` sklearn.model_selection ` as shown below.

[` GridSearchCV `](https://scikit-learn.org/stable/modules/grid_search.html#grid-search) ensures an exhaustive grid search that breeds candidates from a grid of parameter values. As we shall see later on, these values are instanced using the parameter ` param_grid `.

We import ` svm ` since the type of algorithm we seek to use is a support vector machine. The class ` SVR ` represents [Epsilon Support Vector Regression](https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVR.html). With this, the model has two free parameters; C and epsilon. We shall set parameters in the next step.

```python
from sklearn.model_selection import GridSearchCV
from sklearn import svm
from sklearn.svm import SVR
```

3. **Set estimator parameters.** 

In this implementation, we use the ` rbf ` kernel of the ` SVR ` model. ` rbf ` stands for the radial basis function. It introduces some form of non-linearity to the model since the data in use is non-linear. By this, we mean that the data arrangement follows no specific sequence.

```python
estimator=SVR(kernel='rbf')
```

4. **Specify hyperparameters and range of values.** 

We then specify the hyperparameters we seek to examine. When using the SVR’s ` rbf ` kernel, the three hyperparameters to use are ` C `, ` epsilon `, and ` gamma `. We can give each one several values to choose from. 

Remember that it is possible to change these values and test them to see which values' collection gives better results. Below are my randomly chosen values.

```python
param_grid={
            'C': [1.1, 5.4, 170, 1001],
            'epsilon': [0.0003, 0.007, 0.0109, 0.019, 0.14, 0.05, 8, 0.2, 3, 2, 7],
            'gamma': [0.7001, 0.008, 0.001, 3.1, 1, 1.3, 5]
        }
```

The ` param_grid ` parameter takes a list of parameters and ranges for each, as we have shown above.

5. **Evaluation.** 

We mentioned that cross-validation is carried out to estimate the performance of a model. In k-fold cross-validation, k is the number of folds. As shown below, through ` cv=5 `, we use cross-validation to train the model 5 times. This means that 5 would be the $k$ value.

` scoring='neg_mean_squared_error' ` gives us the mean squared error. It is used in this form in grid search. This is meant to take the negative of the mean squared error to maximize and optimize it instead of minimizing the actual error.

` n_jobs ` parameter specifies the number of concurrent processes that should be used for routines parallelized with the library [joblib](https://scikit-learn.org/stable/glossary.html#term-joblib). In our case, at -1, it means that all CPUs are in use.

` verbose ` gives us an option to produce logging information. We keep it at 0 to disable it since it may slow down our algorithm.

```python
grid = GridSearchCV(

estimator=SVR(kernel='rbf'),
        param_grid={
            'C': [1.1, 5.4, 170, 1001],
            'epsilon': [0.0003, 0.007, 0.0109, 0.019, 0.14, 0.05, 8, 0.2, 3, 2, 7],
            'gamma': [0.7001, 0.008, 0.001, 3.1, 1, 1.3, 5]
        },
        cv=5, scoring='neg_mean_squared_error', verbose=0, n_jobs=-1)
```

6. **Fitting the data.** 

We do this through ` grid.fit(X,y) `, which does the fitting with all the parameters.

#### All the code
Since we now understand the key aspects of the code, let’s run all of the code. 

You can access it and test it out [here](https://repl.it/@collinsa1/GregariousSalmonNetworking).

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import GridSearchCV
from sklearn import svm
from sklearn.svm import SVR

iris = load_iris()
svc = svm.SVR()

grid = GridSearchCV(

estimator=SVR(kernel='rbf'),

param_grid={

'C': [1.1, 5.4, 170, 1001],

'epsilon': [0.0003, 0.007, 0.0109, 0.019, 0.14, 0.05, 8, 0.2, 3, 2, 7],

'gamma': [0.7001, 0.008, 0.001, 3.1, 1, 1.3, 5]
        },
        cv=5, scoring='neg_mean_squared_error', verbose=0, n_jobs=-1)

X = iris.data
y = iris.target

grid.fit(X,y)


#print the best parameters from all possible combinations
print("best parameters are: ", grid.best_params_)
```

**Results:**

```python
best parameters are:
{'C': 170, 'epsilon': 0.0003, 'gamma': 0.008}
```

We are successful in our grid search and identify the best parameters being 170 from C, 0.0003 from the epsilon values, and gamma as 0.008.

### Conclusion
Since grid search attempts all possible combinations, it becomes a computationally expensive method. We have defined grid search and explored how it works through a simple Python example. 

There exist other optimization methods which vary in complexity and effectiveness. I hope to cover a few in the future. 

Until then, good luck, and happy coding!

### References and further readings
1. [Tuning the hyper-parameters of an estimator](https://scikit-learn.org/stable/modules/grid_search.html#grid-search)

2. [sklearn.model_selection.GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html)

3. [sklearn.svm.SVR](https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVR.html)

4. [Glossary of Common Terms and API Elements](https://scikit-learn.org/stable/glossary.html)

5. [Hyperparameter Optimization With Random Search and Grid Search](https://machinelearningmastery.com/hyperparameter-optimization-with-random-search-and-grid-search/)

6. [A Comparison of Grid Search and Randomized Search Using Scikit Learn](https://blog.usejournal.com/a-comparison-of-grid-search-and-randomized-search-using-scikit-learn-29823179bc85)

7. [An introduction to Grid Search](https://medium.com/datadriveninvestor/an-introduction-to-grid-search-ff57adcc0998)

---

Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

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
