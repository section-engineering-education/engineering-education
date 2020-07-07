---
layout: engineering-education
status: publish
published: true
slug: data-structures-python-part-4
title: Data Structures in Python - Part 4
description: An overview of data structures in this article, and move on to learn about every data structure, in-depth article about implementing queues in Python.
author: saiharsha-balasubramaniam
date: 2020-07-07T00:00:00-12:00
topics: [languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-structures-python-part-4/hero.jpg
    alt: python data structures queue

---
In Part 4 of this series, let us dive into Queues, a data structure that stores data in a **First In, First Out** (FIFO) manner. [Queue](https://www.tutorialspoint.com/data_structures_algorithms/dsa_queue.htm) is an abstract data structure, somewhat similar to Stacks. Unlike stacks, a queue is open at both its ends.
<!--more-->

### Table of Contents

- [Queue: Introduction](#queue:-introduction)
- [Uses of Queues](#uses-of-queues)
- [Implementing Queues](#implementing-queues)
- [Practice Queues](#practice-queues)
- [Conclusion](#conclusion)

### Queue - An introduction
A Queue is a linear data structure in which data is stored in a **First In, First Out** manner. In a queue, the item that was added the earliest is removed first. The item that was added more recently is removed last. A queue can be compared to a real-life queue.

![Queue, Diagram](/engineering-education/data-structures-python-part-4/queue.png)

`enqueue` is a queue operation where you add an item at the back of a queue.

`dequeue` is a queue operating where you remove an item from the front of a queue.

### Uses of Queues

- **Operating Systems** - often maintain queues while implementing various low-level operations such as CPU Scheduling, Disk Scheduling, etc.
- **Hardware** - hardware interrupts are handled using queues.
- **Internet** - Website traffic handling.
- And all other scenarios where a First In, First Out priority has to be implemented.

### Implementing Queues

#### Queue Methods

##### queue.Enqueue()
- Adds an element at the rear of the queue.
- Time Complexity -> O(1)
##### queue.Dequeue()
- Removes an element from the front of the queue.
- Time Complexity -> O(1)
##### queue.Front()
- Return the front item from the queue.
- Time Complexity -> O(1)
##### queue.Rear()
- Return the rear item from the queue.
- Time Complexity -> O(1)
##### queue.isEmpty()
- Returns `True` if the queue is empty, else returns `False`.
- Time Complexity -> O(1)

Queues can be implemented in various ways. Let us look implement a queue using list and using the `collections.deque` module in Python.

#### Queue using a List

We can use the list methods `insert` and `pop` to implement a queue.

```
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

```
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
We have implemented queues and learned how to use them in algorithmic problems. Queues are very integral from an operating system point of view. They are also asked in interviews extensively.
**We have thus covered all the linear data structures successfully in this series.** The next article would deal with Non-Linear Data Structures like Tree, Heap, etc. Stay tuned!
