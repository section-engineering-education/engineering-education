---
layout: engineering-education
status: publish
published: true
url: /hashtables-implementation-using-crc32-algorithm/
title: Hash Table implementation using CRC32 algorithm
description: In this article, we will learn how to create a hash table, go over the hashing process using a CRC32-algorithm, and implement essential hash functions. Our implementation will prove that hashing is an effective way to access data using a key-value pair easily.
author: jerim-kaura
date: 2021-02-12T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:
   
   - url: /engineering-education/hashtables-implementation-using-crc32-algorithm/hero.jpg
     alt: Hashtables implementation using CRC32 example image
---
Hash tables are the most convenient data structures that are easily accessible in most programming languages. It uses an associative array to store data and retrieve data. Each data value has its unique index. Instead of searching through the whole array, the index is used to access the required element directly. 
<!--more-->
It reduces the time taken for search operation irrespective of the data size. Given a key-value pair, the hash code of the key is computed and used as the index of the value stored in the table.
### Prerequisites
To get started, you will need to understand Python arrays, lists, and classes. You also need a code editor and a Python interpreter to run your code. 

We will be using visual studio code, which has an integrated terminal for running the code. You can also use PyCharm to do the same. One can find the working implementation [here](https://repl.it/@jerimkaura/Hash-Table#hashtable.py).

### 1. The HashTable class 
First, we will need to have all the Python modules that we will use in our environment. We will import `randint`, `Typevar`, `Callable`, and `List`. We then define our `HashTable` class with its data members.

```python
from random import randint
from typing import TypeVar, Callable,  List
from bisect import bisect_left
T = TypeVar('T')
class HashTable:
    def __init__(self):
        # Initial table size
        self.table_size: int = 23

        # initilizing all table slots to none
        self.table: List[(T, T)] = [None] * self.table_size

        # number of filled slots
        self.filled_count: int = 0

        # table resize threshold
        self.resize_threshold: float = 0.75

        # crc32 hash function
        self.hash_function: Callable = self.crc32_hash

        # crc32 table
        self.crc32_table: List[int] = self.crc32_table()

        # number of comparison
        self.key_comparison_counts: int = 0

        #random integer for use when the key is not a string
        self.a: int = randint(1, 2**32)

        # random integer for use in secondary hashing
        self.b: int = randint(1, 2**32)

    def __len__(self) -> int:
        """ Returns number of (key, value) pairs in table """
        return self.filled_count

    def __repr__(self) -> str:
        """ Returns HashTable's string representation
        ({key1: value1, key2: value2, ..., keyN: valueN})
        """

        r: str = "{" + ''.join([(f'\"{pair[0]}\"' if isinstance(pair[0], str) else str(pair[0])) + ': ' +
                                (f'\"{pair[1]}\"' if isinstance(
                                    pair[1], str) else str(pair[1])) + ', '
                                for pair in self.table if pair is not None])
        return r[:-2] + "}" if len(r) > 1 else "{}"

    def __setitem__(self, key: T, value: T) -> None:
        """ Allows `table[key] = value` instead of `table.update(key, value)` """
        self.update(key, value)

    def __getitem__(self, key: T) -> T:
        """ Allows `table[key]` instead of `table.lookup(key)` """
        return self.lookup(key)

    def __delitem__(self, key: T) -> None:
        """ Allows `del table[key]` instead of `table.delete(key)` """
        self.delete(key)
```

### 2. Class methods & hashing
We have successfully created the data members. We now proceed to write our class methods. This implementation is based on the following class methods.

**`load_factor()`:** This function is responsible for calculating the table's load factor. The load factor tells us the percentage of the table slots filled. The resize function should be called once the load factor reaches 75%. The load factor is obtained by dividing the number of filled slots by the table size.

```python
@property
    def load_factor(self) -> float:
        """ Calculate table's load factor """
        return self.filled_count / self.table_size
```

- **` encode()`:** Handles encoding of the key supplied to the hash function. Strings of arbitrary length are encoded using a [polynomial rolling hash scheme](https://cp-algorithms.com/string/string-hashing.html). The variables `p` and `m` must be positive numbers. `p` should be a prime number roughly equal to the number of characters in the input alphabet. 

For our case, the number of printable ASCII characters is 95; therefore, our `p` value is 97. On the other hand, `m` should be a huge prime number. We picked = `115561578124838522881`, which is the 20th prime number in the [Online Encyclopedia of Integer Sequences A118839 (OEIS)](https://oeis.org/A118839). The function returns an integer `hash value` of the key supplied.

```python
@staticmethod
    def encode(key: T) -> int:
        """
        Encoding the key (string or integer)
        Strings of arbitrary length are encoded using a polynomial rolling hash scheme
        """
        if isinstance(key, str):
            hash_value: int = 0
            # p should be a prime number roughly equal to the number of characters in the input alphabet.
            p: int = 97
            # We have 95 printable ASCII characters, so we use 95
            m: int = 115561578124838522881
            # this should be a huge prime number 20th in the OEIS A118839

            p_power: int = 1
            for character in key:
                hash_value = (hash_value + ord(character) * p_power) % m
                p_power = (p_power * p) % m
            return hash_value
        elif isinstance(key, int):
            return key
        else:
            raise Exception(
                f"Cannot encode {type(key)} (Only integers & strings supported)")
```

- **`crc32_table()`** Generates a table of values for use with the CRC32 hash method

```python
@staticmethod
    def crc32_table() -> List[int]:
        """Returns a table of values for use with the CRC32 hash"""
        table: List[int] = []
        for i in range(256):
            k: int = i
            for j in range(8):
                if k & 1:
                    k ^= 0x1db710640
                k >>= 1
            table.append(k)
        return table
```

- **`crc32_hash()`:** This the Hashing method. It hashes the key generated by the `encode () ` method. It uses the Least-Significant-Bit-first order, sets the initial CRC to FFFFFFFF<sub>16</sub>, and complements the final CRC. 

The CRC32 algorithm produces checksums that are so well distributed that we use it as a hashing function. Detailed information about the CR32 algorithm can be found [here](https://rosettacode.org/wiki/CRC-32#Python).

```python
def crc32_hash(self, key: T) -> int:
        # if the key is a string
        if isinstance(key, str):
            crc32: int = 0xffffffff
            # encode the characters as the function do not accept strings
            for k in key.encode('utf-8'):
                crc32 = (crc32 >> 8) ^ self.crc32_table[(crc32 & 0xff) ^ k]
            crc32 ^= 0xffffffff  # invert all bits
            return crc32 % self.table_size
        else:
            """ Returns a hash of key using h(k) = (a * key) mod m where m is a prime number """
            return (self.a * self.encode(key)) % self.table_size

```

- **`secondary_hash()`:** The secondary hash is used for linear probing when a collision is detected. We are using a random number `b` modulo the table size to find the double hashing interval index.

```python
def secondary_hash(self, key) -> int:
        """ Secondary hashing function for double hashing """
        index: int = (self.b * self.encode(key)) % self.table_size
        return index if index != 0 else 1
```

- **`resize()`:** This function increases the table's size once the `load factor` reaches the threshold. The table is resized to the smallest prime number greater than 2 \* the_current_size of the table. We apply the [Sieve of Eratosthenes](https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html) to find the prime number. After we have resized the table, all the entries in the table are re-hashed.

```python
 def resize(self) -> None:
        size: int = 2 * self.table_size + 1
        if size > self.primes_table[len(self.primes_table) - 1]:
            self.primes_table = self.primes_below_n(10 * size)
        size: int = self.primes_table[bisect_left(self.primes_table, size)]

        # rehash all entries of the hash table after the increase in table size
        temp: List[(T, T)] = self.table
        self.table_size = size
        self.table = [None] * self.table_size
        self.filled_count = 0

        for pair in temp:
            if pair is not None:
                self[pair[0]] = pair[1]

```

### 3. Operations on Hashtables
The list of methods below shows the basic operations that we can perform on Hashtables.


- **`find()`:** Gets the first occupied position using double hashing. Handles search of a key in the table. It returns a pair value found if the search is successful; otherwise, it raises an exception that the key does not exist in the table.	 

```python
 def find(self, key) -> int:
        """ Finds the first occupied position using double hashing """
        try:
            # check with primary hashing if there is a matching value
            index: int = self.hash_function(key)
            if self.table[index][0] == key:
                return index

            # use secondary hashing function to find an interval to use
            index2: int = self.secondary_hash(key)
            i: int = 1
            while self.table[(index + i * index2) % self.table_size][0] != key:
                i += 1
                self.key_comparison_counts += 1
        except TypeError as err:
            raise Exception("Key does not exist in hash table") from err
        return (index + i * index2) % self.table_size

```

- **`lookup()`:** Handles search of a key in the table. It returns the pair value found if the search was successful; otherwise, it raises an exception that the key doesn't exist in the table.

```python
def lookup(self, key: T) -> T:
        """ Handles lookup/search of key in table. Returns value if key is found """

        index: int = self.hash_function(key)  # get an index location for 'key'
        if self.table[index] is None:  # 'key' doesn't exists in hash table
            raise Exception("Key doesn't exist in hashtable")
        else:
            self.key_comparison_counts += 1
            return self.table[self.find(key)][1]  # return pair value
```

- **`delete()`:** Removes a key-value pair from the hash table. The key supplied for deletion is hashed then the resulting hash value is used to locate an element. If the element is found, it gets deleted.

```python

    def delete(self, key: T) -> None:
        """ Deletes a (key, value) pair from the hash table """

        index: int = self.hash_function(key)  # get an index location for 'key'
        if self.table[index] is None:  # 'key' doesn't exists in hash table
            raise Exception("Key doesn't exist in hashtable")
        else:
            self.table[self.find(key)] = None  # delete value at 'key'
            self.filled_count -= 1
```

- **`update()`:** Handles `insert` and `update` of the key-value pairs to the hash table. If the key's index is not occupied, it inserts to that key; otherwise, it updates the key.

```python
def update(self, key: T, value: T) -> None:
        # check if load fcator is equal to or greater than the resize threshold
        if self.load_factor >= self.resize_threshold:
            self.resize()

        # get an index location for 'key'
        index: int = self.hash_function(key)

        # index location not occupied
        if self.table[index] is None:
            self.table[index] = (key, value)
            self.filled_count += 1
        else:  # idx location occupied
            if self.table[index][0] == key:  # trying to insert to the same key
                # update 'value' at 'key'
                self.table[index] = (self.table[index][0], value)
            else:
                # probe for next free position using double hashing(secondary hash function)
                index2: int = self.secondary_hash(key)
                i: int = 1
                while self.table[(index + i * index2) % self.table_size] is not None:
                    i += 1

                # insert at an unoccupied location
                self.table[(index + i * index2) %
                           self.table_size] = (key, value)
                self.filled_count += 1
```

### 4. Unit testing
This finalizes our code for the implementation part. We now perform a unit test for our implementations [here.](http://repl.it/@jerimkaura/Hash-table-tests#main.py). 

- `test_empty_table()`. Returns true if the table size is zero. `AssertEquals` is used to determine if the length and the load factor are both zero.

```python
def test_empty_table(self):
    table = HashTable()
    self.assertEqual(str(table), '{}')
    self.assertEqual(len(table), 0)
    self.assertEqual(table.load_factor, 0)
```

- `test_update_ops()`. The method checks for an existing key and replaces the value associated with the key with the input supplied. `AssertEqual` checks if the value of the key is similar to the value that is supplied during replacement.

```python
def test_update_ops(self):
    table = HashTable()
    table["Apple"] = "Steve Jobs"
    table["Apple"] = "Tim Cook"
    self.assertEqual(table["Apple"], "Tim Cook")
```

- `test_delete()`. We insert `Porshe` into the table since something must exist for it to be deleted. With `AssertRaises`, if `Porsche` exist in the table after the `del table ["Porsche"] operation, the method should return an error otherwise success.

```python
def test_delete(self):
    table = HashTable()
    table['Porsche'] = "Oliver Blume"
    del table["Porsche"]                           
    with self.assertRaises(Exception):
        table["Porche"]
```

- `test_encoding()`. Tests the success of the `encode` method.

```python
def test_encoding(self):
        self.assertEqual(HashTable.encode("Azc8{"), 10941154641)

```

- `test_crc32()`. Using the `binascii.crc32` we check if our hash function returns the same value as `binascii.crc32` for the same input value.

```python
def test_crc32(self):
        table = HashTable()
        table.hash_function = table.crc32_hash        
        self.assertEqual(table.crc32_hash("hello-world"),binascii.crc32(b"hello-world") % table.table_size)
```

### Conclusion
In this article, we learned how to create a hash table, hashing process using CRC32-algorithm, and implementing essential hash functions. The implementation proves that hashing is an effective way to access data using a key-value pair easily. 

Given that hash tables are so fast at performing functionalities, hash tables will certainly be useful for optimization projects. You can run the code for this project code [here](https://repl.it/@jerimkaura/Hash-Table#hashtable.py) by clicking run.

Happy coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
