---
layout: engineering-education
status: publish
published: true
url: /queue-data-structure-python/
title: Using the Queue Data Structure in Python
description: A queue is an efficient linear data structure that is used to maintain the order and is used to implement other data structures. 
author: saiharsha-balasubramaniam
date: 2020-07-20T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/queue-data-structure-python/hero.jpg
    alt: python data structures queue

---
In Part 4 of this series, let us dive into Queues, a data structure that stores data in a **First In, First Out** (FIFO) manner. [Queue](https://www.tutorialspoint.com/data_structures_algorithms/dsa_queue.htm) is an abstract data structure, somewhat similar to Stacks. Unlike stacks, a queue is open at both of its ends. In this article, we'll be looking at how to implement and use the queue data structure in Python.

*For more background on the different data structures in Python, check out my articles on the [List](/list-data-structure-python/) and [Stack](/stack-data-structure-python) data structures.*

<!--more-->

### Table of Contents

- [Queue: Introduction](#queue:-introduction)
- [Uses of Queues](#uses-of-queues)
- [Implementing Queues](#implementing-queues)
- [Practice Queues](#practice-queues)
- [Conclusion](#conclusion)

### Queue - An introduction
A Queue is a linear data structure in which data is stored in a **First In, First Out** manner. In a queue, the item that was added the earliest is removed first. The item that was added more recently is removed last. A queue can be compared to a real-life queue.

![Queue, Diagram](/engineering-education/queue-data-structure-python/queue.png)

`enqueue` is a queue operation where you add an item at the back of a queue.

`dequeue` is a queue operation where you remove an item from the front of a queue.

### Uses of Queues

- **Operating Systems** - often maintain queues while implementing various low-level operations such as CPU Scheduling, Disk Scheduling, etc.
- **Hardware** - hardware interrupts are handled using queues.
- **Internet** - Website traffic handling.
- And all other scenarios where a First In, First Out priority has to be implemented.

### Implementing Queues

#### Queue Methods

##### queue.Enqueue()
- The `queue.Enqueue()` method adds an element at the rear of the queue.
- Time Complexity -> O(1)
##### queue.Dequeue()
- The `queue.Dequeue()` method removes an element from the front of the queue.
- Time Complexity -> O(1)
##### queue.Front()
- The `queue.Front()` method returns the front item from the queue.
- Time Complexity -> O(1)
##### queue.Rear()
- The `queue.Rear()` method returns the rear item from the queue.
- Time Complexity -> O(1)
##### queue.isEmpty()
- The `queue.isEmpty()` method returns `True` if the queue is empty, else returns `False`.
- Time Complexity -> O(1)

Queues can be implemented in various ways. Let us look at how to implement a queue using a list and using the `collections.deque` module in Python.

#### Queue using a List

We can use the list methods `insert` and `pop` to implement a queue.

```python
class Queue:

    def __init__(self):
        """
        Initializing Queue.
        """
        self.queue = []

    def isEmpty(self) -> bool:
        return True if len(self.queue) == 0 else False

    def front(self) -> int:
        return self.queue[-1]

    def rear(self) -> int:
        return self.queue[0]

    def enqueue(self, x: int) -> None:
        self.x = x
        self.queue.insert(0, x)       

    def dequeue(self) -> None:
        self.queue.pop()
```

#### Queue using collections.Deque

The `deque` class from the python `collections` module can also be used to implement a queue. This method of implementing a queue is far more efficient because deque provides faster enqueue and dequeue operations.

```python
from collections import deque
class Queue:

    def __init__(self):
        """
        Initializing Queue.
        """
        self.queue = deque()

    def isEmpty(self) -> bool:
        return True if len(self.queue) == 0 else False

    def front(self) -> int:
        return self.queue[-1]

    def rear(self) -> int:
        return self.queue[0]

    def enqueue(self, x: int) -> None:
        self.x = x
        self.queue.append(x)       

    def dequeue(self) -> None:
        self.queue.popleft()
```

### Practice Queues

Try implementing the queue in Python first. Then once you're done with the implementation, try solving these problems on [HackerRank](https://hackerrank.com/dashboard) and [LeetCode](https://leetcode.com/problems)

- Reversing a Queue - [GeeksforGeeks](https://www.geeksforgeeks.org/reversing-a-queue/?ref=rp)
- Sort the Queue using Recursion - [GeeksforGeeks](https://www.geeksforgeeks.org/sort-the-queue-using-recursion/?ref=rp)
- Reversing First K Elements of the Queue - [GeeksforGeeks](https://www.geeksforgeeks.org/reversing-first-k-elements-queue/?ref=rp)
- Implementing Stack using Queues - [GeeksforGeeks](https://www.geeksforgeeks.org/implement-stack-using-queue/)
- Queries with Fixed Length - [HackerRank](https://www.hackerrank.com/challenges/queries-with-fixed-length/problem)
- Truck Tour - [HackerRank](https://www.hackerrank.com/challenges/truck-tour/problem)
- Maximum Sum of Triangle No Less Than K - [LeetCode](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/)
- Design Circular Queue - [LeetCode](https://leetcode.com/problems/design-circular-queue/)
- Design Circular Dequeue - [LeetCode](https://leetcode.com/problems/design-circular-deque/)

### Conclusion
We have implemented queues and learned how to use them in algorithmic problems. Queues are very integral from an operating system point of view. They are also commonly asked about in interviews.