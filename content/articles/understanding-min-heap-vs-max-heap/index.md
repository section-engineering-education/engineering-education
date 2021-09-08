---
layout: engineering-education
status: publish
published: true
url: /understanding-min-heap-vs-max-heap/
title: Understanding Min Heap vs Max Heap
description: This article will cover the difference between min heaps and max heaps. A heap is a tree-based data structure that allows access to the minimum and maximum element in the tree in constant time.
author: kennedy-mwangi
date: 2021-02-05T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-min-heap-vs-max-heap/hero.jpg
    alt: Understanding Min Heap vs Max Heap Hero Image
---
A heap is a tree-based data structure that allows access to the minimum and maximum element in the tree in constant time. The constant time taken is [Big O](https://en.wikipedia.org/wiki/Big_O_notation)(1). This is regardless of the data stored in the heap. 
<!--more-->
There are two types of heaps: Min-heap and Max-heap. A min-heap is used to access the minimum element in the heap whereas the Max-heap is used when accessing the maximum element in the heap.
### Prerequisites
To follow along with this article, you should have the following:

- [Node.js](https://nodejs.org/en/) installed on your computer.

- Basic knowledge of JavaScript.

### Overview
- [Setting up the project](#setting-up-the-project)

- [Min-heap](#min-heap).

- [Max-heap](#max-heap).

- [Why we need heaps?](#why-we-need-heaps).

- [Application of heaps](#application-of-heaps).

### Setting up the project
To set up the project, clone this [GitHub repository](https://github.com/mwangiKibui/understanding-min-heap-vs-max-heap). After you clone it, you will find two folders: **start** and **final**. In this article, we will be working on the start folder but in case you encounter an error, feel free to check out the **final** folder for the final code.

### Min-heap
In a min-heap, the parent or root node is usually lesser in value than the children nodes. The least element is accessed within constant time since it is at index `1`.

![min-heap](/engineering-education/understanding-min-heap-vs-max-heap/min-heap.jpg)

[Image Source](https://www.geeksforgeeks.org/difference-between-min-heap-and-max-heap/)

Based on the figure below, at every level, the smallest number is the parent node.

#### Implementation
When illustrating a min-heap, we use a tree-based structure. But when stored in memory, we use an array-based structure. Consider the figure below showing the tree-based and memory-based representation.

![min-heap-implementation](/engineering-education/understanding-min-heap-vs-max-heap/min-heap-implementation.jpg)

[Image Source](https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65)

In a min-heap, the first element is `null` and then the following formula is used in arranging the elements:
- Parent node: `i`

- Left node: `i * 2`

- Right node: `i * 2 + 1`

- At any node you can find the parent by `i / 2`

- `i` is the index in the array.

For the min-heap, we will insert an element, get the lowest element, and remove an element.

#### Inserting an element
While inserting an element in a min-heap, we use [heap sort algorithm](https://www.codingeek.com/algorithms/heap-sort-algorithm-explanation-and-implementation/).

The algorithm works by first pushing the element to be inserted at the end of the array and then traversing through to find the correct position for the element.

In the `minHeap.js` file, under `insert()` function, we add up the following functionality to insert an element:

```javascript
function insert(node) {
  heap.push(node);

  if (heap.length > 1) {
    let current = heap.length - 1;

    while (current > 1 && heap[Math.floor(current / 2)] > heap[current]) {
      //swapping values
      [heap[Math.floor(current / 2)], heap[current]] = [
        heap[current],
        heap[Math.floor(current / 2)],
      ];

      current = Math.floor(current / 2);
    }
  }

  return;
}

//testing functionality

insert(10);
insert(90);
insert(36);
insert(5);
insert(1);

console.log(heap.slice(1));
```

Expected output:

```bash
[ 1, 5, 36, 90, 10 ]
```

From the function above:
- Push the element to the end of the array.

- Check if the number of elements in the array is more than one. If they are, follow the steps below.

- Get the index of the inserted element.

- Loop through the array checking if there is a parent greater than the inserted element.

- If it exists, swap them.

#### Retrieving the minimum element
With a min-heap data structure, the minimum element is at index `1`.

In the same file, under `getMin()` function, we add up the functionalities:

```javascript
function getMin(){
    return heap[1];
};

//testing functionality

insert(10);
insert(90);
insert(36);
insert(5);
insert(1);

console.log(getMin());
```

Expected output:

```bash
1
```

From the above code snippets, we get the minimum element stored at index `1`.

#### Removing an element
Removing an element from a min-heap data structure consists of the following steps:
- Removing the least element first.

- Adjusting the min-heap to retain the order.

In the same file, under `remove()`, we add up the functionalities:

```javascript
function remove() {
  if (heap.length > 2) {
    //assign last value to first index
    heap[1] = heap[heap.length - 1];

    //remove the last value
    heap.splice(heap.length - 1);

    if (heap.length === 3) {
      if (heap[1] > heap[2]) {
        //swap them
        [heap[1], heap[2]] = [heap[2], heap[1]];
      }
      return;
    }

    //get indexes
    let parent_node = 1;
    let left_node = parent_node * 2;
    let right_node = parent_node * 2 + 1;

    while (heap[left_node] && heap[right_node]) {
      //parent node greater than left child node
      if (heap[parent_node] > heap[left_node]) {
        //swap the values

        [heap[parent_node], heap[left_node]] = [
          heap[left_node],
          heap[parent_node],
        ];
      }

      //parent node greater than right child node
      if (heap[parent_node] > heap[right_node]) {
        // swap
        [heap[parent_node], heap[right_node]] = [
          heap[right_node],
          heap[parent_node],
        ];
      }

      if (heap[left_node] > heap[right_node]) {
        //swap
        [heap[left_node], heap[right_node]] = [
          heap[right_node],
          heap[left_node],
        ];
      }

      parent_node += 1;
      left_node = parent_node * 2;
      right_node = parent_node * 2 + 1;
    }

    //incase right child index is undefined.
    if (heap[right_node] === undefined && heap[left_node] < heap[parent_node]) {
      //swap.
      [heap[parent_node], heap[left_node]] = [
        heap[left_node],
        heap[parent_node],
      ];
    }
  }

  // if there are only two elements in the array.
  else if (heap.length === 2) {
    // remove the 1st index value
    heap.splice(1, 1);
  } else {
    return null;
  }

  return;
}

//testing functionality

insert(10);
insert(90);
insert(36);
insert(5);
insert(1);

remove();

console.log(heap.slice(1));
```

Expected output

```bash
[ 5, 10, 36, 90 ]
```

From the function above:
- Check if the array has more than two elements. If it does not, remove the element in the first index. If it does, continue with the steps below.

- Assign the last value to the first index.

- Remove the last value from the array.

- Check if the array has three elements remaining. If it is `true`, check if the first element is greater than the second element. Swap them if the condition is satisfied. If there are more than three elements, continue with the steps below.

- Define the index of the parent node, left node, and right node.

- Loop through the array that have both the left child value and right child value. Where the parent value is greater than the left child value or right child value, swap them. If the left node value is greater than the right node value, swap them as well.

- If there is no right node value but the parent node is greater than the left node value, swap the values.

### Max-heap
In a max-heap, the parent or root node is usually greater than the children nodes. The maximum element can be accessed in constant time since it is at index `1`.

![max-heap](/engineering-education/understanding-min-heap-vs-max-heap/max-heap.jpg)

[Image Source](https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65)

Based on the figure above, at every level, the largest number is the parent node.

#### Implementation
Similarly, when illustrating a max-heap we use a tree-based structure but when representing in memory we use an array-based structure. Consider the figure below showing the tree-based and memory-based representation.

![max-heap-implementation](/engineering-education/understanding-min-heap-vs-max-heap/max-heap-implementation.jpg)

[Image Source](https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65)

Similarly, in a max-heap, the first element is `null` and then the following formula is used when arranging the elements:
- Parent node: `i`

- Left node: `i * 2`

- Right node: `i * 2 + 1`

- At any node you can find the parent by `i / 2`

`i` is the index in the array.

For the max-heap, we will insert an element, get the largest element, and remove an element.

#### Inserting an element
In a max-heap, we also use the heap-sort algorithm while inserting elements.

In the `maxHeap.js` file, under `insert()` function, we add up the following functionality to insert elements.

```javascript
function insert(node) {
  //insert first at the end of the array.
  heap.push(node);

  if (heap.length > 1) {
    //get index
    let current = heap.length - 1;

    //Loop through checking if the parent is less.

    while (current > 1 && heap[Math.floor(current / 2)] < heap[current]) {
      //swap
      [heap[Math.floor(current / 2)], heap[current]] = [
        heap[current],
        heap[Math.floor(current / 2)],
      ];

      //change the index
      current = Math.floor(current / 2);
    }
  }
}

//testing functionality

insert(10);
insert(100);
insert(120);
insert(1000);

console.log(heap.slice(1));
```

Expected output:

```bash
[ 1000, 120, 100, 10 ]
```

From the function above:
- Push the element to the end of the array.

- Check if there is more than one element in the array. If there is, continue with the steps below.

- Get the index of the position of the element.

- Loop through the array checking if there is a parent node value less than the inserted element.

- If there is, swap the values and update the index of the element in the array.

#### Getting the largest element
In a max-heap, getting the largest element means accessing the element at index `1`.

In the same file, under the `getMax()` function, we add up the functionalities:

```javascript
function getMax(){
    return heap[1];
};

//testing functionality

insert(10);
insert(100);
insert(120);
insert(1000);

console.log(getMax());
```

Expected output:

```bash
1000
```

In the function above, we are returning the element stored at index `1`.

#### Removing an element
Removing an element from a max-heap involves the following steps:

- Removing the first element which is usually the largest.

- Re-arranging the remaining elements in order.

In the same file, under the `remove()` function, we will add up the functionalities:

```javascript
function remove() {
  //check if we got two elements in heap array.
  if (heap.length === 2) {
    //remove the Ist index value
    heap.splice(1, 1);
  } else if (heap.length > 2) {
    //assign last value to first index
    heap[1] = heap[heap.length - 1];

    //remove the last item
    heap.splice(heap.length - 1);

    //check if the length is 3.
    if (heap.length === 3) {
      if (heap[2] > heap[1]) {
        [heap[1], heap[2]] = [heap[2], heap[1]];
      }
    }

    //setup needed indexes.
    let parent_node = 1;
    let left_node = parent_node * 2;
    let right_node = parent_node * 2 + 1;

    while (heap[left_node] && heap[right_node]) {
      //parent node value is smaller than the left node value
      if (heap[left_node] > heap[parent_node]) {
        //swap
        [heap[parent_node], heap[left_node]] = [
          heap[left_node],
          heap[parent_node],
        ];

        //update the parent node index.
        current = left_node;
      }

      if (heap[right_node] > heap[parent_node]) {
        //swap
        [heap[parent_node], heap[right_node]] = [
          heap[right_node],
          heap[parent_node],
        ];

        //update the parent node index.
        current = right_node;
      }

      if (heap[left_node] < heap[right_node]) {
        //swap
        [heap[left_node], heap[right_node]] = [
          heap[right_node],
          heap[left_node],
        ];
      }

      //update the left and right node
      left_node = current * 2;
      right_node = current * 2 + 1;
    }

    //no right child, but left child is greater than parent
    if (heap[right_node] === undefined && heap[left_node] > heap[parent_node]) {
      //swap
      [heap[parent_node], heap[left_node]] = [
        heap[left_node],
        heap[parent_node],
      ];
    }
  } else {
    return null;
  }

  return;
}

//testing functionality

insert(10);
insert(100);
insert(120);
insert(1000);

remove();

console.log(heap.slice(1));
```

From the function above:
- Check if the array has more than two elements. If it does not, just remove the element in the first index. If it does, continue with the below steps.

- Assign the last value to the first index.

- Remove the last value from the array.

- Check if the array has three elements remaining. If it is `true`, check if the element at index two is greater than the element at index one. Swap them if the condition is satisfied. If more than three elements are remaining, continue with the below steps.

- Define the indexes of the parent node, left node, and right node.

- Loop through the array where there is a left node value and right node value. If the parent node value is smaller than either the left node or right node value, swap them. Also, if the left node value is smaller than the right node value, swap them.

- If there is no right node value but the parent node is less than the left node value, swap the values.

### Why we need heaps?
- **Reduced time complexity**: Linear data structures such as linked lists or arrays can access the minimum or maximum element present in Big O (n) whereas heaps can access the minimum or maximum element present in Big O (1). 

This is crucial while processing large data sets. n refers to the number of data sets.

### Application of heaps
- They have been used in [operating systems](https://www.tutorialspoint.com/operating_system/os_overview.htm) for [job scheduling](https://www.techopedia.com/definition/7882/job-scheduling) on a priority basis.

- They are used in [Heap sort algorithms](https://www.programiz.com/dsa/heap-sort) to implement priority queues.

- Used in the [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) to find the shortest paths.

### Conclusion
With a reduced time complexity, min-heap and max-heap are efficient when processing data sets, each with its own use case and implementation.

In this article, we have covered, the min-heap, the max-heap, why we need heaps, and applications of heaps.

Happy coding!!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

