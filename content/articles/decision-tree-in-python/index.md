---
layout: engineering-education
status: publish
published: true
url: /decision-tree-in-python/
title: Decision Trees in Python
description: This article will provide a detailed information on decision trees in python and how to use them in classifications and regression problems.
author: stanley-juma
date: 2021-10-21T00:00:00-11:37
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/decision-tree-in-python/hero.png
    alt: Decision trees in python image
---
The decision tree is a member of the supervised learning algorithm used for both classification and regression problems. More often, the decision tree is used for classification problems.
 <!--more-->
The tree algorithm is so-called due to its tree-like structure in presenting decisions and decision making processes. It helps us make an optimal choice in a complex situation with various alternatives, and we are needed to take the best strategy to obtain an optimal outcome.

### Prerequisites
To follow along with this article comfortably, you will require:
- To have Python installed on your computer.
- Be familiar with the scikit-learn library.

### Understanding decision trees
We have two types of decision trees; **regression decision tree** and **classification decision tree**. A regression decision tree is a tree created on data whose target variable is continuous, while a classification decision tree is implemented on data whose target variable is categorical.

Decision trees are composed of nodes and paths. Nodes in the decision tree are of two broad categories; **Decision node** and a **Leaf node**.

The decision node is where we pass a rule and split the data based on such a rule. All decision nodes have paths coming out of them. On the other hand, a **Leaf node**is a node that only appears at the terminal of a decision tree.

Leaf nodes have no paths coming out of them and thus have no further splits. On this node, we list the values of the target variable. The leaf node is also known as **terminal node**.

The node at the top of a decision tree is called the `root node`. A feature that fits this node is determined using some splitting measures that we shall look at later in this article.

The main property of a root node is that it has no incoming paths. Therefore, the majority of decision nodes appears between the root node and the leaf node. These nodes are called  **internal nodes** of a decision tree.

An **internal node**,  also known as *sub-note*, has an incoming and outgoing channel(s). Together with the terminal nodes, internal nodes form the **branch** of a decision tree.

The channels we have just mentioned and connecting the entire decision tree anatomy are called **paths**. Paths represent the best route we can take to attain optimal outcomes.

### Terminologies used in decision trees
Other terminologies you may encounter in the decision tree are:
1. **Pruning:** This means eliminating some of the internal nodes from our tree to overcome the problem of **overfitting**. Overfitting is a major threat faced with the decision tree.
2. **Parent Node:** This is the node on which we split other nodes.
3. **Child Node:** These are sub-nodes of a parent node.
4. **Best attribute** This refers to the feature that provides optimal value depending on splitting criteria used.
5. **Splitting** is terminology in Decision Tree, which mean dividing a decision node into at least two sub-nodes.

As we mentioned earlier, the decision tree starts with the root node. Given the training dataset, we use a technique known as **Attribute Selection Measure**, usually abbreviated as **(ASM)**, to determine which features qualify to be used as the **best attribute** for splitting our tree.

**Attribute Selection Measure** technique offers us two criteria with whose aid we can determine the best attribute on which we do our split.
These criteria are:
- Information Gain
- Gini Index

### Information Gain
Information Gain measures how the **Entropy** of a set S is reduced after splitting it into the feature classes, say A. Information gain determines how much information we obtain by choosing a particular attribute and splitting our tree on it. We get `information gain` by finding the difference between the *entropy* before and the *entropy* after the split, i.e.,
  
**I.G = Entropy(Before split) - [Weighted entropy(after split)]**

According to this criterion, the feature that provides more information from all features is the **best attribute**. Therefore, we split our tree on such an attribute.
  
Now the task is to determine the *best attribute* from all attributes of a training set. To obtain our best attribute, it requires us to engage ourselves with some computations.

Entropy is a metric that measures how mixed up data is. The higher the entropy value an attribute has, the more information we can derive from such an attribute.

If the target variable of a particular internal node is homogenous, the resultant entropy of such node is zero. The node can not split further, and thus hence it forms a leaf node.

If the entropy of any split is not zero, it means we can still split our data subset further. We can split our dataset until we obtain fully classified nodes, i.e. leaf nodes.

We do not have to split our dataset until we get a fully classified subset in most cases. Therefore, it is advisable to stop at a point where the entropy before splitting is less than after splitting. By doing so, we can avoid *overfitting* our tree algorithm.

To calculate entropy, we use the formula below:

Entropy = - $ \sum _ { i = 1 } ^ { N } $ P<sub>*i*</sub> log <sub>*2*</sub>  (P<sub>*i*</sub>)

