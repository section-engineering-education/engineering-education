In-memory caches such as Memcached and Redis are key-value stores between your application and your data storage. Since the data is held in RAM, it is much faster than typical databases where data is stored on a disk. RAM is more limited than disk. Cache invalidation algorithms such as least recently used (LRU) can help invalidate 'cold' entries and keep 'hot' data in RAM.

###Key takeaways:

At the end of this article the learner will be able to:

1. Understand what LRU cache is.
2. Data structures used to build an efficient LRU cache algorithm.
3. Implement LRU cache using JavaScript.

### What is LRU Cache?

Let's first start by understanding what a Cache is. A cache is something that stores computation so that the lookup of data later becomes faster. It not only stores computation data. The cache can store redundant data as well. Thus we have quick access to data instead of reaching out for the data from the database. With items stored in a Cache, future access to whatever is being requested is super fast.

LRU stands for Least Recently Used. It is a Cache eviction policy. LRU allows one to identify which item in the cache hasn't been used for a long time. For example,

Say we have a cache of size 4 and we have items 1,2,3,4 in the cache. We want to add another item Let's say 8. We add the 8 to the front of the cache. So we have 8,1,2,3,4. What this shows is the temporal order of access to items. The most recent item is 8 then followed by 1, followed by 2, then 3, and finally 4. With these items, we find that our cache of size four does not have space to even add the 8. Before adding item 8 to the cache, we need to evict an item first. This is where our LRU(Least Recently Used) eviction policy comes to play. What is our Least Recently Used item? Our Least Recently used Item in our case is 4. We thus, need to remove 4 from our cache. Our new cache order will be 8,1,2,3.

Before adding or removing an item from the LRU cache, one needs to find first if an item already exists. Using our initial example, let us access the third item from our cache i.e. 2. We first do a search to see whether 2 is available. Yes, it is available. This means that we will have to shift item 2 to the front of our Cache or list. Our new cache order will be 2,8,1,3. 2 becomes the Most Recently Accessed item. With this, we notice that when we want to access an item, it shifts to the front of the list. So, when we want to remove an item, we pick the one that is at the end of the list and remove it from our cache. The item at the end of our list is usually the Least Recently Used item.

### Data Structures Used to Build An Efficient LRU Cache Algorithm.

From the example above, we performed many operations while building the LRU cache. These operations include

1. Searching:- We want to get item 2 from our list. First, we need to check on our entire list to find whether it is there or not. If the element is present, then we have to reorder the list. We move 2 to the beginning of the list. In this case, the time complexity for re-ordering will be O(n).
2. Let's say we have a scenario where we need to add e.g. 8 into our list. Our list, in this case, is still 1,2,3,4. Searching through the list, we can't find an 8. The next thing we need to do since our cache size is 4, we remove 4 from the list. Once that is done, we then shift 1,2, and 3 to the left. We are now left with an empty slot at the beginning of the list to add the 8. The time complexity for doing the shifting is O(n).

We can make optimize the shifting by eliminating it. To do so we use a double liked list. Why?

Still using the example 1,2,3,4. We needed to add 8. Since it wasn't in our list, what we did was remove the oldest element 4 and shift the entire list items. In a doubly-linked list, all you need to do is to remove the rear and update the rear element to the previous element. Then add a new node and make it point to the second element and update the front. The entire operation is 0(1) time complexity.

We can also optimize searching. How?

Still using our previous example of cache size 4, with 1,2,3,4. searching for 8. We can optimize our search by using a hash table. With a Hash, you will have a key and a value pair. The Key in this case will be the actual values in our cache. The value will be the address of our value as shown in the diagram below.

[Hash Table & Double Linked List Diagram](https://leetcode.com/problems/ddl_hash.png/)

To add 8 to our list, we will remove the rear element 4 in our list, update the rear element to point to the previous element 3. In our hash table, we will remove the value(address) that is associated with our key 4. A new node will is created where we put the 8. The previous front gets updated to point to the node that has 8. The 8 will also have an address associated with it. The shifting, in this case, is done in 0(1).
To search for the 8, we go to the hash table. In the Hash table, key 8 will not have a corresponding value attached to it. This means that it is not present in our Cache. This allows us to find out whether an item is in the Cache with just O(1) time.

The best data structure to use when implementing LRU cache is Double Linked List and Hash Table. The time complexity for this implementation is O(1).

### Implementing LRU Cache in JavaScript.

[List Recently Used Cache](https://leetcode.com/problems/lru-cache/)

By visiting the above link, there is a leetecode question to help us in the implementation of the LRU Cache.

The below is a code implementation of the same.

![Initialize](/lru-cache-implemention/lruinitialize.png)
![Get](/lru-cache-implemention/lruget.png)
![Put](/lru-cache-implemention/lruget.png)

### Conclusion

To implement an efficient LRU cache algorithm, a hash table and a doubly-linked list are the best options. You can go ahead and try it out on your own as well.

Happy Coding! :-)

### References

https://leetcode.com/problems/lru-cache/
