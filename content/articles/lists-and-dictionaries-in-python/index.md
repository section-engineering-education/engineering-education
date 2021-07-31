---
layout: engineering-education
status: publish
published: true
url: /lists-and-dictionaries-python/
title: Working with Lists and Dictionaries in Python
description: This tutorial will teach us how to work with lists and dictionaries in Python. We will look at how perform create, access, modify, and slice operations on list and dictionaries. 
author: duncan-ndegwa
date: 2021-05-28T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/lists-and-dictionaries-python/hero.jpg
  alt: Python Lists Dictionaries example
---
Lists and dictionaries are one of the most often used data structures in Python for data storage and arrangement. This tutorial will explain how to carry out access, modify operations, etc., on lists and dictionaries.
<!--more-->

### Prerequisites
To follow along with this tutorial, you will require some knowledge of Python.

### Creating a list
Lists enable you to store a set of items in place. Lists take the form of arrays in other languages like Java.

A list in Python is created using the following syntax:

```python
listname = [item1, item2, item3, ...]
```

The following is an example of a list of cars:

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']

print(cars) # ['Volvo', 'Subaru', 'Skyline', 'Ford']
```

### Accessing elements in a list
You can access elements in a list using the square bracket notation. Indices begin at 0, not 1, hence the first item in a list takes index 0, not 1.

The syntax for accessing elements in a list is shown below.

```python
listname = [item1,item2,item3]
print(listname[indexvalue])
```

The following code requests for the cars at index 0 and 3:

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']

print(cars[0]) # Volvo
print(cars[3]) # Ford
```

Python has a unique way of getting the last item in a list. If you print an item at index -1, Python gives back the last item in the list. Indices -2,-3, and -4 gives the second last, third last, and fourth last item respectively.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']

print(cars[-1])   # Ford
```

### Changing elements in a list
To alter an item in the list, we can assign a new value using square bracket notation.

For instance, in our list of cars, the second item is `Subaru`. Let’s change the value to `Suzuki`.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']

print(cars)      # ['Volvo', 'Subaru', 'Skyline', 'Ford']
cars[1]='suzuki' 
print(cars)      # ['Volvo', 'Suzuki', 'Skyline', 'Ford']
```

### Adding elements to a list
To add new elements at the end of the list, use the `.append()` method.

For example, let’s add `Audi` to our list of cars.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford'] 

cars.append('Audi') # adds 'Audi' at the end of the list
print(cars)         # ['Volvo', 'Subaru', 'Skyline', 'Ford', 'Audi']
```

You can also use the `.insert()` method to add a new item at any position in your list, by specifying the position and value of the new item.

Let’s take a look at this example:

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']

cars.insert(2,'Audi') # adds 'Audi' at the beginning of the list (at index 2)
print(cars)           # ['Volvo', 'Subaru', 'Audi', 'Skyline', 'Ford']
```

All the other values in the list are shifted to the right.

### Removing elements from a list
If the **location** of an item that you want to do away with is well known, you can use the `del` statement.

Example:

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']
del cars[0]
print(cars) # ['Subaru', 'Skyline', 'Ford']
```

The first car, i.e. `Volvo` is removed from the list.

If the **value** of the item you want to remove is known, use the `.remove()` method.

To illustrate this, let’s remove the item `Subaru` from our list of cars.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']

cars.remove('Subaru') # removes Subaru from the list
print(cars)           # ['Volvo', 'Skyline', 'Ford']
```

> **NOTE**: When a value appears more than once in a list, the `.remove()` method only deletes the first occurrence of the value.

### Sorting a list
Sorting is organizing your list by some basis, e.g. reverse order, ascending order, or alphabetical order.

To sort a list, use the `.sort()` method. To understand this better, let's arrange our list of cars alphabetically.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']

cars.sort()  # arranges the list alphabetically
print(cars)  # ['Ford', 'Skyline', 'Subaru', 'Volvo']
```

The `.reverse()` method is used to **reverse** the order of the list. For instance, let's print our list of cars in reverse.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford']

cars.reverse()
print(cars)    # ['Ford', 'Skyline', 'Subaru', 'Volvo']
```

> **NOTE**: `.reverse()` doesn’t sort alphabetically backward. It just reverses the order of the list.