Where:
- P<sub>*i*</sub> is the probability of the *i <sup>*th*</sup>* class in an attribute.
  
For more information on determining the best attribute and developing the structure of a decision tree using entropy and information gain technique, visit check on this [article](https://www.section.io/engineering-education/entropy-information-gain-machine-learning/).

I hope the article was helpful, and now we are familiar with the calculation of entropy, information gain, and developing the decision tree structure.

### Gini Index
The Gini index is a criterion that measures how impure a feature is. To calculate the Gini index, we first compute **Gini impurity**.

Gini impurity measures how random a category in a feature is. We weigh the Gini impurity of all classes in a feature and sum them up to obtain the Gini index of corresponding such feature. Gini index ranges between 0 and 1.

Gini index is 0 if each feature category takes a homogenous class of the target variable and greater than 0 if elements are highly distributed randomly across various categories. A variable whose Gini index is zero implies that it is a pure variable.

The Gini index criterion is highly applicable when a decision tree is on a large dataset. The reason is that the Gini index is easy to calculate compared to the Information gain.

However, the information gain criterion could be the best alternative to creating a small dataset tree. The reason is that it involves many calculations.

To calculate the Gini index, we use the following formula.

Gini Index = 1 -  $ \sum _ { i = 1 } ^ { N } $ P<sub>*i*</sub></sub> <sup>*2*</sup>

Working with the Gini index, we split our tree on the feature with a minor Gini index. Using an example, let us understand how the Gini index works. We will use the above dataset to calculate the Gini index for each feature.

![data image](/engineering-education/decision-tree-in-python/data-image.png)

We shall start by calculating the Gini index for the Weather column:

#### Solution
Let X denote a random variable.
Therefore;
P(X = k) is the probability that X is k, where k is some value or a class of an attribute.
Therefore,
P (Weather = Sunny)   = 3/10
P (Weather = Cloundy) = 3/10
P (Weather = Rainny)  = 4/10

P (Weather = Sunny and Play = Yes) = 1/3
P (Weather = Sunny and Play = NO)  = 2/3
Gini impurity = 1 - [(1/3)^2 + (2/3)^2]
           = 0.4444

P(Weather = Cloundy and Play = Yes) = 3/3
P(Weather = Cloundy and Play = No)  =  0
Gini impurity = 1 - [(3/3)^2 = 0]
         = 0

P(Weather = Rainny and Play = Yes) = 1/4
P(Weather =  Rainny and Play = No)  =  3/4
Gini impurity = 1 - [(1/4)^2 + (3/4)^2]
          = 0.375
To obtain the Gini index for Weather, we weigh and sum up all the above Gini indices.
Gini index = 3/10(0.4444) + 3/10() + 4/10(0.375)
           = 0.2833

#### Temperature
P (Temperature = Hot)   = 4/10
P (Temperture]= Mild) = 5/10
P (Temperature = Cool)  = 1/10

P (Temperature = Hot and Play = Yes) = 2/4
P (Temperature = Hot and Play = NO)  = 2/4
Gini impurity = 1 - [2(2/4)^2]
           = 0.5

P (Temperature = Mild and Play = Yes) = 3/5
P (Temperature = Mild and Play = No)  = 2/5
Gini impurity = 1 - [(3/5)^2 + (2/5)^2]
           = 0.480

P (Temperature = Cool and Play = Yes) = 0
P (Temperature = Cool and Play = NO)  = 1
Gini impurity = 1 - [(1)^2]
           = 0

To obtain the Gini index for Temperature, we weigh and sum up the above Gini indices.
Gini index = 4/10(0.5) + 5/10(0.48o) + 1/10(0) = 0.44

#### Humidity
P (Humidity= High) = 7/ 10
P (Humidity = Normal)  = 3/10

P (Humidity = High and Play = Yes) = 3/7
P (Humidity = High and Play = NO)  = 4/7
Gini impurity = 1 - [(3/7)^2 + (4/7)^2]
           = 0.4898

P (Humidity = Normal and Play = Yes) = 2/3
P (Humidity = Normal and Play = NO)  = 1/3
Gini impurity = 1 - [(2/3)^2 + (1/3)^2]
           = 0.4444
Below is Gini index for humidity.
Gini index = 7/10(0.4898) + 3/10(0.4444)  = 0.4762

#### Wind
P (Wind= Weak) = 4/ 10
P (Wind = Strong)  = 6/10

P (Wind =Weak and Play = Yes) = 3/4
P (Wind = Weak and Play = NO)  = 1/4
Gini impurity = 1 - [(3/4)^2 + (1/4)^2]
           = 0.375

