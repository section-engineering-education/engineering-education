---
layout: engineering-education
status: publish
published: true
url: /genetic-programming-models-using-tpot/
title: Genetic Programming Models Using TPOT
description: Genetic programming is a technique by which models and programs evolve. With time the model finds the optimal solution. The model starts from poor or unfit parameters. It then gradually evolves into a superior model.
author: bravin-wasike
date: 2021-11-24T00:00:00-17:10
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-gan-from-scratch/hero.jpg
    alt: Genetic programming models TPOT
---
Genetic programming is a technique by which models, and programs evolve. With time, the model finds the optimal solution. The model starts with poor or unfit parameters. It then gradually evolves into a superior model.
<!--more-->
It does this in an automated way to reduce time in model building and evolving processes. It automates stages in machine learning from dataset pre-processing to building the model.

During the automation process, it uses machine learning pipelines. Machine learning pipelines are used to find the best parameters. In doing so, it produces an optimal machine learning model.

TPOT automates the machine learning process logically and intelligently. It does this by exploring all machine learning parameters and pipelines. It only uses the ones that will give the best results.

In this tutorial, we will use two approaches to building the machine learning model. First, we will build a model without applying genetic programming. Second, we will follow all the traditional stages from dataset pre-processing to model building.

In the second approach, we will use TPOT to build our model. It will apply all the concepts of genetic programming. The best algorithm will survive.

