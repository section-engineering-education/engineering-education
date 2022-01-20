---
layout: engineering-education
status: publish
published: true
url: /lru-cache-implementation-in-javascript/
title: Implementing LRU Cache in JavaScript
description: This article will discuss how to implement LRU Cache in JavaScript. We will be using a double linked list to keep track of the most recently used items.
author: erick-wekesa
date: 2021-10-04T00:00:00-15:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/lru-cache-implementation-in-javascript/hero.jpg
   alt: Cache LRU JavaScript Image
---
The cache holds data in RAM. This makes the retrieval of data much faster than typical databases where data is stored on a disk. RAM has less space compared to the disk.
<!--more-->
Therefore, caching algorithms, such as Least Recently Used (LRU) can help invalidate entries that have not been used recently in the RAM.

### Key takeaways
At the end of this article you will be able to understand:
1. What is LRU cache.
2. Data structures used to build an efficient LRU cache algorithm.
3. Implementing LRU cache algorithm using JavaScript.

#### Prerequisite
To be able to follow this article well, one needs:

1. To have [Visual Studio Code](https://code.visualstudio.com/) installed.
2. Have a [LeetCode](https://leetcode.com/) account.
3. Some understanding of linked list data structure and hash tables. 
  - [Hash Table](https://www.tutorialspoint.com/data_structures_algorithms/hash_data_structure.htm)
  - [Linked List Data Structure](https://www.geeksforgeeks.org/data-structures/linked-list/)

### What is LRU Cache?
Let's first start by understanding what is Cache.

The cache is a storage that stores computation so that the lookup of data later becomes faster. It doesn't only stores computation data, but redundant data as well. It is therefore a short-term storage memory.

LRU stands for Least Recently Used. It is a cache eviction policy that allows one to identify which item in the cache hasn't been used for a long time.

For example, let's say we have a cache of that has 4 slots for its size and we have 4 items: `[red, green, white, blue]` in the cache. We want to add another item: `black`. 

We will add `black` at the beginning of the cache. So now we have `[black, red, green, white, blue]`. What this shows, is the temporal order of access to items.

The most recent item is `black`, followed by `red, green, white` and finally `blue`. When we want to initially add `black` to our cache, we find that our cache of size four does not have the space needed to add `black`, since the cache is already full.

Before adding `black` to the cache, we need to evict an item first. This is where our LRU eviction policy comes to play.

What is our least recently used item? In our case, it's `blue`, since it is the item at the tail of our list. We thus, need to remove `blue` from our cache and then add `black`. Our new cache order will be `[black, red, green, white]`.

Another operation that can be performed on LRU is searching. Using our initial example, let us access the third item: `red`, from our cache.

We first search to check whether `red` is available. Since it is available, it becomes the most recently accessed item. This means that we will have to shift `red` to the front of our cache or list. Our new cache order will be `[red, black, green, white]`.

With LRU, we notice that when we access an item, it shifts to the front of the list. Thus, when we want to remove an item, we pick the least recently used item: the one at the end of the list, and remove it from our cache.

### Data structures used to build an efficient LRU cache algorithm
From the example above, we have performed many operations while building the LRU cache. 

These operations include:

#### 1. Searching
When we want to get the color `red` from our list, first, we need to check our entire list to check whether the item is there.

If the element is present, we reorder the list and move `red` to the beginning of the list. In this case, the time complexity for the re-ordering will be `O(n)`.

Time complexity is the amount of time a block of code takes to execute. I recommend the reader to go over [this time complexity](https://www.mygreatlearning.com/blog/why-is-time-complexity-essential/) article, to learn about time complexity.

#### 2. Adding items
When adding an item to the list, the time complexity of the operation is O(n).

We can optimize the shifting operation by eliminating it. To do so we use a double liked list.

Still using the example `[red, green, white, blue]` we needed to add `black`. Since it wasn't in our list, we removed the oldest element `blue`, and shifted the entire list of items.

In a double-linked list, all you need to do is to remove the rear item and update the rear element to point to the previous element. Then add a new node and make it point to the second element and update the front. The entire operation takes 0(1) time complexity.

This will be clearly seen in the code example below.

We can also optimize searching.

Searching can be optimized by using a hash table. With a hash, you will have a key and a value pair. The key in this case will be the actual values in our cache. The value will be the address of our value as shown in the diagram below.

![Hash Table & Double Linked List Diagram](/engineering-education/lru-cache-implementation-in-javascript/ddl_hash.png)

To add `black` to our list, by using a double-linked list, we will remove the rear element `blue` from our list. `Blue` in this case is our least recently accessed item. Then, update the rear element to point to the previous element `white`.

In our hash table, we will remove the value (address) that is associated with our key `blue`. Therefore, the value for our key `blue` will be `null` in the hashtable. 

A new node is created where we put `black`. The previous front gets updated to point to the node that has `black`. `Black` will also have an address associated with it as well.

The shifting, in this case, is done in 0(1) time complexity.

Before adding `black`, we need to search first and see if it is available in the cache. To search for black in an optimal way, we go to the hash table. 

In the hash table, key `black` will not have a corresponding value attached to it. This means that it is not present in our cache. This allows us to find out whether an item is in the cache with just O(1) time complexity.

### Implementing LRU Cache in JavaScript
- Visit [LeetCode](https://leetcode.com/) and sign in to your account.
- Visit the [LRU cache](https://leetcode.com/problems/lru-cache/) problem page and go through the problem statement.

We will use the steps below to implement the LRU cache class.
- Open visual studio code, and create a new file.
- Add the code blocks below to the new file.

#### 1. Initializing the LRU
We first initialize the LRU cache with a positive capacity.

```javascript
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map(); // this stores the entire array

  // this is boundaries for double linked list
  this.head = {};
  this.tail = {};

  this.head.next = this.tail; // initialize your double linked list
  this.tail.prev = this.head;
};
```

#### 2. Get operation
This operation will return the value of the key, if it exists, otherwise, it will return -1.

```javascript
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    // remove elem from current position
    let c = this.map.get(key);
    c.prev.next = c.next;
    c.next.prev = c.prev;

    this.tail.prev.next = c; // insert it after last element. Element before tail
    c.prev = this.tail.prev; // update c.prev and next pointer
    c.next = this.tail;
    this.tail.prev = c; // update last element as tail

    return c.value;
  } else {
    return -1; // element does not exist
  }
};
```

#### 3. Put operation
This operation will update the key value. 

If found, add the `key` and the value pair to the cache. If the number of keys has exceeded the initialized capacity of the cache, evict the least recently accessed item.

```javascript
LRUCache.prototype.put = function (key, value) {
  if (this.get(key) !== -1) {
    // if key does not exist, update last element value
    this.tail.prev.value = value;
  } else {
    // check if map size is at capacity
    if (this.map.size === this.capacity) {
      //delete item both from map and DLL
      this.map.delete(this.head.next.key); // delete first element of list
      this.head.next = this.head.next.next; // update first element as next element
      this.head.next.prev = this.head;
    }

    let newNode = {
      value,
      key,
    }; // each node is a hashtable that stores key and value

    // when adding a new node, we need to update both map and DLL
    this.map.set(key, newNode); // add current node to map
    this.tail.prev.next = newNode; // add node to end of the list
    newNode.prev = this.tail.prev; // update prev and next pointers of newNode
    newNode.next = this.tail;
    this.tail.prev = newNode; // update last element
  }
};
```

Go to `File --> Save As` and save the file as `lru.js`.

Using the example below, we are going to use this to help us execute the cache class.

```js
["LRUCache", "put", "put", "get", "put", "get"]

[[2], ['red', 'red'], ['grey', 'grey'], ['red'], ['yellow', 'yellow']]
```

Add the code block below after the `put` function.

```javascript
var lRUCache = new LRUCache(2); // capacicity of cache is 2.
lRUCache.put("red", "red"); //cache has {red=red}
lRUCache.put("grey", "grey"); //cache has {red=red, grey=grey}

var param_1 = lRUCache.get("red"); // get's red from the cache
console.log(param_1); // prints the result of the get
lRUCache.put("yellow", "yellow"); // LRU key was grey, evicts key grey, cache has {red=red, yellow=yellow}

var param_2 = lRUCache.get("grey");
console.log(param_2 + " Not found"); // returns -1 (not found)
```

- Go to `Run --> Start Debugging` and click `Start Debugging`.
- Select `Node.js` as the environment.
- Something like this will be displayed on the debug console tab.

![Output](/engineering-education/lru-cache-implementation-in-javascript/result.PNG)

### Conclusion
The best data structure to use when implementing LRU cache is a double-linked list and a hash table. The time complexity for this implementation is O(1). 

You can go ahead and try it out on your own as well.

Happy coding! :-)

### References
- [LRU Cache - LeetCode](https://leetcode.com/problems/lru-cache/)
- [Hash Table](https://www.tutorialspoint.com/data_structures_algorithms/hash_data_structure.htm)
- [Linked List Data Structure](https://www.geeksforgeeks.org/data-structures/linked-list/)

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
