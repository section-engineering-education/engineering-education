---
layout: engineering-education
status: publish
published: true
url: /engineering-education/heap-data-structure-python/
title: Using the Heap Data Structure in Python
description: Heaps are special binary trees that have a special property. The key present at the root node of every sub-tree must be either the greatest or minimum among all the keys.
author: saiharsha-balasubramaniam
date: 2020-09-27T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/heap-data-structure-python/hero.jpg
    alt: binary heaps
---
A binary heap is a special data structure that resembles a binary tree. It differs in the sense that the root of any subtree should be the smallest or the largest element.
<!--more-->

There are two main types of heaps.

- **Minheap** -- In a minheap, the root of every subtree is the smallest element.
- **Maxheap** -- In a maxheap, the root of every subtree is the largest element.

In this article, let's take a look at heaps and dive into programming heaps in Python.

For more background on the different types of data structures in Python, check out the following articles:

- [Introduction to Data Structures](/engineering-education/data-structures-python-part-1/)
- [List](/engineering-education/list-data-structure-python/)
- [Stack](/engineering-education/stack-data-structure-python/)
- [Queue](/engineering-education/queue-data-structure-python/)
- [Linked Lists](/engineering-education/linked-list-data-structure-python/)
- [Binary Trees](/engineering-education/binary-tree-data-structure-python/)

*Note: Prerequisites -- Make sure you have basic Python knowledge before diving into this article. It also might be a good idea to check out some linear data structures. (links are given above)*

### Table of Contents
- [Heaps: Introduction](#heaps:-introduction)
- [Applications of Heaps](#applications-of-heaps)
- [Implementing a Heap](#implementing-a-heap)
- [Practice Heaps](#practice-heaps)
- [Conclusion](#conclusion)

### Heaps: Introduction
Heaps are complete binary trees. Complete binary trees satisfy the following conditions:

- All levels are filled, except the last.
- All the nodes are as far left as possible.

![Complete Binary Tree](/engineering-education/heap-data-structure-python/complete-binary-tree.png)

*[Figure: Complete Binary Tree](https://www.andrew.cmu.edu/course/15-121/lectures/Trees/trees.html)*

Heaps satisfy the heap property. This means that the root of every subtree should be the greatest or smallest element in the subtree, recursively.

### Applications of Heaps
- Priority Queues can be implemented using heaps. The root of a heap always contains the maximum or the minimum value, based on the heap type. Therefore, a min-priority queue is implemented using a minheap. A max-priority queue is implemented using a maxheap. The element with the highest priority can be retrieved in O(1) time.

- Statistics -- If we want to get ordered statistics, heaps serve as a great choice. If we want the kth smallest or largest element, we can pop the heap k times to retrieve them.

- Heaps are used in implementing various graph algorithms like [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) and [Prim's algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm).

### Implementing a Heap

#### Heap Operations
A heap has the following methods:

- **`getMax()`**

  - This operation returns the root of the maxheap.
  - Time Complexity - O(1).

- **`insert(k)`**

  - This operation inserts the key **k** into the heap.
  - Then it rearranges the heap to restore the heap property.
  - Time Complexity - O(log n).

- **`heapify()`**

  - This operation restores the heap property by rearranging the heap.
  - Time complexity - O(log n).

- **`printHeap()`**

  - Prints the heap's level order traversal.

#### Maxheap using List
We are going to do the list implementation of a heap. In this, the heap's level-order traversal would be stored as an array/list.

![Level Order Traversal](/engineering-education/heap-data-structure-python/level-order-traversal.png)

*[Figure: Level-Order Traversal](https://qph.fs.quoracdn.net/main-qimg-0ddd0cbca44f70d7845cc2caba5a0853)*

*Note - Level-Order Traversal is a recursive traversal where the root is processed first, followed by the children of the root. This is followed by the grandchildren of the root until all the nodes are processed. In the diagram above, the root node is processed first, followed by the left child, right child and so on. The final level order traversal would be: 10 4 8 50 24 5 12 18. For an overview of what a level order traversal is, check out [this](https://www.quora.com/What-is-level-order-traversal-in-a-binary-tree) Quora page.*

In the array representation of a heap, for an element in array index i,

- The Parent Node would be at position floor((i-1)/2).
- The Left Child would be at position 2\*i + 1.
- The Right Child would be at position 2\*i + 2.

Let us first define the Heap class.

```Python
class MaxHeap:
    def __init__(self):
        self.heap = []
```

This initiates a heap as a list. Now, let us define our methods.

```Python
class MaxHeap:
    def __init__(self):
        # Initialize a heap using list
        self.heap = []

    def getParentPosition(self, i):
        # The parent is located at floor((i-1)/2)
        return int((i-1)/2)

    def getLeftChildPosition(self, i):
        # The left child is located at 2 * i + 1
        return 2*i+1

    def getRightChildPosition(self, i):
        # The right child is located at 2 * i + 2
        return 2*i+2

    def hasParent(self, i):
        # This function checks if the given node has a parent or not
        return self.getParentPosition(i) < len(self.heap)

    def hasLeftChild(self, i):
        # This function checks if the given node has a left child or not
        return self.getLeftChildPosition(i) < len(self.heap)

    def hasRightChild(self, i):
        # This function checks if the given node has a right child or not
        return self.getRightChildPosition(i) < len(self.heap)

    def insert(self, key):
        self.heap.append(key) # Adds the key to the end of the list
        self.heapify(len(self.heap) - 1) # Re-arranges the heap to maintain the heap property

    def getMax(self):
        return self.heap[0] # Returns the largest value in the heap in O(1) time.

    def heapify(self, i):
        while(self.hasParent(i) and self.heap[i] > self.heap[self.getParentPosition(i)]): # Loops until it reaches a leaf node
            self.heap[i], self.heap[self.getParentPosition(i)] = self.heap[self.getParentPosition(i)], self.heap[i] # Swap the values
            i = self.getParentPosition(i) # Resets the new position

    def printHeap(self):
        print(self.heap) # Prints the heap
```

#### Minheap using Heapq
We have successfully implemented a heap using a list. Now, let's use the **`heapq`** library in Python to implement a minheap.

```Python
import heapq
class MinHeap:
    def __init__(self, minheap): # minheap is the list that we can to convert to a heap
        heapq.heapify(minheap) # Use the heapify function to convert list to a heap
        self.minheap = minheap

    def insert(self, key):
        heapq.heappush(self.minheap, key) # Insert key into the heap (heapq automatically maintains the heap property)

    def getMin(self):
        return self.minheap[0] # Returns the smallest element of the heap in O(1) time

    def removeMin(self):
        heapq.heappop(self.minheap) # The heappop function removes the smallest element in the heap

    def printHeap(self):
        print(self.minheap) # Prints the heap
```

### Practice Heaps
To get a better understanding of heaps, read a few in depth articles below and solve the following problems.

- [`Heapq` Library ](https://docs.python.org/3/library/heapq.html)
- [Heap Sort](https://www.geeksforgeeks.org/heap-sort/)
- [K Largest Elements](https://www.geeksforgeeks.org/k-largestor-smallest-elements-in-an-array/)
- [Building a Heap](https://www.geeksforgeeks.org/time-complexity-of-building-a-heap/)
- [Problems on Heaps](https://leetcode.com/tag/heap/)

### Conclusion
Heaps are extremely versatile and useful data structures that are used along with other data structures like Graphs and Trees to improve the efficiency of various operations. Once we have mastered heaps, we can move on to advanced data structures like Graphs.

---
Peer Review Contributions by: [Mike White](/engineering-education/authors/mike-white/)
