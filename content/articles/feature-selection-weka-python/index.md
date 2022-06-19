---
layout: engineering-education
status: publish
published: true
url: /feature-selection-weka-python/
title: Feature Selection in Weka using Python
description: This tutorial will walk the reader through perfoming feature selection in weka using Python.
author: paul-romans
date: 2022-06-19T00:00:00-10:15
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/feature-selection-weka-python/hero.jpg
    alt: Feature selection in Weka using Python Image
---
Weka is a collection of machine learning algorithms for data mining tasks. Most of the operations on Weka are performed on the Graphical User Interface. However, this limits the users from the programming experience and understanding of the behind the scenes operations.
<!--more-->
This is the inspiration for this article, which sets to illustrate feature selection in Weka by actually writing the Python code for the implementation. 

### What is feature selection
Feature selection is a method of reducing the number of inputs supplied to a machine learning model such that only the relevant inputs are used. The technique is applied to improve the accuracy of the machine learning model. 

### Types of feature selection
There are three feature selection techniques; wrapper, filter, and embedded methods. The wrapper feature selection method creates several models with different subsets of the input features. It then selects the best performing model based on a performing matrix preset before the selection. 

The filter feature selection takes the value of the relationship between each input variable and the target output. Then, the scores of each relationship are used to choose what attributes are to be included in the dataset.

The embedded method leverages the benefits of both wrapper and filter methods. In addition, it carefully selects the most critical attributes that contributed to the results of a particular training iteration.

### Benefits of feature selection?
Feature selection is applied to improve the machine learning process and accelerate the speed at which the prediction is made. Since it only selects the essential variables, the time to utilise all the attributes in the data set is minimised. It also eliminates redundant and irrelevant features, which would have taken even more time.

### Prerequisites
To follow along with this tutorial, you should have the following:
- Python 3
- Python Weka Wrapper
- Open JDK 8

### Setting up an environment for feature selection
Fiets create a virtual environment using the command below:

```bash
virtualenv venv
```

Next, activate the created virtual environment using the command below:

```bash
source venv/bin/activate
```

To set up the environment for the development, you need to install the following packages.

```bash
cycler==0.11.0
fonttools==4.30.0
joblib==1.1.0
kiwisolver==1.4.0
numpy==1.22.3
packaging==21.3
Pillow==9.0.1
pyparsing==3.0.7
python-dateutil==2.8.2
six==1.16.0
tomli==2.0.1
weka==1.0.6
```

The easiest way to install them is by creating a `requirements.txt` file in the root directory where the virtual environment was created, then executing the command below:

```bash
pip install -r requirements.txt
```

In this step, create a file named `feature-selection.py` and then import the required libraries as shown below. We will see how each library is used as we proceed.

```py
import traceback
from itertools import combinations
from math import ceil, log2

import weka.core.jvm as jvm
from weka.classifiers import Classifier, Evaluation
from weka.core.classes import Random
from weka.core.converters import Loader
from weka.filters import Filter
```