P (Wind = Strong and Play = Yes) = 2/6
P (Wind = Strong and Play = NO)  = 4/6
Gini impurity = 1 - [(2/6)^2 + (4/6)^2]
           = 0.5556
Gini index for wind is given as follows.
Gini index = 4/10(0.375) + 6/10(0.5556) = 0.48336

Now that we have computed the Gini index for each attribute, we compare them, select the feature with the most negligible value, and do our initial split.

From the Gini indices we have just computed, the Weather column has the minor index. Thus, we apply our initial break on the Weather column.

Then, splitting our tree on the Weather column, we obtain three splits corresponding to each category of the Weather column, i.e. Sunny, Cloudy and Rainy.

On each sub-node, we check if the node is fully classified, i.e. if the target variable of the sub-node is pure. If the split is fully classified, then it forms a leaf node. For example, we notice that the split corresponding to the Cloudy category is classified by splitting our tree. Thus it creates a leaf node.

On the other hand, splits corresponding to the Sunny and Rainy are not pure. Therefore, we repeat the process for computing the Gini index on each node independently on those impure nodes.

We again chose an attribute with the minor Gini index and further split our tree on it. We repeat the process until our data is optimally classified. Doing all splitting steps on our example, we should obtain the following tree diagram.

![decision_tree](/engineering-education/decision-tree-in-python/weather.png)

Now that we know the intuition behind the decision tree, it is time to go an extra step and implement it in Python. To construct our tree, we shall assume our splitting criterion to be the information gain criterion.