### Slicing a list
To derive a segment, you need to specify the index of the first element and where to stop slicing.

In Python, we use a colon(:) as a slicing operator. Slicing follows the following syntax.

```python
list_name[Index_start:Index_end]
```

For example, when you request `[0:3]`, Python returns the items at index 0, 1, and 2. 

To illustrate this, let's take a look at the following code.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford', 'Isuzu']

print(cars[0:3]) # ['Volvo', 'Subaru', 'Skyline']
```

When you exclude the starting index in a slice, Python automatically begins the slice at the start of the list. Similarly, if you omit the last index, Python returns all elements in the list from the first one.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford', 'Isuzu']

print(cars[:3]) # ['Volvo', 'Subaru', 'Skyline']
print(cars[3:]) # ['Ford', 'Isuzu']
```

###  Looping through a list 
To perform an action to each element in a list, we can use the `for` loop.

For instance, let’s assume we have a list of cars and we want to pull out each name in the cars list.

```python
cars = ['Volvo', 'Subaru', 'Skyline', 'Ford', 'Isuzu']  # initiate the list

for car in cars:
    print(car)

# Volvo
# Subaru
# Skyline
# Ford
# Isuzu
```

The line: `for car in cars`, tells Python to pull a car from the cars list and save it in the variable `car`. The line: `print (car)`, then prints the name that was stored in the variable `car`. This line is re-executed for each item.

### Dictionaries
In Python, a dictionary is a group of `key:value` pairs where each key is linked to a value. A dictionary is enclosed with curly brackets `{}`, with a series of `key:value` pairs inside.

A dictionary follows the following syntax:

```python
dict_name={
    key:value,
    key:value}
```

Example:

```python
stock_1={
    'type':'Volvo',
    'color':'Black'
}

print(stock_1) # {'type': 'Volvo', 'color': 'Black'}
```

### Accessing values in a dictionaries
You can access values using the square brackets notation. To get a value, place its related key inside the square brackets as shown below. 

```python
stock_1={
    'type':'Volvo',
    'color':'Black'
}

print(stock_1['type'])  # Volvo
```

### Adding items to a dictionary
To add a new item into a dictionary, give a value to a new key. Let’s add a new key: `year` to our `stock_1` dictionary, and assign it the value `2014`.

```python
stock_1={
    'type':'Volvo',
    'color':'Black'
}

print(stock_1)        # prints the initial dictionary
stock_1['year']=2014  # Adding a new key:value
print(stock_1)        # returns the modified dictionary
```

### Changing values in a dictionary
You can change a value in a dictionary by referring to its key name. 

For example, let’s change the value of the `year` in our stock_1 dictionary from `2014` to `2021`.

```python
stock_1={
    'type':'Volvo',
    'color':'Black',
    'year':2014
}

stock_1['year']=2021  # change the value of year from 2014 to 2021
print(stock_1)        # {'type': 'Volvo', 'color': 'Black', 'year': 2021}
```

### Removing key:value pairs from dictionaries
To remove a `key:value` pair you can use the `del` statement. Give the key you're trying to remove and the name of the dictionary to the `del` statement. For instance, let’s remove the key `color` in our `stock_1` dictionary.

```python
stock_1={
    'type':'Volvo',
    'color':'Black',
    'year':2014
}

del stock_1['color']   # removes the key `color` and its value `Black`
print(stock_1)         # {'type': 'Volvo', 'year': 2014}
```

Python removes the key `color` and its related value `Black`. The rest of the dictionary remains intact.

### Looping through a dictionary
To access everything stored in a dictionary, you can loop through the dictionary using a `for` loop. 

Assuming we have the names and models stored in a cars dictionary, we can access the name and model of each car using a `for` loop as follows:

```python
cars={
    'Volvo':'V90',
    'Skyline':'R32',
    'Subaru':'2019WRX'
}

for name, model in cars.items():   # method `item()` returns a list of key value pairs
    print(name, ":", model)

# Volvo : V90
# Skyline : R32
# Subaru : 2019WRX
```

In the example above, the `for` loop stores the key in the variable `name` and its value in the variable `model`.

### Conclusion
In this tutorial, we have gained an understanding of lists and dictionaries on how to:
- Access, alter and remove elements in both lists and dictionaries.
- Loop through dictionaries and lists.
- Sort and slice a list.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