### Table of contents
- [Prerequisites](#prerequisites)
- [Getting started with TPOT](#getting-started-with-tpot)
- [Model building using individual algorithms](#model-building-using-individual-algorithms)
- [Loading machine learning packages](#loading-machine-learning-packages)
- [Importing exploratory data analysis packages](#importing-exploratory-data-analysis-packages)
- [Checking for missing values](#checking-for-missing-values)
- [Convert the species column](#convert-the-species-column)
- [Adding labels and features](#adding-labels-and-features)
- [Building model using logistic regression](#building-model-using-logistic-regression)
- [Building using random forest classifier algorithm](#building-using-random-forest-classifier-algorithm)
- [Model building using TPOT](#model-building-using-tpot)
- [Exploring TPOT methods and attributes](#exploring-tpot-methods-and-attributes)
- [Splitting dataset](#splitting-dataset)
- [Initializing our TPOT application](#initializing-our-tpot-application)
- [Fitting](#fitting)
- [Making Predictions](#making-predictions)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
The reader must:
- Know [Python](https://www.python.org/) programming.
- Know how to work with [machine learning models](/engineering-education/house-price-prediction/).
- Be familiar with [machine learning lifecycle processes.](https://www.javatpoint.com/machine-learning-life-cycle)
- Know how to use [Google Colab](https://research.google.com/colaboratory/). We will use Google Colab instead of [Jupyter Notebook](https://jupyter.org/) in this tutorial.

> NOTE: [Google Colab](https://research.google.com/colaboratory/) has a Graphical Processing Unit (GPU) and Tensor Processing Unit (TPU), which are fast.
> TPOT requires a powerful tool for processing.

### Getting started with TPOT
TPOT is a powerful Python library used to automate the machine learning process. TPOT uses [genetic programming](https://www.sciencedirect.com/topics/medicine-and-dentistry/genetic-programming).

TPOT uses three concepts during the genetic programming process.

1. *Selection*: TPOT selects the algorithm that will give the best results.
2. *Crossover*: After selecting the algorithms, these algorithms are cross-bred to find a hybrid solution.
3. *Mutation*: Over time these algorithms change and become more advanced. This yields the optimal solution.

TPOT is built on top of powerful Python libraries such as [NumPy](http://www.numpy.org/), [scikit-learn](http://www.scikit-learn.org/), [pandas](http://pandas.pydata.org/) and [joblib](https://joblib.readthedocs.io/en/latest/). This makes it powerful for genetic programming and automation.

[Scikit-learn] contains the following algorithms for classification and regression.

1. [Support Vector Machines.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
2. [Stochastic Gradient Descent.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
3. [K- Nearest Neighbors.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
4. [Naive Bayes.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
5. [Decision Trees.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
6. [Random Forest.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
7. [Logistic Regression.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
8. [Linear Regression.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)

TPOT iterates through these algorithms and finds the best one. The one with the highest accuracy score is the one that is chosen. It can also combine two or more algorithms to come up with a hybrid algorithm.

To see the power of TPOT, we start by using individual algorithms to build the model.

We will use two algorithms [linear regression](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning) and [random forest](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning) when building the model.

We will compare the accuracy score of each algorithm. This enables us to see which one is better.

In the next section, we will use TPOT and build a machine learning model. First, TPOT combines all the available classification algorithms and finds the optimal one. Then, the one with the highest accuracy score is chosen.

### Model building using individual algorithms
We will use the iris dataset to train our model. The model classifies the flower species based on the input features. To get this dataset, click [here](https://drive.google.com/file/d/1gmfoaF14KhMybNThcaU72edgbFm7DO9l/view?usp=sharing).

A snip of the dataset is shown in the image below.

![Output](/engineering-education/genetic-programming-models-using-tpot/dataset-image.jpg)

### Initialize the dataset URL
We have to initialize the dataset URL. This enables us to download the dataset into our working directory.

```python
dataset_url = "https://drive.google.com/file/d/1gmfoaF14KhMybNThcaU72edgbFm7DO9l/view?usp=sharing"
```

### Loading machine learning packages

```python
import train_test_split from sklearn.model_selection
import LogisticRegression from sklearn.linear_model
import RandomForestClassifier from sklearn.ensemble
```

In the above code snippet, we have imported the following.

- `train_test_split`: Used to split the dataset into `train_set` and `test_set`. It is used during the training and testing phases.
- `LogisticRegression`: We will use this algorithm when building our model.
- `RandomForestClassifier`: This is the second algorithm used to build our model.

> NOTE: We will use the two algorithms `LogisticRegression` and `RandomForestClassifier`. We then compare the accuracy score. Later we will use TPOT to combine all the algorithms when building our model and find the best one.

### Importing exploratory data analysis packages
These packages are helpful when it comes to data analysis and manipulation.

```python
import pandas as pd
import numpy as np
```

We will use `pandas` to import and read our dataset.

```python
df = pd.read_csv(dataset_url)
```

#### Dataset column and rows
Use the following command to check rows and columns.

```python
df.head()
```

![Output](/engineering-education/genetic-programming-models-using-tpot/output.png)

### Checking for missing values
We have to check for missing values. Our dataset should not contain any missing values.

```python
df.isnull().sum()
```

The output is shown below:

![Output](/engineering-education/genetic-programming-models-using-tpot/missing-values.png)

### Convert the species column
We need to convert the `species` column to numeric. The numeric values are the dictionary of labels used for prediction.

Labels are the target or the output variable. This is what the model wants to predict.

The labels will be as follows.

- `o` for `setosa`
- `1` for `versicolor`
- `2` for `virginica`

```python
data = data_set = {dataset:index for index,dataset in convert(df['species'].unique())}
```

Output after conversion:

![Output](/engineering-education/genetic-programming-models-using-tpot/output-columns.png)

We then add the dictionary labels into our dataset. We will add the three-label dictionaries in a new column called `new_label`.

```python
df['new_label'] = df['species'].map(data_set)
```

To see new columns, run this code snippet:

```python
df.head()
```

The output will be a dataset with an additional column as shown.

![Output](/engineering-education/genetic-programming-models-using-tpot/new-dataset.png)

We now need to set our model features and labels as `xfeatures` and `ylabels`.

### Adding labels and features
- `xfeatures` are the independent variables in our dataset that act as the inputs for our model.

Our features are `sepal_length`, `sepal_width`, `petal_length` and `petal_width`.

- `ylabels` will be used as an output when making a prediction.

Our labels are `0`, `1` and `2`.

```python
xfeatures = df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
ylabels = df['new_label']
```

After setting features and labels, we can now start building our model.

### Building model using logistic regression
Import a cross-validation score. This is used to test the effectiveness of our model and its ability to make new predictions.

```python
from sklearn.model_selection import cross_val_score
```

We can now use `cross_val_score` in the `LogisticRegression` algorithm. We will set the number of folds to `10`. The model will iterate ten times and find the average accuracy after the ten iterations. Thus, the model learns from the dataset and improves over time. We also built our model using the `xfeatures` and `ylabels` we created earlier.

```python
cv_scores = cross_val_score(LogisticRegression(),xfeatures,ylabels,cv=10)
```

Will iterate ten times and output the accuracy score after each iteration. To see the accuracy score after each iteration, use the following command.

```python
cv_scores
```

The accuracy scores outputs:

![Logistic regression accuracy scores](/engineering-education/genetic-programming-models-using-tpot/accuracy-scores.png)

To get the average score from the above ten iterations, we use the following command.

```python
print(np.mean(cv_scores))
```

The average score:

```bash
0.9707983
```

### Building using random forest classifier algorithm
We will use Random Forest as the second algorithm to model the data. We can then compare the two algorithms' accuracy scores.

```python
rf_cv_scores = cross_val_score(RandomForestClassifier(),xfeatures,ylabels,cv=10)
```

We will do the same ten folds in training our model. The score of the algorithm.

```python
rf_cv_scores
```

Output:

![Random forest accuracy scores](/engineering-education/genetic-programming-models-using-tpot/accuracy-scores2.png)

Average of the algorithm.

```python
print(np.mean(rf_cv_scores))
```

Output:

```bash
0.9666666666666666
```

- `LogisticRegression` and `RandomForestClassifier` gives accuracy scores of `0.9707983` and `0.9666666666666666`. It shows that `LogisticRegression` is better.

A user would choose `LogisticRegression` when building the model. Still, this might not be the best one because we have only compared two algorithms.

The process of building models using different algorithms is tiring. That's why TPOT is the best solution when dealing with many algorithms.

TPOT combines all the available algorithms for classification and finds the best one. Thus, it automates the process of model building using genetic programming and saves a lot of time from manually comparing all the available algorithms.

In the next section, we will see how to build a machine learning model using TPOT.

### Model building using TPOT
To use TPOT, we install it into our machine. For example, we install TPOT using the following command.

```python
!pip install tpot
```

We then import TPOT as shown.

```python
import tpot
```

### Exploring TPOT methods and attributes
We explore the package to know the available methods we can use in model building.

```python
dir(tpot)
```

It will list all the available methods and attributes found in TPOT.

![Methods and attributes](/engineering-education/genetic-programming-models-using-tpot/methods-and-attributes.png)

In the output, we see the available method. The `TPOTClassifier` method is what we are interested in. We use `TPOTClassifier` when building our classifier model. Let's split our dataset before we begin.

### Splitting dataset
We split our dataset into `train_set` and `test_set`.

- 70% of our data is the`train_set`.
- 30% is the `test_set`.

```python
x_train,x_test,y_train,y_test = train_test_split(xfeatures,ylabels,test_size=0.3,random_state=42)
```

In the code above:
- `x_train` and `y_train` are used in the training phase.
- `x_test`and `y_test` in the testing phase.

### Initializing our TPOT application
We initialize our TPOT application using the `TPOTClassifier()` method. But, first, we pass the following parameters.

1. Set `generations=5`. Generation represents the number of iterations TPOT will run. This helps TPOT to find an optimal pipeline. Here we will set the generation to 5.
2. Set `random_state=42`. It is used to reproduce out of our split dataset.
3. Set `verbosity=2`. It is used to give progress and information about the TPOT operation.

```python
tpot = TPOTClassifier(generations=5,verbosity=2, random_state=42)
```

After initializing TPOT, we fit our model into our dataset.

### Fitting
We fit `x_train` and `y_train` into the `tpot` method. This allows `tpot` to learn from the `train_set` dataset. It understands patterns and gains knowledge. It eventually used this knowledge to make predictions.

```python
tpot.fit(x_train,y_train)
```

We will have an optimization process. TPOT will iterate 5 times to find the optimal pipeline.

> NOTE: Make sure you use [Google Colab](https://research.google.com/colaboratory/) for this process to run faster.
> By the end of the five iterations, we will get an output with the best algorithm to use for model building. TPOT will also give us the highest accuracy scored by our model.

Useful since it saves the users time by automating the whole process. During this optimization process, TPOT uses the concept of genetic programming. As a result, it eventually finds the best algorithm.

We choose the best algorithm, and subsequently, the poor algorithms are dropped. After the optimization process, the output is as shown.

![Optimization process](/engineering-education/genetic-programming-models-using-tpot/methods-and-attributes.png)

The best algorithm chosen is `KNeighborsClassifier`. It was automatically selected from all the available classification algorithms. This saves time in comparing the algorithms.

TPOT also helps us know the exact parameters used to achieve such optimization. For example, the parameter used is such as `n_neighbors=20`.

The accuracy scores are as follows after `5` iterations: `0.9714285714285713`, `0.9714285714285715`, `0.9714285714285715`, `0.9714285714285715` and `0.9714285714285715`.

TPOT takes the highest score as the model accuracy. Thus, the final model accuracy will be `0.9714285714285715`.

### Making predictions
We can use our optimized model to make predictions. The input sample contains flower lengths and widths.

To predict, the input must be in an array as shown. The `reshape` method allows us to have a single column showing the prediction output.

```python
example = np.array([6.3,3.5,5.6,2.4]).reshape(1,-1)
```

We can now make predictions using the `predict()` method, as shown.

```python
tpot.predict(example)
```

The prediction outcome is as shown.

```bash
array([2])
```

The outcome is `2`, which represents `virginica`. This gives an accurate prediction. This shows we can accurately make predictions using our TPOT application.

### Conclusion
In this tutorial, we learned about genetic programming. Genetic programming allows the model to evolve. This enables us to get the best algorithm for the model. We also learned about TPOT. It is an important library used for the automation during genetic programming.

We started by preparing our dataset. We then used this dataset to build a model using two algorithms. We then compared the two algorithms to find the best one.

Finally, we used POT to find the best algorithm to use when building a machine learning model. Through genetic programming, the best algorithm was `KNeighborsClassifier`.

This tutorial shows us how TPOT is a useful tool. It also shows us how genetic programming can be applied to find the optimal algorithm.

To get the Google colab link, click [here](https://colab.research.google.com/drive/1G6UDmC2HCCq_mn5NeS0MZrPH74G3hZLQ?usp=sharing)

Happy coding!

### References
- [Implementation for this tutorial](https://colab.research.google.com/drive/1G6UDmC2HCCq_mn5NeS0MZrPH74G3hZLQ?usp=sharing)
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Genetic programming](https://www.cs.ucdavis.edu/~vemuri/classes/ecs271/The%20GP%20Tutorial.htm)
- [Pandas Documentation](https://pandas.pydata.org/)
- [NumPy Documentation](https://numpy.org/)
- [TPOT Documentation](http://epistasislab.github.io/tpot/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

