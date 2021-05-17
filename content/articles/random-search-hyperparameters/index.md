---
layout: engineering-education
status: publish
published: true
url: /random-search-hyperparameters/
title: Using Random Search to Optimize Hyperparameters 
description: Hyperparameter tuning is a significant step in the process of training machine learning and deep learning models. In this tutorial, we will discuss the random search method to obtain the set of optimal hyperparameters. Going through the article should help one understand the algorithm and its pros and cons. Finally, we will implement the same in Python using the library Scikit-Learn.
author: collins-ayuya
date: 2021-03-30T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/random-search-hyperparameters/hero.jpg
   alt: Random search hyperparameter optimization image

---
There are many ways to optimize the hyperparameters of a model. We previously looked at [grid search](/grid-search/) and a basic example of its implementation. 
<!--more-->
This time, we will seek to understand another method of hyperparameter optimization known as random search. In this tutorial we shall introduce random search and go through a simple method of its implementation in Python.

### Contents
- [Contents](#contents)
- [Prerequisites](#prerequisites)
- [Goal](#goal)
- [Random Search](#random-search)
  - [RandomizedSearchCV](#randomizedsearchcv)
  - [Random Forest](#random-forest)
    - [Random forest parameters](#random-forest-parameters)
- [Random Search Implementation](#random-search-implementation)
  - [All the code](#all-the-code)
- [Wrapping Up](#wrapping-up)
- [References and Further Reading](#references-and-further-reading)

### Prerequisites
- A part of this [article](/meta-learning/) gives a brief introduction to the grid search method.

- [VSCode](https://code.visualstudio.com/) is my code editor of choice for this tutorial. The language we shall use is Python.

- We shall use a tool from the [scikit-learn](https://scikit-learn.org/stable/) library known as [RandomizedSearchCV](https://scikit-learn.org/stable/modules/grid_search.html#randomized-parameter-optimization) to carry out a random search with cross-validation.

- As with the grid search tutorial, we will use the [iris dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html).

### Random search
Random search is a method in which random combinations of hyperparameters are selected and used to train a model. The best random hyperparameter combinations are used. Random search bears some similarity to grid search. 

However, a key distinction is that we do not specify a set of possible values for every hyperparameter. Instead, we sample values from a statistical distribution for each hyperparameter. A sampling distribution is defined for every hyperparameter to do a random search.

This technique allows us to control the number of attempted hyperparameter combinations. Unlike grid search, where every possible combination is attempted, random search allows us to specify the number of models to train. We can base our search iterations on our computational resources or the time taken per iteration. The image below shows a random layout.

![randomgrid](/engineering-education/random-search-hyperparameters/randomgrid.png)

[*Random layout - Image Source*](https://jmlr.csail.mit.edu/papers/volume13/bergstra12a/bergstra12a.pdf)

#### RandomizedSearchCV
We used the sci-kit learn (sklearn) library when implementing grid search, particularly GridSearchCV. From the same library, we shall use RandomizedSearchCV. Similar to GridSearchCV, it is meant to find the best parameters to improve a given model. 

A key difference is that it does not test all parameters. Instead, the search is done at random. As we shall note later, a practical difference between the two is that RandomizedSearchCV allows us to specify the number of parameter values we seek to test. This is through the use of ` n_iter. `

#### Random Forest
Since we shall use a random forest regressor during our random search implementation, it is of value to introduce random forests. Random forests refer to an ensemble of untrained decision trees capable of both regression and classification tasks. 

They involve the use of bagging, that combines many models to give a generalized result. Learn more about bagging and ensemble learning as a whole from this [article](/ensemble-learning/).

We have explained why a random forest is a “forest” but not why it is considered random. The random nature of a random forest can be attributed to a couple of concepts. 

First, the samples of training observations when building trees are taken randomly. Second, when it comes to the splitting of nodes, random subsets of features are used.

#### Random forest parameters
A random forest uses many parameters. Below are the main ones. It is essential to introduce them since we shall encounter all of them in our code later on.

- **n_estimators.** This parameter denotes the maximum number of trees in an ensemble/forest.

- **max_features.** This represents the maximum number of features taken into consideration when splitting a node.

- **max_depth.** max_depth represents the maximum number of levels that are allowed in each decision tree.

- **min_samples_split.** To cause a node to split, a minimum number of samples are required in a node. This minimum number of data points is what is represented by to as min_samples_split.

- **min_samples_leaf.** The minimum count of data points that can be stored in a leaf node.

- **bootstrap.** To sample data points, the bootstrap sampling method is used. Sampling may be carried out with or without replacement. Sampling with replacement can be described as when a sample is selected from a random population, then returned to the population. If `bootstrap = True,` sampling is carried out randomly with replacement. If  `bootstrap = False,` sampling is without replacement.

### Random search implementation
Let’s have a straightforward implementation of random search. Our goal is to identify the best parameters after a randomized search. 

The steps below will illustrate this process.

1. **import NumPy.** NumPy simplifies the handling of vectors, matrices as well as multi-dimensional arrays. We import ` numpy ` as shown below.

```python
import numpy as np
```

2. **Load dataset.** As we did when implementing grid search, we load the iris dataset.

```python
from sklearn.datasets import load_iris
iris = load_iris()
X = iris.data
y = iris.target
```

3. **Import random forest regressor.** We then use ` from sklearn.ensemble import RandomForestRegressor ` to import the random forest regressor.

```python
from sklearn.ensemble import RandomForestRegressor
```

4. **Set random state.** The ` random_state ` parameter allows us to set the seed value of the random generator. It allows us to pass many datasets with the same number of rows through it. 

In turn, it splits the datasets on the same indices. If we fail to provide a random state value, a different test set will be generated every time we run our code. I chose to use 35 as the random state value.

```python
rf = RandomForestRegressor(random_state = 35)
```

5. **Import ` RandomizedSearchCV `.** We import ` RandomizedSearchCV ` to carry out a randomized search on hyperparameters.

```python
from sklearn.model_selection import RandomizedSearchCV
```

6. **Provide hyperparameter grid for a random search.** Here, we specify a few values for the random forest parameters we defined previously.

```python
n_estimators = [int(x) for x in np.linspace(start = 1, stop = 20, num = 20)] # number of trees in the random forest
max_features = ['auto', 'sqrt'] # number of features in consideration at every split
max_depth = [int(x) for x in np.linspace(10, 120, num = 12)] # maximum number of levels allowed in each decision tree
min_samples_split = [2, 6, 10] # minimum sample number to split a node
min_samples_leaf = [1, 3, 4] # minimum sample number that can be stored in a leaf node
bootstrap = [True, False] # method used to sample data points

random_grid = {'n_estimators': n_estimators,

'max_features': max_features,

'max_depth': max_depth,

'min_samples_split': min_samples_split,

'min_samples_leaf': min_samples_leaf,

'bootstrap': bootstrap}
```

7. **Evaluation.** Similarly to our grid search implementation, we will carry out cross-validation in a random search. This is enabled by ` RandomizedSearchCV. ` By specifying ` cv=5 `, we train a model 5 times using cross-validation.

Furthermore, when we carried out grid search, we had ` verbose=0 ` to avoid slowing down our algorithm. In this case, we can use ` verbose=2 ` to have a glimpse of the logging information generated. 

We have the ` n_iter ` parameter that allows us to carry out $n$ different iterations as mentioned in the previous tutorial on grid search, when ` n_jobs = -1 `, all CPUs are put to use.

```python
rf_random = RandomizedSearchCV(estimator = rf,

param_distributions = random_grid,
               n_iter = 100, cv = 5, verbose=2, random_state=35, n_jobs = -1)
```

8. **Fitting the data.** We carry this out through ` rf_random.fit(X,y) `.

#### All the code
You can access and test out all the code [here](https://replit.com/@collinsa1/CleverGiddyVendor).

```python
import numpy as np
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestRegressor
iris = load_iris()
rf = RandomForestRegressor(random_state = 35)

from sklearn.model_selection import RandomizedSearchCV


X = iris.data
y = iris.target


n_estimators = [int(x) for x in np.linspace(start = 1, stop = 20, num = 20)]
max_features = ['auto', 'sqrt']
max_depth = [int(x) for x in np.linspace(10, 120, num = 12)]
min_samples_split = [2, 6, 10]
min_samples_leaf = [1, 3, 4]
bootstrap = [True, False]


random_grid = {'n_estimators': n_estimators,

'max_features': max_features,

'max_depth': max_depth,

'min_samples_split': min_samples_split,

'min_samples_leaf': min_samples_leaf,

'bootstrap': bootstrap}

rf_random = RandomizedSearchCV(estimator = rf,

param_distributions = random_grid,
               n_iter = 100, cv = 5, verbose=2, random_state=35, n_jobs = -1)
rf_random.fit(X,y)

# this prints the contents of the parameters in the random grid
print ('Random grid: ', random_grid, '\n')

# print the best parameters
print ('Best Parameters: ', rf_random.best_params_, ' \n')
```

#### Results:

```python
[Parallel(n_jobs=-1)]: Done 500 out of 500 | elapsed: 3.6s finished
Random grid:
{'n_estimators': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 'max_features': ['auto', 'sqrt'], 'max_depth': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], 'min_samples_split': [2, 6, 10], 'min_samples_leaf': [1, 3, 4], 'bootstrap': [True, False]}
Best Parameters:
{'n_estimators': 10, 'min_samples_split': 10, 'min_samples_leaf': 4, 'max_features': 'auto', 'max_depth': 70, 'bootstrap': True}
```

Our output gives the best parameters as 10 for n_estimators and min_samples_split. It also gives 4 for min_samples_leaf, auto for max_features, 70 for max_depth, and true for bootstrap.

### Grid search vs. Random search
Off the top of one's head, it would seem that grid search would be the better method as every possible hyperparameter combination is tested. But this is not always the case. These two strategies can be compared in terms of dimensionality.

With grid search, the greater the dimensionality, the greater the number of hyperparameter combinations to search for. As such, there is a greater chance of grid search being impractical. 

The time taken to search would not justify the use of grid search. The computational resources in use would also prove unfeasible with an increase in the number of parameters. 

Each additional parameter would increase the number of evaluations exponentially. With a smaller number of hyperparameters, grid search may edge out the random search. 

This is because grid search would guarantee accuracy by exhausting all possible combinations. Similar to grid search, the higher the dimensionality, the greater the time taken to find the right set of hyperparameters. Higher dimensionality also means a greater number of iterations. 

Nonetheless, the random search may offer a greater chance of realizing the optimal parameters. Even though random search may not be as accurate as grid search, we also get to control the number of combinations to attempt. 

The random search model may be trained on the optimized parameters within a much shorter time than when using grid search. This also results in much more efficient computational power used in comparison to grid search. 

### Wrapping up
We mentioned that grid search attempts all hyperparameter combinations. Random search lets us specify how many models we want to train, therefore controlling the number of combinations attempted. 

This introduces a trade-off between the assurance of finding the best parameters and the computational resources/time used. 

We have gone through the basic implementation of random search. I believe this post has provided a distinction between random search and grid search. 

Until the next optimization post, good luck!

Happy coding.

### References and further reading
1. [sklearn.model_selection.RandomizedSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV)

2. [GridSearchCV or RandomSearchCV?](https://towardsdatascience.com/gridsearchcv-or-randomsearchcv-5aa4acf5348c)

3. [How does random search algorithm work? Python implementation](https://medium.com/analytics-vidhya/how-does-random-search-algorithm-work-python-implementation-b69e779656d6)

4. [Why Is Random Search Better Than Grid Search For Machine Learning](https://analyticsindiamag.com/why-is-random-search-better-than-grid-search-for-machine-learning/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
