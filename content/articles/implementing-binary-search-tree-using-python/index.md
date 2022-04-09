---
layout: engineering-education
status: publish
published: true
url: /implementing-binary-search-tree-using-python/
title: How to Implement Binary Search Tree in Python
description: This article will help the reader understand how to implement a binary search tree in Python. We will learn how to create a tree and delete data. We will look at how to check for empty nodes.
author: samuel-mutero
date: 2021-11-19T00:00:00-18:07
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-binary-search-tree-using-python/hero.jpg
    alt: Binary Search Tree in Python Hero Image
---
In this tutorial, we will learn how to use a binary search tree in Python. Note that a binary tree is a non-linear data structure, while linked lists and arrays are linear data structures.
<!--more-->
In this article, we will:
- Create a new tree with root key, nodes, and base elements also called leaf nodes.
- Determine the space and time complexity of this algorithm.
- Discuss various types of binary trees.

### Table of contents
- [Prerequisites](#prerequisites)
- [Binary search tree](#binary-search-tree)
- [Types of binary search trees](#types-of-binary-search-trees)
- [Creating a binary tree](#creating-a-binary-tree)
- [Deleting a tree](#deleting-a-tree)
- [Adding data in a tree](#adding-data-in-a-tree)
- [Checking for empty nodes](#checking-for-empty-nodes)
- [Searching for a node in the tree](#searching-for-a-node-in-the-tree)
  - [Benefits of using binary search trees](#benefits-of-using-binary-search-trees)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you must have:
1. An IDE (integrated development environment) that will aid in running our code. We will use Pycharm which can be downloaded [here](https://www.jetbrains.com/pycharm/download).
2. Some basic knowledge of Python.

### Binary search tree
A binary tree is a set of finite nodes that can be empty or may contain several elements. A node is made up of three entities. A value with two pointers on the left and right. The root node is the parent component on each subtree. 

It can also be considered as the topmost node in a tree. The nodes attached to the parent element are referred to as children. Leaf nodes, on the other hand, are the base elements in a binary tree.

### Types of binary search trees
The various types of binary trees include:
1. Complete binary tree: All levels of the tree are filled and the root key has a sub-tree that contains two or no nodes.
2. Balanced binary tree: The leaf nodes are not far from the root which is more of a relative metric. The nodes can be more than a single level in a tree. A balanced tree is quite efficient when searching, inserting, and deleting components.
3. Full binary tree: It contains an equal number of nodes in each subtree except for the leaf nodes.

### Creating a binary tree
We need the following Python syntax to generate a binary tree. A recursive function is required since the sub-tree has similar elements.

```python
class binary_tree:
  def __init__(self, key)   #function to insert data to our binary tree
        self.leftchild = None #setting leftchild of the tree to add items
        self.rightchild = None #setting rightchild of the tree to add items
        self.key = key
  class binary_tree:
    def __init__(self): #generate a tree to hold values 
      self.root = None
    #this is the end 
```

### Deleting a tree
To delete a tree we use the following code:

```python
def add(self, value): #function to add data items to the tree
  if self.key is None:
      self.key = data #begin adding elements to the binary tree
      return
  if self.key == value:   # this will take care for duplicate nodes
      return              
  if value < self.key:  #if value of the key node is more than the leftchild accept values
     if self.leftchild:
       self.leftchild.add(value) #set values to the leftchild of the tree
      else:   
         self.leftchild = binary_tree(value)
  else:   #values are more than the key value
    if self.rightchild:     #if on the rigghtchild of the tree
      self.rightchild.add(value)  #set values to rightchild
      else:
        self.rightchild = binary_tree(value) #values cannot be less then the root key
    ##End of search of our binary tree
```

### Adding data in tree 
To add data to our tree, we use the following Python script: 

```python
root = binary_tree(50)    # 50 is our root key and our object is root
elements = {20,56,3,4,7,10,17,20}   #adds values to the tree 
for i in elements:
    root.add(i)     #recursively adds values in the tree
  root.search(10)
```

### Checking for empty nodes
The `check()` function below allows us to check for empty nodes:

```python
def check(self,value):    #check for empty values 
  if self.key is None:  #if value is set  to None
    self.key = value
```

### Searching for a node in the tree
If we want to know whether a given node is there or not, we will compare the data of the given node with that in the root node.

First, we need to search whether the root key is equal to the given data. If the given node is present in the tree, we can print a message.

If the data is less than the root key, we will search on the left subtree, else, we look at the right subtree.

```python
  def search(self, value):
      if self.key == value:     #check if value is equal to the key val
        print("The node is present")
        return
      if value < self.key:    #Here left subtree can be empty or it can contain one or more nodes
        if self.leftchild:   #this condition is true if left subtree exists
            self.leftchild.search(value)
        else:
          print("The node is empty in the tree!")
      else:
        if self.rightchild:
            self.rightchild.search(value)   #search for all the values in the rightchild
            return true
        else:   
            print("The node is empty in the tree!")          #print out empty rightchild nodes in the tree
```

The table below summarizes the space and time complexity of the algorithm:

#### Binary Search Tree

|     | Average  | Worst case|
|:--- | :--- | :---|
|**Space**| *O(n)*|*O(n)*|
**Access** |*O(log n)* |*O(n)* 
**Search** |*O(log n)* |*O(n)*
**Insertion** |*O(log n)* |*O(n)*
**Removal** |*O(log n)* |*O(n)*


#### Benefits of using binary search trees 
- They allow fast lookup, addition, and deletion of items in a tree.
- It can be used to implement either dynamic sets of elements or lookup tables.
- They allow one to find an element using its key.
- They use a logarithmic time complexity of `k = log(n)` where `k` is the lookup, insertion, and removal time and `n` is the number of items stored in the tree. This is better than linear search time.

### Conclusion
In this article we learned the definition and different types of binary search trees. We also discussed how to create a tree, as well as add and delete data. Finally, we looked at how to check for empty nodes.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