### Reading the dataset
We will start by reading the dataset. We will use the Diabetes Disease dataset, which you can find using [this link](https://www.kaggle.com/datasets/mathchi/diabetes-data-set).

To load the dataset, use the code snippet below:

```py
def load_dataset():
    loader = Loader("weka.core.converters.ArffLoader")
    dataset = loader.load_file("diabetes.arff", class_index="last")
    return dataset
```

### Selection of the attributes
This step will first set a list of classifier algorithms we will use in the procedure. Then, these algorithms will be used to evaluate the model accuracy and determine which features give the most accurate classification.

```py
def select_attributes(dataset):
    classifier_algorithms = [
        ("IBk KNN", Classifier(classname="weka.classifiers.lazy.IBk")),
        ("Naive Bayes", Classifier(classname="weka.classifiers.bayes.NaiveBayes")),
        ("J48 Decision Tree", Classifier(classname="weka.classifiers.trees.J48")),
    ]
```

Next, we need to specify the number of columns to work with. The number of columns is obtained by the total number of attributes in the dataset minus one, the classification result.

```py
number_of_columns = dataset.num_attributes - 1
```

Next, we determine all the possible column combinations in the dataset. We do this because we are trying to find all the possible combinations of the attributes, and then from there, we find the best performing combination.

```py
column_combinations = []
    for r in range(1, number_of_columns + 1):
        column_combinations.extend(list(combinations(range(number_of_columns), r)))
```

Next, we obtain a filtered dataset from the input dataset by removing less required attributes using the code snippet below:

```python
results = {classifier[0]: [] for classifier in classifier_algorithms}
for selected_columns in column_combinations:
    columns_to_remove = set(range(number_of_columns)) - set(selected_columns)
    remove = Filter(
        classname="weka.filters.unsupervised.attribute.Remove",
        options=["-R", ",".join(map(lambda x: str(x + 1), columns_to_remove))],
    )
    remove.inputformat(dataset)
    filtered = remove.filter(dataset)

    for classifier_name, classifier in classifier_algorithms:
        classifier.build_classifier(filtered)
        evaluation = Evaluation(filtered)
        evaluation.crossvalidate_model(classifier, filtered, 5, Random(42))
        results[classifier_name].append(
            (filtered.attribute_names()[:-1], evaluation.percent_correct)
        )

```

Next, we return the classifier result for each algorithm in the list of algorithms stated before.


```py
for classifier, result in results.items():
    results[classifier] = sorted(result, key=lambda x: x[1], reverse=True)
return results
```

### Working on the main function
The main function is where all other functions are called for executions. The first thing here is to call the read data function to read the dataset we intend to use.

```py
def main():
    dataset = load_dataset()

```

Next, we store all the column names, excluding the classification class column.

```py
columns = dataset.attribute_names()[:-1]
```

We then call the `select_attributes` function to perform the attribute selection.

```py
results = select_attributes(dataset)
```

In the next step, we will print each column and its performance to the model's prediction to help us know what attribute contributed what percentage to the model's prediction.

```py
columns_performance = dict.fromkeys(columns, 0)
    for classifier_name, result in results.items():
        print(classifier_name)
        to_n_attributes = 5
        print_results("Best", result[:to_n_attributes])
        for selected_columns, accuracy in result:
            number_selected = len(selected_columns)
            for column in columns:
                if column in selected_columns:
                    columns_performance[column] += accuracy / number_selected
    columns_performance = dict(sorted(columns_performance.items(), key=lambda item: item[1], reverse=True))

    # Printing the attribute importance
    print("\nAttribute Importance in the Dataset")
    for column, performance in columns_performance.items():
        print(f"\t{column}: {performance}")
```

Lastly, add the code snippet below to print the final results:

```py
def print_results(result_type, result):
    print(f"\t{result_type}")
    for columns, accuracy in result:
        print(f"\t\t{columns}: {accuracy:.4f}%")
```

### The driver code
We need to specify the primary function that calls the JVM since the Weka library needs JVM to operate. Create the function below, which will start the JVM when execution is needed and stop it once it is finished.

```py
if __name__ == "__main__":
    try:
        jvm.start()
        main()
    except Exception as e:
        print(traceback.format_exc())
    finally:
        jvm.stop()
```

### Testing the code
When we run our code, it gives an output of each classification algorithm and the selected best attributes. It also prints out the essential attributes, which are the selected attributes.

```bash
Columns: ['preg', 'plas', 'pres', 'skin', 'insu', 'mass', 'pedi', 'age']
IBk KNN
    Best
        ['preg', 'plas', 'insu', 'mass']: 72.3958%
        ['preg', 'plas', 'pres', 'insu']: 72.0052%
        ['preg', 'plas', 'pres', 'insu', 'mass', 'pedi', 'age']: 71.7448%
        ['plas', 'insu', 'age']: 71.3542%
        ['preg', 'plas', 'insu', 'age']: 70.9635%
        
Naive Bayes
    Best
        ['plas', 'mass', 'pedi', 'age']: 77.3438%
        ['preg', 'plas', 'pres', 'mass', 'pedi']: 77.0833%
        ['preg', 'plas', 'pres', 'insu', 'mass', 'pedi']: 76.9531%
        ['preg', 'plas', 'pres', 'skin', 'mass', 'pedi']: 76.6927%
        ['preg', 'plas', 'pres', 'pedi']: 76.5625%
        
J48 Decision Tree
    Best
        ['plas', 'pres', 'mass', 'pedi', 'age']: 75.6510%
        ['plas', 'pres', 'mass', 'age']: 75.5208%
        ['plas', 'pres', 'skin', 'mass', 'age']: 75.5208%
        ['preg', 'plas', 'pres', 'skin']: 75.3906%
        ['plas', 'pres', 'skin', 'mass', 'pedi', 'age']: 75.3906%
    


Attribute importance (heuristic):
    plas: 6919.9380
    mass: 6600.2365
    preg: 6579.5027
    insu: 6556.4481
    age: 6552.0908
```

### Conclusion
In this tutorial, we used the Weka wrapper library to demonstrate how to conduct feature selection using the Python programming language. First, we loaded the data and used three algorithms to determine the most critical features in classifying the Diabetes dataset. Then, we showed the essential features selected by our program.

You can find the code [here](https://replit.com/@paulromans/Feature-Selection#main.py), but you must set up the libraries to run it on your local machine.

Happy coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
