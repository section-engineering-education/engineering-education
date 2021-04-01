---
layout: engineering-education
status: publish
published: true
url: /engineering-education/bloom-filters-data-structure/
title: Bloom Filters - An Introduction
description: Covering the basics of hashing, bloom filters, and the applications of this data structure. Hashing was developed to optimally store and retrieve data.
author: lalithnarayan-c
date: 2020-09-10T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/bloom-filters-data-structure/hero.jpg
    alt: Bloom Filters data structure
---
Bloom filters are a probabilistic data structure that uses the concept of hashing extensively. It was designed to solve the problem of finding an element in a set, while keeping in mind high efficiency, memory, and time. In this article, we will be covering the basics of hashing, bloom filters, and the applications of this data structure.
<!--more-->
### Hashing
[Hashing](https://www.educative.io/edpresso/what-is-hashing) is a data structure designed to store and retrieve information in the most efficient manner. It is useful in performing optimal searches and is predominantly used in the construction of symbol tables.

Let us dive deeper into the concept of hashing by considering the following problem. This problem has been taken from [HackerRank](https://www.hackerrank.com/challenges/sock-merchant/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup) to help us understand the need for hashing.

The problem states that there are `n` number of socks available, and an array is given with numbers representing each sock. We need to find number of pairs of socks a person can wear, that is, are in multiples of 2. For example, if n=7 and the array is [1,1,1,1,1,1,1], then number of pairs is 3.

![](/engineering-education/bloom-filters-data-structure/hashingProblem.jpg)
[*Image Source*](https://www.hackerrank.com/challenges/sock-merchant/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup)

A solution that may come to mind is an O(n^2) solution. Using two for loops: the outer loop keeping track of the current element, and the inner loop keeping track of the count of the current element. This is a solution, but its time complexity is O(n^2). That needs to be improved.

What if, we could track the number of occurrences of each type of sock, and then find out how many pairs of socks exist. This is an application of the hash table, which uses the concept of hashing.

The creation of the table requires us to parse through the entire array once, which makes it O(n). To check for the viable number of pairs of socks, we need another for loop traversing the dictionary and checking for the number of pairs. The time complexity for this is O(n). The overall time complexity is represented in this equation O(n) + O(n) = O(2n) => O(n). The time complexity represents the amount of time the program execution takes with an increase in program size `n`. Instead of being hardware specific, we are being computation specific. The size of the input array gives an idea of the time complexity. If time complexity is O(n^2), then as the size of n increases, the time taken to compute the problem increases quadratically.

There is a significant reduction in time complexity by making use of memory. We have taken a top-down approach, considering the application first. Let us look at the theoretical aspect of hashing and how bloom filters make use of them.

### Hashing: Theory
Hashing, as we discussed earlier, was developed to optimally store and retrieve data. Listed below are various operations that can be performed on the hash table Abstract Data Type(ADT).

1. Create Hash Table
2. Search Hash Table
3. Insert an element into the table
4. Delete an element from the table
5. Delete the hash table

### Hash Table
The [hash table](https://en.wikipedia.org/wiki/Hash_table) is derived from the array. In the case of an array, we have indices that start from either 0 or 1. These indices are the keys and the value stored at these places are the values. Similarly, hash tables work on key-value pairs, where our keys are custom-defined. For example, [dictionaries in python](https://en.wikipedia.org/wiki/Hash_table#In_programming_languages) are a used for implementing hash tables. We can get the elements by calling them with their respective indexes. This is called direct addressing.

Direct addressing is feasible in situations when memory is not a constraint. What if we need extra memory? That is, the number of keys is greater than the number of memory locations possible. In such cases, the flexibility of hash tables can be used.

### Hash Function
The value is allotted to keys based on the [hash function](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Hashing/hashing.html). The hash function can be any function. The only requirement is it allows a new and unique key for different values. If two values get the same key, such a situation is called a collision.
The hash function is used to transform the key into the index. Obtaining such ideal hash functions is a tough job.

### Characteristics of Good Hash Functions
An ideal hash function obeys the following properties:

- Minimal number of collisions
- Not computationally intensive
- Uniform distribution of keys for various values
- Maximum usage of the information present in the values

Let us discuss some of the strategies that complement hash functions and deal with collisions.

#### Separate Chaining
We use the concept of linked lists to resolve collisions. Upon collision for a given key, the new value is linked to the existing value at the location using linked lists. The process of adding elements using a linked list is similar to a chain. Hence, the name [separate chaining](https://courses.cs.washington.edu/courses/cse326/06su/lectures/lecture11.pdf). This method is easy to implement but is memory intensive. Each link adds on a new pointer and therefore additional memory space is required. While using the hash table, if the length of the linked list is too long, then the lookup time increases to O(n) from O(1). This defeats the purpose of implementing a hash table.

#### Open Addressing
[Open addressing](https://courses.csail.mit.edu/6.006/fall11/lectures/lecture10.pdf) is one such technique which stores all the keys in the hash table, rather than extending values via other data structures. The collision is resolved using a process called probing. If a collision occurs, then the next nearest empty location is filled with the value. Such an algorithm is called [linear probing](https://en.wikipedia.org/wiki/Linear_probing#:~:text=Linear%20probing%20is%20a%20scheme,by%20Gene%20Amdahl%2C%20Elaine%20M.). The disadvantage of linear probing is it causes clustering of values if the number of collisions increases.

A more preferred method is to space the values in the memory location. Thus, the problem of clustering is solved offering all the advantages of optimal hash functions. This type of probing is called [quadratic probing](https://en.wikipedia.org/wiki/Quadratic_probing). Upon each collision, the memory location selected is farther away from the original key that resulted in the collision.

### Bloom Filters: Introduction
Bloom filters are an exciting application of the hash tables. They are used to check for membership of elements in a set. You may be wondering, why is membership of any significance to a programmer. Let's consider the example of matching two strings. You may have guessed that checking for passwords from a database is one such use case scenario. The passwords are encrypted and then stored in the database for security reasons. The hashed values are very long strings, usually 70+ characters. In such cases, when two strings need to be compared character by character, string matching algorithms take O(n). Bloom filter, on the other hand, takes O(1) to accomplish the same task.

Additionally, what is the advantage of using a bloom filter? Bloom filters reduce the number of calls made to resources such as servers and databases, by quickly eliminating inputs that don't match with the actual value. Let's understand this in a bit more detail, by looking at how bloom filters use hashing.

### Explanation
Designed by Burton Bloom in the year [1970](https://en.wikipedia.org/wiki/Bloom_filter), a Bloom Filter uses a multiple number of hash functions. The bloom filters start with an array, whose bits are initialized to zero. The input is then passed through m number of hash functions. Let the size of the array be n. The number of hash functions, m, is less than the size of the array, n. When the m different hash functions are applied to the value, we get m different values. All these values are set as the bit 1 in the array.

To check for the membership of a new input value, the bloom filter first passes the new value through m different hash functions. Comparing the original array with the new array gives us an idea of whether the entered input is wrong or not. The combination of m different hash function reduces the probability of the same array pattern appearing for two different strings. Therefore, we can catch all strings that don't match with the original input. Thus, true negatives are eliminated.

![](/engineering-education/bloom-filters-data-structure/membership.jpg)

[*Image Source*](https://yourbasic.org/)

In the example above, we store the hashed bit arrays of x, y, and z. We see that hashed array of w does not match either x, y, or z and therefore does not belong to the set.

You may be wondering about the aspect of probability in this data structure. The data structure is affirming that a given input does not belong to the database, but it cannot guarantee the membership of an element in a set. In a case where the array is empty, that is, the majority of the bits are zero and the hash functions possess the above characteristics, then the probability of letting in an element that is not a member of the set is very low.

The probability of error fills up as the bit array gets filled up. As the name suggests, bloom filters filter out the majority of true negatives and therefore enable the design of efficient systems.  

### Applications of Bloom Filters
There are several interesting use cases for bloom filters. We will look at two of them. One of which we have looked at earlier. Yes, you guessed it right, Authentication and Authorization. The other use is one-hit (search) wonders.

1. Authentication and Authorization: Bloom filters can check for passwords and reject all of the wrong passwords entered, thus reducing the load on the main database servers. Authorization is the process of giving access to users of a website based on the level of authority a user possesses. The admin can access the entire website and make changes, whereas a common user can view the website in read-only mode. Therefore using bloom filters in websites like large e-commerce sites is a viable solution to prevent access from non-authorized entries.

2. One-search wonders: Search engines keep track of the search phrases and ensure not to cache the phrases until they are searched for repetitively. We can do a little experiment to check this out. Open your incognito tab and go to any search engine you'd like. Type a query related to Python, for example, "lists in python". The next time you type lists, it will still show results that are not specific to Python. A couple of searches related to Python will lead to all search results being directed towards Python. After a couple of searches, you will observe that just typing dictionary will lead you to dictionaries in Python. Search engines keep track of the URLs and enable caching of the URLs upon multiple accesses.

### Conclusion
We have looked at hashing extensively and have considered the bloom-filter data structure which elegantly rejects elements that don't belong to a set. Furthermore, we have looked at the applications of bloom filters and a couple of case scenarios. We hope you enjoyed reading this. Until next time. Be Legendary.

### Additional Resources
1. [Leetcode interactive tutorial](https://leetcode.com/explore/learn/card/hash-table/)
2. [Hash Tables: Ransom Note](https://www.hackerrank.com/challenges/ctci-ransom-note/problem)