### Implementing a decision tree in Python
To get started, let us download the dataset we are going to work with [here](https://github.com/Daniel695/datasets.git)

Now that our data has been downloaded let us import the necessary libraries.
Below is the code that carries out this task.

### Importing libraries

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
```

### Importing dataset
The dataset we have just downloaded is in `CSV` format, and thus we import it to our working directory using the `read_csv` function in pandas.

```python
# copy paste the storage path of your data file
our_data = pd.read_csv("/content/drive/MyDrive/data.csv")
```

Now that our data is downloaded let us look at the first few samples part of it. To do this, we use the `head()` function. This function prints the first five observations.

```python
our_data.head()
```

The above code yields:

**Output**
![our-data](/engineering-education/decision-tree-in-python/our-data.png)

Our dataset consists of customers data captured in the business on their transactions with the enterprise. Our goal is to use this data and predict whether a customer will stay or lose interest and exit the business.

The *Exited* column is our target variable. It takes a value of 0 or 1. The value of 1 represents a customer's exit, and 0 illustrate a customer who is still in the business.

From our dataset, we need to notice that some attributes do not contribute to our objective. For example, a column such as RowNumber, which shows positions in which customer information is recorded, does not determine whether they will remain in the business or leave.

Other attributes that add no value to our goal are CustomerId and Surname. Thus we need to eliminate these columns from our data set. We use the `drop()` function in the code below to get rid of them.

```python
our_data = our_data.drop(["RowNumber" , "CustomerId" , "Surname"] , axis = 1)
our_data.head()
```

Upon executing we obtain:
#### Output
![our-data](/engineering-education/decision-tree-in-python/our-data.drop.png)
The RowNumber, CustomerId, and Surname were eliminated from our dataset.

Also, we need to notice that our dataset consists of object data types on the Geography and Gender columns. Therefore, we need to encode these columns into a numeric data type. To get these columns encoded, we run the code below.

```python
from sklearn.preprocessing import LabelEncoder

new_data = dict(our_data.dtypes)

for name , type_ in new_data.items():
    if str(type_) == 'object':
        Le = LabelEncoder()
        our_data[name] = Le.fit_transform(our_data[name])

```

Let us have a look at our dataset once more.

```python
our_data.head()
```

#### Output
![our-data](/engineering-education/decision-tree-in-python/encoded.png)
From the above output, we see that the Geography and Gender columns were successfully encoded.

```python
remaining_columns = list(our_data.columns)
remaining_columns.remove("Exited")
```

### Splitting our dataset
To start with, let us split our data set into the feature set and study set.

```python
X = our_data[remaining_columns].values 
Y = our_data['Exited'].values.astype(np.uint8)
```

Next, we split the splits above into the training set and the test set. The code below facilitates this activity.

```python
from sklearn.model_selection import train_test_split
# training set is 80% of the dataset
Xtrain , Xtest , Ytrain , Ytest = train_test_split(X , Y , test_size = 0.2 , random_state = 4)
```

Let us have a look at the size of our training set by executing the code below.

```python
print(Xtrain.shape , Ytrain.shape)
```

#### Output

```bash
(8000, 10) (8000,)
```

Our training set consists of 8,000 observations with ten features and a study variable. At this point, we can now implement our decision tree.

We first import the `DecisionTreeClassifier` model from the class tree in the `sk.learn` library to implement our tree. We then create an object to the model and `fit()` it on the training subset. Below is the code for this activity.

```python
from sklearn.tree import DecisionTreeClassifier 

model = DecisionTreeClassifier()
model.fit(Xtrain , Ytrain)
```

The above code outputs:

#### Output

```bash
DecisionTreeClassifier(ccp_alpha=0.0, class_weight=None, criterion='gini',
                       max_depth=None, max_features=None, max_leaf_nodes=None,
                       min_impurity_decrease=0.0, min_impurity_split=None,
                       min_samples_leaf=1, min_samples_split=2,
                       min_weight_fraction_leaf=0.0, presort='deprecated',
                       random_state=None, splitter='best')
```

Next, we check the testing accuracy of our model.

```python
print("Testing Accuracy : " , model.score(Xtest , Ytest))
```

#### Output

```bash
Testing Accuracy:  0.792
```

Our model is 79.2% accurate in predicting target variables when offered new features. This accuracy is quite good. However, our dataset is highly imbalanced, and therefore we need to look at the confusion matrix.

```python
predictions = model.predict(Xtest)
```

```python
# Importing confusion matrix model from sklearn
from sklearn.metrics import confusion_matrix 

matrix = confusion_matrix(Ytest , predictions)
matrix
```

### Confusion Matrix

```bash
array([[1379,  225],
       [ 191,  205]])
```

The above confusion matrix shows that the false-negative (191) level is almost the same as the true positive (205). Thus we need to do something and improve these results.

To improve our model, we need to obtain the weights of our classes and pass them in our `DecisionTreeClassifier` model. By so doing, we shall handle the imbalance in the data. To obtain those weights, use the code below:

```python
value_counts = dict(our_data["Exited"].value_counts())
for key , value in value_counts.items():
    value_counts[key] = value/len(our_data)
    class_weights = {}

for key , value in value_counts.items():
    class_weights[key] = sum(value_counts.values()) - value / sum(value_counts.values())

class_weights
```

#### Output

```bash
{0: 0.2037, 1: 0.7963}
```

Another way to improve the accuracy of our model is to ensure that we take care of the problem of overfitting. To handle this problem, we need to restrict our tree from splitting up to arbitrary depths.

To deal with this problem in our model, we set the maximum depth our tree should reach. Upon substituting values between six and fifteen, we found eight to give us a better outcome.

Let us create a new object to the model and pass in our weights and the maximum depth of our tree.

```python
#create decision tree
model = DecisionTreeClassifier(max_depth = 8 , class_weight = class_weights)
#fit the tree to our_data dataset
model.fit(Xtrain , Ytrain)
```

```bash
DecisionTreeClassifier(ccp_alpha=0.0, class_weight={0: 0.2037, 1: 0.7963},
                       criterion='gini', max_depth=8, max_features=None,
                       max_leaf_nodes=None, min_impurity_decrease=0.0,
                       min_impurity_split=None, min_samples_leaf=1,
                       min_samples_split=2, min_weight_fraction_leaf=0.0,
                       presort='deprecated', random_state=None,
                       splitter='best')
```

### Checking the model accuracy

```python
# cheking accuracy of our tree
print("Testing Accuracy : " , model.score(Xtest , Ytest))
```

#### Output

```bash
Testing Accuracy:  0.7825

```

### New confusion matrix

```python
predictions = model.predict(Xtest)
```

```python
from sklearn.metrics import confusion_matrix 

matrix = confusion_matrix(Ytest , predictions)
matrix
```

#### Output

```bash
array([[1270,  334],[ 101,  295]])
```

From these new outputs, we notice that the testing accuracy decreased slightly, but also, there was a significant decrease in the false-negative in the confusion matrix. We can therefore conclude that this new model is better for prediction than the previous one.

### Visualizing our decision tree

```python
#plot decision tree
from sklearn import tree

fig = plt.figure(figsize=(25,20))
_ = tree.plot_tree(model, 
                   max_depth=3,
                   feature_names=our_data.columns[:-1],  
                   class_names=['0','1'],
                   filled=True)
```

Below is the tree we implemented on our dataset.

![decision tree](/engineering-education/decision-tree-in-python/tree-structure.png)

### Conclusion
This article looked at the intuition behind the decision tree and criteria that help us build a tree on the dataset. Finally, we looked at how to implement it using Python and some other libraries. I hope this article has helped you to understand the decision tree and its criteria.

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
