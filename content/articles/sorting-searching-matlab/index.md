---
layout: engineering-education
status: publish
published: true
url: /sorting-searching-matlab/
title: Searching and Sorting in Matlab
description: This article will go over the importance of searching and sorting. Both are fundamental algorithms that make work easier and eases the handling of extensive data. 
author: simon-mwaniki
date: 2021-08-25T00:00:00-12:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sorting-searching-matlab/hero.jpg
    alt: searching sorting matlab example image
---
Searching is the process of locating a given object or data within a large set of data. Sorting, on the other hand, is the arrangement of data in a specific required order. 
<!--more-->
The common application of these algorithms is in databases and other computer applications. A computer database is where all the computer data is stored. In the absence of searching and sorting algorithms, locating data in the computer is likely to take a lot of time. These algorithms simplify this process and minimize the time search and sorting.
### Introduction
The type of algorithm you will use will depend on the complexity, memory usage, and adaptability. Memory usage and adaptability of the algorithm rely on the input data. Therefore, the effect of searching and sorting algorithms in computing is that of memory usage. 

Some algorithms use large memory space, and this affects the overall performance of a computer. There are various applications of searching and sorting, but the primary application is locating data within a given vector similar to the target.

### Prerequisites
- Have [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- A proper understanding of the [matlab](/engineering-education/getting-started-with-matlab/) basics.

### Searching
The main target of the search is the uniqueness of the data. For example, if you visit a bank, retrieving your account details is made possible by searching algorithms. There are two types of search algorithms. 

These are;
1. Sequential
2. Binary search

### 1. Sequential search
It is also known as linear search.  It is a method of finding elements within a list. Here, the target is compared to the entire vector space or stops in a variable similar to target. Vector space is the data that makes up the list.

First, we should identify the target value within this vector. If we find a similar variable, we give its index as the output, and if we fail to find it, we provide an impossible index as the output. 

This impossible index could be something like -1. It is to show that the algorithm was not able to locate the target.
Below is a sample code that implements searching in matlab.

```matlab
function index = sequential_search(vector, target, first, last)
found = false;                %Assumming target not found
for n = first:last
if target == vector(n)
found = true;                  % If target is found then found is true
break;                         % Stop the search when found is true
end
end
index = n;                      % index of our target
if ~found
index = -1;                      % If not found, the index is -1
end
```

In our function, we have four inputs. The first input is the vector(n) in which we are locating our targeted value. The second input is the target that we are trying to find. The third and the fourth are the first and the last value of our vector. 

In most cases, our first value is always one, and the last value is the entire length of the vector. But in case you want to search up to a given limit, you input your range in the first and the last values. We can also use the internal flag `found`, `true`, and `false` functions to determine whether we found our target or not.  

### Example
We have a vector M = [ 3 2 6 34 22 98 77 45 99 12] and we want to find 34. 

We will call our function as shown below;

```matlab
sequential_search(M, 34, 1, 10)
```

When we execute this, we get the output which is the index of our target value which is 4.

![index for the target](/engineering-education/sorting-searching-matlab/search_one.png)

For extensive data, it takes time for sequential search to locate a given data. This is because it compares all the data with the target value to get a similar variable. For faster searching, you need to first sort your data, but this is not the case for sequential search. It means that it is the only algorithms used in searching unsorted lists.

### 2. Binary search
In case a list is sorted, then searching is a bit easier. The method of search that is applied here is a binary search. This algorithm constantly divides your list into sections of a guess until it narrows it into one. For example, you want to search between a range of 0 to 100. Let's say you want 28 as the number. 

If I tell you that the number we are searching for is greater than that, you may think of something like 80. If I tell you that our number is less than 80, you know that the target value is between 29 and 79. This is how binary search divides the data until it locates the target. 

There are two implementations of binary search, which are;
1. Recursive implementation of binary search
2. iterative implementation of binary search

### Recursive Implementation of binary search
In a recursive implementation of binary search, it is a search in which we all may be familiar with. For example, looking for a contact on your phone. You already know the page on which the contact you may need may appear. 

When you look at one name on the page, then you already know whether the target name is there or not. It continues, and you reach a point where you don't look at the contacts sequentially but instead scan. When you apply this process, you are applying your recursive approximation of binary search. 

The function for binary search is:

```Matlab
function index = binary_search_recursive(vector,target,first,last)
mid = fix( (first + last)/2 );
```

The code above is used when finding the mid variable. If the mid variable is a decimal value, we use the `fix` function to correct the decimals into a whole number or value.

```Matlab
if ~(first <= last) % In case first and last values are out of order
index = -1;          % Returns -1 to show the value is not in the list.
```

If the target is not within the range, then the index is returned as -1. 

```matlab
elseif target == vector(mid)
index = mid; % found it!
```

The mid element is compared to the target. If they are equal, then the search is successful and output returned.

```matlab
elseif target < vector(mid)
index = binary_search_recursive(vector,target,first, mid-1);
```

If the target is less than the mid element, it eliminates the mid element and all values that follow it. Thus, the search for the range before the mid element. 

`binary_search_recursive(vector, target, first, mid-1)` is used to call our function to search for the range of elements that comes before mid element else target is greater, and it searches for the values after the mid element.

```matlab
else
index = binary_search_recursive(vector,target,mid+1, last);
end
```

We call our function to search for the values after the mid element and the result given in the output. This method is known as binary. That is because it constantly divides the list into two. So, for example, if you want to search a value in the range 1-100, the search ranges will be 100, 50, 25, 12, 6, 3, 1. 

This means we will have seven calls of our function to find the target. If we look at this, we see that the binary search has carried less than 40 comparisons to reach the target compared to the sequential search, which could have taken 100 comparisons if the target is not within the range. 

### Example
We are given vector A = [2 13 17 22 29 43 64 73 82 89 99] and we want to locate 89 using our function.

```matlab
binary_search_recursive(A, 89, 1, length(A))
binary_search_recursive(A, 88, 1, length(A))  %unavailable 
```

![output for target and out of range](/engineering-education/sorting-searching-matlab/search_two.png)

In a duplicate value, the function gives the index of the value it first locates, unlike a sequential search that finds the first variable in the list.

### Iterative implementation of binary search
In the iterative implementation of binary search, the first and the last variables are set to be the first and the last indices of the range, respectively. 

Thus, the division of the list into smaller parts involves changing either the first or the last variable one at a time. It is possible by moving the first towards the end and the last variable towards the first. 

It is made possible by the use of the `while` loop. The `while` loop halts when the first value is greater than the last, and this means locating the target was unsuccessful.

```matlab
function index = binary_search_iterative(vector,target,first,last)
found = false;
while first <= last && ~found
mid = fix( (first + last) /2 );
if target < vector(mid)
last = mid - 1;                   %moving towards the beginning
elseif target > vector(mid)
first = mid + 1 ;                 %moving towards the end
else
found = true;
end
end
if found
index = mid;                      %Return the index if found
else
index = -1;                       % Return -1 if not found
end
```

Incase we have a vector A = [2 13 17 22 29 43 64 73 82 89 99] and we want to locate 73, the call of this function should be:

```matlab
binary_search_iterative(A, 73, 1, length(A))
```

The output will be:

![index of 73](/engineering-education/sorting-searching-matlab/search_three.png)

### Sorting
Sorting is arranging a list in a particular order. The algorithm used defines how to do the sorting. The importance of sorting is that it improvises searching to a high level. 

As we have seen, the advantage of binary search over-sequential search is because binary search searches sorted list. 

The other benefit of sorting is that it represents data in a more readable format. 

Generally, we have three types of sorts: [selection sort](https://www.geeksforgeeks.org/selection-sort/), quick sort, and merge sort. 

We will only look at quicksort and merge sort.

### Quicksort
This is the most efficient type of sort and also very easy to understand. Generally, this quicksort divides the data into three parts: v (1), smaller, and remainder. v (1) is the first value in the list. For example, if `M = [ 3 2 6 34 22 98 77 45 99 12]` is our vector, then our v (1) is 3. 

Smaller is a list consisting of all vectors less than v (1); for example, in our list, the values that are less than v (1) is 2. while the remainder consists of all remaining values in vector (v). After dividing your vector into three, the three parts are now sorted and brought together. 

It sorts the smaller list, and the output is assigned to `left`, it sorts the remainder, and the output is called `right`. So in calling our function, we use the `left` and the `right`. 

To divide our vector into sections, we use the code below:

```Matlab
function v = quicksort(v) 
if length(v)<=1, return, end
Now, we want to produce less than v(1) elements and the output assigned to smaller. 
less = v<v(1);
smaller = v(less);
```

We now want to create the remainder list. The logic remains the same, but we replace the `less` with `~less` to mean `not less` and produce value greater than v (1). 

`remainder(2:end)` this code is to remove v (1) from the list. It then carries a quick sort for the smaller and the remainder list.

```Matlab
remainder = v(~less);
remainder = remainder(2:end);
```

We then assign the sorted list accordingly. The sorted smaller list is assigned to `left` and sorted remainder to `right`. 

```Matlab
left = quicksort(smaller);
right = quicksort(remainder);
The algorithm now brings the three lists together to form the final sorted list.
v = [left, v(1), right]
```

### Example
Given vector M = [ 3 2 6 34 22 98 77 45 99 12], sort this vector using quicksort. 

To do this, we execute the command below:

```Matlab
quicksort(M)
```

The output will be:

![output](/engineering-education/sorting-searching-matlab/search_four.png)

### Merge sort
This algorithm is better than quicksort. Quicksort divides the data into three, but if you look at it keenly, there was nothing really done in that list. 

It makes it of no importance or use. In this case, merge sort divides the list into two equal parts, conducts a sort for the two parts separately, and then merges the two lists. 

The function for merge sort is:

```Matlab
function v = merge_sort(v)
N = length(v);
if N == 1, return; % already sorted
else
mid = fix(N/2);              %Divides the vector into two
v1 = merge_sort(v(1:mid));    %Elements from the first to the mid are sorted
v2 = merge_sort(v(mid+1:end)); %Elements from the mid to the last are sorted
v = merge_sorted_lists(v1,v2);  %The two lists are merged
end
```

### Conclusion
Searching and sorting are fundamental algorithms in various activities. They make work easy and eases the handling of extensive data. 

Matlab provides a suitable environment for implementing these algorithms. It has built-in functions that prevent the code from being so bulky but straightforward to understand.

Happy learning.

---
Peer Review Contributions by: [Elly Omondi](/engineering-education/authors/elly-omondi)

