---
layout: engineering-education
status: publish
published: true
url: /implementing-binary-search-tree-using-python/
title: How to Implement Binary Search Tree in Python
description: This article will help the reader understand how to implement binary search tree in Python.
author: samuel-mutero
date: 2021-11-17T00:00:00-14:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-binary-search-tree-using-python/hero.jpg
    alt: Binary Search Tree in Python Hero Image
---
In this tutorial, we will learn how to use a binary search tree in Python. Note that a binary tree is a non-linear data structure while linked lists and arrays are linear data structures.
<!--more-->
In this article, we will:
- Create a new tree with root key, nodes, and base elements also called leaf nodes
- Determine the space and time complexity of this algorithm
- Discuss various types of binary trees.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Types of binary tree](#types-of-binary-search-trees)
3. [Creating binary tree](#creating-a-tree)
4. [Delete a tree](#deleting-a-tree)
5. [Checking empty nodes](#checking-for-empty-nodes)
7. [Conclusion](#conclusion)

### Prerequisites
In order to understand this tutorial, you must have:- 
1. An IDE (integrated development environment) that will aid in running our code. We will use Pycharm which can be downloaded from [here](https://www.jetbrains.com/pycharm/download) .
2. Some basic knowledge of Python.

### Binary search tree
A binary tree is a set of finite nodes that can be empty or may contain several elements.

A node is made up of three entities. A value with two pointers on the left and right.
The root node is the parent component on each subtree. It can also be considered as the topmost node in a tree.

The nodes attached to the parent element are referred to as chidren. Leaf nodes, on the other hand, are the base elements in a binary tree.

### Types of binary search trees
The various types of binary trees include:

1. Complete binary tree

All levels of the tree are filled and the root key has a sub-tree that contains two or no nodes.

2. Balanced binary tree

The leaf nodes are not far from the root which is more of a relative metric. The nodes can be more than a single level in a tree.

A balanced tree is quite efficient when searching, inserting, and deleting components.

3. Full binary tree

It contains an equal number of nodes in each subtree except from the leaf nodes.

### Creating a binary tree
We need the following Python syntax to generate a binary tree. A recursive function is required since the sub-tree has similar elements.

```python
class binary_tree:
  def __init__(self, key)   #function that holds 2 parameters self == object of class
        self.leftchild = None
        self.rightchild = None
        self.key = key
  class binary_tree:
    def __init__(self):
      self.root = None
    #this is the end 
```

### Deleting a tree
Incase one wants to get rid of a tree use this script:

```python
def add(self, value):
  if self.key is None:
      self.key = data
      return
  if self.key == value:   # this will take care for duplicate nodes
      return              
  if value < self.key:
     if self.leftchild:
       self.leftchild.add(value)
      else:
         self.leftchild = binary_tree(value)
  else:
    if self.rightchild:
      self.rightchild.add(value)
      else:
        self.rightchild = binary_tree(value)
    ##End of search of our binary tree
```

### Adding data in tree 
Inorder to add data in our tree use this python script: 

```python
root = binary_tree(50)    # 50 is our root key and our object is root
elements = {20,56,3,4,7,10,17,20}
for i in elements:
    root.add(i)
  root.search(10)
```

### Checking for empty nodes

```python
def add(self,value):
  if self.key is None:
    self.key = value
```

### Searching for a node in the tree
If we want to know whether a given node is there or not, we will compare the data of the given node with the data of the root node.

First, we need to search whether the root key is equal to the given data. If the given node is present in the tree, we can print a message.

If the data is less than the root key, we will search on the left subtree else search on the right subtree.

```python
  def search(self, value):
      if self.key == value:
        print("The node is present")
        return
      if value < self.key:    #Here left subtree can be empty or it can contain one or more nodes
        if self.leftchild:   #this condition is true if left subtree exists
            self.leftchild.search(value)
        else:
          print("The node is empty in the tree!")
      else:
        if self.rightchild:
            self.rightchild.search(value)
        else: 
            print("The node is empty in the tree!")          
```

The following table below summarises the space and time complexity of the algorithm:

    Binary Search Tree
|     | Average  | Worst case|
|:--- | :--- | :---|
|**Space**| *O(n)*|*O(n)*|
**Access** |*O(log n)* |*O(n)* 
**Search** |*O(log n)* |*O(n)*
**Insertion** |*O(log n)* |*O(n)*
**Removal** |*O(log n)* |*O(n)*

#### Benefits of using binary search trees 
1. They allow fast lookup, addition, and deletion of items in a tree.
2. It can be used to implement either dynamic sets of elements or lookup tables.
3. They allow the finding of an element by its key.
4. They keep the keys in sorted order and one can call the item by its index.
5. They traverse the tree from its root to the leaf nodes hence making comparisons to keys stored in the nodes of the tree and deciding whether to continue searching in the right or the left subtrees.
6. They use a logarithmic time complexity of k = log(n) where k is the lookup, insertion, and removal time and n is the number of items stored in the tree. This is better than the linear search time.
7. Reduces the time of the search, deletion, lookup by half.

### Conclusion


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)