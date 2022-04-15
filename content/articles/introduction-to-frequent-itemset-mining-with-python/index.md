---
layout: engineering-education
status: publish
published: true
url: /introduction-to-frequent-itemset-mining-with-python/
title: Introduction to Frequent Itemset Mining with Python
description: In this article we will learn about frequent itemset mapping, its key concepts, and application areas. In the end, we will create a simple frequent itemset mapping table.
author: elly-omondi
date: 2022-04-15T00:00:00-14:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-frequent-itemset-mining-with-python/hero.jpg
    alt: Frequent Itemset Mining with Python Hero Image
---
Data is the new gold! Every organization is now obsessed with data mining, all in an attempt to build up a knowledge base, better their services, or even have a competitive advantage in the industry. 
<!--more-->
There are numerous data mining techniques. However, this article will tackle frequent itemset mapping, its key concepts, and application areas as a data mining technique. In the end, we will create a simple frequent itemset mapping table. But first, the basics.

Let us get started!

### Table of content
This article will cover:
- [What is Frequent Itemset?](#What-is-frequent-itemset)
- [Why Frequent Itemset Mining?](#Why-frequent-itemset-mining)
- [Key concepts of itemset mining](#Key-concepts-of-itemset-mining)
- [Application areas of Frequent Itemset Mining](#Application-areas-of-itemset-mining)
- [Creating a Frequent Itemset Mining](#Creating-a-frequent-itemset-mining)
- [Conclusion](#Conclusion)

Have you ever been to a shop to purchase an item and bought other items you had not planned? Often, that is frequent itemset mapping at play. Organizations are now building algorithms that implement frequent itemset mapping to push sales, recommend content and items, and create knowledge bases from a target group (customers).

### What is a Frequent Itemset?
When items are grouped, they form an itemset. An itemset can have as many items as possible, often referred to as a k-item set, depending on the number of items contained. For instance, the following data can form an itemset: {Uniform, Crayon, Pencil, Bag, Book, Rubber}.

A [Frequent Itemset](https://www.sciencedirect.com/topics/computer-science/frequent-itemsets) combines elements that often appear together. A Frequent Itemset is a subset(s) of an itemset that occurs in a dataset with a particular frequency. For instance, given a frequency value, perhaps of 0.1 or 0.01%, for a stationery store, all subsets of school items that many customers have bought at different times are called Frequent Itemset.

For example, a set of school items such as {'Uniform', 'Bag', 'Book'} is a Frequent Itemset if many customers buy it sufficiently.

### Why Frequent Itemset Mining?
[Frequent itemset mining](https://wires.onlinelibrary.wiley.com/doi/abs/10.1002/widm.1329) (pattern mining) is a technique used to derive relationships such as regularities in customers' shopping behavior in physical and online stores to discover association rules out of the relationships.

In particular, Frequent Itemset mapping is a data mining technique that seeks to derive items that are frequently bought together.

Association rules show how often products are purchased together. When the rules are established, such groups of related products may be used to optimize the arrangement of the offered products on maybe display shelves of retail stores or online stores or possibly provide inference on which items should be closely bundled.

### Key concepts of Itemset Mining
Below are basic definitions of itemset mining techniques:

**Support**: It refers to the popularity of a product in a transaction database – a measure of interestingness. Support is derived from dividing the number of transactions comprising a product (of some interestingness) by the total number of transactions in a database. i.e., 
Support (Bread) = (Transactions relating Bread) / (Total transactions).

**Confidence**: Confidence shows the possibility that the customers bought two items together in a single transaction. To get confidence, you need to divide the number of transactions with both items by the total number in a database.

Confidence = (Transactions relating both Bread and Milk) / (Total transactions involving Bread)

**Maximal Itemset**: If none of an Itemset’s supersets is frequent, the itemset is said to be maximal frequent.

### Application areas of Frequent Itemset Mining
Frequent Itemsets are determined by [Apriori](https://www.geeksforgeeks.org/apriori-algorithm/), [Eclat](https://towardsdatascience.com/the-eclat-algorithm-8ae3276d2d17), and [FP-growth](https://towardsdatascience.com/understand-and-build-fp-growth-algorithm-in-python-d8b989bab342#:~:text=FP%2Dgrowth%20is%20an%20improved,or%20associations%20from%20data%20sets.) algorithms. 

Apriori algorithm is the commonly used frequent itemset mining algorithm. It works well for association rule learning over transactional and relational databases. 

Frequent Itemsets discovered through Apriori have many applications in data mining tasks, such as:

- *[Market basket analysis](https://www.techtarget.com/searchcustomerexperience/definition/market-basket-analysis)*.
- *[Cross-marketing](https://www.researchgate.net/figure/The-structure-of-cross-marketing-strategy-based-on-the-data-mining-algorithm_fig4_351179325)*.
- *[Sale campaign analysis](https://www.linkedin.com/pulse/predicting-success-marketing-campaigns-using-machine-learning/)*.

### Creating a Frequent Itemset Mining
Before we proceed, we need to have a rough idea of how frequent items are discovered. A frequent individual item is first discovered from a dataset before extending them with other identified items as long as they appear sufficiently together in the dataset/database. 

Doing this process manually is almost an impossible task. However, luckily, Python has the necessary libraries for implementing Apriori algorithms. 

This section will make us of the following Python libraries:

1. [Pandas](https://pandas.pydata.org/) – a Python library.
2. [Mlxtend](http://rasbt.github.io/mlxtend/user_guide/frequent_patterns/apriori/) for [Apriori](https://www.geeksforgeeks.org/apriori-algorithm/) implementation.

#### Step 1 : Importing Libraries
First, we will import the required libraries for our task using the code below. Then, to initialize the libraries above, run the scripts below in your Jupyter Notebook or Google Colab environment.

```Python
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
```

An output similar to this should appear in your working environment:

![Imports](/engineering-education/introduction-to-frequent-itemset-mining-with-python/importing.png)

#### Step 2: Dataset Creation
Next, we need a dataset to work with, a simple representation of a transactional database.

We will create a custom data frame and work with it to model a simple frequent itemset mapping using Python.

```Python
dataset = [['Milk','Onion', 'Bread', 'Kidney Beans','Eggs','Yoghurt'],
           ['Fish','Onion','Bread','Kidney Beans','Eggs','Yoghurt'],
           ['Milk', 'Apples', 'Kidney Beans’, ‘Eggs'],
           ['Milk', 'Sugar', 'Tea Leaves', 'Kidney Beans', 'Yoghurt'],
           ['Tea Leaves','Onion','Kidney Beans', 'Ice cream', 'Eggs'],
            
]
```

You can type the data in your running cell to get similar output like this:

![Dataset](/engineering-education/introduction-to-frequent-itemset-mining-with-python/dataset.png)

Each row in the data frame represents items bought at a store.

#### Step 3: Data Encoding
We need to transform our dataset to use the Apriori algorithm available in the `mlxtend library`. Apriori module works with a data frame encoded into 0 and 1 or True and False. 

The data in our case is all string (name of items), thus the need to perform One Hot Encoding on the data.

Run the code below in a new cell in your working environment to transform the dataset as shown below:

```Python
tr = TransactionEncoder()
tr_arr = tr.fit(dataset).transform(dataset)
df = pd.DataFrame(tr_arr, columns=tr.columns_)
df
```

![Encoding](/engineering-education/introduction-to-frequent-itemset-mining-with-python/encoding.png)

#### Step 4:  Applying Apriori
Python has an inbuilt Apriori module from the `mlxtend library`, which provides a fast and efficient implementation of frequent itemset mining.

Below is a script with some parameters passed to execute the Apriori algorithm and generate frequent itemsets.

```Python
from mlxtend.frequent_patterns import apriori
frequent_itemsets = apriori(df, min_support = 0.6, use_colnames = True)
frequent_itemsets

```

Let us understand what each parameter means. 

##### Parameters
- *df* calls the One-Hot-Encoded Dataframe represented by the True and False values as shown in the data encoding phase.
- *min_support* is a float number between 0 and 1 that defines the support required for selecting an itemset.
- *use_colnames*, which is set as True, allows us to preserve column names for the Itemsets, making it more readable.

The script above generates the frequent itemsets as shown below:

![Frequent Itemset(s)](/engineering-education/introduction-to-frequent-itemset-mining-with-python/apriori.png)

### Conclusion
This tutorial has taught us what frequent itemset mining is and how to create a simple itemset mining process. We have seen where these techniques can manipulate the output user needs. Do not forget to test out mining with transactional databases in your projects to understand how they work entirely.

Happy coding!

### Further reading
- [Frequent Itemset Mining](https://github.com/topics/frequent-itemset-mining)
- [Getting Started with Apriori Algorithm in Python](/engineering-education/apriori-algorithm-in-python/)
- [Data Science - Apriori Algorithm](https://intellipaat.com/blog/data-science-apriori-algorithm/)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
