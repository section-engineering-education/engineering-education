---
layout: engineering-education
status: publish
published: true
url: /eclat-algorithm-in-python/
title: Getting Started with ECLAT Algorithm in Association Rule Mining
description: This article will get you started with ECLAT Algorithm in Association Rule Mining.
author: jackson-munyai
date: 2021-12-22T00:00:00-03:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/eclat-algorithm-in-python/hero.png 
    alt: Getting Started with ECLAT Algorithm Example Image
---

The goal in data mining is to find rules that predict an item based on the occurrence of other items in the transactions.
<!--more-->
Generally, to achieve this, we have two approaches;
1. Generating the frequent itemsets. Here, we generate all itemsets with greater support than the adopted minimum support.
2. Rule Generation. We generate a frequent high set from the frequent itemsets.

### Prerequisites:
To follow along with this article, the learner needs to be comfortable working with the following libraries in Python: Scikit-learn, Pandas, and Numpy.

### Introduction to ECLAT Algorithm
As we mentioned before, the main idea in the association rule is to discover valid information and knowledge from a large dataset. Several algorithms have been developed over the years that make this activity as successful as possible. The major algorithm used includes:

1. Apriori Algorithm
2. Eclat Algorithm
3. FP Growth Algorithm

The first algorithm to be introduced in the data mining domain was the Apriori algorithm. However, this algorithm had some limitations in discovering frequent itemsets. Its limitations created a need for a more efficient algorithm.

Later, the Eclat algorithm was introduced to deal with the weakness of the Apriori algorithm. Between these two algorithms, we have significant differences:
- Unlike the Apriori algorithm, which is applicable with *horizontal dataset*, the Eclat algorithm is applicable only with a dataset in *vertical dataset* format.
- In the Eclat algorithm, only the *support* and confidence is counted as confidence. As in the case of Apriori, it is not computed. Here, the *Support* is nothing but the number of times an item is in a database.

At each stage of the generated database, the Eclat algorithm uses the current generated dataset to learn frequent itemset, unlike the Apriori which scans the original database repeatedly. Since the Eclat scans over the database once, it is much faster than the Apriori algorithm.

However, this doesn't mean the Apriori algorithm is worse. On the contrary, when dealing with a larger dataset, Apriori tends to shine best. Thus, the Eclat algorithm works better with small and medium datasets.

The key takeaway here is that Eclat works well with the vertical data format. Since most datasets are in the horizontal format, to apply the Eclat algorithm, we first have to convert them to vertical format.

Below are examples of Horizontal and verticle data formats.

Horizontal data format:

![Horizontal data](/engineering-education/eclat-algorithm-in-python/horizontal.png)

Verticle data format:

![Verticle data](/engineering-education/eclat-algorithm-in-python/verticle-format.png)

We obtain a verticle data format by making a list of transactions to which each particular item is found.

Let's look at the steps in the Eclat algorithm.

### Eclat Algorithm
1. Get tidlist for each item in the database.
 Here, we scan the entire database. The tidlist of item {a} is the list of transactions in which item {a} is contained.
2. Intersect the tidlist of item {a} with the tidlist of item {b} and generate a new transaction list whose elements are transactions in which both items {a} and {b} are found.
3. Repeat step 1 on {a}-conditional to other items in the database.
4. For all other items, repeat the above steps.

If we perform these steps on the verticle dataset that we gave above, we should obtain an output similar to the one below:

![data image](/engineering-education/eclat-algorithm-in-python/tid-set.png)

### Advantages
1. Eclat algorithm has low memory requirements compared to Apriori as it uses the [Depth-First Search](https://en.wikipedia.org/wiki/Depth-first_search#:~:text=Depth%2Dfirst%20search%20(DFS),along%20each%20branch%20before%20backtracking) approach.
2. The Eclat algorithm does not repeatedly scan the data to discover frequent itemsets, thus, is generally faster than the Apriori algorithm.
3. Eclat algorithm outdoes the Apriori algorithm provided the dataset is not too big. 
4. Eclat algorithm scans only the currently generated dataset that is scanned in the Eclat algorithm. This is unlike in Apriori where the original dataset is scanned at each stage.

### Disadvantages
If the tidlist is too large, the Eclat algorithm may run out of memory.

Let's proceed and implement this algorithm in python.

### Python Implementation of the Eclat Algorithm
To have the best rules, we wull adopt the Apriori algorithm in our implementation. To get started, we need to import the necessary libraries for this session.

```bash
# The first thing is to install this package
!pip install apyori
```
### Data Preprocessing
#### Importing the libraries
The libraries we will work with for this session are as follows:

```python
import numpy as np # to deal with numeric data
import pandas as pd # to deal with dataframe
```
#### Dataset importation

```python
data = pd.read_csv('/content/drive/MyDrive/Market_Basket_Optimisation.csv', header = None) # read dataset
transact_list = [] # create an empty list to store transactions
for i in range(0, 7501):
  transact_list.append([str(data.values[i,j]) for j in range(0, 20)]) # add the transactions to the above created
```
### Eclat Algorithm
Since we adopted the Apriori algorithm, we need to generate rules as follows:

```python
from apyori import apriori # import the apriori library
rules = apriori(transactions = transact_list, min_support = 0.003, min_confidence = 0.2, min_lift = 3, min_length = 2, max_length = 2) # generate rules

# list of results coming from the apriori model
rslt = list(rules)
```
From the list of rules above, we will extract all `support` and organize them in a pandas dataframe. Below is the code which will enable us to do so.

### Organizing the above output in a pandas dataframe
```python
def inspect(rslt): # function to organize the output
    left_handSide         = [tuple(result[2][0][0])[0] for result in rslt] # get the left hand side of the rules
    right_handSide         = [tuple(result[2][0][1])[0] for result in rslt] # get the right hand side of the rules
    supports    = [result[1] for result in rslt] # get the supports
    return list(zip(left_handSide,right_handSide, supports)) # zip the above three lists together
rslt_DataFrame = pd.DataFrame(inspect(rslt), columns = ['Product 1', 'Product 2', 'Support']) # create a pandas dataframe
```
Now that our output is organized in a pandas dataframe, we can have a look at the first seven supports as follows:

```python
rslt_DataFrame.nlargest(n = 7, columns = 'Support') # printing the first 7 supports

```
![Arranged results](/engineering-education/eclat-algorithm-in-python/supports.png)
 
The rule (herb & pepper) has the highest support from the output above. The second rule with the highest support is the (whole wheat pasta with olive oil) and so on. This table means that the first rule is the most important. Therefore, for the seller to maximize their sales and profit, they should adopt the first rule.

The link to the source code is provided [here](https://github.com/jacksonjate1/files/blob/main/eclat_algorithm.ipynb).

### Conclusion
This article introduced association rule mining and broke it down to its approaches. 

We mentioned the top three algorithms mainly used in this field to discover knowledge from the data: Apriori, Eclat, and FP growth algorithms. First, we saw the limitation of the Apriori algorithm, and later, we were able to discuss how the Eclat algorithm solves this. 

We also discussed how these two algorithms differ before talking about the pros and cons of the Eclat algorithm. Later, we implemented the Eclat algorithm by adapting the Apriori algorithm to improve accuracy.

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
