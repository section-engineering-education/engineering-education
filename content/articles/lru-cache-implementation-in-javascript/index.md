The cache holds data in RAM. This makes the retrieval of data much faster than typical databases where data is stored on a disk. Ram has less space as compared to disk. This is where Cache algorithms such as least recently used (LRU) can help invalidate entries in RAM that have not been used recently. It can also invalidate entries in RAM that have been frequently used.

### Key takeaways:

At the end of this article the learner will be able to:

1. Understand what LRU cache is.
2. Data structures used to build an efficient LRU cache algorithm.
3. Implement LRU cache using JavaScript.

### What is LRU Cache?

Let's first start by understanding what a Cache is. A cache is something that stores computation so that the lookup of data later becomes faster. It not only stores computation data. The cache can store redundant data as well. It is therefore a short-term storage memory. Data, especially redundant ones are stored here for quick access.

LRU stands for Least Recently Used. It is a Cache eviction policy. LRU allows one to identify which item in the cache hasn't been used for a long time. For example,

Say we have a cache of size 4 and we have items 1,2,3,4 in the cache. We want to add another item 8. We add the 8 to the front of the cache. So we have 8,1,2,3,4. What this shows is the temporal order of access to items. The most recent item is 8 then followed by 1, followed by 2, then 3, and finally 4. When we want to add 8 to our cache, we find that our cache of size four does not have space to even add the 8. It already has four items. hence full. Before adding item 8 to the cache, we need to evict an item first. This is where our LRU(Least Recently Used) eviction policy comes to play. What is our Least Recently Used item? Our Least Recently used Item in our case is 4. It is the item at the tail of our list. We thus, need to remove 4 from our cache. We then add the 8. Our new cache order will be 8,1,2,3.

Another operation that can be performed on LRU is searching. Using our initial example, let us access the third item from our cache i.e. 2. We first do a search to see whether 2 is available. Yes, it is available. Since it is available, it becomes the most recently accessed item. This means that we will have to shift item 2 to the front of our Cache or list. Our new cache order will be 2,8,1,3. 2 becomes the Most Recently Accessed item. With this, we notice that when we want to access an item, it shifts to the front of the list. So, when we want to remove an item, we pick the one that is at the end of the list and remove it from our cache. The item at the end of our list is usually the Least Recently Used item.

### Data Structures Used to Build An Efficient LRU Cache Algorithm.

From the example above, we performed many operations while building the LRU cache. These operations include

1. Searching:- We want to get item 2 from our list. First, we need to check on our entire list to find whether it is there or not. If the element is present, then we have to reorder the list. We move 2 to the beginning of the list. In this case, the time complexity for re-ordering will be O(n).
2. Let's say we have a scenario where we need to add e.g. 8 into our list. Our list, in this case, is still 1,2,3,4. Searching through the list, we can't find an 8. The next thing we need to do since our cache size is 4, we remove 4 from the list. Why remove 4? Because it is the least accessed item. Once that is done, we then shift 1,2, and 3 to the left. We are now left with an empty slot at the beginning of the list to add the 8. The time complexity for doing the shifting is O(n).

We can optimize the shifting operation by eliminating it. To do so we use a double liked list. How?

Still using the example 1,2,3,4. We needed to add 8. Since it wasn't in our list, what we did was remove the oldest element 4 and shift the entire list items. In a doubly-linked list, all you need to do is to remove the rear item and update the rear element to the previous element. Then add a new node and make it point to the second element and update the front. The entire operation is 0(1) time complexity. This will be clearly seen in the code example below.

We can also optimize searching. How?

Still using our previous example of cache size 4, with 1,2,3,4. searching for 8. We can optimize our search by using a hash table. With a Hash, you will have a key and a value pair. The Key in this case will be the actual values in our cache. The value will be the address of our value as shown in the diagram below.

[Hash Table & Double Linked List Diagram](/ddl_hash.png/)

To add 8 to our list, we will remove the rear element 4 in our list. 4 in this case is our Least recently accessed item. Update the rear element to point to the previous element 3. In our hash table, we will remove the value(address) that is associated with our key 4. Therefore, the value for our key 4 will be null. A new node will is created where we put the 8. The previous front gets updated to point to the node that has 8. The 8 will also have an address associated with it as well.

The shifting, in this case, is done in 0(1).

Before adding the 8, we need to search first and see if it is available in the cache. To search for the 8, we go to the hash table. In the Hash table, key 8 will not have a corresponding value attached to it. This means that it is not present in our Cache. This allows us to find out whether an item is in the Cache with just O(1) time.

### Implementing LRU Cache in JavaScript.

By visiting the below link, there is a leet code question to help us in the implementation of the LRU Cache. The code implementation below can guide us in the implementation.
[List Recently Used Cache](https://leetcode.com/problems/lru-cache/)

Below are the steps we will use to implement the LRU Cache class

1.  We first initialize the LRU cache with a positive capacity.

            ```js
            var LRUCache = function(capacity) {
                this.capacity = capacity;
            this.map = new Map(); //this stores the entire array

            //this is boundaries for double Linked List
            this.head = {};
            this.tail = {};
            this.head.next = this.tail; //initialize your double Linked List
            this.tail.prev = this.head;
            };

            ```

2.  Get operation. This will return the value of the Key if it exists. Else, it returns -1.

            ````js

            LRUCache.prototype.get = function(key) {
            if(this.map.has(key)){
            //remove elem from current position
            let c = this.map.get(key);
            c.prev.next = c.next;
            c.next.prev = c.prev;

            this.tail.prev.next = c; //insert it after last element. Element before tail
            c.prev = this.tail.prev; //update c.prev and next pointer
            c.next = this.tail;
            this.tail.prev = c; //update last element as tail
            return c.value;
            } else {
            return -1; //element does not exist
            }

            };

    ```

    ```

3.  Put operation. The put operation will update the value of the key if it is found. If found, add the Key and the value pair to the cache. If the number of keys has exceeded the initialized capacity of the cache, evict the least recently accessed item.

           ```js
           LRUCache.prototype.put = function(key, value) {

            if(this.get(key) !== -1){ //key does not exist, update last element value
            this.tail.prev.value = value;
            } else {
            //need to check if map size is at capacity
            if(this.map.size === this.capacity) {
            //delete item both from map and DLL
            this.map.delete(this.head.next.key); //delete first element of list
            this.head.next = this.head.next.next; //update first element as next element
            this.head.next.prev = this.head;
            }

            let newNode = {
            value,
            key
            }; //each node is a hashtable that stores key and value

            //When adding a new node, we need to update both map and DLL
            this.map.set(key, newNode); //add current node to map
            this.tail.prev.next = newNode; //add node to end of the list
            newNode.prev = this.tail.prev; //update prev and next pointers of newNode
            newNode.next = this.tail;
            this.tail.prev = newNode; //update last element
            }

            };
            ```

### Conclusion

The best data structure to use when implementing LRU cache is Double Linked List and Hash Table. The time complexity for this implementation is O(1). You can go ahead and try it out on your own as well.

Happy Coding! :-)

### References

https://leetcode.com/problems/lru-cache/

https://unsplash.com/photos/m_HRfLhgABo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
