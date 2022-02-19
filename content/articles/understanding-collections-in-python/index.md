### Introduction
In computer programming, a collection is the grouping of similar data types. These unit classes may assist in organizing and managing related items. Collections feature data structures that help manage vast volumes of data effectively.

The collection module in Python provides a wide variety of containers. Containers can store a variety of items and can be retrieved and re-created. These containers include tuple, list, dictionary, and much more.

Here we'll explore several of the collections module's containers.

### Prerequisite
To understand the content of this article, you should have the following:
- Prior knowledge of Python programming
- Python compiler installed or use the [online compile](https://www.onlinegdb.com/online_python_compiler) to run the code snippets.

### Table of content
- [Prerequisite](#prerequisite)
- [Collections data types](#collections-data-types)
- [Collection modules](#collection-modules)
- [Implementation of Python collection modules](#implementation-of-python-collection-modules)
- [Conclusion](#conclusion)

### Collections data types
These data types may be used to store a collection of items: list, tuple, set, and dictionary. They can be distinguished into mutable, immutable, set type, and mappings.

1. `Lists`- Iteratively generated lists may be modified by adding or deleting elements. To create a list, use square brackets [].

2. `Sets`- Duplicates are not permitted in unordered, immutable collections of unique items. Sets of data may be intersected, unioned, divided, and symmetrically. Sets can be created using curly brackets following the variable names or the `set()` constructor.

3. `Tuples` - are an ordered, immutable sequence of multiple things held in one variable. A tuple is a variable name followed by two parentheses and commas. Python requires a trailing comma to identify it as a string. Instead of parentheses, commas form tuples.

4. `Dictionary`- A dictionary has unsorted key/value pairs. There may be any number of pairs of keys and values. Dictionaries, like sets, lack order. Any data is a dictionary entry. After creation, a dictionary may be modified. Values overflow, and only the most recent is returned if it contains more than one item.

Now let's compare and contrast lists, tuples, and sets.

#### Similarities
- First, they can handle any data type.
- Due to its flexibility, lists and sets may be modified after creation.
- Lists and tuples are both ordered sets.
- Lists and tuples may share items.

#### Differences
- A set cannot be referred to by index or key since it is unsorted and may appear in any order.
- Unlike lists and tuples, sets accept just one of two identical items.
- Tuples are immutable, which means they cannot be modified after being formed in Python.


### Collection modules
The Python collections module provides an alternative to Python's built-in container data types. The collection modules specific data structures are listed below:

- defaultdict
- OrderedDict
- namedtuple()
- ChainMap
- deque
- Counter
- UserDict
- UserList

Let's look at them one by one:

1. `defaultdict` - Dictionary subclass that runs factory function to fill in missing values in the dictionary. No problems are typically thrown when a dictionary's missing key value is used.

The code below illustrates the `defaultdict` module.

```py
from collections import defaultdict      
integer = defaultdict(int)      
integer['1'] = 33     
integer['2'] = 44      
print(integer['3']) 
``` 

The code above outputs integer `0` since it is the default integer.

2. `OrderedDict`- Subclasses of dictionaries keep track of the sequence in which they were added. Logic dictates that even if you change a key's value, its placement will not change due to the series of entries.

The code below illustrates the `OrderedDict` module:

```py
import collections
K = collections.OrderedDict()
K['Value1'] = 29
K['Value2'] = 30
K['Value3'] = 33
K['Value4'] = 44
for x,y in K.items():
    print (x,y)
```

The code above output will be:

```bash
Value1 29
Value2 30
Value3 33
Value4 44
```

3. `namedtuple()` - This function will give each value in the tuple a unique name. It removes the requirement for index values. It's much easier to retrieve these values using `namedtuple()` since you don't have to remember the index values.

The code below illustrates the `namedtuple()` module:

```py
import collections
Student = ('Leah', 19, 'F')    
print(Student)    
```

The output of the code above will be:

```bash
('Leah', 19, 'F')
```

4. `ChainMap`- It's a vocabulary for a collection of mappings, and it returns numerous more dictionaries. ChainMap will create a single list if both dictionaries have many key-value pairs.

5. `deque`- deque, pronounced "deck", is a list designed to make it simple to add and remove items.

The code below illustrates the `deque` module:

```py
from collections import deque
list = ["a","b","c","d"]
letter = deque(list)
print(letter)
```

The code output will be:

```bash
deque(['a', 'b', 'c', 'd'])
```

6. `counter` is a subclass of a dictionary used to count hashable items.

The code below illustrates the `counter` module:

```py
from collections import Counter      
K = Counter()
list = [1,2,3,4,5,7,8,5,9,6,10]
Counter(list)
Counter({1:5,2:4})
list = [1,2,4,7,5,1,6,7,6,9,1]
K = Counter(list)
print(K[1])
```

The code above outputs the value `3`. 

7. `UserList`-This class wraps the list of things. Using this class as a basis enables other list-like classes to override existing methods or add new ones. This class was built to subclass from a list. The underlying list is now a class property, making it simpler to use. It's the class that creates a list-like object. When an event occurs, it is recorded in a standard list. One or no contention may be called on the constructor provided by the list's subclasses.

8. `UserDict`- Dictionaries are wrapped up in this class. Subclassing from `dict` requires the creation of this class. The dictionary is now a class property to make it easier to use. This class acts like a dictionary, and it's fun to play with. Users may get the instance's data using a standard dictionary, using the `UserDict` class's data field. To be utilized for other reasons, the original data is not maintained.

### Implementation of Python collection modules
The collection modules can be used to:
1. Improve the readability of your code by using `namedtuples().`
2. The queue and stack are used for building efficient queues and stacks.
3. The `defaultdict` module is used for handling missing keys.
4. Keeping your dictionaries ordered using the `OrderedDict` module.
5. Counting multiple objects at the same time using the `counter` module.
6. Customizing built-ins using the `UserString`, `UserList`, and `UserDict` modules. 

Let's look at one of the implementations!

#### Handling missing keys using the defaultdict module
Dictionaries in Python are containers that map a single key to a single value, with the access time complexity of 0 (1). However, the user may not be familiar with all of the dictionary keys in many apps. An error message is shown whenever a user attempts to access an unavailable key. The missing key can be handled using the `defaultdict`, `get()`, and `setdefault()` methods. But in this example, we will use the `defaultdict` method to handle missing keys.

`defaultdict` as a parameter expects a function (default factory) as its argument. The default factory is set to `int`, i.e., 0. The default factory value is returned if the `defaultdict` has no keys. It has advantages over `get()` and `setdefault()`.

- A default value is set at the declaration. There is no need to call the function with the same arguments, saving time.
- `Get()` and `setdefault` implementation take longer than `defaultdict()`.

```py
import collections

value = collections.defaultdict(lambda : 'Key is missing')
value['x'] = 1
value['y'] = 2
print ("The monetary value attached to 'x' is : ",end="")
print (value['x'])
print ("The monetary value attached to 'k' is : ",end="")
print (value['k'])
```

The output will be:

```bash
The monetary value attached to 'x' is: 1
The monetary value attached to 'k' is: Key is missing.
```

From the code above, we declared the `defaultdict` as value, and its value as the 'key is missing' using:

```py
value = collections.defaultdict(lambda : 'Key is missing')
```

The values of x and y were initiated, respectively. Finally, we printed the value associated with x and k, where x was available, and k was missing.

### Conclusion
The collection is one of Python's many libraries, and it primarily serves as an upmarket menu in the collection datatype. We have learned in detail the collection data types and modules and seen how to implement the collection modules to solve problems in Python dictionaries.

Happy coding!
