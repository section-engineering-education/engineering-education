---
layout: engineering-education
status: publish
published: true
url: /hash-tables-in-javascript/
title: Hash Tables in JavaScript
description: This article will go through creating and implementing hash tables in JavaScript. Hash tables are powerful data structures in the field of computing. They enable developers to find data quickly using keys.
author: judy-nduati
date: 2021-04-13T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/hash-tables-in-javascript/hero.jpg
    alt: Hash Tables image example
---
Hash tables are powerful data structures in the field of computing. Data structures and algorithms are known for solving problems effectively. Hash tables access components in constant time (O(1)). Hash tables enable us to find data quickly using keys. 
<!--more-->
In this article we will learn what hash tables are, how they work, their use, and how to implement them in JavaScript.
### Table of contents
- [Hash tables overview](#hash-tables-overview)
- [How hash tables work](#how-hash-tables-work)
- [Handling collisions](#handling-collisions)
- [Implementing hash tables in JavaScript](#implementing-hash-tables-in-javascript])

### Prerequisites
In the world of data structures and algorithms, hash tables are common. Ii is therefore recommended that the reader have a basic understanding of data structures, JavaScript objects, and arrays.

### Hash tables overview
Hash tables are data structures that pair keys to values. A hash table is also known as an unordered map, dictionaries, or hash map. It implements associative arrays for key-value pairs. This takes place by converting keys and values into indexes of an array.

A hash table provides insertion, deletion, and retrieval operations efficiently. The hash function (hash algorithm) takes a key (string) and transforms it into a number. It then remaps that number into an index in an array. Different words are mapped to different numbers by a hash function.

A hash function is irreversible. It is a one-way algorithm. You shouldn't be able to take the result of a hash function, feed it through another function and get the original data back.

A hash table is also deterministic. Feeding the key through the hash function repeatedly gives the same result.

A hash table gives you a way of associating a key with a value. For example, each student is assigned a unique number (registration number) in a school. 

A registration number retrieves student's details. A hash table is a perfect solution for this problem. As this allows you to get the response immediately.

Programming languages use hash tables under distinct names.
- Java: Hash Map
- Python: Dictionaries
- JavaScript: Object and Map

Both objects and maps are hash tables in JavaScript.

Hash tables implement the map and objects data structure. This article will talk more about hash tables in JavaScript.

Hash tables implement associative arrays, a system that maps keys into values. Unlike many programming languages, JavaScript doesn't support associative arrays (arrays with named indexes). 

In JavaScript, arrays use numbered indexes.

### How hash tables work
Hash tables use arrays to store data or records. The numerical value from the hash function is used as an index to store data. Data is stored in buckets using numbers.

To understand how hash tables work, let's go through an imaginary problem.

Assume we have a library with different books. You have to know the book you need by the book title. It's also challenging to locate the right shelf where the book is. A hash table would help to solve this problem.

Each book has a unique number (bk id). Our key is book id, and our value is the book title. We pass the key and value pair to our hash table. It runs the key through a hash function, and the hash function returns an index (e.g. 3).

The hash function stores the key and value pair in the index. If we want to get a specific book, we pass the book id to the hash table. A hash function maps the key to the index, and information about the book is retrieved.

The hash table's average time complexity is O(1) or constant time for insert, retrieve, and delete. Thus, a hash table is fast, unlike using arrays to get specific information. 

Arrays iterate over items in the bucket to find the key you are looking for with O(n) speed.

Hash tables are widely used in:
- Database indexing.
- Program compilation for keyword identification.
- Caching.
- Associative arrays.
- Unique data representation.

The performance of a hash table depends on three essential components:
- Hash function.
- Size of a hash table.
- Collision handling method.

### Handling collisions
Collisions occur when different keys get hashed to the same number or index.

How can we resolve this issue? There are many methods of handling collisions. We will learn a few below.

#### Separate chaining
[Separate chaining](https://study.com/academy/lesson/separate-chaining-concept-advantages-disadvantages.html#:~:text=To%20handle%20collisions%2C%20the%20hash,collisions%20in%20different%20table%20locations.) is a method which key-value pairs hash to the same index in the bucket array. A linked list is created for that particular index.

In this strategy, you have to iterate between the pairs to find the key you are looking for. Separate chaining leads to inefficiency. It brings the time complexity closer to O(n). Meaning it depends linearly on the size of the input.

![Separate Chaining](/engineering-education/hash-tables-in-javascript/separate-chaining.jpg)

[Image source](https://www.geeksforgeeks.org/implementing-our-own-hash-table-with-separate-chaining-in-java/)

#### Linear probing
In [linear probing](https://en.wikipedia.org/wiki/Linear_probing#:~:text=Linear%20probing%20is%20a%20scheme,by%20Gene%20Amdahl%2C%20Elaine%20M.), you add one element and move to the next position if the hashed index is available.

![Linear Probing](/engineering-education/hash-tables-in-javascript/linear-probing.jpg)

[Image source](http://www.cs.emory.edu/~cheung/Courses/253/Syllabus/Map/open-addr.html)

#### Rehashing
[Rehashing](https://learningsolo.com/what-is-rehashing-and-load-factor-in-hashmap/#:~:text=Rehashing%20is%20the%20process%20of,reaches%20the%20maximum%20threshold%20value.) is re-calculating the hash value of the stored key-value pairs. Then moving them to a bigger hash map when the threshold is reached.

### Implementing hash tables in JavaScript
In JavaScript, hash tables implement objects. 

To implement a hash table in JavaScript, we will:
- Create a class hash table.
- Add a hash function.
- Implement on inserting, retrieving, and deleting key/value pairs.

#### JavaScript hash table
First, let's create a `class HashTable.`

The class hash table has two properties, `buckets` and `size.`

```js
class HashTable{
  constructor(size=50){
    this.buckets =  new Array(size)
    this.size = size
  }
}
```

#### Hash function
The next step will be adding a hash function.

```js
  hash(key){
    return key.toString().length % this.size;
  }
```

#### Insert
The insert method adds key/value pairs in the hash table. To get started, create a method called `setItem` with two arguments, `key` and `value.` Hash the key with a hash function. 

Then push the key/value pairs into the bucket. We will store our data in buckets.

```js
setItem(key,value){
    let index = this.hash(key);

    if(!this.buckets[index]){
      this.buckets[index] = [];
    }

    this.buckets[index].push([key,value])
    return index
}
```

#### Retrieve
The retrieve method helps us fetch the data using a key. Create method `getItem` with one argument, `key`. Hash the key and get the bucket's index. 

Retrieving or searching data in a hash table take place very fast. We can quickly get the index.

```js
getItem(key){
    let index = this.hash(key);
  
     if(!this.buckets[index])return null
     
        for(let bucket of this.buckets[index]){
             // key
          if(bucket [0] === key){
             // value
            return bucket [1]
           }
        }
}
```

This is our complete code for our hash table implementation. JavaScript objects are applied in hash tables. 

```js
class HashTable{
  constructor(size=50){
    this.buckets =  new Array(size)
    this.size = size
  }

  hash(key){
    return key.toString().length % this.size;
  }
  
  // Insert data
  setItem(key,value){
    let index = this.hash(key);
    
    if(!this.buckets[index]){
      this.buckets[index] = [];
    }
    
    this.buckets[index].push([key,value])
    return index
  }

  // Search data
  getItem(key){
    let index = this.hash(key);
  
     if(!this.buckets[index])return null
     
        for(let bucket of this.buckets[index]){
             // key
          if(bucket [0] === key){
             // value
            return bucket [1]
           }
        }
  }
}

const hashTable = new HashTable();
// Insert data to the hash table
hashTable.setItem("bk101","Data structures algorithms");
hashTable.setItem("bk108","Data analytics");
hashTable.setItem("bk200","Cyber security");
hashTable.setItem("bk259","Business Intelligence");
hashTable.setItem("bk330","S/W Development");

// Search data from the hash table 
hashTable.getItem("bk101");
console.log(hashTable.getItem("bk101"));
```

The code insert's data in the hash table and uses the key (book id) to retrieve a book's title. The code works as shown in the video below.

<iframe width="478" height="269" src="https://www.youtube.com/embed/giFgWX-N0Mk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Wrapping up
We learned that hash tables are data structures that store data using key-value pairs. We also learned that hash tables are widely used because they are fast and efficient.

To summarize:
- You learned what hash tables are.
- How hash tables work.
- You also learned how to implement hash tables in JavaScript.

I hope this article will shed light on hash tables in JavaScript.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)