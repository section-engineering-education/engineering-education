
In this tutorial, we will learn how to use a binary search tree which is an algorithm used just like linked lists or arrays. The difference between the above-mentioned algorithms with a binary tree is that a binary tree is a non-linear data structure while the others are linear data structures hence traversing is quite different.
we will learn how to:
- Create a new tree with root key, nodes, and base elements also called leaf nodes
- Know the space and time complexity of this algorithm
- Discuss various types of binary trees.

### Table of contents
1. [Prerequisites](#Prerequisites)
2. [Types of binary tree](#Types-of-binary-search-trees)
3. [Creating binary tree](#Creating-a-tree)
4. [Delete a tree](#Deleting-a-tree)
5. [check empty nodes](#Checking-for-empty-nodes)
7. [Conclusion](#Conclusion)

### Prerequisites
In order to continue with this tutorial you must have:- 
1. A working machine 
2. An IDE -this means an integrated development environment that will aid in running our code for our case since we are using python we need pycharm [pycharm download](https://www.jetbrains.com/pycharm/download) .
3. Some knowledge of python or other programming languages.

**Binary search tree**
- A binary tree is a set of finite nodes that can be empty or may contain a root and two disjoint binary trees which are right subtree and left subtree.
**Node**
- A node is made up of three entities. A value with two pointers on the left and right.
**Root node**
- This is the parent node on each subtree or maybe the topmost node in a tree.
**Child**
- These are nodes of the parent node.
**Leaf node**
- These are the last base elements in our binary tree that have empty nodes.

### Types of binary search trees
- There are various types of binary trees these are:-
1. **Complete binary tree**
All levels of the tree are filled and the root key has a sub-tree each sub-tree must have at most 2 or no nodes.
2. **Balanced binary tree**
The leaf nodes are not far from the root which is more of a relative metric the leafs can be more than a single level in a tree.
A balanced tree is far more efficient in performing a search, insertion, and deletion operations.
3. **Full binary tree**
It contains an equal number of nodes in each subtree up to the leaf nodes at the same level of depth.

Now let's discuss the complexity of the binary search tree algorithm.

### Creating a tree
In order to work with the tree, you need the following python syntax that generates a new tree that we can work with.
Since the subtrees of a subtree are also considered as trees the same process gets repeated so our function will be recursive. 

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
If we want to know whether a given node is there or not we will compare the data of the given node with the data of the root node.
First we need to search whether the root key is equal to the given data.
If the given node is present in the tree then we can print a message else if the data is less than the root key we will search on the left subtree else search on the right subtree.

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

### This table below summarises the space and time complexity of the algorithm
    Binary Search Tree
|     | Average  | Worst case|
|:--- | :--- | :---|
|**Space**| *O(n)*|*O(n)*|
**Access** |*O(log n)* |*O(n)* 
**Search** |*O(log n)* |*O(n)*
**Insertion** |*O(log n)* |*O(n)*
**Removal** |*O(log n)* |*O(n)*

### Conclusion
#### These are Some of the benefits of using binary  search trees 
1. They allow fast lookup, addition, and deletion, or removal of items in a tree.
2. It can be used to implement either dynamic sets of elements or lookup tables.
3. They allow the finding of an element by its key.
4. They keep the keys in sorted order and one can call the item by its index.
5. They traverse the tree from its root to the leaf nodes hence making comparisons to keys stored in the nodes of the tree and deciding whether to continue searching in the right or the left subtrees.
6. They use a logarithmic time complexity of k = log(n) where k is the lookup, insertion, and removal time and n is the number of items stored in the tree. This is better than the linear search time.
7. Reduces the time of the search, deletion, lookup by half.


