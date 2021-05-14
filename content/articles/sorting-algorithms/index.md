---
layout: engineering-education
status: publish
published: true
url: /sorting-algorithms/
title: How to Sort a List Using Algorithms
description: A sorting algorithm is an algorithm that puts elements of a list in a certain order. Efficient sorting is important to optimizing the efficiency of other algorithms that require input data to be in sorted lists.
author: mike-white
date: 2020-07-04T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sorting-algorithms/hero.jpg
    alt: computer image asm example
---
Sorting is a common operation that needs to be done, but there are many ways to do it. We want to use whichever algorithm can sort a list as quickly as possible. By the end of this article, you should be able to choose the best algorithm for your project.
<!--more-->

### About Time Complexity
Time complexity measures how an algorithm performs under large inputs.

![A graph showing how time complexity works](/engineering-education/sorting-algorithms/complexity.png)

- `O(1)` is the best-case scenario. It means that no matter how big the list is, it will take the same amount of time to sort it.
- `O(logn)` means that the extra time for each element decreases as you add more elements.
- `O(n)` means that a constant amount of time is added for each element.

The latter two are both pretty good time complexities to have. Unfortunately, none of our algorithms are this quick. [It's impossible to have a sorting algorithm that works faster than `O(n)`](https://www.youtube.com/watch?v=4Q72kbwyEmk).

Most of the algorithms we will talk about today will be either `O(n^2)` or `O(nlogn)`. We'll be using time complexity to compare our algorithms.

### Insertion Sort
[Insertion sort](https://github.com/botahamec/sorting_algos/blob/master/python/insertion_sort.py) works by splitting the list into a "sorted part" and an "unsorted part". Initially, every element in the list is in the "unsorted part". The algorithm needs to move all the elements into the sorted part. To do this, it needs to pick an element, and shift it until the element is in its proper place.

![A hand drawn demonstration showing a few steps of insertion sort](/engineering-education/sorting-algorithms/insertion1.jpg)<br>
![A hand-drawn illustration of insertion sort](/engineering-education/sorting-algorithms/insertion2.jpg)<br>
[Here's a video of a robot doing it](https://www.youtube.com/watch?v=TZRWRjq2CAg)

Moving a single element, on average, is an `O(n/4)` operation. This is because it needs to go through half of the list to find where it needs to go. We can ignore the 1/4. There are n elements, which means the total complexity of insertion sort is `O(n^2)`. That's pretty bad.

There is one reason to use insertion sort, which is if there's a high chance that the list is already sorted. If it's already sorted, then none of the elements have to move, which means we can sort the list in `O(n)` time. If there's a high likelihood of getting an already-sorted list (like in user input), then this is a good approach.

### Merge Sort
[Merge sort](https://github.com/botahamec/sorting_algos/blob/master/python/merge_sort.py) splits the list in half, repeatedly, until every part of the list is just one element. Then, we can merge halves together until we eventually get the sorted list back.

![A hand-drawn demonstration of merge sort](/engineering-education/sorting-algorithms/merge.jpg)<br>
[Here's a video of a robot doing it](https://www.youtube.com/watch?v=es2T6KY45cA)

Merging the lists is an `O(n)` operation. This time, it only has to be done log(n) times, so the complexity of merge sort will always be `O(nlogn)`. Unlike insertion sort, the complexity does not change depending on the list. It always takes the same amount of time.

### Quick Sort

[Quick sort](https://github.com/botahamec/sorting_algos/blob/master/python/quick_sort.py) is very interesting. The first thing you do is select an element of the list to be a "pivot". Then, you split the list into three lists. One contains elements that are less than the pivot. One contains elements equal to the pivot. The last one contains elements greater than the pivot. Then you need to run quick sort on the less and greater lists, until everything has been sorted.

![A hand-drawn demonstration of quick sort](/engineering-education/sorting-algorithms/quick.jpg)<br>
[Here's a video of a robot doing it](https://www.youtube.com/watch?v=es2T6KY45cA)

The complexity of quick sort is complicated. Usually, it's `O(nlogn)`, but it can take longer if the pivot chosen is close to one extreme of the list. The worst-case scenario is `O(n^2)`.

There are [many ways to choose a pivot](https://stackoverflow.com/questions/164163/quicksort-choosing-the-pivot/) (some of which may or may not take longer than the sort itself). If the list is already sorted, then it will take a while to sort a list if you assign the first element as the pivot. It's still very fast, but you might not want to use this particular approach for user input.

### Counting Sort
[Counting sort](https://github.com/botahamec/sorting_algos/blob/master/python/counting_sort.py) is amazing. You can use either a HashMap or a List. You need to count how many of each number appear in the list. Then, just go through each number and put that many in the list.

![A hand-drawn demonstration of counting sort](/engineering-education/sorting-algorithms/counting.jpg)<br>
***Note:*** *Counting sort typically uses a different algorithm, [described here](https://www.youtube.com/watch?v=TTnvXY82dtM). It works better if you're using things that aren't numbers. It's also good when you have a lot of unused values in your range.*

Counting sort is the closest thing to an `O(n)` sorting algorithm we'll see. The complexity is `O(N+R)`. `N` is the number of elements in the list. `R` is the difference between the largest and smallest elements in the list. If the value of `R` is very big, then it can take a while to sort. It works very well if you have a lot of the same value and the range isn't too large.

### Conclusion
These are some of the most popular sorting methods. Of course, there are [many more](https://en.wikipedia.org/wiki/Sorting_algorithm). Hopefully, one of these should be fast enough to use for your application. There's a [GitHub repository](https://github.com/botahamec/sorting_algos) that benchmarks all of the algorithms in this article. There are also implementations in Python for your reference.
