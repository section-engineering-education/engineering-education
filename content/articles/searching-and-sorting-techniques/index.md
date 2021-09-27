---
layout: engineering-education
status: publish
published: true
url: /searching-and-sorting-techniques/
title: Searching and sorting techniques 
description: In this article, we will learn about various sorting and searching techniques and their implementation in data structures and algorithms.
author: jairus-onkundi
date: 2021-09-27T00:00:00-17:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/searching-and-sorting-techniques/hero.jpg
    alt: Searching and sorting techniques 
---
Searching is determining the position of an item in a list. This is a crucial aspect of many data structure techniques, because we can only execute one action on an item if and only if we locate the item. To determine if an element is present in a collection of components, many methods have been devised, as we will discuss in this article.
<!--more-->
Sorting is putting information in a certain order in a data structure. Sorting data makes it easier to navigate through it quickly and efficiently. Sorting reduces the complexity of problems by a large amount, and sorting is a technique for reducing the complexity of searching. 

### Introduction
Sorting, for example, is required before using Binary Search, and it is also used in database methods. Sorted arrays and lists make it easier to locate items fast. 

In this article, we will learn about various sorting and searching techniques and their implementation in data structures and algorithms. 

### Table of contents
- [What is searching?](#what-is-searching)
- [What is sorting?](#what-is-sorting)
- [Techniques for searching and how they are implemented ](#techniques-for-searching-and-how-they-are-implemented)
  1. [Linear search](#1-linear-search)
  2. [Binary search](#2-binary-search)
  3. [Interpolation search](#3-interpolation-search)
  4. [Jump search](#4-jump-search)

- [Sorting techniques and their implementation](#sorting-techniques-and-their-implementation) 
   1. [Insertion sort](#1-insertion-sort)
   2. [Bubble sort](#2-bubble-sort)
   3. [Selection sort](#3-selection-sort)
   4. [Merge sort](#4-merge-sort)
   5. [Quick sort](#5-quick-sort)
   6. [Heap sort](#6-heap-sort)
- [Conclusion](#conclusion)

### What is searching?
Searching in data structure refers to the act of locating needed information from a group of things stored as components in the computer memory.

### What is sorting?
Sorting refers to the operation or technique of ordering and rearranging groups of data in a specified order.

### Techniques for searching and how they are implemented 
These techniques are divided into categories depending on the search operation they undertake, for example:

#### 1. Linear search
The linear search method is a pretty simple search method. A sequential search is performed on all things one by one in this sort of search. 

Every item is verified, and if a match is discovered, that item is returned; if not, the search continues until the data collection is complete.

##### Algorithm
Step 1: Determine the size of the data set.

Step 2: Set the counter to zero.

Step 3: Examine the value in the counter position of the list.

Step 4: Examine to see if the value at that place corresponds to the value you're searching for.

Step 5: If it matches, the value has been discovered. Send a message to bring the search to a close.

Step 6: If not, go return to step 3 and increase the counter by one until there are no more things to search for.

Step 7: Send a message if all the objects have been searched, and no match has been found.

#### 2. Binary search
To search a sorted array, divide the search interval in half regularly. Begin by creating an interval that spans the whole array. 

If the search key's value is less than the item in the interval's midpoint, the interval should be narrowed to the bottom half. Otherwise, limit it to the upper half of the page. Check the value until it is discovered or the interval is empty.

##### Algorithm
The procedures for implementing binary search are:
Step 1: Ask the user for the search element.

Step 2: In the sorted list, locate the center element.

Step 3: Compare the element you are looking for to the sorted list's center element.

Step 4 - If both elements match, the program will display the result and the function will be terminated.

Step 5 - If neither of the elements is matched, see if the element you are looking for is smaller or greater than the center element.

Step 6 - If the element you're looking for isn't in the center, repeat steps 2, 3, 4, and 5 for the lower sub list's center element.

#### 3. Interpolation search
Depending on the value of the key being searched, interpolation search may go to various places. If the key's value is closer to the final element, for example, interpolation search is more likely to begin at the end.

Interpolation search uses the formula below to get the place to be searched.

```bash
 pos = i + [ (k-ar[i])*(z-i) / (ar[z]-ar[i]) ]
```

Let's look at the meaning of this formula:
- ar[]: Array where elements need to be searched
- k: Element to be searched
- i: Starting index in ar[]
- z: Ending index in ar[]

##### Algorithm
Step 1: Begin looking for information in the middle of the list.

Step 2: If there is a match, return the item's index and leave.

Step 3: Probe the position if it isn't a match.

Step 4: Using the probing formula, divide the list and discover the new middle.

Step 5: If the data is larger than the center, look for it in a higher sub-list.

Step 6: If the data is less than the middle, look in the lowest sub-list.

Step 7: Continue until you've found a match.

#### 4. Jump search
The Jump Search approach is a new sorting method that locates a particular component in a sorted list. When compared to a linear search algorithm, the basic principle behind this searching strategy is to search a smaller amount of elements.

In each iteration, this can be accomplished by skipping a fixed number of array elements or leaping ahead a fixed number of steps.

##### Algorithm
Consider the x=3 block size.

The first element is k and the second is m.

The target element can be stored in the variable t.

Now, the search begins with the first element and continues until the target element is found.

If the target element is present in the sorted array, it can be found.

### Sorting techniques and their implementation
Elements in a data structure can be sorted using the sorting techniques as discussed below:

#### 1) Insertion sort
Insertion sort is a sorting method in which each item in a sorted list is added one at a moment. The list members are compared progressively before being placed in a specific order.
 
In this sorting technique, an element is inserted at a certain location.

##### Algorithm
Step 1: If it's the first element, it's already sorted.

Step 2: Select the next item.

Step 3: Compare the element to be sorted to all items in the sorted sub-list.

Step 4: All elements in the sorted sub-list with values higher than that of the sorted value must be moved.

Step 5: Fill in the missing value.

Step 6: Continue sorting the list until it is complete.

An example of insertion sort is as shown below:

![insertion](/engineering-education/searching-and-sorting-techniques/insertion-sort.png)

#### 2) Bubble sort
Bubble Sort is a basic sorting technique that t compares each adjacent element and swaps them when they're out of sequence.

Bubble sort works well with small sets of data.

##### Algorithm
The stages involved in bubble sort (sorting an array in ascending order) are as follows:
Step 1: Compare the current element to the next element of the array, starting with the first element (index = 0).

Step 2: Swap the elements if the value of the current element is higher than the value of the array's next element.

Step 3: Move on to the next element if the current element is less than the next element. 

An example bubble sort is as shown below:

![bubble sort](/engineering-education/searching-and-sorting-techniques/bubble-sort.png)

Step 4: Repeat Step 1.

#### 3) Selection sort
The Selection Sort technique sorts an array by continually choosing the smallest item from the unsorted segment and placing it at the start in ascending order. As a result, that item is added to the sorted array.

This procedure keeps moving the unsorted array border one item to the right.

##### Algorithm
Step 1: Pick the first item on an array.

Step 2: Compare the picked item to the rest of an array's items.

Step 3: If any item is determined to be smaller than the picked item (in ascending order), both elements are swapped.

Step 4: Continue sorting the array using the element in the succeeding place until the entire array is sorted.

An example selection sort is as shown below:

![selection sort](/engineering-education/searching-and-sorting-techniques/selection-sort.png)

#### 4) Merge sort
One of the most efficient sorting algorithms is Merge sort. It is based on the divide-and-conquer strategy. Merge sort reduces down a list into sub-lists until every sub-list only includes one element, after which it combines the sub-lists into a sorted list.

##### Algorithm
Step 1: If there is just one entry in the list, return it because it has been sorted already.

Step 2: Recursively partition the list into two halves until you can't partition it anymore.

Step 3: Sort the smaller lists and combine them to make a new list.

An example of merge sort is as shown below:

![merge sort](/engineering-education/searching-and-sorting-techniques/merge-sort.png)

#### 5) Quick sort
It is a similar split-and-conquer technique to merge sort. It selects a pivot element and partitions the specified array around that pivot.

A large list is partitioned into two sub-lists, the first of which includes elements lower than the element, referred to as pivots, and the other of which contains elements higher than the pivot element, on which divisions are constructed.

##### Algorithm
Step 1: Decide which index value has the highest pivot.

Step 2: Use two parameters, one is on the upper left of the list middle value, and the other on the upper right.

Step 3: To the left shows the low index.

Step 4: The right arrow points to the highest point.

Step 5: While the element on the left is lower than the pivot, go right.

Step 6: Move left while the value at the right is bigger than the pivot.

Step 7: Swap left and right if both Steps 5 and 6 don't match.

Step 8: If they meet on the left or right, the place where they met becomes the new pivot.

An example quick sort is as shown below:

![quick sort](/engineering-education/searching-and-sorting-techniques/quick-sort.png)

#### 6) Heap sort
Heap sort is a sorting algorithm that compares objects using a Binary Heap dataset. It's comparable to selection sorting, in which we identify the smallest piece first and place it at the top. For the remaining values, the same procedure is repeated.

A Binary Heap is a Complete Binary Tree in which elements are placed in such a way that the value of a parent node is higher (or lower) than the elements of its two offspring nodes.

##### Algorithm
Sorting in ascending order with the Heap Sort Algorithm:
Step 1: Create a maximum heap using the data.

Step 2: The largest element is placed at the base of the root at this stage.

Step 3: Replace it with the heap's final item, then reduce the heap's size by one.
 
Step 4: Finally, heapify the tree's root.

Step 5: Repeat Steps 2,3 and 4 as long as the heap is larger than one.

An example of heap sort is as shown below:

![heap sort-1](/engineering-education/searching-and-sorting-techniques/heap-sort-1.png)

![heap sort-2](/engineering-education/searching-and-sorting-techniques/heap-sort-2.png)

![heap sort-3](/engineering-education/searching-and-sorting-techniques/heap-sort-3.png)

### Conclusion
Searching in data structures is finding a particular component in an array of ‘t’ components. To search, there are two kinds of searches: *sequential and interval*. Almost all search techniques may be classified into one of these two categories.  

Binary and linear searches are two quick and easy techniques, with binary working quicker than linear search techniques.

Binary search is quicker if the acquired data is sorted and the array size is large.

Happy learning!

### Further reading
1. [Difference between Searching and Sorting Algorithms](https://www.geeksforgeeks.org/difference-between-searching-and-sorting-algorithms/)
2. [Elementary Data Structures](https://learn.saylor.org/course/view.php?id=66&sectionid=628)
3. [Introduction to Sorting techniques in C++](https://www.softwaretestinghelp.com/sorting-techniques-in-cpp/)

---
Peer Review Contributions by: [Bonface Muriithi](/engineering-education/authors/bonface-muriithi)
