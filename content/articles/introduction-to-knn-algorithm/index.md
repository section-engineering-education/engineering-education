---
layout: engineering-education
status: publish
published: true
url: /introduction-to-knn-algorithm/
title: An Introduction to KNN Algorithm
description: In this article, we will cover the basics of a supervised machine learning algorithm called K-Nearest Neighbors. We will also learn to build this algorithm from scratch.
author: srishilesh-p-s
date: 2021-04-26T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-knn-algorithm/hero.jpg
    alt: An Introduction to KNN Algorithm
---
In this article, we will learn about a supervised machine learning algorithm called K-Nearest Neighbors (KNN). This algorithm can be used for tasks like classification and prediction. 
<!--more-->
By the end of this article, you will get an overview of various supervised machine learning algorithms, what the KNN algorithm is, how it works, and also learn to build the algorithm from scratch. As a prerequisite, a little understanding of machine learning and Python would help beginners.

### Table of contents
- [Supervised learning](#supervised-learning)
- [K-Nearest Neighbors algorithm](#k-nearest-neighbors-algorithm)
- [Step by step guide](#step-by-step-guide)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Supervised learning
> According to [Wikipedia](https://en.wikipedia.org/wiki/Supervised_learning), Supervised learning is the machine learning task of learning a function that maps an input to an output based on example input-output pairs. It infers a function from labeled training data consisting of a set of training examples.

In simpler words, it can be said that we are teaching the machine how to predict or classify by showing some samples (training and testing) of the possible predictions or classifications.

We use training data with features and labels, to enable the machine to learn first. Later, it is being validated or tested using the test data. Thereby, this method of learning is called supervised learning.

### K-Nearest Neighbors algorithm
K-Nearest Neighbors (KNN) algorithm is one such supervised learning method that can be used for classification and regression.

Classification refers to a predictive modeling problem where a class label is predicted for a given example of input data. For example, classification of an animals as cat or dog, emails as spam or not.

In classfication, the prediction values are discrete values like `0` or `1`, which relates to `true` or `false`. There can be multi-variate (more than one label) classifications as well.

Whereas, regression is another type of problem, that requires prediction of continuous values. For example, if we want to predict the approximate value of a share in the stock market, we will have to use regression.

Steps followed in KNN algorithm:
1. Load the training and testing datasets.
2. Specify or choose the value of `K`.
3. For each point on the test data perform the following:
 3. 1. Calculate the distance between the point and each point of the training dataset. We can use Euclidean distance or Manhattan distance.
 3. 2. Sort the values in ascending order based on distances.
 3. 3. Find the top K values from the sorted list.
 3. 4. Find the frequency (Mode) of the labels of the top K values.
 3. 5. Assign the mode to the test data point.
 3. 6. The assigned value is the classified or predicted value for the particular test data point.

To understand the algorithm mathematically, you could refer to [this](http://www.datascribble.com/blog/machine-learning/understanding-math-behind-knn-codes-python/) article.

![KNN algorithm](/engineering-education/introduction-to-knn-algorithm/knn.png)

*[Image source](https://www.javatpoint.com/k-nearest-neighbor-algorithm-for-machine-learning): KNN algorithm shown visually*

Now, we will learn how to build the above steps from scratch.

### Step by step guide
Let's learn to build the K-Nearest Neighbors algorithm from scratch. Though, we use certain libraries like `sklearn` containing pre-defined methods to classify or predict using the KNN algorithm; learning to build it from scratch would help grasp us the concepts better and more effectively.

#### Objective
As a demonstration, we will be making use of a `Diabetes` dataset, which contains various parameters to classify if a person has diabetes or not.

You can download the dataset [here](https://github.com/srishilesh/Machine-learning/blob/master/Classification/KNN/diabetes.csv).

A sample screenshot of the dataset is shown below:

![Screenshot of the dataset](/engineering-education/introduction-to-knn-algorithm/dataset.PNG)

*Screenshot of diabetes dataset*

#### Installation
For building the KNN algorithm from scratch, you can install any version of Python above 3.0.

To download Python, please use [this link](https://www.python.org/downloads/).

On installing Python, you have to install the following libraries:
- [Numpy](https://numpy.org/install/)
- [Pandas](https://pandas.pydata.org/docs/getting_started/install.html)
- [Operator](https://docs.python.org/3/library/operator.html)
- [Statistics](https://docs.python.org/3/library/statistics.html)

You can install the above libraries using the following commands:
- Numpy using `pip install numpy`.
- Pandas using `pip install pandas`.
- Operators using `pip install pyoperators`.
- Statistics using `pip install statistics`.

#### Import libraries
On setting up the environment, let's start coding!

First, you'll have to import those necessary libraries.

```python
import pandas as pd
import numpy as np
import operator
from statistics import mode
```

#### Read the dataset
Now, you have to import the dataset and read it by using a function called `read_csv()`. This function takes the `CSV` file as an argument and returns a [data frame](https://pandas.pydata.org/pandas-docs/stable/user_guide/dsintro.html#dataframe).

```python
#col_names = ['pregnant', 'glucose', 'bp', 'skin', 'insulin', 'bmi', 'pedigree', 'age', 'label']
data = pd.read_csv("diabetes.csv")
```

![Dataset sample](/engineering-education/introduction-to-knn-algorithm/dataset.PNG)

*First 5 rows of the dataset*

#### Build utility functions

#### Find Euclidean Distance
In the KNN algorithm, we use Euclidean distance to find the distance between any two points. Euclidean distance is the squares of differences between any two points.

The formula for Euclidean distance is:

![Euclidean distance](/engineering-education/introduction-to-knn-algorithm/euclidean-distance.PNG)

*The formula for Euclidean distance*

Alternatively, we can use other distance measures like Manhattan distance or Absolute distance.

```python
def euclidean_distance(x, y, length):
    # Dictionary to keep track of coordinate as key, with distance as the value
    sum_squared_distance = {}
    for i in range(len(x)):
        sum = 0
        sum += np.square(x[i][0] - y[0]) # Square of differnce in x-axis
        sum += np.square(x[i][1] - y[1]) # Square of differnce in y-axis
        sum_squared_distance[i] = np.sqrt(sum)
    return sum_squared_distance
```

#### Sorting dictionary based on the value
A function to accept a dictionary as an input argument and return a sorted dictionary based on values.

A Python dictionary contains a "key-value" pair. When we use `sort()` for a dictionary, by default it gets sorted based on the "key".

Since we want sorting based on "value", we will have to use a custom sorting method, as shown below:

```python
# Sort the items in the dictionary of the calculated distances    
def sort_distance(distance):    
    sorted_d = sorted(distance.items(), key = operator.itemgetter(1))
    return sorted_d
```

Here, the `items()` function returns a list of tuples containing "key-value" pairs. And, here we use the `key` for sorting, as the "Key".

#### Find top K values
In KNN, the `K` value specifies the number of maximum nearest neighbors used for classifying or predicting.

Here, we have to find the top `K` values. 

To do so, we make use of the following function:

```python
# Find the Top K classes from the sorted items
def top_k_dictionary(sorted_d):
    top_k = {}
    for i in range(k):
        top_k.update(sorted_d[:k])
    return top_k
```

Here, `[:k]` is a slicing function used in Python, that helps us to fetch the first `k` values starting from `0`. This is used as a shorthand notation for `[0:k]`.

#### Classification using mode
On finding the top `K` elements, we use `mode` to find the possible classification outcome. Mode is a statistical measure, that tells us the maximum occurrence of a particular value.

```python
# Find the mode of the Top K class and it is the prediction
def top_k_class(query, top_k, data_dict_train, data_dict_test):        
    final_top_k = []
    for i in top_k:
        final_top_k.append(data_dict_train[i][0])
    print(query," Prediction is ",data_dict_test[mode(final_top_k)])
```

The code snippet above prints the possible predictions for the query.

#### Build the KNN function
Having built the utility functions, now we'll have to make use of them to build our actual function for finding the K-Nearest Neighbors.

```python
# Find the prediction of the query
def knn(data,query,k):
    distances = {}
    sort = {}
    length = 2
    data_dict_train = {} # Dictionary to hold train data
    data_dict_test = {} # Dictionary to hold test data
    for i in range(len(data)):
        data_dict_train[i] = data[i]
        data_dict_test[i] = y[i]
        
    distance = euclidean_distance(data, query, length) # returns a dictionary of euclidean distances
    sorted_d = sort_distance(distance) # returns a sorted dictionary based on value
    top_k = top_k_dictionary(sorted_d) # finds the top K elements
    top_k_class(query, top_k, data_dict_train, data_dict_test) # prediction function
```

#### Build the main function
Now, let's build a `main()` function which calls the `knn()` function by passing the required features and labels, along with some sample queries to demonstrate classification.

```python
# Pass the input and output lists    
def main():
    x = data[['Pregnancies','Glucose','BloodPressure','SkinThickness','Insulin','BMI','DiabetesPedigreeFunction','Age']].values # Features
    y = data.iloc[:,-1] # Labels
    k = 3 # Specifying the value of K

    query = [[0,100],[5,100]] # 2 possible test data query
    for i in query:
        knn(x, i, k)

if __name__=='__main__':
    main()
```

**Output:**

```bash
[0, 100]  Prediction is  1
[5, 100]  Prediction is  0
```

### Conclusion
We learned about a supervised learning algorithm called the K-Nearest Neighbors. We also built the KNN algorithm from scratch.

Full code for the KNN algorithm from scratch can be found [here](https://github.com/srishilesh/Machine-learning/blob/master/Classification/KNN/KNN_scratch.ipynb).

To learn more about the pre-built KNN algorithm, refer [sklearn](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html) documentation page.

To summarize:
- We learned about supervised learning.

- We understood the core concept of K-Nearest Neighbors and its applications.

- We learned how to work build a KNN algorithm from scratch.

Happy coding!

### Further reading
- [Sklearn documentation page](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html)
- [KNN by Wikipedia](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)
- [Article by TowardsDataScience](https://towardsdatascience.com/machine-learning-basics-with-the-k-nearest-neighbors-algorithm-6a6e71d01761)
- [Article by AnalyticsVidhya](https://www.analyticsvidhya.com/blog/2018/03/introduction-k-neighbours-algorithm-clustering/)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)